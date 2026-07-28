const Violations={_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const i=e||document.getElementById("viol-analytics-root");i&&(typeof t.applyI18n=="function"&&t.applyI18n(i),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(i))},currentFilters:{search:"",personType:"",violationType:"",severity:"",status:""},parseFineAmount(e){if(e==null||e==="")return 0;if(typeof e=="number")return Number.isFinite(e)&&e>=0?e:0;const t="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",i="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",o=r=>String(r||"").replace(/[٠-٩۰-۹]/g,l=>{const c=t.indexOf(l);if(c>=0)return String(c);const d=i.indexOf(l);return d>=0?String(d):l}),n=String(e).trim(),a=o(n).replace(/[,\u066C]/g,"").replace(/\u066B/g,".").replace(/[^\d.\-]/g,""),s=Number(a);return Number.isFinite(s)&&s>=0?s:0},_VIOL_CURRENCY_KEY:"viol_currency",_VIOL_RATE_KEY:"viol_exchange_rate",_VIOL_DEFAULT_RATE:50,getCurrentCurrency(){try{return localStorage.getItem(this._VIOL_CURRENCY_KEY)==="USD"?"USD":"EGP"}catch{return"EGP"}},setCurrentCurrency(e){const t=e==="USD"?"USD":"EGP";try{localStorage.setItem(this._VIOL_CURRENCY_KEY,t)}catch{}return t},getExchangeRate(){try{const e=parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));return Number.isFinite(e)&&e>0?e:this._VIOL_DEFAULT_RATE}catch{return this._VIOL_DEFAULT_RATE}},setExchangeRate(e){const t=parseFloat(e);if(!Number.isFinite(t)||t<=0)return!1;try{localStorage.setItem(this._VIOL_RATE_KEY,String(t))}catch{}return!0},convertFineAmount(e,t){const i=t||this.getCurrentCurrency(),o=Number(e)||0;if(i==="USD"){const n=this.getExchangeRate();return n>0?o/n:0}return o},formatFineAmount(e,t={}){const i=t.currency||this.getCurrentCurrency(),o=i==="USD"?"$":"\u062C.\u0645",n=this.convertFineAmount(e,i),a=i==="USD"?n.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):n.toLocaleString("ar-EG",{maximumFractionDigits:0});return i==="USD"?`${a} $`:`${a} ${o}`},getCurrencyLabel(e="short"){return this.getCurrentCurrency()==="USD"?e==="long"?this._t("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):"$":e==="long"?this._t("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"):this._t("module.violations.analytics.currency.egp_short","\u062C.\u0645")},normalizeViolationRecord(e){if(!e||typeof e!="object")return null;const t=e.fineAmount??e.defaultFineAmount??e.fine_amount??e.fine??e.amount??e["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"]??e["\u0642\u064A\u0645\u0629 \u0645\u0627\u0644\u064A\u0629"]??0,i=this.parseFineAmount(t),o=e.personType||(e.contractorName?"contractor":"employee");return{...e,personType:o,fineAmount:i}},_escapeIdForHandler(e){return JSON.stringify(e==null?"":String(e))},getEffectiveFineAmount(e){const t=this.normalizeViolationRecord(e);if(!t)return 0;const i=this.parseFineAmount(t.fineAmount);if(i>0)return i;let o=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll&&(ViolationTypesManager.ensureInitialized(),o=ViolationTypesManager.getAll()||[])}catch{o=[]}!o.length&&typeof AppState<"u"&&Array.isArray(AppState?.appData?.violationTypes)&&(o=AppState.appData.violationTypes);const n=String(t.violationTypeId||"").trim(),a=String(t.violationType||"").trim().toLowerCase();let s=0;if(n){const r=o.find(l=>l&&String(l.id)===n);r&&(s=this.parseFineAmount(r.fineAmount))}if(s<=0&&a){const r=o.find(l=>l&&String(l.name||"").trim().toLowerCase()===a);r&&(s=this.parseFineAmount(r.fineAmount))}return s>0?s:i},_normKeyStr(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},sameViolationPersonForSequence(e,t){const i=this._normKeyStr(e.personType)||"employee",o=this._normKeyStr(t.personType)||"employee";if(i!==o)return!1;if(i==="contractor"){const s=this._normKeyStr(e.contractorName),r=this._normKeyStr(t.contractorName);if(!s||!r||s!==r)return!1;const l=this._normKeyStr(e.contractorWorker),c=this._normKeyStr(t.contractorWorker);return!l&&!c?!0:l===c}const n=this._normKeyStr(e.employeeCode||e.employeeNumber),a=this._normKeyStr(t.employeeCode||t.employeeNumber);return!!n&&n===a},getViolationYearMonthKey(e){const t=new Date(e);return isNaN(t.getTime())?null:t.getFullYear()*12+t.getMonth()},_violApprovalSettingsCache:null,_violApprovalSettingsCacheAt:0,_violApprovalRequestsCache:null,_violApprovalRequestsCacheAt:0,_violApprovalRequestsCacheKey:"",async getViolationApprovalSettings(){const e=Date.now();if(this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5)return this._violApprovalSettingsCache;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const t=await GoogleIntegration.sendRequest({action:"getViolationApprovalSettings",data:{__timeoutMs:2e4}});if(t&&t.success&&t.data)return this._violApprovalSettingsCache={requireApproval:t.data.requireApproval===!0,defaultApprovers:Array.isArray(t.data.defaultApprovers)?t.data.defaultApprovers:[],bypassRoles:Array.isArray(t.data.bypassRoles)?t.data.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]},this._violApprovalSettingsCacheAt=e,this._violApprovalSettingsCache}}catch(t){AppState.debugMode&&Utils.safeWarn("getViolationApprovalSettings:",t)}return{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},isCurrentUserBypassApproval(e){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState.currentUser?.role||"";if(Array.isArray(e)&&e.length>0){const i=String(t).toLowerCase();return e.some(o=>String(o).toLowerCase()===i||String(o)===t)}}catch{}return!1},async checkViolationApprovalGate(e,t={}){const i=await this.getViolationApprovalSettings();return!i||!i.requireApproval?{requiresApproval:!1,settings:i}:this.isCurrentUserBypassApproval(i.bypassRoles)?{requiresApproval:!1,settings:i,bypassed:!0}:!Array.isArray(i.defaultApprovers)||i.defaultApprovers.length===0?(AppState.debugMode&&Utils.safeWarn("approval required but no approvers configured \u2014 allowing direct save"),{requiresApproval:!1,settings:i,reason:"no_approvers"}):{requiresApproval:!0,settings:i}},async submitViolationForApproval(e,t={}){try{const o=((await this.getViolationApprovalSettings()).defaultApprovers||[]).slice(),n=AppState.currentUser||{},a={requestType:t.isEdit?"update":"add",violationData:e,originalViolationId:t.originalId||"",approvers:o,createdBy:n.id||n.email||"",createdByName:n.name||n.email||"",notes:t.notes||""};return await GoogleIntegration.sendRequest({action:"addViolationApprovalRequest",data:{...a,__timeoutMs:3e4}})||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"}}catch(i){return{success:!1,message:i?.message||String(i)}}},async fetchViolationApprovalRequests(e={}){try{const t=await GoogleIntegration.sendRequest({action:"getAllViolationApprovalRequests",data:{...e,__timeoutMs:25e3}});return t&&t.success&&Array.isArray(t.data)?t.data:[]}catch(t){return AppState.debugMode&&Utils.safeWarn("fetchViolationApprovalRequests:",t),[]}},async approveViolationRequest(e,t={}){const i=AppState.currentUser||{},o={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const n=await GoogleIntegration.sendRequest({action:"approveViolationApprovalRequest",data:{requestId:e,approver:o,notes:t.notes||"",force:t.force===!0,__timeoutMs:3e4}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async rejectViolationRequest(e,t){const i=AppState.currentUser||{},o={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const n=await GoogleIntegration.sendRequest({action:"rejectViolationApprovalRequest",data:{requestId:e,approver:o,reason:String(t||"").trim(),__timeoutMs:3e4}});return this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async saveViolationApprovalSettings(e){const t=AppState.currentUser||{};try{const i=await GoogleIntegration.sendRequest({action:"updateViolationApprovalSettings",data:{requireApproval:e.requireApproval===!0,defaultApprovers:Array.isArray(e.defaultApprovers)?e.defaultApprovers:[],bypassRoles:Array.isArray(e.bypassRoles)?e.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"],updatedBy:t.id||t.email||"",updatedByName:t.name||"",__timeoutMs:25e3}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),i||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(i){return{success:!1,message:i?.message||String(i)}}},_getViolationApprovalRequestsCacheKey(e,t){return e?"admin":String(t?.email||t?.id||"user")},_getCachedViolationApprovalRequests(e,t){const i=this._getViolationApprovalRequestsCacheKey(e,t),o=Date.now();return this._violApprovalRequestsCache&&this._violApprovalRequestsCacheKey===i&&o-this._violApprovalRequestsCacheAt<12e4?this._violApprovalRequestsCache:null},_setCachedViolationApprovalRequests(e,t,i){this._violApprovalRequestsCache=Array.isArray(e)?e:[],this._violApprovalRequestsCacheKey=this._getViolationApprovalRequestsCacheKey(t,i),this._violApprovalRequestsCacheAt=Date.now()},_invalidateViolationApprovalRequestsCache(){this._violApprovalRequestsCache=null,this._violApprovalRequestsCacheAt=0,this._violApprovalRequestsCacheKey=""},_cloneViolationApprovalSettings(e){const t=e||{};return{requireApproval:t.requireApproval===!0,defaultApprovers:Array.isArray(t.defaultApprovers)?t.defaultApprovers.map(i=>({...i})):[],bypassRoles:Array.isArray(t.bypassRoles)?[...t.bypassRoles]:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_getViolationApprovalSettingsSnapshot(){const e=Date.now();return this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5?this._cloneViolationApprovalSettings(this._violApprovalSettingsCache):{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_prefetchViolationApprovalPanelData(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i={userEmail:e?"":t.email||"",userId:e?"":t.id||""};Promise.all([this.getViolationApprovalSettings(),this.fetchViolationApprovalRequests(i)]).then(([,o])=>{this._setCachedViolationApprovalRequests(o,e,t)}).catch(()=>{})},_buildViolationApprovalsSettingsHtml(e,t,i){if(!t)return"";const o=e||{requireApproval:!1,defaultApprovers:[]};return`
                    <div id="viol-approvals-settings-panel" style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:18px;">
                        <h4 style="margin:0 0 12px 0;color:#991b1b;font-size:1rem;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-cog"></i> \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F (\u0644\u0644\u0645\u062F\u064A\u0631)
                        </h4>
                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:14px;">
                            <input type="checkbox" id="viol-require-approval" ${o.requireApproval?"checked":""}
                                   style="width:18px;height:18px;cursor:pointer;">
                            <span style="font-weight:600;color:#374151;">\u062A\u0641\u0639\u064A\u0644 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                        </label>

                        <div style="margin-bottom:12px;">
                            <label style="display:block;font-weight:600;color:#374151;margin-bottom:6px;">\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u0639\u064A\u064E\u0651\u0646\u0648\u0646:</label>
                            <div id="viol-approvers-list" style="display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;min-height:48px;">
                                ${(o.defaultApprovers||[]).map((n,a)=>`
                                    <span data-approver-idx="${a}" style="background:#dbeafe;color:#1e40af;padding:5px 10px;border-radius:20px;font-size:0.85rem;display:inline-flex;align-items:center;gap:6px;">
                                        <i class="fas fa-user"></i>
                                        ${Utils.escapeHTML(n.userName||n.userEmail||n.userId||"?")}
                                        <button type="button" class="viol-remove-approver" data-idx="${a}" style="background:none;border:none;color:#dc2626;cursor:pointer;padding:0;font-size:14px;">\xD7</button>
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
            </div>`;const t=(e.requests||[]).filter(i=>i.status==="pending");return this._renderViolationApprovalRequests(t,{isAdmin:e.isAdmin})},_refreshViolationApprovalsModalBody(e,t){const i=(t.requests||[]).filter(s=>s.status==="pending").length,o=e.querySelector("#viol-approval-pending-count");o&&(o.textContent=t.loading?"...":String(i));const n=e.querySelector("#viol-approvals-settings-panel");if(n&&t.isAdmin){const s=document.createElement("div");s.innerHTML=this._buildViolationApprovalsSettingsHtml(t.settings,!0,t.allUsers);const r=s.firstElementChild;r&&n.replaceWith(r)}const a=e.querySelector("#viol-approval-requests-list");if(a){const s=e.querySelector(".viol-req-filter.viol-req-filter-active")?.getAttribute("data-filter")||"pending",r=s==="all"?t.requests||[]:(t.requests||[]).filter(l=>l.status===s);a.innerHTML=t.loading?this._buildViolationApprovalsRequestsHtml(t):this._renderViolationApprovalRequests(r,{isAdmin:t.isAdmin}),this._wireViolationApprovalActions(e,t.isAdmin)}},async _loadViolationApprovalsPanelData(e,t){try{const[i,o]=await Promise.all([this.fetchViolationApprovalRequests(t.filters),this.getViolationApprovalSettings()]);if(!e.isConnected)return;t.requests=Array.isArray(i)?i:[],t.settings=this._cloneViolationApprovalSettings(o),t.loading=!1,this._setCachedViolationApprovalRequests(t.requests,t.isAdmin,AppState.currentUser||{}),this._refreshViolationApprovalsModalBody(e,t),this._wireViolationApprovalActions(e,t.isAdmin)}catch(i){if(!e.isConnected)return;t.loading=!1;const o=e.querySelector("#viol-approval-requests-list");o&&(o.innerHTML=`<div style="text-align:center;padding:24px;color:#dc2626;background:#fef2f2;border-radius:10px;">
                    <i class="fas fa-exclamation-circle"></i> \u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u2014 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                </div>`),AppState.debugMode&&Utils.safeWarn("_loadViolationApprovalsPanelData:",i)}},_bindViolationApprovalsModalEvents(e){if(e._violApprovalsEventsBound)return;e._violApprovalsEventsBound=!0;const t=()=>e._violApprovalState;e.addEventListener("click",i=>{if(i.target.closest("#viol-approvals-close")){e.remove();return}const o=i.target.closest(".viol-remove-approver");if(o){const a=parseInt(o.getAttribute("data-idx"),10),s=t();if(!s||isNaN(a))return;s.settings.defaultApprovers.splice(a,1),this._refreshViolationApprovalsModalBody(e,s);return}const n=i.target.closest(".viol-req-filter");if(n){const a=t();if(!a)return;e.querySelectorAll(".viol-req-filter").forEach(c=>c.classList.remove("viol-req-filter-active")),n.classList.add("viol-req-filter-active");const s=n.getAttribute("data-filter"),r=s==="all"?a.requests:a.requests.filter(c=>c.status===s),l=e.querySelector("#viol-approval-requests-list");l&&(l.innerHTML=a.loading?this._buildViolationApprovalsRequestsHtml(a):this._renderViolationApprovalRequests(r,{isAdmin:a.isAdmin}),this._wireViolationApprovalActions(e,a.isAdmin));return}if(i.target.closest("#viol-add-approver-btn")){const a=t();if(!a)return;const s=e.querySelector("#viol-add-approver-select"),r=s?.value;if(!r){Notification.warning("\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B");return}const l=s.options[s.selectedIndex],c={userId:r,userName:l?.dataset?.name||"",userEmail:l?.dataset?.email||"",role:l?.dataset?.role||""};if(a.settings.defaultApprovers.some(d=>d.userId===c.userId)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0636\u0627\u0641 \u0628\u0627\u0644\u0641\u0639\u0644");return}a.settings.defaultApprovers.push(c),this._refreshViolationApprovalsModalBody(e,a);return}if(i.target.closest("#viol-save-settings-btn")){const a=t();if(!a)return;const s=i.target.closest("#viol-save-settings-btn");if(s.disabled)return;s.disabled=!0;const l={requireApproval:e.querySelector("#viol-require-approval")?.checked===!0,defaultApprovers:a.settings.defaultApprovers,bypassRoles:a.settings.bypassRoles};this.saveViolationApprovalSettings(l).then(c=>{s.disabled=!1,c&&c.success?(a.settings=this._cloneViolationApprovalSettings(l),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error(c&&c.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}).catch(()=>{s.disabled=!1})}})},showViolationApprovalsManager(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i=(AppState.appData?.users||[]).filter(c=>c&&(c.email||c.id||c.name)),o={userEmail:e?"":t.email||"",userId:e?"":t.id||""},n=this._getCachedViolationApprovalRequests(e,t),a={settings:this._getViolationApprovalSettingsSnapshot(),requests:n||[],isAdmin:e,allUsers:i,filters:o,loading:!n},s=document.getElementById("viol-approvals-manager-modal");s&&s.remove();const r=document.createElement("div");r.id="viol-approvals-manager-modal",r.className="modal modal-open",r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:24px;overflow:auto;";const l=a.loading?"...":String(a.requests.filter(c=>c.status==="pending").length);r.innerHTML=`
            <div style="background:#fff;border-radius:14px;max-width:1100px;width:100%;max-height:92vh;overflow:auto;box-shadow:0 20px 50px rgba(0,0,0,0.3);">
                <div style="background:linear-gradient(135deg,#991b1b,#7f1d1d);color:#fff;padding:18px 22px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-clipboard-check" style="font-size:22px;"></i>
                        <h3 style="margin:0;font-size:1.15rem;">\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                    </div>
                    <button type="button" id="viol-approvals-close" style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;color:#fff;width:36px;height:36px;cursor:pointer;font-size:18px;">\xD7</button>
                </div>

                <div id="viol-approvals-modal-body" style="padding:18px 22px;">
                    ${this._buildViolationApprovalsSettingsHtml(a.settings,e,i)}

                    <div>
                        <h4 style="margin:0 0 12px 0;color:#374151;font-size:1rem;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-list-ul"></i> \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                            <span id="viol-approval-pending-count" style="background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:12px;font-size:0.75rem;">${l}</span>
                            <span style="font-size:0.75rem;color:#94a3b8;font-weight:400;">\u0645\u0639\u0644\u064E\u0651\u0642\u0629</span>
                        </h4>
                        <div style="display:flex;gap:8px;margin-bottom:12px;">
                            <button type="button" class="viol-req-filter viol-req-filter-active" data-filter="pending" style="background:#fbbf24;color:#78350f;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">\u0645\u0639\u0644\u064E\u0651\u0642\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="approved" style="background:#dcfce7;color:#166534;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0645\u0639\u062A\u0645\u062F\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="rejected" style="background:#fee2e2;color:#991b1b;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0645\u0631\u0641\u0648\u0636\u0629</button>
                            <button type="button" class="viol-req-filter" data-filter="all" style="background:#e5e7eb;color:#374151;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">\u0627\u0644\u0643\u0644</button>
                        </div>
                        <div id="viol-approval-requests-list">
                            ${this._buildViolationApprovalsRequestsHtml(a)}
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(r),r._violApprovalState=a,r._violApprovalsEventsBound=!1,this._bindViolationApprovalsModalEvents(r),a.loading||this._wireViolationApprovalActions(r,e),this._loadViolationApprovalsPanelData(r,a)},_renderViolationApprovalRequests(e,t={}){return!e||e.length===0?'<div style="text-align:center;padding:24px;color:#94a3b8;background:#f9fafb;border-radius:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':e.map(i=>{const o=i.violationData||{},n=o.employeeName||o.contractorName||"\u2014",a={pending:'<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u0644\u064E\u0651\u0642</span>',approved:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u062A\u0645\u062F</span>',committed:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0633\u062C\u064E\u0651\u0644</span>',rejected:'<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0631\u0641\u0648\u0636</span>'}[i.status]||`<span style="background:#e5e7eb;color:#374151;padding:3px 10px;border-radius:12px;font-size:0.75rem;">${i.status}</span>`,s=i.createdAt?new Date(i.createdAt).toLocaleString("ar-EG",{dateStyle:"short",timeStyle:"short"}):"\u2014",r=Array.isArray(i.approvers)?i.approvers:[],l=parseInt(i.currentApproverIndex,10)||0,c=i.status==="pending"&&t.isAdmin;return`
                <div data-request-id="${Utils.escapeHTML(String(i.id))}" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <div>
                            <div style="font-weight:700;color:#374151;font-size:0.95rem;">${Utils.escapeHTML(n)} \u2014 ${Utils.escapeHTML(o.violationType||"\u2014")}</div>
                            <div style="font-size:0.78rem;color:#6b7280;margin-top:3px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ${Utils.escapeHTML(String(i.id))} \u2022 \u0623\u064F\u0646\u0634\u0626: ${s} \u2022 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(i.createdByName||i.createdBy||"\u2014")}</div>
                        </div>
                        ${a}
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;font-size:0.82rem;color:#4b5563;background:#f9fafb;padding:10px;border-radius:8px;margin-bottom:10px;">
                        <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(o.violationLocation||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0634\u062F\u0629:</strong> ${Utils.escapeHTML(o.severity||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${o.violationDate?new Date(o.violationDate).toLocaleDateString("ar-EG"):"\u2014"}</div>
                        <div><strong>\u0627\u0644\u063A\u0631\u0627\u0645\u0629:</strong> ${o.fineAmount?Number(o.fineAmount).toLocaleString("ar-EG")+" \u062C.\u0645":"\u2014"}</div>
                    </div>
                    ${r.length>0?`
                        <div style="font-size:0.78rem;color:#6b7280;margin-bottom:8px;">
                            <strong>\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646:</strong>
                            ${r.map((d,p)=>`
                                <span style="background:${d.approved?"#dcfce7":p===l?"#fef3c7":"#f3f4f6"};color:${d.approved?"#166534":p===l?"#92400e":"#6b7280"};padding:2px 8px;border-radius:10px;margin-right:4px;">
                                    ${d.approved?"\u2713":p===l?"\u23F3":"\u25CB"} ${Utils.escapeHTML(d.userName||d.userEmail||"?")}
                                </span>
                            `).join("")}
                        </div>
                    `:""}
                    ${i.rejectionReason?`<div style="background:#fef2f2;border-right:3px solid #dc2626;padding:8px 10px;border-radius:6px;font-size:0.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</strong> ${Utils.escapeHTML(i.rejectionReason)}</div>`:""}
                    ${c?`
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
            `}).join("")},_wireViolationApprovalActions(e,t){e.querySelectorAll(".viol-req-approve-btn").forEach(i=>{i.addEventListener("click",async()=>{const o=i.getAttribute("data-id");if(!o)return;i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F...';const n=await this.approveViolationRequest(o,{force:t});if(n&&n.success){Notification.success(n.message||"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager();try{this.load&&this.load()}catch{}}else Notification.error(n&&n.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),i.disabled=!1,i.innerHTML='<i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F'})}),e.querySelectorAll(".viol-req-reject-btn").forEach(i=>{i.addEventListener("click",async()=>{const o=i.getAttribute("data-id");if(!o)return;const n=(window.prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:")||"").trim();if(!n){Notification.warning("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0625\u0644\u0632\u0627\u0645\u064A");return}i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0636...';const a=await this.rejectViolationRequest(o,n);a&&a.success?(Notification.success(a.message||"\u062A\u0645 \u0627\u0644\u0631\u0641\u0636"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager()):(Notification.error(a&&a.message||"\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636"),i.disabled=!1,i.innerHTML='<i class="fas fa-times"></i> \u0631\u0641\u0636')})})},countPriorViolationsSamePersonMonth(e,t){const i=this.getViolationYearMonthKey(e.violationDate);if(i==null)return 0;const o=AppState.appData.violations||[];let n=0;for(let a=0;a<o.length;a++){const s=o[a];!s||t&&String(s.id)===String(t)||this.getViolationYearMonthKey(s.violationDate)===i&&this.sameViolationPersonForSequence(e,s)&&n++}return n},refreshViolationSequenceBadgeInModal(e,t){const i=e&&e.querySelector?e.querySelector("#violation-sequence-info"):null,o=e&&e.querySelector?e.querySelector("#violation-sequence-text"):null;if(!i||!o)return;const n=document.getElementById("violation-person-type")?.value,a=document.getElementById("violation-date")?.value;if(!n||!a){i.classList.add("hidden");return}const s={personType:n,violationDate:`${a}T12:00:00`};if(n==="employee"){if(s.employeeCode=document.getElementById("violation-employee-code")?.value.trim()||"",!s.employeeCode){i.classList.add("hidden");return}}else{const c=document.getElementById("violation-contractor-select");if(s.contractorName=(c?.value||"").trim(),s.contractorWorker=document.getElementById("violation-contractor-worker")?.value.trim()||"",!s.contractorName){i.classList.add("hidden");return}}const l=this.countPriorViolationsSamePersonMonth(s,t)+1;o.textContent=l<=1?"\u0623\u0648\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 (\u064A\u064F\u062D\u0633\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0648\u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631).":`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${l} \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635.`,i.classList.remove("hidden")},_violationsImportNormalizeHeaderKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationsImportPick(e,t){const i={};Object.keys(e||{}).forEach(o=>{i[this._violationsImportNormalizeHeaderKey(o)]=e[o]});for(let o=0;o<t.length;o++){const n=this._violationsImportNormalizeHeaderKey(t[o]);if(i[n]!==void 0&&i[n]!==null&&String(i[n]).trim()!=="")return i[n]}return""},downloadViolationsImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u063A\u0631\u0627\u0645\u0629"],t=["\u0645\u0648\u0638\u0641","12345","","","","\u062A\u0623\u062E\u0631 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","2026-05-01","08:30","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 1","\u0645\u062A\u0648\u0633\u0637\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631","\u0625\u0646\u0630\u0627\u0631 \u0634\u0641\u0647\u064A","100"],i=XLSX.utils.book_new(),o=XLSX.utils.aoa_to_sheet([e,t]);o["!cols"]=e.map(()=>({wch:18})),XLSX.utils.book_append_sheet(i,o,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const n=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],['\u2022 \u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635: \u0627\u0643\u062A\u0628 "\u0645\u0648\u0638\u0641" \u0623\u0648 "\u0645\u0642\u0627\u0648\u0644".'],["\u2022 \u0644\u0644\u0645\u0648\u0638\u0641: \u0639\u0628\u0651\u0626 \u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629."],["\u2022 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0639\u0628\u0651\u0626 \u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u0628\u0626\u0629 \u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644."],["\u2022 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 \u062A\u0646\u0633\u064A\u0642 \u062A\u0627\u0631\u064A\u062E \u0625\u0643\u0633\u0644."]],a=XLSX.utils.aoa_to_sheet(n);XLSX.utils.book_append_sheet(i,a,"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(i,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},showViolationsImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
            </div>`,document.body.appendChild(e);let t=[];const i=e.querySelector("#violations-import-file"),o=e.querySelector("#violations-import-preview"),n=e.querySelector("#violations-import-confirm");e.querySelector("#violations-import-download-template")?.addEventListener("click",()=>this.downloadViolationsImportTemplate()),i?.addEventListener("change",async a=>{const s=a.target.files&&a.target.files[0];if(t=[],n.disabled=!0,o.classList.add("hidden"),!!s){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const r=await s.arrayBuffer(),l=XLSX.read(r,{type:"array"}),c=l.Sheets[l.SheetNames[0]],d=XLSX.utils.sheet_to_json(c,{defval:""});t=Array.isArray(d)?d:[],o.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xAB${Utils.escapeHTML(l.SheetNames[0]||"")}\xBB.</p>`,o.classList.remove("hidden"),n.disabled=t.length===0}catch(r){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",r),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(r.message||""))}}}),n?.addEventListener("click",async()=>{t.length&&(n.disabled=!0,await this.processViolationsImportRows(t,e))}),e.addEventListener("click",a=>{a.target===e&&e.remove()})},async processViolationsImportRows(e,t){let i=0,o=0;const n=[];Array.isArray(AppState.appData.violations)||(AppState.appData.violations=[]);let a=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),a=ViolationTypesManager.getAll()}catch{a=AppState.appData.violationTypes||[]}else a=AppState.appData.violationTypes||[];const s=new Map((a||[]).map(l=>[String(l.name||"").trim().toLowerCase(),l])),r=new Set;for(let l=0;l<e.length;l++){const c=e[l]||{},d=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim();d&&!s.has(d.toLowerCase())&&r.add(d)}if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.addType&&ViolationTypesManager.getTypeByName)try{ViolationTypesManager.ensureInitialized(),r.forEach(l=>{const c=l.toLowerCase();try{const d=ViolationTypesManager.addType({name:l,description:"",fineAmount:0});s.set(c,d)}catch{const p=ViolationTypesManager.getTypeByName(l);p&&s.set(c,p)}})}catch(l){Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641:",l)}for(let l=0;l<e.length;l++){const c=e[l]||{};try{const p=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635","personType","persontype"])||"").trim().toLowerCase(),f=p.includes("\u0645\u0642\u0627\u0648\u0644")||p==="contractor"?"contractor":"employee",m=String(this._violationsImportPick(c,["\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","employeeCode","employeenumber","employeeNumber"])||"").trim(),$=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641","employeeName"])||"").trim(),b=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorName"])||"").trim(),z=String(this._violationsImportPick(c,["\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorWorker"])||"").trim(),A=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim(),_=this._violationsImportPick(c,["\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationDate","date"]),L=String(this._violationsImportPick(c,["\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationTime","time"])||"08:00"),I=String(this._violationsImportPick(c,["\u0627\u0644\u0645\u0648\u0642\u0639","violationLocation","location"])||"").trim(),N=String(this._violationsImportPick(c,["\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationPlace","place"])||"").trim(),R=String(this._violationsImportPick(c,["\u0627\u0644\u0634\u062F\u0629","severity"])||"\u0645\u062A\u0648\u0633\u0637\u0629").trim(),F=String(this._violationsImportPick(c,["\u0627\u0644\u062D\u0627\u0644\u0629","status"])||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").trim(),V=String(this._violationsImportPick(c,["\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","violationDetails","details"])||"").trim(),O=String(this._violationsImportPick(c,["\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","actionTaken","action"])||"").trim(),W=this._violationsImportPick(c,["\u0627\u0644\u063A\u0631\u0627\u0645\u0629","fineAmount","fine"]);if(!A||!_){o++,n.push(`\u0635\u0641 ${l+2}: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0646\u0627\u0642\u0635`);continue}if(f==="employee"&&!m){o++,n.push(`\u0635\u0641 ${l+2}: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641`);continue}if(f==="contractor"&&!b){o++,n.push(`\u0635\u0641 ${l+2}: \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628`);continue}let B=_;if(typeof B=="number"&&typeof XLSX<"u"&&XLSX.SSF)try{const E=XLSX.SSF.parse_date_code(B);E&&(B=new Date(Date.UTC(E.y,E.m-1,E.d)).toISOString())}catch{}else if(typeof B=="string"&&/^\d{4}-\d{2}-\d{2}/.test(B.trim()))B=new Date(B.trim().slice(0,10)+"T12:00:00").toISOString();else{const E=new Date(B);B=isNaN(E.getTime())?new Date().toISOString():E.toISOString()}const T=s.get(A.toLowerCase()),j=T?String(T.id||""):"",Q=this.parseFineAmount(W!==""&&W!==void 0?W:T?T.fineAmount:0),ot={personType:f,violationDate:B,employeeCode:m,employeeNumber:m,employeeName:$,contractorName:b,contractorWorker:z},Z=this.countPriorViolationsSamePersonMonth(ot,null)+1,v={id:Utils.generateId("VIOLATION"),isoCode:typeof generateISOCode=="function"?generateISOCode("VIOL",AppState.appData.violations):"VIOL-"+Date.now()+"-"+l,personType:f,employeeId:f==="employee"?Utils.generateId("EMP"):"",employeeName:f==="employee"?$:"",employeeCode:f==="employee"?m:"",employeeNumber:f==="employee"?m:"",employeePosition:"",employeeDepartment:"",contractorId:"",contractorName:f==="contractor"?b:"",contractorWorker:f==="contractor"?z:"",contractorPosition:"",contractorDepartment:"",violationTypeId:j,violationType:A,fineAmount:Q,violationDate:B,violationTime:L.length>=5?L.slice(0,5):"08:00",violationLocation:I,violationLocationId:I,violationPlace:N,violationPlaceId:N,violationDetails:V,severity:R||"\u0645\u062A\u0648\u0633\u0637\u0629",actionTaken:O,status:F||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",photo:"",violationSequenceInMonth:Z,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.violations.push(this.normalizeViolationRecord(v)),i++}catch(d){o++,n.push(`\u0635\u0641 ${l+2}: ${d.message||d}`)}}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(GoogleIntegration.autoSave("Violations",AppState.appData.violations).catch(()=>{Notification.warning("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A \u0644\u0627\u062D\u0642\u0627\u064B.")}),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureViolationsTypeIds)try{ViolationTypesManager.ensureViolationsTypeIds()}catch{}t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u062E\u0627\u0644\u0641\u0629${o?` (\u062A\u062E\u0637\u064A ${o})`:""}.`),n.length&&n.length<=5?n.forEach(l=>Utils.safeWarn(l)):n.length&&Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+n.slice(0,5).join(" | ")+" ..."),this.load()},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u"){const t=document.getElementById("violations-section");t&&(t.innerHTML=`
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
                `;return}if(AppState.appData||(AppState.appData={}),AppState.appData.violations||(AppState.appData.violations=[]),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized)try{ViolationTypesManager.ensureInitialized()}catch(l){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 ViolationTypesManager:",l)}else(!AppState.appData.violationTypes||!Array.isArray(AppState.appData.violationTypes))&&(AppState.appData.violationTypes=[]);const t=Array.isArray(AppState.appData.violations)&&AppState.appData.violations.length>0,i=(()=>{try{return localStorage.getItem("violations_last_sync")}catch{return null}})(),o=i?Date.now()-parseInt(i,10):1/0,n=600*1e3,a=o>=n,s=typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets,r=AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl;if(!t&&s&&r)try{await this.ensureViolationsCoreDataLoaded({force:!0})}catch{}else a&&t&&s&&r&&this.ensureViolationsCoreDataLoaded({force:!0}).then(()=>{try{const l=document.getElementById("violations-stats-cards");l&&(l.outerHTML=this.renderAllViolationsStats());const c=document.getElementById("violations-list");c&&(c.innerHTML=this.renderViolationsList());const d=document.getElementById("violations-filters-container");d&&(d.innerHTML=this.renderFilters()),this.bindFilters()}catch{}});e.innerHTML=`
            <div class="section-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 16px; padding: 24px 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(220, 38, 38, 0.25);">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div class="text-center w-full" style="flex-grow: 1; min-width: 200px;">
                        <h1 class="section-title" style="color: white; font-size: 2rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-exclamation-triangle ml-3" style="font-size: 1.8rem;"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A
                        </h1>
                        <p class="section-subtitle" style="color: rgba(255,255,255,0.9); font-size: 1rem; margin: 0;">\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap gap-2 justify-center">
                        <button type="button" id="add-violation-btn" class="btn-primary" style="background: white; color: #dc2626; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                            <i class="fas fa-plus ml-2"></i>
                            \u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629
                        </button>
                        <button type="button" id="viol-approvals-btn" onclick="Violations.showViolationApprovalsManager()" style="background: rgba(255,255,255,0.18); color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 12px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" title="\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <!-- Tabs Navigation -->
                <div class="tabs-container mb-4">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="all" onclick="Violations.switchTab('all')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-list ml-2"></i>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A
                        </button>
                        <button class="tab-btn" data-tab="employees" onclick="Violations.switchTab('employees')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-tie ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                        </button>
                        <button class="tab-btn" data-tab="contractors" onclick="Violations.switchTab('contractors')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-users-cog ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </button>
                        <button class="tab-btn" data-tab="analytics" onclick="Violations.switchTab('analytics')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-chart-bar ml-2"></i>\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </button>
                        <button class="tab-btn" data-tab="blacklist" onclick="Violations.switchTabAsync('blacklist')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-slash ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u2013 Blacklist
                        </button>
                        <button id="violations-btn-refresh" type="button" class="tab-btn" onclick="Violations.refreshModule()" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B
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
        `,this.setupEventListeners(),this._prefetchViolationApprovalPanelData(),Promise.resolve(this.ensureViolationsCoreDataLoaded({force:!1})).then(()=>{try{const l=document.getElementById("violations-stats-cards");l&&(l.outerHTML=this.renderAllViolationsStats());const c=document.getElementById("violations-list");c&&(c.innerHTML=this.renderViolationsList());const d=document.getElementById("violations-filters-container");d&&(d.innerHTML=this.renderFilters())}catch{}}).catch(()=>{})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",t),e.innerHTML=`
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
            `}},async ensureViolationsCoreDataLoaded({force:e=!1}={}){return this._violationsCoreLoadPromise&&!e?this._violationsCoreLoadPromise:(this._violationsCoreLoadPromise=(async()=>{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl))return;const[i,o]=await Promise.all([GoogleIntegration.readFromSheets("Violations").catch(()=>null),GoogleIntegration.readFromSheets("ViolationTypes").catch(()=>null)]);if(Array.isArray(i)){const n=i.map(c=>this.normalizeViolationRecord(c)).filter(Boolean),a=Array.isArray(AppState.appData.violations)?AppState.appData.violations:[],s=new Set(n.map(c=>c&&c.id).filter(Boolean)),r=Date.now()-300*1e3,l=a.filter(c=>!c||!c.id||s.has(c.id)?!1:new Date(c.createdAt||c.timestamp||0).getTime()>=r);AppState.appData.violations=l.length>0?[...l,...n]:n}if(Array.isArray(o)){const n=Array.isArray(AppState.appData.violationTypes)?AppState.appData.violationTypes:[];if(o.length>0?AppState.appData.violationTypes=o:n.length===0&&(AppState.appData.violationTypes=[]),o.length>0||o.length===0&&n.length===0)try{AppState.syncMeta||(AppState.syncMeta={sheets:{},users:0,lastSyncTime:0,userEmail:null}),AppState.syncMeta.sheets||(AppState.syncMeta.sheets={}),AppState.syncMeta.sheets.ViolationTypes=Date.now()}catch{}}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized()}catch{}try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}})().finally(()=>{this._violationsCoreLoadPromise=null}),this._violationsCoreLoadPromise)},renderViolationsList(){try{const e=this.getFilteredViolations();return!e||e.length===0?`<div class="empty-state"><p class="text-gray-500">${this.hasActiveFilters()?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629"}</p></div>`:`
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
            `}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A renderViolationsList:",e),'<div class="empty-state"><p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}},updateAllViolationsStats(){try{const e=document.getElementById("violations-stats-cards");if(!e)return;const t=document.createElement("div");t.innerHTML=this.renderAllViolationsStats();const i=t.querySelector("#violations-stats-cards");i&&e.replaceWith(i)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A:",e)}},renderAllViolationsStats(){const e=this.getFilteredViolations(),t=e.length,i=e.filter(a=>a&&(a.personType==="employee"||!!a.employeeName&&!a.contractorName)).length,o=e.filter(a=>a&&(a.personType==="contractor"||!!a.contractorName)).length,n=e.reduce((a,s)=>{const r=Number(s?.fineAmount||0);return a+(Number.isFinite(r)&&r>0?r:0)},0);return`
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
                            <p class="text-2xl font-bold text-orange-700">${o}</p>
                        </div>
                        <i class="fas fa-users-cog text-orange-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `},hasActiveFilters(){const e=this.currentFilters||{};return!!(e.search||e.personType||e.violationType||e.severity||e.status)},getFilteredViolations(){try{if(typeof AppState>"u"||!AppState.appData)return[];const e=(AppState.appData.violations||[]).map(l=>{const c=this.normalizeViolationRecord(l);if(!c)return null;const d=this.getEffectiveFineAmount(c);return d===c.fineAmount?c:{...c,fineAmount:d}}).filter(Boolean),t=this.currentFilters||{},i=String(t.search||"").trim().toLowerCase(),o=t.personType||"",n=(t.violationType||"").toLowerCase(),a=t.severity||"",s=t.status||"";let r=[];if(i&&typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"){const l=[...AppState?.appData?.approvedContractors||[],...AppState?.appData?.contractors||[]].filter(Boolean),c=Utils.findApprovedContractorByTerm(i,l);r=(c.matches&&c.matches.length>0?c.matches:c.contractor?[c.contractor]:[]).map(p=>Utils.buildContractorIdentityMatcher(p,i))}return e.filter(l=>{if(!l||o==="employee"&&!l.employeeName&&l.personType!=="employee"||o==="contractor"&&!l.contractorName&&!l.contractorCode&&!l.contractorId&&l.personType!=="contractor"||n&&(l.violationType||"").trim().toLowerCase()!==n||a&&(l.severity||"")!==a||s&&(l.status||"")!==s)return!1;if(i){let c=!1;if(r.length>0&&r.some(d=>d.violationBelongsToContractor(l))&&(c=!0),c||(c=Object.values(l||{}).map(p=>String(p??"").toLowerCase()).join(" ").includes(i)),!c)return!1}return!0})}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A getFilteredViolations:",e),[]}},renderFilters(e=""){const t=this.currentFilters||{};e&&(t.personType=e);let i=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),i=ViolationTypesManager.getAll()}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",n),i=[]}else i=typeof AppState<"u"&&AppState?.appData?.violationTypes?AppState.appData.violationTypes:[];const o=i.map(n=>`
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
                            ${o}
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
        `},bindFilters(){const e=document.getElementById("violations-filter-search"),t=document.getElementById("violations-filter-person"),i=document.getElementById("violations-filter-type"),o=document.getElementById("violations-filter-severity"),n=document.getElementById("violations-filter-status"),a=document.getElementById("violations-filter-reset");e&&(e.value=this.currentFilters.search||"",e.oninput=()=>{this.currentFilters.search=e.value||"",this.refreshViolationsView({skipFilterRerender:!0})}),t&&(t.value=this.currentFilters.personType||"",t.onchange=()=>{this.currentFilters.personType=t.value,this.refreshViolationsView()}),i&&(i.value=this.currentFilters.violationType||"",i.onchange=()=>{this.currentFilters.violationType=i.value,this.refreshViolationsView()}),o&&(o.value=this.currentFilters.severity||"",o.onchange=()=>{this.currentFilters.severity=o.value,this.refreshViolationsView()}),n&&(n.value=this.currentFilters.status||"",n.onchange=()=>{this.currentFilters.status=n.value,this.refreshViolationsView()}),a&&(a.onclick=()=>{this.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""},this.refreshViolationsView()})},refreshViolationsView(e={}){const t=!!e.skipFilterRerender,i=document.getElementById("violations-list");if(i)switch(document.querySelector(".tab-btn.active")?.dataset.tab||"all"){case"employees":i.innerHTML=this.renderEmployeeViolationsList();break;case"contractors":i.innerHTML=this.renderContractorViolationsList();break;case"analytics":return;default:i.innerHTML=this.renderViolationsList()}const o=document.getElementById("violations-stats-cards");o&&(o.outerHTML=this.renderAllViolationsStats());const n=document.getElementById("violations-filters-container");if(n&&!t){const a=document.querySelector(".tab-btn.active")?.dataset.tab||"all",s=a==="employees"?"employee":a==="contractors"?"contractor":"";n.innerHTML=this.renderFilters(s)}t||this.bindFilters()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-violation-btn");e&&e.addEventListener("click",()=>this.showViolationForm()),this.bindFilters()},100)},async switchTab(e){document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.remove("active"),n.dataset.tab===e&&n.classList.add("active"),n.style.flexShrink||(n.style.setProperty("flex-shrink","0","important"),n.style.setProperty("min-width","fit-content","important"),n.style.setProperty("white-space","nowrap","important"),n.style.setProperty("width","auto","important"),n.style.setProperty("max-width","none","important"))});const i=document.querySelector(".tabs-nav");i&&!i.style.flexWrap&&(i.style.setProperty("flex-wrap","nowrap","important"),i.style.setProperty("overflow-x","auto","important"),i.style.setProperty("overflow-y","visible","important"));const o=document.getElementById("violations-tab-content");if(o)switch(e){case"all":o.innerHTML=`
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
                `,this.bindFilters();break;case"employees":o.innerHTML=`
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
                `,this.bindFilters();break;case"contractors":o.innerHTML=`
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
                                    <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                                </button>
                            </div>
                            <div id="violations-list">
                                ${this.renderContractorViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"analytics":o.innerHTML=this.renderAnalyticsTab(),setTimeout(()=>{this.updateViolationAnalytics(),this._vBindAnalyticsEvents()},80);break;case"blacklist":o.innerHTML=this.renderBlacklistTab(),this.setupBlacklistEventListeners(),this.loadBlacklistDataAsync().then(()=>{this.refreshBlacklistDisplay()}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",n)});break}},async switchTabAsync(e){try{await this.switchTab(e)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}},refreshModule(){const e=document.getElementById("violations-btn-refresh");if(e){e.disabled=!0;const i=e.querySelector("i.fa-sync-alt");i&&i.classList.add("fa-spin")}const t=typeof this.load=="function"?this.load():Promise.resolve();Promise.resolve(t).finally(()=>{const i=document.getElementById("violations-btn-refresh");if(i){i.disabled=!1;const o=i.querySelector("i.fa-sync-alt");o&&o.classList.remove("fa-spin")}})},renderEmployeeViolationsList(){const e=this.getFilteredViolations().filter(t=>t.employeeName||t.personType==="employee"||!t.contractorName&&t.employeeName);return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p></div>':`
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
        `},getContractorViolationsExportOptions(){const e=new Map,t=(i,o,n="")=>{const a=String(o||"").replace(/\s+/g," ").trim();if(!a)return;const s=this._normalizeContractorExportName(a);!s||e.has(s)||e.set(s,{id:String(i||n||a).trim(),name:a,code:String(n||"").trim()})};return typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!1}).forEach(i=>t(i.id,i.name,i.code)):((AppState.appData?.contractors||[]).forEach(i=>{t(i.id||i.contractorId,i.name||i.companyName,i.code||i.contractorCode||i.isoCode)}),(AppState.appData?.approvedContractors||[]).forEach(i=>{t(i.id||i.contractorId,i.companyName||i.name,i.code||i.contractorCode)})),(AppState.appData?.violations||[]).forEach(i=>{i?.contractorName&&t(i.contractorId,i.contractorName,i.contractorCode||i.code||i.isoCode)}),Array.from(e.values()).sort((i,o)=>i.name.localeCompare(o.name,"ar",{sensitivity:"base"}))},_normalizeContractorExportName(e){const t=String(e||"").replace(/\s+/g," ").trim();if(!t)return"";const i=t.indexOf(" - "),o=i>0?t.slice(0,i).trim():t;return this._normKeyStr(o)},_buildContractorExportMatcher(e="",t="",i=""){const o=String(e||"").trim(),n=String(t||"").trim(),a=String(i||"").trim();if(!o&&!n&&!a)return null;let s=null;typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"&&(s=Contractors.resolveContractorForAnalytics(o||a,n));const r=o||a||n,l=s||{id:o,name:n,companyName:n,code:a,contractorCode:a};if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(l,r);if(typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function")return Contractors.buildContractorAnalyticsMatchers(l,r);const c=this._normalizeContractorExportName(n||o),d=new Set([o,a].filter(Boolean).map(p=>String(p).trim().toLowerCase()));return{violationBelongsToContractor:p=>{if(!p||!(p.personType==="contractor"||!!String(p.contractorName||"").trim()))return!1;const m=this._normalizeContractorExportName(p.contractorName),$=String(p.contractorId||p.contractorCode||p.code||"").trim().toLowerCase();return $&&d.has($)?!0:!!c&&m===c}}},showContractorViolationsReportDialog(){const e=this.getContractorViolationsExportOptions(),t=new Date,i=t.getFullYear(),o=[];for(let p=0;p<24;p++){const f=new Date(i,t.getMonth()-p,1),m=f.getFullYear(),$=f.getMonth()+1,b=`${m}-${String($).padStart(2,"0")}`,z=f.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});o.push({value:b,label:z})}const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-pdf ml-2"></i>
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
                                    ${o.map(p=>`<option value="${p.value}">${p.label}</option>`).join("")}
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="generate-contractor-violations-report-btn">
                        <i class="fas fa-file-export ml-2"></i>
                        \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n);const a=()=>n.remove();n.querySelector(".modal-close")?.addEventListener("click",a),n.querySelector('[data-action="close"]')?.addEventListener("click",a),n.addEventListener("click",p=>{p.target===n&&a()});const s=n.querySelectorAll('input[name="contractor-violations-range-type"]'),r=n.querySelector("#contractor-violations-report-month"),l=n.querySelector("#contractor-violations-report-from-date"),c=n.querySelector("#contractor-violations-report-to-date"),d=()=>{const p=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all";r.disabled=p!=="month",r.required=p==="month",l.disabled=p!=="custom",l.required=p==="custom",c.disabled=p!=="custom",c.required=p==="custom"};s.forEach(p=>p.addEventListener("change",d)),n.querySelector("#generate-contractor-violations-report-btn")?.addEventListener("click",async()=>{const p=n.querySelector("#contractor-violations-report-select"),f=p&&p.selectedIndex>=0?p.options[p.selectedIndex]:null,m=p?.selectedIndex===0,$=!m&&f?.value?String(f.value).trim():"",b=!m&&f?.dataset?.contractorName?String(f.dataset.contractorName).trim():"",z=!m&&f?.dataset?.contractorCode?String(f.dataset.contractorCode).trim():"",A=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all",_=n.querySelector("#contractor-violations-report-month")?.value||"",L=n.querySelector("#contractor-violations-report-from-date")?.value||"",I=n.querySelector("#contractor-violations-report-to-date")?.value||"";if(A==="month"&&!_){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(A==="custom"){if(!L||!I){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(L)>new Date(I)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}a(),await this.generateContractorViolationsReport($,{dateRangeType:A,month:_,fromDate:L,toDate:I},b,z)})},async generateContractorViolationsReport(e="",t={},i="",o=""){const n=this._buildContractorExportMatcher(e,i,o);let a=(AppState.appData.violations||[]).map(d=>this.normalizeViolationRecord(d)).filter(Boolean).filter(d=>d?.personType==="contractor"||!!String(d?.contractorName||"").trim());n&&(a=a.filter(d=>n.violationBelongsToContractor(d)));const{dateRangeType:s="all",month:r="",fromDate:l="",toDate:c=""}=t||{};if(s==="month"&&r){const[d,p]=r.split("-");a=a.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return m.getFullYear()===parseInt(d,10)&&m.getMonth()+1===parseInt(p,10)})}else if(s==="custom"&&l&&c){const d=new Date(l);d.setHours(0,0,0,0);const p=new Date(c);p.setHours(23,59,59,999),a=a.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return m>=d&&m<=p})}if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0641\u0642 \u0627\u0644\u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const d=a.filter(T=>String(T.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,p=a.filter(T=>String(T.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,f=a.filter(T=>String(T.severity||"").trim()==="\u0645\u0646\u062E\u0636\u0629").length,m=a.filter(T=>String(T.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,$=Math.max(0,a.length-m),b=a.length>0?Math.round(m/a.length*100):0,z=new Set(a.map(T=>String(T.contractorName||"").trim()).filter(Boolean)).size,A=a.reduce((T,j)=>T+(Number(this.getEffectiveFineAmount(j))||0),0);let _="";if(s==="month"&&r){const[T,j]=r.split("-");_=new Date(parseInt(T,10),parseInt(j,10)-1,1).toLocaleDateString("ar-SA",{year:"numeric",month:"long"})}else s==="custom"&&l&&c&&(_=`\u0645\u0646 ${Utils.formatDate(l)} \u0625\u0644\u0649 ${Utils.formatDate(c)}`);const L=this._AR_PDF_TEXT_STYLE_,I=a.map((T,j)=>`
                <tr>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${j+1}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML(T.contractorName||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML(T.violationType||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${T.violationDate?Utils.formatDate(T.violationDate):"-"}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${Utils.escapeHTML(T.severity||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML(T.actionTaken||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${Utils.escapeHTML(T.status||"-")}</td>
                </tr>
            `).join(""),N=i?` - ${Utils.escapeHTML(i)}`:"",R=`
                <div style="margin-bottom: 24px; direction: rtl;">
                    <h2 dir="rtl" style="font-size: 20px; margin-bottom: 12px; color: #991B1B; font-weight: 700; ${L}">\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646${N}</h2>
                    ${_?`<div style="margin-bottom: 16px; padding: 12px; background: #FFF7ED; border-right: 4px solid #F59E0B; border-radius: 8px;"><strong style="color: #D97706;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(_)}</span></div>`:""}
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA;"><div style="font-size: 12px; color: #B91C1C; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #991B1B;">${a.length}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;"><div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div><div style="font-size: 24px; font-weight: 700; color: #1E3A8A;">${z}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;"><div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #92400E;">${this.formatFineAmount(Number(A))}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFF7ED; border: 1px solid #FED7AA;"><div style="font-size: 12px; color: #C2410C; margin-bottom: 6px; font-weight: 600;">\u0639\u0627\u0644\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637\u0629 / \u0645\u0646\u062E\u0641\u0636\u0629</div><div style="font-size: 20px; font-weight: 700; color: #9A3412;">${d} / ${p} / ${f}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;"><div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</div><div style="font-size: 24px; font-weight: 700; color: #065F46;">${b}%</div><div style="font-size: 11px; color: #065F46; margin-top: 4px;">\u0645\u062D\u0644\u0648\u0644: ${m} | \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644: ${$}</div></div>
                    </div>
                </div>
                <div style="margin-bottom: 16px; direction: rtl;">
                    <h3 dir="rtl" style="font-size: 18px; margin-bottom: 12px; color: #991B1B; font-weight: 700; border-bottom: 2px solid #DC2626; padding-bottom: 8px; ${L}">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                </div>
                <div style="overflow-x: auto; direction: rtl;">
                    <table dir="rtl" style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl; ${L}">
                        <thead>
                            <tr style="background: #B91C1C; color: #FFFFFF;">
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">#</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0627\u0644\u0634\u062F\u0629</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                                <th dir="rtl" style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; ${L}">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody>${I}</tbody>
                    </table>
                </div>
            `,F=`CONTRACTOR-VIOL-${new Date().toISOString().slice(0,10)}`,V=i?`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${i}`:"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",O=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(F,V,R,!1,!1,{source:"ContractorViolationsTab",contractorId:e||"",contractorName:i||"",titleAr:V,includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(V)}</title></head><body>${R}</body></html>`,W=`${String(V).replace(/[\\/:*?"<>|]/g,"_")}.pdf`;if(!await this._downloadHtmlReportAsPdf(O,W))throw new Error("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D")}catch(d){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",d),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+(d.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async deleteViolation(e){if(!e){typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","error");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.")){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");try{const t=(AppState.appData?.violations||[]).find(l=>l.id===e),i=t?.contractorId||"",o=t?.contractorName||"",n=t?.employeeId||"",a=t?.employeeCode||t?.employeeNumber||"",s=t?.employeeName||"";let r;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callBackend)r=await GoogleIntegration.callBackend("deleteViolationFromSheet",{id:e});else throw new Error("\u062E\u062F\u0645\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");if(r&&r.success){AppState.appData&&AppState.appData.violations&&(AppState.appData.violations=AppState.appData.violations.filter(l=>l.id!==e)),(i||o)&&(AppState.appData?.contractors||[]).forEach(c=>{c&&(c.id===i||c.name===o||c.contractorName===o)&&(Array.isArray(c.violations)&&(c.violations=c.violations.filter(d=>d.id!==e)),c.violationIds&&Array.isArray(c.violationIds)&&(c.violationIds=c.violationIds.filter(d=>d!==e)))}),(n||a||s)&&(AppState.appData?.employees||[]).forEach(c=>{c&&(c.id===n||c.employeeNumber===a||c.employeeCode===a||c.name===s)&&(Array.isArray(c.violations)&&(c.violations=c.violations.filter(d=>d.id!==e)),c.violationIds&&Array.isArray(c.violationIds)&&(c.violationIds=c.violationIds.filter(d=>d!==e)))}),typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{this.updateAllViolationsStats()}catch{}if(this.refreshViolationsView(),typeof Contractors<"u"&&Contractors.load)try{(AppState?.currentSection||"")==="contractors"&&!Contractors._isLoading&&Contractors.load()}catch{}if(typeof Employees<"u"&&Employees.loadEmployeesList)try{(AppState?.currentSection||"")==="employees"&&Employees.loadEmployeesList()}catch{}typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629","success")}else throw new Error(r?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(t){typeof Utils<"u"&&Utils.showToast?Utils.showToast("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+t.message,"error"):alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+t.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},renderAnalyticsTab(){this._vEnsureChartJS().catch(()=>{});const e=(i,o)=>this._t(i,o),t=this.getCurrentCurrency();return`
        <div id="viol-analytics-root" style="font-family:'Cairo','Inter',sans-serif !important;">

            <!-- \u2500\u2500 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A (\u064A\u064F\u062E\u0641\u0649 \u0639\u0646\u062F \u062A\u0635\u062F\u064A\u0631 PDF) \u2500\u2500 -->
            <div id="viol-analytics-toolbar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(220,38,38,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-bar" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">${e("module.violations.analytics.title","\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">${e("module.violations.analytics.subtitle","\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0648\u0641\u0648\u0631\u064A \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF")}</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">${e("module.violations.analytics.period","\u0627\u0644\u0641\u062A\u0631\u0629:")}</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((i,o)=>{const n=[e("module.violations.analytics.period.30d","30 \u064A\u0648\u0645"),e("module.violations.analytics.period.3m","3 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.6m","6 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.1y","\u0633\u0646\u0629"),e("module.violations.analytics.period.all","\u0627\u0644\u0643\u0644")],a=(this._violPeriod||"0")===i;return`<button class="viol-period-btn" data-period="${i}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${a?"#fff":"rgba(255,255,255,0.15)"};color:${a?"#991b1b":"#fff"};">${n[o]}</button>`}).join("")}
                    </div>
                    <button id="viol-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>${e("module.violations.analytics.filters","\u0641\u0644\u0627\u062A\u0631")}</span><span id="viol-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <!-- \u2705 \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0629 EGP \u21C4 USD -->
                    <div style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.4);border-radius:8px;overflow:hidden;">
                        <button id="viol-curr-egp" data-curr="EGP" class="viol-curr-btn" style="padding:6px 10px;border:none;cursor:pointer;background:${t==="EGP"?"#fff":"transparent"};color:${t==="EGP"?"#991b1b":"#fff"};font-size:0.78rem;font-weight:700;transition:all .15s;" title="${e("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A")}">${e("module.violations.analytics.currency.egp_short","\u062C.\u0645")}</button>
                        <button id="viol-curr-usd" data-curr="USD" class="viol-curr-btn" style="padding:6px 10px;border:none;cursor:pointer;background:${t==="USD"?"#fff":"transparent"};color:${t==="USD"?"#991b1b":"#fff"};font-size:0.78rem;font-weight:700;transition:all .15s;" title="${e("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A")}">$</button>
                        <button id="viol-curr-rate-btn" style="padding:6px 8px;border:none;border-right:1px solid rgba(255,255,255,0.25);cursor:pointer;background:transparent;color:#fff;font-size:0.78rem;transition:all .15s;" title="${e("module.violations.analytics.currency.rate_edit","\u062A\u0639\u062F\u064A\u0644 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641")}" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='transparent'"><i class="fas fa-cog"></i></button>
                    </div>
                    <button id="viol-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.3);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.5)'" onmouseout="this.style.background='rgba(0,0,0,0.3)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="viol-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="${e("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div id="viol-analytics-capture">
            <div id="viol-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#dc2626;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#7f1d1d;">${e("module.violations.analytics.filters.interactive","\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}</span>
                        <span id="viol-filter-count" style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="viol-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#fee2e2';this.style.color='#dc2626'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>${e("module.common.reset","\u0645\u0633\u062D \u0627\u0644\u0643\u0644")}
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"viol-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:e("module.violations.analytics.filter.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")},{id:"viol-af-type",icon:"fas fa-tag",color:"#dc2626",label:e("module.violations.analytics.filter.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")},{id:"viol-af-sev",icon:"fas fa-exclamation-circle",color:"#f59e0b",label:e("module.violations.analytics.filter.severity","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")},{id:"viol-af-status",icon:"fas fa-circle",color:"#10b981",label:e("module.violations.analytics.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629")},{id:"viol-af-loc",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:e("module.violations.analytics.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639")}].map(i=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${i.icon}" style="color:${i.color};margin-left:4px;"></i>${i.label}
                            </label>
                            <select id="${i.id}" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
                                <option value="">${e("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2500\u2500 KPI Cards \u2500\u2500 -->
            <div id="viol-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2500\u2500 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u0634\u062F\u0629 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tasks" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.status","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="viol-chart-status"></canvas>
                        <div id="viol-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-circle" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.severity","\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="viol-chart-sev"></canvas>
                        <div id="viol-chart-sev-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.trend","\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)")}</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="viol-chart-trend"></canvas>
                    <div id="viol-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 2: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 + \u0627\u0644\u0645\u0648\u0642\u0639 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tag" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.byType","\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0623\u0639\u0644\u0649 10)")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="viol-chart-type"></canvas>
                        <div id="viol-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.byLocation","\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="viol-chart-loc"></canvas>
                        <div id="viol-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 3: \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 + \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-tie" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.topEmployees","\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0629\u064B (\u0623\u0639\u0644\u0649 10)")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="viol-chart-emp"></canvas>
                        <div id="viol-chart-emp-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.chart.noEmpViolations","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646")}</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-users-cog" style="color:#f97316;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.topContractors","\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0629\u064B (\u0623\u0639\u0644\u0649 10)")}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="viol-chart-con"></canvas>
                        <div id="viol-chart-con-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.chart.noConViolations","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0645\u062E\u0637\u0637 \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-coins" style="color:#d97706;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.finesByType","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 ({currency})").replace("{currency}",this.getCurrencyLabel("long")==="\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"?e("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):e("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"))}</span>
                    <span style="font-size:0.72rem;color:#94a3b8;margin-right:auto;">${e("module.violations.analytics.top10Types","(\u0623\u0639\u0644\u0649 10 \u0623\u0646\u0648\u0627\u0639)")}</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="viol-chart-fines"></canvas>
                    <div id="viol-chart-fines-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.chart.noFinesData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u0631\u0627\u0645\u0627\u062A")}</div>
                </div>
            </div>

            <!-- \u2500\u2500 \u062C\u062F\u0648\u0644 \u0623\u0634\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-fire" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.table.criticalTitle","\u0623\u0634\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629 \u2014 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629)")}</span>
                    </div>
                    <span id="viol-critical-count" style="background:#fef2f2;color:#b91c1c;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.name","\u0627\u0644\u0627\u0633\u0645")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.severity","\u0627\u0644\u0634\u062F\u0629")}</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;white-space:nowrap;">${e("module.violations.analytics.table.fine","\u0627\u0644\u063A\u0631\u0627\u0645\u0629 ({currency})").replace("{currency}",this.getCurrencyLabel("short"))}</th>
                            </tr>
                        </thead>
                        <tbody id="viol-critical-tbody">
                            <tr><td colspan="8" style="padding:20px;text-align:center;color:#94a3b8;">${e("module.common.loading","\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026")}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>`},async updateViolationAnalytics(){const e=document.getElementById("viol-analytics-root");if(!e)return;const t=(v,E)=>this._t(v,E),o=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA",n=parseInt(this._violPeriod||"0",10),s=(AppState.appData.violations||[]).map(v=>this.normalizeViolationRecord(v)).filter(Boolean),r=this._vFilterByPeriod(s,n);this._vPopulateFilters(r);const l=this._vApplyFilters(r),c=l.length,d=document.getElementById("viol-filter-count");d&&(d.textContent=`${c} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const p=l.filter(v=>v.personType==="employee"),f=l.filter(v=>v.personType==="contractor"),m=l.filter(v=>v.severity==="\u0639\u0627\u0644\u064A\u0629").length,$=l.filter(v=>v.status==="\u0645\u062D\u0644\u0648\u0644").length,b=l.filter(v=>v.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644").length,z=l.filter(v=>v.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,A=c>0?Math.round($/c*100):0,_=l.reduce((v,E)=>v+(Number(E.fineAmount)||0),0),L=l.filter(v=>{if(!v.violationDate)return!1;const E=new Date(v.violationDate),G=new Date;return E.getFullYear()===G.getFullYear()&&E.getMonth()===G.getMonth()}).length,I=document.getElementById("viol-kpi-strip");if(I){const v=[{label:t("module.violations.analytics.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),value:c,icon:"fas fa-exclamation-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:t("module.violations.analytics.kpi.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:p.length,icon:"fas fa-user-tie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:t("module.violations.analytics.kpi.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),value:f.length,icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:t("module.violations.analytics.kpi.highSeverity","\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629"),value:m,icon:"fas fa-bomb",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{label:t("module.violations.analytics.kpi.resolved","\u0645\u062D\u0644\u0648\u0644\u0629"),value:$,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:t("module.violations.analytics.kpi.unresolved","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629"),value:b,icon:"fas fa-times-circle",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:t("module.violations.analytics.kpi.resolRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"),value:A+"%",icon:"fas fa-chart-pie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{label:t("module.violations.analytics.kpi.totalFines","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A"),value:_>0?this.formatFineAmount(_):"\u2014",icon:"fas fa-coins",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:t("module.violations.analytics.kpi.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631"),value:L,icon:"fas fa-calendar-day",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"}];I.innerHTML=v.map(E=>`
                <div style="background:${E.bg};border:1px solid ${E.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${E.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${E.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.2rem;font-weight:800;color:${E.color};line-height:1;">${E.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${E.label}</div>
                    </div>
                </div>`).join("")}if(!await this._vEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",`<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t("module.violations.analytics.chartError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.")}</span></div>`);return}const R=this._vGroupBy(l,"status"),F={\u0645\u062D\u0644\u0648\u0644:"rgba(16,185,129,0.85)","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(245,158,11,0.85)"};this._vDrawDoughnut("viol-chart-status",R.labels.map(v=>t("module.violations.status."+v,v)),R.data,R.labels.map(v=>F[v]||"rgba(148,163,184,0.8)"));const V=this._vGroupBy(l,"severity"),O={\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(16,185,129,0.85)",\u0645\u0646\u062E\u0636\u0629:"rgba(16,185,129,0.85)"};this._vDrawDoughnut("viol-chart-sev",V.labels.map(v=>t("module.violations.severity."+v,v)),V.data,V.labels.map(v=>O[v]||"rgba(148,163,184,0.8)")),this._vDrawTrend("viol-chart-trend",r);const W=this._vGroupBy(l,"violationType",10);this._vDrawHBar("viol-chart-type",W.labels,W.data,"rgba(220,38,38,0.75)");const B=this._vGroupBy(l,"violationLocation",8);this._vDrawHBar("viol-chart-loc",B.labels,B.data,"rgba(245,158,11,0.75)");const T=this._vGroupBy(p,"employeeName",10);this._vDrawHBar("viol-chart-emp",T.labels,T.data,"rgba(99,102,241,0.75)");const j=this._vGroupBy(f,"contractorName",10);this._vDrawHBar("viol-chart-con",j.labels,j.data,"rgba(249,115,22,0.75)"),this._vDrawFinesByType("viol-chart-fines",l);const Q=l.filter(v=>v.severity==="\u0639\u0627\u0644\u064A\u0629"&&v.status!=="\u0645\u062D\u0644\u0648\u0644").sort((v,E)=>(E.fineAmount||0)-(v.fineAmount||0)).slice(0,20),ot=document.getElementById("viol-critical-count"),Z=document.getElementById("viol-critical-tbody");ot&&(ot.textContent=`${Q.length} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`),Z&&(Q.length===0?Z.innerHTML=`<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t("module.violations.analytics.table.noCritical","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0631\u062C\u0629 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629")}</td></tr>`:Z.innerHTML=Q.map((v,E)=>{const G=Utils.escapeHTML(v.employeeName||v.contractorName||"\u2014"),J=v.personType==="contractor"?`<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</span>`:`<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</span>`,Y=`<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.severity.high","\u0639\u0627\u0644\u064A\u0629")}</span>`,ut={"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"background:#fef3c7;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#ede9fe;color:#5b21b6;"}[v.status]||"background:#f1f5f9;color:#374151;",at=Number(v.fineAmount)||0,nt=E%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${nt};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${nt}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${v.violationDate?new Date(v.violationDate).toLocaleDateString(o,{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${G}</td>
                        <td style="padding:9px 12px;">${J}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationLocation||"\u2014")}</td>
                        <td style="padding:9px 12px;">${Y}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${ut}">${t("module.violations.status."+v.status,v.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${at>0?"#dc2626":"#94a3b8"};">${at>0?this.formatFineAmount(at):"\u2014"}</td>
                    </tr>`}).join(""))},_vFilterByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(o=>{if(!o.violationDate)return!0;const n=new Date(o.violationDate);return!isNaN(n.getTime())&&n>=i})},_vGroupBy(e,t,i=0){const o={};e.forEach(a=>{const s=String(a[t]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o[s]=(o[s]||0)+1});let n=Object.entries(o).sort((a,s)=>s[1]-a[1]);return i>0&&(n=n.slice(0,i)),{labels:n.map(a=>a[0]),data:n.map(a=>a[1])}},_vApplyFilters(e){const t=c=>{const d=document.getElementById(c);return d?d.value.trim():""},i=t("viol-af-ptype"),o=t("viol-af-type"),n=t("viol-af-sev"),a=t("viol-af-status"),s=t("viol-af-loc"),r=[i,o,n,a,s].some(c=>c!==""),l=document.getElementById("viol-filter-badge");return l&&(l.style.display=r?"inline":"none"),e.filter(c=>!(i&&String(c.personType||"").trim()!==i||o&&String(c.violationType||"").trim()!==o||n&&String(c.severity||"").trim()!==n||a&&String(c.status||"").trim()!==a||s&&String(c.violationLocation||"").trim()!==s))},_vPopulateFilters(e){const t=(a,s)=>this._t(a,s),i=a=>[...new Set(e.map(a).filter(Boolean))].sort(),o=(a,s,r)=>{const l=document.getElementById(a);if(!l)return;const c=l.value;l.innerHTML=`<option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>`+s.map(d=>{const p=r?t(r+d,d):d;return`<option value="${d}"${d===c?" selected":""}>${p}</option>`}).join("")},n=document.getElementById("viol-af-ptype");if(n){const a=n.value;n.innerHTML=`
                <option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                <option value="employee"${a==="employee"?" selected":""}>${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</option>
                <option value="contractor"${a==="contractor"?" selected":""}>${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</option>
            `}o("viol-af-type",i(a=>String(a.violationType||"").trim())),o("viol-af-sev",i(a=>String(a.severity||"").trim()),"module.violations.severity."),o("viol-af-status",i(a=>String(a.status||"").trim()),"module.violations.status."),o("viol-af-loc",i(a=>String(a.violationLocation||"").trim()))},_vDrawDoughnut(e,t,i,o){const n=document.getElementById(e),a=document.getElementById(e+"-empty");if(!n)return;if(!i.length||i.reduce((l,c)=>l+c,0)===0){n.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),n.style.display="";const s=i.reduce((l,c)=>l+c,0);this._violCharts||(this._violCharts={});const r=this._violCharts[e];if(r)try{r.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:o||this._vChartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${s>0?(l.parsed/s*100).toFixed(1):0}%)`}}}}})},_vDrawHBar(e,t,i,o){const n=document.getElementById(e),a=document.getElementById(e+"-empty");if(!n)return;if(!i.length||i.reduce((r,l)=>r+l,0)===0){n.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),n.style.display="",this._violCharts||(this._violCharts={});const s=this._violCharts[e];if(s)try{s.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:o||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${r.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:r=>String(t[r]).length>18?String(t[r]).slice(0,17)+"\u2026":t[r]}}}}})},_vDrawTrend(e,t){const i=document.getElementById(e),o=document.getElementById(e+"-empty");if(!i)return;const n=(p,f)=>this._t(p,f),s=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA",r=new Date,l=[];for(let p=11;p>=0;p--){const f=new Date(r.getFullYear(),r.getMonth()-p,1),m=f.toLocaleDateString(s,{month:"long"});l.push({year:f.getFullYear(),month:f.getMonth(),label:`${m} ${f.getFullYear()}`})}const c=l.map(p=>t.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return!isNaN(m.getTime())&&m.getFullYear()===p.year&&m.getMonth()===p.month}).length);if(c.reduce((p,f)=>p+f,0)===0){i.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),i.style.display="",this._violCharts||(this._violCharts={});const d=this._violCharts[e];if(d)try{d.destroy()}catch{}this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:l.map(p=>p.label),datasets:[{label:n("module.violations.analytics.chart.violationCount","\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),data:c,backgroundColor:c.map(p=>p===Math.max(...c)?"rgba(220,38,38,0.85)":"rgba(220,38,38,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:n("module.violations.analytics.chart.trendLine","\u0627\u0644\u0627\u062A\u062C\u0627\u0647"),data:c,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_vDrawFinesByType(e,t){const i=document.getElementById(e),o=document.getElementById(e+"-empty");if(!i)return;const n=t.filter(m=>(Number(m.fineAmount)||0)>0);if(!n.length){i.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),i.style.display="";const a={};n.forEach(m=>{const $=String(m.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();a[$]=(a[$]||0)+(Number(m.fineAmount)||0)});const s=Object.entries(a).sort((m,$)=>$[1]-m[1]).slice(0,10),r=s.map(m=>m[0]),l=this.getCurrentCurrency(),c=this.getCurrencyLabel("long"),d=s.map(m=>{const $=this.convertFineAmount(m[1],l);return l==="USD"?Number($.toFixed(2)):Math.round($)});this._violCharts||(this._violCharts={});const p=this._violCharts[e];if(p)try{p.destroy()}catch{}const f=m=>l==="USD"?m.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):m.toLocaleString("ar-EG",{maximumFractionDigits:0});this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:d,backgroundColor:"rgba(217,119,6,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>` ${f(m.parsed.x)} ${c}`}}},scales:{x:{beginAtZero:!0,ticks:{font:{size:11},callback:m=>f(m)},grid:{color:"#f1f5f9"},title:{display:!0,text:`\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 (${c})`,font:{size:11}}},y:{ticks:{font:{size:11},callback:m=>String(r[m]).length>18?String(r[m]).slice(0,17)+"\u2026":r[m]}}}}})},async _vEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>{const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",o.onload=()=>t(!0),o.onerror=()=>t(!1),document.head.appendChild(o)},document.head.appendChild(i)})},_vChartColors(e){const t=["rgba(220,38,38,0.8)","rgba(245,158,11,0.8)","rgba(16,185,129,0.8)","rgba(99,102,241,0.8)","rgba(249,115,22,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,o)=>t[o%t.length])},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(i=>{const o=Array.from(document.querySelectorAll("script[src]")).find(a=>String(a.src||"").includes(e));if(o){const a=()=>i(!!t());o.addEventListener("load",a,{once:!0}),setTimeout(a,4e3);return}const n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>i(!!t()),n.onerror=()=>i(!1),document.head.appendChild(n)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("viol-cairo-font-link")){const e=document.createElement("link");e.id="viol-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(e){const t=`
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
</style>`,i=this._stripScriptsFromHtml_(e);return i?i.includes("</head>")?i.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${i}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const i={scale:2.5,backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(e.scrollWidth,900),windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},o=[{...i,useCORS:!0,allowTaint:!1},{...i,useCORS:!0,allowTaint:!0},{...i,useCORS:!1,allowTaint:!0}];let n=null;for(let a=0;a<o.length;a++)try{const s=await html2canvas(e,o[a]);if(s&&s.width>0&&s.height>0)return s}catch(s){n=s}if(n)throw n;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const o=this._prepareArabicPdfHtml_(e),n=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,a=document.createElement("iframe");a.setAttribute("aria-hidden","true"),a.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(a);try{a.srcdoc=o,await new Promise(p=>{a.onload=p,a.onerror=p,setTimeout(p,6e3)});const s=a.contentDocument||a.contentWindow?.document;if(!s)return!1;await this._waitArabicPdfFontsReady_(s);const r=Array.from(s.images||[]);await Promise.all(r.map(p=>new Promise(f=>{if(p.complete)return f();p.onload=f,p.onerror=f,setTimeout(f,3e3)})));const l=s.querySelector(".report-wrapper")||s.body;if(!l)return!1;const c=await this._captureHtmlToCanvas_(l);if(!c)return!1;const d=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return d?(Utils.PdfExport.appendCanvasAsPdfPages(d,c,{marginMm:8}),Utils.PdfExport.savePdf(d,n),!0):!1}catch(s){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",s),!1}finally{a.remove()}},_getViolAnalyticsPeriodLabel_(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._violPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_buildViolAnalyticsExportLegend_(){const e=n=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(n):String(n??""),t=e(this._getViolAnalyticsPeriodLabel_()),i=e(document.getElementById("viol-filter-count")?.textContent?.trim()||""),o=e(new Date().toLocaleString("ar-SA",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return`
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ${t}</div>
                ${i?`<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${i}</div>`:""}
                <div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${o}</div>
            </div>
        </div>`},async _vExportPDF(){const e=document.getElementById("viol-analytics-capture");if(!e)return;const t=document.getElementById("viol-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{if(await this._ensureReportPdfLibs_(),typeof html2canvas>"u")throw new Error("html2canvas unavailable");const o=document.getElementById("viol-filter-panel"),n=o&&o.style.display!=="none";n&&(o.style.display="none");const a=Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),s=await html2canvas(e,{scale:a,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:0,logging:!1});n&&(o.style.display="");const{dataUrl:r}=Utils.PdfExport.compressCanvasToJpegDataUrl(s,Utils.PdfExport.TARGET_MAX_BYTES),l=`
                <div style="margin:0 auto;max-width:100%;">
                    <img src="${r}" alt="Violations Analytics Dashboard" style="width:100%;max-width:100%;height:auto;display:block;border-radius:8px;border:1px solid #e2e8f0;">
                </div>`,c=`VIOL-ANALYTICS-${new Date().toISOString().slice(0,10)}`,d="\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",p="Violations Analysis Report",f=new Date().toISOString(),m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(c,d,l,!1,!1,{source:"ViolationsAnalytics",titleEn:p,titleAr:d,version:AppState?.companySettings?.formVersion||"1.0",includeQRCode:!1,compactPdfFooter:!0,headerLayoutLtr:!0,footerLegendHtml:this._buildViolAnalyticsExportLegend_()},f,f):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${d}</title></head><body>${l}</body></html>`,$=`Violations-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;if(!await this._downloadHtmlReportAsPdf(m,$))throw new Error("PDF generation failed");typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A PDF \u0628\u0646\u062C\u0627\u062D")}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_vBindAnalyticsEvents(){const e=document.getElementById("viol-analytics-root");if(!e)return;e.querySelectorAll(".viol-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._violPeriod=r.getAttribute("data-period"),e.querySelectorAll(".viol-period-btn").forEach(l=>{const c=l===r;l.style.background=c?"#fff":"rgba(255,255,255,0.15)",l.style.color=c?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const t=document.getElementById("viol-analytics-refresh");t&&t.addEventListener("click",()=>this.updateViolationAnalytics());const i=document.getElementById("viol-export-pdf-btn");i&&i.addEventListener("click",()=>this._vExportPDF());const o=document.getElementById("viol-toggle-filters-btn"),n=document.getElementById("viol-filter-panel");o&&n&&o.addEventListener("click",()=>{const r=n.style.display!=="none";n.style.display=r?"none":"block",o.style.background=r?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const a=document.getElementById("viol-filter-reset-btn");a&&a.addEventListener("click",()=>{["viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(r=>{const l=document.getElementById(r);l&&(l.value="")}),this.updateViolationAnalytics()}),["viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(r=>{const l=document.getElementById(r);l&&l.addEventListener("change",()=>this.updateViolationAnalytics())}),e.querySelectorAll(".viol-curr-btn").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-curr");this.setCurrentCurrency(l),e.querySelectorAll(".viol-curr-btn").forEach(c=>{const d=c.getAttribute("data-curr")===l;c.style.background=d?"#fff":"transparent",c.style.color=d?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const s=document.getElementById("viol-curr-rate-btn");s&&s.addEventListener("click",()=>{const r=this.getExchangeRate(),l=window.prompt(`\u0623\u062F\u062E\u0644 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 (\u0643\u0645 \u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A \u064A\u0633\u0627\u0648\u064A 1 \u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A):

\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ${r} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`,String(r));if(l===null)return;const c=parseFloat(String(l).trim());if(!Number.isFinite(c)||c<=0){typeof Notification<"u"&&Notification.error?Notification.error("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"):alert("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}this.setExchangeRate(c),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0625\u0644\u0649 ${c} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`),this.updateViolationAnalytics()})},loadContractorsIntoSelect(e,t="",i=""){if(!e||e.tagName!=="SELECT"){Utils.safeWarn("\u26A0\uFE0F loadContractorsIntoSelect: \u0639\u0646\u0635\u0631 select \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}if(typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"){Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:t,selectedContractorId:i,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1});return}let o=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function")try{const s=Contractors.getAllContractorsForModules();if(s&&s.length>0){const r=new Map;s.forEach(l=>{const c=(l.name||"").trim();if(!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")return;const d=((l.code||l.isoCode||"")+"").trim().toUpperCase(),p=((l.licenseNumber||"")+"").trim(),f=/^CON-\d+$/i.test(d)?`CODE:${d}`:p?`LIC:${p}`:l.id?`ID:${l.id}`:`NAME:${c.toLowerCase()}`;r.has(f)||r.set(f,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||"").trim()})}),o=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 getAllContractorsForModules:",s)}if(o.length===0&&typeof Contractors<"u"&&typeof Contractors.getApprovedOptions=="function")try{const s=Contractors.getApprovedOptions(!1);s&&s.length>0&&(o=s.map(r=>({id:r.id||r.contractorId||"",name:(r.name||"").trim(),serviceType:(r.serviceType||"").trim(),licenseNumber:(r.licenseNumber||"").trim()})).filter(r=>r.name))}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",s)}if(o.length===0){const s=AppState.appData.approvedContractors||[],r=new Map;s.filter(l=>l&&(l.companyName||l.name)&&l.isActive!=="inactive"&&l.isActive!==!1&&l.isActive!=="false"&&l.isActive!=="FALSE").forEach(l=>{const c=(l.companyName||l.name||"").trim();!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"||r.has(c)||r.set(c,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||l.contractNumber||"").trim()})}),o=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}e.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>';const n=document.createDocumentFragment();let a=null;if(o.forEach(s=>{if(!s||!s.name)return;const r=document.createElement("option");r.value=s.name,r.textContent=s.name,s.serviceType&&(r.textContent+=` - ${s.serviceType}`),r.dataset.contractorId=s.id||"",(t&&s.name===t||i&&s.id===i)&&(r.selected=!0,a=r),n.appendChild(r)}),e.appendChild(n),t&&!a&&e.value!==t)try{e.value=t}catch{Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",t)}},async showViolationForm(e=null){let t=null;typeof e=="string"?t=AppState.appData.violations?.find(u=>u.id===e)||null:typeof e=="object"&&(t=e),t=this.normalizeViolationRecord(t);const i=t?this.getEffectiveFineAmount(t):0,o=!!t,a=String(t?.personType||"").trim().toLowerCase()==="contractor"||!!t?.contractorName&&!t?.employeeName,s=!a,r=String(t?.violationLocationId||t?.violationLocation||"").trim(),l=String(t?.violationPlaceId||t?.violationPlace||"").trim();let c=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),c=ViolationTypesManager.getAll()}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",u),c=AppState?.appData?.violationTypes||[]}else c=AppState?.appData?.violationTypes||[];const d=t?.violationTypeId||"",p=(t?.violationType||"").trim(),f=(AppState?.currentUser?.role||"").toString().trim().toLowerCase(),m=["admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","system_admin"].includes(f),$=c.map(u=>{const h=d?u.id===d:u.name===p,x=Number(u?.fineAmount||0);return`
                <option value="${Utils.escapeHTML(u.name)}" data-type-id="${Utils.escapeHTML(u.id)}" data-fine-amount="${x}" ${h?"selected":""}>
                    ${Utils.escapeHTML(u.name)}
                </option>
            `}).join(""),z=!c.some(u=>d?u.id===d:u.name===p)&&p?`
                <option value="${Utils.escapeHTML(p)}" data-type-id="${Utils.escapeHTML(d)}" data-fine-amount="${Number(i)}" selected>
                    ${Utils.escapeHTML(p)} (\u063A\u064A\u0631 \u0645\u0639\u0631\u0641)
                </option>
            `:"",A=document.createElement("div");A.className="modal-overlay",A.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle ml-2 text-yellow-600"></i>
                        ${o?"\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629"}
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
                                    <option value="employee" ${s?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${a?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                </select>
                            </div>
                            <div id="violation-employee-code-container" style="display: ${s?"block":"none"};">
                                <label for="violation-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-id-card ml-2"></i>
                                    \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                </label>
                                <input type="text" id="violation-employee-code" class="form-input"
                                    value="${t?.employeeCode||t?.employeeNumber||""}" 
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"
                                    ${s?"required":""}>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0646\u064A: \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="violation-person-name" class="block text-sm font-semibold text-gray-700 mb-2" id="violation-person-name-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *</label>
                                <input type="text" id="violation-person-name" required class="form-input"
                                    value="${t?.employeeName||t?.contractorName||""}" 
                                    placeholder="${s?"\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"}"
                                    ${s?"readonly":""}
                                    style="display: ${a?"none":"block"};">
                                <label for="violation-contractor-select" class="block text-sm font-semibold text-gray-700 mb-2" style="display: ${a?"block":"none"};">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <select id="violation-contractor-select" class="form-input"
                                    style="display: ${a?"block":"none"};"
                                    ${a?"required":""}>
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                </select>
                            </div>
                            <div id="violation-employee-position-container" style="display: ${s?"block":"none"};">
                                <label for="violation-employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="violation-employee-position" class="form-input"
                                    value="${t?.employeePosition||""}" 
                                    placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0644\u062B: \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        <div class="grid grid-cols-2 gap-4">
                            <div id="violation-employee-department-container" style="display: ${s?"block":"none"};">
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
                                    ${z}
                                    ${$}
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
                                    ${m?"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0623\u0646\u0643 \u0645\u062F\u064A\u0631.":"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u060C \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637."}
                                </p>
                            </div>
                        </div>
                        <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 (\u062A\u0638\u0647\u0631 \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0642\u0627\u0648\u0644) -->
                        <div id="violation-contractor-fields-container" style="display: ${a?"block":"none"};">
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
                        <div id="violation-location-fields-container" style="display: ${s?"block":"none"};">
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
                                <i class="fas fa-save ml-2"></i>${o?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(A);const _=document.getElementById("violation-person-type"),L=document.getElementById("violation-employee-code-container"),I=document.getElementById("violation-employee-code"),N=document.getElementById("violation-person-name"),R=document.getElementById("violation-person-name-label"),F=document.getElementById("violation-contractor-select");if(F){const u=t?.contractorName||"",h=t?.contractorId||"";this.loadContractorsIntoSelect(F,u,h)}const V=document.getElementById("violation-employee-position-container"),O=document.getElementById("violation-employee-department-container"),W=document.getElementById("violation-employee-position"),B=document.getElementById("violation-employee-department"),T=document.getElementById("violation-contractor-fields-container"),j=document.getElementById("violation-contractor-worker-container"),Q=document.getElementById("violation-contractor-position-container"),ot=document.getElementById("violation-contractor-department-container"),Z=document.getElementById("violation-contractor-worker"),v=document.getElementById("violation-contractor-position"),E=document.getElementById("violation-contractor-department"),G=document.getElementById("violation-location-fields-container"),J=document.getElementById("violation-type"),Y=document.getElementById("violation-fine-amount"),ut=new Map((c||[]).map(u=>[String(u.id||"").trim(),u])),at=new Map((c||[]).map(u=>[String(u.name||"").trim().toLowerCase(),u])),nt=()=>{const u=J?.selectedOptions?.[0],h=u?.getAttribute("data-type-id")||"",x=(J?.value||"").trim().toLowerCase(),g=h&&ut.get(h)||x&&at.get(x)||null,k=Number(u?.getAttribute("data-fine-amount")||0),S=Number(g?.fineAmount??k??0);return Number.isFinite(S)&&S>=0?S:0},dt=({force:u=!1}={})=>{if(!Y)return;const h=nt();(u||!m||Y.value==="")&&(Y.value=String(h))};Y&&(Y.readOnly=!m),J&&(J.addEventListener("change",()=>dt({force:!0})),J.addEventListener("input",()=>dt({force:!0}))),Y&&m&&t&&t.fineAmount!==void 0&&t.fineAmount!==null?Y.value=String(Number(i)):dt({force:!0}),_.addEventListener("change",u=>{if(u.target.value==="employee"){if(L.style.display="block",I.required=!0,I.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)",N.style.display="block",N.readOnly=!0,N.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",N.value="",N.required=!0,F&&(F.style.display="none",F.required=!1),V&&(V.style.display="block"),O&&(O.style.display="block"),T&&(T.style.display="none"),G&&(G.style.display="block"),this.loadLocationOptions("employee").then(()=>{const x=document.getElementById("violation-employee-location");if(x){const g=x.cloneNode(!0);x.parentNode.replaceChild(g,x);const k=document.getElementById("violation-employee-location");k&&k.addEventListener("change",S=>{const D=S.target.value;this.loadPlaceOptions(D,"","employee")})}}),R&&(R.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *"),typeof EmployeeHelper<"u"&&I&&I.parentNode)try{const x=I.cloneNode(!0);I.parentNode.replaceChild(x,I),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",k=>{if(k){const S=document.getElementById("violation-person-name"),D=document.getElementById("violation-employee-position"),q=document.getElementById("violation-employee-department");S&&(S.value=k.name||""),D&&(D.value=k.position||k.jobTitle||""),q&&(q.value=k.department||k.section||"")}})}catch(x){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",x),I&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",g=>{if(g){const k=document.getElementById("violation-person-name"),S=document.getElementById("violation-employee-position"),D=document.getElementById("violation-employee-department");k&&(k.value=g.name||""),S&&(S.value=g.position||g.jobTitle||""),D&&(D.value=g.department||g.section||"")}})}}else dt({force:!0}),L.style.display="none",I.required=!1,I.value="",N.style.display="none",N.required=!1,N.value="",F&&(F.style.display="block",F.required=!0,this.loadContractorsIntoSelect(F)),V&&(V.style.display="none"),O&&(O.style.display="none"),T&&(T.style.display="block"),this.loadLocationOptions("contractor").then(()=>{const x=document.getElementById("violation-contractor-location");if(x){const g=x.cloneNode(!0);x.parentNode.replaceChild(g,x);const k=document.getElementById("violation-contractor-location");k&&k.addEventListener("change",S=>{const D=S.target.value;this.loadPlaceOptions(D,"","contractor")})}}),G&&(G.style.display="none"),R&&(R.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *");pt()});const pt=()=>{clearTimeout(this._violationSeqBadgeTimer),this._violationSeqBadgeTimer=setTimeout(()=>{this.refreshViolationSequenceBadgeInModal(A,o?t?.id:null)},200)};if(A.addEventListener("input",pt),A.addEventListener("change",pt),setTimeout(pt,350),typeof EmployeeHelper<"u"&&t?.employeeName&&I&&I.parentNode)try{const u=I.cloneNode(!0);I.parentNode.replaceChild(u,I),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",x=>{if(x){const g=document.getElementById("violation-person-name"),k=document.getElementById("violation-employee-position"),S=document.getElementById("violation-employee-department");g&&(g.value=x.name||""),k&&(k.value=x.position||x.jobTitle||""),S&&(S.value=x.department||x.section||"")}})}catch(u){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",u),I&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",h=>{if(h){const x=document.getElementById("violation-person-name"),g=document.getElementById("violation-employee-position"),k=document.getElementById("violation-employee-department");x&&(x.value=h.name||""),g&&(g.value=h.position||h.jobTitle||""),k&&(k.value=h.department||h.section||"")}})}const gt=a?"contractor":"employee";setTimeout(async()=>{await this.loadLocationOptions("employee"),await this.loadLocationOptions("contractor");const u=document.getElementById("violation-employee-location"),h=document.getElementById("violation-employee-place");if(u&&h){const k=u.cloneNode(!0);u.parentNode.replaceChild(k,u);const S=h.cloneNode(!0);h.parentNode.replaceChild(S,h);const D=document.getElementById("violation-employee-location"),q=document.getElementById("violation-employee-place");D&&D.addEventListener("change",P=>{const X=P.target.value;this.loadPlaceOptions(X,"","employee")})}const x=document.getElementById("violation-contractor-location"),g=document.getElementById("violation-contractor-place");if(x&&g){const k=x.cloneNode(!0);x.parentNode.replaceChild(k,x);const S=g.cloneNode(!0);g.parentNode.replaceChild(S,g);const D=document.getElementById("violation-contractor-location"),q=document.getElementById("violation-contractor-place");D&&D.addEventListener("change",P=>{const X=P.target.value;this.loadPlaceOptions(X,"","contractor")})}if(gt==="employee"&&_.value==="employee"&&typeof EmployeeHelper<"u"&&document.getElementById("violation-employee-code"))try{EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",S=>{if(S){const D=document.getElementById("violation-person-name"),q=document.getElementById("violation-employee-position"),P=document.getElementById("violation-employee-department");D&&(D.value=S.name||""),q&&(q.value=S.position||S.jobTitle||""),P&&(P.value=S.department||S.section||"")}})}catch(S){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",S)}},100),r&&setTimeout(()=>{if(gt==="employee"){const u=document.getElementById("violation-employee-location");u&&(u.value=r,r&&this.loadPlaceOptions(r,l,"employee"))}else if(gt==="contractor"){const u=document.getElementById("violation-contractor-location");u&&(u.value=r,r&&this.loadPlaceOptions(r,l,"contractor"))}},200);const yt=document.getElementById("violation-photo-input"),wt=document.getElementById("violation-photo-preview"),St=document.getElementById("violation-photo-img");yt&&wt&&St&&yt.addEventListener("change",async u=>{const h=u.target.files[0];if(h){if(h.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),yt.value="";return}const x=new FileReader;x.onload=g=>{St.src=g.target.result,wt.classList.remove("hidden")},x.readAsDataURL(h)}});const vt=A.querySelector("#violation-form"),tt=A.querySelector("#violation-submit-btn")||vt?.querySelector('button[type="submit"]');if(!vt||!tt){AppState.debugMode&&Utils.safeError("\u274C \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648 \u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const st=(u,h,x)=>{const g=A.querySelector("#violation-form-banner"),k=A.querySelector("#violation-form-banner-icon"),S=A.querySelector("#violation-form-banner-title"),D=A.querySelector("#violation-form-banner-text");if(!g||!k||!S||!D)return;const q={error:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",icon:"fa-circle-xmark text-red-600"},warning:{bg:"#fffbeb",border:"#fde68a",text:"#92400e",icon:"fa-triangle-exclamation text-amber-600"},success:{bg:"#ecfdf5",border:"#a7f3d0",text:"#065f46",icon:"fa-circle-check text-emerald-600"},info:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",icon:"fa-circle-info text-blue-600"}},P=q[u]||q.info;g.style.background=P.bg,g.style.borderColor=P.border,g.style.color=P.text,k.className="fas "+P.icon+" text-lg mt-0.5",S.textContent=h||"",D.textContent=x||"",g.classList.remove("hidden");try{const X=A.querySelector(".modal-body");X&&X.scrollTo({top:0,behavior:"smooth"})}catch{}},At=()=>{const u=A.querySelector("#violation-form-banner");u&&u.classList.add("hidden")},kt=A.querySelector("#violation-form-banner-close");kt&&kt.addEventListener("click",At);const Tt=async u=>{if(u&&(u.preventDefault(),u.stopPropagation(),u.stopImmediatePropagation()),tt.disabled){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");return}const h=tt,x=h.innerHTML;h.disabled=!0,h.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{const g=document.getElementById("violation-person-type")?.value,k=document.getElementById("violation-date")?.value,S=document.getElementById("violation-time")?.value,D=document.getElementById("violation-type")?.value,q=document.getElementById("violation-severity")?.value,P=document.getElementById("violation-status")?.value,X=document.getElementById("violation-details")?.value.trim()||"",Ct=document.getElementById("violation-action")?.value.trim()||"",ft=document.getElementById("violation-fine-amount")?.value;let ht="";if(ft!==""&&ft!==null&&ft!==void 0){const y=this.parseFineAmount(ft);Number.isFinite(y)&&y>=0&&(ht=y)}else ht=this.parseFineAmount(nt());const H=[];g||H.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"),k||H.push("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),S||H.push("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),D||H.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),q||H.push("\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),P||H.push("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629");let rt="",Lt="";if(g==="employee"){const y=document.getElementById("violation-employee-code")?.value.trim();rt=document.getElementById("violation-person-name")?.value.trim(),y||H.push("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),rt||H.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}else if(g==="contractor"){const y=document.getElementById("violation-contractor-select");if(!y||!y.value)H.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");else{rt=y.value;const w=y.options[y.selectedIndex];Lt=w?.dataset.contractorCode||w?.dataset.contractorId||""}}let et="",lt="",it="",ct="";if(g==="employee"){const y=document.getElementById("violation-employee-location"),w=document.getElementById("violation-employee-place");et=y?.value||"",lt=y?.options[y?.selectedIndex]?.text||"",it=w?.value||"",ct=w?.options[w?.selectedIndex]?.text||""}else if(g==="contractor"){const y=document.getElementById("violation-contractor-location"),w=document.getElementById("violation-contractor-place");et=y?.value||"",lt=y?.options[y?.selectedIndex]?.text||"",it=w?.value||"",ct=w?.options[w?.selectedIndex]?.text||""}if(et||H.push("\u0627\u0644\u0645\u0648\u0642\u0639"),it||H.push("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),H.length>0){st("error","\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0646\u0627\u0642\u0635\u0629","\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644: "+H.join("\u060C ")),h.disabled=!1,h.innerHTML=x,H.forEach(y=>{let w="";if(y.includes("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")?w="violation-employee-code":y.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")?w="violation-person-name":y.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?w="violation-contractor-select":y.includes("\u062A\u0627\u0631\u064A\u062E")?w="violation-date":y.includes("\u0648\u0642\u062A")?w="violation-time":y.includes("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")?w="violation-type":y.includes("\u0627\u0644\u0634\u062F\u0629")?w="violation-severity":y.includes("\u0627\u0644\u062D\u0627\u0644\u0629")?w="violation-status":y.includes("\u0627\u0644\u0645\u0648\u0642\u0639")?w=g==="employee"?"violation-employee-location":"violation-contractor-location":y.includes("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")&&(w=g==="employee"?"violation-employee-place":"violation-contractor-place"),w){const K=document.getElementById(w);K&&(K.classList.add("border-red-500","ring-2","ring-red-300"),K.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{K.classList.remove("border-red-500","ring-2","ring-red-300")},3e3))}});return}let mt=t?.photo||"";const It=document.getElementById("violation-photo-input");if(It?.files.length>0){const y=It.files[0];if(y.size>2*1024*1024){st("error","\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627\u064B","\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 2MB. \u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0623\u0635\u063A\u0631."),h.disabled=!1,h.innerHTML=x;return}try{mt=await Violations.convertImageToBase64(y)}catch(w){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",w)}}At();const Ut=J?.selectedOptions?.[0]?.getAttribute("data-type-id")||"",Et=k&&S?new Date(`${k}T${S}`).toISOString():new Date().toISOString(),M={id:t?.id||Utils.generateId("VIOLATION"),isoCode:t?.isoCode||generateISOCode("VIOL",AppState.appData.violations||[]),personType:g,employeeId:g==="employee"?t?.employeeId||Utils.generateId("EMP"):"",employeeName:g==="employee"?rt:"",employeeCode:g==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeeNumber:g==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeePosition:g==="employee"&&document.getElementById("violation-employee-position")?.value.trim()||"",employeeDepartment:g==="employee"&&document.getElementById("violation-employee-department")?.value.trim()||"",contractorId:g==="contractor"?Lt:"",contractorName:g==="contractor"?rt:"",contractorWorker:g==="contractor"&&document.getElementById("violation-contractor-worker")?.value.trim()||"",contractorPosition:g==="contractor"&&document.getElementById("violation-contractor-position")?.value.trim()||"",contractorDepartment:g==="contractor"&&document.getElementById("violation-contractor-department")?.value.trim()||"",violationTypeId:Ut,violationType:D,fineAmount:this.parseFineAmount(ht),violationDate:Et,violationTime:S,violationLocation:lt&&lt!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"?lt:et,violationLocationId:et?String(et).trim():null,violationPlace:ct&&ct!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"?ct:it,violationPlaceId:it?String(it).trim():null,violationDetails:X,severity:q,actionTaken:Ct,status:P,photo:mt,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},Mt={personType:g,violationDate:Et,employeeCode:M.employeeCode,employeeNumber:M.employeeNumber,contractorName:M.contractorName,contractorWorker:M.contractorWorker},_t=this.countPriorViolationsSamePersonMonth(Mt,o&&t?.id?t.id:null);M.violationSequenceInMonth=_t+1;try{const y=await this.checkViolationApprovalGate(M,{isEdit:o});if(y&&y.requiresApproval){let w=mt;if(w&&typeof w=="string"&&w.startsWith("data:"))try{h.innerHTML='<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...';const U=await GoogleIntegration.uploadFileToDrive?.(w,`violation_${M.id}_${Date.now()}.jpg`,"image/jpeg","Violations");U&&U.success?w=U.directLink||U.shareableLink||"":(w="",st("warning","\u062A\u0639\u0630\u0651\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629","\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u062F\u0648\u0646 \u0627\u0644\u0635\u0648\u0631\u0629. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0623\u0648 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0627\u062D\u0642\u0627\u064B.")),h.innerHTML=x,h.disabled=!0,h.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'}catch(U){AppState.debugMode&&Utils.safeWarn("Drive upload failed in approval path:",U),w=""}const K={...M,photo:w},C=await this.submitViolationForApproval(K,{isEdit:o,originalId:t?.id});if(h.disabled=!1,h.innerHTML=x,C&&C.success){this._invalidateViolationApprovalRequestsCache(),A.remove(),Notification.success(C.message||"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627.");try{document.dispatchEvent(new CustomEvent("violation-approval-request-created",{detail:C.data||{}}))}catch{}return}else{const U=C&&C.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";st("error","\u062A\u0639\u0630\u0651\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",U);return}}}catch(y){AppState.debugMode&&Utils.safeWarn("approvalGate error (continuing with direct save):",y)}if(AppState.appData.violations||(AppState.appData.violations=[]),o&&t?.id){const y=AppState.appData.violations.findIndex(w=>w.id===t.id);if(y!==-1)AppState.appData.violations[y]={...AppState.appData.violations[y],...M,id:t.id,isoCode:t.isoCode||M.isoCode,createdAt:t.createdAt||M.createdAt,updatedAt:new Date().toISOString()};else throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}else AppState.appData.violations.push(M);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),A.remove(),Notification.success(`\u062A\u0645 ${o?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629...`);try{this.updateAllViolationsStats()}catch{}try{typeof Dashboard<"u"&&(typeof Dashboard.updateStats=="function"&&Dashboard.updateStats(),typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics())}catch{}try{document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"violations",action:o?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:M}}))}catch{}try{typeof Violations<"u"&&typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations<"u"&&Violations.load&&Violations.load()}catch{}(async y=>{let w=y,K=!1;if(y&&y.startsWith("data:"))try{const C=await GoogleIntegration.uploadFileToDrive?.(y,`violation_${M.id}_${Date.now()}.jpg`,"image/jpeg","Violations");C?.success&&(w=C.directLink||C.shareableLink||y,K=!0)}catch(C){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",C)}if(K){const C=AppState.appData.violations||[],U=C.findIndex(xt=>xt.id===M.id);U!==-1&&(C[U].photo=w,M.photo=w,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Violations<"u"&&Violations.load&&Violations.load())}try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const C=Object.assign({},M,{photo:w});let U;if(o?U=await GoogleIntegration.sendRequest({action:"updateViolation",data:{violationId:M.id,updateData:C}}):U=await GoogleIntegration.sendRequest({action:"addViolation",data:C}),U&&U.success===!0){try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}AppState.debugMode&&Utils.safeLog("\u2705 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D")}else{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",U&&U.message);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}}}catch(C){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",C);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}})(mt).catch(y=>{Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",y)})}catch(g){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",g),st("error","\u062D\u062F\u062B \u062E\u0637\u0623",g&&(g.message||g.toString())||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),h.disabled=!1,h.innerHTML=x}};vt.addEventListener("submit",Tt,{once:!1});const Dt=tt.cloneNode(!0);tt.parentNode.replaceChild(Dt,tt);const bt=A.querySelector("#violation-submit-btn")||A.querySelector('button[type="submit"]');bt&&bt.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),!bt.disabled&&Tt(u)}),A.addEventListener("click",u=>{u.target===A&&A.remove()});const $t=u=>{u.key==="Escape"&&document.body.contains(A)&&(A.remove(),document.removeEventListener("keydown",$t))};document.addEventListener("keydown",$t)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(a){return String(a??"")},i='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(a){return'<option value="'+t(a.id)+'">'+t(a.name)+"</option>"}).join(""),o=document.getElementById("blacklist-factory");if(o&&o.tagName==="SELECT"){var n=o.value;o.innerHTML=i,n&&(o.value=n)}}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Violations.refreshSiteDropdowns:",a)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(o=>o.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const o=Permissions.formSettingsState.sites.find(n=>n.id===e);if(o&&Array.isArray(o.places))return o.places.map(n=>({id:n.id||n.placeId||Utils.generateId("PLACE"),name:n.name||n.placeName||"\u0645\u0643\u0627\u0646 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}))}if(Array.isArray(AppState.appData?.observationSites)){const o=AppState.appData.observationSites.find(n=>n.id===e||n.siteId===e||n.name===e);if(o)return(Array.isArray(o.places)?o.places:Array.isArray(o.locations)?o.locations:Array.isArray(o.children)?o.children:Array.isArray(o.areas)?o.areas:[]).map((a,s)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${s+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},async loadLocationOptions(e="employee"){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=this.getSiteOptions(),i=e==="employee"?"violation-employee-location":"violation-contractor-location",o=document.getElementById(i);if(!o)return;o.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',t&&t.length>0&&t.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,o.appendChild(a)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)}},loadPlaceOptions(e,t="",i="employee"){try{const o=i==="employee"?"violation-employee-place":"violation-contractor-place",n=document.getElementById(o);if(!n||(n.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>',!e))return;const a=this.getPlaceOptions(e);a&&a.length>0&&a.forEach(s=>{const r=document.createElement("option");r.value=s.id,r.textContent=s.name,t&&(s.id===t||s.name===t)&&(r.selected=!0),n.appendChild(r)})}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",o)}},async convertImageToBase64(e){return new Promise((t,i)=>{const o=new FileReader;o.onload=()=>t(o.result),o.onerror=i,o.readAsDataURL(e)})},async viewViolation(e){const t=AppState.appData?.violations?.find(s=>s.id===e);if(!t){typeof Notification<"u"&&Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeViolationRecord(t)||t,o=String(i.severity||"").trim(),n=String(i.status||"").trim(),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                        ${(()=>{const s=this.processPhoto(i.photo);if(!s)return"";const r=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(s):{canonical:s,displaySrc:s,needsProxy:!1,proxyFileId:""},l=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(r):"";return`
                        <div style="background: #f8fafc; border-radius: 12px; padding: 16px;">
                            <h3 style="font-weight: 600; color: #475569; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-image"></i> \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629
                            </h3>
                            <img src="${Utils.escapeHTML(r.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"${l} class="violation-detail-photo w-full max-w-md h-64 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
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
                                        <option value="\u0639\u0627\u0644\u064A\u0629" ${o==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                        <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${o==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                        <option value="\u0645\u0646\u062E\u0636\u0629" ${o==="\u0645\u0646\u062E\u0636\u0629"||o==="\u0645\u0646\u062E\u0641\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
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
        `,document.body.appendChild(a),a.querySelector("#violation-view-quick-save")?.addEventListener("click",async()=>{await this.saveViolationQuickEditsFromView(i.id,a)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(a,{onFetchFail:s=>{try{s.onerror=null,s.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),a.addEventListener("click",s=>{s.target===a&&a.remove()})},async saveViolationQuickEditsFromView(e,t){const i=t.querySelector("#violation-view-q-severity")?.value?.trim()||"",o=t.querySelector("#violation-view-q-status")?.value?.trim()||"",n=t.querySelector("#violation-view-q-details")?.value?.trim()||"",a=t.querySelector("#violation-view-q-action")?.value?.trim()||"",s=t.querySelector("#violation-view-quick-save");if(!AppState.appData?.violations){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0627\u0644\u0641\u0627\u062A.");return}const r=AppState.appData.violations.findIndex(c=>c.id===e);if(r===-1){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.");return}const l=s?.innerHTML;s&&(s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{AppState.appData.violations[r]={...AppState.appData.violations[r],severity:i,status:o,violationDetails:n,actionTaken:a,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();let c=!0;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const d=await GoogleIntegration.autoSave("Violations",AppState.appData.violations);d&&d.success===!1&&(c=!1)}}catch(d){c=!1,AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",d)}if(!c)Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets");else try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewViolation(e);try{const d=document.querySelector("#violations-section .tabs-container .tab-btn.active")?.dataset?.tab||"all",p=document.getElementById("violations-list");if(p&&(d==="all"?p.innerHTML=this.renderViolationsList():d==="employees"?p.innerHTML=this.renderEmployeeViolationsList():d==="contractors"&&(p.innerHTML=this.renderContractorViolationsList())),d==="all"){const f=document.getElementById("violations-stats-cards");f&&(f.outerHTML=this.renderAllViolationsStats())}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639:",d)}}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",c),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+(c.message||String(c))),s&&(s.disabled=!1,s.innerHTML=l||'<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629')}},_buildViolationReportTableHtml(e){const t=this.normalizeViolationRecord(e)||e,i=(r,l="\u2014")=>Utils.escapeHTML(String(r==null||r===""?l:r)),o=r=>{if(!r)return"\u2014";const l=new Date(r);return Number.isNaN(l.getTime())?String(r):l.toLocaleString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})},n=t.personType==="contractor"||!!t.contractorName,a=(r,l,c={})=>`
            <div class="vr-info ${c.wide?"vr-info-wide":""}">
                <span class="vr-label">${i(r,"")}</span>
                <strong class="vr-value ${c.accent||""}">${i(l)}</strong>
            </div>`,s=this.processPhoto(t.photo);return`
            <style>
                .violation-report{--vr-navy:#102a43;--vr-red:#b91c1c;--vr-gold:#d97706;--vr-ink:#172033;direction:rtl;color:var(--vr-ink);font-family:'Cairo','Tahoma','Segoe UI',sans-serif;letter-spacing:0}
                .violation-report *{box-sizing:border-box;letter-spacing:0}
                .vr-banner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 18px;margin:0 0 14px;border-radius:12px;background:linear-gradient(125deg,var(--vr-navy),#173d6c);color:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                .vr-banner-title{font-size:18px;font-weight:800}.vr-banner-sub{margin-top:3px;color:#bfdbfe;font-size:10px}
                .vr-code{min-width:130px;padding:8px 12px;border:1px solid rgba(255,255,255,.3);border-radius:9px;text-align:center;background:rgba(255,255,255,.09)}
                .vr-code small{display:block;color:#bae6fd;font-size:9px}.vr-code strong{display:block;margin-top:2px;font-size:13px}
                .vr-section{margin:0 0 12px;border:1px solid #dbe5ef;border-radius:11px;overflow:hidden;page-break-inside:avoid;background:#fff}
                .vr-section-title{display:flex;align-items:center;gap:7px;padding:8px 12px;border-bottom:1px solid #dbe5ef;color:var(--vr-navy);background:#eff6ff;font-size:12px;font-weight:800;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                .vr-section-title:before{content:'';width:4px;height:17px;border-radius:4px;background:#0891b2}
                .vr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0}
                .vr-info{min-height:55px;padding:9px 12px;border-bottom:1px solid #edf2f7;border-left:1px solid #edf2f7}.vr-info-wide{grid-column:1/-1}
                .vr-label{display:block;margin-bottom:4px;color:#64748b;font-size:9px;font-weight:700}.vr-value{display:block;color:#172033;font-size:11px;line-height:1.65;overflow-wrap:anywhere;white-space:pre-wrap}
                .vr-value.vr-danger{color:#b91c1c}.vr-value.vr-success{color:#047857}.vr-value.vr-money{color:#166534;font-size:13px}
                .vr-photo{padding:12px;text-align:center;background:#f8fafc}.vr-photo img{display:block;max-width:100%;max-height:310px;margin:auto;border:2px solid #dbe5ef;border-radius:10px;object-fit:contain}
                .vr-signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px;page-break-inside:avoid}.vr-sign{min-height:68px;padding:9px;border:1px dashed #94a3b8;border-radius:9px;text-align:center;color:#64748b;font-size:9px}.vr-sign strong{display:block;margin-bottom:28px;color:#334155;font-size:10px}
                .vr-footnote{margin-top:10px;padding-top:8px;border-top:1px solid #e2e8f0;color:#64748b;text-align:center;font-size:8px}
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
                            ${a("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644",t.contractorName)}
                            ${a("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644",t.contractorId)}
                            ${a("\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641",t.contractorWorker||t.employeeName||t.contractorName)}
                            ${a("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.contractorPosition)}
                            ${a("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",t.contractorDepartment)}
                            ${a("\u0646\u0648\u0639 \u0627\u0644\u0633\u062C\u0644","\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644")}
                        `:`
                            ${a("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",t.employeeName)}
                            ${a("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",t.employeeCode||t.employeeNumber)}
                            ${a("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.employeePosition)}
                            ${a("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",t.employeeDepartment)}
                        `}
                    </div>
                </section>

                <section class="vr-section">
                    <div class="vr-section-title">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div>
                    <div class="vr-grid">
                        ${a("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationType)}
                        ${a("\u0645\u0639\u0631\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationTypeId)}
                        ${a("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationDate?Utils.formatDate(t.violationDate):"\u2014")}
                        ${a("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationTime)}
                        ${a("\u0627\u0644\u0645\u0648\u0642\u0639",t.violationLocation)}
                        ${a("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0648\u0642\u0639",t.violationLocationId)}
                        ${a("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationPlace)}
                        ${a("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0643\u0627\u0646",t.violationPlaceId)}
                        ${a("\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629",t.severity,{accent:"vr-danger"})}
                        ${a("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.status,{accent:t.status==="\u0645\u062D\u0644\u0648\u0644"?"vr-success":"vr-danger"})}
                        ${a("\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0634\u0647\u0631",t.violationSequenceInMonth)}
                        ${a("\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",this.formatFineAmount(Number(this.getEffectiveFineAmount(t))),{accent:"vr-money"})}
                        ${a("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",t.violationDetails,{wide:!0})}
                        ${a("\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630",t.actionTaken,{wide:!0})}
                    </div>
                </section>

                <section class="vr-section">
                    <div class="vr-section-title">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</div>
                    <div class="vr-grid">
                        ${a("\u0627\u0644\u0645\u0639\u0631\u0641 \u0627\u0644\u062F\u0627\u062E\u0644\u064A \u0644\u0644\u0633\u062C\u0644",t.id)}
                        ${a("\u0643\u0648\u062F ISO",t.isoCode)}
                        ${a("\u062A\u0627\u0631\u064A\u062E \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0633\u062C\u0644",o(t.createdAt))}
                        ${a("\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B",o(t.updatedAt))}
                    </div>
                </section>

                ${s?`<section class="vr-section"><div class="vr-section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div><div class="vr-photo"><img src="${i(s,"")}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" onerror="this.style.display='none'"></div></section>`:""}

                <div class="vr-signatures">
                    <div class="vr-sign"><strong>\u0645\u0645\u062B\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u062E\u0627\u0644\u0641</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                </div>
                <div class="vr-footnote">\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A - \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${i(o(new Date().toISOString()))}</div>
            </div>`},_generateViolationPrintDocumentHtml(e,t){const i=this.normalizeViolationRecord(e)||e,o=this._buildViolationReportTableHtml(i),n=i.isoCode||`VIOL-${i.id?.substring(0,8)||"UNKNOWN"}`;if(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function")return FormHeader.generatePDFHTML(n,t,o,!1,!1,{version:"1.0",includeQRCode:!1},i.createdAt,i.updatedAt);const a=typeof AppState<"u"&&AppState.companySettings?.name?Utils.escapeHTML(AppState.companySettings.name):"";return`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${Utils.escapeHTML(t)}</title>
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;padding:24px;color:#111;} h1{font-size:1.25rem;margin:0 0 8px;} .co{color:#475569;font-size:0.9rem;margin-bottom:20px;white-space:nowrap;word-break:keep-all;overflow-wrap:normal;}
table{border-collapse:collapse;width:100%;} th,td{border:1px solid #e2e8f0;padding:10px 12px;text-align:right;font-size:0.95rem;} th{background:#f1f5f9;width:30%;color:#334155;}
</style></head><body>
<h1>${Utils.escapeHTML(t)}</h1>
${a?`<div class="co">${a}</div>`:""}
${o}
</body></html>`},async _completeViolationReportPrint(e){const t=new Blob([e],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(t),o=window.open(i,"_blank");if(!o)throw URL.revokeObjectURL(i),new Error("popup_blocked");await new Promise((n,a)=>{o.onload=()=>{try{const s=o.document.querySelectorAll("img");let r=0;const l=s.length;let c=!1;const d=()=>{c||(c=!0,setTimeout(()=>{o.print(),setTimeout(()=>URL.revokeObjectURL(i),1e3),n()},300))};if(l===0){d();return}const p=()=>{r>=l&&d()};s.forEach(f=>{f.complete?(r++,p()):(f.onload=()=>{r++,p()},f.onerror=()=>{r++,p()})}),setTimeout(()=>d(),3500)}catch(s){a(s)}}})},async printViolationProfessional(e){const t=AppState.appData?.violations?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show();const i=this._generateViolationPrintDocumentHtml(t,"\u0628\u0637\u0627\u0642\u0629 \u0645\u062E\u0627\u0644\u0641\u0629 \u2014 \u0646\u0633\u062E\u0629 \u0637\u0628\u0627\u0639\u0629");await this._completeViolationReportPrint(i)}catch(i){i&&i.message==="popup_blocked"?Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"):(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",i),Notification.error("\u0641\u0634\u0644 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(i.message||"")))}finally{Loading.hide()}},_safeViolationReportFilePart(e,t="\u0633\u062C\u0644"){return String(e||t).trim().replace(/[\u0000-\u001f<>:"/\\|?*]+/g,"_").replace(/\s+/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"")||t},_readViolationReportImageBlob_(e){return new Promise(t=>{if(!e||!String(e.type||"").toLowerCase().startsWith("image/")){t("");return}try{const i=new FileReader;i.onload=()=>t(typeof i.result=="string"?i.result:""),i.onerror=()=>t(""),i.readAsDataURL(e)}catch{t("")}})},async _resolveViolationReportPhoto_(e){const t=this.processPhoto(e);if(!t)return"";if(/^data:image\//i.test(t))return t;const i=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{canonical:t,displaySrc:t,needsProxy:!1,proxyFileId:""};if(i.needsProxy&&i.proxyFileId&&typeof Utils.fetchDriveImageDataUri=="function")try{const n=await Utils.fetchDriveImageDataUri(i.proxyFileId);if(n&&/^data:image\//i.test(n))return n}catch{}const o=i.canonical||t;if(/^(https?:|blob:)/i.test(o)&&typeof fetch=="function")try{const n=await fetch(o,{method:"GET",credentials:"omit",mode:"cors"});if(n.ok){const a=await this._readViolationReportImageBlob_(await n.blob());if(a)return a}}catch{}return o},async downloadViolationReport(e,t=null){const i=AppState.appData?.violations?.find(s=>s.id===e);if(!i)return Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),!1;const o=this.normalizeViolationRecord(i)||i,n=o.personType==="contractor"||!!o.contractorName,a=t?.innerHTML||"";try{t&&(t.disabled=!0,t.setAttribute("aria-busy","true"),t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),Loading.show();const s=n?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",r=await this._resolveViolationReportPhoto_(o.photo),l={...o,photo:r},c=this._generateViolationPrintDocumentHtml(l,s),d=n?o.contractorName||o.contractorWorker:o.employeeName,p=o.isoCode||o.id||"\u0633\u062C\u0644",f=o.violationDate?String(o.violationDate).slice(0,10):new Date().toISOString().slice(0,10),m=["\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629",this._safeViolationReportFilePart(d,n?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"),this._safeViolationReportFilePart(p),this._safeViolationReportFilePart(f)].join("_")+".pdf";if(!await this._downloadHtmlReportAsPdf(c,m))throw new Error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF");return Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),!0}catch(s){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+(s.message||"")),!1}finally{Loading.hide(),t&&(t.disabled=!1,t.removeAttribute("aria-busy"),t.innerHTML=a||'<i class="fas fa-file-download"></i>')}},async exportPDF(e,t=null){return this.downloadViolationReport(e,t)},async loadBlacklistDataAsync(){try{(typeof AppState>"u"||!AppState.appData)&&(AppState.appData={}),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]);const e=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,t=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";if(!e||!t){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Integration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637");return}const i=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Blacklist_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(n=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist \u0645\u0646 Google Sheets:",n),{success:!1,data:[]}));let o=!1;if(i&&i.success&&Array.isArray(i.data)?(AppState.appData.blacklistRegister=i.data,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.data.length} \u0633\u062C\u0644 Blacklist \u0645\u0646 Google Sheets`)):AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",e),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[])}},refreshBlacklistDisplay(){const e=document.getElementById("violations-tab-content");if(!(!e||!document.querySelector('.tab-btn.active[data-tab="blacklist"]')))try{const i=e.querySelector(".card-body");if(i){const a=i.querySelector(".grid.grid-cols-1")||i.querySelector(".grid")||i.querySelector('[class*="grid-cols"]');if(a&&a.parentElement)a.outerHTML=this.renderBlacklistStats();else{const s=i.querySelector("div > div.grid");s&&(s.outerHTML=this.renderBlacklistStats())}}const o=document.getElementById("blacklist-cards-container");o&&(o.innerHTML=this.renderBlacklistCards());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable()),this.setupBlacklistEventListeners()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 Blacklist:",i)}},renderBlacklistTab(){return`
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
        `},renderBlacklistStats(){const e=AppState.appData?.blacklistRegister||[],t=e.length,i=new Date().getMonth(),o=new Date().getFullYear(),n=e.filter(r=>{if(!r.banDate)return!1;const l=new Date(r.banDate);return l.getMonth()===i&&l.getFullYear()===o}).length,a=new Set;e.forEach(r=>{r.factory&&r.location?a.add(`${r.factory} - ${r.location}`):r.factory?a.add(r.factory):r.location&&a.add(r.location)});const s=a.size;return`
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
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${e.filter(r=>r.banReason&&r.banReason.length>50).length.toLocaleString("en-US")}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0639 \u062A\u0641\u0627\u0635\u064A\u0644</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-factory-location" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border: none; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(124, 58, 237, 0.4), 0 4px 6px -2px rgba(124, 58, 237, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-industry"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof s=="number"?s.toLocaleString("en-US"):s}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0627\u0644\u0645\u0635\u0646\u0639 - \u0627\u0644\u0645\u0648\u0642\u0639</p>
                    </div>
                </div>
            </div>
        `},getPhotoSource(e){return typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?Utils.extractImageSourceCandidate(e):e&&typeof e=="string"?e:""},normalizeGoogleDrivePhotoUrl(e){return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"?Utils.normalizeGoogleDriveImageUrl(e):String(e||"").trim()},processPhoto(e){if(typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"){const n=Utils.normalizeImageSource(e);if(n)return n}const t=this.getPhotoSource(e);if(!t)return null;let i=String(t).trim().replace(/^['"`]+|['"`]+$/g,"");if(!i)return null;if(i.startsWith("blob:"))return i;if(/^data:image\//i.test(i)){const n=i.indexOf(",");if(n===-1)return i.replace(/\s+/g,"");const a=i.slice(0,n).replace(/\s+/g,""),s=i.slice(n+1).replace(/\s+/g,"");return s?`${a},${s}`:null}if(/^https?:\/\//i.test(i))return this.normalizeGoogleDrivePhotoUrl(i);const o=i.replace(/\s+/g,"");return o.length>100&&/^[A-Za-z0-9+/=]+$/.test(o.substring(0,Math.min(120,o.length)))?"data:image/jpeg;base64,"+o:(AppState.debugMode,null)},_onBlacklistCardPhotoError(e){try{if(!e)return;e.onerror=null;const t=document.createElement("div");t.className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800",t.innerHTML='<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>',e.replaceWith(t)}catch{}},_onBlacklistTablePhotoError(e){try{if(!e)return;e.onerror=null,e.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}},_hydrateBlacklistDrivePhotos(){try{if(typeof Utils.hydrateDriveProxyImages!="function")return;const e=o=>{if(!o)return;const n=o.className||"";n.indexOf("blacklist-table-photo")!==-1?this._onBlacklistTablePhotoError(o):n.indexOf("blacklist-detail-photo")!==-1?this._onBlacklistTablePhotoError(o):n.indexOf("blacklist-form-photo")!==-1?this._onBlacklistTablePhotoError(o):this._onBlacklistCardPhotoError(o)},t=document.getElementById("blacklist-cards-container"),i=document.getElementById("blacklist-table");t&&Utils.hydrateDriveProxyImages(t,{onFetchFail:e}),i&&Utils.hydrateDriveProxyImages(i,{onFetchFail:e})}catch{}},renderBlacklistCards(){const e=AppState.appData?.blacklistRegister||[];return e.length===0?`
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    <p class="text-gray-400 text-sm mt-2">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F</p>
                </div>
            `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[...e].sort((i,o)=>{const n=new Date(i.banDate||i.createdAt||0);return new Date(o.banDate||o.createdAt||0)-n}).map(i=>{const o=this.processPhoto(i),n=o&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(o):{canonical:o||"",displaySrc:o||"",needsProxy:!1,proxyFileId:""},a=n.canonical?n.displaySrc:"",s=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${o?`
                                            <img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629"${s}
                                                data-photo-url="${Utils.escapeHTML(o)}"
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
        `},async showBlacklistForm(e=null){const t=!!e;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(b){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",b)}const i=AppState.appData?.blacklistRegister||[],o=i.length>0?Math.max(...i.map(b=>parseInt(b.serialNumber)||0))+1:1,n=this.getSiteOptions(),a=n.map(b=>`<option value="${Utils.escapeHTML(b.name)}" data-site-id="${b.id}" ${e?.factory===b.name||e?.factoryId===b.id?"selected":""}>${Utils.escapeHTML(b.name)}</option>`).join(""),c=((AppState.appData?.formSettings||{}).departments||[]).map(b=>typeof b=="object"?b.name:b).filter(Boolean).map(b=>`<option value="${Utils.escapeHTML(b)}"></option>`).join(""),d=e?.factoryId||n.find(b=>b.name===e?.factory)?.id||"",p=d?this.getPlaceOptions(d).map(b=>`<option value="${Utils.escapeHTML(b.name)}" data-place-id="${b.id}" ${e?.location===b.name||e?.locationId===b.id?"selected":""}>${Utils.escapeHTML(b.name)}</option>`).join(""):'<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B --</option>',f=AppState.currentUser||{name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",email:""},m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
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
                    ${this.renderBlacklistFormContent(e,o,a,p,c,f)}
                </div>
            </div>
        `,document.body.appendChild(m),this.setupBlacklistFormInModal(m,e).catch(b=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C Blacklist:",b)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(m,{onFetchFail:b=>this._onBlacklistTablePhotoError(b)}),m.addEventListener("click",b=>{b.target===m&&m.remove()});const $=b=>{b.key==="Escape"&&document.body.contains(m)&&(m.remove(),document.removeEventListener("keydown",$))};document.addEventListener("keydown",$)},renderBlacklistFormContent(e,t,i,o,n,a){const s=!!e,r=this.processPhoto(e),l=r&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r||"",displaySrc:r||"",needsProxy:!1,proxyFileId:""},c=l.canonical?l.displaySrc:"",d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`
            <form id="blacklist-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644) -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                            \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
                        </label>
                        <input type="text" id="blacklist-serial" class="form-input" 
                            value="${s&&e.serialNumber||t}" 
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
                            ${o}
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
                            value="${Utils.escapeHTML(e?.editor||a.name)}" 
                            readonly>
                    </div>

                    <!-- \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-image ml-2"></i>
                            \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629
                        </label>
                        <input type="file" id="blacklist-photo-input" accept="image/*" class="form-input">
                        <div id="blacklist-photo-preview" class="mt-2 ${r?"":"hidden"}">
                            <img src="${c?Utils.escapeHTML(c):""}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${d}
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
                        <i class="fas fa-save ml-2"></i>${s?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644"}
                    </button>
                </div>
            </form>
        `},async setupBlacklistFormInModal(e,t){const i=!!t,o=e.querySelector("#blacklist-form");o&&(o.dataset.editId=i?t.id:""),o&&o.addEventListener("submit",c=>this.handleBlacklistSubmit(c));const n=e.querySelector("#blacklist-cancel-btn");n&&n.addEventListener("click",()=>{e.remove()});const a=e.querySelector("#blacklist-photo-input");a&&a.addEventListener("change",c=>this.handleBlacklistPhotoUpload(c));const s=e.querySelector("#blacklist-contractor"),r=e.querySelector("#blacklist-contractors-list");if(s&&r)try{let c=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(c=Contractors.getAllContractorsForModules()||[]),c.length===0){const d=[...AppState.appData?.approvedContractors||[],...AppState.appData?.contractors||[]].filter(f=>f&&f.isActive!=="inactive"&&f.isActive!==!1&&f.isActive!=="false"&&f.isActive!=="FALSE");c=Array.from(new Map(d.map(f=>[f.id||f.contractorId,f])).values()).filter(f=>f&&(f.name||f.companyName||f.contractorName)).map(f=>({id:f.id||f.contractorId||"",name:(f.name||f.companyName||f.contractorName||"").trim()})).filter(f=>f.name&&f.name!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641").sort((f,m)=>f.name.localeCompare(m.name,"ar",{sensitivity:"base"}))}if(r.innerHTML=c.map(d=>`<option value="${Utils.escapeHTML(d.name)}" data-contractor-id="${d.id||""}"></option>`).join(""),t?.contractor){const d=t.contractor.split(" - ")[0].trim();s.value=d}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",c)}const l=e.querySelector("#blacklist-factory");if(l&&(l.addEventListener("change",async c=>{const d=c.target.selectedOptions[0],p=d?.dataset.siteId||d?.value;await this.loadBlacklistPlaces(p)}),i&&t?.factoryId)){const c=t.factoryId;try{await this.loadBlacklistPlaces(c),setTimeout(()=>{const d=e.querySelector("#blacklist-location");d&&t?.location&&(d.value=t.location)},100)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",d)}}},renderBlacklistTable(){const t=[...AppState.appData?.blacklistRegister||[]].sort((i,o)=>{const n=new Date(i.banDate||i.createdAt||0);return new Date(o.banDate||o.createdAt||0)-n});return t.length===0?`
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
                            ${t.map(i=>{const o=this.processPhoto(i),n=o&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(o):{canonical:o||"",displaySrc:o||"",needsProxy:!1,proxyFileId:""},a=n.canonical?n.displaySrc:"",s=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
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
                                        ${o?`<img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629"${s} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
                                                data-photo-url="${Utils.escapeHTML(o)}"
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
        `},async setupBlacklistEventListeners(){setTimeout(async()=>{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",r)}const e=document.getElementById("blacklist-form");if(e&&!e.closest(".modal-overlay")){const r=e.cloneNode(!0);e.parentNode.replaceChild(r,e),r.addEventListener("submit",l=>this.handleBlacklistSubmit(l))}const t=document.getElementById("blacklist-photo-input");t&&!t.closest(".modal-overlay")&&t.addEventListener("change",r=>this.handleBlacklistPhotoUpload(r));const i=document.getElementById("blacklist-search");if(i){const r=i.cloneNode(!0);i.parentNode.replaceChild(r,i),r.addEventListener("input",l=>this.filterBlacklistTable(l.target.value))}const o=document.getElementById("blacklist-add-btn");o?o.dataset.listenerAttached?AppState.debugMode&&Utils.safeLog('\u2139\uFE0F \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0645\u0631\u0628\u0648\u0637 \u0645\u0633\u0628\u0642\u0627\u064B'):(o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();try{this.showBlacklistForm()}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C Blacklist:",l),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}}),o.dataset.listenerAttached="true",AppState.debugMode&&Utils.safeLog('\u2705 \u062A\u0645 \u0631\u0628\u0637 \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0628\u0646\u062C\u0627\u062D')):AppState.debugMode&&Utils.safeWarn('\u26A0\uFE0F \u0632\u0631 "blacklist-add-btn" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM');const n=document.getElementById("blacklist-factory");n&&!n.closest(".modal-overlay")&&n.addEventListener("change",async r=>{const l=r.target.selectedOptions[0],c=l?.dataset.siteId||l?.value;await this.loadBlacklistPlaces(c)});const a=document.getElementById("blacklist-export-pdf");if(a){const r=a.cloneNode(!0);a.parentNode.replaceChild(r,a),r.addEventListener("click",()=>this.exportBlacklistToPDF())}const s=document.getElementById("blacklist-export-excel");if(s){const r=s.cloneNode(!0);s.parentNode.replaceChild(r,s),r.addEventListener("click",()=>this.exportBlacklistToExcel())}this._hydrateBlacklistDrivePhotos()},100)},async handleBlacklistSubmit(e){e.preventDefault();const t=e.target,i=!!t.dataset.editId;let o=i&&AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.photo||"";const n=t.closest(".modal-overlay"),a=n?n.querySelector("#blacklist-photo-input"):document.getElementById("blacklist-photo-input");if(a?.files?.[0]){const f=a.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}try{o=await this.convertImageToBase64(f)}catch(m){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",m)}}const s=n?n.querySelector("#blacklist-factory"):document.getElementById("blacklist-factory"),r=n?n.querySelector("#blacklist-location"):document.getElementById("blacklist-location"),l=s?.selectedOptions[0],c=r?.selectedOptions[0],d=f=>(n?n.querySelector(`#${f}`):document.getElementById(f))?.value||"",p={id:t.dataset.editId||Utils.generateId("BLACKLIST"),serialNumber:d("blacklist-serial"),factory:s?.value||"",factoryId:l?.dataset.siteId||"",location:r?.value||"",locationId:c?.dataset.placeId||"",fullName:d("blacklist-name"),idNumber:d("blacklist-id-number"),photo:o,job:d("blacklist-job"),contractor:(d("blacklist-contractor")||"").trim().split(" - ")[0],department:d("blacklist-department"),banReason:d("blacklist-ban-reason"),banDate:d("blacklist-ban-date"),bannedBy:d("blacklist-banned-by"),editor:d("blacklist-editor"),notes:d("blacklist-notes"),createdAt:i?AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(o&&o.startsWith("data:"))try{const f=await GoogleIntegration.uploadFileToDrive?.(o,`blacklist_${p.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");f?.success&&(f.directLink||f.shareableLink)?(p.photo=f.directLink||f.shareableLink,AppState.debugMode):(AppState.debugMode,Notification.warning("\u0641\u0634\u0644 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649 Drive. \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0624\u0642\u062A\u0627\u064B."))}catch(f){AppState.debugMode&&Utils.safeWarn("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",f),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+f.message)}await this.saveBlacklistRecord(p,i)},async saveBlacklistRecord(e,t){Loading.show();try{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),t){const s=AppState.appData.blacklistRegister.findIndex(r=>r.id===e.id);s!==-1?AppState.appData.blacklistRegister[s]=e:AppState.appData.blacklistRegister.push(e)}else AppState.appData.blacklistRegister.push(e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(s){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",s),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets")}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D`);const i=document.querySelector(".modal-overlay");i&&i.querySelector("#blacklist-form")&&i.remove();const o=document.getElementById("blacklist-cards-container");o&&(o.innerHTML=this.renderBlacklistCards(),this.setupBlacklistEventListeners());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable(),this.setupBlacklistEventListeners());const a=document.querySelector("#violations-tab-content .card-body");if(a){const s=a.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");s&&(s.outerHTML=this.renderBlacklistStats())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644: "+i.message)}},handleBlacklistPhotoUpload(e){const t=e.target.files?.[0];if(!t)return;const i=new FileReader;i.onload=o=>{const n=document.querySelector(".modal-overlay"),a=n?n.querySelector("#blacklist-photo-preview"):document.getElementById("blacklist-photo-preview"),s=n?n.querySelector("#blacklist-photo-img"):document.getElementById("blacklist-photo-img");a&&s&&(s.src=o.target.result,a.classList.remove("hidden"))},i.readAsDataURL(t)},async loadBlacklistPlaces(e){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.querySelector(".modal-overlay"),i=t?t.querySelector("#blacklist-location"):document.getElementById("blacklist-location");if(!i)return;i.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',this.getPlaceOptions(e).forEach(n=>{const a=document.createElement("option");a.value=n.name,a.dataset.placeId=n.id,a.textContent=n.name,i.appendChild(a)})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t)}},filterBlacklistTable(e){const t=document.getElementById("blacklist-table-body");if(!t)return;const i=t.querySelectorAll("tr"),o=e.toLowerCase();i.forEach(n=>{const a=n.textContent.toLowerCase();n.style.display=a.includes(o)?"":"none"})},editBlacklistRecord(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showBlacklistForm(t)},async deleteBlacklistRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData?.blacklistRegister&&(AppState.appData.blacklistRegister=AppState.appData.blacklistRegister.filter(i=>i.id!==e)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",i),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets")}Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn.active[data-tab="blacklist"]')&&await this.switchTab("blacklist")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",t),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+t.message)}}},viewBlacklistPhoto(e){if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629");return}const t=this.processPhoto(e);if(!t){Notification.error("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}const i=n=>{const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a)},o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{needsProxy:!1,proxyFileId:""};if(o.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function"){Utils.fetchDriveImageDataUri(o.proxyFileId).then(n=>{n?i(n):Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0646 Google Drive")}).catch(()=>Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"));return}i(t)},viewBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(r=>r.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t),o=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},n=o.canonical?o.displaySrc:"",a=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"",s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                            <img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${a}
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
                    <button type="button" class="btn-warning" onclick="Violations.editBlacklistRecord('${e}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    <button type="button" class="btn-danger" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F')) { Violations.deleteBlacklistRecord('${e}'); this.closest('.modal-overlay').remove(); }">
                        <i class="fas fa-trash ml-2"></i>\u062D\u0630\u0641
                    </button>
                    <button type="button" class="btn-primary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:r=>this._onBlacklistTablePhotoError(r)})},printBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(o=>o.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t);try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const o=`BLACKLIST-${(t.id||t.serialNumber||"UNKNOWN").substring(0,12)}`,n="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Details",a=`
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
            `,s=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(o,n,a,!1,!0,{version:"1.0",releaseDate:t.createdAt||new Date().toISOString(),revisionDate:t.updatedAt||t.createdAt||new Date().toISOString(),"\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A":t.serialNumber||t.id||"",qrData:{type:"Blacklist",id:t.id,serialNumber:t.serialNumber}},t.createdAt||new Date().toISOString(),t.updatedAt||t.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${n}</title></head><body>${a}</body></html>`,r=new Blob([s],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(r),c=window.open(l,"_blank");c?c.onload=()=>{setTimeout(()=>{c.print(),setTimeout(()=>{URL.revokeObjectURL(l),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(o){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:",o),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+o.message)}},async exportBlacklistToPDF(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF..."),typeof window.jsPDF<"u")try{const{jsPDF:a}=window.jsPDF,s=new a("l","mm","a4");s.setFontSize(18),s.text("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Register",150,15,{align:"center"}),s.setFontSize(10),s.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${Utils.formatDateTime(new Date().toISOString())}`,14,22),s.text(`\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,14,27);const r=e.map(c=>[c.serialNumber||"-",c.banDate?Utils.formatDate(c.banDate):"-",Utils.escapeHTML(c.factory||"-"),Utils.escapeHTML(c.location||"-"),Utils.escapeHTML(c.fullName||"-"),Utils.escapeHTML(c.idNumber||"-"),Utils.escapeHTML(c.job||"-"),Utils.escapeHTML(c.contractor||"-"),Utils.escapeHTML(c.department||"-"),Utils.escapeHTML(c.bannedBy||"-"),Utils.escapeHTML(c.banReason||"-").substring(0,50)]);if(typeof s.autoTable<"u")s.autoTable({head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0634\u0631\u0643\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639"]],body:r,startY:35,styles:{fontSize:7,font:"Arial",cellPadding:2},headStyles:{fillColor:[59,130,246],textColor:255,fontSize:8},alternateRowStyles:{fillColor:[245,247,250]},margin:{left:14,right:14},overflow:"linebreak"});else{let c=35;r.forEach((d,p)=>{c>180&&(s.addPage(),c=20),s.setFontSize(8),s.text(`${p+1}. ${d[4]} - ${d[3]}`,14,c),c+=7})}const l=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.pdf`;s.save(l),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF \u0628\u0646\u062C\u0627\u062D");return}catch(a){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 jsPDF\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0637\u0631\u064A\u0642\u0629 HTML:",a)}const t=`
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
            ${e.map(a=>`
                <tr>
                    <td>${Utils.escapeHTML(a.serialNumber||"-")}</td>
                    <td>${a.banDate?Utils.formatDate(a.banDate):"-"}</td>
                    <td>${Utils.escapeHTML(a.factory||"-")}</td>
                    <td>${Utils.escapeHTML(a.location||"-")}</td>
                    <td>${Utils.escapeHTML(a.fullName||"-")}</td>
                    <td>${Utils.escapeHTML(a.idNumber||"-")}</td>
                    <td>${Utils.escapeHTML(a.job||"-")}</td>
                    <td>${Utils.escapeHTML(a.contractor||"-")}</td>
                    <td>${Utils.escapeHTML(a.department||"-")}</td>
                    <td>${Utils.escapeHTML(a.bannedBy||"-")}</td>
                    <td>${Utils.escapeHTML(a.editor||"-")}</td>
                    <td>${Utils.escapeHTML((a.banReason||"-").substring(0,100))}</td>
                    <td>${Utils.escapeHTML((a.notes||"-").substring(0,50))}</td>
                </tr>
            `).join("")}
        </tbody>
    </table>
</body>
</html>`,i=new Blob([t],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),n=window.open(o,"_blank");n?n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(o),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportBlacklistToExcel(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel..."),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS");return}const t=e.map(r=>({\u0645:r.serialNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639":r.banDate?Utils.formatDate(r.banDate):"",\u0627\u0644\u0645\u0635\u0646\u0639:r.factory||"",\u0627\u0644\u0645\u0648\u0642\u0639:r.location||"","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A":r.fullName||"","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629":r.idNumber||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:r.job||"","\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644":r.contractor||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:r.department||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639":r.bannedBy||"","\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":r.editor||"","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639":r.banReason||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:r.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDateTime(r.createdAt):"","\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":r.updatedAt?Utils.formatDateTime(r.updatedAt):""})),i=XLSX.utils.book_new(),o=XLSX.utils.json_to_sheet(t),n=[{wch:8},{wch:12},{wch:15},{wch:15},{wch:25},{wch:15},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:40},{wch:40},{wch:18},{wch:18}];o["!cols"]=n,XLSX.utils.book_append_sheet(i,o,"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646");const s=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof Violations<"u"&&(window.Violations=Violations,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Violations module loaded and available on window.Violations"))}catch{if(typeof window<"u"&&typeof Violations<"u")try{window.Violations=Violations}catch{}}})();
