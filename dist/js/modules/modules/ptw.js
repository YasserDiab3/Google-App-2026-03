const PTW={approvals:[],formApprovals:[],formCircuitOwnerId:"__default__",formCircuitName:"",_loadPTWListTimeout:null,_ptwBackendLoadPromise:null,_mapMarkersToken:0,_registrySanitizedCache:null,_registryTableMountToken:0,_isSubmitting:!1,_isSavingManualPermit:!1,_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(e){const t=e||document,a=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;a&&(typeof a.applyI18n=="function"&&a.applyI18n(t),typeof a.applyLiteralTranslations=="function"&&a.applyLiteralTranslations(t))},_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},statusLabel(e){const t=String(e||"").trim();if(!t)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const i={\u0645\u063A\u0644\u0642:"module.ptw.status.closed",\u0645\u0641\u062A\u0648\u062D:"module.ptw.status.open",\u0645\u0631\u0641\u0648\u0636:"module.ptw.status.rejected","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"module.ptw.status.underReview","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"module.ptw.status.approved","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"module.ptw.status.safelyCompleted","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"module.ptw.status.forcedClose","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":"module.ptw.status.incomplete"}[t];return i?this._t(i,t):t},approvalRoleLabel(e){const t=String(e||"").trim();if(!t)return"";const i={"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":"module.ptw.approval.requestingOfficer","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"module.ptw.approval.areaManager","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629":"module.ptw.approval.safetyOfficer","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629":"module.ptw.approval.approvalRequired"}[t];return i?this._t(i,t):t},formatDurationI18n(e){if(!Number.isFinite(e))return this._t("module.ptw.duration.error","\u062E\u0637\u0623");if(e<0)return this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D");const t=Math.floor(e/(1e3*60)),a=Math.floor(t/60),i=t%60;return a===0?this._t("module.ptw.duration.minutesOnly","{n} \u062F\u0642\u064A\u0642\u0629").replace(/\{n\}/g,String(i)):i===0?this._t("module.ptw.duration.hoursOnly","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(a)):this._t("module.ptw.duration.hoursAndMinutes","{h} \u0633\u0627\u0639\u0629 \u0648 {m} \u062F\u0642\u064A\u0642\u0629").replace(/\{h\}/g,String(a)).replace(/\{m\}/g,String(i))},ensureI18nObservers(e){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),e&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(t=>{t.forEach(a=>{a.addedNodes.forEach(i=>{i&&i.nodeType===1&&this.applyModuleI18n(i)})})}),this._i18nSectionObserver.observe(e,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(t=>{t.forEach(a=>{a.addedNodes.forEach(i=>{!i||i.nodeType!==1||(i.classList?.contains("modal-overlay")||i.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(i)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},getDefaultApprovals(){return[{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:0},{role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:1,approvalRoleKey:"areaManager"},{role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:2,approvalRoleKey:"maintenanceEngineer"},{role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",date:"",comments:"",order:3,isSafetyOfficer:!0}]},_PTW_IA_ROLE_BY_AR:{"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"areaManager","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629":"maintenanceEngineer"},_PTW_IA_ROLE_LABELS:{areaManager:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",maintenanceEngineer:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"},_resolveIaRoleKey(e,t){return t?String(t).trim():this._PTW_IA_ROLE_BY_AR[String(e||"").trim()]||""},_iaWorkflowCacheKey:"",_iaWorkflowCachePromise:null,async _getCachedIaWorkflow(e){const t=Array.isArray(e)?e.filter(Boolean):[];if(!t.length)return null;const a=t.slice().sort().join("|");return this._iaWorkflowCacheKey===a&&this._iaWorkflowCachePromise?this._iaWorkflowCachePromise:(this._iaWorkflowCacheKey=a,this._iaWorkflowCachePromise=this._buildIssuingAuthoritiesWorkflow(t).catch(i=>{throw this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null,i}),this._iaWorkflowCachePromise)},_clearIaWorkflowCache(){this._iaWorkflowCacheKey="",this._iaWorkflowCachePromise=null},async _fetchIaCandidatesForRole(e,t){const a=String(t||"").trim();if(!a||a==="general")return[];const i=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!i||typeof i.getAuthoritiesForApprovalRole!="function")return[];const r=this._extractPermitTypeFields(e);try{return await i.getAuthoritiesForApprovalRole(r,a)}catch(s){return typeof Utils<"u"&&Utils.safeWarn("_fetchIaCandidatesForRole error:",s),[]}},_manualEntryToPtwStub(e){return e?{hotWorkDetails:e.hotWorkDetails,confinedSpaceDetails:e.confinedSpaceDetails,heightWorkDetails:e.heightWorkDetails,lotoApplied:e.lotoApplied,coldWorkType:e.coldWorkType,excavationLength:e.excavationLength,excavationWidth:e.excavationWidth,excavationDepth:e.excavationDepth,soilType:e.soilType,permitType:e.permitType,workType:e.workType||e.permitTypeDisplay,otherWorkType:e.otherWorkType,electricalWorkType:e.electricalWorkType}:null},_renderIaRolePickerHTML(e={}){const t=Utils.escapeHTML,a=String(e.roleLabel||e.role||"").trim(),i=this._resolveIaRoleKey(a,e.roleKey),r=Array.isArray(e.candidates)?e.candidates:[],s=String(e.selectedId||e.approverId||"").trim(),o=String(e.selectedName||e.name||"").trim(),n=e.inputClass||"form-input text-sm w-full manual-approval-name",l=e.sigClass||"",p=!!e.isClosure,d=p?"manual-closure-approval-name":"manual-approval-name",c=n.includes(d)?n:`${n} ${d}`,u=A=>A==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",m=r.find(A=>A.id===s),h=o&&!m&&s!=="__manual__",f=h?"__manual__":s||(r.length===1?r[0].id:"");if(r.length===0)return`
                <input type="text" class="${c}" data-role="${t(a)}" data-ia-role-key="${t(i)}" data-ia-manual-only="true" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${t(o)}">
                <p class="text-xs text-gray-500 mt-0.5 mb-0">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B</p>`;const w=f!=="__manual__"&&!h,x=h||f==="__manual__"?o:"";return`
            <div class="ia-role-picker" data-role="${t(a)}" data-ia-role-key="${t(i)}" data-ia-scope="${p?"closure":"approval"}">
                <select class="form-input text-sm w-full ia-approval-select ${l?"":"mb-1"}" data-role="${t(a)}" data-ia-role-key="${t(i)}">
                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</option>
                    ${r.map(A=>`
                        <option value="${t(A.id||"")}" ${A.id===f?"selected":""}>
                            ${t(A.name||A.email||"")}${t(u(A.personType))}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${f==="__manual__"||h?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="${c} ia-approval-manual ${w?"hidden":""}" data-role="${t(a)}" data-ia-role-key="${t(i)}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B" value="${t(x)}">
            </div>`},_setupIaRolePickerListeners(e){e&&e.querySelectorAll(".ia-role-picker").forEach(t=>{const a=t.querySelector(".ia-approval-select"),i=t.querySelector(".ia-approval-manual");if(!a||!i)return;const r=()=>{const s=a.value==="__manual__";if(i.classList.toggle("hidden",!s),!s&&a.value){const o=a.options[a.selectedIndex];i.value=o?o.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():""}};a.addEventListener("change",r),r()})},_readIaRolePickerValue(e,t,{isClosure:a=!1}={}){const i=typeof e=="string"?e:e?.dataset?.role;if(!i||!t)return{name:"",approverId:"",personType:"",isManualApprover:!0};const r=a?".manual-closure-approval-name":".manual-approval-name",s=a?"#manual-closure-approvals-list":"#manual-approvals-list",o=t.querySelector(s)||t,n=o.querySelector(`.ia-role-picker[data-role="${i}"]`);if(!n)return{name:(o.querySelector(`${r}[data-role="${i}"]`)||t.querySelector(`${r}[data-role="${i}"]`))?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0};const l=n.querySelector(".ia-approval-select"),p=n.querySelector(".ia-approval-manual"),d=n.dataset.iaRoleKey||this._resolveIaRoleKey(i);if(l?.value&&l.value!=="__manual__"){const c=l.options[l.selectedIndex],u=c?c.textContent.replace(/\s*\((?:مقاول|موظف)\)\s*$/,"").trim():"",m=c&&c.textContent.includes("(\u0645\u0642\u0627\u0648\u0644)")?"contractor":"employee";return{name:u,approverId:l.value,personType:m,isManualApprover:!1,approvalRoleKey:d}}return{name:p?.value?.trim()||"",approverId:"",personType:"",isManualApprover:!0,approvalRoleKey:d}},_renderSystemApproverCell(e,t,a,i="approval"){const r=Utils.escapeHTML,s=Array.isArray(e.candidates)?e.candidates:[],o=e.approverId||"",n=e.approver||"",l=e.isManualApprover===!0||!o&&!!n,p=l?"__manual__":o,d=f=>f==="contractor"?" (\u0645\u0642\u0627\u0648\u0644)":" (\u0645\u0648\u0638\u0641)",c=`${i}-approver-select-${t}`,u=`${i}-approver-manual-${t}`,m=`${i}-approver-${t}`;if(s.length===0)return`
                <input type="text" class="form-input ${i}-approver-manual" style="min-width: 180px;"
                    value="${r(n)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F"
                    id="${m}">
                <p class="text-xs text-gray-500 mt-1">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u2014 \u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B.</p>`;const h=p!=="__manual__";return`
            <div class="ia-system-approver-picker" data-index="${t}" data-prefix="${i}">
                <select class="form-input ${i}-approver-select" id="${c}" style="min-width: 180px;">
                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                    ${s.map(f=>`
                        <option value="${r(f.id||"")}" ${f.id===p?"selected":""}>
                            ${r(f.name||f.email||"")}${r(d(f.personType))}
                            ${f.email?` - ${r(f.email)}`:""}
                        </option>
                    `).join("")}
                    <option value="__manual__" ${p==="__manual__"?"selected":""}>\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                </select>
                <input type="text" class="form-input ${i}-approver-manual ${h?"hidden":""} mt-1" style="min-width: 180px;"
                    value="${r(l?n:"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u064A\u062F\u0648\u064A\u0627\u064B"
                    id="${u}">
            </div>`},_setupSystemApproverPickerListeners(e){e&&e.querySelectorAll(".ia-system-approver-picker").forEach(t=>{const a=t.dataset.index,i=t.dataset.prefix||"approval",r=t.querySelector(`#${i}-approver-select-${a}`),s=t.querySelector(`#${i}-approver-manual-${a}`);if(!r||!s)return;const o=()=>{s.classList.toggle("hidden",r.value!=="__manual__")};r.addEventListener("change",o),o()})},isSafetyRole(e=""){return["\u0627\u0644\u0633\u0644\u0627\u0645\u0629","Safety"].some(a=>e&&e.toLowerCase().includes(a.toLowerCase()))},updateApprovalNumbers(e){const t=document.getElementById(e);if(!t)return;t.querySelectorAll("tr").forEach((i,r)=>{const s=i.querySelector("td:first-child");s&&(s.textContent=r+1)})},normalizeApprovals(e=[]){return!Array.isArray(e)||e.length===0?this.getDefaultApprovals():e.map((t,a)=>{const i=t.circuitOwnerId||"__default__",r=Array.isArray(t.candidates)?t.candidates.map(p=>p?p.id&&p.name&&p.email!==void 0?p:ApprovalCircuits.toCandidate(ApprovalCircuits.getUserById(p.id||p)):null).filter(Boolean):[];let s=t.approverId||t.approverUserId||"",o=t.approver||"",n=t.approverEmail||"";if(s){const p=ApprovalCircuits.getUserById(s);p&&(o=o||p.name||p.email||"",n=n||p.email||"")}else if(n){const p=r.find(d=>d.email&&d.email.toLowerCase()===n.toLowerCase());p&&(s=p.id,o=p.name||o)}const l={role:t.role||"",approverId:s,approver:o,approverEmail:n,required:t.required!==!1,approved:t.approved===!0,rejected:t.rejected===!0,status:t.status||(t.approved?"approved":t.rejected?"rejected":"pending"),date:t.date||"",comments:t.comments||"",order:typeof t.order=="number"?t.order:a,isSafetyOfficer:t.isSafetyOfficer===!0||this.isSafetyRole(t.role),candidates:r,history:Array.isArray(t.history)?t.history:[],assignedAt:t.assignedAt||"",assignedBy:t.assignedBy||null,circuitOwnerId:i,issuingAuthoritySource:t.issuingAuthoritySource===!0,approvalRoleKey:t.approvalRoleKey||this._resolveIaRoleKey(t.role),isManualApprover:t.isManualApprover===!0,personType:t.personType||"",requiresHseCoApproval:t.requiresHseCoApproval===!0,isHseCoApprovalGate:t.isHseCoApprovalGate===!0};return l.status==="approved"?(l.approved=!0,l.rejected=!1):l.status==="rejected"?(l.approved=!1,l.rejected=!0):(l.status="pending",l.approved=!1,l.rejected=!1),l}).sort((t,a)=>(t.order||0)-(a.order||0))},getNextPendingApproval(e=[]){return e.find(t=>t.status==="pending")},updatePermitStatus(e){if(!e)return;if(e.isManualEntry===!0){const o=String(e.status||"").trim();e.approvals=[],e.status=o||"\u0645\u063A\u0644\u0642";return}if(e.approvals=this.normalizeApprovals(e.approvals||[]),e.approvals.some(o=>o.status==="rejected"&&o.required!==!1)){e.status="\u0645\u0631\u0641\u0648\u0636",e.rejectedAt=e.rejectedAt||new Date().toISOString();return}const a=e.approvals.filter(o=>o.required!==!1),i=a.length>0&&a.every(o=>o.status==="approved"),r=e.approvals.find(o=>o.isSafetyOfficer===!0),s=!r||r.status==="approved";i&&s?(e.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",e.approvedAt=e.approvedAt||new Date().toISOString()):e.approvals.some(n=>n.status==="pending"&&n.required!==!1)?e.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":a.length===0?(e.status="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",e.approvedAt=e.approvedAt||new Date().toISOString()):e.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"},triggerNotificationsUpdate(){document.dispatchEvent(new CustomEvent("ptw:updated"))},notifyPermitCreated(e){const t=this.getNextPendingApproval(e.approvals||[]);let a=this._t("module.ptw.notify.submitted","\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629.");if(t&&t.role){const i=this.approvalRoleLabel(t.role);t.approver?a+=" "+this._t("module.ptw.notify.nextWithApprover","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role} (\u0627\u0644\u0645\u0633\u0624\u0648\u0644: {name}).").replace(/\{role\}/g,i).replace(/\{name\}/g,String(t.approver)):a+=" "+this._t("module.ptw.notify.nextNeedAssign","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629: {role}. \u064A\u0631\u062C\u0649 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.").replace(/\{role\}/g,i)}Notification.success(a)},updateStatusField(e){const t=document.getElementById("ptw-status");if(!t)return;const a=e||t.getAttribute("data-current-status")||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629";t.value=a,t.setAttribute("data-current-status",a),t.disabled=!0,t.classList.add("opacity-70","cursor-not-allowed"),t.setAttribute("title",this._t("module.ptw.statusField.title","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0628\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A"))},getWorkTypePrefix(e){return!e||e.trim()===""?"PTW":{\u0633\u0627\u062E\u0646:"HTW",\u0628\u0627\u0631\u062F:"CTW",\u0643\u0647\u0631\u0628\u0627\u0626\u064A:"ETW",\u062D\u0631:"EXW",\u0627\u0631\u062A\u0641\u0627\u0639:"HTW",\u0646\u0641\u0637:"OTW",\u063A\u0627\u0632:"GTW",\u0625\u063A\u0644\u0627\u0642:"ISW",\u0643\u064A\u0645\u064A\u0627\u0626\u064A:"CHW",\u0622\u062E\u0631:"OTW","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629":"HTW","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629":"CTW","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629":"ETW","\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631":"EXW","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629":"CSW","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649":"OTW"}[e]||"PTW"},generateSequentialPTWId(e){const t=this.getWorkTypePrefix(e),i=(AppState.appData.ptw||[]).filter(s=>s.id?!e||e.trim()===""?!s.workType||s.workType.trim()===""||s.id.startsWith("PTW_"):s.workType?this.getWorkTypePrefix(s.workType)===t:!1:!1);let r=0;return i.forEach(s=>{if(s.id&&s.id.includes("_")){const o=s.id.split("_");if(o.length>1){const n=parseInt(o[o.length-1]);!isNaN(n)&&n>r&&(r=n)}}}),String(r+1).padStart(4,"0")},generateTemporaryId(e){return`${String(e||"TMP").trim().toUpperCase()}_TMP_${Date.now()}_${Math.random().toString(36).substr(2,6)}`},getSiteOptions(){try{const e=(t,a)=>PTW._t(t,a);return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||e("module.ptw.fallback.unnamedSite","\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,a)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||e("module.ptw.fallback.numberedSite","\u0645\u0648\u0642\u0639 {n}").replace(/\{n\}/g,String(a+1))})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:o=>String(o??""),a=(o,n)=>this._t(o,n),i=o=>'<option value="">'+(o||a("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639"))+"</option>"+(e||[]).map(n=>'<option value="'+t(n.id)+'">'+t(n.name)+"</option>").join("");["manual-permit-location","ptw-filter-location","ptw-location","analysis-location"].forEach(o=>{const n=document.getElementById(o);if(n&&n.tagName==="SELECT"){const l=n.value;n.innerHTML=i(a("module.ptw.placeholder.selectSite","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639")),l&&(n.value=l)}}),["manual-permit-sublocation","ptw-filter-sublocation","ptw-sublocation"].forEach(o=>{const n=document.getElementById(o);if(n&&n.tagName==="SELECT"){const l=(document.getElementById("ptw-location")||document.getElementById("manual-permit-location")||{}).value,p=this.getPlaceOptions(l),d=a("module.ptw.placeholder.selectSub","\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A"),c=n.value;n.innerHTML='<option value="">'+d+"</option>"+(p||[]).map(u=>'<option value="'+t(u.id)+'">'+t(u.name)+"</option>").join(""),c&&(n.value=c)}})}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F PTW.refreshSiteDropdowns:",e)}},getDepartmentOptionsForPTW(){try{if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartmentOptions=="function"){const t=DailyObservations.getDepartmentOptions();if(Array.isArray(t)&&t.length>0)return t}if(typeof AppUtils<"u"&&typeof AppUtils.getInitialFormDepartments=="function"){const t=AppUtils.getInitialFormDepartments();if(Array.isArray(t)&&t.length>0)return t}const e=AppState?.companySettings||{};return Array.isArray(e.formDepartments)&&e.formDepartments.length>0?e.formDepartments.map(t=>String(t||"").trim()).filter(Boolean):Array.isArray(e.departments)?e.departments.map(t=>String(t||"").trim()).filter(Boolean):typeof e.departments=="string"?e.departments.split(/\n|,/).map(t=>t.trim()).filter(Boolean):[]}catch(e){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(i=>i.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(r=>r.id===e);if(i&&Array.isArray(i.places))return i.places.map(r=>({id:r.id,name:r.name}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(r=>(r.id||r.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const i=DailyObservations.DEFAULT_SITES.find(r=>(r.id||r.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},registryData:[],currentTab:"permits",_isManualPtwEntry(e){return!!(e&&(e.isManualEntry===!0||e.isManualEntry==="true"))},_normalizePtwPersonKey(e){return String(e||"").trim().replace(/\s+/g," ").toLowerCase()},_getManualPermitEntryTimestamp(e){if(!e)return 0;const t=[e.updatedAt,e.createdAt,e.openDate,e.timeFrom,e.date,e.closureDate];for(const a of t){if(!a)continue;const i=new Date(a).getTime();if(!Number.isNaN(i))return i}return 0},_collectManualPermitEntriesForLookup(e=null){const t=new Set,a=[],i=String(e||"").trim(),r=s=>{if(!this._isManualPtwEntry(s))return;const o=String(s.id||s.permitId||"").trim();if(i&&o&&o===i)return;const n=o||`seq:${s.sequentialNumber||""}:${s.paperPermitNo||s.permitNumber||""}`;n&&t.has(n)||(n&&t.add(n),a.push(s))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(r),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(r),a},_parseTeamMembersFromEntry(e){let t=e?.teamMembers;return(!t||!t.length)&&e?.teamMembersText&&(t=String(e.teamMembersText).trim().split(/[،,]/).map(i=>{i=i.trim();const r=i.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return r?{name:r[1].trim(),signature:r[2].trim()}:{name:i,signature:""}}).filter(i=>i.name||i.signature)),Array.isArray(t)?t:[]},_resolveManualLookupRoleKey(e){const t=String(e||"").trim();return t==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"||t==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"?"requestingParty":t==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"?"areaManager":t==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"?"maintenanceEngineer":null},buildKnownTeamMembersIndex(e=null){const t=new Map;return this._collectManualPermitEntriesForLookup(e).forEach(a=>{const i=this._getManualPermitEntryTimestamp(a);this._parseTeamMembersFromEntry(a).forEach(r=>{const s=String(r.name||"").trim();if(!s)return;const o=this._normalizePtwPersonKey(s),n=t.get(o);(!n||i>=n.updatedAt)&&t.set(o,{name:s,signature:String(r.signature||r.id||"").trim(),updatedAt:i})})}),t},buildKnownManualApprovalsIndex(e=null){const t=new Map,a=(r,s,o)=>{if(!r||!s?.name)return;t.has(r)||t.set(r,new Map);const n=t.get(r),l=this._normalizePtwPersonKey(s.name),p=n.get(l);(!p||o>=p.updatedAt)&&n.set(l,{...s,updatedAt:o})},i=(r,s,o)=>{const n=this._getManualPermitEntryTimestamp(r);(Array.isArray(s)&&s.length?s:this.resolveManualApprovalsList(s,o)).forEach(p=>{const d=this._resolveManualLookupRoleKey(p.role);if(!d)return;const c=String(p.name||p.approver||"").trim();c&&a(d,{name:c,signature:String(p.signature||"").trim(),approverId:String(p.approverId||"").trim(),personType:String(p.personType||"").trim()},n)})};return this._collectManualPermitEntriesForLookup(e).forEach(r=>{i(r,r.manualApprovals,r.manualApprovalsText),i(r,r.manualClosureApprovals,r.manualClosureApprovalsText)}),t},lookupKnownTeamMember(e,t){const a=this._normalizePtwPersonKey(e);return!a||!t?null:t.get(a)||null},lookupKnownManualApprover(e,t,a){const i=this._resolveManualLookupRoleKey(e);if(!i||!a||!t)return null;const r=a.get(i);return r&&r.get(this._normalizePtwPersonKey(t))||null},getKnownTeamMemberNames(e){return e?Array.from(e.values()).map(t=>t.name).filter(Boolean):[]},getKnownApproverNamesForRole(e,t){const a=this._resolveManualLookupRoleKey(t);return!a||!e?.has(a)?[]:Array.from(e.get(a).values()).map(i=>i.name).filter(Boolean)},buildManualPermitDatalistHtml(e){const t=Utils.escapeHTML,a=[],i=new Set;return(e||[]).forEach(r=>{const s=String(r||"").trim();if(!s)return;const o=this._normalizePtwPersonKey(s);i.has(o)||(i.add(o),a.push(s))}),a.sort((r,s)=>r.localeCompare(s,"ar")),a.map(r=>`<option value="${t(r)}"></option>`).join("")},_attachManualPermitNameSignatureLookup(e,t,a){if(!e||!t)return;const i=()=>{if(typeof a!="function")return!1;const s=String(e.value||"").trim();if(!s)return!1;const o=a(s);if(!o)return delete e.dataset.knownLoaded,!1;const n=String(o.signature||"").trim()||s;return t.value=n,e.dataset.autoCopiedValue=n,e.dataset.knownLoaded="1",!0},r=()=>{const s=String(e.value||"").trim(),o=String(t.value||"").trim(),n=e.dataset.autoCopiedValue||"";(!o||o===n)&&(t.value=s,e.dataset.autoCopiedValue=s)};e.addEventListener("input",()=>{delete e.dataset.knownLoaded,r()}),e.addEventListener("change",()=>{i()||r()}),e.addEventListener("blur",()=>{i()}),r()},_applyKnownManualApproverToPicker(e,t,a,i){if(!e||!a||!i)return;const s=i.id==="manual-closure-approvals-list"?".manual-closure-approval-sig":".manual-approval-sig",o=i.querySelector(`${s}[data-role="${t}"]`),n=e.querySelector(".ia-approval-select"),l=e.querySelector(".ia-approval-manual"),p=e.querySelector('[data-ia-manual-only="true"]');if(a.approverId&&n?Array.from(n.options).some(c=>c.value===a.approverId)?(n.value=a.approverId,n.dispatchEvent(new Event("change",{bubbles:!0}))):l&&(n.value="__manual__",l.classList.remove("hidden"),l.value=a.name,n.dispatchEvent(new Event("change",{bubbles:!0}))):l?(n&&(n.value="__manual__",l.classList.remove("hidden"),n.dispatchEvent(new Event("change",{bubbles:!0}))),l.value=a.name):p&&(p.value=a.name),o){const d=String(a.signature||"").trim();o.value=d||a.name}},setupManualPermitKnownLookups(e,t,a){if(!e)return;const i={"#manual-approvals-list":["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"],"#manual-closure-approvals-list":["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"]},r={requestingParty:"manual-approval-datalist-requestingParty",areaManager:"manual-approval-datalist-areaManager",maintenanceEngineer:"manual-approval-datalist-maintenanceEngineer"},s=o=>{const n=o?.querySelector(".manual-team-member-name"),l=o?.querySelector(".manual-team-member-signature");n&&(n.setAttribute("list","manual-team-member-names-datalist"),n.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(n,l,p=>this.lookupKnownTeamMember(p,t))};e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row").forEach(s),e._attachManualTeamRowLookup=s,Object.entries(i).forEach(([o,n])=>{const l=e.querySelector(o);l&&n.forEach(p=>{const d=this._resolveManualLookupRoleKey(p),c=d?r[d]:null,u=l.querySelector(`.manual-approval-name[data-role="${p}"], .manual-closure-approval-name[data-role="${p}"]`),m=l.querySelector(`.manual-approval-sig[data-role="${p}"], .manual-closure-approval-sig[data-role="${p}"]`);u&&u.tagName==="INPUT"&&!u.classList.contains("ia-approval-manual")&&(c&&(u.setAttribute("list",c),u.setAttribute("autocomplete","off")),this._attachManualPermitNameSignatureLookup(u,m,f=>this.lookupKnownManualApprover(p,f,a)));const h=l.querySelector(`.ia-role-picker[data-role="${p}"]`);if(h&&d&&["areaManager","maintenanceEngineer"].includes(d)){const f=h.querySelector(".ia-approval-manual"),w=h.querySelector('[data-ia-manual-only="true"]'),x=f||w;x&&c&&(x.setAttribute("list",c),x.setAttribute("autocomplete","off")),x&&m&&this._attachManualPermitNameSignatureLookup(x,m,v=>this.lookupKnownManualApprover(p,v,a));const A=()=>{const v=String(x?.value||"").trim();if(!v)return;const U=this.lookupKnownManualApprover(p,v,a);U&&this._applyKnownManualApproverToPicker(h,p,U,l)};x&&(x.addEventListener("change",A),x.addEventListener("blur",A))}})})},initRegistry(e=!1){try{if(AppState.appData&&AppState.appData.ptwRegistry&&Array.isArray(AppState.appData.ptwRegistry)){this.setPtwRegistryState(AppState.appData.ptwRegistry,"AppState.ptwRegistry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 AppState`);return}const t=localStorage.getItem("hse_ptw_registry");if(t)try{this.setPtwRegistryState(JSON.parse(t),"localStorage.hse_ptw_registry"),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 localStorage`)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 localStorage:",a),this.registryData=[]}else this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",t),this.registryData=[],AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[]}},async saveRegistryData(e={}){try{const{skipSync:t=!1}=e;if(this.setPtwRegistryState(this.registryData,"saveRegistryData"),this.refreshRegistryViewIfVisible(),!t&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const a=s=>{const o=String(s?.id||"").trim(),n=String(s?.permitId||"").trim();return o.includes("_TMP_")||n.includes("_TMP_")},i=Array.isArray(this.registryData)?this.registryData.filter(s=>!a(s)):this.registryData;if(Array.isArray(i)&&i.length===0&&Array.isArray(this.registryData)&&this.registryData.length>0)return Utils.safeLog("\u26A0\uFE0F saveRegistryData: \u062A\u0645 \u062A\u062E\u0637\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641\u0627\u062A \u0645\u0624\u0642\u062A\u0629"),!0;const r=await GoogleIntegration.autoSave("PTWRegistry",i);if(r&&r.resolvedPTWRegistry){const s=r.resolvedPTWRegistry,o=(n,l)=>{const p=String(n||"").trim();if(p){if(l&&l.id&&Array.isArray(this.registryData)){const d=this.registryData.findIndex(c=>String(c.paperPermitNumber||"").trim()===String(l.paperPermitNumber||"").trim());d!==-1&&(this.registryData[d]={...this.registryData[d],id:l.id,permitId:p})}if(typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw)){const d=String(l?.paperPermitNumber||"").trim();if(d){const c=AppState.appData.ptw.findIndex(u=>String(u.paperPermitNumber||"").trim()===d);c!==-1&&(AppState.appData.ptw[c]={...AppState.appData.ptw[c],id:p})}}}};Array.isArray(s)?s.forEach(n=>o(n.permitId,n)):s.permitId&&o(s.permitId,s),this.setPtwRegistryState(this.registryData,"saveRegistryData_resolved")}}return!0}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",t),!1}},async _fetchPtwRegistryRowsNoMutation(){try{if(!GoogleIntegration||typeof GoogleIntegration._isBackendRpcConfigured!="function"||!GoogleIntegration._isBackendRpcConfigured())return null;const e=AppState.googleConfig?.sheets?.spreadsheetId?.trim();if(!e)return null;const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:e}});if(t&&t.success&&Array.isArray(t.data))return t.data}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 PTWRegistry \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}return null},_manualPermitRowExistsOnBackend(e,t,a){if(!Array.isArray(e)||e.length===0)return!1;const i=String(t?.paperPermitNumber||a?.paperPermitNumber||"").trim(),r=String(t?.permitId||"").trim(),s=String(a?.id||"").trim();return e.some(o=>!o||typeof o!="object"?!1:!!(i&&String(o.paperPermitNumber||"").trim()===i||r&&String(o.permitId||"").trim()===r||s&&String(o.permitId||"").trim()===s))},async syncManualPermitRecordsToBackend(e,t,a={}){const{isNewRegistryEntry:i=!1,isNewPermit:r=!1}=a;if(!e||!t||typeof GoogleIntegration>"u")return!0;const s=["createdBy","createdById","updatedBy","updatedById"],o=12e4,n=async(d,c,u=!1)=>{const m=AppState.googleConfig?.sheets?.spreadsheetId?.trim(),h=x=>{const A={sheetName:d,data:typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(d,x):x,__timeoutMs:o};return m&&(A.spreadsheetId=m),A},f=x=>GoogleIntegration.sendToAppsScript(u?"appendToSheet":"saveToSheet",h(x)),w=x=>{const v={...typeof GoogleIntegration.prepareSheetPayload=="function"?GoogleIntegration.prepareSheetPayload(d,x):{...x}};return s.forEach(U=>{delete v[U]}),v};try{return await f(c)}catch(x){const A=String(x?.message||"");if(!/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(A))throw x;return await f(w(c))}};let l=!1,p=!1;try{const d=await n("PTWRegistry",e,i);if(!d||d.success!==!0)throw new Error(d?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");l=!0;const c=d.resolvedPTWRegistry,u=String(e.paperPermitNumber||t.paperPermitNumber||"").trim(),m=String(e.permitId||t.id||"").trim(),h=(w,x)=>{const A=String(w||"").trim();if(A&&(t.id=A,e&&(e.permitId=A,x&&x.id&&(e.id=x.id)),typeof AppState<"u"&&AppState.appData&&Array.isArray(AppState.appData.ptw))){const v=AppState.appData.ptw.findIndex(U=>String(U.id||"").trim()===m);v!==-1&&(AppState.appData.ptw[v]={...AppState.appData.ptw[v],id:A})}};if(c&&c.permitId){if(h(c.permitId,c),u&&Array.isArray(this.registryData)){const w=this.registryData.findIndex(x=>String(x.paperPermitNumber||"").trim()===u&&(x.isManualEntry===!0||x.isManualEntry==="true"));w!==-1&&(this.registryData[w]={...this.registryData[w],...c})}}else{try{typeof this.loadRegistryFromBackend=="function"&&await this.loadRegistryFromBackend()}catch(w){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 PTWRegistry \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",w)}if(u&&Array.isArray(this.registryData)){const w=this.registryData.find(x=>String(x.paperPermitNumber||"").trim()===u&&(x.isManualEntry===!0||x.isManualEntry==="true"));w&&w.permitId&&h(w.permitId,w)}}const f=await n("PTW",t,r);if(!f||f.success!==!0)throw new Error(f?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629");p=!0,typeof GoogleIntegration.clearCache=="function"&&(GoogleIntegration.clearCache("PTWRegistry"),GoogleIntegration.clearCache("PTW"));try{typeof this.saveRegistryData=="function"&&await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save())}catch(w){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",w)}return!0}catch(d){throw typeof DataManager<"u"&&DataManager.addToPendingSync&&(l||DataManager.addToPendingSync("PTWRegistry",e),p||DataManager.addToPendingSync("PTW",t)),d}},refreshRegistryViewIfVisible(){try{const e=document.getElementById("ptw-registry-content");e&&e.style.display!=="none"&&(this._refreshRegistryViewLight(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0627\u0644\u0633\u062C\u0644:",e)}},parseDateTimeValue(e){if(e==null||e===""||e==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"||String(e).trim()==="Not specified")return null;if(e instanceof Date)return isNaN(e.getTime())?null:new Date(e.getTime());if(typeof e=="number"&&isFinite(e)){const o=new Date(e);return isNaN(o.getTime())?null:o}const t=String(e).trim();if(!t)return null;const a=t.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);if(a){const[,o,n,l,p,d,c]=a,u=new Date(Number(l),Number(n)-1,Number(o),Number(p||0),Number(d||0),Number(c||0),0);return isNaN(u.getTime())?null:u}const i=t.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})$/);if(i){const[,o,n,l]=i,p=new Date(Number(o),Number(n)-1,Number(l),0,0,0,0);return isNaN(p.getTime())?null:p}const r=t.match(/^(\d{4})[/\-](\d{2})[/\-](\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/);if(r){const[,o,n,l,p,d,c]=r,u=new Date(Number(o),Number(n)-1,Number(l),Number(p),Number(d),Number(c||0),0);return isNaN(u.getTime())?null:u}const s=new Date(t);return isNaN(s.getTime())?null:s},formatDurationFromMilliseconds(e){return this.formatDurationI18n(e)},dateInputToISO(e){if(!e)return null;const t=String(e).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return null;const[,a,i,r]=t,s=new Date(Number(a),Number(i)-1,Number(r),0,0,0,0);return isNaN(s.getTime())?null:s.toISOString()},calculateTotalTime(e,t){if(!e||!t)return this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const a=this.parseDateTimeValue(e),i=this.parseDateTimeValue(t);return!a||!i?this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):this.formatDurationFromMilliseconds(i-a)}catch{return this._t("module.ptw.duration.error","\u062E\u0637\u0623")}},getCurrentUserActor(){const e=AppState?.currentUser||{};return{id:String(e.id||"").trim(),name:String(e.name||e.displayName||e.email||"\u0645\u0633\u062A\u062E\u062F\u0645").trim(),email:String(e.email||"").trim(),role:String(e.role||"").trim()}},isUsableDurationText(e){const t=String(e||"").trim();return!(!t||["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D","\u062E\u0637\u0623","Not specified","Invalid","Error"].includes(t)||t===this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")||t===this._t("module.ptw.duration.invalid","\u063A\u064A\u0631 \u0635\u062D\u064A\u062D")||t===this._t("module.ptw.duration.error","\u062E\u0637\u0623"))},normalizeRegistryEntry(e){if(!e||typeof e!="object")return e;const t={...e};if((!t.sublocation||String(t.sublocation).trim()==="")&&typeof t.location=="string"){const o=String(t.location).trim(),n=o.indexOf(" - ");if(n>0){const l=o.slice(0,n).trim(),p=o.slice(n+3).trim();l&&p&&(t.location=l,t.sublocation=p)}}const a=t.timeFrom||t.openDate||"",i=this.calculateTotalTime(a,t.timeTo),r=this.calculateTotalTime(a,t.closureDate),s=String(t.totalTime||"").trim();if(!t.openDate&&t.timeFrom&&(t.openDate=t.timeFrom),!t.timeFrom&&t.openDate&&(t.timeFrom=t.openDate),this.isUsableDurationText(i)?t.totalTime=i:this.isUsableDurationText(r)?t.totalTime=r:t.totalTime=this.isUsableDurationText(s)?s:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",t.isManualEntry===!0){t.approvals=[],t.skipApprovalFlow=!0,String(t.approvalCircuitOwnerId||"").trim()||(t.approvalCircuitOwnerId="__manual__"),String(t.approvalCircuitName||"").trim()||(t.approvalCircuitName="Manual Entry");const o=String(t.status||"").trim();if(t.status=o||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",t.manualApprovals=this.resolveManualApprovalsList(t.manualApprovals,t.manualApprovalsText),t.manualClosureApprovals=this.resolveManualApprovalsList(t.manualClosureApprovals,t.manualClosureApprovalsText),!Array.isArray(t.requiredPPE)||!t.requiredPPE.length){const n=t.requiredPPE||t.ppeNotes||"";typeof n=="string"&&n.trim()?t.requiredPPE=n.split(/[،,]/).map(l=>l.trim()).filter(Boolean):Array.isArray(t.requiredPPE)||(t.requiredPPE=[])}if((!t.teamMembers||!t.teamMembers.length)&&t.teamMembersText){const n=String(t.teamMembersText).trim();t.teamMembers=n.split(/[،,]/).map(l=>{l=l.trim();const p=l.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return p?{name:p[1].trim(),signature:p[2].trim()}:{name:l,signature:""}}).filter(l=>l.name||l.signature)}}if(t.sequentialNumber!=null&&t.sequentialNumber!==""){const o=parseInt(String(t.sequentialNumber).replace(/^0+(?=\d)/,""),10);!isNaN(o)&&o>0&&(t.sequentialNumber=o)}return t},normalizeRegistryCollection(e){if(!Array.isArray(e))return[];const t=e.map(o=>this.normalizeRegistryEntry(o)).filter(Boolean),a=(o,n)=>{const l=String(o.id||"").includes("_TMP_");return!String(n.id||"").includes("_TMP_")&&l?n:o},i=new Map,r=new Map,s=[];for(const o of t){const n=String(o.id||"").trim();if(n){i.has(n)?i.set(n,a(i.get(n),o)):i.set(n,o);continue}const p=[o.sequentialNumber!=null&&o.sequentialNumber!==""?String(o.sequentialNumber):"",String(o.permitId||"").trim(),String(o.paperPermitNumber||"").trim(),String(o.openDate||o.timeFrom||"").trim(),String(o.location||"").trim(),String(o.requestingParty||"").trim()].filter(Boolean).join("::");if(p)r.has(p)?r.set(p,a(r.get(p),o)):r.set(p,o);else{const d=o.permitId||o.paperPermitNumber;(!d||!s.some(c=>(c.permitId||c.paperPermitNumber)===d))&&s.push(o)}}return[...i.values(),...r.values(),...s]},isLikelyUsersRecord(e){if(!e||typeof e!="object")return!1;const t=!!String(e.email||"").trim(),a=["password","passwordHash","role","permissions"].some(i=>Object.prototype.hasOwnProperty.call(e,i));return t&&a},isValidPtwRegistryRecord(e){if(!e||typeof e!="object"||Array.isArray(e)||this.isLikelyUsersRecord(e))return!1;const a=["id","permitId","sequentialNumber","paperPermitNumber"].some(s=>String(e[s]??"").trim()!=="");return a?["workDescription","location","timeFrom","openDate","permitType","status","authorizedParty"].some(s=>Object.prototype.hasOwnProperty.call(e,s))||a:!1},sanitizePtwRegistryDataset(e,t="unknown"){if(!Array.isArray(e))return[];const a=e.filter(i=>this.isValidPtwRegistryRecord(i));return a.length!==e.length&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0645 \u0631\u0641\u0636 ${e.length-a.length} \u0633\u062C\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0645\u0646 ${t} \u0644\u0628\u064A\u0627\u0646\u0627\u062A PTWRegistry`),this.normalizeRegistryCollection(a)},setPtwRegistryState(e,t="unknown"){const a=this.sanitizePtwRegistryDataset(e,t);this.registryData=a,this._registrySanitizedCache=null,AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...a];try{localStorage.setItem("hse_ptw_registry",Utils.safeStringify(a))}catch{}return a},normalizePermitStatus(e){const t=String(e||"").trim();return!t||t==="closed"||t==="Closed"||t==="CLOSED"||t==="\u0645\u063A\u0644\u0642\u0629"||t==="\u0627\u0643\u062A\u0645\u0644"?"\u0645\u063A\u0644\u0642":t},isPermitClosedStatus(e){const t=this.normalizePermitStatus(e);return t==="\u0645\u063A\u0644\u0642"||t==="\u0645\u0631\u0641\u0648\u0636"||t==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||t==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"||t==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"},isPermitOpenStatus(e){return!this.isPermitClosedStatus(e)},mergePermitsPreferRegistry(e,t){const a=new Map;return(e||[]).forEach(i=>{i&&i.id&&a.set(i.id,{...i,status:this.normalizePermitStatus(i.status)})}),(t||[]).forEach(i=>{if(i&&i.id){const r=a.get(i.id)||{};a.set(i.id,{...r,...i,status:this.normalizePermitStatus(i.status),isFromRegistry:!0,isManualEntry:i.isManualEntry??r.isManualEntry,skipApprovalFlow:i.skipApprovalFlow??r.skipApprovalFlow,approvalCircuitOwnerId:i.approvalCircuitOwnerId||r.approvalCircuitOwnerId,approvalCircuitName:i.approvalCircuitName||r.approvalCircuitName,sequentialNumber:i.sequentialNumber??r.sequentialNumber,paperPermitNumber:i.paperPermitNumber||r.paperPermitNumber})}}),this.sortPermitRecordsNewestFirst(Array.from(a.values()))},getPermitRecordSortKey(e={}){const t=s=>{const o=parseInt(String(s??"").replace(/^0+(?=\d)/,""),10);return Number.isFinite(o)&&o>0?o:0},a=s=>{const o=String(s||"").match(/(?:PTW|REG)_(\d+)/i);return o&&parseInt(o[1],10)||0},i=t(e.sequentialNumber)||a(e.permitId)||a(e.id),r=s=>{const o=this.parseDateTimeValue(s);return o&&!isNaN(o.getTime())?o.getTime():0};return{seq:i,createdAt:r(e.createdAt),startAt:r(e.openDate||e.timeFrom||e.startDate),updatedAt:r(e.updatedAt||e.endDate||e.timeTo)}},sortPermitRecordsNewestFirst(e){if(!Array.isArray(e))return[];const t=e.map(a=>({record:a,key:this.getPermitRecordSortKey(a)}));return t.sort((a,i)=>{const r=a.key,s=i.key;return s.seq!==r.seq?s.seq-r.seq:s.createdAt!==r.createdAt?s.createdAt-r.createdAt:s.startAt!==r.startAt?s.startAt-r.startAt:s.updatedAt!==r.updatedAt?s.updatedAt-r.updatedAt:String(i.record.id||i.record.permitId||"").localeCompare(String(a.record.id||a.record.permitId||""),"en",{numeric:!0})}),t.map(a=>a.record)},getRegistrySanitizedDataset(){if(Array.isArray(this._registrySanitizedCache))return this._registrySanitizedCache;const e=Array.isArray(this.registryData)?this.registryData:[],t=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry:[],a=t.length>e.length,i=a?t:e.length>0?e:t;a&&i.length!==e.length?this.registryData=i:!a&&e.length>t.length&&(AppState.appData||(AppState.appData={}),AppState.appData.ptwRegistry=[...i]);const r=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[];if(r.length===0)return this._registrySanitizedCache=i,i;const s=new Set(r.filter(n=>n&&typeof n=="object").map(n=>String(n.id||"").trim()).filter(Boolean)),o=i.filter(n=>{if(!n)return!1;const l=String(n.permitId||"").trim(),p=String(n.id||"").trim();return n.isManualEntry===!0||n.isManualEntry==="true"?!0:s.has(l)||s.has(p)});return this._registrySanitizedCache=o,o},_getRegistryRowsCached(e=!1){return!e&&Array.isArray(this._registrySanitizedCache)?this._registrySanitizedCache:this.getRegistrySanitizedDataset()},_computeRegistryKpis(e){const t=Array.isArray(e)?e:[],a=t.length,i=t.filter(n=>this.isPermitOpenStatus(n?.status)).length,r=t.filter(n=>this.isPermitClosedStatus(n?.status)).length,s=t.filter(n=>this.isPermitClosedStatus(n?.status)&&(n.closureDate||n.timeTo));let o=this._t("module.ptw.registry.avgNotAvailable","\u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(s.length>0){let n=0;if(s.forEach(l=>{const p=this.parseDateTimeValue(l.timeFrom),d=this.parseDateTimeValue(l.closureDate||l.timeTo);p&&d&&p<d&&(n+=d-p)}),n>0){const l=Math.round(n/s.length/36e5);o=this._t("module.ptw.registry.avgHours","{n} \u0633\u0627\u0639\u0629").replace(/\{n\}/g,String(l))}}return{registryRowCount:a,openCount:i,closedCount:r,avgTime:o}},_updateRegistryKpiCards(e){const{registryRowCount:t,openCount:a,closedCount:i,avgTime:r}=this._computeRegistryKpis(e),s=(n,l)=>{const p=document.getElementById(n);p&&(p.textContent=String(l))};s("ptw-registry-kpi-total",t),s("ptw-registry-kpi-open",a),s("ptw-registry-kpi-closed",i),s("ptw-registry-kpi-avg",r);const o=document.getElementById("ptw-registry-table-title");if(o){const n=this._t("module.ptw.registry.recordWord","\u0633\u062C\u0644");o.textContent=`${this._t("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${t} ${n})`}},renderRegistryTableShell(){const e=(t,a)=>this._t(t,a);return`
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
            </div>`},_renderRegistryTableRow(e){const t=(x,A)=>this._t(x,A);let a,i;e.status==="\u0645\u0641\u062A\u0648\u062D"||e.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?(a="bg-blue-100 text-blue-800",i="fa-folder-open"):e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?(a="bg-green-100 text-green-800",i="fa-check-circle"):e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?(a="bg-red-100 text-red-800",i="fa-lock"):e.status==="\u0645\u063A\u0644\u0642"?(a="bg-gray-100 text-gray-800",i="fa-check-circle"):(a="bg-yellow-100 text-yellow-800",i="fa-clock");const r=e.timeFrom||e.openDate,s=r&&Utils.formatDate?Utils.formatDate(r):t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),o=!r||s==="-"?t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):s,n=x=>{if(!x||x===t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))return t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");try{const A=this.parseDateTimeValue(x);return!A||isNaN(A.getTime())?t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):A.toLocaleTimeString("en-GB-u-nu-latn",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch{return t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}},l=n(r),p=n(e.timeTo),d=this.getPermitTypeDisplay(e),c=d.length>50?d.substring(0,50)+"...":d,u=e.timeFrom&&e.timeTo?this.calculateTotalTime(e.timeFrom,e.timeTo):this.isUsableDurationText(e.totalTime)?e.totalTime:t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),m=this.statusLabel(e.status),h=this.getPermitDisplayNumber(e),f=String(e.workDescription||""),w=f.length>30?f.substring(0,30)+"...":f;return`
                <tr data-registry-id="${e.id}">
                    <td class="font-bold text-blue-600">${Utils.escapeHTML(h)}</td>
                    <td>${Utils.escapeHTML(o)}</td>
                    <td title="${Utils.escapeHTML(d)}">${Utils.escapeHTML(c)}</td>
                    <td>${Utils.escapeHTML(e.requestingParty)}</td>
                    <td>${Utils.escapeHTML(e.location)}</td>
                    <td>${Utils.escapeHTML(l)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td class="font-semibold">${Utils.escapeHTML(String(u))}</td>
                    <td>${Utils.escapeHTML(e.authorizedParty)}</td>
                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(f)}">${Utils.escapeHTML(w)}</td>
                    <td>${Utils.escapeHTML(e.supervisor1)}</td>
                    <td>${Utils.escapeHTML(e.supervisor2)}</td>
                    <td>
                        <span class="badge ${a}">
                            <i class="fas ${i} ml-1"></i>
                            ${Utils.escapeHTML(String(m))}
                        </span>
                    </td>
                    <td>
                        <div class="flex items-center gap-1 flex-wrap">
                            ${e.isManualEntry?`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewManualPermitDetails('${e.id}')" title="${t("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${t("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `:`
                                <button class="btn btn-primary btn-sm" onclick="PTW.viewRegistryDetails('${e.permitId}')" title="${t("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}">
                                    <i class="fas fa-eye ml-1"></i> ${t("module.ptw.registry.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}
                                </button>
                            `}
                        </div>
                    </td>
                </tr>`},_mountRegistryTableRows(e=!1){const t=document.getElementById("ptw-registry-table-mount");if(!t)return;const a=this._getRegistryRowsCached(e);if(this._updateRegistryKpiCards(a),!a.length){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${this._t("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                </div>`,t.removeAttribute("data-registry-table-pending");return}t.querySelector("#ptw-registry-data-table")||(t.innerHTML=this.renderRegistryTableShell());const i=document.getElementById("ptw-registry-table-body");if(!i)return;const r=this.sortPermitRecordsNewestFirst(a);this._registryTableMountToken=(this._registryTableMountToken||0)+1;const s=this._registryTableMountToken,o=45;i.innerHTML="";const n=l=>{if(s!==this._registryTableMountToken)return;const p=r.slice(l,l+o);if(!p.length){if(t.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}return}if(i.insertAdjacentHTML("beforeend",p.map(d=>this._renderRegistryTableRow(d)).join("")),l+o<r.length)requestAnimationFrame(()=>n(l+o));else if(t.removeAttribute("data-registry-table-pending"),this.currentTab==="registry")try{this.applyRegistryFilters()}catch{}};n(0)},_warmRegistryView(){const e=document.getElementById("ptw-registry-content");!e||!e.innerHTML.trim()||this._mountRegistryTableRows(!1)},_renderRegistryPlaceholderShell(e){return`
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
            </div>`},_mountRegistryShell(){const e=document.getElementById("ptw-registry-content");if(!(!e||e.getAttribute("data-registry-pending")!=="1"))try{e.innerHTML=this.renderRegistryContent({tableMode:"shell"}),e.removeAttribute("data-registry-pending"),this.setupRegistryEventListeners();const t=()=>this._warmRegistryView();typeof requestIdleCallback=="function"?requestIdleCallback(t,{timeout:900}):setTimeout(t,0)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0633\u062C\u0644:",t)}},_renderMapPlaceholderShell(e){return`
            <div class="content-card" style="height:100%;min-height:600px;">
                <div class="card-body flex items-center justify-center" style="min-height:560px;">
                    <div class="empty-state">
                        <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                        <p class="text-gray-500">${typeof e=="function"?e("module.ptw.map.loadingMap","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."):"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."}</p>
                    </div>
                </div>
            </div>`},_mountMapShell(){const e=document.getElementById("ptw-map-content");if(!(!e||e.getAttribute("data-map-pending")!=="1"))try{e.innerHTML=this.renderMapContent(),e.removeAttribute("data-map-pending"),this.applyModuleI18n(e)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",t)}},_resetMapTabVisibility(e){e&&(e.style.display="flex",e.style.flexDirection="column",e.style.height="calc(100vh - 280px)",e.style.minHeight="600px",e.style.width="100%",e.style.visibility="visible",e.style.opacity="1",e.style.position="relative",e.style.left="auto",e.style.overflow="visible",e.style.pointerEvents="auto",e.style.zIndex="auto")},_ensureMapTabDom(e){if(!e)return!1;e.getAttribute("data-map-pending")==="1"&&this._mountMapShell(),document.getElementById("ptw-map")||(e.innerHTML=this.renderMapContent(),e.removeAttribute("data-map-pending"),this.applyModuleI18n(e)),e.removeAttribute("data-tab-lazy");const t=document.getElementById("ptw-map-container"),a=document.getElementById("ptw-map");t&&(t.style.height="100%",t.style.minHeight="600px",t.style.width="100%",t.style.display="block",t.style.visibility="visible",t.style.position="relative"),a&&(a.style.height="100%",a.style.width="100%",a.style.minHeight="600px",a.style.display="block",a.style.visibility="visible");const i=document.getElementById("ptw-map-loading");return i&&(i.style.display="flex"),!!(t&&a)},formatPtwMetricCount(e){const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.floor(t)).toLocaleString("en-US"):"0"},getRegistryPermitsForMetrics(){return this.getRegistrySanitizedDataset().map(t=>({id:t.permitId||t.id,workType:Array.isArray(t.permitType)?t.permitTypeDisplay||t.permitType.join("\u060C "):t.permitType||t.permitTypeDisplay,status:this.normalizePermitStatus(t.status),isFromRegistry:!0}))},getPermitMetricsDataset(){const e=this.getRegistrySanitizedDataset(),t=AppState.appData.ptw||[],a=this.getRegistryPermitsForMetrics(),i=this.mergePermitsPreferRegistry(t,a);return{source:a.length>0?a:i,merged:i,permitsFromList:t,permitsFromRegistry:a,registryRows:e}},getPermitTypeDisplay(e){return e?e.permitTypeDisplay?e.permitTypeDisplay:Array.isArray(e.permitType)?e.permitType.join("\u060C "):typeof e.permitType=="string"?e.permitType:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},generateRegistrySequentialNumber(){if(!this.registryData.length)return 1;const e=i=>{const r=String(i||"").match(/^REG_(\d+)$/i);return r?parseInt(r[1],10):0},t=i=>{const r=String(i||"").match(/^PTW_(\d+)$/i);return r?parseInt(r[1],10):0};return this.registryData.reduce((i,r)=>{const s=parseInt(r.sequentialNumber)||0,o=e(r.id),n=t(r.permitId),l=Math.max(s,o,n);return l>i?l:i},0)+1},getPermitDisplayNumber(e=null){if(!e||typeof e!="object")return"\u2014";const t=n=>{if(n==null||String(n).trim()==="")return"";const l=parseInt(String(n).replace(/^0+(?=\d)/,""),10);return Number.isNaN(l)||l<=0?"":String(l)},a=(n,l)=>{const p=String(n||"").match(new RegExp(`^${l}_(\\d+)$`,"i"));if(!p)return"";const d=parseInt(p[1],10);return Number.isNaN(d)||d<=0?"":String(d)},i=t(e.sequentialNumber);if(i)return i;const r=a(e.permitId,"PTW");if(r)return r;const s=a(e.id,"PTW");if(s)return s;const o=String(e.paperPermitNumber||"").trim();return o||"\u2014"},createRegistryEntry(e){if(!e||!e.id)return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644: \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",e),null;try{const t=this.generateRegistrySequentialNumber();let a=e.siteName||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",i=e.siteId||e.locationId||null;if(e.siteId&&!e.siteName){const c=this.getSiteOptions().find(u=>u.id===e.siteId||u.name===e.location);c&&(a=c.name,i=c.id||i)}else if(e.location&&!e.siteName){const c=this.getSiteOptions().find(u=>u.id===e.location||u.name===e.location);c?(a=c.name,i=c.id||i):a=e.location}let r=e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s="";Array.isArray(r)?(s=r.join("\u060C "),r=s):typeof r=="string"?s=r:(s="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const o=e.sublocationName||e.sublocation||null,n=e.sublocationId||null;let l="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[0]){const c=e.approvals[0].approver;typeof c=="string"?l=c:typeof c=="object"&&c?l=c.name||c.email||c.id||e.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":l=e.approvals[0].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let p="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[1]){const c=e.approvals[1].approver;typeof c=="string"?p=c:typeof c=="object"&&c?p=c.name||c.email||c.id||e.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":p=e.approvals[1].role||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}const d={id:this.generateTemporaryId("REG"),sequentialNumber:t,permitId:e.id,openDate:e.startDate||e.createdAt||new Date().toISOString(),permitType:r,permitTypeDisplay:s,requestingParty:String(e.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),locationId:i?String(i).trim():null,location:String(a).trim(),sublocationId:n?String(n).trim():null,sublocation:o?String(o).trim():null,timeFrom:e.startDate||e.createdAt||new Date().toISOString(),timeTo:e.endDate||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",totalTime:this.calculateTotalTime(e.startDate,e.endDate)||"",authorizedParty:String(e.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),workDescription:String(e.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),supervisor1:String(l).trim(),supervisor2:String(p).trim(),status:e.status==="\u0645\u063A\u0644\u0642"||e.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?e.status:"\u0645\u0641\u062A\u0648\u062D",closureDate:null,closureReason:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F:",d.id,d.sequentialNumber),d}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",t),null}},async addToRegistry(e,t={}){const{skipSave:a=!1}=t;try{if(!e||!e.id){Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629");return}Array.isArray(this.registryData)||this.initRegistry();const i=e.id||e.permitId;if(this.registryData.find(o=>o.permitId===i||o.permitId===e.id||o.permitId===e.permitId||o.id===e.registryId||e.paperPermitNumber&&o.paperPermitNumber&&String(o.paperPermitNumber).trim()===String(e.paperPermitNumber).trim()))return Utils.safeLog("\u{1F504} \u0627\u0644\u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),await this.updateRegistryEntry(e,t);const s=this.createRegistryEntry(e);s?(this.registryData.push(s),this._registrySanitizedCache=null,a||await this.saveRegistryData(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${s.sequentialNumber} \u0641\u064A \u0627\u0644\u0633\u062C\u0644 (ID: ${s.id})`)):Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0633\u062C\u0644:",i)}},async updateRegistryEntry(e,t={}){const{skipSave:a=!1}=t,i=this.registryData.findIndex(u=>u.permitId===e.id);if(i===-1)return this.addToRegistry(e,t);const r=this.registryData[i];let s=e.siteName||e.location||r.location,o=e.siteId||e.locationId||r.locationId;if(e.siteId||e.locationId){const u=this.getSiteOptions().find(m=>m.id===(e.siteId||e.locationId)||m.name===e.location);u&&(s=u.name,o=u.id||o)}else if(e.location&&!e.siteName){const u=this.getSiteOptions().find(m=>m.id===e.location||m.name===e.location);u&&(s=u.name,o=u.id||o)}let n=e.workType||r.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l="";Array.isArray(n)?(l=n.join("\u060C "),n=l):typeof n=="string"?l=n:(l=r.permitTypeDisplay||n||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=n||r.permitType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");let p=r.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[0]){const u=e.approvals[0].approver;typeof u=="string"?p=u:typeof u=="object"&&u?p=u.name||u.email||u.id||e.approvals[0].role||r.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":p=e.approvals[0].role||r.supervisor1||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let d=r.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e.approvals&&e.approvals[1]){const u=e.approvals[1].approver;typeof u=="string"?d=u:typeof u=="object"&&u?d=u.name||u.email||u.id||e.approvals[1].role||r.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":d=e.approvals[1].role||r.supervisor2||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}r.permitType=String(n).trim(),r.permitTypeDisplay=String(l||r.permitTypeDisplay||n).trim(),r.requestingParty=String(e.requestingParty||r.requestingParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),r.locationId=o?String(o).trim():r.locationId?String(r.locationId).trim():null,r.location=String(s||r.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),r.sublocationId=e.sublocationId?String(e.sublocationId).trim():r.sublocationId?String(r.sublocationId).trim():null,r.sublocation=e.sublocationName||e.sublocation?String(e.sublocationName||e.sublocation).trim():r.sublocation?String(r.sublocation).trim():null,r.timeFrom=e.startDate||r.timeFrom,r.timeTo=e.endDate||r.timeTo,e.startDate&&(r.openDate=e.startDate),r.totalTime=String(this.calculateTotalTime(e.startDate,e.endDate)||r.totalTime||"").trim(),r.authorizedParty=String(e.authorizedParty||r.authorizedParty||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),r.workDescription=String(e.workDescription||r.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim(),r.supervisor1=String(p).trim(),r.supervisor2=String(d).trim();const c=u=>u==="\u0645\u063A\u0644\u0642"||u==="\u0645\u0631\u0641\u0648\u0636"||u==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||u==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A";r.status=e.status==="\u0645\u063A\u0644\u0642"||e.status==="\u0645\u0631\u0641\u0648\u0636"?"\u0645\u063A\u0644\u0642":e.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?e.status:"\u0645\u0641\u062A\u0648\u062D",r.updatedAt=new Date().toISOString(),(c(e.status)||e.closureTime)&&(r.closureDate=e.closureTime||new Date().toISOString(),r.closureReason=e.closureReason||"\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",r.totalTime=this.calculateTotalTime(r.timeFrom,r.closureDate)),this.registryData[i]=r,this._registrySanitizedCache=null,a||await this.saveRegistryData()},async removeFromRegistry(e){const t=this.registryData.findIndex(a=>a.permitId===e);t!==-1&&(this.registryData.splice(t,1),this._registrySanitizedCache=null,await this.saveRegistryData())},async loadPTWFromBackend(){try{const e=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!e){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629");return}AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 Backend...");let t;try{t=await GoogleIntegration.sendRequest({action:"getAllPTWs",data:{}})}catch(a){const i=String(a?.message||a||"");if(!/not implemented|NOT_IMPLEMENTED|غير معتمد|ACTION_NOT_RECOGNIZED|الإجراء غير معروف|Action not recognized/i.test(i))return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0646 Backend:",a),!1;try{t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTW",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}})}catch(s){return AppState.debugMode&&Utils.safeError("\u274C \u0641\u0634\u0644 \u0628\u062F\u064A\u0644 readFromSheet(PTW):",s),!1}}return t&&t.success&&Array.isArray(t.data)?(AppState.appData.ptw=t.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.data.length} \u062A\u0635\u0631\u064A\u062D \u0645\u0646 Backend`),!0):(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",t?.message),!1)}catch(e){return AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e),!1}},async loadRegistryFromBackend(){try{const e=GoogleIntegration&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured();if(!GoogleIntegration||!e)return!1;AppState.appData.ptwRegistry=[];try{localStorage.removeItem("hse_ptw_registry")}catch{}try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"PTWRegistry",spreadsheetId:AppState.googleConfig.sheets.spreadsheetId}});if(t&&t.success&&Array.isArray(t.data))return t.data.length===0?(this.setPtwRegistryState([],"backend.PTWRegistry.empty"),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 - \u0627\u0644\u062C\u062F\u0648\u0644 \u0641\u0627\u0631\u063A \u0641\u064A Backend"),!0):(this.setPtwRegistryState(t.data,"backend.PTWRegistry.readFromSheet"),AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${this.registryData.length} \u0633\u062C\u0644 \u0645\u0646 Backend`),!0)}catch(t){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",t)}return!1}catch(e){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",e),!1}},async syncRegistryWithPermits(){const e=AppState.appData.ptw||[];if(!e.length)return;Array.isArray(this.registryData)||this.initRegistry();let t=!1;for(const a of e){if(!a?.id)continue;this.registryData.find(r=>r.permitId===a.id)||(await this.addToRegistry(a,{skipSave:!0}),t=!0)}t&&await this.saveRegistryData({skipSync:!0})},_hasLocalPtwCache(){const e=Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw.length:0,t=Array.isArray(this.registryData)?this.registryData.length:0,a=Array.isArray(AppState?.appData?.ptwRegistry)?AppState.appData.ptwRegistry.length:0;return e>0||t>0||a>0},_refreshRegistryDomFromCache(){const e=document.getElementById("ptw-registry-content");if(!e)return;if(e.getAttribute("data-registry-pending")==="1"){this._mountRegistryShell();return}const t=document.getElementById("ptw-registry-table-mount");t||(e.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()),this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(!0):t&&t.setAttribute("data-registry-table-pending","1"),e.removeAttribute("data-registry-lazy")},_refreshRegistryViewLight(e=!1,t=!1){const a=document.getElementById("ptw-registry-content");if(!a)return;const i=document.getElementById("ptw-registry-table-mount");!i||t?(a.innerHTML=this.renderRegistryContent({tableMode:"shell"}),this.currentTab==="registry"&&this.setupRegistryEventListeners()):this._registrySanitizedCache=null,this.currentTab==="registry"?this._mountRegistryTableRows(e):i&&i.setAttribute("data-registry-table-pending","1")},_refreshActiveTabAfterBackendSync(){const e=this.currentTab||"permits";try{if(this._refreshRegistryDomFromCache(),e==="permits"){const t=document.getElementById("ptw-permits-content");t&&t.style.display!=="none"&&this.loadPTWList(!0)}else e==="registry"&&this.setupRegistryEventListeners()}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 PTW \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",t)}},_startPtwBackendSync(){if(this._backendSyncStarted||this._ptwBackendLoadPromise)return;this._backendSyncStarted=!0;const e=[this.loadPTWFromBackend().catch(t=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 Backend:",t)}),this.loadRegistryFromBackend().catch(t=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0645\u0646 Backend:",t),!1))];return this._ptwBackendLoadPromise=Promise.all(e).then(()=>this._refreshActiveTabAfterBackendSync()).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0628\u064A\u0627\u0646\u0627\u062A PTW:",t),this._refreshActiveTabAfterBackendSync()}).finally(()=>{this._ptwBackendLoadPromise=null,this._backendSyncStarted=!1}),this._ptwBackendLoadPromise},_renderPermitsLoadingShell(e){return`
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
            </div>`},_mountPermitsListContent(e){const t=document.getElementById("ptw-permits-content");if(t)try{t.innerHTML=this.renderList({includeStats:!1}),this.applyModuleI18n(t),this.setupEventListeners(),this.loadPTWList(!0);const a=()=>{if(!document.getElementById("ptw-permits-content"))return;const i=document.getElementById("ptw-stats-section");if(!(!i||i.getAttribute("data-stats-pending")!=="1"))try{const r=this.renderListStatsSection();r&&(i.outerHTML=r),this.applyModuleI18n(t),this.updateKPIs()}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0637\u0627\u0642\u0627\u062A \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A PTW:",r)}};typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:1200}):requestAnimationFrame(()=>setTimeout(a,0))}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a),t.innerHTML=`
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
                </div>`,this.applyModuleI18n(t)}},renderListStatsSection(){const{source:e,merged:t,permitsFromList:a,permitsFromRegistry:i}=this.getPermitMetricsDataset(),r=e.length,s=e.filter(u=>u&&this.isPermitOpenStatus(u.status)).length,o=e.filter(u=>u&&this.isPermitClosedStatus(u.status)).length,n={};t.forEach(u=>{const m=u.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n[m]||(n[m]={total:0,open:0,closed:0}),n[m].total++;const h=(u.status||"").trim();h==="\u0645\u063A\u0644\u0642"||h==="\u0645\u0631\u0641\u0648\u0636"||h==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||h==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?n[m].closed++:n[m].open++});const l=Object.entries(n).sort((u,m)=>m[1].total-u[1].total),p=l.length>0?l[0]:null,c=`
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
                                <p class="text-xs text-purple-100 font-medium">${Object.keys(n).length} \u0646\u0648\u0639 \u0645\u062E\u062A\u0644\u0641</p>
                            </div>
                        </div>
                    </div>
                    <div class="ptw-card-inner rounded-xl p-4 shadow-lg backdrop-blur-sm">
                        ${p?`
                            <div class="ptw-card-text font-bold text-base mb-4 line-clamp-2" title="${Utils.escapeHTML(p[0])}">
                                ${Utils.escapeHTML(p[0].length>50?p[0].substring(0,50)+"...":p[0])}
                            </div>
                            <div class="flex items-center justify-between gap-2 flex-wrap">
                            <div class="ptw-stat-badge ptw-stat-open flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span class="text-orange-700 font-bold text-sm">\u0645\u0641\u062A\u0648\u062D: ${p[1].open}</span>
                            </div>
                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-700 font-bold text-sm">\u0645\u063A\u0644\u0642: ${p[1].closed}</span>
                                </div>
                                <div class="ptw-stat-badge ptw-stat-total flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm">
                                    <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                                    <span class="text-gray-800 font-bold text-sm">\u0625\u062C\u0645\u0627\u0644\u064A: ${p[1].total}</span>
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
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-open-count">${s}</div>
                                <div class="text-base font-bold text-orange-50">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-closed rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                                    <i class="fas fa-lock text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-closed-count">${o}</div>
                                <div class="text-base font-bold text-green-50">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u063A\u0644\u0642\u0629</div>
                            </div>
                        </div>
                        <div class="relative ptw-stat-card ptw-stat-card-total rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                            <div class="relative z-10">
                                <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/25">
                                    <i class="fas fa-clipboard-list text-white text-2xl"></i>
                                </div>
                                <div class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg" id="ptw-total-count">${r}</div>
                                <div class="text-base font-bold text-gray-100">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</div>
                                <div class="mt-3 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/25">
                                    <div class="text-xs text-gray-100 font-medium">
                                        <i class="fas fa-database text-xs ml-1"></i>
                                        ${a.length} \u0642\u0627\u0626\u0645\u0629 + ${i.length} \u0633\u062C\u0644
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${c}
                    </div>
                    ${l.length>0?`
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
                                    <span class="text-lg font-bold text-white">${Object.keys(n).length}</span>
                                    <span class="text-sm text-purple-100 font-medium mr-1">\u0646\u0648\u0639</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="ptw-work-types-stats">
                                ${l.map(([u,m])=>`
                                    <div class="group relative ptw-work-type-item backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                        <div class="relative z-10">
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex-1 min-w-0">
                                                    <div class="ptw-work-type-name font-bold text-sm mb-2 line-clamp-2 leading-tight" title="${Utils.escapeHTML(u)}">
                                                        ${Utils.escapeHTML(u)}
                                                    </div>
                                                </div>
                                                <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-xl font-extrabold rounded-lg px-3 py-1.5 shadow-md ml-3 min-w-[3rem] text-center">
                                                    ${m.total}
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <div class="ptw-stat-badge ptw-stat-open flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                    <span class="text-orange-700 font-bold text-xs">\u0645\u0641\u062A\u0648\u062D: ${m.open}</span>
                                                </div>
                                                <div class="ptw-stat-badge ptw-stat-closed flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm">
                                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span class="text-green-700 font-bold text-xs">\u0645\u063A\u0644\u0642: ${m.closed}</span>
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
        `},async load(){if(this._isLoading){this._reloadRequested=!0;return}if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{if(this._isLoading){this._reloadRequested=!0;return}this.load()}),this._languageChangeListenerAdded=!0),this._iaCacheListenerAdded||(document.addEventListener("issuingAuthoritiesUpdated",()=>{this._clearIaWorkflowCache()}),this._iaCacheListenerAdded=!0),this._isLoading=!0,typeof Utils>"u"){this._isLoading=!1;return}if(typeof AppState>"u"){Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!"),this._isLoading=!1;return}if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}const e=document.getElementById("ptw-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 ptw-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!"),this._isLoading=!1;return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 PTW \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: ptw-section");const t=(a,i)=>window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(a,i):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(a,i):i;try{e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-file-alt ml-3" aria-hidden="true"></i>
                            ${t("module.ptw.title","\u0625\u062F\u0627\u0631\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")}
                        </h1>
                        <p class="section-subtitle">${t("module.ptw.subtitle","\u0625\u0635\u062F\u0627\u0631 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A")}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button id="add-ptw-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${t("module.ptw.btn.newPermit","\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F")}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0648\u0627\u0644\u0633\u062C\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A -->
            <div class="ptw-tabs mt-4 mb-4 bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto" style="flex-wrap: nowrap; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                <button id="ptw-tab-permits" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-blue-600 bg-blue-50 shadow-sm" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('permits')">
                    <i class="fas fa-list ml-2"></i>
                    ${t("module.ptw.tab.permits","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-registry" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('registry')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    ${t("module.ptw.tab.registry","\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-map" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('map')">
                    <i class="fas fa-map-marked-alt ml-2"></i>
                    ${t("module.ptw.tab.map","\u062E\u0631\u064A\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")}
                </button>
                <button id="ptw-tab-analysis" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('analysis')">
                    <i class="fas fa-chart-line ml-2"></i>
                    ${t("module.ptw.tab.analysis","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                </button>
                <button id="ptw-tab-approvals" class="ptw-tab-btn px-6 py-3 font-semibold text-sm rounded-md transition-all duration-200 text-gray-600 hover:bg-gray-50" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important; width: auto !important; max-width: none !important;" onclick="PTW.switchTab('approvals')">
                    <i class="fas fa-check-double ml-2"></i>
                    ${t("module.ptw.tab.approvals","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A")}
                </button>
                <button id="ptw-refresh-header-btn" type="button" class="px-4 py-3 font-semibold text-sm rounded-md transition-all duration-200 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 ml-2" style="flex-shrink: 0 !important; min-width: fit-content !important; white-space: nowrap !important;" title="${t("module.ptw.btn.refreshTitle","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A")}">
                    <i class="fas fa-sync-alt ml-2"></i>
                    ${t("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
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
                    ${this._renderPermitsLoadingShell(t)}
                </div>
                <div id="ptw-registry-content" style="display: none;" class="fade-in" data-registry-pending="1">
                    ${this._renderRegistryPlaceholderShell(t)}
                </div>
                <div id="ptw-map-content" style="display: none; flex-direction: column; height: calc(100vh - 280px); min-height: 600px; width: 100%;" class="fade-in" data-map-pending="1">
                    ${this._renderMapPlaceholderShell(t)}
                </div>
                <div id="ptw-analysis-content" style="display: none;" class="fade-in" data-tab-lazy="analysis">
                </div>
                <div id="ptw-approvals-content" style="display: none;" class="fade-in" data-tab-lazy="approvals">
                </div>
            </div>
        `,this.applyModuleI18n(e),this.ensureI18nObservers(e),this.formSettingsState=null,this.formSettingsEventsBound=!1,this.setupEventListeners(),requestAnimationFrame(()=>{try{this.initRegistry(!0)}catch{}this._mountPermitsListContent(t),this._mountRegistryShell();const a=()=>this._mountMapShell();typeof requestIdleCallback=="function"?requestIdleCallback(a,{timeout:1200}):setTimeout(a,50)}),this._deferredSyncTimer=setTimeout(()=>{this._startPtwBackendSync(),this._hydrateMapCoordinatesFromLocal(),this._scheduleMapCoordinatesBackgroundSync()},1500)}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 PTW:",a),e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${t("module.common.loadDataRuntimeError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</p>
                                <button onclick="PTW.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${t("module.common.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(e))}finally{this._isLoading=!1,this._reloadRequested&&(this._reloadRequested=!1,setTimeout(()=>{try{this.load()}catch{}},0))}},switchTab(e){this.currentTab=e,document.querySelectorAll(".ptw-tab-btn").forEach(p=>{p.classList.remove("text-blue-600","bg-blue-50","shadow-sm","active"),p.classList.add("text-gray-600","hover:bg-gray-50"),p.style.setProperty("flex-shrink","0","important"),p.style.setProperty("min-width","fit-content","important"),p.style.setProperty("white-space","nowrap","important"),p.style.setProperty("width","auto","important"),p.style.setProperty("max-width","none","important")});const a=document.querySelector(".ptw-tabs");a&&(a.style.setProperty("flex-wrap","nowrap","important"),a.style.setProperty("overflow-x","auto","important"),a.style.setProperty("overflow-y","visible","important"));const i=document.getElementById(`ptw-tab-${e}`);i&&(i.classList.remove("text-gray-600","hover:bg-gray-50"),i.classList.add("text-blue-600","bg-blue-50","shadow-sm","active"),i.style.setProperty("flex-shrink","0","important"),i.style.setProperty("min-width","fit-content","important"),i.style.setProperty("white-space","nowrap","important"),i.style.setProperty("width","auto","important"),i.style.setProperty("max-width","none","important"));const r=document.getElementById("ptw-permits-content"),s=document.getElementById("ptw-registry-content"),o=document.getElementById("ptw-map-content"),n=document.getElementById("ptw-analysis-content"),l=document.getElementById("ptw-approvals-content");if(r&&(r.style.display="none",r.style.visibility="hidden"),s&&(s.style.display="none",s.style.visibility="hidden"),o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0"),n&&(n.style.display="none",n.style.visibility="hidden"),l&&(l.style.display="none",l.style.visibility="hidden"),e==="permits")o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",o.style.width="0",o.style.height="0",o.style.overflow="hidden",o.style.pointerEvents="none",o.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1)),r&&(r.style.display="block",r.style.visibility="visible",r.style.position="relative",r.style.left="auto",r.style.width="auto",r.style.height="auto",r.style.overflow="visible",r.style.pointerEvents="auto",r.style.zIndex="auto");else if(e==="registry"){if(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),this.initRegistry(),s){if(s.style.display="block",s.style.visibility="visible",s.getAttribute("data-registry-pending")==="1")this._mountRegistryShell();else if(!s.innerHTML.trim())this._refreshRegistryDomFromCache();else{const p=document.getElementById("ptw-registry-table-mount");p&&p.getAttribute("data-registry-table-pending")==="1"&&this._mountRegistryTableRows(!1)}this.setupRegistryEventListeners()}}else if(e==="map"){if(o)try{Utils.safeLog("\u{1F5FA}\uFE0F Switching to Map Tab"),r&&(r.style.display="none",r.style.visibility="hidden"),s&&(s.style.display="none",s.style.visibility="hidden"),n&&(n.style.display="none",n.style.visibility="hidden"),l&&(l.style.display="none",l.style.visibility="hidden"),this._resetMapTabVisibility(o),this._ensureMapTabDom(o),this._prewarmLeafletLibrary(),this.mapInitTimeout&&clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null,requestAnimationFrame(()=>{this.currentTab!=="map"||!o||o.style.display==="none"||(this.isMapInstanceAlive()?this.resumeMap():this.initMap().catch(p=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (\u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u062A\u0628\u0648\u064A\u0628):",p?.message||p)}))})}catch(p){if(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0639\u0646\u062F \u0641\u062A\u062D \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u0627\u0626\u0637:",p?.message||p),o){o.style.display="flex";const d=o.querySelector("#ptw-map-error"),c=o.querySelector("#ptw-map-error-message");d&&c?(d.classList.remove("hidden"),c.innerHTML="<p>\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u062F\u0646\u0627\u0647.</p>",o.querySelector("#ptw-map-loading")&&(o.querySelector("#ptw-map-loading").style.display="none")):o.innerHTML=`<div class="p-6 text-center"><p class="text-red-600 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629.</p><button type="button" class="btn-primary" onclick="PTW.switchTab('map')"><i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button></div>`}}}else e==="analysis"?(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),n&&(n.style.display="block",n.style.visibility="visible",(n.getAttribute("data-tab-lazy")==="analysis"||!n.innerHTML.trim())&&(n.innerHTML=this.renderAnalysisContent(),n.removeAttribute("data-tab-lazy")),this.setupAnalysisEventListeners())):e==="approvals"&&(o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null)),l&&(l.style.display="block",l.style.visibility="visible",(l.getAttribute("data-tab-lazy")==="approvals"||!l.innerHTML.trim())&&(l.innerHTML=this.renderApprovalsContent(),l.removeAttribute("data-tab-lazy")),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 Approvals Tab Displayed")));e!=="map"&&o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.position="absolute",o.style.left="-9999px",o.style.width="0",o.style.height="0",o.style.overflow="hidden",o.style.pointerEvents="none",o.style.zIndex="-1",this.mapInitTimeout&&(clearTimeout(this.mapInitTimeout),this.mapInitTimeout=null),this._clearMapPendingTimeouts(),this.isMapInitializing&&(this.isMapInitializing=!1))},refreshCurrentTab(){const e=this.currentTab||"permits",t=document.getElementById("ptw-registry-content"),a=document.getElementById("ptw-permits-content"),i=document.getElementById("ptw-map-content"),r=document.getElementById("ptw-analysis-content"),s=document.getElementById("ptw-approvals-content"),o=document.getElementById("ptw-refresh-header-btn");if(o){o.disabled=!0;const l=o.querySelector("i.fa-sync-alt");l&&l.classList.add("fa-spin")}const n=()=>{if(o){o.disabled=!1;const l=o.querySelector("i.fa-sync-alt");l&&l.classList.remove("fa-spin")}this.updateKPIs(),typeof Notification<"u"&&Notification.success&&Notification.success(PTW._t("module.ptw.refresh.success","\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))};try{e==="permits"?(this.loadPTWList(!0),this._startPtwBackendSync(),n()):e==="registry"&&t?(this._refreshRegistryViewLight(!0),this._startPtwBackendSync(),n()):e==="map"&&i?(this.isMapInstanceAlive()?this.resumeMap():typeof this.initMap=="function"&&this.initMap().catch(l=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",l?.message||l)),n()):e==="analysis"&&r?(r.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners(),n()):(e==="approvals"&&s&&(s.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners()),n())}catch(l){if(Utils.safeError("\u062E\u0637\u0623 \u0639\u0646\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B:",l),o){o.disabled=!1;const p=o.querySelector("i.fa-sync-alt");p&&p.classList.remove("fa-spin")}typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.refresh.error","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"))}},renderRegistryContent(e={}){const t=e.tableMode==="full"?"full":"shell",a=(d,c)=>this._t(d,c),i=document.getElementById("ptw-map-content");i&&(i.style.display="none",i.style.visibility="hidden",i.style.opacity="0",i.style.position="absolute",i.style.left="-9999px",i.style.width="0",i.style.height="0",i.style.overflow="hidden",i.style.pointerEvents="none",i.style.zIndex="-1");const r=this._getRegistryRowsCached(),{registryRowCount:s,openCount:o,closedCount:n,avgTime:l}=this._computeRegistryKpis(r),p=t==="full"?`<div class="table-responsive">${this.renderRegistryTable()}</div>`:`<div class="table-responsive" id="ptw-registry-table-mount" data-registry-table-pending="1">${this.renderRegistryTableShell()}</div>`;return`
            <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
            <div class="flex justify-between items-center gap-2 mb-4">
                <button id="ptw-registry-add-manual" class="btn-success">
                    <i class="fas fa-plus-circle ml-2"></i>
                    ${a("module.ptw.registry.addManual","\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A / Manual Permit Entry")}
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
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                        <p class="kpi-value" id="ptw-registry-kpi-closed">${n}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-clock"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">${a("module.ptw.registry.avgTime","\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0648\u0642\u062A")}</h3>
                        <p class="kpi-value" id="ptw-registry-kpi-avg" style="font-size: 1.2rem;">${l}</p>
                    </div>
                </div>
            </div>
            
            <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-search ml-2"></i>${a("module.ptw.registry.search","\u0628\u062D\u062B")}
                            </label>
                            <input type="text" id="registry-search" class="form-input" placeholder="${a("module.ptw.registry.searchPlaceholder","\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0623\u0648 \u0627\u0644\u0645\u0633\u0644\u0633\u0644 \u0623\u0648 \u0627\u0644\u0648\u0635\u0641...")}">
                        </div>
                        <div>
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
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>${a("module.ptw.registry.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")}
                            </label>
                            <input type="date" id="registry-filter-date-from" class="form-input">
                        </div>
                        <div>
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
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title" id="ptw-registry-table-title">
                        <i class="fas fa-table ml-2"></i>
                        ${a("module.ptw.registry.tableTitle","\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D")} (${s} ${a("module.ptw.registry.recordWord","\u0633\u062C\u0644")})
                    </h2>
                </div>
                <div class="card-body">
                    ${p}
                </div>
            </div>
        `},renderRegistryTable(){const e=(r,s)=>this._t(r,s),t=this.getRegistrySanitizedDataset();if(t.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${e("module.ptw.registry.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646")}</p>
                    <p class="text-sm text-gray-400 mt-2">${e("module.ptw.registry.emptyHint","\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u062A\u0635\u0627\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F\u0629")}</p>
                </div>
            `;const a=this.sortPermitRecordsNewestFirst(t);let i=`
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
        `;return i+=a.map(r=>this._renderRegistryTableRow(r)).join(""),i+="</tbody></table>",`<div class="ptw-table-wrapper">${i}</div>`},renderMapContent(){const e=(t,a)=>this._t(t,a);return`
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
        `},mapInstance:null,mapMarkers:[],mapType:null,currentMapType:"normal",leafletLayers:{normal:null,satellite:null,terrain:null},isMapInitializing:!1,mapInitTimeout:null,mapFiltersInitialized:!1,mapFullscreenHandler:null,mapPendingTimeouts:[],isFullscreen:!1,googleMapsApiKeyChecked:!1,hasGoogleMapsApiKey:!1,EGYPT_MAP_DEFAULT:{lat:30.0444,lng:31.2357,zoom:6},LEGACY_SAUDI_MAP_DEFAULT:{lat:24.7136,lng:46.6753},getEgyptMapDefault(){return{lat:this.EGYPT_MAP_DEFAULT.lat,lng:this.EGYPT_MAP_DEFAULT.lng,zoom:this.EGYPT_MAP_DEFAULT.zoom}},_isLegacySaudiMapDefault_(e,t){const a=this.LEGACY_SAUDI_MAP_DEFAULT;return Math.abs(e-a.lat)<.001&&Math.abs(t-a.lng)<.001},_normalizeMapCoordinates_(e){return!e||typeof e.lat!="number"||typeof e.lng!="number"||isNaN(e.lat)||isNaN(e.lng)?this.getEgyptMapDefault():this._isLegacySaudiMapDefault_(e.lat,e.lng)?this.getEgyptMapDefault():e},applyEgyptDefaultView(){if(!this.mapInstance||this.currentTab!=="map")return;const e=this.getCurrentSiteCoordinates()||this.getDefaultFactoryCoordinates();this._applyCoordsToMapView(this._normalizeMapCoordinates_(e))},_scheduleMapTimeout(e,t){const a=setTimeout(()=>{const i=this.mapPendingTimeouts.indexOf(a);i>-1&&this.mapPendingTimeouts.splice(i,1),e()},t);return this.mapPendingTimeouts.push(a),a},_clearMapPendingTimeouts(){!this.mapPendingTimeouts||!this.mapPendingTimeouts.length||(this.mapPendingTimeouts.forEach(e=>clearTimeout(e)),this.mapPendingTimeouts=[])},_notifyMapCoordinatesUpdated(){this.currentTab!=="map"||!this.mapInstance||this._scheduleMapTimeout(()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},50)},_hydrateMapCoordinatesFromLocal(){typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.hydrateLocalToAppState&&MapCoordinatesManager.hydrateLocalToAppState()},_scheduleMapCoordinatesBackgroundSync(){typeof MapCoordinatesManager>"u"||!MapCoordinatesManager.scheduleBackgroundSync||MapCoordinatesManager.scheduleBackgroundSync().then(e=>{e&&(Utils.safeLog("\u2705 \u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0646 Google Sheets"),this._notifyMapCoordinatesUpdated())}).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e)})},shouldUseGoogleMapsForPtw(){if(!this.googleMapsApiKeyChecked){const e=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(e&&e.trim()!==""),this.googleMapsApiKeyChecked=!0}return AppState.googleConfig?.maps?.ptwEngine==="google"&&this.hasGoogleMapsApiKey},_prewarmLeafletLibrary(){return typeof L<"u"&&typeof L.map=="function"?Promise.resolve():this.ensureLeafletReady().catch(()=>{})},_prewarmMapTab(){this._mountMapShell()},_ensureLeafletSatelliteLayer(){return this.leafletLayers.satellite?this.leafletLayers.satellite:typeof L>"u"?null:(this.leafletLayers.satellite=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.satellite)},_ensureLeafletTerrainLayer(){return this.leafletLayers.terrain?this.leafletLayers.terrain:typeof L>"u"?null:(this.leafletLayers.terrain=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",{attribution:"\xA9 OpenStreetMap | \xA9 CARTO",maxZoom:19,subdomains:["a","b","c","d"],updateWhenIdle:!0,updateWhenZooming:!1,keepBuffer:2}),this.leafletLayers.terrain)},async ensureLeafletReady(){if(typeof L<"u"&&typeof L.map=="function")return;if(!document.querySelector('script[src*="leaflet"]'))throw new Error("\u0645\u0643\u062A\u0628\u0629 Leaflet \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");await new Promise((t,a)=>{let i=0;const r=40,s=setInterval(()=>{i++,typeof L<"u"&&typeof L.map=="function"?(clearInterval(s),t()):i>=r&&(clearInterval(s),a(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Leaflet")))},50)})},getCurrentSiteCoordinates(){try{const e=AppState.currentUser||{},t=[e.factoryId,e.factory,e.siteId,e.site,e.plant,e.location].filter(i=>i!=null&&String(i).trim()!==""),a=AppState.appData?.ptwMapSites||[];for(const i of t){const r=String(i).trim(),s=a.find(o=>String(o.id||"").trim()===r||String(o.name||"").trim()===r);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude),zoom:parseInt(s.zoom,10)||15}}if(typeof Permissions<"u"&&Permissions.formSettingsState?.sites)for(const i of t){const r=String(i).trim(),s=Permissions.formSettingsState.sites.find(o=>String(o.id||"").trim()===r||String(o.name||"").trim()===r);if(s&&s.latitude&&s.longitude)return{lat:parseFloat(s.latitude),lng:parseFloat(s.longitude),zoom:parseInt(s.zoom,10)||15}}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A:",e)}return null},_applyCoordsToMapView(e){if(!(!this.mapInstance||!e))try{this.mapType==="google"&&typeof google<"u"&&google.maps?(this.mapInstance.setCenter({lat:e.lat,lng:e.lng}),this.mapInstance.setZoom&&this.mapInstance.setZoom(e.zoom||15)):this.mapType==="leaflet"&&this.mapInstance.setView([e.lat,e.lng],e.zoom||15)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0636\u0628\u0637 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",t)}},isMapInstanceAlive(){if(!this.mapInstance||!this.mapType)return!1;const e=document.getElementById("ptw-map");if(!e||!document.body.contains(e))return!1;try{if(this.mapType==="leaflet"&&this.mapInstance.getContainer){const t=this.mapInstance.getContainer();return!!(t&&t.parentNode&&document.body.contains(t))}if(this.mapType==="google"&&this.mapInstance.getDiv){const t=this.mapInstance.getDiv();return!!(t&&document.body.contains(t))}}catch{return!1}return!1},refreshMapLayout(){if(this.mapInstance)try{this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps?.event&&google.maps.event.trigger(this.mapInstance,"resize")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},resumeMap(){if(this.currentTab!=="map")return;if(!this.isMapInstanceAlive()){this.initMap().catch(a=>Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a?.message||a));return}const e=document.getElementById("ptw-map-loading"),t=document.getElementById("ptw-map-error");e&&(e.style.display="none"),t&&t.classList.add("hidden"),requestAnimationFrame(()=>{this.refreshMapLayout(),requestAnimationFrame(()=>{this.refreshMapLayout();try{this.updateMapMarkers()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0646\u062F \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)}})})},async initMap(){if(this.currentTab!=="map"){Utils.safeLog("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062E\u0627\u0631\u062C \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}const e=document.getElementById("ptw-map-content");if(!e||e.style.display==="none"||e.style.visibility==="hidden"){Utils.safeLog("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628");return}if(this.isMapInitializing){Utils.safeLog("\u26A0\uFE0F \u062C\u0627\u0631\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062D\u0627\u0644\u064A\u0627\u064B - \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0643\u0631\u0631");return}if(this.isMapInstanceAlive()){this.resumeMap();return}this.isMapInitializing=!0;const t=document.getElementById("ptw-map-container"),a=document.getElementById("ptw-map-loading"),i=document.getElementById("ptw-map-error");let r=document.getElementById("ptw-map");if(!r)if(t)if(t.parentNode&&document.body.contains(t))try{r=document.createElement("div"),r.id="ptw-map",r.style.cssText="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;",t.appendChild(r),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629")}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",s),t&&(t.innerHTML='<div id="ptw-map" style="width: 100%; height: 100%; z-index: 1; position: relative; display: block; visibility: visible;"></div>',r=document.getElementById("ptw-map"),r&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 innerHTML"))}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A DOM - ptw-map-container \u063A\u064A\u0631 \u0645\u062A\u0635\u0644"),i){i.classList.remove("hidden");const s=i.querySelector("#ptw-map-error-message");s&&(s.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}else{if(Utils.safeError("\u274C \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 - ptw-map-container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),i){i.classList.remove("hidden");const s=i.querySelector("#ptw-map-error-message");s&&(s.innerHTML="<p>"+this._t("module.ptw.mapError.containerMissing","\u062E\u0637\u0623: \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")+"</p>")}this.isMapInitializing=!1;return}if(!r){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 div \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.isMapInitializing=!1;return}Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",r.id),this.destroyMap(),i&&i.classList.add("hidden"),a&&(a.style.display="flex"),r.innerHTML="",document.readyState==="complete"?requestAnimationFrame(()=>{const s=window.getComputedStyle(r);(s.width==="0px"||s.height==="0px"||s.width==="auto"||s.height==="auto")&&(r.style.width="100%",r.style.height="100%",r.style.minHeight="400px")}):(r.style.width="100%",r.style.height="100%",r.style.minHeight="400px"),r.style.display="block",r.style.visibility="visible",r.style.opacity="1",Utils.safeLog("\u2705 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629:",r.id);try{const s=this.getCurrentSiteCoordinates(),o=this._normalizeMapCoordinates_(s||this.getDefaultFactoryCoordinates());let n=!1;if(this.shouldUseGoogleMapsForPtw())try{(typeof google>"u"||!google.maps)&&await Promise.race([this.loadGoogleMapsAPI(),new Promise((p,d)=>setTimeout(()=>d(new Error("Google Maps timeout")),4e3))]),typeof google<"u"&&google.maps&&(n=!0)}catch(p){Utils.safeLog("\u2139\uFE0F \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0625\u0644\u0649 Leaflet/OSM (\u0645\u0635\u0631):",p?.message||p),n=!1}else Utils.safeLog("\u2139\uFE0F \u062E\u0631\u064A\u0637\u0629 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644: Leaflet/OSM \u2014 \u0645\u0631\u0643\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0635\u0631");if(n)this.mapInstance=new google.maps.Map(r,{center:{lat:o.lat,lng:o.lng},zoom:o.zoom||15,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN]},streetViewControl:!0,fullscreenControl:!0,zoomControl:!0,scaleControl:!0,rotateControl:!0}),this.mapType="google",this.currentMapType="normal";else try{await this.initLeafletMap(r,o),this.mapType="leaflet",Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 Leaflet \u0628\u0646\u062C\u0627\u062D")}catch(p){throw Utils.safeError("\u274C \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Leaflet:",p),new Error(`\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${p.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"}`)}if(!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 - mapInstance \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062A\u0645 \u062A\u0647\u064A\u0626\u062A\u0647\u0627 \u0628\u0646\u062C\u0627\u062D\u060C \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",this.mapType),Utils.safeLog("\u2705 mapInstance:",this.mapInstance),Utils.safeLog("\u2705 mapContainer:",r),Utils.safeLog("\u2705 mapContainer parent:",r?r.parentElement:"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),r&&(document.readyState==="complete"?requestAnimationFrame(()=>{const p=r.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 (getBoundingClientRect):",p.width,"x",p.height),Utils.safeLog("\u{1F4D0} \u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",p.left,p.top),Utils.safeLog("\u{1F4D0} \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0645\u0631\u0626\u064A\u0629:",p.width>0&&p.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(p.width===0||p.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0635\u0631\u064A\u062D\u0629"),r.style.width="100%",r.style.height="600px",r.style.minHeight="400px")}):(r.style.width="100%",r.style.height="600px",r.style.minHeight="400px")),a&&(a.style.display="none"),this.refreshMapLayout();try{this.setupMapEventListeners(),this.mapFiltersInitialized||(this.initMapFilters(),this.mapFiltersInitialized=!0),this.mapFullscreenHandler||(this.mapFullscreenHandler=()=>{this.isFullscreen=!!document.fullscreenElement;const p=document.getElementById("ptw-map-fullscreen-btn");p&&(this.isFullscreen?(p.innerHTML='<i class="fas fa-compress ml-2"></i>',p.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"):(p.innerHTML='<i class="fas fa-expand ml-2"></i>',p.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),this._scheduleMapTimeout(()=>this.refreshMapLayout(),150)},document.addEventListener("fullscreenchange",this.mapFullscreenHandler))}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0645\u0633\u062A\u0645\u0639\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",p)}const l=()=>{try{this.updateMapMarkers()}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A (\u0633\u064A\u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647):",p)}};typeof requestIdleCallback=="function"?requestIdleCallback(l,{timeout:600}):requestAnimationFrame(l),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D - \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645")}catch(s){if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u0634\u0644\u062A (\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645):",s?.message||s),a&&(a.style.display="none"),i){i.classList.remove("hidden");const o=i.querySelector("#ptw-map-error-message");if(o){let n=s.message||"\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A.";n.includes("Leaflet")||n.includes("leaflet")?n="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646: 1) \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A 2) \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP 3) \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629":n.includes("Google Maps")?n="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 Google Maps. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629.":(n.includes("CSP")||n.includes("Content-Security-Policy"))&&(n="\u062A\u0645 \u062D\u0638\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0645\u0627\u0646. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A CSP."),o.innerHTML=`
                        <p class="mb-2"><strong>\u062E\u0637\u0623:</strong> ${n}</p>
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
                    `}}try{const o=this.getDefaultFactoryCoordinates(),n=r||document.getElementById("ptw-map-container");n&&this.showFallbackMap(n,o)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",o)}}finally{this.isMapInitializing=!1}},showFallbackMap(e,t){try{Utils.safeLog("\u{1F504} \u0645\u062D\u0627\u0648\u0644\u0629 \u0639\u0631\u0636 \u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u064A\u0644\u0629...");const a=t.lat,i=t.lng,r=t.zoom||15;e&&(e.innerHTML=`
                    <div style="width: 100%; height: 100%; position: relative; background: #f3f4f6; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-map-marked-alt text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</p>
                            <p class="text-sm text-gray-500 mb-4">\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A: ${a.toFixed(6)}, ${i.toFixed(6)}</p>
                            <a href="https://www.openstreetmap.org/?mlat=${a}&mlon=${i}&zoom=${r}" 
                               target="_blank" 
                               class="btn-primary inline-block"
                               style="text-decoration: none;">
                                <i class="fas fa-external-link-alt ml-2"></i>
                                \u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u062C\u062F\u064A\u062F\u0629
                            </a>
                        </div>
                    </div>
                `)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0639\u0631\u0636 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629:",a)}},destroyMap(){try{this._clearMapPendingTimeouts(),this.mapFullscreenHandler&&(document.removeEventListener("fullscreenchange",this.mapFullscreenHandler),this.mapFullscreenHandler=null),this.mapFiltersInitialized=!1,this.mapUpdateHandler&&(document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=null),this.mapStateUpdateHandler&&(window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=null),this.mapMarkers&&this.mapMarkers.length>0&&(this.mapMarkers.forEach(e=>{try{this.mapType==="google"&&e.setMap?(e.setMap(null),e.infoWindow&&e.infoWindow.close()):this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.removeLayer(e)}catch{}}),this.mapMarkers=[]),this.mapInstance&&(this.mapType==="leaflet"&&typeof L<"u"&&this.mapInstance.remove(),this.mapInstance=null),this.mapType=null,this.currentMapType="normal",this.leafletLayers&&(this.leafletLayers.normal=null,this.leafletLayers.satellite=null,this.leafletLayers.terrain=null)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062F\u0645\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},loadGoogleMapsAPI(){return new Promise((e,t)=>{if(typeof google<"u"&&google.maps){e();return}if(!this.googleMapsApiKeyChecked){const l=AppState.googleConfig?.maps?.apiKey;this.hasGoogleMapsApiKey=!!(l&&l.trim()!==""),this.googleMapsApiKeyChecked=!0}if(!this.hasGoogleMapsApiKey){t(new Error("\u0645\u0641\u062A\u0627\u062D Google Maps API \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"));return}if(document.querySelector('script[src*="maps.googleapis.com"]')){let l=0;const p=100,d=setInterval(()=>{l++,typeof google<"u"&&google.maps?(clearInterval(d),e()):l>=p&&(clearInterval(d),t(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API")))},100);return}const i=AppState.googleConfig?.maps?.apiKey,r="PTW_GoogleMapsCallback_"+Date.now();let s=null,o=!1;window[r]=()=>{o||(o=!0,s&&clearTimeout(s),delete window[r],setTimeout(()=>{typeof google<"u"&&google.maps?e():t(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))},500))};const n=document.createElement("script");n.src=`https://maps.googleapis.com/maps/api/js?key=${i}&language=ar&region=EG&callback=${r}`,n.async=!0,n.defer=!0,n.onerror=()=>{o||(o=!0,s&&clearTimeout(s),delete window[r],t(new Error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Google Maps API - \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0623\u0648 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644")))},s=setTimeout(()=>{o||(o=!0,(typeof google>"u"||!google.maps)&&(delete window[r],t(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 Google Maps API"))))},4e3),document.head.appendChild(n)})},async initLeafletMap(e,t){if(e.hasChildNodes()&&(e.innerHTML=""),!document.querySelector('link[href*="leaflet"]')){const a=document.createElement("link");if(a.rel="stylesheet",a.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",a.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",a.crossOrigin="anonymous",document.head.appendChild(a),!document.querySelector('link[href*="leaflet-overrides"]')){const i=document.createElement("link");i.rel="stylesheet",i.href="css/leaflet-overrides.css",document.head.appendChild(i)}}if(typeof L>"u"&&await this.ensureLeafletReady(),typeof L>"u")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644 - \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");if(this.mapInstance&&this.mapType==="leaflet")try{this.mapInstance.remove(),this.mapInstance=null}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0633\u0627\u0628\u0642:",a)}e._leaflet_id&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0639\u0631\u0641 Leaflet \u0633\u0627\u0628\u0642 - \u0633\u064A\u062A\u0645 \u062A\u0646\u0638\u064A\u0641\u0647"),e._leaflet_id=null,e.innerHTML="");try{if(!e||!e.parentElement)throw new Error("\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const a=document.getElementById("ptw-map-content"),i=document.getElementById("ptw-map-container");if(a){const u=window.getComputedStyle(a);(u.display==="none"||u.visibility==="hidden")&&(a.style.display="flex",a.style.visibility="visible"),(!a.style.height||a.style.height==="0px")&&(a.style.height="calc(100vh - 280px)",a.style.minHeight="600px")}if(i){const u=window.getComputedStyle(i);u.display==="none"&&(i.style.display="block"),(!i.style.height||u.height==="0px")&&(i.style.height="100%",i.style.minHeight="600px")}const r=e.parentElement;if(document.readyState==="complete"?requestAnimationFrame(()=>{r&&window.getComputedStyle(r).display==="none"&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629\u060C \u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631\u0647\u0627"),r.style.display="block");const u=window.getComputedStyle(e),m=u.width,h=u.height;Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062D\u0627\u0648\u064A\u0629:",m,"x",h),(m==="0px"||h==="0px"||m==="auto"||h==="auto")&&(Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0648\u0627\u0636\u062D\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),e.style.width="100%")}):(r&&(r.style.display="block"),e.style.width="100%",e.style.height="600px",e.style.minHeight="400px",e.style.display="block"),e.style.visibility="visible",e.style.opacity="1",Utils.safeLog("\u{1F5FA}\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet..."),Utils.safeLog("\u{1F4CD} \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A:",t.lat,t.lng,"\u0627\u0644\u062A\u0643\u0628\u064A\u0631:",t.zoom),Utils.safeLog("\u{1F4E6} \u062D\u0627\u0644\u0629 Leaflet:",typeof L<"u"?"\u0645\u062D\u0645\u0644":"\u063A\u064A\u0631 \u0645\u062D\u0645\u0644"),Utils.safeLog("\u{1F4E6} L.map \u0645\u0648\u062C\u0648\u062F:",typeof L<"u"&&typeof L.map=="function"?"\u0646\u0639\u0645":"\u0644\u0627"),typeof L>"u"||typeof L.map!="function")throw new Error("Leaflet \u063A\u064A\u0631 \u0645\u062D\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D - L.map \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");if(e.innerHTML&&e.innerHTML.trim()!==""&&(Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629"),e.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const u=e.getBoundingClientRect();(u.width===0||u.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),e.style.width="100%",e.style.height="600px",e.style.minHeight="400px")}):(e.style.width="100%",e.style.height="600px",e.style.minHeight="400px"),Utils.safeLog("\u{1F504} \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629..."),e.innerHTML&&e.innerHTML.trim()!==""&&(e.innerHTML=""),document.readyState==="complete"?requestAnimationFrame(()=>{const u=e.getBoundingClientRect();(u.width===0||u.height===0)&&(Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0642\u0628\u0644 \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0633\u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0628\u0639\u0627\u062F"),e.style.width="100%",e.style.height="600px")}):(e.style.width="100%",e.style.height="600px"),this.mapInstance=L.map(e,{preferCanvas:!0,zoomControl:!1}).setView([t.lat,t.lng],t.zoom||this.EGYPT_MAP_DEFAULT.zoom),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),Utils.safeLog("\u2705 mapInstance \u0645\u0648\u062C\u0648\u062F:",this.mapInstance?"\u0646\u0639\u0645":"\u0644\u0627"),Utils.safeLog("\u2705 container._leaflet_id:",e._leaflet_id),!this.mapInstance)throw new Error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 instance \u0627\u0644\u062E\u0631\u064A\u0637\u0629");const s=this.mapInstance.getContainer();Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629\u060C \u062C\u0627\u0631\u064A \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 \u0627\u0644\u062E\u0631\u0627\u0626\u0637..."),this.leafletLayers.normal=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'\xA9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> \u2014 \u0645\u0635\u0631',maxZoom:19,subdomains:["a","b","c"],errorTileUrl:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",tileSize:256,crossOrigin:!0,keepBuffer:2,updateWhenIdle:!0,updateWhenZooming:!1}),this.leafletLayers.normal.on("tileerror",(u,m)=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 tile \u0644\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629:",u)}),this.leafletLayers.normal.addTo(this.mapInstance),this.currentMapType="normal",Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u0642\u0629 OpenStreetMap");const o=document.getElementById("ptw-map-loading");o&&(o.style.display="none");const n=this.mapInstance._layers||{};Utils.safeLog("\u2705 \u0639\u062F\u062F \u0627\u0644\u0637\u0628\u0642\u0627\u062A:",Object.keys(n).length),L.control.zoom({position:"topright"}).addTo(this.mapInstance),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0643\u0645");const l=()=>{try{if(!this.mapInstance||!this.mapInstance.getContainer){setTimeout(()=>{this.mapInstance&&this.mapInstance.getContainer&&l()},100);return}const u=this.mapInstance.getContainer();if(u){const m=u.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet:",m.width,"x",m.height),Utils.safeLog("\u{1F4D0} \u062D\u0627\u0648\u064A\u0629 Leaflet \u0645\u0631\u0626\u064A\u0629:",m.width>0&&m.height>0?"\u0646\u0639\u0645":"\u0644\u0627"),(m.width===0||m.height===0)&&Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F - \u0642\u062F \u062A\u0643\u0648\u0646 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u062E\u0641\u064A\u0629")}else setTimeout(()=>{if(this.mapInstance&&this.mapInstance.getContainer){const m=this.mapInstance.getContainer();if(m){Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0627\u0648\u064A\u0629 Leaflet \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629");const h=m.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0623\u0628\u0639\u0627\u062F \u062D\u0627\u0648\u064A\u0629 Leaflet (\u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629):",h.width,"x",h.height)}}},200)}catch{}};setTimeout(l,50);let p=null;const c=(()=>{try{if(this.mapInstance&&this.mapInstance.getContainer)return this.mapInstance.getContainer()}catch{}return null})();c&&typeof ResizeObserver<"u"&&(p=new ResizeObserver(u=>{for(const m of u){const{width:h,height:f}=m.contentRect;h>0&&f>0&&this.mapInstance&&this.mapInstance.invalidateSize&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 ResizeObserver:",h,"x",f),p&&(p.disconnect(),p=null))}}),p.observe(c),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 ResizeObserver \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0628\u0639\u0627\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629")),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const u=this.mapInstance.getContainer();if(u&&u.offsetWidth>0&&u.offsetHeight>0)try{this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (500ms)");const m=this.mapInstance.getContainer();if(m){const h=m.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize (500ms):",h.width,"x",h.height),h.width===0||h.height===0?(Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062D\u0627\u0648\u064A\u0629 \u0644\u0627 \u062A\u0632\u0627\u0644 \u0628\u062F\u0648\u0646 \u0623\u0628\u0639\u0627\u062F \u0628\u0639\u062F invalidateSize"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const f=this.mapInstance.getContainer();f&&f.offsetWidth>0&&f.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"))}},1e3)):(Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u0631\u0626\u064A\u0629 \u0627\u0644\u0622\u0646"),p&&(p.disconnect(),p=null))}}catch(m){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",m)}else Utils.safeWarn("\u26A0\uFE0F \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0631\u0626\u064A\u0629 - \u0633\u064A\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){const m=this.mapInstance.getContainer();m&&m.offsetWidth>0&&m.offsetHeight>0&&(this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u062C\u0628\u0627\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0639\u0644\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629)"),p&&(p.disconnect(),p=null))}},1e3)}},500),setTimeout(()=>{if(this.mapInstance)try{const u=document.getElementById("ptw-map-content"),m=document.getElementById("ptw-map-container"),h=document.getElementById("ptw-map");if(u){const w=window.getComputedStyle(u);(w.display==="none"||w.visibility==="hidden")&&(u.style.display="flex",u.style.visibility="visible"),(!u.style.height||u.style.height==="0px"||u.style.height==="auto")&&(u.style.height="calc(100vh - 280px)",u.style.minHeight="600px")}if(m&&(window.getComputedStyle(m).display==="none"&&(m.style.display="block"),(!m.style.height||m.style.height==="0px")&&(m.style.height="100%",m.style.minHeight="600px"),m.getBoundingClientRect().height===0&&(m.style.height="600px")),h&&(window.getComputedStyle(h).display==="none"&&(h.style.display="block"),(!h.style.height||h.style.height==="0px")&&(h.style.height="100%",h.style.width="100%"),h.getBoundingClientRect().height===0&&m)){const A=m.getBoundingClientRect().height;A>0?h.style.height=A+"px":h.style.height="600px"}this.mapInstance.invalidateSize(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0647\u064A\u0626\u0629 (1000ms)");const f=this.mapInstance.getContainer();f&&requestAnimationFrame(()=>{const w=f.getBoundingClientRect();Utils.safeLog("\u{1F4D0} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 (1000ms):",w.width,"x",w.height),w.width>0&&w.height>0?Utils.safeLog("\u2705 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0631\u0626\u064A\u0629 \u0648\u062C\u0627\u0647\u0632\u0629"):(h&&h.getBoundingClientRect().height===0&&(h.style.height="600px",h.style.width="100%"),m&&m.getBoundingClientRect().height===0&&(m.style.height="600px"),setTimeout(()=>{if(this.mapInstance&&this.mapInstance.invalidateSize){this.mapInstance.invalidateSize();const x=this.mapInstance.getContainer();if(x){const A=x.getBoundingClientRect();A.width>0&&A.height>0?Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 - \u062A\u062D\u0642\u0642 \u0645\u0646 CSS \u0644\u0644\u062D\u0627\u0648\u064A\u0627\u062A")}}},500))})}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u062C\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",u)}},1e3)}catch(a){throw Utils.safeWarn("\u26A0\uFE0F \u062A\u0647\u064A\u0626\u0629 \u062E\u0631\u064A\u0637\u0629 Leaflet \u0641\u0634\u0644\u062A:",a?.message||a),new Error(`\u0641\u0634\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}`)}},showMapDebugInfo(){const e=AppState.googleConfig?.maps?.apiKey,t=e&&e.trim()!=="",a={"Leaflet \u0645\u062D\u0645\u0651\u0644":typeof L<"u"?"\u0646\u0639\u0645":"\u0644\u0627","Google Maps \u0645\u062D\u0645\u0651\u0644":typeof google<"u"&&typeof google.maps<"u"?"\u0646\u0639\u0645":"\u0644\u0627","\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Maps":t?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u0645\u0641\u062A\u0627\u062D API \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","CSP script-src":document.querySelector('meta[http-equiv="Content-Security-Policy"]')?"\u0645\u0648\u062C\u0648\u062F":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","\u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062E\u0631\u064A\u0637\u0629":document.getElementById("ptw-map")?"\u0645\u0648\u062C\u0648\u062F\u0629":"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629","\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629":JSON.stringify(this.getDefaultFactoryCoordinates()),"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629":(()=>{const r=this.getPermitMetricsDataset?.();return(Array.isArray(r?.source)?r.source:AppState.appData?.ptw||[]).filter(o=>this.isPermitOpenStatus(o?.status)).length})()},i=Object.entries(a).map(([r,s])=>`${r}: ${s}`).join(`
`);alert(`\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635:

`+i+`

\u0645\u0644\u0627\u062D\u0638\u0629: \u0625\u0630\u0627 \u0643\u0627\u0646 Google Maps "\u0644\u0627" \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u0627\u0644\u0645\u0641\u062A\u0627\u062D\u060C \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0633\u0628\u0628 \u0642\u064A\u0648\u062F \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0646\u0637\u0627\u0642.`),typeof Utils<"u"&&typeof Utils.safeLog=="function"&&Utils.safeLog("\u{1F50D} \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",a)},getDefaultFactoryCoordinates(){let e=null;if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getDefaultCoordinatesSync)e=MapCoordinatesManager.getDefaultCoordinatesSync();else{const t=AppState.companySettings||{};t.latitude&&t.longitude?e={lat:parseFloat(t.latitude),lng:parseFloat(t.longitude),zoom:parseInt(t.mapZoom,10)||this.EGYPT_MAP_DEFAULT.zoom}:e=this.getEgyptMapDefault()}return this._normalizeMapCoordinates_(e)},getSiteCoordinates(e,t){try{const i=this.getMapSites().find(r=>(r.id===e||r.name===t)&&r.latitude&&r.longitude);if(i)return{lat:parseFloat(i.latitude),lng:parseFloat(i.longitude),zoom:i.zoom||15};if(typeof Permissions<"u"&&Permissions.formSettingsState){const r=Permissions.formSettingsState.sites?.find(s=>s.id===e||s.name===t);if(r&&r.latitude&&r.longitude)return{lat:parseFloat(r.latitude),lng:parseFloat(r.longitude)}}if(Array.isArray(AppState.appData?.observationSites)){const r=AppState.appData.observationSites.find(s=>(s.id||s.siteId)===e||s.name===t);if(r&&r.latitude&&r.longitude)return{lat:parseFloat(r.latitude),lng:parseFloat(r.longitude)}}return this.getDefaultFactoryCoordinates()}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639:",a),this.getDefaultFactoryCoordinates()}},isAdmin(){return AppState.currentUser?.role==="admin"||typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()},getMapSites(){if(AppState.appData||(AppState.appData={}),typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.getMapSitesSync){const e=MapCoordinatesManager.getMapSitesSync();return AppState.appData.ptwMapSites=e,this._scheduleMapCoordinatesBackgroundSync(),e}return AppState.appData.ptwMapSites||(AppState.appData.ptwMapSites=[]),AppState.appData.ptwMapSites},async saveMapSites(e){if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveMapSites)try{if(await MapCoordinatesManager.saveMapSites(e)){Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0646\u062C\u0627\u062D \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager");return}}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",t)}AppState.appData||(AppState.appData={}),AppState.appData.ptwMapSites=e,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW_MAP_SITES",e).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0641\u064A Google Sheets:",t)})},setupMapSettingsEventListeners(){if(!this.isAdmin())return;const e=document.getElementById("ptw-map-settings-btn");if(e)if(e.parentNode&&document.body.contains(e))try{e.replaceWith(e.cloneNode(!0));const t=document.getElementById("ptw-map-settings-btn");t&&t.addEventListener("click",()=>{this.showMapSettingsModal()})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0632\u0631 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",t),e.addEventListener("click",()=>{this.showMapSettingsModal()})}else e.addEventListener("click",()=>{this.showMapSettingsModal()})},showMapSettingsModal(){if(!this.isAdmin()){Notification.warning(this._t("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"));return}const e=(r,s)=>this._t(r,s),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t);const a=()=>{t&&t.parentNode&&t.remove()},i=t.querySelector(".modal-close");i&&i.addEventListener("click",a),t.addEventListener("click",r=>{(r.target===t||r.target.classList.contains("modal-overlay"))&&confirm(this._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&a()}),setTimeout(()=>{const r=document.getElementById("ptw-map-settings-add-site");r&&r.addEventListener("click",()=>{this.addNewMapSite(t)}),t.querySelectorAll(".save-site-btn").forEach(l=>{l.addEventListener("click",p=>{const d=l.getAttribute("data-site-id");this.saveMapSite(d,t)})}),t.querySelectorAll(".delete-site-btn").forEach(l=>{l.addEventListener("click",p=>{const d=l.getAttribute("data-site-id");this.deleteMapSite(d,t)})});const n=document.getElementById("ptw-save-default-coords");n&&n.addEventListener("click",()=>{this.saveDefaultCoordinates()})},100)},renderMapSettings(){const e=(r,s)=>this._t(r,s);if(!this.isAdmin())return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${e("module.ptw.mapSettings.nopermission","\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629")}</p>
                        </div>
                    </div>
                </div>
            `;const t=this.getMapSites(),a=this.getDefaultFactoryCoordinates(),i=e("module.ptw.mapSettings.empty",'\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062D\u062F\u062F\u0629. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639 \u062C\u062F\u064A\u062F" \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.');return`
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
                                    ${t.length===0?`
                                        <tr>
                                            <td colspan="5" class="text-center text-gray-500 py-8">
                                                ${i}
                                            </td>
                                        </tr>
                                    `:t.map(r=>`
                                        <tr data-site-id="${Utils.escapeHTML(r.id||"")}">
                                            <td>
                                                <input type="text" class="form-input site-name-input" 
                                                    value="${Utils.escapeHTML(r.name||"")}" 
                                                    data-site-id="${Utils.escapeHTML(r.id||"")}"
                                                    placeholder="${e("module.ptw.mapSettings.placeholderSiteName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639")}">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lat-input" 
                                                    value="${r.latitude||a.lat}" 
                                                    data-site-id="${Utils.escapeHTML(r.id||"")}"
                                                    placeholder="30.0444">
                                            </td>
                                            <td>
                                                <input type="number" step="0.000001" class="form-input site-lng-input" 
                                                    value="${r.longitude||a.lng}" 
                                                    data-site-id="${Utils.escapeHTML(r.id||"")}"
                                                    placeholder="31.2357">
                                            </td>
                                            <td>
                                                <input type="number" min="1" max="20" class="form-input site-zoom-input" 
                                                    value="${r.zoom||a.zoom||15}" 
                                                    data-site-id="${Utils.escapeHTML(r.id||"")}"
                                                    placeholder="15">
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button class="btn-icon btn-icon-success save-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(r.id||"")}" 
                                                        title="${e("module.ptw.mapSettings.btnSave","\u062D\u0641\u0638")}">
                                                        <i class="fas fa-save"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger delete-site-btn" 
                                                        data-site-id="${Utils.escapeHTML(r.id||"")}" 
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
                                    value="${a.lat}" placeholder="30.0444">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.ptw.mapSettings.defaultLng","\u062E\u0637 \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" step="0.000001" id="ptw-default-lng" class="form-input" 
                                    value="${a.lng}" placeholder="31.2357">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${e("module.ptw.mapSettings.defaultZoom","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")}</label>
                                <input type="number" min="1" max="20" id="ptw-default-zoom" class="form-input" 
                                    value="${a.zoom||15}" placeholder="15">
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
        `},async addNewMapSite(e){const t=this.getMapSites(),a=this.getDefaultFactoryCoordinates(),i={id:Utils.generateId("MAP_SITE"),name:"",latitude:a.lat,longitude:a.lng,zoom:a.zoom||15};if(t.push(i),await this.saveMapSites(t),e){const r=e.querySelector(".modal-body");r&&(r.innerHTML=this.renderMapSettings(),setTimeout(()=>{const s=document.getElementById("ptw-map-settings-add-site");s&&s.addEventListener("click",()=>{this.addNewMapSite(e)}),e.querySelectorAll(".save-site-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.getAttribute("data-site-id");this.saveMapSite(p,e)})}),e.querySelectorAll(".delete-site-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.getAttribute("data-site-id");this.deleteMapSite(p,e)})})},100))}},async saveMapSite(e,t){const a=this.getMapSites(),i=a.find(l=>l.id===e);if(!i)return;const r=document.querySelector(`.site-name-input[data-site-id="${e}"]`),s=document.querySelector(`.site-lat-input[data-site-id="${e}"]`),o=document.querySelector(`.site-lng-input[data-site-id="${e}"]`),n=document.querySelector(`.site-zoom-input[data-site-id="${e}"]`);if(r&&s&&o){if(i.name=r.value.trim(),i.latitude=parseFloat(s.value)||0,i.longitude=parseFloat(o.value)||0,i.zoom=n&&parseInt(n.value)||15,!i.name){Notification.warning(this._t("module.ptw.mapSettings.warnings.enterSiteName","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639"));return}await this.saveMapSites(a),Notification.success(this._t("module.ptw.mapSettings.warnings.saveSiteOk","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D"))}},async deleteMapSite(e,t){if(!confirm(this._t("module.ptw.mapSettings.deleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639\u061F")))return;const i=this.getMapSites().filter(r=>r.id!==e);if(await this.saveMapSites(i),Notification.success(this._t("module.ptw.mapSettings.warnings.deleteSiteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0646\u062C\u0627\u062D")),t){const r=t.querySelector(".modal-body");r&&(r.innerHTML=this.renderMapSettings(),setTimeout(()=>{const s=document.getElementById("ptw-map-settings-add-site");s&&s.addEventListener("click",()=>{this.addNewMapSite(t)}),t.querySelectorAll(".save-site-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.getAttribute("data-site-id");this.saveMapSite(p,t)})}),t.querySelectorAll(".delete-site-btn").forEach(l=>{l.addEventListener("click",()=>{const p=l.getAttribute("data-site-id");this.deleteMapSite(p,t)})})},100))}},async saveDefaultCoordinates(){const e=document.getElementById("ptw-default-lat"),t=document.getElementById("ptw-default-lng"),a=document.getElementById("ptw-default-zoom");if(!e||!t){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsGetError","\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A"));return}const i=parseFloat(e.value),r=parseFloat(t.value),s=a&&parseInt(a.value)||15;if(isNaN(i)||isNaN(r)){Notification.error(this._t("module.ptw.mapSettings.warnings.coordsInvalid","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0635\u062D\u064A\u062D\u0629"));return}const o={lat:i,lng:r,zoom:s};if(typeof MapCoordinatesManager<"u"&&MapCoordinatesManager.saveDefaultCoordinates)try{if(await MapCoordinatesManager.saveDefaultCoordinates(o)){Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSavedAll","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u062F\u0631"));return}}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 MapCoordinatesManager:",n)}AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.latitude=i,AppState.companySettings.longitude=r,AppState.companySettings.mapZoom=s,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.mapSettings.warnings.defaultSaved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"))},_fitMapMarkersBounds(){if(this.mapMarkers.length===0){this.applyEgyptDefaultView();return}try{if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const e=new google.maps.LatLngBounds;this.mapMarkers.forEach(t=>{try{t.getPosition&&e.extend(t.getPosition())}catch{}}),this.mapInstance.fitBounds&&this.mapInstance.fitBounds(e),this.mapMarkers.length===1&&this.mapInstance.setZoom&&this.mapInstance.setZoom(16)}else if(this.mapType==="leaflet"&&this.mapInstance){const e=this.mapInstance.getContainer();if(e&&e.offsetWidth>0&&e.offsetHeight>0){const a=new L.featureGroup(this.mapMarkers).getBounds();a&&a.isValid&&a.isValid()&&(this.mapInstance.fitBounds(a.pad(.1),{animate:!1,maxZoom:18}),this.mapMarkers.length===1&&this.mapInstance.setZoom(16))}}Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${this.mapMarkers.length} \u0639\u0644\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629`)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0636\u0628\u0637 \u062D\u062F\u0648\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",e)}},_addSingleMapMarker(e){const t=this.getSiteCoordinates(e.siteId,e.location||e.siteName);if(!(!t||typeof t.lat!="number"||typeof t.lng!="number")){if(this.mapType==="google"&&typeof google<"u"&&google.maps&&this.mapInstance){const a=new google.maps.Marker({position:{lat:t.lat,lng:t.lng},map:this.mapInstance,title:`${e.id||"\u062A\u0635\u0631\u064A\u062D"} - ${e.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`,icon:{url:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",scaledSize:new google.maps.Size(32,32)}}),i=new google.maps.InfoWindow({content:this.createPermitInfoWindowContent(e)});a.addListener("click",()=>{this.mapMarkers.forEach(r=>{r.infoWindow&&r.infoWindow.close()}),i.open(this.mapInstance,a)}),a.infoWindow=i,this.mapMarkers.push(a)}else if(this.mapType==="leaflet"&&this.mapInstance&&this.mapInstance.getContainer){const a=this.mapInstance.getContainer();if(!a||a.offsetWidth===0||a.offsetHeight===0)return;const i=L.marker([t.lat,t.lng],{title:`${e.id||"\u062A\u0635\u0631\u064A\u062D"} - ${e.workType||"\u0646\u0648\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`}).addTo(this.mapInstance);i.bindPopup(L.popup({maxWidth:400,className:"ptw-permit-popup"}).setContent(this.createPermitInfoWindowContent(e,"leaflet"))),i.permitId=e.id,this.mapMarkers.push(i)}}},updateMapMarkers(){if(this.currentTab!=="map")return;if(!this.mapInstance){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629 - \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A");return}Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629"),this.mapMarkers.forEach(n=>{try{if(this.mapType==="google"&&typeof google<"u"&&google.maps){if(n.setMap&&n.setMap(null),n.infoWindow)try{n.infoWindow.close()}catch{}}else if(this.mapType==="leaflet"&&this.mapInstance)try{this.mapInstance.removeLayer(n)}catch{}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0639\u0644\u0627\u0645\u0629:",l)}}),this.mapMarkers=[];const e=document.getElementById("ptw-map-filter-status")?.value,t=document.getElementById("ptw-map-filter-type")?.value,a=(AppState.appData.ptw||[]).filter(n=>{if(e){if(n.status!==e)return!1}else{const l=n.status||"";if(l==="\u0645\u063A\u0644\u0642"||l==="\u0645\u0631\u0641\u0648\u0636"||l==="\u0645\u0643\u062A\u0645\u0644")return!1}return!(t&&n.workType!==t)});if(Utils.safeLog("\u{1F4CA} \u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636:",a.length),a.length===0){Utils.safeLog("\u2139\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0644\u0644\u0639\u0631\u0636 \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u2014 \u0639\u0631\u0636 \u0645\u0635\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A"),this.applyEgyptDefaultView();return}const i=a;this._mapMarkersToken=(this._mapMarkersToken||0)+1;const r=this._mapMarkersToken,s=35,o=n=>{if(r!==this._mapMarkersToken||this.currentTab!=="map"||!this.mapInstance)return;i.slice(n,n+s).forEach(p=>{try{this._addSingleMapMarker(p)}catch(d){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0639\u0644\u0627\u0645\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D ${p.id}:`,d)}}),n+s<i.length?requestAnimationFrame(()=>o(n+s)):this._fitMapMarkersBounds()};o(0)},createPermitInfoWindowContent(e,t="google"){const a=this.calculateRemainingTime(e.endDate),i=e.startDate||e.createdAt,r=i?Utils.formatDate(i):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
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
                        <span style="color: #6b7280;">${r}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A:</strong>
                        <span style="color: ${a.includes("\u0645\u0646\u062A\u0647\u064A")?"#dc2626":"#059669"}; font-weight: 600;">${a}</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <strong style="color: #374151; display: block; margin-bottom: 4px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:</strong>
                        <span class="badge badge-${this.getStatusBadgeClass(e.status)}" style="display: inline-block; padding: 4px 8px; border-radius: 4px;">
                            ${Utils.escapeHTML(e.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                        </span>
                    </div>
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
                        <button onclick="PTW.viewPTW('${e.id}'); ${t==="leaflet"?"if(window.ptwCurrentPopup) window.ptwCurrentPopup.close();":""}" 
                                style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600; transition: background 0.2s;"
                                onmouseover="this.style.background='#2563eb'"
                                onmouseout="this.style.background='#3b82f6'">
                            <i class="fas fa-eye" style="margin-left: 6px;"></i>
                            \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D
                        </button>
                    </div>
                </div>
            </div>
        `},calculateRemainingTime(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{const t=this.parseDateTimeValue(e);if(!t)return"\xD8\xBA\xD9\u0160\xD8\xB1 \xD9\u2026\xD8\xAD\xD8\xAF\xD8\xAF";const i=t-new Date;if(i<0)return"\u0645\u0646\u062A\u0647\u064A";const r=Math.floor(i/(1e3*60*60)),s=Math.floor(i%(1e3*60*60)/(1e3*60));return r>24?`${Math.floor(r/24)} \u064A\u0648\u0645`:r>0?`${r} \u0633\u0627\u0639\u0629 \u0648 ${s} \u062F\u0642\u064A\u0642\u0629`:`${s} \u062F\u0642\u064A\u0642\u0629`}catch{return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}},setupMapEventListeners(){this.currentTab==="map"&&(this.mapUpdateHandler&&document.removeEventListener("ptw:updated",this.mapUpdateHandler),this.mapUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this.updateMapMarkers()},document.addEventListener("ptw:updated",this.mapUpdateHandler),this.mapStateUpdateHandler&&window.removeEventListener("appstate:updated",this.mapStateUpdateHandler),this.mapStateUpdateHandler=()=>{this.currentTab==="map"&&this.mapInstance&&this._scheduleMapTimeout(()=>{this.updateMapMarkers()},100)},window.addEventListener("appstate:updated",this.mapStateUpdateHandler))},viewRegistryDetails(e){const t=AppState.appData.ptw.find(d=>d.id===e),a=this.registryData.find(d=>d.permitId===e),i=a&&a.isManualEntry===!0;if(!t&&!a){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(i&&!t){this.viewManualPermitDetails(a.id);return}if(!t){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const r=AppState.currentUser?.role==="admin",s=t.status!=="\u0645\u063A\u0644\u0642"&&t.status!=="\u0645\u0631\u0641\u0648\u0636",o=document.createElement("div");o.className="modal-overlay";const n=Array.isArray(t.teamMembers)?t.teamMembers:[],l=n.length>0?n.map(d=>`<span class="bg-blue-50 px-2 py-1 rounded text-sm">${Utils.escapeHTML(d.name||"-")}</span>`).join(" "):'<span class="text-gray-400">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',p=a?this.getPermitTypeDisplay(a):t.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.innerHTML=`
            <div class="modal-content" style="max-width: 900px; background: #ffffff;">
                <div class="modal-header modal-header-centered bg-white border-b border-gray-200 rounded-t-lg" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <h2 class="modal-title flex items-center gap-2" style="color: #000000; font-size: 1.5rem; font-weight: 700; margin: 0;">
                            <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                            \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D #${this.getPermitDisplayNumber(a||t)}
                        </h2>
                        <p class="text-sm mt-2" style="color: #6b7280;">
                            <i class="fas fa-calendar-alt ml-1"></i>
                            ${t.startDate?Utils.formatDate(t.startDate):a?.openDate?Utils.formatDate(a.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            <span class="badge ${t.status==="\u0645\u063A\u0644\u0642"?"bg-green-500":t.status==="\u0645\u0641\u062A\u0648\u062D"||t.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"bg-yellow-500":"bg-blue-500"} mr-3" style="color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem;">
                                ${t.status||a?.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
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
                        ${r?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${e}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${e}')">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${s?`
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
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(a?this.getPermitTypeDisplay(a):t.workType||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.siteName||t.location||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.requestingParty||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.authorizedParty||"-")}</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${t.startDate?Utils.formatDate(t.startDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                                <p class="font-semibold" style="color: #000000;">${t.endDate?Utils.formatDate(t.endDate):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</label>
                                <p class="font-semibold text-blue-600" style="color: #2563eb;">${a?.totalTime||"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <span class="badge badge-${this.getStatusBadgeClass(t.status)}">${t.status||"-"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-1" style="color: #374151;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</label>
                        <p style="color: #000000;">${Utils.escapeHTML(t.workDescription||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                    </div>
                    
                    <!-- \u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="mt-4 bg-white p-4 rounded border">
                        <label class="text-xs text-gray-700 block mb-2" style="color: #374151;">\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644</label>
                        <div class="flex flex-wrap gap-2">${l}</div>
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
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${e}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        ${r?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.editPTW('${e}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deletePermitFromRegistry('${e}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-trash ml-1"></i> \u062D\u0630\u0641
                            </button>
                        `:""}
                        ${s?`
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
        `,document.body.appendChild(o),o.addEventListener("click",d=>{d.target===o&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&o.remove()})},viewManualPermitDetails(e){const t=this.registryData.find(l=>l.id===e);if(!t){Notification.error(this._t("module.ptw.notify.permitNotFoundM","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A"));return}const a=AppState.currentUser?.role==="admin",i=this.getPermitTypeDisplay(t),r=(l,p)=>this._t(l,p),s=t.sequentialNumber?String(t.sequentialNumber).padStart(4,"0"):"\u2014",o=String(t.paperPermitNumber||"").trim()||"\u2014",n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 900px; background: #ffffff;">
                <div class="modal-header modal-header-centered bg-white border-b border-gray-200 rounded-t-lg" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <h2 class="modal-title flex items-center gap-2" style="color: #000000; font-size: 1.5rem; font-weight: 700; margin: 0;">
                            <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                            ${r("module.ptw.manual.detailsTitle","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A")} \u2014 ${r("module.ptw.manual.sequentialNumber","\u0645\u0633\u0644\u0633\u0644")} #${Utils.escapeHTML(s)} | ${r("module.ptw.manual.paperPermitNumber","\u0648\u0631\u0642\u064A")} #${Utils.escapeHTML(o)}
                        </h2>
                        <p class="text-sm mt-2" style="color: #6b7280;">
                            <i class="fas fa-calendar-alt ml-1"></i>
                            ${t.openDate?Utils.formatDate(t.openDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                            <span class="badge ${t.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"bg-green-500":t.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"bg-red-500":"bg-blue-500"} mr-3" style="color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem;">
                                ${t.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
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
                            <label class="text-xs text-gray-700 block" style="color: #374151;">${r("module.ptw.manual.sequentialNumber","\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644")}</label>
                            <p class="font-bold text-blue-700" style="font-family: 'Courier New', monospace; font-size: 1.1rem;">${Utils.escapeHTML(s)}</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded border border-blue-200">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">${r("module.ptw.manual.paperPermitNumber","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A")}</label>
                            <p class="font-bold text-blue-700" style="font-family: 'Courier New', monospace; font-size: 1.1rem;">${Utils.escapeHTML(o)}</p>
                        </div>
                    </div>
                    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(i)}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.location||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.requestingParty||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.authorizedParty||"-")}</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0648\u0642\u062A \u0645\u0646</label>
                                <p class="font-semibold" style="color: #000000;">${t.timeFrom&&t.timeFrom!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(t.timeFrom):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649</label>
                                <p class="font-semibold" style="color: #000000;">${t.timeTo&&t.timeTo!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.formatDate(t.timeTo):"-"}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.totalTime||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.status||"-")}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 space-y-3">
                        <div class="bg-white p-3 rounded border">
                            <label class="text-xs text-gray-700 block" style="color: #374151;">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</label>
                            <p class="whitespace-pre-wrap" style="color: #000000;">${Utils.escapeHTML(t.workDescription||"-")}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.supervisor1||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <label class="text-xs text-gray-700 block" style="color: #374151;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02</label>
                                <p class="font-semibold" style="color: #000000;">${Utils.escapeHTML(t.supervisor2||"-")}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                        <button class="btn-primary btn-sm" onclick="PTW.printPermit('${t.permitId||t.id}')">
                            <i class="fas fa-print ml-1"></i> \u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button class="btn-success btn-sm" onclick="PTW.exportPDF('${t.permitId||t.id}')">
                            <i class="fas fa-file-pdf ml-1"></i> \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                        ${a?`
                            <button class="btn-warning btn-sm" onclick="this.closest('.modal-overlay').remove(); PTW.openManualPermitForm('${t.id}')">
                                <i class="fas fa-edit ml-1"></i> \u062A\u0639\u062F\u064A\u0644
                            </button>
                            <button class="btn-danger btn-sm" onclick="PTW.deleteManualPermitEntry('${t.id}'); this.closest('.modal-overlay').remove();">
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
        `,document.body.appendChild(n),n.addEventListener("click",l=>{l.target===n&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&n.remove()})},printPermitForm(){if(!document.getElementById("ptw-form")){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}try{const t=this.collectFormDataForPrint(),a=this.currentEditId||t.id||"NEW",i=`PTW-${a.substring(0,8)}`,r=this.generatePrintContent(t),s=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${a.substring(0,8)}`,r,!1,!1,{version:"1.0",releaseDate:t.createdAt||new Date().toISOString(),revisionDate:t.updatedAt||new Date().toISOString(),compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":a.substring(0,8)},t.createdAt||new Date().toISOString(),t.updatedAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u0637\u0628\u0627\u0639\u0629 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644</title></head><body>${r}</body></html>`,o=new Blob([s],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(o),l=window.open(n,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>{URL.revokeObjectURL(n)},800)},500)}:Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",t),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+t.message)}},collectFormDataForPrint(){if(!document.getElementById("ptw-form"))return{};const t=document.getElementById("ptw-location"),a=document.getElementById("ptw-sublocation"),i=t?.options[t?.selectedIndex]?.text||"",r=a?.options[a?.selectedIndex]?.text||"",s=c=>{const u=[];return document.querySelectorAll(`input[name="${c}-option"]`).forEach(m=>{if(m.checked)if(m.value==="other"){const h=document.getElementById(`${c}-other-text`)?.value.trim();h&&u.push(h)}else{const h=m.getAttribute("data-label")||m.value;u.push(h)}}),u},o=[];document.querySelectorAll("#approvals-tbody tr").forEach((c,u)=>{const h=document.getElementById(`approval-role-${u}`)?.value.trim()||"",f=document.getElementById(`approval-approver-select-${u}`),w=document.getElementById(`approval-approver-${u}`),x=f?f.options[f.selectedIndex]?.text||"":w?.value.trim()||"",v=document.getElementById(`approval-status-${u}`)?.value||"pending",W=document.getElementById(`approval-date-${u}`)?.value||"",D=document.getElementById(`approval-comments-${u}`)?.value.trim()||"";h&&o.push({role:h,approver:x,status:v,date:W,comments:D})});const l=typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],p={};if(typeof RiskMatrix<"u"){const c=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');c&&(p.likelihood=c.getAttribute("data-likelihood")||c.getAttribute("data-probability")||"",p.consequence=c.getAttribute("data-consequence")||c.getAttribute("data-severity")||"",p.riskLevel=c.textContent.trim()||"")}const d=document.getElementById("ptw-risk-notes")?.value.trim()||"";return{id:this.currentEditId||"NEW",location:i,sublocation:r,workDescription:document.getElementById("ptw-workDescription")?.value||"",startDate:document.getElementById("ptw-startDate")?.value||"",endDate:document.getElementById("ptw-endDate")?.value||"",requestingParty:(()=>{const c=document.getElementById("ptw-requestingParty-select"),u=document.getElementById("ptw-requestingParty");return c&&c.value&&c.value!=="__custom__"?c.value.trim():u?u.value.trim():""})(),authorizedParty:(()=>{const c=document.getElementById("ptw-authorizedParty-select"),u=document.getElementById("ptw-authorizedParty");return c&&c.value&&c.value!=="__custom__"?c.value.trim():u?u.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value||"",teamMembers:Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-name")).map(c=>({name:c.value.trim()})).filter(c=>c.name),hotWorkDetails:s("ptw-hot"),hotWorkOther:document.getElementById("ptw-hot-other-text")?.value.trim()||"",confinedSpaceDetails:s("ptw-confined"),confinedSpaceOther:document.getElementById("ptw-confined-other-text")?.value.trim()||"",heightWorkDetails:s("ptw-height"),heightWorkOther:document.getElementById("ptw-height-other-text")?.value.trim()||"",electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,requiredPPE:l,riskAssessment:p,riskNotes:d,permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||"",approvals:o,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:document.getElementById("ptw-closure-time")?.value||"",closureReason:document.getElementById("ptw-closure-reason")?.value||"",closureApprovals:(()=>{const c=[],u=document.getElementById("closure-approvals-tbody");return u&&u.querySelectorAll("tr[data-closure-approval-index]").forEach((h,f)=>{const w=document.getElementById(`closure-approval-role-${f}`),x=document.getElementById(`closure-approval-approver-select-${f}`),A=document.getElementById(`closure-approval-approver-${f}`),v=document.getElementById(`closure-approval-approver-manual-${f}`),U=document.getElementById(`closure-approval-status-${f}`),W=document.getElementById(`closure-approval-date-${f}`),_=document.getElementById(`closure-approval-comments-${f}`);let D=x?.value||"",M=A?.value||"";x&&(D==="__manual__"?(D="",M=v?.value?.trim()||""):D?M=x.options[x.selectedIndex]?.text?.replace(/\s*\((?:مقاول|موظف)\)\s*(\s*-\s*.*)?$/,"").trim()||M:M=""),c.push({role:w?.value||"",approverId:D,approver:M,status:U?.value||"pending",date:W?.value||"",comments:_?.value||"",required:h.getAttribute("data-required")!=="false"})}),c})(),closureApprovalCircuitOwnerId:document.getElementById("closure-approval-circuit-owner-id")?.value||"__default__",closureApprovalCircuitName:this.formClosureCircuitName||"",closureApproval:{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},generatePrintContent(e){const t=u=>u?String(u).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):"",a=u=>{if(!u)return"-";try{const m=this.parseDateTimeValue(u);return!m||isNaN(m.getTime())?u||"-":m.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"})}catch{return u}},i=u=>{if(!u)return"-";try{const m=this.parseDateTimeValue(u);return!m||isNaN(m.getTime())?u||"-":m.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return u}},r=e.teamMembers&&e.teamMembers.length>0?e.teamMembers.map(u=>t(u.name)).join("\u060C "):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let s=e.hotWorkDetails&&e.hotWorkDetails.length>0?e.hotWorkDetails.map(u=>t(u)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.hotWorkOther&&(s=(s!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?s+"\u060C ":"")+t(e.hotWorkOther));let o=e.confinedSpaceDetails&&e.confinedSpaceDetails.length>0?e.confinedSpaceDetails.map(u=>t(u)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.confinedSpaceOther&&(o=(o!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?o+"\u060C ":"")+t(e.confinedSpaceOther));let n=e.heightWorkDetails&&e.heightWorkDetails.length>0?e.heightWorkDetails.map(u=>t(u)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F";e.heightWorkOther&&(n=(n!=="\u0644\u0627 \u064A\u0648\u062C\u062F"?n+"\u060C ":"")+t(e.heightWorkOther));const l=[];e.preStartChecklist&&l.push("\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"),e.lotoApplied&&l.push("\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"),e.governmentPermits&&l.push("\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"),e.riskAssessmentAttached&&l.push("\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"),e.gasTesting&&l.push("\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"),e.mocRequest&&l.push("\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)");const p=l.length>0?l.join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",d=e.requiredPPE&&e.requiredPPE.length>0?e.requiredPPE.map(u=>t(u)).join("\u060C "):"\u0644\u0627 \u064A\u0648\u062C\u062F",c=e.approvals&&e.approvals.length>0?`
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
                    ${e.approvals.map(u=>`
                        <tr>
                            <td>${t(u.role)}</td>
                            <td>${t(u.approver)}</td>
                            <td>${u.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":u.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"}</td>
                            <td>${u.date?i(u.date):"-"}</td>
                            <td>${t(u.comments)}</td>
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
                    font-size: ${(()=>{try{const u=localStorage.getItem("ptw_disclaimer_font_size");return u?u+"px":"15px"}catch{return"15px"}})()};
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
                ${t(e.permitDisclaimer).replace(/\n/g,"<br>")}
            </div>
            `:""}
            
            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</div>
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</div>
                        <div class="print-field-value">${t(e.location)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</div>
                        <div class="print-field-value">${t(e.sublocation)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</div>
                        <div class="print-field-value">${i(e.startDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</div>
                        <div class="print-field-value">${i(e.endDate)}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${t(e.authorizedParty)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</div>
                        <div class="print-field-value">${t(e.requestingParty)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="print-field-value">${t(e.equipment)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</div>
                        <div class="print-field-value">${t(e.tools)||"-"}</div>
                    </div>
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644</div>
                        <div class="print-field-value">${t(e.workDescription)||"-"}</div>
                    </div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-title">\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062B\u0627\u0646\u064A : \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u0626\u0645\u064A\u0646 \u0628\u0627\u0644\u0639\u0645\u0644</div>
                <div class="print-field">
                    <div class="print-field-value">${r}</div>
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
                        <div class="print-field-value">${n}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</div>
                        <div class="print-field-value">${t(e.electricalWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</div>
                        <div class="print-field-value">${t(e.coldWorkType)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</div>
                        <div class="print-field-value">${t(e.otherWorkType)||"-"}</div>
                    </div>
                    ${e.excavationLength||e.excavationWidth||e.excavationDepth||e.soilType?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label" style="font-weight: bold; margin-bottom: 8px;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0637\u0648\u0644 (\u0645)</div>
                                <div class="print-field-value">${t(e.excavationLength)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0631\u0636 (\u0645)</div>
                                <div class="print-field-value">${t(e.excavationWidth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0627\u0644\u0639\u0645\u0642 (\u0645)</div>
                                <div class="print-field-value">${t(e.excavationDepth)||"-"}</div>
                            </div>
                            <div>
                                <div class="print-field-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</div>
                                <div class="print-field-value">${t(e.soilType)||"-"}</div>
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
                ${e.riskAssessment&&(e.riskAssessment.likelihood||e.riskAssessment.consequence)?`
                <div class="print-grid">
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u062D\u062F\u0648\u062B</div>
                        <div class="print-field-value">${t(e.riskAssessment.likelihood)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0634\u062F\u0629 \u0627\u0644\u0639\u0648\u0627\u0642\u0628</div>
                        <div class="print-field-value">${t(e.riskAssessment.consequence)||"-"}</div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                        <div class="print-field-value">${t(e.riskAssessment.riskLevel)||"-"}</div>
                    </div>
                </div>
                `:'<div class="print-field"><div class="print-field-value">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div></div>'}
                ${e.riskNotes?`
                <div class="print-field print-full-width" style="margin-top: 12px;">
                    <div class="print-field-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                    <div class="print-field-value">${t(e.riskNotes)}</div>
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
                            ${e.closureStatus==="completed"?"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":e.closureStatus==="notCompleted"?"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":e.closureStatus==="forced"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"}
                        </div>
                    </div>
                    <div class="print-field">
                        <div class="print-field-label">\u0627\u0644\u0633\u0627\u0639\u0629</div>
                        <div class="print-field-value">${e.closureTime?i(e.closureTime):"-"}</div>
                    </div>
                    ${e.closureReason?`
                    <div class="print-field print-full-width">
                        <div class="print-field-label">\u0627\u0644\u0633\u0628\u0628</div>
                        <div class="print-field-value">${t(e.closureReason)}</div>
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
                            <td>${t(e.closureApproval?.name4||"")}</td>
                            <td>${t(e.closureApproval?.name3||"")}</td>
                            <td>${t(e.closureApproval?.name2||"")}</td>
                            <td>${t(e.closureApproval?.name1||"")}</td>
                        </tr>
                        <tr>
                            <td>\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            <td>${t(e.closureApproval?.signature4||"")}</td>
                            <td>${t(e.closureApproval?.signature3||"")}</td>
                            <td>${t(e.closureApproval?.signature2||"")}</td>
                            <td>${t(e.closureApproval?.signature1||"")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `},formDataFromRegistryEntry(e){if(!e)return null;const t=l=>l===!0||l==="true"||l===1||l==="1",a=l=>l?l==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"completed":l==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"forced":l==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"notCompleted":"":"";let i=[];Array.isArray(e.manualApprovals)&&e.manualApprovals.length&&(i=e.manualApprovals.map(l=>({role:l.role||"",approver:l.name||l.approver||"",status:"approved",date:l.date||"",comments:[l.notes,l.signature?`\u062A\u0648\u0642\u064A\u0639: ${l.signature}`:""].filter(Boolean).join(" \u2014 ")})));const r={name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""};if(Array.isArray(e.manualClosureApprovals)&&e.manualClosureApprovals.length){const l=e.manualClosureApprovals;l[0]&&(r.name4=l[0].name||"",r.signature4=l[0].signature||""),l[1]&&(r.name3=l[1].name||"",r.signature3=l[1].signature||""),l[2]&&(r.name2=l[2].name||"",r.signature2=l[2].signature||""),l[3]&&(r.name1=l[3].name||"",r.signature1=l[3].signature||"")}const s=Array.isArray(e.requiredPPE)&&e.requiredPPE.length?e.requiredPPE:e.ppeNotes?String(e.ppeNotes).split(/[،,]/).map(l=>l.trim()).filter(Boolean):[],n=e.riskLikelihood||e.riskConsequence||e.riskLevel||e.riskScore?{likelihood:e.riskLikelihood||"",consequence:e.riskConsequence||"",riskLevel:e.riskLevel||e.riskScore||""}:{};return{id:e.permitId||e.id,location:e.location||"",sublocation:e.sublocation||"",workDescription:e.workDescription||"",startDate:e.timeFrom||e.openDate||"",endDate:e.timeTo||"",requestingParty:e.requestingParty||"",authorizedParty:e.authorizedParty||"",equipment:e.equipment||"",tools:e.tools||e.toolsList||"",teamMembers:Array.isArray(e.teamMembers)?e.teamMembers:[],hotWorkDetails:Array.isArray(e.hotWorkDetails)?e.hotWorkDetails:[],hotWorkOther:e.hotWorkOther||"",confinedSpaceDetails:Array.isArray(e.confinedSpaceDetails)?e.confinedSpaceDetails:[],confinedSpaceOther:e.confinedSpaceOther||"",heightWorkDetails:Array.isArray(e.heightWorkDetails)?e.heightWorkDetails:[],heightWorkOther:e.heightWorkOther||"",electricalWorkType:e.electricalWorkType||"",coldWorkType:e.coldWorkType||"",otherWorkType:e.otherWorkType||"",excavationLength:e.excavationLength||"",excavationWidth:e.excavationWidth||"",excavationDepth:e.excavationDepth||"",soilType:e.soilType||"",preStartChecklist:t(e.preStartChecklist),lotoApplied:t(e.lotoApplied),governmentPermits:t(e.governmentPermits),riskAssessmentAttached:t(e.riskAssessmentAttached),gasTesting:t(e.gasTesting),mocRequest:t(e.mocRequest),requiredPPE:s,riskAssessment:n,riskNotes:e.riskNotes||"",approvals:i,closureStatus:e.closureStatus||a(e.status),closureTime:e.closureDate||e.closureTime||"",closureReason:e.closureReason||"",closureApproval:r,permitDisclaimer:e.permitDisclaimer||"",createdAt:e.createdAt||new Date().toISOString(),updatedAt:e.updatedAt||new Date().toISOString()}},getPermitFormDataForPrint(e){if(!e)return null;if(Array.isArray(this.registryData)){const t=this.registryData.find(a=>a.permitId===e.id&&a.isManualEntry===!0);if(t)return this.formDataFromRegistryEntry(t)}return{id:e.id,location:e.siteName||e.location||"",sublocation:e.sublocationName||e.sublocation||"",workDescription:e.workDescription||"",startDate:e.startDate||"",endDate:e.endDate||"",requestingParty:e.requestingParty||"",authorizedParty:e.authorizedParty||"",equipment:e.equipment||"",tools:e.tools||e.toolsList||"",teamMembers:Array.isArray(e.teamMembers)?e.teamMembers:[],hotWorkDetails:Array.isArray(e.hotWorkDetails)?e.hotWorkDetails:[],hotWorkOther:e.hotWorkOther||"",confinedSpaceDetails:Array.isArray(e.confinedSpaceDetails)?e.confinedSpaceDetails:[],confinedSpaceOther:e.confinedSpaceOther||"",heightWorkDetails:Array.isArray(e.heightWorkDetails)?e.heightWorkDetails:[],heightWorkOther:e.heightWorkOther||"",electricalWorkType:e.electricalWorkType||"",coldWorkType:e.coldWorkType||"",otherWorkType:e.otherWorkType||"",excavationLength:e.excavationLength||"",excavationWidth:e.excavationWidth||"",excavationDepth:e.excavationDepth||"",soilType:e.soilType||"",preStartChecklist:e.preStartChecklist||!1,lotoApplied:e.lotoApplied||!1,governmentPermits:e.governmentPermits||!1,riskAssessmentAttached:e.riskAssessmentAttached||!1,gasTesting:e.gasTesting||!1,mocRequest:e.mocRequest||!1,requiredPPE:Array.isArray(e.requiredPPE)?e.requiredPPE:[],riskAssessment:e.riskAssessment||{},riskNotes:e.riskNotes||"",approvals:Array.isArray(e.approvals)?e.approvals.map(t=>({role:t.role||"",approver:typeof t.approver=="object"&&t.approver?t.approver.name||t.approver.email||t.approver.id||"":t.approver||"",status:t.status||"pending",date:t.date||"",comments:t.comments||""})):[],closureStatus:e.closureStatus||"",closureTime:e.closureTime||"",closureReason:e.closureReason||"",closureApproval:e.closureApproval||{name1:"",name2:"",name3:"",name4:"",signature1:"",signature2:"",signature3:"",signature4:""},permitDisclaimer:e.permitDisclaimer||"",createdAt:e.createdAt||new Date().toISOString(),updatedAt:e.updatedAt||new Date().toISOString()}},_normManualRoleKey(e){return String(e||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/ؤ/g,"\u0648").replace(/ئ/g,"\u064A").replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644").replace(/\s*\/\s*/g," / ").replace(/\s+/g," ")},parseManualApprovalsFromText(e){const t=String(e||"").trim();return t?t.split(/\s*\|\s*/).map(a=>{const i=String(a||"").trim();if(!i)return null;const r=i.match(/^(.+?):\s*(.+?)\s+توقيع:\s*(.*)$/);if(r){const o=String(r[2]||"").trim();return{role:String(r[1]||"").trim(),name:o==="\u2014"||o==="-"?"":o,signature:String(r[3]||"").trim()}}const s=i.match(/^(.+?):\s*(.*)$/);if(s){const o=String(s[2]||"").trim();return{role:String(s[1]||"").trim(),name:o==="\u2014"||o==="-"?"":o,signature:""}}return null}).filter(Boolean):[]},resolveManualApprovalsList(e,t){if(Array.isArray(e)&&e.length)return e.map(a=>({role:a.role||"",name:a.name||a.approver||"",signature:a.signature||""}));if(typeof e=="string"&&e.trim()){const a=e.trim();if(a.startsWith("["))try{const i=JSON.parse(a);if(Array.isArray(i)&&i.length)return i.map(r=>({role:r.role||"",name:r.name||r.approver||"",signature:r.signature||""}))}catch{}}return this.parseManualApprovalsFromText(t)},normalizeManualPermitEntryForPrint(e){if(!e)return null;const t={...e};if((!t.teamMembers||!t.teamMembers.length)&&t.teamMembersText){const l=String(t.teamMembersText).trim();t.teamMembers=l.split(/[،,]/).map(p=>{p=p.trim();const d=p.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return d?{name:d[1].trim(),signature:d[2].trim()}:{name:p,signature:""}}).filter(p=>p.name||p.signature)}(!Array.isArray(t.teamMembers)||!t.teamMembers.length)&&(t.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(l=>{t[l]!=null&&typeof t[l]=="string"&&(t[l]=t[l].split(/[،,]/).map(p=>p.trim()).filter(Boolean)),Array.isArray(t[l])||(t[l]=[])}),t.manualApprovals=this.resolveManualApprovalsList(t.manualApprovals,t.manualApprovalsText),t.manualClosureApprovals=this.resolveManualApprovalsList(t.manualClosureApprovals,t.manualClosureApprovalsText);const a=[];Array.isArray(t.requiredPPE)?a.push(...t.requiredPPE):typeof t.requiredPPE=="string"&&t.requiredPPE.trim()&&a.push(...t.requiredPPE.split(/[،,]/).map(l=>l.trim()).filter(Boolean)),t.ppeNotes&&a.push(...String(t.ppeNotes).split(/[،,]/).map(l=>l.trim()).filter(Boolean)),t._ppeSelected=[...new Set(a.map(l=>String(l).trim()).filter(Boolean))];const i=["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629","\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633","\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],r=l=>String(l||"").trim().replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),s=new Set(i.map(r));t._ppeExtraNotes=t._ppeSelected.filter(l=>!s.has(r(l)));const o=[];t.equipment&&o.push(...this._splitEquipmentTokens(t.equipment)),t._equipmentSelected=[...new Set(o.map(l=>String(l).trim()).filter(Boolean))];const n=new Set(this.getManualFixedEquipmentLabels().map(l=>this._normEquipmentItemKey(l)));return t._equipmentExtraNotes=t._equipmentSelected.filter(l=>!n.has(this._normEquipmentItemKey(l))),t},_findManualApprovalByRoles(e,t){const a=this.resolveManualApprovalsList(e,"");if(!a.length)return{name:"",signature:""};const i=r=>this._normManualRoleKey(r);for(const r of t){const s=i(r),o=a.find(n=>i(n.role)===s);if(o)return{name:o.name||o.approver||"",signature:o.signature||""}}return{name:"",signature:""}},buildManualFixedPPEPrintHtml(e=[]){const t=n=>Utils.escapeHTML(n),a=new Set((e||[]).map(n=>String(n||"").trim()).filter(Boolean)),i=n=>String(n||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),r=n=>{const l=String(n).trim();if(a.has(l))return!0;const p=i(l);for(const d of a)if(i(d)===p)return!0;return!1},s=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let o='<div class="ptw-manual-ppe-print-matrix"><div class="ptw-manual-ppe-fixed-wrap">';return s.forEach((n,l)=>{const p=l===s.length-1?"ptw-manual-ppe-fixed-row ppe-row-last":"ptw-manual-ppe-fixed-row";o+=`<div class="${p}">`,n.forEach(d=>{const c=r(d);o+=`<span class="ptw-manual-ppe-cell${c?" ppe-selected":""}"><span class="ppe-checkbox${c?" checked":""}" aria-hidden="true"></span><span class="ppe-label">${t(d)}</span></span>`}),o+="</div>"}),o+="</div></div>",o},PERMIT_A4_WIDTH_PX:794,PERMIT_A4_HEIGHT_PX:1123,PERMIT_A4_MARGIN_MM:3,PERMIT_A4_MAX_PAGES:6,PERMIT_A4_CAPTURE_SCALE:1.35,getManualPermitPdfExportTechnicalStyles_(){const e=this.PERMIT_A4_WIDTH_PX;return`
            html, body {
                width: ${e}px !important;
                max-width: ${e}px !important;
                margin: 0 !important;
                padding: 8px !important;
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
                width: ${e}px !important;
                max-width: ${e}px !important;
                transform: none !important;
                zoom: 1 !important;
                overflow: visible !important;
                box-sizing: border-box !important;
                padding: 6px 8px !important;
                page-break-after: always;
                break-after: page;
            }
            .ptw-a4-page:last-child { page-break-after: auto; break-after: auto; }
            .ptw-paper-header-pdf { display: block; padding: 0; background: transparent; border: none; min-height: 0; margin-bottom: 8px; }
            .ptw-paper-header-table {
                width: 100%; border-collapse: collapse; table-layout: fixed;
                background: #1e3a5f; border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.18);
            }
            .ptw-ph-cell {
                padding: 10px 12px; vertical-align: middle; color: #fff;
                letter-spacing: 0 !important; word-spacing: normal !important;
                font-family: 'Cairo', Tahoma, Arial, sans-serif !important;
            }
            .ptw-ph-right { width: 38%; text-align: right; }
            .ptw-ph-center { width: 32%; text-align: center; }
            .ptw-ph-left { width: 30%; text-align: left; }
            .ptw-paper-header-company {
                letter-spacing: 0 !important; word-spacing: normal !important;
                word-break: keep-all; white-space: nowrap; unicode-bidi: embed; direction: rtl;
                line-height: 1.35 !important; transform: none !important;
            }
            .ptw-paper-header-dept, .ptw-paper-header-form-title {
                letter-spacing: 0 !important; word-spacing: normal !important;
                word-break: normal; white-space: normal; unicode-bidi: embed; direction: rtl;
                line-height: 1.35 !important; transform: none !important;
            }
            .ptw-paper-header-form-subtitle { font-size: 11px; letter-spacing: 0.4px !important; direction: ltr; }
            .ptw-paper-header-form-title { font-size: 16px; font-weight: 800; }
            .ptw-paper-header-company { font-size: 14px; font-weight: 700; }
            .ptw-paper-header-dept { font-size: 10px; }
            .ptw-paper-header-logo { max-height: 48px; max-width: 110px; }
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
            @page { size: A4 portrait; margin: 4mm; }
            html, body {
                width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                max-width: ${this.PERMIT_A4_WIDTH_PX}px !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
                font-size: 10px !important;
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
                height: auto; min-height: 0; box-sizing: border-box;
                padding: 2px 4px; background: #fff; overflow: hidden;
            }
            .ptw-paper-header { padding: 6px 8px; min-height: 0; border-radius: 6px; margin-bottom: 4px; }
            .ptw-paper-header-pdf { display: block; padding: 0; background: transparent; border: none; min-height: 0; margin-bottom: 4px; }
            .ptw-paper-header-table { width: 100%; border-collapse: collapse; table-layout: fixed; background: #1e3a5f; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.18); }
            .ptw-ph-cell { padding: 5px 6px; vertical-align: middle; color: #fff; letter-spacing: 0 !important; word-spacing: normal; }
            .ptw-ph-right { width: 38%; text-align: right; }
            .ptw-ph-center { width: 32%; text-align: center; }
            .ptw-ph-left { width: 30%; text-align: left; }
            .ptw-paper-header-company { letter-spacing: 0 !important; word-break: keep-all; white-space: nowrap; unicode-bidi: embed; font-size: 12px; }
            .ptw-paper-header-dept, .ptw-paper-header-form-title { letter-spacing: 0 !important; word-break: normal; white-space: normal; unicode-bidi: embed; }
            .ptw-paper-header-form-subtitle { font-size: 9px; letter-spacing: 0.3px !important; }
            .ptw-paper-header-form-title { font-size: 13px; padding-bottom: 2px; margin-bottom: 2px; }
            .ptw-paper-header-dept { font-size: 8px; }
            .ptw-paper-header-logo { max-height: 36px; max-width: 80px; }
            .manual-print-disclaimer-wrap { margin-bottom: 3px; border-width: 1px; }
            .manual-print-disclaimer-text { font-size: 9px; line-height: 1.4; padding: 3px 6px; }
            .manual-print-permit-no { padding: 3px; gap: 3px; }
            .manual-print-seq-badge { padding: 3px 10px; border-radius: 4px; }
            .manual-print-seq-badge .lbl { font-size: 8px; }
            .manual-print-seq-badge .val { font-size: 14px; letter-spacing: 1px; }
            .manual-print-paper-no { font-size: 10px; }
            .ptw-manual-form-section { margin: 2px 0 !important; padding: 3px 5px !important; border-radius: 4px; border-width: 1px; page-break-inside: avoid !important; break-inside: avoid !important; }
            .ptw-manual-form-section h3 { font-size: 10px; margin: 0 0 3px 0 !important; padding-bottom: 2px !important; gap: 4px; }
            .manual-print-field { padding: 2px 4px; border-radius: 3px; }
            .manual-print-field .lbl { font-size: 8px; margin-bottom: 1px; }
            .manual-print-field .val { font-size: 9px; }
            .manual-print-grid { gap: 3px; }
            .manual-print-req-grid { gap: 3px; }
            .manual-print-req-item { font-size: 8px; padding: 2px 3px; border-radius: 3px; }
            .ptw-paper-grid-table { font-size: 8px; }
            .ptw-paper-grid-table th, .ptw-paper-grid-table td { padding: 1px 2px; }
            .ptw-paper-grid-table thead th { font-size: 8px; }
            .ptw-manual-ppe-print-matrix, .ptw-manual-equipment-print-matrix { padding: 4px 4px; border-radius: 4px; }
            .ptw-manual-ppe-fixed-row, .ptw-manual-equipment-fixed-row { gap: 2px 1px; margin-bottom: 1px; }
            .ptw-manual-ppe-cell, .ptw-manual-equipment-cell { font-size: 7.5px; padding: 1px 2px; min-height: 14px; line-height: 1.15; letter-spacing: 0; border-width: 1px; border-radius: 3px; gap: 2px; }
            .ppe-checkbox, .equipment-checkbox { width: 8px; height: 8px; border-width: 1px; }
            .ppe-checkbox.checked::after, .equipment-checkbox.checked::after { left: 1px; top: 0; width: 3px; height: 5px; border-width: 0 1.5px 1.5px 0; }
            .ptw-manual-ppe-notes-print, .ptw-manual-equipment-notes-print { margin-top: 2px; padding: 3px 4px; border-radius: 4px; }
            .ptw-manual-ppe-notes-print .lbl, .ptw-manual-equipment-notes-print .lbl { font-size: 8px; margin-bottom: 1px; }
            .ptw-manual-ppe-notes-print .val, .ptw-manual-equipment-notes-print .val { font-size: 9px; }
            .manual-risk-matrix { font-size: 7.5px; }
            .manual-risk-matrix th, .manual-risk-matrix td { padding: 1px; }
            .manual-risk-matrix .risk-cell { padding: 3px 1px; }
            .manual-risk-summary { margin-top: 3px; padding: 3px 5px; gap: 6px; border-radius: 4px; }
            .manual-risk-badge { width: 20px; height: 20px; font-size: 9px; }
            .manual-risk-summary div { font-size: 8px; }
            .manual-work-block { padding: 3px 4px; margin-bottom: 2px; border-radius: 4px; }
            .manual-work-block h4 { font-size: 9px; margin: 0 0 2px 0; }
            .manual-status-pill { padding: 2px 6px; font-size: 9px; }
            .manual-print-supervisors-grid { gap: 4px; }
            .manual-print-supervisor-card { padding: 3px 5px; border-radius: 4px; }
            .manual-print-supervisor-card .lbl { font-size: 8px; margin-bottom: 2px; }
            .manual-print-supervisor-card .val { font-size: 9px; min-height: 1em; }
            .ptw-paper-grid-table .approval-name-cell,
            .ptw-paper-grid-table .approval-sig-cell { min-height: 16px; }
            .ptw-paper-footer { margin-top: 3px; padding-top: 2px; border-top: 1px solid #e0e7ff; page-break-inside: avoid; break-inside: avoid; }
            .ptw-paper-footer-frame {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(37, 99, 235, 0.05));
                border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 4px; padding: 3px 6px;
            }
            .ptw-paper-footer-meta {
                display: flex; flex-wrap: wrap; justify-content: space-between; gap: 3px 6px;
                font-size: 8px; color: #475569; font-weight: 600; padding-bottom: 3px;
                border-bottom: 1px dashed rgba(148, 163, 184, 0.45); letter-spacing: 0;
            }
            .ptw-pf-item { white-space: nowrap; }
            .ptw-paper-footer-company {
                display: flex; flex-direction: column; align-items: center; gap: 1px;
                margin-top: 3px; font-size: 8px; color: #334155; font-weight: 600; letter-spacing: 0;
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
        `},_wrapPermitHtmlForA4Export(e){if(!e)return e;const t=`<style id="ptw-a4-export-overrides">${this.getPermitA4ExportOverrides_()}</style>`;return e.includes("</head>")?e.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">${t}</head><body><div id="ptw-permit-print-root">${e}</div></body></html>`},_formatManualPermitDateTime(e){if(!e||e==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return"\u2014";try{const t=this.parseDateTimeValue(e);return!t||isNaN(t.getTime())?String(e):t.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return String(e)}},generateManualPermitPrintContent(e){const t=this.normalizeManualPermitEntryForPrint(e);if(!t)return"";const a=k=>Utils.escapeHTML(k==null?"":String(k)),i=(k,S,I=!1)=>`
            <div class="manual-print-field${I?" full":""}">
                <div class="lbl">${a(k)}</div>
                <div class="val">${S?a(S):"\u2014"}</div>
            </div>`,r=String(t.sequentialNumber||this.getPermitDisplayNumber(t)).padStart(4,"0"),s=String(t.paperPermitNumber||"").trim()||"\u2014",o=(t.teamMembers||[]).map(k=>`
            <tr>
                <td>${a(k.name)||"\u2014"}</td>
                <td style="border-right: 3px solid #1e3a8a;">${a(k.signature||k.id)||"\u2014"}</td>
            </tr>`).join(""),n=[{key:"preStartChecklist",label:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"},{key:"lotoApplied",label:"\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO"},{key:"governmentPermits",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629"},{key:"riskAssessmentAttached",label:"\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"gasTesting",label:"\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A"},{key:"mocRequest",label:"\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)"}],l=k=>k===!0||k==="true"||k===1||k==="1",p=n.map(k=>{const S=l(t[k.key]);return`<div class="manual-print-req-item${S?" on":""}">${S?"\u2611":"\u2610"} ${a(k.label)}</div>`}).join(""),d=[],c=(k,S,I)=>{const B=Array.isArray(S)?S.filter(Boolean):[],O=I?String(I).trim():"";!B.length&&!O||d.push(`<div class="manual-work-block"><h4>${a(k)}</h4><div>${a([...B,O].filter(Boolean).join("\u060C ")||"\u2014")}</div></div>`)};c("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",t.hotWorkDetails,t.hotWorkOther),c("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",t.confinedSpaceDetails,t.confinedSpaceOther),c("\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",t.heightWorkDetails,t.heightWorkOther),(t.excavationLength||t.excavationWidth||t.excavationDepth||t.soilType)&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</h4>
                <div>\u0627\u0644\u0637\u0648\u0644: ${a(t.excavationLength)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0631\u0636: ${a(t.excavationWidth)||"\u2014"} \u0645 | \u0627\u0644\u0639\u0645\u0642: ${a(t.excavationDepth)||"\u2014"} \u0645 | \u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629: ${a(t.soilType)||"\u2014"}</div></div>`),t.electricalWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621</h4><div>${a(t.electricalWorkType)}</div></div>`),t.coldWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</h4><div>${a(t.coldWorkType)}</div></div>`),t.otherWorkType&&d.push(`<div class="manual-work-block"><h4>\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</h4><div>${a(t.otherWorkType)}</div></div>`);const u=this.getPermitTypeDisplay(t),m=`
            <div class="manual-work-block" style="border-color:#93c5fd;background:#eff6ff;"><h4>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629</h4><div>${a(u)}</div></div>
            ${d.length?d.join(""):'<div class="manual-print-field full"><div class="val">\u2014</div></div>'}`,h={5:"\u0634\u0628\u0647 \u0645\u0624\u0643\u062F",4:"\u0645\u062D\u062A\u0645\u0644 \u062C\u062F\u0627\u064B",3:"\u0645\u062D\u062A\u0645\u0644",2:"\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644",1:"\u0646\u0627\u062F\u0631"},f=parseInt(t.riskLikelihood,10),w=parseInt(t.riskConsequence,10),x=[5,4,3,2,1].map(k=>{const S=[1,2,3,4,5].map(I=>{const B=k*I;let O="#22c55e",V="#fff";return B<=4?(O="#22c55e",V="#fff"):B<=9?(O="#eab308",V="#1c1917"):B<=16?(O="#f97316",V="#fff"):(O="#dc2626",V="#fff"),`<td class="risk-cell${f===k&&w===I?" risk-selected":""}" style="background:${O};color:${V};">${B}</td>`}).join("");return`<tr><td class="row-label">${k} - ${h[k]}</td>${S}</tr>`}).join(""),A=t.riskScore?t.riskScore<=4?"#22c55e":t.riskScore<=9?"#eab308":t.riskScore<=16?"#f97316":"#dc2626":"#94a3b8",v=t.riskScore>4&&t.riskScore<=9?"#1c1917":"#fff",W=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(k=>this._findManualApprovalByRoles(t.manualApprovals,[k,k.replace(/ئ/g,"\u0624"),k.replace(/ؤ/g,"\u0626"),k.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),k.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),D=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(k=>this._findManualApprovalByRoles(t.manualClosureApprovals,[k,k.replace(/ئ/g,"\u0624"),k.replace(/ؤ/g,"\u0626"),k.replace(/مسئول/g,"\u0645\u0633\u0624\u0648\u0644"),k.replace(/مسؤول/g,"\u0645\u0633\u0626\u0648\u0644")])),M=k=>{const S=String(k||"").trim();return S?a(S):"\u2014"},R=t.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"?"manual-status-completed":t.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"manual-status-forced":t.status==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"?"manual-status-incomplete":"",F=t.sublocation||(Array.isArray(t.locationEntries)&&t.locationEntries.length?t.locationEntries.map(k=>k.sublocation).filter(Boolean).join(" | "):"");return`
            <div class="manual-print-disclaimer-wrap">
                <div class="manual-print-disclaimer-text">
                    \u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647<br>
                    \u0648\u0644\u0627 \u064A\u062C\u0648\u0632 \u0628\u0623\u064A \u062D\u0627\u0644 \u0645\u0646 \u0627\u0644\u0623\u062D\u0648\u0627\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0644\u0623\u064A \u0639\u0645\u0644 \u0622\u062E\u0631 \u0644\u0645 \u064A\u062A\u0645 \u0648\u0635\u0641\u0647<br>
                    \u0648\u0639\u0644\u064A\u0647 \u0641\u0625\u0646\u0647 \u064A\u062C\u0628 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0645\u062F\u0629 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0648\u0641\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0644\u0639\u0645\u0644 \u0641\u064A\u0647 \u0641\u0642\u0637.
                </div>
                <div class="manual-print-permit-no">
                    <div class="manual-print-seq-badge">
                        <span class="lbl">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D / Permit No.</span>
                        <span class="val">${a(r)}</span>
                    </div>
                    <div class="manual-print-paper-no">\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A: <strong>${a(s)}</strong></div>
                </div>
            </div>

            <div class="ptw-manual-form-section manual-section-1">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
                <div class="manual-print-grid">
                    ${i("\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",t.location)}
                    ${i("\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A",F)}
                    ${i("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",this._formatManualPermitDateTime(t.timeFrom))}
                    ${i("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",this._formatManualPermitDateTime(t.timeTo))}
                    ${i("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",t.authorizedParty)}
                    ${i("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",t.requestingParty)}
                    <div class="manual-print-field full">
                        <div class="lbl">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</div>
                        <div class="val">
                            ${(()=>{const k=this.buildKnownEquipmentHistoryLabels(t.id||t.permitId||null),S=this.parseEquipmentToSelection(t.equipment,k);return`${this.buildManualFixedEquipmentPrintHtml(S.matrixSelected||[])}${S.manualNotes?`
                            <div class="ptw-manual-equipment-notes-print">
                                <div class="lbl">\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A</div>
                                <div class="val">${a(S.manualNotes)}</div>
                            </div>`:""}`})()}
                        </div>
                    </div>
                    ${i("\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)",t.tools||t.toolsList,!0)}
                    ${i("\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",t.workDescription,!0)}
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
                ${m}
            </div>

            <div class="ptw-manual-form-section manual-section-4">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0639 : \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h3>
                <div class="manual-print-req-grid">${p}</div>
            </div>

            <div class="ptw-manual-form-section manual-section-5">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 / \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</h3>
                <div class="ptw-manual-ppe-body">
                    ${this.buildManualFixedPPEPrintHtml(t._ppeSelected)}
                    ${t._ppeExtraNotes&&t._ppeExtraNotes.length?`
                    <div class="ptw-manual-ppe-notes-print">
                        <div class="lbl">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A)</div>
                        <div class="val">${a(t._ppeExtraNotes.join("\u060C "))}</div>
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
                    <tbody>${x}</tbody>
                </table>
                ${t.riskScore?`
                <div class="manual-risk-summary">
                    <div class="manual-risk-badge" style="background:${A};color:${v};">${a(t.riskScore)}</div>
                    <div>
                        <div><strong>\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${a(t.riskScore)}</div>
                        <div><strong>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:</strong> ${a(t.riskLevel||"\u2014")}</div>
                        <div><strong>\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629:</strong> ${a(t.riskLikelihood||"\u2014")} | <strong>\u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong> ${a(t.riskConsequence||"\u2014")}</div>
                    </div>
                </div>`:""}
                ${t.riskNotes?`<div class="manual-print-field full" style="margin-top:8px;"><div class="lbl">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div><div class="val">${a(t.riskNotes)}</div></div>`:""}
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
                            ${W.map(k=>`<td class="approval-name-cell">${M(k.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${W.map(k=>`<td class="approval-sig-cell">${M(k.signature)}</td>`).join("")}
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
                        <div class="val"><span class="manual-status-pill ${R}">${a(t.status||"\u2014")}</span></div>
                    </div>
                    ${i("\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642",this._formatManualPermitDateTime(t.closureDate||t.closureTime))}
                    ${i("\u0627\u0644\u0633\u0628\u0628",t.closureReason,!0)}
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
                            ${D.map(k=>`<td class="approval-name-cell">${M(k.name)}</td>`).join("")}
                        </tr>
                        <tr>
                            <td class="row-label">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                            ${D.map(k=>`<td class="approval-sig-cell">${M(k.signature)}</td>`).join("")}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="ptw-manual-form-section manual-section-10">
                <h3>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0639\u0627\u0634\u0631 : \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</h3>
                <div class="manual-print-supervisors-grid">
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644</div>
                        <div class="val">${M(t.supervisor1)}</div>
                    </div>
                    <div class="manual-print-supervisor-card">
                        <div class="lbl">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</div>
                        <div class="val">${M(t.supervisor2)}</div>
                    </div>
                </div>
            </div>
        `},_splitManualPermitPrintPages_(e,t,a,i){return`${t}${e}${a}`},_verifyManualPermitExportHtml_(e){const a=[{key:"header-title",label:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:i=>i.includes("\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644")&&i.includes("Permit To Work")},{key:"header-company",label:"\u0647\u064A\u062F\u0631 \u0627\u0644\u0634\u0631\u0643\u0629",test:i=>i.includes("ptw-paper-header")},{key:"footer",label:"\u0641\u0648\u062A\u0631 \u0627\u0644\u0646\u0645\u0648\u0630\u062C",test:i=>i.includes("ptw-paper-footer")&&i.includes("\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C")},{key:"disclaimer",label:"\u0625\u062E\u0644\u0627\u0621 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629",test:i=>i.includes("manual-print-disclaimer-text")},{key:"sections",label:"\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0639\u0634\u0631\u0629",test:i=>{for(let r=1;r<=10;r++)if(!i.includes(`manual-section-${r}`))return!1;return!0}},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",test:i=>i.includes("ptw-manual-ppe-print-matrix")||i.includes("ptw-manual-ppe-fixed")},{key:"risk",label:"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631",test:i=>i.includes("manual-risk-matrix")},{key:"approvals",label:"\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A",test:i=>i.includes("manual-section-7")},{key:"closure",label:"\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D",test:i=>i.includes("manual-section-8")},{key:"supervisors",label:"\u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",test:i=>i.includes("manual-section-10")}].filter(i=>!i.test(e||""));return{ok:a.length===0,failed:a.map(i=>i.label),pageCount:(String(e||"").match(/ptw-a4-page/g)||[]).length}},_logManualPermitExportReview_(e,t,a="export"){const i=this._verifyManualPermitExportHtml_(e);return i.ok?(Utils.safeLog(`\u2705 \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${a}): \u0645\u0637\u0627\u0628\u0642 \u2014 ${i.pageCount||1} \u0635\u0641\u062D\u0629/\u0635\u0641\u062D\u0627\u062A HTML`),i):(Utils.safeWarn(`\u26A0\uFE0F \u0645\u0631\u0627\u062C\u0639\u0629 \u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (${a}): \u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629 \u2014 ${i.failed.join("\u060C ")}`),i)},async generateManualPermitPrintHTML(e,t={}){const a=t?.pdfExport===!0,i=this.generateManualPermitPrintContent(e),r=this.getPermitDisplayNumber(e);let s=e?.isoCode||"Form ICP (F14-26-01)",o=e?.createdAt||e?.timeFrom,n=e?.updatedAt||e?.timeTo||e?.createdAt,l=null;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const w=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");w&&(w.versionNumber&&(l=w.versionNumber),w.issueDate&&(o=w.issueDate),w.revisionDate&&(n=w.revisionDate))}}catch{}const p={formCode:l?`${s} (v${l})`:s,issueDate:o,revisionDate:n},d=this.renderPermitSystemFooter(p),c=this.renderPermitSystemHeader({forPdf:a}),u=a?this._splitManualPermitPrintPages_(i,c,d,!0):`${c}${i}${d}`,m=a?this.getManualPermitPdfExportTechnicalStyles_():"",h=`${this.getManualPermitPrintStyles(a)}${m}`,f=`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A #${Utils.escapeHTML(r)}</title>
    <style>${h}</style>
</head>
<body>
    <div class="ptw-manual-print${a?" ptw-manual-print-a4":""}" id="ptw-permit-print-root">
        ${u}
    </div>
</body>
</html>`;return t?.skipReview!==!0&&this._logManualPermitExportReview_(f,e,a?"pdf-export":"print"),f},_loadPermitPdfLib_(e,t){if(t())return Promise.resolve(!0);const a=Array.isArray(e)?e:[e],i=r=>{if(r>=a.length)return Promise.resolve(!1);const s=a[r],o=Array.from(document.querySelectorAll("script[src]")).find(n=>String(n.src||"").includes(s.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return o?new Promise(n=>{const l=()=>n(!!t());o.addEventListener("load",l,{once:!0}),setTimeout(l,4e3)}):new Promise(n=>{const l=document.createElement("script");l.src=s,l.async=!0,l.onload=()=>n(!!t()),l.onerror=()=>n(i(r+1)),document.head.appendChild(l)})};return i(0)},async _ensurePermitPdfLibs_(){const e=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),t=await this._loadPermitPdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return e&&t},_getPermitJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadPermitPdfFonts_(e){const t=e||document,a=t.head||t.documentElement;if(a&&!t.getElementById("ptw-permit-cairo-font")){const i=t.createElement("link");i.id="ptw-permit-cairo-font",i.rel="stylesheet",i.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",a.appendChild(i)}try{t.fonts&&typeof t.fonts.load=="function"&&(await t.fonts.load("400 14px Cairo"),await t.fonts.load("600 14px Cairo"),await t.fonts.load("700 18px Cairo"),await t.fonts.load("800 16px Cairo"),await t.fonts.ready)}catch{}},_addPermitCanvasToPdfFullWidth_(e,t,a,i={}){const r=e.internal.pageSize.getWidth(),s=e.internal.pageSize.getHeight(),o=r-a*2,n=s-a*2,l=o,p=t.height/t.width*l,{dataUrl:d,format:c}=Utils.PdfExport.compressCanvasToJpegDataUrl(t,Utils.PdfExport.TARGET_MAX_BYTES);if(p<=n+.5||i.allowSlice===!1)return e.addImage(d,c,a,a,l,Math.min(p,n)),1;const u=t.width/l,m=Math.max(1,Math.floor(n*u)),h=Math.max(1,i.maxSlices||4);let f=0;for(let w=0;w<t.height&&f<h;w+=m){f>0&&e.addPage();const x=Math.min(m,t.height-w),A=document.createElement("canvas");A.width=t.width,A.height=x;const v=A.getContext("2d");v&&(v.fillStyle="#ffffff",v.fillRect(0,0,A.width,A.height),v.drawImage(t,0,w,t.width,x,0,0,t.width,x));const U=x/t.width*l,{dataUrl:W,format:_}=Utils.PdfExport.compressCanvasToJpegDataUrl(A,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/h));e.addImage(W,_,a,a,l,Math.min(U,n)),f+=1}return f},async _ensureJsPdfInFrame_(e,t){return!e||!t?!1:t.jspdf?.jsPDF||typeof t.jsPDF=="function"?!0:new Promise(a=>{const i=e.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",i.async=!0,i.onload=()=>a(!!(t.jspdf?.jsPDF||typeof t.jsPDF=="function")),i.onerror=()=>a(!1),(e.head||e.documentElement).appendChild(i)})},_getPermitJsPdfFromFrame_(e){return e?e.jspdf?.jsPDF?e.jspdf.jsPDF:typeof e.jsPDF=="function"?e.jsPDF:this._getPermitJsPdfConstructor_():this._getPermitJsPdfConstructor_()},async _downloadPermitHtmlViaJsPdfHtml_(e,t,a,i,r,s){const o=this._getPermitJsPdfFromFrame_(a);if(!o||!t)return!1;const n=e&&typeof e.html=="function"?e:new o({orientation:"portrait",unit:"mm",format:"a4"});if(typeof n.html!="function")return!1;const l=n.internal.pageSize.getWidth()-r*2;return new Promise(p=>{let d=!1;const c=m=>{d||(d=!0,p(!!m))},u=setTimeout(()=>c(!1),45e3);try{n.html(t,{callback:m=>{clearTimeout(u);try{m.save(i),c(!0)}catch{c(!1)}},margin:[r,r,r,r],width:l,windowWidth:s,html2canvas:{scale:this.PERMIT_A4_CAPTURE_SCALE||2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",logging:!1,width:s,windowWidth:s,scrollX:0,scrollY:0},autoPaging:"slice"})}catch{clearTimeout(u),c(!1)}})},async _downloadPermitHtmlAsPdfByPages_(e,t,a,i,r,s,o){if(!e||!t?.length)return!1;const n=Array.from(t).slice(0,o),l=this.PERMIT_A4_HEIGHT_PX;for(let p=0;p<n.length;p++){p>0&&e.addPage();const d=n[p];d.style.display="block",d.style.width=`${s}px`,d.style.maxWidth=`${s}px`,d.style.boxSizing="border-box",d.style.transform="none",d.style.zoom="1",d.style.background="#ffffff",d.style.overflow="visible",d.style.position="relative",this._sanitizePermitNodeForCanvasCapture_(d);const c=Math.max(d.scrollHeight,d.offsetHeight,1);i.style.width=`${s}px`,i.style.height=`${c+160}px`,typeof d.scrollIntoView=="function"&&d.scrollIntoView({block:"start"}),await new Promise(f=>setTimeout(f,450));const u=await this._capturePermitHtmlToCanvas_(d,a,{width:s,height:c});if(!u)return!1;const m=c>l,h=m?Math.min(6,Math.max(1,Math.ceil(c/l))):1;this._addPermitCanvasToPdfFullWidth_(e,u,r,{allowSlice:m,maxSlices:h})}return!0},async _downloadPermitHtmlAsPdfByCanvas_(e,t,a,i,r){if(!e||!t)return!1;t.style.width=`${this.PERMIT_A4_WIDTH_PX}px`,t.style.maxWidth=`${this.PERMIT_A4_WIDTH_PX}px`,t.style.boxSizing="border-box";const s=Math.max(t.scrollHeight,t.offsetHeight,1),o=await this._capturePermitHtmlToCanvas_(t,a,{width:this.PERMIT_A4_WIDTH_PX,height:s});return o?this._addPermitCanvasToPdfFullWidth_(e,o,i,{allowSlice:!0,maxSlices:r})>0:!1},async _ensureHtml2CanvasInFrame_(e,t){return!e||!t?!1:typeof t.html2canvas=="function"?!0:new Promise(a=>{const i=e.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",i.async=!0,i.onload=()=>a(typeof t.html2canvas=="function"),i.onerror=()=>a(!1),(e.head||e.documentElement).appendChild(i)})},_sanitizePermitNodeForCanvasCapture_(e){if(!e)return;const t=a=>{!a||!a.style||(a.style.transform="none",a.style.zoom="1",a.style.filter="none",a.style.webkitFilter="none")};t(e),e.querySelectorAll("*").forEach(t)},async _capturePermitHtmlToCanvas_(e,t,a={}){const i=a.width||this.PERMIT_A4_WIDTH_PX,r=Math.max(e?.scrollWidth||i,i),s=Math.max(e?.scrollHeight||1,a.height||e?.scrollHeight||1,1);let o=this.PERMIT_A4_CAPTURE_SCALE||2;for(;o>1&&(r*o>16e3||s*o>16e3);)o-=.25;const n=t&&typeof t.html2canvas=="function"?t.html2canvas:html2canvas,l={scale:o,backgroundColor:"#ffffff",logging:!1,useCORS:!0,allowTaint:!0,imageTimeout:12e3,scrollX:0,scrollY:0,width:r,height:s,windowWidth:r,windowHeight:s,onclone:(c,u)=>{const m=c.getElementById("ptw-permit-print-root")||u;this._sanitizePermitNodeForCanvasCapture_(m),c.querySelectorAll(".ptw-ph-cell, .ptw-paper-header-dept, .ptw-paper-header-form-title, .ptw-paper-header-form-subtitle").forEach(h=>{h?.style&&(h.style.letterSpacing="0",h.style.wordSpacing="normal",h.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",h.style.transform="none",h.style.unicodeBidi="embed")}),c.querySelectorAll(".ptw-paper-header-company").forEach(h=>{h?.style&&(h.style.letterSpacing="0",h.style.wordSpacing="normal",h.style.fontFamily="'Cairo', Tahoma, Arial, sans-serif",h.style.transform="none",h.style.unicodeBidi="embed",h.style.whiteSpace="nowrap",h.style.wordBreak="keep-all")}),c.body&&(c.body.style.width=`${r}px`,c.body.style.padding="8px",c.body.style.margin="0",c.body.style.background="#ffffff",c.body.style.direction="rtl"),c.documentElement&&(c.documentElement.style.direction="rtl")}},p=[l,{...l,useCORS:!1,allowTaint:!0},{...l,scale:Math.max(1.25,o-.5)}];let d=null;for(let c=0;c<p.length;c++)try{const u=await n(e,p[c]);if(u&&u.width>0&&u.height>0)return u}catch(u){d=u}if(d)throw d;return null},async _downloadPermitHtmlAsPdf(e,t){const a=this._getPermitJsPdfConstructor_();if(!a||typeof html2canvas>"u")return!1;const i=String(t||"PTW.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,r=this.PERMIT_A4_WIDTH_PX,s=this.PERMIT_A4_MARGIN_MM,o=this.PERMIT_A4_MAX_PAGES||6;await this._preloadPermitPdfFonts_();const n=document.createElement("iframe");n.setAttribute("aria-hidden","true"),n.style.cssText=`position:fixed;left:-20000px;top:0;width:${r}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(n);try{n.srcdoc=e,await new Promise(f=>{n.onload=f,n.onerror=f,setTimeout(f,8e3)});const l=n.contentDocument||n.contentWindow?.document,p=n.contentWindow;if(!l||!p)return!1;await this._preloadPermitPdfFonts_(l),await new Promise(f=>setTimeout(f,900));const d=Array.from(l.images||[]);await Promise.all(d.map(f=>new Promise(w=>{if(f.complete)return w();f.onload=w,f.onerror=w,setTimeout(w,3e3)}))),await this._ensureHtml2CanvasInFrame_(l,p),await this._ensureJsPdfInFrame_(l,p),await new Promise(f=>setTimeout(f,400));const c=l.getElementById("ptw-permit-print-root")||l.querySelector(".ptw-manual-print")||l.querySelector(".report-wrapper")||l.querySelector(".form-container")||l.body;if(!c)return!1;c.style.width=`${r}px`,c.style.maxWidth=`${r}px`,c.style.margin="0",c.style.padding="0",c.style.boxSizing="border-box",c.style.background="#ffffff";const u=Math.max(c.scrollHeight,c.offsetHeight,200);n.style.width=`${r}px`,n.style.height=`${u+80}px`,await new Promise(f=>setTimeout(f,200));const m=c.querySelectorAll(".ptw-a4-page");let h=!1;if(m.length>0){const f=new a({orientation:"portrait",unit:"mm",format:"a4"});h=await this._downloadPermitHtmlAsPdfByPages_(f,m,p,n,s,r,o),h&&f.save(i)}if(!h){const f=new a({orientation:"portrait",unit:"mm",format:"a4"});h=await this._downloadPermitHtmlAsPdfByCanvas_(f,c,p,s,o),h&&f.save(i)}return h}catch(l){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0635\u0631\u064A\u062D PDF:",l),!1}finally{n.remove()}},_sanitizePermitFileName_(e){return String(e||"PTW").replace(/[/\\?%*:|"<>]/g,"-").trim()||"PTW"},async buildPermitExportPayload(e,t={}){const a=t?.forPdf!==!1,i=Array.isArray(this.registryData)?this.registryData.find(f=>f.permitId===e||f.id===e):null;if(i?.isManualEntry){const f=this.getPermitDisplayNumber(i),w=String(i.sequentialNumber||f).replace(/\D/g,"").padStart(4,"0")||f,x=await this.generateManualPermitPrintHTML(i),A=await this.generateManualPermitPrintHTML(i,{pdfExport:!0,skipReview:!0}),v=this._verifyManualPermitExportHtml_(A);return{html:A,printHtml:x,fileName:`PTW-${this._sanitizePermitFileName_(w)}.pdf`,displayNo:f,isManualEntry:!0,exportReview:v}}const r=i?.permitId||e,s=AppState.appData.ptw.find(f=>f.id===r);if(!s)return null;const o=i||this.registryData.find(f=>f.permitId===s.id),n=this.getPermitDisplayNumber(o||s);let l=s.isoCode||"Form ICP (F14-26-01)",p=s.version||"1.0",d=s.startDate||s.createdAt,c=s.updatedAt||s.endDate||s.startDate;try{if(typeof ISO<"u"&&typeof ISO.getFormCodeDetails=="function"){const f=await ISO.getFormCodeDetails("Form ICP (F14-26-01)");f&&(f.versionNumber&&(p=f.versionNumber),f.issueDate&&(d=f.issueDate),f.revisionDate&&(c=f.revisionDate))}}catch{}const u=this.getPermitFormDataForPrint(s),m=this.generatePrintContent(u);return{html:this._wrapPermitHtmlForA4Export(typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(l,`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 #${n}`,m,!1,!1,{version:p,releaseDate:d,revisionDate:c,compactPdfFooter:!0,"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":n},s.createdAt||s.startDate,s.updatedAt||s.endDate||s.createdAt):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644</title></head><body><div id="ptw-permit-print-root">${m}</div></body></html>`),fileName:`PTW-${this._sanitizePermitFileName_(n)}.pdf`,displayNo:n}},openPermitPrintWindow(e,t){try{const a=new Blob([e],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(a),r=window.open(i,"_blank");r?r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{URL.revokeObjectURL(i),typeof t=="function"&&t()},800)},500)}:(Notification.error(this._t("module.ptw.notify.popupsPrint","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")),typeof t=="function"&&t())}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",a),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+a.message),typeof t=="function"&&t()}},async printPermit(e){Loading.show();const t=await this.buildPermitExportPayload(e,{forPdf:!1});if(Loading.hide(),!t){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const a=t.isManualEntry&&t.printHtml?t.printHtml:t.html;this.openPermitPrintWindow(a)},async deletePermitFromRegistry(e){if(AppState.currentUser?.role!=="admin"){Notification.error(this._t("module.ptw.notify.cannotDeletePerm","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"));return}if(confirm(this._t("module.ptw.notify.deletePtwFromSystem",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`)))try{Loading.show();const t=AppState.appData.ptw.findIndex(i=>i.id===e);t>-1&&AppState.appData.ptw.splice(t,1),this.removeFromRegistry(e),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),document.querySelector(".modal-overlay")?.remove(),this.loadPTWList(!0);const a=document.getElementById("ptw-registry-content");a&&a.style.display!=="none"&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",t),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}finally{Loading.hide()}},setupRegistryEventListeners(){const e=document.getElementById("ptw-registry-add-manual");e&&(e.onclick=()=>this.openManualPermitForm());const t=document.getElementById("ptw-registry-import-excel");t&&(t.onclick=()=>this.showImportExcelModal());const a=document.getElementById("ptw-registry-export-excel");a&&(a.onclick=()=>this.exportRegistryToExcel());const i=document.getElementById("ptw-registry-export-pdf");i&&(i.onclick=()=>this.exportRegistryToPDF());const r=document.getElementById("registry-search");r&&(r.oninput=()=>this.applyRegistryFilters());const s=document.getElementById("registry-filter-status");s&&(s.onchange=()=>this.applyRegistryFilters());const o=document.getElementById("registry-filter-date-from"),n=document.getElementById("registry-filter-date-to");o&&(o.onchange=()=>this.applyRegistryFilters()),n&&(n.onchange=()=>this.applyRegistryFilters()),this.applyRegistryFilters()},_normalizeRegistrySearchText(e){return String(e??"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},_getLinkedPermitForRegistryEntry(e){if(!e||e.isManualEntry)return null;const t=String(e.permitId||"").trim();return t&&(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).find(i=>i&&(String(i.id)===t||String(i.permitId||"")===t))||null},_getRegistryEntrySearchHaystack(e){if(!e)return[];const t=this._getLinkedPermitForRegistryEntry(e),a=(()=>{try{return this.getPermitTypeDisplay(e)}catch{return""}})(),i=(()=>{try{return this.statusLabel(e.status)}catch{return String(e.status||"")}})(),r=(()=>{try{return this.getPermitDisplayNumber(e)}catch{return""}})();return[e.paperPermitNumber,e.paperPermitNo,e.permitNumber,e.sequentialNumber,e.permitId,e.id,r,e.workDescription,e.requestingParty,e.authorizedParty,e.location,e.sublocation,e.supervisor1,e.supervisor2,a,i,t?.paperPermitNumber,t?.paperPermitNo,t?.permitNumber,t?.id,t?.workDescription].map(o=>String(o??"").trim()).filter(o=>o&&o!=="\u2014"&&o!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&o!=="-")},_registryEntryMatchesSearch(e,t){const a=this._normalizeRegistrySearchText(t);if(!a)return!0;const i=this._getRegistryEntrySearchHaystack(e);if(i.some(s=>this._normalizeRegistrySearchText(s).includes(a)))return!0;const r=String(t||"").replace(/\D/g,"");return r&&/^\d+$/.test(String(t||"").trim())?i.some(s=>{const o=String(s).replace(/\D/g,"");return o&&(o===r||o.includes(r))}):!1},applyRegistryFilters(){const e=document.getElementById("registry-search")?.value.trim()||"",t=e.toLowerCase(),a=document.getElementById("registry-filter-status")?.value||"",i=document.getElementById("registry-filter-date-from")?.value||"",r=document.getElementById("registry-filter-date-to")?.value||"",s=document.querySelectorAll("[data-registry-id]");let o=0;s.forEach(l=>{let p=!0;const d=l.textContent.toLowerCase(),c=l.getAttribute("data-registry-id"),u=c!=null?String(c):"",m=this.registryData.find(f=>f.id!=null&&String(f.id)===u||f.permitId!=null&&String(f.permitId)===u);if(!m){l.style.display="none";return}e&&(this._registryEntryMatchesSearch(m,e)||t&&d.includes(t)||(p=!1)),a&&m.status!==a&&(p=!1);const h=m.timeFrom||m.openDate;if(i){const f=h?new Date(h):null,w=f&&!isNaN(f.getTime())?f.toISOString().split("T")[0]:"";(!w||w<i)&&(p=!1)}if(r){const f=h?new Date(h):null,w=f&&!isNaN(f.getTime())?f.toISOString().split("T")[0]:"";(!w||w>r)&&(p=!1)}l.style.display=p?"":"none",p&&(o+=1)});const n=document.getElementById("registry-filter-count");n&&(n.textContent=String(o))},toggleManualPermitFormFullscreen(e){const t=e&&e.closest?e.closest(".ptw-manual-permit-modal"):null;if(!t)return;const a=t.classList.toggle("ptw-manual-permit-modal-fullscreen"),i=e.querySelector("i"),r=e.querySelector(".ptw-manual-permit-fullscreen-label");i&&(i.className=a?"fas fa-compress":"fas fa-expand"),r&&(r.textContent=a?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),e.setAttribute("title",a?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")},_normEquipmentItemKey(e){return String(e||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").toLowerCase()},getManualFixedEquipmentRowLabels(){return[["\u0631\u0627\u0641\u0639\u0629","\u0633\u0644\u0645 \u0645\u062A\u062D\u0631\u0643","\u0633\u0642\u0627\u0644\u0629","\u0645\u0646\u0635\u0629 \u0631\u0641\u0639","\u0648\u0646\u0634","\u0645\u0636\u062E\u0629","\u062E\u0632\u0627\u0646","\u062E\u0637 \u0623\u0646\u0627\u0628\u064A\u0628","\u0644\u0648\u062D\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"],["\u0645\u0648\u0644\u062F \u0643\u0647\u0631\u0628\u0627\u0621","\u0636\u0627\u063A\u0637 \u0647\u0648\u0627\u0621","\u0645\u0627\u0643\u064A\u0646\u0629 \u0644\u062D\u0627\u0645","\u062C\u0644\u0627\u062E\u0629","\u0645\u0646\u0634\u0627\u0631","\u0645\u062B\u0642\u0627\u0628 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0645\u062D\u0631\u0643 \u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","\u0639\u062F\u0629 \u064A\u062F\u0648\u064A\u0629 \u062E\u0641\u064A\u0641\u0629","\u0623\u062E\u0631\u0649"]]},getManualFixedEquipmentLabels(){return this.getManualFixedEquipmentRowLabels().flat()},_isFixedEquipmentLabel(e){const t=this._normEquipmentItemKey(e);return this.getManualFixedEquipmentLabels().some(a=>this._normEquipmentItemKey(a)===t)},_splitEquipmentTokens(e){return String(e||"").split(/[-+،,]/).map(t=>t.trim().replace(/^[\d\s]+/,"")).filter(Boolean)},_collectEquipmentEntriesForLookup(e=null){const t=new Set,a=[],i=String(e||"").trim(),r=s=>{if(!s)return;const o=String(s.id||s.permitId||"").trim();if(i&&o&&o===i)return;const n=o||`seq:${s.sequentialNumber||""}:${s.paperPermitNo||s.permitNumber||""}`;n&&t.has(n)||(n&&t.add(n),a.push(s))};return(Array.isArray(this.registryData)?this.registryData:[]).forEach(r),(Array.isArray(AppState?.appData?.ptw)?AppState.appData.ptw:[]).forEach(r),a.sort((s,o)=>this._getManualPermitEntryTimestamp(o)-this._getManualPermitEntryTimestamp(s))},buildKnownEquipmentHistoryLabels(e=null,t=20){const a=new Set(this.getManualFixedEquipmentLabels().map(s=>this._normEquipmentItemKey(s))),i=new Set,r=[];return this._collectEquipmentEntriesForLookup(e).forEach(s=>{this._splitEquipmentTokens(s.equipment).forEach(o=>{const n=this._normEquipmentItemKey(o);!n||a.has(n)||i.has(n)||(i.add(n),r.push(o))})}),r.sort((s,o)=>s.localeCompare(o,"ar")),r.slice(0,t)},parseEquipmentToSelection(e,t=[]){const i=this.getManualFixedEquipmentRowLabels().flat(),r=Array.isArray(t)?t:[],s=new Map;[...i,...r].forEach(p=>{const d=this._normEquipmentItemKey(p);d&&!s.has(d)&&s.set(d,p)});const o=[],n=[],l=new Set;return this._splitEquipmentTokens(e).forEach(p=>{const d=this._normEquipmentItemKey(p);if(s.has(d)){const c=s.get(d);l.has(d)||(l.add(d),o.push(c))}else n.push(p)}),{matrixSelected:o,manualNotes:n.join("\u060C ")}},_equipmentSelectionIsChecked(e,t){const a=new Set((t||[]).map(s=>String(s||"").trim()).filter(Boolean)),i=String(e||"").trim();if(a.has(i))return!0;const r=this._normEquipmentItemKey(i);for(const s of a)if(this._normEquipmentItemKey(s)===r)return!0;return!1},buildManualFixedEquipmentCheckboxesHtml(e=[],t=[]){const a=Utils.escapeHTML,i=n=>this._equipmentSelectionIsChecked(n,e),r=this.getManualFixedEquipmentRowLabels(),s=(Array.isArray(t)?t:[]).filter(Boolean);let o='<div class="ptw-manual-equipment-fixed-wrap">';return r.forEach(n=>{o+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-grid-row">',n.forEach(l=>{const p=i(l)?" checked":"";o+=`<label class="ptw-manual-equipment-cell"><input type="checkbox" class="equipment-fixed-cb" value="${a(l)}"${p}><span class="ptw-manual-equipment-label">${a(l)}</span></label>`}),o+="</div>"}),s.length&&(o+='<div class="ptw-manual-equipment-chips-row ptw-manual-equipment-history-row">',s.forEach(n=>{const l=i(n)?" checked":"";o+=`<label class="ptw-manual-equipment-cell ptw-manual-equipment-history-cell"><input type="checkbox" class="equipment-history-cb" value="${a(n)}"${l}><span class="ptw-manual-equipment-label">${a(n)}</span></label>`}),o+="</div>"),o+="</div>",o},buildManualFixedEquipmentPrintHtml(e=[]){const t=o=>Utils.escapeHTML(o),a=o=>this._equipmentSelectionIsChecked(o,e),i=this.getManualFixedEquipmentRowLabels(),r=(e||[]).filter(o=>{const n=String(o||"").trim();return n&&!this._isFixedEquipmentLabel(n)});let s='<div class="ptw-manual-equipment-print-matrix"><div class="ptw-manual-equipment-fixed-wrap">';return i.forEach((o,n)=>{const l=n===i.length-1?"ptw-manual-equipment-fixed-row equipment-row-last":"ptw-manual-equipment-fixed-row";s+=`<div class="${l}">`,o.forEach(p=>{const d=a(p);s+=`<span class="ptw-manual-equipment-cell${d?" equipment-selected":""}"><span class="equipment-checkbox${d?" checked":""}" aria-hidden="true"></span><span class="equipment-label">${t(p)}</span></span>`}),s+="</div>"}),r.length&&(s+='<div class="ptw-manual-equipment-fixed-row ptw-manual-equipment-history-row equipment-row-last">',r.forEach(o=>{s+=`<span class="ptw-manual-equipment-cell equipment-selected ptw-manual-equipment-history-cell"><span class="equipment-checkbox checked" aria-hidden="true"></span><span class="equipment-label">${t(o)}</span></span>`}),s+="</div>"),s+="</div></div>",s},collectEquipmentFieldValue(e,t={}){const a=e?.querySelector?e:document,i=t.matrixId||"#manual-equipment-matrix",r=t.notesId||"#manual-equipment-notes",s=a.querySelector(i),o=a.querySelector(r),n=Array.from(s?.querySelectorAll(".equipment-fixed-cb:checked")||[]).map(c=>String(c.value||"").trim()).filter(Boolean),l=Array.from(s?.querySelectorAll(".equipment-history-cb:checked")||[]).map(c=>String(c.value||"").trim()).filter(Boolean),p=String(o?.value||"").trim(),d=p?this._splitEquipmentTokens(p):[];return[...new Set([...n,...l,...d])].join("\u060C ")},setupManualEquipmentToolsSync(e){if(!e)return;const t=e.querySelector("#manual-permit-tools"),a=e.querySelector("#manual-equipment-matrix"),i=e.querySelector("#manual-equipment-notes");if(!t||!a)return;const r=()=>{const s=this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),o=String(t.value||"").trim(),n=String(a.dataset.autoToolsValue||"").trim();(!o||o===n)&&(t.value=s,a.dataset.autoToolsValue=s)};r(),a.addEventListener("change",r),i?.addEventListener("input",r)},buildManualFixedPPECheckboxesHtml(e=[]){const t=Utils.escapeHTML,a=new Set((e||[]).map(n=>String(n||"").trim()).filter(Boolean)),i=n=>String(n||"").trim().replace(/\s+/g," ").replace(/[أإآٱ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A"),r=n=>{const l=String(n).trim();if(a.has(l))return!0;const p=i(l);for(const d of a)if(i(d)===p)return!0;return!1},s=[["\u062D\u0630\u0627\u0621 \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u064A \u0633\u0644\u0627\u0645\u0629","\u062C\u0648\u0627\u0646\u062A\u0649 \u0627\u062D\u0645\u0627\u0636","\u062C\u0648\u0627\u0646\u062A\u064A \u0643\u0647\u0631\u0628\u064A","\u0643\u0645\u0627\u0645\u0629","\u0633\u062F\u0627\u062F\u0629 \u0623\u0630\u0646","\u0643\u0627\u062A\u0645 \u0623\u0630\u0646","\u0628\u062F\u0644\u0629 \u0643\u064A\u0645\u0627\u0626\u064A\u0629","\u0643\u0634\u0627\u0641 \u0625\u0646\u0627\u0631\u0629"],["\u0648\u0627\u0642\u064A \u0631\u0623\u0633","\u0646\u0638\u0627\u0631\u0629 \u0648\u0627\u0642\u064A\u0629","\u0648\u062C\u0647 \u0644\u062D\u0627\u0645","\u0623\u0630\u0631\u0639 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u062D\u0628\u0644 \u0633\u0644\u0627\u0645\u0629","\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0634\u0631\u064A\u0637 \u0639\u0627\u0643\u0633"],["\u062D\u0648\u0627\u062C\u0632","\u0623\u0642\u0645\u0627\u0639 \u0645\u0631\u0648\u0631","\u0648\u0633\u0627\u0626\u0644 \u0627\u062A\u0635\u0627\u0644","\u0628\u0637\u0627\u0646\u064A\u0629 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"]];let o='<div class="ptw-manual-ppe-fixed-wrap">';return s.forEach(n=>{o+='<div class="ptw-manual-ppe-fixed-row">',n.forEach(l=>{const p=r(l)?" checked":"";o+=`<label class="ptw-manual-ppe-cell"><input type="checkbox" class="manual-ppe-fixed-cb" value="${t(l)}"${p}><span>${t(l)}</span></label>`}),o+="</div>"}),o+="</div>",o},async openManualPermitForm(e=null){const t=e!==null,a=e?this.registryData.find(g=>g.id===e):null;if(a&&(!a.teamMembers||!a.teamMembers.length)&&a.teamMembersText){const g=String(a.teamMembersText).trim();a.teamMembers=g.split(/[،,]/).map(E=>{E=E.trim();const q=E.match(/^(.+?)\s*\(([^)]*)\)\s*$/);return q?{name:q[1].trim(),signature:q[2].trim()}:{name:E,signature:""}}).filter(E=>E.name||E.signature)}a&&(!a.teamMembers||!a.teamMembers.length)&&(a.teamMembers=[{name:"",signature:""}]),["hotWorkDetails","confinedSpaceDetails","heightWorkDetails"].forEach(g=>{a&&a[g]!=null&&typeof a[g]=="string"&&(a[g]=a[g].split(/[،,]/).map(E=>E.trim()).filter(Boolean))});const i=this.getSiteOptions(),r=["\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629","\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629","\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629","\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A","\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],s=["\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"],n=String(a?.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",l=a?.sequentialNumber||this.generateRegistrySequentialNumber(),p=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(g=>({name:(g.name||"").trim()})).filter(g=>g.name):[],d=p.length>0,c=a?.authorizedParty||"",u=this.getDepartmentOptionsForPTW(),m=u.length>0,h=a?.requestingParty||"",f=a?.requiredPPE&&Array.isArray(a.requiredPPE)&&a.requiredPPE.length?a.requiredPPE.map(g=>String(g||"").trim()).filter(Boolean):a?.ppeNotes?String(a.ppeNotes).split(/[،,]/).map(g=>g.trim()).filter(Boolean):[],w=a?.id||a?.permitId||null,x=this.buildKnownEquipmentHistoryLabels(w),A=this.parseEquipmentToSelection(a?.equipment,x),v=this.buildManualFixedEquipmentCheckboxesHtml(A.matrixSelected,x),U=typeof Training<"u"&&typeof Training.getSafetyTeamMembers=="function"?Training.getSafetyTeamMembers({excludeSystemUsers:!0}):[],W=(g,E)=>{const q=Utils.escapeHTML,K=String(E||"").trim(),J=U.map(z=>String(z.name||"").trim()).filter(Boolean);let Z=`<option value="">${q(g)}</option>`;return J.forEach(z=>{Z+=`<option value="${q(z)}"${K===z?" selected":""}>${q(z)}</option>`}),K&&!J.includes(K)&&(Z+=`<option value="${q(K)}" selected>${q(K)}</option>`),Z},_=`class="form-input" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px; width: 100%;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'"`,D=this._manualEntryToPtwStub(a);let M=[],R=[];try{[M,R]=await Promise.all([this._fetchIaCandidatesForRole(D,"areaManager"),this._fetchIaCandidatesForRole(D,"maintenanceEngineer")])}catch(g){typeof Utils<"u"&&Utils.safeWarn("openManualPermitForm IA fetch:",g)}const F=g=>{const E=(a?.manualApprovals||[]).find(q=>q.role===g)||{};return{name:E.name||"",approverId:E.approverId||"",personType:E.personType||""}},k=F("\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644"),S=F("\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629"),I=(a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")||{},B=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:M,selectedId:k.approverId,selectedName:k.name}),O=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",roleKey:"maintenanceEngineer",candidates:R,selectedId:S.approverId,selectedName:S.name}),V=this._renderIaRolePickerHTML({roleLabel:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",roleKey:"areaManager",candidates:M,selectedId:I.approverId||"",selectedName:I.name||"",isClosure:!0,inputClass:"form-input text-sm w-full manual-closure-approval-name"}),te=a?.id||a?.permitId||null,b=this.buildKnownTeamMembersIndex(te),$=this.buildKnownManualApprovalsIndex(te),j=this.buildManualPermitDatalistHtml(this.getKnownTeamMemberNames(b)),C=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole($,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")),y=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole($,"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")),G=this.buildManualPermitDatalistHtml(this.getKnownApproverNamesForRole($,"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")),P=document.createElement("div");P.className="modal-overlay",P.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;",P.innerHTML=`
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
                                ${t?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u064A\u062F\u0648\u064A"} \u2013 Manual Permit Entry
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
                                    <span id="manual-permit-display-number" style="font-size: 1.5rem; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${String(l).padStart(4,"0")}</span>
                                </div>
                            </div>
                            <!-- \u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A -->
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                                <label for="manual-paper-permit-number" style="font-size: 0.8rem; font-weight: 600; color: #1e3a5f;">
                                    \u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A <span style="color: #e53e3e; font-size: 0.9rem;">*</span>
                                </label>
                                <input type="number" id="manual-paper-permit-number" min="1" step="1" placeholder="\u0645\u0637\u0644\u0648\u0628 - \u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0642\u0645"
                                    value="${Utils.escapeHTML(a?.paperPermitNumber??"")}"
                                    style="width: 150px; text-align: center; font-size: 1.1rem; font-weight: 600; font-family: 'Courier New', monospace; padding: 8px 12px; border: 2px solid ${a?.paperPermitNumber?"#90caf9":"#e53e3e"}; border-radius: 8px; background: #fff; box-shadow: ${a?.paperPermitNumber?"none":"0 0 0 3px rgba(229,62,62,0.1)"};">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- \u0627\u0644\u062A\u062B\u0628\u064A\u062A \u064A\u0628\u062F\u0623 \u0645\u0646 \u0623\u0633\u0641\u0644 \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 (\u0628\u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062A\u0635\u0645\u064A\u0645) -->
                <div class="ptw-manual-permit-sticky-start">
                <div class="modal-body" id="manual-permit-modal-body" style="padding: 24px; padding-top: 0; max-height: calc(95vh - 280px); overflow-y: scroll; background: #f8fafc; direction: ltr;">
                    <form id="manual-permit-form" style="direction: rtl;">
                        <datalist id="manual-team-member-names-datalist">${j}</datalist>
                        <datalist id="manual-approval-datalist-requestingParty">${C}</datalist>
                        <datalist id="manual-approval-datalist-areaManager">${y}</datalist>
                        <datalist id="manual-approval-datalist-maintenanceEngineer">${G}</datalist>
                        
                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="ptw-manual-form-section manual-section-1" style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">
                            <h3><i class="fas fa-info-circle"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 : \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span></h3>
                            <div class="ptw-s1-layout">
                                <div class="ptw-s1-row ptw-s1-meta-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645 <span class="text-red-500">*</span></label>
                                    <select id="manual-permit-location" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645</option>
                                        ${i.map(g=>{let E=a&&(a.locationId===g.id||a.location&&(a.location.split(" - ")[0]===g.name||a.location===g.name));return`<option value="${Utils.escapeHTML(g.id)}" data-site-name="${Utils.escapeHTML(g.name)}" ${E?"selected":""}>${Utils.escapeHTML(g.name)}</option>`}).join("")}
                                    </select>
                                </div>
                                <div id="manual-permit-sublocation-wrapper" style="display: ${a?.locationId||a?.location?"block":"none"};">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="manual-permit-sublocation" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                    </select>
                                    <input type="hidden" id="manual-permit-location-entries" value="${Utils.escapeHTML(JSON.stringify(a?.locationEntries||[]))}">
                                    <div id="manual-selected-sublocations-container" style="display: none; margin-top: 10px;">
                                        <input type="text" id="manual-selected-sublocations-display" class="form-input transition-all focus:ring-2 focus:ring-blue-200" readonly placeholder="\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0645\u062E\u062A\u0627\u0631\u0629">
                                        <div id="manual-selected-sublocations-list" class="flex flex-wrap gap-2 mt-2"></div>
                                        <div class="text-xs text-gray-500 mt-2">\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 3 \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0643\u062D\u062F \u0623\u0642\u0635\u0649</div>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="manual-permit-time-from" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required
                                        value="${a?.timeFrom&&a.timeFrom!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.toDateTimeLocalString(a.timeFrom):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 <span class="text-red-500">*</span></label>
                                    <input type="datetime-local" id="manual-permit-time-to" class="form-input transition-all focus:ring-2 focus:ring-blue-200" required
                                        value="${a?.timeTo&&a.timeTo!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?Utils.toDateTimeLocalString(a.timeTo):""}">
                                </div>
                                </div>
                                <div class="ptw-s1-row ptw-s1-parties-grid">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644</label>
                                    <div class="relative">
                                        <input type="text" id="manual-permit-authorized-party" class="form-input transition-all focus:ring-2 focus:ring-blue-200 w-full"
                                            ${d?'list="manual-authorized-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(c)}"
                                            placeholder="${d?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644"}">
                                        ${d?`
                                        <datalist id="manual-authorized-party-datalist">
                                            ${p.map(g=>`<option value="${Utils.escapeHTML(g.name||"")}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    <div class="relative">
                                        <input type="text" id="manual-permit-requesting-party" class="form-input transition-all focus:ring-2 focus:ring-blue-200 w-full"
                                            ${m?'list="manual-requesting-party-datalist" autocomplete="off"':""}
                                            value="${Utils.escapeHTML(h)}"
                                            placeholder="${m?"\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)"}">
                                        ${m?`
                                        <datalist id="manual-requesting-party-datalist">
                                            ${u.map(g=>`<option value="${Utils.escapeHTML(g)}"></option>`).join("")}
                                        </datalist>`:""}
                                    </div>
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment manual-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="manual-equipment-matrix" class="ptw-manual-equipment-body">
                                        ${v}
                                    </div>
                                    <div class="ptw-manual-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="manual-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${Utils.escapeHTML(A.manualNotes||"")}</textarea>
                                    </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-tools">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</label>
                                    <textarea id="manual-permit-tools" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F">${Utils.escapeHTML(a?.tools||a?.toolsList||"")}</textarea>
                                </div>
                                <div class="ptw-s1-block ptw-s1-work-desc">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 <span class="text-red-500">*</span></label>
                                    <textarea id="manual-permit-work-description" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="3" required placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0639\u0645\u0644">${Utils.escapeHTML(a?.workDescription||"")}</textarea>
                                </div>
                            </div>
                            <input type="hidden" id="manual-permit-sequential" value="${l}">
                            <input type="hidden" id="manual-permit-date" value="${a?.openDate?new Date(a.openDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                            <input type="hidden" id="manual-permit-total-time" value="${Utils.escapeHTML(a?.totalTime||"")}">
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
                                        ${(a?.teamMembers&&a.teamMembers.length?a.teamMembers:[{name:"",signature:""}]).map(E=>`
                                        <tr class="manual-team-member-row">
                                            <td class="p-2 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-team-member-name border-0 focus:ring-0" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML(E.name||"")}"></td>
                                            <td class="p-2 border border-gray-800" style="border-right: 4px solid #1e3a8a;"><input type="text" class="form-input text-sm w-full manual-team-member-signature border-0 focus:ring-0" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML(E.signature||E.id||"")}"></td>
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
                                                <label class="manual-opt-row" style="background: #fef2f2; border-color: #fecaca;"><input type="checkbox" name="manual-hot-work" value="${g}" class="form-checkbox text-red-600" ${(a?.hotWorkDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-hot-work-other" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.hotWorkOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-confined" class="manual-type-panel-body" style="display: none;">
                                                ${["\u062E\u0632\u0627\u0646\u0627\u062A","\u0623\u0646\u0627\u0628\u064A\u0628","\u0645\u062C\u0627\u0631\u064A","\u0623\u062E\u0631\u0649"].map(g=>`
                                                <label class="manual-opt-row" style="background: #f9fafb; border-color: #e5e7eb;"><input type="checkbox" name="manual-confined-space" value="${g}" class="form-checkbox text-gray-600" ${(a?.confinedSpaceDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-confined-space-other" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.confinedSpaceOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-height" class="manual-type-panel-body" style="display: none;">
                                                ${["\u0633\u0642\u0627\u0644\u0627\u062A","\u0633\u0637\u062D","\u0633\u0644\u0629 \u0631\u0627\u0641\u0639\u0629","\u0623\u062E\u0631\u0649"].map(g=>`
                                                <label class="manual-opt-row" style="background: #eff6ff; border-color: #bfdbfe;"><input type="checkbox" name="manual-height-work" value="${g}" class="form-checkbox text-blue-600" ${(a?.heightWorkDetails||[]).includes(g)?"checked":""}><span>${g}</span></label>`).join("")}
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-height-work-other" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.heightWorkOther||"")}" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-excavation" class="manual-type-panel-body" style="display: none;">
                                                <label class="manual-opt-row" style="background: #fffbeb; border-color: #fef3c7;"><input type="checkbox" id="manual-excavation-check" class="form-checkbox text-yellow-600" ${a?.excavationLength||a?.excavationWidth||a?.excavationDepth||a?.soilType?"checked":""}><span>\u062A\u0637\u0628\u064A\u0642 \u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631</span></label>
                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;">
                                                    <div><label class="manual-other-label">\u0637\u0648\u0644</label><input type="text" id="manual-excavation-length" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.excavationLength||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0639\u0631\u0636</label><input type="text" id="manual-excavation-width" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.excavationWidth||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0639\u0645\u0642</label><input type="text" id="manual-excavation-depth" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.excavationDepth||"")}" placeholder="\u2014"></div>
                                                    <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</label><input type="text" id="manual-excavation-soil" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.soilType||"")}" placeholder="\u2014"></div>
                                                </div>
                                                <div style="margin-top: 12px;"><label class="manual-other-label">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</label><input type="text" id="manual-excavation-other" class="form-input manual-other-input" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"></div>
                                            </div>
                                            <div id="manual-panel-electrical" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-electrical-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.electricalWorkType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0631\u0643\u064A\u0628\u060C \u0635\u064A\u0627\u0646\u0629\u060C \u0641\u0643\u060C \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-cold" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-cold-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.coldWorkType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0644\u062D\u0627\u0645 \u0628\u0627\u0631\u062F\u060C \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u062D\u0631"></div>
                                            </div>
                                            <div id="manual-panel-other" class="manual-type-panel-body" style="display: none;">
                                                <div><label class="manual-other-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)</label><input type="text" id="manual-other-work-type" class="form-input manual-other-input" value="${Utils.escapeHTML(a?.otherWorkType||"")}" placeholder="\u0627\u0630\u0643\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644"></div>
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
                                    <input type="checkbox" id="manual-permit-preStartChecklist" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.preStartChecklist?"checked":""}><span class="font-medium">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0628\u0642\u0631\u0627\u0631 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-lotoApplied" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.lotoApplied?"checked":""}><span class="font-medium">\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u0632\u0644 LOTO</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-governmentPermits" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.governmentPermits?"checked":""}><span class="font-medium">\u062A\u0635\u0627\u0631\u064A\u062D \u062C\u0647\u0627\u062A \u062D\u0643\u0648\u0645\u064A\u0629</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-riskAssessmentAttached" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.riskAssessmentAttached?"checked":""}><span class="font-medium">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-gasTesting" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.gasTesting?"checked":""}><span class="font-medium">\u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0627\u0632\u0627\u062A</span>
                                </label>
                                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all bg-white">
                                    <input type="checkbox" id="manual-permit-mocRequest" class="form-checkbox h-5 w-5 text-orange-600 rounded ml-3" ${a?.mocRequest?"checked":""}><span class="font-medium">\u0637\u0644\u0628 \u062A\u063A\u064A\u064A\u0631 \u0641\u0646\u064A (MOC)</span>
                                </label>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633: \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 -->
                        <div class="ptw-manual-form-section manual-section-5 ptw-manual-ppe-section">
                            <h3><i class="fas fa-hard-hat"></i><span>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062E\u0627\u0645\u0633 : \u062A\u062D\u062F\u064A\u062F \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 / \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0623\u062E\u0631\u0649</span></h3>
                            <div class="ptw-manual-ppe-body">
                                <div id="manual-ppe-matrix">
                                    ${this.buildManualFixedPPECheckboxesHtml(f)}
                                </div>
                                <div class="ptw-manual-ppe-notes-frame">
                                    <label class="block">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0625\u0636\u0627\u0641\u064A \u064A\u062F\u0648\u064A)</label>
                                    <textarea id="manual-ppe-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0625\u0636\u0627\u0641\u0627\u062A \u0646\u0635\u064A\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629...">${Utils.escapeHTML(a?.ppeNotes||(a?.requiredPPE?a.requiredPPE.join("\u060C "):""))}</textarea>
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
                                                ${[1,2,3,4,5].map(q=>{const K=g*q;let J="",Z="",z="",se="";return K<=4?(J="#22c55e",Z="#ffffff",z="#16a34a",se="\u0645\u0646\u062E\u0641\u0636"):K<=9?(J="#eab308",Z="#1c1917",z="#ca8a04",se="\u0645\u062A\u0648\u0633\u0637"):K<=16?(J="#f97316",Z="#ffffff",z="#ea580c",se="\u0645\u0631\u062A\u0641\u0639"):(J="#dc2626",Z="#ffffff",z="#b91c1c",se="\u062D\u0631\u062C"),`<td class="p-0 border border-gray-400">
                                                    <button type="button" class="manual-risk-cell w-full h-full p-3 font-bold cursor-pointer transition-all border-0 ${a?.riskLikelihood==g&&a?.riskConsequence==q?"ring-4 ring-blue-600 ring-inset":""}" data-likelihood="${g}" data-consequence="${q}" data-score="${K}" data-level="${se}" data-bg="${J}" data-text="${Z}" data-hover="${z}" style="background: ${J}; color: ${Z};">
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
                                <div id="manual-risk-result" class="mt-4 p-4 rounded-lg border-2 ${a?.riskScore?"":"hidden"}" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
                                    <div class="flex items-center justify-between flex-wrap gap-4">
                                        <div class="flex items-center gap-3">
                                            <div id="manual-risk-result-badge" class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg" style="background: ${a?.riskScore<=4?"#22c55e":a?.riskScore<=9?"#eab308":a?.riskScore<=16?"#f97316":"#dc2626"}; color: ${a?.riskScore>4&&a?.riskScore<=9?"#1c1917":"#ffffff"};">
                                                ${a?.riskScore||"?"}
                                            </div>
                                            <div>
                                                <p class="font-bold text-gray-800 text-lg">\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631: <span id="manual-risk-score-display">${a?.riskScore||"\u2014"}</span></p>
                                                <p class="text-gray-600">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631: <span id="manual-risk-level-display" class="font-semibold">${a?.riskLevel||"\u2014"}</span></p>
                                            </div>
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            <p>\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629: <span id="manual-risk-likelihood-display" class="font-semibold">${a?.riskLikelihood||"\u2014"}</span></p>
                                            <p>\u0627\u0644\u062E\u0637\u0648\u0631\u0629: <span id="manual-risk-consequence-display" class="font-semibold">${a?.riskConsequence||"\u2014"}</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 -->
                                <input type="hidden" id="manual-risk-likelihood" value="${a?.riskLikelihood||""}">
                                <input type="hidden" id="manual-risk-consequence" value="${a?.riskConsequence||""}">
                                <input type="hidden" id="manual-risk-score" value="${a?.riskScore||""}">
                                <input type="hidden" id="manual-risk-level" value="${a?.riskLevel||""}">
                            </div>
                            
                            <div class="mt-4 bg-red-50 p-4 rounded-lg border border-red-100">
                                <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-sticky-note ml-2 text-red-500"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</label>
                                <textarea id="manual-risk-notes" class="form-input bg-white" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629...">${Utils.escapeHTML(a?.riskNotes||"")}</textarea>
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
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-name" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((a?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${B}</td>
                                            <td class="p-1 border border-gray-800">${O}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${W("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(a?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr class="manual-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-approval-sig" data-role="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualApprovals||[]).find(g=>g.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
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
                                ${s.map((g,E)=>{const K={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{icon:"fa-check-circle",color:"#10b981",hoverBg:"#f0fdf4",border:"#10b981",class:"btn-completed",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{icon:"fa-pause-circle",color:"#f59e0b",hoverBg:"#fffbeb",border:"#f59e0b",class:"btn-incomplete",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{icon:"fa-exclamation-circle",color:"#ef4444",hoverBg:"#fef2f2",border:"#ef4444",class:"btn-forced",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[g],J=n===g;return`<label class="manual-status-btn ${K.class} ${J?"selected":""}" style="${J?`background: ${K.gradient} !important; border-color: ${K.color} !important; color: #ffffff !important; box-shadow: 0 8px 20px -4px ${K.shadow} !important;`:""}">
                                    <input type="radio" name="manual-permit-status-radio" value="${Utils.escapeHTML(g)}" class="form-radio h-5 w-5 hidden" ${J?"checked":""} onchange="PTW.updateManualStatusBtnSelection(this);">
                                    <i class="fas ${K.icon}" style="${J?"color: #ffffff !important;":`color: ${K.color};`}"></i>
                                    <span class="font-bold">${Utils.escapeHTML(g)}</span>
                                </label>`}).join("")}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label><input type="datetime-local" id="manual-closure-time" class="form-input" value="${a?.closureDate?Utils.toDateTimeLocalString(a.closureDate):""}"></div>
                                <div><label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label><input type="text" id="manual-closure-reason" class="form-input" value="${Utils.escapeHTML(a?.closureReason||"")}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"></div>
                            </div>
                            <input type="hidden" id="manual-permit-status" value="${Utils.escapeHTML(n)}">
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
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" list="manual-approval-datalist-requestingParty" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.name||"")}"></td>
                                            <td class="p-1 border border-gray-800">${V}</td>
                                            <td class="p-1 border border-gray-800">
                                                <select class="form-input text-sm w-full manual-closure-approval-name border-0 focus:ring-0" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" style="background: transparent; padding: 4px 6px;">
                                                    ${W("\u0627\u062E\u062A\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",(a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}
                                                </select>
                                            </td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-name" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u0627\u0633\u0645" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.name||"")}"></td>
                                        </tr>
                                        <tr class="manual-closure-approval-row" style="border: 1px solid #000;">
                                            <td class="p-1 border border-gray-800 text-center bg-gray-50 font-medium text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
                                            <td class="p-1 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-closure-approval-sig" data-role="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value="${Utils.escapeHTML((a?.manualClosureApprovals||[]).find(g=>g.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")?.signature||"")}"></td>
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
                                        ${W("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0648\u0644",a?.supervisor1)}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2"><i class="fas fa-user-tie ml-2 text-indigo-600"></i>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A</label>
                                    <select id="manual-permit-supervisor2" ${_}>
                                        ${W("\u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A",a?.supervisor2)}
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
                        <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                    </button>
                </div>
                </div>
            </div>
        `,document.body.appendChild(P);const H=()=>P.remove();P.querySelector(".modal-close")?.addEventListener("click",H),P.querySelector('[data-action="close"]')?.addEventListener("click",H),P.addEventListener("click",g=>{g.target===P&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&H()});const Y=P.querySelector("#manual-paper-permit-number");Y&&Y.addEventListener("input",()=>{Y.style.border="2px solid #90caf9",Y.style.boxShadow="none"});const ne=P.querySelector("#manual-permit-time-from"),ie=P.querySelector("#manual-permit-time-to"),ee=P.querySelector("#manual-permit-total-time"),de=()=>{const g=ne.value,E=ie.value;if(!g||!E){ee.value="";return}ee.value=this.calculateTotalTime(g,E)};ne?.addEventListener("change",de),ie?.addEventListener("change",de),a?.timeFrom&&a?.timeTo&&de();const Q=P.querySelector("#manual-permit-location"),oe=P.querySelector("#manual-permit-sublocation-wrapper"),ae=P.querySelector("#manual-permit-sublocation"),we=P.querySelector("#manual-permit-location-entries"),ye=P.querySelector("#manual-selected-sublocations-container"),N=P.querySelector("#manual-selected-sublocations-display"),ce=P.querySelector("#manual-selected-sublocations-list"),be=3,le=[],xe=g=>({locationId:String(g?.locationId||"").trim(),location:String(g?.location||"").trim(),sublocationId:String(g?.sublocationId||"").trim(),sublocation:String(g?.sublocation||"").trim()}),ge=()=>{we&&(we.value=JSON.stringify(le))},he=()=>{if(!ye||!N||!ce)return;const g=le.map(q=>q.sublocation||q.location).filter(Boolean),E=g.length>0;ye.style.display=E?"block":"none",N.value=E?g.join("\u060C "):"",ce.innerHTML=le.map((q,K)=>`
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                    ${Utils.escapeHTML(q.sublocation||q.location)}
                    <button type="button" class="manual-remove-sublocation-btn text-blue-700 hover:text-red-600" data-index="${K}" style="background:none;border:none;cursor:pointer;font-size:14px;line-height:1;">\xD7</button>
                </span>
            `).join(""),ce.querySelectorAll(".manual-remove-sublocation-btn").forEach(q=>{q.addEventListener("click",()=>{const K=Number(q.getAttribute("data-index"));Number.isInteger(K)&&K>=0&&(le.splice(K,1),ge(),he())})})},ke=g=>{if(!ae||!oe)return;if(!g){oe.style.display="none",ae.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}const E=this.getPlaceOptions(g);if(!Array.isArray(E)||E.length===0){oe.style.display="none",ae.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}oe.style.display="block",ae.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+E.map(q=>`
                <option value="${Utils.escapeHTML(q.id)}" data-place-name="${Utils.escapeHTML(q.name)}">${Utils.escapeHTML(q.name)}</option>
            `).join(""),ae.value=""},Pe=()=>{if(!Q||!ae)return;const g=String(Q.value||"").trim(),E=Q.options[Q.selectedIndex]?.getAttribute("data-site-name")||Q.options[Q.selectedIndex]?.textContent||"",q=String(ae.value||"").trim(),K=ae.options[ae.selectedIndex],J=K?.getAttribute("data-place-name")||(K?.value?K.textContent:"")||"";if(!g||!E||!q||!J)return;if(le.some(z=>z.locationId===g&&z.sublocationId===q)){Notification.warning(this._t("module.ptw.notify.sublocDup","\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A \u0628\u0627\u0644\u0641\u0639\u0644")),ae.value="";return}if(le.length>=be){Notification.warning(this._t("module.ptw.notify.sublocMax3","\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 3 \u0623\u0645\u0627\u0643\u0646 \u0641\u0631\u0639\u064A\u0629 \u0641\u0642\u0637 \u0643\u062D\u062F \u0623\u0642\u0635\u0649")),ae.value="";return}le.push(xe({locationId:g,location:E.trim(),sublocationId:q,sublocation:J.trim()})),ge(),he(),ae.value=""},$e=()=>{let g=[];if(we?.value)try{const E=JSON.parse(we.value);Array.isArray(E)&&(g=E)}catch{g=[]}if((!g||g.length===0)&&(a?.location||a?.sublocation)){const E=String(a?.locationId||Q?.value||"").trim(),q=String(Q?.options[Q?.selectedIndex]?.getAttribute("data-site-name")||"").trim(),K=String(a?.location||"").split("|").map(z=>z.trim()).filter(Boolean),J=String(a?.sublocationId||"").split("|").map(z=>z.trim()).filter(Boolean),Z=String(a?.sublocation||"").split("|").map(z=>z.trim()).filter(Boolean);Z.length>0?g=Z.map((z,se)=>({locationId:E,location:q||K[0]?.split(" - ")[0]||a?.location||"",sublocationId:J[se]||"",sublocation:z})):g=K.map((z,se)=>{const fe=z.indexOf(" - ");return fe===-1?{locationId:E,location:z,sublocationId:J[se]||"",sublocation:""}:{locationId:E,location:z.slice(0,fe).trim(),sublocationId:J[se]||"",sublocation:z.slice(fe+3).trim()}})}g.map(xe).filter(E=>E.location&&E.sublocation).slice(0,be).forEach(E=>le.push(E)),ge(),he()};Q?.addEventListener("change",()=>{le.length=0,ge(),he(),ke(Q.value)}),ae?.addEventListener("change",Pe),ke(Q?.value),$e(),this.setupManualEquipmentToolsSync(P);const T=(g,E)=>{if(!g||!E)return;const q=()=>{const K=String(g.value||"").trim(),J=String(E.value||"").trim(),Z=g.dataset.autoCopiedValue||"";g.dataset.knownLoaded!=="1"&&(!J||J===Z)&&(E.value=K,g.dataset.autoCopiedValue=K)};q(),g.addEventListener("input",q)},X=(g,E,q)=>{const K=P.querySelector(g);if(!K)return;const J=new Set(["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"]),Z=z=>{const se=z?.dataset.role;if(!se)return;const fe=K.querySelector(`${q}[data-role="${se}"]`);T(z,fe)};K.querySelectorAll(E).forEach(z=>{if(z.matches(".ia-approval-select")||z.tagName==="SELECT"){Z(z);return}J.has(z.dataset?.role)||Z(z)}),K.addEventListener("input",z=>{const se=z.target?.dataset?.role;z.target.matches(E)&&(z.target.matches(".ia-approval-select")||J.has(se)||Z(z.target))}),K.addEventListener("change",z=>{(z.target.matches(E)||z.target.matches(".ia-approval-select"))&&Z(z.target)})};this._setupIaRolePickerListeners(P),this.setupManualPermitKnownLookups(P,b,$),X("#manual-approvals-list",".manual-approval-name, .ia-approval-select",".manual-approval-sig"),X("#manual-closure-approvals-list",".manual-closure-approval-name, .ia-approval-select",".manual-closure-approval-sig");const re=P.querySelector("#manual-work-type-panel"),pe=P.querySelector("#manual-work-type-panel-placeholder"),ue=P.querySelector("#manual-work-type-panel-body"),_e=P.querySelector("#manual-work-type-panel-title"),me=P.querySelector("#manual-work-type-select"),Ee=P.querySelector("#manual-work-type-selected-chips"),ze={hot:"manual-panel-hot",confined:"manual-panel-confined",height:"manual-panel-height",excavation:"manual-panel-excavation",electrical:"manual-panel-electrical",cold:"manual-panel-cold",other:"manual-panel-other"},Le={hot:"\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",confined:"\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",height:"\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",excavation:"\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631",electrical:"\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0621",cold:"\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F",other:"\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"},ve=[],De=P.querySelector("#manual-work-type-selected-empty"),Ce=P.querySelector("#manual-work-type-selected-hint"),Te=P.querySelector("#manual-work-type-panel-badge"),Ae=()=>{if(!Te||!me)return;const g=ve.some(E=>E.typeKey===me.value);Te.style.display=me.value&&g?"inline-block":"none"},qe=()=>{if(!Ee)return;const g=ve.length>0;De&&(De.style.display=g?"none":"block"),Ce&&(Ce.style.display=g?"block":"none"),Ee.innerHTML=ve.map(({typeKey:E,label:q})=>`<span class="manual-selected-type-chip" data-type="${E}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u062D\u0631\u064A\u0631 \u062A\u0641\u0627\u0635\u064A\u0644: ${q}" role="button" tabindex="0" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; background: #ede9fe; color: #5b21b6; font-size: 0.8rem; font-weight: 500;">${q}</span>`).join(""),Ee.querySelectorAll(".manual-selected-type-chip").forEach(E=>{E.addEventListener("click",function(){const q=this.getAttribute("data-type");q&&me&&(me.value=q,me.dispatchEvent(new Event("change")),Ae())}),E.addEventListener("keydown",function(q){(q.key==="Enter"||q.key===" ")&&(q.preventDefault(),this.click())})}),Ae()},Ne=()=>{const g=me?.value,E=g?Le[g]||g:"";!g||!E||ve.some(q=>q.typeKey===g)||(ve.push({typeKey:g,label:E}),qe(),Ae())};if(me&&re&&ue&&(me.addEventListener("change",function(){const g=this.value,E=Le[g]||g;if(!g){pe&&(pe.style.display="block"),ue.style.display="none",Te&&(Te.style.display="none");return}pe&&(pe.style.display="none"),ue.style.display="block",(re.querySelectorAll(".manual-type-panel-body")||[]).forEach(K=>{K.style.display="none"});const q=P.querySelector("#"+(ze[g]||""));q&&(q.style.display="block",_e&&(_e.textContent=E)),Ae()}),ue.addEventListener("change",function(g){g.target.matches('input[type="checkbox"], input[type="text"], input[type="number"]')&&Ne()}),ue.addEventListener("input",function(g){g.target.matches('input[type="text"], input[type="number"]')&&Ne()})),a){const g=(E,q)=>{E&&!ve.some(K=>K.typeKey===q)&&ve.push({typeKey:q,label:Le[q]})};g(a.hotWorkDetails&&a.hotWorkDetails.length||a.hotWorkOther,"hot"),g(a.confinedSpaceDetails&&a.confinedSpaceDetails.length||a.confinedSpaceOther,"confined"),g(a.heightWorkDetails&&a.heightWorkDetails.length||a.heightWorkOther,"height"),g(a.excavationLength||a.excavationWidth||a.excavationDepth||a.soilType,"excavation"),g(a.electricalWorkType,"electrical"),g(a.coldWorkType,"cold"),g(a.otherWorkType,"other")}qe();const Ue=P.querySelectorAll('input[name="manual-permit-status-radio"]'),je=P.querySelector("#manual-permit-status");a?.status?Ue.forEach(g=>{g.value===a.status&&(g.checked=!0,PTW.updateManualStatusBtnSelection(g))}):Ue.forEach(g=>{g.value==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&(g.checked=!0,PTW.updateManualStatusBtnSelection(g))}),P.querySelector("#manual-add-team-member-btn")?.addEventListener("click",()=>{const g=P.querySelector("#manual-team-members-list");if(!g)return;const E=document.createElement("tr");E.className="manual-team-member-row",E.innerHTML=`
                <td class="p-2 border border-gray-800"><input type="text" class="form-input text-sm w-full manual-team-member-name border-0 focus:ring-0" list="manual-team-member-names-datalist" autocomplete="off" placeholder="\u0627\u0644\u0627\u0633\u0645" value=""></td>
                <td class="p-2 border border-gray-800" style="border-right: 4px solid #1e3a8a;"><input type="text" class="form-input text-sm w-full manual-team-member-signature border-0 focus:ring-0" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639" value=""></td>
            `,g.appendChild(E),typeof P._attachManualTeamRowLookup=="function"&&P._attachManualTeamRowLookup(E)}),P.querySelectorAll(".manual-risk-cell").forEach(g=>{g.addEventListener("click",()=>{const E=g.dataset.likelihood,q=g.dataset.consequence,K=g.dataset.score,J=g.dataset.level,Z=g.dataset.bg||"#22c55e",z=g.dataset.text||"#ffffff";P.querySelectorAll(".manual-risk-cell").forEach(Fe=>{Fe.classList.remove("ring-4","ring-blue-500","ring-blue-600","ring-inset")}),g.classList.add("ring-4","ring-blue-600","ring-inset"),P.querySelector("#manual-risk-likelihood").value=E,P.querySelector("#manual-risk-consequence").value=q,P.querySelector("#manual-risk-score").value=K,P.querySelector("#manual-risk-level").value=J;const se=P.querySelector("#manual-risk-result");se&&se.classList.remove("hidden");const fe=P.querySelector("#manual-risk-score-display"),Be=P.querySelector("#manual-risk-level-display"),Re=P.querySelector("#manual-risk-likelihood-display"),We=P.querySelector("#manual-risk-consequence-display");fe&&(fe.textContent=K),Be&&(Be.textContent=J),Re&&(Re.textContent=E),We&&(We.textContent=q);const Ie=P.querySelector("#manual-risk-result-badge");Ie&&(Ie.style.background=Z,Ie.style.color=z,Ie.textContent=K);const Se=P.querySelector("#manual-risk-notes");if(Se){const He=`\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A: \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631 ${J} (\u062F\u0631\u062C\u0629 ${K}) \u2014 \u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 ${E} \xD7 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 ${q}. ${{\u0645\u0646\u062E\u0641\u0636:"\u064A\u0645\u0643\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062F\u0648\u0631\u064A\u0629.",\u0645\u062A\u0648\u0633\u0637:"\u064A\u0644\u0632\u0645 \u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0642\u0628\u0644 \u0648\u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.",\u0645\u0631\u062A\u0641\u0639:"\u0644\u0627 \u064A\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 \u0642\u0628\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0636\u0648\u0627\u0628\u0637 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0634\u0631\u0627\u0641\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629.",\u062D\u0631\u062C:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u0648\u0631\u0627\u064B \u062D\u062A\u0649 \u0625\u0632\u0627\u0644\u0629/\u062E\u0641\u0636 \u0627\u0644\u062E\u0637\u0631 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u062E\u0637\u0629 \u062A\u062D\u0643\u0645 \u0645\u0634\u062F\u062F\u0629."}[J]||""}`.trim(),Me=String(Se.value||"").trim(),Oe=String(Se.dataset.autoRiskText||"").trim();(!Me||Me===Oe||Me.startsWith("\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0642\u0627\u0626\u064A:"))&&(Se.value=He,Se.dataset.autoRiskText=He)}})}),P.querySelector("#manual-add-approval-btn")?.addEventListener("click",()=>{const g=P.querySelector("#manual-approvals-list");if(!g)return;const E=g.querySelectorAll("tr").length+1,q=document.createElement("tr");q.className="manual-approval-row border-b border-gray-100 hover:bg-amber-50 transition-colors",q.innerHTML=`
                <td class="p-2 text-center font-bold text-amber-700">${E}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,g.appendChild(q)}),P.querySelector("#manual-add-closure-approval-btn")?.addEventListener("click",()=>{const g=P.querySelector("#manual-closure-approvals-list");if(!g)return;const E=g.querySelectorAll("tr").length+1,q=document.createElement("tr");q.className="manual-closure-approval-row border-b border-gray-100 hover:bg-cyan-50 transition-colors",q.innerHTML=`
                <td class="p-2 text-center font-bold text-cyan-700">${E}</td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-role" placeholder="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0633\u0645\u0649" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F" value=""></td>
                <td class="p-2"><input type="datetime-local" class="form-input text-sm manual-closure-approval-date" value=""></td>
                <td class="p-2"><input type="text" class="form-input text-sm manual-closure-approval-notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" value=""></td>
                <td class="p-2 text-center"><button type="button" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" onclick="this.closest('tr').remove(); PTW.updateApprovalNumbers('manual-closure-approvals-list')" title="\u062D\u0630\u0641"><i class="fas fa-trash-alt"></i></button></td>
            `,g.appendChild(q)}),P.querySelector("#manual-permit-print-btn")?.addEventListener("click",()=>{this.printManualPermitFromModal(P,e)}),P.querySelector("#manual-permit-form")?.addEventListener("submit",async g=>{if(g.preventDefault(),!P.querySelector('input[name="manual-permit-status-radio"]:checked')){const q=P.querySelector("#manual-permit-status");q&&!String(q.value||"").trim()&&(q.value="\u0645\u063A\u0644\u0642")}await this.saveManualPermitEntry(P,e)})},collectManualPermitDataFromModal(e,t=null){if(!e)return null;const a=t?this.registryData.find(I=>I.id===t):null,i=e.querySelector("#manual-permit-location"),r=i?.options[i?.selectedIndex],s=String(i?.value||"").trim(),o=String(r?.getAttribute("data-site-name")||r?.textContent||"").trim(),n=e.querySelector("#manual-permit-sublocation"),l=e.querySelector("#manual-permit-location-entries");let p=[];if(l?.value)try{const I=JSON.parse(l.value);Array.isArray(I)&&(p=I)}catch{}if(!p.length){const I=n?.options[n?.selectedIndex],B=String(I?.getAttribute("data-place-name")||I?.textContent||"").trim();o&&B&&(p=[{locationId:s,location:o,sublocationId:n?.value||"",sublocation:B}])}const d=p.map(I=>I.sublocation).filter(Boolean),c=Array.from(e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(I=>({name:I.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:I.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(I=>I.name||I.signature),m=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(I=>{const B=this._readIaRolePickerValue(I,e,{isClosure:!1}),O=e.querySelector(`.manual-approval-sig[data-role="${I}"]`);if(B.name||B.approverId)return{role:I,name:B.name,signature:O?.value?.trim()||""};const V=e.querySelector(`.manual-approval-name[data-role="${I}"]`);return{role:I,name:V?.value?.trim()||"",signature:O?.value?.trim()||""}}),f=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(I=>{const B=this._readIaRolePickerValue(I,e,{isClosure:!0}),O=e.querySelector(`.manual-closure-approval-sig[data-role="${I}"]`);if(B.name||B.approverId)return{role:I,name:B.name,signature:O?.value?.trim()||""};const V=e.querySelector(`.manual-closure-approval-name[data-role="${I}"]`);return{role:I,name:V?.value?.trim()||"",signature:O?.value?.trim()||""}}),w=e.querySelector("#manual-permit-time-from")?.value||"",x=e.querySelector("#manual-permit-time-to")?.value||"",A=Array.from(e.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(I=>String(I.value||"").trim()).filter(Boolean),v=e.querySelector("#manual-ppe-notes")?.value?.trim()||"",U=v?v.split(/[،,]/).map(I=>I.trim()).filter(Boolean):[],W=[...new Set([...A,...U])],_=Array.from(e.querySelectorAll('input[name="manual-hot-work"]:checked')).map(I=>I.value),D=Array.from(e.querySelectorAll('input[name="manual-confined-space"]:checked')).map(I=>I.value),M=Array.from(e.querySelectorAll('input[name="manual-height-work"]:checked')).map(I=>I.value),R=[];_.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),D.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),M.length&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(e.querySelector("#manual-excavation-check")?.checked||e.querySelector("#manual-excavation-length")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(e.querySelector("#manual-electrical-check")?.checked||e.querySelector("#manual-electrical-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(e.querySelector("#manual-cold-check")?.checked||e.querySelector("#manual-cold-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(e.querySelector("#manual-other-check")?.checked||e.querySelector("#manual-other-work-type")?.value?.trim())&&R.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const k=R.length?R:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],S=e.querySelector("#manual-closure-time")?.value||"";return{...a||{},sequentialNumber:parseInt(e.querySelector("#manual-permit-sequential")?.value||a?.sequentialNumber||"0",10),paperPermitNumber:e.querySelector("#manual-paper-permit-number")?.value?.trim()||a?.paperPermitNumber||"",location:o,locationId:s,locationEntries:p,sublocation:d.join(" | "),timeFrom:w?Utils.dateTimeLocalToISO(w)||w:a?.timeFrom||"",timeTo:x?Utils.dateTimeLocalToISO(x)||x:a?.timeTo||"",authorizedParty:e.querySelector("#manual-permit-authorized-party")?.value?.trim()||"",requestingParty:e.querySelector("#manual-permit-requesting-party")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:e.querySelector("#manual-permit-tools")?.value?.trim()||"",workDescription:e.querySelector("#manual-permit-work-description")?.value?.trim()||"",teamMembers:c.length?c:[{name:"",signature:""}],hotWorkDetails:_,hotWorkOther:e.querySelector("#manual-hot-work-other")?.value?.trim()||"",confinedSpaceDetails:D,confinedSpaceOther:e.querySelector("#manual-confined-space-other")?.value?.trim()||"",heightWorkDetails:M,heightWorkOther:e.querySelector("#manual-height-work-other")?.value?.trim()||"",electricalWorkType:e.querySelector("#manual-electrical-work-type")?.value?.trim()||"",coldWorkType:e.querySelector("#manual-cold-work-type")?.value?.trim()||"",otherWorkType:e.querySelector("#manual-other-work-type")?.value?.trim()||"",excavationLength:e.querySelector("#manual-excavation-length")?.value?.trim()||"",excavationWidth:e.querySelector("#manual-excavation-width")?.value?.trim()||"",excavationDepth:e.querySelector("#manual-excavation-depth")?.value?.trim()||"",soilType:e.querySelector("#manual-excavation-soil")?.value?.trim()||"",preStartChecklist:e.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:e.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:e.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:e.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:e.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:e.querySelector("#manual-permit-mocRequest")?.checked||!1,requiredPPE:W,ppeNotes:W.join("\u060C "),riskLikelihood:e.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:e.querySelector("#manual-risk-consequence")?.value||"",riskScore:e.querySelector("#manual-risk-score")?.value||"",riskLevel:e.querySelector("#manual-risk-level")?.value||"",riskNotes:e.querySelector("#manual-risk-notes")?.value?.trim()||"",manualApprovals:m,manualClosureApprovals:f,status:e.querySelector("#manual-permit-status")?.value||e.querySelector('input[name="manual-permit-status-radio"]:checked')?.value||a?.status||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",closureDate:S?Utils.dateTimeLocalToISO(S)||S:a?.closureDate||"",closureReason:e.querySelector("#manual-closure-reason")?.value?.trim()||"",supervisor1:e.querySelector("#manual-permit-supervisor1")?.value?.trim()||"",supervisor2:e.querySelector("#manual-permit-supervisor2")?.value?.trim()||"",permitType:k,permitTypeDisplay:k.join("\u060C "),isManualEntry:!0}},async printManualPermitFromModal(e,t=null){try{const a=this.collectManualPermitDataFromModal(e,t);if(!a){Notification.warning(this._t("module.ptw.notify.formNotFound","\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}Loading.show();const i=await this.generateManualPermitPrintHTML(a);Loading.hide(),this.openPermitPrintWindow(i)}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",a),Notification.error(this._t("module.ptw.notify.printErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ")+a.message)}},async saveManualPermitEntry(e,t=null){if(!this._isSavingManualPermit){this._isSavingManualPermit=!0;try{const a=T=>{T&&(T.style.border="2px solid #e53e3e",T.style.boxShadow="0 0 0 3px rgba(229,62,62,0.15)")},i=T=>{T&&(T.style.border="",T.style.boxShadow="")},r=e.querySelector("#manual-paper-permit-number"),s=e.querySelector("#manual-permit-time-from"),o=e.querySelector("#manual-permit-time-to"),n=e.querySelector("#manual-permit-authorized-party"),l=e.querySelector("#manual-permit-requesting-party"),p=e.querySelector("#manual-permit-work-description"),d=e.querySelector("#manual-permit-location"),c=d?.options[d?.selectedIndex],u=String(d?.value||"").trim(),m=String(c?.getAttribute("data-site-name")||c?.textContent||"").trim(),h=e.querySelector("#manual-permit-sublocation"),f=e.querySelector("#manual-permit-location-entries");[r,d,s,o,n,l,p].forEach(i);const x=[{label:"\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A",element:r,value:String(r?.value||"").trim()},{label:"\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645",element:d,value:u},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621",element:s,value:String(s?.value||"").trim()},{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",element:o,value:String(o?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644",element:n,value:String(n?.value||"").trim()},{label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D",element:l,value:String(l?.value||"").trim()},{label:"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644",element:p,value:String(p?.value||"").trim()}].filter(T=>!T.value);if(x.length>0){x.forEach(X=>a(X.element));const T=x[0]?.element;T&&typeof T.focus=="function"&&(T.focus(),T.scrollIntoView({behavior:"smooth",block:"center"})),Notification.error(this._t("module.ptw.notify.manualRequiredFieldsDetailed",`\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0642\u0628\u0644 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:
{fields}`).replace("{fields}",x.map(X=>`\u2022 ${X.label}`).join(`
`)));return}let A=[];if(f?.value)try{const T=JSON.parse(f.value);Array.isArray(T)&&(A=T.map(X=>({locationId:String(X?.locationId||u).trim(),location:String(X?.location||m).trim(),sublocationId:String(X?.sublocationId||"").trim(),sublocation:String(X?.sublocation||"").trim()})).filter(X=>X.location&&X.sublocation))}catch{A=[]}if(A.length===0){const T=h?.options[h?.selectedIndex],X=String(h?.value||"").trim(),re=String(T?.getAttribute("data-place-name")||(T?.value?T.textContent:"")||"").trim();m&&re&&(A=[{locationId:u,location:m,sublocationId:X,sublocation:re}])}const v=A.map(T=>T.sublocationId).filter(Boolean),U=A.map(T=>T.sublocation).filter(Boolean),W=v.length>0?v.join(" | "):null,_=U.length>0?U.join(" | "):null,D=e.querySelector("#manual-permit-time-from")?.value,M=e.querySelector("#manual-permit-time-to")?.value,R=e.querySelector("#manual-permit-date")?.value||(D?D.split("T")[0]:new Date().toISOString().split("T")[0]);let F="";if(D&&M){F=this.calculateTotalTime(D,M);try{const T=new Date(D),re=new Date(M)-T;if(re>=0){const pe=Math.floor(re/36e5),ue=Math.floor(re%(1e3*60*60)/(1e3*60));pe===0?F=`${ue} \u062F\u0642\u064A\u0642\u0629`:ue===0?F=`${pe} \u0633\u0627\u0639\u0629`:F=`${pe} \u0633\u0627\u0639\u0629 \u0648 ${ue} \u062F\u0642\u064A\u0642\u0629`}}catch{}}const k=Array.from(e.querySelectorAll("#manual-team-members-list tr.manual-team-member-row")).map(T=>({name:T.querySelector(".manual-team-member-name")?.value?.trim()||"",signature:T.querySelector(".manual-team-member-signature")?.value?.trim()||"",id:T.querySelector(".manual-team-member-signature")?.value?.trim()||""})).filter(T=>T.name||T.signature),S=Array.from(e.querySelectorAll('input[name="manual-hot-work"]:checked')).map(T=>T.value),I=Array.from(e.querySelectorAll('input[name="manual-confined-space"]:checked')).map(T=>T.value),B=Array.from(e.querySelectorAll('input[name="manual-height-work"]:checked')).map(T=>T.value),V=["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629","\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>{const X=this._readIaRolePickerValue(T,e,{isClosure:!1}),re=e.querySelector(`.manual-approval-sig[data-role="${T}"]`);if(X.name||X.approverId)return{role:T,name:X.name,signature:re?.value?.trim()||"",approverId:X.approverId||"",personType:X.personType||"",isManualApprover:X.isManualApprover===!0,approvalRoleKey:X.approvalRoleKey||this._resolveIaRoleKey(T),date:"",notes:""};const pe=e.querySelector(`.manual-approval-name[data-role="${T}"]`);return{role:T,name:pe?.value?.trim()||"",signature:re?.value?.trim()||"",date:"",notes:""}}),b=["\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"].map(T=>{const X=this._readIaRolePickerValue(T,e,{isClosure:!0}),re=e.querySelector(`.manual-closure-approval-sig[data-role="${T}"]`);if(X.name||X.approverId)return{role:T,name:X.name,signature:re?.value?.trim()||"",approverId:X.approverId||"",personType:X.personType||"",isManualApprover:X.isManualApprover===!0,approvalRoleKey:X.approvalRoleKey||this._resolveIaRoleKey(T),date:"",notes:""};const pe=e.querySelector(`.manual-closure-approval-name[data-role="${T}"]`);return{role:T,name:pe?.value?.trim()||"",signature:re?.value?.trim()||"",date:"",notes:""}}),$=[];S.length>0&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629"),I.length>0&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629"),B.length>0&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0641\u064A \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A"),(e.querySelector("#manual-excavation-check")?.checked||e.querySelector("#manual-excavation-length")?.value?.trim()||e.querySelector("#manual-excavation-width")?.value?.trim()||e.querySelector("#manual-excavation-depth")?.value?.trim()||e.querySelector("#manual-excavation-soil")?.value?.trim())&&$.push("\u0623\u0639\u0645\u0627\u0644 \u062D\u0641\u0631"),(e.querySelector("#manual-electrical-check")?.checked||e.querySelector("#manual-electrical-work-type")?.value?.trim())&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629"),(e.querySelector("#manual-cold-check")?.checked||e.querySelector("#manual-cold-work-type")?.value?.trim())&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629"),(e.querySelector("#manual-other-check")?.checked||e.querySelector("#manual-other-work-type")?.value?.trim())&&$.push("\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649");const C=$.length>0?$:["\u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649"],y={sequentialNumber:parseInt(e.querySelector("#manual-permit-sequential")?.value||"0"),date:R,permitType:C,permitTypeDisplay:C.join("\u060C "),requestingParty:e.querySelector("#manual-permit-requesting-party")?.value.trim()||"",locationId:u,location:m,locationEntries:A,sublocationId:W,sublocation:_,timeFrom:D,timeTo:M,totalTime:e.querySelector("#manual-permit-total-time")?.value||F,authorizedParty:e.querySelector("#manual-permit-authorized-party")?.value.trim()||"",workDescription:e.querySelector("#manual-permit-work-description")?.value.trim()||"",supervisor1:e.querySelector("#manual-permit-supervisor1")?.value.trim()||"",supervisor2:e.querySelector("#manual-permit-supervisor2")?.value.trim()||"",status:e.querySelector("#manual-permit-status")?.value||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",paperPermitNumber:e.querySelector("#manual-paper-permit-number")?.value?.trim()||"",equipment:this.collectEquipmentFieldValue(e,{matrixId:"#manual-equipment-matrix",notesId:"#manual-equipment-notes"}),tools:e.querySelector("#manual-permit-tools")?.value.trim()||"",teamMembers:k,hotWorkDetails:S,hotWorkOther:e.querySelector("#manual-hot-work-other")?.value.trim()||"",confinedSpaceDetails:I,confinedSpaceOther:e.querySelector("#manual-confined-space-other")?.value.trim()||"",heightWorkDetails:B,heightWorkOther:e.querySelector("#manual-height-work-other")?.value.trim()||"",electricalWorkType:e.querySelector("#manual-electrical-work-type")?.value.trim()||"",coldWorkType:e.querySelector("#manual-cold-work-type")?.value.trim()||"",otherWorkType:e.querySelector("#manual-other-work-type")?.value.trim()||"",excavationLength:e.querySelector("#manual-excavation-length")?.value.trim()||"",excavationWidth:e.querySelector("#manual-excavation-width")?.value.trim()||"",excavationDepth:e.querySelector("#manual-excavation-depth")?.value.trim()||"",soilType:e.querySelector("#manual-excavation-soil")?.value.trim()||"",preStartChecklist:e.querySelector("#manual-permit-preStartChecklist")?.checked||!1,lotoApplied:e.querySelector("#manual-permit-lotoApplied")?.checked||!1,governmentPermits:e.querySelector("#manual-permit-governmentPermits")?.checked||!1,riskAssessmentAttached:e.querySelector("#manual-permit-riskAssessmentAttached")?.checked||!1,gasTesting:e.querySelector("#manual-permit-gasTesting")?.checked||!1,mocRequest:e.querySelector("#manual-permit-mocRequest")?.checked||!1,ppeNotes:e.querySelector("#manual-ppe-notes")?.value.trim()||"",riskLikelihood:e.querySelector("#manual-risk-likelihood")?.value||"",riskConsequence:e.querySelector("#manual-risk-consequence")?.value||"",riskScore:e.querySelector("#manual-risk-score")?.value||"",riskLevel:e.querySelector("#manual-risk-level")?.value||"",riskNotes:e.querySelector("#manual-risk-notes")?.value.trim()||"",manualApprovalsText:V.map(T=>`${T.role}: ${T.name||"\u2014"} ${T.signature?"\u062A\u0648\u0642\u064A\u0639: "+T.signature:""}`).filter(Boolean).join(" | "),manualClosureApprovalsText:b.map(T=>`${T.role}: ${T.name||"\u2014"} ${T.signature?"\u062A\u0648\u0642\u064A\u0639: "+T.signature:""}`).filter(Boolean).join(" | "),manualApprovals:V,manualClosureApprovals:b,closureTime:e.querySelector("#manual-closure-time")?.value||"",closureReason:e.querySelector("#manual-closure-reason")?.value.trim()||""},G=y.ppeNotes?String(y.ppeNotes).split(/[،,]/).map(T=>T.trim()).filter(Boolean):[],P=Array.from(e.querySelectorAll("#manual-ppe-matrix .manual-ppe-fixed-cb:checked")).map(T=>String(T.value||"").trim()).filter(Boolean),H=[...new Set([...P,...G].map(T=>String(T||"").trim()).filter(Boolean))];y.ppeNotes=H.length?H.join("\u060C "):y.ppeNotes;const Y=String(y.paperPermitNumber||"").trim();if(!Y||Y==="0"){typeof Notification<"u"&&Notification.warning&&Notification.warning(PTW._t("module.ptw.notify.paperNumRequired","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A \u0625\u0644\u0632\u0627\u0645\u064A \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0631\u0642\u0645 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638")),r&&(a(r),r.focus(),r.scrollIntoView({behavior:"smooth",block:"center"}));return}const ne=this.registryData.find(T=>String(T.paperPermitNumber||"").trim()===Y&&T.id!==(t||null));if(ne){const T=ne.sequentialNumber||"\u061F";typeof Notification<"u"&&Notification.error&&Notification.error(PTW._t("module.ptw.notify.paperNumDup",'\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0648\u0631\u0642\u064A "{n}" \u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u062C\u0644 #{s} \u2014 \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0645\u062E\u062A\u0644\u0641').replace(/\{n\}/g,Y).replace(/\{s\}/g,String(T))),r&&(a(r),r.focus(),r.scrollIntoView({behavior:"smooth",block:"center"}));return}const ie=Utils.dateTimeLocalToISO(y.timeFrom)||new Date().toISOString(),ee=Utils.dateTimeLocalToISO(y.timeTo)||new Date().toISOString(),de=ie||this.dateInputToISO(y.date)||new Date().toISOString(),Q=parseInt(y.sequentialNumber)||0,oe=t?y.sequentialNumber:Q>0?Q:this.generateRegistrySequentialNumber(),ae=this.getCurrentUserActor(),we=String(y.location||"").trim(),ye={sequentialNumber:oe,openDate:de,permitType:y.permitType,permitTypeDisplay:y.permitTypeDisplay,requestingParty:y.requestingParty,locationId:y.locationId,location:we,locationEntries:y.locationEntries,sublocationId:y.sublocationId,sublocation:y.sublocation,timeFrom:ie,timeTo:ee,totalTime:y.totalTime||this.calculateTotalTime(ie,ee),authorizedParty:y.authorizedParty,workDescription:y.workDescription,supervisor1:y.supervisor1||"",supervisor2:y.supervisor2||"",status:y.status,paperPermitNumber:y.paperPermitNumber||"",equipment:y.equipment,tools:y.tools,toolsList:y.tools,teamMembers:y.teamMembers,hotWorkDetails:y.hotWorkDetails,hotWorkOther:y.hotWorkOther,confinedSpaceDetails:y.confinedSpaceDetails,confinedSpaceOther:y.confinedSpaceOther,heightWorkDetails:y.heightWorkDetails,heightWorkOther:y.heightWorkOther,electricalWorkType:y.electricalWorkType,coldWorkType:y.coldWorkType,otherWorkType:y.otherWorkType,excavationLength:y.excavationLength,excavationWidth:y.excavationWidth,excavationDepth:y.excavationDepth,soilType:y.soilType,preStartChecklist:y.preStartChecklist,lotoApplied:y.lotoApplied,governmentPermits:y.governmentPermits,riskAssessmentAttached:y.riskAssessmentAttached,gasTesting:y.gasTesting,mocRequest:y.mocRequest,ppeNotes:y.ppeNotes,requiredPPE:H,riskLikelihood:y.riskLikelihood,riskConsequence:y.riskConsequence,riskScore:y.riskScore,riskLevel:y.riskLevel,riskNotes:y.riskNotes,manualApprovalsText:y.manualApprovalsText,manualClosureApprovalsText:y.manualClosureApprovalsText,manualApprovals:y.manualApprovals,manualClosureApprovals:y.manualClosureApprovals,teamMembersText:y.teamMembers.map(T=>`${T.name}${T.signature||T.id?" ("+(T.signature||T.id)+")":""}`).join("\u060C "),closureDate:y.closureTime?Utils.dateTimeLocalToISO(y.closureTime):y.status==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||y.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?ee:null,closureReason:y.closureReason||(y.status==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"?"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":""),isManualEntry:!0,skipApprovalFlow:!0,approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdBy:ae.name,createdById:ae.id,updatedBy:ae.name,updatedById:ae.id,updatedAt:new Date().toISOString()};let N;if(t){const T=this.registryData.find(X=>X.id===t);if(!T){Notification.error(this._t("module.ptw.notify.recNotFound","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}N={...T,...ye,id:T.id,permitId:T.permitId||this.generateTemporaryId("PTW"),createdBy:T.createdBy||ye.createdBy||ae.name,createdById:T.createdById||ye.createdById||ae.id,createdAt:T.createdAt}}else N={...ye,id:this.generateTemporaryId("REG"),permitId:this.generateTemporaryId("PTW"),createdAt:new Date().toISOString()};if(t){const T=this.registryData.findIndex(X=>X.id===t);if(T!==-1)this.registryData[T]=N;else{Notification.error(this._t("module.ptw.notify.recNotInData","\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"));return}}else this.registryData.push(N);AppState.appData||(AppState.appData={}),AppState.appData.ptw||(AppState.appData.ptw=[]);const ce={id:N.permitId,workType:Array.isArray(N.permitType)?N.permitTypeDisplay||N.permitType.join("\u060C "):N.permitType||N.permitTypeDisplay,location:N.location,siteName:N.location,sublocation:N.sublocation,sublocationName:N.sublocation,startDate:N.openDate,endDate:N.timeTo,status:String(N.status||"").trim()||"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646",requestingParty:N.requestingParty,authorizedParty:N.authorizedParty,workDescription:N.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:N.createdAt,updatedAt:N.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,createdBy:N.createdBy||this.getCurrentUserActor().name,createdById:N.createdById||this.getCurrentUserActor().id,updatedBy:N.updatedBy||this.getCurrentUserActor().name,updatedById:N.updatedById||this.getCurrentUserActor().id,teamMembers:N.teamMembers||[],teamMembersText:N.teamMembersText||"",hotWorkDetails:N.hotWorkDetails||[],hotWorkOther:N.hotWorkOther||"",confinedSpaceDetails:N.confinedSpaceDetails||[],confinedSpaceOther:N.confinedSpaceOther||"",heightWorkDetails:N.heightWorkDetails||[],heightWorkOther:N.heightWorkOther||"",excavationLength:N.excavationLength||"",excavationWidth:N.excavationWidth||"",excavationDepth:N.excavationDepth||"",soilType:N.soilType||"",electricalWorkType:N.electricalWorkType||"",coldWorkType:N.coldWorkType||"",otherWorkType:N.otherWorkType||"",preStartChecklist:N.preStartChecklist||!1,lotoApplied:N.lotoApplied||!1,governmentPermits:N.governmentPermits||!1,riskAssessmentAttached:N.riskAssessmentAttached||!1,gasTesting:N.gasTesting||!1,mocRequest:N.mocRequest||!1,ppeNotes:N.ppeNotes||"",riskLikelihood:N.riskLikelihood||"",riskConsequence:N.riskConsequence||"",riskScore:N.riskScore||"",riskLevel:N.riskLevel||"",riskNotes:N.riskNotes||"",manualApprovals:N.manualApprovals||[],manualApprovalsText:N.manualApprovalsText||"",manualClosureApprovals:N.manualClosureApprovals||[],manualClosureApprovalsText:N.manualClosureApprovalsText||"",closureTime:N.closureTime||"",closureDate:N.closureDate||"",closureReason:N.closureReason||"",paperPermitNumber:N.paperPermitNumber||"",sequentialNumber:N.sequentialNumber,equipment:N.equipment||"",tools:N.tools||"",toolsList:N.toolsList||"",supervisor1:N.supervisor1||"",supervisor2:N.supervisor2||""},be=AppState.appData.ptw.findIndex(T=>T.id===N.permitId);if(be!==-1){const T=AppState.appData.ptw[be];AppState.appData.ptw[be]={...T,...ce,id:N.permitId,isManualEntry:!0}}else AppState.appData.ptw.push(ce);e.remove();const le=document.getElementById("ptw-registry-content");le&&(this.currentTab==="registry"||le.style.display!=="none")&&this._refreshRegistryViewLight(!0);const xe=document.getElementById("ptw-permits-content");xe&&(this.currentTab==="permits"||xe.style.display!=="none")&&this.loadPTWList(!0);const ge=document.getElementById("ptw-analysis-content");ge&&(this.currentTab==="analysis"||ge.style.display!=="none")&&(ge.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const he=document.getElementById("ptw-approvals-content");he&&(this.currentTab==="approvals"||he.style.display!=="none")&&(he.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners());const ke=document.getElementById("ptw-map-content");ke&&this.currentTab==="map"&&ke.style.display!=="none"&&this.mapInstance&&typeof this.initMap=="function"&&setTimeout(()=>{this.currentTab==="map"&&this.initMap().catch(T=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629:",T))},300),this.updateKPIs();const Pe=!t,$e=be===-1;Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"),Promise.resolve().then(async()=>{await this.saveRegistryData({skipSync:!0}),typeof window.DataManager<"u"&&window.DataManager.save&&await Promise.resolve(window.DataManager.save()),await this.syncManualPermitRecordsToBackend(N,ce,{isNewRegistryEntry:Pe,isNewPermit:$e})}).catch(async T=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",T);const X=T&&T.message?String(T.message):"";if(/حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(X)&&N&&ce)try{const re=await this._fetchPtwRegistryRowsNoMutation();if(this._manualPermitRowExistsOnBackend(re,N,ce)){Notification.success(this._t("module.ptw.notify.manualCloudOkVerified","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D."));return}}catch(re){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0627\u0644\u0633\u062C\u0644 \u0641\u064A PTWRegistry:",re)}Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B. \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629 (\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u0631\u0642\u0629 PTW \u0648 PTWRegistry): "+(X||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")+" \u2014 \u064A\u0645\u0643\u0646 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}).finally(()=>{this._isSavingManualPermit=!1})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",a),Notification.error(this._t("module.ptw.notify.savePermitErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+(a.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}},async deleteManualPermitEntry(e){if(confirm(this._t("module.ptw.notify.deleteManualPermConfirm",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u061F
\u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u062C\u0644.`)))try{const t=this.registryData.findIndex(i=>i.id===e);if(t===-1){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(!this.registryData[t].isManualEntry){Notification.warning(this._t("module.ptw.notify.manualDeleteOnly","\u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A\u0629 \u0641\u0642\u0637 \u0645\u0646 \u0647\u0646\u0627"));return}this.registryData.splice(t,1),await this.saveRegistryData(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.manualDeleteOk","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A \u0628\u0646\u062C\u0627\u062D"))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A:",t),Notification.error(this._t("module.ptw.notify.deleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}},async closePermitFromRegistry(e){if(!confirm(this._t("module.ptw.notify.closePermitConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F")))return;const t=AppState.appData.ptw?.find(i=>i.id===e);if(!t){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}const a=prompt(this._t("module.ptw.notify.closureReasonPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:"));a&&(t.status="\u0645\u063A\u0644\u0642",t.closureTime=new Date().toISOString(),t.closureReason=a,t.closureStatus="completed",typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),await this.updateRegistryEntry(t),this.updateKPIs(),this.currentTab==="registry"&&document.getElementById("ptw-registry-content")&&this._refreshRegistryViewLight(!0),Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")))},async exportRegistryToExcel(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}const e=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(t=>({\u0645\u0633\u0644\u0633\u0644:t.sequentialNumber,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:new Date(t.openDate).toLocaleDateString("ar-EG"),"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":this.getPermitTypeDisplay(t),"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629":t.requestingParty,\u0627\u0644\u0645\u0648\u0642\u0639:t.location,"\u0627\u0644\u0648\u0642\u062A \u0645\u0646":t.timeFrom,"\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649":t.closureDate||t.timeTo,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A":t.totalTime,"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627":t.authorizedParty,"\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644":t.workDescription,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01":t.supervisor1,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02":t.supervisor2,"\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D":t.status}));if(typeof XLSX<"u"){const t=XLSX.utils.json_to_sheet(e),a=XLSX.utils.book_new();XLSX.utils.book_append_sheet(a,t,"\u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),XLSX.writeFile(a,`\u0633\u062C\u0644_\u062A\u0635\u0627\u0631\u064A\u062D_\u0627\u0644\u0639\u0645\u0644_${new Date().toISOString().split("T")[0]}.xlsx`),Notification.success(this._t("module.ptw.notify.excelOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))}else Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"))},async exportRegistryToPDF(){if(this.registryData.length===0){Notification.warning(this._t("module.ptw.notify.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 PDF...");const e=d=>{if(!d)return"-";try{const c=this.parseDateTimeValue(d);return!c||isNaN(c.getTime())?d||"-":c.toLocaleDateString("ar-EG")}catch{return d||"-"}},t=d=>{if(!d)return"-";try{const c=this.parseDateTimeValue(d);return!c||isNaN(c.getTime())?d||"-":c.toLocaleString("ar-EG")}catch{return d||"-"}},a=this.sortPermitRecordsNewestFirst(this.getRegistrySanitizedDataset()).map(d=>{const c=d.sequentialNumber||"-",u=e(d.openDate),m=this.getPermitTypeDisplay(d)||"-",h=d.requestingParty||"-",f=d.location||"-",w=d.timeFrom?t(d.timeFrom):"-",x=d.closureDate?t(d.closureDate):d.timeTo?t(d.timeTo):"-",A=d.totalTime||"-",v=d.authorizedParty||"-",U=d.workDescription||"-",W=d.supervisor1||"-",_=d.supervisor2||"-",D=d.status||"-";return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(c)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(u)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(m)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(f)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(w)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(x)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(A)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(v)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${Utils.escapeHTML(U)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(W)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(_)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(D)}</td>
                    </tr>
                `}).join(""),i=`PTW-REGISTRY-${new Date().toISOString().slice(0,10)}`,r="\u0633\u062C\u0644 \u062D\u0635\u0631 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0623\u0639\u0645\u0627\u0644",s=`
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
            `,o=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,r,s,!1,!0,{source:"PTWRegistry"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body>${s}</body></html>`,n=new Blob([o],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(n),p=window.open(l,"_blank");p?p.onload=()=>{setTimeout(()=>{p.print(),setTimeout(()=>{URL.revokeObjectURL(l),Loading.hide(),Notification.success(this._t("module.ptw.notify.registryPrintReady","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",e),Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(e.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},showImportExcelModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e);const t=e.querySelector("#registry-excel-file-input"),a=e.querySelector("#registry-import-confirm-btn"),i=e.querySelector("#registry-import-preview"),r=e.querySelector("#registry-preview-head"),s=e.querySelector("#registry-preview-body"),o=e.querySelector("#registry-preview-count");let n=[];const l=()=>{n=[],i&&i.classList.add("hidden"),r&&(r.innerHTML=""),s&&(s.innerHTML=""),o&&(o.textContent=""),a&&(a.disabled=!0)};e.addEventListener("click",d=>{d.target===e&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&e.remove()});const p=async d=>{const c=d.target.files?.[0];if(l(),!!c){if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxLibDetail","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629."));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");const u=await c.arrayBuffer(),m=XLSX.read(u,{type:"array"}),h=m.SheetNames[0],f=m.Sheets[h],w=XLSX.utils.sheet_to_json(f);if(w.length===0){Notification.error(this._t("module.ptw.notify.fileEmpty","\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A")),Loading.hide();return}if(n=w,w.length>0){const x=Object.keys(w[0]);r.innerHTML=`<tr>${x.map(A=>`<th class="px-2 py-1">${Utils.escapeHTML(A)}</th>`).join("")}</tr>`,s.innerHTML=w.slice(0,5).map(A=>`<tr>${x.map(v=>`<td class="px-2 py-1">${Utils.escapeHTML(String(A[v]||""))}</td>`).join("")}</tr>`).join(""),o.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${w.length}`,i.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(u){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel:",u),Notification.error(this._t("module.ptw.notify.readFileErr","\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: ")+(u.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}}};t&&t.addEventListener("change",p),a?.addEventListener("click",async()=>{if(n.length===0){Notification.warning(this._t("module.ptw.notify.selectFileFirst","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F."));return}await this.importRegistryFromExcel(n,e)})},async importRegistryFromExcel(e,t){if(!e||e.length===0){Notification.error(this._t("module.ptw.notify.noImportData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"));return}try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");let a=0,i=0,r=0,s=0;const o={sequentialNumber:["\u0645\u0633\u0644\u0633\u0644","Sequential Number","sequentialNumber","\u0645\u0633\u0644\u0633\u0644"],openDate:["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","Date","openDate","\u062A\u0627\u0631\u064A\u062E","\u062A\u0627\u0631\u064A\u062E \u0641\u062A\u062D \u0627\u0644\u062A\u0635\u0631\u064A\u062D"],permitType:["\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Permit Type","permitType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644"],requestingParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629","Requesting Party","requestingParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629"],location:["\u0627\u0644\u0645\u0648\u0642\u0639","Location","location","\u0645\u0648\u0642\u0639"],timeFrom:["\u0627\u0644\u0648\u0642\u062A \u0645\u0646","Time From","timeFrom","\u0648\u0642\u062A \u0645\u0646","\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644"],timeTo:["\u0627\u0644\u0648\u0642\u062A \u0625\u0644\u0649","Time To","timeTo","\u0648\u0642\u062A \u0625\u0644\u0649","\u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0639\u0645\u0644"],totalTime:["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","Total Time","totalTime","\u0625\u062C\u0645\u0627\u0644\u064A"],authorizedParty:["\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627","Authorized Party","authorizedParty","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D"],workDescription:["\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644","Work Description","workDescription","\u0627\u0644\u0648\u0635\u0641"],supervisor1:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 01","Supervisor 1","supervisor1","\u0645\u0633\u0626\u0648\u0644 01"],supervisor2:["\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 02","Supervisor 2","supervisor2","\u0645\u0633\u0626\u0648\u0644 02"],status:["\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","Status","status","\u0627\u0644\u062D\u0627\u0644\u0629"]},n=(d,c)=>{for(const u in d){const m=String(u).trim();for(const h of c)if(m===h||m.toLowerCase()===h.toLowerCase())return d[u]}return null},l=d=>{if(!d)return null;const c=this.parseDateTimeValue(d);if(c)return c.toISOString();if(typeof d=="string"){const u=new Date(d);if(!isNaN(u.getTime()))return u.toISOString()}if(typeof d=="number"){const u=Math.floor(d),m=d-u,h=new Date(1899,11,30),f=new Date(h.getTime()+u*24*60*60*1e3);if(m>0){const w=Math.round(m*24*60*60),x=Math.floor(w/3600),A=Math.floor(w%3600/60),v=w%60;f.setHours(x,A,v,0)}if(!isNaN(f.getTime()))return f.toISOString()}return null};for(const d of e)try{const c=n(d,o.sequentialNumber),u=l(n(d,o.openDate)),m=n(d,o.permitType)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",h=n(d,o.requestingParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",f=n(d,o.location)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",w=l(n(d,o.timeFrom))||u||new Date().toISOString(),x=l(n(d,o.timeTo)),A=n(d,o.totalTime)||this.calculateTotalTime(w,x),v=n(d,o.authorizedParty)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",U=n(d,o.workDescription)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",W=n(d,o.supervisor1)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_=n(d,o.supervisor2)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",D=n(d,o.status)||"\u0645\u0641\u062A\u0648\u062D";if(!c){r++;continue}const M=this.registryData.findIndex(F=>F.sequentialNumber===Number(c)||F.sequentialNumber===String(c)),R={id:M>=0?this.registryData[M].id:this.generateTemporaryId("REG"),sequentialNumber:Number(c)||this.generateRegistrySequentialNumber(),permitId:M>=0?this.registryData[M].permitId:null,openDate:u||new Date().toISOString(),permitType:m,requestingParty:h,location:f,timeFrom:w,timeTo:x||w,totalTime:A,authorizedParty:v,workDescription:U,supervisor1:W,supervisor2:_,status:D,closureDate:D==="\u0645\u063A\u0644\u0642"||D==="\u0645\u063A\u0644\u0642\u0629"?x||new Date().toISOString():null,closureReason:null,createdAt:M>=0?this.registryData[M].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};M>=0?(this.registryData[M]=R,i++):(this.registryData.push(R),a++)}catch(c){s++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0635\u0641:",c)}await this.saveRegistryData(),document.getElementById("ptw-registry-content")&&this.currentTab==="registry"&&this._refreshRegistryViewLight(!0),Loading.hide(),t.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D!
- \u062A\u0645 \u0625\u0636\u0627\u0641\u0629: ${a} \u0633\u062C\u0644
- \u062A\u0645 \u062A\u062D\u062F\u064A\u062B: ${i} \u0633\u062C\u0644
`+(r>0?`- \u062A\u0645 \u062A\u062E\u0637\u064A: ${r} \u0635\u0641 (\u0628\u062F\u0648\u0646 \u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
`:"")+(s>0?`- \u0623\u062E\u0637\u0627\u0621: ${s} \u0635\u0641`:""))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a),Notification.error(this._t("module.ptw.notify.importErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ")+(a.message||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}},renderList(e={}){const t=e.includeStats!==!1,{source:a,merged:i,permitsFromList:r,permitsFromRegistry:s}=this.getPermitMetricsDataset(),o=a.length>0,n=a.length,l=a.filter(f=>f&&this.isPermitOpenStatus(f.status)).length,p=a.filter(f=>f&&this.isPermitClosedStatus(f.status)).length,d=[...new Set(i.map(f=>(f.workType||"").trim()).filter(Boolean))].sort(),c=[...new Set(i.map(f=>(f.siteName||f.location||"").trim()).filter(Boolean))].sort(),u=[...new Set(i.map(f=>(f.sublocationName||f.sublocation||"").trim()).filter(Boolean))].sort(),m=["\u0645\u0641\u062A\u0648\u062D","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647","\u0645\u0631\u0641\u0648\u0636","\u0645\u063A\u0644\u0642","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A","\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"];return`${t?this.renderListStatsSection():`
            <div class="content-card mb-6" id="ptw-stats-section" data-stats-pending="1">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="kpi-card kpi-primary">
                            <div class="kpi-content">
                                <p class="kpi-value" id="ptw-open-count">${l}</p>
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
                                <p class="kpi-value" id="ptw-total-count">${n}</p>
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
                                ${u.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="ptw-filter-field">
                            <label class="ptw-filter-label" style="text-align: right;"><i class="fas fa-info-circle ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="ptw-filter-status" class="ptw-filter-input" style="direction: rtl;">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                                ${m.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
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
        `},updateKPIs(){try{const{source:e,merged:t,permitsFromList:a,permitsFromRegistry:i}=this.getPermitMetricsDataset(),r=e.length,s=e.filter(w=>w&&this.isPermitOpenStatus(w.status)).length,o=e.filter(w=>w&&this.isPermitClosedStatus(w.status)).length,n=w=>this.formatPtwMetricCount(w),l=document.getElementById("ptw-open-count"),p=document.getElementById("ptw-closed-count"),d=document.getElementById("ptw-total-count");if(l&&(l.textContent=n(s)),p&&(p.textContent=n(o)),d){d.textContent=n(r);const w=d.closest(".bg-gradient-to-br");if(w){const x=w.querySelector(".text-xs.text-gray-600");x&&(x.textContent=i.length>0?`\u0633\u062C\u0644 PTWRegistry: ${n(i.length)} \u0635\u0641`:`\u0645\u0646 ${n(a.length)} \u0642\u0627\u0626\u0645\u0629 PTW`)}}const c={};t.forEach(w=>{const x=w.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c[x]||(c[x]={total:0,open:0,closed:0}),c[x].total++,this.isPermitClosedStatus(w.status)?c[x].closed++:c[x].open++});const u=Object.entries(c).sort((w,x)=>x[1].total-w[1].total),m=u.length>0?u[0]:null,h=document.querySelector(".grid.grid-cols-1.md\\:grid-cols-4 .bg-gradient-to-br.from-purple-50");h&&m&&(h.innerHTML=`
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                                <i class="fas fa-tags text-white text-lg"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-purple-800">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</h3>
                                <p class="text-xs text-purple-600">${Object.keys(c).length} \u0646\u0648\u0639</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4 border border-purple-200">
                        <div class="font-semibold text-gray-800 text-sm mb-3 line-clamp-2" title="${Utils.escapeHTML(m[0])}">
                            ${Utils.escapeHTML(m[0].length>50?m[0].substring(0,50)+"...":m[0])}
                        </div>
                        <div class="flex items-center justify-between gap-3 text-xs">
                            <div class="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-blue-500 text-[8px]"></i>
                                <span class="text-blue-700 font-semibold">\u0645\u0641\u062A\u0648\u062D: ${m[1].open}</span>
                            </div>
                            <div class="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-green-500 text-[8px]"></i>
                                <span class="text-green-700 font-semibold">\u0645\u063A\u0644\u0642: ${m[1].closed}</span>
                            </div>
                            <div class="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                <i class="fas fa-circle text-gray-500 text-[8px]"></i>
                                <span class="text-gray-700 font-semibold">\u0625\u062C\u0645\u0627\u0644\u064A: ${m[1].total}</span>
                            </div>
                        </div>
                    </div>
                `);const f=document.getElementById("ptw-work-types-stats");f&&u.length>1&&(f.innerHTML=u.map(([w,x])=>`
                    <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800 text-sm mb-1 line-clamp-1" title="${Utils.escapeHTML(w)}">${Utils.escapeHTML(w)}</div>
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-blue-500 text-[8px]"></i>
                                    \u0645\u0641\u062A\u0648\u062D: ${x.open}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-green-500 text-[8px]"></i>
                                    \u0645\u063A\u0644\u0642: ${x.closed}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-circle text-gray-500 text-[8px]"></i>
                                    \u0625\u062C\u0645\u0627\u0644\u064A: ${x.total}
                                </span>
                            </div>
                        </div>
                        <div class="text-xl font-bold text-primary-600 ml-3">${x.total}</div>
                    </div>
                `).join(""))}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",e)}},_extractPermitTypeFields(e){if(!e)return[];const t=[],a=typeof IssuingAuthorities<"u"?IssuingAuthorities:null,i=l=>{if(!a||typeof a.mapPermitTypeToField!="function"||l==null)return;const p=typeof l=="string"?l:String(l);let d=a.mapPermitTypeToField(p.trim());!d&&/[،,]/.test(p)&&(d=a.mapPermitTypeToField(p.split(/[،,]/)[0].trim())),d&&!t.includes(d)&&t.push(d)};e.hotWorkDetails&&(!Array.isArray(e.hotWorkDetails)||e.hotWorkDetails.length>0)&&t.push("hotWork"),e.confinedSpaceDetails&&(!Array.isArray(e.confinedSpaceDetails)||e.confinedSpaceDetails.length>0)&&t.push("confinedSpace"),e.heightWorkDetails&&(!Array.isArray(e.heightWorkDetails)||e.heightWorkDetails.length>0)&&t.push("workAtHeight"),(e.lotoApplied===!0||e.lotoApplied==="true")&&t.push("loto"),e.coldWorkType&&String(e.coldWorkType).trim()&&t.push("coldWork"),(e.excavationLength||e.excavationWidth||e.excavationDepth||e.soilType&&String(e.soilType).trim())&&t.push("excavation");const r=String(e.permitType||e.workType||"").toLowerCase(),s=String(e.otherWorkType||"").toLowerCase(),o=String(e.electricalWorkType||"").toLowerCase(),n=`${r} ${s} ${o}`;return(n.includes("\u0645\u0642\u0627\u0648\u0644")||n.includes("contractor"))&&t.push("contractorPTW"),(n.includes("\u0631\u0641\u0639")||n.includes("lifting")||n.includes("\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639")||n.includes("crane"))&&t.push("liftingPlan"),e.permitType&&(Array.isArray(e.permitType)?e.permitType:String(e.permitType).split(/[،,|]/)).forEach(p=>i(typeof p=="string"?p.trim():p)),t.length===0&&e.workType&&!Array.isArray(e.workType)&&i(e.workType),[...new Set(t)]},async _buildIssuingAuthoritiesWorkflow(e){if(!e||e.length===0)return null;const t=typeof IssuingAuthorities<"u"?IssuingAuthorities:null;if(!t||typeof t.getAuthoritiesForApprovalRole!="function")return null;const a={permitType:e.join(", ")},[i,r]=await Promise.all([this._fetchIaCandidatesForRole(a,"areaManager"),this._fetchIaCandidatesForRole(a,"maintenanceEngineer")]),s=this._getHseSafetyTeamCandidates(),o=u=>({id:u.id||"",name:u.name||"",email:u.email||"",phone:u.phone||"",personType:u.personType||"employee",permitLevel:u.permitLevel||"G"}),n=[];let l=0;n.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:AppState.currentUser?.name||"",approverEmail:AppState.currentUser?.email||"",approverId:AppState.currentUser?.id||"",date:"",comments:"",order:l++,isSafetyOfficer:!1,candidates:[]}),n.push({role:"\u0645\u062F\u064A\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",required:!0,approved:!1,rejected:!1,status:"pending",approver:i.length===1&&i[0].name||"",approverEmail:i.length===1&&i[0].email||"",approverId:i.length===1&&i[0].id||"",date:"",comments:"",order:l++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"areaManager",candidates:i.map(o)}),n.push({role:"\u0645\u062F\u064A\u0631 / \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0635\u064A\u0627\u0646\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:r.length===1&&r[0].name||"",approverEmail:r.length===1&&r[0].email||"",approverId:r.length===1&&r[0].id||"",date:"",comments:"",order:l++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"maintenanceEngineer",candidates:r.map(o)}),n.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:l++,isSafetyOfficer:!0,candidates:s});let p=[];try{typeof t.getGeneralAuthoritiesForPermitTypes=="function"&&(p=await t.getGeneralAuthoritiesForPermitTypes(e))}catch(u){typeof Utils<"u"&&Utils.safeWarn("_buildIssuingAuthoritiesWorkflow general fetch error:",u)}const d=p.filter(u=>u.permitLevel==="G"),c=p.filter(u=>u.permitLevel==="Y");return d.length>0&&n.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (G)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:l++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,candidates:d.map(o)}),c.length>0&&(n.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (\u062A\u0646\u0633\u064A\u0642 Y)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:l++,isSafetyOfficer:!0,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!1,isHseCoApprovalGate:!0,candidates:s}),n.push({role:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Y - \u0628\u0639\u062F \u062A\u0646\u0633\u064A\u0642 HSE)",required:!0,approved:!1,rejected:!1,status:"pending",approver:"",approverEmail:"",approverId:"",date:"",comments:"",order:l++,isSafetyOfficer:!1,issuingAuthoritySource:!0,approvalRoleKey:"general",requiresHseCoApproval:!0,candidates:c.map(o)})),{approvals:n,circuitOwnerId:"__issuing_authorities__",circuitName:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639",issuingAuthoritiesSource:!0}},_getHseSafetyTeamCandidates(){try{const e=AppState?.appData?.safetyTeam||AppState?.formSettingsState?.safetyTeam||[];if(Array.isArray(e)&&e.length>0)return e.slice(0,5).map(t=>({id:t.id||t.employeeCode||"",name:t.name||t.memberName||"",email:t.email||"",phone:t.phone||""})).filter(t=>t.name)}catch{}return[]},async prepareApprovalsForForm(e=null){if(e&&e.isManualEntry===!0)return{approvals:e.manualApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Entry",isManual:!0};if(e&&Array.isArray(e.approvals)){const r=e.approvalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(e.approvals).map((o,n)=>ApprovalCircuits._attachMetadataToApproval(o,n,r)),circuitOwnerId:r,circuitName:e.approvalCircuitName||""}}try{const r=this._extractPermitTypeFields(e);if(r.length>0){const s=await this._getCachedIaWorkflow(r);if(s&&s.approvals&&s.approvals.length>0)return{approvals:this.normalizeApprovals(s.approvals),circuitOwnerId:s.circuitOwnerId,circuitName:s.circuitName,issuingAuthoritiesSource:!0}}}catch(r){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F workflow \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",r)}const t=AppState.currentUser?.id||"",a=ApprovalCircuits.generateApprovalsForUser(t);return{approvals:this.normalizeApprovals(a.approvals||[]),circuitOwnerId:a.circuitOwnerId||"__default__",circuitName:a.circuitName||""}},async prepareClosureApprovalsForForm(e=null){if(e&&e.isManualEntry===!0)return{approvals:e.manualClosureApprovals||[],circuitOwnerId:"__manual__",circuitName:"Manual Closure Entry",isManual:!0};if(e&&Array.isArray(e.closureApprovals)){const r=e.closureApprovalCircuitOwnerId||"__default__";return{approvals:this.normalizeApprovals(e.closureApprovals).map((o,n)=>ApprovalCircuits._attachMetadataToApproval(o,n,r)),circuitOwnerId:r,circuitName:e.closureApprovalCircuitName||""}}try{const r=this._extractPermitTypeFields(e);if(r.length>0){const s=await this._getCachedIaWorkflow(r);if(s&&s.approvals&&s.approvals.length>0)return{approvals:this.normalizeApprovals(s.approvals),circuitOwnerId:s.circuitOwnerId,circuitName:s.circuitName,issuingAuthoritiesSource:!0}}}catch(r){typeof Utils<"u"&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u0648\u0644\u064A\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0645\u0646 IssuingAuthorities\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 ApprovalCircuits:",r)}const t=AppState.currentUser?.id||"",a=ApprovalCircuits.generateApprovalsForUser(t);return{approvals:this.normalizeApprovals(a.approvals||[]),circuitOwnerId:a.circuitOwnerId||"__default__",circuitName:a.circuitName||""}},renderPermitSystemHeader(e={}){const t=e?.forPdf===!0,a=AppState?.companySettings||{},i=a.name||a.companyName||a.organizationName||"HSE System",r=String(a.secondaryName||a.departmentName||a.managementName||"").trim(),s=a.logoUrl||a.companyLogo||a.logo||AppState?.companyLogo||"",o="\u0646\u0645\u0648\u0630\u062C \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",n="Permit To Work",l=d=>Utils.escapeHTML(d),p=s?`<img src="${l(s)}" alt="Company Logo" class="ptw-paper-header-logo">`:'<div class="ptw-paper-header-logo-fallback">LOGO</div>';return t?`
            <div class="ptw-paper-header ptw-paper-header-pdf">
                <table class="ptw-paper-header-table" dir="rtl" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="ptw-ph-cell ptw-ph-right" valign="middle">
                            <div class="ptw-paper-header-company" dir="rtl">${l(i)}</div>
                            ${r?`<div class="ptw-paper-header-dept" dir="rtl">${l(r)}</div>`:""}
                        </td>
                        <td class="ptw-ph-cell ptw-ph-center" valign="middle">
                            <div class="ptw-paper-header-form-title" dir="rtl">${l(o)}</div>
                            <div class="ptw-paper-header-form-subtitle" dir="ltr">${l(n)}</div>
                        </td>
                        <td class="ptw-ph-cell ptw-ph-left" valign="middle">${p}</td>
                    </tr>
                </table>
            </div>`:`
            <div class="ptw-paper-header">
                <div class="ptw-paper-header-right">
                    <div class="ptw-paper-header-company">${l(i)}</div>
                    ${r?`<div class="ptw-paper-header-dept">${l(r)}</div>`:""}
                </div>
                <div class="ptw-paper-header-center">
                    <div class="ptw-paper-header-form-title">${l(o)}</div>
                    <div class="ptw-paper-header-form-subtitle">${l(n)}</div>
                </div>
                <div class="ptw-paper-header-left">${p}</div>
            </div>
        `},renderPermitSystemFooter(e={}){const t=AppState?.companySettings||{},a=t.name||t.companyName||t.organizationName||"HSE System",i=String(t.secondaryName||t.departmentName||t.managementName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),r=p=>Utils.escapeHTML(p==null?"":String(p)),s=r(e.formCode||"PTW-MANUAL"),o=p=>{if(!p)return"\u2014";try{const d=new Date(p);return isNaN(d.getTime())?r(p):r(d.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"}))}catch{return r(p)}},n=o(e.issueDate||e.releaseDate||e.createdAt),l=o(e.revisionDate||e.updatedAt||e.issueDate||e.createdAt);return`
            <div class="ptw-paper-footer">
                <div class="ptw-paper-footer-frame">
                    <div class="ptw-paper-footer-meta" dir="rtl">
                        <span class="ptw-pf-item">\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: ${s}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${n}</span>
                        <span class="ptw-pf-item">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u062F\u064A\u0644: ${l}</span>
                    </div>
                    <div class="ptw-paper-footer-company" dir="rtl">
                        <span>${r(a)}</span>
                        <span>${r(i)}</span>
                    </div>
                </div>
            </div>`},async renderForm(e=null){const t=!!e,a=e?.isManualEntry===!0,i=await this.prepareApprovalsForForm(e),r=i.approvals||[];this.formApprovals=r.map(b=>Object.assign({},b)),this.formCircuitOwnerId=i.circuitOwnerId||"__default__";const s=i.circuitName||"";this.formCircuitName=s;const o=await this.prepareClosureApprovalsForForm(e),n=e?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",l=b=>Utils.escapeHTML(b||""),p=Array.isArray(e?.teamMembers)&&e.teamMembers.length>0?e.teamMembers:[{name:""}],d=Array.isArray(e?.hotWorkDetails)?e.hotWorkDetails:[],c=Array.isArray(e?.confinedSpaceDetails)?e.confinedSpaceDetails:[],u=Array.isArray(e?.heightWorkDetails)?e.heightWorkDetails:[],m=e?.hotWorkOther||"",h=e?.confinedSpaceOther||"",f=e?.heightWorkOther||"",w=e?.id||e?.permitId||null,x=this.buildKnownEquipmentHistoryLabels(w),A=this.parseEquipmentToSelection(e?.equipment,x),v=this.buildManualFixedEquipmentCheckboxesHtml(A.matrixSelected,x),U=e?.closureStatus||"",W=e?.closureTime?Utils.toDateTimeLocalString(e.closureTime):"",_=e?.closureReason||"",D=typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?(Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!0})||[]).map(b=>({name:(b.name||"").trim()})).filter(b=>b.name):[],M=D.length>0,R=e?.authorizedParty||"",F=this.getDepartmentOptionsForPTW(),k=F.length>0,S=e?.requestingParty||"",I=[{id:"welding",label:"\u0644\u062D\u0627\u0645"},{id:"cutting",label:"\u0642\u0637\u0639"},{id:"spark",label:"\u0634\u0631\u0631 / \u062D\u0631\u0627\u0631\u0629"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],B=[{id:"tanks",label:"\u062E\u0632\u0627\u0646\u0627\u062A"},{id:"pipes",label:"\u0623\u0646\u0627\u0628\u064A\u0628"},{id:"containers",label:"\u062A\u0646\u0643\u0627\u062A"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],O=[{id:"scaffold",label:"\u0633\u0642\u0627\u0644\u0627\u062A"},{id:"roof",label:"\u0633\u0637\u062D"},{id:"lift",label:"\u0633\u0644\u0629 \u0631\u0627\u0641\u0639"},{id:"other",label:"\u0623\u062E\u0631\u0649",hasOther:!0}],V=(b,$,j,C="")=>b.map(y=>{const G=y.hasOther?!!C:$.includes(y.label),P=y.hasOther?` data-toggle-target="#${j}-other-wrapper"`:"",H=`
                    <label class="ptw-check-option">
                        <input type="checkbox" class="ptw-check-input" name="${j}-option" value="${y.id}" data-label="${y.label}"${P} ${G?"checked":""}>
                        <span>${y.label}</span>
                    </label>
                `;return y.hasOther?`
                        ${H}
                        <div id="${j}-other-wrapper" class="ptw-other-input ${G?"":"hidden"}">
                            <input type="text" id="${j}-other-text" class="form-input" placeholder="\u0627\u0630\u0643\u0631 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" value="${l(C)}">
                        </div>
                    `:H}).join(""),te=p.map(b=>`
            <div class="ptw-team-member-row flex items-center gap-3">
                <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${l(b.name)}">
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
                             <i class="fas fa-${t?"edit":"plus"}"></i>
                        </span>
                        ${t?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644":"\u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644 \u062C\u062F\u064A\u062F"}
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
                                    placeholder="\u0623\u062F\u062E\u0644 \u0646\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0647\u0646\u0627...">${l(e?.permitDisclaimer||`\u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0641\u0642\u0637 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0645 \u0648\u0635\u0641\u0647 \u0623\u062F\u0646\u0627\u0647
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
                                        ${this.getSiteOptions().map(b=>`
                                            <option value="${Utils.escapeHTML(b.id)}" ${e&&(e.locationId===b.id||e.locationId===String(b.id)||e.siteId===b.id||e.siteId===String(b.id)||e.location===b.id&&!e.locationId&&!e.siteId)?"selected":""}>
                                                ${Utils.escapeHTML(b.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div id="ptw-sublocation-wrapper" style="display: ${e?.locationId||e?.siteId||e?.location?"block":"none"};">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="ptw-sublocation" name="sublocation" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${this.getPlaceOptions(e?.locationId||e?.siteId||e?.location||"").map(b=>`
                                            <option value="${Utils.escapeHTML(b.id)}" ${e&&(e.sublocationId===b.id||e.sublocationId===String(b.id)||e.sublocation===b.id&&!e.sublocationId||e.sublocationName===b.name)?"selected":""}>
                                                ${Utils.escapeHTML(b.name)}
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
                                    ${M?`
                                        <div class="relative">
                                            <select id="ptw-authorizedParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</option>
                                                ${D.map(b=>`
                                                    <option value="${Utils.escapeHTML(b.name||"")}" ${R===b.name?"selected":""}>
                                                        ${Utils.escapeHTML(b.name||"")}
                                                    </option>
                                                `).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${l(R)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-authorizedParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${l(R)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 \u0628\u0627\u0644\u0639\u0645\u0644">
                                    `}
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D</label>
                                    ${k?`
                                        <div class="relative">
                                            <select id="ptw-requestingParty-select" class="form-input transition-all focus:ring-2 focus:ring-blue-200">
                                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>
                                                ${F.map(b=>`<option value="${l(b)}" ${S===b?"selected":""}>${l(b)}</option>`).join("")}
                                                <option value="__custom__">\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A</option>
                                            </select>
                                            <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200 mt-2 hidden"
                                                value="${l(S)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                        </div>
                                    `:`
                                        <input type="text" id="ptw-requestingParty" class="form-input transition-all focus:ring-2 focus:ring-blue-200"
                                            value="${l(S)}" placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D">
                                    `}
                                </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-equipment ptw-equipment-field-wrap">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <div id="ptw-equipment-matrix" class="ptw-form-equipment-body">
                                        ${v}
                                    </div>
                                    <div class="ptw-form-equipment-notes-frame">
                                        <label>\u0625\u0636\u0627\u0641\u064A</label>
                                        <textarea id="ptw-equipment-notes" class="form-input bg-white w-full" rows="1" placeholder="\u0645\u0639\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629...">${l(A.manualNotes||"")}</textarea>
                                    </div>
                                </div>
                                <div class="ptw-s1-block ptw-s1-tools">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F (\u0628\u0639\u062F \u0641\u062D\u0635\u0647\u0627 \u0648\u0642\u0628\u0648\u0644\u0647\u0627)</label>
                                    <textarea id="ptw-tools" class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F">${l(e?.tools||e?.toolsList)}</textarea>
                                </div>
                                <div class="ptw-s1-block ptw-s1-work-desc">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644 <span class="text-red-500">*</span></label>
                                    <textarea id="ptw-workDescription" name="workDescription" required class="form-input transition-all focus:ring-2 focus:ring-blue-200" rows="3"
                                            placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0639\u0645\u0644">${l(e?.workDescription)}</textarea>
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
                                ${te}
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
                                        ${V(I,d,"ptw-hot",m)}
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 class="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629</h4>
                                    <div class="space-y-2">
                                        ${V(B,c,"ptw-confined",h)}
                                    </div>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 class="font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639</h4>
                                    <div class="space-y-2">
                                        ${V(O,u,"ptw-height",f)}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621</label>
                                    <input type="text" id="ptw-electrical-work-type" class="form-input" value="${l(e?.electricalWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F</label>
                                    <input type="text" id="ptw-cold-work-type" class="form-input" value="${l(e?.coldWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649</label>
                                    <input type="text" id="ptw-other-work-type" class="form-input" value="${l(e?.otherWorkType)}" placeholder="\u0627\u0630\u0643\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649 (\u0625\u0646 \u0648\u062C\u062F\u062A)">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <div class="md:col-span-4 font-bold text-yellow-800 mb-2 flex items-center">
                                    <i class="fas fa-digging ml-2"></i>
                                    \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0641\u0631 (\u0625\u0646 \u0648\u062C\u062F)
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0637\u0648\u0644 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-length" class="form-input" value="${l(e?.excavationLength)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0631\u0636 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-width" class="form-input" value="${l(e?.excavationWidth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0645\u0642 (\u0645)</label>
                                    <input type="text" id="ptw-excavation-depth" class="form-input" value="${l(e?.excavationDepth)}" placeholder="\u2014">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629</label>
                                    <input type="text" id="ptw-excavation-soil" class="form-input" value="${l(e?.soilType)}" placeholder="\u0645\u062B\u0627\u0644: \u0631\u0645\u0644\u064A\u0629">
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
                                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629">${l(e?.riskNotes)}</textarea>
                                
                                <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 \u0644\u062D\u0641\u0638 \u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 -->
                                <input type="hidden" id="ptw-risk-likelihood" value="${e?.riskAssessment?.likelihood||""}">
                                <input type="hidden" id="ptw-risk-consequence" value="${e?.riskAssessment?.consequence||""}">
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
                                ${(()=>{const b=e?.manualApprovals||[];return b.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                    ${b.map($=>`
                                                        <tr>
                                                            <td>${Utils.escapeHTML($.role||"")}</td>
                                                            <td>${Utils.escapeHTML($.name||"-")}</td>
                                                            <td>${Utils.escapeHTML($.signature||"-")}</td>
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
                                    ${this.renderApprovalMatrix(r,t)}
                                </div>
                                ${t?'<button type="button" id="add-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
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
                                    <input type="datetime-local" id="ptw-closure-time" class="form-input" value="${W}">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0633\u0628\u0628:</label>
                                    <input type="text" id="ptw-closure-reason" class="form-input" value="${l(_)}" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642">
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
                                ${(()=>{const b=e?.manualClosureApprovals||[];return b.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                    ${b.map($=>`
                                                        <tr>
                                                            <td>${Utils.escapeHTML($.role||"")}</td>
                                                            <td>${Utils.escapeHTML($.name||"-")}</td>
                                                            <td>${Utils.escapeHTML($.signature||"-")}</td>
                                                        </tr>
                                                    `).join("")}
                                                </tbody>
                                            </table>
                                        </div>
                                    `})()}
                            `:`
                                ${(()=>{const b=o.approvals||[];this.formClosureApprovals=b.map(j=>Object.assign({},j)),this.formClosureCircuitOwnerId=o.circuitOwnerId||"__default__";const $=o.circuitName||"";return this.formClosureCircuitName=$,`
                                        <input type="hidden" id="closure-approval-circuit-owner-id" value="${this.formClosureCircuitOwnerId||""}">
                                        ${$?`<div class="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-4 inline-flex items-center"><i class="fas fa-route ml-2"></i>\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062D\u0627\u0644\u064A: <strong>${Utils.escapeHTML($)}</strong></div>`:""}

                                        <div id="closure-approval-matrix" class="space-y-4 bg-white rounded-lg border border-gray-100 p-2">
                                            ${this.renderClosureApprovalMatrix(b,t)}
                                        </div>
                                        ${t?'<button type="button" id="add-closure-approval-btn" class="btn-secondary mt-4"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u064A\u062F\u0648\u064A\u0629</button>':""}
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
                                    ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `},renderApprovalMatrix(e=[],t=!1){return e=this.normalizeApprovals(e),this.formApprovals=e.map((a,i)=>Object.assign({},a,{order:i})),`
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
                        ${e.map((a,i)=>`
                            <tr data-approval-index="${i}" data-required="${a.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(a.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="approval-role-${i}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(a,i,t)}
                                </td>
                                <td>
                                    ${(()=>{const r=a.status==="approved"?"badge-success":a.status==="rejected"?"badge-danger":"badge-warning",s=a.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":a.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${r}">${s}</span>`})()}
                                    <input type="hidden" id="approval-status-${i}" value="${a.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${a.date?Utils.toDateTimeLocalString(a.date):""}"
                                        id="approval-date-${i}" ${t?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(a.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="approval-comments-${i}" >
                                </td>
                                <td>
                                    ${a.candidates&&a.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},renderClosureApprovalMatrix(e=[],t=!1){return e=this.normalizeApprovals(e),this.formClosureApprovals||(this.formClosureApprovals=[]),this.formClosureApprovals=e.map((a,i)=>Object.assign({},a,{order:i})),`
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
                        ${e.map((a,i)=>`
                            <tr data-closure-approval-index="${i}" data-required="${a.required!==!1}">
                                <td>
                                    <input type="text" class="form-input" style="min-width: 180px;"
                                        value="${Utils.escapeHTML(a.role||"")}" placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642"
                                        id="closure-approval-role-${i}" readonly>
                                </td>
                                <td>
                                    ${this._renderSystemApproverCell(a,i,t,"closure-approval")}
                                </td>
                                <td>
                                    ${(()=>{const r=a.status==="approved"?"badge-success":a.status==="rejected"?"badge-danger":"badge-warning",s=a.status==="approved"?"\u0645\u0639\u062A\u0645\u062F":a.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";return`<span class="badge ${r}">${s}</span>`})()}
                                    <input type="hidden" id="closure-approval-status-${i}" value="${a.status}">
                                </td>
                                <td>
                                    <input type="datetime-local" class="form-input" style="min-width: 180px;"
                                        value="${a.date?Utils.toDateTimeLocalString(a.date):""}"
                                        id="closure-approval-date-${i}" ${t?"":"readonly"}>
                                </td>
                                <td>
                                    <input type="text" class="form-input" style="min-width: 200px;"
                                        value="${Utils.escapeHTML(a.comments||"")}" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
                                        id="closure-approval-comments-${i}" >
                                </td>
                                <td>
                                    ${a.candidates&&a.candidates.length>0?'<p class="text-xs text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>':""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},getStatusBadgeClass(e){return{\u0645\u0641\u062A\u0648\u062D:"warning","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"info","\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"success",\u0645\u0631\u0641\u0648\u0636:"danger",\u0645\u063A\u0644\u0642:"secondary"}[e]||"secondary"},setupEventListeners(e=null){setTimeout(()=>{const t=document.getElementById("ptw-refresh-header-btn");if(t){t.replaceWith(t.cloneNode(!0));const S=document.getElementById("ptw-refresh-header-btn");S&&S.addEventListener("click",()=>this.refreshCurrentTab())}const a=document.getElementById("add-ptw-btn"),i=document.getElementById("add-ptw-empty-btn");if(a)if(a.parentNode&&document.body.contains(a))try{a.replaceWith(a.cloneNode(!0));const S=document.getElementById("add-ptw-btn");S&&S.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()})}catch(S){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0644\u0632\u0631 add-ptw-btn:",S),a.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()})}else a.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F"),this.showForm()});if(i)if(i.parentNode&&document.body.contains(i))try{i.replaceWith(i.cloneNode(!0));const S=document.getElementById("add-ptw-empty-btn");S&&S.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()})}catch(S){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A replaceWith \u0644\u0644\u0632\u0631 add-ptw-empty-btn:",S),i.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()})}else i.addEventListener("click",()=>{Utils.safeLog("\u{1F5B1}\uFE0F \u062A\u0645 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0625\u0635\u062F\u0627\u0631 \u062A\u0635\u0631\u064A\u062D \u062C\u062F\u064A\u062F (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629)"),this.showForm()});const r=document.getElementById("ptw-search"),s=document.getElementById("ptw-filter-status"),o=document.getElementById("ptw-filter-work-type"),n=document.getElementById("ptw-filter-location"),l=document.getElementById("ptw-filter-sublocation"),p=document.getElementById("ptw-filter-date-from"),d=document.getElementById("ptw-filter-date-to"),c=()=>this.filterItems();r&&r.addEventListener("input",c),s&&s.addEventListener("change",c),o&&o.addEventListener("change",c),n&&n.addEventListener("change",()=>{this.updateSublocationFilterOptions(),c()}),l&&l.addEventListener("change",c),p&&p.addEventListener("change",c),d&&d.addEventListener("change",c);const u=document.getElementById("ptw-reset-filters");u&&u.addEventListener("click",()=>{r&&(r.value=""),s&&(s.value=""),o&&(o.value=""),n&&(n.value=""),l&&(l.value=""),p&&(p.value=""),d&&(d.value=""),this.updateSublocationFilterOptions(),this.filterItems()});const m=document.getElementById("ptw-refresh-list");m&&m.addEventListener("click",()=>this.loadPTWList(!0));const h=document.getElementById("ptw-form");h&&h.addEventListener("submit",S=>this.handleSubmit(S));const f=document.getElementById("cancel-ptw-btn");f&&f.addEventListener("click",()=>this.showList());const w=document.getElementById("print-ptw-btn");w&&w.addEventListener("click",()=>{this.printPermitForm()});const x=document.getElementById("add-approval-btn");x&&x.addEventListener("click",()=>this.addApproval());const A=document.getElementById("add-closure-approval-btn");A&&A.addEventListener("click",()=>this.addClosureApproval()),this._setupSystemApproverPickerListeners(document.getElementById("approval-matrix")),this._setupSystemApproverPickerListeners(document.getElementById("closure-approval-matrix")),this.setupDisclaimerFontControls();const v=document.getElementById("add-team-member-btn");v&&v.addEventListener("click",()=>this.addTeamMemberRow()),document.querySelectorAll("[data-toggle-target]").forEach(S=>{const I=S.getAttribute("data-toggle-target");if(!I)return;const B=document.querySelector(I);if(!B)return;const O=()=>{S.checked?B.classList.remove("hidden"):B.classList.add("hidden")};S.addEventListener("change",O),O()});const W=document.getElementById("ptw-location"),_=document.getElementById("ptw-sublocation-wrapper"),D=document.getElementById("ptw-sublocation");if(W&&_&&D){const S=()=>{try{const I=W.value;if(I){_.style.display="block";const B=this.getPlaceOptions(I),O=D.value;D.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+B.map(V=>{let te=O===V.id;return!te&&e&&(te=e.sublocation===V.id||e.sublocationId===V.id||e.sublocationName===V.name||e.locationName===V.name),`<option value="${Utils.escapeHTML(V.id)}" ${te?"selected":""}>${Utils.escapeHTML(V.name)}</option>`}).join("")}else _.style.display="none",D.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',D.value=""}catch(I){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:",I)}};W.addEventListener("change",S),S()}const M=document.getElementById("ptw-authorizedParty-select"),R=document.getElementById("ptw-authorizedParty");M&&R&&(M.addEventListener("change",()=>{M.value==="__custom__"?(R.classList.remove("hidden"),M.classList.add("hidden"),R.focus()):M.value?(R.classList.add("hidden"),R.value=M.value):(R.classList.add("hidden"),R.value="")}),R.value&&!Array.from(M.options).some(S=>S.value===R.value)?(R.classList.remove("hidden"),M.classList.add("hidden")):M.value&&M.value!=="__custom__"&&(R.value=M.value));const F=document.getElementById("ptw-requestingParty-select"),k=document.getElementById("ptw-requestingParty");F&&k&&(F.addEventListener("change",()=>{F.value==="__custom__"?(k.classList.remove("hidden"),F.classList.add("hidden"),k.focus()):F.value?(k.classList.add("hidden"),k.value=F.value):(k.classList.add("hidden"),k.value="")}),k.value&&!Array.from(F.options).some(S=>S.value===k.value.trim())?(k.classList.remove("hidden"),F.classList.add("hidden")):F.value&&F.value!=="__custom__"&&(k.value=F.value)),this.updateStatusField()},100)},currentEditId:null,async showForm(e=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}this.currentEditId=e?.id||null;const t=document.createElement("div");t.className="modal-overlay",t.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;";const a=await this.renderForm(e);t.innerHTML=`
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
                    ${a}
                </div>
            </div>
        `,document.body.appendChild(t),this.setupEventListeners(e),setTimeout(()=>{const i=t.querySelector('input:not([type="hidden"]), select, textarea');i&&i.focus()},100)},async showList(){this.currentEditId=null,this.switchTab("permits"),await new Promise(t=>setTimeout(t,50));const e=document.getElementById("ptw-permits-content")||document.getElementById("ptw-content");e&&(e.style.display="block",e.style.visibility="visible",e.style.opacity="1",e.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadPTWList(!0),setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))},async handleSubmit(e){if(e.preventDefault(),this._isSubmitting){Notification.info(this._t("module.ptw.notify.waitRequest","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0633\u0627\u0628\u0642\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const t=e.target?.querySelector('button[type="submit"]')||document.querySelector('#ptw-form button[type="submit"]')||e.target?.closest("form")?.querySelector('button[type="submit"]');if(t&&t.disabled)return;this._isSubmitting=!0;let a="";t&&(a=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=!this.currentEditId,r=[];document.querySelectorAll("#approvals-tbody tr").forEach((S,I)=>{const B=Array.isArray(this.formApprovals)?this.formApprovals[I]||{}:{},V=document.getElementById(`approval-role-${I}`)?.value.trim()||B.role||"",te=S.getAttribute("data-required")!=="false",b=document.getElementById(`approval-approver-select-${I}`);let $=B.approverId||"",j=B.approver||"",C=B.approverEmail||"";if(b)if($=b.value||"",$==="__manual__")$="",j=document.getElementById(`approval-approver-manual-${I}`)?.value.trim()||"",C="";else if($){const ie=(B.candidates||[]).find(ee=>ee.id===$);if(ie)j=ie.name||"",C=ie.email||"";else{const ee=ApprovalCircuits.getUserById($);ee&&(j=ee.name||ee.email||j,C=ee.email||C)}}else j="",C="";else j=document.getElementById(`approval-approver-${I}`)?.value.trim()||j;const G=document.getElementById(`approval-status-${I}`)?.value||B.status||"pending",H=document.getElementById(`approval-date-${I}`)?.value||"",ne=document.getElementById(`approval-comments-${I}`)?.value.trim()||"";V&&r.push({role:V,approver:j,approverId:$,approverEmail:C,status:G,approved:G==="approved",rejected:G==="rejected",date:H?new Date(H).toISOString():B.date||"",comments:ne,order:I,required:te,candidates:Array.isArray(B.candidates)?B.candidates:[],history:Array.isArray(B.history)?B.history:[],assignedAt:B.assignedAt||"",assignedBy:B.assignedBy||null,isSafetyOfficer:B.isSafetyOfficer===!0,circuitOwnerId:B.circuitOwnerId||this.formCircuitOwnerId||"__default__",issuingAuthoritySource:B.issuingAuthoritySource===!0,approvalRoleKey:B.approvalRoleKey||this._resolveIaRoleKey(V),isManualApprover:!$&&!!j,personType:$&&(B.candidates||[]).find(ie=>ie.id===$)?.personType||"",requiresHseCoApproval:B.requiresHseCoApproval===!0,isHseCoApprovalGate:B.isHseCoApprovalGate===!0})});const o=S=>{const I=[];return document.querySelectorAll(`input[name="${S}-option"]`).forEach(B=>{if(B.checked)if(B.value==="other"){const O=document.getElementById(`${S}-other-text`)?.value.trim();O&&I.push(O)}else{const O=B.getAttribute("data-label")||B.value;I.push(O)}}),I},n=o("ptw-hot"),l=o("ptw-confined"),p=o("ptw-height"),d=document.getElementById("ptw-hot-other-text")?.value.trim()||"",c=document.getElementById("ptw-confined-other-text")?.value.trim()||"",u=document.getElementById("ptw-height-other-text")?.value.trim()||"",m=()=>Array.from(document.querySelectorAll("#team-members-list .ptw-team-member-row")).map(S=>{const I=S.querySelector(".ptw-team-member-name")?.value.trim();return I?{name:I}:null}).filter(Boolean),h=document.getElementById("ptw-workDescription"),f=document.getElementById("ptw-startDate"),w=document.getElementById("ptw-endDate");if(!h||!f||!w){Notification.error(this._t("module.ptw.notify.missingFormFields","\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),t&&(t.disabled=!1,t.innerHTML=a);return}const x="",A="PTW",v=this.generateSequentialPTWId(""),U=this.currentEditId?AppState.appData.ptw.find(S=>S.id===this.currentEditId):null,W=document.getElementById("ptw-location"),_=document.getElementById("ptw-sublocation"),D=W?.value||"",M=W?.options[W?.selectedIndex]?.text||"",R=_?.value||"",F=_?.options[_?.selectedIndex]?.text||"",k={id:this.currentEditId||`${A}_${v}`,workType:"",workDescription:h.value.trim(),location:M||D,siteId:D,siteName:M,sublocation:F||R,sublocationId:R,sublocationName:F,startDate:(()=>{const S=f.value;return S&&Utils.dateTimeLocalToISO(S)||""})(),endDate:(()=>{const S=w.value;return S&&Utils.dateTimeLocalToISO(S)||""})(),status:U?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",approvals:this.normalizeApprovals(r),requiredPPE:typeof PPEMatrix<"u"?PPEMatrix.getSelected():[],riskAssessment:(()=>{if(typeof RiskMatrix>"u")return{};try{const S=document.querySelector("#ptw-risk-matrix .risk-matrix-cell.selected")||document.querySelector("#ptw-risk-matrix td.ring-2")||document.querySelector('#ptw-risk-matrix .risk-matrix-cell[data-selected="true"]');if(S){const I=S.getAttribute("data-likelihood")||S.getAttribute("data-probability")||"",B=S.getAttribute("data-consequence")||S.getAttribute("data-severity")||"",O=S.textContent.trim()||S.querySelector(".risk-matrix-cell-value")?.textContent.trim()||"";return{likelihood:I,consequence:B,riskLevel:O}}}catch(S){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",S)}return{}})(),riskNotes:document.getElementById("ptw-risk-notes")?.value.trim()||"",authorizedParty:(()=>{const S=document.getElementById("ptw-authorizedParty-select"),I=document.getElementById("ptw-authorizedParty");return S&&S.value&&S.value!=="__custom__"?S.value.trim():I?I.value.trim():""})(),requestingParty:(()=>{const S=document.getElementById("ptw-requestingParty-select"),I=document.getElementById("ptw-requestingParty");return S&&S.value&&S.value!=="__custom__"?S.value.trim():I?I.value.trim():""})(),equipment:this.collectEquipmentFieldValue(document,{matrixId:"#ptw-equipment-matrix",notesId:"#ptw-equipment-notes"}),tools:document.getElementById("ptw-tools")?.value.trim()||"",toolsList:document.getElementById("ptw-tools")?.value.trim()||"",teamMembers:m(),hotWorkDetails:n,hotWorkOther:d,confinedSpaceDetails:l,confinedSpaceOther:c,heightWorkDetails:p,heightWorkOther:u,electricalWorkType:document.getElementById("ptw-electrical-work-type")?.value.trim()||"",coldWorkType:document.getElementById("ptw-cold-work-type")?.value.trim()||"",otherWorkType:document.getElementById("ptw-other-work-type")?.value.trim()||"",excavationLength:document.getElementById("ptw-excavation-length")?.value.trim()||"",excavationWidth:document.getElementById("ptw-excavation-width")?.value.trim()||"",excavationDepth:document.getElementById("ptw-excavation-depth")?.value.trim()||"",soilType:document.getElementById("ptw-excavation-soil")?.value.trim()||"",preStartChecklist:document.getElementById("ptw-preStartChecklist")?.checked||!1,lotoApplied:document.getElementById("ptw-lotoApplied")?.checked||!1,governmentPermits:document.getElementById("ptw-governmentPermits")?.checked||!1,riskAssessmentAttached:document.getElementById("ptw-riskAssessmentAttached")?.checked||!1,gasTesting:document.getElementById("ptw-gasTesting")?.checked||!1,mocRequest:document.getElementById("ptw-mocRequest")?.checked||!1,closureStatus:document.querySelector('input[name="ptw-closure-status"]:checked')?.value||"",closureTime:(()=>{const S=document.getElementById("ptw-closure-time")?.value;return S&&Utils.dateTimeLocalToISO(S)||""})(),closureReason:document.getElementById("ptw-closure-reason")?.value.trim()||"",closureApproval:{name1:document.getElementById("ptw-closure-approval-name-1")?.value.trim()||"",name2:document.getElementById("ptw-closure-approval-name-2")?.value.trim()||"",name3:document.getElementById("ptw-closure-approval-name-3")?.value.trim()||"",name4:document.getElementById("ptw-closure-approval-name-4")?.value.trim()||"",signature1:document.getElementById("ptw-closure-approval-signature-1")?.value.trim()||"",signature2:document.getElementById("ptw-closure-approval-signature-2")?.value.trim()||"",signature3:document.getElementById("ptw-closure-approval-signature-3")?.value.trim()||"",signature4:document.getElementById("ptw-closure-approval-signature-4")?.value.trim()||""},permitDisclaimer:document.getElementById("ptw-permit-disclaimer-text")?.value.trim()||U?.permitDisclaimer||"",createdAt:U?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),approvalCircuitOwnerId:this.formCircuitOwnerId||U?.approvalCircuitOwnerId||"__default__",approvalCircuitName:this.formCircuitName||U?.approvalCircuitName||""};if(this.updatePermitStatus(k),i&&(k.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),this.updateStatusField(k.status),k.startDate&&k.endDate){const S=this.parseDateTimeValue(k.startDate),I=this.parseDateTimeValue(k.endDate);if(S&&I&&I<=S){Notification.error(this._t("module.ptw.notify.endBeforeStart","\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621.")),this._isSubmitting=!1,t&&(t.disabled=!1,t.innerHTML=a);return}}if(!k.workDescription||!k.location||!k.status){Notification.error(this._t("module.ptw.notify.fillRequired","\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629")),this._isSubmitting=!1,t&&(t.disabled=!1,t.innerHTML=a);return}if(i&&this.formCircuitOwnerId==="__issuing_authorities__"&&(!k.approvals||k.approvals.length===0)&&this._extractPermitTypeFields(k).length>0){Notification.error("\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u0634\u062E\u0627\u0635 \u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D. \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 (Issuing Authorities) \u0623\u0648 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this._isSubmitting=!1,t&&(t.disabled=!1,t.innerHTML=a);return}try{if(this.currentEditId){const S=AppState.appData.ptw.findIndex(I=>I.id===this.currentEditId);if(S!==-1){const B=AppState.appData.ptw[S].status!=="\u0645\u063A\u0644\u0642",O=k.status==="\u0645\u063A\u0644\u0642"||k.closureStatus&&k.closureTime;AppState.appData.ptw[S]=k,k._wasClosedTransition=!!(B&&O)}}else AppState.appData.ptw.push(k),this.notifyPermitCreated(k);this.setPtwRegistryState(this.registryData,"handleSubmit.preBackground"),this.showList(),this._isSubmitting=!1,t&&(t.disabled=!1,t.innerHTML=a),Notification.info(this._t("module.ptw.notify.localSavedSyncing","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u062C\u0627\u0631\u064D \u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...")),Promise.allSettled([Promise.resolve().then(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}),this.currentEditId?this.updateRegistryEntry(k):this.addToRegistry(k),GoogleIntegration.autoSave("PTW",AppState.appData.ptw)]).then(S=>{const I=S[0]?.status==="rejected",B=S[1]?.status==="rejected",O=S[2],V=O?.status==="fulfilled"?O.value:null,te=!!(V&&V.success===!0);if(I&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",S[0]?.reason),B&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",S[1]?.reason),te)this.currentEditId?k._wasClosedTransition?Notification.success(this._t("module.ptw.notify.closeOk","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permUpdateOk","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")):Notification.success(this._t("module.ptw.notify.permAddOk","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D"));else{const $=O?.status==="rejected"?O.reason?.message||String(O.reason||""):V?.message||"";Notification.warning(this._t("module.ptw.notify.cloudSyncFailed","\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062D\u0627\u0628\u0629: ")+($||this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}this.triggerNotificationsUpdate(),this.updateKPIs();const b=document.getElementById("ptw-analysis-content");b&&b.style.display!=="none"&&(b.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())})}catch(S){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+S.message),this._isSubmitting=!1,t&&(t.disabled=!1,t.innerHTML=a)}},addTeamMemberRow(e=""){const t=document.getElementById("team-members-list");if(!t||!t.parentNode||!document.body.contains(t)){Utils.safeWarn("\u26A0\uFE0F addTeamMemberRow: container \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const a=typeof Utils<"u"&&Utils&&typeof Utils.escapeHTML=="function"?Utils.escapeHTML(e||""):e||"",i=document.createElement("div");i.className="ptw-team-member-row flex items-center gap-3",i.innerHTML=`
            <input type="text" class="form-input flex-1 ptw-team-member-name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644" value="${a}">
            <button type="button" class="btn-icon btn-icon-danger" onclick="PTW.removeTeamMemberRow(this)" title="\u062D\u0630\u0641">
                <i class="fas fa-times"></i>
            </button>
        `;try{t.appendChild(i)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 team member row:",r)}},removeTeamMemberRow(e){const t=e?.closest(".ptw-team-member-row"),a=document.getElementById("team-members-list");if(!(!t||!a))if(a.children.length>1)t.remove();else{const i=t.querySelector(".ptw-team-member-name");i&&(i.value="")}},updateManualStatusBtnSelection(e){if(!e)return;const t=e.closest(".modal-overlay")||document.body,a=t.querySelector("#manual-permit-status");a&&(a.value=e.value),t.querySelectorAll(".manual-status-btn").forEach(s=>{s.classList.remove("selected"),s.style.background="",s.style.borderColor="",s.style.color="",s.style.boxShadow="";const o=s.querySelector("i");o&&(o.style.color="")});const r=e.closest("label");if(r){r.classList.add("selected");const o={"\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":{color:"#10b981",gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",shadow:"rgba(16, 185, 129, 0.25)"},"\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644":{color:"#f59e0b",gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",shadow:"rgba(245, 158, 11, 0.25)"},"\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":{color:"#ef4444",gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",shadow:"rgba(239, 68, 68, 0.25)"}}[e.value];if(o){r.style.setProperty("background",`${o.gradient}`,"important"),r.style.setProperty("border-color",`${o.color}`,"important"),r.style.setProperty("color","#ffffff","important"),r.style.setProperty("box-shadow",`0 8px 20px -4px ${o.shadow}`,"important");const n=r.querySelector("i");n&&n.style.setProperty("color","#ffffff","important")}}},addApproval(){const e=document.getElementById("approvals-tbody");if(!e||!e.parentNode||!document.body.contains(e)){Utils.safeWarn("\u26A0\uFE0F addApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const t=e.children.length,a=document.createElement("tr");a.setAttribute("data-approval-index",t),a.setAttribute("data-required","true"),a.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-role-${t}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="approval-approver-${t}">
            </td>
            <td>
                <select class="form-input" id="approval-status-${t}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="approval-date-${t}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="approval-comments-${t}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeApproval(${t})" class="btn-icon btn-icon-danger" title="\u062D\u0630">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{e.appendChild(a)}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 approval row:",i)}},removeApproval(e){const t=document.getElementById("approvals-tbody");if(!t)return;const a=t.querySelector(`tr[data-approval-index="${e}"]`);a&&(a.remove(),Array.from(t.children).forEach((i,r)=>{i.setAttribute("data-approval-index",r)}))},addClosureApproval(){const e=document.getElementById("closure-approvals-tbody");if(!e||!e.parentNode||!document.body.contains(e)){Utils.safeWarn("\u26A0\uFE0F addClosureApproval: tbody \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0627\u0644\u0640 DOM");return}const t=e.children.length,a=document.createElement("tr");a.setAttribute("data-closure-approval-index",t),a.setAttribute("data-required","true"),a.innerHTML=`
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-role-${t}" required>
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 150px;"
                    placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642" id="closure-approval-approver-${t}">
            </td>
            <td>
                <select class="form-input" id="closure-approval-status-${t}">
                    <option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option>
                    <option value="approved">\u0645\u0648\u0627\u0641\u0642\u0629</option>
                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                </select>
            </td>
            <td>
                <input type="datetime-local" class="form-input" style="min-width: 180px;"
                    id="closure-approval-date-${t}">
            </td>
            <td>
                <input type="text" class="form-input" style="min-width: 200px;"
                    placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" id="closure-approval-comments-${t}">
            </td>
            <td>
                <button type="button" onclick="PTW.removeClosureApproval(${t})" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;try{e.appendChild(a)}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0640 closure approval row:",i)}},removeClosureApproval(e){const t=document.getElementById("closure-approvals-tbody");if(!t)return;const a=t.querySelector(`tr[data-closure-approval-index="${e}"]`);a&&(a.remove(),Array.from(t.children).forEach((i,r)=>{i.setAttribute("data-closure-approval-index",r)}))},setupDisclaimerFontControls(){const e=document.getElementById("ptw-permit-disclaimer-text"),t=document.getElementById("ptw-disclaimer-font-decrease"),a=document.getElementById("ptw-disclaimer-font-increase"),i=document.getElementById("ptw-disclaimer-font-reset"),r=document.getElementById("ptw-disclaimer-font-size-display");if(!e||!t||!a||!i||!r)return;const s=15,o=10,n=24,l=1;let p=parseInt(e.style.fontSize)||s;isNaN(p)&&(p=s);const d=c=>{p=Math.max(o,Math.min(n,c)),e.style.fontSize=p+"px",r.textContent=p;try{localStorage.setItem("ptw_disclaimer_font_size",p.toString())}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",u)}};try{const c=localStorage.getItem("ptw_disclaimer_font_size");if(c){const u=parseInt(c);isNaN(u)||(p=u,d(p))}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u062D\u062C\u0645 \u0627\u0644\u062E\u0637:",c)}d(p),t.addEventListener("click",()=>{d(p-l),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),200)}),a.addEventListener("click",()=>{d(p+l),a.classList.add("animate-pulse"),setTimeout(()=>a.classList.remove("animate-pulse"),200)}),i.addEventListener("click",()=>{d(s),i.classList.add("animate-spin"),setTimeout(()=>i.classList.remove("animate-spin"),500)})},async editPTW(e){let t=AppState.appData.ptw.find(a=>a.id===e);if(!t&&this.registryData){const a=this.registryData.find(i=>i.id===e||i.permitId===e);a&&a.isManualEntry===!0&&(t={id:a.permitId,workType:Array.isArray(a.permitType)?a.permitTypeDisplay||a.permitType.join("\u060C "):a.permitType||a.permitTypeDisplay,location:a.location,siteName:a.location,sublocation:a.sublocation,sublocationName:a.sublocation,startDate:a.openDate,endDate:a.timeTo,status:String(a.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:a.requestingParty,authorizedParty:a.authorizedParty,workDescription:a.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:a.createdAt,updatedAt:a.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:a.teamMembers||[],teamMembersText:a.teamMembersText||"",hotWorkDetails:a.hotWorkDetails||[],hotWorkOther:a.hotWorkOther||"",confinedSpaceDetails:a.confinedSpaceDetails||[],confinedSpaceOther:a.confinedSpaceOther||"",heightWorkDetails:a.heightWorkDetails||[],heightWorkOther:a.heightWorkOther||"",excavationLength:a.excavationLength||"",excavationWidth:a.excavationWidth||"",excavationDepth:a.excavationDepth||"",soilType:a.soilType||"",electricalWorkType:a.electricalWorkType||"",coldWorkType:a.coldWorkType||"",otherWorkType:a.otherWorkType||"",preStartChecklist:a.preStartChecklist||!1,lotoApplied:a.lotoApplied||!1,governmentPermits:a.governmentPermits||!1,riskAssessmentAttached:a.riskAssessmentAttached||!1,gasTesting:a.gasTesting||!1,mocRequest:a.mocRequest||!1,ppeNotes:a.ppeNotes||"",riskLikelihood:a.riskLikelihood||"",riskConsequence:a.riskConsequence||"",riskScore:a.riskScore||"",riskLevel:a.riskLevel||"",riskNotes:a.riskNotes||"",manualApprovals:a.manualApprovals||[],manualApprovalsText:a.manualApprovalsText||"",manualClosureApprovals:a.manualClosureApprovals||[],manualClosureApprovalsText:a.manualClosureApprovalsText||"",closureTime:a.closureTime||"",closureDate:a.closureDate||"",closureReason:a.closureReason||"",paperPermitNumber:a.paperPermitNumber||"",equipment:a.equipment||"",tools:a.tools||"",toolsList:a.toolsList||"",supervisor1:a.supervisor1||"",supervisor2:a.supervisor2||""})}t&&await this.showForm(t)},async viewPTW(e){let t=AppState.appData.ptw.find(v=>v.id===e);if(!t&&this.registryData){const v=this.registryData.find(U=>U.id===e||U.permitId===e);v&&v.isManualEntry===!0&&(t={id:v.permitId,workType:Array.isArray(v.permitType)?v.permitTypeDisplay||v.permitType.join("\u060C "):v.permitType||v.permitTypeDisplay,location:v.location,siteName:v.location,sublocation:v.sublocation,sublocationName:v.sublocation,startDate:v.openDate,endDate:v.timeTo,status:String(v.status||"").trim()||"\u0645\u063A\u0644\u0642",requestingParty:v.requestingParty,authorizedParty:v.authorizedParty,workDescription:v.workDescription,approvals:[],approvalCircuitOwnerId:"__manual__",approvalCircuitName:"Manual Entry",createdAt:v.createdAt,updatedAt:v.updatedAt,skipApprovalFlow:!0,isManualEntry:!0,teamMembers:v.teamMembers||[],hotWorkDetails:v.hotWorkDetails||[],hotWorkOther:v.hotWorkOther||"",confinedSpaceDetails:v.confinedSpaceDetails||[],confinedSpaceOther:v.confinedSpaceOther||"",heightWorkDetails:v.heightWorkDetails||[],heightWorkOther:v.heightWorkOther||"",excavationLength:v.excavationLength||"",excavationWidth:v.excavationWidth||"",excavationDepth:v.excavationDepth||"",soilType:v.soilType||"",electricalWorkType:v.electricalWorkType||"",coldWorkType:v.coldWorkType||"",otherWorkType:v.otherWorkType||"",ppeNotes:v.ppeNotes||"",riskLikelihood:v.riskLikelihood||"",riskConsequence:v.riskConsequence||"",riskScore:v.riskScore||"",riskLevel:v.riskLevel||"",riskNotes:v.riskNotes||"",manualApprovals:v.manualApprovals||[],manualClosureApprovals:v.manualClosureApprovals||[],closureDate:v.closureDate||"",closureReason:v.closureReason||"",paperPermitNumber:v.paperPermitNumber||"",equipment:v.equipment||"",tools:v.tools||"",supervisor1:v.supervisor1||"",supervisor2:v.supervisor2||""})}if(!t)return;const a=document.createElement("div");a.className="modal-overlay";const i=t.isManualEntry===!0,r=i?[]:this.normalizeApprovals(t.approvals||[]),s=Array.isArray(t.teamMembers)?t.teamMembers:[],o=s.length>0?`<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                ${s.map(v=>`<span class="bg-gray-100 px-3 py-1 rounded text-sm">${Utils.escapeHTML(v.name||"-")}</span>`).join("")}
               </div>`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0641\u0631\u064A\u0642 \u0645\u062D\u062F\u062F</p>',n=Array.isArray(t.hotWorkDetails)?t.hotWorkDetails:[],l=t.hotWorkOther||"",p=Array.isArray(t.confinedSpaceDetails)?t.confinedSpaceDetails:[],d=t.confinedSpaceOther||"",c=Array.isArray(t.heightWorkDetails)?t.heightWorkDetails:[],u=t.heightWorkOther||"",m=(v,U,W)=>{const _=U.length>0?U.map(R=>`<span class="badge badge-info mr-1 mb-1">${Utils.escapeHTML(R)}</span>`).join(""):"",D=W?`<p class="text-gray-700 mt-2"><strong>\u0623\u062E\u0631\u0649:</strong> ${Utils.escapeHTML(W)}</p>`:"";return`
                <div>
                    <label class="text-sm font-semibold text-gray-600">${v}:</label>
                    <div class="mt-1">
                        ${_||D?`${_}${D}`:'<p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F</p>'}
                    </div>
                </div>
            `},h="",f="",w="",x=t.status==="\u0645\u063A\u0644\u0642"?"\u0645\u063A\u0644\u0642":"\u063A\u064A\u0631 \u0645\u063A\u0644\u0642",A=t.endDate?Utils.formatDate(t.endDate):"-";a.innerHTML=`
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
                                <p class="text-gray-800">${Utils.escapeHTML(t.workType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0633\u0645:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.siteName||t.location||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.sublocationName||t.sublocation||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621:</label>
                                <p class="text-gray-800">${t.startDate?Utils.formatDate(t.startDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                                <p class="text-gray-800">${t.endDate?Utils.formatDate(t.endDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${this.getStatusBadgeClass(t.status)}">
                                    ${t.status||"-"}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.authorizedParty||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629 \u0644\u0644\u062A\u0635\u0631\u064A\u062D:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.requestingParty||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 / \u0627\u0644\u0639\u0645\u0644\u064A\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.equipment||"-")}</p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0623\u0648 \u0627\u0644\u0639\u062F\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.tools||t.toolsList||"-")}</p>
                            </div>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.workDescription||"")}</p>
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0639\u0645\u0644</h3>
                            ${o}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${m("\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629",n,l)}
                                ${m("\u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629",p,d)}
                                ${m("\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639",c,u)}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.electricalWorkType||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0631\u062F:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.coldWorkType||"-")}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0639\u0645\u0627\u0644 \u0623\u062E\u0631\u0649:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.otherWorkType||"-")}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0637\u0648\u0644 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.excavationLength||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0631\u0636 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.excavationWidth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u0645\u0642 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 (\u0645):</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.excavationDepth||"-")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u0628\u0629:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.soilType||"-")}</p>
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
                            ${w}
                        </div>
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0635\u0631\u064A\u062D</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                    <p class="text-gray-800">${x}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${A}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="text-sm font-semibold text-gray-600">\u0633\u0628\u0628 \u0627\u0644\u0625\u063A\u0644\u0627\u0642:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(t.closureReason||"-")}</p>
                                </div>
                            </div>
                        </div>
                        ${i?`
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0627\u0644\u064A\u062F\u0648\u064A
                            </h3>
                            ${(()=>{const v=t.manualApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                ${v.map(U=>`
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
                            ${(()=>{const v=t.manualClosureApprovals||[];return v.length===0?'<p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0625\u063A\u0644\u0627\u0642 \u0645\u0633\u062C\u0644\u0629</p>':`
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
                                                ${v.map(U=>`
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
                        ${r.length>0?`
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
                                        ${r.map((v,U)=>{const W=v.status==="approved"?"success":v.status==="rejected"?"danger":"warning",_=v.status==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":v.status==="rejected"?"\u0645\u0631\u0641\u0648\u0636":"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",D=(v.candidates||[]).map(k=>`
                                                <option value="${Utils.escapeHTML(k.id||"")}" ${k.id&&k.id===v.approverId?"selected":""}>
                                                    ${Utils.escapeHTML(k.name||k.email||"")}
                                                    ${k.email?` - ${Utils.escapeHTML(k.email)}`:""}
                                                </option>
                                            `).join(""),M=v.status==="pending"&&D?`
                                                    <div class="flex items-center gap-2 mb-2">
                                                        <select id="approval-assign-${t.id}-${U}" class="form-input">
                                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F</option>
                                                            ${D}
                                                        </select>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.assignApproval('${t.id}', ${U})">
                                                            \u062A\u0639\u064A\u064A\u0646
                                                        </button>
                                                    </div>
                                                  `:"",R=v.status==="pending"?`<div class="flex flex-col gap-2">
                                                        ${M}
                                                        <button class="btn-primary" style="padding: 4px 12px; font-size: 12px;" onclick="PTW.handleApprovalAction('${t.id}', ${U}, 'approved')">
                                                            \u0627\u0639\u062A\u0645\u0627\u062F
                                                        </button>
                                                        <button class="btn-secondary" style="padding: 4px 12px; font-size: 12px; background-color: #ef4444; border-color: #ef4444; color: #fff;" onclick="PTW.handleApprovalAction('${t.id}', ${U}, 'rejected')">
                                                            \u0631\u0641\u0636
                                                        </button>
                                                   </div>`:"",F=Array.isArray(v.history)&&v.history.length>0?`<div class="mt-2 space-y-1">
                                                        ${v.history.slice(-4).reverse().map(k=>`
                                                            <div class="text-xs text-gray-500 flex items-center gap-2">
                                                                <i class="fas fa-history text-gray-400"></i>
                                                                <span>${Utils.escapeHTML(k.action==="approved"?"\u0645\u0648\u0627\u0641\u0642\u0629":k.action==="rejected"?"\u0631\u0641\u0636":k.action==="assigned"?"\u062A\u0639\u064A\u064A\u0646":k.action||"-")}</span>
                                                                <span>\u2022</span>
                                                                <span>${k.performedBy?.name?Utils.escapeHTML(k.performedBy.name):k.assignedBy?.name?Utils.escapeHTML(k.assignedBy.name):"-"}</span>
                                                                <span>\u2022</span>
                                                                <span>${Utils.formatDateTime(k.timestamp)}</span>
                                                            </div>
                                                        `).join("")}
                                                   </div>`:"";return`
                                            <tr>
                                                <td>${Utils.escapeHTML(v.role||"")}</td>
                                                <td>${Utils.escapeHTML(v.approver||"")}</td>
                                                <td>
                                                        <span class="badge badge-${W}">
                                                            ${_}
                                                    </span>
                                                </td>
                                                <td>${v.date?Utils.formatDate(v.date):"-"}</td>
                                                <td>
                                                    ${Utils.escapeHTML(v.comments||"")}
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
                <div class="modal-footer form-actions-centered">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="PTW.exportPDF('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631/\u0637\u0628\u0627\u0639\u0629 PDF
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",v=>{v.target===a&&confirm(PTW._t("module.ptw.mapSettings.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&a.remove()}),setTimeout(()=>{a.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="approved"]').forEach(_=>{const D=_.getAttribute("onclick");if(D){const M=D.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'approved'\)/);M&&M[1]&&M[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.handleApprovalAction(M[1],parseInt(M[2]),"approved")}))}}),a.querySelectorAll('[onclick*="handleApprovalAction"][onclick*="rejected"]').forEach(_=>{const D=_.getAttribute("onclick");if(D){const M=D.match(/handleApprovalAction\('([^']+)',\s*(\d+),\s*'rejected'\)/);M&&M[1]&&M[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.handleApprovalAction(M[1],parseInt(M[2]),"rejected")}))}}),a.querySelectorAll('[onclick*="assignApproval"]').forEach(_=>{const D=_.getAttribute("onclick");if(D){const M=D.match(/assignApproval\('([^']+)',\s*(\d+)\)/);M&&M[1]&&M[2]&&(_.removeAttribute("onclick"),_.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),this.assignApproval(M[1],parseInt(M[2]))}))}})},50)},async handleApprovalAction(e,t,a){const i=`approval_${e}_${t}`;if(this[`_processing_${i}`]){Notification.info(this._t("module.ptw.notify.approvalProcessing","\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631..."));return}const r=AppState.appData.ptw.find(l=>l.id===e);if(!r){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}r.approvals=this.normalizeApprovals(r.approvals||[]);const s=r.approvals[t];if(!s){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}if(r.status==="\u0645\u063A\u0644\u0642"){Notification.warning(this._t("module.ptw.notify.cannotEditClosed","\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0631\u064A\u062D \u0645\u063A\u0644\u0642"));return}if(s.status!=="pending"){Notification.info(this._t("module.ptw.notify.approvalDone","\u062A\u0645\u062A \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0627\u0644\u0641\u0639\u0644"));return}const o=AppState.currentUser?.email?AppState.currentUser.email.toLowerCase():"";if(s.approverEmail&&o&&s.approverEmail.toLowerCase()!==o&&AppState.currentUser?.role!=="admin"){Notification.warning(this._t("module.ptw.notify.otherUser","\u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u062C\u0647 \u0625\u0644\u0649 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631."));return}if(a==="approved"){const l=r.approvals.filter((d,c)=>c<t&&d.required!==!1);if(l.some(d=>d.status!=="approved")){const d=this._t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),c=this._t("module.ptw.common.listSep","\u060C "),u=l.filter(m=>m.status!=="approved").map(m=>this.approvalRoleLabel(m.role||d)).join(c);Notification.warning(this._t("module.ptw.notify.prevApprovals","\u064A\u062C\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0623\u0648\u0644\u0627\u064B: {roles}").replace(/\{roles\}/g,u));return}}this[`_processing_${i}`]=!0;let n=s.comments||"";if(a==="rejected"){const l=prompt(this._t("module.ptw.approval.rejectPrompt","\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):"),n);if(l===null){this[`_processing_${i}`]=!1;return}n=l.trim()}Loading.show();try{if(s.status=a==="approved"?"approved":"rejected",s.approved=a==="approved",s.rejected=a==="rejected",s.date=new Date().toISOString(),s.comments=n,AppState.currentUser&&(s.approver=AppState.currentUser.name||s.approver||"",s.approverEmail=AppState.currentUser.email||s.approverEmail||"",s.approverId=AppState.currentUser.id||s.approverId||""),s.history=Array.isArray(s.history)?s.history:[],s.history.push(ApprovalCircuits.buildHistoryEntry(a==="approved"?"approved":"rejected",{performedBy:ApprovalCircuits.buildUserSnapshot(AppState.currentUser),comments:n,status:s.status,timestamp:new Date().toISOString()})),this.updatePermitStatus(r),r.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),GoogleIntegration.autoSave("PTW",AppState.appData.ptw).catch(c=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Google Sheets:",c)}),a==="approved"){const c=this.getNextPendingApproval(r.approvals);if(r.status==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647")Notification.success(this._t("module.ptw.notify.permAllApproved","\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0646\u0647\u0627\u0626\u064A \u0628\u0639\u062F \u0645\u0648\u0627\u0641\u0642\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629."));else{const u=this.approvalRoleLabel(s.role);if(Notification.success(this._t("module.ptw.notify.stageApproved",'\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0631\u062D\u0644\u0629 "{r}".').replace(/\{r\}/g,u)),c&&c.role){const m=this.approvalRoleLabel(c.role);Notification.info(this._t("module.ptw.notify.nextRole","\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: {r}").replace(/\{r\}/g,m))}else Notification.info(this._t("module.ptw.notify.allStages","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627."))}}else{const c=this.approvalRoleLabel(s.role);Notification.error(this._t("module.ptw.notify.rejectedBy",'\u062A\u0645 \u0631\u0641\u0636 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0645\u0646 \u0642\u0628\u0644 "{r}".').replace(/\{r\}/g,c)),n&&Notification.info(this._t("module.ptw.notify.rejectionReason","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: {c}").replace(/\{c\}/g,n))}this.triggerNotificationsUpdate(),this.loadPTWList();const l=document.getElementById("ptw-analysis-content");l&&l.style.display!=="none"&&(l.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const p=document.getElementById("ptw-approvals-content");p&&p.style.display!=="none"&&setTimeout(()=>{this.refreshApprovalsContent()},300);const d=document.querySelector(".modal-overlay");d&&(d.remove(),setTimeout(()=>{this.viewPTW(e)},100))}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",l),Notification.error(this._t("module.ptw.notify.approvalUpdateErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{this[`_processing_${i}`]=!1,Loading.hide()}},async assignApproval(e,t){const a=AppState.appData.ptw.find(n=>n.id===e);if(!a){Notification.error(this._t("module.ptw.notify.findPermitFail","\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}a.approvals=this.normalizeApprovals(a.approvals||[]);const i=a.approvals[t];if(!i){Notification.error(this._t("module.ptw.notify.approvalItemMissing","\u0639\u0646\u0635\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"));return}const r=document.getElementById(`approval-assign-${e}-${t}`);if(!r){Notification.error(this._t("module.ptw.notify.cannotFindAssignee","\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u062E\u0627\u0646\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646"));return}const s=r.value;if(!s){Notification.warning(this._t("module.ptw.notify.selectApprover","\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."));return}const o=ApprovalCircuits.getUserById(s);if(!o){Notification.error(this._t("module.ptw.notify.userNotInSystem","\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645."));return}Loading.show();try{i.approverId=o.id||o.email||"",i.approver=o.name||o.email||"",i.approverEmail=o.email||"",i.assignedAt=new Date().toISOString(),i.assignedBy=ApprovalCircuits.buildUserSnapshot(AppState.currentUser),i.history=Array.isArray(i.history)?i.history:[],i.history.push(ApprovalCircuits.buildHistoryEntry("assigned",{assignedBy:i.assignedBy,assignedTo:ApprovalCircuits.buildUserSnapshot(o)})),this.updatePermitStatus(a),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Notification.success(this._t("module.ptw.notify.assignedTo","\u062A\u0645 \u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u0644\u0649 {name}.").replace(/\{name\}/g,i.approver||"")),this.triggerNotificationsUpdate(),this.loadPTWList();const n=document.getElementById("ptw-analysis-content");n&&n.style.display!=="none"&&(n.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners());const l=document.querySelector(".modal-overlay");l&&(l.remove(),this.viewPTW(e))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n),Notification.error(this._t("module.ptw.notify.assignErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"))}finally{Loading.hide()}},async deletePTW(e){if(confirm(this._t("module.ptw.notify.deletePtwShort","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u061F"))){Loading.show();try{await this.removeFromRegistry(e),AppState.appData.ptw=AppState.appData.ptw.filter(a=>a.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("PTW",AppState.appData.ptw),Loading.hide(),Notification.success(this._t("module.ptw.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0628\u0646\u062C\u0627\u062D")),this.updateKPIs(),this.loadPTWList(),this.triggerNotificationsUpdate();const t=document.getElementById("ptw-analysis-content");t&&t.style.display!=="none"&&(t.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(t){Notification.error(this._t("module.ptw.notify.errorGeneric","\u062D\u062F\u062B \u062E\u0637\u0623: ")+t.message),submitBtn&&(submitBtn.disabled=!1,submitBtn.innerHTML=originalText)}}},async exportPDF(e){try{Loading.show();const t=await this.buildPermitExportPayload(e);if(Loading.hide(),!t){Notification.error(this._t("module.ptw.notify.permitNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"));return}if(t.isManualEntry&&t.exportReview&&!t.exportReview.ok&&Utils.safeWarn("\u062A\u0635\u062F\u064A\u0631 \u062A\u0635\u0631\u064A\u062D \u064A\u062F\u0648\u064A \u0628\u0639\u0646\u0627\u0635\u0631 \u0646\u0627\u0642\u0635\u0629:",t.exportReview.failed),Loading.show(this._t("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 PDF...")),!await this._ensurePermitPdfLibs_()){Notification.error(this._t("module.ptw.notify.pdfLibsError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"));return}await this._downloadPermitHtmlAsPdf(t.html,t.fileName)?Notification.success(this._t("module.ptw.notify.pdfDownloadOk","\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0631\u064A\u062D PDF \u0628\u0646\u062C\u0627\u062D")):t.isManualEntry&&t.printHtml?(Notification.warning("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629. \u0627\u062E\u062A\u0631 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0623\u0648 \xABMicrosoft Print to PDF\xBB."),this.openPermitPrintWindow(t.printHtml)):Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF"))}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t);const a=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(t?.message||a))}finally{Loading.hide()}},initMapFilters(){this.setupMapSettingsEventListeners(),["ptw-map-filter-status","ptw-map-filter-type"].forEach(a=>{const i=document.getElementById(a);if(i&&i.parentNode){const r=i.cloneNode(!0);i.parentNode.replaceChild(r,i),r.addEventListener("change",()=>this.updateMapUI())}});const e=(a,i)=>{const r=document.getElementById(a);if(r&&r.parentNode){const s=r.cloneNode(!0);r.parentNode.replaceChild(s,r),s.addEventListener("click",()=>this.switchMapType(i))}};e("ptw-map-type-normal","normal"),e("ptw-map-type-satellite","satellite"),e("ptw-map-type-terrain","terrain");const t=document.getElementById("ptw-map-fullscreen-btn");if(t&&t.parentNode){const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>this.toggleFullscreen())}},updateMapUI(){this.currentTab==="map"&&this.updateMapMarkers()},getMarkerColor(e){switch(e){case"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":return"#10b981";case"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":return"#3b82f6";case"\u0645\u063A\u0644\u0642":return"#6b7280";case"\u0645\u0631\u0641\u0648\u0636":return"#ef4444";default:return"#f59e0b"}},createMapPopup(e){const t=Utils.escapeHTML;return`
            <div class="ptw-map-popup p-2" style="min-width: 200px; text-align: right;">
                <h4 class="font-bold text-gray-800 mb-1 border-b pb-1 text-sm">${t(e.workType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h4>
                <div class="text-xs text-gray-600 space-y-1 my-2">
                    <div class="flex justify-between"><span>${t(e.siteName||e.location||"-")}</span> <span class="font-semibold text-gray-500">:\u0627\u0644\u0645\u0648\u0642\u0639</span></div>
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
        `},switchMapType(e){if(!this.mapInstance)return;this.currentMapType=e;const t=document.getElementById("ptw-map-type-normal"),a=document.getElementById("ptw-map-type-satellite"),i=document.getElementById("ptw-map-type-terrain");if([t,a,i].forEach(r=>{if(r)try{r.classList.remove("bg-blue-500","text-white","shadow-sm"),r.classList.add("text-gray-700","hover:bg-gray-100")}catch{}}),this.mapType==="google")try{let r;switch(e){case"satellite":if(r=google.maps.MapTypeId.SATELLITE,a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;case"terrain":if(r=google.maps.MapTypeId.TERRAIN,i)try{i.classList.add("bg-blue-500","text-white","shadow-sm"),i.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}break;default:if(r=google.maps.MapTypeId.ROADMAP,t)try{t.classList.add("bg-blue-500","text-white","shadow-sm"),t.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}this.mapInstance.setMapTypeId(r)}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Google Maps):",r)}else if(this.mapType==="leaflet"){if(!this.leafletLayers)return;requestAnimationFrame(()=>{try{if(!this.mapInstance||!this.leafletLayers)return;try{this.leafletLayers.normal&&this.mapInstance.hasLayer(this.leafletLayers.normal)&&this.mapInstance.removeLayer(this.leafletLayers.normal)}catch{}try{this.leafletLayers.satellite&&this.mapInstance.hasLayer(this.leafletLayers.satellite)&&this.mapInstance.removeLayer(this.leafletLayers.satellite)}catch{}try{this.leafletLayers.terrain&&this.mapInstance.hasLayer(this.leafletLayers.terrain)&&this.mapInstance.removeLayer(this.leafletLayers.terrain)}catch{}switch(e){case"satellite":{const r=this._ensureLeafletSatelliteLayer();if(r)try{if(r.addTo(this.mapInstance),a)try{a.classList.add("bg-blue-500","text-white","shadow-sm"),a.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}case"terrain":{const r=this._ensureLeafletTerrainLayer();if(r)try{if(r.addTo(this.mapInstance),i)try{i.classList.add("bg-blue-500","text-white","shadow-sm"),i.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}break}default:if(this.leafletLayers.normal)try{if(this.leafletLayers.normal.addTo(this.mapInstance),t)try{t.classList.add("bg-blue-500","text-white","shadow-sm"),t.classList.remove("text-gray-700","hover:bg-gray-100")}catch{}}catch{}}}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (Leaflet):",r)}})}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062E\u0631\u064A\u0637\u0629: ${e}`)},toggleFullscreen(){const e=document.getElementById("ptw-map-content"),t=document.getElementById("ptw-map-fullscreen-btn");e&&(this.isFullscreen?(document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen(),this.isFullscreen=!1,t&&(t.innerHTML='<i class="fas fa-expand ml-2"></i>',t.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")):(e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen(),this.isFullscreen=!0,t&&(t.innerHTML='<i class="fas fa-compress ml-2"></i>',t.title="\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")),setTimeout(()=>{this.mapInstance&&(this.mapType==="leaflet"&&this.mapInstance.invalidateSize?this.mapInstance.invalidateSize():this.mapType==="google"&&typeof google<"u"&&google.maps&&google.maps.event&&this.mapInstance&&google.maps.event.trigger(this.mapInstance,"resize"))},300))},formatPermitApprovalSourceCell(e){if(!e)return'<span class="text-gray-400 text-sm">\u2014</span>';const t=String(e.approvalCircuitOwnerId||"").trim(),a=String(e.approvalCircuitName||"").trim();if(e.isManualEntry===!0||e.skipApprovalFlow===!0||t==="__manual__"){const r=a||"Manual Entry";return`
                <div class="ptw-approval-source-cell text-xs text-right leading-snug" dir="ltr">
                    <div class="font-mono text-gray-600">__manual__</div>
                    <div class="text-gray-800 font-medium" dir="auto">${Utils.escapeHTML(r)}</div>
                </div>`}return a?`<div class="text-xs text-gray-800">${Utils.escapeHTML(a)}</div>`:t&&t!=="__default__"?`<div class="text-xs font-mono text-gray-600" dir="ltr">${Utils.escapeHTML(t)}</div>`:'<span class="text-gray-400 text-sm">\u2014</span>'},getMergedPermitsForFilter(){const e=AppState.appData.ptw||[],t=(this.registryData||[]).map(a=>({id:a.permitId||a.id,workType:Array.isArray(a.permitType)?a.permitTypeDisplay||a.permitType.join("\u060C "):a.permitType||a.permitTypeDisplay,location:a.location,siteName:a.location,sublocation:a.sublocation,sublocationName:a.sublocation,startDate:a.timeFrom||a.openDate,endDate:a.timeTo||a.closureDate,status:a.status,workDescription:a.workDescription,requestingParty:a.requestingParty,authorizedParty:a.authorizedParty,approvals:[],createdAt:a.createdAt||a.timeFrom||a.openDate,updatedAt:a.updatedAt||a.closureDate||a.timeTo,isFromRegistry:!0,isManualEntry:a.isManualEntry===!0||a.isManualEntry==="true",skipApprovalFlow:a.skipApprovalFlow===!0||a.isManualEntry===!0||a.isManualEntry==="true",approvalCircuitOwnerId:a.approvalCircuitOwnerId||(a.isManualEntry===!0||a.isManualEntry==="true"?"__manual__":void 0),approvalCircuitName:a.approvalCircuitName||(a.isManualEntry===!0||a.isManualEntry==="true"?"Manual Entry":void 0),sequentialNumber:a.sequentialNumber,paperPermitNumber:a.paperPermitNumber}));return this.mergePermitsPreferRegistry(e,t)},updateSublocationFilterOptions(){const e=document.getElementById("ptw-filter-location"),t=document.getElementById("ptw-filter-sublocation");if(!t||!e)return;const a=this.getMergedPermitsForFilter(),i=(e.value||"").trim();let r=[];if(i){const o=a.filter(n=>(n.siteName||n.location||"").trim()===i);r=[...new Set(o.map(n=>(n.sublocationName||n.sublocation||"").trim()).filter(Boolean))].sort()}else r=[...new Set(a.map(o=>(o.sublocationName||o.sublocation||"").trim()).filter(Boolean))].sort();const s=t.value;t.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+r.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`).join(""),r.includes(s)?t.value=s:t.value=""},filterItems(){const e=(document.getElementById("ptw-search")?.value||"").trim(),t=(document.getElementById("ptw-filter-status")?.value||"").trim(),a=(document.getElementById("ptw-filter-work-type")?.value||"").trim(),i=(document.getElementById("ptw-filter-location")?.value||"").trim(),r=(document.getElementById("ptw-filter-sublocation")?.value||"").trim(),s=(document.getElementById("ptw-filter-date-from")?.value||"").trim(),o=(document.getElementById("ptw-filter-date-to")?.value||"").trim();let n=this.getMergedPermitsForFilter();if(e){const d=e.toLowerCase();n=n.filter(c=>c.workType?.toLowerCase().includes(d)||c.workDescription?.toLowerCase().includes(d)||c.location?.toLowerCase().includes(d)||c.siteName?.toLowerCase().includes(d)||c.sublocation?.toLowerCase().includes(d)||c.sublocationName?.toLowerCase().includes(d)||c.requestingParty?.toLowerCase().includes(d)||c.authorizedParty?.toLowerCase().includes(d)||String(c.approvalCircuitOwnerId||"").toLowerCase().includes(d)||String(c.approvalCircuitName||"").toLowerCase().includes(d))}t&&(n=n.filter(d=>(d.status||"").trim()===t)),a&&(n=n.filter(d=>(d.workType||"").trim()===a)),i&&(n=n.filter(d=>(d.siteName||d.location||"").trim()===i)),r&&(n=n.filter(d=>(d.sublocationName||d.sublocation||"").trim()===r)),s&&(n=n.filter(d=>(d.startDate?new Date(d.startDate).toISOString().split("T")[0]:"")>=s)),o&&(n=n.filter(d=>(d.endDate?new Date(d.endDate).toISOString().split("T")[0]:"")<=o)),n=this.sortPermitRecordsNewestFirst(n);const l=document.querySelector("#ptw-table-container tbody");l&&(l.innerHTML=n.length===0?'<tr><td colspan="8" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td></tr>':n.map(d=>{const c=d.isManualEntry===!0||d.skipApprovalFlow===!0||String(d.approvalCircuitOwnerId||"").trim()==="__manual__";let u,m;if(c)m=3,u=3;else{const f=this.normalizeApprovals(d.approvals||[]).filter(w=>w.required!==!1);u=f.filter(w=>w.status==="approved").length,m=f.length}return`
                    <tr>
                        <td>${Utils.escapeHTML(d.workType||"")}</td>
                        <td>${Utils.escapeHTML(d.siteName||d.location||"")}</td>
                        <td>${Utils.escapeHTML(d.sublocationName||d.sublocation||"-")}</td>
                        <td>${d.startDate?Utils.formatDate(d.startDate):"-"}</td>
                        <td>${d.endDate?Utils.formatDate(d.endDate):"-"}</td>
                        <td>
                            <span class="badge badge-${u===m&&m>0?"success":"warning"}">
                                ${m>0?`${u}/${m}`:"\u2014"}
                            </span>
                            <br>
                            <span class="badge badge-${this.getStatusBadgeClass(d.status)}">
                                ${Utils.escapeHTML(d.status||"-")}
                            </span>
                        </td>
                        <td class="align-top">${this.formatPermitApprovalSourceCell(d)}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button onclick="PTW.viewPTW('${d.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="PTW.printPermit('${d.id}')" class="btn-icon btn-icon-primary" title="\u0637\u0628\u0627\u0639\u0629">
                                    <i class="fas fa-print"></i>
                                </button>
                                <button onclick="PTW.exportPDF('${d.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                    <i class="fas fa-file-pdf"></i>
                                </button>
                                <button onclick="PTW.editPTW('${d.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="PTW.deletePTW('${d.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `}).join(""));const p=document.getElementById("ptw-filter-count");p&&(p.textContent=String(n.length)),this.updateKPIs()},renderAnalysisContent(){const e=document.getElementById("ptw-map-content");return e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.position="absolute",e.style.left="-9999px",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.style.pointerEvents="none",e.style.zIndex="-1"),AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),this._ptwEnsureChartJS().catch(()=>{}),`
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
                        ${["30","90","180","365","0"].map((t,a)=>{const i=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],r=(this._ptwPeriod||"0")===t;return`<button class="ptw-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${r?"#fff":"rgba(255,255,255,0.15)"};color:${r?"#1e3a5f":"#fff"};">${i[a]}</button>`}).join("")}
                    </div>
                    <button id="ptw-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="ptw-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button id="ptw-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.3);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.5)'" onmouseout="this.style.background='rgba(0,0,0,0.3)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="ptw-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B"><i class="fas fa-sync-alt"></i></button>
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
                    <button id="ptw-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #bfdbfe;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#dbeafe';this.style.color='#1d4ed8'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"ptw-af-status",icon:"fas fa-circle",color:"#10b981",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"ptw-af-work-type",icon:"fas fa-fire",color:"#ef4444",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"},{id:"ptw-af-authorized",icon:"fas fa-user-tie",color:"#f59e0b",label:"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"},{id:"ptw-af-requesting",icon:"fas fa-building",color:"#6366f1",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"},{id:"ptw-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0635\u0646\u0639"}].map(t=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="${t.icon}" style="color:${t.color};margin-left:4px;"></i>${t.label}</label>
                            <select id="${t.id}" style="width:100%;padding:7px 10px;border:1.5px solid #bfdbfe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#1d4ed8'" onblur="this.style.borderColor='#bfdbfe'">
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
                        <button id="ptw-analysis-add" style="padding:5px 12px;border-radius:8px;border:none;background:#1d4ed8;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;" onmouseover="this.style.background='#1e40af'" onmouseout="this.style.background='#1d4ed8'"><i class="fas fa-plus"></i> \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F</button>
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
        </div>`},getAnalysisPermits(){const e=this.getSiteOptions(),t=r=>{if(!r)return r;const s=String(r.location||r.siteName||"").trim(),o=s.split(" - "),n=o[0]?.trim()||"";let l="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const p=e.find(c=>c.name.trim()===s||c.id===s||r.siteId&&c.id===r.siteId||n&&c.name.trim()===n||n&&c.id===n);p?l=p.name.trim():n&&n!=="\u2014"&&n!=="undefined"&&(l=n);let d=r.sublocation?.trim()||o[1]?.trim()||"";return(!d||d==="\u2014"||d==="undefined"||d==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")&&(d="\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),{...r,location:l,siteName:l,sublocation:d}},a=(AppState.appData&&AppState.appData.ptw?AppState.appData.ptw:[]).map(t),i=(this.registryData||[]).map(r=>{const o=(r.location||"").split(" - "),n=o[0]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=r.sublocation?.trim()||o[1]?.trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return t({id:r.permitId||r.id,workType:Array.isArray(r.permitType)?r.permitTypeDisplay||r.permitType.join("\u060C "):r.permitType||r.permitTypeDisplay,location:n,siteName:n,sublocation:l,startDate:r.openDate,endDate:r.timeTo,status:r.status,requestingParty:r.requestingParty,authorizedParty:r.authorizedParty,workDescription:r.workDescription,createdAt:r.createdAt,updatedAt:r.updatedAt})});return this.mergePermitsPreferRegistry(a,i)},getFilteredAnalysisPermits(){const e=this.getAnalysisPermits(),t=document.getElementById("ptw-analysis-date-from"),a=document.getElementById("ptw-analysis-date-to"),i=document.getElementById("ptw-analysis-work-type"),r=document.getElementById("ptw-analysis-authorized"),s=document.getElementById("ptw-analysis-requesting"),o=document.getElementById("ptw-analysis-status"),n=t&&t.value?new Date(t.value):null,l=a&&a.value?new Date(a.value):null,p=i&&i.value?i.value.trim():"",d=r&&r.value?r.value.trim():"",c=s&&s.value?s.value.trim():"",u=o&&o.value?o.value.trim():"";return e.filter(m=>{const h=m.workType,f=Array.isArray(h)?h:h?[String(h)]:[],w=!p||f.some(W=>(W||"").trim()===p),x=!d||(m.authorizedParty||"").trim()===d,A=!c||(m.requestingParty||"").trim()===c,v=!u||(m.status||"").trim()===u;let U=!0;if(n||l){const W=m.startDate||m.openDate||m.createdAt||m.endDate,_=W?new Date(W):null;if(!_)U=!1;else if(n&&_<n&&(U=!1),l){const D=new Date(l);D.setHours(23,59,59,999),_>D&&(U=!1)}}return w&&x&&A&&v&&U})},updateAnalysisChartsAndKPIs(e){const t=(b,$)=>this._t(b,$),a=Array.isArray(e)?e:this.getFilteredAnalysisPermits(),i=a.length,r=a.filter(b=>this.isPermitOpenStatus(b?.status)).length,s=a.filter(b=>this.isPermitClosedStatus(b?.status)).length,o=a.filter(b=>(b.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,n=a.filter(b=>b?.isManualEntry!==!0&&(b.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,l=a.filter(b=>(b.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,p=i>0?(s/i*100).toFixed(1):"0",d=i>0?(r/i*100).toFixed(1):"0",c=i>0?(o/i*100).toFixed(1):"0",u=i>0?(l/i*100).toFixed(1):"0",m=r+s+l,h=i===0||m===i,f=(b,$)=>{const j=document.getElementById(b);j&&(j.textContent=$)};f("ptw-kpi-total",i),f("ptw-kpi-open",r),f("ptw-kpi-open-pct",t("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(d))),f("ptw-kpi-closed",s),f("ptw-kpi-closure-pct",t("module.ptw.analysis.closureShare","{n}% \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642").replace(/\{n\}/g,String(p))),f("ptw-kpi-approved",o),f("ptw-kpi-approved-pct",t("module.ptw.analysis.pctOfTotal","{n}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A").replace(/\{n\}/g,String(c))),f("ptw-kpi-pending",n),f("ptw-kpi-rejected",l),f("ptw-kpi-formulas",t("module.ptw.analysis.formulaText","\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 = {c}% | \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 = {o}% | \u0627\u0644\u0645\u0631\u0641\u0648\u0636\u0629 = {r}%").replace(/\{c\}/g,String(p)).replace(/\{o\}/g,String(d)).replace(/\{r\}/g,String(u)));const w=document.getElementById("ptw-analysis-current-count");w&&(w.textContent=String(i));const x=document.getElementById("ptw-analysis-summary");if(x)if(i===0)x.textContent=t("module.ptw.analysis.summaryNoData","\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u062C\u0631\u0651\u0628 \u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0641\u062A\u0631\u0629 \u0623\u0648 \u0625\u0632\u0627\u0644\u0629 \u0628\u0639\u0636 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u062D\u0644\u064A\u0644.");else{const b=[],$=document.getElementById("ptw-analysis-date-from")?.value||"",j=document.getElementById("ptw-analysis-date-to")?.value||"",C=document.getElementById("ptw-analysis-work-type")?.value||"",y=document.getElementById("ptw-analysis-authorized")?.value||"",G=document.getElementById("ptw-analysis-requesting")?.value||"",P=document.getElementById("ptw-analysis-status")?.value||"";if($||j){const Y=$&&j?t("module.ptw.analysis.fromWord","\u0645\u0646")+" "+$+" "+t("module.ptw.analysis.toConnector","\u0625\u0644\u0649")+" "+j:$?t("module.ptw.analysis.fromWord","\u0645\u0646")+" "+$:t("module.ptw.analysis.until","\u062D\u062A\u0649")+" "+j;b.push(t("module.ptw.analysis.range","\u0627\u0644\u0641\u062A\u0631\u0629: ")+Y)}C&&b.push(t("module.ptw.analysis.wt","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D: ")+C),y&&b.push(t("module.ptw.analysis.ap","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627: ")+y),G&&b.push(t("module.ptw.analysis.rp","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629: ")+G),P&&b.push(t("module.ptw.analysis.st","\u0627\u0644\u062D\u0627\u0644\u0629: ")+P);const H=b.length?b.join(t("module.ptw.analysis.partSep"," | ")):t("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u0627\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)");x.textContent=t("module.ptw.analysis.currentCount","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ")+i+t("module.ptw.analysis.filterSep"," \u2014 ")+H}if(!document.getElementById("ptw-analysis-filter-badge-styles")){const b=document.createElement("style");b.id="ptw-analysis-filter-badge-styles",b.textContent=`
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
            `,document.head.appendChild(b)}if(["ptw-analysis-date-from","ptw-analysis-date-to","ptw-analysis-work-type","ptw-analysis-authorized","ptw-analysis-requesting","ptw-analysis-status"].forEach(b=>{const $=document.getElementById(b);if(!$)return;const j=$.closest("div");if(!j)return;const C=j.querySelector('.ptw-analysis-filter-label[data-filter-id="'+b+'"]');if(!C)return;const y=C.querySelector(".ptw-analysis-filter-badge");y&&y.remove();let G=!1;if(($.tagName==="INPUT"||$.tagName==="SELECT")&&(G=!!$.value),G&&i>0){const P=document.createElement("span");P.className="ptw-analysis-filter-badge",P.title=t("module.ptw.analysis.badgeCountTitle","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0641\u0644\u062A\u0631 \u0645\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0623\u062E\u0631\u0649"),P.textContent=String(i);const H=C.querySelector("i");H&&H.nextSibling?H.insertAdjacentElement("afterend",P):C.appendChild(P)}}),typeof Chart>"u")return;const v=["ptw-chart-work-type","ptw-chart-authorized","ptw-chart-status","ptw-chart-timeline"];this.analysisCharts||(this.analysisCharts={}),v.forEach(b=>{this.analysisCharts[b]&&(this.analysisCharts[b].destroy(),this.analysisCharts[b]=null)});const U=b=>{const $=b.workType;return Array.isArray($)?$.length?$:["\u0623\u062E\u0631\u0649"]:$?[String($)]:["\u0623\u062E\u0631\u0649"]},W={};a.forEach(b=>U(b).forEach($=>{const j=($||"").trim()||"\u0623\u062E\u0631\u0649";W[j]=(W[j]||0)+1}));const _=Object.entries(W).sort((b,$)=>$[1]-b[1]),D={};a.forEach(b=>{const $=(b.authorizedParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";D[$]=(D[$]||0)+1});const M=Object.entries(D).sort((b,$)=>$[1]-b[1]).slice(0,12),R={};a.forEach(b=>{const $=(b.status||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";R[$]=(R[$]||0)+1});const F=Object.entries(R),k={};a.forEach(b=>{const $=b.startDate||b.openDate||b.createdAt||b.endDate,j=$?new Date($):null,C=j?j.getFullYear()+"-"+String(j.getMonth()+1).padStart(2,"0"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";k[C]=(k[C]||0)+1});const I=Object.keys(k).filter(b=>b!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort().map(b=>({label:b,count:k[b]})),B=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#6366f1","#f97316"],O=(b,$,j,C)=>{const y=document.getElementById(b);if(!y)return;const G=y.getContext("2d");this.analysisCharts[b]=new Chart(G,{type:"doughnut",data:{labels:$,datasets:[{data:j,backgroundColor:B.slice(0,$.length),borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})},V=(b,$,j,C)=>{const y=document.getElementById(b);if(!y)return;const G=y.getContext("2d");this.analysisCharts[b]=new Chart(G,{type:"bar",data:{labels:$,datasets:[{label:t("module.ptw.analysis.chartCount","\u0627\u0644\u0639\u062F\u062F"),data:j,backgroundColor:B[0],borderColor:"#1d4ed8",borderWidth:1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0}}}})},te=(b,$,j)=>{const C=document.getElementById(b);if(!C)return;const y=C.getContext("2d");this.analysisCharts[b]=new Chart(y,{type:"line",data:{labels:$,datasets:[{label:t("module.ptw.analysis.permitsPerMonth","\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),data:j,borderColor:B[0],backgroundColor:B[0]+"33",fill:!0,tension:.2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})};_.length&&O("ptw-chart-work-type",_.map(([b])=>b),_.map(([,b])=>b)),M.length&&V("ptw-chart-authorized",M.map(([b])=>b),M.map(([,b])=>b)),F.length&&O("ptw-chart-status",F.map(([b])=>b),F.map(([,b])=>b)),I.length&&te("ptw-chart-timeline",I.map(({label:b})=>b),I.map(({count:b})=>b))},exportAnalysisReportToExcel(){const e=this.getFilteredAnalysisPermits();if(!e||e.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const t=(_,D)=>this._t(_,D),i=(typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar")==="en"?"en-GB":"ar-EG",r=_=>{if(!_)return"-";try{return new Date(_).toLocaleDateString(i)}catch{return String(_)}},s=this._t("module.ptw.common.listSep","\u060C "),o=_=>Array.isArray(_.workType)?(_.workType||[]).join(s):_.workType||"-",n=t("module.ptw.excelColSeq","\u0645"),l=t("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),p=t("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),d=t("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),c=t("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),u=t("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),m=t("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),h=t("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),f=e.map((_,D)=>({[n]:D+1,[l]:o(_),[p]:_.requestingParty||"-",[d]:_.authorizedParty||"-",[c]:_.location||_.siteName||"-",[u]:r(_.startDate||_.openDate||_.createdAt),[m]:this.statusLabel(_.status||"-"),[h]:(_.workDescription||"-").toString().slice(0,200)}));if(typeof XLSX>"u"){Notification.error(this._t("module.ptw.notify.xlsxNoLib","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"));return}const w=XLSX.utils.json_to_sheet(f),x=XLSX.utils.book_new(),A=t("module.ptw.excelSheetAnalysis","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");XLSX.utils.book_append_sheet(x,w,A);const v=document.getElementById("ptw-analysis-date-from")?.value||"",U=document.getElementById("ptw-analysis-date-to")?.value||"",W=t("module.ptw.excelNameAnalysis","\u062A\u0642\u0631\u064A\u0631_\u062A\u062D\u0644\u064A\u0644_\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D_{f}_{t}.xlsx").replace(/\{f\}/g,(v||t("module.ptw.excelNameAll","\u0643\u0644")).replace(/\s/g,"_")).replace(/\{t\}/g,(U||t("module.ptw.excelNameTime","\u0627\u0644\u0648\u0642\u062A")).replace(/\s/g,"_"));XLSX.writeFile(x,W),Notification.success(this._t("module.ptw.notify.analysisExportXlsxOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D"))},async exportAnalysisReportToPDF(){const e=this.getFilteredAnalysisPermits();if(!e||e.length===0){Notification.warning(this._t("module.ptw.notify.analysisNoExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u062A\u0635\u0627\u0631\u064A\u062D."));return}const t=(l,p)=>this._t(l,p),a=typeof AppState<"u"&&AppState.currentLanguage||typeof localStorage<"u"&&localStorage.getItem("language")||"ar",i=a==="en"?"en-GB":"ar-EG",r=a!=="en",s=r?"rtl":"ltr",o=a==="en"?"en":"ar",n=r?"right":"left";try{Loading.show(t("module.ptw.pdf.exportLoading","\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF..."));const l=H=>{if(!H)return"-";try{const Y=this.parseDateTimeValue(H);return!Y||isNaN(Y.getTime())?String(H):Y.toLocaleDateString(i)}catch{return String(H)}},p=this._t("module.ptw.common.listSep","\u060C "),d=H=>Array.isArray(H.workType)?(H.workType||[]).join(p):H.workType||"-",c=document.getElementById("ptw-analysis-date-from"),u=document.getElementById("ptw-analysis-date-to"),m=document.getElementById("ptw-analysis-work-type"),h=document.getElementById("ptw-analysis-authorized"),f=document.getElementById("ptw-analysis-requesting"),w=document.getElementById("ptw-analysis-status"),x=[];c&&c.value&&x.push(t("module.ptw.analysis.fromDate","\u0645\u0646 \u062A\u0627\u0631\u064A\u062E")+": "+c.value),u&&u.value&&x.push(t("module.ptw.analysis.toDate","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E")+": "+u.value),m&&m.value&&x.push(t("module.ptw.analysis.permitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")+": "+m.value),h&&h.value&&x.push(t("module.ptw.analysis.authorized","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627 (\u0645\u0642\u0627\u0648\u0644)")+": "+h.value),f&&f.value&&x.push(t("module.ptw.analysis.requesting","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629")+": "+f.value),w&&w.value&&x.push(t("module.ptw.analysis.filterStatus","\u0627\u0644\u062D\u0627\u0644\u0629")+": "+w.value);const A=t("module.ptw.analysis.partSep"," | "),v=x.length?x.join(A):t("module.ptw.analysis.noFilters","\u0628\u062F\u0648\u0646 \u0641\u0644\u062A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D)"),U=e.filter(H=>{const Y=(H.status||"").trim();return Y!=="\u0645\u063A\u0644\u0642"&&Y!=="\u0645\u0631\u0641\u0648\u0636"&&Y!=="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"&&Y!=="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,W=e.filter(H=>{const Y=(H.status||"").trim();return Y==="\u0645\u063A\u0644\u0642"||Y==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||Y==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"}).length,_=t("module.ptw.excelColSeq","\u0645"),D=t("module.ptw.excelColPermitType","\u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D"),M=t("module.ptw.excelColReq","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629)"),R=t("module.ptw.excelColAuth","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0627"),F=t("module.ptw.excelColLoc","\u0627\u0644\u0645\u0635\u0646\u0639"),k=t("module.ptw.excelColDate","\u0627\u0644\u062A\u0627\u0631\u064A\u062E"),S=t("module.ptw.excelColStatus","\u0627\u0644\u062D\u0627\u0644\u0629"),I=t("module.ptw.excelColWorkDesc","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644"),B=e.map((H,Y)=>`
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: center;">${Y+1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n}; font-size: 9px;">${Utils.escapeHTML(d(H))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n};">${Utils.escapeHTML(H.requestingParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n};">${Utils.escapeHTML(H.authorizedParty||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n};">${Utils.escapeHTML(H.location||H.siteName||"-")}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n};">${l(H.startDate||H.openDate||H.createdAt)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n};">${Utils.escapeHTML(this.statusLabel(H.status||"-"))}</td>
                    <td style="border: 1px solid #d1d5db; padding: 5px; text-align: ${n}; font-size: 9px; max-width: 120px;">${Utils.escapeHTML((H.workDescription||"-").toString().slice(0,80))}</td>
                </tr>
            `).join(""),O=t("module.ptw.pdf.analysisReportTitle","\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"),V=t("module.ptw.pdf.filterCriteriaLine","\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0641\u0644\u062A\u0631: {text}").replace(/\{text\}/g,v),te=t("module.ptw.pdf.totalsLine","\u0625\u062C\u0645\u0627\u0644\u064A: {total} | \u0645\u0641\u062A\u0648\u062D\u0629: {open} | \u0645\u063A\u0644\u0642\u0629: {closed}").replace(/\{total\}/g,String(e.length)).replace(/\{open\}/g,String(U)).replace(/\{closed\}/g,String(W)),b=`
                <div style="margin-bottom: 18px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 10px;">${Utils.escapeHTML(O)}</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-bottom: 6px;">${Utils.escapeHTML(V)}</p>
                    <p style="text-align: center; color: #374151; font-size: 12px;">${Utils.escapeHTML(te)}</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #3b82f6; color: white;">
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${Utils.escapeHTML(_)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(D)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(M)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(R)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(F)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(k)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(S)}</th>
                            <th style="border: 1px solid #d1d5db; padding: 6px; text-align: ${n};">${Utils.escapeHTML(I)}</th>
                        </tr>
                    </thead>
                    <tbody>${B}</tbody>
                </table>
            `,$="PTW-ANALYSIS-"+new Date().toISOString().slice(0,10),j=O,C=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML($,j,b,!1,!0,{source:"PTWAnalysis"},new Date().toISOString(),new Date().toISOString()):`<html dir="${s}" lang="${o}"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(j)}</title></head><body>${b}</body></html>`,y=new Blob([C],{type:"text/html;charset=utf-8"}),G=URL.createObjectURL(y),P=window.open(G,"_blank");P?P.onload=()=>{setTimeout(()=>{P.print(),setTimeout(()=>{URL.revokeObjectURL(G),Loading.hide(),Notification.success(PTW._t("module.ptw.pdf.readyPrint","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF"))},800)},500)}:(Loading.hide(),Notification.error(this._t("module.ptw.notify.popupsPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")))}catch(l){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 PDF:",l);const p=this._t("module.ptw.notify.unknownError","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641");Notification.error(this._t("module.ptw.notify.pdfErr","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: ")+(l&&l.message?l.message:p))}},setupAnalysisEventListeners(){setTimeout(()=>{this.updatePTWAnalyticsDashboard()},150),this._ptwBindAnalyticsEvents();const e=document.getElementById("ptw-analysis-add");if(e){const a=e.cloneNode(!0);e.parentNode.replaceChild(a,e),a.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),this.showAnalysisForm()})}const t=document.getElementById("ptw-analysis-export-excel");if(t){const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>this.exportAnalysisReportToExcel())}},_ptwBindAnalyticsEvents(){const e=document.getElementById("ptw-analytics-root");if(!e)return;e.querySelectorAll(".ptw-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._ptwPeriod=o.getAttribute("data-period"),e.querySelectorAll(".ptw-period-btn").forEach(n=>{const l=n===o;n.style.background=l?"#fff":"rgba(255,255,255,0.15)",n.style.color=l?"#1e3a5f":"#fff"}),this.updatePTWAnalyticsDashboard()})});const t=document.getElementById("ptw-analytics-refresh");t&&t.addEventListener("click",()=>this.updatePTWAnalyticsDashboard());const a=document.getElementById("ptw-export-pdf-btn");a&&a.addEventListener("click",()=>this._ptwExportPDF());const i=document.getElementById("ptw-toggle-filters-btn"),r=document.getElementById("ptw-filter-panel");i&&r&&i.addEventListener("click",()=>{const o=r.style.display!=="none";r.style.display=o?"none":"block",i.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const s=document.getElementById("ptw-filter-reset-btn");s&&s.addEventListener("click",()=>{["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(o=>{const n=document.getElementById(o);n&&(n.value="")}),this.updatePTWAnalyticsDashboard()}),["ptw-af-status","ptw-af-work-type","ptw-af-authorized","ptw-af-requesting","ptw-af-location"].forEach(o=>{const n=document.getElementById(o);n&&n.addEventListener("change",()=>this.updatePTWAnalyticsDashboard())})},async updatePTWAnalyticsDashboard(){if(!document.getElementById("ptw-analytics-root"))return;try{AppState.appData||(AppState.appData={})}catch{}const t=parseInt(this._ptwPeriod||"0",10),a=this.getAnalysisPermits(),i=this._ptwFilterByPeriod(a,t);this._ptwPopulateFilters(i);const r=this._ptwApplyFilters(i),s=r.length,o=document.getElementById("ptw-filter-count");o&&(o.textContent=`${s} \u062A\u0635\u0631\u064A\u062D`);const n=r.filter(C=>this.isPermitOpenStatus(C?.status)).length,l=r.filter(C=>this.isPermitClosedStatus(C?.status)).length,p=r.filter(C=>(C.status||"").trim()==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647").length,d=r.filter(C=>C?.isManualEntry!==!0&&(C.status||"").trim()==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,c=r.filter(C=>(C.status||"").trim()==="\u0645\u0631\u0641\u0648\u0636").length,u=s>0?Math.round(l/s*100):0,m=s>0?Math.round(n/s*100):0,h=s>0?Math.round(p/s*100):0,f=r.filter(C=>{const y=new Date(C.startDate||C.openDate||C.createdAt||""),G=new Date;return!isNaN(y)&&y.getFullYear()===G.getFullYear()&&y.getMonth()===G.getMonth()}).length,w={};r.forEach(C=>{const y=(C.requestingParty||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";y!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&y!=="\u2014"&&(w[y]=(w[y]||0)+1)});const x=Object.entries(w).sort((C,y)=>y[1]-C[1]),A=x[0],v=A?A[0]:"\u0644\u0627 \u064A\u0648\u062C\u062F",U=A?A[1]:0,W=document.getElementById("ptw-kpi-strip");if(W){const C=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",value:s,icon:"fas fa-clipboard-check",color:"#1d4ed8",bg:"#dbeafe",border:"#bfdbfe"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629 / \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",value:n,icon:"fas fa-folder-open",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u063A\u0644\u0642\u0629 / \u0645\u0643\u062A\u0645\u0644\u0629",value:l,icon:"fas fa-check-circle",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627",value:p,icon:"fas fa-thumbs-up",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",value:d,icon:"fas fa-clock",color:"#b45309",bg:"#fffbeb",border:"#fde68a"},{label:"\u0645\u0631\u0641\u0648\u0636\u0629",value:c,icon:"fas fa-times-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:u+"%",icon:"fas fa-chart-pie",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B",value:U>0?v:"\u2014",icon:"fas fa-hotel",color:"#2563eb",bg:"#eff6ff",border:"#bfdbfe",subText:U>0?`${U} \u062A\u0635\u0631\u064A\u062D`:""},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:f,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"}];W.innerHTML=C.map(y=>`
                <div style="background:${y.bg};border:1px solid ${y.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;min-width:0;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${y.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${y.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div style="min-width:0;flex:1;">
                        <div style="font-size:1.1rem;font-weight:800;color:${y.color};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${y.value}">${y.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${y.label}</div>
                        ${y.subText?`<div style="font-size:0.62rem;color:${y.color};opacity:0.8;font-weight:700;">${y.subText}</div>`:""}
                    </div>
                </div>`).join("")}if(!await this._ptwEnsureChartJS()||typeof Chart>"u")return;const D={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"rgba(124,58,237,0.85)",\u0645\u0641\u062A\u0648\u062D:"rgba(217,119,6,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"rgba(217,119,6,0.85)",\u0645\u063A\u0644\u0642:"rgba(5,150,105,0.85)","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"rgba(5,150,105,0.85)",\u0645\u0631\u0641\u0648\u0636:"rgba(220,38,38,0.85)","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"rgba(220,38,38,0.8)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(234,179,8,0.85)"},M=this._ptwGroupBy(r,"status");this._ptwDrawDoughnut("ptw-chart-status",M.labels,M.data,M.labels.map(C=>D[C]||"rgba(148,163,184,0.8)"));const R=this._ptwGroupByMulti(r,"workType",10);this._ptwDrawDoughnut("ptw-chart-work-type",R.labels,R.data,this._ptwChartColors(R.labels.length)),this._ptwDrawTrend("ptw-chart-timeline",r);const F=this._ptwGroupBy(r,"authorizedParty",10);this._ptwDrawHBar("ptw-chart-authorized",F.labels,F.data,"rgba(245,158,11,0.75)");const k=this._ptwGroupBy(r,"requestingParty",10);this._ptwDrawHBar("ptw-chart-requesting",k.labels,k.data,"rgba(139,92,246,0.75)");const S={},I=this.getSiteOptions().map(C=>C.name.trim());r.forEach(C=>{const y=String(C.location||C.siteName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(I.includes(y)){const G=String(C.sublocation||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",P=`${y} - ${G}`;S[P]=(S[P]||0)+1}});let B=Object.entries(S).sort((C,y)=>y[1]-C[1]).slice(0,10);B.sort((C,y)=>{const G=C[0].split(" - ")[0],P=y[0].split(" - ")[0];return G!==P?G.localeCompare(P,"ar"):y[1]-C[1]});const O=document.getElementById("ptw-locs-list");O&&(s===0?O.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':O.innerHTML=B.map(([C,y])=>{const G=C.split(" - "),P=G[0]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",H=G[1]||"\u0645\u0648\u0642\u0639 \u0639\u0627\u0645",Y=Math.round(y/s*100);return`
                        <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                                    <span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;flex-shrink:0;">${Utils.escapeHTML(P)}</span>
                                    <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(H)}">${Utils.escapeHTML(H)}</span>
                                </div>
                                <span style="font-size:0.75rem;font-weight:700;color:#0369a1;flex-shrink:0;margin-right:8px;">${y} \u062A\u0635\u0631\u064A\u062D (${Y}%)</span>
                            </div>
                            <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${Y}%;height:100%;background:linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);border-radius:9999px;"></div>
                            </div>
                        </div>
                    `}).join(""));const V=document.getElementById("ptw-depts-list");V&&(s===0?V.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':V.innerHTML=x.map(([C,y])=>{const G=Math.round(y/s*100);return`
                        <div>
                            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#374151;margin-bottom:4px;">
                                <span>${Utils.escapeHTML(C)}</span>
                                <span style="color:#2563eb;">${y} \u062A\u0635\u0631\u064A\u062D (${G}%)</span>
                            </div>
                            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:9999px;overflow:hidden;">
                                <div style="width:${G}%;height:100%;background:linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);border-radius:9999px;transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    `}).join(""));const te=document.getElementById("ptw-factories-cards");if(te)if(s===0)te.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';else{const C=this.getSiteOptions();te.innerHTML=C.map((y,G)=>{const P=y.name.trim(),H=r.filter(oe=>(oe.location||oe.siteName||"").trim()===P),Y=H.length,ne=Math.round(Y/s*100)||0,ie=H.filter(oe=>this.isPermitOpenStatus(oe?.status)).length,ee=H.filter(oe=>this.isPermitClosedStatus(oe?.status)).length,de=[{primary:"#0284c7",light:"#e0f2fe",progress:"linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"},{primary:"#059669",light:"#ecfdf5",progress:"linear-gradient(90deg, #34d399 0%, #059669 100%)"},{primary:"#7c3aed",light:"#f5f3ff",progress:"linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)"}],Q=de[G%de.length];return`
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                             onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${Q.primary}'" 
                             onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                             onclick="const el = document.getElementById('ptw-af-location'); if(el){el.value='${P}'; el.dispatchEvent(new Event('change'));}">
                            
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <div style="width:36px;height:36px;background:${Q.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${Q.primary};">
                                        <i class="fas fa-industry" style="font-size:16px;"></i>
                                    </div>
                                    <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(P)}</span>
                                </div>
                                <span style="font-size:1.15rem;font-weight:900;color:${Q.primary};">${ne}%</span>
                            </div>
                            
                            <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${ne}%;height:100%;background:${Q.progress};border-radius:9999px;"></div>
                            </div>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px;border-top:1px solid #f1f5f9;padding-top:12px;">
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#64748b;margin-bottom:2px;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#1e293b;">${Y}</div>
                                </div>
                                <div style="text-align:center;border-left:1px solid #f1f5f9;border-right:1px solid #f1f5f9;">
                                    <div style="font-size:0.65rem;color:#d97706;margin-bottom:2px;">\u0645\u0641\u062A\u0648\u062D\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#d97706;">${ie}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:0.65rem;color:#059669;margin-bottom:2px;">\u0645\u063A\u0644\u0642\u0629</div>
                                    <div style="font-size:0.85rem;font-weight:800;color:#059669;">${ee}</div>
                                </div>
                            </div>
                        </div>
                    `}).join("")}const b=r.slice().sort((C,y)=>{const G=new Date(y.startDate||y.openDate||y.createdAt||""),P=new Date(C.startDate||C.openDate||C.createdAt||"");return G-P}).slice(0,20),$=document.getElementById("ptw-top-count"),j=document.getElementById("ptw-top-tbody");if($&&($.textContent=`${b.length} \u062A\u0635\u0631\u064A\u062D`),j)if(!b.length)j.innerHTML='<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;"><i class="fas fa-info-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';else{const C={"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647":"background:#f5f3ff;color:#5b21b6;",\u0645\u0641\u062A\u0648\u062D:"background:#fffbeb;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#fffbeb;color:#92400e;",\u0645\u063A\u0644\u0642:"background:#ecfdf5;color:#065f46;","\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646":"background:#ecfdf5;color:#065f46;",\u0645\u0631\u0641\u0648\u0636:"background:#fef2f2;color:#991b1b;","\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A":"background:#fef2f2;color:#991b1b;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#fffbeb;color:#92400e;"};j.innerHTML=b.map((y,G)=>{const P=Array.isArray(y.workType)?y.workType.join("\u060C "):y.workType||y.permitType||"\u2014",H=Utils.escapeHTML(y.authorizedParty||"\u2014"),Y=Utils.escapeHTML(y.requestingParty||"\u2014"),ne=Utils.escapeHTML(y.location||y.siteName||"\u2014"),ie=Utils.escapeHTML(y.workDescription||"\u2014"),ee=G%2===0?"#fff":"#fafafa",de=C[y.status]||"background:#f1f5f9;color:#374151;",Q=y.startDate||y.openDate||y.createdAt||"",oe=Q?(()=>{try{return new Date(Q).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"})}catch{return Q.slice(0,10)}})():"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${ee};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${ee}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${ie}">${ie}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${Utils.escapeHTML(Array.isArray(y.workType)?y.workType.join("\u060C "):y.workType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${H}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${Y}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${ne}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${oe}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:700;white-space:nowrap;${de}">${Utils.escapeHTML(y.status||"\u2014")}</span></td>
                    </tr>`}).join("")}},_ptwFilterByPeriod(e,t){if(!t||t===0)return e;const a=new Date;return a.setDate(a.getDate()-t),e.filter(i=>{const r=new Date(i.startDate||i.openDate||i.createdAt||"");return!isNaN(r.getTime())&&r>=a})},_ptwGroupBy(e,t,a=0){const i={};e.forEach(s=>{const o=String(s[t]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[o]=(i[o]||0)+1});let r=Object.entries(i).sort((s,o)=>o[1]-s[1]);return a>0&&(r=r.slice(0,a)),{labels:r.map(s=>s[0]),data:r.map(s=>s[1])}},_ptwGroupByMulti(e,t,a=0){const i={};e.forEach(s=>{const o=s[t];(Array.isArray(o)?o:o?[String(o)]:["\u0623\u062E\u0631\u0649"]).forEach(l=>{const p=(l||"").trim()||"\u0623\u062E\u0631\u0649";i[p]=(i[p]||0)+1})});let r=Object.entries(i).sort((s,o)=>o[1]-s[1]);return a>0&&(r=r.slice(0,a)),{labels:r.map(s=>s[0]),data:r.map(s=>s[1])}},_ptwPopulateFilters(e){const t=s=>[...new Set(e.map(s).flat().filter(o=>o&&o!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))].sort(),a=(s,o)=>{const n=document.getElementById(s);if(!n)return;const l=n.value;n.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+o.map(p=>`<option value="${p}"${p===l?" selected":""}>${p}</option>`).join("")};a("ptw-af-status",t(s=>[String(s.status||"").trim()])),a("ptw-af-work-type",t(s=>Array.isArray(s.workType)?s.workType.map(o=>(o||"").trim()):[(s.workType||"").trim()])),a("ptw-af-authorized",t(s=>[String(s.authorizedParty||"").trim()])),a("ptw-af-requesting",t(s=>[String(s.requestingParty||"").trim()]));const i=this.getSiteOptions().map(s=>s.name.trim()),r=t(s=>[String(s.location||s.siteName||"").trim()]).filter(s=>i.includes(s));a("ptw-af-location",r)},_ptwApplyFilters(e){const t=p=>{const d=document.getElementById(p);return d?d.value.trim():""},a=t("ptw-af-status"),i=t("ptw-af-work-type"),r=t("ptw-af-authorized"),s=t("ptw-af-requesting"),o=t("ptw-af-location"),n=[a,i,r,s,o].some(p=>p!==""),l=document.getElementById("ptw-filter-badge");return l&&(l.style.display=n?"inline":"none"),e.filter(p=>!(a&&String(p.status||"").trim()!==a||i&&!(Array.isArray(p.workType)?p.workType:[p.workType||""]).some(c=>(c||"").trim()===i)||r&&String(p.authorizedParty||"").trim()!==r||s&&String(p.requestingParty||"").trim()!==s||o&&String(p.location||p.siteName||"").trim()!==o))},_ptwDrawDoughnut(e,t,a,i){const r=document.getElementById(e),s=document.getElementById(e+"-empty");if(!r)return;if(!a.length||a.reduce((l,p)=>l+p,0)===0){r.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),r.style.display="";const o=a.reduce((l,p)=>l+p,0);this._ptwCharts||(this._ptwCharts={});const n=this._ptwCharts[e];if(n)try{n.destroy()}catch{}this._ptwCharts[e]=new Chart(r,{type:"doughnut",data:{labels:t,datasets:[{data:a,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,font:{size:11},padding:12}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${Math.round(l.parsed/o*100)}%)`}}}}})},_ptwDrawHBar(e,t,a,i){const r=document.getElementById(e),s=document.getElementById(e+"-empty");if(!r)return;if(!a.length){r.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),r.style.display="",this._ptwCharts||(this._ptwCharts={});const o=this._ptwCharts[e];if(o)try{o.destroy()}catch{}this._ptwCharts[e]=new Chart(r,{type:"bar",data:{labels:t,datasets:[{data:a,backgroundColor:i,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:n=>` ${n.parsed.x} \u062A\u0635\u0631\u064A\u062D`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>String(t[n]).length>20?String(t[n]).slice(0,19)+"\u2026":t[n]}}}}})},_ptwDrawTrend(e,t){const a=document.getElementById(e),i=document.getElementById(e+"-empty");if(!a)return;const r=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let p=11;p>=0;p--){const d=new Date(r.getFullYear(),r.getMonth()-p,1);o.push({year:d.getFullYear(),month:d.getMonth(),label:`${s[d.getMonth()]} ${d.getFullYear()}`})}const n=o.map(p=>t.filter(d=>{const c=new Date(d.startDate||d.openDate||d.createdAt||"");return!isNaN(c.getTime())&&c.getFullYear()===p.year&&c.getMonth()===p.month}).length);if(n.reduce((p,d)=>p+d,0)===0){a.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),a.style.display="",this._ptwCharts||(this._ptwCharts={});const l=this._ptwCharts[e];if(l)try{l.destroy()}catch{}this._ptwCharts[e]=new Chart(a,{type:"bar",data:{labels:o.map(p=>p.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",data:n,backgroundColor:n.map(p=>p===Math.max(...n)?"rgba(29,78,216,0.85)":"rgba(29,78,216,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:n,type:"line",borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#10b981",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},async _ptwEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),t(!0))},100);setTimeout(()=>{clearInterval(a),t(!1)},5e3)}):new Promise(t=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>t(!1),document.head.appendChild(i)},document.head.appendChild(a)})},_ptwChartColors(e){const t=["rgba(29,78,216,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(249,115,22,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(a,i)=>t[i%t.length])},async _ptwExportPDF(){const e=document.getElementById("ptw-analytics-root");if(!e)return;const t=document.getElementById("ptw-export-pdf-btn"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const i=(W,_)=>new Promise((D,M)=>{if(_())return D();const R=document.createElement("script");R.src=W,R.onload=()=>D(),R.onerror=()=>M(new Error("Failed: "+W)),document.head.appendChild(R)});await i("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await i("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const r=document.getElementById("ptw-filter-panel"),s=r&&r.style.display!=="none";s&&(r.style.display="none");const o=await html2canvas(e,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});s&&(r.style.display="");const{jsPDF:n}=window.jspdf,l=new n({orientation:"portrait",unit:"mm",format:"a4"}),p=l.internal.pageSize.getWidth(),d=l.internal.pageSize.getHeight(),c=10,u=20,m=14,h=p-c*2,f=d-u-m-c*.5,w=h/o.width,x=f/w,A=Math.ceil(o.height/x),v=new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),U=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});for(let W=0;W<A;W++){W>0&&l.addPage(),l.setFillColor(30,58,95),l.rect(0,0,p,u,"F"),l.setFillColor(29,78,216),l.rect(0,u-3,p,3,"F"),l.setTextColor(255,255,255),l.setFontSize(13),l.setFont(void 0,"bold"),l.text("Work Permits Analytics Report",c,9,{align:"left"}),l.setFontSize(8),l.setFont(void 0,"normal"),l.text("HSE Management System \u2014 Permit to Work Analysis Dashboard",c,15,{align:"left"}),l.setFontSize(8.5),l.text(`${v}  ${U}`,p-c,9,{align:"right"}),l.setFontSize(9),l.setFont(void 0,"bold"),l.text(`Page ${W+1} of ${A}`,p-c,15.5,{align:"right"}),l.setTextColor(0,0,0);const _=document.createElement("canvas"),D=Math.min(x,o.height-W*x);_.width=o.width,_.height=D,_.getContext("2d").drawImage(o,0,W*x,o.width,D,0,0,o.width,D);const{dataUrl:M,format:R}=Utils.PdfExport.compressCanvasToJpegDataUrl(_,Math.floor(Utils.PdfExport.TARGET_MAX_BYTES/Math.max(1,A)));l.addImage(M,R,c,u,h,D*w);const F=d-m;l.setDrawColor(191,219,254),l.setLineWidth(.4),l.line(0,F,p,F),l.setFillColor(239,246,255),l.rect(0,F,p,m,"F"),l.setFontSize(7.5),l.setTextColor(29,78,216),l.setFont(void 0,"bold"),l.text("HSE Management System",c,F+5,{align:"left"}),l.setFont(void 0,"normal"),l.setFontSize(6.5),l.setTextColor(100,116,139),l.text("Work Permits Analysis Report \u2014 Confidential",c,F+10,{align:"left"}),l.setFontSize(8),l.setTextColor(29,78,216),l.setFont(void 0,"bold"),l.text(`${W+1} / ${A}`,p/2,F+7.5,{align:"center"}),l.setFont(void 0,"normal"),l.setFontSize(7),l.setTextColor(100,116,139),l.text(v,p-c,F+5,{align:"right"}),l.text(U,p-c,F+10,{align:"right"})}l.save(`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u062A\u0635\u0627\u0631\u064A\u062D-\u0627\u0644\u0639\u0645\u0644-${new Date().toISOString().slice(0,10)}.pdf`)}catch{}finally{t&&(t.disabled=!1,t.innerHTML=a)}},showAnalysisForm(e=null){AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),AppState.appData.ptw||(AppState.appData.ptw=[]);const t=e?AppState.appData.ptwAnalysis.find(c=>c&&c.id===e):null,a=AppState.appData.ptw||[],i=[...new Set(a.map(c=>c&&c.workType).filter(Boolean))],r=[...new Set(a.map(c=>c&&(c.siteName||c.location)).filter(Boolean))],s=(c,u)=>this._t(c,u),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-chart-line ml-2"></i>
                        ${t?s("module.ptw.analysis.form.titleEdit","\u062A\u0639\u062F\u064A\u0644 \u062A\u062D\u0644\u064A\u0644"):s("module.ptw.analysis.form.titleAdd","\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F")}
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
                                value="${t?.analysisDate?new Date(t.analysisDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.periodLabel","\u0627\u0644\u0641\u062A\u0631\u0629")}</label>
                            <input type="text" id="analysis-period" class="form-input" placeholder="${s("module.ptw.analysis.form.periodPh","\u0645\u062B\u0627\u0644: \u064A\u0646\u0627\u064A\u0631 2024")}"
                                value="${Utils.escapeHTML(t?.period||"")}">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.workType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</label>
                                <select id="analysis-work-type" class="form-input">
                                    <option value="">${s("module.ptw.analysis.form.allTypes","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639")}</option>
                                    ${i.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${t?.workType===c?"selected":""}>
                                            ${Utils.escapeHTML(c)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</label>
                                <select id="analysis-location" class="form-input">
                                    <option value="">${s("module.ptw.analysis.form.allSites","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")}</option>
                                    ${r.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${t?.location===c?"selected":""}>
                                            ${Utils.escapeHTML(c)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.notesLabel","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</label>
                            <textarea id="analysis-notes" class="form-input" rows="6" placeholder="${s("module.ptw.analysis.form.notesPh","\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C...")}">${Utils.escapeHTML(t?.notes||"")}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${s("module.ptw.analysis.form.recsLabel","\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A")}</label>
                            <textarea id="analysis-recommendations" class="form-input" rows="4" placeholder="${s("module.ptw.analysis.form.recsPh","\u0623\u062F\u062E\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A...")}">${Utils.escapeHTML(t?.recommendations||"")}</textarea>
                        </div>
                    </div>
                    <div class="modal-footer mt-6 form-actions-centered">
                        <button type="button" class="btn-secondary" data-action="close">${s("module.ptw.analysis.form.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${t?s("module.ptw.analysis.form.update","\u062A\u062D\u062F\u064A\u062B"):s("module.ptw.analysis.form.save","\u062D\u0641\u0638")}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(o);const n=()=>{o&&o.parentNode&&o.remove()},l=o.querySelector(".modal-close");l&&l.addEventListener("click",n);const p=o.querySelector('[data-action="close"]');p&&p.addEventListener("click",n),o.addEventListener("click",c=>{(c.target===o||c.target.classList.contains("modal-overlay"))&&confirm(PTW._t("module.ptw.form.analysis.closeUnsaved","\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.\\n\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.\\n\\n\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F").replace(/\\n/g,`
`))&&n()});const d=document.getElementById("ptw-analysis-form");d?d.addEventListener("submit",async c=>{c.preventDefault(),await this.saveAnalysis(e,o)}):Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644")},async saveAnalysis(e,t){try{const a=document.getElementById("analysis-date");if(!a||!a.value){Notification.error(this._t("module.ptw.notify.dateRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644"));return}const i=new Date(a.value);if(isNaN(i.getTime())){Notification.error(this._t("module.ptw.notify.dateInvalid","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D"));return}const r={id:e||Utils.generateId("PTW_ANALYSIS"),analysisDate:i.toISOString(),period:(document.getElementById("analysis-period")?.value||"").trim(),workType:(document.getElementById("analysis-work-type")?.value||"").trim(),location:(document.getElementById("analysis-location")?.value||"").trim(),notes:(document.getElementById("analysis-notes")?.value||"").trim(),recommendations:(document.getElementById("analysis-recommendations")?.value||"").trim(),createdAt:e&&AppState.appData.ptwAnalysis?AppState.appData.ptwAnalysis.find(o=>o&&o.id===e)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]),e){const o=AppState.appData.ptwAnalysis.findIndex(n=>n&&n.id===e);o!==-1?AppState.appData.ptwAnalysis[o]={...AppState.appData.ptwAnalysis[o],...r}:(Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062A\u062D\u062F\u064A\u062B\u060C \u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u0644\u064A\u0644 \u062C\u062F\u064A\u062F"),AppState.appData.ptwAnalysis.push(r))}else AppState.appData.ptwAnalysis.push(r);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(e?this._t("module.ptw.notify.analysisUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"):this._t("module.ptw.notify.analysisAdded","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")),t&&t.parentNode&&t.remove();const s=document.getElementById("ptw-analysis-content");s&&(s.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",a),Notification.error(this._t("module.ptw.notify.analysisSaveErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},editAnalysis(e){this.showAnalysisForm(e)},async deleteAnalysis(e){if(confirm(this._t("module.ptw.notify.deleteAnalysisConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u061F")))try{AppState.appData||(AppState.appData={}),AppState.appData.ptwAnalysis||(AppState.appData.ptwAnalysis=[]);const t=AppState.appData.ptwAnalysis.length;if(AppState.appData.ptwAnalysis=AppState.appData.ptwAnalysis.filter(i=>i&&i.id!==e),AppState.appData.ptwAnalysis.length===t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0644\u062D\u0630\u0641"),Notification.warning(this._t("module.ptw.notify.analysisNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F"));return}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(this._t("module.ptw.notify.analysisDeleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"));const a=document.getElementById("ptw-analysis-content");a&&(a.innerHTML=this.renderAnalysisContent(),this.setupAnalysisEventListeners())}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",t),Notification.error(this._t("module.ptw.notify.analysisDeleteErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u062D\u0644\u064A\u0644"))}},renderApprovalsContent(){const e=document.getElementById("ptw-map-content");e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.position="absolute",e.style.left="-9999px",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.style.pointerEvents="none",e.style.zIndex="-1");try{const t=(s,o)=>this._t(s,o),a=AppState.currentUser?.email?.toLowerCase()||"",r=(AppState.appData.ptw||[]).map(s=>{try{return s&&s.approvals&&this.updatePermitStatus(s),s}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0635\u0631\u064A\u062D:",o),s}}).filter(s=>{try{const o=(s?.status||"").trim();if(!s||s.isManualEntry===!0||s.skipApprovalFlow===!0||!s||o==="\u0645\u063A\u0644\u0642"||o==="\u0645\u0631\u0641\u0648\u0636"||o==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||o==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A")return!1;const l=this.normalizeApprovals(s.approvals||[]).find(m=>m&&m.status==="pending");if(!l)return!1;const p=l.approverEmail&&l.approverEmail.toLowerCase()===a,d=!l.approverEmail&&Array.isArray(l.candidates)&&l.candidates.some(m=>m&&m.email&&m.email.toLowerCase()===a),c=AppState.currentUser?.id||"",u=!p&&l.approverId&&(l.approverId===c||l.approverId===a);return p||d||u}catch(o){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u0635\u0631\u064A\u062D \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",o),!1}}).sort((s,o)=>{const n=s?.createdAt?new Date(s.createdAt).getTime():0;return(o?.createdAt?new Date(o.createdAt).getTime():0)-n});return`
            <div class="space-y-6">
                <!-- My Pending Approvals -->
                <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <div class="card-header bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 p-4 flex justify-between items-center">
                        <h2 class="card-title text-blue-800 font-bold text-lg">
                            <i class="fas fa-signature ml-2 text-blue-600"></i>
                            ${t("module.ptw.approvals.myPending","\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u064A")}
                            <span class="mr-2 bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full">${r.length}</span>
                        </h2>
                        <button onclick="PTW.refreshApprovalsContent()" class="btn-secondary btn-sm flex items-center gap-2" title="${t("module.ptw.approvals.updateList","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629")}">
                            <i class="fas fa-sync-alt"></i>
                            <span>${t("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}</span>
                        </button>
                    </div>
                    <div class="card-body p-0">
                        ${r.length?`
                            <div class="overflow-x-auto">
                                <table class="w-full text-right">
                                    <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                                        <tr>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colPermit","\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D")}</th>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colWorkType","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644")}</th>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colLocation","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colStart","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621")}</th>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colStatus","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                                            <th class="px-6 py-4">${t("module.ptw.approvals.colAction","\u0627\u0644\u0625\u062C\u0631\u0627\u0621")}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${r.map(s=>{try{const o=s?.id||"",n=t("module.ptw.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),l=Utils.escapeHTML(String(s?.workType||n)),p=Utils.escapeHTML(String(s?.location||s?.siteName||n)),d=s?.startDate?typeof Utils.formatDate=="function"?Utils.formatDate(s.startDate):new Date(s.startDate).toLocaleDateString("ar-SA"):"-",u=this.normalizeApprovals(s.approvals||[]).find(A=>A&&A.status==="pending"),m=u&&u.role||t("module.ptw.approval.approvalRequired","\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629"),h=String(s?.requesterName||s?.requestedBy?.name||s?.requestedBy||n),f=h!==n?`<div class="text-xs text-gray-500 mt-1">${t("module.ptw.approvals.fromRequester","\u0645\u0646: {name}").replace(/\{name\}/g,Utils.escapeHTML(h))}</div>`:"",w=this.statusLabel(s?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"),x=this.approvalRoleLabel(m);return`
                                                    <tr class="hover:bg-gray-50 transition-colors">
                                                        <td class="px-6 py-4">
                                                            <div class="font-mono text-sm text-gray-700 font-semibold">#${Utils.escapeHTML(String(o))}</div>
                                                            ${f}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="font-medium text-gray-800">${l}</div>
                                                            ${x?`<div class="text-xs text-blue-600 mt-1">
                                                                <i class="fas fa-tasks mr-1"></i>${Utils.escapeHTML(x)}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4 text-gray-600 text-sm">${p}</td>
                                                        <td class="px-6 py-4">
                                                            <div class="text-gray-600 text-sm">${d}</div>
                                                            ${s?.createdAt?`<div class="text-xs text-gray-500 mt-1">
                                                                ${t("module.ptw.approvals.createdOn","\u0625\u0646\u0634\u0627\u0621: ")}${typeof Utils.formatDate=="function"?Utils.formatDate(s.createdAt):new Date(s.createdAt).toLocaleDateString("ar-SA")}
                                                            </div>`:""}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                <i class="fas fa-clock mr-1"></i> ${t("module.ptw.approvals.badge","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u062A\u0643")}
                                                            </span>
                                                            <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(String(w))}</div>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <button onclick="PTW.viewPTW('${Utils.escapeHTML(String(o))}')" class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center justify-center">
                                                                <i class="fas fa-eye ml-1"></i> ${t("module.ptw.approvals.review","\u0645\u0631\u0627\u062C\u0639\u0629")}
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
                                <h3 class="text-gray-900 font-medium">${t("module.ptw.approvals.noneTitle","\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0645\u0639\u0644\u0642\u0629")}</h3>
                                <p class="text-gray-500 text-sm mt-1">${t("module.ptw.approvals.noneSub","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0648\u0643\u0644\u0629 \u0625\u0644\u064A\u0643 \u0645\u0643\u062A\u0645\u0644\u0629.")}</p>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Approval Circuits Integration -->
                 <div class="content-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="card-header bg-gradient-to-r from-purple-50 to-white border-b border-purple-100 p-4">
                        <h2 class="card-title text-purple-800 font-bold text-lg">
                            <i class="fas fa-project-diagram ml-2 text-purple-600"></i>
                             ${t("module.ptw.approvals.circuits","\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}
                        </h2>
                    </div>
                    <div class="card-body p-6">
                        <div id="approval-circuits-container">
                             ${typeof ApprovalCircuits<"u"&&typeof ApprovalCircuits.renderManager=="function"?(()=>{try{return ApprovalCircuits.renderManager("ptw")}catch(s){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",s),`
                            <div class="text-center py-8">
                                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
                                    <p class="text-yellow-800 text-sm">${t("module.ptw.approvals.circuitsError","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}</p>
                                </div>
                            </div>
                        `}})():`
                                    <div class="text-center py-8">
                                        <div class="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <i class="fas fa-route text-purple-400 text-2xl"></i>
                                        </div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-2">${t("module.ptw.approvals.circuitsTitle","\u0646\u0638\u0627\u0645 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</h3>
                                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">${t("module.ptw.approvals.circuitsDesc","\u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u062A\u0643\u0648\u064A\u0646\u0627\u062A \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A.")}</p>
                                        <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-2xl mx-auto text-right">
                                            <h4 class="font-bold text-blue-800 mb-2 text-sm">${t("module.ptw.approvals.circuitsHow","\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A\u061F")}</h4>
                                            <ul class="text-sm text-blue-700 space-y-2 list-disc list-inside">
                                                <li>${t("module.ptw.approvals.circuitsLi1","\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u062A\u0635\u0631\u064A\u062D \u0648\u0627\u0644\u0645\u0648\u0642\u0639.")}</li>
                                                <li>${t("module.ptw.approvals.circuitsLi2","\u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646 \u062A\u0639\u064A\u064A\u0646 \u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u062D\u062F\u062F\u064A\u0646 \u0644\u0643\u0644 \u0645\u0631\u062D\u0644\u0629.")}</li>
                                                <li>${t("module.ptw.approvals.circuitsLi3","\u062A\u0635\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u062F\u0648\u0631\u0647\u0645 \u0641\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                `}
                        </div>
                    </div>
                 </div>
            </div>
        `}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",t);const a=(i,r)=>this._t(i,r);return`
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
            `}},refreshApprovalsContent(){try{const e=document.getElementById("ptw-approvals-content");e&&(e.innerHTML=this.renderApprovalsContent(),this.setupApprovalsEventListeners(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"),typeof Notification<"u"&&Notification.success(this._t("module.ptw.approvals.notifyUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629")))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",e),typeof Notification<"u"&&Notification.error(this._t("module.ptw.approvals.notifyErr","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A"))}},setupApprovalsEventListeners(){setTimeout(()=>{document.querySelectorAll('[onclick*="PTW.viewPTW"]').forEach(a=>{const i=a.getAttribute("onclick");if(i&&i.includes("viewPTW")){const r=i.match(/viewPTW\('([^']+)'\)/);r&&r[1]&&(a.removeAttribute("onclick"),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),this.viewPTW(r[1])}))}});const t=document.querySelector('[onclick*="refreshApprovalsContent"]');t&&!t.dataset.listenerAttached&&(t.removeAttribute("onclick"),t.addEventListener("click",()=>this.refreshApprovalsContent()),t.dataset.listenerAttached="true")},100)},loadPTWList(e=!1){this._loadPTWListTimeout&&(clearTimeout(this._loadPTWListTimeout),this._loadPTWListTimeout=null);const t=()=>{try{const a=document.querySelector("#ptw-table-container");if(!a)return;let i=a.querySelector("table");const r=i?.querySelector("tbody"),s=r&&r.querySelectorAll("tr").length>0&&!r.querySelector('tr[data-ptw-loading="1"]');if(i){if(!s&&i.parentNode&&document.body.contains(i)){if(!i.querySelector("thead")){const o=document.createElement("thead");o.innerHTML=`
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
                            `;try{i.insertBefore(o,i.firstChild)}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A insertBefore \u0644\u0644\u0640 thead:",n)}}if(!i.querySelector("tbody")){const o=document.createElement("tbody");o.innerHTML=`
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
                            `;try{i.appendChild(o)}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u0640 tbody:",n)}}}}else if(i=document.createElement("table"),i.className="data-table",i.innerHTML=`
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
                    `,a.innerHTML="",a.parentNode&&document.body.contains(a))try{a.appendChild(i)}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A appendChild \u0644\u0644\u062C\u062F\u0648\u0644:",o)}this.filterItems(),this.updateSublocationFilterOptions()}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D:",a)}};e?t():this._loadPTWListTimeout=setTimeout(t,100)},protectTabButtons(){const e=document.querySelectorAll(".ptw-tab-btn"),t=document.querySelector(".ptw-tabs");t&&(t.style.setProperty("flex-wrap","nowrap","important"),t.style.setProperty("min-width","0","important"),t.style.setProperty("width","100%","important"),t.style.setProperty("max-width","100%","important"),t.style.setProperty("box-sizing","border-box","important")),e.forEach(a=>{a.classList.remove("flex-1"),a.style.setProperty("flex-shrink","0","important"),a.style.setProperty("flex-grow","0","important"),a.style.setProperty("flex-basis","auto","important"),a.style.setProperty("min-width","fit-content","important"),a.style.setProperty("white-space","nowrap","important"),a.style.setProperty("width","auto","important"),a.style.setProperty("max-width","none","important"),a.style.setProperty("box-sizing","border-box","important")})},setupTabProtection(){if(this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),!document.querySelector(".ptw-tabs"))return;let t;const a=new MutationObserver(s=>{clearTimeout(t),t=setTimeout(()=>{let o=!1;s.forEach(n=>{if(n.type==="attributes"&&n.attributeName==="style"){const l=n.target;l.classList.contains("ptw-tab-btn")&&(l.style.flexShrink!=="0"||l.style.minWidth!=="fit-content")&&(o=!0)}}),o&&this.protectTabButtons()},50)});this._tabProtectionObserver=a,document.querySelectorAll(".ptw-tab-btn").forEach(s=>{a.observe(s,{attributes:!0,attributeFilter:["style","class"]})});const r=()=>{this._tabResizeTimeout&&clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=setTimeout(()=>{this.protectTabButtons()},150)};if(this._tabResizeHandler=r,window.addEventListener("resize",r,{passive:!0}),!this._loadHandlerBound){const s=()=>{setTimeout(()=>{this.protectTabButtons()},200)};window.addEventListener("load",s,{once:!0}),this._loadHandlerBound=!0}},cleanupTabProtection(){this._tabProtectionObserver&&(this._tabProtectionObserver.disconnect(),this._tabProtectionObserver=null),this._tabResizeHandler&&(window.removeEventListener("resize",this._tabResizeHandler),this._tabResizeHandler=null),this._tabResizeTimeout&&(clearTimeout(this._tabResizeTimeout),this._tabResizeTimeout=null),this._loadHandlerBound=!1},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module..."),this._deferredSyncTimer&&(clearTimeout(this._deferredSyncTimer),this._deferredSyncTimer=null),this._backendSyncStarted=!1,this.cleanupTabProtection(),typeof this.destroyMap=="function"&&this.destroyMap(),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F PTW module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 PTW module:",e)}}};(function(){"use strict";try{typeof window<"u"&&typeof PTW<"u"&&(window.PTW=PTW,window.addEventListener("formSettingsUpdated",function(){try{typeof PTW<"u"&&PTW.refreshSiteDropdowns&&PTW.refreshSiteDropdowns()}catch{}}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 PTW module loaded and available on window.PTW"))}catch{if(typeof window<"u"&&typeof PTW<"u")try{window.PTW=PTW}catch{}}})();
