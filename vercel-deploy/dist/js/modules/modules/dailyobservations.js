function generateDailyObservationId(e){const t=/^DOB-(\d+)$/i,i=/^OBS-\d{6}-(\d+)$/i,s=/(\d+)$/;let a=0;e&&Array.isArray(e)&&e.forEach(function(n){if(!n)return;const r=[];n.id&&r.push(String(n.id).trim()),n.isoCode&&r.push(String(n.isoCode).trim()),r.forEach(function(l){let d=0;const c=l.match(t);if(c)d=parseInt(c[1],10);else{const p=l.match(i);if(p)d=parseInt(p[1],10);else{const b=l.match(s);b&&(d=parseInt(b[1],10))}}!isNaN(d)&&d>a&&(a=d)})});const o=a+1;return"DOB-"+String(o).padStart(4,"0")}function getObservationIsoCodeFromId(e,t="",i=""){if(t&&typeof t=="string"&&t.trim()){const d=t.trim();if(/^OBS-\d{6}-\d+/i.test(d)||/^DOB-\d+/i.test(d))return d}(!e||typeof e!="string")&&(e="");const s=String(e).trim(),a=t&&typeof t=="string"?t.trim():"";let o=null;if(a){const d=a.match(/^OBS-\d{6}-(\d+)$/i);if(d)o=parseInt(d[1],10);else{const c=a.match(/^DOB-(\d+)$/i);if(c)o=parseInt(c[1],10);else{const p=a.match(/(\d+)$/);p&&(o=parseInt(p[1],10))}}}if(o===null||isNaN(o)){const d=s.match(/^DOB-(\d+)$/i);if(d)o=parseInt(d[1],10);else{const c=s.match(/^OBS-\d{6}-(\d+)$/i);if(c)o=parseInt(c[1],10);else if(!/^[a-f0-9]{24}$/i.test(s)){const p=s.match(/(\d+)$/);p&&(o=parseInt(p[1],10))}}}(o===null||isNaN(o))&&(o=0);let n=String(o);for(;n.length<4;)n="0"+n;let r="";const l=a.match(/^OBS-(\d{6})-/i);if(l)r=l[1];else if(i){const d=new Date(i);if(!isNaN(d.getTime())){const c=d.getFullYear(),p=String(d.getMonth()+1).padStart(2,"0");r=`${c}${p}`}}if(!r||!/^\d{6}$/.test(r)){const d=new Date;r=String(d.getFullYear())+String(d.getMonth()+1).padStart(2,"0")}return"OBS-"+r+"-"+n}async function getNextObservationIdFromBackend(){try{if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function")return null;const e=await GoogleIntegration.sendRequest({action:"getNextObservationId",data:{}});return e&&e.success&&e.data&&e.data.id?{id:e.data.id,isoCode:e.data.isoCode||getObservationIsoCodeFromId(e.data.id)}:null}catch(e){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0644\u064A\u062F \u0645\u062D\u0644\u064A\u0627\u064B:",e),null}}const DailyObservations={getCurrentLanguage(){return localStorage.getItem("language")||AppState?.currentLanguage||"ar"},_t(e,t){const i=String(e||"").startsWith("module.")?e:`module.dailyobs.${e}`;if(window.AppI18n&&typeof window.AppI18n.t=="function"){const s=window.AppI18n.t(i,t);if(s&&s!==i)return s}if(window.I18n&&typeof window.I18n.t=="function"){const s=window.I18n.t(i,t);if(s&&s!==i)return s}return t??i.replace("module.dailyobs.","")},_tf(e,t,i){let s=this._t(e,i);return t&&typeof t=="object"&&Object.keys(t).forEach(a=>{s=String(s).replace(new RegExp(`\\{${a}\\}`,"g"),String(t[a]))}),s},applyModuleI18n(e){const t=e&&e.nodeType?e:document.getElementById("daily-observations-section");if(!t)return;const i=window.AppI18n&&typeof window.AppI18n.applyModuleI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyModuleI18n=="function"?window.I18n:null;i&&i.applyModuleI18n(t)},getTranslations(){const e=this.getCurrentLanguage(),t=e==="ar",i={"title.observationsRegistry":"module.dailyobs.registry.title","btn.registerNew":"module.dailyobs.btn.registerNew","btn.reset":"module.dailyobs.btn.reset","btn.refresh":"module.dailyobs.btn.refresh","filter.search":"module.dailyobs.filter.search","filter.site":"module.dailyobs.filter.site","filter.location":"module.dailyobs.filter.location","filter.type":"module.dailyobs.filter.type","filter.shift":"module.dailyobs.filter.shift","filter.risk":"module.dailyobs.filter.risk","filter.status":"module.dailyobs.filter.status","filter.observer":"module.dailyobs.filter.observer","filter.responsible":"module.dailyobs.filter.responsible","filter.all":"module.dailyobs.filter.all","filter.searchPlaceholder":"module.dailyobs.filter.searchPlaceholder","filter.dateFrom":"module.dailyobs.filter.dateFrom","filter.dateTo":"module.dailyobs.filter.dateTo","empty.noObservations":"module.dailyobs.empty.noObservations","empty.noMatching":"module.dailyobs.empty.noMatching"};return{t:a=>{const o=i[a]||(String(a).startsWith("module.")?a:`module.dailyobs.${a}`);return this._t(o,a)},isRTL:t,lang:e}},getObservationTypeLabel(e){const i={"\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629":"module.dailyobs.type.behavioral","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644":"module.dailyobs.type.workCondition","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629":"module.dailyobs.type.tool","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A":"module.dailyobs.type.equipment","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644":"module.dailyobs.type.environment","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649":"module.dailyobs.type.other"}[String(e||"").trim()];return i?this._t(i,e):e||this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")},_getTop10ChartFieldLabel(e){const t={riskCategory:"module.dailyobs.top10.chart.field.riskCategory",riskLevel:"module.dailyobs.top10.chart.field.riskLevel",status:"module.dailyobs.top10.chart.field.status",observationType:"module.dailyobs.top10.chart.field.observationType",siteName:"module.dailyobs.top10.chart.field.siteName",locationName:"module.dailyobs.top10.chart.field.locationName",shift:"module.dailyobs.top10.chart.field.shift",responsibleDepartment:"module.dailyobs.top10.chart.field.responsibleDepartment",observerName:"module.dailyobs.top10.chart.field.observerName"};return this._t(t[e]||e,e)},_getTop10ChartTypeLabel(e){const t={doughnut:"module.dailyobs.top10.chart.type.doughnut",pie:"module.dailyobs.top10.chart.type.pie",bar:"module.dailyobs.top10.chart.type.bar",line:"module.dailyobs.top10.chart.type.line"};return this._t(t[e]||e,e)},_renderTop10ChartFieldOptions(e){return["riskCategory","riskLevel","status","observationType","siteName","locationName","shift","responsibleDepartment","observerName"].map(i=>`<option value="${i}" ${e===i?"selected":""}>${Utils.escapeHTML(this._getTop10ChartFieldLabel(i))}</option>`).join("")},_renderTop10ChartTypeOptions(e){return["doughnut","pie","bar","line"].map(t=>`<option value="${t}" ${e===t?"selected":""}>${Utils.escapeHTML(this._getTop10ChartTypeLabel(t))}</option>`).join("")},hasTabAccess(e){const t=AppState.currentUser;return t?t.role==="admin"?!0:typeof Permissions<"u"?Permissions.hasDetailedPermission("daily-observations",e):!0:!1},buildObservationsRequestContext(){const e=AppState.currentUser;if(!e)return null;let t={};if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function")try{t=(Permissions.getEffectivePermissions(e)||{})["daily-observationsPermissions"]||{}}catch{t={}}return{role:e.role||"",email:(e.email||"").trim(),name:(e.name||"").trim(),department:(e.department||"").trim(),id:e.id||"",dailyObservationsPermissions:{"observations-specialist-review":t["observations-specialist-review"]===!0,"observations-manager-approve":t["observations-manager-approve"]===!0,"observations-view-all":t["observations-view-all"]===!0,"observations-view-department":t["observations-view-department"]!==!1}}},async yieldToMain(){if(typeof scheduler<"u"&&typeof scheduler.yield=="function")try{await scheduler.yield();return}catch{}await new Promise(e=>setTimeout(e,0))},getWorkflowStageLabel(e){const t=String(e||"").trim();return t?(this.WORKFLOW_STAGES||{})[t]||t:"\u2014 (\u0633\u062C\u0644 \u0642\u062F\u064A\u0645)"},_isAdminRole(e){if(!e)return!1;const t=String(e.role||"").trim(),i=t.toLowerCase();return i==="admin"||i==="system_admin"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||t==="\u0645\u062F\u064A\u0631"},canDailyObservationsFullAdminUi(){return this._isAdminRole(AppState.currentUser)?!0:typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():!1},_isSafetyOfficerRole(e){if(!e)return!1;const t=String(e.role||"").trim();return t.toLowerCase()==="safety_officer"||t==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"||t==="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},canViewAllObservationsWorkflow(){const e=AppState.currentUser;return e?!!(this._isAdminRole(e)||this._isSafetyOfficerRole(e)||typeof Permissions<"u"&&Permissions.hasDetailedPermission&&(Permissions.hasDetailedPermission("daily-observations","observations-specialist-review")||Permissions.hasDetailedPermission("daily-observations","observations-manager-approve")||Permissions.hasDetailedPermission("daily-observations","observations-view-all"))):!1},hasSpecialistWorkflowPermission(){const e=AppState.currentUser;return e?this._isAdminRole(e)||this._isSafetyOfficerRole(e)?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"):!1},hasManagerWorkflowPermission(){const e=AppState.currentUser;return e?this._isAdminRole(e)?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"):!1},canUseObservationListClose(){const e=AppState.currentUser;return e?!!(this._isAdminRole(e)||this._isSafetyOfficerRole(e)||typeof Permissions<"u"&&Permissions.hasDetailedPermission&&(Permissions.hasDetailedPermission("daily-observations","observations-specialist-review")||Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"))):!1},canCloseObservationFromList(e){return!e||this.isObservationClosed(e)?!1:this.canUseObservationListClose()},_buildObservationWorkflowActor(){const e=AppState.currentUser||{},t={name:(e.name||"").trim()||"\u0645\u0633\u062A\u062E\u062F\u0645",email:(e.email||"").trim(),role:e.role||"",department:(e.department||"").trim(),dailyObservationsPermissions:{}};if(typeof Permissions<"u"&&typeof Permissions.getEffectivePermissions=="function")try{const i=Permissions.getEffectivePermissions(e)||{};t.dailyObservationsPermissions=i["daily-observationsPermissions"]||{}}catch{}return t},_isSafetyManager(){const e=AppState.currentUser;return e?this._isAdminRole(e)?!0:this.hasManagerWorkflowPermission():!1},_isSafetyOfficer(){const e=AppState.currentUser;return e?this._isSafetyOfficerRole(e)||this.hasSpecialistWorkflowPermission():!1},_buildAfterExecutionPhotosHtml(e){return!e||!Array.isArray(e)||e.length===0?`<p class="text-sm text-gray-500 italic" style="font-family: 'Cairo', sans-serif;"><i class="fas fa-camera ml-1"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</p>`:`
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
        `},async handleAfterExecutionPhotoUpload(e,t){if(!t||!t.files||t.files.length===0)return;const i=t.files[0];if(!i.type.startsWith("image/")){Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0635\u0648\u0631\u0629 \u0635\u0627\u0644\u062D",5e3);return}const s=5*1024*1024;if(i.size>s){Notification?.error?.("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0646 \u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 5 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A",5e3);return}const a=document.getElementById(`after-execution-preview-container-${e}`),o=document.getElementById(`after-execution-preview-${e}`);if(a&&o){const n=new FileReader;n.onload=r=>{o.src=r.target.result,o.style.display="block",a.style.display="block",this._autoUploadAfterExecutionPhoto(e,i)},n.readAsDataURL(i)}},async _autoUploadAfterExecutionPhoto(e,t){try{Loading?.show?.();const i=await this._fileToBase64(t),s={afterExecutionImages:[],updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"System"},a=AppState.appData.dailyObservations.find(o=>o.id===e);a&&Array.isArray(a.afterExecutionImages)&&(s.afterExecutionImages=a.afterExecutionImages),s.afterExecutionImages.push(i),GoogleIntegration.sendRequest({action:"updateObservation",data:{observationId:e,updateData:s}}).then(o=>{Loading?.hide?.();const n=AppState.appData.dailyObservations.findIndex(r=>r.id===e);if(n!==-1&&(AppState.appData.dailyObservations[n].afterExecutionImages=s.afterExecutionImages,AppState.appData.dailyObservations[n].updatedAt=new Date().toISOString()),o&&o.success){Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D",3e3);const r=document.getElementById(`after-execution-photos-container-${e}`);r&&(r.innerHTML=this._buildAfterExecutionPhotosHtml(s.afterExecutionImages));const l=document.getElementById(`after-execution-preview-container-${e}`);l&&(l.style.display="none");const d=document.getElementById(`after-execution-photo-input-${e}`);d&&(d.value="")}else{Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u062D\u0644\u064A\u0627\u064B",3e3);const r=document.getElementById(`after-execution-photos-container-${e}`);r&&(r.innerHTML=this._buildAfterExecutionPhotosHtml(s.afterExecutionImages))}}).catch(o=>{Loading?.hide?.(),Utils?.safeWarn?.("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630:",o),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u062D\u0644\u064A\u0627\u064B",3e3);const n=document.getElementById(`after-execution-photos-container-${e}`);n&&(n.innerHTML=this._buildAfterExecutionPhotosHtml(s.afterExecutionImages))})}catch(i){Loading?.hide?.(),Utils?.safeError?.("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630:",i),Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),8e3)}},async uploadAfterExecutionPhoto(e){Notification?.info?.("\u0633\u064A\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631",3e3)},_fileToBase64(e){return new Promise((t,i)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=i,s.readAsDataURL(e)})},async _getObservationData(e,t){try{const i=Number(t&&t.timeoutMs)>0?Number(t.timeoutMs):3e4,s=await GoogleIntegration.sendRequest({action:"getObservation",data:{observationId:e,__timeoutMs:i}});return s?.success?s.data:null}catch(i){return Utils?.safeError?.("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",i),null}},isObservationPhotoAttachment(e){if(!e||e.__listOnly)return!1;const t=String(e.type||e.mimeType||"").toLowerCase();if(t==="image"||t.startsWith("image"))return!0;const i=String(e.name||e.fileName||"").toLowerCase();if(/\.(jpe?g|png|gif|webp|bmp|heic|svg)($|\?)/i.test(i)||/^image[-_]?\d+/i.test(i))return!0;const s=this.getObservationAttachmentSrc(e);return!!(s.startsWith("data:image/")||/^FILE_/i.test(s)||/drive\.google|googleusercontent|vercel-storage|\/file\/d\/|[?&]id=/i.test(s)||/\.(jpe?g|png|gif|webp|bmp|heic|svg)($|\?)/i.test(s)||e.fileId||e.driveId)},getObservationAttachmentSrc(e){return e==null?"":typeof e=="string"?String(e).trim():typeof e!="object"?"":String(e.data||e.url||e.directLink||e.shareableLink||e.driveUrl||e.link||e.cloudLink&&e.cloudLink.url||e.fileId||e.driveId||"").trim()},resolveObservationDriveFileId(e){const t=typeof e=="string"?e:this.getObservationAttachmentSrc(e),i=typeof e=="object"&&e?String(e.fileId||e.driveId||"").trim():"",s=a=>{const o=String(a||"").trim();if(!o)return"";if(/^FILE_/i.test(o))return o.split(/[?#\s]/)[0];const n=o.match(/\/(FILE_[A-Za-z0-9_]+)(?:\.[a-z0-9]+)?(?:[?#]|$)/i);if(n)return n[1];if(typeof Utils<"u"){if(typeof Utils.extractImageProxyId=="function"){const r=Utils.extractImageProxyId(o)||"";if(r)return r}if(typeof Utils.extractDriveFileId=="function"){const r=Utils.extractDriveFileId(o)||"";if(r)return r}}return this._extractDriveFileId(o)||""};return s(i)||s(t)},observationHasRealImages(e){if(!e)return!1;const i=(Array.isArray(e.attachments)?e.attachments:[]).some(o=>o&&!o.__listOnly&&(this.getObservationAttachmentSrc(o)||o.fileId||o.driveId)),a=(Array.isArray(e.afterExecutionImages)?e.afterExecutionImages:[]).some(o=>o?!!(typeof o=="string"&&o.trim().length>8||typeof o=="object"&&(this.getObservationAttachmentSrc(o)||o.fileId)):!1);return i||a},async hydrateObservationBatchForExport(e){const t=Array.isArray(e)?e:[],i=[],s=3;for(let a=0;a<t.length;a+=s){const o=t.slice(a,a+s),n=await Promise.all(o.map(async r=>{const l=this.normalizeRecord(r),d=l.id||r?.id;if(this.observationHasRealImages(l)||!d||typeof this._getObservationData!="function")return l;try{const c=await this._getObservationData(d,{timeoutMs:3e4});if(!c)return l;const p=this.normalizeRecord(c);return!this.observationHasRealImages(p)&&this.observationHasRealImages(l)?l:p}catch{return l}}));i.push(...n)}return i},canShowAssignResponsiblePanel(e){const t=String(e?.workflowStage||"").trim(),i=AppState.currentUser,s=this._isAdminRole(i),a=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),n=s||this._isSafetyOfficerRole(i)||a,r=s||o,l=t==="pending_specialist"||t==="returned_specialist"||t==="pending_manager",d=t==="pending_department"||t==="in_progress";return!!(s||(n||r)&&l||this.isUserInResponsibleDepartment(e)&&d)},readAssignFieldsFromDetailModal(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');if(!i)return{assignedToName:"",assignedToEmail:""};const s=i.querySelector('.obs-assign-name[data-oid="'+t+'"]'),a=i.querySelector('.obs-assign-email[data-oid="'+t+'"]');return{assignedToName:(s&&s.value?s.value:"").trim(),assignedToEmail:(a&&a.value?a.value:"").trim()}},getObservationAssignableUsers(){const e=Array.isArray(AppState.appData.users)?AppState.appData.users:[],t=new Set,i=[];return e.forEach(s=>{if(!s||typeof s!="object"||s.isActive===!1)return;const a=String(s.status||"").toLowerCase();if(a==="inactive"||a==="\u0645\u0639\u0637\u0644"||a==="disabled")return;const o=String(s.email||"").trim(),n=String(s.name||s.fullName||o||"").trim();if(!n&&!o)return;const r=(o||n).toLowerCase();t.has(r)||(t.add(r),i.push({name:n||o,email:o,department:String(s.department||"").trim()}))}),i.sort((s,a)=>String(s.name).localeCompare(String(a.name),"ar")),i},formatAssigneePublicDisplay(e){let t=String(e?.assignedToName||"").trim();t&&(t=t.replace(/\s*[—–\-]\s*[^\s@]+@[^\s@]+\.[^\s@]+$/i,"").trim());const i=String(e?.assignedToEmail||"").trim().toLowerCase();if(!t&&!i)return"";const s=this.getObservationAssignableUsers();let a="";const o=s.find(n=>String(n.email||"").trim().toLowerCase()===i);if(o&&o.department&&(a=String(o.department).trim()),t&&a)return`${t} (${a})`;if(t)return t;if(i&&o){const n=String(o.name||"").trim();if(n&&a)return`${n} (${a})`;if(n)return n}return"\u2014"},getWorkflowCommentFieldsVisibility(e){const t=String(e?.workflowStage||"").trim()||"pending_specialist",i=AppState.currentUser,s=this._isAdminRole(i),a=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),n=s||this._isSafetyOfficerRole(i)||a,r=s||o,l=n&&(t==="pending_specialist"||t==="returned_specialist"),d=r&&t==="pending_manager";return{showOptional:l||d,showReject:d||s&&t==="pending_manager"}},readWorkflowCommentsFromDetailModal(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');if(!i)return{comments:"",rejectionReason:""};const s=i.querySelector('.obs-wf-optional-comment[data-oid="'+t+'"]'),a=i.querySelector('.obs-wf-reject-reason[data-oid="'+t+'"]');return{comments:(s&&s.value?s.value:"").trim(),rejectionReason:(a&&a.value?a.value:"").trim()}},buildWorkflowInlineCommentFieldsHtml(e){const t=this.getWorkflowCommentFieldsVisibility(e);if(!t.showOptional&&!t.showReject)return"";const i=String(e.id||"").replace(/"/g,"");let s='<div class="obs-wf-inline-fields" style="margin-top:0.85rem;display:flex;flex-direction:column;gap:0.45rem;">';return t.showOptional&&(s+=`
            <label style="font-size:0.8rem;opacity:0.95;">\u062A\u0639\u0644\u064A\u0642 \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0645\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</label>
            <textarea class="form-input obs-wf-optional-comment" data-oid="${i}" rows="2" placeholder="\u064A\u064F\u0631\u0633\u0644 \u0645\u0639 \xAB\u0625\u0631\u0633\u0627\u0644 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\xBB \u0623\u0648 \xAB\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0625\u062F\u0627\u0631\u0629\xBB\u2026" style="width:100%;max-width:100%;color:#111;resize:vertical;"></textarea>`),t.showReject&&(s+=`
            <label style="font-size:0.8rem;opacity:0.95;">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u0648 \u0627\u0644\u0625\u0631\u062C\u0627\u0639</label>
            <textarea class="form-input obs-wf-reject-reason" data-oid="${i}" rows="2" placeholder="\u0627\u0645\u0644\u0623\u0647 \u0642\u0628\u0644 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0631\u0641\u0636 \u0623\u0648 \u0625\u0631\u062C\u0627\u0639\u2026" style="width:100%;max-width:100%;color:#111;resize:vertical;"></textarea>`),s+="</div>",s},buildAssignResponsibleHtml(e){if(!this.canShowAssignResponsiblePanel(e))return"";const t=String(e.id||"").replace(/"/g,""),i=Utils.escapeHTML(String(e.assignedToName||"")),s=Utils.escapeHTML(String(e.assignedToEmail||"")),a=this.getObservationAssignableUsers(),o=String(e.assignedToEmail||"").trim().toLowerCase(),n=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u2014</option>'].concat(a.map(l=>{const d=encodeURIComponent(JSON.stringify({name:l.name,email:l.email})),c=l.department?` (${l.department})`:"",p=Utils.escapeHTML(String(l.name||"").trim()+c),b=o&&String(l.email||"").trim().toLowerCase()===o?" selected":"";return`<option value="${d}"${b}>${p}</option>`}));return`
        <div class="obs-assign-box" style="margin-top: 1rem; padding: 0.85rem; background: rgba(255,255,255,0.14); border-radius: 12px; border: 1px solid rgba(255,255,255,0.28);">
            <div style="font-weight: 600; margin-bottom: 0.45rem;"><i class="fas fa-user-tag ml-2"></i>\u062A\u0639\u064A\u064A\u0646 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</div>
            <div style="font-size: 0.78rem; opacity: 0.9; margin-bottom: 0.5rem;">\u064A\u062D\u062F\u062F\u0647 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A) \u0623\u0648 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645) \u0623\u0648 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629.</div>
            ${a.length===0?'<div style="font-size:0.72rem;opacity:0.85;margin-bottom:0.35rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u062D\u0645\u0651\u0644\u0629\u061B \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A\u0627\u064B \u0623\u0648 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.</div>':""}
            <label style="display:block;font-size:0.8rem;opacity:0.9;margin-bottom:0.25rem;">\u0645\u0633\u062A\u062E\u062F\u0645\u0648 \u0627\u0644\u0646\u0638\u0627\u0645 <span style="opacity:0.75;font-size:0.72rem;">(\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u2014 \u062F\u0648\u0646 \u0639\u0631\u0636 \u0627\u0644\u0628\u0631\u064A\u062F)</span></label>
            <select class="form-input obs-assign-user-select" data-oid="${t}" style="width:100%;max-width:420px;color:#111;margin-bottom:0.5rem;display:block;">
                ${n.join("")}
            </select>
            <div style="font-size:0.75rem;opacity:0.85;margin-bottom:0.35rem;">\u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u064A\u062F\u0648\u064A\u0627\u064B:</div>
            <input type="text" class="form-input obs-assign-name" data-oid="${t}" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" value="${i}" style="width:100%;max-width:340px;color:#111;margin-bottom:0.35rem;display:block;" />
            <input type="hidden" class="obs-assign-email" data-oid="${t}" value="${s}" autocomplete="off" />
            <p style="font-size:0.72rem;opacity:0.82;margin:0 0 0.5rem;line-height:1.45;">\u064A\u064F\u0631\u0628\u064E\u0637 \u0627\u0644\u0628\u0631\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u062F\u0648\u0646 \u0639\u0631\u0636\u0647.</p>
            <button type="button" class="btn-secondary btn-sm obs-wf-assign-save" data-oid="${t}" style="background: rgba(255,255,255,0.22); color: #fff; border: 1px solid rgba(255,255,255,0.45);">
                <i class="fas fa-save ml-1"></i>\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u064A\u064A\u0646
            </button>
        </div>`},replaceObservationDetailModal(e,t){const i=String(e||"").replace(/"/g,""),s=document.querySelector('.modal-overlay[data-observation-id="'+i+'"]');if(!s||!t)return;const a=this.normalizeRecord(t),o=this.createObservationModal(a);s.replaceWith(o),this.attachWorkflowPanelListeners(o)},closeObservationDetailModalIfOpen(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');i&&i.remove()},getObservationDetailInlineAlertsEl(e){const t=String(e||"").replace(/"/g,""),i=document.querySelector('.modal-overlay[data-observation-id="'+t+'"]');return i?i.querySelector("[data-obs-inline-alerts]"):null},showObservationDetailInlineAlert(e,t,i){const s=this.getObservationDetailInlineAlertsEl(e);if(!s||i==null||String(i).trim()==="")return!1;const a=Utils.escapeHTML(String(i)),o=t==="success"?"obs-inline-alert obs-inline-alert-success":t==="warning"?"obs-inline-alert obs-inline-alert-warning":t==="error"?"obs-inline-alert obs-inline-alert-error":"obs-inline-alert obs-inline-alert-info";s.innerHTML=`<div class="${o}"><button type="button" class="obs-inline-alert-close" aria-label="\u0625\u063A\u0644\u0627\u0642">&times;</button><span class="obs-inline-alert-msg">${a}</span></div>`;const n=s.querySelector(".obs-inline-alert-close");n&&n.addEventListener("click",()=>{s.innerHTML=""});try{s.scrollIntoView({behavior:"smooth",block:"nearest"})}catch{}return!0},clearObservationDetailInlineAlert(e){const t=this.getObservationDetailInlineAlertsEl(e);t&&(t.innerHTML="")},normalizeTimeLogArray(e){let t=[];try{if(e==null)return[];Array.isArray(e)?t=e.slice():typeof e=="string"&&e&&(t=JSON.parse(e))}catch{t=[]}return Array.isArray(t)||(t=[]),t.sort((i,s)=>{const a=new Date(s.timestamp||0).getTime(),o=new Date(i.timestamp||0).getTime();return a-o})},formatTimelineDetailLine(e){if(!e||typeof e!="object")return"\u2014";const t=String(e.roleLabel||"").trim(),i=String(e.actionDetail||"").trim();return t&&i?t+": "+i:String(e.note||"").trim()||"\u2014"},formatTimelineDate(e){if(!e)return"";try{const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",calendar:"gregory"})}catch{return typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(e):""}},buildObservationTimelineHtml(e){const t=this.normalizeTimeLogArray(e);return t.length?`
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
        `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644 \u0632\u0645\u0646\u064A</p>'},formatResponsibleTableCell(e){const t=Utils.escapeHTML(e.responsibleDepartment||"-"),i=(e.assignedToName||"").trim();return i?`<div class="text-sm text-gray-800">${t}</div><div class="text-xs text-gray-500">${Utils.escapeHTML(i)}</div>`:t},normalizeObservationDepartment(e){return String(e||"").trim().toLowerCase().replace(/\s+/g," ")},isUserInResponsibleDepartment(e){const t=this.normalizeObservationDepartment(AppState.currentUser?.department),i=this.normalizeObservationDepartment(e?.responsibleDepartment);return!!(t&&i&&t===i)},filterDailyObservationsForCurrentUserScope(e){const t=Array.isArray(e)?e:[];if(this.canViewAllObservationsWorkflow())return t.slice();const i=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null;if(!i)return t.slice();const s=d=>this.normalizeObservationDepartment(d),a=s(i.department),o=String(i.email||"").trim().toLowerCase(),n=String(i.name||"").trim().toLowerCase(),l=(i.dailyObservationsPermissions||{})["observations-view-department"]!==!1;return t.filter(d=>{if(!d)return!1;const c=this.normalizeRecord(d),p=String(c.workflowStage||"").trim(),b=s(c.responsibleDepartment),f=String(c.submittedByEmail||"").trim().toLowerCase(),g=String(c.observerName||"").trim().toLowerCase(),y=o&&f&&o===f||n&&g&&n===g;return p?y?!0:p==="pending_specialist"||p==="pending_manager"||p==="returned_specialist"?!1:l&&a&&b&&a===b?p==="pending_department"||p==="in_progress"||p==="closed"||p==="rejected":!1:!!(y||l&&a&&b&&a===b)})},getDailyObservationsVisibleToCurrentUser(){const e=Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];return this.filterDailyObservationsForCurrentUserScope(e)},isDailyObservationVisibleToCurrentUser(e){if(!e)return!1;if(this.canViewAllObservationsWorkflow())return!0;const t=this.normalizeRecord(e);return this.filterDailyObservationsForCurrentUserScope([t]).length===1},canEditObservationStatusInDetail(){return this.canViewAllObservationsWorkflow()||this.isSystemManager()},isObservationClosed(e){return e?String(e.workflowStage||"").trim().toLowerCase()==="closed"?!0:this.normalizeStatus(e.status)==="\u0645\u063A\u0644\u0642":!1},canCloseObservationQuick(e){return this.canCloseObservationFromList(e)},_ensureObsSelectedSet(){return this._obsSelectedIds instanceof Set||(this._obsSelectedIds=new Set),this._obsSelectedIds},_markObservationClosedLocal(e){const t=AppState.appData.dailyObservations||[],i=t.findIndex(s=>s&&s.id===e);if(i!==-1){t[i].status="\u0645\u063A\u0644\u0642",t[i].workflowStage="closed",t[i].updatedAt=new Date().toISOString();try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}}},async applyObservationClosedStatus(e,t={}){const i=t.silent===!0;try{const s=await GoogleIntegration.callBackend("updateObservationStatus",{observationId:e,statusData:{status:"\u0645\u063A\u0644\u0642",updatedBy:AppState.currentUser?.name||"System"}});if(s&&s.success){if(this._markObservationClosedLocal(e),!i){this.closeObservationDetailModalIfOpen(e),Notification.success(this._t("module.dailyobs.close.oneDone","\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"));try{this.loadObservationsList(this.currentFilter?.filter||null)}catch{}try{this.renderStatsCards()}catch{}}return{success:!0}}return{success:!1,message:s&&s.message||"\u0641\u0634\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"}}catch(s){return{success:!1,message:s&&s.message?s.message:String(s)}}},async closeObservationQuick(e,t={}){const i=t.silent===!0;if(this._obsCloseInFlight=this._obsCloseInFlight||{},this._obsCloseInFlight[e])return{success:!1,skipped:!0};this._obsCloseInFlight[e]=!0;try{const s=(AppState.appData.dailyObservations||[]).find(n=>n&&n.id===e);if(!s)return{success:!1,message:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"};const a=this.normalizeRecord(s);if(this.isObservationClosed(a))return{success:!0,skipped:!0};if(!this.canCloseObservationQuick(a))return{success:!1,message:this._t("module.dailyobs.close.noPermission","\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")};const o=await this.runWorkflowTransition(e,"close_observation",{silent:i});return o&&o.success?(this._markObservationClosedLocal(e),{success:!0}):{success:!1,message:o&&o.message||"\u0641\u0634\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"}}finally{delete this._obsCloseInFlight[e]}},_updateObsBulkCloseBar(){const e=this._ensureObsSelectedSet(),t=document.getElementById("obs-bulk-close-count"),i=document.getElementById("obs-bulk-close-btn"),s=e.size;t&&(t.textContent=s?this._tf("module.dailyobs.close.selectedCount",{n:s},`${s} \u0645\u062D\u062F\u062F\u0629`):this._t("module.dailyobs.close.noneSelected","\u0644\u0645 \u064A\u064F\u062D\u062F\u062F \u0634\u064A\u0621")),i&&(i.disabled=s===0||this._obsBulkClosing===!0,this._obsBulkArmed||(i.textContent=this._t("module.dailyobs.close.selected","\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062D\u062F\u062F"))),document.querySelectorAll(".obs-row-select").forEach(o=>{const n=o.getAttribute("data-oid");o.checked=!!(n&&e.has(n))});const a=document.getElementById("obs-select-all-closable");if(a){const o=Array.from(document.querySelectorAll(".obs-row-select:not(:disabled)"));a.disabled=o.length===0,a.checked=o.length>0&&o.every(n=>n.checked)}},async closeSelectedObservations(){const e=Array.from(this._ensureObsSelectedSet());if(!e.length){Notification.warning(this._t("module.dailyobs.close.none","\u0627\u062E\u062A\u0631 \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"));return}if(this._obsBulkClosing||!window.confirm(this._tf("module.dailyobs.close.confirmN",{n:e.length},`\u0625\u063A\u0644\u0627\u0642 ${e.length} \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062D\u062F\u062F\u0629\u061F`)))return;this._obsBulkClosing=!0,this._updateObsBulkCloseBar(),Notification.info(this._t("module.dailyobs.close.working","\u062C\u0627\u0631\u064A \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629..."));let t=0,i=0,s=0;try{const a=this._buildObservationWorkflowActor(),o=await GoogleIntegration.callBackend("closeObservations",{observationIds:e,actor:a,__timeoutMs:12e4});if(o&&o.success&&o.data){const n=Array.isArray(o.data.closed)?o.data.closed:[],r=Array.isArray(o.data.skipped)?o.data.skipped:[],l=Array.isArray(o.data.failed)?o.data.failed:[];n.forEach(c=>this._markObservationClosedLocal(c.id||c)),t=n.length;const d=r.map(c=>c&&(c.id||c)).filter(Boolean);for(let c=0;c<d.length;c++){const p=await this.closeObservationQuick(d[c],{silent:!0});p&&p.skipped?i+=1:p&&p.success?t+=1:s+=1}s+=l.length}else{const n=e.slice(),r=async d=>{const c=await this.closeObservationQuick(d,{silent:!0});c&&c.skipped?i+=1:c&&c.success?t+=1:s+=1},l=[r,r].map(async d=>{for(;n.length;){const c=n.shift();c&&await d(c)}});await Promise.all(l)}}catch{const o=e.slice();for(;o.length;){const n=o.shift(),r=await this.closeObservationQuick(n,{silent:!0});r&&r.skipped?i+=1:r&&r.success?t+=1:s+=1}}this._ensureObsSelectedSet().clear(),this._obsBulkClosing=!1;try{this.loadObservationsList(this.currentFilter?.filter||null)}catch{}try{this.renderStatsCards()}catch{}s?Notification.warning(this._tf("module.dailyobs.close.partial",{ok:t,fail:s},`\u0623\u064F\u063A\u0644\u0642 ${t}\u060C \u062A\u0639\u0630\u0651\u0631 ${s}`+(i?`\u060C \u062A\u062E\u0637\u0651\u064A ${i}`:""))):Notification.success(this._tf("module.dailyobs.close.done",{n:t},`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 ${t} \u0645\u0644\u0627\u062D\u0638\u0629`))},_bindObservationListCloseActions(e){!e||e.dataset.obsCloseBound==="1"||(e.dataset.obsCloseBound="1",e.addEventListener("click",t=>{if(t.target.closest&&t.target.closest("#obs-bulk-close-btn")){t.preventDefault(),this.closeSelectedObservations();return}const s=t.target.closest&&t.target.closest(".obs-quick-close-btn");if(s){t.preventDefault(),t.stopPropagation();const a=s.getAttribute("data-oid");if(!a||s.disabled)return;const o=(AppState.appData.dailyObservations||[]).find(r=>r&&String(r.id)===String(a)),n=o&&o.isoCode||a;if(!window.confirm("\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 "+n+"\u061F"))return;s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin"></i>',this.closeObservationQuick(a,{silent:!1}).then(r=>{r&&r.success||(s.disabled=!1,s.innerHTML='<i class="fas fa-flag-checkered"></i>',Notification.error(r&&r.message||this._t("module.dailyobs.close.failed","\u0641\u0634\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")))});return}}),e.addEventListener("change",t=>{const i=t.target;if(i){if(i.id==="obs-select-all-closable"){if(i.disabled)return;const s=this._ensureObsSelectedSet();document.querySelectorAll(".obs-row-select:not(:disabled)").forEach(a=>{const o=a.getAttribute("data-oid");o&&(a.checked=i.checked,i.checked?s.add(o):s.delete(o))}),this._obsBulkArmed=!1,this._updateObsBulkCloseBar();return}if(i.classList&&i.classList.contains("obs-row-select")){const s=i.getAttribute("data-oid");if(!s)return;const a=this._ensureObsSelectedSet();i.checked?a.add(s):a.delete(s),this._obsBulkArmed=!1,this._updateObsBulkCloseBar()}}}))},canEditObservationFieldsInDetail(e){const t=AppState.currentUser;return t?this._isAdminRole(t)||this.hasManagerWorkflowPermission()||this.hasSpecialistWorkflowPermission()?!0:typeof Permissions<"u"&&Permissions.hasDetailedPermission?Permissions.hasDetailedPermission("daily-observations","observations-edit-fields"):!1:!1},getObservationTypes(){const e=["\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649"],t=this._ensureRiskCategoryConfig(),i=Array.isArray(t.customObservationTypes)?t.customObservationTypes:[],s=(AppState.appData?.dailyObservations||[]).map(a=>a.observationType).filter(Boolean);return[...new Set([...e,...i,...s])].sort()},getRiskLevels(){return["\u0645\u0646\u062E\u0641\u0636","\u0645\u062A\u0648\u0633\u0637","\u0645\u0631\u062A\u0641\u0639","\u0634\u062F\u064A\u062F"]},getDepartments(){const e=[],t=AppState.companySettings||{};(Array.isArray(t.formDepartments)?t.formDepartments:typeof t.formDepartments=="string"?t.formDepartments.split(/\n|,/):[]).forEach(r=>e.push(r)),(Array.isArray(t.departments)?t.departments:typeof t.departments=="string"?t.departments.split(/\n|,/):[]).forEach(r=>e.push(r)),(AppState.appData?.employees||[]).forEach(r=>e.push(r.department)),(AppState.appData?.users||[]).forEach(r=>e.push(r.department)),(AppState.appData?.dailyObservations||[]).forEach(r=>e.push(r.responsibleDepartment||r.department)),(AppState.appData?.departments||[]).forEach(r=>e.push(typeof r=="string"?r:r.name||r.departmentName));try{const r=localStorage.getItem("HSE_PUBLIC_OBS_CONFIG");if(r){const l=JSON.parse(r);Array.isArray(l.departments)&&l.departments.forEach(d=>e.push(d))}}catch{}try{const r=localStorage.getItem("HSE_SETTINGS_CACHE")||localStorage.getItem("appData");if(r){const l=JSON.parse(r);if(l.companySettings&&(l.companySettings.formDepartments||l.companySettings.departments)){const d=l.companySettings.formDepartments||l.companySettings.departments;(Array.isArray(d)?d:String(d).split(/[\n,]/).map(p=>p.trim()).filter(Boolean)).forEach(p=>e.push(p))}}}catch{}const a=new Map,o=r=>String(r||"").toLowerCase().replace(/[أإآ]/g,"\u0627").replace(/ة/g,"\u0647").replace(/ى/g,"\u064A").replace(/[^\w\u0600-\u06FF]/g,""),n=["ci & projects lead","hse","quality, health, safety and environment","top managament","top management"];return e.forEach(r=>{if(!r)return;const l=String(r).trim().replace(/\s+/g," ");if(!l||l.length<2)return;const d=l.toLowerCase();if(n.includes(d)||d.includes("ci & projects")||d.includes("top manag")||d.includes("quality, health, safety")||d==="hse"||!/[\u0600-\u06FF]/.test(l))return;const c=o(l);c&&!a.has(c)&&a.set(c,l)}),Array.from(a.values()).sort((r,l)=>r.localeCompare(l,"ar"))},async handleFieldChange(e,t,i,s){try{const a=AppState.appData.dailyObservations.find(r=>r.id===e);if(!a){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}a[t]=i,a.updatedAt=new Date().toISOString();const o={observationType:"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",riskLevel:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",responsibleDepartment:"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",expectedCompletionDate:"\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630",details:"\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",correctiveAction:"\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A"};Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${o[t]||t} \u0628\u0646\u062C\u0627\u062D`);const n={[t]:i,updatedAt:a.updatedAt};GoogleIntegration.sendRequest({action:"updateObservation",data:{observationId:e,updateData:n}}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",r)})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0642\u0644:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062B: "+a.message)}},openEditFromDetailModal(e){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=document.querySelector('.modal-overlay[data-observation-id="'+e+'"]')||document.querySelector(".modal-overlay");t&&t.remove();const i=(AppState.appData.dailyObservations||[]).find(s=>s.id===e);if(!i){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(typeof this.isDailyObservationVisibleToCurrentUser=="function"&&!this.isDailyObservationVisibleToCurrentUser(i)){Notification.error("\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629");return}this.showForm(this.normalizeRecord(i))},buildWorkflowActionButtonsHtml(e){const t=e.id,i=String(t||"").replace(/"/g,""),s=(e.workflowStage||"").trim()||"pending_specialist",a=[],o=AppState.currentUser,n=this._isAdminRole(o),r=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),l=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),d=n||this._isSafetyOfficerRole(o)||r,c=n||l;return d&&(s==="pending_specialist"||s==="returned_specialist")&&a.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="specialist_forward" style="background: #22c55e; border: none;"><i class="fas fa-share ml-1"></i>\u0625\u0631\u0633\u0627\u0644 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</button>`),c&&s==="pending_manager"&&(a.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_approve" style="background: #0ea5e9; border: none;"><i class="fas fa-check ml-1"></i>\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0625\u062F\u0627\u0631\u0629</button>`),a.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_return_specialist" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4);"><i class="fas fa-undo ml-1"></i>\u0625\u0631\u062C\u0627\u0639 \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)</button>`),a.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="manager_reject" style="background: #b91c1c; color: white; border: none;"><i class="fas fa-times ml-1"></i>\u0631\u0641\u0636</button>`)),n&&s==="pending_manager"&&(a.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="admin_return_specialist" style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.35);"><i class="fas fa-user-shield ml-1"></i>\u0625\u0631\u062C\u0627\u0639 \u0645\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</button>`),a.push(`<button type="button" class="btn-secondary btn-sm obs-wf-action" data-oid="${i}" data-wfa="admin_reject" style="background: #7f1d1d; color: white; border: none;"><i class="fas fa-ban ml-1"></i>\u0631\u0641\u0636 \u0625\u062F\u0627\u0631\u064A</button>`)),(n||c||d)&&s!=="closed"&&a.push(`<button type="button" class="btn-primary btn-sm obs-wf-action" data-oid="${i}" data-wfa="close_observation" style="background: #6366f1; border: none;"><i class="fas fa-flag-checkered ml-1"></i>\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</button>`),a.join("")},buildDepartmentWorkflowFormHtml(e){const t=(e.workflowStage||"").trim();if(t!=="pending_department"&&t!=="in_progress")return"";const i=this.isUserInResponsibleDepartment(e),s=this._isAdminRole(AppState.currentUser);if(!i&&!s)return"";const a=String(e.id||"").replace(/"/g,""),o=Utils.escapeHTML(String(e.correctiveAction||"")),n=e.expectedCompletionDate?String(e.expectedCompletionDate).slice(0,10):"";return`
        <div class="obs-dept-workflow" style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.12); border-radius: 12px; border: 1px solid rgba(255,255,255,0.25);">
            <div style="font-weight: 600; margin-bottom: 0.5rem;"><i class="fas fa-building ml-2"></i>\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</div>
            <label style="display:block;font-size:0.85rem;opacity:0.9;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</label>
            <textarea class="form-input obs-dept-corrective-input" data-oid="${a}" rows="3" style="width:100%;margin:0.35rem 0 0.75rem;color:#111;">${o}</textarea>
            <label style="display:block;font-size:0.85rem;opacity:0.9;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639</label>
            <input type="date" class="form-input obs-dept-expected-input" data-oid="${a}" value="${n.replace(/"/g,"")}" style="width:100%;max-width:280px;margin:0.35rem 0;color:#111;" />
            <div style="margin-top:0.75rem;">
                <button type="button" class="btn-primary btn-sm obs-wf-dept-save" data-oid="${a}"><i class="fas fa-save ml-1"></i>\u062D\u0641\u0638 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</button>
            </div>
        </div>`},buildWorkflowBannerHtml(e){const t=[],i=(l,d)=>{const c=String(d??"").trim();c&&t.push(`<div class="obs-wf-meta-line" style="display:flex;flex-wrap:wrap;gap:0.35rem 0.5rem;align-items:baseline;direction:rtl;text-align:right;"><span style="opacity:0.88;">${Utils.escapeHTML(l)}</span><strong style="font-weight:700;opacity:1;">${Utils.escapeHTML(c)}</strong></div>`)};i("\u0627\u0644\u0645\u064F\u0633\u062C\u0651\u0650\u0644:",e.submittedBy),i("\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A):",e.specialistReviewedBy),i("\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645):",e.managerApprovedBy),i("\u0645\u0644\u0627\u062D\u0638\u0629:",e.rejectionReason);const s=this.buildWorkflowActionButtonsHtml(e),a=this.buildDepartmentWorkflowFormHtml(e),o=this.buildAssignResponsibleHtml(e),n=this.buildWorkflowInlineCommentFieldsHtml(e);if(e.assignedToName||e.assignedToEmail){const l=this.formatAssigneePublicDisplay(e);l&&l!=="\u2014"&&i("\u0645\u0639\u064A\u0651\u0646:",l)}return`
        <div class="obs-workflow-panel" style="background: linear-gradient(135deg, #312e81 0%, #5b21b6 100%); color: white; padding: 1.25rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
            ${t.length?`<div class="obs-wf-meta" style="font-size: 0.8rem; line-height: 1.55; margin-bottom: 0.35rem; display: flex; flex-direction: column; gap: 0.4rem; direction: rtl; text-align: right;">${t.join("")}</div>`:""}
            ${n}
            ${o}
            ${s?`<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">${s}</div>`:""}
            ${a}
        </div>`},attachWorkflowPanelListeners(e){e&&(e.querySelectorAll(".obs-wf-action").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid"),s=t.getAttribute("data-wfa");!i||!s||requestAnimationFrame(()=>{this.promptAndRunWorkflowTransition(i,s).catch(a=>{Utils.safeWarn("promptAndRunWorkflowTransition",a)})})})}),e.querySelectorAll(".obs-wf-dept-save").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid");if(!i)return;const s=e.querySelector('.obs-dept-corrective-input[data-oid="'+i.replace(/"/g,"")+'"]'),a=e.querySelector('.obs-dept-expected-input[data-oid="'+i.replace(/"/g,"")+'"]'),o={correctiveAction:(s?.value||"").trim(),expectedCompletionDate:a?.value?new Date(a.value).toISOString():""};requestAnimationFrame(()=>{this.runWorkflowTransition(i,"department_update",o).catch(n=>{Utils.safeWarn("runWorkflowTransition department_update",n)})})})}),e.querySelectorAll(".obs-wf-assign-save").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-oid");if(!i)return;const{assignedToName:s,assignedToEmail:a}=this.readAssignFieldsFromDetailModal(i);if(!s){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u0639\u064A\u0651\u0646");return}requestAnimationFrame(()=>{this.runWorkflowTransition(i,"assign_responsible",{assignedToName:s,assignedToEmail:a}).catch(o=>{Utils.safeWarn("runWorkflowTransition assign_responsible",o)})})})}),e.querySelectorAll(".obs-assign-user-select").forEach(t=>{t.addEventListener("change",()=>{const i=t.getAttribute("data-oid");if(!i)return;let s="",a="";try{const d=t.value;if(d){const c=JSON.parse(decodeURIComponent(d));s=String(c.name||"").trim(),a=String(c.email||"").trim()}}catch{}const o=t.closest(".modal-overlay");if(!o)return;const n=i.replace(/"/g,""),r=o.querySelector('.obs-assign-name[data-oid="'+n+'"]'),l=o.querySelector('.obs-assign-email[data-oid="'+n+'"]');r&&(r.value=s),l&&(l.value=a)})}))},async promptAndRunWorkflowTransition(e,t){const i=t==="manager_reject"||t==="admin_reject"||t==="manager_return_specialist"||t==="admin_return_specialist",{comments:s,rejectionReason:a}=this.readWorkflowCommentsFromDetailModal(e);if(i&&!a.trim()){this.showObservationDetailInlineAlert(e,"warning","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u0648 \u0627\u0644\u0625\u0631\u062C\u0627\u0639 \u0641\u064A \u0627\u0644\u062D\u0642\u0644 \u0627\u0644\u0645\u062E\u0635\u0635 \u062F\u0627\u062E\u0644 \u0628\u0637\u0627\u0642\u0629 \u0633\u064A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0627\u0644\u0633\u0628\u0628 \u0645\u0637\u0644\u0648\u0628");return}const o=t==="specialist_forward"||t==="manager_approve"?this.readAssignFieldsFromDetailModal(e):{};if(t==="close_observation"){const n=(AppState.appData.dailyObservations||[]).find(l=>String(l.id)===String(e)),r=n?n.isoCode||n.id:e;if(!window.confirm("\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 "+r+"\u061F"))return}await this.runWorkflowTransition(e,t,{comments:i?"":s,rejectionReason:i?a:"",...o})},pushObservationInAppNotification(e,t,i){try{const s="hse_obs_workflow_notifications",a=localStorage.getItem(s);let o=[];try{o=a?JSON.parse(a):[]}catch{o=[]}Array.isArray(o)||(o=[]),o.unshift({title:e||"",body:t||"",observationId:i||"",at:new Date().toISOString()}),o=o.slice(0,40),localStorage.setItem(s,JSON.stringify(o))}catch(s){Utils.safeWarn("pushObservationInAppNotification",s)}},async runWorkflowTransition(e,t,i={}){const s=this._buildObservationWorkflowActor();i.silent||(this.closeObservationDetailModalIfOpen(e),typeof Notification<"u"&&Notification.info&&Notification.info("\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0637\u0644\u0628 \u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629..."));try{const a=await GoogleIntegration.callBackend("transitionObservationWorkflow",{observationId:e,action:t,comments:i.comments||"",rejectionReason:i.rejectionReason||"",correctiveAction:i.correctiveAction,expectedCompletionDate:i.expectedCompletionDate,assignedToName:i.assignedToName,assignedToEmail:i.assignedToEmail,actor:s,__timeoutMs:12e4});if(a&&a.success){const n=a.message||"\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B",r=AppState.appData.dailyObservations.findIndex(l=>l.id===e);r!==-1&&a.data?AppState.appData.dailyObservations[r]=this.slimObservationForList(this.normalizeRecord(a.data)):r!==-1&&(AppState.appData.dailyObservations[r]={...AppState.appData.dailyObservations[r],status:t==="close_observation"?"\u0645\u063A\u0644\u0642":AppState.appData.dailyObservations[r].status,workflowStage:t==="close_observation"?"closed":AppState.appData.dailyObservations[r].workflowStage});try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}if(this.pushObservationInAppNotification("\u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",a.message||"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",e),!i.silent){await this.yieldToMain();try{this.loadObservationsList(this.currentFilter?.filter||null)}catch(l){Utils.safeWarn("loadObservationsList \u0628\u0639\u062F \u0633\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",l)}await this.yieldToMain(),Notification.success(n)}return a}const o=a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B";return i.silent||Notification.error(o),a}catch(a){const o=a&&a.message?a.message:String(a);return i.silent||Notification.error(o),{success:!1,message:o}}},runObservationDueDateReminders(){try{const e=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():AppState.appData.dailyObservations||[],t=new Date,i=AppState.currentUser&&AppState.currentUser.id?String(AppState.currentUser.id):"anon";e.forEach(s=>{const a=this.normalizeRecord(s);if(a.workflowStage!=="in_progress"||!a.expectedCompletionDate)return;const o=new Date(a.expectedCompletionDate);if(Number.isNaN(o.getTime()))return;const n=o.getTime()-t.getTime(),r=Math.ceil(n/864e5);if(r<0||r>2)return;const l=this.isUserInResponsibleDepartment(a);if(!(this.canViewAllObservationsWorkflow()||l))return;const c=`obs_due_${i}_${a.id}_${o.toISOString().slice(0,10)}`;if(sessionStorage.getItem(c))return;sessionStorage.setItem(c,"1");const p=r<0?`\u062A\u062C\u0627\u0648\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${a.isoCode||a.id}`:`\u062A\u0646\u0628\u064A\u0647: \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u062E\u0644\u0627\u0644 ${r} \u064A\u0648\u0645 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${a.isoCode||a.id}`;typeof Notification<"u"&&Notification.warning&&Notification.warning(p)})}catch(e){Utils.safeWarn("runObservationDueDateReminders",e)}},getObservationInboxNotifications(e){const t=Array.isArray(e)?e:[],i=[];if(!AppState?.appData?.dailyObservations||typeof this.getDailyObservationsVisibleToCurrentUser!="function")return i;const s=AppState.currentUser;if(!s)return i;const a=this._isAdminRole(s),o=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-specialist-review"),n=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("daily-observations","observations-manager-approve"),r=a||this._isSafetyOfficerRole(s)||o,l=a||n,d=p=>()=>{try{const b=document.querySelector('a[data-section="daily-observations"]');b&&b.click()}catch{}setTimeout(()=>{typeof this.viewObservation=="function"&&this.viewObservation(p)},320)};return this.getDailyObservationsVisibleToCurrentUser().forEach(p=>{const b=this.normalizeRecord(p),f=String(b.isoCode||b.id||"").trim(),g=b.id,y=String(b.workflowStage||"").trim(),h=this.isUserInResponsibleDepartment(b),S=this.canViewAllObservationsWorkflow();if(y==="in_progress"&&b.expectedCompletionDate){const m=new Date(b.expectedCompletionDate);if(Number.isNaN(m.getTime()))return;const k=new Date;k.setHours(0,0,0,0);const T=new Date(m.getFullYear(),m.getMonth(),m.getDate());if(T<k&&(S||h)){const C=Math.floor((k-T)/864e5),w=`obs-delay-${g}`;if(!t.includes(w)){const u=C===1?"\u064A\u0648\u0645\u0627\u064B":`${C} \u0623\u064A\u0627\u0645`;i.push({id:w,variant:"observation",type:"warning",title:"\u062A\u0623\u062E\u064A\u0631 \u0645\u0648\u0639\u062F \u062A\u0646\u0641\u064A\u0630 \u0645\u0644\u0627\u062D\u0638\u0629",message:`\u062A\u062C\u0627\u0648\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${f} (${u})`,time:b.updatedAt||b.expectedCompletionDate||new Date,icon:"fa-clock",observationId:g,onClick:d(g)})}}}if(y==="pending_manager"&&l){const m=`obs-pending-mgr-${g}`;t.includes(m)||i.push({id:m,variant:"observation",type:"info",title:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",message:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${f} \u2014 \u0631\u0627\u062C\u0639\u0647\u0627 \u0648\u0627\u0639\u062A\u0645\u062F\u0647\u0627 \u0644\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629`,time:b.managerApprovedAt||b.updatedAt||new Date,icon:"fa-user-shield",observationId:g,onClick:d(g)})}if((y==="pending_specialist"||y==="returned_specialist")&&r){const m=`obs-pending-spec-${g}`;t.includes(m)||i.push({id:m,variant:"observation",type:"info",title:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",message:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${f} \u2014 \u0631\u0627\u062C\u0639\u0647\u0627 \u0648\u0623\u0631\u0633\u0644\u0647\u0627 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629`,time:b.updatedAt||new Date,icon:"fa-clipboard-check",observationId:g,onClick:d(g)})}if(y==="pending_department"&&(h||S)){const m=`obs-approved-dept-${g}`;if(!t.includes(m)){const k=String(b.details||"").trim().slice(0,120),T=k?`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${f} \u2014 ${k}${k.length>=120?"\u2026":""}`:`\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 ${f} \u0623\u0631\u0633\u0644\u062A \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629 (${b.responsibleDepartment||""}) \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A`;i.push({id:m,variant:"observation",type:"success",title:"\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0644\u0644\u0625\u062F\u0627\u0631\u0629",message:T,time:b.managerApprovedAt||b.updatedAt||new Date,icon:"fa-check-circle",observationId:g,onClick:d(g)})}}}),i},DEFAULT_SITES:[{id:"factory-1",name:"\u0645\u0635\u0646\u0639 1"},{id:"factory-2",name:"\u0645\u0635\u0646\u0639 2"},{id:"warehouse-1",name:"\u0645\u062E\u0632\u0646 1"}],OBSERVATION_TYPES:[{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D"},{value:"\u0623\u062E\u0631\u0649",label:"\u0623\u062E\u0631\u0649"}],SHIFTS:["\u0627\u0644\u0623\u0648\u0644\u0649","\u0627\u0644\u062B\u0627\u0646\u064A\u0629","\u0627\u0644\u062B\u0627\u0644\u062B\u0629"],RISK_LEVELS:["\u0645\u0646\u062E\u0641\u0636","\u0645\u062A\u0648\u0633\u0637","\u0639\u0627\u0644\u064A"],STATUS_OPTIONS:["\u0645\u0641\u062A\u0648\u062D","\u062C\u0627\u0631\u064A","\u0645\u063A\u0644\u0642"],WORKFLOW_STAGES:{pending_specialist:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)",pending_manager:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645)",pending_department:"\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",returned_specialist:"\u0645\u0639\u0627\u062F\u0629 \u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (\u0623\u062E\u0635\u0627\u0626\u064A)",in_progress:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630",closed:"\u0645\u0643\u062A\u0645\u0644\u0629 (\u0645\u063A\u0644\u0642\u0629)",rejected:"\u0645\u0631\u0641\u0648\u0636\u0629"},WORKFLOW_PATH_STEPS:[{title:"\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},{title:"\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},{title:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"},{title:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630"},{title:"\u0645\u063A\u0644\u0642\u0629"}],getWorkflowPathVisualState(e){const t=String(e||"").trim()||"pending_specialist";if(t==="rejected")return{mode:"rejected",activeIndex:-1};if(t==="closed")return{mode:"closed",activeIndex:4};let i=0;return t==="pending_specialist"||t==="returned_specialist"?i=0:t==="pending_manager"?i=1:t==="pending_department"?i=2:t==="in_progress"?i=3:i=0,{mode:"progress",activeIndex:i}},getWorkflowCurrentStageLine(e){const t=String(e?.workflowStage||"").trim();let i=this.getWorkflowStageLabel(t);if(t==="in_progress"&&e&&e.responsibleDepartment){const s=String(e.responsibleDepartment).trim();s&&(i+=` (${s})`)}return i},buildWorkflowPathHtml(e){const t=(e.workflowStage||"").trim(),i=this.getWorkflowPathVisualState(t),s=this.WORKFLOW_PATH_STEPS||[],a="display:inline-flex;align-items:center;gap:0.25rem;padding:0.4rem 0.85rem;border-radius:9999px;font-size:0.8rem;font-weight:600;white-space:nowrap;border:1px solid transparent;",o=s.map((l,d)=>{const p=`${d+1}. ${l.title}`;let b="";return i.mode==="closed"?b=`${a}background:#dcfce7;color:#166534;border-color:#bbf7d0;`:i.mode==="rejected"?b=`${a}background:#f3f4f6;color:#9ca3af;border-color:#e5e7eb;`:i.mode==="progress"?d<i.activeIndex?b=`${a}background:#dcfce7;color:#166534;border-color:#bbf7d0;`:d===i.activeIndex?b=`${a}background:#7c3aed;color:#fff;border-color:#6d28d9;box-shadow:0 2px 8px rgba(124,58,237,0.35);`:b=`${a}background:#f3f4f6;color:#6b7280;border-color:#e5e7eb;`:b=`${a}background:#f3f4f6;color:#6b7280;`,`<span class="obs-workflow-path-badge" style="${b}">${Utils.escapeHTML(p)}</span>`}).join(""),n=i.mode==="rejected"?`<span style="color:#b91c1c;font-weight:600;">\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629: \u0645\u0631\u0641\u0648\u0636\u0629</span>${e.rejectionReason?` \u2014 ${Utils.escapeHTML(String(e.rejectionReason).slice(0,120))}${String(e.rejectionReason).length>120?"\u2026":""}`:""}`:`<span style="color:#374151;"><strong style="font-weight:700;">\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629:</strong> ${Utils.escapeHTML(this.getWorkflowCurrentStageLine(e))}</span>`;return`
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
        </div>`},MAX_ATTACHMENT_SIZE:10*1024*1024,OBSERVATIONS_THRESHOLD:10,LIST_PAGE_SIZE:50,state:{selectedSiteId:"",selectedSiteName:"",availablePlaces:[],selectedPlaceId:"",isCustomLocationSelected:!1,customLocationName:"",currentAttachments:[],editingId:null,activeModal:null,isLoadingPlaces:!1,activeTab:"observations-registry"},currentFilter:null,_obsKpiFilter:"",_obsKpiSiteApplied:!1,_obsTopSiteName:"",_topRiskCategoryFilter:"",sheetJsPromise:null,_dailyObsLoadPromise:null,_dailyObsBackendFetchOk:!1,_obsListPage:1,_obsListRetryCount:0,_obsSelectedCloseIds:null,slimObservationForList(e){if(!e||typeof e!="object")return e;const t=Number(e.attachmentCount)||(Array.isArray(e.attachments)?e.attachments.length:0)||(e.attachments&&typeof e.attachments=="object"?1:0),i=Number(e.afterImageCount)||(Array.isArray(e.afterExecutionImages)?e.afterExecutionImages.length:0);return{...e,attachmentCount:t,afterImageCount:i,attachments:t>0?[{__listOnly:!0}]:[],afterExecutionImages:[],timeLog:[],updates:[],comments:[]}},async ensureDailyObservationsDataLoaded({force:e=!1}={}){if(this._dailyObsLoadPromise&&!e)return this._dailyObsLoadPromise;const t=async()=>{typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("daily-observations");try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)return;if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)){this._dailyObsBackendFetchOk=!0;return}const s=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null,a=await GoogleIntegration.readFromSheets("DailyObservations",{timeout:15e3,observationsRequestContext:s}).catch(()=>null);if(Array.isArray(a)){const o=a.map(l=>this.slimObservationForList(l)),n=AppState.appData.dailyObservations||[];typeof this.canViewAllObservationsWorkflow=="function"&&this.canViewAllObservationsWorkflow()&&o.length===0&&n.length>0?Utils?.safeLog?.("\u26A0\uFE0F DailyObservations: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0627\u0631\u063A\u0629 - \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u062D\u0644\u064A"):AppState.appData.dailyObservations=o}try{localStorage.setItem("daily_observations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}this._dailyObsBackendFetchOk=!0}finally{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("daily-observations")}};return this._dailyObsLoadPromise=(typeof StableLoader<"u"&&typeof StableLoader.runExclusive=="function"?StableLoader.runExclusive("daily-obs:data",t):t()).finally(()=>{this._dailyObsLoadPromise=null}),this._dailyObsLoadPromise},saveUIState(){const e=document.querySelector(".tab-btn.active[data-tab]");if(e){const t=e.getAttribute("data-tab");this.state.activeTab=t}this.state.activeModal},restoreUIState(){if(!this.state.activeTab)return;const e=document.querySelector(`.tab-btn[data-tab="${this.state.activeTab}"]`);!e||e.classList.contains("active")||setTimeout(()=>{e.click()},150)},refreshOnLanguageChange(){this.state&&this.state.activeTab&&this.renderList()},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.refreshOnLanguageChange()}),window.addEventListener("storage",b=>{b.key==="language"&&b.newValue!==b.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0);let e=!1;const t=10,i=200;for(let b=0;b<t;b++){if(typeof window<"u"&&(typeof window.DataManager<"u"||typeof DataManager<"u")){e=!0;break}b<t-1&&await new Promise(f=>setTimeout(f,i))}if(!e){const b="\u26A0\uFE0F DailyObservations: DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0642\u062F \u0644\u0627 \u062A\u0639\u0645\u0644 \u0628\u0639\u0636 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D";Utils?.safeWarn?.(b)||typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(b)}let s=document.getElementById("daily-observations-section");if(s||(s=document.getElementById("dailyobservations-section")),!s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F DailyObservations: \u0642\u0633\u0645 daily-observations-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(typeof AppState>"u"){s.innerHTML=`
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
            `;return}const a=this.hasTabAccess("observations-registry"),o=this.hasTabAccess("top-10-observations"),n=this.hasTabAccess("data-analysis"),r=a?"observations-registry":o?"top-10-observations":n?"data-analysis":"";if(!r){s.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</p>
                        </div>
                    </div>
                </div>
            `;return}this.state.activeTab=r,this.saveUIState(),AppState.appData||(AppState.appData={}),AppState.appData.dailyObservations?Array.isArray(AppState.appData.dailyObservations)&&AppState.appData.dailyObservations.length&&(AppState.appData.dailyObservations=AppState.appData.dailyObservations.map(b=>this.slimObservationForList(b))):AppState.appData.dailyObservations=[];const l=this.isCurrentUserAdmin(),d=l&&this.hasTabAccess("executive-dashboard"),c=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-spinner fa-spin text-gray-300 text-3xl mb-3"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.loading.tab","\u0633\u064A\u064F\u062D\u0645\u0651\u064E\u0644 \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0639\u0646\u062F \u0641\u062A\u062D\u0647"))}</p>
                </div></div></div>`;let p="";if(d&&r==="executive-dashboard")try{p=this.renderExecutiveDashboard()}catch{p=""}else d&&(p=c);try{const b=Array.isArray(AppState.appData.dailyObservations)&&AppState.appData.dailyObservations.length>0;let f=null;try{f=localStorage.getItem("daily_observations_last_sync")}catch{}const g=f?Date.now()-parseInt(f,10):1/0,y=600*1e3,h=g>=y;(!b||h)&&typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets?this.ensureDailyObservationsDataLoaded({force:h&&b}).catch(()=>{}).finally(()=>{try{const L=document.getElementById("observations-table-container"),F=document.getElementById("observations-stats-cards");if(!L&&!F)return;L&&typeof this.loadObservationsList=="function"&&this.loadObservationsList(),F&&typeof this.renderStatsCards=="function"&&this.renderStatsCards()}catch{}}):b&&(this._dailyObsBackendFetchOk=!0),(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)&&(this._dailyObsBackendFetchOk=!0),await this.yieldToMain();const S=1e4,m=(L,F)=>{const q=new Promise((V,A)=>setTimeout(()=>A(new Error("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644")),S));return Promise.race([L,q]).catch(V=>(Utils?.safeWarn?.("\u26A0\uFE0F \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",V?.message||V),F))},k=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.timeout","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0648 \u0627\u0646\u062A\u0647\u062A \u0627\u0644\u0645\u0647\u0644\u0629"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`,T=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.analysis","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`,C=`
                <div class="content-card"><div class="card-body"><div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <p class="text-gray-500">${Utils.escapeHTML(this._t("module.dailyobs.error.top10","\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Top 10"))}</p>
                    <button onclick="DailyObservations.load()" class="btn-primary mt-4"><i class="fas fa-redo ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}</button>
                </div></div></div>`;let w="",u="",U="";(r==="observations-registry"||a)&&(w=await m(this.renderList(),k)||k),r==="top-10-observations"?U=await m(this.renderTop10Observations(),C)||C:o&&(U=c),r==="data-analysis"?u=l?await m(this.renderDataAnalysis(),T)||T:"":n&&(u=c),s.innerHTML=`
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
                            <a href="forms-hub" target="_blank" onclick="DailyObservations.exportPublicConfigToLocalStorage()" class="btn-secondary" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #059669; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center;">
                                <i class="fas fa-mobile-screen-button ml-2"></i>
                                <span>\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0648\u062D\u062F\u0629 (Hub)</span>
                            </a>
                            <button id="public-qr-observations-btn" class="btn-secondary" onclick="DailyObservations.openPublicQrModal()" style="background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3); color: #2563eb; font-weight: 700;">
                                <i class="fas fa-qrcode ml-2"></i>
                                <span data-i18n="module.dailyobs.btn.publicQr">\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0648\u0631\u0645\u0632 QR</span>
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
                        ${a?`
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
                    ${a?`
                    <div id="tab-observations-registry" class="tab-content ${this.state.activeTab==="observations-registry"?"active":""}" style="${this.state.activeTab==="observations-registry"?"":"display: none;"}">
                        ${w}
                    </div>
                    `:""}
                    ${o?`
                    <div id="tab-top-10-observations" class="tab-content ${this.state.activeTab==="top-10-observations"?"active":""}" style="${this.state.activeTab==="top-10-observations"?"":"display: none;"}" ${r==="top-10-observations"?"":'data-obs-lazy="1"'}>
                        ${U}
                    </div>
                    `:""}
                    ${n?`
                    <div id="tab-data-analysis" class="tab-content ${this.state.activeTab==="data-analysis"?"active":""}" style="${this.state.activeTab==="data-analysis"?"":"display: none;"}" ${r==="data-analysis"?"":'data-obs-lazy="1"'}>
                        ${u}
                    </div>
                    `:""}
                    ${d?`
                    <div id="tab-executive-dashboard" class="tab-content ${this.state.activeTab==="executive-dashboard"?"active":""}" style="${this.state.activeTab==="executive-dashboard"?"":"display: none;"}" ${r==="executive-dashboard"?"":'data-obs-lazy="1"'}>
                        ${p}
                    </div>
                    `:""}
                </div>
            `,this.applyModuleI18n(s),typeof StableLoader<"u"&&StableLoader.markPaint("daily-observations",r,{count:(AppState.appData.dailyObservations||[]).length}),this.setupEventListeners(),this.currentFilter=null;try{this.setupTabs()}catch{}this.restoreUIState();try{requestAnimationFrame(()=>{setTimeout(()=>{try{if(this.state&&this.state.activeTab==="observations-registry"){this.loadObservationsList();try{this.runObservationDueDateReminders()}catch(F){Utils.safeWarn("\u26A0\uFE0F \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",F)}}else this.state&&this.state.activeTab==="top-10-observations"&&this.loadTop10Observations()}catch(F){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A:",F)}},10)})}catch(L){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A:",L)}}catch(b){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 DailyObservations:",b),s.innerHTML=`
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
                                <p class="text-sm text-gray-400 mb-4">${b&&b.message?Utils.escapeHTML(b.message):Utils.escapeHTML(this._t("module.dailyobs.error.unknown","\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}</p>
                                <button onclick="DailyObservations.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${Utils.escapeHTML(this._t("module.dailyobs.error.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}},async renderList(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(g=>this.normalizeRecord(g)),i=[...new Set(t.map(g=>g.siteName).filter(Boolean))].sort(),s=[...new Set(t.map(g=>g.locationName).filter(Boolean))].sort(),a=[...new Set(t.map(g=>g.observationType).filter(Boolean))].sort(),o=[...new Set(t.map(g=>g.shift).filter(Boolean))].sort(),n=[...new Set(t.map(g=>g.riskLevel).filter(Boolean))].sort(),r=[...new Set(t.map(g=>g.status).filter(Boolean))].sort(),l=[...new Set(t.map(g=>g.observerName).filter(Boolean))].sort(),d=[...new Set(t.map(g=>g.responsibleDepartment).filter(Boolean))].sort(),{t:c,isRTL:p}=this.getTranslations(),b=p?"ml-1":"mr-1";return`
            <!-- \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 -->
            <div id="observations-stats-cards" class="obs-kpi-grid mb-6">
                <!-- \u0633\u064A\u062A\u0645 \u0645\u0644\u0624\u0647\u0627 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
            </div>

            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between gap-4 mb-4 flex-wrap" style="direction: ${p?"rtl":"ltr"};">
                        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; flex: 1;">
                            <h2 class="card-title" style="text-align: ${p?"right":"left"}; margin: 0; white-space: nowrap;">
                                <i class="fas fa-list ${p?"ml-2":"mr-2"}"></i>
                                ${c("title.observationsRegistry")}
                            </h2>
                            <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0627\u0631\u064A\u062E - \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u0628\u062C\u0627\u0646\u0628 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 -->
                            <div class="date-range-bar" style="background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid #e0e7ff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 12px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                                        <i class="fas fa-calendar-alt" style="color: #6366f1;"></i>
                                        ${c("filter.dateFrom")}
                                    </label>
                                    <input type="date" id="observation-date-from" class="date-range-input" style="padding: 6px 10px; border: 1px solid #c7d2fe; border-radius: 6px; background: white; font-size: 12px; color: #1e293b; min-width: 120px; direction: ${p?"rtl":"ltr"};">
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 12px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                                        <i class="fas fa-calendar-check" style="color: #10b981;"></i>
                                        ${c("filter.dateTo")}
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
                        <div class="filter-field obs-search-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-search ${b}"></i>${c("filter.search")}
                            </label>
                            <div class="obs-search-wrap">
                                <input type="text" id="observation-search" class="filter-input" placeholder="${c("filter.searchPlaceholder")}" style="direction: ${p?"rtl":"ltr"}; text-align: ${p?"right":"left"};" autocomplete="off">
                                <button type="button" id="observation-search-clear" class="obs-search-clear" hidden aria-label="\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B"><i class="fas fa-times"></i></button>
                            </div>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-map-marker-alt ${b}"></i>${c("filter.site")}
                            </label>
                            <select id="observation-filter-site" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${i.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-location-dot ${b}"></i>${c("filter.location")}
                            </label>
                            <select id="observation-filter-location" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${s.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-tag ${b}"></i>${c("filter.type")}
                            </label>
                            <select id="observation-filter-type" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${a.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-clock ${b}"></i>${c("filter.shift")}
                            </label>
                            <select id="observation-filter-shift" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${o.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-exclamation-triangle ${b}"></i>${c("filter.risk")}
                            </label>
                            <select id="observation-filter-risk" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${n.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-info-circle ${b}"></i>${c("filter.status")}
                            </label>
                            <select id="observation-filter-status" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${r.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-user ${b}"></i>${c("filter.observer")}
                            </label>
                            <select id="observation-filter-observer" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${l.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 -->
                        <div class="filter-field">
                            <label class="filter-label" style="text-align: ${p?"right":"left"};">
                                <i class="fas fa-user-tie ${b}"></i>${c("filter.responsible")}
                            </label>
                            <select id="observation-filter-responsible" class="filter-input" style="direction: ${p?"rtl":"ltr"};">
                                <option value="">${c("filter.all")}</option>
                                ${d.map(g=>`<option value="${Utils.escapeHTML(g)}">${Utils.escapeHTML(g)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0648\u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B -->
                        <div class="filter-field">
                            <button id="observation-reset-filters" class="filter-reset-btn" type="button">
                                <i class="fas fa-redo ${b}"></i>${c("btn.reset")}
                            </button>
                        </div>
                        <div class="filter-field">
                            <button id="observation-refresh-btn" class="filter-reset-btn" type="button" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                                <i class="fas fa-sync-alt ${b}"></i>${c("btn.refresh")}
                            </button>
                        </div>
                    </div>
                    <div id="obs-filter-meta-bar" class="obs-filter-meta-bar">
                        <div id="obs-filter-result-count" class="obs-filter-result-count"></div>
                        <div id="obs-active-filter-chips" class="obs-active-filter-chips"></div>
                    </div>
                </div>
                <div class="card-body" style="padding-top: 20px;">
                    <div id="observations-table-container">
                        ${this._buildInitialTableHtml([],p,c)}
                    </div>
                </div>
            </div>
        `},_buildInitialTableHtml(e,t,i){return`<div class="empty-state" style="direction: ${t?"rtl":"ltr"}; text-align: ${t?"right":"left"};"><p class="text-gray-500"><i class="fas fa-spinner fa-spin ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.loading.tab","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644..."))}</p></div>`},_renderObservationTableRow(e,t){const i=Utils.escapeHTML(String(e.id||"")),s=!!(t&&t.showSelect),a=s&&this.canCloseObservationQuick(e),o=this.isObservationClosed(e),n=this._ensureObsSelectedSet().has(String(e.id||"")),r=Utils.escapeHTML(t&&t.closeObs?t.closeObs:"\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),l=s?`<td style="width:44px;text-align:center;vertical-align:middle;">
                    ${a?`<input type="checkbox" class="obs-row-select" data-oid="${i}" ${n?"checked":""} title="${Utils.escapeHTML(t&&t.select?t.select:"\u062A\u062D\u062F\u064A\u062F")}" style="width:18px;height:18px;cursor:pointer;accent-color:#4f46e5;vertical-align:middle;">`:""}
               </td>`:"";return`
            <tr data-oid="${i}" class="${o?"obs-row-closed":""}">
                ${l}
                <td>${Utils.escapeHTML(e.isoCode||"")}</td>
                <td>
                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(e.siteName||"-")}</div>
                    <div class="text-xs text-gray-500">${Utils.escapeHTML(e.locationName||"")}</div>
                </td>
                <td>${e.date?Utils.formatDateTime(e.date):"-"}</td>
                <td>${Utils.escapeHTML(this.getObservationTypeLabel(e.observationType))}</td>
                <td>${Utils.escapeHTML(e.shift||"-")}</td>
                <td>
                    <span class="badge badge-${this.getRiskBadgeClass(e.riskLevel)}">${Utils.escapeHTML(e.riskLevel||"-")}</span>
                </td>
                <td>
                    <span class="badge badge-${this.getStatusBadgeClass(e.status)}">${Utils.escapeHTML(e.status||"-")}</span>
                </td>
                <td>
                    <div>${Utils.escapeHTML(e.observerName||"-")}</div>
                    ${e.submittedBy==="\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645 (Public Form)"||String(e.remarks||"").includes("\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645")?'<span class="badge" style="background:#f3e8ff;color:#7e22ce;font-size:0.7rem;padding:2px 6px;border-radius:4px;font-weight:700;">\u0646\u0645\u0648\u0630\u062C \u0639\u0627\u0645</span>':""}
                </td>
                <td>${this.formatResponsibleTableCell(e)}</td>
                <td>${Number(e.attachmentCount)>0||e.attachments&&e.attachments.length>0?`<i class="fas fa-paperclip text-blue-500" title="${Utils.escapeHTML(this._tf("module.dailyobs.registry.attachments.count",{n:Number(e.attachmentCount)||e.attachments.length},`${Number(e.attachmentCount)||e.attachments.length} \u0645\u0644\u0641`))}"></i>`:"-"}</td>
                <td>
                    <div style="display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;">
                        <button type="button" onclick="DailyObservations.viewObservation('${e.id}')" class="btn-icon btn-icon-primary" title="${Utils.escapeHTML(t?t.view:"\u0639\u0631\u0636")}">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${a?`
                        <button type="button" class="btn-icon obs-quick-close-btn" data-oid="${i}" title="${r}" style="color:#4f46e5;background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:6px 8px;">
                            <i class="fas fa-flag-checkered"></i>
                        </button>`:""}
                    </div>
                </td>
            </tr>`},renderStatsCards(e=null,t=null){const i=document.getElementById("observations-stats-cards");if(!i)return;const s=Array.isArray(e)&&e.length?e.map(L=>this.normalizeRecord(L)):this._getVisibleObservationsNormalized(),a=this.getFilters(),o=this.filterItems(s,Object.assign({},a,{kpi:""})),n=o.length,r=o.filter(L=>this._isOpenKpiStatus(L.status)).length,l=o.filter(L=>this._isProgressKpiStatus(L.status)).length,d=o.filter(L=>this._isClosedKpiStatus(L.status)).length,c=o.filter(L=>this._isHighRiskLevel(L.riskLevel)).length,p=o.filter(L=>this._isMediumRiskLevel(L.riskLevel)).length,b=o.filter(L=>this._isLowRiskLevel(L.riskLevel)).length,f={};o.forEach(L=>{const F=String(L.siteName||"").trim();F&&(f[F]=(f[F]||0)+1)});let g=0,y="";Object.keys(f).forEach(L=>{const F=f[L];F>g&&(g=F,y=L)}),this._obsTopSiteName=y;const h=Object.keys(f).filter(L=>f[L]>=this.OBSERVATIONS_THRESHOLD),S=h.length>0,m=y||this._t("module.dailyobs.stats.none","\u0644\u0627 \u064A\u0648\u062C\u062F"),k=m.length>28?m.substring(0,28)+"\u2026":m,T=L=>n>0?(Number(L)/n*100).toFixed(0):"0",C=String(this._obsKpiFilter||"").trim(),w=!!(a.site&&y&&a.site===y),u={blue:{badgeBg:"bg-blue-50 text-blue-700 border-blue-200",iconColor:"text-blue-600",valueColor:"text-blue-900",barColor:"from-blue-500 to-indigo-600",hoverBorder:"hover:border-blue-300"},amber:{badgeBg:"bg-amber-50 text-amber-800 border-amber-200",iconColor:"text-amber-600",valueColor:"text-amber-900",barColor:"from-amber-500 to-orange-500",hoverBorder:"hover:border-amber-300"},sky:{badgeBg:"bg-sky-50 text-sky-700 border-sky-200",iconColor:"text-sky-600",valueColor:"text-sky-900",barColor:"from-sky-500 to-blue-600",hoverBorder:"hover:border-sky-300"},green:{badgeBg:"bg-emerald-50 text-emerald-700 border-emerald-200",iconColor:"text-emerald-600",valueColor:"text-emerald-900",barColor:"from-emerald-500 to-teal-600",hoverBorder:"hover:border-emerald-300"},red:{badgeBg:"bg-red-50 text-red-700 border-red-200",iconColor:"text-red-600",valueColor:"text-red-900",barColor:"from-red-500 to-rose-600",hoverBorder:"hover:border-red-300"},alert:{badgeBg:"bg-red-100 text-red-800 border-red-300",iconColor:"text-red-600",valueColor:"text-red-900",barColor:"from-red-500 to-red-700",hoverBorder:"hover:border-red-400"}},U=[{kpi:"all",title:this._t("module.dailyobs.stats.total.title","\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"),value:n,subtitle:this._tf("module.dailyobs.stats.total.subtitle",{open:r,closed:d},`\u0645\u0641\u062A\u0648\u062D ${r} \xB7 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 ${l} \xB7 \u0645\u063A\u0644\u0642 ${d}`),icon:"fas fa-layer-group",theme:"blue",description:this._t("module.dailyobs.stats.total.desc","\u0625\u062C\u0645\u0627\u0644\u064A \u0628\u0639\u062F \u0627\u0644\u0641\u0644\u0627\u062A\u0631"),active:!C&&!w,hint:"\u0639\u0631\u0636 \u0627\u0644\u0643\u0644"},{kpi:"open",title:this._t("module.dailyobs.stats.open.title","\u0645\u0641\u062A\u0648\u062D"),value:r,subtitle:`${T(r)}% \u0645\u0646 \u0627\u0644\u0646\u062A\u0627\u0626\u062C`,icon:"fas fa-folder-open",theme:"amber",description:this._t("module.dailyobs.stats.open.desc","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621"),active:C==="open",hint:"\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D"},{kpi:"progress",title:this._t("module.dailyobs.stats.progress.title","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"),value:l,subtitle:`${T(l)}% \u0645\u0646 \u0627\u0644\u0646\u062A\u0627\u0626\u062C`,icon:"fas fa-spinner",theme:"sky",description:this._t("module.dailyobs.stats.progress.desc","\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),active:C==="progress",hint:"\u062A\u0635\u0641\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"},{kpi:"closed",title:this._t("module.dailyobs.stats.closed.title","\u0645\u063A\u0644\u0642"),value:d,subtitle:`${T(d)}% \u0645\u0646 \u0627\u0644\u0646\u062A\u0627\u0626\u062C`,icon:"fas fa-check-circle",theme:"green",description:this._t("module.dailyobs.stats.closed.desc","\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642"),active:C==="closed",hint:"\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u063A\u0644\u0642"},{kpi:"high",title:this._t("module.dailyobs.stats.high.title","\u062E\u0637\u0648\u0631\u0629 \u0639\u0627\u0644\u064A\u0629"),value:c,subtitle:this._tf("module.dailyobs.stats.risk.subtitle",{high:c,medium:p,low:b},`\u0645\u062A\u0648\u0633\u0637 ${p} \xB7 \u0628\u0633\u064A\u0637 ${b}`),icon:"fas fa-exclamation-triangle",theme:"red",description:this._t("module.dailyobs.stats.high.desc","\u0623\u0648\u0644\u0648\u064A\u0629 \u0641\u0648\u0631\u064A\u0629"),active:C==="high",hint:"\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0639\u0627\u0644\u064A\u0629"},{kpi:"topSite",title:this._t("module.dailyobs.stats.location.title","\u0623\u0639\u0644\u0649 \u0645\u0648\u0642\u0639"),value:g,subtitle:k,icon:"fas fa-map-marker-alt",theme:S?"alert":"green",description:S?this._tf("module.dailyobs.stats.location.alert",{n:h.length},`\u062A\u0646\u0628\u064A\u0647: ${h.length} \u0645\u0648\u0642\u0639`):this._t("module.dailyobs.stats.location.desc","\u0623\u0643\u062B\u0631 \u0645\u0648\u0642\u0639 \u0645\u0644\u0627\u062D\u0638\u0627\u062A"),active:w,isHighRisk:S,hint:y?`\u062A\u0635\u0641\u064A\u0629 ${y}`:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0642\u0639"}];i.innerHTML=U.map(L=>{const F=u[L.theme]||u.blue,q=n>0&&L.value>0?(L.value/n*100).toFixed(1):0;return`
                <button type="button" class="stat-kpi-card ${L.active?"active-kpi":""} ${F.hoverBorder}"
                        data-kpi="${L.kpi}" title="${Utils.escapeHTML(L.hint||"")}" aria-pressed="${L.active?"true":"false"}">
                    <div class="kpi-top-row ${F.badgeBg}">
                        <div class="flex items-center gap-2 font-bold text-xs">
                            <i class="${L.icon} ${F.iconColor} text-sm"></i>
                            <span>${L.title}</span>
                        </div>
                        ${L.active?`
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white shadow-sm border text-blue-700">\u0645\u064F\u0641\u0639\u0644</span>
                        `:L.isHighRisk?`
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">\u062A\u0646\u0628\u064A\u0647</span>
                        `:`
                            <span class="text-[11px] opacity-75 font-semibold">${q}%</span>
                        `}
                    </div>
                    <div class="kpi-body my-2">
                        <div class="flex items-baseline justify-between gap-2">
                            <div class="text-2xl lg:text-3xl font-extrabold ${F.valueColor} tracking-tight">
                                ${Number(L.value||0).toLocaleString("en-US")}
                            </div>
                            <div class="text-xs text-slate-500 font-medium" style="text-align:start;">
                                ${L.description}
                            </div>
                        </div>
                        ${L.subtitle?`
                            <div class="kpi-subtitle-pill mt-3">
                                <i class="fas fa-chart-pie opacity-60 text-xs"></i>
                                <span>${Utils.escapeHTML(String(L.subtitle))}</span>
                            </div>
                        `:""}
                    </div>
                    <div class="kpi-bottom-bar">
                        <div class="kpi-bar-fill bg-gradient-to-r ${F.barColor}" style="width: ${q}%;"></div>
                    </div>
                </button>
            `}).join(""),i._obsKpiBound||(i.addEventListener("click",L=>{const F=L.target.closest("[data-kpi]");!F||!i.contains(F)||this.applyObservationKpiFilter(F.getAttribute("data-kpi"))}),i._obsKpiBound=!0),this.injectStatsCardsStyles(),this.injectTableScrollbarStyles(),S&&this.notifyAdminAboutHighRiskSites(h,f).catch(L=>{Utils?.safeWarn?.("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0644\u0645\u062F\u064A\u0631:",L)})},async notifyAdminAboutHighRiskSites(e,t){try{const i="lastHighRiskSitesNotification",s=localStorage.getItem(i),a=Date.now(),o=3600*1e3;if(s){const p=parseInt(s,10);if(a-p<o)return}const r=(AppState?.appData?.users||[]).filter(p=>p&&p.active!==!1&&(p.role==="admin"||p.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||p.permissions&&(p.permissions.isAdmin===!0||p.permissions.admin===!0)));if(r.length===0){Utils?.safeLog?.("\u26A0\uFE0F \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062F\u064A\u0631\u064A \u0646\u0638\u0627\u0645 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0647\u0645");return}const l=e.map(p=>{const b=t[p]||0;return`  - ${p}: ${b} \u0645\u0644\u0627\u062D\u0638\u0629`}).join(`
`),d="\u062A\u0646\u0628\u064A\u0647: \u0632\u064A\u0627\u062F\u0629 \u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u064A \u0645\u0648\u0627\u0642\u0639 \u0645\u0639\u064A\u0646\u0629",c=`\u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0645\u0648\u0627\u0642\u0639 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0639\u062F\u062F \u0643\u0628\u064A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (\u0623\u0643\u062B\u0631 \u0645\u0646 ${this.OBSERVATIONS_THRESHOLD} \u0645\u0644\u0627\u062D\u0638\u0629):

${l}

\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0647\u0630\u0647 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0625\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0644\u0627\u0632\u0645\u0629.`;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState?.googleConfig?.appsScript?.enabled)r.forEach(p=>{const b=p.id||p.email||p.userId;b&&GoogleIntegration.sendRequest({action:"addNotification",data:{userId:b,title:d,message:c,type:"observations_high_risk_site",priority:"high",link:"#daily-observations-section",data:{module:"daily-observations",action:"high_risk_sites",highRiskSites:e,threshold:this.OBSERVATIONS_THRESHOLD}}}).catch(()=>{})}),localStorage.setItem(i,a.toString()),Utils?.safeLog?.("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0628\u062E\u0635\u0648\u0635 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062E\u0637\u0631\u0629");else{const p=AppState?.currentUser;p&&(p.role==="admin"||p.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||p.permissions&&(p.permissions.isAdmin===!0||p.permissions.admin===!0))&&typeof Notification<"u"&&Notification.warning(c,1e4)}}catch(i){Utils?.safeLog?.("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062E\u0637\u0631\u0629 (\u063A\u064A\u0631 \u062D\u0631\u062C):",i)}},injectStatsCardsStyles(){const e="daily-observations-stats-cards-styles-v2";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
            @keyframes pulse-red {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                50% {
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.6), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
            }
            .obs-kpi-grid {
                display: grid;
                grid-template-columns: repeat(6, minmax(0, 1fr));
                gap: 12px;
            }
            @media (max-width: 1280px) {
                .obs-kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
            @media (max-width: 768px) {
                .obs-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
                min-height: 142px;
                width: 100%;
                text-align: inherit;
                font: inherit;
                color: inherit;
                cursor: pointer;
            }
            .stat-kpi-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.1);
            }
            .stat-kpi-card:focus-visible {
                outline: none;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35);
            }
            .stat-kpi-card.active-kpi {
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
                background: linear-gradient(180deg, #eef2ff 0%, #ffffff 55%);
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
            .filter-input.is-active-filter,
            .date-range-input.is-active-filter {
                border-color: #6366f1;
                background: #eef2ff;
                font-weight: 600;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
            }
            .obs-search-wrap {
                position: relative;
            }
            .obs-search-wrap .filter-input {
                padding-inline-end: 36px;
            }
            .obs-search-clear {
                position: absolute;
                inset-inline-end: 8px;
                top: 50%;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 999px;
                background: #e2e8f0;
                color: #475569;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
            }
            .obs-search-clear:hover {
                background: #cbd5e1;
                color: #1e293b;
            }
            .obs-filter-meta-bar {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                margin-top: 12px;
            }
            .obs-filter-result-count {
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 999px;
                padding: 6px 12px;
            }
            .obs-active-filter-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                justify-content: flex-end;
                flex: 1;
            }
            .obs-filter-chip {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                border: 1px solid #c7d2fe;
                background: #eef2ff;
                color: #3730a3;
                border-radius: 999px;
                padding: 5px 10px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
            }
            .obs-filter-chip:hover {
                background: #e0e7ff;
            }
            .obs-filter-chip .obs-chip-k {
                color: #64748b;
                font-weight: 600;
            }
            .obs-filter-chip.obs-chip-clear-all {
                background: #fee2e2;
                border-color: #fecaca;
                color: #b91c1c;
            }
            .date-range-bar.is-active-filter {
                border-color: #6366f1 !important;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
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
        `,document.head.appendChild(t)},setupTableScrollListeners(e){if(!e)return;const t=()=>{const i=e.scrollTop,s=e.scrollLeft,a=e.scrollHeight,o=e.scrollWidth,n=e.clientHeight,r=e.clientWidth;i===0?e.classList.add("scrolled-top"):e.classList.remove("scrolled-top"),i+n>=a-1?e.classList.add("scrolled-bottom"):e.classList.remove("scrolled-bottom"),s===0?e.classList.add("scrolled-left"):e.classList.remove("scrolled-left"),s+r>=o-1?e.classList.add("scrolled-right"):e.classList.remove("scrolled-right")};e.addEventListener("scroll",t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{t()}).observe(e),t()},filterByCard(e,t){const i={"notes-status":"all","notes-open":"open","notes-progress":"progress","notes-closed":"closed","risk-levels":"high",locations:"topSite","note-types":"all"};this.applyObservationKpiFilter(i[e]||e||"all")},applyObservationKpiFilter(e){const t=String(e||"").trim(),i=document.getElementById("observation-filter-site"),s=document.getElementById("observation-filter-status"),a=document.getElementById("observation-filter-risk");if(!t||t==="all"){this._obsKpiFilter="",this._obsKpiSiteApplied&&i&&(i.value="",this._obsKpiSiteApplied=!1),this.loadObservationsList({resetPage:!0});return}if(t==="topSite"){const o=String(this._obsTopSiteName||"").trim();if(!o||!i)return;this._obsKpiSiteApplied&&i.value===o?(i.value="",this._obsKpiSiteApplied=!1):(i.value=o,this._obsKpiSiteApplied=!0),this._obsKpiFilter="",this.loadObservationsList({resetPage:!0});return}if(this._obsKpiFilter===t){this._obsKpiFilter="",this.loadObservationsList({resetPage:!0});return}this._obsKpiFilter=t,(t==="open"||t==="progress"||t==="closed")&&s&&(s.value=""),t==="high"&&a&&(a.value=""),this.loadObservationsList({resetPage:!0})},clearObservationFilter(e){const t={search:"observation-search",site:"observation-filter-site",location:"observation-filter-location",type:"observation-filter-type",shift:"observation-filter-shift",risk:"observation-filter-risk",status:"observation-filter-status",observer:"observation-filter-observer",responsible:"observation-filter-responsible",dateFrom:"observation-date-from",dateTo:"observation-date-to"};if(e==="kpi")this._obsKpiFilter="";else if(t[e]){const i=document.getElementById(t[e]);i&&(i.value=""),e==="site"&&(this._obsKpiSiteApplied=!1)}this.loadObservationsList({resetPage:!0})},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const e=(AppState.currentUser?.role||"").toLowerCase();return e==="admin"||e==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"},ensureDataManagerAndSave(){try{return typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?(window.DataManager.save(),!0):typeof DataManager<"u"&&typeof DataManager.save=="function"?(DataManager.save(),!0):(Utils.safeWarn("\u26A0\uFE0F DailyObservations: DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),!1)}catch(e){return Utils.safeError("DailyObservations: \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",e),!1}},setupTabs(){setTimeout(()=>{const e=document.querySelectorAll(".tab-btn[data-tab]");e.forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-tab");e.forEach(a=>{a.classList.remove("active"),a.style.borderBottomColor="transparent",a.style.color="var(--text-secondary)"}),document.querySelectorAll(".tab-content").forEach(a=>{a.classList.remove("active"),a.style.display="none"}),t.classList.add("active"),t.style.borderBottomColor="var(--primary-color)",t.style.color="var(--primary-color)";const s=document.getElementById(`tab-${i}`);if(s){if(s.classList.add("active"),s.style.display="block",i==="observations-registry")try{this.loadObservationsList()}catch{}if(i==="data-analysis"){if(!(typeof Permissions<"u"?Permissions.hasDetailedPermission("daily-observations","data-analysis"):this.isCurrentUserAdmin())){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");const o=document.querySelector('.tab-btn[data-tab="observations-registry"]');o&&o.click();return}s.getAttribute("data-obs-lazy")==="1"?(s.removeAttribute("data-obs-lazy"),this.renderDataAnalysis().then(o=>(s.innerHTML=o||"",this.applyModuleI18n(s),this._bindAnalyticsEvents(),this.loadDataAnalysis())).catch(()=>{this._bindAnalyticsEvents(),this.loadDataAnalysis()})):this.loadDataAnalysis()}if(i==="top-10-observations"&&(s.getAttribute("data-obs-lazy")==="1"?(s.removeAttribute("data-obs-lazy"),this.renderTop10Observations().then(a=>(s.innerHTML=a||"",this.applyModuleI18n(s),this.loadTop10Observations())).catch(()=>this.loadTop10Observations())):this.loadTop10Observations()),i==="executive-dashboard")try{if(s.getAttribute("data-obs-lazy")==="1"){s.removeAttribute("data-obs-lazy");try{s.innerHTML=this.renderExecutiveDashboard()||"",this.applyModuleI18n(s)}catch{}}this.loadExecutiveDashboard()}catch(a){Utils?.safeWarn?.("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629:",a?.message||a)}}})})},100)},async renderDataAnalysis(){return this.ensureChartJSLoaded().catch(()=>{}),`
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
                        ${["30","90","180","365","0"].map((e,t)=>{const i=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],s=(this._analysisPeriod||"0")===e;return`<button class="obs-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.15)"};color:${s?"#1e40af":"#fff"};">${i[t]}</button>`}).join("")}
                    </div>
                    <!-- \u0632\u0631 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                    <button id="obs-toggle-filters-btn" title="\u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="obs-filter-active-badge" style="display:none;background:#ef4444;color:#fff;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u2022</span>
                    </button>
                    <!-- \u0632\u0631 \u062A\u0635\u062F\u064A\u0631 PDF -->
                    <button id="obs-send-digest-btn" title="\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064A\u062F" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#059669;color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onclick="DailyObservations.sendWeeklyDigestEmailNow()">
                        <i class="fas fa-paper-plane"></i><span>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u{1F4E7}</span>
                    </button>
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
                 \u0644\u0648\u062D\u0629 \u0623\u0628\u0637\u0627\u0644 \u0648\u0645\u062D\u0641\u0632\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Champions Leaderboard \u{1F3C6})
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;background:#fff;border-radius:14px;border:1.5px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.03);">
                <div style="padding:14px 20px;background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#fff;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="font-size:1.2rem;">\u{1F3C6}</span>
                        <div>
                            <span style="font-weight:800;font-size:0.95rem;">\u0644\u0648\u062D\u0629 \u0623\u0628\u0637\u0627\u0644 \u0648\u0645\u062D\u0641\u0632\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Champions)</span>
                            <div style="font-size:0.72rem;color:#94a3b8;">\u0623\u0639\u0644\u0649 \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0631\u0635\u062F\u0627\u064B \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629</div>
                        </div>
                    </div>
                </div>
                <div style="padding:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;" id="obs-leaderboard-container">
                    <!-- \u0633\u064A\u062A\u0645 \u0628\u0646\u0627\u0624\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B -->
                </div>
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
        </div>`},_filterObsByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(s=>{if(!s.date)return!0;const a=new Date(s.date);return!isNaN(a.getTime())&&a>=i})},_groupBy(e,t,i=0){const s={};e.forEach(o=>{const n=String(o[t]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s[n]=(s[n]||0)+1});let a=Object.entries(s).sort((o,n)=>n[1]-o[1]);return i>0&&(a=a.slice(0,i)),{labels:a.map(o=>o[0]),data:a.map(o=>o[1])}},_drawDoughnut(e,t,i,s){const a=document.getElementById(e),o=document.getElementById(e+"-empty");if(!a)return;if(!i.length||i.reduce((d,c)=>d+c,0)===0){a.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none");const n=i.reduce((d,c)=>d+c,0),r=this.analysisCharts&&this.analysisCharts[e];if(r)try{r.destroy()}catch{}const l=new Chart(a,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:s||this._chartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:d=>` ${d.label}: ${d.parsed} (${n>0?(d.parsed/n*100).toFixed(1):0}%)`}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=l},_drawHBar(e,t,i,s){const a=document.getElementById(e),o=document.getElementById(e+"-empty");if(!a)return;if(!i.length||i.reduce((l,d)=>l+d,0)===0){a.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none");const n=this.analysisCharts&&this.analysisCharts[e];if(n)try{n.destroy()}catch{}const r=new Chart(a,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:s||"rgba(59,130,246,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:l=>` ${l.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:l=>String(t[l]).length>18?String(t[l]).slice(0,17)+"\u2026":t[l]}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=r},_drawTrend(e,t){const i=document.getElementById(e),s=document.getElementById(e+"-empty");if(!i)return;const a=new Date,o=[],n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let c=11;c>=0;c--){const p=new Date(a.getFullYear(),a.getMonth()-c,1);o.push({year:p.getFullYear(),month:p.getMonth(),label:`${n[p.getMonth()]} ${p.getFullYear()}`})}const r=o.map(c=>t.filter(p=>{if(!p.date)return!1;const b=new Date(p.date);return!isNaN(b.getTime())&&b.getFullYear()===c.year&&b.getMonth()===c.month}).length);if(r.reduce((c,p)=>c+p,0)===0){i.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none");const l=this.analysisCharts&&this.analysisCharts[e];if(l)try{l.destroy()}catch{}const d=new Chart(i,{type:"bar",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",data:r,backgroundColor:r.map(c=>c===Math.max(...r)?"rgba(239,68,68,0.8)":"rgba(59,130,246,0.65)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=d},_chartColors(e){const t=["rgba(59,130,246,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(139,92,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(251,146,60,0.8)","rgba(99,102,241,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,s)=>t[s%t.length])},OBS_EXEC_HIGH_RISK_THRESHOLD:5,_execGetObservations(){let e=[];try{e=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():AppState?.appData?.dailyObservations||[]}catch{e=AppState?.appData?.dailyObservations||[]}return Array.isArray(e)||(e=[]),e.map(t=>{try{return this.normalizeRecord(t)}catch{return t}})},_execGetFilters(){const e=i=>{const s=document.getElementById(i);return s?s.value:""},t=i=>{const s=document.getElementById(i);return s&&s.selectedIndex>=0?s.options[s.selectedIndex].text:""};return{site:e("obs-exec-filter-site"),siteLabel:t("obs-exec-filter-site"),period:e("obs-exec-filter-period"),periodLabel:t("obs-exec-filter-period"),dept:e("obs-exec-filter-dept"),deptLabel:t("obs-exec-filter-dept"),category:e("obs-exec-filter-category"),categoryLabel:t("obs-exec-filter-category"),risk:e("obs-exec-filter-risk"),riskLabel:t("obs-exec-filter-risk"),status:e("obs-exec-filter-status"),statusLabel:t("obs-exec-filter-status")}},_execApplyFilters(e){const t=this._execGetFilters();let i=e||[];if(t.site&&(i=i.filter(s=>String(s.siteName||"")===t.site)),t.dept&&(i=i.filter(s=>String(s.responsibleDepartment||"")===t.dept)),t.category&&(i=i.filter(s=>this._execCategoryOf(s)===t.category)),t.risk&&(i=i.filter(s=>String(s.riskLevel||"")===t.risk)),t.status==="open"?i=i.filter(s=>!this._execIsClosed(s)):t.status==="overdue"?i=i.filter(s=>this._execIsOverdue(s)):t.status==="closed"&&(i=i.filter(s=>this._execIsClosed(s))),t.period){const s=parseInt(t.period,10);if(s>0){const a=new Date;a.setMonth(a.getMonth()-s),i=i.filter(o=>{const n=new Date(o.date);return!isNaN(n.getTime())&&n>=a})}}return i},_execIsClosed(e){return String(e.status||"").includes("\u0645\u063A\u0644\u0642")},_execIsOverdue(e){if(this._execIsClosed(e)||!e.expectedCompletionDate)return!1;const t=new Date(e.expectedCompletionDate);return!isNaN(t.getTime())&&t.getTime()<Date.now()},_execIsHighRisk(e){const t=String(e.riskLevel||"");return t.includes("\u0639\u0627\u0644\u064A")||t.includes("\u0639\u0627\u0644\u064A\u0629")||t.includes("\u0645\u0631\u062A\u0641\u0639")||t.includes("\u0634\u062F\u064A\u062F")||t.includes("\u062D\u0631\u062C")},_execIsCritical(e){const t=String(e.riskLevel||"").toLowerCase();return t.includes("\u0634\u062F\u064A\u062F")||t.includes("\u062D\u0631\u062C")||t.includes("critical")},_execIsNearMiss(e){const t=(String(e.observationType||"")+" "+String(e.details||"")).toLowerCase();return t.includes("\u0648\u0634\u064A\u0643")||t.includes("\u0643\u0627\u062F")||t.includes("\u062A\u062C\u0646\u0628")||t.includes("near miss")||t.includes("nearmiss")},_execCategoryOf(e){if(this._execIsNearMiss(e))return"\u062D\u0648\u0627\u062F\u062B \u0648\u0634\u064A\u0643\u0629";const t=(String(e.observationType||"")+" "+String(e.details||"")).toLowerCase();return t.includes("\u0628\u064A\u0626\u0629")||t.includes("\u0628\u064A\u0626\u064A")||t.includes("\u062A\u0644\u0648\u062B")||t.includes("\u0646\u0641\u0627\u064A\u0627\u062A")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629":t.includes("\u062C\u0648\u062F\u0629")||t.includes("\u0645\u0637\u0627\u0628\u0642\u0629")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u0648\u062F\u0629":t.includes("\u0625\u064A\u062C\u0627\u0628\u064A")||t.includes("\u0627\u064A\u062C\u0627\u0628\u064A")||t.includes("\u0645\u0642\u062A\u0631\u062D")||t.includes("\u0634\u0643\u0631")?"\u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629":t.includes("\u062A\u0635\u0631\u0641")||t.includes("\u0633\u0644\u0648\u0643")||t.includes("\u0641\u0639\u0644")?"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":(t.includes("\u0648\u0636\u0639")||t.includes("\u0634\u0631\u0637")||t.includes("\u062D\u0627\u0644\u0629")||t.includes("\u0645\u0639\u062F\u0629")||t.includes("\u0645\u0639\u062F\u0627\u062A")||t.includes("\u0623\u062F\u0627\u0629"),"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646")},_execDescTokens(e){const t=String(e||"").toLowerCase().replace(/[^\u0621-\u064aa-z0-9\s]/g," ");return new Set(t.split(/\s+/).filter(i=>i.length>=3))},_execJaccard(e,t){if(!e.size&&!t.size)return 1;if(!e.size||!t.size)return 0;let i=0;return e.forEach(s=>{t.has(s)&&i++}),i/(e.size+t.size-i)},_detectRepeatObservations(e){const t={};(e||[]).forEach(s=>{const a=[s.siteName||"-",s.locationName||"-",s.observationType||"-"].join(" | ");(t[a]=t[a]||[]).push(s)});const i=[];return Object.entries(t).forEach(([s,a])=>{const o=[];a.forEach(n=>{const r=this._execDescTokens(n.details);let l=!1;for(const d of o)if(this._execJaccard(r,d.sig)>=.5){d.items.push(n),l=!0;break}l||o.push({sig:r,items:[n]})}),o.forEach(n=>{if(n.items.length>=2){const r=n.items.map(y=>new Date(y.date)).filter(y=>!isNaN(y.getTime())).sort((y,h)=>y-h),l=r.length?r[r.length-1]:null,d=Date.now(),c=720*60*60*1e3,p=r.filter(y=>d-y.getTime()<=c).length,b=r.filter(y=>d-y.getTime()>c&&d-y.getTime()<=2*c).length,f=p>b?"up":p<b?"down":"flat",g=n.items[0].details||n.items[0].observationType||"\u2014";i.push({key:s,sample:String(g).slice(0,80),count:n.items.length,last:l,trend:f})}})}),i.sort((s,a)=>a.count-s.count),i},_computeExecKpis(e){const t=e.length,i=e.filter(u=>this._execIsClosed(u)),s=e.filter(u=>!this._execIsClosed(u)),a=e.filter(u=>this._execIsOverdue(u)),o=e.filter(u=>this._execIsNearMiss(u)),n=e.filter(u=>this._execIsHighRisk(u)&&!this._execIsClosed(u)),r=e.filter(u=>this._execIsCritical(u)&&this._execIsOverdue(u)),l=e.filter(u=>{if(!u.expectedCompletionDate)return!1;const U=new Date(u.expectedCompletionDate);return!isNaN(U.getTime())&&U.getTime()<=Date.now()}),d=l.filter(u=>this._execIsClosed(u)),c=l.length?d.length/l.length*100:t?i.length/t*100:0,p=i.map(u=>Number(u.overdays)||0).filter(u=>u>0),b=p.length?p.reduce((u,U)=>u+U,0)/p.length:0,f=this._detectRepeatObservations(e),g=f.reduce((u,U)=>u+U.count,0),y=t?g/t*100:0,h=new Date,S=(u,U,L)=>u.filter(F=>{const q=new Date(F.date);return!isNaN(q.getTime())&&q.getFullYear()===U&&q.getMonth()===L}).length,m=S(o,h.getFullYear(),h.getMonth()),k=new Date(h.getFullYear(),h.getMonth()-1,1),T=S(o,k.getFullYear(),k.getMonth()),C=m-T,w=t?o.length/t*100:0;return{total:t,nearMiss:o.length,nearMissRate:w,nearMissTrend:C,openActions:s.length,overdue:a.length,closureRate:c,avgDaysToClose:b,repeatRate:y,repeatIssues:f,highRiskOpen:n.length,criticalOverdue:r.length}},_runInsightsEngine(e){const t=[];return e.nearMissTrend>0&&e.closureRate>90&&t.push({type:"good",icon:"fa-circle-check",text:"\u062B\u0642\u0627\u0641\u0629 \u062A\u0628\u0644\u064A\u063A \u0623\u0645\u0627\u0646 \u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0645\u0639 \u0625\u062F\u0627\u0631\u0629 \u0641\u0639\u0651\u0627\u0644\u0629 \u0644\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629."}),e.nearMissTrend>0&&e.closureRate<75&&t.push({type:"warn",icon:"fa-triangle-exclamation",text:"\u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u064F\u0628\u0644\u064E\u0651\u063A \u0644\u0643\u0646 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0644\u0627 \u062A\u064F\u063A\u0644\u0642 \u0628\u0641\u0639\u0627\u0644\u064A\u0629."}),e.repeatRate>20&&t.push({type:"danger",icon:"fa-rotate",text:"\u0645\u0634\u0643\u0644\u0627\u062A \u0623\u0645\u0627\u0646 \u0645\u062A\u0643\u0631\u0631\u0629. \u064A\u064F\u0648\u0635\u0649 \u0628\u0625\u062C\u0631\u0627\u0621 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)."}),e.highRiskOpen>this.OBS_EXEC_HIGH_RISK_THRESHOLD&&t.push({type:"danger",icon:"fa-bolt",text:`\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 (${e.highRiskOpen}) \u2014 \u064A\u062A\u0637\u0644\u0628 \u0627\u0646\u062A\u0628\u0627\u0647 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0641\u0648\u0631\u064A.`}),t.length||t.push({type:"info",icon:"fa-circle-info",text:"\u0627\u0644\u0623\u062F\u0627\u0621 \u0636\u0645\u0646 \u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0637\u0628\u064A\u0639\u064A. \u0648\u0627\u0635\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A."}),t},_injectExecStyles(){const e="obs-exec-dashboard-styles-v2",t=document.getElementById("obs-exec-dashboard-styles");if(t&&t.remove(),document.getElementById(e))return;const i=document.createElement("style");i.id=e,i.textContent=`
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
        `,document.head.appendChild(i)},renderExecutiveDashboard(){this._injectExecStyles();let e="";try{e=(this.getAllSites()||[]).map(r=>`<option value="${Utils?.escapeHTML?Utils.escapeHTML(r.name):r.name}">${Utils?.escapeHTML?Utils.escapeHTML(r.name):r.name}</option>`).join("")}catch{}let t="";try{t=(this.getDepartmentOptions()||[]).map(r=>`<option value="${Utils?.escapeHTML?Utils.escapeHTML(r):r}">${Utils?.escapeHTML?Utils.escapeHTML(r):r}</option>`).join("")}catch{}let i="";try{i=(this.getRiskLevels()||[]).map(r=>`<option value="${r}">${r}</option>`).join("")}catch{}const a=["\u062D\u0648\u0627\u062F\u062B \u0648\u0634\u064A\u0643\u0629","\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646","\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646","\u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u0648\u062F\u0629"].map(r=>`<option value="${r}">${r}</option>`).join(""),o=`
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
                    <select id="obs-exec-filter-category"><option value="">\u0643\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</option>${a}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-gauge ml-1"></i>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                    <select id="obs-exec-filter-risk"><option value="">\u0643\u0644 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A</option>${i}</select>
                </div>
                <div class="obs-exec-filter">
                    <label><i class="fas fa-flag ml-1"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                    <select id="obs-exec-filter-status"><option value="">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option><option value="open">\u0645\u0641\u062A\u0648\u062D\u0629</option><option value="overdue">\u0645\u062A\u0623\u062E\u0631\u0629</option><option value="closed">\u0645\u063A\u0644\u0642\u0629</option></select>
                </div>
            </div>`,n=(r,l,d,c={})=>`
            <div class="obs-exec-card ${[c.wide?"obs-exec-card--wide":"",c.spanLg?"obs-exec-card--span-lg":"",c.tall?"obs-exec-card--chart-tall":""].filter(Boolean).join(" ")}">
                <div class="obs-exec-card__title"><i class="fas ${d}" style="color:var(--primary-color);"></i>${l}</div>
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
        </div>`},async loadExecutiveDashboard(){if(!this._execLoading){this._execLoading=!0;try{try{await this.ensureChartJSLoaded()}catch{}const e=this._execApplyFilters(this._execGetObservations()),t=this._computeExecKpis(e);this._renderExecInsights(this._runInsightsEngine(t)),this._renderExecKpiCards(t),this._renderRepeatTable(t.repeatIssues),this._renderOverdueHeatmap(e),typeof Chart<"u"&&this._drawExecCharts(e,t);const i=document.getElementById("obs-exec-refresh-btn");i&&!i._execBound&&(i._execBound=!0,i.addEventListener("click",()=>{try{this.loadExecutiveDashboard()}catch{}}));const s=document.getElementById("obs-exec-export-btn");if(s&&!s._execBound&&(s._execBound=!0,s.addEventListener("click",()=>{try{this._exportExecutivePDF()}catch{}})),["obs-exec-filter-site","obs-exec-filter-period","obs-exec-filter-dept","obs-exec-filter-category","obs-exec-filter-risk","obs-exec-filter-status"].forEach(a=>{const o=document.getElementById(a);o&&!o._execBound&&(o._execBound=!0,o.addEventListener("change",()=>{try{this.loadExecutiveDashboard()}catch{}}))}),!this._execResizeBound){this._execResizeBound=!0;let a=null;window.addEventListener("resize",()=>{this.state?.activeTab==="executive-dashboard"&&(clearTimeout(a),a=setTimeout(()=>{try{this.loadExecutiveDashboard()}catch{}},350))})}}catch(e){Utils?.safeWarn?.("\u26A0\uFE0F loadExecutiveDashboard:",e?.message||e)}finally{this._execLoading=!1}}},_renderExecInsights(e){const t=document.getElementById("obs-exec-insights");t&&(t.innerHTML=(e||[]).map(i=>`<div class="obs-exec-insight obs-exec-insight--${i.type}"><i class="fas ${i.icon}"></i><span>${i.text}</span></div>`).join(""))},_renderExecKpiCards(e){const t=document.getElementById("obs-exec-kpi-strip");if(!t)return;const i=o=>o>0?`<span style="color:#dc2626;"><i class="fas fa-arrow-trend-up"></i> +${o}</span>`:o<0?`<span style="color:#059669;"><i class="fas fa-arrow-trend-down"></i> ${o}</span>`:'<span style="color:var(--text-tertiary);"><i class="fas fa-minus"></i> \u062B\u0627\u0628\u062A</span>',s=o=>Math.max(0,Math.min(100,Math.round(o))),a=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",value:e.total,icon:"fa-clipboard-list",color:"#3b82f6",sub:"\u0643\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0626\u064A\u0629"},{label:"\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",value:e.nearMiss,icon:"fa-bolt",color:"#f59e0b",sub:`\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0634\u0647\u0631\u064A: ${i(e.nearMissTrend)}`},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0639\u0646 \u0627\u0644\u0648\u0634\u064A\u0643\u0629",value:e.nearMissRate.toFixed(1)+"%",icon:"fa-bullhorn",color:"#8b5cf6",progress:s(e.nearMissRate),pcolor:"#8b5cf6"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",value:e.openActions,icon:"fa-folder-open",color:"#06b6d4",sub:"\u0644\u0645 \u062A\u064F\u063A\u0644\u0642 \u0628\u0639\u062F"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629",value:e.overdue,icon:"fa-clock",color:"#ef4444",sub:"\u062A\u062C\u0627\u0648\u0632\u062A \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642"},{label:"\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",value:e.closureRate.toFixed(1)+"%",icon:"fa-circle-check",color:e.closureRate>=90?"#10b981":e.closureRate>=75?"#f59e0b":"#ef4444",progress:s(e.closureRate),pcolor:e.closureRate>=90?"#10b981":e.closureRate>=75?"#f59e0b":"#ef4444"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:Math.round(e.avgDaysToClose),icon:"fa-hourglass-half",color:"#6366f1",sub:"\u064A\u0648\u0645 \u0644\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629"},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631",value:e.repeatRate.toFixed(1)+"%",icon:"fa-rotate",color:e.repeatRate>20?"#ef4444":"#10b981",progress:s(e.repeatRate),pcolor:e.repeatRate>20?"#ef4444":"#10b981"},{label:"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629",value:e.highRiskOpen,icon:"fa-triangle-exclamation",color:e.highRiskOpen>this.OBS_EXEC_HIGH_RISK_THRESHOLD?"#ef4444":"#f59e0b",sub:"\u062A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629"},{label:"\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u062A\u0623\u062E\u0631\u0629",value:e.criticalOverdue,icon:"fa-fire",color:"#b91c1c",sub:"\u0623\u0648\u0644\u0648\u064A\u0629 \u0642\u0635\u0648\u0649"}];t.innerHTML=a.map(o=>`
            <div class="obs-exec-kpi">
                <div class="obs-exec-kpi__accent" style="background:${o.color};"></div>
                <i class="fas ${o.icon} obs-exec-kpi__icon" style="color:${o.color};"></i>
                <div class="obs-exec-kpi__label">${o.label}</div>
                <div class="obs-exec-kpi__value">${o.value}</div>
                ${o.progress!=null?`<div class="obs-exec-progress"><div class="obs-exec-progress__bar" style="width:${o.progress}%;background:${o.pcolor};"></div></div>`:`<div class="obs-exec-kpi__sub">${o.sub||""}</div>`}
            </div>`).join("")},_renderRepeatTable(e){const t=document.getElementById("obs-exec-repeat-table");if(!t)return;if(!e||!e.length){t.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-tertiary);padding:18px;"><i class="fas fa-check-circle ml-2" style="color:#10b981;"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0634\u0643\u0644\u0627\u062A \u0645\u062A\u0643\u0631\u0631\u0629</td></tr>';return}const i=s=>s==="up"?'<span style="color:#dc2626;"><i class="fas fa-arrow-trend-up"></i> \u0645\u062A\u0635\u0627\u0639\u062F</span>':s==="down"?'<span style="color:#059669;"><i class="fas fa-arrow-trend-down"></i> \u0645\u062A\u0646\u0627\u0642\u0635</span>':'<span style="color:var(--text-tertiary);"><i class="fas fa-minus"></i> \u062B\u0627\u0628\u062A</span>';t.innerHTML=e.slice(0,15).map(s=>{const a=s.last?new Date(s.last).toLocaleDateString("ar-EG"):"\u2014",o=s.count>=5?"#b91c1c":s.count>=3?"#f59e0b":"#3b82f6";return`<tr>
                <td>${Utils?.escapeHTML?Utils.escapeHTML(s.sample):s.sample}</td>
                <td style="color:var(--text-secondary);">${Utils?.escapeHTML?Utils.escapeHTML(s.key):s.key}</td>
                <td><span class="obs-exec-badge" style="background:${o}1a;color:${o};">${s.count}</span></td>
                <td>${a}</td>
                <td>${i(s.trend)}</td>
            </tr>`}).join("")},_renderOverdueHeatmap(e){const t=document.getElementById("obs-exec-heatmap");if(!t)return;const i=(e||[]).filter(b=>this._execIsOverdue(b));if(!i.length){t.innerHTML='<div style="text-align:center;color:var(--text-tertiary);padding:18px;"><i class="fas fa-check-circle ml-2" style="color:#10b981;"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629</div>';return}const s=new Date,a=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let b=5;b>=0;b--){const f=new Date(s.getFullYear(),s.getMonth()-b,1);o.push({y:f.getFullYear(),m:f.getMonth(),label:`${a[f.getMonth()]} ${String(f.getFullYear()).slice(2)}`})}const n={};i.forEach(b=>{const f=b.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n[f]=(n[f]||0)+1});const r=Object.entries(n).sort((b,f)=>f[1]-b[1]).slice(0,7).map(b=>b[0]),l=(b,f)=>i.filter(g=>{if((g.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")!==b)return!1;const y=new Date(g.expectedCompletionDate||g.date);return!isNaN(y.getTime())&&y.getFullYear()===f.y&&y.getMonth()===f.m}).length;let d=1;r.forEach(b=>o.forEach(f=>{d=Math.max(d,l(b,f))}));let p=`<div class="obs-exec-heat-grid" style="grid-template-columns:${`minmax(120px,160px) repeat(${o.length}, minmax(64px,1fr))`};">`;p+='<div class="obs-exec-heat-head"></div>'+o.map(b=>`<div class="obs-exec-heat-head">${b.label}</div>`).join(""),r.forEach(b=>{p+=`<div class="obs-exec-heat-row-label" title="${b}">${b}</div>`,o.forEach(f=>{const g=l(b,f),y=g===0?0:.15+.75*(g/d),h=g===0?"var(--bg-tertiary)":`rgba(239,68,68,${y.toFixed(2)})`,S=g===0?"var(--text-tertiary)":y>.5?"#fff":"#7f1d1d";p+=`<div class="obs-exec-heat-cell" style="background:${h};color:${S};">${g||""}</div>`})}),p+="</div>",t.innerHTML=p},_execChartImg(e){const t=this.analysisCharts&&this.analysisCharts[e];if(!t)return"";try{return t.toBase64Image("image/png",1)}catch{return""}},_buildExecReportNode(e,t,i){const s=A=>Utils?.escapeHTML?Utils.escapeHTML(String(A??"")):String(A??""),a=typeof AppState<"u"&&AppState.companySettings?AppState.companySettings:{},o=a.name||(typeof DEFAULT_COMPANY_NAME<"u"?DEFAULT_COMPANY_NAME:"QHSSE-GLOBAL"),n=a.secondaryName||"",r=typeof AppState<"u"&&AppState.companyLogo?AppState.companyLogo:a.logo||"",l=[a.address,a.phone,a.email].filter(Boolean).join("  |  "),d=new Date,c=d.toLocaleString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),p="OBS-EXEC-"+d.getFullYear()+String(d.getMonth()+1).padStart(2,"0"),b=String(o).trim().slice(0,2)||"HS",g=`
            <div style="display:flex;align-items:center;gap:14px;border-bottom:3px solid #1e3a8a;padding-bottom:12px;margin-bottom:14px;">
                ${r?`<img src="${s(r)}" style="width:58px;height:58px;object-fit:contain;border-radius:8px;background:#fff;border:1px solid #e2e8f0;"/>`:`<div style="width:58px;height:58px;border-radius:8px;background:#1e3a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;">${s(b)}</div>`}
                <div style="flex:1;">
                    <div style="font-size:20px;font-weight:800;color:#0f172a;white-space:nowrap;word-break:keep-all;">${s(o)}</div>
                    ${n?`<div style="font-size:13px;color:#6b7280;margin-top:2px;">${s(n)}</div>`:""}
                </div>
                <div style="text-align:left;font-size:11px;color:#374151;line-height:1.9;">
                    <div><b>\u0643\u0648\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</b> ${s(p)}</div>
                    <div><b>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</b> ${s(c)}</div>
                </div>
            </div>
            <div style="text-align:center;background:#1e3a8a;color:#fff;padding:9px;border-radius:8px;font-size:16px;font-weight:700;margin-bottom:12px;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>`,h=`<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;font-size:11px;color:#334155;">${[["\u0627\u0644\u0645\u0648\u0642\u0639",i.siteLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u0641\u062A\u0631\u0629",i.periodLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u0625\u062F\u0627\u0631\u0629",i.deptLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062A\u0635\u0646\u064A\u0641",i.categoryLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062E\u0637\u0648\u0631\u0629",i.riskLabel||"\u0627\u0644\u0643\u0644"],["\u0627\u0644\u062D\u0627\u0644\u0629",i.statusLabel||"\u0627\u0644\u0643\u0644"]].map(([A,_])=>`<span style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:99px;padding:3px 10px;"><b>${s(A)}:</b> ${s(_)}</span>`).join("")}</div>`,S={good:["#ecfdf5","#10b981","#047857"],warn:["#fffbeb","#f59e0b","#b45309"],danger:["#fef2f2","#ef4444","#b91c1c"],info:["#eff6ff","#3b82f6","#1d4ed8"]},m='<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">'+this._runInsightsEngine(t).map(A=>{const _=S[A.type]||S.info;return`<div style="background:${_[0]};border:1px solid ${_[1]}55;border-right:4px solid ${_[1]};border-radius:8px;padding:9px 12px;font-size:12px;font-weight:600;color:${_[2]};">${s(A.text)}</div>`}).join("")+"</div>",T='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:14px;">'+[["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",t.total,"#3b82f6"],["\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629",t.nearMiss,"#f59e0b"],["\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0628\u0644\u064A\u063A \u0639\u0646 \u0627\u0644\u0648\u0634\u064A\u0643\u0629",t.nearMissRate.toFixed(1)+"%","#8b5cf6"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",t.openActions,"#06b6d4"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u062A\u0623\u062E\u0631\u0629",t.overdue,"#ef4444"],["\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",t.closureRate.toFixed(1)+"%","#10b981"],["\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",Math.round(t.avgDaysToClose),"#6366f1"],["\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631",t.repeatRate.toFixed(1)+"%",t.repeatRate>20?"#ef4444":"#10b981"],["\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0641\u062A\u0648\u062D\u0629",t.highRiskOpen,"#f59e0b"],["\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u062A\u0623\u062E\u0631\u0629",t.criticalOverdue,"#b91c1c"]].map(A=>`<div style="border:1px solid #e2e8f0;border-top:3px solid ${A[2]};border-radius:9px;padding:9px;background:#f8fafc;"><div style="font-size:10px;color:#64748b;font-weight:600;margin-bottom:6px;min-height:26px;">${s(A[0])}</div><div style="font-size:19px;font-weight:800;color:#0f172a;">${s(A[1])}</div></div>`).join("")+"</div>",w='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'+[["obs-exec-chart-nearmiss","\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0627\u0644\u0634\u0647\u0631\u064A"],["obs-exec-chart-closure","\u0627\u062A\u062C\u0627\u0647 \u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"],["obs-exec-chart-category","\u062A\u0648\u0632\u064A\u0639 \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],["obs-exec-chart-risk","\u062A\u0648\u0632\u064A\u0639 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"],["obs-exec-chart-dept","\u0645\u0642\u0627\u0631\u0646\u0629 \u0623\u062F\u0627\u0621 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A (\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 %)"],["obs-exec-chart-repeat","\u0623\u0628\u0631\u0632 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629"]].map(([A,_])=>{const j=this._execChartImg(A);return j?`<div style="border:1px solid #e2e8f0;border-radius:9px;padding:9px;background:#fff;"><div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px;">${s(_)}</div><img src="${j}" style="width:100%;height:auto;display:block;"/></div>`:""}).filter(Boolean).join("")+"</div>";let u="";const U=(e||[]).filter(A=>this._execIsOverdue(A));if(U.length){const A=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],_=[];for(let D=5;D>=0;D--){const z=new Date(d.getFullYear(),d.getMonth()-D,1);_.push({y:z.getFullYear(),m:z.getMonth(),label:`${A[z.getMonth()]} ${String(z.getFullYear()).slice(2)}`})}const j={};U.forEach(D=>{const z=D.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";j[z]=(j[z]||0)+1});const X=Object.entries(j).sort((D,z)=>z[1]-D[1]).slice(0,7).map(D=>D[0]),le=(D,z)=>U.filter(Z=>{if((Z.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")!==D)return!1;const ie=new Date(Z.expectedCompletionDate||Z.date);return!isNaN(ie.getTime())&&ie.getFullYear()===z.y&&ie.getMonth()===z.m}).length;let J=1;X.forEach(D=>_.forEach(z=>{J=Math.max(J,le(D,z))})),u=`<div style="font-size:13px;font-weight:700;color:#0f172a;margin:6px 0 8px;">\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629 (\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \xD7 \u0627\u0644\u0634\u0647\u0631)</div>
                <table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:14px;"><thead><tr><th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>${_.map(D=>`<th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">${s(D.label)}</th>`).join("")}</tr></thead><tbody>`+X.map(D=>`<tr><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;font-weight:600;">${s(D)}</td>${_.map(z=>{const Z=le(D,z),ie=Z===0?0:.15+.75*(Z/J),O=Z===0?"#f8fafc":`rgba(239,68,68,${ie.toFixed(2)})`,I=Z===0?"#94a3b8":ie>.5?"#fff":"#7f1d1d";return`<td style="border:1px solid #e2e8f0;padding:6px;text-align:center;font-weight:700;background:${O};color:${I};">${Z||""}</td>`}).join("")}</tr>`).join("")+"</tbody></table>"}let L="";const F=(t.repeatIssues||[]).slice(0,15);if(F.length){const A=_=>_==="up"?"\u0645\u062A\u0635\u0627\u0639\u062F":_==="down"?"\u0645\u062A\u0646\u0627\u0642\u0635":"\u062B\u0627\u0628\u062A";L=`<div style="font-size:13px;font-weight:700;color:#0f172a;margin:6px 0 8px;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629</div>
                <table style="width:100%;border-collapse:collapse;font-size:11px;"><thead><tr>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0645\u0634\u0643\u0644\u0629</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;text-align:right;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646 / \u0627\u0644\u0646\u0648\u0639</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0627\u0644\u062A\u0643\u0631\u0627\u0631</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0622\u062E\u0631 \u062D\u062F\u0648\u062B</th>
                <th style="border:1px solid #e2e8f0;padding:6px;background:#f1f5f9;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647</th>
                </tr></thead><tbody>`+F.map(_=>`<tr><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;">${s(_.sample)}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:right;color:#475569;">${s(_.key)}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;font-weight:700;">${_.count}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;">${_.last?s(new Date(_.last).toLocaleDateString("ar-EG")):"\u2014"}</td><td style="border:1px solid #e2e8f0;padding:6px;text-align:center;">${s(A(_.trend))}</td></tr>`).join("")+"</tbody></table>"}const q=`<div style="margin-top:18px;border-top:1px solid #e2e8f0;padding-top:8px;font-size:10px;color:#64748b;display:flex;justify-content:space-between;gap:10px;">
                <span>${s(l)}</span>
                <span>${s(o)} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 QHSSE</span>
            </div>`,V=document.createElement("div");return V.style.cssText="position:fixed;left:-99999px;top:0;width:794px;background:#ffffff;color:#0f172a;font-family:Tahoma,Arial,sans-serif;padding:24px;box-sizing:border-box;direction:rtl;z-index:-1;",V.innerHTML=g+h+m+T+w+u+L+q,V},async _exportExecutivePDF(){const e=document.getElementById("obs-exec-export-btn"),t=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062C\u0647\u064A\u0632...');let i=null;try{await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const s=this._execApplyFilters(this._execGetObservations()),a=this._computeExecKpis(s),o=this._execGetFilters();i=this._buildExecReportNode(s,a,o),document.body.appendChild(i),await new Promise(T=>setTimeout(T,120));const n=await html2canvas(i,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),{jsPDF:r}=window.jspdf,l=new r({orientation:"portrait",unit:"mm",format:"a4"}),d=l.internal.pageSize.getWidth(),c=l.internal.pageSize.getHeight(),p=8,b=8,f=d-p*2,g=f/n.width,y=n.height*g,h=c-p-b,S=Math.max(1,Math.ceil(y/h)),m=h/g;for(let T=0;T<S;T++){T>0&&l.addPage();const C=document.createElement("canvas"),w=Math.min(m,n.height-T*m);C.width=n.width,C.height=w,C.getContext("2d").drawImage(n,0,T*m,n.width,w,0,0,n.width,w);const U=C.toDataURL("image/jpeg",.92);l.addImage(U,"JPEG",p,p,f,w*g),l.setDrawColor(226,232,240),l.line(p,c-b,d-p,c-b),l.setTextColor(120,120,120),l.setFontSize(8),l.setFont("helvetica","normal"),l.text("Daily Observations - Confidential",p,c-3),l.text(`Page ${T+1} / ${S}`,d-p,c-3,{align:"right"})}const k=new Date().toISOString().slice(0,10);l.save(`\u062A\u0642\u0631\u064A\u0631-\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A-\u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629-${k}.pdf`),typeof Notification<"u"&&Notification.success&&(Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"))}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}finally{e&&(e.disabled=!1,e.innerHTML=t)}},_execToggleEmpty(e,t){const i=document.getElementById(e),s=document.getElementById(e+"-empty");return i&&(i.style.display=t?"none":"block"),s&&(s.style.display=t?"flex":"none"),!t},_execDestroyChart(e){if(this.analysisCharts&&this.analysisCharts[e])try{this.analysisCharts[e].destroy()}catch{}},_execShortLabel(e,t=34){const i=String(e||"").trim();return i?i.length>t?i.slice(0,t-1)+"\u2026":i:"\u2014"},_setExecChartBoxHeight(e,t,i=260){const s=document.getElementById(e),a=s&&s.closest(".obs-exec-chart-box");if(!a)return;const o=Math.max(1,Number(t)||1);a.style.minHeight=Math.max(i,o*36+72)+"px",a.style.height="auto"},_drawExecHBar(e,t,i){const s=document.getElementById(e);if(!s)return;const a=Array.isArray(t)?t:[],o=a.map(d=>d.short||d.label||"\u2014"),n=a.map(d=>d.value),r=a.map(d=>d.full||d.short||d.label||"\u2014");if(!this._execToggleEmpty(e,n.length===0||n.reduce((d,c)=>d+c,0)===0))return;this._setExecChartBoxHeight(e,o.length,280),this._execDestroyChart(e);const l=new Chart(s,{type:"bar",data:{labels:o,datasets:[{data:n,backgroundColor:i||"rgba(239,68,68,0.7)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{left:4,right:8}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:d=>r[d[0]?.dataIndex]||"",label:d=>` \u0627\u0644\u062A\u0643\u0631\u0627\u0631: ${d.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{autoSkip:!1,font:{size:10},callback:d=>this._execShortLabel(o[d],36)}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=l},_drawExecCharts(e,t){try{this._drawExecMonthlySeries("obs-exec-chart-nearmiss",e,i=>this._execIsNearMiss(i),"\u0628\u0644\u0627\u063A\u0627\u062A \u0648\u0634\u064A\u0643\u0629","rgba(245,158,11,0.75)")}catch{}try{this._drawExecClosureTrend("obs-exec-chart-closure",e)}catch{}try{const i={};e.forEach(a=>{const o=this._execCategoryOf(a);i[o]=(i[o]||0)+1});const s=Object.entries(i).sort((a,o)=>o[1]-a[1]);this._drawDoughnut("obs-exec-chart-category",s.map(a=>a[0]),s.map(a=>a[1]))}catch{}try{const i=this._groupBy(e,"riskLevel");this._drawDoughnut("obs-exec-chart-risk",i.labels,i.data,["rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(127,29,29,0.85)","rgba(148,163,184,0.7)"])}catch{}try{this._drawExecDeptPerformance("obs-exec-chart-dept",e)}catch{}try{const s=(t.repeatIssues||[]).slice(0,8).map(a=>{const o=String(a.sample||a.key||"\u2014").trim();return{short:this._execShortLabel(o,40),full:o,value:a.count}});this._drawExecHBar("obs-exec-chart-repeat",s,"rgba(239,68,68,0.7)")}catch{}},_drawExecMonthlySeries(e,t,i,s,a){const o=document.getElementById(e);if(!o)return;const n=new Date,r=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],l=[];for(let b=11;b>=0;b--){const f=new Date(n.getFullYear(),n.getMonth()-b,1);l.push({y:f.getFullYear(),m:f.getMonth(),label:`${r[f.getMonth()]} ${f.getFullYear()}`})}const d=t.filter(i),c=l.map(b=>d.filter(f=>{const g=new Date(f.date);return!isNaN(g.getTime())&&g.getFullYear()===b.y&&g.getMonth()===b.m}).length);if(!this._execToggleEmpty(e,c.reduce((b,f)=>b+f,0)===0))return;this._execDestroyChart(e);const p=new Chart(o,{type:"bar",data:{labels:l.map(b=>b.label),datasets:[{label:s,data:c,backgroundColor:a,borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:c,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:3,tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=p},_drawExecClosureTrend(e,t){const i=document.getElementById(e);if(!i)return;const s=new Date,a=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],o=[];for(let l=11;l>=0;l--){const d=new Date(s.getFullYear(),s.getMonth()-l,1);o.push({y:d.getFullYear(),m:d.getMonth(),label:`${a[d.getMonth()]} ${d.getFullYear()}`})}const n=o.map(l=>{const d=t.filter(p=>{const b=new Date(p.expectedCompletionDate);return!isNaN(b.getTime())&&b.getFullYear()===l.y&&b.getMonth()===l.m});if(!d.length)return null;const c=d.filter(p=>this._execIsClosed(p)).length;return Math.round(c/d.length*100)});if(!this._execToggleEmpty(e,n.every(l=>l===null)))return;this._execDestroyChart(e);const r=new Chart(i,{type:"line",data:{labels:o.map(l=>l.label),datasets:[{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 %",data:n,borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:3,tension:.4,fill:!0,spanGaps:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{callbacks:{label:l=>` ${l.parsed.y}%`}}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,max:100,ticks:{callback:l=>l+"%",font:{size:11}}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=r},_drawExecDeptPerformance(e,t){const i=document.getElementById(e);if(!i)return;const s={};t.forEach(c=>{const p=c.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s[p]=s[p]||{c:0,t:0},s[p].t++,this._execIsClosed(c)&&s[p].c++});const a=Object.entries(s).map(c=>[c[0],Math.round(c[1].c/c[1].t*100),c[1].t]).sort((c,p)=>p[1]-c[1]).slice(0,8);if(!this._execToggleEmpty(e,a.length===0))return;const o=a.map(c=>({short:this._execShortLabel(c[0],34),full:c[0],value:c[1]})),n=o.map(c=>c.value>=90?"rgba(16,185,129,0.8)":c.value>=75?"rgba(245,158,11,0.8)":"rgba(239,68,68,0.8)");this._setExecChartBoxHeight(e,o.length,280),this._execDestroyChart(e);const r=o.map(c=>c.short),l=o.map(c=>c.value),d=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:l,backgroundColor:n,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{left:4,right:8}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:c=>o[c[0]?.dataIndex]?.full||"",label:c=>` \u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642: ${c.parsed.x}%`}}},scales:{x:{beginAtZero:!0,max:100,ticks:{callback:c=>c+"%",font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{autoSkip:!1,font:{size:10},callback:c=>r[c]||""}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=d},_applyAnalysisFilters(e){const t=p=>{const b=document.getElementById(p);return b?b.value.trim():""},i=t("obs-af-site"),s=t("obs-af-observer"),a=t("obs-af-type"),o=t("obs-af-risk"),n=t("obs-af-status"),r=t("obs-af-shift"),l=t("obs-af-dept"),d=[i,s,a,o,n,r,l].some(p=>p!==""),c=document.getElementById("obs-filter-active-badge");return c&&(c.style.display=d?"inline":"none"),e.filter(p=>!(i&&String(p.siteName||"").trim()!==i||s&&String(p.observerName||"").trim()!==s||a&&String(p.observationType||"").trim()!==a||o&&String(p.riskLevel||"").trim()!==o||n&&String(p.status||"").trim()!==n||r&&String(p.shift||"").trim()!==r||l&&String(p.responsibleDepartment||"").trim()!==l))},_populateAnalysisFilterOptions(e){const t=s=>[...new Set(e.map(a=>String(a[s]||"").trim()).filter(Boolean))].sort(),i=(s,a)=>{const o=document.getElementById(s);if(!o)return;const n=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+a.map(r=>`<option value="${r}"${r===n?" selected":""}>${r}</option>`).join("")};i("obs-af-site",t("siteName")),i("obs-af-observer",t("observerName")),i("obs-af-type",t("observationType")),i("obs-af-risk",t("riskLevel")),i("obs-af-status",t("status")),i("obs-af-shift",t("shift")),i("obs-af-dept",t("responsibleDepartment"))},_drawCloseTimeByType(e,t){const i=document.getElementById(e),s=document.getElementById(e+"-empty");if(!i)return;const a=t.filter(f=>f.status==="\u0645\u063A\u0644\u0642"&&(f.overdays||0)>0);if(!a.length){i.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none");const o={};a.forEach(f=>{const g=String(f.observationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();o[g]||(o[g]=[]),o[g].push(f.overdays||0)});const n=Object.entries(o).map(([f,g])=>({label:f,avg:Math.round(g.reduce((y,h)=>y+h,0)/g.length),count:g.length})).sort((f,g)=>g.avg-f.avg).slice(0,10),r=n.map(f=>f.label),l=n.map(f=>f.avg),d=Math.max(...l),c=l.map(f=>f>30?"rgba(239,68,68,0.75)":f>14?"rgba(245,158,11,0.75)":"rgba(16,185,129,0.75)"),p=this.analysisCharts&&this.analysisCharts[e];if(p)try{p.destroy()}catch{}const b=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:l,backgroundColor:c,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:f=>` \u0645\u062A\u0648\u0633\u0637 ${f.parsed.x} \u064A\u0648\u0645 (${n[f.dataIndex].count} \u0645\u0644\u0627\u062D\u0638\u0629)`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"},title:{display:!0,text:"\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0623\u064A\u0627\u0645",font:{size:11}}},y:{ticks:{font:{size:10},callback:f=>String(r[f]).length>18?String(r[f]).slice(0,17)+"\u2026":r[f]}}}}});this.analysisCharts||(this.analysisCharts={}),this.analysisCharts[e]=b},async _exportAnalyticsPDF(){if(!document.getElementById("obs-analytics-root")){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0639\u0646\u0635\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const t=document.getElementById("obs-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin me-1"></i> \u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0646\u0632\u064A\u0644...');try{const s=E=>{const K=document.getElementById(E);if(K)try{return K.toDataURL("image/png",1)}catch{}return""},a=s("obs-chart-status"),o=s("obs-chart-risk"),n=s("obs-chart-trend"),r=s("obs-chart-location")||s("obs-chart-site"),l=s("obs-chart-type"),d=s("obs-chart-dept"),c=s("obs-chart-shift"),p=s("obs-chart-closetime"),f=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(E=>this.normalizeRecord(E)),g=parseInt(this._analysisPeriod||"0",10),y=this._filterObsByPeriod(f,g),h=typeof this._applyAnalysisFilters=="function"?this._applyAnalysisFilters(y):y,S=h.length,m=h.filter(E=>E.status==="\u0645\u0641\u062A\u0648\u062D"||E.status==="\u062C\u062F\u064A\u062F").length,k=h.filter(E=>E.status==="\u0645\u063A\u0644\u0642").length,T=h.filter(E=>E.status==="\u062C\u0627\u0631\u064A"||E.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,C=h.filter(E=>E.riskLevel==="\u0639\u0627\u0644\u064A"||E.riskLevel==="\u0639\u0627\u0644\u064A\u0629").length,w=h.filter(E=>{if(!E.date)return!1;const K=new Date(E.date),be=new Date;return K.getFullYear()===be.getFullYear()&&K.getMonth()===be.getMonth()}).length,u=document.getElementById("obs-leaderboard-container");if(u){const E={},K={};h.forEach(Q=>{const oe=(Q.observerName||"").trim(),ee=(Q.responsibleDepartment||"").trim();oe&&!oe.includes("\u0645\u062C\u0647\u0648\u0644")&&(E[oe]=(E[oe]||0)+1),ee&&(K[ee]=(K[ee]||0)+1)});const be=Object.entries(E).sort((Q,oe)=>oe[1]-Q[1]).slice(0,3),ke=Object.entries(K).sort((Q,oe)=>oe[1]-Q[1]).slice(0,3),Se=["\u{1F947}","\u{1F948}","\u{1F949}"];let he='<div style="background:#f8fafc;padding:12px;border-radius:10px;border:1px solid #e2e8f0;"><div style="font-weight:700;font-size:0.85rem;color:#1e3a8a;margin-bottom:8px;"><i class="fas fa-user-shield ml-1 text-blue-600"></i> \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0641\u062A\u0634\u064A\u0646 \u0631\u0635\u062F\u0627\u064B:</div>';be.length===0?he+='<div style="font-size:0.78rem;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629</div>':be.forEach(([Q,oe],ee)=>{he+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:0.82rem;">
                        <span>${Se[ee]} <b>${Utils.escapeHTML(Q)}</b></span>
                        <span style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:10px;font-weight:700;font-size:0.75rem;">${oe} \u0645\u0644\u0627\u062D\u0638\u0629</span>
                    </div>`}),he+="</div>",he+='<div style="background:#f8fafc;padding:12px;border-radius:10px;border:1px solid #e2e8f0;"><div style="font-weight:700;font-size:0.85rem;color:#15803d;margin-bottom:8px;"><i class="fas fa-building ml-1 text-emerald-600"></i> \u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u062A\u0641\u0627\u0639\u0644\u0627\u064B:</div>',ke.length===0?he+='<div style="font-size:0.78rem;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629</div>':ke.forEach(([Q,oe],ee)=>{he+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:0.82rem;">
                        <span>${Se[ee]} <b>${Utils.escapeHTML(Q)}</b></span>
                        <span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:10px;font-weight:700;font-size:0.75rem;">${oe} \u0625\u062C\u0631\u0627\u0621</span>
                    </div>`}),he+="</div>",u.innerHTML=he}const U=S>0?Math.round(k/S*100)+"%":"0%",L=h.filter(E=>E.status==="\u0645\u063A\u0644\u0642"&&E.overdays>0),F=L.length>0?Math.round(L.reduce((E,K)=>E+(K.overdays||0),0)/L.length)+" \u064A\u0648\u0645":"\u2014",q=h.filter(E=>(E.riskLevel==="\u0639\u0627\u0644\u064A"||E.riskLevel==="\u0639\u0627\u0644\u064A\u0629")&&E.status!=="\u0645\u063A\u0644\u0642").sort((E,K)=>(K.overdays||0)-(E.overdays||0)).slice(0,7),V=q.length>0?q.map(E=>`
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 6px 8px; font-weight: bold; color: #1e40af; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(E.isoCode||E.id||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(String(E.date||"").slice(0,10)||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(E.observationType||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML([E.siteName,E.locationName].filter(Boolean).join(" - ")||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(E.observerName||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">${Utils.escapeHTML(E.responsibleDepartment||"\u2014")}</td>
                        <td style="padding: 6px 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;"><span style="display: inline-block; padding: 2px 7px; border-radius: 5px; font-weight: bold; font-size: 9.5px; ${E.status==="\u0645\u063A\u0644\u0642"?"background:#d1fae5;color:#047857;":"background:#fef3c7;color:#b45309;"}">${Utils.escapeHTML(E.status||"\u2014")}</span></td>
                    </tr>
                `).join(""):'<tr><td colspan="7" style="text-align: center; padding: 12px; color: #64748b;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</td></tr>',A=String(AppState?.companySettings?.name||"SafetyHub | ICAPP").trim(),_=String(AppState?.companySettings?.secondaryName||"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629").trim(),j=AppState?.companySettings?.logo||"",X=typeof AppState<"u"&&AppState.companySettings?.policyFormCode||"SF-HSE-DOB-02",le=g===30?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":g===90?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":g===180?"\u0622\u062E\u0631 6 \u0623\u0634\u0647\u0631":g===365?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062A\u0631\u0627\u062A";if((typeof html2canvas>"u"||!Utils?.PdfExport?.getJsPdfConstructor?.())&&await Promise.all([this._loadAnalyticsLib("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",()=>typeof html2canvas<"u"),this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>!!Utils?.PdfExport?.getJsPdfConstructor?.())]),typeof html2canvas>"u"||!Utils?.PdfExport?.getJsPdfConstructor?.())throw new Error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A \u062A\u0635\u062F\u064A\u0631 PDF");const J=document.createElement("div");J.style.cssText='position: fixed; left: -99999px; top: 0; width: 1120px; z-index: -9999; background: #ffffff; color: #0f172a; direction: rtl; font-family: "Cairo", "Segoe UI", Tahoma, Arial, sans-serif; box-sizing: border-box;';const D=document.createElement("div");D.style.cssText="width: 1120px; min-height: 775px; padding: 22px 26px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;",D.innerHTML=`
                <div>
                    <!-- \u0631\u0623\u0633 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u064A -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            ${j?`<img src="${j}" style="height: 48px; max-width: 120px; object-fit: contain;">`:""}
                            <div>
                                <div style="font-size: 16px; font-weight: 800; color: #1e3a8a;">${Utils.escapeHTML(A)}</div>
                                <div style="font-size: 11px; color: #475569; font-weight: 600;">${Utils.escapeHTML(_)}</div>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 17px; font-weight: 900; color: #0f172a;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>
                            <div style="font-size: 10.5px; color: #64748b; font-weight: 600;">Daily Safety Observations Analytics Report</div>
                        </div>
                        <div style="text-align: left; font-size: 10.5px; color: #475569; line-height: 1.4;">
                            <div><b>\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C:</b> ${Utils.escapeHTML(X)}</div>
                            <div><b>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</b> ${new Date().toLocaleDateString("ar-EG")}</div>
                            <div><b>\u0627\u0644\u0641\u062A\u0631\u0629:</b> ${Utils.escapeHTML(le)}</div>
                        </div>
                    </div>

                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; border-radius: 8px; padding: 7px 14px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                        <div style="font-size: 13.5px; font-weight: 800;">\u{1F4CA} \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629</div>
                        <div style="font-size: 11px; font-weight: 600; opacity: 0.95;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629: ${S}</div>
                    </div>

                    <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 -->
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 10px;">
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #2563eb; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #1e3a8a; line-height: 1.1;">${S}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #d97706; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #b45309; line-height: 1.1;">${m}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #7c3aed; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #6d28d9; line-height: 1.1;">${T}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #059669; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #047857; line-height: 1.1;">${k}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #dc2626; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #b91c1c; line-height: 1.1;">${C}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #0284c7; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #0369a1; line-height: 1.1;">${w}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #4f46e5; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #4338ca; line-height: 1.1;">${U}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        </div>
                        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-top: 3.5px solid #0d9488; border-radius: 8px; padding: 8px 10px; text-align: center;">
                            <div style="font-size: 20px; font-weight: 800; color: #0f766e; line-height: 1.1;">${F}</div>
                            <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-top: 3px;">\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u062F\u0627\u0626\u0631\u064A\u0629 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                            <div style="font-size: 11.5px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 4px;">\u{1F518} \u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</div>
                            ${a?`<img src="${a}" style="width: 100%; max-height: 175px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:20px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
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
                    <span>${Utils.escapeHTML(A)} \u2014 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0631\u064A \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                    <span>\u0635\u0641\u062D\u0629 1 \u0645\u0646 2</span>
                </div>
            `;const z=document.createElement("div");z.style.cssText="width: 1120px; min-height: 775px; padding: 22px 26px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;",z.innerHTML=`
                <div>
                    <!-- \u0631\u0623\u0633 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${j?`<img src="${j}" style="height: 38px; max-width: 100px; object-fit: contain;">`:""}
                            <div>
                                <div style="font-size: 14px; font-weight: 800; color: #1e3a8a;">${Utils.escapeHTML(A)}</div>
                                <div style="font-size: 10px; color: #64748b;">${Utils.escapeHTML(_)}</div>
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
                            ${l?`<img src="${l}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
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
                            ${c?`<img src="${c}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:p?`<img src="${p}" style="width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto;">`:'<div style="text-align:center;color:#94a3b8;padding:10px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>'}
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
                                ${V}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- \u062A\u0630\u064A\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 6px; margin-top: 8px; font-size: 9.5px; color: #64748b;">
                    <span>${Utils.escapeHTML(A)} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 (QHSSE)</span>
                    <span>\u0635\u0641\u062D\u0629 2 \u0645\u0646 2</span>
                </div>
            `,J.appendChild(D),J.appendChild(z),document.body.appendChild(J),await new Promise(E=>setTimeout(E,160));const Z={scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1},ie=await html2canvas(D,Z),O=await html2canvas(z,Z);J.remove();const I=Utils.PdfExport.createPdf({orientation:"landscape",unit:"mm",format:"a4"});if(!I)throw new Error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0647\u064A\u0626\u0629 \u0645\u062D\u0631\u0643 PDF");const W=I.internal.pageSize.getWidth(),ae=I.internal.pageSize.getHeight(),N=6,M=W-N*2,Y=ae-N*2,me=ie.toDataURL("image/jpeg",.94),ue=Math.min(ie.height/ie.width*M,Y);I.addImage(me,"JPEG",N,N,M,ue),I.addPage();const fe=O.toDataURL("image/jpeg",.94),ve=Math.min(O.height/O.width*M,Y);I.addImage(fe,"JPEG",N,N,M,ve);const R=`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A-\u0627\u0644\u064A\u0648\u0645\u064A\u0629-${new Date().toISOString().slice(0,10)}.pdf`;Utils.PdfExport.savePdf(I,R),typeof Notification<"u"&&Notification.success&&Notification.success("\u2705 \u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0645\u0644\u0641 PDF \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u064A \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0646\u062C\u0627\u062D!")}catch(s){typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF: "+s.message)}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_loadAnalyticsLib(e,t){return new Promise((i,s)=>{if(t())return i();const a=document.createElement("script");a.src=e,a.onload=()=>i(),a.onerror=()=>s(new Error("Failed to load: "+e)),document.head.appendChild(a)})},toggleAnalyticsFilters(){const e=document.getElementById("obs-filter-panel"),t=document.getElementById("obs-toggle-filters-btn");if(e){const i=e.style.display!=="none";e.style.display=i?"none":"block",t&&(t.style.background=i?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)")}},resetAnalyticsFilters(){["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(e=>{const t=document.getElementById(e);t&&(t.value="")}),this.updateAnalysisResults()},setAnalysisPeriod(e){this._analysisPeriod=String(e||"0");const t=document.getElementById("obs-analytics-root");t&&t.querySelectorAll(".obs-period-btn").forEach(i=>{const s=i.getAttribute("data-period")===String(e);i.style.background=s?"#fff":"rgba(255,255,255,0.15)",i.style.color=s?"#1e40af":"#fff"}),this.updateAnalysisResults()},_bindAnalyticsEvents(){if(!document.getElementById("obs-analytics-root"))return;const t=document.getElementById("obs-toggle-filters-btn");t&&!t.hasAttribute("data-event-bound")&&(t.setAttribute("data-event-bound","true"),t.addEventListener("click",()=>this.toggleAnalyticsFilters()));const i=document.getElementById("obs-filter-reset-btn");i&&!i.hasAttribute("data-event-bound")&&(i.setAttribute("data-event-bound","true"),i.addEventListener("click",()=>this.resetAnalyticsFilters()));const s=document.getElementById("obs-analytics-refresh");s&&!s.hasAttribute("data-event-bound")&&(s.setAttribute("data-event-bound","true"),s.addEventListener("click",()=>this.updateAnalysisResults()));const a=document.getElementById("obs-export-pdf-btn");a&&!a.hasAttribute("data-event-bound")&&(a.setAttribute("data-event-bound","true"),a.addEventListener("click",()=>this._exportAnalyticsPDF())),["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(o=>{const n=document.getElementById(o);n&&!n.hasAttribute("data-event-bound")&&(n.setAttribute("data-event-bound","true"),n.addEventListener("change",()=>this.updateAnalysisResults()))})},_renderSafetyChampionsLeaderboard(e){const t=document.getElementById("obs-leaderboard-container");if(!t)return;const i={},s={};(e||[]).forEach(l=>{const d=String(l.observerName||l.recordedByName||l.reporterName||"").trim(),c=String(l.responsibleDepartment||l.targetDept||l.department||"").trim();d&&!d.includes("\u0645\u062C\u0647\u0648\u0644")&&d!=="-"&&d!=="null"&&(i[d]=(i[d]||0)+1),c&&c!=="-"&&c!=="null"&&(s[c]=(s[c]||0)+1)});const a=Object.entries(i).sort((l,d)=>d[1]-l[1]).slice(0,4),o=Object.entries(s).sort((l,d)=>d[1]-l[1]).slice(0,4),n=["\u{1F947}","\u{1F948}","\u{1F949}","\u{1F396}\uFE0F"];let r=`
            <div style="background:#f8fafc;padding:14px;border-radius:12px;border:1.5px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight:800;font-size:0.88rem;color:#1e3a8a;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
                    <i class="fas fa-user-shield text-blue-600"></i> \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0641\u062A\u0634\u064A\u0646 \u0631\u0635\u062F\u0627\u064B (\u0645\u064A\u062F\u0627\u0646\u064A\u0627\u064B):
                </div>
        `;a.length===0?r+='<div style="font-size:0.8rem;color:#94a3b8;padding:8px 0;text-align:center;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</div>':a.forEach(([l,d],c)=>{r+=`
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px dashed #e2e8f0;font-size:0.84rem;">
                        <span style="font-weight:700;color:#1e293b;">${n[c]||"\u{1F396}\uFE0F"} ${Utils.escapeHTML(l)}</span>
                        <span style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:12px;font-weight:800;font-size:0.75rem;">${d} \u0645\u0644\u0627\u062D\u0638\u0629</span>
                    </div>
                `}),r+="</div>",r+=`
            <div style="background:#f8fafc;padding:14px;border-radius:12px;border:1.5px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight:800;font-size:0.88rem;color:#15803d;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
                    <i class="fas fa-building text-emerald-600"></i> \u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u062A\u0641\u0627\u0639\u0644\u0627\u064B \u0648\u0645\u0639\u0627\u0644\u062C\u0629:
                </div>
        `,o.length===0?r+='<div style="font-size:0.8rem;color:#94a3b8;padding:8px 0;text-align:center;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</div>':o.forEach(([l,d],c)=>{r+=`
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px dashed #e2e8f0;font-size:0.84rem;">
                        <span style="font-weight:700;color:#1e293b;">${n[c]||"\u{1F396}\uFE0F"} ${Utils.escapeHTML(l)}</span>
                        <span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-weight:800;font-size:0.75rem;">${d} \u0625\u062C\u0631\u0627\u0621</span>
                    </div>
                `}),r+="</div>",t.innerHTML=r},async updateAnalysisResults(){const e=document.getElementById("obs-analytics-root");if(!e)return;const t=parseInt(this._analysisPeriod||"0",10),s=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(A=>this.normalizeRecord(A)),a=this._filterObsByPeriod(s,t);this._populateAnalysisFilterOptions(a),this._bindAnalyticsEvents();const o=this._applyAnalysisFilters(a),n=o.length,r=document.getElementById("obs-filter-results-count");r&&(r.textContent=`${n} \u0645\u0644\u0627\u062D\u0638\u0629`);const l=o.filter(A=>A.status==="\u0645\u0641\u062A\u0648\u062D"||A.status==="\u062C\u062F\u064A\u062F").length,d=o.filter(A=>A.status==="\u0645\u063A\u0644\u0642").length,c=o.filter(A=>A.status==="\u062C\u0627\u0631\u064A"||A.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,p=o.filter(A=>A.riskLevel==="\u0639\u0627\u0644\u064A"||A.riskLevel==="\u0639\u0627\u0644\u064A\u0629").length,b=o.filter(A=>{if(!A.date)return!1;const _=new Date(A.date),j=new Date;return _.getFullYear()===j.getFullYear()&&_.getMonth()===j.getMonth()}).length,f=n>0?Math.round(d/n*100):0,g=o.filter(A=>A.status==="\u0645\u063A\u0644\u0642"&&A.overdays>0),y=g.length>0?Math.round(g.reduce((A,_)=>A+(_.overdays||0),0)/g.length):0,h=document.getElementById("obs-kpi-strip");if(h){const A=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",value:n,icon:"fas fa-clipboard-list",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629",value:l,icon:"fas fa-folder-open",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",value:c,icon:"fas fa-spinner",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0645\u063A\u0644\u0642\u0629",value:d,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",value:p,icon:"fas fa-exclamation-triangle",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:b,icon:"fas fa-calendar-day",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:f+"%",icon:"fas fa-chart-pie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:y?y+" \u064A\u0648\u0645":"\u2014",icon:"fas fa-stopwatch",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"}];h.innerHTML=A.map(_=>`
                <div style="background:${_.bg};border:1px solid ${_.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${_.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${_.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${_.color};line-height:1;">${_.value}</div>
                        <div style="font-size:0.7rem;color:#64748b;margin-top:2px;white-space:nowrap;">${_.label}</div>
                    </div>
                </div>`).join("")}if(this._renderSafetyChampionsLeaderboard(o),!await this.ensureChartJSLoaded()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.</span></div>');return}const m=this._groupBy(o,"status"),k={\u0645\u0641\u062A\u0648\u062D:"rgba(245,158,11,0.8)",\u0645\u063A\u0644\u0642:"rgba(16,185,129,0.8)",\u062C\u0627\u0631\u064A:"rgba(139,92,246,0.8)","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"rgba(99,102,241,0.8)",\u062C\u062F\u064A\u062F:"rgba(59,130,246,0.8)"};this._drawDoughnut("obs-chart-status",m.labels,m.data,m.labels.map(A=>k[A]||"rgba(148,163,184,0.8)"));const T=this._groupBy(o,"riskLevel"),C={\u0639\u0627\u0644\u064A:"rgba(239,68,68,0.85)",\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637:"rgba(245,158,11,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636:"rgba(16,185,129,0.85)",\u0628\u0633\u064A\u0637:"rgba(16,185,129,0.85)",\u0628\u0633\u064A\u0637\u0629:"rgba(16,185,129,0.85)"};this._drawDoughnut("obs-chart-risk",T.labels,T.data,T.labels.map(A=>C[A]||"rgba(148,163,184,0.8)")),this._drawTrend("obs-chart-trend",a);const w=this._groupBy(o,"observationType",10);this._drawHBar("obs-chart-type",w.labels,w.data,"rgba(16,185,129,0.75)");const u=this._groupBy(o,"locationName",8);this._drawHBar("obs-chart-location",u.labels,u.data,"rgba(245,158,11,0.75)");const U=this._groupBy(o,"responsibleDepartment",8);this._drawHBar("obs-chart-dept",U.labels,U.data,"rgba(14,165,233,0.75)");const L=this._groupBy(o,"shift");this._drawHBar("obs-chart-shift",L.labels,L.data,"rgba(249,115,22,0.75)"),this._drawCloseTimeByType("obs-chart-closetime",o);const F=o.filter(A=>(A.riskLevel==="\u0639\u0627\u0644\u064A"||A.riskLevel==="\u0639\u0627\u0644\u064A\u0629")&&A.status!=="\u0645\u063A\u0644\u0642").sort((A,_)=>(_.overdays||0)-(A.overdays||0)).slice(0,20),q=document.getElementById("obs-critical-tbody"),V=document.getElementById("obs-critical-count");V&&(V.textContent=`${F.length} \u0645\u0644\u0627\u062D\u0638\u0629`),q&&(F.length===0?q.innerHTML='<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629 \u0645\u0641\u062A\u0648\u062D\u0629</td></tr>':q.innerHTML=F.map((A,_)=>{const j=A.overdays||0,X=j>30?"#ef4444":j>14?"#f59e0b":"#64748b",le={\u0645\u0641\u062A\u0648\u062D:"background:#fef3c7;color:#92400e;",\u062C\u0627\u0631\u064A:"background:#ede9fe;color:#5b21b6;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#ede9fe;color:#5b21b6;",\u062C\u062F\u064A\u062F:"background:#dbeafe;color:#1e40af;"}[A.status]||"background:#f1f5f9;color:#374151;",J=_%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${J};" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='${J}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;white-space:nowrap;">${Utils.escapeHTML(A.isoCode||A.id||"\u2014")}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${A.date?new Date(A.date).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(A.observationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(A.locationName||A.siteName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(A.observerName||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(A.responsibleDepartment||"\u2014")}</td>
                        <td style="padding:9px 12px;"><span style="padding:3px 8px;border-radius:20px;font-size:0.7rem;font-weight:700;${le}">${Utils.escapeHTML(A.status||"\u2014")}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${X};">${j>0?j+" \u064A\u0648\u0645":"\u2014"}</td>
                    </tr>`}).join(""))},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",i.crossOrigin="anonymous";let s=!1;const a=()=>{!s&&typeof Chart<"u"&&(s=!0,t(!0))},o=()=>{if(s)return;const n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",n.crossOrigin="anonymous";let r=!1;n.onload=()=>{!r&&typeof Chart<"u"&&(r=!0,s=!0,t(!0))},n.onerror=()=>{s||(s=!0,t(!1))},document.head.appendChild(n)};i.onload=()=>{setTimeout(()=>{!s&&typeof Chart<"u"?(s=!0,t(!0)):s||o()},500)},i.onerror=o,setTimeout(()=>{s||(s=!0,t(typeof Chart<"u"))},8e3);try{document&&document.head?document.head.appendChild(i):t(!1)}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 script Chart.js:",n),t(!1)}})},loadInfoCards(){const e=document.getElementById("info-cards-container");if(!e)return;const t=JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]");if(t.length===0){const s=[{id:"card_1",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",icon:"fas fa-clipboard-list",color:"blue",description:"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645",enabled:!0},{id:"card_2",title:"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",icon:"fas fa-folder-open",color:"orange",description:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u064A \u0644\u0645 \u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0628\u0639\u062F",enabled:!0},{id:"card_3",title:"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0630\u0627\u062A \u0645\u0633\u062A\u0648\u0649 \u062E\u0637\u0648\u0631\u0629 \u0639\u0627\u0644\u064A",enabled:!0}];return localStorage.setItem("dailyObservations_infoCards",JSON.stringify(s)),this.loadInfoCards()}const i=t.filter(s=>s.enabled);if(i.length===0){e.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}e.innerHTML=i.map(s=>{const a={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"},o=a[s.color]||a.blue,n=s.color||"blue";return`
                <div class="content-card border-2 ${o}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <i class="${s.icon||"fas fa-info-circle"} text-${n}-600 text-xl"></i>
                            <h4 class="font-semibold">${Utils.escapeHTML(s.title)}</h4>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(s.description||"")}</p>
                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <div id="card-value-${s.id}" class="text-2xl font-bold text-${n}-700">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            `}).join(""),this.calculateCardValues()},calculateCardValues(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(a=>this.normalizeRecord(a));JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]").filter(a=>a.enabled).forEach(a=>{const o=document.getElementById(`card-value-${a.id}`);if(!o)return;let n=0;switch(a.id){case"card_1":n=t.length;break;case"card_2":n=t.filter(r=>r.status==="\u0645\u0641\u062A\u0648\u062D"||r.status==="\u062C\u0627\u0631\u064A").length;break;case"card_3":n=t.filter(r=>r.riskLevel==="\u0639\u0627\u0644\u064A").length;break;default:a.field&&(n=t.filter(r=>{const l=r[a.field];return a.fieldValue?l===a.fieldValue:l&&l!==""&&l!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}).length)}o.textContent=n.toLocaleString("en-US")})},showManageCardsModal(){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const e=JSON.parse(localStorage.getItem("dailyObservations_infoCards")||"[]"),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
                        ${e.map((s,a)=>this.renderCardEditForm(s,a)).join("")}
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
        `,document.body.appendChild(t),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t);const i=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",i),t.querySelector('[data-action="close"]')?.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),t.querySelector("#add-new-card-btn")?.addEventListener("click",()=>{const s={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,field:"",fieldValue:""};e.push(s);const a=t.querySelector("#cards-list-container");a.innerHTML=e.map((o,n)=>this.renderCardEditForm(o,n)).join(""),this.bindCardEditEvents(t)}),t.querySelector("#save-cards-btn")?.addEventListener("click",()=>{const s=[];t.querySelectorAll(".card-edit-form").forEach((a,o)=>{const n={id:a.getAttribute("data-card-id"),title:a.querySelector(".card-title-input")?.value||"",icon:a.querySelector(".card-icon-input")?.value||"fas fa-info-circle",color:a.querySelector(".card-color-input")?.value||"blue",description:a.querySelector(".card-description-input")?.value||"",enabled:a.querySelector(".card-enabled-input")?.checked||!1,field:a.querySelector(".card-field-input")?.value||"",fieldValue:a.querySelector(".card-field-value-input")?.value||""};s.push(n)}),localStorage.setItem("dailyObservations_infoCards",JSON.stringify(s)),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D"),i(),this.loadInfoCards(),this.updateAnalysisResults()}),this.bindCardEditEvents(t)},renderCardEditForm(e,t){const i=["blue","green","red","orange","purple","yellow"],s=["fas fa-info-circle","fas fa-chart-line","fas fa-chart-bar","fas fa-chart-pie","fas fa-exclamation-triangle","fas fa-check-circle","fas fa-times-circle","fas fa-clipboard-list","fas fa-folder-open","fas fa-flag","fas fa-bell"];return`
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
                            ${i.map(a=>`<option value="${a}" ${e.color===a?"selected":""}>${a}</option>`).join("")}
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
        `},bindCardEditEvents(e){e.querySelectorAll(".remove-card-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&e.querySelector(`.card-edit-form[data-card-id="${i}"]`)?.remove()})})},async loadDataAnalysis(){await this.updateAnalysisResults()},renderAnalysisCharts(){},_getRiskCategoryConfigStorageKey(){return"dailyObs_riskCategoryConfig"},_ensureRiskCategoryConfig(){const e={customCategories:[],observationTypeMap:{},customObservationTypes:[]};if(this._riskCategoryConfigCache)return this._riskCategoryConfigCache;let t=null;try{AppState?.appData?.dailyObsRiskConfig&&typeof AppState.appData.dailyObsRiskConfig=="object"&&(t=AppState.appData.dailyObsRiskConfig)}catch{}if(!t)try{t=JSON.parse(localStorage.getItem(this._getRiskCategoryConfigStorageKey())||"null")}catch{t=null}return this._riskCategoryConfigCache={...e,...t||{}},AppState.appData||(AppState.appData={}),AppState.appData.dailyObsRiskConfig=this._riskCategoryConfigCache,this._riskCategoryConfigCache},_saveRiskCategoryConfig(e){this._riskCategoryConfigCache=e,AppState.appData||(AppState.appData={}),AppState.appData.dailyObsRiskConfig=e;try{localStorage.setItem(this._getRiskCategoryConfigStorageKey(),JSON.stringify(e))}catch{}},_getDefaultObservationTypeRiskMap(){return{"\u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0648\u0643\u064A\u0629":"behavioral","\u0645\u0644\u0627\u062D\u0638\u0629 \u0634\u0631\u0637 \u0639\u0645\u0644":"housekeeping","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062F\u0627\u0629":"tools_hand","\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0639\u062F\u0627\u062A":"mechanical","\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644":"environmental","\u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u062E\u0631\u0649":"general"}},_getObservationTypeRiskMap(){const e=this._ensureRiskCategoryConfig();return{...this._getDefaultObservationTypeRiskMap(),...e.observationTypeMap||{}}},_getBuiltinTopRiskCategoryDefs(){return[{id:"electricity",labelKey:"module.dailyobs.top10.category.electricity",icon:"fa-bolt",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",keywords:["\u0643\u0647\u0631\u0628\u0627\u0621","\u0643\u0647\u0631\u0628\u0627\u0626\u064A","\u0643\u0627\u0628\u0644\u0627\u062A","\u0643\u0627\u0628\u0644","\u0623\u0633\u0644\u0627\u0643","\u0633\u0644\u0643","\u0644\u0648\u062D\u0629 \u0643\u0647\u0631\u0628","\u0642\u0627\u0637\u0639","\u062C\u0647\u062F","\u062A\u0645\u062F\u064A\u062F\u0627\u062A","\u0645\u0641\u0627\u062A\u064A\u062D","\u0642\u0635\u0648\u0631 \u0639\u0632\u0644","\u0627\u0631\u062A\u062C\u0627\u062C","electric","electrical","cable","wiring","voltage","panel","breaker"]},{id:"mechanical",labelKey:"module.dailyobs.top10.category.mechanical",icon:"fa-cogs",color:"#4f46e5",bg:"#eef2ff",border:"#a5b4fc",keywords:["\u0645\u064A\u0643\u0627\u0646\u064A\u0643","\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0629","\u0622\u0644\u0629","\u0627\u0644\u0622\u0644\u0627\u062A","\u0645\u0639\u062F\u0627\u062A","\u0645\u0639\u062F\u0629","\u062A\u0631\u0633","\u0633\u0648\u0641\u062A\u064A","\u062D\u0645\u0627\u064A\u0629 \u0645\u0627\u0643\u064A\u0646\u0629","guarding","\u0635\u064A\u0627\u0646\u0629","\u062A\u0634\u062D\u064A\u0645","\u0627\u0647\u062A\u0632\u0627\u0632","mechanical","machine","equipment","conveyor","guard","loto","pinch"]},{id:"smoking",labelKey:"module.dailyobs.top10.category.smoking",icon:"fa-smoking-ban",color:"#dc2626",bg:"#fef2f2",border:"#fca5a5",keywords:["\u062A\u062F\u062E\u064A\u0646","\u0633\u064A\u062C\u0627\u0631\u0629","\u0633\u062C\u0627\u0626\u0631","\u062F\u062E\u0627\u0646","smoking","cigarette","tobacco","vape","no smoking"]},{id:"ppe",labelKey:"module.dailyobs.top10.category.ppe",icon:"fa-hard-hat",color:"#0891b2",bg:"#ecfeff",border:"#67e8f9",keywords:["\u0645\u0647\u0645\u0627\u062A","\u0648\u0642\u0627\u064A\u0629","\u062E\u0648\u0630\u0629","\u0642\u0641\u0627\u0632","\u0646\u0638\u0627\u0631\u0627\u062A","\u062D\u0630\u0627\u0621","\u0633\u062A\u0631\u0629","\u062D\u0632\u0627\u0645","ppe","helmet","gloves","goggles","harness","respirator","ear plug","\u0648\u0627\u0642\u064A"]},{id:"storage",labelKey:"module.dailyobs.top10.category.storage",icon:"fa-warehouse",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",keywords:["\u062A\u062E\u0632\u064A\u0646","\u0645\u0633\u062A\u0648\u062F\u0639","\u0631\u0641","\u0623\u0631\u0641\u0641","\u062A\u062D\u0645\u064A\u0644","\u062A\u0643\u062F\u0633","\u0645\u0645\u0631","\u0639\u0627\u0626\u0642","\u0645\u0648\u0627\u062F","storage","warehouse","stacking","aisle","blocking","material handling","\u0631\u0627\u0641\u0639\u0629"]},{id:"fire",labelKey:"module.dailyobs.top10.category.fire",icon:"fa-fire-extinguisher",color:"#b91c1c",bg:"#fff1f2",border:"#fda4af",keywords:["\u062D\u0631\u064A\u0642","\u0637\u0641\u0627\u064A\u0629","\u0637\u0641\u0627\u064A\u0627\u062A","\u0625\u0646\u0630\u0627\u0631","\u0627\u0646\u0630\u0627\u0631","\u062E\u0631\u0637\u0648\u0645","\u0631\u0634\u0627\u0634","sprinkler","\u0625\u0637\u0641\u0627\u0621","fire","extinguisher","alarm","hose","smoke detector","fm200"]},{id:"behavioral",labelKey:"module.dailyobs.top10.category.behavioral",icon:"fa-user-shield",color:"#7c3aed",bg:"#f5f3ff",border:"#c4b5fd",keywords:["\u0633\u0644\u0648\u0643","\u0633\u0644\u0648\u0643\u064A\u0629","\u062A\u0635\u0631\u0641","unsafe act","behavior","conduct","shortcut","bypass"]},{id:"chemical",labelKey:"module.dailyobs.top10.category.chemical",icon:"fa-flask",color:"#9333ea",bg:"#faf5ff",border:"#d8b4fe",keywords:["\u0643\u064A\u0645\u064A\u0627\u0626\u064A","\u0643\u064A\u0645\u064A\u0627\u0621","\u0645\u0630\u064A\u0628","\u062D\u0645\u0636","\u0642\u0644\u0648\u064A","\u0633\u0627\u0626\u0644","msds","chemical","solvent","acid","hazmat","spill"]},{id:"height",labelKey:"module.dailyobs.top10.category.height",icon:"fa-person-falling",color:"#ea580c",bg:"#fff7ed",border:"#fdba74",keywords:["\u0627\u0631\u062A\u0641\u0627\u0639","\u0633\u0642\u0627\u0644\u0629","\u0633\u0644\u0645","\u062D\u0628\u0644","\u0633\u0642\u0648\u0637","working at height","scaffold","ladder","fall","harness","roof"]},{id:"confined_space",labelKey:"module.dailyobs.top10.category.confined_space",icon:"fa-dungeon",color:"#57534e",bg:"#fafaf9",border:"#d6d3d1",keywords:["\u0645\u062D\u0635\u0648\u0631","\u062E\u0632\u0627\u0646","\u0628\u0626\u0631","confined","tank","manhole","entry permit"]},{id:"housekeeping",labelKey:"module.dailyobs.top10.category.housekeeping",icon:"fa-broom",color:"#0d9488",bg:"#f0fdfa",border:"#5eead4",keywords:["\u0646\u0638\u0627\u0641\u0629","\u062A\u0631\u062A\u064A\u0628","\u0641\u0648\u0636\u0649","\u0645\u0645\u0631","housekeeping","clutter","walkway","order","5s"]},{id:"ergonomics",labelKey:"module.dailyobs.top10.category.ergonomics",icon:"fa-chair",color:"#6366f1",bg:"#eef2ff",border:"#a5b4fc",keywords:["\u0623\u0631\u062C\u0648\u0646\u0648\u0645\u0643\u0633","\u0648\u0636\u0639\u064A\u0629","\u0638\u0647\u0631","\u062A\u0643\u0631\u0627\u0631","ergonomic","posture","repetitive","manual handling"]},{id:"traffic",labelKey:"module.dailyobs.top10.category.traffic",icon:"fa-truck",color:"#ca8a04",bg:"#fefce8",border:"#fde047",keywords:["\u0645\u0631\u0648\u0631","\u0645\u0631\u0643\u0628\u0629","\u0633\u064A\u0627\u0631\u0629","\u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","forklift","vehicle","traffic","pedestrian","route"]},{id:"lifting",labelKey:"module.dailyobs.top10.category.lifting",icon:"fa-dolly",color:"#b45309",bg:"#fffbeb",border:"#fcd34d",keywords:["\u0631\u0641\u0639","\u062D\u0645\u0644","\u0645\u0646\u0627\u0648\u0644\u0629","\u0648\u0632\u0646","lifting","manual handling","load","crane","rigging"]},{id:"hot_work",labelKey:"module.dailyobs.top10.category.hot_work",icon:"fa-fire",color:"#c2410c",bg:"#fff7ed",border:"#fdba74",keywords:["\u0644\u062D\u0627\u0645","\u0642\u0637\u0639","\u0634\u0631\u0631","\u0639\u0645\u0644 \u0633\u0627\u062E\u0646","welding","hot work","grinding","spark"]},{id:"environmental",labelKey:"module.dailyobs.top10.category.environmental",icon:"fa-leaf",color:"#16a34a",bg:"#f0fdf4",border:"#86efac",keywords:["\u0628\u064A\u0626\u0629","\u062A\u0644\u0648\u062B","\u0646\u0641\u0627\u064A\u0627\u062A","\u0625\u0636\u0627\u0621\u0629","\u062A\u0647\u0648\u064A\u0629","environment","waste","ventilation","lighting","temperature"]},{id:"tools_hand",labelKey:"module.dailyobs.top10.category.tools_hand",icon:"fa-screwdriver-wrench",color:"#475569",bg:"#f8fafc",border:"#cbd5e1",keywords:["\u0623\u062F\u0627\u0629","\u0623\u062F\u0648\u0627\u062A","\u0645\u0641\u062A\u0627\u062D","\u0645\u0637\u0631\u0642\u0629","\u0645\u0646\u0634\u0627\u0631","tool","hand tool","power tool"]},{id:"slips_trips",labelKey:"module.dailyobs.top10.category.slips_trips",icon:"fa-shoe-prints",color:"#0284c7",bg:"#f0f9ff",border:"#7dd3fc",keywords:["\u062A\u0632\u062D\u0644\u0642","\u0633\u0642\u0648\u0637","\u0631\u0637\u0648\u0628\u0629","\u0632\u064A\u062A","slip","trip","fall","wet floor"]},{id:"noise",labelKey:"module.dailyobs.top10.category.noise",icon:"fa-volume-high",color:"#be185d",bg:"#fdf2f8",border:"#f9a8d4",keywords:["\u0636\u0648\u0636\u0627\u0621","\u0635\u0648\u062A","\u0633\u0645\u0639","noise","hearing","decibel","ear protection"]}]},getTopRiskCategoryDefs(){const e=this._getBuiltinTopRiskCategoryDefs(),t=(this._ensureRiskCategoryConfig().customCategories||[]).filter(s=>s&&s.id),i=[...e];return t.forEach(s=>{i.some(a=>a.id===s.id)||i.push({id:s.id,label:s.label,icon:s.icon||"fa-tag",color:s.color||"#64748b",bg:s.bg||"#f8fafc",border:s.border||"#cbd5e1",keywords:Array.isArray(s.keywords)?s.keywords:[],isCustom:!0})}),i.map(s=>({...s,label:s.isCustom?s.label||s.id:this._t(s.labelKey,s.id)}))},_normalizeTopRiskCategoryFilter(e){const t=String(e||"").trim();if(!t)return"";const i=this.getTopRiskCategoryDefs();if(i.some(o=>o.id===t))return t;const s=i.find(o=>o.label===t);return s?s.id:{\u0639\u0627\u0645:"general",\u0643\u0647\u0631\u0628\u0627\u0621:"electricity",\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0629:"mechanical",\u062A\u062F\u062E\u064A\u0646:"smoking","\u0645\u0647\u0645\u0627\u062A \u0648\u0642\u0627\u064A\u0629":"ppe",\u062A\u062E\u0632\u064A\u0646:"storage","\u0623\u062C\u0647\u0632\u0629 \u062D\u0631\u064A\u0642":"fire"}[t]||t},_getTopRiskCategoryLabel(e){return this._getTopRiskCategoryMeta(e).label},_normalizeTopRiskHaystack(e){return String(e||"").toLowerCase().replace(/[أإآ]/g,"\u0627").replace(/ى/g,"\u064A").replace(/ة/g,"\u0647")},_topRiskHaystackOf(e){return this._normalizeTopRiskHaystack([e?.observationType,e?.details,e?.correctiveAction,e?.remarks,e?.locationName,e?.siteName].filter(Boolean).join(" "))},_topRiskCategoryOf(e){const t=String(e?.observationType||"").trim();if(t){const n=this._getObservationTypeRiskMap()[t];if(n&&this.getTopRiskCategoryDefs().some(r=>r.id===n))return n}const i=this._topRiskHaystackOf(e);if(!i.trim())return"general";let s="general",a=0;return this.getTopRiskCategoryDefs().forEach(o=>{let n=0;(o.keywords||[]).forEach(r=>{const l=this._normalizeTopRiskHaystack(r);l&&i.includes(l)&&(n+=Math.max(1,Math.round(l.length/4)))}),n>a&&(a=n,s=o.id)}),s},_getTopRiskCategoryMeta(e){const t=this._normalizeTopRiskCategoryFilter(e)||String(e||"").trim(),s=this.getTopRiskCategoryDefs().find(a=>a.id===t);return s||(t==="general"?{id:"general",label:this._t("module.dailyobs.top10.category.general","\u0639\u0627\u0645"),icon:"fa-exclamation-circle",color:"#64748b",bg:"#f8fafc",border:"#cbd5e1"}:{id:e,label:e||this._t("module.dailyobs.top10.category.general","\u0639\u0627\u0645"),icon:"fa-exclamation-circle",color:"#64748b",bg:"#f8fafc",border:"#cbd5e1"})},_computeObservationRiskScore(e){let t=0;this._execIsCritical(e)?t+=45:this._execIsHighRisk(e)?t+=35:String(e.riskLevel||"").includes("\u0645\u062A\u0648\u0633\u0637")?t+=18:(String(e.riskLevel||"").includes("\u0645\u0646\u062E\u0641\u0636")||String(e.riskLevel||"").includes("\u0628\u0633\u064A\u0637"))&&(t+=6);const i=String(e.status||"");if(i.includes("\u0645\u0641\u062A\u0648\u062D")||i.includes("\u062C\u062F\u064A\u062F")?t+=22:i.includes("\u062C\u0627\u0631\u064A")?t+=12:i.includes("\u0645\u063A\u0644\u0642")&&(t-=18),this._execIsOverdue(e)){const s=Number(e.overdays)||0;t+=Math.min(s>0?s*2:12,30)}if(e.attachments&&e.attachments.length>0&&(t+=Math.min(e.attachments.length*2,8)),e.date){const s=new Date(e.date),a=Math.floor((Date.now()-s.getTime())/(1e3*60*60*24));a<=7?t+=8:a<=30&&(t+=4)}return this._execIsClosed(e)&&(t=Math.round(t*.25)),Math.max(0,Math.round(t))},_buildTopRiskCategoryStats(e){const t={};return this.getTopRiskCategoryDefs().forEach(i=>{t[i.id]={count:0,openHigh:0,maxScore:0}}),t.general={count:0,openHigh:0,maxScore:0},(e||[]).forEach(i=>{const s=i.riskCategoryId||this._topRiskCategoryOf(i);t[s]||(t[s]={count:0,openHigh:0,maxScore:0}),t[s].count+=1;const a=i.riskScore!=null?i.riskScore:this._computeObservationRiskScore(i);a>t[s].maxScore&&(t[s].maxScore=a),!this._execIsClosed(i)&&(this._execIsHighRisk(i)||this._execIsCritical(i))&&(t[s].openHigh+=1)}),t},_bindTopRiskCategoryCards(){document.querySelectorAll(".top-risk-cat-card").forEach(i=>{i.dataset.bound!=="1"&&(i.dataset.bound="1",i.addEventListener("click",()=>{const s=i.getAttribute("data-cat-id")||"";this._topRiskCategoryFilter=this._topRiskCategoryFilter===s?"":s,this.loadTop10Observations()}))});const t=document.getElementById("top-risk-clear-filter-btn");t&&t.dataset.bound!=="1"&&(t.dataset.bound="1",t.addEventListener("click",()=>{this._topRiskCategoryFilter="",this.loadTop10Observations()}))},_injectTop10Styles(){if(document.getElementById("top10-module-styles-v1"))return;const e=document.createElement("style");e.id="top10-module-styles-v1",e.textContent=`
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
        `,document.head.appendChild(e)},_destroyTop10BuiltInCharts(){this.top10BuiltInCharts&&(Object.values(this.top10BuiltInCharts).forEach(e=>{try{e&&typeof e.destroy=="function"&&e.destroy()}catch{}}),this.top10BuiltInCharts={})},async _drawTop10BuiltInCharts(e,t){if(!await this.ensureChartJSLoaded()||typeof Chart>"u")return;this._destroyTop10BuiltInCharts(),this.top10BuiltInCharts||(this.top10BuiltInCharts={});const s=this.getTranslations().isRTL,a=this.getTopRiskCategoryDefs(),o=[...a.map(f=>f.id),"general"],n=o.map(f=>this._getTopRiskCategoryLabel(f)),r=[...a.map(f=>f.color),"#64748b"],l=o.map(f=>(e||[]).filter(g=>(g.riskCategoryId||this._topRiskCategoryOf(g))===f).length),d=document.getElementById("top10-builtin-chart-categories");if(d){const f=this;this.top10BuiltInCharts.categories=new Chart(d,{type:"doughnut",data:{labels:n,datasets:[{data:l,backgroundColor:r.map(g=>g+"cc"),borderColor:"#fff",borderWidth:2,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,onClick(g,y){if(!y.length)return;const h=o[y[0].index];f._topRiskCategoryFilter=f._topRiskCategoryFilter===h?"":h,f.loadTop10Observations()},plugins:{legend:{position:"bottom",rtl:s,labels:{boxWidth:12,font:{size:11}}},tooltip:{rtl:s}}}})}const c=document.getElementById("top10-builtin-chart-scores");if(c&&t.length){const f=t.map(m=>this.getObservationTypeLabel(m.observationType)),g=f.map(m=>m.length>32?`${m.slice(0,30)}\u2026`:m),y=t.map(m=>m.riskScore),h=y.map(m=>m>=55?"#dc2626":m>=35?"#ea580c":"#2563eb"),S=t.map(m=>m.isoCode||"");this.top10BuiltInCharts.scores=new Chart(c,{type:"bar",data:{labels:g,datasets:[{label:this._t("module.dailyobs.top10.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),data:y,backgroundColor:h,borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{rtl:s,callbacks:{title(m){const k=m[0]?.dataIndex??0;return f[k]||""},label(m){const k=m.dataIndex,T=S[k]?` (${S[k]})`:"";return`${m.parsed.x} \u2014 ${f[k]||""}${T}`}}}},scales:{x:{beginAtZero:!0,max:100}}}})}const p=document.getElementById("top10-builtin-chart-risklevel");if(p&&t.length){const f={};t.forEach(g=>{const y=g.riskLevel||this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");f[y]=(f[y]||0)+1}),this.top10BuiltInCharts.riskLevel=new Chart(p,{type:"pie",data:{labels:Object.keys(f),datasets:[{data:Object.values(f),backgroundColor:["#dc2626","#ea580c","#eab308","#22c55e","#64748b"],borderWidth:2,borderColor:"#fff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:s},tooltip:{rtl:s}}}})}const b=document.getElementById("top10-builtin-chart-status");if(b&&t.length){const f=t.filter(y=>!this._execIsClosed(y)).length,g=t.length-f;this.top10BuiltInCharts.status=new Chart(b,{type:"doughnut",data:{labels:[this._t("module.dailyobs.top10.chart.statusOpen","\u0645\u0641\u062A\u0648\u062D\u0629"),this._t("module.dailyobs.top10.chart.statusClosed","\u0645\u063A\u0644\u0642\u0629")],datasets:[{data:[f,g],backgroundColor:["#f59e0b","#10b981"],borderWidth:2,borderColor:"#fff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:s},tooltip:{rtl:s}}}})}},async renderTop10Observations(){return this._injectTop10Styles(),this.ensureChartJSLoaded().catch(()=>{Utils.safeWarn("Chart.js \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629")}),`
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
            `,this._destroyTop10BuiltInCharts();return}const s=i.map(m=>{const k=this.normalizeRecord(m),T=this._topRiskCategoryOf(k),C=this._getTopRiskCategoryLabel(T),w=this._computeObservationRiskScore(k);return{...k,riskCategoryId:T,riskCategory:C,riskScore:w}}),a=this._buildTopRiskCategoryStats(s),o=String(this._topRiskCategoryFilter||"").trim();let n=s.slice();o&&(n=n.filter(m=>m.riskCategoryId===o)),n.sort((m,k)=>k.riskScore-m.riskScore);const r=n.slice(0,10),l=s.filter(m=>!this._execIsClosed(m)&&(this._execIsCritical(m)||this._execIsHighRisk(m))).length,d=r.length?Math.round(r.reduce((m,k)=>m+k.riskScore,0)/r.length):0;t&&(t.innerHTML=`
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</div>
                    <div class="top10-kpi__value">${s.length}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.criticalOpen","\u062D\u0631\u062C\u0629/\u0639\u0627\u0644\u064A\u0629 \u0645\u0641\u062A\u0648\u062D\u0629"))}</div>
                    <div class="top10-kpi__value top10-kpi__value--danger">${l}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.avgScore","\u0645\u062A\u0648\u0633\u0637 \u062F\u0631\u062C\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631"))}</div>
                    <div class="top10-kpi__value top10-kpi__value--warn">${d}</div>
                </div>
                <div class="top10-kpi">
                    <div class="top10-kpi__label">${Utils.escapeHTML(this._t("module.dailyobs.top10.kpi.inRanking","\u0641\u064A \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0627\u0644\u064A"))}</div>
                    <div class="top10-kpi__value">${r.length}</div>
                </div>
            `);const c=this._t("module.dailyobs.top10.categories.openHigh","{n} \u0639\u0627\u0644\u064A\u0629 \u0645\u0641\u062A\u0648\u062D\u0629"),p=this.getTopRiskCategoryDefs().map(m=>{const k=a[m.id]||{count:0,openHigh:0},T=o===m.id,C=c.replace("{n}",String(k.openHigh));return`
                <button type="button" class="top-risk-cat-card" data-cat-id="${Utils.escapeHTML(m.id)}"
                    style="border-color:${T?m.color:m.border};background:${T?m.bg:"#fff"};
                    box-shadow:${T?"0 4px 14px rgba(0,0,0,.08)":"none"};">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
                        <span style="font-size:11px;font-weight:700;color:${m.color};background:${m.bg};padding:3px 8px;border-radius:999px;">${Utils.escapeHTML(C)}</span>
                        <i class="fas ${m.icon}" style="color:${m.color};font-size:1.1rem;"></i>
                    </div>
                    <div style="font-weight:800;font-size:1rem;color:#0f172a;margin-bottom:4px;">${Utils.escapeHTML(m.label)}</div>
                    <div style="font-size:1.35rem;font-weight:800;color:${m.color};">${k.count}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px;">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</div>
                </button>
            `}).join(""),b=o?this._getTopRiskCategoryLabel(o):"",f=o?`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding:10px 12px;border-radius:10px;background:#eff6ff;border:1px solid #bfdbfe;">
                    <span style="font-size:0.88rem;color:#1e40af;"><i class="fas fa-filter ml-2"></i>${Utils.escapeHTML(this._tf("module.dailyobs.top10.filter.active",{category:b},`\u0639\u0631\u0636 \u0645\u062E\u0627\u0637\u0631 \u0641\u0626\u0629: ${b}`))}</span>
                    <button type="button" id="top-risk-clear-filter-btn" class="btn-secondary" style="padding:4px 10px;font-size:0.8rem;">${Utils.escapeHTML(this._t("module.dailyobs.top10.filter.clear","\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0641\u0644\u062A\u0631"))}</button>
               </div>`:"",g=this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),y=this._t("module.dailyobs.common.viewDetails","\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"),h=o?`${this._t("module.dailyobs.top10.ranking.title","\u0642\u0627\u0626\u0645\u0629 Top 10")} \u2014 ${b}`:this._t("module.dailyobs.top10.ranking.title","\u0642\u0627\u0626\u0645\u0629 Top 10");e.innerHTML=`
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
            ${f}
            <div class="mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 class="top10-section-title mb-1">
                        <i class="fas fa-ranking-star text-red-500"></i>
                        ${Utils.escapeHTML(h)}
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
                        ${r.map((m,k)=>{const T=this._getTopRiskCategoryMeta(m.riskCategoryId),C=m.riskScore>=55?"#dc2626":m.riskScore>=35?"#ea580c":"#2563eb";return`
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td><span class="font-bold text-gray-700">${k+1}</span></td>
                                <td>
                                    <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${T.color};background:${T.bg};border:1px solid ${T.border};">
                                        <i class="fas ${T.icon}"></i>${Utils.escapeHTML(m.riskCategory||g)}
                                    </span>
                                </td>
                                <td>
                                    <span class="font-medium text-blue-600 cursor-pointer hover:underline" onclick="DailyObservations.viewObservation('${m.id}')">
                                        ${Utils.escapeHTML(m.isoCode||g)}
                                    </span>
                                </td>
                                <td>
                                    <div class="text-sm font-medium text-gray-800">${Utils.escapeHTML(m.siteName||"-")}</div>
                                    <div class="text-xs text-gray-500">${Utils.escapeHTML(m.locationName||"")}</div>
                                </td>
                                <td>${Utils.escapeHTML(this.getObservationTypeLabel(m.observationType))}</td>
                                <td>
                                    <span class="badge badge-${this.getRiskBadgeClass(m.riskLevel)}">
                                        ${Utils.escapeHTML(m.riskLevel||"-")}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${this.getStatusBadgeClass(m.status)}">
                                        ${Utils.escapeHTML(m.status||"-")}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-lg" style="color:${C};">${m.riskScore}</span>
                                        <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div class="h-full" style="width:${Math.min(m.riskScore,100)}%;background:${C};"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button onclick="DailyObservations.viewObservation('${m.id}')"
                                            class="btn-icon btn-icon-primary" title="${Utils.escapeHTML(y)}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>`}).join("")}
                    </tbody>
                </table>
            </div>
            <div class="top10-mobile-cards">
                ${r.map((m,k)=>{const T=this._getTopRiskCategoryMeta(m.riskCategoryId),C=m.riskScore>=55?"#dc2626":m.riskScore>=35?"#ea580c":"#2563eb";return`
                    <div class="top10-mobile-card">
                        <div class="top10-mobile-card__head">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div class="top10-mobile-card__rank">${k+1}</div>
                                <div>
                                    <div class="font-bold text-blue-600" onclick="DailyObservations.viewObservation('${m.id}')" style="cursor:pointer;">${Utils.escapeHTML(m.isoCode||g)}</div>
                                    <div class="text-xs text-gray-500">${Utils.escapeHTML(m.siteName||"-")}</div>
                                </div>
                            </div>
                            <div class="top10-score-pill" style="color:${C};">${m.riskScore}</div>
                        </div>
                        <div style="margin-bottom:8px;">
                            <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${T.color};background:${T.bg};border:1px solid ${T.border};">
                                <i class="fas ${T.icon}"></i>${Utils.escapeHTML(m.riskCategory)}
                            </span>
                        </div>
                        <div class="text-sm text-gray-700 mb-2">${Utils.escapeHTML(this.getObservationTypeLabel(m.observationType))}</div>
                        <div class="flex gap-2 flex-wrap">
                            <span class="badge badge-${this.getRiskBadgeClass(m.riskLevel)}">${Utils.escapeHTML(m.riskLevel||"-")}</span>
                            <span class="badge badge-${this.getStatusBadgeClass(m.status)}">${Utils.escapeHTML(m.status||"-")}</span>
                        </div>
                    </div>`}).join("")}
            </div>`}
        `,this._drawTop10BuiltInCharts(s,r),this.loadTop10Charts(s,r),this._bindTopRiskCategoryCards();const S=document.getElementById("top10-module-root");S&&this.applyModuleI18n(S),setTimeout(()=>{const m=document.getElementById("export-top10-pdf-hero-btn");m&&m.dataset.bound!=="1"&&(m.dataset.bound="1",m.addEventListener("click",()=>this.exportTop10PDF()));const k=document.getElementById("export-top10-ppt-hero-btn");k&&k.dataset.bound!=="1"&&(k.dataset.bound="1",k.addEventListener("click",()=>this.exportTop10PptReport()));const T=document.getElementById("export-top10-table-pdf-btn");T&&T.dataset.bound!=="1"&&(T.dataset.bound="1",T.addEventListener("click",()=>this.exportTop10PDF()));const C=document.getElementById("export-top10-table-ppt-btn");C&&C.dataset.bound!=="1"&&(C.dataset.bound="1",C.addEventListener("click",()=>this.exportTop10PptReport()));const w=document.getElementById("manage-top10-categories-btn");w&&w.dataset.bound!=="1"&&(w.dataset.bound="1",w.addEventListener("click",()=>this.showManageTop10RiskCategoriesModal()));const u=document.getElementById("add-top10-chart-btn");u&&u.dataset.bound!=="1"&&(u.dataset.bound="1",u.addEventListener("click",()=>this.showAddTop10ChartModal()));const U=document.getElementById("manage-top10-charts-btn");U&&U.dataset.bound!=="1"&&(U.dataset.bound="1",U.addEventListener("click",()=>this.showManageTop10ChartsModal()))},100)},async loadTop10Charts(e,t){const i=document.getElementById("top10-charts-container");if(!i)return;const s="dailyObservations_top10RiskCharts";let a=[];try{if(a=JSON.parse(localStorage.getItem(s)||"[]"),!Array.isArray(a)||a.length===0){const r=JSON.parse(localStorage.getItem("dailyObservations_top10Charts")||"[]");Array.isArray(r)&&r.length>0&&r.some(l=>String(l.title||"").includes("\u0623\u0641\u0636\u0644 10"))&&(a=[])}}catch{a=[]}a.length===0&&(a=[{id:"chart_risk_category_distribution",type:"doughnut",title:this._t("module.dailyobs.top10.chart.categories","\u062A\u0648\u0632\u064A\u0639 \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631"),field:"riskCategory",enabled:!0,useAllData:!0},{id:"chart_risk_level_top10",type:"bar",title:this._t("module.dailyobs.top10.chart.riskLevel","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (Top 10)"),field:"riskLevel",enabled:!0},{id:"chart_status_top10",type:"pie",title:this._t("module.dailyobs.top10.chart.status","\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (Top 10)"),field:"status",enabled:!0},{id:"chart_site_risk",type:"bar",title:this._t("module.dailyobs.top10.chart.siteRisk","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639"),field:"siteName",enabled:!1,useAllData:!0}],localStorage.setItem(s,JSON.stringify(a)));const o=a.filter(r=>r.enabled);if(o.length===0){i.innerHTML=`
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
            `;return}let n="";o.forEach((r,l)=>{const d=`top10-chart-${r.id}-${l}`,c=`top10-chart-container-${r.id}-${l}`;n+=`
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
                        <div id="${c}" style="position: relative; height: 300px;">
                            <canvas id="${d}"></canvas>
                        </div>
                    </div>
                </div>
            `}),i.innerHTML=n,setTimeout(async()=>{await this.ensureChartJSLoaded()&&typeof Chart<"u"&&this.renderTop10Charts(o,t,e)},300)},renderTop10Charts(e,t,i){typeof Chart>"u"||(this.top10Charts&&Object.values(this.top10Charts).forEach(s=>{s&&typeof s.destroy=="function"&&s.destroy()}),this.top10Charts={},e.forEach((s,a)=>{const o=`top10-chart-${s.id}-${a}`,n=document.getElementById(o);if(!n)return;const r=this.analyzeTop10ChartData(s,t,i),l={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0},tooltip:{rtl:!0,callbacks:{label:function(c){const p=c.label||"",b=c.parsed||c.parsed.y||0,f=c.dataset.data.reduce((y,h)=>y+h,0),g=f>0?(b/f*100).toFixed(1):0;return`${p}: ${b} (${g}%)`}}}}};let d;s.type==="doughnut"||s.type==="pie"?d=new Chart(n,{type:s.type,data:{labels:r.labels,datasets:[{data:r.values,backgroundColor:["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#84cc16","#f97316","#6366f1"],borderWidth:2,borderColor:"#ffffff"}]},options:l}):s.type==="bar"?d=new Chart(n,{type:"bar",data:{labels:r.labels,datasets:[{label:s.title,data:r.values,backgroundColor:"#3b82f6",borderColor:"#2563eb",borderWidth:1}]},options:{...l,scales:{y:{beginAtZero:!0}}}}):s.type==="line"&&(d=new Chart(n,{type:"line",data:{labels:r.labels,datasets:[{label:s.title,data:r.values,borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4,fill:!0}]},options:l})),d&&(this.top10Charts[s.id]=d)}))},analyzeTop10ChartData(e,t,i){const s=e.field,o=(e.useAllData===!0?i:t)||[],n={};o.forEach(l=>{let d=this._t("module.dailyobs.common.notSpecified","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");if(s==="riskCategory"){const c=l.riskCategoryId||this._topRiskCategoryOf(l);d=this._getTopRiskCategoryLabel(c)}else s==="observationType"?d=this.getObservationTypeLabel(l.observationType):d=l[s]||d;n[d]=(n[d]||0)+1});const r=Object.entries(n).sort((l,d)=>d[1]-l[1]).slice(0,10);return{labels:r.map(([l])=>l),values:r.map(([,l])=>l)}},showManageTop10RiskCategoriesModal(){if(!this.canDailyObservationsFullAdminUi()){Notification.error(this._t("module.dailyobs.common.unauthorized","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D"));return}const e=this._ensureRiskCategoryConfig(),t=this.getTopRiskCategoryDefs(),i=this.getObservationTypes(),s=this._getObservationTypeRiskMap(),a=t.map(c=>`<option value="${Utils.escapeHTML(c.id)}">${Utils.escapeHTML(c.label)}</option>`).join(""),o=i.map(c=>{const p=s[c]||"";return`
                <tr>
                    <td style="padding:8px 10px;font-weight:600;">${Utils.escapeHTML(this.getObservationTypeLabel(c))}</td>
                    <td style="padding:8px 10px;">
                        <select class="form-input obs-risk-type-map" data-obs-type="${Utils.escapeHTML(c)}" style="min-width:180px;">
                            <option value="">${Utils.escapeHTML(this._t("module.dailyobs.top10.categories.unassigned","\u063A\u064A\u0631 \u0645\u064F\u0639\u064A\u0651\u064E\u0646"))}</option>
                            ${t.map(b=>`<option value="${Utils.escapeHTML(b.id)}" ${p===b.id?"selected":""}>${Utils.escapeHTML(b.label)}</option>`).join("")}
                        </select>
                    </td>
                </tr>`}).join(""),n=(e.customCategories||[]).map((c,p)=>`
            <tr data-custom-idx="${p}">
                <td style="padding:8px 10px;">${Utils.escapeHTML(c.label||c.id)}</td>
                <td style="padding:8px 10px;font-size:12px;color:#64748b;">${Utils.escapeHTML((c.keywords||[]).join("\u060C "))}</td>
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
                            <select id="obs-risk-new-type-cat" class="form-input" style="min-width:180px;">${a}</select>
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
                        <p style="font-size:12px;color:#64748b;margin-top:8px;">${Utils.escapeHTML(this._tf("module.dailyobs.top10.categories.builtinSummary",{builtin:t.filter(c=>!c.isCustom).length,custom:(e.customCategories||[]).length},""))}</p>
                    </section>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary obs-risk-modal-cancel">${Utils.escapeHTML(this._t("module.dailyobs.btn.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button type="button" id="obs-risk-save-config-btn" class="btn-primary"><i class="fas fa-save ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.btn.save","\u062D\u0641\u0638"))}</button>
                </div>
            </div>
        `,document.body.appendChild(r),this.applyModuleI18n(r);const l=()=>r.remove();r.querySelector(".modal-close")?.addEventListener("click",l),r.querySelector(".obs-risk-modal-cancel")?.addEventListener("click",l),r.addEventListener("click",c=>{c.target===r&&l()});const d=JSON.parse(JSON.stringify(e));r.querySelector("#obs-risk-add-type-btn")?.addEventListener("click",()=>{const c=String(r.querySelector("#obs-risk-new-type")?.value||"").trim(),p=String(r.querySelector("#obs-risk-new-type-cat")?.value||"").trim();c&&(d.customObservationTypes.includes(c)||d.customObservationTypes.push(c),p&&(d.observationTypeMap[c]=p),this._saveRiskCategoryConfig(d),l(),this.showManageTop10RiskCategoriesModal())}),r.querySelector("#obs-risk-add-cat-btn")?.addEventListener("click",()=>{const c=String(r.querySelector("#obs-risk-new-cat-label")?.value||"").trim(),p=String(r.querySelector("#obs-risk-new-cat-keywords")?.value||"").trim();if(!c)return;const b=`custom_${Date.now()}`,f=p?p.split(/[,،]/).map(h=>h.trim()).filter(Boolean):[],g=[{color:"#0f766e",bg:"#f0fdfa",border:"#5eead4"},{color:"#be123c",bg:"#fff1f2",border:"#fda4af"},{color:"#4338ca",bg:"#eef2ff",border:"#a5b4fc"}],y=g[(d.customCategories||[]).length%g.length];d.customCategories=d.customCategories||[],d.customCategories.push({id:b,label:c,icon:"fa-tag",...y,keywords:f}),this._saveRiskCategoryConfig(d),l(),this.showManageTop10RiskCategoriesModal()}),r.querySelectorAll(".obs-risk-del-cat").forEach(c=>{c.addEventListener("click",()=>{const p=Number(c.getAttribute("data-idx"));if(!confirm(this._t("module.dailyobs.top10.categories.deleteConfirm","\u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u0635\u0635\u0629\u061F")))return;const b=d.customCategories.splice(p,1)[0];b?.id&&Object.keys(d.observationTypeMap||{}).forEach(f=>{d.observationTypeMap[f]===b.id&&delete d.observationTypeMap[f]}),this._saveRiskCategoryConfig(d),l(),this.showManageTop10RiskCategoriesModal()})}),r.querySelector("#obs-risk-save-config-btn")?.addEventListener("click",()=>{const c={...d.observationTypeMap||{}};r.querySelectorAll(".obs-risk-type-map").forEach(p=>{const b=p.getAttribute("data-obs-type"),f=String(p.value||"").trim();b&&(f?c[b]=f:delete c[b])}),d.observationTypeMap=c,this._saveRiskCategoryConfig(d),this._riskCategoryConfigCache=null,Notification.success(this._t("module.dailyobs.top10.categories.saved","\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0641\u0626\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631")),l(),this.loadTop10Observations()})},showAddTop10ChartModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e),this.applyModuleI18n(e);const t=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",t),e.querySelector(".obs-top10-modal-cancel")?.addEventListener("click",t),document.getElementById("save-top10-chart-btn").addEventListener("click",()=>{const s=document.getElementById("top10-chart-title").value.trim(),a=document.getElementById("top10-chart-type").value,o=document.getElementById("top10-chart-field").value,n=document.getElementById("top10-chart-use-all-data").checked;if(!s){Notification.error(this._t("module.dailyobs.notify.chartTitleRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0644\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A"));return}const r=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),l={id:`chart_${Date.now()}`,type:a,title:s,field:o,useAllData:n,enabled:!0};r.push(l),localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(r)),e.remove(),Notification.success(this._t("module.dailyobs.notify.chartAdded","\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0628\u0646\u062C\u0627\u062D")),this.loadTop10Observations()})},showManageTop10ChartsModal(){const e=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
                        `:e.map(s=>`
                            <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                <div class="flex items-center gap-3 flex-1">
                                    <input type="checkbox" 
                                           class="form-checkbox top10-chart-enable" 
                                           data-chart-id="${s.id}"
                                           ${s.enabled?"checked":""}>
                                    <div class="flex-1">
                                        <div class="font-semibold">${Utils.escapeHTML(s.title)}</div>
                                        <div class="text-sm text-gray-500">
                                            ${Utils.escapeHTML(this._tf("module.dailyobs.top10.chart.meta",{type:this._getTop10ChartTypeLabel(s.type),field:this._getTop10ChartFieldLabel(s.field)},""))}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button type="button" data-edit-id="${Utils.escapeHTML(s.id)}" 
                                            class="btn-icon btn-icon-secondary obs-top10-edit-chart" title="${Utils.escapeHTML(this._t("module.dailyobs.common.edit","\u062A\u0639\u062F\u064A\u0644"))}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" data-del-id="${Utils.escapeHTML(s.id)}" 
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
        `,document.body.appendChild(t),this.applyModuleI18n(t);const i=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",i),t.querySelector(".obs-top10-manage-close")?.addEventListener("click",i),t.querySelectorAll(".obs-top10-edit-chart").forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-edit-id");i(),this.editTop10Chart(a)})}),t.querySelectorAll(".obs-top10-del-chart").forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-del-id");this.deleteTop10Chart(a),i()})}),t.querySelectorAll(".top10-chart-enable").forEach(s=>{s.addEventListener("change",a=>{const o=a.target.getAttribute("data-chart-id"),n=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),r=n.find(l=>l.id===o);r&&(r.enabled=a.target.checked,localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(n)),this.loadTop10Observations())})})},editTop10Chart(e){const i=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]").find(n=>n.id===e);if(!i)return;const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
        `,document.body.appendChild(s),this.applyModuleI18n(s);const a=()=>s.remove();s.querySelector(".modal-close")?.addEventListener("click",a),s.querySelector(".obs-top10-edit-cancel")?.addEventListener("click",a),document.getElementById("update-top10-chart-btn").addEventListener("click",()=>{const n=document.getElementById("edit-top10-chart-title").value.trim(),r=document.getElementById("edit-top10-chart-type").value,l=document.getElementById("edit-top10-chart-field").value,d=document.getElementById("edit-top10-chart-use-all-data").checked;if(!n){Notification.error(this._t("module.dailyobs.notify.chartTitleRequired","\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0644\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A"));return}const c=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]"),p=c.findIndex(b=>b.id===e);p!==-1&&(c[p]={...c[p],title:n,type:r,field:l,useAllData:d},localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(c)),a(),Notification.success(this._t("module.dailyobs.notify.chartUpdated","\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0628\u0646\u062C\u0627\u062D")),this.loadTop10Observations())})},deleteTop10Chart(e){if(!confirm(this._t("module.dailyobs.notify.chartDeleteConfirm","\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u061F")))return;const i=JSON.parse(localStorage.getItem("dailyObservations_top10RiskCharts")||"[]").filter(s=>s.id!==e);localStorage.setItem("dailyObservations_top10RiskCharts",JSON.stringify(i)),Notification.success(this._t("module.dailyobs.notify.chartDeleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A")),this.loadTop10Observations()},analyzeByItem(e,t){const i={};let s=0;return t.forEach(a=>{let o="";switch(e){case"observationType":case"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":o=a.observationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"riskLevel":case"\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":case"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":o=a.riskLevel||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"status":case"\u0627\u0644\u062D\u0627\u0644\u0629":o=a.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"shift":case"\u0627\u0644\u0648\u0631\u062F\u064A\u0629":o=a.shift||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"site":case"siteName":case"\u0627\u0644\u0645\u0648\u0642\u0639":o=a.siteName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"responsibleDepartment":case"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630":case"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629":o=a.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"observerName":case"\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":o=a.observerName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;case"locationName":case"\u0627\u0644\u0645\u0643\u0627\u0646":case"\u0627\u0644\u0645\u0648\u0642\u0639 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639":o=a.locationName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";break;default:if(a[e]!==void 0&&a[e]!==null&&a[e]!=="")o=String(a[e]);else{const n=e.toLowerCase().replace(/\s+/g,""),l=Object.keys(a).find(d=>d.toLowerCase().replace(/\s+/g,"")===n);o=l&&a[l]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}}o=String(o).trim(),(!o||o===""||o==="null"||o==="undefined")&&(o="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),i[o]=(i[o]||0)+1,s++}),Object.entries(i).map(([a,o])=>({label:a,count:o,percentage:s>0?(o/s*100).toFixed(1):"0.0"})).sort((a,o)=>o.count-a.count)},async addAnalysisItem(){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("new-analysis-item");if(!e)return;const t=e.value.trim();if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]");if(i.some(a=>a.label.toLowerCase()===t.toLowerCase())){Notification.warning("\u064A\u0648\u062C\u062F \u0628\u0646\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B");return}const s=`custom_${Date.now()}`;i.push({id:s,label:t,enabled:!0}),localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),e.value="",await this.loadDataAnalysis(),await this.updateAnalysisResults(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},toggleAnalysisItem(e,t){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]"),s=i.find(a=>a.id===e);s&&(s.enabled=t,localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),this.updateAnalysisResults())},removeAnalysisItem(e){if(!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const i=JSON.parse(localStorage.getItem("dailyObservations_analysisItems")||"[]").filter(s=>s.id!==e);localStorage.setItem("dailyObservations_analysisItems",JSON.stringify(i)),this.loadDataAnalysis(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},getFilters(){return{search:(document.getElementById("observation-search")?.value||"").toLowerCase(),site:document.getElementById("observation-filter-site")?.value||"",location:document.getElementById("observation-filter-location")?.value||"",type:document.getElementById("observation-filter-type")?.value||"",shift:document.getElementById("observation-filter-shift")?.value||"",risk:document.getElementById("observation-filter-risk")?.value||"",status:document.getElementById("observation-filter-status")?.value||"",observer:document.getElementById("observation-filter-observer")?.value||"",responsible:document.getElementById("observation-filter-responsible")?.value||"",dateFrom:document.getElementById("observation-date-from")?.value||"",dateTo:document.getElementById("observation-date-to")?.value||"",kpi:String(this._obsKpiFilter||"").trim()}},_getVisibleObservationsNormalized(){return(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).map(t=>this.normalizeRecord(t))},_isOpenKpiStatus(e){return this.normalizeStatus(e)==="\u0645\u0641\u062A\u0648\u062D"},_isProgressKpiStatus(e){return this.normalizeStatus(e)==="\u062C\u0627\u0631\u064A"},_isClosedKpiStatus(e){return this.normalizeStatus(e)==="\u0645\u063A\u0644\u0642"},_isHighRiskLevel(e){const t=String(e||"").trim().toLowerCase();return t==="\u0639\u0627\u0644\u064A"||t==="\u0639\u0627\u0644\u064A\u0629"||t==="high"},_isMediumRiskLevel(e){const t=String(e||"").trim();return t==="\u0645\u062A\u0648\u0633\u0637"||t==="\u0645\u062A\u0648\u0633\u0637\u0629"},_isLowRiskLevel(e){const t=String(e||"").trim();return t==="\u0645\u0646\u062E\u0641\u0636"||t==="\u0645\u0646\u062E\u0641\u0636\u0629"||t==="\u0628\u0633\u064A\u0637"||t==="\u0628\u0633\u064A\u0637\u0629"},_kpiLabel(e){return{all:"\u0627\u0644\u0643\u0644",open:"\u0645\u0641\u062A\u0648\u062D",progress:"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",closed:"\u0645\u063A\u0644\u0642",high:"\u062E\u0637\u0648\u0631\u0629 \u0639\u0627\u0644\u064A\u0629",topSite:"\u0623\u0639\u0644\u0649 \u0645\u0648\u0642\u0639"}[e]||e},updateFilterBadges(e,t,i){const s=(o,n,r)=>{const l=document.getElementById(o);if(!l)return;const d=l.closest(".filter-field");if(!d)return;const c=d.querySelector(".filter-label");if(!c)return;const p=c.querySelector(".filter-count-badge");if(p&&p.remove(),n&&n.trim()!==""){const b=document.createElement("span");b.className="filter-count-badge",b.title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629",b.textContent=r;const f=c.querySelector("i");f?f.insertAdjacentElement("afterend",b):c.insertBefore(b,c.firstChild)}},a=(o,n)=>{if(!n||n.trim()==="")return 0;const r={...i};return r[o]=n,this.filterItems(e,r).length};s("observation-filter-site",i.site,a("site",i.site)),s("observation-filter-location",i.location,a("location",i.location)),s("observation-filter-type",i.type,a("type",i.type)),s("observation-filter-shift",i.shift,a("shift",i.shift)),s("observation-filter-risk",i.risk,a("risk",i.risk)),s("observation-filter-status",i.status,a("status",i.status)),s("observation-filter-observer",i.observer,a("observer",i.observer)),s("observation-filter-responsible",i.responsible,a("responsible",i.responsible))},renderActiveFilterChips(e,t,i){const s=document.getElementById("obs-active-filter-chips"),a=document.getElementById("obs-filter-result-count");if(a){const l=Number(t)||0,d=Number(i)||0;a.innerHTML=l===d?`<strong>${l.toLocaleString("en-US")}</strong> \u0645\u0644\u0627\u062D\u0638\u0629`:`\u0639\u0631\u0636 <strong>${l.toLocaleString("en-US")}</strong> \u0645\u0646 <strong>${d.toLocaleString("en-US")}</strong>`}const o=document.querySelector(".date-range-bar");if(o&&o.classList.toggle("is-active-filter",!!(e.dateFrom||e.dateTo)),!s)return;const n={kpi:"\u0645\u0624\u0634\u0631",search:"\u0628\u062D\u062B",site:"\u0627\u0644\u0645\u0648\u0642\u0639",location:"\u0627\u0644\u0645\u0643\u0627\u0646",type:"\u0627\u0644\u0646\u0648\u0639",shift:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629",risk:"\u0627\u0644\u062E\u0637\u0648\u0631\u0629",status:"\u0627\u0644\u062D\u0627\u0644\u0629",observer:"\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",responsible:"\u0627\u0644\u0645\u0633\u0624\u0648\u0644",dateFrom:"\u0645\u0646",dateTo:"\u0625\u0644\u0649"},r=[];if(e.kpi&&r.push({key:"kpi",label:n.kpi,value:this._kpiLabel(e.kpi)}),["search","site","location","type","shift","risk","status","observer","responsible","dateFrom","dateTo"].forEach(l=>{const d=String(e[l]||"").trim();d&&r.push({key:l,label:n[l],value:d})}),!r.length){s.innerHTML="",s.hidden=!0;return}s.hidden=!1,s.innerHTML=r.map(l=>`
            <button type="button" class="obs-filter-chip" data-clear-filter="${Utils.escapeHTML(l.key)}" title="\u0625\u0632\u0627\u0644\u0629">
                <span class="obs-chip-k">${Utils.escapeHTML(l.label)}</span>
                <span class="obs-chip-v">${Utils.escapeHTML(l.value)}</span>
                <i class="fas fa-times"></i>
            </button>
        `).join("")+(r.length>1?'<button type="button" class="obs-filter-chip obs-chip-clear-all" data-clear-filter="__all__">\u0645\u0633\u062D \u0627\u0644\u0643\u0644</button>':""),s._bound||(s.addEventListener("click",l=>{const d=l.target.closest("[data-clear-filter]");if(!d)return;const c=d.getAttribute("data-clear-filter");c==="__all__"?this.resetFilters():this.clearObservationFilter(c)}),s._bound=!0)},filterItems(e,t){t=t||{},e=Array.isArray(e)?e:[];const i=o=>{if(!o)return"";const n=String(o).trim();if(!n)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(n))return n;const r=n.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(r){const c=r[1],p=r[2].padStart(2,"0"),b=r[3].padStart(2,"0");return`${c}-${p}-${b}`}const l=n.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);if(l){const c=l[1].padStart(2,"0"),p=l[2].padStart(2,"0");return`${l[3]}-${p}-${c}`}const d=new Date(n);if(!Number.isNaN(d.getTime())){const c=d.getFullYear(),p=String(d.getMonth()+1).padStart(2,"0"),b=String(d.getDate()).padStart(2,"0");return`${c}-${p}-${b}`}return""},s=i(t.dateFrom),a=i(t.dateTo);return e.filter(o=>{const n=!t.search||(o.isoCode||"").toLowerCase().includes(t.search)||(o.siteName||"").toLowerCase().includes(t.search)||(o.locationName||"").toLowerCase().includes(t.search)||(o.observationType||"").toLowerCase().includes(t.search)||(o.observerName||"").toLowerCase().includes(t.search)||(o.responsibleDepartment||"").toLowerCase().includes(t.search)||(o.description||"").toLowerCase().includes(t.search)||(o.details||"").toLowerCase().includes(t.search)||(o.remarks||"").toLowerCase().includes(t.search),r=!t.site||String(o.siteName||"").trim()===String(t.site||"").trim(),l=!t.location||String(o.locationName||"").trim()===String(t.location||"").trim(),d=!t.type||String(o.observationType||"").trim()===String(t.type||"").trim(),c=!t.shift||String(o.shift||"").trim()===String(t.shift||"").trim(),p=!t.risk||String(o.riskLevel||"").trim()===String(t.risk||"").trim(),b=!t.status||String(o.status||"").trim()===String(t.status||"").trim(),f=!t.observer||String(o.observerName||"").trim()===String(t.observer||"").trim(),g=!t.responsible||String(o.responsibleDepartment||"").trim()===String(t.responsible||"").trim();let y=!0;t.kpi==="open"?y=this._isOpenKpiStatus(o.status):t.kpi==="progress"?y=this._isProgressKpiStatus(o.status):t.kpi==="closed"?y=this._isClosedKpiStatus(o.status):t.kpi==="high"&&(y=this._isHighRiskLevel(o.riskLevel));let h=!0;if(s||a){const S=i(o.date||o.dateTime||o.observationDate||o.createdAt);s&&a?h=S>=s&&S<=a:s?h=S>=s:a&&(h=S<=a)}return n&&r&&l&&d&&c&&p&&b&&f&&g&&h&&y})},async loadObservationsList(e){const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{};t.resetPage&&(this._obsListPage=1),t.loadMore&&(this._obsListPage=Math.max(1,(this._obsListPage||1)+1));const i=document.getElementById("observations-table-container");if(!i){if(this._obsListRetryCount=(this._obsListRetryCount||0)+1,this._obsListRetryCount>8)return;setTimeout(()=>this.loadObservationsList(t),100);return}this._obsListRetryCount=0;try{if(this.isCurrentUserAdmin&&typeof this.isCurrentUserAdmin=="function"&&this.isCurrentUserAdmin()){const k="hse_dobs_seq_repair_v"+(typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion):"unknown");typeof localStorage<"u"&&!localStorage.getItem(k)&&(localStorage.setItem(k,"running"),GoogleIntegration.sendRequest({action:"repairObservationSequence",data:{}}).then(async T=>{if(T&&T.success){const C=T.data||{};((C.renumberedCount||0)>0||(C.fixedIsoCodeCount||0)>0)&&Notification.success("\u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u062A\u0633\u0644\u0633\u0644 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: "+C.renumberedCount+" \u0645\u0639\u0627\u062F \u062A\u0631\u0642\u064A\u0645\u0647\u0627\u060C "+C.fixedIsoCodeCount+" \u062A\u0635\u062D\u064A\u062D isoCode")}try{typeof this.ensureDailyObservationsDataLoaded=="function"&&await this.ensureDailyObservationsDataLoaded({force:!0}).catch(()=>{}),typeof this.loadObservationsList=="function"&&this.loadObservationsList(),typeof this.renderStatsCards=="function"&&this.renderStatsCards()}catch(C){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D:",C)}localStorage.setItem(k,"done")}).catch(()=>{localStorage.setItem(k,"done")}))}}catch(m){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u0634\u063A\u064A\u0644 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062A\u0633\u0644\u0633\u0644:",m)}const s=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(this.updateFilterOptions(),this.renderStatsCards(),s.length===0){const{t:m,isRTL:k}=this.getTranslations();this.renderActiveFilterChips(this.getFilters(),0,0),i.innerHTML=`<div class="empty-state" style="direction: ${k?"rtl":"ltr"}; text-align: ${k?"right":"left"};"><p class="text-gray-500">${Utils.escapeHTML(m("empty.noObservations"))}</p></div>`;return}const a={code:this._t("module.dailyobs.registry.table.code","\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),location:this._t("module.dailyobs.registry.table.location","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646"),datetime:this._t("module.dailyobs.registry.table.datetime","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A"),type:this._t("module.dailyobs.registry.table.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),shift:this._t("module.dailyobs.registry.table.shift","\u0627\u0644\u0648\u0631\u062F\u064A\u0629"),risk:this._t("module.dailyobs.registry.table.risk","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629"),status:this._t("module.dailyobs.registry.table.status","\u0627\u0644\u062D\u0627\u0644\u0629"),observer:this._t("module.dailyobs.registry.table.observer","\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),responsible:this._t("module.dailyobs.registry.table.responsible","\u0627\u0644\u0645\u0633\u0624\u0648\u0644"),attachments:this._t("module.dailyobs.registry.table.attachments","\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A"),actions:this._t("module.dailyobs.registry.table.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"),emptySearch:this._t("module.dailyobs.registry.emptySearch","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0628\u062D\u062B"),view:this._t("module.dailyobs.common.view","\u0639\u0631\u0636"),closeObs:this._t("module.dailyobs.close.quick","\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),select:this._t("module.dailyobs.close.select","\u062A\u062D\u062F\u064A\u062F"),showSelect:this.canUseObservationListClose()},o=a.showSelect?12:11,n=m=>this._renderObservationTableRow(m,a),r=m=>{if(!m)return 0;const k=String(m).match(/(\d+)$/);return k?parseInt(k[1],10):0},l=s.map(m=>this.normalizeRecord(m)).sort((m,k)=>{const T=r(m.isoCode||m.id),C=r(k.isoCode||k.id);if(C!==T)return C-T;const w=new Date(m.date||m.dateTime||m.createdAt||0).getTime()||0;return(new Date(k.date||k.dateTime||k.createdAt||0).getTime()||0)-w}),d=this.getFilters(),c=this.filterItems(l,d);this.updateFilterBadges(l,c,d),this.renderActiveFilterChips(d,c.length,l.length);const p=this.LIST_PAGE_SIZE||50,b=Math.max(1,this._obsListPage||1),f=c.slice(0,b*p),g=Math.max(0,c.length-f.length),y=f.length===0?`<tr>
                    <td colspan="${o}" style="text-align: center; padding: 40px;">
                        <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">${Utils.escapeHTML(a.emptySearch)}</p>
                    </td>
                </tr>`:f.map(m=>n(m)).join(""),h=g>0?`<div id="obs-load-more-wrap" style="text-align:center;padding:12px 8px;">
                    <button type="button" id="obs-load-more-btn" class="btn-secondary">
                        <i class="fas fa-chevron-down ml-2"></i>
                        \u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F (${g})
                    </button>
               </div>`:"";i.innerHTML=`
            ${a.showSelect?`<div id="obs-bulk-close-bar" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;padding:10px 12px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;">
                <span id="obs-bulk-close-count" style="font-weight:700;color:#3730a3;">${Utils.escapeHTML(this._t("module.dailyobs.close.noneSelected","\u0644\u0645 \u064A\u064F\u062D\u062F\u062F \u0634\u064A\u0621"))}</span>
                <button type="button" id="obs-bulk-close-btn" class="btn-primary btn-sm" disabled style="background:#4f46e5;border:none;">
                    <i class="fas fa-flag-checkered ml-1"></i>${Utils.escapeHTML(this._t("module.dailyobs.close.selected","\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062D\u062F\u062F"))}
                </button>
            </div>`:""}
            <div class="table-wrapper observations-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;" dir="rtl">
                <table class="data-table" style="font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                    <thead>
                        <tr>
                            ${a.showSelect?`<th style="width:44px;text-align:center;"><input type="checkbox" id="obs-select-all-closable" title="${Utils.escapeHTML(a.select)}" style="width:18px;height:18px;cursor:pointer;accent-color:#4f46e5;vertical-align:middle;"></th>`:""}
                            <th>${Utils.escapeHTML(a.code)}</th>
                            <th>${Utils.escapeHTML(a.location)}</th>
                            <th>${Utils.escapeHTML(a.datetime)}</th>
                            <th>${Utils.escapeHTML(a.type)}</th>
                            <th>${Utils.escapeHTML(a.shift)}</th>
                            <th>${Utils.escapeHTML(a.risk)}</th>
                            <th>${Utils.escapeHTML(a.status)}</th>
                            <th>${Utils.escapeHTML(a.observer)}</th>
                            <th>${Utils.escapeHTML(a.responsible)}</th>
                            <th>${Utils.escapeHTML(a.attachments)}</th>
                            <th>${Utils.escapeHTML(a.actions)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${y}
                    </tbody>
                </table>
            </div>
            ${h}
        `,this._bindObservationListCloseActions(i),this._updateObsBulkCloseBar();const S=document.getElementById("obs-load-more-btn");S&&S.addEventListener("click",()=>this.loadObservationsList({loadMore:!0})),setTimeout(()=>{const m=i.querySelector(".observations-table-wrapper");m&&this.setupTableScrollListeners(m)},100)},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-observation-btn");e&&(e.replaceWith(e.cloneNode(!0)),document.getElementById("add-observation-btn").addEventListener("click",()=>this.showForm()));const t=document.getElementById("export-observations-excel-btn");t&&(t.replaceWith(t.cloneNode(!0)),document.getElementById("export-observations-excel-btn").addEventListener("click",()=>this.showExportExcelModal()));const i=document.getElementById("export-observations-ppt-btn");i&&(i.replaceWith(i.cloneNode(!0)),document.getElementById("export-observations-ppt-btn").addEventListener("click",()=>this.showExportPptModal()));const s=document.getElementById("import-observations-excel-btn");s&&(s.replaceWith(s.cloneNode(!0)),document.getElementById("import-observations-excel-btn").addEventListener("click",()=>this.showImportExcelModal()));const a=document.getElementById("delete-all-observations-btn");a&&(a.replaceWith(a.cloneNode(!0)),document.getElementById("delete-all-observations-btn").addEventListener("click",()=>this.deleteAllObservations()));const o=document.getElementById("daily-observations-refresh-btn");o&&(o.replaceWith(o.cloneNode(!0)),document.getElementById("daily-observations-refresh-btn").addEventListener("click",()=>this.load()));const n=document.getElementById("observation-search");if(n){n.replaceWith(n.cloneNode(!0));const b=document.getElementById("observation-search"),f=()=>{const g=document.getElementById("observation-search-clear");g&&(g.hidden=!String(b.value||"").trim())};b.addEventListener("input",()=>{f(),clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.loadObservationsList({resetPage:!0})},300)}),b.addEventListener("keypress",g=>{g.key==="Enter"&&(clearTimeout(this.searchTimeout),this.loadObservationsList({resetPage:!0}))}),b.addEventListener("keydown",g=>{g.key==="Escape"&&b.value&&(b.value="",f(),this.loadObservationsList({resetPage:!0}))}),f()}const r=document.getElementById("observation-search-clear");r&&(r.replaceWith(r.cloneNode(!0)),document.getElementById("observation-search-clear").addEventListener("click",()=>{const b=document.getElementById("observation-search");b&&(b.value=""),this.loadObservationsList({resetPage:!0})}));const l=document.getElementById("observation-reset-filters");l&&(l.replaceWith(l.cloneNode(!0)),document.getElementById("observation-reset-filters").addEventListener("click",()=>this.resetFilters()));const d=document.getElementById("observation-refresh-btn");d&&(d.replaceWith(d.cloneNode(!0)),document.getElementById("observation-refresh-btn").addEventListener("click",()=>{this.loadObservationsList({resetPage:!0})})),["observation-filter-site","observation-filter-location","observation-filter-type","observation-filter-shift","observation-filter-risk","observation-filter-status","observation-filter-observer","observation-filter-responsible","observation-date-from","observation-date-to"].forEach(b=>{const f=document.getElementById(b);if(f){f.replaceWith(f.cloneNode(!0));const g=document.getElementById(b);g.addEventListener("change",()=>{b==="observation-filter-status"&&(this._obsKpiFilter==="open"||this._obsKpiFilter==="progress"||this._obsKpiFilter==="closed")&&(this._obsKpiFilter=""),b==="observation-filter-risk"&&this._obsKpiFilter==="high"&&(this._obsKpiFilter=""),b==="observation-filter-site"&&(this._obsKpiSiteApplied=!1),this.loadObservationsList({resetPage:!0})}),b.startsWith("observation-date-")&&g.addEventListener("input",()=>{clearTimeout(this._dateFilterTimeout),this._dateFilterTimeout=setTimeout(()=>this.loadObservationsList({resetPage:!0}),300)})}});const p=document.getElementById("obs-analytics-root");if(p){p.querySelectorAll(".obs-period-btn").forEach(S=>{S.addEventListener("click",()=>{this._analysisPeriod=S.getAttribute("data-period"),p.querySelectorAll(".obs-period-btn").forEach(m=>{const k=m===S;m.style.background=k?"#fff":"rgba(255,255,255,0.15)",m.style.color=k?"#1e40af":"#fff"}),this.updateAnalysisResults()})});const b=document.getElementById("obs-analytics-refresh");b&&b.addEventListener("click",()=>this.updateAnalysisResults());const f=document.getElementById("obs-toggle-filters-btn"),g=document.getElementById("obs-filter-panel");f&&g&&f.addEventListener("click",()=>{const S=g.style.display!=="none";g.style.display=S?"none":"block",f.style.background=S?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const y=document.getElementById("obs-filter-reset-btn");y&&y.addEventListener("click",()=>{["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(S=>{const m=document.getElementById(S);m&&(m.value="")}),this.updateAnalysisResults()}),["obs-af-site","obs-af-observer","obs-af-type","obs-af-risk","obs-af-status","obs-af-shift","obs-af-dept"].forEach(S=>{const m=document.getElementById(S);m&&m.addEventListener("change",()=>this.updateAnalysisResults())});const h=document.getElementById("obs-export-pdf-btn");h&&h.addEventListener("click",()=>this._exportAnalyticsPDF())}},200)},updateFilterOptions(){const e=this._getVisibleObservationsNormalized(),t=this.getFilters(),i=r=>Utils.escapeHTML(String(r||"")),s=(r,l)=>{const d={};return r.forEach(c=>{const p=String(l(c)||"").trim();p&&(d[p]=(d[p]||0)+1)}),Object.keys(d).sort((c,p)=>c.localeCompare(p,"ar")).map(c=>({value:c,count:d[c]}))},a=(r,l,d)=>{const c=document.getElementById(r);if(!c)return;const p=String(t[l]||"").trim(),b=Object.assign({},t,{[l]:""}),f=this.filterItems(e,b),g=s(f,d);p&&!g.some(h=>h.value===p)&&g.unshift({value:p,count:0});const y=this._t("filter.all","\u0627\u0644\u0643\u0644");c.innerHTML=`<option value="">${i(y)}</option>`+g.map(h=>`<option value="${i(h.value)}">${i(h.value)} (${h.count})</option>`).join(""),c.value=p,c.classList.toggle("is-active-filter",!!p)};a("observation-filter-site","site",r=>r.siteName),a("observation-filter-location","location",r=>r.locationName),a("observation-filter-type","type",r=>r.observationType),a("observation-filter-shift","shift",r=>r.shift),a("observation-filter-risk","risk",r=>r.riskLevel),a("observation-filter-status","status",r=>r.status),a("observation-filter-observer","observer",r=>r.observerName),a("observation-filter-responsible","responsible",r=>r.responsibleDepartment),["observation-date-from","observation-date-to","observation-search"].forEach(r=>{const l=document.getElementById(r);l&&l.classList.toggle("is-active-filter",!!(l.value&&String(l.value).trim()))});const o=document.getElementById("observation-search-clear"),n=document.getElementById("observation-search");o&&n&&(o.hidden=!String(n.value||"").trim())},resetFilters(){this._obsKpiFilter="",this._obsKpiSiteApplied=!1;const e=document.getElementById("observation-search");e&&(e.value=""),["observation-filter-site","observation-filter-location","observation-filter-type","observation-filter-shift","observation-filter-risk","observation-filter-status","observation-filter-observer","observation-filter-responsible"].forEach(a=>{const o=document.getElementById(a);o&&(o.value="")});const i=document.getElementById("observation-date-from"),s=document.getElementById("observation-date-to");i&&(i.value=""),s&&(s.value=""),document.querySelectorAll(".filter-count-badge").forEach(a=>{a.remove()}),this.loadObservationsList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631")},async exportTop10PDF(){try{Notification.info("\u{1F680} \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 Top 10 \u0628\u0635\u064A\u063A\u0629 PDF...");const e=document.getElementById("top10-module-root");if(!e){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u062D\u062A\u0648\u0649 Top 10");return}await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await this._loadAnalyticsLib("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const t=await html2canvas(e,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,ignoreElements:y=>y.id==="manage-top10-categories-btn"||y.id==="add-top10-chart-btn"||y.id==="manage-top10-charts-btn"||y.id==="export-top10-pdf-hero-btn"||y.id==="export-top10-ppt-hero-btn"||y.id==="export-top10-table-pdf-btn"||y.id==="export-top10-table-ppt-btn"}),{jsPDF:i}=window.jspdf,s=new i({orientation:"portrait",unit:"mm",format:"a4"}),a=s.internal.pageSize.getWidth(),o=s.internal.pageSize.getHeight(),n=8,r=8,l=a-n*2,d=l/t.width,c=t.height*d,p=o-n-r,b=Math.max(1,Math.ceil(c/p)),f=p/d;for(let y=0;y<b;y++){y>0&&s.addPage();const h=document.createElement("canvas"),S=Math.min(f,t.height-y*f);h.width=t.width,h.height=S,h.getContext("2d").drawImage(t,0,y*f,t.width,S,0,0,t.width,S);const k=h.toDataURL("image/jpeg",.92);s.addImage(k,"JPEG",n,n,l,S*d),s.setDrawColor(226,232,240),s.line(n,o-r,a-n,o-r),s.setTextColor(120,120,120),s.setFontSize(8),s.setFont("helvetica","normal"),s.text("Americana Group \u2014 HSE Top 10 Risk Report",n,o-3),s.text(`Page ${y+1} / ${b}`,a-n,o-3,{align:"right"})}const g=new Date().toISOString().slice(0,10);s.save(`\u062A\u0642\u0631\u064A\u0631-Top-10-\u0645\u0644\u0627\u062D\u0638\u0627\u062A-\u0627\u0644\u0633\u0644\u0627\u0645\u0629-${g}.pdf`),Notification.success("\u2705 \u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 Top 10 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D!")}catch{Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}},async exportTop10PptReport(){await this.exportPptReport({maxCount:10,status:"all"})},async showExportPptModal(){const e=document.createElement("div");e.className="modal-overlay active",e.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const t=this.getDepartmentOptions(),i=this.getSiteOptions(),a=new Date().toISOString().slice(0,10),o=this.canDailyObservationsFullAdminUi();e.innerHTML=`
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
                                <option value="all" selected>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (All)</option>
                                <option value="open">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0641\u0642\u0637 (Open)</option>
                                <option value="closed">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0641\u0642\u0637 (Closed)</option>
                                <option value="in_progress">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062C\u0627\u0631\u064A\u0629 / \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 (In Progress)</option>
                                <option value="pending">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (Pending)</option>
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

                    <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u062B\u0627\u0644\u062B: \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0648\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0634\u0631\u0627\u0626\u062D -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calendar-day" style="color: #d97706; margin-left: 6px;"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A
                            </label>
                            <input id="dailyobs-ppt-report-date" type="date" value="${a}" style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 600; color: #0f172a; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-list-ol" style="color: #8b5cf6; margin-left: 6px;"></i>\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u0635\u062F\u064A\u0631\u0647\u0627 <span style="color: #dc2626;">*</span>
                            </label>
                            <select id="dailyobs-ppt-maxcount" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13.5px; font-weight: 700; color: #0f172a; background: #ffffff; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='#2563eb';" onblur="this.style.borderColor='#cbd5e1';">
                                <option value="all" selected>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 (\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0643\u0644)</option>
                                <option value="50">\u0623\u062D\u062F\u062B 50 \u0645\u0644\u0627\u062D\u0638\u0629</option>
                                <option value="100">\u0623\u062D\u062F\u062B 100 \u0645\u0644\u0627\u062D\u0638\u0629</option>
                                <option value="200">\u0623\u062D\u062F\u062B 200 \u0645\u0644\u0627\u062D\u0638\u0629</option>
                                <option value="10">Top 10 (\u0627\u0644\u0623\u0639\u0644\u0649 \u0623\u0648\u0644\u0648\u064A\u0629 \u0648\u062E\u0637\u0648\u0631\u0629)</option>
                            </select>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0635\u0641 \u0627\u0644\u0631\u0627\u0628\u0639: \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E -->
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

                <!-- \u0627\u0644\u0641\u0648\u062A\u0631 \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631 -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding-top: 18px; border-top: 1px solid #f1f5f9;">
                    <button type="button" id="dailyobs-ppt-cancel-btn" style="padding: 11px 22px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'; this.style.color='#0f172a';" onmouseout="this.style.background='#f8fafc'; this.style.color='#475569';">\u0625\u0644\u063A\u0627\u0621</button>
                    
                    <button type="button" id="dailyobs-ppt-export-btn" style="display: flex; align-items: center; gap: 10px; padding: 11px 26px; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; font-size: 14px; font-weight: 700; border-radius: 10px; border: none; outline: none; cursor: pointer; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(37, 99, 235, 0.5)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(37, 99, 235, 0.35)';">
                        <i class="fas fa-file-powerpoint" style="font-size: 16px; color: #fb923c;"></i> \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPT
                    </button>
                </div>

            </div>
        `,document.body.appendChild(e);const n=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",n),e.querySelector("#dailyobs-ppt-cancel-btn")?.addEventListener("click",n),e.addEventListener("click",r=>{r.target===e&&n()}),o&&e.querySelector("#ppt-template-id-settings-btn")?.addEventListener("click",async()=>{n(),await this.showPptTemplateIdSetupModal()}),e.querySelector("#dailyobs-ppt-export-btn")?.addEventListener("click",async()=>{const r=e.querySelector("#dailyobs-ppt-status")?.value||"all",l=(e.querySelector("#dailyobs-ppt-site")?.value||"").trim(),d=(e.querySelector("#dailyobs-ppt-department")?.value||"").trim(),c=e.querySelector("#dailyobs-ppt-language")?.value||"ar",p=e.querySelector("#dailyobs-ppt-report-date")?.value||"",b=e.querySelector("#dailyobs-ppt-from-date")?.value||"",f=e.querySelector("#dailyobs-ppt-to-date")?.value||"",g=e.querySelector("#dailyobs-ppt-maxcount")?.value||"all";n(),await this.exportPptReport({department:d,siteName:l,language:c,reportDate:p,fromDate:b,toDate:f,status:r,maxCount:g})})},async exportPptReport({department:e="",siteName:t="",language:i="ar",reportDate:s="",fromDate:a="",toDate:o="",status:n="all",maxCount:r="all"}={}){try{const l=Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(l.length===0){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u064A\u0648\u0645\u064A\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631.");return}const d=l.map(x=>this.normalizeRecord(x)),c=String(e||"").trim(),p=String(t||"").trim(),b=a?new Date(a):null,f=o?new Date(o):null,g=d.filter(x=>{if(p&&String(x.siteName||"").trim()!==p||c&&String(x.responsibleDepartment||"").trim()!==c)return!1;const v=String(x.status||"").trim().toLowerCase();if(n==="open"){if(v==="\u0645\u063A\u0644\u0642"||v==="closed"||v==="\u0645\u0639\u0644\u0642"||v==="pending"||v==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629")return!1}else if(n==="closed"){if(v!=="\u0645\u063A\u0644\u0642"&&v!=="closed")return!1}else if(n==="in_progress"){if(v!=="\u062C\u0627\u0631\u064A"&&v!=="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"&&v!=="in progress"&&v!=="in_progress")return!1}else if(n==="pending"&&v!=="\u0645\u0639\u0644\u0642"&&v!=="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"&&v!=="\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"&&v!=="pending")return!1;if(!b&&!f)return!0;const $=x.date?new Date(x.date):null;return!(!$||Number.isNaN($.getTime())||b&&$<new Date(b.getFullYear(),b.getMonth(),b.getDate())||f&&$>new Date(f.getFullYear(),f.getMonth(),f.getDate(),23,59,59,999))});if(g.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629.");return}const y=[...g].sort((x,v)=>{const $=H=>{const re=String(H||"").toLowerCase();return re.includes("\u0639\u0627\u0644\u064A")||re.includes("\u062D\u0631\u062C")||re.includes("high")||re.includes("critical")?3:re.includes("\u0645\u062A\u0648\u0633\u0637")||re.includes("medium")?2:1},B=$(v.riskLevel)-$(x.riskLevel);if(B!==0)return B;const de=H=>H!=="\u0645\u063A\u0644\u0642"?2:1,G=de(v.status)-de(x.status);if(G!==0)return G;const te=x.date?new Date(x.date).getTime():0;return(v.date?new Date(v.date).getTime():0)-te}),S=r==="all"||r===0||r==="0"||!r?y.length:parseInt(r,10)||y.length,m=await this.hydrateObservationBatchForExport(y.slice(0,S)),k="ppt_export_"+Date.now(),T=`\u062C\u0627\u0631\u064A \u062A\u0635\u0645\u064A\u0645 \u0648\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPTX (${m.length} \u0645\u0644\u0627\u062D\u0638\u0629)...`,C=document.getElementById("ppt-export-options-modal");Notification.info("\u{1F680} \u0628\u062F\u0623 \u062A\u0635\u0645\u064A\u0645 \u0648\u062A\u0635\u062F\u064A\u0631 \u0645\u0644\u0641 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A PPTX..."),await this._loadAnalyticsLib("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js",()=>typeof PptxGenJS<"u");const w=new PptxGenJS;w.defineLayout({name:"A16x9",width:13.333,height:7.5}),w.layout="A16x9";const u=String(i||"ar").toLowerCase()==="en",U=s?new Date(s).toLocaleDateString(u?"en-US":"ar-EG"):new Date().toLocaleDateString(u?"en-US":"ar-EG"),L=(c||"General").replace(/[\\/:*?"<>|]/g,"-"),F=AppState.companyLogo||AppState.companySettings?.logo||"",q=AppState.companySettings?.name||AppState.companyName||"\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0627\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A",V=new Map,A=x=>!x||!x.data?null:{data:String(x.data)},_=x=>{const v=String(x||"").trim();return!v||/^FILE_/i.test(v)||/^ATT-/i.test(v)||/^PROFILE_/i.test(v)?!1:/^[a-zA-Z0-9_-]{25,}$/.test(v)},j=x=>new Promise(v=>{const $=String(x||"");if(!$.startsWith("data:image/")){v($||null);return}try{const B=new Image,de=setTimeout(()=>v($),4e3);B.onload=()=>{clearTimeout(de);try{const G=document.createElement("canvas"),te=900;let P=B.naturalWidth||800,H=B.naturalHeight||600;P>te&&(H=Math.round(H*te/P),P=te),G.width=P,G.height=H,G.getContext("2d").drawImage(B,0,0,P,H),v(G.toDataURL("image/jpeg",.82)||$)}catch{v($)}},B.onerror=()=>{clearTimeout(de),v($)},B.src=$}catch{v($)}}),X=async(x,v)=>{const $=await j(x);if(!$||!String($).startsWith("data:image/"))return null;const B={data:String($)};return v&&V.set(v,B),A(B)},le=async(x,v,$)=>{const B=new Array(x.length);let de=0;const G=Array.from({length:Math.min(v,x.length)},async()=>{for(;de<x.length;){const te=de++;B[te]=await $(x[te],te)}});return await Promise.all(G),B},J=async x=>{if(!x||typeof x=="object"&&x.__listOnly&&!x.fileId&&!x.url&&!x.data)return null;let v="",$="";if(typeof x=="object"){if(x.data&&typeof x.data=="string"&&x.data.trim()){const H=x.data.trim();if(H.startsWith("data:")||H.startsWith("/9j/")||H.startsWith("iVBORw"))return X(H.startsWith("data:")?H:"data:image/jpeg;base64,"+H)}v=this.getObservationAttachmentSrc(x),$=this.resolveObservationDriveFileId(x);const P=String(x.id||"").trim();!$&&/^FILE_/i.test(P)&&($=P.split(/[?#\s]/)[0])}else typeof x=="string"&&(v=x.trim(),$=this.resolveObservationDriveFileId(v));if(!v&&!$)return null;if((v.startsWith("/9j/")||v.startsWith("iVBORw")||v.startsWith("R0lGOD")||v.startsWith("UklGR"))&&(v="data:image/jpeg;base64,"+v),v.startsWith("data:image/")||v.startsWith("data:"))return X(v);/^FILE_/i.test(v)&&($=v.split(/[?#\s]/)[0]);const B=$||v;if(B&&V.has(B))return A(V.get(B));if($&&typeof Utils<"u"&&typeof Utils.fetchDriveImageDataUri=="function")try{const P=await Utils.fetchDriveImageDataUri($,{force:!0,requireDataUri:!0});if(P&&String(P).startsWith("data:image/"))return X(String(P),B);if(P&&/^https?:\/\//i.test(String(P))&&typeof Utils.fetchPublicImageAsDataUri=="function"){const H=await Utils.fetchPublicImageAsDataUri(String(P));if(H)return X(H,B)}}catch{}if((v.startsWith("http://")||v.startsWith("https://"))&&typeof Utils<"u"&&typeof Utils.fetchPublicImageAsDataUri=="function")try{const P=await Utils.fetchPublicImageAsDataUri(v);if(P)return X(P,B)}catch{}const de=v.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)||v.match(/[?&]id=([a-zA-Z0-9_-]+)/)||v.match(/\/d\/([a-zA-Z0-9_-]+)/)||v.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);let G=de?de[1]:"";!G&&_($)&&(G=$),G&&!_(G)&&(G="");const te=[];G&&(te.push(`https://lh3.googleusercontent.com/d/${G}=w800`),te.push(`https://drive.google.com/thumbnail?id=${G}&sz=w800`),te.push(`https://drive.google.com/uc?export=download&id=${G}`)),(v.startsWith("http://")||v.startsWith("https://"))&&te.push(v);for(const P of te)try{const H=await new Promise(re=>{const ce=new Image;ce.crossOrigin="anonymous";const xe=setTimeout(()=>re(null),8e3);ce.onload=()=>{clearTimeout(xe);try{const ne=document.createElement("canvas"),ye=900;let pe=ce.naturalWidth||800,Ce=ce.naturalHeight||600;pe>ye&&(Ce=Math.round(Ce*ye/pe),pe=ye),ne.width=pe,ne.height=Ce,ne.getContext("2d").drawImage(ce,0,0,pe,Ce),re(ne.toDataURL("image/jpeg",.82))}catch{re(null)}},ce.onerror=()=>{clearTimeout(xe),re(null)},ce.src=P});if(H&&String(H).startsWith("data:image/"))return X(String(H),B)}catch{}for(const P of te)try{const H=new AbortController,re=setTimeout(()=>H.abort(),8e3),ce=await fetch(P,{mode:"cors",signal:H.signal});if(clearTimeout(re),ce.ok){const xe=await ce.blob();if(xe&&xe.size>0){const ne=await new Promise(ye=>{const pe=new FileReader;pe.onloadend=()=>ye(pe.result),pe.readAsDataURL(xe)});if(ne&&(String(ne).startsWith("data:image/")||String(ne).startsWith("data:application/octet-stream"))){const ye=String(ne).replace("data:application/octet-stream","data:image/jpeg");return X(ye,B)}}}}catch{}if(G&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.isLoggedIn=="function"&&GoogleIntegration.isLoggedIn())try{const P=typeof GoogleIntegration.getAuthToken=="function"&&GoogleIntegration.getAuthToken()||typeof gapi<"u"&&gapi?.auth2?.getAuthInstance()?.currentUser?.get()?.getAuthResponse()?.access_token||AppState.googleAccessToken;if(P){const H=new AbortController,re=setTimeout(()=>H.abort(),8e3),ce=await fetch(`https://www.googleapis.com/drive/v3/files/${G}?alt=media`,{headers:{Authorization:`Bearer ${P}`},signal:H.signal});if(clearTimeout(re),ce.ok){const xe=await ce.blob(),ne=await new Promise(ye=>{const pe=new FileReader;pe.onloadend=()=>ye(pe.result),pe.readAsDataURL(xe)});if(ne&&String(ne).startsWith("data:image/"))return X(String(ne),B)}}}catch{}return null},D=x=>{if(!x)return"";if(Array.isArray(x.attachments)&&x.attachments.length>0){const v=x.attachments.find($=>this.isObservationPhotoAttachment($))||x.attachments.find($=>$&&!$.__listOnly)||null;if(v)return v}if(Array.isArray(x.afterExecutionImages)&&x.afterExecutionImages.length>0){const v=x.afterExecutionImages.find(Boolean);if(v)return v}return""},z=(x,v)=>String(x?.id||x?.isoCode||"idx-"+v),[Z,ie]=await Promise.all([J(F),le(m,3,async(x,v)=>{const $=z(x,v),B=await J(D(x));return[$,A(B)]})]),O=Object.create(null);ie.forEach(([x,v])=>{O[x]=v});const I=w.addSlide();if(I.background={color:"F8FAFC"},I.addShape(w.ShapeType.rect,{x:0,y:0,w:"100%",h:.9,fill:{color:"1E3A8A"}}),I.addShape(w.ShapeType.rect,{x:0,y:.9,w:"100%",h:.05,fill:{color:"D97706"}}),Z){I.addShape(w.ShapeType.roundRect,{x:.8,y:.12,w:2.2,h:.68,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1},rectRadius:.08});try{I.addImage({...Z,x:.85,y:.15,w:2.1,h:.62,sizing:{type:"contain",w:2.1,h:.62}})}catch{}}else I.addShape(w.ShapeType.roundRect,{x:.8,y:.12,w:2.2,h:.68,fill:{color:"FFFFFF"},line:{color:"DC2626",width:1.5},rectRadius:.08}),I.addText("AMERICANA",{x:.8,y:.12,w:2.2,h:.68,fontSize:14,bold:!0,color:"DC2626",align:"center",valign:"middle"});I.addText(u?"HSE Management System \u2014 Safety & Health Department":"\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 | \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",{x:4,y:.15,w:8.5,h:.6,fontSize:13,bold:!0,color:"FFFFFF",align:u?"left":"right",rtl:!u,fontFace:"Arial"}),I.addShape(w.ShapeType.roundRect,{x:1.5,y:1.45,w:10.33,h:3.4,fill:{color:"FFFFFF"},line:{color:"3B82F6",width:2},rectRadius:.15}),I.addShape(w.ShapeType.roundRect,{x:1.7,y:1.6,w:9.93,h:.04,fill:{color:"D97706"},line:{color:"D97706"}});const W=p||m[0]?.siteName||"",ae=u?`Plant : ${W||"All Plants"}`:`\u0627\u0644\u0645\u0635\u0646\u0639 : ${W||"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639"}`;I.addText([{text:u?`Safety Observations Report

`:`\u062A\u0642\u0631\u064A\u0631 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629

`,options:{fontSize:32,bold:!0,color:"1E3A8A",rtl:!u}},{text:`${q}

`,options:{fontSize:20,bold:!0,color:"0F172A",rtl:!u}},{text:ae,options:{fontSize:18,bold:!0,color:"D97706",rtl:!u}}],{x:1.6,y:1.75,w:10.13,h:2.8,align:"center",valign:"middle",fontFace:"Arial"}),[{title:u?"Department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629",val:c||(u?"All Departments":"\u0643\u0627\u0641\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A"),bg:"EFF6FF",line:"93C5FD",color:"1E40AF"},{title:u?"Report Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631",val:U,bg:"FEF3C7",line:"FDE68A",color:"B45309"},{title:u?"Observations Count":"\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0627\u0644\u062A\u0642\u0631\u064A\u0631",val:u?`${m.length} Observations`:`${m.length} \u0645\u0644\u0627\u062D\u0638\u0629`,bg:"ECFDF5",line:"A7F3D0",color:"047857"}].forEach((x,v)=>{const $=u?1.5+v*3.6:1.5+(2-v)*3.6;I.addShape(w.ShapeType.roundRect,{x:$,y:5.15,w:3.13,h:1.4,fill:{color:x.bg},line:{color:x.line,width:1.5},rectRadius:.1}),I.addText([{text:x.title+`
`,options:{fontSize:11,bold:!0,color:"64748B",rtl:!u}},{text:x.val,options:{fontSize:13.5,bold:!0,color:x.color,rtl:!u}}],{x:$,y:5.2,w:3.13,h:1.3,align:"center",valign:"middle",fontFace:"Arial"})}),I.addShape(w.ShapeType.rect,{x:0,y:6.95,w:"100%",h:.55,fill:{color:"1E3A8A"}}),I.addText("Safety First \u2014 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0623\u0648\u0644\u0627\u064B \u0648\u0628\u0646\u0627\u0621 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0648\u0645\u0633\u062A\u062F\u0627\u0645\u0629",{x:0,y:6.98,w:"100%",h:.48,fontSize:11,bold:!0,color:"FBBF24",align:"center",valign:"middle",fontFace:"Arial"});const M=w.addSlide();M.background={color:"F8FAFC"},M.addShape(w.ShapeType.rect,{x:0,y:0,w:"100%",h:.7,fill:{color:"1E3A8A"}}),M.addShape(w.ShapeType.rect,{x:0,y:.7,w:"100%",h:.04,fill:{color:"D97706"}}),M.addText(u?"Report Overview & Safety Performance Dashboard":"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062A\u0642\u0631\u064A\u0631",{x:4.5,y:.05,w:8,h:.6,fontSize:18,bold:!0,color:"FFFFFF",align:u?"left":"right",rtl:!u,fontFace:"Arial"}),M.addText(u?`Total: ${m.length} Observations`:`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: ${m.length} \u0645\u0644\u0627\u062D\u0638\u0629 | \u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${U}`,{x:.4,y:.05,w:4,h:.6,fontSize:11,bold:!0,color:"FBBF24",align:u?"right":"left",rtl:!u,fontFace:"Arial"});const Y=m.length,me=m.filter(x=>x.status!=="\u0645\u063A\u0644\u0642").length,ue=m.filter(x=>x.status==="\u0645\u063A\u0644\u0642").length,fe=m.filter(x=>String(x.riskLevel||"").includes("\u0639\u0627\u0644\u064A")||String(x.riskLevel||"").includes("\u062D\u0631\u062C\u0629")).length,ve=m.filter(x=>String(x.riskLevel||"").includes("\u0645\u062A\u0648\u0633\u0637")).length,ge=Math.max(0,Y-fe-ve),R=Math.round(ue/Math.max(1,Y)*100),E=Math.round(me/Math.max(1,Y)*100),K=Math.round(fe/Math.max(1,Y)*100),be={};m.forEach(x=>{const v=String(x.observationType||(u?"General":"\u0639\u0627\u0645")).trim();be[v]=(be[v]||0)+1});const ke=Object.entries(be).sort((x,v)=>v[1]-x[1]).slice(0,4),Se=new Set(m.map(x=>x.siteName||x.locationName).filter(Boolean)).size||1;[{label:u?"Total Observations":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",val:Y,sub:u?"100% of recorded":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629",color:"1E3A8A",bg:"DBEAFE",border:"3B82F6"},{label:u?"Open Actions":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0641\u062A\u0648\u062D\u0629",val:me,sub:u?`${E}% pending actions`:`${E}% \u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630`,color:"B45309",bg:"FEF3C7",border:"F59E0B"},{label:u?"Closed Observations":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u063A\u0644\u0642\u0629",val:ue,sub:u?`${R}% resolution rate`:`${R}% \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629`,color:"047857",bg:"D1FAE5",border:"10B981"},{label:u?"High Risk":"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",val:fe,sub:u?`${K}% critical priority`:fe>0?`${K}% \u062A\u062A\u0637\u0644\u0628 \u0623\u0648\u0644\u0648\u064A\u0629 \u0642\u0635\u0648\u0649`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0631\u062C\u0629",color:"B91C1C",bg:"FEE2E2",border:"EF4444"}].forEach((x,v)=>{const $=u?.5+v*3.1:.5+(3-v)*3.1;M.addShape(w.ShapeType.roundRect,{x:$,y:.9,w:2.85,h:1.45,fill:{color:x.bg},line:{color:x.border,width:1.5},rectRadius:.1}),M.addText([{text:String(x.val)+`
`,options:{fontSize:24,bold:!0,color:x.color}},{text:x.label+`
`,options:{fontSize:12,bold:!0,color:"1E293B",rtl:!u}},{text:x.sub,options:{fontSize:9.5,color:"64748B",rtl:!u}}],{x:$,y:.95,w:2.85,h:1.35,align:"center",valign:"middle",fontFace:"Arial"})});const Q=2.5,oe=4.15,ee=3.95,Ae=u?.5:8.88;M.addShape(w.ShapeType.roundRect,{x:Ae,y:Q,w:ee,h:oe,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),M.addShape(w.ShapeType.rect,{x:Ae,y:Q,w:ee,h:.38,fill:{color:"1E3A8A"}}),M.addText(u?"Risk Level Breakdown":"\u062A\u0648\u0632\u064A\u0639 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629",{x:Ae,y:Q,w:ee,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const Ee=[[{text:u?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Risk Level":"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"right",rtl:!u}}],[{text:`${K}%`,options:{color:"B91C1C",bold:!0,fontSize:10,align:"center"}},{text:String(fe),options:{color:"B91C1C",bold:!0,fontSize:10,align:"center"}},{text:u?"High / Critical":"\u0639\u0627\u0644\u064A\u0629 / \u062D\u0631\u062C\u0629",options:{color:"B91C1C",bold:!0,fontSize:10,align:"right",rtl:!u}}],[{text:`${Math.round(ve/Math.max(1,Y)*100)}%`,options:{color:"B45309",bold:!0,fontSize:10,align:"center"}},{text:String(ve),options:{color:"B45309",bold:!0,fontSize:10,align:"center"}},{text:u?"Medium Risk":"\u0645\u062A\u0648\u0633\u0637\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{color:"B45309",bold:!0,fontSize:10,align:"right",rtl:!u}}],[{text:`${Math.round(ge/Math.max(1,Y)*100)}%`,options:{color:"047857",bold:!0,fontSize:10,align:"center"}},{text:String(ge),options:{color:"047857",bold:!0,fontSize:10,align:"center"}},{text:u?"Low Risk":"\u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{color:"047857",bold:!0,fontSize:10,align:"right",rtl:!u}}]];M.addTable(Ee,{x:Ae+.1,y:Q+.5,w:ee-.2,h:3.45,colW:[1,.9,1.85],fontSize:10,border:{pt:.5,color:"E2E8F0"}});const Te=4.69;M.addShape(w.ShapeType.roundRect,{x:Te,y:Q,w:ee,h:oe,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),M.addShape(w.ShapeType.rect,{x:Te,y:Q,w:ee,h:.38,fill:{color:"2563EB"}}),M.addText(u?"Top Observation Categories":"\u0623\u0628\u0631\u0632 \u0645\u062C\u0627\u0644\u0627\u062A \u0648\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",{x:Te,y:Q,w:ee,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const Le=[[{text:u?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Category":"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,fill:"F8FAFC",color:"1E3A8A",align:"right",rtl:!u}}]];for(ke.forEach(([x,v])=>{const $=Math.round(v/Math.max(1,Y)*100);Le.push([{text:`${$}%`,options:{color:"1E40AF",bold:!0,fontSize:10,align:"center"}},{text:String(v),options:{color:"0F172A",bold:!0,fontSize:10,align:"center"}},{text:x.length>22?x.slice(0,22)+"\u2026":x,options:{color:"0F172A",fontSize:9.5,align:"right",rtl:!u}}])});Le.length<5;)Le.push([{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}},{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}},{text:"\u2014",options:{color:"94A3B8",fontSize:10,align:"center"}}]);M.addTable(Le,{x:Te+.1,y:Q+.5,w:ee-.2,h:3.45,colW:[1,.9,1.85],fontSize:10,border:{pt:.5,color:"E2E8F0"}});const $e=u?8.88:.5;M.addShape(w.ShapeType.roundRect,{x:$e,y:Q,w:ee,h:oe,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),M.addShape(w.ShapeType.rect,{x:$e,y:Q,w:ee,h:.38,fill:{color:"059669"}}),M.addText(u?"Executive Summary & Context":"\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A \u0648\u0633\u064A\u0627\u0642 \u0627\u0644\u0631\u0635\u062F",{x:$e,y:Q,w:ee,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const Oe=u?[{text:"\u2022 Scope & Coverage: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`${Se} sites/locations surveyed.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Action Status: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`${ue} actions completed, ${me} in progress.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Compliance Target: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:`Complete all pending high-priority actions on schedule.

`,options:{color:"0F172A",fontSize:10}},{text:"\u2022 Verification: ",options:{bold:!0,color:"1E3A8A",fontSize:10}},{text:"Follow up with site supervisors for documented closures.",options:{color:"0F172A",fontSize:10}}]:[{text:"\u2022 \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u0634\u0645\u0644 \u0627\u0644\u0631\u0635\u062F ${Se} \u0645\u0648\u0642\u0639\u0627\u064B / \u0645\u0646\u0637\u0642\u0629 \u0639\u0645\u0644.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 ${ue} \u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 ${me}.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641 \u0627\u0644\u0648\u0642\u0627\u0626\u064A: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:`\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0648\u0625\u063A\u0644\u0627\u0642\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u0645\u0648\u0639\u062F \u0627\u0644\u0645\u062D\u062F\u062F.

`,options:{color:"0F172A",fontSize:10,rtl:!0}},{text:"\u2022 \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A: ",options:{bold:!0,color:"1E3A8A",fontSize:10,rtl:!0}},{text:"\u062A\u0648\u062B\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u062A\u0635\u062D\u064A\u062D \u0628\u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0623\u062F\u0644\u0629.",options:{color:"0F172A",fontSize:10,rtl:!0}}];M.addText(Oe,{x:$e+.15,y:Q+.5,w:ee-.3,h:3.45,align:u?"left":"right",valign:"top",rtl:!u,fontFace:"Arial"}),M.addShape(w.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),M.addText(`${q} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!u,fontFace:"Arial"}),M.addText(u?`Slide 2 of ${m.length+4}`:`\u0634\u0631\u064A\u062D\u0629 2 \u0645\u0646 ${m.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"});for(let x=0;x<m.length;x++){const v=m[x],$=w.addSlide();$.background={color:"F8FAFC"};const B=v.isoCode||v.id||`OBS-${x+1}`,de=String(v.date||"").slice(0,10)||"\u2014",G=[v.siteName,v.locationName].filter(Boolean).join(" - ")||"\u2014",te=A(O[z(v,x)]);$.addShape(w.ShapeType.rect,{x:0,y:0,w:"100%",h:.65,fill:{color:"1E3A8A"}}),$.addShape(w.ShapeType.rect,{x:0,y:.65,w:"100%",h:.04,fill:{color:"D97706"}}),$.addText(u?`Observation Details \u2014 ${G}`:`\u0628\u0637\u0627\u0642\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u2014 ${G}`,{x:4.5,y:.05,w:8.4,h:.55,fontSize:14.5,bold:!0,color:"FFFFFF",align:u?"left":"right",rtl:!u,fontFace:"Arial"}),$.addText(B,{x:.4,y:.05,w:3.8,h:.55,fontSize:14.5,bold:!0,color:"FBBF24",align:"left",fontFace:"Arial"}),$.addShape(w.ShapeType.roundRect,{x:6.8,y:.78,w:6.1,h:5.85,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),$.addShape(w.ShapeType.rect,{x:6.8,y:.78,w:6.1,h:.38,fill:{color:"2563EB"}}),$.addText(u?"Observation & Corrective Action Details":"\u0648\u0635\u0641 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A",{x:6.8,y:.78,w:6.1,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const P=[[{text:String(B),options:{bold:!0,color:"1E40AF",fontSize:10.5,align:"right",rtl:!u}},{text:u?"Observation No":"\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(de),options:{color:"0F172A",fontSize:10.5,align:"right",rtl:!u}},{text:u?"Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0635\u062F",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(G),options:{color:"0F172A",fontSize:10,align:"right",rtl:!u}},{text:u?"Location":"\u0627\u0644\u0645\u0643\u0627\u0646 / \u0627\u0644\u0645\u0648\u0642\u0639",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.observationType||"\u2014"),options:{color:"0F172A",fontSize:10,align:"right",rtl:!u}},{text:u?"Type":"\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.details||"\u2014"),options:{color:"1E293B",fontSize:9.5,align:"right",rtl:!u}},{text:u?"Description":"\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.correctiveAction||"\u2014"),options:{color:"047857",bold:!0,fontSize:9.5,align:"right",rtl:!u}},{text:u?"Corrective Action":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.riskLevel||"\u2014"),options:{bold:!0,color:String(v.riskLevel||"").includes("\u0639\u0627\u0644\u064A")?"DC2626":"0F172A",fontSize:10.5,align:"right",rtl:!u}},{text:u?"Risk Level":"\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.expectedCompletionDate||"\u2014").slice(0,10),options:{color:"0F172A",fontSize:10,align:"right",rtl:!u}},{text:u?"Target Date":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0642\u062A\u0631\u062D",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.responsibleDepartment||"\u2014"),options:{color:"0F172A",fontSize:10,align:"right",rtl:!u}},{text:u?"Responsible Dept":"\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}],[{text:String(v.status||"\u2014"),options:{bold:!0,color:v.status==="\u0645\u063A\u0644\u0642"?"047857":"B45309",fontSize:10.5,align:"right",rtl:!u}},{text:u?"Status":"\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",options:{bold:!0,color:"DC2626",fontSize:10.5,align:"right",fill:"F8FAFC",rtl:!u}}]];if($.addTable(P,{x:6.8,y:1.16,w:6.1,h:5.47,colW:[4.3,1.8],border:{pt:.5,color:"E2E8F0"}}),$.addShape(w.ShapeType.roundRect,{x:.4,y:.78,w:6.1,h:5.85,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),$.addShape(w.ShapeType.rect,{x:.4,y:.78,w:6.1,h:.38,fill:{color:"64748B"}}),$.addText(u?"Observation Photo":"\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629",{x:.4,y:.78,w:6.1,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"}),te&&te.data)try{$.addImage({data:te.data,x:.55,y:1.25,w:5.8,h:5.25,sizing:{type:"contain",w:5.8,h:5.25}})}catch{$.addShape(w.ShapeType.roundRect,{x:.8,y:1.6,w:5.3,h:4.5,fill:{color:"F8FAFC"},line:{color:"CBD5E1",width:1},rectRadius:.1}),$.addText(u?"Photo attached in system":"\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0631\u0641\u0642\u0629 \u0628\u0627\u0644\u0646\u0638\u0627\u0645",{x:.8,y:1.6,w:5.3,h:4.5,fontSize:13,color:"64748B",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"})}else{const H=this.observationHasRealImages(v)||Number(v.attachmentCount)>0;$.addShape(w.ShapeType.roundRect,{x:.8,y:1.6,w:5.3,h:4.5,fill:{color:"F8FAFC"},line:{color:"E2E8F0",width:1},rectRadius:.1}),$.addText(H?u?"Could not embed the attached photo":"\u062A\u0639\u0630\u0631 \u062A\u0636\u0645\u064A\u0646 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629":u?"No image attached for this observation":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629 \u0645\u0631\u0641\u0642\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",{x:.8,y:1.6,w:5.3,h:4.5,fontSize:13,color:"94A3B8",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"})}$.addShape(w.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),$.addText(`${q} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!u,fontFace:"Arial"}),$.addText(u?`Slide ${x+3} of ${m.length+4}`:`\u0634\u0631\u064A\u062D\u0629 ${x+3} \u0645\u0646 ${m.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"})}const se=w.addSlide();se.background={color:"F8FAFC"},se.addShape(w.ShapeType.rect,{x:0,y:0,w:"100%",h:.7,fill:{color:"1E3A8A"}}),se.addShape(w.ShapeType.rect,{x:0,y:.7,w:"100%",h:.04,fill:{color:"D97706"}}),se.addText(u?"Executive Summary & Safety Recommendations":"\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0648\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629",{x:.8,y:.05,w:11.7,h:.6,fontSize:18,bold:!0,color:"FFFFFF",align:u?"left":"right",rtl:!u,fontFace:"Arial"});const Me=Math.round(ue/Math.max(1,Y)*100),Ie=Math.round(fe/Math.max(1,Y)*100);[{title:u?"Resolution Rate":"\u0645\u0639\u062F\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",val:`${Me}%`,sub:u?`${ue} of ${Y} closed`:`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 ${ue} \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A ${Y}`,color:"047857",bg:"D1FAE5"},{title:u?"High Risk Ratio":"\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629",val:`${Ie}%`,sub:u?`${fe} critical items`:`${fe} \u0645\u0644\u0627\u062D\u0638\u0629 \u062A\u062A\u0637\u0644\u0628 \u062A\u0631\u0643\u064A\u0632\u0627\u064B \u0641\u0648\u0631\u064A\u0627\u064B`,color:"B91C1C",bg:"FEE2E2"},{title:u?"Pending Actions":"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",val:`${me}`,sub:u?"Open items in progress":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062C\u0627\u0631\u064A \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u062A\u0635\u062D\u064A\u062D\u0647\u0627",color:"B45309",bg:"FEF3C7"}].forEach((x,v)=>{const $=u?.6+v*4.1:.6+(2-v)*4.1;se.addShape(w.ShapeType.roundRect,{x:$,y:.9,w:3.85,h:1.45,fill:{color:x.bg},line:{color:x.color,width:1.5},rectRadius:.1}),se.addText([{text:x.val+`
`,options:{fontSize:24,bold:!0,color:x.color}},{text:x.title+`
`,options:{fontSize:12,bold:!0,color:"1E293B",rtl:!u}},{text:x.sub,options:{fontSize:10,color:"64748B",rtl:!u}}],{x:$,y:.95,w:3.85,h:1.35,align:"center",valign:"middle",fontFace:"Arial"})});const De={};m.forEach(x=>{const v=x.responsibleDepartment||(u?"Unassigned":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");De[v]=(De[v]||0)+1});const Fe=Object.entries(De).sort((x,v)=>v[1]-x[1]).slice(0,5);se.addShape(w.ShapeType.roundRect,{x:6.8,y:2.5,w:6,h:4.15,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),se.addShape(w.ShapeType.rect,{x:6.8,y:2.5,w:6,h:.38,fill:{color:"1E3A8A"}}),se.addText(u?"Top Responsible Departments":"\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629",{x:6.8,y:2.5,w:6,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const _e=[[{text:u?"Share %":"\u0627\u0644\u0646\u0633\u0628\u0629",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Count":"\u0627\u0644\u0639\u062F\u062F",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"center",rtl:!u}},{text:u?"Department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629",options:{bold:!0,fill:"F1F5F9",color:"1E3A8A",align:"right",rtl:!u}}]];Fe.forEach(([x,v])=>{const $=Math.round(v/Math.max(1,Y)*100);_e.push([{text:`${$}%`,options:{color:"1E3A8A",bold:!0,fontSize:10,align:"center"}},{text:String(v),options:{color:"0F172A",bold:!0,fontSize:10,align:"center"}},{text:x,options:{color:"0F172A",fontSize:10,align:"right",rtl:!u}}])}),se.addTable(_e,{x:6.9,y:2.95,w:5.8,h:3.6,colW:[1.2,1,3.6],fontSize:10,border:{pt:.5,color:"E2E8F0"}}),se.addShape(w.ShapeType.roundRect,{x:.5,y:2.5,w:6,h:4.15,fill:{color:"FFFFFF"},line:{color:"CBD5E1",width:1.5},rectRadius:.08}),se.addShape(w.ShapeType.rect,{x:.5,y:2.5,w:6,h:.38,fill:{color:"059669"}}),se.addText(u?"Executive Safety Recommendations & Action Plan":"\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0648\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629",{x:.5,y:2.5,w:6,h:.38,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",rtl:!u,fontFace:"Arial"});const Ue=u?[{text:"1. Follow up and accelerate closure of open corrective actions ("+me+` items) before target dates.

`,options:{fontSize:10,color:"0F172A",bold:!0}},{text:`2. Prioritize high-risk observations to eliminate potential workplace hazards promptly.

`,options:{fontSize:10,color:"0F172A"}},{text:`3. Increase site safety inspections and toolbox talks in high-frequency observation locations.

`,options:{fontSize:10,color:"0F172A"}},{text:"4. Continuously verify the effectiveness of preventative actions to ensure sustainable compliance.",options:{fontSize:10,color:"0F172A"}}]:[{text:"1. \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u062B\u064A\u062B\u0629 \u0644\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 ("+me+` \u0645\u0644\u0627\u062D\u0638\u0629) \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0639\u0646\u064A\u0629.

`,options:{fontSize:10,color:"0F172A",bold:!0,rtl:!0}},{text:`2. \u0625\u0639\u0637\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0627\u0644\u0642\u0635\u0648\u0649 \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0635\u0646\u0641\u0629 \u0643\u0640 (\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629) \u0644\u0644\u062D\u062F \u0645\u0646 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629.

`,options:{fontSize:10,color:"0F172A",rtl:!0}},{text:`3. \u062A\u0643\u062B\u064A\u0641 \u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634\u064A\u0629 \u0648\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0633\u062C\u064A\u0644\u0627\u064B \u0644\u0644\u062D\u064A\u0648\u062F\u0627\u062A \u0644\u0631\u0641\u0639 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644.

`,options:{fontSize:10,color:"0F172A",rtl:!0}},{text:"4. \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u062F\u0648\u0631\u064A \u0645\u0646 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0627\u0644\u0645\u062A\u062E\u0630\u0629 \u0644\u0636\u0645\u0627\u0646 \u0639\u062F\u0645 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629.",options:{fontSize:10,color:"0F172A",rtl:!0}}];se.addText(Ue,{x:.65,y:2.98,w:5.7,h:3.55,align:u?"left":"right",valign:"top",rtl:!u,fontFace:"Arial"}),se.addShape(w.ShapeType.rect,{x:0,y:6.8,w:"100%",h:.55,fill:{color:"F1F5F9"}}),se.addText(`${q} \u2014 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629`,{x:4,y:6.82,w:8.9,h:.45,fontSize:9,color:"64748B",align:"right",rtl:!u,fontFace:"Arial"}),se.addText(u?`Slide ${m.length+3} of ${m.length+4}`:`\u0634\u0631\u064A\u062D\u0629 ${m.length+3} \u0645\u0646 ${m.length+4}`,{x:.4,y:6.82,w:3.5,h:.45,fontSize:9,color:"64748B",align:"left",fontFace:"Arial"});const we=w.addSlide();we.background={color:"F8FAFC"},we.addShape(w.ShapeType.rect,{x:0,y:0,w:"100%",h:.8,fill:{color:"1E3A8A"}}),we.addShape(w.ShapeType.rect,{x:0,y:.8,w:"100%",h:.04,fill:{color:"D97706"}}),we.addShape(w.ShapeType.roundRect,{x:2,y:1.8,w:9.33,h:3.8,fill:{color:"FFFFFF"},line:{color:"3B82F6",width:2},rectRadius:.15}),we.addText([{text:u?`Thank you for your continuous commitment to Safety Standards

`:`\u0634\u0643\u0631\u0627\u064B \u0644\u0627\u0644\u062A\u0632\u0627\u0645\u0643\u0645 \u0627\u0644\u062F\u0627\u0626\u0645 \u0648\u0627\u0644\u0645\u0633\u062A\u0645\u0631 \u0628\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629

`,options:{fontSize:22,bold:!0,color:"1E3A8A",rtl:!u}},{text:u?`Safety First \u2014 Americana Group
`:`\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0623\u0648\u0644\u0627\u064B \u2014 \u0645\u062C\u0645\u0648\u0639\u0629 \u0623\u0645\u0631\u064A\u0643\u0627\u0646\u0627
`,options:{fontSize:18,bold:!0,color:"D97706",rtl:!u}},{text:u?"Working Together for a Zero-Harm Environment":"\u0646\u0639\u0645\u0644 \u0645\u0639\u0627\u064B \u0645\u0646 \u0623\u062C\u0644 \u0628\u064A\u0626\u0629 \u0639\u0645\u0644 \u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631",options:{fontSize:12.5,color:"64748B",rtl:!u}}],{x:2.1,y:1.9,w:9.13,h:3.6,align:"center",valign:"middle",fontFace:"Arial"}),we.addShape(w.ShapeType.rect,{x:0,y:6.95,w:"100%",h:.55,fill:{color:"1E3A8A"}}),we.addText(`${q} \u2014 HSE Management`,{x:0,y:6.98,w:"100%",h:.48,fontSize:11,bold:!0,color:"FFFFFF",align:"center",valign:"middle",fontFace:"Arial"});const Ne=`Daily_Observations_${L}_${new Date().toISOString().slice(0,10)}.pptx`;await w.writeFile({fileName:Ne}),Notification.success(`\u2705 \u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PPTX \u0628\u0646\u062C\u0627\u062D \u0628\u062A\u0635\u0645\u064A\u0645 \u0645\u0646\u0633\u0642 \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A! (${m.length} \u0645\u0644\u0627\u062D\u0638\u0629)`)}catch(l){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PPT:",l),Notification.error("\u274C \u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PPT: "+(l?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},showPptExportSuccessModal(e,t,i){const s=document.getElementById("ppt-export-success-modal");s&&s.remove();const a=document.createElement("div");a.id="ppt-export-success-modal",a.className="modal-overlay active",a.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const o=e||t||"",n=t||e||"";a.innerHTML=`
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
        `,document.body.appendChild(a);const r=()=>a.remove();if(a.querySelectorAll(".modal-close-btn").forEach(l=>l.addEventListener("click",r)),a.addEventListener("click",l=>{l.target===a&&r()}),o)try{const l=document.createElement("a");l.href=o,l.target="_blank",l.download="",document.body.appendChild(l),l.click(),l.remove()}catch{}},async showPptTemplateIdSetupModal(){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0642\u0627\u0644\u0628 PPT \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=document.createElement("div");e.className="modal-overlay active",e.innerHTML=`
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
        `,document.body.appendChild(e);const t=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",t),e.querySelector("#ppt-template-id-cancel-btn")?.addEventListener("click",t),e.addEventListener("click",i=>{i.target===e&&t()}),(async()=>{try{const i=await GoogleIntegration.sendToAppsScript("getDailyObservationsPptTemplateId",{}),s=e.querySelector("#ppt-template-status-container"),a=e.querySelector("#ppt-template-id-input"),o=e.querySelector("#ppt-template-id-test-btn");i&&i.success&&i.templateId?(a&&(a.value=i.templateId),o&&o.classList.remove("hidden"),s&&(s.className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800",s.innerHTML=`
                            <div>
                                <strong>Template ID \u0627\u0644\u062D\u0627\u0644\u064A:</strong>
                                <span class="font-mono text-xs block text-green-700 mt-1">${Utils.escapeHTML(i.templateId)}</span>
                                ${i.fileName?`<span class="block text-xs mt-1">\u0627\u0644\u0645\u0644\u0641: <strong>${Utils.escapeHTML(i.fileName)}</strong></span>`:""}
                                ${i.fileUrl?`<a href="${Utils.escapeHTML(i.fileUrl)}" target="_blank" class="text-xs text-blue-600 hover:underline mt-1 inline-block">\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641 \u0641\u064A Google Slides</a>`:""}
                            </div>
                        `)):s&&(s.className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600",s.innerHTML='<span><i class="fas fa-info-circle ml-1 text-blue-500"></i>\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0648\u0651\u062D\u062F \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u062D\u0627\u0644\u064A\u0627\u064B (\u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 ID \u062E\u0627\u0635 \u0623\u062F\u0646\u0627\u0647).</span>')}catch{const s=e.querySelector("#ppt-template-status-container");s&&(s.className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600",s.innerHTML='<span><i class="fas fa-info-circle ml-1 text-blue-500"></i>\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0648\u0651\u062D\u062F \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u062D\u0627\u0644\u064A\u0627\u064B.</span>')}})(),e.addEventListener("click",i=>{i.target===e&&t()}),e.querySelector("#ppt-template-id-auto-create-btn")?.addEventListener("click",async()=>{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 Google Slides \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645...");try{const i=await GoogleIntegration.sendToAppsScript("createDefaultDailyObservationsPptTemplate",{});if(Loading.hide(),i&&i.success&&i.templateId){const s=e.querySelector("#ppt-template-id-input");s&&(s.value=i.templateId),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0648\u062A\u0637\u0628\u064A\u0642\u0647 \u0628\u0646\u062C\u0627\u062D!"),i.presentationUrl&&window.open(i.presentationUrl,"_blank"),t()}else Notification.error(i?.message||"\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A")}catch(i){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",i),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}),e.querySelector("#ppt-template-id-save-btn")?.addEventListener("click",async()=>{const s=(e.querySelector("#ppt-template-id-input")?.value||"").trim();if(!s){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 Template ID");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 Template ID...");try{const a=await GoogleIntegration.sendToAppsScript("setDailyObservationsPptTemplateId",{templateId:s});if(Loading.hide(),a&&a.success){Notification.success("\u062A\u0645 \u062D\u0641\u0638 Template ID \u0628\u0646\u062C\u0627\u062D"),t();const o=document.querySelector(".modal-overlay");!o||o.querySelector("#dailyobs-ppt-export-btn")}else Notification.error(a?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID")}catch(a){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 Template ID: "+(a?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}),currentTemplateId&&e.querySelector("#ppt-template-id-test-btn")?.addEventListener("click",async()=>{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template...");try{const i=await GoogleIntegration.sendToAppsScript("getDailyObservationsPptTemplateId",{});Loading.hide(),i&&i.success?Notification.success(`Template \u0635\u062D\u064A\u062D \u0648\u0645\u062A\u0627\u062D: ${i.fileName||i.templateId}`):Notification.error(i?.message||"Template ID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D")}catch(i){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template:",i),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Template: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},resetFormState(){this.state.selectedSiteId="",this.state.selectedSiteName="",this.state.availablePlaces=[],this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!1,this.state.customLocationName="",this.state.currentAttachments=[],this.state.editingId=null,this.state.activeModal=null,this.state.isLoadingPlaces=!1},getAllSites(){const t=(Array.isArray(AppState.appData.observationSites)?AppState.appData.observationSites:[]).map((a,o)=>this.normalizeSite(a,o)).filter(Boolean),i=this.DEFAULT_SITES.map((a,o)=>({id:a.id||this.slugify(`${a.name}-${o}`),name:a.name,places:Array.isArray(a.places)?a.places.map((n,r)=>this.normalizePlace(n,r,a.id||a.name)):[]})),s=[...t];return i.forEach(a=>{s.some(o=>o.id===a.id)||s.push(a)}),s},normalizeSite(e,t=0){if(!e)return null;Array.isArray(e.places)||(e.places=[]);const i=e.id||e.siteId||this.slugify(`${e.name||e.title||"site"}-${t}`),s=e.name||e.title||e.label||"";if(!i||!s)return null;const o=(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((n,r)=>this.normalizePlace(n,r,i)).filter(Boolean);return{id:i,name:s,places:o}},normalizePlace(e,t=0,i=""){if(!e)return null;const s=e.id||e.value||e.placeId||this.slugify(`${i||"site"}-place-${t}`),a=e.name||e.label||e.title||e.placeName||e.locationName||"";return!s||!a?null:{id:s,name:a}},slugify(e){return e?String(e).toLowerCase().trim().replace(/[^a-z0-9\\u0600-\\u06FF\\s-]+/g,"").replace(/\\s+/g,"-"):""},async ensureSheetJS(){if(!(typeof XLSX<"u")){if(this.sheetJsPromise){await this.sheetJsPromise;return}this.sheetJsPromise=new Promise((e,t)=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",i.onerror=()=>{i.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",i.onerror=()=>{Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS"),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 Excel. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."),this.sheetJsPromise=null,t(new Error("Failed to load XLSX library"))}},i.onload=()=>e(),document.head.appendChild(i)}),await this.sheetJsPromise}},normalizeComparisonText(e){return String(e||"").trim().toLowerCase().replace(/\s+/g," ").replace(/[^\u0600-\u06FFA-Za-z0-9\s]/g,"")},findSiteMatch(e){if(!e)return null;const t=this.normalizeComparisonText(e);return this.getAllSites().find(i=>this.normalizeComparisonText(i.name)===t)||null},findPlaceMatch(e,t){if(!e||!t)return null;const i=this.normalizeComparisonText(t);return(e.places||[]).find(s=>this.normalizeComparisonText(s.name)===i)||null},normalizeShiftValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0627\u0644\u0623\u0648\u0644\u0649","\u0627\u0644\u0627\u0648\u0644\u0649","first","shift 1","1","one"].includes(i)?"\u0627\u0644\u0623\u0648\u0644\u0649":["\u0627\u0644\u062B\u0627\u0646\u064A\u0629","second","shift 2","2","two"].includes(i)?"\u0627\u0644\u062B\u0627\u0646\u064A\u0629":["\u0627\u0644\u062B\u0627\u0644\u062B\u0629","third","shift 3","3","three"].includes(i)?"\u0627\u0644\u062B\u0627\u0644\u062B\u0629":t},normalizeRiskLevelValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0645\u0646\u062E\u0641\u0636","\u0645\u0646\u062E\u0641\u0636\u0629","low","l"].includes(i)?"\u0645\u0646\u062E\u0641\u0636":["\u0645\u062A\u0648\u0633\u0637","\u0645\u062A\u0648\u0633\u0637\u0629","medium","moderate","m"].includes(i)?"\u0645\u062A\u0648\u0633\u0637":["\u0639\u0627\u0644\u064A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0631\u062A\u0641\u0639","high","h"].includes(i)?"\u0639\u0627\u0644\u064A":t},normalizeObservationTypeValue(e){const t=String(e||"").trim();if(!t)return"";const i=t.toLowerCase();return["\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646","unsafe condition"].includes(i)?"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646":["\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646","unsafe act"].includes(i)?"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646":["\u0645\u0642\u062A\u0631\u062D","\u0627\u0642\u062A\u0631\u0627\u062D","suggestion","proposal"].includes(i)?"\u0645\u0642\u062A\u0631\u062D":["\u0623\u062E\u0631\u0649","\u0627\u062E\u0631\u0649","other"].includes(i)?"\u0623\u062E\u0631\u0649":t},parseExcelDateValue(e,{isDateOnly:t=!1}={}){if(e==null||e==="")return"";if(e instanceof Date){if(Number.isNaN(e.getTime()))return"";const l=new Date(e);return t&&l.setHours(0,0,0,0),l.toISOString()}const i=l=>String(l||"").replace(/[٠-٩]/g,d=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d))),s=l=>{if(typeof l!="number"||Number.isNaN(l)||l<1||l>6e5)return"";const d=Math.floor(l),c=l-d,p=new Date(1899,11,30),b=new Date(p.getTime()+d*24*60*60*1e3);if(c>0){const f=Math.round(c*24*60*60),g=Math.floor(f/3600),y=Math.floor(f%3600/60),h=f%60;b.setHours(g,y,h,0)}return Number.isNaN(b.getTime())?"":(t&&b.setHours(0,0,0,0),b.toISOString())};if(typeof e=="number"){if(typeof XLSX<"u"&&XLSX.SSF?.parse_date_code){const d=XLSX.SSF.parse_date_code(e);if(d){const c=new Date(d.y,d.m-1,d.d,d.H||0,d.M||0,Math.floor(d.S||0));if(!Number.isNaN(c.getTime()))return t&&c.setHours(0,0,0,0),c.toISOString()}}const l=s(e);if(l)return l;if(e>1e11){const d=new Date(e);if(!Number.isNaN(d.getTime()))return t&&d.setHours(0,0,0,0),d.toISOString()}}const a=String(e).trim();if(!a)return"";const o=i(a);if(/^\d+(\.\d+)?$/.test(o)){const l=Number(o),d=s(l);if(d)return d;if(l>1e11){const c=new Date(l);if(!Number.isNaN(c.getTime()))return t&&c.setHours(0,0,0,0),c.toISOString()}}let n=o.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/);if(n){const l=Number(n[1]),d=Number(n[2]),c=Number(n[3]),p=Number(n[4]||0),b=Number(n[5]||0),f=Number(n[6]||0),g=new Date(l,d-1,c,p,b,f);if(!Number.isNaN(g.getTime()))return t&&g.setHours(0,0,0,0),g.toISOString()}if(n=o.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/),n){const l=Number(n[1]),d=Number(n[2]);let c=Number(n[3]);c<100&&(c+=2e3);let p=l,b=d;l<=12&&d>12&&(b=l,p=d);const f=Number(n[4]||0),g=Number(n[5]||0),y=Number(n[6]||0),h=new Date(c,b-1,p,f,g,y);if(!Number.isNaN(h.getTime()))return t&&h.setHours(0,0,0,0),h.toISOString()}if(n=o.match(/^(\d{1,2})[\s\-\/\.]([A-Za-z]{3,9})[\s\-\/\.](\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*$/),n){const l=Number(n[1]),d=String(n[2]||"").toLowerCase();let c=Number(n[3]);c<100&&(c+=c>=70?1900:2e3);const b={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11}[d];if(b!==void 0){const f=Number(n[4]||0),g=Number(n[5]||0),y=Number(n[6]||0),h=new Date(c,b,l,f,g,y);if(!Number.isNaN(h.getTime()))return t&&h.setHours(0,0,0,0),h.toISOString()}}const r=new Date(o);return Number.isNaN(r.getTime())?"":(t&&r.setHours(0,0,0,0),r.toISOString())},lookupSiteName(e){if(!e)return"";const t=this.getAllSites().find(i=>i.id===e);return t?t.name:""},lookupPlaceName(e,t){if(!e||!t)return"";const i=this.getAllSites().find(a=>a.id===e);if(!i)return"";const s=i.places.find(a=>a.id===t);return s?s.name:""},getPlacesForSiteSync(e){if(!e)return[];const t=this.getAllSites().find(a=>a.id===e);if(t&&Array.isArray(t.places)&&t.places.length>0)return t.places;const s=(Array.isArray(AppState.appData.observationSites)?AppState.appData.observationSites:[]).find(a=>a.id===e||a.siteId===e);return s?(Array.isArray(s.places)?s.places:Array.isArray(s.locations)?s.locations:[]).map((o,n)=>this.normalizePlace(o,n,e)).filter(Boolean):t&&Array.isArray(t.places)?t.places:[]},async fetchPlacesForSite(e){return this.getPlacesForSiteSync(e)},getLoggedInObserverName(){const e=AppState.currentUser||{},t=(e.name||e.fullName||e.displayName||"").toString().trim();if(t)return t;const i=(e.email||"").toString().trim();return i?i.split("@")[0]||i:""},buildObservationOwnerSelectOptionsHtml(e){const t=this.getSafetyTeamMembers(),i=this.getLoggedInObserverName(),s=!e,a=e&&String(e.observerName||"").trim()||"",o=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u2014</option>'];if(s&&i){const r=Utils.escapeHTML(i);o.push(`<option value="${r}" selected data-observer-account="1">\u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (${r})</option>`)}const n=new Set;if(s&&i&&n.add(i.toLowerCase()),t.forEach(r=>{const l=(r.name||"").trim();if(!l)return;const d=l.toLowerCase();if(n.has(d))return;n.add(d);const c=Utils.escapeHTML(l),p=!s&&a===l?" selected":"";o.push(`<option value="${c}"${p}>${c}</option>`)}),!s&&a&&!t.some(r=>(r.name||"").trim()===a)){const r=Utils.escapeHTML(a);o.splice(1,0,`<option value="${r}" selected>${r}</option>`)}return o.join("")},getSiteOptions(){const t=(typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData?.dailyObservations)?AppState.appData.dailyObservations:[]).map(a=>this.normalizeRecord(a)),i=[...new Set(t.map(a=>a.siteName).filter(Boolean))].sort();return(Array.isArray(AppState.sites)?AppState.sites.map(a=>a.name||a):Array.isArray(AppState.appData?.sites)?AppState.appData.sites.map(a=>a.name||a):[]).forEach(a=>{a&&typeof a=="string"&&!i.includes(a.trim())&&i.push(a.trim())}),i.sort()},openBatchLocationQrModal(){const e={},t=(f,g)=>{const y=String(f||"").trim(),h=String(g||"").trim();y&&(e[y]||(e[y]=new Set),h&&e[y].add(h))};try{(this.getAllSites?this.getAllSites():[]).forEach(g=>{const y=g.name||g.siteName;y&&(t(y,""),Array.isArray(g.places)&&g.places.forEach(h=>t(y,h.name||h)))})}catch{}(Array.isArray(AppState.appData?.observationSites)?AppState.appData.observationSites:[]).forEach(f=>{t(f.siteName||f.site||f.name,f.placeName||f.locationName||f.place)}),(Array.isArray(AppState.appData?.subLocations)?AppState.appData.subLocations:[]).forEach(f=>{t(f.factoryName||f.factory||f.siteName||f.site,f.name||f.subLocationName||f.place)}),(Array.isArray(AppState.appData?.dailyObservations)?AppState.appData.dailyObservations:[]).forEach(f=>{t(f.siteName||f.site||f.siteId,f.locationName||f.placeName||f.place||f.placeId)}),(Array.isArray(AppState.sites)?AppState.sites:Array.isArray(AppState.appData?.sites)?AppState.appData.sites:[]).forEach(f=>{t(typeof f=="string"?f:f.name||f.siteName,"")});const i=[];for(const f of Object.keys(e)){const g=Array.from(e[f]);g.length===0?i.push({site:f,place:"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"}):g.forEach(y=>{i.push({site:f,place:y})})}const s=Object.keys(e).sort(),a=[...new Set(i.map(f=>f.place).filter(f=>f!=="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"))].sort(),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 640px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #0b2a55 0%, #1e40af 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #fde68a; font-size: 1.25rem;">
                            <i class="fas fa-print"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639</h2>
                            <p style="font-size: 0.8rem; color: #bfdbfe; margin: 0;">\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0645\u0648\u0642\u0639 \u062A\u0644\u0648 \u0627\u0644\u0622\u062E\u0631</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #bfdbfe; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-info-circle text-blue-600" style="font-size: 20px;"></i>
                        <div style="font-size: 0.85rem; color: #1e3a8a; font-weight: 700;">
                            \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: <span style="font-size: 1rem; color: #dc2626;" id="loc-batch-total-count">${i.length}</span> \u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646
                        </div>
                    </div>

                    <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u062E\u0635\u064A\u0635 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-map-marker-alt text-blue-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639:
                            </label>
                            <select id="loc-batch-site-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u2014</option>
                                ${s.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-tags text-indigo-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0645\u0643\u0627\u0646:
                            </label>
                            <select id="loc-batch-place-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u2014</option>
                                ${a.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-border-all text-indigo-600 ml-1"></i> \u0645\u0642\u0627\u0633 \u0648\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u0644\u0635\u0642\u0627\u062A:
                            </label>
                            <select id="loc-batch-layout-select" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="2x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0642\u064A\u0627\u0633\u064A\u0629 (\u0635\u0641\u064A\u0646 \xD7 4 = 8 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="3x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0645\u062F\u0645\u062C\u0629 (3 \u0623\u0639\u0645\u062F\u0629 \xD7 4 = 12 \u0643\u0627\u0631\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="2x3">\u0643\u0631\u0648\u062A \u0643\u0628\u064A\u0631\u0629 \u0648\u0627\u0636\u062D\u0629 (\u0635\u0641\u064A\u0646 \xD7 3 = 6 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="2x2">\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u0631\u064A\u0636\u0629 (\u0635\u0641\u064A\u0646 \xD7 2 = 4 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calculator text-emerald-600 ml-1"></i> \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629:
                            </label>
                            <div style="padding: 10px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; font-weight: 800; font-size: 0.95rem; color: #047857;" id="loc-batch-selected-preview">
                                ${i.length} \u0645\u0643\u0627\u0646 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" id="loc-batch-print-btn" class="btn-primary" style="padding: 10px 20px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; background: #1e40af;">
                            <i class="fas fa-print"></i> \u0628\u062F\u0621 \u0637\u0628\u0627\u0639\u0629 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0622\u0646 (A4)
                        </button>
                    </div>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                </div>
            </div>
        `,document.body.appendChild(o);const n=o.querySelector("#loc-batch-site-filter"),r=o.querySelector("#loc-batch-place-filter"),l=o.querySelector("#loc-batch-layout-select"),d=o.querySelector("#loc-batch-selected-preview"),c=o.querySelector("#loc-batch-print-btn"),p=()=>{const f=n.value,g=r.value;return i.filter(y=>!(f!=="all"&&y.site!==f||g!=="all"&&y.place!==g))},b=()=>{const f=p();d.textContent=`${f.length} \u0645\u0643\u0627\u0646 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 / \u0627\u0644\u062A\u062D\u0645\u064A\u0644`,c.disabled=f.length===0};n.addEventListener("change",b),r.addEventListener("change",b),c.addEventListener("click",()=>{const f=p();if(f.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u062A\u0635\u0641\u064A\u0629.");return}o.remove(),this.renderLocationQrCardsPrintPage(f,l.value)})},renderLocationQrCardsPrintPage(e,t="2x4"){if(!e||e.length===0)return;let i=2,s="120px",a=100,o="13px",n="11px";t==="3x4"?(i=3,s="110px",a=85,o="11.5px",n="9.5px"):t==="2x3"?(i=2,s="150px",a=125,o="14px",n="12px"):t==="2x2"&&(i=2,s="180px",a=145,o="16px",n="13px");const r=window.location.origin||"",l=window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/")+1),d=`${r}${l}public-observation.html`,c=window.open("","_blank");if(!c){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A QR");return}const p=e.map((b,f)=>{const g=b.site,y=b.place==="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"?"":b.place,h={protocol:"HSE_SAFETY_OFFICER_FIELD_V1",authKey:"HSE_AUTH_KEY_2026_SAFETY_CORP",site:g,place:y||"",issuedAt:Date.now()},S="HSE-LOC-V1:"+btoa(unescape(encodeURIComponent(JSON.stringify(h))));let m="";if(typeof qrcode=="function")try{const k=qrcode(0,"M");k.addData(S),k.make(),m=k.createDataURL(4,2)}catch{}if(!m&&window.QRCode&&typeof window.QRCode.generate=="function")try{m=window.QRCode.generate(S,a)}catch{}return m||(m=`https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&data=${encodeURIComponent(S)}`),`
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-shield-halved"></i> SafetyHub | ICAPP</span>
                        <span class="qr-card-num">#${f+1}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-site">${Utils.escapeHTML(g)}</div>
                            <div class="qr-card-place">${Utils.escapeHTML(y||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645")}</div>
                            <div class="qr-card-inst"><i class="fas fa-camera ml-1"></i> \u0627\u0645\u0633\u062D \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0644\u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u0641\u0648\u0631\u064A\u0629</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${m}" alt="QR ${g}" class="qr-code-img" style="width: ${a}px; height: ${a}px;">
                        </div>
                    </div>
                </div>
            `}).join("");c.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0645\u0644\u0635\u0642\u0627\u062A \u0648\u0643\u0631\u0648\u062A QR \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 (${e.length} \u0645\u0648\u0642\u0639)</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 6mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                    body { font-family: 'Cairo', system-ui, sans-serif; color: #0f172a; margin: 0; padding: 6px; background: #ffffff; }
                    .no-print-bar { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
                    .print-btn { background: #1e40af; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 800; font-family: inherit; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
                    @media print { .no-print-bar { display: none !important; } }
                    
                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(${i}, 1fr);
                        gap: 7mm;
                    }
                    
                    .qr-card {
                        border: 2px dashed #0284c7;
                        border-radius: 10px;
                        padding: 8px 12px;
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: ${s};
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    
                    .qr-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1.5px solid #e2e8f0;
                        padding-bottom: 4px;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-tag {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #0369a1;
                        display: inline-flex;
                        align-items: center;
                        gap: 4px;
                    }
                    
                    .qr-card-num {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #64748b;
                    }
                    
                    .qr-card-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }
                    
                    .qr-card-info {
                        flex: 1;
                    }
                    
                    .qr-card-site {
                        font-size: ${o};
                        font-weight: 900;
                        color: #0f172a;
                        margin-bottom: 2px;
                    }
                    
                    .qr-card-place {
                        font-size: ${n};
                        font-weight: 700;
                        color: #0284c7;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-inst {
                        font-size: 8.5px;
                        color: #64748b;
                        font-weight: 600;
                    }
                    
                    .qr-card-img-wrap {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 3px;
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                    }
                </style>
            </head>
            <body>
                <div class="no-print-bar">
                    <div style="font-weight: 800; font-size: 13px; color: #1e3a8a;">
                        <i class="fas fa-qrcode ml-1"></i> \u0643\u0631\u0648\u062A QR \u0644\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 (${e.length} \u0643\u0627\u0631\u062A \u062C\u0627\u0647\u0632)
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="window.print()" class="print-btn">
                            <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 / \u062D\u0641\u0638 PDF \u0645\u0628\u0627\u0634\u0631
                        </button>
                    </div>
                </div>
                <div class="cards-grid">
                    ${p}
                </div>
            </body>
            </html>
        `),c.document.close()},printLocationQrBadges(){this.openBatchLocationQrModal()},getDepartmentOptions(){return this.getDepartments()},getSafetyTeamMembers(){try{if(typeof Training<"u"&&typeof Training.getSafetyTeamMembers=="function")return Training.getSafetyTeamMembers()}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A getSafetyTeamMembers:",e)}return[]},isSystemManager(){if(!AppState.currentUser)return!1;const e=(AppState.currentUser.role||"").toLowerCase();return e==="admin"||e==="\u0645\u062F\u064A\u0631"},getSystemManagers(){const e=[];return(AppState.appData.users||[]).forEach(t=>{const i=(t.role||"").toLowerCase();if(i==="admin"||i==="\u0645\u062F\u064A\u0631"){const s=t.name||t.fullName||t.email||"";s&&e.push({id:t.id||t.email||s,name:s})}}),e.length>0?e:[{id:"admin",name:AppState.currentUser?.name||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"}]},async handleAttachmentSelection(e,t){if(!(!e||e.length===0)){for(const i of Array.from(e)){if(!this.isSupportedAttachmentType(i.type)){Notification.warning(`\u0635\u064A\u063A\u0629 \u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u0629. \u064A\u0633\u0645\u062D \u0641\u0642\u0637 \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0648 PNG \u0648 PDF.`);continue}if(i.size>this.MAX_ATTACHMENT_SIZE){Notification.warning(`\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (10MB).`);continue}try{const s=await this.convertFileToBase64(i);this.state.currentAttachments.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),size:i.size,data:s})}catch(s){Utils.safeError("Failed to process attachment:",s),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}this.updateAttachmentsPreview(t)}},_observationEditImageThumbHtml(e){const t=this.getObservationAttachmentSrc(e),i=this.resolveObservationDriveFileId(e),s=typeof Utils<"u"&&Utils.IMG_DRIVE_PLACEHOLDER_GIF?Utils.IMG_DRIVE_PLACEHOLDER_GIF:"",a=t&&t.startsWith("data:image/")?t:s,o=i?` data-drive-proxy-id="${Utils.escapeHTML(i)}"`:"",n=Utils.escapeHTML(t||i||"");return`
            <div style="display: inline-block; margin: 0.5rem; text-align: center;">
                <img src="${Utils.escapeHTML(a)}"${o} alt="${Utils.escapeHTML(e.name||"")}" style="max-width: 250px; max-height: 200px; border-radius: 12px; border: 2px solid var(--border-color); cursor: pointer; transition: transform 0.3s ease;" onclick="DailyObservations.viewFullImage(this.currentSrc || '${n}')" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.5rem; text-align: center;">${Utils.escapeHTML(e.name||"")}</p>
            </div>
        `},isSupportedAttachmentType(e=""){return e?["image/jpeg","image/png","application/pdf"].some(t=>e.toLowerCase()===t):!0},updateAttachmentsPreview(e){if(!e)return;if(!Array.isArray(this.state.currentAttachments)||this.state.currentAttachments.length===0){e.innerHTML='<p style="text-align: center; color: var(--text-secondary); font-size: 0.9375rem; padding: 1rem;">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A.</p>';const i=e.closest("form");if(i){const s=i.querySelector("#observation-image-row");s&&s.classList.add("hidden")}return}e.innerHTML=this.state.currentAttachments.map(i=>this.buildAttachmentPreviewCard(i)).join(""),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e);const t=e.closest("form");if(t){const i=t.querySelector("#observation-image-row"),s=t.querySelector("#observation-image-display");if(i&&s){const a=this.state.currentAttachments.filter(o=>this.isObservationPhotoAttachment(o));a.length>0?(i.classList.remove("hidden"),s.innerHTML=a.map(o=>this._observationEditImageThumbHtml(o)).join(""),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s)):i.classList.add("hidden")}}e.querySelectorAll("[data-remove-attachment]").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-remove-attachment");this.state.currentAttachments=this.state.currentAttachments.filter(a=>a.id!==s),this.updateAttachmentsPreview(e)})}),e.querySelectorAll("[data-open-attachment]").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-open-attachment"),a=this.state.currentAttachments.find(o=>o.id===s);a&&a.data&&window.open(a.data,"_blank")})})},buildAttachmentPreviewCard(e){const t=this.isObservationPhotoAttachment(e),i=e.size?`${(e.size/(1024*1024)).toFixed(1)} MB`:"",s=Utils.escapeHTML(e.name||"\u0645\u0631\u0641\u0642 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645"),a=this.getObservationAttachmentSrc(e),o=this.resolveObservationDriveFileId(e),n=typeof Utils<"u"&&Utils.IMG_DRIVE_PLACEHOLDER_GIF?Utils.IMG_DRIVE_PLACEHOLDER_GIF:a,r=a&&a.startsWith("data:image/")?a:n,l=o?` data-drive-proxy-id="${Utils.escapeHTML(o)}"`:"";return t?`
                <div class="attachment-item">
                    <img src="${Utils.escapeHTML(r)}"${l} alt="${s}" class="attachment-image">
                    <button type="button" data-remove-attachment="${e.id}" class="attachment-remove" aria-label="\u062D\u0630\u0641 \u0627\u0644\u0645\u0631\u0641\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                    <div style="padding: 0.75rem; background: var(--bg-secondary); border-top: 2px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                            <span style="font-size: 0.8125rem; color: var(--text-primary); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${s}</span>
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
                    <p style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.25rem 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s}</p>
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
        `},normalizeRecord(e={}){if(!e||typeof e!="object")return{id:"",isoCode:"",siteId:"",siteName:"",placeId:"",locationName:"",observationType:"",date:"",shift:"",details:"",correctiveAction:"",responsibleDepartment:"",riskLevel:"",observerName:"",expectedCompletionDate:"",status:"\u0645\u0641\u062A\u0648\u062D",overdays:0,timestamp:"",reviewedBy:"",remarks:"",attachments:[],afterExecutionImages:[],createdAt:"",updatedAt:"",workflowStage:"",submittedBy:"",submittedByEmail:"",submittedAt:"",specialistReviewedBy:"",specialistReviewedAt:"",specialistComments:"",managerApprovedBy:"",managerApprovedAt:"",managerComments:"",departmentActionBy:"",departmentActionAt:"",rejectionReason:"",assignedToName:"",assignedToEmail:""};const t=e.siteId||e.site||e.locationSiteId||"",i=e.placeId||e.locationId||e.place||"",s=e.locationName||e.placeName||e.location||e.customLocationName||"",a=e.dateTime||e.date||e.observationDate||"",o=e.expectedCompletionDate||e.targetCompletionDate||e.dueDate||"",n=e.details||e.description||e.observationDetails||"";let r=e.attachments||e.files||e.images;if(!r)r=[];else if(typeof r=="string"){const w=r.trim();if(w.startsWith("[")||w.startsWith("{"))try{r=JSON.parse(w)}catch{r=[r]}else r=[r]}else Array.isArray(r)||(r=[r]);const l=this.normalizeObservationTypeValue(e.observationType||e.type||""),d=this.normalizeShiftValue(e.shift||e.workShift||""),c=this.normalizeRiskLevelValue(e.riskLevel||e.risk||""),p=this.normalizeStatus(e.status);let b=e.afterExecutionImages||[];if(typeof b=="string")try{b=JSON.parse(b)}catch{b=[]}else Array.isArray(b)||(b=[b]);const f=this.parseExcelDateValue(a)||"",g=this.parseExcelDateValue(o,{isDateOnly:!0})||"",y=this.parseExcelDateValue(e.createdAt)||"",h=this.parseExcelDateValue(e.updatedAt||e.modifiedAt||e.createdAt)||"",S=this.parseExcelDateValue(e.timestamp||e.createdAt)||y||new Date().toISOString();let m=e.overdays;if(m==null)if(f){const w=new Date(f);Number.isNaN(w.getTime())?m=0:(m=Math.floor((new Date().getTime()-w.getTime())/(1e3*60*60*24)),m<0&&(m=0))}else m=0;const k=e.id||e.observationId||"",T=e.isoCode||e.code||e.obsNumber||e.observationNumber||e.codeNumber||e.serialNumber||"",C=getObservationIsoCodeFromId(k,T,f);return{id:k,isoCode:C,siteId:t,siteName:e.siteName||this.lookupSiteName(t),placeId:i,locationName:s||this.lookupPlaceName(t,i),observationType:l,date:f,shift:d,details:n,correctiveAction:e.correctiveAction||e.preventiveAction||"",responsibleDepartment:e.responsibleDepartment||e.responsible||e.department||"",riskLevel:c,observerName:e.observerName||e.owner||e.supervisor||"",expectedCompletionDate:g,status:p,overdays:m,timestamp:S,reviewedBy:e.reviewedBy||"",remarks:e.remarks||"",attachments:this.normalizeAttachments(r),attachmentCount:Math.max(Number(e.attachmentCount)||0,Array.isArray(r)?r.filter(w=>w&&!w.__listOnly).length:0),afterExecutionImages:b,createdAt:y||S||new Date().toISOString(),updatedAt:h||y||S||new Date().toISOString(),workflowStage:e.workflowStage||"",submittedBy:e.submittedBy||"",submittedByEmail:e.submittedByEmail||"",submittedAt:e.submittedAt||"",specialistReviewedBy:e.specialistReviewedBy||"",specialistReviewedAt:e.specialistReviewedAt||"",specialistComments:e.specialistComments||"",managerApprovedBy:e.managerApprovedBy||"",managerApprovedAt:e.managerApprovedAt||"",managerComments:e.managerComments||"",departmentActionBy:e.departmentActionBy||"",departmentActionAt:e.departmentActionAt||"",rejectionReason:e.rejectionReason||"",assignedToName:e.assignedToName||"",assignedToEmail:e.assignedToEmail||""}},normalizeAttachments(e=[]){return Array.isArray(e)?e.map((t,i)=>this.normalizeAttachment(t,i)).filter(Boolean):e&&typeof e=="object"?[this.normalizeAttachment(e,0)].filter(Boolean):[]},normalizeAttachment(e,t=0){if(!e)return null;if(typeof e=="object"&&e.__listOnly)return{__listOnly:!0};let i="",s="",a="",o=0,n="",r="";if(typeof e=="string"){const l=e.match(/^(.+?)\s*-\s*(https?:\/\/.+)$/);l?(s=l[1].trim(),i=l[2].trim()):(i=e,s=`\u0645\u0631\u0641\u0642-${t+1}`),a=this.detectMimeType(s,i),n=Utils.generateId("ATT"),r=this.resolveObservationDriveFileId(i)}else if(typeof e=="object"){let l=e.data||e.base64||e.url||e.directLink||e.shareableLink||e.driveUrl||e.link||"";const d=typeof l=="string"?l.match(/^(.+?)\s*-\s*(https?:\/\/.+)$/):null;i=d?d[2].trim():l,s=e.name||(d?d[1].trim():"")||`\u0645\u0631\u0641\u0642-${t+1}`,a=e.type||e.mimeType||this.detectMimeType(s,i),o=e.size||e.fileSize||(i?this.calculateBase64Size(i):0),n=e.id||Utils.generateId("ATT"),r=String(e.fileId||e.driveId||"").trim()||this.resolveObservationDriveFileId(e),!i&&r&&(i=r)}return!i&&!r?null:{id:n,name:s,type:a,size:o,data:i,fileId:r||void 0,url:typeof e=="object"&&e.url?e.url:String(i).startsWith("http")?i:void 0}},detectMimeType(e="",t=""){const i=(e||"").toLowerCase();if(i.endsWith(".pdf"))return"application/pdf";if(i.endsWith(".png"))return"image/png";if(i.endsWith(".jpg")||i.endsWith(".jpeg")||i.endsWith(".webp")||i.endsWith(".gif")||/^image[-_]?\d+/i.test(e))return"image/jpeg";if(this.isDataUrl(t)){const s=t.match(/^data:([^;]+);/);if(s&&s[1])return s[1]}return/^FILE_/i.test(t)||/drive\.google|googleusercontent|vercel-storage|\/file\/d\/|[?&]id=/i.test(t)?"image/jpeg":"application/octet-stream"},calculateBase64Size(e=""){if(!e)return 0;const t=e.split(",")[1]||e,i=(t.match(/=+$/)||[""])[0].length;return t.length*3/4-i},isDataUrl(e=""){return typeof e=="string"&&e.startsWith("data:")},formatDateTimeLocal(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const i=t.getTimezoneOffset();return new Date(t.getTime()-i*6e4).toISOString().slice(0,16)},loadPlacesForSite(e,t,i,s,a,o="",n=""){if(t){this.state.isLoadingPlaces=!0;try{const r=this.getPlacesForSiteSync(e);if(this.state.availablePlaces=r,!r||r.length===0){t.innerHTML='<option value="__custom__">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0645\u0627\u0643\u0646 \u0645\u0633\u062C\u0644\u0629 - \u0623\u062F\u062E\u0644 \u0645\u0643\u0627\u0646\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</option>',t.disabled=!1,t.value="__custom__",this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,n&&(s.value=n,this.state.customLocationName=n),i.classList.remove("hidden"),a.classList.remove("hidden");return}const l=['<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646</option>',...r.map(d=>`
                    <option value="${Utils.escapeHTML(d.id)}" data-name="${Utils.escapeHTML(d.name)}">${Utils.escapeHTML(d.name)}</option>
                `),'<option value="__custom__">\u0645\u0643\u0627\u0646 \u0622\u062E\u0631 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)</option>'];if(t.innerHTML=l.join(""),t.disabled=!1,o&&r.some(d=>d.id===o))t.value=o,this.state.selectedPlaceId=o,a.classList.remove("hidden");else if(!o&&n){const d=r.find(c=>c.name===n);d?(t.value=d.id,this.state.selectedPlaceId=d.id,a.classList.remove("hidden")):(t.value="__custom__",s.value=n,i.classList.remove("hidden"),a.classList.remove("hidden"),this.state.customLocationName=n,this.state.isCustomLocationSelected=!0)}}catch(r){Utils.safeError("Failed to load places:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"),t.innerHTML='<option value="__custom__">\u062D\u062F\u062B \u062E\u0637\u0623 - \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A</option>',t.disabled=!1,t.value="__custom__",this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,i.classList.remove("hidden"),a.classList.remove("hidden")}finally{this.state.isLoadingPlaces=!1}}},getRiskBadgeClass(e=""){switch((this.normalizeRiskLevelValue(e)||"").trim()){case"\u0639\u0627\u0644\u064A":return"danger";case"\u0645\u062A\u0648\u0633\u0637":return"warning";case"\u0645\u0646\u062E\u0641\u0636":return"success";default:return"secondary"}},getStatusBadgeClass(e=""){const i=String(e||"").trim().toLowerCase();return["\u0645\u0641\u062A\u0648\u062D","\u0645\u0641\u062A\u0648\u062D\u0629","\u0645\u062A\u0648\u062D\u0629","open","opened"].includes(i)?"warning":["\u062C\u0627\u0631\u064A","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","in progress","ongoing","progress","active"].includes(i)?"info":["\u0645\u063A\u0644\u0642","\u0645\u062D\u0644\u0648\u0644","\u0645\u062D\u0644\u0648\u0644\u0629","\u0645\u0646\u062C\u0632","\u0645\u0643\u062A\u0645\u0644","closed","done","completed","resolved"].includes(i)?"success":"secondary"},normalizeStatus(e=""){const t=String(e||"").trim();if(!t)return"\u0645\u0641\u062A\u0648\u062D";const i=t.toLowerCase();return["\u0645\u0641\u062A\u0648\u062D","\u0645\u0641\u062A\u0648\u062D\u0629","\u0645\u062A\u0648\u062D\u0629","open","opened"].includes(i)?"\u0645\u0641\u062A\u0648\u062D":["\u062C\u0627\u0631\u064A","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","in progress","ongoing","progress","active"].includes(i)?"\u062C\u0627\u0631\u064A":["\u0645\u063A\u0644\u0642","\u0645\u062D\u0644\u0648\u0644","\u0645\u062D\u0644\u0648\u0644\u0629","\u0645\u0646\u062C\u0632","\u0645\u0643\u062A\u0645\u0644","closed","done","completed","resolved"].includes(i)?"\u0645\u063A\u0644\u0642":t},async showForm(e=null){const t=e?this.normalizeRecord(e):null;this.resetFormState(),t&&(this.state.editingId=t.id,this.state.currentAttachments=Array.isArray(t.attachments)?t.attachments.map(h=>Object.assign({},h)):[]);const i=document.createElement("div");i.className="modal-overlay observation-form-overlay",i.innerHTML=`
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
                                        ${this.OBSERVATION_TYPES.map(h=>`
                                            <option value="${Utils.escapeHTML(h.value)}">${Utils.escapeHTML(h.label)}</option>
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
                                        ${this.SHIFTS.map(h=>`
                                            <option value="${Utils.escapeHTML(h)}">${Utils.escapeHTML(h)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label required">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                    <select id="observation-risk" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</option>
                                        ${this.RISK_LEVELS.map(h=>`
                                            <option value="${Utils.escapeHTML(h)}">${Utils.escapeHTML(h)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>

                            <div class="form-grid form-grid-2">
                                <div class="form-group">
                                    <label class="form-label required">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</label>
                                    <select id="observation-responsible" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>
                                        ${this.getDepartmentOptions().map(h=>`
                                            <option value="${Utils.escapeHTML(h)}">${Utils.escapeHTML(h)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label required">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                    <select id="observation-status" class="form-input form-select" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                        ${this.STATUS_OPTIONS.map(h=>`
                                            <option value="${Utils.escapeHTML(h)}">${Utils.escapeHTML(h)}</option>
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
                                        ${this.getSystemManagers().map(h=>`
                                            <option value="${Utils.escapeHTML(h.name||h)}">${Utils.escapeHTML(h.name||h)}</option>
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
        `,document.body.appendChild(i),this.state.activeModal=i;const s=i.querySelector("#observation-form"),a=s.querySelector("#observation-site"),o=s.querySelector("#observation-place"),n=s.querySelector("#custom-location-wrapper"),r=s.querySelector("#custom-location-input"),l=s.querySelector("#observation-attachments"),d=s.querySelector("#observation-attachments-preview"),c=s.querySelector("#observation-step-2"),p=this.getAllSites();if(p.length===0?(a.innerHTML='<option value="">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062A\u0627\u062D\u0629</option>',a.disabled=!0,Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0628\u0639\u062F. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")):(a.innerHTML=['<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>',...p.map(h=>`
                <option value="${Utils.escapeHTML(h.id)}">${Utils.escapeHTML(h.name)}</option>
            `)].join(""),a.disabled=!1),!t){const h=s.querySelector("#observation-timestamp");h&&(h.value=Utils.formatDateTime(new Date().toISOString()))}const b=()=>{const h=s.querySelector("#observation-date"),S=s.querySelector("#observation-overdays");if(h&&S&&h.value){const m=new Date(h.value),T=Math.floor((new Date().getTime()-m.getTime())/(1e3*60*60*24));S.value=T>0?`${T} \u064A\u0648\u0645`:"0 \u064A\u0648\u0645"}};if(t){p.some(C=>C.id===t.siteId)&&(a.value=t.siteId,this.state.selectedSiteId=t.siteId,this.state.selectedSiteName=this.lookupSiteName(t.siteId));const h=s.querySelector("#observation-date");h&&t.date&&(h.value=this.formatDateTimeLocal(t.date),b()),s.querySelector("#observation-type").value=t.observationType||"",s.querySelector("#observation-shift").value=t.shift||"",s.querySelector("#observation-risk").value=t.riskLevel||"",s.querySelector("#observation-responsible").value=t.responsibleDepartment||"",s.querySelector("#observation-status").value=t.status||"";const S=s.querySelector("#observation-owner"),m=String(t.observerName||"").trim();if(S&&m){if(!Array.from(S.options).some(C=>C.value===m)){const C=document.createElement("option");C.value=m,C.textContent=m,S.insertBefore(C,S.children[1]||null)}S.value=m}const k=s.querySelector("#observation-overdays");k&&t.overdays!==void 0&&(k.value=`${t.overdays} \u064A\u0648\u0645`);const T=s.querySelector("#observation-timestamp");if(T&&(T.value=t.timestamp?Utils.formatDateTime(t.timestamp):Utils.formatDateTime(t.createdAt||new Date().toISOString())),this.isSystemManager()){const C=s.querySelector("#observation-reviewed-by");C&&t.reviewedBy&&(C.value=t.reviewedBy);const w=s.querySelector("#observation-remarks");w&&t.remarks&&(w.value=t.remarks)}if(t.expectedCompletionDate){const C=s.querySelector("#observation-expected-date");C&&(C.value=t.expectedCompletionDate.slice(0,10))}if(Array.isArray(t.attachments)&&t.attachments.length>0){this.updateAttachmentsPreview(d);const C=s.querySelector("#observation-image-row"),w=s.querySelector("#observation-image-display");if(C&&w){const u=t.attachments.filter(U=>this.isObservationPhotoAttachment(U));u.length>0&&(C.classList.remove("hidden"),w.innerHTML=u.map(U=>this._observationEditImageThumbHtml(U)).join(""),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(w))}}else d.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A.</p>'}else d.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F.</p>';const f=s.querySelector("#observation-date");f&&(f.addEventListener("change",b),f.addEventListener("input",b)),a.addEventListener("change",h=>{const S=h.target.value;if(this.state.selectedSiteId=S,this.state.selectedSiteName=this.lookupSiteName(S),this.state.selectedPlaceId="",this.state.customLocationName="",this.state.isCustomLocationSelected=!1,r.value="",n.classList.add("hidden"),c.classList.add("hidden"),!S){o.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B</option>',o.disabled=!0;return}this.loadPlacesForSite(S,o,n,r,c)}),o.addEventListener("change",h=>{const S=h.target.value;if(!S){this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!1,n.classList.add("hidden"),r.value="",c.classList.add("hidden");return}if(S==="__custom__"){this.state.selectedPlaceId="",this.state.isCustomLocationSelected=!0,this.state.customLocationName=r.value.trim(),n.classList.remove("hidden"),c.classList.remove("hidden"),r.focus();return}const m=h.target.selectedOptions[0];this.state.selectedPlaceId=S,this.state.isCustomLocationSelected=!1,this.state.customLocationName=m?m.getAttribute("data-name")||m.textContent.trim():"",n.classList.add("hidden"),r.value="",c.classList.remove("hidden")}),l&&l.addEventListener("change",async h=>{await this.handleAttachmentSelection(h.target.files,d),l.value=""});const g=()=>{i.remove(),this.resetFormState()};i.querySelector(".modal-close").addEventListener("click",g),i.querySelector("#cancel-observation-btn").addEventListener("click",g);const y=i.querySelector("#save-observation-btn");y.addEventListener("click",async()=>{if(y&&y.disabled){Notification.warning("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631");return}let h="";y&&(h=y.innerHTML,y.disabled=!0,y.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{await this.handleSubmit(s,t?.id||null,i),y&&(y.disabled=!1,y.innerHTML=h)}catch(S){throw y&&(y.disabled=!1,y.innerHTML=h),S}}),i.addEventListener("click",h=>{h.target===i&&g()}),t&&t.siteId&&(this.loadPlacesForSite(t.siteId,o,n,r,c,t.placeId,t.locationName),t.placeId?(o.value=t.placeId,o.dispatchEvent(new Event("change"))):t.locationName&&(o.value="__custom__",n.classList.remove("hidden"),r.value=t.locationName,this.state.customLocationName=t.locationName,this.state.isCustomLocationSelected=!0,c.classList.remove("hidden")))},async handleSubmit(e,t=null,i){if(!e)return;const s=e.querySelector("#observation-site"),a=e.querySelector("#observation-place"),o=e.querySelector("#custom-location-input"),n=e.querySelector("#observation-type"),r=e.querySelector("#observation-date"),l=e.querySelector("#observation-shift"),d=e.querySelector("#observation-risk"),c=e.querySelector("#observation-responsible"),p=e.querySelector("#observation-status"),b=e.querySelector("#observation-owner"),f=e.querySelector("#observation-expected-date"),g=e.querySelector("#observation-details"),y=e.querySelector("#observation-corrective"),h=e.querySelector("#observation-overdays"),S=e.querySelector("#observation-timestamp"),m=e.querySelector("#observation-reviewed-by"),k=e.querySelector("#observation-remarks"),T=s?.value||"";if(!T){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0642\u0639.");return}let C="",w="";if(!a){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639.");return}const u=a.value;if(!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639.");return}if(u==="__custom__"){if(C=(o?.value||"").trim(),!C){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646."),o?.focus();return}w=""}else{w=u;const R=a.selectedOptions[0];C=R?R.getAttribute("data-name")||R.textContent.trim():""}const U=n?.value||"";if(!U){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629.");return}const L=(g?.value||"").trim();if(!L){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629.");return}const F=c?.value||"";if(!F){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.");return}const q=d?.value||"";if(!q){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629.");return}let V=(p?.value||"").trim();if(!t)V="\u0645\u0641\u062A\u0648\u062D";else if(!V){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u0629.");return}const A=r?.value||"";if(!A){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0648\u0642\u062A\u0647\u0627.");return}const _=Utils.dateTimeLocalToISO(A),j=_?new Date(_):new Date(A);if(Number.isNaN(j.getTime())){Notification.warning("\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D.");return}const X=f?.value||"";let le="";if(X){const R=new Date(X);if(Number.isNaN(R.getTime())){Notification.warning("\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D.");return}le=new Date(X).toISOString()}const J=new Date().toISOString(),D=t?AppState.appData.dailyObservations.find(R=>R.id===t):null,z=AppState.currentUser||{},ie=(b?.value||"").trim()||(t?String(D?.observerName||"").trim():"")||this.getLoggedInObserverName()||"";if(!ie){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (\u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0633\u0627\u0628\u0643).");return}let O=t,I="";if(t)I=D?.isoCode||getObservationIsoCodeFromId(O);else{const R=await getNextObservationIdFromBackend();R&&R.id?(O=R.id,I=R.isoCode||getObservationIsoCodeFromId(O)):(O=generateDailyObservationId(AppState.appData.dailyObservations||[]),I=getObservationIsoCodeFromId(O))}const W=j,N=Math.floor((new Date().getTime()-W.getTime())/(1e3*60*60*24)),M=N>0?N:0,Y=D?.timestamp||J,me=this.isSystemManager()&&m?m.value||"":D?.reviewedBy||"",ue=this.isSystemManager()&&k?(k.value||"").trim():D?.remarks||"";let fe=(this.state.currentAttachments||[]).map(R=>({id:R.id,name:R.name,type:R.type,size:R.size||this.calculateBase64Size(R.data),data:R.data}));const ve={id:O,isoCode:I,siteId:T,siteName:this.lookupSiteName(T),placeId:w,locationName:C,observationType:U,date:j.toISOString(),shift:l?.value||"",details:L,correctiveAction:(y?.value||"").trim(),responsibleDepartment:F,riskLevel:q,observerName:ie,expectedCompletionDate:le,status:V,overdays:M,timestamp:Y,reviewedBy:me,remarks:ue,attachments:fe,createdAt:D?.createdAt||J,updatedAt:J,workflowStage:t&&D?.workflowStage||"pending_specialist",submittedBy:t?D?.submittedBy||"":(z.name||"").trim()||ie,submittedByEmail:t?D?.submittedByEmail||"":(z.email||"").trim(),submittedAt:t&&D?.submittedAt||J,specialistReviewedBy:t&&D?.specialistReviewedBy||"",specialistReviewedAt:t&&D?.specialistReviewedAt||"",specialistComments:t&&D?.specialistComments||"",managerApprovedBy:t&&D?.managerApprovedBy||"",managerApprovedAt:t&&D?.managerApprovedAt||"",managerComments:t&&D?.managerComments||"",departmentActionBy:t&&D?.departmentActionBy||"",departmentActionAt:t&&D?.departmentActionAt||"",rejectionReason:t&&D?.rejectionReason||""},ge=i.querySelector("#save-observation-btn");ge&&(ge.disabled=!0,ge.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const R=this.normalizeRecord(ve);if(t){const K=AppState.appData.dailyObservations.findIndex(be=>be.id===t);K!==-1&&(AppState.appData.dailyObservations[K]=R)}else AppState.appData.dailyObservations.push(R);i.remove(),this.resetFormState(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D");const E=this.currentFilter?.filter||null;if(this.loadObservationsList(E),this.isCurrentUserAdmin()){const K=document.getElementById("tab-data-analysis");K&&K.style.display!=="none"&&(this.calculateCardValues(),this.updateAnalysisResults())}this.saveInBackground(ve,R,t).catch(K=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",K),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")})}catch(R){ge&&(ge.disabled=!1,ge.innerHTML="\u062D\u0641\u0638"),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",R),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+R.message)}},async saveInBackground(e,t,i){try{let s=!1;if(e.attachments&&Array.isArray(e.attachments)&&e.attachments.length>0){Loading.show("\u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0625\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645...");try{Utils.safeLog("DailyObservations: \u0642\u0628\u0644 processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+e.attachments.length),e.attachments.length>0&&Utils.safeLog("DailyObservations: \u0623\u0648\u0644 \u0645\u0631\u0641\u0642 \u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:",{name:e.attachments[0].name,hasData:!!e.attachments[0].data,hasDirectLink:!!e.attachments[0].directLink});const a=await GoogleIntegration.processAttachments?.(e.attachments,"DailyObservations");if(a&&a.length>0){t.attachments=a;const o=AppState.appData.dailyObservations.findIndex(n=>n.id===t.id);o!==-1&&(AppState.appData.dailyObservations[o].attachments=a,s=!0,Utils.safeLog("DailyObservations: \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u062C\u0644 - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+a.length),a.forEach((n,r)=>{const l=n.directLink||n.shareableLink;Utils.safeLog(`DailyObservations: \u0627\u0644\u0645\u0631\u0641\u0642 ${r+1}: ${n.name} - \u0631\u0627\u0628\u0637: ${l?l.substring(0,60)+"...":"\u0644\u0627 \u064A\u0648\u062C\u062F \u0631\u0627\u0628\u0637!"}`)}))}Utils.safeLog("DailyObservations: \u0628\u0639\u062F processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+(a?.length||0))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",a),Notification.warning("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A - \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B")}finally{Loading.hide()}}try{typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?window.DataManager.save():typeof DataManager<"u"&&typeof DataManager.save=="function"?DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",a)}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...");try{await GoogleIntegration.autoSave("DailyObservations",AppState.appData.dailyObservations),!i&&t?.id&&GoogleIntegration.callBackend("notifyObservationWorkflowEvent",{event:"new_pending_specialist",observationId:t.id}).catch(function(){}),s&&(Utils.safeLog("DailyObservations: \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062B\u0629 \u0625\u0644\u0649 \u0642\u0627\u0639\u062F\u0629 SQL"),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0646\u062C\u0627\u062D"))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",a),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL - \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B")}finally{Loading.hide()}if(!i&&AppState.notificationEmails&&AppState.notificationEmails.length>0)try{this.sendEmailNotifications({type:"\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629",title:`\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u062C\u062F\u064A\u062F\u0629: ${t.observationType}`,message:`\u0627\u0644\u0645\u0648\u0642\u0639: ${t.siteName}
\u0627\u0644\u0645\u0643\u0627\u0646: ${t.locationName}
\u0627\u0644\u0646\u0648\u0639: ${t.observationType}
\u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${t.riskLevel}
\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644: ${t.details?.substring(0,120)}...`,date:Utils.formatDateTime(t.date)})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",a)}}catch(s){throw Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s),s}},async viewObservation(e){const t=AppState.appData.dailyObservations.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(typeof this.isDailyObservationVisibleToCurrentUser=="function"&&!this.isDailyObservationVisibleToCurrentUser(t)){Notification.error("\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629");return}const i=this.normalizeRecord(t);Utils.safeLog("\u{1F4CE} viewObservation: \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 = "+(i.attachments?.length||0)),Utils.safeLog("\u{1F4CE} viewObservation: \u0639\u062F\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 = "+(i.afterExecutionImages?.length||0));const s=this.createObservationModal(i);document.body.appendChild(s),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"daily-observations",record:i,recordId:i.id||i.isoCode||""}),this.attachWorkflowPanelListeners(s),this.updateObservationDataFromBackend(e,s).catch(a=>{Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 Backend:",a)})},createObservationModal(e){let t=[],i=[],s=[];try{e.timeLog&&(t=typeof e.timeLog=="string"?JSON.parse(e.timeLog):e.timeLog)}catch{t=[]}try{e.updates&&(i=typeof e.updates=="string"?JSON.parse(e.updates):e.updates)}catch{i=[]}try{e.comments&&(s=typeof e.comments=="string"?JSON.parse(e.comments):e.comments)}catch{s=[]}const a=this.buildWorkflowPathHtml(e),o=this.buildWorkflowBannerHtml(e),n=document.createElement("div");n.className="modal-overlay",n.setAttribute("data-observation-id",e.id),n.setAttribute("dir","rtl"),n.innerHTML=`
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
                        ${a}
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
                                    ${this.getObservationTypes().map(l=>`<option value="${l}" ${e.observationType===l?"selected":""}>${l}</option>`).join("")}
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
                                    ${this.getRiskLevels().map(l=>`<option value="${l}" ${e.riskLevel===l?"selected":""}>${l}</option>`).join("")}
                                </select>
                                `:`<span class="text-gray-900">${Utils.escapeHTML(e.riskLevel||"-")}</span>`}
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <strong class="text-gray-700 block mb-1">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629:</strong>
                                <div class="flex items-center gap-2 mt-2">
                                    ${this.canEditObservationStatusInDetail(e)?`
                                    <select id="observation-status-select" class="form-input" style="flex: 1; min-width: 150px;" onchange="DailyObservations.handleStatusChange('${e.id}', this.value)">
                                        ${this.STATUS_OPTIONS.map(l=>`<option value="${l}" ${e.status===l?"selected":""}>${l}</option>`).join("")}
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
                                    ${this.getDepartments().map(l=>{const d=String(e.responsibleDepartment||"").trim().toLowerCase(),c=l.toLowerCase(),p=d===c||l.includes("\u0645\u0633\u062A\u0648\u062F\u0639")&&(d.includes("\u0645\u062E\u0627\u0632\u0646")||d.includes("\u0645\u0633\u062A\u0648\u062F\u0639"))||l.includes("\u0635\u064A\u0627\u0646\u0629")&&d.includes("\u0635\u064A\u0627\u0646\u0629")||l.includes("\u0633\u0644\u0627\u0645\u0629")&&(d.includes("\u0633\u0644\u0627\u0645\u0629")||d==="hse"||d.includes("quality, health"))||l.includes("\u0625\u0646\u062A\u0627\u062C")&&(d.includes("\u0627\u0646\u062A\u0627\u062C")||d.includes("\u0625\u0646\u062A\u0627\u062C")||d.includes("\u062A\u0635\u0646\u064A\u0639")||d.includes("\u062A\u0639\u0628\u0626\u0629"))||l.includes("\u062C\u0648\u062F\u0629")&&d.includes("\u062C\u0648\u062F\u0629")||l.includes("\u0645\u0634\u0631\u0648\u0639\u0627\u062A")&&(d.includes("project")||d.includes("\u0645\u0634\u0627\u0631\u064A\u0639")||d.includes("\u0647\u0646\u062F\u0633"));return`<option value="${l}" ${p?"selected":""}>${l}</option>`}).join("")}
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

                        ${this._observationPhotoSectionHtml(e)}

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
                                    ${i.map(l=>`
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
                            `:'<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>'}
                        </div>
                        
                        <!-- \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A -->
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold"><i class="fas fa-comments ml-2"></i>\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${s.length})</h3>
                                <button class="btn-primary btn-sm" onclick="DailyObservations.showAddCommentModal('${e.id}')">
                                    <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642
                                </button>
                            </div>
                            ${s.length>0?`
                                <div class="space-y-3">
                                    ${s.map(l=>`
                                        <div class="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                                            <div class="flex items-center justify-between">
                                                <span class="text-sm font-semibold">${Utils.escapeHTML(l.user||"")}</span>
                                                <span class="text-xs text-gray-500">${l.timestamp?Utils.formatDate(l.timestamp):""}</span>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(l.comment||"")}</p>
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
                    ${this.canCloseObservationQuick(e)?`
                    <button type="button" class="btn-primary obs-detail-quick-close" data-oid="${Utils.escapeHTML(String(e.id||""))}" style="margin: 0 5px; background:#4f46e5; border:none;">
                        <i class="fas fa-flag-checkered ml-2"></i>${Utils.escapeHTML(this._t("module.dailyobs.close.quick","\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"))}
                    </button>`:""}
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("daily-observations"):""}
                    <button type="button" onclick="DailyObservations.shareViaWhatsApp('${e.id}');" class="btn-secondary" style="margin: 0 5px; background: #22c55e; color: #ffffff; border-color: #16a34a;">
                        <i class="fab fa-whatsapp ml-2"></i>\u0645\u0634\u0627\u0631\u0643\u0629 \u0648\u0627\u062A\u0633\u0627\u0628
                    </button>
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
        `,n.querySelector(".modal-close").addEventListener("click",()=>n.remove()),n.addEventListener("click",l=>{l.target===n&&n.remove()});const r=n.querySelector(".obs-detail-quick-close");return r&&r.addEventListener("click",()=>{if(r.disabled)return;r.disabled=!0;const l=r.getAttribute("data-oid");this.closeObservationQuick(l,{silent:!1}).then(d=>{d&&d.success||(r.disabled=!1,Notification.error(d&&d.message||this._t("module.dailyobs.close.failed","\u0641\u0634\u0644 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")))})}),n},async updateObservationDataFromBackend(e,t){try{const i=typeof this.buildObservationsRequestContext=="function"?this.buildObservationsRequestContext():null,s=await GoogleIntegration.callBackend("getObservation",{observationId:e,observationsRequestContext:i});if(s.success&&s.data){const a=this.normalizeRecord(s.data),o=this.slimObservationForList(a),n=AppState.appData.dailyObservations.findIndex(r=>r.id===e);n!==-1?AppState.appData.dailyObservations[n]={...AppState.appData.dailyObservations[n],...o}:AppState.appData.dailyObservations.push(o),Utils.safeLog("\u{1F4CE} updateObservationDataFromBackend: \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0645\u0646 Backend = "+(a.attachments?.length||0)),Utils.safeLog("\u{1F4CE} updateObservationDataFromBackend: \u0639\u062F\u062F \u0635\u0648\u0631 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 = "+(a.afterExecutionImages?.length||0)),t&&t.getAttribute("data-observation-id")===e&&(this.updateObservationModalContent(t,a),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t))}else s&&!s.success&&s.message&&this.showObservationDetailInlineAlert(e,"warning",s.message)}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 Backend:",i);const s=i&&i.message?i.message:String(i);this.showObservationDetailInlineAlert(e,"error",s)}},updateObservationModalContent(e,t){try{const i=(s,a)=>{const o=e.querySelector(s);o&&a!==void 0&&a!==null&&(o.textContent=String(a))};if(i('[data-field="isoCode"]',t.isoCode),i('[data-field="siteName"]',t.siteName),i('[data-field="locationName"]',t.locationName),i('[data-field="observationType"]',t.observationType),i('[data-field="shift"]',t.shift),i('[data-field="riskLevel"]',t.riskLevel),i('[data-field="status"]',t.status),i('[data-field="responsibleDepartment"]',t.responsibleDepartment),i('[data-field="observerName"]',t.observerName),i('[data-field="expectedCompletionDate"]',t.expectedCompletionDate?Utils.formatDate(t.expectedCompletionDate):"-"),i('[data-field="overdays"]',t.overdays!==void 0?`${t.overdays} \u064A\u0648\u0645`:"-"),i('[data-field="details"]',t.details),i('[data-field="correctiveAction"]',t.correctiveAction),this._syncObservationModalPhotos(e,t),t.afterExecutionImages&&Array.isArray(t.afterExecutionImages)){const s=e.querySelector(`#after-execution-photos-container-${t.id}`);s&&(s.innerHTML=this._buildAfterExecutionPhotosHtml(t.afterExecutionImages))}typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e),this.updateModalSection(e,"updates",t.updates),this.updateModalSection(e,"comments",t.comments),this.updateModalSection(e,"timeLog",t.timeLog)}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A updateObservationModalContent:",i)}},updateModalSection(e,t,i){},async handleStatusChange(e,t){Loading.show();try{const i=await GoogleIntegration.callBackend("updateObservationStatus",{observationId:e,statusData:{status:t,updatedBy:AppState.currentUser?.name||"System"}});if(i.success){const s=AppState.appData.dailyObservations.findIndex(o=>o.id===e);s!==-1&&(AppState.appData.dailyObservations[s].status=t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0628\u0646\u062C\u0627\u062D"),t==="\u0645\u063A\u0644\u0642"&&s!==-1&&(AppState.appData.dailyObservations[s].workflowStage="closed");const a=document.querySelector('.modal-overlay[data-observation-id="'+e+'"]');if(a){const o=a.querySelector("#observation-status-select");o&&(o.value=t),a.querySelectorAll(".badge").forEach(n=>{n.closest(".modal-body")&&/مفتوح|جاري|مغلق/.test(n.textContent||"")&&(n.className="badge badge-"+this.getStatusBadgeClass(t),n.textContent=t)})}}else{const s=i.message||"\u062D\u062F\u062B \u062E\u0637\u0623";this.showObservationDetailInlineAlert(e,"error",s)||Notification.error(s)}}catch(i){const s="\u062D\u062F\u062B \u062E\u0637\u0623: "+(i.message||i);this.showObservationDetailInlineAlert(e,"error",s)||Notification.error(s)}finally{Loading.hide()}},refreshUpdatesSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const c=d.querySelector(".modal-title");if(c&&c.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const s=i.querySelectorAll(".bg-white.p-5");let a=null;for(const d of s){const c=d.querySelector("h3");if(c&&c.textContent.includes("\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A")){a=d;break}}if(!a)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;let n=[];try{o.updates&&(n=Array.isArray(o.updates)?o.updates:typeof o.updates=="string"?JSON.parse(o.updates):[])}catch{n=[]}const r=a.querySelector("h3");r&&(r.innerHTML=`<i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A (${n.length})`);let l=a.querySelector(".space-y-3");if(l||(l=a.querySelector("p.text-gray-500")),n.length>0){const d=`
                    <div class="space-y-3">
                        ${n.map(c=>`
                            <div class="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-semibold">${Utils.escapeHTML(c.user||"")}</span>
                                    <span class="text-xs text-gray-500">${c.timestamp?Utils.formatDate(c.timestamp):""}</span>
                                </div>
                                <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(c.update||"")}</p>
                                ${c.progress!==void 0?`
                                    <div class="mt-2">
                                        <div class="flex items-center justify-between text-xs mb-1">
                                            <span>\u0627\u0644\u062A\u0642\u062F\u0645</span>
                                            <span>${c.progress}%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${c.progress}%"></div>
                                        </div>
                                    </div>
                                `:""}
                            </div>
                        `).join("")}
                    </div>
                `;if(l)l.tagName==="P"?l.outerHTML=d:l.innerHTML=d;else{const c=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(c){const p=document.createElement("div");p.innerHTML=d,c.insertAdjacentElement("afterend",p)}}}else if(l)l.tagName==="P"?(l.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A",l.className="text-gray-500 text-sm"):l.innerHTML='<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A</p>';else{const d=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(d){const c=document.createElement("p");c.className="text-gray-500 text-sm",c.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A",d.insertAdjacentElement("afterend",c)}}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A:",t)}},refreshCommentsSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const c=d.querySelector(".modal-title");if(c&&c.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const s=i.querySelectorAll(".bg-white.p-5");let a=null;for(const d of s){const c=d.querySelector("h3");if(c&&c.textContent.includes("\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A")){a=d;break}}if(!a)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;let n=[];try{o.comments&&(n=Array.isArray(o.comments)?o.comments:typeof o.comments=="string"?JSON.parse(o.comments):[])}catch{n=[]}const r=a.querySelector("h3");r&&(r.innerHTML=`<i class="fas fa-comments ml-2"></i>\u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A (${n.length})`);let l=a.querySelector(".space-y-3");if(l||(l=a.querySelector("p.text-gray-500")),n.length>0){const d=`
                    <div class="space-y-3">
                        ${n.map(c=>`
                            <div class="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-semibold">${Utils.escapeHTML(c.user||"")}</span>
                                    <span class="text-xs text-gray-500">${c.timestamp?Utils.formatDate(c.timestamp):""}</span>
                                </div>
                                <p class="text-sm text-gray-700 mt-1">${Utils.escapeHTML(c.comment||"")}</p>
                            </div>
                        `).join("")}
                    </div>
                `;if(l)l.tagName==="P"?l.outerHTML=d:l.innerHTML=d;else{const c=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(c){const p=document.createElement("div");p.innerHTML=d,c.insertAdjacentElement("afterend",p)}}}else if(l)l.tagName==="P"?(l.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A",l.className="text-gray-500 text-sm"):l.innerHTML='<p class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A</p>';else{const d=r?.closest(".flex.items-center.justify-between")||r?.parentElement;if(d){const c=document.createElement("p");c.className="text-gray-500 text-sm",c.textContent="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642\u0627\u062A",d.insertAdjacentElement("afterend",c)}}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A:",t)}},refreshTimeLogSection(e){try{const t=document.querySelectorAll(".modal-overlay");let i=null;for(const d of t){const c=d.querySelector(".modal-title");if(c&&c.textContent.includes("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")){i=d;break}}if(!i)return;const s=i.querySelectorAll(".bg-white.p-5");let a=null;for(const d of s){const c=d.querySelector("h3");if(c&&c.textContent.includes("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A")){a=d;break}}if(!a)return;const o=AppState.appData.dailyObservations.find(d=>d.id===e);if(!o)return;const n=this.buildObservationTimelineHtml(o.timeLog),r=a.querySelector("h3"),l=r?r.nextElementSibling:null;l?l.outerHTML=n:r&&r.insertAdjacentHTML("afterend",n)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0632\u0645\u0646\u064A:",t)}},async showAddUpdateModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t),t.querySelector("#update-form").addEventListener("submit",async i=>{i.preventDefault();const s=t.querySelector("#update-text").value.trim(),a=parseInt(t.querySelector("#update-progress").value)||0;if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B");return}t.remove();const o=AppState.appData.dailyObservations.findIndex(c=>c.id===e);if(o===-1){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const n=AppState.appData.dailyObservations[o],r={id:"UPD-"+Date.now().toString(),user:AppState.currentUser?.name||"System",update:s,progress:a,timestamp:new Date().toISOString()};let l=[];try{n.updates&&(l=typeof n.updates=="string"?JSON.parse(n.updates):n.updates)}catch{l=[]}l.push(r),n.updates=l;let d=[];try{n.timeLog&&(d=typeof n.timeLog=="string"?JSON.parse(n.timeLog):n.timeLog)}catch{d=[]}d.push({action:"update_added",user:AppState.currentUser?.name||"System",timestamp:new Date().toISOString(),roleLabel:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0641\u064A\u0630",actionDetail:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0639\u0644\u0649 \u0633\u064A\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630",note:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0641\u064A\u0630: \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0639\u0644\u0649 \u0633\u064A\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}),n.timeLog=d,n.updatedAt=new Date().toISOString(),this.refreshUpdatesSection(e),this.refreshTimeLogSection(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.callBackend("addObservationUpdate",{observationId:e,user:AppState.currentUser?.name||"System",update:s,progress:a}).catch(c=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",c),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u0646\u062C\u0627\u062D")}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async showAddCommentModal(e){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t),t.querySelector("#comment-form").addEventListener("submit",async i=>{i.preventDefault();const s=t.querySelector("#comment-text").value.trim();if(!s){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0642");return}t.remove();const a=AppState.appData.dailyObservations.findIndex(d=>d.id===e);if(a===-1){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const o=AppState.appData.dailyObservations[a],n={id:"CMT-"+Date.now().toString(),user:AppState.currentUser?.name||"System",comment:s,timestamp:new Date().toISOString()};let r=[];try{o.comments&&(r=typeof o.comments=="string"?JSON.parse(o.comments):o.comments)}catch{r=[]}r.push(n),o.comments=r;let l=[];try{o.timeLog&&(l=typeof o.timeLog=="string"?JSON.parse(o.timeLog):o.timeLog)}catch{l=[]}l.push({action:"comment_added",user:AppState.currentUser?.name||"System",timestamp:new Date().toISOString(),roleLabel:"\u062A\u0639\u0644\u064A\u0642",actionDetail:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",note:"\u062A\u0639\u0644\u064A\u0642: \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"}),o.timeLog=l,o.updatedAt=new Date().toISOString(),this.refreshCommentsSection(e),this.refreshTimeLogSection(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.callBackend("addObservationComment",{observationId:e,user:AppState.currentUser?.name||"System",comment:s}).catch(d=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",d),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629")}),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D")}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async deleteObservation(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!this.canDailyObservationsFullAdminUi()){Notification.error("\u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}if(!AppState.appData.dailyObservations.find(s=>s.id===e)){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`))try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){Notification.error("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");return}const s=await GoogleIntegration.sendRequest({action:"deleteObservation",data:{observationId:e}});s&&s.success?(AppState.appData.dailyObservations=AppState.appData.dailyObservations.filter(a=>a.id!==e),typeof DataManager<"u"&&typeof DataManager.save=="function"&&await DataManager.save(),this.loadObservationsList(),this.renderStatsCards(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D")):Notification.error(s?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:",s);const a=s?.message||s?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629: "+a)}},async deleteAllObservations(){if(!this.canDailyObservationsFullAdminUi()){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=(Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[]).length;if(t===0){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0644\u0644\u062D\u0630\u0641");return}if(!(!confirm(`\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0623\u0646\u062A \u0639\u0644\u0649 \u0648\u0634\u0643 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A!

\u0639\u062F\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u064A \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647\u0627: ${t}

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.

\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u062A\u0645\u0627\u0645\u0627\u064B \u0645\u0646 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u061F`)||!confirm(`\u26A0\uFE0F \u062A\u0623\u0643\u064A\u062F \u0646\u0647\u0627\u0626\u064A:

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 ${t} \u0645\u0644\u0627\u062D\u0638\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B.

\u0627\u0636\u063A\u0637 "\u0645\u0648\u0627\u0641\u0642" \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0623\u0648 "\u0625\u0644\u063A\u0627\u0621" \u0644\u0644\u0625\u0644\u063A\u0627\u0621.`)))try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){Notification.error("\u064A\u062C\u0628 \u062A\u0641\u0639\u064A\u0644 Google Integration \u0623\u0648\u0644\u0627\u064B");return}const a=await GoogleIntegration.sendRequest({action:"deleteAllObservations",data:{}});a&&a.success?(AppState.appData.dailyObservations=[],typeof DataManager<"u"&&typeof DataManager.save=="function"&&await DataManager.save(),this.loadObservationsList(),this.renderStatsCards(),Notification.success(`\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0628\u0646\u062C\u0627\u062D (${t} \u0645\u0644\u0627\u062D\u0638\u0629)`)):Notification.error(a?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",a);const o=a?.message||a?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A: "+o)}},async sendEmailNotifications(e){if(typeof EmailDispatch<"u"&&await EmailDispatch.ensureCanManualSend("daily-observations")){const i=e&&typeof e=="object"?e:{};EmailDispatch.openSendModal({moduleKey:"daily-observations",recordId:i.id||i.isoCode||"",title:EmailDispatch.getModuleLabel("daily-observations"),fields:EmailDispatch.fieldsFromRecord("daily-observations",i)});return}typeof Notification<"u"&&Notification.warning("\u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646 \u0634\u0627\u0634\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629\u060C \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F.")},showExportExcelModal(){const e=document.createElement("div");e.className="modal-overlay active",e.style.cssText="position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); animation: fadeIn 0.2s ease;";const t=this.getDepartmentOptions(),i=this.getSiteOptions();e.innerHTML=`
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
                                ${i.map(a=>`<option value="${Utils.escapeHTML(a)}">${Utils.escapeHTML(a)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                            <select id="dailyobs-excel-department" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 13px; color: #0f172a; background: #ffffff; outline: none;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                                ${t.map(a=>`<option value="${Utils.escapeHTML(a)}">${Utils.escapeHTML(a)}</option>`).join("")}
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
        `,document.body.appendChild(e);const s=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",s),e.querySelector("#dailyobs-excel-cancel-btn")?.addEventListener("click",s),e.addEventListener("click",a=>{a.target===e&&s()}),e.querySelector("#dailyobs-excel-export-btn")?.addEventListener("click",async()=>{const a=e.querySelector("#dailyobs-excel-status")?.value||"all",o=(e.querySelector("#dailyobs-excel-site")?.value||"").trim(),n=(e.querySelector("#dailyobs-excel-department")?.value||"").trim(),r=e.querySelector("#dailyobs-excel-from-date")?.value||"",l=e.querySelector("#dailyobs-excel-to-date")?.value||"";s(),await this.exportExcel({status:a,siteName:o,department:n,fromDate:r,toDate:l})})},async exportExcel(e={}){(!e||typeof e!="object")&&(e={});const{status:t="all",siteName:i="",department:s="",fromDate:a="",toDate:o=""}=e,n=typeof this.getDailyObservationsVisibleToCurrentUser=="function"?this.getDailyObservationsVisibleToCurrentUser():Array.isArray(AppState.appData.dailyObservations)?AppState.appData.dailyObservations:[];if(n.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u064A\u0648\u0645\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}if(typeof XLSX>"u")try{await this.ensureSheetJS()}catch{return}try{const r=n.map(h=>this.normalizeRecord(h)),l=a?new Date(a):null,d=o?new Date(o):null,c=r.filter(h=>{if(i&&String(h.siteName||"").trim()!==String(i).trim()||s&&String(h.responsibleDepartment||"").trim()!==s||t==="open"&&h.status==="\u0645\u063A\u0644\u0642"||t==="closed"&&h.status!=="\u0645\u063A\u0644\u0642"||t==="in_progress"&&h.status!=="\u062C\u0627\u0631\u064A"&&h.status!=="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630")return!1;if(!l&&!d)return!0;const S=h.date?new Date(h.date):null;return!(!S||Number.isNaN(S.getTime())||l&&S<new Date(l.getFullYear(),l.getMonth(),l.getDate())||d&&S>new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59,999))});if(c.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629.");return}const p=c.map(h=>({"\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":h.isoCode||h.code||h.id||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639":h.siteName||"","\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639":h.locationName||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":h.observationType||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A":h.date?Utils.formatDateTime(h.date):"",\u0627\u0644\u0648\u0631\u062F\u064A\u0629:h.shift||"","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":h.details||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A":h.correctiveAction||"","\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630":h.responsibleDepartment||"","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":h.riskLevel||"","\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629":h.observerName||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630":h.expectedCompletionDate?Utils.formatDate(h.expectedCompletionDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:h.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(h.attachments)?h.attachments.length:0,"\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(h.attachments)?h.attachments.map(S=>S.name).join(", "):""})),b=XLSX.utils.book_new(),f=XLSX.utils.json_to_sheet(p);XLSX.utils.book_append_sheet(b,f,"DailyObservations");const y=`Daily_Observations${t==="open"?"_Open":t==="closed"?"_Closed":""}_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(b,y),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${c.length} \u0645\u0644\u0627\u062D\u0638\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D.`)}catch(r){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0625\u0644\u0649 Excel:",r),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629: "+r.message)}},async showImportExcelModal(){if(!this.canDailyObservationsFullAdminUi()){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e);const t=e.querySelector("#observation-excel-file-input"),i=e.querySelector("#observation-import-confirm-btn"),s=e.querySelector("#observation-import-preview"),a=e.querySelector("#observation-preview-head"),o=e.querySelector("#observation-preview-body"),n=e.querySelector("#observation-preview-count");let r=[];const l=()=>{r=[],s&&s.classList.add("hidden"),a&&(a.innerHTML=""),o&&(o.innerHTML=""),n&&(n.textContent=""),i&&(i.disabled=!0)};e.addEventListener("click",c=>{c.target===e&&e.remove()});const d=async c=>{const p=c.target.files?.[0];if(l(),!!p){if(typeof XLSX>"u")try{await this.ensureSheetJS()}catch{return}try{Loading.show();const b=await this.readObservationExcelFile(p);r=b,this.renderObservationImportPreview(b,{previewContainer:s,previewHead:a,previewBody:o,previewCount:n,confirmBtn:i}),Loading.hide()}catch(b){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",b),Notification?.error?.("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+b.message)}}};t&&t.addEventListener("change",d),i?.addEventListener("click",async()=>{if(r.length===0){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}await this.processImportedObservations(r,e)})},async readObservationExcelFile(e){return new Promise((t,i)=>{const s=new FileReader;s.onload=a=>{try{const o=new Uint8Array(a.target.result),n=XLSX.read(o,{type:"array"}),r=n.SheetNames[0],l=n.Sheets[r],d=XLSX.utils.sheet_to_json(l,{defval:""});if(!Array.isArray(d)||d.length===0){i(new Error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629."));return}t(d)}catch(o){i(o)}},s.onerror=i,s.readAsArrayBuffer(e)})},renderObservationImportPreview(e,{previewContainer:t,previewHead:i,previewBody:s,previewCount:a,confirmBtn:o}){if(!Array.isArray(e)||e.length===0){Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u0645\u0644\u0641.");return}const n=Object.keys(e[0]);i&&(i.innerHTML=`<tr>${n.map(r=>`<th class="px-2 py-1">${Utils.escapeHTML(String(r))}</th>`).join("")}</tr>`),s&&(s.innerHTML=e.slice(0,5).map(r=>`
                <tr>
                    ${n.map(l=>`<td class="px-2 py-1">${Utils.escapeHTML(String(r[l]??""))}</td>`).join("")}
                </tr>
            `).join("")),a&&(a.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${e.length}`),t?.classList.remove("hidden"),o&&(o.disabled=!1)},async processImportedObservations(e,t){if(!Array.isArray(e)||e.length===0){Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}Array.isArray(AppState.appData.dailyObservations)||(AppState.appData.dailyObservations=[]),Loading.show();let i=0,s=0;const a=[];try{for(let o=0;o<e.length;o+=1){const n=e[o];try{if(!Object.values(n||{}).some(c=>String(c||"").trim().length>0)){s+=1;continue}const l=await this.mapImportedObservationRow(n);if(!l){s+=1,a.push(`\u0635\u0641 ${o+2}: \u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`);continue}if(AppState.appData.dailyObservations.find(c=>{const p=this.normalizeRecord(c);return l.isoCode&&p.isoCode&&l.isoCode===p.isoCode?!0:p.id===l.id})){s+=1;continue}AppState.appData.dailyObservations.push(l),i+=1}catch(r){s+=1;const l=r.message||r.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";a.push(`\u0635\u0641 ${o+2}: ${l}`),Utils.safeWarn(`\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0635\u0641 ${o+2}:`,r)}}}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",o),a.push(`\u062E\u0637\u0623 \u0639\u0627\u0645: ${o.message||o.toString()}`)}try{if(i>0){try{typeof window<"u"&&window.DataManager&&typeof window.DataManager.save=="function"?window.DataManager.save():typeof DataManager<"u"&&typeof DataManager.save=="function"?DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",o)}try{await GoogleIntegration.autoSave("DailyObservations",AppState.appData.dailyObservations)}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL:",o)}}}catch(o){Utils.safeError("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",o),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0639\u0636 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0643\u0646 \u0641\u0634\u0644 \u062D\u0641\u0638\u0647\u0627: "+(o.message||o.toString()))}if(Loading.hide(),i>0?Notification?.success?.(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629${s?`\u060C \u0648\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 ${s} \u0635\u0641`:""}.`):s>0&&Notification?.warning?.("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u064A \u0635\u0641 \u0628\u0633\u0628\u0628 \u0623\u062E\u0637\u0627\u0621 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A."),a.length>0){Utils.safeWarn("\u0623\u062E\u0637\u0627\u0621 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629:",a);const o=a.slice(0,5).join(`
`);Notification?.error?.(`\u0623\u062E\u0637\u0627\u0621 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:
${o}${a.length>5?`
...`:""}`)}t.remove(),this.resetFormState(),this.loadObservationsList()},async mapImportedObservationRow(e){if(!e||typeof e!="object")return null;const t=new Map,i=new Map;Object.entries(e||{}).forEach(([O,I])=>{if(O==null)return;const W=String(O).trim();W&&(t.set(W,I),i.set(W.toLowerCase(),I))});const s=O=>{for(const I of O){const W=String(I||"").trim();if(!W)continue;if(t.has(W)){const N=t.get(W),M=N==null?"":String(N).trim();if(M)return M}const ae=W.toLowerCase();if(i.has(ae)){const N=i.get(ae),M=N==null?"":String(N).trim();if(M)return M}}return""},a=O=>{for(const I of O){const W=String(I||"").trim();if(!W)continue;if(t.has(W)){const N=t.get(W);if(N!=null&&String(N).trim()!=="")return N}const ae=W.toLowerCase();if(i.has(ae)){const N=i.get(ae);if(N!=null&&String(N).trim()!=="")return N}}return""},o=O=>{if(O==null)return[];if(typeof O=="object"){const M=O?.url||O?.link||O?.href||O?.hyperlink||O?.l?.Target||O?.l?.target||O?.Target||O?.target||O?.v||O?.text||"";return M&&typeof M=="string"?o(M):[]}const I=String(O||"").trim();if(!I)return[];const W=[],ae=/https?:\/\/[^\s"'<>]+/gi;let N;for(;(N=ae.exec(I))!==null;){const Y=N[0].replace(/[)\],.;،؛]+$/g,"").trim();Y&&W.push(Y)}return Array.from(new Set(W))},n=(O,I="\u0645\u0631\u0641\u0642")=>{const W=o(O);return W.length?W.map((ae,N)=>{const M=this.detectMimeType(ae,ae),Y=M==="application/pdf"?".pdf":M==="image/png"?".png":M==="image/jpeg"?".jpg":"";return{id:Utils.generateId("ATT"),name:`${I}-${N+1}${Y}`,type:M,size:0,data:ae}}):[]},r=s(["\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0643\u0648\u062F ISO","ISO","ISO Code","Code"]);let l=s(["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639/ \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646","Site","Site Name","Site / Location","Site/Location","Site/Location Name","Site Location","Site Location Name","Location Site","Location/Site"]);const d=s(["\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0643\u0627\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0645\u0646\u0637\u0642\u0629","Location","Location Name","Place","Area","Place Name"]),c=s(["\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062A\u0635\u0631\u0641","Observation Type","Observation Type / Category","Type","Observation","Observation Category"]);let p=s(["\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 / \u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629/\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646","\u0627\u0644\u0648\u0635\u0641","\u0648\u0635\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","Details","Observation Details","Observation Detail","Observation/Unsafe Act Details","Observation / Unsafe Act Details","Description","Observation Description","Description of Observation","Unsafe Act Details","Observation / Unsafe Act Description"]);const b=s(["\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A/ \u0627\u0644\u0648\u0642\u0627\u0626\u064A","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0648\u0642\u0627\u0626\u064A","Corrective Action","Preventive Action","Corrective/Preventive Action","Corrective & Preventive Action"]),f=s(["\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629","Responsible Department","Responsible Dept","Department","Responsible","Responsible Person","Responsible for Implementation"]),g=s(["\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","\u062F\u0631\u062C\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629","Risk Level","Risk","Risk Rating","Risk Level Rating"]),y=s(["\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u0645\u0644\u0627\u062D\u0638","\u0635\u0627\u062D\u0628 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","Observer Name","Observer","Reporter Name"]),h=s(["\u0627\u0644\u062D\u0627\u0644\u0629","Status","Observation Status"]),S=s(["\u0627\u0644\u0648\u0631\u062F\u064A\u0629","Shift","Shift Name"]),m=a(["\u0637\u0627\u0628\u0639 \u0632\u0645\u0646\u064A","Timestamp","Time Stamp","time stamp","\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0625\u062F\u062E\u0627\u0644","Entry Timestamp"]),k=a(["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A","Observation Date","Observation DateTime","Date","DateTime"])||m,T=a(["\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639 \u0644\u0644\u062A\u0646\u0641\u064A\u0630","Expected Completion Date","Due Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062A\u0648\u0642\u0639","Expected Date"]),C=a(["\u0627\u0644\u0635\u0648\u0631\u0647 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629","\u0635\u0648\u0631\u0647","\u0635\u0648\u0631\u0629","Image","Image URL","Image Url","Photo","Photo URL","Attachment","Attachments","\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A","\u0645\u0631\u0641\u0642","\u0627\u0644\u0631\u0627\u0628\u0637","\u0631\u0627\u0628\u0637","Link","URL","Drive Link","\u0627\u0644\u062E\u0627\u062F\u0645 Link"]);if(!l&&!p){if(!Object.values(e).some(I=>String(I||"").trim().length>3))throw new Error("\u0627\u0644\u0635\u0641 \u064A\u0641\u062A\u0642\u0631 \u0625\u0644\u0649 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 (\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629).");l||(l="\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p||(p="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644")}const w=this.findSiteMatch(l),u=w?w.id:"",U=w?w.name:l,L=w?this.findPlaceMatch(w,d):null,F=L?L.id:"",q=L?L.name:d;let V=this.normalizeObservationTypeValue(c);const A=this.normalizeShiftValue(S),_=this.normalizeRiskLevelValue(g);let j=this.normalizeStatus(h);const X=this.parseExcelDateValue(k)||this.parseExcelDateValue(m)||new Date().toISOString(),le=this.parseExcelDateValue(T,{isDateOnly:!0}),J=n(C,"\u0631\u0627\u0628\u0637");p||(p="\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644"),V||(V="\u0623\u062E\u0631\u0649"),j||(j="\u0645\u0641\u062A\u0648\u062D");let D="",z="";if(r)D=String(r).match(/^OBS-\d{6}-(\d+)$/i)?"DOB-"+String(r).match(/^OBS-\d{6}-(\d+)$/i)[1]:generateDailyObservationId(AppState.appData.dailyObservations||[]),z=r;else{const O=await getNextObservationIdFromBackend();O&&O.id?(D=O.id,z=O.isoCode||getObservationIsoCodeFromId(D)):(D=generateDailyObservationId(AppState.appData.dailyObservations||[]),z=getObservationIsoCodeFromId(D))}const Z=new Date().toISOString(),ie={id:D,isoCode:z,siteId:u,siteName:U,placeId:F,locationName:q,observationType:V,date:X||Z,shift:A,details:p,correctiveAction:b,responsibleDepartment:f,riskLevel:_,observerName:y,expectedCompletionDate:le,status:j,attachments:J,createdAt:Z,updatedAt:Z};return this.normalizeRecord(ie)},_extractDriveFileId(e){if(!e||typeof e!="string")return"";const t=e.match(/[?&]id=([a-zA-Z0-9_-]+)/)||e.match(/\/d\/([a-zA-Z0-9_-]+)/)||e.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)||e.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)||e.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/)||(e.match(/^[a-zA-Z0-9_-]{25,}$/)?[null,e]:null);return t?t[1]:""},viewFullImage(e){if(!e)return;document.querySelectorAll(".obs-photo-lightbox").forEach(f=>f.remove());const t=this.resolveObservationDriveFileId(e),i=typeof Utils<"u"&&Utils.IMG_DRIVE_PLACEHOLDER_GIF?Utils.IMG_DRIVE_PLACEHOLDER_GIF:"",s=String(e).startsWith("data:image/"),a=s?e:t?i:e,o=!s&&t?` data-drive-proxy-id="${Utils.escapeHTML(t)}"`:"",n=document.createElement("div");n.className="modal-overlay obs-photo-lightbox",n.style.zIndex="99999",n.innerHTML=`
            <div class="modal-content obs-photo-lightbox-frame" role="dialog" aria-modal="true" aria-label="\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629">
                <div class="obs-photo-lightbox-bar">
                    <span class="obs-photo-lightbox-title"><i class="fas fa-image"></i>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629</span>
                    <button type="button" class="modal-close obs-photo-lightbox-close" aria-label="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="obs-photo-lightbox-stage">
                    <img class="obs-photo-lightbox-img" src="${Utils.escapeHTML(a)}"${o} alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629">
                </div>
            </div>
        `,document.body.appendChild(n);const r=n.querySelector(".obs-photo-lightbox-frame"),l=n.querySelector(".obs-photo-lightbox-img"),d=n.querySelector(".obs-photo-lightbox-close"),c=()=>this._fitObservationLightboxImage(l,r),p=f=>{f.key==="Escape"&&b()},b=()=>{window.removeEventListener("resize",c),document.removeEventListener("keydown",p),n.remove()};l&&(l.addEventListener("load",c),l.complete&&l.naturalWidth>2&&c()),window.addEventListener("resize",c),document.addEventListener("keydown",p),d&&d.addEventListener("click",b),n.addEventListener("click",f=>{f.target===n&&b()}),typeof Utils<"u"&&typeof Utils.hydrateDriveProxyImages=="function"&&(Utils.hydrateDriveProxyImages(n,{onFetchFail:()=>{}}),l&&l.addEventListener("load",c))},_fitObservationLightboxImage(e,t){if(!e||!t)return;const i=e.naturalWidth||0,s=e.naturalHeight||0;if(i<8||s<8)return;const a=Math.min(window.innerWidth*.92,1080),o=Math.max(220,window.innerHeight*.92-56),n=Math.min(a/i,o/s),r=Math.max(200,Math.round(i*n));e.style.width=r+"px",e.style.height="auto",t.style.width="fit-content"},_observationPhotoLoadingHtml(){return`
            <div class="flex flex-col items-center justify-center p-8 text-slate-400 gap-2 min-h-[220px] w-full col-span-full">
                <i class="fas fa-circle-notch fa-spin text-2xl text-blue-500"></i>
                <span class="text-sm font-semibold">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629...</span>
            </div>
        `},_observationPhotoSectionHtml(e){const t=Array.isArray(e?.attachments)?e.attachments:[],i=t.filter(o=>o&&!o.__listOnly);return`
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm" data-obs-attachments-wrap>
                            <strong class="text-gray-700 block mb-3 text-lg"><i class="fas fa-image ml-2 text-blue-500"></i>\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</strong>
                            <div data-section="attachments" class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                ${(Number(e?.attachmentCount)>0||t.some(o=>o&&o.__listOnly))&&i.length===0&&!this.observationHasRealImages(e)?this._observationPhotoLoadingHtml():this._buildObservationAttachmentsHtml(t)||'<p class="text-sm text-gray-500 col-span-full">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629 \u0645\u0631\u0641\u0642\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</p>'}
                            </div>
                        </div>
        `},_syncObservationModalPhotos(e,t){if(!e)return;const i=this._observationPhotoSectionHtml(t).trim(),s=e.querySelector("[data-obs-attachments-wrap]"),a=document.createElement("div");a.innerHTML=i;const o=a.firstElementChild;if(!o)return;if(s){s.replaceWith(o);return}const n=e.querySelector('[id^="after-execution-photos-container-"]'),r=n?n.closest(".bg-gradient-to-br"):null,l=e.querySelector(".modal-body .space-y-5");r&&r.parentNode?r.parentNode.insertBefore(o,r):l&&l.appendChild(o)},_buildObservationAttachmentsHtml(e){if(!Array.isArray(e)||e.length===0)return"";const t=e.filter(s=>s&&!s.__listOnly);if(!t.length)return e.some(s=>s&&s.__listOnly)?this._observationPhotoLoadingHtml():"";const i=typeof Utils<"u"&&Utils.IMG_DRIVE_PLACEHOLDER_GIF?Utils.IMG_DRIVE_PLACEHOLDER_GIF:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";return t.map(s=>{const a=this.isObservationPhotoAttachment(s),o=this.getObservationAttachmentSrc(s),n=Utils.escapeHTML(s.name||"\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629"),r=this.resolveObservationDriveFileId(s);if(a&&(o||r)){let l=i;if(o.startsWith("data:image/")&&!o.startsWith("data:image/gif"))l=o;else if(typeof Utils<"u"&&typeof Utils.resolveDriveAwareImgDisplay=="function"){const c=Utils.resolveDriveAwareImgDisplay(o||r);(c&&c.displaySrc&&!c.needsProxy||c&&c.displaySrc)&&(l=c.displaySrc)}else(o.startsWith("http://")||o.startsWith("https://"))&&(l=i);const d=r?` data-drive-proxy-id="${Utils.escapeHTML(r)}"`:"";return`
                    <div class="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-slate-50 flex flex-col items-center p-3">
                        <div class="w-full flex justify-center items-center overflow-hidden rounded-lg bg-slate-100 relative min-h-[220px]" style="max-height: 450px;">
                            <div class="photo-loading-spinner flex flex-col items-center justify-center p-6 text-slate-400 gap-2 absolute inset-0">
                                <i class="fas fa-circle-notch fa-spin text-2xl text-blue-500"></i>
                                <span class="text-xs font-semibold">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0648\u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0635\u0648\u0631\u0629...</span>
                            </div>
                            <img src="${Utils.escapeHTML(l)}"${d} alt="${n}" 
                                 class="observation-detail-photo relative z-10 w-auto max-w-full max-h-80 object-contain rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
                                 onload="if (this.naturalWidth > 2) { const sp = this.parentElement.querySelector('.photo-loading-spinner'); if(sp) sp.style.display='none'; }"
                                 onclick="DailyObservations.viewFullImage(this.currentSrc || this.src || '${Utils.escapeHTML(o||r)}')"
                                 title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"
                                 onerror="
                                     const sp = this.parentElement.querySelector('.photo-loading-spinner'); if(sp) sp.style.display='none';
                                     this.onerror = null;
                                     this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22260%22%3E%3Crect fill=%22%23f8fafc%22 width=%22400%22 height=%22260%22/%3E%3Ctext fill=%22%2394a3b8%22 font-family=%22sans-serif%22 font-size=%2215%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u062A\u0639\u0630\u0631 \u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0628\u0627\u0634\u0631\u0629%3C/text%3E%3C/svg%3E';
                                 ">
                        </div>
                        <div class="w-full mt-2 flex items-center justify-between text-xs text-gray-600 px-1">
                            <span class="font-bold truncate max-w-[200px]"><i class="fas fa-image ml-1 text-blue-500"></i>${n}</span>
                            <button type="button" onclick="DailyObservations.viewFullImage(this.closest('.border-2').querySelector('img')?.currentSrc || '${Utils.escapeHTML(o||r)}')" class="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer">
                                <i class="fas fa-expand"></i> \u062A\u0643\u0628\u064A\u0631
                            </button>
                        </div>
                    </div>
                `}return o?`
                <div class="border rounded-xl p-4 bg-gray-50 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <i class="fas fa-file-pdf text-3xl text-red-500"></i>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-800">${n}</p>
                        <button type="button" class="btn-secondary btn-xs mt-2" onclick="window.open('${Utils.escapeHTML(o)}', '_blank')">
                            <i class="fas fa-external-link-alt ml-1"></i>\u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641
                        </button>
                    </div>
                </div>
            `:""}).join("")},shareViaWhatsApp(e){const t=(AppState.appData.dailyObservations||[]).find(p=>String(p.id)===String(e)||String(p.isoCode)===String(e));if(!t){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeRecord(t),s=i.riskLevel==="\u0639\u0627\u0644\u064A"||i.riskLevel==="\u0639\u0627\u0644\u064A\u0629"?"\u{1F534}":i.riskLevel==="\u0645\u062A\u0648\u0633\u0637"||i.riskLevel==="\u0645\u062A\u0648\u0633\u0637\u0629"?"\u{1F7E1}":"\u{1F7E2}",a=i.status==="\u0645\u063A\u0644\u0642"?"\u2705":"\u23F3",o=i.isoCode||(i.id?getObservationIsoCodeFromId(i.id):"-")||"-",n=i.siteName||"",r=i.locationName||"",l=n&&r?`${n} \u2014 ${r}`:n||r||"-",d=`\u{1F6E1}\uFE0F *\u062A\u0642\u0631\u064A\u0631 \u0645\u0644\u0627\u062D\u0638\u0629 \u0633\u0644\u0627\u0645\u0629 \u0648\u0635\u062D\u0629 \u0645\u0647\u0646\u064A\u0629 (HSE)*
*\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)*
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4CC} *\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:* \``+o+"`\n\u{1F4C5} *\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u062C\u064A\u0644:* "+(i.date?Utils.formatDateTime(i.date):"\u0627\u0644\u064A\u0648\u0645")+(i.shift?" ("+i.shift+")":"")+`
\u{1F3ED} *\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:* `+l+`
\u26A0\uFE0F *\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:* `+this.getObservationTypeLabel(i.observationType)+" ("+s+" "+(i.riskLevel||"\u0645\u062A\u0648\u0633\u0637")+`)
`+(i.subCategory?"\u{1F3F7}\uFE0F *\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A:* "+i.subCategory+`
`:"")+"\u{1F3E2} *\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629:* "+(i.responsibleDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")+`
\u{1F464} *\u0631\u0627\u0635\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:* `+(i.observerName||"\u0645\u064A\u062F\u0627\u0646\u064A")+`
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4DD} *\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:*
`+(i.description||i.details||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629")+`

`+(i.correctiveAction?`\u{1F6E1}\uFE0F *\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u0637\u0644\u0648\u0628:*
`+i.correctiveAction+`

`:"")+"\u{1F4CA} *\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629:* "+a+" "+(i.status||"\u0645\u0641\u062A\u0648\u062D")+`
`+(i.expectedCompletionDate||i.targetDate?"\u23F3 *\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641:* "+(i.expectedCompletionDate||i.targetDate)+`
`:"")+`\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F310} _\u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (SafetyHub)_`,c="https://api.whatsapp.com/send?text="+encodeURIComponent(d);window.open(c,"_blank")},async exportPDF(e){const t=AppState.appData.dailyObservations.find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let i=this.normalizeRecord(t);if(!this.observationHasRealImages(i)&&typeof this._getObservationData=="function")try{const s=await this._getObservationData(e);s&&(i=this.normalizeRecord(s))}catch{}try{Loading.show();const s=i.isoCode||(i.id?getObservationIsoCodeFromId(i.id):"")||"OBS-UNKNOWN",a="\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629",o=[],n=[];Array.isArray(i.attachments)&&i.attachments.length>0&&i.attachments.forEach(f=>{if(f&&f.__listOnly)return;const g=this.isObservationPhotoAttachment(f),y=this.getObservationAttachmentSrc(f);g&&y?o.push({src:y,name:Utils.escapeHTML(f.name||"\u0635\u0648\u0631\u0629")}):y&&n.push({name:Utils.escapeHTML(f.name||"\u0645\u0631\u0641\u0642"),link:y})});let r="";o.length>0&&(r=`
                    <div class="section-title" style="margin-top: 20px; margin-bottom: 15px; font-size: 16px; font-weight: 600;">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u0627\u0644\u0635\u0648\u0631):</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        ${o.map((f,g)=>`
                            <div style="border: 2px solid #ddd; border-radius: 8px; padding: 10px; background: #f9f9f9; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <img src="${f.src}" alt="${f.name}" style="max-width: 100%; max-height: 250px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;">
                                <p style="margin-top: 8px; font-size: 12px; color: #666; word-break: break-word;">${f.name}</p>
                            </div>
                        `).join("")}
                    </div>
                `);let l="";n.length>0&&(l=`
                    <div class="section-title" style="margin-top: 20px; margin-bottom: 15px; font-size: 16px; font-weight: 600;">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u0645\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649):</div>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                        ${n.map(f=>`
                            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; background: #f9f9f9;">
                                <i class="fas fa-file ml-2"></i>
                                <span>${f.name}</span>
                                ${f.link?`<a href="${f.link}" target="_blank" style="margin-right: 10px; color: #3b82f6; text-decoration: none;">\u0639\u0631\u0636</a>`:""}
                            </div>
                        `).join("")}
                    </div>
                `);const d=r+l,c=`
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
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,a,c,!1,!0,{qrData:JSON.stringify({id:i.id,type:"DailyObservation"})},i.createdAt,i.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629</title></head><body dir="rtl" style="font-family: Arial, sans-serif;">${c}</body></html>`,b=Utils.printHtmlContent("\u0645\u0644\u0627\u062D\u0638\u0629 \u064A\u0648\u0645\u064A\u0629",p);Loading.hide(),b||Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631.")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+s.message)}},async convertFileToBase64(e){return new Promise((t,i)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=i,s.readAsDataURL(e)})},async convertImageToBase64(e){return this.convertFileToBase64(e)},extractCleanPlacesList(e){if(!e)return[];let t=[];if(Array.isArray(e))t=e;else if(typeof e=="string")try{const i=JSON.parse(e);Array.isArray(i)?t=i:t=e.split(/[\n,]/)}catch{t=e.split(/[\n,]/)}return t.map(i=>{if(!i)return"";if(typeof i=="string"){const s=i.trim();if(s.startsWith("{")&&s.endsWith("}"))try{const a=JSON.parse(s);return String(a.name||a.placeName||a.locationName||a.place||a.label||a.id||"").trim()}catch{}return s}return typeof i=="object"?String(i.name||i.placeName||i.locationName||i.place||i.label||i.title||i.id||"").trim():String(i).trim()}).filter(i=>i&&i!=="[object Object]")},exportPublicConfigToLocalStorage(){try{const e=[];if((AppState.appData?.observationSites||[]).forEach(n=>{const r=String(n.name||n.siteName||n).trim(),l=this.extractCleanPlacesList(n.places);r&&!e.some(d=>d.name===r)&&e.push({name:r,places:l})}),e.length===0&&Array.isArray(AppState.appData?.dailyObservations)){const n={};AppState.appData.dailyObservations.forEach(r=>{const l=String(r.siteName||r.site||"").trim(),d=String(r.locationName||r.placeId||r.place||"").trim();l&&d&&d!=="[object Object]"&&(n[l]||(n[l]=[]),n[l].includes(d)||n[l].push(d))}),Object.keys(n).forEach(r=>e.push({name:r,places:n[r]}))}const i=typeof this.getDepartmentOptions=="function"?this.getDepartmentOptions():[],a=(typeof this.getSafetyTeamMembers=="function"?this.getSafetyTeamMembers():[]).map(n=>({name:n.name||n.fullName||n,role:n.role||n.jobTitle||"\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629"})).filter(n=>n.name),o={success:!0,sites:e,departments:i,safetyMembers:a,observationTypes:[{value:"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646"},{value:"\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0622\u0645\u0646\u0629",label:"\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0622\u0645\u0646\u0629"},{value:"\u0633\u0644\u0648\u0643 \u0622\u0645\u0646 \u0648\u0625\u064A\u062C\u0627\u0628\u064A",label:"\u0633\u0644\u0648\u0643 \u0622\u0645\u0646 \u0648\u0625\u064A\u062C\u0627\u0628\u064A"},{value:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629",label:"\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u064A\u0626\u064A\u0629"},{value:"\u062E\u0637\u0631 \u062D\u0631\u064A\u0642",label:"\u062E\u0637\u0631 \u062D\u0631\u064A\u0642"},{value:"\u0623\u062E\u0631\u0649",label:"\u0623\u062E\u0631\u0649"}],shifts:["\u0648\u0631\u062F\u064A\u0629 \u0635\u0628\u0627\u062D\u064A\u0629","\u0648\u0631\u062F\u064A\u0629 \u0645\u0633\u0627\u0626\u064A\u0629","\u0648\u0631\u062F\u064A\u0629 \u0644\u064A\u0644\u064A\u0629"],riskLevels:[{value:"\u0645\u0646\u062E\u0641\u0636",label:"\u0645\u0646\u062E\u0641\u0636"},{value:"\u0645\u062A\u0648\u0633\u0637",label:"\u0645\u062A\u0648\u0633\u0637"},{value:"\u0639\u0627\u0644\u064A",label:"\u0639\u0627\u0644\u064A"},{value:"\u062D\u0631\u062C",label:"\u062D\u0631\u062C"}]};(e.length>0||i.length>0)&&localStorage.setItem("HSE_PUBLIC_OBS_CONFIG",JSON.stringify(o))}catch{}},openPublicQrModal(){this.exportPublicConfigToLocalStorage();let t=(window.location.origin||window.location.protocol+"//"+window.location.host)+window.location.pathname.replace(/\/index\.html$/i,"").replace(/\/$/,"")+"/public-observation.html";const i=this.state&&this.state.sites?this.state.sites:AppState.appData.observationSites||[],s=typeof this.getSafetyTeamMembers=="function"?this.getSafetyTeamMembers():[],a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u062D\u062F \u0644\u0643\u0627\u0641\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C -->
                    <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 8px; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                                <i class="fas fa-layer-group"></i>
                            </div>
                            <div>
                                <div style="font-weight: 800; font-size: 0.88rem; color: #166534;">\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0648\u062D\u062F\u0629 (HSE Hub)</div>
                                <div style="font-size: 0.78rem; color: #15803d;">\u062A\u0637\u0628\u064A\u0642 \u0648\u062A\u062B\u0628\u064A\u062A \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0628\u0627\u064A\u0644 \u064A\u0634\u0645\u0644 \u0643\u0627\u0641\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C</div>
                            </div>
                        </div>
                        <a href="forms-hub" target="_blank" onclick="DailyObservations.exportPublicConfigToLocalStorage()" class="btn-primary" style="padding: 7px 14px; font-size: 0.82rem; background: #16a34a; border-radius: 8px; text-decoration: none; font-weight: 700; white-space: nowrap;">
                            \u0641\u062A\u062D \u0627\u0644\u0628\u0648\u0627\u0628\u0629 <i class="fas fa-external-link-alt mr-1"></i>
                        </a>
                    </div>

                    <!-- \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062E\u0635\u064A\u0635: \u0627\u0644\u0645\u0635\u0646\u0639 + \u0627\u0644\u0645\u0641\u062A\u0634 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-industry ml-1 text-blue-500"></i> \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:
                            </label>
                            <select id="qr-factory-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u2014</option>
                                ${(i||[]).map(f=>`<option value="${Utils.escapeHTML(f.name||f.siteName||f)}">${Utils.escapeHTML(f.name||f.siteName||f)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-shield ml-1 text-emerald-600"></i> \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635:
                            </label>
                            <select id="qr-inspector-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">\u2014 \u0639\u0627\u0645 (\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0641\u062A\u0634 \u0628\u0627\u0644\u0646\u0645\u0648\u0630\u062C) \u2014</option>
                                ${(s||[]).map(f=>`<option value="${Utils.escapeHTML(f.name)}">${Utils.escapeHTML(f.name)}</option>`).join("")}
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
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" id="print-poster-btn" class="btn-primary" style="padding: 9px 16px; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #15803d;">
                            <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A (A4)
                        </button>
                        <button type="button" class="btn-primary" onclick="DailyObservations.printLocationQrBadges()" style="padding: 9px 16px; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #0284c7;">
                            <i class="fas fa-tags"></i> \u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0645\u0627\u0643\u0646
                        </button>
                    </div>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(a);const o=a.querySelector("#qr-factory-select"),n=a.querySelector("#qr-inspector-select"),r=a.querySelector("#public-link-input"),l=a.querySelector("#qr-code-img"),d=a.querySelector("#qr-target-text"),c=a.querySelector("#copy-public-link-btn"),p=a.querySelector("#print-poster-btn"),b=()=>{const f=o.value,g=n.value;let y=[];f&&y.push(`factory=${encodeURIComponent(f)}`),g&&y.push(`inspector=${encodeURIComponent(g)}`);const h=y.length>0?`?${y.join("&")}`:"",S=`${t}${h}`;r.value=S;let m="";if(typeof qrcode=="function")try{const T=qrcode(0,"M");T.addData(S),T.make(),m=T.createDataURL(6,4)}catch{}if(!m&&window.QRCode&&typeof window.QRCode.generate=="function")try{m=window.QRCode.generate(S,260)}catch{}m&&m.startsWith("data:")?l.src=m:l.src=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(S)}`;let k="\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0641\u0648\u0631\u0627\u064B";f&&g?k=`\u0627\u0644\u0645\u0648\u0642\u0639: ${f} | \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629: ${g}`:f?k=`\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062E\u0635\u0635: ${f}`:g&&(k=`\u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062E\u0635\u0635: ${g}`),d.textContent=k};o?.addEventListener("change",b),n?.addEventListener("change",b),b(),c?.addEventListener("click",()=>{navigator.clipboard.writeText(r.value).then(()=>{c.innerHTML='<i class="fas fa-check ml-1 text-green-600"></i> \u062A\u0645 \u0627\u0644\u0646\u0633\u062E!',setTimeout(()=>{c.innerHTML='<i class="fas fa-copy ml-1"></i> \u0646\u0633\u062E'},2500)})}),p?.addEventListener("click",()=>{const f=o.value||"\u062C\u0645\u064A\u0639 \u0645\u0635\u0627\u0646\u0639 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0634\u0631\u0643\u0629",g=n.value||"",y=r.value;let h="";if(typeof qrcode=="function")try{const m=qrcode(0,"M");m.addData(y),m.make(),h=m.createDataURL(8,4)}catch{}!h&&l.src&&l.src.startsWith("data:")&&(h=l.src),h||(h=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(y)}`);const S=window.open("","_blank");if(!S){typeof Notification<"u"&&Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}S.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 - ${f}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"><\/script>
                    <style>
                        @page { size: A4 portrait; margin: 10mm; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; box-sizing: border-box; }
                        body { font-family: 'Cairo', system-ui, -apple-system, sans-serif; text-align: center; color: #0f172a; margin: 0; padding: 10px; background: #ffffff; }
                        .no-print-bar { margin-bottom: 15px; text-align: left; }
                        .print-now-btn { background: #2563eb; color: #ffffff; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 800; font-family: inherit; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(37,99,235,0.3); }
                        @media print { .no-print-bar { display: none !important; } }
                        .poster-card { border: 3.5px solid #0f172a; border-radius: 16px; padding: 24px 20px; position: relative; background: #ffffff; }
                        .doc-badge-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 12px; font-weight: 800; color: #475569; }
                        .header-banner { background: #0f172a !important; color: #ffffff !important; padding: 18px 14px; border-radius: 10px; margin-bottom: 18px; border: 1px solid #1e293b; }
                        .title { font-size: 25px; font-weight: 900; margin: 0 0 4px 0; color: #ffffff !important; }
                        .sub { font-size: 14px; color: #93c5fd !important; margin: 0; font-weight: 700; }
                        .badges-wrap { display: flex; justify-content: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
                        .factory-badge { background: #eff6ff !important; border: 1.5px solid #3b82f6; color: #1d4ed8 !important; font-size: 17px; font-weight: 800; padding: 6px 18px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; }
                        .inspector-badge { background: #f0fdf4 !important; border: 1.5px solid #16a34a; color: #15803d !important; font-size: 17px; font-weight: 800; padding: 6px 18px; border-radius: 25px; display: inline-flex; align-items: center; gap: 6px; }
                        .qr-box { background: #ffffff; border: 3px solid #0f172a; border-radius: 16px; padding: 14px; display: inline-block; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.06); }
                        .qr-img { width: 250px; height: 250px; display: block; margin: 0 auto; object-fit: contain; }
                        .instruction-card { background: #f8fafc !important; border-right: 5px solid #2563eb; border: 1px solid #e2e8f0; border-right-width: 5px; border-radius: 8px; padding: 12px 18px; margin-bottom: 18px; text-align: right; }
                        .instruction-title { font-size: 17px; font-weight: 900; color: #1e3a8a; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
                        .steps-list { font-size: 13.5px; color: #334155; line-height: 1.8; margin: 0; padding-right: 20px; font-weight: 600; }
                        .footer-meta { font-size: 11.5px; color: #64748b; border-top: 1.5px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; }
                    </style>
                </head>
                <body>
                    <div class="no-print-bar">
                        <button class="print-now-btn" onclick="window.print()">
                            <i class="fas fa-print"></i> \u0623\u0645\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0628\u0648\u0633\u062A\u0631 \u0627\u0644\u0622\u0646 (A4)
                        </button>
                    </div>

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
                            <div class="factory-badge"><i class="fas fa-industry"></i> \u0627\u0644\u0645\u0648\u0642\u0639: ${f}</div>
                            ${g?`<div class="inspector-badge"><i class="fas fa-user-shield"></i> \u0645\u0641\u062A\u0634 \u0627\u0644\u0633\u0644\u0627\u0645\u0629: ${g}</div>`:""}
                        </div>

                        <div>
                            <div class="qr-box" id="qrContainer">
                                <img id="printQrImg" src="${h}" alt="QR Code" class="qr-img">
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
                        (function() {
                            const rawUrl = ${JSON.stringify(y)};
                            const img = document.getElementById('printQrImg');
                            
                            function ensureQrRendered() {
                                if (!img.src || img.src === '' || img.src === window.location.href || img.naturalWidth === 0) {
                                    try {
                                        if (typeof qrcode === 'function') {
                                            const qr = qrcode(0, 'M');
                                            qr.addData(rawUrl);
                                            qr.make();
                                            img.src = qr.createDataURL(8, 4);
                                        } else {
                                            img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(rawUrl);
                                        }
                                    } catch(e) {
                                        img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(rawUrl);
                                    }
                                }
                            }

                            ensureQrRendered();
                            
                            window.addEventListener('load', function() {
                                ensureQrRendered();
                                setTimeout(function() {
                                    window.print();
                                }, 300);
                            });
                        })();
                    <\/script>
                </body>
                </html>
            `),S.document.close()})}};try{typeof window<"u"&&(window.DailyObservations=DailyObservations,AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 DailyObservations module loaded and available on window.DailyObservations"))}catch(e){Utils?.safeError?.("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 DailyObservations:",e),typeof window<"u"&&typeof DailyObservations<"u"&&(window.DailyObservations=DailyObservations)}
