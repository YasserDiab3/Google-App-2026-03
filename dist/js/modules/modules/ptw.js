const PTW={approvals:[],formApprovals:[],formCircuitOwnerId:"__default__",formCircuitName:"",_loadPTWListTimeout:null,_ptwBackendLoadPromise:null,_mapMarkersToken:0,_registrySanitizedCache:null,_registryTableMountToken:0,_isSubmitting:!1,_isSavingManualPermit:!1,_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(e){const a=e||document,i=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;i&&(typeof i.applyI18n=="function"&&i.applyI18n(a),typeof i.applyLiteralTranslations=="function"&&i.applyLiteralTranslations(a))},_t(e,a){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,a):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,a):a},statusLabel(e){const a=String(e||"").trim();if(!a)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const r={\u0645\u063A\u0644\u0642:"module.ptw.status.closed",\u0645\u0641\u062A\u0648\u062D:"module.ptw.status.open",\u0645\u0631\u0641\u0648\u0636:"module.ptw.status.rejected","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"module.ptw.status.underReview","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"module.ptw.status.approved","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"module.ptw.status.safelyCompleted","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"module.ptw.status.forcedClose","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":"module.ptw.status.incomplete"}[a];return r?this._t(r,a):a},approvalRoleLabel(e){const a=String(e||"").trim();if(!a)return"";const r={"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":"module.ptw.approval.requestingOfficer","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"module.ptw.approval.areaManager","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629":"module.ptw.approval.safetyOfficer","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629":"module.ptw.approval.approvalRequired"}[a];return r?this._t(r,a):a},formatDurationI18n(e){if(!Number.isFinite(e))return this._t("module.ptw.duration.error","\u062E\u0637\u0623");if(e<0)return this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D");const a=Math.floor(e/(1e3*60)),i=Math.floor(a/60),r=a%60;return i===0?this._t("module.ptw.duration.minutesOnly","{n} \u062F\u0642\u064A\u0642\u0629").replace(/\{n\}/g,String(r)):r===0?this._t("module.ptw.duration.hoursOnly","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(i)):this._t("module.ptw.duration.hoursAndMinutes","{h} \u0633\u0627\u0639\u0629 \u0648 {m} \u062F\u0642\u064A\u0642\u0629").replace(/\{h\}/g,String(i)).replace(/\{m\}/g,String(r))},ensureI18nObservers(e){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),e&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(a=>{a.forEach(i=>{i.addedNodes.forEach(r=>{r&&r.nodeType===1&&this.applyModuleI18n(r)})})}),this._i18nSectionObserver.observe(e,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(a=>{a.forEach(i=>{i.addedNodes.forEach(r=>{!r||r.nodeType!==1||(r.classList?.contains("modal-overlay")||r.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(r)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},getDefaultApprovals(){return[{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:0},{role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:1,approvalRoleKey:"areaManager"},{role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:2,approvalRoleKey:"maintenanceEngineer"},{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:3,isSafetyOfficer:!0}]},_PTW_IA_ROLE_BY_AR:{"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"areaManager","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629":"maintenanceEngineer"},_PTW_IA_ROLE_LABELS:{areaManager:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",maintenanceEngineer:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"},_resolveIaRoleKey(e,a){return a?String(a).trim():this._PTW_IA_ROLE_BY_AR[String(e||"").trim()]||""},_iaWorkflowCacheKey:"",_iaWorkflowCachePromise:null,async _getCachedIaWorkflow(e){const a=Array.isArray(e)?e.filter(Boolean):[];if(!a.length)return null;const i=a.slice().sort().join("|");return this._iaWorkflowCacheKey===i&&this._iaWorkflowCachePromise?this._iaWorkflowCachePromise:(this._iaWorkflowCacheKey=i,this._iaWorkflowCachePromise=this._buildIssuingAuthoritiesWorkflow(a).catch(r=>{throw this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null,r}),this._iaWorkflowCachePromise)},_clearIaWorkflowCache(){this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null},async _fetchIaCandidatesForRole(e,a){const i=String(a||"").trim();if(!i||i==="general")return[];const r=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!r||typeof r.getAuthoritiesForApprovalRole!="function")return[];const s=this._extractPermitTypeFields(e);try{return await r.getAuthoritiesForApprovalRole(s,i)}catch(o){return typeof Utils<"u"&&Utils.safeWarn("_fetchIaCandidatesForRole error:",o),[]}},_manualEntryToPtwStub(e){return e?{hotWorkDetails:e.hotWorkDetails,confinedSpaceDetails:e.confinedSpaceDetails,heightWorkDetails:e.heightWorkDetails,lotoApplied:e.lotoApplied,coldWorkType:e.coldWorkType,excavationLength:e.excavationLength,excavationWidth:e.excavationWidth,excavationDepth:e.excavationDepth,soilType:e.soilType,permitType:e.permitType,workType:e.workType||e.permitTypeDisplay,otherWorkType:e.otherWorkType,electricalWorkType:e.electricalWorkType}:null},_renderIaRolePickerHTML(e={}){const a=Utils.escapeHTML,i=String(e.roleLabel||e.role||"").trim(),r=this._resolveIaRoleKey(i,e.roleKey),s=Array.isArray(e.candidates)?e.candidates:[],o=String(e.selectedId||e.approverId||"").trim(),n=String(e.selectedName||e.name||"").trim(),l=e.inputClass||"form-input text-sm w-full manual-approval-name",p=e.sigClass||"",d=!!e.isClosure,c=d?"manual-closure-approval-name":"manual-approval-name",u=l.includes(c)?l:`${l} ${c}`,m=P=>P==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",f=s.find(P=>P.id===o),y=n&&!f&&o!=="__manual__",g=y?"__manual__":o||(s.length===1?s[0].id:"");if(s.length===0)return`
                <input type="text" class="${u}" data-role="${a(i)}" data-ia-role-key="${a(r)}" data-ia-manual-only="true" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${a(n)}">
                <p class="text-xs text-gray-500 mt-0.5 mb-0">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B</p>`;const x=g!=="__manual__"&&!y,k=y||g==="__manual__"?n:"";return`
            <div class="ia-role-picker" data-role="${a(i)}" data-ia-role-key="${a(r)}" data-ia-scope="${d?"closure":"approval"}">
                <select class="form-input text-sm w-full ia-approval-select ${p?"":"mb-1"}" data-role="${a(i)}" data-ia-role-key="${a(r)}">
                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</option>
                    ${s.map(P=>`
                        <option value="${a(P.id||"")}" ${P.id===g?"selected":""}>
                            ${a(P.name||P.email||"")}${a(m(P.personType))}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${g==="__manual__"||y?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="${u} ia-approval-manual ${x?"hidden":""}" data-role="${a(i)}" data-ia-role-key="${a(r)}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B" value="${a(k)}">
            </div>`},_setupIaRolePickerListeners(e){e&&e.querySelectorAll(".ia-role-picker").forEach(a=>{const i=a.querySelector(".ia-approval-select"),r=a.querySelector(".ia-approval-manual");if(!i||!r)return;const s=()=>{const o=i.value==="__manual__";if(r.classList.toggle("hidden",!o),!o&&i.value){const n=i.options[i.selectedIndex];r.value=n?n.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():""}};i.addEventListener("change",s),s()})},_readIaRolePickerValue(e,a,{isClosure:i=!1}={}){const r=typeof e=="string"?e:e?.dataset?.role;if(!r||!a)return{name:"",approverId:"",personType:"",isManualApprover:!0};const s=i?".manual-closure-approval-name":".manual-approval-name",o=i?"#manual-closure-approvals-list":"#manual-approvals-list",n=a.querySelector(o)||a,l=n.querySelector(`.ia-role-picker[data-role="${r}"]`);if(!l)return{name:(n.querySelector(`${s}[data-role="${r}"]`)||a.querySelector(`${s}[data-role="${r}"]`))?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0};const p=l.querySelector(".ia-approval-select"),d=l.querySelector(".ia-approval-manual"),c=l.dataset.iaRoleKey||this._resolveIaRoleKey(r);if(p?.value&&p.value!=="__manual__"){const u=p.options[p.selectedIndex],m=u?u.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():"",f=u&&u.textContent.includes("(\u0645\u0642\u0627\u0648\u0644)")?"contractor":"employee";return{name:m,approverId:p.value,personType:f,isManualApprover:!1,approvalRoleKey:c}}return{name:d?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0,approvalRoleKey:c}},_renderSystemApproverCell(e,a,i,r="approval"){const s=Utils.escapeHTML,o=Array.isArray(e.candidates)?e.candidates:[],n=e.approverId||"",l=e.approver||"",p=e.isManualApprover===!0||!n&&!!l,d=p?"__manual__":n,c=g=>g==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",u=`${r}-approver-select-${a}`,m=`${r}-approver-manual-${a}`,f=`${r}-approver-${a}`;if(o.length===0)return`
                <input type="text" class="form-input ${r}-approver-manual" style="min-width: 180px;"
                    value="${s(l)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F"
                    id="${f}">
                <p class="text-xs text-gray-500 mt-1">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B.</p>`;const y=d!=="__manual__";return`
            <div class="ia-system-approver-picker" data-index="${a}" data-prefix="${r}">
                <select class="form-input ${r}-approver-select" id="${u}" style="min-width: 180px;">
                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                    ${o.map(g=>`
                        <option value="${s(g.id||"")}" ${g.id===d?"selected":""}>
                            ${s(g.name||g.email||"")}${s(c(g.personType))}
                            ${g.email?` - ${s(g.email)}`:""}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${d==="__manual__"?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="form-input ${r}-approver-manual ${y?"hidden":""} mt-1" style="min-width: 180px;"
                    value="${s(p?l:"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u064A\u062F\u0648\u064A\u0627\u064B"
                    id="${m}">
            </div>`},_setupSystemApproverPickerListeners(e){e&&e.querySelectorAll(".ia-system-approver-picker").forEach(a=>{const i=a.dataset.index,r=a.dataset.prefix||"approval",s=a.querySelector(`#${r}-approver-select-${i}`),o=a.querySelector(`#${r}-approver-manual-${i}`);if(!s||!o)return;const n=()=>{o.classList.toggle("hidden",s.value!=="__manual__")};s.addEventListener("change",n),n()})},isSafetyRole(e=""){return["\u0627\u0644\u0633\u0644\u0627\u0645\u0629","Safety"].some(i=>e&&e.toLowerCase().includes(i.toLowerCase()))},updateApprovalNumbers(e){const a=document.getElementById(e);if(!a)return;a.querySelectorAll("tr").forEach((r,s)=>{const o=r.querySelector("td:first-child");o&&(o.textContent=s+1)})},normalizeApprovals(e=[]){return!Array.isArray(e)||e.length===0?this.getDefaultApprovals():e.map((a,i)=>{const r=a.circuitOwnerId||"__default__",s=Array.isArray(a.candidates)?a.candidates.map(d=>d?d.id&&d.name&&d.email!==void 0?d:ApprovalCircuits.toCandidate(ApprovalCircuits.getUserById(d.id||d)):null).filter(Boolean):[];let o=a.approverId||a.approverUserId||"",n=a.approver||"",l=a.approverEmail||"";if(o){const d=ApprovalCircuits.getUserById(o);d&&(n=n||d.name||d.email||"",l=l||d.email||"")}else if(l){const d=s.find(c=>c.email&&c.email.toLowerCase()===l.toLowerCase());d&&(o=d.id,n=d.name||n)}const p={role:a.role||"",approverId:o,approver:n,approverEmail:l,required:a.required!==!1,approved:a.approved===!0,rejected:a.rejected===!0,status:a.status||(a.approved?"approved":a.rejected?"rejected":"pending"),date:a.date||"",comments:a.comments||"",order:typeof a.order=="number"?a.order:i,isSafetyOfficer:a.isSafetyOfficer===!0||this.isSafetyRole(a.role),candidates:s,history:Array.isArray(a.history)?a.history:[],assignedAt:a.assignedAt||"",assignedBy:a.assignedBy||null,circuitOwnerId:r,issuingAuthoritySource:a.issuingAuthoritySource===!0,approvalRoleKey:a.approvalRoleKey||this._resolveIaRoleKey(a.role),isManualApprover:a.isManualApprover===!0,personType:a.personType||"",requiresHseCoApproval:a.requiresHseCoApproval===!0,isHseCoApprovalGate:a.isHseCoApprovalGate===!0};return p.status==="approved"?(p.approved=!0,p.rejected=!1):p.status==="rejected"?(p.approved=!1,p.rejected=!0):(p.status="pending",p.approved=!1,p.rejected=!1),p}).sort((a,i)=>(a.order||0)-(i.order||0))},getNextPendingApproval(e=[]){return e.find(a=>a.status==="pending")},updatePermitStatus(e){if(!e)return;if(e.isManualEntry===!0){const n=String(e.status||"").trim();e.approvals=[],e.status=n||"\u0645\u063A\u0644\u0642";return}if(e.approvals=this.normalizeApprovals(e.approvals||[]),e.approvals.some(n=>n.status==="rejected"&&n.required!==!1)){e.status="\u0645\u0631\u0641\u0648\u0636",e.rejectedAt=e.rejectedAt||new Date().toISOString();return}const i=e.approvals.filter(n=>n.required!==!1),r=i.length>0&&i.every(n=>n.status==="approved"),s=e.approvals.find(n=>n.isSafetyOfficer===!0),o=!s||s.status==="approved";r&&o?(e.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",e.approvedAt=e.approvedAt||new Date().toISOString()):e.approvals.some(l=>l.status==="pending"&&l.required!==!1)?e.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":i.length===0?(e.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",e.approvedAt=e.approvedAt||new Date().toISOString()):e.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"},triggerNotificationsUpdate(){document.dispatchEvent(new CustomEvent("ptw:updated"))},notifyPermitCreated(e){const a=this.getNextPendingApproval(e.approvals||[]);let i=this._t("module.ptw.notify.submitted","\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629.");if(a&&a.role){const r=this.approvalRoleLabel(a.role);a.approver?i+=" "+this._t("module.ptw.notify.nextWithApprover","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role} (\u0627\u0644\u0645\u0633\u0624\u0648\u0644: {name}).").replace(/\{role\}/g,r).replace(/\{name\}/g,String(a.approver)):i+=" "+this._t("module.ptw.notify.nextNeedAssign","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role}. \u064A\u0631\u062C\u0649 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.").replace(/\{role\}/g,r)}Notification.success(i)},updateStatusField(e){const a=document.getElementById("ptw-status");if(!a)return;const i=e||a.getAttribute("data-current-status")||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629";a.value=i,a.setAttribute("data-current-status",i),a.disabled=!0,a.classList.add("opacity-70","cursor-not-allowed"),a.setAttribute("title",this._t("module.ptw.statusField.title","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0628\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A"))},getWorkTypePrefix(e){return!e||e.trim()===""?"PTW":{\u0633\u0627\u062E\u0646:"HTW",\u0628\u0627\u0631\u062F:"CTW",\u0643\u0647\u0631\u0628\u0627\u0626\u064A:"ETW",\u062D\u0631:"EXW",\u0627\u0631\u062A\u0641\u0627\u0639:"HTW",\u0646\u0641\u0637:"OTW",\u063A\u0627\u0632:"GTW",\u0625\u063A\u0644\u0627\u0642:"ISW",\u0643\u064A\u0645\u064A\u0627\u0626\u064A:"CHW",\u0622\u062E\u0631:"OTW","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629":"HTW","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629":"CTW","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629":"ETW","\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631":"EXW","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629":"CSW","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649":"OTW"}[e]||"PTW"},generateSequentialPTWId(e){const a=this.getWorkTypePrefix(e),r=(AppState.appData.ptw||[]).filter(o=>o.id?!e||e.trim()===""?!o.workType||o.workType.trim()===""||o.id.startsWith("PTW_"):o.workType?this.getWorkTypePrefix(o.workType)===a:!1:!1);let s=0;return r.forEach(o=>{if(o.id&&o.id.includes("_")){const n=o.id.split("_");if(n.length>1){const l=parseInt(n[n.length-1]);!isNaN(l)&&l>s&&(s=l)}}}),String(s+1).padStart(4,"0")},generateTemporaryId(e){return`${String(e||"TMP").trim().toUpperCase()}_TMP_${Date.now()}_${Math.random().toString(36).substr(2,6)}`},getSiteOptions(){try{const e=(a,i)=>PTW._t(a,i);return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(a=>({id:a.id,name:a.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(a=>({id:a.id||a.siteId||Utils.generateId("SITE"),name:a.name||a.title||a.label||e("module.ptw.fallback.unnamedSite","\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((a,i)=>({id:a.id||a.siteId||Utils.generateId("SITE"),name:a.name||a.title||a.label||e("module.ptw.fallback.numberedSite","\u0645\u0648\u0642\u0639 {n}").replace(/\{n\}/g,String(i+1))})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??""),i=(n,l)=>this._t(n,l),r=n=>'<option value="">'+(n||i("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639"))+"</option>"+(e||[]).map(l=>'<option value="'+a(l.id)+'">'+a(l.name)+"</option>").join("");["manual-permit-location","ptw-filter-location","ptw-location","analysis-location"].forEach(n=>{const l=document.getElementById(n);if(l&&l.tagName==="SELECT"){const p=l.value;l.innerHTML=r(i("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639")),p&&(l.value=p)}}),["manual-permit-sublocation","ptw-filter-sublocation","ptw-sublocation"].forEach(n=>{const l=document.getElementById(n);if(l&&l.tagName==="SELECT"){const p=(document.getElementById("ptw-location")||document.getElementById("manual-permit-location")||{}).value,d=this.getPlaceOptions(p),c=i("module.ptw.placeholder.selectSub","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A"),u=l.value;l.innerHTML='<option value="">'+c+"</option>"+(d||[]).map(m=>'<option value="'+a(m.id)+'">'+a(m.name)+"</option>").join(""),u&&(l.value=u)}})}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F PTW.refreshSiteDropdowns:",e)}},getDepartmentOptionsForPTW(){try{if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartmentOptions=="function"){const a=DailyObservations.getDepartmentOptions();if(Array.isArray(a)&&a.length>0)return a}if(typeof AppUtils<"u"&&typeof AppUtils.getInitialFormDepartments=="function"){const a=AppUtils.getInitialFormDepartments();if(Array.isArray(a)&&a.length>0)return a}const e=AppState?.companySettings||{};return Array.isArray(e.formDepartments)&&e.formDepartments.length>0?e.formDepartments.map(a=>String(a||"").trim()).filter(Boolean):Array.isArray(e.departments)?e.departments.map(a=>String(a||"").trim()).filter(Boolean):typeof e.departments=="string"?e.departments.split(/\n|,/).map(a=>a.trim()).filter(Boolean):[]}catch(e){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(r=>r.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const r=Permissions.formSettingsState.sites.find(s=>s.id===e);if(r&&Array.isArray(r.places))return r.places.map(s=>({id:s.id,name:s.name}))}if(Array.isArray(AppState.appData?.observationSites)){const r=AppState.appData.observationSites.find(s=>(s.id||s.siteId)===e);if(r)return(Array.isArray(r.places)?r.places:Array.isArray(r.locations)?r.locations:Array.isArray(r.children)?r.children:Array.isArray(r.areas)?r.areas:[]).map((o,n)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${n+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const r=DailyObservations.DEFAULT_SITES.find(s=>(s.id||s.siteId)===e);if(r)return(Array.isArray(r.places)?r.places:Array.isArray(r.locations)?r.locations:Array.isArray(r.children)?r.children:Array.isArray(r.areas)?r.areas:[]).map((o,n)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${n+1}`}))}return[]}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",a),[]}},registryData:[],currentTab:"permits",_isManualPtwEntry(e){return!!(e&&(e.isManualEntry===!0||e.isManualEntry==="true"))},_normalizePtwPersonKey(e){return String(e||"").trim().replace(/\s+/g," ").toLowerCase()},_getManualPermitEntryTimestamp(e){if(!e)return 0;const a=[e.updatedAt,e.createdAt,e.openDate,e.timeFrom,e.date,e.closureDate];for(const i of a){if(!i)continue;const r=new Date(i).getTime();if(!Number.isNaN(r))return r}return 0},_collectManualPermitEntriesForLookup(e=null){const a=new Set,i=[],r=String(e||"").trim(),s=o=>{if(!this._isManualPtwEntry(o))return;const n=String(o.id||o.permitId||"").trim();if(r&&n&&n===r)return;const l=n||`seq:${o.sequentialNumber||""}:${o.paperPermitNo||o.permitNumber||""}`;l&&a.has(l)||(l&&a.add(l),i.push(o))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(s),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(s),i},_parseTeamMembersFromEntry(e){let a=e?.teamMembers;return(!a||!a.length)&&e?.teamMembersText&&(a=String(e.teamMembersText).trim().split(/[،,]/).map(r=>{r=r.trim();const s=r.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return s?{name:s[1].trim(),signature:s[2].trim()}:{name:r,signature:""}}).filter(r=>r.name||r.signature)),Array.isArray(a)?a:[]},_resolveManualLookupRoleKey(e){const a=String(e||"").trim();return a==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"||a==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"?"requestingParty":a==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"?"areaManager":a==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"?"maintenanceEngineer":null},buildKnownTeamMembersIndex(e=null){const a=new Map;return this._collectManualPermitEntriesForLookup(e).forEach(i=>{const r=this._getManualPermitEntryTimestamp(i);this._parseTeamMembersFromEntry(i).forEach(s=>{const o=String(s.name||"").trim();if(!o)return;const n=this._normalizePtwPersonKey(o),l=a.get(n);(!l||r>=l.updatedAt)&&a.set(n,{name:o,signature:String(s.signature||s.id||"").trim(),updatedAt:r})})}),a},buildKnownManualApprovalsIndex(e=null){const a=new Map,i=(s,o,n)=>{if(!s||!o?.name)return;a.has(s)||a.set(s,new Map);const l=a.get(s),p=this._normalizePtwPersonKey(o.name),d=l.get(p);(!d||n>=d.updatedAt)&&l.set(p,{...o,updatedAt:n})},r=(s,o,n)=>{const l=this._getManualPermitEntryTimestamp(s);(Array.isArray(o)&&o.length?o:this.resolveManualApprovalsList(o,n)).forEach(d=>{const c=this._resolveManualLookupRoleKey(d.role);if(!c)return;const u=String(d.name||d.approver||"").trim();u&&i(c,{name:u,signature:String(d.signature||"").trim(),approverId:String(d.approverId||"").trim(),personType:String(d.personType||"").trim()},l)})};return this._collectManualPermitEntriesForLookup(e).forEach(s=>{r(s,s.manualApprovals,s.manualApprovalsText),r(s,s.manualClosureApprovals,s.manualClosureApprovalsText)}),a},lookupKnownTeamMember(e,a){const i=this._normalizePtwPersonKey(e);return!i||!a?null:a.get(i)||null},lookupKnownManualApprover(e,a,i){const r=this._resolveManualLookupRoleKey(e);if(!r||!i||!a)return null;const s=i.get(r);return s&&s.get(this._normalizePtwPersonKey(a))||null},getKnownTeamMemberNames(e){return e?Array.from(e.values()).map(a=>a.name).filter(Boolean):[]},getKnownApproverNamesForRole(e,a){const i=this._resolveManualLookupRoleKey(a);return!i||!e?.has(i)?[]:Array.from(e.get(i).values()).map(r=>r.name).filter(Boolean)},buildManualPermitDatalistHtml(e){const a=Utils.escapeHTML,i=[],r=new Set;return(e||[]).forEach(s=>{const o=String(s||"").trim();if(!o)return;const n=this._normalizePtwPersonKey(o);r.has(n)||(r.add(n),i.push(o))}),i.sort((s,o)=>s.localeCompare(o,"ar")),i.map(s=>`<option value="${a(s)}"></option>`).join("")},_attachManualPermitNameSignatureLookup(e,a,i){if(!e||!a)return;const r=()=>{if(typeof i!="function")return!1;const o=String(e.value||"").trim();if(!o)return!1;const n=i(o);if(!n)return delete e.dataset.knownLoaded,!1;const l=String(n.signature||"").trim()||o;return a.value=l,e.dataset.autoCopiedValue=l,e.dataset.knownLoaded="1",!0},s=()=>{const o=String(e.value||"").trim(),n=String(a.value||"").trim(),l=e.dataset.autoCopiedValue||"";(!n||n===l)&&(a.value=o,e.dataset.autoCopiedValue=o)};e.addEventListener("input",()=>{delete e.dataset.knownLoaded,s()}),e.addEventListener("change",()=>{r()||s()}),e.addEventListener("blur",()=>{r()}),s()},_applyKnownManualApproverToPicker(e,a,i,r){if(!e||!i||!r)return;const o=r.id==="manual-closure-approvals-list"?".manual-closure-approval-sig":".manual-approval-sig",n=r.querySelector(`${o}[data-role="${a}"]`),l=e.querySelector(".ia-approval-select"),p=e.querySelector(".ia-approval-manual"),d=e.querySelector('[data-ia-manual-only="true"]');if(i.approverId&&l?Array.from(l.options).some(u=>u.value===i.approverId)?(l.value=i.approverId,l.dispatchEvent(new Event("change",{bubbles:!0}))):p&&(l.value="__manual__",p.classList.remove("hidden"),p.value=i.name,l.dispatchEvent(new Event("change",{bubbles:!0}))):p?(l&&(l.value="__manual__",p.classList.remove("hidden"),l.dispatchEvent(new Event("change",{bubbles:!0}))),p.value=i.name):d&&(d.value=i.name),n){const c=String(i.signature||"").trim();n.value=c||i.name}},setupManualPermitKnownLookups(e,a,i){if(!e)return;const r={"#manual-approvals-list":["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"],"#manual-closure-approvals-list":["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"]},s={requestingParty:"manual-approval-datalist-requestingParty",areaManager:"manual-approval-datalist-areaManager",maintenanceEngineer:"manual-approval-datalist-maintenanceEngineer"},o=n=>{const l=n?.querySelector(".manual-team-member-name"),p=n?.querySelector(".manual-team-member-signature");l&&(l.setAttribute("list","manual-team-member-names-datalist"),l.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(l,p,d=>this.lookupKnownTeamMember(d,a))};e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row").forEach(o),e._attachManualTeamRowLookup=o,Object.entries(r).forEach(([n,l])=>{const p=e.querySelector(n);p&&l.forEach(d=>{const c=this._resolveManualLookupRoleKey(d),u=c?s[c]:null,m=p.querySelector(`.manual-approval-name[data-role="${d}"], .manual-closure-approval-name[data-role="${d}"]`),f=p.querySelector(`.manual-approval-sig[data-role="${d}"], .manual-closure-approval-sig[data-role="${d}"]`);m&&m.tagName==="INPUT"&&!m.classList.contains("ia-approval-manual")&&(u&&(m.setAttribute("list",u),m.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(m,f,g=>this.lookupKnownManualApprover(d,g,i)));const y=p.querySelector(`.ia-role-picker[data-role="${d}"]`);if(y&&c&&["areaManager","maintenanceEngineer"].includes(c)){const g=y.querySelector(".ia-approval-manual"),x=y.querySelector('[data-ia-manual-only="true"]'),k=g||x;k&&u&&(k.setAttribute("list",u),k.setAttribute("autocomplete","off")),k&&f&&this._attachManualPermitNameSignatureLookup(k,f,w=>this.lookupKnownManualApprover(d,w,i));const P=()=>{const w=String(k?.value||"").trim();if(!w)return;const U=this.lookupKnownManualApprover(d,w,i);U&&this._applyKnownManualApproverToPicker(y,d,U,p)};k&&(k.addEventListener("change",P),k.addEventListener("blur",P))}})})},initRegistry(e=!1){try{if(AppState.appData&&AppState.appData.ptwRegistry&&Array.isArray(AppState.appData.ptwRegistry)){this.setPtwRegistryState(AppState.appData.ptwRegistry,"AppState.ptwRegistry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 AppState`);return}const a=localStorage.getItem("hse_ptw_registry");if(a)try{this.setPtwRegistryState(JSON.parse(a),"localStorage.hse_ptw_registry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 localStorage`)}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 localStorage:",i),this.registryData=[]}else this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",a),this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}},async saveRegistryData(e={}){try{const{skipSync:a=!1}=e;if(this.setPtwRegistryState(this.registryData,"saveRegistryData"),this.refreshRegistryViewIfVisible(),!a&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const i=o=>{const n=String(o?.id||"").trim(),l=String(o?.permitId||"").trim();return n.includes("_TMP_")||l.includes("_TMP_")},r=Array.isArray(this.registryData)?this.registryData.filter(o=>!i(o)):this.registryData;if(Array.isArray(r)&&r.length===0&&Array.isArray(this.registryData)&&this.registryData.length>0)return Utils.safeLog("\u26A0\uFE0F saveRegistryData: \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641\u0627\u062A \u0645\u0624\u0642\u062A\u0629"),!0;const s=await GoogleIntegration.autoSave("PTWRegistry",r);if(s&&s.resolvedPTWRegistry){const o=s.resolvedPTWRegistry,n=(l,p)=>{const d=String(l||"").trim();if(d){if(p&&p.id&&Array.isArray(this.registryData)){const c=this.registryData.findIndex(u=>String(u.paperPermitNumber||"").trim()===String(p.paperPermitNumber||"").trim());c!==-1&&(this.registryData[c]={...this.registryData[c],id:p.id,permitId:d})}if(typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw)){const c=String(p?.paperPermitNumber||"").trim();if(c){const u=AppState.appData.ptw.findIndex(m=>String(m.paperPermitNumber||"").trim()===c);u!==-1&&(AppState.appData.ptw[u]={...AppState.appData.ptw[u],id:d})}}}};Array.isArray(o)?o.forEach(l=>n(l.permitId,l)):o.permitId&&n(o.permitId,o),this.setPtwRegistryState(this.registryData,"saveRegistryData_resolved")}}return!0}catch(a){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",a),!1}},async _fetchPtwRegistryRowsNoMutation(){try{if(!GoogleIntegration||typeof GoogleIntegration._isBackendRpcConfigured!="function"||!GoogleIntegration._isBackendRpcConfigured())return null;const e=AppState.googleConfig?.sheets?.spreadsheetId?.trim();if(!e)return null;const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:e}});if(a&&a.success&&Array.isArray(a.data))return a.data}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 PTWRegistry \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}return null},_manualPermitRowExistsOnBackend(e,a,i){if(!Array.isArray(e)||e.length===0)return!1;const r=String(a?.paperPermitNumber||i?.paperPermitNumber||"").trim(),s=String(a?.permitId||"").trim(),o=String(i?.id||"").trim();return e.some(n=>!n||typeof n!="object"?!1:!!(r&&String(n.paperPermitNumber||"").trim()===r||s&&String(n.permitId||"").trim()===s||o&&String(n.permitId||"").trim()===o))},async syncManualPermitRecordsToBackend(e,a,i={}){const{isNewRegistryEntry:r=!1,isNewPermit:s=!1}=i;if(!e||!a||typeof GoogleIntegration>"u")return!0;const o=["createdBy","createdById","updatedBy","updatedById"],n=12e4,l=async(c,u,m=!1)=>{const f=AppState.googleConfig?.sheets?.spreadsheetId?.trim(),y=k=>{const P={sheetName:c,data:typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(c,k):k,__timeoutMs:n};return f&&(P.spreadsheetId=f),P},g=k=>GoogleIntegration.sendToAppsScript(m?"appendToSheet":"saveToSheet",y(k)),x=k=>{const w={...typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(c,k):{...k}};return o.forEach(U=>{delete w[U]}),w};try{return await g(u)}catch(k){const P=String(k?.message||"");if(!/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(P))throw k;return await g(x(u))}};let p=!1,d=!1;try{const c=await l("PTWRegistry",e,r);if(!c||c.success!==!0)throw new Error(c?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");p=!0;const u=c.resolvedPTWRegistry,m=String(e.paperPermitNumber||a.paperPermitNumber||"").trim(),f=String(e.permitId||a.id||"").trim(),y=(x,k)=>{const P=String(x||"").trim();if(P&&(a.id=P,e&&(e.permitId=P,k&&k.id&&(e.id=k.id)),typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw))){const w=AppState.appData.ptw.findIndex(U=>String(U.id||"").trim()===f);w!==-1&&(AppState.appData.ptw[w]={...AppState.appData.ptw[w],id:P})}};if(u&&u.permitId){if(y(u.permitId,u),m&&Array.isArray(this.registryData)){const x=this.registryData.findIndex(k=>String(k.paperPermitNumber||"").trim()===m&&(k.isManualEntry===!0||k.isManualEntry==="true"));x!==-1&&(this.registryData[x]={...this.registryData[x],...u})}}else{try{typeof this.loadRegistryFromBackend=="function"&&await this.loadRegistryFromBackend()}catch(x){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 PTWRegistry \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",x)}if(m&&Array.isArray(this.registryData)){const x=this.registryData.find(k=>String(k.paperPermitNumber||"").trim()===m&&(k.isManualEntry===!0||k.isManualEntry==="true"));x&&x.permitId&&y(x.permitId,x)}}const g=await l("PTW",a,s);if(!g||g.success!==!0)throw new Error(g?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");d=!0,typeof GoogleIntegration.clearCache=="function"&&(GoogleIntegration.clearCache("PTWRegistry"),GoogleIntegration.clearCache("PTW"));try{typeof this.saveRegistryData=="function"&&await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save())}catch(x){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",x)}return!0}catch(c){throw typeof DataManager<"u"&&DataManager.addToPendingSync&&(p||DataManager.addToPendingSync("PTWRegistry",e),d||DataManager.addToPendingSync("PTW",a)),c}},refreshRegistryViewIfVisible(){try{const e=document.getElementById("ptw-registry-content");e&&e.style.display!=="none"&&(this._refreshRegistryViewLight(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0627\u0644\u0633\u062C\u0644:",e)}},parseDateTimeValue(e){if(e==null||e===""||e==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"||String(e).trim()==="Not specified")return null;if(e instanceof Date)return isNaN(e.getTime())?null:new Date(e.getTime());if(typeof e=="number"&&isFinite(e)){const n=new Date(e);return isNaN(n.getTime())?null:n}const a=String(e).trim();if(!a)return null;const i=a.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);if(i){const[,n,l,p,d,c,u]=i,m=new Date(Number(p),Number(l)-1,Number(n),Number(d||0),Number(c||0),Number(u||0),0);return isNaN(m.getTime())?null:m}const r=a.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})$/);if(r){const[,n,l,p]=r,d=new Date(Number(n),Number(l)-1,Number(p),0,0,0,0);return isNaN(d.getTime())?null:d}const s=a.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/);if(s){const[,n,l,p,d,c,u]=s,m=new Date(Number(n),Number(l)-1,Number(p),Number(d),Number(c),Number(u||0),0);return isNaN(m.getTime())?null:m}const o=new Date(a);return isNaN(o.getTime())?null:o},formatDurationFromMilliseconds(e){return this.formatDurationI18n(e)},dateInputToISO(e){if(!e)return null;const a=String(e).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!a)return null;const[,i,r,s]=a,o=new Date(Number(i),Number(r)-1,Number(s),0,0,0,0);return isNaN(o.getTime())?null:o.toISOString()},calculateTotalTime(e,a){if(!e||!a)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const i=this.parseDateTimeValue(e),r=this.parseDateTimeValue(a);return!i||!r?this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):this.formatDurationFromMilliseconds(r-i)}catch{return this._t("module.ptw.duration.error","\u062E\u0637\u0623")}},getCurrentUserActor(){const e=AppState?.currentUser||{};return{id:String(e.id||"").trim(),name:String(e.name||e.displayName||e.email||"\u0645\u0633\u062A\u062E\u062F\u0645").trim(),email:String(e.email||"").trim(),role:String(e.role||"").trim()}},isUsableDurationText(e){const a=String(e||"").trim();return!(!a||["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D","\u062E\u0637\u0623","Not specified","Invalid","Error"].includes(a)||a===this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")||a===this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D")||a===this._t("module.ptw.duration.error","\u062E\u0637\u0623"))},normalizeRegistryEntry(e){if(!e||typeof e!="object")return e;const a={...e};if((!a.sublocation||String(a.sublocation).trim()==="")&&typeof a.location=="string"){const n=String(a.location).trim(),l=n.indexOf(" - ");if(l>0){const p=n.slice(0,l).trim(),d=n.slice(l+3).trim();p&&d&&(a.location=p,a.sublocation=d)}}const i=a.timeFrom||a.openDate||"",r=this.calculateTotalTime(i,a.timeTo),s=this.calculateTotalTime(i,a.closureDate),o=String(a.totalTime||"").trim();if(!a.openDate&&a.timeFrom&&(a.openDate=a.timeFrom),!a.timeFrom&&a.openDate&&(a.timeFrom=a.openDate),this.isUsableDurationText(r)?a.totalTime=r:this.isUsableDurationText(s)?a.totalTime=s:a.totalTime=this.isUsableDurationText(o)?o:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a.isManualEntry===!0){a.approvals=[],a.skipApprovalFlow=!0,String(a.approvalCircuitOwnerId||"").trim()||(a.approvalCircuitOwnerId="__manual__"),String(a.approvalCircuitName||"").trim()||(a.approvalCircuitName="Manual Entry");const n=String(a.status||"").trim();if(a.status=n||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",a.manualApprovals=this.resolveManualApprovalsList(a.manualApprovals,a.manualApprovalsText),a.manualClosureApprovals=this.resolveManualApprovalsList(a.manualClosureApprovals,a.manualClosureApprovalsText),!Array.isArray(a.requiredPPE)||!a.requiredPPE.length){const l=a.requiredPPE||a.ppeNotes||"";typeof l=="string"&&l.trim()?a.requiredPPE=l.split(/[،,]/).map(p=>p.trim()).filter(Boolean):Array.isArray(a.requiredPPE)||(a.requiredPPE=[])}if((!a.teamMembers||!a.teamMembers.length)&&a.teamMembersText){const l=String(a.teamMembersText).trim();a.teamMembers=l.split(/[،,]/).map(p=>{p=p.trim();const d=p.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return d?{name:d[1].trim(),signature:d[2].trim()}:{name:p,signature:""}}).filter(p=>p.name||p.signature)}}if(a.sequentialNumber!=null&&a.sequentialNumber!==""){const n=parseInt(String(a.sequentialNumber).replace(/^0+(?=\d)/,""),10);!isNaN(n)&&n>0&&(a.sequentialNumber=n)}return a},normalizeRegistryCollection(e){if(!Array.isArray(e))return[];const a=e.map(n=>this.normalizeRegistryEntry(n)).filter(Boolean),i=(n,l)=>{const p=String(n.id||"").includes("_TMP_");return!String(l.id||"").includes("_TMP_")&&p?l:n},r=new Map,s=new Map,o=[];for(const n of a){const l=String(n.id||"").trim();if(l){r.has(l)?r.set(l,i(r.get(l),n)):r.set(l,n);continue}const d=[n.sequentialNumber!=null&&n.sequentialNumber!==""?String(n.sequentialNumber):"",String(n.permitId||"").trim(),String(n.paperPermitNumber||"").trim(),String(n.openDate||n.timeFrom||"").trim(),String(n.location||"").trim(),String(n.requestingParty||"").trim()].filter(Boolean).join("::");if(d)s.has(d)?s.set(d,i(s.get(d),n)):s.set(d,n);else{const c=n.permitId||n.paperPermitNumber;(!c||!o.some(u=>(u.permitId||u.paperPermitNumber)===c))&&o.push(n)}}return[...r.values(),...s.values(),...o]},isLikelyUsersRecord(e){if(!e||typeof e!="object")return!1;const a=!!String(e.email||"").trim(),i=["password","passwordHash","role","permissions"].some(r=>Object.prototype.hasOwnProperty.call(e,r));return a&&i},isValidPtwRegistryRecord(e){if(!e||typeof e!="object"||Array.isArray(e)||this.isLikelyUsersRecord(e))return!1;const i=["id","permitId","sequentialNumber","paperPermitNumber"].some(o=>String(e[o]??"").trim()!=="");return i?["workDescription","location","timeFrom","openDate","permitType","status","authorizedParty"].some(o=>Object.prototype.hasOwnProperty.call(e,o))||i:!1},sanitizePtwRegistryDataset(e,a="unknown"){if(!Array.isArray(e))return[];const i=e.filter(r=>this.isValidPtwRegistryRecord(r));return i.length!==e.length&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0645 \u0631\u0641\u0636 ${e.length-i.length} \u0633\u062C\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0645\u0646 ${a} \u0644\u0628\u064A\u0627\u0646\u0627\u062A PTWRegistry`),this.normalizeRegistryCollection(i)},setPtwRegistryState(e,a="unknown"){const i=this.sanitizePtwRegistryDataset(e,a);this.registryData=i,this._registrySanitizedCache=null,AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...i];try{localStorage.setItem("hse_ptw_registry",Utils.safeStringify(i))}catch{}return i},normalizePermitStatus(e){const a=String(e||"").trim();return!a||a==="closed"||a==="Closed"||a==="CLOSED"||a==="\u0645\u063A\u0644\u0642\u0629"||a==="\u0627\u0643\u062A\u0645\u0644"?"\u0645\u063A\u0644\u0642":a},isPermitClosedStatus(e){const a=this.normalizePermitStatus(e);return a==="\u0645\u063A\u0644\u0642"||a==="\u0645\u0631\u0641\u0648\u0636"||a==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||a==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"||a==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"},isPermitOpenStatus(e){return!this.isPermitClosedStatus(e)},mergePermitsPreferRegistry(e,a){const i=new Map;return(e||[]).forEach(r=>{r&&r.id&&i.set(r.id,{...r,status:this.normalizePermitStatus(r.status)})}),(a||[]).forEach(r=>{if(r&&r.id){const s=i.get(r.id)||{};i.set(r.id,{...s,...r,status:this.normalizePermitStatus(r.status),isFromRegistry:!0,isManualEntry:r.isManualEntry??s.isManualEntry,skipApprovalFlow:r.skipApprovalFlow??s.skipApprovalFlow,approvalCircuitOwnerId:r.approvalCircuitOwnerId||s.approvalCircuitOwnerId,approvalCircuitName:r.approvalCircuitName||s.approvalCircuitName,sequentialNumber:r.sequentialNumber??s.sequentialNumber,paperPermitNumber:r.paperPermitNumber||s.paperPermitNumber})}}),this.sortPermitRecordsNewestFirst(Array.from(i.values()))},getPermitRecordSortKey(e={}){const a=o=>{const n=parseInt(String(o??"").replace(/^0+(?=\d)/,""),10);return Number.isFinite(n)&&n>0?n:0},i=o=>{const n=String(o||"").match(/(?:PTW|REG)_(\d+)/i);return n&&parseInt(n[1],10)||0},r=a(e.sequentialNumber)||i(e.permitId)||i(e.id),s=o=>{const n=this.parseDateTimeValue(o);return n&&!isNaN(n.getTime())?n.getTime():0};return{seq:r,createdAt:s(e.createdAt),startAt:s(e.openDate||e.timeFrom||e.startDate),updatedAt:s(e.updatedAt||e.endDate||e.timeTo)}},sortPermitRecordsNewestFirst(e){if(!Array.isArray(e))return[];const a=e.map(i=>({record:i,key:this.getPermitRecordSortKey(i)}));return a.sort((i,r)=>{const s=i.key,o=r.key;return o.seq!==s.seq?o.seq-s.seq:o.createdAt!==s.createdAt?o.createdAt-s.createdAt:o.startAt!==s.startAt?o.startAt-s.startAt:o.updatedAt!==s.updatedAt?o.updatedAt-s.updatedAt:String(r.record.id||r.record.permitId||"").localeCompare(String(i.record.id||i.record.permitId||""),"en",{numeric:!0})}),a.map(i=>i.record)},getRegistrySanitizedDataset(){if(Array.isArray(this._registrySanitizedCache))return this._registrySanitizedCache;const e=Array.isArray(this.registryData)?this.registryData:[],a=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry:[],i=a.length>e.length,r=i?a:e.length>0?e:a;i&&r.length!==e.length?this.registryData=r:!i&&e.length>a.length&&(AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...r]);const s=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[];if(s.length===0)return this._registrySanitizedCache=r,r;const o=new Set(s.filter(l=>l&&typeof l=="object").map(l=>String(l.id||"").trim()).filter(Boolean)),n=r.filter(l=>{if(!l)return!1;const p=String(l.permitId||"").trim(),d=String(l.id||"").trim();return l.isManualEntry===!0||l.isManualEntry==="true"?!0:o.has(p)||o.has(d)});return this._registrySanitizedCache=n,n},_getRegistryRowsCached(e=!1){return!e&&Array.isArray(this._registrySanitizedCache)?this._registrySanitizedCache:this.getRegistrySanitizedDataset()},_computeRegistryKpis(e){const a=Array.isArray(e)?e:[],i=a.length,r=a.filter(l=>this.isPermitOpenStatus(l?.status)).length,s=a.filter(l=>this.isPermitClosedStatus(l?.status)).length,o=a.filter(l=>this.isPermitClosedStatus(l?.status)&&(l.closureDate||l.timeTo));let n=this._t("module.ptw.registry.avgNotAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(o.length>0){let l=0;if(o.forEach(p=>{const d=this.parseDateTimeValue(p.timeFrom),c=this.parseDateTimeValue(p.closureDate||p.timeTo);d&&c&&d<c&&(l+=c-d)}),l>0){const p=Math.round(l/o.length/36e5);n=this._t("module.ptw.registry.avgHours","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(p))}}return{registryRowCount:i,openCount:r,closedCount:s,avgTime:n}},_updateRegistryKpiCards(e){const{registryRowCount:a,openCount:i,closedCount:r,avgTime:s}=this._computeRegistryKpis(e),o=(l,p)=>{const d=document.getElementById(l);d&&(d.textContent=String(p))};o("ptw-registry-kpi-total",a),o("ptw-registry-kpi-open",i),o("ptw-registry-kpi-closed",r),o("ptw-registry-kpi-avg",s);const n=document.getElementById("ptw-registry-table-title");if(n){const l=this._t("module.ptw.registry.recordWord","\u0633\u062C\u0644");n.textContent=`${this._t("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${a} ${l})`}},renderRegistryTableShell(){const e=(a,i)=>this._t(a,i);return`
            <div class="ptw-table-wrapper">
                <table class="data-table" id="ptw-registry-data-table">
                    <thead>
                        <tr>
                            <th>${e("module.ptw.registry.col.seq","\u0645\u0633\u0644\u0633\u0644")}</th>
                            <th>${e("module.ptw.registry.col.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                            <th>${e("module.ptw.registry.col.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                            <th>${e("module.ptw.registry.col.requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")}</th>
                            <th>${e("module.ptw.registry.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                            <th>${e("module.ptw.registry.col.timeFrom","\u0627\u0644\u0648\u0642\u062A \u0645\u0646")}</th>
                            <th>${e("module.ptw.registry.col.timeTo","\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649")}</th>
                            <th>${e("module.ptw.registry.col.totalTime","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A")}</th>
                            <th>${e("module.ptw.registry.col.authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627")}</th>
                            <th>${e("module.ptw.registry.col.workDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644")}</th>
                            <th>${e("module.ptw.registry.col.followUp1","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01")}</th>
                            <th>${e("module.ptw.registry.col.followUp2","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02")}</th>
                            <th>${e("module.ptw.registry.col.permitStatus","\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                            <th>${e("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody id="ptw-registry-table-body">
                        <tr data-registry-loading="1">
                            <td colspan="14" class="text-center text-gray-500 py-8">${e("module.ptw.loading.permits","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D...")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`},_renderRegistryTableRow(e){const a=(k,P)=>this._t(k,P);let i,r;e.status==="\u0645\u0641\u062A\u0648\u062D"||e.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?(i="bg-blue-100 text-blue-800",r="fa-folder-open"):e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?(i="bg-green-100 text-green-800",r="fa-check-circle"):e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?(i="bg-red-100 text-red-800",r="fa-lock"):e.status==="\u0645\u063A\u0644\u0642"?(i="bg-gray-100 text-gray-800",r="fa-check-circle"):(i="bg-yellow-100 text-yellow-800",r="fa-clock");const s=e.timeFrom||e.openDate,o=s&&Utils.formatDate?Utils.formatDate(s):a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),n=!s||o==="-"?a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):o,l=k=>{if(!k||k===a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))return a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const P=this.parseDateTimeValue(k);return!P||isNaN(P.getTime())?a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):P.toLocaleTimeString("en-GB-u-nu-latn",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch{return a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}},p=l(s),d=l(e.timeTo),c=this.getPermitTypeDisplay(e),u=c.length>50?c.substring(0,50)+"...":c,m=e.timeFrom&&e.timeTo?this.calculateTotalTime(e.timeFrom,e.timeTo):this.isUsableDurationText(e.totalTime)?e.totalTime:a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),f=this.statusLabel(e.status),y=this.getPermitDisplayNumber(e),g=String(e.workDescription||""),x=g.length>30?g.substring(0,30)+"...":g;return`
                <tr data-registry-id="${e.id}">
                    <td class="font-bold text-blue-600">${Utils.escapeHTML(y)}</td>
                    <td>${Utils.escapeHTML(n)}</td>
                    <td title="${Utils.escapeHTML(c)}">${Utils.escapeHTML(u)}</td>
                    <td>${Utils.escapeHTML(e.requestingParty)}</td>
                    <td>${Utils.escapeHTML(e.location)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td>${Utils.escapeHTML(d)}</td>
                    <td class="font-semibold">${Utils.escapeHTML(String(m))}</td>
                    <td>${Utils.escapeHTML(e.authorizedParty)}</td>
                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(g)}">${Utils.escapeHTML(x)}</td>
                    <td>${Utils.escapeHTML(e.supervisor1)}</td>
                    <td>${Utils.escapeHTML(e.supervisor2)}</td>
                    <td>
                        <span class="badge ${i}">
                            <i class="fas ${r} ml-1"></i>
                            ${Utils.escapeHTML(String(f))}
                        </span>
                    </td>
                    <td>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${e.isManualEntry?`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewManualPermitDetails('${e.id}')" title="${a("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${a("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `:`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewRegistryDetails('${e.permitId}')" title="${a("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${a("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `}
                        </div>
                    </td>
                </tr>`},_mountRegistryTableRows(e=!1){const a=document.getElementById("ptw-registry-table-mount");if(!a)return;const i=this._getRegistryRowsCached(e);if(this._updateRegistryKpiCards(i),!i.length){a.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${this._t("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                </div>`,a.removeAttribute("data-registry-table-pending");return}a.querySelector("#ptw-registry-data-table")||(a.innerHTML=this.renderRegistryTableShell());const r=document.getElementById("ptw-registry-table-body");if(!r)return;const s=this.sortPermitRecordsNewestFirst(i);this._registryTableMountToken=(this._registryTableMountToken||0)+1;const o=this._registryTableMountToken,n=45;r.innerHTML="";const l=p=>{if(o!==this._registryTableMountToken)return;const d=s.slice(p,p+n);if(!d.length){if(a.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}return}if(r.insertAdjacentHTML("beforeend",d.map(c=>this._renderRegistryTableRow(c)).join("")),p+n<s.length)requestAnimationFrame(()=>l(p+n));else if(a.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}};l(0)},_warmRegistryView(){const e=document.getElementById("ptw-registry-content");!e||!e.innerHTML.trim()||this._mountRegistryTableRows(!1)},_renderRegistryPlaceholderShell(e){return`
            <div class="content-card">
                <div class="card-body">
                    <div class="empty-state">
                        <div style="width: 300px; margin: 0 auto 16px;">
                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <p class="text-gray-500">${typeof e=="function"?e("module.ptw.loading.registry","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."}</p>
                    </div>
                </div>
            </div>`},_mountRegistryShell(){const e=document.getElementById("ptw-registry-content");if(!(!e||e.getAttribute("data-registry-pending")!=="1"))try{e.innerHTML=this.renderRegistryContent({tableMode:"shell"}),e.removeAttribute("data-registry-pending"),this.setupRegistryEventListeners();const a=()=>this._warmRegistryView();typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:900}):setTimeout(a,0)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0633\u062C\u0644:",a)}},_renderMapPlaceholderShell(e){return`
            <div class="content-card" style="height:100%;min-height:600px;">
                <div class="card-body flex items-center justify-center" style="min-height:560px;">
                    <div class="empty-state">
                        <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                        <p class="text-gray-500">${typeof e=="function"?e("module.ptw.map.loadingMap","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."}</p>
                    </div>
                </div>
            </div>`},_mountMapShell(){const e=document.getElementById("ptw-map-content");if(!(!e||e.getAttribute("data-map-pending")!=="1"))try{e.innerHTML=this.renderMapContent(),e.removeAttribute("data-map-pending"),this.applyModuleI18n(e)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)}},_resetMapTabVisibility(e){e&&(e.style.display="flex",e.style.flexDirection="column",e.style.height="calc(100vh - 280px)",e.style.minHeight="600px",e.style.width="100%",e.style.visibility="visible",e.style.opacity="1",e.style.position="relative",e.style.left="auto",e.style.overflow="visible",e.style.pointerEvents="auto",e.style.zIndex="auto")},_ensureMapTabDom(e){if(!e)return!1;e.getAttribute("data-map-pending")==="1"&&this._mountMapShell(),document.getElementById("ptw-map")||(e.innerHTML=this.renderMapContent(),e.removeAttribute("data-map-pending"),this.applyModuleI18n(e)),e.removeAttribute("data-tab-lazy");const a=document.getElementById("ptw-map-container"),i=document.getElementById("ptw-map");a&&(a.style.height="100%",a.style.minHeight="600px",a.style.width="100%",a.style.display="block",a.style.visibility="visible",a.style.position="relative"),i&&(i.style.height="100%",i.style.width="100%",i.style.minHeight="600px",i.style.display="block",i.style.visibility="visible");const r=document.getElementById("ptw-map-loading");return r&&(r.style.display="flex"),!!(a&&i)},formatPtwMetricCount(e){const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.floor(a)).toLocaleString("en-US"):"0"},getRegistryPermitsForMetrics(){return this.getRegistrySanitizedDataset().map(a=>({id:a.permitId||a.id,workType:Array.isArray(a.permitType)?a.permitTypeDisplay||a.permitType.join("\u060C "):a.permitType||a.permitTypeDisplay,status:this.normalizePermitStatus(a.status),isFromRegistry:!0}))},getPermitMetricsDataset(){const e=this.getRegistrySanitizedDataset(),a=AppState.appData.ptw||[],i=this.getRegistryPermitsForMetrics(),r=this.mergePermitsPreferRegistry(a,i);return{source:i.length>0?i:r,merged:r,permitsFromList:a,permitsFromRegistry:i,registryRows:e}},getPermitTypeDisplay(e){return e?e.permitTypeDisplay?e.permitTypeDisplay:Array.isArray(e.permitType)?e.permitType.join("\u060C "):typeof e.permitType=="string"?e.permitType:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},generateRegistrySequentialNumber(){if(!this.registryData.length)return 1;const e=r=>{const s=String(r||"").match(/^REG_(\d+)$/i);return s?parseInt(s[1],10):0},a=r=>{const s=String(r||"").match(/^PTW_(\d+)$/i);return s?parseInt(s[1],10):0};return this.registryData.reduce((r,s)=>{const o=parseInt(s.sequentialNumber)||0,n=e(s.id),l=a(s.permitId),p=Math.max(o,n,l);return p>r?p:r},0)+1},getPermitDisplayNumber(e=null){if(!e||typeof e!="object")return"\u2014";const a=l=>{if(l==null||String(l).trim()==="")return"";const p=parseInt(String(l).replace(/^0+(?=\d)/,""),10);return Number.isNaN(p)||p<=0?"":String(p)},i=(l,p)=>{const d=String(l||"").match(new RegExp(`^${p}_(\\d+)$`,"i"));if(!d)return"";const c=parseInt(d[1],10);return Number.isNaN(c)||c<=0?"":String(c)},r=a(e.sequentialNumber);if(r)return r;const s=i(e.permitId,"PTW");if(s)return s;const o=i(e.id,"PTW");if(o)return o;const n=String(e.paperPermitNumber||"").trim();return n||"\u2014"},createRegistryEntry(e){if(!e||!e.id)return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644: \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",e),null;try{const a=this.generateRegistrySequentialNumber();let i=e.siteName||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=e.siteId||e.locationId||null;if(e.siteId&&!e.siteName){const u=this.getSiteOptions().find(m=>m.id===e.siteId||m.name===e.location);u&&(i=u.name,r=u.id||r)}else if(e.location&&!e.siteName){const u=this.getSiteOptions().find(m=>m.id===e.location||m.name===e.location);u?(i=u.name,r=u.id||r):i=e.location}let s=e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o="";Array.isArray(s)?(o=s.join("\u060C "),s=o):typeof s=="string"?o=s:(o="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const n=e.sublocationName||e.sublocation||null,l=e.sublocationId||null;let p="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[0]){const u=e.approvals[0].approver;typeof u=="string"?p=u:typeof u=="object"&&u?p=u.name||u.email||u.id||e.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":p=e.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let d="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[1]){const u=e.approvals[1].approver;typeof u=="string"?d=u:typeof u=="object"&&u?d=u.name||u.email||u.id||e.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":d=e.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}const c={id:this.generateTemporaryId("REG"),sequentialNumber:a,permitId:e.id,openDate:e.startDate||e.createdAt||new Date().toISOString(),permitType:s,permitTypeDisplay:o,requestingParty:String(e.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),locationId:r?String(r).trim():null,location:String(i).trim(),sublocationId:l?String(l).trim():null,sublocation:n?String(n).trim():null,timeFrom:e.startDate||e.createdAt||new Date().toISOString(),timeTo:e.endDate||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",totalTime:this.calculateTotalTime(e.startDate,e.endDate)||"",authorizedParty:String(e.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),workDescription:String(e.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),supervisor1:String(p).trim(),supervisor2:String(d).trim(),status:e.status==="\u0645\u063A\u0644\u0642"||e.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?e.status:"\u0645\u0641\u062A\u0648\u062D",closureDate:null,closureReason:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F:",c.id,c.sequentialNumber),c}catch(a){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",a),null}},async addToRegistry(e,a={}){const{skipSave:i=!1}=a;try{if(!e||!e.id){Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629");return}Array.isArray(this.registryData)||this.initRegistry();const r=e.id||e.permitId;if(this.registryData.find(n=>n.permitId===r||n.permitId===e.id||n.permitId===e.permitId||n.id===e.registryId||e.paperPermitNumber&&n.paperPermitNumber&&String(n.paperPermitNumber).trim()===String(e.paperPermitNumber).trim()))return Utils.safeLog("\u{1F504} \u0627\u0644\u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),await this.updateRegistryEntry(e,a);const o=this.createRegistryEntry(e);o?(this.registryData.push(o),this._registrySanitizedCache=null,i||await this.saveRegistryData(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${o.sequentialNumber} \u0641\u064A \u0627\u0644\u0633\u062C\u0644 (ID: ${o.id})`)):Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644:",r)}},async updateRegistryEntry(e,a={}){const{skipSave:i=!1}=a,r=this.registryData.findIndex(m=>m.permitId===e.id);if(r===-1)return this.addToRegistry(e,a);const s=this.registryData[r];let o=e.siteName||e.location||s.location,n=e.siteId||e.locationId||s.locationId;if(e.siteId||e.locationId){const m=this.getSiteOptions().find(f=>f.id===(e.siteId||e.locationId)||f.name===e.location);m&&(o=m.name,n=m.id||n)}else if(e.location&&!e.siteName){const m=this.getSiteOptions().find(f=>f.id===e.location||f.name===e.location);m&&(o=m.name,n=m.id||n)}let l=e.workType||s.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",p="";Array.isArray(l)?(p=l.join("\u060C "),l=p):typeof l=="string"?p=l:(p=s.permitTypeDisplay||l||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=l||s.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");let d=s.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[0]){const m=e.approvals[0].approver;typeof m=="string"?d=m:typeof m=="object"&&m?d=m.name||m.email||m.id||e.approvals[0].role||s.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":d=e.approvals[0].role||s.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let c=s.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[1]){const m=e.approvals[1].approver;typeof m=="string"?c=m:typeof m=="object"&&m?c=m.name||m.email||m.id||e.approvals[1].role||s.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":c=e.approvals[1].role||s.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}s.permitType=String(l).trim(),s.permitTypeDisplay=String(p||s.permitTypeDisplay||l).trim(),s.requestingParty=String(e.requestingParty||s.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),s.locationId=n?String(n).trim():s.locationId?String(s.locationId).trim():null,s.location=String(o||s.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),s.sublocationId=e.sublocationId?String(e.sublocationId).trim():s.sublocationId?String(s.sublocationId).trim():null,s.sublocation=e.sublocationName||e.sublocation?String(e.sublocationName||e.sublocation).trim():s.sublocation?String(s.sublocation).trim():null,s.timeFrom=e.startDate||s.timeFrom,s.timeTo=e.endDate||s.timeTo,e.startDate&&(s.openDate=e.startDate),s.totalTime=String(this.calculateTotalTime(e.startDate,e.endDate)||s.totalTime||"").trim(),s.authorizedParty=String(e.authorizedParty||s.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),s.workDescription=String(e.workDescription||s.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),s.supervisor1=String(d).trim(),s.supervisor2=String(c).trim();const u=m=>m==="\u0645\u063A\u0644\u0642"||m==="\u0645\u0631\u0641\u0648\u0636"||m==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||m==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A";s.status=e.status==="\u0645\u063A\u0644\u0642"||e.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?e.status:"\u0645\u0641\u062A\u0648\u062D",s.updatedAt=new Date().toISOString(),(u(e.status)||e.closureTime)&&(s.closureDate=e.closureTime||new Date().toISOString(),s.closureReason=e.closureReason||"\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",s.totalTime=this.calculateTotalTime(s.timeFrom,s.closureDate)),this.registryData[r]=s,this._registrySanitizedCache=null,i||await this.saveRegistryData()},async removeFromRegistry(e){const a=this.registryData.findIndex(i=>i.permitId===e);a!==-1&&(this.registryData.splice(a,1),this._registrySanitizedCache=null,await this.saveRegistryData())},async loadPTWFromBackend(){try{const e=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!e){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629");return}AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 Backend...");let a;try{a=await GoogleIntegration.sendRequest({action:"getAllPTWs",data:{}})}catch(i){const r=String(i?.message||i||"");if(!/not implemented|NOT_IMPLEMENTED|غير معتمد|ACTION_NOT_RECOGNIZED|الإجراء غير معروف|Action not recognized/i.test(r))return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0646 Backend:",i),!1;try{a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTW",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}})}catch(o){return AppState.debugMode&&Utils.safeError("\u274C \u0641\u0634\u0644 \u0628\u062F\u064A\u0644 readFromSheet(PTW):",o),!1}}return a&&a.success&&Array.isArray(a.data)?(AppState.appData.ptw=a.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.data.length} \u062A\u0635\u0631\u064A\u062D \u0645\u0646 Backend`),!0):(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",a?.message),!1)}catch(e){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e),!1}},async loadRegistryFromBackend(){try{const e=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!e)return!1;AppState.appData.ptwRegistry=[];try{localStorage.removeItem("hse_ptw_registry")}catch{}try{const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:AppState.googleConfig.sheets.spreadsheetId}});if(a&&a.success&&Array.isArray(a.data))return a.data.length===0?(this.setPtwRegistryState([],"backend.PTWRegistry.empty"),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 - \u0627\u0644\u062C\u062F\u0648\u0644 \u0641\u0627\u0631\u063A \u0641\u064A Backend"),!0):(this.setPtwRegistryState(a.data,"backend.PTWRegistry.readFromSheet"),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 Backend`),!0)}catch(a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",a)}return!1}catch(e){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",e),!1}},async syncRegistryWithPermits(){const e=AppState.appData.ptw||[];if(!e.length)return;Array.isArray(this.registryData)||this.initRegistry();let a=!1;for(const i of e){if(!i?.id)continue;this.registryData.find(s=>s.permitId===i.id)||(await this.addToRegistry(i,{skipSave:!0}),a=!0)}a&&await this.saveRegistryData({skipSync:!0})},_hasLocalPtwCache(){const e=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw.length:0,a=Array.isArray(this.registryData)?this.registryData.length:0,i=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry.length:0;return e>0||a>0||i>0},_refreshRegistryDomFromCache(){const e=document.getElementById("ptw-registry-content");if(!e)return;if(e.getAttribute("data-registry-pending")==="1"){this._mountRegistryShell();return}const a=document.getElementById("ptw-registry-table-mount");a||(e.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()),this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(!0):a&&a.setAttribute("data-registry-table-pending","1"),e.removeAttribute("data-registry-lazy")},_refreshRegistryViewLight(e=!1,a=!1){const i=document.getElementById("ptw-registry-content");if(!i)return;const r=document.getElementById("ptw-registry-table-mount");!r||a?(i.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()):this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(e):r&&r.setAttribute("data-registry-table-pending","1")},_refreshActiveTabAfterBackendSync(){const e=this.currentTab||"permits";try{if(this._refreshRegistryDomFromCache(),e==="permits"){const a=document.getElementById("ptw-permits-content");a&&a.style.display!=="none"&&this.loadPTWList(!0)}else e==="registry"&&this.setupRegistryEventListeners()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 PTW \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",a)}},_startPtwBackendSync(){if(this._backendSyncStarted||this._ptwBackendLoadPromise)return;this._backendSyncStarted=!0;const e=[this.loadPTWFromBackend().catch(a=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 Backend:",a)}),this.loadRegistryFromBackend().catch(a=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",a),!1))];return this._ptwBackendLoadPromise=Promise.all(e).then(()=>this._refreshActiveTabAfterBackendSync()).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0628\u064A\u0627\u0646\u0627\u062A PTW:",a),this._refreshActiveTabAfterBackendSync()}).finally(()=>{this._ptwBackendLoadPromise=null,this._backendSyncStarted=!1}),this._ptwBackendLoadPromise},_renderPermitsLoadingShell(e){return`
            <div class="content-card">
                <div class="card-body">
                    <div class="empty-state">
                        <div style="width: 300px; margin: 0 auto 16px;">
                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <p class="text-gray-500">${typeof e=="function"?e("module.ptw.loading.permits","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."}</p>
                    </div>
                </div>
            </div>`},_mountPermitsListContent(e){const a=document.getElementById("ptw-permits-content");if(a)try{a.innerHTML=this.renderList({includeStats:!1}),this.applyModuleI18n(a),this.setupEventListeners(),this.loadPTWList(!0);const i=()=>{if(!document.getElementById("ptw-permits-content"))return;const r=document.getElementById("ptw-stats-section");if(!(!r||r.getAttribute("data-stats-pending")!=="1"))try{const s=this.renderListStatsSection();s&&(r.outerHTML=s),this.applyModuleI18n(a),this.updateKPIs()}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0637\u0627\u0642\u0627\u062A \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A PTW:",s)}};typeof requestIdleCallback=="function"?requestIdleCallback(i,{timeout:1200}):requestAnimationFrame(()=>setTimeout(i,0))}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",i),a.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${e("module.common.loadDataError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                            <button onclick="PTW.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${e("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                </div>`,this.applyModuleI18n(a)}},renderListStatsSection(){const{source:e,merged:a,permitsFromList:i,permitsFromRegistry:r}=this.getPermitMetricsDataset(),s=e.length,o=e.filter(m=>m&&this.isPermitOpenStatus(m.status)).length,n=e.filter(m=>m&&this.isPermitClosedStatus(m.status)).length,l={};a.forEach(m=>{const f=m.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";l[f]||(l[f]={total:0,open:0,closed:0}),l[f].total++;const y=(m.status||"").trim();y==="\u0645\u063A\u0644\u0642"||y==="\u0645\u0631\u0641\u0648\u0636"||y==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||y==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?l[f].closed++:l[f].open++});const p=Object.entries(l).sort((m,f)=>f[1].total-m[1].total),d=p.length>0?p[0]:null,u=`
            <div class="relative ptw-work-type-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                <i class="fas fa-tags text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-white mb-1 drop-shadow-md">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</h3>
                                <p class="text-xs text-purple-100 font-medium">${Object.keys(l).length} \u0646\u0648\u0639 \u0645\u062E\u062A\u0644\u0641</p>
                            </div>
                        </div>
                    </div>
                    <div class="ptw-card-inner rounded-xl p-4 shadow-lg backdrop-blur-sm">
                        ${d?`
                            <div class="ptw-card-text font-bold text-base mb-4 line-clamp-2" title="${Utils.escapeHTML(d[0])}">
                                ${Utils.escapeHTML(d[0].length>50?d[0].substring(0,50)+"...":d[0])}
                            </div>
                            <div class="flex items-center justify-between gap-2 flex-wrap">
                            <div class="ptw-stat-badge ptw-stat-open flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span class="text-orange-700 font-bold text-sm">\u0645\u0641\u062A\u0648\u062D: ${d[1].open}</span>
                            </div>
                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-700 font-bold text-sm">\u0645\u063A\u0644\u0642: ${d[1].closed}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-total flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                                    <span class="text-gray-800 font-bold text-sm">\u0625\u062C\u0645\u0627\u0644\u064A: ${d[1].total}</span>
                                </div>
                            </div>
                        `:`
                            <div class="ptw-card-text text-center py-4 text-gray-500">
                                <i class="fas fa-info-circle text-2xl mb-2"></i>
                                <p class="text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u062A\u0635\u0627\u0631\u064A\u062D \u062D\u0627\u0644\u064A\u0627\u064B</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;return`
            <div class="content-card mb-6" id="ptw-stats-section">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div class="relative ptw-stat-card ptw-stat-card-open rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                                    <i class="fas fa-unlock-alt text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-open-count">${o}</div>
                                <div class="text-base font-bold text-orange-50">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-closed rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                                    <i class="fas fa-lock text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-closed-count">${n}</div>
                                <div class="text-base font-bold text-green-50">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u063A\u0644\u0642\u0629</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-total rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/25">
                                    <i class="fas fa-clipboard-list text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-total-count">${s}</div>
                                <div class="text-base font-bold text-gray-100">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</div>
                                <div class="mt-3 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/25">
                                    <div class="text-xs text-gray-100 font-medium">
                                        <i class="fas fa-database text-xs ml-1"></i>
                                        ${i.length} \u0642\u0627\u0626\u0645\u0629 + ${r.length} \u0633\u062C\u0644
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${u}
                    </div>
                    ${p.length>0?`
                    <div class="relative ptw-work-types-container rounded-2xl p-8 shadow-2xl overflow-hidden">
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                                        <i class="fas fa-tags text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold text-white mb-1 drop-shadow-md">\u062C\u0645\u064A\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</h3>
                                        <p class="text-sm text-purple-100">\u062A\u0641\u0627\u0635\u064A\u0644 \u0634\u0627\u0645\u0644\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</p>
                                    </div>
                                </div>
                                <div class="bg-white/25 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30 shadow-lg">
                                    <span class="text-lg font-bold text-white">${Object.keys(l).length}</span>
                                    <span class="text-sm text-purple-100 font-medium mr-1">\u0646\u0648\u0639</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="ptw-work-types-stats">
                                ${p.map(([m,f])=>`
                                    <div class="group relative ptw-work-type-item backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                        <div class="relative z-10">
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex-1 min-w-0">
                                                    <div class="ptw-work-type-name font-bold text-sm mb-2 line-clamp-2 leading-tight" title="${Utils.escapeHTML(m)}">
                                                        ${Utils.escapeHTML(m)}
                                                    </div>
                                                </div>
                                                <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-xl font-extrabold rounded-lg px-3 py-1.5 shadow-md ml-3 min-w-[3rem] text-center">
                                                    ${f.total}
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <div class="ptw-stat-badge ptw-stat-open flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                    <span class="text-orange-700 font-bold text-xs">\u0645\u0641\u062A\u0648\u062D: ${f.open}</span>
                                                </div>
                                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span class="text-green-700 font-bold text-xs">\u0645\u063A\u0644\u0642: ${f.closed}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                    `:""}
                </div>
            </div>
        `},async load(){if(this._isLoading){this._reloadRequested=!0;return}if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{if(this._isLoading){this._reloadRequested=!0;return}this.load()}),this._languageChangeListenerAdded=!0),this._iaCacheListenerAdded||(document.addEventListener("issuingAuthoritiesUpdated",()=>{this._clearIaWorkflowCache()}),this._iaCacheListenerAdded=!0),this._isLoading=!0,typeof Utils>"u"){this._isLoading=!1;return}if(typeof AppState>"u"){Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!"),this._isLoading=!1;return}if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}const e=document.getElementById("ptw-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 ptw-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!"),this._isLoading=!1;return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 PTW \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: ptw-section");const a=(i,r)=>window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(i,r):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(i,r):r;try{e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-file-alt ml-3" aria-hidden="true"></i>
                            ${a("module.ptw.title","\u0625\u062F\u0627\u0631\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")}
                        </h1>
                        <p class="section-subtitle">${a("module.ptw.subtitle","\u0625\u0635\u062F\u0627\u0631 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A")}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button id="add-manual-ptw-btn" class="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg" style="background: linear-gradient(135deg, #f59e0b, #d97706); border: none;">
                            <i class="fas fa-edit ml-2"></i>
                            ${a("module.ptw.btn.addManual","\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A")}
                        </button>
                        <button id="add-ptw-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${a("module.ptw.btn.newPermit","\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F")}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0648\u0627\u0644\u0633\u062C\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A -->
            <div class="ptw-tabs mt-4 mb-4 bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto" style="flex-wrap: nowrap; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                <button id="ptw-tab-permits" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-blue-600 bg-blue-50 shadow-sm" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('permits')">
                    <i class="fas fa-list ml-2"></i>
                    ${a("module.ptw.tab.permits","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-registry" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('registry')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    ${a("module.ptw.tab.registry","\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-map" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('map')">
                    <i class="fas fa-map-marked-alt ml-2"></i>
                    ${a("module.ptw.tab.map","\u062E\u0631\u064A\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-analysis" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('analysis')">
                    <i class="fas fa-chart-line ml-2"></i>
                    ${a("module.ptw.tab.analysis","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                </button>
                <button id="ptw-tab-approvals" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('approvals')">
                    <i class="fas fa-check-double ml-2"></i>
                    ${a("module.ptw.tab.approvals","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A")}
                </button>
                <button id="ptw-refresh-header-btn" type="button" class="px-4 py-3 font-semibold text-sm rounded-md transition-all duration-200 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 ml-2" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important;" title="${a("module.ptw.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A")}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${a("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                </button>
            </div>
            
            <style id="ptw-scrollbar-styles">
                /* \u0641\u0644\u062A\u0631 \u0627\u062D\u062A\u0631\u0627\u0641\u064A \u0623\u0639\u0644\u0649 \u0627\u0644\u062C\u062F\u0648\u0644 (\u0645\u0645\u064A\u0632 \u0643\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629) */
                .ptw-filters-row { position: relative; border-bottom: 1px solid #e2e8f0; }
                .ptw-filters-grid { width: 100%; }
                .ptw-filter-field { display: flex; flex-direction: column; gap: 6px; }
                .ptw-filter-label { font-size: 12px; font-weight: 600; color: #4a5568; letter-spacing: 0.5px; display: flex; align-items: center; }
                .ptw-filter-label i { font-size: 11px; color: #3b82f6; }
                .ptw-filter-input { width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-size: 14px; color: #2d3748; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
                .ptw-filter-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
                .ptw-filter-input:hover { border-color: #cbd5e0; }
                .ptw-filter-reset-btn { width: 100%; padding: 10px 16px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(59,130,246,0.25); display: flex; align-items: center; justify-content: center; }
                .ptw-filter-reset-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(59,130,246,0.35); }
                .ptw-filter-reset-btn:active { transform: translateY(0); }
                @media (max-width: 768px) { .ptw-filters-row { padding: 12px 16px !important; margin: 0 -16px 0 -16px !important; width: calc(100% + 32px) !important; } .ptw-filters-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                /* \u0645\u0633\u0637\u0631\u0629 \u062C\u0627\u0646\u0628\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631\u060C \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 (RTL) */
                .ptw-table-wrapper {
                    direction: rtl;
                    overflow-x: auto;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: smooth;
                    max-height: 70vh;
                    width: 100%;
                }
                .ptw-table-wrapper .data-table { direction: rtl; text-align: right; }
                .ptw-table-wrapper::-webkit-scrollbar { width: 12px; height: 12px; }
                .ptw-table-wrapper::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 6px; margin: 10px 0; }
                .ptw-table-wrapper::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #3b82f6, #2563eb); border-radius: 6px; border: 2px solid #f1f5f9; }
                .ptw-table-wrapper::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #2563eb, #1d4ed8); }
                .ptw-table-wrapper::-webkit-scrollbar-corner { background: #f1f5f9; border-radius: 0 0 6px 0; }
                @media (max-width: 768px) { .ptw-table-wrapper { max-height: 60vh; } .ptw-table-wrapper::-webkit-scrollbar { width: 8px; height: 8px; } }
            </style>
            <!-- \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A -->
            <div id="ptw-tab-content" class="min-h-[500px]">
                <div id="ptw-permits-content" class="fade-in">
                    ${this._renderPermitsLoadingShell(a)}
                </div>
                <div id="ptw-registry-content" style="display: none;" class="fade-in" data-registry-pending="1">
                    ${this._renderRegistryPlaceholderShell(a)}
                </div>
                <div id="ptw-map-content" style="display: none; flex-direction: column; height: calc(100vh - 280px); min-height: 600px; width: 100%;" class="fade-in" data-map-pending="1">
                    ${this._renderMapPlaceholderShell(a)}
                </div>
                <div id="ptw-analysis-content" style="display: none;" class="fade-in" data-tab-lazy="analysis">
                </div>
                <div id="ptw-approvals-content" style="display: none;" class="fade-in" data-tab-lazy="approvals">
                </div>
            </div>
        `,this.applyModuleI18n(e),this.ensureI18nObservers(e),this.formSettingsState=null,this.formSettingsEventsBound=!1,this.setupEventListeners(),requestAnimationFrame(()=>{try{this.initRegistry(!0)}catch{}this._mountPermitsListContent(a),this._mountRegistryShell();const i=()=>this._mountMapShell();typeof requestIdleCallback=="function"?requestIdleCallback(i,{timeout:1200}):setTimeout(i,50)}),this._deferredSyncTimer=setTimeout(()=>{this._startPtwBackendSync(),this._hydrateMapCoordinatesFromLocal(),this._scheduleMapCoordinatesBackgroundSync()},1500)}catch(i){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 PTW:",i),e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${a("module.common.loadDataRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <button onclick="PTW.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${a("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(e))}finally{this._isLoading=!1,this._reloadRequested&&(this._reloadRequested=!1,setTimeout(()=>{try{this.load()}catch{}},0))}},switchTab(e){this.currentTab=e,document.querySelectorAll(".ptw-tab-btn").forEach(d=>{d.classList.remove("text-blue-600","bg-blue-50","shadow-sm","active"),d.classList.add("text-gray-600","hover:bg-gray-50"),d.style.setProperty("flex-shrink","0","important"),d.style.setProperty("min-width","fit-content","important"),d.style.setProperty("white-space","nowrap","important"),d.style.setProperty("width","auto","important"),d.style.setProperty("max-width","none","important")});const i=document.querySelector(".ptw-tabs");i&&(i.style.setProperty("flex-wrap","nowrap","important"),i.style.setProperty("overflow-x","auto","important"),i.style.setProperty("overflow-y","visible","important"));const r=document.getElementById(`ptw-tab-${e}`);r&&(r.classList.remove("text-gray-600","hover:bg-gray-50"),r.classList.add("text-blue-600","bg-blue-50","shadow-sm","active"),r.style.setProperty("flex-shrink","0","important"),r.style.setProperty("min-width","fit-content","important"),r.style.setProperty("white-space","nowrap","important"),r.style.setProperty("width","auto","important"),r.style.setProperty("max-width","none","important"));const s=document.getElementById("ptw-permits-content"),o=document.getElementById("ptw-registry-content"),n=document.getElementById("ptw-map-content"),l=document.getElementById("ptw-analysis-content"),p=document.getElementById("ptw-approvals-content");if(s&&(s.style.display="none",s.style.visibility="hidden"),o&&(o.style.display="none",o.style.visibility="hidden"),n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0"),l&&(l.style.display="none",l.style.visibility="hidden"),p&&(p.style.display="none",p.style.visibility="hidden"),e==="permits")n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0",n.style.position="absolute",n.style.left="-9999px",n.style.width="0",n.style.height="0",n.style.overflow="hidden",n.style.pointerEvents="none",n.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1)),s&&(s.style.display="block",s.style.visibility="visible",s.style.position="relative",s.style.left="auto",s.style.width="auto",s.style.height="auto",s.style.overflow="visible",s.style.pointerEvents="auto",s.style.zIndex="auto");else if(e==="registry"){if(n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0",n.style.position="absolute",n.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),this.initRegistry(),o){if(o.style.display="block",o.style.visibility="visible",o.getAttribute("data-registry-pending")==="1")this._mountRegistryShell();else if(!o.innerHTML.trim())this._refreshRegistryDomFromCache();else{const d=document.getElementById("ptw-registry-table-mount");d&&d.getAttribute("data-registry-table-pending")==="1"&&this._mountRegistryTableRows(!1)}this.setupRegistryEventListeners()}}else if(e==="map"){if(n)try{Utils.safeLog("\u{1F5FA}\uFE0F Switching to Map Tab"),s&&(s.style.display="none",s.style.visibility="hidden"),o&&(o.style.display="none",o.style.visibility="hidden"),l&&(l.style.display="none",l.style.visibility="hidden"),p&&(p.style.display="none",p.style.visibility="hidden"),this._resetMapTabVisibility(n),this._ensureMapTabDom(n),this._prewarmLeafletLibrary(),this.mapInitTimeout&&clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null,requestAnimationFrame(()=>{this.currentTab!=="map"||!n||n.style.display==="none"||(this.isMapInstanceAlive()?this.resumeMap():this.initMap().catch(d=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (\u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u062A\u0628\u0648\u064A\u0628):",d?.message||d)}))})}catch(d){if(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0639\u0646\u062F \u0641\u062A\u062D \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u0627\u0626\u0637:",d?.message||d),n){n.style.display="flex";const c=n.querySelector("#ptw-map-error"),u=n.querySelector("#ptw-map-error-message");c&&u?(c.classList.remove("hidden"),u.innerHTML="<p>\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u062F\u0646\u0627\u0647.</p>",n.querySelector("#ptw-map-loading")&&(n.querySelector("#ptw-map-loading").style.display="none")):n.innerHTML=`<div class="p-6 text-center"><p class="text-red-600 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629.</p><button type="button" class="btn-primary" onclick="PTW.switchTab('map')"><i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button></div>`}}}else e==="analysis"?(n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0",n.style.position="absolute",n.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),l&&(l.style.display="block",l.style.visibility="visible",(l.getAttribute("data-tab-lazy")==="analysis"||!l.innerHTML.trim())&&(l.innerHTML=this.renderAnalysisContent(),l.removeAttribute("data-tab-lazy")),this.setupAnalysisEventListeners())):e==="approvals"&&(n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0",n.style.position="absolute",n.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),p&&(p.style.display="block",p.style.visibility="visible",(p.getAttribute("data-tab-lazy")==="approvals"||!p.innerHTML.trim())&&(p.innerHTML=this.renderApprovalsContent(),p.removeAttribute("data-tab-lazy")),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 Approvals Tab Displayed")));e!=="map"&&n&&(n.style.display="none",n.style.visibility="hidden",n.style.opacity="0",n.style.position="absolute",n.style.left="-9999px",n.style.width="0",n.style.height="0",n.style.overflow="hidden",n.style.pointerEvents="none",n.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1))},refreshCurrentTab(){const e=this.currentTab||"permits",a=document.getElementById("ptw-registry-content"),i=document.getElementById("ptw-permits-content"),r=document.getElementById("ptw-map-content"),s=document.getElementById("ptw-analysis-content"),o=document.getElementById("ptw-approvals-content"),n=document.getElementById("ptw-refresh-header-btn");if(n){n.disabled=!0;const p=n.querySelector("i.fa-sync-alt");p&&p.classList.add("fa-spin")}const l=()=>{if(n){n.disabled=!1;const p=n.querySelector("i.fa-sync-alt");p&&p.classList.remove("fa-spin")}this.updateKPIs(),typeof Notification<"u"&&Notification.success&&Notification.success(PTW._t("module.ptw.refresh.success","\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))};try{e==="permits"?(this.loadPTWList(!0),this._startPtwBackendSync(),l()):e==="registry"&&a?(this._refreshRegistryViewLight(!0),this._startPtwBackendSync(),l()):e==="map"&&r?(this.isMapInstanceAlive()?this.resumeMap():typeof this.initMap=="function"&&this.initMap().catch(p=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",p?.message||p)),l()):e==="analysis"&&s?(s.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners(),l()):(e==="approvals"&&o&&(o.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners()),l())}catch(p){if(Utils.safeError("\u062E\u0637\u0623 \u0639\u0646\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B:",p),n){n.disabled=!1;const d=n.querySelector("i.fa-sync-alt");d&&d.classList.remove("fa-spin")}typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.refresh.error","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))}},renderRegistryContent(e={}){const a=e.tableMode==="full"?"full":"shell",i=(c,u)=>this._t(c,u),r=document.getElementById("ptw-map-content");r&&(r.style.display="none",r.style.visibility="hidden",r.style.opacity="0",r.style.position="absolute",r.style.left="-9999px",r.style.width="0",r.style.height="0",r.style.overflow="hidden",r.style.pointerEvents="none",r.style.zIndex="-1");const s=this._getRegistryRowsCached(),{registryRowCount:o,openCount:n,closedCount:l,avgTime:p}=this._computeRegistryKpis(s),d=a==="full"?`<div class="table-responsive">${this.renderRegistryTable()}</div>`:`<div class="table-responsive" id="ptw-registry-table-mount" data-registry-table-pending="1">${this.renderRegistryTableShell()}</div>`;return`
            <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
            <div class="flex justify-between items-center gap-2 mb-4">
                <button id="ptw-registry-add-manual" class="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg" style="background: linear-gradient(135deg, #f59e0b, #d97706); border: none;">
                    <i class="fas fa-plus-circle ml-2"></i>
                    ${i("module.ptw.registry.addManual","\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A")}
                </button>
                <div class="flex gap-2">
                    <button id="ptw-registry-import-excel" class="btn-secondary">
                        <i class="fas fa-file-import ml-2"></i>
                        ${i("module.ptw.registry.importExcel","\u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel")}
                    </button>
                    <button id="ptw-registry-export-excel" class="btn-secondary">
                        <i class="fas fa-file-excel ml-2"></i>
                        ${i("module.ptw.registry.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel")}
                    </button>
                    <button id="ptw-registry-export-pdf" class="btn-primary">
                        <i class="fas fa-file-pdf ml-2"></i>
                        ${i("module.ptw.registry.exportPdf","\u062A\u0635\u062F\u064A\u0631 PDF")}
                    </button>
                </div>
            </div>
            
            <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-list-ol"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${i("module.ptw.registry.totalRecords","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-total">${o}</p>
                        <p class="text-xs text-gray-500 mt-1">${i("module.ptw.registry.sameAsTable","\u064A\u0637\u0627\u0628\u0642 \u0635\u0641\u0648\u0641 \u0627\u0644\u062C\u062F\u0648\u0644")}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-primary">
                    <div class="kpi-icon"><i class="fas fa-folder-open"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${i("module.ptw.registry.openPermits","\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0641\u062A\u0648\u062D\u0629")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-open">${n}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${i("module.ptw.registry.closedPermits","\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u063A\u0644\u0642\u0629")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-closed">${l}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-clock"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${i("module.ptw.registry.avgTime","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0648\u0642\u062A")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-avg" style="font-size: 1.2rem;">${p}</p>
                    </div>
                </div>
            </div>
            
            <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-search ml-2"></i>${i("module.ptw.registry.search","\u0628\u062D\u062B")}
                            </label>
                            <input type="text" id="registry-search" class="form-input" placeholder="${i("module.ptw.registry.searchPlaceholder","\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0623\u0648 \u0627\u0644\u0645\u0633\u0644\u0633\u0644 \u0623\u0648 \u0627\u0644\u0648\u0635\u0641...")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-filter ml-2"></i>${i("module.ptw.registry.status","\u0627\u0644\u062D\u0627\u0644\u0629")}
                            </label>
                            <select id="registry-filter-status" class="form-input">
                                <option value="">${i("module.ptw.registry.allStatuses","\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u0645\u0641\u062A\u0648\u062D</option>
                                <option value="\u0645\u063A\u0644\u0642">\u0645\u063A\u0644\u0642</option>
                                <option value="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646">\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646</option>
                                <option value="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644">\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644</option>
                                <option value="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A">\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>${i("module.ptw.registry.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}
                            </label>
                            <input type="date" id="registry-filter-date-from" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>${i("module.ptw.registry.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}
                            </label>
                            <input type="date" id="registry-filter-date-to" class="form-input">
                            <div id="registry-filter-count-wrapper" class="text-xs text-gray-600 mt-1">
                                ${i("module.ptw.registry.permitCountInRange","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629:")} <span id="registry-filter-count">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644 -->
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title" id="ptw-registry-table-title">
                        <i class="fas fa-table ml-2"></i>
                        ${i("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${o} ${i("module.ptw.registry.recordWord","\u0633\u062C\u0644")})
                    </h2>
                </div>
                <div class="card-body">
                    ${d}
                </div>
            </div>
        `},renderRegistryTable(){const e=(s,o)=>this._t(s,o),a=this.getRegistrySanitizedDataset();if(a.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${e("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                    <p class="text-sm text-gray-400 mt-2">${e("module.ptw.registry.emptyHint","\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F\u0629")}</p>
                </div>
            `;const i=this.sortPermitRecordsNewestFirst(a);let r=`
            <table class="data-table">
                <thead>
                    <tr>
                        <th>${e("module.ptw.registry.col.seq","\u0645\u0633\u0644\u0633\u0644")}</th>
                        <th>${e("module.ptw.registry.col.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                        <th>${e("module.ptw.registry.col.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                        <th>${e("module.ptw.registry.col.requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")}</th>
                        <th>${e("module.ptw.registry.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                        <th>${e("module.ptw.registry.col.timeFrom","\u0627\u0644\u0648\u0642\u062A \u0645\u0646")}</th>
                        <th>${e("module.ptw.registry.col.timeTo","\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649")}</th>
                        <th>${e("module.ptw.registry.col.totalTime","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A")}</th>
                        <th>${e("module.ptw.registry.col.authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627")}</th>
                        <th>${e("module.ptw.registry.col.workDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644")}</th>
                        <th>${e("module.ptw.registry.col.followUp1","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01")}</th>
                        <th>${e("module.ptw.registry.col.followUp2","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02")}</th>
                        <th>${e("module.ptw.registry.col.permitStatus","\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                        <th>${e("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                    </tr>
                </thead>
                <tbody>
        `;return r+=i.map(s=>this._renderRegistryTableRow(s)).join(""),r+="</tbody></table>",`<div class="ptw-table-wrapper">${r}</div>`},renderMapContent(){const e=(a,i)=>this._t(a,i);return`
            <style>
                #ptw-map-container {
                    flex: 1;
                    width: 100%;
                    position: relative;
                    background: #f3f4f6;
                    overflow: hidden;
                    display: block;
                    min-height: 600px;
                    height: 100%;
                }
                #ptw-map { 
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    min-height: 600px;
                    position: relative;
                    display: block;
                }
                .ptw-permit-popup .leaflet-popup-content-wrapper { border-radius: 8px; padding: 0; }
                .ptw-permit-popup .leaflet-popup-content { margin: 0; min-width: 300px; }
                .leaflet-container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            </style>
            <div class="flex flex-col h-full w-full">
                <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-4" style="flex-shrink: 0;">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">
                            <i class="fas fa-map-marked-alt ml-2 text-primary-500"></i>
                            ${e("module.ptw.map.title","\u062E\u0631\u064A\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">${e("module.ptw.map.subtitle","\u0639\u0631\u0636 \u062D\u0627\u0644\u0629 \u0648\u0645\u0648\u0627\u0642\u0639 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u2014 \u0645\u0631\u0643\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0635\u0631 (\u0627\u0644\u0642\u0627\u0647\u0631\u0629)")}</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <select id="ptw-map-filter-status" class="form-select text-sm w-40 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">${e("module.ptw.map.filterAllStatus","\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                            <option value="\u0645\u0641\u062A\u0648\u062D">${e("module.ptw.status.open","\u0645\u0641\u062A\u0648\u062D")}</option>
                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629">${e("module.ptw.status.underReview","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}</option>
                            <option value="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647">${e("module.ptw.status.approved","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647")}</option>
                            <option value="\u0645\u063A\u0644\u0642">${e("module.ptw.status.closed","\u0645\u063A\u0644\u0642")}</option>
                            <option value="\u0645\u0631\u0641\u0648\u0636">${e("module.ptw.status.rejected","\u0645\u0631\u0641\u0648\u0636")}</option>
                        </select>
                        <select id="ptw-map-filter-type" class="form-select text-sm w-40 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">${e("module.ptw.map.filterAllTypes","\u0643\u0644 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629">${e("module.ptw.map.wt.hot","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629")}</option>
                            <option value="\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629">${e("module.ptw.map.wt.enclosed","\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639">${e("module.ptw.map.wt.height","\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629">${e("module.ptw.map.wt.elec","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629">${e("module.ptw.map.wt.cold","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629")}</option>
                        </select>
                        <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-md p-1 shadow-sm">
                            <button id="ptw-map-type-normal" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 bg-blue-500 text-white shadow-sm" title="${e("module.ptw.map.tooltipRoad","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629")}">
                                <i class="fas fa-map ml-1"></i>
                                ${e("module.ptw.map.mapNormal","\u0639\u0627\u062F\u064A")}
                            </button>
                            <button id="ptw-map-type-satellite" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 text-gray-700 hover:bg-gray-100" title="${e("module.ptw.map.tooltipSatellite","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629")}">
                                <i class="fas fa-satellite ml-1"></i>
                                ${e("module.ptw.map.mapSatellite","\u0633\u062A\u0627\u0644\u0627\u064A\u062A")}
                            </button>
                            <button id="ptw-map-type-terrain" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 text-gray-700 hover:bg-gray-100" title="${e("module.ptw.map.tooltipTerrain","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0637\u0628\u0648\u063A\u0631\u0627\u0641\u064A\u0629")}">
                                <i class="fas fa-mountain ml-1"></i>
                                ${e("module.ptw.map.mapTerrain","\u062A\u0636\u0627\u0631\u064A\u0633")}
                            </button>
                    </div>
                        <button id="ptw-map-fullscreen-btn" class="btn-secondary text-sm px-3 py-2" title="${e("module.ptw.map.fullscreen","\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")}">
                            <i class="fas fa-expand ml-2"></i>
                        </button>
                        ${this.isAdmin()?`
                            <button id="ptw-map-settings-btn" class="btn-secondary text-sm px-4 py-2" title="${e("module.ptw.map.locationSettingsTitle","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}">
                                <i class="fas fa-cog ml-2"></i>
                                ${e("module.ptw.map.locationSettings","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                            </button>
                        `:""}
                    </div>
                </div>
                <div id="ptw-map-container">
                    <div id="ptw-map"></div>
                        
                        <div id="ptw-map-legend" class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-[400] hidden md:block border border-gray-200 opacity-90 hover:opacity-100 transition-opacity">
                            <h4 class="font-bold mb-2 text-gray-700 border-b pb-1">${e("module.ptw.map.legend","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</h4>
                            <div class="space-y-1">
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-yellow-500"></span> <span>${e("module.ptw.map.legendOpen","\u0645\u0641\u062A\u0648\u062D/\u0642\u064A\u062F \u0627\u0644\u0639\u0645\u0644")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500"></span> <span>${e("module.ptw.map.legendReview","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500"></span> <span>${e("module.ptw.map.legendApproved","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647/\u0633\u0627\u0631\u064A")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-gray-500"></span> <span>${e("module.ptw.map.legendClosed","\u0645\u063A\u0644\u0642")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span> <span>${e("module.ptw.map.legendRejected","\u0645\u0631\u0641\u0648\u0636/\u0645\u0646\u062A\u0647\u064A")}</span></div>
                            </div>
                        </div>

                        <div id="ptw-map-loading" class="absolute inset-0 flex items-center justify-center bg-gray-100/90 backdrop-blur-sm" style="z-index: 1000;">
                            <div class="text-center">
                                <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                                <p class="text-gray-600 font-medium">${e("module.ptw.map.loadingMap","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629...")}</p>
                            </div>
                        </div>
                        <div id="ptw-map-error" class="hidden absolute inset-0 flex items-center justify-center bg-gray-100" style="z-index: 1000;">
                            <div class="text-center p-6 max-w-md">
                                <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                                <p class="text-gray-700 font-semibold mb-2">${e("module.ptw.map.loadErrorTitle","\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</p>
                                <div id="ptw-map-error-message" class="text-sm text-gray-500 mb-4 text-right">
                                    ${e("module.ptw.map.loadErrorHint","\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0648\u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}
                                </div>
                                <div class="flex gap-2 justify-center">
                                    <button onclick="PTW.initMap()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        ${e("module.ptw.map.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                    </button>
                                    <button onclick="PTW.showMapDebugInfo()" class="btn-secondary">
                                        <i class="fas fa-info-circle ml-2"></i>
                                        ${e("module.ptw.map.debug","\u062A\u0634\u062E\u064A\u0635")}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},mapInstance:null,mapMarkers:[],mapType:null,currentMapType:"normal",leafletLayers:{normal:null,satellite:null,terrain:null},isMapInitializing:!1,mapInitTimeout:null,mapFiltersInitialized:!1,mapFullscreenHandler:null,mapPendingTimeouts:[],isFullscreen:!1,googleMapsApiKeyChecked:!1,hasGoogleMapsApiKey:!1,EGYPT_MAP_DEFAULT:{lat:30.0444,lng:31.2357,zoom:6},LEGACY_SAUDI_MAP_DEFAULT:{lat:24.7136,lng:46.6753},getEgyptMapDefault(){return{lat:this.EGYPT_MAP_DEFAULT.lat,lng:this.EGYPT_MAP_DEFAULT.lng,zoom:this.EGYPT_MAP_DEFAULT.zoom}},_isLegacySaudiMapDefault_(e,a){const i=this.LEGACY_SAUDI_MAP_DEFAULT;return Math.abs(e-i.lat)<.001&&Math.abs(a-i.lng)<.001},_normalizeMapCoordinates_(e){return!e||typeof e.lat!="number"||typeof e.lng!="number"||isNaN(e.lat)||isNaN(e.lng)?this.getEgyptMapDefault():this._isLegacySaudiMapDefault_(e.lat,e.lng)?this.getEgyptMapDefault():e},applyEgyptDefaultView(){if(!this.mapInstance||this.currentTab!=="map")return;const e=this.getCurrentSiteCoordinates()||this.getDefaultFactoryCoordinates();this._applyCoordsToMapView(this._normalizeMapCoordinates_(e))},_scheduleMapTimeout(e,a){const i=setTimeout(()=>{const r=this.mapPendingTimeouts.indexOf(i);r>-1&&this.mapPendingTimeouts.splice(r,1),e()},a);return this.mapPendingTimeouts.push(i),i},_clearMapPendingTimeouts(){!this.mapPendingTimeouts||!this.mapPendingTimeouts.length||(this.mapPendingTimeouts.forEach(e=>clearTimeout(e)),this.mapPendingTimeouts=[])},_notifyMapCoordinatesUpdated(){this.currentTab!=="map"||!this.mapInstance||this._scheduleMapTimeout(()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},50)},_hydrateMapCoordinatesFromLocal(){typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.hydrateLocalToAppState&&MapCoordinatesManager.hydrateLocalToAppState()},_scheduleMapCoordinatesBackgroundSync(){typeof MapCoordinatesManager>"u"||!MapCoordinatesManager.scheduleBackgroundSync||MapCoordinatesManager.scheduleBackgroundSync().then(e=>{e&&(Utils.safeLog("\u2705 \u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0646 Google Sheets"),this._notifyMapCoordinatesUpdated())}).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e)})},shouldUseGoogleMapsForPtw(){if(!this.googleMapsApiKeyChecked){const e=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(e&&e.trim()!==""),this.googleMapsApiKeyChecked=!0}return AppState.googleConfig?.maps?.ptwEngine==="google"&&this.hasGoogleMapsApiKey},_prewarmLeafletLibrary(){return typeof L<"u"&&typeof L.map=="function"?Promise.resolve():this.ensureLeafletReady().catch(()=>{})},_prewarmMapTab(){this._mountMapShell()},_ensureLeafletSatelliteLayer(){return this.leafletLayers.satellite?this.leafletLayers.satellite:typeof L>"u"?null:(this.leafletLayers.satellite=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.satellite)},_ensureLeafletTerrainLayer(){return this.leafletLayers.terrain?this.leafletLayers.terrain:typeof L>"u"?null:(this.leafletLayers.terrain=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.terrain)},async ensureLeafletReady(){if(typeof L<"u"&&typeof L.map=="function")return;if(!document.querySelector('script[src*="leaflet"]'))throw new Error("\u0645\u0643\u062A\u0628\u0629 Leaflet \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");await new Promise((a,i)=>{let r=0;const s=40,o=setInterval(()=>{r++,typeof L<"u"&&typeof L.map=="function"?(clearInterval(o),a()):r>=s&&(clearInterval(o),i(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Leaflet")))},50)})},getCurrentSiteCoordinates(){try{const e=AppState.currentUser||{},a=[e.factoryId,e.factory,e.siteId,e.site,e.plant,e.location].filter(r=>r!=null&&String(r).trim()!==""),i=AppState.appData?.ptwMapSites||[];for(const r of a){const s=String(r).trim(),o=i.find(n=>String(n.id||"").trim()===s||String(n.name||"").trim()===s);if(o&&o.latitude&&o.longitude)return{lat:parseFloat(o.latitude),lng:parseFloat(o.longitude),zoom:parseInt(o.zoom,10)||15}}if(typeof Permissions<"u"&&Permissions.formSettingsState?.sites)for(const r of a){const s=String(r).trim(),o=Permissions.formSettingsState.sites.find(n=>String(n.id||"").trim()===s||String(n.name||"").trim()===s);if(o&&o.latitude&&o.longitude)return{lat:parseFloat(o.latitude),lng:parseFloat(o.longitude),zoom:parseInt(o.zoom,10)||15}}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A:",e)}return null},_applyCoordsToMapView(e){if(!(!this.mapInstance||!e))try{this.mapType==="google"&&typeof google<"u"&&google.maps?(this.mapInstance.setCenter({lat:e.lat,lng:e.lng}),this.mapInstance.setZoom&&this.mapInstance.setZoom(e.zoom||15)):this.mapType==="leaflet"&&this.mapInstance.setView([e.lat,e.lng],e.zoom||15)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0636\u0628\u0637 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)}},isMapInstanceAlive(){if(!this.mapInstance||!this.mapType)return!1;const e=document.getElementById("ptw-map");if(!e||!document.body.contains(e))return!1;try{if(this.mapType==="leaflet"&&this.mapInstance.getContainer){const a=this.mapInstance.getContainer();return!!(a&&a.parentNode&&document.body.contains(a))}if(this.mapType==="google"&&this.mapInstance.getDiv){const a=this.mapInstance.getDiv();return!!(a&&document.body.contains(a))}}catch{return!1}return!1},refreshMapLayout(){if(this.mapInstance)try{this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps?.event&&google.maps.event.trigger(this.mapInstance,"resize")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},resumeMap(){if(this.currentTab!=="map")return;if(!this.isMapInstanceAlive()){this.initMap().catch(i=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",i?.message||i));return}const e=document.getElementById("ptw-map-loading"),a=document.getElementById("ptw-map-error");e&&(e.style.display="none"),a&&a.classList.add("hidden"),requestAnimationFrame(()=>{this.refreshMapLayout(),requestAnimationFrame(()=>{this.refreshMapLayout();try{this.updateMapMarkers()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0646\u062F \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",i)}})})},async initMap(){if(this.currentTab!=="map"){Utils.safeLog("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062E\u0627\u0631\u062C \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}const e=document.getElementById("ptw-map-content");if(!e||e.style.display==="none"||e.style.visibility==="hidden"){Utils.safeLog("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}if(this.isMapInitializing){Utils.safeLog("\u26A0\uFE0F \u062C\u0627\u0631\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062D\u0627\u0644\u064A\u0627\u064B - \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0643\u0631\u0631");return}if(this.isMapInstanceAlive()){this.resumeMap();return}this.isMapInitializing=!0;const a=document.getElementById("ptw-map-container"),i=document.getElementById("ptw-map-loading"),r=document.getElementById("ptw-map-error");let s=document.getElementById("ptw-map");if(!s)if(a)if(a.parentNode&&document.body.contains(a))try{s=document.createElement("div"),s.id="ptw-map",s.style.cssText="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;",a.appendChild(s),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",o),a&&(a.innerHTML='<div id="ptw-map" style="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;"></div>',s=document.getElementById("ptw-map"),s&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 innerHTML"))}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A DOM - ptw-map-container \u063A\u064A\u0631 \u0645\u062A\u0635\u0644"),r){r.classList.remove("hidden");const o=r.querySelector("#ptw-map-error-message");o&&(o.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 - ptw-map-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),r){r.classList.remove("hidden");const o=r.querySelector("#ptw-map-error-message");o&&(o.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}if(!s){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.isMapInitializing=!1;return}Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",s.id),this.destroyMap(),r&&r.classList.add("hidden"),i&&(i.style.display="flex"),s.innerHTML="",document.readyState==="complete"?requestAnimationFrame(()=>{const o=window.getComputedStyle(s);(o.width==="0px"||o.height==="0px"||o.width==="auto"||o.height==="auto")&&(s.style.width="100%",s.style.height="100%",s.style.minHeight="400px")}):(s.style.width="100%",s.style.height="100%",s.style.minHeight="400px"),s.style.display="block",s.style.visibility="visible",s.style.opacity="1",Utils.safeLog("\u2705 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629:",s.id);try{const o=this.getCurrentSiteCoordinates(),n=this._normalizeMapCoordinates_(o||this.getDefaultFactoryCoordinates());let l=!1;if(this.shouldUseGoogleMapsForPtw())try{(typeof google>"u"||!google.maps)&&await Promise.race([this.loadGoogleMapsAPI(),new Promise((d,c)=>setTimeout(()=>c(new Error("Google Maps timeout")),4e3))]),typeof google<"u"&&google.maps&&(l=!0)}catch(d){Utils.safeLog("\u2139\uFE0F \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0625\u0644\u0649 Leaflet/OSM (\u0645\u0635\u0631):",d?.message||d),l=!1}else Utils.safeLog("\u2139\uFE0F \u062E\u0631\u064A\u0637\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644: Leaflet/OSM \u2014 \u0645\u0631\u0643\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0635\u0631");if(l)this.mapInstance=new google.maps.Map(s,{center:{lat:n.lat,lng:n.lng},zoom:n.zoom||15,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN]},streetViewControl:!0,fullscreenControl:!0,zoomControl:!0,scaleControl:!0,rotateControl:!0}),this.mapType="google",this.currentMapType="normal";else try{await this.initLeafletMap(s,n),this.mapType="leaflet",Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 Leaflet \u0628\u0646\u062C\u0627\u062D")}catch(d){throw Utils.safeError("\u274C \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Leaflet:",d),new Error(`\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${d.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"}`)}if(!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - mapInstance \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062A\u0645 \u062A\u0647\u064A\u0626\u062A\u0647\u0627 \u0628\u0646\u062C\u0627\u062D\u060C \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",this.mapType),Utils.safeLog("\u2705 mapInstance:",this.mapInstance),Utils.safeLog("\u2705 mapContainer:",s),Utils.safeLog("\u2705 mapContainer parent:",s?s.parentElement:"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),s&&(document.readyState==="complete"?requestAnimationFrame(()=>{const d=s.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 (getBoundingClientRect):",d.width,"x",d.height),Utils.safeLog("\u{1F4D0} \u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",d.left,d.top),Utils.safeLog("\u{1F4D0} \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0645\u0631\u0626\u064A\u0629:",d.width>0&&d.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(d.width===0||d.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0635\u0631\u064A\u062D\u0629"),s.style.width="100%",s.style.height="600px",s.style.minHeight="400px")}):(s.style.width="100%",s.style.height="600px",s.style.minHeight="400px")),i&&(i.style.display="none"),this.refreshMapLayout();try{this.setupMapEventListeners(),this.mapFiltersInitialized||(this.initMapFilters(),this.mapFiltersInitialized=!0),this.mapFullscreenHandler||(this.mapFullscreenHandler=()=>{this.isFullscreen=!!document.fullscreenElement;const d=document.getElementById("ptw-map-fullscreen-btn");d&&(this.isFullscreen?(d.innerHTML='<i class="fas fa-compress ml-2"></i>',d.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"):(d.innerHTML='<i class="fas fa-expand ml-2"></i>',d.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),this._scheduleMapTimeout(()=>this.refreshMapLayout(),150)},document.addEventListener("fullscreenchange",this.mapFullscreenHandler))}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0645\u0633\u062A\u0645\u0639\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",d)}const p=()=>{try{this.updateMapMarkers()}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",d)}};typeof requestIdleCallback=="function"?requestIdleCallback(p,{timeout:600}):requestAnimationFrame(p),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D - \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645")}catch(o){if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u0634\u0644\u062A (\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645):",o?.message||o),i&&(i.style.display="none"),r){r.classList.remove("hidden");const n=r.querySelector("#ptw-map-error-message");if(n){let l=o.message||"\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A.";l.includes("Leaflet")||l.includes("leaflet")?l="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646: 1) \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A 2) \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP 3) \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629":l.includes("Google Maps")?l="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 Google Maps. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629.":(l.includes("CSP")||l.includes("Content-Security-Policy"))&&(l="\u062A\u0645 \u062D\u0638\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0645\u0627\u0646. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP."),n.innerHTML=`
                        <p class="mb-2"><strong>\u062E\u0637\u0623:</strong> ${l}</p>
                        <p class="text-sm text-gray-600 mb-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u0637\u0623: ${o.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        <div class="text-sm text-gray-500">
                            <p class="mb-1">\u{1F4A1} \u0646\u0635\u0627\u0626\u062D:</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A</li>
                                <li>\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Content Security Policy</li>
                                <li>\u062C\u0631\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 (F5)</li>
                                <li>\u062A\u062D\u0642\u0642 \u0645\u0646 \u0643\u0648\u0646\u0633\u0648\u0644 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</li>
                            </ul>
                        </div>
                    `}}try{const n=this.getDefaultFactoryCoordinates(),l=s||document.getElementById("ptw-map-container");l&&this.showFallbackMap(l,n)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",n)}}finally{this.isMapInitializing=!1}},showFallbackMap(e,a){try{Utils.safeLog("\u{1F504} \u0645\u062D\u0627\u0648\u0644\u0629 \u0639\u0631\u0636 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629...");const i=a.lat,r=a.lng,s=a.zoom||15;e&&(e.innerHTML=`
                    <div style="width: 100%; height: 100%; position: relative; background: #f3f4f6; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-map-marked-alt text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</p>
                            <p class="text-sm text-gray-500 mb-4">\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A: ${i.toFixed(6)}, ${r.toFixed(6)}</p>
                            <a href="https://www.openstreetmap.org/?mlat=${i}&mlon=${r}&zoom=${s}" 
                               target="_blank" 
                               class="btn-primary inline-block"
                               style="text-decoration: none;">
                                <i class="fas fa-external-link-alt ml-2"></i>
                                \u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u062C\u062F\u064A\u062F\u0629
                            </a>
                        </div>
                    </div>
                `)}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",i)}},destroyMap(){try{this._clearMapPendingTimeouts(),this.mapFullscreenHandler&&(document.removeEventListener("fullscreenchange",this.mapFullscreenHandler),this.mapFullscreenHandler=null),this.mapFiltersInitialized=!1,this.mapUpdateHandler&&(document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=null),this.mapStateUpdateHandler&&(window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=null),this.mapMarkers&&this.mapMarkers.length>0&&(this.mapMarkers.forEach(e=>{try{this.mapType==="google"&&e.setMap?(e.setMap(null),e.infoWindow&&e.infoWindow.close()):this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.removeLayer(e)}catch{}}),this.mapMarkers=[]),this.mapInstance&&(this.mapType==="leaflet"&&typeof L<"u"&&this.mapInstance.remove(),this.mapInstance=null),this.mapType=null,this.currentMapType="normal",this.leafletLayers&&(this.leafletLayers.normal=null,this.leafletLayers.satellite=null,this.leafletLayers.terrain=null)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062F\u0645\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},loadGoogleMapsAPI(){return new Promise((e,a)=>{if(typeof google<"u"&&google.maps){e();return}if(!this.googleMapsApiKeyChecked){const p=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(p&&p.trim()!==""),this.googleMapsApiKeyChecked=!0}if(!this.hasGoogleMapsApiKey){a(new Error("\u0645\u0641\u062A\u0627\u062D Google Maps API \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"));return}if(document.querySelector('script[src*="maps.googleapis.com"]')){let p=0;const d=100,c=setInterval(()=>{p++,typeof google<"u"&&google.maps?(clearInterval(c),e()):p>=d&&(clearInterval(c),a(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API")))},100);return}const r=AppState.googleConfig?.maps?.apiKey,s="PTW_GoogleMapsCallback_"+Date.now();let o=null,n=!1;window[s]=()=>{n||(n=!0,o&&clearTimeout(o),delete window[s],setTimeout(()=>{typeof google<"u"&&google.maps?e():a(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))},500))};const l=document.createElement("script");l.src=`https://maps.googleapis.com/maps/api/js?key=${r}&language=ar&region=EG&callback=${s}`,l.async=!0,l.defer=!0,l.onerror=()=>{n||(n=!0,o&&clearTimeout(o),delete window[s],a(new Error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Google Maps API - \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0623\u0648 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644")))},o=setTimeout(()=>{n||(n=!0,(typeof google>"u"||!google.maps)&&(delete window[s],a(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))))},4e3),document.head.appendChild(l)})},async initLeafletMap(e,a){if(e.hasChildNodes()&&(e.innerHTML=""),!document.querySelector('link[href*="leaflet"]')){const i=document.createElement("link");if(i.rel="stylesheet",i.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",i.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",i.crossOrigin="anonymous",document.head.appendChild(i),!document.querySelector('link[href*="leaflet-overrides"]')){const r=document.createElement("link");r.rel="stylesheet",r.href="css/leaflet-overrides.css",document.head.appendChild(r)}}if(typeof L>"u"&&await this.ensureLeafletReady(),typeof L>"u")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644 - \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");if(this.mapInstance&&this.mapType==="leaflet")try{this.mapInstance.remove(),this.mapInstance=null}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0633\u0627\u0628\u0642:",i)}e._leaflet_id&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641 Leaflet \u0633\u0627\u0628\u0642 - \u0633\u064A\u062A\u0645 \u062A\u0646\u0638\u064A\u0641\u0647"),e._leaflet_id=null,e.innerHTML="");try{if(!e||!e.parentElement)throw new Error("\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const i=document.getElementById("ptw-map-content"),r=document.getElementById("ptw-map-container");if(i){const m=window.getComputedStyle(i);(m.display==="none"||m.visibility==="hidden")&&(i.style.display="flex",i.style.visibility="visible"),(!i.style.height||i.style.height==="0px")&&(i.style.height="calc(100vh - 280px)",i.style.minHeight="600px")}if(r){const m=window.getComputedStyle(r);m.display==="none"&&(r.style.display="block"),(!r.style.height||m.height==="0px")&&(r.style.height="100%",r.style.minHeight="600px")}const s=e.parentElement;if(document.readyState==="complete"?requestAnimationFrame(()=>{s&&window.getComputedStyle(s).display==="none"&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629\u060C \u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631\u0647\u0627"),s.style.display="block");const m=window.getComputedStyle(e),f=m.width,y=m.height;Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",f,"x",y),(f==="0px"||y==="0px"||f==="auto"||y==="auto")&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0648\u0627\u0636\u062D\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),e.style.width="100%")}):(s&&(s.style.display="block"),e.style.width="100%",e.style.height="600px",e.style.minHeight="400px",e.style.display="block"),e.style.visibility="visible",e.style.opacity="1",Utils.safeLog("\u{1F5FA}\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet..."),Utils.safeLog("\u{1F4CD} \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A:",a.lat,a.lng,"\u0627\u0644\u062A\u0643\u0628\u064A\u0631:",a.zoom),Utils.safeLog("\u{1F4E6} \u062D\u0627\u0644\u0629 Leaflet:",typeof L<"u"?"\u0645\u062D\u0645\u0644":"\u063A\u064A\u0631 \u0645\u062D\u0645\u0644"),Utils.safeLog("\u{1F4E6} L.map \u0645\u0648\u062C\u0648\u062F:",typeof L<"u"&&typeof L.map=="function"?"\u0646\u0639\u0645":"\u0644\u0627"),typeof L>"u"||typeof L.map!="function")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D - L.map \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(e.innerHTML&&e.innerHTML.trim()!==""&&(Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629"),e.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const m=e.getBoundingClientRect();(m.width===0||m.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),e.style.width="100%",e.style.height="600px",e.style.minHeight="400px")}):(e.style.width="100%",e.style.height="600px",e.style.minHeight="400px"),Utils.safeLog("\u{1F504} \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."),e.innerHTML&&e.innerHTML.trim()!==""&&(e.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const m=e.getBoundingClientRect();(m.width===0||m.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),e.style.width="100%",e.style.height="600px")}):(e.style.width="100%",e.style.height="600px"),this.mapInstance=L.map(e,{preferCanvas:!0,zoomControl:!1}).setView([a.lat,a.lng],a.zoom||this.EGYPT_MAP_DEFAULT.zoom),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),Utils.safeLog("\u2705 mapInstance \u0645\u0648\u062C\u0648\u062F:",this.mapInstance?"\u0646\u0639\u0645":"\u0644\u0627"),Utils.safeLog("\u2705 container._leaflet_id:",e._leaflet_id),!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629");const o=this.mapInstance.getContainer();Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629\u060C \u062C\u0627\u0631\u064A \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 \u0627\u0644\u062E\u0631\u0627\u0626\u0637..."),this.leafletLayers.normal=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'\xA9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> \u2014 \u0645\u0635\u0631',maxZoom:19,subdomains:["a","b","c"],errorTileUrl:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",tileSize:256,crossOrigin:!0,keepBuffer:2,updateWhenIdle:!0,updateWhenZooming:!1}),this.leafletLayers.normal.on("tileerror",(m,f)=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 tile \u0644\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629:",m)}),this.leafletLayers.normal.addTo(this.mapInstance),this.currentMapType="normal",Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 OpenStreetMap");const n=document.getElementById("ptw-map-loading");n&&(n.style.display="none");const l=this.mapInstance._layers||{};Utils.safeLog("\u2705 \u0639\u062F\u062F \u0627\u0644\u0637\u0628\u0642\u0627\u062A:",Object.keys(l).length),L.control.zoom({position:"topright"}).addTo(this.mapInstance),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0643\u0645");const p=()=>{try{if(!this.mapInstance||!this.mapInstance.getContainer){setTimeout(()=>{this.mapInstance&&this.mapInstance.getContainer&&p()},100);return}const m=this.mapInstance.getContainer();if(m){const f=m.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet:",f.width,"x",f.height),Utils.safeLog("\u{1F4D0} \u062D\u0627\u0648\u064A\u0629 Leaflet \u0645\u0631\u0626\u064A\u0629:",f.width>0&&f.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(f.width===0||f.height===0)&&Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0642\u062F \u062A\u0643\u0648\u0646 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629")}else setTimeout(()=>{if(this.mapInstance&&this.mapInstance.getContainer){const f=this.mapInstance.getContainer();if(f){Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");const y=f.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet (\u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629):",y.width,"x",y.height)}}},200)}catch{}};setTimeout(p,50);let d=null;const u=(()=>{try{if(this.mapInstance&&this.mapInstance.getContainer)return this.mapInstance.getContainer()}catch{}return null})();u&&typeof ResizeObserver<"u"&&(d=new ResizeObserver(m=>{for(const f of m){const{width:y,height:g}=f.contentRect;y>0&&g>0&&this.mapInstance&&this.mapInstance.invalidateSize&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 ResizeObserver:",y,"x",g),d&&(d.disconnect(),d=null))}}),d.observe(u),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 ResizeObserver \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629")),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const m=this.mapInstance.getContainer();if(m&&m.offsetWidth>0&&m.offsetHeight>0)try{this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (500ms)");const f=this.mapInstance.getContainer();if(f){const y=f.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize (500ms):",y.width,"x",y.height),y.width===0||y.height===0?(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0644\u0627 \u062A\u0632\u0627\u0644 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const g=this.mapInstance.getContainer();g&&g.offsetWidth>0&&g.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"))}},1e3)):(Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u0631\u0626\u064A\u0629 \u0627\u0644\u0622\u0646"),d&&(d.disconnect(),d=null))}}catch(f){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",f)}else Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u0633\u064A\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const f=this.mapInstance.getContainer();f&&f.offsetWidth>0&&f.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"),d&&(d.disconnect(),d=null))}},1e3)}},500),setTimeout(()=>{if(this.mapInstance)try{const m=document.getElementById("ptw-map-content"),f=document.getElementById("ptw-map-container"),y=document.getElementById("ptw-map");if(m){const x=window.getComputedStyle(m);(x.display==="none"||x.visibility==="hidden")&&(m.style.display="flex",m.style.visibility="visible"),(!m.style.height||m.style.height==="0px"||m.style.height==="auto")&&(m.style.height="calc(100vh - 280px)",m.style.minHeight="600px")}if(f&&(window.getComputedStyle(f).display==="none"&&(f.style.display="block"),(!f.style.height||f.style.height==="0px")&&(f.style.height="100%",f.style.minHeight="600px"),f.getBoundingClientRect().height===0&&(f.style.height="600px")),y&&(window.getComputedStyle(y).display==="none"&&(y.style.display="block"),(!y.style.height||y.style.height==="0px")&&(y.style.height="100%",y.style.width="100%"),y.getBoundingClientRect().height===0&&f)){const P=f.getBoundingClientRect().height;P>0?y.style.height=P+"px":y.style.height="600px"}this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (1000ms)");const g=this.mapInstance.getContainer();g&&requestAnimationFrame(()=>{const x=g.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 (1000ms):",x.width,"x",x.height),x.width>0&&x.height>0?Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0631\u0626\u064A\u0629 \u0648\u062C\u0627\u0647\u0632\u0629"):(y&&y.getBoundingClientRect().height===0&&(y.style.height="600px",y.style.width="100%"),f&&f.getBoundingClientRect().height===0&&(f.style.height="600px"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){this.mapInstance.invalidateSize();const k=this.mapInstance.getContainer();if(k){const P=k.getBoundingClientRect();P.width>0&&P.height>0?Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 - \u062A\u062D\u0642\u0642 \u0645\u0646 CSS \u0644\u0644\u062D\u0627\u0648\u064A\u0627\u062A")}}},500))})}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",m)}},1e3)}catch(i){throw Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet \u0641\u0634\u0644\u062A:",i?.message||i),new Error(`\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}`)}},showMapDebugInfo(){const e=AppState.googleConfig?.maps?.apiKey,a=e&&e.trim()!=="",i={"Leaflet \u0645\u062D\u0645\u0651\u0644":typeof L<"u"?"\u0646\u0639\u0645":"\u0644\u0627","Google Maps \u0645\u062D\u0645\u0651\u0644":typeof google<"u"&&typeof google.maps<"u"?"\u0646\u0639\u0645":"\u0644\u0627","\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Maps":a?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u0645\u0641\u062A\u0627\u062D API \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","CSP script-src":document.querySelector('meta[http-equiv="Content-Security-Policy"]')?"\u0645\u0648\u062C\u0648\u062F":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629":document.getElementById("ptw-map")?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629","\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629":JSON.stringify(this.getDefaultFactoryCoordinates()),"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629":(()=>{const s=this.getPermitMetricsDataset?.();return(Array.isArray(s?.source)?s.source:AppState.appData?.ptw||[]).filter(n=>this.isPermitOpenStatus(n?.status)).length})()},r=Object.entries(i).map(([s,o])=>`${s}: ${o}`).join(`
`);alert(`\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635:

`+r+`

\u0645\u0644\u0627\u062D\u0638\u0629: \u0625\u0630\u0627 \u0643\u0627\u0646 Google Maps "\u0644\u0627" \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0641\u062A\u0627\u062D\u060C \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0633\u0628\u0628 \u0642\u064A\u0648\u062F \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0646\u0637\u0627\u0642.`),typeof Utils<"u"&&typeof Utils.safeLog=="function"&&Utils.safeLog("\u{1F50D} \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",i)},getDefaultFactoryCoordinates(){let e=null;if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getDefaultCoordinatesSync)e=MapCoordinatesManager.getDefaultCoordinatesSync();else{const a=AppState.companySettings||{};a.latitude&&a.longitude?e={lat:parseFloat(a.latitude),lng:parseFloat(a.longitude),zoom:parseInt(a.mapZoom,10)||this.EGYPT_MAP_DEFAULT.zoom}:e=this.getEgyptMapDefault()}return this._normalizeMapCoordinates_(e)},getSiteCoordinates(e,a){try{const r=this.getMapSites().find(s=>(s.id===e||s.name===a)&&s.latitude&&s.longitude);if(r)return{lat:parseFloat(r.latitude),lng:parseFloat(r.longitude),zoom:r.zoom||15};if(typeof Permissions<"u"&&Permissions.formSettingsState){const s=Permissions.formSettingsState.sites?.find(o=>o.id===e||o.name===a);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude)}}if(Array.isArray(AppState.appData?.observationSites)){const s=AppState.appData.observationSites.find(o=>(o.id||o.siteId)===e||o.name===a);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude)}}return this.getDefaultFactoryCoordinates()}catch(i){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639:",i),this.getDefaultFactoryCoordinates()}},isAdmin(){return AppState.currentUser?.role==="admin"||typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()},getMapSites(){if(AppState.appData||(AppState.appData={}),typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getMapSitesSync){const e=MapCoordinatesManager.getMapSitesSync();return AppState.appData.ptwMapSites=e,this._scheduleMapCoordinatesBackgroundSync(),e}return AppState.appData.ptwMapSites||(AppState.appData.ptwMapSites=[]),AppState.appData.ptwMapSites},async saveMapSites(e){if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveMapSites)try{if(await MapCoordinatesManager.saveMapSites(e)){Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0646\u062C\u0627\u062D \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager");return}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",a)}AppState.appData||(AppState.appData={}),AppState.appData.ptwMapSites=e,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW_MAP_SITES",e).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0641\u064A Google Sheets:",a)})},setupMapSettingsEventListeners(){if(!this.isAdmin())return;const e=document.getElementById("ptw-map-settings-btn");if(e)if(e.parentNode&&document.body.contains(e))try{e.replaceWith(e.cloneNode(!0));const a=document.getElementById("ptw-map-settings-btn");a&&a.addEventListener("click",()=>{this.showMapSettingsModal()})}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0632\u0631 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),e.addEventListener("click",()=>{this.showMapSettingsModal()})}else e.addEventListener("click",()=>{this.showMapSettingsModal()})},showMapSettingsModal(){if(!this.isAdmin()){Notification.warning(this._t("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=(s,o)=>this._t(s,o),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${e("module.ptw.mapSettings.title","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                    </h2>
                    <button class="modal-close" aria-label="${e("module.ptw.mapSettings.closeAria","\u0625\u063A\u0644\u0627\u0642")}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderMapSettings()}
                </div>
            </div>
        `,document.body.appendChild(a);const i=()=>{a&&a.parentNode&&a.remove()},r=a.querySelector(".modal-close");r&&r.addEventListener("click",i),a.addEventListener("click",s=>{(s.target===a||s.target.classList.contains("modal-overlay"))&&confirm(this._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&i()}),setTimeout(()=>{const s=document.getElementById("ptw-map-settings-add-site");s&&s.addEventListener("click",()=>{this.addNewMapSite(a)}),a.querySelectorAll(".save-site-btn").forEach(p=>{p.addEventListener("click",d=>{const c=p.getAttribute("data-site-id");this.saveMapSite(c,a)})}),a.querySelectorAll(".delete-site-btn").forEach(p=>{p.addEventListener("click",d=>{const c=p.getAttribute("data-site-id");this.deleteMapSite(c,a)})});const l=document.getElementById("ptw-save-default-coords");l&&l.addEventListener("click",()=>{this.saveDefaultCoordinates()})},100)},renderMapSettings(){const e=(s,o)=>this._t(s,o);if(!this.isAdmin())return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${e("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629")}</p>
                        </div>
                    </div>
                </div>
            `;const a=this.getMapSites(),i=this.getDefaultFactoryCoordinates(),r=e("module.ptw.mapSettings.empty",'\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062D\u062F\u062F\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F" \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.');return`
            <div class="space-y-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-cog ml-2"></i>
                            ${e("module.ptw.mapSettings.title","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">${e("module.ptw.mapSettings.cardSubtitle","\u0625\u062F\u0627\u0631\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u064A \u062A\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</p>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <button id="ptw-map-settings-add-site" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${e("module.ptw.mapSettings.addNew","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F")}
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>${e("module.ptw.mapSettings.col.name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                        <th>${e("module.ptw.mapSettings.col.lat","\u062E\u0637 \u0627\u0644\u0639\u0631\u0636 (Latitude)")}</th>
                                        <th>${e("module.ptw.mapSettings.col.lng","\u062E\u0637 \u0627\u0644\u0637\u0648\u0644 (Longitude)")}</th>
                                        <th>${e("module.ptw.mapSettings.col.zoom","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0643\u0628\u064A\u0631")}</th>
                                        <th>${e("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                                    </tr>
                                </thead>
                                <tbody id="ptw-map-settings-sites-list">
                                    ${a.length===0?`
                                        <tr>
                                            <td colspan="5" class="text-center text-gray-500 py-8">
                                                ${r}
                                            </td>
                                        </tr>
                                    `:a.map(s=>`
                                        <tr data-site-id="${Utils.escapeHTML(s.id||"")}">
                                            <td>
                                                <input type="text" class="form-input site-name-input" 
                                                    value="${Utils.escapeHTML(s.name||"")}" 
                                                    data-site-id="${Utils.escapeHTML(s.id||"")}"
                                                    placeholder="${e("module.ptw.mapSettings.placeholderSiteName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639")}">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lat-input" 
                                                    value="${s.latitude||i.lat}" 
                                                    data-site-id="${Utils.escapeHTML(s.id||"")}"
                                                    placeholder="30.0444">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lng-input" 
                                                    value="${s.longitude||i.lng}" 
                                                    data-site-id="${Utils.escapeHTML(s.id||"")}"
                                                    placeholder="31.2357">
                                            </td>
                                            <td>
                                                <input type="number" min="1" max="20" class="form-input site-zoom-input" 
                                                    value="${s.zoom||i.zoom||15}" 
                                                    data-site-id="${Utils.escapeHTML(s.id||"")}"
                                                    placeholder="15">
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button class="btn-icon btn-icon-success save-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(s.id||"")}" 
                                                        title="${e("module.ptw.mapSettings.btnSave","\u062D\u0641\u0638")}">
                                                        <i class="fas fa-save"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger delete-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(s.id||"")}" 
                                                        title="${e("module.ptw.mapSettings.btnDelete","\u062D\u0630\u0641")}">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            ${e("module.ptw.mapSettings.defaultTitle","\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.ptw.mapSettings.defaultLat","\u062E\u0637 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" step="0.000001" id="ptw-default-lat" class="form-input" 
                                    value="${i.lat}" placeholder="30.0444">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.ptw.mapSettings.defaultLng","\u062E\u0637 \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" step="0.000001" id="ptw-default-lng" class="form-input" 
                                    value="${i.lng}" placeholder="31.2357">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.ptw.mapSettings.defaultZoom","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" min="1" max="20" id="ptw-default-zoom" class="form-input" 
                                    value="${i.zoom||15}" placeholder="15">
                            </div>
                        </div>
                        <div class="mt-4">
                            <button id="ptw-save-default-coords" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${e("module.ptw.mapSettings.saveDefault","\u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `},async addNewMapSite(e){const a=this.getMapSites(),i=this.getDefaultFactoryCoordinates(),r={id:Utils.generateId("MAP_SITE"),name:"",latitude:i.lat,longitude:i.lng,zoom:i.zoom||15};if(a.push(r),await this.saveMapSites(a),e){const s=e.querySelector(".modal-body");s&&(s.innerHTML=this.renderMapSettings(),setTimeout(()=>{const o=document.getElementById("ptw-map-settings-add-site");o&&o.addEventListener("click",()=>{this.addNewMapSite(e)}),e.querySelectorAll(".save-site-btn").forEach(p=>{p.addEventListener("click",()=>{const d=p.getAttribute("data-site-id");this.saveMapSite(d,e)})}),e.querySelectorAll(".delete-site-btn").forEach(p=>{p.addEventListener("click",()=>{const d=p.getAttribute("data-site-id");this.deleteMapSite(d,e)})})},100))}},async saveMapSite(e,a){const i=this.getMapSites(),r=i.find(p=>p.id===e);if(!r)return;const s=document.querySelector(`.site-name-input[data-site-id="${e}"]`),o=document.querySelector(`.site-lat-input[data-site-id="${e}"]`),n=document.querySelector(`.site-lng-input[data-site-id="${e}"]`),l=document.querySelector(`.site-zoom-input[data-site-id="${e}"]`);if(s&&o&&n){if(r.name=s.value.trim(),r.latitude=parseFloat(o.value)||0,r.longitude=parseFloat(n.value)||0,r.zoom=l&&parseInt(l.value)||15,!r.name){Notification.warning(this._t("module.ptw.mapSettings.warnings.enterSiteName","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639"));return}await this.saveMapSites(i),Notification.success(this._t("module.ptw.mapSettings.warnings.saveSiteOk","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D"))}},async deleteMapSite(e,a){if(!confirm(this._t("module.ptw.mapSettings.deleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639\u061F")))return;const r=this.getMapSites().filter(s=>s.id!==e);if(await this.saveMapSites(r),Notification.success(this._t("module.ptw.mapSettings.warnings.deleteSiteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D")),a){const s=a.querySelector(".modal-body");s&&(s.innerHTML=this.renderMapSettings(),setTimeout(()=>{const o=document.getElementById("ptw-map-settings-add-site");o&&o.addEventListener("click",()=>{this.addNewMapSite(a)}),a.querySelectorAll(".save-site-btn").forEach(p=>{p.addEventListener("click",()=>{const d=p.getAttribute("data-site-id");this.saveMapSite(d,a)})}),a.querySelectorAll(".delete-site-btn").forEach(p=>{p.addEventListener("click",()=>{const d=p.getAttribute("data-site-id");this.deleteMapSite(d,a)})})},100))}},async saveDefaultCoordinates(){const e=document.getElementById("ptw-default-lat"),a=document.getElementById("ptw-default-lng"),i=document.getElementById("ptw-default-zoom");if(!e||!a){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsGetError","\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A"));return}const r=parseFloat(e.value),s=parseFloat(a.value),o=i&&parseInt(i.value)||15;if(isNaN(r)||isNaN(s)){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsInvalid","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0635\u062D\u064A\u062D\u0629"));return}const n={lat:r,lng:s,zoom:o};if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveDefaultCoordinates)try{if(await MapCoordinatesManager.saveDefaultCoordinates(n)){Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSavedAll","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u062F\u0631"));return}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",l)}AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.latitude=r,AppState.companySettings.longitude=s,AppState.companySettings.mapZoom=o,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSaved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))},_fitMapMarkersBounds(){if(this.mapMarkers.length===0){this.applyEgyptDefaultView();return}try{if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const e=new google.maps.LatLngBounds;this.mapMarkers.forEach(a=>{try{a.getPosition&&e.extend(a.getPosition())}catch{}}),this.mapInstance.fitBounds&&this.mapInstance.fitBounds(e),this.mapMarkers.length===1&&this.mapInstance.setZoom&&this.mapInstance.setZoom(16)}else if(this.mapType==="leaflet"&&this.mapInstance){const e=this.mapInstance.getContainer();if(e&&e.offsetWidth>0&&e.offsetHeight>0){const i=new L.featureGroup(this.mapMarkers).getBounds();i&&i.isValid&&i.isValid()&&(this.mapInstance.fitBounds(i.pad(.1),{animate:!1,maxZoom:18}),this.mapMarkers.length===1&&this.mapInstance.setZoom(16))}}Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${this.mapMarkers.length} \u0639\u0644\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629`)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0636\u0628\u0637 \u062D\u062F\u0648\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},_addSingleMapMarker(e){const a=this.getSiteCoordinates(e.siteId,e.location||e.siteName);if(!(!a||typeof a.lat!="number"||typeof a.lng!="number")){if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const i=new google.maps.Marker({position:{lat:a.lat,lng:a.lng},map:this.mapInstance,title:`${e.id||"\u062A\u0635\u0631\u064A\u062D"} - ${e.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`,icon:{url:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",scaledSize:new google.maps.Size(32,32)}}),r=new google.maps.InfoWindow({content:this.createPermitInfoWindowContent(e)});i.addListener("click",()=>{this.mapMarkers.forEach(s=>{s.infoWindow&&s.infoWindow.close()}),r.open(this.mapInstance,i)}),i.infoWindow=r,this.mapMarkers.push(i)}else if(this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.getContainer){const i=this.mapInstance.getContainer();if(!i||i.offsetWidth===0||i.offsetHeight===0)return;const r=L.marker([a.lat,a.lng],{title:`${e.id||"\u062A\u0635\u0631\u064A\u062D"} - ${e.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`}).addTo(this.mapInstance);r.bindPopup(L.popup({maxWidth:400,className:"ptw-permit-popup"}).setContent(this.createPermitInfoWindowContent(e,"leaflet"))),r.permitId=e.id,this.mapMarkers.push(r)}}},updateMapMarkers(){if(this.currentTab!=="map")return;if(!this.mapInstance){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629 - \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A");return}Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.mapMarkers.forEach(l=>{try{if(this.mapType==="google"&&typeof google<"u"&&google.maps){if(l.setMap&&l.setMap(null),l.infoWindow)try{l.infoWindow.close()}catch{}}else if(this.mapType==="leaflet"&&this.mapInstance)try{this.mapInstance.removeLayer(l)}catch{}}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0639\u0644\u0627\u0645\u0629:",p)}}),this.mapMarkers=[];const e=document.getElementById("ptw-map-filter-status")?.value,a=document.getElementById("ptw-map-filter-type")?.value,i=(AppState.appData.ptw||[]).filter(l=>{if(e){if(l.status!==e)return!1}else{const p=l.status||"";if(p==="\u0645\u063A\u0644\u0642"||p==="\u0645\u0631\u0641\u0648\u0636"||p==="\u0645\u0643\u062A\u0645\u0644")return!1}return!(a&&l.workType!==a)});if(Utils.safeLog("\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636:",i.length),i.length===0){Utils.safeLog("\u2139\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636 \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u2014 \u0639\u0631\u0636 \u0645\u0635\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A"),this.applyEgyptDefaultView();return}const r=i;this._mapMarkersToken=(this._mapMarkersToken||0)+1;const s=this._mapMarkersToken,o=35,n=l=>{if(s!==this._mapMarkersToken||this.currentTab!=="map"||!this.mapInstance)return;r.slice(l,l+o).forEach(d=>{try{this._addSingleMapMarker(d)}catch(c){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0639\u0644\u0627\u0645\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D ${d.id}:`,c)}}),l+o<r.length?requestAnimationFrame(()=>n(l+o)):this._fitMapMarkersBounds()};n(0)},createPermitInfoWindowContent(e,a="google"){const i=this.calculateRemainingTime(e.endDate),r=e.startDate||e.createdAt,s=r?Utils.formatDate(r):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
            <div style="min-width: 300px; max-width: 400px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 12px; border-radius: 8px 8px 0 0; margin: -8px -8px 8px -8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">
                        <i class="fas fa-file-alt" style="margin-left: 8px;"></i>
                        ${e.id||"\u062A\u0635\u0631\u064A\u062D"}
                    </h3>
                </div>
                <div style="padding: 8px 0;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:</strong>
                        <span style="color: #6b7280;">${Utils.escapeHTML(e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629:</strong>
                        <span style="color: #6b7280;">${Utils.escapeHTML(e.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0648\u0642\u062A \u0627\u0644\u0641\u062A\u062D:</strong>
                        <span style="color: #6b7280;">${s}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A:</strong>
                        <span style="color: ${i.includes("\u0645\u0646\u062A\u0647\u064A")?"#dc2626":"#059669"}; font-weight: 600;">${i}</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:</strong>
                        <span class="badge badge-${this.getStatusBadgeClass(e.status)}" style="display: inline-block; padding: 4px 8px; border-radius: 4px;">
                            ${Utils.escapeHTML(e.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                        </span>
                    </div>
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
                        <button onclick="PTW.viewPTW('${e.id}'); ${a==="leaflet"?"if(window.ptwCurrentPopup) window.ptwCurrentPopup.close();":""}" 
                                style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600; transition: background 0.2s;"
                                onmouseover="this.style.background='#2563eb'"
                                onmouseout="this.style.background='#3b82f6'">
                            <i class="fas fa-eye" style="margin-left: 6px;"></i>
                            \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                        </button>
                    </div>
                </div>
            </div>
        `},calculateRemainingTime(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{const a=this.parseDateTimeValue(e);if(!a)return"\xD8\xBA\xD9\u0160\xD8\xB1 \xD9\u2026\xD8\xAD\xD8\xAF\xD8\xAF";const r=a-new Date;if(r<0)return"\u0645\u0646\u062A\u0647\u064A";const s=Math.floor(r/(1e3*60*60)),o=Math.floor(r%(1e3*60*60)/(1e3*60));return s>24?`${Math.floor(s/24)} \u064A\u0648\u0645`:s>0?`${s} \u0633\u0627\u0639\u0629 \u0648 ${o} \u062F\u0642\u064A\u0642\u0629`:`${o} \u062F\u0642\u064A\u0642\u0629`}catch{return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}},setupMapEventListeners(){this.currentTab==="map"&&(this.mapUpdateHandler&&document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},document.addEventListener("ptw:updated",this.mapUpdateHandler),this.mapStateUpdateHandler&&window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this._scheduleMapTimeout(()=>{this.updateMapMarkers()},100)},window.addEventListener("appstate:updated",this.mapStateUpdateHandler))},viewRegistryDetails(e){const a=AppState.appData.ptw.find(c=>c.id===e),i=this.registryData.find(c=>c.permitId===e),r=i&&i.isManualEntry===!0;if(!a&&!i){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(r&&!a){this.viewManualPermitDetails(i.id);return}if(!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const s=AppState.currentUser?.role==="admin",o=a.status!=="\u0645\u063A\u0644\u0642"&&a.status!=="\u0645\u0631\u0641\u0648\u0636",n=document.createElement("div");n.className="modal-overlay";const l=Array.isArray(a.teamMembers)?a.teamMembers:[],p=l.length>0?l.map(c=>`<span class="bg-blue-50 px-2 py-1 rounded text-sm">${Utils.escapeHTML(c.name||"-")}</span>`).join(" "):'<span class="text-gray-400">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',d=i?this.getPermitTypeDisplay(i):a.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n.innerHTML=`
            <div class="modal-content" style="max-width: 900px; background: #ffffff;">
                <div class="modal-header modal-header-centered bg-white border-b border-gray-200 rounded-t-lg" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <h2 class="modal-title flex items-center gap-2" style="color: #000000; font-size: 1.5rem; font-weight: 700; margin: 0;">
                            <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                            \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${this.getPermitDisplayNumber(i||a)}
                        </h2>
                        <p class="text-sm mt-2" style="color: #6b7280;">
                            <i class="fas fa-calendar-alt ml-1"></i>
                            ${a.startDate?Utils.formatDate(a.startDate):i?.openDate?Utils.formatDate(i.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            <span class="badge ${a.status==="\u0645\u063A\u0644\u0642"?"bg-green-500":a.status==="\u0645\u0641\u062A\u0648\u062D"||a.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"bg-yellow-500":"bg-blue-500"} mr-3" style="color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem;">
                                ${a.status||i?.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            </span>
                        </p>
                    </div>
                    <button class="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition" onclick="this.closest('.modal-overlay').remove()" style="color: #374151; margin: 0 auto;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body p-6">
                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                    <div class="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg border">
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${e}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button class="btn-success btn-sm" onclick="PTW.exportPDF('${e}')">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        ${s?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${e}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${e}')">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${o?`
                            <button class="btn-secondary btn-sm" onclick="PTW.closePermitFromRegistry('${e}')">
                                <i class="fas fa-lock ml-1"></i> \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                            </button>
                        `:""}
                    </div>
                    
                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(i?this.getPermitTypeDisplay(i):a.workType||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.siteName||a.location||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.requestingParty||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.authorizedParty||"-")}</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${a.startDate?Utils.formatDate(a.startDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${a.endDate?Utils.formatDate(a.endDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</label>
                                <p class="font-semibold text-blue-600" style="color: #2563eb;">${i?.totalTime||"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <span class="badge badge-${this.getStatusBadgeClass(a.status)}">${a.status||"-"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-1" style="color: #374151;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</label>
                        <p style="color: #000000;">${Utils.escapeHTML(a.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                    </div>
                    
                    <!-- \u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-2" style="color: #374151;">\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644</label>
                        <div class="flex flex-wrap gap-2">${p}</div>
                    </div>
                    
                    <!-- \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 -->
                    <div class="mt-4 grid grid-cols-2 gap-4">
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</label>
                            <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(i?.supervisor1||"-")}</p>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</label>
                            <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(i?.supervisor2||"-")}</p>
                        </div>
                    </div>
                    
                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${e}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        ${s?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${e}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${e}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${o?`
                            <button class="btn-secondary btn-sm" onclick="PTW.closePermitFromRegistry('${e}')">
                                <i class="fas fa-lock ml-1"></i> \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                            </button>
                        `:""}
                    </div>
                </div>
                
                <div class="modal-footer border-t p-4 bg-gray-50 flex justify-center gap-2 form-actions-centered">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="min-width: 120px;">
                        <i class="fas fa-times ml-1"></i> \u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),n.addEventListener("click",c=>{c.target===n&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&n.remove()})},viewManualPermitDetails(e){const a=this.registryData.find(p=>p.id===e);if(!a){Notification.error(this._t("module.ptw.notify.permitNotFoundM","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A"));return}const i=AppState.currentUser?.role==="admin",r=this.getPermitTypeDisplay(a),s=(p,d)=>this._t(p,d),o=a.sequentialNumber?String(a.sequentialNumber).padStart(4,"0"):"\u2014",n=String(a.paperPermitNumber||"").trim()||"\u2014",l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 900px; background: #ffffff;">
                <div class="modal-header modal-header-centered bg-white border-b border-gray-200 rounded-t-lg" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <h2 class="modal-title flex items-center gap-2" style="color: #000000; font-size: 1.5rem; font-weight: 700; margin: 0;">
                            <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                            ${s("module.ptw.manual.detailsTitle","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A")} \u2014 ${s("module.ptw.manual.sequentialNumber","\u0645\u0633\u0644\u0633\u0644")} #${Utils.escapeHTML(o)} | ${s("module.ptw.manual.paperPermitNumber","\u0648\u0631\u0642\u064A")} #${Utils.escapeHTML(n)}
                        </h2>
                        <p class="text-sm mt-2" style="color: #6b7280;">
                            <i class="fas fa-calendar-alt ml-1"></i>
                            ${a.openDate?Utils.formatDate(a.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            <span class="badge ${a.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"bg-green-500":a.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"bg-red-500":"bg-blue-500"} mr-3" style="color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem;">
                                ${a.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            </span>
                        </p>
                    </div>
                    <button class="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition" onclick="this.closest('.modal-overlay').remove()" style="color: #374151; margin: 0 auto;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body p-6">
                    <!-- \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="bg-blue-50 p-3 rounded border border-blue-200">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">${s("module.ptw.manual.sequentialNumber","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644")}</label>
                            <p class="font-bold text-blue-700" style="font-family: 'Courier New', monospace; font-size: 1.1rem;">${Utils.escapeHTML(o)}</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded border border-blue-200">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">${s("module.ptw.manual.paperPermitNumber","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A")}</label>
                            <p class="font-bold text-blue-700" style="font-family: 'Courier New', monospace; font-size: 1.1rem;">${Utils.escapeHTML(n)}</p>
                        </div>
                    </div>
                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(r)}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.location||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.requestingParty||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.authorizedParty||"-")}</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0648\u0642\u062A \u0645\u0646</label>
                                <p class="font-semibold" style="color: #000000;">${a.timeFrom&&a.timeFrom!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(a.timeFrom):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649</label>
                                <p class="font-semibold" style="color: #000000;">${a.timeTo&&a.timeTo!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(a.timeTo):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.totalTime||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.status||"-")}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 space-y-3">
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</label>
                            <p class="whitespace-pre-wrap" style="color: #000000;">${Utils.escapeHTML(a.workDescription||"-")}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.supervisor1||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a.supervisor2||"-")}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${a.permitId||a.id}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button class="btn-success btn-sm" onclick="PTW.exportPDF('${a.permitId||a.id}')">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        ${i?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.openManualPermitForm('${a.id}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deleteManualPermitEntry('${a.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                    </div>
                </div>
                
                <div class="modal-footer border-t p-4 bg-gray-50 flex justify-center gap-2 form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="min-width: 120px;">
                        <i class="fas fa-times ml-1"></i> \u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l),l.addEventListener("click",p=>{p.target===l&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&l.remove()})},printPermitForm(){if(!document.getElementById("ptw-form")){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{const a=this.collectFormDataForPrint(),i=this.currentEditId||a.id||"NEW",r=`PTW-${i.substring(0,8)}`,s=this.generatePrintContent(a),o=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(r,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${i.substring(0,8)}`,s,!1,!1,{version:"1.0",releaseDate:a.createdAt||new Date().toISOString(),revisionDate:a.updatedAt||new Date().toISOString(),compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":i.substring(0,8)},a.createdAt||new Date().toISOString(),a.updatedAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u0637\u0628\u0627\u0639\u0629 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</title></head><body>${s}</body></html>`,n=new Blob([o],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(n),p=window.open(l,"_blank");p?p.onload=()=>{setTimeout(()=>{p.print(),setTimeout(()=>{URL.revokeObjectURL(l)},800)},500)}:Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",a),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+a.message)}},collectFormDataForPrint(){if(!document.getElementById("ptw-form"))return{};const a=document.getElementById("ptw-location"),i=document.getElementById("ptw-sublocation"),r=a?.options[a?.selectedIndex]?.text||"",s=i?.options[i?.selectedIndex]?.text||"",o=u=>{const m=[];return document.querySelectorAll(`input[name="${u}-option"]`).forEach(f=>{if(f.checked)if(f.value==="other"){const y=document.getElementById(`${u}-other-text`)?.value.trim();y&&m.push(y)}else{const y=f.getAttribute("data-label")||f.value;m.push(y)}}),m},n=[];document.querySelectorAll("#approvals-tbody tr").forEach((u,m)=>{const y=document.getElementById(`approval-role-${m}`)?.value.trim()||"",g=document.getElementById(`approval-approver-select-${m}`),x=document.getElementById(`approval-approver-${m}`),k=g?g.options[g.selectedIndex]?.text||"":x?.value.trim()||"",w=document.getElementById(`approval-status-${m}`)?.value||"pending",F=document.getElementById(`approval-date-${m}`)?.value||"",N=document.getElementById(`approval-comments-${m}`)?.value.trim()||"";y&&n.push({role:y,approver:k,status:w,date:F,comments:N})});const p=typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],d={};if(typeof RiskMatrix<"u"){const u=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');u&&(d.likelihood=u.getAttribute("data-likelihood")||u.getAttribute("data-probability")||"",d.consequence=u.getAttribute("data-consequence")||u.getAttribute("data-severity")||"",d.riskLevel=u.textContent.trim()||"")}const c=document.getElementById("ptw-risk-notes")?.value.trim()||"";return{id:this.currentEditId||"NEW",location:r,sublocation:s,workDescription:document.getElementById("ptw-workDescription")?.value||"",startDate:document.getElementById("ptw-startDate")?.value||"",endDate:document.getElementById("ptw-endDate")?.value||"",requestingParty:(()=>{const u=document.getElementById("ptw-requestingParty-select"),m=document.getElementById("ptw-requestingParty");return u&&u.value&&u.value!=="__custom__"?u.value.trim():m?m.value.trim():""})(),authorizedParty:(()=>{const u=document.getElementById("ptw-authorizedParty-select"),m=document.getElementById("ptw-authorizedParty");return u&&u.value&&u.value!=="__custom__"?u.value.trim():m?m.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value||"",teamMembers:Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-name")).map(u=>({name:u.value.trim()})).filter(u=>u.name),hotWorkDetails:o("ptw-hot"),hotWorkOther:document.getElementById("ptw-hot-other-text")?.value.trim()||"",confinedSpaceDetails:o("ptw-confined"),confinedSpaceOther:document.getElementById("ptw-confined-other-text")?.value.trim()||"",heightWorkDetails:o("ptw-height"),heightWorkOther:document.getElementById("ptw-height-other-text")?.value.trim()||"",electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,requiredPPE:p,riskAssessment:d,riskNotes:c,permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||"",approvals:n,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:document.getElementById("ptw-closure-time")?.value||"",closureReason:document.getElementById("ptw-closure-reason")?.value||"",closureApprovals:(()=>{const u=[],m=document.getElementById("closure-approvals-tbody");return m&&m.querySelectorAll("tr[data-closure-approval-index]").forEach((y,g)=>{const x=document.getElementById(`closure-approval-role-${g}`),k=document.getElementById(`closure-approval-approver-select-${g}`),P=document.getElementById(`closure-approval-approver-${g}`),w=document.getElementById(`closure-approval-approver-manual-${g}`),U=document.getElementById(`closure-approval-status-${g}`),F=document.getElementById(`closure-approval-date-${g}`),_=document.getElementById(`closure-approval-comments-${g}`);let N=k?.value||"",D=P?.value||"";k&&(N==="__manual__"?(N="",D=w?.value?.trim()||""):N?D=k.options[k.selectedIndex]?.text?.replace(/\s*\((?:مقاول|موظف)\)\s*(\s*-\s*.*)?$/,"").trim()||D:D=""),u.push({role:x?.value||"",approverId:N,approver:D,status:U?.value||"pending",date:F?.value||"",comments:_?.value||"",required:y.getAttribute("data-required")!=="false"})}),u})(),closureApprovalCircuitOwnerId:document.getElementById("closure-approval-circuit-owner-id")?.value||"__default__",closureApprovalCircuitName:this.formClosureCircuitName||"",closureApproval:{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},generatePrintContent(e){const a=m=>m?String(m).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):"",i=m=>{if(!m)return"-";try{const f=this.parseDateTimeValue(m);return!f||isNaN(f.getTime())?m||"-":f.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"})}catch{return m}},r=m=>{if(!m)return"-";try{const f=this.parseDateTimeValue(m);return!f||isNaN(f.getTime())?m||"-":f.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return m}},s=e.teamMembers&&e.teamMembers.length>0?e.teamMembers.map(m=>a(m.name)).join("\u060C "):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let o=e.hotWorkDetails&&e.hotWorkDetails.length>0?e.hotWorkDetails.map(m=>a(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.hotWorkOther&&(o=(o!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?o+"\u060C ":"")+a(e.hotWorkOther));let n=e.confinedSpaceDetails&&e.confinedSpaceDetails.length>0?e.confinedSpaceDetails.map(m=>a(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.confinedSpaceOther&&(n=(n!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?n+"\u060C ":"")+a(e.confinedSpaceOther));let l=e.heightWorkDetails&&e.heightWorkDetails.length>0?e.heightWorkDetails.map(m=>a(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.heightWorkOther&&(l=(l!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?l+"\u060C ":"")+a(e.heightWorkOther));const p=[];e.preStartChecklist&&p.push("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"),e.lotoApplied&&p.push("\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"),e.governmentPermits&&p.push("\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"),e.riskAssessmentAttached&&p.push("\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"),e.gasTesting&&p.push("\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"),e.mocRequest&&p.push("\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)");const d=p.length>0?p.join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",c=e.requiredPPE&&e.requiredPPE.length>0?e.requiredPPE.map(m=>a(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",u=e.approvals&&e.approvals.length>0?`
            <table class="print-table" style="margin-top: 16px;">
                <thead>
                    <tr>
                        <th>\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A</th>
                        <th>\u0627\u0644\u0627\u0633\u0645</th>
                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.approvals.map(m=>`
                        <tr>
                            <td>${a(m.role)}</td>
                            <td>${a(m.approver)}</td>
                            <td>${m.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":m.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"}</td>
                            <td>${m.date?r(m.date):"-"}</td>
                            <td>${a(m.comments)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `:'<p style="padding: 12px; color: #64748b;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0641\u0642\u0627\u062A</p>';return`
            <style>
                .print-section {
                    margin: 10px 0;
                    page-break-inside: avoid;
                }
                .print-section-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 8px;
                    padding-right: 10px;
                    border-right: 3px solid #003865;
                }
                .print-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    margin-bottom: 12px;
                }
                .print-field {
                    background: #f8fafc;
                    padding: 8px;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                }
                .print-field-label {
                    font-size: 11px;
                    color: #64748b;
                    margin-bottom: 3px;
                    font-weight: 600;
                }
                .print-field-value {
                    font-size: 12px;
                    color: #1f2937;
                    font-weight: 500;
                }
                .print-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    font-size: 11px;
                }
                .print-table thead th {
                    background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%);
                    color: #01579b;
                    font-weight: bold;
                    padding: 8px 6px;
                    text-align: center;
                    border: 1px solid #0288d1;
                    font-size: 10px;
                }
                .print-table tbody td {
                    padding: 8px 6px;
                    text-align: right;
                    border: 1px solid #b0bec5;
                    background: white;
                    font-size: 10px;
                }
                .print-table tbody tr:first-child td:first-child,
                .print-table tbody tr:last-child td:first-child {
                    font-weight: bold;
                    background: #f5f5f5;
                    color: #424242;
                }
                .print-full-width {
                    grid-column: span 2;
                }
                .print-disclaimer {
                    margin: 20px 0;
                    padding: 20px;
                    background: linear-gradient(to bottom, #eff6ff, #dbeafe);
                    border-right: 4px solid #2563eb;
                    border-left: 4px solid #2563eb;
                    border-bottom: 2px solid #93c5fd;
                    border-top: 0;
                    border-radius: 12px;
                    text-align: center;
                    color: #1e3a5f;
                    font-size: ${(()=>{try{const m=localStorage.getItem("ptw_disclaimer_font_size");return m?m+"px":"15px"}catch{return"15px"}})()};
                    line-height: 2.2;
                    font-weight: 500;
                    letter-spacing: 0.3px;
                    white-space: pre-line;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 8px;
                        font-size: 11px;
                    }
                    /* \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0648\u064A\u0644\u0629 \u0639\u0644\u0649 \u0635\u0641\u062D\u0627\u062A A4 \u0645\u062A\u0639\u062F\u062F\u0629 \u062F\u0648\u0646 \u0642\u0635 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 */
                    .print-section {
                        page-break-inside: auto;
                        break-inside: auto;
                        margin: 8px 0;
                    }
                    .print-section-title {
                        font-size: 13px;
                        margin-bottom: 6px;
                    }
                    .print-field {
                        padding: 6px;
                    }
                    .print-table {
                        margin: 8px 0;
                    }
                    .print-table thead th,
                    .print-table tbody td {
                        padding: 6px 4px;
                        font-size: 9px;
                    }
                }
            </style>
            
            ${e.permitDisclaimer?`
            <div class="print-disclaimer">
                ${a(e.permitDisclaimer).replace(/\n/g,"<br>")}
            </div>
            `:""}
            
            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</div>
                        <div class="print-field-value">${a(e.location)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</div>
                        <div class="print-field-value">${a(e.sublocation)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</div>
                        <div class="print-field-value">${r(e.startDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</div>
                        <div class="print-field-value">${r(e.endDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${a(e.authorizedParty)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</div>
                        <div class="print-field-value">${a(e.requestingParty)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="print-field-value">${a(e.equipment)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</div>
                        <div class="print-field-value">${a(e.tools)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${a(e.workDescription)||"-"}</div>
                    </div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                <div class="print-field">
                    <div class="print-field-value">${s}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B : \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629</div>
                        <div class="print-field-value">${o}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</div>
                        <div class="print-field-value">${n}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</div>
                        <div class="print-field-value">${l}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</div>
                        <div class="print-field-value">${a(e.electricalWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</div>
                        <div class="print-field-value">${a(e.coldWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</div>
                        <div class="print-field-value">${a(e.otherWorkType)||"-"}</div>
                    </div>
                    ${e.excavationLength||e.excavationWidth||e.excavationDepth||e.soilType?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label" style="font-weight: bold; margin-bottom: 8px;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0637\u0648\u0644 (\u0645)</div>
                                <div class="print-field-value">${a(e.excavationLength)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0631\u0636 (\u0645)</div>
                                <div class="print-field-value">${a(e.excavationWidth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0645\u0642 (\u0645)</div>
                                <div class="print-field-value">${a(e.excavationDepth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</div>
                                <div class="print-field-value">${a(e.soilType)||"-"}</div>
                            </div>
                        </div>
                    </div>
                    `:""}
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</div>
                <div class="print-field">
                    <div class="print-field-value">${d}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                <div class="print-field">
                    <div class="print-field-value">${c}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633 : \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                ${e.riskAssessment&&(e.riskAssessment.likelihood||e.riskAssessment.consequence)?`
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u062D\u062F\u0648\u062B</div>
                        <div class="print-field-value">${a(e.riskAssessment.likelihood)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0634\u062F\u0629 \u0627\u0644\u0639\u0648\u0627\u0642\u0628</div>
                        <div class="print-field-value">${a(e.riskAssessment.consequence)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                        <div class="print-field-value">${a(e.riskAssessment.riskLevel)||"-"}</div>
                    </div>
                </div>
                `:'<div class="print-field"><div class="print-field-value">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div></div>'}
                ${e.riskNotes?`
                <div class="print-field print-full-width" style="margin-top: 12px;">
                    <div class="print-field-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                    <div class="print-field-value">${a(e.riskNotes)}</div>
                </div>
                `:""}
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A</div>
                ${u}
            </div>

            <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646: \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D - \u064A\u0638\u0647\u0631 \u062F\u0627\u0626\u0645\u0627\u064B -->
            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646 : \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</div>
                <div style="background: #f8fafc; padding: 8px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e2e8f0;">
                    <p style="text-align: right; line-height: 1.5; color: #1f2937; margin: 0; font-size: 11px;">
                        \u062A\u0645 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644 \u062D\u062A\u0649 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0648\u062A\u0645 \u0641\u062D\u0635 \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062C\u0627\u0648\u0631\u0629 \u0644\u0647 \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062E\u0644\u0648\u0647\u0627 \u0645\u0646 \u0627\u0644\u0623\u062E\u0637\u0627\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644 \u062D\u062F\u0648\u062B\u0647\u0627 \u0648\u0630\u0644\u0643 \u0628\u0639\u062F \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0645\u0646 \u0627\u0644\u0639\u0645\u0644
                    </p>
                </div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        <div class="print-field-value">
                            ${e.closureStatus==="completed"?"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":e.closureStatus==="notCompleted"?"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":e.closureStatus==="forced"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"}
                        </div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0633\u0627\u0639\u0629</div>
                        <div class="print-field-value">${e.closureTime?r(e.closureTime):"-"}</div>
                    </div>
                    ${e.closureReason?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0633\u0628\u0628</div>
                        <div class="print-field-value">${a(e.closureReason)}</div>
                    </div>
                    `:""}
                </div>
            </div>

            <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639: \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D - \u064A\u0638\u0647\u0631 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062B\u0627\u0645\u0646 -->
            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</div>
                <table class="print-table">
                    <thead>
                        <tr>
                            <th colspan="5" style="text-align: center; font-size: 0.95rem;">
                                \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A)
                            </th>
                        </tr>
                        <tr>
                            <th style="width: 15%;"></th>
                            <th style="width: 25%;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                            <th style="width: 20%;">\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</th>
                            <th style="width: 25%;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                            <th style="width: 15%;">\u0631\u0626\u064A\u0633 \u0642\u0633\u0645 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>\u0627\u0644\u0627\u0633\u0645</td>
                            <td>${a(e.closureApproval?.name4||"")}</td>
                            <td>${a(e.closureApproval?.name3||"")}</td>
                            <td>${a(e.closureApproval?.name2||"")}</td>
                            <td>${a(e.closureApproval?.name1||"")}</td>
                        </tr>
                        <tr>
                            <td>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            <td>${a(e.closureApproval?.signature4||"")}</td>
                            <td>${a(e.closureApproval?.signature3||"")}</td>
                            <td>${a(e.closureApproval?.signature2||"")}</td>
                            <td>${a(e.closureApproval?.signature1||"")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `},formDataFromRegistryEntry(e){if(!e)return null;const a=p=>p===!0||p==="true"||p===1||p==="1",i=p=>p?p==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"completed":p==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"forced":p==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"notCompleted":"":"";let r=[];Array.isArray(e.manualApprovals)&&e.manualApprovals.length&&(r=e.manualApprovals.map(p=>({role:p.role||"",approver:p.name||p.approver||"",status:"approved",date:p.date||"",comments:[p.notes,p.signature?`\u062A\u0648\u0642\u064A\u0639: ${p.signature}`:""].filter(Boolean).join(" \u2014 ")})));const s={name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""};if(Array.isArray(e.manualClosureApprovals)&&e.manualClosureApprovals.length){const p=e.manualClosureApprovals;p[0]&&(s.name4=p[0].name||"",s.signature4=p[0].signature||""),p[1]&&(s.name3=p[1].name||"",s.signature3=p[1].signature||""),p[2]&&(s.name2=p[2].name||"",s.signature2=p[2].signature||""),p[3]&&(s.name1=p[3].name||"",s.signature1=p[3].signature||"")}const o=Array.isArray(e.requiredPPE)&&e.requiredPPE.length?e.requiredPPE:e.ppeNotes?String(e.ppeNotes).split(/[،,]/).map(p=>p.trim()).filter(Boolean):[],l=e.riskLikelihood||e.riskConsequence||e.riskLevel||e.riskScore?{likelihood:e.riskLikelihood||"",consequence:e.riskConsequence||"",riskLevel:e.riskLevel||e.riskScore||""}:{};return{id:e.permitId||e.id,location:e.location||"",sublocation:e.sublocation||"",workDescription:e.workDescription||"",startDate:e.timeFrom||e.openDate||"",endDate:e.timeTo||"",requestingParty:e.requestingParty||"",authorizedParty:e.authorizedParty||"",equipment:e.equipment||"",tools:e.tools||e.toolsList||"",teamMembers:Array.isArray(e.teamMembers)?e.teamMembers:[],hotWorkDetails:Array.isArray(e.hotWorkDetails)?e.hotWorkDetails:[],hotWorkOther:e.hotWorkOther||"",confinedSpaceDetails:Array.isArray(e.confinedSpaceDetails)?e.confinedSpaceDetails:[],confinedSpaceOther:e.confinedSpaceOther||"",heightWorkDetails:Array.isArray(e.heightWorkDetails)?e.heightWorkDetails:[],heightWorkOther:e.heightWorkOther||"",electricalWorkType:e.electricalWorkType||"",coldWorkType:e.coldWorkType||"",otherWorkType:e.otherWorkType||"",excavationLength:e.excavationLength||"",excavationWidth:e.excavationWidth||"",excavationDepth:e.excavationDepth||"",soilType:e.soilType||"",preStartChecklist:a(e.preStartChecklist),lotoApplied:a(e.lotoApplied),governmentPermits:a(e.governmentPermits),riskAssessmentAttached:a(e.riskAssessmentAttached),gasTesting:a(e.gasTesting),mocRequest:a(e.mocRequest),requiredPPE:o,riskAssessment:l,riskNotes:e.riskNotes||"",approvals:r,closureStatus:e.closureStatus||i(e.status),closureTime:e.closureDate||e.closureTime||"",closureReason:e.closureReason||"",closureApproval:s,permitDisclaimer:e.permitDisclaimer||"",createdAt:e.createdAt||new Date().toISOString(),updatedAt:e.updatedAt||new Date().toISOString()}},getPermitFormDataForPrint(e){if(!e)return null;if(Array.isArray(this.registryData)){const a=this.registryData.find(i=>i.permitId===e.id&&i.isManualEntry===!0);if(a)return this.formDataFromRegistryEntry(a)}return{id:e.id,location:e.siteName||e.location||"",sublocation:e.sublocationName||e.sublocation||"",workDescription:e.workDescription||"",startDate:e.startDate||"",endDate:e.endDate||"",requestingParty:e.requestingParty||"",authorizedParty:e.authorizedParty||"",equipment:e.equipment||"",tools:e.tools||e.toolsList||"",teamMembers:Array.isArray(e.teamMembers)?e.teamMembers:[],hotWorkDetails:Array.isArray(e.hotWorkDetails)?e.hotWorkDetails:[],hotWorkOther:e.hotWorkOther||"",confinedSpaceDetails:Array.isArray(e.confinedSpaceDetails)?e.confinedSpaceDetails:[],confinedSpaceOther:e.confinedSpaceOther||"",heightWorkDetails:Array.isArray(e.heightWorkDetails)?e.heightWorkDetails:[],heightWorkOther:e.heightWorkOther||"",electricalWorkType:e.electricalWorkType||"",coldWorkType:e.coldWorkType||"",otherWorkType:e.otherWorkType||"",excavationLength:e.excavationLength||"",excavationWidth:e.excavationWidth||"",excavationDepth:e.excavationDepth||"",soilType:e.soilType||"",preStartChecklist:e.preStartChecklist||!1,lotoApplied:e.lotoApplied||!1,governmentPermits:e.governmentPermits||!1,riskAssessmentAttached:e.riskAssessmentAttached||!1,gasTesting:e.gasTesting||!1,mocRequest:e.mocRequest||!1,requiredPPE:Array.isArray(e.requiredPPE)?e.requiredPPE:[],riskAssessment:e.riskAssessment||{},riskNotes:e.riskNotes||"",approvals:Array.isArray(e.approvals)?e.approvals.map(a=>({role:a.role||"",approver:typeof a.approver=="object"&&a.approver?a.approver.name||a.approver.email||a.approver.id||"":a.approver||"",status:a.status||"pending",date:a.date||"",comments:a.comments||""})):[],closureStatus:e.closureStatus||"",closureTime:e.closureTime||"",closureReason:e.closureReason||"",closureApproval:e.closureApproval||{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},permitDisclaimer:e.permitDisclaimer||"",createdAt:e.createdAt||new Date().toISOString(),updatedAt:e.updatedAt||new Date().toISOString()}},_normManualRoleKey(e){return String(e||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/ؤ/g,"\u0648").replace(/ئ/g,"\u064A").replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644").replace(/\s*\/\s*/g," / ").replace(/\s+/g," ")},parseManualApprovalsFromText(e){const a=String(e||"").trim();return a?a.split(/\s*\|\s*/).map(i=>{const r=String(i||"").trim();if(!r)return null;const s=r.match(/^(.+?):\s*(.+?)\s+توقيع:\s*(.*)$/);if(s){const n=String(s[2]||"").trim();return{role:String(s[1]||"").trim(),name:n==="\u2014"||n==="-"?"":n,signature:String(s[3]||"").trim()}}const o=r.match(/^(.+?):\s*(.*)$/);if(o){const n=String(o[2]||"").trim();return{role:String(o[1]||"").trim(),name:n==="\u2014"||n==="-"?"":n,signature:""}}return null}).filter(Boolean):[]},resolveManualApprovalsList(e,a){if(Array.isArray(e)&&e.length)return e.map(i=>({role:i.role||"",name:i.name||i.approver||"",signature:i.signature||""}));if(typeof e=="string"&&e.trim()){const i=e.trim();if(i.startsWith("["))try{const r=JSON.parse(i);if(Array.isArray(r)&&r.length)return r.map(s=>({role:s.role||"",name:s.name||s.approver||"",signature:s.signature||""}))}catch{}}return this.parseManualApprovalsFromText(a)},normalizeManualPermitEntryForPrint(e){if(!e)return null;const a={...e};if((!a.teamMembers||!a.teamMembers.length)&&a.teamMembersText){const p=String(a.teamMembersText).trim();a.teamMembers=p.split(/[،,]/).map(d=>{d=d.trim();const c=d.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return c?{name:c[1].trim(),signature:c[2].trim()}:{name:d,signature:""}}).filter(d=>d.name||d.signature)}(!Array.isArray(a.teamMembers)||!a.teamMembers.length)&&(a.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(p=>{a[p]!=null&&typeof a[p]=="string"&&(a[p]=a[p].split(/[،,]/).map(d=>d.trim()).filter(Boolean)),Array.isArray(a[p])||(a[p]=[])}),a.manualApprovals=this.resolveManualApprovalsList(a.manualApprovals,a.manualApprovalsText),a.manualClosureApprovals=this.resolveManualApprovalsList(a.manualClosureApprovals,a.manualClosureApprovalsText);const i=[];Array.isArray(a.requiredPPE)?i.push(...a.requiredPPE):typeof a.requiredPPE=="string"&&a.requiredPPE.trim()&&i.push(...a.requiredPPE.split(/[،,]/).map(p=>p.trim()).filter(Boolean)),a.ppeNotes&&i.push(...String(a.ppeNotes).split(/[،,]/).map(p=>p.trim()).filter(Boolean)),a._ppeSelected=[...new Set(i.map(p=>String(p).trim()).filter(Boolean))];const r=["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629","\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633","\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],s=p=>String(p||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),o=new Set(r.map(s));a._ppeExtraNotes=a._ppeSelected.filter(p=>!o.has(s(p)));const n=[];a.equipment&&n.push(...this._splitEquipmentTokens(a.equipment)),a._equipmentSelected=[...new Set(n.map(p=>String(p).trim()).filter(Boolean))];const l=new Set(this.getManualFixedEquipmentLabels().map(p=>this._normEquipmentItemKey(p)));return a._equipmentExtraNotes=a._equipmentSelected.filter(p=>!l.has(this._normEquipmentItemKey(p))),a},_findManualApprovalByRoles(e,a){const i=this.resolveManualApprovalsList(e,"");if(!i.length)return{name:"",signature:""};const r=s=>this._normManualRoleKey(s);for(const s of a){const o=r(s),n=i.find(l=>r(l.role)===o);if(n)return{name:n.name||n.approver||"",signature:n.signature||""}}return{name:"",signature:""}},buildManualFixedPPEPrintHtml(e=[]){const a=l=>Utils.escapeHTML(l),i=new Set((e||[]).map(l=>String(l||"").trim()).filter(Boolean)),r=l=>String(l||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),s=l=>{const p=String(l).trim();if(i.has(p))return!0;const d=r(p);for(const c of i)if(r(c)===d)return!0;return!1},o=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let n='<div class="ptw-manual-ppe-print-matrix"><div class="ptw-manual-ppe-fixed-wrap">';return o.forEach((l,p)=>{const d=p===o.length-1?"ptw-manual-ppe-fixed-row ppe-row-last":"ptw-manual-ppe-fixed-row";n+=`<div class="${d}">`,l.forEach(c=>{const u=s(c);n+=`<span class="ptw-manual-ppe-cell${u?" ppe-selected":""}"><span class="ppe-checkbox${u?" checked":""}" aria-hidden="true"></span><span class="ppe-label">${a(c)}</span></span>`}),n+="</div>"}),n+="</div></div>",n},PERMIT_A4_WIDTH_PX:794,PERMIT_A4_HEIGHT_PX:1123,PERMIT_A4_MARGIN_MM:3,PERMIT_A4_MAX_PAGES:6,PERMIT_A4_CAPTURE_SCALE:1.35,getManualPermitPdfExportTechnicalStyles_(){const e=this.PERMIT_A4_WIDTH_PX;return`
            html, body {
                width: ${e}px !important;
                max-width: ${e}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .ptw-manual-print, #ptw-permit-print-root {
                width: ${e}px !important;
                max-width: ${e}px !important;
                margin: 0 auto !important;
                transform: none !important;
                zoom: 1 !important;
            }
            .ptw-a4-page {
                transform: none !important;
                zoom: 1 !important;
            }
        `},getManualPermitPrintStyles(e=!1){return`
            * { box-sizing: border-box; }
            body { margin: 0; padding: 12px; font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif; font-size: 12px; color: #1f2937; background: #fff; direction: rtl; }
            .ptw-manual-print { max-width: 1100px; margin: 0 auto; }
            .ptw-paper-header {
                display: grid; grid-template-columns: 1.45fr 1.15fr 0.85fr; gap: 14px; align-items: center;
                background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%); color: #fff;
                padding: 16px 20px; border-radius: 10px; margin-bottom: 14px;
                border: 1px solid rgba(255, 255, 255, 0.18);
                min-height: 78px;
            }
            .ptw-paper-header-right { text-align: right; min-width: 0; }
            .ptw-paper-header-company {
                font-size: 16px; font-weight: 700; line-height: 1.35; letter-spacing: 0.2px;
                white-space: nowrap; word-break: keep-all;
            }
            .ptw-paper-header-dept { font-size: 12px; font-weight: 500; opacity: 0.9; margin-top: 5px; line-height: 1.4; }
            .ptw-paper-header-center {
                text-align: center; min-width: 0;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                padding: 4px 10px;
            }
            .ptw-paper-header-form-title {
                font-size: 19px; font-weight: 800; line-height: 1.25; letter-spacing: 0.3px;
                padding-bottom: 5px; margin-bottom: 5px;
                border-bottom: 2px solid rgba(255, 255, 255, 0.38);
            }
            .ptw-paper-header-form-subtitle {
                font-size: 13px; font-weight: 600; letter-spacing: 1.4px;
                text-transform: uppercase; opacity: 0.96;
            }
            .ptw-paper-header-left { display: flex; justify-content: flex-end; align-items: center; min-width: 0; }
            .ptw-paper-header-logo { max-height: 56px; max-width: 140px; object-fit: contain; background: #fff; border-radius: 4px; padding: 4px; }
            .ptw-paper-header-logo-fallback { width: 80px; height: 44px; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 11px; background: #fff; border-radius: 4px; }
            .manual-print-disclaimer-wrap { margin-bottom: 14px; border: 2px solid #2196F3; border-radius: 10px; overflow: hidden; }
            .manual-print-disclaimer-text { text-align: center; padding: 14px; background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%); font-size: 13px; line-height: 2; color: #1e3a5f; font-weight: 500; }
            .manual-print-permit-no { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); }
            .manual-print-seq-badge { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: #fff; padding: 10px 28px; border-radius: 8px; text-align: center; }
            .manual-print-seq-badge .lbl { font-size: 10px; opacity: 0.9; display: block; }
            .manual-print-seq-badge .val { font-size: 22px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace; }
            .manual-print-paper-no { font-size: 13px; font-weight: 600; color: #1e3a5f; }
            .ptw-manual-form-section { margin: 10px 0; padding: 14px 16px; border-radius: 10px; border: 2px solid; page-break-inside: avoid; }
            .ptw-manual-form-section h3 { margin: 0 0 12px 0; padding-bottom: 8px; font-size: 14px; font-weight: 700; border-bottom: 2px solid; display: flex; align-items: center; gap: 8px; }
            .manual-section-1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
            .manual-section-1 h3 { color: #1565C0; border-color: #2196F3; }
            .manual-section-2 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
            .manual-section-2 h3 { color: #00695C; border-color: #009688; }
            .manual-section-3 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
            .manual-section-3 h3 { color: #6A1B9A; border-color: #9C27B0; }
            .manual-section-4 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
            .manual-section-4 h3 { color: #E65100; border-color: #FF9800; }
            .manual-section-5 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
            .manual-section-5 h3 { color: #2E7D32; border-color: #4CAF50; }
            .manual-section-6 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
            .manual-section-6 h3 { color: #AD1457; border-color: #E91E63; }
            .manual-section-7 { background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); border-color: #795548; }
            .manual-section-7 h3 { color: #4E342E; border-color: #795548; }
            .manual-section-8 { background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%); border-color: #9e9e9e; }
            .manual-section-8 h3 { color: #424242; border-color: #9e9e9e; }
            .manual-section-9 { background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-color: #03a9f4; }
            .manual-section-9 h3 { color: #0277bd; border-color: #03a9f4; }
            .manual-section-10 { background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%); border-color: #673ab7; }
            .manual-section-10 h3 { color: #4527a0; border-color: #673ab7; }
            .manual-print-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .manual-print-field { background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; }
            .manual-print-field.full { grid-column: 1 / -1; }
            .manual-print-field .lbl { font-size: 10px; color: #64748b; font-weight: 600; margin-bottom: 3px; }
            .manual-print-field .val { font-size: 12px; font-weight: 500; color: #1f2937; white-space: pre-wrap; word-break: break-word; }
            .ptw-paper-grid-table { width: 100%; border-collapse: collapse; border: 1px solid #000; background: #fff; font-size: 11px; }
            .ptw-paper-grid-table th, .ptw-paper-grid-table td { border: 1px solid #374151; padding: 6px 8px; text-align: center; vertical-align: middle; }
            .ptw-paper-grid-table thead th { background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%); color: #01579b; font-weight: 700; }
            .ptw-paper-grid-table .row-label { background: #f5f5f5; font-weight: 600; }
            .manual-print-req-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
            .manual-print-req-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; font-size: 11px; }
            .manual-print-req-item.on { border-color: #f97316; background: #fff7ed; font-weight: 600; }
            .ptw-manual-ppe-print-matrix {
                background: #fff; border: 1.5px solid #64748b; border-radius: 8px;
                padding: 12px 10px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
            }
            .ptw-manual-ppe-fixed-wrap { width: 100%; }
            .ptw-manual-ppe-fixed-row {
                display: grid; grid-template-columns: repeat(9, minmax(0, 1fr));
                gap: 8px 6px; margin-bottom: 8px; direction: rtl;
            }
            .ptw-manual-ppe-fixed-row.ppe-row-last {
                grid-template-columns: repeat(5, minmax(0, 1fr));
                margin-bottom: 0;
            }
            .ptw-manual-ppe-cell {
                display: flex; align-items: flex-start; gap: 6px;
                font-size: 10.5px; font-weight: 600; color: #0f172a; direction: rtl;
                min-width: 0; line-height: 1.4; word-break: break-word;
                padding: 7px 6px; border: 1.2px solid #94a3b8; border-radius: 5px;
                background: #fff; min-height: 34px;
            }
            .ptw-manual-ppe-cell.ppe-selected {
                border-color: #1d4ed8; background: #f8fafc;
            }
            .ppe-checkbox {
                width: 14px; height: 14px; border: 2px solid #334155; border-radius: 2px;
                flex-shrink: 0; margin-top: 1px; background: #fff; position: relative;
            }
            .ppe-checkbox.checked {
                background: #1e40af; border-color: #1e3a8a;
            }
            .ppe-checkbox.checked::after {
                content: ''; position: absolute; left: 3px; top: 1px;
                width: 4px; height: 8px; border: solid #fff;
                border-width: 0 2px 2px 0; transform: rotate(45deg);
            }
            .ppe-label { flex: 1; min-width: 0; }
            .ptw-manual-ppe-notes-print {
                margin-top: 8px; background: #fff; border: 1px solid #cbd5e1;
                border-radius: 8px; padding: 8px 10px;
            }
            .ptw-manual-ppe-notes-print .lbl {
                color: #334155; font-weight: 600; font-size: 10px; margin-bottom: 4px;
            }
            .ptw-manual-ppe-notes-print .val { font-size: 11px; color: #1f2937; white-space: pre-wrap; }
            .ptw-manual-equipment-print-matrix {
                background: #fff; border: 1.5px solid #64748b; border-radius: 8px;
                padding: 12px 10px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
            }
            .ptw-manual-equipment-fixed-wrap { width: 100%; }
            .ptw-manual-equipment-fixed-row {
                display: grid; grid-template-columns: repeat(9, minmax(0, 1fr));
                gap: 8px 6px; margin-bottom: 8px; direction: rtl;
            }
            .ptw-manual-equipment-fixed-row.equipment-row-last { margin-bottom: 0; }
            .ptw-manual-equipment-history-row {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            }
            .ptw-manual-equipment-cell {
                display: flex; align-items: flex-start; gap: 6px;
                font-size: 10.5px; font-weight: 600; color: #0f172a; direction: rtl;
                min-width: 0; line-height: 1.4; word-break: break-word;
                padding: 7px 6px; border: 1.2px solid #94a3b8; border-radius: 5px;
                background: #fff; min-height: 34px;
            }
            .ptw-manual-equipment-cell.equipment-selected {
                border-color: #1d4ed8; background: #f8fafc;
            }
            .equipment-checkbox {
                width: 14px; height: 14px; border: 2px solid #334155; border-radius: 2px;
                flex-shrink: 0; margin-top: 1px; background: #fff; position: relative;
            }
            .equipment-checkbox.checked {
                background: #1e40af; border-color: #1e3a8a;
            }
            .equipment-checkbox.checked::after {
                content: ''; position: absolute; left: 3px; top: 1px;
                width: 4px; height: 8px; border: solid #fff;
                border-width: 0 2px 2px 0; transform: rotate(45deg);
            }
            .equipment-label { flex: 1; min-width: 0; }
            .ptw-manual-equipment-notes-print {
                margin-top: 8px; background: #fff; border: 1px solid #cbd5e1;
                border-radius: 8px; padding: 8px 10px;
            }
            .ptw-manual-equipment-notes-print .lbl {
                color: #334155; font-weight: 600; font-size: 10px; margin-bottom: 4px;
            }
            .ptw-manual-equipment-notes-print .val { font-size: 11px; color: #1f2937; white-space: pre-wrap; }
            .manual-risk-matrix { width: 100%; border-collapse: collapse; text-align: center; font-size: 10px; background: #fff; }
            .manual-risk-matrix th, .manual-risk-matrix td { border: 1px solid #6b7280; padding: 4px; }
            .manual-risk-matrix .risk-cell { font-weight: 700; padding: 8px 4px; }
            .manual-risk-matrix .risk-selected { outline: 3px solid #2563eb; outline-offset: -3px; }
            .manual-risk-summary { margin-top: 10px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
            .manual-risk-badge { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: #fff; }
            .manual-work-block { background: #fff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 10px; margin-bottom: 8px; }
            .manual-work-block h4 { margin: 0 0 6px 0; font-size: 12px; color: #6b21a8; }
            .manual-status-pill { display: inline-block; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 12px; }
            .manual-status-completed { background: #d1fae5; color: #065f46; border: 1px solid #10b981; }
            .manual-status-incomplete { background: #fef3c7; color: #92400e; border: 1px solid #f59e0b; }
            .manual-status-forced { background: #fee2e2; color: #991b1b; border: 1px solid #ef4444; }
            .manual-print-supervisors-grid {
                display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
            }
            .manual-print-supervisor-card {
                background: #fff; border: 1px solid #cbd5e1; border-radius: 8px;
                padding: 12px 14px; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
            }
            .manual-print-supervisor-card .lbl {
                font-size: 11px; font-weight: 700; color: #4338ca; margin-bottom: 6px;
            }
            .manual-print-supervisor-card .val {
                font-size: 13px; font-weight: 600; color: #1f2937; min-height: 1.5em;
            }
            .ptw-paper-footer {
                margin-top: 14px; padding-top: 10px; border-top: 2px solid #e0e7ff;
                page-break-inside: avoid; break-inside: avoid;
            }
            .ptw-paper-footer-frame {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(37, 99, 235, 0.05));
                border: 2px solid rgba(59, 130, 246, 0.15); border-radius: 10px; padding: 12px 16px;
            }
            .ptw-paper-footer-meta {
                display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 12px;
                font-size: 11px; color: #475569; font-weight: 600; padding-bottom: 8px;
                border-bottom: 1px dashed rgba(148, 163, 184, 0.45);
            }
            .ptw-paper-footer-company {
                display: flex; flex-direction: column; align-items: center; gap: 3px;
                margin-top: 8px; font-size: 11px; color: #334155; font-weight: 600;
            }
            .ptw-paper-grid-table .approval-name-cell,
            .ptw-paper-grid-table .approval-sig-cell {
                min-height: 22px; font-weight: 500; color: #111827;
            }
            @media print {
                body { padding: 2px; font-size: 10px; }
                .ptw-manual-form-section { page-break-inside: avoid !important; break-inside: avoid !important; margin: 4px 0; padding: 6px; }
                .ptw-manual-ppe-fixed-row { gap: 6px 3px; }
                .ptw-paper-footer { page-break-inside: avoid; break-inside: avoid; }
                table, .manual-risk-matrix { page-break-inside: avoid; break-inside: avoid; }
                tr, td, th { page-break-inside: avoid; break-inside: avoid; }
                .ptw-paper-grid-table { page-break-inside: avoid; break-inside: avoid; }
            }
            ${e?`
            @page { size: A4 portrait; margin: 3mm; }
            html, body {
                width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                max-width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
                font-size: 9.8px !important;
                line-height: 1.28 !important;
            }
            .ptw-manual-print {
                width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                max-width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                margin: 0 !important;
                padding: 2px 4px !important;
            }
            .ptw-a4-page {
                width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                max-width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                height: 1120px !important;
                min-height: 1120px !important;
                box-sizing: border-box;
                padding: 10px 15px 75px 15px !important;
                background: #fff;
                overflow: hidden;
                position: relative !important;
                page-break-after: always;
                break-after: page;
                display: flex;
                flex-direction: column;
            }
            .ptw-a4-page:last-child { page-break-after: auto; break-after: auto; }
            .ptw-paper-header { padding: 4px 6px; min-height: 0; border-radius: 6px; margin-bottom: 2px; }
            .ptw-paper-header-pdf { display: block; padding: 0; background: transparent; border: none; min-height: 0; margin-bottom: 2px; }
            .ptw-paper-header-table { width: 100%; border-collapse: collapse; table-layout: fixed; background: #1e3a5f; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.18); }
            .ptw-ph-cell { padding: 4px 5px; vertical-align: middle; color: #fff; letter-spacing: 0 !important; word-spacing: normal; }
            .ptw-ph-right { width: 38%; text-align: right; }
            .ptw-ph-center { width: 32%; text-align: center; }
            .ptw-ph-left { width: 30%; text-align: left; }
            .ptw-paper-header-company { letter-spacing: 0 !important; word-break: keep-all; white-space: nowrap; unicode-bidi: embed; font-size: 12px; }
            .ptw-paper-header-dept, .ptw-paper-header-form-title { letter-spacing: 0 !important; word-break: normal; white-space: normal; unicode-bidi: embed; }
            .ptw-paper-header-form-subtitle { font-size: 9px; letter-spacing: 0.2px !important; }
            .ptw-paper-header-form-title { font-size: 13px; padding-bottom: 2px; margin-bottom: 2px; }
            .ptw-paper-header-dept { font-size: 8px; }
            .ptw-paper-header-logo { max-height: 32px; max-width: 80px; }
            .manual-print-disclaimer-wrap { margin-bottom: 2px; border-width: 1px; }
            .manual-print-disclaimer-text { font-size: 8.5px; line-height: 1.25; padding: 2px 4px; }
            .manual-print-permit-no { padding: 2px; gap: 3px; }
            .manual-print-seq-badge { padding: 3px 10px; border-radius: 4px; }
            .manual-print-seq-badge .lbl { font-size: 8px; }
            .manual-print-seq-badge .val { font-size: 14px; letter-spacing: 1px; }
            .manual-print-paper-no { font-size: 10px; }
            
            /* Section stretching rules for filling the page elegantly */
            .manual-section-2, .manual-section-4, .manual-section-5,
            .manual-section-6, .manual-section-7, .manual-section-9 {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }
            .manual-section-7 .ptw-paper-grid-table,
            .manual-section-9 .ptw-paper-grid-table {
                flex: 1;
            }

            .ptw-manual-form-section { margin: 10px 0 12px 0 !important; padding: 6px 8px !important; border-radius: 4px; border-width: 1.2px; page-break-inside: avoid !important; break-inside: avoid !important; }
            .ptw-manual-form-section h3 { font-size: 10.5px; margin: 0 0 5px 0 !important; padding-bottom: 3px !important; gap: 4px; }
            .manual-print-field { padding: 3px 4px; border-radius: 3px; }
            .manual-print-field .lbl { font-size: 8px; margin-bottom: 1px; }
            .manual-print-field .val { font-size: 9px; }
            .manual-print-grid { gap: 4px; }
            .manual-print-req-grid { gap: 4px; }
            .manual-print-req-item { font-size: 8.5px; padding: 2px 3px; border-radius: 3px; }
            .ptw-paper-grid-table { font-size: 8.5px; }
            .ptw-paper-grid-table th, .ptw-paper-grid-table td { padding: 3px 4px; }
            .ptw-paper-grid-table thead th { font-size: 8.8px; }
            .ptw-manual-ppe-print-matrix, .ptw-manual-equipment-print-matrix { padding: 4px 4px; border-radius: 4px; }
            .ptw-manual-ppe-fixed-row, .ptw-manual-equipment-fixed-row { gap: 3px 2px; margin-bottom: 3px; }
            .ptw-manual-ppe-cell, .ptw-manual-equipment-cell { font-size: 7.5px; padding: 1.5px 2px; min-height: 15px; line-height: 1.2; letter-spacing: 0; border-width: 1px; border-radius: 3px; gap: 2px; }
            .ppe-checkbox, .equipment-checkbox { width: 8px; height: 8px; border-width: 1px; }
            .ppe-checkbox.checked::after, .equipment-checkbox.checked::after { left: 1.5px; top: 0.5px; width: 3px; height: 5px; border-width: 0 1.5px 1.5px 0; }
            .ptw-manual-ppe-notes-print, .ptw-manual-equipment-notes-print { margin-top: 4px; padding: 3px 5px; border-radius: 4px; }
            .ptw-manual-ppe-notes-print .lbl, .ptw-manual-equipment-notes-print .lbl { font-size: 8.5px; margin-bottom: 1.5px; }
            .ptw-manual-ppe-notes-print .val, .ptw-manual-equipment-notes-print .val { font-size: 9.5px; }
            .manual-risk-matrix { font-size: 8px; }
            .manual-risk-matrix th, .manual-risk-matrix td { padding: 2px 2px; }
            .manual-risk-matrix .risk-cell { padding: 3px 2px; }
            .manual-risk-summary { margin-top: 4px; padding: 4px 6px; gap: 6px; border-radius: 4px; }
            .manual-risk-badge { width: 24px; height: 24px; font-size: 10px; }
            .manual-risk-summary div { font-size: 9px; }
            .manual-work-block { padding: 4px 5px; margin-bottom: 3px; border-radius: 4px; }
            .manual-work-block h4 { font-size: 10px; margin: 0 0 3px 0; }
            .manual-status-pill { padding: 2.5px 6px; font-size: 9px; }
            .manual-print-supervisors-grid { gap: 5px; }
            .manual-print-supervisor-card { padding: 3px 4px; border-radius: 4px; }
            .manual-print-supervisor-card .lbl { font-size: 8px; margin-bottom: 2px; }
            .manual-print-supervisor-card .val { font-size: 9px; }
            .ptw-paper-grid-table .approval-name-cell,
            .ptw-paper-grid-table .approval-sig-cell { min-height: 18px; }
            .ptw-paper-footer {
                position: absolute !important;
                bottom: 15px !important;
                left: 15px !important;
                right: 15px !important;
                margin-top: 0 !important;
                border-top: 1px dashed #cbd5e1;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .ptw-paper-footer-frame {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(37, 99, 235, 0.05));
                border: 1px solid rgba(59, 130, 246, 0.1); border-radius: 4px; padding: 4px 6px;
            }
            .ptw-paper-footer-meta {
                display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 8px;
                font-size: 8.5px; color: #475569; font-weight: 600; padding-bottom: 3px;
                border-bottom: 1px dashed rgba(148, 163, 184, 0.3); letter-spacing: 0;
            }
            .ptw-pf-item { white-space: nowrap; }
            .ptw-paper-footer-company {
                display: flex; flex-direction: column; align-items: center; gap: 1.5px;
                margin-top: 3px; font-size: 8.5px; color: #334155; font-weight: 600; letter-spacing: 0;
            }
        `:""}
        `},getPermitA4ExportOverrides_(){const e=this.PERMIT_A4_WIDTH_PX;return`
            @page { size: A4 portrait; margin: 5mm; }
            html, body {
                width: ${e}px !important;
                max-width: ${e}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
            }
            body > * { max-width: ${e}px !important; box-sizing: border-box; }
            #ptw-permit-print-root { width: ${e}px !important; max-width: ${e}px !important; margin: 0 !important; }
            .report-header {
                grid-template-columns: minmax(240px, 1.45fr) minmax(280px, 1.75fr) minmax(88px, 112px) !important;
                gap: 12px !important;
            }
            .report-header .company-brand .company-name,
            .pdf-compact-footer .report-header .company-brand .company-name,
            .pdf-compact-footer .report-header .company-brand .company-name-secondary {
                white-space: nowrap !important;
                word-break: keep-all !important;
                overflow-wrap: normal !important;
            }
        `},_wrapPermitHtmlForA4Export(e){if(!e)return e;const a=`<style id="ptw-a4-export-overrides">${this.getPermitA4ExportOverrides_()}</style>`;return e.includes("</head>")?e.replace("</head>",`${a}</head>`):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">${a}</head><body><div id="ptw-permit-print-root">${e}</div></body></html>`},_formatManualPermitDateTime(e){if(!e||e==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return"\u2014";try{const a=this.parseDateTimeValue(e);return!a||isNaN(a.getTime())?String(e):a.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return String(e)}},generateManualPermitPrintContent(e){const a=this.normalizeManualPermitEntryForPrint(e);if(!a)return"";const i=T=>Utils.escapeHTML(T==null?"":String(T)),r=(T,$,S=!1)=>`
            <div class="manual-print-field${S?" full":""}">
                <div class="lbl">${i(T)}</div>
                <div class="val">${$?i($):"\u2014"}</div>
            </div>`,s=String(a.sequentialNumber||this.getPermitDisplayNumber(a)).padStart(4,"0"),o=String(a.paperPermitNumber||"").trim()||"\u2014",n=(a.teamMembers||[]).map(T=>`
            <tr>
                <td>${i(T.name)||"\u2014"}</td>
                <td style="border-right: 3px solid #1e3a8a;">${i(T.signature||T.id)||"\u2014"}</td>
            </tr>`).join(""),l=[{key:"preStartChecklist",label:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"},{key:"lotoApplied",label:"\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"},{key:"governmentPermits",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"},{key:"riskAssessmentAttached",label:"\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"gasTesting",label:"\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"},{key:"mocRequest",label:"\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)"}],p=T=>T===!0||T==="true"||T===1||T==="1",d=l.map(T=>{const $=p(a[T.key]);return`<div class="manual-print-req-item${$?" on":""}">${$?"\u2611":"\u2610"} ${i(T.label)}</div>`}).join(""),c=[],u=(T,$,S)=>{const B=Array.isArray($)?$.filter(Boolean):[],O=S?String(S).trim():"";!B.length&&!O||c.push(`<div class="manual-work-block"><h4>${i(T)}</h4><div>${i([...B,O].filter(Boolean).join("\u060C ")||"\u2014")}</div></div>`)};u("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",a.hotWorkDetails,a.hotWorkOther),u("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",a.confinedSpaceDetails,a.confinedSpaceOther),u("\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",a.heightWorkDetails,a.heightWorkOther),(a.excavationLength||a.excavationWidth||a.excavationDepth||a.soilType)&&c.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</h4>
                <div>\u0627\u0644\u0637\u0648\u0644: ${i(a.excavationLength)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0631\u0636: ${i(a.excavationWidth)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0645\u0642: ${i(a.excavationDepth)||"\u2014"} \u0645 | \u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629: ${i(a.soilType)||"\u2014"}</div></div>`),a.electricalWorkType&&c.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621</h4><div>${i(a.electricalWorkType)}</div></div>`),a.coldWorkType&&c.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</h4><div>${i(a.coldWorkType)}</div></div>`),a.otherWorkType&&c.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</h4><div>${i(a.otherWorkType)}</div></div>`);const m=this.getPermitTypeDisplay(a),f=`
            <div class="manual-work-block" style="border-color:#93c5fd;background:#eff6ff;"><h4>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629</h4><div>${i(m)}</div></div>
            ${c.length?c.join(""):'<div class="manual-print-field full"><div class="val">\u2014</div></div>'}`,y={5:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F",4:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B",3:"\u0645\u062D\u062A\u0645\u0644",2:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644",1:"\u0646\u0627\u062F\u0631"},g=parseInt(a.riskLikelihood,10),x=parseInt(a.riskConsequence,10),k=[5,4,3,2,1].map(T=>{const $=[1,2,3,4,5].map(S=>{const B=T*S;let O="#22c55e",Y="#fff";return B<=4?(O="#22c55e",Y="#fff"):B<=9?(O="#eab308",Y="#1c1917"):B<=16?(O="#f97316",Y="#fff"):(O="#dc2626",Y="#fff"),`<td class="risk-cell${g===T&&x===S?" risk-selected":""}" style="background:${O};color:${Y};">${B}</td>`}).join("");return`<tr><td class="row-label">${T} - ${y[T]}</td>${$}</tr>`}).join(""),P=a.riskScore?a.riskScore<=4?"#22c55e":a.riskScore<=9?"#eab308":a.riskScore<=16?"#f97316":"#dc2626":"#94a3b8",w=a.riskScore>4&&a.riskScore<=9?"#1c1917":"#fff",F=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>this._findManualApprovalByRoles(a.manualApprovals,[T,T.replace(/ئ/g,"\u0624"),T.replace(/ؤ/g,"\u0626"),T.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),T.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),N=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>this._findManualApprovalByRoles(a.manualClosureApprovals,[T,T.replace(/ئ/g,"\u0624"),T.replace(/ؤ/g,"\u0626"),T.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),T.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),D=T=>{const $=String(T||"").trim();return $?i($):"\u2014"},W=a.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"manual-status-completed":a.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"manual-status-forced":a.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"manual-status-incomplete":"",H=a.sublocation||(Array.isArray(a.locationEntries)&&a.locationEntries.length?a.locationEntries.map(T=>T.sublocation).filter(Boolean).join(" | "):"");return`
            <div class="manual-print-disclaimer-wrap">
                <div class="manual-print-disclaimer-text">
                    \u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647<br>
                    \u0648\u0644\u0627 \u064A\u062C\u0648\u0632 \u0628\u0623\u064A \u062D\u0627\u0644 \u0645\u0646 \u0627\u0644\u0623\u062D\u0648\u0627\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0644\u0623\u064A \u0639\u0645\u0644 \u0622\u062E\u0631 \u0644\u0645 \u064A\u062A\u0645 \u0648\u0635\u0641\u0647<br>
                    \u0648\u0639\u0644\u064A\u0647 \u0641\u0625\u0646\u0647 \u064A\u062C\u0628 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0645\u062F\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0648\u0641\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0644\u0639\u0645\u0644 \u0641\u064A\u0647 \u0641\u0642\u0637.
                </div>
                <div class="manual-print-permit-no">
                    <div class="manual-print-seq-badge">
                        <span class="lbl">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D / Permit No.</span>
                        <span class="val">${i(s)}</span>
                    </div>
                    <div class="manual-print-paper-no">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A: <strong>${i(o)}</strong></div>
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-1">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
                <div class="manual-print-grid">
                    ${r("\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",a.location)}
                    ${r("\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A",H)}
                    ${r("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",this._formatManualPermitDateTime(a.timeFrom))}
                    ${r("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",this._formatManualPermitDateTime(a.timeTo))}
                    ${r("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",a.authorizedParty)}
                    ${r("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",a.requestingParty)}
                    <div class="manual-print-field full">
                        <div class="lbl">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="val">
                            ${(()=>{const T=this.buildKnownEquipmentHistoryLabels(a.id||a.permitId||null),$=this.parseEquipmentToSelection(a.equipment,T);return`${this.buildManualFixedEquipmentPrintHtml($.matrixSelected||[])}${$.manualNotes?`
                            <div class="ptw-manual-equipment-notes-print">
                                <div class="lbl">\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A</div>
                                <div class="val">${i($.manualNotes)}</div>
                            </div>`:""}`})()}
                        </div>
                    </div>
                    ${r("\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)",a.tools||a.toolsList,!0)}
                    ${r("\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",a.workDescription,!0)}
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-2">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</h3>
                <table class="ptw-paper-grid-table">
                    <thead>
                        <tr>
                            <th style="width:50%;">\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</th>
                            <th style="width:50%;border-right:3px solid #1e3a8a;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                        </tr>
                    </thead>
                    <tbody>${n}</tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-3">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B : \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h3>
                ${f}
            </div>

            <div class="ptw-manual-form-section manual-section-4">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                <div class="manual-print-req-grid">${d}</div>
            </div>

            <div class="ptw-manual-form-section manual-section-5">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 / \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</h3>
                <div class="ptw-manual-ppe-body">
                    ${this.buildManualFixedPPEPrintHtml(a._ppeSelected)}
                    ${a._ppeExtraNotes&&a._ppeExtraNotes.length?`
                    <div class="ptw-manual-ppe-notes-print">
                        <div class="lbl">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A)</div>
                        <div class="val">${i(a._ppeExtraNotes.join("\u060C "))}</div>
                    </div>`:""}
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-6">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633 : \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</h3>
                <table class="manual-risk-matrix">
                    <thead>
                        <tr>
                            <th rowspan="2">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629</th>
                            <th colspan="5" style="background:#374151;color:#fff;">\u0627\u0644\u062E\u0637\u0648\u0631\u0629 (\u0627\u0644\u0639\u0648\u0627\u0642\u0628)</th>
                        </tr>
                        <tr>
                            <th>1 - \u0637\u0641\u064A\u0641</th><th>2 - \u0628\u0633\u064A\u0637</th><th>3 - \u0645\u062A\u0648\u0633\u0637</th><th>4 - \u062E\u0637\u064A\u0631</th><th>5 - \u0643\u0627\u0631\u062B\u064A</th>
                        </tr>
                    </thead>
                    <tbody>${k}</tbody>
                </table>
                ${a.riskScore?`
                <div class="manual-risk-summary">
                    <div class="manual-risk-badge" style="background:${P};color:${w};">${i(a.riskScore)}</div>
                    <div>
                        <div><strong>\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${i(a.riskScore)}</div>
                        <div><strong>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${i(a.riskLevel||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629:</strong> ${i(a.riskLikelihood||"\u2014")} | <strong>\u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong> ${i(a.riskConsequence||"\u2014")}</div>
                    </div>
                </div>`:""}
                ${a.riskNotes?`<div class="manual-print-field full" style="margin-top:8px;"><div class="lbl">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div><div class="val">${i(a.riskNotes)}</div></div>`:""}
            </div>

            <div class="ptw-manual-form-section manual-section-7">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A</h3>
                <table class="ptw-paper-grid-table">
                    <thead>
                        <tr><th colspan="5">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0644\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644)</th></tr>
                        <tr>
                            <th style="width:12%;">\u0627\u0644\u0627\u0633\u0645 / \u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                            <th>\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                            <th>\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</th>
                            <th>\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629</th>
                            <th>\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="row-label">\u0627\u0644\u0627\u0633\u0645</td>
                            ${F.map(T=>`<td class="approval-name-cell">${D(T.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${F.map(T=>`<td class="approval-sig-cell">${D(T.signature)}</td>`).join("")}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-8">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646 : \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</h3>
                <div class="manual-print-disclaimer-text" style="margin-bottom:10px;font-size:11px;padding:10px;">
                    \u062A\u0645 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644 \u062D\u062A\u0649 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0648\u062A\u0645 \u0641\u062D\u0635 \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062C\u0627\u0648\u0631\u0629 \u0644\u0647 \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062E\u0644\u0648\u0647\u0627 \u0645\u0646 \u0627\u0644\u0623\u062E\u0637\u0627\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644 \u062D\u062F\u0648\u062B\u0647\u0627 \u0648\u0630\u0644\u0643 \u0628\u0639\u062F \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0645\u0646 \u0627\u0644\u0639\u0645\u0644
                </div>
                <div class="manual-print-grid">
                    <div class="manual-print-field">
                        <div class="lbl">\u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        <div class="val"><span class="manual-status-pill ${W}">${i(a.status||"\u2014")}</span></div>
                    </div>
                    ${r("\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642",this._formatManualPermitDateTime(a.closureDate||a.closureTime))}
                    ${r("\u0627\u0644\u0633\u0628\u0628",a.closureReason,!0)}
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-9">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</h3>
                <table class="ptw-paper-grid-table">
                    <thead>
                        <tr><th colspan="5">\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D ( \u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A)</th></tr>
                        <tr>
                            <th style="width:12%;">\u0627\u0644\u0627\u0633\u0645 / \u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                            <th>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                            <th>\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</th>
                            <th>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                            <th>\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="row-label">\u0627\u0644\u0627\u0633\u0645</td>
                            ${N.map(T=>`<td class="approval-name-cell">${D(T.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${N.map(T=>`<td class="approval-sig-cell">${D(T.signature)}</td>`).join("")}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-10">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0634\u0631 : \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</h3>
                <div class="manual-print-supervisors-grid">
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644</div>
                        <div class="val">${D(a.supervisor1)}</div>
                    </div>
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</div>
                        <div class="val">${D(a.supervisor2)}</div>
                    </div>
                </div>
            </div>
        `},_splitManualPermitPrintPages_(e,a,i,r){if(!r)return`${a}${e}${i}`;const s=d=>`<div class="ptw-a4-page">${d}</div>`,n=e.indexOf('<div class="ptw-manual-form-section manual-section-6">');if(n<=0)return s(`${a}${e}${i}`);const l=s(`${a}${e.slice(0,n)}${i}`),p=s(`${e.slice(n)}${i}`);return`${l}${p}`},_verifyManualPermitExportHtml_(e){const i=[{key:"header-title",label:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:r=>r.includes("\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")&&r.includes("Permit To Work")},{key:"header-company",label:"\u0647\u064A\u062F\u0631 \u0627\u0644\u0634\u0631\u0643\u0629",test:r=>r.includes("ptw-paper-header")},{key:"footer",label:"\u0641\u0648\u062A\u0631 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:r=>r.includes("ptw-paper-footer")&&r.includes("\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C")},{key:"disclaimer",label:"\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629",test:r=>r.includes("manual-print-disclaimer-text")},{key:"sections",label:"\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0639\u0634\u0631\u0629",test:r=>{for(let s=1;s<=10;s++)if(!r.includes(`manual-section-${s}`))return!1;return!0}},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",test:r=>r.includes("ptw-manual-ppe-print-matrix")||r.includes("ptw-manual-ppe-fixed")},{key:"risk",label:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631",test:r=>r.includes("manual-risk-matrix")},{key:"approvals",label:"\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A",test:r=>r.includes("manual-section-7")},{key:"closure",label:"\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D",test:r=>r.includes("manual-section-8")},{key:"supervisors",label:"\u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",test:r=>r.includes("manual-section-10")}].filter(r=>!r.test(e||""));return{ok:i.length===0,failed:i.map(r=>r.label),pageCount:(String(e||"").match(/ptw-a4-page/g)||[]).length}},_logManualPermitExportReview_(e,a,i="export"){const r=this._verifyManualPermitExportHtml_(e);return r.ok?(Utils.safeLog(`\u2705 \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${i}): \u0645\u0637\u0627\u0628\u0642 \u2014 ${r.pageCount||1} \u0635\u0641\u062D\u0629/\u0635\u0641\u062D\u0627\u062A HTML`),r):(Utils.safeWarn(`\u26A0\uFE0F \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${i}): \u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629 \u2014 ${r.failed.join("\u060C ")}`),r)},async generateManualPermitPrintHTML(e,a={}){const r=this.generateManualPermitPrintContent(e),s=this.getPermitDisplayNumber(e);let o=e?.isoCode||"Form ICP (F14-26-01)",n=e?.createdAt||e?.timeFrom,l=e?.updatedAt||e?.timeTo||e?.createdAt,p=null;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const x=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");x&&(x.versionNumber&&(p=x.versionNumber),x.issueDate&&(n=x.issueDate),x.revisionDate&&(l=x.revisionDate))}}catch{}const d={formCode:p?`${o} (v${p})`:o,issueDate:n,revisionDate:l},c=this.renderPermitSystemFooter(d),u=this.renderPermitSystemHeader({forPdf:!0}),m=this._splitManualPermitPrintPages_(r,u,c,!0),f=this.getManualPermitPdfExportTechnicalStyles_(),y=`${this.getManualPermitPrintStyles(!0)}${f}`,g=`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A #${Utils.escapeHTML(s)}</title>
    <style>${y}</style>
</head>
<body>
    <div class="ptw-manual-print ptw-manual-print-a4" id="ptw-permit-print-root">
        ${m}
    </div>
</body>
</html>`;return a?.skipReview!==!0&&this._logManualPermitExportReview_(g,e,"pdf-export"),g},_loadPermitPdfLib_(e,a){if(a())return Promise.resolve(!0);const i=Array.isArray(e)?e:[e],r=s=>{if(s>=i.length)return Promise.resolve(!1);const o=i[s],n=Array.from(document.querySelectorAll("script[src]")).find(l=>String(l.src||"").includes(o.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return n?new Promise(l=>{const p=()=>l(!!a());n.addEventListener("load",p,{once:!0}),setTimeout(p,4e3)}):new Promise(l=>{const p=document.createElement("script");p.src=o,p.async=!0,p.onload=()=>l(!!a()),p.onerror=()=>l(r(s+1)),document.head.appendChild(p)})};return r(0)},async _ensurePermitPdfLibs_(){const e=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),a=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return e&&a},_getPermitJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadPermitPdfFonts_(e){const a=e||document,i=a.head||a.documentElement;if(i&&!a.getElementById("ptw-permit-cairo-font")){const r=a.createElement("link");r.id="ptw-permit-cairo-font",r.rel="stylesheet",r.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",i.appendChild(r)}try{a.fonts&&typeof a.fonts.load=="function"&&(await a.fonts.load("400 14px Cairo"),await a.fonts.load("600 14px Cairo"),await a.fonts.load("700 18px Cairo"),await a.fonts.load("800 16px Cairo"),await a.fonts.ready)}catch{}},_addPermitCanvasToPdfFullWidth_(e,a,i,r={}){const s=e.internal.pageSize.getWidth(),o=e.internal.pageSize.getHeight(),n=s-i*2,l=o-i*2,p=n,d=a.height/a.width*p,{dataUrl:c,format:u}=Utils.PdfExport.compressCanvasToJpegDataUrl(a,Utils.PdfExport.TARGET_MAX_BYTES);if(d<=l+.5||r.allowSlice===!1)return e.addImage(c,u,i,i,p,Math.min(d,l)),1;const m=a.width/p,f=Math.max(1,Math.floor(l*m)),y=Math.max(1,r.maxSlices||4);let g=0;for(let x=0;x<a.height&&g<y;x+=f){g>0&&e.addPage();const k=Math.min(f,a.height-x),P=document.createElement("canvas");P.width=a.width,P.height=k;const w=P.getContext("2d");w&&(w.fillStyle="#ffffff",w.fillRect(0,0,P.width,P.height),w.drawImage(a,0,x,a.width,k,0,0,a.width,k));const U=k/a.width*p,{dataUrl:F,format:_}=Utils.PdfExport.compressCanvasToJpegDataUrl(P,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/y));e.addImage(F,_,i,i,p,Math.min(U,l)),g+=1}return g},async _ensureJsPdfInFrame_(e,a){return!e||!a?!1:a.jspdf?.jsPDF||typeof a.jsPDF=="function"?!0:new Promise(i=>{const r=e.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",r.async=!0,r.onload=()=>i(!!(a.jspdf?.jsPDF||typeof a.jsPDF=="function")),r.onerror=()=>i(!1),(e.head||e.documentElement).appendChild(r)})},_getPermitJsPdfFromFrame_(e){return e?e.jspdf?.jsPDF?e.jspdf.jsPDF:typeof e.jsPDF=="function"?e.jsPDF:this._getPermitJsPdfConstructor_():this._getPermitJsPdfConstructor_()},async _downloadPermitHtmlViaJsPdfHtml_(e,a,i,r,s,o){const n=this._getPermitJsPdfFromFrame_(i);if(!n||!a)return!1;const l=e&&typeof e.html=="function"?e:new n({orientation:"portrait",unit:"mm",format:"a4"});if(typeof l.html!="function")return!1;const p=l.internal.pageSize.getWidth()-s*2;return new Promise(d=>{let c=!1;const u=f=>{c||(c=!0,d(!!f))},m=setTimeout(()=>u(!1),45e3);try{l.html(a,{callback:f=>{clearTimeout(m);try{f.save(r),u(!0)}catch{u(!1)}},margin:[s,s,s,s],width:p,windowWidth:o,html2canvas:{scale:this.PERMIT_A4_CAPTURE_SCALE||2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",logging:!1,width:o,windowWidth:o,scrollX:0,scrollY:0},autoPaging:"slice"})}catch{clearTimeout(m),u(!1)}})},async _downloadPermitHtmlAsPdfByPages_(e,a,i,r,s,o,n){if(!e||!a?.length)return!1;const l=Array.from(a).slice(0,n),p=this.PERMIT_A4_HEIGHT_PX;for(let d=0;d<l.length;d++){d>0&&e.addPage();const c=l[d];c.style.display="block",c.style.width=`${o}px`,c.style.maxWidth=`${o}px`,c.style.boxSizing="border-box",c.style.transform="none",c.style.zoom="1",c.style.background="#ffffff",c.style.overflow="visible",c.style.position="relative",this._sanitizePermitNodeForCanvasCapture_(c);const u=Math.max(c.scrollHeight,c.offsetHeight,1);r.style.width=`${o}px`,r.style.height=`${u+160}px`,typeof c.scrollIntoView=="function"&&c.scrollIntoView({block:"start"}),await new Promise(g=>setTimeout(g,450));const m=await this._capturePermitHtmlToCanvas_(c,i,{width:o,height:u});if(!m)return!1;const f=u>p,y=f?Math.min(6,Math.max(1,Math.ceil(u/p))):1;this._addPermitCanvasToPdfFullWidth_(e,m,s,{allowSlice:f,maxSlices:y})}return!0},async _downloadPermitHtmlAsPdfByCanvas_(e,a,i,r,s){if(!e||!a)return!1;a.style.width=`${this.PERMIT_A4_WIDTH_PX}px`,a.style.maxWidth=`${this.PERMIT_A4_WIDTH_PX}px`,a.style.boxSizing="border-box";const o=Math.max(a.scrollHeight,a.offsetHeight,1),n=await this._capturePermitHtmlToCanvas_(a,i,{width:this.PERMIT_A4_WIDTH_PX,height:o});return n?this._addPermitCanvasToPdfFullWidth_(e,n,r,{allowSlice:!0,maxSlices:s})>0:!1},async _ensureHtml2CanvasInFrame_(e,a){return!e||!a?!1:typeof a.html2canvas=="function"?!0:new Promise(i=>{const r=e.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",r.async=!0,r.onload=()=>i(typeof a.html2canvas=="function"),r.onerror=()=>i(!1),(e.head||e.documentElement).appendChild(r)})},_sanitizePermitNodeForCanvasCapture_(e){if(!e)return;const a=i=>{!i||!i.style||(i.style.transform="none",i.style.zoom="1",i.style.filter="none",i.style.webkitFilter="none")};a(e),e.querySelectorAll("*").forEach(a)},async _capturePermitHtmlToCanvas_(e,a,i={}){const r=i.width||this.PERMIT_A4_WIDTH_PX,s=Math.max(e?.scrollWidth||r,r),o=Math.max(e?.scrollHeight||1,i.height||e?.scrollHeight||1,1);let n=this.PERMIT_A4_CAPTURE_SCALE||2;for(;n>1&&(s*n>16e3||o*n>16e3);)n-=.25;const l=a&&typeof a.html2canvas=="function"?a.html2canvas:html2canvas,p={scale:n,backgroundColor:"#ffffff",logging:!1,useCORS:!0,allowTaint:!0,imageTimeout:12e3,scrollX:0,scrollY:0,width:s,height:o,windowWidth:s,windowHeight:o,onclone:(u,m)=>{const f=u.getElementById("ptw-permit-print-root")||m;this._sanitizePermitNodeForCanvasCapture_(f),u.querySelectorAll(".ptw-ph-cell, .ptw-paper-header-dept, .ptw-paper-header-form-title, .ptw-paper-header-form-subtitle").forEach(y=>{y?.style&&(y.style.letterSpacing="0",y.style.wordSpacing="normal",y.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",y.style.transform="none",y.style.unicodeBidi="embed")}),u.querySelectorAll(".ptw-paper-header-company").forEach(y=>{y?.style&&(y.style.letterSpacing="0",y.style.wordSpacing="normal",y.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",y.style.transform="none",y.style.unicodeBidi="embed",y.style.whiteSpace="nowrap",y.style.wordBreak="keep-all")}),u.body&&(u.body.style.width=`${s}px`,u.body.style.padding="8px",u.body.style.margin="0",u.body.style.background="#ffffff",u.body.style.direction="rtl"),u.documentElement&&(u.documentElement.style.direction="rtl")}},d=[p,{...p,useCORS:!1,allowTaint:!0},{...p,scale:Math.max(1.25,n-.5)}];let c=null;for(let u=0;u<d.length;u++)try{const m=await l(e,d[u]);if(m&&m.width>0&&m.height>0)return m}catch(m){c=m}if(c)throw c;return null},async _downloadPermitHtmlAsPdf(e,a){const i=this._getPermitJsPdfConstructor_();if(!i||typeof html2canvas>"u")return!1;const r=String(a||"PTW.pdf").toLowerCase().endsWith(".pdf")?String(a):`${String(a)}.pdf`,s=this.PERMIT_A4_WIDTH_PX,o=this.PERMIT_A4_MARGIN_MM,n=this.PERMIT_A4_MAX_PAGES||6;await this._preloadPermitPdfFonts_();const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.style.cssText=`position:fixed;left:-20000px;top:0;width:${s}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(l);try{l.srcdoc=e,await new Promise(g=>{l.onload=g,l.onerror=g,setTimeout(g,8e3)});const p=l.contentDocument||l.contentWindow?.document,d=l.contentWindow;if(!p||!d)return!1;await this._preloadPermitPdfFonts_(p),await new Promise(g=>setTimeout(g,900));const c=Array.from(p.images||[]);await Promise.all(c.map(g=>new Promise(x=>{if(g.complete)return x();g.onload=x,g.onerror=x,setTimeout(x,3e3)}))),await this._ensureHtml2CanvasInFrame_(p,d),await this._ensureJsPdfInFrame_(p,d),await new Promise(g=>setTimeout(g,400));const u=p.getElementById("ptw-permit-print-root")||p.querySelector(".ptw-manual-print")||p.querySelector(".report-wrapper")||p.querySelector(".form-container")||p.body;if(!u)return!1;u.style.width=`${s}px`,u.style.maxWidth=`${s}px`,u.style.margin="0",u.style.padding="0",u.style.boxSizing="border-box",u.style.background="#ffffff";const m=Math.max(u.scrollHeight,u.offsetHeight,200);l.style.width=`${s}px`,l.style.height=`${m+80}px`,await new Promise(g=>setTimeout(g,200));const f=u.querySelectorAll(".ptw-a4-page");let y=!1;if(f.length>0){const g=new i({orientation:"portrait",unit:"mm",format:"a4"});y=await this._downloadPermitHtmlAsPdfByPages_(g,f,d,l,o,s,n),y&&g.save(r)}if(!y){const g=new i({orientation:"portrait",unit:"mm",format:"a4"});y=await this._downloadPermitHtmlAsPdfByCanvas_(g,u,d,o,n),y&&g.save(r)}return y}catch(p){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0631\u064A\u062D PDF:",p),!1}finally{l.remove()}},_sanitizePermitFileName_(e){return String(e||"PTW").replace(/[/\\?%*:|"<>]/g,"-").trim()||"PTW"},async buildPermitExportPayload(e,a={}){const i=a?.forPdf!==!1,r=Array.isArray(this.registryData)?this.registryData.find(g=>g.permitId===e||g.id===e):null;if(r?.isManualEntry){const g=this.getPermitDisplayNumber(r),x=String(r.sequentialNumber||g).replace(/\D/g,"").padStart(4,"0")||g,k=await this.generateManualPermitPrintHTML(r),P=await this.generateManualPermitPrintHTML(r,{pdfExport:!0,skipReview:!0}),w=this._verifyManualPermitExportHtml_(P);return{html:P,printHtml:k,fileName:`PTW-${this._sanitizePermitFileName_(x)}.pdf`,displayNo:g,isManualEntry:!0,exportReview:w}}const s=r?.permitId||e,o=AppState.appData.ptw.find(g=>g.id===s);if(!o)return null;const n=r||this.registryData.find(g=>g.permitId===o.id),l=this.getPermitDisplayNumber(n||o);let p=o.isoCode||"Form ICP (F14-26-01)",d=o.version||"1.0",c=o.startDate||o.createdAt,u=o.updatedAt||o.endDate||o.startDate;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const g=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");g&&(g.versionNumber&&(d=g.versionNumber),g.issueDate&&(c=g.issueDate),g.revisionDate&&(u=g.revisionDate))}}catch{}const m=this.getPermitFormDataForPrint(o),f=this.generatePrintContent(m);return{html:this._wrapPermitHtmlForA4Export(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(p,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${l}`,f,!1,!1,{version:d,releaseDate:c,revisionDate:u,compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":l},o.createdAt||o.startDate,o.updatedAt||o.endDate||o.createdAt):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644</title></head><body><div id="ptw-permit-print-root">${f}</div></body></html>`),fileName:`PTW-${this._sanitizePermitFileName_(l)}.pdf`,displayNo:l}},openPermitPrintWindow(e,a){try{const i=new Blob([e],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(i),s=window.open(r,"_blank");s?s.onload=()=>{setTimeout(()=>{s.print(),setTimeout(()=>{URL.revokeObjectURL(r),typeof a=="function"&&a()},800)},500)}:(Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")),typeof a=="function"&&a())}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",i),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+i.message),typeof a=="function"&&a()}},async printPermit(e){Loading.show();const a=await this.buildPermitExportPayload(e,{forPdf:!1});if(Loading.hide(),!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const i=a.isManualEntry&&a.printHtml?a.printHtml:a.html;this.openPermitPrintWindow(i)},async deletePermitFromRegistry(e){if(AppState.currentUser?.role!=="admin"){Notification.error(this._t("module.ptw.notify.cannotDeletePerm","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"));return}if(confirm(this._t("module.ptw.notify.deletePtwFromSystem",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`)))try{Loading.show();const a=AppState.appData.ptw.findIndex(r=>r.id===e);a>-1&&AppState.appData.ptw.splice(a,1),this.removeFromRegistry(e),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),document.querySelector(".modal-overlay")?.remove(),this.loadPTWList(!0);const i=document.getElementById("ptw-registry-content");i&&i.style.display!=="none"&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",a),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}finally{Loading.hide()}},setupRegistryEventListeners(){const e=document.getElementById("ptw-registry-add-manual");e&&(e.onclick=()=>this.openManualPermitForm());const a=document.getElementById("ptw-registry-import-excel");a&&(a.onclick=()=>this.showImportExcelModal());const i=document.getElementById("ptw-registry-export-excel");i&&(i.onclick=()=>this.exportRegistryToExcel());const r=document.getElementById("ptw-registry-export-pdf");r&&(r.onclick=()=>this.exportRegistryToPDF());const s=document.getElementById("registry-search");s&&(s.oninput=()=>this.applyRegistryFilters());const o=document.getElementById("registry-filter-status");o&&(o.onchange=()=>this.applyRegistryFilters());const n=document.getElementById("registry-filter-date-from"),l=document.getElementById("registry-filter-date-to");n&&(n.onchange=()=>this.applyRegistryFilters()),l&&(l.onchange=()=>this.applyRegistryFilters()),this.applyRegistryFilters()},_normalizeRegistrySearchText(e){return String(e??"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},_getLinkedPermitForRegistryEntry(e){if(!e||e.isManualEntry)return null;const a=String(e.permitId||"").trim();return a&&(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).find(r=>r&&(String(r.id)===a||String(r.permitId||"")===a))||null},_getRegistryEntrySearchHaystack(e){if(!e)return[];const a=this._getLinkedPermitForRegistryEntry(e),i=(()=>{try{return this.getPermitTypeDisplay(e)}catch{return""}})(),r=(()=>{try{return this.statusLabel(e.status)}catch{return String(e.status||"")}})(),s=(()=>{try{return this.getPermitDisplayNumber(e)}catch{return""}})();return[e.paperPermitNumber,e.paperPermitNo,e.permitNumber,e.sequentialNumber,e.permitId,e.id,s,e.workDescription,e.requestingParty,e.authorizedParty,e.location,e.sublocation,e.supervisor1,e.supervisor2,i,r,a?.paperPermitNumber,a?.paperPermitNo,a?.permitNumber,a?.id,a?.workDescription].map(n=>String(n??"").trim()).filter(n=>n&&n!=="\u2014"&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&n!=="-")},_registryEntryMatchesSearch(e,a){const i=this._normalizeRegistrySearchText(a);if(!i)return!0;const r=this._getRegistryEntrySearchHaystack(e);if(r.some(o=>this._normalizeRegistrySearchText(o).includes(i)))return!0;const s=String(a||"").replace(/\D/g,"");return s&&/^\d+$/.test(String(a||"").trim())?r.some(o=>{const n=String(o).replace(/\D/g,"");return n&&(n===s||n.includes(s))}):!1},applyRegistryFilters(){const e=document.getElementById("registry-search")?.value.trim()||"",a=e.toLowerCase(),i=document.getElementById("registry-filter-status")?.value||"",r=document.getElementById("registry-filter-date-from")?.value||"",s=document.getElementById("registry-filter-date-to")?.value||"",o=document.querySelectorAll("[data-registry-id]");let n=0;o.forEach(p=>{let d=!0;const c=p.textContent.toLowerCase(),u=p.getAttribute("data-registry-id"),m=u!=null?String(u):"",f=this.registryData.find(g=>g.id!=null&&String(g.id)===m||g.permitId!=null&&String(g.permitId)===m);if(!f){p.style.display="none";return}e&&(this._registryEntryMatchesSearch(f,e)||a&&c.includes(a)||(d=!1)),i&&f.status!==i&&(d=!1);const y=f.timeFrom||f.openDate;if(r){const g=y?new Date(y):null,x=g&&!isNaN(g.getTime())?g.toISOString().split("T")[0]:"";(!x||x<r)&&(d=!1)}if(s){const g=y?new Date(y):null,x=g&&!isNaN(g.getTime())?g.toISOString().split("T")[0]:"";(!x||x>s)&&(d=!1)}p.style.display=d?"":"none",d&&(n+=1)});const l=document.getElementById("registry-filter-count");l&&(l.textContent=String(n))},toggleManualPermitFormFullscreen(e){const a=e&&e.closest?e.closest(".ptw-manual-permit-modal"):null;if(!a)return;const i=a.classList.toggle("ptw-manual-permit-modal-fullscreen"),r=e.querySelector("i"),s=e.querySelector(".ptw-manual-permit-fullscreen-label");r&&(r.className=i?"fas fa-compress":"fas fa-expand"),s&&(s.textContent=i?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),e.setAttribute("title",i?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")},_normEquipmentItemKey(e){return String(e||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},getManualFixedEquipmentRowLabels(){return[["\u0631\u0627\u0641\u0639\u0629","\u0633\u0644\u0645 \u0645\u062A\u062D\u0631\u0643","\u0633\u0642\u0627\u0644\u0629","\u0645\u0646\u0635\u0629 \u0631\u0641\u0639","\u0648\u0646\u0634","\u0645\u0636\u062E\u0629","\u062E\u0632\u0627\u0646","\u062E\u0637 \u0623\u0646\u0627\u0628\u064A\u0628","\u0644\u0648\u062D\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"],["\u0645\u0648\u0644\u062F \u0643\u0647\u0631\u0628\u0627\u0621","\u0636\u0627\u063A\u0637 \u0647\u0648\u0627\u0621","\u0645\u0627\u0643\u064A\u0646\u0629 \u0644\u062D\u0627\u0645","\u062C\u0644\u0627\u062E\u0629","\u0645\u0646\u0634\u0627\u0631","\u0645\u062B\u0642\u0627\u0628 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0645\u062D\u0631\u0643 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","\u0639\u062F\u0629 \u064A\u062F\u0648\u064A\u0629 \u062E\u0641\u064A\u0641\u0629"],["\u0635\u0627\u0631\u0648\u062E","\u0647\u064A\u0644\u062A\u0649","\u0633\u064A\u0632\u0631","\u0634\u062D\u0646","\u0643\u0627\u0628\u0644 \u0643\u0647\u0631\u0628\u0627\u0621","\u0648\u0635\u0644\u0627\u062A \u0643\u0647\u0631\u0628\u0627\u0621","\u0623\u062E\u0631\u0649"]]},getManualFixedEquipmentLabels(){return this.getManualFixedEquipmentRowLabels().flat()},_isFixedEquipmentLabel(e){const a=this._normEquipmentItemKey(e);return this.getManualFixedEquipmentLabels().some(i=>this._normEquipmentItemKey(i)===a)},_splitEquipmentTokens(e){return String(e||"").split(/[-+،,]/).map(a=>a.trim().replace(/^[\d\s]+/,"")).filter(Boolean)},_collectEquipmentEntriesForLookup(e=null){const a=new Set,i=[],r=String(e||"").trim(),s=o=>{if(!o)return;const n=String(o.id||o.permitId||"").trim();if(r&&n&&n===r)return;const l=n||`seq:${o.sequentialNumber||""}:${o.paperPermitNo||o.permitNumber||""}`;l&&a.has(l)||(l&&a.add(l),i.push(o))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(s),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(s),i.sort((o,n)=>this._getManualPermitEntryTimestamp(n)-this._getManualPermitEntryTimestamp(o))},buildKnownEquipmentHistoryLabels(e=null,a=20){const i=new Set(this.getManualFixedEquipmentLabels().map(o=>this._normEquipmentItemKey(o))),r=new Set,s=[];return this._collectEquipmentEntriesForLookup(e).forEach(o=>{this._splitEquipmentTokens(o.equipment).forEach(n=>{const l=this._normEquipmentItemKey(n);!l||i.has(l)||r.has(l)||(r.add(l),s.push(n))})}),s.sort((o,n)=>o.localeCompare(n,"ar")),s.slice(0,a)},parseEquipmentToSelection(e,a=[]){const r=this.getManualFixedEquipmentRowLabels().flat(),s=Array.isArray(a)?a:[],o=new Map;[...r,...s].forEach(d=>{const c=this._normEquipmentItemKey(d);c&&!o.has(c)&&o.set(c,d)});const n=[],l=[],p=new Set;return this._splitEquipmentTokens(e).forEach(d=>{const c=this._normEquipmentItemKey(d);if(o.has(c)){const u=o.get(c);p.has(c)||(p.add(c),n.push(u))}else l.push(d)}),{matrixSelected:n,manualNotes:l.join("\u060C ")}},_equipmentSelectionIsChecked(e,a){const i=new Set((a||[]).map(o=>String(o||"").trim()).filter(Boolean)),r=String(e||"").trim();if(i.has(r))return!0;const s=this._normEquipmentItemKey(r);for(const o of i)if(this._normEquipmentItemKey(o)===s)return!0;return!1},buildManualFixedEquipmentCheckboxesHtml(e=[],a=[]){const i=Utils.escapeHTML,r=l=>this._equipmentSelectionIsChecked(l,e),s=this.getManualFixedEquipmentRowLabels(),o=(Array.isArray(a)?a:[]).filter(Boolean);let n='<div class="ptw-manual-equipment-fixed-wrap">';return s.forEach(l=>{n+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-grid-row">',l.forEach(p=>{const d=r(p)?" checked":"";n+=`<label class="ptw-manual-equipment-cell"><input type="checkbox" class="equipment-fixed-cb" value="${i(p)}"${d}><span class="ptw-manual-equipment-label">${i(p)}</span></label>`}),n+="</div>"}),o.length&&(n+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-history-row">',o.forEach(l=>{const p=r(l)?" checked":"";n+=`<label class="ptw-manual-equipment-cell ptw-manual-equipment-history-cell"><input type="checkbox" class="equipment-history-cb" value="${i(l)}"${p}><span class="ptw-manual-equipment-label">${i(l)}</span></label>`}),n+="</div>"),n+="</div>",n},buildManualFixedEquipmentPrintHtml(e=[]){const a=n=>Utils.escapeHTML(n),i=n=>this._equipmentSelectionIsChecked(n,e),r=this.getManualFixedEquipmentRowLabels(),s=(e||[]).filter(n=>{const l=String(n||"").trim();return l&&!this._isFixedEquipmentLabel(l)});let o='<div class="ptw-manual-equipment-print-matrix"><div class="ptw-manual-equipment-fixed-wrap">';return r.forEach((n,l)=>{const p=l===r.length-1?"ptw-manual-equipment-fixed-row equipment-row-last":"ptw-manual-equipment-fixed-row";o+=`<div class="${p}">`,n.forEach(d=>{const c=i(d);o+=`<span class="ptw-manual-equipment-cell${c?" equipment-selected":""}"><span class="equipment-checkbox${c?" checked":""}" aria-hidden="true"></span><span class="equipment-label">${a(d)}</span></span>`}),o+="</div>"}),s.length&&(o+='<div class="ptw-manual-equipment-fixed-row ptw-manual-equipment-history-row equipment-row-last">',s.forEach(n=>{o+=`<span class="ptw-manual-equipment-cell equipment-selected ptw-manual-equipment-history-cell"><span class="equipment-checkbox checked" aria-hidden="true"></span><span class="equipment-label">${a(n)}</span></span>`}),o+="</div>"),o+="</div></div>",o},collectEquipmentFieldValue(e,a={}){const i=e?.querySelector?e:document,r=a.matrixId||"#manual-equipment-matrix",s=a.notesId||"#manual-equipment-notes",o=i.querySelector(r),n=i.querySelector(s),l=Array.from(o?.querySelectorAll(".equipment-fixed-cb:checked")||[]).map(u=>String(u.value||"").trim()).filter(Boolean),p=Array.from(o?.querySelectorAll(".equipment-history-cb:checked")||[]).map(u=>String(u.value||"").trim()).filter(Boolean),d=String(n?.value||"").trim(),c=d?this._splitEquipmentTokens(d):[];return[...new Set([...l,...p,...c])].join("\u060C ")},setupManualEquipmentToolsSync(e){if(!e)return;const a=e.querySelector("#manual-permit-tools"),i=e.querySelector("#manual-equipment-matrix"),r=e.querySelector("#manual-equipment-notes");if(!a||!i)return;const s=()=>{const o=this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),n=String(a.value||"").trim(),l=String(i.dataset.autoToolsValue||"").trim();(!n||n===l)&&(a.value=o,i.dataset.autoToolsValue=o)};s(),i.addEventListener("change",s),r?.addEventListener("input",s)},buildManualFixedPPECheckboxesHtml(e=[]){const a=Utils.escapeHTML,i=new Set((e||[]).map(l=>String(l||"").trim()).filter(Boolean)),r=l=>String(l||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),s=l=>{const p=String(l).trim();if(i.has(p))return!0;const d=r(p);for(const c of i)if(r(c)===d)return!0;return!1},o=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let n='<div class="ptw-manual-ppe-fixed-wrap">';return o.forEach(l=>{n+='<div class="ptw-manual-ppe-fixed-row">',l.forEach(p=>{const d=s(p)?" checked":"";n+=`<label class="ptw-manual-ppe-cell"><input type="checkbox" class="manual-ppe-fixed-cb" value="${a(p)}"${d}><span>${a(p)}</span></label>`}),n+="</div>"}),n+="</div>",n},async openManualPermitForm(e=null){const a=e!==null,i=e?this.registryData.find(h=>h.id===e):null;if(i&&(!i.teamMembers||!i.teamMembers.length)&&i.teamMembersText){const h=String(i.teamMembersText).trim();i.teamMembers=h.split(/[،,]/).map(M=>{M=M.trim();const q=M.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return q?{name:q[1].trim(),signature:q[2].trim()}:{name:M,signature:""}}).filter(M=>M.name||M.signature)}i&&(!i.teamMembers||!i.teamMembers.length)&&(i.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(h=>{i&&i[h]!=null&&typeof i[h]=="string"&&(i[h]=i[h].split(/[،,]/).map(M=>M.trim()).filter(Boolean))});const r=this.getSiteOptions(),s=["\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],o=["\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"],l=String(i?.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",p=i?.sequentialNumber||this.generateRegistrySequentialNumber(),d=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(h=>({name:(h.name||"").trim()})).filter(h=>h.name):[],c=d.length>0,u=i?.authorizedParty||"",m=this.getDepartmentOptionsForPTW(),f=m.length>0,y=i?.requestingParty||"",g=i?.requiredPPE&&Array.isArray(i.requiredPPE)&&i.requiredPPE.length?i.requiredPPE.map(h=>String(h||"").trim()).filter(Boolean):i?.ppeNotes?String(i.ppeNotes).split(/[،,]/).map(h=>h.trim()).filter(Boolean):[],x=i?.id||i?.permitId||null,k=this.buildKnownEquipmentHistoryLabels(x),P=this.parseEquipmentToSelection(i?.equipment,k),w=this.buildManualFixedEquipmentCheckboxesHtml(P.matrixSelected,k),U=typeof Training<"u"&&typeof Training.getSafetyTeamMembers=="function"?Training.getSafetyTeamMembers({excludeSystemUsers:!0}):[],F=(h,M)=>{const q=Utils.escapeHTML,G=String(M||"").trim(),Z=U.map(j=>String(j.name||"").trim()).filter(Boolean);let Q=`<option value="">${q(h)}</option>`;return Z.forEach(j=>{Q+=`<option value="${q(j)}"${G===j?" selected":""}>${q(j)}</option>`}),G&&!Z.includes(G)&&(Q+=`<option value="${q(G)}" selected>${q(G)}</option>`),Q},_=`class="form-input" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px; width: 100%;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'"`,N=this._manualEntryToPtwStub(i);let D=[],W=[];try{[D,W]=await Promise.all([this._fetchIaCandidatesForRole(N,"areaManager"),this._fetchIaCandidatesForRole(N,"maintenanceEngineer")])}catch(h){typeof Utils<"u"&&Utils.safeWarn("openManualPermitForm IA fetch:",h)}const H=h=>{const M=(i?.manualApprovals||[]).find(q=>q.role===h)||{};return{name:M.name||"",approverId:M.approverId||"",personType:M.personType||""}},T=H("\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"),$=H("\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"),S=(i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")||{},B=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:D,selectedId:T.approverId,selectedName:T.name}),O=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",roleKey:"maintenanceEngineer",candidates:W,selectedId:$.approverId,selectedName:$.name}),Y=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:D,selectedId:S.approverId||"",selectedName:S.name||"",isClosure:!0,inputClass:"form-input text-sm w-full manual-closure-approval-name"}),ee=i?.id||i?.permitId||null,v=this.buildKnownTeamMembersIndex(ee),E=this.buildKnownManualApprovalsIndex(ee),K=this.buildManualPermitDatalistHtml(this.getKnownTeamMemberNames(v)),C=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(E,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")),b=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(E,"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")),V=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(E,"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")),I=document.createElement("div");I.className="modal-overlay",I.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;",I.innerHTML=`
            <style>
                /* \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u0633\u0637\u0631\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 */
                #manual-permit-modal-body {
                    scrollbar-width: auto;
                    scrollbar-color: #2196F3 #e3f2fd;
                }
                #manual-permit-modal-body::-webkit-scrollbar {
                    width: 14px;
                }
                #manual-permit-modal-body::-webkit-scrollbar-track {
                    background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%);
                    border-radius: 10px;
                    border: 2px solid #90caf9;
                }
                #manual-permit-modal-body::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #1976D2 0%, #1565C0 50%, #0D47A1 100%);
                    border-radius: 10px;
                    border: 2px solid #e3f2fd;
                    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                }
                #manual-permit-modal-body::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #2196F3 0%, #1976D2 50%, #1565C0 100%);
                }
                #manual-permit-modal-body::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(180deg, #0D47A1 0%, #1565C0 100%);
                }
                #manual-permit-modal-body::-webkit-scrollbar-button:single-button {
                    display: block;
                    height: 16px;
                    background-color: #1976D2;
                    border-radius: 5px;
                }
                #manual-permit-modal-body::-webkit-scrollbar-button:single-button:vertical:decrement {
                    background: linear-gradient(180deg, #1976D2, #1565C0);
                    border-radius: 5px 5px 0 0;
                }
                #manual-permit-modal-body::-webkit-scrollbar-button:single-button:vertical:increment {
                    background: linear-gradient(180deg, #1565C0, #1976D2);
                    border-radius: 0 0 5px 5px;
                }
                .manual-permit-same-field-slot {
                    min-height: 2.5rem;
                    position: relative;
                }
                .manual-permit-same-field-slot input.absolute {
                    box-sizing: border-box;
                }
                
                .ptw-manual-form-section {
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .ptw-manual-form-section:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                    transform: translateY(-2px);
                }
                .ptw-manual-form-section h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 3px solid;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .ptw-manual-form-section h3 i {
                    font-size: 1.5rem;
                    padding: 10px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.3);
                }
                .manual-section-1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .manual-section-1 h3 { color: #1565C0; border-color: #2196F3; }
                .manual-section-1 h3 i { color: #1976D2; background: rgba(33, 150, 243, 0.1); }
                
                .manual-section-2 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .manual-section-2 h3 { color: #00695C; border-color: #009688; }
                .manual-section-2 h3 i { color: #00796B; background: rgba(0, 150, 136, 0.1); }
                
                .manual-section-3 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .manual-section-3 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .manual-section-3 h3 i { color: #7B1FA2; background: rgba(156, 39, 176, 0.1); }
                
                .manual-section-4 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .manual-section-4 h3 { color: #E65100; border-color: #FF9800; }
                .manual-section-4 h3 i { color: #F57C00; background: rgba(255, 152, 0, 0.1); }
                
                .manual-section-5 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .manual-section-5 h3 { color: #2E7D32; border-color: #4CAF50; }
                .manual-section-5 h3 i { color: #388E3C; background: rgba(76, 175, 80, 0.1); }
                
                .manual-section-6 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .manual-section-6 h3 { color: #AD1457; border-color: #E91E63; }
                .manual-section-6 h3 i { color: #C2185B; background: rgba(233, 30, 99, 0.1); }
                
                .manual-section-7 { background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); border-color: #795548; }
                .manual-section-7 h3 { color: #4E342E; border-color: #795548; }
                .manual-section-7 h3 i { color: #5D4037; background: rgba(121, 85, 72, 0.1); }
                
                .manual-section-8 { background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%); border-color: #9e9e9e; }
                .manual-section-8 h3 { color: #424242; border-color: #9e9e9e; }
                .manual-section-8 h3 i { color: #616161; background: rgba(158, 158, 158, 0.1); }
                
                .manual-section-9 { background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-color: #03a9f4; }
                .manual-section-9 h3 { color: #0277bd; border-color: #03a9f4; }
                .manual-section-9 h3 i { color: #0288d1; background: rgba(3, 169, 244, 0.1); }
                
                .manual-section-10 { background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%); border-color: #673ab7; }
                .manual-section-10 h3 { color: #4527a0; border-color: #673ab7; }
                .manual-section-10 h3 i { color: #512da8; background: rgba(103, 58, 183, 0.1); }

                .manual-permit-type-card {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: white;
                    border-radius: 12px;
                    border: 2px solid #e0e0e0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .manual-permit-type-card:hover {
                    border-color: #9C27B0;
                    background: #f3e5f5;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
                }
                .manual-permit-type-card.selected {
                    border-color: #9C27B0;
                    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
                    box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3);
                }
                .manual-permit-type-card input[type="checkbox"] {
                    width: 20px;
                    height: 20px;
                    margin-left: 12px;
                    accent-color: #9C27B0;
                }
                .manual-permit-type-card .type-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 12px;
                    font-size: 1.2rem;
                }
                .manual-permit-type-card .type-name {
                    font-weight: 600;
                    color: #333;
                }
                /* \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 - \u062A\u0646\u0633\u064A\u0642 \u0623\u0633\u0647\u0644 \u0648\u0623\u0643\u062B\u0631 \u0645\u0626\u0648\u0646\u0629 */
                #manual-work-type-select-wrap {
                    flex-shrink: 0; width: 220px;
                    border: 1px solid #e9d5ff; border-radius: 12px;
                    background: linear-gradient(180deg, #fdf4ff 0%, #f5e0ff 100%);
                    padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
                }
                #manual-work-type-select-wrap label {
                    display: block; font-weight: 600; color: #6b21a8;
                    margin-bottom: 10px; font-size: 0.9rem;
                }
                #manual-work-type-select {
                    width: 100%; padding: 10px 12px; border-radius: 8px;
                    border: 1px solid #d8b4fe; background: #fff;
                    font-size: 0.9rem; color: #374151;
                }
                #manual-work-type-select:focus { outline: none; border-color: #9C27B0; box-shadow: 0 0 0 2px rgba(156,39,176,0.2); }
                .manual-work-type-inline-panel {
                    flex: 1; min-width: 280px; min-height: 220px;
                    border: 1px solid #e9d5ff; border-radius: 12px;
                    background: #fefefe; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
                    padding: 18px; transition: box-shadow 0.2s ease;
                }
                .manual-work-type-inline-panel:focus-within { box-shadow: 0 0 0 2px rgba(156,39,176,0.15); }
                #manual-work-type-panel-placeholder {
                    color: #7c3aed; font-size: 0.9rem; text-align: center;
                    padding: 32px 16px; line-height: 1.6;
                }
                #manual-work-type-panel-title {
                    margin: 0 0 14px 0; font-size: 1rem; font-weight: 700;
                    color: #6b21a8; padding-bottom: 10px;
                    border-bottom: 2px solid #e9d5ff;
                }
                .manual-type-panel-body label.manual-opt-row {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; margin-bottom: 6px;
                    border-radius: 10px; cursor: pointer;
                    border: 1px solid transparent; transition: all 0.15s ease;
                }
                .manual-type-panel-body label.manual-opt-row:hover { background: #faf5ff !important; }
                .manual-type-panel-body .manual-other-label { font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 6px; }
                .manual-type-panel-body .manual-other-input { width: 100%; border-radius: 8px; padding: 8px 12px; border: 1px solid #e5e7eb; }
                .manual-selected-type-chip { cursor: pointer; transition: background 0.15s ease; }
                .manual-selected-type-chip:hover { background: #ddd6fe !important; }
                .manual-selected-types-hint { font-size: 0.75rem; color: #7c3aed; margin-top: 6px; opacity: 0.9; }
                .manual-selected-types-empty { font-size: 0.8rem; color: #9ca3af; font-style: italic; padding: 8px 0; }
                .manual-panel-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .manual-panel-type-badge { font-size: 0.7rem; padding: 2px 8px; border-radius: 12px; background: #d9f99d; color: #365314; font-weight: 600; }
                @media (max-width: 768px) {
                    .manual-section-3-content > div[style*="flex"] { flex-wrap: wrap !important; }
                    #manual-work-type-select-wrap { width: 100% !important; max-width: 100%; }
                    .manual-work-type-inline-panel { min-width: 100% !important; }
                }
                /* \u0631\u0623\u0633 \u0627\u0644\u0648\u0631\u0642 + \u0627\u0644\u0634\u0639\u0627\u0631: \u064A\u064F\u062D\u0642\u0646 \u0639\u0628\u0631 renderPermitSystemHeader() \u0648\u0644\u0627 \u064A\u0645\u0631 \u0628\u0646\u0645\u0637 \u0646\u0645\u0648\u0630\u062C PTW \u0627\u0644\u0639\u0627\u062F\u064A */
                .ptw-manual-permit-modal .ptw-paper-header {
                    display: grid;
                    grid-template-columns: 1.45fr 1.15fr 0.85fr;
                    align-items: center;
                    gap: 10px 14px;
                    padding: 12px 20px;
                    margin: 0 24px;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    color: #fff;
                    border-radius: 0 0 12px 12px;
                    border: 1px solid rgba(255, 255, 255, 0.22);
                    border-top: none;
                    min-height: 72px;
                    max-height: 92px;
                    box-sizing: border-box;
                }
                .ptw-manual-permit-modal .ptw-paper-header-right { text-align: right; min-width: 0; }
                .ptw-manual-permit-modal .ptw-paper-header-company {
                    font-size: 15px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: 0.2px;
                    line-height: 1.35;
                    white-space: nowrap;
                    word-break: keep-all;
                }
                .ptw-manual-permit-modal .ptw-paper-header-dept {
                    font-size: 11px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    margin-top: 4px;
                    line-height: 1.3;
                }
                .ptw-manual-permit-modal .ptw-paper-header-center {
                    text-align: center; min-width: 0;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                }
                .ptw-manual-permit-modal .ptw-paper-header-form-title {
                    font-size: 16px;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1.25;
                    padding-bottom: 4px;
                    margin-bottom: 4px;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.35);
                }
                .ptw-manual-permit-modal .ptw-paper-header-form-subtitle {
                    font-size: 11px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.94);
                    letter-spacing: 1.1px;
                    text-transform: uppercase;
                }
                .ptw-manual-permit-modal .ptw-paper-header-left {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    min-width: 0;
                }
                .ptw-manual-permit-modal .ptw-paper-header-logo {
                    max-height: 44px;
                    max-width: 120px;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    background: #fff;
                    border-radius: 6px;
                    padding: 3px;
                    display: block;
                    flex-shrink: 0;
                }
                .ptw-manual-permit-modal .ptw-paper-header-logo-fallback {
                    width: 72px;
                    height: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.55);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 11px;
                    flex-shrink: 0;
                }
                @media (max-width: 640px) {
                    .ptw-manual-permit-modal .ptw-paper-header {
                        grid-template-columns: 1fr;
                        max-height: none;
                        text-align: center;
                    }
                    .ptw-manual-permit-modal .ptw-paper-header-right,
                    .ptw-manual-permit-modal .ptw-paper-header-center { text-align: center; }
                    .ptw-manual-permit-modal .ptw-paper-header-left { justify-content: center; }
                    .ptw-manual-permit-modal .ptw-paper-header-dept { white-space: normal; }
                }
                /* \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u064A\u062F\u0648\u064A \u2014 \u062E\u0644\u0641\u064A\u0629 \u0641\u0627\u062A\u062D\u0629 \u0648\u0648\u0636\u0648\u062D \u062F\u0648\u0646 \u0641\u0631\u0636 \u062B\u064A\u0645 \u0623\u0633\u0648\u062F */
                .ptw-manual-permit-modal .ptw-paper-grid-table {
                    width: 100%;
                    border-collapse: collapse !important;
                    table-layout: fixed;
                    border: 1.2px solid #94a3b8 !important;
                    background: #fff;
                }
                .ptw-manual-permit-modal .ptw-paper-grid-table th,
                .ptw-manual-permit-modal .ptw-paper-grid-table td {
                    border: 1.2px solid #94a3b8 !important;
                    min-height: 42px;
                    padding: 7px 8px !important;
                    vertical-align: middle;
                }
                .ptw-manual-permit-modal .ptw-paper-grid-table th {
                    background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%) !important;
                    color: #111827 !important;
                    font-size: 13px;
                    font-weight: 700;
                }
                .ptw-manual-permit-modal .ptw-paper-grid-table td {
                    background: #fff !important;
                    color: #111827 !important;
                    font-size: 13px;
                }
                .ptw-manual-permit-modal .ptw-paper-grid-table td.bg-gray-50 {
                    background: #f1f5f9 !important;
                    color: #111827 !important;
                    font-weight: 700;
                }
                @media (max-width: 1024px) {
                    .ptw-manual-permit-modal .ptw-paper-grid-table th,
                    .ptw-manual-permit-modal .ptw-paper-grid-table td {
                        min-height: 38px;
                        font-size: 12px !important;
                        padding: 6px 7px !important;
                    }
                }
                @media (max-width: 768px) {
                    .ptw-manual-permit-modal .modal-content {
                        width: 100% !important;
                        max-height: 100vh !important;
                        border-radius: 0 !important;
                    }
                    .ptw-manual-permit-modal .modal-header {
                        padding: 14px 12px !important;
                    }
                    .ptw-manual-permit-modal #manual-permit-modal-body {
                        padding: 10px !important;
                        max-height: calc(100vh - 210px) !important;
                    }
                    .ptw-manual-permit-modal .ptw-manual-form-section {
                        margin-bottom: 10px !important;
                        padding: 9px !important;
                    }
                    .ptw-manual-permit-modal .ptw-manual-form-section h3 {
                        font-size: 0.95rem !important;
                        padding-bottom: 10px !important;
                    }
                    .ptw-manual-permit-modal .overflow-x-auto {
                        overflow-x: auto !important;
                    }
                    .ptw-manual-permit-modal .ptw-paper-grid-table {
                        min-width: 760px;
                    }
                }
                /* \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 \u2014 \u0646\u0641\u0633 \u0623\u0644\u0648\u0627\u0646/\u0634\u0643\u0644 \u0628\u0627\u0642\u064A \u0627\u0644\u0623\u0642\u0633\u0627\u0645\u061B \u0627\u0644\u0642\u064A\u0645 \u062F\u0627\u062E\u0644 \u0625\u0637\u0627\u0631 \u0634\u0628\u064A\u0647 \u0628\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0648\u0631\u0642\u064A */
                .ptw-manual-permit-modal .manual-section-5.ptw-manual-ppe-section {
                    overflow: visible;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-body {
                    margin-top: 0;
                }
                .ptw-manual-permit-modal .manual-section-5 #manual-ppe-matrix {
                    background: #ffffff !important;
                    border: 1.2px solid #94a3b8 !important;
                    border-radius: 10px !important;
                    padding: 18px 12px !important;
                    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.07);
                    width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-notes-frame {
                    margin-top: 0.5rem;
                    background: #ffffff;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    padding: 6px 8px 6px;
                    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-notes-frame label {
                    color: #334155;
                    font-weight: 600;
                    font-size: 0.72rem;
                    margin-bottom: 4px;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-notes-frame textarea {
                    min-height: 2rem;
                    max-height: 4rem;
                    padding: 6px 8px;
                    font-size: 0.8rem;
                    line-height: 1.35;
                    resize: vertical;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-fixed-wrap {
                    width: 100%;
                    max-width: 100%;
                    overflow-x: visible;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-fixed-row {
                    display: grid;
                    grid-template-columns: repeat(9, minmax(0, 1fr));
                    gap: 8px 6px;
                    margin-bottom: 8px;
                    direction: rtl;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-fixed-row:last-child {
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                    margin-bottom: 0;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell {
                    display: flex;
                    align-items: flex-start;
                    gap: 6px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #0f172a !important;
                    cursor: pointer;
                    direction: rtl;
                    min-width: 0;
                    line-height: 1.38;
                    word-break: break-word;
                    padding: 7px 6px;
                    border: 1.2px solid #94a3b8;
                    border-radius: 5px;
                    background: #fff;
                    min-height: 34px;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell:has(input:checked) {
                    border-color: #1d4ed8;
                    background: #f8fafc;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell span {
                    min-width: 0;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell input[type="checkbox"] {
                    flex-shrink: 0;
                    width: 14px;
                    height: 14px;
                    margin-top: 2px;
                    appearance: none;
                    -webkit-appearance: none;
                    border: 2px solid #334155;
                    border-radius: 2px;
                    background: #fff;
                    cursor: pointer;
                    position: relative;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell input[type="checkbox"]:checked {
                    background: #1e40af;
                    border-color: #1e3a8a;
                }
                .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell input[type="checkbox"]:checked::after {
                    content: '';
                    position: absolute;
                    left: 3px;
                    top: 1px;
                    width: 4px;
                    height: 8px;
                    border: solid #fff;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                @media (max-width: 1200px) {
                    .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-fixed-row {
                        grid-template-columns: repeat(9, minmax(0, 1fr));
                        gap: 9px 4px;
                    }
                    .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-cell {
                        font-size: 0.75rem;
                    }
                }
                @media (max-width: 900px) {
                    .ptw-manual-permit-modal .manual-section-5 .ptw-manual-ppe-fixed-row {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }

                /* \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u2014 \u062A\u062E\u0637\u064A\u0637 \u0639\u0645\u0648\u062F\u064A \u0628\u0639\u0631\u0636 \u0643\u0627\u0645\u0644 */
                .ptw-s1-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }
                .ptw-s1-row {
                    width: 100%;
                }
                .ptw-s1-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 1rem;
                }
                .ptw-s1-parties-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 1rem;
                    padding-top: 0.25rem;
                    border-top: 1px solid rgba(148, 163, 184, 0.35);
                }
                .ptw-s1-block {
                    width: 100%;
                    padding: 0.65rem 0.75rem;
                    background: rgba(255, 255, 255, 0.72);
                    border: 1px solid rgba(148, 163, 184, 0.35);
                    border-radius: 8px;
                    box-sizing: border-box;
                }
                .ptw-s1-block > label:first-child {
                    margin-bottom: 0.4rem;
                }
                .ptw-s1-equipment {
                    padding-bottom: 0.5rem;
                }
                .ptw-s1-tools textarea,
                .ptw-s1-work-desc textarea {
                    min-height: 2.5rem;
                    resize: vertical;
                }
                @media (max-width: 1100px) {
                    .ptw-s1-meta-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                @media (max-width: 640px) {
                    .ptw-s1-meta-grid,
                    .ptw-s1-parties-grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u2014 \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0639\u062F\u0627\u062A/\u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 (chips \u0623\u0641\u0642\u064A\u0629 \u0645\u0636\u063A\u0648\u0637\u0629) */
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-body,
                .ptw-form-equipment-body {
                    background: rgba(255, 255, 255, 0.92) !important;
                    border: 1px solid #cbd5e1 !important;
                    border-radius: 8px !important;
                    padding: 8px 10px !important;
                    box-shadow: none;
                    width: 100%;
                    box-sizing: border-box;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-notes-frame,
                .ptw-form-equipment-notes-frame {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 6px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    border-radius: 0;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-notes-frame label,
                .ptw-form-equipment-notes-frame label {
                    flex-shrink: 0;
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.68rem;
                    margin-bottom: 0;
                    white-space: nowrap;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-notes-frame textarea,
                .ptw-form-equipment-notes-frame textarea {
                    flex: 1;
                    min-height: 28px;
                    max-height: 28px;
                    height: 28px;
                    padding: 4px 8px;
                    font-size: 0.75rem;
                    line-height: 1.3;
                    resize: none;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                    background: #fff;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-fixed-wrap,
                .ptw-form-equipment-body .ptw-manual-equipment-fixed-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    width: 100%;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-chips-row,
                .ptw-form-equipment-body .ptw-manual-equipment-chips-row {
                    direction: rtl;
                    margin: 0;
                    width: 100%;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-grid-row,
                .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                    display: grid;
                    grid-template-columns: repeat(9, minmax(0, 1fr));
                    gap: 4px 5px;
                    align-items: stretch;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-history-row,
                .ptw-form-equipment-body .ptw-manual-equipment-history-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 4px 5px;
                    padding-top: 6px;
                    margin-top: 2px;
                    border-top: 1px dashed #e2e8f0;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-cell,
                .ptw-form-equipment-body .ptw-manual-equipment-cell {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: #475569 !important;
                    cursor: pointer;
                    direction: rtl;
                    line-height: 1.25;
                    text-align: center;
                    padding: 5px 4px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    background: #f8fafc;
                    min-height: 28px;
                    min-width: 0;
                    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
                    user-select: none;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-label,
                .ptw-form-equipment-body .ptw-manual-equipment-label {
                    display: block;
                    width: 100%;
                    min-width: 0;
                    word-break: break-word;
                    line-height: 1.25;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-cell:hover,
                .ptw-form-equipment-body .ptw-manual-equipment-cell:hover {
                    border-color: #94a3b8;
                    background: #fff;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-cell:has(input:checked),
                .ptw-form-equipment-body .ptw-manual-equipment-cell:has(input:checked) {
                    border-color: #3b82f6;
                    background: #eff6ff;
                    color: #1d4ed8 !important;
                    font-weight: 600;
                    box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.25);
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-history-cell,
                .ptw-form-equipment-body .ptw-manual-equipment-history-cell {
                    display: inline-flex;
                    border-style: dashed;
                    background: #fafafa;
                    padding: 4px 8px;
                    min-height: 26px;
                    white-space: nowrap;
                }
                .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-cell input[type="checkbox"],
                .ptw-form-equipment-body .ptw-manual-equipment-cell input[type="checkbox"] {
                    position: absolute !important;
                    opacity: 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    min-width: 0 !important;
                    min-height: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    pointer-events: none;
                }
                .ptw-manual-permit-modal .manual-section-1 .manual-equipment-field-wrap > label,
                .ptw-section-1 .ptw-equipment-field-wrap > label {
                    margin-bottom: 0.35rem;
                }
                @media (max-width: 1200px) {
                    .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-grid-row,
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                    }
                }
                @media (max-width: 900px) {
                    .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-grid-row,
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                @media (max-width: 640px) {
                    .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-grid-row,
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                    .ptw-manual-permit-modal .manual-section-1 .ptw-manual-equipment-notes-frame,
                    .ptw-form-equipment-notes-frame {
                        flex-wrap: wrap;
                    }
                }

                /* \u0623\u0646\u0645\u0627\u0637 \u0623\u0632\u0631\u0627\u0631 \u062D\u0627\u0644\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A */
                .manual-status-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 2px solid #cbd5e1;
                    background: #ffffff;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    position: relative;
                    overflow: hidden;
                    font-weight: 700;
                    font-size: 0.95rem;
                }
                .manual-status-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 12px -3px rgba(0, 0, 0, 0.1);
                }
                .manual-status-btn input[type="radio"] {
                    display: none !important;
                }
                .manual-status-btn i {
                    font-size: 1.25rem;
                    transition: all 0.2s ease;
                }
                .manual-status-btn.btn-completed:hover { border-color: #10b981; background: #f0fdf4; }
                .manual-status-btn.btn-incomplete:hover { border-color: #f59e0b; background: #fffbeb; }
                .manual-status-btn.btn-forced:hover { border-color: #ef4444; background: #fef2f2; }
            </style>
            <div class="modal-content ptw-manual-permit-modal" style="max-width: min(1720px, 99vw); width: 99%; max-height: 95vh; overflow-y: auto; padding: 0; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-file-signature" style="font-size: 1.5rem;"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: white;">
                                ${a?t("module.ptw.form.editManual","\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A"):t("module.ptw.form.newManual","\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A")}
                            </h2>
                            <p style="font-size: 0.875rem; opacity: 0.8; margin: 4px 0 0 0;">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u062A\u0633\u062C\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u0645\u0628\u0627\u0634\u0631 \u0628\u062F\u0648\u0646 \u062F\u0648\u0631\u0629 \u0645\u0648\u0627\u0641\u0642\u0627\u062A
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button type="button" class="ptw-manual-permit-fullscreen-btn" title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629" onclick="PTW.toggleManualPermitFormFullscreen(this)" style="color: white; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; cursor: pointer; padding: 0.5rem 0.75rem; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fas fa-expand"></i> <span class="ptw-manual-permit-fullscreen-label">\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span></button>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem; background: rgba(255,255,255,0.1); border: none; width: 44px; height: 44px; border-radius: 10px; cursor: pointer; transition: all 0.3s;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                ${this.renderPermitSystemHeader()}

                <!-- \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646/\u0627\u0644\u062A\u0646\u0628\u064A\u0647 - \u0645\u0634\u0627\u0628\u0647 \u0644\u0646\u0645\u0648\u0630\u062C \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 -->
                <div style="margin: 24px 24px 0 24px; padding: 0;">
                    <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #e1bee7 100%); border-right: 4px solid #2196F3; border-left: 4px solid #2196F3; border-radius: 12px 12px 0 0; padding: 20px; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #2196F3, #673ab7, #2196F3);"></div>
                        <div style="text-align: center; padding: 12px; background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%); border-radius: 8px; border: 2px solid #bbdefb;">
                            <p style="margin: 0; font-size: 15px; line-height: 2.2; color: #1e3a5f; font-weight: 500; letter-spacing: 0.3px;">
                                \u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647<br>
                                \u0648\u0644\u0627 \u064A\u062C\u0648\u0632 \u0628\u0623\u064A \u062D\u0627\u0644 \u0645\u0646 \u0627\u0644\u0623\u062D\u0648\u0627\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0644\u0623\u064A \u0639\u0645\u0644 \u0622\u062E\u0631 \u0644\u0645 \u064A\u062A\u0645 \u0648\u0635\u0641\u0647<br>
                                \u0648\u0639\u0644\u064A\u0647 \u0641\u0625\u0646\u0647 \u064A\u062C\u0628 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0645\u062F\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0648\u0641\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0644\u0639\u0645\u0644 \u0641\u064A\u0647 \u0641\u0642\u0637.
                            </p>
                        </div>
                        <div style="margin-top: 12px; padding: 10px 16px; background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border: 2px solid #ffc107; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <i class="fas fa-hand-paper" style="color: #f57c00; font-size: 1.2rem;"></i>
                                <span style="color: #e65100; font-weight: 600; font-size: 0.9rem;">\u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A - \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u062F\u0648\u0646 \u062F\u0648\u0631\u0629 \u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629</span>
                            </div>
                        </div>
                        <!-- \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644 \u0644\u0644\u062A\u0635\u0631\u064A\u062D -->
                        <div style="margin-top: 12px; display: flex; justify-content: center; flex-direction: column; align-items: center; gap: 12px;">
                            <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 12px 32px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px; box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);">
                                <i class="fas fa-hashtag" style="font-size: 1.3rem; opacity: 0.9;"></i>
                                <div style="text-align: center;">
                                    <span style="font-size: 0.75rem; opacity: 0.85; display: block;">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D / Permit No.</span>
                                    <span id="manual-permit-display-number" style="font-size: 1.5rem; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${String(p).padStart(4,"0")}</span>
                                </div>
                            </div>
                            <!-- \u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A -->
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                                <label for="manual-paper-permit-number" style="font-size: 0.8rem; font-weight: 600; color: #1e3a5f;">
                                    \u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A <span style="color: #e53e3e; font-size: 0.9rem;">*</span>
                                </label>
                                <input type="number" id="manual-paper-permit-number" min="1" step="1" placeholder="\u0645\u0637\u0644\u0648\u0628 - \u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645"
                                    value="${Utils.escapeHTML(i?.paperPermitNumber??"")}"
                                    style="width: 150px; text-align: center; font-size: 1.1rem; font-weight: 600; font-family: 'Courier New', monospace; padding: 8px 12px; border: 2px solid ${i?.paperPermitNumber?"#90caf9":"#e53e3e"}; border-radius: 8px; background: #fff; box-shadow: ${i?.paperPermitNumber?"none":"0 0 0 3px rgba(229,62,62,0.1)"};">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- \u0627\u0644\u062A\u062B\u0628\u064A\u062A \u064A\u0628\u062F\u0623 \u0645\u0646 \u0623\u0633\u0641\u0644 \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 (\u0628\u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062A\u0635\u0645\u064A\u0645) -->
                <div class="ptw-manual-permit-sticky-start">
                <div class="modal-body" id="manual-permit-modal-body" style="padding: 24px; padding-top: 0; max-height: calc(95vh - 280px); overflow-y: scroll; background: #f8fafc; direction: ltr;">
                    <form id="manual-permit-form" style="direction: rtl;">
                        <datalist id="manual-team-member-names-datalist">${K}</datalist>
                        <datalist id="manual-approval-datalist-requestingParty">${C}</datalist>
                        <datalist id="manual-approval-datalist-areaManager">${b}</datalist>
                        <datalist id="manual-approval-datalist-maintenanceEngineer">${V}</datalist>
                        
                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="ptw-manual-form-section manual-section-1" style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
                            <h3><i class="fas fa-info-circle"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span></h3>
                            <div class="ptw-s1-layout">
                                <div class="ptw-s1-row ptw-s1-meta-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645 <span class="text-red-500">*</span></label>
                                    <select id="manual-permit-location" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</option>
                                        ${r.map(h=>{let M=i&&(i.locationId===h.id||i.location&&(i.location.split(" - ")[0]===h.name||i.location===h.name));return`<option value="${Utils.escapeHTML(h.id)}" data-site-name="${Utils.escapeHTML(h.name)}" ${M?"selected":""}>${Utils.escapeHTML(h.name)}</option>`}).join("")}
                                    </select>
                                </div>
                                <div id="manual-permit-sublocation-wrapper" style="display: ${i?.locationId||i?.location?"block":"none"};">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="manual-permit-sublocation" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                    </select>
                                    <input type="hidden" id="manual-permit-location-entries" value="${Utils.escapeHTML(JSON.stringify(i?.locationEntries||[]))}">
                                    <div id="manual-selected-sublocations-container" style="display: none; margin-top: 10px;">
                                        <input type="text" id="manual-selected-sublocations-display" class="form-input transition-all focus:ring-2 focus:ring-blue-200" readonly placeholder="\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0645\u062E\u062A\u0627\u0631\u0629">
                                        <div id="manual-selected-sublocations-list" class="flex flex-wrap gap-2 mt-2"></div>
                                        <div class="text-xs text-gray-500 mt-2">\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 3 \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0643\u062D\u062F \u0623\u0642\u0635\u0649</div>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="manual-permit-time-from" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required
                                        value="${i?.timeFrom&&i.timeFrom!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.toDateTimeLocalString(i.timeFrom):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="manual-permit-time-to" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required
                                        value="${i?.timeTo&&i.timeTo!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.toDateTimeLocalString(i.timeTo):""}">
                                </div>
                                </div>
                                <div class="ptw-s1-row ptw-s1-parties-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</label>
                                    <div class="relative">
                                        <input type="text" id="manual-permit-authorized-party" class="form-input transition-all focus:ring-2 focus:ring-blue-200 w-full"
                                            ${c?'list="manual-authorized-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(u)}"
                                            placeholder="${c?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644"}">
                                        ${c?`
                                        <datalist id="manual-authorized-party-datalist">
                                            ${d.map(h=>`<option value="${Utils.escapeHTML(h.name||"")}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    <div class="relative">
                                        <input type="text" id="manual-permit-requesting-party" class="form-input transition-all focus:ring-2 focus:ring-blue-200 w-full"
                                            ${f?'list="manual-requesting-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(y)}"
                                            placeholder="${f?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)"}">
                                        ${f?`
                                        <datalist id="manual-requesting-party-datalist">
                                            ${m.map(h=>`<option value="${Utils.escapeHTML(h)}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment manual-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="manual-equipment-matrix" class="ptw-manual-equipment-body">
                                        ${w}
                                    </div>
                                    <div class="ptw-manual-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="manual-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${Utils.escapeHTML(P.manualNotes||"")}</textarea>
                                    </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-tools">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</label>
                                    <textarea id="manual-permit-tools" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F">${Utils.escapeHTML(i?.tools||i?.toolsList||"")}</textarea>
                                </div>
                                <div class="ptw-s1-block ptw-s1-work-desc">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 <span class="text-red-500">*</span></label>
                                    <textarea id="manual-permit-work-description" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="3" required placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0639\u0645\u0644">${Utils.escapeHTML(i?.workDescription||"")}</textarea>
                                </div>
                            </div>
                            <input type="hidden" id="manual-permit-sequential" value="${p}">
                            <input type="hidden" id="manual-permit-date" value="${i?.openDate?new Date(i.openDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                            <input type="hidden" id="manual-permit-total-time" value="${Utils.escapeHTML(i?.totalTime||"")}">
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A: \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644 (\u062C\u062F\u0648\u0644 \u0643\u0645\u0627 \u0628\u0627\u0644\u0635\u0648\u0631\u0629) -->
                        <div class="ptw-manual-form-section manual-section-2">
                            <h3><i class="fas fa-users"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</span></h3>
                            
                            <div class="overflow-x-auto bg-white">
                                <table class="w-full ptw-paper-grid-table" style="border-collapse: collapse; border: 1px solid #000;">
                                    <thead>
                                        <tr style="background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%);">
                                            <th class="p-3 text-center font-bold text-gray-900 border border-gray-800" style="width: 50%;">\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</th>
                                            <th class="p-3 text-center font-bold text-gray-900 border border-gray-800" style="width: 50%; border-right: 4px solid #1e3a8a;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                        </tr>
                                    </thead>
                                    <tbody id="manual-team-members-list">
                                        ${(i?.teamMembers&&i.teamMembers.length?i.teamMembers:[{name:"",signature:""}]).map(M=>`
                                        <tr class="manual-team-member-row">
                                            <td class="p-2 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-team-member-name border-0 focus:ring-0" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML(M.name||"")}"></td>
                                            <td class="p-2 border border-gray-800" style="border-right: 4px solid #1e3a8a;"><input type="text" class="form-input text-sm w-full manual-team-member-signature border-0 focus:ring-0" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML(M.signature||M.id||"")}"></td>
                                        </tr>
                                    `).join("")}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" id="manual-add-team-member-btn" class="btn-secondary mt-4 hover:bg-teal-50 text-teal-700 border-teal-200">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0635\u0641 \u0644\u0644\u0623\u0633\u0641\u0644
                            </button>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B: \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639/\u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 (\u062D\u0633\u0628 \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0646\u0635) -->
                        <div class="ptw-manual-form-section manual-section-3" style="overflow: hidden;">
                            <div class="manual-section-3-header" style="background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 50%, #4fc3f7 100%); margin: -24px -24px 0 -24px; padding: 16px 24px; text-align: center; border-bottom: 2px solid #0288d1; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; gap: 10px;">
                                    <i class="fas fa-clipboard-check"></i>
                                    <span>\u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0648\u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</span>
                                </h3>
                            </div>
                            <div class="manual-section-3-content" style="border: 1px solid #90a4ae;">
                                <p class="text-sm text-gray-600 mb-4 p-2"><strong>\u062E\u0637\u0648\u062A\u0627\u0646:</strong> \u0661) \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u2190 \u0662) \u062D\u062F\u062F \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0648 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u0644\u0648\u062D\u0629 \u0628\u062C\u0627\u0646\u0628\u0647\u0627. \u062A\u0638\u0647\u0631 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629 \u0623\u0633\u0641\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.</p>
                                <div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: nowrap; align-items: flex-start;">
                                    <!-- \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u062B\u0627\u0628\u062A\u0629 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u064A\u0645\u064A\u0646 -->
                                    <div id="manual-work-type-select-wrap">
                                        <label for="manual-work-type-select">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                        <select id="manual-work-type-select" title="\u0627\u062E\u062A\u0631 \u0646\u0648\u0639\u0627\u064B \u062B\u0645 \u062D\u062F\u062F \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0641\u064A \u0627\u0644\u0644\u0648\u062D\u0629">
                                            <option value="">\u2014 \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u2014</option>
                                            <option value="hot">\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629</option>
                                            <option value="confined">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</option>
                                            <option value="height">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</option>
                                            <option value="excavation">\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</option>
                                            <option value="electrical">\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621</option>
                                            <option value="cold">\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</option>
                                            <option value="other">\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</option>
                                        </select>
                                        <div id="manual-work-type-selected-list" class="manual-selected-types-list" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #e9d5ff;">
                                            <div class="manual-selected-types-title" style="font-size: 0.8rem; font-weight: 600; color: #6b21a8; margin-bottom: 8px;">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629</div>
                                            <div id="manual-work-type-selected-chips" style="display: flex; flex-wrap: wrap; gap: 6px; min-height: 24px;"></div>
                                            <div id="manual-work-type-selected-empty" class="manual-selected-types-empty">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u064A \u0646\u0648\u0639 \u0628\u0639\u062F</div>
                                            <div id="manual-work-type-selected-hint" class="manual-selected-types-hint" style="display: none;">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0646\u0648\u0639 \u0644\u062A\u062D\u0631\u064A\u0631 \u062A\u0641\u0627\u0635\u064A\u0644\u0647</div>
                                        </div>
                                    </div>
                                    <!-- \u0644\u0648\u062D\u0629 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A (\u062A\u0641\u062A\u062D \u0628\u0627\u0644\u0639\u0631\u0636 \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631) -->
                                    <div id="manual-work-type-panel" class="manual-work-type-inline-panel">
                                        <div id="manual-work-type-panel-placeholder">
                                            <i class="fas fa-arrow-right" style="font-size: 1.75rem; margin-bottom: 10px; display: block; opacity: 0.7;"></i>
                                            <span>\u0627\u062E\u062A\u0631 \u0646\u0648\u0639\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2190 \u062B\u0645 \u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A \u0623\u0648 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0647\u0646\u0627</span>
                                        </div>
                                        <div id="manual-work-type-panel-body" style="display: none;">
                                            <div class="manual-panel-title-row">
                                                <h4 id="manual-work-type-panel-title"></h4>
                                                <span id="manual-work-type-panel-badge" class="manual-panel-type-badge" style="display: none;">\u0645\u0636\u0627\u0641</span>
                                            </div>
                                            <div id="manual-panel-hot" class="manual-type-panel-body" style="display: none;">
                                                ${["\u0644\u062D\u0627\u0645","\u0642\u0637\u0639","\u0634\u0631\u0631/\u062D\u0631\u0627\u0631\u0629","\u0623\u062E\u0631\u0649"].map(h=>`
                                                <label class="manual-opt-row" style="background: #fef2f2; border-color: #fecaca;"><input type="checkbox" name="manual-hot-work" value="${h}" class="form-checkbox text-red-600" ${(i?.hotWorkDetails||[]).includes(h)?"checked":""}><span>${h}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-hot-work-other" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.hotWorkOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-confined" class="manual-type-panel-body" style="display: none;">
                                                ${["\u062E\u0632\u0627\u0646\u0627\u062A","\u0623\u0646\u0627\u0628\u064A\u0628","\u0645\u062C\u0627\u0631\u064A","\u0623\u062E\u0631\u0649"].map(h=>`
                                                <label class="manual-opt-row" style="background: #f9fafb; border-color: #e5e7eb;"><input type="checkbox" name="manual-confined-space" value="${h}" class="form-checkbox text-gray-600" ${(i?.confinedSpaceDetails||[]).includes(h)?"checked":""}><span>${h}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-confined-space-other" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.confinedSpaceOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-height" class="manual-type-panel-body" style="display: none;">
                                                ${["\u0633\u0642\u0627\u0644\u0627\u062A","\u0633\u0637\u062D","\u0633\u0644\u0629 \u0631\u0627\u0641\u0639\u0629","\u0623\u062E\u0631\u0649"].map(h=>`
                                                <label class="manual-opt-row" style="background: #eff6ff; border-color: #bfdbfe;"><input type="checkbox" name="manual-height-work" value="${h}" class="form-checkbox text-blue-600" ${(i?.heightWorkDetails||[]).includes(h)?"checked":""}><span>${h}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-height-work-other" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.heightWorkOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-excavation" class="manual-type-panel-body" style="display: none;">
                                                <label class="manual-opt-row" style="background: #fffbeb; border-color: #fef3c7;"><input type="checkbox" id="manual-excavation-check" class="form-checkbox text-yellow-600" ${i?.excavationLength||i?.excavationWidth||i?.excavationDepth||i?.soilType?"checked":""}><span>\u062A\u0637\u0628\u064A\u0642 \u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</span></label>
                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;">
                                                    <div><label class="manual-other-label">\u0637\u0648\u0644</label><input type="text" id="manual-excavation-length" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.excavationLength||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0639\u0631\u0636</label><input type="text" id="manual-excavation-width" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.excavationWidth||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0639\u0645\u0642</label><input type="text" id="manual-excavation-depth" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.excavationDepth||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</label><input type="text" id="manual-excavation-soil" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.soilType||"")}" placeholder="\u2014"></div>
                                                </div>
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-excavation-other" class="form-input manual-other-input" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"></div>
                                            </div>
                                            <div id="manual-panel-electrical" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-electrical-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.electricalWorkType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0631\u0643\u064A\u0628\u060C \u0635\u064A\u0627\u0646\u0629\u060C \u0641\u0643\u060C \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-cold" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-cold-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.coldWorkType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0644\u062D\u0627\u0645 \u0628\u0627\u0631\u062F\u060C \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-other" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-other-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.otherWorkType||"")}" placeholder="\u0627\u0630\u0643\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639: \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A -->
                        <div class="ptw-manual-form-section manual-section-4">
                            <h3><i class="fas fa-tasks"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</span></h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-preStartChecklist" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.preStartChecklist?"checked":""}><span class="font-medium">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-lotoApplied" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.lotoApplied?"checked":""}><span class="font-medium">\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-governmentPermits" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.governmentPermits?"checked":""}><span class="font-medium">\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-riskAssessmentAttached" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.riskAssessmentAttached?"checked":""}><span class="font-medium">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-gasTesting" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.gasTesting?"checked":""}><span class="font-medium">\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-mocRequest" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${i?.mocRequest?"checked":""}><span class="font-medium">\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)</span>
                                </label>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633: \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 -->
                        <div class="ptw-manual-form-section manual-section-5 ptw-manual-ppe-section">
                            <h3><i class="fas fa-hard-hat"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 / \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</span></h3>
                            <div class="ptw-manual-ppe-body">
                                <div id="manual-ppe-matrix">
                                    ${this.buildManualFixedPPECheckboxesHtml(g)}
                                </div>
                                <div class="ptw-manual-ppe-notes-frame">
                                    <label class="block">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A)</label>
                                    <textarea id="manual-ppe-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0625\u0636\u0627\u0641\u0627\u062A \u0646\u0635\u064A\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629...">${Utils.escapeHTML(i?.ppeNotes||(i?.requiredPPE?i.requiredPPE.join("\u060C "):""))}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633: \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 -->
                        <div class="ptw-manual-form-section manual-section-6">
                            <h3><i class="fas fa-exclamation-triangle"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633 : \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</span></h3>
                            <p class="text-sm text-gray-600 mb-4 bg-white p-2 rounded border border-gray-100 inline-block">
                                <i class="fas fa-mouse-pointer text-red-500 ml-1"></i>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u062E\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 \u0644\u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                            </p>
                            
                            <!-- \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 (\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0644\u0648\u0646\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A) -->
                            <div class="bg-white rounded-lg p-4 border border-gray-200">
                                <div class="overflow-x-auto">
                                    <table class="w-full border-collapse text-center" id="manual-risk-matrix-table">
                                        <thead>
                                            <tr>
                                                <th class="p-2 bg-gray-100 border border-gray-400 font-bold text-sm" rowspan="2">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629</th>
                                                <th class="p-2 text-white border border-gray-400 font-bold" colspan="5" style="background: #374151;">\u0627\u0644\u062E\u0637\u0648\u0631\u0629 (\u0627\u0644\u0639\u0648\u0627\u0642\u0628)</th>
                                            </tr>
                                            <tr>
                                                <th class="p-2 border border-gray-400 text-xs font-semibold" style="background: #dcfce7; color: #166534;">1 - \u0637\u0641\u064A\u0641</th>
                                                <th class="p-2 border border-gray-400 text-xs font-semibold" style="background: #fef9c3; color: #854d0e;">2 - \u0628\u0633\u064A\u0637</th>
                                                <th class="p-2 border border-gray-400 text-xs font-semibold" style="background: #ffedd5; color: #9a3412;">3 - \u0645\u062A\u0648\u0633\u0637</th>
                                                <th class="p-2 border border-gray-400 text-xs font-semibold" style="background: #fed7aa; color: #c2410c;">4 - \u062E\u0637\u064A\u0631</th>
                                                <th class="p-2 border border-gray-400 text-xs font-semibold text-white" style="background: #b91c1c;">5 - \u0643\u0627\u0631\u062B\u064A</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${[5,4,3,2,1].map(h=>`<tr>
                                                <td class="p-2 bg-gray-100 border border-gray-400 font-semibold text-sm">${h} - ${{5:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F",4:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B",3:"\u0645\u062D\u062A\u0645\u0644",2:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644",1:"\u0646\u0627\u062F\u0631"}[h]}</td>
                                                ${[1,2,3,4,5].map(q=>{const G=h*q;let Z="",Q="",j="",oe="";return G<=4?(Z="#22c55e",Q="#ffffff",j="#16a34a",oe="\u0645\u0646\u062E\u0641\u0636"):G<=9?(Z="#eab308",Q="#1c1917",j="#ca8a04",oe="\u0645\u062A\u0648\u0633\u0637"):G<=16?(Z="#f97316",Q="#ffffff",j="#ea580c",oe="\u0645\u0631\u062A\u0641\u0639"):(Z="#dc2626",Q="#ffffff",j="#b91c1c",oe="\u062D\u0631\u062C"),`<td class="p-0 border border-gray-400">
                                                    <button type="button" class="manual-risk-cell w-full h-full p-3 font-bold cursor-pointer transition-all border-0 ${i?.riskLikelihood==h&&i?.riskConsequence==q?"ring-4 ring-blue-600 ring-inset":""}" data-likelihood="${h}" data-consequence="${q}" data-score="${G}" data-level="${oe}" data-bg="${Z}" data-text="${Q}" data-hover="${j}" style="background: ${Z}; color: ${Q};">
                                                        ${G}
                                                    </button>
                                                </td>`}).join("")}
                                            </tr>`).join("")}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <!-- \u0648\u0633\u064A\u0644\u0629 \u0625\u064A\u0636\u0627\u062D \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0644\u0648\u0646\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A -->
                                <div class="mt-3 flex flex-wrap gap-4 justify-center text-sm">
                                    <span class="inline-flex items-center gap-2"><span class="w-5 h-5 rounded border border-gray-400" style="background: #22c55e;"></span> \u0645\u0646\u062E\u0641\u0636 (1-4)</span>
                                    <span class="inline-flex items-center gap-2"><span class="w-5 h-5 rounded border border-gray-400" style="background: #eab308;"></span> \u0645\u062A\u0648\u0633\u0637 (5-9)</span>
                                    <span class="inline-flex items-center gap-2"><span class="w-5 h-5 rounded border border-gray-400" style="background: #f97316;"></span> \u0645\u0631\u062A\u0641\u0639 (10-16)</span>
                                    <span class="inline-flex items-center gap-2"><span class="w-5 h-5 rounded border border-gray-400" style="background: #dc2626;"></span> \u062D\u0631\u062C (17-25)</span>
                                </div>
                                
                                <!-- \u0646\u062A\u064A\u062C\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 -->
                                <div id="manual-risk-result" class="mt-4 p-4 rounded-lg border-2 ${i?.riskScore?"":"hidden"}" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
                                    <div class="flex items-center justify-between flex-wrap gap-4">
                                        <div class="flex items-center gap-3">
                                            <div id="manual-risk-result-badge" class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg" style="background: ${i?.riskScore<=4?"#22c55e":i?.riskScore<=9?"#eab308":i?.riskScore<=16?"#f97316":"#dc2626"}; color: ${i?.riskScore>4&&i?.riskScore<=9?"#1c1917":"#ffffff"};">
                                                ${i?.riskScore||"?"}
                                            </div>
                                            <div>
                                                <p class="font-bold text-gray-800 text-lg">\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631: <span id="manual-risk-score-display">${i?.riskScore||"\u2014"}</span></p>
                                                <p class="text-gray-600">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631: <span id="manual-risk-level-display" class="font-semibold">${i?.riskLevel||"\u2014"}</span></p>
                                            </div>
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            <p>\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629: <span id="manual-risk-likelihood-display" class="font-semibold">${i?.riskLikelihood||"\u2014"}</span></p>
                                            <p>\u0627\u0644\u062E\u0637\u0648\u0631\u0629: <span id="manual-risk-consequence-display" class="font-semibold">${i?.riskConsequence||"\u2014"}</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 -->
                                <input type="hidden" id="manual-risk-likelihood" value="${i?.riskLikelihood||""}">
                                <input type="hidden" id="manual-risk-consequence" value="${i?.riskConsequence||""}">
                                <input type="hidden" id="manual-risk-score" value="${i?.riskScore||""}">
                                <input type="hidden" id="manual-risk-level" value="${i?.riskLevel||""}">
                            </div>
                            
                            <div class="mt-4 bg-red-50 p-4 rounded-lg border border-red-100">
                                <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-sticky-note ml-2 text-red-500"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</label>
                                <textarea id="manual-risk-notes" class="form-input bg-white" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629...">${Utils.escapeHTML(i?.riskNotes||"")}</textarea>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639: \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A (\u0643\u0645\u0627 \u0628\u0627\u0644\u0635\u0648\u0631\u0629) -->
                        <div class="ptw-manual-form-section manual-section-7">
                            <h3><i class="fas fa-signature"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A</span></h3>
                            
                            <!-- \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0644\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644) -->
                            <div class="overflow-x-auto bg-white">
                                <table class="w-full ptw-paper-grid-table" style="border-collapse: collapse; border: 1px solid #000;">
                                    <thead>
                                        <tr>
                                            <th colspan="5" class="p-3 text-center font-bold text-white" style="background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%); border: 1px solid #0288d1;">
                                                \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0644\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644)
                                            </th>
                                        </tr>
                                        <tr style="background: #e3f2fd; border: 1px solid #000;">
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 12%;">\u0627\u0644\u0627\u0633\u0645 / \u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                                        </tr>
                                    </thead>
                                    <tbody id="manual-approvals-list">
                                        <tr class="manual-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u0627\u0633\u0645</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-name" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(h=>h.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${B}</td>
                                            <td class="p-1 border border-gray-800">${O}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${F("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(i?.manualApprovals||[]).find(h=>h.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr class="manual-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(h=>h.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(h=>h.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646: \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                        <div class="ptw-manual-form-section manual-section-8">
                            <h3><i class="fas fa-lock"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646 : \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</span></h3>
                            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6 shadow-md" style="text-align: center;">
                                <p class="text-gray-800 text-base leading-relaxed font-medium" style="line-height: 2.2; color: #1e40af;">
                                    <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                    \u062A\u0645 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644 \u062D\u062A\u0649 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0648\u062A\u0645 \u0641\u062D\u0635 \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062C\u0627\u0648\u0631\u0629 \u0644\u0647 \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062E\u0644\u0648\u0647\u0627 \u0645\u0646 \u0627\u0644\u0623\u062E\u0637\u0627\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644 \u062D\u062F\u0648\u062B\u0647\u0627
                                    <i class="fas fa-check-circle text-green-600 mr-2"></i>
                                </p>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                ${o.map((h,M)=>{const G={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{icon:"fa-check-circle",color:"#10b981",hoverBg:"#f0fdf4",border:"#10b981",class:"btn-completed",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{icon:"fa-pause-circle",color:"#f59e0b",hoverBg:"#fffbeb",border:"#f59e0b",class:"btn-incomplete",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{icon:"fa-exclamation-circle",color:"#ef4444",hoverBg:"#fef2f2",border:"#ef4444",class:"btn-forced",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[h],Z=l===h;return`<label class="manual-status-btn ${G.class} ${Z?"selected":""}" style="${Z?`background: ${G.gradient} !important; border-color: ${G.color} !important; color: #ffffff !important; box-shadow: 0 8px 20px -4px ${G.shadow} !important;`:""}">
                                    <input type="radio" name="manual-permit-status-radio" value="${Utils.escapeHTML(h)}" class="form-radio h-5 w-5 hidden" ${Z?"checked":""} onchange="PTW.updateManualStatusBtnSelection(this);">
                                    <i class="fas ${G.icon}" style="${Z?"color: #ffffff !important;":`color: ${G.color};`}"></i>
                                    <span class="font-bold">${Utils.escapeHTML(h)}</span>
                                </label>`}).join("")}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label><input type="datetime-local" id="manual-closure-time" class="form-input" value="${i?.closureDate?Utils.toDateTimeLocalString(i.closureDate):""}"></div>
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label><input type="text" id="manual-closure-reason" class="form-input" value="${Utils.escapeHTML(i?.closureReason||"")}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"></div>
                            </div>
                            <input type="hidden" id="manual-permit-status" value="${Utils.escapeHTML(l)}">
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639: \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u0646\u0641\u0633 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 - \u0643\u0645\u0627 \u0628\u0627\u0644\u0635\u0648\u0631\u0629) -->
                        <div class="ptw-manual-form-section manual-section-9">
                            <h3><i class="fas fa-check-circle"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</span></h3>
                            
                            <!-- \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A) -->
                            <div class="overflow-x-auto bg-white">
                                <table class="w-full ptw-paper-grid-table" style="border-collapse: collapse; border: 1px solid #000;">
                                    <thead>
                                        <tr>
                                            <th colspan="5" class="p-3 text-center font-bold text-gray-900" style="background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%); border: 1px solid #0288d1;">
                                                \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D ( \u064A\u0634\u062A\u0631\u0637 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A)
                                            </th>
                                        </tr>
                                        <tr style="background: #e3f2fd; border: 1px solid #000;">
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 12%;">\u0627\u0644\u0627\u0633\u0645 / \u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                                            <th class="p-2 text-center font-semibold text-sm border border-gray-800" style="width: 22%;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</th>
                                        </tr>
                                    </thead>
                                    <tbody id="manual-closure-approvals-list">
                                        <tr class="manual-closure-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u0627\u0633\u0645</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${Y}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-closure-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${F("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}"></td>
                                        </tr>
                                        <tr class="manual-closure-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(h=>h.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0634\u0631: \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 -->
                        <div class="ptw-manual-form-section manual-section-10">
                            <h3><i class="fas fa-user-tie"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0634\u0631 : \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</span></h3>
                            <p class="text-sm text-gray-600 mb-4 bg-white p-2 rounded border border-gray-100 inline-block">
                                <i class="fas fa-info-circle text-indigo-500 ml-1"></i>\u0623\u062F\u062E\u0644 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646 \u0639\u0646 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-user-tie ml-2 text-indigo-600"></i>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644</label>
                                    <select id="manual-permit-supervisor1" ${_}>
                                        ${F("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644",i?.supervisor1)}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-user-tie ml-2 text-indigo-600"></i>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</label>
                                    <select id="manual-permit-supervisor2" ${_}>
                                        ${F("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A",i?.supervisor2)}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                <div class="pt-6 border-t-2 border-gray-200" style="padding: 20px 24px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                    <button type="button" class="btn-secondary" data-action="close" style="padding: 14px 32px; font-weight: 600; border-radius: 10px;">
                        <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" class="btn-secondary" id="manual-permit-print-btn" style="padding: 14px 32px; font-weight: 600; border-radius: 10px;">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="submit" form="manual-permit-form" class="btn-primary" style="padding: 14px 40px; font-weight: 600; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 10px; box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);">
                        <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                    </button>
                </div>
                </div>
            </div>
        `,document.body.appendChild(I);const z=()=>I.remove();I.querySelector(".modal-close")?.addEventListener("click",z),I.querySelector('[data-action="close"]')?.addEventListener("click",z),I.addEventListener("click",h=>{h.target===I&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&z()});const J=I.querySelector("#manual-paper-permit-number");J&&J.addEventListener("input",()=>{J.style.border="2px solid #90caf9",J.style.boxShadow="none"});const le=I.querySelector("#manual-permit-time-from"),re=I.querySelector("#manual-permit-time-to"),ae=I.querySelector("#manual-permit-total-time"),ce=()=>{const h=le.value,M=re.value;if(!h||!M){ae.value="";return}ae.value=this.calculateTotalTime(h,M)};le?.addEventListener("change",ce),re?.addEventListener("change",ce),i?.timeFrom&&i?.timeTo&&ce();const te=I.querySelector("#manual-permit-location"),ne=I.querySelector("#manual-permit-sublocation-wrapper"),ie=I.querySelector("#manual-permit-sublocation"),xe=I.querySelector("#manual-permit-location-entries"),be=I.querySelector("#manual-selected-sublocations-container"),R=I.querySelector("#manual-selected-sublocations-display"),ue=I.querySelector("#manual-selected-sublocations-list"),ve=3,pe=[],ke=h=>({locationId:String(h?.locationId||"").trim(),location:String(h?.location||"").trim(),sublocationId:String(h?.sublocationId||"").trim(),sublocation:String(h?.sublocation||"").trim()}),he=()=>{xe&&(xe.value=JSON.stringify(pe))},ye=()=>{if(!be||!R||!ue)return;const h=pe.map(q=>q.sublocation||q.location).filter(Boolean),M=h.length>0;be.style.display=M?"block":"none",R.value=M?h.join("\u060C "):"",ue.innerHTML=pe.map((q,G)=>`
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                    ${Utils.escapeHTML(q.sublocation||q.location)}
                    <button type="button" class="manual-remove-sublocation-btn text-blue-700 hover:text-red-600" data-index="${G}" style="background:none;border:none;cursor:pointer;font-size:14px;line-height:1;">\xD7</button>
                </span>
            `).join(""),ue.querySelectorAll(".manual-remove-sublocation-btn").forEach(q=>{q.addEventListener("click",()=>{const G=Number(q.getAttribute("data-index"));Number.isInteger(G)&&G>=0&&(pe.splice(G,1),he(),ye())})})},Se=h=>{if(!ie||!ne)return;if(!h){ne.style.display="none",ie.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}const M=this.getPlaceOptions(h);if(!Array.isArray(M)||M.length===0){ne.style.display="none",ie.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}ne.style.display="block",ie.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+M.map(q=>`
                <option value="${Utils.escapeHTML(q.id)}" data-place-name="${Utils.escapeHTML(q.name)}">${Utils.escapeHTML(q.name)}</option>
            `).join(""),ie.value=""},Ie=()=>{if(!te||!ie)return;const h=String(te.value||"").trim(),M=te.options[te.selectedIndex]?.getAttribute("data-site-name")||te.options[te.selectedIndex]?.textContent||"",q=String(ie.value||"").trim(),G=ie.options[ie.selectedIndex],Z=G?.getAttribute("data-place-name")||(G?.value?G.textContent:"")||"";if(!h||!M||!q||!Z)return;if(pe.some(j=>j.locationId===h&&j.sublocationId===q)){Notification.warning(this._t("module.ptw.notify.sublocDup","\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A \u0628\u0627\u0644\u0641\u0639\u0644")),ie.value="";return}if(pe.length>=ve){Notification.warning(this._t("module.ptw.notify.sublocMax3","\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 3 \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0641\u0642\u0637 \u0643\u062D\u062F \u0623\u0642\u0635\u0649")),ie.value="";return}pe.push(ke({locationId:h,location:M.trim(),sublocationId:q,sublocation:Z.trim()})),he(),ye(),ie.value=""},Ee=()=>{let h=[];if(xe?.value)try{const M=JSON.parse(xe.value);Array.isArray(M)&&(h=M)}catch{h=[]}if((!h||h.length===0)&&(i?.location||i?.sublocation)){const M=String(i?.locationId||te?.value||"").trim(),q=String(te?.options[te?.selectedIndex]?.getAttribute("data-site-name")||"").trim(),G=String(i?.location||"").split("|").map(j=>j.trim()).filter(Boolean),Z=String(i?.sublocationId||"").split("|").map(j=>j.trim()).filter(Boolean),Q=String(i?.sublocation||"").split("|").map(j=>j.trim()).filter(Boolean);Q.length>0?h=Q.map((j,oe)=>({locationId:M,location:q||G[0]?.split(" - ")[0]||i?.location||"",sublocationId:Z[oe]||"",sublocation:j})):h=G.map((j,oe)=>{const ge=j.indexOf(" - ");return ge===-1?{locationId:M,location:j,sublocationId:Z[oe]||"",sublocation:""}:{locationId:M,location:j.slice(0,ge).trim(),sublocationId:Z[oe]||"",sublocation:j.slice(ge+3).trim()}})}h.map(ke).filter(M=>M.location&&M.sublocation).slice(0,ve).forEach(M=>pe.push(M)),he(),ye()};te?.addEventListener("change",()=>{pe.length=0,he(),ye(),Se(te.value)}),ie?.addEventListener("change",Ie),Se(te?.value),Ee(),this.setupManualEquipmentToolsSync(I);const A=(h,M)=>{if(!h||!M)return;const q=()=>{const G=String(h.value||"").trim(),Z=String(M.value||"").trim(),Q=h.dataset.autoCopiedValue||"";h.dataset.knownLoaded!=="1"&&(!Z||Z===Q)&&(M.value=G,h.dataset.autoCopiedValue=G)};q(),h.addEventListener("input",q)},X=(h,M,q)=>{const G=I.querySelector(h);if(!G)return;const Z=new Set(["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"]),Q=j=>{const oe=j?.dataset.role;if(!oe)return;const ge=G.querySelector(`${q}[data-role="${oe}"]`);A(j,ge)};G.querySelectorAll(M).forEach(j=>{if(j.matches(".ia-approval-select")||j.tagName==="SELECT"){Q(j);return}Z.has(j.dataset?.role)||Q(j)}),G.addEventListener("input",j=>{const oe=j.target?.dataset?.role;j.target.matches(M)&&(j.target.matches(".ia-approval-select")||Z.has(oe)||Q(j.target))}),G.addEventListener("change",j=>{(j.target.matches(M)||j.target.matches(".ia-approval-select"))&&Q(j.target)})};this._setupIaRolePickerListeners(I),this.setupManualPermitKnownLookups(I,v,E),X("#manual-approvals-list",".manual-approval-name, .ia-approval-select",".manual-approval-sig"),X("#manual-closure-approvals-list",".manual-closure-approval-name, .ia-approval-select",".manual-closure-approval-sig");const se=I.querySelector("#manual-work-type-panel"),de=I.querySelector("#manual-work-type-panel-placeholder"),me=I.querySelector("#manual-work-type-panel-body"),De=I.querySelector("#manual-work-type-panel-title"),fe=I.querySelector("#manual-work-type-select"),Le=I.querySelector("#manual-work-type-selected-chips"),Oe={hot:"manual-panel-hot",confined:"manual-panel-confined",height:"manual-panel-height",excavation:"manual-panel-excavation",electrical:"manual-panel-electrical",cold:"manual-panel-cold",other:"manual-panel-other"},Me={hot:"\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",confined:"\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",height:"\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",excavation:"\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631",electrical:"\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621",cold:"\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F",other:"\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"},we=[],Ce=I.querySelector("#manual-work-type-selected-empty"),qe=I.querySelector("#manual-work-type-selected-hint"),Ae=I.querySelector("#manual-work-type-panel-badge"),$e=()=>{if(!Ae||!fe)return;const h=we.some(M=>M.typeKey===fe.value);Ae.style.display=fe.value&&h?"inline-block":"none"},Ne=()=>{if(!Le)return;const h=we.length>0;Ce&&(Ce.style.display=h?"none":"block"),qe&&(qe.style.display=h?"block":"none"),Le.innerHTML=we.map(({typeKey:M,label:q})=>`<span class="manual-selected-type-chip" data-type="${M}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u062D\u0631\u064A\u0631 \u062A\u0641\u0627\u0635\u064A\u0644: ${q}" role="button" tabindex="0" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; background: #ede9fe; color: #5b21b6; font-size: 0.8rem; font-weight: 500;">${q}</span>`).join(""),Le.querySelectorAll(".manual-selected-type-chip").forEach(M=>{M.addEventListener("click",function(){const q=this.getAttribute("data-type");q&&fe&&(fe.value=q,fe.dispatchEvent(new Event("change")),$e())}),M.addEventListener("keydown",function(q){(q.key==="Enter"||q.key===" ")&&(q.preventDefault(),this.click())})}),$e()},Ue=()=>{const h=fe?.value,M=h?Me[h]||h:"";!h||!M||we.some(q=>q.typeKey===h)||(we.push({typeKey:h,label:M}),Ne(),$e())};if(fe&&se&&me&&(fe.addEventListener("change",function(){const h=this.value,M=Me[h]||h;if(!h){de&&(de.style.display="block"),me.style.display="none",Ae&&(Ae.style.display="none");return}de&&(de.style.display="none"),me.style.display="block",(se.querySelectorAll(".manual-type-panel-body")||[]).forEach(G=>{G.style.display="none"});const q=I.querySelector("#"+(Oe[h]||""));q&&(q.style.display="block",De&&(De.textContent=M)),$e()}),me.addEventListener("change",function(h){h.target.matches('input[type="checkbox"], input[type="text"], input[type="number"]')&&Ue()}),me.addEventListener("input",function(h){h.target.matches('input[type="text"], input[type="number"]')&&Ue()})),i){const h=(M,q)=>{M&&!we.some(G=>G.typeKey===q)&&we.push({typeKey:q,label:Me[q]})};h(i.hotWorkDetails&&i.hotWorkDetails.length||i.hotWorkOther,"hot"),h(i.confinedSpaceDetails&&i.confinedSpaceDetails.length||i.confinedSpaceOther,"confined"),h(i.heightWorkDetails&&i.heightWorkDetails.length||i.heightWorkOther,"height"),h(i.excavationLength||i.excavationWidth||i.excavationDepth||i.soilType,"excavation"),h(i.electricalWorkType,"electrical"),h(i.coldWorkType,"cold"),h(i.otherWorkType,"other")}Ne();const Be=I.querySelectorAll('input[name="manual-permit-status-radio"]'),Ke=I.querySelector("#manual-permit-status");i?.status?Be.forEach(h=>{h.value===i.status&&(h.checked=!0,PTW.updateManualStatusBtnSelection(h))}):Be.forEach(h=>{h.value==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&(h.checked=!0,PTW.updateManualStatusBtnSelection(h))}),I.querySelector("#manual-add-team-member-btn")?.addEventListener("click",()=>{const h=I.querySelector("#manual-team-members-list");if(!h)return;const M=document.createElement("tr");M.className="manual-team-member-row",M.innerHTML=`
                <td class="p-2 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-team-member-name border-0 focus:ring-0" list="manual-team-member-names-datalist" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value=""></td>
                <td class="p-2 border border-gray-800" style="border-right: 4px solid #1e3a8a;"><input type="text" class="form-input text-sm w-full manual-team-member-signature border-0 focus:ring-0" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value=""></td>
            `,h.appendChild(M),typeof I._attachManualTeamRowLookup=="function"&&I._attachManualTeamRowLookup(M)}),I.querySelectorAll(".manual-risk-cell").forEach(h=>{h.addEventListener("click",()=>{const M=h.dataset.likelihood,q=h.dataset.consequence,G=h.dataset.score,Z=h.dataset.level,Q=h.dataset.bg||"#22c55e",j=h.dataset.text||"#ffffff";I.querySelectorAll(".manual-risk-cell").forEach(He=>{He.classList.remove("ring-4","ring-blue-500","ring-blue-600","ring-inset")}),h.classList.add("ring-4","ring-blue-600","ring-inset"),I.querySelector("#manual-risk-likelihood").value=M,I.querySelector("#manual-risk-consequence").value=q,I.querySelector("#manual-risk-score").value=G,I.querySelector("#manual-risk-level").value=Z;const oe=I.querySelector("#manual-risk-result");oe&&oe.classList.remove("hidden");const ge=I.querySelector("#manual-risk-score-display"),Re=I.querySelector("#manual-risk-level-display"),We=I.querySelector("#manual-risk-likelihood-display"),Fe=I.querySelector("#manual-risk-consequence-display");ge&&(ge.textContent=G),Re&&(Re.textContent=Z),We&&(We.textContent=M),Fe&&(Fe.textContent=q);const Pe=I.querySelector("#manual-risk-result-badge");Pe&&(Pe.style.background=Q,Pe.style.color=j,Pe.textContent=G);const Te=I.querySelector("#manual-risk-notes");if(Te){const ze=`\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A: \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631 ${Z} (\u062F\u0631\u062C\u0629 ${G}) \u2014 \u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 ${M} \xD7 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 ${q}. ${{\u0645\u0646\u062E\u0641\u0636:"\u064A\u0645\u0643\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062F\u0648\u0631\u064A\u0629.",\u0645\u062A\u0648\u0633\u0637:"\u064A\u0644\u0632\u0645 \u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0642\u0628\u0644 \u0648\u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.",\u0645\u0631\u062A\u0641\u0639:"\u0644\u0627 \u064A\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 \u0642\u0628\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0636\u0648\u0627\u0628\u0637 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0634\u0631\u0627\u0641\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629.",\u062D\u0631\u062C:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u0648\u0631\u0627\u064B \u062D\u062A\u0649 \u0625\u0632\u0627\u0644\u0629/\u062E\u0641\u0636 \u0627\u0644\u062E\u0637\u0631 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u062E\u0637\u0629 \u062A\u062D\u0643\u0645 \u0645\u0634\u062F\u062F\u0629."}[Z]||""}`.trim(),_e=String(Te.value||"").trim(),je=String(Te.dataset.autoRiskText||"").trim();(!_e||_e===je||_e.startsWith("\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A:"))&&(Te.value=ze,Te.dataset.autoRiskText=ze)}})}),I.querySelector("#manual-add-approval-btn")?.addEventListener("click",()=>{const h=I.querySelector("#manual-approvals-list");if(!h)return;const M=h.querySelectorAll("tr").length+1,q=document.createElement("tr");q.className="manual-approval-row border-b border-gray-100 hover:bg-amber-50 transition-colors",q.innerHTML=`
                <td class="p-2 text-center font-bold text-amber-700">${M}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,h.appendChild(q)}),I.querySelector("#manual-add-closure-approval-btn")?.addEventListener("click",()=>{const h=I.querySelector("#manual-closure-approvals-list");if(!h)return;const M=h.querySelectorAll("tr").length+1,q=document.createElement("tr");q.className="manual-closure-approval-row border-b border-gray-100 hover:bg-cyan-50 transition-colors",q.innerHTML=`
                <td class="p-2 text-center font-bold text-cyan-700">${M}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-closure-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-closure-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,h.appendChild(q)}),I.querySelector("#manual-permit-print-btn")?.addEventListener("click",()=>{this.printManualPermitFromModal(I,e)}),I.querySelector("#manual-permit-form")?.addEventListener("submit",async h=>{if(h.preventDefault(),!I.querySelector('input[name="manual-permit-status-radio"]:checked')){const q=I.querySelector("#manual-permit-status");q&&!String(q.value||"").trim()&&(q.value="\u0645\u063A\u0644\u0642")}await this.saveManualPermitEntry(I,e)})},collectManualPermitDataFromModal(e,a=null){if(!e)return null;const i=a?this.registryData.find(S=>S.id===a):null,r=e.querySelector("#manual-permit-location"),s=r?.options[r?.selectedIndex],o=String(r?.value||"").trim(),n=String(s?.getAttribute("data-site-name")||s?.textContent||"").trim(),l=e.querySelector("#manual-permit-sublocation"),p=e.querySelector("#manual-permit-location-entries");let d=[];if(p?.value)try{const S=JSON.parse(p.value);Array.isArray(S)&&(d=S)}catch{}if(!d.length){const S=l?.options[l?.selectedIndex],B=String(S?.getAttribute("data-place-name")||S?.textContent||"").trim();n&&B&&(d=[{locationId:o,location:n,sublocationId:l?.value||"",sublocation:B}])}const c=d.map(S=>S.sublocation).filter(Boolean),u=Array.from(e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(S=>({name:S.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:S.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(S=>S.name||S.signature),f=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(S=>{const B=this._readIaRolePickerValue(S,e,{isClosure:!1}),O=e.querySelector(`.manual-approval-sig[data-role="${S}"]`);if(B.name||B.approverId)return{role:S,name:B.name,signature:O?.value?.trim()||""};const Y=e.querySelector(`.manual-approval-name[data-role="${S}"]`);return{role:S,name:Y?.value?.trim()||"",signature:O?.value?.trim()||""}}),g=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(S=>{const B=this._readIaRolePickerValue(S,e,{isClosure:!0}),O=e.querySelector(`.manual-closure-approval-sig[data-role="${S}"]`);if(B.name||B.approverId)return{role:S,name:B.name,signature:O?.value?.trim()||""};const Y=e.querySelector(`.manual-closure-approval-name[data-role="${S}"]`);return{role:S,name:Y?.value?.trim()||"",signature:O?.value?.trim()||""}}),x=e.querySelector("#manual-permit-time-from")?.value||"",k=e.querySelector("#manual-permit-time-to")?.value||"",P=Array.from(e.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(S=>String(S.value||"").trim()).filter(Boolean),w=e.querySelector("#manual-ppe-notes")?.value?.trim()||"",U=w?w.split(/[،,]/).map(S=>S.trim()).filter(Boolean):[],F=[...new Set([...P,...U])],_=Array.from(e.querySelectorAll('input[name="manual-hot-work"]:checked')).map(S=>S.value),N=Array.from(e.querySelectorAll('input[name="manual-confined-space"]:checked')).map(S=>S.value),D=Array.from(e.querySelectorAll('input[name="manual-height-work"]:checked')).map(S=>S.value),W=[];_.length&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),N.length&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),D.length&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(e.querySelector("#manual-excavation-check")?.checked||e.querySelector("#manual-excavation-length")?.value?.trim())&&W.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(e.querySelector("#manual-electrical-check")?.checked||e.querySelector("#manual-electrical-work-type")?.value?.trim())&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(e.querySelector("#manual-cold-check")?.checked||e.querySelector("#manual-cold-work-type")?.value?.trim())&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(e.querySelector("#manual-other-check")?.checked||e.querySelector("#manual-other-work-type")?.value?.trim())&&W.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const T=W.length?W:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],$=e.querySelector("#manual-closure-time")?.value||"";return{...i||{},sequentialNumber:parseInt(e.querySelector("#manual-permit-sequential")?.value||i?.sequentialNumber||"0",10),paperPermitNumber:e.querySelector("#manual-paper-permit-number")?.value?.trim()||i?.paperPermitNumber||"",location:n,locationId:o,locationEntries:d,sublocation:c.join(" | "),timeFrom:x?Utils.dateTimeLocalToISO(x)||x:i?.timeFrom||"",timeTo:k?Utils.dateTimeLocalToISO(k)||k:i?.timeTo||"",authorizedParty:e.querySelector("#manual-permit-authorized-party")?.value?.trim()||"",requestingParty:e.querySelector("#manual-permit-requesting-party")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:e.querySelector("#manual-permit-tools")?.value?.trim()||"",workDescription:e.querySelector("#manual-permit-work-description")?.value?.trim()||"",teamMembers:u.length?u:[{name:"",signature:""}],hotWorkDetails:_,hotWorkOther:e.querySelector("#manual-hot-work-other")?.value?.trim()||"",confinedSpaceDetails:N,confinedSpaceOther:e.querySelector("#manual-confined-space-other")?.value?.trim()||"",heightWorkDetails:D,heightWorkOther:e.querySelector("#manual-height-work-other")?.value?.trim()||"",electricalWorkType:e.querySelector("#manual-electrical-work-type")?.value?.trim()||"",coldWorkType:e.querySelector("#manual-cold-work-type")?.value?.trim()||"",otherWorkType:e.querySelector("#manual-other-work-type")?.value?.trim()||"",excavationLength:e.querySelector("#manual-excavation-length")?.value?.trim()||"",excavationWidth:e.querySelector("#manual-excavation-width")?.value?.trim()||"",excavationDepth:e.querySelector("#manual-excavation-depth")?.value?.trim()||"",soilType:e.querySelector("#manual-excavation-soil")?.value?.trim()||"",preStartChecklist:e.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:e.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:e.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:e.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:e.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:e.querySelector("#manual-permit-mocRequest")?.checked||!1,requiredPPE:F,ppeNotes:F.join("\u060C "),riskLikelihood:e.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:e.querySelector("#manual-risk-consequence")?.value||"",riskScore:e.querySelector("#manual-risk-score")?.value||"",riskLevel:e.querySelector("#manual-risk-level")?.value||"",riskNotes:e.querySelector("#manual-risk-notes")?.value?.trim()||"",manualApprovals:f,manualClosureApprovals:g,status:e.querySelector("#manual-permit-status")?.value||e.querySelector('input[name="manual-permit-status-radio"]:checked')?.value||i?.status||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",closureDate:$?Utils.dateTimeLocalToISO($)||$:i?.closureDate||"",closureReason:e.querySelector("#manual-closure-reason")?.value?.trim()||"",supervisor1:e.querySelector("#manual-permit-supervisor1")?.value?.trim()||"",supervisor2:e.querySelector("#manual-permit-supervisor2")?.value?.trim()||"",permitType:T,permitTypeDisplay:T.join("\u060C "),isManualEntry:!0}},async printManualPermitFromModal(e,a=null){try{const i=this.collectManualPermitDataFromModal(e,a);if(!i){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}Loading.show();const r=await this.generateManualPermitPrintHTML(i);Loading.hide(),this.openPermitPrintWindow(r)}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",i),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+i.message)}},async saveManualPermitEntry(e,a=null){if(!this._isSavingManualPermit){this._isSavingManualPermit=!0;try{const i=A=>{A&&(A.style.border="2px solid #e53e3e",A.style.boxShadow="0 0 0 3px rgba(229,62,62,0.15)")},r=A=>{A&&(A.style.border="",A.style.boxShadow="")},s=e.querySelector("#manual-paper-permit-number"),o=e.querySelector("#manual-permit-time-from"),n=e.querySelector("#manual-permit-time-to"),l=e.querySelector("#manual-permit-authorized-party"),p=e.querySelector("#manual-permit-requesting-party"),d=e.querySelector("#manual-permit-work-description"),c=e.querySelector("#manual-permit-location"),u=c?.options[c?.selectedIndex],m=String(c?.value||"").trim(),f=String(u?.getAttribute("data-site-name")||u?.textContent||"").trim(),y=e.querySelector("#manual-permit-sublocation"),g=e.querySelector("#manual-permit-location-entries");[s,c,o,n,l,p,d].forEach(r);const k=[{label:"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A",element:s,value:String(s?.value||"").trim()},{label:"\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",element:c,value:m},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",element:o,value:String(o?.value||"").trim()},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",element:n,value:String(n?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",element:l,value:String(l?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",element:p,value:String(p?.value||"").trim()},{label:"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",element:d,value:String(d?.value||"").trim()}].filter(A=>!A.value);if(k.length>0){k.forEach(X=>i(X.element));const A=k[0]?.element;A&&typeof A.focus=="function"&&(A.focus(),A.scrollIntoView({behavior:"smooth",block:"center"})),Notification.error(this._t("module.ptw.notify.manualRequiredFieldsDetailed",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0642\u0628\u0644 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:
{fields}`).replace("{fields}",k.map(X=>`\u2022 ${X.label}`).join(`
`)));return}let P=[];if(g?.value)try{const A=JSON.parse(g.value);Array.isArray(A)&&(P=A.map(X=>({locationId:String(X?.locationId||m).trim(),location:String(X?.location||f).trim(),sublocationId:String(X?.sublocationId||"").trim(),sublocation:String(X?.sublocation||"").trim()})).filter(X=>X.location&&X.sublocation))}catch{P=[]}if(P.length===0){const A=y?.options[y?.selectedIndex],X=String(y?.value||"").trim(),se=String(A?.getAttribute("data-place-name")||(A?.value?A.textContent:"")||"").trim();f&&se&&(P=[{locationId:m,location:f,sublocationId:X,sublocation:se}])}const w=P.map(A=>A.sublocationId).filter(Boolean),U=P.map(A=>A.sublocation).filter(Boolean),F=w.length>0?w.join(" | "):null,_=U.length>0?U.join(" | "):null,N=e.querySelector("#manual-permit-time-from")?.value,D=e.querySelector("#manual-permit-time-to")?.value,W=e.querySelector("#manual-permit-date")?.value||(N?N.split("T")[0]:new Date().toISOString().split("T")[0]);let H="";if(N&&D){H=this.calculateTotalTime(N,D);try{const A=new Date(N),se=new Date(D)-A;if(se>=0){const de=Math.floor(se/36e5),me=Math.floor(se%(1e3*60*60)/(1e3*60));de===0?H=`${me} \u062F\u0642\u064A\u0642\u0629`:me===0?H=`${de} \u0633\u0627\u0639\u0629`:H=`${de} \u0633\u0627\u0639\u0629 \u0648 ${me} \u062F\u0642\u064A\u0642\u0629`}}catch{}}const T=Array.from(e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(A=>({name:A.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:A.querySelector(".manual-team-member-signature")?.value?.trim()||"",id:A.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(A=>A.name||A.signature),$=Array.from(e.querySelectorAll('input[name="manual-hot-work"]:checked')).map(A=>A.value),S=Array.from(e.querySelectorAll('input[name="manual-confined-space"]:checked')).map(A=>A.value),B=Array.from(e.querySelectorAll('input[name="manual-height-work"]:checked')).map(A=>A.value),Y=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(A=>{const X=this._readIaRolePickerValue(A,e,{isClosure:!1}),se=e.querySelector(`.manual-approval-sig[data-role="${A}"]`);if(X.name||X.approverId)return{role:A,name:X.name,signature:se?.value?.trim()||"",approverId:X.approverId||"",personType:X.personType||"",isManualApprover:X.isManualApprover===!0,approvalRoleKey:X.approvalRoleKey||this._resolveIaRoleKey(A),date:"",notes:""};const de=e.querySelector(`.manual-approval-name[data-role="${A}"]`);return{role:A,name:de?.value?.trim()||"",signature:se?.value?.trim()||"",date:"",notes:""}}),v=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(A=>{const X=this._readIaRolePickerValue(A,e,{isClosure:!0}),se=e.querySelector(`.manual-closure-approval-sig[data-role="${A}"]`);if(X.name||X.approverId)return{role:A,name:X.name,signature:se?.value?.trim()||"",approverId:X.approverId||"",personType:X.personType||"",isManualApprover:X.isManualApprover===!0,approvalRoleKey:X.approvalRoleKey||this._resolveIaRoleKey(A),date:"",notes:""};const de=e.querySelector(`.manual-closure-approval-name[data-role="${A}"]`);return{role:A,name:de?.value?.trim()||"",signature:se?.value?.trim()||"",date:"",notes:""}}),E=[];$.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),S.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),B.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(e.querySelector("#manual-excavation-check")?.checked||e.querySelector("#manual-excavation-length")?.value?.trim()||e.querySelector("#manual-excavation-width")?.value?.trim()||e.querySelector("#manual-excavation-depth")?.value?.trim()||e.querySelector("#manual-excavation-soil")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(e.querySelector("#manual-electrical-check")?.checked||e.querySelector("#manual-electrical-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(e.querySelector("#manual-cold-check")?.checked||e.querySelector("#manual-cold-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(e.querySelector("#manual-other-check")?.checked||e.querySelector("#manual-other-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const C=E.length>0?E:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],b={sequentialNumber:parseInt(e.querySelector("#manual-permit-sequential")?.value||"0"),date:W,permitType:C,permitTypeDisplay:C.join("\u060C "),requestingParty:e.querySelector("#manual-permit-requesting-party")?.value.trim()||"",locationId:m,location:f,locationEntries:P,sublocationId:F,sublocation:_,timeFrom:N,timeTo:D,totalTime:e.querySelector("#manual-permit-total-time")?.value||H,authorizedParty:e.querySelector("#manual-permit-authorized-party")?.value.trim()||"",workDescription:e.querySelector("#manual-permit-work-description")?.value.trim()||"",supervisor1:e.querySelector("#manual-permit-supervisor1")?.value.trim()||"",supervisor2:e.querySelector("#manual-permit-supervisor2")?.value.trim()||"",status:e.querySelector("#manual-permit-status")?.value||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",paperPermitNumber:e.querySelector("#manual-paper-permit-number")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:e.querySelector("#manual-permit-tools")?.value.trim()||"",teamMembers:T,hotWorkDetails:$,hotWorkOther:e.querySelector("#manual-hot-work-other")?.value.trim()||"",confinedSpaceDetails:S,confinedSpaceOther:e.querySelector("#manual-confined-space-other")?.value.trim()||"",heightWorkDetails:B,heightWorkOther:e.querySelector("#manual-height-work-other")?.value.trim()||"",electricalWorkType:e.querySelector("#manual-electrical-work-type")?.value.trim()||"",coldWorkType:e.querySelector("#manual-cold-work-type")?.value.trim()||"",otherWorkType:e.querySelector("#manual-other-work-type")?.value.trim()||"",excavationLength:e.querySelector("#manual-excavation-length")?.value.trim()||"",excavationWidth:e.querySelector("#manual-excavation-width")?.value.trim()||"",excavationDepth:e.querySelector("#manual-excavation-depth")?.value.trim()||"",soilType:e.querySelector("#manual-excavation-soil")?.value.trim()||"",preStartChecklist:e.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:e.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:e.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:e.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:e.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:e.querySelector("#manual-permit-mocRequest")?.checked||!1,ppeNotes:e.querySelector("#manual-ppe-notes")?.value.trim()||"",riskLikelihood:e.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:e.querySelector("#manual-risk-consequence")?.value||"",riskScore:e.querySelector("#manual-risk-score")?.value||"",riskLevel:e.querySelector("#manual-risk-level")?.value||"",riskNotes:e.querySelector("#manual-risk-notes")?.value.trim()||"",manualApprovalsText:Y.map(A=>`${A.role}: ${A.name||"\u2014"} ${A.signature?"\u062A\u0648\u0642\u064A\u0639: "+A.signature:""}`).filter(Boolean).join(" | "),manualClosureApprovalsText:v.map(A=>`${A.role}: ${A.name||"\u2014"} ${A.signature?"\u062A\u0648\u0642\u064A\u0639: "+A.signature:""}`).filter(Boolean).join(" | "),manualApprovals:Y,manualClosureApprovals:v,closureTime:e.querySelector("#manual-closure-time")?.value||"",closureReason:e.querySelector("#manual-closure-reason")?.value.trim()||""},V=b.ppeNotes?String(b.ppeNotes).split(/[،,]/).map(A=>A.trim()).filter(Boolean):[],I=Array.from(e.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(A=>String(A.value||"").trim()).filter(Boolean),z=[...new Set([...I,...V].map(A=>String(A||"").trim()).filter(Boolean))];b.ppeNotes=z.length?z.join("\u060C "):b.ppeNotes;const J=String(b.paperPermitNumber||"").trim();if(!J||J==="0"){typeof Notification<"u"&&Notification.warning&&Notification.warning(PTW._t("module.ptw.notify.paperNumRequired","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0625\u0644\u0632\u0627\u0645\u064A \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0631\u0642\u0645 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638")),s&&(i(s),s.focus(),s.scrollIntoView({behavior:"smooth",block:"center"}));return}const le=this.registryData.find(A=>String(A.paperPermitNumber||"").trim()===J&&A.id!==(a||null));if(le){const A=le.sequentialNumber||"\u061F";typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.notify.paperNumDup",'\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A "{n}" \u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u062C\u0644 #{s} \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0645\u062E\u062A\u0644\u0641').replace(/\{n\}/g,J).replace(/\{s\}/g,String(A))),s&&(i(s),s.focus(),s.scrollIntoView({behavior:"smooth",block:"center"}));return}const re=Utils.dateTimeLocalToISO(b.timeFrom)||new Date().toISOString(),ae=Utils.dateTimeLocalToISO(b.timeTo)||new Date().toISOString(),ce=re||this.dateInputToISO(b.date)||new Date().toISOString(),te=parseInt(b.sequentialNumber)||0,ne=a?b.sequentialNumber:te>0?te:this.generateRegistrySequentialNumber(),ie=this.getCurrentUserActor(),xe=String(b.location||"").trim(),be={sequentialNumber:ne,openDate:ce,permitType:b.permitType,permitTypeDisplay:b.permitTypeDisplay,requestingParty:b.requestingParty,locationId:b.locationId,location:xe,locationEntries:b.locationEntries,sublocationId:b.sublocationId,sublocation:b.sublocation,timeFrom:re,timeTo:ae,totalTime:b.totalTime||this.calculateTotalTime(re,ae),authorizedParty:b.authorizedParty,workDescription:b.workDescription,supervisor1:b.supervisor1||"",supervisor2:b.supervisor2||"",status:b.status,paperPermitNumber:b.paperPermitNumber||"",equipment:b.equipment,tools:b.tools,toolsList:b.tools,teamMembers:b.teamMembers,hotWorkDetails:b.hotWorkDetails,hotWorkOther:b.hotWorkOther,confinedSpaceDetails:b.confinedSpaceDetails,confinedSpaceOther:b.confinedSpaceOther,heightWorkDetails:b.heightWorkDetails,heightWorkOther:b.heightWorkOther,electricalWorkType:b.electricalWorkType,coldWorkType:b.coldWorkType,otherWorkType:b.otherWorkType,excavationLength:b.excavationLength,excavationWidth:b.excavationWidth,excavationDepth:b.excavationDepth,soilType:b.soilType,preStartChecklist:b.preStartChecklist,lotoApplied:b.lotoApplied,governmentPermits:b.governmentPermits,riskAssessmentAttached:b.riskAssessmentAttached,gasTesting:b.gasTesting,mocRequest:b.mocRequest,ppeNotes:b.ppeNotes,requiredPPE:z,riskLikelihood:b.riskLikelihood,riskConsequence:b.riskConsequence,riskScore:b.riskScore,riskLevel:b.riskLevel,riskNotes:b.riskNotes,manualApprovalsText:b.manualApprovalsText,manualClosureApprovalsText:b.manualClosureApprovalsText,manualApprovals:b.manualApprovals,manualClosureApprovals:b.manualClosureApprovals,teamMembersText:b.teamMembers.map(A=>`${A.name}${A.signature||A.id?" ("+(A.signature||A.id)+")":""}`).join("\u060C "),closureDate:b.closureTime?Utils.dateTimeLocalToISO(b.closureTime):b.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||b.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?ae:null,closureReason:b.closureReason||(b.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":""),isManualEntry:!0,skipApprovalFlow:!0,approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdBy:ie.name,createdById:ie.id,updatedBy:ie.name,updatedById:ie.id,updatedAt:new Date().toISOString()};let R;if(a){const A=this.registryData.find(X=>X.id===a);if(!A){Notification.error(this._t("module.ptw.notify.recNotFound","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}R={...A,...be,id:A.id,permitId:A.permitId||this.generateTemporaryId("PTW"),createdBy:A.createdBy||be.createdBy||ie.name,createdById:A.createdById||be.createdById||ie.id,createdAt:A.createdAt}}else R={...be,id:this.generateTemporaryId("REG"),permitId:this.generateTemporaryId("PTW"),createdAt:new Date().toISOString()};if(a){const A=this.registryData.findIndex(X=>X.id===a);if(A!==-1)this.registryData[A]=R;else{Notification.error(this._t("module.ptw.notify.recNotInData","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"));return}}else this.registryData.push(R);AppState.appData||(AppState.appData={}),AppState.appData.ptw||(AppState.appData.ptw=[]);const ue={id:R.permitId,workType:Array.isArray(R.permitType)?R.permitTypeDisplay||R.permitType.join("\u060C "):R.permitType||R.permitTypeDisplay,location:R.location,siteName:R.location,sublocation:R.sublocation,sublocationName:R.sublocation,startDate:R.openDate,endDate:R.timeTo,status:String(R.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",requestingParty:R.requestingParty,authorizedParty:R.authorizedParty,workDescription:R.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:R.createdAt,updatedAt:R.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,createdBy:R.createdBy||this.getCurrentUserActor().name,createdById:R.createdById||this.getCurrentUserActor().id,updatedBy:R.updatedBy||this.getCurrentUserActor().name,updatedById:R.updatedById||this.getCurrentUserActor().id,teamMembers:R.teamMembers||[],teamMembersText:R.teamMembersText||"",hotWorkDetails:R.hotWorkDetails||[],hotWorkOther:R.hotWorkOther||"",confinedSpaceDetails:R.confinedSpaceDetails||[],confinedSpaceOther:R.confinedSpaceOther||"",heightWorkDetails:R.heightWorkDetails||[],heightWorkOther:R.heightWorkOther||"",excavationLength:R.excavationLength||"",excavationWidth:R.excavationWidth||"",excavationDepth:R.excavationDepth||"",soilType:R.soilType||"",electricalWorkType:R.electricalWorkType||"",coldWorkType:R.coldWorkType||"",otherWorkType:R.otherWorkType||"",preStartChecklist:R.preStartChecklist||!1,lotoApplied:R.lotoApplied||!1,governmentPermits:R.governmentPermits||!1,riskAssessmentAttached:R.riskAssessmentAttached||!1,gasTesting:R.gasTesting||!1,mocRequest:R.mocRequest||!1,ppeNotes:R.ppeNotes||"",riskLikelihood:R.riskLikelihood||"",riskConsequence:R.riskConsequence||"",riskScore:R.riskScore||"",riskLevel:R.riskLevel||"",riskNotes:R.riskNotes||"",manualApprovals:R.manualApprovals||[],manualApprovalsText:R.manualApprovalsText||"",manualClosureApprovals:R.manualClosureApprovals||[],manualClosureApprovalsText:R.manualClosureApprovalsText||"",closureTime:R.closureTime||"",closureDate:R.closureDate||"",closureReason:R.closureReason||"",paperPermitNumber:R.paperPermitNumber||"",sequentialNumber:R.sequentialNumber,equipment:R.equipment||"",tools:R.tools||"",toolsList:R.toolsList||"",supervisor1:R.supervisor1||"",supervisor2:R.supervisor2||""},ve=AppState.appData.ptw.findIndex(A=>A.id===R.permitId);if(ve!==-1){const A=AppState.appData.ptw[ve];AppState.appData.ptw[ve]={...A,...ue,id:R.permitId,isManualEntry:!0}}else AppState.appData.ptw.push(ue);e.remove();const pe=document.getElementById("ptw-registry-content");pe&&(this.currentTab==="registry"||pe.style.display!=="none")&&this._refreshRegistryViewLight(!0);const ke=document.getElementById("ptw-permits-content");ke&&(this.currentTab==="permits"||ke.style.display!=="none")&&this.loadPTWList(!0);const he=document.getElementById("ptw-analysis-content");he&&(this.currentTab==="analysis"||he.style.display!=="none")&&(he.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const ye=document.getElementById("ptw-approvals-content");ye&&(this.currentTab==="approvals"||ye.style.display!=="none")&&(ye.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners());const Se=document.getElementById("ptw-map-content");Se&&this.currentTab==="map"&&Se.style.display!=="none"&&this.mapInstance&&typeof this.initMap=="function"&&setTimeout(()=>{this.currentTab==="map"&&this.initMap().catch(A=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",A))},300),this.updateKPIs();const Ie=!a,Ee=ve===-1;Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"),Promise.resolve().then(async()=>{await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save()),await this.syncManualPermitRecordsToBackend(R,ue,{isNewRegistryEntry:Ie,isNewPermit:Ee})}).catch(async A=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",A);const X=A&&A.message?String(A.message):"";if(/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(X)&&R&&ue)try{const se=await this._fetchPtwRegistryRowsNoMutation();if(this._manualPermitRowExistsOnBackend(se,R,ue)){Notification.success(this._t("module.ptw.notify.manualCloudOkVerified","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D."));return}}catch(se){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0633\u062C\u0644 \u0641\u064A PTWRegistry:",se)}Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B. \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 (\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u0631\u0642\u0629 PTW \u0648 PTWRegistry): "+(X||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")+" \u2014 \u064A\u0645\u0643\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}).finally(()=>{this._isSavingManualPermit=!1})}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",i),Notification.error(this._t("module.ptw.notify.savePermitErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+(i.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}},async deleteManualPermitEntry(e){if(confirm(this._t("module.ptw.notify.deleteManualPermConfirm",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u062C\u0644.`)))try{const a=this.registryData.findIndex(r=>r.id===e);if(a===-1){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(!this.registryData[a].isManualEntry){Notification.warning(this._t("module.ptw.notify.manualDeleteOnly","\u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u0629 \u0641\u0642\u0637 \u0645\u0646 \u0647\u0646\u0627"));return}this.registryData.splice(a,1),await this.saveRegistryData(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.manualDeleteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0628\u0646\u062C\u0627\u062D"))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",a),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}},async closePermitFromRegistry(e){if(!confirm(this._t("module.ptw.notify.closePermitConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F")))return;const a=AppState.appData.ptw?.find(r=>r.id===e);if(!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const i=prompt(this._t("module.ptw.notify.closureReasonPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:"));i&&(a.status="\u0645\u063A\u0644\u0642",a.closureTime=new Date().toISOString(),a.closureReason=i,a.closureStatus="completed",typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),await this.updateRegistryEntry(a),this.updateKPIs(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")))},async exportRegistryToExcel(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const e=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(a=>({\u0645\u0633\u0644\u0633\u0644:a.sequentialNumber,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:new Date(a.openDate).toLocaleDateString("ar-EG"),"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":this.getPermitTypeDisplay(a),"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":a.requestingParty,\u0627\u0644\u0645\u0648\u0642\u0639:a.location,"\u0627\u0644\u0648\u0642\u062A \u0645\u0646":a.timeFrom,"\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649":a.closureDate||a.timeTo,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A":a.totalTime,"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627":a.authorizedParty,"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644":a.workDescription,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01":a.supervisor1,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02":a.supervisor2,"\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":a.status}));if(typeof XLSX<"u"){const a=XLSX.utils.json_to_sheet(e),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,a,"\u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),XLSX.writeFile(i,`\u0633\u062C\u0644_\u062A\u0635\u0627\u0631\u064A\u062D_\u0627\u0644\u0639\u0645\u0644_${new Date().toISOString().split("T")[0]}.xlsx`),Notification.success(this._t("module.ptw.notify.excelOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))}else Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"))},async exportRegistryToPDF(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 PDF...");const e=c=>{if(!c)return"-";try{const u=this.parseDateTimeValue(c);return!u||isNaN(u.getTime())?c||"-":u.toLocaleDateString("ar-EG")}catch{return c||"-"}},a=c=>{if(!c)return"-";try{const u=this.parseDateTimeValue(c);return!u||isNaN(u.getTime())?c||"-":u.toLocaleString("ar-EG")}catch{return c||"-"}},i=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(c=>{const u=c.sequentialNumber||"-",m=e(c.openDate),f=this.getPermitTypeDisplay(c)||"-",y=c.requestingParty||"-",g=c.location||"-",x=c.timeFrom?a(c.timeFrom):"-",k=c.closureDate?a(c.closureDate):c.timeTo?a(c.timeTo):"-",P=c.totalTime||"-",w=c.authorizedParty||"-",U=c.workDescription||"-",F=c.supervisor1||"-",_=c.supervisor2||"-",N=c.status||"-";return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(u)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(m)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(f)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(g)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(x)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(k)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(P)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(w)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(U)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(F)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(_)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(N)}</td>
                    </tr>
                `}).join(""),r=`PTW-REGISTRY-${new Date().toISOString().slice(0,10)}`,s="\u0633\u062C\u0644 \u062D\u0635\u0631 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0623\u0639\u0645\u0627\u0644",o=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u0633\u062C\u0644 \u062D\u0635\u0631 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 14px;">
                        \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D: ${this.registryData.length}
                    </p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #3b82f6; color: white;">
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: bold;">\u0645\u0633\u0644\u0633\u0644</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0648\u0642\u062A \u0645\u0646</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i}
                    </tbody>
                </table>
            `,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(r,s,o,!1,!0,{source:"PTWRegistry"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${s}</title></head><body>${o}</body></html>`,l=new Blob([n],{type:"text/html;charset=utf-8"}),p=URL.createObjectURL(l),d=window.open(p,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>{URL.revokeObjectURL(p),Loading.hide(),Notification.success(this._t("module.ptw.notify.registryPrintReady","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(e.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},showImportExcelModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title"><i class="fas fa-file-import ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0646 \u0645\u0644\u0641 Excel</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800 mb-2"><strong>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:</strong></p>
                        <p class="text-sm text-blue-700">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 (\u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0623\u0648 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629):</p>
                        <ul class="text-sm text-blue-700 list-disc mr-6 mt-2 space-y-1">
                            <li><strong>\u0645\u0633\u0644\u0633\u0644</strong> \u0623\u0648 <strong>Sequential Number</strong> - \u0631\u0642\u0645 \u062A\u0633\u0644\u0633\u0644\u064A</li>
                            <li><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</strong> \u0623\u0648 <strong>Date</strong> - \u062A\u0627\u0631\u064A\u062E \u0641\u062A\u062D \u0627\u0644\u062A\u0635\u0631\u064A\u062D</li>
                            <li><strong>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</strong> \u0623\u0648 <strong>Permit Type</strong> - \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</li>
                            <li><strong>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</strong> \u0623\u0648 <strong>Requesting Party</strong> - \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</li>
                            <li><strong>\u0627\u0644\u0645\u0648\u0642\u0639</strong> \u0623\u0648 <strong>Location</strong> - \u0645\u0648\u0642\u0639 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644</li>
                            <li><strong>\u0627\u0644\u0648\u0642\u062A \u0645\u0646</strong> \u0623\u0648 <strong>Time From</strong> - \u0648\u0642\u062A \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644</li>
                            <li><strong>\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649</strong> \u0623\u0648 <strong>Time To</strong> - \u0648\u0642\u062A \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0639\u0645\u0644</li>
                            <li><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</strong> \u0623\u0648 <strong>Total Time</strong> - \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A\u060C \u0633\u064A\u062A\u0645 \u062D\u0633\u0627\u0628\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)</li>
                            <li><strong>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</strong> \u0623\u0648 <strong>Authorized Party</strong> - \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u062E\u0648\u0644\u0629</li>
                            <li><strong>\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</strong> \u0623\u0648 <strong>Work Description</strong> - \u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</li>
                            <li><strong>\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</strong> \u0623\u0648 <strong>Supervisor 1</strong> - \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644</li>
                            <li><strong>\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</strong> \u0623\u0648 <strong>Supervisor 2</strong> - \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</li>
                            <li><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</strong> \u0623\u0648 <strong>Status</strong> - \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u0645\u0641\u062A\u0648\u062D/\u0645\u063A\u0644\u0642)</li>
                        </ul>
                        <p class="text-xs text-blue-700 mt-3"><strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0645\u0639\u0631\u0641\u0627\u062A \u0641\u0631\u064A\u062F\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0644\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0648\u0631\u062F\u0629. \u0625\u0630\u0627 \u0643\u0627\u0646 \u0647\u0646\u0627\u0643 \u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644\u060C \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647.</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls)
                        </label>
                        <input type="file" id="registry-excel-file-input" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="registry-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641):</h3>
                        <div class="max-h-60 overflow-auto border rounded">
                            <table class="data-table text-xs">
                                <thead id="registry-preview-head"></thead>
                                <tbody id="registry-preview-body"></tbody>
                            </table>
                        </div>
                        <p id="registry-preview-count" class="text-sm text-gray-600 mt-2"></p>
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="registry-import-confirm-btn" class="btn-primary" disabled>
                        <i class="fas fa-upload ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=e.querySelector("#registry-excel-file-input"),i=e.querySelector("#registry-import-confirm-btn"),r=e.querySelector("#registry-import-preview"),s=e.querySelector("#registry-preview-head"),o=e.querySelector("#registry-preview-body"),n=e.querySelector("#registry-preview-count");let l=[];const p=()=>{l=[],r&&r.classList.add("hidden"),s&&(s.innerHTML=""),o&&(o.innerHTML=""),n&&(n.textContent=""),i&&(i.disabled=!0)};e.addEventListener("click",c=>{c.target===e&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&e.remove()});const d=async c=>{const u=c.target.files?.[0];if(p(),!!u){if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxLibDetail","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629."));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");const m=await u.arrayBuffer(),f=XLSX.read(m,{type:"array"}),y=f.SheetNames[0],g=f.Sheets[y],x=XLSX.utils.sheet_to_json(g);if(x.length===0){Notification.error(this._t("module.ptw.notify.fileEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A")),Loading.hide();return}if(l=x,x.length>0){const k=Object.keys(x[0]);s.innerHTML=`<tr>${k.map(P=>`<th class="px-2 py-1">${Utils.escapeHTML(P)}</th>`).join("")}</tr>`,o.innerHTML=x.slice(0,5).map(P=>`<tr>${k.map(w=>`<td class="px-2 py-1">${Utils.escapeHTML(String(P[w]||""))}</td>`).join("")}</tr>`).join(""),n.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${x.length}`,r.classList.remove("hidden"),i.disabled=!1}Loading.hide()}catch(m){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel:",m),Notification.error(this._t("module.ptw.notify.readFileErr","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: ")+(m.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}};a&&a.addEventListener("change",d),i?.addEventListener("click",async()=>{if(l.length===0){Notification.warning(this._t("module.ptw.notify.selectFileFirst","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F."));return}await this.importRegistryFromExcel(l,e)})},async importRegistryFromExcel(e,a){if(!e||e.length===0){Notification.error(this._t("module.ptw.notify.noImportData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");let i=0,r=0,s=0,o=0;const n={sequentialNumber:["\u0645\u0633\u0644\u0633\u0644","Sequential Number","sequentialNumber","\u0645\u0633\u0644\u0633\u0644"],openDate:["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","Date","openDate","\u062A\u0627\u0631\u064A\u062E","\u062A\u0627\u0631\u064A\u062E \u0641\u062A\u062D \u0627\u0644\u062A\u0635\u0631\u064A\u062D"],permitType:["\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Permit Type","permitType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644"],requestingParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","Requesting Party","requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"],location:["\u0627\u0644\u0645\u0648\u0642\u0639","Location","location","\u0645\u0648\u0642\u0639"],timeFrom:["\u0627\u0644\u0648\u0642\u062A \u0645\u0646","Time From","timeFrom","\u0648\u0642\u062A \u0645\u0646","\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"],timeTo:["\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649","Time To","timeTo","\u0648\u0642\u062A \u0625\u0644\u0649","\u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0639\u0645\u0644"],totalTime:["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","Total Time","totalTime","\u0625\u062C\u0645\u0627\u0644\u064A"],authorizedParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627","Authorized Party","authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D"],workDescription:["\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644","Work Description","workDescription","\u0627\u0644\u0648\u0635\u0641"],supervisor1:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01","Supervisor 1","supervisor1","\u0645\u0633\u0626\u0648\u0644 01"],supervisor2:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02","Supervisor 2","supervisor2","\u0645\u0633\u0626\u0648\u0644 02"],status:["\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Status","status","\u0627\u0644\u062D\u0627\u0644\u0629"]},l=(c,u)=>{for(const m in c){const f=String(m).trim();for(const y of u)if(f===y||f.toLowerCase()===y.toLowerCase())return c[m]}return null},p=c=>{if(!c)return null;const u=this.parseDateTimeValue(c);if(u)return u.toISOString();if(typeof c=="string"){const m=new Date(c);if(!isNaN(m.getTime()))return m.toISOString()}if(typeof c=="number"){const m=Math.floor(c),f=c-m,y=new Date(1899,11,30),g=new Date(y.getTime()+m*24*60*60*1e3);if(f>0){const x=Math.round(f*24*60*60),k=Math.floor(x/3600),P=Math.floor(x%3600/60),w=x%60;g.setHours(k,P,w,0)}if(!isNaN(g.getTime()))return g.toISOString()}return null};for(const c of e)try{const u=l(c,n.sequentialNumber),m=p(l(c,n.openDate)),f=l(c,n.permitType)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",y=l(c,n.requestingParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",g=l(c,n.location)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",x=p(l(c,n.timeFrom))||m||new Date().toISOString(),k=p(l(c,n.timeTo)),P=l(c,n.totalTime)||this.calculateTotalTime(x,k),w=l(c,n.authorizedParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",U=l(c,n.workDescription)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",F=l(c,n.supervisor1)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_=l(c,n.supervisor2)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",N=l(c,n.status)||"\u0645\u0641\u062A\u0648\u062D";if(!u){s++;continue}const D=this.registryData.findIndex(H=>H.sequentialNumber===Number(u)||H.sequentialNumber===String(u)),W={id:D>=0?this.registryData[D].id:this.generateTemporaryId("REG"),sequentialNumber:Number(u)||this.generateRegistrySequentialNumber(),permitId:D>=0?this.registryData[D].permitId:null,openDate:m||new Date().toISOString(),permitType:f,requestingParty:y,location:g,timeFrom:x,timeTo:k||x,totalTime:P,authorizedParty:w,workDescription:U,supervisor1:F,supervisor2:_,status:N,closureDate:N==="\u0645\u063A\u0644\u0642"||N==="\u0645\u063A\u0644\u0642\u0629"?k||new Date().toISOString():null,closureReason:null,createdAt:D>=0?this.registryData[D].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};D>=0?(this.registryData[D]=W,r++):(this.registryData.push(W),i++)}catch(u){o++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0635\u0641:",u)}await this.saveRegistryData(),document.getElementById("ptw-registry-content")&&this.currentTab==="registry"&&this._refreshRegistryViewLight(!0),Loading.hide(),a.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D!
- \u062A\u0645 \u0625\u0636\u0627\u0641\u0629: ${i} \u0633\u062C\u0644
- \u062A\u0645 \u062A\u062D\u062F\u064A\u062B: ${r} \u0633\u062C\u0644
`+(s>0?`- \u062A\u0645 \u062A\u062E\u0637\u064A: ${s} \u0635\u0641 (\u0628\u062F\u0648\u0646 \u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
`:"")+(o>0?`- \u0623\u062E\u0637\u0627\u0621: ${o} \u0635\u0641`:""))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",i),Notification.error(this._t("module.ptw.notify.importErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ")+(i.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},renderList(e={}){const a=e.includeStats!==!1,{source:i,merged:r,permitsFromList:s,permitsFromRegistry:o}=this.getPermitMetricsDataset(),n=i.length>0,l=i.length,p=i.filter(g=>g&&this.isPermitOpenStatus(g.status)).length,d=i.filter(g=>g&&this.isPermitClosedStatus(g.status)).length,c=[...new Set(r.map(g=>(g.workType||"").trim()).filter(Boolean))].sort(),u=[...new Set(r.map(g=>(g.siteName||g.location||"").trim()).filter(Boolean))].sort(),m=[...new Set(r.map(g=>(g.sublocationName||g.sublocation||"").trim()).filter(Boolean))].sort(),f=["\u0645\u0641\u062A\u0648\u062D","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647","\u0645\u0631\u0641\u0648\u0636","\u0645\u063A\u0644\u0642","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"];return`${a?this.renderListStatsSection():`
            <div class="content-card mb-6" id="ptw-stats-section" data-stats-pending="1">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="kpi-card kpi-primary">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-open-count">${p}</p>
                                <h3 class="kpi-label">\u0645\u0641\u062A\u0648\u062D</h3>
                            </div>
                        </div>
                        <div class="kpi-card kpi-success">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-closed-count">${d}</p>
                                <h3 class="kpi-label">\u0645\u063A\u0644\u0642</h3>
                            </div>
                        </div>
                        <div class="kpi-card kpi-info">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-total-count">${l}</p>
                                <h3 class="kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`}
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</h2>
                </div>
                <!-- \u0641\u0644\u062A\u0631 \u0627\u062D\u062A\u0631\u0627\u0641\u064A \u0623\u0639\u0644\u0649 \u0627\u0644\u062C\u062F\u0648\u0644 (\u0628\u0646\u0641\u0633 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629) -->
                <div class="ptw-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 0 -20px; width: calc(100% + 40px); direction: rtl;">
                    <div class="ptw-filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: end;">
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-search ml-1"></i>\u0627\u0644\u0628\u062D\u062B</label>
                            <input type="text" id="ptw-search" class="ptw-filter-input" placeholder="\u0627\u0628\u062D\u062B \u0628\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639..." style="direction: rtl; text-align: right;">
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-tag ml-1"></i>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>
                            <select id="ptw-filter-work-type" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${c.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-map-marker-alt ml-1"></i>\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <select id="ptw-filter-location" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${u.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-location-dot ml-1"></i>\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                            <select id="ptw-filter-sublocation" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${m.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-info-circle ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="ptw-filter-status" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${f.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-calendar-alt ml-1"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="ptw-filter-date-from" class="ptw-filter-input" style="direction: rtl;">
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-calendar-check ml-1"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="ptw-filter-date-to" class="ptw-filter-input" style="direction: rtl;">
                            <div class="text-xs text-gray-600 mt-1">
                                \u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631: <span id="ptw-filter-count">-</span>
                            </div>
                        </div>
                        <div class="ptw-filter-field">
                            <button id="ptw-reset-filters" class="ptw-filter-reset-btn" type="button"><i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646</button>
                        </div>
                        <div class="ptw-filter-field">
                            <button id="ptw-refresh-list" class="ptw-filter-reset-btn" type="button" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"><i class="fas fa-sync-alt ml-1"></i>\u062A\u062D\u062F\u064A\u062B</button>
                        </div>
                    </div>
                </div>
                <div class="card-body" style="padding-top: 20px;">
                    <div id="ptw-table-container" class="ptw-table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</th>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                    <th>\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</th>
                                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                    <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                    <th>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${n?"":`
                                <tr data-ptw-loading="1">
                                    <td colspan="8" class="text-center text-gray-500 py-8">
                                        <div style="width: 300px; margin: 0 auto 16px;">
                                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                            </div>
                                        </div>
                                        <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                                    </td>
                                </tr>`}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `},updateKPIs(){try{const{source:e,merged:a,permitsFromList:i,permitsFromRegistry:r}=this.getPermitMetricsDataset(),s=e.length,o=e.filter(x=>x&&this.isPermitOpenStatus(x.status)).length,n=e.filter(x=>x&&this.isPermitClosedStatus(x.status)).length,l=x=>this.formatPtwMetricCount(x),p=document.getElementById("ptw-open-count"),d=document.getElementById("ptw-closed-count"),c=document.getElementById("ptw-total-count");if(p&&(p.textContent=l(o)),d&&(d.textContent=l(n)),c){c.textContent=l(s);const x=c.closest(".bg-gradient-to-br");if(x){const k=x.querySelector(".text-xs.text-gray-600");k&&(k.textContent=r.length>0?`\u0633\u062C\u0644 PTWRegistry: ${l(r.length)} \u0635\u0641`:`\u0645\u0646 ${l(i.length)} \u0642\u0627\u0626\u0645\u0629 PTW`)}}const u={};a.forEach(x=>{const k=x.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";u[k]||(u[k]={total:0,open:0,closed:0}),u[k].total++,this.isPermitClosedStatus(x.status)?u[k].closed++:u[k].open++});const m=Object.entries(u).sort((x,k)=>k[1].total-x[1].total),f=m.length>0?m[0]:null,y=document.querySelector(".grid.grid-cols-1.md\\:grid-cols-4 .bg-gradient-to-br.from-purple-50");y&&f&&(y.innerHTML=`
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                                <i class="fas fa-tags text-white text-lg"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-purple-800">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</h3>
                                <p class="text-xs text-purple-600">${Object.keys(u).length} \u0646\u0648\u0639</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4 border border-purple-200">
                        <div class="font-semibold text-gray-800 text-sm mb-3 line-clamp-2" title="${Utils.escapeHTML(f[0])}">
                            ${Utils.escapeHTML(f[0].length>50?f[0].substring(0,50)+"...":f[0])}
                        </div>
                        <div class="flex items-center justify-between gap-3 text-xs">
                            <div class="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-blue-500 text-[8px]"></i>
                                <span class="text-blue-700 font-semibold">\u0645\u0641\u062A\u0648\u062D: ${f[1].open}</span>
                            </div>
                            <div class="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-green-500 text-[8px]"></i>
                                <span class="text-green-700 font-semibold">\u0645\u063A\u0644\u0642: ${f[1].closed}</span>
                            </div>
                            <div class="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-gray-500 text-[8px]"></i>
                                <span class="text-gray-700 font-semibold">\u0625\u062C\u0645\u0627\u0644\u064A: ${f[1].total}</span>
                            </div>
                        </div>
                    </div>
                `);const g=document.getElementById("ptw-work-types-stats");g&&m.length>1&&(g.innerHTML=m.map(([x,k])=>`
                    <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800 text-sm mb-1 line-clamp-1" title="${Utils.escapeHTML(x)}">${Utils.escapeHTML(x)}</div>
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-blue-500 text-[8px]"></i>
                                    \u0645\u0641\u062A\u0648\u062D: ${k.open}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-green-500 text-[8px]"></i>
                                    \u0645\u063A\u0644\u0642: ${k.closed}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-gray-500 text-[8px]"></i>
                                    \u0625\u062C\u0645\u0627\u0644\u064A: ${k.total}
                                </span>
                            </div>
                        </div>
                        <div class="text-xl font-bold text-primary-600 ml-3">${k.total}</div>
                    </div>
                `).join(""))}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",e)}},_extractPermitTypeFields(e){if(!e)return[];const a=[],i=typeof IssuingAuthorities<"u"?IssuingAuthorities:null,r=p=>{if(!i||typeof i.mapPermitTypeToField!="function"||p==null)return;const d=typeof p=="string"?p:String(p);let c=i.mapPermitTypeToField(d.trim());!c&&/[،,]/.test(d)&&(c=i.mapPermitTypeToField(d.split(/[،,]/)[0].trim())),c&&!a.includes(c)&&a.push(c)};e.hotWorkDetails&&(!Array.isArray(e.hotWorkDetails)||e.hotWorkDetails.length>0)&&a.push("hotWork"),e.confinedSpaceDetails&&(!Array.isArray(e.confinedSpaceDetails)||e.confinedSpaceDetails.length>0)&&a.push("confinedSpace"),e.heightWorkDetails&&(!Array.isArray(e.heightWorkDetails)||e.heightWorkDetails.length>0)&&a.push("workAtHeight"),(e.lotoApplied===!0||e.lotoApplied==="true")&&a.push("loto"),e.coldWorkType&&String(e.coldWorkType).trim()&&a.push("coldWork"),(e.excavationLength||e.excavationWidth||e.excavationDepth||e.soilType&&String(e.soilType).trim())&&a.push("excavation");const s=String(e.permitType||e.workType||"").toLowerCase(),o=String(e.otherWorkType||"").toLowerCase(),n=String(e.electricalWorkType||"").toLowerCase(),l=`${s} ${o} ${n}`;return(l.includes("\u0645\u0642\u0627\u0648\u0644")||l.includes("contractor"))&&a.push("contractorPTW"),(l.includes("\u0631\u0641\u0639")||l.includes("lifting")||l.includes("\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639")||l.includes("crane"))&&a.push("liftingPlan"),e.permitType&&(Array.isArray(e.permitType)?e.permitType:String(e.permitType).split(/[،,|]/)).forEach(d=>r(typeof d=="string"?d.trim():d)),a.length===0&&e.workType&&!Array.isArray(e.workType)&&r(e.workType),[...new Set(a)]},async _buildIssuingAuthoritiesWorkflow(e){if(!e||e.length===0)return null;const a=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!a||typeof a.getAuthoritiesForApprovalRole!="function")return null;const i={permitType:e.join(", ")},[r,s]=await Promise.all([this._fetchIaCandidatesForRole(i,"areaManager"),this._fetchIaCandidatesForRole(i,"maintenanceEngineer")]),o=this._getHseSafetyTeamCandidates(),n=m=>({id:m.id||"",name:m.name||"",email:m.email||"",phone:m.phone||"",personType:m.personType||"employee",permitLevel:m.permitLevel||"G"}),l=[];let p=0;l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:AppState.currentUser?.name||"",approverEmail:AppState.currentUser?.email||"",approverId:AppState.currentUser?.id||"",date:"",comments:"",order:p++,isSafetyOfficer:!1,candidates:[]}),l.push({role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:r.length===1&&r[0].name||"",approverEmail:r.length===1&&r[0].email||"",approverId:r.length===1&&r[0].id||"",date:"",comments:"",order:p++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"areaManager",candidates:r.map(n)}),l.push({role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:s.length===1&&s[0].name||"",approverEmail:s.length===1&&s[0].email||"",approverId:s.length===1&&s[0].id||"",date:"",comments:"",order:p++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"maintenanceEngineer",candidates:s.map(n)}),l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:p++,isSafetyOfficer:!0,candidates:o});let d=[];try{typeof a.getGeneralAuthoritiesForPermitTypes=="function"&&(d=await a.getGeneralAuthoritiesForPermitTypes(e))}catch(m){typeof Utils<"u"&&Utils.safeWarn("_buildIssuingAuthoritiesWorkflow general fetch error:",m)}const c=d.filter(m=>m.permitLevel==="G"),u=d.filter(m=>m.permitLevel==="Y");return c.length>0&&l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (G)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:p++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,candidates:c.map(n)}),u.length>0&&(l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (\u062A\u0646\u0633\u064A\u0642 Y)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:p++,isSafetyOfficer:!0,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,isHseCoApprovalGate:!0,candidates:o}),l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Y - \u0628\u0639\u062F \u062A\u0646\u0633\u064A\u0642 HSE)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:p++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!0,candidates:u.map(n)})),{approvals:l,circuitOwnerId:"__issuing_authorities__",circuitName:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639",issuingAuthoritiesSource:!0}},_getHseSafetyTeamCandidates(){try{const e=AppState?.appData?.safetyTeam||AppState?.formSettingsState?.safetyTeam||[];if(Array.isArray(e)&&e.length>0)return e.slice(0,5).map(a=>({id:a.id||a.employeeCode||"",name:a.name||a.memberName||"",email:a.email||"",phone:a.phone||""})).filter(a=>a.name)}catch{}return[]},async prepareApprovalsForForm(e=null){if(e&&e.isManualEntry===!0)return{approvals:e.manualApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Entry",isManual:!0};if(e&&Array.isArray(e.approvals)){const s=e.approvalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(e.approvals).map((n,l)=>ApprovalCircuits._attachMetadataToApproval(n,l,s)),circuitOwnerId:s,circuitName:e.approvalCircuitName||""}}try{const s=this._extractPermitTypeFields(e);if(s.length>0){const o=await this._getCachedIaWorkflow(s);if(o&&o.approvals&&o.approvals.length>0)return{approvals:this.normalizeApprovals(o.approvals),circuitOwnerId:o.circuitOwnerId,circuitName:o.circuitName,issuingAuthoritiesSource:!0}}}catch(s){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F workflow \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",s)}const a=AppState.currentUser?.id||"",i=ApprovalCircuits.generateApprovalsForUser(a);return{approvals:this.normalizeApprovals(i.approvals||[]),circuitOwnerId:i.circuitOwnerId||"__default__",circuitName:i.circuitName||""}},async prepareClosureApprovalsForForm(e=null){if(e&&e.isManualEntry===!0)return{approvals:e.manualClosureApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Closure Entry",isManual:!0};if(e&&Array.isArray(e.closureApprovals)){const s=e.closureApprovalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(e.closureApprovals).map((n,l)=>ApprovalCircuits._attachMetadataToApproval(n,l,s)),circuitOwnerId:s,circuitName:e.closureApprovalCircuitName||""}}try{const s=this._extractPermitTypeFields(e);if(s.length>0){const o=await this._getCachedIaWorkflow(s);if(o&&o.approvals&&o.approvals.length>0)return{approvals:this.normalizeApprovals(o.approvals),circuitOwnerId:o.circuitOwnerId,circuitName:o.circuitName,issuingAuthoritiesSource:!0}}}catch(s){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",s)}const a=AppState.currentUser?.id||"",i=ApprovalCircuits.generateApprovalsForUser(a);return{approvals:this.normalizeApprovals(i.approvals||[]),circuitOwnerId:i.circuitOwnerId||"__default__",circuitName:i.circuitName||""}},renderPermitSystemHeader(e={}){const a=e?.forPdf===!0,i=AppState?.companySettings||{},r=i.name||i.companyName||i.organizationName||"HSE System",s=String(i.secondaryName||i.departmentName||i.managementName||"").trim(),o=i.logoUrl||i.companyLogo||i.logo||AppState?.companyLogo||"",n="\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",l="Permit To Work",p=c=>Utils.escapeHTML(c),d=o?`<img src="${p(o)}" alt="Company Logo" class="ptw-paper-header-logo">`:'<div class="ptw-paper-header-logo-fallback">LOGO</div>';return a?`
            <div class="ptw-paper-header ptw-paper-header-pdf">
                <table class="ptw-paper-header-table" dir="rtl" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="ptw-ph-cell ptw-ph-right" valign="middle">
                            <div class="ptw-paper-header-company" dir="rtl">${p(r)}</div>
                            ${s?`<div class="ptw-paper-header-dept" dir="rtl">${p(s)}</div>`:""}
                        </td>
                        <td class="ptw-ph-cell ptw-ph-center" valign="middle">
                            <div class="ptw-paper-header-form-title" dir="rtl">${p(n)}</div>
                            <div class="ptw-paper-header-form-subtitle" dir="ltr">${p(l)}</div>
                        </td>
                        <td class="ptw-ph-cell ptw-ph-left" valign="middle">${d}</td>
                    </tr>
                </table>
            </div>`:`
            <div class="ptw-paper-header">
                <div class="ptw-paper-header-right">
                    <div class="ptw-paper-header-company">${p(r)}</div>
                    ${s?`<div class="ptw-paper-header-dept">${p(s)}</div>`:""}
                </div>
                <div class="ptw-paper-header-center">
                    <div class="ptw-paper-header-form-title">${p(n)}</div>
                    <div class="ptw-paper-header-form-subtitle">${p(l)}</div>
                </div>
                <div class="ptw-paper-header-left">${d}</div>
            </div>
        `},renderPermitSystemFooter(e={}){const a=AppState?.companySettings||{},i=a.name||a.companyName||a.organizationName||"HSE System",r=String(a.secondaryName||a.departmentName||a.managementName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629").trim(),s=d=>Utils.escapeHTML(d==null?"":String(d)),o=s(e.formCode||"PTW-MANUAL"),n=d=>{if(!d)return"\u2014";try{const c=new Date(d);return isNaN(c.getTime())?s(d):s(c.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"}))}catch{return s(d)}},l=n(e.issueDate||e.releaseDate||e.createdAt),p=n(e.revisionDate||e.updatedAt||e.issueDate||e.createdAt);return`
            <div class="ptw-paper-footer">
                <div class="ptw-paper-footer-frame">
                    <div class="ptw-paper-footer-meta" dir="rtl">
                        <span class="ptw-pf-item">\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: ${o}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${l}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644: ${p}</span>
                    </div>
                    <div class="ptw-paper-footer-company" dir="rtl">
                        <span>${s(r)}</span>
                    </div>
                </div>
            </div>`},async renderForm(e=null){const a=!!e,i=e?.isManualEntry===!0,r=await this.prepareApprovalsForForm(e),s=r.approvals||[];this.formApprovals=s.map(v=>Object.assign({},v)),this.formCircuitOwnerId=r.circuitOwnerId||"__default__";const o=r.circuitName||"";this.formCircuitName=o;const n=await this.prepareClosureApprovalsForForm(e),l=e?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",p=v=>Utils.escapeHTML(v||""),d=Array.isArray(e?.teamMembers)&&e.teamMembers.length>0?e.teamMembers:[{name:""}],c=Array.isArray(e?.hotWorkDetails)?e.hotWorkDetails:[],u=Array.isArray(e?.confinedSpaceDetails)?e.confinedSpaceDetails:[],m=Array.isArray(e?.heightWorkDetails)?e.heightWorkDetails:[],f=e?.hotWorkOther||"",y=e?.confinedSpaceOther||"",g=e?.heightWorkOther||"",x=e?.id||e?.permitId||null,k=this.buildKnownEquipmentHistoryLabels(x),P=this.parseEquipmentToSelection(e?.equipment,k),w=this.buildManualFixedEquipmentCheckboxesHtml(P.matrixSelected,k),U=e?.closureStatus||"",F=e?.closureTime?Utils.toDateTimeLocalString(e.closureTime):"",_=e?.closureReason||"",N=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(v=>({name:(v.name||"").trim()})).filter(v=>v.name):[],D=N.length>0,W=e?.authorizedParty||"",H=this.getDepartmentOptionsForPTW(),T=H.length>0,$=e?.requestingParty||"",S=[{id:"welding",label:"\u0644\u062D\u0627\u0645"},{id:"cutting",label:"\u0642\u0637\u0639"},{id:"spark",label:"\u0634\u0631\u0631 / \u062D\u0631\u0627\u0631\u0629"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],B=[{id:"tanks",label:"\u062E\u0632\u0627\u0646\u0627\u062A"},{id:"pipes",label:"\u0623\u0646\u0627\u0628\u064A\u0628"},{id:"containers",label:"\u062A\u0646\u0643\u0627\u062A"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],O=[{id:"scaffold",label:"\u0633\u0642\u0627\u0644\u0627\u062A"},{id:"roof",label:"\u0633\u0637\u062D"},{id:"lift",label:"\u0633\u0644\u0629 \u0631\u0627\u0641\u0639"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],Y=(v,E,K,C="")=>v.map(b=>{const V=b.hasOther?!!C:E.includes(b.label),I=b.hasOther?` data-toggle-target="#${K}-other-wrapper"`:"",z=`
                    <label class="ptw-check-option">
                        <input type="checkbox" class="ptw-check-input" name="${K}-option" value="${b.id}" data-label="${b.label}"${I} ${V?"checked":""}>
                        <span>${b.label}</span>
                    </label>
                `;return b.hasOther?`
                        ${z}
                        <div id="${K}-other-wrapper" class="ptw-other-input ${V?"":"hidden"}">
                            <input type="text" id="${K}-other-text" class="form-input" placeholder="\u0627\u0630\u0643\u0631 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" value="${p(C)}">
                        </div>
                    `:z}).join(""),ee=d.map(v=>`
            <div class="ptw-team-member-row flex items-center gap-3">
                <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${p(v.name)}">
                <button type="button" class="btn-icon btn-icon-danger" onclick="PTW.removeTeamMemberRow(this)" title="\u062D\u0630\u0641">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join("");return`
            <style>
                .ptw-paper-theme {
                    background: #000;
                    color: #fff;
                    border: 1px solid #1e3a8a;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .ptw-paper-header {
                    display: grid;
                    grid-template-columns: 1.45fr 1.15fr 0.85fr;
                    align-items: center;
                    gap: 12px;
                    background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 14px 18px;
                    min-height: 86px;
                    color: #fff;
                }
                .ptw-paper-header-right { text-align: right; min-width: 0; }
                .ptw-paper-header-company {
                    font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 0.2px; line-height: 1.35;
                    white-space: nowrap; word-break: keep-all;
                }
                .ptw-paper-header-dept { font-size: 12px; font-weight: 500; color: rgba(255, 255, 255, 0.9); margin-top: 4px; line-height: 1.35; }
                .ptw-paper-header-center {
                    text-align: center; min-width: 0;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                }
                .ptw-paper-header-form-title {
                    font-size: 18px; font-weight: 800; color: #fff; line-height: 1.25;
                    padding-bottom: 4px; margin-bottom: 4px;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.35);
                }
                .ptw-paper-header-form-subtitle {
                    font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.94);
                    letter-spacing: 1.2px; text-transform: uppercase;
                }
                .ptw-paper-header-left { display: flex; justify-content: flex-end; align-items: center; }
                .ptw-paper-header-logo { max-height: 60px; max-width: 150px; object-fit: contain; background: #fff; border-radius: 4px; padding: 4px; }
                .ptw-paper-header-logo-fallback { width: 90px; height: 48px; border: 1px solid #6b7280; display: flex; align-items: center; justify-content: center; color: #d1d5db; font-size: 12px; }
                .ptw-form-header-centered {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ptw-form-header-centered .card-title {
                    width: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    flex-wrap: wrap;
                    line-height: 1.25;
                    padding-inline: 4.5rem;
                    margin: 0;
                }
                .ptw-form-header-centered .ptw-form-id-badge {
                    position: absolute;
                    inset-inline-end: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .ptw-form-section {
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .ptw-form-section:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                    transform: translateY(-2px);
                }
                .ptw-form-section h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 3px solid;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .ptw-form-section h3 i {
                    font-size: 1.5rem;
                    padding: 10px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.3);
                }
                .ptw-section-1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .ptw-section-1 h3 { color: #1565C0; border-color: #2196F3; }
                .ptw-section-1 h3 i { color: #1976D2; background: rgba(33, 150, 243, 0.1); }
                .ptw-s1-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }
                .ptw-s1-row { width: 100%; }
                .ptw-s1-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 1rem;
                }
                .ptw-s1-parties-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 1rem;
                    padding-top: 0.25rem;
                    border-top: 1px solid rgba(148, 163, 184, 0.35);
                }
                .ptw-s1-block {
                    width: 100%;
                    padding: 0.65rem 0.75rem;
                    background: rgba(255, 255, 255, 0.72);
                    border: 1px solid rgba(148, 163, 184, 0.35);
                    border-radius: 8px;
                    box-sizing: border-box;
                }
                .ptw-s1-block > label:first-child { margin-bottom: 0.4rem; }
                .ptw-s1-tools textarea,
                .ptw-s1-work-desc textarea {
                    min-height: 2.5rem;
                    resize: vertical;
                }
                @media (max-width: 1100px) {
                    .ptw-s1-meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 640px) {
                    .ptw-s1-meta-grid,
                    .ptw-s1-parties-grid { grid-template-columns: 1fr; }
                }
                .ptw-form-equipment-body {
                    background: rgba(255, 255, 255, 0.92);
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    padding: 8px 10px;
                    width: 100%;
                    box-sizing: border-box;
                }
                .ptw-form-equipment-notes-frame {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 6px;
                }
                .ptw-form-equipment-notes-frame label {
                    flex-shrink: 0;
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.68rem;
                    margin-bottom: 0;
                    white-space: nowrap;
                }
                .ptw-form-equipment-notes-frame textarea {
                    flex: 1;
                    min-height: 28px;
                    max-height: 28px;
                    height: 28px;
                    padding: 4px 8px;
                    font-size: 0.75rem;
                    line-height: 1.3;
                    resize: none;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-fixed-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-chips-row {
                    direction: rtl;
                    width: 100%;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                    display: grid;
                    grid-template-columns: repeat(9, minmax(0, 1fr));
                    gap: 4px 5px;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-history-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px 5px;
                    padding-top: 6px;
                    margin-top: 2px;
                    border-top: 1px dashed #e2e8f0;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-cell {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;
                    line-height: 1.25;
                    text-align: center;
                    padding: 5px 4px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    background: #f8fafc;
                    min-height: 28px;
                    min-width: 0;
                    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
                    user-select: none;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-label {
                    display: block;
                    width: 100%;
                    word-break: break-word;
                    line-height: 1.25;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-cell:hover {
                    border-color: #94a3b8;
                    background: #fff;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-cell:has(input:checked) {
                    border-color: #3b82f6;
                    background: #eff6ff;
                    color: #1d4ed8;
                    font-weight: 600;
                    box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.25);
                }
                .ptw-form-equipment-body .ptw-manual-equipment-history-cell {
                    display: inline-flex;
                    border-style: dashed;
                    background: #fafafa;
                    padding: 4px 8px;
                    min-height: 26px;
                    white-space: nowrap;
                }
                .ptw-form-equipment-body .ptw-manual-equipment-cell input[type="checkbox"] {
                    position: absolute !important;
                    opacity: 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    min-width: 0 !important;
                    min-height: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    pointer-events: none;
                }
                .ptw-section-1 .ptw-equipment-field-wrap > label { margin-bottom: 0.35rem; }
                @media (max-width: 1200px) {
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                    }
                }
                @media (max-width: 900px) {
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                @media (max-width: 640px) {
                    .ptw-form-equipment-body .ptw-manual-equipment-grid-row {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                
                .ptw-section-2 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .ptw-section-2 h3 { color: #00695C; border-color: #009688; }
                .ptw-section-2 h3 i { color: #00796B; background: rgba(0, 150, 136, 0.1); }
                
                .ptw-section-3 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .ptw-section-3 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .ptw-section-3 h3 i { color: #7B1FA2; background: rgba(156, 39, 176, 0.1); }
                
                .ptw-section-4 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .ptw-section-4 h3 { color: #E65100; border-color: #FF9800; }
                .ptw-section-4 h3 i { color: #F57C00; background: rgba(255, 152, 0, 0.1); }
                
                .ptw-section-5 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .ptw-section-5 h3 { color: #AD1457; border-color: #E91E63; }
                .ptw-section-5 h3 i { color: #C2185B; background: rgba(233, 30, 99, 0.1); }
                
                .ptw-section-6 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .ptw-section-6 h3 { color: #2E7D32; border-color: #4CAF50; }
                .ptw-section-6 h3 i { color: #388E3C; background: rgba(76, 175, 80, 0.1); }
                
                .ptw-section-7 { background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); border-color: #795548; }
                .ptw-section-7 h3 { color: #4E342E; border-color: #795548; }
                .ptw-section-7 h3 i { color: #5D4037; background: rgba(121, 85, 72, 0.1); }
                
                .ptw-section-8 { background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%); border-color: #9e9e9e; }
                .ptw-section-8 h3 { color: #424242; border-color: #9e9e9e; }
                .ptw-section-8 h3 i { color: #616161; background: rgba(158, 158, 158, 0.1); }
                
                .ptw-section-9 { background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-color: #03a9f4; }
                .ptw-section-9 h3 { color: #0277bd; border-color: #03a9f4; }
                .ptw-section-9 h3 i { color: #0288d1; background: rgba(3, 169, 244, 0.1); }
                
                .ptw-closure-approval-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .ptw-closure-approval-table thead th {
                    background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%);
                    color: #01579b;
                    font-weight: bold;
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #0288d1;
                }
                .ptw-closure-approval-table tbody td {
                    padding: 12px;
                    text-align: right;
                    border: 1px solid #b0bec5;
                    background: white;
                }
                .ptw-closure-approval-table tbody tr:first-child td:first-child,
                .ptw-closure-approval-table tbody tr:last-child td:first-child {
                    font-weight: bold;
                    background: #f5f5f5;
                    color: #424242;
                }
                .ptw-closure-approval-table tbody td input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .ptw-paper-theme .ptw-form-section {
                    background: #000 !important;
                    border: 1px solid #4b5563 !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    margin-bottom: 16px !important;
                    padding: 12px !important;
                }
                .ptw-paper-theme .ptw-form-section:hover {
                    box-shadow: none !important;
                    transform: none !important;
                }
                .ptw-paper-theme .ptw-form-section h3 {
                    margin: -12px -12px 12px !important;
                    padding: 10px 12px !important;
                    border: 1px solid #9ca3af !important;
                    background: #cbd5e1 !important;
                    color: #111827 !important;
                    justify-content: center !important;
                    font-size: 1rem !important;
                }
                .ptw-paper-theme .ptw-form-section h3 i {
                    background: transparent !important;
                    font-size: 0.95rem !important;
                    padding: 0 !important;
                }
                .ptw-paper-theme label {
                    color: #e5e7eb !important;
                }
                .ptw-paper-theme .form-input,
                .ptw-paper-theme textarea,
                .ptw-paper-theme select,
                .ptw-paper-theme input[type="text"],
                .ptw-paper-theme input[type="datetime-local"] {
                    background: #f9fafb !important;
                    color: #111827 !important;
                    border: 1px solid #9ca3af !important;
                }
                .ptw-paper-theme .data-table {
                    width: 100%;
                    border-collapse: collapse !important;
                    table-layout: fixed;
                    background: #000;
                    border: 1.2px solid #9ca3af;
                }
                .ptw-paper-theme .data-table th,
                .ptw-paper-theme .data-table td {
                    border: 1.2px solid #9ca3af !important;
                    min-height: 42px;
                    padding: 8px 10px !important;
                    vertical-align: middle;
                }
                .ptw-paper-theme .data-table thead th {
                    background: #cbd5e1 !important;
                    color: #111827 !important;
                    font-weight: 700;
                    font-size: 13px;
                    line-height: 1.35;
                }
                .ptw-paper-theme .data-table tbody td {
                    background: #000 !important;
                    color: #f3f4f6 !important;
                    font-size: 13px;
                    line-height: 1.35;
                }
                .ptw-paper-theme .grid,
                .ptw-paper-theme .space-y-6,
                .ptw-paper-theme .space-y-4 {
                    row-gap: 14px !important;
                }
                .ptw-paper-theme .card-body {
                    padding: 12px !important;
                }
                @media (max-width: 1024px) {
                    .ptw-paper-header {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 8px;
                    }
                    .ptw-paper-header-left,
                    .ptw-paper-header-right {
                        justify-content: center;
                        text-align: center;
                    }
                    .ptw-paper-theme .data-table th,
                    .ptw-paper-theme .data-table td {
                        min-height: 38px;
                        padding: 7px 8px !important;
                        font-size: 12px !important;
                    }
                }
                @media (max-width: 768px) {
                    .ptw-paper-theme .ptw-form-section {
                        margin-bottom: 12px !important;
                        padding: 10px !important;
                    }
                    .ptw-paper-theme .ptw-form-section h3 {
                        margin: -10px -10px 10px !important;
                        font-size: 0.92rem !important;
                        padding: 8px 10px !important;
                    }
                    .ptw-paper-theme .table-wrapper {
                        overflow-x: auto;
                    }
                    .ptw-paper-theme .data-table {
                        min-width: 760px;
                    }
                }
                /* \u0642\u0641\u0644 \u0628\u0635\u0631\u064A \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0631\u062C\u0639\u064A: \u0625\u0632\u0627\u0644\u0629 \u0623\u064A \u0632\u062E\u0627\u0631\u0641 \u0623\u0648 \u062A\u062F\u0631\u062C\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629 */
                .ptw-paper-theme * {
                    border-radius: 0 !important;
                    box-shadow: none !important;
                }
                .ptw-paper-theme .card-header {
                    background: #000 !important;
                    border: 1px solid #9ca3af !important;
                    margin-bottom: 12px !important;
                }
                .ptw-paper-theme .card-title,
                .ptw-paper-theme .text-gray-700,
                .ptw-paper-theme .text-gray-800,
                .ptw-paper-theme .text-gray-600,
                .ptw-paper-theme .text-gray-500,
                .ptw-paper-theme .font-medium,
                .ptw-paper-theme .font-semibold {
                    color: #e5e7eb !important;
                }
                .ptw-paper-theme .bg-red-50,
                .ptw-paper-theme .bg-blue-50,
                .ptw-paper-theme .bg-yellow-50,
                .ptw-paper-theme .bg-green-50,
                .ptw-paper-theme .bg-gray-50,
                .ptw-paper-theme .bg-white,
                .ptw-paper-theme .from-blue-100,
                .ptw-paper-theme .to-purple-100,
                .ptw-paper-theme .from-blue-50,
                .ptw-paper-theme .to-white {
                    background: #000 !important;
                }
                .ptw-paper-theme .border,
                .ptw-paper-theme [class*="border-"] {
                    border-color: #9ca3af !important;
                }
                .ptw-paper-theme .ptw-permit-disclaimer {
                    margin: 0 0 10px 0 !important;
                }
                .ptw-paper-theme #ptw-disclaimer-font-decrease,
                .ptw-paper-theme #ptw-disclaimer-font-reset,
                .ptw-paper-theme #ptw-disclaimer-font-increase,
                .ptw-paper-theme #ptw-disclaimer-font-size-display {
                    display: none !important;
                }
                .ptw-paper-theme #ptw-permit-disclaimer-text {
                    background: #000 !important;
                    color: #f3f4f6 !important;
                    border: 1px solid #9ca3af !important;
                    min-height: 92px !important;
                    line-height: 1.8 !important;
                }
                .ptw-paper-theme .btn-secondary,
                .ptw-paper-theme .btn-primary {
                    border-radius: 0 !important;
                }
            </style>
            <div class="content-card bg-gray-50 border-none shadow-none">
                ${this.renderPermitSystemHeader()}
                <div class="card-header bg-white shadow-sm rounded-xl border border-gray-100 mb-6 p-4 flex items-center justify-between ptw-form-header-centered" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white;">
                    <h2 class="card-title text-xl" style="color: white; font-weight: 700;">
                        <span class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white bg-opacity-20 ml-3 shadow-sm">
                             <i class="fas fa-${a?"edit":"plus"}"></i>
                        </span>
                        ${a?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F"}
                    </h2>
                    <div class="text-xs font-mono bg-white bg-opacity-20 px-3 py-1 rounded-full ptw-form-id-badge" style="color: white;">
                        ${e?.id||"\u0645\u0633\u0648\u062F\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </div>
                </div>
                
                <div class="card-body p-0">
                    <form id="ptw-form" class="space-y-6">
                        
                        <!-- \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646/\u0627\u0644\u062A\u0646\u0628\u064A\u0647 -->
                        <div class="ptw-permit-disclaimer" style="margin: 0 24px 0 24px; padding: 0;">
                            <div class="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border-r-4 border-l-4 border-b-0 border-t-0 border-blue-600 rounded-t-xl shadow-md transition-all duration-300 p-5 relative overflow-hidden" 
                                style="border-right-width: 4px; border-left-width: 4px; border-bottom-width: 0; border-top-width: 0; position: relative; margin-bottom: 0;">
                                <!-- \u062E\u0644\u0641\u064A\u0629 \u0632\u062E\u0631\u0641\u064A\u0629 -->
                                <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
                                
                                <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u062D\u062C\u0645 \u0627\u0644\u062E\u0637 -->
                                <div class="flex items-center justify-between mb-3 pb-2 border-b border-blue-300">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-semibold text-blue-800">
                                            <i class="fas fa-text-height ml-1"></i>
                                            \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:
                                        </span>
                                        <span id="ptw-disclaimer-font-size-display" class="text-sm font-bold text-blue-700 bg-white px-2 py-1 rounded border border-blue-400 min-w-[40px] text-center shadow-sm">15</span>
                                        <span class="text-xs text-gray-600">px</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button type="button" id="ptw-disclaimer-font-decrease" 
                                            class="btn-icon btn-icon-secondary text-blue-700 hover:bg-blue-200 border border-blue-400 rounded-lg p-2 transition-all duration-200 hover:scale-110 shadow-sm" 
                                            title="\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u062E\u0637">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <button type="button" id="ptw-disclaimer-font-reset" 
                                            class="btn-icon btn-icon-secondary text-blue-700 hover:bg-blue-200 border border-blue-400 rounded-lg p-2 transition-all duration-200 hover:scale-110 shadow-sm" 
                                            title="\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646">
                                            <i class="fas fa-redo"></i>
                                        </button>
                                        <button type="button" id="ptw-disclaimer-font-increase" 
                                            class="btn-icon btn-icon-secondary text-blue-700 hover:bg-blue-200 border border-blue-400 rounded-lg p-2 transition-all duration-200 hover:scale-110 shadow-sm" 
                                            title="\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u062E\u0637">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- \u062D\u0642\u0644 \u0627\u0644\u0646\u0635 -->
                                <textarea id="ptw-permit-disclaimer-text" 
                                    class="w-full text-center text-gray-900 font-medium leading-relaxed resize-y min-h-[100px] border-2 border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 p-4 bg-gradient-to-br from-white to-blue-50 shadow-inner transition-all duration-200" 
                                    style="font-size: 15px; line-height: 2.2; color: #1e3a5f; text-align: center; font-weight: 500; letter-spacing: 0.3px;"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0647\u0646\u0627...">${p(e?.permitDisclaimer||`\u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647
\u0648\u0644\u0627 \u064A\u062C\u0648\u0632 \u0628\u0623\u064A \u062D\u0627\u0644 \u0645\u0646 \u0627\u0644\u0623\u062D\u0648\u0627\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0644\u0623\u064A \u0639\u0645\u0644 \u0622\u062E\u0631 \u0644\u0645 \u064A\u062A\u0645 \u0648\u0635\u0641\u0647
\u0648\u0639\u0644\u064A\u0647 \u0641\u0625\u0646\u0647 \u064A\u062C\u0628 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0645\u062F\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0648\u0641\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0644\u0639\u0645\u0644 \u0641\u064A\u0647 \u0641\u0642\u0637.`)}</textarea>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="ptw-form-section ptw-section-1" style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
                             <h3>
                                <i class="fas fa-info-circle"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span>
                             </h3>
                            <div class="ptw-s1-layout">
                                <div class="ptw-s1-row ptw-s1-meta-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645 <span class="text-red-500">*</span></label>
                                    <select id="ptw-location" name="location" required class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</option>
                                        ${this.getSiteOptions().map(v=>`
                                            <option value="${Utils.escapeHTML(v.id)}" ${e&&(e.locationId===v.id||e.locationId===String(v.id)||e.siteId===v.id||e.siteId===String(v.id)||e.location===v.id&&!e.locationId&&!e.siteId)?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div id="ptw-sublocation-wrapper" style="display: ${e?.locationId||e?.siteId||e?.location?"block":"none"};">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="ptw-sublocation" name="sublocation" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${this.getPlaceOptions(e?.locationId||e?.siteId||e?.location||"").map(v=>`
                                            <option value="${Utils.escapeHTML(v.id)}" ${e&&(e.sublocationId===v.id||e.sublocationId===String(v.id)||e.sublocation===v.id&&!e.sublocationId||e.sublocationName===v.name)?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="ptw-startDate" name="startDate" required class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                        value="${e?.startDate?Utils.toDateTimeLocalString(e.startDate):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="ptw-endDate" name="endDate" required class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                        value="${e?.endDate?Utils.toDateTimeLocalString(e.endDate):""}">
                                </div>
                                </div>
                                <div class="ptw-s1-row ptw-s1-parties-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</label>
                                    ${D?`
                                        <div class="relative">
                                            <select id="ptw-authorizedParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</option>
                                                ${N.map(v=>`
                                                    <option value="${Utils.escapeHTML(v.name||"")}" ${W===v.name?"selected":""}>
                                                        ${Utils.escapeHTML(v.name||"")}
                                                    </option>
                                                `).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${p(W)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${p(W)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                    `}
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    ${T?`
                                        <div class="relative">
                                            <select id="ptw-requestingParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>
                                                ${H.map(v=>`<option value="${p(v)}" ${$===v?"selected":""}>${p(v)}</option>`).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${p($)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${p($)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                    `}
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment ptw-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="ptw-equipment-matrix" class="ptw-form-equipment-body">
                                        ${w}
                                    </div>
                                    <div class="ptw-form-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="ptw-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${p(P.manualNotes||"")}</textarea>
                                    </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-tools">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</label>
                                    <textarea id="ptw-tools" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F">${p(e?.tools||e?.toolsList)}</textarea>
                                </div>
                                <div class="ptw-s1-block ptw-s1-work-desc">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 <span class="text-red-500">*</span></label>
                                    <textarea id="ptw-workDescription" name="workDescription" required class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="3"
                                            placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0639\u0645\u0644">${p(e?.workDescription)}</textarea>
                                </div>
                            </div>
                        </div>

                         <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A: \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644 -->
                        <div class="ptw-form-section ptw-section-2">
                            <h3>
                                <i class="fas fa-users"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</span>
                            </h3>
                            <p class="text-sm text-gray-600 mb-4 bg-white p-2 rounded border border-gray-100 inline-block">
                                <i class="fas fa-info-circle text-teal-500 ml-1"></i>
                                \u0623\u062F\u062E\u0644 \u0623\u0633\u0645\u0627\u0621 \u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0646\u0634\u0627\u0637
                            </p>
                            <div id="team-members-list" class="space-y-3">
                                ${ee}
                            </div>
                            <button type="button" id="add-team-member-btn" class="btn-secondary mt-4 hover:bg-teal-50 text-teal-700 border-teal-200">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0641\u0631\u062F \u062C\u062F\u064A\u062F
                            </button>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B: \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 -->
                        <div class="ptw-form-section ptw-section-3">
                            <h3>
                                <i class="fas fa-clipboard-check"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B : \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                                    <h4 class="font-bold text-red-800 mb-3 border-b border-red-200 pb-2">\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629</h4>
                                    <div class="space-y-2">
                                        ${Y(S,c,"ptw-hot",f)}
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 class="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</h4>
                                    <div class="space-y-2">
                                        ${Y(B,u,"ptw-confined",y)}
                                    </div>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 class="font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</h4>
                                    <div class="space-y-2">
                                        ${Y(O,m,"ptw-height",g)}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</label>
                                    <input type="text" id="ptw-electrical-work-type" class="form-input" value="${p(e?.electricalWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</label>
                                    <input type="text" id="ptw-cold-work-type" class="form-input" value="${p(e?.coldWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</label>
                                    <input type="text" id="ptw-other-work-type" class="form-input" value="${p(e?.otherWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649 (\u0625\u0646 \u0648\u062C\u062F\u062A)">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <div class="md:col-span-4 font-bold text-yellow-800 mb-2 flex items-center">
                                    <i class="fas fa-digging ml-2"></i>
                                    \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631 (\u0625\u0646 \u0648\u062C\u062F)
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0637\u0648\u0644 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-length" class="form-input" value="${p(e?.excavationLength)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0631\u0636 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-width" class="form-input" value="${p(e?.excavationWidth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0645\u0642 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-depth" class="form-input" value="${p(e?.excavationDepth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</label>
                                    <input type="text" id="ptw-excavation-soil" class="form-input" value="${p(e?.soilType)}" placeholder="\u0645\u062B\u0627\u0644: \u0631\u0645\u0644\u064A\u0629">
                                </div>
                            </div>
                        </div>

                         <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639: \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A -->
                        <div class="ptw-form-section ptw-section-4">
                            <h3>
                                <i class="fas fa-tasks"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-preStartChecklist" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.preStartChecklist?"checked":""}>
                                    <span class="font-medium">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-lotoApplied" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.lotoApplied?"checked":""}>
                                    <span class="font-medium">\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-governmentPermits" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.governmentPermits?"checked":""}>
                                    <span class="font-medium">\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-riskAssessmentAttached" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.riskAssessmentAttached?"checked":""}>
                                    <span class="font-medium">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-gasTesting" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.gasTesting?"checked":""}>
                                    <span class="font-medium">\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-mocRequest" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${e?.mocRequest?"checked":""}>
                                    <span class="font-medium">\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)</span>
                                </label>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633: \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 -->
                        <div class="ptw-form-section ptw-section-5">
                            <h3>
                                <i class="fas fa-hard-hat"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</span>
                            </h3>
                            <div id="ptw-ppe-matrix" class="bg-gray-50 rounded-lg p-2">
                                ${typeof PPEMatrix<"u"?PPEMatrix.generate("ptw-ppe-matrix"):'<div class="text-center p-4 text-gray-500">\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0645\u0644\u0629</div>'}
                            </div>
                            ${e?.requiredPPE&&e.requiredPPE.length>0?`
                                <script>
                                    setTimeout(() => {
                                        if (typeof PPEMatrix !== 'undefined') {
                                            PPEMatrix.setSelected(${JSON.stringify(e.requiredPPE)});
                                        }
                                    }, 100);
                                <\/script>
                            `:""}
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633: \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 -->
                        <div class="ptw-form-section ptw-section-6">
                            <h3>
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633 : \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</span>
                            </h3>
                            <div id="ptw-risk-matrix" class="bg-white rounded-lg p-2">
                                ${typeof RiskMatrix<"u"?RiskMatrix.generate("ptw-risk-matrix",{selectedLikelihood:e?.riskAssessment?.likelihood?parseInt(e.riskAssessment.likelihood):null,selectedConsequence:e?.riskAssessment?.consequence?parseInt(e.riskAssessment.consequence):null,interactive:!0}):`
                                    <div class="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                        <i class="fas fa-exclamation-triangle text-4xl text-gray-400 mb-3"></i>
                                        <p class="text-gray-600 font-semibold mb-2">\u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                                        <p class="text-sm text-gray-500">\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u0648\u0646 RiskMatrix</p>
                                    </div>
                                `}
                            </div>
                            ${e?.riskAssessment&&(e.riskAssessment.likelihood||e.riskAssessment.consequence)?`
                                <script>
                                    (function() {
                                        const likelihood = ${e.riskAssessment.likelihood?parseInt(e.riskAssessment.likelihood):"null"};
                                        const consequence = ${e.riskAssessment.consequence?parseInt(e.riskAssessment.consequence):"null"};
                                        setTimeout(() => {
                                            if (typeof RiskMatrix !== 'undefined') {
                                                const matrixContainer = document.getElementById('ptw-risk-matrix');
                                                if (matrixContainer) {
                                                    const cells = matrixContainer.querySelectorAll('.risk-matrix-cell');
                                                    cells.forEach(cell => {
                                                        const cellLikelihood = cell.getAttribute('data-likelihood') || cell.getAttribute('data-probability');
                                                        const cellConsequence = cell.getAttribute('data-consequence') || cell.getAttribute('data-severity');
                                                        if (cellLikelihood && cellConsequence && 
                                                            likelihood !== null && consequence !== null &&
                                                            parseInt(cellLikelihood) === parseInt(likelihood) && 
                                                            parseInt(cellConsequence) === parseInt(consequence)) {
                                                            cell.classList.add('selected');
                                                            cell.setAttribute('data-selected', 'true');
                                                        }
                                                    });
                                                }
                                            }
                                        }, 300);
                                    })();
                                <\/script>
                            `:""}
                            <div class="mt-4 bg-red-50 p-4 rounded-lg border border-red-100">
                                <label class="block text-sm font-bold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</label>
                                <textarea id="ptw-risk-notes" class="form-input bg-white" rows="3"
                                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629">${p(e?.riskNotes)}</textarea>
                                
                                <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 \u0644\u062D\u0641\u0638 \u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 -->
                                <input type="hidden" id="ptw-risk-likelihood" value="${e?.riskAssessment?.likelihood||""}">
                                <input type="hidden" id="ptw-risk-consequence" value="${e?.riskAssessment?.consequence||""}">
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639: \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A -->
                        <div class="ptw-form-section ptw-section-7">
                            <h3>
                                <i class="fas fa-signature"></i>
                                <span>${i?"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A":"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A"}</span>
                            </h3>
                            ${i?`
                                <!-- \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A: \u0639\u0631\u0636 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 -->
                                <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A - \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621
                                </div>
                                ${(()=>{const v=e?.manualApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
                                        <div class="table-wrapper" style="overflow-x: auto;">
                                            <table class="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>\u0627\u0644\u062F\u0648\u0631</th>
                                                        <th>\u0627\u0644\u0627\u0633\u0645</th>
                                                        <th>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${v.map(E=>`
                                                        <tr>
                                                            <td>${Utils.escapeHTML(E.role||"")}</td>
                                                            <td>${Utils.escapeHTML(E.name||"-")}</td>
                                                            <td>${Utils.escapeHTML(E.signature||"-")}</td>
                                                        </tr>
                                                    `).join("")}
                                                </tbody>
                                            </table>
                                        </div>
                                    `})()}
                            `:`
                                <input type="hidden" id="approval-circuit-owner-id" value="${this.formCircuitOwnerId||""}">
                                ${o?`<div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center"><i class="fas fa-route ml-2"></i>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062D\u0627\u0644\u064A: <strong>${Utils.escapeHTML(o)}</strong></div>`:""}

                                <div id="approval-matrix" class="space-y-4 bg-white rounded-lg border border-gray-100 p-2">
                                    ${this.renderApprovalMatrix(s,a)}
                                </div>
                                ${a?'<button type="button" id="add-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
                            `}
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646: \u0627\u0644\u0625\u063A\u0644\u0627\u0642 -->
                        <div class="ptw-form-section ptw-section-8">
                            <h3>
                                <i class="fas fa-lock"></i>
                                <span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0645\u0646 : \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</span>
                            </h3>
                            
                            <!-- \u0627\u0644\u0646\u0635 \u0627\u0644\u0648\u0635\u0641\u064A -->
                            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition-all duration-300" style="display: flex; align-items: center; justify-content: center; min-height: 100px;">
                                <p class="text-gray-800 text-base leading-relaxed mb-0 font-medium" style="text-align: center; line-height: 2.2; max-width: 90%; color: #1e40af; font-size: 16px; letter-spacing: 0.3px;">
                                    <i class="fas fa-check-circle text-green-600 ml-2" style="font-size: 18px;"></i>
                                    \u062A\u0645 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644 \u062D\u062A\u0649 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0648\u062A\u0645 \u0641\u062D\u0635 \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062C\u0627\u0648\u0631\u0629 \u0644\u0647 \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062E\u0644\u0648\u0647\u0627 \u0645\u0646 \u0627\u0644\u0623\u062E\u0637\u0627\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644 \u062D\u062F\u0648\u062B\u0647\u0627 \u0648\u0630\u0644\u0643 \u0628\u0639\u062F \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0645\u0646 \u0627\u0644\u0639\u0645\u0644
                                    <i class="fas fa-check-circle text-green-600 mr-2" style="font-size: 18px;"></i>
                                </p>
                            </div>
                            
                            <!-- \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <label class="flex items-center space-x-2 space-x-reverse cursor-pointer bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200 hover:bg-opacity-80 transition-all">
                                    <input type="radio" name="ptw-closure-status" value="completed" class="form-radio text-green-600 h-5 w-5" ${U==="completed"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646</span>
                                </label>
                                <label class="flex items-center space-x-2 space-x-reverse cursor-pointer bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200 hover:bg-opacity-80 transition-all">
                                    <input type="radio" name="ptw-closure-status" value="notCompleted" class="form-radio text-yellow-600 h-5 w-5" ${U==="notCompleted"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center space-x-2 space-x-reverse cursor-pointer bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200 hover:bg-opacity-80 transition-all">
                                    <input type="radio" name="ptw-closure-status" value="forced" class="form-radio text-red-600 h-5 w-5" ${U==="forced"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A</span>
                                </label>
                            </div>
                            
                            <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0627\u0639\u0629:</label>
                                    <input type="datetime-local" id="ptw-closure-time" class="form-input" value="${F}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label>
                                    <input type="text" id="ptw-closure-reason" class="form-input" value="${p(_)}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642">
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639: \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                        <div class="ptw-form-section ptw-section-9">
                            <h3>
                                <i class="fas fa-check-circle"></i>
                                <span>${i?"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A":"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}</span>
                            </h3>
                            ${i?`
                                <!-- \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A: \u0639\u0631\u0636 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 -->
                                <div class="bg-green-50 text-green-700 px-4 py-2 rounded mb-4 inline-flex items-center">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A - \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u064A\u062F\u0648\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621
                                </div>
                                ${(()=>{const v=e?.manualClosureApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
                                        <div class="table-wrapper" style="overflow-x: auto;">
                                            <table class="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>\u0627\u0644\u062F\u0648\u0631</th>
                                                        <th>\u0627\u0644\u0627\u0633\u0645</th>
                                                        <th>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${v.map(E=>`
                                                        <tr>
                                                            <td>${Utils.escapeHTML(E.role||"")}</td>
                                                            <td>${Utils.escapeHTML(E.name||"-")}</td>
                                                            <td>${Utils.escapeHTML(E.signature||"-")}</td>
                                                        </tr>
                                                    `).join("")}
                                                </tbody>
                                            </table>
                                        </div>
                                    `})()}
                            `:`
                                ${(()=>{const v=n.approvals||[];this.formClosureApprovals=v.map(K=>Object.assign({},K)),this.formClosureCircuitOwnerId=n.circuitOwnerId||"__default__";const E=n.circuitName||"";return this.formClosureCircuitName=E,`
                                        <input type="hidden" id="closure-approval-circuit-owner-id" value="${this.formClosureCircuitOwnerId||""}">
                                        ${E?`<div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center"><i class="fas fa-route ml-2"></i>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062D\u0627\u0644\u064A: <strong>${Utils.escapeHTML(E)}</strong></div>`:""}

                                        <div id="closure-approval-matrix" class="space-y-4 bg-white rounded-lg border border-gray-100 p-2">
                                            ${this.renderClosureApprovalMatrix(v,a)}
                                        </div>
                                        ${a?'<button type="button" id="add-closure-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
                                    `})()}
                            `}
                        </div>

                        <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                        <div class="pt-8 mt-8 border-t-2 border-gray-300 bg-gradient-to-b from-gray-50 to-white rounded-lg p-6 shadow-md" style="position: relative; z-index: 10; margin-top: 2rem !important; padding-top: 2rem !important; display: block !important; visibility: visible !important;">
                            <div class="flex items-center justify-center gap-4 flex-wrap" style="display: flex !important; visibility: visible !important; justify-content: center !important;">
                                <button type="button" id="cancel-ptw-btn" class="btn-secondary px-6 py-3 min-w-[120px]" style="display: inline-flex !important; visibility: visible !important; opacity: 1 !important;">
                                    <i class="fas fa-times ml-2"></i>
                                    \u0625\u0644\u063A\u0627\u0621
                                </button>
                                <button type="button" id="print-ptw-btn" class="btn-secondary px-6 py-3 min-w-[120px]" style="display: inline-flex !important; visibility: visible !important; opacity: 1 !important;">
                                    <i class="fas fa-print ml-2"></i>
                                    \u0637\u0628\u0627\u0639\u0629
                                </button>
                                <button type="submit" class="btn-primary px-8 py-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all min-w-[160px]" style="display: inline-flex !important; visibility: visible !important; opacity: 1 !important;">
                                    <i class="fas fa-save ml-2"></i>
                                    ${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `},renderApprovalMatrix(e=[],a=!1){return e=this.normalizeApprovals(e),this.formApprovals=e.map((i,r)=>Object.assign({},i,{order:r})),`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A</th>
                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody id="approvals-tbody">
                        ${e.map((i,r)=>`
                            <tr data-approval-index="${r}" data-required="${i.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(i.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="approval-role-${r}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(i,r,a)}
                                </td>
                                <td>
                                    ${(()=>{const s=i.status==="approved"?"badge-success":i.status==="rejected"?"badge-danger":"badge-warning",o=i.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":i.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${s}">${o}</span>`})()}
                                    <input type="hidden" id="approval-status-${r}" value="${i.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${i.date?Utils.toDateTimeLocalString(i.date):""}"
                                        id="approval-date-${r}" ${a?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(i.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="approval-comments-${r}" >
                                </td>
                                <td>
                                    ${i.candidates&&i.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},renderClosureApprovalMatrix(e=[],a=!1){return e=this.normalizeApprovals(e),this.formClosureApprovals||(this.formClosureApprovals=[]),this.formClosureApprovals=e.map((i,r)=>Object.assign({},i,{order:r})),`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A</th>
                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody id="closure-approvals-tbody">
                        ${e.map((i,r)=>`
                            <tr data-closure-approval-index="${r}" data-required="${i.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(i.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="closure-approval-role-${r}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(i,r,a,"closure-approval")}
                                </td>
                                <td>
                                    ${(()=>{const s=i.status==="approved"?"badge-success":i.status==="rejected"?"badge-danger":"badge-warning",o=i.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":i.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${s}">${o}</span>`})()}
                                    <input type="hidden" id="closure-approval-status-${r}" value="${i.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${i.date?Utils.toDateTimeLocalString(i.date):""}"
                                        id="closure-approval-date-${r}" ${a?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(i.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="closure-approval-comments-${r}" >
                                </td>
                                <td>
                                    ${i.candidates&&i.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},getStatusBadgeClass(e){return{\u0645\u0641\u062A\u0648\u062D:"warning","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"info","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"success",\u0645\u0631\u0641\u0648\u0636:"danger",\u0645\u063A\u0644\u0642:"secondary"}[e]||"secondary"},setupEventListeners(e=null){setTimeout(()=>{const a=document.getElementById("ptw-refresh-header-btn");if(a){a.replaceWith(a.cloneNode(!0));const S=document.getElementById("ptw-refresh-header-btn");S&&S.addEventListener("click",()=>this.refreshCurrentTab())}const i=document.getElementById("add-ptw-btn"),r=document.getElementById("add-manual-ptw-btn"),s=document.getElementById("add-ptw-empty-btn");if(i)if(i.parentNode&&document.body.contains(i))try{i.replaceWith(i.cloneNode(!0));const S=document.getElementById("add-ptw-btn");S&&S.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()})}catch(S){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0644\u0632\u0631 add-ptw-btn:",S),i.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()})}else i.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()});if(r)if(r.parentNode&&document.body.contains(r))try{r.replaceWith(r.cloneNode(!0));const S=document.getElementById("add-manual-ptw-btn");S&&S.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A"),this.openManualPermitForm()})}catch{r.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A"),this.openManualPermitForm()})}else r.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A"),this.openManualPermitForm()});if(s)if(s.parentNode&&document.body.contains(s))try{s.replaceWith(s.cloneNode(!0));const S=document.getElementById("add-ptw-empty-btn");S&&S.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()})}catch(S){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0644\u0632\u0631 add-ptw-empty-btn:",S),s.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()})}else s.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()});const o=document.getElementById("ptw-search"),n=document.getElementById("ptw-filter-status"),l=document.getElementById("ptw-filter-work-type"),p=document.getElementById("ptw-filter-location"),d=document.getElementById("ptw-filter-sublocation"),c=document.getElementById("ptw-filter-date-from"),u=document.getElementById("ptw-filter-date-to"),m=()=>this.filterItems();o&&o.addEventListener("input",m),n&&n.addEventListener("change",m),l&&l.addEventListener("change",m),p&&p.addEventListener("change",()=>{this.updateSublocationFilterOptions(),m()}),d&&d.addEventListener("change",m),c&&c.addEventListener("change",m),u&&u.addEventListener("change",m);const f=document.getElementById("ptw-reset-filters");f&&f.addEventListener("click",()=>{o&&(o.value=""),n&&(n.value=""),l&&(l.value=""),p&&(p.value=""),d&&(d.value=""),c&&(c.value=""),u&&(u.value=""),this.updateSublocationFilterOptions(),this.filterItems()});const y=document.getElementById("ptw-refresh-list");y&&y.addEventListener("click",()=>this.loadPTWList(!0));const g=document.getElementById("ptw-form");g&&g.addEventListener("submit",S=>this.handleSubmit(S));const x=document.getElementById("cancel-ptw-btn");x&&x.addEventListener("click",()=>this.showList());const k=document.getElementById("print-ptw-btn");k&&k.addEventListener("click",()=>{this.printPermitForm()});const P=document.getElementById("add-approval-btn");P&&P.addEventListener("click",()=>this.addApproval());const w=document.getElementById("add-closure-approval-btn");w&&w.addEventListener("click",()=>this.addClosureApproval()),this._setupSystemApproverPickerListeners(document.getElementById("approval-matrix")),this._setupSystemApproverPickerListeners(document.getElementById("closure-approval-matrix")),this.setupDisclaimerFontControls();const U=document.getElementById("add-team-member-btn");U&&U.addEventListener("click",()=>this.addTeamMemberRow()),document.querySelectorAll("[data-toggle-target]").forEach(S=>{const B=S.getAttribute("data-toggle-target");if(!B)return;const O=document.querySelector(B);if(!O)return;const Y=()=>{S.checked?O.classList.remove("hidden"):O.classList.add("hidden")};S.addEventListener("change",Y),Y()});const _=document.getElementById("ptw-location"),N=document.getElementById("ptw-sublocation-wrapper"),D=document.getElementById("ptw-sublocation");if(_&&N&&D){const S=()=>{try{const B=_.value;if(B){N.style.display="block";const O=this.getPlaceOptions(B),Y=D.value;D.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+O.map(ee=>{let v=Y===ee.id;return!v&&e&&(v=e.sublocation===ee.id||e.sublocationId===ee.id||e.sublocationName===ee.name||e.locationName===ee.name),`<option value="${Utils.escapeHTML(ee.id)}" ${v?"selected":""}>${Utils.escapeHTML(ee.name)}</option>`}).join("")}else N.style.display="none",D.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',D.value=""}catch(B){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:",B)}};_.addEventListener("change",S),S()}const W=document.getElementById("ptw-authorizedParty-select"),H=document.getElementById("ptw-authorizedParty");W&&H&&(W.addEventListener("change",()=>{W.value==="__custom__"?(H.classList.remove("hidden"),W.classList.add("hidden"),H.focus()):W.value?(H.classList.add("hidden"),H.value=W.value):(H.classList.add("hidden"),H.value="")}),H.value&&!Array.from(W.options).some(S=>S.value===H.value)?(H.classList.remove("hidden"),W.classList.add("hidden")):W.value&&W.value!=="__custom__"&&(H.value=W.value));const T=document.getElementById("ptw-requestingParty-select"),$=document.getElementById("ptw-requestingParty");T&&$&&(T.addEventListener("change",()=>{T.value==="__custom__"?($.classList.remove("hidden"),T.classList.add("hidden"),$.focus()):T.value?($.classList.add("hidden"),$.value=T.value):($.classList.add("hidden"),$.value="")}),$.value&&!Array.from(T.options).some(S=>S.value===$.value.trim())?($.classList.remove("hidden"),T.classList.add("hidden")):T.value&&T.value!=="__custom__"&&($.value=T.value)),this.updateStatusField()},100)},currentEditId:null,async showForm(e=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}this.currentEditId=e?.id||null;const a=document.createElement("div");a.className="modal-overlay",a.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;";const i=await this.renderForm(e);a.innerHTML=`
            <div class="modal-content ptw-manual-permit-modal" style="max-width: 1400px; width: 98%; max-height: 95vh; overflow-y: auto; padding: 0; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-plus" style="font-size: 1.5rem;"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: white;">
                                ${e?.id?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F"}
                            </h2>
                            <p style="font-size: 0.875rem; opacity: 0.8; margin: 4px 0 0 0;">
                                <i class="fas fa-info-circle ml-1"></i>
                                ${e?.id?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u062F\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F \u0645\u0639 \u062F\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"}
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button type="button" class="btn btn-sm" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; padding: 8px 12px;" onclick="this.closest('.modal-overlay').remove();">
                            <i class="fas fa-times ml-1"></i>
                            \u0625\u063A\u0644\u0627\u0642
                        </button>
                    </div>
                </div>

                <!-- \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div class="modal-body" id="ptw-form-modal-body" style="padding: 0;">
                    ${i}
                </div>
            </div>
        `,document.body.appendChild(a),this.setupEventListeners(e),setTimeout(()=>{const r=a.querySelector('input:not([type="hidden"]), select, textarea');r&&r.focus()},100)},async showList(){this.currentEditId=null,this.switchTab("permits"),await new Promise(a=>setTimeout(a,50));const e=document.getElementById("ptw-permits-content")||document.getElementById("ptw-content");e&&(e.style.display="block",e.style.visibility="visible",e.style.opacity="1",e.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadPTWList(!0),setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))},async handleSubmit(e){if(e.preventDefault(),this._isSubmitting){Notification.info(this._t("module.ptw.notify.waitRequest","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0633\u0627\u0628\u0642\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const a=e.target?.querySelector('button[type="submit"]')||document.querySelector('#ptw-form button[type="submit"]')||e.target?.closest("form")?.querySelector('button[type="submit"]');if(a&&a.disabled)return;this._isSubmitting=!0;let i="";a&&(i=a.innerHTML,a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const r=!this.currentEditId,s=[];document.querySelectorAll("#approvals-tbody tr").forEach(($,S)=>{const B=Array.isArray(this.formApprovals)?this.formApprovals[S]||{}:{},Y=document.getElementById(`approval-role-${S}`)?.value.trim()||B.role||"",ee=$.getAttribute("data-required")!=="false",v=document.getElementById(`approval-approver-select-${S}`);let E=B.approverId||"",K=B.approver||"",C=B.approverEmail||"";if(v)if(E=v.value||"",E==="__manual__")E="",K=document.getElementById(`approval-approver-manual-${S}`)?.value.trim()||"",C="";else if(E){const re=(B.candidates||[]).find(ae=>ae.id===E);if(re)K=re.name||"",C=re.email||"";else{const ae=ApprovalCircuits.getUserById(E);ae&&(K=ae.name||ae.email||K,C=ae.email||C)}}else K="",C="";else K=document.getElementById(`approval-approver-${S}`)?.value.trim()||K;const V=document.getElementById(`approval-status-${S}`)?.value||B.status||"pending",z=document.getElementById(`approval-date-${S}`)?.value||"",le=document.getElementById(`approval-comments-${S}`)?.value.trim()||"";Y&&s.push({role:Y,approver:K,approverId:E,approverEmail:C,status:V,approved:V==="approved",rejected:V==="rejected",date:z?new Date(z).toISOString():B.date||"",comments:le,order:S,required:ee,candidates:Array.isArray(B.candidates)?B.candidates:[],history:Array.isArray(B.history)?B.history:[],assignedAt:B.assignedAt||"",assignedBy:B.assignedBy||null,isSafetyOfficer:B.isSafetyOfficer===!0,circuitOwnerId:B.circuitOwnerId||this.formCircuitOwnerId||"__default__",issuingAuthoritySource:B.issuingAuthoritySource===!0,approvalRoleKey:B.approvalRoleKey||this._resolveIaRoleKey(Y),isManualApprover:!E&&!!K,personType:E&&(B.candidates||[]).find(re=>re.id===E)?.personType||"",requiresHseCoApproval:B.requiresHseCoApproval===!0,isHseCoApprovalGate:B.isHseCoApprovalGate===!0})});const n=$=>{const S=[];return document.querySelectorAll(`input[name="${$}-option"]`).forEach(B=>{if(B.checked)if(B.value==="other"){const O=document.getElementById(`${$}-other-text`)?.value.trim();O&&S.push(O)}else{const O=B.getAttribute("data-label")||B.value;S.push(O)}}),S},l=n("ptw-hot"),p=n("ptw-confined"),d=n("ptw-height"),c=document.getElementById("ptw-hot-other-text")?.value.trim()||"",u=document.getElementById("ptw-confined-other-text")?.value.trim()||"",m=document.getElementById("ptw-height-other-text")?.value.trim()||"",f=()=>Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-row")).map($=>{const S=$.querySelector(".ptw-team-member-name")?.value.trim();return S?{name:S}:null}).filter(Boolean),y=document.getElementById("ptw-workDescription"),g=document.getElementById("ptw-startDate"),x=document.getElementById("ptw-endDate");if(!y||!g||!x){Notification.error(this._t("module.ptw.notify.missingFormFields","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),a&&(a.disabled=!1,a.innerHTML=i);return}const k="",P="PTW",w=this.generateSequentialPTWId(""),U=this.currentEditId?AppState.appData.ptw.find($=>$.id===this.currentEditId):null,F=document.getElementById("ptw-location"),_=document.getElementById("ptw-sublocation"),N=F?.value||"",D=F?.options[F?.selectedIndex]?.text||"",W=_?.value||"",H=_?.options[_?.selectedIndex]?.text||"",T={id:this.currentEditId||`${P}_${w}`,workType:"",workDescription:y.value.trim(),location:D||N,siteId:N,siteName:D,sublocation:H||W,sublocationId:W,sublocationName:H,startDate:(()=>{const $=g.value;return $&&Utils.dateTimeLocalToISO($)||""})(),endDate:(()=>{const $=x.value;return $&&Utils.dateTimeLocalToISO($)||""})(),status:U?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",approvals:this.normalizeApprovals(s),requiredPPE:typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],riskAssessment:(()=>{if(typeof RiskMatrix>"u")return{};try{const $=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector("#ptw-risk-matrix td.ring-2")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');if($){const S=$.getAttribute("data-likelihood")||$.getAttribute("data-probability")||"",B=$.getAttribute("data-consequence")||$.getAttribute("data-severity")||"",O=$.textContent.trim()||$.querySelector(".risk-matrix-cell-value")?.textContent.trim()||"";return{likelihood:S,consequence:B,riskLevel:O}}}catch($){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",$)}return{}})(),riskNotes:document.getElementById("ptw-risk-notes")?.value.trim()||"",authorizedParty:(()=>{const $=document.getElementById("ptw-authorizedParty-select"),S=document.getElementById("ptw-authorizedParty");return $&&$.value&&$.value!=="__custom__"?$.value.trim():S?S.value.trim():""})(),requestingParty:(()=>{const $=document.getElementById("ptw-requestingParty-select"),S=document.getElementById("ptw-requestingParty");return $&&$.value&&$.value!=="__custom__"?$.value.trim():S?S.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value.trim()||"",toolsList:document.getElementById("ptw-tools")?.value.trim()||"",teamMembers:f(),hotWorkDetails:l,hotWorkOther:c,confinedSpaceDetails:p,confinedSpaceOther:u,heightWorkDetails:d,heightWorkOther:m,electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:(()=>{const $=document.getElementById("ptw-closure-time")?.value;return $&&Utils.dateTimeLocalToISO($)||""})(),closureReason:document.getElementById("ptw-closure-reason")?.value.trim()||"",closureApproval:{name1:document.getElementById("ptw-closure-approval-name-1")?.value.trim()||"",name2:document.getElementById("ptw-closure-approval-name-2")?.value.trim()||"",name3:document.getElementById("ptw-closure-approval-name-3")?.value.trim()||"",name4:document.getElementById("ptw-closure-approval-name-4")?.value.trim()||"",signature1:document.getElementById("ptw-closure-approval-signature-1")?.value.trim()||"",signature2:document.getElementById("ptw-closure-approval-signature-2")?.value.trim()||"",signature3:document.getElementById("ptw-closure-approval-signature-3")?.value.trim()||"",signature4:document.getElementById("ptw-closure-approval-signature-4")?.value.trim()||""},permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||U?.permitDisclaimer||"",createdAt:U?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),approvalCircuitOwnerId:this.formCircuitOwnerId||U?.approvalCircuitOwnerId||"__default__",approvalCircuitName:this.formCircuitName||U?.approvalCircuitName||""};if(this.updatePermitStatus(T),r&&(T.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),this.updateStatusField(T.status),T.startDate&&T.endDate){const $=this.parseDateTimeValue(T.startDate),S=this.parseDateTimeValue(T.endDate);if($&&S&&S<=$){Notification.error(this._t("module.ptw.notify.endBeforeStart","\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621.")),this._isSubmitting=!1,a&&(a.disabled=!1,a.innerHTML=i);return}}if(!T.workDescription||!T.location||!T.status){Notification.error(this._t("module.ptw.notify.fillRequired","\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629")),this._isSubmitting=!1,a&&(a.disabled=!1,a.innerHTML=i);return}if(r&&this.formCircuitOwnerId==="__issuing_authorities__"&&(!T.approvals||T.approvals.length===0)&&this._extractPermitTypeFields(T).length>0){Notification.error("\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u0634\u062E\u0627\u0635 \u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D. \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Issuing Authorities) \u0623\u0648 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this._isSubmitting=!1,a&&(a.disabled=!1,a.innerHTML=i);return}try{if(this.currentEditId){const $=AppState.appData.ptw.findIndex(S=>S.id===this.currentEditId);if($!==-1){const B=AppState.appData.ptw[$].status!=="\u0645\u063A\u0644\u0642",O=T.status==="\u0645\u063A\u0644\u0642"||T.closureStatus&&T.closureTime;AppState.appData.ptw[$]=T,T._wasClosedTransition=!!(B&&O)}}else AppState.appData.ptw.push(T),this.notifyPermitCreated(T);this.setPtwRegistryState(this.registryData,"handleSubmit.preBackground"),this.showList(),this._isSubmitting=!1,a&&(a.disabled=!1,a.innerHTML=i),Notification.info(this._t("module.ptw.notify.localSavedSyncing","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u062C\u0627\u0631\u064D \u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...")),Promise.allSettled([Promise.resolve().then(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}),this.currentEditId?this.updateRegistryEntry(T):this.addToRegistry(T),GoogleIntegration.autoSave("PTW",AppState.appData.ptw)]).then($=>{const S=$[0]?.status==="rejected",B=$[1]?.status==="rejected",O=$[2],Y=O?.status==="fulfilled"?O.value:null,ee=!!(Y&&Y.success===!0);if(S&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",$[0]?.reason),B&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",$[1]?.reason),ee)this.currentEditId?T._wasClosedTransition?Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permUpdateOk","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permAddOk","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"));else{const E=O?.status==="rejected"?O.reason?.message||String(O.reason||""):Y?.message||"";Notification.warning(this._t("module.ptw.notify.cloudSyncFailed","\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629: ")+(E||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}this.triggerNotificationsUpdate(),this.updateKPIs();const v=document.getElementById("ptw-analysis-content");v&&v.style.display!=="none"&&(v.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())})}catch($){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+$.message),this._isSubmitting=!1,a&&(a.disabled=!1,a.innerHTML=i)}},addTeamMemberRow(e=""){const a=document.getElementById("team-members-list");if(!a||!a.parentNode||!document.body.contains(a)){Utils.safeWarn("\u26A0\uFE0F addTeamMemberRow: container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const i=typeof Utils<"u"&&Utils&&typeof Utils.escapeHTML=="function"?Utils.escapeHTML(e||""):e||"",r=document.createElement("div");r.className="ptw-team-member-row flex items-center gap-3",r.innerHTML=`
            <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${i}">
            <button type="button" class="btn-icon btn-icon-danger" onclick="PTW.removeTeamMemberRow(this)" title="\u062D\u0630\u0641">
                <i class="fas fa-times"></i>
            </button>
        `;try{a.appendChild(r)}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 team member row:",s)}},removeTeamMemberRow(e){const a=e?.closest(".ptw-team-member-row"),i=document.getElementById("team-members-list");if(!(!a||!i))if(i.children.length>1)a.remove();else{const r=a.querySelector(".ptw-team-member-name");r&&(r.value="")}},updateManualStatusBtnSelection(e){if(!e)return;const a=e.closest(".modal-overlay")||document.body,i=a.querySelector("#manual-permit-status");i&&(i.value=e.value),a.querySelectorAll(".manual-status-btn").forEach(o=>{o.classList.remove("selected"),o.style.background="",o.style.borderColor="",o.style.color="",o.style.boxShadow="";const n=o.querySelector("i");n&&(n.style.color="")});const s=e.closest("label");if(s){s.classList.add("selected");const n={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{color:"#10b981",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{color:"#f59e0b",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{color:"#ef4444",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[e.value];if(n){s.style.setProperty("background",`${n.gradient}`,"important"),s.style.setProperty("border-color",`${n.color}`,"important"),s.style.setProperty("color","#ffffff","important"),s.style.setProperty("box-shadow",`0 8px 20px -4px ${n.shadow}`,"important");const l=s.querySelector("i");l&&l.style.setProperty("color","#ffffff","important")}}},addApproval(){const e=document.getElementById("approvals-tbody");if(!e||!e.parentNode||!document.body.contains(e)){Utils.safeWarn("\u26A0\uFE0F addApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const a=e.children.length,i=document.createElement("tr");i.setAttribute("data-approval-index",a),i.setAttribute("data-required","true"),i.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-role-${a}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-approver-${a}">
            </td>
            <td>
                <select class="form-input" id="approval-status-${a}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="approval-date-${a}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="approval-comments-${a}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeApproval(${a})" class="btn-icon btn-icon-danger" title="\u062D\u0630">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{e.appendChild(i)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 approval row:",r)}},removeApproval(e){const a=document.getElementById("approvals-tbody");if(!a)return;const i=a.querySelector(`tr[data-approval-index="${e}"]`);i&&(i.remove(),Array.from(a.children).forEach((r,s)=>{r.setAttribute("data-approval-index",s)}))},addClosureApproval(){const e=document.getElementById("closure-approvals-tbody");if(!e||!e.parentNode||!document.body.contains(e)){Utils.safeWarn("\u26A0\uFE0F addClosureApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const a=e.children.length,i=document.createElement("tr");i.setAttribute("data-closure-approval-index",a),i.setAttribute("data-required","true"),i.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-role-${a}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-approver-${a}">
            </td>
            <td>
                <select class="form-input" id="closure-approval-status-${a}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="closure-approval-date-${a}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="closure-approval-comments-${a}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeClosureApproval(${a})" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{e.appendChild(i)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 closure approval row:",r)}},removeClosureApproval(e){const a=document.getElementById("closure-approvals-tbody");if(!a)return;const i=a.querySelector(`tr[data-closure-approval-index="${e}"]`);i&&(i.remove(),Array.from(a.children).forEach((r,s)=>{r.setAttribute("data-closure-approval-index",s)}))},setupDisclaimerFontControls(){const e=document.getElementById("ptw-permit-disclaimer-text"),a=document.getElementById("ptw-disclaimer-font-decrease"),i=document.getElementById("ptw-disclaimer-font-increase"),r=document.getElementById("ptw-disclaimer-font-reset"),s=document.getElementById("ptw-disclaimer-font-size-display");if(!e||!a||!i||!r||!s)return;const o=15,n=10,l=24,p=1;let d=parseInt(e.style.fontSize)||o;isNaN(d)&&(d=o);const c=u=>{d=Math.max(n,Math.min(l,u)),e.style.fontSize=d+"px",s.textContent=d;try{localStorage.setItem("ptw_disclaimer_font_size",d.toString())}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",m)}};try{const u=localStorage.getItem("ptw_disclaimer_font_size");if(u){const m=parseInt(u);isNaN(m)||(d=m,c(d))}}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",u)}c(d),a.addEventListener("click",()=>{c(d-p),a.classList.add("animate-pulse"),setTimeout(()=>a.classList.remove("animate-pulse"),200)}),i.addEventListener("click",()=>{c(d+p),i.classList.add("animate-pulse"),setTimeout(()=>i.classList.remove("animate-pulse"),200)}),r.addEventListener("click",()=>{c(o),r.classList.add("animate-spin"),setTimeout(()=>r.classList.remove("animate-spin"),500)})},async editPTW(e){let a=AppState.appData.ptw.find(i=>i.id===e);if(!a&&this.registryData){const i=this.registryData.find(r=>r.id===e||r.permitId===e);i&&i.isManualEntry===!0&&(a={id:i.permitId,workType:Array.isArray(i.permitType)?i.permitTypeDisplay||i.permitType.join("\u060C "):i.permitType||i.permitTypeDisplay,location:i.location,siteName:i.location,sublocation:i.sublocation,sublocationName:i.sublocation,startDate:i.openDate,endDate:i.timeTo,status:String(i.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:i.requestingParty,authorizedParty:i.authorizedParty,workDescription:i.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:i.createdAt,updatedAt:i.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:i.teamMembers||[],teamMembersText:i.teamMembersText||"",hotWorkDetails:i.hotWorkDetails||[],hotWorkOther:i.hotWorkOther||"",confinedSpaceDetails:i.confinedSpaceDetails||[],confinedSpaceOther:i.confinedSpaceOther||"",heightWorkDetails:i.heightWorkDetails||[],heightWorkOther:i.heightWorkOther||"",excavationLength:i.excavationLength||"",excavationWidth:i.excavationWidth||"",excavationDepth:i.excavationDepth||"",soilType:i.soilType||"",electricalWorkType:i.electricalWorkType||"",coldWorkType:i.coldWorkType||"",otherWorkType:i.otherWorkType||"",preStartChecklist:i.preStartChecklist||!1,lotoApplied:i.lotoApplied||!1,governmentPermits:i.governmentPermits||!1,riskAssessmentAttached:i.riskAssessmentAttached||!1,gasTesting:i.gasTesting||!1,mocRequest:i.mocRequest||!1,ppeNotes:i.ppeNotes||"",riskLikelihood:i.riskLikelihood||"",riskConsequence:i.riskConsequence||"",riskScore:i.riskScore||"",riskLevel:i.riskLevel||"",riskNotes:i.riskNotes||"",manualApprovals:i.manualApprovals||[],manualApprovalsText:i.manualApprovalsText||"",manualClosureApprovals:i.manualClosureApprovals||[],manualClosureApprovalsText:i.manualClosureApprovalsText||"",closureTime:i.closureTime||"",closureDate:i.closureDate||"",closureReason:i.closureReason||"",paperPermitNumber:i.paperPermitNumber||"",equipment:i.equipment||"",tools:i.tools||"",toolsList:i.toolsList||"",supervisor1:i.supervisor1||"",supervisor2:i.supervisor2||""})}a&&await this.showForm(a)},async viewPTW(e){let a=AppState.appData.ptw.find(w=>w.id===e);if(!a&&this.registryData){const w=this.registryData.find(U=>U.id===e||U.permitId===e);w&&w.isManualEntry===!0&&(a={id:w.permitId,workType:Array.isArray(w.permitType)?w.permitTypeDisplay||w.permitType.join("\u060C "):w.permitType||w.permitTypeDisplay,location:w.location,siteName:w.location,sublocation:w.sublocation,sublocationName:w.sublocation,startDate:w.openDate,endDate:w.timeTo,status:String(w.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:w.requestingParty,authorizedParty:w.authorizedParty,workDescription:w.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:w.createdAt,updatedAt:w.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:w.teamMembers||[],hotWorkDetails:w.hotWorkDetails||[],hotWorkOther:w.hotWorkOther||"",confinedSpaceDetails:w.confinedSpaceDetails||[],confinedSpaceOther:w.confinedSpaceOther||"",heightWorkDetails:w.heightWorkDetails||[],heightWorkOther:w.heightWorkOther||"",excavationLength:w.excavationLength||"",excavationWidth:w.excavationWidth||"",excavationDepth:w.excavationDepth||"",soilType:w.soilType||"",electricalWorkType:w.electricalWorkType||"",coldWorkType:w.coldWorkType||"",otherWorkType:w.otherWorkType||"",ppeNotes:w.ppeNotes||"",riskLikelihood:w.riskLikelihood||"",riskConsequence:w.riskConsequence||"",riskScore:w.riskScore||"",riskLevel:w.riskLevel||"",riskNotes:w.riskNotes||"",manualApprovals:w.manualApprovals||[],manualClosureApprovals:w.manualClosureApprovals||[],closureDate:w.closureDate||"",closureReason:w.closureReason||"",paperPermitNumber:w.paperPermitNumber||"",equipment:w.equipment||"",tools:w.tools||"",supervisor1:w.supervisor1||"",supervisor2:w.supervisor2||""})}if(!a)return;const i=document.createElement("div");i.className="modal-overlay";const r=a.isManualEntry===!0,s=r?[]:this.normalizeApprovals(a.approvals||[]),o=Array.isArray(a.teamMembers)?a.teamMembers:[],n=o.length>0?`<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                ${o.map(w=>`<span class="bg-gray-100 px-3 py-1 rounded text-sm">${Utils.escapeHTML(w.name||"-")}</span>`).join("")}
               </div>`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u0631\u064A\u0642 \u0645\u062D\u062F\u062F</p>',l=Array.isArray(a.hotWorkDetails)?a.hotWorkDetails:[],p=a.hotWorkOther||"",d=Array.isArray(a.confinedSpaceDetails)?a.confinedSpaceDetails:[],c=a.confinedSpaceOther||"",u=Array.isArray(a.heightWorkDetails)?a.heightWorkDetails:[],m=a.heightWorkOther||"",f=(w,U,F)=>{const _=U.length>0?U.map(W=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(W)}</span>`).join(""):"",N=F?`<p class="text-gray-700 mt-2"><strong>\u0623\u062E\u0631\u0649:</strong> ${Utils.escapeHTML(F)}</p>`:"";return`
                <div>
                    <label class="text-sm font-semibold text-gray-600">${w}:</label>
                    <div class="mt-1">
                        ${_||N?`${_}${N}`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F</p>'}
                    </div>
                </div>
            `},y="",g="",x="",k=a.status==="\u0645\u063A\u0644\u0642"?"\u0645\u063A\u0644\u0642":"\u063A\u064A\u0631 \u0645\u063A\u0644\u0642",P=a.endDate?Utils.formatDate(a.endDate):"-";i.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.workType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.siteName||a.location||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.sublocationName||a.sublocation||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621:</label>
                                <p class="text-gray-800">${a.startDate?Utils.formatDate(a.startDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                                <p class="text-gray-800">${a.endDate?Utils.formatDate(a.endDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${this.getStatusBadgeClass(a.status)}">
                                    ${a.status||"-"}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.authorizedParty||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.requestingParty||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.equipment||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.tools||a.toolsList||"-")}</p>
                            </div>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(a.workDescription||"")}</p>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0639\u0645\u0644</h3>
                            ${n}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${f("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",l,p)}
                                ${f("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",d,c)}
                                ${f("\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",u,m)}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.electricalWorkType||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.coldWorkType||"-")}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.otherWorkType||"-")}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0637\u0648\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.excavationLength||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0631\u0636 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.excavationWidth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0645\u0642 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.excavationDepth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.soilType||"-")}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                ${y}
                            </div>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</h3>
                            ${g}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0646\u062A\u0627\u0626\u062C \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</h3>
                            ${x}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <p class="text-gray-800">${k}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${P}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(a.closureReason||"-")}</p>
                                </div>
                            </div>
                        </div>
                        ${r?`
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A
                            </h3>
                            ${(()=>{const w=a.manualApprovals||[];return w.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
                                    <div class="table-wrapper">
                                        <table class="data-table">
                                            <thead>
                                                <tr>
                                                    <th>\u0627\u0644\u062F\u0648\u0631</th>
                                                    <th>\u0627\u0644\u0627\u0633\u0645</th>
                                                    <th>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${w.map(U=>`
                                                    <tr>
                                                        <td>${Utils.escapeHTML(U.role||"")}</td>
                                                        <td>${Utils.escapeHTML(U.name||"-")}</td>
                                                        <td>${Utils.escapeHTML(U.signature||"-")}</td>
                                                    </tr>
                                                `).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                `})()}
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-check-double text-blue-600 ml-2"></i>
                                \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                            </h3>
                            ${(()=>{const w=a.manualClosureApprovals||[];return w.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
                                    <div class="table-wrapper">
                                        <table class="data-table">
                                            <thead>
                                                <tr>
                                                    <th>\u0627\u0644\u062F\u0648\u0631</th>
                                                    <th>\u0627\u0644\u0627\u0633\u0645</th>
                                                    <th>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${w.map(U=>`
                                                    <tr>
                                                        <td>${Utils.escapeHTML(U.role||"")}</td>
                                                        <td>${Utils.escapeHTML(U.name||"-")}</td>
                                                        <td>${Utils.escapeHTML(U.signature||"-")}</td>
                                                    </tr>
                                                `).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                `})()}
                        </div>
                        `:""}
                        ${s.length>0?`
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A</h3>
                            <div class="table-wrapper">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0645\u0648\u0627\u0642</th>
                                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${s.map((w,U)=>{const F=w.status==="approved"?"success":w.status==="rejected"?"danger":"warning",_=w.status==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":w.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",N=(w.candidates||[]).map(T=>`
                                                <option value="${Utils.escapeHTML(T.id||"")}" ${T.id&&T.id===w.approverId?"selected":""}>
                                                    ${Utils.escapeHTML(T.name||T.email||"")}
                                                    ${T.email?` - ${Utils.escapeHTML(T.email)}`:""}
                                                </option>
                                            `).join(""),D=w.status==="pending"&&N?`
                                                    <div class="flex items-center gap-2 mb-2">
                                                        <select id="approval-assign-${a.id}-${U}" class="form-input">
                                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                                                            ${N}
                                                        </select>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.assignApproval('${a.id}', ${U})">
                                                            \u062A\u0639\u064A\u064A\u0646
                                                        </button>
                                                    </div>
                                                  `:"",W=w.status==="pending"?`<div class="flex flex-col gap-2">
                                                        ${D}
                                                        <button class="btn-primary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.handleApprovalAction('${a.id}', ${U}, 'approved')">
                                                            \u0627\u0639\u062A\u0645\u0627\u062F
                                                        </button>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px; background-color: #ef4444; border-color: #ef4444; color: #fff;" onclick="PTW.handleApprovalAction('${a.id}', ${U}, 'rejected')">
                                                            \u0631\u0641\u0636
                                                        </button>
                                                   </div>`:"",H=Array.isArray(w.history)&&w.history.length>0?`<div class="mt-2 space-y-1">
                                                        ${w.history.slice(-4).reverse().map(T=>`
                                                            <div class="text-xs text-gray-500 flex items-center gap-2">
                                                                <i class="fas fa-history text-gray-400"></i>
                                                                <span>${Utils.escapeHTML(T.action==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":T.action==="rejected"?"\u0631\u0641\u0636":T.action==="assigned"?"\u062A\u0639\u064A\u064A\u0646":T.action||"-")}</span>
                                                                <span>\u2022</span>
                                                                <span>${T.performedBy?.name?Utils.escapeHTML(T.performedBy.name):T.assignedBy?.name?Utils.escapeHTML(T.assignedBy.name):"-"}</span>
                                                                <span>\u2022</span>
                                                                <span>${Utils.formatDateTime(T.timestamp)}</span>
                                                            </div>
                                                        `).join("")}
                                                   </div>`:"";return`
                                            <tr>
                                                <td>${Utils.escapeHTML(w.role||"")}</td>
                                                <td>${Utils.escapeHTML(w.approver||"")}</td>
                                                <td>
                                                        <span class="badge badge-${F}">
                                                            ${_}
                                                    </span>
                                                </td>
                                                <td>${w.date?Utils.formatDate(w.date):"-"}</td>
                                                <td>
                                                    ${Utils.escapeHTML(w.comments||"")}
                                                    ${H}
                                                </td>
                                                <td>${W}</td>
                                            </tr>
                                            `}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="PTW.exportPDF('${a.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631/\u0637\u0628\u0627\u0639\u0629 PDF
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",w=>{w.target===i&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&i.remove()}),setTimeout(()=>{i.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="approved"]').forEach(_=>{const N=_.getAttribute("onclick");if(N){const D=N.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'approved'\)/);D&&D[1]&&D[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",W=>{W.preventDefault(),W.stopPropagation(),this.handleApprovalAction(D[1],parseInt(D[2]),"approved")}))}}),i.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="rejected"]').forEach(_=>{const N=_.getAttribute("onclick");if(N){const D=N.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'rejected'\)/);D&&D[1]&&D[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",W=>{W.preventDefault(),W.stopPropagation(),this.handleApprovalAction(D[1],parseInt(D[2]),"rejected")}))}}),i.querySelectorAll('[onclick*="assignApproval"]').forEach(_=>{const N=_.getAttribute("onclick");if(N){const D=N.match(/assignApproval\('([^']+)',\s*(\d+)\)/);D&&D[1]&&D[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",W=>{W.preventDefault(),W.stopPropagation(),this.assignApproval(D[1],parseInt(D[2]))}))}})},50)},async handleApprovalAction(e,a,i){const r=`approval_${e}_${a}`;if(this[`_processing_${r}`]){Notification.info(this._t("module.ptw.notify.approvalProcessing","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const s=AppState.appData.ptw.find(p=>p.id===e);if(!s){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}s.approvals=this.normalizeApprovals(s.approvals||[]);const o=s.approvals[a];if(!o){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}if(s.status==="\u0645\u063A\u0644\u0642"){Notification.warning(this._t("module.ptw.notify.cannotEditClosed","\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0645\u063A\u0644\u0642"));return}if(o.status!=="pending"){Notification.info(this._t("module.ptw.notify.approvalDone","\u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0627\u0644\u0641\u0639\u0644"));return}const n=AppState.currentUser?.email?AppState.currentUser.email.toLowerCase():"";if(o.approverEmail&&n&&o.approverEmail.toLowerCase()!==n&&AppState.currentUser?.role!=="admin"){Notification.warning(this._t("module.ptw.notify.otherUser","\u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u062C\u0647 \u0625\u0644\u0649 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631."));return}if(i==="approved"){const p=s.approvals.filter((c,u)=>u<a&&c.required!==!1);if(p.some(c=>c.status!=="approved")){const c=this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),u=this._t("module.ptw.common.listSep","\u060C "),m=p.filter(f=>f.status!=="approved").map(f=>this.approvalRoleLabel(f.role||c)).join(u);Notification.warning(this._t("module.ptw.notify.prevApprovals","\u064A\u062C\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0623\u0648\u0644\u0627\u064B: {roles}").replace(/\{roles\}/g,m));return}}this[`_processing_${r}`]=!0;let l=o.comments||"";if(i==="rejected"){const p=prompt(this._t("module.ptw.approval.rejectPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):"),l);if(p===null){this[`_processing_${r}`]=!1;return}l=p.trim()}Loading.show();try{if(o.status=i==="approved"?"approved":"rejected",o.approved=i==="approved",o.rejected=i==="rejected",o.date=new Date().toISOString(),o.comments=l,AppState.currentUser&&(o.approver=AppState.currentUser.name||o.approver||"",o.approverEmail=AppState.currentUser.email||o.approverEmail||"",o.approverId=AppState.currentUser.id||o.approverId||""),o.history=Array.isArray(o.history)?o.history:[],o.history.push(ApprovalCircuits.buildHistoryEntry(i==="approved"?"approved":"rejected",{performedBy:ApprovalCircuits.buildUserSnapshot(AppState.currentUser),comments:l,status:o.status,timestamp:new Date().toISOString()})),this.updatePermitStatus(s),s.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),GoogleIntegration.autoSave("PTW",AppState.appData.ptw).catch(u=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",u)}),i==="approved"){const u=this.getNextPendingApproval(s.approvals);if(s.status==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647")Notification.success(this._t("module.ptw.notify.permAllApproved","\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0646\u0647\u0627\u0626\u064A \u0628\u0639\u062F \u0645\u0648\u0627\u0641\u0642\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629."));else{const m=this.approvalRoleLabel(o.role);if(Notification.success(this._t("module.ptw.notify.stageApproved",'\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0631\u062D\u0644\u0629 "{r}".').replace(/\{r\}/g,m)),u&&u.role){const f=this.approvalRoleLabel(u.role);Notification.info(this._t("module.ptw.notify.nextRole","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: {r}").replace(/\{r\}/g,f))}else Notification.info(this._t("module.ptw.notify.allStages","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627."))}}else{const u=this.approvalRoleLabel(o.role);Notification.error(this._t("module.ptw.notify.rejectedBy",'\u062A\u0645 \u0631\u0641\u0636 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 \u0642\u0628\u0644 "{r}".').replace(/\{r\}/g,u)),l&&Notification.info(this._t("module.ptw.notify.rejectionReason","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: {c}").replace(/\{c\}/g,l))}this.triggerNotificationsUpdate(),this.loadPTWList();const p=document.getElementById("ptw-analysis-content");p&&p.style.display!=="none"&&(p.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const d=document.getElementById("ptw-approvals-content");d&&d.style.display!=="none"&&setTimeout(()=>{this.refreshApprovalsContent()},300);const c=document.querySelector(".modal-overlay");c&&(c.remove(),setTimeout(()=>{this.viewPTW(e)},100))}catch(p){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",p),Notification.error(this._t("module.ptw.notify.approvalUpdateErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{this[`_processing_${r}`]=!1,Loading.hide()}},async assignApproval(e,a){const i=AppState.appData.ptw.find(l=>l.id===e);if(!i){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}i.approvals=this.normalizeApprovals(i.approvals||[]);const r=i.approvals[a];if(!r){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const s=document.getElementById(`approval-assign-${e}-${a}`);if(!s){Notification.error(this._t("module.ptw.notify.cannotFindAssignee","\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u062E\u0627\u0646\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646"));return}const o=s.value;if(!o){Notification.warning(this._t("module.ptw.notify.selectApprover","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."));return}const n=ApprovalCircuits.getUserById(o);if(!n){Notification.error(this._t("module.ptw.notify.userNotInSystem","\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645."));return}Loading.show();try{r.approverId=n.id||n.email||"",r.approver=n.name||n.email||"",r.approverEmail=n.email||"",r.assignedAt=new Date().toISOString(),r.assignedBy=ApprovalCircuits.buildUserSnapshot(AppState.currentUser),r.history=Array.isArray(r.history)?r.history:[],r.history.push(ApprovalCircuits.buildHistoryEntry("assigned",{assignedBy:r.assignedBy,assignedTo:ApprovalCircuits.buildUserSnapshot(n)})),this.updatePermitStatus(i),i.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Notification.success(this._t("module.ptw.notify.assignedTo","\u062A\u0645 \u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u0644\u0649 {name}.").replace(/\{name\}/g,r.approver||"")),this.triggerNotificationsUpdate(),this.loadPTWList();const l=document.getElementById("ptw-analysis-content");l&&l.style.display!=="none"&&(l.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const p=document.querySelector(".modal-overlay");p&&(p.remove(),this.viewPTW(e))}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",l),Notification.error(this._t("module.ptw.notify.assignErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{Loading.hide()}},async deletePTW(e){if(confirm(this._t("module.ptw.notify.deletePtwShort","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F"))){Loading.show();try{await this.removeFromRegistry(e),AppState.appData.ptw=AppState.appData.ptw.filter(i=>i.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Loading.hide(),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")),this.updateKPIs(),this.loadPTWList(),this.triggerNotificationsUpdate();const a=document.getElementById("ptw-analysis-content");a&&a.style.display!=="none"&&(a.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(a){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+a.message),submitBtn&&(submitBtn.disabled=!1,submitBtn.innerHTML=originalText)}}},async exportPDF(e){try{Loading.show();const a=await this.buildPermitExportPayload(e);if(Loading.hide(),!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(a.isManualEntry&&a.exportReview&&!a.exportReview.ok&&Utils.safeWarn("\u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A \u0628\u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629:",a.exportReview.failed),Loading.show(this._t("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 PDF...")),!await this._ensurePermitPdfLibs_()){Notification.error(this._t("module.ptw.notify.pdfLibsError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"));return}await this._downloadPermitHtmlAsPdf(a.html,a.fileName)?Notification.success(this._t("module.ptw.notify.pdfDownloadOk","\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D PDF \u0628\u0646\u062C\u0627\u062D")):a.isManualEntry&&a.printHtml?(Notification.warning("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629. \u0627\u062E\u062A\u0631 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0623\u0648 \xABMicrosoft Print to PDF\xBB."),this.openPermitPrintWindow(a.printHtml)):Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF"))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",a);const i=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(a?.message||i))}finally{Loading.hide()}},initMapFilters(){this.setupMapSettingsEventListeners(),["ptw-map-filter-status","ptw-map-filter-type"].forEach(i=>{const r=document.getElementById(i);if(r&&r.parentNode){const s=r.cloneNode(!0);r.parentNode.replaceChild(s,r),s.addEventListener("change",()=>this.updateMapUI())}});const e=(i,r)=>{const s=document.getElementById(i);if(s&&s.parentNode){const o=s.cloneNode(!0);s.parentNode.replaceChild(o,s),o.addEventListener("click",()=>this.switchMapType(r))}};e("ptw-map-type-normal","normal"),e("ptw-map-type-satellite","satellite"),e("ptw-map-type-terrain","terrain");const a=document.getElementById("ptw-map-fullscreen-btn");if(a&&a.parentNode){const i=a.cloneNode(!0);a.parentNode.replaceChild(i,a),i.addEventListener("click",()=>this.toggleFullscreen())}},updateMapUI(){this.currentTab==="map"&&this.updateMapMarkers()},getMarkerColor(e){switch(e){case"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":return"#10b981";case"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":return"#3b82f6";case"\u0645\u063A\u0644\u0642":return"#6b7280";case"\u0645\u0631\u0641\u0648\u0636":return"#ef4444";default:return"#f59e0b"}},createMapPopup(e){const a=Utils.escapeHTML;return`
            <div class="ptw-map-popup p-2" style="min-width: 200px; text-align: right;">
                <h4 class="font-bold text-gray-800 mb-1 border-b pb-1 text-sm">${a(e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h4>
                <div class="text-xs text-gray-600 space-y-1 my-2">
                    <div class="flex justify-between"><span>${a(e.siteName||e.location||"-")}</span> <span class="font-semibold text-gray-500">:\u0627\u0644\u0645\u0648\u0642\u0639</span></div>
                    <div class="flex justify-between"><span>${e.startDate?Utils.formatDate(e.startDate):"-"}</span> <span class="font-semibold text-gray-500">:\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span></div>
                    <div class="flex justify-between items-center">
                        <span class="badge badge-${this.getStatusBadgeClass(e.status)} px-1 py-0 text-[10px]">${e.status}</span>
                        <span class="font-semibold text-gray-500">:\u0627\u0644\u062D\u0627\u0644\u0629</span> 
                    </div>
                </div>
                <div class="mt-2 text-center pt-2 border-t border-gray-100">
                    <button onclick="PTW.viewPTW('${e.id}')" class="text-primary-600 hover:text-primary-800 text-xs font-bold transition-colors">
                        \u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                    </button>
                </div>
            </div>
        `},switchMapType(e){if(!this.mapInstance)return;this.currentMapType=e;const a=document.getElementById("ptw-map-type-normal"),i=document.getElementById("ptw-map-type-satellite"),r=document.getElementById("ptw-map-type-terrain");if([a,i,r].forEach(s=>{if(s)try{s.classList.remove("bg-blue-500","text-white","shadow-sm"),s.classList.add("text-gray-700","hover:bg-gray-100")}catch{}}),this.mapType==="google")try{let s;switch(e){case"satellite":if(s=google.maps.MapTypeId.SATELLITE,i)try{i.classList.add("bg-blue-500","text-white","shadow-sm"),i.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;case"terrain":if(s=google.maps.MapTypeId.TERRAIN,r)try{r.classList.add("bg-blue-500","text-white","shadow-sm"),r.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;default:if(s=google.maps.MapTypeId.ROADMAP,a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}this.mapInstance.setMapTypeId(s)}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Google Maps):",s)}else if(this.mapType==="leaflet"){if(!this.leafletLayers)return;requestAnimationFrame(()=>{try{if(!this.mapInstance||!this.leafletLayers)return;try{this.leafletLayers.normal&&this.mapInstance.hasLayer(this.leafletLayers.normal)&&this.mapInstance.removeLayer(this.leafletLayers.normal)}catch{}try{this.leafletLayers.satellite&&this.mapInstance.hasLayer(this.leafletLayers.satellite)&&this.mapInstance.removeLayer(this.leafletLayers.satellite)}catch{}try{this.leafletLayers.terrain&&this.mapInstance.hasLayer(this.leafletLayers.terrain)&&this.mapInstance.removeLayer(this.leafletLayers.terrain)}catch{}switch(e){case"satellite":{const s=this._ensureLeafletSatelliteLayer();if(s)try{if(s.addTo(this.mapInstance),i)try{i.classList.add("bg-blue-500","text-white","shadow-sm"),i.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}case"terrain":{const s=this._ensureLeafletTerrainLayer();if(s)try{if(s.addTo(this.mapInstance),r)try{r.classList.add("bg-blue-500","text-white","shadow-sm"),r.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}default:if(this.leafletLayers.normal)try{if(this.leafletLayers.normal.addTo(this.mapInstance),a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}}}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Leaflet):",s)}})}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${e}`)},toggleFullscreen(){const e=document.getElementById("ptw-map-content"),a=document.getElementById("ptw-map-fullscreen-btn");e&&(this.isFullscreen?(document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen(),this.isFullscreen=!1,a&&(a.innerHTML='<i class="fas fa-expand ml-2"></i>',a.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")):(e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen(),this.isFullscreen=!0,a&&(a.innerHTML='<i class="fas fa-compress ml-2"></i>',a.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),setTimeout(()=>{this.mapInstance&&(this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps&&google.maps.event&&this.mapInstance&&google.maps.event.trigger(this.mapInstance,"resize"))},300))},formatPermitApprovalSourceCell(e){if(!e)return'<span class="text-gray-400 text-sm">\u2014</span>';const a=String(e.approvalCircuitOwnerId||"").trim(),i=String(e.approvalCircuitName||"").trim();if(e.isManualEntry===!0||e.skipApprovalFlow===!0||a==="__manual__"){const s=i||"Manual Entry";return`
                <div class="ptw-approval-source-cell text-xs text-right leading-snug" dir="ltr">
                    <div class="font-mono text-gray-600">__manual__</div>
                    <div class="text-gray-800 font-medium" dir="auto">${Utils.escapeHTML(s)}</div>
                </div>`}return i?`<div class="text-xs text-gray-800">${Utils.escapeHTML(i)}</div>`:a&&a!=="__default__"?`<div class="text-xs font-mono text-gray-600" dir="ltr">${Utils.escapeHTML(a)}</div>`:'<span class="text-gray-400 text-sm">\u2014</span>'},getMergedPermitsForFilter(){const e=AppState.appData.ptw||[],a=(this.registryData||[]).map(i=>({id:i.permitId||i.id,workType:Array.isArray(i.permitType)?i.permitTypeDisplay||i.permitType.join("\u060C "):i.permitType||i.permitTypeDisplay,location:i.location,siteName:i.location,sublocation:i.sublocation,sublocationName:i.sublocation,startDate:i.timeFrom||i.openDate,endDate:i.timeTo||i.closureDate,status:i.status,workDescription:i.workDescription,requestingParty:i.requestingParty,authorizedParty:i.authorizedParty,approvals:[],createdAt:i.createdAt||i.timeFrom||i.openDate,updatedAt:i.updatedAt||i.closureDate||i.timeTo,isFromRegistry:!0,isManualEntry:i.isManualEntry===!0||i.isManualEntry==="true",skipApprovalFlow:i.skipApprovalFlow===!0||i.isManualEntry===!0||i.isManualEntry==="true",approvalCircuitOwnerId:i.approvalCircuitOwnerId||(i.isManualEntry===!0||i.isManualEntry==="true"?"__manual__":void 0),approvalCircuitName:i.approvalCircuitName||(i.isManualEntry===!0||i.isManualEntry==="true"?"Manual Entry":void 0),sequentialNumber:i.sequentialNumber,paperPermitNumber:i.paperPermitNumber}));return this.mergePermitsPreferRegistry(e,a)},updateSublocationFilterOptions(){const e=document.getElementById("ptw-filter-location"),a=document.getElementById("ptw-filter-sublocation");if(!a||!e)return;const i=this.getMergedPermitsForFilter(),r=(e.value||"").trim();let s=[];if(r){const n=i.filter(l=>(l.siteName||l.location||"").trim()===r);s=[...new Set(n.map(l=>(l.sublocationName||l.sublocation||"").trim()).filter(Boolean))].sort()}else s=[...new Set(i.map(n=>(n.sublocationName||n.sublocation||"").trim()).filter(Boolean))].sort();const o=a.value;a.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+s.map(n=>`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(n)}</option>`).join(""),s.includes(o)?a.value=o:a.value=""},filterItems(){const e=(document.getElementById("ptw-search")?.value||"").trim(),a=(document.getElementById("ptw-filter-status")?.value||"").trim(),i=(document.getElementById("ptw-filter-work-type")?.value||"").trim(),r=(document.getElementById("ptw-filter-location")?.value||"").trim(),s=(document.getElementById("ptw-filter-sublocation")?.value||"").trim(),o=(document.getElementById("ptw-filter-date-from")?.value||"").trim(),n=(document.getElementById("ptw-filter-date-to")?.value||"").trim();let l=this.getMergedPermitsForFilter();if(e){const c=e.toLowerCase();l=l.filter(u=>u.workType?.toLowerCase().includes(c)||u.workDescription?.toLowerCase().includes(c)||u.location?.toLowerCase().includes(c)||u.siteName?.toLowerCase().includes(c)||u.sublocation?.toLowerCase().includes(c)||u.sublocationName?.toLowerCase().includes(c)||u.requestingParty?.toLowerCase().includes(c)||u.authorizedParty?.toLowerCase().includes(c)||String(u.approvalCircuitOwnerId||"").toLowerCase().includes(c)||String(u.approvalCircuitName||"").toLowerCase().includes(c))}a&&(l=l.filter(c=>(c.status||"").trim()===a)),i&&(l=l.filter(c=>(c.workType||"").trim()===i)),r&&(l=l.filter(c=>(c.siteName||c.location||"").trim()===r)),s&&(l=l.filter(c=>(c.sublocationName||c.sublocation||"").trim()===s)),o&&(l=l.filter(c=>(c.startDate?new Date(c.startDate).toISOString().split("T")[0]:"")>=o)),n&&(l=l.filter(c=>(c.endDate?new Date(c.endDate).toISOString().split("T")[0]:"")<=n)),l=this.sortPermitRecordsNewestFirst(l);const p=document.querySelector("#ptw-table-container tbody");p&&(p.innerHTML=l.length===0?'<tr><td colspan="8" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td></tr>':l.map(c=>{const u=c.isManualEntry===!0||c.skipApprovalFlow===!0||String(c.approvalCircuitOwnerId||"").trim()==="__manual__";let m,f;if(u)f=3,m=3;else{const g=this.normalizeApprovals(c.approvals||[]).filter(x=>x.required!==!1);m=g.filter(x=>x.status==="approved").length,f=g.length}return`
                    <tr>
                        <td>${Utils.escapeHTML(c.workType||"")}</td>
                        <td>${Utils.escapeHTML(c.siteName||c.location||"")}</td>
                        <td>${Utils.escapeHTML(c.sublocationName||c.sublocation||"-")}</td>
                        <td>${c.startDate?Utils.formatDate(c.startDate):"-"}</td>
                        <td>${c.endDate?Utils.formatDate(c.endDate):"-"}</td>
                        <td>
                            <span class="badge badge-${m===f&&f>0?"success":"warning"}">
                                ${f>0?`${m}/${f}`:"\u2014"}
                            </span>
                            <br>
                            <span class="badge badge-${this.getStatusBadgeClass(c.status)}">
                                ${Utils.escapeHTML(c.status||"-")}
                            </span>
                        </td>
                        <td class="align-top">${this.formatPermitApprovalSourceCell(c)}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button onclick="PTW.viewPTW('${c.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="PTW.printPermit('${c.id}')" class="btn-icon btn-icon-primary" title="\u0637\u0628\u0627\u0639\u0629">
                                    <i class="fas fa-print"></i>
                                </button>
                                <button onclick="PTW.exportPDF('${c.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                    <i class="fas fa-file-pdf"></i>
                                </button>
                                <button onclick="PTW.editPTW('${c.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="PTW.deletePTW('${c.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `}).join(""));const d=document.getElementById("ptw-filter-count");d&&(d.textContent=String(l.length)),this.updateKPIs()},renderAnalysisContent(){const e=document.getElementById("ptw-map-content");return e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.position="absolute",e.style.left="-9999px",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.style.pointerEvents="none",e.style.zIndex="-1"),AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),this._ptwEnsureChartJS().catch(()=>{}),`
        <div id="ptw-analytics-root" style="font-family:inherit;">

            <!-- \u2500\u2500 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u2500\u2500 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(29,78,216,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-clipboard-check" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0648\u0641\u0648\u0631\u064A \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((a,i)=>{const r=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],s=(this._ptwPeriod||"0")===a;return`<button type="button" class="ptw-period-btn" data-period="${a}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.15)"};color:${s?"#1e3a5f":"#fff"};">${r[i]}</button>`}).join("")}
                    </div>
                    <button type="button" id="ptw-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="ptw-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button type="button" id="ptw-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.3);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.5)'" onmouseout="this.style.background='rgba(0,0,0,0.3)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button type="button" id="ptw-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B"><i class="fas fa-sync-alt"></i></button>
                </div>
            </div>

            <!-- \u2500\u2500 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2500\u2500 -->
            <div id="ptw-filter-panel" style="display:none;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#1d4ed8;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#1e3a5f;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="ptw-filter-count" style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button type="button" id="ptw-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #bfdbfe;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#dbeafe';this.style.color='#1d4ed8'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"ptw-af-status",icon:"fas fa-circle",color:"#10b981",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ptw-af-work-type",icon:"fas fa-fire",color:"#ef4444",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"},{id:"ptw-af-authorized",icon:"fas fa-user-tie",color:"#f59e0b",label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"},{id:"ptw-af-requesting",icon:"fas fa-building",color:"#6366f1",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"},{id:"ptw-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0635\u0646\u0639"}].map(a=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="${a.icon}" style="color:${a.color};margin-left:4px;"></i>${a.label}</label>
                            <select id="${a.id}" style="width:100%;padding:7px 10px;border:1.5px solid #bfdbfe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#1d4ed8'" onblur="this.style.borderColor='#bfdbfe'">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2500\u2500 KPI Cards \u2500\u2500 -->
            <div id="ptw-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2500\u2500 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tasks" style="color:#1d4ed8;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ptw-chart-status"></canvas>
                        <div id="ptw-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-fire" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ptw-chart-work-type"></canvas>
                        <div id="ptw-chart-work-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#6366f1;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="ptw-chart-timeline"></canvas>
                    <div id="ptw-chart-timeline-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2500\u2500 Row: \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0284c7;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</span>
                    </div>
                    <span style="font-size:0.72rem;color:#64748b;">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0635\u0646\u0639 \u0644\u062A\u0635\u0641\u064A\u0629 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>
                </div>
                <div id="ptw-factories-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;padding:16px;background:#f8fafc;">
                    <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 2: \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 + \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-tie" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ptw-chart-authorized"></canvas>
                        <div id="ptw-chart-authorized-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0637\u0644\u0628\u0627\u064B \u0644\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ptw-chart-requesting"></canvas>
                        <div id="ptw-chart-requesting-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 3: \u0627\u0644\u0645\u0635\u0646\u0639 + \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0635\u0646\u0639 (\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A \u0627\u0644\u0623\u0643\u062B\u0631 \u0646\u0634\u0627\u0637\u0627\u064B - \u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div id="ptw-locs-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-hotel" style="color:#2563eb;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</span>
                    </div>
                    <div id="ptw-depts-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u062C\u062F\u0648\u0644 \u0623\u062D\u062F\u062B \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-star" style="color:#1d4ed8;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u062D\u062F\u062B \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u062D\u0633\u0628 \u0627\u0644\u0641\u0644\u062A\u0631)</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span id="ptw-top-count" style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                        <button type="button" id="ptw-analysis-export-excel" style="padding:5px 12px;border-radius:8px;border:1px solid #bfdbfe;background:#fff;color:#1d4ed8;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#fff'"><i class="fas fa-file-excel"></i> Excel</button>
                        <button type="button" id="ptw-analysis-add" style="padding:5px 12px;border-radius:8px;border:none;background:#1d4ed8;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;" onmouseover="this.style.background='#1e40af'" onmouseout="this.style.background='#1d4ed8'"><i class="fas fa-plus"></i> \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F</button>
                    </div>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="ptw-top-tbody">
                            <tr><td colspan="7" style="padding:20px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`},getAnalysisPermits(){const e=this.getSiteOptions(),a=s=>{if(!s)return s;const o=String(s.location||s.siteName||"").trim(),n=o.split(" - "),l=n[0]?.trim()||"";let p="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const d=e.find(u=>u.name.trim()===o||u.id===o||s.siteId&&u.id===s.siteId||l&&u.name.trim()===l||l&&u.id===l);d?p=d.name.trim():l&&l!=="\u2014"&&l!=="undefined"&&(p=l);let c=s.sublocation?.trim()||n[1]?.trim()||"";return(!c||c==="\u2014"||c==="undefined"||c==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")&&(c="\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),{...s,location:p,siteName:p,sublocation:c}},i=(AppState.appData&&AppState.appData.ptw?AppState.appData.ptw:[]).map(a),r=(this.registryData||[]).map(s=>{const n=(s.location||"").split(" - "),l=n[0]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",p=s.sublocation?.trim()||n[1]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return a({id:s.permitId||s.id,workType:Array.isArray(s.permitType)?s.permitTypeDisplay||s.permitType.join("\u060C "):s.permitType||s.permitTypeDisplay,location:l,siteName:l,sublocation:p,startDate:s.openDate,endDate:s.timeTo,status:s.status,requestingParty:s.requestingParty,authorizedParty:s.authorizedParty,workDescription:s.workDescription,createdAt:s.createdAt,updatedAt:s.updatedAt})});return this.mergePermitsPreferRegistry(i,r)},getFilteredAnalysisPermits(){const e=this.getAnalysisPermits(),a=document.getElementById("ptw-analysis-date-from"),i=document.getElementById("ptw-analysis-date-to"),r=document.getElementById("ptw-analysis-work-type"),s=document.getElementById("ptw-analysis-authorized"),o=document.getElementById("ptw-analysis-requesting"),n=document.getElementById("ptw-analysis-status"),l=a&&a.value?new Date(a.value):null,p=i&&i.value?new Date(i.value):null,d=r&&r.value?r.value.trim():"",c=s&&s.value?s.value.trim():"",u=o&&o.value?o.value.trim():"",m=n&&n.value?n.value.trim():"";return e.filter(f=>{const y=f.workType,g=Array.isArray(y)?y:y?[String(y)]:[],x=!d||g.some(F=>(F||"").trim()===d),k=!c||(f.authorizedParty||"").trim()===c,P=!u||(f.requestingParty||"").trim()===u,w=!m||(f.status||"").trim()===m;let U=!0;if(l||p){const F=f.startDate||f.openDate||f.createdAt||f.endDate,_=F?new Date(F):null;if(!_)U=!1;else if(l&&_<l&&(U=!1),p){const N=new Date(p);N.setHours(23,59,59,999),_>N&&(U=!1)}}return x&&k&&P&&w&&U})},updateAnalysisChartsAndKPIs(e){const a=(v,E)=>this._t(v,E),i=Array.isArray(e)?e:this.getFilteredAnalysisPermits(),r=i.length,s=i.filter(v=>this.isPermitOpenStatus(v?.status)).length,o=i.filter(v=>this.isPermitClosedStatus(v?.status)).length,n=i.filter(v=>(v.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,l=i.filter(v=>v?.isManualEntry!==!0&&(v.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,p=i.filter(v=>(v.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,d=r>0?(o/r*100).toFixed(1):"0",c=r>0?(s/r*100).toFixed(1):"0",u=r>0?(n/r*100).toFixed(1):"0",m=r>0?(p/r*100).toFixed(1):"0",f=s+o+p,y=r===0||f===r,g=(v,E)=>{const K=document.getElementById(v);K&&(K.textContent=E)};g("ptw-kpi-total",r),g("ptw-kpi-open",s),g("ptw-kpi-open-pct",a("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(c))),g("ptw-kpi-closed",o),g("ptw-kpi-closure-pct",a("module.ptw.analysis.closureShare","{n}% \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642").replace(/\{n\}/g,String(d))),g("ptw-kpi-approved",n),g("ptw-kpi-approved-pct",a("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(u))),g("ptw-kpi-pending",l),g("ptw-kpi-rejected",p),g("ptw-kpi-formulas",a("module.ptw.analysis.formulaText","\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 = {c}% | \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 = {o}% | \u0627\u0644\u0645\u0631\u0641\u0648\u0636\u0629 = {r}%").replace(/\{c\}/g,String(d)).replace(/\{o\}/g,String(c)).replace(/\{r\}/g,String(m)));const x=document.getElementById("ptw-analysis-current-count");x&&(x.textContent=String(r));const k=document.getElementById("ptw-analysis-summary");if(k)if(r===0)k.textContent=a("module.ptw.analysis.summaryNoData","\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u062C\u0631\u0651\u0628 \u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0641\u062A\u0631\u0629 \u0623\u0648 \u0625\u0632\u0627\u0644\u0629 \u0628\u0639\u0636 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u062D\u0644\u064A\u0644.");else{const v=[],E=document.getElementById("ptw-analysis-date-from")?.value||"",K=document.getElementById("ptw-analysis-date-to")?.value||"",C=document.getElementById("ptw-analysis-work-type")?.value||"",b=document.getElementById("ptw-analysis-authorized")?.value||"",V=document.getElementById("ptw-analysis-requesting")?.value||"",I=document.getElementById("ptw-analysis-status")?.value||"";if(E||K){const J=E&&K?a("module.ptw.analysis.fromWord","\u0645\u0646")+" "+E+" "+a("module.ptw.analysis.toConnector","\u0625\u0644\u0649")+" "+K:E?a("module.ptw.analysis.fromWord","\u0645\u0646")+" "+E:a("module.ptw.analysis.until","\u062D\u062A\u0649")+" "+K;v.push(a("module.ptw.analysis.range","\u0627\u0644\u0641\u062A\u0631\u0629: ")+J)}C&&v.push(a("module.ptw.analysis.wt","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+C),b&&v.push(a("module.ptw.analysis.ap","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627: ")+b),V&&v.push(a("module.ptw.analysis.rp","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629: ")+V),I&&v.push(a("module.ptw.analysis.st","\u0627\u0644\u062D\u0627\u0644\u0629: ")+I);const z=v.length?v.join(a("module.ptw.analysis.partSep"," | ")):a("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u0627\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)");k.textContent=a("module.ptw.analysis.currentCount","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ")+r+a("module.ptw.analysis.filterSep"," \u2014 ")+z}if(!document.getElementById("ptw-analysis-filter-badge-styles")){const v=document.createElement("style");v.id="ptw-analysis-filter-badge-styles",v.textContent=`
                .ptw-analysis-filter-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 22px;
                    height: 18px;
                    padding: 1px 6px;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    color: #ffffff;
                    border-radius: 9999px;
                    font-size: 10px;
                    font-weight: 700;
                    margin-right: 4px;
                    margin-left: 4px;
                    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.35);
                }
            `,document.head.appendChild(v)}if(["ptw-analysis-date-from","ptw-analysis-date-to","ptw-analysis-work-type","ptw-analysis-authorized","ptw-analysis-requesting","ptw-analysis-status"].forEach(v=>{const E=document.getElementById(v);if(!E)return;const K=E.closest("div");if(!K)return;const C=K.querySelector('.ptw-analysis-filter-label[data-filter-id="'+v+'"]');if(!C)return;const b=C.querySelector(".ptw-analysis-filter-badge");b&&b.remove();let V=!1;if((E.tagName==="INPUT"||E.tagName==="SELECT")&&(V=!!E.value),V&&r>0){const I=document.createElement("span");I.className="ptw-analysis-filter-badge",I.title=a("module.ptw.analysis.badgeCountTitle","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0641\u0644\u062A\u0631 \u0645\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0623\u062E\u0631\u0649"),I.textContent=String(r);const z=C.querySelector("i");z&&z.nextSibling?z.insertAdjacentElement("afterend",I):C.appendChild(I)}}),typeof Chart>"u")return;const w=["ptw-chart-work-type","ptw-chart-authorized","ptw-chart-status","ptw-chart-timeline"];this.analysisCharts||(this.analysisCharts={}),w.forEach(v=>{this.analysisCharts[v]&&(this.analysisCharts[v].destroy(),this.analysisCharts[v]=null)});const U=v=>{const E=v.workType;return Array.isArray(E)?E.length?E:["\u0623\u062E\u0631\u0649"]:E?[String(E)]:["\u0623\u062E\u0631\u0649"]},F={};i.forEach(v=>U(v).forEach(E=>{const K=(E||"").trim()||"\u0623\u062E\u0631\u0649";F[K]=(F[K]||0)+1}));const _=Object.entries(F).sort((v,E)=>E[1]-v[1]),N={};i.forEach(v=>{const E=(v.authorizedParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";N[E]=(N[E]||0)+1});const D=Object.entries(N).sort((v,E)=>E[1]-v[1]).slice(0,12),W={};i.forEach(v=>{const E=(v.status||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";W[E]=(W[E]||0)+1});const H=Object.entries(W),T={};i.forEach(v=>{const E=v.startDate||v.openDate||v.createdAt||v.endDate,K=E?new Date(E):null,C=K?K.getFullYear()+"-"+String(K.getMonth()+1).padStart(2,"0"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";T[C]=(T[C]||0)+1});const S=Object.keys(T).filter(v=>v!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort().map(v=>({label:v,count:T[v]})),B=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#6366f1","#f97316"],O=(v,E,K,C)=>{const b=document.getElementById(v);if(!b)return;const V=b.getContext("2d");this.analysisCharts[v]=new Chart(V,{type:"doughnut",data:{labels:E,datasets:[{data:K,backgroundColor:B.slice(0,E.length),borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})},Y=(v,E,K,C)=>{const b=document.getElementById(v);if(!b)return;const V=b.getContext("2d");this.analysisCharts[v]=new Chart(V,{type:"bar",data:{labels:E,datasets:[{label:a("module.ptw.analysis.chartCount","\u0627\u0644\u0639\u062F\u062F"),data:K,backgroundColor:B[0],borderColor:"#1d4ed8",borderWidth:1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}})},ee=(v,E,K)=>{const C=document.getElementById(v);if(!C)return;const b=C.getContext("2d");this.analysisCharts[v]=new Chart(b,{type:"line",data:{labels:E,datasets:[{label:a("module.ptw.analysis.permitsPerMonth","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),data:K,borderColor:B[0],backgroundColor:B[0]+"33",fill:!0,tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})};_.length&&O("ptw-chart-work-type",_.map(([v])=>v),_.map(([,v])=>v)),D.length&&Y("ptw-chart-authorized",D.map(([v])=>v),D.map(([,v])=>v)),H.length&&O("ptw-chart-status",H.map(([v])=>v),H.map(([,v])=>v)),S.length&&ee("ptw-chart-timeline",S.map(({label:v})=>v),S.map(({count:v})=>v))},exportAnalysisReportToExcel(){const e=this.getFilteredAnalysisPermits();if(!e||e.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const a=(_,N)=>this._t(_,N),r=(typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar")==="en"?"en-GB":"ar-EG",s=_=>{if(!_)return"-";try{return new Date(_).toLocaleDateString(r)}catch{return String(_)}},o=this._t("module.ptw.common.listSep","\u060C "),n=_=>Array.isArray(_.workType)?(_.workType||[]).join(o):_.workType||"-",l=a("module.ptw.excelColSeq","\u0645"),p=a("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),d=a("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),c=a("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),u=a("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),m=a("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),f=a("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),y=a("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),g=e.map((_,N)=>({[l]:N+1,[p]:n(_),[d]:_.requestingParty||"-",[c]:_.authorizedParty||"-",[u]:_.location||_.siteName||"-",[m]:s(_.startDate||_.openDate||_.createdAt),[f]:this.statusLabel(_.status||"-"),[y]:(_.workDescription||"-").toString().slice(0,200)}));if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"));return}const x=XLSX.utils.json_to_sheet(g),k=XLSX.utils.book_new(),P=a("module.ptw.excelSheetAnalysis","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");XLSX.utils.book_append_sheet(k,x,P);const w=document.getElementById("ptw-analysis-date-from")?.value||"",U=document.getElementById("ptw-analysis-date-to")?.value||"",F=a("module.ptw.excelNameAnalysis","\u062A\u0642\u0631\u064A\u0631_\u062A\u062D\u0644\u064A\u0644_\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D_{f}_{t}.xlsx").replace(/\{f\}/g,(w||a("module.ptw.excelNameAll","\u0643\u0644")).replace(/\s/g,"_")).replace(/\{t\}/g,(U||a("module.ptw.excelNameTime","\u0627\u0644\u0648\u0642\u062A")).replace(/\s/g,"_"));XLSX.writeFile(k,F),Notification.success(this._t("module.ptw.notify.analysisExportXlsxOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))},async exportAnalysisReportToPDF(){const e=this.getFilteredAnalysisPermits();if(!e||e.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const a=(p,d)=>this._t(p,d),i=typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar",r=i==="en"?"en-GB":"ar-EG",s=i!=="en",o=s?"rtl":"ltr",n=i==="en"?"en":"ar",l=s?"right":"left";try{Loading.show(a("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF..."));const p=z=>{if(!z)return"-";try{const J=this.parseDateTimeValue(z);return!J||isNaN(J.getTime())?String(z):J.toLocaleDateString(r)}catch{return String(z)}},d=this._t("module.ptw.common.listSep","\u060C "),c=z=>Array.isArray(z.workType)?(z.workType||[]).join(d):z.workType||"-",u=document.getElementById("ptw-analysis-date-from"),m=document.getElementById("ptw-analysis-date-to"),f=document.getElementById("ptw-analysis-work-type"),y=document.getElementById("ptw-analysis-authorized"),g=document.getElementById("ptw-analysis-requesting"),x=document.getElementById("ptw-analysis-status"),k=[];u&&u.value&&k.push(a("module.ptw.analysis.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")+": "+u.value),m&&m.value&&k.push(a("module.ptw.analysis.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")+": "+m.value),f&&f.value&&k.push(a("module.ptw.analysis.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")+": "+f.value),y&&y.value&&k.push(a("module.ptw.analysis.authorized","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 (\u0645\u0642\u0627\u0648\u0644)")+": "+y.value),g&&g.value&&k.push(a("module.ptw.analysis.requesting","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")+": "+g.value),x&&x.value&&k.push(a("module.ptw.analysis.filterStatus","\u0627\u0644\u062D\u0627\u0644\u0629")+": "+x.value);const P=a("module.ptw.analysis.partSep"," | "),w=k.length?k.join(P):a("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)"),U=e.filter(z=>{const J=(z.status||"").trim();return J!=="\u0645\u063A\u0644\u0642"&&J!=="\u0645\u0631\u0641\u0648\u0636"&&J!=="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&J!=="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,F=e.filter(z=>{const J=(z.status||"").trim();return J==="\u0645\u063A\u0644\u0642"||J==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||J==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,_=a("module.ptw.excelColSeq","\u0645"),N=a("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),D=a("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),W=a("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),H=a("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),T=a("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),$=a("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),S=a("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),B=e.map((z,J)=>`
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: center;">${J+1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l}; font-size: 9px;">${Utils.escapeHTML(c(z))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(z.requestingParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(z.authorizedParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(z.location||z.siteName||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${p(z.startDate||z.openDate||z.createdAt)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(this.statusLabel(z.status||"-"))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l}; font-size: 9px; max-width: 120px;">${Utils.escapeHTML((z.workDescription||"-").toString().slice(0,80))}</td>
                </tr>
            `).join(""),O=a("module.ptw.pdf.analysisReportTitle","\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"),Y=a("module.ptw.pdf.filterCriteriaLine","\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631: {text}").replace(/\{text\}/g,w),ee=a("module.ptw.pdf.totalsLine","\u0625\u062C\u0645\u0627\u0644\u064A: {total} | \u0645\u0641\u062A\u0648\u062D\u0629: {open} | \u0645\u063A\u0644\u0642\u0629: {closed}").replace(/\{total\}/g,String(e.length)).replace(/\{open\}/g,String(U)).replace(/\{closed\}/g,String(F)),v=`
                <div style="margin-bottom: 18px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 10px;">${Utils.escapeHTML(O)}</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-bottom: 6px;">${Utils.escapeHTML(Y)}</p>
                    <p style="text-align: center; color: #374151; font-size: 12px;">${Utils.escapeHTML(ee)}</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #3b82f6; color: white;">
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(_)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(N)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(D)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(W)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(H)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(T)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML($)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(S)}</th>
                        </tr>
                    </thead>
                    <tbody>${B}</tbody>
                </table>
            `,E="PTW-ANALYSIS-"+new Date().toISOString().slice(0,10),K=O,C=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(E,K,v,!1,!0,{source:"PTWAnalysis"},new Date().toISOString(),new Date().toISOString()):`<html dir="${o}" lang="${n}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(K)}</title></head><body>${v}</body></html>`,b=new Blob([C],{type:"text/html;charset=utf-8"}),V=URL.createObjectURL(b),I=window.open(V,"_blank");I?I.onload=()=>{setTimeout(()=>{I.print(),setTimeout(()=>{URL.revokeObjectURL(V),Loading.hide(),Notification.success(PTW._t("module.ptw.pdf.readyPrint","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(p){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 PDF:",p);const d=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(p&&p.message?p.message:d))}},setupAnalysisEventListeners(){setTimeout(()=>{this.updatePTWAnalyticsDashboard()},150),this._ptwBindAnalyticsEvents();const e=document.getElementById("ptw-analysis-add");if(e){const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.showAnalysisForm()})}const a=document.getElementById("ptw-analysis-export-excel");if(a){const i=a.cloneNode(!0);a.parentNode.replaceChild(i,a),i.addEventListener("click",()=>this.exportAnalysisReportToExcel())}},_ptwBindAnalyticsEvents(){const e=document.getElementById("ptw-analytics-root");if(!e)return;e.querySelectorAll(".ptw-period-btn").forEach(n=>{n.addEventListener("click",()=>{this._ptwPeriod=n.getAttribute("data-period"),e.querySelectorAll(".ptw-period-btn").forEach(l=>{const p=l===n;l.style.background=p?"#fff":"rgba(255,255,255,0.15)",l.style.color=p?"#1e3a5f":"#fff"}),this.updatePTWAnalyticsDashboard()})});const a=document.getElementById("ptw-analytics-refresh");a&&a.addEventListener("click",()=>this.updatePTWAnalyticsDashboard());const i=document.getElementById("ptw-export-pdf-btn");i&&i.addEventListener("click",()=>this._ptwExportPDF());const r=document.getElementById("ptw-toggle-filters-btn"),s=document.getElementById("ptw-filter-panel");r&&s&&r.addEventListener("click",()=>{const n=s.style.display!=="none";s.style.display=n?"none":"block",r.style.background=n?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const o=document.getElementById("ptw-filter-reset-btn");o&&o.addEventListener("click",()=>{["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(n=>{const l=document.getElementById(n);l&&(l.value="")}),this.updatePTWAnalyticsDashboard()}),["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(n=>{const l=document.getElementById(n);l&&l.addEventListener("change",()=>this.updatePTWAnalyticsDashboard())})},async updatePTWAnalyticsDashboard(){if(!document.getElementById("ptw-analytics-root"))return;try{AppState.appData||(AppState.appData={})}catch{}const a=parseInt(this._ptwPeriod||"0",10),i=this.getAnalysisPermits(),r=this._ptwFilterByPeriod(i,a);this._ptwPopulateFilters(r);const s=this._ptwApplyFilters(r),o=s.length,n=document.getElementById("ptw-filter-count");n&&(n.textContent=`${o} \u062A\u0635\u0631\u064A\u062D`);const l=s.filter(C=>this.isPermitOpenStatus(C?.status)).length,p=s.filter(C=>this.isPermitClosedStatus(C?.status)).length,d=s.filter(C=>(C.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,c=s.filter(C=>C?.isManualEntry!==!0&&(C.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,u=s.filter(C=>(C.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,m=o>0?Math.round(p/o*100):0,f=o>0?Math.round(l/o*100):0,y=o>0?Math.round(d/o*100):0,g=s.filter(C=>{const b=new Date(C.startDate||C.openDate||C.createdAt||""),V=new Date;return!isNaN(b)&&b.getFullYear()===V.getFullYear()&&b.getMonth()===V.getMonth()}).length,x={};s.forEach(C=>{const b=(C.requestingParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";b!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&b!=="\u2014"&&(x[b]=(x[b]||0)+1)});const k=Object.entries(x).sort((C,b)=>b[1]-C[1]),P=k[0],w=P?P[0]:"\u0644\u0627 \u064A\u0648\u062C\u062F",U=P?P[1]:0,F=document.getElementById("ptw-kpi-strip");if(F){const C=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",value:o,icon:"fas fa-clipboard-check",color:"#1d4ed8",bg:"#dbeafe",border:"#bfdbfe"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629 / \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",value:l,icon:"fas fa-folder-open",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u063A\u0644\u0642\u0629 / \u0645\u0643\u062A\u0645\u0644\u0629",value:p,icon:"fas fa-check-circle",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627",value:d,icon:"fas fa-thumbs-up",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",value:c,icon:"fas fa-clock",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u0631\u0641\u0648\u0636\u0629",value:u,icon:"fas fa-times-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:m+"%",icon:"fas fa-chart-pie",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B",value:U>0?w:"\u2014",icon:"fas fa-hotel",color:"#2563eb",bg:"#eff6ff",border:"#bfdbfe",subText:U>0?`${U} \u062A\u0635\u0631\u064A\u062D`:""},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:g,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"}];F.innerHTML=C.map(b=>`
                <div style="background:${b.bg};border:1px solid ${b.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;min-width:0;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${b.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${b.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div style="min-width:0;flex:1;">
                        <div style="font-size:1.1rem;font-weight:800;color:${b.color};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${b.value}">${b.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.label}</div>
                        ${b.subText?`<div style="font-size:0.62rem;color:${b.color};opacity:0.8;font-weight:700;">${b.subText}</div>`:""}
                    </div>
                </div>`).join("")}if(!await this._ptwEnsureChartJS()||typeof Chart>"u")return;const N={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"rgba(124,58,237,0.85)",\u0645\u0641\u062A\u0648\u062D:"rgba(217,119,6,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"rgba(217,119,6,0.85)",\u0645\u063A\u0644\u0642:"rgba(5,150,105,0.85)","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"rgba(5,150,105,0.85)",\u0645\u0631\u0641\u0648\u0636:"rgba(220,38,38,0.85)","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"rgba(220,38,38,0.8)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(234,179,8,0.85)"},D=this._ptwGroupBy(s,"status");this._ptwDrawDoughnut("ptw-chart-status",D.labels,D.data,D.labels.map(C=>N[C]||"rgba(148,163,184,0.8)"));const W=this._ptwGroupByMulti(s,"workType",10);this._ptwDrawDoughnut("ptw-chart-work-type",W.labels,W.data,this._ptwChartColors(W.labels.length)),this._ptwDrawTrend("ptw-chart-timeline",s);const H=this._ptwGroupBy(s,"authorizedParty",10);this._ptwDrawHBar("ptw-chart-authorized",H.labels,H.data,"rgba(245,158,11,0.75)");const T=this._ptwGroupBy(s,"requestingParty",10);this._ptwDrawHBar("ptw-chart-requesting",T.labels,T.data,"rgba(139,92,246,0.75)");const $={},S=this.getSiteOptions().map(C=>C.name.trim());s.forEach(C=>{const b=String(C.location||C.siteName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(S.includes(b)){const V=String(C.sublocation||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",I=`${b} - ${V}`;$[I]=($[I]||0)+1}});let B=Object.entries($).sort((C,b)=>b[1]-C[1]).slice(0,10);B.sort((C,b)=>{const V=C[0].split(" - ")[0],I=b[0].split(" - ")[0];return V!==I?V.localeCompare(I,"ar"):b[1]-C[1]});const O=document.getElementById("ptw-locs-list");O&&(o===0?O.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':O.innerHTML=B.map(([C,b])=>{const V=C.split(" - "),I=V[0]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",z=V[1]||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645",J=Math.round(b/o*100);return`
                        <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                                    <span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;flex-shrink:0;">${Utils.escapeHTML(I)}</span>
                                    <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(z)}">${Utils.escapeHTML(z)}</span>
                                </div>
                                <span style="font-size:0.75rem;font-weight:700;color:#0369a1;flex-shrink:0;margin-right:8px;">${b} \u062A\u0635\u0631\u064A\u062D (${J}%)</span>
                            </div>
                            <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${J}%;height:100%;background:linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);border-radius:9999px;"></div>
                            </div>
                        </div>
                    `}).join(""));const Y=document.getElementById("ptw-depts-list");Y&&(o===0?Y.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':Y.innerHTML=k.map(([C,b])=>{const V=Math.round(b/o*100);return`
                        <div>
                            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#374151;margin-bottom:4px;">
                                <span>${Utils.escapeHTML(C)}</span>
                                <span style="color:#2563eb;">${b} \u062A\u0635\u0631\u064A\u062D (${V}%)</span>
                            </div>
                            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:9999px;overflow:hidden;">
                                <div style="width:${V}%;height:100%;background:linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);border-radius:9999px;transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    `}).join(""));const ee=document.getElementById("ptw-factories-cards");if(ee)if(o===0)ee.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';else{const C=this.getSiteOptions();ee.innerHTML=C.map((b,V)=>{const I=b.name.trim(),z=s.filter(ne=>(ne.location||ne.siteName||"").trim()===I),J=z.length,le=Math.round(J/o*100)||0,re=z.filter(ne=>this.isPermitOpenStatus(ne?.status)).length,ae=z.filter(ne=>this.isPermitClosedStatus(ne?.status)).length,ce=[{primary:"#0284c7",light:"#e0f2fe",progress:"linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"},{primary:"#059669",light:"#ecfdf5",progress:"linear-gradient(90deg, #34d399 0%, #059669 100%)"},{primary:"#7c3aed",light:"#f5f3ff",progress:"linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)"}],te=ce[V%ce.length];return`
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                             onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${te.primary}'" 
                             onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                             onclick="const el = document.getElementById('ptw-af-location'); if(el){el.value='${I}'; el.dispatchEvent(new Event('change'));}">
                            
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <div style="width:36px;height:36px;background:${te.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${te.primary};">
                                        <i class="fas fa-industry" style="font-size:16px;"></i>
                                    </div>
                                    <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(I)}</span>
                                </div>
                                <span style="font-size:1.15rem;font-weight:900;color:${te.primary};">${le}%</span>
                            </div>
                            
                            <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${le}%;height:100%;background:${te.progress};border-radius:9999px;"></div>
                            </div>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px;border-top:1px solid #f1f5f9;padding-top:12px;">
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#64748b;margin-bottom:2px;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#1e293b;">${J}</div>
                                </div>
                                <div style="text-align:center;border-left:1px solid #f1f5f9;border-right:1px solid #f1f5f9;">
                                    <div style="font-size:0.65rem;color:#d97706;margin-bottom:2px;">\u0645\u0641\u062A\u0648\u062D\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#d97706;">${re}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#059669;margin-bottom:2px;">\u0645\u063A\u0644\u0642\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#059669;">${ae}</div>
                                </div>
                            </div>
                        </div>
                    `}).join("")}const v=s.slice().sort((C,b)=>{const V=new Date(b.startDate||b.openDate||b.createdAt||""),I=new Date(C.startDate||C.openDate||C.createdAt||"");return V-I}).slice(0,20),E=document.getElementById("ptw-top-count"),K=document.getElementById("ptw-top-tbody");if(E&&(E.textContent=`${v.length} \u062A\u0635\u0631\u064A\u062D`),K)if(!v.length)K.innerHTML='<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;"><i class="fas fa-info-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';else{const C={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"background:#f5f3ff;color:#5b21b6;",\u0645\u0641\u062A\u0648\u062D:"background:#fffbeb;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#fffbeb;color:#92400e;",\u0645\u063A\u0644\u0642:"background:#ecfdf5;color:#065f46;","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"background:#ecfdf5;color:#065f46;",\u0645\u0631\u0641\u0648\u0636:"background:#fef2f2;color:#991b1b;","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"background:#fef2f2;color:#991b1b;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#fffbeb;color:#92400e;"};K.innerHTML=v.map((b,V)=>{const I=Array.isArray(b.workType)?b.workType.join("\u060C "):b.workType||b.permitType||"\u2014",z=Utils.escapeHTML(b.authorizedParty||"\u2014"),J=Utils.escapeHTML(b.requestingParty||"\u2014"),le=Utils.escapeHTML(b.location||b.siteName||"\u2014"),re=Utils.escapeHTML(b.workDescription||"\u2014"),ae=V%2===0?"#fff":"#fafafa",ce=C[b.status]||"background:#f1f5f9;color:#374151;",te=b.startDate||b.openDate||b.createdAt||"",ne=te?(()=>{try{return new Date(te).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"})}catch{return te.slice(0,10)}})():"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${ae};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${ae}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${re}">${re}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${Utils.escapeHTML(Array.isArray(b.workType)?b.workType.join("\u060C "):b.workType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${z}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${J}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${le}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${ne}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:700;white-space:nowrap;${ce}">${Utils.escapeHTML(b.status||"\u2014")}</span></td>
                    </tr>`}).join("")}},_ptwFilterByPeriod(e,a){if(!a||a===0)return e;const i=new Date;return i.setDate(i.getDate()-a),e.filter(r=>{const s=new Date(r.startDate||r.openDate||r.createdAt||"");return!isNaN(s.getTime())&&s>=i})},_ptwGroupBy(e,a,i=0){const r={};e.forEach(o=>{const n=String(o[a]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[n]=(r[n]||0)+1});let s=Object.entries(r).sort((o,n)=>n[1]-o[1]);return i>0&&(s=s.slice(0,i)),{labels:s.map(o=>o[0]),data:s.map(o=>o[1])}},_ptwGroupByMulti(e,a,i=0){const r={};e.forEach(o=>{const n=o[a];(Array.isArray(n)?n:n?[String(n)]:["\u0623\u062E\u0631\u0649"]).forEach(p=>{const d=(p||"").trim()||"\u0623\u062E\u0631\u0649";r[d]=(r[d]||0)+1})});let s=Object.entries(r).sort((o,n)=>n[1]-o[1]);return i>0&&(s=s.slice(0,i)),{labels:s.map(o=>o[0]),data:s.map(o=>o[1])}},_ptwPopulateFilters(e){const a=o=>[...new Set(e.map(o).flat().filter(n=>n&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))].sort(),i=(o,n)=>{const l=document.getElementById(o);if(!l)return;const p=l.value;l.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(d=>`<option value="${d}"${d===p?" selected":""}>${d}</option>`).join("")};i("ptw-af-status",a(o=>[String(o.status||"").trim()])),i("ptw-af-work-type",a(o=>Array.isArray(o.workType)?o.workType.map(n=>(n||"").trim()):[(o.workType||"").trim()])),i("ptw-af-authorized",a(o=>[String(o.authorizedParty||"").trim()])),i("ptw-af-requesting",a(o=>[String(o.requestingParty||"").trim()]));const r=this.getSiteOptions().map(o=>o.name.trim()),s=a(o=>[String(o.location||o.siteName||"").trim()]).filter(o=>r.includes(o));i("ptw-af-location",s)},_ptwApplyFilters(e){const a=d=>{const c=document.getElementById(d);return c?c.value.trim():""},i=a("ptw-af-status"),r=a("ptw-af-work-type"),s=a("ptw-af-authorized"),o=a("ptw-af-requesting"),n=a("ptw-af-location"),l=[i,r,s,o,n].some(d=>d!==""),p=document.getElementById("ptw-filter-badge");return p&&(p.style.display=l?"inline":"none"),e.filter(d=>!(i&&String(d.status||"").trim()!==i||r&&!(Array.isArray(d.workType)?d.workType:[d.workType||""]).some(u=>(u||"").trim()===r)||s&&String(d.authorizedParty||"").trim()!==s||o&&String(d.requestingParty||"").trim()!==o||n&&String(d.location||d.siteName||"").trim()!==n))},_ptwDrawDoughnut(e,a,i,r){const s=document.getElementById(e),o=document.getElementById(e+"-empty");if(!s)return;if(!i.length||i.reduce((p,d)=>p+d,0)===0){s.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),s.style.display="";const n=i.reduce((p,d)=>p+d,0);this._ptwCharts||(this._ptwCharts={});const l=this._ptwCharts[e];if(l)try{l.destroy()}catch{}this._ptwCharts[e]=new Chart(s,{type:"doughnut",data:{labels:a,datasets:[{data:i,backgroundColor:r,borderWidth:2,borderColor:"#fff",hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,font:{size:11},padding:12}},tooltip:{callbacks:{label:p=>` ${p.label}: ${p.parsed} (${Math.round(p.parsed/n*100)}%)`}}}}})},_ptwDrawHBar(e,a,i,r){const s=document.getElementById(e),o=document.getElementById(e+"-empty");if(!s)return;if(!i.length){s.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),s.style.display="",this._ptwCharts||(this._ptwCharts={});const n=this._ptwCharts[e];if(n)try{n.destroy()}catch{}this._ptwCharts[e]=new Chart(s,{type:"bar",data:{labels:a,datasets:[{data:i,backgroundColor:r,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>` ${l.parsed.x} \u062A\u0635\u0631\u064A\u062D`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:l=>String(a[l]).length>20?String(a[l]).slice(0,19)+"\u2026":a[l]}}}}})},_ptwDrawTrend(e,a){const i=document.getElementById(e),r=document.getElementById(e+"-empty");if(!i)return;const s=new Date,o=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],n=[];for(let d=11;d>=0;d--){const c=new Date(s.getFullYear(),s.getMonth()-d,1);n.push({year:c.getFullYear(),month:c.getMonth(),label:`${o[c.getMonth()]} ${c.getFullYear()}`})}const l=n.map(d=>a.filter(c=>{const u=new Date(c.startDate||c.openDate||c.createdAt||"");return!isNaN(u.getTime())&&u.getFullYear()===d.year&&u.getMonth()===d.month}).length);if(l.reduce((d,c)=>d+c,0)===0){i.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),i.style.display="",this._ptwCharts||(this._ptwCharts={});const p=this._ptwCharts[e];if(p)try{p.destroy()}catch{}this._ptwCharts[e]=new Chart(i,{type:"bar",data:{labels:n.map(d=>d.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",data:l,backgroundColor:l.map(d=>d===Math.max(...l)?"rgba(29,78,216,0.85)":"rgba(29,78,216,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:l,type:"line",borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#10b981",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},async _ptwEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(a=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),a(!0))},100);setTimeout(()=>{clearInterval(i),a(!1)},5e3)}):new Promise(a=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>a(!0),i.onerror=()=>{const r=document.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",r.onload=()=>a(!0),r.onerror=()=>a(!1),document.head.appendChild(r)},document.head.appendChild(i)})},_ptwChartColors(e){const a=["rgba(29,78,216,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(249,115,22,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,r)=>a[r%a.length])},async _ptwExportPDF(){const e=document.getElementById("ptw-analytics-root");if(!e)return;const a=document.getElementById("ptw-export-pdf-btn"),i=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const r=(F,_)=>new Promise((N,D)=>{if(_())return N();const W=document.createElement("script");W.src=F,W.onload=()=>N(),W.onerror=()=>D(new Error("Failed: "+F)),document.head.appendChild(W)});await r("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await r("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const s=document.getElementById("ptw-filter-panel"),o=s&&s.style.display!=="none";o&&(s.style.display="none");const n=await html2canvas(e,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});o&&(s.style.display="");const{jsPDF:l}=window.jspdf,p=new l({orientation:"portrait",unit:"mm",format:"a4"}),d=p.internal.pageSize.getWidth(),c=p.internal.pageSize.getHeight(),u=10,m=20,f=14,y=d-u*2,g=c-m-f-u*.5,x=y/n.width,k=g/x,P=Math.ceil(n.height/k),w=new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),U=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});for(let F=0;F<P;F++){F>0&&p.addPage(),p.setFillColor(30,58,95),p.rect(0,0,d,m,"F"),p.setFillColor(29,78,216),p.rect(0,m-3,d,3,"F"),p.setTextColor(255,255,255),p.setFontSize(13),p.setFont(void 0,"bold"),p.text("Work Permits Analytics Report",u,9,{align:"left"}),p.setFontSize(8),p.setFont(void 0,"normal"),p.text("SafetyHub | ICAPP \u2014 Permit to Work Analysis Dashboard",u,15,{align:"left"}),p.setFontSize(8.5),p.text(`${w}  ${U}`,d-u,9,{align:"right"}),p.setFontSize(9),p.setFont(void 0,"bold"),p.text(`Page ${F+1} of ${P}`,d-u,15.5,{align:"right"}),p.setTextColor(0,0,0);const _=document.createElement("canvas"),N=Math.min(k,n.height-F*k);_.width=n.width,_.height=N,_.getContext("2d").drawImage(n,0,F*k,n.width,N,0,0,n.width,N);const{dataUrl:D,format:W}=Utils.PdfExport.compressCanvasToJpegDataUrl(_,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/Math.max(1,P)));p.addImage(D,W,u,m,y,N*x);const H=c-f;p.setDrawColor(191,219,254),p.setLineWidth(.4),p.line(0,H,d,H),p.setFillColor(239,246,255),p.rect(0,H,d,f,"F"),p.setFontSize(7.5),p.setTextColor(29,78,216),p.setFont(void 0,"bold"),p.text("SafetyHub | ICAPP",u,H+5,{align:"left"}),p.setFont(void 0,"normal"),p.setFontSize(6.5),p.setTextColor(100,116,139),p.text("Work Permits Analysis Report \u2014 Confidential",u,H+10,{align:"left"}),p.setFontSize(8),p.setTextColor(29,78,216),p.setFont(void 0,"bold"),p.text(`${F+1} / ${P}`,d/2,H+7.5,{align:"center"}),p.setFont(void 0,"normal"),p.setFontSize(7),p.setTextColor(100,116,139),p.text(w,d-u,H+5,{align:"right"}),p.text(U,d-u,H+10,{align:"right"})}p.save(`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u062A\u0635\u0627\u0631\u064A\u062D-\u0627\u0644\u0639\u0645\u0644-${new Date().toISOString().slice(0,10)}.pdf`)}catch{}finally{a&&(a.disabled=!1,a.innerHTML=i)}},showAnalysisForm(e=null){AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),AppState.appData.ptw||(AppState.appData.ptw=[]);const a=e?AppState.appData.ptwAnalysis.find(u=>u&&u.id===e):null,i=AppState.appData.ptw||[],r=[...new Set(i.map(u=>u&&u.workType).filter(Boolean))],s=[...new Set(i.map(u=>u&&(u.siteName||u.location)).filter(Boolean))],o=(u,m)=>this._t(u,m),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-chart-line ml-2"></i>
                        ${a?o("module.ptw.analysis.form.titleEdit","\u062A\u0639\u062F\u064A\u0644 \u062A\u062D\u0644\u064A\u0644"):o("module.ptw.analysis.form.titleAdd","\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F")}
                    </h2>
                    <button class="modal-close" aria-label="${o("module.ptw.analysis.form.closeAria","\u0625\u063A\u0644\u0627\u0642")}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="ptw-analysis-form" class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.dateLabel","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644")} <span class="text-red-500">*</span></label>
                            <input type="date" id="analysis-date" required class="form-input"
                                value="${a?.analysisDate?new Date(a.analysisDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.periodLabel","\u0627\u0644\u0641\u062A\u0631\u0629")}</label>
                            <input type="text" id="analysis-period" class="form-input" placeholder="${o("module.ptw.analysis.form.periodPh","\u0645\u062B\u0627\u0644: \u064A\u0646\u0627\u064A\u0631 2024")}"
                                value="${Utils.escapeHTML(a?.period||"")}">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.workType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</label>
                                <select id="analysis-work-type" class="form-input">
                                    <option value="">${o("module.ptw.analysis.form.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                    ${r.map(u=>`
                                        <option value="${Utils.escapeHTML(u)}" ${a?.workType===u?"selected":""}>
                                            ${Utils.escapeHTML(u)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                                <select id="analysis-location" class="form-input">
                                    <option value="">${o("module.ptw.analysis.form.allSites","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                    ${s.map(u=>`
                                        <option value="${Utils.escapeHTML(u)}" ${a?.location===u?"selected":""}>
                                            ${Utils.escapeHTML(u)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.notesLabel","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</label>
                            <textarea id="analysis-notes" class="form-input" rows="6" placeholder="${o("module.ptw.analysis.form.notesPh","\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C...")}">${Utils.escapeHTML(a?.notes||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${o("module.ptw.analysis.form.recsLabel","\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A")}</label>
                            <textarea id="analysis-recommendations" class="form-input" rows="4" placeholder="${o("module.ptw.analysis.form.recsPh","\u0623\u062F\u062E\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A...")}">${Utils.escapeHTML(a?.recommendations||"")}</textarea>
                        </div>
                    </div>
                    <div class="modal-footer mt-6 form-actions-centered">
                        <button type="button" class="btn-secondary" data-action="close">${o("module.ptw.analysis.form.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${a?o("module.ptw.analysis.form.update","\u062A\u062D\u062F\u064A\u062B"):o("module.ptw.analysis.form.save","\u062D\u0641\u0638")}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(n);const l=()=>{n&&n.parentNode&&n.remove()},p=n.querySelector(".modal-close");p&&p.addEventListener("click",l);const d=n.querySelector('[data-action="close"]');d&&d.addEventListener("click",l),n.addEventListener("click",u=>{(u.target===n||u.target.classList.contains("modal-overlay"))&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&l()});const c=document.getElementById("ptw-analysis-form");c?c.addEventListener("submit",async u=>{u.preventDefault(),await this.saveAnalysis(e,n)}):Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644")},async saveAnalysis(e,a){try{const i=document.getElementById("analysis-date");if(!i||!i.value){Notification.error(this._t("module.ptw.notify.dateRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644"));return}const r=new Date(i.value);if(isNaN(r.getTime())){Notification.error(this._t("module.ptw.notify.dateInvalid","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"));return}const s={id:e||Utils.generateId("PTW_ANALYSIS"),analysisDate:r.toISOString(),period:(document.getElementById("analysis-period")?.value||"").trim(),workType:(document.getElementById("analysis-work-type")?.value||"").trim(),location:(document.getElementById("analysis-location")?.value||"").trim(),notes:(document.getElementById("analysis-notes")?.value||"").trim(),recommendations:(document.getElementById("analysis-recommendations")?.value||"").trim(),createdAt:e&&AppState.appData.ptwAnalysis?AppState.appData.ptwAnalysis.find(n=>n&&n.id===e)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),e){const n=AppState.appData.ptwAnalysis.findIndex(l=>l&&l.id===e);n!==-1?AppState.appData.ptwAnalysis[n]={...AppState.appData.ptwAnalysis[n],...s}:(Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062A\u062D\u062F\u064A\u062B\u060C \u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F"),AppState.appData.ptwAnalysis.push(s))}else AppState.appData.ptwAnalysis.push(s);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(e?this._t("module.ptw.notify.analysisUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"):this._t("module.ptw.notify.analysisAdded","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")),a&&a.parentNode&&a.remove();const o=document.getElementById("ptw-analysis-content");o&&(o.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",i),Notification.error(this._t("module.ptw.notify.analysisSaveErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},editAnalysis(e){this.showAnalysisForm(e)},async deleteAnalysis(e){if(confirm(this._t("module.ptw.notify.deleteAnalysisConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u061F")))try{AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]);const a=AppState.appData.ptwAnalysis.length;if(AppState.appData.ptwAnalysis=AppState.appData.ptwAnalysis.filter(r=>r&&r.id!==e),AppState.appData.ptwAnalysis.length===a){Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062D\u0630\u0641"),Notification.warning(this._t("module.ptw.notify.analysisNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.notify.analysisDeleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"));const i=document.getElementById("ptw-analysis-content");i&&(i.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",a),Notification.error(this._t("module.ptw.notify.analysisDeleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},renderApprovalsContent(){const e=document.getElementById("ptw-map-content");e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.position="absolute",e.style.left="-9999px",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.style.pointerEvents="none",e.style.zIndex="-1");try{const a=(o,n)=>this._t(o,n),i=AppState.currentUser?.email?.toLowerCase()||"",s=(AppState.appData.ptw||[]).map(o=>{try{return o&&o.approvals&&this.updatePermitStatus(o),o}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",n),o}}).filter(o=>{try{const n=(o?.status||"").trim();if(!o||o.isManualEntry===!0||o.skipApprovalFlow===!0||!o||n==="\u0645\u063A\u0644\u0642"||n==="\u0645\u0631\u0641\u0648\u0636"||n==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||n==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A")return!1;const p=this.normalizeApprovals(o.approvals||[]).find(f=>f&&f.status==="pending");if(!p)return!1;const d=p.approverEmail&&p.approverEmail.toLowerCase()===i,c=!p.approverEmail&&Array.isArray(p.candidates)&&p.candidates.some(f=>f&&f.email&&f.email.toLowerCase()===i),u=AppState.currentUser?.id||"",m=!d&&p.approverId&&(p.approverId===u||p.approverId===i);return d||c||m}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u0635\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",n),!1}}).sort((o,n)=>{const l=o?.createdAt?new Date(o.createdAt).getTime():0;return(n?.createdAt?new Date(n.createdAt).getTime():0)-l});return`
            <div class="space-y-6">
                <!-- My Pending Approvals -->
                <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <div class="card-header bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 p-4 flex justify-between items-center">
                        <h2 class="card-title text-blue-800 font-bold text-lg">
                            <i class="fas fa-signature ml-2 text-blue-600"></i>
                            ${a("module.ptw.approvals.myPending","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u064A")}
                            <span class="mr-2 bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full">${s.length}</span>
                        </h2>
                        <button onclick="PTW.refreshApprovalsContent()" class="btn-secondary btn-sm flex items-center gap-2" title="${a("module.ptw.approvals.updateList","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629")}">
                            <i class="fas fa-sync-alt"></i>
                            <span>${a("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}</span>
                        </button>
                    </div>
                    <div class="card-body p-0">
                        ${s.length?`
                            <div class="overflow-x-auto">
                                <table class="w-full text-right">
                                    <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                                        <tr>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colPermit","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colWorkType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</th>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colLocation","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colStart","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621")}</th>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colStatus","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                                            <th class="px-6 py-4">${a("module.ptw.approvals.colAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${s.map(o=>{try{const n=o?.id||"",l=a("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p=Utils.escapeHTML(String(o?.workType||l)),d=Utils.escapeHTML(String(o?.location||o?.siteName||l)),c=o?.startDate?typeof Utils.formatDate=="function"?Utils.formatDate(o.startDate):new Date(o.startDate).toLocaleDateString("ar-SA"):"-",m=this.normalizeApprovals(o.approvals||[]).find(P=>P&&P.status==="pending"),f=m&&m.role||a("module.ptw.approval.approvalRequired","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629"),y=String(o?.requesterName||o?.requestedBy?.name||o?.requestedBy||l),g=y!==l?`<div class="text-xs text-gray-500 mt-1">${a("module.ptw.approvals.fromRequester","\u0645\u0646: {name}").replace(/\{name\}/g,Utils.escapeHTML(y))}</div>`:"",x=this.statusLabel(o?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),k=this.approvalRoleLabel(f);return`
                                                    <tr class="hover:bg-gray-50 transition-colors">
                                                        <td class="px-6 py-4">
                                                            <div class="font-mono text-sm text-gray-700 font-semibold">#${Utils.escapeHTML(String(n))}</div>
                                                            ${g}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="font-medium text-gray-800">${p}</div>
                                                            ${k?`<div class="text-xs text-blue-600 mt-1">
                                                                <i class="fas fa-tasks mr-1"></i>${Utils.escapeHTML(k)}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4 text-gray-600 text-sm">${d}</td>
                                                        <td class="px-6 py-4">
                                                            <div class="text-gray-600 text-sm">${c}</div>
                                                            ${o?.createdAt?`<div class="text-xs text-gray-500 mt-1">
                                                                ${a("module.ptw.approvals.createdOn","\u0625\u0646\u0634\u0627\u0621: ")}${typeof Utils.formatDate=="function"?Utils.formatDate(o.createdAt):new Date(o.createdAt).toLocaleDateString("ar-SA")}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                <i class="fas fa-clock mr-1"></i> ${a("module.ptw.approvals.badge","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u062A\u0643")}
                                                            </span>
                                                            <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(String(x))}</div>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <button onclick="PTW.viewPTW('${Utils.escapeHTML(String(n))}')" class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center justify-center">
                                                                <i class="fas fa-eye ml-1"></i> ${a("module.ptw.approvals.review","\u0645\u0631\u0627\u062C\u0639\u0629")}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                `}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",n),""}}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `:`
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="bg-gray-50 rounded-full p-4 mb-3">
                                    <i class="fas fa-check text-gray-300 text-3xl"></i>
                                </div>
                                <h3 class="text-gray-900 font-medium">${a("module.ptw.approvals.noneTitle","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0645\u0639\u0644\u0642\u0629")}</h3>
                                <p class="text-gray-500 text-sm mt-1">${a("module.ptw.approvals.noneSub","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0648\u0643\u0644\u0629 \u0625\u0644\u064A\u0643 \u0645\u0643\u062A\u0645\u0644\u0629.")}</p>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Approval Circuits Integration -->
                 <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="card-header bg-gradient-to-r from-purple-50 to-white border-b border-purple-100 p-4">
                        <h2 class="card-title text-purple-800 font-bold text-lg">
                            <i class="fas fa-project-diagram ml-2 text-purple-600"></i>
                             ${a("module.ptw.approvals.circuits","\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}
                        </h2>
                    </div>
                    <div class="card-body p-6">
                        <div id="approval-circuits-container">
                             ${typeof ApprovalCircuits<"u"&&typeof ApprovalCircuits.renderManager=="function"?(()=>{try{return ApprovalCircuits.renderManager("ptw")}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",o),`
                            <div class="text-center py-8">
                                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
                                    <p class="text-yellow-800 text-sm">${a("module.ptw.approvals.circuitsError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}</p>
                                </div>
                            </div>
                        `}})():`
                                    <div class="text-center py-8">
                                        <div class="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <i class="fas fa-route text-purple-400 text-2xl"></i>
                                        </div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-2">${a("module.ptw.approvals.circuitsTitle","\u0646\u0638\u0627\u0645 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</h3>
                                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">${a("module.ptw.approvals.circuitsDesc","\u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u062A\u0643\u0648\u064A\u0646\u0627\u062A \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A.")}</p>
                                        <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-2xl mx-auto text-right">
                                            <h4 class="font-bold text-blue-800 mb-2 text-sm">${a("module.ptw.approvals.circuitsHow","\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A\u061F")}</h4>
                                            <ul class="text-sm text-blue-700 space-y-2 list-disc list-inside">
                                                <li>${a("module.ptw.approvals.circuitsLi1","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0627\u0644\u0645\u0648\u0642\u0639.")}</li>
                                                <li>${a("module.ptw.approvals.circuitsLi2","\u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646 \u062A\u0639\u064A\u064A\u0646 \u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u062D\u062F\u062F\u064A\u0646 \u0644\u0643\u0644 \u0645\u0631\u062D\u0644\u0629.")}</li>
                                                <li>${a("module.ptw.approvals.circuitsLi3","\u062A\u0635\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u062F\u0648\u0631\u0647\u0645 \u0641\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                `}
                        </div>
                    </div>
                 </div>
            </div>
        `}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",a);const i=(r,s)=>this._t(r,s);return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${i("module.ptw.approvals.errorLoad","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A")}</p>
                            <button onclick="PTW.switchTab('approvals')" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${i("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                </div>
            `}},refreshApprovalsContent(){try{const e=document.getElementById("ptw-approvals-content");e&&(e.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"),typeof Notification<"u"&&Notification.success(this._t("module.ptw.approvals.notifyUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629")))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",e),typeof Notification<"u"&&Notification.error(this._t("module.ptw.approvals.notifyErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"))}},setupApprovalsEventListeners(){setTimeout(()=>{document.querySelectorAll('[onclick*="PTW.viewPTW"]').forEach(i=>{const r=i.getAttribute("onclick");if(r&&r.includes("viewPTW")){const s=r.match(/viewPTW\('([^']+)'\)/);s&&s[1]&&(i.removeAttribute("onclick"),i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),this.viewPTW(s[1])}))}});const a=document.querySelector('[onclick*="refreshApprovalsContent"]');a&&!a.dataset.listenerAttached&&(a.removeAttribute("onclick"),a.addEventListener("click",()=>this.refreshApprovalsContent()),a.dataset.listenerAttached="true")},100)},loadPTWList(e=!1){this._loadPTWListTimeout&&(clearTimeout(this._loadPTWListTimeout),this._loadPTWListTimeout=null);const a=()=>{try{const i=document.querySelector("#ptw-table-container");if(!i)return;let r=i.querySelector("table");const s=r?.querySelector("tbody"),o=s&&s.querySelectorAll("tr").length>0&&!s.querySelector('tr[data-ptw-loading="1"]');if(r){if(!o&&r.parentNode&&document.body.contains(r)){if(!r.querySelector("thead")){const n=document.createElement("thead");n.innerHTML=`
                                <tr>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</th>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                    <th>\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</th>
                                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                    <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                    <th>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            `;try{r.insertBefore(n,r.firstChild)}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A insertBefore \u0644\u0644\u0640 thead:",l)}}if(!r.querySelector("tbody")){const n=document.createElement("tbody");n.innerHTML=`
                                <tr>
                                    <td colspan="8" class="text-center text-gray-500 py-8">
                                        <div style="width: 300px; margin: 0 auto 16px;">
                                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                            </div>
                                        </div>
                                        <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                                    </td>
                                </tr>
                            `;try{r.appendChild(n)}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u0640 tbody:",l)}}}}else if(r=document.createElement("table"),r.className="data-table",r.innerHTML=`
                        <thead>
                            <tr>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th>\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="8" class="text-center text-gray-500 py-8">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                                </td>
                            </tr>
                        </tbody>
                    `,i.innerHTML="",i.parentNode&&document.body.contains(i))try{i.appendChild(r)}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u062C\u062F\u0648\u0644:",n)}this.filterItems(),this.updateSublocationFilterOptions()}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",i)}};e?a():this._loadPTWListTimeout=setTimeout(a,100)},protectTabButtons(){const e=document.querySelectorAll(".ptw-tab-btn"),a=document.querySelector(".ptw-tabs");a&&(a.style.setProperty("flex-wrap","nowrap","important"),a.style.setProperty("min-width","0","important"),a.style.setProperty("width","100%","important"),a.style.setProperty("max-width","100%","important"),a.style.setProperty("box-sizing","border-box","important")),e.forEach(i=>{i.classList.remove("flex-1"),i.style.setProperty("flex-shrink","0","important"),i.style.setProperty("flex-grow","0","important"),i.style.setProperty("flex-basis","auto","important"),i.style.setProperty("min-width","fit-content","important"),i.style.setProperty("white-space","nowrap","important"),i.style.setProperty("width","auto","important"),i.style.setProperty("max-width","none","important"),i.style.setProperty("box-sizing","border-box","important")})},setupTabProtection(){if(this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),!document.querySelector(".ptw-tabs"))return;let a;const i=new MutationObserver(o=>{clearTimeout(a),a=setTimeout(()=>{let n=!1;o.forEach(l=>{if(l.type==="attributes"&&l.attributeName==="style"){const p=l.target;p.classList.contains("ptw-tab-btn")&&(p.style.flexShrink!=="0"||p.style.minWidth!=="fit-content")&&(n=!0)}}),n&&this.protectTabButtons()},50)});this._tabProtectionObserver=i,document.querySelectorAll(".ptw-tab-btn").forEach(o=>{i.observe(o,{attributes:!0,attributeFilter:["style","class"]})});const s=()=>{this._tabResizeTimeout&&clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=setTimeout(()=>{this.protectTabButtons()},150)};if(this._tabResizeHandler=s,window.addEventListener("resize",s,{passive:!0}),!this._loadHandlerBound){const o=()=>{setTimeout(()=>{this.protectTabButtons()},200)};window.addEventListener("load",o,{once:!0}),this._loadHandlerBound=!0}},cleanupTabProtection(){this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),this._loadHandlerBound=!1},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module..."),this._deferredSyncTimer&&(clearTimeout(this._deferredSyncTimer),this._deferredSyncTimer=null),this._backendSyncStarted=!1,this.cleanupTabProtection(),typeof this.destroyMap=="function"&&this.destroyMap(),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 PTW module:",e)}}};(function(){"use strict";try{typeof window<"u"&&typeof PTW<"u"&&(window.PTW=PTW,window.addEventListener("formSettingsUpdated",function(){try{typeof PTW<"u"&&PTW.refreshSiteDropdowns&&PTW.refreshSiteDropdowns()}catch{}}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PTW module loaded and available on window.PTW"))}catch{if(typeof window<"u"&&typeof PTW<"u")try{window.PTW=PTW}catch{}}})();
