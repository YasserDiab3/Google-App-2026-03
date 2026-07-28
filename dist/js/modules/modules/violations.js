const Violations={_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const o=e||document.getElementById("viol-analytics-root");o&&(typeof t.applyI18n=="function"&&t.applyI18n(o),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(o))},currentFilters:{search:"",personType:"",violationType:"",severity:"",status:""},parseFineAmount(e){if(e==null||e==="")return 0;if(typeof e=="number")return Number.isFinite(e)&&e>=0?e:0;const t="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",o="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",i=l=>String(l||"").replace(/[٠-٩۰-۹]/g,c=>{const s=t.indexOf(c);if(s>=0)return String(s);const d=o.indexOf(c);return d>=0?String(d):c}),n=String(e).trim(),a=i(n).replace(/[,\u066C]/g,"").replace(/\u066B/g,".").replace(/[^\d.\-]/g,""),r=Number(a);return Number.isFinite(r)&&r>=0?r:0},_VIOL_CURRENCY_KEY:"viol_currency",_VIOL_RATE_KEY:"viol_exchange_rate",_VIOL_DEFAULT_RATE:50,getCurrentCurrency(){try{return localStorage.getItem(this._VIOL_CURRENCY_KEY)==="USD"?"USD":"EGP"}catch{return"EGP"}},setCurrentCurrency(e){const t=e==="USD"?"USD":"EGP";try{localStorage.setItem(this._VIOL_CURRENCY_KEY,t)}catch{}return t},getExchangeRate(){try{const e=parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));return Number.isFinite(e)&&e>0?e:this._VIOL_DEFAULT_RATE}catch{return this._VIOL_DEFAULT_RATE}},setExchangeRate(e){const t=parseFloat(e);if(!Number.isFinite(t)||t<=0)return!1;try{localStorage.setItem(this._VIOL_RATE_KEY,String(t))}catch{}return!0},convertFineAmount(e,t){const o=t||this.getCurrentCurrency(),i=Number(e)||0;if(o==="USD"){const n=this.getExchangeRate();return n>0?i/n:0}return i},formatFineAmount(e,t={}){const o=t.currency||this.getCurrentCurrency(),i=o==="USD"?"$":"\u062C.\u0645",n=this.convertFineAmount(e,o),a=o==="USD"?n.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):n.toLocaleString("en-US",{maximumFractionDigits:0});return o==="USD"?`${a} $`:`${a} ${i}`},getCurrencyLabel(e="short"){return this.getCurrentCurrency()==="USD"?e==="long"?this._t("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):"$":e==="long"?this._t("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"):this._t("module.violations.analytics.currency.egp_short","\u062C.\u0645")},normalizeViolationRecord(e){if(!e||typeof e!="object")return null;const t=e.fineAmount??e.defaultFineAmount??e.fine_amount??e.fine??e.amount??e["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"]??e["\u0642\u064A\u0645\u0629 \u0645\u0627\u0644\u064A\u0629"]??0,o=this.parseFineAmount(t),i=e.personType||(e.contractorName?"contractor":"employee");return{...e,personType:i,fineAmount:o}},_escapeIdForHandler(e){return JSON.stringify(e==null?"":String(e))},getEffectiveFineAmount(e){const t=this.normalizeViolationRecord(e);if(!t)return 0;const o=this.parseFineAmount(t.fineAmount);if(o>0)return o;let i=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll&&(ViolationTypesManager.ensureInitialized(),i=ViolationTypesManager.getAll()||[])}catch{i=[]}!i.length&&typeof AppState<"u"&&Array.isArray(AppState?.appData?.violationTypes)&&(i=AppState.appData.violationTypes);const n=String(t.violationTypeId||"").trim(),a=String(t.violationType||"").trim().toLowerCase();let r=0;if(n){const l=i.find(c=>c&&String(c.id)===n);l&&(r=this.parseFineAmount(l.fineAmount))}if(r<=0&&a){const l=i.find(c=>c&&String(c.name||"").trim().toLowerCase()===a);l&&(r=this.parseFineAmount(l.fineAmount))}return r>0?r:o},_normKeyStr(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},sameViolationPersonForSequence(e,t){const o=this._normKeyStr(e.personType)||"employee",i=this._normKeyStr(t.personType)||"employee";if(o!==i)return!1;if(o==="contractor"){const r=this._normKeyStr(e.contractorName),l=this._normKeyStr(t.contractorName);if(!r||!l||r!==l)return!1;const c=this._normKeyStr(e.contractorWorker),s=this._normKeyStr(t.contractorWorker);return!c&&!s?!0:c===s}const n=this._normKeyStr(e.employeeCode||e.employeeNumber),a=this._normKeyStr(t.employeeCode||t.employeeNumber);return!!n&&n===a},getViolationYearMonthKey(e){const t=new Date(e);return isNaN(t.getTime())?null:t.getFullYear()*12+t.getMonth()},_violApprovalSettingsCache:null,_violApprovalSettingsCacheAt:0,_violApprovalRequestsCache:null,_violApprovalRequestsCacheAt:0,_violApprovalRequestsCacheKey:"",async getViolationApprovalSettings(){const e=Date.now();if(this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5)return this._violApprovalSettingsCache;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const t=await GoogleIntegration.sendRequest({action:"getViolationApprovalSettings",data:{__timeoutMs:2e4}});if(t&&t.success&&t.data)return this._violApprovalSettingsCache={requireApproval:t.data.requireApproval===!0,defaultApprovers:Array.isArray(t.data.defaultApprovers)?t.data.defaultApprovers:[],bypassRoles:Array.isArray(t.data.bypassRoles)?t.data.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]},this._violApprovalSettingsCacheAt=e,this._violApprovalSettingsCache}}catch(t){AppState.debugMode&&Utils.safeWarn("getViolationApprovalSettings:",t)}return{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},isCurrentUserBypassApproval(e){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState.currentUser?.role||"";if(Array.isArray(e)&&e.length>0){const o=String(t).toLowerCase();return e.some(i=>String(i).toLowerCase()===o||String(i)===t)}}catch{}return!1},async checkViolationApprovalGate(e,t={}){const o=await this.getViolationApprovalSettings();return!o||!o.requireApproval?{requiresApproval:!1,settings:o}:this.isCurrentUserBypassApproval(o.bypassRoles)?{requiresApproval:!1,settings:o,bypassed:!0}:!Array.isArray(o.defaultApprovers)||o.defaultApprovers.length===0?(AppState.debugMode&&Utils.safeWarn("approval required but no approvers configured \u2014 allowing direct save"),{requiresApproval:!1,settings:o,reason:"no_approvers"}):{requiresApproval:!0,settings:o}},async submitViolationForApproval(e,t={}){try{const i=((await this.getViolationApprovalSettings()).defaultApprovers||[]).slice(),n=AppState.currentUser||{},a={requestType:t.isEdit?"update":"add",violationData:e,originalViolationId:t.originalId||"",approvers:i,createdBy:n.id||n.email||"",createdByName:n.name||n.email||"",notes:t.notes||""};return await GoogleIntegration.sendRequest({action:"addViolationApprovalRequest",data:{...a,__timeoutMs:3e4}})||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"}}catch(o){return{success:!1,message:o?.message||String(o)}}},async fetchViolationApprovalRequests(e={}){try{const t=await GoogleIntegration.sendRequest({action:"getAllViolationApprovalRequests",data:{...e,__timeoutMs:25e3}});return t&&t.success&&Array.isArray(t.data)?t.data:[]}catch(t){return AppState.debugMode&&Utils.safeWarn("fetchViolationApprovalRequests:",t),[]}},async approveViolationRequest(e,t={}){const o=AppState.currentUser||{},i={userId:o.id||o.email||"",userName:o.name||"",userEmail:o.email||""};try{const n=await GoogleIntegration.sendRequest({action:"approveViolationApprovalRequest",data:{requestId:e,approver:i,notes:t.notes||"",force:t.force===!0,__timeoutMs:3e4}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async rejectViolationRequest(e,t){const o=AppState.currentUser||{},i={userId:o.id||o.email||"",userName:o.name||"",userEmail:o.email||""};try{const n=await GoogleIntegration.sendRequest({action:"rejectViolationApprovalRequest",data:{requestId:e,approver:i,reason:String(t||"").trim(),__timeoutMs:3e4}});return this._invalidateViolationApprovalRequestsCache(),n||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(n){return{success:!1,message:n?.message||String(n)}}},async saveViolationApprovalSettings(e){const t=AppState.currentUser||{};try{const o=await GoogleIntegration.sendRequest({action:"updateViolationApprovalSettings",data:{requireApproval:e.requireApproval===!0,defaultApprovers:Array.isArray(e.defaultApprovers)?e.defaultApprovers:[],bypassRoles:Array.isArray(e.bypassRoles)?e.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"],updatedBy:t.id||t.email||"",updatedByName:t.name||"",__timeoutMs:25e3}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),o||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(o){return{success:!1,message:o?.message||String(o)}}},_getViolationApprovalRequestsCacheKey(e,t){return e?"admin":String(t?.email||t?.id||"user")},_getCachedViolationApprovalRequests(e,t){const o=this._getViolationApprovalRequestsCacheKey(e,t),i=Date.now();return this._violApprovalRequestsCache&&this._violApprovalRequestsCacheKey===o&&i-this._violApprovalRequestsCacheAt<12e4?this._violApprovalRequestsCache:null},_setCachedViolationApprovalRequests(e,t,o){this._violApprovalRequestsCache=Array.isArray(e)?e:[],this._violApprovalRequestsCacheKey=this._getViolationApprovalRequestsCacheKey(t,o),this._violApprovalRequestsCacheAt=Date.now()},_invalidateViolationApprovalRequestsCache(){this._violApprovalRequestsCache=null,this._violApprovalRequestsCacheAt=0,this._violApprovalRequestsCacheKey=""},_cloneViolationApprovalSettings(e){const t=e||{};return{requireApproval:t.requireApproval===!0,defaultApprovers:Array.isArray(t.defaultApprovers)?t.defaultApprovers.map(o=>({...o})):[],bypassRoles:Array.isArray(t.bypassRoles)?[...t.bypassRoles]:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_getViolationApprovalSettingsSnapshot(){const e=Date.now();return this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5?this._cloneViolationApprovalSettings(this._violApprovalSettingsCache):{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_prefetchViolationApprovalPanelData(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},o={userEmail:e?"":t.email||"",userId:e?"":t.id||""};Promise.all([this.getViolationApprovalSettings(),this.fetchViolationApprovalRequests(o)]).then(([,i])=>{this._setCachedViolationApprovalRequests(i,e,t)}).catch(()=>{})},_buildViolationApprovalsSettingsHtml(e,t,o){if(!t)return"";const i=e||{requireApproval:!1,defaultApprovers:[]};return`
                    <div id="viol-approvals-settings-panel" style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:18px;">
                        <h4 style="margin:0 0 12px 0;color:#991b1b;font-size:1rem;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-cog"></i> \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F (\u0644\u0644\u0645\u062F\u064A\u0631)
                        </h4>
                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:14px;">
                            <input type="checkbox" id="viol-require-approval" ${i.requireApproval?"checked":""}
                                   style="width:18px;height:18px;cursor:pointer;">
                            <span style="font-weight:600;color:#374151;">\u062A\u0641\u0639\u064A\u0644 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                        </label>

                        <div style="margin-bottom:12px;">
                            <label style="display:block;font-weight:600;color:#374151;margin-bottom:6px;">\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u0639\u064A\u064E\u0651\u0646\u0648\u0646:</label>
                            <div id="viol-approvers-list" style="display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;min-height:48px;">
                                ${(i.defaultApprovers||[]).map((n,a)=>`
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
                                    ${o.map(n=>`
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
            </div>`;const t=(e.requests||[]).filter(o=>o.status==="pending");return this._renderViolationApprovalRequests(t,{isAdmin:e.isAdmin})},_refreshViolationApprovalsModalBody(e,t){const o=(t.requests||[]).filter(r=>r.status==="pending").length,i=e.querySelector("#viol-approval-pending-count");i&&(i.textContent=t.loading?"...":String(o));const n=e.querySelector("#viol-approvals-settings-panel");if(n&&t.isAdmin){const r=document.createElement("div");r.innerHTML=this._buildViolationApprovalsSettingsHtml(t.settings,!0,t.allUsers);const l=r.firstElementChild;l&&n.replaceWith(l)}const a=e.querySelector("#viol-approval-requests-list");if(a){const r=e.querySelector(".viol-req-filter.viol-req-filter-active")?.getAttribute("data-filter")||"pending",l=r==="all"?t.requests||[]:(t.requests||[]).filter(c=>c.status===r);a.innerHTML=t.loading?this._buildViolationApprovalsRequestsHtml(t):this._renderViolationApprovalRequests(l,{isAdmin:t.isAdmin}),this._wireViolationApprovalActions(e,t.isAdmin)}},async _loadViolationApprovalsPanelData(e,t){try{const[o,i]=await Promise.all([this.fetchViolationApprovalRequests(t.filters),this.getViolationApprovalSettings()]);if(!e.isConnected)return;t.requests=Array.isArray(o)?o:[],t.settings=this._cloneViolationApprovalSettings(i),t.loading=!1,this._setCachedViolationApprovalRequests(t.requests,t.isAdmin,AppState.currentUser||{}),this._refreshViolationApprovalsModalBody(e,t),this._wireViolationApprovalActions(e,t.isAdmin)}catch(o){if(!e.isConnected)return;t.loading=!1;const i=e.querySelector("#viol-approval-requests-list");i&&(i.innerHTML=`<div style="text-align:center;padding:24px;color:#dc2626;background:#fef2f2;border-radius:10px;">
                    <i class="fas fa-exclamation-circle"></i> \u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u2014 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                </div>`),AppState.debugMode&&Utils.safeWarn("_loadViolationApprovalsPanelData:",o)}},_bindViolationApprovalsModalEvents(e){if(e._violApprovalsEventsBound)return;e._violApprovalsEventsBound=!0;const t=()=>e._violApprovalState;e.addEventListener("click",o=>{if(o.target.closest("#viol-approvals-close")){e.remove();return}const i=o.target.closest(".viol-remove-approver");if(i){const a=parseInt(i.getAttribute("data-idx"),10),r=t();if(!r||isNaN(a))return;r.settings.defaultApprovers.splice(a,1),this._refreshViolationApprovalsModalBody(e,r);return}const n=o.target.closest(".viol-req-filter");if(n){const a=t();if(!a)return;e.querySelectorAll(".viol-req-filter").forEach(s=>s.classList.remove("viol-req-filter-active")),n.classList.add("viol-req-filter-active");const r=n.getAttribute("data-filter"),l=r==="all"?a.requests:a.requests.filter(s=>s.status===r),c=e.querySelector("#viol-approval-requests-list");c&&(c.innerHTML=a.loading?this._buildViolationApprovalsRequestsHtml(a):this._renderViolationApprovalRequests(l,{isAdmin:a.isAdmin}),this._wireViolationApprovalActions(e,a.isAdmin));return}if(o.target.closest("#viol-add-approver-btn")){const a=t();if(!a)return;const r=e.querySelector("#viol-add-approver-select"),l=r?.value;if(!l){Notification.warning("\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B");return}const c=r.options[r.selectedIndex],s={userId:l,userName:c?.dataset?.name||"",userEmail:c?.dataset?.email||"",role:c?.dataset?.role||""};if(a.settings.defaultApprovers.some(d=>d.userId===s.userId)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0636\u0627\u0641 \u0628\u0627\u0644\u0641\u0639\u0644");return}a.settings.defaultApprovers.push(s),this._refreshViolationApprovalsModalBody(e,a);return}if(o.target.closest("#viol-save-settings-btn")){const a=t();if(!a)return;const r=o.target.closest("#viol-save-settings-btn");if(r.disabled)return;r.disabled=!0;const c={requireApproval:e.querySelector("#viol-require-approval")?.checked===!0,defaultApprovers:a.settings.defaultApprovers,bypassRoles:a.settings.bypassRoles};this.saveViolationApprovalSettings(c).then(s=>{r.disabled=!1,s&&s.success?(a.settings=this._cloneViolationApprovalSettings(c),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error(s&&s.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}).catch(()=>{r.disabled=!1})}})},showViolationApprovalsManager(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},o=(AppState.appData?.users||[]).filter(s=>s&&(s.email||s.id||s.name)),i={userEmail:e?"":t.email||"",userId:e?"":t.id||""},n=this._getCachedViolationApprovalRequests(e,t),a={settings:this._getViolationApprovalSettingsSnapshot(),requests:n||[],isAdmin:e,allUsers:o,filters:i,loading:!n},r=document.getElementById("viol-approvals-manager-modal");r&&r.remove();const l=document.createElement("div");l.id="viol-approvals-manager-modal",l.className="modal modal-open",l.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:24px;overflow:auto;";const c=a.loading?"...":String(a.requests.filter(s=>s.status==="pending").length);l.innerHTML=`
            <div style="background:#fff;border-radius:14px;max-width:1100px;width:100%;max-height:92vh;overflow:auto;box-shadow:0 20px 50px rgba(0,0,0,0.3);">
                <div style="background:linear-gradient(135deg,#991b1b,#7f1d1d);color:#fff;padding:18px 22px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-clipboard-check" style="font-size:22px;"></i>
                        <h3 style="margin:0;font-size:1.15rem;">\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                    </div>
                    <button type="button" id="viol-approvals-close" style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;color:#fff;width:36px;height:36px;cursor:pointer;font-size:18px;">\xD7</button>
                </div>

                <div id="viol-approvals-modal-body" style="padding:18px 22px;">
                    ${this._buildViolationApprovalsSettingsHtml(a.settings,e,o)}

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
                            ${this._buildViolationApprovalsRequestsHtml(a)}
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(l),l._violApprovalState=a,l._violApprovalsEventsBound=!1,this._bindViolationApprovalsModalEvents(l),a.loading||this._wireViolationApprovalActions(l,e),this._loadViolationApprovalsPanelData(l,a)},_renderViolationApprovalRequests(e,t={}){return!e||e.length===0?'<div style="text-align:center;padding:24px;color:#94a3b8;background:#f9fafb;border-radius:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':e.map(o=>{const i=o.violationData||{},n=i.employeeName||i.contractorName||"\u2014",a={pending:'<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u0644\u064E\u0651\u0642</span>',approved:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0639\u062A\u0645\u062F</span>',committed:'<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0633\u062C\u064E\u0651\u0644</span>',rejected:'<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">\u0645\u0631\u0641\u0648\u0636</span>'}[o.status]||`<span style="background:#e5e7eb;color:#374151;padding:3px 10px;border-radius:12px;font-size:0.75rem;">${o.status}</span>`,r=o.createdAt?new Date(o.createdAt).toLocaleString("ar-EG-u-nu-latn",{dateStyle:"short",timeStyle:"short"}):"\u2014",l=Array.isArray(o.approvers)?o.approvers:[],c=parseInt(o.currentApproverIndex,10)||0,s=o.status==="pending"&&t.isAdmin;return`
                <div data-request-id="${Utils.escapeHTML(String(o.id))}" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <div>
                            <div style="font-weight:700;color:#374151;font-size:0.95rem;">${Utils.escapeHTML(n)} \u2014 ${Utils.escapeHTML(i.violationType||"\u2014")}</div>
                            <div style="font-size:0.78rem;color:#6b7280;margin-top:3px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ${Utils.escapeHTML(String(o.id))} \u2022 \u0623\u064F\u0646\u0634\u0626: ${r} \u2022 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(o.createdByName||o.createdBy||"\u2014")}</div>
                        </div>
                        ${a}
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;font-size:0.82rem;color:#4b5563;background:#f9fafb;padding:10px;border-radius:8px;margin-bottom:10px;">
                        <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(i.violationLocation||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0634\u062F\u0629:</strong> ${Utils.escapeHTML(i.severity||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${i.violationDate?new Date(i.violationDate).toLocaleDateString("ar-EG-u-nu-latn"):"\u2014"}</div>
                        <div><strong>\u0627\u0644\u063A\u0631\u0627\u0645\u0629:</strong> ${i.fineAmount?Number(i.fineAmount).toLocaleString("en-US")+" \u062C.\u0645":"\u2014"}</div>
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
                    ${o.rejectionReason?`<div style="background:#fef2f2;border-right:3px solid #dc2626;padding:8px 10px;border-radius:6px;font-size:0.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</strong> ${Utils.escapeHTML(o.rejectionReason)}</div>`:""}
                    ${s?`
                        <div style="display:flex;gap:8px;justify-content:flex-end;">
                            <button type="button" class="viol-req-reject-btn" data-id="${Utils.escapeHTML(String(o.id))}" style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                                <i class="fas fa-times"></i> \u0631\u0641\u0636
                            </button>
                            <button type="button" class="viol-req-approve-btn" data-id="${Utils.escapeHTML(String(o.id))}" style="background:#dcfce7;color:#166534;border:1px solid #86efac;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                                <i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F
                            </button>
                        </div>
                    `:""}
                </div>
            `}).join("")},_wireViolationApprovalActions(e,t){e.querySelectorAll(".viol-req-approve-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id");if(!i)return;o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F...';const n=await this.approveViolationRequest(i,{force:t});if(n&&n.success){Notification.success(n.message||"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager();try{this.load&&this.load()}catch{}}else Notification.error(n&&n.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),o.disabled=!1,o.innerHTML='<i class="fas fa-check"></i> \u0627\u0639\u062A\u0645\u0627\u062F'})}),e.querySelectorAll(".viol-req-reject-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.getAttribute("data-id");if(!i)return;const n=(window.prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:")||"").trim();if(!n){Notification.warning("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0625\u0644\u0632\u0627\u0645\u064A");return}o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0636...';const a=await this.rejectViolationRequest(i,n);a&&a.success?(Notification.success(a.message||"\u062A\u0645 \u0627\u0644\u0631\u0641\u0636"),this._invalidateViolationApprovalRequestsCache(),e.remove(),this.showViolationApprovalsManager()):(Notification.error(a&&a.message||"\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636"),o.disabled=!1,o.innerHTML='<i class="fas fa-times"></i> \u0631\u0641\u0636')})})},countPriorViolationsSamePersonMonth(e,t){const o=this.getViolationYearMonthKey(e.violationDate);if(o==null)return 0;const i=AppState.appData.violations||[];let n=0;for(let a=0;a<i.length;a++){const r=i[a];!r||t&&String(r.id)===String(t)||this.getViolationYearMonthKey(r.violationDate)===o&&this.sameViolationPersonForSequence(e,r)&&n++}return n},refreshViolationSequenceBadgeInModal(e,t){const o=e&&e.querySelector?e.querySelector("#violation-sequence-info"):null,i=e&&e.querySelector?e.querySelector("#violation-sequence-text"):null;if(!o||!i)return;const n=document.getElementById("violation-person-type")?.value,a=document.getElementById("violation-date")?.value;if(!n||!a){o.classList.add("hidden");return}const r={personType:n,violationDate:`${a}T12:00:00`};if(n==="employee"){if(r.employeeCode=document.getElementById("violation-employee-code")?.value.trim()||"",!r.employeeCode){o.classList.add("hidden");return}}else{const s=document.getElementById("violation-contractor-select");if(r.contractorName=(s?.value||"").trim(),r.contractorWorker=document.getElementById("violation-contractor-worker")?.value.trim()||"",!r.contractorName){o.classList.add("hidden");return}}const c=this.countPriorViolationsSamePersonMonth(r,t)+1;i.textContent=c<=1?"\u0623\u0648\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 (\u064A\u064F\u062D\u0633\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0648\u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631).":`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${c} \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635.`,o.classList.remove("hidden")},_violationsImportNormalizeHeaderKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationsImportPick(e,t){const o={};Object.keys(e||{}).forEach(i=>{o[this._violationsImportNormalizeHeaderKey(i)]=e[i]});for(let i=0;i<t.length;i++){const n=this._violationsImportNormalizeHeaderKey(t[i]);if(o[n]!==void 0&&o[n]!==null&&String(o[n]).trim()!=="")return o[n]}return""},downloadViolationsImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u063A\u0631\u0627\u0645\u0629"],t=["\u0645\u0648\u0638\u0641","12345","","","","\u062A\u0623\u062E\u0631 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","2026-05-01","08:30","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 1","\u0645\u062A\u0648\u0633\u0637\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631","\u0625\u0646\u0630\u0627\u0631 \u0634\u0641\u0647\u064A","100"],o=XLSX.utils.book_new(),i=XLSX.utils.aoa_to_sheet([e,t]);i["!cols"]=e.map(()=>({wch:18})),XLSX.utils.book_append_sheet(o,i,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const n=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],['\u2022 \u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635: \u0627\u0643\u062A\u0628 "\u0645\u0648\u0638\u0641" \u0623\u0648 "\u0645\u0642\u0627\u0648\u0644".'],["\u2022 \u0644\u0644\u0645\u0648\u0638\u0641: \u0639\u0628\u0651\u0626 \u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629."],["\u2022 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0639\u0628\u0651\u0626 \u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u0628\u0626\u0629 \u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644."],["\u2022 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 \u062A\u0646\u0633\u064A\u0642 \u062A\u0627\u0631\u064A\u062E \u0625\u0643\u0633\u0644."]],a=XLSX.utils.aoa_to_sheet(n);XLSX.utils.book_append_sheet(o,a,"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(o,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},showViolationsImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
            </div>`,document.body.appendChild(e);let t=[];const o=e.querySelector("#violations-import-file"),i=e.querySelector("#violations-import-preview"),n=e.querySelector("#violations-import-confirm");e.querySelector("#violations-import-download-template")?.addEventListener("click",()=>this.downloadViolationsImportTemplate()),o?.addEventListener("change",async a=>{const r=a.target.files&&a.target.files[0];if(t=[],n.disabled=!0,i.classList.add("hidden"),!!r){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const l=await r.arrayBuffer(),c=XLSX.read(l,{type:"array"}),s=c.Sheets[c.SheetNames[0]],d=XLSX.utils.sheet_to_json(s,{defval:""});t=Array.isArray(d)?d:[],i.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xAB${Utils.escapeHTML(c.SheetNames[0]||"")}\xBB.</p>`,i.classList.remove("hidden"),n.disabled=t.length===0}catch(l){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",l),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(l.message||""))}}}),n?.addEventListener("click",async()=>{t.length&&(n.disabled=!0,await this.processViolationsImportRows(t,e))}),e.addEventListener("click",a=>{a.target===e&&e.remove()})},async processViolationsImportRows(e,t){let o=0,i=0;const n=[];Array.isArray(AppState.appData.violations)||(AppState.appData.violations=[]);let a=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),a=ViolationTypesManager.getAll()}catch{a=AppState.appData.violationTypes||[]}else a=AppState.appData.violationTypes||[];const r=new Map((a||[]).map(c=>[String(c.name||"").trim().toLowerCase(),c])),l=new Set;for(let c=0;c<e.length;c++){const s=e[c]||{},d=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim();d&&!r.has(d.toLowerCase())&&l.add(d)}if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.addType&&ViolationTypesManager.getTypeByName)try{ViolationTypesManager.ensureInitialized(),l.forEach(c=>{const s=c.toLowerCase();try{const d=ViolationTypesManager.addType({name:c,description:"",fineAmount:0});r.set(s,d)}catch{const p=ViolationTypesManager.getTypeByName(c);p&&r.set(s,p)}})}catch(c){Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641:",c)}for(let c=0;c<e.length;c++){const s=e[c]||{};try{const p=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635","personType","persontype"])||"").trim().toLowerCase(),f=p.includes("\u0645\u0642\u0627\u0648\u0644")||p==="contractor"?"contractor":"employee",m=String(this._violationsImportPick(s,["\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","employeeCode","employeenumber","employeeNumber"])||"").trim(),T=String(this._violationsImportPick(s,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641","employeeName"])||"").trim(),u=String(this._violationsImportPick(s,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorName"])||"").trim(),I=String(this._violationsImportPick(s,["\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorWorker"])||"").trim(),h=String(this._violationsImportPick(s,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim(),_=this._violationsImportPick(s,["\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationDate","date"]),L=String(this._violationsImportPick(s,["\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationTime","time"])||"08:00"),E=String(this._violationsImportPick(s,["\u0627\u0644\u0645\u0648\u0642\u0639","violationLocation","location"])||"").trim(),F=String(this._violationsImportPick(s,["\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationPlace","place"])||"").trim(),V=String(this._violationsImportPick(s,["\u0627\u0644\u0634\u062F\u0629","severity"])||"\u0645\u062A\u0648\u0633\u0637\u0629").trim(),P=String(this._violationsImportPick(s,["\u0627\u0644\u062D\u0627\u0644\u0629","status"])||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").trim(),H=String(this._violationsImportPick(s,["\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","violationDetails","details"])||"").trim(),O=String(this._violationsImportPick(s,["\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","actionTaken","action"])||"").trim(),W=this._violationsImportPick(s,["\u0627\u0644\u063A\u0631\u0627\u0645\u0629","fineAmount","fine"]);if(!h||!_){i++,n.push(`\u0635\u0641 ${c+2}: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0646\u0627\u0642\u0635`);continue}if(f==="employee"&&!m){i++,n.push(`\u0635\u0641 ${c+2}: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641`);continue}if(f==="contractor"&&!u){i++,n.push(`\u0635\u0641 ${c+2}: \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628`);continue}let N=_;if(typeof N=="number"&&typeof XLSX<"u"&&XLSX.SSF)try{const D=XLSX.SSF.parse_date_code(N);D&&(N=new Date(Date.UTC(D.y,D.m-1,D.d)).toISOString())}catch{}else if(typeof N=="string"&&/^\d{4}-\d{2}-\d{2}/.test(N.trim()))N=new Date(N.trim().slice(0,10)+"T12:00:00").toISOString();else{const D=new Date(N);N=isNaN(D.getTime())?new Date().toISOString():D.toISOString()}const $=r.get(h.toLowerCase()),j=$?String($.id||""):"",Q=this.parseFineAmount(W!==""&&W!==void 0?W:$?$.fineAmount:0),it={personType:f,violationDate:N,employeeCode:m,employeeNumber:m,employeeName:T,contractorName:u,contractorWorker:I},Z=this.countPriorViolationsSamePersonMonth(it,null)+1,b={id:Utils.generateId("VIOLATION"),isoCode:typeof generateISOCode=="function"?generateISOCode("VIOL",AppState.appData.violations):"VIOL-"+Date.now()+"-"+c,personType:f,employeeId:f==="employee"?Utils.generateId("EMP"):"",employeeName:f==="employee"?T:"",employeeCode:f==="employee"?m:"",employeeNumber:f==="employee"?m:"",employeePosition:"",employeeDepartment:"",contractorId:"",contractorName:f==="contractor"?u:"",contractorWorker:f==="contractor"?I:"",contractorPosition:"",contractorDepartment:"",violationTypeId:j,violationType:h,fineAmount:Q,violationDate:N,violationTime:L.length>=5?L.slice(0,5):"08:00",violationLocation:E,violationLocationId:E,violationPlace:F,violationPlaceId:F,violationDetails:H,severity:V||"\u0645\u062A\u0648\u0633\u0637\u0629",actionTaken:O,status:P||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",photo:"",violationSequenceInMonth:Z,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.violations.push(this.normalizeViolationRecord(b)),o++}catch(d){i++,n.push(`\u0635\u0641 ${c+2}: ${d.message||d}`)}}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(GoogleIntegration.autoSave("Violations",AppState.appData.violations).catch(()=>{Notification.warning("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A \u0644\u0627\u062D\u0642\u0627\u064B.")}),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureViolationsTypeIds)try{ViolationTypesManager.ensureViolationsTypeIds()}catch{}t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${o} \u0645\u062E\u0627\u0644\u0641\u0629${i?` (\u062A\u062E\u0637\u064A ${i})`:""}.`),n.length&&n.length<=5?n.forEach(c=>Utils.safeWarn(c)):n.length&&Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+n.slice(0,5).join(" | ")+" ..."),this.load()},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u"){const t=document.getElementById("violations-section");t&&(t.innerHTML=`
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
                `;return}if(AppState.appData||(AppState.appData={}),AppState.appData.violations||(AppState.appData.violations=[]),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized)try{ViolationTypesManager.ensureInitialized()}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 ViolationTypesManager:",s)}else(!AppState.appData.violationTypes||!Array.isArray(AppState.appData.violationTypes))&&(AppState.appData.violationTypes=[]);const t=Array.isArray(AppState.appData.violations)&&AppState.appData.violations.length>0,o=(()=>{try{return localStorage.getItem("violations_last_sync")}catch{return null}})(),i=o?Date.now()-parseInt(o,10):1/0,n=600*1e3,a=i>=n,r=typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets,l=AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl;if(!t&&r&&l)try{await this.ensureViolationsCoreDataLoaded({force:!0})}catch{}else a&&t&&r&&l&&this.ensureViolationsCoreDataLoaded({force:!0}).then(()=>{try{const s=document.getElementById("violations-stats-cards");s&&(s.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters()),this.bindFilters()}catch{}});const c=(s,d)=>this._t(s,d);e.innerHTML=`
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
            `}},async ensureViolationsCoreDataLoaded({force:e=!1}={}){return this._violationsCoreLoadPromise&&!e?this._violationsCoreLoadPromise:(this._violationsCoreLoadPromise=(async()=>{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl))return;const[o,i]=await Promise.all([GoogleIntegration.readFromSheets("Violations").catch(()=>null),GoogleIntegration.readFromSheets("ViolationTypes").catch(()=>null)]);if(Array.isArray(o)){const n=o.map(s=>this.normalizeViolationRecord(s)).filter(Boolean),a=Array.isArray(AppState.appData.violations)?AppState.appData.violations:[],r=new Set(n.map(s=>s&&s.id).filter(Boolean)),l=Date.now()-300*1e3,c=a.filter(s=>!s||!s.id||r.has(s.id)?!1:new Date(s.createdAt||s.timestamp||0).getTime()>=l);AppState.appData.violations=c.length>0?[...c,...n]:n}if(Array.isArray(i)){const n=Array.isArray(AppState.appData.violationTypes)?AppState.appData.violationTypes:[];if(i.length>0?AppState.appData.violationTypes=i:n.length===0&&(AppState.appData.violationTypes=[]),i.length>0||i.length===0&&n.length===0)try{AppState.syncMeta||(AppState.syncMeta={sheets:{},users:0,lastSyncTime:0,userEmail:null}),AppState.syncMeta.sheets||(AppState.syncMeta.sheets={}),AppState.syncMeta.sheets.ViolationTypes=Date.now()}catch{}}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized()}catch{}try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}})().finally(()=>{this._violationsCoreLoadPromise=null}),this._violationsCoreLoadPromise)},renderViolationsList(){try{const e=this.getFilteredViolations();return!e||e.length===0?`<div class="empty-state"><p class="text-gray-500">${this.hasActiveFilters()?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629"}</p></div>`:`
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
                            ${e.map((t,o)=>`
                                <tr style="background: ${o%2===0?"#ffffff":"#fef2f2"}; transition: all 0.2s ease;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='${o%2===0?"#ffffff":"#fef2f2"}'">
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
            `}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A renderViolationsList:",e),'<div class="empty-state"><p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}},updateAllViolationsStats(){try{const e=document.getElementById("violations-stats-cards");if(!e)return;const t=document.createElement("div");t.innerHTML=this.renderAllViolationsStats();const o=t.querySelector("#violations-stats-cards");o&&e.replaceWith(o)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A:",e)}},renderAllViolationsStats(){const e=this.getFilteredViolations(),t=e.length,o=e.filter(a=>a&&(a.personType==="employee"||!!a.employeeName&&!a.contractorName)).length,i=e.filter(a=>a&&(a.personType==="contractor"||!!a.contractorName)).length,n=e.reduce((a,r)=>{const l=Number(r?.fineAmount||0);return a+(Number.isFinite(l)&&l>0?l:0)},0);return`
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
                            <p class="text-2xl font-bold text-blue-700">${o}</p>
                        </div>
                        <i class="fas fa-user-tie text-blue-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fdba74;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-orange-700">${i}</p>
                        </div>
                        <i class="fas fa-users-cog text-orange-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `},hasActiveFilters(){const e=this.currentFilters||{};return!!(e.search||e.personType||e.violationType||e.severity||e.status)},getFilteredViolations(){try{if(typeof AppState>"u"||!AppState.appData)return[];const e=(AppState.appData.violations||[]).map(c=>{const s=this.normalizeViolationRecord(c);if(!s)return null;const d=this.getEffectiveFineAmount(s);return d===s.fineAmount?s:{...s,fineAmount:d}}).filter(Boolean),t=this.currentFilters||{},o=String(t.search||"").trim().toLowerCase(),i=t.personType||"",n=(t.violationType||"").toLowerCase(),a=t.severity||"",r=t.status||"";let l=[];if(o&&typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"){const c=[...AppState?.appData?.approvedContractors||[],...AppState?.appData?.contractors||[]].filter(Boolean),s=Utils.findApprovedContractorByTerm(o,c);l=(s.matches&&s.matches.length>0?s.matches:s.contractor?[s.contractor]:[]).map(p=>Utils.buildContractorIdentityMatcher(p,o))}return e.filter(c=>{if(!c||i==="employee"&&!c.employeeName&&c.personType!=="employee"||i==="contractor"&&!c.contractorName&&!c.contractorCode&&!c.contractorId&&c.personType!=="contractor"||n&&(c.violationType||"").trim().toLowerCase()!==n||a&&(c.severity||"")!==a||r&&(c.status||"")!==r)return!1;if(o){let s=!1;if(l.length>0&&l.some(d=>d.violationBelongsToContractor(c))&&(s=!0),s||(s=Object.values(c||{}).map(p=>String(p??"").toLowerCase()).join(" ").includes(o)),!s)return!1}return!0})}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A getFilteredViolations:",e),[]}},renderFilters(e=""){const t=this.currentFilters||{};e&&(t.personType=e);let o=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),o=ViolationTypesManager.getAll()}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",n),o=[]}else o=typeof AppState<"u"&&AppState?.appData?.violationTypes?AppState.appData.violationTypes:[];const i=o.map(n=>`
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
                            ${i}
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
        `},bindFilters(){const e=document.getElementById("violations-filter-search"),t=document.getElementById("violations-filter-person"),o=document.getElementById("violations-filter-type"),i=document.getElementById("violations-filter-severity"),n=document.getElementById("violations-filter-status"),a=document.getElementById("violations-filter-reset");e&&(e.value=this.currentFilters.search||"",e.oninput=()=>{this.currentFilters.search=e.value||"",this.refreshViolationsView({skipFilterRerender:!0})}),t&&(t.value=this.currentFilters.personType||"",t.onchange=()=>{this.currentFilters.personType=t.value,this.refreshViolationsView()}),o&&(o.value=this.currentFilters.violationType||"",o.onchange=()=>{this.currentFilters.violationType=o.value,this.refreshViolationsView()}),i&&(i.value=this.currentFilters.severity||"",i.onchange=()=>{this.currentFilters.severity=i.value,this.refreshViolationsView()}),n&&(n.value=this.currentFilters.status||"",n.onchange=()=>{this.currentFilters.status=n.value,this.refreshViolationsView()}),a&&(a.onclick=()=>{this.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""},this.refreshViolationsView()})},refreshViolationsView(e={}){const t=!!e.skipFilterRerender,o=document.getElementById("violations-list");if(o)switch(document.querySelector(".tab-btn.active")?.dataset.tab||"all"){case"employees":o.innerHTML=this.renderEmployeeViolationsList();break;case"contractors":o.innerHTML=this.renderContractorViolationsList();break;case"analytics":return;default:o.innerHTML=this.renderViolationsList()}const i=document.getElementById("violations-stats-cards");i&&(i.outerHTML=this.renderAllViolationsStats());const n=document.getElementById("violations-filters-container");if(n&&!t){const a=document.querySelector(".tab-btn.active")?.dataset.tab||"all",r=a==="employees"?"employee":a==="contractors"?"contractor":"";n.innerHTML=this.renderFilters(r)}t||this.bindFilters()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-violation-btn");e&&e.addEventListener("click",()=>this.showViolationForm()),this.bindFilters()},100)},async switchTab(e){document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.remove("active"),n.dataset.tab===e&&n.classList.add("active"),n.style.flexShrink||(n.style.setProperty("flex-shrink","0","important"),n.style.setProperty("min-width","fit-content","important"),n.style.setProperty("white-space","nowrap","important"),n.style.setProperty("width","auto","important"),n.style.setProperty("max-width","none","important"))});const o=document.querySelector(".tabs-nav");o&&!o.style.flexWrap&&(o.style.setProperty("flex-wrap","nowrap","important"),o.style.setProperty("overflow-x","auto","important"),o.style.setProperty("overflow-y","visible","important"));const i=document.getElementById("violations-tab-content");if(i)switch(e){case"all":i.innerHTML=`
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
                `,this.bindFilters();break;case"employees":i.innerHTML=`
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
                `,this.bindFilters();break;case"contractors":i.innerHTML=`
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
                `,this.bindFilters();break;case"analytics":i.innerHTML=this.renderAnalyticsTab(),setTimeout(()=>{this.updateViolationAnalytics(),this._vBindAnalyticsEvents()},80);break;case"blacklist":i.innerHTML=this.renderBlacklistTab(),this.setupBlacklistEventListeners(),this.loadBlacklistDataAsync().then(()=>{this.refreshBlacklistDisplay()}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",n)});break}},async switchTabAsync(e){try{await this.switchTab(e)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}},refreshModule(){const e=document.getElementById("violations-btn-refresh");if(e){e.disabled=!0;const o=e.querySelector("i.fa-sync-alt");o&&o.classList.add("fa-spin")}const t=typeof this.load=="function"?this.load():Promise.resolve();Promise.resolve(t).finally(()=>{const o=document.getElementById("violations-btn-refresh");if(o){o.disabled=!1;const i=o.querySelector("i.fa-sync-alt");i&&i.classList.remove("fa-spin")}})},renderEmployeeViolationsList(){const e=this.getFilteredViolations().filter(t=>t.employeeName||t.personType==="employee"||!t.contractorName&&t.employeeName);return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p></div>':`
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
        `},getContractorViolationsExportOptions(){const e=new Map,t=(o,i,n="")=>{const a=String(i||"").replace(/\s+/g," ").trim();if(!a)return;const r=this._normalizeContractorExportName(a);!r||e.has(r)||e.set(r,{id:String(o||n||a).trim(),name:a,code:String(n||"").trim()})};return typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!1}).forEach(o=>t(o.id,o.name,o.code)):((AppState.appData?.contractors||[]).forEach(o=>{t(o.id||o.contractorId,o.name||o.companyName,o.code||o.contractorCode||o.isoCode)}),(AppState.appData?.approvedContractors||[]).forEach(o=>{t(o.id||o.contractorId,o.companyName||o.name,o.code||o.contractorCode)})),(AppState.appData?.violations||[]).forEach(o=>{o?.contractorName&&t(o.contractorId,o.contractorName,o.contractorCode||o.code||o.isoCode)}),Array.from(e.values()).sort((o,i)=>o.name.localeCompare(i.name,"ar",{sensitivity:"base"}))},_normalizeContractorExportName(e){const t=String(e||"").replace(/\s+/g," ").trim();if(!t)return"";const o=t.indexOf(" - "),i=o>0?t.slice(0,o).trim():t;return this._normKeyStr(i)},_buildContractorExportMatcher(e="",t="",o=""){const i=String(e||"").trim(),n=String(t||"").trim(),a=String(o||"").trim();if(!i&&!n&&!a)return null;let r=null;typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"&&(r=Contractors.resolveContractorForAnalytics(i||a,n));const l=i||a||n,c=r||{id:i,name:n,companyName:n,code:a,contractorCode:a};if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(c,l);if(typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function")return Contractors.buildContractorAnalyticsMatchers(c,l);const s=this._normalizeContractorExportName(n||i),d=new Set([i,a].filter(Boolean).map(p=>String(p).trim().toLowerCase()));return{violationBelongsToContractor:p=>{if(!p||!(p.personType==="contractor"||!!String(p.contractorName||"").trim()))return!1;const m=this._normalizeContractorExportName(p.contractorName),T=String(p.contractorId||p.contractorCode||p.code||"").trim().toLowerCase();return T&&d.has(T)?!0:!!s&&m===s}}},showContractorViolationsReportDialog(){const e=this.getContractorViolationsExportOptions(),t=new Date,o=t.getFullYear(),i=[];for(let p=0;p<24;p++){const f=new Date(o,t.getMonth()-p,1),m=f.getFullYear(),T=f.getMonth()+1,u=`${m}-${String(T).padStart(2,"0")}`,I=f.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});i.push({value:u,label:I})}const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
                                    ${i.map(p=>`<option value="${p.value}">${p.label}</option>`).join("")}
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
        `,document.body.appendChild(n);const a=()=>n.remove();n.querySelector(".modal-close")?.addEventListener("click",a),n.querySelector('[data-action="close"]')?.addEventListener("click",a),n.addEventListener("click",p=>{p.target===n&&a()});const r=n.querySelectorAll('input[name="contractor-violations-range-type"]'),l=n.querySelector("#contractor-violations-report-month"),c=n.querySelector("#contractor-violations-report-from-date"),s=n.querySelector("#contractor-violations-report-to-date"),d=()=>{const p=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all";l.disabled=p!=="month",l.required=p==="month",c.disabled=p!=="custom",c.required=p==="custom",s.disabled=p!=="custom",s.required=p==="custom"};r.forEach(p=>p.addEventListener("change",d)),n.querySelector("#generate-contractor-violations-report-btn")?.addEventListener("click",async()=>{const p=n.querySelector("#contractor-violations-report-select"),f=p&&p.selectedIndex>=0?p.options[p.selectedIndex]:null,m=p?.selectedIndex===0,T=!m&&f?.value?String(f.value).trim():"",u=!m&&f?.dataset?.contractorName?String(f.dataset.contractorName).trim():"",I=!m&&f?.dataset?.contractorCode?String(f.dataset.contractorCode).trim():"",h=n.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all",_=n.querySelector("#contractor-violations-report-month")?.value||"",L=n.querySelector("#contractor-violations-report-from-date")?.value||"",E=n.querySelector("#contractor-violations-report-to-date")?.value||"";if(h==="month"&&!_){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(h==="custom"){if(!L||!E){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(L)>new Date(E)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}a(),await this.generateContractorViolationsReport(T,{dateRangeType:h,month:_,fromDate:L,toDate:E},u,I)})},async generateContractorViolationsReport(e="",t={},o="",i=""){const n=this._buildContractorExportMatcher(e,o,i);let a=(AppState.appData.violations||[]).map(d=>this.normalizeViolationRecord(d)).filter(Boolean).filter(d=>d?.personType==="contractor"||!!String(d?.contractorName||"").trim());n&&(a=a.filter(d=>n.violationBelongsToContractor(d)));const{dateRangeType:r="all",month:l="",fromDate:c="",toDate:s=""}=t||{};if(r==="month"&&l){const[d,p]=l.split("-");a=a.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return m.getFullYear()===parseInt(d,10)&&m.getMonth()+1===parseInt(p,10)})}else if(r==="custom"&&c&&s){const d=new Date(c);d.setHours(0,0,0,0);const p=new Date(s);p.setHours(23,59,59,999),a=a.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return m>=d&&m<=p})}if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0641\u0642 \u0627\u0644\u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const d=a.filter($=>String($.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,p=a.filter($=>String($.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,f=a.filter($=>String($.severity||"").trim()==="\u0645\u0646\u062E\u0636\u0629").length,m=a.filter($=>String($.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,T=Math.max(0,a.length-m),u=a.length>0?Math.round(m/a.length*100):0,I=new Set(a.map($=>String($.contractorName||"").trim()).filter(Boolean)).size,h=a.reduce(($,j)=>$+(Number(this.getEffectiveFineAmount(j))||0),0);let _="";if(r==="month"&&l){const[$,j]=l.split("-");_=new Date(parseInt($,10),parseInt(j,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else r==="custom"&&c&&s&&(_=`\u0645\u0646 ${Utils.formatDate(c)} \u0625\u0644\u0649 ${Utils.formatDate(s)}`);const L=this._AR_PDF_TEXT_STYLE_,E=a.map(($,j)=>`
                <tr>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${j+1}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML($.contractorName||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML($.violationType||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${$.violationDate?Utils.formatDate($.violationDate):"-"}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${Utils.escapeHTML($.severity||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px; ${L}">${Utils.escapeHTML($.actionTaken||"-")}</td>
                    <td dir="rtl" style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; ${L}">${Utils.escapeHTML($.status||"-")}</td>
                </tr>
            `).join(""),F=o?` - ${Utils.escapeHTML(o)}`:"",V=`
                <div style="margin-bottom: 24px; direction: rtl;">
                    <h2 dir="rtl" style="font-size: 20px; margin-bottom: 12px; color: #991B1B; font-weight: 700; ${L}">\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646${F}</h2>
                    ${_?`<div style="margin-bottom: 16px; padding: 12px; background: #FFF7ED; border-right: 4px solid #F59E0B; border-radius: 8px;"><strong style="color: #D97706;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(_)}</span></div>`:""}
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA;"><div style="font-size: 12px; color: #B91C1C; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #991B1B;">${a.length}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;"><div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div><div style="font-size: 24px; font-weight: 700; color: #1E3A8A;">${I}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;"><div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div><div style="font-size: 24px; font-weight: 700; color: #92400E;">${this.formatFineAmount(Number(h))}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #FFF7ED; border: 1px solid #FED7AA;"><div style="font-size: 12px; color: #C2410C; margin-bottom: 6px; font-weight: 600;">\u0639\u0627\u0644\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637\u0629 / \u0645\u0646\u062E\u0641\u0636\u0629</div><div style="font-size: 20px; font-weight: 700; color: #9A3412;">${d} / ${p} / ${f}</div></div>
                        <div style="flex: 1 1 180px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;"><div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</div><div style="font-size: 24px; font-weight: 700; color: #065F46;">${u}%</div><div style="font-size: 11px; color: #065F46; margin-top: 4px;">\u0645\u062D\u0644\u0648\u0644: ${m} | \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644: ${T}</div></div>
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
                        <tbody>${E}</tbody>
                    </table>
                </div>
            `,P=`CONTRACTOR-VIOL-${new Date().toISOString().slice(0,10)}`,H=o?`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${o}`:"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",O=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(P,H,V,!1,!1,{source:"ContractorViolationsTab",contractorId:e||"",contractorName:o||"",titleAr:H,includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(H)}</title></head><body>${V}</body></html>`,W=`${String(H).replace(/[\\/:*?"<>|]/g,"_")}.pdf`;if(!await this._downloadHtmlReportAsPdf(O,W))throw new Error("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D")}catch(d){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",d),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+(d.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async deleteViolation(e){if(!e){typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","error");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.")){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");try{const t=(AppState.appData?.violations||[]).find(c=>c.id===e),o=t?.contractorId||"",i=t?.contractorName||"",n=t?.employeeId||"",a=t?.employeeCode||t?.employeeNumber||"",r=t?.employeeName||"";let l;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callBackend)l=await GoogleIntegration.callBackend("deleteViolationFromSheet",{id:e});else throw new Error("\u062E\u062F\u0645\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");if(l&&l.success){AppState.appData&&AppState.appData.violations&&(AppState.appData.violations=AppState.appData.violations.filter(c=>c.id!==e)),(o||i)&&(AppState.appData?.contractors||[]).forEach(s=>{s&&(s.id===o||s.name===i||s.contractorName===i)&&(Array.isArray(s.violations)&&(s.violations=s.violations.filter(d=>d.id!==e)),s.violationIds&&Array.isArray(s.violationIds)&&(s.violationIds=s.violationIds.filter(d=>d!==e)))}),(n||a||r)&&(AppState.appData?.employees||[]).forEach(s=>{s&&(s.id===n||s.employeeNumber===a||s.employeeCode===a||s.name===r)&&(Array.isArray(s.violations)&&(s.violations=s.violations.filter(d=>d.id!==e)),s.violationIds&&Array.isArray(s.violationIds)&&(s.violationIds=s.violationIds.filter(d=>d!==e)))}),typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{this.updateAllViolationsStats()}catch{}if(this.refreshViolationsView(),typeof Contractors<"u"&&Contractors.load)try{(AppState?.currentSection||"")==="contractors"&&!Contractors._isLoading&&Contractors.load()}catch{}if(typeof Employees<"u"&&Employees.loadEmployeesList)try{(AppState?.currentSection||"")==="employees"&&Employees.loadEmployeesList()}catch{}typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629","success")}else throw new Error(l?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(t){typeof Utils<"u"&&Utils.showToast?Utils.showToast("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+t.message,"error"):alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+t.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},renderAnalyticsTab(){this._vEnsureChartJS().catch(()=>{});const e=(o,i)=>this._t(o,i),t=this.getCurrentCurrency();return`
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
                        ${["30","90","180","365","0"].map((o,i)=>{const n=[e("module.violations.analytics.period.30d","30 \u064A\u0648\u0645"),e("module.violations.analytics.period.3m","3 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.6m","6 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.1y","\u0633\u0646\u0629"),e("module.violations.analytics.period.all","\u0627\u0644\u0643\u0644")],a=(this._violPeriod||"0")===o;return`<button class="viol-period-btn" data-period="${o}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${a?"#fff":"rgba(255,255,255,0.15)"};color:${a?"#991b1b":"#fff"};">${n[i]}</button>`}).join("")}
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
                    ${[{id:"viol-af-factory",icon:"fas fa-industry",color:"#ec4899",label:e("module.violations.analytics.filter.factory","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A")},{id:"viol-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:e("module.violations.analytics.filter.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")},{id:"viol-af-type",icon:"fas fa-tag",color:"#dc2626",label:e("module.violations.analytics.filter.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")},{id:"viol-af-sev",icon:"fas fa-exclamation-circle",color:"#f59e0b",label:e("module.violations.analytics.filter.severity","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")},{id:"viol-af-status",icon:"fas fa-circle",color:"#10b981",label:e("module.violations.analytics.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629")},{id:"viol-af-loc",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:e("module.violations.analytics.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}].map(o=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${o.icon}" style="color:${o.color};margin-left:4px;"></i>${o.label}
                            </label>
                            <select id="${o.id}" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
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
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#ec4899;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${e("module.violations.analytics.chart.byFactory","\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629")}</span>
                    </div>
                    <span id="viol-factory-total-badge" style="background:#fdf2f8;color:#be185d;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                </div>
                <div style="padding:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;align-items:center;">
                    <div style="position:relative;height:240px;">
                        <canvas id="viol-chart-factory"></canvas>
                        <div id="viol-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                    <div id="viol-factory-breakdown-list" style="display:flex;flex-direction:column;gap:10px;max-height:240px;overflow-y:auto;padding-left:4px;">
                        <!-- dynamic factory breakdown items -->
                    </div>
                </div>
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
        </div>`},async updateViolationAnalytics(){const e=document.getElementById("viol-analytics-root");if(!e)return;const t=(b,D)=>this._t(b,D),i=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",n=parseInt(this._violPeriod||"0",10),r=(AppState.appData.violations||[]).map(b=>this.normalizeViolationRecord(b)).filter(Boolean),l=this._vFilterByPeriod(r,n);this._vPopulateFilters(l);const c=this._vApplyFilters(l),s=c.length,d=document.getElementById("viol-filter-count");d&&(d.textContent=`${s} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const p=c.filter(b=>b.personType==="employee"),f=c.filter(b=>b.personType==="contractor"),m=c.filter(b=>b.severity==="\u0639\u0627\u0644\u064A\u0629").length,T=c.filter(b=>b.status==="\u0645\u062D\u0644\u0648\u0644").length,u=c.filter(b=>b.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644").length,I=c.filter(b=>b.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,h=s>0?Math.round(T/s*100):0,_=c.reduce((b,D)=>b+(Number(D.fineAmount)||0),0),L=c.filter(b=>{if(!b.violationDate)return!1;const D=new Date(b.violationDate),G=new Date;return D.getFullYear()===G.getFullYear()&&D.getMonth()===G.getMonth()}).length,E=document.getElementById("viol-kpi-strip");if(E){const b=[{id:"total",label:t("module.violations.analytics.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),value:s.toLocaleString("en-US"),icon:"fas fa-exclamation-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{id:"employees",label:t("module.violations.analytics.kpi.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:p.length.toLocaleString("en-US"),icon:"fas fa-user-tie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{id:"contractors",label:t("module.violations.analytics.kpi.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),value:f.length.toLocaleString("en-US"),icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{id:"highSev",label:t("module.violations.analytics.kpi.highSeverity","\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629"),value:m.toLocaleString("en-US"),icon:"fas fa-bomb",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{id:"resolved",label:t("module.violations.analytics.kpi.resolved","\u0645\u062D\u0644\u0648\u0644\u0629"),value:T.toLocaleString("en-US"),icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{id:"unresolved",label:t("module.violations.analytics.kpi.unresolved","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629"),value:u.toLocaleString("en-US"),icon:"fas fa-times-circle",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{id:"resolRate",label:t("module.violations.analytics.kpi.resolRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"),value:h.toLocaleString("en-US")+"%",icon:"fas fa-chart-pie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{id:"totalFines",label:t("module.violations.analytics.kpi.totalFines","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A"),value:_>0?this.formatFineAmount(_):"\u2014",icon:"fas fa-coins",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{id:"thisMonth",label:t("module.violations.analytics.kpi.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631"),value:L.toLocaleString("en-US"),icon:"fas fa-calendar-day",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"}];E.innerHTML=b.map(D=>`
                <div class="viol-kpi-card" data-kpi="${D.id}" title="\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062D\u0633\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0639\u064A\u0627\u0631" style="background:${D.bg};border:1.5px solid ${D.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${D.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${D.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.2rem;font-weight:800;color:${D.color};line-height:1;">${D.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${D.label}</div>
                    </div>
                </div>`).join("")}if(!await this._vEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",`<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t("module.violations.analytics.chartError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.")}</span></div>`);return}this._vDrawFactoryBreakdown("viol-chart-factory","viol-factory-breakdown-list",c);const V=this._vGroupBy(c,"status"),P={\u0645\u062D\u0644\u0648\u0644:"rgba(16,185,129,0.85)","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(245,158,11,0.85)"};this._vDrawDoughnut("viol-chart-status",V.labels.map(b=>t("module.violations.status."+b,b)),V.data,V.labels.map(b=>P[b]||"rgba(148,163,184,0.8)"));const H=this._vGroupBy(c,"severity"),O={\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(16,185,129,0.85)",\u0645\u0646\u062E\u0636\u0629:"rgba(16,185,129,0.85)"};this._vDrawDoughnut("viol-chart-sev",H.labels.map(b=>t("module.violations.severity."+b,b)),H.data,H.labels.map(b=>O[b]||"rgba(148,163,184,0.8)")),this._vDrawTrend("viol-chart-trend",l);const W=this._vGroupBy(c,"violationType",10);this._vDrawHBar("viol-chart-type",W.labels,W.data,"rgba(220,38,38,0.75)");const N=this._vGroupBy(c,"violationLocation",8);this._vDrawHBar("viol-chart-loc",N.labels,N.data,"rgba(245,158,11,0.75)");const $=this._vGroupBy(p,"employeeName",10);this._vDrawHBar("viol-chart-emp",$.labels,$.data,"rgba(99,102,241,0.75)");const j=this._vGroupBy(f,"contractorName",10);this._vDrawHBar("viol-chart-con",j.labels,j.data,"rgba(249,115,22,0.75)"),this._vDrawFinesByType("viol-chart-fines",c);const Q=c.filter(b=>b.severity==="\u0639\u0627\u0644\u064A\u0629"&&b.status!=="\u0645\u062D\u0644\u0648\u0644").sort((b,D)=>(D.fineAmount||0)-(b.fineAmount||0)).slice(0,20),it=document.getElementById("viol-critical-count"),Z=document.getElementById("viol-critical-tbody");it&&(it.textContent=`${Q.length} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`),Z&&(Q.length===0?Z.innerHTML=`<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t("module.violations.analytics.table.noCritical","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0631\u062C\u0629 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629")}</td></tr>`:Z.innerHTML=Q.map((b,D)=>{const G=Utils.escapeHTML(b.employeeName||b.contractorName||"\u2014"),J=b.personType==="contractor"?`<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</span>`:`<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</span>`,Y=`<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.severity.high","\u0639\u0627\u0644\u064A\u0629")}</span>`,ut={"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"background:#fef3c7;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#ede9fe;color:#5b21b6;"}[b.status]||"background:#f1f5f9;color:#374151;",at=Number(b.fineAmount)||0,nt=D%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${nt};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${nt}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${b.violationDate?new Date(b.violationDate).toLocaleDateString(i,{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${G}</td>
                        <td style="padding:9px 12px;">${J}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(b.violationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(b.violationLocation||"\u2014")}</td>
                        <td style="padding:9px 12px;">${Y}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${ut}">${t("module.violations.status."+b.status,b.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${at>0?"#dc2626":"#94a3b8"};">${at>0?this.formatFineAmount(at):"\u2014"}</td>
                    </tr>`}).join(""))},_vFilterByPeriod(e,t){if(!t||t===0)return e;const o=new Date;return o.setDate(o.getDate()-t),e.filter(i=>{if(!i.violationDate)return!0;const n=new Date(i.violationDate);return!isNaN(n.getTime())&&n>=o})},_vGroupBy(e,t,o=0){const i={};e.forEach(a=>{const r=String(a[t]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[r]=(i[r]||0)+1});let n=Object.entries(i).sort((a,r)=>r[1]-a[1]);return o>0&&(n=n.slice(0,o)),{labels:n.map(a=>a[0]),data:n.map(a=>a[1])}},_vGetFactoryName(e){return!e||typeof e!="object"?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(e.factory||e.violationLocation||e.violationPlace||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_vApplyFilters(e){const t=d=>{const p=document.getElementById(d);return p?p.value.trim():""},o=t("viol-af-factory"),i=t("viol-af-ptype"),n=t("viol-af-type"),a=t("viol-af-sev"),r=t("viol-af-status"),l=t("viol-af-loc"),c=[o,i,n,a,r,l].some(d=>d!==""),s=document.getElementById("viol-filter-badge");return s&&(s.style.display=c?"inline":"none"),e.filter(d=>!(o&&this._vGetFactoryName(d)!==o||i&&String(d.personType||"").trim()!==i||n&&String(d.violationType||"").trim()!==n||a&&String(d.severity||"").trim()!==a||r&&String(d.status||"").trim()!==r||l&&String(d.violationLocation||"").trim()!==l))},_vPopulateFilters(e){const t=(a,r)=>this._t(a,r),o=a=>[...new Set(e.map(a).filter(Boolean))].sort(),i=(a,r,l)=>{const c=document.getElementById(a);if(!c)return;const s=c.value;c.innerHTML=`<option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>`+r.map(d=>{const p=l?t(l+d,d):d;return`<option value="${d}"${d===s?" selected":""}>${p}</option>`}).join("")},n=document.getElementById("viol-af-ptype");if(n){const a=n.value;n.innerHTML=`
                <option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                <option value="employee"${a==="employee"?" selected":""}>${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</option>
                <option value="contractor"${a==="contractor"?" selected":""}>${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</option>
            `}i("viol-af-factory",o(a=>this._vGetFactoryName(a))),i("viol-af-type",o(a=>String(a.violationType||"").trim())),i("viol-af-sev",o(a=>String(a.severity||"").trim()),"module.violations.severity."),i("viol-af-status",o(a=>String(a.status||"").trim()),"module.violations.status."),i("viol-af-loc",o(a=>String(a.violationLocation||"").trim()))},_vDrawFactoryBreakdown(e,t,o){const i=document.getElementById(e),n=document.getElementById(e+"-empty"),a=document.getElementById(t),r=document.getElementById("viol-factory-total-badge");if(!i)return;const l=(u,I)=>this._t(u,I),c=o.length;r&&(r.textContent=`${c.toLocaleString("en-US")} ${l("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const s={};o.forEach(u=>{const I=this._vGetFactoryName(u);s[I]||(s[I]={count:0,fineSum:0}),s[I].count+=1,s[I].fineSum+=Number(u.fineAmount)||0});const d=Object.entries(s).sort((u,I)=>I[1].count-u[1].count),p=d.map(u=>u[0]),f=d.map(u=>u[1].count),m=["rgba(236,72,153,0.85)","rgba(99,102,241,0.85)","rgba(245,158,11,0.85)","rgba(16,185,129,0.85)","rgba(59,130,246,0.85)","rgba(139,92,246,0.85)","rgba(239,68,68,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!f.length||c===0){i.style.display="none",n&&(n.style.display="flex"),a&&(a.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:20px;">${l("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}n&&(n.style.display="none"),i.style.display="",this._violCharts||(this._violCharts={});const T=this._violCharts[e];if(T)try{T.destroy()}catch{}this._violCharts[e]=new Chart(i,{type:"doughnut",data:{labels:p,datasets:[{data:f,backgroundColor:p.map((u,I)=>m[I%m.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:u=>{const I=u.parsed,h=c>0?(I/c*100).toFixed(1):"0";return` ${u.label}: ${I.toLocaleString("en-US")} (${h}%)`}}}}}}),a&&(a.innerHTML=d.map((u,I)=>{const h=u[0],_=u[1].count,L=u[1].fineSum,E=c>0?(_/c*100).toFixed(1):0,F=m[I%m.length],V=L>0?this.formatFineAmount(L):"";return`
                <div class="viol-factory-item" data-factory="${Utils.escapeHTML(h)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u062D\u0633\u0628 \u0645\u0635\u0646\u0639 ${Utils.escapeHTML(h)}" style="background:#fafafa;border:1px solid #f1f5f9;border-radius:10px;padding:9px 12px;cursor:pointer;transition:all 0.2s ease;" onmouseover="this.style.background='#fdf2f8';this.style.borderColor='#fbcfe8';" onmouseout="this.style.background='#fafafa';this.style.borderColor='#f1f5f9';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:0.82rem;color:#374151;">
                            <span style="width:10px;height:10px;border-radius:50%;background:${F};display:inline-block;flex-shrink:0;"></span>
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px;" title="${Utils.escapeHTML(h)}">${Utils.escapeHTML(h)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;font-size:0.78rem;">
                            <span style="font-weight:800;color:#991b1b;">${_.toLocaleString("en-US")}</span>
                            <span style="color:#94a3b8;font-size:0.72rem;">(${E}%)</span>
                            ${V?`<span style="background:#fffbeb;color:#b45309;padding:1px 6px;border-radius:6px;font-weight:700;font-size:0.68rem;">${V}</span>`:""}
                        </div>
                    </div>
                    <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                        <div style="width:${E}%;height:100%;background:${F};border-radius:3px;transition:width 0.5s ease;"></div>
                    </div>
                </div>`}).join(""),a.querySelectorAll(".viol-factory-item").forEach(u=>{u.addEventListener("click",()=>{const I=u.getAttribute("data-factory"),h=document.getElementById("viol-af-factory");h&&(h.value=h.value===I?"":I,this.updateViolationAnalytics())})}))},_vDrawDoughnut(e,t,o,i){const n=document.getElementById(e),a=document.getElementById(e+"-empty");if(!n)return;if(!o.length||o.reduce((c,s)=>c+s,0)===0){n.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),n.style.display="";const r=o.reduce((c,s)=>c+s,0);this._violCharts||(this._violCharts={});const l=this._violCharts[e];if(l)try{l.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:o,backgroundColor:i||this._vChartColors(o.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed} (${r>0?(c.parsed/r*100).toFixed(1):0}%)`}}}}})},_vDrawHBar(e,t,o,i){const n=document.getElementById(e),a=document.getElementById(e+"-empty");if(!n)return;if(!o.length||o.reduce((l,c)=>l+c,0)===0){n.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),n.style.display="",this._violCharts||(this._violCharts={});const r=this._violCharts[e];if(r)try{r.destroy()}catch{}this._violCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:o,backgroundColor:i||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>` ${l.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:l=>String(t[l]).length>18?String(t[l]).slice(0,17)+"\u2026":t[l]}}}}})},_vDrawTrend(e,t){const o=document.getElementById(e),i=document.getElementById(e+"-empty");if(!o)return;const n=(p,f)=>this._t(p,f),r=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",l=new Date,c=[];for(let p=11;p>=0;p--){const f=new Date(l.getFullYear(),l.getMonth()-p,1),m=f.toLocaleDateString(r,{month:"long"});c.push({year:f.getFullYear(),month:f.getMonth(),label:`${m} ${f.getFullYear()}`})}const s=c.map(p=>t.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return!isNaN(m.getTime())&&m.getFullYear()===p.year&&m.getMonth()===p.month}).length);if(s.reduce((p,f)=>p+f,0)===0){o.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),o.style.display="",this._violCharts||(this._violCharts={});const d=this._violCharts[e];if(d)try{d.destroy()}catch{}this._violCharts[e]=new Chart(o,{type:"bar",data:{labels:c.map(p=>p.label),datasets:[{label:n("module.violations.analytics.chart.violationCount","\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),data:s,backgroundColor:s.map(p=>p===Math.max(...s)?"rgba(220,38,38,0.85)":"rgba(220,38,38,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:n("module.violations.analytics.chart.trendLine","\u0627\u0644\u0627\u062A\u062C\u0627\u0647"),data:s,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_vDrawFinesByType(e,t){const o=document.getElementById(e),i=document.getElementById(e+"-empty");if(!o)return;const n=t.filter(m=>(Number(m.fineAmount)||0)>0);if(!n.length){o.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),o.style.display="";const a={};n.forEach(m=>{const T=String(m.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();a[T]=(a[T]||0)+(Number(m.fineAmount)||0)});const r=Object.entries(a).sort((m,T)=>T[1]-m[1]).slice(0,10),l=r.map(m=>m[0]),c=this.getCurrentCurrency(),s=this.getCurrencyLabel("long"),d=r.map(m=>{const T=this.convertFineAmount(m[1],c);return c==="USD"?Number(T.toFixed(2)):Math.round(T)});this._violCharts||(this._violCharts={});const p=this._violCharts[e];if(p)try{p.destroy()}catch{}const f=m=>c==="USD"?m.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):m.toLocaleString("en-US",{maximumFractionDigits:0});this._violCharts[e]=new Chart(o,{type:"bar",data:{labels:l,datasets:[{data:d,backgroundColor:"rgba(217,119,6,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>` ${f(m.parsed.x)} ${s}`}}},scales:{x:{beginAtZero:!0,ticks:{font:{size:11},callback:m=>f(m)},grid:{color:"#f1f5f9"},title:{display:!0,text:`\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 (${s})`,font:{size:11}}},y:{ticks:{font:{size:11},callback:m=>String(l[m]).length>18?String(l[m]).slice(0,17)+"\u2026":l[m]}}}}})},async _vEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const o=setInterval(()=>{typeof Chart<"u"&&(clearInterval(o),t(!0))},100);setTimeout(()=>{clearInterval(o),t(!1)},5e3)}):new Promise(t=>{const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",o.onload=()=>t(!0),o.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>t(!1),document.head.appendChild(i)},document.head.appendChild(o)})},_vChartColors(e){const t=["rgba(220,38,38,0.8)","rgba(245,158,11,0.8)","rgba(16,185,129,0.8)","rgba(99,102,241,0.8)","rgba(249,115,22,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(o,i)=>t[i%t.length])},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(o=>{const i=Array.from(document.querySelectorAll("script[src]")).find(a=>String(a.src||"").includes(e));if(i){const a=()=>o(!!t());i.addEventListener("load",a,{once:!0}),setTimeout(a,4e3);return}const n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>o(!!t()),n.onerror=()=>o(!1),document.head.appendChild(n)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("viol-cairo-font-link")){const e=document.createElement("link");e.id="viol-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(e){const t=`
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
</style>`,o=this._stripScriptsFromHtml_(e);return o?o.includes("</head>")?o.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${o}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const o={scale:2.5,backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(e.scrollWidth,900),windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},i=[{...o,useCORS:!0,allowTaint:!1},{...o,useCORS:!0,allowTaint:!0},{...o,useCORS:!1,allowTaint:!0}];let n=null;for(let a=0;a<i.length;a++)try{const r=await html2canvas(e,i[a]);if(r&&r.width>0&&r.height>0)return r}catch(r){n=r}if(n)throw n;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const i=this._prepareArabicPdfHtml_(e),n=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,a=document.createElement("iframe");a.setAttribute("aria-hidden","true"),a.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(a);try{a.srcdoc=i,await new Promise(p=>{a.onload=p,a.onerror=p,setTimeout(p,6e3)});const r=a.contentDocument||a.contentWindow?.document;if(!r)return!1;await this._waitArabicPdfFontsReady_(r);const l=Array.from(r.images||[]);await Promise.all(l.map(p=>new Promise(f=>{if(p.complete)return f();p.onload=f,p.onerror=f,setTimeout(f,3e3)})));const c=r.querySelector(".report-wrapper")||r.body;if(!c)return!1;const s=await this._captureHtmlToCanvas_(c);if(!s)return!1;const d=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return d?(Utils.PdfExport.appendCanvasAsPdfPages(d,s,{marginMm:8}),Utils.PdfExport.savePdf(d,n),!0):!1}catch(r){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",r),!1}finally{a.remove()}},_getViolAnalyticsPeriodLabel_(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._violPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_buildViolAnalyticsExportLegend_(){const e=n=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(n):String(n??""),t=e(this._getViolAnalyticsPeriodLabel_()),o=e(document.getElementById("viol-filter-count")?.textContent?.trim()||""),i=e(new Date().toLocaleString("ar-SA-u-nu-latn",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return`
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ${t}</div>
                ${o?`<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${o}</div>`:""}
                <div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${i}</div>
            </div>
        </div>`},async _vExportPDF(){const e=document.getElementById("viol-analytics-capture");if(!e)return;const t=document.getElementById("viol-export-pdf-btn"),o=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{if(await this._ensureReportPdfLibs_(),typeof html2canvas>"u")throw new Error("html2canvas unavailable");const i=document.getElementById("viol-filter-panel"),n=i&&i.style.display!=="none";n&&(i.style.display="none");const a=Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),r=await html2canvas(e,{scale:a,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:0,logging:!1});n&&(i.style.display="");const{dataUrl:l}=Utils.PdfExport.compressCanvasToJpegDataUrl(r,Utils.PdfExport.TARGET_MAX_BYTES),c=`
                <div style="margin:0 auto;max-width:100%;">
                    <img src="${l}" alt="Violations Analytics Dashboard" style="width:100%;max-width:100%;height:auto;display:block;border-radius:8px;border:1px solid #e2e8f0;">
                </div>`,s=`VIOL-ANALYTICS-${new Date().toISOString().slice(0,10)}`,d="\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",p="Violations Analysis Report",f=new Date().toISOString(),m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,d,c,!1,!1,{source:"ViolationsAnalytics",titleEn:p,titleAr:d,version:AppState?.companySettings?.formVersion||"1.0",includeQRCode:!1,compactPdfFooter:!0,headerLayoutLtr:!0,footerLegendHtml:this._buildViolAnalyticsExportLegend_()},f,f):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${d}</title></head><body>${c}</body></html>`,T=`Violations-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;if(!await this._downloadHtmlReportAsPdf(m,T))throw new Error("PDF generation failed");typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A PDF \u0628\u0646\u062C\u0627\u062D")}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}finally{t&&(t.disabled=!1,t.innerHTML=o)}},_vBindAnalyticsEvents(){const e=document.getElementById("viol-analytics-root");if(!e)return;e.querySelectorAll(".viol-period-btn").forEach(l=>{l.addEventListener("click",()=>{this._violPeriod=l.getAttribute("data-period"),e.querySelectorAll(".viol-period-btn").forEach(c=>{const s=c===l;c.style.background=s?"#fff":"rgba(255,255,255,0.15)",c.style.color=s?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const t=document.getElementById("viol-analytics-refresh");t&&t.addEventListener("click",()=>this.updateViolationAnalytics());const o=document.getElementById("viol-export-pdf-btn");o&&o.addEventListener("click",()=>this._vExportPDF());const i=document.getElementById("viol-toggle-filters-btn"),n=document.getElementById("viol-filter-panel");i&&n&&i.addEventListener("click",()=>{const l=n.style.display!=="none";n.style.display=l?"none":"block",i.style.background=l?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const a=document.getElementById("viol-filter-reset-btn");a&&a.addEventListener("click",()=>{["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(l=>{const c=document.getElementById(l);c&&(c.value="")}),this.updateViolationAnalytics()}),["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(l=>{const c=document.getElementById(l);c&&c.addEventListener("change",()=>this.updateViolationAnalytics())}),e.querySelectorAll(".viol-kpi-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-kpi");if(c==="total")["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc"].forEach(s=>{const d=document.getElementById(s);d&&(d.value="")});else if(c==="employees"){const s=document.getElementById("viol-af-ptype");s&&(s.value=s.value==="employee"?"":"employee")}else if(c==="contractors"){const s=document.getElementById("viol-af-ptype");s&&(s.value=s.value==="contractor"?"":"contractor")}else if(c==="highSev"){const s=document.getElementById("viol-af-sev");s&&(s.value=s.value==="\u0639\u0627\u0644\u064A\u0629"?"":"\u0639\u0627\u0644\u064A\u0629")}else if(c==="resolved"){const s=document.getElementById("viol-af-status");s&&(s.value=s.value==="\u0645\u062D\u0644\u0648\u0644"?"":"\u0645\u062D\u0644\u0648\u0644")}else if(c==="unresolved"){const s=document.getElementById("viol-af-status");s&&(s.value=s.value==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"":"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644")}this.updateViolationAnalytics()})}),e.querySelectorAll(".viol-curr-btn").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-curr");this.setCurrentCurrency(c),e.querySelectorAll(".viol-curr-btn").forEach(s=>{const d=s.getAttribute("data-curr")===c;s.style.background=d?"#fff":"transparent",s.style.color=d?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const r=document.getElementById("viol-curr-rate-btn");r&&r.addEventListener("click",()=>{const l=this.getExchangeRate(),c=window.prompt(`\u0623\u062F\u062E\u0644 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 (\u0643\u0645 \u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A \u064A\u0633\u0627\u0648\u064A 1 \u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A):

\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ${l} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`,String(l));if(c===null)return;const s=parseFloat(String(c).trim());if(!Number.isFinite(s)||s<=0){typeof Notification<"u"&&Notification.error?Notification.error("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"):alert("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}this.setExchangeRate(s),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0625\u0644\u0649 ${s} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`),this.updateViolationAnalytics()})},loadContractorsIntoSelect(e,t="",o=""){if(!e||e.tagName!=="SELECT"){Utils.safeWarn("\u26A0\uFE0F loadContractorsIntoSelect: \u0639\u0646\u0635\u0631 select \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}if(typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"){Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:t,selectedContractorId:o,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1});return}let i=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function")try{const r=Contractors.getAllContractorsForModules();if(r&&r.length>0){const l=new Map;r.forEach(c=>{const s=(c.name||"").trim();if(!s||s==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")return;const d=((c.code||c.isoCode||"")+"").trim().toUpperCase(),p=((c.licenseNumber||"")+"").trim(),f=/^CON-\d+$/i.test(d)?`CODE:${d}`:p?`LIC:${p}`:c.id?`ID:${c.id}`:`NAME:${s.toLowerCase()}`;l.has(f)||l.set(f,{id:c.id||"",name:s,serviceType:(c.serviceType||"").trim(),licenseNumber:(c.licenseNumber||"").trim()})}),i=Array.from(l.values()).sort((c,s)=>{const d=c.name.toLowerCase(),p=s.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 getAllContractorsForModules:",r)}if(i.length===0&&typeof Contractors<"u"&&typeof Contractors.getApprovedOptions=="function")try{const r=Contractors.getApprovedOptions(!1);r&&r.length>0&&(i=r.map(l=>({id:l.id||l.contractorId||"",name:(l.name||"").trim(),serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||"").trim()})).filter(l=>l.name))}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",r)}if(i.length===0){const r=AppState.appData.approvedContractors||[],l=new Map;r.filter(c=>c&&(c.companyName||c.name)&&c.isActive!=="inactive"&&c.isActive!==!1&&c.isActive!=="false"&&c.isActive!=="FALSE").forEach(c=>{const s=(c.companyName||c.name||"").trim();!s||s==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"||l.has(s)||l.set(s,{id:c.id||"",name:s,serviceType:(c.serviceType||"").trim(),licenseNumber:(c.licenseNumber||c.contractNumber||"").trim()})}),i=Array.from(l.values()).sort((c,s)=>{const d=c.name.toLowerCase(),p=s.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}e.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>';const n=document.createDocumentFragment();let a=null;if(i.forEach(r=>{if(!r||!r.name)return;const l=document.createElement("option");l.value=r.name,l.textContent=r.name,r.serviceType&&(l.textContent+=` - ${r.serviceType}`),l.dataset.contractorId=r.id||"",(t&&r.name===t||o&&r.id===o)&&(l.selected=!0,a=l),n.appendChild(l)}),e.appendChild(n),t&&!a&&e.value!==t)try{e.value=t}catch{Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",t)}},async showViolationForm(e=null){let t=null;typeof e=="string"?t=AppState.appData.violations?.find(g=>g.id===e)||null:typeof e=="object"&&(t=e),t=this.normalizeViolationRecord(t);const o=t?this.getEffectiveFineAmount(t):0,i=!!t,a=String(t?.personType||"").trim().toLowerCase()==="contractor"||!!t?.contractorName&&!t?.employeeName,r=!a,l=String(t?.violationLocationId||t?.violationLocation||"").trim(),c=String(t?.violationPlaceId||t?.violationPlace||"").trim();let s=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),s=ViolationTypesManager.getAll()}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",g),s=AppState?.appData?.violationTypes||[]}else s=AppState?.appData?.violationTypes||[];const d=t?.violationTypeId||"",p=(t?.violationType||"").trim(),f=(AppState?.currentUser?.role||"").toString().trim().toLowerCase(),m=["admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","system_admin"].includes(f),T=s.map(g=>{const x=d?g.id===d:g.name===p,w=Number(g?.fineAmount||0);return`
                <option value="${Utils.escapeHTML(g.name)}" data-type-id="${Utils.escapeHTML(g.id)}" data-fine-amount="${w}" ${x?"selected":""}>
                    ${Utils.escapeHTML(g.name)}
                </option>
            `}).join(""),I=!s.some(g=>d?g.id===d:g.name===p)&&p?`
                <option value="${Utils.escapeHTML(p)}" data-type-id="${Utils.escapeHTML(d)}" data-fine-amount="${Number(o)}" selected>
                    ${Utils.escapeHTML(p)} (\u063A\u064A\u0631 \u0645\u0639\u0631\u0641)
                </option>
            `:"",h=document.createElement("div");h.className="modal-overlay",h.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle ml-2 text-yellow-600"></i>
                        ${i?"\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629"}
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
                                    <option value="contractor" ${a?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
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
                                    style="display: ${a?"none":"block"};">
                                <label for="violation-contractor-select" class="block text-sm font-semibold text-gray-700 mb-2" style="display: ${a?"block":"none"};">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <select id="violation-contractor-select" class="form-input"
                                    style="display: ${a?"block":"none"};"
                                    ${a?"required":""}>
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
                                    ${I}
                                    ${T}
                                </select>
                            </div>
                            <div>
                                <label for="violation-fine-amount" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-money-bill-wave ml-2 text-green-600"></i>
                                    \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (\u062C.\u0645)
                                </label>
                                <input type="number" id="violation-fine-amount" class="form-input" min="0" step="1"
                                    value="${Number(o)}"
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
                                <i class="fas fa-save ml-2"></i>${i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(h);const _=document.getElementById("violation-person-type"),L=document.getElementById("violation-employee-code-container"),E=document.getElementById("violation-employee-code"),F=document.getElementById("violation-person-name"),V=document.getElementById("violation-person-name-label"),P=document.getElementById("violation-contractor-select");if(P){const g=t?.contractorName||"",x=t?.contractorId||"";this.loadContractorsIntoSelect(P,g,x)}const H=document.getElementById("violation-employee-position-container"),O=document.getElementById("violation-employee-department-container"),W=document.getElementById("violation-employee-position"),N=document.getElementById("violation-employee-department"),$=document.getElementById("violation-contractor-fields-container"),j=document.getElementById("violation-contractor-worker-container"),Q=document.getElementById("violation-contractor-position-container"),it=document.getElementById("violation-contractor-department-container"),Z=document.getElementById("violation-contractor-worker"),b=document.getElementById("violation-contractor-position"),D=document.getElementById("violation-contractor-department"),G=document.getElementById("violation-location-fields-container"),J=document.getElementById("violation-type"),Y=document.getElementById("violation-fine-amount"),ut=new Map((s||[]).map(g=>[String(g.id||"").trim(),g])),at=new Map((s||[]).map(g=>[String(g.name||"").trim().toLowerCase(),g])),nt=()=>{const g=J?.selectedOptions?.[0],x=g?.getAttribute("data-type-id")||"",w=(J?.value||"").trim().toLowerCase(),y=x&&ut.get(x)||w&&at.get(w)||null,k=Number(g?.getAttribute("data-fine-amount")||0),A=Number(y?.fineAmount??k??0);return Number.isFinite(A)&&A>=0?A:0},dt=({force:g=!1}={})=>{if(!Y)return;const x=nt();(g||!m||Y.value==="")&&(Y.value=String(x))};Y&&(Y.readOnly=!m),J&&(J.addEventListener("change",()=>dt({force:!0})),J.addEventListener("input",()=>dt({force:!0}))),Y&&m&&t&&t.fineAmount!==void 0&&t.fineAmount!==null?Y.value=String(Number(o)):dt({force:!0}),_.addEventListener("change",g=>{if(g.target.value==="employee"){if(L.style.display="block",E.required=!0,E.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)",F.style.display="block",F.readOnly=!0,F.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",F.value="",F.required=!0,P&&(P.style.display="none",P.required=!1),H&&(H.style.display="block"),O&&(O.style.display="block"),$&&($.style.display="none"),G&&(G.style.display="block"),this.loadLocationOptions("employee").then(()=>{const w=document.getElementById("violation-employee-location");if(w){const y=w.cloneNode(!0);w.parentNode.replaceChild(y,w);const k=document.getElementById("violation-employee-location");k&&k.addEventListener("change",A=>{const C=A.target.value;this.loadPlaceOptions(C,"","employee")})}}),V&&(V.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *"),typeof EmployeeHelper<"u"&&E&&E.parentNode)try{const w=E.cloneNode(!0);E.parentNode.replaceChild(w,E),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",k=>{if(k){const A=document.getElementById("violation-person-name"),C=document.getElementById("violation-employee-position"),z=document.getElementById("violation-employee-department");A&&(A.value=k.name||""),C&&(C.value=k.position||k.jobTitle||""),z&&(z.value=k.department||k.section||"")}})}catch(w){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",w),E&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",y=>{if(y){const k=document.getElementById("violation-person-name"),A=document.getElementById("violation-employee-position"),C=document.getElementById("violation-employee-department");k&&(k.value=y.name||""),A&&(A.value=y.position||y.jobTitle||""),C&&(C.value=y.department||y.section||"")}})}}else dt({force:!0}),L.style.display="none",E.required=!1,E.value="",F.style.display="none",F.required=!1,F.value="",P&&(P.style.display="block",P.required=!0,this.loadContractorsIntoSelect(P)),H&&(H.style.display="none"),O&&(O.style.display="none"),$&&($.style.display="block"),this.loadLocationOptions("contractor").then(()=>{const w=document.getElementById("violation-contractor-location");if(w){const y=w.cloneNode(!0);w.parentNode.replaceChild(y,w);const k=document.getElementById("violation-contractor-location");k&&k.addEventListener("change",A=>{const C=A.target.value;this.loadPlaceOptions(C,"","contractor")})}}),G&&(G.style.display="none"),V&&(V.textContent="\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *");pt()});const pt=()=>{clearTimeout(this._violationSeqBadgeTimer),this._violationSeqBadgeTimer=setTimeout(()=>{this.refreshViolationSequenceBadgeInModal(h,i?t?.id:null)},200)};if(h.addEventListener("input",pt),h.addEventListener("change",pt),setTimeout(pt,350),typeof EmployeeHelper<"u"&&t?.employeeName&&E&&E.parentNode)try{const g=E.cloneNode(!0);E.parentNode.replaceChild(g,E),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",w=>{if(w){const y=document.getElementById("violation-person-name"),k=document.getElementById("violation-employee-position"),A=document.getElementById("violation-employee-department");y&&(y.value=w.name||""),k&&(k.value=w.position||w.jobTitle||""),A&&(A.value=w.department||w.section||"")}})}catch(g){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",g),E&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",x=>{if(x){const w=document.getElementById("violation-person-name"),y=document.getElementById("violation-employee-position"),k=document.getElementById("violation-employee-department");w&&(w.value=x.name||""),y&&(y.value=x.position||x.jobTitle||""),k&&(k.value=x.department||x.section||"")}})}const gt=a?"contractor":"employee";setTimeout(async()=>{await this.loadLocationOptions("employee"),await this.loadLocationOptions("contractor");const g=document.getElementById("violation-employee-location"),x=document.getElementById("violation-employee-place");if(g&&x){const k=g.cloneNode(!0);g.parentNode.replaceChild(k,g);const A=x.cloneNode(!0);x.parentNode.replaceChild(A,x);const C=document.getElementById("violation-employee-location"),z=document.getElementById("violation-employee-place");C&&C.addEventListener("change",R=>{const X=R.target.value;this.loadPlaceOptions(X,"","employee")})}const w=document.getElementById("violation-contractor-location"),y=document.getElementById("violation-contractor-place");if(w&&y){const k=w.cloneNode(!0);w.parentNode.replaceChild(k,w);const A=y.cloneNode(!0);y.parentNode.replaceChild(A,y);const C=document.getElementById("violation-contractor-location"),z=document.getElementById("violation-contractor-place");C&&C.addEventListener("change",R=>{const X=R.target.value;this.loadPlaceOptions(X,"","contractor")})}if(gt==="employee"&&_.value==="employee"&&typeof EmployeeHelper<"u"&&document.getElementById("violation-employee-code"))try{EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",A=>{if(A){const C=document.getElementById("violation-person-name"),z=document.getElementById("violation-employee-position"),R=document.getElementById("violation-employee-department");C&&(C.value=A.name||""),z&&(z.value=A.position||A.jobTitle||""),R&&(R.value=A.department||A.section||"")}})}catch(A){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",A)}},100),l&&setTimeout(()=>{if(gt==="employee"){const g=document.getElementById("violation-employee-location");g&&(g.value=l,l&&this.loadPlaceOptions(l,c,"employee"))}else if(gt==="contractor"){const g=document.getElementById("violation-contractor-location");g&&(g.value=l,l&&this.loadPlaceOptions(l,c,"contractor"))}},200);const yt=document.getElementById("violation-photo-input"),wt=document.getElementById("violation-photo-preview"),St=document.getElementById("violation-photo-img");yt&&wt&&St&&yt.addEventListener("change",async g=>{const x=g.target.files[0];if(x){if(x.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),yt.value="";return}const w=new FileReader;w.onload=y=>{St.src=y.target.result,wt.classList.remove("hidden")},w.readAsDataURL(x)}});const vt=h.querySelector("#violation-form"),tt=h.querySelector("#violation-submit-btn")||vt?.querySelector('button[type="submit"]');if(!vt||!tt){AppState.debugMode&&Utils.safeError("\u274C \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648 \u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const st=(g,x,w)=>{const y=h.querySelector("#violation-form-banner"),k=h.querySelector("#violation-form-banner-icon"),A=h.querySelector("#violation-form-banner-title"),C=h.querySelector("#violation-form-banner-text");if(!y||!k||!A||!C)return;const z={error:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",icon:"fa-circle-xmark text-red-600"},warning:{bg:"#fffbeb",border:"#fde68a",text:"#92400e",icon:"fa-triangle-exclamation text-amber-600"},success:{bg:"#ecfdf5",border:"#a7f3d0",text:"#065f46",icon:"fa-circle-check text-emerald-600"},info:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",icon:"fa-circle-info text-blue-600"}},R=z[g]||z.info;y.style.background=R.bg,y.style.borderColor=R.border,y.style.color=R.text,k.className="fas "+R.icon+" text-lg mt-0.5",A.textContent=x||"",C.textContent=w||"",y.classList.remove("hidden");try{const X=h.querySelector(".modal-body");X&&X.scrollTo({top:0,behavior:"smooth"})}catch{}},At=()=>{const g=h.querySelector("#violation-form-banner");g&&g.classList.add("hidden")},kt=h.querySelector("#violation-form-banner-close");kt&&kt.addEventListener("click",At);const $t=async g=>{if(g&&(g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation()),tt.disabled){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");return}const x=tt,w=x.innerHTML;x.disabled=!0,x.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{const y=document.getElementById("violation-person-type")?.value,k=document.getElementById("violation-date")?.value,A=document.getElementById("violation-time")?.value,C=document.getElementById("violation-type")?.value,z=document.getElementById("violation-severity")?.value,R=document.getElementById("violation-status")?.value,X=document.getElementById("violation-details")?.value.trim()||"",Ct=document.getElementById("violation-action")?.value.trim()||"",ft=document.getElementById("violation-fine-amount")?.value;let ht="";if(ft!==""&&ft!==null&&ft!==void 0){const v=this.parseFineAmount(ft);Number.isFinite(v)&&v>=0&&(ht=v)}else ht=this.parseFineAmount(nt());const q=[];y||q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"),k||q.push("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),A||q.push("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),C||q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),z||q.push("\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),R||q.push("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629");let rt="",Lt="";if(y==="employee"){const v=document.getElementById("violation-employee-code")?.value.trim();rt=document.getElementById("violation-person-name")?.value.trim(),v||q.push("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),rt||q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}else if(y==="contractor"){const v=document.getElementById("violation-contractor-select");if(!v||!v.value)q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");else{rt=v.value;const S=v.options[v.selectedIndex];Lt=S?.dataset.contractorCode||S?.dataset.contractorId||""}}let et="",lt="",ot="",ct="";if(y==="employee"){const v=document.getElementById("violation-employee-location"),S=document.getElementById("violation-employee-place");et=v?.value||"",lt=v?.options[v?.selectedIndex]?.text||"",ot=S?.value||"",ct=S?.options[S?.selectedIndex]?.text||""}else if(y==="contractor"){const v=document.getElementById("violation-contractor-location"),S=document.getElementById("violation-contractor-place");et=v?.value||"",lt=v?.options[v?.selectedIndex]?.text||"",ot=S?.value||"",ct=S?.options[S?.selectedIndex]?.text||""}if(et||q.push("\u0627\u0644\u0645\u0648\u0642\u0639"),ot||q.push("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),q.length>0){st("error","\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0646\u0627\u0642\u0635\u0629","\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644: "+q.join("\u060C ")),x.disabled=!1,x.innerHTML=w,q.forEach(v=>{let S="";if(v.includes("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")?S="violation-employee-code":v.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")?S="violation-person-name":v.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?S="violation-contractor-select":v.includes("\u062A\u0627\u0631\u064A\u062E")?S="violation-date":v.includes("\u0648\u0642\u062A")?S="violation-time":v.includes("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")?S="violation-type":v.includes("\u0627\u0644\u0634\u062F\u0629")?S="violation-severity":v.includes("\u0627\u0644\u062D\u0627\u0644\u0629")?S="violation-status":v.includes("\u0627\u0644\u0645\u0648\u0642\u0639")?S=y==="employee"?"violation-employee-location":"violation-contractor-location":v.includes("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")&&(S=y==="employee"?"violation-employee-place":"violation-contractor-place"),S){const K=document.getElementById(S);K&&(K.classList.add("border-red-500","ring-2","ring-red-300"),K.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{K.classList.remove("border-red-500","ring-2","ring-red-300")},3e3))}});return}let mt=t?.photo||"";const Et=document.getElementById("violation-photo-input");if(Et?.files.length>0){const v=Et.files[0];if(v.size>2*1024*1024){st("error","\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627\u064B","\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 2MB. \u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0623\u0635\u063A\u0631."),x.disabled=!1,x.innerHTML=w;return}try{mt=await Violations.convertImageToBase64(v)}catch(S){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",S)}}At();const Ut=J?.selectedOptions?.[0]?.getAttribute("data-type-id")||"",It=k&&A?new Date(`${k}T${A}`).toISOString():new Date().toISOString(),B={id:t?.id||Utils.generateId("VIOLATION"),isoCode:t?.isoCode||generateISOCode("VIOL",AppState.appData.violations||[]),personType:y,employeeId:y==="employee"?t?.employeeId||Utils.generateId("EMP"):"",employeeName:y==="employee"?rt:"",employeeCode:y==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeeNumber:y==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeePosition:y==="employee"&&document.getElementById("violation-employee-position")?.value.trim()||"",employeeDepartment:y==="employee"&&document.getElementById("violation-employee-department")?.value.trim()||"",contractorId:y==="contractor"?Lt:"",contractorName:y==="contractor"?rt:"",contractorWorker:y==="contractor"&&document.getElementById("violation-contractor-worker")?.value.trim()||"",contractorPosition:y==="contractor"&&document.getElementById("violation-contractor-position")?.value.trim()||"",contractorDepartment:y==="contractor"&&document.getElementById("violation-contractor-department")?.value.trim()||"",violationTypeId:Ut,violationType:C,fineAmount:this.parseFineAmount(ht),violationDate:It,violationTime:A,violationLocation:lt&&lt!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"?lt:et,violationLocationId:et?String(et).trim():null,violationPlace:ct&&ct!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"?ct:ot,violationPlaceId:ot?String(ot).trim():null,violationDetails:X,severity:z,actionTaken:Ct,status:R,photo:mt,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},Mt={personType:y,violationDate:It,employeeCode:B.employeeCode,employeeNumber:B.employeeNumber,contractorName:B.contractorName,contractorWorker:B.contractorWorker},_t=this.countPriorViolationsSamePersonMonth(Mt,i&&t?.id?t.id:null);B.violationSequenceInMonth=_t+1;try{const v=await this.checkViolationApprovalGate(B,{isEdit:i});if(v&&v.requiresApproval){let S=mt;if(S&&typeof S=="string"&&S.startsWith("data:"))try{x.innerHTML='<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...';const M=await GoogleIntegration.uploadFileToDrive?.(S,`violation_${B.id}_${Date.now()}.jpg`,"image/jpeg","Violations");M&&M.success?S=M.directLink||M.shareableLink||"":(S="",st("warning","\u062A\u0639\u0630\u0651\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629","\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u062F\u0648\u0646 \u0627\u0644\u0635\u0648\u0631\u0629. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0623\u0648 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0627\u062D\u0642\u0627\u064B.")),x.innerHTML=w,x.disabled=!0,x.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'}catch(M){AppState.debugMode&&Utils.safeWarn("Drive upload failed in approval path:",M),S=""}const K={...B,photo:S},U=await this.submitViolationForApproval(K,{isEdit:i,originalId:t?.id});if(x.disabled=!1,x.innerHTML=w,U&&U.success){this._invalidateViolationApprovalRequestsCache(),h.remove(),Notification.success(U.message||"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627.");try{document.dispatchEvent(new CustomEvent("violation-approval-request-created",{detail:U.data||{}}))}catch{}return}else{const M=U&&U.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";st("error","\u062A\u0639\u0630\u0651\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",M);return}}}catch(v){AppState.debugMode&&Utils.safeWarn("approvalGate error (continuing with direct save):",v)}if(AppState.appData.violations||(AppState.appData.violations=[]),i&&t?.id){const v=AppState.appData.violations.findIndex(S=>S.id===t.id);if(v!==-1)AppState.appData.violations[v]={...AppState.appData.violations[v],...B,id:t.id,isoCode:t.isoCode||B.isoCode,createdAt:t.createdAt||B.createdAt,updatedAt:new Date().toISOString()};else throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}else AppState.appData.violations.push(B);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),h.remove(),Notification.success(`\u062A\u0645 ${i?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629...`);try{this.updateAllViolationsStats()}catch{}try{typeof Dashboard<"u"&&(typeof Dashboard.updateStats=="function"&&Dashboard.updateStats(),typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics())}catch{}try{document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"violations",action:i?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:B}}))}catch{}try{typeof Violations<"u"&&typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations<"u"&&Violations.load&&Violations.load()}catch{}(async v=>{let S=v,K=!1;if(v&&v.startsWith("data:"))try{const U=await GoogleIntegration.uploadFileToDrive?.(v,`violation_${B.id}_${Date.now()}.jpg`,"image/jpeg","Violations");U?.success&&(S=U.directLink||U.shareableLink||v,K=!0)}catch(U){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",U)}if(K){const U=AppState.appData.violations||[],M=U.findIndex(xt=>xt.id===B.id);M!==-1&&(U[M].photo=S,B.photo=S,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Violations<"u"&&Violations.load&&Violations.load())}try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const U=Object.assign({},B,{photo:S});let M;if(i?M=await GoogleIntegration.sendRequest({action:"updateViolation",data:{violationId:B.id,updateData:U}}):M=await GoogleIntegration.sendRequest({action:"addViolation",data:U}),M&&M.success===!0){try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}AppState.debugMode&&Utils.safeLog("\u2705 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D")}else{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",M&&M.message);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}}}catch(U){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",U);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}})(mt).catch(v=>{Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",v)})}catch(y){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",y),st("error","\u062D\u062F\u062B \u062E\u0637\u0623",y&&(y.message||y.toString())||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),x.disabled=!1,x.innerHTML=w}};vt.addEventListener("submit",$t,{once:!1});const Dt=tt.cloneNode(!0);tt.parentNode.replaceChild(Dt,tt);const bt=h.querySelector("#violation-submit-btn")||h.querySelector('button[type="submit"]');bt&&bt.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),!bt.disabled&&$t(g)}),h.addEventListener("click",g=>{g.target===h&&h.remove()});const Tt=g=>{g.key==="Escape"&&document.body.contains(h)&&(h.remove(),document.removeEventListener("keydown",Tt))};document.addEventListener("keydown",Tt)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(a){return String(a??"")},o='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(a){return'<option value="'+t(a.id)+'">'+t(a.name)+"</option>"}).join(""),i=document.getElementById("blacklist-factory");if(i&&i.tagName==="SELECT"){var n=i.value;i.innerHTML=o,n&&(i.value=n)}}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Violations.refreshSiteDropdowns:",a)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(i=>i.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(n=>n.id===e);if(i&&Array.isArray(i.places))return i.places.map(n=>({id:n.id||n.placeId||Utils.generateId("PLACE"),name:n.name||n.placeName||"\u0645\u0643\u0627\u0646 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(n=>n.id===e||n.siteId===e||n.name===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((a,r)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},async loadLocationOptions(e="employee"){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=this.getSiteOptions(),o=e==="employee"?"violation-employee-location":"violation-contractor-location",i=document.getElementById(o);if(!i)return;i.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',t&&t.length>0&&t.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,i.appendChild(a)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)}},loadPlaceOptions(e,t="",o="employee"){try{const i=o==="employee"?"violation-employee-place":"violation-contractor-place",n=document.getElementById(i);if(!n||(n.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>',!e))return;const a=this.getPlaceOptions(e);a&&a.length>0&&a.forEach(r=>{const l=document.createElement("option");l.value=r.id,l.textContent=r.name,t&&(r.id===t||r.name===t)&&(l.selected=!0),n.appendChild(l)})}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",i)}},async convertImageToBase64(e){return new Promise((t,o)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=o,i.readAsDataURL(e)})},async viewViolation(e){const t=AppState.appData?.violations?.find(r=>r.id===e);if(!t){typeof Notification<"u"&&Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const o=this.normalizeViolationRecord(t)||t,i=String(o.severity||"").trim(),n=String(o.status||"").trim(),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                                ${o.contractorName||o.personType==="contractor"?`
                                <!-- \u0645\u0642\u0627\u0648\u0644: \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 (\u0627\u0644\u0639\u0627\u0645\u0644) + \u0627\u0644\u0648\u0638\u064A\u0641\u0629 + \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(o.contractorWorker||o.employeeName||o.contractorName||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.contractorPosition||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(o.contractorName||"-")}</p>
                                </div>
                                ${o.contractorDepartment?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.contractorDepartment||"-")}</p>
                                </div>
                                `:""}
                                `:`
                                <!-- \u0645\u0648\u0638\u0641: \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 + \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A + \u0627\u0644\u0648\u0638\u064A\u0641\u0629 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(o.employeeName||"-")}</p>
                                </div>
                                ${o.employeeCode?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.employeeCode||o.employeeNumber||"-")}</p>
                                </div>
                                `:""}
                                ${o.employeePosition?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.employeePosition||"-")}</p>
                                </div>
                                `:""}
                                ${o.employeeDepartment?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.employeeDepartment||"-")}</p>
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
                                    <p class="text-gray-800">${Utils.escapeHTML(o.violationType||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                    <p class="text-gray-800">${o.violationDate?Utils.formatDate(o.violationDate):"-"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.violationLocation||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0643\u0627\u0646:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(o.violationPlace||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u062F\u0629:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${o.severity==="\u0639\u0627\u0644\u064A\u0629"?"#fef2f2":o.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#fffbeb":"#eff6ff"}; color: ${o.severity==="\u0639\u0627\u0644\u064A\u0629"?"#dc2626":o.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"}; border: 1px solid ${o.severity==="\u0639\u0627\u0644\u064A\u0629"?"#fecaca":o.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#fde68a":"#bfdbfe"};">
                                        ${o.severity||"-"}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${o.status==="\u0645\u062D\u0644\u0648\u0644"?"#ecfdf5":"#fef3c7"}; color: ${o.status==="\u0645\u062D\u0644\u0648\u0644"?"#059669":"#d97706"}; border: 1px solid ${o.status==="\u0645\u062D\u0644\u0648\u0644"?"#a7f3d0":"#fde68a"};">
                                        ${o.status||"-"}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629:</label>
                                    <p class="text-gray-800 font-semibold">${this.formatFineAmount(Number(this.getEffectiveFineAmount(o)))}</p>
                                </div>
                            </div>
                            ${o.violationDetails?`
                            <div class="mt-4">
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:</label>
                                <p class="text-gray-800 mt-1 p-3 bg-white rounded-lg border">${Utils.escapeHTML(o.violationDetails)}</p>
                            </div>
                            `:""}
                        </div>

                        <!-- \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 -->
                        ${o.actionTaken?`
                        <div style="background: #f0fdf4; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #166534; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-tasks"></i> \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                            </h3>
                            <p class="text-gray-800 p-3 bg-white rounded-lg border">${Utils.escapeHTML(o.actionTaken)}</p>
                        </div>
                        `:""}

                        <!-- \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
                        ${(()=>{const r=this.processPhoto(o.photo);if(!r)return"";const l=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r,displaySrc:r,needsProxy:!1,proxyFileId:""},c=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`
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
                                        <option value="\u0639\u0627\u0644\u064A\u0629" ${i==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                        <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${i==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                        <option value="\u0645\u0646\u062E\u0636\u0629" ${i==="\u0645\u0646\u062E\u0636\u0629"||i==="\u0645\u0646\u062E\u0641\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
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
                                <textarea id="violation-view-q-details" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(o.violationDetails||"")}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="violation-view-q-action" class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</label>
                                <textarea id="violation-view-q-action" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(o.actionTaken||"")}</textarea>
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
                    <button type="button" class="btn-primary" onclick='Violations.printViolationProfessional(${this._escapeIdForHandler(o.id)})' style="background: linear-gradient(135deg, #0f766e, #0d9488); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629 \u0645\u0646\u0633\u0651\u0642\u0629
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(o.id)}, this)' style="background: linear-gradient(135deg, #10b981, #059669); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-file-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 PDF \u0645\u0628\u0627\u0634\u0631
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.showViolationForm(${this._escapeIdForHandler(o.id)}); this.closest(".modal-overlay").remove();' style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-sliders-h ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0643\u0627\u0645\u0644 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644)
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.querySelector("#violation-view-quick-save")?.addEventListener("click",async()=>{await this.saveViolationQuickEditsFromView(o.id,a)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(a,{onFetchFail:r=>{try{r.onerror=null,r.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),a.addEventListener("click",r=>{r.target===a&&a.remove()})},async saveViolationQuickEditsFromView(e,t){const o=t.querySelector("#violation-view-q-severity")?.value?.trim()||"",i=t.querySelector("#violation-view-q-status")?.value?.trim()||"",n=t.querySelector("#violation-view-q-details")?.value?.trim()||"",a=t.querySelector("#violation-view-q-action")?.value?.trim()||"",r=t.querySelector("#violation-view-quick-save");if(!AppState.appData?.violations){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0627\u0644\u0641\u0627\u062A.");return}const l=AppState.appData.violations.findIndex(s=>s.id===e);if(l===-1){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.");return}const c=r?.innerHTML;r&&(r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{AppState.appData.violations[l]={...AppState.appData.violations[l],severity:o,status:i,violationDetails:n,actionTaken:a,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();let s=!0;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const d=await GoogleIntegration.autoSave("Violations",AppState.appData.violations);d&&d.success===!1&&(s=!1)}}catch(d){s=!1,AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",d)}if(!s)Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets");else try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewViolation(e);try{const d=document.querySelector("#violations-section .tabs-container .tab-btn.active")?.dataset?.tab||"all",p=document.getElementById("violations-list");if(p&&(d==="all"?p.innerHTML=this.renderViolationsList():d==="employees"?p.innerHTML=this.renderEmployeeViolationsList():d==="contractors"&&(p.innerHTML=this.renderContractorViolationsList())),d==="all"){const f=document.getElementById("violations-stats-cards");f&&(f.outerHTML=this.renderAllViolationsStats())}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639:",d)}}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",s),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+(s.message||String(s))),r&&(r.disabled=!1,r.innerHTML=c||'<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629')}},_buildViolationReportTableHtml(e){const t=this.normalizeViolationRecord(e)||e,o=(l,c="\u2014")=>Utils.escapeHTML(String(l==null||l===""?c:l)),i=l=>{if(!l)return"\u2014";const c=new Date(l);return Number.isNaN(c.getTime())?String(l):c.toLocaleString("ar-EG-u-nu-latn",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})},n=t.personType==="contractor"||!!t.contractorName,a=(l,c,s={})=>`
            <div class="vr-info ${s.wide?"vr-info-wide":""}">
                <span class="vr-label">${o(l,"")}</span>
                <strong class="vr-value ${s.accent||""}">${o(c)}</strong>
            </div>`,r=this.processPhoto(t.photo);return`
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
                    <div class="vr-code"><small>\u0631\u0642\u0645 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</small><strong>${o(t.isoCode||t.id||"\u2014")}</strong></div>
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
                        ${a("\u062A\u0627\u0631\u064A\u062E \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0633\u062C\u0644",i(t.createdAt))}
                        ${a("\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B",i(t.updatedAt))}
                    </div>
                </section>

                ${r?`<section class="vr-section"><div class="vr-section-title">\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div><div class="vr-photo"><img src="${o(r,"")}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" onerror="this.style.display='none'"></div></section>`:""}

                <div class="vr-signatures">
                    <div class="vr-sign"><strong>\u0645\u0645\u062B\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u062E\u0627\u0644\u0641</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                    <div class="vr-sign"><strong>\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629</strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639</div>
                </div>
                <div class="vr-footnote">\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A - \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${o(i(new Date().toISOString()))}</div>
            </div>`},_generateViolationPrintDocumentHtml(e,t){const o=this.normalizeViolationRecord(e)||e,i=this._buildViolationReportTableHtml(o),n=o.isoCode||`VIOL-${o.id?.substring(0,8)||"UNKNOWN"}`;if(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function")return FormHeader.generatePDFHTML(n,t,i,!1,!1,{version:"1.0",includeQRCode:!1},o.createdAt,o.updatedAt);const a=typeof AppState<"u"&&AppState.companySettings?.name?Utils.escapeHTML(AppState.companySettings.name):"";return`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${Utils.escapeHTML(t)}</title>
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;padding:24px;color:#111;} h1{font-size:1.25rem;margin:0 0 8px;} .co{color:#475569;font-size:0.9rem;margin-bottom:20px;white-space:nowrap;word-break:keep-all;overflow-wrap:normal;}
table{border-collapse:collapse;width:100%;} th,td{border:1px solid #e2e8f0;padding:10px 12px;text-align:right;font-size:0.95rem;} th{background:#f1f5f9;width:30%;color:#334155;}
</style></head><body>
<h1>${Utils.escapeHTML(t)}</h1>
${a?`<div class="co">${a}</div>`:""}
${i}
</body></html>`},async _completeViolationReportPrint(e){const t=new Blob([e],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(t),i=window.open(o,"_blank");if(!i)throw URL.revokeObjectURL(o),new Error("popup_blocked");await new Promise((n,a)=>{i.onload=()=>{try{const r=i.document.querySelectorAll("img");let l=0;const c=r.length;let s=!1;const d=()=>{s||(s=!0,setTimeout(()=>{i.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3),n()},300))};if(c===0){d();return}const p=()=>{l>=c&&d()};r.forEach(f=>{f.complete?(l++,p()):(f.onload=()=>{l++,p()},f.onerror=()=>{l++,p()})}),setTimeout(()=>d(),3500)}catch(r){a(r)}}})},async printViolationProfessional(e){const t=AppState.appData?.violations?.find(o=>o.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show();const o=this._generateViolationPrintDocumentHtml(t,"\u0628\u0637\u0627\u0642\u0629 \u0645\u062E\u0627\u0644\u0641\u0629 \u2014 \u0646\u0633\u062E\u0629 \u0637\u0628\u0627\u0639\u0629");await this._completeViolationReportPrint(o)}catch(o){o&&o.message==="popup_blocked"?Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"):(Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",o),Notification.error("\u0641\u0634\u0644 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(o.message||"")))}finally{Loading.hide()}},_safeViolationReportFilePart(e,t="\u0633\u062C\u0644"){return String(e||t).trim().replace(/[\u0000-\u001f<>:"/\\|?*]+/g,"_").replace(/\s+/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"")||t},_readViolationReportImageBlob_(e){return new Promise(t=>{if(!e||!String(e.type||"").toLowerCase().startsWith("image/")){t("");return}try{const o=new FileReader;o.onload=()=>t(typeof o.result=="string"?o.result:""),o.onerror=()=>t(""),o.readAsDataURL(e)}catch{t("")}})},async _resolveViolationReportPhoto_(e){const t=this.processPhoto(e);if(!t)return"";if(/^data:image\//i.test(t))return t;const o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{canonical:t,displaySrc:t,needsProxy:!1,proxyFileId:""};if(o.needsProxy&&o.proxyFileId&&typeof Utils.fetchDriveImageDataUri=="function")try{const n=await Utils.fetchDriveImageDataUri(o.proxyFileId);if(n&&/^data:image\//i.test(n))return n}catch{}const i=o.canonical||t;if(/^(https?:|blob:)/i.test(i)&&typeof fetch=="function")try{const n=await fetch(i,{method:"GET",credentials:"omit",mode:"cors"});if(n.ok){const a=await this._readViolationReportImageBlob_(await n.blob());if(a)return a}}catch{}return i},async downloadViolationReport(e,t=null){const o=AppState.appData?.violations?.find(r=>r.id===e);if(!o)return Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),!1;const i=this.normalizeViolationRecord(o)||o,n=i.personType==="contractor"||!!i.contractorName,a=t?.innerHTML||"";try{t&&(t.disabled=!0,t.setAttribute("aria-busy","true"),t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),Loading.show();const r=n?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",l=await this._resolveViolationReportPhoto_(i.photo),c={...i,photo:l},s=this._generateViolationPrintDocumentHtml(c,r),d=n?i.contractorName||i.contractorWorker:i.employeeName,p=i.isoCode||i.id||"\u0633\u062C\u0644",f=i.violationDate?String(i.violationDate).slice(0,10):new Date().toISOString().slice(0,10),m=["\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629",this._safeViolationReportFilePart(d,n?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"),this._safeViolationReportFilePart(p),this._safeViolationReportFilePart(f)].join("_")+".pdf";if(!await this._downloadHtmlReportAsPdf(s,m))throw new Error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF");return Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),!0}catch(r){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF:",r),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+(r.message||"")),!1}finally{Loading.hide(),t&&(t.disabled=!1,t.removeAttribute("aria-busy"),t.innerHTML=a||'<i class="fas fa-file-download"></i>')}},async exportPDF(e,t=null){return this.downloadViolationReport(e,t)},async loadBlacklistDataAsync(){try{(typeof AppState>"u"||!AppState.appData)&&(AppState.appData={}),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]);const e=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,t=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";if(!e||!t){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Integration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637");return}const o=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Blacklist_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(n=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist \u0645\u0646 Google Sheets:",n),{success:!1,data:[]}));let i=!1;if(o&&o.success&&Array.isArray(o.data)?(AppState.appData.blacklistRegister=o.data,i=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${o.data.length} \u0633\u062C\u0644 Blacklist \u0645\u0646 Google Sheets`)):AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),i&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",e),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[])}},refreshBlacklistDisplay(){const e=document.getElementById("violations-tab-content");if(!(!e||!document.querySelector('.tab-btn.active[data-tab="blacklist"]')))try{const o=e.querySelector(".card-body");if(o){const a=o.querySelector(".grid.grid-cols-1")||o.querySelector(".grid")||o.querySelector('[class*="grid-cols"]');if(a&&a.parentElement)a.outerHTML=this.renderBlacklistStats();else{const r=o.querySelector("div > div.grid");r&&(r.outerHTML=this.renderBlacklistStats())}}const i=document.getElementById("blacklist-cards-container");i&&(i.innerHTML=this.renderBlacklistCards());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable()),this.setupBlacklistEventListeners()}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 Blacklist:",o)}},renderBlacklistTab(){return`
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
        `},renderBlacklistStats(){const e=AppState.appData?.blacklistRegister||[],t=e.length,o=new Date().getMonth(),i=new Date().getFullYear(),n=e.filter(l=>{if(!l.banDate)return!1;const c=new Date(l.banDate);return c.getMonth()===o&&c.getFullYear()===i}).length,a=new Set;e.forEach(l=>{l.factory&&l.location?a.add(`${l.factory} - ${l.location}`):l.factory?a.add(l.factory):l.location&&a.add(l.location)});const r=a.size;return`
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
        `},getPhotoSource(e){return typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?Utils.extractImageSourceCandidate(e):e&&typeof e=="string"?e:""},normalizeGoogleDrivePhotoUrl(e){return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"?Utils.normalizeGoogleDriveImageUrl(e):String(e||"").trim()},processPhoto(e){if(typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"){const n=Utils.normalizeImageSource(e);if(n)return n}const t=this.getPhotoSource(e);if(!t)return null;let o=String(t).trim().replace(/^['"`]+|['"`]+$/g,"");if(!o)return null;if(o.startsWith("blob:"))return o;if(/^data:image\//i.test(o)){const n=o.indexOf(",");if(n===-1)return o.replace(/\s+/g,"");const a=o.slice(0,n).replace(/\s+/g,""),r=o.slice(n+1).replace(/\s+/g,"");return r?`${a},${r}`:null}if(/^https?:\/\//i.test(o))return this.normalizeGoogleDrivePhotoUrl(o);const i=o.replace(/\s+/g,"");return i.length>100&&/^[A-Za-z0-9+/=]+$/.test(i.substring(0,Math.min(120,i.length)))?"data:image/jpeg;base64,"+i:(AppState.debugMode,null)},_onBlacklistCardPhotoError(e){try{if(!e)return;e.onerror=null;const t=document.createElement("div");t.className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800",t.innerHTML='<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>',e.replaceWith(t)}catch{}},_onBlacklistTablePhotoError(e){try{if(!e)return;e.onerror=null,e.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}},_hydrateBlacklistDrivePhotos(){try{if(typeof Utils.hydrateDriveProxyImages!="function")return;const e=i=>{if(!i)return;const n=i.className||"";n.indexOf("blacklist-table-photo")!==-1?this._onBlacklistTablePhotoError(i):n.indexOf("blacklist-detail-photo")!==-1?this._onBlacklistTablePhotoError(i):n.indexOf("blacklist-form-photo")!==-1?this._onBlacklistTablePhotoError(i):this._onBlacklistCardPhotoError(i)},t=document.getElementById("blacklist-cards-container"),o=document.getElementById("blacklist-table");t&&Utils.hydrateDriveProxyImages(t,{onFetchFail:e}),o&&Utils.hydrateDriveProxyImages(o,{onFetchFail:e})}catch{}},renderBlacklistCards(){const e=AppState.appData?.blacklistRegister||[];return e.length===0?`
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    <p class="text-gray-400 text-sm mt-2">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F</p>
                </div>
            `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[...e].sort((o,i)=>{const n=new Date(o.banDate||o.createdAt||0);return new Date(i.banDate||i.createdAt||0)-n}).map(o=>{const i=this.processPhoto(o),n=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},a=n.canonical?n.displaySrc:"",r=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${i?`
                                            <img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629"${r}
                                                data-photo-url="${Utils.escapeHTML(i)}"
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
                                            <h3 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${Utils.escapeHTML(o.fullName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h3>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">#${o.serialNumber||"-"}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button onclick="Violations.editBlacklistRecord('${o.id}')" 
                                            class="btn-icon btn-icon-warning text-xs" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="Violations.deleteBlacklistRecord('${o.id}')" 
                                            class="btn-icon btn-icon-danger text-xs" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-id-card text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(o.idNumber||"-")}</span>
                                    </div>
                                    ${o.job?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-briefcase text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(o.job)}</span>
                                    </div>
                                    `:""}
                                    ${o.contractor?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-building text-cyan-500 dark:text-cyan-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(o.contractor)}</span>
                                    </div>
                                    `:""}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-industry text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0645\u0635\u0646\u0639:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(o.factory||"-")}</span>
                                    </div>
                                    ${o.location?`
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-map-marker-alt text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u0627\u0644\u0645\u0648\u0642\u0639:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(o.location)}</span>
                                    </div>
                                    `:""}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-calendar text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639:</span>
                                        <span class="font-semibold text-red-600 dark:text-red-400">${o.banDate?Utils.formatDate(o.banDate):"-"}</span>
                                    </div>
                                    ${o.banReason?`
                                    <div class="pt-2 border-t border-red-100 dark:border-red-900/50">
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639:</p>
                                        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">${Utils.escapeHTML(o.banReason)}</p>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                            <div class="bg-red-50 dark:bg-red-900/20 px-4 py-2 border-t border-red-100 dark:border-red-900/30 flex items-center justify-between text-xs">
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-edit ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(o.editor||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                                </span>
                                ${o.bannedBy?`
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-shield ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(o.bannedBy)}
                                </span>
                                `:""}
                            </div>
                        </div>
                    </div>
                `}).join("")}
            </div>
        `},async showBlacklistForm(e=null){const t=!!e;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",u)}const o=AppState.appData?.blacklistRegister||[],i=o.length>0?Math.max(...o.map(u=>parseInt(u.serialNumber)||0))+1:1,n=this.getSiteOptions(),a=n.map(u=>`<option value="${Utils.escapeHTML(u.name)}" data-site-id="${u.id}" ${e?.factory===u.name||e?.factoryId===u.id?"selected":""}>${Utils.escapeHTML(u.name)}</option>`).join(""),s=((AppState.appData?.formSettings||{}).departments||[]).map(u=>typeof u=="object"?u.name:u).filter(Boolean).map(u=>`<option value="${Utils.escapeHTML(u)}"></option>`).join(""),d=e?.factoryId||n.find(u=>u.name===e?.factory)?.id||"",p=d?this.getPlaceOptions(d).map(u=>`<option value="${Utils.escapeHTML(u.name)}" data-place-id="${u.id}" ${e?.location===u.name||e?.locationId===u.id?"selected":""}>${Utils.escapeHTML(u.name)}</option>`).join(""):'<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B --</option>',f=AppState.currentUser||{name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",email:""},m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
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
                    ${this.renderBlacklistFormContent(e,i,a,p,s,f)}
                </div>
            </div>
        `,document.body.appendChild(m),this.setupBlacklistFormInModal(m,e).catch(u=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C Blacklist:",u)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(m,{onFetchFail:u=>this._onBlacklistTablePhotoError(u)}),m.addEventListener("click",u=>{u.target===m&&m.remove()});const T=u=>{u.key==="Escape"&&document.body.contains(m)&&(m.remove(),document.removeEventListener("keydown",T))};document.addEventListener("keydown",T)},renderBlacklistFormContent(e,t,o,i,n,a){const r=!!e,l=this.processPhoto(e),c=l&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(l):{canonical:l||"",displaySrc:l||"",needsProxy:!1,proxyFileId:""},s=c.canonical?c.displaySrc:"",d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(c):"";return`
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
                            ${o}
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
                            ${i}
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
        `},async setupBlacklistFormInModal(e,t){const o=!!t,i=e.querySelector("#blacklist-form");i&&(i.dataset.editId=o?t.id:""),i&&i.addEventListener("submit",s=>this.handleBlacklistSubmit(s));const n=e.querySelector("#blacklist-cancel-btn");n&&n.addEventListener("click",()=>{e.remove()});const a=e.querySelector("#blacklist-photo-input");a&&a.addEventListener("change",s=>this.handleBlacklistPhotoUpload(s));const r=e.querySelector("#blacklist-contractor"),l=e.querySelector("#blacklist-contractors-list");if(r&&l)try{let s=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(s=Contractors.getAllContractorsForModules()||[]),s.length===0){const d=[...AppState.appData?.approvedContractors||[],...AppState.appData?.contractors||[]].filter(f=>f&&f.isActive!=="inactive"&&f.isActive!==!1&&f.isActive!=="false"&&f.isActive!=="FALSE");s=Array.from(new Map(d.map(f=>[f.id||f.contractorId,f])).values()).filter(f=>f&&(f.name||f.companyName||f.contractorName)).map(f=>({id:f.id||f.contractorId||"",name:(f.name||f.companyName||f.contractorName||"").trim()})).filter(f=>f.name&&f.name!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641").sort((f,m)=>f.name.localeCompare(m.name,"ar",{sensitivity:"base"}))}if(l.innerHTML=s.map(d=>`<option value="${Utils.escapeHTML(d.name)}" data-contractor-id="${d.id||""}"></option>`).join(""),t?.contractor){const d=t.contractor.split(" - ")[0].trim();r.value=d}}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",s)}const c=e.querySelector("#blacklist-factory");if(c&&(c.addEventListener("change",async s=>{const d=s.target.selectedOptions[0],p=d?.dataset.siteId||d?.value;await this.loadBlacklistPlaces(p)}),o&&t?.factoryId)){const s=t.factoryId;try{await this.loadBlacklistPlaces(s),setTimeout(()=>{const d=e.querySelector("#blacklist-location");d&&t?.location&&(d.value=t.location)},100)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",d)}}},renderBlacklistTable(){const t=[...AppState.appData?.blacklistRegister||[]].sort((o,i)=>{const n=new Date(o.banDate||o.createdAt||0);return new Date(i.banDate||i.createdAt||0)-n});return t.length===0?`
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
                            ${t.map(o=>{const i=this.processPhoto(o),n=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},a=n.canonical?n.displaySrc:"",r=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`
                                <tr>
                                    <td>${o.serialNumber||"-"}</td>
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
                                    <td>
                                        ${i?`<img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629"${r} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
                                                data-photo-url="${Utils.escapeHTML(i)}"
                                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)" title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629"
                                                onerror="Violations._onBlacklistTablePhotoError(this)">`:"-"}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(o.banReason||"")}">
                                        ${Utils.escapeHTML((o.banReason||"-").substring(0,50))}${(o.banReason||"").length>50?"...":""}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(o.notes||"")}">
                                        ${Utils.escapeHTML((o.notes||"-").substring(0,30))}${(o.notes||"").length>30?"...":""}
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="Violations.viewBlacklistDetails('${o.id}')" 
                                                class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="Violations.editBlacklistRecord('${o.id}')" 
                                                class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="Violations.deleteBlacklistRecord('${o.id}')" 
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
        `},async setupBlacklistEventListeners(){setTimeout(async()=>{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",l)}const e=document.getElementById("blacklist-form");if(e&&!e.closest(".modal-overlay")){const l=e.cloneNode(!0);e.parentNode.replaceChild(l,e),l.addEventListener("submit",c=>this.handleBlacklistSubmit(c))}const t=document.getElementById("blacklist-photo-input");t&&!t.closest(".modal-overlay")&&t.addEventListener("change",l=>this.handleBlacklistPhotoUpload(l));const o=document.getElementById("blacklist-search");if(o){const l=o.cloneNode(!0);o.parentNode.replaceChild(l,o),l.addEventListener("input",c=>this.filterBlacklistTable(c.target.value))}const i=document.getElementById("blacklist-add-btn");i?i.dataset.listenerAttached?AppState.debugMode&&Utils.safeLog('\u2139\uFE0F \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0645\u0631\u0628\u0648\u0637 \u0645\u0633\u0628\u0642\u0627\u064B'):(i.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();try{this.showBlacklistForm()}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C Blacklist:",c),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}}),i.dataset.listenerAttached="true",AppState.debugMode&&Utils.safeLog('\u2705 \u062A\u0645 \u0631\u0628\u0637 \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0628\u0646\u062C\u0627\u062D')):AppState.debugMode&&Utils.safeWarn('\u26A0\uFE0F \u0632\u0631 "blacklist-add-btn" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM');const n=document.getElementById("blacklist-factory");n&&!n.closest(".modal-overlay")&&n.addEventListener("change",async l=>{const c=l.target.selectedOptions[0],s=c?.dataset.siteId||c?.value;await this.loadBlacklistPlaces(s)});const a=document.getElementById("blacklist-export-pdf");if(a){const l=a.cloneNode(!0);a.parentNode.replaceChild(l,a),l.addEventListener("click",()=>this.exportBlacklistToPDF())}const r=document.getElementById("blacklist-export-excel");if(r){const l=r.cloneNode(!0);r.parentNode.replaceChild(l,r),l.addEventListener("click",()=>this.exportBlacklistToExcel())}this._hydrateBlacklistDrivePhotos()},100)},async handleBlacklistSubmit(e){e.preventDefault();const t=e.target,o=!!t.dataset.editId;let i=o&&AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.photo||"";const n=t.closest(".modal-overlay"),a=n?n.querySelector("#blacklist-photo-input"):document.getElementById("blacklist-photo-input");if(a?.files?.[0]){const f=a.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}try{i=await this.convertImageToBase64(f)}catch(m){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",m)}}const r=n?n.querySelector("#blacklist-factory"):document.getElementById("blacklist-factory"),l=n?n.querySelector("#blacklist-location"):document.getElementById("blacklist-location"),c=r?.selectedOptions[0],s=l?.selectedOptions[0],d=f=>(n?n.querySelector(`#${f}`):document.getElementById(f))?.value||"",p={id:t.dataset.editId||Utils.generateId("BLACKLIST"),serialNumber:d("blacklist-serial"),factory:r?.value||"",factoryId:c?.dataset.siteId||"",location:l?.value||"",locationId:s?.dataset.placeId||"",fullName:d("blacklist-name"),idNumber:d("blacklist-id-number"),photo:i,job:d("blacklist-job"),contractor:(d("blacklist-contractor")||"").trim().split(" - ")[0],department:d("blacklist-department"),banReason:d("blacklist-ban-reason"),banDate:d("blacklist-ban-date"),bannedBy:d("blacklist-banned-by"),editor:d("blacklist-editor"),notes:d("blacklist-notes"),createdAt:o?AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(i&&i.startsWith("data:"))try{const f=await GoogleIntegration.uploadFileToDrive?.(i,`blacklist_${p.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");f?.success&&(f.directLink||f.shareableLink)?(p.photo=f.directLink||f.shareableLink,AppState.debugMode):(AppState.debugMode,Notification.warning("\u0641\u0634\u0644 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649 Drive. \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0624\u0642\u062A\u0627\u064B."))}catch(f){AppState.debugMode&&Utils.safeWarn("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",f),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+f.message)}await this.saveBlacklistRecord(p,o)},async saveBlacklistRecord(e,t){Loading.show();try{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),t){const r=AppState.appData.blacklistRegister.findIndex(l=>l.id===e.id);r!==-1?AppState.appData.blacklistRegister[r]=e:AppState.appData.blacklistRegister.push(e)}else AppState.appData.blacklistRegister.push(e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(r){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",r),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets")}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D`);const o=document.querySelector(".modal-overlay");o&&o.querySelector("#blacklist-form")&&o.remove();const i=document.getElementById("blacklist-cards-container");i&&(i.innerHTML=this.renderBlacklistCards(),this.setupBlacklistEventListeners());const n=document.getElementById("blacklist-table-container");n&&(n.innerHTML=this.renderBlacklistTable(),this.setupBlacklistEventListeners());const a=document.querySelector("#violations-tab-content .card-body");if(a){const r=a.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");r&&(r.outerHTML=this.renderBlacklistStats())}}catch(o){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644:",o),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644: "+o.message)}},handleBlacklistPhotoUpload(e){const t=e.target.files?.[0];if(!t)return;const o=new FileReader;o.onload=i=>{const n=document.querySelector(".modal-overlay"),a=n?n.querySelector("#blacklist-photo-preview"):document.getElementById("blacklist-photo-preview"),r=n?n.querySelector("#blacklist-photo-img"):document.getElementById("blacklist-photo-img");a&&r&&(r.src=i.target.result,a.classList.remove("hidden"))},o.readAsDataURL(t)},async loadBlacklistPlaces(e){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.querySelector(".modal-overlay"),o=t?t.querySelector("#blacklist-location"):document.getElementById("blacklist-location");if(!o)return;o.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',this.getPlaceOptions(e).forEach(n=>{const a=document.createElement("option");a.value=n.name,a.dataset.placeId=n.id,a.textContent=n.name,o.appendChild(a)})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t)}},filterBlacklistTable(e){const t=document.getElementById("blacklist-table-body");if(!t)return;const o=t.querySelectorAll("tr"),i=e.toLowerCase();o.forEach(n=>{const a=n.textContent.toLowerCase();n.style.display=a.includes(i)?"":"none"})},editBlacklistRecord(e){const t=AppState.appData?.blacklistRegister?.find(o=>o.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showBlacklistForm(t)},async deleteBlacklistRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData?.blacklistRegister&&(AppState.appData.blacklistRegister=AppState.appData.blacklistRegister.filter(o=>o.id!==e)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(o){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",o),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Google Sheets")}Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn.active[data-tab="blacklist"]')&&await this.switchTab("blacklist")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",t),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+t.message)}}},viewBlacklistPhoto(e){if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629");return}const t=this.processPhoto(e);if(!t){Notification.error("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}const o=n=>{const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a)},i=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{needsProxy:!1,proxyFileId:""};if(i.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function"){Utils.fetchDriveImageDataUri(i.proxyFileId).then(n=>{n?o(n):Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0646 Google Drive")}).catch(()=>Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"));return}o(t)},viewBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(l=>l.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=this.processPhoto(t),i=o&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(o):{canonical:o||"",displaySrc:o||"",needsProxy:!1,proxyFileId:""},n=i.canonical?i.displaySrc:"",a=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(i):"",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                    ${o?`
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</label>
                        <div class="flex justify-center">
                            <img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${a}
                                class="blacklist-detail-photo max-w-xs max-h-64 object-cover rounded-lg cursor-pointer border-2 border-gray-200"
                                data-photo-url="${Utils.escapeHTML(o)}"
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
        `,document.body.appendChild(r),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(r,{onFetchFail:l=>this._onBlacklistTablePhotoError(l)})},printBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=this.processPhoto(t);try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const i=`BLACKLIST-${(t.id||t.serialNumber||"UNKNOWN").substring(0,12)}`,n="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Details",a=`
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

                ${o?`
                <div class="section-title">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</div>
                <div style="text-align: center; margin: 20px 0;">
                    <img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="max-width: 300px; max-height: 400px; border: 2px solid #ddd; border-radius: 8px; object-fit: contain;" 
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
            `,r=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,n,a,!1,!0,{version:"1.0",releaseDate:t.createdAt||new Date().toISOString(),revisionDate:t.updatedAt||t.createdAt||new Date().toISOString(),"\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A":t.serialNumber||t.id||"",qrData:{type:"Blacklist",id:t.id,serialNumber:t.serialNumber}},t.createdAt||new Date().toISOString(),t.updatedAt||t.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${n}</title></head><body>${a}</body></html>`,l=new Blob([r],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(l),s=window.open(c,"_blank");s?s.onload=()=>{setTimeout(()=>{s.print(),setTimeout(()=>{URL.revokeObjectURL(c),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+i.message)}},async exportBlacklistToPDF(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF..."),typeof window.jsPDF<"u")try{const{jsPDF:a}=window.jsPDF,r=new a("l","mm","a4");r.setFontSize(18),r.text("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 - Blacklist Register",150,15,{align:"center"}),r.setFontSize(10),r.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${Utils.formatDateTime(new Date().toISOString())}`,14,22),r.text(`\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,14,27);const l=e.map(s=>[s.serialNumber||"-",s.banDate?Utils.formatDate(s.banDate):"-",Utils.escapeHTML(s.factory||"-"),Utils.escapeHTML(s.location||"-"),Utils.escapeHTML(s.fullName||"-"),Utils.escapeHTML(s.idNumber||"-"),Utils.escapeHTML(s.job||"-"),Utils.escapeHTML(s.contractor||"-"),Utils.escapeHTML(s.department||"-"),Utils.escapeHTML(s.bannedBy||"-"),Utils.escapeHTML(s.banReason||"-").substring(0,50)]);if(typeof r.autoTable<"u")r.autoTable({head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0634\u0631\u0643\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639"]],body:l,startY:35,styles:{fontSize:7,font:"Arial",cellPadding:2},headStyles:{fillColor:[59,130,246],textColor:255,fontSize:8},alternateRowStyles:{fillColor:[245,247,250]},margin:{left:14,right:14},overflow:"linebreak"});else{let s=35;l.forEach((d,p)=>{s>180&&(r.addPage(),s=20),r.setFontSize(8),r.text(`${p+1}. ${d[4]} - ${d[3]}`,14,s),s+=7})}const c=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.pdf`;r.save(c),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 PDF \u0628\u0646\u062C\u0627\u062D");return}catch(a){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 jsPDF\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0637\u0631\u064A\u0642\u0629 HTML:",a)}const t=`
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
</html>`,o=new Blob([t],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(o),n=window.open(i,"_blank");n?n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(i),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportBlacklistToExcel(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel..."),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS");return}const t=e.map(l=>({\u0645:l.serialNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639":l.banDate?Utils.formatDate(l.banDate):"",\u0627\u0644\u0645\u0635\u0646\u0639:l.factory||"",\u0627\u0644\u0645\u0648\u0642\u0639:l.location||"","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A":l.fullName||"","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629":l.idNumber||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:l.job||"","\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644":l.contractor||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:l.department||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639":l.bannedBy||"","\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":l.editor||"","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639":l.banReason||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:l.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":l.createdAt?Utils.formatDateTime(l.createdAt):"","\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":l.updatedAt?Utils.formatDateTime(l.updatedAt):""})),o=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(t),n=[{wch:8},{wch:12},{wch:15},{wch:15},{wch:25},{wch:15},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:40},{wch:40},{wch:18},{wch:18}];i["!cols"]=n,XLSX.utils.book_append_sheet(o,i,"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646");const r=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(o,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof Violations<"u"&&(window.Violations=Violations,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Violations module loaded and available on window.Violations"))}catch{if(typeof window<"u"&&typeof Violations<"u")try{window.Violations=Violations}catch{}}})();
