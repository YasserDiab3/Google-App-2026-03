const PTW={approvals:[],formApprovals:[],formCircuitOwnerId:"__default__",formCircuitName:"",_loadPTWListTimeout:null,_ptwBackendLoadPromise:null,_mapMarkersToken:0,_registrySanitizedCache:null,_registryTableMountToken:0,_isSubmitting:!1,_isSavingManualPermit:!1,_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(t){const e=t||document,a=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;a&&(typeof a.applyI18n=="function"&&a.applyI18n(e),typeof a.applyLiteralTranslations=="function"&&a.applyLiteralTranslations(e))},_t(t,e){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(t,e):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(t,e):e},statusLabel(t){const e=String(t||"").trim();if(!e)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const r={\u0645\u063A\u0644\u0642:"module.ptw.status.closed",\u0645\u0641\u062A\u0648\u062D:"module.ptw.status.open",\u0645\u0631\u0641\u0648\u0636:"module.ptw.status.rejected","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"module.ptw.status.underReview","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"module.ptw.status.approved","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"module.ptw.status.safelyCompleted","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"module.ptw.status.forcedClose","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":"module.ptw.status.incomplete"}[e];return r?this._t(r,e):e},approvalRoleLabel(t){const e=String(t||"").trim();if(!e)return"";const r={"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":"module.ptw.approval.requestingOfficer","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"module.ptw.approval.areaManager","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629":"module.ptw.approval.safetyOfficer","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629":"module.ptw.approval.approvalRequired"}[e];return r?this._t(r,e):e},formatDurationI18n(t){if(!Number.isFinite(t))return this._t("module.ptw.duration.error","\u062E\u0637\u0623");if(t<0)return this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D");const e=Math.floor(t/(1e3*60)),a=Math.floor(e/60),r=e%60;return a===0?this._t("module.ptw.duration.minutesOnly","{n} \u062F\u0642\u064A\u0642\u0629").replace(/\{n\}/g,String(r)):r===0?this._t("module.ptw.duration.hoursOnly","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(a)):this._t("module.ptw.duration.hoursAndMinutes","{h} \u0633\u0627\u0639\u0629 \u0648 {m} \u062F\u0642\u064A\u0642\u0629").replace(/\{h\}/g,String(a)).replace(/\{m\}/g,String(r))},ensureI18nObservers(t){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),t&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(e=>{e.forEach(a=>{a.addedNodes.forEach(r=>{r&&r.nodeType===1&&this.applyModuleI18n(r)})})}),this._i18nSectionObserver.observe(t,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(e=>{e.forEach(a=>{a.addedNodes.forEach(r=>{!r||r.nodeType!==1||(r.classList?.contains("modal-overlay")||r.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(r)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},getDefaultApprovals(){return[{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:0},{role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:1,approvalRoleKey:"areaManager"},{role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:2,approvalRoleKey:"maintenanceEngineer"},{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:3,isSafetyOfficer:!0}]},_PTW_IA_ROLE_BY_AR:{"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"areaManager","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629":"maintenanceEngineer"},_PTW_IA_ROLE_LABELS:{areaManager:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",maintenanceEngineer:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"},_resolveIaRoleKey(t,e){return e?String(e).trim():this._PTW_IA_ROLE_BY_AR[String(t||"").trim()]||""},_iaWorkflowCacheKey:"",_iaWorkflowCachePromise:null,async _getCachedIaWorkflow(t){const e=Array.isArray(t)?t.filter(Boolean):[];if(!e.length)return null;const a=e.slice().sort().join("|");return this._iaWorkflowCacheKey===a&&this._iaWorkflowCachePromise?this._iaWorkflowCachePromise:(this._iaWorkflowCacheKey=a,this._iaWorkflowCachePromise=this._buildIssuingAuthoritiesWorkflow(e).catch(r=>{throw this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null,r}),this._iaWorkflowCachePromise)},_clearIaWorkflowCache(){this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null},async _fetchIaCandidatesForRole(t,e){const a=String(e||"").trim();if(!a||a==="general")return[];const r=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!r||typeof r.getAuthoritiesForApprovalRole!="function")return[];const i=this._extractPermitTypeFields(t);try{return await r.getAuthoritiesForApprovalRole(i,a)}catch(s){return typeof Utils<"u"&&Utils.safeWarn("_fetchIaCandidatesForRole error:",s),[]}},_manualEntryToPtwStub(t){return t?{hotWorkDetails:t.hotWorkDetails,confinedSpaceDetails:t.confinedSpaceDetails,heightWorkDetails:t.heightWorkDetails,lotoApplied:t.lotoApplied,coldWorkType:t.coldWorkType,excavationLength:t.excavationLength,excavationWidth:t.excavationWidth,excavationDepth:t.excavationDepth,soilType:t.soilType,permitType:t.permitType,workType:t.workType||t.permitTypeDisplay,otherWorkType:t.otherWorkType,electricalWorkType:t.electricalWorkType}:null},_renderIaRolePickerHTML(t={}){const e=Utils.escapeHTML,a=String(t.roleLabel||t.role||"").trim(),r=this._resolveIaRoleKey(a,t.roleKey),i=Array.isArray(t.candidates)?t.candidates:[],s=String(t.selectedId||t.approverId||"").trim(),o=String(t.selectedName||t.name||"").trim(),l=t.inputClass||"form-input text-sm w-full manual-approval-name",n=t.sigClass||"",p=!!t.isClosure,d=p?"manual-closure-approval-name":"manual-approval-name",c=l.includes(d)?l:`${l} ${d}`,m=k=>k==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",u=i.find(k=>k.id===s),h=o&&!u&&s!=="__manual__",f=h?"__manual__":s||(i.length===1?i[0].id:"");if(i.length===0)return`
                <input type="text" class="${c}" data-role="${e(a)}" data-ia-role-key="${e(r)}" data-ia-manual-only="true" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${e(o)}">
                <p class="text-xs text-gray-500 mt-0.5 mb-0">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B</p>`;const x=f!=="__manual__"&&!h,b=h||f==="__manual__"?o:"";return`
            <div class="ia-role-picker" data-role="${e(a)}" data-ia-role-key="${e(r)}" data-ia-scope="${p?"closure":"approval"}">
                <select class="form-input text-sm w-full ia-approval-select ${n?"":"mb-1"}" data-role="${e(a)}" data-ia-role-key="${e(r)}">
                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</option>
                    ${i.map(k=>`
                        <option value="${e(k.id||"")}" ${k.id===f?"selected":""}>
                            ${e(k.name||k.email||"")}${e(m(k.personType))}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${f==="__manual__"||h?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="${c} ia-approval-manual ${x?"hidden":""}" data-role="${e(a)}" data-ia-role-key="${e(r)}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B" value="${e(b)}">
            </div>`},_setupIaRolePickerListeners(t){t&&t.querySelectorAll(".ia-role-picker").forEach(e=>{const a=e.querySelector(".ia-approval-select"),r=e.querySelector(".ia-approval-manual");if(!a||!r)return;const i=()=>{const s=a.value==="__manual__";if(r.classList.toggle("hidden",!s),!s&&a.value){const o=a.options[a.selectedIndex];r.value=o?o.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():""}};a.addEventListener("change",i),i()})},_readIaRolePickerValue(t,e,{isClosure:a=!1}={}){const r=typeof t=="string"?t:t?.dataset?.role;if(!r||!e)return{name:"",approverId:"",personType:"",isManualApprover:!0};const i=a?".manual-closure-approval-name":".manual-approval-name",s=a?"#manual-closure-approvals-list":"#manual-approvals-list",o=e.querySelector(s)||e,l=o.querySelector(`.ia-role-picker[data-role="${r}"]`);if(!l)return{name:(o.querySelector(`${i}[data-role="${r}"]`)||e.querySelector(`${i}[data-role="${r}"]`))?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0};const n=l.querySelector(".ia-approval-select"),p=l.querySelector(".ia-approval-manual"),d=l.dataset.iaRoleKey||this._resolveIaRoleKey(r);if(n?.value&&n.value!=="__manual__"){const c=n.options[n.selectedIndex],m=c?c.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():"",u=c&&c.textContent.includes("(\u0645\u0642\u0627\u0648\u0644)")?"contractor":"employee";return{name:m,approverId:n.value,personType:u,isManualApprover:!1,approvalRoleKey:d}}return{name:p?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0,approvalRoleKey:d}},_renderSystemApproverCell(t,e,a,r="approval"){const i=Utils.escapeHTML,s=Array.isArray(t.candidates)?t.candidates:[],o=t.approverId||"",l=t.approver||"",n=t.isManualApprover===!0||!o&&!!l,p=n?"__manual__":o,d=f=>f==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",c=`${r}-approver-select-${e}`,m=`${r}-approver-manual-${e}`,u=`${r}-approver-${e}`;if(s.length===0)return`
                <input type="text" class="form-input ${r}-approver-manual" style="min-width: 180px;"
                    value="${i(l)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F"
                    id="${u}">
                <p class="text-xs text-gray-500 mt-1">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B.</p>`;const h=p!=="__manual__";return`
            <div class="ia-system-approver-picker" data-index="${e}" data-prefix="${r}">
                <select class="form-input ${r}-approver-select" id="${c}" style="min-width: 180px;">
                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                    ${s.map(f=>`
                        <option value="${i(f.id||"")}" ${f.id===p?"selected":""}>
                            ${i(f.name||f.email||"")}${i(d(f.personType))}
                            ${f.email?` - ${i(f.email)}`:""}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${p==="__manual__"?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="form-input ${r}-approver-manual ${h?"hidden":""} mt-1" style="min-width: 180px;"
                    value="${i(n?l:"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u064A\u062F\u0648\u064A\u0627\u064B"
                    id="${m}">
            </div>`},_setupSystemApproverPickerListeners(t){t&&t.querySelectorAll(".ia-system-approver-picker").forEach(e=>{const a=e.dataset.index,r=e.dataset.prefix||"approval",i=e.querySelector(`#${r}-approver-select-${a}`),s=e.querySelector(`#${r}-approver-manual-${a}`);if(!i||!s)return;const o=()=>{s.classList.toggle("hidden",i.value!=="__manual__")};i.addEventListener("change",o),o()})},isSafetyRole(t=""){return["\u0627\u0644\u0633\u0644\u0627\u0645\u0629","Safety"].some(a=>t&&t.toLowerCase().includes(a.toLowerCase()))},updateApprovalNumbers(t){const e=document.getElementById(t);if(!e)return;e.querySelectorAll("tr").forEach((r,i)=>{const s=r.querySelector("td:first-child");s&&(s.textContent=i+1)})},normalizeApprovals(t=[]){return!Array.isArray(t)||t.length===0?this.getDefaultApprovals():t.map((e,a)=>{const r=e.circuitOwnerId||"__default__",i=Array.isArray(e.candidates)?e.candidates.map(p=>p?p.id&&p.name&&p.email!==void 0?p:ApprovalCircuits.toCandidate(ApprovalCircuits.getUserById(p.id||p)):null).filter(Boolean):[];let s=e.approverId||e.approverUserId||"",o=e.approver||"",l=e.approverEmail||"";if(s){const p=ApprovalCircuits.getUserById(s);p&&(o=o||p.name||p.email||"",l=l||p.email||"")}else if(l){const p=i.find(d=>d.email&&d.email.toLowerCase()===l.toLowerCase());p&&(s=p.id,o=p.name||o)}const n={role:e.role||"",approverId:s,approver:o,approverEmail:l,required:e.required!==!1,approved:e.approved===!0,rejected:e.rejected===!0,status:e.status||(e.approved?"approved":e.rejected?"rejected":"pending"),date:e.date||"",comments:e.comments||"",order:typeof e.order=="number"?e.order:a,isSafetyOfficer:e.isSafetyOfficer===!0||this.isSafetyRole(e.role),candidates:i,history:Array.isArray(e.history)?e.history:[],assignedAt:e.assignedAt||"",assignedBy:e.assignedBy||null,circuitOwnerId:r,issuingAuthoritySource:e.issuingAuthoritySource===!0,approvalRoleKey:e.approvalRoleKey||this._resolveIaRoleKey(e.role),isManualApprover:e.isManualApprover===!0,personType:e.personType||"",requiresHseCoApproval:e.requiresHseCoApproval===!0,isHseCoApprovalGate:e.isHseCoApprovalGate===!0};return n.status==="approved"?(n.approved=!0,n.rejected=!1):n.status==="rejected"?(n.approved=!1,n.rejected=!0):(n.status="pending",n.approved=!1,n.rejected=!1),n}).sort((e,a)=>(e.order||0)-(a.order||0))},getNextPendingApproval(t=[]){return t.find(e=>e.status==="pending")},updatePermitStatus(t){if(!t)return;if(t.isManualEntry===!0){const o=String(t.status||"").trim();t.approvals=[],t.status=o||"\u0645\u063A\u0644\u0642";return}if(t.approvals=this.normalizeApprovals(t.approvals||[]),t.approvals.some(o=>o.status==="rejected"&&o.required!==!1)){t.status="\u0645\u0631\u0641\u0648\u0636",t.rejectedAt=t.rejectedAt||new Date().toISOString();return}const a=t.approvals.filter(o=>o.required!==!1),r=a.length>0&&a.every(o=>o.status==="approved"),i=t.approvals.find(o=>o.isSafetyOfficer===!0),s=!i||i.status==="approved";r&&s?(t.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",t.approvedAt=t.approvedAt||new Date().toISOString()):t.approvals.some(l=>l.status==="pending"&&l.required!==!1)?t.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":a.length===0?(t.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",t.approvedAt=t.approvedAt||new Date().toISOString()):t.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"},triggerNotificationsUpdate(){document.dispatchEvent(new CustomEvent("ptw:updated"))},notifyPermitCreated(t){const e=this.getNextPendingApproval(t.approvals||[]);let a=this._t("module.ptw.notify.submitted","\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629.");if(e&&e.role){const r=this.approvalRoleLabel(e.role);e.approver?a+=" "+this._t("module.ptw.notify.nextWithApprover","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role} (\u0627\u0644\u0645\u0633\u0624\u0648\u0644: {name}).").replace(/\{role\}/g,r).replace(/\{name\}/g,String(e.approver)):a+=" "+this._t("module.ptw.notify.nextNeedAssign","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role}. \u064A\u0631\u062C\u0649 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.").replace(/\{role\}/g,r)}Notification.success(a)},updateStatusField(t){const e=document.getElementById("ptw-status");if(!e)return;const a=t||e.getAttribute("data-current-status")||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629";e.value=a,e.setAttribute("data-current-status",a),e.disabled=!0,e.classList.add("opacity-70","cursor-not-allowed"),e.setAttribute("title",this._t("module.ptw.statusField.title","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0628\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A"))},_getWorkTypeDisplayName(t){if(!t)return this._t("module.ptw.workType.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const e=String(t).trim(),a={"\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629":"module.ptw.workType.hotWork","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629":"module.ptw.workType.coldWork","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629":"module.ptw.workType.electricalWork","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629":"module.ptw.workType.confinedSpace","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A":"module.ptw.workType.workAtHeight","\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A":"module.ptw.workType.workAtHeight","\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639":"module.ptw.workType.workAtHeight","\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631":"module.ptw.workType.excavation","\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639":"module.ptw.workType.liftingPlan","\u062F\u062E\u0648\u0644 \u0645\u0642\u0627\u0648\u0644":"module.ptw.workType.contractorPTW","\u0639\u0632\u0644 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629":"module.ptw.workType.loto","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649":"module.ptw.workType.other","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"module.ptw.workType.notSpecified","Not specified":"module.ptw.workType.notSpecified"};if(a[e])return this._t(a[e],e);for(const[r,i]of Object.entries(a))if(e.includes(r))return this._t(i,e);return e},getWorkTypePrefix(t){return!t||t.trim()===""?"PTW":{\u0633\u0627\u062E\u0646:"HTW",\u0628\u0627\u0631\u062F:"CTW",\u0643\u0647\u0631\u0628\u0627\u0626\u064A:"ETW",\u062D\u0631:"EXW",\u0627\u0631\u062A\u0641\u0627\u0639:"HTW",\u0646\u0641\u0637:"OTW",\u063A\u0627\u0632:"GTW",\u0625\u063A\u0644\u0627\u0642:"ISW",\u0643\u064A\u0645\u064A\u0627\u0626\u064A:"CHW",\u0622\u062E\u0631:"OTW","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629":"HTW","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629":"CTW","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629":"ETW","\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631":"EXW","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629":"CSW","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649":"OTW"}[t]||"PTW"},generateSequentialPTWId(t){const e=this.getWorkTypePrefix(t),r=(AppState.appData.ptw||[]).filter(s=>s.id?!t||t.trim()===""?!s.workType||s.workType.trim()===""||s.id.startsWith("PTW_"):s.workType?this.getWorkTypePrefix(s.workType)===e:!1:!1);let i=0;return r.forEach(s=>{if(s.id&&s.id.includes("_")){const o=s.id.split("_");if(o.length>1){const l=parseInt(o[o.length-1]);!isNaN(l)&&l>i&&(i=l)}}}),String(i+1).padStart(4,"0")},generateTemporaryId(t){return`${String(t||"TMP").trim().toUpperCase()}_TMP_${Date.now()}_${Math.random().toString(36).substr(2,6)}`},getSiteOptions(){try{const t=(e,a)=>PTW._t(e,a);return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||t("module.ptw.fallback.unnamedSite","\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,a)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||t("module.ptw.fallback.numberedSite","\u0645\u0648\u0642\u0639 {n}").replace(/\{n\}/g,String(a+1))})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},refreshSiteDropdowns(){try{const t=this.getSiteOptions(),e=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:o=>String(o??""),a=(o,l)=>this._t(o,l),r=o=>'<option value="">'+(o||a("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639"))+"</option>"+(t||[]).map(l=>'<option value="'+e(l.id)+'">'+e(l.name)+"</option>").join("");["manual-permit-location","ptw-filter-location","ptw-location","analysis-location"].forEach(o=>{const l=document.getElementById(o);if(l&&l.tagName==="SELECT"){const n=l.value;l.innerHTML=r(a("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639")),n&&(l.value=n)}}),["manual-permit-sublocation","ptw-filter-sublocation","ptw-sublocation"].forEach(o=>{const l=document.getElementById(o);if(l&&l.tagName==="SELECT"){const n=(document.getElementById("ptw-location")||document.getElementById("manual-permit-location")||{}).value,p=this.getPlaceOptions(n),d=a("module.ptw.placeholder.selectSub","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A"),c=l.value;l.innerHTML='<option value="">'+d+"</option>"+(p||[]).map(m=>'<option value="'+e(m.id)+'">'+e(m.name)+"</option>").join(""),c&&(l.value=c)}})}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F PTW.refreshSiteDropdowns:",t)}},getDepartmentOptionsForPTW(){try{if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartmentOptions=="function"){const e=DailyObservations.getDepartmentOptions();if(Array.isArray(e)&&e.length>0)return e}if(typeof AppUtils<"u"&&typeof AppUtils.getInitialFormDepartments=="function"){const e=AppUtils.getInitialFormDepartments();if(Array.isArray(e)&&e.length>0)return e}const t=AppState?.companySettings||{};return Array.isArray(t.formDepartments)&&t.formDepartments.length>0?t.formDepartments.map(e=>String(e||"").trim()).filter(Boolean):Array.isArray(t.departments)?t.departments.map(e=>String(e||"").trim()).filter(Boolean):typeof t.departments=="string"?t.departments.split(/\n|,/).map(e=>e.trim()).filter(Boolean):[]}catch(t){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A:",t),[]}},getPlaceOptions(t){try{if(!t)return[];if(!this.getSiteOptions().find(r=>r.id===t))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const r=Permissions.formSettingsState.sites.find(i=>i.id===t);if(r&&Array.isArray(r.places))return r.places.map(i=>({id:i.id,name:i.name}))}if(Array.isArray(AppState.appData?.observationSites)){const r=AppState.appData.observationSites.find(i=>(i.id||i.siteId)===t);if(r)return(Array.isArray(r.places)?r.places:Array.isArray(r.locations)?r.locations:Array.isArray(r.children)?r.children:Array.isArray(r.areas)?r.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const r=DailyObservations.DEFAULT_SITES.find(i=>(i.id||i.siteId)===t);if(r)return(Array.isArray(r.places)?r.places:Array.isArray(r.locations)?r.locations:Array.isArray(r.children)?r.children:Array.isArray(r.areas)?r.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",e),[]}},registryData:[],currentTab:"permits",_isManualPtwEntry(t){return!!(t&&(t.isManualEntry===!0||t.isManualEntry==="true"))},_normalizePtwPersonKey(t){return String(t||"").trim().replace(/\s+/g," ").toLowerCase()},_getManualPermitEntryTimestamp(t){if(!t)return 0;const e=[t.updatedAt,t.createdAt,t.openDate,t.timeFrom,t.date,t.closureDate];for(const a of e){if(!a)continue;const r=new Date(a).getTime();if(!Number.isNaN(r))return r}return 0},_collectManualPermitEntriesForLookup(t=null){const e=new Set,a=[],r=String(t||"").trim(),i=s=>{if(!this._isManualPtwEntry(s))return;const o=String(s.id||s.permitId||"").trim();if(r&&o&&o===r)return;const l=o||`seq:${s.sequentialNumber||""}:${s.paperPermitNo||s.permitNumber||""}`;l&&e.has(l)||(l&&e.add(l),a.push(s))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(i),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(i),a},_parseTeamMembersFromEntry(t){let e=t?.teamMembers;return(!e||!e.length)&&t?.teamMembersText&&(e=String(t.teamMembersText).trim().split(/[،,]/).map(r=>{r=r.trim();const i=r.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return i?{name:i[1].trim(),signature:i[2].trim()}:{name:r,signature:""}}).filter(r=>r.name||r.signature)),Array.isArray(e)?e:[]},_resolveManualLookupRoleKey(t){const e=String(t||"").trim();return e==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"||e==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"?"requestingParty":e==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"?"areaManager":e==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"?"maintenanceEngineer":null},buildKnownTeamMembersIndex(t=null){const e=new Map;return this._collectManualPermitEntriesForLookup(t).forEach(a=>{const r=this._getManualPermitEntryTimestamp(a);this._parseTeamMembersFromEntry(a).forEach(i=>{const s=String(i.name||"").trim();if(!s)return;const o=this._normalizePtwPersonKey(s),l=e.get(o);(!l||r>=l.updatedAt)&&e.set(o,{name:s,signature:String(i.signature||i.id||"").trim(),updatedAt:r})})}),e},buildKnownManualApprovalsIndex(t=null){const e=new Map,a=(i,s,o)=>{if(!i||!s?.name)return;e.has(i)||e.set(i,new Map);const l=e.get(i),n=this._normalizePtwPersonKey(s.name),p=l.get(n);(!p||o>=p.updatedAt)&&l.set(n,{...s,updatedAt:o})},r=(i,s,o)=>{const l=this._getManualPermitEntryTimestamp(i);(Array.isArray(s)&&s.length?s:this.resolveManualApprovalsList(s,o)).forEach(p=>{const d=this._resolveManualLookupRoleKey(p.role);if(!d)return;const c=String(p.name||p.approver||"").trim();c&&a(d,{name:c,signature:String(p.signature||"").trim(),approverId:String(p.approverId||"").trim(),personType:String(p.personType||"").trim()},l)})};return this._collectManualPermitEntriesForLookup(t).forEach(i=>{r(i,i.manualApprovals,i.manualApprovalsText),r(i,i.manualClosureApprovals,i.manualClosureApprovalsText)}),e},lookupKnownTeamMember(t,e){const a=this._normalizePtwPersonKey(t);return!a||!e?null:e.get(a)||null},lookupKnownManualApprover(t,e,a){const r=this._resolveManualLookupRoleKey(t);if(!r||!a||!e)return null;const i=a.get(r);return i&&i.get(this._normalizePtwPersonKey(e))||null},getKnownTeamMemberNames(t){return t?Array.from(t.values()).map(e=>e.name).filter(Boolean):[]},getKnownApproverNamesForRole(t,e){const a=this._resolveManualLookupRoleKey(e);return!a||!t?.has(a)?[]:Array.from(t.get(a).values()).map(r=>r.name).filter(Boolean)},buildManualPermitDatalistHtml(t){const e=Utils.escapeHTML,a=[],r=new Set;return(t||[]).forEach(i=>{const s=String(i||"").trim();if(!s)return;const o=this._normalizePtwPersonKey(s);r.has(o)||(r.add(o),a.push(s))}),a.sort((i,s)=>i.localeCompare(s,"ar")),a.map(i=>`<option value="${e(i)}"></option>`).join("")},_attachManualPermitNameSignatureLookup(t,e,a){if(!t||!e)return;const r=()=>{if(typeof a!="function")return!1;const s=String(t.value||"").trim();if(!s)return!1;const o=a(s);if(!o)return delete t.dataset.knownLoaded,!1;const l=String(o.signature||"").trim()||s;return e.value=l,t.dataset.autoCopiedValue=l,t.dataset.knownLoaded="1",!0},i=()=>{const s=String(t.value||"").trim(),o=String(e.value||"").trim(),l=t.dataset.autoCopiedValue||"";(!o||o===l)&&(e.value=s,t.dataset.autoCopiedValue=s)};t.addEventListener("input",()=>{delete t.dataset.knownLoaded,i()}),t.addEventListener("change",()=>{r()||i()}),t.addEventListener("blur",()=>{r()}),i()},_applyKnownManualApproverToPicker(t,e,a,r){if(!t||!a||!r)return;const s=r.id==="manual-closure-approvals-list"?".manual-closure-approval-sig":".manual-approval-sig",o=r.querySelector(`${s}[data-role="${e}"]`),l=t.querySelector(".ia-approval-select"),n=t.querySelector(".ia-approval-manual"),p=t.querySelector('[data-ia-manual-only="true"]');if(a.approverId&&l?Array.from(l.options).some(c=>c.value===a.approverId)?(l.value=a.approverId,l.dispatchEvent(new Event("change",{bubbles:!0}))):n&&(l.value="__manual__",n.classList.remove("hidden"),n.value=a.name,l.dispatchEvent(new Event("change",{bubbles:!0}))):n?(l&&(l.value="__manual__",n.classList.remove("hidden"),l.dispatchEvent(new Event("change",{bubbles:!0}))),n.value=a.name):p&&(p.value=a.name),o){const d=String(a.signature||"").trim();o.value=d||a.name}},setupManualPermitKnownLookups(t,e,a){if(!t)return;const r={"#manual-approvals-list":["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"],"#manual-closure-approvals-list":["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"]},i={requestingParty:"manual-approval-datalist-requestingParty",areaManager:"manual-approval-datalist-areaManager",maintenanceEngineer:"manual-approval-datalist-maintenanceEngineer"},s=o=>{const l=o?.querySelector(".manual-team-member-name"),n=o?.querySelector(".manual-team-member-signature");l&&(l.setAttribute("list","manual-team-member-names-datalist"),l.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(l,n,p=>this.lookupKnownTeamMember(p,e))};t.querySelectorAll("#manual-team-members-list tr.manual-team-member-row").forEach(s),t._attachManualTeamRowLookup=s,Object.entries(r).forEach(([o,l])=>{const n=t.querySelector(o);n&&l.forEach(p=>{const d=this._resolveManualLookupRoleKey(p),c=d?i[d]:null,m=n.querySelector(`.manual-approval-name[data-role="${p}"], .manual-closure-approval-name[data-role="${p}"]`),u=n.querySelector(`.manual-approval-sig[data-role="${p}"], .manual-closure-approval-sig[data-role="${p}"]`);m&&m.tagName==="INPUT"&&!m.classList.contains("ia-approval-manual")&&(c&&(m.setAttribute("list",c),m.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(m,u,f=>this.lookupKnownManualApprover(p,f,a)));const h=n.querySelector(`.ia-role-picker[data-role="${p}"]`);if(h&&d&&["areaManager","maintenanceEngineer"].includes(d)){const f=h.querySelector(".ia-approval-manual"),x=h.querySelector('[data-ia-manual-only="true"]'),b=f||x;b&&c&&(b.setAttribute("list",c),b.setAttribute("autocomplete","off")),b&&u&&this._attachManualPermitNameSignatureLookup(b,u,y=>this.lookupKnownManualApprover(p,y,a));const k=()=>{const y=String(b?.value||"").trim();if(!y)return;const C=this.lookupKnownManualApprover(p,y,a);C&&this._applyKnownManualApproverToPicker(h,p,C,n)};b&&(b.addEventListener("change",k),b.addEventListener("blur",k))}})})},initRegistry(t=!1){try{if(AppState.appData&&AppState.appData.ptwRegistry&&Array.isArray(AppState.appData.ptwRegistry)){this.setPtwRegistryState(AppState.appData.ptwRegistry,"AppState.ptwRegistry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 AppState`);return}const e=localStorage.getItem("hse_ptw_registry");if(e)try{this.setPtwRegistryState(JSON.parse(e),"localStorage.hse_ptw_registry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 localStorage`)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 localStorage:",a),this.registryData=[]}else this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",e),this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}},async saveRegistryData(t={}){try{const{skipSync:e=!1}=t;if(this.setPtwRegistryState(this.registryData,"saveRegistryData"),this.refreshRegistryViewIfVisible(),!e&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const a=s=>{const o=String(s?.id||"").trim(),l=String(s?.permitId||"").trim();return o.includes("_TMP_")||l.includes("_TMP_")},r=Array.isArray(this.registryData)?this.registryData.filter(s=>!a(s)):this.registryData;if(Array.isArray(r)&&r.length===0&&Array.isArray(this.registryData)&&this.registryData.length>0)return Utils.safeLog("\u26A0\uFE0F saveRegistryData: \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641\u0627\u062A \u0645\u0624\u0642\u062A\u0629"),!0;const i=await GoogleIntegration.autoSave("PTWRegistry",r);if(i&&i.resolvedPTWRegistry){const s=i.resolvedPTWRegistry,o=(l,n)=>{const p=String(l||"").trim();if(p){if(n&&n.id&&Array.isArray(this.registryData)){const d=this.registryData.findIndex(c=>String(c.paperPermitNumber||"").trim()===String(n.paperPermitNumber||"").trim());d!==-1&&(this.registryData[d]={...this.registryData[d],id:n.id,permitId:p})}if(typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw)){const d=String(n?.paperPermitNumber||"").trim();if(d){const c=AppState.appData.ptw.findIndex(m=>String(m.paperPermitNumber||"").trim()===d);c!==-1&&(AppState.appData.ptw[c]={...AppState.appData.ptw[c],id:p})}}}};Array.isArray(s)?s.forEach(l=>o(l.permitId,l)):s.permitId&&o(s.permitId,s),this.setPtwRegistryState(this.registryData,"saveRegistryData_resolved")}}return!0}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",e),!1}},async _fetchPtwRegistryRowsNoMutation(){try{if(!GoogleIntegration||typeof GoogleIntegration._isBackendRpcConfigured!="function"||!GoogleIntegration._isBackendRpcConfigured())return null;const t=AppState.googleConfig?.sheets?.spreadsheetId?.trim();if(!t)return null;const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:t}});if(e&&e.success&&Array.isArray(e.data))return e.data}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 PTWRegistry \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",t)}return null},_manualPermitRowExistsOnBackend(t,e,a){if(!Array.isArray(t)||t.length===0)return!1;const r=String(e?.paperPermitNumber||a?.paperPermitNumber||"").trim(),i=String(e?.permitId||"").trim(),s=String(a?.id||"").trim();return t.some(o=>!o||typeof o!="object"?!1:!!(r&&String(o.paperPermitNumber||"").trim()===r||i&&String(o.permitId||"").trim()===i||s&&String(o.permitId||"").trim()===s))},async syncManualPermitRecordsToBackend(t,e,a={}){const{isNewRegistryEntry:r=!1,isNewPermit:i=!1}=a;if(!t||!e||typeof GoogleIntegration>"u")return!0;const s=["createdBy","createdById","updatedBy","updatedById"],o=12e4,l=async(d,c,m=!1)=>{const u=AppState.googleConfig?.sheets?.spreadsheetId?.trim(),h=b=>{const k={sheetName:d,data:typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(d,b):b,__timeoutMs:o};return u&&(k.spreadsheetId=u),k},f=b=>GoogleIntegration.sendToAppsScript(m?"appendToSheet":"saveToSheet",h(b)),x=b=>{const y={...typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(d,b):{...b}};return s.forEach(C=>{delete y[C]}),y};try{return await f(c)}catch(b){const k=String(b?.message||"");if(!/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(k))throw b;return await f(x(c))}};let n=!1,p=!1;try{const d=await l("PTWRegistry",t,r);if(!d||d.success!==!0)throw new Error(d?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");n=!0;const c=d.resolvedPTWRegistry,m=String(t.paperPermitNumber||e.paperPermitNumber||"").trim(),u=String(t.permitId||e.id||"").trim(),h=(x,b)=>{const k=String(x||"").trim();if(k&&(e.id=k,t&&(t.permitId=k,b&&b.id&&(t.id=b.id)),typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw))){const y=AppState.appData.ptw.findIndex(C=>String(C.id||"").trim()===u);y!==-1&&(AppState.appData.ptw[y]={...AppState.appData.ptw[y],id:k})}};if(c&&c.permitId){if(h(c.permitId,c),m&&Array.isArray(this.registryData)){const x=this.registryData.findIndex(b=>String(b.paperPermitNumber||"").trim()===m&&(b.isManualEntry===!0||b.isManualEntry==="true"));x!==-1&&(this.registryData[x]={...this.registryData[x],...c})}}else{try{typeof this.loadRegistryFromBackend=="function"&&await this.loadRegistryFromBackend()}catch(x){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 PTWRegistry \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",x)}if(m&&Array.isArray(this.registryData)){const x=this.registryData.find(b=>String(b.paperPermitNumber||"").trim()===m&&(b.isManualEntry===!0||b.isManualEntry==="true"));x&&x.permitId&&h(x.permitId,x)}}const f=await l("PTW",e,i);if(!f||f.success!==!0)throw new Error(f?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");p=!0,typeof GoogleIntegration.clearCache=="function"&&(GoogleIntegration.clearCache("PTWRegistry"),GoogleIntegration.clearCache("PTW"));try{typeof this.saveRegistryData=="function"&&await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save())}catch(x){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",x)}return!0}catch(d){throw typeof DataManager<"u"&&DataManager.addToPendingSync&&(n||DataManager.addToPendingSync("PTWRegistry",t),p||DataManager.addToPendingSync("PTW",e)),d}},refreshRegistryViewIfVisible(){try{const t=document.getElementById("ptw-registry-content");t&&t.style.display!=="none"&&(this._refreshRegistryViewLight(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"))}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0627\u0644\u0633\u062C\u0644:",t)}},parseDateTimeValue(t){if(t==null||t===""||t==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"||String(t).trim()==="Not specified")return null;if(t instanceof Date)return isNaN(t.getTime())?null:new Date(t.getTime());if(typeof t=="number"&&isFinite(t)){const o=new Date(t);return isNaN(o.getTime())?null:o}const e=String(t).trim();if(!e)return null;const a=e.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);if(a){const[,o,l,n,p,d,c]=a,m=new Date(Number(n),Number(l)-1,Number(o),Number(p||0),Number(d||0),Number(c||0),0);return isNaN(m.getTime())?null:m}const r=e.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})$/);if(r){const[,o,l,n]=r,p=new Date(Number(o),Number(l)-1,Number(n),0,0,0,0);return isNaN(p.getTime())?null:p}const i=e.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/);if(i){const[,o,l,n,p,d,c]=i,m=new Date(Number(o),Number(l)-1,Number(n),Number(p),Number(d),Number(c||0),0);return isNaN(m.getTime())?null:m}const s=new Date(e);return isNaN(s.getTime())?null:s},formatDurationFromMilliseconds(t){return this.formatDurationI18n(t)},dateInputToISO(t){if(!t)return null;const e=String(t).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,r,i]=e,s=new Date(Number(a),Number(r)-1,Number(i),0,0,0,0);return isNaN(s.getTime())?null:s.toISOString()},calculateTotalTime(t,e){if(!t||!e)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const a=this.parseDateTimeValue(t),r=this.parseDateTimeValue(e);return!a||!r?this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):this.formatDurationFromMilliseconds(r-a)}catch{return this._t("module.ptw.duration.error","\u062E\u0637\u0623")}},getCurrentUserActor(){const t=AppState?.currentUser||{};return{id:String(t.id||"").trim(),name:String(t.name||t.displayName||t.email||"\u0645\u0633\u062A\u062E\u062F\u0645").trim(),email:String(t.email||"").trim(),role:String(t.role||"").trim()}},isUsableDurationText(t){const e=String(t||"").trim();return!(!e||["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D","\u062E\u0637\u0623","Not specified","Invalid","Error"].includes(e)||e===this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")||e===this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D")||e===this._t("module.ptw.duration.error","\u062E\u0637\u0623"))},normalizeRegistryEntry(t){if(!t||typeof t!="object")return t;const e={...t};if((!e.sublocation||String(e.sublocation).trim()==="")&&typeof e.location=="string"){const o=String(e.location).trim(),l=o.indexOf(" - ");if(l>0){const n=o.slice(0,l).trim(),p=o.slice(l+3).trim();n&&p&&(e.location=n,e.sublocation=p)}}const a=e.timeFrom||e.openDate||"",r=this.calculateTotalTime(a,e.timeTo),i=this.calculateTotalTime(a,e.closureDate),s=String(e.totalTime||"").trim();if(!e.openDate&&e.timeFrom&&(e.openDate=e.timeFrom),!e.timeFrom&&e.openDate&&(e.timeFrom=e.openDate),this.isUsableDurationText(r)?e.totalTime=r:this.isUsableDurationText(i)?e.totalTime=i:e.totalTime=this.isUsableDurationText(s)?s:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",e.isManualEntry===!0){e.approvals=[],e.skipApprovalFlow=!0,String(e.approvalCircuitOwnerId||"").trim()||(e.approvalCircuitOwnerId="__manual__"),String(e.approvalCircuitName||"").trim()||(e.approvalCircuitName="Manual Entry");const o=String(e.status||"").trim();if(e.status=o||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",e.manualApprovals=this.resolveManualApprovalsList(e.manualApprovals,e.manualApprovalsText),e.manualClosureApprovals=this.resolveManualApprovalsList(e.manualClosureApprovals,e.manualClosureApprovalsText),!Array.isArray(e.requiredPPE)||!e.requiredPPE.length){const l=e.requiredPPE||e.ppeNotes||"";typeof l=="string"&&l.trim()?e.requiredPPE=l.split(/[،,]/).map(n=>n.trim()).filter(Boolean):Array.isArray(e.requiredPPE)||(e.requiredPPE=[])}if((!e.teamMembers||!e.teamMembers.length)&&e.teamMembersText){const l=String(e.teamMembersText).trim();e.teamMembers=l.split(/[،,]/).map(n=>{n=n.trim();const p=n.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return p?{name:p[1].trim(),signature:p[2].trim()}:{name:n,signature:""}}).filter(n=>n.name||n.signature)}}if(e.sequentialNumber!=null&&e.sequentialNumber!==""){const o=parseInt(String(e.sequentialNumber).replace(/^0+(?=\d)/,""),10);!isNaN(o)&&o>0&&(e.sequentialNumber=o)}return e},normalizeRegistryCollection(t){if(!Array.isArray(t))return[];const e=t.map(o=>this.normalizeRegistryEntry(o)).filter(Boolean),a=(o,l)=>{const n=String(o.id||"").includes("_TMP_");return!String(l.id||"").includes("_TMP_")&&n?l:o},r=new Map,i=new Map,s=[];for(const o of e){const l=String(o.id||"").trim();if(l){r.has(l)?r.set(l,a(r.get(l),o)):r.set(l,o);continue}const p=[o.sequentialNumber!=null&&o.sequentialNumber!==""?String(o.sequentialNumber):"",String(o.permitId||"").trim(),String(o.paperPermitNumber||"").trim(),String(o.openDate||o.timeFrom||"").trim(),String(o.location||"").trim(),String(o.requestingParty||"").trim()].filter(Boolean).join("::");if(p)i.has(p)?i.set(p,a(i.get(p),o)):i.set(p,o);else{const d=o.permitId||o.paperPermitNumber;(!d||!s.some(c=>(c.permitId||c.paperPermitNumber)===d))&&s.push(o)}}return[...r.values(),...i.values(),...s]},isLikelyUsersRecord(t){if(!t||typeof t!="object")return!1;const e=!!String(t.email||"").trim(),a=["password","passwordHash","role","permissions"].some(r=>Object.prototype.hasOwnProperty.call(t,r));return e&&a},isValidPtwRegistryRecord(t){if(!t||typeof t!="object"||Array.isArray(t)||this.isLikelyUsersRecord(t))return!1;const a=["id","permitId","sequentialNumber","paperPermitNumber"].some(s=>String(t[s]??"").trim()!=="");return a?["workDescription","location","timeFrom","openDate","permitType","status","authorizedParty"].some(s=>Object.prototype.hasOwnProperty.call(t,s))||a:!1},sanitizePtwRegistryDataset(t,e="unknown"){if(!Array.isArray(t))return[];const a=t.filter(r=>this.isValidPtwRegistryRecord(r));return a.length!==t.length&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0645 \u0631\u0641\u0636 ${t.length-a.length} \u0633\u062C\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0645\u0646 ${e} \u0644\u0628\u064A\u0627\u0646\u0627\u062A PTWRegistry`),this.normalizeRegistryCollection(a)},setPtwRegistryState(t,e="unknown"){const a=this.sanitizePtwRegistryDataset(t,e);this.registryData=a,this._registrySanitizedCache=null,AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...a];try{localStorage.setItem("hse_ptw_registry",Utils.safeStringify(a))}catch{}return a},normalizePermitStatus(t){const e=String(t||"").trim();return!e||e==="closed"||e==="Closed"||e==="CLOSED"||e==="\u0645\u063A\u0644\u0642\u0629"||e==="\u0627\u0643\u062A\u0645\u0644"?"\u0645\u063A\u0644\u0642":e},isPermitClosedStatus(t){const e=this.normalizePermitStatus(t);return e==="\u0645\u063A\u0644\u0642"||e==="\u0645\u0631\u0641\u0648\u0636"||e==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"||e==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"},isPermitOpenStatus(t){return!this.isPermitClosedStatus(t)},mergePermitsPreferRegistry(t,e){const a=new Map;return(t||[]).forEach(r=>{r&&r.id&&a.set(r.id,{...r,status:this.normalizePermitStatus(r.status)})}),(e||[]).forEach(r=>{if(r&&r.id){const i=a.get(r.id)||{};a.set(r.id,{...i,...r,status:this.normalizePermitStatus(r.status),isFromRegistry:!0,isManualEntry:r.isManualEntry??i.isManualEntry,skipApprovalFlow:r.skipApprovalFlow??i.skipApprovalFlow,approvalCircuitOwnerId:r.approvalCircuitOwnerId||i.approvalCircuitOwnerId,approvalCircuitName:r.approvalCircuitName||i.approvalCircuitName,sequentialNumber:r.sequentialNumber??i.sequentialNumber,paperPermitNumber:r.paperPermitNumber||i.paperPermitNumber})}}),this.sortPermitRecordsNewestFirst(Array.from(a.values()))},getPermitRecordSortKey(t={}){const e=s=>{const o=parseInt(String(s??"").replace(/^0+(?=\d)/,""),10);return Number.isFinite(o)&&o>0?o:0},a=s=>{const o=String(s||"").match(/(?:PTW|REG)_(\d+)/i);return o&&parseInt(o[1],10)||0},r=e(t.sequentialNumber)||a(t.permitId)||a(t.id),i=s=>{const o=this.parseDateTimeValue(s);return o&&!isNaN(o.getTime())?o.getTime():0};return{seq:r,createdAt:i(t.createdAt),startAt:i(t.openDate||t.timeFrom||t.startDate),updatedAt:i(t.updatedAt||t.endDate||t.timeTo)}},sortPermitRecordsNewestFirst(t){if(!Array.isArray(t))return[];const e=t.map(a=>({record:a,key:this.getPermitRecordSortKey(a)}));return e.sort((a,r)=>{const i=a.key,s=r.key;return s.seq!==i.seq?s.seq-i.seq:s.createdAt!==i.createdAt?s.createdAt-i.createdAt:s.startAt!==i.startAt?s.startAt-i.startAt:s.updatedAt!==i.updatedAt?s.updatedAt-i.updatedAt:String(r.record.id||r.record.permitId||"").localeCompare(String(a.record.id||a.record.permitId||""),"en",{numeric:!0})}),e.map(a=>a.record)},getRegistrySanitizedDataset(){if(Array.isArray(this._registrySanitizedCache))return this._registrySanitizedCache;const t=Array.isArray(this.registryData)?this.registryData:[],e=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry:[],a=e.length>t.length,r=a?e:t.length>0?t:e;a&&r.length!==t.length?this.registryData=r:!a&&t.length>e.length&&(AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...r]);const i=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[];if(i.length===0)return this._registrySanitizedCache=r,r;const s=new Set(i.filter(l=>l&&typeof l=="object").map(l=>String(l.id||"").trim()).filter(Boolean)),o=r.filter(l=>{if(!l)return!1;const n=String(l.permitId||"").trim(),p=String(l.id||"").trim();return l.isManualEntry===!0||l.isManualEntry==="true"?!0:s.has(n)||s.has(p)});return this._registrySanitizedCache=o,o},_getRegistryRowsCached(t=!1){return!t&&Array.isArray(this._registrySanitizedCache)?this._registrySanitizedCache:this.getRegistrySanitizedDataset()},_computeRegistryKpis(t){const e=Array.isArray(t)?t:[],a=e.length,r=e.filter(l=>this.isPermitOpenStatus(l?.status)).length,i=e.filter(l=>this.isPermitClosedStatus(l?.status)).length,s=e.filter(l=>this.isPermitClosedStatus(l?.status)&&(l.closureDate||l.timeTo));let o=this._t("module.ptw.registry.avgNotAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(s.length>0){let l=0;if(s.forEach(n=>{const p=this.parseDateTimeValue(n.timeFrom),d=this.parseDateTimeValue(n.closureDate||n.timeTo);p&&d&&p<d&&(l+=d-p)}),l>0){const n=Math.round(l/s.length/36e5);o=this._t("module.ptw.registry.avgHours","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(n))}}return{registryRowCount:a,openCount:r,closedCount:i,avgTime:o}},_updateRegistryKpiCards(t){const{registryRowCount:e,openCount:a,closedCount:r,avgTime:i}=this._computeRegistryKpis(t),s=(l,n)=>{const p=document.getElementById(l);p&&(p.textContent=String(n))};s("ptw-registry-kpi-total",e),s("ptw-registry-kpi-open",a),s("ptw-registry-kpi-closed",r),s("ptw-registry-kpi-avg",i);const o=document.getElementById("ptw-registry-table-title");if(o){const l=this._t("module.ptw.registry.recordWord","\u0633\u062C\u0644");o.textContent=`${this._t("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${e} ${l})`}},renderRegistryTableShell(){const t=(e,a)=>this._t(e,a);return`
            <div class="ptw-table-wrapper">
                <table class="data-table ptw-registry-table" id="ptw-registry-data-table">
                    <thead>
                        <tr>
                            <th>${t("module.ptw.registry.col.seq","\u0645\u0633\u0644\u0633\u0644")}</th>
                            <th>${t("module.ptw.registry.col.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                            <th>${t("module.ptw.registry.col.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                            <th>${t("module.ptw.registry.col.requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")}</th>
                            <th>${t("module.ptw.registry.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                            <th>${t("module.ptw.registry.col.timeFrom","\u0627\u0644\u0648\u0642\u062A \u0645\u0646")}</th>
                            <th>${t("module.ptw.registry.col.timeTo","\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649")}</th>
                            <th>${t("module.ptw.registry.col.totalTime","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A")}</th>
                            <th>${t("module.ptw.registry.col.authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627")}</th>
                            <th>${t("module.ptw.registry.col.workDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644")}</th>
                            <th>${t("module.ptw.registry.col.followUp1","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01")}</th>
                            <th>${t("module.ptw.registry.col.followUp2","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02")}</th>
                            <th>${t("module.ptw.registry.col.permitStatus","\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                            <th>${t("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody id="ptw-registry-table-body">
                        <tr data-registry-loading="1">
                            <td colspan="14" class="text-center text-gray-500 py-8">${t("module.ptw.loading.permits","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D...")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`},_renderRegistryTableRow(t){const e=(b,k)=>this._t(b,k);let a,r;t.status==="\u0645\u0641\u062A\u0648\u062D"||t.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?(a="bg-blue-100 text-blue-800",r="fa-folder-open"):t.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?(a="bg-green-100 text-green-800",r="fa-check-circle"):t.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?(a="bg-red-100 text-red-800",r="fa-lock"):t.status==="\u0645\u063A\u0644\u0642"?(a="bg-gray-100 text-gray-800",r="fa-check-circle"):(a="bg-yellow-100 text-yellow-800",r="fa-clock");const i=t.timeFrom||t.openDate,s=i&&Utils.formatDate?Utils.formatDate(i):e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),o=!i||s==="-"?e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):s,l=b=>{if(!b||b===e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))return e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const k=this.parseDateTimeValue(b);return!k||isNaN(k.getTime())?e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):k.toLocaleTimeString("en-GB-u-nu-latn",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch{return e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}},n=l(i),p=l(t.timeTo),d=this.getPermitTypeDisplay(t),c=d.length>50?d.substring(0,50)+"...":d,m=t.timeFrom&&t.timeTo?this.calculateTotalTime(t.timeFrom,t.timeTo):this.isUsableDurationText(t.totalTime)?t.totalTime:e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),u=this.statusLabel(t.status),h=this.getPermitDisplayNumber(t),f=String(t.workDescription||""),x=f.length>30?f.substring(0,30)+"...":f;return`
                <tr data-registry-id="${t.id}">
                    <td class="font-bold text-blue-600">${Utils.escapeHTML(h)}</td>
                    <td>${Utils.escapeHTML(o)}</td>
                    <td title="${Utils.escapeHTML(d)}">${Utils.escapeHTML(c)}</td>
                    <td>${Utils.escapeHTML(t.requestingParty)}</td>
                    <td title="${Utils.escapeHTML(t.location||"")}">${Utils.escapeHTML(t.location||"")}</td>
                    <td>${Utils.escapeHTML(n)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td class="font-semibold">${Utils.escapeHTML(String(m))}</td>
                    <td>${Utils.escapeHTML(t.authorizedParty)}</td>
                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(f)}">${Utils.escapeHTML(x)}</td>
                    <td>${Utils.escapeHTML(t.supervisor1)}</td>
                    <td>${Utils.escapeHTML(t.supervisor2)}</td>
                    <td>
                        <span class="badge ${a}">
                            <i class="fas ${r} ml-1"></i>
                            ${Utils.escapeHTML(String(u))}
                        </span>
                    </td>
                    <td>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${t.isManualEntry?`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewManualPermitDetails('${t.id}')" title="${e("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${e("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `:`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewRegistryDetails('${t.permitId}')" title="${e("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${e("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `}
                        </div>
                    </td>
                </tr>`},_mountRegistryTableRows(t=!1){const e=document.getElementById("ptw-registry-table-mount");if(!e)return;const a=this._getRegistryRowsCached(t);if(this._updateRegistryKpiCards(a),!a.length){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${this._t("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                </div>`,e.removeAttribute("data-registry-table-pending");return}e.querySelector("#ptw-registry-data-table")||(e.innerHTML=this.renderRegistryTableShell());const r=document.getElementById("ptw-registry-table-body");if(!r)return;const i=this.sortPermitRecordsNewestFirst(a);this._registryTableMountToken=(this._registryTableMountToken||0)+1;const s=this._registryTableMountToken,o=45;r.innerHTML="";const l=n=>{if(s!==this._registryTableMountToken)return;const p=i.slice(n,n+o);if(!p.length){if(e.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}return}if(r.insertAdjacentHTML("beforeend",p.map(d=>this._renderRegistryTableRow(d)).join("")),n+o<i.length)requestAnimationFrame(()=>l(n+o));else if(e.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}};l(0)},_warmRegistryView(){const t=document.getElementById("ptw-registry-content");!t||!t.innerHTML.trim()||this._mountRegistryTableRows(!1)},_renderRegistryPlaceholderShell(t){return`
            <div class="content-card">
                <div class="card-body">
                    <div class="empty-state">
                        <div style="width: 300px; margin: 0 auto 16px;">
                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <p class="text-gray-500">${typeof t=="function"?t("module.ptw.loading.registry","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."}</p>
                    </div>
                </div>
            </div>`},_mountRegistryShell(){const t=document.getElementById("ptw-registry-content");if(!(!t||t.getAttribute("data-registry-pending")!=="1"))try{t.innerHTML=this.renderRegistryContent({tableMode:"shell"}),t.removeAttribute("data-registry-pending"),this.setupRegistryEventListeners();const e=()=>this._warmRegistryView();typeof requestIdleCallback=="function"?requestIdleCallback(e,{timeout:900}):setTimeout(e,0)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0633\u062C\u0644:",e)}},_renderMapPlaceholderShell(t){return`
            <div class="content-card" style="height:100%;min-height:600px;">
                <div class="card-body flex items-center justify-center" style="min-height:560px;">
                    <div class="empty-state">
                        <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                        <p class="text-gray-500">${typeof t=="function"?t("module.ptw.map.loadingMap","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."}</p>
                    </div>
                </div>
            </div>`},_mountMapShell(){const t=document.getElementById("ptw-map-content");if(!(!t||t.getAttribute("data-map-pending")!=="1"))try{t.innerHTML=this.renderMapContent(),t.removeAttribute("data-map-pending"),this.applyModuleI18n(t)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},_resetMapTabVisibility(t){t&&(t.style.display="flex",t.style.flexDirection="column",t.style.height="calc(100vh - 280px)",t.style.minHeight="600px",t.style.width="100%",t.style.visibility="visible",t.style.opacity="1",t.style.position="relative",t.style.left="auto",t.style.overflow="visible",t.style.pointerEvents="auto",t.style.zIndex="auto")},_ensureMapTabDom(t){if(!t)return!1;t.getAttribute("data-map-pending")==="1"&&this._mountMapShell(),document.getElementById("ptw-map")||(t.innerHTML=this.renderMapContent(),t.removeAttribute("data-map-pending"),this.applyModuleI18n(t)),t.removeAttribute("data-tab-lazy");const e=document.getElementById("ptw-map-container"),a=document.getElementById("ptw-map");e&&(e.style.height="100%",e.style.minHeight="600px",e.style.width="100%",e.style.display="block",e.style.visibility="visible",e.style.position="relative"),a&&(a.style.height="100%",a.style.width="100%",a.style.minHeight="600px",a.style.display="block",a.style.visibility="visible");const r=document.getElementById("ptw-map-loading");return r&&(r.style.display="flex"),!!(e&&a)},formatPtwMetricCount(t){const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.floor(e)).toLocaleString("en-US"):"0"},getRegistryPermitsForMetrics(){return this.getRegistrySanitizedDataset().map(e=>({id:e.permitId||e.id,workType:Array.isArray(e.permitType)?e.permitTypeDisplay||e.permitType.join("\u060C "):e.permitType||e.permitTypeDisplay,status:this.normalizePermitStatus(e.status),isFromRegistry:!0}))},getPermitMetricsDataset(){const t=this.getRegistrySanitizedDataset(),e=AppState.appData.ptw||[],a=this.getRegistryPermitsForMetrics(),r=this.mergePermitsPreferRegistry(e,a);return{source:a.length>0?a:r,merged:r,permitsFromList:e,permitsFromRegistry:a,registryRows:t}},getPermitTypeDisplay(t){return t?t.permitTypeDisplay?t.permitTypeDisplay:Array.isArray(t.permitType)?t.permitType.join("\u060C "):typeof t.permitType=="string"?t.permitType:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},generateRegistrySequentialNumber(){if(!this.registryData.length)return 1;const t=r=>{const i=String(r||"").match(/^REG_(\d+)$/i);return i?parseInt(i[1],10):0},e=r=>{const i=String(r||"").match(/^PTW_(\d+)$/i);return i?parseInt(i[1],10):0};return this.registryData.reduce((r,i)=>{const s=parseInt(i.sequentialNumber)||0,o=t(i.id),l=e(i.permitId),n=Math.max(s,o,l);return n>r?n:r},0)+1},getPermitDisplayNumber(t=null){if(!t||typeof t!="object")return"\u2014";const e=l=>{if(l==null||String(l).trim()==="")return"";const n=parseInt(String(l).replace(/^0+(?=\d)/,""),10);return Number.isNaN(n)||n<=0?"":String(n)},a=(l,n)=>{const p=String(l||"").match(new RegExp(`^${n}_(\\d+)$`,"i"));if(!p)return"";const d=parseInt(p[1],10);return Number.isNaN(d)||d<=0?"":String(d)},r=e(t.sequentialNumber);if(r)return r;const i=a(t.permitId,"PTW");if(i)return i;const s=a(t.id,"PTW");if(s)return s;const o=String(t.paperPermitNumber||"").trim();return o||"\u2014"},createRegistryEntry(t){if(!t||!t.id)return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644: \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",t),null;try{const e=this.generateRegistrySequentialNumber();let a=t.siteName||t.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=t.siteId||t.locationId||null;if(t.siteId&&!t.siteName){const c=this.getSiteOptions().find(m=>m.id===t.siteId||m.name===t.location);c&&(a=c.name,r=c.id||r)}else if(t.location&&!t.siteName){const c=this.getSiteOptions().find(m=>m.id===t.location||m.name===t.location);c?(a=c.name,r=c.id||r):a=t.location}let i=t.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s="";Array.isArray(i)?(s=i.join("\u060C "),i=s):typeof i=="string"?s=i:(s="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",i="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const o=t.sublocationName||t.sublocation||null,l=t.sublocationId||null;let n="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t.approvals&&t.approvals[0]){const c=t.approvals[0].approver;typeof c=="string"?n=c:typeof c=="object"&&c?n=c.name||c.email||c.id||t.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":n=t.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let p="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t.approvals&&t.approvals[1]){const c=t.approvals[1].approver;typeof c=="string"?p=c:typeof c=="object"&&c?p=c.name||c.email||c.id||t.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":p=t.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}const d={id:this.generateTemporaryId("REG"),sequentialNumber:e,permitId:t.id,openDate:t.startDate||t.createdAt||new Date().toISOString(),permitType:i,permitTypeDisplay:s,requestingParty:String(t.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),locationId:r?String(r).trim():null,location:String(a).trim(),sublocationId:l?String(l).trim():null,sublocation:o?String(o).trim():null,timeFrom:t.startDate||t.createdAt||new Date().toISOString(),timeTo:t.endDate||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",totalTime:this.calculateTotalTime(t.startDate,t.endDate)||"",authorizedParty:String(t.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),workDescription:String(t.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),supervisor1:String(n).trim(),supervisor2:String(p).trim(),status:t.status==="\u0645\u063A\u0644\u0642"||t.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":t.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||t.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?t.status:"\u0645\u0641\u062A\u0648\u062D",closureDate:null,closureReason:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F:",d.id,d.sequentialNumber),d}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",e),null}},async addToRegistry(t,e={}){const{skipSave:a=!1}=e;try{if(!t||!t.id){Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629");return}Array.isArray(this.registryData)||this.initRegistry();const r=t.id||t.permitId;if(this.registryData.find(o=>o.permitId===r||o.permitId===t.id||o.permitId===t.permitId||o.id===t.registryId||t.paperPermitNumber&&o.paperPermitNumber&&String(o.paperPermitNumber).trim()===String(t.paperPermitNumber).trim()))return Utils.safeLog("\u{1F504} \u0627\u0644\u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),await this.updateRegistryEntry(t,e);const s=this.createRegistryEntry(t);s?(this.registryData.push(s),this._registrySanitizedCache=null,a||await this.saveRegistryData(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${s.sequentialNumber} \u0641\u064A \u0627\u0644\u0633\u062C\u0644 (ID: ${s.id})`)):Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644:",r)}},async updateRegistryEntry(t,e={}){const{skipSave:a=!1}=e,r=this.registryData.findIndex(m=>m.permitId===t.id);if(r===-1)return this.addToRegistry(t,e);const i=this.registryData[r];let s=t.siteName||t.location||i.location,o=t.siteId||t.locationId||i.locationId;if(t.siteId||t.locationId){const m=this.getSiteOptions().find(u=>u.id===(t.siteId||t.locationId)||u.name===t.location);m&&(s=m.name,o=m.id||o)}else if(t.location&&!t.siteName){const m=this.getSiteOptions().find(u=>u.id===t.location||u.name===t.location);m&&(s=m.name,o=m.id||o)}let l=t.workType||i.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n="";Array.isArray(l)?(n=l.join("\u060C "),l=n):typeof l=="string"?n=l:(n=i.permitTypeDisplay||l||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=l||i.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");let p=i.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t.approvals&&t.approvals[0]){const m=t.approvals[0].approver;typeof m=="string"?p=m:typeof m=="object"&&m?p=m.name||m.email||m.id||t.approvals[0].role||i.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":p=t.approvals[0].role||i.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let d=i.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t.approvals&&t.approvals[1]){const m=t.approvals[1].approver;typeof m=="string"?d=m:typeof m=="object"&&m?d=m.name||m.email||m.id||t.approvals[1].role||i.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":d=t.approvals[1].role||i.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}i.permitType=String(l).trim(),i.permitTypeDisplay=String(n||i.permitTypeDisplay||l).trim(),i.requestingParty=String(t.requestingParty||i.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),i.locationId=o?String(o).trim():i.locationId?String(i.locationId).trim():null,i.location=String(s||i.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),i.sublocationId=t.sublocationId?String(t.sublocationId).trim():i.sublocationId?String(i.sublocationId).trim():null,i.sublocation=t.sublocationName||t.sublocation?String(t.sublocationName||t.sublocation).trim():i.sublocation?String(i.sublocation).trim():null,i.timeFrom=t.startDate||i.timeFrom,i.timeTo=t.endDate||i.timeTo,t.startDate&&(i.openDate=t.startDate),i.totalTime=String(this.calculateTotalTime(t.startDate,t.endDate)||i.totalTime||"").trim(),i.authorizedParty=String(t.authorizedParty||i.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),i.workDescription=String(t.workDescription||i.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),i.supervisor1=String(p).trim(),i.supervisor2=String(d).trim();const c=m=>m==="\u0645\u063A\u0644\u0642"||m==="\u0645\u0631\u0641\u0648\u0636"||m==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||m==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A";i.status=t.status==="\u0645\u063A\u0644\u0642"||t.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":t.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||t.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?t.status:"\u0645\u0641\u062A\u0648\u062D",i.updatedAt=new Date().toISOString(),(c(t.status)||t.closureTime)&&(i.closureDate=t.closureTime||new Date().toISOString(),i.closureReason=t.closureReason||"\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",i.totalTime=this.calculateTotalTime(i.timeFrom,i.closureDate)),this.registryData[r]=i,this._registrySanitizedCache=null,a||await this.saveRegistryData()},async removeFromRegistry(t){const e=this.registryData.findIndex(a=>a.permitId===t);e!==-1&&(this.registryData.splice(e,1),this._registrySanitizedCache=null,await this.saveRegistryData())},async loadPTWFromBackend(){try{const t=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!t)return AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629"),!1;AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 Backend...");const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTW",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}});return e&&e.success&&Array.isArray(e.data)?(AppState.appData.ptw=e.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${e.data.length} \u062A\u0635\u0631\u064A\u062D \u0645\u0646 Backend`),!0):(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e?.message),!1)}catch(t){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",t),!1}},async loadRegistryFromBackend(){try{const t=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!t)return!1;try{const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}});if(e&&e.success&&Array.isArray(e.data))return this.setPtwRegistryState(e.data,"backend.PTWRegistry.readFromSheet"),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 Backend`),!0}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",e)}return!1}catch(t){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",t),!1}},async syncRegistryWithPermits(){const t=AppState.appData.ptw||[];if(!t.length)return;Array.isArray(this.registryData)||this.initRegistry();let e=!1;for(const a of t){if(!a?.id)continue;this.registryData.find(i=>i.permitId===a.id)||(await this.addToRegistry(a,{skipSave:!0}),e=!0)}e&&await this.saveRegistryData({skipSync:!0})},_hasLocalPtwCache(){const t=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw.length:0,e=Array.isArray(this.registryData)?this.registryData.length:0,a=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry.length:0;return t>0||e>0||a>0},_refreshRegistryDomFromCache(){const t=document.getElementById("ptw-registry-content");if(!t)return;if(t.getAttribute("data-registry-pending")==="1"){this._mountRegistryShell();return}const e=document.getElementById("ptw-registry-table-mount");e||(t.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()),this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(!0):e&&e.setAttribute("data-registry-table-pending","1"),t.removeAttribute("data-registry-lazy")},_refreshRegistryViewLight(t=!1,e=!1){const a=document.getElementById("ptw-registry-content");if(!a)return;const r=document.getElementById("ptw-registry-table-mount");!r||e?(a.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()):this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(t):r&&r.setAttribute("data-registry-table-pending","1")},_refreshActiveTabAfterBackendSync(){const t=this.currentTab||"permits";try{if(this._refreshRegistryDomFromCache(),t==="permits"){const e=document.getElementById("ptw-permits-content");e&&e.style.display!=="none"&&this.loadPTWList(!0)}else t==="registry"&&this.setupRegistryEventListeners()}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 PTW \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}},_startPtwBackendSync(){if(this._backendSyncStarted||this._ptwBackendLoadPromise)return;if(this._backendSyncStarted=!0,!(GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured())){this._backendSyncStarted=!1;return}return this._ptwBackendLoadPromise=(async()=>{try{const e=await GoogleIntegration.sendRequest({action:"batchReadSheets",data:{sheetNames:["PTW","PTWRegistry"],spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}});if(e&&e.success&&e.data&&typeof e.data=="object"){const a=e.data.PTW,r=e.data.PTWRegistry;Array.isArray(a)&&(AppState.appData.ptw=a),Array.isArray(r)&&this.setPtwRegistryState(r,"backend.PTWRegistry.batchReadSheets"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u26A1 \u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A PTW \u0648 PTWRegistry \u0628\u0637\u0644\u0628 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 (batchReadSheets) \u0628\u0646\u062C\u0627\u062D")}else await Promise.all([this.loadPTWFromBackend().catch(()=>!1),this.loadRegistryFromBackend().catch(()=>!1)])}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 PTW \u0639\u0628\u0631 batchReadSheets \u2014 \u062C\u0627\u0631\u064A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0646\u0645\u0637 \u0627\u0644\u0641\u0631\u062F\u064A:",e),await Promise.all([this.loadPTWFromBackend().catch(()=>!1),this.loadRegistryFromBackend().catch(()=>!1)])}finally{if(this._refreshActiveTabAfterBackendSync(),this.updateKPIs(),typeof Dashboard<"u"&&typeof Dashboard.renderUI=="function")try{Dashboard.renderUI()}catch{}this._ptwBackendLoadPromise=null,this._backendSyncStarted=!1}})(),this._ptwBackendLoadPromise},_renderPermitsLoadingShell(t){return`
            <div class="content-card">
                <div class="card-body">
                    <div class="empty-state">
                        <div style="width: 300px; margin: 0 auto 16px;">
                            <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <p class="text-gray-500">${typeof t=="function"?t("module.ptw.loading.permits","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D..."}</p>
                    </div>
                </div>
            </div>`},_mountPermitsListContent(t){const e=document.getElementById("ptw-permits-content");if(e)try{e.innerHTML=this.renderList({includeStats:!1}),this.applyModuleI18n(e),this.setupEventListeners(),this.loadPTWList(!0),(()=>{if(!document.getElementById("ptw-permits-content"))return;const r=document.getElementById("ptw-stats-section");if(r)try{const i=this.renderListStatsSection();i&&(r.outerHTML=i),this.applyModuleI18n(e),this.updateKPIs()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0637\u0627\u0642\u0627\u062A \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A PTW:",i)}})()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a),e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${t("module.common.loadDataError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                            <button onclick="PTW.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                </div>`,this.applyModuleI18n(e)}},renderListStatsSection(){const t=(f,x)=>this._t(f,x),{source:e,merged:a,permitsFromList:r,permitsFromRegistry:i}=this.getPermitMetricsDataset(),s=e.length,o=e.filter(f=>f&&this.isPermitOpenStatus(f.status)).length,l=e.filter(f=>f&&this.isPermitClosedStatus(f.status)).length,n={};a.forEach(f=>{const x=f.workType||t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");n[x]||(n[x]={total:0,open:0,closed:0}),n[x].total++;const b=(f.status||"").trim();b==="\u0645\u063A\u0644\u0642"||b==="\u0645\u0631\u0641\u0648\u0636"||b==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||b==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?n[x].closed++:n[x].open++});const p=Object.entries(n).sort((f,x)=>x[1].total-f[1].total),d=p.length>0?p[0]:null,c=Object.keys(n).length,m=t("module.ptw.stats.countsListAndRegistry","{listCount} \u0642\u0627\u0626\u0645\u0629 + {registryCount} \u0633\u062C\u0644").replace("{listCount}",r.length).replace("{registryCount}",i.length),u=t("module.ptw.stats.differentTypesCount","{n} \u0646\u0648\u0639 \u0645\u062E\u062A\u0644\u0641").replace("{n}",c),h=`
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
                                <h3 class="text-lg font-bold text-white mb-1 drop-shadow-md">${t("module.ptw.stats.permitTypesTitle","\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}</h3>
                                <p class="text-xs text-purple-100 font-medium">${u}</p>
                            </div>
                        </div>
                    </div>
                    <div class="ptw-card-inner rounded-xl p-4 shadow-lg backdrop-blur-sm">
                        ${d?`
                            <div class="ptw-card-text font-bold text-base mb-4 line-clamp-2" title="${Utils.escapeHTML(d[0])}">
                                ${Utils.escapeHTML((()=>{const f=this._getWorkTypeDisplayName(d[0]);return f.length>50?f.substring(0,50)+"...":f})())}
                            </div>
                            <div class="flex items-center justify-between gap-2 flex-wrap">
                            <div class="ptw-stat-badge ptw-stat-open flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span class="text-orange-700 font-bold text-sm">${t("module.ptw.stats.openBadge","\u0645\u0641\u062A\u0648\u062D: {n}").replace("{n}",d[1].open)}</span>
                            </div>
                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-700 font-bold text-sm">${t("module.ptw.stats.closedBadge","\u0645\u063A\u0644\u0642: {n}").replace("{n}",d[1].closed)}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-total flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                                    <span class="text-gray-800 font-bold text-sm">${t("module.ptw.stats.totalBadge","\u0625\u062C\u0645\u0627\u0644\u064A: {n}").replace("{n}",d[1].total)}</span>
                                </div>
                            </div>
                        `:`
                            <div class="ptw-card-text text-center py-4 text-gray-500">
                                <i class="fas fa-info-circle text-2xl mb-2"></i>
                                <p class="text-sm">${t("module.ptw.stats.noTypesFound","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u062A\u0635\u0627\u0631\u064A\u062D \u062D\u0627\u0644\u064A\u0627\u064B")}</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;return`
            <div class="content-card mb-6" id="ptw-stats-section">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>${t("module.ptw.stats.statusCounters","\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629")}</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div class="relative ptw-stat-card ptw-stat-card-open rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                                    <i class="fas fa-unlock-alt text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-open-count">${o}</div>
                                <div class="text-base font-bold text-orange-50">${t("module.ptw.stats.openPermitsCount","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629")}</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-closed rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                                    <i class="fas fa-lock text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-closed-count">${l}</div>
                                <div class="text-base font-bold text-green-50">${t("module.ptw.stats.closedPermitsCount","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u063A\u0644\u0642\u0629")}</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-total rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/25">
                                    <i class="fas fa-clipboard-list text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-total-count">${s}</div>
                                <div class="text-base font-bold text-gray-100">${t("module.ptw.stats.totalPermits","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}</div>
                                <div class="mt-3 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/25">
                                    <div class="text-xs text-gray-100 font-medium">
                                        <i class="fas fa-database text-xs ml-1"></i>
                                        ${m}
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${h}
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
                                        <h3 class="text-2xl font-bold text-white mb-1 drop-shadow-md">${t("module.ptw.stats.allPermitTypesHeader","\u062C\u0645\u064A\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}</h3>
                                        <p class="text-sm text-purple-100">${t("module.ptw.stats.allPermitTypesSubtitle","\u062A\u0641\u0627\u0635\u064A\u0644 \u0634\u0627\u0645\u0644\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</p>
                                    </div>
                                </div>
                                <div class="bg-white/25 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30 shadow-lg">
                                    <span class="text-lg font-bold text-white">${Object.keys(n).length}</span>
                                    <span class="text-sm text-purple-100 font-medium mr-1">${t("module.ptw.stats.typeUnit","\u0646\u0648\u0639")}</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="ptw-work-types-stats">
                                ${p.map(([f,x])=>`
                                    <div class="group relative ptw-work-type-item backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                        <div class="relative z-10">
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex-1 min-w-0">
                                                    <div class="ptw-work-type-name font-bold text-sm mb-2 line-clamp-2 leading-tight" title="${Utils.escapeHTML(f)}">
                                                        ${Utils.escapeHTML(this._getWorkTypeDisplayName(f))}
                                                    </div>
                                                </div>
                                                <div class="ptw-work-type-total-badge ml-3">
                                                    ${x.total}
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <div class="ptw-stat-badge ptw-stat-open flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                    <span class="text-orange-700 font-bold text-xs">${t("module.ptw.stats.openBadge","\u0645\u0641\u062A\u0648\u062D: {n}").replace("{n}",x.open)}</span>
                                                </div>
                                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span class="text-green-700 font-bold text-xs">${t("module.ptw.stats.closedBadge","\u0645\u063A\u0644\u0642: {n}").replace("{n}",x.closed)}</span>
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
        `},async load(){if(this._isLoading){this._reloadRequested=!0;return}if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{if(this._isLoading){this._reloadRequested=!0;return}this.load()}),this._languageChangeListenerAdded=!0),this._iaCacheListenerAdded||(document.addEventListener("issuingAuthoritiesUpdated",()=>{this._clearIaWorkflowCache()}),this._iaCacheListenerAdded=!0),this._isLoading=!0,typeof Utils>"u"){this._isLoading=!1;return}if(typeof AppState>"u"){Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!"),this._isLoading=!1;return}if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}const t=document.getElementById("ptw-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 ptw-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!"),this._isLoading=!1;return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 PTW \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: ptw-section");const e=(a,r)=>window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(a,r):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(a,r):r;try{t.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-file-alt ml-3" aria-hidden="true"></i>
                            ${e("module.ptw.title","\u0625\u062F\u0627\u0631\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")}
                        </h1>
                        <p class="section-subtitle">${e("module.ptw.subtitle","\u0625\u0635\u062F\u0627\u0631 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A")}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" id="add-manual-ptw-btn" class="btn-warning" onclick="PTW.openManualPermitForm()">
                            <i class="fas fa-edit ml-2"></i>
                            ${e("module.ptw.btn.addManual","\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A")}
                        </button>
                        <button type="button" id="add-ptw-btn" class="btn-primary" onclick="PTW.showForm()">
                            <i class="fas fa-plus ml-2"></i>
                            ${e("module.ptw.btn.newPermit","\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F")}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0648\u0627\u0644\u0633\u062C\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A -->
            <div class="ptw-tabs mt-4 mb-4 bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto" style="flex-wrap: nowrap; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                <button id="ptw-tab-permits" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-blue-600 bg-blue-50 shadow-sm" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('permits')">
                    <i class="fas fa-list ml-2"></i>
                    ${e("module.ptw.tab.permits","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-registry" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('registry')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    ${e("module.ptw.tab.registry","\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-map" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('map')">
                    <i class="fas fa-map-marked-alt ml-2"></i>
                    ${e("module.ptw.tab.map","\u062E\u0631\u064A\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-analysis" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('analysis')">
                    <i class="fas fa-chart-line ml-2"></i>
                    ${e("module.ptw.tab.analysis","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                </button>
                <button id="ptw-tab-approvals" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('approvals')">
                    <i class="fas fa-check-double ml-2"></i>
                    ${e("module.ptw.tab.approvals","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A")}
                </button>
                <button id="ptw-refresh-header-btn" type="button" class="px-4 py-3 font-semibold text-sm rounded-md transition-all duration-200 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 ml-2" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important;" title="${e("module.ptw.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A")}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${e("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                </button>
            </div>
            
            <style id="ptw-scrollbar-styles">
                /* \u062D\u062F\u0648\u062F \u0645\u0633\u0627\u062D\u0629 PTW: \u0644\u0627 \u062A\u0633\u0645\u062D \u0644\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0639\u0631\u064A\u0636 \u0628\u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0645\u062F\u064A\u0648\u0644 \u062E\u0644\u0641 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 */
                #ptw-section,
                #ptw-section > *,
                #ptw-tab-content,
                #ptw-permits-content,
                #ptw-registry-content,
                #ptw-analysis-content,
                #ptw-approvals-content {
                    width: 100%;
                    max-width: 100%;
                    min-width: 0;
                    box-sizing: border-box;
                }
                #ptw-section { overflow-x: hidden; }
                #ptw-section .section-header > .flex { min-width: 0; }
                #ptw-section .section-header > .flex > div { min-width: 0; }
                #ptw-section .section-header > .flex > div:last-child { flex-wrap: wrap; }
                #ptw-section .content-card,
                #ptw-section .card-body { min-width: 0; max-width: 100%; }
                @media (max-width: 1180px) {
                    #ptw-section .section-header > .flex { align-items: flex-start; }
                    #ptw-section .section-header > .flex > div:last-child { width: 100%; }
                }
                @media (max-width: 640px) {
                    #ptw-section .section-header > .flex > div:last-child { display: grid; grid-template-columns: 1fr; }
                    #ptw-section .section-header > .flex > div:last-child > button { width: 100%; }
                }
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
                    max-width: 100%;
                    min-width: 0;
                    scrollbar-gutter: stable both-edges;
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
                    ${this._renderPermitsLoadingShell(e)}
                </div>
                <div id="ptw-registry-content" style="display: none;" class="fade-in" data-registry-pending="1">
                    ${this._renderRegistryPlaceholderShell(e)}
                </div>
                <div id="ptw-map-content" style="display: none; flex-direction: column; height: calc(100vh - 280px); min-height: 600px; width: 100%;" class="fade-in" data-map-pending="1">
                    ${this._renderMapPlaceholderShell(e)}
                </div>
                <div id="ptw-analysis-content" style="display: none;" class="fade-in" data-tab-lazy="analysis">
                </div>
                <div id="ptw-approvals-content" style="display: none;" class="fade-in" data-tab-lazy="approvals">
                </div>
            </div>
        `,this.applyModuleI18n(t),this.ensureI18nObservers(t),this.formSettingsState=null,this.formSettingsEventsBound=!1,this.setupEventListeners(),requestAnimationFrame(()=>{try{this.initRegistry(!0)}catch{}this._mountPermitsListContent(e),this._mountRegistryShell();const a=()=>this._mountMapShell();typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:1200}):setTimeout(a,50)}),this._deferredSyncTimer=setTimeout(()=>{this._startPtwBackendSync(),this._hydrateMapCoordinatesFromLocal(),this._scheduleMapCoordinatesBackgroundSync()},1500)}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 PTW:",a),t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${e("module.common.loadDataRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <button onclick="PTW.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${e("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(t))}finally{this._isLoading=!1,this._reloadRequested&&(this._reloadRequested=!1,setTimeout(()=>{try{this.load()}catch{}},0))}},switchTab(t){this.currentTab=t,document.querySelectorAll(".ptw-tab-btn").forEach(p=>{p.classList.remove("text-blue-600","bg-blue-50","shadow-sm","active"),p.classList.add("text-gray-600","hover:bg-gray-50"),p.style.setProperty("flex-shrink","0","important"),p.style.setProperty("min-width","fit-content","important"),p.style.setProperty("white-space","nowrap","important"),p.style.setProperty("width","auto","important"),p.style.setProperty("max-width","none","important")});const a=document.querySelector(".ptw-tabs");a&&(a.style.setProperty("flex-wrap","nowrap","important"),a.style.setProperty("overflow-x","auto","important"),a.style.setProperty("overflow-y","visible","important"));const r=document.getElementById(`ptw-tab-${t}`);r&&(r.classList.remove("text-gray-600","hover:bg-gray-50"),r.classList.add("text-blue-600","bg-blue-50","shadow-sm","active"),r.style.setProperty("flex-shrink","0","important"),r.style.setProperty("min-width","fit-content","important"),r.style.setProperty("white-space","nowrap","important"),r.style.setProperty("width","auto","important"),r.style.setProperty("max-width","none","important"));const i=document.getElementById("ptw-permits-content"),s=document.getElementById("ptw-registry-content"),o=document.getElementById("ptw-map-content"),l=document.getElementById("ptw-analysis-content"),n=document.getElementById("ptw-approvals-content");if(i&&(i.style.display="none",i.style.visibility="hidden"),s&&(s.style.display="none",s.style.visibility="hidden"),o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0"),l&&(l.style.display="none",l.style.visibility="hidden"),n&&(n.style.display="none",n.style.visibility="hidden"),t==="permits")o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",o.style.width="0",o.style.height="0",o.style.overflow="hidden",o.style.pointerEvents="none",o.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1)),i&&(i.style.display="block",i.style.visibility="visible",i.style.position="relative",i.style.left="auto",i.style.width="auto",i.style.height="auto",i.style.overflow="visible",i.style.pointerEvents="auto",i.style.zIndex="auto");else if(t==="registry"){if(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),this.initRegistry(),s){if(s.style.display="block",s.style.visibility="visible",s.getAttribute("data-registry-pending")==="1")this._mountRegistryShell();else if(!s.innerHTML.trim())this._refreshRegistryDomFromCache();else{const p=document.getElementById("ptw-registry-table-mount");p&&p.getAttribute("data-registry-table-pending")==="1"&&this._mountRegistryTableRows(!1)}this.setupRegistryEventListeners()}}else if(t==="map"){if(o)try{Utils.safeLog("\u{1F5FA}\uFE0F Switching to Map Tab"),i&&(i.style.display="none",i.style.visibility="hidden"),s&&(s.style.display="none",s.style.visibility="hidden"),l&&(l.style.display="none",l.style.visibility="hidden"),n&&(n.style.display="none",n.style.visibility="hidden"),this._resetMapTabVisibility(o),this._ensureMapTabDom(o),this._prewarmLeafletLibrary(),this.mapInitTimeout&&clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null,requestAnimationFrame(()=>{this.currentTab!=="map"||!o||o.style.display==="none"||(this.isMapInstanceAlive()?this.resumeMap():this.initMap().catch(p=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (\u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u062A\u0628\u0648\u064A\u0628):",p?.message||p)}))})}catch(p){if(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0639\u0646\u062F \u0641\u062A\u062D \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u0627\u0626\u0637:",p?.message||p),o){o.style.display="flex";const d=o.querySelector("#ptw-map-error"),c=o.querySelector("#ptw-map-error-message");d&&c?(d.classList.remove("hidden"),c.innerHTML="<p>\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u062F\u0646\u0627\u0647.</p>",o.querySelector("#ptw-map-loading")&&(o.querySelector("#ptw-map-loading").style.display="none")):o.innerHTML=`<div class="p-6 text-center"><p class="text-red-600 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629.</p><button type="button" class="btn-primary" onclick="PTW.switchTab('map')"><i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button></div>`}}}else t==="analysis"?(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),l&&(l.style.display="block",l.style.visibility="visible",(l.getAttribute("data-tab-lazy")==="analysis"||!l.innerHTML.trim())&&(l.innerHTML=this.renderAnalysisContent(),l.removeAttribute("data-tab-lazy")),this.setupAnalysisEventListeners())):t==="approvals"&&(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),n&&(n.style.display="block",n.style.visibility="visible",(n.getAttribute("data-tab-lazy")==="approvals"||!n.innerHTML.trim())&&(n.innerHTML=this.renderApprovalsContent(),n.removeAttribute("data-tab-lazy")),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 Approvals Tab Displayed")));t!=="map"&&o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",o.style.width="0",o.style.height="0",o.style.overflow="hidden",o.style.pointerEvents="none",o.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1))},refreshCurrentTab(){const t=this.currentTab||"permits",e=document.getElementById("ptw-registry-content"),a=document.getElementById("ptw-permits-content"),r=document.getElementById("ptw-map-content"),i=document.getElementById("ptw-analysis-content"),s=document.getElementById("ptw-approvals-content"),o=document.getElementById("ptw-refresh-header-btn");if(o){o.disabled=!0;const n=o.querySelector("i.fa-sync-alt");n&&n.classList.add("fa-spin")}const l=()=>{if(o){o.disabled=!1;const n=o.querySelector("i.fa-sync-alt");n&&n.classList.remove("fa-spin")}this.updateKPIs(),typeof Notification<"u"&&Notification.success&&Notification.success(PTW._t("module.ptw.refresh.success","\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))};try{t==="permits"?(this.loadPTWList(!0),this._startPtwBackendSync(),l()):t==="registry"&&e?(this._refreshRegistryViewLight(!0),this._startPtwBackendSync(),l()):t==="map"&&r?(this.isMapInstanceAlive()?this.resumeMap():typeof this.initMap=="function"&&this.initMap().catch(n=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",n?.message||n)),l()):t==="analysis"&&i?(i.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners(),l()):(t==="approvals"&&s&&(s.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners()),l())}catch(n){if(Utils.safeError("\u062E\u0637\u0623 \u0639\u0646\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B:",n),o){o.disabled=!1;const p=o.querySelector("i.fa-sync-alt");p&&p.classList.remove("fa-spin")}typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.refresh.error","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))}},renderRegistryContent(t={}){const e=t.tableMode==="full"?"full":"shell",a=(d,c)=>this._t(d,c),r=document.getElementById("ptw-map-content");r&&(r.style.display="none",r.style.visibility="hidden",r.style.opacity="0",r.style.position="absolute",r.style.left="-9999px",r.style.width="0",r.style.height="0",r.style.overflow="hidden",r.style.pointerEvents="none",r.style.zIndex="-1");const i=this._getRegistryRowsCached(),{registryRowCount:s,openCount:o,closedCount:l,avgTime:n}=this._computeRegistryKpis(i),p=e==="full"?`<div class="table-responsive">${this.renderRegistryTable()}</div>`:`<div class="table-responsive" id="ptw-registry-table-mount" data-registry-table-pending="1">${this.renderRegistryTableShell()}</div>`;return`
            <style>
                .ptw-registry-workspace {
                    --ptr-navy:#102a43; --ptr-navy-2:#173d6c; --ptr-cyan:#0891b2; --ptr-blue:#2563eb;
                    --ptr-line:#d9e5f2; --ptr-soft:#f3f8fd; --ptr-ink:#172033; --ptr-muted:#64748b;
                    display:grid; gap:18px; direction:rtl; width:100%; max-width:100%; min-width:0;
                }
                .ptw-registry-workspace>* { min-width:0; max-width:100%; }
                .ptw-registry-toolbar { display:flex!important; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:0!important; padding:13px 15px; border:1px solid #bfdbfe; border-radius:16px; background:linear-gradient(120deg,#eff6ff,#f0fdfa); box-shadow:0 7px 20px rgba(30,64,175,.07); }
                .ptw-registry-toolbar>div { display:flex; flex-wrap:wrap; gap:8px; }
                .ptw-registry-toolbar button { min-height:40px; border-radius:10px; font-weight:750; box-shadow:0 4px 12px rgba(15,23,42,.09); }
                .ptw-registry-kpis { display:grid!important; grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))!important; gap:12px!important; width:100%; min-width:0; margin-bottom:0!important; }
                .ptw-registry-kpis>.kpi-card { min-width:0; width:100%; padding:18px; }
                .ptw-registry-filter-card { margin-bottom:0!important; overflow:hidden; border:1px solid #bae6fd; border-radius:18px; box-shadow:0 10px 26px rgba(14,116,144,.08); }
                .ptw-registry-filter-head { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding:14px 16px; border-bottom:1px solid #bae6fd; background:linear-gradient(125deg,#0f2942,#164e63); color:#fff; }
                .ptw-registry-filter-title { display:flex; align-items:center; gap:10px; min-width:0; }
                .ptw-registry-filter-title>i { display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border:1px solid rgba(255,255,255,.3); border-radius:11px; color:#cffafe; background:rgba(255,255,255,.1); }
                .ptw-registry-filter-title h3 { margin:0; color:#fff; font-size:1rem; font-weight:850; }
                .ptw-registry-filter-title p { margin:2px 0 0; color:#bae6fd; font-size:.72rem; }
                .ptw-registry-filter-summary { display:flex; align-items:center; flex-wrap:wrap; gap:8px; }
                .ptw-registry-result-pill { display:inline-flex; align-items:center; gap:6px; padding:7px 11px; border:1px solid rgba(255,255,255,.28); border-radius:999px; color:#ecfeff; background:rgba(255,255,255,.1); font-size:.76rem; font-weight:750; }
                .ptw-registry-result-pill strong { min-width:24px; text-align:center; color:#083344; background:#67e8f9; border-radius:999px; padding:2px 7px; }
                .ptw-registry-filter-reset { min-height:34px!important; padding:6px 11px!important; border:1px solid rgba(255,255,255,.35)!important; border-radius:9px!important; color:#fff!important; background:rgba(255,255,255,.1)!important; font-size:.75rem!important; font-weight:750!important; box-shadow:none!important; }
                .ptw-registry-filter-reset:hover:not(:disabled) { color:#0f2942!important; background:#fff!important; }
                .ptw-registry-filter-reset:disabled { opacity:.45; cursor:not-allowed; }
                .ptw-registry-filter-card>.card-body { padding:16px; background:linear-gradient(180deg,#f0f9ff,#fff); }
                .ptw-registry-filter-grid { display:grid!important; grid-template-columns:minmax(240px,1.5fr) repeat(3,minmax(155px,1fr)); gap:12px!important; align-items:end; }
                .ptw-registry-filter-field { min-width:0; }
                .ptw-registry-filter-field label { display:flex!important; align-items:center; gap:6px; margin-bottom:6px!important; color:#334155!important; font-size:.76rem!important; font-weight:800!important; }
                .ptw-registry-filter-field label i { color:var(--ptr-cyan); }
                .ptw-registry-filter-field .form-input { width:100%; min-height:44px; border:1px solid #cbd5e1; border-radius:10px; background:#fff; color:var(--ptr-ink); transition:border-color .18s ease,box-shadow .18s ease,background-color .18s ease; }
                .ptw-registry-filter-field .form-input:hover { border-color:#7dd3fc; }
                .ptw-registry-filter-field .form-input:focus { border-color:#0891b2; box-shadow:0 0 0 3px rgba(8,145,178,.14); background:#fafeff; }
                .ptw-registry-filter-field.is-active .form-input { border-color:#0891b2; background:#ecfeff; box-shadow:0 0 0 3px rgba(8,145,178,.09); }
                .ptw-registry-filter-card #registry-filter-count-wrapper { display:none; }
                .ptw-registry-table-card { width:100%; max-width:100%; min-width:0; overflow:hidden; border:1px solid #cbddeb; border-radius:18px; box-shadow:0 13px 30px rgba(15,42,67,.09); }
                .ptw-registry-table-card>.card-header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 17px; border-bottom:0; background:linear-gradient(125deg,var(--ptr-navy),var(--ptr-navy-2)); }
                .ptw-registry-table-card .card-title { display:flex; align-items:center; gap:8px; margin:0; color:#fff; font-size:1.08rem; font-weight:850; }
                .ptw-registry-table-card .card-title i { color:#67e8f9; }
                .ptw-registry-visible-badge { display:inline-flex; align-items:center; gap:5px; padding:6px 10px; border:1px solid rgba(255,255,255,.25); border-radius:999px; color:#dbeafe; background:rgba(255,255,255,.09); font-size:.73rem; font-weight:750; }
                .ptw-registry-visible-badge strong { color:#fff; font-size:.88rem; }
                .ptw-registry-table-card>.card-body { padding:0; }
                .ptw-registry-table-card .table-responsive { width:100%; max-width:100%; min-width:0; max-height:none; margin:0; overflow:visible; background:transparent; }
                .ptw-registry-table-card .ptw-table-wrapper { width:100%; max-width:100%; min-width:0; max-height:min(68vh,720px); overflow:auto; scrollbar-width:thin; scrollbar-color:#94a3b8 #e2e8f0; scrollbar-gutter:stable both-edges; }
                .ptw-registry-table { width:max-content!important; min-width:100%; border-collapse:separate!important; border-spacing:0; table-layout:auto; font-size:.79rem; }
                .ptw-registry-table thead { position:sticky; top:0; z-index:8; }
                .ptw-registry-table thead th { position:sticky; top:0; z-index:8; min-width:108px; padding:13px 11px!important; border:0!important; border-left:1px solid rgba(255,255,255,.13)!important; color:#f8fafc!important; background:linear-gradient(180deg,#173d6c,#102a43)!important; font-size:.73rem; font-weight:850!important; line-height:1.45; white-space:normal; vertical-align:middle; box-shadow:inset 0 -3px #22d3ee; }
                .ptw-registry-table thead th:first-child { min-width:78px; right:0; z-index:11; }
                .ptw-registry-table thead th:last-child { min-width:118px; left:0; z-index:11; }
                .ptw-registry-table tbody td { padding:11px 10px!important; border:0!important; border-bottom:1px solid #e2e8f0!important; border-left:1px solid #edf2f7!important; color:#334155; background:#fff; line-height:1.5; vertical-align:middle; }
                .ptw-registry-table tbody tr:nth-child(even) td { background:#f8fbff; }
                .ptw-registry-table tbody tr:hover td { background:#ecfeff; }
                .ptw-registry-table tbody td:first-child { position:sticky; right:0; z-index:4; min-width:78px; color:#1d4ed8!important; background:#eff6ff!important; font-family:Consolas,'Courier New',monospace; font-size:.86rem; text-align:center; box-shadow:-5px 0 12px rgba(15,23,42,.04); }
                .ptw-registry-table tbody td:last-child { position:sticky; left:0; z-index:4; min-width:118px; background:#f8fafc!important; box-shadow:5px 0 12px rgba(15,23,42,.07); }
                .ptw-registry-table tbody td:nth-child(3),.ptw-registry-table tbody td:nth-child(10) { min-width:190px; max-width:260px; }
                .ptw-registry-table thead th:nth-child(5),.ptw-registry-table tbody td:nth-child(5) { min-width:65px!important; max-width:95px!important; width:85px!important; white-space:nowrap!important; overflow:hidden!important; text-overflow:ellipsis!important; font-size:.78rem!important; }
                .ptw-registry-table tbody td:nth-child(11),.ptw-registry-table tbody td:nth-child(12) { min-width:150px; }
                .ptw-registry-table .badge { display:inline-flex; align-items:center; justify-content:center; min-width:105px; padding:6px 9px; border-radius:999px; font-size:.69rem; font-weight:800; white-space:normal; }
                .ptw-registry-table td:last-child .btn { min-height:33px; border-radius:8px; white-space:nowrap; box-shadow:0 3px 9px rgba(37,99,235,.16); }
                @media (max-width:1050px) { .ptw-registry-filter-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .ptw-registry-table thead th { min-width:98px; padding:11px 9px!important; font-size:.69rem; } .ptw-registry-table tbody td { padding:10px 8px!important; font-size:.73rem; } }
                @media (max-width:680px) {
                    .ptw-registry-toolbar { align-items:stretch; }
                    .ptw-registry-toolbar>button,.ptw-registry-toolbar>div,.ptw-registry-toolbar>div>button { width:100%; }
                    .ptw-registry-filter-head { align-items:flex-start; }
                    .ptw-registry-filter-summary { width:100%; justify-content:space-between; }
                    .ptw-registry-filter-grid { grid-template-columns:1fr; }
                    .ptw-registry-table-card>.card-header { align-items:flex-start; flex-direction:column; }
                    .ptw-registry-table-card .ptw-table-wrapper { max-height:72vh; }
                }
                @media (prefers-reduced-motion:reduce) { .ptw-registry-filter-field .form-input { transition:none; } }
            </style>
            <div class="ptw-registry-workspace">
            <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
            <div class="flex justify-between items-center gap-2 mb-4 ptw-registry-toolbar">
                <button type="button" id="ptw-registry-add-manual" class="btn-warning" onclick="PTW.openManualPermitForm()">
                    <i class="fas fa-plus-circle ml-2"></i>
                    ${a("module.ptw.registry.addManual","\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A")}
                </button>
                <div class="flex gap-2">
                    <button id="ptw-registry-import-excel" class="btn-secondary">
                        <i class="fas fa-file-import ml-2"></i>
                        ${a("module.ptw.registry.importExcel","\u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel")}
                    </button>
                    <button id="ptw-registry-export-excel" class="btn-secondary">
                        <i class="fas fa-file-excel ml-2"></i>
                        ${a("module.ptw.registry.exportExcel","\u062A\u0635\u062F\u064A\u0631 Excel")}
                    </button>
                    <button id="ptw-registry-export-pdf" class="btn-primary">
                        <i class="fas fa-file-pdf ml-2"></i>
                        ${a("module.ptw.registry.exportPdf","\u062A\u0635\u062F\u064A\u0631 PDF")}
                    </button>
                </div>
            </div>
            
            <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ptw-registry-kpis">
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-list-ol"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${a("module.ptw.registry.totalRecords","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-total">${s}</p>
                        <p class="text-xs text-gray-500 mt-1">${a("module.ptw.registry.sameAsTable","\u064A\u0637\u0627\u0628\u0642 \u0635\u0641\u0648\u0641 \u0627\u0644\u062C\u062F\u0648\u0644")}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-primary">
                    <div class="kpi-icon"><i class="fas fa-folder-open"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${a("module.ptw.registry.openPermits","\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0641\u062A\u0648\u062D\u0629")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-open">${o}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${a("module.ptw.registry.closedPermits","\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u063A\u0644\u0642\u0629")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-closed">${l}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-clock"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${a("module.ptw.registry.avgTime","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0648\u0642\u062A")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-avg" style="font-size: 1.2rem;">${n}</p>
                    </div>
                </div>
            </div>
            
            <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mb-4 ptw-registry-filter-card">
                <div class="ptw-registry-filter-head">
                    <div class="ptw-registry-filter-title">
                        <i class="fas fa-sliders-h" aria-hidden="true"></i>
                        <div>
                            <h3>${a("module.ptw.registry.dynamicFilter","\u0641\u0644\u062A\u0631\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}</h3>
                            <p>${a("module.ptw.registry.dynamicFilterHint","\u062A\u062A\u062D\u062F\u062B \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0628\u062D\u062B \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u062A\u0631\u0629")}</p>
                        </div>
                    </div>
                    <div class="ptw-registry-filter-summary">
                        <span class="ptw-registry-result-pill">
                            <i class="fas fa-list-check" aria-hidden="true"></i>
                            ${a("module.ptw.registry.visibleResults","\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0638\u0627\u0647\u0631\u0629")}
                            <strong id="ptw-registry-filter-count-head">${s}</strong>
                        </span>
                        <button type="button" id="registry-filter-reset" class="ptw-registry-filter-reset" onclick="PTW.resetRegistryFilters()" disabled>
                            <i class="fas fa-undo-alt ml-1" aria-hidden="true"></i>${a("module.ptw.registry.resetFilters","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0636\u0628\u0637")}
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 ptw-registry-filter-grid">
                        <div class="ptw-registry-filter-field" data-registry-filter-field>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-search ml-2"></i>${a("module.ptw.registry.search","\u0628\u062D\u062B")}
                            </label>
                            <input type="text" id="registry-search" class="form-input" placeholder="${a("module.ptw.registry.searchPlaceholder","\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0623\u0648 \u0627\u0644\u0645\u0633\u0644\u0633\u0644 \u0623\u0648 \u0627\u0644\u0648\u0635\u0641...")}">
                        </div>
                        <div class="ptw-registry-filter-field" data-registry-filter-field>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-filter ml-2"></i>${a("module.ptw.registry.status","\u0627\u0644\u062D\u0627\u0644\u0629")}
                            </label>
                            <select id="registry-filter-status" class="form-input">
                                <option value="">${a("module.ptw.registry.allStatuses","\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u0645\u0641\u062A\u0648\u062D</option>
                                <option value="\u0645\u063A\u0644\u0642">\u0645\u063A\u0644\u0642</option>
                                <option value="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646">\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646</option>
                                <option value="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644">\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644</option>
                                <option value="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A">\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A</option>
                            </select>
                        </div>
                        <div class="ptw-registry-filter-field" data-registry-filter-field>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>${a("module.ptw.registry.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}
                            </label>
                            <input type="date" id="registry-filter-date-from" class="form-input">
                        </div>
                        <div class="ptw-registry-filter-field" data-registry-filter-field>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>${a("module.ptw.registry.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")}
                            </label>
                            <input type="date" id="registry-filter-date-to" class="form-input">
                            <div id="registry-filter-count-wrapper" class="text-xs text-gray-600 mt-1">
                                ${a("module.ptw.registry.permitCountInRange","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629:")} <span id="registry-filter-count">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644 -->
            <div class="content-card ptw-registry-table-card">
                <div class="card-header">
                    <h2 class="card-title" id="ptw-registry-table-title">
                        <i class="fas fa-table ml-2"></i>
                        ${a("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${s} ${a("module.ptw.registry.recordWord","\u0633\u062C\u0644")})
                    </h2>
                    <span class="ptw-registry-visible-badge">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        ${a("module.ptw.registry.currentView","\u0627\u0644\u0645\u0639\u0631\u0648\u0636 \u062D\u0627\u0644\u064A\u0627\u064B")}: <strong id="ptw-registry-visible-count">${s}</strong>
                    </span>
                </div>
                <div class="card-body">
                    ${p}
                </div>
            </div>
            </div>
        `},renderRegistryTable(){const t=(i,s)=>this._t(i,s),e=this.getRegistrySanitizedDataset();if(e.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${t("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                    <p class="text-sm text-gray-400 mt-2">${t("module.ptw.registry.emptyHint","\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F\u0629")}</p>
                </div>
            `;const a=this.sortPermitRecordsNewestFirst(e);let r=`
            <table class="data-table ptw-registry-table" id="ptw-registry-data-table">
                <thead>
                    <tr>
                        <th>${t("module.ptw.registry.col.seq","\u0645\u0633\u0644\u0633\u0644")}</th>
                        <th>${t("module.ptw.registry.col.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</th>
                        <th>${t("module.ptw.registry.col.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                        <th>${t("module.ptw.registry.col.requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")}</th>
                        <th>${t("module.ptw.registry.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                        <th>${t("module.ptw.registry.col.timeFrom","\u0627\u0644\u0648\u0642\u062A \u0645\u0646")}</th>
                        <th>${t("module.ptw.registry.col.timeTo","\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649")}</th>
                        <th>${t("module.ptw.registry.col.totalTime","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A")}</th>
                        <th>${t("module.ptw.registry.col.authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627")}</th>
                        <th>${t("module.ptw.registry.col.workDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644")}</th>
                        <th>${t("module.ptw.registry.col.followUp1","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01")}</th>
                        <th>${t("module.ptw.registry.col.followUp2","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02")}</th>
                        <th>${t("module.ptw.registry.col.permitStatus","\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                        <th>${t("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                    </tr>
                </thead>
                <tbody>
        `;return r+=a.map(i=>this._renderRegistryTableRow(i)).join(""),r+="</tbody></table>",`<div class="ptw-table-wrapper">${r}</div>`},renderMapContent(){const t=(e,a)=>this._t(e,a);return`
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
                            ${t("module.ptw.map.title","\u062E\u0631\u064A\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">${t("module.ptw.map.subtitle","\u0639\u0631\u0636 \u062D\u0627\u0644\u0629 \u0648\u0645\u0648\u0627\u0642\u0639 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u2014 \u0645\u0631\u0643\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0635\u0631 (\u0627\u0644\u0642\u0627\u0647\u0631\u0629)")}</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <select id="ptw-map-filter-status" class="form-select text-sm w-40 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">${t("module.ptw.map.filterAllStatus","\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}</option>
                            <option value="\u0645\u0641\u062A\u0648\u062D">${t("module.ptw.status.open","\u0645\u0641\u062A\u0648\u062D")}</option>
                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629">${t("module.ptw.status.underReview","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}</option>
                            <option value="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647">${t("module.ptw.status.approved","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647")}</option>
                            <option value="\u0645\u063A\u0644\u0642">${t("module.ptw.status.closed","\u0645\u063A\u0644\u0642")}</option>
                            <option value="\u0645\u0631\u0641\u0648\u0636">${t("module.ptw.status.rejected","\u0645\u0631\u0641\u0648\u0636")}</option>
                        </select>
                        <select id="ptw-map-filter-type" class="form-select text-sm w-40 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="">${t("module.ptw.map.filterAllTypes","\u0643\u0644 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629">${t("module.ptw.map.wt.hot","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629")}</option>
                            <option value="\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629">${t("module.ptw.map.wt.enclosed","\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639">${t("module.ptw.map.wt.height","\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629">${t("module.ptw.map.wt.elec","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629")}</option>
                            <option value="\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629">${t("module.ptw.map.wt.cold","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629")}</option>
                        </select>
                        <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-md p-1 shadow-sm">
                            <button id="ptw-map-type-normal" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 bg-blue-500 text-white shadow-sm" title="${t("module.ptw.map.tooltipRoad","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629")}">
                                <i class="fas fa-map ml-1"></i>
                                ${t("module.ptw.map.mapNormal","\u0639\u0627\u062F\u064A")}
                            </button>
                            <button id="ptw-map-type-satellite" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 text-gray-700 hover:bg-gray-100" title="${t("module.ptw.map.tooltipSatellite","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629")}">
                                <i class="fas fa-satellite ml-1"></i>
                                ${t("module.ptw.map.mapSatellite","\u0633\u062A\u0627\u0644\u0627\u064A\u062A")}
                            </button>
                            <button id="ptw-map-type-terrain" class="px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 text-gray-700 hover:bg-gray-100" title="${t("module.ptw.map.tooltipTerrain","\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0637\u0628\u0648\u063A\u0631\u0627\u0641\u064A\u0629")}">
                                <i class="fas fa-mountain ml-1"></i>
                                ${t("module.ptw.map.mapTerrain","\u062A\u0636\u0627\u0631\u064A\u0633")}
                            </button>
                    </div>
                        <button id="ptw-map-fullscreen-btn" class="btn-secondary text-sm px-3 py-2" title="${t("module.ptw.map.fullscreen","\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")}">
                            <i class="fas fa-expand ml-2"></i>
                        </button>
                        ${this.isAdmin()?`
                            <button id="ptw-map-settings-btn" class="btn-secondary text-sm px-4 py-2" title="${t("module.ptw.map.locationSettingsTitle","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}">
                                <i class="fas fa-cog ml-2"></i>
                                ${t("module.ptw.map.locationSettings","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                            </button>
                        `:""}
                    </div>
                </div>
                <div id="ptw-map-container">
                    <div id="ptw-map"></div>
                        
                        <div id="ptw-map-legend" class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-[400] hidden md:block border border-gray-200 opacity-90 hover:opacity-100 transition-opacity">
                            <h4 class="font-bold mb-2 text-gray-700 border-b pb-1">${t("module.ptw.map.legend","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</h4>
                            <div class="space-y-1">
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-yellow-500"></span> <span>${t("module.ptw.map.legendOpen","\u0645\u0641\u062A\u0648\u062D/\u0642\u064A\u062F \u0627\u0644\u0639\u0645\u0644")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500"></span> <span>${t("module.ptw.map.legendReview","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500"></span> <span>${t("module.ptw.map.legendApproved","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647/\u0633\u0627\u0631\u064A")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-gray-500"></span> <span>${t("module.ptw.map.legendClosed","\u0645\u063A\u0644\u0642")}</span></div>
                                <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span> <span>${t("module.ptw.map.legendRejected","\u0645\u0631\u0641\u0648\u0636/\u0645\u0646\u062A\u0647\u064A")}</span></div>
                            </div>
                        </div>

                        <div id="ptw-map-loading" class="absolute inset-0 flex items-center justify-center bg-gray-100/90 backdrop-blur-sm" style="z-index: 1000;">
                            <div class="text-center">
                                <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                                <p class="text-gray-600 font-medium">${t("module.ptw.map.loadingMap","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629...")}</p>
                            </div>
                        </div>
                        <div id="ptw-map-error" class="hidden absolute inset-0 flex items-center justify-center bg-gray-100" style="z-index: 1000;">
                            <div class="text-center p-6 max-w-md">
                                <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                                <p class="text-gray-700 font-semibold mb-2">${t("module.ptw.map.loadErrorTitle","\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</p>
                                <div id="ptw-map-error-message" class="text-sm text-gray-500 mb-4 text-right">
                                    ${t("module.ptw.map.loadErrorHint","\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0648\u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}
                                </div>
                                <div class="flex gap-2 justify-center">
                                    <button onclick="PTW.initMap()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        ${t("module.ptw.map.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                    </button>
                                    <button onclick="PTW.showMapDebugInfo()" class="btn-secondary">
                                        <i class="fas fa-info-circle ml-2"></i>
                                        ${t("module.ptw.map.debug","\u062A\u0634\u062E\u064A\u0635")}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},mapInstance:null,mapMarkers:[],mapType:null,currentMapType:"normal",leafletLayers:{normal:null,satellite:null,terrain:null},isMapInitializing:!1,mapInitTimeout:null,mapFiltersInitialized:!1,mapFullscreenHandler:null,mapPendingTimeouts:[],isFullscreen:!1,googleMapsApiKeyChecked:!1,hasGoogleMapsApiKey:!1,EGYPT_MAP_DEFAULT:{lat:30.0444,lng:31.2357,zoom:6},LEGACY_SAUDI_MAP_DEFAULT:{lat:24.7136,lng:46.6753},getEgyptMapDefault(){return{lat:this.EGYPT_MAP_DEFAULT.lat,lng:this.EGYPT_MAP_DEFAULT.lng,zoom:this.EGYPT_MAP_DEFAULT.zoom}},_isLegacySaudiMapDefault_(t,e){const a=this.LEGACY_SAUDI_MAP_DEFAULT;return Math.abs(t-a.lat)<.001&&Math.abs(e-a.lng)<.001},_normalizeMapCoordinates_(t){return!t||typeof t.lat!="number"||typeof t.lng!="number"||isNaN(t.lat)||isNaN(t.lng)?this.getEgyptMapDefault():this._isLegacySaudiMapDefault_(t.lat,t.lng)?this.getEgyptMapDefault():t},applyEgyptDefaultView(){if(!this.mapInstance||this.currentTab!=="map")return;const t=this.getCurrentSiteCoordinates()||this.getDefaultFactoryCoordinates();this._applyCoordsToMapView(this._normalizeMapCoordinates_(t))},_scheduleMapTimeout(t,e){const a=setTimeout(()=>{const r=this.mapPendingTimeouts.indexOf(a);r>-1&&this.mapPendingTimeouts.splice(r,1),t()},e);return this.mapPendingTimeouts.push(a),a},_clearMapPendingTimeouts(){!this.mapPendingTimeouts||!this.mapPendingTimeouts.length||(this.mapPendingTimeouts.forEach(t=>clearTimeout(t)),this.mapPendingTimeouts=[])},_notifyMapCoordinatesUpdated(){this.currentTab!=="map"||!this.mapInstance||this._scheduleMapTimeout(()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},50)},_hydrateMapCoordinatesFromLocal(){typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.hydrateLocalToAppState&&MapCoordinatesManager.hydrateLocalToAppState()},_scheduleMapCoordinatesBackgroundSync(){typeof MapCoordinatesManager>"u"||!MapCoordinatesManager.scheduleBackgroundSync||MapCoordinatesManager.scheduleBackgroundSync().then(t=>{t&&(Utils.safeLog("\u2705 \u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0646 Google Sheets"),this._notifyMapCoordinatesUpdated())}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)})},shouldUseGoogleMapsForPtw(){if(!this.googleMapsApiKeyChecked){const t=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(t&&t.trim()!==""),this.googleMapsApiKeyChecked=!0}return AppState.googleConfig?.maps?.ptwEngine==="google"&&this.hasGoogleMapsApiKey},_prewarmLeafletLibrary(){return typeof L<"u"&&typeof L.map=="function"?Promise.resolve():this.ensureLeafletReady().catch(()=>{})},_prewarmMapTab(){this._mountMapShell()},_ensureLeafletSatelliteLayer(){return this.leafletLayers.satellite?this.leafletLayers.satellite:typeof L>"u"?null:(this.leafletLayers.satellite=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.satellite)},_ensureLeafletTerrainLayer(){return this.leafletLayers.terrain?this.leafletLayers.terrain:typeof L>"u"?null:(this.leafletLayers.terrain=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.terrain)},async ensureLeafletReady(){if(typeof L<"u"&&typeof L.map=="function")return;if(!document.querySelector('script[src*="leaflet"]'))throw new Error("\u0645\u0643\u062A\u0628\u0629 Leaflet \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");await new Promise((e,a)=>{let r=0;const i=40,s=setInterval(()=>{r++,typeof L<"u"&&typeof L.map=="function"?(clearInterval(s),e()):r>=i&&(clearInterval(s),a(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Leaflet")))},50)})},getCurrentSiteCoordinates(){try{const t=AppState.currentUser||{},e=[t.factoryId,t.factory,t.siteId,t.site,t.plant,t.location].filter(r=>r!=null&&String(r).trim()!==""),a=AppState.appData?.ptwMapSites||[];for(const r of e){const i=String(r).trim(),s=a.find(o=>String(o.id||"").trim()===i||String(o.name||"").trim()===i);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude),zoom:parseInt(s.zoom,10)||15}}if(typeof Permissions<"u"&&Permissions.formSettingsState?.sites)for(const r of e){const i=String(r).trim(),s=Permissions.formSettingsState.sites.find(o=>String(o.id||"").trim()===i||String(o.name||"").trim()===i);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude),zoom:parseInt(s.zoom,10)||15}}}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A:",t)}return null},_applyCoordsToMapView(t){if(!(!this.mapInstance||!t))try{this.mapType==="google"&&typeof google<"u"&&google.maps?(this.mapInstance.setCenter({lat:t.lat,lng:t.lng}),this.mapInstance.setZoom&&this.mapInstance.setZoom(t.zoom||15)):this.mapType==="leaflet"&&this.mapInstance.setView([t.lat,t.lng],t.zoom||15)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0636\u0628\u0637 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},isMapInstanceAlive(){if(!this.mapInstance||!this.mapType)return!1;const t=document.getElementById("ptw-map");if(!t||!document.body.contains(t))return!1;try{if(this.mapType==="leaflet"&&this.mapInstance.getContainer){const e=this.mapInstance.getContainer();return!!(e&&e.parentNode&&document.body.contains(e))}if(this.mapType==="google"&&this.mapInstance.getDiv){const e=this.mapInstance.getDiv();return!!(e&&document.body.contains(e))}}catch{return!1}return!1},refreshMapLayout(){if(this.mapInstance)try{this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps?.event&&google.maps.event.trigger(this.mapInstance,"resize")}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",t)}},resumeMap(){if(this.currentTab!=="map")return;if(!this.isMapInstanceAlive()){this.initMap().catch(a=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a?.message||a));return}const t=document.getElementById("ptw-map-loading"),e=document.getElementById("ptw-map-error");t&&(t.style.display="none"),e&&e.classList.add("hidden"),requestAnimationFrame(()=>{this.refreshMapLayout(),requestAnimationFrame(()=>{this.refreshMapLayout();try{this.updateMapMarkers()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0646\u062F \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)}})})},async initMap(){if(this.currentTab!=="map"){Utils.safeLog("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062E\u0627\u0631\u062C \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}const t=document.getElementById("ptw-map-content");if(!t||t.style.display==="none"||t.style.visibility==="hidden"){Utils.safeLog("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}if(this.isMapInitializing){Utils.safeLog("\u26A0\uFE0F \u062C\u0627\u0631\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062D\u0627\u0644\u064A\u0627\u064B - \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0643\u0631\u0631");return}if(this.isMapInstanceAlive()){this.resumeMap();return}this.isMapInitializing=!0;const e=document.getElementById("ptw-map-container"),a=document.getElementById("ptw-map-loading"),r=document.getElementById("ptw-map-error");let i=document.getElementById("ptw-map");if(!i)if(e)if(e.parentNode&&document.body.contains(e))try{i=document.createElement("div"),i.id="ptw-map",i.style.cssText="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;",e.appendChild(i),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",s),e&&(e.innerHTML='<div id="ptw-map" style="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;"></div>',i=document.getElementById("ptw-map"),i&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 innerHTML"))}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A DOM - ptw-map-container \u063A\u064A\u0631 \u0645\u062A\u0635\u0644"),r){r.classList.remove("hidden");const s=r.querySelector("#ptw-map-error-message");s&&(s.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 - ptw-map-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),r){r.classList.remove("hidden");const s=r.querySelector("#ptw-map-error-message");s&&(s.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}if(!i){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.isMapInitializing=!1;return}Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",i.id),this.destroyMap(),r&&r.classList.add("hidden"),a&&(a.style.display="flex"),i.innerHTML="",document.readyState==="complete"?requestAnimationFrame(()=>{const s=window.getComputedStyle(i);(s.width==="0px"||s.height==="0px"||s.width==="auto"||s.height==="auto")&&(i.style.width="100%",i.style.height="100%",i.style.minHeight="400px")}):(i.style.width="100%",i.style.height="100%",i.style.minHeight="400px"),i.style.display="block",i.style.visibility="visible",i.style.opacity="1",Utils.safeLog("\u2705 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629:",i.id);try{const s=this.getCurrentSiteCoordinates(),o=this._normalizeMapCoordinates_(s||this.getDefaultFactoryCoordinates());let l=!1;if(this.shouldUseGoogleMapsForPtw())try{(typeof google>"u"||!google.maps)&&await Promise.race([this.loadGoogleMapsAPI(),new Promise((p,d)=>setTimeout(()=>d(new Error("Google Maps timeout")),4e3))]),typeof google<"u"&&google.maps&&(l=!0)}catch(p){Utils.safeLog("\u2139\uFE0F \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0625\u0644\u0649 Leaflet/OSM (\u0645\u0635\u0631):",p?.message||p),l=!1}else Utils.safeLog("\u2139\uFE0F \u062E\u0631\u064A\u0637\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644: Leaflet/OSM \u2014 \u0645\u0631\u0643\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0635\u0631");if(l)this.mapInstance=new google.maps.Map(i,{center:{lat:o.lat,lng:o.lng},zoom:o.zoom||15,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN]},streetViewControl:!0,fullscreenControl:!0,zoomControl:!0,scaleControl:!0,rotateControl:!0}),this.mapType="google",this.currentMapType="normal";else try{await this.initLeafletMap(i,o),this.mapType="leaflet",Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 Leaflet \u0628\u0646\u062C\u0627\u062D")}catch(p){throw Utils.safeError("\u274C \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Leaflet:",p),new Error(`\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${p.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"}`)}if(!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - mapInstance \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062A\u0645 \u062A\u0647\u064A\u0626\u062A\u0647\u0627 \u0628\u0646\u062C\u0627\u062D\u060C \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",this.mapType),Utils.safeLog("\u2705 mapInstance:",this.mapInstance),Utils.safeLog("\u2705 mapContainer:",i),Utils.safeLog("\u2705 mapContainer parent:",i?i.parentElement:"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),i&&(document.readyState==="complete"?requestAnimationFrame(()=>{const p=i.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 (getBoundingClientRect):",p.width,"x",p.height),Utils.safeLog("\u{1F4D0} \u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",p.left,p.top),Utils.safeLog("\u{1F4D0} \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0645\u0631\u0626\u064A\u0629:",p.width>0&&p.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(p.width===0||p.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0635\u0631\u064A\u062D\u0629"),i.style.width="100%",i.style.height="600px",i.style.minHeight="400px")}):(i.style.width="100%",i.style.height="600px",i.style.minHeight="400px")),a&&(a.style.display="none"),this.refreshMapLayout();try{this.setupMapEventListeners(),this.mapFiltersInitialized||(this.initMapFilters(),this.mapFiltersInitialized=!0),this.mapFullscreenHandler||(this.mapFullscreenHandler=()=>{this.isFullscreen=!!document.fullscreenElement;const p=document.getElementById("ptw-map-fullscreen-btn");p&&(this.isFullscreen?(p.innerHTML='<i class="fas fa-compress ml-2"></i>',p.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"):(p.innerHTML='<i class="fas fa-expand ml-2"></i>',p.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),this._scheduleMapTimeout(()=>this.refreshMapLayout(),150)},document.addEventListener("fullscreenchange",this.mapFullscreenHandler))}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0645\u0633\u062A\u0645\u0639\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",p)}const n=()=>{try{this.updateMapMarkers()}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",p)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:600}):requestAnimationFrame(n),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D - \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645")}catch(s){if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u0634\u0644\u062A (\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645):",s?.message||s),a&&(a.style.display="none"),r){r.classList.remove("hidden");const o=r.querySelector("#ptw-map-error-message");if(o){let l=s.message||"\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A.";l.includes("Leaflet")||l.includes("leaflet")?l="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646: 1) \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A 2) \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP 3) \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629":l.includes("Google Maps")?l="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 Google Maps. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629.":(l.includes("CSP")||l.includes("Content-Security-Policy"))&&(l="\u062A\u0645 \u062D\u0638\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0645\u0627\u0646. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP."),o.innerHTML=`
                        <p class="mb-2"><strong>\u062E\u0637\u0623:</strong> ${l}</p>
                        <p class="text-sm text-gray-600 mb-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u0637\u0623: ${s.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        <div class="text-sm text-gray-500">
                            <p class="mb-1">\u{1F4A1} \u0646\u0635\u0627\u0626\u062D:</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A</li>
                                <li>\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Content Security Policy</li>
                                <li>\u062C\u0631\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 (F5)</li>
                                <li>\u062A\u062D\u0642\u0642 \u0645\u0646 \u0643\u0648\u0646\u0633\u0648\u0644 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</li>
                            </ul>
                        </div>
                    `}}try{const o=this.getDefaultFactoryCoordinates(),l=i||document.getElementById("ptw-map-container");l&&this.showFallbackMap(l,o)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",o)}}finally{this.isMapInitializing=!1}},showFallbackMap(t,e){try{Utils.safeLog("\u{1F504} \u0645\u062D\u0627\u0648\u0644\u0629 \u0639\u0631\u0636 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629...");const a=e.lat,r=e.lng,i=e.zoom||15;t&&(t.innerHTML=`
                    <div style="width: 100%; height: 100%; position: relative; background: #f3f4f6; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-map-marked-alt text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</p>
                            <p class="text-sm text-gray-500 mb-4">\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A: ${a.toFixed(6)}, ${r.toFixed(6)}</p>
                            <a href="https://www.openstreetmap.org/?mlat=${a}&mlon=${r}&zoom=${i}" 
                               target="_blank" 
                               class="btn-primary inline-block"
                               style="text-decoration: none;">
                                <i class="fas fa-external-link-alt ml-2"></i>
                                \u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u062C\u062F\u064A\u062F\u0629
                            </a>
                        </div>
                    </div>
                `)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",a)}},destroyMap(){try{this._clearMapPendingTimeouts(),this.mapFullscreenHandler&&(document.removeEventListener("fullscreenchange",this.mapFullscreenHandler),this.mapFullscreenHandler=null),this.mapFiltersInitialized=!1,this.mapUpdateHandler&&(document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=null),this.mapStateUpdateHandler&&(window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=null),this.mapMarkers&&this.mapMarkers.length>0&&(this.mapMarkers.forEach(t=>{try{this.mapType==="google"&&t.setMap?(t.setMap(null),t.infoWindow&&t.infoWindow.close()):this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.removeLayer(t)}catch{}}),this.mapMarkers=[]),this.mapInstance&&(this.mapType==="leaflet"&&typeof L<"u"&&this.mapInstance.remove(),this.mapInstance=null),this.mapType=null,this.currentMapType="normal",this.leafletLayers&&(this.leafletLayers.normal=null,this.leafletLayers.satellite=null,this.leafletLayers.terrain=null)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062F\u0645\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",t)}},loadGoogleMapsAPI(){return new Promise((t,e)=>{if(typeof google<"u"&&google.maps){t();return}if(!this.googleMapsApiKeyChecked){const n=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(n&&n.trim()!==""),this.googleMapsApiKeyChecked=!0}if(!this.hasGoogleMapsApiKey){e(new Error("\u0645\u0641\u062A\u0627\u062D Google Maps API \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"));return}if(document.querySelector('script[src*="maps.googleapis.com"]')){let n=0;const p=100,d=setInterval(()=>{n++,typeof google<"u"&&google.maps?(clearInterval(d),t()):n>=p&&(clearInterval(d),e(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API")))},100);return}const r=AppState.googleConfig?.maps?.apiKey,i="PTW_GoogleMapsCallback_"+Date.now();let s=null,o=!1;window[i]=()=>{o||(o=!0,s&&clearTimeout(s),delete window[i],setTimeout(()=>{typeof google<"u"&&google.maps?t():e(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))},500))};const l=document.createElement("script");l.src=`https://maps.googleapis.com/maps/api/js?key=${r}&language=ar&region=EG&callback=${i}`,l.async=!0,l.defer=!0,l.onerror=()=>{o||(o=!0,s&&clearTimeout(s),delete window[i],e(new Error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Google Maps API - \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0623\u0648 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644")))},s=setTimeout(()=>{o||(o=!0,(typeof google>"u"||!google.maps)&&(delete window[i],e(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))))},4e3),document.head.appendChild(l)})},async initLeafletMap(t,e){if(t.hasChildNodes()&&(t.innerHTML=""),!document.querySelector('link[href*="leaflet"]')){const a=document.createElement("link");if(a.rel="stylesheet",a.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",a.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",a.crossOrigin="anonymous",document.head.appendChild(a),!document.querySelector('link[href*="leaflet-overrides"]')){const r=document.createElement("link");r.rel="stylesheet",r.href="css/leaflet-overrides.css",document.head.appendChild(r)}}if(typeof L>"u"&&await this.ensureLeafletReady(),typeof L>"u")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644 - \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");if(this.mapInstance&&this.mapType==="leaflet")try{this.mapInstance.remove(),this.mapInstance=null}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0633\u0627\u0628\u0642:",a)}t._leaflet_id&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641 Leaflet \u0633\u0627\u0628\u0642 - \u0633\u064A\u062A\u0645 \u062A\u0646\u0638\u064A\u0641\u0647"),t._leaflet_id=null,t.innerHTML="");try{if(!t||!t.parentElement)throw new Error("\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const a=document.getElementById("ptw-map-content"),r=document.getElementById("ptw-map-container");if(a){const m=window.getComputedStyle(a);(m.display==="none"||m.visibility==="hidden")&&(a.style.display="flex",a.style.visibility="visible"),(!a.style.height||a.style.height==="0px")&&(a.style.height="calc(100vh - 280px)",a.style.minHeight="600px")}if(r){const m=window.getComputedStyle(r);m.display==="none"&&(r.style.display="block"),(!r.style.height||m.height==="0px")&&(r.style.height="100%",r.style.minHeight="600px")}const i=t.parentElement;if(document.readyState==="complete"?requestAnimationFrame(()=>{i&&window.getComputedStyle(i).display==="none"&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629\u060C \u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631\u0647\u0627"),i.style.display="block");const m=window.getComputedStyle(t),u=m.width,h=m.height;Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",u,"x",h),(u==="0px"||h==="0px"||u==="auto"||h==="auto")&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0648\u0627\u0636\u062D\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),t.style.width="100%")}):(i&&(i.style.display="block"),t.style.width="100%",t.style.height="600px",t.style.minHeight="400px",t.style.display="block"),t.style.visibility="visible",t.style.opacity="1",Utils.safeLog("\u{1F5FA}\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet..."),Utils.safeLog("\u{1F4CD} \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A:",e.lat,e.lng,"\u0627\u0644\u062A\u0643\u0628\u064A\u0631:",e.zoom),Utils.safeLog("\u{1F4E6} \u062D\u0627\u0644\u0629 Leaflet:",typeof L<"u"?"\u0645\u062D\u0645\u0644":"\u063A\u064A\u0631 \u0645\u062D\u0645\u0644"),Utils.safeLog("\u{1F4E6} L.map \u0645\u0648\u062C\u0648\u062F:",typeof L<"u"&&typeof L.map=="function"?"\u0646\u0639\u0645":"\u0644\u0627"),typeof L>"u"||typeof L.map!="function")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D - L.map \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(t.innerHTML&&t.innerHTML.trim()!==""&&(Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629"),t.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const m=t.getBoundingClientRect();(m.width===0||m.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),t.style.width="100%",t.style.height="600px",t.style.minHeight="400px")}):(t.style.width="100%",t.style.height="600px",t.style.minHeight="400px"),Utils.safeLog("\u{1F504} \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."),t.innerHTML&&t.innerHTML.trim()!==""&&(t.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const m=t.getBoundingClientRect();(m.width===0||m.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),t.style.width="100%",t.style.height="600px")}):(t.style.width="100%",t.style.height="600px"),this.mapInstance=L.map(t,{preferCanvas:!0,zoomControl:!1}).setView([e.lat,e.lng],e.zoom||this.EGYPT_MAP_DEFAULT.zoom),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),Utils.safeLog("\u2705 mapInstance \u0645\u0648\u062C\u0648\u062F:",this.mapInstance?"\u0646\u0639\u0645":"\u0644\u0627"),Utils.safeLog("\u2705 container._leaflet_id:",t._leaflet_id),!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629");const s=this.mapInstance.getContainer();Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629\u060C \u062C\u0627\u0631\u064A \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 \u0627\u0644\u062E\u0631\u0627\u0626\u0637..."),this.leafletLayers.normal=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'\xA9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> \u2014 \u0645\u0635\u0631',maxZoom:19,subdomains:["a","b","c"],errorTileUrl:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",tileSize:256,crossOrigin:!0,keepBuffer:2,updateWhenIdle:!0,updateWhenZooming:!1}),this.leafletLayers.normal.on("tileerror",(m,u)=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 tile \u0644\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629:",m)}),this.leafletLayers.normal.addTo(this.mapInstance),this.currentMapType="normal",Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 OpenStreetMap");const o=document.getElementById("ptw-map-loading");o&&(o.style.display="none");const l=this.mapInstance._layers||{};Utils.safeLog("\u2705 \u0639\u062F\u062F \u0627\u0644\u0637\u0628\u0642\u0627\u062A:",Object.keys(l).length),L.control.zoom({position:"topright"}).addTo(this.mapInstance),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0643\u0645");const n=()=>{try{if(!this.mapInstance||!this.mapInstance.getContainer){setTimeout(()=>{this.mapInstance&&this.mapInstance.getContainer&&n()},100);return}const m=this.mapInstance.getContainer();if(m){const u=m.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet:",u.width,"x",u.height),Utils.safeLog("\u{1F4D0} \u062D\u0627\u0648\u064A\u0629 Leaflet \u0645\u0631\u0626\u064A\u0629:",u.width>0&&u.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(u.width===0||u.height===0)&&Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0642\u062F \u062A\u0643\u0648\u0646 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629")}else setTimeout(()=>{if(this.mapInstance&&this.mapInstance.getContainer){const u=this.mapInstance.getContainer();if(u){Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");const h=u.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet (\u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629):",h.width,"x",h.height)}}},200)}catch{}};setTimeout(n,50);let p=null;const c=(()=>{try{if(this.mapInstance&&this.mapInstance.getContainer)return this.mapInstance.getContainer()}catch{}return null})();c&&typeof ResizeObserver<"u"&&(p=new ResizeObserver(m=>{for(const u of m){const{width:h,height:f}=u.contentRect;h>0&&f>0&&this.mapInstance&&this.mapInstance.invalidateSize&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 ResizeObserver:",h,"x",f),p&&(p.disconnect(),p=null))}}),p.observe(c),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 ResizeObserver \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629")),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const m=this.mapInstance.getContainer();if(m&&m.offsetWidth>0&&m.offsetHeight>0)try{this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (500ms)");const u=this.mapInstance.getContainer();if(u){const h=u.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize (500ms):",h.width,"x",h.height),h.width===0||h.height===0?(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0644\u0627 \u062A\u0632\u0627\u0644 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const f=this.mapInstance.getContainer();f&&f.offsetWidth>0&&f.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"))}},1e3)):(Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u0631\u0626\u064A\u0629 \u0627\u0644\u0622\u0646"),p&&(p.disconnect(),p=null))}}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",u)}else Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u0633\u064A\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const u=this.mapInstance.getContainer();u&&u.offsetWidth>0&&u.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"),p&&(p.disconnect(),p=null))}},1e3)}},500),setTimeout(()=>{if(this.mapInstance)try{const m=document.getElementById("ptw-map-content"),u=document.getElementById("ptw-map-container"),h=document.getElementById("ptw-map");if(m){const x=window.getComputedStyle(m);(x.display==="none"||x.visibility==="hidden")&&(m.style.display="flex",m.style.visibility="visible"),(!m.style.height||m.style.height==="0px"||m.style.height==="auto")&&(m.style.height="calc(100vh - 280px)",m.style.minHeight="600px")}if(u&&(window.getComputedStyle(u).display==="none"&&(u.style.display="block"),(!u.style.height||u.style.height==="0px")&&(u.style.height="100%",u.style.minHeight="600px"),u.getBoundingClientRect().height===0&&(u.style.height="600px")),h&&(window.getComputedStyle(h).display==="none"&&(h.style.display="block"),(!h.style.height||h.style.height==="0px")&&(h.style.height="100%",h.style.width="100%"),h.getBoundingClientRect().height===0&&u)){const k=u.getBoundingClientRect().height;k>0?h.style.height=k+"px":h.style.height="600px"}this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (1000ms)");const f=this.mapInstance.getContainer();f&&requestAnimationFrame(()=>{const x=f.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 (1000ms):",x.width,"x",x.height),x.width>0&&x.height>0?Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0631\u0626\u064A\u0629 \u0648\u062C\u0627\u0647\u0632\u0629"):(h&&h.getBoundingClientRect().height===0&&(h.style.height="600px",h.style.width="100%"),u&&u.getBoundingClientRect().height===0&&(u.style.height="600px"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){this.mapInstance.invalidateSize();const b=this.mapInstance.getContainer();if(b){const k=b.getBoundingClientRect();k.width>0&&k.height>0?Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 - \u062A\u062D\u0642\u0642 \u0645\u0646 CSS \u0644\u0644\u062D\u0627\u0648\u064A\u0627\u062A")}}},500))})}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",m)}},1e3)}catch(a){throw Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet \u0641\u0634\u0644\u062A:",a?.message||a),new Error(`\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}`)}},showMapDebugInfo(){const t=AppState.googleConfig?.maps?.apiKey,e=t&&t.trim()!=="",a={"Leaflet \u0645\u062D\u0645\u0651\u0644":typeof L<"u"?"\u0646\u0639\u0645":"\u0644\u0627","Google Maps \u0645\u062D\u0645\u0651\u0644":typeof google<"u"&&typeof google.maps<"u"?"\u0646\u0639\u0645":"\u0644\u0627","\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Maps":e?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u0645\u0641\u062A\u0627\u062D API \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","CSP script-src":document.querySelector('meta[http-equiv="Content-Security-Policy"]')?"\u0645\u0648\u062C\u0648\u062F":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629":document.getElementById("ptw-map")?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629","\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629":JSON.stringify(this.getDefaultFactoryCoordinates()),"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629":(()=>{const i=this.getPermitMetricsDataset?.();return(Array.isArray(i?.source)?i.source:AppState.appData?.ptw||[]).filter(o=>this.isPermitOpenStatus(o?.status)).length})()},r=Object.entries(a).map(([i,s])=>`${i}: ${s}`).join(`
`);alert(`\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635:

`+r+`

\u0645\u0644\u0627\u062D\u0638\u0629: \u0625\u0630\u0627 \u0643\u0627\u0646 Google Maps "\u0644\u0627" \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0641\u062A\u0627\u062D\u060C \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0633\u0628\u0628 \u0642\u064A\u0648\u062F \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0646\u0637\u0627\u0642.`),typeof Utils<"u"&&typeof Utils.safeLog=="function"&&Utils.safeLog("\u{1F50D} \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)},getDefaultFactoryCoordinates(){let t=null;if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getDefaultCoordinatesSync)t=MapCoordinatesManager.getDefaultCoordinatesSync();else{const e=AppState.companySettings||{};e.latitude&&e.longitude?t={lat:parseFloat(e.latitude),lng:parseFloat(e.longitude),zoom:parseInt(e.mapZoom,10)||this.EGYPT_MAP_DEFAULT.zoom}:t=this.getEgyptMapDefault()}return this._normalizeMapCoordinates_(t)},getSiteCoordinates(t,e){try{const r=this.getMapSites().find(i=>(i.id===t||i.name===e)&&i.latitude&&i.longitude);if(r)return{lat:parseFloat(r.latitude),lng:parseFloat(r.longitude),zoom:r.zoom||15};if(typeof Permissions<"u"&&Permissions.formSettingsState){const i=Permissions.formSettingsState.sites?.find(s=>s.id===t||s.name===e);if(i&&i.latitude&&i.longitude)return{lat:parseFloat(i.latitude),lng:parseFloat(i.longitude)}}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(s=>(s.id||s.siteId)===t||s.name===e);if(i&&i.latitude&&i.longitude)return{lat:parseFloat(i.latitude),lng:parseFloat(i.longitude)}}return this.getDefaultFactoryCoordinates()}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639:",a),this.getDefaultFactoryCoordinates()}},isAdmin(){return AppState.currentUser?.role==="admin"||typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()},getMapSites(){if(AppState.appData||(AppState.appData={}),typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getMapSitesSync){const t=MapCoordinatesManager.getMapSitesSync();return AppState.appData.ptwMapSites=t,this._scheduleMapCoordinatesBackgroundSync(),t}return AppState.appData.ptwMapSites||(AppState.appData.ptwMapSites=[]),AppState.appData.ptwMapSites},async saveMapSites(t){if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveMapSites)try{if(await MapCoordinatesManager.saveMapSites(t)){Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0646\u062C\u0627\u062D \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager");return}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",e)}AppState.appData||(AppState.appData={}),AppState.appData.ptwMapSites=t,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW_MAP_SITES",t).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0641\u064A Google Sheets:",e)})},setupMapSettingsEventListeners(){if(!this.isAdmin())return;const t=document.getElementById("ptw-map-settings-btn");if(t)if(t.parentNode&&document.body.contains(t))try{t.replaceWith(t.cloneNode(!0));const e=document.getElementById("ptw-map-settings-btn");e&&e.addEventListener("click",()=>{this.showMapSettingsModal()})}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0632\u0631 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",e),t.addEventListener("click",()=>{this.showMapSettingsModal()})}else t.addEventListener("click",()=>{this.showMapSettingsModal()})},showMapSettingsModal(){if(!this.isAdmin()){Notification.warning(this._t("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"));return}const t=(i,s)=>this._t(i,s),e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${t("module.ptw.mapSettings.title","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                    </h2>
                    <button class="modal-close" aria-label="${t("module.ptw.mapSettings.closeAria","\u0625\u063A\u0644\u0627\u0642")}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderMapSettings()}
                </div>
            </div>
        `,document.body.appendChild(e);const a=()=>{e&&e.parentNode&&e.remove()},r=e.querySelector(".modal-close");r&&r.addEventListener("click",a),e.addEventListener("click",i=>{(i.target===e||i.target.classList.contains("modal-overlay"))&&confirm(this._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&a()}),setTimeout(()=>{const i=document.getElementById("ptw-map-settings-add-site");i&&i.addEventListener("click",()=>{this.addNewMapSite(e)}),e.querySelectorAll(".save-site-btn").forEach(n=>{n.addEventListener("click",p=>{const d=n.getAttribute("data-site-id");this.saveMapSite(d,e)})}),e.querySelectorAll(".delete-site-btn").forEach(n=>{n.addEventListener("click",p=>{const d=n.getAttribute("data-site-id");this.deleteMapSite(d,e)})});const l=document.getElementById("ptw-save-default-coords");l&&l.addEventListener("click",()=>{this.saveDefaultCoordinates()})},100)},renderMapSettings(){const t=(i,s)=>this._t(i,s);if(!this.isAdmin())return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${t("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629")}</p>
                        </div>
                    </div>
                </div>
            `;const e=this.getMapSites(),a=this.getDefaultFactoryCoordinates(),r=t("module.ptw.mapSettings.empty",'\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062D\u062F\u062F\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F" \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.');return`
            <div class="space-y-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-cog ml-2"></i>
                            ${t("module.ptw.mapSettings.title","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1">${t("module.ptw.mapSettings.cardSubtitle","\u0625\u062F\u0627\u0631\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u064A \u062A\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}</p>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <button id="ptw-map-settings-add-site" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${t("module.ptw.mapSettings.addNew","\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F")}
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>${t("module.ptw.mapSettings.col.name","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                        <th>${t("module.ptw.mapSettings.col.lat","\u062E\u0637 \u0627\u0644\u0639\u0631\u0636 (Latitude)")}</th>
                                        <th>${t("module.ptw.mapSettings.col.lng","\u062E\u0637 \u0627\u0644\u0637\u0648\u0644 (Longitude)")}</th>
                                        <th>${t("module.ptw.mapSettings.col.zoom","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0643\u0628\u064A\u0631")}</th>
                                        <th>${t("module.ptw.registry.col.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                                    </tr>
                                </thead>
                                <tbody id="ptw-map-settings-sites-list">
                                    ${e.length===0?`
                                        <tr>
                                            <td colspan="5" class="text-center text-gray-500 py-8">
                                                ${r}
                                            </td>
                                        </tr>
                                    `:e.map(i=>`
                                        <tr data-site-id="${Utils.escapeHTML(i.id||"")}">
                                            <td>
                                                <input type="text" class="form-input site-name-input" 
                                                    value="${Utils.escapeHTML(i.name||"")}" 
                                                    data-site-id="${Utils.escapeHTML(i.id||"")}"
                                                    placeholder="${t("module.ptw.mapSettings.placeholderSiteName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639")}">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lat-input" 
                                                    value="${i.latitude||a.lat}" 
                                                    data-site-id="${Utils.escapeHTML(i.id||"")}"
                                                    placeholder="30.0444">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lng-input" 
                                                    value="${i.longitude||a.lng}" 
                                                    data-site-id="${Utils.escapeHTML(i.id||"")}"
                                                    placeholder="31.2357">
                                            </td>
                                            <td>
                                                <input type="number" min="1" max="20" class="form-input site-zoom-input" 
                                                    value="${i.zoom||a.zoom||15}" 
                                                    data-site-id="${Utils.escapeHTML(i.id||"")}"
                                                    placeholder="15">
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button class="btn-icon btn-icon-success save-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(i.id||"")}" 
                                                        title="${t("module.ptw.mapSettings.btnSave","\u062D\u0641\u0638")}">
                                                        <i class="fas fa-save"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger delete-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(i.id||"")}" 
                                                        title="${t("module.ptw.mapSettings.btnDelete","\u062D\u0630\u0641")}">
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
                            ${t("module.ptw.mapSettings.defaultTitle","\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${t("module.ptw.mapSettings.defaultLat","\u062E\u0637 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" step="0.000001" id="ptw-default-lat" class="form-input" 
                                    value="${a.lat}" placeholder="30.0444">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${t("module.ptw.mapSettings.defaultLng","\u062E\u0637 \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" step="0.000001" id="ptw-default-lng" class="form-input" 
                                    value="${a.lng}" placeholder="31.2357">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${t("module.ptw.mapSettings.defaultZoom","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" min="1" max="20" id="ptw-default-zoom" class="form-input" 
                                    value="${a.zoom||15}" placeholder="15">
                            </div>
                        </div>
                        <div class="mt-4">
                            <button id="ptw-save-default-coords" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${t("module.ptw.mapSettings.saveDefault","\u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `},async addNewMapSite(t){const e=this.getMapSites(),a=this.getDefaultFactoryCoordinates(),r={id:Utils.generateId("MAP_SITE"),name:"",latitude:a.lat,longitude:a.lng,zoom:a.zoom||15};if(e.push(r),await this.saveMapSites(e),t){const i=t.querySelector(".modal-body");i&&(i.innerHTML=this.renderMapSettings(),setTimeout(()=>{const s=document.getElementById("ptw-map-settings-add-site");s&&s.addEventListener("click",()=>{this.addNewMapSite(t)}),t.querySelectorAll(".save-site-btn").forEach(n=>{n.addEventListener("click",()=>{const p=n.getAttribute("data-site-id");this.saveMapSite(p,t)})}),t.querySelectorAll(".delete-site-btn").forEach(n=>{n.addEventListener("click",()=>{const p=n.getAttribute("data-site-id");this.deleteMapSite(p,t)})})},100))}},async saveMapSite(t,e){const a=this.getMapSites(),r=a.find(n=>n.id===t);if(!r)return;const i=document.querySelector(`.site-name-input[data-site-id="${t}"]`),s=document.querySelector(`.site-lat-input[data-site-id="${t}"]`),o=document.querySelector(`.site-lng-input[data-site-id="${t}"]`),l=document.querySelector(`.site-zoom-input[data-site-id="${t}"]`);if(i&&s&&o){if(r.name=i.value.trim(),r.latitude=parseFloat(s.value)||0,r.longitude=parseFloat(o.value)||0,r.zoom=l&&parseInt(l.value)||15,!r.name){Notification.warning(this._t("module.ptw.mapSettings.warnings.enterSiteName","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639"));return}await this.saveMapSites(a),Notification.success(this._t("module.ptw.mapSettings.warnings.saveSiteOk","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D"))}},async deleteMapSite(t,e){if(!confirm(this._t("module.ptw.mapSettings.deleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639\u061F")))return;const r=this.getMapSites().filter(i=>i.id!==t);if(await this.saveMapSites(r),Notification.success(this._t("module.ptw.mapSettings.warnings.deleteSiteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D")),e){const i=e.querySelector(".modal-body");i&&(i.innerHTML=this.renderMapSettings(),setTimeout(()=>{const s=document.getElementById("ptw-map-settings-add-site");s&&s.addEventListener("click",()=>{this.addNewMapSite(e)}),e.querySelectorAll(".save-site-btn").forEach(n=>{n.addEventListener("click",()=>{const p=n.getAttribute("data-site-id");this.saveMapSite(p,e)})}),e.querySelectorAll(".delete-site-btn").forEach(n=>{n.addEventListener("click",()=>{const p=n.getAttribute("data-site-id");this.deleteMapSite(p,e)})})},100))}},async saveDefaultCoordinates(){const t=document.getElementById("ptw-default-lat"),e=document.getElementById("ptw-default-lng"),a=document.getElementById("ptw-default-zoom");if(!t||!e){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsGetError","\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A"));return}const r=parseFloat(t.value),i=parseFloat(e.value),s=a&&parseInt(a.value)||15;if(isNaN(r)||isNaN(i)){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsInvalid","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0635\u062D\u064A\u062D\u0629"));return}const o={lat:r,lng:i,zoom:s};if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveDefaultCoordinates)try{if(await MapCoordinatesManager.saveDefaultCoordinates(o)){Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSavedAll","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u062F\u0631"));return}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",l)}AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.latitude=r,AppState.companySettings.longitude=i,AppState.companySettings.mapZoom=s,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSaved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))},_fitMapMarkersBounds(){if(this.mapMarkers.length===0){this.applyEgyptDefaultView();return}try{if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const t=new google.maps.LatLngBounds;this.mapMarkers.forEach(e=>{try{e.getPosition&&t.extend(e.getPosition())}catch{}}),this.mapInstance.fitBounds&&this.mapInstance.fitBounds(t),this.mapMarkers.length===1&&this.mapInstance.setZoom&&this.mapInstance.setZoom(16)}else if(this.mapType==="leaflet"&&this.mapInstance){const t=this.mapInstance.getContainer();if(t&&t.offsetWidth>0&&t.offsetHeight>0){const a=new L.featureGroup(this.mapMarkers).getBounds();a&&a.isValid&&a.isValid()&&(this.mapInstance.fitBounds(a.pad(.1),{animate:!1,maxZoom:18}),this.mapMarkers.length===1&&this.mapInstance.setZoom(16))}}Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${this.mapMarkers.length} \u0639\u0644\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0636\u0628\u0637 \u062D\u062F\u0648\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",t)}},_addSingleMapMarker(t){const e=this.getSiteCoordinates(t.siteId,t.location||t.siteName);if(!(!e||typeof e.lat!="number"||typeof e.lng!="number")){if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const a=new google.maps.Marker({position:{lat:e.lat,lng:e.lng},map:this.mapInstance,title:`${t.id||"\u062A\u0635\u0631\u064A\u062D"} - ${t.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`,icon:{url:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",scaledSize:new google.maps.Size(32,32)}}),r=new google.maps.InfoWindow({content:this.createPermitInfoWindowContent(t)});a.addListener("click",()=>{this.mapMarkers.forEach(i=>{i.infoWindow&&i.infoWindow.close()}),r.open(this.mapInstance,a)}),a.infoWindow=r,this.mapMarkers.push(a)}else if(this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.getContainer){const a=this.mapInstance.getContainer();if(!a||a.offsetWidth===0||a.offsetHeight===0)return;const r=L.marker([e.lat,e.lng],{title:`${t.id||"\u062A\u0635\u0631\u064A\u062D"} - ${t.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`}).addTo(this.mapInstance);r.bindPopup(L.popup({maxWidth:400,className:"ptw-permit-popup"}).setContent(this.createPermitInfoWindowContent(t,"leaflet"))),r.permitId=t.id,this.mapMarkers.push(r)}}},updateMapMarkers(){if(this.currentTab!=="map")return;if(!this.mapInstance){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629 - \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A");return}Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.mapMarkers.forEach(l=>{try{if(this.mapType==="google"&&typeof google<"u"&&google.maps){if(l.setMap&&l.setMap(null),l.infoWindow)try{l.infoWindow.close()}catch{}}else if(this.mapType==="leaflet"&&this.mapInstance)try{this.mapInstance.removeLayer(l)}catch{}}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0639\u0644\u0627\u0645\u0629:",n)}}),this.mapMarkers=[];const t=document.getElementById("ptw-map-filter-status")?.value,e=document.getElementById("ptw-map-filter-type")?.value,a=(AppState.appData.ptw||[]).filter(l=>{if(t){if(l.status!==t)return!1}else{const n=l.status||"";if(n==="\u0645\u063A\u0644\u0642"||n==="\u0645\u0631\u0641\u0648\u0636"||n==="\u0645\u0643\u062A\u0645\u0644")return!1}return!(e&&l.workType!==e)});if(Utils.safeLog("\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636:",a.length),a.length===0){Utils.safeLog("\u2139\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636 \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u2014 \u0639\u0631\u0636 \u0645\u0635\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A"),this.applyEgyptDefaultView();return}const r=a;this._mapMarkersToken=(this._mapMarkersToken||0)+1;const i=this._mapMarkersToken,s=35,o=l=>{if(i!==this._mapMarkersToken||this.currentTab!=="map"||!this.mapInstance)return;r.slice(l,l+s).forEach(p=>{try{this._addSingleMapMarker(p)}catch(d){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0639\u0644\u0627\u0645\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D ${p.id}:`,d)}}),l+s<r.length?requestAnimationFrame(()=>o(l+s)):this._fitMapMarkersBounds()};o(0)},createPermitInfoWindowContent(t,e="google"){const a=this.calculateRemainingTime(t.endDate),r=t.startDate||t.createdAt,i=r?Utils.formatDate(r):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
            <div style="min-width: 300px; max-width: 400px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 12px; border-radius: 8px 8px 0 0; margin: -8px -8px 8px -8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">
                        <i class="fas fa-file-alt" style="margin-left: 8px;"></i>
                        ${t.id||"\u062A\u0635\u0631\u064A\u062D"}
                    </h3>
                </div>
                <div style="padding: 8px 0;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:</strong>
                        <span style="color: #6b7280;">${Utils.escapeHTML(t.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629:</strong>
                        <span style="color: #6b7280;">${Utils.escapeHTML(t.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0648\u0642\u062A \u0627\u0644\u0641\u062A\u062D:</strong>
                        <span style="color: #6b7280;">${i}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A:</strong>
                        <span style="color: ${a.includes("\u0645\u0646\u062A\u0647\u064A")?"#dc2626":"#059669"}; font-weight: 600;">${a}</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:</strong>
                        <span class="badge badge-${this.getStatusBadgeClass(t.status)}" style="display: inline-block; padding: 4px 8px; border-radius: 4px;">
                            ${Utils.escapeHTML(t.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                        </span>
                    </div>
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
                        <button onclick="PTW.viewPTW('${t.id}'); ${e==="leaflet"?"if(window.ptwCurrentPopup) window.ptwCurrentPopup.close();":""}" 
                                style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600; transition: background 0.2s;"
                                onmouseover="this.style.background='#2563eb'"
                                onmouseout="this.style.background='#3b82f6'">
                            <i class="fas fa-eye" style="margin-left: 6px;"></i>
                            \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                        </button>
                    </div>
                </div>
            </div>
        `},calculateRemainingTime(t){if(!t)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{const e=this.parseDateTimeValue(t);if(!e)return"\xD8\xBA\xD9\u0160\xD8\xB1 \xD9\u2026\xD8\xAD\xD8\xAF\xD8\xAF";const r=e-new Date;if(r<0)return"\u0645\u0646\u062A\u0647\u064A";const i=Math.floor(r/(1e3*60*60)),s=Math.floor(r%(1e3*60*60)/(1e3*60));return i>24?`${Math.floor(i/24)} \u064A\u0648\u0645`:i>0?`${i} \u0633\u0627\u0639\u0629 \u0648 ${s} \u062F\u0642\u064A\u0642\u0629`:`${s} \u062F\u0642\u064A\u0642\u0629`}catch{return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}},setupMapEventListeners(){this.currentTab==="map"&&(this.mapUpdateHandler&&document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},document.addEventListener("ptw:updated",this.mapUpdateHandler),this.mapStateUpdateHandler&&window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this._scheduleMapTimeout(()=>{this.updateMapMarkers()},100)},window.addEventListener("appstate:updated",this.mapStateUpdateHandler))},viewRegistryDetails(t){const e=AppState.appData.ptw.find(d=>d.id===t),a=this.registryData.find(d=>d.permitId===t),r=a&&a.isManualEntry===!0;if(!e&&!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(r&&!e){this.viewManualPermitDetails(a.id);return}if(!e){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const i=AppState.currentUser?.role==="admin",s=e.status!=="\u0645\u063A\u0644\u0642"&&e.status!=="\u0645\u0631\u0641\u0648\u0636",o=document.createElement("div");o.className="modal-overlay";const l=Array.isArray(e.teamMembers)?e.teamMembers:[],n=l.length>0?l.map(d=>`<span class="bg-blue-50 px-2 py-1 rounded text-sm">${Utils.escapeHTML(d.name||"-")}</span>`).join(" "):'<span class="text-gray-400">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',p=a?this.getPermitTypeDisplay(a):e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.innerHTML=`
            <div class="modal-content" style="max-width: 900px; background: #ffffff;">
                <div class="modal-header modal-header-centered bg-white border-b border-gray-200 rounded-t-lg" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <h2 class="modal-title flex items-center gap-2" style="color: #000000; font-size: 1.5rem; font-weight: 700; margin: 0;">
                            <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                            \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${this.getPermitDisplayNumber(a||e)}
                        </h2>
                        <p class="text-sm mt-2" style="color: #6b7280;">
                            <i class="fas fa-calendar-alt ml-1"></i>
                            ${e.startDate?Utils.formatDate(e.startDate):a?.openDate?Utils.formatDate(a.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            <span class="badge ${e.status==="\u0645\u063A\u0644\u0642"?"bg-green-500":e.status==="\u0645\u0641\u062A\u0648\u062D"||e.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"bg-yellow-500":"bg-blue-500"} mr-3" style="color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem;">
                                ${e.status||a?.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
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
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${t}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button class="btn-success btn-sm" onclick="PTW.exportPDF('${t}')">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        ${i?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${t}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${t}')">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${s?`
                            <button class="btn-secondary btn-sm" onclick="PTW.closePermitFromRegistry('${t}')">
                                <i class="fas fa-lock ml-1"></i> \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                            </button>
                        `:""}
                    </div>
                    
                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a?this.getPermitTypeDisplay(a):e.workType||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(e.siteName||e.location||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(e.requestingParty||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(e.authorizedParty||"-")}</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${e.startDate?Utils.formatDate(e.startDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${e.endDate?Utils.formatDate(e.endDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</label>
                                <p class="font-semibold text-blue-600" style="color: #2563eb;">${a?.totalTime||"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <span class="badge badge-${this.getStatusBadgeClass(e.status)}">${e.status||"-"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-1" style="color: #374151;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</label>
                        <p style="color: #000000;">${Utils.escapeHTML(e.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                    </div>
                    
                    <!-- \u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-2" style="color: #374151;">\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644</label>
                        <div class="flex flex-wrap gap-2">${n}</div>
                    </div>
                    
                    <!-- \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 -->
                    <div class="mt-4 grid grid-cols-2 gap-4">
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</label>
                            <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a?.supervisor1||"-")}</p>
                        </div>
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</label>
                            <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a?.supervisor2||"-")}</p>
                        </div>
                    </div>
                    
                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${t}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        ${i?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${t}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${t}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${s?`
                            <button class="btn-secondary btn-sm" onclick="PTW.closePermitFromRegistry('${t}')">
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
        `,document.body.appendChild(o),o.addEventListener("click",d=>{d.target===o&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&o.remove()})},viewManualPermitDetails(t){const e=this.registryData.find(n=>n.id===t);if(!e){Notification.error(this._t("module.ptw.notify.permitNotFoundM","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A"));return}const a=AppState.currentUser?.role==="admin",r=this.getPermitTypeDisplay(e),i=(n,p)=>this._t(n,p),s=e.sequentialNumber?String(e.sequentialNumber).padStart(4,"0"):"\u2014",o=String(e.paperPermitNumber||"").trim()||"\u2014",l=document.createElement("div");l.className="modal-overlay ptw-manual-details-overlay",l.innerHTML=`
            <style>
                .ptw-manual-details-overlay {
                    --ptw-details-ink: #111827;
                    --ptw-details-muted: #64748b;
                    --ptw-details-line: #e2e8f0;
                    --ptw-details-blue: #2457e6;
                    --ptw-details-blue-soft: #eef5ff;
                    --ptw-details-footer: #f1f5f9;
                    padding: 18px;
                    background: radial-gradient(circle at 15% 12%, rgba(14, 165, 233, .16), transparent 28%), rgba(15, 23, 42, .62);
                }
                .ptw-manual-details-shell {
                    width: min(940px, 100%);
                    max-width: 940px !important;
                    max-height: 94vh;
                    overflow: hidden;
                    border: 1px solid rgba(125, 211, 252, .55);
                    border-radius: 24px;
                    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 38%);
                    box-shadow: 0 30px 90px rgba(2, 8, 23, .38), 0 0 0 6px rgba(255, 255, 255, .08);
                    color: var(--ptw-details-ink);
                    direction: rtl;
                }
                .ptw-manual-details-header {
                    position: relative;
                    padding: 24px 76px 20px;
                    text-align: center;
                    border-bottom: 4px solid #22d3ee;
                    background: linear-gradient(125deg, #0f172a 0%, #153e75 58%, #0369a1 100%);
                    overflow: hidden;
                }
                .ptw-manual-details-header::after {
                    content: '';
                    position: absolute;
                    inset: auto -8% -70px;
                    height: 110px;
                    border-radius: 50%;
                    background: rgba(56, 189, 248, .12);
                    pointer-events: none;
                }
                .ptw-manual-details-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    margin-bottom: 6px;
                    border: 1px solid rgba(255, 255, 255, .32);
                    border-radius: 14px;
                    color: #fff;
                    background: linear-gradient(135deg, #2563eb, #06b6d4);
                    box-shadow: 0 8px 22px rgba(2, 132, 199, .35);
                    font-size: 21px;
                }
                .ptw-manual-details-title {
                    max-width: 720px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                    color: #fff;
                    font-size: clamp(1.15rem, 2.5vw, 1.55rem);
                    font-weight: 800;
                    line-height: 1.45;
                }
                .ptw-manual-details-meta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px 16px;
                    margin-top: 10px;
                    position: relative;
                    z-index: 1;
                    color: #dbeafe;
                    font-size: .82rem;
                }
                .ptw-manual-details-status {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 13px;
                    border-radius: 999px;
                    color: #fff;
                    background: ${e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"#10b981":e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"#dc2626":"#2563eb"};
                    font-size: .76rem;
                    font-weight: 700;
                    line-height: 1.2;
                }
                .ptw-manual-details-close {
                    position: absolute;
                    top: 28px;
                    left: 30px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    padding: 0;
                    z-index: 2;
                    border: 1px solid rgba(255, 255, 255, .55);
                    border-radius: 50%;
                    background: rgba(255, 255, 255, .12);
                    color: #fff;
                    backdrop-filter: blur(6px);
                    cursor: pointer;
                    transition: background-color .18s ease, color .18s ease, transform .18s ease;
                }
                .ptw-manual-details-close:hover { background: #fff; color: #0f3c6e; transform: rotate(6deg); }
                .ptw-manual-details-close:focus-visible { outline: 3px solid rgba(37, 87, 230, .3); outline-offset: 3px; }
                .ptw-manual-details-body {
                    max-height: calc(94vh - 186px);
                    overflow-y: auto;
                    padding: 26px 28px 24px;
                    background: linear-gradient(180deg, #f8fbff 0%, #fff 22%);
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                .ptw-manual-details-numbers {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 14px;
                    margin-bottom: 22px;
                }
                .ptw-manual-number-card {
                    min-height: 70px;
                    padding: 14px 16px;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid #bfdbfe;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, .10);
                }
                .ptw-manual-number-card:nth-child(2) {
                    border-color: #a5f3fc;
                    background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
                }
                .ptw-manual-number-card::before {
                    content: '';
                    position: absolute;
                    inset: 0 0 0 auto;
                    width: 5px;
                    background: linear-gradient(#2563eb, #38bdf8);
                }
                .ptw-manual-number-card:nth-child(2)::before {
                    background: linear-gradient(#0891b2, #22d3ee);
                }
                .ptw-manual-number-card span,
                .ptw-manual-detail-item dt {
                    display: block;
                    margin-bottom: 4px;
                    color: var(--ptw-details-muted);
                    font-size: .75rem;
                    font-weight: 500;
                }
                .ptw-manual-number-card strong {
                    display: block;
                    color: var(--ptw-details-blue);
                    font-family: Consolas, "Courier New", monospace;
                    font-size: 1.08rem;
                    font-weight: 800;
                    letter-spacing: .04em;
                }
                .ptw-manual-details-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    column-gap: 58px;
                    row-gap: 0;
                }
                .ptw-manual-details-column {
                    display: grid;
                    align-content: start;
                    gap: 8px;
                    margin: 0;
                    padding: 14px;
                    border: 1px solid #dbeafe;
                    border-radius: 16px;
                    background: linear-gradient(160deg, #ffffff, #f0f7ff);
                    box-shadow: 0 8px 22px rgba(15, 23, 42, .06);
                }
                .ptw-manual-details-column:nth-child(2) {
                    border-color: #ccfbf1;
                    background: linear-gradient(160deg, #ffffff, #f0fdfa);
                }
                .ptw-manual-detail-item {
                    min-width: 0;
                    margin: 0;
                    padding: 9px 11px 11px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, .84);
                }
                .ptw-manual-detail-item dd {
                    margin: 0;
                    color: var(--ptw-details-ink);
                    font-size: .96rem;
                    font-weight: 650;
                    line-height: 1.65;
                    overflow-wrap: anywhere;
                }
                .ptw-manual-details-wide {
                    grid-column: 1 / -1;
                    margin-top: 16px;
                    padding: 16px 18px;
                    border: 1px solid #fed7aa;
                    border-right: 5px solid #f97316;
                    background: linear-gradient(135deg, #fff7ed, #fffbeb);
                }
                .ptw-manual-details-supervisors {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 26px;
                    grid-column: 1 / -1;
                    margin-top: 12px;
                }
                .ptw-manual-details-supervisors .ptw-manual-detail-item {
                    border-color: #bbf7d0;
                    border-right: 5px solid #16a34a;
                    background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
                }
                .ptw-manual-details-actions {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 9px;
                    margin-top: 20px;
                    padding-top: 18px;
                    border-top: 1px dashed #cbd5e1;
                    background: linear-gradient(90deg, transparent, rgba(219, 234, 254, .65), transparent);
                }
                .ptw-manual-details-action {
                    min-height: 42px;
                    padding-inline: 16px !important;
                    border-radius: 10px !important;
                    box-shadow: 0 7px 16px rgba(15, 23, 42, .16);
                    font-weight: 700;
                }
                .ptw-manual-details-footer {
                    display: flex;
                    justify-content: center;
                    padding: 16px 20px;
                    border-top: 1px solid var(--ptw-details-line);
                    background: linear-gradient(180deg, #f8fafc, var(--ptw-details-footer));
                }
                .ptw-manual-details-footer .btn-secondary {
                    min-width: 120px;
                    min-height: 48px;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 6px rgba(15, 23, 42, .12);
                }
                @media (max-width: 700px) {
                    .ptw-manual-details-overlay { padding: 8px; align-items: flex-end; }
                    .ptw-manual-details-shell { max-height: 96vh; border-radius: 18px 18px 10px 10px; }
                    .ptw-manual-details-header { padding: 20px 58px 17px; }
                    .ptw-manual-details-close { top: 20px; left: 16px; width: 38px; height: 38px; }
                    .ptw-manual-details-body { max-height: calc(96vh - 174px); padding: 18px 16px; }
                    .ptw-manual-details-numbers,
                    .ptw-manual-details-grid,
                    .ptw-manual-details-supervisors { grid-template-columns: 1fr; gap: 8px; }
                    .ptw-manual-details-grid { column-gap: 0; }
                    .ptw-manual-details-supervisors { gap: 0; }
                    .ptw-manual-details-wide,
                    .ptw-manual-details-supervisors { grid-column: 1; }
                    .ptw-manual-details-action { flex: 1 1 130px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ptw-manual-details-close { transition: none; }
                }
            </style>
            <div class="modal-content ptw-manual-details-shell" role="dialog" aria-modal="true" aria-labelledby="ptw-manual-details-title">
                <header class="ptw-manual-details-header">
                    <button type="button" class="ptw-manual-details-close" onclick="this.closest('.modal-overlay').remove()" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="ptw-manual-details-icon"><i class="fas fa-file-alt" aria-hidden="true"></i></div>
                    <h2 id="ptw-manual-details-title" class="ptw-manual-details-title">
                        ${i("module.ptw.manual.detailsTitle","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A")} \u2014 ${i("module.ptw.manual.sequentialNumber","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644")} #${Utils.escapeHTML(s)} | ${i("module.ptw.manual.paperPermitNumber","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A")} #${Utils.escapeHTML(o)}
                    </h2>
                    <div class="ptw-manual-details-meta">
                        <span><i class="fas fa-calendar-alt ml-1" aria-hidden="true"></i>${e.openDate?Utils.formatDate(e.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}</span>
                        <span class="ptw-manual-details-status">${Utils.escapeHTML(e.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                </header>

                <div class="modal-body ptw-manual-details-body">
                    <!-- \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="ptw-manual-details-numbers">
                        <div class="ptw-manual-number-card">
                            <span>${i("module.ptw.manual.sequentialNumber","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644")}</span>
                            <strong>${Utils.escapeHTML(s)}</strong>
                        </div>
                        <div class="ptw-manual-number-card">
                            <span>${i("module.ptw.manual.paperPermitNumber","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A")}</span>
                            <strong>${Utils.escapeHTML(o)}</strong>
                        </div>
                    </div>
                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="ptw-manual-details-grid">
                        <dl class="ptw-manual-details-column">
                            <div class="ptw-manual-detail-item"><dt>\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</dt><dd>${Utils.escapeHTML(r)}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u0627\u0644\u0645\u0648\u0642\u0639</dt><dd>${Utils.escapeHTML(e.location||"-")}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</dt><dd>${Utils.escapeHTML(e.requestingParty||"-")}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</dt><dd>${Utils.escapeHTML(e.authorizedParty||"-")}</dd></div>
                        </dl>
                        <dl class="ptw-manual-details-column">
                            <div class="ptw-manual-detail-item"><dt>\u0627\u0644\u0648\u0642\u062A \u0645\u0646</dt><dd>${e.timeFrom&&e.timeFrom!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(e.timeFrom):"-"}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649</dt><dd>${e.timeTo&&e.timeTo!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(e.timeTo):"-"}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</dt><dd>${Utils.escapeHTML(e.totalTime||"-")}</dd></div>
                            <div class="ptw-manual-detail-item"><dt>\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</dt><dd>${Utils.escapeHTML(e.status||"-")}</dd></div>
                        </dl>
                        <dl class="ptw-manual-detail-item ptw-manual-details-wide">
                            <dt>\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</dt><dd class="whitespace-pre-wrap">${Utils.escapeHTML(e.workDescription||"-")}</dd>
                        </dl>
                        <div class="ptw-manual-details-supervisors">
                            <dl class="ptw-manual-detail-item"><dt>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</dt><dd>${Utils.escapeHTML(e.supervisor1||"-")}</dd></dl>
                            <dl class="ptw-manual-detail-item"><dt>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</dt><dd>${Utils.escapeHTML(e.supervisor2||"-")}</dd></dl>
                        </div>
                    </div>

                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="ptw-manual-details-actions">
                        <button type="button" class="btn-primary btn-sm ptw-manual-details-action" onclick="PTW.printPermit('${e.permitId||e.id}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button type="button" class="btn-success btn-sm ptw-manual-details-action" onclick="PTW.exportPDF('${e.permitId||e.id}')">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        ${a?`
                            <button type="button" class="btn-warning btn-sm ptw-manual-details-action" onclick="this.closest('.modal-overlay').remove(); PTW.openManualPermitForm('${e.id}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button type="button" class="btn-danger btn-sm ptw-manual-details-action" onclick="PTW.deleteManualPermitEntry('${e.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                    </div>
                </div>

                <footer class="modal-footer ptw-manual-details-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-1"></i> \u0625\u063A\u0644\u0627\u0642
                    </button>
                </footer>
            </div>
        `,document.body.appendChild(l),l.addEventListener("click",n=>{n.target===l&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&l.remove()})},printPermitForm(){if(!document.getElementById("ptw-form")){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{const e=this.collectFormDataForPrint(),a=this.currentEditId||e.id||"NEW",r=`PTW-${a.substring(0,8)}`,i=this.generatePrintContent(e),s=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(r,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${a.substring(0,8)}`,i,!1,!1,{version:"1.0",releaseDate:e.createdAt||new Date().toISOString(),revisionDate:e.updatedAt||new Date().toISOString(),compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":a.substring(0,8)},e.createdAt||new Date().toISOString(),e.updatedAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u0637\u0628\u0627\u0639\u0629 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</title></head><body>${i}</body></html>`,o=new Blob([s],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),n=window.open(l,"_blank");n?n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(l)},800)},500)}:Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",e),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+e.message)}},collectFormDataForPrint(){if(!document.getElementById("ptw-form"))return{};const e=document.getElementById("ptw-location"),a=document.getElementById("ptw-sublocation"),r=e?.options[e?.selectedIndex]?.text||"",i=a?.options[a?.selectedIndex]?.text||"",s=c=>{const m=[];return document.querySelectorAll(`input[name="${c}-option"]`).forEach(u=>{if(u.checked)if(u.value==="other"){const h=document.getElementById(`${c}-other-text`)?.value.trim();h&&m.push(h)}else{const h=u.getAttribute("data-label")||u.value;m.push(h)}}),m},o=[];document.querySelectorAll("#approvals-tbody tr").forEach((c,m)=>{const h=document.getElementById(`approval-role-${m}`)?.value.trim()||"",f=document.getElementById(`approval-approver-select-${m}`),x=document.getElementById(`approval-approver-${m}`),b=f?f.options[f.selectedIndex]?.text||"":x?.value.trim()||"",y=document.getElementById(`approval-status-${m}`)?.value||"pending",z=document.getElementById(`approval-date-${m}`)?.value||"",_=document.getElementById(`approval-comments-${m}`)?.value.trim()||"";h&&o.push({role:h,approver:b,status:y,date:z,comments:_})});const n=typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],p={};if(typeof RiskMatrix<"u"){const c=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');c&&(p.likelihood=c.getAttribute("data-likelihood")||c.getAttribute("data-probability")||"",p.consequence=c.getAttribute("data-consequence")||c.getAttribute("data-severity")||"",p.riskLevel=c.textContent.trim()||"")}const d=document.getElementById("ptw-risk-notes")?.value.trim()||"";return{id:this.currentEditId||"NEW",location:r,sublocation:i,workDescription:document.getElementById("ptw-workDescription")?.value||"",startDate:document.getElementById("ptw-startDate")?.value||"",endDate:document.getElementById("ptw-endDate")?.value||"",requestingParty:(()=>{const c=document.getElementById("ptw-requestingParty-select"),m=document.getElementById("ptw-requestingParty");return c&&c.value&&c.value!=="__custom__"?c.value.trim():m?m.value.trim():""})(),authorizedParty:(()=>{const c=document.getElementById("ptw-authorizedParty-select"),m=document.getElementById("ptw-authorizedParty");return c&&c.value&&c.value!=="__custom__"?c.value.trim():m?m.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value||"",teamMembers:Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-name")).map(c=>({name:c.value.trim()})).filter(c=>c.name),hotWorkDetails:s("ptw-hot"),hotWorkOther:document.getElementById("ptw-hot-other-text")?.value.trim()||"",confinedSpaceDetails:s("ptw-confined"),confinedSpaceOther:document.getElementById("ptw-confined-other-text")?.value.trim()||"",heightWorkDetails:s("ptw-height"),heightWorkOther:document.getElementById("ptw-height-other-text")?.value.trim()||"",electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,requiredPPE:n,riskAssessment:p,riskNotes:d,permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||"",approvals:o,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:document.getElementById("ptw-closure-time")?.value||"",closureReason:document.getElementById("ptw-closure-reason")?.value||"",closureApprovals:(()=>{const c=[],m=document.getElementById("closure-approvals-tbody");return m&&m.querySelectorAll("tr[data-closure-approval-index]").forEach((h,f)=>{const x=document.getElementById(`closure-approval-role-${f}`),b=document.getElementById(`closure-approval-approver-select-${f}`),k=document.getElementById(`closure-approval-approver-${f}`),y=document.getElementById(`closure-approval-approver-manual-${f}`),C=document.getElementById(`closure-approval-status-${f}`),z=document.getElementById(`closure-approval-date-${f}`),I=document.getElementById(`closure-approval-comments-${f}`);let _=b?.value||"",D=k?.value||"";b&&(_==="__manual__"?(_="",D=y?.value?.trim()||""):_?D=b.options[b.selectedIndex]?.text?.replace(/\s*\((?:مقاول|موظف)\)\s*(\s*-\s*.*)?$/,"").trim()||D:D=""),c.push({role:x?.value||"",approverId:_,approver:D,status:C?.value||"pending",date:z?.value||"",comments:I?.value||"",required:h.getAttribute("data-required")!=="false"})}),c})(),closureApprovalCircuitOwnerId:document.getElementById("closure-approval-circuit-owner-id")?.value||"__default__",closureApprovalCircuitName:this.formClosureCircuitName||"",closureApproval:{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},generatePrintContent(t){const e=m=>m?String(m).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):"",a=m=>{if(!m)return"-";try{const u=this.parseDateTimeValue(m);return!u||isNaN(u.getTime())?m||"-":u.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"})}catch{return m}},r=m=>{if(!m)return"-";try{const u=this.parseDateTimeValue(m);return!u||isNaN(u.getTime())?m||"-":u.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return m}},i=t.teamMembers&&t.teamMembers.length>0?t.teamMembers.map(m=>e(m.name)).join("\u060C "):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let s=t.hotWorkDetails&&t.hotWorkDetails.length>0?t.hotWorkDetails.map(m=>e(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";t.hotWorkOther&&(s=(s!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?s+"\u060C ":"")+e(t.hotWorkOther));let o=t.confinedSpaceDetails&&t.confinedSpaceDetails.length>0?t.confinedSpaceDetails.map(m=>e(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";t.confinedSpaceOther&&(o=(o!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?o+"\u060C ":"")+e(t.confinedSpaceOther));let l=t.heightWorkDetails&&t.heightWorkDetails.length>0?t.heightWorkDetails.map(m=>e(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";t.heightWorkOther&&(l=(l!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?l+"\u060C ":"")+e(t.heightWorkOther));const n=[];t.preStartChecklist&&n.push("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"),t.lotoApplied&&n.push("\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"),t.governmentPermits&&n.push("\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"),t.riskAssessmentAttached&&n.push("\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"),t.gasTesting&&n.push("\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"),t.mocRequest&&n.push("\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)");const p=n.length>0?n.join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",d=t.requiredPPE&&t.requiredPPE.length>0?t.requiredPPE.map(m=>e(m)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",c=t.approvals&&t.approvals.length>0?`
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
                    ${t.approvals.map(m=>`
                        <tr>
                            <td>${e(m.role)}</td>
                            <td>${e(m.approver)}</td>
                            <td>${m.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":m.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"}</td>
                            <td>${m.date?r(m.date):"-"}</td>
                            <td>${e(m.comments)}</td>
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
            
            ${t.permitDisclaimer?`
            <div class="print-disclaimer">
                ${e(t.permitDisclaimer).replace(/\n/g,"<br>")}
            </div>
            `:""}
            
            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</div>
                        <div class="print-field-value">${e(t.location)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</div>
                        <div class="print-field-value">${e(t.sublocation)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</div>
                        <div class="print-field-value">${r(t.startDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</div>
                        <div class="print-field-value">${r(t.endDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${e(t.authorizedParty)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</div>
                        <div class="print-field-value">${e(t.requestingParty)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="print-field-value">${e(t.equipment)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</div>
                        <div class="print-field-value">${e(t.tools)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${e(t.workDescription)||"-"}</div>
                    </div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                <div class="print-field">
                    <div class="print-field-value">${i}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B : \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629</div>
                        <div class="print-field-value">${s}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</div>
                        <div class="print-field-value">${o}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</div>
                        <div class="print-field-value">${l}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</div>
                        <div class="print-field-value">${e(t.electricalWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</div>
                        <div class="print-field-value">${e(t.coldWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</div>
                        <div class="print-field-value">${e(t.otherWorkType)||"-"}</div>
                    </div>
                    ${t.excavationLength||t.excavationWidth||t.excavationDepth||t.soilType?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label" style="font-weight: bold; margin-bottom: 8px;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0637\u0648\u0644 (\u0645)</div>
                                <div class="print-field-value">${e(t.excavationLength)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0631\u0636 (\u0645)</div>
                                <div class="print-field-value">${e(t.excavationWidth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0645\u0642 (\u0645)</div>
                                <div class="print-field-value">${e(t.excavationDepth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</div>
                                <div class="print-field-value">${e(t.soilType)||"-"}</div>
                            </div>
                        </div>
                    </div>
                    `:""}
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</div>
                <div class="print-field">
                    <div class="print-field-value">${p}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                <div class="print-field">
                    <div class="print-field-value">${d}</div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633 : \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                ${t.riskAssessment&&(t.riskAssessment.likelihood||t.riskAssessment.consequence)?`
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u062D\u062F\u0648\u062B</div>
                        <div class="print-field-value">${e(t.riskAssessment.likelihood)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0634\u062F\u0629 \u0627\u0644\u0639\u0648\u0627\u0642\u0628</div>
                        <div class="print-field-value">${e(t.riskAssessment.consequence)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                        <div class="print-field-value">${e(t.riskAssessment.riskLevel)||"-"}</div>
                    </div>
                </div>
                `:'<div class="print-field"><div class="print-field-value">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div></div>'}
                ${t.riskNotes?`
                <div class="print-field print-full-width" style="margin-top: 12px;">
                    <div class="print-field-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                    <div class="print-field-value">${e(t.riskNotes)}</div>
                </div>
                `:""}
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A</div>
                ${c}
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
                            ${t.closureStatus==="completed"?"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":t.closureStatus==="notCompleted"?"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":t.closureStatus==="forced"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"}
                        </div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0633\u0627\u0639\u0629</div>
                        <div class="print-field-value">${t.closureTime?r(t.closureTime):"-"}</div>
                    </div>
                    ${t.closureReason?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0633\u0628\u0628</div>
                        <div class="print-field-value">${e(t.closureReason)}</div>
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
                            <td>${e(t.closureApproval?.name4||"")}</td>
                            <td>${e(t.closureApproval?.name3||"")}</td>
                            <td>${e(t.closureApproval?.name2||"")}</td>
                            <td>${e(t.closureApproval?.name1||"")}</td>
                        </tr>
                        <tr>
                            <td>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            <td>${e(t.closureApproval?.signature4||"")}</td>
                            <td>${e(t.closureApproval?.signature3||"")}</td>
                            <td>${e(t.closureApproval?.signature2||"")}</td>
                            <td>${e(t.closureApproval?.signature1||"")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `},formDataFromRegistryEntry(t){if(!t)return null;const e=n=>n===!0||n==="true"||n===1||n==="1",a=n=>n?n==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"completed":n==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"forced":n==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"notCompleted":"":"";let r=[];Array.isArray(t.manualApprovals)&&t.manualApprovals.length&&(r=t.manualApprovals.map(n=>({role:n.role||"",approver:n.name||n.approver||"",status:"approved",date:n.date||"",comments:[n.notes,n.signature?`\u062A\u0648\u0642\u064A\u0639: ${n.signature}`:""].filter(Boolean).join(" \u2014 ")})));const i={name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""};if(Array.isArray(t.manualClosureApprovals)&&t.manualClosureApprovals.length){const n=t.manualClosureApprovals;n[0]&&(i.name4=n[0].name||"",i.signature4=n[0].signature||""),n[1]&&(i.name3=n[1].name||"",i.signature3=n[1].signature||""),n[2]&&(i.name2=n[2].name||"",i.signature2=n[2].signature||""),n[3]&&(i.name1=n[3].name||"",i.signature1=n[3].signature||"")}const s=Array.isArray(t.requiredPPE)&&t.requiredPPE.length?t.requiredPPE:t.ppeNotes?String(t.ppeNotes).split(/[،,]/).map(n=>n.trim()).filter(Boolean):[],l=t.riskLikelihood||t.riskConsequence||t.riskLevel||t.riskScore?{likelihood:t.riskLikelihood||"",consequence:t.riskConsequence||"",riskLevel:t.riskLevel||t.riskScore||""}:{};return{id:t.permitId||t.id,location:t.location||"",sublocation:t.sublocation||"",workDescription:t.workDescription||"",startDate:t.timeFrom||t.openDate||"",endDate:t.timeTo||"",requestingParty:t.requestingParty||"",authorizedParty:t.authorizedParty||"",equipment:t.equipment||"",tools:t.tools||t.toolsList||"",teamMembers:Array.isArray(t.teamMembers)?t.teamMembers:[],hotWorkDetails:Array.isArray(t.hotWorkDetails)?t.hotWorkDetails:[],hotWorkOther:t.hotWorkOther||"",confinedSpaceDetails:Array.isArray(t.confinedSpaceDetails)?t.confinedSpaceDetails:[],confinedSpaceOther:t.confinedSpaceOther||"",heightWorkDetails:Array.isArray(t.heightWorkDetails)?t.heightWorkDetails:[],heightWorkOther:t.heightWorkOther||"",electricalWorkType:t.electricalWorkType||"",coldWorkType:t.coldWorkType||"",otherWorkType:t.otherWorkType||"",excavationLength:t.excavationLength||"",excavationWidth:t.excavationWidth||"",excavationDepth:t.excavationDepth||"",soilType:t.soilType||"",preStartChecklist:e(t.preStartChecklist),lotoApplied:e(t.lotoApplied),governmentPermits:e(t.governmentPermits),riskAssessmentAttached:e(t.riskAssessmentAttached),gasTesting:e(t.gasTesting),mocRequest:e(t.mocRequest),requiredPPE:s,riskAssessment:l,riskNotes:t.riskNotes||"",approvals:r,closureStatus:t.closureStatus||a(t.status),closureTime:t.closureDate||t.closureTime||"",closureReason:t.closureReason||"",closureApproval:i,permitDisclaimer:t.permitDisclaimer||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString()}},getPermitFormDataForPrint(t){if(!t)return null;if(Array.isArray(this.registryData)){const e=this.registryData.find(a=>a.permitId===t.id&&a.isManualEntry===!0);if(e)return this.formDataFromRegistryEntry(e)}return{id:t.id,location:t.siteName||t.location||"",sublocation:t.sublocationName||t.sublocation||"",workDescription:t.workDescription||"",startDate:t.startDate||"",endDate:t.endDate||"",requestingParty:t.requestingParty||"",authorizedParty:t.authorizedParty||"",equipment:t.equipment||"",tools:t.tools||t.toolsList||"",teamMembers:Array.isArray(t.teamMembers)?t.teamMembers:[],hotWorkDetails:Array.isArray(t.hotWorkDetails)?t.hotWorkDetails:[],hotWorkOther:t.hotWorkOther||"",confinedSpaceDetails:Array.isArray(t.confinedSpaceDetails)?t.confinedSpaceDetails:[],confinedSpaceOther:t.confinedSpaceOther||"",heightWorkDetails:Array.isArray(t.heightWorkDetails)?t.heightWorkDetails:[],heightWorkOther:t.heightWorkOther||"",electricalWorkType:t.electricalWorkType||"",coldWorkType:t.coldWorkType||"",otherWorkType:t.otherWorkType||"",excavationLength:t.excavationLength||"",excavationWidth:t.excavationWidth||"",excavationDepth:t.excavationDepth||"",soilType:t.soilType||"",preStartChecklist:t.preStartChecklist||!1,lotoApplied:t.lotoApplied||!1,governmentPermits:t.governmentPermits||!1,riskAssessmentAttached:t.riskAssessmentAttached||!1,gasTesting:t.gasTesting||!1,mocRequest:t.mocRequest||!1,requiredPPE:Array.isArray(t.requiredPPE)?t.requiredPPE:[],riskAssessment:t.riskAssessment||{},riskNotes:t.riskNotes||"",approvals:Array.isArray(t.approvals)?t.approvals.map(e=>({role:e.role||"",approver:typeof e.approver=="object"&&e.approver?e.approver.name||e.approver.email||e.approver.id||"":e.approver||"",status:e.status||"pending",date:e.date||"",comments:e.comments||""})):[],closureStatus:t.closureStatus||"",closureTime:t.closureTime||"",closureReason:t.closureReason||"",closureApproval:t.closureApproval||{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},permitDisclaimer:t.permitDisclaimer||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString()}},_normManualRoleKey(t){return String(t||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/ؤ/g,"\u0648").replace(/ئ/g,"\u064A").replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644").replace(/\s*\/\s*/g," / ").replace(/\s+/g," ")},parseManualApprovalsFromText(t){const e=String(t||"").trim();return e?e.split(/\s*\|\s*/).map(a=>{const r=String(a||"").trim();if(!r)return null;const i=r.match(/^(.+?):\s*(.+?)\s+توقيع:\s*(.*)$/);if(i){const o=String(i[2]||"").trim();return{role:String(i[1]||"").trim(),name:o==="\u2014"||o==="-"?"":o,signature:String(i[3]||"").trim()}}const s=r.match(/^(.+?):\s*(.*)$/);if(s){const o=String(s[2]||"").trim();return{role:String(s[1]||"").trim(),name:o==="\u2014"||o==="-"?"":o,signature:""}}return null}).filter(Boolean):[]},resolveManualApprovalsList(t,e){if(Array.isArray(t)&&t.length)return t.map(a=>({role:a.role||"",name:a.name||a.approver||"",signature:a.signature||""}));if(typeof t=="string"&&t.trim()){const a=t.trim();if(a.startsWith("["))try{const r=JSON.parse(a);if(Array.isArray(r)&&r.length)return r.map(i=>({role:i.role||"",name:i.name||i.approver||"",signature:i.signature||""}))}catch{}}return this.parseManualApprovalsFromText(e)},normalizeManualPermitEntryForPrint(t){if(!t)return null;const e={...t};if((!e.teamMembers||!e.teamMembers.length)&&e.teamMembersText){const n=String(e.teamMembersText).trim();e.teamMembers=n.split(/[،,]/).map(p=>{p=p.trim();const d=p.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return d?{name:d[1].trim(),signature:d[2].trim()}:{name:p,signature:""}}).filter(p=>p.name||p.signature)}(!Array.isArray(e.teamMembers)||!e.teamMembers.length)&&(e.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(n=>{e[n]!=null&&typeof e[n]=="string"&&(e[n]=e[n].split(/[،,]/).map(p=>p.trim()).filter(Boolean)),Array.isArray(e[n])||(e[n]=[])}),e.manualApprovals=this.resolveManualApprovalsList(e.manualApprovals,e.manualApprovalsText),e.manualClosureApprovals=this.resolveManualApprovalsList(e.manualClosureApprovals,e.manualClosureApprovalsText);const a=[];Array.isArray(e.requiredPPE)?a.push(...e.requiredPPE):typeof e.requiredPPE=="string"&&e.requiredPPE.trim()&&a.push(...e.requiredPPE.split(/[،,]/).map(n=>n.trim()).filter(Boolean)),e.ppeNotes&&a.push(...String(e.ppeNotes).split(/[،,]/).map(n=>n.trim()).filter(Boolean)),e._ppeSelected=[...new Set(a.map(n=>String(n).trim()).filter(Boolean))];const r=["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629","\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633","\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],i=n=>String(n||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),s=new Set(r.map(i));e._ppeExtraNotes=e._ppeSelected.filter(n=>!s.has(i(n)));const o=[];e.equipment&&o.push(...this._splitEquipmentTokens(e.equipment)),e._equipmentSelected=[...new Set(o.map(n=>String(n).trim()).filter(Boolean))];const l=new Set(this.getManualFixedEquipmentLabels().map(n=>this._normEquipmentItemKey(n)));return e._equipmentExtraNotes=e._equipmentSelected.filter(n=>!l.has(this._normEquipmentItemKey(n))),e},_findManualApprovalByRoles(t,e){const a=this.resolveManualApprovalsList(t,"");if(!a.length)return{name:"",signature:""};const r=i=>this._normManualRoleKey(i);for(const i of e){const s=r(i),o=a.find(l=>r(l.role)===s);if(o)return{name:o.name||o.approver||"",signature:o.signature||""}}return{name:"",signature:""}},buildManualFixedPPEPrintHtml(t=[]){const e=l=>Utils.escapeHTML(l),a=new Set((t||[]).map(l=>String(l||"").trim()).filter(Boolean)),r=l=>String(l||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),i=l=>{const n=String(l).trim();if(a.has(n))return!0;const p=r(n);for(const d of a)if(r(d)===p)return!0;return!1},s=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let o='<div class="ptw-manual-ppe-print-matrix"><div class="ptw-manual-ppe-fixed-wrap">';return s.forEach((l,n)=>{const p=n===s.length-1?"ptw-manual-ppe-fixed-row ppe-row-last":"ptw-manual-ppe-fixed-row";o+=`<div class="${p}">`,l.forEach(d=>{const c=i(d);o+=`<span class="ptw-manual-ppe-cell${c?" ppe-selected":""}"><span class="ppe-checkbox${c?" checked":""}" aria-hidden="true"></span><span class="ppe-label">${e(d)}</span></span>`}),o+="</div>"}),o+="</div></div>",o},PERMIT_A4_WIDTH_PX:794,PERMIT_A4_HEIGHT_PX:1123,PERMIT_A4_MARGIN_MM:3,PERMIT_A4_MAX_PAGES:6,PERMIT_A4_CAPTURE_SCALE:1.35,getManualPermitPdfExportTechnicalStyles_(){const t=this.PERMIT_A4_WIDTH_PX;return`
            html, body {
                width: ${t}px !important;
                max-width: ${t}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .ptw-manual-print, #ptw-permit-print-root {
                width: ${t}px !important;
                max-width: ${t}px !important;
                margin: 0 auto !important;
                transform: none !important;
                zoom: 1 !important;
            }
            .ptw-a4-page {
                transform: none !important;
                zoom: 1 !important;
            }
        `},getManualPermitPrintStyles(t=!1){return`
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
            ${t?`
            @page { size: A4 portrait; margin: 0; }
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
                padding: 0 !important;
            }
            .ptw-a4-page {
                width: 210mm !important;
                max-width: 210mm !important;
                height: 297mm !important;
                min-height: 297mm !important;
                max-height: 297mm !important;
                box-sizing: border-box;
                padding: 9px 15px 60px 15px !important;
                background: #fff;
                overflow: hidden;
                position: relative !important;
                page-break-after: always;
                break-after: page;
                page-break-inside: avoid !important;
                break-inside: avoid-page !important;
                display: flex;
                flex-direction: column;
            }
            .ptw-a4-page:last-child { page-break-after: auto; break-after: auto; }
            .ptw-a4-page-sections {
                flex: 1 1 auto;
                min-height: 0;
                display: flex;
                flex-direction: column;
                gap: 4px;
                overflow: hidden;
            }
            .ptw-a4-page-sections .ptw-manual-form-section {
                min-height: 0;
                margin: 0 !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
                page-break-inside: auto !important;
                break-inside: auto !important;
            }
            .ptw-a4-page-sections-1 .manual-section-1 { flex: 2.35 1 0; }
            .ptw-a4-page-sections-1 .manual-section-2 { flex: .82 1 0; }
            .ptw-a4-page-sections-1 .manual-section-3 { flex: 1.18 1 0; }
            .ptw-a4-page-sections-1 .manual-section-4 { flex: .92 1 0; }
            .ptw-a4-page-sections-1 .manual-section-5 { flex: 1.12 1 0; }
            .ptw-a4-page-sections-2 .manual-section-6 { flex: 2.05 1 0; }
            .ptw-a4-page-sections-2 .manual-section-7 { flex: 1.18 1 0; }
            .ptw-a4-page-sections-2 .manual-section-8 { flex: 1.06 1 0; }
            .ptw-a4-page-sections-2 .manual-section-9 { flex: 1.12 1 0; }
            .ptw-a4-page-sections-2 .manual-section-10 { flex: .72 1 0; }
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
                bottom: 9px !important;
                left: 15px !important;
                right: 15px !important;
                margin-top: 0 !important;
                border-top: 1px dashed #cbd5e1;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .ptw-a4-page.ptw-page-tight { font-size: 9.2px !important; line-height: 1.18 !important; }
            .ptw-a4-page.ptw-page-tight .ptw-a4-page-sections { gap: 2px; }
            .ptw-a4-page.ptw-page-tight .ptw-manual-form-section { padding: 4px 6px !important; }
            .ptw-a4-page.ptw-page-tight .ptw-manual-form-section h3 { font-size: 9.5px; margin-bottom: 3px !important; padding-bottom: 2px !important; }
            .ptw-a4-page.ptw-page-tight .manual-print-field,
            .ptw-a4-page.ptw-page-tight .manual-work-block { padding: 2px 3px; }
            .ptw-a4-page.ptw-page-tight .ptw-paper-grid-table th,
            .ptw-a4-page.ptw-page-tight .ptw-paper-grid-table td { padding: 2px 3px; }
            .ptw-a4-page.ptw-page-ultra-tight { font-size: 8.4px !important; line-height: 1.12 !important; }
            .ptw-a4-page.ptw-page-ultra-tight .ptw-manual-form-section { padding: 3px 5px !important; }
            .ptw-a4-page.ptw-page-ultra-tight .manual-print-field .val,
            .ptw-a4-page.ptw-page-ultra-tight .manual-print-supervisor-card .val { font-size: 8px; }
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
        `},getPermitA4ExportOverrides_(){const t=this.PERMIT_A4_WIDTH_PX;return`
            @page { size: A4 portrait; margin: 5mm; }
            html, body {
                width: ${t}px !important;
                max-width: ${t}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
            }
            body > * { max-width: ${t}px !important; box-sizing: border-box; }
            #ptw-permit-print-root { width: ${t}px !important; max-width: ${t}px !important; margin: 0 !important; }
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
        `},_wrapPermitHtmlForA4Export(t){if(!t)return t;const e=`<style id="ptw-a4-export-overrides">${this.getPermitA4ExportOverrides_()}</style>`;return t.includes("</head>")?t.replace("</head>",`${e}</head>`):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">${e}</head><body><div id="ptw-permit-print-root">${t}</div></body></html>`},_formatManualPermitDateTime(t){if(!t||t==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return"\u2014";try{const e=this.parseDateTimeValue(t);return!e||isNaN(e.getTime())?String(t):e.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return String(t)}},generateManualPermitPrintContent(t){const e=this.normalizeManualPermitEntryForPrint(t);if(!e)return"";const a=S=>Utils.escapeHTML(S==null?"":String(S)),r=(S,P,A=!1)=>`
            <div class="manual-print-field${A?" full":""}">
                <div class="lbl">${a(S)}</div>
                <div class="val">${P?a(P):"\u2014"}</div>
            </div>`,i=String(e.sequentialNumber||this.getPermitDisplayNumber(e)).padStart(4,"0"),s=String(e.paperPermitNumber||"").trim()||"\u2014",o=(e.teamMembers||[]).map(S=>`
            <tr>
                <td>${a(S.name)||"\u2014"}</td>
                <td style="border-right: 3px solid #1e3a8a;">${a(S.signature||S.id)||"\u2014"}</td>
            </tr>`).join(""),l=[{key:"preStartChecklist",label:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"},{key:"lotoApplied",label:"\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"},{key:"governmentPermits",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"},{key:"riskAssessmentAttached",label:"\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"gasTesting",label:"\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"},{key:"mocRequest",label:"\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)"}],n=S=>S===!0||S==="true"||S===1||S==="1",p=l.map(S=>{const P=n(e[S.key]);return`<div class="manual-print-req-item${P?" on":""}">${P?"\u2611":"\u2610"} ${a(S.label)}</div>`}).join(""),d=[],c=(S,P,A)=>{const U=Array.isArray(P)?P.filter(Boolean):[],j=A?String(A).trim():"";!U.length&&!j||d.push(`<div class="manual-work-block"><h4>${a(S)}</h4><div>${a([...U,j].filter(Boolean).join("\u060C ")||"\u2014")}</div></div>`)};c("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",e.hotWorkDetails,e.hotWorkOther),c("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",e.confinedSpaceDetails,e.confinedSpaceOther),c("\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",e.heightWorkDetails,e.heightWorkOther),(e.excavationLength||e.excavationWidth||e.excavationDepth||e.soilType)&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</h4>
                <div>\u0627\u0644\u0637\u0648\u0644: ${a(e.excavationLength)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0631\u0636: ${a(e.excavationWidth)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0645\u0642: ${a(e.excavationDepth)||"\u2014"} \u0645 | \u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629: ${a(e.soilType)||"\u2014"}</div></div>`),e.electricalWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621</h4><div>${a(e.electricalWorkType)}</div></div>`),e.coldWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</h4><div>${a(e.coldWorkType)}</div></div>`),e.otherWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</h4><div>${a(e.otherWorkType)}</div></div>`);const m=this.getPermitTypeDisplay(e),u=`
            <div class="manual-work-block" style="border-color:#93c5fd;background:#eff6ff;"><h4>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629</h4><div>${a(m)}</div></div>
            ${d.length?d.join(""):'<div class="manual-print-field full"><div class="val">\u2014</div></div>'}`,h={5:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F",4:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B",3:"\u0645\u062D\u062A\u0645\u0644",2:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644",1:"\u0646\u0627\u062F\u0631"},f=parseInt(e.riskLikelihood,10),x=parseInt(e.riskConsequence,10),b=[5,4,3,2,1].map(S=>{const P=[1,2,3,4,5].map(A=>{const U=S*A;let j="#22c55e",X="#fff";return U<=4?(j="#22c55e",X="#fff"):U<=9?(j="#eab308",X="#1c1917"):U<=16?(j="#f97316",X="#fff"):(j="#dc2626",X="#fff"),`<td class="risk-cell${f===S&&x===A?" risk-selected":""}" style="background:${j};color:${X};">${U}</td>`}).join("");return`<tr><td class="row-label">${S} - ${h[S]}</td>${P}</tr>`}).join(""),k=e.riskScore?e.riskScore<=4?"#22c55e":e.riskScore<=9?"#eab308":e.riskScore<=16?"#f97316":"#dc2626":"#94a3b8",y=e.riskScore>4&&e.riskScore<=9?"#1c1917":"#fff",z=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(S=>this._findManualApprovalByRoles(e.manualApprovals,[S,S.replace(/ئ/g,"\u0624"),S.replace(/ؤ/g,"\u0626"),S.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),S.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),_=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(S=>this._findManualApprovalByRoles(e.manualClosureApprovals,[S,S.replace(/ئ/g,"\u0624"),S.replace(/ؤ/g,"\u0626"),S.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),S.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),D=S=>{const P=String(S||"").trim();return P?a(P):"\u2014"},R=e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"manual-status-completed":e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"manual-status-forced":e.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"manual-status-incomplete":"",F=e.sublocation||(Array.isArray(e.locationEntries)&&e.locationEntries.length?e.locationEntries.map(S=>S.sublocation).filter(Boolean).join(" | "):"");return`
            <div class="manual-print-disclaimer-wrap">
                <div class="manual-print-disclaimer-text">
                    \u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647<br>
                    \u0648\u0644\u0627 \u064A\u062C\u0648\u0632 \u0628\u0623\u064A \u062D\u0627\u0644 \u0645\u0646 \u0627\u0644\u0623\u062D\u0648\u0627\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0644\u0623\u064A \u0639\u0645\u0644 \u0622\u062E\u0631 \u0644\u0645 \u064A\u062A\u0645 \u0648\u0635\u0641\u0647<br>
                    \u0648\u0639\u0644\u064A\u0647 \u0641\u0625\u0646\u0647 \u064A\u062C\u0628 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0645\u062F\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0648\u0641\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0644\u0639\u0645\u0644 \u0641\u064A\u0647 \u0641\u0642\u0637.
                </div>
                <div class="manual-print-permit-no">
                    <div class="manual-print-seq-badge">
                        <span class="lbl">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D / Permit No.</span>
                        <span class="val">${a(i)}</span>
                    </div>
                    <div class="manual-print-paper-no">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A: <strong>${a(s)}</strong></div>
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-1">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
                <div class="manual-print-grid">
                    ${r("\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",e.location)}
                    ${r("\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A",F)}
                    ${r("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",this._formatManualPermitDateTime(e.timeFrom))}
                    ${r("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",this._formatManualPermitDateTime(e.timeTo))}
                    ${r("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",e.authorizedParty)}
                    ${r("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",e.requestingParty)}
                    <div class="manual-print-field full">
                        <div class="lbl">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="val">
                            ${(()=>{const S=this.buildKnownEquipmentHistoryLabels(e.id||e.permitId||null),P=this.parseEquipmentToSelection(e.equipment,S);return`${this.buildManualFixedEquipmentPrintHtml(P.matrixSelected||[])}${P.manualNotes?`
                            <div class="ptw-manual-equipment-notes-print">
                                <div class="lbl">\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A</div>
                                <div class="val">${a(P.manualNotes)}</div>
                            </div>`:""}`})()}
                        </div>
                    </div>
                    ${r("\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)",e.tools||e.toolsList,!0)}
                    ${r("\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",e.workDescription,!0)}
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
                    <tbody>${o}</tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-3">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0644\u062B : \u062A\u062D\u062F\u064A\u062F \u0646\u0648\u0639 / \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h3>
                ${u}
            </div>

            <div class="ptw-manual-form-section manual-section-4">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                <div class="manual-print-req-grid">${p}</div>
            </div>

            <div class="ptw-manual-form-section manual-section-5">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 / \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</h3>
                <div class="ptw-manual-ppe-body">
                    ${this.buildManualFixedPPEPrintHtml(e._ppeSelected)}
                    ${e._ppeExtraNotes&&e._ppeExtraNotes.length?`
                    <div class="ptw-manual-ppe-notes-print">
                        <div class="lbl">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A)</div>
                        <div class="val">${a(e._ppeExtraNotes.join("\u060C "))}</div>
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
                    <tbody>${b}</tbody>
                </table>
                ${e.riskScore?`
                <div class="manual-risk-summary">
                    <div class="manual-risk-badge" style="background:${k};color:${y};">${a(e.riskScore)}</div>
                    <div>
                        <div><strong>\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${a(e.riskScore)}</div>
                        <div><strong>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${a(e.riskLevel||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629:</strong> ${a(e.riskLikelihood||"\u2014")} | <strong>\u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong> ${a(e.riskConsequence||"\u2014")}</div>
                    </div>
                </div>`:""}
                ${e.riskNotes?`<div class="manual-print-field full" style="margin-top:8px;"><div class="lbl">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div><div class="val">${a(e.riskNotes)}</div></div>`:""}
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
                            ${z.map(S=>`<td class="approval-name-cell">${D(S.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${z.map(S=>`<td class="approval-sig-cell">${D(S.signature)}</td>`).join("")}
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
                        <div class="val"><span class="manual-status-pill ${R}">${a(e.status||"\u2014")}</span></div>
                    </div>
                    ${r("\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642",this._formatManualPermitDateTime(e.closureDate||e.closureTime))}
                    ${r("\u0627\u0644\u0633\u0628\u0628",e.closureReason,!0)}
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
                            ${_.map(S=>`<td class="approval-name-cell">${D(S.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${_.map(S=>`<td class="approval-sig-cell">${D(S.signature)}</td>`).join("")}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-10">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0634\u0631 : \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</h3>
                <div class="manual-print-supervisors-grid">
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644</div>
                        <div class="val">${D(e.supervisor1)}</div>
                    </div>
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</div>
                        <div class="val">${D(e.supervisor2)}</div>
                    </div>
                </div>
            </div>
        `},_splitManualPermitPrintPages_(t,e,a,r){if(!r)return`${e}${t}${a}`;const i=(c,m)=>`<div class="ptw-a4-page ptw-a4-page-${m}">${c}${a}</div>`,o=t.indexOf('<div class="ptw-manual-form-section manual-section-6">');if(o<=0)return i(`${e}<div class="ptw-a4-page-sections ptw-a4-page-sections-1">${t}</div>`,1);const l=`<div class="ptw-a4-page-sections ptw-a4-page-sections-1">${t.slice(0,o)}</div>`,n=`<div class="ptw-a4-page-sections ptw-a4-page-sections-2">${t.slice(o)}</div>`,p=i(`${e}${l}`,1),d=i(n,2);return`${p}${d}`},_verifyManualPermitExportHtml_(t){const a=[{key:"header-title",label:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:r=>r.includes("\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")&&r.includes("Permit To Work")},{key:"header-company",label:"\u0647\u064A\u062F\u0631 \u0627\u0644\u0634\u0631\u0643\u0629",test:r=>r.includes("ptw-paper-header")},{key:"footer",label:"\u0641\u0648\u062A\u0631 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:r=>r.includes("ptw-paper-footer")&&r.includes("\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C")},{key:"disclaimer",label:"\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629",test:r=>r.includes("manual-print-disclaimer-text")},{key:"sections",label:"\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0639\u0634\u0631\u0629",test:r=>{for(let i=1;i<=10;i++)if(!r.includes(`manual-section-${i}`))return!1;return!0}},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",test:r=>r.includes("ptw-manual-ppe-print-matrix")||r.includes("ptw-manual-ppe-fixed")},{key:"risk",label:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631",test:r=>r.includes("manual-risk-matrix")},{key:"approvals",label:"\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A",test:r=>r.includes("manual-section-7")},{key:"closure",label:"\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D",test:r=>r.includes("manual-section-8")},{key:"supervisors",label:"\u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",test:r=>r.includes("manual-section-10")}].filter(r=>!r.test(t||""));return{ok:a.length===0,failed:a.map(r=>r.label),pageCount:(String(t||"").match(/ptw-a4-page/g)||[]).length}},_logManualPermitExportReview_(t,e,a="export"){const r=this._verifyManualPermitExportHtml_(t);return r.ok?(Utils.safeLog(`\u2705 \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${a}): \u0645\u0637\u0627\u0628\u0642 \u2014 ${r.pageCount||1} \u0635\u0641\u062D\u0629/\u0635\u0641\u062D\u0627\u062A HTML`),r):(Utils.safeWarn(`\u26A0\uFE0F \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${a}): \u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629 \u2014 ${r.failed.join("\u060C ")}`),r)},async generateManualPermitPrintHTML(t,e={}){const r=this.generateManualPermitPrintContent(t),i=this.getPermitDisplayNumber(t);let s=t?.isoCode||"Form ICP (F14-26-01)",o=t?.createdAt||t?.timeFrom,l=t?.updatedAt||t?.timeTo||t?.createdAt,n=null;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const x=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");x&&(x.versionNumber&&(n=x.versionNumber),x.issueDate&&(o=x.issueDate),x.revisionDate&&(l=x.revisionDate))}}catch{}const p={formCode:n?`${s} (v${n})`:s,issueDate:o,revisionDate:l},d=this.renderPermitSystemFooter(p),c=this.renderPermitSystemHeader({forPdf:!0}),m=this._splitManualPermitPrintPages_(r,c,d,!0),u=this.getManualPermitPdfExportTechnicalStyles_(),h=`${this.getManualPermitPrintStyles(!0)}${u}`,f=`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A #${Utils.escapeHTML(i)}</title>
    <style>${h}</style>
</head>
<body>
    <div class="ptw-manual-print ptw-manual-print-a4" id="ptw-permit-print-root">
        ${m}
    </div>
</body>
</html>`;return e?.skipReview!==!0&&this._logManualPermitExportReview_(f,t,"pdf-export"),f},_loadPermitPdfLib_(t,e){if(e())return Promise.resolve(!0);const a=Array.isArray(t)?t:[t],r=i=>{if(i>=a.length)return Promise.resolve(!1);const s=a[i],o=Array.from(document.querySelectorAll("script[src]")).find(l=>String(l.src||"").includes(s.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return o?new Promise(l=>{const n=()=>l(!!e());o.addEventListener("load",n,{once:!0}),setTimeout(n,4e3)}):new Promise(l=>{const n=document.createElement("script");n.src=s,n.async=!0,n.onload=()=>l(!!e()),n.onerror=()=>l(r(i+1)),document.head.appendChild(n)})};return r(0)},async _ensurePermitPdfLibs_(){const t=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),e=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return t&&e},_getPermitJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadPermitPdfFonts_(t){const e=t||document,a=e.head||e.documentElement;if(a&&!e.getElementById("ptw-permit-cairo-font")){const r=e.createElement("link");r.id="ptw-permit-cairo-font",r.rel="stylesheet",r.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",a.appendChild(r)}try{e.fonts&&typeof e.fonts.load=="function"&&(await e.fonts.load("400 14px Cairo"),await e.fonts.load("600 14px Cairo"),await e.fonts.load("700 18px Cairo"),await e.fonts.load("800 16px Cairo"),await e.fonts.ready)}catch{}},_addPermitCanvasToPdfFullWidth_(t,e,a,r={}){const i=t.internal.pageSize.getWidth(),s=t.internal.pageSize.getHeight(),o=i-a*2,l=s-a*2,n=o,p=e.height/e.width*n,{dataUrl:d,format:c}=Utils.PdfExport.compressCanvasToJpegDataUrl(e,Utils.PdfExport.TARGET_MAX_BYTES);if(p<=l+.5||r.allowSlice===!1)return t.addImage(d,c,a,a,n,Math.min(p,l)),1;const m=e.width/n,u=Math.max(1,Math.floor(l*m)),h=Math.max(1,r.maxSlices||4);let f=0;for(let x=0;x<e.height&&f<h;x+=u){f>0&&t.addPage();const b=Math.min(u,e.height-x),k=document.createElement("canvas");k.width=e.width,k.height=b;const y=k.getContext("2d");y&&(y.fillStyle="#ffffff",y.fillRect(0,0,k.width,k.height),y.drawImage(e,0,x,e.width,b,0,0,e.width,b));const C=b/e.width*n,{dataUrl:z,format:I}=Utils.PdfExport.compressCanvasToJpegDataUrl(k,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/h));t.addImage(z,I,a,a,n,Math.min(C,l)),f+=1}return f},async _ensureJsPdfInFrame_(t,e){return!t||!e?!1:e.jspdf?.jsPDF||typeof e.jsPDF=="function"?!0:new Promise(a=>{const r=t.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",r.async=!0,r.onload=()=>a(!!(e.jspdf?.jsPDF||typeof e.jsPDF=="function")),r.onerror=()=>a(!1),(t.head||t.documentElement).appendChild(r)})},_getPermitJsPdfFromFrame_(t){return t?t.jspdf?.jsPDF?t.jspdf.jsPDF:typeof t.jsPDF=="function"?t.jsPDF:this._getPermitJsPdfConstructor_():this._getPermitJsPdfConstructor_()},async _downloadPermitHtmlViaJsPdfHtml_(t,e,a,r,i,s){const o=this._getPermitJsPdfFromFrame_(a);if(!o||!e)return!1;const l=t&&typeof t.html=="function"?t:new o({orientation:"portrait",unit:"mm",format:"a4"});if(typeof l.html!="function")return!1;const n=l.internal.pageSize.getWidth()-i*2;return new Promise(p=>{let d=!1;const c=u=>{d||(d=!0,p(!!u))},m=setTimeout(()=>c(!1),45e3);try{l.html(e,{callback:u=>{clearTimeout(m);try{u.save(r),c(!0)}catch{c(!1)}},margin:[i,i,i,i],width:n,windowWidth:s,html2canvas:{scale:this.PERMIT_A4_CAPTURE_SCALE||2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",logging:!1,width:s,windowWidth:s,scrollX:0,scrollY:0},autoPaging:"slice"})}catch{clearTimeout(m),c(!1)}})},async _fitManualPermitPagesToA4_(t){const e=Array.from(t||[]);for(const a of e)a.classList.remove("ptw-page-tight","ptw-page-ultra-tight"),a.scrollHeight>a.clientHeight+2&&(a.classList.add("ptw-page-tight"),await new Promise(r=>requestAnimationFrame(r))),a.scrollHeight>a.clientHeight+2&&(a.classList.add("ptw-page-ultra-tight"),await new Promise(r=>requestAnimationFrame(r)))},async _downloadPermitHtmlAsPdfByPages_(t,e,a,r,i,s,o){if(!t||!e?.length)return!1;const l=Array.from(e).slice(0,Math.min(2,o)),n=this.PERMIT_A4_HEIGHT_PX;await this._fitManualPermitPagesToA4_(l);for(let p=0;p<l.length;p++){p>0&&t.addPage();const d=l[p];d.style.display="flex",d.style.flexDirection="column",d.style.width=`${s}px`,d.style.maxWidth=`${s}px`,d.style.height=`${n}px`,d.style.minHeight=`${n}px`,d.style.maxHeight=`${n}px`,d.style.boxSizing="border-box",d.style.transform="none",d.style.zoom="1",d.style.background="#ffffff",d.style.overflow="hidden",d.style.position="relative",this._sanitizePermitNodeForCanvasCapture_(d),r.style.width=`${s}px`,r.style.height=`${n+40}px`,typeof d.scrollIntoView=="function"&&d.scrollIntoView({block:"start"}),await new Promise(m=>setTimeout(m,450));const c=await this._capturePermitHtmlToCanvas_(d,a,{width:s,height:n});if(!c)return!1;this._addPermitCanvasToPdfFullWidth_(t,c,i,{allowSlice:!1,maxSlices:1})}return!0},async _downloadPermitHtmlAsPdfByCanvas_(t,e,a,r,i){if(!t||!e)return!1;e.style.width=`${this.PERMIT_A4_WIDTH_PX}px`,e.style.maxWidth=`${this.PERMIT_A4_WIDTH_PX}px`,e.style.boxSizing="border-box";const s=Math.max(e.scrollHeight,e.offsetHeight,1),o=await this._capturePermitHtmlToCanvas_(e,a,{width:this.PERMIT_A4_WIDTH_PX,height:s});return o?this._addPermitCanvasToPdfFullWidth_(t,o,r,{allowSlice:!0,maxSlices:i})>0:!1},async _ensureHtml2CanvasInFrame_(t,e){return!t||!e?!1:typeof e.html2canvas=="function"?!0:new Promise(a=>{const r=t.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",r.async=!0,r.onload=()=>a(typeof e.html2canvas=="function"),r.onerror=()=>a(!1),(t.head||t.documentElement).appendChild(r)})},_sanitizePermitNodeForCanvasCapture_(t){if(!t)return;const e=a=>{!a||!a.style||(a.style.transform="none",a.style.zoom="1",a.style.filter="none",a.style.webkitFilter="none")};e(t),t.querySelectorAll("*").forEach(e)},async _capturePermitHtmlToCanvas_(t,e,a={}){const r=a.width||this.PERMIT_A4_WIDTH_PX,i=Math.max(t?.scrollWidth||r,r),s=Math.max(t?.scrollHeight||1,a.height||t?.scrollHeight||1,1);let o=this.PERMIT_A4_CAPTURE_SCALE||2;for(;o>1&&(i*o>16e3||s*o>16e3);)o-=.25;const l=e&&typeof e.html2canvas=="function"?e.html2canvas:html2canvas,n={scale:o,backgroundColor:"#ffffff",logging:!1,useCORS:!0,allowTaint:!0,imageTimeout:12e3,scrollX:0,scrollY:0,width:i,height:s,windowWidth:i,windowHeight:s,onclone:(c,m)=>{const u=c.getElementById("ptw-permit-print-root")||m;this._sanitizePermitNodeForCanvasCapture_(u),c.querySelectorAll(".ptw-ph-cell, .ptw-paper-header-dept, .ptw-paper-header-form-title, .ptw-paper-header-form-subtitle").forEach(h=>{h?.style&&(h.style.letterSpacing="0",h.style.wordSpacing="normal",h.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",h.style.transform="none",h.style.unicodeBidi="embed")}),c.querySelectorAll(".ptw-paper-header-company").forEach(h=>{h?.style&&(h.style.letterSpacing="0",h.style.wordSpacing="normal",h.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",h.style.transform="none",h.style.unicodeBidi="embed",h.style.whiteSpace="nowrap",h.style.wordBreak="keep-all")}),c.body&&(c.body.style.width=`${i}px`,c.body.style.padding="8px",c.body.style.margin="0",c.body.style.background="#ffffff",c.body.style.direction="rtl"),c.documentElement&&(c.documentElement.style.direction="rtl")}},p=[n,{...n,useCORS:!1,allowTaint:!0},{...n,scale:Math.max(1.25,o-.5)}];let d=null;for(let c=0;c<p.length;c++)try{const m=await l(t,p[c]);if(m&&m.width>0&&m.height>0)return m}catch(m){d=m}if(d)throw d;return null},async _downloadPermitHtmlAsPdf(t,e){const a=this._getPermitJsPdfConstructor_();if(!a||typeof html2canvas>"u")return!1;const r=String(e||"PTW.pdf").toLowerCase().endsWith(".pdf")?String(e):`${String(e)}.pdf`,i=this.PERMIT_A4_WIDTH_PX,s=this.PERMIT_A4_MARGIN_MM,o=this.PERMIT_A4_MAX_PAGES||6;await this._preloadPermitPdfFonts_();const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.style.cssText=`position:fixed;left:-20000px;top:0;width:${i}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(l);try{l.srcdoc=t,await new Promise(f=>{l.onload=f,l.onerror=f,setTimeout(f,8e3)});const n=l.contentDocument||l.contentWindow?.document,p=l.contentWindow;if(!n||!p)return!1;await this._preloadPermitPdfFonts_(n),await new Promise(f=>setTimeout(f,900));const d=Array.from(n.images||[]);await Promise.all(d.map(f=>new Promise(x=>{if(f.complete)return x();f.onload=x,f.onerror=x,setTimeout(x,3e3)}))),await this._ensureHtml2CanvasInFrame_(n,p),await this._ensureJsPdfInFrame_(n,p),await new Promise(f=>setTimeout(f,400));const c=n.getElementById("ptw-permit-print-root")||n.querySelector(".ptw-manual-print")||n.querySelector(".report-wrapper")||n.querySelector(".form-container")||n.body;if(!c)return!1;c.style.width=`${i}px`,c.style.maxWidth=`${i}px`,c.style.margin="0",c.style.padding="0",c.style.boxSizing="border-box",c.style.background="#ffffff";const m=Math.max(c.scrollHeight,c.offsetHeight,200);l.style.width=`${i}px`,l.style.height=`${m+80}px`,await new Promise(f=>setTimeout(f,200));const u=c.querySelectorAll(".ptw-a4-page");let h=!1;if(u.length>0){const f=new a({orientation:"portrait",unit:"mm",format:"a4"});h=await this._downloadPermitHtmlAsPdfByPages_(f,u,p,l,s,i,o),h&&f.save(r)}if(!h){const f=new a({orientation:"portrait",unit:"mm",format:"a4"});h=await this._downloadPermitHtmlAsPdfByCanvas_(f,c,p,s,o),h&&f.save(r)}return h}catch(n){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0631\u064A\u062D PDF:",n),!1}finally{l.remove()}},_sanitizePermitFileName_(t){return String(t||"PTW").replace(/[/\\?%*:|"<>]/g,"-").trim()||"PTW"},async buildPermitExportPayload(t,e={}){const a=e?.forPdf!==!1,r=Array.isArray(this.registryData)?this.registryData.find(f=>f.permitId===t||f.id===t):null;if(r?.isManualEntry){const f=this.getPermitDisplayNumber(r),x=String(r.sequentialNumber||f).replace(/\D/g,"").padStart(4,"0")||f,b=await this.generateManualPermitPrintHTML(r),k=await this.generateManualPermitPrintHTML(r,{pdfExport:!0,skipReview:!0}),y=this._verifyManualPermitExportHtml_(k);return{html:k,printHtml:b,fileName:`PTW-${this._sanitizePermitFileName_(x)}.pdf`,displayNo:f,isManualEntry:!0,exportReview:y}}const i=r?.permitId||t,s=AppState.appData.ptw.find(f=>f.id===i);if(!s)return null;const o=r||this.registryData.find(f=>f.permitId===s.id),l=this.getPermitDisplayNumber(o||s);let n=s.isoCode||"Form ICP (F14-26-01)",p=s.version||"1.0",d=s.startDate||s.createdAt,c=s.updatedAt||s.endDate||s.startDate;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const f=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");f&&(f.versionNumber&&(p=f.versionNumber),f.issueDate&&(d=f.issueDate),f.revisionDate&&(c=f.revisionDate))}}catch{}const m=this.getPermitFormDataForPrint(s),u=this.generatePrintContent(m);return{html:this._wrapPermitHtmlForA4Export(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(n,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${l}`,u,!1,!1,{version:p,releaseDate:d,revisionDate:c,compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":l},s.createdAt||s.startDate,s.updatedAt||s.endDate||s.createdAt):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644</title></head><body><div id="ptw-permit-print-root">${u}</div></body></html>`),fileName:`PTW-${this._sanitizePermitFileName_(l)}.pdf`,displayNo:l}},openPermitPrintWindow(t,e){try{const a=new Blob([t],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(a),i=window.open(r,"_blank");i?i.onload=()=>{setTimeout(()=>{i.print(),setTimeout(()=>{URL.revokeObjectURL(r),typeof e=="function"&&e()},800)},500)}:(Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")),typeof e=="function"&&e())}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",a),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+a.message),typeof e=="function"&&e()}},async printPermit(t){Loading.show();const e=await this.buildPermitExportPayload(t,{forPdf:!1});if(Loading.hide(),!e){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const a=e.isManualEntry&&e.printHtml?e.printHtml:e.html;this.openPermitPrintWindow(a)},async deletePermitFromRegistry(t){if(AppState.currentUser?.role!=="admin"){Notification.error(this._t("module.ptw.notify.cannotDeletePerm","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"));return}if(confirm(this._t("module.ptw.notify.deletePtwFromSystem",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`)))try{Loading.show();const e=AppState.appData.ptw.findIndex(r=>r.id===t);e>-1&&AppState.appData.ptw.splice(e,1),this.removeFromRegistry(t),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),document.querySelector(".modal-overlay")?.remove(),this.loadPTWList(!0);const a=document.getElementById("ptw-registry-content");a&&a.style.display!=="none"&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",e),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}finally{Loading.hide()}},setupRegistryEventListeners(){const t=document.getElementById("ptw-registry-import-excel");t&&(t.onclick=()=>this.showImportExcelModal());const e=document.getElementById("ptw-registry-export-excel");e&&(e.onclick=()=>this.exportRegistryToExcel());const a=document.getElementById("ptw-registry-export-pdf");a&&(a.onclick=()=>this.exportRegistryToPDF());const r=document.getElementById("registry-search");r&&(r.oninput=()=>{clearTimeout(this._registryFilterDebounceTimer),this._registryFilterDebounceTimer=setTimeout(()=>this.applyRegistryFilters(),120)},r.onkeydown=l=>{l.key==="Escape"&&r.value&&(r.value="",this.applyRegistryFilters())});const i=document.getElementById("registry-filter-status");i&&(i.onchange=()=>this.applyRegistryFilters());const s=document.getElementById("registry-filter-date-from"),o=document.getElementById("registry-filter-date-to");s&&(s.onchange=()=>this.applyRegistryFilters()),o&&(o.onchange=()=>this.applyRegistryFilters()),this.applyRegistryFilters()},_normalizeRegistrySearchText(t){return String(t??"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},_getLinkedPermitForRegistryEntry(t){if(!t||t.isManualEntry)return null;const e=String(t.permitId||"").trim();return e&&(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).find(r=>r&&(String(r.id)===e||String(r.permitId||"")===e))||null},_getRegistryEntrySearchHaystack(t){if(!t)return[];const e=this._getLinkedPermitForRegistryEntry(t),a=(()=>{try{return this.getPermitTypeDisplay(t)}catch{return""}})(),r=(()=>{try{return this.statusLabel(t.status)}catch{return String(t.status||"")}})(),i=(()=>{try{return this.getPermitDisplayNumber(t)}catch{return""}})();return[t.paperPermitNumber,t.paperPermitNo,t.permitNumber,t.sequentialNumber,t.permitId,t.id,i,t.workDescription,t.requestingParty,t.authorizedParty,t.location,t.sublocation,t.supervisor1,t.supervisor2,a,r,e?.paperPermitNumber,e?.paperPermitNo,e?.permitNumber,e?.id,e?.workDescription].map(o=>String(o??"").trim()).filter(o=>o&&o!=="\u2014"&&o!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&o!=="-")},_registryEntryMatchesSearch(t,e){const a=this._normalizeRegistrySearchText(e);if(!a)return!0;const r=this._getRegistryEntrySearchHaystack(t);if(r.some(s=>this._normalizeRegistrySearchText(s).includes(a)))return!0;const i=String(e||"").replace(/\D/g,"");return i&&/^\d+$/.test(String(e||"").trim())?r.some(s=>{const o=String(s).replace(/\D/g,"");return o&&(o===i||o.includes(i))}):!1},resetRegistryFilters(){const t=document.getElementById("registry-search"),e=document.getElementById("registry-filter-status"),a=document.getElementById("registry-filter-date-from"),r=document.getElementById("registry-filter-date-to");t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),r&&(r.value=""),clearTimeout(this._registryFilterDebounceTimer),this.applyRegistryFilters(),t&&typeof t.focus=="function"&&t.focus()},applyRegistryFilters(){const t=document.getElementById("registry-search")?.value.trim()||"",e=t.toLowerCase(),a=document.getElementById("registry-filter-status")?.value||"",r=document.getElementById("registry-filter-date-from")?.value||"",i=document.getElementById("registry-filter-date-to")?.value||"",s=!!(t||a||r||i),o=document.querySelectorAll("[data-registry-id]");let l=0;o.forEach(m=>{let u=!0;const h=m.textContent.toLowerCase(),f=m.getAttribute("data-registry-id"),x=f!=null?String(f):"",b=this.registryData.find(y=>y.id!=null&&String(y.id)===x||y.permitId!=null&&String(y.permitId)===x);if(!b){m.style.display="none";return}t&&(this._registryEntryMatchesSearch(b,t)||e&&h.includes(e)||(u=!1)),a&&b.status!==a&&(u=!1);const k=b.timeFrom||b.openDate;if(r){const y=k?new Date(k):null,C=y&&!isNaN(y.getTime())?y.toISOString().split("T")[0]:"";(!C||C<r)&&(u=!1)}if(i){const y=k?new Date(k):null,C=y&&!isNaN(y.getTime())?y.toISOString().split("T")[0]:"";(!C||C>i)&&(u=!1)}m.style.display=u?"":"none",u&&(l+=1)});const n=document.getElementById("registry-filter-count");n&&(n.textContent=String(l));const p=document.getElementById("ptw-registry-filter-count-head"),d=document.getElementById("ptw-registry-visible-count");p&&(p.textContent=String(l)),d&&(d.textContent=String(l));const c=document.getElementById("registry-filter-reset");c&&(c.disabled=!s),["registry-search","registry-filter-status","registry-filter-date-from","registry-filter-date-to"].forEach(m=>{const u=document.getElementById(m),h=u?.closest?.("[data-registry-filter-field]");h&&h.classList.toggle("is-active",!!u.value)})},toggleManualPermitFormFullscreen(t){const e=t&&t.closest?t.closest(".ptw-manual-permit-modal"):null;if(!e)return;const a=e.classList.toggle("ptw-manual-permit-modal-fullscreen"),r=t.querySelector("i"),i=t.querySelector(".ptw-manual-permit-fullscreen-label");r&&(r.className=a?"fas fa-compress":"fas fa-expand"),i&&(i.textContent=a?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),t.setAttribute("title",a?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")},_normEquipmentItemKey(t){return String(t||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},getManualFixedEquipmentRowLabels(){return[["\u0631\u0627\u0641\u0639\u0629","\u0633\u0644\u0645 \u0645\u062A\u062D\u0631\u0643","\u0633\u0642\u0627\u0644\u0629","\u0645\u0646\u0635\u0629 \u0631\u0641\u0639","\u0648\u0646\u0634","\u0645\u0636\u062E\u0629","\u062E\u0632\u0627\u0646","\u062E\u0637 \u0623\u0646\u0627\u0628\u064A\u0628","\u0644\u0648\u062D\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"],["\u0645\u0648\u0644\u062F \u0643\u0647\u0631\u0628\u0627\u0621","\u0636\u0627\u063A\u0637 \u0647\u0648\u0627\u0621","\u0645\u0627\u0643\u064A\u0646\u0629 \u0644\u062D\u0627\u0645","\u062C\u0644\u0627\u062E\u0629","\u0645\u0646\u0634\u0627\u0631","\u0645\u062B\u0642\u0627\u0628 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0645\u062D\u0631\u0643 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","\u0639\u062F\u0629 \u064A\u062F\u0648\u064A\u0629 \u062E\u0641\u064A\u0641\u0629"],["\u0635\u0627\u0631\u0648\u062E","\u0647\u064A\u0644\u062A\u0649","\u0633\u064A\u0632\u0631","\u0634\u062D\u0646","\u0643\u0627\u0628\u0644 \u0643\u0647\u0631\u0628\u0627\u0621","\u0648\u0635\u0644\u0627\u062A \u0643\u0647\u0631\u0628\u0627\u0621","\u0623\u062E\u0631\u0649"]]},getManualFixedEquipmentLabels(){return this.getManualFixedEquipmentRowLabels().flat()},_isFixedEquipmentLabel(t){const e=this._normEquipmentItemKey(t);return this.getManualFixedEquipmentLabels().some(a=>this._normEquipmentItemKey(a)===e)},_splitEquipmentTokens(t){return String(t||"").split(/[-+،,]/).map(e=>e.trim().replace(/^[\d\s]+/,"")).filter(Boolean)},_collectEquipmentEntriesForLookup(t=null){const e=new Set,a=[],r=String(t||"").trim(),i=s=>{if(!s)return;const o=String(s.id||s.permitId||"").trim();if(r&&o&&o===r)return;const l=o||`seq:${s.sequentialNumber||""}:${s.paperPermitNo||s.permitNumber||""}`;l&&e.has(l)||(l&&e.add(l),a.push(s))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(i),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(i),a.sort((s,o)=>this._getManualPermitEntryTimestamp(o)-this._getManualPermitEntryTimestamp(s))},buildKnownEquipmentHistoryLabels(t=null,e=20){const a=new Set(this.getManualFixedEquipmentLabels().map(s=>this._normEquipmentItemKey(s))),r=new Set,i=[];return this._collectEquipmentEntriesForLookup(t).forEach(s=>{this._splitEquipmentTokens(s.equipment).forEach(o=>{const l=this._normEquipmentItemKey(o);!l||a.has(l)||r.has(l)||(r.add(l),i.push(o))})}),i.sort((s,o)=>s.localeCompare(o,"ar")),i.slice(0,e)},parseEquipmentToSelection(t,e=[]){const r=this.getManualFixedEquipmentRowLabels().flat(),i=Array.isArray(e)?e:[],s=new Map;[...r,...i].forEach(p=>{const d=this._normEquipmentItemKey(p);d&&!s.has(d)&&s.set(d,p)});const o=[],l=[],n=new Set;return this._splitEquipmentTokens(t).forEach(p=>{const d=this._normEquipmentItemKey(p);if(s.has(d)){const c=s.get(d);n.has(d)||(n.add(d),o.push(c))}else l.push(p)}),{matrixSelected:o,manualNotes:l.join("\u060C ")}},_equipmentSelectionIsChecked(t,e){const a=new Set((e||[]).map(s=>String(s||"").trim()).filter(Boolean)),r=String(t||"").trim();if(a.has(r))return!0;const i=this._normEquipmentItemKey(r);for(const s of a)if(this._normEquipmentItemKey(s)===i)return!0;return!1},buildManualFixedEquipmentCheckboxesHtml(t=[],e=[]){const a=Utils.escapeHTML,r=l=>this._equipmentSelectionIsChecked(l,t),i=this.getManualFixedEquipmentRowLabels(),s=(Array.isArray(e)?e:[]).filter(Boolean);let o='<div class="ptw-manual-equipment-fixed-wrap">';return i.forEach(l=>{o+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-grid-row">',l.forEach(n=>{const p=r(n)?" checked":"";o+=`<label class="ptw-manual-equipment-cell"><input type="checkbox" class="equipment-fixed-cb" value="${a(n)}"${p}><span class="ptw-manual-equipment-label">${a(n)}</span></label>`}),o+="</div>"}),s.length&&(o+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-history-row">',s.forEach(l=>{const n=r(l)?" checked":"";o+=`<label class="ptw-manual-equipment-cell ptw-manual-equipment-history-cell"><input type="checkbox" class="equipment-history-cb" value="${a(l)}"${n}><span class="ptw-manual-equipment-label">${a(l)}</span></label>`}),o+="</div>"),o+="</div>",o},buildManualFixedEquipmentPrintHtml(t=[]){const e=o=>Utils.escapeHTML(o),a=o=>this._equipmentSelectionIsChecked(o,t),r=this.getManualFixedEquipmentRowLabels(),i=(t||[]).filter(o=>{const l=String(o||"").trim();return l&&!this._isFixedEquipmentLabel(l)});let s='<div class="ptw-manual-equipment-print-matrix"><div class="ptw-manual-equipment-fixed-wrap">';return r.forEach((o,l)=>{const n=l===r.length-1?"ptw-manual-equipment-fixed-row equipment-row-last":"ptw-manual-equipment-fixed-row";s+=`<div class="${n}">`,o.forEach(p=>{const d=a(p);s+=`<span class="ptw-manual-equipment-cell${d?" equipment-selected":""}"><span class="equipment-checkbox${d?" checked":""}" aria-hidden="true"></span><span class="equipment-label">${e(p)}</span></span>`}),s+="</div>"}),i.length&&(s+='<div class="ptw-manual-equipment-fixed-row ptw-manual-equipment-history-row equipment-row-last">',i.forEach(o=>{s+=`<span class="ptw-manual-equipment-cell equipment-selected ptw-manual-equipment-history-cell"><span class="equipment-checkbox checked" aria-hidden="true"></span><span class="equipment-label">${e(o)}</span></span>`}),s+="</div>"),s+="</div></div>",s},collectEquipmentFieldValue(t,e={}){const a=t?.querySelector?t:document,r=e.matrixId||"#manual-equipment-matrix",i=e.notesId||"#manual-equipment-notes",s=a.querySelector(r),o=a.querySelector(i),l=Array.from(s?.querySelectorAll(".equipment-fixed-cb:checked")||[]).map(c=>String(c.value||"").trim()).filter(Boolean),n=Array.from(s?.querySelectorAll(".equipment-history-cb:checked")||[]).map(c=>String(c.value||"").trim()).filter(Boolean),p=String(o?.value||"").trim(),d=p?this._splitEquipmentTokens(p):[];return[...new Set([...l,...n,...d])].join("\u060C ")},setupManualEquipmentToolsSync(t){if(!t)return;const e=t.querySelector("#manual-permit-tools"),a=t.querySelector("#manual-equipment-matrix"),r=t.querySelector("#manual-equipment-notes");if(!e||!a)return;const i=()=>{const s=this.collectEquipmentFieldValue(t,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),o=String(e.value||"").trim(),l=String(a.dataset.autoToolsValue||"").trim();(!o||o===l)&&(e.value=s,a.dataset.autoToolsValue=s)};i(),a.addEventListener("change",i),r?.addEventListener("input",i)},buildManualFixedPPECheckboxesHtml(t=[]){const e=Utils.escapeHTML,a=new Set((t||[]).map(l=>String(l||"").trim()).filter(Boolean)),r=l=>String(l||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),i=l=>{const n=String(l).trim();if(a.has(n))return!0;const p=r(n);for(const d of a)if(r(d)===p)return!0;return!1},s=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let o='<div class="ptw-manual-ppe-fixed-wrap">';return s.forEach(l=>{o+='<div class="ptw-manual-ppe-fixed-row">',l.forEach(n=>{const p=i(n)?" checked":"";o+=`<label class="ptw-manual-ppe-cell"><input type="checkbox" class="manual-ppe-fixed-cb" value="${e(n)}"${p}><span>${e(n)}</span></label>`}),o+="</div>"}),o+="</div>",o},async openManualPermitForm(t=null){const e="ptw-manual-form-loading-"+Date.now(),a=document.createElement("div");a.id=e,a.className="modal-overlay",a.style.zIndex="999999",a.innerHTML=`
            <div class="flex items-center justify-center h-full w-full">
                <div class="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center">
                    <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 border-solid rounded-full animate-spin mb-4"></div>
                    <p class="text-gray-700 font-bold text-lg">\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0646\u0645\u0648\u0630\u062C...</p>
                </div>
            </div>
        `,document.body.appendChild(a);try{await new Promise(g=>requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(g,50))));const r=t!==null,i=t?this.registryData.find(g=>g.id===t):null;if(i&&(!i.teamMembers||!i.teamMembers.length)&&i.teamMembersText){const g=String(i.teamMembersText).trim();i.teamMembers=g.split(/[،,]/).map(M=>{M=M.trim();const N=M.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return N?{name:N[1].trim(),signature:N[2].trim()}:{name:M,signature:""}}).filter(M=>M.name||M.signature)}i&&(!i.teamMembers||!i.teamMembers.length)&&(i.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(g=>{i&&i[g]!=null&&typeof i[g]=="string"&&(i[g]=i[g].split(/[،,]/).map(M=>M.trim()).filter(Boolean))});const s=this.getSiteOptions(),o=["\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],l=["\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"],p=String(i?.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",d=i?.sequentialNumber||this.generateRegistrySequentialNumber(),c=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(g=>({name:(g.name||"").trim()})).filter(g=>g.name):[],m=c.length>0,u=i?.authorizedParty||"",h=this.getDepartmentOptionsForPTW(),f=h.length>0,x=i?.requestingParty||"",b=i?.requiredPPE&&Array.isArray(i.requiredPPE)&&i.requiredPPE.length?i.requiredPPE.map(g=>String(g||"").trim()).filter(Boolean):i?.ppeNotes?String(i.ppeNotes).split(/[،,]/).map(g=>g.trim()).filter(Boolean):[],k=i?.id||i?.permitId||null,y=this.buildKnownEquipmentHistoryLabels(k),C=this.parseEquipmentToSelection(i?.equipment,y),z=this.buildManualFixedEquipmentCheckboxesHtml(C.matrixSelected,y),I=typeof Training<"u"&&typeof Training.getSafetyTeamMembers=="function"?Training.getSafetyTeamMembers({excludeSystemUsers:!0}):[],_=(g,M)=>{const N=Utils.escapeHTML,K=String(M||"").trim(),Y=I.map(O=>String(O.name||"").trim()).filter(Boolean);let Z=`<option value="">${N(g)}</option>`;return Y.forEach(O=>{Z+=`<option value="${N(O)}"${K===O?" selected":""}>${N(O)}</option>`}),K&&!Y.includes(K)&&(Z+=`<option value="${N(K)}" selected>${N(K)}</option>`),Z},D=`class="form-input" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px; width: 100%;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'"`,R=this._manualEntryToPtwStub(i);let F=[],S=[];try{[F,S]=await Promise.all([this._fetchIaCandidatesForRole(R,"areaManager"),this._fetchIaCandidatesForRole(R,"maintenanceEngineer")])}catch(g){typeof Utils<"u"&&Utils.safeWarn("openManualPermitForm IA fetch:",g)}const P=g=>{const M=(i?.manualApprovals||[]).find(N=>N.role===g)||{};return{name:M.name||"",approverId:M.approverId||"",personType:M.personType||""}},A=P("\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"),U=P("\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"),j=(i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")||{},X=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:F,selectedId:A.approverId,selectedName:A.name}),it=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",roleKey:"maintenanceEngineer",candidates:S,selectedId:U.approverId,selectedName:U.name}),v=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:F,selectedId:j.approverId||"",selectedName:j.name||"",isClosure:!0,inputClass:"form-input text-sm w-full manual-closure-approval-name"}),E=i?.id||i?.permitId||null,H=this.buildKnownTeamMembersIndex(E),q=this.buildKnownManualApprovalsIndex(E),w=this.buildManualPermitDatalistHtml(this.getKnownTeamMemberNames(H)),V=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(q,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")),J=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(q,"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")),W=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole(q,"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")),$=document.createElement("div");$.className="modal-overlay",$.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;",$.innerHTML=`
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
                                ${r?this._t("module.ptw.form.editManual","\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A"):this._t("module.ptw.form.newManual","\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A")}
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
                                    <span id="manual-permit-display-number" style="font-size: 1.5rem; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${String(d).padStart(4,"0")}</span>
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
                        <datalist id="manual-team-member-names-datalist">${w}</datalist>
                        <datalist id="manual-approval-datalist-requestingParty">${V}</datalist>
                        <datalist id="manual-approval-datalist-areaManager">${J}</datalist>
                        <datalist id="manual-approval-datalist-maintenanceEngineer">${W}</datalist>
                        
                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="ptw-manual-form-section manual-section-1" style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
                            <h3><i class="fas fa-info-circle"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span></h3>
                            <div class="ptw-s1-layout">
                                <div class="ptw-s1-row ptw-s1-meta-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645 <span class="text-red-500">*</span></label>
                                    <select id="manual-permit-location" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</option>
                                        ${s.map(g=>{let M=i&&(i.locationId===g.id||i.location&&(i.location.split(" - ")[0]===g.name||i.location===g.name));return`<option value="${Utils.escapeHTML(g.id)}" data-site-name="${Utils.escapeHTML(g.name)}" ${M?"selected":""}>${Utils.escapeHTML(g.name)}</option>`}).join("")}
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
                                            ${m?'list="manual-authorized-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(u)}"
                                            placeholder="${m?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644"}">
                                        ${m?`
                                        <datalist id="manual-authorized-party-datalist">
                                            ${c.map(g=>`<option value="${Utils.escapeHTML(g.name||"")}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    <div class="relative">
                                        <input type="text" id="manual-permit-requesting-party" class="form-input transition-all focus:ring-2 focus:ring-blue-200 w-full"
                                            ${f?'list="manual-requesting-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(x)}"
                                            placeholder="${f?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)"}">
                                        ${f?`
                                        <datalist id="manual-requesting-party-datalist">
                                            ${h.map(g=>`<option value="${Utils.escapeHTML(g)}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment manual-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="manual-equipment-matrix" class="ptw-manual-equipment-body">
                                        ${z}
                                    </div>
                                    <div class="ptw-manual-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="manual-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${Utils.escapeHTML(C.manualNotes||"")}</textarea>
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
                            <input type="hidden" id="manual-permit-sequential" value="${d}">
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
                                                ${["\u0644\u062D\u0627\u0645","\u0642\u0637\u0639","\u0634\u0631\u0631/\u062D\u0631\u0627\u0631\u0629","\u0623\u062E\u0631\u0649"].map(g=>`
                                                <label class="manual-opt-row" style="background: #fef2f2; border-color: #fecaca;"><input type="checkbox" name="manual-hot-work" value="${g}" class="form-checkbox text-red-600" ${(i?.hotWorkDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-hot-work-other" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.hotWorkOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-confined" class="manual-type-panel-body" style="display: none;">
                                                ${["\u062E\u0632\u0627\u0646\u0627\u062A","\u0623\u0646\u0627\u0628\u064A\u0628","\u0645\u062C\u0627\u0631\u064A","\u0623\u062E\u0631\u0649"].map(g=>`
                                                <label class="manual-opt-row" style="background: #f9fafb; border-color: #e5e7eb;"><input type="checkbox" name="manual-confined-space" value="${g}" class="form-checkbox text-gray-600" ${(i?.confinedSpaceDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-confined-space-other" class="form-input manual-other-input" value="${Utils.escapeHTML(i?.confinedSpaceOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-height" class="manual-type-panel-body" style="display: none;">
                                                ${["\u0633\u0642\u0627\u0644\u0627\u062A","\u0633\u0637\u062D","\u0633\u0644\u0629 \u0631\u0627\u0641\u0639\u0629","\u0623\u062E\u0631\u0649"].map(g=>`
                                                <label class="manual-opt-row" style="background: #eff6ff; border-color: #bfdbfe;"><input type="checkbox" name="manual-height-work" value="${g}" class="form-checkbox text-blue-600" ${(i?.heightWorkDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
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
                                    ${this.buildManualFixedPPECheckboxesHtml(b)}
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
                                            ${[5,4,3,2,1].map(g=>`<tr>
                                                <td class="p-2 bg-gray-100 border border-gray-400 font-semibold text-sm">${g} - ${{5:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F",4:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B",3:"\u0645\u062D\u062A\u0645\u0644",2:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644",1:"\u0646\u0627\u062F\u0631"}[g]}</td>
                                                ${[1,2,3,4,5].map(N=>{const K=g*N;let Y="",Z="",O="",at="";return K<=4?(Y="#22c55e",Z="#ffffff",O="#16a34a",at="\u0645\u0646\u062E\u0641\u0636"):K<=9?(Y="#eab308",Z="#1c1917",O="#ca8a04",at="\u0645\u062A\u0648\u0633\u0637"):K<=16?(Y="#f97316",Z="#ffffff",O="#ea580c",at="\u0645\u0631\u062A\u0641\u0639"):(Y="#dc2626",Z="#ffffff",O="#b91c1c",at="\u062D\u0631\u062C"),`<td class="p-0 border border-gray-400">
                                                    <button type="button" class="manual-risk-cell w-full h-full p-3 font-bold cursor-pointer transition-all border-0 ${i?.riskLikelihood==g&&i?.riskConsequence==N?"ring-4 ring-blue-600 ring-inset":""}" data-likelihood="${g}" data-consequence="${N}" data-score="${K}" data-level="${at}" data-bg="${Y}" data-text="${Z}" data-hover="${O}" style="background: ${Y}; color: ${Z};">
                                                        ${K}
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
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-name" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${X}</td>
                                            <td class="p-1 border border-gray-800">${it}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${_("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(i?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr class="manual-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
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
                                ${l.map((g,M)=>{const K={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{icon:"fa-check-circle",color:"#10b981",hoverBg:"#f0fdf4",border:"#10b981",class:"btn-completed",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{icon:"fa-pause-circle",color:"#f59e0b",hoverBg:"#fffbeb",border:"#f59e0b",class:"btn-incomplete",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{icon:"fa-exclamation-circle",color:"#ef4444",hoverBg:"#fef2f2",border:"#ef4444",class:"btn-forced",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[g],Y=p===g;return`<label class="manual-status-btn ${K.class} ${Y?"selected":""}" style="${Y?`background: ${K.gradient} !important; border-color: ${K.color} !important; color: #ffffff !important; box-shadow: 0 8px 20px -4px ${K.shadow} !important;`:""}">
                                    <input type="radio" name="manual-permit-status-radio" value="${Utils.escapeHTML(g)}" class="form-radio h-5 w-5 hidden" ${Y?"checked":""} onchange="PTW.updateManualStatusBtnSelection(this);">
                                    <i class="fas ${K.icon}" style="${Y?"color: #ffffff !important;":`color: ${K.color};`}"></i>
                                    <span class="font-bold">${Utils.escapeHTML(g)}</span>
                                </label>`}).join("")}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label><input type="datetime-local" id="manual-closure-time" class="form-input" value="${i?.closureDate?Utils.toDateTimeLocalString(i.closureDate):""}"></div>
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label><input type="text" id="manual-closure-reason" class="form-input" value="${Utils.escapeHTML(i?.closureReason||"")}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"></div>
                            </div>
                            <input type="hidden" id="manual-permit-status" value="${Utils.escapeHTML(p)}">
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
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${v}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-closure-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${_("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}"></td>
                                        </tr>
                                        <tr class="manual-closure-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((i?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
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
                                    <select id="manual-permit-supervisor1" ${D}>
                                        ${_("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644",i?.supervisor1)}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-user-tie ml-2 text-indigo-600"></i>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</label>
                                    <select id="manual-permit-supervisor2" ${D}>
                                        ${_("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A",i?.supervisor2)}
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
                        <i class="fas fa-save ml-2"></i>${r?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                    </button>
                </div>
                </div>
            </div>
        `,document.body.appendChild($);const dt=()=>$.remove();$.querySelector(".modal-close")?.addEventListener("click",dt),$.querySelector('[data-action="close"]')?.addEventListener("click",dt),$.addEventListener("click",g=>{g.target===$&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&dt()});const Q=$.querySelector("#manual-paper-permit-number");Q&&Q.addEventListener("input",()=>{Q.style.border="2px solid #90caf9",Q.style.boxShadow="none"});const st=$.querySelector("#manual-permit-time-from"),ft=$.querySelector("#manual-permit-time-to"),et=$.querySelector("#manual-permit-total-time"),rt=()=>{const g=st.value,M=ft.value;if(!g||!M){et.value="";return}et.value=this.calculateTotalTime(g,M)};st?.addEventListener("change",rt),ft?.addEventListener("change",rt),i?.timeFrom&&i?.timeTo&&rt();const ot=$.querySelector("#manual-permit-location"),yt=$.querySelector("#manual-permit-sublocation-wrapper"),nt=$.querySelector("#manual-permit-sublocation"),ct=$.querySelector("#manual-permit-location-entries"),At=$.querySelector("#manual-selected-sublocations-container"),bt=$.querySelector("#manual-selected-sublocations-display"),B=$.querySelector("#manual-selected-sublocations-list"),gt=3,pt=[],St=g=>({locationId:String(g?.locationId||"").trim(),location:String(g?.location||"").trim(),sublocationId:String(g?.sublocationId||"").trim(),sublocation:String(g?.sublocation||"").trim()}),wt=()=>{ct&&(ct.value=JSON.stringify(pt))},ht=()=>{if(!At||!bt||!B)return;const g=pt.map(N=>N.sublocation||N.location).filter(Boolean),M=g.length>0;At.style.display=M?"block":"none",bt.value=M?g.join("\u060C "):"",B.innerHTML=pt.map((N,K)=>`
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                    ${Utils.escapeHTML(N.sublocation||N.location)}
                    <button type="button" class="manual-remove-sublocation-btn text-blue-700 hover:text-red-600" data-index="${K}" style="background:none;border:none;cursor:pointer;font-size:14px;line-height:1;">\xD7</button>
                </span>
            `).join(""),B.querySelectorAll(".manual-remove-sublocation-btn").forEach(N=>{N.addEventListener("click",()=>{const K=Number(N.getAttribute("data-index"));Number.isInteger(K)&&K>=0&&(pt.splice(K,1),wt(),ht())})})},xt=g=>{if(!nt||!yt)return;if(!g){yt.style.display="none",nt.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}const M=this.getPlaceOptions(g);if(!Array.isArray(M)||M.length===0){yt.style.display="none",nt.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}yt.style.display="block",nt.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+M.map(N=>`
                <option value="${Utils.escapeHTML(N.id)}" data-place-name="${Utils.escapeHTML(N.name)}">${Utils.escapeHTML(N.name)}</option>
            `).join(""),nt.value=""},Pt=()=>{if(!ot||!nt)return;const g=String(ot.value||"").trim(),M=ot.options[ot.selectedIndex]?.getAttribute("data-site-name")||ot.options[ot.selectedIndex]?.textContent||"",N=String(nt.value||"").trim(),K=nt.options[nt.selectedIndex],Y=K?.getAttribute("data-place-name")||(K?.value?K.textContent:"")||"";if(!g||!M||!N||!Y)return;if(pt.some(O=>O.locationId===g&&O.sublocationId===N)){Notification.warning(this._t("module.ptw.notify.sublocDup","\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A \u0628\u0627\u0644\u0641\u0639\u0644")),nt.value="";return}if(pt.length>=gt){Notification.warning(this._t("module.ptw.notify.sublocMax3","\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 3 \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0641\u0642\u0637 \u0643\u062D\u062F \u0623\u0642\u0635\u0649")),nt.value="";return}pt.push(St({locationId:g,location:M.trim(),sublocationId:N,sublocation:Y.trim()})),wt(),ht(),nt.value=""},Mt=()=>{let g=[];if(ct?.value)try{const M=JSON.parse(ct.value);Array.isArray(M)&&(g=M)}catch{g=[]}if((!g||g.length===0)&&(i?.location||i?.sublocation)){const M=String(i?.locationId||ot?.value||"").trim(),N=String(ot?.options[ot?.selectedIndex]?.getAttribute("data-site-name")||"").trim(),K=String(i?.location||"").split("|").map(O=>O.trim()).filter(Boolean),Y=String(i?.sublocationId||"").split("|").map(O=>O.trim()).filter(Boolean),Z=String(i?.sublocation||"").split("|").map(O=>O.trim()).filter(Boolean);Z.length>0?g=Z.map((O,at)=>({locationId:M,location:N||K[0]?.split(" - ")[0]||i?.location||"",sublocationId:Y[at]||"",sublocation:O})):g=K.map((O,at)=>{const ut=O.indexOf(" - ");return ut===-1?{locationId:M,location:O,sublocationId:Y[at]||"",sublocation:""}:{locationId:M,location:O.slice(0,ut).trim(),sublocationId:Y[at]||"",sublocation:O.slice(ut+3).trim()}})}g.map(St).filter(M=>M.location&&M.sublocation).slice(0,gt).forEach(M=>pt.push(M)),wt(),ht()};ot?.addEventListener("change",()=>{pt.length=0,wt(),ht(),xt(ot.value)}),nt?.addEventListener("change",Pt),xt(ot?.value),Mt(),this.setupManualEquipmentToolsSync($);const Lt=(g,M)=>{if(!g||!M)return;const N=()=>{const K=String(g.value||"").trim(),Y=String(M.value||"").trim(),Z=g.dataset.autoCopiedValue||"";g.dataset.knownLoaded!=="1"&&(!Y||Y===Z)&&(M.value=K,g.dataset.autoCopiedValue=K)};N(),g.addEventListener("input",N)},T=(g,M,N)=>{const K=$.querySelector(g);if(!K)return;const Y=new Set(["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"]),Z=O=>{const at=O?.dataset.role;if(!at)return;const ut=K.querySelector(`${N}[data-role="${at}"]`);Lt(O,ut)};K.querySelectorAll(M).forEach(O=>{if(O.matches(".ia-approval-select")||O.tagName==="SELECT"){Z(O);return}Y.has(O.dataset?.role)||Z(O)}),K.addEventListener("input",O=>{const at=O.target?.dataset?.role;O.target.matches(M)&&(O.target.matches(".ia-approval-select")||Y.has(at)||Z(O.target))}),K.addEventListener("change",O=>{(O.target.matches(M)||O.target.matches(".ia-approval-select"))&&Z(O.target)})};this._setupIaRolePickerListeners($),this.setupManualPermitKnownLookups($,H,q),T("#manual-approvals-list",".manual-approval-name, .ia-approval-select",".manual-approval-sig"),T("#manual-closure-approvals-list",".manual-closure-approval-name, .ia-approval-select",".manual-closure-approval-sig");const G=$.querySelector("#manual-work-type-panel"),tt=$.querySelector("#manual-work-type-panel-placeholder"),lt=$.querySelector("#manual-work-type-panel-body"),kt=$.querySelector("#manual-work-type-panel-title"),mt=$.querySelector("#manual-work-type-select"),_t=$.querySelector("#manual-work-type-selected-chips"),jt={hot:"manual-panel-hot",confined:"manual-panel-confined",height:"manual-panel-height",excavation:"manual-panel-excavation",electrical:"manual-panel-electrical",cold:"manual-panel-cold",other:"manual-panel-other"},Dt={hot:"\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",confined:"\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",height:"\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",excavation:"\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631",electrical:"\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621",cold:"\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F",other:"\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"},vt=[],qt=$.querySelector("#manual-work-type-selected-empty"),Nt=$.querySelector("#manual-work-type-selected-hint"),$t=$.querySelector("#manual-work-type-panel-badge"),It=()=>{if(!$t||!mt)return;const g=vt.some(M=>M.typeKey===mt.value);$t.style.display=mt.value&&g?"inline-block":"none"},Ut=()=>{if(!_t)return;const g=vt.length>0;qt&&(qt.style.display=g?"none":"block"),Nt&&(Nt.style.display=g?"block":"none"),_t.innerHTML=vt.map(({typeKey:M,label:N})=>`<span class="manual-selected-type-chip" data-type="${M}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u062D\u0631\u064A\u0631 \u062A\u0641\u0627\u0635\u064A\u0644: ${N}" role="button" tabindex="0" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; background: #ede9fe; color: #5b21b6; font-size: 0.8rem; font-weight: 500;">${N}</span>`).join(""),_t.querySelectorAll(".manual-selected-type-chip").forEach(M=>{M.addEventListener("click",function(){const N=this.getAttribute("data-type");N&&mt&&(mt.value=N,mt.dispatchEvent(new Event("change")),It())}),M.addEventListener("keydown",function(N){(N.key==="Enter"||N.key===" ")&&(N.preventDefault(),this.click())})}),It()},Bt=()=>{const g=mt?.value,M=g?Dt[g]||g:"";!g||!M||vt.some(N=>N.typeKey===g)||(vt.push({typeKey:g,label:M}),Ut(),It())};if(mt&&G&&lt&&(mt.addEventListener("change",function(){const g=this.value,M=Dt[g]||g;if(!g){tt&&(tt.style.display="block"),lt.style.display="none",$t&&($t.style.display="none");return}tt&&(tt.style.display="none"),lt.style.display="block",(G.querySelectorAll(".manual-type-panel-body")||[]).forEach(K=>{K.style.display="none"});const N=$.querySelector("#"+(jt[g]||""));N&&(N.style.display="block",kt&&(kt.textContent=M)),It()}),lt.addEventListener("change",function(g){g.target.matches('input[type="checkbox"], input[type="text"], input[type="number"]')&&Bt()}),lt.addEventListener("input",function(g){g.target.matches('input[type="text"], input[type="number"]')&&Bt()})),i){const g=(M,N)=>{M&&!vt.some(K=>K.typeKey===N)&&vt.push({typeKey:N,label:Dt[N]})};g(i.hotWorkDetails&&i.hotWorkDetails.length||i.hotWorkOther,"hot"),g(i.confinedSpaceDetails&&i.confinedSpaceDetails.length||i.confinedSpaceOther,"confined"),g(i.heightWorkDetails&&i.heightWorkDetails.length||i.heightWorkOther,"height"),g(i.excavationLength||i.excavationWidth||i.excavationDepth||i.soilType,"excavation"),g(i.electricalWorkType,"electrical"),g(i.coldWorkType,"cold"),g(i.otherWorkType,"other")}Ut();const Rt=$.querySelectorAll('input[name="manual-permit-status-radio"]'),Gt=$.querySelector("#manual-permit-status");i?.status?Rt.forEach(g=>{g.value===i.status&&(g.checked=!0,PTW.updateManualStatusBtnSelection(g))}):Rt.forEach(g=>{g.value==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&(g.checked=!0,PTW.updateManualStatusBtnSelection(g))}),$.querySelector("#manual-add-team-member-btn")?.addEventListener("click",()=>{const g=$.querySelector("#manual-team-members-list");if(!g)return;const M=document.createElement("tr");M.className="manual-team-member-row",M.innerHTML=`
                <td class="p-2 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-team-member-name border-0 focus:ring-0" list="manual-team-member-names-datalist" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value=""></td>
                <td class="p-2 border border-gray-800" style="border-right: 4px solid #1e3a8a;"><input type="text" class="form-input text-sm w-full manual-team-member-signature border-0 focus:ring-0" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value=""></td>
            `,g.appendChild(M),typeof $._attachManualTeamRowLookup=="function"&&$._attachManualTeamRowLookup(M)}),$.querySelectorAll(".manual-risk-cell").forEach(g=>{g.addEventListener("click",()=>{const M=g.dataset.likelihood,N=g.dataset.consequence,K=g.dataset.score,Y=g.dataset.level,Z=g.dataset.bg||"#22c55e",O=g.dataset.text||"#ffffff";$.querySelectorAll(".manual-risk-cell").forEach(Ht=>{Ht.classList.remove("ring-4","ring-blue-500","ring-blue-600","ring-inset")}),g.classList.add("ring-4","ring-blue-600","ring-inset"),$.querySelector("#manual-risk-likelihood").value=M,$.querySelector("#manual-risk-consequence").value=N,$.querySelector("#manual-risk-score").value=K,$.querySelector("#manual-risk-level").value=Y;const at=$.querySelector("#manual-risk-result");at&&at.classList.remove("hidden");const ut=$.querySelector("#manual-risk-score-display"),zt=$.querySelector("#manual-risk-level-display"),Ft=$.querySelector("#manual-risk-likelihood-display"),Wt=$.querySelector("#manual-risk-consequence-display");ut&&(ut.textContent=K),zt&&(zt.textContent=Y),Ft&&(Ft.textContent=M),Wt&&(Wt.textContent=N);const Et=$.querySelector("#manual-risk-result-badge");Et&&(Et.style.background=Z,Et.style.color=O,Et.textContent=K);const Tt=$.querySelector("#manual-risk-notes");if(Tt){const Ot=`\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A: \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631 ${Y} (\u062F\u0631\u062C\u0629 ${K}) \u2014 \u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 ${M} \xD7 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 ${N}. ${{\u0645\u0646\u062E\u0641\u0636:"\u064A\u0645\u0643\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062F\u0648\u0631\u064A\u0629.",\u0645\u062A\u0648\u0633\u0637:"\u064A\u0644\u0632\u0645 \u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0642\u0628\u0644 \u0648\u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.",\u0645\u0631\u062A\u0641\u0639:"\u0644\u0627 \u064A\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 \u0642\u0628\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0636\u0648\u0627\u0628\u0637 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0634\u0631\u0627\u0641\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629.",\u062D\u0631\u062C:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u0648\u0631\u0627\u064B \u062D\u062A\u0649 \u0625\u0632\u0627\u0644\u0629/\u062E\u0641\u0636 \u0627\u0644\u062E\u0637\u0631 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u062E\u0637\u0629 \u062A\u062D\u0643\u0645 \u0645\u0634\u062F\u062F\u0629."}[Y]||""}`.trim(),Ct=String(Tt.value||"").trim(),Kt=String(Tt.dataset.autoRiskText||"").trim();(!Ct||Ct===Kt||Ct.startsWith("\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A:"))&&(Tt.value=Ot,Tt.dataset.autoRiskText=Ot)}})}),$.querySelector("#manual-add-approval-btn")?.addEventListener("click",()=>{const g=$.querySelector("#manual-approvals-list");if(!g)return;const M=g.querySelectorAll("tr").length+1,N=document.createElement("tr");N.className="manual-approval-row border-b border-gray-100 hover:bg-amber-50 transition-colors",N.innerHTML=`
                <td class="p-2 text-center font-bold text-amber-700">${M}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,g.appendChild(N)}),$.querySelector("#manual-add-closure-approval-btn")?.addEventListener("click",()=>{const g=$.querySelector("#manual-closure-approvals-list");if(!g)return;const M=g.querySelectorAll("tr").length+1,N=document.createElement("tr");N.className="manual-closure-approval-row border-b border-gray-100 hover:bg-cyan-50 transition-colors",N.innerHTML=`
                <td class="p-2 text-center font-bold text-cyan-700">${M}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-closure-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-closure-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,g.appendChild(N)}),$.querySelector("#manual-permit-print-btn")?.addEventListener("click",()=>{this.printManualPermitFromModal($,t)}),$.querySelector("#manual-permit-form")?.addEventListener("submit",async g=>{if(g.preventDefault(),!$.querySelector('input[name="manual-permit-status-radio"]:checked')){const N=$.querySelector("#manual-permit-status");N&&!String(N.value||"").trim()&&(N.value="\u0645\u063A\u0644\u0642")}await this.saveManualPermitEntry($,t)})}catch(r){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("Error opening manual permit form:",r),alert("Error opening form: "+r.message+`
Stack: `+r.stack)}finally{const r=document.getElementById(e);r&&r.remove()}},collectManualPermitDataFromModal(t,e=null){if(!t)return null;const a=e?this.registryData.find(A=>A.id===e):null,r=t.querySelector("#manual-permit-location"),i=r?.options[r?.selectedIndex],s=String(r?.value||"").trim(),o=String(i?.getAttribute("data-site-name")||i?.textContent||"").trim(),l=t.querySelector("#manual-permit-sublocation"),n=t.querySelector("#manual-permit-location-entries");let p=[];if(n?.value)try{const A=JSON.parse(n.value);Array.isArray(A)&&(p=A)}catch{}if(!p.length){const A=l?.options[l?.selectedIndex],U=String(A?.getAttribute("data-place-name")||A?.textContent||"").trim();o&&U&&(p=[{locationId:s,location:o,sublocationId:l?.value||"",sublocation:U}])}const d=p.map(A=>A.sublocation).filter(Boolean),c=Array.from(t.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(A=>({name:A.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:A.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(A=>A.name||A.signature),u=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(A=>{const U=this._readIaRolePickerValue(A,t,{isClosure:!1}),j=t.querySelector(`.manual-approval-sig[data-role="${A}"]`);if(U.name||U.approverId)return{role:A,name:U.name,signature:j?.value?.trim()||""};const X=t.querySelector(`.manual-approval-name[data-role="${A}"]`);return{role:A,name:X?.value?.trim()||"",signature:j?.value?.trim()||""}}),f=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(A=>{const U=this._readIaRolePickerValue(A,t,{isClosure:!0}),j=t.querySelector(`.manual-closure-approval-sig[data-role="${A}"]`);if(U.name||U.approverId)return{role:A,name:U.name,signature:j?.value?.trim()||""};const X=t.querySelector(`.manual-closure-approval-name[data-role="${A}"]`);return{role:A,name:X?.value?.trim()||"",signature:j?.value?.trim()||""}}),x=t.querySelector("#manual-permit-time-from")?.value||"",b=t.querySelector("#manual-permit-time-to")?.value||"",k=Array.from(t.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(A=>String(A.value||"").trim()).filter(Boolean),y=t.querySelector("#manual-ppe-notes")?.value?.trim()||"",C=y?y.split(/[،,]/).map(A=>A.trim()).filter(Boolean):[],z=[...new Set([...k,...C])],I=Array.from(t.querySelectorAll('input[name="manual-hot-work"]:checked')).map(A=>A.value),_=Array.from(t.querySelectorAll('input[name="manual-confined-space"]:checked')).map(A=>A.value),D=Array.from(t.querySelectorAll('input[name="manual-height-work"]:checked')).map(A=>A.value),R=[];I.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),_.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),D.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(t.querySelector("#manual-excavation-check")?.checked||t.querySelector("#manual-excavation-length")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(t.querySelector("#manual-electrical-check")?.checked||t.querySelector("#manual-electrical-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(t.querySelector("#manual-cold-check")?.checked||t.querySelector("#manual-cold-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(t.querySelector("#manual-other-check")?.checked||t.querySelector("#manual-other-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const S=R.length?R:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],P=t.querySelector("#manual-closure-time")?.value||"";return{...a||{},sequentialNumber:parseInt(t.querySelector("#manual-permit-sequential")?.value||a?.sequentialNumber||"0",10),paperPermitNumber:t.querySelector("#manual-paper-permit-number")?.value?.trim()||a?.paperPermitNumber||"",location:o,locationId:s,locationEntries:p,sublocation:d.join(" | "),timeFrom:x?Utils.dateTimeLocalToISO(x)||x:a?.timeFrom||"",timeTo:b?Utils.dateTimeLocalToISO(b)||b:a?.timeTo||"",authorizedParty:t.querySelector("#manual-permit-authorized-party")?.value?.trim()||"",requestingParty:t.querySelector("#manual-permit-requesting-party")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(t,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:t.querySelector("#manual-permit-tools")?.value?.trim()||"",workDescription:t.querySelector("#manual-permit-work-description")?.value?.trim()||"",teamMembers:c.length?c:[{name:"",signature:""}],hotWorkDetails:I,hotWorkOther:t.querySelector("#manual-hot-work-other")?.value?.trim()||"",confinedSpaceDetails:_,confinedSpaceOther:t.querySelector("#manual-confined-space-other")?.value?.trim()||"",heightWorkDetails:D,heightWorkOther:t.querySelector("#manual-height-work-other")?.value?.trim()||"",electricalWorkType:t.querySelector("#manual-electrical-work-type")?.value?.trim()||"",coldWorkType:t.querySelector("#manual-cold-work-type")?.value?.trim()||"",otherWorkType:t.querySelector("#manual-other-work-type")?.value?.trim()||"",excavationLength:t.querySelector("#manual-excavation-length")?.value?.trim()||"",excavationWidth:t.querySelector("#manual-excavation-width")?.value?.trim()||"",excavationDepth:t.querySelector("#manual-excavation-depth")?.value?.trim()||"",soilType:t.querySelector("#manual-excavation-soil")?.value?.trim()||"",preStartChecklist:t.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:t.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:t.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:t.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:t.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:t.querySelector("#manual-permit-mocRequest")?.checked||!1,requiredPPE:z,ppeNotes:z.join("\u060C "),riskLikelihood:t.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:t.querySelector("#manual-risk-consequence")?.value||"",riskScore:t.querySelector("#manual-risk-score")?.value||"",riskLevel:t.querySelector("#manual-risk-level")?.value||"",riskNotes:t.querySelector("#manual-risk-notes")?.value?.trim()||"",manualApprovals:u,manualClosureApprovals:f,status:t.querySelector("#manual-permit-status")?.value||t.querySelector('input[name="manual-permit-status-radio"]:checked')?.value||a?.status||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",closureDate:P?Utils.dateTimeLocalToISO(P)||P:a?.closureDate||"",closureReason:t.querySelector("#manual-closure-reason")?.value?.trim()||"",supervisor1:t.querySelector("#manual-permit-supervisor1")?.value?.trim()||"",supervisor2:t.querySelector("#manual-permit-supervisor2")?.value?.trim()||"",permitType:S,permitTypeDisplay:S.join("\u060C "),isManualEntry:!0}},async printManualPermitFromModal(t,e=null){try{const a=this.collectManualPermitDataFromModal(t,e);if(!a){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}Loading.show();const r=await this.generateManualPermitPrintHTML(a);Loading.hide(),this.openPermitPrintWindow(r)}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",a),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+a.message)}},async saveManualPermitEntry(t,e=null){if(!this._isSavingManualPermit){this._isSavingManualPermit=!0;try{const a=T=>{T&&(T.style.border="2px solid #e53e3e",T.style.boxShadow="0 0 0 3px rgba(229,62,62,0.15)")},r=T=>{T&&(T.style.border="",T.style.boxShadow="")},i=t.querySelector("#manual-paper-permit-number"),s=t.querySelector("#manual-permit-time-from"),o=t.querySelector("#manual-permit-time-to"),l=t.querySelector("#manual-permit-authorized-party"),n=t.querySelector("#manual-permit-requesting-party"),p=t.querySelector("#manual-permit-work-description"),d=t.querySelector("#manual-permit-location"),c=d?.options[d?.selectedIndex],m=String(d?.value||"").trim(),u=String(c?.getAttribute("data-site-name")||c?.textContent||"").trim(),h=t.querySelector("#manual-permit-sublocation"),f=t.querySelector("#manual-permit-location-entries");[i,d,s,o,l,n,p].forEach(r);const b=[{label:"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A",element:i,value:String(i?.value||"").trim()},{label:"\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",element:d,value:m},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",element:s,value:String(s?.value||"").trim()},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",element:o,value:String(o?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",element:l,value:String(l?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",element:n,value:String(n?.value||"").trim()},{label:"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",element:p,value:String(p?.value||"").trim()}].filter(T=>!T.value);if(b.length>0){b.forEach(G=>a(G.element));const T=b[0]?.element;T&&typeof T.focus=="function"&&(T.focus(),T.scrollIntoView({behavior:"smooth",block:"center"})),Notification.error(this._t("module.ptw.notify.manualRequiredFieldsDetailed",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0642\u0628\u0644 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:
{fields}`).replace("{fields}",b.map(G=>`\u2022 ${G.label}`).join(`
`))),this._isSavingManualPermit=!1;return}let k=[];if(f?.value)try{const T=JSON.parse(f.value);Array.isArray(T)&&(k=T.map(G=>({locationId:String(G?.locationId||m).trim(),location:String(G?.location||u).trim(),sublocationId:String(G?.sublocationId||"").trim(),sublocation:String(G?.sublocation||"").trim()})).filter(G=>G.location&&G.sublocation))}catch{k=[]}if(k.length===0){const T=h?.options[h?.selectedIndex],G=String(h?.value||"").trim(),tt=String(T?.getAttribute("data-place-name")||(T?.value?T.textContent:"")||"").trim();u&&tt&&(k=[{locationId:m,location:u,sublocationId:G,sublocation:tt}])}const y=k.map(T=>T.sublocationId).filter(Boolean),C=k.map(T=>T.sublocation).filter(Boolean),z=y.length>0?y.join(" | "):null,I=C.length>0?C.join(" | "):null,_=t.querySelector("#manual-permit-time-from")?.value,D=t.querySelector("#manual-permit-time-to")?.value,R=t.querySelector("#manual-permit-date")?.value||(_?_.split("T")[0]:new Date().toISOString().split("T")[0]);let F="";if(_&&D){F=this.calculateTotalTime(_,D);try{const T=new Date(_),tt=new Date(D)-T;if(tt>=0){const lt=Math.floor(tt/36e5),kt=Math.floor(tt%(1e3*60*60)/(1e3*60));lt===0?F=`${kt} \u062F\u0642\u064A\u0642\u0629`:kt===0?F=`${lt} \u0633\u0627\u0639\u0629`:F=`${lt} \u0633\u0627\u0639\u0629 \u0648 ${kt} \u062F\u0642\u064A\u0642\u0629`}}catch{}}const S=Array.from(t.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(T=>({name:T.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:T.querySelector(".manual-team-member-signature")?.value?.trim()||"",id:T.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(T=>T.name||T.signature),P=Array.from(t.querySelectorAll('input[name="manual-hot-work"]:checked')).map(T=>T.value),A=Array.from(t.querySelectorAll('input[name="manual-confined-space"]:checked')).map(T=>T.value),U=Array.from(t.querySelectorAll('input[name="manual-height-work"]:checked')).map(T=>T.value),X=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>{const G=this._readIaRolePickerValue(T,t,{isClosure:!1}),tt=t.querySelector(`.manual-approval-sig[data-role="${T}"]`);if(G.name||G.approverId)return{role:T,name:G.name,signature:tt?.value?.trim()||"",approverId:G.approverId||"",personType:G.personType||"",isManualApprover:G.isManualApprover===!0,approvalRoleKey:G.approvalRoleKey||this._resolveIaRoleKey(T),date:"",notes:""};const lt=t.querySelector(`.manual-approval-name[data-role="${T}"]`);return{role:T,name:lt?.value?.trim()||"",signature:tt?.value?.trim()||"",date:"",notes:""}}),v=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>{const G=this._readIaRolePickerValue(T,t,{isClosure:!0}),tt=t.querySelector(`.manual-closure-approval-sig[data-role="${T}"]`);if(G.name||G.approverId)return{role:T,name:G.name,signature:tt?.value?.trim()||"",approverId:G.approverId||"",personType:G.personType||"",isManualApprover:G.isManualApprover===!0,approvalRoleKey:G.approvalRoleKey||this._resolveIaRoleKey(T),date:"",notes:""};const lt=t.querySelector(`.manual-closure-approval-name[data-role="${T}"]`);return{role:T,name:lt?.value?.trim()||"",signature:tt?.value?.trim()||"",date:"",notes:""}}),E=[];P.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),A.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),U.length>0&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(t.querySelector("#manual-excavation-check")?.checked||t.querySelector("#manual-excavation-length")?.value?.trim()||t.querySelector("#manual-excavation-width")?.value?.trim()||t.querySelector("#manual-excavation-depth")?.value?.trim()||t.querySelector("#manual-excavation-soil")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(t.querySelector("#manual-electrical-check")?.checked||t.querySelector("#manual-electrical-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(t.querySelector("#manual-cold-check")?.checked||t.querySelector("#manual-cold-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(t.querySelector("#manual-other-check")?.checked||t.querySelector("#manual-other-work-type")?.value?.trim())&&E.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const q=E.length>0?E:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],w={sequentialNumber:parseInt(t.querySelector("#manual-permit-sequential")?.value||"0"),date:R,permitType:q,permitTypeDisplay:q.join("\u060C "),requestingParty:t.querySelector("#manual-permit-requesting-party")?.value.trim()||"",locationId:m,location:u,locationEntries:k,sublocationId:z,sublocation:I,timeFrom:_,timeTo:D,totalTime:t.querySelector("#manual-permit-total-time")?.value||F,authorizedParty:t.querySelector("#manual-permit-authorized-party")?.value.trim()||"",workDescription:t.querySelector("#manual-permit-work-description")?.value.trim()||"",supervisor1:t.querySelector("#manual-permit-supervisor1")?.value.trim()||"",supervisor2:t.querySelector("#manual-permit-supervisor2")?.value.trim()||"",status:t.querySelector("#manual-permit-status")?.value||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",paperPermitNumber:t.querySelector("#manual-paper-permit-number")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(t,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:t.querySelector("#manual-permit-tools")?.value.trim()||"",teamMembers:S,hotWorkDetails:P,hotWorkOther:t.querySelector("#manual-hot-work-other")?.value.trim()||"",confinedSpaceDetails:A,confinedSpaceOther:t.querySelector("#manual-confined-space-other")?.value.trim()||"",heightWorkDetails:U,heightWorkOther:t.querySelector("#manual-height-work-other")?.value.trim()||"",electricalWorkType:t.querySelector("#manual-electrical-work-type")?.value.trim()||"",coldWorkType:t.querySelector("#manual-cold-work-type")?.value.trim()||"",otherWorkType:t.querySelector("#manual-other-work-type")?.value.trim()||"",excavationLength:t.querySelector("#manual-excavation-length")?.value.trim()||"",excavationWidth:t.querySelector("#manual-excavation-width")?.value.trim()||"",excavationDepth:t.querySelector("#manual-excavation-depth")?.value.trim()||"",soilType:t.querySelector("#manual-excavation-soil")?.value.trim()||"",preStartChecklist:t.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:t.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:t.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:t.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:t.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:t.querySelector("#manual-permit-mocRequest")?.checked||!1,ppeNotes:t.querySelector("#manual-ppe-notes")?.value.trim()||"",riskLikelihood:t.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:t.querySelector("#manual-risk-consequence")?.value||"",riskScore:t.querySelector("#manual-risk-score")?.value||"",riskLevel:t.querySelector("#manual-risk-level")?.value||"",riskNotes:t.querySelector("#manual-risk-notes")?.value.trim()||"",manualApprovalsText:X.map(T=>`${T.role}: ${T.name||"\u2014"} ${T.signature?"\u062A\u0648\u0642\u064A\u0639: "+T.signature:""}`).filter(Boolean).join(" | "),manualClosureApprovalsText:v.map(T=>`${T.role}: ${T.name||"\u2014"} ${T.signature?"\u062A\u0648\u0642\u064A\u0639: "+T.signature:""}`).filter(Boolean).join(" | "),manualApprovals:X,manualClosureApprovals:v,closureTime:t.querySelector("#manual-closure-time")?.value||"",closureReason:t.querySelector("#manual-closure-reason")?.value.trim()||""},V=w.ppeNotes?String(w.ppeNotes).split(/[،,]/).map(T=>T.trim()).filter(Boolean):[],J=Array.from(t.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(T=>String(T.value||"").trim()).filter(Boolean),W=[...new Set([...J,...V].map(T=>String(T||"").trim()).filter(Boolean))];w.ppeNotes=W.length?W.join("\u060C "):w.ppeNotes;const $=String(w.paperPermitNumber||"").trim();if(!$||$==="0"){typeof Notification<"u"&&Notification.warning&&Notification.warning(PTW._t("module.ptw.notify.paperNumRequired","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0625\u0644\u0632\u0627\u0645\u064A \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0631\u0642\u0645 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638")),i&&(a(i),i.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})),this._isSavingManualPermit=!1;return}const dt=this.registryData.find(T=>String(T.paperPermitNumber||"").trim()===$&&T.id!==(e||null));if(dt){const T=dt.sequentialNumber||"\u061F";typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.notify.paperNumDup",'\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A "{n}" \u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u062C\u0644 #{s} \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0645\u062E\u062A\u0644\u0641').replace(/\{n\}/g,$).replace(/\{s\}/g,String(T))),i&&(a(i),i.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})),this._isSavingManualPermit=!1;return}const Q=[];if((!S||S.length===0)&&Q.push("\u0623\u0633\u0645\u0627\u0621 \u0648\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644 (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639)"),w.riskScore||Q.push("\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u062A\u062D\u062F\u064A\u062F \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062E\u0637\u0631 (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633)"),X&&X.some(T=>T.name&&String(T.name).trim()!=="")||Q.push("\u0623\u0633\u0645\u0627\u0621 \u0648\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u064A \u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639)"),(!W||W.length===0)&&Q.push("\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 (PPE) \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u062F\u0633)"),["\u0645\u063A\u0644\u0642","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0645\u0644\u063A\u0649"].includes(w.status)&&(v&&v.some(G=>G.name&&String(G.name).trim()!=="")||Q.push("\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639)")),Q.length>0){const T="\u062A\u0623\u0643\u064A\u062F \u062D\u0641\u0638 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644",G=`\u062A\u0646\u0628\u064A\u0647: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0644\u0645 \u062A\u0643\u062A\u0645\u0644 \u0628\u0639\u062F \u0641\u064A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:

`+Q.map(lt=>"\u2022 "+lt).join(`
`)+`

\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0631\u063A\u0645 \u0639\u062F\u0645 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0647\u0630\u0647 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0645 \u062A\u0631\u063A\u0628 \u0641\u064A \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0648\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u061F`;let tt=!1;if(typeof Utils<"u"&&typeof Utils.confirmDialog=="function"?tt=await Utils.confirmDialog(T,G,"\u0646\u0639\u0645\u060C \u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","\u0625\u0644\u063A\u0627\u0621 \u0648\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"):tt=window.confirm(G),!tt){this._isSavingManualPermit=!1;return}}const et=Utils.dateTimeLocalToISO(w.timeFrom)||new Date().toISOString(),rt=Utils.dateTimeLocalToISO(w.timeTo)||new Date().toISOString(),ot=et||this.dateInputToISO(w.date)||new Date().toISOString(),yt=parseInt(w.sequentialNumber)||0,nt=e?w.sequentialNumber:yt>0?yt:this.generateRegistrySequentialNumber(),ct=this.getCurrentUserActor(),At=String(w.location||"").trim(),bt={sequentialNumber:nt,openDate:ot,permitType:w.permitType,permitTypeDisplay:w.permitTypeDisplay,requestingParty:w.requestingParty,locationId:w.locationId,location:At,locationEntries:w.locationEntries,sublocationId:w.sublocationId,sublocation:w.sublocation,timeFrom:et,timeTo:rt,totalTime:w.totalTime||this.calculateTotalTime(et,rt),authorizedParty:w.authorizedParty,workDescription:w.workDescription,supervisor1:w.supervisor1||"",supervisor2:w.supervisor2||"",status:w.status,paperPermitNumber:w.paperPermitNumber||"",equipment:w.equipment,tools:w.tools,toolsList:w.tools,teamMembers:w.teamMembers,hotWorkDetails:w.hotWorkDetails,hotWorkOther:w.hotWorkOther,confinedSpaceDetails:w.confinedSpaceDetails,confinedSpaceOther:w.confinedSpaceOther,heightWorkDetails:w.heightWorkDetails,heightWorkOther:w.heightWorkOther,electricalWorkType:w.electricalWorkType,coldWorkType:w.coldWorkType,otherWorkType:w.otherWorkType,excavationLength:w.excavationLength,excavationWidth:w.excavationWidth,excavationDepth:w.excavationDepth,soilType:w.soilType,preStartChecklist:w.preStartChecklist,lotoApplied:w.lotoApplied,governmentPermits:w.governmentPermits,riskAssessmentAttached:w.riskAssessmentAttached,gasTesting:w.gasTesting,mocRequest:w.mocRequest,ppeNotes:w.ppeNotes,requiredPPE:W,riskLikelihood:w.riskLikelihood,riskConsequence:w.riskConsequence,riskScore:w.riskScore,riskLevel:w.riskLevel,riskNotes:w.riskNotes,manualApprovalsText:w.manualApprovalsText,manualClosureApprovalsText:w.manualClosureApprovalsText,manualApprovals:w.manualApprovals,manualClosureApprovals:w.manualClosureApprovals,teamMembersText:w.teamMembers.map(T=>`${T.name}${T.signature||T.id?" ("+(T.signature||T.id)+")":""}`).join("\u060C "),closureDate:w.closureTime?Utils.dateTimeLocalToISO(w.closureTime):w.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||w.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?rt:null,closureReason:w.closureReason||(w.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":""),isManualEntry:!0,skipApprovalFlow:!0,approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdBy:ct.name,createdById:ct.id,updatedBy:ct.name,updatedById:ct.id,updatedAt:new Date().toISOString()};let B;if(e){const T=this.registryData.find(G=>G.id===e);if(!T){Notification.error(this._t("module.ptw.notify.recNotFound","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}B={...T,...bt,id:T.id,permitId:T.permitId||this.generateTemporaryId("PTW"),createdBy:T.createdBy||bt.createdBy||ct.name,createdById:T.createdById||bt.createdById||ct.id,createdAt:T.createdAt}}else B={...bt,id:this.generateTemporaryId("REG"),permitId:this.generateTemporaryId("PTW"),createdAt:new Date().toISOString()};if(e){const T=this.registryData.findIndex(G=>G.id===e);if(T!==-1)this.registryData[T]=B;else{Notification.error(this._t("module.ptw.notify.recNotInData","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"));return}}else this.registryData.push(B);AppState.appData||(AppState.appData={}),AppState.appData.ptw||(AppState.appData.ptw=[]);const gt={id:B.permitId,workType:Array.isArray(B.permitType)?B.permitTypeDisplay||B.permitType.join("\u060C "):B.permitType||B.permitTypeDisplay,location:B.location,siteName:B.location,sublocation:B.sublocation,sublocationName:B.sublocation,startDate:B.openDate,endDate:B.timeTo,status:String(B.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",requestingParty:B.requestingParty,authorizedParty:B.authorizedParty,workDescription:B.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:B.createdAt,updatedAt:B.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,createdBy:B.createdBy||this.getCurrentUserActor().name,createdById:B.createdById||this.getCurrentUserActor().id,updatedBy:B.updatedBy||this.getCurrentUserActor().name,updatedById:B.updatedById||this.getCurrentUserActor().id,teamMembers:B.teamMembers||[],teamMembersText:B.teamMembersText||"",hotWorkDetails:B.hotWorkDetails||[],hotWorkOther:B.hotWorkOther||"",confinedSpaceDetails:B.confinedSpaceDetails||[],confinedSpaceOther:B.confinedSpaceOther||"",heightWorkDetails:B.heightWorkDetails||[],heightWorkOther:B.heightWorkOther||"",excavationLength:B.excavationLength||"",excavationWidth:B.excavationWidth||"",excavationDepth:B.excavationDepth||"",soilType:B.soilType||"",electricalWorkType:B.electricalWorkType||"",coldWorkType:B.coldWorkType||"",otherWorkType:B.otherWorkType||"",preStartChecklist:B.preStartChecklist||!1,lotoApplied:B.lotoApplied||!1,governmentPermits:B.governmentPermits||!1,riskAssessmentAttached:B.riskAssessmentAttached||!1,gasTesting:B.gasTesting||!1,mocRequest:B.mocRequest||!1,ppeNotes:B.ppeNotes||"",riskLikelihood:B.riskLikelihood||"",riskConsequence:B.riskConsequence||"",riskScore:B.riskScore||"",riskLevel:B.riskLevel||"",riskNotes:B.riskNotes||"",manualApprovals:B.manualApprovals||[],manualApprovalsText:B.manualApprovalsText||"",manualClosureApprovals:B.manualClosureApprovals||[],manualClosureApprovalsText:B.manualClosureApprovalsText||"",closureTime:B.closureTime||"",closureDate:B.closureDate||"",closureReason:B.closureReason||"",paperPermitNumber:B.paperPermitNumber||"",sequentialNumber:B.sequentialNumber,equipment:B.equipment||"",tools:B.tools||"",toolsList:B.toolsList||"",supervisor1:B.supervisor1||"",supervisor2:B.supervisor2||""},pt=AppState.appData.ptw.findIndex(T=>T.id===B.permitId);if(pt!==-1){const T=AppState.appData.ptw[pt];AppState.appData.ptw[pt]={...T,...gt,id:B.permitId,isManualEntry:!0}}else AppState.appData.ptw.push(gt);t.remove();const St=document.getElementById("ptw-registry-content");St&&(this.currentTab==="registry"||St.style.display!=="none")&&this._refreshRegistryViewLight(!0);const wt=document.getElementById("ptw-permits-content");wt&&(this.currentTab==="permits"||wt.style.display!=="none")&&this.loadPTWList(!0);const ht=document.getElementById("ptw-analysis-content");ht&&(this.currentTab==="analysis"||ht.style.display!=="none")&&(ht.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const xt=document.getElementById("ptw-approvals-content");xt&&(this.currentTab==="approvals"||xt.style.display!=="none")&&(xt.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners());const Pt=document.getElementById("ptw-map-content");Pt&&this.currentTab==="map"&&Pt.style.display!=="none"&&this.mapInstance&&typeof this.initMap=="function"&&setTimeout(()=>{this.currentTab==="map"&&this.initMap().catch(T=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",T))},300),this.updateKPIs();const Mt=!e,Lt=pt===-1;Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"),Promise.resolve().then(async()=>{await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save()),await this.syncManualPermitRecordsToBackend(B,gt,{isNewRegistryEntry:Mt,isNewPermit:Lt})}).catch(async T=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",T);const G=T&&T.message?String(T.message):"";if(/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(G)&&B&&gt)try{const tt=await this._fetchPtwRegistryRowsNoMutation();if(this._manualPermitRowExistsOnBackend(tt,B,gt)){Notification.success(this._t("module.ptw.notify.manualCloudOkVerified","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D."));return}}catch(tt){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0633\u062C\u0644 \u0641\u064A PTWRegistry:",tt)}Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B. \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 (\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u0631\u0642\u0629 PTW \u0648 PTWRegistry): "+(G||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")+" \u2014 \u064A\u0645\u0643\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}).finally(()=>{this._isSavingManualPermit=!1})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",a),Notification.error(this._t("module.ptw.notify.savePermitErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+(a.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}},async deleteManualPermitEntry(t){if(confirm(this._t("module.ptw.notify.deleteManualPermConfirm",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u062C\u0644.`)))try{const e=this.registryData.findIndex(r=>r.id===t);if(e===-1){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(!this.registryData[e].isManualEntry){Notification.warning(this._t("module.ptw.notify.manualDeleteOnly","\u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u0629 \u0641\u0642\u0637 \u0645\u0646 \u0647\u0646\u0627"));return}this.registryData.splice(e,1),await this.saveRegistryData(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.manualDeleteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0628\u0646\u062C\u0627\u062D"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",e),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}},async closePermitFromRegistry(t){if(!confirm(this._t("module.ptw.notify.closePermitConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F")))return;const e=AppState.appData.ptw?.find(r=>r.id===t);if(!e){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const a=prompt(this._t("module.ptw.notify.closureReasonPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:"));a&&(e.status="\u0645\u063A\u0644\u0642",e.closureTime=new Date().toISOString(),e.closureReason=a,e.closureStatus="completed",typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),await this.updateRegistryEntry(e),this.updateKPIs(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")))},async exportRegistryToExcel(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const t=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(e=>({\u0645\u0633\u0644\u0633\u0644:e.sequentialNumber,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:new Date(e.openDate).toLocaleDateString("ar-EG"),"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":this.getPermitTypeDisplay(e),"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":e.requestingParty,\u0627\u0644\u0645\u0648\u0642\u0639:e.location,"\u0627\u0644\u0648\u0642\u062A \u0645\u0646":e.timeFrom,"\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649":e.closureDate||e.timeTo,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A":e.totalTime,"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627":e.authorizedParty,"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644":e.workDescription,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01":e.supervisor1,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02":e.supervisor2,"\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":e.status}));if(typeof XLSX<"u"){const e=XLSX.utils.json_to_sheet(t),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,e,"\u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),XLSX.writeFile(a,`\u0633\u062C\u0644_\u062A\u0635\u0627\u0631\u064A\u062D_\u0627\u0644\u0639\u0645\u0644_${new Date().toISOString().split("T")[0]}.xlsx`),Notification.success(this._t("module.ptw.notify.excelOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))}else Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"))},async exportRegistryToPDF(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 PDF...");const t=d=>{if(!d)return"-";try{const c=this.parseDateTimeValue(d);return!c||isNaN(c.getTime())?d||"-":c.toLocaleDateString("ar-EG")}catch{return d||"-"}},e=d=>{if(!d)return"-";try{const c=this.parseDateTimeValue(d);return!c||isNaN(c.getTime())?d||"-":c.toLocaleString("ar-EG")}catch{return d||"-"}},a=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(d=>{const c=d.sequentialNumber||"-",m=t(d.openDate),u=this.getPermitTypeDisplay(d)||"-",h=d.requestingParty||"-",f=d.location||"-",x=d.timeFrom?e(d.timeFrom):"-",b=d.closureDate?e(d.closureDate):d.timeTo?e(d.timeTo):"-",k=d.totalTime||"-",y=d.authorizedParty||"-",C=d.workDescription||"-",z=d.supervisor1||"-",I=d.supervisor2||"-",_=d.status||"-";return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(c)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(m)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(u)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(f)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(x)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(b)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(k)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(C)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(z)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(I)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(_)}</td>
                    </tr>
                `}).join(""),r=`PTW-REGISTRY-${new Date().toISOString().slice(0,10)}`,i="\u0633\u062C\u0644 \u062D\u0635\u0631 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0623\u0639\u0645\u0627\u0644",s=`
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
                        ${a}
                    </tbody>
                </table>
            `,o=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(r,i,s,!1,!0,{source:"PTWRegistry"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${i}</title></head><body>${s}</body></html>`,l=new Blob([o],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(l),p=window.open(n,"_blank");p?p.onload=()=>{setTimeout(()=>{p.print(),setTimeout(()=>{URL.revokeObjectURL(n),Loading.hide(),Notification.success(this._t("module.ptw.notify.registryPrintReady","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(t.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},showImportExcelModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t);const e=t.querySelector("#registry-excel-file-input"),a=t.querySelector("#registry-import-confirm-btn"),r=t.querySelector("#registry-import-preview"),i=t.querySelector("#registry-preview-head"),s=t.querySelector("#registry-preview-body"),o=t.querySelector("#registry-preview-count");let l=[];const n=()=>{l=[],r&&r.classList.add("hidden"),i&&(i.innerHTML=""),s&&(s.innerHTML=""),o&&(o.textContent=""),a&&(a.disabled=!0)};t.addEventListener("click",d=>{d.target===t&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&t.remove()});const p=async d=>{const c=d.target.files?.[0];if(n(),!!c){if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxLibDetail","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629."));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");const m=await c.arrayBuffer(),u=XLSX.read(m,{type:"array"}),h=u.SheetNames[0],f=u.Sheets[h],x=XLSX.utils.sheet_to_json(f);if(x.length===0){Notification.error(this._t("module.ptw.notify.fileEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A")),Loading.hide();return}if(l=x,x.length>0){const b=Object.keys(x[0]);i.innerHTML=`<tr>${b.map(k=>`<th class="px-2 py-1">${Utils.escapeHTML(k)}</th>`).join("")}</tr>`,s.innerHTML=x.slice(0,5).map(k=>`<tr>${b.map(y=>`<td class="px-2 py-1">${Utils.escapeHTML(String(k[y]||""))}</td>`).join("")}</tr>`).join(""),o.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${x.length}`,r.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(m){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel:",m),Notification.error(this._t("module.ptw.notify.readFileErr","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: ")+(m.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}};e&&e.addEventListener("change",p),a?.addEventListener("click",async()=>{if(l.length===0){Notification.warning(this._t("module.ptw.notify.selectFileFirst","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F."));return}await this.importRegistryFromExcel(l,t)})},async importRegistryFromExcel(t,e){if(!t||t.length===0){Notification.error(this._t("module.ptw.notify.noImportData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");let a=0,r=0,i=0,s=0;const o={sequentialNumber:["\u0645\u0633\u0644\u0633\u0644","Sequential Number","sequentialNumber","\u0645\u0633\u0644\u0633\u0644"],openDate:["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","Date","openDate","\u062A\u0627\u0631\u064A\u062E","\u062A\u0627\u0631\u064A\u062E \u0641\u062A\u062D \u0627\u0644\u062A\u0635\u0631\u064A\u062D"],permitType:["\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Permit Type","permitType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644"],requestingParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","Requesting Party","requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"],location:["\u0627\u0644\u0645\u0648\u0642\u0639","Location","location","\u0645\u0648\u0642\u0639"],timeFrom:["\u0627\u0644\u0648\u0642\u062A \u0645\u0646","Time From","timeFrom","\u0648\u0642\u062A \u0645\u0646","\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"],timeTo:["\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649","Time To","timeTo","\u0648\u0642\u062A \u0625\u0644\u0649","\u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0639\u0645\u0644"],totalTime:["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","Total Time","totalTime","\u0625\u062C\u0645\u0627\u0644\u064A"],authorizedParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627","Authorized Party","authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D"],workDescription:["\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644","Work Description","workDescription","\u0627\u0644\u0648\u0635\u0641"],supervisor1:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01","Supervisor 1","supervisor1","\u0645\u0633\u0626\u0648\u0644 01"],supervisor2:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02","Supervisor 2","supervisor2","\u0645\u0633\u0626\u0648\u0644 02"],status:["\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Status","status","\u0627\u0644\u062D\u0627\u0644\u0629"]},l=(d,c)=>{for(const m in d){const u=String(m).trim();for(const h of c)if(u===h||u.toLowerCase()===h.toLowerCase())return d[m]}return null},n=d=>{if(!d)return null;const c=this.parseDateTimeValue(d);if(c)return c.toISOString();if(typeof d=="string"){const m=new Date(d);if(!isNaN(m.getTime()))return m.toISOString()}if(typeof d=="number"){const m=Math.floor(d),u=d-m,h=new Date(1899,11,30),f=new Date(h.getTime()+m*24*60*60*1e3);if(u>0){const x=Math.round(u*24*60*60),b=Math.floor(x/3600),k=Math.floor(x%3600/60),y=x%60;f.setHours(b,k,y,0)}if(!isNaN(f.getTime()))return f.toISOString()}return null};for(const d of t)try{const c=l(d,o.sequentialNumber),m=n(l(d,o.openDate)),u=l(d,o.permitType)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",h=l(d,o.requestingParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",f=l(d,o.location)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",x=n(l(d,o.timeFrom))||m||new Date().toISOString(),b=n(l(d,o.timeTo)),k=l(d,o.totalTime)||this.calculateTotalTime(x,b),y=l(d,o.authorizedParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",C=l(d,o.workDescription)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",z=l(d,o.supervisor1)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",I=l(d,o.supervisor2)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_=l(d,o.status)||"\u0645\u0641\u062A\u0648\u062D";if(!c){i++;continue}const D=this.registryData.findIndex(F=>F.sequentialNumber===Number(c)||F.sequentialNumber===String(c)),R={id:D>=0?this.registryData[D].id:this.generateTemporaryId("REG"),sequentialNumber:Number(c)||this.generateRegistrySequentialNumber(),permitId:D>=0?this.registryData[D].permitId:null,openDate:m||new Date().toISOString(),permitType:u,requestingParty:h,location:f,timeFrom:x,timeTo:b||x,totalTime:k,authorizedParty:y,workDescription:C,supervisor1:z,supervisor2:I,status:_,closureDate:_==="\u0645\u063A\u0644\u0642"||_==="\u0645\u063A\u0644\u0642\u0629"?b||new Date().toISOString():null,closureReason:null,createdAt:D>=0?this.registryData[D].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};D>=0?(this.registryData[D]=R,r++):(this.registryData.push(R),a++)}catch(c){s++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0635\u0641:",c)}await this.saveRegistryData(),document.getElementById("ptw-registry-content")&&this.currentTab==="registry"&&this._refreshRegistryViewLight(!0),Loading.hide(),e.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D!
- \u062A\u0645 \u0625\u0636\u0627\u0641\u0629: ${a} \u0633\u062C\u0644
- \u062A\u0645 \u062A\u062D\u062F\u064A\u062B: ${r} \u0633\u062C\u0644
`+(i>0?`- \u062A\u0645 \u062A\u062E\u0637\u064A: ${i} \u0635\u0641 (\u0628\u062F\u0648\u0646 \u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
`:"")+(s>0?`- \u0623\u062E\u0637\u0627\u0621: ${s} \u0635\u0641`:""))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a),Notification.error(this._t("module.ptw.notify.importErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ")+(a.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},renderList(t={}){const e=t.includeStats!==!1,{source:a,merged:r,permitsFromList:i,permitsFromRegistry:s}=this.getPermitMetricsDataset(),o=a.length>0,l=a.length,n=a.filter(f=>f&&this.isPermitOpenStatus(f.status)).length,p=a.filter(f=>f&&this.isPermitClosedStatus(f.status)).length,d=[...new Set(r.map(f=>(f.workType||"").trim()).filter(Boolean))].sort(),c=[...new Set(r.map(f=>(f.siteName||f.location||"").trim()).filter(Boolean))].sort(),m=[...new Set(r.map(f=>(f.sublocationName||f.sublocation||"").trim()).filter(Boolean))].sort(),u=["\u0645\u0641\u062A\u0648\u062D","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647","\u0645\u0631\u0641\u0648\u0636","\u0645\u063A\u0644\u0642","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"];return`<style>
                .ptw-permit-list-workspace {
                    --ptl-navy:#102a43; --ptl-navy-2:#173d6c; --ptl-cyan:#0891b2; --ptl-blue:#2563eb;
                    --ptl-ink:#172033; --ptl-muted:#64748b; display:grid; gap:18px; direction:rtl; width:100%; max-width:100%; min-width:0;
                }
                .ptw-permit-list-workspace>* { min-width:0; max-width:100%; }
                .ptw-permit-list-workspace #ptw-stats-section .grid { display:grid!important; grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))!important; gap:12px!important; }
                .ptw-permit-list-workspace #ptw-stats-section .kpi-card { min-width:0; width:100%; }
                .ptw-permit-list-workspace>#ptw-stats-section { margin-bottom:0!important; }
                .ptw-permit-list-card { width:100%; max-width:100%; min-width:0; overflow:hidden; border:1px solid #cbddeb; border-radius:18px; box-shadow:0 13px 30px rgba(15,42,67,.09); }
                .ptw-permit-list-card>.card-header {
                    display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 17px;
                    border-bottom:0; background:linear-gradient(125deg,var(--ptl-navy),var(--ptl-navy-2));
                }
                .ptw-permit-list-card>.card-header .card-title { display:flex; align-items:center; gap:8px; margin:0; color:#fff; font-size:1.08rem; font-weight:850; }
                .ptw-permit-list-card>.card-header .card-title i { color:#67e8f9; }
                .ptw-list-visible-pill { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border:1px solid rgba(255,255,255,.25); border-radius:999px; color:#dbeafe; background:rgba(255,255,255,.09); font-size:.73rem; font-weight:750; }
                .ptw-list-visible-pill strong { min-width:24px; text-align:center; color:#083344; background:#67e8f9; border-radius:999px; padding:2px 7px; }
                .ptw-permit-list-card .ptw-filters-row {
                    width:100%!important; margin:0!important; padding:0!important; border:0; border-bottom:1px solid #bae6fd;
                    background:linear-gradient(180deg,#f0f9ff,#fff)!important;
                }
                .ptw-list-filter-heading { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; padding:13px 16px; color:#fff; background:linear-gradient(125deg,#0f2942,#164e63); }
                .ptw-list-filter-heading-title { display:flex; align-items:center; gap:10px; }
                .ptw-list-filter-heading-title>i { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border:1px solid rgba(255,255,255,.3); border-radius:10px; color:#cffafe; background:rgba(255,255,255,.1); }
                .ptw-list-filter-heading h3 { margin:0; color:#fff; font-size:.94rem; font-weight:850; }
                .ptw-list-filter-heading p { margin:2px 0 0; color:#bae6fd; font-size:.7rem; }
                .ptw-permit-list-card .ptw-filters-grid { display:grid!important; grid-template-columns:repeat(auto-fit,minmax(150px,1fr))!important; gap:11px!important; align-items:end; padding:15px 16px 17px; }
                .ptw-permit-list-card .ptw-filter-field { min-width:0; gap:6px; }
                .ptw-permit-list-card .ptw-filter-label { display:flex; align-items:center; gap:5px; margin:0!important; color:#334155; font-size:.73rem; font-weight:800; letter-spacing:0; }
                .ptw-permit-list-card .ptw-filter-label i { color:var(--ptl-cyan); }
                .ptw-permit-list-card .ptw-filter-input { width:100%; min-height:42px; padding:9px 11px; border:1px solid #cbd5e1; border-radius:10px; color:var(--ptl-ink); background:#fff; box-shadow:none; transition:border-color .18s ease,box-shadow .18s ease,background-color .18s ease; }
                .ptw-permit-list-card .ptw-filter-input:hover { border-color:#7dd3fc; }
                .ptw-permit-list-card .ptw-filter-input:focus { border-color:#0891b2; box-shadow:0 0 0 3px rgba(8,145,178,.14); background:#fafeff; }
                .ptw-permit-list-card .ptw-filter-field.is-active .ptw-filter-input { border-color:#0891b2; background:#ecfeff; box-shadow:0 0 0 3px rgba(8,145,178,.09); }
                .ptw-permit-list-card .ptw-filter-reset-btn { min-height:42px; border-radius:10px; font-weight:750; box-shadow:0 5px 13px rgba(37,99,235,.16); }
                .ptw-permit-list-card .ptw-filter-reset-btn:disabled { opacity:.45; cursor:not-allowed; transform:none; }
                .ptw-permit-list-card .ptw-filter-field .text-xs { display:none; }
                .ptw-permit-list-card>.card-body { padding:0!important; }
                .ptw-permit-list-card #ptw-table-container { width:100%; max-width:100%; min-width:0; max-height:min(68vh,720px); overflow:auto; scrollbar-width:thin; scrollbar-color:#94a3b8 #e2e8f0; scrollbar-gutter:stable both-edges; }
                .ptw-permit-list-table { width:max-content!important; min-width:100%; border-collapse:separate!important; border-spacing:0; table-layout:auto; font-size:.8rem; }
                .ptw-permit-list-table thead { position:sticky; top:0; z-index:8; }
                .ptw-permit-list-table thead th { position:sticky; top:0; z-index:8; min-width:125px; padding:13px 12px!important; border:0!important; border-left:1px solid rgba(255,255,255,.13)!important; color:#f8fafc!important; background:linear-gradient(180deg,#173d6c,#102a43)!important; font-size:.74rem; font-weight:850!important; line-height:1.45; white-space:normal; vertical-align:middle; box-shadow:inset 0 -3px #22d3ee; }
                .ptw-permit-list-table thead th:first-child { min-width:190px; right:0; z-index:11; }
                .ptw-permit-list-table thead th:last-child { min-width:190px; left:0; z-index:11; }
                .ptw-permit-list-table tbody td { padding:11px 11px!important; border:0!important; border-bottom:1px solid #e2e8f0!important; border-left:1px solid #edf2f7!important; color:#334155; background:#fff; line-height:1.5; vertical-align:middle; }
                .ptw-permit-list-table tbody tr:nth-child(even) td { background:#f8fbff; }
                .ptw-permit-list-table tbody tr:hover td { background:#ecfeff; }
                .ptw-permit-list-table tbody td:first-child { position:sticky; right:0; z-index:4; min-width:190px; max-width:260px; color:#0f3d68; background:#eff6ff!important; font-weight:750; box-shadow:-5px 0 12px rgba(15,23,42,.04); }
                .ptw-permit-list-table tbody td:last-child { position:sticky; left:0; z-index:4; min-width:190px; background:#f8fafc!important; box-shadow:5px 0 12px rgba(15,23,42,.07); }
                .ptw-permit-list-table tbody td:nth-child(6) { min-width:145px; }
                .ptw-permit-list-table thead th:nth-child(2),.ptw-permit-list-table tbody td:nth-child(2),.ptw-permit-list-table thead th:nth-child(3),.ptw-permit-list-table tbody td:nth-child(3) { min-width:65px!important; max-width:95px!important; width:85px!important; white-space:nowrap!important; overflow:hidden!important; text-overflow:ellipsis!important; font-size:.78rem!important; }
                .ptw-permit-list-table tbody td:nth-child(7) { min-width:175px; }
                .ptw-permit-list-table .badge { display:inline-flex; align-items:center; justify-content:center; min-width:72px; margin:2px 0; padding:5px 9px; border-radius:999px; font-size:.69rem; font-weight:800; white-space:normal; }
                .ptw-permit-list-table td:last-child>div { flex-wrap:nowrap!important; justify-content:center; gap:5px!important; }
                .ptw-permit-list-table td:last-child .btn-icon { width:33px; height:33px; flex:0 0 33px; border-radius:9px; box-shadow:0 3px 9px rgba(15,23,42,.12); }
                @media (max-width:760px) {
                    .ptw-permit-list-card>.card-header { align-items:flex-start; flex-direction:column; }
                    .ptw-list-filter-heading { align-items:flex-start; }
                    .ptw-permit-list-card .ptw-filters-grid { grid-template-columns:1fr 1fr!important; }
                    .ptw-permit-list-card #ptw-table-container { max-height:72vh; }
                }
                @media (max-width:480px) { .ptw-permit-list-card .ptw-filters-grid { grid-template-columns:1fr!important; } }
                @media (prefers-reduced-motion:reduce) { .ptw-permit-list-card .ptw-filter-input { transition:none; } }
            </style>
            <div class="ptw-permit-list-workspace">${e?this.renderListStatsSection():`
            <div class="content-card mb-6" id="ptw-stats-section" data-stats-pending="1">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="kpi-card kpi-primary">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-open-count">${n}</p>
                                <h3 class="kpi-label">\u0645\u0641\u062A\u0648\u062D</h3>
                            </div>
                        </div>
                        <div class="kpi-card kpi-success">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-closed-count">${p}</p>
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
            <div class="content-card ptw-permit-list-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</h2>
                </div>
                <!-- \u0641\u0644\u062A\u0631 \u0627\u062D\u062A\u0631\u0627\u0641\u064A \u0623\u0639\u0644\u0649 \u0627\u0644\u062C\u062F\u0648\u0644 (\u0628\u0646\u0641\u0633 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629) -->
                <div class="ptw-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 0 -20px; width: calc(100% + 40px); direction: rtl;">
                    <div class="ptw-list-filter-heading">
                        <div class="ptw-list-filter-heading-title">
                            <i class="fas fa-sliders-h" aria-hidden="true"></i>
                            <div><h3>\u0641\u0644\u062A\u0631\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</h3><p>\u062A\u062A\u062D\u062F\u062B \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u0627\u062A</p></div>
                        </div>
                        <span class="ptw-list-visible-pill"><i class="fas fa-eye" aria-hidden="true"></i>\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0638\u0627\u0647\u0631\u0629 <strong id="ptw-list-visible-count">${l}</strong></span>
                    </div>
                    <div class="ptw-filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: end;">
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-search ml-1"></i>\u0627\u0644\u0628\u062D\u062B</label>
                            <input type="text" id="ptw-search" class="ptw-filter-input" placeholder="\u0627\u0628\u062D\u062B \u0628\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639..." style="direction: rtl; text-align: right;">
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-tag ml-1"></i>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>
                            <select id="ptw-filter-work-type" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${d.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-map-marker-alt ml-1"></i>\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <select id="ptw-filter-location" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${c.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-location-dot ml-1"></i>\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                            <select id="ptw-filter-sublocation" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${m.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-info-circle ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="ptw-filter-status" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${u.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
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
                            <button id="ptw-reset-filters" class="ptw-filter-reset-btn" type="button" disabled><i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646</button>
                        </div>
                        <div class="ptw-filter-field">
                            <button id="ptw-refresh-list" class="ptw-filter-reset-btn" type="button" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"><i class="fas fa-sync-alt ml-1"></i>\u062A\u062D\u062F\u064A\u062B</button>
                        </div>
                    </div>
                </div>
                <div class="card-body" style="padding-top: 20px;">
                    <div id="ptw-table-container" class="ptw-table-wrapper">
                        <table class="data-table ptw-permit-list-table">
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
                                ${o?"":`
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
            </div>
        `},updateKPIs(){try{const t=(b,k)=>this._t(b,k),{source:e,merged:a,permitsFromList:r,permitsFromRegistry:i}=this.getPermitMetricsDataset(),s=e.length,o=e.filter(b=>b&&this.isPermitOpenStatus(b.status)).length,l=e.filter(b=>b&&this.isPermitClosedStatus(b.status)).length,n=b=>this.formatPtwMetricCount(b),p=document.getElementById("ptw-open-count"),d=document.getElementById("ptw-closed-count"),c=document.getElementById("ptw-total-count");if(p&&(p.textContent=n(o)),d&&(d.textContent=n(l)),c){c.textContent=n(s);const b=c.closest(".relative.ptw-stat-card");if(b){const k=b.querySelector(".text-xs.text-gray-100");if(k){const y=t("module.ptw.stats.countsListAndRegistry","{listCount} \u0642\u0627\u0626\u0645\u0629 + {registryCount} \u0633\u062C\u0644").replace("{listCount}",r.length).replace("{registryCount}",i.length);k.innerHTML=`<i class="fas fa-database text-xs ml-1"></i> ${y}`}}}const m={};a.forEach(b=>{const k=b.workType||t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");m[k]||(m[k]={total:0,open:0,closed:0}),m[k].total++,this.isPermitClosedStatus(b.status)?m[k].closed++:m[k].open++});const u=Object.entries(m).sort((b,k)=>k[1].total-b[1].total),h=u.length>0?u[0]:null,f=document.querySelector(".ptw-work-type-card");if(f&&h){const b=t("module.ptw.stats.differentTypesCount","{n} \u0646\u0648\u0639 \u0645\u062E\u062A\u0644\u0641").replace("{n}",Object.keys(m).length);f.innerHTML=`
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
                                    <h3 class="text-lg font-bold text-white mb-1 drop-shadow-md">${t("module.ptw.stats.permitTypesTitle","\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}</h3>
                                    <p class="text-xs text-purple-100 font-medium">${b}</p>
                                </div>
                            </div>
                        </div>
                        <div class="ptw-card-inner rounded-xl p-4 shadow-lg backdrop-blur-sm">
                            <div class="ptw-card-text font-bold text-base mb-4 line-clamp-2" title="${Utils.escapeHTML(h[0])}">
                                ${Utils.escapeHTML((()=>{const k=this._getWorkTypeDisplayName(h[0]);return k.length>50?k.substring(0,50)+"...":k})())}
                            </div>
                            <div class="flex items-center justify-between gap-2 flex-wrap">
                                <div class="ptw-stat-badge ptw-stat-open flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    <span class="text-orange-700 font-bold text-sm">${t("module.ptw.stats.openBadge","\u0645\u0641\u062A\u0648\u062D: {n}").replace("{n}",h[1].open)}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-700 font-bold text-sm">${t("module.ptw.stats.closedBadge","\u0645\u063A\u0644\u0642: {n}").replace("{n}",h[1].closed)}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-total flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                                    <span class="text-gray-800 font-bold text-sm">${t("module.ptw.stats.totalBadge","\u0625\u062C\u0645\u0627\u0644\u064A: {n}").replace("{n}",h[1].total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `}const x=document.getElementById("ptw-work-types-stats");x&&u.length>0&&(x.innerHTML=u.map(([b,k])=>`
                    <div class="group relative ptw-work-type-item backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <div class="relative z-10">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex-1 min-w-0">
                                    <div class="ptw-work-type-name font-bold text-sm mb-2 line-clamp-2 leading-tight" title="${Utils.escapeHTML(b)}">
                                        ${Utils.escapeHTML(this._getWorkTypeDisplayName(b))}
                                    </div>
                                </div>
                                <div class="ptw-work-type-total-badge ml-3">
                                    ${k.total}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <div class="ptw-stat-badge ptw-stat-open flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    <span class="text-orange-700 font-bold text-xs">${t("module.ptw.stats.openBadge","\u0645\u0641\u062A\u0648\u062D: {n}").replace("{n}",k.open)}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-700 font-bold text-xs">${t("module.ptw.stats.closedBadge","\u0645\u063A\u0644\u0642: {n}").replace("{n}",k.closed)}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-total flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
                                    <span class="text-gray-700 font-bold text-xs">${t("module.ptw.stats.totalBadge","\u0625\u062C\u0645\u0627\u0644\u064A: {n}").replace("{n}",k.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join(""))}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",t)}},_extractPermitTypeFields(t){if(!t)return[];const e=[],a=typeof IssuingAuthorities<"u"?IssuingAuthorities:null,r=n=>{if(!a||typeof a.mapPermitTypeToField!="function"||n==null)return;const p=typeof n=="string"?n:String(n);let d=a.mapPermitTypeToField(p.trim());!d&&/[،,]/.test(p)&&(d=a.mapPermitTypeToField(p.split(/[،,]/)[0].trim())),d&&!e.includes(d)&&e.push(d)};t.hotWorkDetails&&(!Array.isArray(t.hotWorkDetails)||t.hotWorkDetails.length>0)&&e.push("hotWork"),t.confinedSpaceDetails&&(!Array.isArray(t.confinedSpaceDetails)||t.confinedSpaceDetails.length>0)&&e.push("confinedSpace"),t.heightWorkDetails&&(!Array.isArray(t.heightWorkDetails)||t.heightWorkDetails.length>0)&&e.push("workAtHeight"),(t.lotoApplied===!0||t.lotoApplied==="true")&&e.push("loto"),t.coldWorkType&&String(t.coldWorkType).trim()&&e.push("coldWork"),(t.excavationLength||t.excavationWidth||t.excavationDepth||t.soilType&&String(t.soilType).trim())&&e.push("excavation");const i=String(t.permitType||t.workType||"").toLowerCase(),s=String(t.otherWorkType||"").toLowerCase(),o=String(t.electricalWorkType||"").toLowerCase(),l=`${i} ${s} ${o}`;return(l.includes("\u0645\u0642\u0627\u0648\u0644")||l.includes("contractor"))&&e.push("contractorPTW"),(l.includes("\u0631\u0641\u0639")||l.includes("lifting")||l.includes("\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639")||l.includes("crane"))&&e.push("liftingPlan"),t.permitType&&(Array.isArray(t.permitType)?t.permitType:String(t.permitType).split(/[،,|]/)).forEach(p=>r(typeof p=="string"?p.trim():p)),e.length===0&&t.workType&&!Array.isArray(t.workType)&&r(t.workType),[...new Set(e)]},async _buildIssuingAuthoritiesWorkflow(t){if(!t||t.length===0)return null;const e=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!e||typeof e.getAuthoritiesForApprovalRole!="function")return null;const a={permitType:t.join(", ")},[r,i]=await Promise.all([this._fetchIaCandidatesForRole(a,"areaManager"),this._fetchIaCandidatesForRole(a,"maintenanceEngineer")]),s=this._getHseSafetyTeamCandidates(),o=m=>({id:m.id||"",name:m.name||"",email:m.email||"",phone:m.phone||"",personType:m.personType||"employee",permitLevel:m.permitLevel||"G"}),l=[];let n=0;l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:AppState.currentUser?.name||"",approverEmail:AppState.currentUser?.email||"",approverId:AppState.currentUser?.id||"",date:"",comments:"",order:n++,isSafetyOfficer:!1,candidates:[]}),l.push({role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:r.length===1&&r[0].name||"",approverEmail:r.length===1&&r[0].email||"",approverId:r.length===1&&r[0].id||"",date:"",comments:"",order:n++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"areaManager",candidates:r.map(o)}),l.push({role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:i.length===1&&i[0].name||"",approverEmail:i.length===1&&i[0].email||"",approverId:i.length===1&&i[0].id||"",date:"",comments:"",order:n++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"maintenanceEngineer",candidates:i.map(o)}),l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:n++,isSafetyOfficer:!0,candidates:s});let p=[];try{typeof e.getGeneralAuthoritiesForPermitTypes=="function"&&(p=await e.getGeneralAuthoritiesForPermitTypes(t))}catch(m){typeof Utils<"u"&&Utils.safeWarn("_buildIssuingAuthoritiesWorkflow general fetch error:",m)}const d=p.filter(m=>m.permitLevel==="G"),c=p.filter(m=>m.permitLevel==="Y");return d.length>0&&l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (G)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:n++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,candidates:d.map(o)}),c.length>0&&(l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (\u062A\u0646\u0633\u064A\u0642 Y)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:n++,isSafetyOfficer:!0,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,isHseCoApprovalGate:!0,candidates:s}),l.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Y - \u0628\u0639\u062F \u062A\u0646\u0633\u064A\u0642 HSE)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:n++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!0,candidates:c.map(o)})),{approvals:l,circuitOwnerId:"__issuing_authorities__",circuitName:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639",issuingAuthoritiesSource:!0}},_getHseSafetyTeamCandidates(){try{const t=AppState?.appData?.safetyTeam||AppState?.formSettingsState?.safetyTeam||[];if(Array.isArray(t)&&t.length>0)return t.slice(0,5).map(e=>({id:e.id||e.employeeCode||"",name:e.name||e.memberName||"",email:e.email||"",phone:e.phone||""})).filter(e=>e.name)}catch{}return[]},async prepareApprovalsForForm(t=null){if(t&&t.isManualEntry===!0)return{approvals:t.manualApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Entry",isManual:!0};if(t&&Array.isArray(t.approvals)){const i=t.approvalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(t.approvals).map((o,l)=>ApprovalCircuits._attachMetadataToApproval(o,l,i)),circuitOwnerId:i,circuitName:t.approvalCircuitName||""}}try{const i=this._extractPermitTypeFields(t);if(i.length>0){const s=await this._getCachedIaWorkflow(i);if(s&&s.approvals&&s.approvals.length>0)return{approvals:this.normalizeApprovals(s.approvals),circuitOwnerId:s.circuitOwnerId,circuitName:s.circuitName,issuingAuthoritiesSource:!0}}}catch(i){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F workflow \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",i)}const e=AppState.currentUser?.id||"",a=ApprovalCircuits.generateApprovalsForUser(e);return{approvals:this.normalizeApprovals(a.approvals||[]),circuitOwnerId:a.circuitOwnerId||"__default__",circuitName:a.circuitName||""}},async prepareClosureApprovalsForForm(t=null){if(t&&t.isManualEntry===!0)return{approvals:t.manualClosureApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Closure Entry",isManual:!0};if(t&&Array.isArray(t.closureApprovals)){const i=t.closureApprovalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(t.closureApprovals).map((o,l)=>ApprovalCircuits._attachMetadataToApproval(o,l,i)),circuitOwnerId:i,circuitName:t.closureApprovalCircuitName||""}}try{const i=this._extractPermitTypeFields(t);if(i.length>0){const s=await this._getCachedIaWorkflow(i);if(s&&s.approvals&&s.approvals.length>0)return{approvals:this.normalizeApprovals(s.approvals),circuitOwnerId:s.circuitOwnerId,circuitName:s.circuitName,issuingAuthoritiesSource:!0}}}catch(i){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",i)}const e=AppState.currentUser?.id||"",a=ApprovalCircuits.generateApprovalsForUser(e);return{approvals:this.normalizeApprovals(a.approvals||[]),circuitOwnerId:a.circuitOwnerId||"__default__",circuitName:a.circuitName||""}},renderPermitSystemHeader(t={}){const e=t?.forPdf===!0,a=AppState?.companySettings||{},r=a.name||a.companyName||a.organizationName||"HSE System",i=String(a.secondaryName||a.departmentName||a.managementName||"").trim(),s=a.logoUrl||a.companyLogo||a.logo||AppState?.companyLogo||"",o="\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",l="Permit To Work",n=d=>Utils.escapeHTML(d),p=s?`<img src="${n(s)}" alt="Company Logo" class="ptw-paper-header-logo">`:'<div class="ptw-paper-header-logo-fallback">LOGO</div>';return e?`
            <div class="ptw-paper-header ptw-paper-header-pdf">
                <table class="ptw-paper-header-table" dir="rtl" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="ptw-ph-cell ptw-ph-right" valign="middle">
                            <div class="ptw-paper-header-company" dir="rtl">${n(r)}</div>
                            ${i?`<div class="ptw-paper-header-dept" dir="rtl">${n(i)}</div>`:""}
                        </td>
                        <td class="ptw-ph-cell ptw-ph-center" valign="middle">
                            <div class="ptw-paper-header-form-title" dir="rtl">${n(o)}</div>
                            <div class="ptw-paper-header-form-subtitle" dir="ltr">${n(l)}</div>
                        </td>
                        <td class="ptw-ph-cell ptw-ph-left" valign="middle">${p}</td>
                    </tr>
                </table>
            </div>`:`
            <div class="ptw-paper-header">
                <div class="ptw-paper-header-right">
                    <div class="ptw-paper-header-company">${n(r)}</div>
                    ${i?`<div class="ptw-paper-header-dept">${n(i)}</div>`:""}
                </div>
                <div class="ptw-paper-header-center">
                    <div class="ptw-paper-header-form-title">${n(o)}</div>
                    <div class="ptw-paper-header-form-subtitle">${n(l)}</div>
                </div>
                <div class="ptw-paper-header-left">${p}</div>
            </div>
        `},renderPermitSystemFooter(t={}){const e=AppState?.companySettings||{},a=e.name||e.companyName||e.organizationName||"HSE System",r=String(e.secondaryName||e.departmentName||e.managementName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629").trim(),i=p=>Utils.escapeHTML(p==null?"":String(p)),s=i(t.formCode||"PTW-MANUAL"),o=p=>{if(!p)return"\u2014";try{const d=new Date(p);return isNaN(d.getTime())?i(p):i(d.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"}))}catch{return i(p)}},l=o(t.issueDate||t.releaseDate||t.createdAt),n=o(t.revisionDate||t.updatedAt||t.issueDate||t.createdAt);return`
            <div class="ptw-paper-footer">
                <div class="ptw-paper-footer-frame">
                    <div class="ptw-paper-footer-meta" dir="rtl">
                        <span class="ptw-pf-item">\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: ${s}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${l}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644: ${n}</span>
                    </div>
                    <div class="ptw-paper-footer-company" dir="rtl">
                        <span>${i(r)}</span>
                    </div>
                </div>
            </div>`},async renderForm(t=null){const e=!!t,a=t?.isManualEntry===!0,r=await this.prepareApprovalsForForm(t),i=r.approvals||[];this.formApprovals=i.map(v=>Object.assign({},v)),this.formCircuitOwnerId=r.circuitOwnerId||"__default__";const s=r.circuitName||"";this.formCircuitName=s;const o=await this.prepareClosureApprovalsForForm(t),l=t?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",n=v=>Utils.escapeHTML(v||""),p=Array.isArray(t?.teamMembers)&&t.teamMembers.length>0?t.teamMembers:[{name:""}],d=Array.isArray(t?.hotWorkDetails)?t.hotWorkDetails:[],c=Array.isArray(t?.confinedSpaceDetails)?t.confinedSpaceDetails:[],m=Array.isArray(t?.heightWorkDetails)?t.heightWorkDetails:[],u=t?.hotWorkOther||"",h=t?.confinedSpaceOther||"",f=t?.heightWorkOther||"",x=t?.id||t?.permitId||null,b=this.buildKnownEquipmentHistoryLabels(x),k=this.parseEquipmentToSelection(t?.equipment,b),y=this.buildManualFixedEquipmentCheckboxesHtml(k.matrixSelected,b),C=t?.closureStatus||"",z=t?.closureTime?Utils.toDateTimeLocalString(t.closureTime):"",I=t?.closureReason||"",_=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(v=>({name:(v.name||"").trim()})).filter(v=>v.name):[],D=_.length>0,R=t?.authorizedParty||"",F=this.getDepartmentOptionsForPTW(),S=F.length>0,P=t?.requestingParty||"",A=[{id:"welding",label:"\u0644\u062D\u0627\u0645"},{id:"cutting",label:"\u0642\u0637\u0639"},{id:"spark",label:"\u0634\u0631\u0631 / \u062D\u0631\u0627\u0631\u0629"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],U=[{id:"tanks",label:"\u062E\u0632\u0627\u0646\u0627\u062A"},{id:"pipes",label:"\u0623\u0646\u0627\u0628\u064A\u0628"},{id:"containers",label:"\u062A\u0646\u0643\u0627\u062A"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],j=[{id:"scaffold",label:"\u0633\u0642\u0627\u0644\u0627\u062A"},{id:"roof",label:"\u0633\u0637\u062D"},{id:"lift",label:"\u0633\u0644\u0629 \u0631\u0627\u0641\u0639"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],X=(v,E,H,q="")=>v.map(w=>{const V=w.hasOther?!!q:E.includes(w.label),J=w.hasOther?` data-toggle-target="#${H}-other-wrapper"`:"",W=`
                    <label class="ptw-check-option">
                        <input type="checkbox" class="ptw-check-input" name="${H}-option" value="${w.id}" data-label="${w.label}"${J} ${V?"checked":""}>
                        <span>${w.label}</span>
                    </label>
                `;return w.hasOther?`
                        ${W}
                        <div id="${H}-other-wrapper" class="ptw-other-input ${V?"":"hidden"}">
                            <input type="text" id="${H}-other-text" class="form-input" placeholder="\u0627\u0630\u0643\u0631 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" value="${n(q)}">
                        </div>
                    `:W}).join(""),it=p.map(v=>`
            <div class="ptw-team-member-row flex items-center gap-3">
                <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${n(v.name)}">
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
                             <i class="fas fa-${e?"edit":"plus"}"></i>
                        </span>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F"}
                    </h2>
                    <div class="text-xs font-mono bg-white bg-opacity-20 px-3 py-1 rounded-full ptw-form-id-badge" style="color: white;">
                        ${t?.id||"\u0645\u0633\u0648\u062F\u0629 \u062C\u062F\u064A\u062F\u0629"}
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
                                    placeholder="\u0623\u062F\u062E\u0644 \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0647\u0646\u0627...">${n(t?.permitDisclaimer||`\u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647
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
                                            <option value="${Utils.escapeHTML(v.id)}" ${t&&(t.locationId===v.id||t.locationId===String(v.id)||t.siteId===v.id||t.siteId===String(v.id)||t.location===v.id&&!t.locationId&&!t.siteId)?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div id="ptw-sublocation-wrapper" style="display: ${t?.locationId||t?.siteId||t?.location?"block":"none"};">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="ptw-sublocation" name="sublocation" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${this.getPlaceOptions(t?.locationId||t?.siteId||t?.location||"").map(v=>`
                                            <option value="${Utils.escapeHTML(v.id)}" ${t&&(t.sublocationId===v.id||t.sublocationId===String(v.id)||t.sublocation===v.id&&!t.sublocationId||t.sublocationName===v.name)?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="ptw-startDate" name="startDate" required class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                        value="${t?.startDate?Utils.toDateTimeLocalString(t.startDate):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="ptw-endDate" name="endDate" required class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                        value="${t?.endDate?Utils.toDateTimeLocalString(t.endDate):""}">
                                </div>
                                </div>
                                <div class="ptw-s1-row ptw-s1-parties-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</label>
                                    ${D?`
                                        <div class="relative">
                                            <select id="ptw-authorizedParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</option>
                                                ${_.map(v=>`
                                                    <option value="${Utils.escapeHTML(v.name||"")}" ${R===v.name?"selected":""}>
                                                        ${Utils.escapeHTML(v.name||"")}
                                                    </option>
                                                `).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${n(R)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${n(R)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                    `}
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    ${S?`
                                        <div class="relative">
                                            <select id="ptw-requestingParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>
                                                ${F.map(v=>`<option value="${n(v)}" ${P===v?"selected":""}>${n(v)}</option>`).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${n(P)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${n(P)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                    `}
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment ptw-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="ptw-equipment-matrix" class="ptw-form-equipment-body">
                                        ${y}
                                    </div>
                                    <div class="ptw-form-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="ptw-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${n(k.manualNotes||"")}</textarea>
                                    </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-tools">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</label>
                                    <textarea id="ptw-tools" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F">${n(t?.tools||t?.toolsList)}</textarea>
                                </div>
                                <div class="ptw-s1-block ptw-s1-work-desc">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 <span class="text-red-500">*</span></label>
                                    <textarea id="ptw-workDescription" name="workDescription" required class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="3"
                                            placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0639\u0645\u0644">${n(t?.workDescription)}</textarea>
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
                                ${it}
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
                                        ${X(A,d,"ptw-hot",u)}
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 class="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</h4>
                                    <div class="space-y-2">
                                        ${X(U,c,"ptw-confined",h)}
                                    </div>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 class="font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</h4>
                                    <div class="space-y-2">
                                        ${X(j,m,"ptw-height",f)}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</label>
                                    <input type="text" id="ptw-electrical-work-type" class="form-input" value="${n(t?.electricalWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</label>
                                    <input type="text" id="ptw-cold-work-type" class="form-input" value="${n(t?.coldWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</label>
                                    <input type="text" id="ptw-other-work-type" class="form-input" value="${n(t?.otherWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649 (\u0625\u0646 \u0648\u062C\u062F\u062A)">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <div class="md:col-span-4 font-bold text-yellow-800 mb-2 flex items-center">
                                    <i class="fas fa-digging ml-2"></i>
                                    \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631 (\u0625\u0646 \u0648\u062C\u062F)
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0637\u0648\u0644 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-length" class="form-input" value="${n(t?.excavationLength)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0631\u0636 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-width" class="form-input" value="${n(t?.excavationWidth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0645\u0642 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-depth" class="form-input" value="${n(t?.excavationDepth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</label>
                                    <input type="text" id="ptw-excavation-soil" class="form-input" value="${n(t?.soilType)}" placeholder="\u0645\u062B\u0627\u0644: \u0631\u0645\u0644\u064A\u0629">
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
                                    <input type="checkbox" id="ptw-preStartChecklist" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.preStartChecklist?"checked":""}>
                                    <span class="font-medium">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-lotoApplied" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.lotoApplied?"checked":""}>
                                    <span class="font-medium">\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-governmentPermits" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.governmentPermits?"checked":""}>
                                    <span class="font-medium">\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-riskAssessmentAttached" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.riskAssessmentAttached?"checked":""}>
                                    <span class="font-medium">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-gasTesting" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.gasTesting?"checked":""}>
                                    <span class="font-medium">\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A</span>
                                </label>
                                <label class="ptw-check-card flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all">
                                    <input type="checkbox" id="ptw-mocRequest" class="form-checkbox h-5 w-5 text-purple-600 rounded ml-3" ${t?.mocRequest?"checked":""}>
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
                            ${t?.requiredPPE&&t.requiredPPE.length>0?`
                                <script>
                                    setTimeout(() => {
                                        if (typeof PPEMatrix !== 'undefined') {
                                            PPEMatrix.setSelected(${JSON.stringify(t.requiredPPE)});
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
                                ${typeof RiskMatrix<"u"?RiskMatrix.generate("ptw-risk-matrix",{selectedLikelihood:t?.riskAssessment?.likelihood?parseInt(t.riskAssessment.likelihood):null,selectedConsequence:t?.riskAssessment?.consequence?parseInt(t.riskAssessment.consequence):null,interactive:!0}):`
                                    <div class="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                        <i class="fas fa-exclamation-triangle text-4xl text-gray-400 mb-3"></i>
                                        <p class="text-gray-600 font-semibold mb-2">\u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                                        <p class="text-sm text-gray-500">\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u0648\u0646 RiskMatrix</p>
                                    </div>
                                `}
                            </div>
                            ${t?.riskAssessment&&(t.riskAssessment.likelihood||t.riskAssessment.consequence)?`
                                <script>
                                    (function() {
                                        const likelihood = ${t.riskAssessment.likelihood?parseInt(t.riskAssessment.likelihood):"null"};
                                        const consequence = ${t.riskAssessment.consequence?parseInt(t.riskAssessment.consequence):"null"};
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
                                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629">${n(t?.riskNotes)}</textarea>
                                
                                <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 \u0644\u062D\u0641\u0638 \u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 -->
                                <input type="hidden" id="ptw-risk-likelihood" value="${t?.riskAssessment?.likelihood||""}">
                                <input type="hidden" id="ptw-risk-consequence" value="${t?.riskAssessment?.consequence||""}">
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639: \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A -->
                        <div class="ptw-form-section ptw-section-7">
                            <h3>
                                <i class="fas fa-signature"></i>
                                <span>${a?"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A":"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0633\u0627\u0628\u0639 : \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A"}</span>
                            </h3>
                            ${a?`
                                <!-- \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A: \u0639\u0631\u0636 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 -->
                                <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A - \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621
                                </div>
                                ${(()=>{const v=t?.manualApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                ${s?`<div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center"><i class="fas fa-route ml-2"></i>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062D\u0627\u0644\u064A: <strong>${Utils.escapeHTML(s)}</strong></div>`:""}

                                <div id="approval-matrix" class="space-y-4 bg-white rounded-lg border border-gray-100 p-2">
                                    ${this.renderApprovalMatrix(i,e)}
                                </div>
                                ${e?'<button type="button" id="add-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
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
                                    <input type="radio" name="ptw-closure-status" value="completed" class="form-radio text-green-600 h-5 w-5" ${C==="completed"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646</span>
                                </label>
                                <label class="flex items-center space-x-2 space-x-reverse cursor-pointer bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200 hover:bg-opacity-80 transition-all">
                                    <input type="radio" name="ptw-closure-status" value="notCompleted" class="form-radio text-yellow-600 h-5 w-5" ${C==="notCompleted"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center space-x-2 space-x-reverse cursor-pointer bg-white bg-opacity-60 p-3 rounded-lg border border-gray-200 hover:bg-opacity-80 transition-all">
                                    <input type="radio" name="ptw-closure-status" value="forced" class="form-radio text-red-600 h-5 w-5" ${C==="forced"?"checked":""}>
                                    <span class="font-medium text-gray-700">\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A</span>
                                </label>
                            </div>
                            
                            <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0627\u0639\u0629:</label>
                                    <input type="datetime-local" id="ptw-closure-time" class="form-input" value="${z}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label>
                                    <input type="text" id="ptw-closure-reason" class="form-input" value="${n(I)}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642">
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639: \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                        <div class="ptw-form-section ptw-section-9">
                            <h3>
                                <i class="fas fa-check-circle"></i>
                                <span>${a?"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A":"\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0633\u0639 : \u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}</span>
                            </h3>
                            ${a?`
                                <!-- \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A: \u0639\u0631\u0636 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 -->
                                <div class="bg-green-50 text-green-700 px-4 py-2 rounded mb-4 inline-flex items-center">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A - \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u064A\u062F\u0648\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621
                                </div>
                                ${(()=>{const v=t?.manualClosureApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                ${(()=>{const v=o.approvals||[];this.formClosureApprovals=v.map(H=>Object.assign({},H)),this.formClosureCircuitOwnerId=o.circuitOwnerId||"__default__";const E=o.circuitName||"";return this.formClosureCircuitName=E,`
                                        <input type="hidden" id="closure-approval-circuit-owner-id" value="${this.formClosureCircuitOwnerId||""}">
                                        ${E?`<div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center"><i class="fas fa-route ml-2"></i>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062D\u0627\u0644\u064A: <strong>${Utils.escapeHTML(E)}</strong></div>`:""}

                                        <div id="closure-approval-matrix" class="space-y-4 bg-white rounded-lg border border-gray-100 p-2">
                                            ${this.renderClosureApprovalMatrix(v,e)}
                                        </div>
                                        ${e?'<button type="button" id="add-closure-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
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
                                    ${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `},renderApprovalMatrix(t=[],e=!1){return t=this.normalizeApprovals(t),this.formApprovals=t.map((a,r)=>Object.assign({},a,{order:r})),`
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
                        ${t.map((a,r)=>`
                            <tr data-approval-index="${r}" data-required="${a.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(a.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="approval-role-${r}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(a,r,e)}
                                </td>
                                <td>
                                    ${(()=>{const i=a.status==="approved"?"badge-success":a.status==="rejected"?"badge-danger":"badge-warning",s=a.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":a.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${i}">${s}</span>`})()}
                                    <input type="hidden" id="approval-status-${r}" value="${a.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${a.date?Utils.toDateTimeLocalString(a.date):""}"
                                        id="approval-date-${r}" ${e?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(a.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="approval-comments-${r}" >
                                </td>
                                <td>
                                    ${a.candidates&&a.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},renderClosureApprovalMatrix(t=[],e=!1){return t=this.normalizeApprovals(t),this.formClosureApprovals||(this.formClosureApprovals=[]),this.formClosureApprovals=t.map((a,r)=>Object.assign({},a,{order:r})),`
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
                        ${t.map((a,r)=>`
                            <tr data-closure-approval-index="${r}" data-required="${a.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(a.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="closure-approval-role-${r}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(a,r,e,"closure-approval")}
                                </td>
                                <td>
                                    ${(()=>{const i=a.status==="approved"?"badge-success":a.status==="rejected"?"badge-danger":"badge-warning",s=a.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":a.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${i}">${s}</span>`})()}
                                    <input type="hidden" id="closure-approval-status-${r}" value="${a.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${a.date?Utils.toDateTimeLocalString(a.date):""}"
                                        id="closure-approval-date-${r}" ${e?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(a.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="closure-approval-comments-${r}" >
                                </td>
                                <td>
                                    ${a.candidates&&a.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},getStatusBadgeClass(t){return{\u0645\u0641\u062A\u0648\u062D:"warning","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"info","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"success",\u0645\u0631\u0641\u0648\u0636:"danger",\u0645\u063A\u0644\u0642:"secondary"}[t]||"secondary"},setupEventListeners(t=null){setTimeout(()=>{const e=document.getElementById("ptw-refresh-header-btn");if(e){e.replaceWith(e.cloneNode(!0));const F=document.getElementById("ptw-refresh-header-btn");F&&F.addEventListener("click",()=>this.refreshCurrentTab())}const a=document.getElementById("ptw-search"),r=document.getElementById("ptw-filter-status"),i=document.getElementById("ptw-filter-work-type"),s=document.getElementById("ptw-filter-location"),o=document.getElementById("ptw-filter-sublocation"),l=document.getElementById("ptw-filter-date-from"),n=document.getElementById("ptw-filter-date-to"),p=()=>this.filterItems();a&&(a.addEventListener("input",()=>{clearTimeout(this._permitListFilterTimer),this._permitListFilterTimer=setTimeout(p,120)}),a.addEventListener("keydown",F=>{F.key==="Escape"&&a.value&&(a.value="",p())})),r&&r.addEventListener("change",p),i&&i.addEventListener("change",p),s&&s.addEventListener("change",()=>{this.updateSublocationFilterOptions(),p()}),o&&o.addEventListener("change",p),l&&l.addEventListener("change",p),n&&n.addEventListener("change",p);const d=document.getElementById("ptw-reset-filters");d&&d.addEventListener("click",()=>{a&&(a.value=""),r&&(r.value=""),i&&(i.value=""),s&&(s.value=""),o&&(o.value=""),l&&(l.value=""),n&&(n.value=""),this.updateSublocationFilterOptions(),this.filterItems()});const c=document.getElementById("ptw-refresh-list");c&&c.addEventListener("click",()=>this.loadPTWList(!0));const m=document.getElementById("ptw-form");m&&m.addEventListener("submit",F=>this.handleSubmit(F));const u=document.getElementById("cancel-ptw-btn");u&&u.addEventListener("click",()=>this.showList());const h=document.getElementById("print-ptw-btn");h&&h.addEventListener("click",()=>{this.printPermitForm()});const f=document.getElementById("add-approval-btn");f&&f.addEventListener("click",()=>this.addApproval());const x=document.getElementById("add-closure-approval-btn");x&&x.addEventListener("click",()=>this.addClosureApproval()),this._setupSystemApproverPickerListeners(document.getElementById("approval-matrix")),this._setupSystemApproverPickerListeners(document.getElementById("closure-approval-matrix")),this.setupDisclaimerFontControls();const b=document.getElementById("add-team-member-btn");b&&b.addEventListener("click",()=>this.addTeamMemberRow()),document.querySelectorAll("[data-toggle-target]").forEach(F=>{const S=F.getAttribute("data-toggle-target");if(!S)return;const P=document.querySelector(S);if(!P)return;const A=()=>{F.checked?P.classList.remove("hidden"):P.classList.add("hidden")};F.addEventListener("change",A),A()});const y=document.getElementById("ptw-location"),C=document.getElementById("ptw-sublocation-wrapper"),z=document.getElementById("ptw-sublocation");if(y&&C&&z){const F=()=>{try{const S=y.value;if(S){C.style.display="block";const P=this.getPlaceOptions(S),A=z.value;z.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+P.map(U=>{let j=A===U.id;return!j&&t&&(j=t.sublocation===U.id||t.sublocationId===U.id||t.sublocationName===U.name||t.locationName===U.name),`<option value="${Utils.escapeHTML(U.id)}" ${j?"selected":""}>${Utils.escapeHTML(U.name)}</option>`}).join("")}else C.style.display="none",z.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',z.value=""}catch(S){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:",S)}};y.addEventListener("change",F),F()}const I=document.getElementById("ptw-authorizedParty-select"),_=document.getElementById("ptw-authorizedParty");I&&_&&(I.addEventListener("change",()=>{I.value==="__custom__"?(_.classList.remove("hidden"),I.classList.add("hidden"),_.focus()):I.value?(_.classList.add("hidden"),_.value=I.value):(_.classList.add("hidden"),_.value="")}),_.value&&!Array.from(I.options).some(F=>F.value===_.value)?(_.classList.remove("hidden"),I.classList.add("hidden")):I.value&&I.value!=="__custom__"&&(_.value=I.value));const D=document.getElementById("ptw-requestingParty-select"),R=document.getElementById("ptw-requestingParty");D&&R&&(D.addEventListener("change",()=>{D.value==="__custom__"?(R.classList.remove("hidden"),D.classList.add("hidden"),R.focus()):D.value?(R.classList.add("hidden"),R.value=D.value):(R.classList.add("hidden"),R.value="")}),R.value&&!Array.from(D.options).some(F=>F.value===R.value.trim())?(R.classList.remove("hidden"),D.classList.add("hidden")):D.value&&D.value!=="__custom__"&&(R.value=D.value)),this.updateStatusField()},100)},currentEditId:null,async showForm(t=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}this.currentEditId=t?.id||null;const e=document.createElement("div");e.className="modal-overlay",e.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;";const a=await this.renderForm(t);e.innerHTML=`
            <div class="modal-content ptw-manual-permit-modal" style="max-width: 1400px; width: 98%; max-height: 95vh; overflow-y: auto; padding: 0; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-plus" style="font-size: 1.5rem;"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: white;">
                                ${t?.id?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F"}
                            </h2>
                            <p style="font-size: 0.875rem; opacity: 0.8; margin: 4px 0 0 0;">
                                <i class="fas fa-info-circle ml-1"></i>
                                ${t?.id?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u062F\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F \u0645\u0639 \u062F\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"}
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
                    ${a}
                </div>
            </div>
        `,document.body.appendChild(e),this.setupEventListeners(t),setTimeout(()=>{const r=e.querySelector('input:not([type="hidden"]), select, textarea');r&&r.focus()},100)},async showList(){this.currentEditId=null,this.switchTab("permits"),await new Promise(e=>setTimeout(e,50));const t=document.getElementById("ptw-permits-content")||document.getElementById("ptw-content");t&&(t.style.display="block",t.style.visibility="visible",t.style.opacity="1",t.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadPTWList(!0),setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100))},async handleSubmit(t){if(t.preventDefault(),this._isSubmitting){Notification.info(this._t("module.ptw.notify.waitRequest","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0633\u0627\u0628\u0642\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const e=t.target?.querySelector('button[type="submit"]')||document.querySelector('#ptw-form button[type="submit"]')||t.target?.closest("form")?.querySelector('button[type="submit"]');if(e&&e.disabled)return;this._isSubmitting=!0;let a="";e&&(a=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const r=!this.currentEditId,i=[];document.querySelectorAll("#approvals-tbody tr").forEach((P,A)=>{const U=Array.isArray(this.formApprovals)?this.formApprovals[A]||{}:{},X=document.getElementById(`approval-role-${A}`)?.value.trim()||U.role||"",it=P.getAttribute("data-required")!=="false",v=document.getElementById(`approval-approver-select-${A}`);let E=U.approverId||"",H=U.approver||"",q=U.approverEmail||"";if(v)if(E=v.value||"",E==="__manual__")E="",H=document.getElementById(`approval-approver-manual-${A}`)?.value.trim()||"",q="";else if(E){const Q=(U.candidates||[]).find(st=>st.id===E);if(Q)H=Q.name||"",q=Q.email||"";else{const st=ApprovalCircuits.getUserById(E);st&&(H=st.name||st.email||H,q=st.email||q)}}else H="",q="";else H=document.getElementById(`approval-approver-${A}`)?.value.trim()||H;const V=document.getElementById(`approval-status-${A}`)?.value||U.status||"pending",W=document.getElementById(`approval-date-${A}`)?.value||"",dt=document.getElementById(`approval-comments-${A}`)?.value.trim()||"";X&&i.push({role:X,approver:H,approverId:E,approverEmail:q,status:V,approved:V==="approved",rejected:V==="rejected",date:W?new Date(W).toISOString():U.date||"",comments:dt,order:A,required:it,candidates:Array.isArray(U.candidates)?U.candidates:[],history:Array.isArray(U.history)?U.history:[],assignedAt:U.assignedAt||"",assignedBy:U.assignedBy||null,isSafetyOfficer:U.isSafetyOfficer===!0,circuitOwnerId:U.circuitOwnerId||this.formCircuitOwnerId||"__default__",issuingAuthoritySource:U.issuingAuthoritySource===!0,approvalRoleKey:U.approvalRoleKey||this._resolveIaRoleKey(X),isManualApprover:!E&&!!H,personType:E&&(U.candidates||[]).find(Q=>Q.id===E)?.personType||"",requiresHseCoApproval:U.requiresHseCoApproval===!0,isHseCoApprovalGate:U.isHseCoApprovalGate===!0})});const o=P=>{const A=[];return document.querySelectorAll(`input[name="${P}-option"]`).forEach(U=>{if(U.checked)if(U.value==="other"){const j=document.getElementById(`${P}-other-text`)?.value.trim();j&&A.push(j)}else{const j=U.getAttribute("data-label")||U.value;A.push(j)}}),A},l=o("ptw-hot"),n=o("ptw-confined"),p=o("ptw-height"),d=document.getElementById("ptw-hot-other-text")?.value.trim()||"",c=document.getElementById("ptw-confined-other-text")?.value.trim()||"",m=document.getElementById("ptw-height-other-text")?.value.trim()||"",u=()=>Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-row")).map(P=>{const A=P.querySelector(".ptw-team-member-name")?.value.trim();return A?{name:A}:null}).filter(Boolean),h=document.getElementById("ptw-workDescription"),f=document.getElementById("ptw-startDate"),x=document.getElementById("ptw-endDate");if(!h||!f||!x){Notification.error(this._t("module.ptw.notify.missingFormFields","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),e&&(e.disabled=!1,e.innerHTML=a);return}const b="",k="PTW",y=this.generateSequentialPTWId(""),C=this.currentEditId?AppState.appData.ptw.find(P=>P.id===this.currentEditId):null,z=document.getElementById("ptw-location"),I=document.getElementById("ptw-sublocation"),_=z?.value||"",D=z?.options[z?.selectedIndex]?.text||"",R=I?.value||"",F=I?.options[I?.selectedIndex]?.text||"",S={id:this.currentEditId||`${k}_${y}`,workType:"",workDescription:h.value.trim(),location:D||_,siteId:_,siteName:D,sublocation:F||R,sublocationId:R,sublocationName:F,startDate:(()=>{const P=f.value;return P&&Utils.dateTimeLocalToISO(P)||""})(),endDate:(()=>{const P=x.value;return P&&Utils.dateTimeLocalToISO(P)||""})(),status:C?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",approvals:this.normalizeApprovals(i),requiredPPE:typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],riskAssessment:(()=>{if(typeof RiskMatrix>"u")return{};try{const P=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector("#ptw-risk-matrix td.ring-2")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');if(P){const A=P.getAttribute("data-likelihood")||P.getAttribute("data-probability")||"",U=P.getAttribute("data-consequence")||P.getAttribute("data-severity")||"",j=P.textContent.trim()||P.querySelector(".risk-matrix-cell-value")?.textContent.trim()||"";return{likelihood:A,consequence:U,riskLevel:j}}}catch(P){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",P)}return{}})(),riskNotes:document.getElementById("ptw-risk-notes")?.value.trim()||"",authorizedParty:(()=>{const P=document.getElementById("ptw-authorizedParty-select"),A=document.getElementById("ptw-authorizedParty");return P&&P.value&&P.value!=="__custom__"?P.value.trim():A?A.value.trim():""})(),requestingParty:(()=>{const P=document.getElementById("ptw-requestingParty-select"),A=document.getElementById("ptw-requestingParty");return P&&P.value&&P.value!=="__custom__"?P.value.trim():A?A.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value.trim()||"",toolsList:document.getElementById("ptw-tools")?.value.trim()||"",teamMembers:u(),hotWorkDetails:l,hotWorkOther:d,confinedSpaceDetails:n,confinedSpaceOther:c,heightWorkDetails:p,heightWorkOther:m,electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:(()=>{const P=document.getElementById("ptw-closure-time")?.value;return P&&Utils.dateTimeLocalToISO(P)||""})(),closureReason:document.getElementById("ptw-closure-reason")?.value.trim()||"",closureApproval:{name1:document.getElementById("ptw-closure-approval-name-1")?.value.trim()||"",name2:document.getElementById("ptw-closure-approval-name-2")?.value.trim()||"",name3:document.getElementById("ptw-closure-approval-name-3")?.value.trim()||"",name4:document.getElementById("ptw-closure-approval-name-4")?.value.trim()||"",signature1:document.getElementById("ptw-closure-approval-signature-1")?.value.trim()||"",signature2:document.getElementById("ptw-closure-approval-signature-2")?.value.trim()||"",signature3:document.getElementById("ptw-closure-approval-signature-3")?.value.trim()||"",signature4:document.getElementById("ptw-closure-approval-signature-4")?.value.trim()||""},permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||C?.permitDisclaimer||"",createdAt:C?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),approvalCircuitOwnerId:this.formCircuitOwnerId||C?.approvalCircuitOwnerId||"__default__",approvalCircuitName:this.formCircuitName||C?.approvalCircuitName||""};if(this.updatePermitStatus(S),r&&(S.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),this.updateStatusField(S.status),S.startDate&&S.endDate){const P=this.parseDateTimeValue(S.startDate),A=this.parseDateTimeValue(S.endDate);if(P&&A&&A<=P){Notification.error(this._t("module.ptw.notify.endBeforeStart","\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621.")),this._isSubmitting=!1,e&&(e.disabled=!1,e.innerHTML=a);return}}if(!S.workDescription||!S.location||!S.status){Notification.error(this._t("module.ptw.notify.fillRequired","\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629")),this._isSubmitting=!1,e&&(e.disabled=!1,e.innerHTML=a);return}if(r&&this.formCircuitOwnerId==="__issuing_authorities__"&&(!S.approvals||S.approvals.length===0)&&this._extractPermitTypeFields(S).length>0){Notification.error("\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u0634\u062E\u0627\u0635 \u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D. \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Issuing Authorities) \u0623\u0648 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this._isSubmitting=!1,e&&(e.disabled=!1,e.innerHTML=a);return}try{if(this.currentEditId){const P=AppState.appData.ptw.findIndex(A=>A.id===this.currentEditId);if(P!==-1){const U=AppState.appData.ptw[P].status!=="\u0645\u063A\u0644\u0642",j=S.status==="\u0645\u063A\u0644\u0642"||S.closureStatus&&S.closureTime;AppState.appData.ptw[P]=S,S._wasClosedTransition=!!(U&&j)}}else AppState.appData.ptw.push(S),this.notifyPermitCreated(S);this.setPtwRegistryState(this.registryData,"handleSubmit.preBackground"),this.showList(),this._isSubmitting=!1,e&&(e.disabled=!1,e.innerHTML=a),Notification.info(this._t("module.ptw.notify.localSavedSyncing","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u062C\u0627\u0631\u064D \u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...")),Promise.allSettled([Promise.resolve().then(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}),this.currentEditId?this.updateRegistryEntry(S):this.addToRegistry(S),GoogleIntegration.autoSave("PTW",AppState.appData.ptw)]).then(P=>{const A=P[0]?.status==="rejected",U=P[1]?.status==="rejected",j=P[2],X=j?.status==="fulfilled"?j.value:null,it=!!(X&&X.success===!0);if(A&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",P[0]?.reason),U&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",P[1]?.reason),it)this.currentEditId?S._wasClosedTransition?Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permUpdateOk","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permAddOk","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"));else{const E=j?.status==="rejected"?j.reason?.message||String(j.reason||""):X?.message||"";Notification.warning(this._t("module.ptw.notify.cloudSyncFailed","\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629: ")+(E||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}this.triggerNotificationsUpdate(),this.updateKPIs();const v=document.getElementById("ptw-analysis-content");v&&v.style.display!=="none"&&(v.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())})}catch(P){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+P.message),this._isSubmitting=!1,e&&(e.disabled=!1,e.innerHTML=a)}},addTeamMemberRow(t=""){const e=document.getElementById("team-members-list");if(!e||!e.parentNode||!document.body.contains(e)){Utils.safeWarn("\u26A0\uFE0F addTeamMemberRow: container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const a=typeof Utils<"u"&&Utils&&typeof Utils.escapeHTML=="function"?Utils.escapeHTML(t||""):t||"",r=document.createElement("div");r.className="ptw-team-member-row flex items-center gap-3",r.innerHTML=`
            <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${a}">
            <button type="button" class="btn-icon btn-icon-danger" onclick="PTW.removeTeamMemberRow(this)" title="\u062D\u0630\u0641">
                <i class="fas fa-times"></i>
            </button>
        `;try{e.appendChild(r)}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 team member row:",i)}},removeTeamMemberRow(t){const e=t?.closest(".ptw-team-member-row"),a=document.getElementById("team-members-list");if(!(!e||!a))if(a.children.length>1)e.remove();else{const r=e.querySelector(".ptw-team-member-name");r&&(r.value="")}},updateManualStatusBtnSelection(t){if(!t)return;const e=t.closest(".modal-overlay")||document.body,a=e.querySelector("#manual-permit-status");a&&(a.value=t.value),e.querySelectorAll(".manual-status-btn").forEach(s=>{s.classList.remove("selected"),s.style.background="",s.style.borderColor="",s.style.color="",s.style.boxShadow="";const o=s.querySelector("i");o&&(o.style.color="")});const i=t.closest("label");if(i){i.classList.add("selected");const o={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{color:"#10b981",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{color:"#f59e0b",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{color:"#ef4444",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[t.value];if(o){i.style.setProperty("background",`${o.gradient}`,"important"),i.style.setProperty("border-color",`${o.color}`,"important"),i.style.setProperty("color","#ffffff","important"),i.style.setProperty("box-shadow",`0 8px 20px -4px ${o.shadow}`,"important");const l=i.querySelector("i");l&&l.style.setProperty("color","#ffffff","important")}}},addApproval(){const t=document.getElementById("approvals-tbody");if(!t||!t.parentNode||!document.body.contains(t)){Utils.safeWarn("\u26A0\uFE0F addApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const e=t.children.length,a=document.createElement("tr");a.setAttribute("data-approval-index",e),a.setAttribute("data-required","true"),a.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-role-${e}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-approver-${e}">
            </td>
            <td>
                <select class="form-input" id="approval-status-${e}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="approval-date-${e}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="approval-comments-${e}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeApproval(${e})" class="btn-icon btn-icon-danger" title="\u062D\u0630">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{t.appendChild(a)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 approval row:",r)}},removeApproval(t){const e=document.getElementById("approvals-tbody");if(!e)return;const a=e.querySelector(`tr[data-approval-index="${t}"]`);a&&(a.remove(),Array.from(e.children).forEach((r,i)=>{r.setAttribute("data-approval-index",i)}))},addClosureApproval(){const t=document.getElementById("closure-approvals-tbody");if(!t||!t.parentNode||!document.body.contains(t)){Utils.safeWarn("\u26A0\uFE0F addClosureApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const e=t.children.length,a=document.createElement("tr");a.setAttribute("data-closure-approval-index",e),a.setAttribute("data-required","true"),a.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-role-${e}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-approver-${e}">
            </td>
            <td>
                <select class="form-input" id="closure-approval-status-${e}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="closure-approval-date-${e}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="closure-approval-comments-${e}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeClosureApproval(${e})" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{t.appendChild(a)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 closure approval row:",r)}},removeClosureApproval(t){const e=document.getElementById("closure-approvals-tbody");if(!e)return;const a=e.querySelector(`tr[data-closure-approval-index="${t}"]`);a&&(a.remove(),Array.from(e.children).forEach((r,i)=>{r.setAttribute("data-closure-approval-index",i)}))},setupDisclaimerFontControls(){const t=document.getElementById("ptw-permit-disclaimer-text"),e=document.getElementById("ptw-disclaimer-font-decrease"),a=document.getElementById("ptw-disclaimer-font-increase"),r=document.getElementById("ptw-disclaimer-font-reset"),i=document.getElementById("ptw-disclaimer-font-size-display");if(!t||!e||!a||!r||!i)return;const s=15,o=10,l=24,n=1;let p=parseInt(t.style.fontSize)||s;isNaN(p)&&(p=s);const d=c=>{p=Math.max(o,Math.min(l,c)),t.style.fontSize=p+"px",i.textContent=p;try{localStorage.setItem("ptw_disclaimer_font_size",p.toString())}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",m)}};try{const c=localStorage.getItem("ptw_disclaimer_font_size");if(c){const m=parseInt(c);isNaN(m)||(p=m,d(p))}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",c)}d(p),e.addEventListener("click",()=>{d(p-n),e.classList.add("animate-pulse"),setTimeout(()=>e.classList.remove("animate-pulse"),200)}),a.addEventListener("click",()=>{d(p+n),a.classList.add("animate-pulse"),setTimeout(()=>a.classList.remove("animate-pulse"),200)}),r.addEventListener("click",()=>{d(s),r.classList.add("animate-spin"),setTimeout(()=>r.classList.remove("animate-spin"),500)})},async editPTW(t){let e=AppState.appData.ptw.find(a=>a.id===t);if(!e&&this.registryData){const a=this.registryData.find(r=>r.id===t||r.permitId===t);a&&a.isManualEntry===!0&&(e={id:a.permitId,workType:Array.isArray(a.permitType)?a.permitTypeDisplay||a.permitType.join("\u060C "):a.permitType||a.permitTypeDisplay,location:a.location,siteName:a.location,sublocation:a.sublocation,sublocationName:a.sublocation,startDate:a.openDate,endDate:a.timeTo,status:String(a.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:a.requestingParty,authorizedParty:a.authorizedParty,workDescription:a.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:a.createdAt,updatedAt:a.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:a.teamMembers||[],teamMembersText:a.teamMembersText||"",hotWorkDetails:a.hotWorkDetails||[],hotWorkOther:a.hotWorkOther||"",confinedSpaceDetails:a.confinedSpaceDetails||[],confinedSpaceOther:a.confinedSpaceOther||"",heightWorkDetails:a.heightWorkDetails||[],heightWorkOther:a.heightWorkOther||"",excavationLength:a.excavationLength||"",excavationWidth:a.excavationWidth||"",excavationDepth:a.excavationDepth||"",soilType:a.soilType||"",electricalWorkType:a.electricalWorkType||"",coldWorkType:a.coldWorkType||"",otherWorkType:a.otherWorkType||"",preStartChecklist:a.preStartChecklist||!1,lotoApplied:a.lotoApplied||!1,governmentPermits:a.governmentPermits||!1,riskAssessmentAttached:a.riskAssessmentAttached||!1,gasTesting:a.gasTesting||!1,mocRequest:a.mocRequest||!1,ppeNotes:a.ppeNotes||"",riskLikelihood:a.riskLikelihood||"",riskConsequence:a.riskConsequence||"",riskScore:a.riskScore||"",riskLevel:a.riskLevel||"",riskNotes:a.riskNotes||"",manualApprovals:a.manualApprovals||[],manualApprovalsText:a.manualApprovalsText||"",manualClosureApprovals:a.manualClosureApprovals||[],manualClosureApprovalsText:a.manualClosureApprovalsText||"",closureTime:a.closureTime||"",closureDate:a.closureDate||"",closureReason:a.closureReason||"",paperPermitNumber:a.paperPermitNumber||"",equipment:a.equipment||"",tools:a.tools||"",toolsList:a.toolsList||"",supervisor1:a.supervisor1||"",supervisor2:a.supervisor2||""})}e&&await this.showForm(e)},async viewPTW(t){let e=AppState.appData.ptw.find(y=>y.id===t);if(!e&&this.registryData){const y=this.registryData.find(C=>C.id===t||C.permitId===t);y&&y.isManualEntry===!0&&(e={id:y.permitId,workType:Array.isArray(y.permitType)?y.permitTypeDisplay||y.permitType.join("\u060C "):y.permitType||y.permitTypeDisplay,location:y.location,siteName:y.location,sublocation:y.sublocation,sublocationName:y.sublocation,startDate:y.openDate,endDate:y.timeTo,status:String(y.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:y.requestingParty,authorizedParty:y.authorizedParty,workDescription:y.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:y.createdAt,updatedAt:y.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:y.teamMembers||[],hotWorkDetails:y.hotWorkDetails||[],hotWorkOther:y.hotWorkOther||"",confinedSpaceDetails:y.confinedSpaceDetails||[],confinedSpaceOther:y.confinedSpaceOther||"",heightWorkDetails:y.heightWorkDetails||[],heightWorkOther:y.heightWorkOther||"",excavationLength:y.excavationLength||"",excavationWidth:y.excavationWidth||"",excavationDepth:y.excavationDepth||"",soilType:y.soilType||"",electricalWorkType:y.electricalWorkType||"",coldWorkType:y.coldWorkType||"",otherWorkType:y.otherWorkType||"",ppeNotes:y.ppeNotes||"",riskLikelihood:y.riskLikelihood||"",riskConsequence:y.riskConsequence||"",riskScore:y.riskScore||"",riskLevel:y.riskLevel||"",riskNotes:y.riskNotes||"",manualApprovals:y.manualApprovals||[],manualClosureApprovals:y.manualClosureApprovals||[],closureDate:y.closureDate||"",closureReason:y.closureReason||"",paperPermitNumber:y.paperPermitNumber||"",equipment:y.equipment||"",tools:y.tools||"",supervisor1:y.supervisor1||"",supervisor2:y.supervisor2||""})}if(!e)return;const a=document.createElement("div");a.className="modal-overlay";const r=e.isManualEntry===!0,i=r?[]:this.normalizeApprovals(e.approvals||[]),s=Array.isArray(e.teamMembers)?e.teamMembers:[],o=s.length>0?`<div class="ptw-permit-details-team-grid">
                ${s.map(y=>`<span class="ptw-permit-details-team-chip"><i class="fas fa-user-check" aria-hidden="true"></i>${Utils.escapeHTML(y.name||"-")}</span>`).join("")}
               </div>`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u0631\u064A\u0642 \u0645\u062D\u062F\u062F</p>',l=Array.isArray(e.hotWorkDetails)?e.hotWorkDetails:[],n=e.hotWorkOther||"",p=Array.isArray(e.confinedSpaceDetails)?e.confinedSpaceDetails:[],d=e.confinedSpaceOther||"",c=Array.isArray(e.heightWorkDetails)?e.heightWorkDetails:[],m=e.heightWorkOther||"",u=(y,C,z)=>{const I=C.length>0?C.map(R=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(R)}</span>`).join(""):"",_=z?`<p class="text-gray-700 mt-2"><strong>\u0623\u062E\u0631\u0649:</strong> ${Utils.escapeHTML(z)}</p>`:"";return`
                <div class="ptw-permit-details-work-card">
                    <label>${y}:</label>
                    <div class="ptw-permit-details-work-value">
                        ${I||_?`${I}${_}`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F</p>'}
                    </div>
                </div>
            `},h="",f="",x="",b=e.status==="\u0645\u063A\u0644\u0642"?"\u0645\u063A\u0644\u0642":"\u063A\u064A\u0631 \u0645\u063A\u0644\u0642",k=e.endDate?Utils.formatDate(e.endDate):"-";a.classList.add("ptw-permit-details-overlay"),a.innerHTML=`
            <style>
                .ptw-permit-details-overlay {
                    --ptwd-navy:#102a43; --ptwd-blue:#2563eb; --ptwd-cyan:#0891b2;
                    --ptwd-green:#15803d; --ptwd-orange:#ea580c; --ptwd-violet:#6d28d9;
                    --ptwd-ink:#172033; --ptwd-muted:#64748b;
                    padding:18px;
                    background:radial-gradient(circle at 14% 10%,rgba(14,165,233,.2),transparent 28%),rgba(2,8,23,.68);
                }
                .ptw-permit-details-shell {
                    width:min(980px,100%); max-width:980px!important; max-height:95vh; overflow:hidden;
                    border:1px solid rgba(125,211,252,.5); border-radius:24px; background:#f8fbff;
                    box-shadow:0 30px 90px rgba(2,8,23,.4),0 0 0 6px rgba(255,255,255,.07);
                    color:var(--ptwd-ink); direction:rtl;
                }
                .ptw-permit-details-header {
                    position:relative; display:flex; align-items:center; justify-content:center; min-height:112px;
                    padding:20px 82px; border-bottom:4px solid #22d3ee;
                    background:linear-gradient(125deg,#0f172a 0%,#173d6c 58%,#0369a1 100%); overflow:hidden;
                }
                .ptw-permit-details-header::after { content:''; position:absolute; inset:auto -8% -72px; height:118px; border-radius:50%; background:rgba(56,189,248,.12); }
                .ptw-permit-details-header .modal-title { position:relative; z-index:1; margin:0; color:#fff!important; font-size:clamp(1.25rem,2.5vw,1.65rem); font-weight:850; }
                .ptw-permit-details-header .modal-title::before {
                    content:'PTW'; display:block; width:max-content; margin:0 auto 5px; padding:3px 11px;
                    border:1px solid rgba(255,255,255,.3); border-radius:999px; color:#a5f3fc;
                    background:rgba(15,23,42,.25); font-size:.62rem; font-weight:850; letter-spacing:.16em;
                }
                .ptw-permit-details-close {
                    position:absolute; z-index:2; top:30px; left:28px; display:inline-flex; align-items:center; justify-content:center;
                    width:42px; height:42px; padding:0; border:1px solid rgba(255,255,255,.55); border-radius:50%;
                    color:#fff; background:rgba(255,255,255,.12); backdrop-filter:blur(6px); cursor:pointer;
                    transition:transform .18s ease,background-color .18s ease,color .18s ease;
                }
                .ptw-permit-details-close:hover { transform:rotate(7deg); color:var(--ptwd-navy); background:#fff; }
                .ptw-permit-details-close:focus-visible { outline:3px solid rgba(34,211,238,.45); outline-offset:3px; }
                .ptw-permit-details-body {
                    max-height:calc(95vh - 190px); overflow-y:auto; padding:24px 26px 28px;
                    background:linear-gradient(180deg,#eef7ff 0,#f8fbff 170px,#fff 100%); scrollbar-width:thin; scrollbar-color:#94a3b8 transparent;
                }
                .ptw-permit-details-stack { display:grid; gap:16px; }
                .ptw-permit-details-info {
                    display:grid!important; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px!important;
                    padding:14px; border:1px solid #bfdbfe; border-radius:18px; background:rgba(255,255,255,.9);
                    box-shadow:0 10px 28px rgba(30,64,175,.08);
                }
                .ptw-permit-details-info>div,.ptw-permit-details-mini-grid>div {
                    min-width:0; padding:11px 13px; border:1px solid #e2e8f0; border-radius:11px; background:#f8fafc;
                }
                .ptw-permit-details-info>div:nth-child(4n+1),.ptw-permit-details-info>div:nth-child(4n+2) { background:#eff6ff; border-color:#dbeafe; }
                .ptw-permit-details-info label,.ptw-permit-details-mini-grid label {
                    display:block; margin-bottom:4px; color:var(--ptwd-muted)!important; font-size:.73rem!important; font-weight:750!important;
                }
                .ptw-permit-details-info p,.ptw-permit-details-mini-grid p {
                    margin:0; color:var(--ptwd-ink)!important; font-size:.94rem; font-weight:650; line-height:1.55; overflow-wrap:anywhere;
                }
                .ptw-permit-details-info .badge { display:inline-flex; margin-top:2px; padding:5px 11px; border-radius:999px; font-weight:800; }
                .ptw-permit-details-description {
                    padding:15px 17px; border:1px solid #fed7aa; border-right:5px solid var(--ptwd-orange); border-radius:14px;
                    background:linear-gradient(135deg,#fff7ed,#fffbeb); box-shadow:0 7px 18px rgba(234,88,12,.07);
                }
                .ptw-permit-details-description label { display:block; margin-bottom:5px; color:#9a3412!important; font-size:.76rem!important; font-weight:800!important; }
                .ptw-permit-details-description p { margin:0; color:var(--ptwd-ink)!important; font-size:1rem; font-weight:650; line-height:1.65; }
                .ptw-permit-details-stack>div:nth-child(2) {
                    padding:15px 17px; border:1px solid #fed7aa; border-right:5px solid var(--ptwd-orange); border-radius:14px;
                    background:linear-gradient(135deg,#fff7ed,#fffbeb); box-shadow:0 7px 18px rgba(234,88,12,.07);
                }
                .ptw-permit-details-stack>div:nth-child(2) label { display:block; margin-bottom:5px; color:#9a3412!important; font-size:.76rem!important; font-weight:800!important; }
                .ptw-permit-details-stack>div:nth-child(2) p { margin:0; color:var(--ptwd-ink)!important; font-size:1rem; font-weight:650; line-height:1.65; }
                .ptw-permit-details-section { padding:17px 18px; border:1px solid #dbe4f0!important; border-radius:16px; background:#fff; box-shadow:0 8px 22px rgba(15,23,42,.06); }
                .ptw-permit-details-section.team { border-top:4px solid var(--ptwd-green)!important; background:linear-gradient(160deg,#fff,#f0fdf4); }
                .ptw-permit-details-section.work { border-top:4px solid var(--ptwd-violet)!important; background:linear-gradient(160deg,#fff,#faf5ff); }
                .ptw-permit-details-section.closure { border-top:4px solid var(--ptwd-cyan)!important; background:linear-gradient(160deg,#fff,#ecfeff); }
                .ptw-permit-details-section.approvals { border-top:4px solid var(--ptwd-blue)!important; }
                .ptw-permit-details-section-title { margin:0 0 13px!important; color:var(--ptwd-navy)!important; font-size:1.05rem!important; font-weight:850!important; }
                .ptw-permit-details-stack>.border-t {
                    padding:17px 18px!important; border:1px solid #dbe4f0!important; border-top:4px solid var(--ptwd-blue)!important;
                    border-radius:16px; background:#fff; box-shadow:0 8px 22px rgba(15,23,42,.06);
                }
                .ptw-permit-details-stack>.border-t:nth-child(3) { border-top-color:var(--ptwd-green)!important; background:linear-gradient(160deg,#fff,#f0fdf4); }
                .ptw-permit-details-stack>.border-t:nth-child(4) { border-top-color:var(--ptwd-violet)!important; background:linear-gradient(160deg,#fff,#faf5ff); }
                .ptw-permit-details-stack>.border-t:nth-child(8) { border-top-color:var(--ptwd-cyan)!important; background:linear-gradient(160deg,#fff,#ecfeff); }
                .ptw-permit-details-stack>.border-t>h3 { margin:0 0 13px!important; color:var(--ptwd-navy)!important; font-size:1.05rem!important; font-weight:850!important; }
                .ptw-permit-details-stack>.border-t .grid { gap:10px!important; }
                .ptw-permit-details-stack>.border-t .grid>div:not(.ptw-permit-details-work-card) { min-width:0; padding:10px 12px; border:1px solid #e2e8f0; border-radius:10px; background:rgba(255,255,255,.82); }
                .ptw-permit-details-stack>.border-t label { display:block; margin-bottom:4px; color:var(--ptwd-muted)!important; font-size:.73rem!important; font-weight:750!important; }
                .ptw-permit-details-stack>.border-t p { margin:0; color:var(--ptwd-ink)!important; line-height:1.55; }
                .ptw-permit-details-stack>.border-t:has(>h3:last-child),
                .ptw-permit-details-stack>.border-t:has(>.grid):not(:has(>.grid>*)) { display:none; }
                .ptw-permit-details-team-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
                .ptw-permit-details-team-chip { display:flex; align-items:center; gap:7px; padding:9px 11px; border:1px solid #bbf7d0; border-radius:10px; color:#166534; background:#f0fdf4; font-size:.84rem; font-weight:700; }
                .ptw-permit-details-work-grid { display:grid!important; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px!important; }
                .ptw-permit-details-work-card { min-width:0; padding:12px 13px; border:1px solid #e9d5ff; border-radius:11px; background:rgba(255,255,255,.86); }
                .ptw-permit-details-work-card label { display:block; margin-bottom:5px; color:#6b21a8; font-size:.75rem; font-weight:800; }
                .ptw-permit-details-work-value { color:var(--ptwd-ink); font-size:.88rem; }
                .ptw-permit-details-mini-grid { display:grid!important; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px!important; margin-top:10px!important; }
                .ptw-permit-details-excavation { grid-template-columns:repeat(4,minmax(0,1fr))!important; }
                .ptw-permit-details-footer { padding:15px 20px; border-top:1px solid #dbe4f0; background:linear-gradient(180deg,#f8fafc,#eef2f7); }
                .ptw-permit-details-footer .btn-primary,.ptw-permit-details-footer .btn-secondary { min-height:46px; border-radius:11px; font-weight:750; box-shadow:0 6px 15px rgba(15,23,42,.12); }
                .ptw-permit-details-footer .btn-primary { background:linear-gradient(135deg,#2563eb,#1d4ed8); }
                .ptw-permit-details-shell .table-wrapper { border:1px solid #dbe4f0; border-radius:12px; overflow:auto; }
                .ptw-permit-details-shell .data-table { margin:0; }
                .ptw-permit-details-shell .data-table thead th { background:#e0f2fe; color:#0c4a6e; }
                @media (max-width:720px) {
                    .ptw-permit-details-overlay { padding:7px; align-items:flex-end; }
                    .ptw-permit-details-shell { max-height:97vh; border-radius:20px 20px 10px 10px; }
                    .ptw-permit-details-header { min-height:102px; padding:17px 62px 17px 20px; }
                    .ptw-permit-details-close { top:25px; left:15px; width:38px; height:38px; }
                    .ptw-permit-details-body { max-height:calc(97vh - 174px); padding:15px 13px 20px; }
                    .ptw-permit-details-info,.ptw-permit-details-work-grid,.ptw-permit-details-mini-grid,.ptw-permit-details-excavation,.ptw-permit-details-team-grid { grid-template-columns:1fr!important; }
                    .ptw-permit-details-section { padding:14px 13px; }
                }
                @media (prefers-reduced-motion:reduce) { .ptw-permit-details-close { transition:none; } }
            </style>
            <div class="modal-content ptw-permit-details-shell">
                <div class="modal-header modal-header-centered ptw-permit-details-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</h2>
                    <button class="modal-close ptw-permit-details-close" onclick="this.closest('.modal-overlay').remove()" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ptw-permit-details-body">
                    <div class="space-y-4 ptw-permit-details-stack">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ptw-permit-details-info">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.workType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.siteName||e.location||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.sublocationName||e.sublocation||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621:</label>
                                <p class="text-gray-800">${e.startDate?Utils.formatDate(e.startDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                                <p class="text-gray-800">${e.endDate?Utils.formatDate(e.endDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${this.getStatusBadgeClass(e.status)}">
                                    ${e.status||"-"}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.authorizedParty||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.requestingParty||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.equipment||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.tools||e.toolsList||"-")}</p>
                            </div>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(e.workDescription||"")}</p>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0639\u0645\u0644</h3>
                            ${o}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${u("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",l,n)}
                                ${u("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",p,d)}
                                ${u("\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",c,m)}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.electricalWorkType||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.coldWorkType||"-")}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.otherWorkType||"-")}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0637\u0648\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.excavationLength||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0631\u0636 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.excavationWidth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0645\u0642 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.excavationDepth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.soilType||"-")}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                ${h}
                            </div>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</h3>
                            ${f}
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
                                    <p class="text-gray-800">${b}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${k}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(e.closureReason||"-")}</p>
                                </div>
                            </div>
                        </div>
                        ${r?`
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A
                            </h3>
                            ${(()=>{const y=e.manualApprovals||[];return y.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                ${y.map(C=>`
                                                    <tr>
                                                        <td>${Utils.escapeHTML(C.role||"")}</td>
                                                        <td>${Utils.escapeHTML(C.name||"-")}</td>
                                                        <td>${Utils.escapeHTML(C.signature||"-")}</td>
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
                            ${(()=>{const y=e.manualClosureApprovals||[];return y.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                ${y.map(C=>`
                                                    <tr>
                                                        <td>${Utils.escapeHTML(C.role||"")}</td>
                                                        <td>${Utils.escapeHTML(C.name||"-")}</td>
                                                        <td>${Utils.escapeHTML(C.signature||"-")}</td>
                                                    </tr>
                                                `).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                `})()}
                        </div>
                        `:""}
                        ${i.length>0?`
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
                                        ${i.map((y,C)=>{const z=y.status==="approved"?"success":y.status==="rejected"?"danger":"warning",I=y.status==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":y.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",_=(y.candidates||[]).map(S=>`
                                                <option value="${Utils.escapeHTML(S.id||"")}" ${S.id&&S.id===y.approverId?"selected":""}>
                                                    ${Utils.escapeHTML(S.name||S.email||"")}
                                                    ${S.email?` - ${Utils.escapeHTML(S.email)}`:""}
                                                </option>
                                            `).join(""),D=y.status==="pending"&&_?`
                                                    <div class="flex items-center gap-2 mb-2">
                                                        <select id="approval-assign-${e.id}-${C}" class="form-input">
                                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                                                            ${_}
                                                        </select>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.assignApproval('${e.id}', ${C})">
                                                            \u062A\u0639\u064A\u064A\u0646
                                                        </button>
                                                    </div>
                                                  `:"",R=y.status==="pending"?`<div class="flex flex-col gap-2">
                                                        ${D}
                                                        <button class="btn-primary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.handleApprovalAction('${e.id}', ${C}, 'approved')">
                                                            \u0627\u0639\u062A\u0645\u0627\u062F
                                                        </button>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px; background-color: #ef4444; border-color: #ef4444; color: #fff;" onclick="PTW.handleApprovalAction('${e.id}', ${C}, 'rejected')">
                                                            \u0631\u0641\u0636
                                                        </button>
                                                   </div>`:"",F=Array.isArray(y.history)&&y.history.length>0?`<div class="mt-2 space-y-1">
                                                        ${y.history.slice(-4).reverse().map(S=>`
                                                            <div class="text-xs text-gray-500 flex items-center gap-2">
                                                                <i class="fas fa-history text-gray-400"></i>
                                                                <span>${Utils.escapeHTML(S.action==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":S.action==="rejected"?"\u0631\u0641\u0636":S.action==="assigned"?"\u062A\u0639\u064A\u064A\u0646":S.action||"-")}</span>
                                                                <span>\u2022</span>
                                                                <span>${S.performedBy?.name?Utils.escapeHTML(S.performedBy.name):S.assignedBy?.name?Utils.escapeHTML(S.assignedBy.name):"-"}</span>
                                                                <span>\u2022</span>
                                                                <span>${Utils.formatDateTime(S.timestamp)}</span>
                                                            </div>
                                                        `).join("")}
                                                   </div>`:"";return`
                                            <tr>
                                                <td>${Utils.escapeHTML(y.role||"")}</td>
                                                <td>${Utils.escapeHTML(y.approver||"")}</td>
                                                <td>
                                                        <span class="badge badge-${z}">
                                                            ${I}
                                                    </span>
                                                </td>
                                                <td>${y.date?Utils.formatDate(y.date):"-"}</td>
                                                <td>
                                                    ${Utils.escapeHTML(y.comments||"")}
                                                    ${F}
                                                </td>
                                                <td>${R}</td>
                                            </tr>
                                            `}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered ptw-permit-details-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="PTW.exportPDF('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631/\u0637\u0628\u0627\u0639\u0629 PDF
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",y=>{y.target===a&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&a.remove()}),setTimeout(()=>{a.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="approved"]').forEach(I=>{const _=I.getAttribute("onclick");if(_){const D=_.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'approved'\)/);D&&D[1]&&D[2]&&(I.removeAttribute("onclick"),I.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.handleApprovalAction(D[1],parseInt(D[2]),"approved")}))}}),a.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="rejected"]').forEach(I=>{const _=I.getAttribute("onclick");if(_){const D=_.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'rejected'\)/);D&&D[1]&&D[2]&&(I.removeAttribute("onclick"),I.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.handleApprovalAction(D[1],parseInt(D[2]),"rejected")}))}}),a.querySelectorAll('[onclick*="assignApproval"]').forEach(I=>{const _=I.getAttribute("onclick");if(_){const D=_.match(/assignApproval\('([^']+)',\s*(\d+)\)/);D&&D[1]&&D[2]&&(I.removeAttribute("onclick"),I.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.assignApproval(D[1],parseInt(D[2]))}))}})},50)},async handleApprovalAction(t,e,a){const r=`approval_${t}_${e}`;if(this[`_processing_${r}`]){Notification.info(this._t("module.ptw.notify.approvalProcessing","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const i=AppState.appData.ptw.find(n=>n.id===t);if(!i){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}i.approvals=this.normalizeApprovals(i.approvals||[]);const s=i.approvals[e];if(!s){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}if(i.status==="\u0645\u063A\u0644\u0642"){Notification.warning(this._t("module.ptw.notify.cannotEditClosed","\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0645\u063A\u0644\u0642"));return}if(s.status!=="pending"){Notification.info(this._t("module.ptw.notify.approvalDone","\u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0627\u0644\u0641\u0639\u0644"));return}const o=AppState.currentUser?.email?AppState.currentUser.email.toLowerCase():"";if(s.approverEmail&&o&&s.approverEmail.toLowerCase()!==o&&AppState.currentUser?.role!=="admin"){Notification.warning(this._t("module.ptw.notify.otherUser","\u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u062C\u0647 \u0625\u0644\u0649 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631."));return}if(a==="approved"){const n=i.approvals.filter((d,c)=>c<e&&d.required!==!1);if(n.some(d=>d.status!=="approved")){const d=this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),c=this._t("module.ptw.common.listSep","\u060C "),m=n.filter(u=>u.status!=="approved").map(u=>this.approvalRoleLabel(u.role||d)).join(c);Notification.warning(this._t("module.ptw.notify.prevApprovals","\u064A\u062C\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0623\u0648\u0644\u0627\u064B: {roles}").replace(/\{roles\}/g,m));return}}this[`_processing_${r}`]=!0;let l=s.comments||"";if(a==="rejected"){const n=prompt(this._t("module.ptw.approval.rejectPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):"),l);if(n===null){this[`_processing_${r}`]=!1;return}l=n.trim()}Loading.show();try{if(s.status=a==="approved"?"approved":"rejected",s.approved=a==="approved",s.rejected=a==="rejected",s.date=new Date().toISOString(),s.comments=l,AppState.currentUser&&(s.approver=AppState.currentUser.name||s.approver||"",s.approverEmail=AppState.currentUser.email||s.approverEmail||"",s.approverId=AppState.currentUser.id||s.approverId||""),s.history=Array.isArray(s.history)?s.history:[],s.history.push(ApprovalCircuits.buildHistoryEntry(a==="approved"?"approved":"rejected",{performedBy:ApprovalCircuits.buildUserSnapshot(AppState.currentUser),comments:l,status:s.status,timestamp:new Date().toISOString()})),this.updatePermitStatus(i),i.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),GoogleIntegration.autoSave("PTW",AppState.appData.ptw).catch(c=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",c)}),a==="approved"){const c=this.getNextPendingApproval(i.approvals);if(i.status==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647")Notification.success(this._t("module.ptw.notify.permAllApproved","\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0646\u0647\u0627\u0626\u064A \u0628\u0639\u062F \u0645\u0648\u0627\u0641\u0642\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629."));else{const m=this.approvalRoleLabel(s.role);if(Notification.success(this._t("module.ptw.notify.stageApproved",'\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0631\u062D\u0644\u0629 "{r}".').replace(/\{r\}/g,m)),c&&c.role){const u=this.approvalRoleLabel(c.role);Notification.info(this._t("module.ptw.notify.nextRole","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: {r}").replace(/\{r\}/g,u))}else Notification.info(this._t("module.ptw.notify.allStages","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627."))}}else{const c=this.approvalRoleLabel(s.role);Notification.error(this._t("module.ptw.notify.rejectedBy",'\u062A\u0645 \u0631\u0641\u0636 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 \u0642\u0628\u0644 "{r}".').replace(/\{r\}/g,c)),l&&Notification.info(this._t("module.ptw.notify.rejectionReason","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: {c}").replace(/\{c\}/g,l))}this.triggerNotificationsUpdate(),this.loadPTWList();const n=document.getElementById("ptw-analysis-content");n&&n.style.display!=="none"&&(n.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const p=document.getElementById("ptw-approvals-content");p&&p.style.display!=="none"&&setTimeout(()=>{this.refreshApprovalsContent()},300);const d=document.querySelector(".modal-overlay");d&&(d.remove(),setTimeout(()=>{this.viewPTW(t)},100))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",n),Notification.error(this._t("module.ptw.notify.approvalUpdateErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{this[`_processing_${r}`]=!1,Loading.hide()}},async assignApproval(t,e){const a=AppState.appData.ptw.find(l=>l.id===t);if(!a){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}a.approvals=this.normalizeApprovals(a.approvals||[]);const r=a.approvals[e];if(!r){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const i=document.getElementById(`approval-assign-${t}-${e}`);if(!i){Notification.error(this._t("module.ptw.notify.cannotFindAssignee","\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u062E\u0627\u0646\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646"));return}const s=i.value;if(!s){Notification.warning(this._t("module.ptw.notify.selectApprover","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."));return}const o=ApprovalCircuits.getUserById(s);if(!o){Notification.error(this._t("module.ptw.notify.userNotInSystem","\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645."));return}Loading.show();try{r.approverId=o.id||o.email||"",r.approver=o.name||o.email||"",r.approverEmail=o.email||"",r.assignedAt=new Date().toISOString(),r.assignedBy=ApprovalCircuits.buildUserSnapshot(AppState.currentUser),r.history=Array.isArray(r.history)?r.history:[],r.history.push(ApprovalCircuits.buildHistoryEntry("assigned",{assignedBy:r.assignedBy,assignedTo:ApprovalCircuits.buildUserSnapshot(o)})),this.updatePermitStatus(a),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Notification.success(this._t("module.ptw.notify.assignedTo","\u062A\u0645 \u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u0644\u0649 {name}.").replace(/\{name\}/g,r.approver||"")),this.triggerNotificationsUpdate(),this.loadPTWList();const l=document.getElementById("ptw-analysis-content");l&&l.style.display!=="none"&&(l.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const n=document.querySelector(".modal-overlay");n&&(n.remove(),this.viewPTW(t))}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",l),Notification.error(this._t("module.ptw.notify.assignErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{Loading.hide()}},async deletePTW(t){if(confirm(this._t("module.ptw.notify.deletePtwShort","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F"))){Loading.show();try{await this.removeFromRegistry(t),AppState.appData.ptw=AppState.appData.ptw.filter(a=>a.id!==t),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Loading.hide(),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")),this.updateKPIs(),this.loadPTWList(),this.triggerNotificationsUpdate();const e=document.getElementById("ptw-analysis-content");e&&e.style.display!=="none"&&(e.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(e){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+e.message),submitBtn&&(submitBtn.disabled=!1,submitBtn.innerHTML=originalText)}}},async exportPDF(t){try{Loading.show();const e=await this.buildPermitExportPayload(t);if(Loading.hide(),!e){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(e.isManualEntry&&e.exportReview&&!e.exportReview.ok&&Utils.safeWarn("\u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A \u0628\u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629:",e.exportReview.failed),Loading.show(this._t("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 PDF...")),!await this._ensurePermitPdfLibs_()){Notification.error(this._t("module.ptw.notify.pdfLibsError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"));return}await this._downloadPermitHtmlAsPdf(e.html,e.fileName)?Notification.success(this._t("module.ptw.notify.pdfDownloadOk","\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D PDF \u0628\u0646\u062C\u0627\u062D")):e.isManualEntry&&e.printHtml?(Notification.warning("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629. \u0627\u062E\u062A\u0631 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0623\u0648 \xABMicrosoft Print to PDF\xBB."),this.openPermitPrintWindow(e.printHtml)):Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF"))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e);const a=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(e?.message||a))}finally{Loading.hide()}},initMapFilters(){this.setupMapSettingsEventListeners(),["ptw-map-filter-status","ptw-map-filter-type"].forEach(a=>{const r=document.getElementById(a);if(r&&r.parentNode){const i=r.cloneNode(!0);r.parentNode.replaceChild(i,r),i.addEventListener("change",()=>this.updateMapUI())}});const t=(a,r)=>{const i=document.getElementById(a);if(i&&i.parentNode){const s=i.cloneNode(!0);i.parentNode.replaceChild(s,i),s.addEventListener("click",()=>this.switchMapType(r))}};t("ptw-map-type-normal","normal"),t("ptw-map-type-satellite","satellite"),t("ptw-map-type-terrain","terrain");const e=document.getElementById("ptw-map-fullscreen-btn");if(e&&e.parentNode){const a=e.cloneNode(!0);e.parentNode.replaceChild(a,e),a.addEventListener("click",()=>this.toggleFullscreen())}},updateMapUI(){this.currentTab==="map"&&this.updateMapMarkers()},getMarkerColor(t){switch(t){case"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":return"#10b981";case"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":return"#3b82f6";case"\u0645\u063A\u0644\u0642":return"#6b7280";case"\u0645\u0631\u0641\u0648\u0636":return"#ef4444";default:return"#f59e0b"}},createMapPopup(t){const e=Utils.escapeHTML;return`
            <div class="ptw-map-popup p-2" style="min-width: 200px; text-align: right;">
                <h4 class="font-bold text-gray-800 mb-1 border-b pb-1 text-sm">${e(t.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h4>
                <div class="text-xs text-gray-600 space-y-1 my-2">
                    <div class="flex justify-between"><span>${e(t.siteName||t.location||"-")}</span> <span class="font-semibold text-gray-500">:\u0627\u0644\u0645\u0648\u0642\u0639</span></div>
                    <div class="flex justify-between"><span>${t.startDate?Utils.formatDate(t.startDate):"-"}</span> <span class="font-semibold text-gray-500">:\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span></div>
                    <div class="flex justify-between items-center">
                        <span class="badge badge-${this.getStatusBadgeClass(t.status)} px-1 py-0 text-[10px]">${t.status}</span>
                        <span class="font-semibold text-gray-500">:\u0627\u0644\u062D\u0627\u0644\u0629</span> 
                    </div>
                </div>
                <div class="mt-2 text-center pt-2 border-t border-gray-100">
                    <button onclick="PTW.viewPTW('${t.id}')" class="text-primary-600 hover:text-primary-800 text-xs font-bold transition-colors">
                        \u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                    </button>
                </div>
            </div>
        `},switchMapType(t){if(!this.mapInstance)return;this.currentMapType=t;const e=document.getElementById("ptw-map-type-normal"),a=document.getElementById("ptw-map-type-satellite"),r=document.getElementById("ptw-map-type-terrain");if([e,a,r].forEach(i=>{if(i)try{i.classList.remove("bg-blue-500","text-white","shadow-sm"),i.classList.add("text-gray-700","hover:bg-gray-100")}catch{}}),this.mapType==="google")try{let i;switch(t){case"satellite":if(i=google.maps.MapTypeId.SATELLITE,a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;case"terrain":if(i=google.maps.MapTypeId.TERRAIN,r)try{r.classList.add("bg-blue-500","text-white","shadow-sm"),r.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;default:if(i=google.maps.MapTypeId.ROADMAP,e)try{e.classList.add("bg-blue-500","text-white","shadow-sm"),e.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}this.mapInstance.setMapTypeId(i)}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Google Maps):",i)}else if(this.mapType==="leaflet"){if(!this.leafletLayers)return;requestAnimationFrame(()=>{try{if(!this.mapInstance||!this.leafletLayers)return;try{this.leafletLayers.normal&&this.mapInstance.hasLayer(this.leafletLayers.normal)&&this.mapInstance.removeLayer(this.leafletLayers.normal)}catch{}try{this.leafletLayers.satellite&&this.mapInstance.hasLayer(this.leafletLayers.satellite)&&this.mapInstance.removeLayer(this.leafletLayers.satellite)}catch{}try{this.leafletLayers.terrain&&this.mapInstance.hasLayer(this.leafletLayers.terrain)&&this.mapInstance.removeLayer(this.leafletLayers.terrain)}catch{}switch(t){case"satellite":{const i=this._ensureLeafletSatelliteLayer();if(i)try{if(i.addTo(this.mapInstance),a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}case"terrain":{const i=this._ensureLeafletTerrainLayer();if(i)try{if(i.addTo(this.mapInstance),r)try{r.classList.add("bg-blue-500","text-white","shadow-sm"),r.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}default:if(this.leafletLayers.normal)try{if(this.leafletLayers.normal.addTo(this.mapInstance),e)try{e.classList.add("bg-blue-500","text-white","shadow-sm"),e.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}}}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Leaflet):",i)}})}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${t}`)},toggleFullscreen(){const t=document.getElementById("ptw-map-content"),e=document.getElementById("ptw-map-fullscreen-btn");t&&(this.isFullscreen?(document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen(),this.isFullscreen=!1,e&&(e.innerHTML='<i class="fas fa-expand ml-2"></i>',e.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")):(t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.isFullscreen=!0,e&&(e.innerHTML='<i class="fas fa-compress ml-2"></i>',e.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),setTimeout(()=>{this.mapInstance&&(this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps&&google.maps.event&&this.mapInstance&&google.maps.event.trigger(this.mapInstance,"resize"))},300))},formatPermitApprovalSourceCell(t){if(!t)return'<span class="text-gray-400 text-sm">\u2014</span>';const e=String(t.approvalCircuitOwnerId||"").trim(),a=String(t.approvalCircuitName||"").trim();if(t.isManualEntry===!0||t.skipApprovalFlow===!0||e==="__manual__"){const i=a||"Manual Entry";return`
                <div class="ptw-approval-source-cell text-xs text-right leading-snug" dir="ltr">
                    <div class="font-mono text-gray-600">__manual__</div>
                    <div class="text-gray-800 font-medium" dir="auto">${Utils.escapeHTML(i)}</div>
                </div>`}return a?`<div class="text-xs text-gray-800">${Utils.escapeHTML(a)}</div>`:e&&e!=="__default__"?`<div class="text-xs font-mono text-gray-600" dir="ltr">${Utils.escapeHTML(e)}</div>`:'<span class="text-gray-400 text-sm">\u2014</span>'},getMergedPermitsForFilter(){const t=AppState.appData.ptw||[],e=(this.registryData||[]).map(a=>({id:a.permitId||a.id,workType:Array.isArray(a.permitType)?a.permitTypeDisplay||a.permitType.join("\u060C "):a.permitType||a.permitTypeDisplay,location:a.location,siteName:a.location,sublocation:a.sublocation,sublocationName:a.sublocation,startDate:a.timeFrom||a.openDate,endDate:a.timeTo||a.closureDate,status:a.status,workDescription:a.workDescription,requestingParty:a.requestingParty,authorizedParty:a.authorizedParty,approvals:[],createdAt:a.createdAt||a.timeFrom||a.openDate,updatedAt:a.updatedAt||a.closureDate||a.timeTo,isFromRegistry:!0,isManualEntry:a.isManualEntry===!0||a.isManualEntry==="true",skipApprovalFlow:a.skipApprovalFlow===!0||a.isManualEntry===!0||a.isManualEntry==="true",approvalCircuitOwnerId:a.approvalCircuitOwnerId||(a.isManualEntry===!0||a.isManualEntry==="true"?"__manual__":void 0),approvalCircuitName:a.approvalCircuitName||(a.isManualEntry===!0||a.isManualEntry==="true"?"Manual Entry":void 0),sequentialNumber:a.sequentialNumber,paperPermitNumber:a.paperPermitNumber}));return this.mergePermitsPreferRegistry(t,e)},updateSublocationFilterOptions(){const t=document.getElementById("ptw-filter-location"),e=document.getElementById("ptw-filter-sublocation");if(!e||!t)return;const a=this.getMergedPermitsForFilter(),r=(t.value||"").trim();let i=[];if(r){const o=a.filter(l=>(l.siteName||l.location||"").trim()===r);i=[...new Set(o.map(l=>(l.sublocationName||l.sublocation||"").trim()).filter(Boolean))].sort()}else i=[...new Set(a.map(o=>(o.sublocationName||o.sublocation||"").trim()).filter(Boolean))].sort();const s=e.value;e.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`).join(""),i.includes(s)?e.value=s:e.value=""},filterItems(){const t=(document.getElementById("ptw-search")?.value||"").trim(),e=(document.getElementById("ptw-filter-status")?.value||"").trim(),a=(document.getElementById("ptw-filter-work-type")?.value||"").trim(),r=(document.getElementById("ptw-filter-location")?.value||"").trim(),i=(document.getElementById("ptw-filter-sublocation")?.value||"").trim(),s=(document.getElementById("ptw-filter-date-from")?.value||"").trim(),o=(document.getElementById("ptw-filter-date-to")?.value||"").trim(),l=!!(t||e||a||r||i||s||o);let n=this.getMergedPermitsForFilter();if(t){const u=t.toLowerCase();n=n.filter(h=>h.workType?.toLowerCase().includes(u)||h.workDescription?.toLowerCase().includes(u)||h.location?.toLowerCase().includes(u)||h.siteName?.toLowerCase().includes(u)||h.sublocation?.toLowerCase().includes(u)||h.sublocationName?.toLowerCase().includes(u)||h.requestingParty?.toLowerCase().includes(u)||h.authorizedParty?.toLowerCase().includes(u)||String(h.approvalCircuitOwnerId||"").toLowerCase().includes(u)||String(h.approvalCircuitName||"").toLowerCase().includes(u))}e&&(n=n.filter(u=>(u.status||"").trim()===e)),a&&(n=n.filter(u=>(u.workType||"").trim()===a)),r&&(n=n.filter(u=>(u.siteName||u.location||"").trim()===r)),i&&(n=n.filter(u=>(u.sublocationName||u.sublocation||"").trim()===i)),s&&(n=n.filter(u=>(u.startDate?new Date(u.startDate).toISOString().split("T")[0]:"")>=s)),o&&(n=n.filter(u=>(u.endDate?new Date(u.endDate).toISOString().split("T")[0]:"")<=o)),n=this.sortPermitRecordsNewestFirst(n);const p=document.querySelector("#ptw-table-container tbody");p&&(p.innerHTML=n.length===0?'<tr><td colspan="8" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td></tr>':n.map(u=>{const h=u.isManualEntry===!0||u.skipApprovalFlow===!0||String(u.approvalCircuitOwnerId||"").trim()==="__manual__";let f,x;if(h)x=3,f=3;else{const k=this.normalizeApprovals(u.approvals||[]).filter(y=>y.required!==!1);f=k.filter(y=>y.status==="approved").length,x=k.length}return`
                    <tr>
                        <td>${Utils.escapeHTML(u.workType||"")}</td>
                        <td title="${Utils.escapeHTML(u.siteName||u.location||"")}">${Utils.escapeHTML(u.siteName||u.location||"")}</td>
                        <td title="${Utils.escapeHTML(u.sublocationName||u.sublocation||"")}">${Utils.escapeHTML(u.sublocationName||u.sublocation||"-")}</td>
                        <td>${u.startDate?Utils.formatDate(u.startDate):"-"}</td>
                        <td>${u.endDate?Utils.formatDate(u.endDate):"-"}</td>
                        <td>
                            <span class="badge badge-${f===x&&x>0?"success":"warning"}">
                                ${x>0?`${f}/${x}`:"\u2014"}
                            </span>
                            <br>
                            <span class="badge badge-${this.getStatusBadgeClass(u.status)}">
                                ${Utils.escapeHTML(u.status||"-")}
                            </span>
                        </td>
                        <td class="align-top">${this.formatPermitApprovalSourceCell(u)}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button onclick="PTW.viewPTW('${u.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="PTW.printPermit('${u.id}')" class="btn-icon btn-icon-primary" title="\u0637\u0628\u0627\u0639\u0629">
                                    <i class="fas fa-print"></i>
                                </button>
                                <button onclick="PTW.exportPDF('${u.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                    <i class="fas fa-file-pdf"></i>
                                </button>
                                <button onclick="PTW.editPTW('${u.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="PTW.deletePTW('${u.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `}).join(""));const d=document.getElementById("ptw-filter-count");d&&(d.textContent=String(n.length));const c=document.getElementById("ptw-list-visible-count");c&&(c.textContent=String(n.length));const m=document.getElementById("ptw-reset-filters");m&&(m.disabled=!l),["ptw-search","ptw-filter-work-type","ptw-filter-location","ptw-filter-sublocation","ptw-filter-status","ptw-filter-date-from","ptw-filter-date-to"].forEach(u=>{const h=document.getElementById(u),f=h?.closest?.(".ptw-filter-field");f&&f.classList.toggle("is-active",!!h.value)}),this.updateKPIs()},renderAnalysisContent(){const t=document.getElementById("ptw-map-content");return t&&(t.style.display="none",t.style.visibility="hidden",t.style.opacity="0",t.style.position="absolute",t.style.left="-9999px",t.style.width="0",t.style.height="0",t.style.overflow="hidden",t.style.pointerEvents="none",t.style.zIndex="-1"),AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),this._ptwEnsureChartJS().catch(()=>{}),`
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
                        ${["30","90","180","365","0"].map((e,a)=>{const r=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],i=(this._ptwPeriod||"0")===e;return`<button type="button" class="ptw-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${i?"#fff":"rgba(255,255,255,0.15)"};color:${i?"#1e3a5f":"#fff"};">${r[a]}</button>`}).join("")}
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
                    ${[{id:"ptw-af-status",icon:"fas fa-circle",color:"#10b981",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ptw-af-work-type",icon:"fas fa-fire",color:"#ef4444",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"},{id:"ptw-af-authorized",icon:"fas fa-user-tie",color:"#f59e0b",label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"},{id:"ptw-af-requesting",icon:"fas fa-building",color:"#6366f1",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"},{id:"ptw-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0635\u0646\u0639"}].map(e=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="${e.icon}" style="color:${e.color};margin-left:4px;"></i>${e.label}</label>
                            <select id="${e.id}" style="width:100%;padding:7px 10px;border:1.5px solid #bfdbfe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#1d4ed8'" onblur="this.style.borderColor='#bfdbfe'">
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
        </div>`},getAnalysisPermits(){const t=this.getSiteOptions(),e=i=>{if(!i)return i;const s=String(i.location||i.siteName||"").trim(),o=s.split(" - "),l=o[0]?.trim()||"";let n="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const p=t.find(c=>c.name.trim()===s||c.id===s||i.siteId&&c.id===i.siteId||l&&c.name.trim()===l||l&&c.id===l);p?n=p.name.trim():l&&l!=="\u2014"&&l!=="undefined"&&(n=l);let d=i.sublocation?.trim()||o[1]?.trim()||"";return(!d||d==="\u2014"||d==="undefined"||d==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")&&(d="\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),{...i,location:n,siteName:n,sublocation:d}},a=(AppState.appData&&AppState.appData.ptw?AppState.appData.ptw:[]).map(e),r=(this.registryData||[]).map(i=>{const o=(i.location||"").split(" - "),l=o[0]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=i.sublocation?.trim()||o[1]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return e({id:i.permitId||i.id,workType:Array.isArray(i.permitType)?i.permitTypeDisplay||i.permitType.join("\u060C "):i.permitType||i.permitTypeDisplay,location:l,siteName:l,sublocation:n,startDate:i.openDate,endDate:i.timeTo,status:i.status,requestingParty:i.requestingParty,authorizedParty:i.authorizedParty,workDescription:i.workDescription,createdAt:i.createdAt,updatedAt:i.updatedAt})});return this.mergePermitsPreferRegistry(a,r)},getFilteredAnalysisPermits(){const t=this.getAnalysisPermits(),e=document.getElementById("ptw-analysis-date-from"),a=document.getElementById("ptw-analysis-date-to"),r=document.getElementById("ptw-analysis-work-type"),i=document.getElementById("ptw-analysis-authorized"),s=document.getElementById("ptw-analysis-requesting"),o=document.getElementById("ptw-analysis-status"),l=e&&e.value?new Date(e.value):null,n=a&&a.value?new Date(a.value):null,p=r&&r.value?r.value.trim():"",d=i&&i.value?i.value.trim():"",c=s&&s.value?s.value.trim():"",m=o&&o.value?o.value.trim():"";return t.filter(u=>{const h=u.workType,f=Array.isArray(h)?h:h?[String(h)]:[],x=!p||f.some(z=>(z||"").trim()===p),b=!d||(u.authorizedParty||"").trim()===d,k=!c||(u.requestingParty||"").trim()===c,y=!m||(u.status||"").trim()===m;let C=!0;if(l||n){const z=u.startDate||u.openDate||u.createdAt||u.endDate,I=z?new Date(z):null;if(!I)C=!1;else if(l&&I<l&&(C=!1),n){const _=new Date(n);_.setHours(23,59,59,999),I>_&&(C=!1)}}return x&&b&&k&&y&&C})},updateAnalysisChartsAndKPIs(t){const e=(v,E)=>this._t(v,E),a=Array.isArray(t)?t:this.getFilteredAnalysisPermits(),r=a.length,i=a.filter(v=>this.isPermitOpenStatus(v?.status)).length,s=a.filter(v=>this.isPermitClosedStatus(v?.status)).length,o=a.filter(v=>(v.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,l=a.filter(v=>v?.isManualEntry!==!0&&(v.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,n=a.filter(v=>(v.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,p=r>0?(s/r*100).toFixed(1):"0",d=r>0?(i/r*100).toFixed(1):"0",c=r>0?(o/r*100).toFixed(1):"0",m=r>0?(n/r*100).toFixed(1):"0",u=i+s+n,h=r===0||u===r,f=(v,E)=>{const H=document.getElementById(v);H&&(H.textContent=E)};f("ptw-kpi-total",r),f("ptw-kpi-open",i),f("ptw-kpi-open-pct",e("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(d))),f("ptw-kpi-closed",s),f("ptw-kpi-closure-pct",e("module.ptw.analysis.closureShare","{n}% \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642").replace(/\{n\}/g,String(p))),f("ptw-kpi-approved",o),f("ptw-kpi-approved-pct",e("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(c))),f("ptw-kpi-pending",l),f("ptw-kpi-rejected",n),f("ptw-kpi-formulas",e("module.ptw.analysis.formulaText","\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 = {c}% | \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 = {o}% | \u0627\u0644\u0645\u0631\u0641\u0648\u0636\u0629 = {r}%").replace(/\{c\}/g,String(p)).replace(/\{o\}/g,String(d)).replace(/\{r\}/g,String(m)));const x=document.getElementById("ptw-analysis-current-count");x&&(x.textContent=String(r));const b=document.getElementById("ptw-analysis-summary");if(b)if(r===0)b.textContent=e("module.ptw.analysis.summaryNoData","\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u062C\u0631\u0651\u0628 \u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0641\u062A\u0631\u0629 \u0623\u0648 \u0625\u0632\u0627\u0644\u0629 \u0628\u0639\u0636 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u062D\u0644\u064A\u0644.");else{const v=[],E=document.getElementById("ptw-analysis-date-from")?.value||"",H=document.getElementById("ptw-analysis-date-to")?.value||"",q=document.getElementById("ptw-analysis-work-type")?.value||"",w=document.getElementById("ptw-analysis-authorized")?.value||"",V=document.getElementById("ptw-analysis-requesting")?.value||"",J=document.getElementById("ptw-analysis-status")?.value||"";if(E||H){const $=E&&H?e("module.ptw.analysis.fromWord","\u0645\u0646")+" "+E+" "+e("module.ptw.analysis.toConnector","\u0625\u0644\u0649")+" "+H:E?e("module.ptw.analysis.fromWord","\u0645\u0646")+" "+E:e("module.ptw.analysis.until","\u062D\u062A\u0649")+" "+H;v.push(e("module.ptw.analysis.range","\u0627\u0644\u0641\u062A\u0631\u0629: ")+$)}q&&v.push(e("module.ptw.analysis.wt","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+q),w&&v.push(e("module.ptw.analysis.ap","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627: ")+w),V&&v.push(e("module.ptw.analysis.rp","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629: ")+V),J&&v.push(e("module.ptw.analysis.st","\u0627\u0644\u062D\u0627\u0644\u0629: ")+J);const W=v.length?v.join(e("module.ptw.analysis.partSep"," | ")):e("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u0627\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)");b.textContent=e("module.ptw.analysis.currentCount","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ")+r+e("module.ptw.analysis.filterSep"," \u2014 ")+W}if(!document.getElementById("ptw-analysis-filter-badge-styles")){const v=document.createElement("style");v.id="ptw-analysis-filter-badge-styles",v.textContent=`
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
            `,document.head.appendChild(v)}if(["ptw-analysis-date-from","ptw-analysis-date-to","ptw-analysis-work-type","ptw-analysis-authorized","ptw-analysis-requesting","ptw-analysis-status"].forEach(v=>{const E=document.getElementById(v);if(!E)return;const H=E.closest("div");if(!H)return;const q=H.querySelector('.ptw-analysis-filter-label[data-filter-id="'+v+'"]');if(!q)return;const w=q.querySelector(".ptw-analysis-filter-badge");w&&w.remove();let V=!1;if((E.tagName==="INPUT"||E.tagName==="SELECT")&&(V=!!E.value),V&&r>0){const J=document.createElement("span");J.className="ptw-analysis-filter-badge",J.title=e("module.ptw.analysis.badgeCountTitle","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0641\u0644\u062A\u0631 \u0645\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0623\u062E\u0631\u0649"),J.textContent=String(r);const W=q.querySelector("i");W&&W.nextSibling?W.insertAdjacentElement("afterend",J):q.appendChild(J)}}),typeof Chart>"u")return;const y=["ptw-chart-work-type","ptw-chart-authorized","ptw-chart-status","ptw-chart-timeline"];this.analysisCharts||(this.analysisCharts={}),y.forEach(v=>{this.analysisCharts[v]&&(this.analysisCharts[v].destroy(),this.analysisCharts[v]=null)});const C=v=>{const E=v.workType;return Array.isArray(E)?E.length?E:["\u0623\u062E\u0631\u0649"]:E?[String(E)]:["\u0623\u062E\u0631\u0649"]},z={};a.forEach(v=>C(v).forEach(E=>{const H=(E||"").trim()||"\u0623\u062E\u0631\u0649";z[H]=(z[H]||0)+1}));const I=Object.entries(z).sort((v,E)=>E[1]-v[1]),_={};a.forEach(v=>{const E=(v.authorizedParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";_[E]=(_[E]||0)+1});const D=Object.entries(_).sort((v,E)=>E[1]-v[1]).slice(0,12),R={};a.forEach(v=>{const E=(v.status||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";R[E]=(R[E]||0)+1});const F=Object.entries(R),S={};a.forEach(v=>{const E=v.startDate||v.openDate||v.createdAt||v.endDate,H=E?new Date(E):null,q=H?H.getFullYear()+"-"+String(H.getMonth()+1).padStart(2,"0"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";S[q]=(S[q]||0)+1});const A=Object.keys(S).filter(v=>v!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort().map(v=>({label:v,count:S[v]})),U=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#6366f1","#f97316"],j=(v,E,H,q)=>{const w=document.getElementById(v);if(!w)return;const V=w.getContext("2d");this.analysisCharts[v]=new Chart(V,{type:"doughnut",data:{labels:E,datasets:[{data:H,backgroundColor:U.slice(0,E.length),borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})},X=(v,E,H,q)=>{const w=document.getElementById(v);if(!w)return;const V=w.getContext("2d");this.analysisCharts[v]=new Chart(V,{type:"bar",data:{labels:E,datasets:[{label:e("module.ptw.analysis.chartCount","\u0627\u0644\u0639\u062F\u062F"),data:H,backgroundColor:U[0],borderColor:"#1d4ed8",borderWidth:1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}})},it=(v,E,H)=>{const q=document.getElementById(v);if(!q)return;const w=q.getContext("2d");this.analysisCharts[v]=new Chart(w,{type:"line",data:{labels:E,datasets:[{label:e("module.ptw.analysis.permitsPerMonth","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),data:H,borderColor:U[0],backgroundColor:U[0]+"33",fill:!0,tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})};I.length&&j("ptw-chart-work-type",I.map(([v])=>v),I.map(([,v])=>v)),D.length&&X("ptw-chart-authorized",D.map(([v])=>v),D.map(([,v])=>v)),F.length&&j("ptw-chart-status",F.map(([v])=>v),F.map(([,v])=>v)),A.length&&it("ptw-chart-timeline",A.map(({label:v})=>v),A.map(({count:v})=>v))},exportAnalysisReportToExcel(){const t=this.getFilteredAnalysisPermits();if(!t||t.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const e=(I,_)=>this._t(I,_),r=(typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar")==="en"?"en-GB":"ar-EG",i=I=>{if(!I)return"-";try{return new Date(I).toLocaleDateString(r)}catch{return String(I)}},s=this._t("module.ptw.common.listSep","\u060C "),o=I=>Array.isArray(I.workType)?(I.workType||[]).join(s):I.workType||"-",l=e("module.ptw.excelColSeq","\u0645"),n=e("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),p=e("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),d=e("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),c=e("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),m=e("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),u=e("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),h=e("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),f=t.map((I,_)=>({[l]:_+1,[n]:o(I),[p]:I.requestingParty||"-",[d]:I.authorizedParty||"-",[c]:I.location||I.siteName||"-",[m]:i(I.startDate||I.openDate||I.createdAt),[u]:this.statusLabel(I.status||"-"),[h]:(I.workDescription||"-").toString().slice(0,200)}));if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"));return}const x=XLSX.utils.json_to_sheet(f),b=XLSX.utils.book_new(),k=e("module.ptw.excelSheetAnalysis","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");XLSX.utils.book_append_sheet(b,x,k);const y=document.getElementById("ptw-analysis-date-from")?.value||"",C=document.getElementById("ptw-analysis-date-to")?.value||"",z=e("module.ptw.excelNameAnalysis","\u062A\u0642\u0631\u064A\u0631_\u062A\u062D\u0644\u064A\u0644_\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D_{f}_{t}.xlsx").replace(/\{f\}/g,(y||e("module.ptw.excelNameAll","\u0643\u0644")).replace(/\s/g,"_")).replace(/\{t\}/g,(C||e("module.ptw.excelNameTime","\u0627\u0644\u0648\u0642\u062A")).replace(/\s/g,"_"));XLSX.writeFile(b,z),Notification.success(this._t("module.ptw.notify.analysisExportXlsxOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))},async exportAnalysisReportToPDF(){const t=this.getFilteredAnalysisPermits();if(!t||t.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const e=(n,p)=>this._t(n,p),a=typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar",r=a==="en"?"en-GB":"ar-EG",i=a!=="en",s=i?"rtl":"ltr",o=a==="en"?"en":"ar",l=i?"right":"left";try{Loading.show(e("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF..."));const n=W=>{if(!W)return"-";try{const $=this.parseDateTimeValue(W);return!$||isNaN($.getTime())?String(W):$.toLocaleDateString(r)}catch{return String(W)}},p=this._t("module.ptw.common.listSep","\u060C "),d=W=>Array.isArray(W.workType)?(W.workType||[]).join(p):W.workType||"-",c=document.getElementById("ptw-analysis-date-from"),m=document.getElementById("ptw-analysis-date-to"),u=document.getElementById("ptw-analysis-work-type"),h=document.getElementById("ptw-analysis-authorized"),f=document.getElementById("ptw-analysis-requesting"),x=document.getElementById("ptw-analysis-status"),b=[];c&&c.value&&b.push(e("module.ptw.analysis.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")+": "+c.value),m&&m.value&&b.push(e("module.ptw.analysis.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")+": "+m.value),u&&u.value&&b.push(e("module.ptw.analysis.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")+": "+u.value),h&&h.value&&b.push(e("module.ptw.analysis.authorized","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 (\u0645\u0642\u0627\u0648\u0644)")+": "+h.value),f&&f.value&&b.push(e("module.ptw.analysis.requesting","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")+": "+f.value),x&&x.value&&b.push(e("module.ptw.analysis.filterStatus","\u0627\u0644\u062D\u0627\u0644\u0629")+": "+x.value);const k=e("module.ptw.analysis.partSep"," | "),y=b.length?b.join(k):e("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)"),C=t.filter(W=>{const $=(W.status||"").trim();return $!=="\u0645\u063A\u0644\u0642"&&$!=="\u0645\u0631\u0641\u0648\u0636"&&$!=="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&$!=="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,z=t.filter(W=>{const $=(W.status||"").trim();return $==="\u0645\u063A\u0644\u0642"||$==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||$==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,I=e("module.ptw.excelColSeq","\u0645"),_=e("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),D=e("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),R=e("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),F=e("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),S=e("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),P=e("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),A=e("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),U=t.map((W,$)=>`
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: center;">${$+1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l}; font-size: 9px;">${Utils.escapeHTML(d(W))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(W.requestingParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(W.authorizedParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(W.location||W.siteName||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${n(W.startDate||W.openDate||W.createdAt)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l};">${Utils.escapeHTML(this.statusLabel(W.status||"-"))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${l}; font-size: 9px; max-width: 120px;">${Utils.escapeHTML((W.workDescription||"-").toString().slice(0,80))}</td>
                </tr>
            `).join(""),j=e("module.ptw.pdf.analysisReportTitle","\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"),X=e("module.ptw.pdf.filterCriteriaLine","\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631: {text}").replace(/\{text\}/g,y),it=e("module.ptw.pdf.totalsLine","\u0625\u062C\u0645\u0627\u0644\u064A: {total} | \u0645\u0641\u062A\u0648\u062D\u0629: {open} | \u0645\u063A\u0644\u0642\u0629: {closed}").replace(/\{total\}/g,String(t.length)).replace(/\{open\}/g,String(C)).replace(/\{closed\}/g,String(z)),v=`
                <div style="margin-bottom: 18px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 10px;">${Utils.escapeHTML(j)}</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-bottom: 6px;">${Utils.escapeHTML(X)}</p>
                    <p style="text-align: center; color: #374151; font-size: 12px;">${Utils.escapeHTML(it)}</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #3b82f6; color: white;">
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(I)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(_)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(D)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(R)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(F)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(S)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(P)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${l};">${Utils.escapeHTML(A)}</th>
                        </tr>
                    </thead>
                    <tbody>${U}</tbody>
                </table>
            `,E="PTW-ANALYSIS-"+new Date().toISOString().slice(0,10),H=j,q=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(E,H,v,!1,!0,{source:"PTWAnalysis"},new Date().toISOString(),new Date().toISOString()):`<html dir="${s}" lang="${o}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(H)}</title></head><body>${v}</body></html>`,w=new Blob([q],{type:"text/html;charset=utf-8"}),V=URL.createObjectURL(w),J=window.open(V,"_blank");J?J.onload=()=>{setTimeout(()=>{J.print(),setTimeout(()=>{URL.revokeObjectURL(V),Loading.hide(),Notification.success(PTW._t("module.ptw.pdf.readyPrint","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 PDF:",n);const p=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(n&&n.message?n.message:p))}},setupAnalysisEventListeners(){setTimeout(()=>{this.updatePTWAnalyticsDashboard()},150),this._ptwBindAnalyticsEvents();const t=document.getElementById("ptw-analysis-add");if(t){const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.showAnalysisForm()})}const e=document.getElementById("ptw-analysis-export-excel");if(e){const a=e.cloneNode(!0);e.parentNode.replaceChild(a,e),a.addEventListener("click",()=>this.exportAnalysisReportToExcel())}},_ptwBindAnalyticsEvents(){const t=document.getElementById("ptw-analytics-root");if(!t)return;t.querySelectorAll(".ptw-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._ptwPeriod=o.getAttribute("data-period"),t.querySelectorAll(".ptw-period-btn").forEach(l=>{const n=l===o;l.style.background=n?"#fff":"rgba(255,255,255,0.15)",l.style.color=n?"#1e3a5f":"#fff"}),this.updatePTWAnalyticsDashboard()})});const e=document.getElementById("ptw-analytics-refresh");e&&e.addEventListener("click",()=>this.updatePTWAnalyticsDashboard());const a=document.getElementById("ptw-export-pdf-btn");a&&a.addEventListener("click",()=>this._ptwExportPDF());const r=document.getElementById("ptw-toggle-filters-btn"),i=document.getElementById("ptw-filter-panel");r&&i&&r.addEventListener("click",()=>{const o=i.style.display!=="none";i.style.display=o?"none":"block",r.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const s=document.getElementById("ptw-filter-reset-btn");s&&s.addEventListener("click",()=>{["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(o=>{const l=document.getElementById(o);l&&(l.value="")}),this.updatePTWAnalyticsDashboard()}),["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(o=>{const l=document.getElementById(o);l&&l.addEventListener("change",()=>this.updatePTWAnalyticsDashboard())})},async updatePTWAnalyticsDashboard(){if(!document.getElementById("ptw-analytics-root"))return;try{AppState.appData||(AppState.appData={})}catch{}const e=parseInt(this._ptwPeriod||"0",10),a=this.getAnalysisPermits(),r=this._ptwFilterByPeriod(a,e);this._ptwPopulateFilters(r);const i=this._ptwApplyFilters(r),s=i.length,o=document.getElementById("ptw-filter-count");o&&(o.textContent=`${s} \u062A\u0635\u0631\u064A\u062D`);const l=i.filter(q=>this.isPermitOpenStatus(q?.status)).length,n=i.filter(q=>this.isPermitClosedStatus(q?.status)).length,p=i.filter(q=>(q.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,d=i.filter(q=>q?.isManualEntry!==!0&&(q.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,c=i.filter(q=>(q.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,m=s>0?Math.round(n/s*100):0,u=s>0?Math.round(l/s*100):0,h=s>0?Math.round(p/s*100):0,f=i.filter(q=>{const w=new Date(q.startDate||q.openDate||q.createdAt||""),V=new Date;return!isNaN(w)&&w.getFullYear()===V.getFullYear()&&w.getMonth()===V.getMonth()}).length,x={};i.forEach(q=>{const w=(q.requestingParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";w!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&w!=="\u2014"&&(x[w]=(x[w]||0)+1)});const b=Object.entries(x).sort((q,w)=>w[1]-q[1]),k=b[0],y=k?k[0]:"\u0644\u0627 \u064A\u0648\u062C\u062F",C=k?k[1]:0,z=document.getElementById("ptw-kpi-strip");if(z){const q=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",value:s,icon:"fas fa-clipboard-check",color:"#1d4ed8",bg:"#dbeafe",border:"#bfdbfe"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629 / \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",value:l,icon:"fas fa-folder-open",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u063A\u0644\u0642\u0629 / \u0645\u0643\u062A\u0645\u0644\u0629",value:n,icon:"fas fa-check-circle",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627",value:p,icon:"fas fa-thumbs-up",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",value:d,icon:"fas fa-clock",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u0631\u0641\u0648\u0636\u0629",value:c,icon:"fas fa-times-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:m+"%",icon:"fas fa-chart-pie",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B",value:C>0?y:"\u2014",icon:"fas fa-hotel",color:"#2563eb",bg:"#eff6ff",border:"#bfdbfe",subText:C>0?`${C} \u062A\u0635\u0631\u064A\u062D`:""},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:f,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"}];z.innerHTML=q.map(w=>`
                <div style="background:${w.bg};border:1px solid ${w.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;min-width:0;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${w.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${w.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div style="min-width:0;flex:1;">
                        <div style="font-size:1.1rem;font-weight:800;color:${w.color};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${w.value}">${w.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${w.label}</div>
                        ${w.subText?`<div style="font-size:0.62rem;color:${w.color};opacity:0.8;font-weight:700;">${w.subText}</div>`:""}
                    </div>
                </div>`).join("")}if(!await this._ptwEnsureChartJS()||typeof Chart>"u")return;const _={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"rgba(124,58,237,0.85)",\u0645\u0641\u062A\u0648\u062D:"rgba(217,119,6,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"rgba(217,119,6,0.85)",\u0645\u063A\u0644\u0642:"rgba(5,150,105,0.85)","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"rgba(5,150,105,0.85)",\u0645\u0631\u0641\u0648\u0636:"rgba(220,38,38,0.85)","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"rgba(220,38,38,0.8)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(234,179,8,0.85)"},D=this._ptwGroupBy(i,"status");this._ptwDrawDoughnut("ptw-chart-status",D.labels,D.data,D.labels.map(q=>_[q]||"rgba(148,163,184,0.8)"));const R=this._ptwGroupByMulti(i,"workType",10);this._ptwDrawDoughnut("ptw-chart-work-type",R.labels,R.data,this._ptwChartColors(R.labels.length)),this._ptwDrawTrend("ptw-chart-timeline",i);const F=this._ptwGroupBy(i,"authorizedParty",10);this._ptwDrawHBar("ptw-chart-authorized",F.labels,F.data,"rgba(245,158,11,0.75)");const S=this._ptwGroupBy(i,"requestingParty",10);this._ptwDrawHBar("ptw-chart-requesting",S.labels,S.data,"rgba(139,92,246,0.75)");const P={},A=this.getSiteOptions().map(q=>q.name.trim());i.forEach(q=>{const w=String(q.location||q.siteName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(A.includes(w)){const V=String(q.sublocation||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",J=`${w} - ${V}`;P[J]=(P[J]||0)+1}});let U=Object.entries(P).sort((q,w)=>w[1]-q[1]).slice(0,10);U.sort((q,w)=>{const V=q[0].split(" - ")[0],J=w[0].split(" - ")[0];return V!==J?V.localeCompare(J,"ar"):w[1]-q[1]});const j=document.getElementById("ptw-locs-list");j&&(s===0?j.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':j.innerHTML=U.map(([q,w])=>{const V=q.split(" - "),J=V[0]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",W=V[1]||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645",$=Math.round(w/s*100);return`
                        <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                                    <span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;flex-shrink:0;">${Utils.escapeHTML(J)}</span>
                                    <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(W)}">${Utils.escapeHTML(W)}</span>
                                </div>
                                <span style="font-size:0.75rem;font-weight:700;color:#0369a1;flex-shrink:0;margin-right:8px;">${w} \u062A\u0635\u0631\u064A\u062D (${$}%)</span>
                            </div>
                            <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${$}%;height:100%;background:linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);border-radius:9999px;"></div>
                            </div>
                        </div>
                    `}).join(""));const X=document.getElementById("ptw-depts-list");X&&(s===0?X.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':X.innerHTML=b.map(([q,w])=>{const V=Math.round(w/s*100);return`
                        <div>
                            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#374151;margin-bottom:4px;">
                                <span>${Utils.escapeHTML(q)}</span>
                                <span style="color:#2563eb;">${w} \u062A\u0635\u0631\u064A\u062D (${V}%)</span>
                            </div>
                            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:9999px;overflow:hidden;">
                                <div style="width:${V}%;height:100%;background:linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);border-radius:9999px;transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    `}).join(""));const it=document.getElementById("ptw-factories-cards");if(it)if(s===0)it.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';else{const q=this.getSiteOptions();it.innerHTML=q.map((w,V)=>{const J=w.name.trim(),W=i.filter(rt=>(rt.location||rt.siteName||"").trim()===J),$=W.length,dt=Math.round($/s*100)||0,Q=W.filter(rt=>this.isPermitOpenStatus(rt?.status)).length,st=W.filter(rt=>this.isPermitClosedStatus(rt?.status)).length,ft=[{primary:"#0284c7",light:"#e0f2fe",progress:"linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"},{primary:"#059669",light:"#ecfdf5",progress:"linear-gradient(90deg, #34d399 0%, #059669 100%)"},{primary:"#7c3aed",light:"#f5f3ff",progress:"linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)"}],et=ft[V%ft.length];return`
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                             onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${et.primary}'" 
                             onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                             onclick="const el = document.getElementById('ptw-af-location'); if(el){el.value='${J}'; el.dispatchEvent(new Event('change'));}">
                            
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <div style="width:36px;height:36px;background:${et.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${et.primary};">
                                        <i class="fas fa-industry" style="font-size:16px;"></i>
                                    </div>
                                    <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(J)}</span>
                                </div>
                                <span style="font-size:1.15rem;font-weight:900;color:${et.primary};">${dt}%</span>
                            </div>
                            
                            <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${dt}%;height:100%;background:${et.progress};border-radius:9999px;"></div>
                            </div>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px;border-top:1px solid #f1f5f9;padding-top:12px;">
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#64748b;margin-bottom:2px;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#1e293b;">${$}</div>
                                </div>
                                <div style="text-align:center;border-left:1px solid #f1f5f9;border-right:1px solid #f1f5f9;">
                                    <div style="font-size:0.65rem;color:#d97706;margin-bottom:2px;">\u0645\u0641\u062A\u0648\u062D\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#d97706;">${Q}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#059669;margin-bottom:2px;">\u0645\u063A\u0644\u0642\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#059669;">${st}</div>
                                </div>
                            </div>
                        </div>
                    `}).join("")}const v=i.slice().sort((q,w)=>{const V=new Date(w.startDate||w.openDate||w.createdAt||""),J=new Date(q.startDate||q.openDate||q.createdAt||"");return V-J}).slice(0,20),E=document.getElementById("ptw-top-count"),H=document.getElementById("ptw-top-tbody");if(E&&(E.textContent=`${v.length} \u062A\u0635\u0631\u064A\u062D`),H)if(!v.length)H.innerHTML='<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;"><i class="fas fa-info-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';else{const q={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"background:#f5f3ff;color:#5b21b6;",\u0645\u0641\u062A\u0648\u062D:"background:#fffbeb;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#fffbeb;color:#92400e;",\u0645\u063A\u0644\u0642:"background:#ecfdf5;color:#065f46;","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"background:#ecfdf5;color:#065f46;",\u0645\u0631\u0641\u0648\u0636:"background:#fef2f2;color:#991b1b;","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"background:#fef2f2;color:#991b1b;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#fffbeb;color:#92400e;"};H.innerHTML=v.map((w,V)=>{const J=Array.isArray(w.workType)?w.workType.join("\u060C "):w.workType||w.permitType||"\u2014",W=Utils.escapeHTML(w.authorizedParty||"\u2014"),$=Utils.escapeHTML(w.requestingParty||"\u2014"),dt=Utils.escapeHTML(w.location||w.siteName||"\u2014"),Q=Utils.escapeHTML(w.workDescription||"\u2014"),st=V%2===0?"#fff":"#fafafa",ft=q[w.status]||"background:#f1f5f9;color:#374151;",et=w.startDate||w.openDate||w.createdAt||"",rt=et?(()=>{try{return new Date(et).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"})}catch{return et.slice(0,10)}})():"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${st};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${st}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${Q}">${Q}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${Utils.escapeHTML(Array.isArray(w.workType)?w.workType.join("\u060C "):w.workType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${W}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${$}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${dt}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${rt}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:700;white-space:nowrap;${ft}">${Utils.escapeHTML(w.status||"\u2014")}</span></td>
                    </tr>`}).join("")}},_ptwFilterByPeriod(t,e){if(!e||e===0)return t;const a=new Date;return a.setDate(a.getDate()-e),t.filter(r=>{const i=new Date(r.startDate||r.openDate||r.createdAt||"");return!isNaN(i.getTime())&&i>=a})},_ptwGroupBy(t,e,a=0){const r={};t.forEach(s=>{const o=String(s[e]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[o]=(r[o]||0)+1});let i=Object.entries(r).sort((s,o)=>o[1]-s[1]);return a>0&&(i=i.slice(0,a)),{labels:i.map(s=>s[0]),data:i.map(s=>s[1])}},_ptwGroupByMulti(t,e,a=0){const r={};t.forEach(s=>{const o=s[e];(Array.isArray(o)?o:o?[String(o)]:["\u0623\u062E\u0631\u0649"]).forEach(n=>{const p=(n||"").trim()||"\u0623\u062E\u0631\u0649";r[p]=(r[p]||0)+1})});let i=Object.entries(r).sort((s,o)=>o[1]-s[1]);return a>0&&(i=i.slice(0,a)),{labels:i.map(s=>s[0]),data:i.map(s=>s[1])}},_ptwPopulateFilters(t){const e=s=>[...new Set(t.map(s).flat().filter(o=>o&&o!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))].sort(),a=(s,o)=>{const l=document.getElementById(s);if(!l)return;const n=l.value;l.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+o.map(p=>`<option value="${p}"${p===n?" selected":""}>${p}</option>`).join("")};a("ptw-af-status",e(s=>[String(s.status||"").trim()])),a("ptw-af-work-type",e(s=>Array.isArray(s.workType)?s.workType.map(o=>(o||"").trim()):[(s.workType||"").trim()])),a("ptw-af-authorized",e(s=>[String(s.authorizedParty||"").trim()])),a("ptw-af-requesting",e(s=>[String(s.requestingParty||"").trim()]));const r=this.getSiteOptions().map(s=>s.name.trim()),i=e(s=>[String(s.location||s.siteName||"").trim()]).filter(s=>r.includes(s));a("ptw-af-location",i)},_ptwApplyFilters(t){const e=p=>{const d=document.getElementById(p);return d?d.value.trim():""},a=e("ptw-af-status"),r=e("ptw-af-work-type"),i=e("ptw-af-authorized"),s=e("ptw-af-requesting"),o=e("ptw-af-location"),l=[a,r,i,s,o].some(p=>p!==""),n=document.getElementById("ptw-filter-badge");return n&&(n.style.display=l?"inline":"none"),t.filter(p=>!(a&&String(p.status||"").trim()!==a||r&&!(Array.isArray(p.workType)?p.workType:[p.workType||""]).some(c=>(c||"").trim()===r)||i&&String(p.authorizedParty||"").trim()!==i||s&&String(p.requestingParty||"").trim()!==s||o&&String(p.location||p.siteName||"").trim()!==o))},_ptwDrawDoughnut(t,e,a,r){const i=document.getElementById(t),s=document.getElementById(t+"-empty");if(!i)return;if(!a.length||a.reduce((n,p)=>n+p,0)===0){i.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),i.style.display="";const o=a.reduce((n,p)=>n+p,0);this._ptwCharts||(this._ptwCharts={});const l=this._ptwCharts[t];if(l)try{l.destroy()}catch{}this._ptwCharts[t]=new Chart(i,{type:"doughnut",data:{labels:e,datasets:[{data:a,backgroundColor:r,borderWidth:2,borderColor:"#fff",hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,font:{size:11},padding:12}},tooltip:{callbacks:{label:n=>` ${n.label}: ${n.parsed} (${Math.round(n.parsed/o*100)}%)`}}}}})},_ptwDrawHBar(t,e,a,r){const i=document.getElementById(t),s=document.getElementById(t+"-empty");if(!i)return;if(!a.length){i.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),i.style.display="",this._ptwCharts||(this._ptwCharts={});const o=this._ptwCharts[t];if(o)try{o.destroy()}catch{}this._ptwCharts[t]=new Chart(i,{type:"bar",data:{labels:e,datasets:[{data:a,backgroundColor:r,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>` ${l.parsed.x} \u062A\u0635\u0631\u064A\u062D`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:l=>String(e[l]).length>20?String(e[l]).slice(0,19)+"\u2026":e[l]}}}}})},_ptwDrawTrend(t,e){const a=document.getElementById(t),r=document.getElementById(t+"-empty");if(!a)return;const i=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let p=11;p>=0;p--){const d=new Date(i.getFullYear(),i.getMonth()-p,1);o.push({year:d.getFullYear(),month:d.getMonth(),label:`${s[d.getMonth()]} ${d.getFullYear()}`})}const l=o.map(p=>e.filter(d=>{const c=new Date(d.startDate||d.openDate||d.createdAt||"");return!isNaN(c.getTime())&&c.getFullYear()===p.year&&c.getMonth()===p.month}).length);if(l.reduce((p,d)=>p+d,0)===0){a.style.display="none",r&&(r.style.display="flex");return}r&&(r.style.display="none"),a.style.display="",this._ptwCharts||(this._ptwCharts={});const n=this._ptwCharts[t];if(n)try{n.destroy()}catch{}this._ptwCharts[t]=new Chart(a,{type:"bar",data:{labels:o.map(p=>p.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",data:l,backgroundColor:l.map(p=>p===Math.max(...l)?"rgba(29,78,216,0.85)":"rgba(29,78,216,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:l,type:"line",borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#10b981",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},async _ptwEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(e=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),e(!0))},100);setTimeout(()=>{clearInterval(a),e(!1)},5e3)}):new Promise(e=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>e(!0),a.onerror=()=>{const r=document.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",r.onload=()=>e(!0),r.onerror=()=>e(!1),document.head.appendChild(r)},document.head.appendChild(a)})},_ptwChartColors(t){const e=["rgba(29,78,216,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(249,115,22,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:t},(a,r)=>e[r%e.length])},async _ptwExportPDF(){const t=document.getElementById("ptw-analytics-root");if(!t)return;const e=document.getElementById("ptw-export-pdf-btn"),a=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const r=(z,I)=>new Promise((_,D)=>{if(I())return _();const R=document.createElement("script");R.src=z,R.onload=()=>_(),R.onerror=()=>D(new Error("Failed: "+z)),document.head.appendChild(R)});await r("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await r("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const i=document.getElementById("ptw-filter-panel"),s=i&&i.style.display!=="none";s&&(i.style.display="none");const o=await html2canvas(t,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});s&&(i.style.display="");const{jsPDF:l}=window.jspdf,n=new l({orientation:"portrait",unit:"mm",format:"a4"}),p=n.internal.pageSize.getWidth(),d=n.internal.pageSize.getHeight(),c=10,m=20,u=14,h=p-c*2,f=d-m-u-c*.5,x=h/o.width,b=f/x,k=Math.ceil(o.height/b),y=new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),C=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});for(let z=0;z<k;z++){z>0&&n.addPage(),n.setFillColor(30,58,95),n.rect(0,0,p,m,"F"),n.setFillColor(29,78,216),n.rect(0,m-3,p,3,"F"),n.setTextColor(255,255,255),n.setFontSize(13),n.setFont(void 0,"bold"),n.text("Work Permits Analytics Report",c,9,{align:"left"}),n.setFontSize(8),n.setFont(void 0,"normal"),n.text("SafetyHub | ICAPP \u2014 Permit to Work Analysis Dashboard",c,15,{align:"left"}),n.setFontSize(8.5),n.text(`${y}  ${C}`,p-c,9,{align:"right"}),n.setFontSize(9),n.setFont(void 0,"bold"),n.text(`Page ${z+1} of ${k}`,p-c,15.5,{align:"right"}),n.setTextColor(0,0,0);const I=document.createElement("canvas"),_=Math.min(b,o.height-z*b);I.width=o.width,I.height=_,I.getContext("2d").drawImage(o,0,z*b,o.width,_,0,0,o.width,_);const{dataUrl:D,format:R}=Utils.PdfExport.compressCanvasToJpegDataUrl(I,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/Math.max(1,k)));n.addImage(D,R,c,m,h,_*x);const F=d-u;n.setDrawColor(191,219,254),n.setLineWidth(.4),n.line(0,F,p,F),n.setFillColor(239,246,255),n.rect(0,F,p,u,"F"),n.setFontSize(7.5),n.setTextColor(29,78,216),n.setFont(void 0,"bold"),n.text("SafetyHub | ICAPP",c,F+5,{align:"left"}),n.setFont(void 0,"normal"),n.setFontSize(6.5),n.setTextColor(100,116,139),n.text("Work Permits Analysis Report \u2014 Confidential",c,F+10,{align:"left"}),n.setFontSize(8),n.setTextColor(29,78,216),n.setFont(void 0,"bold"),n.text(`${z+1} / ${k}`,p/2,F+7.5,{align:"center"}),n.setFont(void 0,"normal"),n.setFontSize(7),n.setTextColor(100,116,139),n.text(y,p-c,F+5,{align:"right"}),n.text(C,p-c,F+10,{align:"right"})}n.save(`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u062A\u0635\u0627\u0631\u064A\u062D-\u0627\u0644\u0639\u0645\u0644-${new Date().toISOString().slice(0,10)}.pdf`)}catch{}finally{e&&(e.disabled=!1,e.innerHTML=a)}},showAnalysisForm(t=null){AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),AppState.appData.ptw||(AppState.appData.ptw=[]);const e=t?AppState.appData.ptwAnalysis.find(c=>c&&c.id===t):null,a=AppState.appData.ptw||[],r=[...new Set(a.map(c=>c&&c.workType).filter(Boolean))],i=[...new Set(a.map(c=>c&&(c.siteName||c.location)).filter(Boolean))],s=(c,m)=>this._t(c,m),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-chart-line ml-2"></i>
                        ${e?s("module.ptw.analysis.form.titleEdit","\u062A\u0639\u062F\u064A\u0644 \u062A\u062D\u0644\u064A\u0644"):s("module.ptw.analysis.form.titleAdd","\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F")}
                    </h2>
                    <button class="modal-close" aria-label="${s("module.ptw.analysis.form.closeAria","\u0625\u063A\u0644\u0627\u0642")}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="ptw-analysis-form" class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.dateLabel","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644")} <span class="text-red-500">*</span></label>
                            <input type="date" id="analysis-date" required class="form-input"
                                value="${e?.analysisDate?new Date(e.analysisDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.periodLabel","\u0627\u0644\u0641\u062A\u0631\u0629")}</label>
                            <input type="text" id="analysis-period" class="form-input" placeholder="${s("module.ptw.analysis.form.periodPh","\u0645\u062B\u0627\u0644: \u064A\u0646\u0627\u064A\u0631 2024")}"
                                value="${Utils.escapeHTML(e?.period||"")}">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.workType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</label>
                                <select id="analysis-work-type" class="form-input">
                                    <option value="">${s("module.ptw.analysis.form.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                    ${r.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${e?.workType===c?"selected":""}>
                                            ${Utils.escapeHTML(c)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                                <select id="analysis-location" class="form-input">
                                    <option value="">${s("module.ptw.analysis.form.allSites","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                    ${i.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${e?.location===c?"selected":""}>
                                            ${Utils.escapeHTML(c)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.notesLabel","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</label>
                            <textarea id="analysis-notes" class="form-input" rows="6" placeholder="${s("module.ptw.analysis.form.notesPh","\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C...")}">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.recsLabel","\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A")}</label>
                            <textarea id="analysis-recommendations" class="form-input" rows="4" placeholder="${s("module.ptw.analysis.form.recsPh","\u0623\u062F\u062E\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A...")}">${Utils.escapeHTML(e?.recommendations||"")}</textarea>
                        </div>
                    </div>
                    <div class="modal-footer mt-6 form-actions-centered">
                        <button type="button" class="btn-secondary" data-action="close">${s("module.ptw.analysis.form.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${e?s("module.ptw.analysis.form.update","\u062A\u062D\u062F\u064A\u062B"):s("module.ptw.analysis.form.save","\u062D\u0641\u0638")}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(o);const l=()=>{o&&o.parentNode&&o.remove()},n=o.querySelector(".modal-close");n&&n.addEventListener("click",l);const p=o.querySelector('[data-action="close"]');p&&p.addEventListener("click",l),o.addEventListener("click",c=>{(c.target===o||c.target.classList.contains("modal-overlay"))&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&l()});const d=document.getElementById("ptw-analysis-form");d?d.addEventListener("submit",async c=>{c.preventDefault(),await this.saveAnalysis(t,o)}):Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644")},async saveAnalysis(t,e){try{const a=document.getElementById("analysis-date");if(!a||!a.value){Notification.error(this._t("module.ptw.notify.dateRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644"));return}const r=new Date(a.value);if(isNaN(r.getTime())){Notification.error(this._t("module.ptw.notify.dateInvalid","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"));return}const i={id:t||Utils.generateId("PTW_ANALYSIS"),analysisDate:r.toISOString(),period:(document.getElementById("analysis-period")?.value||"").trim(),workType:(document.getElementById("analysis-work-type")?.value||"").trim(),location:(document.getElementById("analysis-location")?.value||"").trim(),notes:(document.getElementById("analysis-notes")?.value||"").trim(),recommendations:(document.getElementById("analysis-recommendations")?.value||"").trim(),createdAt:t&&AppState.appData.ptwAnalysis?AppState.appData.ptwAnalysis.find(o=>o&&o.id===t)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),t){const o=AppState.appData.ptwAnalysis.findIndex(l=>l&&l.id===t);o!==-1?AppState.appData.ptwAnalysis[o]={...AppState.appData.ptwAnalysis[o],...i}:(Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062A\u062D\u062F\u064A\u062B\u060C \u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F"),AppState.appData.ptwAnalysis.push(i))}else AppState.appData.ptwAnalysis.push(i);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(t?this._t("module.ptw.notify.analysisUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"):this._t("module.ptw.notify.analysisAdded","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")),e&&e.parentNode&&e.remove();const s=document.getElementById("ptw-analysis-content");s&&(s.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",a),Notification.error(this._t("module.ptw.notify.analysisSaveErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},editAnalysis(t){this.showAnalysisForm(t)},async deleteAnalysis(t){if(confirm(this._t("module.ptw.notify.deleteAnalysisConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u061F")))try{AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]);const e=AppState.appData.ptwAnalysis.length;if(AppState.appData.ptwAnalysis=AppState.appData.ptwAnalysis.filter(r=>r&&r.id!==t),AppState.appData.ptwAnalysis.length===e){Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062D\u0630\u0641"),Notification.warning(this._t("module.ptw.notify.analysisNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.notify.analysisDeleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"));const a=document.getElementById("ptw-analysis-content");a&&(a.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",e),Notification.error(this._t("module.ptw.notify.analysisDeleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},renderApprovalsContent(){const t=document.getElementById("ptw-map-content");t&&(t.style.display="none",t.style.visibility="hidden",t.style.opacity="0",t.style.position="absolute",t.style.left="-9999px",t.style.width="0",t.style.height="0",t.style.overflow="hidden",t.style.pointerEvents="none",t.style.zIndex="-1");try{const e=(s,o)=>this._t(s,o),a=AppState.currentUser?.email?.toLowerCase()||"",i=(AppState.appData.ptw||[]).map(s=>{try{return s&&s.approvals&&this.updatePermitStatus(s),s}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",o),s}}).filter(s=>{try{const o=(s?.status||"").trim();if(!s||s.isManualEntry===!0||s.skipApprovalFlow===!0||!s||o==="\u0645\u063A\u0644\u0642"||o==="\u0645\u0631\u0641\u0648\u0636"||o==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||o==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A")return!1;const n=this.normalizeApprovals(s.approvals||[]).find(u=>u&&u.status==="pending");if(!n)return!1;const p=n.approverEmail&&n.approverEmail.toLowerCase()===a,d=!n.approverEmail&&Array.isArray(n.candidates)&&n.candidates.some(u=>u&&u.email&&u.email.toLowerCase()===a),c=AppState.currentUser?.id||"",m=!p&&n.approverId&&(n.approverId===c||n.approverId===a);return p||d||m}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u0635\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",o),!1}}).sort((s,o)=>{const l=s?.createdAt?new Date(s.createdAt).getTime():0;return(o?.createdAt?new Date(o.createdAt).getTime():0)-l});return`
            <div class="space-y-6">
                <!-- My Pending Approvals -->
                <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <div class="card-header bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 p-4 flex justify-between items-center">
                        <h2 class="card-title text-blue-800 font-bold text-lg">
                            <i class="fas fa-signature ml-2 text-blue-600"></i>
                            ${e("module.ptw.approvals.myPending","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u064A")}
                            <span class="mr-2 bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full">${i.length}</span>
                        </h2>
                        <button onclick="PTW.refreshApprovalsContent()" class="btn-secondary btn-sm flex items-center gap-2" title="${e("module.ptw.approvals.updateList","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629")}">
                            <i class="fas fa-sync-alt"></i>
                            <span>${e("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}</span>
                        </button>
                    </div>
                    <div class="card-body p-0">
                        ${i.length?`
                            <div class="overflow-x-auto">
                                <table class="w-full text-right">
                                    <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                                        <tr>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colPermit","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colWorkType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</th>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colLocation","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colStart","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621")}</th>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colStatus","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                                            <th class="px-6 py-4">${e("module.ptw.approvals.colAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${i.map(s=>{try{const o=s?.id||"",l=e("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),n=Utils.escapeHTML(String(s?.workType||l)),p=Utils.escapeHTML(String(s?.location||s?.siteName||l)),d=s?.startDate?typeof Utils.formatDate=="function"?Utils.formatDate(s.startDate):new Date(s.startDate).toLocaleDateString("ar-SA"):"-",m=this.normalizeApprovals(s.approvals||[]).find(k=>k&&k.status==="pending"),u=m&&m.role||e("module.ptw.approval.approvalRequired","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629"),h=String(s?.requesterName||s?.requestedBy?.name||s?.requestedBy||l),f=h!==l?`<div class="text-xs text-gray-500 mt-1">${e("module.ptw.approvals.fromRequester","\u0645\u0646: {name}").replace(/\{name\}/g,Utils.escapeHTML(h))}</div>`:"",x=this.statusLabel(s?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),b=this.approvalRoleLabel(u);return`
                                                    <tr class="hover:bg-gray-50 transition-colors">
                                                        <td class="px-6 py-4">
                                                            <div class="font-mono text-sm text-gray-700 font-semibold">#${Utils.escapeHTML(String(o))}</div>
                                                            ${f}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="font-medium text-gray-800">${n}</div>
                                                            ${b?`<div class="text-xs text-blue-600 mt-1">
                                                                <i class="fas fa-tasks mr-1"></i>${Utils.escapeHTML(b)}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4 text-gray-600 text-sm">${p}</td>
                                                        <td class="px-6 py-4">
                                                            <div class="text-gray-600 text-sm">${d}</div>
                                                            ${s?.createdAt?`<div class="text-xs text-gray-500 mt-1">
                                                                ${e("module.ptw.approvals.createdOn","\u0625\u0646\u0634\u0627\u0621: ")}${typeof Utils.formatDate=="function"?Utils.formatDate(s.createdAt):new Date(s.createdAt).toLocaleDateString("ar-SA")}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                <i class="fas fa-clock mr-1"></i> ${e("module.ptw.approvals.badge","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u062A\u0643")}
                                                            </span>
                                                            <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(String(x))}</div>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <button onclick="PTW.viewPTW('${Utils.escapeHTML(String(o))}')" class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center justify-center">
                                                                <i class="fas fa-eye ml-1"></i> ${e("module.ptw.approvals.review","\u0645\u0631\u0627\u062C\u0639\u0629")}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                `}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",o),""}}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `:`
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="bg-gray-50 rounded-full p-4 mb-3">
                                    <i class="fas fa-check text-gray-300 text-3xl"></i>
                                </div>
                                <h3 class="text-gray-900 font-medium">${e("module.ptw.approvals.noneTitle","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0645\u0639\u0644\u0642\u0629")}</h3>
                                <p class="text-gray-500 text-sm mt-1">${e("module.ptw.approvals.noneSub","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0648\u0643\u0644\u0629 \u0625\u0644\u064A\u0643 \u0645\u0643\u062A\u0645\u0644\u0629.")}</p>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Approval Circuits Integration -->
                 <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="card-header bg-gradient-to-r from-purple-50 to-white border-b border-purple-100 p-4">
                        <h2 class="card-title text-purple-800 font-bold text-lg">
                            <i class="fas fa-project-diagram ml-2 text-purple-600"></i>
                             ${e("module.ptw.approvals.circuits","\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}
                        </h2>
                    </div>
                    <div class="card-body p-6">
                        <div id="approval-circuits-container">
                             ${typeof ApprovalCircuits<"u"&&typeof ApprovalCircuits.renderManager=="function"?(()=>{try{return ApprovalCircuits.renderManager("ptw")}catch(s){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",s),`
                            <div class="text-center py-8">
                                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
                                    <p class="text-yellow-800 text-sm">${e("module.ptw.approvals.circuitsError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}</p>
                                </div>
                            </div>
                        `}})():`
                                    <div class="text-center py-8">
                                        <div class="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <i class="fas fa-route text-purple-400 text-2xl"></i>
                                        </div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-2">${e("module.ptw.approvals.circuitsTitle","\u0646\u0638\u0627\u0645 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</h3>
                                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">${e("module.ptw.approvals.circuitsDesc","\u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u062A\u0643\u0648\u064A\u0646\u0627\u062A \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A.")}</p>
                                        <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-2xl mx-auto text-right">
                                            <h4 class="font-bold text-blue-800 mb-2 text-sm">${e("module.ptw.approvals.circuitsHow","\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A\u061F")}</h4>
                                            <ul class="text-sm text-blue-700 space-y-2 list-disc list-inside">
                                                <li>${e("module.ptw.approvals.circuitsLi1","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0627\u0644\u0645\u0648\u0642\u0639.")}</li>
                                                <li>${e("module.ptw.approvals.circuitsLi2","\u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646 \u062A\u0639\u064A\u064A\u0646 \u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u062D\u062F\u062F\u064A\u0646 \u0644\u0643\u0644 \u0645\u0631\u062D\u0644\u0629.")}</li>
                                                <li>${e("module.ptw.approvals.circuitsLi3","\u062A\u0635\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u062F\u0648\u0631\u0647\u0645 \u0641\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                `}
                        </div>
                    </div>
                 </div>
            </div>
        `}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",e);const a=(r,i)=>this._t(r,i);return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">${a("module.ptw.approvals.errorLoad","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A")}</p>
                            <button onclick="PTW.switchTab('approvals')" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                ${a("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                            </button>
                        </div>
                    </div>
                </div>
            `}},refreshApprovalsContent(){try{const t=document.getElementById("ptw-approvals-content");t&&(t.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"),typeof Notification<"u"&&Notification.success(this._t("module.ptw.approvals.notifyUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629")))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",t),typeof Notification<"u"&&Notification.error(this._t("module.ptw.approvals.notifyErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"))}},setupApprovalsEventListeners(){setTimeout(()=>{document.querySelectorAll('[onclick*="PTW.viewPTW"]').forEach(a=>{const r=a.getAttribute("onclick");if(r&&r.includes("viewPTW")){const i=r.match(/viewPTW\('([^']+)'\)/);i&&i[1]&&(a.removeAttribute("onclick"),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),this.viewPTW(i[1])}))}});const e=document.querySelector('[onclick*="refreshApprovalsContent"]');e&&!e.dataset.listenerAttached&&(e.removeAttribute("onclick"),e.addEventListener("click",()=>this.refreshApprovalsContent()),e.dataset.listenerAttached="true")},100)},loadPTWList(t=!1){this._loadPTWListTimeout&&(clearTimeout(this._loadPTWListTimeout),this._loadPTWListTimeout=null);const e=()=>{try{const a=document.querySelector("#ptw-table-container");if(!a)return;let r=a.querySelector("table");const i=r?.querySelector("tbody"),s=i&&i.querySelectorAll("tr").length>0&&!i.querySelector('tr[data-ptw-loading="1"]');if(r){if(!s&&r.parentNode&&document.body.contains(r)){if(!r.querySelector("thead")){const o=document.createElement("thead");o.innerHTML=`
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
                            `;try{r.insertBefore(o,r.firstChild)}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A insertBefore \u0644\u0644\u0640 thead:",l)}}if(!r.querySelector("tbody")){const o=document.createElement("tbody");o.innerHTML=`
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
                            `;try{r.appendChild(o)}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u0640 tbody:",l)}}}}else if(r=document.createElement("table"),r.className="data-table ptw-permit-list-table",r.innerHTML=`
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
                    `,a.innerHTML="",a.parentNode&&document.body.contains(a))try{a.appendChild(r)}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u062C\u062F\u0648\u0644:",o)}this.filterItems(),this.updateSublocationFilterOptions()}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",a)}};t?e():this._loadPTWListTimeout=setTimeout(e,100)},protectTabButtons(){const t=document.querySelectorAll(".ptw-tab-btn"),e=document.querySelector(".ptw-tabs");e&&(e.style.setProperty("flex-wrap","nowrap","important"),e.style.setProperty("min-width","0","important"),e.style.setProperty("width","100%","important"),e.style.setProperty("max-width","100%","important"),e.style.setProperty("box-sizing","border-box","important")),t.forEach(a=>{a.classList.remove("flex-1"),a.style.setProperty("flex-shrink","0","important"),a.style.setProperty("flex-grow","0","important"),a.style.setProperty("flex-basis","auto","important"),a.style.setProperty("min-width","fit-content","important"),a.style.setProperty("white-space","nowrap","important"),a.style.setProperty("width","auto","important"),a.style.setProperty("max-width","none","important"),a.style.setProperty("box-sizing","border-box","important")})},setupTabProtection(){if(this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),!document.querySelector(".ptw-tabs"))return;let e;const a=new MutationObserver(s=>{clearTimeout(e),e=setTimeout(()=>{let o=!1;s.forEach(l=>{if(l.type==="attributes"&&l.attributeName==="style"){const n=l.target;n.classList.contains("ptw-tab-btn")&&(n.style.flexShrink!=="0"||n.style.minWidth!=="fit-content")&&(o=!0)}}),o&&this.protectTabButtons()},50)});this._tabProtectionObserver=a,document.querySelectorAll(".ptw-tab-btn").forEach(s=>{a.observe(s,{attributes:!0,attributeFilter:["style","class"]})});const i=()=>{this._tabResizeTimeout&&clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=setTimeout(()=>{this.protectTabButtons()},150)};if(this._tabResizeHandler=i,window.addEventListener("resize",i,{passive:!0}),!this._loadHandlerBound){const s=()=>{setTimeout(()=>{this.protectTabButtons()},200)};window.addEventListener("load",s,{once:!0}),this._loadHandlerBound=!0}},cleanupTabProtection(){this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),this._loadHandlerBound=!1},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module..."),this._deferredSyncTimer&&(clearTimeout(this._deferredSyncTimer),this._deferredSyncTimer=null),this._backendSyncStarted=!1,this.cleanupTabProtection(),typeof this.destroyMap=="function"&&this.destroyMap(),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 PTW module:",t)}}};(function(){"use strict";try{typeof window<"u"&&typeof PTW<"u"&&(window.PTW=PTW,window.addEventListener("formSettingsUpdated",function(){try{typeof PTW<"u"&&PTW.refreshSiteDropdowns&&PTW.refreshSiteDropdowns()}catch{}}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PTW module loaded and available on window.PTW"))}catch{if(typeof window<"u"&&typeof PTW<"u")try{window.PTW=PTW}catch{}}})();
