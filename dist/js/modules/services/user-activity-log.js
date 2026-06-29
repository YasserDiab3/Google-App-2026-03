const UserActivityLog={_lastDailyReport:null,getCurrentSessionId(){try{if(typeof AppState<"u"&&AppState.currentUser&&AppState.currentUser.sessionId)return String(AppState.currentUser.sessionId);const t=sessionStorage.getItem("hse_session_id");return t?String(t):""}catch{return""}},async getUserIP(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration?.sendToAppsScript){const s=await Utils.promiseWithTimeout(GoogleIntegration.sendToAppsScript("getPublicIP",{}),5e3,"Timeout"),e=s?.data?.ip||s?.ip;if(s?.success&&e)return e}}catch{}return"Unknown"},async log(t,s,e=null,a={}){AppState.appData.user_activity_log||(AppState.appData.user_activity_log=[]);const i=AppState.currentUser;if(!i)return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u062C\u0644 - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u0646\u0634\u0627\u0637"),null;const r=await this.getUserIP(),o=this.getCurrentSessionId(),l=i.loginTime||null,n={id:Utils.generateId("UAL"),username:i.name||i.displayName||i.email||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",userEmail:i.email||"",userId:i.id||null,timestamp:new Date().toISOString(),actionType:t,module:s||"Unknown",recordId:e,details:typeof a=="string"?a:a.description||JSON.stringify(a),ipAddress:r,sessionId:o||"",sessionLoginTime:l||""};AppState.appData.user_activity_log.push(n);try{DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("UserActivityLog",AppState.appData.user_activity_log).catch(()=>{}),typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript&&GoogleIntegration.sendToAppsScript("addUserActivityLog",n).catch(c=>{(c?.message||String(c||"")).includes("Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644")||Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0633\u062C\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 \u0625\u0644\u0649 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",c)})}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u0646\u0634\u0627\u0637:",c)}return n},getAll(t={}){let s=AppState.appData.user_activity_log||[];if(s=s.sort((e,a)=>new Date(a.timestamp)-new Date(e.timestamp)),t.username&&(s=s.filter(e=>e.username?.toLowerCase().includes(t.username.toLowerCase())||e.userEmail?.toLowerCase().includes(t.username.toLowerCase()))),t.actionType&&t.actionType!=="all"&&(s=s.filter(e=>e.actionType===t.actionType)),t.module&&t.module!=="all"&&(s=s.filter(e=>e.module===t.module)),t.dateFrom&&(s=s.filter(e=>{const a=new Date(e.timestamp),i=new Date(t.dateFrom);return a>=i})),t.dateTo&&(s=s.filter(e=>{const a=new Date(e.timestamp),i=new Date(t.dateTo);return i.setHours(23,59,59,999),a<=i})),t.search){const e=t.search.toLowerCase();s=s.filter(a=>a.username?.toLowerCase().includes(e)||a.userEmail?.toLowerCase().includes(e)||a.module?.toLowerCase().includes(e)||a.details?.toLowerCase().includes(e)||a.actionType?.toLowerCase().includes(e))}if(t.sessionId&&String(t.sessionId).trim()){const e=String(t.sessionId).trim();s=s.filter(a=>String(a.sessionId||"").trim()===e)}return s},getActionTypes(){return[{value:"all",label:"\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0634\u0637\u0629"},{value:"login",label:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"},{value:"logout",label:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C"},{value:"add",label:"\u0625\u0636\u0627\u0641\u0629"},{value:"update",label:"\u062A\u062D\u062F\u064A\u062B"},{value:"delete",label:"\u062D\u0630\u0641"},{value:"settings",label:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"},{value:"upload",label:"\u0631\u0641\u0639 \u0645\u0644\u0641"},{value:"delete_file",label:"\u062D\u0630\u0641 \u0645\u0644\u0641"},{value:"export",label:"\u062A\u0635\u062F\u064A\u0631"},{value:"import",label:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F"}]},getModules(){const t=AppState.appData.user_activity_log||[];return[...new Set(t.map(e=>e.module).filter(Boolean))].sort()},exportToExcel(t={}){const s=this.getAll(t);if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const e=s.map(o=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645":o.username||"","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A":o.userEmail||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A":Utils.formatDateTime(o.timestamp)||"","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629":this.getActionTypeLabel(o.actionType),\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644:o.module||"","\u0645\u0639\u0631\u0641 \u0627\u0644\u0633\u062C\u0644":o.recordId||"",\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:typeof o.details=="string"?o.details:JSON.stringify(o.details),"\u0639\u0646\u0648\u0627\u0646 IP":o.ipAddress||"","\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0644\u0633\u0629":o.sessionId||""})),a=XLSX.utils.json_to_sheet(e),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,a,"\u0633\u062C\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629");const r=`\u0633\u062C\u0644_\u0627\u0644\u0623\u0646\u0634\u0637\u0629_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,r),Notification.success("\u2705 \u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u274C \u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A")}},exportToPDF(t={}){const s=this.getAll(t);if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const e=window.open("","_blank");if(!e){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0645\u0646 \u0645\u0631\u0628\u0639 \u0627\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=Utils.formatDateTime(new Date().toISOString()),i=s.map(n=>{const c=typeof n.details=="string"?n.details:JSON.stringify(n.details||{}),d=c.length>120?c.substring(0,120)+"\u2026":c;return"<tr><td>"+Utils.escapeHTML(String(n.username||""))+"</td><td>"+Utils.escapeHTML(String(Utils.formatDateTime(n.timestamp)||""))+"</td><td>"+Utils.escapeHTML(String(this.getActionTypeLabel(n.actionType)))+"</td><td>"+Utils.escapeHTML(String(n.module||""))+"</td><td>"+Utils.escapeHTML(d)+"</td><td>"+Utils.escapeHTML(String(n.ipAddress||""))+"</td></tr>"}).join(""),r=`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>\u0633\u062C\u0644 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"><style>* { font-family: 'Cairo', 'Arial', 'Tahoma', sans-serif; box-sizing: border-box; }body { direction: rtl; text-align: right; padding: 20px; margin: 0; }h1 { color: #1e40af; font-size: 1.25rem; margin: 0 0 12px 0; }.meta { color: #4b5563; font-size: 0.9rem; margin-bottom: 16px; }table { border-collapse: collapse; width: 100%; font-size: 0.72rem; }th, td { border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; word-break: break-word; }th { background: #3b82f6; color: #fff; }tr:nth-child(even) { background: #f8fafc; }@media print { body { padding: 12px; } }</style></head><body><h1>\u0633\u062C\u0644 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</h1><div class="meta">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: `+Utils.escapeHTML(a)+" \u2014 \u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: "+s.length+"</div><table><thead><tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th><th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</th><th>\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>IP</th></tr></thead><tbody>"+i+"</tbody></table></body></html>";e.document.open(),e.document.write(r),e.document.close();let o=!1;const l=()=>{if(!o){o=!0;try{e.focus(),e.print(),Notification.success("\u0627\u0633\u062A\u062E\u062F\u0645 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0623\u0648 \u0627\u0644\u0637\u0627\u0628\u0639\u0629 \u0645\u0646 \u0645\u0631\u0628\u0639 \u0627\u0644\u062D\u0648\u0627\u0631")}catch(n){Utils.safeWarn("print dialog:",n),Notification.warning("\u062A\u0645 \u0641\u062A\u062D \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u062C\u062F\u064A\u062F\u0629 \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062A\u0635\u0641\u062D")}}};e.onload=()=>{setTimeout(l,900)},setTimeout(l,1400)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u274C \u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A")}},getActionTypeLabel(t){return{login:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",logout:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",add:"\u0625\u0636\u0627\u0641\u0629",update:"\u062A\u062D\u062F\u064A\u062B",delete:"\u062D\u0630\u0641",settings:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",upload:"\u0631\u0641\u0639 \u0645\u0644\u0641",delete_file:"\u062D\u0630\u0641 \u0645\u0644\u0641",export:"\u062A\u0635\u062F\u064A\u0631",import:"\u0627\u0633\u062A\u064A\u0631\u0627\u062F"}[t]||t},render(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin"))return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0645\u062F\u064A\u0631.</p>
                        </div>
                    </div>
                </div>
            `;const s=this.getActionTypes(),e=this.getModules();return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-history ml-2"></i>
                        \u0633\u062C\u0644 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                    </h2>
                    <div class="flex items-center gap-2">
                        <button class="btn-primary" onclick="UserActivityLog.exportToExcel(UserActivityLog.currentFilters || {})" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel">
                            <i class="fas fa-file-excel ml-2"></i>Excel
                        </button>
                        <button class="btn-primary" onclick="UserActivityLog.exportToPDF(UserActivityLog.currentFilters || {})" title="\u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 PDF">
                            <i class="fas fa-file-pdf ml-2"></i>PDF
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <!-- \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                    <div class="bg-gray-50 p-4 rounded-lg mb-4 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <!-- \u0627\u0644\u0628\u062D\u062B -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-search ml-2"></i>\u0627\u0644\u0628\u062D\u062B
                                </label>
                                <input 
                                    type="text" 
                                    id="activity-log-search" 
                                    class="form-input" 
                                    placeholder="\u0627\u062F\u062E\u0644 \u0627\u0644\u0628\u062D\u062B \u0647\u0646\u0627..."
                                >
                            </div>
                            
                            <!-- \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-filter ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629
                                </label>
                                <select id="activity-log-action-type" class="form-input">
                                    ${s.map(a=>`
                                        <option value="${a.value}">${a.label}</option>
                                    `).join("")}
                                </select>
                            </div>
                            
                            <!-- \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644 -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-folder ml-2"></i>\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644
                                </label>
                                <select id="activity-log-module" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644\u0627\u062A</option>
                                    ${e.map(a=>`
                                        <option value="${a}">${Utils.escapeHTML(a)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            
                            <!-- \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user ml-2"></i>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645
                                </label>
                                <input 
                                    type="text" 
                                    id="activity-log-username" 
                                    class="form-input" 
                                    placeholder="\u0627\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0647\u0646\u0627..."
                                >
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0645\u0646 -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-calendar-alt ml-2"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0645\u0646
                                </label>
                                <input 
                                    type="date" 
                                    id="activity-log-date-from" 
                                    class="form-input"
                                >
                            </div>
                            
                                <!-- \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0625\u0644\u0649 -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-calendar-alt ml-2"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0625\u0644\u0649
                                </label>
                                <input 
                                    type="date" 
                                    id="activity-log-date-to" 
                                    class="form-input"
                                >
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <button class="btn-primary" onclick="UserActivityLog.applyFilters()">
                                <i class="fas fa-filter ml-2"></i>\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                            </button>
                            <button class="btn-secondary" onclick="UserActivityLog.resetFilters()">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                            </button>
                        </div>
                    </div>

                    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A -->
                    <div class="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-2">
                            <i class="fas fa-user-clock ml-2"></i>\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A (\u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062D\u062A\u0649 \u0627\u0644\u062E\u0631\u0648\u062C)
                        </h3>
                        <p class="text-xs text-gray-600 mb-3">
                            \u064A\u0639\u0631\u0636 \u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 \u0641\u0642\u0637. \u0644\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u064A\u0648\u0645\u064A: \u0623\u0646\u0634\u0626 <strong>Trigger</strong> \u0632\u0645\u0646\u064A\u0627\u064B \u0641\u064A Google Apps Script \u064A\u0633\u062A\u062F\u0639\u064A \u0627\u0644\u062F\u0627\u0644\u0629
                            <code class="text-xs bg-white px-1 rounded">runDailyUserSessionEmailReport</code>
                            \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0639\u0628\u0631 \u062E\u0627\u0635\u064A\u0629 \u0627\u0644\u0633\u0643\u0631\u0628\u062A <code class="text-xs bg-white px-1 rounded">DAILY_ACTIVITY_REPORT_EMAILS</code>.
                        </p>
                        <div class="flex flex-wrap items-end gap-3 mb-3">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631</label>
                                <input type="date" id="daily-session-report-date" class="form-input">
                            </div>
                            <button type="button" class="btn-primary" onclick="UserActivityLog.loadDailySessionReport()">
                                <i class="fas fa-sync ml-2"></i>\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                            </button>
                            <button type="button" class="btn-secondary" onclick="UserActivityLog.exportDailySessionsToExcel()" title="\u0622\u062E\u0631 \u062A\u0642\u0631\u064A\u0631 \u0645\u062D\u0645\u0651\u0644">
                                <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A Excel
                            </button>
                            <button type="button" class="btn-secondary" onclick="UserActivityLog.copyDailyReportText()">
                                <i class="fas fa-copy ml-2"></i>\u0646\u0633\u062E \u0627\u0644\u0645\u0644\u062E\u0635
                            </button>
                        </div>
                        <div id="daily-session-report-container" class="text-sm">
                            <p class="text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631\xBB.</p>
                        </div>
                    </div>
                    
                    <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A -->
                    <div id="activity-log-table-container">
                        ${this.renderTable()}
                    </div>
                </div>
            </div>
        `},renderTable(t={}){const s=this.getAll(t);return this.currentFilters=t,s.length===0?`
                <div class="empty-state">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0639\u0631\u0636</p>
                </div>
            `:`
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</th>
                            <th>\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</th>
                            <th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th>
                            <th>\u0639\u0646\u0648\u0627\u0646 IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.map(e=>`
                            <tr>
                                <td>
                                    <div class="font-semibold">${Utils.escapeHTML(e.username||"")}</div>
                                    <div class="text-xs text-gray-500">${Utils.escapeHTML(e.userEmail||"")}</div>
                                </td>
                                <td>${Utils.formatDateTime(e.timestamp)}</td>
                                <td>
                                    <span class="badge badge-${this.getActionTypeBadgeColor(e.actionType)}">
                                        ${this.getActionTypeLabel(e.actionType)}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(e.module||"")}</td>
                                <td class="max-w-xs truncate" title="${Utils.escapeHTML(typeof e.details=="string"?e.details:JSON.stringify(e.details))}">
                                    ${Utils.escapeHTML(typeof e.details=="string"?e.details.substring(0,50):JSON.stringify(e.details).substring(0,50))}
                                    ${(typeof e.details=="string"?e.details.length:JSON.stringify(e.details).length)>50?"...":""}
                                </td>
                                <td class="font-mono text-xs">${Utils.escapeHTML(e.ipAddress||"")}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                <i class="fas fa-info-circle ml-2"></i>
                \u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: <strong>${s.length}</strong>
            </div>
        `},getActionTypeBadgeColor(t){return{login:"success",logout:"secondary",add:"primary",update:"warning",delete:"danger",settings:"info",upload:"primary",delete_file:"danger",export:"success",import:"info"}[t]||"secondary"},applyFilters(){const t={search:document.getElementById("activity-log-search")?.value.trim()||"",actionType:document.getElementById("activity-log-action-type")?.value||"all",module:document.getElementById("activity-log-module")?.value||"all",username:document.getElementById("activity-log-username")?.value.trim()||"",dateFrom:document.getElementById("activity-log-date-from")?.value||"",dateTo:document.getElementById("activity-log-date-to")?.value||""},s=document.getElementById("activity-log-table-container");s&&(s.innerHTML=this.renderTable(t))},resetFilters(){document.getElementById("activity-log-search").value="",document.getElementById("activity-log-action-type").value="all",document.getElementById("activity-log-module").value="all",document.getElementById("activity-log-username").value="",document.getElementById("activity-log-date-from").value="",document.getElementById("activity-log-date-to").value="",this.applyFilters()},async loadDailySessionReport(){const t=document.getElementById("daily-session-report-date"),s=document.getElementById("daily-session-report-container");if(!t||!s)return;const e=t.value||new Date().toISOString().split("T")[0];if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendToAppsScript){Notification.error("\u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");return}s.innerHTML='<p class="text-gray-600"><i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>';try{let a="UTC";try{a=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}catch{}const i=await GoogleIntegration.sendToAppsScript("getDailyUserSessionActivityReport",{date:e,timezone:a});if(this._lastDailyReport=i,!i||!i.success){const r=i?.message||"\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631";s.innerHTML='<div class="text-red-600">'+Utils.escapeHTML(r)+"</div>";return}s.innerHTML=this.renderDailySessionReportHTML(i)}catch(a){Utils.safeWarn("loadDailySessionReport",a),s.innerHTML='<div class="text-red-600">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>',Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A")}},renderDailySessionReportHTML(t){const s=t.sessions||[];if(!s.length)return'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0644\u0633\u0627\u062A \u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0627\u0631\u064A\u062E (\u062D\u0633\u0628 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629).</p>';let e="";for(let a=0;a<s.length;a++){const i=s[a],r=Utils.escapeHTML(i.userEmail||i.username||i.userKey||""),o=i.inferred||i.orphan?'<span class="text-xs text-amber-700 mr-1">(\u0627\u0633\u062A\u0646\u062A\u0627\u062C/\u064A\u062A\u064A\u0645)</span>':"",l=i.sessionId?'<span class="font-mono text-xs break-all">'+Utils.escapeHTML(String(i.sessionId))+"</span>":i.inferred?'<span class="text-amber-700 text-xs">\u0645\u0633\u062A\u0646\u062A\u062C</span>':"\u2014",n=i.loginAt?Utils.formatDateTime(i.loginAt):"\u2014",c=i.logoutAt?Utils.formatDateTime(i.logoutAt):'<span class="text-gray-500">\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C</span>',d="daily-session-detail-"+a,m=(i.events||[]).map(p=>{const g=Utils.formatDateTime(p.timestamp),y=Utils.escapeHTML(this.getActionTypeLabel(p.actionType||p.action)),f=Utils.escapeHTML(p.module||""),u=String(p.details||""),h=Utils.escapeHTML(u.substring(0,120));return'<tr><td class="text-xs">'+g+'</td><td class="text-xs">'+y+'</td><td class="text-xs">'+f+'</td><td class="text-xs max-w-md truncate" title="'+Utils.escapeHTML(u)+'">'+h+"</td></tr>"}).join("");e+='<tr class="border-b border-slate-200"><td class="py-2 px-2">'+r+o+'</td><td class="py-2 px-2">'+l+'</td><td class="py-2 px-2 text-xs">'+n+'</td><td class="py-2 px-2 text-xs">'+c+'</td><td class="py-2 px-2 text-center">'+(i.eventCount||0)+`</td><td class="py-2 px-2"><button type="button" class="btn-secondary text-xs" onclick="UserActivityLog.toggleDailySessionDetail('`+d+`')">\u062A\u0641\u0627\u0635\u064A\u0644</button></td></tr><tr id="`+d+'" style="display:none"><td colspan="6" class="bg-white p-2"><table class="data-table w-full"><thead><tr><th>\u0648\u0642\u062A</th><th>\u0646\u0648\u0639</th><th>\u0645\u0648\u062F\u064A\u0648\u0644</th><th>\u062A\u0641\u0627\u0635\u064A\u0644</th></tr></thead><tbody>'+(m||'<tr><td colspan="4">\u0644\u0627 \u062A\u0641\u0627\u0635\u064A\u0644</td></tr>')+"</tbody></table>"+(i.note?'<p class="text-xs text-amber-800 mt-2">'+Utils.escapeHTML(i.note)+"</p>":"")+"</td></tr>"}return'<div class="mb-2 text-gray-700">\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A: <strong>'+s.length+"</strong> \u2014 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u064A\u0648\u0645: <strong>"+(t.rawLogCount||0)+'</strong></div><div class="overflow-x-auto"><table class="data-table w-full text-sm"><thead><tr><th>\u0645\u0633\u062A\u062E\u062F\u0645</th><th>\u062C\u0644\u0633\u0629</th><th>\u0628\u062F\u0627\u064A\u0629</th><th>\u0646\u0647\u0627\u064A\u0629</th><th>\u0623\u062D\u062F\u0627\u062B</th><th></th></tr></thead><tbody>'+e+"</tbody></table></div>"},toggleDailySessionDetail(t){const s=document.getElementById(t);s&&(s.style.display=s.style.display==="none"?"table-row":"none")},exportDailySessionsToExcel(){const t=this._lastDailyReport;if(!t||!t.success||!Array.isArray(t.sessions)||!t.sessions.length){Notification.warning("\u062D\u0645\u0651\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0623\u0648\u0644\u0627\u064B");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}try{const s=[];(t.sessions||[]).forEach(i=>{const r=i.userEmail||i.username||i.userKey||"",o=i.sessionId||(i.inferred?"(\u0645\u0633\u062A\u0646\u062A\u062C)":"");(i.events||[]).forEach(l=>{s.push({"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631":t.date||"",\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:r,"\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0644\u0633\u0629":o,"\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u062C\u0644\u0633\u0629":i.loginAt?Utils.formatDateTime(i.loginAt):"","\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062C\u0644\u0633\u0629":i.logoutAt?Utils.formatDateTime(i.logoutAt):"","\u0648\u0642\u062A \u0627\u0644\u062D\u062F\u062B":Utils.formatDateTime(l.timestamp),"\u0646\u0648\u0639 \u0627\u0644\u062D\u062F\u062B":this.getActionTypeLabel(l.actionType||l.action),\u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644:l.module||"",\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:String(l.details||"")})})});const e=XLSX.utils.json_to_sheet(s),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"\u062C\u0644\u0633\u0627\u062A"),XLSX.writeFile(a,"\u062A\u0642\u0631\u064A\u0631_\u062C\u0644\u0633\u0627\u062A_"+(t.date||"")+".xlsx"),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A")}catch(s){Utils.safeError("exportDailySessionsToExcel",s),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}},async copyDailyReportText(){const t=this._lastDailyReport;if(!t||!t.success){Notification.warning("\u062D\u0645\u0651\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0623\u0648\u0644\u0627\u064B");return}const s=[];s.push("\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u2014 "+(t.date||"")),s.push("\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629: "+(t.timezone||"")+" | \u062C\u0644\u0633\u0627\u062A: "+(t.count||0)+" | \u0633\u062C\u0644\u0627\u062A \u062E\u0627\u0645: "+(t.rawLogCount||0)),(t.sessions||[]).forEach(a=>{const i=a.userEmail||a.username||a.userKey||"";s.push("\u2014 "+i+" | "+(a.sessionId||"\u0645\u0633\u062A\u0646\u062A\u062C")+" | \u0623\u062D\u062F\u0627\u062B: "+(a.eventCount||0))});const e=s.join(`
`);try{navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(e),Notification.success("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0645\u0644\u062E\u0635")):Notification.warning("\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0627 \u064A\u062F\u0639\u0645 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A")}catch{Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0646\u0633\u062E")}},showModal(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0644\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0645\u062F\u064A\u0631.");return}const s=`
            <div class="modal-overlay" id="activity-log-modal">
                <div class="modal-content" style="max-width: 95%; width: 1400px; max-height: 90vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-history ml-2"></i>
                            \u0633\u062C\u0644 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                        </h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); UserActivityLog.stopAutoRefresh();">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${this.render()}
                    </div>
                </div>
            </div>
        `,e=document.getElementById("activity-log-modal");e&&e.remove(),document.body.insertAdjacentHTML("beforeend",s),setTimeout(()=>{const a=document.getElementById("activity-log-search");a&&a.addEventListener("input",()=>this.applyFilters());const i=document.getElementById("activity-log-action-type");i&&i.addEventListener("change",()=>this.applyFilters());const r=document.getElementById("activity-log-module");r&&r.addEventListener("change",()=>this.applyFilters());const o=document.getElementById("activity-log-username");o&&o.addEventListener("input",()=>this.applyFilters());const l=document.getElementById("activity-log-date-from");l&&l.addEventListener("change",()=>this.applyFilters());const n=document.getElementById("activity-log-date-to");n&&n.addEventListener("change",()=>this.applyFilters());const c=document.getElementById("daily-session-report-date");c&&!c.value&&(c.value=new Date().toISOString().split("T")[0]),this.startAutoRefresh(),this.loadLogsFromBackend()},100)},autoRefreshInterval:null,autoRefreshEnabled:!0,startAutoRefresh(){this.stopAutoRefresh(),this.autoRefreshEnabled&&(this.autoRefreshInterval=setInterval(()=>{this.loadLogsFromBackend(),this.applyFilters()},3e4))},stopAutoRefresh(){this.autoRefreshInterval&&(clearInterval(this.autoRefreshInterval),this.autoRefreshInterval=null)},async loadLogsFromBackend(){if(!(typeof GoogleIntegration>"u"||!GoogleIntegration.sendToAppsScript))try{const t=await GoogleIntegration.sendToAppsScript("getAllUserActivityLogs",{});if(t&&t.success&&Array.isArray(t.data)){const s=t.data||[],e=AppState.appData.user_activity_log||[],a=new Map;e.forEach(i=>{i.id&&a.set(i.id,i)}),s.forEach(i=>{i.id&&!a.has(i.id)&&a.set(i.id,i)}),AppState.appData.user_activity_log=Array.from(a.values()),AppState.appData.user_activity_log.sort((i,r)=>{const o=new Date(i.timestamp||i.createdAt||0);return new Date(r.timestamp||r.createdAt||0)-o}),DataManager.save()}}catch(t){Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",t)}},logOperation(t,s,e,a={}){if(!["add","update","delete"].includes(t)){Utils.safeWarn("\u0639\u0645\u0644\u064A\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",t);return}const i={description:this.getActionDescription(t,s,e),recordData:a};return this.log(t,s,e,i)},getActionDescription(t,s,e){return`${{add:"\u0625\u0636\u0627\u0641\u0629",update:"\u062A\u062D\u062F\u064A\u062B",delete:"\u062D\u0630\u0641"}[t]||t} \u0633\u062C\u0644 \u0641\u064A ${s}${e?` (ID: ${e})`:""}`}};typeof window<"u"&&(window.UserActivityLog=UserActivityLog);
