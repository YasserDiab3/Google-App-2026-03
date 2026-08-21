function generateDailyObservationId(e){const t=/^DOB-(\d+)$/i,i=/^OBS-\d{6}-(\d+)$/i,a=/(\d+)$/;let s=0;e&&Array.isArray(e)&&e.forEach(function(n){if(!n)return;const r=[];n.id&&r.push(String(n.id).trim()),n.isoCode&&r.push(String(n.isoCode).trim()),r.forEach(function(c){let d=0;const l=c.match(t);if(l)d=parseInt(l[1],10);else{const p=c.match(i);if(p)d=parseInt(p[1],10);else{const f=c.match(a);f&&(d=parseInt(f[1],10))}}!isNaN(d)&&d>s&&(s=d)})});const o=s+1;return"DOB-"+String(o).padStart(4,"0")}function getObservationIsoCodeFromId(e,t="",i=""){if(t&&typeof t=="string"&&t.trim()){const d=t.trim();if(/^OBS-\d{6}-\d+/i.test(d)||/^DOB-\d+/i.test(d))return d}(!e||typeof e!="string")&&(e="");const a=String(e).trim(),s=t&&typeof t=="string"?t.trim():"";let o=null;if(s){const d=s.match(/^OBS-\d{6}-(\d+)$/i);if(d)o=parseInt(d[1],10);else{const l=s.match(/^DOB-(\d+)$/i);if(l)o=parseInt(l[1],10);else{const p=s.match(/(\d+)$/);p&&(o=parseInt(p[1],10))}}}if(o===null||isNaN(o)){const d=a.match(/^DOB-(\d+)$/i);if(d)o=parseInt(d[1],10);else{const l=a.match(/^OBS-\d{6}-(\d+)$/i);if(l)o=parseInt(l[1],10);else if(!/^[a-f0-9]{24}$/i.test(a)){const p=a.match(/(\d+)$/);p&&(o=parseInt(p[1],10))}}}(o===null||isNaN(o))&&(o=0);let n=String(o);for(;n.length<4;)n="0"+n;let r="";const c=s.match(/^OBS-(\d{6})-/i);if(c)r=c[1];else if(i){const d=new Date(i);if(!isNaN(d.getTime())){const l=d.getFullYear(),p=String(d.getMonth()+1).padStart(2,"0");r=`${l}${p}`}}if(!r||!/^\d{6}$/.test(r)){const d=new Date;r=String(d.getFullYear())+String(d.getMonth()+1).padStart(2,"0")}return"OBS-"+r+"-"+n}async function getNextObservationIdFromBackend(){try{if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function")return null;const e=await GoogleIntegration.sendRequest({action:"getNextObservationId",data:{}});return e&&e.success&&e.data&&e.data.id?{id:e.data.id,isoCode:e.data.isoCode||getObservationIsoCodeFromId(e.data.id)}:null}catch(e){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0644\u064A\u062F \u0645\u062D\u0644\u064A\u0627\u064B:",e),null}}const DailyObservations={getCurrentLanguage(){return localStorage.getItem("language")||AppState?.currentLanguage||"ar"},_t(e,t){const i=String(e||"").startsWith("module.")?e:`module.dailyobs.${e}`;if(window.AppI18n&&typeof window.AppI18n.t=="function"){const a=window.AppI18n.t(i,t);if(a&&a!==i)return a}if(window.I18n&&typeof window.I18n.t=="function"){const a=window.I18n.t(i,t);if(a&&a!==i)return a}return t??i.replace("module.dailyobs.","")},_tf(e,t,i){let a=this._t(e,i);return t&&typeof t=="object"&&Object.keys(t).forEach(s=>{a=String(a).replace(new RegExp(`\\{${s}\\}`,"g"),String(t[s]))}),a},applyModuleI18n(e){const t=e&&e.nodeType?e:document.getElementById("daily-observations-section");if(!t)return;const i=window.AppI18n&&typeof window.AppI18n.applyModuleI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyModuleI18n=="function"?window.I18n:null;i&&i.applyModuleI18n(t)},getTranslations(){const e=this.getCurrentLanguage(),t=e==="ar",i={"title.observationsRegistry":"module.dailyobs.registry.title","btn.registerNew":"module.dailyobs.btn.registerNew","btn.reset":"module.dailyobs.btn.reset","btn.refresh":"module.dailyobs.btn.refresh","filter.search":"module.dailyobs.filter.search","filter.site":"module.dailyobs.filter.site","filter.location":"module.dailyobs.filter.location","filter.type":"module.dailyobs.filter.type","filter.shift":"module.dailyobs.filter.shift","filter.risk":"module.dailyobs.filter.risk","filter.status":"module.dailyobs.filter.status","filter.observer":"module.dailyobs.filter.observer","filter.responsible":"module.dailyobs.filter.responsible","filter.all":"module.dailyobs.filter.all","filter.searchPlaceholder":"module.dailyobs.filter.searchPlaceholder","filter.dateFrom":"module.dailyobs.filter.dateFrom","filter.dateTo":"module.dailyobs.filter.dateTo","empty.noObservations":"module.dailyobs.empty.noObservations","empty.noMatching":"module.dailyobs.empty.noMatching"};return{t:s=>{const o=i[s]||(String(s).startsWith("module.")?s:`module.dailyobs.${s}`);return this._t(o,s)},isRTL:t,lang:e}},getObservationTypeLabel(e){const i={"\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629":"module.dailyobs.type.behavioral","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644":"module.dailyobs.type.workCondition","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629":"module.dailyobs.type.tool","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A":"module.dailyobs.type.equipment","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644":"module.dailyobs.type.environment","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649":"module.dailyobs.type.other"}[String(e||"").trim()];return i?this._t(i,e):e||this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")},_getTop10ChartFieldLabel(e){const t={riskCategory:"module.dailyobs.top10.chart.field.riskCategory",riskLevel:"module.dailyobs.top10.chart.field.riskLevel",status:"module.dailyobs.top10.chart.field.status",observationType:"module.dailyobs.top10.chart.field.observationType",siteName:"module.dailyobs.top10.chart.field.siteName",locationName:"module.dailyobs.top10.chart.field.locationName",shift:"module.dailyobs.top10.chart.field.shift",responsibleDepartment:"module.dailyobs.top10.chart.field.responsibleDepartment",observerName:"module.dailyobs.top10.chart.field.observerName"};return this._t(t[e]||e,e)},_getTop10ChartTypeLabel(e){const t={doughnut:"module.dailyobs.top10.chart.type.doughnut",pie:"module.dailyobs.top10.chart.type.pie",bar:"module.dailyobs.top10.chart.type.bar",line:"module.dailyobs.top10.chart.type.line"};return this._t(t[e]||e,e)},_renderTop10ChartFieldOptions(e){return["riskCategory","riskLevel","status","observationType","siteName","locationName","shift","responsibleDepartment","observerName"].map(i=>`<option value="${i}" ${e===i?"selected":""}>${Utils.escapeHTML(this._getTop10ChartFieldLabel(i))}</option>`).join("")},_renderTop10ChartTypeOptions(e){return["doughnut","pie","bar","line"].map(t=>`<option value="${t}" ${e===t?"selected":""}>${Utils.escapeHTML(this._getTop10ChartTypeLabel(t))}</option>`).join("")},hasTabAccess(e){const t=AppState.currentUser;return t?t.role==="admin"?!0:typeof Permissions<"u"?Permissions.hasDetailedPermission("daily-observations",e):!0:!1},buildObservationsRequestContext(){const e=AppState.currentUser;if(!e)return null;let t={};if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function")try{t=(Permissions.getEffectivePermissions(e)||{})["daily-observationsPermissions"]||{}}catch{t={}}return{role:e.role||"",email:(e.email||"").trim(),name:(e.name||"").trim(),department:(e.department||"").trim(),id:e.id||"",dailyObservationsPermissions:{"observations-specialist-review":t["observations-specialist-review"]===!0,"observations-manager-approve":t["observations-manager-approve"]===!0,"observations-view-all":t["observations-view-all"]===!0,"observations-view-department":t["observations-view-department"]!==!1}}},async yieldToMain(){if(typeof scheduler<"u"&&typeof scheduler.yield=="function")try{await scheduler.yield();return}catch{}await new Promise(e=>setTimeout(e,0))},getWorkflowStageLabel(e){const t=String(e||"").trim();return t?(this.WORKFLOW_STAGES||{})[t]||t:"\u2014 (\u0633\u062C\u0644 \u0642\u062F\u064A\u0645)"},_isAdminRole(e){if(!e)return!1;const t=String(e.role||"").trim(),i=t.toLowerCase();return i==="admin"||i==="system_admin"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||t==="\u0645\u062F\u064A\u0631"},canDailyObservationsFullAdminUi(){return this._isAdminRole(AppState.currentUser)?!0:typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():!1},_isSafetyOfficerRole(e){if(!e)return!1;const t=String(e.role||"").trim();return t.toLowerCase()==="safety_officer"||t==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"||t==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},canViewAllObservationsWorkflow(){const e=AppState.currentUser;return e?!!(this._isAdminRole(e)||this._isSafetyOfficerRole(e)||typeof Permissions<"u"&&Permissions.hasDetailedPermission&&(Permissions.hasDetailedPermission("daily-observations","observations-specialist-review")||Permissions.hasDetailedPermission("daily-observations","observations-manager-approve")||Permissions.hasDetailedPermission("daily-observations","observations-view-all"))):!1},hasSpecialistWorkflowPermission(){const e=AppState.currentUser;return e?this._isAdminRole(e)||this._isSafetyOfficerRole(e)?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"):!1},hasManagerWorkflowPermission(){const e=AppState.currentUser;return e?this._isAdminRole(e)?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"):!1},_isSafetyManager(){const e=AppState.currentUser;return e?this._isAdminRole(e)?!0:this.hasManagerWorkflowPermission():!1},_isSafetyOfficer(){const e=AppState.currentUser;return e?this._isSafetyOfficerRole(e)||this.hasSpecialistWorkflowPermission():!1},_buildAfterExecutionPhotosHtml(e){return!e||!Array.isArray(e)||e.length===0?`<p class="text-sm text-gray-500 italic" style="font-family: 'Cairo', sans-serif;"><i class="fas fa-camera ml-1"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</p>`:`
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                ${e.map((t,i)=>`
                    <div class="relative group border-2 border-emerald-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <img src="${t.url||t}" alt="\u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 ${i+1}" 
                             class="w-full h-40 object-cover cursor-pointer" 
                             onclick="window.open('${t.url||t}', '_blank')"
                             style="font-family: 'Cairo', sans-serif;" />
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                            <a href="${t.url||t}" target="_blank" class="opacity-0 group-hover:opacity-100 transition-opacity btn-sm bg-white text-emerald-600 rounded-lg px-4 py-2 font-semibold" style="font-family: 'Cairo', sans-serif;">
                                <i class="fas fa-eye ml-1"></i>\u0639\u0631\u0636
                            </a>
                        </div>
                        ${t.uploadedAt?`
                        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1" style="font-family: 'Cairo', sans-serif;">
                            <i class="fas fa-user ml-1"></i>${Utils.escapeHTML(t.uploadedBy||"Unknown")} | 
                            <i class="fas fa-calendar ml-1"></i>${Utils.formatDate(t.uploadedAt)}
                        </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `},async handleAfterExecutionPhotoUpload(e,t){if(!t||!t.files||t.files.length===0)return;const i=t.files[0];if(!i.type.startsWith("image/")){Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0635\u0648\u0631\u0629 \u0635\u0627\u0644\u062D",5e3);return}const a=5*1024*1024;if(i.size>a){Notification?.error?.("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0646 \u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 5 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A",5e3);return}const s=document.getElementById(`after-execution-preview-container-${e}`),o=document.getElementById(`after-execution-preview-${e}`);if(s&&o){const n=new FileReader;n.onload=r=>{o.src=r.target.result,o.style.display="block",s.style.display="block",this._autoUploadAfterExecutionPhoto(e,i)},n.readAsDataURL(i)}},async _autoUploadAfterExecutionPhoto(e,t){try{Loading?.show?.();const i=await this._fileToBase64(t),a={afterExecutionImages:[],updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"System"},s=AppState.appData.dailyObservations.find(o=>o.id===e);s&&Array.isArray(s.afterExecutionImages)&&(a.afterExecutionImages=s.afterExecutionImages),a.afterExecutionImages.push(i),GoogleIntegration.sendRequest({action:"updateObservation",data:{observationId:e,updateData:a}}).then(o=>{Loading?.hide?.();const n=AppState.appData.dailyObservations.findIndex(r=>r.id===e);if(n!==-1&&(AppState.appData.dailyObservations[n].afterExecutionImages=a.afterExecutionImages,AppState.appData.dailyObservations[n].updatedAt=new Date().toISOString()),o&&o.success){Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D",3e3);const r=document.getElementById(`after-execution-photos-container-${e}`);r&&(r.innerHTML=this._buildAfterExecutionPhotosHtml(a.afterExecutionImages));const c=document.getElementById(`after-execution-preview-container-${e}`);c&&(c.style.display="none");const d=document.getElementById(`after-execution-photo-input-${e}`);d&&(d.value="")}else{Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u062D\u0644\u064A\u0627\u064B",3e3);const r=document.getElementById(`after-execution-photos-container-${e}`);r&&(r.innerHTML=this._buildAfterExecutionPhotosHtml(a.afterExecutionImages))}}).catch(o=>{Loading?.hide?.(),Utils?.safeWarn?.("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630:",o),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u062D\u0644\u064A\u0627\u064B",3e3);const n=document.getElementById(`after-execution-photos-container-${e}`);n&&(n.innerHTML=this._buildAfterExecutionPhotosHtml(a.afterExecutionImages))})}catch(i){Loading?.hide?.(),Utils?.safeError?.("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630:",i),Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),8e3)}},async uploadAfterExecutionPhoto(e){Notification?.info?.("\u0633\u064A\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631",3e3)},_fileToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},async _getObservationData(e){try{const t=await GoogleIntegration.sendRequest({action:"getObservation",data:{observationId:e}});return t?.success?t.data:null}catch(t){return Utils?.safeError?.("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",t),null}},canShowAssignResponsiblePanel(e){const t=String(e?.workflowStage||"").trim(),i=AppState.currentUser,a=this._isAdminRole(i),s=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),n=a||this._isSafetyOfficerRole(i)||s,r=a||o,c=t==="pending_specialist"||t==="returned_specialist"||t==="pending_manager",d=t==="pending_department"||t==="in_progress";return!!(a||(n||r)&&c||this.isUserInResponsibleDepartment(e)&&d)},readAssignFieldsFromDetailModal(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');if(!i)return{assignedToName:"",assignedToEmail:""};const a=i.querySelector('.obs-assign-name[data-oid="'+t+'"]'),s=i.querySelector('.obs-assign-email[data-oid="'+t+'"]');return{assignedToName:(a&&a.value?a.value:"").trim(),assignedToEmail:(s&&s.value?s.value:"").trim()}},getObservationAssignableUsers(){const e=Array.isArray(AppState.appData.users)?AppState.appData.users:[],t=new Set,i=[];return e.forEach(a=>{if(!a||typeof a!="object"||a.isActive===!1)return;const s=String(a.status||"").toLowerCase();if(s==="inactive"||s==="\u0645\u0639\u0637\u0644"||s==="disabled")return;const o=String(a.email||"").trim(),n=String(a.name||a.fullName||o||"").trim();if(!n&&!o)return;const r=(o||n).toLowerCase();t.has(r)||(t.add(r),i.push({name:n||o,email:o,department:String(a.department||"").trim()}))}),i.sort((a,s)=>String(a.name).localeCompare(String(s.name),"ar")),i},formatAssigneePublicDisplay(e){let t=String(e?.assignedToName||"").trim();t&&(t=t.replace(/\s*[—–\-]\s*[^\s@]+@[^\s@]+\.[^\s@]+$/i,"").trim());const i=String(e?.assignedToEmail||"").trim().toLowerCase();if(!t&&!i)return"";const a=this.getObservationAssignableUsers();let s="";const o=a.find(n=>String(n.email||"").trim().toLowerCase()===i);if(o&&o.department&&(s=String(o.department).trim()),t&&s)return`${t} (${s})`;if(t)return t;if(i&&o){const n=String(o.name||"").trim();if(n&&s)return`${n} (${s})`;if(n)return n}return"\u2014"},getWorkflowCommentFieldsVisibility(e){const t=String(e?.workflowStage||"").trim()||"pending_specialist",i=AppState.currentUser,a=this._isAdminRole(i),s=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),n=a||this._isSafetyOfficerRole(i)||s,r=a||o,c=n&&(t==="pending_specialist"||t==="returned_specialist"),d=r&&t==="pending_manager";return{showOptional:c||d,showReject:d||a&&t==="pending_manager"}},readWorkflowCommentsFromDetailModal(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');if(!i)return{comments:"",rejectionReason:""};const a=i.querySelector('.obs-wf-optional-comment[data-oid="'+t+'"]'),s=i.querySelector('.obs-wf-reject-reason[data-oid="'+t+'"]');return{comments:(a&&a.value?a.value:"").trim(),rejectionReason:(s&&s.value?s.value:"").trim()}},buildWorkflowInlineCommentFieldsHtml(e){const t=this.getWorkflowCommentFieldsVisibility(e);if(!t.showOptional&&!t.showReject)return"";const i=String(e.id||"").replace(/"/g,"");let a='<div class="obs-wf-inline-fields" style="margin-top:0.85rem;display:flex;flex-direction:column;gap:0.45rem;">';return t.showOptional&&(a+=`
            <label style="font-size:0.8rem;opacity:0.95;">\u062A\u0639\u0644\u064A\u0642 \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0645\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</label>
            <textarea class="form-input obs-wf-optional-comment" data-oid="${i}" rows="2" placeholder="\u064A\u064F\u0631\u0633\u0644 \u0645\u0639 \xAB\u0625\u0631\u0633\u0627\u0644 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\xBB \u0623\u0648 \xAB\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0625\u062F\u0627\u0631\u0629\xBB\u2026" style="width:100%;max-width:100%;color:#111;resize:vertical;"></textarea>`),t.showReject&&(a+=`
            <label style="font-size:0.8rem;opacity:0.95;">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u0648 \u0627\u0644\u0625\u0631\u062C\u0627\u0639</label>
            <textarea class="form-input obs-wf-reject-reason" data-oid="${i}" rows="2" placeholder="\u0627\u0645\u0644\u0623\u0647 \u0642\u0628\u0644 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0631\u0641\u0636 \u0623\u0648 \u0625\u0631\u062C\u0627\u0639\u2026" style="width:100%;max-width:100%;color:#111;resize:vertical;"></textarea>`),a+="</div>",a},buildAssignResponsibleHtml(e){if(!this.canShowAssignResponsiblePanel(e))return"";const t=String(e.id||"").replace(/"/g,""),i=Utils.escapeHTML(String(e.assignedToName||"")),a=Utils.escapeHTML(String(e.assignedToEmail||"")),s=this.getObservationAssignableUsers(),o=String(e.assignedToEmail||"").trim().toLowerCase(),n=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u2014</option>'].concat(s.map(c=>{const d=encodeURIComponent(JSON.stringify({name:c.name,email:c.email})),l=c.department?` (${c.department})`:"",p=Utils.escapeHTML(String(c.name||"").trim()+l),f=o&&String(c.email||"").trim().toLowerCase()===o?" selected":"";return`<option value="${d}"${f}>${p}</option>`}));return`
        <div class="obs-assign-box" style="margin-top: 1rem; padding: 0.85rem; background: rgba(255,255,255,0.14); border-radius: 12px; border: 1px solid rgba(255,255,255,0.28);">
            <div style="font-weight: 600; margin-bottom: 0.45rem;"><i class="fas fa-user-tag ml-2"></i>\u062A\u0639\u064A\u064A\u0646 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</div>
            <div style="font-size: 0.78rem; opacity: 0.9; margin-bottom: 0.5rem;">\u064A\u062D\u062F\u062F\u0647 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A) \u0623\u0648 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645) \u0623\u0648 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629.</div>
            ${s.length===0?'<div style="font-size:0.72rem;opacity:0.85;margin-bottom:0.35rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u062D\u0645\u0651\u0644\u0629\u061B \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A\u0627\u064B \u0623\u0648 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.</div>':""}
            <label style="display:block;font-size:0.8rem;opacity:0.9;margin-bottom:0.25rem;">\u0645\u0633\u062A\u062E\u062F\u0645\u0648 \u0627\u0644\u0646\u0638\u0627\u0645 <span style="opacity:0.75;font-size:0.72rem;">(\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u2014 \u062F\u0648\u0646 \u0639\u0631\u0636 \u0627\u0644\u0628\u0631\u064A\u062F)</span></label>
            <select class="form-input obs-assign-user-select" data-oid="${t}" style="width:100%;max-width:420px;color:#111;margin-bottom:0.5rem;display:block;">
                ${n.join("")}
            </select>
            <div style="font-size:0.75rem;opacity:0.85;margin-bottom:0.35rem;">\u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B:</div>
            <input type="text" class="form-input obs-assign-name" data-oid="${t}" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" value="${i}" style="width:100%;max-width:340px;color:#111;margin-bottom:0.35rem;display:block;" />
            <input type="hidden" class="obs-assign-email" data-oid="${t}" value="${a}" autocomplete="off" />
            <p style="font-size:0.72rem;opacity:0.82;margin:0 0 0.5rem;line-height:1.45;">\u064A\u064F\u0631\u0628\u064E\u0637 \u0627\u0644\u0628\u0631\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u062F\u0648\u0646 \u0639\u0631\u0636\u0647.</p>
            <button type="button" class="btn-secondary btn-sm obs-wf-assign-save" data-oid="${t}" style="background: rgba(255,255,255,0.22); color: #fff; border: 1px solid rgba(255,255,255,0.45);">
                <i class="fas fa-save ml-1"></i>\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u064A\u064A\u0646
            </button>
        </div>`},replaceObservationDetailModal(e,t){const i=String(e||"").replace(/"/g,""),a=document.querySelector('.modal-overlay[data-observation-id="'+i+'"]');if(!a||!t)return;const s=this.normalizeRecord(t),o=this.createObservationModal(s);a.replaceWith(o),this.attachWorkflowPanelListeners(o)},closeObservationDetailModalIfOpen(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');i&&i.remove()},getObservationDetailInlineAlertsEl(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');return i?i.querySelector("[data-obs-inline-alerts]"):null},showObservationDetailInlineAlert(e,t,i){const a=this.getObservationDetailInlineAlertsEl(e);if(!a||i==null||String(i).trim()==="")return!1;const s=Utils.escapeHTML(String(i)),o=t==="success"?"obs-inline-alert obs-inline-alert-success":t==="warning"?"obs-inline-alert obs-inline-alert-warning":t==="error"?"obs-inline-alert obs-inline-alert-error":"obs-inline-alert obs-inline-alert-info";a.innerHTML=`<div class="${o}"><button type="button" class="obs-inline-alert-close" aria-label="\u0625\u063A\u0644\u0627\u0642">&times;</button><span class="obs-inline-alert-msg">${s}</span></div>`;const n=a.querySelector(".obs-inline-alert-close");n&&n.addEventListener("click",()=>{a.innerHTML=""});try{a.scrollIntoView({behavior:"smooth",block:"nearest"})}catch{}return!0},clearObservationDetailInlineAlert(e){const t=this.getObservationDetailInlineAlertsEl(e);t&&(t.innerHTML="")},normalizeTimeLogArray(e){let t=[];try{if(e==null)return[];Array.isArray(e)?t=e.slice():typeof e=="string"&&e&&(t=JSON.parse(e))}catch{t=[]}return Array.isArray(t)||(t=[]),t.sort((i,a)=>{const s=new Date(a.timestamp||0).getTime(),o=new Date(i.timestamp||0).getTime();return s-o})},formatTimelineDetailLine(e){if(!e||typeof e!="object")return"\u2014";const t=String(e.roleLabel||"").trim(),i=String(e.actionDetail||"").trim();return t&&i?t+": "+i:String(e.note||"").trim()||"\u2014"},formatTimelineDate(e){if(!e)return"";try{const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",calendar:"gregory"})}catch{return typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(e):""}},buildObservationTimelineHtml(e){const t=this.normalizeTimeLogArray(e);return t.length?`
            <div class="obs-timeline-list space-y-2">
                ${t.map(i=>`
                    <div class="obs-timeline-item">
                        <div class="obs-timeline-meta">
                            <div class="obs-timeline-body">
                                <div class="obs-timeline-user-row">
                                    <span class="obs-timeline-name">${Utils.escapeHTML(i.user||"")}</span>
                                    <span class="obs-timeline-dot" aria-hidden="true"></span>
                                </div>
                                <p class="obs-timeline-detail">${Utils.escapeHTML(this.formatTimelineDetailLine(i))}</p>
                                ${i.action==="status_changed"&&i.oldStatus!=null&&i.newStatus!=null?`
                                    <p class="obs-timeline-status-hint text-xs text-gray-500 mt-1">
                                        \u0645\u0646 <span class="font-medium">${Utils.escapeHTML(String(i.oldStatus))}</span>
                                        \u0625\u0644\u0649 <span class="font-medium">${Utils.escapeHTML(String(i.newStatus))}</span>
                                    </p>
                                `:""}
                            </div>
                            <time class="obs-timeline-date" datetime="${Utils.escapeHTML(String(i.timestamp||""))}">${Utils.escapeHTML(this.formatTimelineDate(i.timestamp))}</time>
                        </div>
                    </div>
                `).join("")}
            </div>
        `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644 \u0632\u0645\u0646\u064A</p>'},formatResponsibleTableCell(e){const t=Utils.escapeHTML(e.responsibleDepartment||"-"),i=(e.assignedToName||"").trim();return i?`<div class="text-sm text-gray-800">${t}</div><div class="text-xs text-gray-500">${Utils.escapeHTML(i)}</div>`:t},normalizeObservationDepartment(e){return String(e||"").trim().toLowerCase().replace(/\s+/g," ")},isUserInResponsibleDepartment(e){const t=this.normalizeObservationDepartment(AppState.currentUser?.department),i=this.normalizeObservationDepartment(e?.responsibleDepartment);return!!(t&&i&&t===i)},filterDailyObservationsForCurrentUserScope(e){const t=Array.isArray(e)?e:[];if(this.canViewAllObservationsWorkflow())return t.slice();const i=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null;if(!i)return t.slice();const a=d=>this.normalizeObservationDepartment(d),s=a(i.department),o=String(i.email||"").trim().toLowerCase(),n=String(i.name||"").trim().toLowerCase(),c=(i.dailyObservationsPermissions||{})["observations-view-department"]!==!1;return t.filter(d=>{if(!d)return!1;const l=this.normalizeRecord(d),p=String(l.workflowStage||"").trim(),f=a(l.responsibleDepartment),m=String(l.submittedByEmail||"").trim().toLowerCase(),u=String(l.observerName||"").trim().toLowerCase(),v=o&&m&&o===m||n&&u&&n===u;return p?v?!0:p==="pending_specialist"||p==="pending_manager"||p==="returned_specialist"?!1:c&&s&&f&&s===f?p==="pending_department"||p==="in_progress"||p==="closed"||p==="rejected":!1:!!(v||c&&s&&f&&s===f)})},getDailyObservationsVisibleToCurrentUser(){const e=Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];return this.filterDailyObservationsForCurrentUserScope(e)},isDailyObservationVisibleToCurrentUser(e){if(!e)return!1;if(this.canViewAllObservationsWorkflow())return!0;const t=this.normalizeRecord(e);return this.filterDailyObservationsForCurrentUserScope([t]).length===1},canEditObservationStatusInDetail(){return this.canViewAllObservationsWorkflow()||this.isSystemManager()},canEditObservationFieldsInDetail(e){const t=AppState.currentUser;return t?this._isAdminRole(t)||this.hasManagerWorkflowPermission()||this.hasSpecialistWorkflowPermission()?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission?Permissions.hasDetailedPermission("daily-observations","observations-edit-fields"):!1:!1},getObservationTypes(){const e=["\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649"],t=this._ensureRiskCategoryConfig(),i=Array.isArray(t.customObservationTypes)?t.customObservationTypes:[],a=(AppState.appData?.dailyObservations||[]).map(s=>s.observationType).filter(Boolean);return[...new Set([...e,...i,...a])].sort()},getRiskLevels(){return["\u0645\u0646\u062E\u0641\u0636","\u0645\u062A\u0648\u0633\u0637","\u0645\u0631\u062A\u0641\u0639","\u0634\u062F\u064A\u062F"]},getDepartments(){const e=(AppState.appData?.users||[]).map(t=>t.department).filter(Boolean);return[...new Set(e)].sort()},async handleFieldChange(e,t,i,a){try{const s=AppState.appData.dailyObservations.find(r=>r.id===e);if(!s){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}s[t]=i,s.updatedAt=new Date().toISOString();const o={observationType:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",riskLevel:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",responsibleDepartment:"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",expectedCompletionDate:"\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630",details:"\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",correctiveAction:"\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A"};Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${o[t]||t} \u0628\u0646\u062C\u0627\u062D`);const n={[t]:i,updatedAt:s.updatedAt};GoogleIntegration.sendRequest({action:"updateObservation",data:{observationId:e,updateData:n}}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",r)})}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0642\u0644:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B: "+s.message)}},openEditFromDetailModal(e){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=document.querySelector('.modal-overlay[data-observation-id="'+e+'"]')||document.querySelector(".modal-overlay");t&&t.remove();const i=(AppState.appData.dailyObservations||[]).find(a=>a.id===e);if(!i){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(typeof this.isDailyObservationVisibleToCurrentUser=="function"&&!this.isDailyObservationVisibleToCurrentUser(i)){Notification.error("\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629");return}this.showForm(this.normalizeRecord(i))},buildWorkflowActionButtonsHtml(e){const t=e.id,i=String(t||"").replace(/"/g,""),a=(e.workflowStage||"").trim()||"pending_specialist",s=[],o=AppState.currentUser,n=this._isAdminRole(o),r=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),c=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),d=n||this._isSafetyOfficerRole(o)||r,l=n||c;if(d&&(a==="pending_specialist"||a==="returned_specialist")&&s.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="specialist_forward" style="background: #22c55e; border: none;"><i class="fas fa-share ml-1"></i>\u0625\u0631\u0633\u0627\u0644 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</button>`),l&&a==="pending_manager"&&(s.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_approve" style="background: #0ea5e9; border: none;"><i class="fas fa-check ml-1"></i>\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0625\u062F\u0627\u0631\u0629</button>`),s.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_return_specialist" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4);"><i class="fas fa-undo ml-1"></i>\u0625\u0631\u062C\u0627\u0639 \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)</button>`),s.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_reject" style="background: #b91c1c; color: white; border: none;"><i class="fas fa-times ml-1"></i>\u0631\u0641\u0636</button>`)),n&&a==="pending_manager"&&(s.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="admin_return_specialist" style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.35);"><i class="fas fa-user-shield ml-1"></i>\u0625\u0631\u062C\u0627\u0639 \u0645\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</button>`),s.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="admin_reject" style="background: #7f1d1d; color: white; border: none;"><i class="fas fa-ban ml-1"></i>\u0631\u0641\u0636 \u0625\u062F\u0627\u0631\u064A</button>`)),a==="in_progress"||a==="pending_department"){const p=this.isUserInResponsibleDepartment(e);(n||l||d||p)&&s.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="close_observation" style="background: #6366f1; border: none;"><i class="fas fa-flag-checkered ml-1"></i>\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</button>`)}return s.join("")},buildDepartmentWorkflowFormHtml(e){const t=(e.workflowStage||"").trim();if(t!=="pending_department"&&t!=="in_progress")return"";const i=this.isUserInResponsibleDepartment(e),a=this._isAdminRole(AppState.currentUser);if(!i&&!a)return"";const s=String(e.id||"").replace(/"/g,""),o=Utils.escapeHTML(String(e.correctiveAction||"")),n=e.expectedCompletionDate?String(e.expectedCompletionDate).slice(0,10):"";return`
        <div class="obs-dept-workflow" style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.12); border-radius: 12px; border: 1px solid rgba(255,255,255,0.25);">
            <div style="font-weight: 600; margin-bottom: 0.5rem;"><i class="fas fa-building ml-2"></i>\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</div>
            <label style="display:block;font-size:0.85rem;opacity:0.9;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</label>
            <textarea class="form-input obs-dept-corrective-input" data-oid="${s}" rows="3" style="width:100%;margin:0.35rem 0 0.75rem;color:#111;">${o}</textarea>
            <label style="display:block;font-size:0.85rem;opacity:0.9;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639</label>
            <input type="date" class="form-input obs-dept-expected-input" data-oid="${s}" value="${n.replace(/"/g,"")}" style="width:100%;max-width:280px;margin:0.35rem 0;color:#111;" />
            <div style="margin-top:0.75rem;">
                <button type="button" class="btn-primary btn-sm obs-wf-dept-save" data-oid="${s}"><i class="fas fa-save ml-1"></i>\u062D\u0641\u0638 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</button>
            </div>
        </div>`},buildWorkflowBannerHtml(e){const t=[],i=(c,d)=>{const l=String(d??"").trim();l&&t.push(`<div class="obs-wf-meta-line" style="display:flex;flex-wrap:wrap;gap:0.35rem 0.5rem;align-items:baseline;direction:rtl;text-align:right;"><span style="opacity:0.88;">${Utils.escapeHTML(c)}</span><strong style="font-weight:700;opacity:1;">${Utils.escapeHTML(l)}</strong></div>`)};i("\u0627\u0644\u0645\u064F\u0633\u062C\u0651\u0650\u0644:",e.submittedBy),i("\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A):",e.specialistReviewedBy),i("\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645):",e.managerApprovedBy),i("\u0645\u0644\u0627\u062D\u0638\u0629:",e.rejectionReason);const a=this.buildWorkflowActionButtonsHtml(e),s=this.buildDepartmentWorkflowFormHtml(e),o=this.buildAssignResponsibleHtml(e),n=this.buildWorkflowInlineCommentFieldsHtml(e);if(e.assignedToName||e.assignedToEmail){const c=this.formatAssigneePublicDisplay(e);c&&c!=="\u2014"&&i("\u0645\u0639\u064A\u0651\u0646:",c)}return`
        <div class="obs-workflow-panel" style="background: linear-gradient(135deg, #312e81 0%, #5b21b6 100%); color: white; padding: 1.25rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
            ${t.length?`<div class="obs-wf-meta" style="font-size: 0.8rem; line-height: 1.55; margin-bottom: 0.35rem; display: flex; flex-direction: column; gap: 0.4rem; direction: rtl; text-align: right;">${t.join("")}</div>`:""}
            ${n}
            ${o}
            ${a?`<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">${a}</div>`:""}
            ${s}
        </div>`},attachWorkflowPanelListeners(e){e&&(e.querySelectorAll(".obs-wf-action").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid"),a=t.getAttribute("data-wfa");!i||!a||requestAnimationFrame(()=>{this.promptAndRunWorkflowTransition(i,a).catch(s=>{Utils.safeWarn("promptAndRunWorkflowTransition",s)})})})}),e.querySelectorAll(".obs-wf-dept-save").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid");if(!i)return;const a=e.querySelector('.obs-dept-corrective-input[data-oid="'+i.replace(/"/g,"")+'"]'),s=e.querySelector('.obs-dept-expected-input[data-oid="'+i.replace(/"/g,"")+'"]'),o={correctiveAction:(a?.value||"").trim(),expectedCompletionDate:s?.value?new Date(s.value).toISOString():""};requestAnimationFrame(()=>{this.runWorkflowTransition(i,"department_update",o).catch(n=>{Utils.safeWarn("runWorkflowTransition department_update",n)})})})}),e.querySelectorAll(".obs-wf-assign-save").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid");if(!i)return;const{assignedToName:a,assignedToEmail:s}=this.readAssignFieldsFromDetailModal(i);if(!a){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u0639\u064A\u0651\u0646");return}requestAnimationFrame(()=>{this.runWorkflowTransition(i,"assign_responsible",{assignedToName:a,assignedToEmail:s}).catch(o=>{Utils.safeWarn("runWorkflowTransition assign_responsible",o)})})})}),e.querySelectorAll(".obs-assign-user-select").forEach(t=>{t.addEventListener("change",()=>{const i=t.getAttribute("data-oid");if(!i)return;let a="",s="";try{const d=t.value;if(d){const l=JSON.parse(decodeURIComponent(d));a=String(l.name||"").trim(),s=String(l.email||"").trim()}}catch{}const o=t.closest(".modal-overlay");if(!o)return;const n=i.replace(/"/g,""),r=o.querySelector('.obs-assign-name[data-oid="'+n+'"]'),c=o.querySelector('.obs-assign-email[data-oid="'+n+'"]');r&&(r.value=a),c&&(c.value=s)})}))},async promptAndRunWorkflowTransition(e,t){const i=t==="manager_reject"||t==="admin_reject"||t==="manager_return_specialist"||t==="admin_return_specialist",{comments:a,rejectionReason:s}=this.readWorkflowCommentsFromDetailModal(e);if(i&&!s.trim()){this.showObservationDetailInlineAlert(e,"warning","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u0648 \u0627\u0644\u0625\u0631\u062C\u0627\u0639 \u0641\u064A \u0627\u0644\u062D\u0642\u0644 \u0627\u0644\u0645\u062E\u0635\u0635 \u062F\u0627\u062E\u0644 \u0628\u0637\u0627\u0642\u0629 \u0633\u064A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0627\u0644\u0633\u0628\u0628 \u0645\u0637\u0644\u0648\u0628");return}const o=t==="specialist_forward"||t==="manager_approve"?this.readAssignFieldsFromDetailModal(e):{};await this.runWorkflowTransition(e,t,{comments:i?"":a,rejectionReason:i?s:"",...o})},pushObservationInAppNotification(e,t,i){try{const a="hse_obs_workflow_notifications",s=localStorage.getItem(a);let o=[];try{o=s?JSON.parse(s):[]}catch{o=[]}Array.isArray(o)||(o=[]),o.unshift({title:e||"",body:t||"",observationId:i||"",at:new Date().toISOString()}),o=o.slice(0,40),localStorage.setItem(a,JSON.stringify(o))}catch(a){Utils.safeWarn("pushObservationInAppNotification",a)}},async runWorkflowTransition(e,t,i={}){const a=AppState.currentUser||{},s={name:(a.name||"").trim()||"\u0645\u0633\u062A\u062E\u062F\u0645",email:(a.email||"").trim(),role:a.role||"",department:(a.department||"").trim(),dailyObservationsPermissions:{}};if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function")try{const o=Permissions.getEffectivePermissions(a)||{};s.dailyObservationsPermissions=o["daily-observationsPermissions"]||{}}catch{}this.closeObservationDetailModalIfOpen(e),typeof Notification<"u"&&Notification.info&&Notification.info("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0637\u0644\u0628 \u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629...");try{const o=await GoogleIntegration.callBackend("transitionObservationWorkflow",{observationId:e,action:t,comments:i.comments||"",rejectionReason:i.rejectionReason||"",correctiveAction:i.correctiveAction,expectedCompletionDate:i.expectedCompletionDate,assignedToName:i.assignedToName,assignedToEmail:i.assignedToEmail,actor:s,__timeoutMs:12e4});if(o&&o.success){const n=o.message||"\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B",r=AppState.appData.dailyObservations.findIndex(c=>c.id===e);r!==-1&&o.data&&(AppState.appData.dailyObservations[r]=this.normalizeRecord(o.data));try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}this.pushObservationInAppNotification("\u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",o.message||"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",e),await this.yieldToMain();try{this.loadObservationsList(this.currentFilter?.filter||null)}catch(c){Utils.safeWarn("loadObservationsList \u0628\u0639\u062F \u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",c)}await this.yieldToMain(),Notification.success(n)}else{const n=o?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B";Notification.error(n)}}catch(o){const n=o&&o.message?o.message:String(o);Notification.error(n)}},runObservationDueDateReminders(){try{const e=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():AppState.appData.dailyObservations||[],t=new Date,i=AppState.currentUser&&AppState.currentUser.id?String(AppState.currentUser.id):"anon";e.forEach(a=>{const s=this.normalizeRecord(a);if(s.workflowStage!=="in_progress"||!s.expectedCompletionDate)return;const o=new Date(s.expectedCompletionDate);if(Number.isNaN(o.getTime()))return;const n=o.getTime()-t.getTime(),r=Math.ceil(n/864e5);if(r<0||r>2)return;const c=this.isUserInResponsibleDepartment(s);if(!(this.canViewAllObservationsWorkflow()||c))return;const l=`obs_due_${i}_${s.id}_${o.toISOString().slice(0,10)}`;if(sessionStorage.getItem(l))return;sessionStorage.setItem(l,"1");const p=r<0?`\u062A\u062C\u0627\u0648\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${s.isoCode||s.id}`:`\u062A\u0646\u0628\u064A\u0647: \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062E\u0644\u0627\u0644 ${r} \u064A\u0648\u0645 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${s.isoCode||s.id}`;typeof Notification<"u"&&Notification.warning&&Notification.warning(p)})}catch(e){Utils.safeWarn("runObservationDueDateReminders",e)}},getObservationInboxNotifications(e){const t=Array.isArray(e)?e:[],i=[];if(!AppState?.appData?.dailyObservations||typeof this.getDailyObservationsVisibleToCurrentUser!="function")return i;const a=AppState.currentUser;if(!a)return i;const s=this._isAdminRole(a),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),n=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),r=s||this._isSafetyOfficerRole(a)||o,c=s||n,d=p=>()=>{try{const f=document.querySelector('a[data-section="daily-observations"]');f&&f.click()}catch{}setTimeout(()=>{typeof this.viewObservation=="function"&&this.viewObservation(p)},320)};return this.getDailyObservationsVisibleToCurrentUser().forEach(p=>{const f=this.normalizeRecord(p),m=String(f.isoCode||f.id||"").trim(),u=f.id,v=String(f.workflowStage||"").trim(),g=this.isUserInResponsibleDepartment(f),x=this.canViewAllObservationsWorkflow();if(v==="in_progress"&&f.expectedCompletionDate){const y=new Date(f.expectedCompletionDate);if(Number.isNaN(y.getTime()))return;const k=new Date;k.setHours(0,0,0,0);const $=new Date(y.getFullYear(),y.getMonth(),y.getDate());if($<k&&(x||g)){const h=Math.floor((k-$)/864e5),b=`obs-delay-${u}`;if(!t.includes(b)){const C=h===1?"\u064A\u0648\u0645\u0627\u064B":`${h} \u0623\u064A\u0627\u0645`;i.push({id:b,variant:"observation",type:"warning",title:"\u062A\u0623\u062E\u064A\u0631 \u0645\u0648\u0639\u062F \u062A\u0646\u0641\u064A\u0630 \u0645\u0644\u0627\u062D\u0638\u0629",message:`\u062A\u062C\u0627\u0648\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${m} (${C})`,time:f.updatedAt||f.expectedCompletionDate||new Date,icon:"fa-clock",observationId:u,onClick:d(u)})}}}if(v==="pending_manager"&&c){const y=`obs-pending-mgr-${u}`;t.includes(y)||i.push({id:y,variant:"observation",type:"info",title:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",message:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${m} \u2014 \u0631\u0627\u062C\u0639\u0647\u0627 \u0648\u0627\u0639\u062A\u0645\u062F\u0647\u0627 \u0644\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629`,time:f.managerApprovedAt||f.updatedAt||new Date,icon:"fa-user-shield",observationId:u,onClick:d(u)})}if((v==="pending_specialist"||v==="returned_specialist")&&r){const y=`obs-pending-spec-${u}`;t.includes(y)||i.push({id:y,variant:"observation",type:"info",title:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",message:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${m} \u2014 \u0631\u0627\u062C\u0639\u0647\u0627 \u0648\u0623\u0631\u0633\u0644\u0647\u0627 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629`,time:f.updatedAt||new Date,icon:"fa-clipboard-check",observationId:u,onClick:d(u)})}if(v==="pending_department"&&(g||x)){const y=`obs-approved-dept-${u}`;if(!t.includes(y)){const k=String(f.details||"").trim().slice(0,120),$=k?`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${m} \u2014 ${k}${k.length>=120?"\u2026":""}`:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${m} \u0623\u0631\u0633\u0644\u062A \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629 (${f.responsibleDepartment||""}) \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A`;i.push({id:y,variant:"observation",type:"success",title:"\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0644\u0644\u0625\u062F\u0627\u0631\u0629",message:$,time:f.managerApprovedAt||f.updatedAt||new Date,icon:"fa-check-circle",observationId:u,onClick:d(u)})}}}),i},DEFAULT_SITES:[{id:"factory-1",name:"\u0645\u0635\u0646\u0639 1"},{id:"factory-2",name:"\u0645\u0635\u0646\u0639 2"},{id:"warehouse-1",name:"\u0645\u062E\u0632\u0646 1"}],OBSERVATION_TYPES:[{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D"},{value:"\u0623\u062E\u0631\u0649",label:"\u0623\u062E\u0631\u0649"}],SHIFTS:["\u0627\u0644\u0623\u0648\u0644\u0649","\u0627\u0644\u062B\u0627\u0646\u064A\u0629","\u0627\u0644\u062B\u0627\u0644\u062B\u0629"],RISK_LEVELS:["\u0645\u0646\u062E\u0641\u0636","\u0645\u062A\u0648\u0633\u0637","\u0639\u0627\u0644\u064A"],STATUS_OPTIONS:["\u0645\u0641\u062A\u0648\u062D","\u062C\u0627\u0631\u064A","\u0645\u063A\u0644\u0642"],WORKFLOW_STAGES:{pending_specialist:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)",pending_manager:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645)",pending_department:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",returned_specialist:"\u0645\u0639\u0627\u062F\u0629 \u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)",in_progress:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630",closed:"\u0645\u0643\u062A\u0645\u0644\u0629 (\u0645\u063A\u0644\u0642\u0629)",rejected:"\u0645\u0631\u0641\u0648\u0636\u0629"},WORKFLOW_PATH_STEPS:[{title:"\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},{title:"\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},{title:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"},{title:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630"},{title:"\u0645\u063A\u0644\u0642\u0629"}],getWorkflowPathVisualState(e){const t=String(e||"").trim()||"pending_specialist";if(t==="rejected")return{mode:"rejected",activeIndex:-1};if(t==="closed")return{mode:"closed",activeIndex:4};let i=0;return t==="pending_specialist"||t==="returned_specialist"?i=0:t==="pending_manager"?i=1:t==="pending_department"?i=2:t==="in_progress"?i=3:i=0,{mode:"progress",activeIndex:i}},getWorkflowCurrentStageLine(e){const t=String(e?.workflowStage||"").trim();let i=this.getWorkflowStageLabel(t);if(t==="in_progress"&&e&&e.responsibleDepartment){const a=String(e.responsibleDepartment).trim();a&&(i+=` (${a})`)}return i},buildWorkflowPathHtml(e){const t=(e.workflowStage||"").trim(),i=this.getWorkflowPathVisualState(t),a=this.WORKFLOW_PATH_STEPS||[],s="display:inline-flex;align-items:center;gap:0.25rem;padding:0.4rem 0.85rem;border-radius:9999px;font-size:0.8rem;font-weight:600;white-space:nowrap;border:1px solid transparent;",o=a.map((c,d)=>{const p=`${d+1}. ${c.title}`;let f="";return i.mode==="closed"?f=`${s}background:#dcfce7;color:#166534;border-color:#bbf7d0;`:i.mode==="rejected"?f=`${s}background:#f3f4f6;color:#9ca3af;border-color:#e5e7eb;`:i.mode==="progress"?d<i.activeIndex?f=`${s}background:#dcfce7;color:#166534;border-color:#bbf7d0;`:d===i.activeIndex?f=`${s}background:#7c3aed;color:#fff;border-color:#6d28d9;box-shadow:0 2px 8px rgba(124,58,237,0.35);`:f=`${s}background:#f3f4f6;color:#6b7280;border-color:#e5e7eb;`:f=`${s}background:#f3f4f6;color:#6b7280;`,`<span class="obs-workflow-path-badge" style="${f}">${Utils.escapeHTML(p)}</span>`}).join(""),n=i.mode==="rejected"?`<span style="color:#b91c1c;font-weight:600;">\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629: \u0645\u0631\u0641\u0648\u0636\u0629</span>${e.rejectionReason?` \u2014 ${Utils.escapeHTML(String(e.rejectionReason).slice(0,120))}${String(e.rejectionReason).length>120?"\u2026":""}`:""}`:`<span style="color:#374151;"><strong style="font-weight:700;">\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629:</strong> ${Utils.escapeHTML(this.getWorkflowCurrentStageLine(e))}</span>`;return`
        <div class="obs-workflow-path-card" dir="rtl" style="background:#fff;color:#111827;border-radius:14px;padding:1rem 1.15rem;border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
            ${i.mode==="rejected"?'<div style="margin-bottom:0.65rem;padding:0.45rem 0.65rem;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:0.8rem;color:#991b1b;"><i class="fas fa-ban ml-1"></i>\u0633\u064A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062A\u0648\u0642\u0641 \u2014 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0631\u0641\u0648\u0636\u0629</div>':""}
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;flex-wrap:wrap;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:10px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);color:#5b21b6;">
                    <i class="fas fa-project-diagram" style="font-size:0.95rem;"></i>
                </span>
                <span style="font-weight:800;font-size:1.05rem;color:#111827;letter-spacing:-0.02em;">\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>
            </div>
            <div class="obs-workflow-path-steps" style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center;justify-content:flex-start;direction:rtl;">
                ${o}
            </div>
            <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #f3f4f6;font-size:0.9rem;line-height:1.5;">
                ${n}
            </div>
        </div>`},MAX_ATTACHMENT_SIZE:10*1024*1024,OBSERVATIONS_THRESHOLD:10,state:{selectedSiteId:"",selectedSiteName:"",availablePlaces:[],selectedPlaceId:"",isCustomLocationSelected:!1,customLocationName:"",currentAttachments:[],editingId:null,activeModal:null,isLoadingPlaces:!1,activeTab:"observations-registry"},currentFilter:null,_topRiskCategoryFilter:"",sheetJsPromise:null,_dailyObsLoadPromise:null,_dailyObsBackendFetchOk:!1,async ensureDailyObservationsDataLoaded({force:e=!1}={}){if(this._dailyObsLoadPromise&&!e)return this._dailyObsLoadPromise;const t=async()=>{typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("daily-observations");try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)return;if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)){this._dailyObsBackendFetchOk=!0;return}const a=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null,s=await GoogleIntegration.readFromSheets("DailyObservations",{timeout:15e3,observationsRequestContext:a}).catch(()=>null);if(Array.isArray(s)){const o=AppState.appData.dailyObservations||[];typeof this.canViewAllObservationsWorkflow=="function"&&this.canViewAllObservationsWorkflow()&&s.length===0&&o.length>0?Utils?.safeLog?.("\u26A0\uFE0F DailyObservations: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0627\u0631\u063A\u0629 - \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u062D\u0644\u064A"):AppState.appData.dailyObservations=s}try{localStorage.setItem("daily_observations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}this._dailyObsBackendFetchOk=!0}finally{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("daily-observations")}};return this._dailyObsLoadPromise=(typeof StableLoader<"u"&&typeof StableLoader.runExclusive=="function"?StableLoader.runExclusive("daily-obs:data",t):t()).finally(()=>{this._dailyObsLoadPromise=null}),this._dailyObsLoadPromise},saveUIState(){const e=document.querySelector(".tab-btn.active[data-tab]");if(e){const t=e.getAttribute("data-tab");this.state.activeTab=t}this.state.activeModal},restoreUIState(){this.state.activeTab&&setTimeout(()=>{const e=document.querySelector(`.tab-btn[data-tab="${this.state.activeTab}"]`);e&&e.click()},150)},refreshOnLanguageChange(){this.state&&this.state.activeTab&&this.renderList()},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.refreshOnLanguageChange()}),window.addEventListener("storage",f=>{f.key==="language"&&f.newValue!==f.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0);let e=!1;const t=10,i=200;for(let f=0;f<t;f++){if(typeof window<"u"&&(typeof window.DataManager<"u"||typeof DataManager<"u")){e=!0;break}f<t-1&&await new Promise(m=>setTimeout(m,i))}if(!e){const f="\u26A0\uFE0F DailyObservations: DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0642\u062F \u0644\u0627 \u062A\u0639\u0645\u0644 \u0628\u0639\u0636 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D";Utils?.safeWarn?.(f)||typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(f)}let a=document.getElementById("daily-observations-section");if(a||(a=document.getElementById("dailyobservations-section")),!a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F DailyObservations: \u0642\u0633\u0645 daily-observations-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(typeof AppState>"u"){a.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</p>
                            <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `;return}const s=this.hasTabAccess("observations-registry"),o=this.hasTabAccess("top-10-observations"),n=this.hasTabAccess("data-analysis"),r=s?"observations-registry":o?"top-10-observations":n?"data-analysis":"";if(!r){a.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</p>
                        </div>
                    </div>
                </div>
            `;return}this.state.activeTab=r,this.saveUIState(),AppState.appData||(AppState.appData={}),AppState.appData.dailyObservations||(AppState.appData.dailyObservations=[]);const c=this.isCurrentUserAdmin(),d=c&&this.hasTabAccess("executive-dashboard"),l=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-spinner fa-spin text-gray-300 text-3xl mb-3"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.loading.tab","\u0633\u064A\u064F\u062D\u0645\u0651\u064E\u0644 \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0639\u0646\u062F \u0641\u062A\u062D\u0647"))}</p>
                </div></div></div>`;let p="";if(d&&r==="executive-dashboard")try{p=this.renderExecutiveDashboard()}catch{p=""}else d&&(p=l);try{const f=Array.isArray(AppState.appData.dailyObservations)&&AppState.appData.dailyObservations.length>0;let m=null;try{m=localStorage.getItem("daily_observations_last_sync")}catch{}const u=m?Date.now()-parseInt(m,10):1/0,v=600*1e3,g=u>=v;(!f||g)&&typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets?this.ensureDailyObservationsDataLoaded({force:g&&f}).catch(()=>{}).finally(()=>{try{const U=document.getElementById("observations-table-container"),I=document.getElementById("observations-stats-cards");if(!U&&!I)return;U&&typeof this.loadObservationsList=="function"&&this.loadObservationsList(),I&&typeof this.renderStatsCards=="function"&&this.renderStatsCards()}catch{}}):f&&(this._dailyObsBackendFetchOk=!0),(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)&&(this._dailyObsBackendFetchOk=!0),await this.yieldToMain();const x=1e4,y=(U,I)=>{const L=new Promise((P,T)=>setTimeout(()=>T(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644")),x));return Promise.race([U,L]).catch(P=>(Utils?.safeWarn?.("\u26A0\uFE0F \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",P?.message||P),I))},k=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.timeout","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0648 \u0627\u0646\u062A\u0647\u062A \u0627\u0644\u0645\u0647\u0644\u0629"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`,$=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.analysis","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`,h=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.top10","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Top 10"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`;let b="",C="",O="";(r==="observations-registry"||s)&&(b=await y(this.renderList(),k)||k),r==="top-10-observations"?O=await y(this.renderTop10Observations(),h)||h:o&&(O=l),r==="data-analysis"?C=c?await y(this.renderDataAnalysis(),$)||$:"":n&&(C=l),a.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-clipboard-check ml-3"></i>
                                <span data-i18n="module.dailyobs.title">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</span>
                            </h1>
                            <p class="section-subtitle" data-i18n="module.dailyobs.subtitle">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${this.canDailyObservationsFullAdminUi()?`
                            <button id="import-observations-excel-btn" class="btn-secondary">
                                <i class="fas fa-file-import ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.importExcel">\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel</span>
                            </button>
                            `:""}
                            <button id="export-observations-excel-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.exportExcel">\u062A\u0635\u062F\u064A\u0631 Excel</span>
                            </button>
                            <button id="export-observations-ppt-btn" class="btn-secondary">
                                <i class="fas fa-file-powerpoint ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.exportPpt">\u062A\u0635\u062F\u064A\u0631 PPT</span>
                            </button>
                            <button id="public-qr-observations-btn" class="btn-secondary" onclick="DailyObservations.openPublicQrModal()" style="background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3); color: #2563eb; font-weight: 700;">
                                <i class="fas fa-qrcode ml-2"></i>
                                <span>\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0648\u0631\u0645\u0632 QR</span>
                            </button>
                            <button id="add-observation-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.addObservation">\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629</span>
                            </button>
                            ${this.canDailyObservationsFullAdminUi()?`
                            <button id="delete-all-observations-btn" class="btn-secondary" style="background-color: #dc3545; color: white; border-color: #dc3545;">
                                <i class="fas fa-trash-alt ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.deleteAll">\u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                            </button>
                            `:""}
                        </div>
                    </div>
                </div>
                
                <!-- Tabs Navigation -->
                <div class="tabs-container mt-6" style="border-bottom: 2px solid var(--border-color);">
                    <div class="tabs-nav" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${s?`
                        <button class="tab-btn ${this.state.activeTab==="observations-registry"?"active":""}" data-tab="observations-registry" style="padding: 12px 24px; border: none; background: transparent; border-bottom: 3px solid ${this.state.activeTab==="observations-registry"?"var(--primary-color)":"transparent"}; color: ${this.state.activeTab==="observations-registry"?"var(--primary-color)":"var(--text-secondary)"}; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                            <i class="fas fa-list ml-2"></i>
                            <span data-i18n="module.dailyobs.tab.registry">\u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                        </button>
                        `:""}
                        ${o?`
                        <button class="tab-btn ${this.state.activeTab==="top-10-observations"?"active":""}" data-tab="top-10-observations" style="padding: 12px 24px; border: none; background: transparent; border-bottom: 3px solid ${this.state.activeTab==="top-10-observations"?"var(--primary-color)":"transparent"}; color: ${this.state.activeTab==="top-10-observations"?"var(--primary-color)":"var(--text-secondary)"}; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                            <i class="fas fa-ranking-star ml-2"></i>
                            <span data-i18n="module.dailyobs.tab.top10">Top 10</span>
                        </button>
                        `:""}
                        ${n?`
                        <button class="tab-btn ${this.state.activeTab==="data-analysis"?"active":""}" data-tab="data-analysis" style="padding: 12px 24px; border: none; background: transparent; border-bottom: 3px solid ${this.state.activeTab==="data-analysis"?"var(--primary-color)":"transparent"}; color: ${this.state.activeTab==="data-analysis"?"var(--primary-color)":"var(--text-secondary)"}; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                            <i class="fas fa-chart-line ml-2"></i>
                            <span data-i18n="module.dailyobs.tab.analysis">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</span>
                        </button>
                        `:""}
                        ${d?`
                        <button class="tab-btn ${this.state.activeTab==="executive-dashboard"?"active":""}" data-tab="executive-dashboard" style="padding: 12px 24px; border: none; background: transparent; border-bottom: 3px solid ${this.state.activeTab==="executive-dashboard"?"var(--primary-color)":"transparent"}; color: ${this.state.activeTab==="executive-dashboard"?"var(--primary-color)":"var(--text-secondary)"}; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                            <i class="fas fa-gauge-high ml-2"></i>
                            <span data-i18n="module.dailyobs.tab.executive">\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629</span>
                        </button>
                        `:""}
                        <button type="button" id="daily-observations-refresh-btn" class="tab-btn" style="padding: 12px 24px; border: none; background: transparent; border-bottom: 3px solid transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; transition: all 0.3s;" data-i18n-title="module.dailyobs.btn.refreshTitle" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062F\u064A\u0648\u0644">
                            <i class="fas fa-sync-alt ml-2"></i>
                            <span data-i18n="module.dailyobs.btn.refresh">\u062A\u062D\u062F\u064A\u062B</span>
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div id="observations-content" class="mt-6">
                    ${s?`
                    <div id="tab-observations-registry" class="tab-content ${this.state.activeTab==="observations-registry"?"active":""}" style="${this.state.activeTab==="observations-registry"?"":"display: none;"}">
                        ${b}
                    </div>
                    `:""}
                    ${o?`
                    <div id="tab-top-10-observations" class="tab-content ${this.state.activeTab==="top-10-observations"?"active":""}" style="${this.state.activeTab==="top-10-observations"?"":"display: none;"}" ${r==="top-10-observations"?"":'data-obs-lazy="1"'}>
                        ${O}
                    </div>
                    `:""}
                    ${n?`
                    <div id="tab-data-analysis" class="tab-content ${this.state.activeTab==="data-analysis"?"active":""}" style="${this.state.activeTab==="data-analysis"?"":"display: none;"}" ${r==="data-analysis"?"":'data-obs-lazy="1"'}>
                        ${C}
                    </div>
                    `:""}
                    ${d?`
                    <div id="tab-executive-dashboard" class="tab-content ${this.state.activeTab==="executive-dashboard"?"active":""}" style="${this.state.activeTab==="executive-dashboard"?"":"display: none;"}" ${r==="executive-dashboard"?"":'data-obs-lazy="1"'}>
                        ${p}
                    </div>
                    `:""}
                </div>
            `,this.applyModuleI18n(a),typeof StableLoader<"u"&&StableLoader.markPaint("daily-observations",r,{count:(AppState.appData.dailyObservations||[]).length}),this.setupEventListeners(),this.currentFilter=null;try{this.setupTabs()}catch{}this.restoreUIState();try{requestAnimationFrame(()=>{setTimeout(()=>{try{if(this.state&&this.state.activeTab==="observations-registry"){this.loadObservationsList();try{this.runObservationDueDateReminders()}catch(I){Utils.safeWarn("\u26A0\uFE0F \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",I)}}else this.state&&this.state.activeTab==="top-10-observations"&&this.loadTop10Observations()}catch(I){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A:",I)}},10)})}catch(U){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A:",U)}}catch(f){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 DailyObservations:",f),a.innerHTML=`
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-clipboard-check ml-3"></i>
                            <span data-i18n="module.dailyobs.title">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</span>
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${Utils.escapeHTML(this._t("module.dailyobs.error.load","\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                                <p class="text-sm text-gray-400 mb-4">${f&&f.message?Utils.escapeHTML(f.message):Utils.escapeHTML(this._t("module.dailyobs.error.unknown","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}</p>
                                <button onclick="DailyObservations.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async renderList(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(u=>this.normalizeRecord(u)),i=[...new Set(t.map(u=>u.siteName).filter(Boolean))].sort(),a=[...new Set(t.map(u=>u.locationName).filter(Boolean))].sort(),s=[...new Set(t.map(u=>u.observationType).filter(Boolean))].sort(),o=[...new Set(t.map(u=>u.shift).filter(Boolean))].sort(),n=[...new Set(t.map(u=>u.riskLevel).filter(Boolean))].sort(),r=[...new Set(t.map(u=>u.status).filter(Boolean))].sort(),c=[...new Set(t.map(u=>u.observerName).filter(Boolean))].sort(),d=[...new Set(t.map(u=>u.responsibleDepartment).filter(Boolean))].sort(),{t:l,isRTL:p}=this.getTranslations(),f=p?"ml-1":"mr-1";return`
            <!-- \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 -->
            <div id="observations-stats-cards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- \u0633\u064A\u062A\u0645 \u0645\u0644\u0624\u0647\u0627 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
            </div>

            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between gap-4 mb-4 flex-wrap" style="direction: ${p?"rtl":"ltr"};">
                        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; flex: 1;">
                            <h2 class="card-title" style="text-align: ${p?"right":"left"}; margin: 0; white-space: nowrap;">
                                <i class="fas fa-list ${p?"ml-2":"mr-2"}"></i>
                                ${l("title.observationsRegistry")}
                            </h2>
                            <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0627\u0631\u064A\u062E - \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u0628\u062C\u0627\u0646\u0628 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 -->
                            <div class="date-range-bar" style="background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid #e0e7ff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 12px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                                        <i class="fas fa-calendar-alt" style="color: #6366f1;"></i>
                                        ${l("filter.dateFrom")}
                                    </label>
                                    <input type="date" id="observation-date-from" class="date-range-input" style="padding: 6px 10px; border: 1px solid #c7d2fe; border-radius: 6px; background: white; font-size: 12px; color: #1e293b; min-width: 120px; direction: ${p?"rtl":"ltr"};">
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 12px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                                        <i class="fas fa-calendar-check" style="color: #10b981;"></i>
                                        ${l("filter.dateTo")}
                                    </label>
                                    <input type="date" id="observation-date-to" class="date-range-input" style="padding: 6px 10px; border: 1px solid #c7d2fe; border-radius: 6px; background: white; font-size: 12px; color: #1e293b; min-width: 120px; direction: ${p?"rtl":"ltr"};">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0627\u062D\u062A\u0631\u0627\u0641\u064A -->
                <div class="observations-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 0 -20px; width: calc(100% + 40px); direction: ${p?"rtl":"ltr"};">
                    <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: end;">
                        <!-- \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-search ${f}"></i>${l("filter.search")}
                            </label>
                            <input type="text" id="observation-search" class="filter-input" placeholder="${l("filter.searchPlaceholder")}" style="direction: ${p?"rtl":"ltr"}; text-align: ${p?"right":"left"};">
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-map-marker-alt ${f}"></i>${l("filter.site")}
                            </label>
                            <select id="observation-filter-site" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${i.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-location-dot ${f}"></i>${l("filter.location")}
                            </label>
                            <select id="observation-filter-location" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${a.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-tag ${f}"></i>${l("filter.type")}
                            </label>
                            <select id="observation-filter-type" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${s.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-clock ${f}"></i>${l("filter.shift")}
                            </label>
                            <select id="observation-filter-shift" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${o.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-exclamation-triangle ${f}"></i>${l("filter.risk")}
                            </label>
                            <select id="observation-filter-risk" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${n.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-info-circle ${f}"></i>${l("filter.status")}
                            </label>
                            <select id="observation-filter-status" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${r.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-user ${f}"></i>${l("filter.observer")}
                            </label>
                            <select id="observation-filter-observer" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${c.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-user-tie ${f}"></i>${l("filter.responsible")}
                            </label>
                            <select id="observation-filter-responsible" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${l("filter.all")}</option>
                                ${d.map(u=>`<option value="${Utils.escapeHTML(u)}">${Utils.escapeHTML(u)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0648\u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B -->
                        <div class="filter-field">
                            <button id="observation-reset-filters" class="filter-reset-btn" type="button">
                                <i class="fas fa-redo ${f}"></i>${l("btn.reset")}
                            </button>
                        </div>
                        <div class="filter-field">
                            <button id="observation-refresh-btn" class="filter-reset-btn" type="button" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                                <i class="fas fa-sync-alt ${f}"></i>${l("btn.refresh")}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body" style="padding-top: 20px;">
                    <div id="observations-table-container">
                        <div class="empty-state" style="direction: ${p?"rtl":"ltr"}; text-align: ${p?"right":"left"};">
                            <p class="text-gray-500">${l("empty.noObservations")}</p>
                        </div>
                    </div>
                </div>
            </div>
        `},renderStatsCards(e=null,t=null){const i=document.getElementById("observations-stats-cards");if(!i)return;e||(e=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(b=>this.normalizeRecord(b)));const a=e.length,s=e.filter(h=>h.status==="\u0645\u0641\u062A\u0648\u062D"||h.status==="\u062C\u062F\u064A\u062F").length,o=e.filter(h=>h.status==="\u0645\u063A\u0644\u0642").length,n=e.filter(h=>h.riskLevel==="\u0639\u0627\u0644\u064A"||h.riskLevel==="\u0639\u0627\u0644\u064A\u0629").length,r=e.filter(h=>h.riskLevel==="\u0645\u062A\u0648\u0633\u0637"||h.riskLevel==="\u0645\u062A\u0648\u0633\u0637\u0629").length,c=e.filter(h=>h.riskLevel==="\u0645\u0646\u062E\u0641\u0636"||h.riskLevel==="\u0628\u0633\u064A\u0637\u0629"||h.riskLevel==="\u0628\u0633\u064A\u0637").length,d={},l=new Set;e.forEach(h=>{const b=h.siteName||"";b&&(l.add(b),d[b]=(d[b]||0)+1)});let p=0,f="";Object.keys(d).forEach(h=>{const b=d[h];b>p&&(p=b,f=h)});const m=p,u=f||this._t("module.dailyobs.stats.none","\u0644\u0627 \u064A\u0648\u062C\u062F"),v=Object.keys(d).filter(h=>d[h]>=this.OBSERVATIONS_THRESHOLD),g=v.length>0,x=new Set;e.forEach(h=>{const b=h.observationType||"";b&&x.add(b)});const y=x.size,k=Array.from(x)[0]?this.getObservationTypeLabel(Array.from(x)[0]):this._t("module.dailyobs.stats.none","\u0644\u0627 \u064A\u0648\u062C\u062F"),$=[{id:"notes-status",title:this._t("module.dailyobs.stats.total.title","\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"),value:a,subtitle:this._tf("module.dailyobs.stats.total.subtitle",{open:s,closed:o},`\u0645\u0641\u062A\u0648\u062D: ${s} | \u0645\u063A\u0644\u0642: ${o}`),icon:"fas fa-clipboard-list",color:"blue",gradient:"from-blue-500 to-blue-600",bgGradient:"from-blue-50 to-blue-100",borderColor:"border-blue-200",textColor:"text-blue-700",iconBg:"bg-blue-100",filter:null,description:this._t("module.dailyobs.stats.total.desc","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A")},{id:"risk-levels",title:this._t("module.dailyobs.stats.risk.title","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"),value:n+r+c,subtitle:this._tf("module.dailyobs.stats.risk.subtitle",{high:n,medium:r,low:c},`\u0639\u0627\u0644\u064A: ${n} | \u0645\u062A\u0648\u0633\u0637: ${r} | \u0628\u0633\u064A\u0637: ${c}`),icon:"fas fa-exclamation-triangle",color:"red",gradient:"from-red-500 to-red-600",bgGradient:"from-red-50 to-red-100",borderColor:"border-red-200",textColor:"text-red-700",iconBg:"bg-red-100",filter:null,description:this._t("module.dailyobs.stats.risk.desc","\u062A\u0648\u0632\u064A\u0639 \u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629")},{id:"locations",title:this._t("module.dailyobs.stats.location.title","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646"),value:m,subtitle:u.length>30?u.substring(0,30)+"...":u,icon:"fas fa-map-marker-alt",color:g?"red":"green",gradient:g?"from-red-500 to-red-600":"from-green-500 to-green-600",bgGradient:g?"from-red-50 to-red-100":"from-green-50 to-green-100",borderColor:g?"border-red-300":"border-green-200",textColor:g?"text-red-700":"text-green-700",iconBg:g?"bg-red-100":"bg-green-100",filter:null,description:g?this._tf("module.dailyobs.stats.location.alert",{n:v.length},`\u062A\u0646\u0628\u064A\u0647: ${v.length} \u0645\u0648\u0642\u0639`):this._t("module.dailyobs.stats.location.desc","\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u064A \u0627\u0644\u0645\u0635\u0646\u0639"),isHighRisk:g,highRiskSites:v},{id:"note-types",title:this._t("module.dailyobs.stats.type.title","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),value:y,subtitle:k.length>30?k.substring(0,30)+"...":k,icon:"fas fa-tags",color:"purple",gradient:"from-purple-500 to-purple-600",bgGradient:"from-purple-50 to-purple-100",borderColor:"border-purple-200",textColor:"text-purple-700",iconBg:"bg-purple-100",filter:null,description:this._t("module.dailyobs.stats.type.desc","\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629")}];i.innerHTML=$.map(h=>{const b=t&&h.filter&&JSON.stringify(t)===JSON.stringify(h.filter),C=h.filter?"cursor-pointer":"",O=h.filter?`onclick="DailyObservations.filterByCard('${h.id}', ${JSON.stringify(h.filter||{})})"`:"",U=a>0&&h.value>0?(h.value/a*100).toFixed(1):0;let I={badgeBg:"bg-blue-50 text-blue-700 border-blue-200",iconColor:"text-blue-600",valueColor:"text-blue-900",barColor:"from-blue-500 to-indigo-600",hoverBorder:"hover:border-blue-300"};return h.id==="risk-levels"?I={badgeBg:"bg-red-50 text-red-700 border-red-200",iconColor:"text-red-600",valueColor:"text-red-900",barColor:"from-red-500 to-rose-600",hoverBorder:"hover:border-red-300"}:h.id==="locations"?h.isHighRisk?I={badgeBg:"bg-red-100 text-red-800 border-red-300",iconColor:"text-red-600",valueColor:"text-red-900",barColor:"from-red-500 to-red-700",hoverBorder:"hover:border-red-400"}:I={badgeBg:"bg-emerald-50 text-emerald-700 border-emerald-200",iconColor:"text-emerald-600",valueColor:"text-emerald-900",barColor:"from-emerald-500 to-teal-600",hoverBorder:"hover:border-emerald-300"}:h.id==="note-types"&&(I={badgeBg:"bg-purple-50 text-purple-700 border-purple-200",iconColor:"text-purple-600",valueColor:"text-purple-900",barColor:"from-purple-500 to-violet-600",hoverBorder:"hover:border-purple-300"}),`
                <div class="stat-kpi-card ${C} ${b?"active-kpi":""} ${I.hoverBorder}" 
                     ${h.filter?`data-filter='${JSON.stringify(h.filter||{})}'`:""} 
                     ${O}>
                    
                    <div class="kpi-top-row ${I.badgeBg}">
                        <div class="flex items-center gap-2 font-bold text-xs">
                            <i class="${h.icon} ${I.iconColor} text-sm"></i>
                            <span>${h.title}</span>
                        </div>
                        ${b?`
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white shadow-sm border text-blue-700">\u0645\u064F\u0641\u0639\u0644</span>
                        `:h.isHighRisk?`
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">\u062A\u0646\u0628\u064A\u0647</span>
                        `:`
                            <span class="text-[11px] opacity-75 font-semibold">${U}%</span>
                        `}
                    </div>

                    <div class="kpi-body my-2">
                        <div class="flex items-baseline justify-between gap-2">
                            <div class="text-2xl lg:text-3xl font-extrabold ${I.valueColor} tracking-tight">
                                ${h.value.toLocaleString("en-US")}
                            </div>
                            <div class="text-xs text-slate-500 font-medium text-left">
                                ${h.description}
                            </div>
                        </div>

                        ${h.subtitle?`
                            <div class="kpi-subtitle-pill mt-3">
                                <i class="fas fa-chart-pie opacity-60 text-xs"></i>
                                <span>${h.subtitle}</span>
                            </div>
                        `:""}
                    </div>

                    <div class="kpi-bottom-bar">
                        <div class="kpi-bar-fill bg-gradient-to-r ${I.barColor}" style="width: ${U}%;"></div>
                    </div>
                </div>
            `}).join(""),this.injectStatsCardsStyles(),this.injectTableScrollbarStyles(),g&&this.notifyAdminAboutHighRiskSites(v,d).catch(h=>{Utils?.safeWarn?.("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0644\u0645\u062F\u064A\u0631:",h)})},async notifyAdminAboutHighRiskSites(e,t){try{const i="lastHighRiskSitesNotification",a=localStorage.getItem(i),s=Date.now(),o=3600*1e3;if(a){const p=parseInt(a,10);if(s-p<o)return}const r=(AppState?.appData?.users||[]).filter(p=>p&&p.active!==!1&&(p.role==="admin"||p.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||p.permissions&&(p.permissions.isAdmin===!0||p.permissions.admin===!0)));if(r.length===0){Utils?.safeLog?.("\u26A0\uFE0F \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062F\u064A\u0631\u064A \u0646\u0638\u0627\u0645 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0647\u0645");return}const c=e.map(p=>{const f=t[p]||0;return`  - ${p}: ${f} \u0645\u0644\u0627\u062D\u0638\u0629`}).join(`
`),d="\u062A\u0646\u0628\u064A\u0647: \u0632\u064A\u0627\u062F\u0629 \u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u064A \u0645\u0648\u0627\u0642\u0639 \u0645\u0639\u064A\u0646\u0629",l=`\u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0645\u0648\u0627\u0642\u0639 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0639\u062F\u062F \u0643\u0628\u064A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0623\u0643\u062B\u0631 \u0645\u0646 ${this.OBSERVATIONS_THRESHOLD} \u0645\u0644\u0627\u062D\u0638\u0629):

${c}

\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0647\u0630\u0647 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0625\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0644\u0627\u0632\u0645\u0629.`;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState?.googleConfig?.appsScript?.enabled)r.forEach(p=>{const f=p.id||p.email||p.userId;f&&GoogleIntegration.sendRequest({action:"addNotification",data:{userId:f,title:d,message:l,type:"observations_high_risk_site",priority:"high",link:"#daily-observations-section",data:{module:"daily-observations",action:"high_risk_sites",highRiskSites:e,threshold:this.OBSERVATIONS_THRESHOLD}}}).catch(()=>{})}),localStorage.setItem(i,s.toString()),Utils?.safeLog?.("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0628\u062E\u0635\u0648\u0635 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062E\u0637\u0631\u0629");else{const p=AppState?.currentUser;p&&(p.role==="admin"||p.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||p.permissions&&(p.permissions.isAdmin===!0||p.permissions.admin===!0))&&typeof Notification<"u"&&Notification.warning(l,1e4)}}catch(i){Utils?.safeLog?.("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062E\u0637\u0631\u0629 (\u063A\u064A\u0631 \u062D\u0631\u062C):",i)}},injectStatsCardsStyles(){const e="daily-observations-stats-cards-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
            @keyframes pulse-red {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                50% {
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.6), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
            }
            .stat-kpi-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 1rem 1.15rem;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.05);
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 135px;
            }
            .stat-kpi-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.1);
            }
            .stat-kpi-card.active-kpi {
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
            }
            .stat-kpi-card .kpi-top-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.45rem 0.75rem;
                border-radius: 10px;
                border: 1px solid transparent;
            }
            .stat-kpi-card .kpi-subtitle-pill {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                background: #f8fafc;
                border: 1px solid #f1f5f9;
                color: #475569;
                font-size: 0.75rem;
                font-weight: 600;
                padding: 0.3rem 0.55rem;
                border-radius: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .stat-kpi-card .kpi-bottom-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: #f1f5f9;
            }
            .stat-kpi-card .kpi-bar-fill {
                height: 100%;
                border-radius: 999px;
                transition: width 0.6s ease;
            }
            /* \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 */
            .observations-filters-row {
                position: relative;
            }
            .filters-grid {
                width: 100%;
            }
            .filter-field {
                display: flex;
                flex-direction: column;
                gap: 6px;
                min-width: 140px;
            }
            .filter-label {
                font-size: 12px;
                font-weight: 600;
                color: #4a5568;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
            }
            .filter-label i {
                font-size: 11px;
                color: #667eea;
            }
            .filter-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                background: white;
                font-size: 14px;
                color: #2d3748;
                transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            }
            .filter-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .filter-input:hover {
                border-color: #cbd5e0;
            }
            input[type="date"].filter-input {
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                min-height: 42px;
                line-height: 1.4;
                padding-top: 9px;
                padding-bottom: 9px;
                color: #2d3748;
                color-scheme: light;
                background-color: white;
            }
            input[type="date"].filter-input::-webkit-calendar-picker-indicator {
                cursor: pointer;
                opacity: 0.75;
                filter: grayscale(1);
            }
            .filter-reset-btn {
                width: 100%;
                padding: 10px 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .filter-reset-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
            }
            .filter-reset-btn:active {
                transform: translateY(0);
            }
            @media (max-width: 1200px) {
                .filters-grid {
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                }
            }
            @media (max-width: 768px) {
                .filters-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .observations-filters-row {
                    padding: 12px 16px;
                    margin: 0 -16px 0 -16px;
                    width: calc(100% + 32px);
                }
            }
        `,document.head.appendChild(t)},injectTableScrollbarStyles(){const e="daily-observations-table-scrollbar-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
            /* \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A */
            .observations-table-wrapper {
                position: relative;
                overflow-x: auto;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
                max-height: 70vh;
                width: 100%;
            }

            /* \u062A\u062E\u0635\u064A\u0635 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0623\u0641\u0642\u064A (\u0627\u0644\u0623\u0633\u0641\u0644) */
            .observations-table-wrapper::-webkit-scrollbar:horizontal {
                height: 12px;
            }

            .observations-table-wrapper::-webkit-scrollbar-track:horizontal {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
                margin: 0 10px;
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb:horizontal {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb:horizontal:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u062A\u062E\u0635\u064A\u0635 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0639\u0645\u0648\u062F\u064A (\u0627\u0644\u062C\u0627\u0646\u0628\u064A) */
            .observations-table-wrapper::-webkit-scrollbar:vertical {
                width: 12px;
            }

            .observations-table-wrapper::-webkit-scrollbar-track:vertical {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
                margin: 10px 0;
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb:vertical {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb:vertical:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0639\u0627\u0645 (\u0644\u0644\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0627\u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A) */
            .observations-table-wrapper::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            .observations-table-wrapper::-webkit-scrollbar-track {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .observations-table-wrapper::-webkit-scrollbar-thumb:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 */
            [data-theme="dark"] .observations-table-wrapper::-webkit-scrollbar-track {
                background: var(--bg-secondary, #1f2937);
            }

            [data-theme="dark"] .observations-table-wrapper::-webkit-scrollbar-thumb {
                background: var(--primary-color, #60a5fa);
                border-color: var(--bg-secondary, #1f2937);
            }

            [data-theme="dark"] .observations-table-wrapper::-webkit-scrollbar-thumb:hover {
                background: var(--primary-color-dark, #3b82f6);
            }

            /* \u062A\u062D\u0633\u064A\u0646\u0627\u062A \u0644\u0644\u062C\u0648\u0627\u0644 */
            @media (max-width: 768px) {
                .observations-table-wrapper {
                    max-height: 60vh;
                }

                .observations-table-wrapper::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .observations-table-wrapper::-webkit-scrollbar-thumb {
                    border-width: 1px;
                }
            }

            /* \u0625\u0636\u0627\u0641\u0629 \u0638\u0644\u0627\u0644 \u0639\u0646\u062F \u0627\u0644\u062A\u0645\u0631\u064A\u0631 */
            .observations-table-wrapper {
                position: relative;
            }

            .observations-table-wrapper::before,
            .observations-table-wrapper::after {
                content: '';
                position: sticky;
                pointer-events: none;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .observations-table-wrapper::before {
                top: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent);
            }

            .observations-table-wrapper::after {
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
            }

            .observations-table-wrapper.scrolled-top::before {
                opacity: 0;
            }

            .observations-table-wrapper:not(.scrolled-top)::before {
                opacity: 1;
            }

            .observations-table-wrapper.scrolled-bottom::after {
                opacity: 0;
            }

            .observations-table-wrapper:not(.scrolled-bottom)::after {
                opacity: 1;
            }
            
            /* \u2705 \u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 */
            .filter-count-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 24px;
                height: 20px;
                padding: 2px 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 700;
                margin-right: 4px;
                margin-left: 4px;
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `,document.head.appendChild(t)},setupTableScrollListeners(e){if(!e)return;const t=()=>{const i=e.scrollTop,a=e.scrollLeft,s=e.scrollHeight,o=e.scrollWidth,n=e.clientHeight,r=e.clientWidth;i===0?e.classList.add("scrolled-top"):e.classList.remove("scrolled-top"),i+n>=s-1?e.classList.add("scrolled-bottom"):e.classList.remove("scrolled-bottom"),a===0?e.classList.add("scrolled-left"):e.classList.remove("scrolled-left"),a+r>=o-1?e.classList.add("scrolled-right"):e.classList.remove("scrolled-right")};e.addEventListener("scroll",t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{t()}).observe(e),t()},filterByCard(e,t){if(!t||Object.keys(t).length===0){this.currentFilter=null,this.loadObservationsList();const s=document.getElementById("clear-filters-btn"),o=document.getElementById("filter-indicator");s&&(s.style.display="none"),o&&(o.style.display="none");return}this.currentFilter={cardId:e,filter:t},this.loadObservationsList(t),this.renderStatsCards(null,t);const i=document.getElementById("clear-filters-btn"),a=document.getElementById("filter-indicator");if(i&&(i.style.display="inline-flex",i.onclick=()=>{this.currentFilter=null,this.loadObservationsList(),this.renderStatsCards(),i.style.display="none",a&&(a.style.display="none")}),a){a.style.display="block";const s=document.querySelector(`[data-filter='${JSON.stringify(t)}']`)?.querySelector("h3")?.textContent||"\u0627\u0644\u0641\u0644\u062A\u0631";a.textContent=`\u0627\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u0646\u0634\u0637: ${s}`}},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const e=(AppState.currentUser?.role||"").toLowerCase();return e==="admin"||e==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"},ensureDataManagerAndSave(){try{return typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?(window.DataManager.save(),!0):typeof DataManager<"u"&&typeof DataManager.save=="function"?(DataManager.save(),!0):(Utils.safeWarn("\u26A0\uFE0F DailyObservations: DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),!1)}catch(e){return Utils.safeError("DailyObservations: \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",e),!1}},setupTabs(){setTimeout(()=>{const e=document.querySelectorAll(".tab-btn[data-tab]");e.forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-tab");e.forEach(s=>{s.classList.remove("active"),s.style.borderBottomColor="transparent",s.style.color="var(--text-secondary)"}),document.querySelectorAll(".tab-content").forEach(s=>{s.classList.remove("active"),s.style.display="none"}),t.classList.add("active"),t.style.borderBottomColor="var(--primary-color)",t.style.color="var(--primary-color)";const a=document.getElementById(`tab-${i}`);if(a){if(a.classList.add("active"),a.style.display="block",i==="data-analysis"){if(!(typeof Permissions<"u"?Permissions.hasDetailedPermission("daily-observations","data-analysis"):this.isCurrentUserAdmin())){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");const o=document.querySelector('.tab-btn[data-tab="observations-registry"]');o&&o.click();return}a.getAttribute("data-obs-lazy")==="1"?(a.removeAttribute("data-obs-lazy"),this.renderDataAnalysis().then(o=>(a.innerHTML=o||"",this.applyModuleI18n(a),this._bindAnalyticsEvents(),this.loadDataAnalysis())).catch(()=>{this._bindAnalyticsEvents(),this.loadDataAnalysis()})):this.loadDataAnalysis()}if(i==="top-10-observations"&&(a.getAttribute("data-obs-lazy")==="1"?(a.removeAttribute("data-obs-lazy"),this.renderTop10Observations().then(s=>(a.innerHTML=s||"",this.applyModuleI18n(a),this.loadTop10Observations())).catch(()=>this.loadTop10Observations())):this.loadTop10Observations()),i==="executive-dashboard")try{if(a.getAttribute("data-obs-lazy")==="1"){a.removeAttribute("data-obs-lazy");try{a.innerHTML=this.renderExecutiveDashboard()||"",this.applyModuleI18n(a)}catch{}}this.loadExecutiveDashboard()}catch(s){Utils?.safeWarn?.("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629:",s?.message||s)}}})})},100)},async renderDataAnalysis(){return this.ensureChartJSLoaded().catch(()=>{}),`
        <div id="obs-analytics-root" style="font-family: inherit;">

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(37,99,235,0.3);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-line" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0648\u0641\u0648\u0631\u064A \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0641\u062A\u0631\u0629 -->
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((e,t)=>{const i=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],a=(this._analysisPeriod||"0")===e;return`<button class="obs-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${a?"#fff":"rgba(255,255,255,0.15)"};color:${a?"#1e40af":"#fff"};">${i[t]}</button>`}).join("")}
                    </div>
                    <!-- \u0632\u0631 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                    <button id="obs-toggle-filters-btn" title="\u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="obs-filter-active-badge" style="display:none;background:#ef4444;color:#fff;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u2022</span>
                    </button>
                    <!-- \u0632\u0631 \u062A\u0635\u062F\u064A\u0631 PDF -->
                    <button id="obs-export-pdf-btn" title="\u062A\u0635\u062F\u064A\u0631 PDF" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(239,68,68,0.85);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(239,68,68,1)'" onmouseout="this.style.background='rgba(239,68,68,0.85)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <!-- \u0632\u0631 \u062A\u062D\u062F\u064A\u062B -->
                    <button id="obs-analytics-refresh" title="\u062A\u062D\u062F\u064A\u062B" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 (\u0645\u062E\u0641\u064A\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B)
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div id="obs-filter-panel" style="display:none;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:16px;animation:fadeIn .2s ease;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#2563eb;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#1e3a8a;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="obs-filter-results-count" style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="obs-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'" onmouseout="this.style.background='#fff';this.style.color='#64748b';this.style.borderColor='#e2e8f0'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;">
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-industry" style="color:#3b82f6;margin-left:4px;"></i>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639
                        </label>
                        <select id="obs-af-site" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-hard-hat" style="color:#f59e0b;margin-left:4px;"></i>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629
                        </label>
                        <select id="obs-af-observer" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-tag" style="color:#10b981;margin-left:4px;"></i>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629
                        </label>
                        <select id="obs-af-type" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-exclamation-triangle" style="color:#ef4444;margin-left:4px;"></i>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                        </label>
                        <select id="obs-af-risk" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-circle" style="color:#8b5cf6;margin-left:4px;font-size:10px;"></i>\u0627\u0644\u062D\u0627\u0644\u0629
                        </label>
                        <select id="obs-af-status" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-sun" style="color:#f97316;margin-left:4px;"></i>\u0627\u0644\u0648\u0631\u062F\u064A\u0629
                        </label>
                        <select id="obs-af-shift" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-building" style="color:#0ea5e9;margin-left:4px;"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629
                        </label>
                        <select id="obs-af-dept" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 KPI Cards
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div id="obs-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:8px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u062E\u0637\u0648\u0631\u0629
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-circle-notch" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="obs-chart-status"></canvas>
                        <div id="obs-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-triangle" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="obs-chart-risk"></canvas>
                        <div id="obs-chart-risk-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                    </div>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="obs-chart-trend"></canvas>
                    <div id="obs-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 Row 2: \u0627\u0644\u0646\u0648\u0639 + \u0627\u0644\u0645\u0648\u0642\u0639
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tag" style="color:#10b981;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="obs-chart-type"></canvas>
                        <div id="obs-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="obs-chart-location"></canvas>
                        <div id="obs-chart-location-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 Row 3: \u0627\u0644\u0625\u062F\u0627\u0631\u0629 + \u0627\u0644\u0648\u0631\u062F\u064A\u0629
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#0ea5e9;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="obs-chart-dept"></canvas>
                        <div id="obs-chart-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sun" style="color:#f97316;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="obs-chart-shift"></canvas>
                        <div id="obs-chart-shift-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u0645\u062E\u0637\u0637 \u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-stopwatch" style="color:#6366f1;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</span>
                    <span style="font-size:0.72rem;color:#94a3b8;margin-right:auto;">(\u0623\u0642\u0644 = \u0623\u0641\u0636\u0644 \u0627\u0633\u062A\u062C\u0627\u0628\u0629)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="obs-chart-closetime"></canvas>
                    <div id="obs-chart-closetime-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629</div>
                </div>
            </div>

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-fire" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629)</span>
                    </div>
                    <span id="obs-critical-count" style="background:#fef2f2;color:#b91c1c;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table id="obs-critical-table" style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0646\u0642\u0636\u064A\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="obs-critical-tbody">
                            <tr><td colspan="8" style="padding:20px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`},_filterObsByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(a=>{if(!a.date)return!0;const s=new Date(a.date);return!isNaN(s.getTime())&&s>=i})},_groupBy(e,t,i=0){const a={};e.forEach(o=>{const n=String(o[t]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[n]=(a[n]||0)+1});let s=Object.entries(a).sort((o,n)=>n[1]-o[1]);return i>0&&(s=s.slice(0,i)),{labels:s.map(o=>o[0]),data:s.map(o=>o[1])}},_drawDoughnut(e,t,i,a){const s=document.getElementById(e),o=document.getElementById(e+"-empty");if(!s)return;if(!i.length||i.reduce((d,l)=>d+l,0)===0){s.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none");const n=i.reduce((d,l)=>d+l,0),r=this.analysisCharts&&this.analysisCharts[e];if(r)try{r.destroy()}catch{}const c=new Chart(s,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:a||this._chartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:d=>` ${d.label}: ${d.parsed} (${n>0?(d.parsed/n*100).toFixed(1):0}%)`}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=c},_drawHBar(e,t,i,a){const s=document.getElementById(e),o=document.getElementById(e+"-empty");if(!s)return;if(!i.length||i.reduce((c,d)=>c+d,0)===0){s.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none");const n=this.analysisCharts&&this.analysisCharts[e];if(n)try{n.destroy()}catch{}const r=new Chart(s,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:a||"rgba(59,130,246,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:c=>String(t[c]).length>18?String(t[c]).slice(0,17)+"\u2026":t[c]}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=r},_drawTrend(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const s=new Date,o=[],n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let l=11;l>=0;l--){const p=new Date(s.getFullYear(),s.getMonth()-l,1);o.push({year:p.getFullYear(),month:p.getMonth(),label:`${n[p.getMonth()]} ${p.getFullYear()}`})}const r=o.map(l=>t.filter(p=>{if(!p.date)return!1;const f=new Date(p.date);return!isNaN(f.getTime())&&f.getFullYear()===l.year&&f.getMonth()===l.month}).length);if(r.reduce((l,p)=>l+p,0)===0){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none");const c=this.analysisCharts&&this.analysisCharts[e];if(c)try{c.destroy()}catch{}const d=new Chart(i,{type:"bar",data:{labels:o.map(l=>l.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",data:r,backgroundColor:r.map(l=>l===Math.max(...r)?"rgba(239,68,68,0.8)":"rgba(59,130,246,0.65)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=d},_chartColors(e){const t=["rgba(59,130,246,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(139,92,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(251,146,60,0.8)","rgba(99,102,241,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,a)=>t[a%t.length])},OBS_EXEC_HIGH_RISK_THRESHOLD:5,_execGetObservations(){let e=[];try{e=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():AppState?.appData?.dailyObservations||[]}catch{e=AppState?.appData?.dailyObservations||[]}return Array.isArray(e)||(e=[]),e.map(t=>{try{return this.normalizeRecord(t)}catch{return t}})},_execGetFilters(){const e=i=>{const a=document.getElementById(i);return a?a.value:""},t=i=>{const a=document.getElementById(i);return a&&a.selectedIndex>=0?a.options[a.selectedIndex].text:""};return{site:e("obs-exec-filter-site"),siteLabel:t("obs-exec-filter-site"),period:e("obs-exec-filter-period"),periodLabel:t("obs-exec-filter-period"),dept:e("obs-exec-filter-dept"),deptLabel:t("obs-exec-filter-dept"),category:e("obs-exec-filter-category"),categoryLabel:t("obs-exec-filter-category"),risk:e("obs-exec-filter-risk"),riskLabel:t("obs-exec-filter-risk"),status:e("obs-exec-filter-status"),statusLabel:t("obs-exec-filter-status")}},_execApplyFilters(e){const t=this._execGetFilters();let i=e||[];if(t.site&&(i=i.filter(a=>String(a.siteName||"")===t.site)),t.dept&&(i=i.filter(a=>String(a.responsibleDepartment||"")===t.dept)),t.category&&(i=i.filter(a=>this._execCategoryOf(a)===t.category)),t.risk&&(i=i.filter(a=>String(a.riskLevel||"")===t.risk)),t.status==="open"?i=i.filter(a=>!this._execIsClosed(a)):t.status==="overdue"?i=i.filter(a=>this._execIsOverdue(a)):t.status==="closed"&&(i=i.filter(a=>this._execIsClosed(a))),t.period){const a=parseInt(t.period,10);if(a>0){const s=new Date;s.setMonth(s.getMonth()-a),i=i.filter(o=>{const n=new Date(o.date);return!isNaN(n.getTime())&&n>=s})}}return i},_execIsClosed(e){return String(e.status||"").includes("\u0645\u063A\u0644\u0642")},_execIsOverdue(e){if(this._execIsClosed(e)||!e.expectedCompletionDate)return!1;const t=new Date(e.expectedCompletionDate);return!isNaN(t.getTime())&&t.getTime()<Date.now()},_execIsHighRisk(e){const t=String(e.riskLevel||"");return t.includes("\u0639\u0627\u0644\u064A")||t.includes("\u0639\u0627\u0644\u064A\u0629")||t.includes("\u0645\u0631\u062A\u0641\u0639")||t.includes("\u0634\u062F\u064A\u062F")||t.includes("\u062D\u0631\u062C")},_execIsCritical(e){const t=String(e.riskLevel||"").toLowerCase();return t.includes("\u0634\u062F\u064A\u062F")||t.includes("\u062D\u0631\u062C")||t.includes("critical")},_execIsNearMiss(e){const t=(String(e.observationType||"")+" "+String(e.details||"")).toLowerCase();return t.includes("\u0648\u0634\u064A\u0643")||t.includes("\u0643\u0627\u062F")||t.includes("\u062A\u062C\u0646\u0628")||t.includes("near miss")||t.includes("nearmiss")},_execCategoryOf(e){if(this._execIsNearMiss(e))return"\u062D\u0648\u0627\u062F\u062B \u0648\u0634\u064A\u0643\u0629";const t=(String(e.observationType||"")+" "+String(e.details||"")).toLowerCase();return t.includes("\u0628\u064A\u0626\u0629")||t.includes("\u0628\u064A\u0626\u064A")||t.includes("\u062A\u0644\u0648\u062B")||t.includes("\u0646\u0641\u0627\u064A\u0627\u062A")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629":t.includes("\u062C\u0648\u062F\u0629")||t.includes("\u0645\u0637\u0627\u0628\u0642\u0629")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u0648\u062F\u0629":t.includes("\u0625\u064A\u062C\u0627\u0628\u064A")||t.includes("\u0627\u064A\u062C\u0627\u0628\u064A")||t.includes("\u0645\u0642\u062A\u0631\u062D")||t.includes("\u0634\u0643\u0631")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629":t.includes("\u062A\u0635\u0631\u0641")||t.includes("\u0633\u0644\u0648\u0643")||t.includes("\u0641\u0639\u0644")?"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":(t.includes("\u0648\u0636\u0639")||t.includes("\u0634\u0631\u0637")||t.includes("\u062D\u0627\u0644\u0629")||t.includes("\u0645\u0639\u062F\u0629")||t.includes("\u0645\u0639\u062F\u0627\u062A")||t.includes("\u0623\u062F\u0627\u0629"),"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646")},_execDescTokens(e){const t=String(e||"").toLowerCase().replace(/[^\u0621-\u064aa-z0-9\s]/g," ");return new Set(t.split(/\s+/).filter(i=>i.length>=3))},_execJaccard(e,t){if(!e.size&&!t.size)return 1;if(!e.size||!t.size)return 0;let i=0;return e.forEach(a=>{t.has(a)&&i++}),i/(e.size+t.size-i)},_detectRepeatObservations(e){const t={};(e||[]).forEach(a=>{const s=[a.siteName||"-",a.locationName||"-",a.observationType||"-"].join(" | ");(t[s]=t[s]||[]).push(a)});const i=[];return Object.entries(t).forEach(([a,s])=>{const o=[];s.forEach(n=>{const r=this._execDescTokens(n.details);let c=!1;for(const d of o)if(this._execJaccard(r,d.sig)>=.5){d.items.push(n),c=!0;break}c||o.push({sig:r,items:[n]})}),o.forEach(n=>{if(n.items.length>=2){const r=n.items.map(v=>new Date(v.date)).filter(v=>!isNaN(v.getTime())).sort((v,g)=>v-g),c=r.length?r[r.length-1]:null,d=Date.now(),l=720*60*60*1e3,p=r.filter(v=>d-v.getTime()<=l).length,f=r.filter(v=>d-v.getTime()>l&&d-v.getTime()<=2*l).length,m=p>f?"up":p<f?"down":"flat",u=n.items[0].details||n.items[0].observationType||"\u2014";i.push({key:a,sample:String(u).slice(0,80),count:n.items.length,last:c,trend:m})}})}),i.sort((a,s)=>s.count-a.count),i},_computeExecKpis(e){const t=e.length,i=e.filter(C=>this._execIsClosed(C)),a=e.filter(C=>!this._execIsClosed(C)),s=e.filter(C=>this._execIsOverdue(C)),o=e.filter(C=>this._execIsNearMiss(C)),n=e.filter(C=>this._execIsHighRisk(C)&&!this._execIsClosed(C)),r=e.filter(C=>this._execIsCritical(C)&&this._execIsOverdue(C)),c=e.filter(C=>{if(!C.expectedCompletionDate)return!1;const O=new Date(C.expectedCompletionDate);return!isNaN(O.getTime())&&O.getTime()<=Date.now()}),d=c.filter(C=>this._execIsClosed(C)),l=c.length?d.length/c.length*100:t?i.length/t*100:0,p=i.map(C=>Number(C.overdays)||0).filter(C=>C>0),f=p.length?p.reduce((C,O)=>C+O,0)/p.length:0,m=this._detectRepeatObservations(e),u=m.reduce((C,O)=>C+O.count,0),v=t?u/t*100:0,g=new Date,x=(C,O,U)=>C.filter(I=>{const L=new Date(I.date);return!isNaN(L.getTime())&&L.getFullYear()===O&&L.getMonth()===U}).length,y=x(o,g.getFullYear(),g.getMonth()),k=new Date(g.getFullYear(),g.getMonth()-1,1),$=x(o,k.getFullYear(),k.getMonth()),h=y-$,b=t?o.length/t*100:0;return{total:t,nearMiss:o.length,nearMissRate:b,nearMissTrend:h,openActions:a.length,overdue:s.length,closureRate:l,avgDaysToClose:f,repeatRate:v,repeatIssues:m,highRiskOpen:n.length,criticalOverdue:r.length}},_runInsightsEngine(e){const t=[];return e.nearMissTrend>0&&e.closureRate>90&&t.push({type:"good",icon:"fa-circle-check",text:"\u062B\u0642\u0627\u0641\u0629 \u062A\u0628\u0644\u064A\u063A \u0623\u0645\u0627\u0646 \u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0645\u0639 \u0625\u062F\u0627\u0631\u0629 \u0641\u0639\u0651\u0627\u0644\u0629 \u0644\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629."}),e.nearMissTrend>0&&e.closureRate<75&&t.push({type:"warn",icon:"fa-triangle-exclamation",text:"\u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u064F\u0628\u0644\u064E\u0651\u063A \u0644\u0643\u0646 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0644\u0627 \u062A\u064F\u063A\u0644\u0642 \u0628\u0641\u0639\u0627\u0644\u064A\u0629."}),e.repeatRate>20&&t.push({type:"danger",icon:"fa-rotate",text:"\u0645\u0634\u0643\u0644\u0627\u062A \u0623\u0645\u0627\u0646 \u0645\u062A\u0643\u0631\u0631\u0629. \u064A\u064F\u0648\u0635\u0649 \u0628\u0625\u062C\u0631\u0627\u0621 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)."}),e.highRiskOpen>this.OBS_EXEC_HIGH_RISK_THRESHOLD&&t.push({type:"danger",icon:"fa-bolt",text:`\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 (${e.highRiskOpen}) \u2014 \u064A\u062A\u0637\u0644\u0628 \u0627\u0646\u062A\u0628\u0627\u0647 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0641\u0648\u0631\u064A.`}),t.length||t.push({type:"info",icon:"fa-circle-info",text:"\u0627\u0644\u0623\u062F\u0627\u0621 \u0636\u0645\u0646 \u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0637\u0628\u064A\u0639\u064A. \u0648\u0627\u0635\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A."}),t},_injectExecStyles(){const e="obs-exec-dashboard-styles-v2",t=document.getElementById("obs-exec-dashboard-styles");if(t&&t.remove(),document.getElementById(e))return;const i=document.createElement("style");i.id=e,i.textContent=`
        .obs-exec-wrap{direction:rtl;width:100%;max-width:100%;box-sizing:border-box;}
        .obs-exec-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;width:100%;}
        .obs-exec-filters{display:flex;flex-wrap:wrap;gap:10px;align-items:end;background:var(--card-bg);border:1px solid var(--border-color);border-radius:14px;padding:14px 16px;margin-bottom:16px;box-shadow:var(--shadow-sm);width:100%;box-sizing:border-box;}
        .obs-exec-filter{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1 1 140px;}
        .obs-exec-filter label{font-size:11px;font-weight:600;color:var(--text-secondary);}
        .obs-exec-filter select{width:100%;padding:8px 10px;border:1px solid var(--border-color);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;cursor:pointer;}
        .obs-exec-kpi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:18px;width:100%;}
        @media (min-width:640px){.obs-exec-kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}}
        @media (min-width:960px){.obs-exec-kpi-grid{grid-template-columns:repeat(4,minmax(0,1fr));}}
        @media (min-width:1280px){.obs-exec-kpi-grid{grid-template-columns:repeat(5,minmax(0,1fr));}}
        .obs-exec-kpi{position:relative;background:var(--card-bg);border:1px solid var(--border-color);border-radius:14px;padding:14px 16px;box-shadow:var(--shadow-sm);overflow:hidden;transition:var(--transition);min-width:0;}
        .obs-exec-kpi:hover{box-shadow:var(--shadow-md);transform:translateY(-2px);}
        .obs-exec-kpi__accent{position:absolute;inset-inline-start:0;top:0;bottom:0;width:5px;}
        .obs-exec-kpi__icon{position:absolute;top:12px;inset-inline-end:12px;font-size:18px;opacity:.85;}
        .obs-exec-kpi__label{font-size:clamp(10px,1.7vw,12px);color:var(--text-secondary);font-weight:600;margin-bottom:6px;padding-inline-end:24px;line-height:1.35;}
        .obs-exec-kpi__value{font-size:clamp(1.15rem,2.4vw,1.65rem);font-weight:800;color:var(--text-primary);line-height:1.1;word-break:break-word;}
        .obs-exec-kpi__sub{font-size:10px;color:var(--text-tertiary);margin-top:6px;line-height:1.35;}
        .obs-exec-progress{height:6px;background:var(--bg-tertiary);border-radius:99px;margin-top:10px;overflow:hidden;}
        .obs-exec-progress__bar{height:100%;border-radius:99px;transition:width .6s ease;}
        .obs-exec-insights{display:flex;flex-direction:column;gap:10px;margin-bottom:18px;width:100%;}
        .obs-exec-insight{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:12px;border:1px solid;font-weight:600;font-size:13px;line-height:1.45;}
        .obs-exec-insight i{font-size:18px;margin-top:1px;flex-shrink:0;}
        .obs-exec-insight--good{background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.35);color:#047857;}
        .obs-exec-insight--warn{background:rgba(245,158,11,.10);border-color:rgba(245,158,11,.40);color:#b45309;}
        .obs-exec-insight--danger{background:rgba(239,68,68,.10);border-color:rgba(239,68,68,.40);color:#b91c1c;}
        .obs-exec-insight--info{background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.35);color:#1d4ed8;}
        .obs-exec-charts{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;margin-top:6px;width:100%;}
        @media (min-width:768px){.obs-exec-charts{grid-template-columns:repeat(2,minmax(0,1fr));}}
        @media (min-width:1280px){.obs-exec-charts{grid-template-columns:repeat(3,minmax(0,1fr));}}
        .obs-exec-card{background:var(--card-bg);border:1px solid var(--border-color);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);min-width:0;box-sizing:border-box;}
        .obs-exec-card--wide{grid-column:1/-1;}
        .obs-exec-card--span-lg{grid-column:1/-1;}
        @media (min-width:768px){.obs-exec-card--span-lg{grid-column:span 2;}}
        .obs-exec-card__title{font-size:clamp(12px,1.9vw,14px);font-weight:700;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .obs-exec-chart-box{position:relative;height:clamp(220px,30vw,300px);min-height:220px;width:100%;}
        .obs-exec-card--chart-tall .obs-exec-chart-box{height:auto;min-height:260px;}
        .obs-exec-empty{position:absolute;inset:0;display:none;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:13px;text-align:center;padding:12px;}
        .obs-exec-table{width:100%;min-width:520px;border-collapse:collapse;font-size:13px;}
        .obs-exec-table-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
        .obs-exec-table th,.obs-exec-table td{padding:10px 12px;text-align:right;border-bottom:1px solid var(--border-color);color:var(--text-primary);vertical-align:top;}
        .obs-exec-table th{color:var(--text-secondary);font-weight:700;background:var(--bg-secondary);white-space:nowrap;}
        .obs-exec-badge{display:inline-block;padding:2px 9px;border-radius:99px;font-size:11px;font-weight:700;}
        .obs-exec-heat-grid{display:grid;gap:4px;overflow-x:auto;width:100%;min-width:0;}
        .obs-exec-heat-cell{padding:9px 4px;text-align:center;border-radius:6px;font-size:11px;font-weight:700;}
        .obs-exec-heat-head{font-size:11px;font-weight:700;color:var(--text-secondary);text-align:center;padding:6px 2px;white-space:nowrap;}
        .obs-exec-heat-row-label{font-size:12px;color:var(--text-primary);font-weight:600;display:flex;align-items:center;padding-inline-end:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        #tab-executive-dashboard{width:100%;max-width:100%;box-sizing:border-box;}
        [data-theme="dark"] .obs-exec-insight--good{color:#34d399;}
        [data-theme="dark"] .obs-exec-insight--warn{color:#fbbf24;}
        [data-theme="dark"] .obs-exec-insight--danger{color:#f87171;}
        [data-theme="dark"] .obs-exec-insight--info{color:#60a5fa;}
        @media (max-width:639px){
            .obs-exec-header .btn-success,.obs-exec-header .btn-secondary{width:100%;justify-content:center;}
            .obs-exec-kpi{padding:12px 14px;}
            .obs-exec-card{padding:12px;}
        }
        `,document.head.appendChild(i)},renderExecutiveDashboard(){this._injectExecStyles();let e="";try{e=(this.getAllSites()||[]).map(r=>`<option value="${Utils?.escapeHTML?Utils.escapeHTML(r.name):r.name}">${Utils?.escapeHTML?Utils.escapeHTML(r.name):r.name}</option>`).join("")}catch{}let t="";try{t=(this.getDepartmentOptions()||[]).map(r=>`<option value="${Utils?.escapeHTML?Utils.escapeHTML(r):r}">${Utils?.escapeHTML?Utils.escapeHTML(r):r}</option>`).join("")}catch{}let i="";try{i=(this.getRiskLevels()||[]).map(r=>`<option value="${r}">${r}</option>`).join("")}catch{}const s=["\u062D\u0648\u0627\u062F\u062B \u0648\u0634\u064A\u0643\u0629","\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646","\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646","\u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u0648\u062F\u0629"].map(r=>`<option value="${r}">${r}</option>`).join(""),o=`
            <div class="obs-exec-filters">
                <div class="obs-exec-filter">
                    <label><i class="fas fa-industry ml-1"></i>\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                    <select id="obs-exec-filter-site"><option value="">\u0643\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>${e}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-calendar ml-1"></i>\u0627\u0644\u0641\u062A\u0631\u0629</label>
                    <select id="obs-exec-filter-period"><option value="">\u0643\u0644 \u0627\u0644\u0641\u062A\u0631\u0627\u062A</option><option value="3">\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631</option><option value="6">\u0622\u062E\u0631 6 \u0623\u0634\u0647\u0631</option><option value="12">\u0622\u062E\u0631 12 \u0634\u0647\u0631</option></select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-building ml-1"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                    <select id="obs-exec-filter-dept"><option value="">\u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>${t}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-shapes ml-1"></i>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</label>
                    <select id="obs-exec-filter-category"><option value="">\u0643\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</option>${s}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-gauge ml-1"></i>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                    <select id="obs-exec-filter-risk"><option value="">\u0643\u0644 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A</option>${i}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-flag ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                    <select id="obs-exec-filter-status"><option value="">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option><option value="open">\u0645\u0641\u062A\u0648\u062D\u0629</option><option value="overdue">\u0645\u062A\u0623\u062E\u0631\u0629</option><option value="closed">\u0645\u063A\u0644\u0642\u0629</option></select>
                </div>
            </div>`,n=(r,c,d,l={})=>`
            <div class="obs-exec-card ${[l.wide?"obs-exec-card--wide":"",l.spanLg?"obs-exec-card--span-lg":"",l.tall?"obs-exec-card--chart-tall":""].filter(Boolean).join(" ")}">
                <div class="obs-exec-card__title"><i class="fas ${d}" style="color:var(--primary-color);"></i>${c}</div>
                <div class="obs-exec-chart-box">
                    <canvas id="${r}"></canvas>
                    <div id="${r}-empty" class="obs-exec-empty"><i class="fas fa-inbox ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629</div>
                </div>
            </div>`;return`
        <div class="obs-exec-wrap" id="obs-exec-root">
            <div class="obs-exec-header">
                <div>
                    <h2 style="font-size:18px;font-weight:800;color:var(--text-primary);margin:0;"><i class="fas fa-gauge-high ml-2" style="color:var(--primary-color);"></i>\u0644\u0648\u062D\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0648\u0642\u0627\u0626\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629</h2>
                    <p style="font-size:13px;color:var(--text-secondary);margin:4px 0 0;">\u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0623\u0645\u0646\u064A\u0629 \u0631\u0627\u0626\u062F\u0629 \u2014 \u062A\u0628\u0644\u064A\u063A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0648\u0623\u062F\u0627\u0621 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629</p>
                </div>
                <div id="obs-exec-actions" style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button type="button" id="obs-exec-export-btn" class="btn-success"><i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF</button>
                    <button type="button" id="obs-exec-refresh-btn" class="btn-secondary"><i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A</button>
                </div>
            </div>
            ${o}
            <div id="obs-exec-insights" class="obs-exec-insights"></div>
            <div id="obs-exec-kpi-strip" class="obs-exec-kpi-grid"></div>
            <div class="obs-exec-charts">
                ${n("obs-exec-chart-nearmiss","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0634\u0647\u0631\u064A","fa-chart-line",{spanLg:!0})}
                ${n("obs-exec-chart-closure","\u0627\u062A\u062C\u0627\u0647 \u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A","fa-chart-area",{spanLg:!0})}
                ${n("obs-exec-chart-category","\u062A\u0648\u0632\u064A\u0639 \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A","fa-shapes")}
                ${n("obs-exec-chart-risk","\u062A\u0648\u0632\u064A\u0639 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","fa-gauge")}
                ${n("obs-exec-chart-dept","\u0645\u0642\u0627\u0631\u0646\u0629 \u0623\u062F\u0627\u0621 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A (\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 %)","fa-building",{tall:!0})}
                ${n("obs-exec-chart-repeat","\u0623\u0628\u0631\u0632 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629","fa-rotate",{tall:!0})}
                <div class="obs-exec-card obs-exec-card--wide">
                    <div class="obs-exec-card__title"><i class="fas fa-fire" style="color:var(--danger-color);"></i>\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629 (\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \xD7 \u0627\u0644\u0634\u0647\u0631)</div>
                    <div id="obs-exec-heatmap"></div>
                </div>
                <div class="obs-exec-card obs-exec-card--wide">
                    <div class="obs-exec-card__title"><i class="fas fa-list-ol" style="color:var(--primary-color);"></i>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629</div>
                    <div class="obs-exec-table-wrap"><table class="obs-exec-table"><thead><tr><th>\u0627\u0644\u0645\u0634\u0643\u0644\u0629</th><th>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646 / \u0627\u0644\u0646\u0648\u0639</th><th>\u0639\u062F\u062F \u0627\u0644\u062A\u0643\u0631\u0627\u0631</th><th>\u0622\u062E\u0631 \u062D\u062F\u0648\u062B</th><th>\u0627\u0644\u0627\u062A\u062C\u0627\u0647</th></tr></thead><tbody id="obs-exec-repeat-table"></tbody></table></div>
                </div>
            </div>
        </div>`},async loadExecutiveDashboard(){if(!this._execLoading){this._execLoading=!0;try{try{await this.ensureChartJSLoaded()}catch{}const e=this._execApplyFilters(this._execGetObservations()),t=this._computeExecKpis(e);this._renderExecInsights(this._runInsightsEngine(t)),this._renderExecKpiCards(t),this._renderRepeatTable(t.repeatIssues),this._renderOverdueHeatmap(e),typeof Chart<"u"&&this._drawExecCharts(e,t);const i=document.getElementById("obs-exec-refresh-btn");i&&!i._execBound&&(i._execBound=!0,i.addEventListener("click",()=>{try{this.loadExecutiveDashboard()}catch{}}));const a=document.getElementById("obs-exec-export-btn");if(a&&!a._execBound&&(a._execBound=!0,a.addEventListener("click",()=>{try{this._exportExecutivePDF()}catch{}})),["obs-exec-filter-site","obs-exec-filter-period","obs-exec-filter-dept","obs-exec-filter-category","obs-exec-filter-risk","obs-exec-filter-status"].forEach(s=>{const o=document.getElementById(s);o&&!o._execBound&&(o._execBound=!0,o.addEventListener("change",()=>{try{this.loadExecutiveDashboard()}catch{}}))}),!this._execResizeBound){this._execResizeBound=!0;let s=null;window.addEventListener("resize",()=>{this.state?.activeTab==="executive-dashboard"&&(clearTimeout(s),s=setTimeout(()=>{try{this.loadExecutiveDashboard()}catch{}},350))})}}catch(e){Utils?.safeWarn?.("\u26A0\uFE0F loadExecutiveDashboard:",e?.message||e)}finally{this._execLoading=!1}}},_renderExecInsights(e){const t=document.getElementById("obs-exec-insights");t&&(t.innerHTML=(e||[]).map(i=>`<div class="obs-exec-insight obs-exec-insight--${i.type}"><i class="fas ${i.icon}"></i><span>${i.text}</span></div>`).join(""))},_renderExecKpiCards(e){const t=document.getElementById("obs-exec-kpi-strip");if(!t)return;const i=o=>o>0?`<span style="color:#dc2626;"><i class="fas fa-arrow-trend-up"></i> +${o}</span>`:o<0?`<span style="color:#059669;"><i class="fas fa-arrow-trend-down"></i> ${o}</span>`:'<span style="color:var(--text-tertiary);"><i class="fas fa-minus"></i> \u062B\u0627\u0628\u062A</span>',a=o=>Math.max(0,Math.min(100,Math.round(o))),s=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",value:e.total,icon:"fa-clipboard-list",color:"#3b82f6",sub:"\u0643\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0626\u064A\u0629"},{label:"\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",value:e.nearMiss,icon:"fa-bolt",color:"#f59e0b",sub:`\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0634\u0647\u0631\u064A: ${i(e.nearMissTrend)}`},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0639\u0646 \u0627\u0644\u0648\u0634\u064A\u0643\u0629",value:e.nearMissRate.toFixed(1)+"%",icon:"fa-bullhorn",color:"#8b5cf6",progress:a(e.nearMissRate),pcolor:"#8b5cf6"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",value:e.openActions,icon:"fa-folder-open",color:"#06b6d4",sub:"\u0644\u0645 \u062A\u064F\u063A\u0644\u0642 \u0628\u0639\u062F"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629",value:e.overdue,icon:"fa-clock",color:"#ef4444",sub:"\u062A\u062C\u0627\u0648\u0632\u062A \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642"},{label:"\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",value:e.closureRate.toFixed(1)+"%",icon:"fa-circle-check",color:e.closureRate>=90?"#10b981":e.closureRate>=75?"#f59e0b":"#ef4444",progress:a(e.closureRate),pcolor:e.closureRate>=90?"#10b981":e.closureRate>=75?"#f59e0b":"#ef4444"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:Math.round(e.avgDaysToClose),icon:"fa-hourglass-half",color:"#6366f1",sub:"\u064A\u0648\u0645 \u0644\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629"},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631",value:e.repeatRate.toFixed(1)+"%",icon:"fa-rotate",color:e.repeatRate>20?"#ef4444":"#10b981",progress:a(e.repeatRate),pcolor:e.repeatRate>20?"#ef4444":"#10b981"},{label:"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629",value:e.highRiskOpen,icon:"fa-triangle-exclamation",color:e.highRiskOpen>this.OBS_EXEC_HIGH_RISK_THRESHOLD?"#ef4444":"#f59e0b",sub:"\u062A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u062A\u0623\u062E\u0631\u0629",value:e.criticalOverdue,icon:"fa-fire",color:"#b91c1c",sub:"\u0623\u0648\u0644\u0648\u064A\u0629 \u0642\u0635\u0648\u0649"}];t.innerHTML=s.map(o=>`
            <div class="obs-exec-kpi">
                <div class="obs-exec-kpi__accent" style="background:${o.color};"></div>
                <i class="fas ${o.icon} obs-exec-kpi__icon" style="color:${o.color};"></i>
                <div class="obs-exec-kpi__label">${o.label}</div>
                <div class="obs-exec-kpi__value">${o.value}</div>
                ${o.progress!=null?`<div class="obs-exec-progress"><div class="obs-exec-progress__bar" style="width:${o.progress}%;background:${o.pcolor};"></div></div>`:`<div class="obs-exec-kpi__sub">${o.sub||""}</div>`}
            </div>`).join("")},_renderRepeatTable(e){const t=document.getElementById("obs-exec-repeat-table");if(!t)return;if(!e||!e.length){t.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-tertiary);padding:18px;"><i class="fas fa-check-circle ml-2" style="color:#10b981;"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0634\u0643\u0644\u0627\u062A \u0645\u062A\u0643\u0631\u0631\u0629</td></tr>';return}const i=a=>a==="up"?'<span style="color:#dc2626;"><i class="fas fa-arrow-trend-up"></i> \u0645\u062A\u0635\u0627\u0639\u062F</span>':a==="down"?'<span style="color:#059669;"><i class="fas fa-arrow-trend-down"></i> \u0645\u062A\u0646\u0627\u0642\u0635</span>':'<span style="color:var(--text-tertiary);"><i class="fas fa-minus"></i> \u062B\u0627\u0628\u062A</span>';t.innerHTML=e.slice(0,15).map(a=>{const s=a.last?new Date(a.last).toLocaleDateString("ar-EG"):"\u2014",o=a.count>=5?"#b91c1c":a.count>=3?"#f59e0b":"#3b82f6";return`<tr>
                <td>${Utils?.escapeHTML?Utils.escapeHTML(a.sample):a.sample}</td>
                <td style="color:var(--text-secondary);">${Utils?.escapeHTML?Utils.escapeHTML(a.key):a.key}</td>
                <td><span class="obs-exec-badge" style="background:${o}1a;color:${o};">${a.count}</span></td>
                <td>${s}</td>
                <td>${i(a.trend)}</td>
            </tr>`}).join("")},_renderOverdueHeatmap(e){const t=document.getElementById("obs-exec-heatmap");if(!t)return;const i=(e||[]).filter(f=>this._execIsOverdue(f));if(!i.length){t.innerHTML='<div style="text-align:center;color:var(--text-tertiary);padding:18px;"><i class="fas fa-check-circle ml-2" style="color:#10b981;"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629</div>';return}const a=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let f=5;f>=0;f--){const m=new Date(a.getFullYear(),a.getMonth()-f,1);o.push({y:m.getFullYear(),m:m.getMonth(),label:`${s[m.getMonth()]} ${String(m.getFullYear()).slice(2)}`})}const n={};i.forEach(f=>{const m=f.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n[m]=(n[m]||0)+1});const r=Object.entries(n).sort((f,m)=>m[1]-f[1]).slice(0,7).map(f=>f[0]),c=(f,m)=>i.filter(u=>{if((u.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")!==f)return!1;const v=new Date(u.expectedCompletionDate||u.date);return!isNaN(v.getTime())&&v.getFullYear()===m.y&&v.getMonth()===m.m}).length;let d=1;r.forEach(f=>o.forEach(m=>{d=Math.max(d,c(f,m))}));let p=`<div class="obs-exec-heat-grid" style="grid-template-columns:${`minmax(120px,160px) repeat(${o.length}, minmax(64px,1fr))`};">`;p+='<div class="obs-exec-heat-head"></div>'+o.map(f=>`<div class="obs-exec-heat-head">${f.label}</div>`).join(""),r.forEach(f=>{p+=`<div class="obs-exec-heat-row-label" title="${f}">${f}</div>`,o.forEach(m=>{const u=c(f,m),v=u===0?0:.15+.75*(u/d),g=u===0?"var(--bg-tertiary)":`rgba(239,68,68,${v.toFixed(2)})`,x=u===0?"var(--text-tertiary)":v>.5?"#fff":"#7f1d1d";p+=`<div class="obs-exec-heat-cell" style="background:${g};color:${x};">${u||""}</div>`})}),p+="</div>",t.innerHTML=p},_execChartImg(e){const t=this.analysisCharts&&this.analysisCharts[e];if(!t)return"";try{return t.toBase64Image("image/png",1)}catch{return""}},_buildExecReportNode(e,t,i){const a=T=>Utils?.escapeHTML?Utils.escapeHTML(String(T??"")):String(T??""),s=typeof AppState<"u"&&AppState.companySettings?AppState.companySettings:{},o=s.name||(typeof DEFAULT_COMPANY_NAME<"u"?DEFAULT_COMPANY_NAME:"QHSSE-GLOBAL"),n=s.secondaryName||"",r=typeof AppState<"u"&&AppState.companyLogo?AppState.companyLogo:s.logo||"",c=[s.address,s.phone,s.email].filter(Boolean).join("  |  "),d=new Date,l=d.toLocaleString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),p="OBS-EXEC-"+d.getFullYear()+String(d.getMonth()+1).padStart(2,"0"),f=String(o).trim().slice(0,2)||"HS",u=`
            <div style="display:flex;align-items:center;gap:14px;border-bottom:3px solid #1e3a8a;padding-bottom:12px;margin-bottom:14px;">
                ${r?`<img src="${a(r)}" style="width:58px;height:58px;object-fit:contain;border-radius:8px;background:#fff;border:1px solid #e2e8f0;"/>`:`<div style="width:58px;height:58px;border-radius:8px;background:#1e3a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;">${a(f)}</div>`}
                <div style="flex:1;">
                    <div style="font-size:20px;font-weight:800;color:#0f172a;white-space:nowrap;word-break:keep-all;">${a(o)}</div>
                    ${n?`<div style="font-size:13px;color:#6b7280;margin-top:2px;">${a(n)}</div>`:""}
                </div>
                <div style="text-align:left;font-size:11px;color:#374151;line-height:1.9;">
                    <div><b>\u0643\u0648\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</b> ${a(p)}</div>
                    <div><b>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</b> ${a(l)}</div>
                </div>
            </div>
            <div style="text-align:center;background:#1e3a8a;color:#fff;padding:9px;border-radius:8px;font-size:16px;font-weight:700;margin-bottom:12px;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>`,g=`<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;font-size:11px;color:#334155;">${[["\u0627\u0644\u0645\u0648\u0642\u0639",i.siteLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u0641\u062A\u0631\u0629",i.periodLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u0625\u062F\u0627\u0631\u0629",i.deptLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062A\u0635\u0646\u064A\u0641",i.categoryLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062E\u0637\u0648\u0631\u0629",i.riskLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062D\u0627\u0644\u0629",i.statusLabel||"\u0627\u0644\u0643\u0644"]].map(([T,E])=>`<span style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:99px;padding:3px 10px;"><b>${a(T)}:</b> ${a(E)}</span>`).join("")}</div>`,x={good:["#ecfdf5","#10b981","#047857"],warn:["#fffbeb","#f59e0b","#b45309"],danger:["#fef2f2","#ef4444","#b91c1c"],info:["#eff6ff","#3b82f6","#1d4ed8"]},y='<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">'+this._runInsightsEngine(t).map(T=>{const E=x[T.type]||x.info;return`<div style="background:${E[0]};border:1px solid ${E[1]}55;border-right:4px solid ${E[1]};border-radius:8px;padding:9px 12px;font-size:12px;font-weight:600;color:${E[2]};">${a(T.text)}</div>`}).join("")+"</div>",$='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:14px;">'+[["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",t.total,"#3b82f6"],["\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",t.nearMiss,"#f59e0b"],["\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0639\u0646 \u0627\u0644\u0648\u0634\u064A\u0643\u0629",t.nearMissRate.toFixed(1)+"%","#8b5cf6"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",t.openActions,"#06b6d4"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629",t.overdue,"#ef4444"],["\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",t.closureRate.toFixed(1)+"%","#10b981"],["\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",Math.round(t.avgDaysToClose),"#6366f1"],["\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631",t.repeatRate.toFixed(1)+"%",t.repeatRate>20?"#ef4444":"#10b981"],["\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629",t.highRiskOpen,"#f59e0b"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u062A\u0623\u062E\u0631\u0629",t.criticalOverdue,"#b91c1c"]].map(T=>`<div style="border:1px solid #e2e8f0;border-top:3px solid ${T[2]};border-radius:9px;padding:9px;background:#f8fafc;"><div style="font-size:10px;color:#64748b;font-weight:600;margin-bottom:6px;min-height:26px;">${a(T[0])}</div><div style="font-size:19px;font-weight:800;color:#0f172a;">${a(T[1])}</div></div>`).join("")+"</div>",b='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'+[["obs-exec-chart-nearmiss","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0634\u0647\u0631\u064A"],["obs-exec-chart-closure","\u0627\u062A\u062C\u0627\u0647 \u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"],["obs-exec-chart-category","\u062A\u0648\u0632\u064A\u0639 \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],["obs-exec-chart-risk","\u062A\u0648\u0632\u064A\u0639 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"],["obs-exec-chart-dept","\u0645\u0642\u0627\u0631\u0646\u0629 \u0623\u062F\u0627\u0621 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A (\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 %)"],["obs-exec-chart-repeat","\u0623\u0628\u0631\u0632 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629"]].map(([T,E])=>{const j=this._execChartImg(T);return j?`<div style="border:1px solid #e2e8f0;border-radius:9px;padding:9px;background:#fff;"><div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px;">${a(E)}</div><img src="${j}" style="width:100%;height:auto;display:block;"/></div>`:""}).filter(Boolean).join("")+"</div>";let C="";const O=(e||[]).filter(T=>this._execIsOverdue(T));if(O.length){const T=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],E=[];for(let M=5;M>=0;M--){const _=new Date(d.getFullYear(),d.getMonth()-M,1);E.push({y:_.getFullYear(),m:_.getMonth(),label:`${T[_.getMonth()]} ${String(_.getFullYear()).slice(2)}`})}const j={};O.forEach(M=>{const _=M.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";j[_]=(j[_]||0)+1});const R=Object.entries(j).sort((M,_)=>_[1]-M[1]).slice(0,7).map(M=>M[0]),Y=(M,_)=>O.filter(H=>{if((H.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")!==M)return!1;const q=new Date(H.expectedCompletionDate||H.date);return!isNaN(q.getTime())&&q.getFullYear()===_.y&&q.getMonth()===_.m}).length;let J=1;R.forEach(M=>E.forEach(_=>{J=Math.max(J,Y(M,_))})),C=`<div style="font-size:13px;font-weight:700;color:#0f172a;margin:6px 0 8px;">\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629 (\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \xD7 \u0627\u0644\u0634\u0647\u0631)</div>
                <table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:14px;"><thead><tr><th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>${E.map(M=>`<th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">${a(M.label)}</th>`).join("")}</tr></thead><tbody>`+R.map(M=>`<tr><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;font-weight:600;">${a(M)}</td>${E.map(_=>{const H=Y(M,_),q=H===0?0:.15+.75*(H/J),D=H===0?"#f8fafc":`rgba(239,68,68,${q.toFixed(2)})`,z=H===0?"#94a3b8":q>.5?"#fff":"#7f1d1d";return`<td style="border:1px solid #e2e8f0;padding:6px;text-align:center;font-weight:700;background:${D};color:${z};">${H||""}</td>`}).join("")}</tr>`).join("")+"</tbody></table>"}let U="";const I=(t.repeatIssues||[]).slice(0,15);if(I.length){const T=E=>E==="up"?"\u0645\u062A\u0635\u0627\u0639\u062F":E==="down"?"\u0645\u062A\u0646\u0627\u0642\u0635":"\u062B\u0627\u0628\u062A";U=`<div style="font-size:13px;font-weight:700;color:#0f172a;margin:6px 0 8px;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629</div>
                <table style="width:100%;border-collapse:collapse;font-size:11px;"><thead><tr>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0645\u0634\u0643\u0644\u0629</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646 / \u0627\u0644\u0646\u0648\u0639</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0627\u0644\u062A\u0643\u0631\u0627\u0631</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0622\u062E\u0631 \u062D\u062F\u0648\u062B</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647</th>
                </tr></thead><tbody>`+I.map(E=>`<tr><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;">${a(E.sample)}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;color:#475569;">${a(E.key)}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;font-weight:700;">${E.count}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;">${E.last?a(new Date(E.last).toLocaleDateString("ar-EG")):"\u2014"}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;">${a(T(E.trend))}</td></tr>`).join("")+"</tbody></table>"}const L=`<div style="margin-top:18px;border-top:1px solid #e2e8f0;padding-top:8px;font-size:10px;color:#64748b;display:flex;justify-content:space-between;gap:10px;">
                <span>${a(c)}</span>
                <span>${a(o)} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 QHSSE</span>
            </div>`,P=document.createElement("div");return P.style.cssText="position:fixed;left:-99999px;top:0;width:794px;background:#ffffff;color:#0f172a;font-family:Tahoma,Arial,sans-serif;padding:24px;box-sizing:border-box;direction:rtl;z-index:-1;",P.innerHTML=u+g+y+$+b+C+U+L,P},async _exportExecutivePDF(){const e=document.getElementById("obs-exec-export-btn"),t=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062C\u0647\u064A\u0632...');let i=null;try{await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const a=this._execApplyFilters(this._execGetObservations()),s=this._computeExecKpis(a),o=this._execGetFilters();i=this._buildExecReportNode(a,s,o),document.body.appendChild(i),await new Promise($=>setTimeout($,120));const n=await html2canvas(i,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),{jsPDF:r}=window.jspdf,c=new r({orientation:"portrait",unit:"mm",format:"a4"}),d=c.internal.pageSize.getWidth(),l=c.internal.pageSize.getHeight(),p=8,f=8,m=d-p*2,u=m/n.width,v=n.height*u,g=l-p-f,x=Math.max(1,Math.ceil(v/g)),y=g/u;for(let $=0;$<x;$++){$>0&&c.addPage();const h=document.createElement("canvas"),b=Math.min(y,n.height-$*y);h.width=n.width,h.height=b,h.getContext("2d").drawImage(n,0,$*y,n.width,b,0,0,n.width,b);const O=h.toDataURL("image/jpeg",.92);c.addImage(O,"JPEG",p,p,m,b*u),c.setDrawColor(226,232,240),c.line(p,l-f,d-p,l-f),c.setTextColor(120,120,120),c.setFontSize(8),c.setFont("helvetica","normal"),c.text("Daily Observations - Confidential",p,l-3),c.text(`Page ${$+1} / ${x}`,d-p,l-3,{align:"right"})}const k=new Date().toISOString().slice(0,10);c.save(`\u062A\u0642\u0631\u064A\u0631-\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A-\u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629-${k}.pdf`),typeof Notification<"u"&&Notification.success&&(Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"))}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}finally{e&&(e.disabled=!1,e.innerHTML=t)}},_execToggleEmpty(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");return i&&(i.style.display=t?"none":"block"),a&&(a.style.display=t?"flex":"none"),!t},_execDestroyChart(e){if(this.analysisCharts&&this.analysisCharts[e])try{this.analysisCharts[e].destroy()}catch{}},_execShortLabel(e,t=34){const i=String(e||"").trim();return i?i.length>t?i.slice(0,t-1)+"\u2026":i:"\u2014"},_setExecChartBoxHeight(e,t,i=260){const a=document.getElementById(e),s=a&&a.closest(".obs-exec-chart-box");if(!s)return;const o=Math.max(1,Number(t)||1);s.style.minHeight=Math.max(i,o*36+72)+"px",s.style.height="auto"},_drawExecHBar(e,t,i){const a=document.getElementById(e);if(!a)return;const s=Array.isArray(t)?t:[],o=s.map(d=>d.short||d.label||"\u2014"),n=s.map(d=>d.value),r=s.map(d=>d.full||d.short||d.label||"\u2014");if(!this._execToggleEmpty(e,n.length===0||n.reduce((d,l)=>d+l,0)===0))return;this._setExecChartBoxHeight(e,o.length,280),this._execDestroyChart(e);const c=new Chart(a,{type:"bar",data:{labels:o,datasets:[{data:n,backgroundColor:i||"rgba(239,68,68,0.7)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{left:4,right:8}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:d=>r[d[0]?.dataIndex]||"",label:d=>` \u0627\u0644\u062A\u0643\u0631\u0627\u0631: ${d.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{autoSkip:!1,font:{size:10},callback:d=>this._execShortLabel(o[d],36)}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=c},_drawExecCharts(e,t){try{this._drawExecMonthlySeries("obs-exec-chart-nearmiss",e,i=>this._execIsNearMiss(i),"\u0628\u0644\u0627\u063A\u0627\u062A \u0648\u0634\u064A\u0643\u0629","rgba(245,158,11,0.75)")}catch{}try{this._drawExecClosureTrend("obs-exec-chart-closure",e)}catch{}try{const i={};e.forEach(s=>{const o=this._execCategoryOf(s);i[o]=(i[o]||0)+1});const a=Object.entries(i).sort((s,o)=>o[1]-s[1]);this._drawDoughnut("obs-exec-chart-category",a.map(s=>s[0]),a.map(s=>s[1]))}catch{}try{const i=this._groupBy(e,"riskLevel");this._drawDoughnut("obs-exec-chart-risk",i.labels,i.data,["rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(127,29,29,0.85)","rgba(148,163,184,0.7)"])}catch{}try{this._drawExecDeptPerformance("obs-exec-chart-dept",e)}catch{}try{const a=(t.repeatIssues||[]).slice(0,8).map(s=>{const o=String(s.sample||s.key||"\u2014").trim();return{short:this._execShortLabel(o,40),full:o,value:s.count}});this._drawExecHBar("obs-exec-chart-repeat",a,"rgba(239,68,68,0.7)")}catch{}},_drawExecMonthlySeries(e,t,i,a,s){const o=document.getElementById(e);if(!o)return;const n=new Date,r=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],c=[];for(let f=11;f>=0;f--){const m=new Date(n.getFullYear(),n.getMonth()-f,1);c.push({y:m.getFullYear(),m:m.getMonth(),label:`${r[m.getMonth()]} ${m.getFullYear()}`})}const d=t.filter(i),l=c.map(f=>d.filter(m=>{const u=new Date(m.date);return!isNaN(u.getTime())&&u.getFullYear()===f.y&&u.getMonth()===f.m}).length);if(!this._execToggleEmpty(e,l.reduce((f,m)=>f+m,0)===0))return;this._execDestroyChart(e);const p=new Chart(o,{type:"bar",data:{labels:c.map(f=>f.label),datasets:[{label:a,data:l,backgroundColor:s,borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:l,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:3,tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=p},_drawExecClosureTrend(e,t){const i=document.getElementById(e);if(!i)return;const a=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let c=11;c>=0;c--){const d=new Date(a.getFullYear(),a.getMonth()-c,1);o.push({y:d.getFullYear(),m:d.getMonth(),label:`${s[d.getMonth()]} ${d.getFullYear()}`})}const n=o.map(c=>{const d=t.filter(p=>{const f=new Date(p.expectedCompletionDate);return!isNaN(f.getTime())&&f.getFullYear()===c.y&&f.getMonth()===c.m});if(!d.length)return null;const l=d.filter(p=>this._execIsClosed(p)).length;return Math.round(l/d.length*100)});if(!this._execToggleEmpty(e,n.every(c=>c===null)))return;this._execDestroyChart(e);const r=new Chart(i,{type:"line",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 %",data:n,borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:3,tension:.4,fill:!0,spanGaps:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{callbacks:{label:c=>` ${c.parsed.y}%`}}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,max:100,ticks:{callback:c=>c+"%",font:{size:11}}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=r},_drawExecDeptPerformance(e,t){const i=document.getElementById(e);if(!i)return;const a={};t.forEach(l=>{const p=l.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[p]=a[p]||{c:0,t:0},a[p].t++,this._execIsClosed(l)&&a[p].c++});const s=Object.entries(a).map(l=>[l[0],Math.round(l[1].c/l[1].t*100),l[1].t]).sort((l,p)=>p[1]-l[1]).slice(0,8);if(!this._execToggleEmpty(e,s.length===0))return;const o=s.map(l=>({short:this._execShortLabel(l[0],34),full:l[0],value:l[1]})),n=o.map(l=>l.value>=90?"rgba(16,185,129,0.8)":l.value>=75?"rgba(245,158,11,0.8)":"rgba(239,68,68,0.8)");this._setExecChartBoxHeight(e,o.length,280),this._execDestroyChart(e);const r=o.map(l=>l.short),c=o.map(l=>l.value),d=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:c,backgroundColor:n,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{left:4,right:8}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:l=>o[l[0]?.dataIndex]?.full||"",label:l=>` \u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642: ${l.parsed.x}%`}}},scales:{x:{beginAtZero:!0,max:100,ticks:{callback:l=>l+"%",font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{autoSkip:!1,font:{size:10},callback:l=>r[l]||""}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=d},_applyAnalysisFilters(e){const t=p=>{const f=document.getElementById(p);return f?f.value.trim():""},i=t("obs-af-site"),a=t("obs-af-observer"),s=t("obs-af-type"),o=t("obs-af-risk"),n=t("obs-af-status"),r=t("obs-af-shift"),c=t("obs-af-dept"),d=[i,a,s,o,n,r,c].some(p=>p!==""),l=document.getElementById("obs-filter-active-badge");return l&&(l.style.display=d?"inline":"none"),e.filter(p=>!(i&&String(p.siteName||"").trim()!==i||a&&String(p.observerName||"").trim()!==a||s&&String(p.observationType||"").trim()!==s||o&&String(p.riskLevel||"").trim()!==o||n&&String(p.status||"").trim()!==n||r&&String(p.shift||"").trim()!==r||c&&String(p.responsibleDepartment||"").trim()!==c))},_populateAnalysisFilterOptions(e){const t=a=>[...new Set(e.map(s=>String(s[a]||"").trim()).filter(Boolean))].sort(),i=(a,s)=>{const o=document.getElementById(a);if(!o)return;const n=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+s.map(r=>`<option value="${r}"${r===n?" selected":""}>${r}</option>`).join("")};i("obs-af-site",t("siteName")),i("obs-af-observer",t("observerName")),i("obs-af-type",t("observationType")),i("obs-af-risk",t("riskLevel")),i("obs-af-status",t("status")),i("obs-af-shift",t("shift")),i("obs-af-dept",t("responsibleDepartment"))},_drawCloseTimeByType(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const s=t.filter(m=>m.status==="\u0645\u063A\u0644\u0642"&&(m.overdays||0)>0);if(!s.length){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none");const o={};s.forEach(m=>{const u=String(m.observationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();o[u]||(o[u]=[]),o[u].push(m.overdays||0)});const n=Object.entries(o).map(([m,u])=>({label:m,avg:Math.round(u.reduce((v,g)=>v+g,0)/u.length),count:u.length})).sort((m,u)=>u.avg-m.avg).slice(0,10),r=n.map(m=>m.label),c=n.map(m=>m.avg),d=Math.max(...c),l=c.map(m=>m>30?"rgba(239,68,68,0.75)":m>14?"rgba(245,158,11,0.75)":"rgba(16,185,129,0.75)"),p=this.analysisCharts&&this.analysisCharts[e];if(p)try{p.destroy()}catch{}const f=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:c,backgroundColor:l,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>` \u0645\u062A\u0648\u0633\u0637 ${m.parsed.x} \u064A\u0648\u0645 (${n[m.dataIndex].count} \u0645\u0644\u0627\u062D\u0638\u0629)`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"},title:{display:!0,text:"\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0623\u064A\u0627\u0645",font:{size:11}}},y:{ticks:{font:{size:10},callback:m=>String(r[m]).length>18?String(r[m]).slice(0,17)+"\u2026":r[m]}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=f},async _exportAnalyticsPDF(){if(!document.getElementById("obs-analytics-root")){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0639\u0646\u0635\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const t=document.getElementById("obs-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin me-1"></i> \u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0646\u0632\u064A\u0644...');try{const a=A=>{const W=document.getElementById(A);if(W)try{return W.toDataURL("image/png",1)}catch{}return""},s=a("obs-chart-status"),o=a("obs-chart-risk"),n=a("obs-chart-trend"),r=a("obs-chart-location")||a("obs-chart-site"),c=a("obs-chart-type"),d=a("obs-chart-dept"),l=a("obs-chart-shift"),p=a("obs-chart-closetime"),m=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(A=>this.normalizeRecord(A)),u=parseInt(this._analysisPeriod||"0",10),v=this._filterObsByPeriod(m,u),g=typeof this._applyAnalysisFilters=="function"?this._applyAnalysisFilters(v):v,x=g.length,y=g.filter(A=>A.status==="\u0645\u0641\u062A\u0648\u062D"||A.status==="\u062C\u062F\u064A\u062F").length,k=g.filter(A=>A.status==="\u0645\u063A\u0644\u0642").length,$=g.filter(A=>A.status==="\u062C\u0627\u0631\u064A"||A.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,h=g.filter(A=>A.riskLevel==="\u0639\u0627\u0644\u064A"||A.riskLevel==="\u0639\u0627\u0644\u064A\u0629").length,b=g.filter(A=>{if(!A.date)return!1;const W=new Date(A.date),te=new Date;return W.getFullYear()===te.getFullYear()&&W.getMonth()===te.getMonth()}).length,C=x>0?Math.round(k/x*100)+"%":"0%",O=g.filter(A=>A.status==="\u0645\u063A\u0644\u0642"&&A.overdays>0),U=O.length>0?Math.round(O.reduce((A,W)=>A+(W.overdays||0),0)/O.length)+" \u064A\u0648\u0645":"\u2014",I=g.filter(A=>(A.riskLevel==="\u0639\u0627\u0644\u064A"||A.riskLevel==="\u0639\u0627\u0644\u064A\u0629")&&A.status!=="\u0645\u063A\u0644\u0642").sort((A,W)=>(W.overdays||0)-(A.overdays||0)).slice(0,7),L=I.length>0?I.map(A=>`
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 6px 8px; font-weight: bold; color: #1e40af; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(A.isoCode||A.id||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(String(A.date||"").slice(0,10)||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(A.observationType||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML([A.siteName,A.locationName].filter(Boolean).join(" - ")||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(A.observerName||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(A.responsibleDepartment||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;"><span style="display: inline-block; padding: 2px 7px; border-radius: 5px; font-weight: bold; font-size: 9.5px; ${A.status==="\u0645\u063A\u0644\u0642"?"background:#d1fae5;color:#047857;":"background:#fef3c7;color:#b45309;"}">${Utils.escapeHTML(A.status||"\u2014")}</span></td>
                    </tr>
                `).join(""):'<tr><td colspan="7" style="text-align: center; padding: 12px; color: #64748b;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</td></tr>',P=String(AppState?.companySettings?.name||"SafetyHub | ICAPP").trim(),T=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),E=AppState?.companySettings?.logo||"",j=typeof AppState<"u"&&AppState.companySettings?.policyFormCode||"SF-HSE-DOB-02",R=u===30?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":u===90?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":u===180?"\u0622\u062E\u0631 6 \u0623\u0634\u0647\u0631":u===365?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062A\u0631\u0627\u062A";if((typeof html2canvas>"u"||!Utils?.PdfExport?.getJsPdfConstructor?.())&&await Promise.all([this._loadAnalyticsLib("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",()=>typeof html2canvas<"u"),this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>!!Utils?.PdfExport?.getJsPdfConstructor?.())]),typeof html2canvas>"u"||!Utils?.PdfExport?.getJsPdfConstructor?.())throw new Error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A \u062A\u0635\u062F\u064A\u0631 PDF");const Y=document.createElement("div");Y.style.cssText='position: fixed; left: -99999px; top: 0; width: 1120px; z-index: -9999; background: #ffffff; color: #0f172a; direction: rtl; font-family: "Cairo", "Segoe UI", Tahoma, Arial, sans-serif; box-sizing: border-box;';const J=document.createElement("div");J.style.cssText="width: 1120px; min-height: 775px; padding: 22px 26px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;",J.innerHTML=`
                <div>
                    <!-- \u0631\u0623\u0633 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u064A -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            ${E?`<img src="${E}" style="height: 48px; max-width: 120px; object-fit: contain;">`:""}
                            <div>
                                <div style="font-size: 16px; font-weight: 800; color: #1e3a8a;">${Utils.escapeHTML(P)}</div>
                                <div style="font-size: 11px; color: #475569; font-weight: 600;">${Utils.escapeHTML(T)}</div>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 17px; font-weight: 900; color: #0f172a;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>
                            <div style="font-size: 10.5px; color: #64748b; font-weight: 600;">Daily Safety Observations Analytics Report</div>
                        </div>
                        <div style="text-align: left; font-size: 10.5px; color: #475569; line-height: 1.4;">
                            <div><b>\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C:</b> ${Utils.escapeHTML(j)}</div>
                            <div><b>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</b> ${new Date().toLocaleDateString("ar-EG")}</div>
                            <div><b>\u0627\u0644\u0641\u062A\u0631\u0629:</b> ${Utils.escapeHTML(R)}</div>
                        </div>
                    </div>

                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; border-radius: 8px; padding: 7px 14px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                        <div style="font-size: 13.5px; font-weight: 800;">\u{1F4CA} \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>
                        <div style="font-size: 11px; font-weight: 600; opacity: 0.95;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629: ${x}</div>
                    </div>

                    <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 -->
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 10px;">
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #2563eb; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #1e3a8a; line-height: 1.1;">${x}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #d97706; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #b45309; line-height: 1.1;">${y}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #7c3aed; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #6d28d9; line-height: 1.1;">${$}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #059669; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #047857; line-height: 1.1;">${k}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #dc2626; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #b91c1c; line-height: 1.1;">${h}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #0284c7; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #0369a1; line-height: 1.1;">${b}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #4f46e5; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #4338ca; line-height: 1.1;">${C}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #0d9488; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #0f766e; line-height: 1.1;">${U}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u062F\u0627\u0626\u0631\u064A\u0629 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                            <div style="font-size: 11.5px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 4px;">\u{1F518} \u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</div>
                            ${s?`<img src="${s}" style="width: 100%; max-height: 175px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:20px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                            <div style="font-size: 11.5px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 4px;">\u26A0\uFE0F \u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                            ${o?`<img src="${o}" style="width: 100%; max-height: 175px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:20px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                    </div>

                    <!-- \u0645\u062E\u0637\u0637 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A -->
                    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                        <div style="font-size: 11.5px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 4px;">\u{1F4C8} \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</div>
                        ${n?`<img src="${n}" style="width: 100%; max-height: 170px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:20px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                    </div>
                </div>

                <!-- \u062A\u0630\u064A\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 6px; margin-top: 8px; font-size: 9.5px; color: #64748b;">
                    <span>${Utils.escapeHTML(P)} \u2014 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0631\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                    <span>\u0635\u0641\u062D\u0629 1 \u0645\u0646 2</span>
                </div>
            `;const M=document.createElement("div");M.style.cssText="width: 1120px; min-height: 775px; padding: 22px 26px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;",M.innerHTML=`
                <div>
                    <!-- \u0631\u0623\u0633 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${E?`<img src="${E}" style="height: 38px; max-width: 100px; object-fit: contain;">`:""}
                            <div>
                                <div style="font-size: 14px; font-weight: 800; color: #1e3a8a;">${Utils.escapeHTML(P)}</div>
                                <div style="font-size: 10px; color: #64748b;">${Utils.escapeHTML(T)}</div>
                            </div>
                        </div>
                        <div style="font-size: 15px; font-weight: 800; color: #0f172a;">\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629</div>
                        <div style="font-size: 10.5px; color: #475569; text-align: left;">
                            <b>\u0635\u0641\u062D\u0629 2 \u0645\u0646 2</b> | ${new Date().toLocaleDateString("ar-EG")}
                        </div>
                    </div>

                    <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 2x2 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px;">
                            <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; margin-bottom: 4px; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px;">\u{1F3F7}\uFE0F \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0623\u0639\u0644\u0649 10)</div>
                            ${c?`<img src="${c}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px;">
                            <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; margin-bottom: 4px; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px;">\u{1F3E2} \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629 (\u0623\u0639\u0644\u0649 8)</div>
                            ${d?`<img src="${d}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px;">
                            <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; margin-bottom: 4px; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px;">\u{1F4CD} \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</div>
                            ${r?`<img src="${r}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px;">
                            <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; margin-bottom: 4px; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px;">\u23F1\uFE0F \u062D\u0633\u0628 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                            ${l?`<img src="${l}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:p?`<img src="${p}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
                        </div>
                    </div>

                    <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 -->
                    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px;">
                        <div style="font-size: 11.5px; font-weight: 800; color: #b91c1c; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">\u{1F6A8} \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629)</div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                            <thead>
                                <tr style="background: #1e3a8a; color: #ffffff;">
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</th>
                                    <th style="padding: 5px 6px; text-align: right; border: 1px solid #1e40af;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${L}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- \u062A\u0630\u064A\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 6px; margin-top: 8px; font-size: 9.5px; color: #64748b;">
                    <span>${Utils.escapeHTML(P)} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 (QHSSE)</span>
                    <span>\u0635\u0641\u062D\u0629 2 \u0645\u0646 2</span>
                </div>
            `,Y.appendChild(J),Y.appendChild(M),document.body.appendChild(Y),await new Promise(A=>setTimeout(A,160));const _={scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1},H=await html2canvas(J,_),q=await html2canvas(M,_);Y.remove();const D=Utils.PdfExport.createPdf({orientation:"landscape",unit:"mm",format:"a4"});if(!D)throw new Error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0647\u064A\u0626\u0629 \u0645\u062D\u0631\u0643 PDF");const z=D.internal.pageSize.getWidth(),B=D.internal.pageSize.getHeight(),V=6,N=z-V*2,G=B-V*2,le=H.toDataURL("image/jpeg",.94),ce=Math.min(H.height/H.width*N,G);D.addImage(le,"JPEG",V,V,N,ce),D.addPage();const me=q.toDataURL("image/jpeg",.94),fe=Math.min(q.height/q.width*N,G);D.addImage(me,"JPEG",V,V,N,fe);const K=`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A-\u0627\u0644\u064A\u0648\u0645\u064A\u0629-${new Date().toISOString().slice(0,10)}.pdf`;Utils.PdfExport.savePdf(D,K),typeof Notification<"u"&&Notification.success&&Notification.success("\u2705 \u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0645\u0644\u0641 PDF \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u064A \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0646\u062C\u0627\u062D!")}catch(a){typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_loadAnalyticsLib(e,t){return new Promise((i,a)=>{if(t())return i();const s=document.createElement("script");s.src=e,s.onload=()=>i(),s.onerror=()=>a(new Error("Failed to load: "+e)),document.head.appendChild(s)})},toggleAnalyticsFilters(){const e=document.getElementById("obs-filter-panel"),t=document.getElementById("obs-toggle-filters-btn");if(e){const i=e.style.display!=="none";e.style.display=i?"none":"block",t&&(t.style.background=i?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)")}},resetAnalyticsFilters(){["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(e=>{const t=document.getElementById(e);t&&(t.value="")}),this.updateAnalysisResults()},setAnalysisPeriod(e){this._analysisPeriod=String(e||"0");const t=document.getElementById("obs-analytics-root");t&&t.querySelectorAll(".obs-period-btn").forEach(i=>{const a=i.getAttribute("data-period")===String(e);i.style.background=a?"#fff":"rgba(255,255,255,0.15)",i.style.color=a?"#1e40af":"#fff"}),this.updateAnalysisResults()},_bindAnalyticsEvents(){if(!document.getElementById("obs-analytics-root"))return;const t=document.getElementById("obs-toggle-filters-btn");t&&!t.hasAttribute("data-event-bound")&&(t.setAttribute("data-event-bound","true"),t.addEventListener("click",()=>this.toggleAnalyticsFilters()));const i=document.getElementById("obs-filter-reset-btn");i&&!i.hasAttribute("data-event-bound")&&(i.setAttribute("data-event-bound","true"),i.addEventListener("click",()=>this.resetAnalyticsFilters()));const a=document.getElementById("obs-analytics-refresh");a&&!a.hasAttribute("data-event-bound")&&(a.setAttribute("data-event-bound","true"),a.addEventListener("click",()=>this.updateAnalysisResults()));const s=document.getElementById("obs-export-pdf-btn");s&&!s.hasAttribute("data-event-bound")&&(s.setAttribute("data-event-bound","true"),s.addEventListener("click",()=>this._exportAnalyticsPDF())),["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(o=>{const n=document.getElementById(o);n&&!n.hasAttribute("data-event-bound")&&(n.setAttribute("data-event-bound","true"),n.addEventListener("change",()=>this.updateAnalysisResults()))})},async updateAnalysisResults(){const e=document.getElementById("obs-analytics-root");if(!e)return;const t=parseInt(this._analysisPeriod||"0",10),a=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(T=>this.normalizeRecord(T)),s=this._filterObsByPeriod(a,t);this._populateAnalysisFilterOptions(s),this._bindAnalyticsEvents();const o=this._applyAnalysisFilters(s),n=o.length,r=document.getElementById("obs-filter-results-count");r&&(r.textContent=`${n} \u0645\u0644\u0627\u062D\u0638\u0629`);const c=o.filter(T=>T.status==="\u0645\u0641\u062A\u0648\u062D"||T.status==="\u062C\u062F\u064A\u062F").length,d=o.filter(T=>T.status==="\u0645\u063A\u0644\u0642").length,l=o.filter(T=>T.status==="\u062C\u0627\u0631\u064A"||T.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,p=o.filter(T=>T.riskLevel==="\u0639\u0627\u0644\u064A"||T.riskLevel==="\u0639\u0627\u0644\u064A\u0629").length,f=o.filter(T=>{if(!T.date)return!1;const E=new Date(T.date),j=new Date;return E.getFullYear()===j.getFullYear()&&E.getMonth()===j.getMonth()}).length,m=n>0?Math.round(d/n*100):0,u=o.filter(T=>T.status==="\u0645\u063A\u0644\u0642"&&T.overdays>0),v=u.length>0?Math.round(u.reduce((T,E)=>T+(E.overdays||0),0)/u.length):0,g=document.getElementById("obs-kpi-strip");if(g){const T=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",value:n,icon:"fas fa-clipboard-list",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629",value:c,icon:"fas fa-folder-open",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",value:l,icon:"fas fa-spinner",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0645\u063A\u0644\u0642\u0629",value:d,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",value:p,icon:"fas fa-exclamation-triangle",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:f,icon:"fas fa-calendar-day",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:m+"%",icon:"fas fa-chart-pie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:v?v+" \u064A\u0648\u0645":"\u2014",icon:"fas fa-stopwatch",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"}];g.innerHTML=T.map(E=>`
                <div style="background:${E.bg};border:1px solid ${E.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${E.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${E.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${E.color};line-height:1;">${E.value}</div>
                        <div style="font-size:0.7rem;color:#64748b;margin-top:2px;white-space:nowrap;">${E.label}</div>
                    </div>
                </div>`).join("")}if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.</span></div>');return}const y=this._groupBy(o,"status"),k={\u0645\u0641\u062A\u0648\u062D:"rgba(245,158,11,0.8)",\u0645\u063A\u0644\u0642:"rgba(16,185,129,0.8)",\u062C\u0627\u0631\u064A:"rgba(139,92,246,0.8)","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"rgba(99,102,241,0.8)",\u062C\u062F\u064A\u062F:"rgba(59,130,246,0.8)"};this._drawDoughnut("obs-chart-status",y.labels,y.data,y.labels.map(T=>k[T]||"rgba(148,163,184,0.8)"));const $=this._groupBy(o,"riskLevel"),h={\u0639\u0627\u0644\u064A:"rgba(239,68,68,0.85)",\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637:"rgba(245,158,11,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636:"rgba(16,185,129,0.85)",\u0628\u0633\u064A\u0637:"rgba(16,185,129,0.85)",\u0628\u0633\u064A\u0637\u0629:"rgba(16,185,129,0.85)"};this._drawDoughnut("obs-chart-risk",$.labels,$.data,$.labels.map(T=>h[T]||"rgba(148,163,184,0.8)")),this._drawTrend("obs-chart-trend",s);const b=this._groupBy(o,"observationType",10);this._drawHBar("obs-chart-type",b.labels,b.data,"rgba(16,185,129,0.75)");const C=this._groupBy(o,"locationName",8);this._drawHBar("obs-chart-location",C.labels,C.data,"rgba(245,158,11,0.75)");const O=this._groupBy(o,"responsibleDepartment",8);this._drawHBar("obs-chart-dept",O.labels,O.data,"rgba(14,165,233,0.75)");const U=this._groupBy(o,"shift");this._drawHBar("obs-chart-shift",U.labels,U.data,"rgba(249,115,22,0.75)"),this._drawCloseTimeByType("obs-chart-closetime",o);const I=o.filter(T=>(T.riskLevel==="\u0639\u0627\u0644\u064A"||T.riskLevel==="\u0639\u0627\u0644\u064A\u0629")&&T.status!=="\u0645\u063A\u0644\u0642").sort((T,E)=>(E.overdays||0)-(T.overdays||0)).slice(0,20),L=document.getElementById("obs-critical-tbody"),P=document.getElementById("obs-critical-count");P&&(P.textContent=`${I.length} \u0645\u0644\u0627\u062D\u0638\u0629`),L&&(I.length===0?L.innerHTML='<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u0641\u062A\u0648\u062D\u0629</td></tr>':L.innerHTML=I.map((T,E)=>{const j=T.overdays||0,R=j>30?"#ef4444":j>14?"#f59e0b":"#64748b",Y={\u0645\u0641\u062A\u0648\u062D:"background:#fef3c7;color:#92400e;",\u062C\u0627\u0631\u064A:"background:#ede9fe;color:#5b21b6;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#ede9fe;color:#5b21b6;",\u062C\u062F\u064A\u062F:"background:#dbeafe;color:#1e40af;"}[T.status]||"background:#f1f5f9;color:#374151;",J=E%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${J};" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='${J}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;white-space:nowrap;">${Utils.escapeHTML(T.isoCode||T.id||"\u2014")}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${T.date?new Date(T.date).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(T.observationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(T.locationName||T.siteName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(T.observerName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(T.responsibleDepartment||"\u2014")}</td>
                        <td style="padding:9px 12px;"><span style="padding:3px 8px;border-radius:20px;font-size:0.7rem;font-weight:700;${Y}">${Utils.escapeHTML(T.status||"\u2014")}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${R};">${j>0?j+" \u064A\u0648\u0645":"\u2014"}</td>
                    </tr>`}).join(""))},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",i.crossOrigin="anonymous";let a=!1;const s=()=>{!a&&typeof Chart<"u"&&(a=!0,t(!0))},o=()=>{if(a)return;const n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",n.crossOrigin="anonymous";let r=!1;n.onload=()=>{!r&&typeof Chart<"u"&&(r=!0,a=!0,t(!0))},n.onerror=()=>{a||(a=!0,t(!1))},document.head.appendChild(n)};i.onload=()=>{setTimeout(()=>{!a&&typeof Chart<"u"?(a=!0,t(!0)):a||o()},500)},i.onerror=o,setTimeout(()=>{a||(a=!0,t(typeof Chart<"u"))},8e3);try{document&&document.head?document.head.appendChild(i):t(!1)}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 script Chart.js:",n),t(!1)}})},loadInfoCards(){const e=document.getElementById("info-cards-container");if(!e)return;const t=JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]");if(t.length===0){const a=[{id:"card_1",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",icon:"fas fa-clipboard-list",color:"blue",description:"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645",enabled:!0},{id:"card_2",title:"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",icon:"fas fa-folder-open",color:"orange",description:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u064A \u0644\u0645 \u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0628\u0639\u062F",enabled:!0},{id:"card_3",title:"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0630\u0627\u062A \u0645\u0633\u062A\u0648\u0649 \u062E\u0637\u0648\u0631\u0629 \u0639\u0627\u0644\u064A",enabled:!0}];return localStorage.setItem("dailyObservations_infoCards",JSON.stringify(a)),this.loadInfoCards()}const i=t.filter(a=>a.enabled);if(i.length===0){e.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}e.innerHTML=i.map(a=>{const s={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"},o=s[a.color]||s.blue,n=a.color||"blue";return`
                <div class="content-card border-2 ${o}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <i class="${a.icon||"fas fa-info-circle"} text-${n}-600 text-xl"></i>
                            <h4 class="font-semibold">${Utils.escapeHTML(a.title)}</h4>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(a.description||"")}</p>
                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <div id="card-value-${a.id}" class="text-2xl font-bold text-${n}-700">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            `}).join(""),this.calculateCardValues()},calculateCardValues(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(s=>this.normalizeRecord(s));JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]").filter(s=>s.enabled).forEach(s=>{const o=document.getElementById(`card-value-${s.id}`);if(!o)return;let n=0;switch(s.id){case"card_1":n=t.length;break;case"card_2":n=t.filter(r=>r.status==="\u0645\u0641\u062A\u0648\u062D"||r.status==="\u062C\u0627\u0631\u064A").length;break;case"card_3":n=t.filter(r=>r.riskLevel==="\u0639\u0627\u0644\u064A").length;break;default:s.field&&(n=t.filter(r=>{const c=r[s.field];return s.fieldValue?c===s.fieldValue:c&&c!==""&&c!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}).length)}o.textContent=n.toLocaleString("en-US")})},showManageCardsModal(){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const e=JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]"),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <button id="add-new-card-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u062A \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                    <div id="cards-list-container" class="space-y-3">
                        ${e.map((a,s)=>this.renderCardEditForm(a,s)).join("")}
                    </div>
                    ${e.length===0?'<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A. \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 "\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u062A \u062C\u062F\u064A\u062F" \u0644\u0625\u0646\u0634\u0627\u0621 \u0643\u0631\u062A.</p>':""}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" id="save-cards-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t);const i=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",i),t.querySelector('[data-action="close"]')?.addEventListener("click",i),t.addEventListener("click",a=>{a.target===t&&i()}),t.querySelector("#add-new-card-btn")?.addEventListener("click",()=>{const a={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,field:"",fieldValue:""};e.push(a);const s=t.querySelector("#cards-list-container");s.innerHTML=e.map((o,n)=>this.renderCardEditForm(o,n)).join(""),this.bindCardEditEvents(t)}),t.querySelector("#save-cards-btn")?.addEventListener("click",()=>{const a=[];t.querySelectorAll(".card-edit-form").forEach((s,o)=>{const n={id:s.getAttribute("data-card-id"),title:s.querySelector(".card-title-input")?.value||"",icon:s.querySelector(".card-icon-input")?.value||"fas fa-info-circle",color:s.querySelector(".card-color-input")?.value||"blue",description:s.querySelector(".card-description-input")?.value||"",enabled:s.querySelector(".card-enabled-input")?.checked||!1,field:s.querySelector(".card-field-input")?.value||"",fieldValue:s.querySelector(".card-field-value-input")?.value||""};a.push(n)}),localStorage.setItem("dailyObservations_infoCards",JSON.stringify(a)),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D"),i(),this.loadInfoCards(),this.updateAnalysisResults()}),this.bindCardEditEvents(t)},renderCardEditForm(e,t){const i=["blue","green","red","orange","purple","yellow"],a=["fas fa-info-circle","fas fa-chart-line","fas fa-chart-bar","fas fa-chart-pie","fas fa-exclamation-triangle","fas fa-check-circle","fas fa-times-circle","fas fa-clipboard-list","fas fa-folder-open","fas fa-flag","fas fa-bell"];return`
            <div class="card-edit-form border rounded-lg p-4 bg-gray-50" data-card-id="${e.id}">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 *</label>
                        <input type="text" class="form-input card-title-input" value="${Utils.escapeHTML(e.title||"")}" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0643\u0631\u062A">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>
                        <input type="text" class="form-input card-icon-input" value="${Utils.escapeHTML(e.icon||"fas fa-info-circle")}" placeholder="fas fa-icon">
                        <p class="text-xs text-gray-500 mt-1">\u0627\u0633\u062A\u062E\u062F\u0645 \u0623\u064A\u0642\u0648\u0646\u0629 Font Awesome</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">\u0627\u0644\u0644\u0648\u0646</label>
                        <select class="form-input card-color-input">
                            ${i.map(s=>`<option value="${s}" ${e.color===s?"selected":""}>${s}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">\u0627\u0644\u062D\u0642\u0644 \u0644\u0644\u062A\u062D\u0644\u064A\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <input type="text" class="form-input card-field-input" value="${Utils.escapeHTML(e.field||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062D\u0642\u0644 (\u0645\u062B\u0644: status, riskLevel)">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                        <textarea class="form-input card-description-input" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0643\u0631\u062A">${Utils.escapeHTML(e.description||"")}</textarea>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input type="checkbox" class="card-enabled-input mr-2" ${e.enabled?"checked":""}>
                            <span class="text-sm">\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0643\u0631\u062A</span>
                        </label>
                    </div>
                    <div class="flex justify-end">
                        <button class="btn-icon btn-icon-danger remove-card-btn" data-card-id="${e.id}" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `},bindCardEditEvents(e){e.querySelectorAll(".remove-card-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&e.querySelector(`.card-edit-form[data-card-id="${i}"]`)?.remove()})})},async loadDataAnalysis(){await this.updateAnalysisResults()},renderAnalysisCharts(){},_getRiskCategoryConfigStorageKey(){return"dailyObs_riskCategoryConfig"},_ensureRiskCategoryConfig(){const e={customCategories:[],observationTypeMap:{},customObservationTypes:[]};if(this._riskCategoryConfigCache)return this._riskCategoryConfigCache;let t=null;try{AppState?.appData?.dailyObsRiskConfig&&typeof AppState.appData.dailyObsRiskConfig=="object"&&(t=AppState.appData.dailyObsRiskConfig)}catch{}if(!t)try{t=JSON.parse(localStorage.getItem(this._getRiskCategoryConfigStorageKey())||"null")}catch{t=null}return this._riskCategoryConfigCache={...e,...t||{}},AppState.appData||(AppState.appData={}),AppState.appData.dailyObsRiskConfig=this._riskCategoryConfigCache,this._riskCategoryConfigCache},_saveRiskCategoryConfig(e){this._riskCategoryConfigCache=e,AppState.appData||(AppState.appData={}),AppState.appData.dailyObsRiskConfig=e;try{localStorage.setItem(this._getRiskCategoryConfigStorageKey(),JSON.stringify(e))}catch{}},_getDefaultObservationTypeRiskMap(){return{"\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629":"behavioral","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644":"housekeeping","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629":"tools_hand","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A":"mechanical","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644":"environmental","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649":"general"}},_getObservationTypeRiskMap(){const e=this._ensureRiskCategoryConfig();return{...this._getDefaultObservationTypeRiskMap(),...e.observationTypeMap||{}}},_getBuiltinTopRiskCategoryDefs(){return[{id:"electricity",labelKey:"module.dailyobs.top10.category.electricity",icon:"fa-bolt",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",keywords:["\u0643\u0647\u0631\u0628\u0627\u0621","\u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0643\u0627\u0628\u0644\u0627\u062A","\u0643\u0627\u0628\u0644","\u0623\u0633\u0644\u0627\u0643","\u0633\u0644\u0643","\u0644\u0648\u062D\u0629 \u0643\u0647\u0631\u0628","\u0642\u0627\u0637\u0639","\u062C\u0647\u062F","\u062A\u0645\u062F\u064A\u062F\u0627\u062A","\u0645\u0641\u0627\u062A\u064A\u062D","\u0642\u0635\u0648\u0631 \u0639\u0632\u0644","\u0627\u0631\u062A\u062C\u0627\u062C","electric","electrical","cable","wiring","voltage","panel","breaker"]},{id:"mechanical",labelKey:"module.dailyobs.top10.category.mechanical",icon:"fa-cogs",color:"#4f46e5",bg:"#eef2ff",border:"#a5b4fc",keywords:["\u0645\u064A\u0643\u0627\u0646\u064A\u0643","\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0629","\u0622\u0644\u0629","\u0627\u0644\u0622\u0644\u0627\u062A","\u0645\u0639\u062F\u0627\u062A","\u0645\u0639\u062F\u0629","\u062A\u0631\u0633","\u0633\u0648\u0641\u062A\u064A","\u062D\u0645\u0627\u064A\u0629 \u0645\u0627\u0643\u064A\u0646\u0629","guarding","\u0635\u064A\u0627\u0646\u0629","\u062A\u0634\u062D\u064A\u0645","\u0627\u0647\u062A\u0632\u0627\u0632","mechanical","machine","equipment","conveyor","guard","loto","pinch"]},{id:"smoking",labelKey:"module.dailyobs.top10.category.smoking",icon:"fa-smoking-ban",color:"#dc2626",bg:"#fef2f2",border:"#fca5a5",keywords:["\u062A\u062F\u062E\u064A\u0646","\u0633\u064A\u062C\u0627\u0631\u0629","\u0633\u062C\u0627\u0626\u0631","\u062F\u062E\u0627\u0646","smoking","cigarette","tobacco","vape","no smoking"]},{id:"ppe",labelKey:"module.dailyobs.top10.category.ppe",icon:"fa-hard-hat",color:"#0891b2",bg:"#ecfeff",border:"#67e8f9",keywords:["\u0645\u0647\u0645\u0627\u062A","\u0648\u0642\u0627\u064A\u0629","\u062E\u0648\u0630\u0629","\u0642\u0641\u0627\u0632","\u0646\u0638\u0627\u0631\u0627\u062A","\u062D\u0630\u0627\u0621","\u0633\u062A\u0631\u0629","\u062D\u0632\u0627\u0645","ppe","helmet","gloves","goggles","harness","respirator","ear plug","\u0648\u0627\u0642\u064A"]},{id:"storage",labelKey:"module.dailyobs.top10.category.storage",icon:"fa-warehouse",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",keywords:["\u062A\u062E\u0632\u064A\u0646","\u0645\u0633\u062A\u0648\u062F\u0639","\u0631\u0641","\u0623\u0631\u0641\u0641","\u062A\u062D\u0645\u064A\u0644","\u062A\u0643\u062F\u0633","\u0645\u0645\u0631","\u0639\u0627\u0626\u0642","\u0645\u0648\u0627\u062F","storage","warehouse","stacking","aisle","blocking","material handling","\u0631\u0627\u0641\u0639\u0629"]},{id:"fire",labelKey:"module.dailyobs.top10.category.fire",icon:"fa-fire-extinguisher",color:"#b91c1c",bg:"#fff1f2",border:"#fda4af",keywords:["\u062D\u0631\u064A\u0642","\u0637\u0641\u0627\u064A\u0629","\u0637\u0641\u0627\u064A\u0627\u062A","\u0625\u0646\u0630\u0627\u0631","\u0627\u0646\u0630\u0627\u0631","\u062E\u0631\u0637\u0648\u0645","\u0631\u0634\u0627\u0634","sprinkler","\u0625\u0637\u0641\u0627\u0621","fire","extinguisher","alarm","hose","smoke detector","fm200"]},{id:"behavioral",labelKey:"module.dailyobs.top10.category.behavioral",icon:"fa-user-shield",color:"#7c3aed",bg:"#f5f3ff",border:"#c4b5fd",keywords:["\u0633\u0644\u0648\u0643","\u0633\u0644\u0648\u0643\u064A\u0629","\u062A\u0635\u0631\u0641","unsafe act","behavior","conduct","shortcut","bypass"]},{id:"chemical",labelKey:"module.dailyobs.top10.category.chemical",icon:"fa-flask",color:"#9333ea",bg:"#faf5ff",border:"#d8b4fe",keywords:["\u0643\u064A\u0645\u064A\u0627\u0626\u064A","\u0643\u064A\u0645\u064A\u0627\u0621","\u0645\u0630\u064A\u0628","\u062D\u0645\u0636","\u0642\u0644\u0648\u064A","\u0633\u0627\u0626\u0644","msds","chemical","solvent","acid","hazmat","spill"]},{id:"height",labelKey:"module.dailyobs.top10.category.height",icon:"fa-person-falling",color:"#ea580c",bg:"#fff7ed",border:"#fdba74",keywords:["\u0627\u0631\u062A\u0641\u0627\u0639","\u0633\u0642\u0627\u0644\u0629","\u0633\u0644\u0645","\u062D\u0628\u0644","\u0633\u0642\u0648\u0637","working at height","scaffold","ladder","fall","harness","roof"]},{id:"confined_space",labelKey:"module.dailyobs.top10.category.confined_space",icon:"fa-dungeon",color:"#57534e",bg:"#fafaf9",border:"#d6d3d1",keywords:["\u0645\u062D\u0635\u0648\u0631","\u062E\u0632\u0627\u0646","\u0628\u0626\u0631","confined","tank","manhole","entry permit"]},{id:"housekeeping",labelKey:"module.dailyobs.top10.category.housekeeping",icon:"fa-broom",color:"#0d9488",bg:"#f0fdfa",border:"#5eead4",keywords:["\u0646\u0638\u0627\u0641\u0629","\u062A\u0631\u062A\u064A\u0628","\u0641\u0648\u0636\u0649","\u0645\u0645\u0631","housekeeping","clutter","walkway","order","5s"]},{id:"ergonomics",labelKey:"module.dailyobs.top10.category.ergonomics",icon:"fa-chair",color:"#6366f1",bg:"#eef2ff",border:"#a5b4fc",keywords:["\u0623\u0631\u062C\u0648\u0646\u0648\u0645\u0643\u0633","\u0648\u0636\u0639\u064A\u0629","\u0638\u0647\u0631","\u062A\u0643\u0631\u0627\u0631","ergonomic","posture","repetitive","manual handling"]},{id:"traffic",labelKey:"module.dailyobs.top10.category.traffic",icon:"fa-truck",color:"#ca8a04",bg:"#fefce8",border:"#fde047",keywords:["\u0645\u0631\u0648\u0631","\u0645\u0631\u0643\u0628\u0629","\u0633\u064A\u0627\u0631\u0629","\u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","forklift","vehicle","traffic","pedestrian","route"]},{id:"lifting",labelKey:"module.dailyobs.top10.category.lifting",icon:"fa-dolly",color:"#b45309",bg:"#fffbeb",border:"#fcd34d",keywords:["\u0631\u0641\u0639","\u062D\u0645\u0644","\u0645\u0646\u0627\u0648\u0644\u0629","\u0648\u0632\u0646","lifting","manual handling","load","crane","rigging"]},{id:"hot_work",labelKey:"module.dailyobs.top10.category.hot_work",icon:"fa-fire",color:"#c2410c",bg:"#fff7ed",border:"#fdba74",keywords:["\u0644\u062D\u0627\u0645","\u0642\u0637\u0639","\u0634\u0631\u0631","\u0639\u0645\u0644 \u0633\u0627\u062E\u0646","welding","hot work","grinding","spark"]},{id:"environmental",labelKey:"module.dailyobs.top10.category.environmental",icon:"fa-leaf",color:"#16a34a",bg:"#f0fdf4",border:"#86efac",keywords:["\u0628\u064A\u0626\u0629","\u062A\u0644\u0648\u062B","\u0646\u0641\u0627\u064A\u0627\u062A","\u0625\u0636\u0627\u0621\u0629","\u062A\u0647\u0648\u064A\u0629","environment","waste","ventilation","lighting","temperature"]},{id:"tools_hand",labelKey:"module.dailyobs.top10.category.tools_hand",icon:"fa-screwdriver-wrench",color:"#475569",bg:"#f8fafc",border:"#cbd5e1",keywords:["\u0623\u062F\u0627\u0629","\u0623\u062F\u0648\u0627\u062A","\u0645\u0641\u062A\u0627\u062D","\u0645\u0637\u0631\u0642\u0629","\u0645\u0646\u0634\u0627\u0631","tool","hand tool","power tool"]},{id:"slips_trips",labelKey:"module.dailyobs.top10.category.slips_trips",icon:"fa-shoe-prints",color:"#0284c7",bg:"#f0f9ff",border:"#7dd3fc",keywords:["\u062A\u0632\u062D\u0644\u0642","\u0633\u0642\u0648\u0637","\u0631\u0637\u0648\u0628\u0629","\u0632\u064A\u062A","slip","trip","fall","wet floor"]},{id:"noise",labelKey:"module.dailyobs.top10.category.noise",icon:"fa-volume-high",color:"#be185d",bg:"#fdf2f8",border:"#f9a8d4",keywords:["\u0636\u0648\u0636\u0627\u0621","\u0635\u0648\u062A","\u0633\u0645\u0639","noise","hearing","decibel","ear protection"]}]},getTopRiskCategoryDefs(){const e=this._getBuiltinTopRiskCategoryDefs(),t=(this._ensureRiskCategoryConfig().customCategories||[]).filter(a=>a&&a.id),i=[...e];return t.forEach(a=>{i.some(s=>s.id===a.id)||i.push({id:a.id,label:a.label,icon:a.icon||"fa-tag",color:a.color||"#64748b",bg:a.bg||"#f8fafc",border:a.border||"#cbd5e1",keywords:Array.isArray(a.keywords)?a.keywords:[],isCustom:!0})}),i.map(a=>({...a,label:a.isCustom?a.label||a.id:this._t(a.labelKey,a.id)}))},_normalizeTopRiskCategoryFilter(e){const t=String(e||"").trim();if(!t)return"";const i=this.getTopRiskCategoryDefs();if(i.some(o=>o.id===t))return t;const a=i.find(o=>o.label===t);return a?a.id:{\u0639\u0627\u0645:"general",\u0643\u0647\u0631\u0628\u0627\u0621:"electricity",\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0629:"mechanical",\u062A\u062F\u062E\u064A\u0646:"smoking","\u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629":"ppe",\u062A\u062E\u0632\u064A\u0646:"storage","\u0623\u062C\u0647\u0632\u0629 \u062D\u0631\u064A\u0642":"fire"}[t]||t},_getTopRiskCategoryLabel(e){return this._getTopRiskCategoryMeta(e).label},_normalizeTopRiskHaystack(e){return String(e||"").toLowerCase().replace(/[أإآ]/g,"\u0627").replace(/ى/g,"\u064A").replace(/ة/g,"\u0647")},_topRiskHaystackOf(e){return this._normalizeTopRiskHaystack([e?.observationType,e?.details,e?.correctiveAction,e?.remarks,e?.locationName,e?.siteName].filter(Boolean).join(" "))},_topRiskCategoryOf(e){const t=String(e?.observationType||"").trim();if(t){const n=this._getObservationTypeRiskMap()[t];if(n&&this.getTopRiskCategoryDefs().some(r=>r.id===n))return n}const i=this._topRiskHaystackOf(e);if(!i.trim())return"general";let a="general",s=0;return this.getTopRiskCategoryDefs().forEach(o=>{let n=0;(o.keywords||[]).forEach(r=>{const c=this._normalizeTopRiskHaystack(r);c&&i.includes(c)&&(n+=Math.max(1,Math.round(c.length/4)))}),n>s&&(s=n,a=o.id)}),a},_getTopRiskCategoryMeta(e){const t=this._normalizeTopRiskCategoryFilter(e)||String(e||"").trim(),a=this.getTopRiskCategoryDefs().find(s=>s.id===t);return a||(t==="general"?{id:"general",label:this._t("module.dailyobs.top10.category.general","\u0639\u0627\u0645"),icon:"fa-exclamation-circle",color:"#64748b",bg:"#f8fafc",border:"#cbd5e1"}:{id:e,label:e||this._t("module.dailyobs.top10.category.general","\u0639\u0627\u0645"),icon:"fa-exclamation-circle",color:"#64748b",bg:"#f8fafc",border:"#cbd5e1"})},_computeObservationRiskScore(e){let t=0;this._execIsCritical(e)?t+=45:this._execIsHighRisk(e)?t+=35:String(e.riskLevel||"").includes("\u0645\u062A\u0648\u0633\u0637")?t+=18:(String(e.riskLevel||"").includes("\u0645\u0646\u062E\u0641\u0636")||String(e.riskLevel||"").includes("\u0628\u0633\u064A\u0637"))&&(t+=6);const i=String(e.status||"");if(i.includes("\u0645\u0641\u062A\u0648\u062D")||i.includes("\u062C\u062F\u064A\u062F")?t+=22:i.includes("\u062C\u0627\u0631\u064A")?t+=12:i.includes("\u0645\u063A\u0644\u0642")&&(t-=18),this._execIsOverdue(e)){const a=Number(e.overdays)||0;t+=Math.min(a>0?a*2:12,30)}if(e.attachments&&e.attachments.length>0&&(t+=Math.min(e.attachments.length*2,8)),e.date){const a=new Date(e.date),s=Math.floor((Date.now()-a.getTime())/(1e3*60*60*24));s<=7?t+=8:s<=30&&(t+=4)}return this._execIsClosed(e)&&(t=Math.round(t*.25)),Math.max(0,Math.round(t))},_buildTopRiskCategoryStats(e){const t={};return this.getTopRiskCategoryDefs().forEach(i=>{t[i.id]={count:0,openHigh:0,maxScore:0}}),t.general={count:0,openHigh:0,maxScore:0},(e||[]).forEach(i=>{const a=i.riskCategoryId||this._topRiskCategoryOf(i);t[a]||(t[a]={count:0,openHigh:0,maxScore:0}),t[a].count+=1;const s=i.riskScore!=null?i.riskScore:this._computeObservationRiskScore(i);s>t[a].maxScore&&(t[a].maxScore=s),!this._execIsClosed(i)&&(this._execIsHighRisk(i)||this._execIsCritical(i))&&(t[a].openHigh+=1)}),t},_bindTopRiskCategoryCards(){document.querySelectorAll(".top-risk-cat-card").forEach(i=>{i.dataset.bound!=="1"&&(i.dataset.bound="1",i.addEventListener("click",()=>{const a=i.getAttribute("data-cat-id")||"";this._topRiskCategoryFilter=this._topRiskCategoryFilter===a?"":a,this.loadTop10Observations()}))});const t=document.getElementById("top-risk-clear-filter-btn");t&&t.dataset.bound!=="1"&&(t.dataset.bound="1",t.addEventListener("click",()=>{this._topRiskCategoryFilter="",this.loadTop10Observations()}))},_injectTop10Styles(){if(document.getElementById("top10-module-styles-v1"))return;const e=document.createElement("style");e.id="top10-module-styles-v1",e.textContent=`
        .top10-wrap{direction:rtl;width:100%;max-width:100%;box-sizing:border-box;}
        .top10-hero{position:relative;overflow:hidden;border-radius:18px;padding:22px 24px;margin-bottom:18px;
            background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 45%,#7f1d1d 100%);color:#fff;box-shadow:0 12px 40px rgba(15,23,42,.22);}
        .top10-hero__badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;
            background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);font-size:11px;font-weight:800;letter-spacing:.12em;}
        .top10-hero__title{font-size:clamp(1.5rem,3vw,2.1rem);font-weight:900;margin:12px 0 8px;line-height:1.15;}
        .top10-hero__sub{font-size:clamp(.85rem,1.8vw,.95rem);opacity:.88;max-width:720px;line-height:1.55;}
        .top10-hero__actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;}
        .top10-kpi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:18px;}
        @media(min-width:768px){.top10-kpi-grid{grid-template-columns:repeat(4,minmax(0,1fr));}}
        .top10-kpi{background:var(--card-bg);border:1px solid var(--border-color);border-radius:14px;padding:14px 16px;box-shadow:var(--shadow-sm);min-width:0;}
        .top10-kpi__label{font-size:11px;font-weight:700;color:var(--text-secondary);margin-bottom:6px;}
        .top10-kpi__value{font-size:clamp(1.2rem,2.2vw,1.65rem);font-weight:800;color:var(--text-primary);}
        .top10-kpi__value--danger{color:#dc2626;}
        .top10-kpi__value--warn{color:#ea580c;}
        .top10-charts-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;margin-bottom:20px;}
        @media(min-width:768px){.top10-charts-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
        .top10-chart-card{background:var(--card-bg);border:1px solid var(--border-color);border-radius:14px;padding:14px 16px;box-shadow:var(--shadow-sm);min-width:0;}
        .top10-chart-card__title{font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:4px;display:flex;align-items:center;gap:8px;}
        .top10-chart-card__hint{font-size:10px;color:var(--text-tertiary);margin-bottom:10px;}
        .top10-chart-box{position:relative;height:clamp(200px,28vw,260px);width:100%;}
        .top10-cat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-height:420px;overflow-y:auto;padding-inline-end:4px;}
        @media(min-width:768px){.top10-cat-grid{grid-template-columns:repeat(3,minmax(0,1fr));}}
        @media(min-width:1200px){.top10-cat-grid{grid-template-columns:repeat(4,minmax(0,1fr));}}
        .top-risk-cat-card{text-align:right;padding:12px 14px;border-radius:12px;cursor:pointer;transition:all .2s;border:2px solid transparent;background:#fff;}
        .top-risk-cat-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.08);}
        .top10-table-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
        .top10-mobile-cards{display:none;flex-direction:column;gap:12px;}
        @media(max-width:767px){
            .top10-table-wrap{display:none;}
            .top10-mobile-cards{display:flex;}
        }
        .top10-mobile-card{border:1px solid var(--border-color);border-radius:14px;padding:14px;background:var(--card-bg);box-shadow:var(--shadow-sm);}
        .top10-mobile-card__head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;}
        .top10-mobile-card__rank{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800;background:#f1f5f9;color:#0f172a;}
        .top10-score-pill{font-weight:800;font-size:1.1rem;}
        .top10-section-title{font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:10px;display:flex;align-items:center;gap:8px;}
        #tab-top-10-observations{width:100%;max-width:100%;box-sizing:border-box;}
        `,document.head.appendChild(e)},_destroyTop10BuiltInCharts(){this.top10BuiltInCharts&&(Object.values(this.top10BuiltInCharts).forEach(e=>{try{e&&typeof e.destroy=="function"&&e.destroy()}catch{}}),this.top10BuiltInCharts={})},async _drawTop10BuiltInCharts(e,t){if(!await this.ensureChartJSLoaded()||typeof Chart>"u")return;this._destroyTop10BuiltInCharts(),this.top10BuiltInCharts||(this.top10BuiltInCharts={});const a=this.getTranslations().isRTL,s=this.getTopRiskCategoryDefs(),o=[...s.map(m=>m.id),"general"],n=o.map(m=>this._getTopRiskCategoryLabel(m)),r=[...s.map(m=>m.color),"#64748b"],c=o.map(m=>(e||[]).filter(u=>(u.riskCategoryId||this._topRiskCategoryOf(u))===m).length),d=document.getElementById("top10-builtin-chart-categories");if(d){const m=this;this.top10BuiltInCharts.categories=new Chart(d,{type:"doughnut",data:{labels:n,datasets:[{data:c,backgroundColor:r.map(u=>u+"cc"),borderColor:"#fff",borderWidth:2,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,onClick(u,v){if(!v.length)return;const g=o[v[0].index];m._topRiskCategoryFilter=m._topRiskCategoryFilter===g?"":g,m.loadTop10Observations()},plugins:{legend:{position:"bottom",rtl:a,labels:{boxWidth:12,font:{size:11}}},tooltip:{rtl:a}}}})}const l=document.getElementById("top10-builtin-chart-scores");if(l&&t.length){const m=t.map(y=>this.getObservationTypeLabel(y.observationType)),u=m.map(y=>y.length>32?`${y.slice(0,30)}\u2026`:y),v=t.map(y=>y.riskScore),g=v.map(y=>y>=55?"#dc2626":y>=35?"#ea580c":"#2563eb"),x=t.map(y=>y.isoCode||"");this.top10BuiltInCharts.scores=new Chart(l,{type:"bar",data:{labels:u,datasets:[{label:this._t("module.dailyobs.top10.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),data:v,backgroundColor:g,borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{rtl:a,callbacks:{title(y){const k=y[0]?.dataIndex??0;return m[k]||""},label(y){const k=y.dataIndex,$=x[k]?` (${x[k]})`:"";return`${y.parsed.x} \u2014 ${m[k]||""}${$}`}}}},scales:{x:{beginAtZero:!0,max:100}}}})}const p=document.getElementById("top10-builtin-chart-risklevel");if(p&&t.length){const m={};t.forEach(u=>{const v=u.riskLevel||this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");m[v]=(m[v]||0)+1}),this.top10BuiltInCharts.riskLevel=new Chart(p,{type:"pie",data:{labels:Object.keys(m),datasets:[{data:Object.values(m),backgroundColor:["#dc2626","#ea580c","#eab308","#22c55e","#64748b"],borderWidth:2,borderColor:"#fff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:a},tooltip:{rtl:a}}}})}const f=document.getElementById("top10-builtin-chart-status");if(f&&t.length){const m=t.filter(v=>!this._execIsClosed(v)).length,u=t.length-m;this.top10BuiltInCharts.status=new Chart(f,{type:"doughnut",data:{labels:[this._t("module.dailyobs.top10.chart.statusOpen","\u0645\u0641\u062A\u0648\u062D\u0629"),this._t("module.dailyobs.top10.chart.statusClosed","\u0645\u063A\u0644\u0642\u0629")],datasets:[{data:[m,u],backgroundColor:["#f59e0b","#10b981"],borderWidth:2,borderColor:"#fff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:a},tooltip:{rtl:a}}}})}},async renderTop10Observations(){return this._injectTop10Styles(),this.ensureChartJSLoaded().catch(()=>{Utils.safeWarn("Chart.js \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629")}),`
            <div class="top10-wrap" id="top10-module-root">
                <div class="top10-hero">
                    <div class="top10-hero__badge">
                        <i class="fas fa-ranking-star"></i>
                        <span data-i18n="module.dailyobs.top10.brand">TOP 10</span>
                    </div>
                    <div class="top10-hero__title" data-i18n="module.dailyobs.top10.title">Top 10</div>
                    <p class="top10-hero__sub" data-i18n="module.dailyobs.top10.subtitle">\u062A\u0631\u062A\u064A\u0628 \u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0627\u062A \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A\u0629 \u0645\u0639 \u062A\u062D\u0644\u064A\u0644 \u0628\u0635\u0631\u064A \u062A\u0641\u0627\u0639\u0644\u064A \u0648\u0631\u0628\u0637 \u0645\u0628\u0627\u0634\u0631 \u0628\u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                    <div class="top10-hero__actions">
                        <button id="export-top10-pdf-hero-btn" class="btn-secondary" style="background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.35); color: #fff; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fas fa-file-pdf text-red-400"></i>
                            <span data-i18n="module.dailyobs.top10.btn.exportPdf">\u062A\u0635\u062F\u064A\u0631 PDF</span>
                        </button>
                        ${this.canDailyObservationsFullAdminUi()?`
                        <button id="manage-top10-categories-btn" class="btn-primary" style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);">
                            <i class="fas fa-layer-group ml-2"></i>
                            <span data-i18n="module.dailyobs.top10.btn.manageCategories">\u0625\u062F\u0627\u0631\u0629 \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631</span>
                        </button>
                        `:""}
                        <button id="add-top10-chart-btn" class="btn-primary" style="background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);">
                            <i class="fas fa-plus ml-2"></i>
                            <span data-i18n="module.dailyobs.top10.btn.addChart">\u0625\u0636\u0627\u0641\u0629 \u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A</span>
                        </button>
                    </div>
                </div>

                <div id="top10-kpi-row" class="top10-kpi-grid"></div>

                <div class="top10-charts-grid" id="top10-builtin-charts">
                    <div class="top10-chart-card">
                        <div class="top10-chart-card__title"><i class="fas fa-chart-pie text-amber-600"></i><span data-i18n="module.dailyobs.top10.chart.categories">\u062A\u0648\u0632\u064A\u0639 \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631</span></div>
                        <div class="top10-chart-card__hint" data-i18n="module.dailyobs.top10.chart.clickHint">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0642\u0637\u0639\u0629 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629</div>
                        <div class="top10-chart-box"><canvas id="top10-builtin-chart-categories"></canvas></div>
                    </div>
                    <div class="top10-chart-card">
                        <div class="top10-chart-card__title"><i class="fas fa-chart-bar text-blue-600"></i><span data-i18n="module.dailyobs.top10.chart.scores">\u062F\u0631\u062C\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u2014 Top 10</span></div>
                        <div class="top10-chart-box"><canvas id="top10-builtin-chart-scores"></canvas></div>
                    </div>
                    <div class="top10-chart-card">
                        <div class="top10-chart-card__title"><i class="fas fa-triangle-exclamation text-red-600"></i><span data-i18n="module.dailyobs.top10.chart.riskLevel">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (Top 10)</span></div>
                        <div class="top10-chart-box"><canvas id="top10-builtin-chart-risklevel"></canvas></div>
                    </div>
                    <div class="top10-chart-card">
                        <div class="top10-chart-card__title"><i class="fas fa-circle-half-stroke text-emerald-600"></i><span data-i18n="module.dailyobs.top10.chart.status">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (Top 10)</span></div>
                        <div class="top10-chart-box"><canvas id="top10-builtin-chart-status"></canvas></div>
                    </div>
                </div>

                <div id="top10-observations-list" class="mb-6">
                    <div class="flex items-center justify-center py-8">
                        <div class="text-center">
                            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                            <p class="text-gray-500" data-i18n="module.dailyobs.top10.loading">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631...</p>
                        </div>
                    </div>
                </div>

                <div class="border-t pt-6 mt-2">
                    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h3 class="top10-section-title">
                            <i class="fas fa-chart-line text-blue-600"></i>
                            <span data-i18n="module.dailyobs.top10.charts.custom">\u062A\u062D\u0644\u064A\u0644 \u0628\u0635\u0631\u064A \u0625\u0636\u0627\u0641\u064A</span>
                        </h3>
                        <button id="manage-top10-charts-btn" class="btn-secondary">
                            <i class="fas fa-cog ml-2"></i>
                            <span data-i18n="module.dailyobs.top10.btn.manageCharts">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</span>
                        </button>
                    </div>
                    <div id="top10-charts-container" class="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
                </div>
            </div>
        `},async loadTop10Observations(){const e=document.getElementById("top10-observations-list"),t=document.getElementById("top10-kpi-row");if(!e)return;this._topRiskCategoryFilter=this._normalizeTopRiskCategoryFilter(this._topRiskCategoryFilter);const i=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(i.length===0){t&&(t.innerHTML=""),e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-inbox text-gray-300 text-6xl mb-4"></i>
                    <p class="text-gray-500 text-lg mb-2">${Utils.escapeHTML(this._t("module.dailyobs.top10.empty.none","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0633\u062C\u0644\u0629"))}</p>
                    <p class="text-sm text-gray-400">${Utils.escapeHTML(this._t("module.dailyobs.top10.empty.noneHint","\u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0644\u0639\u0631\u0636 \u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</p>
                </div>
            `,this._destroyTop10BuiltInCharts();return}const a=i.map(y=>{const k=this.normalizeRecord(y),$=this._topRiskCategoryOf(k),h=this._getTopRiskCategoryLabel($),b=this._computeObservationRiskScore(k);return{...k,riskCategoryId:$,riskCategory:h,riskScore:b}}),s=this._buildTopRiskCategoryStats(a),o=String(this._topRiskCategoryFilter||"").trim();let n=a.slice();o&&(n=n.filter(y=>y.riskCategoryId===o)),n.sort((y,k)=>k.riskScore-y.riskScore);const r=n.slice(0,10),c=a.filter(y=>!this._execIsClosed(y)&&(this._execIsCritical(y)||this._execIsHighRisk(y))).length,d=r.length?Math.round(r.reduce((y,k)=>y+k.riskScore,0)/r.length):0;t&&(t.innerHTML=`
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</div>
                    <div class="top10-kpi__value">${a.length}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.criticalOpen","\u062D\u0631\u062C\u0629/\u0639\u0627\u0644\u064A\u0629 \u0645\u0641\u062A\u0648\u062D\u0629"))}</div>
                    <div class="top10-kpi__value top10-kpi__value--danger">${c}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.avgScore","\u0645\u062A\u0648\u0633\u0637 \u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</div>
                    <div class="top10-kpi__value top10-kpi__value--warn">${d}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.inRanking","\u0641\u064A \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0627\u0644\u064A"))}</div>
                    <div class="top10-kpi__value">${r.length}</div>
                </div>
            `);const l=this._t("module.dailyobs.top10.categories.openHigh","{n} \u0639\u0627\u0644\u064A\u0629 \u0645\u0641\u062A\u0648\u062D\u0629"),p=this.getTopRiskCategoryDefs().map(y=>{const k=s[y.id]||{count:0,openHigh:0},$=o===y.id,h=l.replace("{n}",String(k.openHigh));return`
                <button type="button" class="top-risk-cat-card" data-cat-id="${Utils.escapeHTML(y.id)}"
                    style="border-color:${$?y.color:y.border};background:${$?y.bg:"#fff"};
                    box-shadow:${$?"0 4px 14px rgba(0,0,0,.08)":"none"};">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
                        <span style="font-size:11px;font-weight:700;color:${y.color};background:${y.bg};padding:3px 8px;border-radius:999px;">${Utils.escapeHTML(h)}</span>
                        <i class="fas ${y.icon}" style="color:${y.color};font-size:1.1rem;"></i>
                    </div>
                    <div style="font-weight:800;font-size:1rem;color:#0f172a;margin-bottom:4px;">${Utils.escapeHTML(y.label)}</div>
                    <div style="font-size:1.35rem;font-weight:800;color:${y.color};">${k.count}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px;">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</div>
                </button>
            `}).join(""),f=o?this._getTopRiskCategoryLabel(o):"",m=o?`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding:10px 12px;border-radius:10px;background:#eff6ff;border:1px solid #bfdbfe;">
                    <span style="font-size:0.88rem;color:#1e40af;"><i class="fas fa-filter ml-2"></i>${Utils.escapeHTML(this._tf("module.dailyobs.top10.filter.active",{category:f},`\u0639\u0631\u0636 \u0645\u062E\u0627\u0637\u0631 \u0641\u0626\u0629: ${f}`))}</span>
                    <button type="button" id="top-risk-clear-filter-btn" class="btn-secondary" style="padding:4px 10px;font-size:0.8rem;">${Utils.escapeHTML(this._t("module.dailyobs.top10.filter.clear","\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0641\u0644\u062A\u0631"))}</button>
               </div>`:"",u=this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),v=this._t("module.dailyobs.common.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"),g=o?`${this._t("module.dailyobs.top10.ranking.title","\u0642\u0627\u0626\u0645\u0629 Top 10")} \u2014 ${f}`:this._t("module.dailyobs.top10.ranking.title","\u0642\u0627\u0626\u0645\u0629 Top 10");e.innerHTML=`
            <div class="mb-5">
                <h3 class="top10-section-title">
                    <i class="fas fa-layer-group text-slate-600"></i>
                    ${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.title","\u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"))}
                </h3>
                <div class="top10-cat-grid mb-2" id="top-risk-category-cards">
                    ${p}
                </div>
                <p class="text-xs text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.hint","\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u0641\u0626\u0629 \u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0642\u0627\u0626\u0645\u0629"))}</p>
            </div>
            ${m}
            <div class="mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 class="top10-section-title mb-1">
                        <i class="fas fa-ranking-star text-red-500"></i>
                        ${Utils.escapeHTML(g)}
                    </h3>
                    <p class="text-sm text-gray-500 mb-0">${Utils.escapeHTML(this._t("module.dailyobs.top10.ranking.subtitle","\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u062D\u0633\u0628 \u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0627\u0644\u0642\u0635\u0648\u0649"))}</p>
                </div>
                <button id="export-top10-table-pdf-btn" class="btn-secondary" style="padding: 7px 14px; font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                    <i class="fas fa-file-pdf text-red-500"></i>
                    <span>\u062A\u0635\u062F\u064A\u0631 PDF</span>
                </button>
            </div>
            ${r.length===0?`
                <div class="empty-state">
                    <i class="fas fa-check-circle text-green-400 text-4xl mb-3"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.top10.empty.noMatch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"))}</p>
                </div>
            `:`
            <div class="top10-table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.rank","#"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.category","\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.code","\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.location","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.riskLevel","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.score","\u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</th>
                            <th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.map((y,k)=>{const $=this._getTopRiskCategoryMeta(y.riskCategoryId),h=y.riskScore>=55?"#dc2626":y.riskScore>=35?"#ea580c":"#2563eb";return`
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td><span class="font-bold text-gray-700">${k+1}</span></td>
                                <td>
                                    <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${$.color};background:${$.bg};border:1px solid ${$.border};">
                                        <i class="fas ${$.icon}"></i>${Utils.escapeHTML(y.riskCategory||u)}
                                    </span>
                                </td>
                                <td>
                                    <span class="font-medium text-blue-600 cursor-pointer hover:underline" onclick="DailyObservations.viewObservation('${y.id}')">
                                        ${Utils.escapeHTML(y.isoCode||u)}
                                    </span>
                                </td>
                                <td>
                                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(y.siteName||"-")}</div>
                                    <div class="text-xs text-gray-500">${Utils.escapeHTML(y.locationName||"")}</div>
                                </td>
                                <td>${Utils.escapeHTML(this.getObservationTypeLabel(y.observationType))}</td>
                                <td>
                                    <span class="badge badge-${this.getRiskBadgeClass(y.riskLevel)}">
                                        ${Utils.escapeHTML(y.riskLevel||"-")}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${this.getStatusBadgeClass(y.status)}">
                                        ${Utils.escapeHTML(y.status||"-")}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-lg" style="color:${h};">${y.riskScore}</span>
                                        <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div class="h-full" style="width:${Math.min(y.riskScore,100)}%;background:${h};"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button onclick="DailyObservations.viewObservation('${y.id}')"
                                            class="btn-icon btn-icon-primary" title="${Utils.escapeHTML(v)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>`}).join("")}
                    </tbody>
                </table>
            </div>
            <div class="top10-mobile-cards">
                ${r.map((y,k)=>{const $=this._getTopRiskCategoryMeta(y.riskCategoryId),h=y.riskScore>=55?"#dc2626":y.riskScore>=35?"#ea580c":"#2563eb";return`
                    <div class="top10-mobile-card">
                        <div class="top10-mobile-card__head">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div class="top10-mobile-card__rank">${k+1}</div>
                                <div>
                                    <div class="font-bold text-blue-600" onclick="DailyObservations.viewObservation('${y.id}')" style="cursor:pointer;">${Utils.escapeHTML(y.isoCode||u)}</div>
                                    <div class="text-xs text-gray-500">${Utils.escapeHTML(y.siteName||"-")}</div>
                                </div>
                            </div>
                            <div class="top10-score-pill" style="color:${h};">${y.riskScore}</div>
                        </div>
                        <div style="margin-bottom:8px;">
                            <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${$.color};background:${$.bg};border:1px solid ${$.border};">
                                <i class="fas ${$.icon}"></i>${Utils.escapeHTML(y.riskCategory)}
                            </span>
                        </div>
                        <div class="text-sm text-gray-700 mb-2">${Utils.escapeHTML(this.getObservationTypeLabel(y.observationType))}</div>
                        <div class="flex gap-2 flex-wrap">
                            <span class="badge badge-${this.getRiskBadgeClass(y.riskLevel)}">${Utils.escapeHTML(y.riskLevel||"-")}</span>
                            <span class="badge badge-${this.getStatusBadgeClass(y.status)}">${Utils.escapeHTML(y.status||"-")}</span>
                        </div>
                    </div>`}).join("")}
            </div>`}
        `,this._drawTop10BuiltInCharts(a,r),this.loadTop10Charts(a,r),this._bindTopRiskCategoryCards();const x=document.getElementById("top10-module-root");x&&this.applyModuleI18n(x),setTimeout(()=>{const y=document.getElementById("export-top10-pdf-hero-btn");y&&y.dataset.bound!=="1"&&(y.dataset.bound="1",y.addEventListener("click",()=>this.exportTop10PDF()));const k=document.getElementById("export-top10-ppt-hero-btn");k&&k.dataset.bound!=="1"&&(k.dataset.bound="1",k.addEventListener("click",()=>this.exportTop10PptReport()));const $=document.getElementById("export-top10-table-pdf-btn");$&&$.dataset.bound!=="1"&&($.dataset.bound="1",$.addEventListener("click",()=>this.exportTop10PDF()));const h=document.getElementById("export-top10-table-ppt-btn");h&&h.dataset.bound!=="1"&&(h.dataset.bound="1",h.addEventListener("click",()=>this.exportTop10PptReport()));const b=document.getElementById("manage-top10-categories-btn");b&&b.dataset.bound!=="1"&&(b.dataset.bound="1",b.addEventListener("click",()=>this.showManageTop10RiskCategoriesModal()));const C=document.getElementById("add-top10-chart-btn");C&&C.dataset.bound!=="1"&&(C.dataset.bound="1",C.addEventListener("click",()=>this.showAddTop10ChartModal()));const O=document.getElementById("manage-top10-charts-btn");O&&O.dataset.bound!=="1"&&(O.dataset.bound="1",O.addEventListener("click",()=>this.showManageTop10ChartsModal()))},100)},async loadTop10Charts(e,t){const i=document.getElementById("top10-charts-container");if(!i)return;const a="dailyObservations_top10RiskCharts";let s=[];try{if(s=JSON.parse(localStorage.getItem(a)||"[]"),!Array.isArray(s)||s.length===0){const r=JSON.parse(localStorage.getItem("dailyObservations_top10Charts")||"[]");Array.isArray(r)&&r.length>0&&r.some(c=>String(c.title||"").includes("\u0623\u0641\u0636\u0644 10"))&&(s=[])}}catch{s=[]}s.length===0&&(s=[{id:"chart_risk_category_distribution",type:"doughnut",title:this._t("module.dailyobs.top10.chart.categories","\u062A\u0648\u0632\u064A\u0639 \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631"),field:"riskCategory",enabled:!0,useAllData:!0},{id:"chart_risk_level_top10",type:"bar",title:this._t("module.dailyobs.top10.chart.riskLevel","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (Top 10)"),field:"riskLevel",enabled:!0},{id:"chart_status_top10",type:"pie",title:this._t("module.dailyobs.top10.chart.status","\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (Top 10)"),field:"status",enabled:!0},{id:"chart_site_risk",type:"bar",title:this._t("module.dailyobs.top10.chart.siteRisk","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639"),field:"siteName",enabled:!1,useAllData:!0}],localStorage.setItem(a,JSON.stringify(s)));const o=s.filter(r=>r.enabled);if(o.length===0){i.innerHTML=`
                <div class="col-span-2">
                    <div class="empty-state">
                        <i class="fas fa-chart-bar text-gray-300 text-4xl mb-4"></i>
                        <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.top10.chart.emptyEnabled","\u0644\u0627 \u062A\u0648\u062C\u062F \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629 \u0645\u0641\u0639\u0644\u0629"))}</p>
                        <button onclick="DailyObservations.showAddTop10ChartModal()" class="btn-primary mt-4">
                            <i class="fas fa-plus ml-2"></i>
                            ${Utils.escapeHTML(this._t("module.dailyobs.top10.btn.addChart","\u0625\u0636\u0627\u0641\u0629 \u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A"))}
                        </button>
                    </div>
                </div>
            `;return}let n="";o.forEach((r,c)=>{const d=`top10-chart-${r.id}-${c}`,l=`top10-chart-container-${r.id}-${c}`;n+=`
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h4 class="font-semibold text-lg">
                                <i class="fas fa-chart-${r.type==="doughnut"||r.type==="pie"?"pie":"bar"} ml-2"></i>
                                ${Utils.escapeHTML(r.title)}
                            </h4>
                            <div class="flex items-center gap-2">
                                <button onclick="DailyObservations.editTop10Chart('${r.id}')" 
                                        class="btn-icon btn-icon-secondary" title="${Utils.escapeHTML(this._t("module.dailyobs.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="DailyObservations.deleteTop10Chart('${r.id}')" 
                                        class="btn-icon btn-icon-danger" title="${Utils.escapeHTML(this._t("module.dailyobs.common.delete","\u062D\u0630\u0641"))}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="${l}" style="position: relative; height: 300px;">
                            <canvas id="${d}"></canvas>
                        </div>
                    </div>
                </div>
            `}),i.innerHTML=n,setTimeout(async()=>{await this.ensureChartJSLoaded()&&typeof Chart<"u"&&this.renderTop10Charts(o,t,e)},300)},renderTop10Charts(e,t,i){typeof Chart>"u"||(this.top10Charts&&Object.values(this.top10Charts).forEach(a=>{a&&typeof a.destroy=="function"&&a.destroy()}),this.top10Charts={},e.forEach((a,s)=>{const o=`top10-chart-${a.id}-${s}`,n=document.getElementById(o);if(!n)return;const r=this.analyzeTop10ChartData(a,t,i),c={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0},tooltip:{rtl:!0,callbacks:{label:function(l){const p=l.label||"",f=l.parsed||l.parsed.y||0,m=l.dataset.data.reduce((v,g)=>v+g,0),u=m>0?(f/m*100).toFixed(1):0;return`${p}: ${f} (${u}%)`}}}}};let d;a.type==="doughnut"||a.type==="pie"?d=new Chart(n,{type:a.type,data:{labels:r.labels,datasets:[{data:r.values,backgroundColor:["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#84cc16","#f97316","#6366f1"],borderWidth:2,borderColor:"#ffffff"}]},options:c}):a.type==="bar"?d=new Chart(n,{type:"bar",data:{labels:r.labels,datasets:[{label:a.title,data:r.values,backgroundColor:"#3b82f6",borderColor:"#2563eb",borderWidth:1}]},options:{...c,scales:{y:{beginAtZero:!0}}}}):a.type==="line"&&(d=new Chart(n,{type:"line",data:{labels:r.labels,datasets:[{label:a.title,data:r.values,borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4,fill:!0}]},options:c})),d&&(this.top10Charts[a.id]=d)}))},analyzeTop10ChartData(e,t,i){const a=e.field,o=(e.useAllData===!0?i:t)||[],n={};o.forEach(c=>{let d=this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");if(a==="riskCategory"){const l=c.riskCategoryId||this._topRiskCategoryOf(c);d=this._getTopRiskCategoryLabel(l)}else a==="observationType"?d=this.getObservationTypeLabel(c.observationType):d=c[a]||d;n[d]=(n[d]||0)+1});const r=Object.entries(n).sort((c,d)=>d[1]-c[1]).slice(0,10);return{labels:r.map(([c])=>c),values:r.map(([,c])=>c)}},showManageTop10RiskCategoriesModal(){if(!this.canDailyObservationsFullAdminUi()){Notification.error(this._t("module.dailyobs.common.unauthorized","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D"));return}const e=this._ensureRiskCategoryConfig(),t=this.getTopRiskCategoryDefs(),i=this.getObservationTypes(),a=this._getObservationTypeRiskMap(),s=t.map(l=>`<option value="${Utils.escapeHTML(l.id)}">${Utils.escapeHTML(l.label)}</option>`).join(""),o=i.map(l=>{const p=a[l]||"";return`
                <tr>
                    <td style="padding:8px 10px;font-weight:600;">${Utils.escapeHTML(this.getObservationTypeLabel(l))}</td>
                    <td style="padding:8px 10px;">
                        <select class="form-input obs-risk-type-map" data-obs-type="${Utils.escapeHTML(l)}" style="min-width:180px;">
                            <option value="">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.unassigned","\u063A\u064A\u0631 \u0645\u064F\u0639\u064A\u0651\u064E\u0646"))}</option>
                            ${t.map(f=>`<option value="${Utils.escapeHTML(f.id)}" ${p===f.id?"selected":""}>${Utils.escapeHTML(f.label)}</option>`).join("")}
                        </select>
                    </td>
                </tr>`}).join(""),n=(e.customCategories||[]).map((l,p)=>`
            <tr data-custom-idx="${p}">
                <td style="padding:8px 10px;">${Utils.escapeHTML(l.label||l.id)}</td>
                <td style="padding:8px 10px;font-size:12px;color:#64748b;">${Utils.escapeHTML((l.keywords||[]).join("\u060C "))}</td>
                <td style="padding:8px 10px;">
                    <button type="button" class="btn-icon btn-icon-danger obs-risk-del-cat" data-idx="${p}" title="${Utils.escapeHTML(this._t("module.dailyobs.common.delete","\u062D\u0630\u0641"))}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("")||'<tr><td colspan="3" style="padding:12px;text-align:center;color:#94a3b8;">\u2014</td></tr>',r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width:820px;max-height:90vh;overflow:auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-layer-group ml-2"></i>
                        <span data-i18n="module.dailyobs.top10.categories.manageTitle">\u0625\u062F\u0627\u0631\u0629 \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0631\u0628\u0637 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                    </h2>
                    <button class="modal-close" type="button"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="display:flex;flex-direction:column;gap:20px;">
                    <section>
                        <h3 style="font-weight:700;margin-bottom:8px;">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.mapHint","\u0627\u0631\u0628\u0637 \u0643\u0644 \u0646\u0648\u0639 \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644 \u0628\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629"))}</h3>
                        <div style="overflow-x:auto;">
                            <table class="data-table" style="min-width:420px;">
                                <thead><tr><th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"))}</th><th>${Utils.escapeHTML(this._t("module.dailyobs.top10.table.category","\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</th></tr></thead>
                                <tbody>${o}</tbody>
                            </table>
                        </div>
                    </section>
                    <section style="border-top:1px solid var(--border-color);padding-top:16px;">
                        <h3 style="font-weight:700;margin-bottom:10px;">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.addType","\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u0644\u0627\u062D\u0638\u0629"))}</h3>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            <input type="text" id="obs-risk-new-type" class="form-input" placeholder="${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.typeName","\u0627\u0633\u0645 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"))}" style="flex:1;min-width:200px;">
                            <select id="obs-risk-new-type-cat" class="form-input" style="min-width:180px;">${s}</select>
                            <button type="button" id="obs-risk-add-type-btn" class="btn-secondary"><i class="fas fa-plus ml-1"></i>${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.addType","\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u0644\u0627\u062D\u0638\u0629"))}</button>
                        </div>
                    </section>
                    <section style="border-top:1px solid var(--border-color);padding-top:16px;">
                        <h3 style="font-weight:700;margin-bottom:10px;">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.customList","\u0627\u0644\u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629"))}</h3>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
                            <input type="text" id="obs-risk-new-cat-label" class="form-input" placeholder="${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.label","\u0627\u0633\u0645 \u0627\u0644\u0641\u0626\u0629"))}">
                            <input type="text" id="obs-risk-new-cat-keywords" class="form-input" placeholder="${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.keywords","\u0643\u0644\u0645\u0627\u062A \u0645\u0641\u062A\u0627\u062D\u064A\u0629"))}">
                        </div>
                        <button type="button" id="obs-risk-add-cat-btn" class="btn-secondary mb-3"><i class="fas fa-plus ml-1"></i>${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.addCategory","\u0625\u0636\u0627\u0641\u0629 \u0641\u0626\u0629 \u0645\u062E\u0635\u0635\u0629"))}</button>
                        <div style="overflow-x:auto;">
                            <table class="data-table" style="min-width:360px;">
                                <thead><tr><th>${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.label","\u0627\u0633\u0645 \u0627\u0644\u0641\u0626\u0629"))}</th><th>${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.keywords","\u0643\u0644\u0645\u0627\u062A \u0645\u0641\u062A\u0627\u062D\u064A\u0629"))}</th><th></th></tr></thead>
                                <tbody id="obs-risk-custom-cats-tbody">${n}</tbody>
                            </table>
                        </div>
                        <p style="font-size:12px;color:#64748b;margin-top:8px;">${Utils.escapeHTML(this._tf("module.dailyobs.top10.categories.builtinSummary",{builtin:t.filter(l=>!l.isCustom).length,custom:(e.customCategories||[]).length},""))}</p>
                    </section>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary obs-risk-modal-cancel">${Utils.escapeHTML(this._t("module.dailyobs.btn.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="obs-risk-save-config-btn" class="btn-primary"><i class="fas fa-save ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.btn.save","\u062D\u0641\u0638"))}</button>
                </div>
            </div>
        `,document.body.appendChild(r),this.applyModuleI18n(r);const c=()=>r.remove();r.querySelector(".modal-close")?.addEventListener("click",c),r.querySelector(".obs-risk-modal-cancel")?.addEventListener("click",c),r.addEventListener("click",l=>{l.target===r&&c()});const d=JSON.parse(JSON.stringify(e));r.querySelector("#obs-risk-add-type-btn")?.addEventListener("click",()=>{const l=String(r.querySelector("#obs-risk-new-type")?.value||"").trim(),p=String(r.querySelector("#obs-risk-new-type-cat")?.value||"").trim();l&&(d.customObservationTypes.includes(l)||d.customObservationTypes.push(l),p&&(d.observationTypeMap[l]=p),this._saveRiskCategoryConfig(d),c(),this.showManageTop10RiskCategoriesModal())}),r.querySelector("#obs-risk-add-cat-btn")?.addEventListener("click",()=>{const l=String(r.querySelector("#obs-risk-new-cat-label")?.value||"").trim(),p=String(r.querySelector("#obs-risk-new-cat-keywords")?.value||"").trim();if(!l)return;const f=`custom_${Date.now()}`,m=p?p.split(/[,،]/).map(g=>g.trim()).filter(Boolean):[],u=[{color:"#0f766e",bg:"#f0fdfa",border:"#5eead4"},{color:"#be123c",bg:"#fff1f2",border:"#fda4af"},{color:"#4338ca",bg:"#eef2ff",border:"#a5b4fc"}],v=u[(d.customCategories||[]).length%u.length];d.customCategories=d.customCategories||[],d.customCategories.push({id:f,label:l,icon:"fa-tag",...v,keywords:m}),this._saveRiskCategoryConfig(d),c(),this.showManageTop10RiskCategoriesModal()}),r.querySelectorAll(".obs-risk-del-cat").forEach(l=>{l.addEventListener("click",()=>{const p=Number(l.getAttribute("data-idx"));if(!confirm(this._t("module.dailyobs.top10.categories.deleteConfirm","\u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u0635\u0635\u0629\u061F")))return;const f=d.customCategories.splice(p,1)[0];f?.id&&Object.keys(d.observationTypeMap||{}).forEach(m=>{d.observationTypeMap[m]===f.id&&delete d.observationTypeMap[m]}),this._saveRiskCategoryConfig(d),c(),this.showManageTop10RiskCategoriesModal()})}),r.querySelector("#obs-risk-save-config-btn")?.addEventListener("click",()=>{const l={...d.observationTypeMap||{}};r.querySelectorAll(".obs-risk-type-map").forEach(p=>{const f=p.getAttribute("data-obs-type"),m=String(p.value||"").trim();f&&(m?l[f]=m:delete l[f])}),d.observationTypeMap=l,this._saveRiskCategoryConfig(d),this._riskCategoryConfigCache=null,Notification.success(this._t("module.dailyobs.top10.categories.saved","\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631")),c(),this.loadTop10Observations()})},showAddTop10ChartModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-plus ml-2"></i>
                        <span data-i18n="module.dailyobs.top10.chart.modal.addTitle">\u0625\u0636\u0627\u0641\u0629 \u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A \u062C\u062F\u064A\u062F</span>
                    </h2>
                    <button class="modal-close" type="button"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.titleLabel">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</label>
                            <input type="text" id="top10-chart-title" class="form-input" data-i18n-placeholder="module.dailyobs.top10.chart.modal.titlePlaceholder" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062E\u0637\u0648\u0631\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.typeLabel">\u0646\u0648\u0639 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</label>
                            <select id="top10-chart-type" class="form-input">${this._renderTop10ChartTypeOptions("doughnut")}</select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.fieldLabel">\u0627\u0644\u062D\u0642\u0644 \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u062D\u0644\u064A\u0644\u0647</label>
                            <select id="top10-chart-field" class="form-input">${this._renderTop10ChartFieldOptions("riskCategory")}</select>
                        </div>
                        <div>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="top10-chart-use-all-data" class="form-checkbox">
                                <span class="text-sm text-gray-700" data-i18n="module.dailyobs.top10.chart.modal.useAllData">\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary obs-top10-modal-cancel">${Utils.escapeHTML(this._t("module.dailyobs.btn.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button id="save-top10-chart-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        ${Utils.escapeHTML(this._t("module.dailyobs.btn.save","\u062D\u0641\u0638"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e),this.applyModuleI18n(e);const t=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",t),e.querySelector(".obs-top10-modal-cancel")?.addEventListener("click",t),document.getElementById("save-top10-chart-btn").addEventListener("click",()=>{const a=document.getElementById("top10-chart-title").value.trim(),s=document.getElementById("top10-chart-type").value,o=document.getElementById("top10-chart-field").value,n=document.getElementById("top10-chart-use-all-data").checked;if(!a){Notification.error(this._t("module.dailyobs.notify.chartTitleRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0644\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A"));return}const r=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),c={id:`chart_${Date.now()}`,type:s,title:a,field:o,useAllData:n,enabled:!0};r.push(c),localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(r)),e.remove(),Notification.success(this._t("module.dailyobs.notify.chartAdded","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0628\u0646\u062C\u0627\u062D")),this.loadTop10Observations()})},showManageTop10ChartsModal(){const e=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        <span data-i18n="module.dailyobs.top10.chart.modal.manageTitle">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</span>
                    </h2>
                    <button class="modal-close" type="button"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="space-y-2 max-h-96 overflow-y-auto">
                        ${e.length===0?`
                            <div class="empty-state py-8">
                                <p class="text-gray-500" data-i18n="module.dailyobs.top10.chart.empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629 \u0645\u062D\u0641\u0648\u0638\u0629</p>
                            </div>
                        `:e.map(a=>`
                            <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                <div class="flex items-center gap-3 flex-1">
                                    <input type="checkbox" 
                                           class="form-checkbox top10-chart-enable" 
                                           data-chart-id="${a.id}"
                                           ${a.enabled?"checked":""}>
                                    <div class="flex-1">
                                        <div class="font-semibold">${Utils.escapeHTML(a.title)}</div>
                                        <div class="text-sm text-gray-500">
                                            ${Utils.escapeHTML(this._tf("module.dailyobs.top10.chart.meta",{type:this._getTop10ChartTypeLabel(a.type),field:this._getTop10ChartFieldLabel(a.field)},""))}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button type="button" data-edit-id="${Utils.escapeHTML(a.id)}" 
                                            class="btn-icon btn-icon-secondary obs-top10-edit-chart" title="${Utils.escapeHTML(this._t("module.dailyobs.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" data-del-id="${Utils.escapeHTML(a.id)}" 
                                            class="btn-icon btn-icon-danger obs-top10-del-chart" title="${Utils.escapeHTML(this._t("module.dailyobs.common.delete","\u062D\u0630\u0641"))}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary obs-top10-manage-close">${Utils.escapeHTML(this._t("module.dailyobs.common.close","\u0625\u063A\u0644\u0627\u0642"))}</button>
                </div>
            </div>
        `,document.body.appendChild(t),this.applyModuleI18n(t);const i=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",i),t.querySelector(".obs-top10-manage-close")?.addEventListener("click",i),t.querySelectorAll(".obs-top10-edit-chart").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-edit-id");i(),this.editTop10Chart(s)})}),t.querySelectorAll(".obs-top10-del-chart").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-del-id");this.deleteTop10Chart(s),i()})}),t.querySelectorAll(".top10-chart-enable").forEach(a=>{a.addEventListener("change",s=>{const o=s.target.getAttribute("data-chart-id"),n=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),r=n.find(c=>c.id===o);r&&(r.enabled=s.target.checked,localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(n)),this.loadTop10Observations())})})},editTop10Chart(e){const i=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]").find(n=>n.id===e);if(!i)return;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        <span data-i18n="module.dailyobs.top10.chart.modal.editTitle">\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</span>
                    </h2>
                    <button class="modal-close" type="button"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.titleLabel">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</label>
                            <input type="text" id="edit-top10-chart-title" class="form-input" value="${Utils.escapeHTML(i.title)}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.typeLabel">\u0646\u0648\u0639 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</label>
                            <select id="edit-top10-chart-type" class="form-input">${this._renderTop10ChartTypeOptions(i.type)}</select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="module.dailyobs.top10.chart.modal.fieldLabel">\u0627\u0644\u062D\u0642\u0644 \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u062D\u0644\u064A\u0644\u0647</label>
                            <select id="edit-top10-chart-field" class="form-input">${this._renderTop10ChartFieldOptions(i.field)}</select>
                        </div>
                        <div>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="edit-top10-chart-use-all-data" class="form-checkbox" ${i.useAllData?"checked":""}>
                                <span class="text-sm text-gray-700" data-i18n="module.dailyobs.top10.chart.modal.useAllData">\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary obs-top10-edit-cancel">${Utils.escapeHTML(this._t("module.dailyobs.btn.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button id="update-top10-chart-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        ${Utils.escapeHTML(this._t("module.dailyobs.btn.save","\u062D\u0641\u0638"))}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a);const s=()=>a.remove();a.querySelector(".modal-close")?.addEventListener("click",s),a.querySelector(".obs-top10-edit-cancel")?.addEventListener("click",s),document.getElementById("update-top10-chart-btn").addEventListener("click",()=>{const n=document.getElementById("edit-top10-chart-title").value.trim(),r=document.getElementById("edit-top10-chart-type").value,c=document.getElementById("edit-top10-chart-field").value,d=document.getElementById("edit-top10-chart-use-all-data").checked;if(!n){Notification.error(this._t("module.dailyobs.notify.chartTitleRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0644\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A"));return}const l=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),p=l.findIndex(f=>f.id===e);p!==-1&&(l[p]={...l[p],title:n,type:r,field:c,useAllData:d},localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(l)),s(),Notification.success(this._t("module.dailyobs.notify.chartUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0628\u0646\u062C\u0627\u062D")),this.loadTop10Observations())})},deleteTop10Chart(e){if(!confirm(this._t("module.dailyobs.notify.chartDeleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u061F")))return;const i=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]").filter(a=>a.id!==e);localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(i)),Notification.success(this._t("module.dailyobs.notify.chartDeleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A")),this.loadTop10Observations()},analyzeByItem(e,t){const i={};let a=0;return t.forEach(s=>{let o="";switch(e){case"observationType":case"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":o=s.observationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"riskLevel":case"\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":case"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":o=s.riskLevel||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"status":case"\u0627\u0644\u062D\u0627\u0644\u0629":o=s.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"shift":case"\u0627\u0644\u0648\u0631\u062F\u064A\u0629":o=s.shift||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"site":case"siteName":case"\u0627\u0644\u0645\u0648\u0642\u0639":o=s.siteName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"responsibleDepartment":case"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630":case"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629":o=s.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"observerName":case"\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":o=s.observerName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"locationName":case"\u0627\u0644\u0645\u0643\u0627\u0646":case"\u0627\u0644\u0645\u0648\u0642\u0639 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639":o=s.locationName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;default:if(s[e]!==void 0&&s[e]!==null&&s[e]!=="")o=String(s[e]);else{const n=e.toLowerCase().replace(/\s+/g,""),c=Object.keys(s).find(d=>d.toLowerCase().replace(/\s+/g,"")===n);o=c&&s[c]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}}o=String(o).trim(),(!o||o===""||o==="null"||o==="undefined")&&(o="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),i[o]=(i[o]||0)+1,a++}),Object.entries(i).map(([s,o])=>({label:s,count:o,percentage:a>0?(o/a*100).toFixed(1):"0.0"})).sort((s,o)=>o.count-s.count)},async addAnalysisItem(){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("new-analysis-item");if(!e)return;const t=e.value.trim();if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]");if(i.some(s=>s.label.toLowerCase()===t.toLowerCase())){Notification.warning("\u064A\u0648\u062C\u062F \u0628\u0646\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B");return}const a=`custom_${Date.now()}`;i.push({id:a,label:t,enabled:!0}),localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),e.value="",await this.loadDataAnalysis(),await this.updateAnalysisResults(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},toggleAnalysisItem(e,t){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]"),a=i.find(s=>s.id===e);a&&(a.enabled=t,localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),this.updateAnalysisResults())},removeAnalysisItem(e){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]").filter(a=>a.id!==e);localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),this.loadDataAnalysis(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},getFilters(){return{search:(document.getElementById("observation-search")?.value||"").toLowerCase(),site:document.getElementById("observation-filter-site")?.value||"",location:document.getElementById("observation-filter-location")?.value||"",type:document.getElementById("observation-filter-type")?.value||"",shift:document.getElementById("observation-filter-shift")?.value||"",risk:document.getElementById("observation-filter-risk")?.value||"",status:document.getElementById("observation-filter-status")?.value||"",observer:document.getElementById("observation-filter-observer")?.value||"",responsible:document.getElementById("observation-filter-responsible")?.value||"",dateFrom:document.getElementById("observation-date-from")?.value||"",dateTo:document.getElementById("observation-date-to")?.value||""}},updateFilterBadges(e,t,i){const a=(o,n,r)=>{const c=document.getElementById(o);if(!c)return;const d=c.closest(".filter-field");if(!d)return;const l=d.querySelector(".filter-label");if(!l)return;const p=l.querySelector(".filter-count-badge");if(p&&p.remove(),n&&n.trim()!==""){const f=document.createElement("span");f.className="filter-count-badge",f.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",f.textContent=r;const m=l.querySelector("i");m?m.insertAdjacentElement("afterend",f):l.insertBefore(f,l.firstChild)}},s=(o,n)=>{if(!n||n.trim()==="")return 0;const r={...i};return r[o]=n,this.filterItems(e,r).length};a("observation-filter-site",i.site,s("site",i.site)),a("observation-filter-location",i.location,s("location",i.location)),a("observation-filter-type",i.type,s("type",i.type)),a("observation-filter-shift",i.shift,s("shift",i.shift)),a("observation-filter-risk",i.risk,s("risk",i.risk)),a("observation-filter-status",i.status,s("status",i.status)),a("observation-filter-observer",i.observer,s("observer",i.observer)),a("observation-filter-responsible",i.responsible,s("responsible",i.responsible))},filterItems(e,t){const i=a=>{if(!a)return"";const s=String(a).trim();if(!s)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;const o=new Date(s);if(!Number.isNaN(o.getTime())){const r=o.getFullYear(),c=String(o.getMonth()+1).padStart(2,"0"),d=String(o.getDate()).padStart(2,"0");return`${r}-${c}-${d}`}const n=s.match(/(\d{4}-\d{2}-\d{2})/);return n?n[1]:""};return e.filter(a=>{const s=!t.search||(a.isoCode||"").toLowerCase().includes(t.search)||(a.siteName||"").toLowerCase().includes(t.search)||(a.locationName||"").toLowerCase().includes(t.search)||(a.observationType||"").toLowerCase().includes(t.search)||(a.observerName||"").toLowerCase().includes(t.search)||(a.responsibleDepartment||"").toLowerCase().includes(t.search)||(a.description||"").toLowerCase().includes(t.search),o=!t.site||String(a.siteName||"").trim()===String(t.site||"").trim(),n=!t.location||String(a.locationName||"").trim()===String(t.location||"").trim(),r=!t.type||String(a.observationType||"").trim()===String(t.type||"").trim(),c=!t.shift||String(a.shift||"").trim()===String(t.shift||"").trim(),d=!t.risk||String(a.riskLevel||"").trim()===String(t.risk||"").trim(),l=!t.status||String(a.status||"").trim()===String(t.status||"").trim(),p=!t.observer||String(a.observerName||"").trim()===String(t.observer||"").trim(),f=!t.responsible||String(a.responsibleDepartment||"").trim()===String(t.responsible||"").trim(),m=i(a.date),u=!t.dateFrom||!m||m>=i(t.dateFrom),v=!t.dateTo||!m||m<=i(t.dateTo);return s&&o&&n&&r&&c&&d&&l&&p&&f&&(u&&v)})},async loadObservationsList(){const e=document.getElementById("observations-table-container");if(!e){setTimeout(()=>this.loadObservationsList(),100);return}try{if(this.isCurrentUserAdmin&&typeof this.isCurrentUserAdmin=="function"&&this.isCurrentUserAdmin()){const p="hse_dobs_seq_repair_v"+(typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion):"unknown");typeof localStorage<"u"&&!localStorage.getItem(p)&&(localStorage.setItem(p,"running"),GoogleIntegration.sendRequest({action:"repairObservationSequence",data:{}}).then(async f=>{if(f&&f.success){const m=f.data||{};((m.renumberedCount||0)>0||(m.fixedIsoCodeCount||0)>0)&&Notification.success("\u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u062A\u0633\u0644\u0633\u0644 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: "+m.renumberedCount+" \u0645\u0639\u0627\u062F \u062A\u0631\u0642\u064A\u0645\u0647\u0627\u060C "+m.fixedIsoCodeCount+" \u062A\u0635\u062D\u064A\u062D isoCode")}try{typeof this.ensureDailyObservationsDataLoaded=="function"&&await this.ensureDailyObservationsDataLoaded({force:!0}).catch(()=>{}),typeof this.loadObservationsList=="function"&&this.loadObservationsList(),typeof this.renderStatsCards=="function"&&this.renderStatsCards()}catch(m){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D:",m)}localStorage.setItem(p,"done")}).catch(()=>{localStorage.setItem(p,"done")}))}}catch(l){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u0634\u063A\u064A\u0644 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062A\u0633\u0644\u0633\u0644:",l)}const t=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(this.updateFilterOptions(),this.renderStatsCards(),t.length===0){const{t:l,isRTL:p}=this.getTranslations();e.innerHTML=`<div class="empty-state" style="direction: ${p?"rtl":"ltr"}; text-align: ${p?"right":"left"};"><p class="text-gray-500">${Utils.escapeHTML(l("empty.noObservations"))}</p></div>`;return}const i={code:this._t("module.dailyobs.registry.table.code","\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),location:this._t("module.dailyobs.registry.table.location","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646"),datetime:this._t("module.dailyobs.registry.table.datetime","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A"),type:this._t("module.dailyobs.registry.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),shift:this._t("module.dailyobs.registry.table.shift","\u0627\u0644\u0648\u0631\u062F\u064A\u0629"),risk:this._t("module.dailyobs.registry.table.risk","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"),status:this._t("module.dailyobs.registry.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"),observer:this._t("module.dailyobs.registry.table.observer","\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),responsible:this._t("module.dailyobs.registry.table.responsible","\u0627\u0644\u0645\u0633\u0624\u0648\u0644"),attachments:this._t("module.dailyobs.registry.table.attachments","\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A"),actions:this._t("module.dailyobs.registry.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"),emptySearch:this._t("module.dailyobs.registry.emptySearch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0628\u062D\u062B"),view:this._t("module.dailyobs.common.view","\u0639\u0631\u0636")},a=l=>`
                <tr>
                    <td>${Utils.escapeHTML(l.isoCode||"")}</td>
                    <td>
                        <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(l.siteName||"-")}</div>
                        <div class="text-xs text-gray-500">${Utils.escapeHTML(l.locationName||"")}</div>
                    </td>
                    <td>${l.date?Utils.formatDateTime(l.date):"-"}</td>
                    <td>${Utils.escapeHTML(this.getObservationTypeLabel(l.observationType))}</td>
                    <td>${Utils.escapeHTML(l.shift||"-")}</td>
                    <td>
                        <span class="badge badge-${this.getRiskBadgeClass(l.riskLevel)}">${Utils.escapeHTML(l.riskLevel||"-")}</span>
                    </td>
                    <td>
                        <div>${Utils.escapeHTML(l.observerName||"-")}</div>
                        ${l.submittedBy==="\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645 (Public Form)"||String(l.remarks||"").includes("\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645")?'<span class="badge" style="background:#f3e8ff;color:#7e22ce;font-size:0.7rem;padding:2px 6px;border-radius:4px;font-weight:700;">\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645</span>':""}
                    </td>
                    <td>${this.formatResponsibleTableCell(l)}</td>
                    <td>${l.attachments&&l.attachments.length>0?`<i class="fas fa-paperclip text-blue-500" title="${Utils.escapeHTML(this._tf("module.dailyobs.registry.attachments.count",{n:l.attachments.length},`${l.attachments.length} \u0645\u0644\u0641`))}"></i>`:"-"}</td>
                    <td>
                        <button onclick="DailyObservations.viewObservation('${l.id}')" class="btn-icon btn-icon-primary" title="${Utils.escapeHTML(i.view)}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>`,s=l=>{if(!l)return 0;const p=String(l).match(/(\d+)$/);return p?parseInt(p[1],10):0},o=t.map(l=>this.normalizeRecord(l)).sort((l,p)=>{const f=s(l.isoCode),m=s(p.isoCode);return f-m}),n=this.getFilters(),r=this.filterItems(o,n);this.updateFilterBadges(o,r,n);const d=e.querySelector("table")?.querySelector("tbody");if(d){if(r.length===0){d.innerHTML=`
                    <tr>
                        <td colspan="11" style="text-align: center; padding: 40px;">
                            <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">${Utils.escapeHTML(i.emptySearch)}</p>
                        </td>
                    </tr>
                `;return}d.innerHTML=r.map(l=>a(l)).join("");return}e.innerHTML=`
            <div class="table-wrapper observations-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;" dir="rtl">
                <table class="data-table" style="font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                    <thead>
                        <tr>
                            <th>${Utils.escapeHTML(i.code)}</th>
                            <th>${Utils.escapeHTML(i.location)}</th>
                            <th>${Utils.escapeHTML(i.datetime)}</th>
                            <th>${Utils.escapeHTML(i.type)}</th>
                            <th>${Utils.escapeHTML(i.shift)}</th>
                            <th>${Utils.escapeHTML(i.risk)}</th>
                            <th>${Utils.escapeHTML(i.status)}</th>
                            <th>${Utils.escapeHTML(i.observer)}</th>
                            <th>${Utils.escapeHTML(i.responsible)}</th>
                            <th>${Utils.escapeHTML(i.attachments)}</th>
                            <th>${Utils.escapeHTML(i.actions)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.length===0?`
                            <tr>
                                <td colspan="11" style="text-align: center; padding: 40px;">
                                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                                    <p class="text-gray-500" style="font-family: 'Cairo', sans-serif;">${Utils.escapeHTML(i.emptySearch)}</p>
                                </td>
                            </tr>
                        `:r.map(l=>a(l)).join("")}
                    </tbody>
                </table>
            </div>
        `,setTimeout(()=>{const l=e.querySelector(".observations-table-wrapper");l&&this.setupTableScrollListeners(l)},100)},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-observation-btn");e&&(e.replaceWith(e.cloneNode(!0)),document.getElementById("add-observation-btn").addEventListener("click",()=>this.showForm()));const t=document.getElementById("export-observations-excel-btn");t&&(t.replaceWith(t.cloneNode(!0)),document.getElementById("export-observations-excel-btn").addEventListener("click",()=>this.showExportExcelModal()));const i=document.getElementById("export-observations-ppt-btn");i&&(i.replaceWith(i.cloneNode(!0)),document.getElementById("export-observations-ppt-btn").addEventListener("click",()=>this.showExportPptModal()));const a=document.getElementById("import-observations-excel-btn");a&&(a.replaceWith(a.cloneNode(!0)),document.getElementById("import-observations-excel-btn").addEventListener("click",()=>this.showImportExcelModal()));const s=document.getElementById("delete-all-observations-btn");s&&(s.replaceWith(s.cloneNode(!0)),document.getElementById("delete-all-observations-btn").addEventListener("click",()=>this.deleteAllObservations()));const o=document.getElementById("daily-observations-refresh-btn");o&&(o.replaceWith(o.cloneNode(!0)),document.getElementById("daily-observations-refresh-btn").addEventListener("click",()=>this.load()));const n=document.getElementById("observation-search");if(n){n.replaceWith(n.cloneNode(!0));const d=document.getElementById("observation-search");d.addEventListener("input",()=>{clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.loadObservationsList()},300)}),d.addEventListener("keypress",l=>{l.key==="Enter"&&(clearTimeout(this.searchTimeout),this.loadObservationsList())})}["observation-filter-site","observation-filter-location","observation-filter-type","observation-filter-shift","observation-filter-risk","observation-filter-status","observation-filter-observer","observation-filter-responsible"].forEach(d=>{const l=document.getElementById(d);l&&(l.replaceWith(l.cloneNode(!0)),document.getElementById(d).addEventListener("change",()=>{this.loadObservationsList()}))});const c=document.getElementById("obs-analytics-root");if(c){c.querySelectorAll(".obs-period-btn").forEach(u=>{u.addEventListener("click",()=>{this._analysisPeriod=u.getAttribute("data-period"),c.querySelectorAll(".obs-period-btn").forEach(v=>{const g=v===u;v.style.background=g?"#fff":"rgba(255,255,255,0.15)",v.style.color=g?"#1e40af":"#fff"}),this.updateAnalysisResults()})});const d=document.getElementById("obs-analytics-refresh");d&&d.addEventListener("click",()=>this.updateAnalysisResults());const l=document.getElementById("obs-toggle-filters-btn"),p=document.getElementById("obs-filter-panel");l&&p&&l.addEventListener("click",()=>{const u=p.style.display!=="none";p.style.display=u?"none":"block",l.style.background=u?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const f=document.getElementById("obs-filter-reset-btn");f&&f.addEventListener("click",()=>{["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(u=>{const v=document.getElementById(u);v&&(v.value="")}),this.updateAnalysisResults()}),["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(u=>{const v=document.getElementById(u);v&&v.addEventListener("change",()=>this.updateAnalysisResults())});const m=document.getElementById("obs-export-pdf-btn");m&&m.addEventListener("click",()=>this._exportAnalyticsPDF())}},200)},updateFilterOptions(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(L=>this.normalizeRecord(L)),i=[...new Set(t.map(L=>L.siteName).filter(Boolean))].sort(),a=document.getElementById("observation-filter-site")?.value||"",s=document.getElementById("observation-filter-location")?.value||"",o=a?t.filter(L=>String(L.siteName||"").trim()===String(a).trim()):t,n=[...new Set(o.map(L=>L.locationName).filter(Boolean))].sort(),r=[...new Set(t.map(L=>L.observationType).filter(Boolean))].sort(),c=[...new Set(t.map(L=>L.shift).filter(Boolean))].sort(),d=[...new Set(t.map(L=>L.riskLevel).filter(Boolean))].sort(),l=[...new Set(t.map(L=>L.status).filter(Boolean))].sort(),p=[...new Set(t.map(L=>L.observerName).filter(Boolean))].sort(),f=[...new Set(t.map(L=>L.responsibleDepartment).filter(Boolean))].sort(),m=document.getElementById("observation-filter-type")?.value||"",u=document.getElementById("observation-filter-shift")?.value||"",v=document.getElementById("observation-filter-risk")?.value||"",g=document.getElementById("observation-filter-status")?.value||"",x=document.getElementById("observation-filter-observer")?.value||"",y=document.getElementById("observation-filter-responsible")?.value||"",k=document.getElementById("observation-filter-site");k&&(k.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),a&&i.includes(a)&&(k.value=a));const $=document.getElementById("observation-filter-location");$&&($.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),s&&n.includes(s)?$.value=s:$.value="");const h=document.getElementById("observation-filter-type");h&&(h.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+r.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),m&&r.includes(m)&&(h.value=m));const b=document.getElementById("observation-filter-shift");b&&(b.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+c.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),u&&c.includes(u)&&(b.value=u));const C=document.getElementById("observation-filter-risk");C&&(C.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+d.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),v&&d.includes(v)&&(C.value=v));const O=document.getElementById("observation-filter-status");O&&(O.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+l.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),g&&l.includes(g)&&(O.value=g));const U=document.getElementById("observation-filter-observer");U&&(U.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+p.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),x&&p.includes(x)&&(U.value=x));const I=document.getElementById("observation-filter-responsible");I&&(I.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+f.map(L=>`<option value="${Utils.escapeHTML(L)}">${Utils.escapeHTML(L)}</option>`).join(""),y&&f.includes(y)&&(I.value=y))},resetFilters(){const e=document.getElementById("observation-search");e&&(e.value=""),["observation-filter-site","observation-filter-location","observation-filter-type","observation-filter-shift","observation-filter-risk","observation-filter-status","observation-filter-observer","observation-filter-responsible"].forEach(s=>{const o=document.getElementById(s);o&&(o.value="")});const i=document.getElementById("observation-date-from"),a=document.getElementById("observation-date-to");i&&(i.value=""),a&&(a.value=""),document.querySelectorAll(".filter-count-badge").forEach(s=>{s.remove()}),this.loadObservationsList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")},async exportTop10PDF(){try{Notification.info("\u{1F680} \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 Top 10 \u0628\u0635\u064A\u063A\u0629 PDF...");const e=document.getElementById("top10-module-root");if(!e){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u062D\u062A\u0648\u0649 Top 10");return}await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const t=await html2canvas(e,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,ignoreElements:v=>v.id==="manage-top10-categories-btn"||v.id==="add-top10-chart-btn"||v.id==="manage-top10-charts-btn"||v.id==="export-top10-pdf-hero-btn"||v.id==="export-top10-ppt-hero-btn"||v.id==="export-top10-table-pdf-btn"||v.id==="export-top10-table-ppt-btn"}),{jsPDF:i}=window.jspdf,a=new i({orientation:"portrait",unit:"mm",format:"a4"}),s=a.internal.pageSize.getWidth(),o=a.internal.pageSize.getHeight(),n=8,r=8,c=s-n*2,d=c/t.width,l=t.height*d,p=o-n-r,f=Math.max(1,Math.ceil(l/p)),m=p/d;for(let v=0;v<f;v++){v>0&&a.addPage();const g=document.createElement("canvas"),x=Math.min(m,t.height-v*m);g.width=t.width,g.height=x,g.getContext("2d").drawImage(t,0,v*m,t.width,x,0,0,t.width,x);const k=g.toDataURL("image/jpeg",.92);a.addImage(k,"JPEG",n,n,c,x*d),a.setDrawColor(226,232,240),a.line(n,o-r,s-n,o-r),a.setTextColor(120,120,120),a.setFontSize(8),a.setFont("helvetica","normal"),a.text("Americana Group \u2014 HSE Top 10 Risk Report",n,o-3),a.text(`Page ${v+1} / ${f}`,s-n,o-3,{align:"right"})}const u=new Date().toISOString().slice(0,10);a.save(`\u062A\u0642\u0631\u064A\u0631-Top-10-\u0645\u0644\u0627\u062D\u0638\u0627\u062A-\u0627\u0644\u0633\u0644\u0627\u0645\u0629-${u}.pdf`),Notification.success("\u2705 \u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 Top 10 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D!")}catch{Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}},async exportTop10PptReport(){await this.exportPptReport({maxCount:10,status:"all"})},async showExportPptModal(){const e=document.createElement("div");e.className="modal-overlay active",e.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const t=this.getDepartmentOptions(),i=this.getSiteOptions(),s=new Date().toISOString().slice(0,10),o=this.canDailyObservationsFullAdminUi();e.innerHTML=`
            <div style="max-width: 680px; width: 92%; background: #ffffff; border-radius: 24px; padding: 28px 32px; box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.3); border: 1px solid rgba(226, 232, 240, 0.9); position: relative; font-family: Cairo, Tahoma, sans-serif;">
                
                <!-- \u0627\u0644\u0647\u064A\u062F\u0631 -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 50px; height: 50px; border-radius: 16px; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);">
                            <i class="fas fa-file-powerpoint" style="color: #fb923c;"></i>
                        </div>
                        <div>
                            <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
                                \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPT \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A
                                <span style="font-size: 0.7rem; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 2px 8px; border-radius: 20px; font-weight: 700;">HSE Standard</span>
                            </h3>
                            <p style="font-size: 13px; color: #64748b; margin: 3px 0 0 0;">\u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u062A\u0648\u0644\u064A\u062F \u0639\u0631\u0636 \u062A\u0642\u062F\u064A\u0645\u0640\u064A \u0627\u062D\u062A\u0631\u0627\u0641\u064A</p>
                        </div>
                    </div>
                    <button type="button" class="modal-close" style="width: 36px; height: 36px; border-radius: 50%; border: none; outline: none; background: #f8fafc; color: #64748b; font-size: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#fee2e2'; this.style.color='#ef4444';" onmouseout="this.style.background='#f8fafc'; this.style.color='#64748b';">&times;</button>
                </div>

                <!-- \u0643\u0627\u0631\u062A \u0627\u0644\u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631 -->
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 14px; padding: 14px 18px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; gap: 14px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #0369a1; font-weight: 600; line-height: 1.4;">
                        <i class="fas fa-shield-alt" style="font-size: 18px; color: #0284c7; flex-shrink: 0;"></i>
                        <span>\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 PPT \u0628\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0648\u0641\u0642\u0627\u064B \u0644\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0628\u0635\u0631\u064A\u0629 \u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629.</span>
                    </div>
                    ${o?`
                    <button type="button" id="ppt-template-id-settings-btn" style="white-space: nowrap; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 7px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1';">
                        <i class="fas fa-cog" style="color: #2563eb;"></i> \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628
                    </button>
                    `:""}
                </div>

                <!-- \u062D\u0642\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
                    
                    <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062D\u0627\u0644\u0629 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-industry" style="color: #2563eb; margin-left: 6px;"></i>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639
                            </label>
                            <select id="dailyobs-ppt-site" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 600; color: #0f172a; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 / \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>
                                ${i.map(r=>`<option value="${Utils.escapeHTML(r)}">${Utils.escapeHTML(r)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-tasks" style="color: #16a34a; margin-left: 6px;"></i>\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A <span style="color: #dc2626;">*</span>
                            </label>
                            <select id="dailyobs-ppt-status" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 700; color: #15803d; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                                <option value="all" selected>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0648\u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0648\u0627\u0644\u0642\u0627\u0626\u0645\u0629)</option>
                                <option value="open">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0641\u0642\u0637 (Open Only)</option>
                                <option value="closed">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0641\u0642\u0637 (Closed Only)</option>
                                <option value="in_progress">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u0642\u0637 (In Progress)</option>
                            </select>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0646\u064A: \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0644\u063A\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-building" style="color: #0284c7; margin-left: 6px;"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629
                            </label>
                            <select id="dailyobs-ppt-department" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 600; color: #0f172a; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                                ${t.map(r=>`<option value="${Utils.escapeHTML(r)}">${Utils.escapeHTML(r)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-language" style="color: #6366f1; margin-left: 6px;"></i>\u0644\u063A\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 <span style="color: #dc2626;">*</span>
                            </label>
                            <select id="dailyobs-ppt-language" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 700; color: #1e40af; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                                <option value="ar" selected>\u{1F1EA}\u{1F1EC} \u0627\u0644\u0639\u0631\u0628\u064A\u0629 (Arabic)</option>
                                <option value="en">\u{1F1EC}\u{1F1E7} \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 (English)</option>
                            </select>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0644\u062B: \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0648\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calendar-day" style="color: #d97706; margin-left: 6px;"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A
                            </label>
                            <input id="dailyobs-ppt-report-date" type="date" value="${s}" style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 600; color: #0f172a; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                        </div>
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px;">
                                <i class="fas fa-calendar-alt" style="color: #9333ea; margin-left: 6px;"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E - \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)
                            </label>
                            <div style="display: flex; gap: 8px;">
                                <input id="dailyobs-ppt-from-date" type="date" value="" style="width: 50%; padding: 9px 10px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 12px; color: #0f172a;">
                                <input id="dailyobs-ppt-to-date" type="date" value="" style="width: 50%; padding: 9px 10px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 12px; color: #0f172a;">
                            </div>
                        </div>
                    </div>

                </div>

                <!-- \u0627\u0644\u0641\u0648\u062A\u0631 \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631 -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding-top: 18px; border-top: 1px solid #f1f5f9;">
                    <button type="button" id="dailyobs-ppt-cancel-btn" style="padding: 11px 22px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'; this.style.color='#0f172a';" onmouseout="this.style.background='#f8fafc'; this.style.color='#475569';">\u0625\u0644\u063A\u0627\u0621</button>
                    
                    <button type="button" id="dailyobs-ppt-export-btn" style="display: flex; align-items: center; gap: 10px; padding: 11px 26px; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; font-size: 14px; font-weight: 700; border-radius: 10px; border: none; outline: none; cursor: pointer; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(37, 99, 235, 0.5)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(37, 99, 235, 0.35)';">
                        <i class="fas fa-file-powerpoint" style="font-size: 16px; color: #fb923c;"></i> \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPT
                    </button>
                </div>

            </div>
        `,document.body.appendChild(e);const n=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",n),e.querySelector("#dailyobs-ppt-cancel-btn")?.addEventListener("click",n),e.addEventListener("click",r=>{r.target===e&&n()}),o&&e.querySelector("#ppt-template-id-settings-btn")?.addEventListener("click",async()=>{n(),await this.showPptTemplateIdSetupModal()}),e.querySelector("#dailyobs-ppt-export-btn")?.addEventListener("click",async()=>{const r=e.querySelector("#dailyobs-ppt-status")?.value||"all",c=(e.querySelector("#dailyobs-ppt-site")?.value||"").trim(),d=(e.querySelector("#dailyobs-ppt-department")?.value||"").trim(),l=e.querySelector("#dailyobs-ppt-language")?.value||"ar",p=e.querySelector("#dailyobs-ppt-report-date")?.value||"",f=e.querySelector("#dailyobs-ppt-from-date")?.value||"",m=e.querySelector("#dailyobs-ppt-to-date")?.value||"";n(),await this.exportPptReport({department:d,siteName:c,language:l,reportDate:p,fromDate:f,toDate:m,status:r,maxCount:50})})},async exportPptReport({department:e="",siteName:t="",language:i="ar",reportDate:a="",fromDate:s="",toDate:o="",status:n="all",maxCount:r=10}={}){try{const c=Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(c.length===0){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u064A\u0648\u0645\u064A\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631.");return}const d=c.map(w=>this.normalizeRecord(w)),l=String(e||"").trim(),p=String(t||"").trim(),f=s?new Date(s):null,m=o?new Date(o):null,u=d.filter(w=>{if(p&&String(w.siteName||"").trim()!==p||l&&String(w.responsibleDepartment||"").trim()!==l||n==="open"&&w.status==="\u0645\u063A\u0644\u0642"||n==="closed"&&w.status!=="\u0645\u063A\u0644\u0642"||n==="in_progress"&&w.status!=="\u062C\u0627\u0631\u064A"&&w.status!=="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")return!1;if(!f&&!m)return!0;const S=w.date?new Date(w.date):null;return!(!S||Number.isNaN(S.getTime())||f&&S<new Date(f.getFullYear(),f.getMonth(),f.getDate())||m&&S>new Date(m.getFullYear(),m.getMonth(),m.getDate(),23,59,59,999))});if(u.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629.");return}const v=[...u].sort((w,S)=>{const F=X=>{const ae=String(X||"").toLowerCase();return ae.includes("\u0639\u0627\u0644\u064A")||ae.includes("\u062D\u0631\u062C")||ae.includes("high")||ae.includes("critical")?3:ae.includes("\u0645\u062A\u0648\u0633\u0637")||ae.includes("medium")?2:1},se=F(S.riskLevel)-F(w.riskLevel);if(se!==0)return se;const ne=X=>X!=="\u0645\u063A\u0644\u0642"?2:1,Q=ne(S.status)-ne(w.status);if(Q!==0)return Q;const ee=w.date?new Date(w.date).getTime():0;return(S.date?new Date(S.date).getTime():0)-ee}),g=parseInt(r,10)||10,x=v.slice(0,g),y="ppt_export_"+Date.now(),k=`\u062C\u0627\u0631\u064A \u062A\u0635\u0645\u064A\u0645 \u0648\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPTX (${x.length} \u0645\u0644\u0627\u062D\u0638\u0629)...`,$=document.getElementById("ppt-export-options-modal");Notification.info("\u{1F680} \u0628\u062F\u0623 \u062A\u0635\u0645\u064A\u0645 \u0648\u062A\u0635\u062F\u064A\u0631 \u0645\u0644\u0641 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A PPTX..."),await this._loadAnalyticsLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js",()=>typeof PptxGenJS<"u");const h=new PptxGenJS;h.defineLayout({name:"A16x9",width:13.333,height:7.5}),h.layout="A16x9";const b=String(i||"ar").toLowerCase()==="en",C=a?new Date(a).toLocaleDateString(b?"en-US":"ar-EG"):new Date().toLocaleDateString(b?"en-US":"ar-EG"),O=(l||"General").replace(/[\\/:*?"<>|]/g,"-"),U=AppState.companyLogo||AppState.companySettings?.logo||"",I=AppState.companySettings?.name||AppState.companyName||"\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0627\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A",L=new Map,P=async w=>{if(!w)return null;let S="";if(typeof w=="object"){if(w.data&&typeof w.data=="string"&&w.data.trim())return{data:w.data.trim()};S=w.url||w.directLink||w.shareableLink||w.link||w.driveUrl||""}else typeof w=="string"&&(S=w.trim());if(!S)return null;if((S.startsWith("/9j/")||S.startsWith("iVBORw")||S.startsWith("R0lGOD")||S.startsWith("UklGR"))&&(S="data:image/jpeg;base64,"+S),S.startsWith("data:image/")||S.startsWith("data:"))return{data:S};if(L.has(S))return L.get(S);const F=S.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)||S.match(/[?&]id=([a-zA-Z0-9_-]+)/)||S.match(/\/d\/([a-zA-Z0-9_-]+)/)||S.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)||(S.match(/^[a-zA-Z0-9_-]{25,}$/)?[null,S]:null),se=F?F[1]:"",ne=[];se&&(ne.push(`https://lh3.googleusercontent.com/d/${se}=w800`),ne.push(`https://drive.google.com/thumbnail?id=${se}&sz=w800`),ne.push(`https://drive.google.com/uc?export=download&id=${se}`)),(S.startsWith("http://")||S.startsWith("https://"))&&ne.push(S);for(const Q of ne)try{const ee=await new Promise(oe=>{const X=new Image;X.crossOrigin="anonymous";const ae=setTimeout(()=>oe(null),1500);X.onload=()=>{clearTimeout(ae);try{const re=document.createElement("canvas"),de=900;let ie=X.naturalWidth||800,ye=X.naturalHeight||600;ie>de&&(ye=Math.round(ye*de/ie),ie=de),re.width=ie,re.height=ye,re.getContext("2d").drawImage(X,0,0,ie,ye),oe(re.toDataURL("image/jpeg",.82))}catch{oe(null)}},X.onerror=()=>{clearTimeout(ae),oe(null)},X.src=Q});if(ee&&String(ee).startsWith("data:image/")){const oe={data:ee};return L.set(S,oe),oe}}catch{}for(const Q of ne)try{const ee=new AbortController,oe=setTimeout(()=>ee.abort(),1500),X=await fetch(Q,{mode:"cors",signal:ee.signal});if(clearTimeout(oe),X.ok){const ae=await X.blob();if(ae&&ae.size>0){const re=await new Promise(de=>{const ie=new FileReader;ie.onloadend=()=>de(ie.result),ie.readAsDataURL(ae)});if(re&&(String(re).startsWith("data:image/")||String(re).startsWith("data:application/octet-stream"))){const ie={data:String(re).replace("data:application/octet-stream","data:image/jpeg")};return L.set(S,ie),ie}}}}catch{}if(se&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.isLoggedIn=="function"&&GoogleIntegration.isLoggedIn())try{const Q=typeof GoogleIntegration.getAuthToken=="function"&&GoogleIntegration.getAuthToken()||typeof gapi<"u"&&gapi?.auth2?.getAuthInstance()?.currentUser?.get()?.getAuthResponse()?.access_token||AppState.googleAccessToken;if(Q){const ee=new AbortController,oe=setTimeout(()=>ee.abort(),1800),X=await fetch(`https://www.googleapis.com/drive/v3/files/${se}?alt=media`,{headers:{Authorization:`Bearer ${Q}`},signal:ee.signal});if(clearTimeout(oe),X.ok){const ae=await X.blob(),re=await new Promise(de=>{const ie=new FileReader;ie.onloadend=()=>de(ie.result),ie.readAsDataURL(ae)});if(re&&String(re).startsWith("data:image/")){const de={data:re};return L.set(S,de),de}}}}catch{}return null},T=w=>{if(!w)return"";if(Array.isArray(w.attachments)&&w.attachments.length>0){const S=w.attachments.find(F=>{const se=String(F?.type||"").toLowerCase(),ne=String(F?.name||"").toLowerCase(),Q=String(F?.data||F?.url||F?.directLink||"");return se.startsWith("image/")||ne.match(/\.(jpe?g|png|webp|gif|bmp)$/i)||Q.startsWith("data:image/")||Q.match(/\/d\/|\/file\/d\/|drive\.google|googleusercontent/i)})||w.attachments[0];if(S)return S.data||S.directLink||S.url||S.shareableLink||S.driveUrl||S.driveId||""}return w.image||w.photo||w.imageUrl||w.photoUrl||w.attachment||w.directLink||""},[E,j]=await Promise.all([P(U),Promise.all(x.map(w=>P(T(w))))]),R=h.addSlide();if(R.background={color:"F8FAFC"},R.addShape(h.ShapeType.rect,{x:0,y:0,w:"100%",h:.9,fill:{color:"1E3A8A"}}),R.addShape(h.ShapeType.rect,{x:0,y:.9,w:"100%",h:.05,fill:{color:"D97706"}}),E){R.addShape(h.ShapeType.roundRect,{x:.8,y:.12,w:2.2,h:.68,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1},rectRadius:.08});try{R.addImage({...E,x:.85,y:.15,w:2.1,h:.62,sizing:{type:"contain",w:2.1,h:.62}})}catch{}}else R.addShape(h.ShapeType.roundRect,{x:.8,y:.12,w:2.2,h:.68,fill:{color:"FFFFFF"},line:{color:"DC2626",width:1.5},rectRadius:.08}),R.addText("AMERICANA",{x:.8,y:.12,w:2.2,h:.68,fontSize:14,bold:!0,color:"DC2626",align:"center",valign:"middle"});R.addText(b?"HSE Management System \u2014 Safety & Health Department":"\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 | \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",{x:4,y:.15,w:8.5,h:.6,fontSize:13,bold:!0,color:"FFFFFF",align:b?"left":"right",rtl:!b,fontFace:"Arial"}),R.addShape(h.ShapeType.roundRect,{x:1.5,y:1.45,w:10.33,h:3.4,fill:{color:"FFFFFF"},line:{color:"3B82F6",width:2},rectRadius:.15}),R.addShape(h.ShapeType.roundRect,{x:1.7,y:1.6,w:9.93,h:.04,fill:{color:"D97706"},line:{color:"D97706"}});const Y=p||x[0]?.siteName||"",J=b?`Plant : ${Y||"All Plants"}`:`\u0627\u0644\u0645\u0635\u0646\u0639 : ${Y||"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639"}`;R.addText([{text:b?`Safety Observations Report

`:`\u062A\u0642\u0631\u064A\u0631 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629

`,options:{fontSize:32,bold:!0,color:"1E3A8A",rtl:!b}},{text:`${I}

`,options:{fontSize:20,bold:!0,color:"0F172A",rtl:!b}},{text:J,options:{fontSize:18,bold:!0,color:"D97706",rtl:!b}}],{x:1.6,y:1.75,w:10.13,h:2.8,align:"center",valign:"middle",fontFace:"Arial"}),[{title:b?"Department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629",val:l||(b?"All Departments":"\u0643\u0627\u0641\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A"),bg:"EFF6FF",line:"93C5FD",color:"1E40AF"},{title:b?"Report Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631",val:C,bg:"FEF3C7",line:"FDE68A",color:"B45309"},{title:b?"Observations Count":"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0627\u0644\u062A\u0642\u0631\u064A\u0631",val:b?`${x.length} Observations`:`${x.length} \u0645\u0644\u0627\u062D\u0638\u0629`,bg:"ECFDF5",line:"A7F3D0",color:"047857"}].forEach((w,S)=>{const F=b?1.5+S*3.6:1.5+(2-S)*3.6;R.addShape(h.ShapeType.roundRect,{x:F,y:5.15,w:3.13,h:1.4,fill:{color:w.bg},line:{color:w.line,width:1.5},rectRadius:.1}),R.addText([{text:w.title+`
`,options:{fontSize:11,bold:!0,color:"64748B",rtl:!b}},{text:w.val,options:{fontSize:13.5,bold:!0,color:w.color,rtl:!b}}],{x:F,y:5.2,w:3.13,h:1.3,align:"center",valign:"middle",fontFace:"Arial"})}),R.addShape(h.ShapeType.rect,{x:0,y:6.95,w:"100%",h:.55,fill:{color:"1E3A8A"}}),R.addText("Safety First \u2014 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0623\u0648\u0644\u0627\u064B \u0648\u0628\u0646\u0627\u0621 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0648\u0645\u0633\u062A\u062F\u0627\u0645\u0629",{x:0,y:6.98,w:"100%",h:.48,fontSize:11,bold:!0,color:"FBBF24",align:"center",valign:"middle",fontFace:"Arial"});const _=h.addSlide();_.background={color:"F8FAFC"},_.addShape(h.ShapeType.rect,{x:0,y:0,w:"100%",h:.7,fill:{color:"1E3A8A"}}),_.addShape(h.ShapeType.rect,{x:0,y:.7,w:"100%",h:.04,fill:{color:"D97706"}}),_.addText(b?"Report Overview & Safety Performance Dashboard":"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062A\u0642\u0631\u064A\u0631",{x:4.5,y:.05,w:8,h:.6,fontSize:18,bold:!0,color:"FFFFFF",align:b?"left":"right",rtl:!b,fontFace:"Arial"}),_.addText(b?`Total: ${x.length} Observations`:`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${x.length} \u0645\u0644\u0627\u062D\u0638\u0629 | \u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${C}`,{x:.4,y:.05,w:4,h:.6,fontSize:11,bold:!0,color:"FBBF24",align:b?"right":"left",rtl:!b,fontFace:"Arial"});const H=x.length,q=x.filter(w=>w.status!=="\u0645\u063A\u0644\u0642").length,D=x.filter(w=>w.status==="\u0645\u063A\u0644\u0642").length,z=x.filter(w=>String(w.riskLevel||"").includes("\u0639\u0627\u0644\u064A")||String(w.riskLevel||"").includes("\u062D\u0631\u062C\u0629")).length,B=x.filter(w=>String(w.riskLevel||"").includes("\u0645\u062A\u0648\u0633\u0637")).length,V=Math.max(0,H-z-B),N=Math.round(D/Math.max(1,H)*100),G=Math.round(q/Math.max(1,H)*100),le=Math.round(z/Math.max(1,H)*100),ce={};x.forEach(w=>{const S=String(w.observationType||(b?"General":"\u0639\u0627\u0645")).trim();ce[S]=(ce[S]||0)+1});const me=Object.entries(ce).sort((w,S)=>S[1]-w[1]).slice(0,4),fe=new Set(x.map(w=>w.siteName||w.locationName).filter(Boolean)).size||1;[{label:b?"Total Observations":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",val:H,sub:b?"100% of recorded":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629",color:"1E3A8A",bg:"DBEAFE",border:"3B82F6"},{label:b?"Open Actions":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",val:q,sub:b?`${G}% pending actions`:`${G}% \u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630`,color:"B45309",bg:"FEF3C7",border:"F59E0B"},{label:b?"Closed Observations":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629",val:D,sub:b?`${N}% resolution rate`:`${N}% \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629`,color:"047857",bg:"D1FAE5",border:"10B981"},{label:b?"High Risk":"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",val:z,sub:b?`${le}% critical priority`:z>0?`${le}% \u062A\u062A\u0637\u0644\u0628 \u0623\u0648\u0644\u0648\u064A\u0629 \u0642\u0635\u0648\u0649`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629",color:"B91C1C",bg:"FEE2E2",border:"EF4444"}].forEach((w,S)=>{const F=b?.5+S*3.1:.5+(3-S)*3.1;_.addShape(h.ShapeType.roundRect,{x:F,y:.9,w:2.85,h:1.45,fill:{color:w.bg},line:{color:w.border,width:1.5},rectRadius:.1}),_.addText([{text:String(w.val)+`
`,options:{fontSize:24,bold:!0,color:w.color}},{text:w.label+`
`,options:{fontSize:12,bold:!0,color:"1E293B",rtl:!b}},{text:w.sub,options:{fontSize:9.5,color:"64748B",rtl:!b}}],{x:F,y:.95,w:2.85,h:1.35,align:"center",valign:"middle",fontFace:"Arial"})});const K=2.5,A=4.15,W=3.95,te=b?.5:8.88;_.addShape(h.ShapeType.roundRect,{x:te,y:K,w:W,h:A,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),_.addShape(h.ShapeType.rect,{x:te,y:K,w:W,h:.38,fill:{color:"1E3A8A"}}),_.addText(b?"Risk Level Breakdown":"\u062A\u0648\u0632\u064A\u0639 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629",{x:te,y:K,w:W,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const ve=[[{text:b?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Risk Level":"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"right",rtl:!b}}],[{text:`${le}%`,options:{color:"B91C1C",bold:!0,fontSize:10,align:"center"}},{text:String(z),options:{color:"B91C1C",bold:!0,fontSize:10,align:"center"}},{text:b?"High / Critical":"\u0639\u0627\u0644\u064A\u0629 / \u062D\u0631\u062C\u0629",options:{color:"B91C1C",bold:!0,fontSize:10,align:"right",rtl:!b}}],[{text:`${Math.round(B/Math.max(1,H)*100)}%`,options:{color:"B45309",bold:!0,fontSize:10,align:"center"}},{text:String(B),options:{color:"B45309",bold:!0,fontSize:10,align:"center"}},{text:b?"Medium Risk":"\u0645\u062A\u0648\u0633\u0637\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{color:"B45309",bold:!0,fontSize:10,align:"right",rtl:!b}}],[{text:`${Math.round(V/Math.max(1,H)*100)}%`,options:{color:"047857",bold:!0,fontSize:10,align:"center"}},{text:String(V),options:{color:"047857",bold:!0,fontSize:10,align:"center"}},{text:b?"Low Risk":"\u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{color:"047857",bold:!0,fontSize:10,align:"right",rtl:!b}}]];_.addTable(ve,{x:te+.1,y:K+.5,w:W-.2,h:3.45,colW:[1,.9,1.85],fontSize:10,border:{pt:.5,color:"E2E8F0"}});const ue=4.69;_.addShape(h.ShapeType.roundRect,{x:ue,y:K,w:W,h:A,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),_.addShape(h.ShapeType.rect,{x:ue,y:K,w:W,h:.38,fill:{color:"2563EB"}}),_.addText(b?"Top Observation Categories":"\u0623\u0628\u0631\u0632 \u0645\u062C\u0627\u0644\u0627\u062A \u0648\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",{x:ue,y:K,w:W,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const ge=[[{text:b?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Category":"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"right",rtl:!b}}]];for(me.forEach(([w,S])=>{const F=Math.round(S/Math.max(1,H)*100);ge.push([{text:`${F}%`,options:{color:"1E40AF",bold:!0,fontSize:10,align:"center"}},{text:String(S),options:{color:"0F172A",bold:!0,fontSize:10,align:"center"}},{text:w.length>22?w.slice(0,22)+"\u2026":w,options:{color:"0F172A",fontSize:9.5,align:"right",rtl:!b}}])});ge.length<5;)ge.push([{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}},{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}},{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}}]);_.addTable(ge,{x:ue+.1,y:K+.5,w:W-.2,h:3.45,colW:[1,.9,1.85],fontSize:10,border:{pt:.5,color:"E2E8F0"}});const he=b?8.88:.5;_.addShape(h.ShapeType.roundRect,{x:he,y:K,w:W,h:A,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),_.addShape(h.ShapeType.rect,{x:he,y:K,w:W,h:.38,fill:{color:"059669"}}),_.addText(b?"Executive Summary & Context":"\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A \u0648\u0633\u064A\u0627\u0642 \u0627\u0644\u0631\u0635\u062F",{x:he,y:K,w:W,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const Se=b?[{text:"\u2022 Scope & Coverage: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`${fe} sites/locations surveyed.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Action Status: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`${D} actions completed, ${q} in progress.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Compliance Target: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`Complete all pending high-priority actions on schedule.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Verification: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:"Follow up with site supervisors for documented closures.",options:{color:"0F172A",fontSize:10}}]:[{text:"\u2022 \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u0634\u0645\u0644 \u0627\u0644\u0631\u0635\u062F ${fe} \u0645\u0648\u0642\u0639\u0627\u064B / \u0645\u0646\u0637\u0642\u0629 \u0639\u0645\u0644.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 ${D} \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 ${q}.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641 \u0627\u0644\u0648\u0642\u0627\u0626\u064A: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0648\u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u0645\u0648\u0639\u062F \u0627\u0644\u0645\u062D\u062F\u062F.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:"\u062A\u0648\u062B\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u062A\u0635\u062D\u064A\u062D \u0628\u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0623\u062F\u0644\u0629.",options:{color:"0F172A",fontSize:10,rtl:!0}}];_.addText(Se,{x:he+.15,y:K+.5,w:W-.3,h:3.45,align:b?"left":"right",valign:"top",rtl:!b,fontFace:"Arial"}),_.addShape(h.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),_.addText(`${I} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!b,fontFace:"Arial"}),_.addText(b?`Slide 2 of ${x.length+4}`:`\u0634\u0631\u064A\u062D\u0629 2 \u0645\u0646 ${x.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"});for(let w=0;w<x.length;w++){const S=x[w],F=h.addSlide();F.background={color:"F8FAFC"};const se=S.isoCode||S.id||`OBS-${w+1}`,ne=String(S.date||"").slice(0,10)||"\u2014",Q=[S.siteName,S.locationName].filter(Boolean).join(" - ")||"\u2014",ee=j[w];F.addShape(h.ShapeType.rect,{x:0,y:0,w:"100%",h:.65,fill:{color:"1E3A8A"}}),F.addShape(h.ShapeType.rect,{x:0,y:.65,w:"100%",h:.04,fill:{color:"D97706"}}),F.addText(b?`Observation Details \u2014 ${Q}`:`\u0628\u0637\u0627\u0642\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u2014 ${Q}`,{x:4.5,y:.05,w:8.4,h:.55,fontSize:14.5,bold:!0,color:"FFFFFF",align:b?"left":"right",rtl:!b,fontFace:"Arial"}),F.addText(se,{x:.4,y:.05,w:3.8,h:.55,fontSize:14.5,bold:!0,color:"FBBF24",align:"left",fontFace:"Arial"}),F.addShape(h.ShapeType.roundRect,{x:6.8,y:.78,w:6.1,h:5.85,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),F.addShape(h.ShapeType.rect,{x:6.8,y:.78,w:6.1,h:.38,fill:{color:"2563EB"}}),F.addText(b?"Observation & Corrective Action Details":"\u0648\u0635\u0641 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A",{x:6.8,y:.78,w:6.1,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const oe=[[{text:String(se),options:{bold:!0,color:"1E40AF",fontSize:10.5,align:"right",rtl:!b}},{text:b?"Observation No":"\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(ne),options:{color:"0F172A",fontSize:10.5,align:"right",rtl:!b}},{text:b?"Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0635\u062F",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(Q),options:{color:"0F172A",fontSize:10,align:"right",rtl:!b}},{text:b?"Location":"\u0627\u0644\u0645\u0643\u0627\u0646 / \u0627\u0644\u0645\u0648\u0642\u0639",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.observationType||"\u2014"),options:{color:"0F172A",fontSize:10,align:"right",rtl:!b}},{text:b?"Type":"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.details||"\u2014"),options:{color:"1E293B",fontSize:9.5,align:"right",rtl:!b}},{text:b?"Description":"\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.correctiveAction||"\u2014"),options:{color:"047857",bold:!0,fontSize:9.5,align:"right",rtl:!b}},{text:b?"Corrective Action":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.riskLevel||"\u2014"),options:{bold:!0,color:String(S.riskLevel||"").includes("\u0639\u0627\u0644\u064A")?"DC2626":"0F172A",fontSize:10.5,align:"right",rtl:!b}},{text:b?"Risk Level":"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.expectedCompletionDate||"\u2014").slice(0,10),options:{color:"0F172A",fontSize:10,align:"right",rtl:!b}},{text:b?"Target Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0642\u062A\u0631\u062D",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.responsibleDepartment||"\u2014"),options:{color:"0F172A",fontSize:10,align:"right",rtl:!b}},{text:b?"Responsible Dept":"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}],[{text:String(S.status||"\u2014"),options:{bold:!0,color:S.status==="\u0645\u063A\u0644\u0642"?"047857":"B45309",fontSize:10.5,align:"right",rtl:!b}},{text:b?"Status":"\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!b}}]];if(F.addTable(oe,{x:6.8,y:1.16,w:6.1,h:5.47,colW:[4.3,1.8],border:{pt:.5,color:"E2E8F0"}}),F.addShape(h.ShapeType.roundRect,{x:.4,y:.78,w:6.1,h:5.85,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),F.addShape(h.ShapeType.rect,{x:.4,y:.78,w:6.1,h:.38,fill:{color:"64748B"}}),F.addText(b?"Observation Photo":"\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629",{x:.4,y:.78,w:6.1,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"}),ee&&ee.data)try{F.addImage({data:ee.data,x:.55,y:1.25,w:5.8,h:5.25,sizing:{type:"contain",w:5.8,h:5.25}})}catch{F.addShape(h.ShapeType.roundRect,{x:.8,y:1.6,w:5.3,h:4.5,fill:{color:"F8FAFC"},line:{color:"CBD5E1",width:1},rectRadius:.1}),F.addText(b?"Photo attached in system":"\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0631\u0641\u0642\u0629 \u0628\u0627\u0644\u0646\u0638\u0627\u0645",{x:.8,y:1.6,w:5.3,h:4.5,fontSize:13,color:"64748B",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"})}else F.addShape(h.ShapeType.roundRect,{x:.8,y:1.6,w:5.3,h:4.5,fill:{color:"F8FAFC"},line:{color:"E2E8F0",width:1},rectRadius:.1}),F.addText(b?"No image attached for this observation":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629 \u0645\u0631\u0641\u0642\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",{x:.8,y:1.6,w:5.3,h:4.5,fontSize:13,color:"94A3B8",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});F.addShape(h.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),F.addText(`${I} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!b,fontFace:"Arial"}),F.addText(b?`Slide ${w+3} of ${x.length+4}`:`\u0634\u0631\u064A\u062D\u0629 ${w+3} \u0645\u0646 ${x.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"})}const Z=h.addSlide();Z.background={color:"F8FAFC"},Z.addShape(h.ShapeType.rect,{x:0,y:0,w:"100%",h:.7,fill:{color:"1E3A8A"}}),Z.addShape(h.ShapeType.rect,{x:0,y:.7,w:"100%",h:.04,fill:{color:"D97706"}}),Z.addText(b?"Executive Summary & Safety Recommendations":"\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0648\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629",{x:.8,y:.05,w:11.7,h:.6,fontSize:18,bold:!0,color:"FFFFFF",align:b?"left":"right",rtl:!b,fontFace:"Arial"});const ke=Math.round(D/Math.max(1,H)*100),Te=Math.round(z/Math.max(1,H)*100);[{title:b?"Resolution Rate":"\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",val:`${ke}%`,sub:b?`${D} of ${H} closed`:`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 ${D} \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A ${H}`,color:"047857",bg:"D1FAE5"},{title:b?"High Risk Ratio":"\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",val:`${Te}%`,sub:b?`${z} critical items`:`${z} \u0645\u0644\u0627\u062D\u0638\u0629 \u062A\u062A\u0637\u0644\u0628 \u062A\u0631\u0643\u064A\u0632\u0627\u064B \u0641\u0648\u0631\u064A\u0627\u064B`,color:"B91C1C",bg:"FEE2E2"},{title:b?"Pending Actions":"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",val:`${q}`,sub:b?"Open items in progress":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062C\u0627\u0631\u064A \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u062A\u0635\u062D\u064A\u062D\u0647\u0627",color:"B45309",bg:"FEF3C7"}].forEach((w,S)=>{const F=b?.6+S*4.1:.6+(2-S)*4.1;Z.addShape(h.ShapeType.roundRect,{x:F,y:.9,w:3.85,h:1.45,fill:{color:w.bg},line:{color:w.color,width:1.5},rectRadius:.1}),Z.addText([{text:w.val+`
`,options:{fontSize:24,bold:!0,color:w.color}},{text:w.title+`
`,options:{fontSize:12,bold:!0,color:"1E293B",rtl:!b}},{text:w.sub,options:{fontSize:10,color:"64748B",rtl:!b}}],{x:F,y:.95,w:3.85,h:1.35,align:"center",valign:"middle",fontFace:"Arial"})});const xe={};x.forEach(w=>{const S=w.responsibleDepartment||(b?"Unassigned":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");xe[S]=(xe[S]||0)+1});const $e=Object.entries(xe).sort((w,S)=>S[1]-w[1]).slice(0,5);Z.addShape(h.ShapeType.roundRect,{x:6.8,y:2.5,w:6,h:4.15,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),Z.addShape(h.ShapeType.rect,{x:6.8,y:2.5,w:6,h:.38,fill:{color:"1E3A8A"}}),Z.addText(b?"Top Responsible Departments":"\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629",{x:6.8,y:2.5,w:6,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const we=[[{text:b?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"center",rtl:!b}},{text:b?"Department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"right",rtl:!b}}]];$e.forEach(([w,S])=>{const F=Math.round(S/Math.max(1,H)*100);we.push([{text:`${F}%`,options:{color:"1E3A8A",bold:!0,fontSize:10,align:"center"}},{text:String(S),options:{color:"0F172A",bold:!0,fontSize:10,align:"center"}},{text:w,options:{color:"0F172A",fontSize:10,align:"right",rtl:!b}}])}),Z.addTable(we,{x:6.9,y:2.95,w:5.8,h:3.6,colW:[1.2,1,3.6],fontSize:10,border:{pt:.5,color:"E2E8F0"}}),Z.addShape(h.ShapeType.roundRect,{x:.5,y:2.5,w:6,h:4.15,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),Z.addShape(h.ShapeType.rect,{x:.5,y:2.5,w:6,h:.38,fill:{color:"059669"}}),Z.addText(b?"Executive Safety Recommendations & Action Plan":"\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0648\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629",{x:.5,y:2.5,w:6,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!b,fontFace:"Arial"});const Ae=b?[{text:"1. Follow up and accelerate closure of open corrective actions ("+q+` items) before target dates.

`,options:{fontSize:10,color:"0F172A",bold:!0}},{text:`2. Prioritize high-risk observations to eliminate potential workplace hazards promptly.

`,options:{fontSize:10,color:"0F172A"}},{text:`3. Increase site safety inspections and toolbox talks in high-frequency observation locations.

`,options:{fontSize:10,color:"0F172A"}},{text:"4. Continuously verify the effectiveness of preventative actions to ensure sustainable compliance.",options:{fontSize:10,color:"0F172A"}}]:[{text:"1. \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u062B\u064A\u062B\u0629 \u0644\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 ("+q+` \u0645\u0644\u0627\u062D\u0638\u0629) \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0639\u0646\u064A\u0629.

`,options:{fontSize:10,color:"0F172A",bold:!0,rtl:!0}},{text:`2. \u0625\u0639\u0637\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0627\u0644\u0642\u0635\u0648\u0649 \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0635\u0646\u0641\u0629 \u0643\u0640 (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629) \u0644\u0644\u062D\u062F \u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629.

`,options:{fontSize:10,color:"0F172A",rtl:!0}},{text:`3. \u062A\u0643\u062B\u064A\u0641 \u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0648\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0633\u062C\u064A\u0644\u0627\u064B \u0644\u0644\u062D\u064A\u0648\u062F\u0627\u062A \u0644\u0631\u0641\u0639 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644.

`,options:{fontSize:10,color:"0F172A",rtl:!0}},{text:"4. \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u062F\u0648\u0631\u064A \u0645\u0646 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0627\u0644\u0645\u062A\u062E\u0630\u0629 \u0644\u0636\u0645\u0627\u0646 \u0639\u062F\u0645 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629.",options:{fontSize:10,color:"0F172A",rtl:!0}}];Z.addText(Ae,{x:.65,y:2.98,w:5.7,h:3.55,align:b?"left":"right",valign:"top",rtl:!b,fontFace:"Arial"}),Z.addShape(h.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),Z.addText(`${I} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!b,fontFace:"Arial"}),Z.addText(b?`Slide ${x.length+3} of ${x.length+4}`:`\u0634\u0631\u064A\u062D\u0629 ${x.length+3} \u0645\u0646 ${x.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"});const pe=h.addSlide();pe.background={color:"F8FAFC"},pe.addShape(h.ShapeType.rect,{x:0,y:0,w:"100%",h:.8,fill:{color:"1E3A8A"}}),pe.addShape(h.ShapeType.rect,{x:0,y:.8,w:"100%",h:.04,fill:{color:"D97706"}}),pe.addShape(h.ShapeType.roundRect,{x:2,y:1.8,w:9.33,h:3.8,fill:{color:"FFFFFF"},line:{color:"3B82F6",width:2},rectRadius:.15}),pe.addText([{text:b?`Thank you for your continuous commitment to Safety Standards

`:`\u0634\u0643\u0631\u0627\u064B \u0644\u0627\u0644\u062A\u0632\u0627\u0645\u0643\u0645 \u0627\u0644\u062F\u0627\u0626\u0645 \u0648\u0627\u0644\u0645\u0633\u062A\u0645\u0631 \u0628\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629

`,options:{fontSize:22,bold:!0,color:"1E3A8A",rtl:!b}},{text:b?`Safety First \u2014 Americana Group
`:`\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0623\u0648\u0644\u0627\u064B \u2014 \u0645\u062C\u0645\u0648\u0639\u0629 \u0623\u0645\u0631\u064A\u0643\u0627\u0646\u0627
`,options:{fontSize:18,bold:!0,color:"D97706",rtl:!b}},{text:b?"Working Together for a Zero-Harm Environment":"\u0646\u0639\u0645\u0644 \u0645\u0639\u0627\u064B \u0645\u0646 \u0623\u062C\u0644 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631",options:{fontSize:12.5,color:"64748B",rtl:!b}}],{x:2.1,y:1.9,w:9.13,h:3.6,align:"center",valign:"middle",fontFace:"Arial"}),pe.addShape(h.ShapeType.rect,{x:0,y:6.95,w:"100%",h:.55,fill:{color:"1E3A8A"}}),pe.addText(`${I} \u2014 HSE Management`,{x:0,y:6.98,w:"100%",h:.48,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",fontFace:"Arial"});const Le=`Daily_Observations_${O}_${new Date().toISOString().slice(0,10)}.pptx`;await h.writeFile({fileName:Le}),Notification.success(`\u2705 \u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPTX \u0628\u0646\u062C\u0627\u062D \u0628\u062A\u0635\u0645\u064A\u0645 \u0645\u0646\u0633\u0642 \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A! (${x.length} \u0645\u0644\u0627\u062D\u0638\u0629)`)}catch(c){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PPT:",c),Notification.error("\u274C \u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PPT: "+(c?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},showPptExportSuccessModal(e,t,i){const a=document.getElementById("ppt-export-success-modal");a&&a.remove();const s=document.createElement("div");s.id="ppt-export-success-modal",s.className="modal-overlay active",s.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const o=e||t||"",n=t||e||"";s.innerHTML=`
            <div style="max-width: 440px; width: 92%; background: #ffffff; border-radius: 24px; padding: 32px 24px 24px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(226, 232, 240, 0.8); position: relative;">
                <button type="button" class="modal-close-btn" style="position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; border-radius: 50%; border: none; outline: none; background: #f1f5f9; color: #64748b; font-size: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.background='#e2e8f0'; this.style.color='#0f172a';" onmouseout="this.style.background='#f1f5f9'; this.style.color='#64748b';">&times;</button>
                
                <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%); border-radius: 20px; color: #2563eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.25);">
                    <i class="fas fa-file-powerpoint"></i>
                </div>

                <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px; font-family: Cairo, Tahoma, sans-serif;">\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 PPTX \u0628\u0646\u062C\u0627\u062D!</h3>
                
                <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; font-family: Cairo, Tahoma, sans-serif;">
                    \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062E\u0627\u0635 \u0628\u0640 <strong style="color: #1e40af;">${Utils.escapeHTML(i||"")}</strong> \u0643\u0627\u0645\u0644\u0627\u064B \u0628\u0627\u0644\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0648\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A.
                </p>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${o?`<a href="${Utils.escapeHTML(o)}" download target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 14px 20px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-weight: 700; font-size: 15px; border-radius: 14px; border: none; outline: none; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); transition: all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(37, 99, 235, 0.5)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(37, 99, 235, 0.35)';">
                        <i class="fas fa-download" style="font-size: 18px;"></i> \u062A\u0646\u0632\u064A\u0644 \u0645\u0644\u0641 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (PPTX)
                    </a>`:""}
                    ${n?`<a href="${Utils.escapeHTML(n)}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 18px; background: #f8fafc; color: #334155; font-weight: 600; font-size: 14px; border-radius: 14px; border: 1px solid #cbd5e1; outline: none; text-decoration: none; transition: all 0.2s ease;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#0f172a'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#f8fafc'; this.style.color='#334155'; this.style.borderColor='#cbd5e1';">
                        <i class="fas fa-external-link-alt"></i> \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0639\u0631\u0636 \u0641\u064A Google Slides
                    </a>`:""}
                </div>

                <button type="button" class="modal-close-btn" style="background: transparent; border: none; outline: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; padding: 10px 16px; margin-top: 14px; transition: color 0.2s; font-family: Cairo, Tahoma, sans-serif;" onmouseover="this.style.color='#0f172a';" onmouseout="this.style.color='#64748b';">\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629</button>
            </div>
        `,document.body.appendChild(s);const r=()=>s.remove();if(s.querySelectorAll(".modal-close-btn").forEach(c=>c.addEventListener("click",r)),s.addEventListener("click",c=>{c.target===s&&r()}),o)try{const c=document.createElement("a");c.href=o,c.target="_blank",c.download="",document.body.appendChild(c),c.click(),c.remove()}catch{}},async showPptTemplateIdSetupModal(){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0642\u0627\u0644\u0628 PPT \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=document.createElement("div");e.className="modal-overlay active",e.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-powerpoint ml-2 text-orange-500"></i>
                        \u0625\u0639\u062F\u0627\u062F Template ID \u0644\u062A\u0635\u062F\u064A\u0631 PPT
                    </h2>
                    <button class="modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642">&times;</button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                        <p class="text-sm text-yellow-800 mb-1">
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0647\u0645\u0629:</strong> \u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u062A\u0635\u0645\u064A\u0645\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0625\u0639\u062F\u0627\u062F \u0623\u064A \u0642\u0627\u0644\u0628.
                        </p>
                        <p class="text-xs text-yellow-700">
                            \u064A\u0645\u0643\u0646\u0643 \u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062E\u0627\u0635 \u0628\u0634\u0631\u0643\u062A\u0643 \u0628\u0625\u062F\u062E\u0627\u0644 File ID \u0627\u0644\u062E\u0627\u0635 \u0628\u0645\u0644\u0641 Google Slides \u0627\u0644\u062E\u0627\u0635 \u0628\u0643 \u0623\u062F\u0646\u0627\u0647.
                        </p>
                    </div>

                    <div id="ppt-template-status-container" class="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-600 flex items-center justify-between">
                        <span><i class="fas fa-spinner fa-spin ml-2 text-blue-600"></i>\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u062D\u0627\u0644\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062D\u0627\u0644\u064A...</span>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Template ID (File ID) *
                            <span class="text-xs text-gray-500 font-normal">(\u0645\u0646 \u0631\u0627\u0628\u0637 Google Slides)</span>
                        </label>
                        <input 
                            type="text" 
                            id="ppt-template-id-input" 
                            class="form-input font-mono text-sm" 
                            placeholder="\u0623\u062F\u062E\u0644 File ID \u0645\u0646 \u0631\u0627\u0628\u0637 Google Slides"
                            value=""
                        >
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 File ID \u0645\u0646 \u0631\u0627\u0628\u0637 Google Slides:
                            <code class="text-xs bg-gray-100 px-1 rounded">https://docs.google.com/presentation/d/<strong>FILE_ID_HERE</strong>/edit</code>
                        </p>
                    </div>

                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <h4 class="text-sm font-semibold text-blue-900 mb-2">\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0625\u0646\u0634\u0627\u0621 Template:</h4>
                        <ol class="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                            <li>\u0623\u0646\u0634\u0626 \u0645\u0644\u0641 Google Slides \u062C\u062F\u064A\u062F</li>
                            <li>\u0627\u0644\u0634\u0631\u064A\u062D\u0629 \u0627\u0644\u0623\u0648\u0644\u0649: \u0634\u0631\u064A\u062D\u0629 \u0627\u0644\u063A\u0644\u0627\u0641 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 {{DEPARTMENT}} \u0648 {{REPORT_DATE}}</li>
                            <li>\u0627\u0644\u0634\u0631\u064A\u062D\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629: \u0634\u0631\u064A\u062D\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 Placeholders \u0645\u062B\u0644 {{OBS_NO}}, {{OBS_DATE}}, {{OBS_DETAILS}}, \u0625\u0644\u062E</li>
                            <li>\u0627\u0646\u0633\u062E File ID \u0645\u0646 \u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0644\u0641 \u0648\u0623\u062F\u062E\u0644\u0647 \u0623\u0639\u0644\u0627\u0647</li>
                        </ol>
                    </div>
                </div>
                <div class="modal-footer flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
                    <div class="flex flex-wrap items-center gap-2">
                        <button type="button" class="btn-secondary bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-2 rounded shadow-sm" id="ppt-template-id-auto-create-btn" title="\u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u0646\u0633\u064A\u0642 \u0642\u0627\u0644\u0628 Google Slides \u062C\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A Drive">
                            <i class="fas fa-magic ml-1"></i>
                            \u0625\u0646\u0634\u0627\u0621 \u0622\u0644\u064A
                        </button>
                        <button type="button" class="btn-secondary bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-2 rounded shadow-sm hidden" id="ppt-template-id-test-btn">
                            <i class="fas fa-check-circle ml-1"></i>
                            \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0642\u0627\u0644\u0628
                        </button>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <button type="button" class="btn-secondary text-xs px-4 py-2 rounded" id="ppt-template-id-cancel-btn">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary text-xs px-4 py-2 rounded font-bold shadow-sm" id="ppt-template-id-save-btn">
                            <i class="fas fa-save ml-1"></i>
                            \u062D\u0641\u0638 Template ID
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e);const t=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",t),e.querySelector("#ppt-template-id-cancel-btn")?.addEventListener("click",t),e.addEventListener("click",i=>{i.target===e&&t()}),(async()=>{try{const i=await GoogleIntegration.sendToAppsScript("getDailyObservationsPptTemplateId",{}),a=e.querySelector("#ppt-template-status-container"),s=e.querySelector("#ppt-template-id-input"),o=e.querySelector("#ppt-template-id-test-btn");i&&i.success&&i.templateId?(s&&(s.value=i.templateId),o&&o.classList.remove("hidden"),a&&(a.className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800",a.innerHTML=`
                            <div>
                                <strong>Template ID \u0627\u0644\u062D\u0627\u0644\u064A:</strong>
                                <span class="font-mono text-xs block text-green-700 mt-1">${Utils.escapeHTML(i.templateId)}</span>
                                ${i.fileName?`<span class="block text-xs mt-1">\u0627\u0644\u0645\u0644\u0641: <strong>${Utils.escapeHTML(i.fileName)}</strong></span>`:""}
                                ${i.fileUrl?`<a href="${Utils.escapeHTML(i.fileUrl)}" target="_blank" class="text-xs text-blue-600 hover:underline mt-1 inline-block">\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641 \u0641\u064A Google Slides</a>`:""}
                            </div>
                        `)):a&&(a.className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600",a.innerHTML='<span><i class="fas fa-info-circle ml-1 text-blue-500"></i>\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0648\u0651\u062D\u062F \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u062D\u0627\u0644\u064A\u0627\u064B (\u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 ID \u062E\u0627\u0635 \u0623\u062F\u0646\u0627\u0647).</span>')}catch{const a=e.querySelector("#ppt-template-status-container");a&&(a.className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600",a.innerHTML='<span><i class="fas fa-info-circle ml-1 text-blue-500"></i>\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0648\u0651\u062D\u062F \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u062D\u0627\u0644\u064A\u0627\u064B.</span>')}})(),e.addEventListener("click",i=>{i.target===e&&t()}),e.querySelector("#ppt-template-id-auto-create-btn")?.addEventListener("click",async()=>{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 Google Slides \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A Google Drive...");try{const i=await GoogleIntegration.sendToAppsScript("createDefaultDailyObservationsPptTemplate",{});if(Loading.hide(),i&&i.success&&i.templateId){const a=e.querySelector("#ppt-template-id-input");a&&(a.value=i.templateId),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0648\u062A\u0637\u0628\u064A\u0642\u0647 \u0628\u0646\u062C\u0627\u062D!"),i.presentationUrl&&window.open(i.presentationUrl,"_blank"),t()}else Notification.error(i?.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A")}catch(i){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",i),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}),e.querySelector("#ppt-template-id-save-btn")?.addEventListener("click",async()=>{const a=(e.querySelector("#ppt-template-id-input")?.value||"").trim();if(!a){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 Template ID");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 Template ID...");try{const s=await GoogleIntegration.sendToAppsScript("setDailyObservationsPptTemplateId",{templateId:a});if(Loading.hide(),s&&s.success){Notification.success("\u062A\u0645 \u062D\u0641\u0638 Template ID \u0628\u0646\u062C\u0627\u062D"),t();const o=document.querySelector(".modal-overlay");!o||o.querySelector("#dailyobs-ppt-export-btn")}else Notification.error(s?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID")}catch(s){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID:",s),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID: "+(s?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}),currentTemplateId&&e.querySelector("#ppt-template-id-test-btn")?.addEventListener("click",async()=>{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template...");try{const i=await GoogleIntegration.sendToAppsScript("getDailyObservationsPptTemplateId",{});Loading.hide(),i&&i.success?Notification.success(`Template \u0635\u062D\u064A\u062D \u0648\u0645\u062A\u0627\u062D: ${i.fileName||i.templateId}`):Notification.error(i?.message||"Template ID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D")}catch(i){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template:",i),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},resetFormState(){this.state.selectedSiteId="",this.state.selectedSiteName="",this.state.availablePlaces=[],this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!1,this.state.customLocationName="",this.state.currentAttachments=[],this.state.editingId=null,this.state.activeModal=null,this.state.isLoadingPlaces=!1},getAllSites(){const t=(Array.isArray(AppState.appData.observationSites)?AppState.appData.observationSites:[]).map((s,o)=>this.normalizeSite(s,o)).filter(Boolean),i=this.DEFAULT_SITES.map((s,o)=>({id:s.id||this.slugify(`${s.name}-${o}`),name:s.name,places:Array.isArray(s.places)?s.places.map((n,r)=>this.normalizePlace(n,r,s.id||s.name)):[]})),a=[...t];return i.forEach(s=>{a.some(o=>o.id===s.id)||a.push(s)}),a},normalizeSite(e,t=0){if(!e)return null;Array.isArray(e.places)||(e.places=[]);const i=e.id||e.siteId||this.slugify(`${e.name||e.title||"site"}-${t}`),a=e.name||e.title||e.label||"";if(!i||!a)return null;const o=(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((n,r)=>this.normalizePlace(n,r,i)).filter(Boolean);return{id:i,name:a,places:o}},normalizePlace(e,t=0,i=""){if(!e)return null;const a=e.id||e.value||e.placeId||this.slugify(`${i||"site"}-place-${t}`),s=e.name||e.label||e.title||e.placeName||e.locationName||"";return!a||!s?null:{id:a,name:s}},slugify(e){return e?String(e).toLowerCase().trim().replace(/[^a-z0-9\\u0600-\\u06FF\\s-]+/g,"").replace(/\\s+/g,"-"):""},async ensureSheetJS(){if(!(typeof XLSX<"u")){if(this.sheetJsPromise){await this.sheetJsPromise;return}this.sheetJsPromise=new Promise((e,t)=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",i.onerror=()=>{i.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",i.onerror=()=>{Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS"),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 Excel. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."),this.sheetJsPromise=null,t(new Error("Failed to load XLSX library"))}},i.onload=()=>e(),document.head.appendChild(i)}),await this.sheetJsPromise}},normalizeComparisonText(e){return String(e||"").trim().toLowerCase().replace(/\s+/g," ").replace(/[^\u0600-\u06FFA-Za-z0-9\s]/g,"")},findSiteMatch(e){if(!e)return null;const t=this.normalizeComparisonText(e);return this.getAllSites().find(i=>this.normalizeComparisonText(i.name)===t)||null},findPlaceMatch(e,t){if(!e||!t)return null;const i=this.normalizeComparisonText(t);return(e.places||[]).find(a=>this.normalizeComparisonText(a.name)===i)||null},normalizeShiftValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0627\u0644\u0623\u0648\u0644\u0649","\u0627\u0644\u0627\u0648\u0644\u0649","first","shift 1","1","one"].includes(i)?"\u0627\u0644\u0623\u0648\u0644\u0649":["\u0627\u0644\u062B\u0627\u0646\u064A\u0629","second","shift 2","2","two"].includes(i)?"\u0627\u0644\u062B\u0627\u0646\u064A\u0629":["\u0627\u0644\u062B\u0627\u0644\u062B\u0629","third","shift 3","3","three"].includes(i)?"\u0627\u0644\u062B\u0627\u0644\u062B\u0629":t},normalizeRiskLevelValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0645\u0646\u062E\u0641\u0636","\u0645\u0646\u062E\u0641\u0636\u0629","low","l"].includes(i)?"\u0645\u0646\u062E\u0641\u0636":["\u0645\u062A\u0648\u0633\u0637","\u0645\u062A\u0648\u0633\u0637\u0629","medium","moderate","m"].includes(i)?"\u0645\u062A\u0648\u0633\u0637":["\u0639\u0627\u0644\u064A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0631\u062A\u0641\u0639","high","h"].includes(i)?"\u0639\u0627\u0644\u064A":t},normalizeObservationTypeValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646","unsafe condition"].includes(i)?"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646":["\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646","unsafe act"].includes(i)?"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":["\u0645\u0642\u062A\u0631\u062D","\u0627\u0642\u062A\u0631\u0627\u062D","suggestion","proposal"].includes(i)?"\u0645\u0642\u062A\u0631\u062D":["\u0623\u062E\u0631\u0649","\u0627\u062E\u0631\u0649","other"].includes(i)?"\u0623\u062E\u0631\u0649":t},parseExcelDateValue(e,{isDateOnly:t=!1}={}){if(e==null||e==="")return"";if(e instanceof Date){if(Number.isNaN(e.getTime()))return"";const c=new Date(e);return t&&c.setHours(0,0,0,0),c.toISOString()}const i=c=>String(c||"").replace(/[٠-٩]/g,d=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d))),a=c=>{if(typeof c!="number"||Number.isNaN(c)||c<1||c>6e5)return"";const d=Math.floor(c),l=c-d,p=new Date(1899,11,30),f=new Date(p.getTime()+d*24*60*60*1e3);if(l>0){const m=Math.round(l*24*60*60),u=Math.floor(m/3600),v=Math.floor(m%3600/60),g=m%60;f.setHours(u,v,g,0)}return Number.isNaN(f.getTime())?"":(t&&f.setHours(0,0,0,0),f.toISOString())};if(typeof e=="number"){if(typeof XLSX<"u"&&XLSX.SSF?.parse_date_code){const d=XLSX.SSF.parse_date_code(e);if(d){const l=new Date(d.y,d.m-1,d.d,d.H||0,d.M||0,Math.floor(d.S||0));if(!Number.isNaN(l.getTime()))return t&&l.setHours(0,0,0,0),l.toISOString()}}const c=a(e);if(c)return c;if(e>1e11){const d=new Date(e);if(!Number.isNaN(d.getTime()))return t&&d.setHours(0,0,0,0),d.toISOString()}}const s=String(e).trim();if(!s)return"";const o=i(s);if(/^\d+(\.\d+)?$/.test(o)){const c=Number(o),d=a(c);if(d)return d;if(c>1e11){const l=new Date(c);if(!Number.isNaN(l.getTime()))return t&&l.setHours(0,0,0,0),l.toISOString()}}let n=o.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/);if(n){const c=Number(n[1]),d=Number(n[2]),l=Number(n[3]),p=Number(n[4]||0),f=Number(n[5]||0),m=Number(n[6]||0),u=new Date(c,d-1,l,p,f,m);if(!Number.isNaN(u.getTime()))return t&&u.setHours(0,0,0,0),u.toISOString()}if(n=o.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/),n){const c=Number(n[1]),d=Number(n[2]);let l=Number(n[3]);l<100&&(l+=2e3);let p=c,f=d;c<=12&&d>12&&(f=c,p=d);const m=Number(n[4]||0),u=Number(n[5]||0),v=Number(n[6]||0),g=new Date(l,f-1,p,m,u,v);if(!Number.isNaN(g.getTime()))return t&&g.setHours(0,0,0,0),g.toISOString()}if(n=o.match(/^(\d{1,2})[\s\-\/\.]([A-Za-z]{3,9})[\s\-\/\.](\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/),n){const c=Number(n[1]),d=String(n[2]||"").toLowerCase();let l=Number(n[3]);l<100&&(l+=l>=70?1900:2e3);const f={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11}[d];if(f!==void 0){const m=Number(n[4]||0),u=Number(n[5]||0),v=Number(n[6]||0),g=new Date(l,f,c,m,u,v);if(!Number.isNaN(g.getTime()))return t&&g.setHours(0,0,0,0),g.toISOString()}}const r=new Date(o);return Number.isNaN(r.getTime())?"":(t&&r.setHours(0,0,0,0),r.toISOString())},lookupSiteName(e){if(!e)return"";const t=this.getAllSites().find(i=>i.id===e);return t?t.name:""},lookupPlaceName(e,t){if(!e||!t)return"";const i=this.getAllSites().find(s=>s.id===e);if(!i)return"";const a=i.places.find(s=>s.id===t);return a?a.name:""},getPlacesForSiteSync(e){if(!e)return[];const t=this.getAllSites().find(s=>s.id===e);if(t&&Array.isArray(t.places)&&t.places.length>0)return t.places;const a=(Array.isArray(AppState.appData.observationSites)?AppState.appData.observationSites:[]).find(s=>s.id===e||s.siteId===e);return a?(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:[]).map((o,n)=>this.normalizePlace(o,n,e)).filter(Boolean):t&&Array.isArray(t.places)?t.places:[]},async fetchPlacesForSite(e){return this.getPlacesForSiteSync(e)},getLoggedInObserverName(){const e=AppState.currentUser||{},t=(e.name||e.fullName||e.displayName||"").toString().trim();if(t)return t;const i=(e.email||"").toString().trim();return i?i.split("@")[0]||i:""},buildObservationOwnerSelectOptionsHtml(e){const t=this.getSafetyTeamMembers(),i=this.getLoggedInObserverName(),a=!e,s=e&&String(e.observerName||"").trim()||"",o=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2014</option>'];if(a&&i){const r=Utils.escapeHTML(i);o.push(`<option value="${r}" selected data-observer-account="1">\u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (${r})</option>`)}const n=new Set;if(a&&i&&n.add(i.toLowerCase()),t.forEach(r=>{const c=(r.name||"").trim();if(!c)return;const d=c.toLowerCase();if(n.has(d))return;n.add(d);const l=Utils.escapeHTML(c),p=!a&&s===c?" selected":"";o.push(`<option value="${l}"${p}>${l}</option>`)}),!a&&s&&!t.some(r=>(r.name||"").trim()===s)){const r=Utils.escapeHTML(s);o.splice(1,0,`<option value="${r}" selected>${r}</option>`)}return o.join("")},getSiteOptions(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData?.dailyObservations)?AppState.appData.dailyObservations:[]).map(s=>this.normalizeRecord(s)),i=[...new Set(t.map(s=>s.siteName).filter(Boolean))].sort();return(Array.isArray(AppState.sites)?AppState.sites.map(s=>s.name||s):Array.isArray(AppState.appData?.sites)?AppState.appData.sites.map(s=>s.name||s):[]).forEach(s=>{s&&typeof s=="string"&&!i.includes(s.trim())&&i.push(s.trim())}),i.sort()},getDepartmentOptions(){const e=new Map,t=o=>{if(!o)return;const n=String(o).trim().replace(/\s+/g," ");if(!n)return;const r=n.toLowerCase().replace(/[أإآ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/[^\w\u0600-\u06FF]/g,"");r&&!e.has(r)&&e.set(r,n)},i=AppState.companySettings||{};return(Array.isArray(i.formDepartments)?i.formDepartments:typeof i.formDepartments=="string"?i.formDepartments.split(/\n|,/).map(o=>o.trim()).filter(Boolean):[]).forEach(t),(Array.isArray(i.departments)?i.departments:typeof i.departments=="string"?i.departments.split(/\n|,/).map(o=>o.trim()).filter(Boolean):[]).forEach(t),Array.isArray(AppState.companySettings?.departments)&&AppState.companySettings.departments.forEach(t),(AppState.appData.employees||[]).forEach(o=>t(o.department)),(AppState.appData.nearmiss||[]).forEach(o=>t(o.department||o.responsibleDepartment)),(AppState.appData.incidents||[]).forEach(o=>t(o.affectedDepartment||o.department)),(AppState.appData.dailyObservations||[]).forEach(o=>t(o.responsibleDepartment)),Array.from(e.values()).filter(Boolean).sort((o,n)=>o.localeCompare(n,"ar"))},getSafetyTeamMembers(){try{if(typeof Training<"u"&&typeof Training.getSafetyTeamMembers=="function")return Training.getSafetyTeamMembers()}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A getSafetyTeamMembers:",e)}return[]},isSystemManager(){if(!AppState.currentUser)return!1;const e=(AppState.currentUser.role||"").toLowerCase();return e==="admin"||e==="\u0645\u062F\u064A\u0631"},getSystemManagers(){const e=[];return(AppState.appData.users||[]).forEach(t=>{const i=(t.role||"").toLowerCase();if(i==="admin"||i==="\u0645\u062F\u064A\u0631"){const a=t.name||t.fullName||t.email||"";a&&e.push({id:t.id||t.email||a,name:a})}}),e.length>0?e:[{id:"admin",name:AppState.currentUser?.name||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"}]},async handleAttachmentSelection(e,t){if(!(!e||e.length===0)){for(const i of Array.from(e)){if(!this.isSupportedAttachmentType(i.type)){Notification.warning(`\u0635\u064A\u063A\u0629 \u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u0629. \u064A\u0633\u0645\u062D \u0641\u0642\u0637 \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0648 PNG \u0648 PDF.`);continue}if(i.size>this.MAX_ATTACHMENT_SIZE){Notification.warning(`\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (10MB).`);continue}try{const a=await this.convertFileToBase64(i);this.state.currentAttachments.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),size:i.size,data:a})}catch(a){Utils.safeError("Failed to process attachment:",a),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}this.updateAttachmentsPreview(t)}},isSupportedAttachmentType(e=""){return e?["image/jpeg","image/png","application/pdf"].some(t=>e.toLowerCase()===t):!0},updateAttachmentsPreview(e){if(!e)return;if(!Array.isArray(this.state.currentAttachments)||this.state.currentAttachments.length===0){e.innerHTML='<p style="text-align: center; color: var(--text-secondary); font-size: 0.9375rem; padding: 1rem;">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A.</p>';const i=e.closest("form");if(i){const a=i.querySelector("#observation-image-row");a&&a.classList.add("hidden")}return}e.innerHTML=this.state.currentAttachments.map(i=>this.buildAttachmentPreviewCard(i)).join("");const t=e.closest("form");if(t){const i=t.querySelector("#observation-image-row"),a=t.querySelector("#observation-image-display");if(i&&a){const s=this.state.currentAttachments.filter(o=>(o.type||"").startsWith("image/"));s.length>0?(i.classList.remove("hidden"),a.innerHTML=s.map(o=>`
                        <div style="display: inline-block; margin: 0.5rem; text-align: center;">
                            <img src="${o.data}" alt="${Utils.escapeHTML(o.name||"")}" style="max-width: 250px; max-height: 200px; border-radius: 12px; border: 2px solid var(--border-color); cursor: pointer; transition: transform 0.3s ease;" onclick="window.open('${o.data}', '_blank')" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.5rem; text-align: center;">${Utils.escapeHTML(o.name||"")}</p>
                        </div>
                    `).join("")):i.classList.add("hidden")}}e.querySelectorAll("[data-remove-attachment]").forEach(i=>{i.addEventListener("click",()=>{const a=i.getAttribute("data-remove-attachment");this.state.currentAttachments=this.state.currentAttachments.filter(s=>s.id!==a),this.updateAttachmentsPreview(e)})}),e.querySelectorAll("[data-open-attachment]").forEach(i=>{i.addEventListener("click",()=>{const a=i.getAttribute("data-open-attachment"),s=this.state.currentAttachments.find(o=>o.id===a);s&&s.data&&window.open(s.data,"_blank")})})},buildAttachmentPreviewCard(e){const t=(e.type||"").startsWith("image/"),i=e.size?`${(e.size/(1024*1024)).toFixed(1)} MB`:"",a=Utils.escapeHTML(e.name||"\u0645\u0631\u0641\u0642 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645");return t?`
                <div class="attachment-item">
                    <img src="${e.data}" alt="${a}" class="attachment-image">
                    <button type="button" data-remove-attachment="${e.id}" class="attachment-remove" aria-label="\u062D\u0630\u0641 \u0627\u0644\u0645\u0631\u0641\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                    <div style="padding: 0.75rem; background: var(--bg-secondary); border-top: 2px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                            <span style="font-size: 0.8125rem; color: var(--text-primary); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${a}</span>
                            ${i?`<span style="font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap;">${i}</span>`:""}
                        </div>
                        <button type="button" data-open-attachment="${e.id}" style="margin-top: 0.5rem; width: 100%; padding: 0.5rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 0.8125rem; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#004C8C'" onmouseout="this.style.background='var(--primary-color, #003865)'">
                            <i class="fas fa-search-plus" style="margin-left: 0.5rem;"></i>\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629
                        </button>
                    </div>
                </div>
            `:`
            <div class="attachment-item" style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem;">
                <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <p style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.25rem 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${a}</p>
                    ${i?`<p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0 0 0.75rem 0;">${i}</p>`:'<p style="margin-bottom: 0.75rem;"></p>'}
                    <div style="display: flex; gap: 0.5rem;">
                        <button type="button" data-open-attachment="${e.id}" style="flex: 1; padding: 0.625rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#004C8C'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='var(--primary-color, #003865)'; this.style.transform='translateY(0)'">
                            <i class="fas fa-eye" style="margin-left: 0.5rem;"></i>\u0639\u0631\u0636
                        </button>
                        <button type="button" data-remove-attachment="${e.id}" style="flex: 1; padding: 0.625rem; background: #ef4444; color: white; border: none; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#dc2626'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#ef4444'; this.style.transform='translateY(0)'">
                            <i class="fas fa-trash" style="margin-left: 0.5rem;"></i>\u062D\u0630\u0641
                        </button>
                    </div>
                </div>
            </div>
        `},normalizeRecord(e={}){if(!e||typeof e!="object")return{id:"",isoCode:"",siteId:"",siteName:"",placeId:"",locationName:"",observationType:"",date:"",shift:"",details:"",correctiveAction:"",responsibleDepartment:"",riskLevel:"",observerName:"",expectedCompletionDate:"",status:"\u0645\u0641\u062A\u0648\u062D",overdays:0,timestamp:"",reviewedBy:"",remarks:"",attachments:[],afterExecutionImages:[],createdAt:"",updatedAt:"",workflowStage:"",submittedBy:"",submittedByEmail:"",submittedAt:"",specialistReviewedBy:"",specialistReviewedAt:"",specialistComments:"",managerApprovedBy:"",managerApprovedAt:"",managerComments:"",departmentActionBy:"",departmentActionAt:"",rejectionReason:"",assignedToName:"",assignedToEmail:""};const t=e.siteId||e.site||e.locationSiteId||"",i=e.placeId||e.locationId||e.place||"",a=e.locationName||e.placeName||e.location||e.customLocationName||"",s=e.dateTime||e.date||e.observationDate||"",o=e.expectedCompletionDate||e.targetCompletionDate||e.dueDate||"",n=e.details||e.description||e.observationDetails||"";let r=e.attachments||e.files||e.images;r?typeof r=="string"?r=[r]:Array.isArray(r)||(r=[r]):r=[];const c=this.normalizeObservationTypeValue(e.observationType||e.type||""),d=this.normalizeShiftValue(e.shift||e.workShift||""),l=this.normalizeRiskLevelValue(e.riskLevel||e.risk||""),p=this.normalizeStatus(e.status);let f=e.afterExecutionImages||[];if(typeof f=="string")try{f=JSON.parse(f)}catch{f=[]}else Array.isArray(f)||(f=[f]);const m=this.parseExcelDateValue(s)||"",u=this.parseExcelDateValue(o,{isDateOnly:!0})||"",v=this.parseExcelDateValue(e.createdAt)||"",g=this.parseExcelDateValue(e.updatedAt||e.modifiedAt||e.createdAt)||"",x=this.parseExcelDateValue(e.timestamp||e.createdAt)||v||new Date().toISOString();let y=e.overdays;if(y==null)if(m){const b=new Date(m);Number.isNaN(b.getTime())?y=0:(y=Math.floor((new Date().getTime()-b.getTime())/(1e3*60*60*24)),y<0&&(y=0))}else y=0;const k=e.id||e.observationId||"",$=e.isoCode||e.code||e.obsNumber||e.observationNumber||e.codeNumber||e.serialNumber||"",h=getObservationIsoCodeFromId(k,$,m);return{id:k,isoCode:h,siteId:t,siteName:e.siteName||this.lookupSiteName(t),placeId:i,locationName:a||this.lookupPlaceName(t,i),observationType:c,date:m,shift:d,details:n,correctiveAction:e.correctiveAction||e.preventiveAction||"",responsibleDepartment:e.responsibleDepartment||e.responsible||e.department||"",riskLevel:l,observerName:e.observerName||e.owner||e.supervisor||"",expectedCompletionDate:u,status:p,overdays:y,timestamp:x,reviewedBy:e.reviewedBy||"",remarks:e.remarks||"",attachments:this.normalizeAttachments(r),afterExecutionImages:f,createdAt:v||x||new Date().toISOString(),updatedAt:g||v||x||new Date().toISOString(),workflowStage:e.workflowStage||"",submittedBy:e.submittedBy||"",submittedByEmail:e.submittedByEmail||"",submittedAt:e.submittedAt||"",specialistReviewedBy:e.specialistReviewedBy||"",specialistReviewedAt:e.specialistReviewedAt||"",specialistComments:e.specialistComments||"",managerApprovedBy:e.managerApprovedBy||"",managerApprovedAt:e.managerApprovedAt||"",managerComments:e.managerComments||"",departmentActionBy:e.departmentActionBy||"",departmentActionAt:e.departmentActionAt||"",rejectionReason:e.rejectionReason||"",assignedToName:e.assignedToName||"",assignedToEmail:e.assignedToEmail||""}},normalizeAttachments(e=[]){return Array.isArray(e)?e.map((t,i)=>this.normalizeAttachment(t,i)).filter(Boolean):e&&typeof e=="object"?[this.normalizeAttachment(e,0)].filter(Boolean):[]},normalizeAttachment(e,t=0){if(!e)return null;let i="",a="",s="",o=0,n="";if(typeof e=="string"){const r=e.match(/^(.+?)\s*-\s*(https?:\/\/.+)$/);r?(a=r[1].trim(),i=r[2].trim()):(i=e,a=`\u0645\u0631\u0641\u0642-${t+1}`),s=this.detectMimeType(a,i),n=Utils.generateId("ATT")}else if(typeof e=="object"){let r=e.data||e.base64||e.url||"";const c=typeof r=="string"?r.match(/^(.+?)\s*-\s*(https?:\/\/.+)$/):null;i=c?c[2].trim():r,a=e.name||(c?c[1].trim():"")||`\u0645\u0631\u0641\u0642-${t+1}`,s=e.type||e.mimeType||this.detectMimeType(a,i),o=e.size||e.fileSize||(i?this.calculateBase64Size(i):0),n=e.id||Utils.generateId("ATT")}return i?{id:n,name:a,type:s,size:o,data:i}:null},detectMimeType(e="",t=""){const i=(e||"").toLowerCase();if(i.endsWith(".pdf"))return"application/pdf";if(i.endsWith(".png"))return"image/png";if(i.endsWith(".jpg")||i.endsWith(".jpeg"))return"image/jpeg";if(this.isDataUrl(t)){const a=t.match(/^data:([^;]+);/);if(a&&a[1])return a[1]}return"application/octet-stream"},calculateBase64Size(e=""){if(!e)return 0;const t=e.split(",")[1]||e,i=(t.match(/=+$/)||[""])[0].length;return t.length*3/4-i},isDataUrl(e=""){return typeof e=="string"&&e.startsWith("data:")},formatDateTimeLocal(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const i=t.getTimezoneOffset();return new Date(t.getTime()-i*6e4).toISOString().slice(0,16)},loadPlacesForSite(e,t,i,a,s,o="",n=""){if(t){this.state.isLoadingPlaces=!0;try{const r=this.getPlacesForSiteSync(e);if(this.state.availablePlaces=r,!r||r.length===0){t.innerHTML='<option value="__custom__">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0645\u0627\u0643\u0646 \u0645\u0633\u062C\u0644\u0629 - \u0623\u062F\u062E\u0644 \u0645\u0643\u0627\u0646\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</option>',t.disabled=!1,t.value="__custom__",this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,n&&(a.value=n,this.state.customLocationName=n),i.classList.remove("hidden"),s.classList.remove("hidden");return}const c=['<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646</option>',...r.map(d=>`
                    <option value="${Utils.escapeHTML(d.id)}" data-name="${Utils.escapeHTML(d.name)}">${Utils.escapeHTML(d.name)}</option>
                `),'<option value="__custom__">\u0645\u0643\u0627\u0646 \u0622\u062E\u0631 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)</option>'];if(t.innerHTML=c.join(""),t.disabled=!1,o&&r.some(d=>d.id===o))t.value=o,this.state.selectedPlaceId=o,s.classList.remove("hidden");else if(!o&&n){const d=r.find(l=>l.name===n);d?(t.value=d.id,this.state.selectedPlaceId=d.id,s.classList.remove("hidden")):(t.value="__custom__",a.value=n,i.classList.remove("hidden"),s.classList.remove("hidden"),this.state.customLocationName=n,this.state.isCustomLocationSelected=!0)}}catch(r){Utils.safeError("Failed to load places:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"),t.innerHTML='<option value="__custom__">\u062D\u062F\u062B \u062E\u0637\u0623 - \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A</option>',t.disabled=!1,t.value="__custom__",this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,i.classList.remove("hidden"),s.classList.remove("hidden")}finally{this.state.isLoadingPlaces=!1}}},getRiskBadgeClass(e=""){switch((this.normalizeRiskLevelValue(e)||"").trim()){case"\u0639\u0627\u0644\u064A":return"danger";case"\u0645\u062A\u0648\u0633\u0637":return"warning";case"\u0645\u0646\u062E\u0641\u0636":return"success";default:return"secondary"}},getStatusBadgeClass(e=""){const i=String(e||"").trim().toLowerCase();return["\u0645\u0641\u062A\u0648\u062D","\u0645\u0641\u062A\u0648\u062D\u0629","\u0645\u062A\u0648\u062D\u0629","open","opened"].includes(i)?"warning":["\u062C\u0627\u0631\u064A","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","in progress","ongoing","progress","active"].includes(i)?"info":["\u0645\u063A\u0644\u0642","\u0645\u062D\u0644\u0648\u0644","\u0645\u062D\u0644\u0648\u0644\u0629","\u0645\u0646\u062C\u0632","\u0645\u0643\u062A\u0645\u0644","closed","done","completed","resolved"].includes(i)?"success":"secondary"},normalizeStatus(e=""){const t=String(e||"").trim();if(!t)return"\u0645\u0641\u062A\u0648\u062D";const i=t.toLowerCase();return["\u0645\u0641\u062A\u0648\u062D","\u0645\u0641\u062A\u0648\u062D\u0629","\u0645\u062A\u0648\u062D\u0629","open","opened"].includes(i)?"\u0645\u0641\u062A\u0648\u062D":["\u062C\u0627\u0631\u064A","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","in progress","ongoing","progress","active"].includes(i)?"\u062C\u0627\u0631\u064A":["\u0645\u063A\u0644\u0642","\u0645\u062D\u0644\u0648\u0644","\u0645\u062D\u0644\u0648\u0644\u0629","\u0645\u0646\u062C\u0632","\u0645\u0643\u062A\u0645\u0644","closed","done","completed","resolved"].includes(i)?"\u0645\u063A\u0644\u0642":t},async showForm(e=null){const t=e?this.normalizeRecord(e):null;this.resetFormState(),t&&(this.state.editingId=t.id,this.state.currentAttachments=Array.isArray(t.attachments)?t.attachments.map(g=>Object.assign({},g)):[]);const i=document.createElement("div");i.className="modal-overlay observation-form-overlay",i.innerHTML=`
            <div class="modal-content observation-form-modal">
                <div class="modal-header observation-form-header">
                    <h2 class="modal-title observation-form-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629"}</h2>
                    <button class="modal-close observation-form-close" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body observation-form-body">
                    <form id="observation-form" class="observation-form space-y-6">
                        <div class="observation-form-step observation-step-1">
                            <div class="step-header">
                                <h3 class="step-title">
                                    <i class="fas fa-map-marker-alt step-icon"></i>
                                    \u0627\u0644\u062E\u0637\u0648\u0629 1: \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0642\u0639
                                </h3>
                                <p class="step-description">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u062B\u0645 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0631\u062A\u0628\u0637 \u0628\u0647 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.</p>
                            </div>
                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label for="observation-site" class="form-label required">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646</label>
                                    <select id="observation-site" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="observation-place" class="form-label required">\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                    <select id="observation-place" class="form-input form-select" required disabled>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B</option>
                                    </select>
                                </div>
                            </div>
                            <div id="custom-location-wrapper" class="form-group hidden">
                                <label for="custom-location-input" class="form-label">\u0645\u0643\u0627\u0646 \u0622\u062E\u0631 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)</label>
                                <input type="text" id="custom-location-input" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 3">
                            </div>
                        </div>

                        <div id="observation-step-2" class="observation-form-step observation-step-2 hidden">
                            <div class="step-header">
                                <h3 class="step-title">
                                    <i class="fas fa-clipboard-list step-icon"></i>
                                    \u0627\u0644\u062E\u0637\u0648\u0629 2: \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629
                                </h3>
                                <p class="step-description">\u0623\u062F\u062E\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u060C \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629.</p>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label for="observation-type" class="form-label required">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                                    <select id="observation-type" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                        ${this.OBSERVATION_TYPES.map(g=>`
                                            <option value="${Utils.escapeHTML(g.value)}">${Utils.escapeHTML(g.label)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="observation-date" class="form-label required">\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                                    <input type="datetime-local" id="observation-date" class="form-input form-datetime" required>
                                </div>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0648\u0631\u062F\u064A\u0629</label>
                                    <select id="observation-shift" class="form-input form-select">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</option>
                                        ${this.SHIFTS.map(g=>`
                                            <option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label required">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                    <select id="observation-risk" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</option>
                                        ${this.RISK_LEVELS.map(g=>`
                                            <option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label required">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</label>
                                    <select id="observation-responsible" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>
                                        ${this.getDepartmentOptions().map(g=>`
                                            <option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label required">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                    <select id="observation-status" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                        ${this.STATUS_OPTIONS.map(g=>`
                                            <option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label" for="observation-owner">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</label>
                                    <select id="observation-owner" class="form-input form-select" aria-describedby="observation-owner-hint">
                                        ${this.buildObservationOwnerSelectOptionsHtml(t)}
                                    </select>
                                    <p id="observation-owner-hint" class="text-xs opacity-80 mt-1" style="color: var(--text-secondary, #64748b);">
                                        ${t?"\u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0633\u0645 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0625\u0646 \u0644\u0632\u0645.":"\u064A\u064F\u0639\u0631\u0636 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B \u0627\u0633\u0645 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u061B \u0627\u062E\u062A\u0631 \u0627\u0633\u0645\u0627\u064B \u0622\u062E\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0625\u0630\u0627 \u0633\u062C\u0651\u0644\u062A \u0646\u064A\u0627\u0628\u0629 \u0639\u0646 \u0632\u0645\u064A\u0644."}
                                    </p>
                                </div>
                                <div class="form-group">
                                    <label for="observation-expected-date" class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630</label>
                                    <input type="date" id="observation-expected-date" class="form-input form-date">
                                </div>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label">Overdays</label>
                                    <input type="text" id="observation-overdays" class="form-input form-readonly" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Timestamp</label>
                                    <input type="text" id="observation-timestamp" class="form-input form-readonly" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label required">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646</label>
                                <textarea id="observation-details" class="form-input form-textarea" rows="5" required placeholder="\u0623\u062F\u062E\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644...">${t?Utils.escapeHTML(t.details||""):""}</textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A</label>
                                <textarea id="observation-corrective" class="form-input form-textarea" rows="5" placeholder="\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0623\u0648 \u0627\u0644\u0645\u0646\u0641\u0630...">${t?Utils.escapeHTML(t.correctiveAction||""):""}</textarea>
                            </div>

                            <div class="form-group">
                                <label for="observation-attachments" class="form-label form-label-file">
                                    <i class="fas fa-paperclip form-label-icon"></i>
                                    \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)
                                </label>
                                <div class="file-input-wrapper">
                                    <input type="file" id="observation-attachments" class="form-input form-file" accept=".jpg,.jpeg,.png,.pdf" multiple>
                                    <div class="file-input-hint">
                                        <i class="fas fa-info-circle"></i>
                                        \u064A\u0645\u0643\u0646 \u0631\u0641\u0639 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0644\u0641 \u0628\u0635\u064A\u063A JPG \u0623\u0648 PNG \u0623\u0648 PDF (\u0628\u062D\u062F \u0623\u0642\u0635\u0649 10MB \u0644\u0643\u0644 \u0645\u0644\u0641)
                                    </div>
                                </div>
                                <div id="observation-attachments-preview" class="attachments-preview"></div>
                            </div>

                            <div id="observation-image-row" class="form-group hidden">
                                <label class="form-label">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629</label>
                                <div id="observation-image-display" class="image-display-container">
                                    <p class="image-display-placeholder">\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0623\u064A \u0635\u0648\u0631\u0629 \u0628\u0639\u062F</p>
                                </div>
                            </div>

                            ${this.isSystemManager()?`
                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label required">Reviewed by</label>
                                    <select id="observation-reviewed-by" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645</option>
                                        ${this.getSystemManagers().map(g=>`
                                            <option value="${Utils.escapeHTML(g.name||g)}">${Utils.escapeHTML(g.name||g)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Remarks (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)</label>
                                <textarea id="observation-remarks" class="form-input form-textarea" rows="4" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0631...">${t?Utils.escapeHTML(t.remarks||""):""}</textarea>
                            </div>
                            `:""}
                        </div>
                    </form>
                </div>
                <div class="modal-footer observation-form-footer">
                    <button type="button" class="btn-secondary observation-btn-cancel" id="cancel-observation-btn">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-observation-btn" class="btn-primary observation-btn-save">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),this.state.activeModal=i;const a=i.querySelector("#observation-form"),s=a.querySelector("#observation-site"),o=a.querySelector("#observation-place"),n=a.querySelector("#custom-location-wrapper"),r=a.querySelector("#custom-location-input"),c=a.querySelector("#observation-attachments"),d=a.querySelector("#observation-attachments-preview"),l=a.querySelector("#observation-step-2"),p=this.getAllSites();if(p.length===0?(s.innerHTML='<option value="">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062A\u0627\u062D\u0629</option>',s.disabled=!0,Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0639\u062F. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")):(s.innerHTML=['<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>',...p.map(g=>`
                <option value="${Utils.escapeHTML(g.id)}">${Utils.escapeHTML(g.name)}</option>
            `)].join(""),s.disabled=!1),!t){const g=a.querySelector("#observation-timestamp");g&&(g.value=Utils.formatDateTime(new Date().toISOString()))}const f=()=>{const g=a.querySelector("#observation-date"),x=a.querySelector("#observation-overdays");if(g&&x&&g.value){const y=new Date(g.value),$=Math.floor((new Date().getTime()-y.getTime())/(1e3*60*60*24));x.value=$>0?`${$} \u064A\u0648\u0645`:"0 \u064A\u0648\u0645"}};if(t){p.some(h=>h.id===t.siteId)&&(s.value=t.siteId,this.state.selectedSiteId=t.siteId,this.state.selectedSiteName=this.lookupSiteName(t.siteId));const g=a.querySelector("#observation-date");g&&t.date&&(g.value=this.formatDateTimeLocal(t.date),f()),a.querySelector("#observation-type").value=t.observationType||"",a.querySelector("#observation-shift").value=t.shift||"",a.querySelector("#observation-risk").value=t.riskLevel||"",a.querySelector("#observation-responsible").value=t.responsibleDepartment||"",a.querySelector("#observation-status").value=t.status||"";const x=a.querySelector("#observation-owner"),y=String(t.observerName||"").trim();if(x&&y){if(!Array.from(x.options).some(h=>h.value===y)){const h=document.createElement("option");h.value=y,h.textContent=y,x.insertBefore(h,x.children[1]||null)}x.value=y}const k=a.querySelector("#observation-overdays");k&&t.overdays!==void 0&&(k.value=`${t.overdays} \u064A\u0648\u0645`);const $=a.querySelector("#observation-timestamp");if($&&($.value=t.timestamp?Utils.formatDateTime(t.timestamp):Utils.formatDateTime(t.createdAt||new Date().toISOString())),this.isSystemManager()){const h=a.querySelector("#observation-reviewed-by");h&&t.reviewedBy&&(h.value=t.reviewedBy);const b=a.querySelector("#observation-remarks");b&&t.remarks&&(b.value=t.remarks)}if(t.expectedCompletionDate){const h=a.querySelector("#observation-expected-date");h&&(h.value=t.expectedCompletionDate.slice(0,10))}if(Array.isArray(t.attachments)&&t.attachments.length>0){this.updateAttachmentsPreview(d);const h=a.querySelector("#observation-image-row"),b=a.querySelector("#observation-image-display");if(h&&b){const C=t.attachments.filter(O=>(O.type||"").startsWith("image/"));C.length>0&&(h.classList.remove("hidden"),b.innerHTML=C.map(O=>`
                            <div class="inline-block m-2">
                                <img src="${O.data}" alt="${Utils.escapeHTML(O.name||"")}" class="max-w-xs max-h-48 rounded border cursor-pointer" onclick="window.open('${O.data}', '_blank')">
                            </div>
                        `).join(""))}}else d.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A.</p>'}else d.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F.</p>';const m=a.querySelector("#observation-date");m&&(m.addEventListener("change",f),m.addEventListener("input",f)),s.addEventListener("change",g=>{const x=g.target.value;if(this.state.selectedSiteId=x,this.state.selectedSiteName=this.lookupSiteName(x),this.state.selectedPlaceId="",this.state.customLocationName="",this.state.isCustomLocationSelected=!1,r.value="",n.classList.add("hidden"),l.classList.add("hidden"),!x){o.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B</option>',o.disabled=!0;return}this.loadPlacesForSite(x,o,n,r,l)}),o.addEventListener("change",g=>{const x=g.target.value;if(!x){this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!1,n.classList.add("hidden"),r.value="",l.classList.add("hidden");return}if(x==="__custom__"){this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,this.state.customLocationName=r.value.trim(),n.classList.remove("hidden"),l.classList.remove("hidden"),r.focus();return}const y=g.target.selectedOptions[0];this.state.selectedPlaceId=x,this.state.isCustomLocationSelected=!1,this.state.customLocationName=y?y.getAttribute("data-name")||y.textContent.trim():"",n.classList.add("hidden"),r.value="",l.classList.remove("hidden")}),c&&c.addEventListener("change",async g=>{await this.handleAttachmentSelection(g.target.files,d),c.value=""});const u=()=>{i.remove(),this.resetFormState()};i.querySelector(".modal-close").addEventListener("click",u),i.querySelector("#cancel-observation-btn").addEventListener("click",u);const v=i.querySelector("#save-observation-btn");v.addEventListener("click",async()=>{if(v&&v.disabled){Notification.warning("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631");return}let g="";v&&(g=v.innerHTML,v.disabled=!0,v.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{await this.handleSubmit(a,t?.id||null,i),v&&(v.disabled=!1,v.innerHTML=g)}catch(x){throw v&&(v.disabled=!1,v.innerHTML=g),x}}),i.addEventListener("click",g=>{g.target===i&&u()}),t&&t.siteId&&(this.loadPlacesForSite(t.siteId,o,n,r,l,t.placeId,t.locationName),t.placeId?(o.value=t.placeId,o.dispatchEvent(new Event("change"))):t.locationName&&(o.value="__custom__",n.classList.remove("hidden"),r.value=t.locationName,this.state.customLocationName=t.locationName,this.state.isCustomLocationSelected=!0,l.classList.remove("hidden")))},async handleSubmit(e,t=null,i){if(!e)return;const a=e.querySelector("#observation-site"),s=e.querySelector("#observation-place"),o=e.querySelector("#custom-location-input"),n=e.querySelector("#observation-type"),r=e.querySelector("#observation-date"),c=e.querySelector("#observation-shift"),d=e.querySelector("#observation-risk"),l=e.querySelector("#observation-responsible"),p=e.querySelector("#observation-status"),f=e.querySelector("#observation-owner"),m=e.querySelector("#observation-expected-date"),u=e.querySelector("#observation-details"),v=e.querySelector("#observation-corrective"),g=e.querySelector("#observation-overdays"),x=e.querySelector("#observation-timestamp"),y=e.querySelector("#observation-reviewed-by"),k=e.querySelector("#observation-remarks"),$=a?.value||"";if(!$){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0642\u0639.");return}let h="",b="";if(!s){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639.");return}const C=s.value;if(!C){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639.");return}if(C==="__custom__"){if(h=(o?.value||"").trim(),!h){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646."),o?.focus();return}b=""}else{b=C;const A=s.selectedOptions[0];h=A?A.getAttribute("data-name")||A.textContent.trim():""}const O=n?.value||"";if(!O){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629.");return}const U=(u?.value||"").trim();if(!U){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629.");return}const I=l?.value||"";if(!I){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.");return}const L=d?.value||"";if(!L){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629.");return}let P=(p?.value||"").trim();if(!t)P="\u0645\u0641\u062A\u0648\u062D";else if(!P){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u0629.");return}const T=r?.value||"";if(!T){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0648\u0642\u062A\u0647\u0627.");return}const E=Utils.dateTimeLocalToISO(T),j=E?new Date(E):new Date(T);if(Number.isNaN(j.getTime())){Notification.warning("\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D.");return}const R=m?.value||"";let Y="";if(R){const A=new Date(R);if(Number.isNaN(A.getTime())){Notification.warning("\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D.");return}Y=new Date(R).toISOString()}const J=new Date().toISOString(),M=t?AppState.appData.dailyObservations.find(A=>A.id===t):null,_=AppState.currentUser||{},q=(f?.value||"").trim()||(t?String(M?.observerName||"").trim():"")||this.getLoggedInObserverName()||"";if(!q){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0633\u0627\u0628\u0643).");return}let D=t,z="";if(t)z=M?.isoCode||getObservationIsoCodeFromId(D);else{const A=await getNextObservationIdFromBackend();A&&A.id?(D=A.id,z=A.isoCode||getObservationIsoCodeFromId(D)):(D=generateDailyObservationId(AppState.appData.dailyObservations||[]),z=getObservationIsoCodeFromId(D))}const B=j,N=Math.floor((new Date().getTime()-B.getTime())/(1e3*60*60*24)),G=N>0?N:0,le=M?.timestamp||J,ce=this.isSystemManager()&&y?y.value||"":M?.reviewedBy||"",me=this.isSystemManager()&&k?(k.value||"").trim():M?.remarks||"";let fe=(this.state.currentAttachments||[]).map(A=>({id:A.id,name:A.name,type:A.type,size:A.size||this.calculateBase64Size(A.data),data:A.data}));const be={id:D,isoCode:z,siteId:$,siteName:this.lookupSiteName($),placeId:b,locationName:h,observationType:O,date:j.toISOString(),shift:c?.value||"",details:U,correctiveAction:(v?.value||"").trim(),responsibleDepartment:I,riskLevel:L,observerName:q,expectedCompletionDate:Y,status:P,overdays:G,timestamp:le,reviewedBy:ce,remarks:me,attachments:fe,createdAt:M?.createdAt||J,updatedAt:J,workflowStage:t&&M?.workflowStage||"pending_specialist",submittedBy:t?M?.submittedBy||"":(_.name||"").trim()||q,submittedByEmail:t?M?.submittedByEmail||"":(_.email||"").trim(),submittedAt:t&&M?.submittedAt||J,specialistReviewedBy:t&&M?.specialistReviewedBy||"",specialistReviewedAt:t&&M?.specialistReviewedAt||"",specialistComments:t&&M?.specialistComments||"",managerApprovedBy:t&&M?.managerApprovedBy||"",managerApprovedAt:t&&M?.managerApprovedAt||"",managerComments:t&&M?.managerComments||"",departmentActionBy:t&&M?.departmentActionBy||"",departmentActionAt:t&&M?.departmentActionAt||"",rejectionReason:t&&M?.rejectionReason||""},K=i.querySelector("#save-observation-btn");K&&(K.disabled=!0,K.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const A=this.normalizeRecord(be);if(t){const te=AppState.appData.dailyObservations.findIndex(ve=>ve.id===t);te!==-1&&(AppState.appData.dailyObservations[te]=A)}else AppState.appData.dailyObservations.push(A);i.remove(),this.resetFormState(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D");const W=this.currentFilter?.filter||null;if(this.loadObservationsList(W),this.isCurrentUserAdmin()){const te=document.getElementById("tab-data-analysis");te&&te.style.display!=="none"&&(this.calculateCardValues(),this.updateAnalysisResults())}this.saveInBackground(be,A,t).catch(te=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",te),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")})}catch(A){K&&(K.disabled=!1,K.innerHTML="\u062D\u0641\u0638"),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",A),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+A.message)}},async saveInBackground(e,t,i){try{let a=!1;if(e.attachments&&Array.isArray(e.attachments)&&e.attachments.length>0){Loading.show("\u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0625\u0644\u0649 Google Drive...");try{Utils.safeLog("DailyObservations: \u0642\u0628\u0644 processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+e.attachments.length),e.attachments.length>0&&Utils.safeLog("DailyObservations: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:e.attachments[0].name,hasData:!!e.attachments[0].data,hasDirectLink:!!e.attachments[0].directLink});const s=await GoogleIntegration.processAttachments?.(e.attachments,"DailyObservations");if(s&&s.length>0){t.attachments=s;const o=AppState.appData.dailyObservations.findIndex(n=>n.id===t.id);o!==-1&&(AppState.appData.dailyObservations[o].attachments=s,a=!0,Utils.safeLog("DailyObservations: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u062C\u0644 - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+s.length),s.forEach((n,r)=>{const c=n.directLink||n.shareableLink;Utils.safeLog(`DailyObservations: \u0627\u0644\u0645\u0631\u0641\u0642 ${r+1}: ${n.name} - \u0631\u0627\u0628\u0637: ${c?c.substring(0,60)+"...":"\u0644\u0627 \u064A\u0648\u062C\u062F \u0631\u0627\u0628\u0637!"}`)}))}Utils.safeLog("DailyObservations: \u0628\u0639\u062F processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+(s?.length||0))}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",s),Notification.warning("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A - \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B")}finally{Loading.hide()}}try{typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?window.DataManager.save():typeof DataManager<"u"&&typeof DataManager.save=="function"?DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",s)}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...");try{await GoogleIntegration.autoSave("DailyObservations",AppState.appData.dailyObservations),!i&&t?.id&&GoogleIntegration.callBackend("notifyObservationWorkflowEvent",{event:"new_pending_specialist",observationId:t.id}).catch(function(){}),a&&(Utils.safeLog("DailyObservations: \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062B\u0629 \u0625\u0644\u0649 Google Sheets"),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0646\u062C\u0627\u062D"))}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",s),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets - \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B")}finally{Loading.hide()}if(!i&&AppState.notificationEmails&&AppState.notificationEmails.length>0)try{this.sendEmailNotifications({type:"\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629",title:`\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629: ${t.observationType}`,message:`\u0627\u0644\u0645\u0648\u0642\u0639: ${t.siteName}
\u0627\u0644\u0645\u0643\u0627\u0646: ${t.locationName}
\u0627\u0644\u0646\u0648\u0639: ${t.observationType}
\u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${t.riskLevel}
\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644: ${t.details?.substring(0,120)}...`,date:Utils.formatDateTime(t.date)})}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",s)}}catch(a){throw Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a),a}},async viewObservation(e){const t=AppState.appData.dailyObservations.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(typeof this.isDailyObservationVisibleToCurrentUser=="function"&&!this.isDailyObservationVisibleToCurrentUser(t)){Notification.error("\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629");return}const i=this.normalizeRecord(t);Utils.safeLog("\u{1F4CE} viewObservation: \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 = "+(i.attachments?.length||0)),Utils.safeLog("\u{1F4CE} viewObservation: \u0639\u062F\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 = "+(i.afterExecutionImages?.length||0));const a=this.createObservationModal(i);document.body.appendChild(a),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(a,{moduleKey:"daily-observations",record:i,recordId:i.id||i.isoCode||""}),this.attachWorkflowPanelListeners(a),this.updateObservationDataFromBackend(e,a).catch(s=>{Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 Backend:",s)})},createObservationModal(e){let t=[],i=[],a=[];try{e.timeLog&&(t=typeof e.timeLog=="string"?JSON.parse(e.timeLog):e.timeLog)}catch{t=[]}try{e.updates&&(i=typeof e.updates=="string"?JSON.parse(e.updates):e.updates)}catch{i=[]}try{e.comments&&(a=typeof e.comments=="string"?JSON.parse(e.comments):e.comments)}catch{a=[]}const s=this.buildWorkflowPathHtml(e),o=this.buildWorkflowBannerHtml(e),n=document.createElement("div");return n.className="modal-overlay",n.setAttribute("data-observation-id",e.id),n.setAttribute("dir","rtl"),n.innerHTML=`
            <div class="modal-content" style="max-width: 900px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; border-radius: 20px 20px 0 0;">
                    <h2 class="modal-title" style="color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: 'Cairo', sans-serif;">
                        <i class="fas fa-clipboard-check" style="font-size: 28px;"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629
                    </h2>
                    <button class="modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642" style="color: white; font-size: 24px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; background: #f8f9fa; max-height: calc(90vh - 200px); overflow-y: auto; direction: rtl; text-align: right;">
                    <div class="space-y-5">
                        <div class="obs-detail-inline-alerts" data-obs-inline-alerts="" role="region" aria-label="\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"></div>
                        ${s}
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.isoCode||"-")}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:</strong>
                                <span class="text-gray-900">${e.date?Utils.formatDateTime(e.date):"-"}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u0645\u0648\u0642\u0639:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.siteName||"-")}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u0645\u0643\u0627\u0646:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.locationName||"-")}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</strong>
                                ${this.canEditObservationFieldsInDetail(e)?`
                                <select id="observation-type-select" class="form-input" style="width: 100%; margin-top: 4px;" onchange="DailyObservations.handleFieldChange('${e.id}', 'observationType', this.value, this)">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639 --</option>
                                    ${this.getObservationTypes().map(r=>`<option value="${r}" ${e.observationType===r?"selected":""}>${r}</option>`).join("")}
                                </select>
                                `:`<span class="text-gray-900">${Utils.escapeHTML(e.observationType||"-")}</span>`}
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u0648\u0631\u062F\u064A\u0629:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.shift||"-")}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong>
                                ${this.canEditObservationFieldsInDetail(e)?`
                                <select id="observation-risk-select" class="form-input" style="width: 100%; margin-top: 4px;" onchange="DailyObservations.handleFieldChange('${e.id}', 'riskLevel', this.value, this)">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0639\u062F\u0644 --</option>
                                    ${this.getRiskLevels().map(r=>`<option value="${r}" ${e.riskLevel===r?"selected":""}>${r}</option>`).join("")}
                                </select>
                                `:`<span class="text-gray-900">${Utils.escapeHTML(e.riskLevel||"-")}</span>`}
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629:</strong>
                                <div class="flex items-center gap-2 mt-2">
                                    ${this.canEditObservationStatusInDetail(e)?`
                                    <select id="observation-status-select" class="form-input" style="flex: 1; min-width: 150px;" onchange="DailyObservations.handleStatusChange('${e.id}', this.value)">
                                        ${this.STATUS_OPTIONS.map(r=>`<option value="${r}" ${e.status===r?"selected":""}>${r}</option>`).join("")}
                                    </select>
                                    `:`<span class="text-gray-900">${Utils.escapeHTML(e.status||"-")}</span>`}
                                <span class="badge badge-${this.getStatusBadgeClass(e.status)}">${Utils.escapeHTML(e.status||"-")}</span>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630:</strong>
                                ${this.canEditObservationFieldsInDetail(e)?`
                                <select id="observation-responsible-select" class="form-input" style="width: 100%; margin-top: 4px;" onchange="DailyObservations.handleFieldChange('${e.id}', 'responsibleDepartment', this.value, this)">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 --</option>
                                    ${this.getDepartments().map(r=>`<option value="${r}" ${e.responsibleDepartment===r?"selected":""}>${r}</option>`).join("")}
                                </select>
                                `:`<span class="text-gray-900">${Utils.escapeHTML(e.responsibleDepartment||"-")}</span>`}
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0639\u064A\u0651\u0646:</strong>
                                <span class="text-gray-900">${e.assignedToName||e.assignedToEmail?Utils.escapeHTML(this.formatAssigneePublicDisplay(e)):"-"}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.observerName||"-")}</span>
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630:</strong>
                                ${this.canEditObservationFieldsInDetail(e)?`
                                <input type="date" id="observation-expected-date-input" class="form-input" style="width: 100%; margin-top: 4px;" value="${e.expectedCompletionDate?e.expectedCompletionDate.split("T")[0]:""}" onchange="DailyObservations.handleFieldChange('${e.id}', 'expectedCompletionDate', this.value, this)" />
                                `:`<span class="text-gray-900">${e.expectedCompletionDate?Utils.formatDate(e.expectedCompletionDate):"-"}</span>`}
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">Overdays:</strong>
                                <span class="text-gray-900">${e.overdays!==void 0?`${e.overdays} \u064A\u0648\u0645`:"-"}</span>
                            </div>
                            ${e.reviewedBy?`
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">Reviewed by:</strong>
                                <span class="text-gray-900">${Utils.escapeHTML(e.reviewedBy)}</span>
                            </div>
                            `:""}
                        </div>

                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <strong class="text-gray-700 block mb-3 text-lg">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</strong>
                            ${this.canEditObservationFieldsInDetail(e)?`
                            <textarea id="observation-details-textarea" class="form-input" style="width: 100%; min-height: 120px; margin-top: 8px; font-family: 'Cairo', sans-serif;" onchange="DailyObservations.handleFieldChange('${e.id}', 'details', this.value, this)">${Utils.escapeHTML(e.details||"")}</textarea>
                            `:`<p class="mt-2 leading-7 bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-800">${Utils.escapeHTML(e.details||"")}</p>`}
                        </div>

                        <div class="bg-white p-5 rounded-lg border border-blue-200 shadow-sm">
                            <strong class="text-blue-700 block mb-3 text-lg">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A:</strong>
                            ${this.canEditObservationFieldsInDetail(e)?`
                            <textarea id="observation-corrective-textarea" class="form-input" style="width: 100%; min-height: 120px; margin-top: 8px; font-family: 'Cairo', sans-serif;" onchange="DailyObservations.handleFieldChange('${e.id}', 'correctiveAction', this.value, this)">${Utils.escapeHTML(e.correctiveAction||"")}</textarea>
                            `:`<p class="mt-2 leading-7 bg-blue-50 border border-blue-200 rounded-lg p-4 whitespace-pre-wrap text-gray-800">${e.correctiveAction?Utils.escapeHTML(e.correctiveAction):'<span class="text-gray-400 italic">\u0644\u0627 \u064A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A \u0645\u0633\u062C\u0644</span>'}</p>`}
                        </div>

                        ${e.remarks?`
                        <div class="bg-white p-5 rounded-lg border border-yellow-200 shadow-sm">
                            <strong class="text-yellow-700 block mb-3 text-lg">Remarks (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645):</strong>
                            <p class="mt-2 leading-7 bg-yellow-50 border border-yellow-200 rounded-lg p-4 whitespace-pre-wrap text-gray-800">${Utils.escapeHTML(e.remarks)}</p>
                        </div>
                        `:""}

                        ${Array.isArray(e.attachments)&&e.attachments.length>0?`
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <strong class="text-gray-700 block mb-3 text-lg">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:</strong>
                            <div data-section="attachments" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                ${e.attachments.map(r=>{const c=(r.type||"").startsWith("image/"),d=Utils.escapeHTML(r.name||"\u0645\u0631\u0641\u0642");return c?`
                                            <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <img src="${r.data}" alt="${d}" class="w-full h-48 object-cover cursor-pointer" onclick="window.open('${r.data}', '_blank')">
                                                <div class="px-3 py-2 bg-gray-50 text-xs text-gray-700">${d}</div>
                                            </div>
                                        `:`
                                        <div class="border rounded-lg p-3 bg-gray-50 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                            <i class="fas fa-file-pdf text-2xl text-red-500"></i>
                                            <div class="flex-1">
                                                <p class="text-sm font-semibold text-gray-800">${d}</p>
                                                <button type="button" class="btn-secondary btn-xs mt-2" onclick="window.open('${r.data}', '_blank')">
                                                    <i class="fas fa-eye ml-1"></i>\u0639\u0631\u0636
                                                </button>
                                            </div>
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                        `:""}

                        <!-- \u2705 \u0642\u0633\u0645 \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 (\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F\u0629) -->
                        ${this._isSafetyManager()||this._isSafetyOfficer()||this.canShowAssignResponsiblePanel(e)?`
                        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-300 shadow-md">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold text-emerald-800" style="font-family: 'Cairo', sans-serif;">
                                    <i class="fas fa-camera ml-2 text-emerald-600"></i>
                                    \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630
                                </h3>
                                <span class="text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full" style="font-family: 'Cairo', sans-serif;">
                                    <i class="fas fa-shield-alt ml-1"></i>
                                    \u0645\u062A\u0627\u062D \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629/\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629
                                </span>
                            </div>

                            <div id="after-execution-photos-container-${e.id}" class="mb-4">
                                ${this._buildAfterExecutionPhotosHtml(e.afterExecutionImages)}
                            </div>

                            <div class="border-t-2 border-emerald-200 pt-4">
                                <label class="block text-sm font-medium text-emerald-800 mb-2" style="font-family: 'Cairo', sans-serif;">
                                    <i class="fas fa-upload ml-1"></i>
                                    \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630
                                </label>
                                <!-- \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 -->
                                <div id="after-execution-preview-container-${e.id}" class="mb-3" style="display: none;">
                                    <div class="relative inline-block">
                                        <img id="after-execution-preview-${e.id}" class="max-w-full h-48 object-contain rounded-lg border-2 border-emerald-300 shadow-sm" style="display: none;" />
                                        <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600" onclick="document.getElementById('after-execution-preview-container-${e.id}').style.display='none'">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <!-- \u062D\u0642\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 - \u0631\u0641\u0639 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 -->
                                <input type="file"
                                       id="after-execution-photo-input-${e.id}"
                                       accept="image/*"
                                       capture="environment"
                                       class="form-input w-full"
                                       style="font-family: 'Cairo', sans-serif;"
                                       onchange="DailyObservations.handleAfterExecutionPhotoUpload('${e.id}', this)" />
                                <p class="text-xs text-emerald-600 mt-2" style="font-family: 'Cairo', sans-serif;">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0639 \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0631\u0641\u0639 \u0648\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645
                                </p>
                            </div>
                        </div>
                        `:""}

                        <!-- \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A -->
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold"><i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (${i.length})</h3>
                                <button class="btn-primary btn-sm" onclick="DailyObservations.showAddUpdateModal('${e.id}')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B
                                </button>
                            </div>
                            ${i.length>0?`
                                <div class="space-y-3">
                                    ${i.map(r=>`
                                        <div class="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-semibold">${Utils.escapeHTML(r.user||"")}</span>
                                                <span class="text-xs text-gray-500">${r.timestamp?Utils.formatDate(r.timestamp):""}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(r.update||"")}</p>
                                            ${r.progress!==void 0?`
                                                <div class="mt-2">
                                                    <div class="flex items-center justify-between text-xs mb-1">
                                                        <span>\u0627\u0644\u062A\u0642\u062F\u0645</span>
                                                        <span>${r.progress}%</span>
                                                    </div>
                                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${r.progress}%"></div>
                                                    </div>
                                                </div>
                                            `:""}
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>'}
                        </div>
                        
                        <!-- \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A -->
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold"><i class="fas fa-comments ml-2"></i>\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${a.length})</h3>
                                <button class="btn-primary btn-sm" onclick="DailyObservations.showAddCommentModal('${e.id}')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642
                                </button>
                            </div>
                            ${a.length>0?`
                                <div class="space-y-3">
                                    ${a.map(r=>`
                                        <div class="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-semibold">${Utils.escapeHTML(r.user||"")}</span>
                                                <span class="text-xs text-gray-500">${r.timestamp?Utils.formatDate(r.timestamp):""}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(r.comment||"")}</p>
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A</p>'}
                        </div>
                        
                        <!-- \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A -->
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <h3 class="text-lg font-semibold mb-4"><i class="fas fa-history ml-2"></i>\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A</h3>
                            ${this.buildObservationTimelineHtml(t)}
                        </div>
                        ${o}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered" style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e5e7eb; border-radius: 0 0 20px 20px;">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="margin: 0 5px;">
                        <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("daily-observations"):""}
                    <button type="button" onclick="DailyObservations.exportPDF('${e.id}');" class="btn-secondary" style="margin: 0 5px;">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    ${this.canDailyObservationsFullAdminUi()?`
                    <button type="button" onclick="DailyObservations.openEditFromDetailModal('${e.id}')" class="btn-primary" style="margin: 0 5px;">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    <button type="button" onclick="DailyObservations.deleteObservation('${e.id}'); this.closest('.modal-overlay').remove();" class="btn-secondary" style="background-color: #dc3545; color: white; border-color: #dc3545; margin: 0 5px;">
                        <i class="fas fa-trash ml-2"></i>\u062D\u0630\u0641
                    </button>
                    `:""}
                </div>
            </div>
        `,n.querySelector(".modal-close").addEventListener("click",()=>n.remove()),n.addEventListener("click",r=>{r.target===n&&n.remove()}),n},async updateObservationDataFromBackend(e,t){try{const i=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null,a=await GoogleIntegration.callBackend("getObservation",{observationId:e,observationsRequestContext:i});if(a.success&&a.data){const s=AppState.appData.dailyObservations.findIndex(n=>n.id===e);s!==-1?AppState.appData.dailyObservations[s]=a.data:AppState.appData.dailyObservations.push(a.data);const o=this.normalizeRecord(a.data);Utils.safeLog("\u{1F4CE} updateObservationDataFromBackend: \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0645\u0646 Backend = "+(o.attachments?.length||0)),Utils.safeLog("\u{1F4CE} updateObservationDataFromBackend: \u0639\u062F\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 = "+(o.afterExecutionImages?.length||0)),t&&t.getAttribute("data-observation-id")===e&&this.updateObservationModalContent(t,o)}else a&&!a.success&&a.message&&this.showObservationDetailInlineAlert(e,"warning",a.message)}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 Backend:",i);const a=i&&i.message?i.message:String(i);this.showObservationDetailInlineAlert(e,"error",a)}},updateObservationModalContent(e,t){try{const i=(o,n)=>{const r=e.querySelector(o);r&&n!==void 0&&n!==null&&(r.textContent=String(n))};i('[data-field="isoCode"]',t.isoCode),i('[data-field="siteName"]',t.siteName),i('[data-field="locationName"]',t.locationName),i('[data-field="observationType"]',t.observationType),i('[data-field="shift"]',t.shift),i('[data-field="riskLevel"]',t.riskLevel),i('[data-field="status"]',t.status),i('[data-field="responsibleDepartment"]',t.responsibleDepartment),i('[data-field="observerName"]',t.observerName),i('[data-field="expectedCompletionDate"]',t.expectedCompletionDate?Utils.formatDate(t.expectedCompletionDate):"-"),i('[data-field="overdays"]',t.overdays!==void 0?`${t.overdays} \u064A\u0648\u0645`:"-"),i('[data-field="details"]',t.details),i('[data-field="correctiveAction"]',t.correctiveAction);const a=e.querySelector('[data-section="attachments"]'),s=a?a.parentElement:null;if(Utils.safeLog("\u{1F4CE} updateObservationModalContent: \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A = "+(t.attachments?.length||0)),Utils.safeLog("\u{1F4CE} updateObservationModalContent: attachmentsSection \u0645\u0648\u062C\u0648\u062F = "+!!a),Array.isArray(t.attachments)&&t.attachments.length>0?a&&(a.innerHTML=`
                            <strong class="text-gray-700 block mb-3 text-lg">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:</strong>
                            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                ${t.attachments.map(o=>{const n=(o.type||"").startsWith("image/"),r=Utils.escapeHTML(o.name||"\u0645\u0631\u0641\u0642");return n?`
                                            <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <img src="${o.data}" alt="${r}" class="w-full h-48 object-cover cursor-pointer" onclick="window.open('${o.data}', '_blank')">
                                                <div class="px-3 py-2 bg-gray-50 text-xs text-gray-700">${r}</div>
                                            </div>
                                        `:`
                                        <div class="border rounded-lg p-3 bg-gray-50 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                            <i class="fas fa-file-pdf text-2xl text-red-500"></i>
                                            <div class="flex-1">
                                                <p class="text-sm font-semibold text-gray-800">${r}</p>
                                                <button type="button" class="btn-secondary btn-xs mt-2" onclick="window.open('${o.data}', '_blank')">
                                                    <i class="fas fa-eye ml-1"></i>\u0639\u0631\u0636
                                                </button>
                                            </div>
                                        </div>
                                    `}).join("")}
                            </div>
                        `,Utils.safeLog("\u2705 updateObservationModalContent: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):s&&(Utils.safeLog("\u2139\uFE0F updateObservationModalContent: \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A\u060C \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0642\u0633\u0645"),s.remove()),t.afterExecutionImages&&Array.isArray(t.afterExecutionImages)){const o=e.querySelector(`#after-execution-photos-container-${t.id}`);o&&(o.innerHTML=this._buildAfterExecutionPhotosHtml(t.afterExecutionImages))}this.updateModalSection(e,"updates",t.updates),this.updateModalSection(e,"comments",t.comments),this.updateModalSection(e,"timeLog",t.timeLog)}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A updateObservationModalContent:",i)}},updateModalSection(e,t,i){},async handleStatusChange(e,t){Loading.show();try{const i=await GoogleIntegration.callBackend("updateObservationStatus",{observationId:e,statusData:{status:t,updatedBy:AppState.currentUser?.name||"System"}});if(i.success){const a=AppState.appData.dailyObservations.findIndex(s=>s.id===e);a!==-1&&(AppState.appData.dailyObservations[a].status=t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0628\u0646\u062C\u0627\u062D"),await this.viewObservation(e)}else{const a=i.message||"\u062D\u062F\u062B \u062E\u0637\u0623";this.showObservationDetailInlineAlert(e,"error",a)||Notification.error(a)}}catch(i){const a="\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||i);this.showObservationDetailInlineAlert(e,"error",a)||Notification.error(a)}finally{Loading.hide()}},refreshUpdatesSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const l=d.querySelector(".modal-title");if(l&&l.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const a=i.querySelectorAll(".bg-white.p-5");let s=null;for(const d of a){const l=d.querySelector("h3");if(l&&l.textContent.includes("\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A")){s=d;break}}if(!s)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;let n=[];try{o.updates&&(n=Array.isArray(o.updates)?o.updates:typeof o.updates=="string"?JSON.parse(o.updates):[])}catch{n=[]}const r=s.querySelector("h3");r&&(r.innerHTML=`<i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (${n.length})`);let c=s.querySelector(".space-y-3");if(c||(c=s.querySelector("p.text-gray-500")),n.length>0){const d=`
                    <div class="space-y-3">
                        ${n.map(l=>`
                            <div class="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-semibold">${Utils.escapeHTML(l.user||"")}</span>
                                    <span class="text-xs text-gray-500">${l.timestamp?Utils.formatDate(l.timestamp):""}</span>
                                </div>
                                <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(l.update||"")}</p>
                                ${l.progress!==void 0?`
                                    <div class="mt-2">
                                        <div class="flex items-center justify-between text-xs mb-1">
                                            <span>\u0627\u0644\u062A\u0642\u062F\u0645</span>
                                            <span>${l.progress}%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${l.progress}%"></div>
                                        </div>
                                    </div>
                                `:""}
                            </div>
                        `).join("")}
                    </div>
                `;if(c)c.tagName==="P"?c.outerHTML=d:c.innerHTML=d;else{const l=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(l){const p=document.createElement("div");p.innerHTML=d,l.insertAdjacentElement("afterend",p)}}}else if(c)c.tagName==="P"?(c.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A",c.className="text-gray-500 text-sm"):c.innerHTML='<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>';else{const d=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(d){const l=document.createElement("p");l.className="text-gray-500 text-sm",l.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A",d.insertAdjacentElement("afterend",l)}}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A:",t)}},refreshCommentsSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const l=d.querySelector(".modal-title");if(l&&l.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const a=i.querySelectorAll(".bg-white.p-5");let s=null;for(const d of a){const l=d.querySelector("h3");if(l&&l.textContent.includes("\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A")){s=d;break}}if(!s)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;let n=[];try{o.comments&&(n=Array.isArray(o.comments)?o.comments:typeof o.comments=="string"?JSON.parse(o.comments):[])}catch{n=[]}const r=s.querySelector("h3");r&&(r.innerHTML=`<i class="fas fa-comments ml-2"></i>\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${n.length})`);let c=s.querySelector(".space-y-3");if(c||(c=s.querySelector("p.text-gray-500")),n.length>0){const d=`
                    <div class="space-y-3">
                        ${n.map(l=>`
                            <div class="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-semibold">${Utils.escapeHTML(l.user||"")}</span>
                                    <span class="text-xs text-gray-500">${l.timestamp?Utils.formatDate(l.timestamp):""}</span>
                                </div>
                                <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(l.comment||"")}</p>
                            </div>
                        `).join("")}
                    </div>
                `;if(c)c.tagName==="P"?c.outerHTML=d:c.innerHTML=d;else{const l=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(l){const p=document.createElement("div");p.innerHTML=d,l.insertAdjacentElement("afterend",p)}}}else if(c)c.tagName==="P"?(c.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A",c.className="text-gray-500 text-sm"):c.innerHTML='<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A</p>';else{const d=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(d){const l=document.createElement("p");l.className="text-gray-500 text-sm",l.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A",d.insertAdjacentElement("afterend",l)}}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A:",t)}},refreshTimeLogSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const l=d.querySelector(".modal-title");if(l&&l.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const a=i.querySelectorAll(".bg-white.p-5");let s=null;for(const d of a){const l=d.querySelector("h3");if(l&&l.textContent.includes("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A")){s=d;break}}if(!s)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;const n=this.buildObservationTimelineHtml(o.timeLog),r=s.querySelector("h3"),c=r?r.nextElementSibling:null;c?c.outerHTML=n:r&&r.insertAdjacentHTML("afterend",n)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A:",t)}},async showAddUpdateModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="update-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u062D\u062F\u064A\u062B *</label>
                            <textarea id="update-text" required class="form-input" rows="4" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u062F\u0645 (%)</label>
                            <input type="number" id="update-progress" class="form-input" min="0" max="100" value="0">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#update-form").addEventListener("submit",async i=>{i.preventDefault();const a=t.querySelector("#update-text").value.trim(),s=parseInt(t.querySelector("#update-progress").value)||0;if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B");return}t.remove();const o=AppState.appData.dailyObservations.findIndex(l=>l.id===e);if(o===-1){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const n=AppState.appData.dailyObservations[o],r={id:"UPD-"+Date.now().toString(),user:AppState.currentUser?.name||"System",update:a,progress:s,timestamp:new Date().toISOString()};let c=[];try{n.updates&&(c=typeof n.updates=="string"?JSON.parse(n.updates):n.updates)}catch{c=[]}c.push(r),n.updates=c;let d=[];try{n.timeLog&&(d=typeof n.timeLog=="string"?JSON.parse(n.timeLog):n.timeLog)}catch{d=[]}d.push({action:"update_added",user:AppState.currentUser?.name||"System",timestamp:new Date().toISOString(),roleLabel:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0641\u064A\u0630",actionDetail:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0639\u0644\u0649 \u0633\u064A\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",note:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0641\u064A\u0630: \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0639\u0644\u0649 \u0633\u064A\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}),n.timeLog=d,n.updatedAt=new Date().toISOString(),this.refreshUpdatesSection(e),this.refreshTimeLogSection(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.callBackend("addObservationUpdate",{observationId:e,user:AppState.currentUser?.name||"System",update:a,progress:s}).catch(l=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",l),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u0646\u062C\u0627\u062D")}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async showAddCommentModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="comment-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0639\u0644\u064A\u0642 *</label>
                            <textarea id="comment-text" required class="form-input" rows="4" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062A\u0639\u0644\u064A\u0642..."></textarea>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#comment-form").addEventListener("submit",async i=>{i.preventDefault();const a=t.querySelector("#comment-text").value.trim();if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0642");return}t.remove();const s=AppState.appData.dailyObservations.findIndex(d=>d.id===e);if(s===-1){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const o=AppState.appData.dailyObservations[s],n={id:"CMT-"+Date.now().toString(),user:AppState.currentUser?.name||"System",comment:a,timestamp:new Date().toISOString()};let r=[];try{o.comments&&(r=typeof o.comments=="string"?JSON.parse(o.comments):o.comments)}catch{r=[]}r.push(n),o.comments=r;let c=[];try{o.timeLog&&(c=typeof o.timeLog=="string"?JSON.parse(o.timeLog):o.timeLog)}catch{c=[]}c.push({action:"comment_added",user:AppState.currentUser?.name||"System",timestamp:new Date().toISOString(),roleLabel:"\u062A\u0639\u0644\u064A\u0642",actionDetail:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",note:"\u062A\u0639\u0644\u064A\u0642: \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"}),o.timeLog=c,o.updatedAt=new Date().toISOString(),this.refreshCommentsSection(e),this.refreshTimeLogSection(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.callBackend("addObservationComment",{observationId:e,user:AppState.currentUser?.name||"System",comment:a}).catch(d=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",d),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D")}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async deleteObservation(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!this.canDailyObservationsFullAdminUi()){Notification.error("\u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}if(!AppState.appData.dailyObservations.find(a=>a.id===e)){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`))try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){Notification.error("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");return}const a=await GoogleIntegration.sendRequest({action:"deleteObservation",data:{observationId:e}});a&&a.success?(AppState.appData.dailyObservations=AppState.appData.dailyObservations.filter(s=>s.id!==e),typeof DataManager<"u"&&typeof DataManager.save=="function"&&await DataManager.save(),this.loadObservationsList(),this.renderStatsCards(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D")):Notification.error(a?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",a);const s=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+s)}},async deleteAllObservations(){if(!this.canDailyObservationsFullAdminUi()){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=(Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).length;if(t===0){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0644\u0644\u062D\u0630\u0641");return}if(!(!confirm(`\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0623\u0646\u062A \u0639\u0644\u0649 \u0648\u0634\u0643 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A!

\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u064A \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647\u0627: ${t}

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.

\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u062A\u0645\u0627\u0645\u0627\u064B \u0645\u0646 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u061F`)||!confirm(`\u26A0\uFE0F \u062A\u0623\u0643\u064A\u062F \u0646\u0647\u0627\u0626\u064A:

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 ${t} \u0645\u0644\u0627\u062D\u0638\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B.

\u0627\u0636\u063A\u0637 "\u0645\u0648\u0627\u0641\u0642" \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0623\u0648 "\u0625\u0644\u063A\u0627\u0621" \u0644\u0644\u0625\u0644\u063A\u0627\u0621.`)))try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){Notification.error("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");return}const s=await GoogleIntegration.sendRequest({action:"deleteAllObservations",data:{}});s&&s.success?(AppState.appData.dailyObservations=[],typeof DataManager<"u"&&typeof DataManager.save=="function"&&await DataManager.save(),this.loadObservationsList(),this.renderStatsCards(),Notification.success(`\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0646\u062C\u0627\u062D (${t} \u0645\u0644\u0627\u062D\u0638\u0629)`)):Notification.error(s?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",s);const o=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: "+o)}},async sendEmailNotifications(e){if(typeof EmailDispatch<"u"&&await EmailDispatch.ensureCanManualSend("daily-observations")){const i=e&&typeof e=="object"?e:{};EmailDispatch.openSendModal({moduleKey:"daily-observations",recordId:i.id||i.isoCode||"",title:EmailDispatch.getModuleLabel("daily-observations"),fields:EmailDispatch.fieldsFromRecord("daily-observations",i)});return}typeof Notification<"u"&&Notification.warning("\u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646 \u0634\u0627\u0634\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u060C \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F.")},showExportExcelModal(){const e=document.createElement("div");e.className="modal-overlay active",e.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const t=this.getDepartmentOptions(),i=this.getSiteOptions();e.innerHTML=`
            <div style="max-width: 580px; width: 92%; background: #ffffff; border-radius: 24px; padding: 28px 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(226, 232, 240, 0.8); font-family: Cairo, Tahoma, sans-serif;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                            <i class="fas fa-file-excel"></i>
                        </div>
                        <div>
                            <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0644\u0649 Excel</h3>
                            <p style="font-size: 12px; color: #64748b; margin: 2px 0 0 0;">\u062D\u062F\u062F \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0644\u0641</p>
                        </div>
                    </div>
                    <button type="button" class="modal-close" style="width: 32px; height: 32px; border-radius: 50%; border: none; background: #f1f5f9; color: #64748b; font-size: 16px; cursor: pointer;">&times;</button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (Status) <span style="color: #dc2626;">*</span></label>
                        <select id="dailyobs-excel-status" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-weight: 700; color: #15803d; background: #ffffff; outline: none;">
                            <option value="all" selected>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0648\u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0648\u0627\u0644\u0642\u0627\u0626\u0645\u0629)</option>
                            <option value="open">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0641\u0642\u0637 (Open Only)</option>
                            <option value="closed">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0641\u0642\u0637 (Closed Only)</option>
                            <option value="in_progress">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u0642\u0637 (In Progress)</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</label>
                            <select id="dailyobs-excel-site" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13px; color: #0f172a; background: #ffffff; outline: none;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 / \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>
                                ${i.map(s=>`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                            <select id="dailyobs-excel-department" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13px; color: #0f172a; background: #ffffff; outline: none;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                                ${t.map(s=>`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px;">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E - \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <div style="display: flex; gap: 10px;">
                            <input id="dailyobs-excel-from-date" type="date" style="width: 50%; padding: 9px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 12px;">
                            <input id="dailyobs-excel-to-date" type="date" style="width: 50%; padding: 9px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 12px;">
                        </div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                    <button type="button" id="dailyobs-excel-cancel-btn" style="padding: 10px 20px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer;">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="dailyobs-excel-export-btn" style="display: flex; align-items: center; gap: 8px; padding: 10px 24px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; font-size: 14px; font-weight: 700; border-radius: 10px; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
                        <i class="fas fa-file-excel"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",a),e.querySelector("#dailyobs-excel-cancel-btn")?.addEventListener("click",a),e.addEventListener("click",s=>{s.target===e&&a()}),e.querySelector("#dailyobs-excel-export-btn")?.addEventListener("click",async()=>{const s=e.querySelector("#dailyobs-excel-status")?.value||"all",o=(e.querySelector("#dailyobs-excel-site")?.value||"").trim(),n=(e.querySelector("#dailyobs-excel-department")?.value||"").trim(),r=e.querySelector("#dailyobs-excel-from-date")?.value||"",c=e.querySelector("#dailyobs-excel-to-date")?.value||"";a(),await this.exportExcel({status:s,siteName:o,department:n,fromDate:r,toDate:c})})},async exportExcel(e={}){(!e||typeof e!="object")&&(e={});const{status:t="all",siteName:i="",department:a="",fromDate:s="",toDate:o=""}=e,n=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(n.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u064A\u0648\u0645\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}if(typeof XLSX>"u")try{await this.ensureSheetJS()}catch{return}try{const r=n.map(g=>this.normalizeRecord(g)),c=s?new Date(s):null,d=o?new Date(o):null,l=r.filter(g=>{if(i&&String(g.siteName||"").trim()!==String(i).trim()||a&&String(g.responsibleDepartment||"").trim()!==a||t==="open"&&g.status==="\u0645\u063A\u0644\u0642"||t==="closed"&&g.status!=="\u0645\u063A\u0644\u0642"||t==="in_progress"&&g.status!=="\u062C\u0627\u0631\u064A"&&g.status!=="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")return!1;if(!c&&!d)return!0;const x=g.date?new Date(g.date):null;return!(!x||Number.isNaN(x.getTime())||c&&x<new Date(c.getFullYear(),c.getMonth(),c.getDate())||d&&x>new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59,999))});if(l.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629.");return}const p=l.map(g=>({"\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":g.isoCode||g.code||g.id||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639":g.siteName||"","\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639":g.locationName||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":g.observationType||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A":g.date?Utils.formatDateTime(g.date):"",\u0627\u0644\u0648\u0631\u062F\u064A\u0629:g.shift||"","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":g.details||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A":g.correctiveAction||"","\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630":g.responsibleDepartment||"","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":g.riskLevel||"","\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":g.observerName||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630":g.expectedCompletionDate?Utils.formatDate(g.expectedCompletionDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:g.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(g.attachments)?g.attachments.length:0,"\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(g.attachments)?g.attachments.map(x=>x.name).join(", "):""})),f=XLSX.utils.book_new(),m=XLSX.utils.json_to_sheet(p);XLSX.utils.book_append_sheet(f,m,"DailyObservations");const v=`Daily_Observations${t==="open"?"_Open":t==="closed"?"_Closed":""}_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(f,v),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${l.length} \u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D.`)}catch(r){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0625\u0644\u0649 Excel:",r),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629: "+r.message)}},async showImportExcelModal(){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0645\u0646 \u0645\u0644\u0641 Excel</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800 mb-2"><strong>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:</strong></p>
                        <p class="text-sm text-blue-700">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 (\u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0623\u0648 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629):</p>
                        <ul class="text-sm text-blue-700 list-disc mr-6 mt-2 space-y-1">
                            <li>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 / Site Name</li>
                            <li>\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 / Location</li>
                            <li>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / Observation Type</li>
                            <li>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / Observation Date (\u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0639 \u0627\u0644\u0648\u0642\u062A)</li>
                            <li>\u0627\u0644\u0648\u0631\u062F\u064A\u0629 / Shift</li>
                            <li>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / Details</li>
                            <li>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / Corrective Action</li>
                            <li>\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 / Responsible Department</li>
                            <li>\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 / Risk Level</li>
                            <li>\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / Observer Name</li>
                            <li>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630 / Expected Completion Date</li>
                            <li>\u0627\u0644\u062D\u0627\u0644\u0629 / Status</li>
                            <li>\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</li>
                        </ul>
                        <p class="text-xs text-blue-700 mt-3">\u0625\u0630\u0627 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0633\u0645\u0627\u0621 \u0645\u0648\u0627\u0642\u0639/\u0623\u0645\u0627\u0643\u0646 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0633\u064A\u062A\u0645 \u0631\u0628\u0637\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u060C \u0648\u0625\u0644\u0627 \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0623\u0633\u0645\u0627\u0621 \u0643\u0645\u0627 \u0647\u064A.</p>
                    </div>
                    <div>
                        <label for="observation-excel-file-input" class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls)
                        </label>
                        <input type="file" id="observation-excel-file-input" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="observation-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641):</h3>
                        <div class="max-h-60 overflow-auto border rounded">
                            <table class="data-table text-xs">
                                <thead id="observation-preview-head"></thead>
                                <tbody id="observation-preview-body"></tbody>
                            </table>
                        </div>
                        <p id="observation-preview-count" class="text-sm text-gray-600 mt-2"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="observation-import-confirm-btn" class="btn-primary" disabled>
                        <i class="fas fa-upload ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e);const t=e.querySelector("#observation-excel-file-input"),i=e.querySelector("#observation-import-confirm-btn"),a=e.querySelector("#observation-import-preview"),s=e.querySelector("#observation-preview-head"),o=e.querySelector("#observation-preview-body"),n=e.querySelector("#observation-preview-count");let r=[];const c=()=>{r=[],a&&a.classList.add("hidden"),s&&(s.innerHTML=""),o&&(o.innerHTML=""),n&&(n.textContent=""),i&&(i.disabled=!0)};e.addEventListener("click",l=>{l.target===e&&e.remove()});const d=async l=>{const p=l.target.files?.[0];if(c(),!!p){if(typeof XLSX>"u")try{await this.ensureSheetJS()}catch{return}try{Loading.show();const f=await this.readObservationExcelFile(p);r=f,this.renderObservationImportPreview(f,{previewContainer:a,previewHead:s,previewBody:o,previewCount:n,confirmBtn:i}),Loading.hide()}catch(f){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",f),Notification?.error?.("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+f.message)}}};t&&t.addEventListener("change",d),i?.addEventListener("click",async()=>{if(r.length===0){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}await this.processImportedObservations(r,e)})},async readObservationExcelFile(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=s=>{try{const o=new Uint8Array(s.target.result),n=XLSX.read(o,{type:"array"}),r=n.SheetNames[0],c=n.Sheets[r],d=XLSX.utils.sheet_to_json(c,{defval:""});if(!Array.isArray(d)||d.length===0){i(new Error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629."));return}t(d)}catch(o){i(o)}},a.onerror=i,a.readAsArrayBuffer(e)})},renderObservationImportPreview(e,{previewContainer:t,previewHead:i,previewBody:a,previewCount:s,confirmBtn:o}){if(!Array.isArray(e)||e.length===0){Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u0645\u0644\u0641.");return}const n=Object.keys(e[0]);i&&(i.innerHTML=`<tr>${n.map(r=>`<th class="px-2 py-1">${Utils.escapeHTML(String(r))}</th>`).join("")}</tr>`),a&&(a.innerHTML=e.slice(0,5).map(r=>`
                <tr>
                    ${n.map(c=>`<td class="px-2 py-1">${Utils.escapeHTML(String(r[c]??""))}</td>`).join("")}
                </tr>
            `).join("")),s&&(s.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${e.length}`),t?.classList.remove("hidden"),o&&(o.disabled=!1)},async processImportedObservations(e,t){if(!Array.isArray(e)||e.length===0){Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}Array.isArray(AppState.appData.dailyObservations)||(AppState.appData.dailyObservations=[]),Loading.show();let i=0,a=0;const s=[];try{for(let o=0;o<e.length;o+=1){const n=e[o];try{if(!Object.values(n||{}).some(l=>String(l||"").trim().length>0)){a+=1;continue}const c=await this.mapImportedObservationRow(n);if(!c){a+=1,s.push(`\u0635\u0641 ${o+2}: \u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`);continue}if(AppState.appData.dailyObservations.find(l=>{const p=this.normalizeRecord(l);return c.isoCode&&p.isoCode&&c.isoCode===p.isoCode?!0:p.id===c.id})){a+=1;continue}AppState.appData.dailyObservations.push(c),i+=1}catch(r){a+=1;const c=r.message||r.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";s.push(`\u0635\u0641 ${o+2}: ${c}`),Utils.safeWarn(`\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0635\u0641 ${o+2}:`,r)}}}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",o),s.push(`\u062E\u0637\u0623 \u0639\u0627\u0645: ${o.message||o.toString()}`)}try{if(i>0){try{typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?window.DataManager.save():typeof DataManager<"u"&&typeof DataManager.save=="function"?DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",o)}try{await GoogleIntegration.autoSave("DailyObservations",AppState.appData.dailyObservations)}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",o)}}}catch(o){Utils.safeError("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",o),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0639\u0636 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0643\u0646 \u0641\u0634\u0644 \u062D\u0641\u0638\u0647\u0627: "+(o.message||o.toString()))}if(Loading.hide(),i>0?Notification?.success?.(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629${a?`\u060C \u0648\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 ${a} \u0635\u0641`:""}.`):a>0&&Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u064A \u0635\u0641 \u0628\u0633\u0628\u0628 \u0623\u062E\u0637\u0627\u0621 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A."),s.length>0){Utils.safeWarn("\u0623\u062E\u0637\u0627\u0621 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",s);const o=s.slice(0,5).join(`
`);Notification?.error?.(`\u0623\u062E\u0637\u0627\u0621 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:
${o}${s.length>5?`
...`:""}`)}t.remove(),this.resetFormState(),this.loadObservationsList()},async mapImportedObservationRow(e){if(!e||typeof e!="object")return null;const t=new Map,i=new Map;Object.entries(e||{}).forEach(([D,z])=>{if(D==null)return;const B=String(D).trim();B&&(t.set(B,z),i.set(B.toLowerCase(),z))});const a=D=>{for(const z of D){const B=String(z||"").trim();if(!B)continue;if(t.has(B)){const N=t.get(B),G=N==null?"":String(N).trim();if(G)return G}const V=B.toLowerCase();if(i.has(V)){const N=i.get(V),G=N==null?"":String(N).trim();if(G)return G}}return""},s=D=>{for(const z of D){const B=String(z||"").trim();if(!B)continue;if(t.has(B)){const N=t.get(B);if(N!=null&&String(N).trim()!=="")return N}const V=B.toLowerCase();if(i.has(V)){const N=i.get(V);if(N!=null&&String(N).trim()!=="")return N}}return""},o=D=>{if(D==null)return[];if(typeof D=="object"){const G=D?.url||D?.link||D?.href||D?.hyperlink||D?.l?.Target||D?.l?.target||D?.Target||D?.target||D?.v||D?.text||"";return G&&typeof G=="string"?o(G):[]}const z=String(D||"").trim();if(!z)return[];const B=[],V=/https?:\/\/[^\s"'<>]+/gi;let N;for(;(N=V.exec(z))!==null;){const le=N[0].replace(/[)\],.;،؛]+$/g,"").trim();le&&B.push(le)}return Array.from(new Set(B))},n=(D,z="\u0645\u0631\u0641\u0642")=>{const B=o(D);return B.length?B.map((V,N)=>{const G=this.detectMimeType(V,V),le=G==="application/pdf"?".pdf":G==="image/png"?".png":G==="image/jpeg"?".jpg":"";return{id:Utils.generateId("ATT"),name:`${z}-${N+1}${le}`,type:G,size:0,data:V}}):[]},r=a(["\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0643\u0648\u062F ISO","ISO","ISO Code","Code"]);let c=a(["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639/ \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646","Site","Site Name","Site / Location","Site/Location","Site/Location Name","Site Location","Site Location Name","Location Site","Location/Site"]);const d=a(["\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0646\u0637\u0642\u0629","Location","Location Name","Place","Area","Place Name"]),l=a(["\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062A\u0635\u0631\u0641","Observation Type","Observation Type / Category","Type","Observation","Observation Category"]);let p=a(["\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629/\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u0627\u0644\u0648\u0635\u0641","\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","Details","Observation Details","Observation Detail","Observation/Unsafe Act Details","Observation / Unsafe Act Details","Description","Observation Description","Description of Observation","Unsafe Act Details","Observation / Unsafe Act Description"]);const f=a(["\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A/ \u0627\u0644\u0648\u0642\u0627\u0626\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0648\u0642\u0627\u0626\u064A","Corrective Action","Preventive Action","Corrective/Preventive Action","Corrective & Preventive Action"]),m=a(["\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629","Responsible Department","Responsible Dept","Department","Responsible","Responsible Person","Responsible for Implementation"]),u=a(["\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","\u062F\u0631\u062C\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","Risk Level","Risk","Risk Rating","Risk Level Rating"]),v=a(["\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u0645\u0644\u0627\u062D\u0638","\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","Observer Name","Observer","Reporter Name"]),g=a(["\u0627\u0644\u062D\u0627\u0644\u0629","Status","Observation Status"]),x=a(["\u0627\u0644\u0648\u0631\u062F\u064A\u0629","Shift","Shift Name"]),y=s(["\u0637\u0627\u0628\u0639 \u0632\u0645\u0646\u064A","Timestamp","Time Stamp","time stamp","\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0625\u062F\u062E\u0627\u0644","Entry Timestamp"]),k=s(["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A","Observation Date","Observation DateTime","Date","DateTime"])||y,$=s(["\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630","Expected Completion Date","Due Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639","Expected Date"]),h=s(["\u0627\u0644\u0635\u0648\u0631\u0647 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0635\u0648\u0631\u0647","\u0635\u0648\u0631\u0629","Image","Image URL","Image Url","Photo","Photo URL","Attachment","Attachments","\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A","\u0645\u0631\u0641\u0642","\u0627\u0644\u0631\u0627\u0628\u0637","\u0631\u0627\u0628\u0637","Link","URL","Drive Link","Google Drive Link"]);if(!c&&!p){if(!Object.values(e).some(z=>String(z||"").trim().length>3))throw new Error("\u0627\u0644\u0635\u0641 \u064A\u0641\u062A\u0642\u0631 \u0625\u0644\u0649 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 (\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629).");c||(c="\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p||(p="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644")}const b=this.findSiteMatch(c),C=b?b.id:"",O=b?b.name:c,U=b?this.findPlaceMatch(b,d):null,I=U?U.id:"",L=U?U.name:d;let P=this.normalizeObservationTypeValue(l);const T=this.normalizeShiftValue(x),E=this.normalizeRiskLevelValue(u);let j=this.normalizeStatus(g);const R=this.parseExcelDateValue(k)||this.parseExcelDateValue(y)||new Date().toISOString(),Y=this.parseExcelDateValue($,{isDateOnly:!0}),J=n(h,"\u0631\u0627\u0628\u0637");p||(p="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644"),P||(P="\u0623\u062E\u0631\u0649"),j||(j="\u0645\u0641\u062A\u0648\u062D");let M="",_="";if(r)M=String(r).match(/^OBS-\d{6}-(\d+)$/i)?"DOB-"+String(r).match(/^OBS-\d{6}-(\d+)$/i)[1]:generateDailyObservationId(AppState.appData.dailyObservations||[]),_=r;else{const D=await getNextObservationIdFromBackend();D&&D.id?(M=D.id,_=D.isoCode||getObservationIsoCodeFromId(M)):(M=generateDailyObservationId(AppState.appData.dailyObservations||[]),_=getObservationIsoCodeFromId(M))}const H=new Date().toISOString(),q={id:M,isoCode:_,siteId:C,siteName:O,placeId:I,locationName:L,observationType:P,date:R||H,shift:T,details:p,correctiveAction:f,responsibleDepartment:m,riskLevel:E,observerName:v,expectedCompletionDate:Y,status:j,attachments:J,createdAt:H,updatedAt:H};return this.normalizeRecord(q)},async exportPDF(e){const t=AppState.appData.dailyObservations.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeRecord(t);try{Loading.show();const a=i.isoCode||(i.id?getObservationIsoCodeFromId(i.id):"")||"OBS-UNKNOWN",s="\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629",o=[],n=[];Array.isArray(i.attachments)&&i.attachments.length>0&&i.attachments.forEach(m=>{const u=(m.type||"").startsWith("image/")||(m.name||"").match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i),v=m.shareableLink||m.directLink||m.cloudLink?.url||m.data||"";u&&v?o.push({src:v,name:Utils.escapeHTML(m.name||"\u0635\u0648\u0631\u0629")}):n.push({name:Utils.escapeHTML(m.name||"\u0645\u0631\u0641\u0642"),link:v||m.data||""})});let r="";o.length>0&&(r=`
                    <div class="section-title" style="margin-top: 20px; margin-bottom: 15px; font-size: 16px; font-weight: 600;">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u0627\u0644\u0635\u0648\u0631):</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        ${o.map((m,u)=>`
                            <div style="border: 2px solid #ddd; border-radius: 8px; padding: 10px; background: #f9f9f9; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <img src="${m.src}" alt="${m.name}" style="max-width: 100%; max-height: 250px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;">
                                <p style="margin-top: 8px; font-size: 12px; color: #666; word-break: break-word;">${m.name}</p>
                            </div>
                        `).join("")}
                    </div>
                `);let c="";n.length>0&&(c=`
                    <div class="section-title" style="margin-top: 20px; margin-bottom: 15px; font-size: 16px; font-weight: 600;">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u0645\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649):</div>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                        ${n.map(m=>`
                            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; background: #f9f9f9;">
                                <i class="fas fa-file ml-2"></i>
                                <span>${m.name}</span>
                                ${m.link?`<a href="${m.link}" target="_blank" style="margin-right: 10px; color: #3b82f6; text-decoration: none;">\u0639\u0631\u0636</a>`:""}
                            </div>
                        `).join("")}
                    </div>
                `);const d=r+c,l=`
                    <table>
                        <tr><th>\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th><td>${Utils.escapeHTML(i.isoCode||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639</th><td>${Utils.escapeHTML(i.siteName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0643\u0627\u0646</th><td>${Utils.escapeHTML(i.locationName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th><td>${i.date?Utils.formatDateTime(i.date):"-"}</td></tr>
                        <tr><th>\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th><td>${Utils.escapeHTML(i.observationType||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0648\u0631\u062F\u064A\u0629</th><td>${Utils.escapeHTML(i.shift||"")}</td></tr>
                    <tr><th>\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</th><td>${Utils.escapeHTML(i.riskLevel||"")}</td></tr>
                        <tr><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><td>${Utils.escapeHTML(i.status||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th><td>${Utils.escapeHTML(i.responsibleDepartment||"")}</td></tr>
                    <tr><th>\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</th><td>${Utils.escapeHTML(i.observerName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630</th><td>${i.expectedCompletionDate?Utils.formatDate(i.expectedCompletionDate):"-"}</td></tr>
                    </table>
                    
                <div class="section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:</div>
                <div class="description">${Utils.escapeHTML(i.details||"")}</div>
                    
                    ${i.correctiveAction?`
                    <div class="section-title">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A:</div>
                        <div class="description">${Utils.escapeHTML(i.correctiveAction)}</div>
                    `:""}
                    
                    ${d}
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,s,l,!1,!0,{qrData:JSON.stringify({id:i.id,type:"DailyObservation"})},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629</title></head><body dir="rtl" style="font-family: Arial, sans-serif;">${l}</body></html>`,f=Utils.printHtmlContent("\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629",p);Loading.hide(),f||Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631.")}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}},async convertFileToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},async convertImageToBase64(e){return this.convertFileToBase64(e)},extractCleanPlacesList(e){if(!e)return[];let t=[];if(Array.isArray(e))t=e;else if(typeof e=="string")try{const i=JSON.parse(e);Array.isArray(i)?t=i:t=e.split(/[\n,]/)}catch{t=e.split(/[\n,]/)}return t.map(i=>{if(!i)return"";if(typeof i=="string"){const a=i.trim();if(a.startsWith("{")&&a.endsWith("}"))try{const s=JSON.parse(a);return String(s.name||s.placeName||s.locationName||s.place||s.label||s.id||"").trim()}catch{}return a}return typeof i=="object"?String(i.name||i.placeName||i.locationName||i.place||i.label||i.title||i.id||"").trim():String(i).trim()}).filter(i=>i&&i!=="[object Object]")},exportPublicConfigToLocalStorage(){try{const e=[];if((AppState.appData?.observationSites||[]).forEach(n=>{const r=String(n.name||n.siteName||n).trim(),c=this.extractCleanPlacesList(n.places);r&&!e.some(d=>d.name===r)&&e.push({name:r,places:c})}),e.length===0&&Array.isArray(AppState.appData?.dailyObservations)){const n={};AppState.appData.dailyObservations.forEach(r=>{const c=String(r.siteName||r.site||"").trim(),d=String(r.locationName||r.placeId||r.place||"").trim();c&&d&&d!=="[object Object]"&&(n[c]||(n[c]=[]),n[c].includes(d)||n[c].push(d))}),Object.keys(n).forEach(r=>e.push({name:r,places:n[r]}))}const i=typeof this.getDepartmentOptions=="function"?this.getDepartmentOptions():[],s=(typeof this.getSafetyTeamMembers=="function"?this.getSafetyTeamMembers():[]).map(n=>({name:n.name||n.fullName||n,role:n.role||n.jobTitle||"\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629"})).filter(n=>n.name),o={success:!0,sites:e,departments:i,safetyMembers:s,observationTypes:[{value:"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0622\u0645\u0646\u0629",label:"\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0622\u0645\u0646\u0629"},{value:"\u0633\u0644\u0648\u0643 \u0622\u0645\u0646 \u0648\u0625\u064A\u062C\u0627\u0628\u064A",label:"\u0633\u0644\u0648\u0643 \u0622\u0645\u0646 \u0648\u0625\u064A\u062C\u0627\u0628\u064A"},{value:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629",label:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629"},{value:"\u062E\u0637\u0631 \u062D\u0631\u064A\u0642",label:"\u062E\u0637\u0631 \u062D\u0631\u064A\u0642"},{value:"\u0623\u062E\u0631\u0649",label:"\u0623\u062E\u0631\u0649"}],shifts:["\u0648\u0631\u062F\u064A\u0629 \u0635\u0628\u0627\u062D\u064A\u0629","\u0648\u0631\u062F\u064A\u0629 \u0645\u0633\u0627\u0626\u064A\u0629","\u0648\u0631\u062F\u064A\u0629 \u0644\u064A\u0644\u064A\u0629"],riskLevels:[{value:"\u0645\u0646\u062E\u0641\u0636",label:"\u0645\u0646\u062E\u0641\u0636"},{value:"\u0645\u062A\u0648\u0633\u0637",label:"\u0645\u062A\u0648\u0633\u0637"},{value:"\u0639\u0627\u0644\u064A",label:"\u0639\u0627\u0644\u064A"},{value:"\u062D\u0631\u062C",label:"\u062D\u0631\u062C"}]};(e.length>0||i.length>0)&&localStorage.setItem("HSE_PUBLIC_OBS_CONFIG",JSON.stringify(o))}catch{}},openPublicQrModal(){this.exportPublicConfigToLocalStorage();let t=(window.location.origin||window.location.protocol+"//"+window.location.host)+window.location.pathname.replace(/\/index\.html$/i,"").replace(/\/$/,"")+"/public-observation.html";const i=this.state&&this.state.sites?this.state.sites:AppState.appData.observationSites||[],a=typeof this.getSafetyTeamMembers=="function"?this.getSafetyTeamMembers():[],s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 620px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); display: flex; align-items: center; justify-content: center; color: #60a5fa; font-size: 1.25rem;">
                            <i class="fas fa-qrcode"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u0631\u0627\u0628\u0637 \u0648\u0631\u0645\u0632 QR \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">\u062A\u0633\u062C\u064A\u0644 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0648\u0631\u0628\u0637\u0647\u0627 \u0628\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0645\u0641\u062A\u0634\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #94a3b8; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <!-- \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062E\u0635\u064A\u0635: \u0627\u0644\u0645\u0635\u0646\u0639 + \u0627\u0644\u0645\u0641\u062A\u0634 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-industry ml-1 text-blue-500"></i> \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:
                            </label>
                            <select id="qr-factory-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u2014</option>
                                ${(i||[]).map(m=>`<option value="${Utils.escapeHTML(m.name||m.siteName||m)}">${Utils.escapeHTML(m.name||m.siteName||m)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-shield ml-1 text-emerald-600"></i> \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635:
                            </label>
                            <select id="qr-inspector-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u0639\u0627\u0645 (\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0641\u062A\u0634 \u0628\u0627\u0644\u0646\u0645\u0648\u0630\u062C) \u2014</option>
                                ${(a||[]).map(m=>`<option value="${Utils.escapeHTML(m.name)}">${Utils.escapeHTML(m.name)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <!-- \u0639\u0631\u0636 \u0627\u0644\u0640 QR Code -->
                    <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div id="qr-code-container" style="display: inline-block; padding: 12px; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
                            <img id="qr-code-img" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t)}" alt="QR Code" style="width: 180px; height: 180px; display: block;">
                        </div>
                        <div style="font-size: 0.85rem; color: #1e293b; font-weight: 700;" id="qr-target-text">
                            \u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u0648\u0631\u0627\u064B
                        </div>
                    </div>

                    <!-- \u062D\u0642\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                            <i class="fas fa-link ml-1 text-indigo-500"></i> \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631:
                        </label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="public-link-input" readonly value="${t}" style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; font-size: 0.85rem; direction: ltr; text-align: left;">
                            <button type="button" id="copy-public-link-btn" class="btn-secondary" style="padding: 10px 16px; border-radius: 8px; font-weight: 700; white-space: nowrap;">
                                <i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="print-poster-btn" class="btn-primary" style="padding: 9px 20px; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #15803d;">
                        <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (A4)
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s);const o=s.querySelector("#qr-factory-select"),n=s.querySelector("#qr-inspector-select"),r=s.querySelector("#public-link-input"),c=s.querySelector("#qr-code-img"),d=s.querySelector("#qr-target-text"),l=s.querySelector("#copy-public-link-btn"),p=s.querySelector("#print-poster-btn"),f=()=>{const m=o.value,u=n.value;let v=t;try{const x={s:(i||[]).map(h=>[String(h.name||h.siteName||h||"").trim(),this.extractCleanPlacesList(h.places)]).filter(h=>h[0]),d:typeof this.getDepartmentOptions=="function"?this.getDepartmentOptions():[],m:(a||[]).map(h=>h.name).filter(Boolean)},y=encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(x)))));let k=[];m&&k.push(`factory=${encodeURIComponent(m)}`),u&&k.push(`inspector=${encodeURIComponent(u)}`);const $=k.length>0?`?${k.join("&")}`:"";v=`${t}${$}#cfg=${y}`}catch{let y=[];m&&y.push(`factory=${encodeURIComponent(m)}`),u&&y.push(`inspector=${encodeURIComponent(u)}`);const k=y.length>0?`?${y.join("&")}`:"";v=`${t}${k}`}r.value=v,c.src=`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(v)}`;let g="\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u0648\u0631\u0627\u064B";m&&u?g=`\u0627\u0644\u0645\u0648\u0642\u0639: ${m} | \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629: ${u}`:m?g=`\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062E\u0635\u0635: ${m}`:u&&(g=`\u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635: ${u}`),d.textContent=g};o?.addEventListener("change",f),n?.addEventListener("change",f),f(),l?.addEventListener("click",()=>{navigator.clipboard.writeText(r.value).then(()=>{l.innerHTML='<i class="fas fa-check ml-1 text-green-600"></i> \u062A\u0645 \u0627\u0644\u0646\u0633\u062E!',setTimeout(()=>{l.innerHTML='<i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E'},2500)})}),p?.addEventListener("click",async()=>{const m=o.value||"\u062C\u0645\u064A\u0639 \u0645\u0635\u0627\u0646\u0639 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0634\u0631\u0643\u0629",u=n.value||"",v=r.value;let g=c.src;try{const y=new Image;y.crossOrigin="Anonymous",y.src=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(v)}`,await new Promise(h=>{y.onload=h,y.onerror=h,setTimeout(h,1e3)});const k=document.createElement("canvas");k.width=300,k.height=300;const $=k.getContext("2d");$.fillStyle="#ffffff",$.fillRect(0,0,300,300),$.drawImage(y,0,0,300,300),g=k.toDataURL("image/png")}catch{g=c.src}const x=window.open("","_blank");if(!x){typeof Notification<"u"&&Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}x.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 - ${m}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>
                        @page { size: A4 portrait; margin: 10mm; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; box-sizing: border-box; }
                        body { font-family: 'Cairo', system-ui, -apple-system, sans-serif; text-align: center; color: #0f172a; margin: 0; padding: 10px; background: #ffffff; }
                        .poster-card { border: 3.5px solid #0f172a; border-radius: 16px; padding: 24px 20px; position: relative; background: #ffffff; }
                        .doc-badge-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 12px; font-weight: 800; color: #475569; }
                        .header-banner { background: #0f172a !important; color: #ffffff !important; padding: 18px 14px; border-radius: 10px; margin-bottom: 18px; border: 1px solid #1e293b; }
                        .title { font-size: 25px; font-weight: 900; margin: 0 0 4px 0; color: #ffffff !important; }
                        .sub { font-size: 14px; color: #93c5fd !important; margin: 0; font-weight: 700; }
                        .badges-wrap { display: flex; justify-content: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
                        .factory-badge { background: #eff6ff !important; border: 1.5px solid #3b82f6; color: #1d4ed8 !important; font-size: 17px; font-weight: 800; padding: 6px 18px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; }
                        .inspector-badge { background: #f0fdf4 !important; border: 1.5px solid #16a34a; color: #15803d !important; font-size: 17px; font-weight: 800; padding: 6px 18px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; }
                        .qr-box { background: #ffffff; border: 3px solid #0f172a; border-radius: 16px; padding: 12px; display: inline-block; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.06); }
                        .qr-img { width: 230px; height: 230px; display: block; margin: 0 auto; }
                        .instruction-card { background: #f8fafc !important; border-right: 5px solid #2563eb; border: 1px solid #e2e8f0; border-right-width: 5px; border-radius: 8px; padding: 12px 18px; margin-bottom: 18px; text-align: right; }
                        .instruction-title { font-size: 17px; font-weight: 900; color: #1e3a8a; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
                        .steps-list { font-size: 13.5px; color: #334155; line-height: 1.8; margin: 0; padding-right: 20px; font-weight: 600; }
                        .footer-meta { font-size: 11.5px; color: #64748b; border-top: 1.5px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; }
                    </style>
                </head>
                <body>
                    <div class="poster-card">
                        <div class="doc-badge-row">
                            <div><i class="fas fa-shield-halved"></i> \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 (HSE)</div>
                            <div>\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: DOC-HSE-OBS-01 | \u0627\u0644\u0625\u0635\u062F\u0627\u0631 02</div>
                        </div>

                        <div class="header-banner">
                            <h1 class="title">\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629</h1>
                            <p class="sub">\u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 \u2014 HSE 360 Platform</p>
                        </div>

                        <div class="badges-wrap">
                            <div class="factory-badge"><i class="fas fa-industry"></i> \u0627\u0644\u0645\u0648\u0642\u0639: ${m}</div>
                            ${u?`<div class="inspector-badge"><i class="fas fa-user-shield"></i> \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629: ${u}</div>`:""}
                        </div>

                        <div>
                            <div class="qr-box">
                                <img src="${g}" alt="QR Code" class="qr-img">
                            </div>
                        </div>

                        <div class="instruction-card">
                            <div class="instruction-title">
                                <i class="fas fa-mobile-screen-button"></i>
                                \u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0639\u0628\u0631 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644:
                            </div>
                            <ol class="steps-list">
                                <li>\u0627\u0641\u062A\u062D \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0639\u0644\u0649 \u0647\u0627\u062A\u0641\u0643 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 \u0648\u0648\u062C\u0651\u0647 \u0627\u0644\u0639\u062F\u0633\u0629 \u0646\u062D\u0648 \u0631\u0645\u0632 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 (QR Code) \u0623\u0639\u0644\u0627\u0647.</li>
                                <li>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0646\u0628\u062B\u0642 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 (\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644).</li>
                                <li>\u062D\u062F\u062F \u0645\u0643\u0627\u0646 \u0648\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u060C \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0642\u0627\u0637 \u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0625\u0631\u0633\u0627\u0644.</li>
                            </ol>
                        </div>

                        <div class="footer-meta">
                            <div>\u0645\u0639\u0627\u064B \u0646\u062D\u0648 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div>HSE Department \xA9 2026</div>
                        </div>
                    </div>
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                            }, 400);
                        };
                    <\/script>
                </body>
                </html>
            `),x.document.close()})}};try{typeof window<"u"&&(window.DailyObservations=DailyObservations,AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 DailyObservations module loaded and available on window.DailyObservations"))}catch(e){Utils?.safeError?.("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 DailyObservations:",e),typeof window<"u"&&typeof DailyObservations<"u"&&(window.DailyObservations=DailyObservations)}
