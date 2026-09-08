const IssueTrackingService={_issuesCache:null,_lastFetch:null,_cacheTimeout:3e5,async reportIssue(e,t={}){try{t.module||(t=this._detectContext());const s={...e,module:t.module||"Unknown",recordId:t.recordId||null,pageUrl:t.pageUrl||window.location.href,userAgent:t.userAgent||navigator.userAgent,reportedBy:AppState.currentUser?.name||AppState.currentUser?.email||"Unknown",createdBy:AppState.currentUser?.email||"Unknown",priority:e.priority||this._determinePriority(e),category:e.category||"Bug",status:"New",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),context:{module:t.module,recordId:t.recordId,section:t.section,action:t.action}};if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)throw new Error("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");const i=await GoogleIntegration.sendRequest({action:"addIssue",data:s});if(i.success){if(typeof AuditLog<"u"&&AuditLog.log("issue_reported",t.module||"Unknown",t.recordId||null,{issueId:i.data?.id,title:e.title}),typeof Notification<"u"){const r=i.data?.id||i.issueId||"";r?Notification.success("\u062A\u0645 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0646\u062C\u0627\u062D. \u0631\u0642\u0645 \u0627\u0644\u0645\u0634\u0643\u0644\u0629: "+r):Notification.success("\u062A\u0645 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0646\u062C\u0627\u062D")}return this._invalidateCache(),{success:!0,issueId:i.data?.id,data:i.data}}else throw new Error(i.message||"\u0641\u0634\u0644 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0643\u0644\u0629")}catch(s){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0643\u0644\u0629:",s),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0634\u0643\u0644\u0629: "+(s.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),{success:!1,error:s.message}}},_detectContext(){const e={module:null,recordId:null,section:null,action:null},t=document.querySelector('.module-section:not([style*="display: none"]), .section:not([style*="display: none"])');if(t){const r=t.id;e.section=r,e.module=this._extractModuleName(r)}const s=new URLSearchParams(window.location.search);s.has("id")&&(e.recordId=s.get("id"));const i=document.querySelector("[data-record-id]");return i&&(e.recordId=i.getAttribute("data-record-id")),e},_extractModuleName(e){return e?e.replace("-section","").split("-").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(""):"Unknown"},_determinePriority(e){const t=(e.title||"").toLowerCase(),s=(e.description||"").toLowerCase(),i=["crash","error","\u0641\u0634\u0644","\u062E\u0637\u0623","\u062A\u0639\u0637\u0644","\u0644\u0627 \u064A\u0639\u0645\u0644","broken","\u062D\u0631\u062C"],r=["slow","\u0628\u0637\u064A\u0621","\u0645\u0634\u0643\u0644\u0629","issue","bug","\u0639\u0627\u0644\u064A\u0629"],o=t+" "+s;return i.some(a=>o.includes(a))?"Critical":r.some(a=>o.includes(a))?"High":"Medium"},async showQuickReportModal(e={}){e.module||(e=this._detectContext());const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-bug ml-2"></i>
                        \u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629
                    </h2>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="quick-issue-form" onsubmit="IssueTrackingService.handleQuickReport(event)">
                        <input type="hidden" name="module" value="${e.module||""}">
                        <input type="hidden" name="recordId" value="${e.recordId||""}">
                        
                        <div class="mb-4">
                            <label class="form-label">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 *</label>
                            <input type="text" name="title" class="form-input" required 
                                   placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0645\u0634\u0643\u0644\u0629">
                        </div>
                        
                        <div class="mb-4">
                            <label class="form-label">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea name="description" class="form-textarea" rows="4" required
                                      placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0645\u0634\u0643\u0644\u0629..."></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="form-label">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                <select name="priority" class="form-select">
                                    <option value="Low">\u0645\u0646\u062E\u0641\u0636\u0629</option>
                                    <option value="Medium" selected>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                    <option value="High">\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="Critical">\u062D\u0631\u062C\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0641\u0626\u0629</label>
                                <select name="category" class="form-select">
                                    <option value="Bug">\u062E\u0637\u0623 \u0628\u0631\u0645\u062C\u064A</option>
                                    <option value="Feature Request">\u0637\u0644\u0628 \u0645\u064A\u0632\u0629</option>
                                    <option value="Performance">\u0623\u062F\u0627\u0621</option>
                                    <option value="UI/UX">\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</option>
                                    <option value="Integration">\u062A\u0643\u0627\u0645\u0644</option>
                                    <option value="Other">\u0623\u062E\u0631\u0649</option>
                                </select>
                            </div>
                        </div>
                        
                        ${e.module?`
                            <div class="mb-4 p-3 bg-blue-50 rounded">
                                <p class="text-sm text-gray-600">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0633\u064A\u062A\u0645 \u0631\u0628\u0637 \u0647\u0630\u0647 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0640: <strong>${e.module}</strong>
                                    ${e.recordId?` (\u0627\u0644\u0633\u062C\u0644: ${e.recordId})`:""}
                                </p>
                            </div>
                        `:""}
                        
                        <div class="modal-footer">
                            <button type="button" onclick="this.closest('.modal-overlay').remove()" 
                                    class="btn-secondary">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-paper-plane ml-2"></i>
                                \u0625\u0631\u0633\u0627\u0644
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{const s=t.querySelector('input[name="title"]');s&&s.focus()},100)},async handleQuickReport(e){e.preventDefault();const t=e.target,s=new FormData(t),i={title:s.get("title"),description:s.get("description"),priority:s.get("priority"),category:s.get("category")},r={module:s.get("module")||null,recordId:s.get("recordId")||null},o=t.querySelector('button[type="submit"]'),a=o.innerHTML;o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...';try{(await this.reportIssue(i,r)).success?t.closest(".modal-overlay").remove():(o.disabled=!1,o.innerHTML=a)}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629:",l),o.disabled=!1,o.innerHTML=a}},async getOpenIssuesCount(){try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)return 0;const e=await GoogleIntegration.sendRequest({action:"getAllIssues",data:{filters:{status:"New"}}});return e.success&&e.data?.length||0}catch(e){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0643\u0644:",e),0}},async getCriticalIssues(){try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)return[];const e=await GoogleIntegration.sendRequest({action:"getAllIssues",data:{filters:{priority:"Critical",status:"New"}}});return e.success?e.data||[]:[]}catch(e){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u062D\u0631\u062C\u0629:",e),[]}},_invalidateCache(){this._issuesCache=null,this._lastFetch=null},init(){this._addFloatingButton(),this._setupKeyboardShortcut()},_addFloatingButton(){if(document.getElementById("issue-tracking-floating-btn"))return;const e=document.createElement("button");e.id="issue-tracking-floating-btn",e.className="issue-tracking-floating-btn",e.setAttribute("aria-label","\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629"),e.setAttribute("title","\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0645\u0634\u0643\u0644\u0629 (Ctrl+Shift+B) - \u0627\u0633\u062D\u0628 \u0644\u062A\u062D\u0631\u064A\u0643"),e.innerHTML=`
            <i class="fas fa-bug"></i>
            <span class="issue-tracking-badge" id="issue-tracking-badge" style="display: none;">!</span>
        `,this._restoreButtonPosition(e),this._makeDraggable(e),e.addEventListener("click",t=>{e.classList.contains("dragging")||this.showQuickReportModal()}),document.body.appendChild(e),this._updateBadge(),setInterval(()=>this._updateBadge(),3e5)},_makeDraggable(e){let t=!1,s,i,r,o,a=0,l=0;const c=this._getSavedPosition();c&&(a=c.x,l=c.y,this._setTransform(e,a,l)),e.addEventListener("mousedown",d),e.addEventListener("touchstart",d,{passive:!1});function d(n){n.type==="touchstart"?(r=n.touches[0].clientX-a,o=n.touches[0].clientY-l):(r=n.clientX-a,o=n.clientY-l),(n.target===e||e.contains(n.target))&&(t=!0,e.classList.add("dragging"),e.style.cursor="grabbing")}document.addEventListener("mousemove",u),document.addEventListener("touchmove",u,{passive:!1});function u(n){if(t){n.preventDefault(),n.type==="touchmove"?(s=n.touches[0].clientX-r,i=n.touches[0].clientY-o):(s=n.clientX-r,i=n.clientY-o),a=s,l=i;const g=e.getBoundingClientRect(),m=window.innerWidth-g.width,f=window.innerHeight-g.height;a=Math.max(0,Math.min(a,m)),l=Math.max(0,Math.min(l,f)),IssueTrackingService._setTransform(e,a,l)}}document.addEventListener("mouseup",p),document.addEventListener("touchend",p);function p(){t&&(r=s,o=i,t=!1,e.classList.remove("dragging"),e.style.cursor="grab",IssueTrackingService._saveButtonPosition(a,l))}},_setTransform(e,t,s){e.style.transform=`translate(${t}px, ${s}px)`},_saveButtonPosition(e,t){try{localStorage.setItem("issue-tracking-btn-position",JSON.stringify({x:e,y:t}))}catch{}},_getSavedPosition(){try{const e=localStorage.getItem("issue-tracking-btn-position");if(e)return JSON.parse(e)}catch{}return null},_restoreButtonPosition(e){this._getSavedPosition()&&(e.style.right="auto",e.style.bottom="auto",e.style.left="0",e.style.top="0")},async _updateBadge(){try{const e=await this.getOpenIssuesCount(),t=document.getElementById("issue-tracking-badge");t&&(e>0?(t.textContent=e>99?"99+":e,t.style.display="inline-block"):t.style.display="none")}catch{}},_setupKeyboardShortcut(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==="B"&&(e.preventDefault(),this.showQuickReportModal())})}};typeof window<"u"&&(window.IssueTrackingService=IssueTrackingService);
