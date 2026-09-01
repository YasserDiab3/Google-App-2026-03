const Violations={_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const i=e||document.getElementById("viol-analytics-root");i&&(typeof t.applyI18n=="function"&&t.applyI18n(i),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(i))},currentFilters:{search:"",personType:"",violationType:"",severity:"",status:""},parseFineAmount(e){if(e==null||e==="")return 0;if(typeof e=="number")return Number.isFinite(e)&&e>=0?e:0;const t="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",i="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",a=l=>String(l||"").replace(/[٠-٩۰-۹]/g,c=>{const s=t.indexOf(c);if(s>=0)return String(s);const d=i.indexOf(c);return d>=0?String(d):c}),n=String(e).trim(),o=a(n).replace(/[,\u066C]/g,"").replace(/\u066B/g,".").replace(/[^\d.\-]/g,""),r=Number(o);return Number.isFinite(r)&&r>=0?r:0},_VIOL_CURRENCY_KEY:"viol_currency",_VIOL_RATE_KEY:"viol_exchange_rate",_VIOL_DEFAULT_RATE:50,getCurrentCurrency(){try{return localStorage.getItem(this._VIOL_CURRENCY_KEY)==="USD"?"USD":"EGP"}catch{return"EGP"}},setCurrentCurrency(e){const t=e==="USD"?"USD":"EGP";try{localStorage.setItem(this._VIOL_CURRENCY_KEY,t)}catch{}return t},getExchangeRate(){try{const e=parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));return Number.isFinite(e)&&e>0?e:this._VIOL_DEFAULT_RATE}catch{return this._VIOL_DEFAULT_RATE}},setExchangeRate(e){const t=parseFloat(e);if(!Number.isFinite(t)||t<=0)return!1;try{localStorage.setItem(this._VIOL_RATE_KEY,String(t))}catch{}return!0},convertFineAmount(e,t){const i=t||this.getCurrentCurrency(),a=Number(e)||0;if(i==="USD"){const n=this.getExchangeRate();return n>0?a/n:0}return a},formatFineAmount(e,t={}){const i=t.currency||this.getCurrentCurrency(),a=i==="USD"?"$":"\u062C.\u0645",n=this.convertFineAmount(e,i),o=i==="USD"?n.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):n.toLocaleString("en-US",{maximumFractionDigits:0});return i==="USD"?`${o} $`:`${o} ${a}`},getCurrencyLabel(e="short"){return this.getCurrentCurrency()==="USD"?e==="long"?this._t("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):"$":e==="long"?this._t("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"):this._t("module.violations.analytics.currency.egp_short","\u062C.\u0645")},normalizeViolationRecord(e){if(!e||typeof e!="object")return null;const t=e.fineAmount??e.defaultFineAmount??e.fine_amount??e.fine??e.amount??e["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"]??e["\u0642\u064A\u0645\u0629 \u0645\u0627\u0644\u064A\u0629"]??0,i=this.parseFineAmount(t),a=e.personType||(e.contractorName?"contractor":"employee");return{...e,personType:a,fineAmount:i}},_escapeIdForHandler(e){return JSON.stringify(e==null?"":String(e))},getEffectiveFineAmount(e){const t=this.normalizeViolationRecord(e);if(!t)return 0;const i=this.parseFineAmount(t.fineAmount);if(i>0)return i;let a=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll&&(ViolationTypesManager.ensureInitialized(),a=ViolationTypesManager.getAll()||[])}catch{a=[]}!a.length&&typeof AppState<"u"&&Array.isArray(AppState?.appData?.violationTypes)&&(a=AppState.appData.violationTypes);const n=String(t.violationTypeId||"").trim(),o=String(t.violationType||"").trim().toLowerCase();let r=0;if(n){const l=a.find(c=>c&&String(c.id)===n);l&&(r=this.parseFineAmount(l.fineAmount))}if(r<=0&&o){const l=a.find(c=>c&&String(c.name||"").trim().toLowerCase()===o);l&&(r=this.parseFineAmount(l.fineAmount))}return r>0?r:i},_normKeyStr(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},sameViolationPersonForSequence(e,t){const i=this._normKeyStr(e.personType)||"employee",a=this._normKeyStr(t.personType)||"employee";if(i!==a)return!1;if(i==="contractor"){const r=this._normKeyStr(e.contractorName),l=this._normKeyStr(t.contractorName);if(!r||!l||r!==l)return!1;const c=this._normKeyStr(e.contractorWorker),s=this._normKeyStr(t.contractorWorker);return!c&&!s?!0:c===s}const n=this._normKeyStr(e.employeeCode||e.employeeNumber),o=this._normKeyStr(t.employeeCode||t.employeeNumber);return!!n&&n===o},getViolationYearMonthKey(e){const t=new Date(e);return isNaN(t.getTime())?null:t.getFullYear()*12+t.getMonth()},_violApprovalSettingsCache:null,_violApprovalSettingsCacheAt:0,_violApprovalRequestsCache:null,_violApprovalRequestsCacheAt:0,_violApprovalRequestsCacheKey:"",async getViolationApprovalSettings(){const e=Date.now();if(this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5)return this._violApprovalSettingsCache;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const t=await GoogleIntegration.sendRequest({action:"getViolationApprovalSettings",data:{__timeoutMs:2e4}});if(t&&t.success&&t.data)return this._violApprovalSettingsCache={requireApproval:t.data.requireApproval===!0,defaultApprovers:Array.isArray(t.data.defaultApprovers)?t.data.defaultApprovers:[],bypassRoles:Array.isArray(t.data.bypassRoles)?t.data.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]},this._violApprovalSettingsCacheAt=e,this._violApprovalSettingsCache}}catch(t){AppState.debugMode&&Utils.safeWarn("getViolationApprovalSettings:",t)}return{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},isCurrentUserBypassApproval(e){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState.currentUser?.role||"";if(Array.isArray(e)&&e.length>0){const i=String(t).toLowerCase();return e.some(a=>String(a).toLowerCase()===i||String(a)===t)}}catch{}return!1},async checkViolationApprovalGate(e,t={}){const i=await this.getViolationApprovalSettings();return!i||!i.requireApproval?{requiresApproval:!1,settings:i}:this.isCurrentUserBypassApproval(i.bypassRoles)?{requiresApproval:!1,settings:i,bypassed:!0}:!Array.isArray(i.defaultApprovers)||i.defaultApprovers.length===0?(AppState.debugMode&&Utils.safeWarn("approval required but no approvers configured \u2014 allowing direct save"),{requiresApproval:!1,settings:i,reason:"no_approvers"}):{requiresApproval:!0,settings:i}},async submitViolationForApproval(e,t={}){try{const a=((await this.getViolationApprovalSettings()).defaultApprovers||[]).slice(),n=AppState.currentUser||{},o={requestType:t.isEdit?"update":"add",violationData:e,originalViolationId:t.originalId||"",approvers:a,createdBy:n.id||n.email||"",createdByName:n.name||n.email||"",notes:t.notes||""};return await GoogleIntegration.sendRequest({action:"addViolationApprovalRequest",data:{...o,__timeoutMs:3e4}})||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"}}catch(i){return{success:!1,message:i?.message||String(i)}}},async fetchViolationApprovalRequests(e={}){try{const t=await GoogleIntegration.sendRequest({action:"getAllViolationApprovalRequests",data:{...e,__timeoutMs:25e3}});return t&&t.success&&Array.isArray(t.data)?t.data:[]}catch(t){return AppState.debugMode&&Utils.safeWarn("fetchViolationApprovalRequests:",t),[]}},async approveViolationRequest(e,t={}){const i=AppState.currentUser||{},a={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const n=await GoogleIntegration.sendRequest({action:"approveViolationApprovalRequest",data:{requestId:e,approver:a,notes:t.notes||"",force:t.force===!0,__timeoutMs:3e4}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async rejectViolationRequest(e,t){const i=AppState.currentUser||{},a={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const n=await GoogleIntegration.sendRequest({action:"rejectViolationApprovalRequest",data:{requestId:e,approver:a,reason:String(t||"").trim(),__timeoutMs:3e4}});return this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async saveViolationApprovalSettings(e){const t=AppState.currentUser||{};try{const i=await GoogleIntegration.sendRequest({action:"updateViolationApprovalSettings",data:{requireApproval:e.requireApproval===!0,defaultApprovers:Array.isArray(e.defaultApprovers)?e.defaultApprovers:[],bypassRoles:Array.isArray(e.bypassRoles)?e.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"],updatedBy:t.id||t.email||"",updatedByName:t.name||"",__timeoutMs:25e3}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),i||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(i){return{success:!1,message:i?.message||String(i)}}},_getViolationApprovalRequestsCacheKey(e,t){return e?"admin":String(t?.email||t?.id||"user")},_getCachedViolationApprovalRequests(e,t){const i=this._getViolationApprovalRequestsCacheKey(e,t),a=Date.now();return this._violApprovalRequestsCache&&this._violApprovalRequestsCacheKey===i&&a-this._violApprovalRequestsCacheAt<12e4?this._violApprovalRequestsCache:null},_setCachedViolationApprovalRequests(e,t,i){this._violApprovalRequestsCache=Array.isArray(e)?e:[],this._violApprovalRequestsCacheKey=this._getViolationApprovalRequestsCacheKey(t,i),this._violApprovalRequestsCacheAt=Date.now()},_invalidateViolationApprovalRequestsCache(){this._violApprovalRequestsCache=null,this._violApprovalRequestsCacheAt=0,this._violApprovalRequestsCacheKey=""},_cloneViolationApprovalSettings(e){const t=e||{};return{requireApproval:t.requireApproval===!0,defaultApprovers:Array.isArray(t.defaultApprovers)?t.defaultApprovers.map(i=>({...i})):[],bypassRoles:Array.isArray(t.bypassRoles)?[...t.bypassRoles]:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_getViolationApprovalSettingsSnapshot(){const e=Date.now();return this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5?this._cloneViolationApprovalSettings(this._violApprovalSettingsCache):{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_prefetchViolationApprovalPanelData(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i={userEmail:e?"":t.email||"",userId:e?"":t.id||""};Promise.all([this.getViolationApprovalSettings(),this.fetchViolationApprovalRequests(i)]).then(([,a])=>{this._setCachedViolationApprovalRequests(a,e,t)}).catch(()=>{})},_buildViolationApprovalsSettingsHtml(e,t,i){if(!t)return"";const a=e||{requireApproval:!1,defaultApprovers:[]};return`
                    <div id="viol-approvals-settings-panel" style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:18px;">
                        <h4 style="margin:0 0 12px 0;color:#991b1b;font-size:1rem;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-cog"></i> \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F (\u0644\u0644\u0645\u062F\u064A\u0631)
                        </h4>
                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:14px;">
                            <input type="checkbox" id="viol-require-approval" ${a.requireApproval?"checked":""}
                                   style="width:18px;height:18px;cursor:pointer;">
                            <span style="font-weight:600;color:#374151;">\u062A\u0641\u0639\u064A\u0644 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                        </label>

                        <div style="margin-bottom:12px;">
                            <label style="display:block;font-weight:600;color:#374151;margin-bottom:6px;">\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u0639\u064A\u064E\u0651\u0646\u0648\u0646:</label>
                            <div id="viol-approvers-list" style="display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;min-height:48px;">
                                ${(a.defaultApprovers||[]).map((n,o)=>`
                                    <span data-approver-idx="${o}" style="background:#dbeafe;color:#1e40af;padding:5px 10px;border-radius:20px;font-size:0.85rem;display:inline-flex;align-items:center;gap:6px;">
                                        <i class="fas fa-user"></i>
                                        ${Utils.escapeHTML(n.userName||n.userEmail||n.userId||"?")}
                                        <button type="button" class="viol-remove-approver" data-idx="${o}" style="background:none;border:none;color:#dc2626;cursor:pointer;padding:0;font-size:14px;">\xD7</button>
                                    </span>
                                `).join("")||'<span style="color:#94a3b8;font-size:0.85rem;">\u0644\u0645 \u064A\u064F\u0636\u064E\u0641 \u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0628\u0639\u062F</span>'}
                            </div>
                        </div>

                        <div style="display:flex;gap:8px;align-items:flex-end;">
                            <div style="flex:1;">
                                <label style="display:block;font-size:0.8rem;color:#6b7280;margin-bottom:4px;">\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u062A\u0645\u062F \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:</label>
                                <select id="viol-add-approver-select" class="form-input" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B --</option>
                                    ${i.map(n=>`
                                        <option value="${Utils.escapeHTML(String(n.id||n.email||""))}"
                                                data-name="${Utils.escapeHTML(String(n.name||""))}"
                                                data-email="${Utils.escapeHTML(String(n.email||""))}"
                                                data-role="${Utils.escapeHTML(String(n.role||""))}">
                                            ${Utils.escapeHTML(n.name||n.email||n.id)} ${n.role?"("+Utils.escapeHTML(n.role)+")":""}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <button type="button" id="viol-add-approver-btn" style="background:#1e40af;color:#fff;border:none;padding:9px 16px;border-radius:8px;cursor:pointer;font-weight:600;">
                                <i class="fas fa-plus"></i> \u0625\u0636\u0627\u0641\u0629
                            </button>
                        </div>

                        <div style="margin-top:14px;display:flex;justify-content:flex-end;gap:8px;">
                            <button type="button" id="viol-save-settings-btn" style="background:#059669;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;">
                                <i class="fas fa-save"></i> \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                            </button>
                        </div>
                    </div>`},_buildViolationApprovalsRequestsHtml(e){if(e.loading)return`<div style="text-align:center;padding:32px;color:#6b7280;background:#f9fafb;border-radius:10px;">
                <i class="fas fa-spinner fa-spin" style="font-size:1.5rem;margin-bottom:10px;display:block;"></i>
                \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A...
            </div>`;const t=(e.requests||[]).filter(i=>i.status==="pending");return this._renderViolationApprovalRequests(t,{isAdmin:e.isAdmin})},_refreshViolationApprovalsModalBody(e,t){const i=(t.requests||[]).filter(r=>r.status==="pending").length,a=e.querySelector("#viol-approval-pending-count");a&&(a.textContent=t.loading?"...":String(i));const n=e.querySelector("#viol-approvals-settings-panel");if(n&&t.isAdmin){const r=document.createElement("div");r.innerHTML=this._buildViolationApprovalsSettingsHtml(t.settings,!0,t.allUsers);const l=r.firstElementChild;l&&n.replaceWith(l)}const o=e.querySelector("#viol-approval-requests-list");if(o){const r=e.querySelector(".viol-req-filter.viol-req-filter-active")?.getAttribute("data-filter")||"pending",l=r==="all"?t.requests||[]:(t.requests||[]).filter(c=>c.status===r);o.innerHTML=t.loading?this._buildViolationApprovalsRequestsHtml(t):this._renderViolationApprovalRequests(l,{isAdmin:t.isAdmin}),this._wireViolationApprovalActions(e,t.isAdmin)}},async _loadViolationApprovalsPanelData(e,t){try{const[i,a]=await Promise.all([this.fetchViolationApprovalRequests(t.filters),this.getViolationApprovalSettings()]);if(!e.isConnected)return;t.requests=Array.isArray(i)?i:[],t.settings=this._cloneViolationApprovalSettings(a),t.loading=!1,this._setCachedViolationApprovalRequests(t.requests,t.isAdmin,AppState.currentUser||{}),this._refreshViolationApprovalsModalBody(e,t),this._wireViolationApprovalActions(e,t.isAdmin)}catch(i){if(!e.isConnected)return;t.loading=!1;const a=e.querySelector("#viol-approval-requests-list");a&&(a.innerHTML=`<div style="text-align:center;padding:24px;color:#dc2626;background:#fef2f2;border-radius:10px;">
                    <i class="fas fa-exclamation-circle"></i> \u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u2014 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                </div>`),AppState.debugMode&&Utils.safeWarn("_loadViolationApprovalsPanelData:",i)}},_bindViolationApprovalsModalEvents(e){if(e._violApprovalsEventsBound)return;e._violApprovalsEventsBound=!0;const t=()=>e._violApprovalState;e.addEventListener("click",i=>{if(i.target.closest("#viol-approvals-close")){e.remove();return}const a=i.target.closest(".viol-remove-approver");if(a){const o=parseInt(a.getAttribute("data-idx"),10),r=t();if(!r||isNaN(o))return;r.settings.defaultApprovers.splice(o,1),this._refreshViolationApprovalsModalBody(e,r);return}const n=i.target.closest(".viol-req-filter");if(n){const o=t();if(!o)return;e.querySelectorAll(".viol-req-filter").forEach(s=>s.classList.remove("viol-req-filter-active")),n.classList.add("viol-req-filter-active");const r=n.getAttribute("data-filter"),l=r==="all"?o.requests:o.requests.filter(s=>s.status===r),c=e.querySelector("#viol-approval-requests-list");c&&(c.innerHTML=o.loading?this._buildViolationApprovalsRequestsHtml(o):this._renderViolationApprovalRequests(l,{isAdmin:o.isAdmin}),this._wireViolationApprovalActions(e,o.isAdmin));return}if(i.target.closest("#viol-add-approver-btn")){const o=t();if(!o)return;const r=e.querySelector("#viol-add-approver-select"),l=r?.value;if(!l){Notification.warning("\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B");return}const c=r.options[r.selectedIndex],s={userId:l,userName:c?.dataset?.name||"",userEmail:c?.dataset?.email||"",role:c?.dataset?.role||""};if(o.settings.defaultApprovers.some(d=>d.userId===s.userId)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0636\u0627\u0641 \u0628\u0627\u0644\u0641\u0639\u0644");return}o.settings.defaultApprovers.push(s),this._refreshViolationApprovalsModalBody(e,o);return}if(i.target.closest("#viol-save-settings-btn")){const o=t();if(!o)return;const r=i.target.closest("#viol-save-settings-btn");if(r.disabled)return;r.disabled=!0;const c={requireApproval:e.querySelector("#viol-require-approval")?.checked===!0,defaultApprovers:o.settings.defaultApprovers,bypassRoles:o.settings.bypassRoles};this.saveViolationApprovalSettings(c).then(s=>{r.disabled=!1,s&&s.success?(o.settings=this._cloneViolationApprovalSettings(c),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error(s&&s.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}).catch(()=>{r.disabled=!1})}})},showViolationApprovalsManager(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i=(AppState.appData?.users||[]).filter(s=>s&&(s.email||s.id||s.name)),a={userEmail:e?"":t.email||"",userId:e?"":t.id||""},n=this._getCachedViolationApprovalRequests(e,t),o={settings:this._getViolationApprovalSettingsSnapshot(),requests:n||[],isAdmin:e,allUsers:i,filters:a,loading:!n},r=document.getElementById("viol-approvals-manager-modal");r&&r.remove();const l=document.createElement("div");l.id="viol-approvals-manager-modal",l.className="modal modal-open",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:24px;overflow:auto;";const c=o.loading?"...":String(o.requests.filter(s=>s.status==="pending").length);l.innerHTML=`
            <div style="background:#fff;border-radius:14px;max-width:1100px;width:100%;max-height:92vh;overflow:auto;box-shadow:0 20px 50px rgba(0,0,0,0.3);">
                <div style="background:linear-gradient(135deg,#991b1b,#7f1d1d);color:#fff;padding:18px 22px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-clipboard-check" style="font-size:22px;"></i>
                        <h3 style="margin:0;font-size:1.15rem;">\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                    </div>
                    <button type="button" id="viol-approvals-close" style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;color:#fff;width:36px;height:36px;cursor:pointer;font-size:18px;">\xD7</button>
                </div>

                <div id="viol-approvals-modal-body" style="padding:18px 22px;">
                    ${this._buildViolationApprovalsSettingsHtml(o.settings,e,i)}

                    <div>
                        <h4 style="margin:0 0 12px 0;color:#374151;font-size:1rem;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-list-ul"></i> \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                            <span id="viol-approval-pending-count" style="background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:12px;font-size:0.75rem;">${c}</span>
                            <span style="font-size:0.75rem;color:#94a3b8;font-weight:400;">\u0645\u0639\u0644\u064E\u0651\u0642\u0629</span>
                        </h4>
                        <div style="display:flex;gap:8px;margin-bottom:12px;">
                            <button type="button" class="viol-req-filter viol-req-filter-active" data-filter="pending" style="background:#fbbf24;color:#78350f;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">\u0645\u0639\u0644\u064E\u0651\u0642\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="approved" style="background:#dcfce7;color:#166534;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0645\u0639\u062A\u0645\u062F\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="rejected" style="background:#fee2e2;color:#991b1b;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0645\u0631\u0641\u0648\u0636\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="all" style="background:#e5e7eb;color:#374151;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0627\u0644\u0643\u0644</button>
                        </div>
                        <div id="viol-approval-requests-list">
                            ${this._buildViolationApprovalsRequestsHtml(o)}
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(l),l._violApprovalState=o,l._violApprovalsEventsBound=!1,this._bindViolationApprovalsModalEvents(l),o.loading||this._wireViolationApprovalActions(l,e),this._loadViolationApprovalsPanelData(l,o)},_renderViolationApprovalRequests(e,t={}){return!e||e.length===0?'<div style="text-align:center;padding:24px;color:#94a3b8;background:#f9fafb;border-radius:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':e.map(i=>{const a=i.violationData||{},n=a.employeeName||a.contractorName||"\u2014",o={pending:'<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u0644\u064E\u0651\u0642</span>',approved:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u062A\u0645\u062F</span>',committed:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0633\u062C\u064E\u0651\u0644</span>',rejected:'<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0631\u0641\u0648\u0636</span>'}[i.status]||`<span style="background:#e5e7eb;color:#374151;padding:3px 10px;border-radius:12px;font-size:0.75rem;">${i.status}</span>`,r=i.createdAt?typeof Utils.formatDateTime=="function"?Utils.formatDateTime(i.createdAt):String(i.createdAt):"\u2014",l=Array.isArray(i.approvers)?i.approvers:[],c=parseInt(i.currentApproverIndex,10)||0,s=i.status==="pending"&&t.isAdmin;return`
                <div data-request-id="${Utils.escapeHTML(String(i.id))}" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <div>
                            <div style="font-weight:700;color:#374151;font-size:0.95rem;">${Utils.escapeHTML(n)} \u2014 ${Utils.escapeHTML(a.violationType||"\u2014")}</div>
                            <div style="font-size:0.78rem;color:#6b7280;margin-top:3px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ${Utils.escapeHTML(String(i.id))} \u2022 \u0623\u064F\u0646\u0634\u0626: ${r} \u2022 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(i.createdByName||i.createdBy||"\u2014")}</div>
                        </div>
                        ${o}
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;font-size:0.82rem;color:#4b5563;background:#f9fafb;padding:10px;border-radius:8px;margin-bottom:10px;">
                        <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(a.violationLocation||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0634\u062F\u0629:</strong> ${Utils.escapeHTML(a.severity||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${a.violationDate?new Date(a.violationDate).toLocaleDateString("ar-EG-u-nu-latn"):"\u2014"}</div>
                        <div><strong>\u0627\u0644\u063A\u0631\u0627\u0645\u0629:</strong> ${a.fineAmount?Number(a.fineAmount).toLocaleString("en-US")+" \u062C.\u0645":"\u2014"}</div>
                    </div>
                    ${l.length>0?`
                        <div style="font-size:0.78rem;color:#6b7280;margin-bottom:8px;">
                            <strong>\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646:</strong>
                            ${l.map((d,p)=>`
                                <span style="background:${d.approved?"#dcfce7":p===c?"#fef3c7":"#f3f4f6"};color:${d.approved?"#166534":p===c?"#92400e":"#6b7280"};padding:2px 8px;border-radius:10px;margin-right:4px;">
                                    ${d.approved?"\u2713":p===c?"\u23F3":"\u25CB"} ${Utils.escapeHTML(d.userName||d.userEmail||"?")}
                                </span>
                            `).join("")}
                        </div>
                    `:""}
                    ${i.rejectionReason?`<div style="background:#fef2f2;border-right:3px solid #dc2626;padding:8px 10px;border-radius:6px;font-size:0.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</strong> ${Utils.escapeHTML(i.rejectionReason)}</div>`:""}
                    ${s?`
                        <div style="display:flex;gap:8px;justify-content:flex-end;">
                            <button type="button" class="viol-req-reject-btn" data-id="${Utils.escapeHTML(String(i.id))}" style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                                <i class="fas fa-times"></i> \u0631\u0641\u0636
                            </button>
                            <button type="button" class="viol-req-approve-btn" data-id="${Utils.escapeHTML(String(i.id))}" style="background:#dcfce7;color:#166534;border:1px solid #86efac;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                                <i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F
                            </button>
                        </div>
                    `:""}
                </div>
            `}).join("")},_wireViolationApprovalActions(e,t){e.querySelectorAll(".viol-req-approve-btn").forEach(i=>{i.addEventListener("click",async()=>{const a=i.getAttribute("data-id");if(!a)return;i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F...';const n=await this.approveViolationRequest(a,{force:t});if(n&&n.success){Notification.success(n.message||"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager();try{this.load&&this.load()}catch{}}else Notification.error(n&&n.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),i.disabled=!1,i.innerHTML='<i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F'})}),e.querySelectorAll(".viol-req-reject-btn").forEach(i=>{i.addEventListener("click",async()=>{const a=i.getAttribute("data-id");if(!a)return;const n=(window.prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:")||"").trim();if(!n){Notification.warning("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0625\u0644\u0632\u0627\u0645\u064A");return}i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0636...';const o=await this.rejectViolationRequest(a,n);o&&o.success?(Notification.success(o.message||"\u062A\u0645 \u0627\u0644\u0631\u0641\u0636"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager()):(Notification.error(o&&o.message||"\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636"),i.disabled=!1,i.innerHTML='<i class="fas fa-times"></i> \u0631\u0641\u0636')})})},countPriorViolationsSamePersonMonth(e,t){const i=this.getViolationYearMonthKey(e.violationDate);if(i==null)return 0;const a=AppState.appData.violations||[];let n=0;for(let o=0;o<a.length;o++){const r=a[o];!r||t&&String(r.id)===String(t)||this.getViolationYearMonthKey(r.violationDate)===i&&this.sameViolationPersonForSequence(e,r)&&n++}return n},refreshViolationSequenceBadgeInModal(e,t){const i=e&&e.querySelector?e.querySelector("#violation-sequence-info"):null,a=e&&e.querySelector?e.querySelector("#violation-sequence-text"):null;if(!i||!a)return;const n=document.getElementById("violation-person-type")?.value,o=document.getElementById("violation-date")?.value;if(!n||!o){i.classList.add("hidden");return}const r={personType:n,violationDate:`${o}T12:00:00`};if(n==="employee"){if(r.employeeCode=document.getElementById("violation-employee-code")?.value.trim()||"",!r.employeeCode){i.classList.add("hidden");return}}else{const s=document.getElementById("violation-contractor-select");if(r.contractorName=(s?.value||"").trim(),r.contractorWorker=document.getElementById("violation-contractor-worker")?.value.trim()||"",!r.contractorName){i.classList.add("hidden");return}}const c=this.countPriorViolationsSamePersonMonth(r,t)+1;a.textContent=c<=1?"\u0623\u0648\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 (\u064A\u064F\u062D\u0633\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0648\u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631).":`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${c} \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635.`,i.classList.remove("hidden")},_violationsImportNormalizeHeaderKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationsImportPick(e,t){const i={};Object.keys(e||{}).forEach(a=>{i[this._violationsImportNormalizeHeaderKey(a)]=e[a]});for(let a=0;a<t.length;a++){const n=this._violationsImportNormalizeHeaderKey(t[a]);if(i[n]!==void 0&&i[n]!==null&&String(i[n]).trim()!=="")return i[n]}return""},downloadViolationsImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u063A\u0631\u0627\u0645\u0629"],t=["\u0645\u0648\u0638\u0641","12345","","","","\u062A\u0623\u062E\u0631 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","2026-05-01","08:30","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 1","\u0645\u062A\u0648\u0633\u0637\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631","\u0625\u0646\u0630\u0627\u0631 \u0634\u0641\u0647\u064A","100"],i=XLSX.utils.book_new(),a=XLSX.utils.aoa_to_sheet([e,t]);a["!cols"]=e.map(()=>({wch:18})),XLSX.utils.book_append_sheet(i,a,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const n=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],['\u2022 \u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635: \u0627\u0643\u062A\u0628 "\u0645\u0648\u0638\u0641" \u0623\u0648 "\u0645\u0642\u0627\u0648\u0644".'],["\u2022 \u0644\u0644\u0645\u0648\u0638\u0641: \u0639\u0628\u0651\u0626 \u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629."],["\u2022 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0639\u0628\u0651\u0626 \u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u0628\u0626\u0629 \u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644."],["\u2022 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 \u062A\u0646\u0633\u064A\u0642 \u062A\u0627\u0631\u064A\u062E \u0625\u0643\u0633\u0644."]],o=XLSX.utils.aoa_to_sheet(n);XLSX.utils.book_append_sheet(i,o,"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(i,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},showViolationsImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0646 Excel</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
                        <p class="m-0 mb-2"><i class="fas fa-download ml-2"></i>\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0641\u0627\u0631\u063A (\u0635\u0641 \u0639\u0646\u0627\u0648\u064A\u0646 + \u0635\u0641 \u0645\u062B\u0627\u0644)\u060C \u0639\u0628\u0651\u0626 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062B\u0645 \u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641.</p>
                        <button type="button" id="violations-import-download-template" class="btn-secondary btn-sm">
                            <i class="fas fa-file-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0644\u0628 Excel
                        </button>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0641 Excel (.xlsx)</label>
                        <input type="file" id="violations-import-file" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="violations-import-preview" class="hidden text-sm text-gray-600 max-h-48 overflow-auto border rounded p-2 bg-gray-50"></div>
                    <div class="flex justify-end gap-2 pt-2 border-t">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="violations-import-confirm" class="btn-primary" disabled>
                            <i class="fas fa-upload ml-2"></i>\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                        </button>
                    </div>
                </div>
            </div>`,document.body.appendChild(e);let t=[];const i=e.querySelector("#violations-import-file"),a=e.querySelector("#violations-import-preview"),n=e.querySelector("#violations-import-confirm");e.querySelector("#violations-import-download-template")?.addEventListener("click",()=>this.downloadViolationsImportTemplate()),i?.addEventListener("change",async o=>{const r=o.target.files&&o.target.files[0];if(t=[],n.disabled=!0,a.classList.add("hidden"),!!r){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const l=await r.arrayBuffer(),c=XLSX.read(l,{type:"array"}),s=c.Sheets[c.SheetNames[0]],d=XLSX.utils.sheet_to_json(s,{defval:""});t=Array.isArray(d)?d:[],a.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xAB${Utils.escapeHTML(c.SheetNames[0]||"")}\xBB.</p>`,a.classList.remove("hidden"),n.disabled=t.length===0}catch(l){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",l),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(l.message||""))}}}),n?.addEventListener("click",async()=>{t.length&&(n.disabled=!0,await this.processViolationsImportRows(t,e))}),e.addEventListener("click",o=>{o.target===e&&e.remove()})},async processViolationsImportRows(e,t){let i=0,a=0;const n=[];Array.isArray(AppState.appData.violations)||(AppState.appData.violations=[]);let o=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),o=ViolationTypesManager.getAll()}catch{o=AppState.appData.violationTypes||[]}else o=AppState.appData.violationTypes||[];const r=new Map((o||[]).map(c=>[String(c.name||"").trim().toLowerCase(),c])),l=new Set;for(let c=0;c<e.length;c++){const s=e[c]||{},d=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim();d&&!r.has(d.toLowerCase())&&l.add(d)}if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.addType&&ViolationTypesManager.getTypeByName)try{ViolationTypesManager.ensureInitialized(),l.forEach(c=>{const s=c.toLowerCase();try{const d=ViolationTypesManager.addType({name:c,description:"",fineAmount:0});r.set(s,d)}catch{const p=ViolationTypesManager.getTypeByName(c);p&&r.set(s,p)}})}catch(c){Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641:",c)}for(let c=0;c<e.length;c++){const s=e[c]||{};try{const p=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635","personType","persontype"])||"").trim().toLowerCase(),f=p.includes("\u0645\u0642\u0627\u0648\u0644")||p==="contractor"?"contractor":"employee",u=String(this._violationsImportPick(s,["\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","employeeCode","employeenumber","employeeNumber"])||"").trim(),w=String(this._violationsImportPick(s,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641","employeeName"])||"").trim(),m=String(this._violationsImportPick(s,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorName"])||"").trim(),h=String(this._violationsImportPick(s,["\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorWorker"])||"").trim(),g=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim(),D=this._violationsImportPick(s,["\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationDate","date"]),B=String(this._violationsImportPick(s,["\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationTime","time"])||"08:00"),T=String(this._violationsImportPick(s,["\u0627\u0644\u0645\u0648\u0642\u0639","violationLocation","location"])||"").trim(),C=String(this._violationsImportPick(s,["\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationPlace","place"])||"").trim(),F=String(this._violationsImportPick(s,["\u0627\u0644\u0634\u062F\u0629","severity"])||"\u0645\u062A\u0648\u0633\u0637\u0629").trim(),$=String(this._violationsImportPick(s,["\u0627\u0644\u062D\u0627\u0644\u0629","status"])||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").trim(),S=String(this._violationsImportPick(s,["\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","violationDetails","details"])||"").trim(),_=String(this._violationsImportPick(s,["\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","actionTaken","action"])||"").trim(),O=this._violationsImportPick(s,["\u0627\u0644\u063A\u0631\u0627\u0645\u0629","fineAmount","fine"]);if(!g||!D){a++,n.push(`\u0635\u0641 ${c+2}: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0646\u0627\u0642\u0635`);continue}if(f==="employee"&&!u){a++,n.push(`\u0635\u0641 ${c+2}: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641`);continue}if(f==="contractor"&&!m){a++,n.push(`\u0635\u0641 ${c+2}: \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628`);continue}let P=D;if(typeof P=="number"&&typeof XLSX<"u"&&XLSX.SSF)try{const W=XLSX.SSF.parse_date_code(P);W&&(P=new Date(Date.UTC(W.y,W.m-1,W.d)).toISOString())}catch{}else if(typeof P=="string"&&/^\d{4}-\d{2}-\d{2}/.test(P.trim()))P=new Date(P.trim().slice(0,10)+"T12:00:00").toISOString();else{const W=new Date(P);P=isNaN(W.getTime())?new Date().toISOString():W.toISOString()}const R=r.get(g.toLowerCase()),v=R?String(R.id||""):"",U=this.parseFineAmount(O!==""&&O!==void 0?O:R?R.fineAmount:0),G={personType:f,violationDate:P,employeeCode:u,employeeNumber:u,employeeName:w,contractorName:m,contractorWorker:h},it=this.countPriorViolationsSamePersonMonth(G,null)+1,ot={id:Utils.generateId("VIOLATION"),isoCode:typeof generateISOCode=="function"?generateISOCode("VIOL",AppState.appData.violations):"VIOL-"+Date.now()+"-"+c,personType:f,employeeId:f==="employee"?Utils.generateId("EMP"):"",employeeName:f==="employee"?w:"",employeeCode:f==="employee"?u:"",employeeNumber:f==="employee"?u:"",employeePosition:"",employeeDepartment:"",contractorId:"",contractorName:f==="contractor"?m:"",contractorWorker:f==="contractor"?h:"",contractorPosition:"",contractorDepartment:"",violationTypeId:v,violationType:g,fineAmount:U,violationDate:P,violationTime:B.length>=5?B.slice(0,5):"08:00",violationLocation:T,violationLocationId:T,violationPlace:C,violationPlaceId:C,violationDetails:S,severity:F||"\u0645\u062A\u0648\u0633\u0637\u0629",actionTaken:_,status:$||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",photo:"",violationSequenceInMonth:it,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.violations.push(this.normalizeViolationRecord(ot)),i++}catch(d){a++,n.push(`\u0635\u0641 ${c+2}: ${d.message||d}`)}}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(GoogleIntegration.autoSave("Violations",AppState.appData.violations).catch(()=>{Notification.warning("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A \u0644\u0627\u062D\u0642\u0627\u064B.")}),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureViolationsTypeIds)try{ViolationTypesManager.ensureViolationsTypeIds()}catch{}t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u062E\u0627\u0644\u0641\u0629${a?` (\u062A\u062E\u0637\u064A ${a})`:""}.`),n.length&&n.length<=5?n.forEach(c=>Utils.safeWarn(c)):n.length&&Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+n.slice(0,5).join(" | ")+" ..."),this.load()},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u"){const t=document.getElementById("violations-section");t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</h3>
                                <p class="text-gray-500 mb-4">\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `);return}const e=document.getElementById("violations-section");if(!e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 violations-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{if(typeof AppState>"u"){Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629."),e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</h3>
                                <p class="text-gray-500 mb-4">\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `;return}if(AppState.appData||(AppState.appData={}),AppState.appData.violations||(AppState.appData.violations=[]),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized)try{ViolationTypesManager.ensureInitialized()}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 ViolationTypesManager:",s)}else(!AppState.appData.violationTypes||!Array.isArray(AppState.appData.violationTypes))&&(AppState.appData.violationTypes=[]);const t=Array.isArray(AppState.appData.violations)&&AppState.appData.violations.length>0,i=(()=>{try{return localStorage.getItem("violations_last_sync")}catch{return null}})(),a=i?Date.now()-parseInt(i,10):1/0,n=600*1e3,o=a>=n,r=typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets,l=AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl;if(!t&&r&&l)try{await this.ensureViolationsCoreDataLoaded({force:!0})}catch{}else o&&t&&r&&l&&this.ensureViolationsCoreDataLoaded({force:!0}).then(()=>{try{const s=document.getElementById("violations-stats-cards");s&&(s.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters()),this.bindFilters()}catch{}});const c=(s,d)=>this._t(s,d);e.innerHTML=`
            <div class="section-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 16px; padding: 24px 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(220, 38, 38, 0.25);">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div class="text-center w-full" style="flex-grow: 1; min-width: 200px;">
                        <h1 class="section-title" style="color: white; font-size: 2rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-exclamation-triangle ml-3" style="font-size: 1.8rem;"></i>
                            ${c("module.violations.title","\u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}
                        </h1>
                        <p class="section-subtitle" style="color: rgba(255,255,255,0.9); font-size: 1rem; margin: 0;">${c("module.violations.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</p>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap gap-2 justify-center">
                        <button type="button" id="add-violation-btn" class="btn-primary" style="background: white; color: #dc2626; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                            <i class="fas fa-plus ml-2"></i>
                            ${c("module.violations.btn.new","\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629")}
                        </button>
                        <button type="button" id="viol-approvals-btn" onclick="Violations.showViolationApprovalsManager()" style="background: rgba(255,255,255,0.18); color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 12px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" title="${c("module.violations.btn.approvals","\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${c("module.violations.btn.approvals","\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <!-- Tabs Navigation -->
                <div class="tabs-container mb-4">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="all" onclick="Violations.switchTab('all')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-list ml-2"></i>${c("module.violations.tab.all","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}
                        </button>
                        <button class="tab-btn" data-tab="employees" onclick="Violations.switchTab('employees')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-tie ml-2"></i>${c("module.violations.tab.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                        </button>
                        <button class="tab-btn" data-tab="contractors" onclick="Violations.switchTab('contractors')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-users-cog ml-2"></i>${c("module.violations.tab.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}
                        </button>
                        <button class="tab-btn" data-tab="analytics" onclick="Violations.switchTab('analytics')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-chart-bar ml-2"></i>${c("module.violations.tab.analytics","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                        </button>
                        <button class="tab-btn" data-tab="blacklist" onclick="Violations.switchTabAsync('blacklist')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-slash ml-2"></i>${c("module.violations.tab.blacklist","\u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u2013 Blacklist")}
                        </button>
                        <button id="violations-btn-refresh" type="button" class="tab-btn" onclick="Violations.refreshModule()" title="${c("module.common.refresh","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-sync-alt ml-2"></i>${c("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                        </button>
                    </div>
                </div>
                
                <!-- Tab Content -->
                <div id="violations-tab-content">
                    <div class="content-card" id="violations-list-tab">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h2>
                    </div>
                    <div class="card-body">
                        ${this.renderAllViolationsStats()}
                        <div id="violations-filters-container" class="mb-4">
                            ${this.renderFilters()}
                        </div>
                        <div id="violations-list" class="violations-list-scroll">
                            ${this.renderViolationsList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupEventListeners(),this._prefetchViolationApprovalPanelData(),Promise.resolve(this.ensureViolationsCoreDataLoaded({force:!1})).then(()=>{try{const s=document.getElementById("violations-stats-cards");s&&(s.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters())}catch{}}).catch(()=>{})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",t),e.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-exclamation-circle ml-3"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Violations.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async ensureViolationsCoreDataLoaded({force:e=!1}={}){return this._violationsCoreLoadPromise&&!e?this._violationsCoreLoadPromise:(this._violationsCoreLoadPromise=(async()=>{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl))return;const[i,a]=await Promise.all([GoogleIntegration.readFromSheets("Violations").catch(()=>null),GoogleIntegration.readFromSheets("ViolationTypes").catch(()=>null)]);if(Array.isArray(i)){const n=i.map(r=>this.normalizeViolationRecord(r)).filter(Boolean),o=Array.isArray(AppState.appData.violations)?AppState.appData.violations:[];if(n.length===0&&o.length>0)Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u0627\u0631\u063A\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${o.length} \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u062D\u0644\u064A\u0629`);else{const r=new Set(n.map(s=>s&&s.id).filter(Boolean)),l=Date.now()-300*1e3,c=o.filter(s=>!s||!s.id||r.has(s.id)?!1:new Date(s.createdAt||s.timestamp||0).getTime()>=l);AppState.appData.violations=c.length>0?[...c,...n]:n}}if(Array.isArray(a)){const n=Array.isArray(AppState.appData.violationTypes)?AppState.appData.violationTypes:[];if(a.length>0?AppState.appData.violationTypes=a:n.length===0&&(AppState.appData.violationTypes=[]),a.length>0||a.length===0&&n.length===0)try{AppState.syncMeta||(AppState.syncMeta={sheets:{},users:0,lastSyncTime:0,userEmail:null}),AppState.syncMeta.sheets||(AppState.syncMeta.sheets={}),AppState.syncMeta.sheets.ViolationTypes=Date.now()}catch{}}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized()}catch{}try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}})().finally(()=>{this._violationsCoreLoadPromise=null}),this._violationsCoreLoadPromise)},renderViolationsList(){try{const e=this.getFilteredViolations();return!e||e.length===0?`<div class="empty-state"><p class="text-gray-500">${this.hasActiveFilters()?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629"}</p></div>`:`
                <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
                    <table class="data-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641/\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.85rem;">\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0634\u0647\u0631</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0634\u062F\u0629</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${e.map((t,i)=>`
                                <tr style="background: ${i%2===0?"#ffffff":"#fef2f2"}; transition: all 0.2s ease;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='${i%2===0?"#ffffff":"#fef2f2"}'">
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-weight: 500;">
                                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                            <i class="fas ${t.employeeName?"fa-user-tie":"fa-hard-hat"}" style="color: ${t.employeeName?"#3b82f6":"#f59e0b"};"></i>
                                            ${Utils.escapeHTML(t.employeeName||t.contractorName||"-")}
                                        </div>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        ${Utils.escapeHTML(t.violationType||"-")}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-weight: 600; color: #166534;">
                                        ${this.formatFineAmount(Number(t.fineAmount||0))}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-size: 0.85rem; color: #6b7280;">
                                        ${Utils.escapeHTML(t.violationLocation||"-")}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        ${t.violationDate?Utils.formatDate(t.violationDate):"-"}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-size: 0.85rem; color: #92400e;">
                                        ${t.violationSequenceInMonth!=null&&t.violationSequenceInMonth!==""?Utils.escapeHTML(String(t.violationSequenceInMonth)):"\u2014"}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <span style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"linear-gradient(135deg, #ef4444, #dc2626)":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"linear-gradient(135deg, #f59e0b, #d97706)":"linear-gradient(135deg, #3b82f6, #2563eb)"}; color: white; box-shadow: 0 2px 6px ${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"rgba(239,68,68,0.3)":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"rgba(245,158,11,0.3)":"rgba(59,130,246,0.3)"};">
                                            ${t.severity||"-"}
                                        </span>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <span style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${t.status==="\u0645\u062D\u0644\u0648\u0644"?"linear-gradient(135deg, #10b981, #059669)":t.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"linear-gradient(135deg, #6366f1, #4f46e5)":"linear-gradient(135deg, #f59e0b, #d97706)"}; color: white;">
                                            ${t.status||"-"}
                                        </span>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                            <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(t.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(59,130,246,0.3);" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(t.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(139,92,246,0.3);" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button type="button" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(t.id)}, this)' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #10b981, #059669); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(16,185,129,0.3);" title="\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF \u0645\u0628\u0627\u0634\u0631\u0629" aria-label="\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF">
                                                <i class="fas fa-file-download"></i>
                                            </button>
                                            <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(t.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(239,68,68,0.3);" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            `}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A renderViolationsList:",e),'<div class="empty-state"><p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}},updateAllViolationsStats(){try{const e=document.getElementById("violations-stats-cards");if(!e)return;const t=document.createElement("div");t.innerHTML=this.renderAllViolationsStats();const i=t.querySelector("#violations-stats-cards");i&&e.replaceWith(i)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A:",e)}},renderAllViolationsStats(){const e=this.getFilteredViolations(),t=e.length,i=e.filter(o=>o&&(o.personType==="employee"||!!o.employeeName&&!o.contractorName)).length,a=e.filter(o=>o&&(o.personType==="contractor"||!!o.contractorName)).length,n=e.reduce((o,r)=>{const l=Number(r?.fineAmount||0);return o+(Number.isFinite(l)&&l>0?l:0)},0);return`
            <div id="violations-stats-cards" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                <div class="stat-card" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 1px solid #fca5a5;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-2xl font-bold text-red-700">${t}</p>
                        </div>
                        <i class="fas fa-list text-red-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 1px solid #86efac;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</p>
                            <p class="text-2xl font-bold text-green-700">${this.formatFineAmount(n)}</p>
                        </div>
                        <i class="fas fa-money-bill-wave text-green-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 1px solid #93c5fd;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p>
                            <p class="text-2xl font-bold text-blue-700">${i}</p>
                        </div>
                        <i class="fas fa-user-tie text-blue-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fdba74;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-orange-700">${a}</p>
                        </div>
                        <i class="fas fa-users-cog text-orange-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `},hasActiveFilters(){const e=this.currentFilters||{};return!!(e.search||e.personType||e.violationType||e.severity||e.status)},getViolationsPermissions(e=AppState.currentUser){if(!e)return{viewDepartmentOnly:!0,viewAll:!1};if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin(e))return{viewDepartmentOnly:!1,viewAll:!0};const t=e.permissions||{},i=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t):t,n=(i&&i.violationsPermissions||{})["violations-view-all"]===!0;return{viewDepartmentOnly:!n,viewAll:n}},isDepartmentMatch(e,t){if(!e||!t)return!1;const i=o=>String(o).trim().toLowerCase().replace(/^(إدارة|قسم)\s+/,"").replace(/\s+/g," "),a=i(e),n=i(t);return a===n||a.includes(n)||n.includes(a)},isViolationVisibleToCurrentUser(e){if(!e)return!1;const t=this.normalizeViolationRecord(e);if(!t)return!1;if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()||this.getViolationsPermissions().viewAll)return!0;if(t.personType==="employee"||!!String(t.employeeName||"").trim()){const n=String(AppState.currentUser?.department||"").trim();let o=String(t.employeeDepartment||"").trim();if(!o&&(t.employeeId||t.employeeCode||t.employeeName)){const r=AppState.appData?.employees||[],l=String(t.employeeId||t.employeeCode||t.employeeName).trim().toLowerCase(),c=r.find(s=>{if(!s)return!1;const d=String(s.id||s.employeeId||s.code||"").trim().toLowerCase(),p=String(s.name||s.employeeName||"").trim().toLowerCase();return d&&d===l||p&&p===l});c&&(o=String(c.department||c.section||"").trim())}return!n||!o?!1:this.isDepartmentMatch(n,o)}return!0},getFilteredViolations(){try{if(typeof AppState>"u"||!AppState.appData)return[];const e=(AppState.appData.violations||[]).map(c=>{const s=this.normalizeViolationRecord(c);if(!s)return null;const d=this.getEffectiveFineAmount(s);return d===s.fineAmount?s:{...s,fineAmount:d}}).filter(Boolean).filter(c=>this.isViolationVisibleToCurrentUser(c)),t=this.currentFilters||{},i=String(t.search||"").trim().toLowerCase(),a=t.personType||"",n=(t.violationType||"").toLowerCase(),o=t.severity||"",r=t.status||"";let l=[];if(i&&typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"){const c=[...AppState?.appData?.approvedContractors||[],...AppState?.appData?.contractors||[]].filter(Boolean),s=Utils.findApprovedContractorByTerm(i,c);l=(s.matches&&s.matches.length>0?s.matches:s.contractor?[s.contractor]:[]).map(p=>Utils.buildContractorIdentityMatcher(p,i))}return e.filter(c=>{if(!c||a==="employee"&&!c.employeeName&&c.personType!=="employee"||a==="contractor"&&!c.contractorName&&!c.contractorCode&&!c.contractorId&&c.personType!=="contractor"||n&&(c.violationType||"").trim().toLowerCase()!==n||o&&(c.severity||"")!==o||r&&(c.status||"")!==r)return!1;if(i){let s=!1;if(l.length>0&&l.some(d=>d.violationBelongsToContractor(c))&&(s=!0),s||(s=Object.values(c||{}).map(p=>String(p??"").toLowerCase()).join(" ").includes(i)),!s)return!1}return!0})}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A getFilteredViolations:",e),[]}},renderFilters(e=""){const t=this.currentFilters||{};e&&(t.personType=e);let i=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),i=ViolationTypesManager.getAll()}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",n),i=[]}else i=typeof AppState<"u"&&AppState?.appData?.violationTypes?AppState.appData.violationTypes:[];const a=i.map(n=>`
            <option value="${Utils.escapeHTML(n.name)}" ${t.violationType===n.name?"selected":""}>
                ${Utils.escapeHTML(n.name)}
            </option>
        `).join("");return`
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <div style="display:grid; grid-template-columns: minmax(170px, 0.9fr) repeat(4, minmax(140px, 1fr)) minmax(150px, 0.9fr); gap: 10px; align-items:end;">
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-search" style="font-size:12px; font-weight:700; color:#4a5568;">\u0628\u062D\u062B</label>
                        <div class="relative">
                            <input type="text" id="violations-filter-search" class="form-input pr-10" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;" placeholder="\u0628\u062D\u062B..." value="${Utils.escapeHTML(t.search||"")}">
                            <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"></i>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-person" style="font-size:12px; font-weight:700; color:#4a5568;">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</label>
                        <select id="violations-filter-person" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${t.personType===""?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u062E\u0627\u0635</option>
                            <option value="employee" ${t.personType==="employee"?"selected":""}>\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646</option>
                            <option value="contractor" ${t.personType==="contractor"?"selected":""}>\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-type" style="font-size:12px; font-weight:700; color:#4a5568;">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</label>
                        <select id="violations-filter-type" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${t.violationType===""?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                            ${a}
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-severity" style="font-size:12px; font-weight:700; color:#4a5568;">\u0627\u0644\u0634\u062F\u0629</label>
                        <select id="violations-filter-severity" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${t.severity===""?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062F\u0631\u062C\u0627\u062A</option>
                            <option value="\u0639\u0627\u0644\u064A\u0629" ${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                            <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                            <option value="\u0645\u0646\u062E\u0636\u0629" ${t.severity==="\u0645\u0646\u062E\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-status" style="font-size:12px; font-weight:700; color:#4a5568;">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                        <select id="violations-filter-status" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${t.status===""?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${t.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                            <option value="\u0645\u062D\u0644\u0648\u0644" ${t.status==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                            <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${t.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label style="font-size:12px; font-weight:700; color:#4a5568;">&nbsp;</label>
                        <button type="button" id="violations-filter-reset" style="width:100%; height:42px; border:none; border-radius:8px; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:#fff; font-size:13px; font-weight:700; cursor:pointer;">
                            <i class="fas fa-undo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646
                        </button>
                    </div>
                </div>
            </div>
        `},bindFilters(){const e=document.getElementById("violations-filter-search"),t=document.getElementById("violations-filter-person"),i=document.getElementById("violations-filter-type"),a=document.getElementById("violations-filter-severity"),n=document.getElementById("violations-filter-status"),o=document.getElementById("violations-filter-reset");e&&(e.value=this.currentFilters.search||"",e.oninput=()=>{this.currentFilters.search=e.value||"",this.refreshViolationsView({skipFilterRerender:!0})}),t&&(t.value=this.currentFilters.personType||"",t.onchange=()=>{this.currentFilters.personType=t.value,this.refreshViolationsView()}),i&&(i.value=this.currentFilters.violationType||"",i.onchange=()=>{this.currentFilters.violationType=i.value,this.refreshViolationsView()}),a&&(a.value=this.currentFilters.severity||"",a.onchange=()=>{this.currentFilters.severity=a.value,this.refreshViolationsView()}),n&&(n.value=this.currentFilters.status||"",n.onchange=()=>{this.currentFilters.status=n.value,this.refreshViolationsView()}),o&&(o.onclick=()=>{this.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""},this.refreshViolationsView()})},refreshViolationsView(e={}){const t=!!e.skipFilterRerender,i=document.getElementById("violations-list");if(i)switch(document.querySelector(".tab-btn.active")?.dataset.tab||"all"){case"employees":i.innerHTML=this.renderEmployeeViolationsList();break;case"contractors":i.innerHTML=this.renderContractorViolationsList();break;case"analytics":return;default:i.innerHTML=this.renderViolationsList()}const a=document.getElementById("violations-stats-cards");a&&(a.outerHTML=this.renderAllViolationsStats());const n=document.getElementById("violations-filters-container");if(n&&!t){const o=document.querySelector(".tab-btn.active")?.dataset.tab||"all",r=o==="employees"?"employee":o==="contractors"?"contractor":"";n.innerHTML=this.renderFilters(r)}t||this.bindFilters()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-violation-btn");e&&e.addEventListener("click",()=>this.showViolationForm()),this.bindFilters()},100)},async switchTab(e){document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.remove("active"),n.dataset.tab===e&&n.classList.add("active"),n.style.flexShrink||(n.style.setProperty("flex-shrink","0","important"),n.style.setProperty("min-width","fit-content","important"),n.style.setProperty("white-space","nowrap","important"),n.style.setProperty("width","auto","important"),n.style.setProperty("max-width","none","important"))});const i=document.querySelector(".tabs-nav");i&&!i.style.flexWrap&&(i.style.setProperty("flex-wrap","nowrap","important"),i.style.setProperty("overflow-x","auto","important"),i.style.setProperty("overflow-y","visible","important"));const a=document.getElementById("violations-tab-content");if(a)switch(e){case"all":a.innerHTML=`
                    <div class="content-card" id="violations-list-tab">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h2>
                        </div>
                        <div class="card-body">
                            ${this.renderAllViolationsStats()}
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters()}
                            </div>
                            <div id="violations-list">
                                ${this.renderViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"employees":a.innerHTML=`
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-user-tie ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h2>
                        </div>
                        <div class="card-body">
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters("employee")}
                            </div>
                            <div id="violations-list">
                                ${this.renderEmployeeViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"contractors":a.innerHTML=`
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-users-cog ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                        </div>
                        <div class="card-body">
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters("contractor")}
                            </div>
                            <div class="mb-4 flex items-center justify-end">
                                <button type="button" class="btn-primary" onclick="Violations.showContractorViolationsReportDialog()">
                                    <i class="fas fa-file-export ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                                </button>
                            </div>
                            <div id="violations-list">
                                ${this.renderContractorViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"analytics":a.innerHTML=this.renderAnalyticsTab(),setTimeout(()=>{this.updateViolationAnalytics(),this._vBindAnalyticsEvents()},80);break;case"blacklist":a.innerHTML=this.renderBlacklistTab(),this.setupBlacklistEventListeners(),this.loadBlacklistDataAsync().then(()=>{this.refreshBlacklistDisplay()}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",n)});break}},async switchTabAsync(e){try{await this.switchTab(e)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}},refreshModule(){const e=document.getElementById("violations-btn-refresh");if(e){e.disabled=!0;const i=e.querySelector("i.fa-sync-alt");i&&i.classList.add("fa-spin")}const t=typeof this.load=="function"?this.load():Promise.resolve();Promise.resolve(t).finally(()=>{const i=document.getElementById("violations-btn-refresh");if(i){i.disabled=!1;const a=i.querySelector("i.fa-sync-alt");a&&a.classList.remove("fa-spin")}})},renderEmployeeViolationsList(){const e=this.getFilteredViolations().filter(t=>t.employeeName||t.personType==="employee"||!t.contractorName&&t.employeeName);return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p></div>':`
            <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0634\u062F\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.map(t=>`
                        <tr>
                            <td>${Utils.escapeHTML(t.employeeName||"")}</td>
                            <td>${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"-")}</td>
                            <td>${Utils.escapeHTML(t.violationType||"")}</td>
                            <td>${t.violationDate?Utils.formatDate(t.violationDate):"-"}</td>
                            <td>
                                <span class="badge badge-${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"warning":"info"}">
                                    ${t.severity||"-"}
                                </span>
                            </td>
                            <td>${Utils.escapeHTML(t.actionTaken||"")}</td>
                            <td>
                                <span class="badge badge-${t.status==="\u0645\u062D\u0644\u0648\u0644"?"success":"warning"}">
                                    ${t.status||"-"}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            </div>
        `},renderContractorViolationsList(){const e=this.getFilteredViolations().filter(t=>t.contractorName||t.contractorCode||t.contractorId||t.personType==="contractor");return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p></div>':`
            <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0634\u062F\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.map(t=>`
                        <tr>
                            <td>${Utils.escapeHTML(t.contractorName||"")}</td>
                            <td>${Utils.escapeHTML(t.violationType||"")}</td>
                            <td>${t.violationDate?Utils.formatDate(t.violationDate):"-"}</td>
                            <td>
                                <span class="badge badge-${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"warning":"info"}">
                                    ${t.severity||"-"}
                                </span>
                            </td>
                            <td>${Utils.escapeHTML(t.actionTaken||"")}</td>
                            <td>
                                <span class="badge badge-${t.status==="\u0645\u062D\u0644\u0648\u0644"?"success":"warning"}">
                                    ${t.status||"-"}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(t.id)}, this)' class="btn-icon violation-report-download-btn" title="\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF \u0645\u0628\u0627\u0634\u0631\u0629" aria-label="\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 PDF" style="background:linear-gradient(135deg,#059669,#047857);color:#fff;border:1px solid rgba(4,120,87,.25);box-shadow:0 4px 10px rgba(5,150,105,.24);">
                                        <i class="fas fa-file-download"></i>
                                    </button>
                                    <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(t.id)})' class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            </div>
        `},getContractorViolationsExportOptions(){const e=new Map,t=(i,a,n="")=>{const o=String(a||"").replace(/\s+/g," ").trim();if(!o)return;const r=this._normalizeContractorExportName(o);!r||e.has(r)||e.set(r,{id:String(i||n||o).trim(),name:o,code:String(n||"").trim()})};return typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!1}).forEach(i=>t(i.id,i.name,i.code)):((AppState.appData?.contractors||[]).forEach(i=>{t(i.id||i.contractorId,i.name||i.companyName,i.code||i.contractorCode||i.isoCode)}),(AppState.appData?.approvedContractors||[]).forEach(i=>{t(i.id||i.contractorId,i.companyName||i.name,i.code||i.contractorCode)})),(AppState.appData?.violations||[]).forEach(i=>{i?.contractorName&&t(i.contractorId,i.contractorName,i.contractorCode||i.code||i.isoCode)}),Array.from(e.values()).sort((i,a)=>i.name.localeCompare(a.name,"ar",{sensitivity:"base"}))},_normalizeContractorExportName(e){const t=String(e||"").replace(/\s+/g," ").trim();if(!t)return"";const i=t.indexOf(" - "),a=i>0?t.slice(0,i).trim():t;return this._normKeyStr(a)},_buildContractorExportMatcher(e="",t="",i=""){const a=String(e||"").trim(),n=String(t||"").trim(),o=String(i||"").trim();if(!a&&!n&&!o)return null;let r=null;typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"&&(r=Contractors.resolveContractorForAnalytics(a||o,n));const l=a||o||n,c=r||{id:a,name:n,companyName:n,code:o,contractorCode:o};if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(c,l);if(typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function")return Contractors.buildContractorAnalyticsMatchers(c,l);const s=this._normalizeContractorExportName(n||a),d=new Set([a,o].filter(Boolean).map(p=>String(p).trim().toLowerCase()));return{violationBelongsToContractor:p=>{if(!p||!(p.personType==="contractor"||!!String(p.contractorName||"").trim()))return!1;const u=this._normalizeContractorExportName(p.contractorName),w=String(p.contractorId||p.contractorCode||p.code||"").trim().toLowerCase();return w&&d.has(w)?!0:!!s&&u===s}}},showContractorViolationsReportDialog(){const e=this.getContractorViolationsExportOptions(),t=new Date,i=t.getFullYear(),a=[];for(let p=0;p<24;p++){const f=new Date(i,t.getMonth()-p,1),u=f.getFullYear(),w=f.getMonth()+1,m=`${u}-${String(w).padStart(2,"0")}`,h=f.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});a.push({value:m,label:h})}const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-export ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                        </label>
                        <select id="contractor-violations-report-select" class="form-input">
                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</option>
                            ${e.map(p=>`
                                <option value="${Utils.escapeHTML(String(p.id??"").trim())}" data-contractor-name="${Utils.escapeHTML(p.name||"")}" data-contractor-code="${Utils.escapeHTML(p.code||"")}">
                                    ${Utils.escapeHTML(p.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")}
                                </option>
                            `).join("")}
                        </select>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            \u0627\u062E\u062A\u0631 \u0645\u0642\u0627\u0648\u0644\u0627\u064B \u0645\u062D\u062F\u062F\u0627\u064B \u0644\u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631\u0647 \u0641\u0642\u0637\u060C \u0623\u0648 \u0627\u062A\u0631\u0643\u0647 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </p>
                    </div>

                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631
                        </label>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-all" name="contractor-violations-range-type" value="all" class="ml-2" checked>
                                <label for="contractor-violations-range-all" class="text-sm text-gray-700 cursor-pointer">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-month" name="contractor-violations-range-type" value="month" class="ml-2">
                                <label for="contractor-violations-range-month" class="text-sm text-gray-700 cursor-pointer mr-2">\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</label>
                                <select id="contractor-violations-report-month" class="form-input flex-1" disabled style="max-width: 300px;">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0647\u0631</option>
                                    ${a.map(p=>`<option value="${p.value}">${p.label}</option>`).join("")}
                                </select>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-custom" name="contractor-violations-range-type" value="custom" class="ml-2">
                                <label for="contractor-violations-range-custom" class="text-sm text-gray-700 cursor-pointer mr-2">\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629</label>
                                <div class="flex items-center gap-2 flex-1" style="max-width: 400px;">
                                    <input type="date" id="contractor-violations-report-from-date" class="form-input flex-1" disabled>
                                    <span class="text-sm text-gray-600">\u0625\u0644\u0649</span>
                                    <input type="date" id="contractor-violations-report-to-date" class="form-input flex-1" disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            <i class="fas fa-file ml-2"></i>
                            \u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631
                        </label>
                        <div class="flex flex-wrap items-center gap-4">
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-format-pdf" name="contractor-violations-export-format" value="pdf" class="ml-2" checked>
                                <label for="contractor-violations-format-pdf" class="text-sm text-gray-700 cursor-pointer">
                                    <i class="fas fa-file-pdf text-red-600 ml-1"></i>PDF
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-format-excel" name="contractor-violations-export-format" value="excel" class="ml-2">
                                <label for="contractor-violations-format-excel" class="text-sm text-gray-700 cursor-pointer">
                                    <i class="fas fa-file-excel text-green-600 ml-1"></i>Excel (.xlsx)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="generate-contractor-violations-report-btn">
                        <i class="fas fa-file-export ml-2"></i>
                        \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n);const o=()=>n.remove();n.querySelector(".modal-close")?.addEventListener("click",o),n.querySelector('[data-action="close"]')?.addEventListener("click",o),n.addEventListener("click",p=>{p.target===n&&o()});const r=n.querySelectorAll('input[name="contractor-violations-range-type"]'),l=n.querySelector("#contractor-violations-report-month"),c=n.querySelector("#contractor-violations-report-from-date"),s=n.querySelector("#contractor-violations-report-to-date"),d=()=>{const p=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all";l.disabled=p!=="month",l.required=p==="month",c.disabled=p!=="custom",c.required=p==="custom",s.disabled=p!=="custom",s.required=p==="custom"};r.forEach(p=>p.addEventListener("change",d)),n.querySelector("#generate-contractor-violations-report-btn")?.addEventListener("click",async()=>{const p=n.querySelector("#contractor-violations-report-select"),f=p&&p.selectedIndex>=0?p.options[p.selectedIndex]:null,u=p?.selectedIndex===0,w=!u&&f?.value?String(f.value).trim():"",m=!u&&f?.dataset?.contractorName?String(f.dataset.contractorName).trim():"",h=!u&&f?.dataset?.contractorCode?String(f.dataset.contractorCode).trim():"",g=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all",D=n.querySelector("#contractor-violations-report-month")?.value||"",B=n.querySelector("#contractor-violations-report-from-date")?.value||"",T=n.querySelector("#contractor-violations-report-to-date")?.value||"",C=n.querySelector('input[name="contractor-violations-export-format"]:checked')?.value||"pdf";if(g==="month"&&!D){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(g==="custom"){if(!B||!T){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(B)>new Date(T)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}o(),await this.generateContractorViolationsReport(w,{dateRangeType:g,month:D,fromDate:B,toDate:T,exportFormat:C},m,h)})},_collectContractorViolationsForExport_(e="",t={},i="",a=""){const n=this._buildContractorExportMatcher(e,i,a);let o=(AppState.appData.violations||[]).map(p=>this.normalizeViolationRecord(p)).filter(Boolean).filter(p=>p?.personType==="contractor"||!!String(p?.contractorName||"").trim());n&&(o=o.filter(p=>n.violationBelongsToContractor(p)));const{dateRangeType:r="all",month:l="",fromDate:c="",toDate:s=""}=t||{};if(r==="month"&&l){const[p,f]=l.split("-");o=o.filter(u=>{if(!u.violationDate)return!1;const w=new Date(u.violationDate);return w.getFullYear()===parseInt(p,10)&&w.getMonth()+1===parseInt(f,10)})}else if(r==="custom"&&c&&s){const p=new Date(c);p.setHours(0,0,0,0);const f=new Date(s);f.setHours(23,59,59,999),o=o.filter(u=>{if(!u.violationDate)return!1;const w=new Date(u.violationDate);return w>=p&&w<=f})}let d="";if(r==="month"&&l){const[p,f]=l.split("-");d=new Date(parseInt(p,10),parseInt(f,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else r==="custom"&&c&&s&&(d=`\u0645\u0646 ${Utils.formatDate(c)} \u0625\u0644\u0649 ${Utils.formatDate(s)}`);return{violations:o,periodInfo:d,dateRangeType:r}},exportContractorViolationsToExcel_(e,t="",i=""){if(typeof XLSX>"u")return Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),!1;const a=e.map((s,d)=>({"#":d+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":s.contractorName||"","\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644":s.contractorCode||"","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":s.contractorWorker||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":s.violationType||"",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:s.violationDate?Utils.formatDate(s.violationDate):"",\u0627\u0644\u0634\u062F\u0629:s.severity||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630":s.actionTaken||"",\u0627\u0644\u062D\u0627\u0644\u0629:s.status||"","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629":Number(this.getEffectiveFineAmount(s))||0,\u0627\u0644\u0645\u0648\u0642\u0639:s.location||s.site||"",\u0627\u0644\u0648\u0635\u0641:s.description||s.notes||"",\u0627\u0644\u0641\u062A\u0631\u0629:i||""})),n=XLSX.utils.book_new(),o=XLSX.utils.json_to_sheet(a);o["!cols"]=[{wch:6},{wch:28},{wch:14},{wch:18},{wch:22},{wch:14},{wch:12},{wch:24},{wch:12},{wch:14},{wch:18},{wch:36},{wch:22}],XLSX.utils.book_append_sheet(n,o,"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");const r=t?`\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644_${t}`:"\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",c=`${String(r).replace(/[\\/:*?"<>|]/g,"_").slice(0,80)}_${new Date().toISOString().slice(0,10)}.xlsx`;return XLSX.writeFile(n,c),!0},async generateContractorViolationsReport(e="",t={},i="",a=""){const n=String(t?.exportFormat||"pdf").toLowerCase()==="excel"?"excel":"pdf",{violations:o,periodInfo:r}=this._collectContractorViolationsForExport_(e,t,i,a);if(!o.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0641\u0642 \u0627\u0644\u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}if(n==="excel"){try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const l=this.exportContractorViolationsToExcel_(o,i,r);Loading.hide(),l&&Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 Excel \u0628\u0646\u062C\u0627\u062D")}catch(l){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",l),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 Excel: "+(l.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const l=o.filter(S=>String(S.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,c=o.filter(S=>String(S.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,s=o.filter(S=>String(S.severity||"").trim()==="\u0645\u0646\u062E\u0636\u0629").length,d=o.filter(S=>String(S.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,p=Math.max(0,o.length-d),f=o.length>0?Math.round(d/o.length*100):0,u=new Set(o.map(S=>String(S.contractorName||"").trim()).filter(Boolean)).size,w=o.reduce((S,_)=>S+(Number(this.getEffectiveFineAmount(_))||0),0),m=this._AR_PDF_TEXT_STYLE_,h=o.map((S,_)=>`
                <tr>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${m}">${_+1}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${m}">${Utils.escapeHTML(S.contractorName||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${m}">${Utils.escapeHTML(S.violationType||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${m}">${S.violationDate?Utils.formatDate(S.violationDate):"-"}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${m}">${Utils.escapeHTML(S.severity||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${m}">${Utils.escapeHTML(S.actionTaken||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${m}">${Utils.escapeHTML(S.status||"-")}</td>
                </tr>
            `).join(""),g=i?` - ${Utils.escapeHTML(i)}`:"",D=`
                <div style="margin-bottom: 24px; direction: rtl;">
                    <h2 dir="rtl" style="font-size: 20px; margin-bottom: 12px; color: #991B1B; font-weight: 700; ${m}">\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646${g}</h2>
                    ${r?`<div style="margin-bottom: 16px; padding: 12px; background: #FFF7ED; border-right: 4px solid #F59E0B; border-radius: 8px;"><strong style="color: #D97706;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(r)}</span></div>`:""}
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA;"><div style="font-size: 12px; color: #B91C1C; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #991B1B;">${o.length}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;"><div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div><div style="font-size: 24px; font-weight: 700; color: #1E3A8A;">${u}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;"><div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #92400E;">${this.formatFineAmount(Number(w))}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFF7ED; border: 1px solid #FED7AA;"><div style="font-size: 12px; color: #C2410C; margin-bottom: 6px; font-weight: 600;">\u0639\u0627\u0644\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637\u0629 / \u0645\u0646\u062E\u0641\u0636\u0629</div><div style="font-size: 20px; font-weight: 700; color: #9A3412;">${l} / ${c} / ${s}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;"><div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</div><div style="font-size: 24px; font-weight: 700; color: #065F46;">${f}%</div><div style="font-size: 11px; color: #065F46; margin-top: 4px;">\u0645\u062D\u0644\u0648\u0644: ${d} | \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644: ${p}</div></div>
                    </div>
                </div>
                <div style="margin-bottom: 16px; direction: rtl;">
                    <h3 dir="rtl" style="font-size: 18px; margin-bottom: 12px; color: #991B1B; font-weight: 700; border-bottom: 2px solid #DC2626; padding-bottom: 8px; ${m}">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                </div>
                <div style="overflow-x: auto; direction: rtl;">
                    <table dir="rtl" style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl; ${m}">
                        <thead>
                            <tr style="background: #B91C1C; color: #FFFFFF;">
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">#</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0627\u0644\u0634\u062F\u0629</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${m}">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody>${h}</tbody>
                    </table>
                </div>
            `,B=`CONTRACTOR-VIOL-${new Date().toISOString().slice(0,10)}`,T=i?`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${i}`:"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",C=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(B,T,D,!1,!1,{source:"ContractorViolationsTab",contractorId:e||"",contractorName:i||"",titleAr:T,includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(T)}</title></head><body>${D}</body></html>`,F=`${String(T).replace(/[\\/:*?"<>|]/g,"_")}.pdf`;if(!await this._downloadHtmlReportAsPdf(C,F))throw new Error("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D")}catch(l){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",l),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+(l.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async deleteViolation(e){if(!e){typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","error");return}const t=(AppState.appData?.violations||[]).find(i=>i.id===e);if(t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"?Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649"):typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649","error");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.")){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");try{const i=(AppState.appData?.violations||[]).find(s=>s.id===e),a=i?.contractorId||"",n=i?.contractorName||"",o=i?.employeeId||"",r=i?.employeeCode||i?.employeeNumber||"",l=i?.employeeName||"";let c;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callBackend)c=await GoogleIntegration.callBackend("deleteViolationFromSheet",{id:e});else throw new Error("\u062E\u062F\u0645\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");if(c&&c.success){AppState.appData&&AppState.appData.violations&&(AppState.appData.violations=AppState.appData.violations.filter(s=>s.id!==e)),(a||n)&&(AppState.appData?.contractors||[]).forEach(d=>{d&&(d.id===a||d.name===n||d.contractorName===n)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),(o||r||l)&&(AppState.appData?.employees||[]).forEach(d=>{d&&(d.id===o||d.employeeNumber===r||d.employeeCode===r||d.name===l)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{this.updateAllViolationsStats()}catch{}if(this.refreshViolationsView(),typeof Contractors<"u"&&Contractors.load)try{(AppState?.currentSection||"")==="contractors"&&!Contractors._isLoading&&Contractors.load()}catch{}if(typeof Employees<"u"&&Employees.loadEmployeesList)try{(AppState?.currentSection||"")==="employees"&&Employees.loadEmployeesList()}catch{}typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629","success")}else throw new Error(c?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(i){typeof Utils<"u"&&Utils.showToast?Utils.showToast("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message,"error"):alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},renderAnalyticsTab(){this._vEnsureChartJS().catch(()=>{});const e=(i,a)=>this._t(i,a),t=this.getCurrentCurrency();return`
        <div id="viol-analytics-root" style="font-family:'Cairo','Inter',sans-serif !important;">

            <!-- \u2500\u2500 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A (\u064A\u064F\u062E\u0641\u0649 \u0639\u0646\u062F \u062A\u0635\u062F\u064A\u0631 PDF) \u2500\u2500 -->
            <div id="viol-analytics-toolbar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(220,38,38,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-bar" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.3rem;font-weight:800;">${e("module.violations.analytics.title","\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}</h2>
                        <p style="margin:4px 0 0 0;font-size:0.9rem;font-weight:500;opacity:0.95;">${e("module.violations.analytics.subtitle","\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0648\u0641\u0648\u0631\u064A \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF")}</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-size:0.85rem;font-weight:700;opacity:0.95;margin-left:2px;">${e("module.violations.analytics.period","\u0627\u0644\u0641\u062A\u0631\u0629:")}</span>
                    <div style="display:flex;gap:4px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((i,a)=>{const n=[e("module.violations.analytics.period.30d","30 \u064A\u0648\u0645"),e("module.violations.analytics.period.3m","3 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.6m","6 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.1y","\u0633\u0646\u0629"),e("module.violations.analytics.period.all","\u0627\u0644\u0643\u0644")],o=(this._violPeriod||"0")===i;return`<button class="viol-period-btn" data-period="${i}" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;transition:all .2s;background:${o?"#fff":"rgba(255,255,255,0.18)"};color:${o?"#991b1b":"#fff"};">${n[a]}</button>`}).join("")}
                    </div>
                    <button id="viol-toggle-filters-btn" style="padding:7px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.85rem;font-weight:700;transition:all .2s;display:flex;align-items:center;gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        <i class="fas fa-sliders-h"></i><span>${e("module.violations.analytics.filters","\u0641\u0644\u0627\u062A\u0631")}</span><span id="viol-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.72rem;padding:2px 6px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <!-- \u2705 \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0629 EGP \u21C4 USD -->
                    <div style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.4);border-radius:8px;overflow:hidden;">
                        <button id="viol-curr-egp" data-curr="EGP" class="viol-curr-btn" style="padding:7px 12px;border:none;cursor:pointer;background:${t==="EGP"?"#fff":"transparent"};color:${t==="EGP"?"#991b1b":"#fff"};font-size:0.85rem;font-weight:800;transition:all .15s;" title="${e("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A")}">${e("module.violations.analytics.currency.egp_short","\u062C.\u0645")}</button>
                        <button id="viol-curr-usd" data-curr="USD" class="viol-curr-btn" style="padding:7px 12px;border:none;cursor:pointer;background:${t==="USD"?"#fff":"transparent"};color:${t==="USD"?"#991b1b":"#fff"};font-size:0.85rem;font-weight:800;transition:all .15s;" title="${e("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A")}">$</button>
                        <button id="viol-curr-rate-btn" style="padding:7px 10px;border:none;border-right:1px solid rgba(255,255,255,0.25);cursor:pointer;background:transparent;color:#fff;font-size:0.85rem;transition:all .15s;" title="${e("module.violations.analytics.currency.rate_edit","\u062A\u0639\u062F\u064A\u0644 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641")}" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='transparent'"><i class="fas fa-cog"></i></button>
                    </div>
                    <button id="viol-export-pdf-btn" style="padding:7px 16px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.35);color:#fff;font-size:0.85rem;font-weight:700;transition:all .2s;display:flex;align-items:center;gap:6px;" onmouseover="this.style.background='rgba(0,0,0,0.55)'" onmouseout="this.style.background='rgba(0,0,0,0.35)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="viol-analytics-refresh" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.18);color:#fff;font-size:0.85rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.35)'" onmouseout="this.style.background='rgba(255,255,255,0.18)'" title="${e("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div id="viol-analytics-capture">
            <div id="viol-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#dc2626;font-size:16px;"></i>
                        <span style="font-weight:800;font-size:1.05rem;color:#7f1d1d;">${e("module.violations.analytics.filters.interactive","\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}</span>
                        <span id="viol-filter-count" style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <button id="viol-filter-reset-btn" style="padding:6px 14px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#475569;font-size:0.82rem;font-weight:700;cursor:pointer;" onmouseover="this.style.background='#fee2e2';this.style.color='#dc2626'" onmouseout="this.style.background='#fff';this.style.color='#475569'">
                        <i class="fas fa-times ml-1"></i>${e("module.common.reset","\u0645\u0633\u062D \u0627\u0644\u0643\u0644")}
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">
                    ${[{id:"viol-af-factory",icon:"fas fa-industry",color:"#ec4899",label:e("module.violations.analytics.filter.factory","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A")},{id:"viol-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:e("module.violations.analytics.filter.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")},{id:"viol-af-type",icon:"fas fa-tag",color:"#dc2626",label:e("module.violations.analytics.filter.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")},{id:"viol-af-sev",icon:"fas fa-exclamation-circle",color:"#f59e0b",label:e("module.violations.analytics.filter.severity","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")},{id:"viol-af-status",icon:"fas fa-circle",color:"#10b981",label:e("module.violations.analytics.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629")},{id:"viol-af-loc",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:e("module.violations.analytics.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}].map(i=>`
                        <div>
                            <label style="font-size:0.85rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">
                                <i class="${i.icon}" style="color:${i.color};margin-left:5px;"></i>${i.label}
                            </label>
                            <select id="${i.id}" style="width:100%;padding:8px 12px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.92rem;font-weight:600;background:#fff;color:#1e293b;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
                                <option value="">${e("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2500\u2500 KPI Cards (\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u0646\u0642\u0631) \u2500\u2500 -->
            <div id="viol-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A) \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-industry" style="color:#ec4899;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.byFactory","\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629")}</span>
                    </div>
                    <span id="viol-factory-total-badge" style="background:#fdf2f8;color:#be185d;padding:4px 12px;border-radius:12px;font-size:0.85rem;font-weight:700;"></span>
                </div>
                <div style="padding:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px;align-items:center;">
                    <div style="position:relative;height:260px;">
                        <canvas id="viol-chart-factory"></canvas>
                        <div id="viol-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                    <div id="viol-factory-breakdown-list" style="display:flex;flex-direction:column;gap:12px;max-height:260px;overflow-y:auto;padding-left:4px;">
                        <!-- dynamic factory breakdown items -->
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u0634\u062F\u0629 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-tasks" style="color:#3b82f6;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.status","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629")}</span>
                    </div>
                    <div style="padding:14px;position:relative;height:250px;">
                        <canvas id="viol-chart-status"></canvas>
                        <div id="viol-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-exclamation-circle" style="color:#ef4444;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.severity","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")}</span>
                    </div>
                    <div style="padding:14px;position:relative;height:250px;">
                        <canvas id="viol-chart-sev"></canvas>
                        <div id="viol-chart-sev-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;font-size:1.15rem;"></i>
                    <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.trend","\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)")}</span>
                </div>
                <div style="padding:14px;position:relative;height:270px;">
                    <canvas id="viol-chart-trend"></canvas>
                    <div id="viol-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 2: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 + \u0627\u0644\u0645\u0648\u0642\u0639 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-tag" style="color:#dc2626;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.byType","\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0623\u0639\u0644\u0649 10)")}</span>
                        </div>
                        <span id="viol-type-total-badge" style="background:#fef2f2;color:#b91c1c;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:240px;">
                            <canvas id="viol-chart-type"></canvas>
                            <div id="viol-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                        </div>
                        <div id="viol-type-breakdown-list" style="display:flex;flex-direction:column;gap:10px;max-height:260px;overflow-y:auto;padding-left:4px;">
                        </div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-map-marker-alt" style="color:#f59e0b;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.byLocation","\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)")}</span>
                        </div>
                        <span id="viol-loc-total-badge" style="background:#fffbeb;color:#92400e;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-loc"></canvas>
                            <div id="viol-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                        </div>
                        <div id="viol-loc-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 3: \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 + \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-user-tie" style="color:#6366f1;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.topEmployees","\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0629\u064B (\u0623\u0639\u0644\u0649 10)")}</span>
                        </div>
                        <span id="viol-emp-total-badge" style="background:#eef2ff;color:#4338ca;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-emp"></canvas>
                            <div id="viol-chart-emp-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.chart.noEmpViolations","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646")}</div>
                        </div>
                        <div id="viol-emp-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-users-cog" style="color:#f97316;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.topContractors","\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0629\u064B (\u0623\u0639\u0644\u0649 10)")}</span>
                        </div>
                        <span id="viol-con-total-badge" style="background:#fff7ed;color:#c2410c;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-con"></canvas>
                            <div id="viol-chart-con-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.chart.noConViolations","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</div>
                        </div>
                        <div id="viol-con-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0645\u062E\u0637\u0637 \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                    <i class="fas fa-coins" style="color:#d97706;font-size:1.15rem;"></i>
                    <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.finesByType","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 ({currency})").replace("{currency}",this.getCurrencyLabel("long")==="\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"?e("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):e("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"))}</span>
                    <span style="font-size:0.82rem;font-weight:600;color:#64748b;margin-right:auto;">${e("module.violations.analytics.top10Types","(\u0623\u0639\u0644\u0649 10 \u0623\u0646\u0648\u0627\u0639)")}</span>
                </div>
                <div style="padding:14px;position:relative;height:270px;">
                    <canvas id="viol-chart-fines"></canvas>
                    <div id="viol-chart-fines-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.chart.noFinesData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u0631\u0627\u0645\u0627\u062A")}</div>
                </div>
            </div>

            <!-- \u2500\u2500 \u062C\u062F\u0648\u0644 \u0623\u0634\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-fire" style="color:#dc2626;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.table.criticalTitle","\u0623\u0634\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629 \u2014 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629)")}</span>
                    </div>
                    <span id="viol-critical-count" style="background:#fef2f2;color:#b91c1c;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
                        <thead>
                            <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.name","\u0627\u0644\u0627\u0633\u0645")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.severity","\u0627\u0644\u0634\u062F\u0629")}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                                <th style="padding:12px 14px;text-align:center;font-weight:800;color:#0f172a;white-space:nowrap;">${e("module.violations.analytics.table.fine","\u0627\u0644\u063A\u0631\u0627\u0645\u0629 ({currency})").replace("{currency}",this.getCurrencyLabel("short"))}</th>
                            </tr>
                        </thead>
                        <tbody id="viol-critical-tbody">
                            <tr><td colspan="8" style="padding:20px;text-align:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.common.loading","\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026")}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>`},async updateViolationAnalytics(){const e=document.getElementById("viol-analytics-root");if(!e)return;const t=(v,U)=>this._t(v,U),a=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",n=parseInt(this._violPeriod||"0",10),r=(AppState.appData.violations||[]).map(v=>this.normalizeViolationRecord(v)).filter(v=>v&&this.isViolationVisibleToCurrentUser(v)),l=this._vFilterByPeriod(r,n);this._vPopulateFilters(l);const c=this._vApplyFilters(l),s=c.length,d=document.getElementById("viol-filter-count");d&&(d.textContent=`${s} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const p=c.filter(v=>v.personType==="employee"),f=c.filter(v=>v.personType==="contractor"),u=c.filter(v=>v.severity==="\u0639\u0627\u0644\u064A\u0629").length,w=c.filter(v=>v.status==="\u0645\u062D\u0644\u0648\u0644").length,m=c.filter(v=>v.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644").length,h=c.filter(v=>v.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,g=s>0?Math.round(w/s*100):0,D=c.reduce((v,U)=>v+(Number(U.fineAmount)||0),0),B=c.filter(v=>{if(!v.violationDate)return!1;const U=new Date(v.violationDate),G=new Date;return U.getFullYear()===G.getFullYear()&&U.getMonth()===G.getMonth()}).length,T=document.getElementById("viol-kpi-strip");if(T){const v=[{id:"total",label:t("module.violations.analytics.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),value:s.toLocaleString("en-US"),icon:"fas fa-exclamation-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{id:"employees",label:t("module.violations.analytics.kpi.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:p.length.toLocaleString("en-US"),icon:"fas fa-user-tie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{id:"contractors",label:t("module.violations.analytics.kpi.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),value:f.length.toLocaleString("en-US"),icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{id:"highSev",label:t("module.violations.analytics.kpi.highSeverity","\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629"),value:u.toLocaleString("en-US"),icon:"fas fa-bomb",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{id:"resolved",label:t("module.violations.analytics.kpi.resolved","\u0645\u062D\u0644\u0648\u0644\u0629"),value:w.toLocaleString("en-US"),icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{id:"unresolved",label:t("module.violations.analytics.kpi.unresolved","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629"),value:m.toLocaleString("en-US"),icon:"fas fa-times-circle",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{id:"resolRate",label:t("module.violations.analytics.kpi.resolRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"),value:g.toLocaleString("en-US")+"%",icon:"fas fa-chart-pie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{id:"totalFines",label:t("module.violations.analytics.kpi.totalFines","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A"),value:D>0?this.formatFineAmount(D):"\u2014",icon:"fas fa-coins",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{id:"thisMonth",label:t("module.violations.analytics.kpi.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631"),value:B.toLocaleString("en-US"),icon:"fas fa-calendar-day",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"}];T.innerHTML=v.map(U=>`
                <div class="viol-kpi-card" data-kpi="${U.id}" title="\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062D\u0633\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0639\u064A\u0627\u0631" style="background:${U.bg};border:1.5px solid ${U.border};border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all .2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;background:${U.color};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${U.icon}" style="color:#fff;font-size:17px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.4rem;font-weight:800;color:${U.color};line-height:1.1;">${U.value}</div>
                        <div style="font-size:0.82rem;font-weight:700;color:#475569;margin-top:4px;white-space:nowrap;">${U.label}</div>
                    </div>
                </div>`).join("")}if(!await this._vEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",`<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t("module.violations.analytics.chartError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.")}</span></div>`);return}this._vDrawFactoryBreakdown("viol-chart-factory","viol-factory-breakdown-list",c);const F=this._vGroupBy(c,"status"),$={\u0645\u062D\u0644\u0648\u0644:"rgba(16,185,129,0.85)",resolved:"rgba(16,185,129,0.85)","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"rgba(239,68,68,0.85)",unresolved:"rgba(239,68,68,0.85)",open:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(245,158,11,0.85)","in progress":"rgba(245,158,11,0.85)","under review":"rgba(245,158,11,0.85)"};this._vDrawDoughnut("viol-chart-status",F.labels.map(v=>t("module.violations.status."+v,v)),F.data,F.labels.map(v=>$[v.toLowerCase()]||$[v]||"rgba(148,163,184,0.8)"));const S=this._vGroupBy(c,"severity"),_={\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",high:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",medium:"rgba(245,158,11,0.85)",moderate:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(16,185,129,0.85)",low:"rgba(16,185,129,0.85)",\u0645\u0646\u062E\u0636\u0629:"rgba(16,185,129,0.85)"};this._vDrawDoughnut("viol-chart-sev",S.labels.map(v=>t("module.violations.severity."+v,v)),S.data,S.labels.map(v=>_[v.toLowerCase()]||_[v]||"rgba(148,163,184,0.8)")),this._vDrawTrend("viol-chart-trend",l),this._vDrawTypeBreakdown("viol-chart-type","viol-type-breakdown-list",c,10),this._vDrawListBreakdown("viol-chart-loc","viol-loc-breakdown-list",c,"violationLocation",8,["rgba(245,158,11,0.85)","rgba(234,179,8,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)"],"#fffbeb","#92400e","viol-loc-total-badge","viol-af-loc",null),this._vDrawListBreakdown("viol-chart-emp","viol-emp-breakdown-list",p,"employeeName",10,["rgba(99,102,241,0.85)","rgba(79,70,229,0.85)","rgba(67,56,202,0.85)","rgba(55,48,163,0.85)","rgba(109,40,217,0.85)","rgba(124,58,237,0.85)","rgba(139,92,246,0.85)","rgba(167,139,250,0.85)","rgba(196,181,253,0.9)","rgba(76,29,149,0.85)"],"#eef2ff","#4338ca","viol-emp-total-badge",null,null),this._vDrawListBreakdown("viol-chart-con","viol-con-breakdown-list",f,"contractorName",10,["rgba(249,115,22,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)","rgba(180,83,9,0.85)","rgba(217,119,6,0.85)","rgba(245,158,11,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)"],"#fff7ed","#c2410c","viol-con-total-badge",null,null),this._vDrawFinesByType("viol-chart-fines",c);const O=c.filter(v=>{const U=String(v.severity||"").trim().toLowerCase(),G=String(v.status||"").trim().toLowerCase();return(U==="\u0639\u0627\u0644\u064A\u0629"||U==="high")&&!(G==="\u0645\u062D\u0644\u0648\u0644"||G==="resolved")}).sort((v,U)=>(U.fineAmount||0)-(v.fineAmount||0)).slice(0,20),P=document.getElementById("viol-critical-count"),R=document.getElementById("viol-critical-tbody");P&&(P.textContent=`${O.length} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`),R&&(O.length===0?R.innerHTML=`<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t("module.violations.analytics.table.noCritical","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0631\u062C\u0629 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629")}</td></tr>`:R.innerHTML=O.map((v,U)=>{const G=Utils.escapeHTML(v.employeeName||v.contractorName||"\u2014"),it=v.personType==="contractor"?`<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</span>`:`<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</span>`,ot=`<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.severity.high","\u0639\u0627\u0644\u064A\u0629")}</span>`,W={"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"background:#fef3c7;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#ede9fe;color:#5b21b6;"}[v.status]||"background:#f1f5f9;color:#374151;",Q=Number(v.fineAmount)||0,X=U%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${X};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${X}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${v.violationDate?new Date(v.violationDate).toLocaleDateString(a,{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${G}</td>
                        <td style="padding:9px 12px;">${it}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationLocation||"\u2014")}</td>
                        <td style="padding:9px 12px;">${ot}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${W}">${t("module.violations.status."+v.status,v.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${Q>0?"#dc2626":"#94a3b8"};">${Q>0?this.formatFineAmount(Q):"\u2014"}</td>
                    </tr>`}).join(""))},_vFilterByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(a=>{if(!a.violationDate)return!0;const n=new Date(a.violationDate);return!isNaN(n.getTime())&&n>=i})},_vGroupBy(e,t,i=0){const a=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n={};e.forEach(r=>{const l=String(r[t]||a).trim()||a;n[l]=(n[l]||0)+1});let o=Object.entries(n).sort((r,l)=>l[1]-r[1]);return i>0&&(o=o.slice(0,i)),{labels:o.map(r=>r[0]),data:o.map(r=>r[1])}},_vGetFactoryName(e){const t=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return!e||typeof e!="object"?t:String(e.factory||e.violationLocation||e.violationPlace||t).trim()||t},_vApplyFilters(e){const t=d=>{const p=document.getElementById(d);return p?p.value.trim():""},i=t("viol-af-factory"),a=t("viol-af-ptype"),n=t("viol-af-type"),o=t("viol-af-sev"),r=t("viol-af-status"),l=t("viol-af-loc"),c=[i,a,n,o,r,l].some(d=>d!==""),s=document.getElementById("viol-filter-badge");return s&&(s.style.display=c?"inline":"none"),e.filter(d=>!(i&&this._vGetFactoryName(d)!==i||a&&String(d.personType||"").trim()!==a||n&&String(d.violationType||"").trim()!==n||o&&String(d.severity||"").trim()!==o||r&&String(d.status||"").trim()!==r||l&&String(d.violationLocation||"").trim()!==l))},_vPopulateFilters(e){const t=(o,r)=>this._t(o,r),i=o=>[...new Set(e.map(o).filter(Boolean))].sort(),a=(o,r,l)=>{const c=document.getElementById(o);if(!c)return;const s=c.value;c.innerHTML=`<option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>`+r.map(d=>{const p=l?t(l+d,d):d;return`<option value="${d}"${d===s?" selected":""}>${p}</option>`}).join("")},n=document.getElementById("viol-af-ptype");if(n){const o=n.value;n.innerHTML=`
                <option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                <option value="employee"${o==="employee"?" selected":""}>${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</option>
                <option value="contractor"${o==="contractor"?" selected":""}>${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</option>
            `}a("viol-af-factory",i(o=>this._vGetFactoryName(o))),a("viol-af-type",i(o=>String(o.violationType||"").trim())),a("viol-af-sev",i(o=>String(o.severity||"").trim()),"module.violations.severity."),a("viol-af-status",i(o=>String(o.status||"").trim()),"module.violations.status."),a("viol-af-loc",i(o=>String(o.violationLocation||"").trim()))},_vDrawListBreakdown(e,t,i,a,n,o,r,l,c,s,d){const p=document.getElementById(e),f=document.getElementById(e+"-empty"),u=document.getElementById(t),w=c?document.getElementById(c):null;if(!p)return;const m=($,S)=>this._t($,S),h=m("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),g={};i.forEach($=>{const S=String($[a]||h).trim()||h;g[S]=(g[S]||0)+1});let D=Object.entries(g).sort(($,S)=>S[1]-$[1]);n>0&&(D=D.slice(0,n));const B=D.map($=>$[0]),T=D.map($=>$[1]),C=i.length;if(w&&(w.textContent=`${C.toLocaleString("en-US")} ${m("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`,r&&(w.style.background=r),l&&(w.style.color=l)),!T.length||C===0){p.style.display="none",f&&(f.style.display="flex"),u&&(u.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${m("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}f&&(f.style.display="none"),p.style.display="",this._violCharts||(this._violCharts={});const F=this._violCharts[e];if(F)try{F.destroy()}catch{}this._violCharts[e]=new Chart(p,{type:"doughnut",data:{labels:B,datasets:[{data:T,backgroundColor:B.map(($,S)=>o[S%o.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:$=>{const S=$.parsed,_=C>0?(S/C*100).toFixed(1):"0";return` ${$.label}: ${S.toLocaleString("en-US")} (${_}%)`}}}}}}),u&&(u.innerHTML=D.map(($,S)=>{const _=$[0],O=$[1],P=C>0?(O/C*100).toFixed(1):0,R=o[S%o.length],v=S+1,U=d?m(d+_,_):_;return`
                <div class="viol-list-item" data-filter-val="${Utils.escapeHTML(_)}" data-filter-id="${s||""}" title="${Utils.escapeHTML(U)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;padding:9px 12px;cursor:${s?"pointer":"default"};transition:all 0.2s;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:7px;">
                            <span style="width:20px;height:20px;border-radius:50%;background:${R};color:#fff;font-size:0.68rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${v}</span>
                            <span style="font-weight:800;font-size:0.85rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:155px;">${Utils.escapeHTML(U)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:0.95rem;color:${R.replace("0.85","1")};">${O.toLocaleString("en-US")}</span>
                            <span style="font-size:0.78rem;font-weight:700;color:#64748b;">(${P}%)</span>
                        </div>
                    </div>
                    <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                        <div style="width:${P}%;height:100%;background:${R};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),s&&u.querySelectorAll(".viol-list-item").forEach($=>{$.addEventListener("mouseover",()=>{$.style.background="#f8fafc",$.style.borderColor="#cbd5e1"}),$.addEventListener("mouseout",()=>{$.style.background="#fff",$.style.borderColor="#f1f5f9"}),$.addEventListener("click",()=>{const S=$.getAttribute("data-filter-val"),_=document.getElementById(s);_&&(_.value=_.value===S?"":S,this.updateViolationAnalytics())})}))},_vDrawTypeBreakdown(e,t,i,a){const n=document.getElementById(e),o=document.getElementById(e+"-empty"),r=document.getElementById(t),l=document.getElementById("viol-type-total-badge");if(!n)return;const c=(h,g)=>this._t(h,g),s=i.length;l&&(l.textContent=`${s.toLocaleString("en-US")} ${c("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const d={};i.forEach(h=>{const g=String(h.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";d[g]||(d[g]=0),d[g]++});let p=Object.entries(d).sort((h,g)=>g[1]-h[1]);a>0&&(p=p.slice(0,a));const f=p.map(h=>h[0]),u=p.map(h=>h[1]),w=["rgba(220,38,38,0.85)","rgba(234,88,12,0.85)","rgba(202,138,4,0.85)","rgba(22,163,74,0.85)","rgba(2,132,199,0.85)","rgba(99,102,241,0.85)","rgba(168,85,247,0.85)","rgba(236,72,153,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!u.length||s===0){n.style.display="none",o&&(o.style.display="flex"),r&&(r.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${c("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}o&&(o.style.display="none"),n.style.display="",this._violCharts||(this._violCharts={});const m=this._violCharts[e];if(m)try{m.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"doughnut",data:{labels:f,datasets:[{data:u,backgroundColor:f.map((h,g)=>w[g%w.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:h=>{const g=h.parsed,D=s>0?(g/s*100).toFixed(1):"0";return` ${h.label}: ${g.toLocaleString("en-US")} (${D}%)`}}}}}}),r&&(r.innerHTML=p.map((h,g)=>{const D=h[0],B=h[1],T=s>0?(B/s*100).toFixed(1):0,C=w[g%w.length],F=g+1;return`
                <div class="viol-type-item" data-vtype="${Utils.escapeHTML(D)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 ${Utils.escapeHTML(D)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;padding:10px 14px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#fef2f2';this.style.borderColor='#fca5a5';" onmouseout="this.style.background='#fff';this.style.borderColor='#f1f5f9';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:22px;height:22px;border-radius:50%;background:${C};color:#fff;font-size:0.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${F}</span>
                            <span style="font-weight:800;font-size:0.88rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;" title="${Utils.escapeHTML(D)}">${Utils.escapeHTML(D)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:1.0rem;color:${C.replace("0.85","1")};">${B.toLocaleString("en-US")}</span>
                            <span style="font-size:0.82rem;font-weight:700;color:#64748b;">(${T}%)</span>
                        </div>
                    </div>
                    <div style="height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${T}%;height:100%;background:${C};border-radius:4px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),r.querySelectorAll(".viol-type-item").forEach(h=>{h.addEventListener("click",()=>{const g=h.getAttribute("data-vtype"),D=document.getElementById("viol-af-type");D&&(D.value=D.value===g?"":g,this.updateViolationAnalytics())})}))},_vDrawFactoryBreakdown(e,t,i){const a=document.getElementById(e),n=document.getElementById(e+"-empty"),o=document.getElementById(t),r=document.getElementById("viol-factory-total-badge");if(!a)return;const l=(m,h)=>this._t(m,h),c=i.length;r&&(r.textContent=`${c.toLocaleString("en-US")} ${l("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const s={};i.forEach(m=>{const h=this._vGetFactoryName(m);s[h]||(s[h]={count:0,fineSum:0}),s[h].count+=1,s[h].fineSum+=Number(m.fineAmount)||0});const d=Object.entries(s).sort((m,h)=>h[1].count-m[1].count),p=d.map(m=>m[0]),f=d.map(m=>m[1].count),u=["rgba(236,72,153,0.85)","rgba(99,102,241,0.85)","rgba(245,158,11,0.85)","rgba(16,185,129,0.85)","rgba(59,130,246,0.85)","rgba(139,92,246,0.85)","rgba(239,68,68,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!f.length||c===0){a.style.display="none",n&&(n.style.display="flex"),o&&(o.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:20px;">${l("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}n&&(n.style.display="none"),a.style.display="",this._violCharts||(this._violCharts={});const w=this._violCharts[e];if(w)try{w.destroy()}catch{}this._violCharts[e]=new Chart(a,{type:"doughnut",data:{labels:p,datasets:[{data:f,backgroundColor:p.map((m,h)=>u[h%u.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>{const h=m.parsed,g=c>0?(h/c*100).toFixed(1):"0";return` ${m.label}: ${h.toLocaleString("en-US")} (${g}%)`}}}}}}),o&&(o.innerHTML=d.map((m,h)=>{const g=m[0],D=m[1].count,B=m[1].fineSum,T=c>0?(D/c*100).toFixed(1):0,C=u[h%u.length],F=B>0?this.formatFineAmount(B):"";return`
                <div class="viol-factory-item" data-factory="${Utils.escapeHTML(g)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u062D\u0633\u0628 \u0645\u0635\u0646\u0639 ${Utils.escapeHTML(g)}" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 14px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.03);" onmouseover="this.style.background='#fdf2f8';this.style.borderColor='#fbcfe8';" onmouseout="this.style.background='#ffffff';this.style.borderColor='#e2e8f0';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:0.95rem;color:#0f172a;">
                            <span style="width:12px;height:12px;border-radius:50%;background:${C};display:inline-block;flex-shrink:0;box-shadow:0 0 6px ${C};"></span>
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;" title="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;font-size:0.88rem;">
                            <span style="font-weight:800;color:#be185d;font-size:1.05rem;">${D.toLocaleString("en-US")}</span>
                            <span style="color:#64748b;font-size:0.85rem;font-weight:700;">(${T}%)</span>
                            ${F?`<span style="background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:8px;font-weight:700;font-size:0.8rem;">${F}</span>`:""}
                        </div>
                    </div>
                    <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${T}%;height:100%;background:${C};border-radius:4px;transition:width 0.5s ease;"></div>
                    </div>
                </div>`}).join(""),o.querySelectorAll(".viol-factory-item").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-factory"),g=document.getElementById("viol-af-factory");g&&(g.value=g.value===h?"":h,this.updateViolationAnalytics())})}))},_vDrawDoughnut(e,t,i,a){const n=document.getElementById(e),o=document.getElementById(e+"-empty");if(!n)return;if(!i.length||i.reduce((c,s)=>c+s,0)===0){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="";const r=i.reduce((c,s)=>c+s,0);this._violCharts||(this._violCharts={});const l=this._violCharts[e];if(l)try{l.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:a||this._vChartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:13,weight:"bold",family:"'Cairo', sans-serif"},usePointStyle:!0,boxWidth:10}},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed.toLocaleString("en-US")} (${r>0?(c.parsed/r*100).toFixed(1):0}%)`}}}}})},_vDrawHBar(e,t,i,a){const n=document.getElementById(e),o=document.getElementById(e+"-empty");if(!n)return;if(!i.length||i.reduce((l,c)=>l+c,0)===0){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="",this._violCharts||(this._violCharts={});const r=this._violCharts[e];if(r)try{r.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:a||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>` ${l.parsed.x.toLocaleString("en-US")}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:12,weight:"bold"}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:12,weight:"bold",family:"'Cairo', sans-serif"},callback:l=>String(t[l]).length>22?String(t[l]).slice(0,21)+"\u2026":t[l]}}}}})},_vDrawTrend(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const n=(p,f)=>this._t(p,f),r=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",l=new Date,c=[];for(let p=11;p>=0;p--){const f=new Date(l.getFullYear(),l.getMonth()-p,1),u=f.toLocaleDateString(r,{month:"long"});c.push({year:f.getFullYear(),month:f.getMonth(),label:`${u} ${f.getFullYear()}`})}const s=c.map(p=>t.filter(f=>{if(!f.violationDate)return!1;const u=new Date(f.violationDate);return!isNaN(u.getTime())&&u.getFullYear()===p.year&&u.getMonth()===p.month}).length);if(s.reduce((p,f)=>p+f,0)===0){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="",this._violCharts||(this._violCharts={});const d=this._violCharts[e];if(d)try{d.destroy()}catch{}this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:c.map(p=>p.label),datasets:[{label:n("module.violations.analytics.chart.violationCount","\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),data:s,backgroundColor:s.map(p=>p===Math.max(...s)?"rgba(220,38,38,0.85)":"rgba(220,38,38,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:n("module.violations.analytics.chart.trendLine","\u0627\u0644\u0627\u062A\u062C\u0627\u0647"),data:s,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_vDrawFinesByType(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const n=t.filter(u=>(Number(u.fineAmount)||0)>0);if(!n.length){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="";const o={};n.forEach(u=>{const w=String(u.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();o[w]=(o[w]||0)+(Number(u.fineAmount)||0)});const r=Object.entries(o).sort((u,w)=>w[1]-u[1]).slice(0,10),l=r.map(u=>u[0]),c=this.getCurrentCurrency(),s=this.getCurrencyLabel("long"),d=r.map(u=>{const w=this.convertFineAmount(u[1],c);return c==="USD"?Number(w.toFixed(2)):Math.round(w)});this._violCharts||(this._violCharts={});const p=this._violCharts[e];if(p)try{p.destroy()}catch{}const f=u=>c==="USD"?u.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):u.toLocaleString("en-US",{maximumFractionDigits:0});this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:l,datasets:[{data:d,backgroundColor:"rgba(217,119,6,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:u=>` ${f(u.parsed.x)} ${s}`}}},scales:{x:{beginAtZero:!0,ticks:{font:{size:11},callback:u=>f(u)},grid:{color:"#f1f5f9"},title:{display:!0,text:`\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 (${s})`,font:{size:11}}},y:{ticks:{font:{size:11},callback:u=>String(l[u]).length>18?String(l[u]).slice(0,17)+"\u2026":l[u]}}}}})},async _vEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>t(!1),document.head.appendChild(a)},document.head.appendChild(i)})},_vChartColors(e){const t=["rgba(220,38,38,0.8)","rgba(245,158,11,0.8)","rgba(16,185,129,0.8)","rgba(99,102,241,0.8)","rgba(249,115,22,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,a)=>t[a%t.length])},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(i=>{const a=Array.from(document.querySelectorAll("script[src]")).find(o=>String(o.src||"").includes(e));if(a){const o=()=>i(!!t());a.addEventListener("load",o,{once:!0}),setTimeout(o,4e3);return}const n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>i(!!t()),n.onerror=()=>i(!1),document.head.appendChild(n)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("viol-cairo-font-link")){const e=document.createElement("link");e.id="viol-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(e){const t=`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="violations-arabic-pdf-fix">
    html, body {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    body *, .report-wrapper, .report-wrapper * {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
    }
    h1, h2, h3, .header-title-ar, .company-name, .company-name-secondary,
    .footer-bottom-text, .footer-bottom-text span, .footer-meta-item,
    th, td, .meta-label, .meta-value {
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-break: normal !important;
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
    }
    .report-header .company-brand .company-name,
    .export-header .company-name,
    .att-report-brand-name,
    .ptw-paper-header-company,
    .card-header .company-name {
        white-space: nowrap !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
    }
    .report-header {
        grid-template-columns: minmax(240px, 1.45fr) minmax(280px, 1.75fr) minmax(88px, 120px) !important;
        gap: 14px !important;
    }
    table, thead, tbody, tr, th, td { direction: rtl !important; }
    .header-info h1 { letter-spacing: 0 !important; }
</style>`,i=this._stripScriptsFromHtml_(e);return i?i.includes("</head>")?i.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${i}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const i={scale:2.5,backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(e.scrollWidth,900),windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},a=[{...i,useCORS:!0,allowTaint:!1},{...i,useCORS:!0,allowTaint:!0},{...i,useCORS:!1,allowTaint:!0}];let n=null;for(let o=0;o<a.length;o++)try{const r=await html2canvas(e,a[o]);if(r&&r.width>0&&r.height>0)return r}catch(r){n=r}if(n)throw n;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const a=this._prepareArabicPdfHtml_(e),n=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,o=document.createElement("iframe");o.setAttribute("aria-hidden","true"),o.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(o);try{o.srcdoc=a,await new Promise(p=>{o.onload=p,o.onerror=p,setTimeout(p,6e3)});const r=o.contentDocument||o.contentWindow?.document;if(!r)return!1;await this._waitArabicPdfFontsReady_(r);const l=Array.from(r.images||[]);await Promise.all(l.map(p=>new Promise(f=>{if(p.complete)return f();p.onload=f,p.onerror=f,setTimeout(f,3e3)})));const c=r.querySelector(".report-wrapper")||r.body;if(!c)return!1;const s=await this._captureHtmlToCanvas_(c);if(!s)return!1;const d=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return d?(Utils.PdfExport.appendCanvasAsPdfPages(d,s,{marginMm:8}),Utils.PdfExport.savePdf(d,n),!0):!1}catch(r){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",r),!1}finally{o.remove()}},_getViolAnalyticsPeriodLabel_(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._violPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_buildViolAnalyticsExportLegend_(){const e=n=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(n):String(n??""),t=e(this._getViolAnalyticsPeriodLabel_()),i=e(document.getElementById("viol-filter-count")?.textContent?.trim()||""),a=e(new Date().toLocaleString("ar-SA-u-nu-latn",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return`
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ${t}</div>
                ${i?`<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${i}</div>`:""}
                <div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${a}</div>
            </div>
        </div>`},async _vExportPDF(){const e=document.getElementById("viol-analytics-capture");if(!e)return;const t=document.getElementById("viol-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{if(await this._ensureReportPdfLibs_(),typeof html2canvas>"u")throw new Error("html2canvas unavailable");const a=document.getElementById("viol-filter-panel"),n=a&&a.style.display!=="none";n&&(a.style.display="none");const o=Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),r=await html2canvas(e,{scale:o,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:0,logging:!1});n&&(a.style.display="");const{dataUrl:l}=Utils.PdfExport.compressCanvasToJpegDataUrl(r,Utils.PdfExport.TARGET_MAX_BYTES),c=`
                <div style="margin:0 auto;max-width:100%;">
                    <img src="${l}" alt="Violations Analytics Dashboard" style="width:100%;max-width:100%;height:auto;display:block;border-radius:8px;border:1px solid #e2e8f0;">
                </div>`,s=`VIOL-ANALYTICS-${new Date().toISOString().slice(0,10)}`,d="\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",p="Violations Analysis Report",f=new Date().toISOString(),u=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,d,c,!1,!1,{source:"ViolationsAnalytics",titleEn:p,titleAr:d,version:AppState?.companySettings?.formVersion||"1.0",includeQRCode:!1,compactPdfFooter:!0,headerLayoutLtr:!0,footerLegendHtml:this._buildViolAnalyticsExportLegend_()},f,f):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${d}</title></head><body>${c}</body></html>`,w=`Violations-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;if(!await this._downloadHtmlReportAsPdf(u,w))throw new Error("PDF generation failed");typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A PDF \u0628\u0646\u062C\u0627\u062D")}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_vBindAnalyticsEvents(){const e=document.getElementById("viol-analytics-root");if(!e)return;e.querySelectorAll(".viol-period-btn").forEach(l=>{l.addEventListener("click",()=>{this._violPeriod=l.getAttribute("data-period"),e.querySelectorAll(".viol-period-btn").forEach(c=>{const s=c===l;c.style.background=s?"#fff":"rgba(255,255,255,0.15)",c.style.color=s?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const t=document.getElementById("viol-analytics-refresh");t&&t.addEventListener("click",()=>this.updateViolationAnalytics());const i=document.getElementById("viol-export-pdf-btn");i&&i.addEventListener("click",()=>this._vExportPDF());const a=document.getElementById("viol-toggle-filters-btn"),n=document.getElementById("viol-filter-panel");a&&n&&a.addEventListener("click",()=>{const l=n.style.display!=="none";n.style.display=l?"none":"block",a.style.background=l?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const o=document.getElementById("viol-filter-reset-btn");o&&o.addEventListener("click",()=>{["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(l=>{const c=document.getElementById(l);c&&(c.value="")}),this.updateViolationAnalytics()}),["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(l=>{const c=document.getElementById(l);c&&c.addEventListener("change",()=>this.updateViolationAnalytics())}),e.querySelectorAll(".viol-kpi-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-kpi");if(c==="total")["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(s=>{const d=document.getElementById(s);d&&(d.value="")});else if(c==="employees"){const s=document.getElementById("viol-af-ptype");s&&(s.value=s.value==="employee"?"":"employee")}else if(c==="contractors"){const s=document.getElementById("viol-af-ptype");s&&(s.value=s.value==="contractor"?"":"contractor")}else if(c==="highSev"){const s=document.getElementById("viol-af-sev");s&&(s.value=s.value==="\u0639\u0627\u0644\u064A\u0629"?"":"\u0639\u0627\u0644\u064A\u0629")}else if(c==="resolved"){const s=document.getElementById("viol-af-status");s&&(s.value=s.value==="\u0645\u062D\u0644\u0648\u0644"?"":"\u0645\u062D\u0644\u0648\u0644")}else if(c==="unresolved"){const s=document.getElementById("viol-af-status");s&&(s.value=s.value==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"":"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644")}this.updateViolationAnalytics()})}),e.querySelectorAll(".viol-curr-btn").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-curr");this.setCurrentCurrency(c),e.querySelectorAll(".viol-curr-btn").forEach(s=>{const d=s.getAttribute("data-curr")===c;s.style.background=d?"#fff":"transparent",s.style.color=d?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const r=document.getElementById("viol-curr-rate-btn");r&&r.addEventListener("click",()=>{const l=this.getExchangeRate(),c=window.prompt(`\u0623\u062F\u062E\u0644 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 (\u0643\u0645 \u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A \u064A\u0633\u0627\u0648\u064A 1 \u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A):

\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ${l} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`,String(l));if(c===null)return;const s=parseFloat(String(c).trim());if(!Number.isFinite(s)||s<=0){typeof Notification<"u"&&Notification.error?Notification.error("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"):alert("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}this.setExchangeRate(s),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0625\u0644\u0649 ${s} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`),this.updateViolationAnalytics()})},loadContractorsIntoSelect(e,t="",i=""){if(!e||e.tagName!=="SELECT"){Utils.safeWarn("\u26A0\uFE0F loadContractorsIntoSelect: \u0639\u0646\u0635\u0631 select \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}if(typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"){Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:t,selectedContractorId:i,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1});return}let a=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function")try{const r=Contractors.getAllContractorsForModules();if(r&&r.length>0){const l=new Map;r.forEach(c=>{const s=(c.name||"").trim();if(!s||s==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")return;const d=((c.code||c.isoCode||"")+"").trim().toUpperCase(),p=((c.licenseNumber||"")+"").trim(),f=/^CON-\d+$/i.test(d)?`CODE:${d}`:p?`LIC:${p}`:c.id?`ID:${c.id}`:`NAME:${s.toLowerCase()}`;l.has(f)||l.set(f,{id:c.id||"",name:s,serviceType:(c.serviceType||"").trim(),licenseNumber:(c.licenseNumber||"").trim()})}),a=Array.from(l.values()).sort((c,s)=>{const d=c.name.toLowerCase(),p=s.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 getAllContractorsForModules:",r)}if(a.length===0&&typeof Contractors<"u"&&typeof Contractors.getApprovedOptions=="function")try{const r=Contractors.getApprovedOptions(!1);r&&r.length>0&&(a=r.map(l=>({id:l.id||l.contractorId||"",name:(l.name||"").trim(),serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||"").trim()})).filter(l=>l.name))}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",r)}if(a.length===0){const r=AppState.appData.approvedContractors||[],l=new Map;r.filter(c=>c&&(c.companyName||c.name)&&c.isActive!=="inactive"&&c.isActive!==!1&&c.isActive!=="false"&&c.isActive!=="FALSE").forEach(c=>{const s=(c.companyName||c.name||"").trim();!s||s==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"||l.has(s)||l.set(s,{id:c.id||"",name:s,serviceType:(c.serviceType||"").trim(),licenseNumber:(c.licenseNumber||c.contractNumber||"").trim()})}),a=Array.from(l.values()).sort((c,s)=>{const d=c.name.toLowerCase(),p=s.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}e.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>';const n=document.createDocumentFragment();let o=null;if(a.forEach(r=>{if(!r||!r.name)return;const l=document.createElement("option");l.value=r.name,l.textContent=r.name,r.serviceType&&(l.textContent+=` - ${r.serviceType}`),l.dataset.contractorId=r.id||"",(t&&r.name===t||i&&r.id===i)&&(l.selected=!0,o=l),n.appendChild(l)}),e.appendChild(n),t&&!o&&e.value!==t)try{e.value=t}catch{Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",t)}},async showViolationForm(e=null){let t=null;if(typeof e=="string"?t=AppState.appData.violations?.find(y=>y.id===e)||null:typeof e=="object"&&(t=e),t=this.normalizeViolationRecord(t),t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const i=t?this.getEffectiveFineAmount(t):0,a=!!t,o=String(t?.personType||"").trim().toLowerCase()==="contractor"||!!t?.contractorName&&!t?.employeeName,r=!o,l=String(t?.violationLocationId||t?.violationLocation||"").trim(),c=String(t?.violationPlaceId||t?.violationPlace||"").trim();let s=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),s=ViolationTypesManager.getAll()}catch(y){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",y),s=AppState?.appData?.violationTypes||[]}else s=AppState?.appData?.violationTypes||[];const d=t?.violationTypeId||"",p=(t?.violationType||"").trim(),f=(AppState?.currentUser?.role||"").toString().trim().toLowerCase(),u=["admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","system_admin"].includes(f),w=s.map(y=>{const k=d?y.id===d:y.name===p,A=Number(y?.fineAmount||0);return`
                <option value="${Utils.escapeHTML(y.name)}" data-type-id="${Utils.escapeHTML(y.id)}" data-fine-amount="${A}" ${k?"selected":""}>
                    ${Utils.escapeHTML(y.name)}
                </option>
            `}).join(""),h=!s.some(y=>d?y.id===d:y.name===p)&&p?`
                <option value="${Utils.escapeHTML(p)}" data-type-id="${Utils.escapeHTML(d)}" data-fine-amount="${Number(i)}" selected>
                    ${Utils.escapeHTML(p)} (\u063A\u064A\u0631 \u0645\u0639\u0631\u0641)
                </option>
            `:"",g=document.createElement("div");g.className="modal-overlay",g.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle ml-2 text-yellow-600"></i>
                        ${a?"\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- \u2705 \u0634\u0631\u064A\u0637 \u062A\u0646\u0628\u064A\u0647 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C (\u064A\u0638\u0647\u0631 \u0623\u0639\u0644\u0649 \u0627\u0644\u062D\u0642\u0648\u0644) -->
                    <div id="violation-form-banner" class="hidden mb-4 rounded-lg border p-3 flex items-start gap-2.5" role="alert" style="font-size: 0.9rem;">
                        <i id="violation-form-banner-icon" class="fas fa-circle-info text-lg mt-0.5"></i>
                        <div class="flex-1 min-w-0">
                            <div id="violation-form-banner-title" class="font-bold mb-0.5"></div>
                            <div id="violation-form-banner-text" class="leading-relaxed"></div>
                        </div>
                        <button type="button" id="violation-form-banner-close" class="text-gray-400 hover:text-gray-700 ms-2" title="\u0625\u062E\u0641\u0627\u0621">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <form id="violation-form" class="space-y-4">
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user-tag ml-2 text-blue-600"></i>
                                    \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 *
                                </label>
                                <select id="violation-person-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    <option value="employee" ${r?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${o?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                </select>
                            </div>
                            <div id="violation-employee-code-container" style="display: ${r?"block":"none"};">
                                <label for="violation-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-id-card ml-2"></i>
                                    \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                </label>
                                <input type="text" id="violation-employee-code" class="form-input"
                                    value="${t?.employeeCode||t?.employeeNumber||""}" 
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"
                                    ${r?"required":""}>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0646\u064A: \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="violation-person-name" class="block text-sm font-semibold text-gray-700 mb-2" id="violation-person-name-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *</label>
                                <input type="text" id="violation-person-name" required class="form-input"
                                    value="${t?.employeeName||t?.contractorName||""}" 
                                    placeholder="${r?"\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"}"
                                    ${r?"readonly":""}
                                    style="display: ${o?"none":"block"};">
                                <label for="violation-contractor-select" class="block text-sm font-semibold text-gray-700 mb-2" style="display: ${o?"block":"none"};">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <select id="violation-contractor-select" class="form-input"
                                    style="display: ${o?"block":"none"};"
                                    ${o?"required":""}>
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                </select>
                            </div>
                            <div id="violation-employee-position-container" style="display: ${r?"block":"none"};">
                                <label for="violation-employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="violation-employee-position" class="form-input"
                                    value="${t?.employeePosition||""}" 
                                    placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0644\u062B: \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div id="violation-employee-department-container" style="display: ${r?"block":"none"};">
                                <label for="violation-employee-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                <input type="text" id="violation-employee-department" class="form-input"
                                    value="${t?.employeeDepartment||""}" 
                                    placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly>
                            </div>
                            <div>
                                <label for="violation-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *</label>
                                <input type="date" id="violation-date" required class="form-input"
                                    value="${t?.violationDate?new Date(t.violationDate).toISOString().slice(0,10):""}">
                            </div>
                        </div>
                        <div id="violation-sequence-info" class="hidden mb-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                            <i class="fas fa-layer-group ml-2 text-amber-700"></i><span id="violation-sequence-text"></span>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u0631\u0627\u0628\u0639: \u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="violation-time" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-clock ml-2 text-purple-600"></i>
                                    \u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                </label>
                                <input type="time" id="violation-time" required class="form-input"
                                    value="${t?.violationTime||""}">
                            </div>
                            <div>
                                <label for="violation-type" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-exclamation-circle ml-2 text-red-600"></i>
                                    \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                </label>
                                <select id="violation-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                    ${h}
                                    ${w}
                                </select>
                            </div>
                            <div>
                                <label for="violation-fine-amount" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-money-bill-wave ml-2 text-green-600"></i>
                                    \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (\u062C.\u0645)
                                </label>
                                <input type="number" id="violation-fine-amount" class="form-input" min="0" step="1"
                                    value="${Number(i)}"
                                    placeholder="\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629">
                                <p class="text-xs text-gray-500 mt-1">
                                    ${u?"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0623\u0646\u0643 \u0645\u062F\u064A\u0631.":"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u060C \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637."}
                                </p>
                            </div>
                        </div>
                        <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 (\u062A\u0638\u0647\u0631 \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0642\u0627\u0648\u0644) -->
                        <div id="violation-contractor-fields-container" style="display: ${o?"block":"none"};">
                            <div class="grid grid-cols-2 gap-4">
                                <div id="violation-contractor-worker-container">
                                    <label for="violation-contractor-worker" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644</label>
                                    <input type="text" id="violation-contractor-worker" class="form-input"
                                        value="${t?.contractorWorker||""}" 
                                        placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644">
                                </div>
                                <div id="violation-contractor-position-container">
                                    <label for="violation-contractor-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                    <input type="text" id="violation-contractor-position" class="form-input"
                                        value="${t?.contractorPosition||""}" 
                                        placeholder="\u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0639\u0627\u0645\u0644">
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div id="violation-contractor-department-container">
                                    <label for="violation-contractor-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                    <input type="text" id="violation-contractor-department" class="form-input"
                                        value="${t?.contractorDepartment||""}" 
                                        placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639\u0629 \u0644\u0647">
                            </div>
                            <div>
                                    <label for="violation-contractor-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                    <select id="violation-contractor-location" required class="form-input">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    </select>
                            </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="violation-contractor-place" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *</label>
                                    <select id="violation-contractor-place" required class="form-input">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0644\u0644\u0645\u0648\u0638\u0641) -->
                        <div id="violation-location-fields-container" style="display: ${r?"block":"none"};">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="violation-employee-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                    <select id="violation-employee-location" required class="form-input">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="violation-employee-place" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *</label>
                                    <select id="violation-employee-place" required class="form-input">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062E\u0627\u0645\u0633: \u0627\u0644\u0634\u062F\u0629 \u0648\u0627\u0644\u062D\u0627\u0644\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-signal ml-2 text-orange-600"></i>
                                    \u0627\u0644\u0634\u062F\u0629 *
                                </label>
                                <select id="violation-severity" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u062F\u0629</option>
                                    <option value="\u0639\u0627\u0644\u064A\u0629" ${t?.severity==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${t?.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                    <option value="\u0645\u0646\u062E\u0636\u0629" ${t?.severity==="\u0645\u0646\u062E\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label for="violation-status" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-info-circle ml-2 text-blue-600"></i>
                                    \u0627\u0644\u062D\u0627\u0644\u0629 *
                                </label>
                                <select id="violation-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${t?.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="\u0645\u062D\u0644\u0648\u0644" ${t?.status==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                                    <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${t?.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0648\u0631\u0629 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 -->
                            <div class="col-span-2">
                                <label for="violation-photo-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-image ml-2"></i>
                                    \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u063A\u064A\u0631 \u0625\u0644\u0632\u0627\u0645\u064A)
                                </label>
                                <input type="file" id="violation-photo-input" accept="image/*" class="form-input">
                                <div id="violation-photo-preview" class="mt-2 ${t?.photo?"":"hidden"}">
                                    <img src="${t?.photo||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" class="w-48 h-48 object-cover rounded border" id="violation-photo-img">
                                <button type="button" onclick="const photoInput = document.getElementById('violation-photo-input'); if (photoInput) photoInput.value=''; const photoPreview = document.getElementById('violation-photo-preview'); if (photoPreview) photoPreview.classList.add('hidden');" class="mt-1 text-xs text-red-600">\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629</button>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label for="violation-details" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-file-alt ml-2 text-amber-600"></i>
                                    \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629
                                </label>
                                <textarea id="violation-details" class="form-input" rows="3"
                                    placeholder="\u0627\u0643\u062A\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0648\u0635\u0641\u0647\u0627 \u0627\u0644\u0643\u0627\u0645\u0644...">${t?.violationDetails||""}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label for="violation-action" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-tasks ml-2 text-indigo-600"></i>
                                    \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                                </label>
                                <textarea id="violation-action" class="form-input" rows="3"
                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 \u0628\u0634\u0623\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...">${t?.actionTaken||""}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                            </button>
                            <button type="submit" id="violation-submit-btn" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(g);const D=document.getElementById("violation-person-type"),B=document.getElementById("violation-employee-code-container"),T=document.getElementById("violation-employee-code"),C=document.getElementById("violation-person-name"),F=document.getElementById("violation-person-name-label"),$=document.getElementById("violation-contractor-select");if($){const y=t?.contractorName||"",k=t?.contractorId||"";this.loadContractorsIntoSelect($,y,k)}const S=document.getElementById("violation-employee-position-container"),_=document.getElementById("violation-employee-department-container"),O=document.getElementById("violation-employee-position"),P=document.getElementById("violation-employee-department"),R=document.getElementById("violation-contractor-fields-container"),v=document.getElementById("violation-contractor-worker-container"),U=document.getElementById("violation-contractor-position-container"),G=document.getElementById("violation-contractor-department-container"),it=document.getElementById("violation-contractor-worker"),ot=document.getElementById("violation-contractor-position"),W=document.getElementById("violation-contractor-department"),Q=document.getElementById("violation-location-fields-container"),X=document.getElementById("violation-type"),J=document.getElementById("violation-fine-amount"),Et=new Map((s||[]).map(y=>[String(y.id||"").trim(),y])),It=new Map((s||[]).map(y=>[String(y.name||"").trim().toLowerCase(),y])),bt=()=>{const y=X?.selectedOptions?.[0],k=y?.getAttribute("data-type-id")||"",A=(X?.value||"").trim().toLowerCase(),b=k&&Et.get(k)||A&&It.get(A)||null,I=Number(y?.getAttribute("data-fine-amount")||0),E=Number(b?.fineAmount??I??0);return Number.isFinite(E)&&E>=0?E:0},lt=({force:y=!1}={})=>{if(!J)return;const k=bt();(y||!u||J.value==="")&&(J.value=String(k))};J&&(J.readOnly=!u),X&&(X.addEventListener("change",()=>lt({force:!0})),X.addEventListener("input",()=>lt({force:!0}))),J&&u&&t&&t.fineAmount!==void 0&&t.fineAmount!==null?J.value=String(Number(i)):lt({force:!0}),D.addEventListener("change",y=>{if(y.target.value==="employee"){if(B.style.display="block",T.required=!0,T.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)",C.style.display="block",C.readOnly=!0,C.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",C.value="",C.required=!0,$&&($.style.display="none",$.required=!1),S&&(S.style.display="block"),_&&(_.style.display="block"),R&&(R.style.display="none"),Q&&(Q.style.display="block"),this.loadLocationOptions("employee").then(()=>{const A=document.getElementById("violation-employee-location");if(A){const b=A.cloneNode(!0);A.parentNode.replaceChild(b,A);const I=document.getElementById("violation-employee-location");I&&I.addEventListener("change",E=>{const M=E.target.value;this.loadPlaceOptions(M,"","employee")})}}),F&&(F.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *"),typeof EmployeeHelper<"u"&&T&&T.parentNode)try{const A=T.cloneNode(!0);T.parentNode.replaceChild(A,T),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",I=>{if(I){const E=document.getElementById("violation-person-name"),M=document.getElementById("violation-employee-position"),j=document.getElementById("violation-employee-department");E&&(E.value=I.name||""),M&&(M.value=I.position||I.jobTitle||""),j&&(j.value=I.department||I.section||"")}})}catch(A){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",A),T&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",b=>{if(b){const I=document.getElementById("violation-person-name"),E=document.getElementById("violation-employee-position"),M=document.getElementById("violation-employee-department");I&&(I.value=b.name||""),E&&(E.value=b.position||b.jobTitle||""),M&&(M.value=b.department||b.section||"")}})}}else lt({force:!0}),B.style.display="none",T.required=!1,T.value="",C.style.display="none",C.required=!1,C.value="",$&&($.style.display="block",$.required=!0,this.loadContractorsIntoSelect($)),S&&(S.style.display="none"),_&&(_.style.display="none"),R&&(R.style.display="block"),this.loadLocationOptions("contractor").then(()=>{const A=document.getElementById("violation-contractor-location");if(A){const b=A.cloneNode(!0);A.parentNode.replaceChild(b,A);const I=document.getElementById("violation-contractor-location");I&&I.addEventListener("change",E=>{const M=E.target.value;this.loadPlaceOptions(M,"","contractor")})}}),Q&&(Q.style.display="none"),F&&(F.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *");ct()});const ct=()=>{clearTimeout(this._violationSeqBadgeTimer),this._violationSeqBadgeTimer=setTimeout(()=>{this.refreshViolationSequenceBadgeInModal(g,a?t?.id:null)},200)};if(g.addEventListener("input",ct),g.addEventListener("change",ct),setTimeout(ct,350),typeof EmployeeHelper<"u"&&t?.employeeName&&T&&T.parentNode)try{const y=T.cloneNode(!0);T.parentNode.replaceChild(y,T),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",A=>{if(A){const b=document.getElementById("violation-person-name"),I=document.getElementById("violation-employee-position"),E=document.getElementById("violation-employee-department");b&&(b.value=A.name||""),I&&(I.value=A.position||A.jobTitle||""),E&&(E.value=A.department||A.section||"")}})}catch(y){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",y),T&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",k=>{if(k){const A=document.getElementById("violation-person-name"),b=document.getElementById("violation-employee-position"),I=document.getElementById("violation-employee-department");A&&(A.value=k.name||""),b&&(b.value=k.position||k.jobTitle||""),I&&(I.value=k.department||k.section||"")}})}const ft=o?"contractor":"employee";setTimeout(async()=>{await this.loadLocationOptions("employee"),await this.loadLocationOptions("contractor");const y=document.getElementById("violation-employee-location"),k=document.getElementById("violation-employee-place");if(y&&k){const I=y.cloneNode(!0);y.parentNode.replaceChild(I,y);const E=k.cloneNode(!0);k.parentNode.replaceChild(E,k);const M=document.getElementById("violation-employee-location"),j=document.getElementById("violation-employee-place");M&&M.addEventListener("change",z=>{const Y=z.target.value;this.loadPlaceOptions(Y,"","employee")})}const A=document.getElementById("violation-contractor-location"),b=document.getElementById("violation-contractor-place");if(A&&b){const I=A.cloneNode(!0);A.parentNode.replaceChild(I,A);const E=b.cloneNode(!0);b.parentNode.replaceChild(E,b);const M=document.getElementById("violation-contractor-location"),j=document.getElementById("violation-contractor-place");M&&M.addEventListener("change",z=>{const Y=z.target.value;this.loadPlaceOptions(Y,"","contractor")})}if(ft==="employee"&&D.value==="employee"&&typeof EmployeeHelper<"u"&&document.getElementById("violation-employee-code"))try{EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",E=>{if(E){const M=document.getElementById("violation-person-name"),j=document.getElementById("violation-employee-position"),z=document.getElementById("violation-employee-department");M&&(M.value=E.name||""),j&&(j.value=E.position||E.jobTitle||""),z&&(z.value=E.department||E.section||"")}})}catch(E){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",E)}},100),l&&setTimeout(()=>{if(ft==="employee"){const y=document.getElementById("violation-employee-location");y&&(y.value=l,l&&this.loadPlaceOptions(l,c,"employee"))}else if(ft==="contractor"){const y=document.getElementById("violation-contractor-location");y&&(y.value=l,l&&this.loadPlaceOptions(l,c,"contractor"))}},200);const mt=document.getElementById("violation-photo-input"),ht=document.getElementById("violation-photo-preview"),xt=document.getElementById("violation-photo-img");mt&&ht&&xt&&mt.addEventListener("change",async y=>{const k=y.target.files[0];if(k){if(k.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),mt.value="";return}const A=new FileReader;A.onload=b=>{xt.src=b.target.result,ht.classList.remove("hidden")},A.readAsDataURL(k)}});const ut=g.querySelector("#violation-form"),Z=g.querySelector("#violation-submit-btn")||ut?.querySelector('button[type="submit"]');if(!ut||!Z){AppState.debugMode&&Utils.safeError("\u274C \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648 \u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const at=(y,k,A)=>{const b=g.querySelector("#violation-form-banner"),I=g.querySelector("#violation-form-banner-icon"),E=g.querySelector("#violation-form-banner-title"),M=g.querySelector("#violation-form-banner-text");if(!b||!I||!E||!M)return;const j={error:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",icon:"fa-circle-xmark text-red-600"},warning:{bg:"#fffbeb",border:"#fde68a",text:"#92400e",icon:"fa-triangle-exclamation text-amber-600"},success:{bg:"#ecfdf5",border:"#a7f3d0",text:"#065f46",icon:"fa-circle-check text-emerald-600"},info:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",icon:"fa-circle-info text-blue-600"}},z=j[y]||j.info;b.style.background=z.bg,b.style.borderColor=z.border,b.style.color=z.text,I.className="fas "+z.icon+" text-lg mt-0.5",E.textContent=k||"",M.textContent=A||"",b.classList.remove("hidden");try{const Y=g.querySelector(".modal-body");Y&&Y.scrollTo({top:0,behavior:"smooth"})}catch{}},wt=()=>{const y=g.querySelector("#violation-form-banner");y&&y.classList.add("hidden")},St=g.querySelector("#violation-form-banner-close");St&&St.addEventListener("click",wt);const kt=async y=>{if(y&&(y.preventDefault(),y.stopPropagation(),y.stopImmediatePropagation()),Z.disabled){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");return}const k=Z,A=k.innerHTML;k.disabled=!0,k.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{const b=document.getElementById("violation-person-type")?.value,I=document.getElementById("violation-date")?.value,E=document.getElementById("violation-time")?.value,M=document.getElementById("violation-type")?.value,j=document.getElementById("violation-severity")?.value,z=document.getElementById("violation-status")?.value,Y=document.getElementById("violation-details")?.value.trim()||"",Ct=document.getElementById("violation-action")?.value.trim()||"",dt=document.getElementById("violation-fine-amount")?.value;let yt="";if(dt!==""&&dt!==null&&dt!==void 0){const x=this.parseFineAmount(dt);Number.isFinite(x)&&x>=0&&(yt=x)}else yt=this.parseFineAmount(bt());const q=[];b||q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"),I||q.push("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),E||q.push("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),M||q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),j||q.push("\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),z||q.push("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629");let nt="",$t="";if(b==="employee"){const x=document.getElementById("violation-employee-code")?.value.trim();nt=document.getElementById("violation-person-name")?.value.trim(),x||q.push("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),nt||q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}else if(b==="contractor"){const x=document.getElementById("violation-contractor-select");if(!x||!x.value)q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");else{nt=x.value;const L=x.options[x.selectedIndex];$t=L?.dataset.contractorCode||L?.dataset.contractorId||""}}let tt="",st="",et="",rt="";if(b==="employee"){const x=document.getElementById("violation-employee-location"),L=document.getElementById("violation-employee-place");tt=x?.value||"",st=x?.options[x?.selectedIndex]?.text||"",et=L?.value||"",rt=L?.options[L?.selectedIndex]?.text||""}else if(b==="contractor"){const x=document.getElementById("violation-contractor-location"),L=document.getElementById("violation-contractor-place");tt=x?.value||"",st=x?.options[x?.selectedIndex]?.text||"",et=L?.value||"",rt=L?.options[L?.selectedIndex]?.text||""}if(tt||q.push("\u0627\u0644\u0645\u0648\u0642\u0639"),et||q.push("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),q.length>0){at("error","\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0646\u0627\u0642\u0635\u0629","\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644: "+q.join("\u060C ")),k.disabled=!1,k.innerHTML=A,q.forEach(x=>{let L="";if(x.includes("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")?L="violation-employee-code":x.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")?L="violation-person-name":x.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?L="violation-contractor-select":x.includes("\u062A\u0627\u0631\u064A\u062E")?L="violation-date":x.includes("\u0648\u0642\u062A")?L="violation-time":x.includes("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")?L="violation-type":x.includes("\u0627\u0644\u0634\u062F\u0629")?L="violation-severity":x.includes("\u0627\u0644\u062D\u0627\u0644\u0629")?L="violation-status":x.includes("\u0627\u0644\u0645\u0648\u0642\u0639")?L=b==="employee"?"violation-employee-location":"violation-contractor-location":x.includes("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")&&(L=b==="employee"?"violation-employee-place":"violation-contractor-place"),L){const K=document.getElementById(L);K&&(K.classList.add("border-red-500","ring-2","ring-red-300"),K.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{K.classList.remove("border-red-500","ring-2","ring-red-300")},3e3))}});return}let pt=t?.photo||"";const Lt=document.getElementById("violation-photo-input");if(Lt?.files.length>0){const x=Lt.files[0];if(x.size>2*1024*1024){at("error","\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627\u064B","\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 2MB. \u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0623\u0635\u063A\u0631."),k.disabled=!1,k.innerHTML=A;return}try{pt=await Violations.convertImageToBase64(x)}catch(L){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",L)}}wt();const Ut=X?.selectedOptions?.[0]?.getAttribute("data-type-id")||"",Tt=I&&E?new Date(`${I}T${E}`).toISOString():new Date().toISOString(),H={id:t?.id||Utils.generateId("VIOLATION"),isoCode:t?.isoCode||generateISOCode("VIOL",AppState.appData.violations||[]),personType:b,employeeId:b==="employee"?t?.employeeId||Utils.generateId("EMP"):"",employeeName:b==="employee"?nt:"",employeeCode:b==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeeNumber:b==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeePosition:b==="employee"&&document.getElementById("violation-employee-position")?.value.trim()||"",employeeDepartment:b==="employee"&&document.getElementById("violation-employee-department")?.value.trim()||"",contractorId:b==="contractor"?$t:"",contractorName:b==="contractor"?nt:"",contractorWorker:b==="contractor"&&document.getElementById("violation-contractor-worker")?.value.trim()||"",contractorPosition:b==="contractor"&&document.getElementById("violation-contractor-position")?.value.trim()||"",contractorDepartment:b==="contractor"&&document.getElementById("violation-contractor-department")?.value.trim()||"",violationTypeId:Ut,violationType:M,fineAmount:this.parseFineAmount(yt),violationDate:Tt,violationTime:E,violationLocation:st&&st!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"?st:tt,violationLocationId:tt?String(tt).trim():null,violationPlace:rt&&rt!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"?rt:et,violationPlaceId:et?String(et).trim():null,violationDetails:Y,severity:j,actionTaken:Ct,status:z,photo:pt,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},_t={personType:b,violationDate:Tt,employeeCode:H.employeeCode,employeeNumber:H.employeeNumber,contractorName:H.contractorName,contractorWorker:H.contractorWorker},Mt=this.countPriorViolationsSamePersonMonth(_t,a&&t?.id?t.id:null);H.violationSequenceInMonth=Mt+1;try{const x=await this.checkViolationApprovalGate(H,{isEdit:a});if(x&&x.requiresApproval){let L=pt;if(L&&typeof L=="string"&&L.startsWith("data:"))try{k.innerHTML='<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...';const N=await GoogleIntegration.uploadFileToDrive?.(L,`violation_${H.id}_${Date.now()}.jpg`,"image/jpeg","Violations");N&&N.success?L=N.directLink||N.shareableLink||"":(L="",at("warning","\u062A\u0639\u0630\u0651\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629","\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u062F\u0648\u0646 \u0627\u0644\u0635\u0648\u0631\u0629. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0623\u0648 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0627\u062D\u0642\u0627\u064B.")),k.innerHTML=A,k.disabled=!0,k.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'}catch(N){AppState.debugMode&&Utils.safeWarn("Drive upload failed in approval path:",N),L=""}const K={...H,photo:L},V=await this.submitViolationForApproval(K,{isEdit:a,originalId:t?.id});if(k.disabled=!1,k.innerHTML=A,V&&V.success){this._invalidateViolationApprovalRequestsCache(),g.remove(),Notification.success(V.message||"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627.");try{document.dispatchEvent(new CustomEvent("violation-approval-request-created",{detail:V.data||{}}))}catch{}return}else{const N=V&&V.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";at("error","\u062A\u0639\u0630\u0651\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",N);return}}}catch(x){AppState.debugMode&&Utils.safeWarn("approvalGate error (continuing with direct save):",x)}if(AppState.appData.violations||(AppState.appData.violations=[]),a&&t?.id){const x=AppState.appData.violations.findIndex(L=>L.id===t.id);if(x!==-1)AppState.appData.violations[x]={...AppState.appData.violations[x],...H,id:t.id,isoCode:t.isoCode||H.isoCode,createdAt:t.createdAt||H.createdAt,updatedAt:new Date().toISOString()};else throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}else AppState.appData.violations.push(H);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),g.remove(),Notification.success(`\u062A\u0645 ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629...`);try{this.updateAllViolationsStats()}catch{}try{typeof Dashboard<"u"&&(typeof Dashboard.updateStats=="function"&&Dashboard.updateStats(),typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics())}catch{}try{document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"violations",action:a?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:H}}))}catch{}try{typeof Violations<"u"&&typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations<"u"&&Violations.load&&Violations.load()}catch{}(async x=>{let L=x,K=!1;if(x&&x.startsWith("data:"))try{const V=await GoogleIntegration.uploadFileToDrive?.(x,`violation_${H.id}_${Date.now()}.jpg`,"image/jpeg","Violations");V?.success&&(L=V.directLink||V.shareableLink||x,K=!0)}catch(V){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",V)}if(K){const V=AppState.appData.violations||[],N=V.findIndex(vt=>vt.id===H.id);N!==-1&&(V[N].photo=L,H.photo=L,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Violations<"u"&&Violations.load&&Violations.load())}try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const V=Object.assign({},H,{photo:L});let N;if(a?N=await GoogleIntegration.sendRequest({action:"updateViolation",data:{violationId:H.id,updateData:V}}):N=await GoogleIntegration.sendRequest({action:"addViolation",data:V}),N&&N.success===!0){try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}AppState.debugMode&&Utils.safeLog("\u2705 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D")}else{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",N&&N.message);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}}}catch(V){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",V);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}})(pt).catch(x=>{Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",x)})}catch(b){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",b),at("error","\u062D\u062F\u062B \u062E\u0637\u0623",b&&(b.message||b.toString())||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),k.disabled=!1,k.innerHTML=A}};ut.addEventListener("submit",kt,{once:!1});const Dt=Z.cloneNode(!0);Z.parentNode.replaceChild(Dt,Z);const gt=g.querySelector("#violation-submit-btn")||g.querySelector('button[type="submit"]');gt&&gt.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),!gt.disabled&&kt(y)}),g.addEventListener("click",y=>{y.target===g&&g.remove()});const At=y=>{y.key==="Escape"&&document.body.contains(g)&&(g.remove(),document.removeEventListener("keydown",At))};document.addEventListener("keydown",At)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(o){return String(o??"")},i='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(o){return'<option value="'+t(o.id)+'">'+t(o.name)+"</option>"}).join(""),a=document.getElementById("blacklist-factory");if(a&&a.tagName==="SELECT"){var n=a.value;a.innerHTML=i,n&&(a.value=n)}}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Violations.refreshSiteDropdowns:",o)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(a=>a.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const a=Permissions.formSettingsState.sites.find(n=>n.id===e);if(a&&Array.isArray(a.places))return a.places.map(n=>({id:n.id||n.placeId||Utils.generateId("PLACE"),name:n.name||n.placeName||"\u0645\u0643\u0627\u0646 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}))}if(Array.isArray(AppState.appData?.observationSites)){const a=AppState.appData.observationSites.find(n=>n.id===e||n.siteId===e||n.name===e);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((o,r)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},async loadLocationOptions(e="employee"){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=this.getSiteOptions(),i=e==="employee"?"violation-employee-location":"violation-contractor-location",a=document.getElementById(i);if(!a)return;a.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',t&&t.length>0&&t.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=n.name,a.appendChild(o)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)}},loadPlaceOptions(e,t="",i="employee"){try{const a=i==="employee"?"violation-employee-place":"violation-contractor-place",n=document.getElementById(a);if(!n||(n.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>',!e))return;const o=this.getPlaceOptions(e);o&&o.length>0&&o.forEach(r=>{const l=document.createElement("option");l.value=r.id,l.textContent=r.name,t&&(r.id===t||r.name===t)&&(l.selected=!0),n.appendChild(l)})}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",a)}},async convertImageToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},async viewViolation(e){const t=AppState.appData?.violations?.find(r=>r.id===e);if(!t){typeof Notification<"u"&&Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeViolationRecord(t)||t;if(!this.isViolationVisibleToCurrentUser(i)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0645\u062E\u0627\u0644\u0641\u0629 \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const a=String(i.severity||"").trim(),n=String(i.status||"").trim(),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 750px; border-radius: 16px; overflow: hidden;">
                <div class="modal-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px 24px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; gap: 12px; font-size: 1.3rem;">
                        <i class="fas fa-exclamation-triangle"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; background: rgba(255,255,255,0.2); border-radius: 8px; width: 36px; height: 36px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 24px;">
                    <div class="space-y-4">
                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 (\u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646) -->
                        <div style="background: #fef2f2; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #991b1b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-user"></i> \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                                ${i.contractorName||i.personType==="contractor"?`
                                <!-- \u0645\u0642\u0627\u0648\u0644: \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 (\u0627\u0644\u0639\u0627\u0645\u0644) + \u0627\u0644\u0648\u0638\u064A\u0641\u0629 + \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(i.contractorWorker||i.employeeName||i.contractorName||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.contractorPosition||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(i.contractorName||"-")}</p>
                                </div>
                                ${i.contractorDepartment?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.contractorDepartment||"-")}</p>
                                </div>
                                `:""}
                                `:`
                                <!-- \u0645\u0648\u0638\u0641: \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 + \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A + \u0627\u0644\u0648\u0638\u064A\u0641\u0629 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(i.employeeName||"-")}</p>
                                </div>
                                ${i.employeeCode?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.employeeCode||i.employeeNumber||"-")}</p>
                                </div>
                                `:""}
                                ${i.employeePosition?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.employeePosition||"-")}</p>
                                </div>
                                `:""}
                                ${i.employeeDepartment?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.employeeDepartment||"-")}</p>
                                </div>
                                `:""}
                                `}
                            </div>
                        </div>

                        <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        <div style="background: #fff7ed; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #c2410c; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-info-circle"></i> \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.violationType||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                    <p class="text-gray-800">${i.violationDate?Utils.formatDate(i.violationDate):"-"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.violationLocation||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0643\u0627\u0646:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(i.violationPlace||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u062F\u0629:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${i.severity==="\u0639\u0627\u0644\u064A\u0629"?"#fef2f2":i.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#fffbeb":"#eff6ff"}; color: ${i.severity==="\u0639\u0627\u0644\u064A\u0629"?"#dc2626":i.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"}; border: 1px solid ${i.severity==="\u0639\u0627\u0644\u064A\u0629"?"#fecaca":i.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#fde68a":"#bfdbfe"};">
                                        ${i.severity||"-"}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${i.status==="\u0645\u062D\u0644\u0648\u0644"?"#ecfdf5":"#fef3c7"}; color: ${i.status==="\u0645\u062D\u0644\u0648\u0644"?"#059669":"#d97706"}; border: 1px solid ${i.status==="\u0645\u062D\u0644\u0648\u0644"?"#a7f3d0":"#fde68a"};">
                                        ${i.status||"-"}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629:</label>
                                    <p class="text-gray-800 font-semibold">${this.formatFineAmount(Number(this.getEffectiveFineAmount(i)))}</p>
                                </div>
                            </div>
                            ${i.violationDetails?`
                            <div class="mt-4">
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                <p class="text-gray-800 mt-1 p-3 bg-white rounded-lg border">${Utils.escapeHTML(i.violationDetails)}</p>
                            </div>
                            `:""}
                        </div>

                        <!-- \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 -->
                        ${i.actionTaken?`
                        <div style="background: #f0fdf4; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #166534; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-tasks"></i> \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                            </h3>
                            <p class="text-gray-800 p-3 bg-white rounded-lg border">${Utils.escapeHTML(i.actionTaken)}</p>
                        </div>
                        `:""}

                        <!-- \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        ${(()=>{const r=this.processPhoto(i.photo);if(!r)return"";const l=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r,displaySrc:r,needsProxy:!1,proxyFileId:""},c=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`
                        <div style="background: #f8fafc; border-radius: 12px; padding: 16px;">
                            <h3 style="font-weight: 600; color: #475569; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-image"></i> \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629
                            </h3>
                            <img src="${Utils.escapeHTML(l.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"${c} class="violation-detail-photo w-full max-w-md h-64 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                        </div>
                        `})()}

                        <div class="violation-view-quick-edit" style="border: 2px dashed #cbd5e1; border-radius: 12px; padding: 16px; margin-top: 8px; background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);">
                            <h4 style="font-weight: 700; color: #334155; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; font-size: 1rem;">
                                <i class="fas fa-pen-to-square text-indigo-600"></i>
                                \u062A\u0639\u062F\u064A\u0644 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629
                            </h4>
                            <p style="font-size: 0.8rem; color: #64748b; margin: 0 0 12px 0;">\u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0634\u062F\u0629 \u0648\u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0627\u0644\u0646\u0635\u0648\u0635 \u0623\u062F\u0646\u0627\u0647 \u062B\u0645 \u0627\u0644\u062D\u0641\u0638 \u062F\u0648\u0646 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0643\u0627\u0645\u0644.</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label for="violation-view-q-severity" class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0634\u062F\u0629</label>
                                    <select id="violation-view-q-severity" class="form-input" style="width:100%;">
                                        <option value="\u0639\u0627\u0644\u064A\u0629" ${a==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                        <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${a==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                        <option value="\u0645\u0646\u062E\u0636\u0629" ${a==="\u0645\u0646\u062E\u0636\u0629"||a==="\u0645\u0646\u062E\u0641\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="violation-view-q-status" class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                    <select id="violation-view-q-status" class="form-input" style="width:100%;">
                                        <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${n==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                        <option value="\u0645\u062D\u0644\u0648\u0644" ${n==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                                        <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${n==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="violation-view-q-details" class="block text-sm font-semibold text-gray-700 mb-1">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</label>
                                <textarea id="violation-view-q-details" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(i.violationDetails||"")}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="violation-view-q-action" class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</label>
                                <textarea id="violation-view-q-action" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(i.actionTaken||"")}</textarea>
                            </div>
                            <button type="button" id="violation-view-quick-save" class="btn-primary" style="width: 100%; justify-content: center; display: inline-flex; align-items: center; gap: 8px;">
                                <i class="fas fa-save"></i>
                                \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer violation-view-actions-footer" style="background: #f8fafc; padding: 16px 24px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 18px; border-radius: 10px;">\u0625\u063A\u0644\u0627\u0642</button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("violations"):""}
                    <button type="button" class="btn-primary" onclick='Violations.printViolationProfessional(${this._escapeIdForHandler(i.id)})' style="background: linear-gradient(135deg, #0f766e, #0d9488); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629 \u0645\u0646\u0633\u0651\u0642\u0629
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(i.id)}, this)' style="background: linear-gradient(135deg, #10b981, #059669); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-file-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 PDF \u0645\u0628\u0627\u0634\u0631
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.showViolationForm(${this._escapeIdForHandler(i.id)}); this.closest(".modal-overlay").remove();' style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-sliders-h ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0643\u0627\u0645\u0644 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644)
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(o,{moduleKey:"violations",record:i,recordId:i.id}),o.querySelector("#violation-view-quick-save")?.addEventListener("click",async()=>{await this.saveViolationQuickEditsFromView(i.id,o)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(o,{onFetchFail:r=>{try{r.onerror=null,r.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),o.addEventListener("click",r=>{r.target===o&&o.remove()})},async saveViolationQuickEditsFromView(e,t){const i=t.querySelector("#violation-view-q-severity")?.value?.trim()||"",a=t.querySelector("#violation-view-q-status")?.value?.trim()||"",n=t.querySelector("#violation-view-q-details")?.value?.trim()||"",o=t.querySelector("#violation-view-q-action")?.value?.trim()||"",r=t.querySelector("#violation-view-quick-save");if(!AppState.appData?.violations){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0627\u0644\u0641\u0627\u062A.");return}const l=AppState.appData.violations.findIndex(s=>s.id===e);if(l===-1){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.");return}const c=r?.innerHTML;r&&(r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{AppState.appData.violations[l]={...AppState.appData.violations[l],severity:i,status:a,violationDetails:n,actionTaken:o,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();let s=!0;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const d=await GoogleIntegration.autoSave("Violations",AppState.appData.violations);d&&d.success===!1&&(s=!1)}}catch(d){s=!1,AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",d)}if(!s)Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL");else try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewViolation(e);try{const d=document.querySelector("#violations-section .tabs-container .tab-btn.active")?.dataset?.tab||"all",p=document.getElementById("violations-list");if(p&&(d==="all"?p.innerHTML=this.renderViolationsList():d==="employees"?p.innerHTML=this.renderEmployeeViolationsList():d==="contractors"&&(p.innerHTML=this.renderContractorViolationsList())),d==="all"){const f=document.getElementById("violations-stats-cards");f&&(f.outerHTML=this.renderAllViolationsStats())}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639:",d)}}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",s),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+(s.message||String(s))),r&&(r.disabled=!1,r.innerHTML=c||'<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629')}},_buildViolationReportTableHtml(e){const t=this.normalizeViolationRecord(e)||e,i=(l,c="\u2014")=>Utils.escapeHTML(String(l==null||l===""?c:l)),a=l=>{if(!l)return"\u2014";if(typeof Utils.formatDateTime=="function"){const s=Utils.formatDateTime(l);return s&&s!=="-"?s:"\u2014"}const c=new Date(l);return Number.isNaN(c.getTime())?String(l):c.toLocaleString("ar-EG-u-nu-latn",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})},n=t.personType==="contractor"||!!t.contractorName,o=(l,c,s={})=>`
            <div class="vr-info ${s.wide?"vr-info-wide":""}">
                <span class="vr-label">${i(l,"")}</span>
                <strong class="vr-value ${s.accent||""}">${i(c)}</strong>
            </div>`,r=this.processPhoto(t.photo);return`
            <style>
                .violation-report{--vr-navy:#102a43;--vr-red:#b91c1c;--vr-gold:#d97706;--vr-ink:#172033;direction:rtl;color:var(--vr-ink);font-family:'Cairo','Tahoma','Segoe UI',sans-serif;letter-spacing:0}
                .violation-report *{box-sizing:border-box;letter-spacing:0}
                .vr-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;margin:0 0 7px;border-radius:8px;background:linear-gradient(125deg,var(--vr-navy),#173d6c);color:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                .vr-banner-title{font-size:14px;font-weight:800}.vr-banner-sub{margin-top:2px;color:#bfdbfe;font-size:9px}
                .vr-code{min-width:110px;padding:4px 8px;border:1px solid rgba(255,255,255,.3);border-radius:6px;text-align:center;background:rgba(255,255,255,.09)}
                .vr-code small{display:block;color:#bae6fd;font-size:8px}.vr-code strong{display:block;margin-top:1px;font-size:11.5px}
                .vr-section{margin:0 0 7px;border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;page-break-inside:avoid;break-inside:avoid;background:#fff}
                .vr-section-title{display:flex;align-items:center;gap:6px;padding:4px 10px;border-bottom:1px solid #cbd5e1;color:var(--vr-navy);background:#f1f5f9;font-size:10px;font-weight:800;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                .vr-section-title:before{content:'';width:3px;height:12px;border-radius:3px;background:#0891b2}
                .vr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0}
                .vr-info{min-height:36px;padding:4px 8px;border-bottom:1px solid #edf2f7;border-left:1px solid #edf2f7}.vr-info-wide{grid-column:1/-1}
                .vr-label{display:block;margin-bottom:2px;color:#64748b;font-size:8px;font-weight:700}.vr-value{display:block;color:#172033;font-size:9.5px;line-height:1.35;overflow-wrap:anywhere;white-space:pre-wrap}
                .vr-value.vr-danger{color:#b91c1c;font-weight:700}.vr-value.vr-success{color:#047857;font-weight:700}.vr-value.vr-money{color:#166534;font-size:11px;font-weight:700}
                .vr-photo{padding:4px 8px;text-align:center;background:#f8fafc}.vr-photo img{display:block;max-width:100%;max-height:170px;margin:auto;border:1px solid #cbd5e1;border-radius:6px;object-fit:contain}
                .vr-signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px;page-break-inside:avoid;break-inside:avoid}
                .vr-sign{min-height:48px;padding:5px;border:1px dashed #94a3b8;border-radius:6px;text-align:center;color:#64748b;font-size:8px}.vr-sign strong{display:block;margin-bottom:20px;color:#334155;font-size:9px}
                .vr-footnote{margin-top:4px;padding-top:3px;border-top:1px solid #e2e8f0;color:#64748b;text-align:center;font-size:7.5px}
                @media print {
                    @page { size: A4 portrait; margin: 6mm 8mm; }
                    html, body { background: #fff !important; height: auto !important; min-height: 0 !important; }
                    .report-wrapper { padding: 8px 12px !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; }
                    .report-header { padding-bottom: 6px !important; margin-bottom: 6px !important; }
                    .report-footer-unified { margin-top: 6px !important; padding-top: 4px !important; }
                    .vr-section, .vr-photo, .vr-signatures, .vr-banner { page-break-inside: avoid !important; break-inside: avoid !important; }
                }
            </style>
            <div class="violation-report">
                <div class="vr-banner">
                    <div><div class="vr-banner-title">${n?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641"}</div><div class="vr-banner-sub">\u0633\u062C\u0644 \u0631\u0633\u0645\u064A \u0645\u0648\u062B\u0642 \u0628\u0643\u0627\u0645\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</div></div>
                    <div class="vr-code"><small>\u0631\u0642\u0645 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</small><strong>${i(t.isoCode||t.id||"\u2014")}</strong></div>
                </div>

                <section class="vr-section">
                    <div class="vr-section-title">${n?"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0627\u0644\u0645\u062E\u0627\u0644\u0641":"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641"}</div>
                    <div class="vr-grid">
                        ${n?`
                            ${o("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644",t.contractorName)}
                            ${o("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644",t.contractorId)}
                            ${o("\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641",t.contractorWorker||t.employeeName||t.contractorName)}
                            ${o("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.contractorPosition)}
                            ${o("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",t.contractorDepartment)}
                            ${o("\u0646\u0648\u0639 \u0627\u0644\u0633\u062C\u0644","\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644")}
                        `:`
                            ${o("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",t.employeeName)}
                            ${o("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",t.employeeCode||t.employeeNumber)}
                            ${o("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.employeePosition)}
                            ${o("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",t.employeeDepartment)}
                        `}
                    </div>
                </section>

                <section class="vr-section">
                    <div class="vr-section-title">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div>
                    <div class="vr-grid">
                        ${o("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationType)}
                        ${o("\u0645\u0639\u0631\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationTypeId)}
                        ${o("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationDate?Utils.formatDate(t.violationDate):"\u2014")}
                        ${o("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationTime)}
                        ${o("\u0627\u0644\u0645\u0648\u0642\u0639",t.violationLocation)}
                        ${o("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0648\u0642\u0639",t.violationLocationId)}
                        ${o("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationPlace)}
                        ${o("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0643\u0627\u0646",t.violationPlaceId)}
                        ${o("\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629",t.severity,{accent:"vr-danger"})}
                        ${o("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.status,{accent:t.status==="\u0645\u062D\u0644\u0648\u0644"?"vr-success":"vr-danger"})}
                        ${o("\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0634\u0647\u0631",t.violationSequenceInMonth)}
                        ${o("\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",this.formatFineAmount(Number(this.getEffectiveFineAmount(t))),{accent:"vr-money"})}
                        ${t.violationDetails?o("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationDetails,{wide:!0}):""}
                        ${t.actionTaken?o("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630",t.actionTaken,{wide:!0}):""}
                    </div>
                </section>

                ${r?`<section class="vr-section"><div class="vr-section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div><div class="vr-photo"><img src="${i(r,"")}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" onerror="this.closest('.vr-section').style.display='none'"></div></section>`:""}

                <div class="vr-signatures">
                    <div class="vr-sign"><strong>\u0645\u0645\u062B\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u062E\u0627\u0644\u0641</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                </div>
                <div class="vr-footnote">\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A - \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${i(a(new Date().toISOString()))}</div>
            </div>`},_generateViolationPrintDocumentHtml(e,t){const i=this.normalizeViolationRecord(e)||e,a=this._buildViolationReportTableHtml(i),n=i.isoCode||`VIOL-${i.id?.substring(0,8)||"UNKNOWN"}`;if(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function")return FormHeader.generatePDFHTML(n,t,a,!1,!1,{version:"1.0",includeQRCode:!1,compactPdfFooter:!0},i.createdAt,i.updatedAt);const o=typeof AppState<"u"&&AppState.companySettings?.name?Utils.escapeHTML(AppState.companySettings.name):"";return`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${Utils.escapeHTML(t)}</title>
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;padding:24px;color:#111;} h1{font-size:1.25rem;margin:0 0 8px;} .co{color:#475569;font-size:0.9rem;margin-bottom:20px;white-space:nowrap;word-break:keep-all;overflow-wrap:normal;}
table{border-collapse:collapse;width:100%;} th,td{border:1px solid #e2e8f0;padding:10px 12px;text-align:right;font-size:0.95rem;} th{background:#f1f5f9;width:30%;color:#334155;}
</style></head><body>
<h1>${Utils.escapeHTML(t)}</h1>
${o?`<div class="co">${o}</div>`:""}
${a}
</body></html>`},async _completeViolationReportPrint(e){const t=new Blob([e],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(t),a=window.open(i,"_blank");if(!a)throw URL.revokeObjectURL(i),new Error("popup_blocked");await new Promise((n,o)=>{a.onload=()=>{try{const r=a.document.querySelectorAll("img");let l=0;const c=r.length;let s=!1;const d=()=>{s||(s=!0,setTimeout(()=>{a.print(),setTimeout(()=>URL.revokeObjectURL(i),1e3),n()},300))};if(c===0){d();return}const p=()=>{l>=c&&d()};r.forEach(f=>{f.complete?(l++,p()):(f.onload=()=>{l++,p()},f.onerror=()=>{l++,p()})}),setTimeout(()=>d(),3500)}catch(r){o(r)}}})},async printViolationProfessional(e){const t=AppState.appData?.violations?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show();const i=this._generateViolationPrintDocumentHtml(t,"\u0628\u0637\u0627\u0642\u0629 \u0645\u062E\u0627\u0644\u0641\u0629 \u2014 \u0646\u0633\u062E\u0629 \u0637\u0628\u0627\u0639\u0629");await this._completeViolationReportPrint(i)}catch(i){i&&i.message==="popup_blocked"?Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"):(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",i),Notification.error("\u0641\u0634\u0644 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(i.message||"")))}finally{Loading.hide()}},_safeViolationReportFilePart(e,t="\u0633\u062C\u0644"){return String(e||t).trim().replace(/[\u0000-\u001f<>:"/\\|?*]+/g,"_").replace(/\s+/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"")||t},_readViolationReportImageBlob_(e){return new Promise(t=>{if(!e||!String(e.type||"").toLowerCase().startsWith("image/")){t("");return}try{const i=new FileReader;i.onload=()=>t(typeof i.result=="string"?i.result:""),i.onerror=()=>t(""),i.readAsDataURL(e)}catch{t("")}})},async _resolveViolationReportPhoto_(e){const t=this.processPhoto(e);if(!t)return"";if(/^data:image\//i.test(t))return t;const i=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{canonical:t,displaySrc:t,needsProxy:!1,proxyFileId:""};if(i.needsProxy&&i.proxyFileId&&typeof Utils.fetchDriveImageDataUri=="function")try{const n=await Utils.fetchDriveImageDataUri(i.proxyFileId);if(n&&/^data:image\//i.test(n))return n}catch{}const a=i.canonical||t;if(/^(https?:|blob:)/i.test(a)&&typeof fetch=="function")try{const n=await fetch(a,{method:"GET",credentials:"omit",mode:"cors"});if(n.ok){const o=await this._readViolationReportImageBlob_(await n.blob());if(o)return o}}catch{}return a},async downloadViolationReport(e,t=null){const i=AppState.appData?.violations?.find(r=>r.id===e);if(!i)return Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),!1;const a=this.normalizeViolationRecord(i)||i,n=a.personType==="contractor"||!!a.contractorName,o=t?.innerHTML||"";try{t&&(t.disabled=!0,t.setAttribute("aria-busy","true"),t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),Loading.show();const r=n?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",l=await this._resolveViolationReportPhoto_(a.photo),c={...a,photo:l},s=this._generateViolationPrintDocumentHtml(c,r),d=n?a.contractorName||a.contractorWorker:a.employeeName,p=a.isoCode||a.id||"\u0633\u062C\u0644",f=a.violationDate?String(a.violationDate).slice(0,10):new Date().toISOString().slice(0,10),u=["\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629",this._safeViolationReportFilePart(d,n?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"),this._safeViolationReportFilePart(p),this._safeViolationReportFilePart(f)].join("_")+".pdf";if(!await this._downloadHtmlReportAsPdf(s,u))throw new Error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF");return Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),!0}catch(r){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF:",r),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+(r.message||"")),!1}finally{Loading.hide(),t&&(t.disabled=!1,t.removeAttribute("aria-busy"),t.innerHTML=o||'<i class="fas fa-file-download"></i>')}},async exportPDF(e,t=null){return this.downloadViolationReport(e,t)},async loadBlacklistDataAsync(){try{(typeof AppState>"u"||!AppState.appData)&&(AppState.appData={}),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]);const e=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,t=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";if(!e||!t){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Integration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637");return}const i=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Blacklist_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(n=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL:",n),{success:!1,data:[]}));let a=!1;if(i&&i.success&&Array.isArray(i.data)?(AppState.appData.blacklistRegister=i.data,a=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.data.length} \u0633\u062C\u0644 Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL`)):AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),a&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",e),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[])}},refreshBlacklistDisplay(){const e=document.getElementById("violations-tab-content");if(!(!e||!document.querySelector('.tab-btn.active[data-tab="blacklist"]')))try{const i=e.querySelector(".card-body");if(i){const o=i.querySelector(".grid.grid-cols-1")||i.querySelector(".grid")||i.querySelector('[class*="grid-cols"]');if(o&&o.parentElement)o.outerHTML=this.renderBlacklistStats();else{const r=i.querySelector("div > div.grid");r&&(r.outerHTML=this.renderBlacklistStats())}}const a=document.getElementById("blacklist-cards-container");a&&(a.innerHTML=this.renderBlacklistCards());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable()),this.setupBlacklistEventListeners()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 Blacklist:",i)}},renderBlacklistTab(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title">
                            <i class="fas fa-user-slash ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u2013 Blacklist
                        </h2>
                        <button id="blacklist-add-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 -->
                    ${this.renderBlacklistStats()}
                    
                    <!-- \u0643\u0631\u0648\u062A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->
                    <div id="blacklist-cards-container" class="mb-6">
                        ${this.renderBlacklistCards()}
                    </div>
                    
                    <!-- \u062C\u062F\u0648\u0644 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->
                    <div id="blacklist-table-container">
                        ${this.renderBlacklistTable()}
                    </div>
                </div>
            </div>
        `},renderBlacklistStats(){const e=AppState.appData?.blacklistRegister||[],t=e.length,i=new Date().getMonth(),a=new Date().getFullYear(),n=e.filter(l=>{if(!l.banDate)return!1;const c=new Date(l.banDate);return c.getMonth()===i&&c.getFullYear()===a}).length,o=new Set;e.forEach(l=>{l.factory&&l.location?o.add(`${l.factory} - ${l.location}`):l.factory?o.add(l.factory):l.location&&o.add(l.location)});const r=o.size;return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="stat-card blacklist-stat-card blacklist-stat-total" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: none; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-user-slash"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof t=="number"?t.toLocaleString("en-US"):t}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-month" style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); border: none; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.3), 0 2px 4px -1px rgba(234, 88, 12, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(234, 88, 12, 0.4), 0 4px 6px -2px rgba(234, 88, 12, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(234, 88, 12, 0.3), 0 2px 4px -1px rgba(234, 88, 12, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof n=="number"?n.toLocaleString("en-US"):n}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-details" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); border: none; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.3), 0 2px 4px -1px rgba(217, 119, 6, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(217, 119, 6, 0.4), 0 4px 6px -2px rgba(217, 119, 6, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(217, 119, 6, 0.3), 0 2px 4px -1px rgba(217, 119, 6, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${e.filter(l=>l.banReason&&l.banReason.length>50).length.toLocaleString("en-US")}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0639 \u062A\u0641\u0627\u0635\u064A\u0644</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-factory-location" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border: none; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(124, 58, 237, 0.4), 0 4px 6px -2px rgba(124, 58, 237, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-industry"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof r=="number"?r.toLocaleString("en-US"):r}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0627\u0644\u0645\u0635\u0646\u0639 - \u0627\u0644\u0645\u0648\u0642\u0639</p>
                    </div>
                </div>
            </div>
        `},getPhotoSource(e){return typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?Utils.extractImageSourceCandidate(e):e&&typeof e=="string"?e:""},normalizeGoogleDrivePhotoUrl(e){return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"?Utils.normalizeGoogleDriveImageUrl(e):String(e||"").trim()},processPhoto(e){if(typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"){const n=Utils.normalizeImageSource(e);if(n)return n}const t=this.getPhotoSource(e);if(!t)return null;let i=String(t).trim().replace(/^['"`]+|['"`]+$/g,"");if(!i)return null;if(i.startsWith("blob:"))return i;if(/^data:image\//i.test(i)){const n=i.indexOf(",");if(n===-1)return i.replace(/\s+/g,"");const o=i.slice(0,n).replace(/\s+/g,""),r=i.slice(n+1).replace(/\s+/g,"");return r?`${o},${r}`:null}if(/^https?:\/\//i.test(i))return this.normalizeGoogleDrivePhotoUrl(i);const a=i.replace(/\s+/g,"");return a.length>100&&/^[A-Za-z0-9+/=]+$/.test(a.substring(0,Math.min(120,a.length)))?"data:image/jpeg;base64,"+a:(AppState.debugMode,null)},_onBlacklistCardPhotoError(e){try{if(!e)return;e.onerror=null;const t=document.createElement("div");t.className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800",t.innerHTML='<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>',e.replaceWith(t)}catch{}},_onBlacklistTablePhotoError(e){try{if(!e)return;e.onerror=null,e.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}},_hydrateBlacklistDrivePhotos(){try{if(typeof Utils.hydrateDriveProxyImages!="function")return;const e=a=>{if(!a)return;const n=a.className||"";n.indexOf("blacklist-table-photo")!==-1?this._onBlacklistTablePhotoError(a):n.indexOf("blacklist-detail-photo")!==-1?this._onBlacklistTablePhotoError(a):n.indexOf("blacklist-form-photo")!==-1?this._onBlacklistTablePhotoError(a):this._onBlacklistCardPhotoError(a)},t=document.getElementById("blacklist-cards-container"),i=document.getElementById("blacklist-table");t&&Utils.hydrateDriveProxyImages(t,{onFetchFail:e}),i&&Utils.hydrateDriveProxyImages(i,{onFetchFail:e})}catch{}},renderBlacklistCards(){const e=AppState.appData?.blacklistRegister||[];return e.length===0?`
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    <p class="text-gray-400 text-sm mt-2">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F</p>
                </div>
            `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[...e].sort((i,a)=>{const n=new Date(i.banDate||i.createdAt||0);return new Date(a.banDate||a.createdAt||0)-n}).map(i=>{const a=this.processPhoto(i),n=a&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a):{canonical:a||"",displaySrc:a||"",needsProxy:!1,proxyFileId:""},o=n.canonical?n.displaySrc:"",r=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${a?`
                                            <img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629"${r}
                                                data-photo-url="${Utils.escapeHTML(a)}"
                                                class="blacklist-card-photo w-16 h-16 rounded-full object-cover border-2 border-red-200 dark:border-red-800 cursor-pointer shadow-sm"
                                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)"
                                                title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629"
                                                onerror="Violations._onBlacklistCardPhotoError(this)">
                                        `:`
                                            <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800">
                                                <i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>
                                            </div>
                                        `}
                                        <div>
                                            <h3 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${Utils.escapeHTML(i.fullName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h3>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">#${i.serialNumber||"-"}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button onclick="Violations.editBlacklistRecord('${i.id}')" 
                                            class="btn-icon btn-icon-warning text-xs" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="Violations.deleteBlacklistRecord('${i.id}')" 
                                            class="btn-icon btn-icon-danger text-xs" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-id-card text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(i.idNumber||"-")}</span>
                                    </div>
                                    ${i.job?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-briefcase text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(i.job)}</span>
                                    </div>
                                    `:""}
                                    ${i.contractor?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-building text-cyan-500 dark:text-cyan-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(i.contractor)}</span>
                                    </div>
                                    `:""}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-industry text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0645\u0635\u0646\u0639:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(i.factory||"-")}</span>
                                    </div>
                                    ${i.location?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-map-marker-alt text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0645\u0648\u0642\u0639:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(i.location)}</span>
                                    </div>
                                    `:""}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-calendar text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639:</span>
                                        <span class="font-semibold text-red-600 dark:text-red-400">${i.banDate?Utils.formatDate(i.banDate):"-"}</span>
                                    </div>
                                    ${i.banReason?`
                                    <div class="pt-2 border-t border-red-100 dark:border-red-900/50">
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639:</p>
                                        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">${Utils.escapeHTML(i.banReason)}</p>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                            <div class="bg-red-50 dark:bg-red-900/20 px-4 py-2 border-t border-red-100 dark:border-red-900/30 flex items-center justify-between text-xs">
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-edit ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(i.editor||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                                </span>
                                ${i.bannedBy?`
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-shield ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(i.bannedBy)}
                                </span>
                                `:""}
                            </div>
                        </div>
                    </div>
                `}).join("")}
            </div>
        `},async showBlacklistForm(e=null){const t=!!e;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",m)}const i=AppState.appData?.blacklistRegister||[],a=i.length>0?Math.max(...i.map(m=>parseInt(m.serialNumber)||0))+1:1,n=this.getSiteOptions(),o=n.map(m=>`<option value="${Utils.escapeHTML(m.name)}" data-site-id="${m.id}" ${e?.factory===m.name||e?.factoryId===m.id?"selected":""}>${Utils.escapeHTML(m.name)}</option>`).join(""),s=((AppState.appData?.formSettings||{}).departments||[]).map(m=>typeof m=="object"?m.name:m).filter(Boolean).map(m=>`<option value="${Utils.escapeHTML(m)}"></option>`).join(""),d=e?.factoryId||n.find(m=>m.name===e?.factory)?.id||"",p=d?this.getPlaceOptions(d).map(m=>`<option value="${Utils.escapeHTML(m.name)}" data-place-id="${m.id}" ${e?.location===m.name||e?.locationId===m.id?"selected":""}>${Utils.escapeHTML(m.name)}</option>`).join(""):'<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B --</option>',f=AppState.currentUser||{name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",email:""},u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-user-slash ml-2 text-red-600"></i>
                        ${t?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644":"\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderBlacklistFormContent(e,a,o,p,s,f)}
                </div>
            </div>
        `,document.body.appendChild(u),this.setupBlacklistFormInModal(u,e).catch(m=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C Blacklist:",m)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(u,{onFetchFail:m=>this._onBlacklistTablePhotoError(m)}),u.addEventListener("click",m=>{m.target===u&&u.remove()});const w=m=>{m.key==="Escape"&&document.body.contains(u)&&(u.remove(),document.removeEventListener("keydown",w))};document.addEventListener("keydown",w)},renderBlacklistFormContent(e,t,i,a,n,o){const r=!!e,l=this.processPhoto(e),c=l&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(l):{canonical:l||"",displaySrc:l||"",needsProxy:!1,proxyFileId:""},s=c.canonical?c.displaySrc:"",d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(c):"";return`
            <form id="blacklist-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644) -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                            \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
                        </label>
                        <input type="text" id="blacklist-serial" class="form-input" 
                            value="${r&&e.serialNumber||t}" 
                            readonly>
                    </div>

                    <!-- \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639 * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-calendar ml-2 text-red-600"></i>
                            \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639 *
                        </label>
                        <input type="date" id="blacklist-ban-date" required class="form-input" 
                            value="${e?.banDate?new Date(e.banDate).toISOString().slice(0,10):""}">
                    </div>

                    <!-- \u0627\u0644\u0645\u0635\u0646\u0639 * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-industry ml-2 text-gray-600"></i>
                            \u0627\u0644\u0645\u0635\u0646\u0639 *
                        </label>
                        <select id="blacklist-factory" required class="form-input">
                            <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                            ${i}
                        </select>
                    </div>

                    <!-- \u0627\u0644\u0645\u0648\u0642\u0639 * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-map-marker-alt ml-2 text-green-600"></i>
                            \u0627\u0644\u0645\u0648\u0642\u0639 *
                        </label>
                        <select id="blacklist-location" required class="form-input">
                            <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                            ${a}
                        </select>
                    </div>

                    <!-- \u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user ml-2 text-purple-600"></i>
                            \u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A *
                        </label>
                        <input type="text" id="blacklist-name" required class="form-input" 
                            value="${Utils.escapeHTML(e?.fullName||"")}" 
                            placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644">
                    </div>

                    <!-- \u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-id-card ml-2 text-orange-600"></i>
                            \u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 *
                        </label>
                        <input type="text" id="blacklist-id-number" required class="form-input" 
                            value="${Utils.escapeHTML(e?.idNumber||"")}" 
                            placeholder="\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629">
                    </div>

                    <!-- \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-briefcase ml-2 text-indigo-600"></i>
                            \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                        </label>
                        <input type="text" id="blacklist-job" class="form-input" 
                            value="${Utils.escapeHTML(e?.job||"")}" 
                            placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                    </div>

                    <!-- \u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644 -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2 text-cyan-600"></i>
                            \u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                        </label>
                        <input type="text" id="blacklist-contractor" class="form-input" 
                            list="blacklist-contractors-list" 
                            value="${Utils.escapeHTML(e?.contractor||"")}" 
                            placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629/\u0627\u0644\u0645\u0642\u0627\u0648\u0644">
                        <datalist id="blacklist-contractors-list">
                            <!-- \u0633\u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
                        </datalist>
                    </div>

                    <!-- \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627 -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2 text-teal-600"></i>
                            \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627
                        </label>
                        <input type="text" id="blacklist-department" class="form-input" 
                            list="blacklist-departments-list" 
                            value="${Utils.escapeHTML(e?.department||"")}" 
                            placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629">
                        <datalist id="blacklist-departments-list">
                            ${n}
                        </datalist>
                    </div>

                    <!-- \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639 -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user-shield ml-2 text-yellow-600"></i>
                            \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639
                        </label>
                        <input type="text" id="blacklist-banned-by" class="form-input" 
                            value="${Utils.escapeHTML(e?.bannedBy||"")}" 
                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639">
                    </div>

                    <!-- \u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user-edit ml-2 text-gray-600"></i>
                            \u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </label>
                        <input type="text" id="blacklist-editor" class="form-input" 
                            value="${Utils.escapeHTML(e?.editor||o.name)}" 
                            readonly>
                    </div>

                    <!-- \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-image ml-2"></i>
                            \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629
                        </label>
                        <input type="file" id="blacklist-photo-input" accept="image/*" class="form-input">
                        <div id="blacklist-photo-preview" class="mt-2 ${l?"":"hidden"}">
                            <img src="${s?Utils.escapeHTML(s):""}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${d}
                                class="blacklist-form-photo w-32 h-32 object-cover rounded border" id="blacklist-photo-img">
                            <button type="button" onclick="const blPhotoInput = document.getElementById('blacklist-photo-input'); if (blPhotoInput) blPhotoInput.value=''; const blPhotoPreview = document.getElementById('blacklist-photo-preview'); if (blPhotoPreview) blPhotoPreview.classList.add('hidden');" 
                                class="mt-2 text-sm text-red-600 hover:text-red-800">
                                <i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629
                            </button>
                        </div>
                    </div>

                    <!-- \u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639 * -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-exclamation-triangle ml-2 text-red-600"></i>
                            \u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639 *
                        </label>
                        <textarea id="blacklist-ban-reason" required class="form-input" rows="3" 
                            placeholder="\u0633\u0628\u0628 \u0645\u0646\u0639 \u0627\u0644\u062F\u062E\u0648\u0644">${Utils.escapeHTML(e?.banReason||"")}</textarea>
                    </div>

                    <!-- \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629 -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-sticky-note ml-2 text-gray-600"></i>
                            \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629
                        </label>
                        <textarea id="blacklist-notes" class="form-input" rows="3" 
                            placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-4 pt-4 border-t">
                    <button type="button" id="blacklist-cancel-btn" class="btn-secondary">
                        <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" id="blacklist-submit-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>${r?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644"}
                    </button>
                </div>
            </form>
        `},async setupBlacklistFormInModal(e,t){const i=!!t,a=e.querySelector("#blacklist-form");a&&(a.dataset.editId=i?t.id:""),a&&a.addEventListener("submit",s=>this.handleBlacklistSubmit(s));const n=e.querySelector("#blacklist-cancel-btn");n&&n.addEventListener("click",()=>{e.remove()});const o=e.querySelector("#blacklist-photo-input");o&&o.addEventListener("change",s=>this.handleBlacklistPhotoUpload(s));const r=e.querySelector("#blacklist-contractor"),l=e.querySelector("#blacklist-contractors-list");if(r&&l)try{let s=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(s=Contractors.getAllContractorsForModules()||[]),s.length===0){const d=[...AppState.appData?.approvedContractors||[],...AppState.appData?.contractors||[]].filter(f=>f&&f.isActive!=="inactive"&&f.isActive!==!1&&f.isActive!=="false"&&f.isActive!=="FALSE");s=Array.from(new Map(d.map(f=>[f.id||f.contractorId,f])).values()).filter(f=>f&&(f.name||f.companyName||f.contractorName)).map(f=>({id:f.id||f.contractorId||"",name:(f.name||f.companyName||f.contractorName||"").trim()})).filter(f=>f.name&&f.name!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641").sort((f,u)=>f.name.localeCompare(u.name,"ar",{sensitivity:"base"}))}if(l.innerHTML=s.map(d=>`<option value="${Utils.escapeHTML(d.name)}" data-contractor-id="${d.id||""}"></option>`).join(""),t?.contractor){const d=t.contractor.split(" - ")[0].trim();r.value=d}}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",s)}const c=e.querySelector("#blacklist-factory");if(c&&(c.addEventListener("change",async s=>{const d=s.target.selectedOptions[0],p=d?.dataset.siteId||d?.value;await this.loadBlacklistPlaces(p)}),i&&t?.factoryId)){const s=t.factoryId;try{await this.loadBlacklistPlaces(s),setTimeout(()=>{const d=e.querySelector("#blacklist-location");d&&t?.location&&(d.value=t.location)},100)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",d)}}},renderBlacklistTable(){const t=[...AppState.appData?.blacklistRegister||[]].sort((i,a)=>{const n=new Date(i.banDate||i.createdAt||0);return new Date(a.banDate||a.createdAt||0)-n});return t.length===0?`
                <div class="mt-6">
                    <div class="empty-state">
                        <i class="fas fa-user-slash text-gray-400 text-4xl mb-4"></i>
                        <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    </div>
                </div>
            `:`
            <div class="mt-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">
                        <i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644
                    </h3>
                    <div class="flex items-center gap-2">
                        <input type="text" id="blacklist-search" class="form-input" 
                            placeholder="\u0628\u062D\u062B..." style="width: 250px;">
                        <button id="blacklist-export-pdf" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>PDF
                        </button>
                        <button id="blacklist-export-excel" class="btn-secondary">
                            <i class="fas fa-file-excel ml-2"></i>Excel
                        </button>
                    </div>
                </div>
                <div class="table-wrapper" style="overflow-x: auto;">
                    <table class="data-table" id="blacklist-table">
                        <thead>
                            <tr>
                        <th>\u0645</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</th>
                        <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                        <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                        <th>\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</th>
                        <th>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</th>
                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                        <th>\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                        <th>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</th>
                        <th>\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</th>
                        <th>\u0627\u0644\u0635\u0648\u0631\u0629</th>
                        <th>\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</th>
                        <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody id="blacklist-table-body">
                            ${t.map(i=>{const a=this.processPhoto(i),n=a&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a):{canonical:a||"",displaySrc:a||"",needsProxy:!1,proxyFileId:""},o=n.canonical?n.displaySrc:"",r=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
                                <tr>
                                    <td>${i.serialNumber||"-"}</td>
                                    <td>${i.banDate?Utils.formatDate(i.banDate):"-"}</td>
                                    <td>${Utils.escapeHTML(i.factory||"-")}</td>
                                    <td>${Utils.escapeHTML(i.location||"-")}</td>
                                    <td>${Utils.escapeHTML(i.fullName||"-")}</td>
                                    <td>${Utils.escapeHTML(i.idNumber||"-")}</td>
                                    <td>${Utils.escapeHTML(i.job||"-")}</td>
                                    <td>${Utils.escapeHTML(i.contractor||"-")}</td>
                                    <td>${Utils.escapeHTML(i.department||"-")}</td>
                                    <td>${Utils.escapeHTML(i.bannedBy||"-")}</td>
                                    <td>${Utils.escapeHTML(i.editor||"-")}</td>
                                    <td>
                                        ${a?`<img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629"${r} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
                                                data-photo-url="${Utils.escapeHTML(a)}"
                                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)" title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629"
                                                onerror="Violations._onBlacklistTablePhotoError(this)">`:"-"}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(i.banReason||"")}">
                                        ${Utils.escapeHTML((i.banReason||"-").substring(0,50))}${(i.banReason||"").length>50?"...":""}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(i.notes||"")}">
                                        ${Utils.escapeHTML((i.notes||"-").substring(0,30))}${(i.notes||"").length>30?"...":""}
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="Violations.viewBlacklistDetails('${i.id}')" 
                                                class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="Violations.editBlacklistRecord('${i.id}')" 
                                                class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="Violations.deleteBlacklistRecord('${i.id}')" 
                                                class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `},async setupBlacklistEventListeners(){setTimeout(async()=>{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",l)}const e=document.getElementById("blacklist-form");if(e&&!e.closest(".modal-overlay")){const l=e.cloneNode(!0);e.parentNode.replaceChild(l,e),l.addEventListener("submit",c=>this.handleBlacklistSubmit(c))}const t=document.getElementById("blacklist-photo-input");t&&!t.closest(".modal-overlay")&&t.addEventListener("change",l=>this.handleBlacklistPhotoUpload(l));const i=document.getElementById("blacklist-search");if(i){const l=i.cloneNode(!0);i.parentNode.replaceChild(l,i),l.addEventListener("input",c=>this.filterBlacklistTable(c.target.value))}const a=document.getElementById("blacklist-add-btn");a?a.dataset.listenerAttached?AppState.debugMode&&Utils.safeLog('\u2139\uFE0F \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0645\u0631\u0628\u0648\u0637 \u0645\u0633\u0628\u0642\u0627\u064B'):(a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();try{this.showBlacklistForm()}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C Blacklist:",c),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}}),a.dataset.listenerAttached="true",AppState.debugMode&&Utils.safeLog('\u2705 \u062A\u0645 \u0631\u0628\u0637 \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0628\u0646\u062C\u0627\u062D')):AppState.debugMode&&Utils.safeWarn('\u26A0\uFE0F \u0632\u0631 "blacklist-add-btn" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM');const n=document.getElementById("blacklist-factory");n&&!n.closest(".modal-overlay")&&n.addEventListener("change",async l=>{const c=l.target.selectedOptions[0],s=c?.dataset.siteId||c?.value;await this.loadBlacklistPlaces(s)});const o=document.getElementById("blacklist-export-pdf");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("click",()=>this.exportBlacklistToPDF())}const r=document.getElementById("blacklist-export-excel");if(r){const l=r.cloneNode(!0);r.parentNode.replaceChild(l,r),l.addEventListener("click",()=>this.exportBlacklistToExcel())}this._hydrateBlacklistDrivePhotos()},100)},async handleBlacklistSubmit(e){e.preventDefault();const t=e.target,i=!!t.dataset.editId;let a=i&&AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.photo||"";const n=t.closest(".modal-overlay"),o=n?n.querySelector("#blacklist-photo-input"):document.getElementById("blacklist-photo-input");if(o?.files?.[0]){const f=o.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}try{a=await this.convertImageToBase64(f)}catch(u){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",u)}}const r=n?n.querySelector("#blacklist-factory"):document.getElementById("blacklist-factory"),l=n?n.querySelector("#blacklist-location"):document.getElementById("blacklist-location"),c=r?.selectedOptions[0],s=l?.selectedOptions[0],d=f=>(n?n.querySelector(`#${f}`):document.getElementById(f))?.value||"",p={id:t.dataset.editId||Utils.generateId("BLACKLIST"),serialNumber:d("blacklist-serial"),factory:r?.value||"",factoryId:c?.dataset.siteId||"",location:l?.value||"",locationId:s?.dataset.placeId||"",fullName:d("blacklist-name"),idNumber:d("blacklist-id-number"),photo:a,job:d("blacklist-job"),contractor:(d("blacklist-contractor")||"").trim().split(" - ")[0],department:d("blacklist-department"),banReason:d("blacklist-ban-reason"),banDate:d("blacklist-ban-date"),bannedBy:d("blacklist-banned-by"),editor:d("blacklist-editor"),notes:d("blacklist-notes"),createdAt:i?AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(a&&a.startsWith("data:"))try{const f=await GoogleIntegration.uploadFileToDrive?.(a,`blacklist_${p.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");f?.success&&(f.directLink||f.shareableLink)?(p.photo=f.directLink||f.shareableLink,AppState.debugMode):(AppState.debugMode,Notification.warning("\u0641\u0634\u0644 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649 Drive. \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0624\u0642\u062A\u0627\u064B."))}catch(f){AppState.debugMode&&Utils.safeWarn("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",f),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+f.message)}await this.saveBlacklistRecord(p,i)},async saveBlacklistRecord(e,t){Loading.show();try{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),t){const r=AppState.appData.blacklistRegister.findIndex(l=>l.id===e.id);r!==-1?AppState.appData.blacklistRegister[r]=e:AppState.appData.blacklistRegister.push(e)}else AppState.appData.blacklistRegister.push(e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(r){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",r),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D`);const i=document.querySelector(".modal-overlay");i&&i.querySelector("#blacklist-form")&&i.remove();const a=document.getElementById("blacklist-cards-container");a&&(a.innerHTML=this.renderBlacklistCards(),this.setupBlacklistEventListeners());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable(),this.setupBlacklistEventListeners());const o=document.querySelector("#violations-tab-content .card-body");if(o){const r=o.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");r&&(r.outerHTML=this.renderBlacklistStats())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644: "+i.message)}},handleBlacklistPhotoUpload(e){const t=e.target.files?.[0];if(!t)return;const i=new FileReader;i.onload=a=>{const n=document.querySelector(".modal-overlay"),o=n?n.querySelector("#blacklist-photo-preview"):document.getElementById("blacklist-photo-preview"),r=n?n.querySelector("#blacklist-photo-img"):document.getElementById("blacklist-photo-img");o&&r&&(r.src=a.target.result,o.classList.remove("hidden"))},i.readAsDataURL(t)},async loadBlacklistPlaces(e){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.querySelector(".modal-overlay"),i=t?t.querySelector("#blacklist-location"):document.getElementById("blacklist-location");if(!i)return;i.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',this.getPlaceOptions(e).forEach(n=>{const o=document.createElement("option");o.value=n.name,o.dataset.placeId=n.id,o.textContent=n.name,i.appendChild(o)})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t)}},filterBlacklistTable(e){const t=document.getElementById("blacklist-table-body");if(!t)return;const i=t.querySelectorAll("tr"),a=e.toLowerCase();i.forEach(n=>{const o=n.textContent.toLowerCase();n.style.display=o.includes(a)?"":"none"})},editBlacklistRecord(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showBlacklistForm(t)},async deleteBlacklistRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData?.blacklistRegister&&(AppState.appData.blacklistRegister=AppState.appData.blacklistRegister.filter(i=>i.id!==e)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",i),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn.active[data-tab="blacklist"]')&&await this.switchTab("blacklist")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",t),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+t.message)}}},viewBlacklistPhoto(e){if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629");return}const t=this.processPhoto(e);if(!t){Notification.error("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}const i=n=>{const o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="width: 100%; max-height: 70vh; object-fit: contain;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23666%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                </div>
            </div>
        `,document.body.appendChild(o)},a=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{needsProxy:!1,proxyFileId:""};if(a.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function"){Utils.fetchDriveImageDataUri(a.proxyFileId).then(n=>{n?i(n):Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}).catch(()=>Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"));return}i(t)},viewBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(l=>l.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t),a=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},n=a.canonical?a.displaySrc:"",o=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(a):"",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-user-slash ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="blacklist-details-content">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.serialNumber||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</label>
                            <p class="text-gray-800">${t.banDate?Utils.formatDate(t.banDate):"-"}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.factory||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.location||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.fullName||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.idNumber||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.job||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.contractor||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.department||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.bannedBy||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.editor||"-")}</p>
                        </div>
                        ${t.createdAt?`
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</label>
                            <p class="text-gray-800">${Utils.formatDateTime(t.createdAt)}</p>
                        </div>
                        `:""}
                        ${t.updatedAt?`
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</label>
                            <p class="text-gray-800">${Utils.formatDateTime(t.updatedAt)}</p>
                        </div>
                        `:""}
                    </div>
                    ${i?`
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</label>
                        <div class="flex justify-center">
                            <img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${o}
                                class="blacklist-detail-photo max-w-xs max-h-64 object-cover rounded-lg cursor-pointer border-2 border-gray-200"
                                data-photo-url="${Utils.escapeHTML(i)}"
                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)"
                                title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u062D\u062C\u0645 \u0643\u0627\u0645\u0644"
                                onerror="Violations._onBlacklistTablePhotoError(this)">
                        </div>
                    </div>
                    `:""}
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</label>
                        <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">${Utils.escapeHTML(t.banReason||"-")}</p>
                    </div>
                    ${t.notes?`
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">${Utils.escapeHTML(t.notes)}</p>
                    </div>
                    `:""}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="Violations.printBlacklistDetails('${e}')">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("violations.blacklist"):""}
                    <button type="button" class="btn-warning" onclick="Violations.editBlacklistRecord('${e}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    <button type="button" class="btn-danger" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F')) { Violations.deleteBlacklistRecord('${e}'); this.closest('.modal-overlay').remove(); }">
                        <i class="fas fa-trash ml-2"></i>\u062D\u0630\u0641
                    </button>
                    <button type="button" class="btn-primary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(r),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(r,{moduleKey:"violations.blacklist",record:{...t,name:t.fullName||"",nationalId:t.idNumber||"",reason:t.banReason||"",date:t.banDate||t.createdAt||""},recordId:t.id||e||""}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(r,{onFetchFail:l=>this._onBlacklistTablePhotoError(l)})},printBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t);try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const a=`BLACKLIST-${(t.id||t.serialNumber||"UNKNOWN").substring(0,12)}`,n="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Details",o=`
                <div class="summary-grid">
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</span>
                        <span class="summary-value">${Utils.escapeHTML(t.serialNumber||"-")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</span>
                        <span class="summary-value">${t.banDate?Utils.formatDate(t.banDate):"-"}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0645\u0635\u0646\u0639</span>
                        <span class="summary-value">${Utils.escapeHTML(t.factory||"-")}</span>
                    </div>
                    <div class="summary-card">
                        <span class="summary-label">\u0627\u0644\u0645\u0648\u0642\u0639</span>
                        <span class="summary-value">${Utils.escapeHTML(t.location||"-")}</span>
                    </div>
                </div>

                <div class="section-title">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639</div>
                <table class="report-table">
                    <tr>
                        <th style="width: 30%;">\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</th>
                        <td>${Utils.escapeHTML(t.fullName||"-")}</td>
                    </tr>
                    <tr>
                        <th>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</th>
                        <td>${Utils.escapeHTML(t.idNumber||"-")}</td>
                    </tr>
                    <tr>
                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                        <td>${Utils.escapeHTML(t.job||"-")}</td>
                    </tr>
                    <tr>
                        <th>\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                        <td>${Utils.escapeHTML(t.contractor||"-")}</td>
                    </tr>
                    <tr>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                        <td>${Utils.escapeHTML(t.department||"-")}</td>
                    </tr>
                </table>

                ${i?`
                <div class="section-title">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</div>
                <div style="text-align: center; margin: 20px 0;">
                    <img src="${Utils.escapeHTML(i)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="max-width: 300px; max-height: 400px; border: 2px solid #ddd; border-radius: 8px; object-fit: contain;" 
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22300%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                </div>
                `:""}

                <div class="section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u0639</div>
                <table class="report-table">
                    <tr>
                        <th style="width: 30%;">\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</th>
                        <td style="white-space: pre-wrap;">${Utils.escapeHTML(t.banReason||"-")}</td>
                    </tr>
                    ${t.notes?`
                    <tr>
                        <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        <td style="white-space: pre-wrap;">${Utils.escapeHTML(t.notes)}</td>
                    </tr>
                    `:""}
                    <tr>
                        <th>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</th>
                        <td>${Utils.escapeHTML(t.bannedBy||"-")}</td>
                    </tr>
                    <tr>
                        <th>\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</th>
                        <td>${Utils.escapeHTML(t.editor||"-")}</td>
                    </tr>
                    ${t.createdAt?`
                    <tr>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                        <td>${Utils.formatDateTime(t.createdAt)}</td>
                    </tr>
                    `:""}
                    ${t.updatedAt?`
                    <tr>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</th>
                        <td>${Utils.formatDateTime(t.updatedAt)}</td>
                    </tr>
                    `:""}
                </table>
            `,r=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(a,n,o,!1,!0,{version:"1.0",releaseDate:t.createdAt||new Date().toISOString(),revisionDate:t.updatedAt||t.createdAt||new Date().toISOString(),"\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A":t.serialNumber||t.id||"",qrData:{type:"Blacklist",id:t.id,serialNumber:t.serialNumber}},t.createdAt||new Date().toISOString(),t.updatedAt||t.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${n}</title></head><body>${o}</body></html>`,l=new Blob([r],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(l),s=window.open(c,"_blank");s?s.onload=()=>{setTimeout(()=>{s.print(),setTimeout(()=>{URL.revokeObjectURL(c),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:",a),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+a.message)}},async exportBlacklistToPDF(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF..."),typeof window.jsPDF<"u")try{const{jsPDF:o}=window.jsPDF,r=new o("l","mm","a4");r.setFontSize(18),r.text("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Register",150,15,{align:"center"}),r.setFontSize(10),r.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${Utils.formatDateTime(new Date().toISOString())}`,14,22),r.text(`\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,14,27);const l=e.map(s=>[s.serialNumber||"-",s.banDate?Utils.formatDate(s.banDate):"-",Utils.escapeHTML(s.factory||"-"),Utils.escapeHTML(s.location||"-"),Utils.escapeHTML(s.fullName||"-"),Utils.escapeHTML(s.idNumber||"-"),Utils.escapeHTML(s.job||"-"),Utils.escapeHTML(s.contractor||"-"),Utils.escapeHTML(s.department||"-"),Utils.escapeHTML(s.bannedBy||"-"),Utils.escapeHTML(s.banReason||"-").substring(0,50)]);if(typeof r.autoTable<"u")r.autoTable({head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0634\u0631\u0643\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639"]],body:l,startY:35,styles:{fontSize:7,font:"Arial",cellPadding:2},headStyles:{fillColor:[59,130,246],textColor:255,fontSize:8},alternateRowStyles:{fillColor:[245,247,250]},margin:{left:14,right:14},overflow:"linebreak"});else{let s=35;l.forEach((d,p)=>{s>180&&(r.addPage(),s=20),r.setFontSize(8),r.text(`${p+1}. ${d[4]} - ${d[3]}`,14,s),s+=7})}const c=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.pdf`;r.save(c),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF \u0628\u0646\u062C\u0627\u062D");return}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 jsPDF\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0637\u0631\u064A\u0642\u0629 HTML:",o)}const t=`
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <title>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</title>
    <style>
        @media print {
            @page { margin: 1cm; size: A4 landscape; }
            body { margin: 0; }
            .no-print { display: none !important; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #003865;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #003865;
            font-size: 24px;
            margin-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: right;
        }
        th {
            background: #3b82f6;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background: #f5f7fa;
        }
        .print-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 24px;
            background: #003865;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <button class="print-btn no-print" onclick="window.print()">
        <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629
    </button>
    <div class="header">
        <h1>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Register</h1>
        <p>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${Utils.formatDateTime(new Date().toISOString())} | \u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>\u0645</th>
                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</th>
                <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                <th>\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</th>
                <th>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</th>
                <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                <th>\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                <th>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</th>
                <th>\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</th>
                <th>\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</th>
                <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
            </tr>
        </thead>
        <tbody>
            ${e.map(o=>`
                <tr>
                    <td>${Utils.escapeHTML(o.serialNumber||"-")}</td>
                    <td>${o.banDate?Utils.formatDate(o.banDate):"-"}</td>
                    <td>${Utils.escapeHTML(o.factory||"-")}</td>
                    <td>${Utils.escapeHTML(o.location||"-")}</td>
                    <td>${Utils.escapeHTML(o.fullName||"-")}</td>
                    <td>${Utils.escapeHTML(o.idNumber||"-")}</td>
                    <td>${Utils.escapeHTML(o.job||"-")}</td>
                    <td>${Utils.escapeHTML(o.contractor||"-")}</td>
                    <td>${Utils.escapeHTML(o.department||"-")}</td>
                    <td>${Utils.escapeHTML(o.bannedBy||"-")}</td>
                    <td>${Utils.escapeHTML(o.editor||"-")}</td>
                    <td>${Utils.escapeHTML((o.banReason||"-").substring(0,100))}</td>
                    <td>${Utils.escapeHTML((o.notes||"-").substring(0,50))}</td>
                </tr>
            `).join("")}
        </tbody>
    </table>
</body>
</html>`,i=new Blob([t],{type:"text/html;charset=utf-8"}),a=URL.createObjectURL(i),n=window.open(a,"_blank");n?n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(a),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportBlacklistToExcel(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel..."),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS");return}const t=e.map(l=>({\u0645:l.serialNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639":l.banDate?Utils.formatDate(l.banDate):"",\u0627\u0644\u0645\u0635\u0646\u0639:l.factory||"",\u0627\u0644\u0645\u0648\u0642\u0639:l.location||"","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A":l.fullName||"","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629":l.idNumber||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:l.job||"","\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644":l.contractor||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:l.department||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639":l.bannedBy||"","\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":l.editor||"","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639":l.banReason||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:l.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":l.createdAt?Utils.formatDateTime(l.createdAt):"","\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":l.updatedAt?Utils.formatDateTime(l.updatedAt):""})),i=XLSX.utils.book_new(),a=XLSX.utils.json_to_sheet(t),n=[{wch:8},{wch:12},{wch:15},{wch:15},{wch:25},{wch:15},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:40},{wch:40},{wch:18},{wch:18}];a["!cols"]=n,XLSX.utils.book_append_sheet(i,a,"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646");const r=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof Violations<"u"&&(window.Violations=Violations,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Violations module loaded and available on window.Violations"))}catch{if(typeof window<"u"&&typeof Violations<"u")try{window.Violations=Violations}catch{}}})();
