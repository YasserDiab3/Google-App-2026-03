const Incidents={currentEditId:null,currentAttachments:[],reportPreviewModalId:"incident-report-preview-modal",lastRenderedSignature:"",_i18nSectionObserver:null,_i18nBodyObserver:null,applyModuleI18n(e){const t=e||document,i=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;i&&(typeof i.applyI18n=="function"&&i.applyI18n(t),typeof i.applyLiteralTranslations=="function"&&i.applyLiteralTranslations(t))},ensureI18nObservers(e){this._i18nSectionObserver&&(this._i18nSectionObserver.disconnect(),this._i18nSectionObserver=null),e&&typeof MutationObserver<"u"&&(this._i18nSectionObserver=new MutationObserver(t=>{t.forEach(i=>{i.addedNodes.forEach(a=>{a&&a.nodeType===1&&this.applyModuleI18n(a)})})}),this._i18nSectionObserver.observe(e,{childList:!0,subtree:!0})),!this._i18nBodyObserver&&typeof MutationObserver<"u"&&(this._i18nBodyObserver=new MutationObserver(t=>{t.forEach(i=>{i.addedNodes.forEach(a=>{!a||a.nodeType!==1||(a.classList?.contains("modal-overlay")||a.querySelector?.(".modal-overlay"))&&this.applyModuleI18n(a)})})}),this._i18nBodyObserver.observe(document.body,{childList:!0,subtree:!0}))},normalizeLatinDigits(e){if(e==null)return"";const t=String(e),i="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",a="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";return t.replace(/[٠-٩]/g,n=>String(i.indexOf(n))).replace(/[۰-۹]/g,n=>String(a.indexOf(n)))},parseFlexibleDate(e){if(!e)return null;if(e instanceof Date)return Number.isNaN(e.getTime())?null:e;if(typeof e=="number"){const s=new Date(e);return Number.isNaN(s.getTime())?null:s}const t=this.normalizeLatinDigits(e).trim();if(!t)return null;let i=new Date(t);if(!Number.isNaN(i.getTime())||t.includes(" ")&&!t.includes("T")&&(i=new Date(t.replace(" ","T")),!Number.isNaN(i.getTime())))return i;const a=(s,r,d,l=0,c=0,u=0)=>{const p=r-1,m=new Date(s,p,d,l,c,u);return m.getFullYear()===s&&m.getMonth()===p&&m.getDate()===d?m:null},n=(s,r,d)=>{const l=s?parseInt(s,10):0,c=r?parseInt(r,10):0,u=d?parseInt(d,10):0;return{hour:l,minute:c,second:u}};let o=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);if(o){const s=parseInt(o[1],10),r=parseInt(o[2],10),d=parseInt(o[3],10),{hour:l,minute:c,second:u}=n(o[4],o[5],o[6]),p=a(d,r,s,l,c,u);if(p)return p;const m=a(d,s,r,l,c,u);if(m)return m}if(o=t.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/),o){const s=parseInt(o[1],10),r=parseInt(o[2],10),d=parseInt(o[3],10),{hour:l,minute:c,second:u}=n(o[4],o[5],o[6]),p=a(s,r,d,l,c,u);if(p)return p}return null},getThreeYearConfig(){const e=new Date().getFullYear(),t=e-2;return{currentYear:e,earliestYear:t,years:[e,e-1,e-2]}},getCanonicalIncidents(){return!AppState?.appData?.incidents||!Array.isArray(AppState.appData.incidents)?[]:AppState.appData.incidents.filter(e=>e&&typeof e=="object"&&e.id)},getUnifiedIncidentCounts(){const e=this.getCanonicalIncidents();e.forEach(i=>{try{this._normalizeIncidentApprovalRecord(i)}catch{}});const t={total:e.length,open:0,investigating:0,completed:0,closed:0};return e.forEach(i=>{const a=this.getIncidentDisplayStatus(i);a==="\u0645\u0641\u062A\u0648\u062D"||a==="\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"?t.open++:a==="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642"?t.investigating++:a==="\u0645\u0643\u062A\u0645\u0644"||a==="\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A"?t.completed++:a==="\u0645\u063A\u0644\u0642"&&t.closed++}),t},getLinkedRegistryEntries(){const e=new Set(this.getCanonicalIncidents().map(t=>t.id));return(this.registryData||[]).filter(t=>{if(!t||typeof t!="object")return!1;const i=t.incidentId!=null&&String(t.incidentId).trim()!==""&&String(t.incidentId).trim()!=="null"?String(t.incidentId).trim():"";return i&&e.has(i)})},cleanupRegistryOrphans(e={}){const{persist:t=!1}=e;Array.isArray(this.registryData)||(this.registryData=[]),this._dedupeRegistryData();const i=new Set(this.getCanonicalIncidents().map(o=>o.id)),a=this.registryData.length;this.registryData=this.registryData.filter(o=>{if(!o||typeof o!="object")return!1;const s=o.incidentId!=null&&String(o.incidentId).trim()!==""&&String(o.incidentId).trim()!=="null"?String(o.incidentId).trim():"";return s&&i.has(s)});const n=a-this.registryData.length;if(n>0){try{Utils.safeLog(`\u{1F9F9} IncidentsRegistry: \u0625\u0632\u0627\u0644\u0629 ${n} \u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637 \u0628\u062D\u0627\u062F\u062B`)}catch{}if(AppState.appData||(AppState.appData={}),AppState.appData.incidentsRegistry=this.registryData,t)try{localStorage.setItem("hse_incidents_registry",Utils.safeStringify(this.registryData))}catch{}}return n},getIncidentDateValue(e={}){const t=[e.date,e.incidentDate,e.createdAt,e.updatedAt];for(const i of t){if(!i)continue;const a=this.parseFlexibleDate(i);if(a)return a}return null},safeDateToISOString(e,t=16){if(!e)return"";try{const i=this.parseFlexibleDate(e);if(!i)return"";const a=i.getTimezoneOffset();return new Date(i.getTime()-a*6e4).toISOString().slice(0,t)}catch{return""}},normalizeSeverity(e){const t=(e||"").toString().trim().toLowerCase();return t?["\u0639\u0627\u0644\u064A\u0629","high","\u062D\u0631\u062C\u0629","critical"].includes(t)?"high":["\u0645\u062A\u0648\u0633\u0637\u0629","medium","moderate"].includes(t)?"medium":["\u0645\u0646\u062E\u0641\u0636\u0629","low","minor"].includes(t)?"low":"other":"other"},normalizeStatus(e){const t=(e||"").toString().trim().toLowerCase();return t?["\u0645\u063A\u0644\u0642","\u0645\u062D\u0644\u0648\u0644","\u062A\u0645 \u0627\u0644\u0627\u063A\u0644\u0627\u0642","\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642","closed","resolved"].includes(t)?"closed":["\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642","investigation","under investigation","in progress","\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"].includes(t)?"investigating":["\u0645\u0641\u062A\u0648\u062D","open","new"].includes(t)?"open":"other":"other"},getThreeYearIncidents(){const e=this.getCanonicalIncidents(),{earliestYear:t,currentYear:i}=this.getThreeYearConfig();return e.map(a=>{const n=this.getIncidentDateValue(a);if(!n)return null;const o=n.getFullYear();return o<t||o>i?null:{incident:a,date:n,year:o}}).filter(Boolean).sort((a,n)=>n.date-a.date)},buildYearlyStats(e=[]){const{years:t}=this.getThreeYearConfig(),i=t.map(a=>{const n=e.filter(c=>c.year===a),o=n.length,s={high:0,medium:0,low:0,other:0},r={open:0,investigating:0,closed:0,other:0};n.forEach(({incident:c})=>{const u=this.normalizeSeverity(c?.severity);s[u]=(s[u]||0)+1;const p=this.normalizeStatus(c?.status);r[p]=(r[p]||0)+1});const d=r.closed||0,l=o>0?parseFloat((d/o*100).toFixed(1)):0;return{year:a,total:o,closed:d,open:r.open||0,investigating:r.investigating||0,severity:s,closureRate:l,improvementVsPrevious:null}});return i.forEach((a,n)=>{const o=i[n+1];if(!o||o.total===0)a.improvementVsPrevious=null;else{const s=(o.total-a.total)/o.total*100;a.improvementVsPrevious=parseFloat(s.toFixed(1))}}),i},buildThreeYearAnalytics(){const e=this.getThreeYearIncidents(),t=this.buildYearlyStats(e),{earliestYear:i,currentYear:a}=this.getThreeYearConfig(),n={totalIncidents:e.length,closedIncidents:e.filter(({incident:r})=>this.normalizeStatus(r?.status)==="closed").length};n.closureRate=n.totalIncidents>0?parseFloat((n.closedIncidents/n.totalIncidents*100).toFixed(1)):0,n.averagePerYear=parseFloat((n.totalIncidents/3).toFixed(1)),n.rangeLabel=`${i} - ${a}`;const o=e.reduce((r,{incident:d})=>{const l=this.normalizeSeverity(d?.severity);return r[l]=(r[l]||0)+1,r},{high:0,medium:0,low:0,other:0}),s=t.length>0?t[0].improvementVsPrevious:null;return{incidents:e,yearlyStats:t,totals:n,severityTotals:o,currentImprovement:s}},formatImprovementValue(e){return e===null||Number.isNaN(e)?{label:"\u063A\u064A\u0631 \u0645\u062A\u0627\u062D",className:"text-gray-500",value:null}:e===0?{label:"0%",className:"text-gray-600",value:0}:{label:`${e>0?"+":""}${Math.abs(e).toFixed(1)}%`,className:e>0?"text-green-600":"text-red-600",value:e}},registryData:[],registryCurrentTab:"registry",initRegistry(){try{if(AppState.appData&&AppState.appData.incidentsRegistry)this.registryData=AppState.appData.incidentsRegistry;else{const i=localStorage.getItem("hse_incidents_registry");i?(this.registryData=JSON.parse(i),AppState.appData||(AppState.appData={}),AppState.appData.incidentsRegistry=this.registryData):this.registryData=[]}let t=this._dedupeRegistryData()>0;if(Array.isArray(AppState?.appData?.incidents)&&this.cleanupRegistryOrphans({persist:!1})>0&&(t=!0),t&&AppState.appData){AppState.appData.incidentsRegistry=this.registryData;try{localStorage.setItem("hse_incidents_registry",Utils.safeStringify(this.registryData))}catch{}this._triggerRegistryServerCleanupOnce()}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B:",e),this.registryData=[]}},_triggerRegistryServerCleanupOnce(){this._registryServerCleanupAttempted||(this._registryServerCleanupAttempted=!0,setTimeout(()=>{try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendToAppsScript)return;GoogleIntegration.sendToAppsScript("cleanupIncidentsRegistry",{}).then(e=>{e&&e.success&&(e.removed||0)>0&&Utils.safeLog(`\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 IncidentsRegistry \u0639\u0644\u0649 \u0627\u0644\u0633\u064A\u0631\u0641\u0631: \u062D\u064F\u0630\u0641 ${e.removed} \u0635\u0641 \u0645\u0643\u0631\u0631\u060C \u0623\u064F\u0628\u0642\u064A ${e.kept}`)}).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0646\u0638\u064A\u0641 IncidentsRegistry \u0639\u0644\u0649 \u0627\u0644\u0633\u064A\u0631\u0641\u0631 (\u0633\u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0641\u064A \u062C\u0644\u0633\u0629 \u0644\u0627\u062D\u0642\u0629):",e),this._registryServerCleanupAttempted=!1})}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 IncidentsRegistry:",e),this._registryServerCleanupAttempted=!1}},1500))},_dedupeRegistryData(){if(!Array.isArray(this.registryData))return this.registryData=[],0;const e=new Set,t=new Set,i=[];for(let n=this.registryData.length-1;n>=0;n--){const o=this.registryData[n];if(!o||typeof o!="object")continue;const s=o.id!=null?String(o.id).trim():"",r=o.incidentId!=null&&String(o.incidentId).trim()!==""&&String(o.incidentId).trim()!=="null"?String(o.incidentId).trim():"";s&&e.has(s)||r&&t.has(r)||(s&&e.add(s),r&&t.add(r),i.push(o))}i.reverse();const a=this.registryData.length-i.length;if(a>0){this.registryData=i;try{Utils.safeLog(`\u{1F9F9} IncidentsRegistry: \u062A\u0645 \u0625\u0632\u0627\u0644\u0629 ${a} \u0633\u062C\u0644 \u0645\u0643\u0631\u0631 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638`)}catch{}}return a},async saveRegistryData(e={}){try{const{sync:t=!0}=e||{};return this._dedupeRegistryData(),AppState.appData||(AppState.appData={}),AppState.appData.incidentsRegistry=this.registryData,localStorage.setItem("hse_incidents_registry",Utils.safeStringify(this.registryData)),t&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("IncidentsRegistry",this.registryData),!0}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",t),!1}},generateRegistrySequentialNumber(){const e=new Date().getFullYear();return this.registryData.filter(i=>i.incidentDate?new Date(i.incidentDate).getFullYear()===e:!1).length+1},calculateTotalLeaveDays(e,t){if(!e||!t)return 0;try{const i=r=>{const l=String(r).trim().split("T")[0].split("-").map(c=>parseInt(c,10));return l.length!==3||l.some(c=>!Number.isFinite(c))?null:new Date(l[0],l[1]-1,l[2])},a=i(e),n=i(t);if(!a||!n||isNaN(a.getTime())||isNaN(n.getTime())||n<a)return 0;const o=n.getTime()-a.getTime();return Math.round(o/(1e3*60*60*24))+1}catch(i){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629:",i),0}},resolveRegistryLeaveFields(e,t=null){if((Array.isArray(e?.investigation?.incidentTypes)?e.investigation.incidentTypes:[]).includes("injury-no-lost"))return{leaveStartDate:"",returnToWorkDate:"",totalLeaveDays:0};const a=(...s)=>{for(const r of s){const d=String(r??"").trim();if(d)return d.split("T")[0]}return""},n=a(e?.leaveStartDate,t?.leaveStartDate),o=a(e?.returnToWorkDate,t?.returnToWorkDate);return!n||!o?{leaveStartDate:"",returnToWorkDate:"",totalLeaveDays:0}:{leaveStartDate:n,returnToWorkDate:o,totalLeaveDays:this.calculateTotalLeaveDays(n,o)}},getEmployeeByCode(e){if(!e)return null;try{const t=AppState?.appData?.employees||[],i=String(e).trim().toLowerCase();return t.find(n=>n?[n.employeeCode,n.employeeNumber,n.sapId,n.id,n.code,n.cardId].filter(Boolean).map(s=>String(s).trim().toLowerCase()).some(s=>s===i):!1)||null}catch(t){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u0648\u0638\u0641:",t),null}},_calculateEmployeeAge(e){if(!e)return"";if(e.age!=null&&e.age!==""){const i=parseInt(e.age,10);if(!Number.isNaN(i)&&i>=0)return i}const t=e.birthDate||e.dateOfBirth||e.birth_date||"";if(!t)return"";if(typeof Employees<"u"&&typeof Employees.calculateAge=="function"){const i=Employees.calculateAge(t);if(i!==""&&i!=null)return i}try{const i=new Date(t);if(Number.isNaN(i.getTime()))return"";const a=new Date;let n=a.getFullYear()-i.getFullYear();const o=a.getMonth()-i.getMonth();return(o<0||o===0&&a.getDate()<i.getDate())&&n--,n>=0?n:""}catch{return""}},_applyInvestigationEmployeeToForm(e,t,i={}){if(!e||!t)return;const a=e.querySelector("#investigation-affected-name"),n=e.querySelector("#investigation-affected-job"),o=e.querySelector("#investigation-affected-department"),s=e.querySelector("#investigation-affected-age"),r=e.querySelector("#investigation-affected-employee-code");if(r&&(r.value=t.code||t.employeeNumber||t.sapId||t.id||r.value||""),a&&(a.value=t.name||t.fullName||""),n&&(n.value=t.job||t.position||t.jobTitle||t.title||""),o&&(o.value=t.department||t.section||t.division||t.dept||t.departmentName||""),s){const d=this._calculateEmployeeAge(t);d!==""&&d!=null?s.value=String(d):i.keepExisting||(s.value="")}},_buildInvestigationBodyPartsDatalistOptions(){return(this.BODY_PART_KEYWORDS||[]).map(e=>`<option value="${Utils.escapeHTML(e.label)}"></option>`).join("")},getDayName(e){return["\u0627\u0644\u0623\u062D\u062F","\u0627\u0644\u0625\u062B\u0646\u064A\u0646","\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621","\u0627\u0644\u062E\u0645\u064A\u0633","\u0627\u0644\u062C\u0645\u0639\u0629","\u0627\u0644\u0633\u0628\u062A"][e.getDay()]},determineShift(e){if(!e)return"\u0623\u0648\u0644\u0649";try{const i=(this.normalizeLatinDigits(e).split(":")[0]||"").replace(/[^\d]/g,""),a=parseInt(i,10);return Number.isNaN(a)||a>=6&&a<14?"\u0623\u0648\u0644\u0649":a>=14&&a<22?"\u062B\u0627\u0646\u064A\u0629":"\u062B\u0627\u0644\u062B\u0629"}catch{return"\u0623\u0648\u0644\u0649"}},BODY_PART_KEYWORDS:[{label:"\u0627\u0644\u0631\u0623\u0633 / \u0627\u0644\u0648\u062C\u0647",keywords:["\u0631\u0623\u0633","\u0631\u0627\u0633","\u0648\u062C\u0647","\u0639\u064A\u0646","\u0623\u0646\u0641","\u0641\u0645","\u062C\u0645\u062C\u0645\u0629","\u0623\u0630\u0646","head","face","eye","skull"]},{label:"\u0627\u0644\u0631\u0642\u0628\u0629",keywords:["\u0631\u0642\u0628\u0629","neck"]},{label:"\u0627\u0644\u0635\u062F\u0631",keywords:["\u0635\u062F\u0631","\u0642\u0641\u0635 \u0635\u062F\u0631\u064A","chest","thorax"]},{label:"\u0627\u0644\u0638\u0647\u0631",keywords:["\u0638\u0647\u0631","\u0639\u0645\u0648\u062F \u0641\u0642\u0631\u064A","back","spine"]},{label:"\u0627\u0644\u0628\u0637\u0646",keywords:["\u0628\u0637\u0646","abdomen","stomach"]},{label:"\u0627\u0644\u0630\u0631\u0627\u0639 / \u0627\u0644\u064A\u062F",keywords:["\u0630\u0631\u0627\u0639","\u064A\u062F","\u0625\u0635\u0628\u0639","\u0643\u0648\u0639","\u0645\u0639\u0635\u0645","arm","hand","finger","wrist","elbow"]},{label:"\u0627\u0644\u0633\u0627\u0642 / \u0627\u0644\u0642\u062F\u0645",keywords:["\u0633\u0627\u0642","\u0642\u062F\u0645","\u0631\u0643\u0628\u0629","\u0643\u0627\u062D\u0644","\u0641\u062E\u0630","leg","foot","knee","ankle","thigh"]},{label:"\u0627\u0644\u0643\u062A\u0641",keywords:["\u0643\u062A\u0641","shoulder"]},{label:"\u0625\u0635\u0627\u0628\u0627\u062A \u0645\u062A\u0639\u062F\u062F\u0629",keywords:["\u0645\u062A\u0639\u062F\u062F","\u0639\u062F\u0629 \u0623\u062C\u0632\u0627\u0621","multiple","\u062C\u0633\u0645 \u0643\u0627\u0645\u0644"]}],extractInjuredPart(e,t=""){const i=`${e||""} ${t||""}`.trim().toLowerCase();if(!i)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const n of this.BODY_PART_KEYWORDS)if(n.keywords.some(o=>i.includes(o.toLowerCase())))return n.label;const a=(t||"").trim();return a&&a.length<=80&&a!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?a:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},resolveIncidentInjuredPart(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const t=String(e.injuredPart||"").trim();if(t&&t!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return t;const i=this._parseInvestigationRecord(e),a=String(i?.injuredPart||"").trim();if(a&&a!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return a;const n=String(e.injuryDescription||"").trim();if(n){const s=this.extractInjuredPart("",n);if(s!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return s;if(n.length<=80)return n}const o=(this.registryData||[]).find(s=>s.incidentId===e.id);if(o){const s=String(o.injuredPart||"").trim();if(s&&s!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return s;const r=String(o.injuryDescription||"").trim();if(r){const d=this.extractInjuredPart("",r);if(d!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return d}}return this.extractInjuredPart(e.description||"",n)},getIncidentListReporter(e){if(!e)return"-";const t=this._parseInvestigationRecord(e),i=[e.reportedBy,e.reporterName,t?.reporterName,e.createdBy?.name,e.createdBy?.displayName];for(const a of i){const n=String(a||"").trim();if(n)return n}return"-"},getIncidentAffectedPartyName(e){if(!e)return"";const t=this._parseInvestigationRecord(e),i=String(e.affiliation||t?.affectedAffiliation||e.affectedType||"").trim().toLowerCase(),a=String(e.affectedName||t?.affectedName||e.employeeName||"").trim(),n=String(e.contractorName||(i==="contractor"?e.affectedDepartment||t?.affectedDepartment:"")||"").trim();return i==="contractor"||e.affectedType==="contractor"?a&&n&&a!==n?`${a} \u2014 ${n}`:a||n||"":a},getIncidentListLocation(e){return this._resolveHotspotLabel(e)},renderIncidentListAffectedCell(e){const t=this.getIncidentAffectedPartyName(e),i=String(this.resolveIncidentInjuredPart(e)||"").trim(),a=this._parseInvestigationRecord(e),n=String(e?.equipmentCause||a?.equipmentCause||"").trim(),o=String(e.affectedJobTitle||a?.affectedJob||e.employeeJob||"").trim(),s=[];return t&&s.push(`<div class="font-medium text-gray-800">${Utils.escapeHTML(t)}</div>`),o&&s.push(`<div class="text-xs text-gray-500">${Utils.escapeHTML(o)}</div>`),i&&i!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&s.push(`<div class="text-xs text-gray-600">\u0627\u0644\u062C\u0632\u0621: ${Utils.escapeHTML(i)}</div>`),n&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"&&s.push(`<div class="text-xs text-gray-500">\u0627\u0644\u0645\u0639\u062F\u0629: ${Utils.escapeHTML(n)}</div>`),s.length?s.join(""):"-"},renderIncidentsListRowActions(e,t=!1){const i=e?.id||"";return t?`
                <div class="flex items-center gap-2">
                    <button onclick="Incidents.viewIncident('${i}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.editIncident('${i}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="Incidents.manageWorkflow('${i}')" class="btn-icon btn-icon-warning" title="\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u062F\u0641\u0642">
                        <i class="fas fa-project-diagram"></i>
                    </button>
                    ${this.renderIncidentDeleteButton(i)}
                </div>
            `:`
            <div class="flex items-center gap-2 flex-wrap">
                <button onclick="Incidents.viewIncident('${i}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${i}'); } else { console.error('Incidents.showInvestigationForm is not available'); alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629.'); }" class="btn-icon btn-icon-warning" title="\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B">
                    <i class="fas fa-search"></i>
                </button>
                <button onclick="Incidents.editIncident('${i}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="Incidents.manageWorkflow('${i}')" class="btn-icon btn-icon-warning" title="\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u062F\u0641\u0642">
                    <i class="fas fa-project-diagram"></i>
                </button>
                <button onclick="Incidents.exportPDF('${i}')" class="btn-icon btn-icon-secondary" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                    <i class="fas fa-print"></i>
                </button>
                ${this.renderIncidentDeleteButton(i)}
            </div>
        `},renderIncidentsListRow(e,t=!1){const i=e?.id||"";return`
            <tr data-incident-id="${Utils.escapeHTML(i)}">
                <td>${Utils.escapeHTML(e?.title||"")}</td>
                <td>${Utils.escapeHTML(this.getIncidentListLocation(e))}</td>
                <td>${e?.date?Utils.formatDate(e.date):"-"}</td>
                <td>
                    <span class="badge badge-${this.getSeverityBadgeClass(e?.severity)}">
                        ${e?.severity||"-"}
                    </span>
                </td>
                <td>${Utils.escapeHTML(e?.incidentType||"-")}</td>
                <td>${Utils.escapeHTML(this.getIncidentListReporter(e))}</td>
                <td>${this.renderIncidentListAffectedCell(e)}</td>
                <td>
                    <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(e))}">
                        ${Utils.escapeHTML(this.getIncidentDisplayStatus(e))}
                    </span>
                </td>
                <td>${this.renderWorkflowStatusBadge(e)}</td>
                <td>${this.renderIncidentsListRowActions(e,t)}</td>
            </tr>
        `},_resolveHotspotLabel(e){const t=String(e.siteName||e.factory||"").trim(),i=String(e.sublocationName||e.sublocation||e.location||"").trim();return t&&i&&i!==t?`${t} \u2014 ${i}`:i||t||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_resolveHotspotFactory(e){return String(e.siteName||e.factory||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()},_getBodyPartIcon(e){return{"\u0627\u0644\u0631\u0623\u0633 / \u0627\u0644\u0648\u062C\u0647":"fa-head-side-virus",\u0627\u0644\u0631\u0642\u0628\u0629:"fa-user",\u0627\u0644\u0635\u062F\u0631:"fa-heart-pulse",\u0627\u0644\u0638\u0647\u0631:"fa-person-walking",\u0627\u0644\u0628\u0637\u0646:"fa-circle-dot","\u0627\u0644\u0630\u0631\u0627\u0639 / \u0627\u0644\u064A\u062F":"fa-hand","\u0627\u0644\u0633\u0627\u0642 / \u0627\u0644\u0642\u062F\u0645":"fa-shoe-prints",\u0627\u0644\u0643\u062A\u0641:"fa-user-injured","\u0625\u0635\u0627\u0628\u0627\u062A \u0645\u062A\u0639\u062F\u062F\u0629":"fa-users-rays","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":"fa-question"}[e]||"fa-band-aid"},_getHotspotRankStyle(e){return[{bg:"linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)",border:"#f59e0b",badge:"#b45309",bar:"#f59e0b"},{bg:"linear-gradient(135deg,#f1f5f9 0%,#e2e8f0 100%)",border:"#94a3b8",badge:"#475569",bar:"#64748b"},{bg:"linear-gradient(135deg,#ffedd5 0%,#fed7aa 100%)",border:"#ea580c",badge:"#c2410c",bar:"#f97316"}][e]||{bg:"#fff",border:"#e5e7eb",badge:"#6366f1",bar:"#8b5cf6"}},_buildHotspotStats(e){const t={};return e.forEach(i=>{const a=this._resolveHotspotLabel(i);t[a]||(t[a]={label:a,factory:this._resolveHotspotFactory(i),count:0,high:0,open:0}),t[a].count+=1,this.normalizeSeverity(i?.severity)==="high"&&(t[a].high+=1),this.normalizeStatus(i?.status)==="open"&&(t[a].open+=1)}),Object.values(t).sort((i,a)=>a.count-i.count)},_buildBodyPartStats(e){const t=e.filter(n=>{const o=String(n.incidentType||n.type||"").toLowerCase();return this.resolveIncidentInjuredPart(n)!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"||o.includes("\u0625\u0635\u0627\u0628")||o.includes("injury")||n.injuryDescription}),i=t.length?t:e,a={};return i.forEach(n=>{const s=this.resolveIncidentInjuredPart(n)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[s]=(a[s]||0)+1}),Object.entries(a).sort((n,o)=>o[1]-n[1]).map(([n,o])=>({label:n,count:o}))},_renderIncidentHotspotGrid(e,t){const i=document.getElementById("incident-hotspot-grid");if(!i)return;if(!e.length){i.innerHTML='<div style="text-align:center;padding:32px;color:#94a3b8;font-size:0.88rem;"><i class="fas fa-map-location-dot" style="font-size:2rem;display:block;margin-bottom:10px;opacity:0.5;"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0627\u0642\u0639 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</div>';return}const a=e[0].count||1;i.innerHTML=e.slice(0,8).map((n,o)=>{const s=t>0?Math.round(n.count/t*100):0,r=Math.round(n.count/a*100),d=this._getHotspotRankStyle(o),l=o===0?"\u{1F947}":o===1?"\u{1F948}":o===2?"\u{1F949}":`#${o+1}`;return`
                <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:${d.bg};border:1.5px solid ${d.border};border-radius:14px;transition:transform .2s,box-shadow .2s;"
                    onmouseover="this.style.transform='translateX(-4px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)'"
                    onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;border-radius:12px;background:${d.badge};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${o<3?"1.1rem":"0.85rem"};flex-shrink:0;">${l}</div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:800;font-size:0.9rem;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(n.label)}">${Utils.escapeHTML(n.label)}</div>
                        <div style="font-size:0.72rem;color:#64748b;margin:3px 0 8px;display:flex;gap:10px;flex-wrap:wrap;">
                            <span><i class="fas fa-industry" style="margin-left:4px;color:#0891b2;"></i>${Utils.escapeHTML(n.factory)}</span>
                            ${n.high?`<span style="color:#b91c1c;"><i class="fas fa-fire" style="margin-left:3px;"></i>${n.high} \u0639\u0627\u0644\u064A\u0629</span>`:""}
                            ${n.open?`<span style="color:#b45309;"><i class="fas fa-folder-open" style="margin-left:3px;"></i>${n.open} \u0645\u0641\u062A\u0648\u062D\u0629</span>`:""}
                        </div>
                        <div style="height:8px;background:rgba(0,0,0,0.06);border-radius:99px;overflow:hidden;">
                            <div style="height:100%;width:${r}%;background:linear-gradient(90deg,${d.bar},${d.badge});border-radius:99px;transition:width .6s ease;"></div>
                        </div>
                    </div>
                    <div style="text-align:center;flex-shrink:0;min-width:56px;">
                        <div style="font-size:1.35rem;font-weight:900;color:${d.badge};line-height:1;">${n.count}</div>
                        <div style="font-size:0.65rem;color:#64748b;">\u062D\u0627\u062F\u062B</div>
                        <div style="margin-top:4px;font-size:0.72rem;font-weight:700;color:#fff;background:${d.badge};padding:2px 8px;border-radius:10px;">${s}%</div>
                    </div>
                </div>`}).join("")},_renderIncidentBodyPartList(e,t){const i=document.getElementById("incident-bodypart-list");if(!i)return;const a=e.filter(r=>r.label!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),n=a.length?a:e;if(!n.length){i.innerHTML='<div style="text-align:center;padding:24px;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062C\u0632\u0627\u0621 \u0645\u062A\u0636\u0631\u0631\u0629</div>';return}const o=n[0].count||1,s=["#dc2626","#ea580c","#d97706","#ca8a04","#65a30d","#0891b2","#7c3aed","#db2777"];i.innerHTML=n.slice(0,8).map((r,d)=>{const l=t>0?Math.round(r.count/t*100):0,c=Math.round(r.count/o*100),u=s[d%s.length],p=this._getBodyPartIcon(r.label);return`
                <div style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:#fff;border:1px solid #fecaca;border-radius:12px;margin-bottom:8px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:${u}18;color:${u};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas ${p}" style="font-size:16px;"></i>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="font-weight:700;font-size:0.85rem;color:#374151;">${Utils.escapeHTML(r.label)}</span>
                            <span style="font-weight:800;font-size:0.9rem;color:${u};">${r.count} <span style="font-size:0.65rem;font-weight:600;color:#94a3b8;">(${l}%)</span></span>
                        </div>
                        <div style="height:6px;background:#fef2f2;border-radius:99px;overflow:hidden;">
                            <div style="height:100%;width:${c}%;background:${u};border-radius:99px;"></div>
                        </div>
                    </div>
                </div>`}).join("")},extractEquipmentCause(e,t=""){const i=String(t||"").trim();return i&&i!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?i:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},createRegistryEntry(e){if(!e||!e.id)return null;const t=this.generateRegistrySequentialNumber(),i=this.getIncidentDateValue(e)||new Date,a=i&&!Number.isNaN(i.getTime())?i.toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"",n=i&&!Number.isNaN(i.getTime())?this.getDayName(i):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let o=e.affectedCode||e.employeeCode||"",s=e.affectedName||"",r=e.affectedJobTitle||"",d=e.affectedDepartment||"";if(o){const c=this.getEmployeeByCode(o);c&&(s=c.name||s,r=c.job||r,d=c.department||d)}const l=this.resolveRegistryLeaveFields(e);return{id:Utils.generateId("INCR"),sequentialNumber:t,incidentId:e.id,factory:e.siteName||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",incidentLocation:e.sublocationName||e.sublocation||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",incidentDate:i&&!Number.isNaN(i.getTime())?i.toISOString():new Date().toISOString(),incidentDay:n,incidentTime:a,shift:this.determineShift(a),employeeCode:o,employeeName:s,employeeJob:r,employeeDepartment:d,incidentDetails:e.description||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",injuredPart:this.resolveIncidentInjuredPart(e),equipmentCause:this.extractEquipmentCause(e.description||"",e.equipmentCause),leaveStartDate:l.leaveStartDate,returnToWorkDate:l.returnToWorkDate,totalLeaveDays:l.totalLeaveDays,status:e.status||"\u0645\u0641\u062A\u0648\u062D",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},async addToRegistry(e,t={}){const{persist:i=!0}=t;if(this.registryData.find(o=>o.incidentId===e.id))return this.updateRegistryEntry(e,t);const n=this.createRegistryEntry(e);return n&&(this.registryData.push(n),i&&await this.saveRegistryData(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B #${n.sequentialNumber} \u0641\u064A \u0627\u0644\u0633\u062C\u0644`)),!!n},async updateRegistryEntry(e,t={}){const{persist:i=!0}=t,a=this.registryData.findIndex(p=>p.incidentId===e.id);if(a===-1)return this.addToRegistry(e,t);const n=this.registryData[a],o=this.getIncidentDateValue(e)||new Date,s=o&&!Number.isNaN(o.getTime())?o.toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"";let r=e.affectedCode||e.employeeCode||n.employeeCode,d=e.affectedName||n.employeeName,l=e.affectedJobTitle||n.employeeJob,c=e.affectedDepartment||n.employeeDepartment;if(r){const p=this.getEmployeeByCode(r);p&&(d=p.name||d,l=p.job||l,c=p.department||c)}n.factory=e.siteName||e.location||n.factory,n.incidentLocation=e.sublocationName||e.sublocation||e.location||n.incidentLocation,n.incidentDate=o&&!Number.isNaN(o.getTime())?o.toISOString():n.incidentDate||new Date().toISOString(),n.incidentDay=o&&!Number.isNaN(o.getTime())?this.getDayName(o):n.incidentDay||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n.incidentTime=s,n.shift=this.determineShift(s),n.employeeCode=r,n.employeeName=d,n.employeeJob=l,n.employeeDepartment=c,n.incidentDetails=e.description||n.incidentDetails,n.injuredPart=this.resolveIncidentInjuredPart(e),n.equipmentCause=this.extractEquipmentCause(e.description||"",e.equipmentCause);const u=this.resolveRegistryLeaveFields(e,n);return n.leaveStartDate=u.leaveStartDate,n.returnToWorkDate=u.returnToWorkDate,n.totalLeaveDays=u.totalLeaveDays,n.status=this.isInvestigationComplete(e)?"\u0645\u0643\u062A\u0645\u0644":e.status==="\u0645\u0641\u062A\u0648\u062D"?"\u0645\u0641\u062A\u0648\u062D":e.status||n.status||"\u0645\u0641\u062A\u0648\u062D",n.updatedAt=new Date().toISOString(),this.registryData[a]=n,i&&await this.saveRegistryData(),!0},async removeFromRegistry(e){const t=this.registryData.findIndex(i=>i.incidentId===e);t!==-1&&(this.registryData.splice(t,1),await this.saveRegistryData())},async syncRegistryWithIncidents(){try{if(!AppState||!AppState.appData){Utils.safeWarn("AppState \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629");return}const e=this.getCanonicalIncidents(),t=50,i=e.slice(0,t);let a=!1;for(const o of i)if(!(!o||!o.id))try{const s=this.registryData.find(l=>l.incidentId===o.id),r=o.updatedAt||o.createdAt||"",d=s?.updatedAt||s?.createdAt||"";if(s&&r&&d&&r===d)continue;s?await this.updateRegistryEntry(o,{persist:!1})&&(a=!0):await this.addToRegistry(o,{persist:!1})&&(a=!0)}catch(s){Utils.safeWarn(`\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u062D\u0627\u062F\u062B ${o.id}:`,s);continue}if(a&&await this.saveRegistryData(),this.cleanupRegistryOrphans({persist:!1})>0&&(await this.saveRegistryData(),a=!0),a&&this.currentTab==="registry"){const o=document.getElementById("incidents-tab-content");o&&(o.innerHTML=await this.renderRegistryTab(),this.setupTabEventListeners("registry"))}e.length>t&&Utils.safeLog(`\u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 ${t} \u0645\u0646 ${e.length} \u062D\u0627\u062F\u062B`)}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644:",e)}},currentTab:"annual-log",async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);try{const e=document.getElementById("incidents-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 incidents-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 Incidents \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: incidents-section");try{this.initRegistry()}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0633\u062C\u0644:",a),this.registryData=[]}this.normalizeAllIncidentsApprovalState();const t=()=>{this.syncRegistryWithIncidents().catch(a=>{typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644:",a)})};typeof requestIdleCallback=="function"?requestIdleCallback(t,{timeout:4e3}):setTimeout(t,800);let i="";try{i=await this.renderMainView()}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629:",a),i='<div class="content-card"><div class="card-body"><p class="text-red-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0648\u0627\u062C\u0647\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>'}e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-exclamation-triangle ml-3"></i>
                                \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                            </h1>
                            <p class="section-subtitle">\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="add-incident-notification-btn" class="btn-secondary">
                                <i class="fas fa-bell ml-2"></i>
                                \u0625\u062E\u0637\u0627\u0631 \u0639\u0646 \u062D\u0627\u062F\u062B
                            </button>
                            <button id="open-investigation-form-btn" class="btn-primary">
                                <i class="fas fa-search ml-2"></i>
                                \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B
                            </button>
                        </div>
                    </div>
                </div>
                <div id="incidents-content" class="mt-6">
                    ${i}
                </div>
            `,this.applyModuleI18n(e),this.ensureI18nObservers(e);try{this.setupEventListeners(),this.switchTab(this.currentTab)}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0645\u0639\u064A\u0646:",a)}}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u0627\u062F\u062D \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B:",e);const t=document.getElementById("incidents-section");t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="text-center py-8">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                                <h2 class="text-xl font-bold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h2>
                                <p class="text-gray-600 mb-4">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-sync ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(t))}},async renderMainView(){const e=this.getAllowedTabs();return`
            <div class="tabs-container">
                <div class="tabs-nav">
                    ${e.includes("registry")?`
                    <button class="tab-btn active" data-tab="registry" onclick="Incidents.switchTab('registry')">
                        <i class="fas fa-clipboard-list"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                    </button>
                    `:""}
                    ${e.includes("detailed-log")?`
                    <button class="tab-btn ${e.includes("registry")?"":"active"}" data-tab="detailed-log" onclick="Incidents.switchTab('detailed-log')">
                        <i class="fas fa-clipboard-list"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A
                    </button>
                    `:""}
                    ${e.includes("incidents-list")?`
                    <button class="tab-btn ${!e.includes("registry")&&!e.includes("detailed-log")?"active":""}" data-tab="incidents-list" onclick="Incidents.switchTab('incidents-list')">
                        <i class="fas fa-list"></i>
                        \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                    </button>
                    `:""}
                    ${e.includes("annual-log")?`
                    <button class="tab-btn" data-tab="annual-log" onclick="Incidents.switchTab('annual-log')">
                        <i class="fas fa-calendar-alt"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0646\u0648\u064A
                    </button>
                    `:""}
                    ${e.includes("analysis")?`
                    <button class="tab-btn" data-tab="analysis" onclick="Incidents.switchTab('analysis')">
                        <i class="fas fa-chart-line"></i>
                        \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                    </button>
                    `:""}
                    ${e.includes("approvals")?`
                    <button class="tab-btn" data-tab="approvals" onclick="Incidents.switchTab('approvals')">
                        <i class="fas fa-check-circle"></i>
                        \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A
                    </button>
                    `:""}
                    ${e.includes("safety-alerts")?`
                    <button class="tab-btn" data-tab="safety-alerts" onclick="Incidents.switchTab('safety-alerts')">
                        <i class="fas fa-exclamation-triangle"></i>
                        \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0639\u0646 \u062D\u0627\u062F\u062B
                    </button>
                    `:""}
                </div>
            </div>
            <div id="incidents-tab-content" class="mt-6">
                ${await this.renderTabContent(e[0]||"incidents-list")}
            </div>
        `},getAllowedTabs(){const e=AppState.currentUser;if(!e)return["incidents-list"];if(e.role==="admin"||e.permissions&&(e.permissions.admin===!0||e.permissions["manage-modules"]===!0))return["registry","detailed-log","incidents-list","annual-log","analysis","approvals","safety-alerts"];if(typeof Permissions<"u"&&!Permissions.hasAccess("incidents"))return[];const t=[],i=["registry","detailed-log","incidents-list","annual-log","analysis","approvals","safety-alerts"];return i.forEach(a=>{typeof Permissions<"u"&&Permissions.hasDetailedPermission("incidents",a)&&t.push(a)}),t.length===0?i:t},async switchTab(e){this.currentTab=e,document.querySelectorAll(".tabs-nav .tab-btn").forEach(i=>{i.classList.remove("active"),i.dataset.tab===e&&i.classList.add("active")});const t=document.getElementById("incidents-tab-content");t&&(t.innerHTML=await this.renderTabContent(e),this.applyModuleI18n(t),this.setupTabEventListeners(e))},async renderTabContent(e){try{if(!this.getAllowedTabs().includes(e))return`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="text-center py-8">
                                <i class="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628.</p>
                                <p class="text-sm text-gray-500 mt-2">\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.</p>
                            </div>
                        </div>
                    </div>
                `;switch(e){case"registry":return await this.renderRegistryTab();case"detailed-log":return await this.renderDetailedLogTab();case"incidents-list":return await this.renderIncidentsListTab();case"annual-log":return await this.renderAnnualLogTab();case"analysis":return await this.renderAnalysisTab();case"approvals":return await this.renderApprovalsTab();case"safety-alerts":return await this.renderSafetyAlertsTab();default:return await this.renderIncidentsListTab()}}catch(t){return Utils.safeError(`\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,t),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</h2>
                            <p class="text-gray-600">${t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        </div>
                    </div>
                </div>
            `}},async renderAnnualLogTab(){const e=this.buildThreeYearAnalytics(),{yearlyStats:t,totals:i,severityTotals:a}=e,n=this.formatImprovementValue(e.currentImprovement),o=i.totalIncidents>0,s=t.map(d=>{const l=this.formatImprovementValue(d.improvementVsPrevious);return`
                <tr>
                    <td>${d.year}</td>
                    <td>${d.total}</td>
                    <td>${d.closed}</td>
                    <td>${d.closureRate.toFixed(1)}%</td>
                    <td>
                        <div class="space-y-1 text-xs">
                            <div><span class="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>\u0639\u0627\u0644\u064A\u0629: ${d.severity.high}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-yellow-500 ml-1"></span>\u0645\u062A\u0648\u0633\u0637\u0629: ${d.severity.medium}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-blue-500 ml-1"></span>\u0645\u0646\u062E\u0641\u0636\u0629: ${d.severity.low}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-gray-500 ml-1"></span>\u0623\u062E\u0631\u0649: ${d.severity.other}</div>
                        </div>
                    </td>
                    <td>
                        <span class="font-semibold ${l.className}">${l.label}</span>
                    </td>
                </tr>
            `}).join(""),r=o?s:'<tr><td colspan="6" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A.</td></tr>';return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <h2 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0646\u0648\u064A (\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A)
                        </h2>
                        <div class="flex items-center gap-2">
                            <button id="incidents-report-preview" class="btn-secondary">
                                <i class="fas fa-eye ml-2"></i>
                                \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                            </button>
                            <button class="btn-primary" data-incidents-export="pdf">
                                <i class="fas fa-file-pdf ml-2"></i>
                                PDF
                            </button>
                            <button class="btn-primary" data-incidents-export="excel">
                                <i class="fas fa-file-excel ml-2"></i>
                                Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</p>
                            <p class="text-3xl font-bold text-gray-900">${i.totalIncidents}</p>
                            <p class="text-xs text-gray-400 mt-1">\u0627\u0644\u0641\u062A\u0631\u0629: ${i.rangeLabel}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</p>
                            <p class="text-3xl font-bold text-green-600">${i.closureRate.toFixed(1)}%</p>
                            <p class="text-xs text-gray-400 mt-1">\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629: ${i.closedIncidents}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0639\u0646 \u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642</p>
                            <p class="text-3xl font-bold ${n.className}">${n.label}</p>
                            <p class="text-xs text-gray-400 mt-1">\u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0646\u0629 ${t[0]?.year||""} \u0645\u0639 ${t[1]?.year||""}</p>
                        </div>
                    </div>
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u0633\u0646\u0629</th>
                                    <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                                    <th>\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629</th>
                                    <th>\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                                    <th>\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0634\u062F\u0629</th>
                                    <th>\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${r}
                            </tbody>
                        </table>
                    </div>
                    <p class="text-xs text-gray-500 mt-3">
                        * \u064A\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0646\u062E\u0641\u0627\u0636 \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642 (\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0639\u062F\u062F \u062A\u0639\u0646\u064A \u062A\u0631\u0627\u062C\u0639 \u0627\u0644\u0623\u062F\u0627\u0621).
                    </p>
                </div>
            </div>
        `},async renderDetailedLogTab(){const e=this.buildThreeYearAnalytics(),t=n=>{if(!n)return"-";try{if(typeof Utils<"u"){if(typeof Utils.formatDateTime=="function")return Utils.formatDateTime(n instanceof Date?n.toISOString():n);if(typeof Utils.formatDate=="function")return Utils.formatDate(n instanceof Date?n.toISOString():n)}}catch{}const o=n instanceof Date?n:new Date(n);return Number.isNaN(o.getTime())?"-":o.toLocaleDateString("ar-SA")},i=e.incidents.map(({incident:n,date:o,year:s})=>{const r=this.getSeverityBadgeClass(n?.severity),d=this.getStatusBadgeClass(n?.status),l=n?.id||"",c=l?`
                <div class="flex items-center gap-2 justify-end">
                    <button onclick="Incidents.viewIncident('${l}')" class="btn-icon btn-icon-info" title="\u0645\u0639\u0627\u064A\u0646\u0629">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.exportPDF('${l}')" class="btn-icon btn-icon-primary" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            `:'<span class="text-xs text-gray-400">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D</span>';return`
                <tr>
                    <td>${s}</td>
                    <td>${t(o)}</td>
                    <td>${Utils.escapeHTML(n?.title||"-")}</td>
                    <td>${Utils.escapeHTML(n?.location||"-")}</td>
                    <td>
                        <span class="badge badge-${r}">
                            ${Utils.escapeHTML(n?.severity||"-")}
                        </span>
                    </td>
                    <td>
                        <span class="badge badge-${d}">
                            ${Utils.escapeHTML(n?.status||"-")}
                        </span>
                    </td>
                    <td>${c}</td>
                </tr>
            `}).join(""),a=e.incidents.length===0?'<tr><td colspan="7" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u0633\u062C\u0644\u0629 \u062E\u0644\u0627\u0644 \u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A.</td></tr>':i;return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-clipboard-list ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A (\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A)
                        </h2>
                        <span class="text-xs text-gray-500">
                            ${e.incidents.length} \u062D\u0627\u062F\u062B \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u0633\u0646\u0629</th>
                                    <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                    <th>\u0627\u0644\u0634\u062F\u0629</th>
                                    <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${a}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `},async renderIncidentsListTab(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                        </h2>
                        <div class="flex items-center gap-4">
                            <input 
                                type="text" 
                                id="incidents-search" 
                                class="form-input" 
                                style="max-width: 300px;"
                                placeholder="\u0627\u0644\u0628\u062D\u062B..."
                            >
                            <select id="incidents-filter-status" class="form-input" style="max-width: 200px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u0645\u0641\u062A\u0648\u062D</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642">\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</option>
                                <option value="\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A">\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">\u0645\u0643\u062A\u0645\u0644</option>
                                <option value="\u0645\u063A\u0644\u0642">\u0645\u063A\u0644\u0642</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="incidents-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderAnalysisTab(){return this._incidentEnsureChartJS().catch(()=>{}),`
        <div id="incident-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(220,38,38,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-triangle-exclamation" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0643\u0631\u0627\u0631\u0627\u064B \u2022 \u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631\u0629 \u2022 \u0627\u0644\u0634\u062F\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((e,t)=>{const i=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],a=(this._incidentPeriod||"0")===e;return`<button class="incident-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${a?"#fff":"rgba(255,255,255,0.15)"};color:${a?"#991b1b":"#fff"};">${i[t]}</button>`}).join("")}
                    </div>
                    <button id="incident-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="incident-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button id="incident-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="incident-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u2550\u2550 -->
            <div id="incident-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#dc2626;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#991b1b;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="incident-filter-count" style="background:#fee2e2;color:#b91c1c;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="incident-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#fef2f2';this.style.color='#dc2626'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"incident-af-status",icon:"fas fa-flag",color:"#6366f1",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"incident-af-severity",icon:"fas fa-exclamation",color:"#dc2626",label:"\u0627\u0644\u0634\u062F\u0629"},{id:"incident-af-type",icon:"fas fa-tag",color:"#0d9488",label:"\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B"},{id:"incident-af-dept",icon:"fas fa-building",color:"#f59e0b",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"incident-af-factory",icon:"fas fa-industry",color:"#0891b2",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"incident-af-loc",icon:"fas fa-map-marker-alt",color:"#8b5cf6",label:"\u0627\u0644\u0645\u0648\u0642\u0639"}].map(e=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${e.icon}" style="color:${e.color};margin-left:4px;"></i>${e.label}
                            </label>
                            <select id="${e.id}" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2550\u2550 KPI Cards \u2550\u2550 -->
            <div id="incident-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2550\u2550 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-flag" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-status"></canvas>
                        <div id="incident-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u062D\u0648\u0627\u062F\u062B (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-trend"></canvas>
                        <div id="incident-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 2: \u0627\u0644\u0634\u062F\u0629 + \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-gauge-high" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-severity"></canvas>
                        <div id="incident-chart-severity-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tags" style="color:#0d9488;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-type"></canvas>
                        <div id="incident-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 3: \u0627\u0644\u0645\u0635\u0646\u0639 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0891b2;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-factory"></canvas>
                        <div id="incident-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-dept"></canvas>
                        <div id="incident-chart-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 4: \u0646\u0642\u0627\u0637 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 + \u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border:1.5px solid #e9d5ff;">
                    <div style="padding:14px 18px;background:linear-gradient(135deg,#4c1d95 0%,#7c3aed 100%);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-map-location-dot"></i>
                            </div>
                            <div>
                                <div style="font-weight:800;font-size:0.92rem;">\u0646\u0642\u0627\u0637 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u2014 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0643\u0631\u0627\u0631\u0627\u064B</div>
                                <div style="font-size:0.7rem;opacity:0.85;">\u062A\u0631\u062A\u064A\u0628 \u062D\u0633\u0628 \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0645\u0639 \u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0643\u0631\u0627\u0631</div>
                            </div>
                        </div>
                        <span id="incident-hotspot-total-badge" style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;"></span>
                    </div>
                    <div id="incident-hotspot-grid" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;max-height:420px;overflow-y:auto;">
                        <div style="text-align:center;padding:24px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
                    </div>
                    <div style="padding:0 12px 14px;">
                        <div style="position:relative;height:200px;">
                            <canvas id="incident-chart-hotspot"></canvas>
                            <div id="incident-chart-hotspot-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                        </div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border:1.5px solid #fecaca;">
                    <div style="padding:14px 18px;background:linear-gradient(135deg,#991b1b 0%,#dc2626 100%);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-user-injured"></i>
                            </div>
                            <div>
                                <div style="font-weight:800;font-size:0.92rem;">\u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631\u0629</div>
                                <div style="font-size:0.7rem;opacity:0.85;">\u062A\u0648\u0632\u064A\u0639 \u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u062C\u0633\u0645 \u062D\u0633\u0628 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</div>
                            </div>
                        </div>
                        <span id="incident-bodypart-total-badge" style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:12px;position:relative;height:200px;border-bottom:1px solid #fee2e2;">
                        <canvas id="incident-chart-bodypart"></canvas>
                        <div id="incident-chart-bodypart-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0635\u0627\u0628\u0627\u062A</div>
                    </div>
                    <div id="incident-bodypart-list" style="padding:12px 14px;max-height:280px;overflow-y:auto;">
                        <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 5: \u0627\u0644\u0645\u0648\u0642\u0639 (\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A) \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-map-marker-alt" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A \u2014 \u0623\u0639\u0644\u0649 10)</span>
                </div>
                <div style="padding:12px;position:relative;height:280px;">
                    <canvas id="incident-chart-loc"></canvas>
                    <div id="incident-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550 \u0645\u0642\u0627\u0631\u0646\u0629 \u0633\u0646\u0648\u064A\u0629 (3 \u0633\u0646\u0648\u0627\u062A) \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-column" style="color:#b91c1c;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 (\u0622\u062E\u0631 3 \u0633\u0646\u0648\u0627\u062A)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="incident-chart-yearly"></canvas>
                    <div id="incident-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550 \u062C\u062F\u0648\u0644 \u0623\u062D\u062F\u062B \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-list-ul" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u062D\u062F\u062B \u0627\u0644\u062D\u0648\u0627\u062F\u062B</span>
                    </div>
                    <span id="incident-recent-count" style="background:#fef2f2;color:#b91c1c;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fef2f2;">
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#991b1b;">\u0627\u0644\u0634\u062F\u0629</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#991b1b;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody id="incident-recent-tbody">
                            <tr><td colspan="6" style="padding:24px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `},async _incidentEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{let i=0;const a=setInterval(()=>{typeof Chart<"u"?(clearInterval(a),t(!0)):++i>50&&(clearInterval(a),t(!1))},100)}):new Promise(t=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>t(!1),document.head.appendChild(a)},document.head.appendChild(i)})},_getIncidentsData(){try{typeof this.ensureData=="function"&&this.ensureData()}catch{}return this.getCanonicalIncidents()},async updateIncidentAnalyticsDashboard(){const e=document.getElementById("incident-analytics-root");if(!e)return;const t=this._getIncidentsData(),i=parseInt(this._incidentPeriod||"0",10),a=i>0?(()=>{const k=new Date;return k.setDate(k.getDate()-i),k})():null,n=a?t.filter(k=>{const _=this.getIncidentDateValue(k);return _&&_>=a}):t.slice();this._incidentPopulateFilters(n);const o=this._incidentApplyFilters(n),s=o.length,r=document.getElementById("incident-filter-count");r&&(r.textContent=`${s} \u062D\u0627\u062F\u062B`);const d=k=>o.filter(_=>this.normalizeStatus(_?.status)===k).length,l=k=>o.filter(_=>this.normalizeSeverity(_?.severity)===k).length,c=d("open"),u=d("investigating"),p=d("closed"),m=l("high"),f=s>0?Math.round(p/s*100):0,g=new Date,x=o.filter(k=>{const _=this.getIncidentDateValue(k);return _&&_.getFullYear()===g.getFullYear()&&_.getMonth()===g.getMonth()}).length,w=new Set(o.map(k=>{const _=this.getIncidentDateValue(k);return _?`${_.getFullYear()}-${_.getMonth()}`:null}).filter(Boolean)),y=w.size>0?(s/w.size).toFixed(1):0,A=document.getElementById("incident-kpi-strip");if(A){const k=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B",value:s,icon:"fas fa-triangle-exclamation",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0645\u0641\u062A\u0648\u062D\u0629",value:c,icon:"fas fa-folder-open",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642",value:u,icon:"fas fa-magnifying-glass",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u063A\u0644\u0642\u0629",value:p,icon:"fas fa-circle-check",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629",value:m,icon:"fas fa-fire",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{label:"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642",value:f+"%",icon:"fas fa-chart-pie",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:x,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:y,icon:"fas fa-calendar-check",color:"#7c3aed",bg:"#f5f3ff",border:"#ddd6fe"}];A.innerHTML=k.map(_=>`
                <div style="background:${_.bg};border:1px solid ${_.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${_.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${_.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${_.color};line-height:1;">${_.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${_.label}</div>
                    </div>
                </div>`).join("")}if(!await this._incidentEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647 \u0645\u062A\u0627\u062D\u0629.</span></div>');return}const v={open:"\u0645\u0641\u062A\u0648\u062D\u0629",investigating:"\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642",closed:"\u0645\u063A\u0644\u0642\u0629",other:"\u0623\u062E\u0631\u0649"},$={};o.forEach(k=>{const _=v[this.normalizeStatus(k?.status)]||"\u0623\u062E\u0631\u0649";$[_]=($[_]||0)+1});const F={\u0645\u0641\u062A\u0648\u062D\u0629:"rgba(245,158,11,0.85)","\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"rgba(99,102,241,0.85)",\u0645\u063A\u0644\u0642\u0629:"rgba(5,150,105,0.85)",\u0623\u062E\u0631\u0649:"rgba(148,163,184,0.8)"};this._iDoughnut("incident-chart-status",Object.keys($),Object.values($),Object.keys($).map(k=>F[k]||"rgba(148,163,184,0.8)")),this._iTrend("incident-chart-trend",t);const b={high:"\u0639\u0627\u0644\u064A\u0629",medium:"\u0645\u062A\u0648\u0633\u0637\u0629",low:"\u0645\u0646\u062E\u0641\u0636\u0629",other:"\u0623\u062E\u0631\u0649"},T={};o.forEach(k=>{const _=b[this.normalizeSeverity(k?.severity)]||"\u0623\u062E\u0631\u0649";T[_]=(T[_]||0)+1});const M={\u0639\u0627\u0644\u064A\u0629:"rgba(220,38,38,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(59,130,246,0.85)",\u0623\u062E\u0631\u0649:"rgba(148,163,184,0.8)"};this._iDoughnut("incident-chart-severity",Object.keys(T),Object.values(T),Object.keys(T).map(k=>M[k]||"rgba(148,163,184,0.8)"));const R=this._iGroupBy(o,k=>k.incidentType||k.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._iHBar("incident-chart-type",R.labels,R.data,"rgba(13,148,136,0.75)");const D=this._iGroupBy(o,k=>k.siteName||k.factory||k.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._iHBar("incident-chart-factory",D.labels,D.data,"rgba(8,145,178,0.75)");const P=this._iGroupBy(o,k=>k.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._iHBar("incident-chart-dept",P.labels,P.data,"rgba(245,158,11,0.75)");const E=this._iGroupBy(o,k=>k.sublocationName||k.sublocation||k.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._iHBar("incident-chart-loc",E.labels,E.data,"rgba(139,92,246,0.75)");const B=this._buildHotspotStats(o),U=this._buildBodyPartStats(o);this._renderIncidentHotspotGrid(B,s),this._renderIncidentBodyPartList(U,s);const S=document.getElementById("incident-hotspot-total-badge");S&&(S.textContent=`${B.length} \u0645\u0648\u0642\u0639`);const q=document.getElementById("incident-bodypart-total-badge");q&&(q.textContent=`${U.filter(k=>k.label!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").length||U.length} \u062C\u0632\u0621`);const j=B.slice(0,6);this._iHBar("incident-chart-hotspot",j.map(k=>k.label),j.map(k=>k.count),"rgba(124,58,237,0.8)");const N=U.filter(k=>k.label!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").slice(0,8),H=N.length?N:U.slice(0,8),V=["#dc2626","#ea580c","#d97706","#ca8a04","#65a30d","#0891b2","#7c3aed","#db2777"];H.length?this._iDoughnut("incident-chart-bodypart",H.map(k=>k.label),H.map(k=>k.count),H.map((k,_)=>V[_%V.length]+"d9")):this._iDoughnut("incident-chart-bodypart",[],[],[]),this._iYearly("incident-chart-yearly",t);const O=o.slice().sort((k,_)=>{const h=this.getIncidentDateValue(k),L=this.getIncidentDateValue(_);return(L?L.getTime():0)-(h?h.getTime():0)}).slice(0,20),Y=document.getElementById("incident-recent-count");Y&&(Y.textContent=`${O.length} \u062D\u0627\u062F\u062B`);const G=document.getElementById("incident-recent-tbody");if(G){const k=h=>{const L=this.normalizeSeverity(h),C={high:["\u0639\u0627\u0644\u064A\u0629","#fef2f2","#b91c1c"],medium:["\u0645\u062A\u0648\u0633\u0637\u0629","#fffbeb","#b45309"],low:["\u0645\u0646\u062E\u0641\u0636\u0629","#eff6ff","#1d4ed8"],other:["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","#f1f5f9","#475569"]},[W,z,J]=C[L]||C.other;return`<span style="background:${z};color:${J};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${W}</span>`},_=h=>{const L=this.normalizeStatus(h),C={open:["\u0645\u0641\u062A\u0648\u062D\u0629","#fffbeb","#b45309"],investigating:["\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642","#eef2ff","#4338ca"],closed:["\u0645\u063A\u0644\u0642\u0629","#ecfdf5","#047857"],other:["\u0623\u062E\u0631\u0649","#f1f5f9","#475569"]},[W,z,J]=C[L]||C.other;return`<span style="background:${z};color:${J};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${W}</span>`};G.innerHTML=O.length===0?'<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':O.map((h,L)=>{const C=this.getIncidentDateValue(h),W=C?C.toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"}):"\u2014",z=L%2===0?"#fff":"#fafafa",J=h.siteName||h.factory||h.location||"\u2014",K=h.sublocationName||h.sublocation||h.location||"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${z};" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='${z}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${W}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.incidentType||h.type||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.department||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(J)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(K)}</td>
                        <td style="padding:9px 12px;text-align:center;">${k(h.severity)}</td>
                        <td style="padding:9px 12px;text-align:center;">${_(h.status)}</td>
                    </tr>`}).join("")}},_incidentPopulateFilters(e){const t=o=>[...new Set(e.map(o).filter(Boolean))].sort(),i=(o,s)=>{const r=document.getElementById(o);if(!r)return;const d=r.value;r.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+s.map(l=>`<option value="${Utils.escapeHTML(String(l))}"${l===d?" selected":""}>${Utils.escapeHTML(String(l))}</option>`).join("")},a=document.getElementById("incident-af-status");if(a){const o=a.value;a.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="open"${o==="open"?" selected":""}>\u0645\u0641\u062A\u0648\u062D\u0629</option><option value="investigating"${o==="investigating"?" selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</option><option value="closed"${o==="closed"?" selected":""}>\u0645\u063A\u0644\u0642\u0629</option>`}const n=document.getElementById("incident-af-severity");if(n){const o=n.value;n.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="high"${o==="high"?" selected":""}>\u0639\u0627\u0644\u064A\u0629</option><option value="medium"${o==="medium"?" selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option><option value="low"${o==="low"?" selected":""}>\u0645\u0646\u062E\u0641\u0636\u0629</option>`}i("incident-af-type",t(o=>String(o.incidentType||o.type||"").trim())),i("incident-af-dept",t(o=>String(o.department||"").trim())),i("incident-af-factory",t(o=>String(o.siteName||o.factory||o.location||"").trim())),i("incident-af-loc",t(o=>String(o.sublocationName||o.sublocation||o.location||"").trim()))},_incidentApplyFilters(e){const t=c=>{const u=document.getElementById(c);return u?u.value.trim():""},i=t("incident-af-status"),a=t("incident-af-severity"),n=t("incident-af-type"),o=t("incident-af-dept"),s=t("incident-af-factory"),r=t("incident-af-loc"),d=[i,a,n,o,s,r].some(c=>c!==""),l=document.getElementById("incident-filter-badge");return l&&(l.style.display=d?"inline":"none"),e.filter(c=>!(i&&this.normalizeStatus(c?.status)!==i||a&&this.normalizeSeverity(c?.severity)!==a||n&&String(c.incidentType||c.type||"").trim()!==n||o&&String(c.department||"").trim()!==o||s&&String(c.siteName||c.factory||c.location||"").trim()!==s||r&&String(c.sublocationName||c.sublocation||c.location||"").trim()!==r))},_iGroupBy(e,t,i=0){const a={};e.forEach(o=>{const s=t(o)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[s]=(a[s]||0)+1});let n=Object.entries(a).sort((o,s)=>s[1]-o[1]);return i>0&&(n=n.slice(0,i)),{labels:n.map(o=>o[0]),data:n.map(o=>o[1])}},_iDoughnut(e,t,i,a){const n=document.getElementById(e),o=document.getElementById(e+"-empty");if(!n)return;if(!i.length||i.reduce((r,d)=>r+d,0)===0){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="",this._incidentCharts||(this._incidentCharts={});try{this._incidentCharts[e]&&this._incidentCharts[e].destroy()}catch{}const s=i.reduce((r,d)=>r+d,0);this._incidentCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:a,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:r=>` ${r.label}: ${r.parsed} (${s>0?(r.parsed/s*100).toFixed(1):0}%)`}}}}})},_iHBar(e,t,i,a){const n=document.getElementById(e),o=document.getElementById(e+"-empty");if(n){if(!i.length||i.reduce((s,r)=>s+r,0)===0){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="",this._incidentCharts||(this._incidentCharts={});try{this._incidentCharts[e]&&this._incidentCharts[e].destroy()}catch{}this._incidentCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:a||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>` ${s.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:s=>String(t[s]).length>18?String(t[s]).slice(0,17)+"\u2026":t[s]}}}}})}},_iTrend(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const n=new Date,o=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],s=[];for(let l=11;l>=0;l--){const c=new Date(n.getFullYear(),n.getMonth()-l,1);s.push({y:c.getFullYear(),m:c.getMonth(),label:`${o[c.getMonth()]} ${c.getFullYear()}`})}const r=s.map(l=>t.filter(c=>{const u=this.getIncidentDateValue(c);return u&&u.getFullYear()===l.y&&u.getMonth()===l.m}).length);if(r.reduce((l,c)=>l+c,0)===0){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="",this._incidentCharts||(this._incidentCharts={});try{this._incidentCharts[e]&&this._incidentCharts[e].destroy()}catch{}const d=Math.max(...r);this._incidentCharts[e]=new Chart(i,{type:"bar",data:{labels:s.map(l=>l.label),datasets:[{label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B",data:r,backgroundColor:r.map(l=>l===d?"rgba(220,38,38,0.9)":"rgba(220,38,38,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_iYearly(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const o=this.getThreeYearConfig().years.slice().sort((d,l)=>d-l),s=o.map(d=>t.filter(l=>{const c=this.getIncidentDateValue(l);return c&&c.getFullYear()===d}).length),r=o.map(d=>t.filter(l=>{const c=this.getIncidentDateValue(l);return c&&c.getFullYear()===d&&this.normalizeStatus(l?.status)==="closed"}).length);if(s.reduce((d,l)=>d+l,0)===0){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="",this._incidentCharts||(this._incidentCharts={});try{this._incidentCharts[e]&&this._incidentCharts[e].destroy()}catch{}this._incidentCharts[e]=new Chart(i,{type:"bar",data:{labels:o.map(String),datasets:[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B",data:s,backgroundColor:"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1},{label:"\u0627\u0644\u0645\u063A\u0644\u0642\u0629",data:r,backgroundColor:"rgba(5,150,105,0.75)",borderRadius:5,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_incidentBindAnalyticsEvents(){const e=document.getElementById("incident-analytics-root");if(!e)return;e.querySelectorAll(".incident-period-btn").forEach(s=>{s.addEventListener("click",()=>{this._incidentPeriod=s.getAttribute("data-period"),e.querySelectorAll(".incident-period-btn").forEach(r=>{const d=r===s;r.style.background=d?"#fff":"rgba(255,255,255,0.15)",r.style.color=d?"#991b1b":"#fff"}),this.updateIncidentAnalyticsDashboard()})});const t=document.getElementById("incident-analytics-refresh");t&&t.addEventListener("click",()=>this.updateIncidentAnalyticsDashboard());const i=document.getElementById("incident-export-pdf-btn");i&&i.addEventListener("click",()=>this._incidentExportPDF());const a=document.getElementById("incident-toggle-filters-btn"),n=document.getElementById("incident-filter-panel");a&&n&&a.addEventListener("click",()=>{const s=n.style.display!=="none";n.style.display=s?"none":"block",a.style.background=s?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const o=document.getElementById("incident-filter-reset-btn");o&&o.addEventListener("click",()=>{["incident-af-status","incident-af-severity","incident-af-type","incident-af-dept","incident-af-factory","incident-af-loc"].forEach(s=>{const r=document.getElementById(s);r&&(r.value="")}),this.updateIncidentAnalyticsDashboard()}),["incident-af-status","incident-af-severity","incident-af-type","incident-af-dept","incident-af-factory","incident-af-loc"].forEach(s=>{const r=document.getElementById(s);r&&r.addEventListener("change",()=>this.updateIncidentAnalyticsDashboard())})},_incidentBuildReportHeaderEl(e,t){const i=AppState&&(AppState.companySettings?.name||AppState.companyName)||"",a=AppState&&AppState.companySettings?.secondaryName||"",n=AppState&&AppState.companyLogo||AppState&&AppState.companySettings?.logo||"",o=n?this.convertGoogleDriveLinkToPrintable(n):"",s=new Date().toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"}),r=document.createElement("div");return r.id="incident-pdf-report-header",r.style.cssText="background:#fff;border-bottom:3px solid #dc2626;border-radius:12px;padding:16px 22px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:16px;direction:rtl;font-family:Tahoma,Arial,sans-serif;",r.innerHTML=`
            <div style="flex:0 0 auto;min-width:90px;text-align:right;">
                ${o?`<img src="${o}" alt="" crossorigin="anonymous" style="max-height:64px;max-width:170px;object-fit:contain;">`:""}
            </div>
            <div style="flex:1;text-align:center;">
                <div style="font-size:1.5rem;font-weight:800;color:#991b1b;line-height:1.2;">${Utils.escapeHTML(e||"\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</div>
                ${t?`<div style="font-size:0.95rem;font-weight:600;color:#dc2626;margin-top:3px;">${Utils.escapeHTML(t)}</div>`:""}
                <div style="font-size:0.8rem;color:#6b7280;margin-top:5px;"><i class="fas fa-calendar-day" style="margin-left:4px;"></i>${s}</div>
            </div>
            <div style="flex:0 0 auto;min-width:90px;text-align:left;">
                <div style="font-size:1.05rem;font-weight:700;color:#1f2937;line-height:1.3;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(i||"")}</div>
                ${a?`<div style="font-size:0.85rem;font-weight:500;color:#6b7280;margin-top:2px;">${Utils.escapeHTML(a)}</div>`:""}
            </div>
        `,r},async _incidentExportPDF(){const e=document.getElementById("incident-analytics-root");if(!e)return;const t=document.getElementById("incident-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');const a=this._incidentBuildReportHeaderEl("\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B","Incidents Analysis Report");e.insertBefore(a,e.firstChild);const n=a.querySelector("img");n&&!n.complete&&await new Promise(o=>{n.onload=o,n.onerror=o,setTimeout(o,2500)});try{const o=(I,v)=>new Promise(($,F)=>{if(v())return $();const b=document.createElement("script");b.src=I,b.onload=()=>$(),b.onerror=()=>F(),document.head.appendChild(b)});await o("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await o("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const s=document.getElementById("incident-filter-panel"),r=s&&s.style.display!=="none";r&&(s.style.display="none");const d=await html2canvas(e,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});r&&(s.style.display="");const{jsPDF:l}=window.jspdf,c=new l({orientation:"portrait",unit:"mm",format:"a4"}),u=c.internal.pageSize.getWidth(),p=c.internal.pageSize.getHeight(),m=10,f=8,g=u-m*2,x=g/d.width,w=p-m-f,y=w/x,A=Math.ceil(d.height/y);for(let I=0;I<A;I++){I>0&&c.addPage();const v=document.createElement("canvas"),$=Math.min(y,d.height-I*y);v.width=d.width,v.height=$,v.getContext("2d").drawImage(d,0,I*y,d.width,$,0,0,d.width,$),c.addImage(v.toDataURL("image/jpeg",.92),"JPEG",m,m,g,$*x),c.setDrawColor(220,38,38),c.setLineWidth(.4),c.line(m,p-f+1,u-m,p-f+1),c.setTextColor(120,120,120),c.setFontSize(8),c.text(`${new Date().toISOString().slice(0,10)}`,m,p-3,{align:"left"}),c.text(`${I+1} / ${A}`,u-m,p-3,{align:"right"})}c.save(`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u062D\u0648\u0627\u062F\u062B-${new Date().toISOString().slice(0,10)}.pdf`),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B PDF \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("Incident PDF error:",o),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{a&&a.parentNode&&a.parentNode.removeChild(a),t&&(t.disabled=!1,t.innerHTML=i)}},async renderRegistryTab(){try{return this.renderRegistryContent()}catch(e){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0633\u062C\u0644:",e),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h2>
                            <p class="text-gray-600">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        </div>
                    </div>
                </div>
            `}},renderRegistryContent(){const e=this.getUnifiedIncidentCounts(),t=e.total,i=e.open,a=e.investigating,n=e.completed,o=e.closed;return`
            <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0627\u0644\u0625\u062F\u062E\u0627\u0644 -->
            <div class="flex justify-between items-center gap-2 mb-4">
                <button id="incidents-registry-add-manual" class="btn-success">
                    <i class="fas fa-plus-circle ml-2"></i>
                    \u0625\u0636\u0627\u0641\u0629 \u062D\u0627\u062F\u062B / Add Incident
                </button>
                <div class="flex gap-2">
                    <button id="incidents-registry-export-excel" class="btn-secondary">
                        <i class="fas fa-file-excel ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button id="incidents-registry-export-pdf" class="btn-primary">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                </div>
            </div>
            
            <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-list-ol"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h3>
                        <p class="kpi-value">${t}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-primary">
                    <div class="kpi-icon"><i class="fas fa-folder-open"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">\u062D\u0648\u0627\u062F\u062B \u0645\u0641\u062A\u0648\u062D\u0629</h3>
                        <p class="kpi-value">${i}</p>
                    </div>
                </div>
                        <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-search"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</h3>
                        <p class="kpi-value">${a}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-check-double"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">\u0645\u0643\u062A\u0645\u0644\u0629</h3>
                        <p class="kpi-value">${n}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">\u062D\u0648\u0627\u062F\u062B \u0645\u063A\u0644\u0642\u0629</h3>
                        <p class="kpi-value">${o}</p>
                    </div>
                </div>
            </div>
            
            <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B -->
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-search ml-2"></i>\u0628\u062D\u062B
                            </label>
                            <input type="text" id="incidents-registry-search" class="form-input" placeholder="\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641...">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-filter ml-2"></i>\u0627\u0644\u062D\u0627\u0644\u0629
                            </label>
                            <select id="incidents-registry-filter-status" class="form-input">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u0645\u0641\u062A\u0648\u062D</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642">\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">\u0645\u0643\u062A\u0645\u0644</option>
                                <option value="\u0645\u063A\u0644\u0642">\u0645\u063A\u0644\u0642</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E
                            </label>
                            <input type="date" id="incidents-registry-filter-date-from" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E
                            </label>
                            <input type="date" id="incidents-registry-filter-date-to" class="form-input">
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644 -->
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-table ml-2"></i>
                        \u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B (${t} \u0633\u062C\u0644)
                    </h2>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        ${this.renderRegistryTable()}
                    </div>
                </div>
            </div>
        `},renderRegistryTable(){const e=this.getLinkedRegistryEntries();if(e.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</p>
                    <p class="text-sm text-gray-400 mt-2">\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u062D\u0648\u0627\u062F\u062B \u062C\u062F\u064A\u062F\u0629</p>
                </div>
            `;const t=[...e].sort((n,o)=>new Date(o.createdAt)-new Date(n.createdAt)),i=n=>{if(!n)return"-";try{return new Date(n).toLocaleDateString("ar-SA")}catch{return"-"}};let a=`
            <table class="data-table">
                <thead>
                    <tr>
                        <th>\u0645\u0633\u0644\u0633\u0644</th>
                        <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                        <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u0648\u0631\u062F\u064A\u0629</th>
                        <th>\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                        <th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628</th>
                        <th>\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629</th>
                        <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</th>
                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
        `;return t.forEach(n=>{const o=n.status==="\u0645\u0641\u062A\u0648\u062D"?"bg-blue-100 text-blue-800":n.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642"?"bg-yellow-100 text-yellow-800":n.status==="\u0645\u0643\u062A\u0645\u0644"?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800";a+=`
                <tr>
                    <td>${n.sequentialNumber||"-"}</td>
                    <td>${Utils.escapeHTML(n.factory||"-")}</td>
                    <td>${Utils.escapeHTML(n.incidentLocation||"-")}</td>
                    <td>${i(n.incidentDate)}</td>
                    <td>${Utils.escapeHTML(n.incidentDay||"-")}</td>
                    <td>${Utils.escapeHTML(n.incidentTime||"-")}</td>
                    <td>${Utils.escapeHTML(n.shift||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeCode||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeName||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeJob||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeDepartment||"-")}</td>
                    <td>${Utils.escapeHTML((n.incidentDetails||"-").substring(0,50))}${(n.incidentDetails||"").length>50?"...":""}</td>
                    <td>${Utils.escapeHTML(n.injuredPart||"-")}</td>
                    <td>${Utils.escapeHTML(n.equipmentCause||"-")}</td>
                    <td>${n.totalLeaveDays||0} \u064A\u0648\u0645</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <button onclick="Incidents.viewRegistryEntry('${n.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${n.incidentId?`
                                <button onclick="Incidents.viewIncident('${n.incidentId}')" class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u062F\u062B">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </button>
                                <button onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${n.incidentId}'); } else { alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D'); }" class="btn-icon btn-icon-warning" title="\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B">
                                    <i class="fas fa-search"></i>
                                </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}),a+=`
                </tbody>
            </table>
        `,a},async renderSafetyAlertsTab(){try{let e=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.callAppsScript)try{const i=await GoogleIntegration.callAppsScript("getAllSafetyAlerts",{});i&&i.success&&i.data&&(e=i.data,AppState.appData||(AppState.appData={}),AppState.appData.safetyAlerts=e)}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u0646 Backend:",i)}e.length===0&&(e=AppState.appData?.safetyAlerts||[]),e.sort((i,a)=>{const n=new Date(i.incidentDate||i.createdAt||0);return new Date(a.incidentDate||a.createdAt||0)-n});const t=this.canCreateSafetyAlert();return`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-exclamation-circle ml-2"></i>
                            Safety Alerts
                        </h2>
                        <div class="flex items-center gap-2">
                            ${t?`
                            <button class="btn-primary" onclick="Incidents.showSafetyAlertForm()">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0646\u0634\u0627\u0621 Safety Alert
                            </button>
                            `:""}
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">
                            Safety Alert \u0647\u0648 \u0623\u062F\u0627\u0629 \u062A\u0648\u0639\u0648\u064A\u0629 \u0644\u0646\u0634\u0631 \u0627\u0644\u0648\u0639\u064A \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629 \u0648\u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B.
                        </p>
                        <div class="table-wrapper" style="overflow-x: auto;">
                            ${e.length>0?`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0631\u0642\u0645 Safety Alert</th>
                                        <th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B</th>
                                        <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0625\u0639\u062F\u0627\u062F</th>
                                        <th>\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${e.map(i=>`
                                        <tr>
                                            <td>${Utils.escapeHTML(i.alertNumber||i.sequentialNumber||"")}</td>
                                            <td>${Utils.escapeHTML(i.incidentType||"")}</td>
                                            <td>${i.incidentDate?new Date(i.incidentDate).toLocaleDateString("ar-SA"):""}</td>
                                            <td>${Utils.escapeHTML(i.incidentLocation||"")}</td>
                                            <td>
                                                <span class="badge badge-${i.status==="\u0645\u0639\u062A\u0645\u062F"?"success":"warning"}">
                                                    ${Utils.escapeHTML(i.status||"\u0645\u0633\u0648\u062F\u0629")}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(i.preparedBy||"")}</td>
                                            <td>${Utils.escapeHTML(i.approvedBy||"-")}</td>
                                            <td>${i.issueDate?new Date(i.issueDate).toLocaleDateString("ar-SA"):"-"}</td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button onclick="Incidents.viewSafetyAlert('${i.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    ${i.status!=="\u0645\u0639\u062A\u0645\u062F"&&t?`
                                                    <button onclick="Incidents.editSafetyAlert('${i.id}')" class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    `:""}
                                                    ${i.status!=="\u0645\u0639\u062A\u0645\u062F"&&this.canApproveSafetyAlert()?`
                                                    <button onclick="Incidents.approveSafetyAlert('${i.id}')" class="btn-icon btn-icon-success" title="\u0627\u0639\u062A\u0645\u0627\u062F">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    `:""}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                            `:`
                            <div class="empty-state">
                                <i class="fas fa-exclamation-circle text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F Safety Alerts \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</p>
                                ${t?`
                                <button class="btn-primary mt-4" onclick="Incidents.showSafetyAlertForm()">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u0625\u0646\u0634\u0627\u0621 Safety Alert \u062C\u062F\u064A\u062F
                                </button>
                                `:""}
                            </div>
                            `}
                        </div>
                    </div>
                </div>
            `}catch(e){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 Safety Alerts:",e),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 Safety Alerts</h2>
                            <p class="text-gray-600">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        </div>
                    </div>
                </div>
            `}},async viewSafetyAlert(e){const t=(AppState.appData?.safetyAlerts||[]).find(r=>r.id===e);if(!t){Notification.error("Safety Alert \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=document.createElement("div");i.className="modal-overlay";const a=AppState?.companySettings?.name||AppState?.companyName||"",n=AppState?.companySettings?.secondaryName,o=n!=null?String(n).trim():"",s=AppState?.companyLogo||"";i.innerHTML=`
            <style>
                .safety-alert-view-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid #e5e7eb;
                    margin-bottom: 20px;
                    min-height: 60px;
                }
                .safety-alert-view-grey-bar {
                    background: #9ca3af;
                    height: 4px;
                    margin: 20px 0;
                    border-radius: 2px;
                }
                .safety-alert-view-grey-label {
                    background: #9ca3af;
                    color: white;
                    padding: 12px;
                    text-align: center;
                    font-weight: 600;
                    border-radius: 4px;
                }
                .safety-alert-view-yellow-box {
                    background: #fbbf24;
                    padding: 8px;
                    text-align: center;
                    border-radius: 6px;
                    border: 2px solid #f59e0b;
                    display: inline-block;
                    max-width: 100%;
                }
                .safety-alert-view-yellow-box img {
                    max-width: 100%;
                    max-height: 350px;
                    border-radius: 4px;
                    object-fit: contain;
                    display: block;
                }
                .safety-alert-view-header-box {
                    background: #9ca3af;
                    color: white;
                    padding: 16px;
                    text-align: center;
                    font-weight: 700;
                    font-size: 1.2rem;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .safety-alert-view-number {
                    color: #dc2626;
                    font-weight: 700;
                    font-size: 1.5rem;
                    text-align: center;
                    margin: 10px 0;
                }
            </style>
            <div class="modal-content" style="max-width: 1200px; width: 95%; background: #f8f9fa;">
                <div class="modal-header" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-exclamation-circle ml-2"></i>
                        \u0639\u0631\u0636 Safety Alert
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <!-- Header Section with Company Logo and Name -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="flex: 1; text-align: right;">
                            ${s?`
                                <img src="${s}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" style="max-height: 80px; max-width: 200px; object-fit: contain;">
                            `:""}
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                            <div class="safety-alert-view-number" style="font-size: 12px;">${Utils.escapeHTML(t.sequentialNumber||"001")}</div>
                            <div class="safety-alert-view-header-box" style="margin-top: 10px;">${Utils.escapeHTML(t.incidentType||"")}</div>
                        </div>
                        <div style="flex: 1; text-align: left;">
                            <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                                <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(a||"")}</div>
                                ${o?`<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(o)}</div>`:""}
                            </div>
                        </div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div class="safety-alert-view-grey-label">\u0623\u064A\u0646</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(t.incidentLocation||"")}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">\u0645\u062A\u0649</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${t.incidentDate?new Date(t.incidentDate).toLocaleDateString("ar-SA"):""}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">\u0645\u0646</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(t.who||"")}
                            </div>
                        </div>
                    </div>

                    ${t.locationImage||t.causesImage?`
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        ${t.locationImage?`
                        <div style="text-align: center;">
                            <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                            <div class="safety-alert-view-yellow-box">
                                <img src="${this.convertGoogleDriveLinkToPrintable(t.locationImage)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0643\u0627\u0646" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain;">
                            </div>
                        </div>
                        `:"<div></div>"}
                        ${t.causesImage?`
                        <div style="text-align: center;">
                            <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                            <div class="safety-alert-view-yellow-box">
                                <img src="${this.convertGoogleDriveLinkToPrintable(t.causesImage)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0633\u0628\u0627\u0628" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain;">
                            </div>
                        </div>
                        `:""}
                    </div>
                    `:""}

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u062F\u062B :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(t.description||"")}</div>
                    </div>

                    ${t.facts?`
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u062D\u0642\u0627\u0626\u0642 \u0639\u0646 \u0627\u0644\u062D\u0627\u062F\u062B :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(t.facts)}</div>
                    </div>
                    `:""}

                    ${t.causes?`
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0627\u0644\u0623\u0633\u0628\u0627\u0628 :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(t.causes)}</div>
                    </div>
                    `:""}

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629 :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(t.lessonsLearned||"")}</div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u062F\u062B :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(t.preventiveMeasures||"")}</div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <div class="safety-alert-view-grey-label">\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(t.notificationNumber||t.sequentialNumber||"")}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">\u0625\u0639\u062F\u0627\u062F</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(t.preparedBy||"")}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">\u0627\u0639\u062A\u0645\u0627\u062F</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(t.approvedBy||"-")}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${t.issueDate?new Date(t.issueDate).toLocaleDateString("ar-SA"):"-"}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-4 pt-4">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            \u0625\u063A\u0644\u0627\u0642
                        </button>
                        <button type="button" class="btn-success" onclick="Incidents.exportSafetyAlertPDF('${e}')">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",r=>{r.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()})},async deleteSafetyAlert(e){try{if(!AppState.currentUser||AppState.currentUser.role!=="admin"){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647...");const t=await GoogleIntegration.sendRequest({action:"deleteSafetyAlert",data:{alertId:e}});if(Loading.hide(),t&&t.success){if(Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="safety-alerts"){const i=document.getElementById("incidents-tab-content");i&&(i.innerHTML=await this.renderSafetyAlertsTab(),this.setupTabEventListeners("safety-alerts"))}}else Notification.error(t?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0646\u0628\u064A\u0647")}},async showSafetyAlertForm(e=null,t=null){const i=document.createElement("div");i.className="modal-overlay";let a=null;e&&(a=(AppState.appData?.safetyAlerts||[]).find(g=>g.id===e));let n=null;t?n=(AppState.appData?.incidents||[]).find(g=>g.id===t):a?.incidentId&&(n=(AppState.appData?.incidents||[]).find(g=>g.id===a.incidentId));const o=!!e,s=a?.sequentialNumber||this.generateSafetyAlertSequentialNumber(),r=AppState?.companySettings?.name||AppState?.companyName||"",d=AppState?.companySettings?.secondaryName||"",l=AppState?.companyLogo||"";i.innerHTML=`
            <style>
                .safety-alert-grey-bar {
                    background: #9ca3af;
                    height: 4px;
                    margin: 20px 0;
                    border-radius: 2px;
                }
                .safety-alert-grey-label {
                    background: #9ca3af;
                    color: white;
                    padding: 12px;
                    text-align: center;
                    font-weight: 600;
                    border-radius: 4px;
                }
                .safety-alert-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid #e5e7eb;
                    margin-top: 10px;
                }
                .safety-alert-yellow-box {
                    background: #fbbf24;
                    padding: 8px;
                    text-align: center;
                    border-radius: 6px;
                    border: 2px solid #f59e0b;
                    display: inline-block;
                    max-width: 100%;
                }
                .safety-alert-yellow-box img {
                    max-width: 100%;
                    max-height: 350px;
                    border-radius: 4px;
                    object-fit: contain;
                    display: block;
                }
                .incident-type-checkbox {
                    margin: 8px;
                }
            </style>
            <div class="modal-content" style="max-width: 1000px; width: 95%; max-height: 90vh; overflow-y: auto; background: #f8f9fa;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-exclamation-circle ml-2"></i>
                        ${o?"\u062A\u0639\u062F\u064A\u0644 Safety Alert":"\u0625\u0646\u0634\u0627\u0621 Safety Alert"}
                    </h2>
                    <button class="modal-close" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <form id="safety-alert-form">
                        <!-- Header with Company Logo and Name -->
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="flex: 1; text-align: right;">
                                ${l?`
                                    <img src="${l}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" style="max-height: 80px; max-width: 200px; object-fit: contain;">
                                `:""}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                                <div style="color: #dc2626; font-weight: 700; font-size: 12px;" id="safety-alert-number-display">${s}</div>
                            </div>
                            <div style="flex: 1; text-align: left;">
                                <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                                    <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(r||"")}</div>
                                    ${d?`<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(d)}</div>`:""}
                                </div>
                            </div>
                        </div>

                        <input type="hidden" id="safety-alert-id" value="${e||""}">
                        <input type="hidden" id="safety-alert-incident-id" value="${t||a?.incidentId||n?.id||""}">
                        <input type="hidden" id="safety-alert-incident-type" value="${a?.incidentType||""}">
                        <input type="hidden" id="safety-alert-status" value="${a?.status||"\u0645\u0633\u0648\u062F\u0629"}">

                        <!-- Incident Type (Checkboxes) -->
                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-grey-label">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                        <div class="safety-alert-field" style="margin-top: 10px;">
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-general" 
                                        ${a?.incidentType==="\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B"?"checked":""}>
                                    \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-serious"
                                        ${a?.incidentType==="\u062D\u0627\u062F\u062B \u062C\u0633\u064A\u0645"?"checked":""}>
                                    \u062D\u0627\u062F\u062B \u062C\u0633\u064A\u0645
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-fire"
                                        ${a?.incidentType==="\u062D\u0627\u062F\u062B \u062D\u0631\u064A\u0642"?"checked":""}>
                                    \u062D\u0627\u062F\u062B \u062D\u0631\u064A\u0642
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-other"
                                        ${a?.incidentType&&a.incidentType!=="\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B"&&a.incidentType!=="\u062D\u0627\u062F\u062B \u062C\u0633\u064A\u0645"&&a.incidentType!=="\u062D\u0627\u062F\u062B \u062D\u0631\u064A\u0642"?"checked":""}>
                                    \u0627\u062E\u0631\u0649
                                </label>
                            </div>
                            <div id="incident-type-other-input-container" style="margin-top: 15px; display: none;">
                                <input type="text" id="incident-type-other-input" class="form-input" 
                                    placeholder="\u062D\u062F\u062F \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0622\u062E\u0631"
                                    value="${a?.incidentType&&a.incidentType!=="\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B"&&a.incidentType!=="\u062D\u0627\u062F\u062B \u062C\u0633\u064A\u0645"&&a.incidentType!=="\u062D\u0627\u062F\u062B \u062D\u0631\u064A\u0642"?Utils.escapeHTML(a.incidentType):""}"
                                    style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
                            </div>
                        </div>

                        <!-- Incident Details -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                            <div>
                                <div class="safety-alert-grey-label">\u0623\u064A\u0646</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-location" class="form-input" 
                                        value="${Utils.escapeHTML(a?.incidentLocation||n?.location||n?.siteName||"")}" 
                                        placeholder="\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">\u0645\u062A\u0649</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="date" id="safety-alert-date" class="form-input" 
                                        value="${this.safeDateToISOString(a?.incidentDate||n?.date,10)}"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">\u0645\u0646</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-who" class="form-input" 
                                        value="${Utils.escapeHTML(a?.who||"")}" 
                                        placeholder="\u0645\u0646"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                        </div>

                        <!-- Images -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="text-align: center;">
                                <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                                <div class="safety-alert-yellow-box">
                                    <input type="file" id="safety-alert-location-image-input" accept="image/*" 
                                        onchange="Incidents.handleSafetyAlertImage(this, 'safety-alert-location-image-preview')" 
                                        style="display: none;">
                                    <input type="hidden" id="safety-alert-location-image" value="${a?.locationImage||""}">
                                    ${a?.locationImage?`
                                        <div id="safety-alert-location-image-preview">
                                            <img src="${this.convertGoogleDriveLinkToPrintable(a.locationImage)}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">
                                        </div>
                                    `:`
                                        <label for="safety-alert-location-image-input" style="cursor: pointer; display: block; padding: 10px;">
                                            <i class="fas fa-camera text-2xl text-gray-600 mb-2"></i>
                                            <div style="font-size: 0.85rem;">\u0627\u0636\u063A\u0637 \u0644\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629</div>
                                        </label>
                                        <div id="safety-alert-location-image-preview" style="display: none;"></div>
                                    `}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                                <div class="safety-alert-yellow-box">
                                    <input type="file" id="safety-alert-causes-image-input" accept="image/*" 
                                        onchange="Incidents.handleSafetyAlertImage(this, 'safety-alert-causes-image-preview')" 
                                        style="display: none;">
                                    <input type="hidden" id="safety-alert-causes-image" value="${a?.causesImage||""}">
                                    ${a?.causesImage?`
                                        <div id="safety-alert-causes-image-preview">
                                            <img src="${this.convertGoogleDriveLinkToPrintable(a.causesImage)}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">
                                        </div>
                                    `:`
                                        <label for="safety-alert-causes-image-input" style="cursor: pointer; display: block; padding: 10px;">
                                            <i class="fas fa-camera text-2xl text-gray-600 mb-2"></i>
                                            <div style="font-size: 0.85rem;">\u0627\u0636\u063A\u0637 \u0644\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629</div>
                                        </label>
                                        <div id="safety-alert-causes-image-preview" style="display: none;"></div>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062D\u0627\u062F\u062B :</label>
                            <textarea id="safety-alert-description" class="form-input" rows="5"
                                placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062D\u0627\u062F\u062B"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(a?.description||"")}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u062D\u0642\u0627\u0626\u0642 \u0639\u0646 \u0627\u0644\u062D\u0627\u062F\u062B :</label>
                            <textarea id="safety-alert-facts" class="form-input" rows="5"
                                placeholder="\u0627\u0644\u062D\u0642\u0627\u0626\u0642 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0639\u0646 \u0627\u0644\u062D\u0627\u062F\u062B"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(a?.facts||"")}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0627\u0644\u0623\u0633\u0628\u0627\u0628 :</label>
                            <textarea id="safety-alert-causes" class="form-input" rows="5"
                                placeholder="\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(a?.causes||"")}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629 :</label>
                            <textarea id="safety-alert-lessons" class="form-input" rows="5" required
                                placeholder="\u0623\u0647\u0645 \u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(a?.lessonsLearned||"")}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u062F\u062B :</label>
                            <textarea id="safety-alert-preventive" class="form-input" rows="5" required
                                placeholder="\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0648\u0642\u0627\u0626\u064A\u0629 \u0639\u0627\u0645\u0629"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(a?.preventiveMeasures||"")}</textarea>
                        </div>

                        <!-- Footer Fields -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                            <div>
                                <div class="safety-alert-grey-label">\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-notification-number" class="form-input" 
                                        value="${Utils.escapeHTML(a?.notificationNumber||a?.sequentialNumber||n?.notificationNumber||s)}" 
                                        placeholder="\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">\u0625\u0639\u062F\u0627\u062F</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-prepared-by" class="form-input" 
                                        value="${Utils.escapeHTML(a?.preparedBy||AppState.currentUser?.name||"")}" 
                                        placeholder="\u0625\u0639\u062F\u0627\u062F"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">\u0627\u0639\u062A\u0645\u0627\u062F</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-approved-by" class="form-input" 
                                        value="${Utils.escapeHTML(a?.approvedBy||"")}" 
                                        placeholder="\u0627\u0639\u062A\u0645\u0627\u062F"
                                        style="border: none; width: 100%;" ${a?.status==="\u0645\u0639\u062A\u0645\u062F"?"readonly":""}>
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="date" id="safety-alert-issue-date" class="form-input" 
                                        value="${this.safeDateToISOString(a?.issueDate,10)}"
                                        style="border: none; width: 100%;" ${a?.status==="\u0645\u0639\u062A\u0645\u062F"?"readonly":""}>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 form-actions-centered">
                            <button type="button" class="btn-secondary safety-alert-close-btn">
                                \u0625\u063A\u0644\u0627\u0642
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printSafetyAlert('${e||""}')" title="\u0637\u0628\u0627\u0639\u0629 Safety Alert">
                                <i class="fas fa-print ml-2"></i>
                                \u0637\u0628\u0627\u0639\u0629
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportSafetyAlertPDF('${e||""}')" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                \u062D\u0641\u0638
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(i),setTimeout(()=>{const g=i.querySelectorAll(".incident-type-checkbox"),x=document.getElementById("safety-alert-incident-type"),w=document.getElementById("incident-type-other-input-container"),y=document.getElementById("incident-type-other-input"),A=document.getElementById("incident-type-other"),I=()=>{const F=Array.from(g).find(b=>b.checked);if(F){const b={"incident-type-general":"\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B","incident-type-serious":"\u062D\u0627\u062F\u062B \u062C\u0633\u064A\u0645","incident-type-fire":"\u062D\u0627\u062F\u062B \u062D\u0631\u064A\u0642","incident-type-other":"\u0627\u062E\u0631\u0649"};w&&(F.id==="incident-type-other"?(w.style.display="block",y&&y.focus()):(w.style.display="none",y&&(y.value=""))),x&&(F.id==="incident-type-other"&&y&&y.value.trim()?x.value=y.value.trim():x.value=b[F.id]||"\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B")}};g.forEach(F=>{F.addEventListener("change",b=>{b.target.checked&&g.forEach(T=>{T!==b.target&&(T.checked=!1)}),I()})}),y&&y.addEventListener("input",()=>{A&&A.checked&&x&&(x.value=y.value.trim()||"\u0627\u062E\u0631\u0649")}),A&&A.checked&&w&&(w.style.display="block");const v=document.getElementById("safety-alert-notification-number"),$=document.getElementById("safety-alert-number-display");if(v&&$&&!v.value){const F=$.textContent.trim();v.value=F}},100);let c=!1,u=null;const p=i.querySelector("#safety-alert-form"),m=p?.querySelector('button[type="submit"]');setTimeout(()=>{p&&(u=new FormData(p)),p?.addEventListener("input",()=>{c=!0}),p?.addEventListener("change",()=>{c=!0})},100),p?.addEventListener("submit",async g=>{g.preventDefault(),!m?.disabled&&await this.handleSafetyAlertSubmit(i,e,m)});const f=g=>{g.preventDefault(),g.stopPropagation(),c?confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.
\u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0648\u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)&&(c=!1,i.remove()):i.remove()};i.querySelectorAll(".modal-close, .safety-alert-close-btn").forEach(g=>{g.addEventListener("click",f)}),i.addEventListener("click",g=>{g.target===i&&(c?confirm(`\u062A\u0646\u0628\u064A\u0647: \u0644\u062F\u064A\u0643 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.
\u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0648\u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)&&(c=!1,i.remove()):i.remove())})},async handleSafetyAlertSubmit(e,t,i=null){try{const a=!!t;let n=null;i&&(i.disabled=!0,n=i.innerHTML,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const o=()=>{i&&n&&(i.disabled=!1,i.innerHTML=n)},s=document.getElementById("safety-alert-incident-type"),r=document.getElementById("incident-type-other-input"),d=document.getElementById("incident-type-other");let l=s?.value||"\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B";d&&d.checked&&r&&r.value.trim()&&(l=r.value.trim());const c=document.getElementById("safety-alert-number-display"),u=c?c.textContent.trim():String((AppState.appData?.safetyAlerts||[]).length+1).padStart(3,"0"),p={id:t||Utils.generateId("SA"),alertNumber:document.getElementById("safety-alert-notification-number")?.value||`SA-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,"0")}-${String((AppState.appData?.safetyAlerts||[]).length+1).padStart(4,"0")}`,sequentialNumber:u,incidentId:document.getElementById("safety-alert-incident-id")?.value||"",incidentType:l,incidentDate:document.getElementById("safety-alert-date")?.value||"",incidentLocation:document.getElementById("safety-alert-location")?.value||"",who:document.getElementById("safety-alert-who")?.value||"",description:document.getElementById("safety-alert-description")?.value||"",facts:document.getElementById("safety-alert-facts")?.value||"",causes:document.getElementById("safety-alert-causes")?.value||"",lessonsLearned:document.getElementById("safety-alert-lessons")?.value||"",preventiveMeasures:document.getElementById("safety-alert-preventive")?.value||"",locationImage:document.getElementById("safety-alert-location-image")?.value||"",causesImage:document.getElementById("safety-alert-causes-image")?.value||"",notificationNumber:document.getElementById("safety-alert-notification-number")?.value||u,preparedBy:document.getElementById("safety-alert-prepared-by")?.value||"",approvedBy:document.getElementById("safety-alert-approved-by")?.value||"",issueDate:document.getElementById("safety-alert-issue-date")?.value||"",status:document.getElementById("safety-alert-status")?.value||"\u0645\u0633\u0648\u062F\u0629",createdAt:a?(AppState.appData?.safetyAlerts||[]).find(y=>y.id===t)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null},m=[];if((!p.lessonsLearned||!p.lessonsLearned.trim())&&m.push("\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629"),(!p.preventiveMeasures||!p.preventiveMeasures.trim())&&m.push("\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u062F\u062B"),m.length>0){Notification.error(`\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:
${m.join("\u060C ")}`),o();return}if(Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 Safety Alert..."),AppState.appData.safetyAlerts||(AppState.appData.safetyAlerts=[]),a){const y=AppState.appData.safetyAlerts.findIndex(A=>A.id===t);y!==-1?AppState.appData.safetyAlerts[y]=p:AppState.appData.safetyAlerts.push(p)}else AppState.appData.safetyAlerts.push(p);let f=!1,g=null,x=!1;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callAppsScript)try{const y=a?await GoogleIntegration.callAppsScript("updateSafetyAlert",{alertId:t,updateData:p}):await GoogleIntegration.callAppsScript("addSafetyAlert",{alertData:p});if(y&&y.success){if(f=!0,y.data)if(a){const A=AppState.appData.safetyAlerts.findIndex(I=>I.id===t);A!==-1?AppState.appData.safetyAlerts[A]=y.data:AppState.appData.safetyAlerts.push(y.data)}else AppState.appData.safetyAlerts.push(y.data)}else g=y?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 Safety Alert \u0641\u064A Backend"}catch(y){g=y.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 Safety Alert \u0625\u0644\u0649 Backend",Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Safety Alert \u0625\u0644\u0649 Backend:",y)}else f=!0;if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{await GoogleIntegration.autoSave("safetyAlerts",AppState.appData.safetyAlerts),x=!0}catch(y){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Safety Alert \u0625\u0644\u0649 Google Sheets:",y)}else x=!0;if(Loading.hide(),g){Notification.warning(`\u062A\u0645 \u062D\u0641\u0638 Safety Alert \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0648\u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Backend:
${g}

\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0623\u0648 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637.`),o();return}const w=a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B Safety Alert \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 Safety Alert \u0628\u0646\u062C\u0627\u062D";if(!x&&f?Notification.success(`${w}
(\u0645\u0644\u0627\u062D\u0638\u0629: \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A Backend \u0641\u0642\u0637)`):Notification.success(w),e.remove(),this.currentTab==="safety-alerts"){const y=document.getElementById("incidents-tab-content");y&&(y.innerHTML=await this.renderSafetyAlertsTab(),this.setupTabEventListeners("safety-alerts"))}}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Safety Alert:",a);const n=a.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639";Notification.error(`\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 Safety Alert:
${n}`),i&&(i.disabled=!1,i.innerHTML.includes("fa-spinner")&&(i.innerHTML='<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638'))}},async handleSafetyAlertImage(e,t){const i=e.files[0];if(i){if(i.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB"),e.value="";return}try{const a=await this.convertFileToBase64(i),n=e.previousElementSibling;n&&n.id.includes("safety-alert")&&(n.value=a);const o=document.getElementById(t);if(o){o.innerHTML=`<img src="${a}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">`,o.style.display="block";const s=e.closest(".safety-alert-yellow-box");if(s){const r=s.querySelector("label[for]");r&&(r.style.display="none")}}}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0635\u0648\u0631\u0629:",a),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629")}}},async convertFileToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},editSafetyAlert(e){this.showSafetyAlertForm(e)},async approveSafetyAlert(e){try{if(!this.canApproveSafetyAlert()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0639\u062A\u0645\u0627\u062F Safety Alert");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0647\u0630\u0627 Safety Alert\u061F"))return;Loading.show("\u062C\u0627\u0631\u064A \u0627\u0639\u062A\u0645\u0627\u062F Safety Alert...");const t=(AppState.appData?.safetyAlerts||[]).find(n=>n.id===e);if(!t){Loading.hide(),Notification.error("Safety Alert \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i={status:"\u0645\u0639\u062A\u0645\u062F",approvedBy:AppState.currentUser?.name||AppState.currentUser?.displayName||"",approvedAt:new Date().toISOString(),issueDate:new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString()},a=AppState.appData.safetyAlerts.findIndex(n=>n.id===e);if(a!==-1&&(AppState.appData.safetyAlerts[a]={...t,...i}),typeof GoogleIntegration<"u"&&GoogleIntegration.callAppsScript)try{const n=await GoogleIntegration.callAppsScript("updateSafetyAlert",{alertId:e,updateData:i});n&&n.success&&n.data&&(AppState.appData.safetyAlerts[a]=n.data)}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F Safety Alert \u0641\u064A Backend:",n)}if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{await GoogleIntegration.autoSave("safetyAlerts",AppState.appData.safetyAlerts)}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 Safety Alert \u0625\u0644\u0649 Google Sheets:",n)}if(Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F Safety Alert \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="safety-alerts"){const n=document.getElementById("incidents-tab-content");n&&(n.innerHTML=await this.renderSafetyAlertsTab(),this.setupTabEventListeners("safety-alerts"))}}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F Safety Alert:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},async renderApprovalsTab(){try{const t=(AppState.appData?.incidents||[]).map(i=>{const a={...i};if(this._normalizeIncidentApprovalRecord(a),a.investigation&&typeof a.investigation=="string")try{a.investigation=JSON.parse(a.investigation)}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 investigation:",n),a.investigation={}}return a}).filter(i=>this.getIncidentApprovalState(i).awaitingApproval);return`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-800">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h3>
                                    <p class="text-sm text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A: ${t.length} \u062D\u0627\u062F\u062B</p>
                                </div>
                                <div class="flex gap-2">
                                    <input 
                                        type="text" 
                                        id="approvals-search" 
                                        class="form-input" 
                                        placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u062D\u0627\u062F\u062B..."
                                        style="max-width: 300px;"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u0643\u0648\u062F</th>
                                        <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0627\u0644\u0634\u062F\u0629</th>
                                        <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody id="approvals-table-body">
                                    ${t.length>0?t.map(i=>`
                                        <tr data-incident-id="${i.id}">
                                            <td>${Utils.escapeHTML(i.isoCode||i.id||"")}</td>
                                            <td>${Utils.escapeHTML(i.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646")}</td>
                                            <td>${i.date?new Date(i.date).toLocaleDateString("ar-SA"):""}</td>
                                            <td>
                                                <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(i))}">
                                                    ${Utils.escapeHTML(this.getIncidentDisplayStatus(i))}
                                                    ${i.requiresApproval?' <i class="fas fa-clock ml-1" title="\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"></i>':""}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge badge-${i.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":i.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"warning":"info"}">
                                                    ${Utils.escapeHTML(i.severity||"\u0645\u062A\u0648\u0633\u0637\u0629")}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(this.getIncidentListReporter(i))}</td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button 
                                                        onclick="Incidents.viewIncident('${i.id}')" 
                                                        class="btn-icon btn-icon-info" 
                                                        title="\u0639\u0631\u0636"
                                                    >
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    ${i.investigation?`
                                                        <button 
                                                            onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${i.id}'); } else { alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D'); }" 
                                                            class="btn-icon btn-icon-warning" 
                                                            title="\u0627\u0644\u062A\u062D\u0642\u064A\u0642"
                                                        >
                                                            <i class="fas fa-search"></i>
                                                        </button>
                                                    `:`
                                                        <button 
                                                            onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${i.id}'); } else { alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D'); }" 
                                                            class="btn-icon btn-icon-primary" 
                                                            title="\u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u0642\u064A\u0642"
                                                        >
                                                            <i class="fas fa-play"></i>
                                                        </button>
                                                    `}
                                                    ${this.getIncidentApprovalState(i).awaitingApproval&&this.canApproveIncident()?`
                                                        <button 
                                                            onclick="Incidents.showIncidentApprovalFlow('${i.id}')" 
                                                            class="btn-icon btn-icon-warning" 
                                                            title="\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"
                                                        >
                                                            <i class="fas fa-project-diagram"></i>
                                                        </button>
                                                        <button 
                                                            onclick="Incidents.approveIncident('${i.id}')" 
                                                            class="btn-icon btn-icon-success" 
                                                            title="\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"
                                                        >
                                                            <i class="fas fa-check"></i>
                                                        </button>
                                                        <button 
                                                            onclick="Incidents.rejectIncident('${i.id}')" 
                                                            class="btn-icon btn-icon-danger" 
                                                            title="\u0631\u0641\u0636"
                                                        >
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    `:""}
                                                    ${this.renderIncidentDeleteButton(i.id)}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join(""):`
                                        <tr>
                                            <td colspan="7" class="text-center py-8 text-gray-500">
                                                <i class="fas fa-check-circle text-4xl mb-4"></i>
                                                <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u0639\u0644\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629</p>
                                            </td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `}catch(e){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A:",e),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A</h2>
                            <p class="text-gray-600">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                        </div>
                    </div>
                </div>
            `}},viewRegistryEntry(e){const t=this.registryData.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u062F\u062B #${t.sequentialNumber}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="grid grid-cols-2 gap-4">
                        <div><strong>\u0627\u0644\u0645\u0633\u0644\u0633\u0644:</strong> ${t.sequentialNumber}</div>
                        <div><strong>\u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(t.factory||"-")}</div>
                        <div><strong>\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B:</strong> ${Utils.escapeHTML(t.incidentLocation||"-")}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B:</strong> ${t.incidentDate?new Date(t.incidentDate).toLocaleDateString("ar-SA"):"-"}</div>
                        <div><strong>\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B:</strong> ${Utils.escapeHTML(t.incidentDay||"-")}</div>
                        <div><strong>\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B:</strong> ${Utils.escapeHTML(t.incidentTime||"-")}</div>
                        <div><strong>\u0627\u0644\u0648\u0631\u062F\u064A\u0629:</strong> ${Utils.escapeHTML(t.shift||"-")}</div>
                        <div><strong>\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641:</strong> ${Utils.escapeHTML(t.employeeCode||"-")}</div>
                        <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641:</strong> ${Utils.escapeHTML(t.employeeName||"-")}</div>
                        <div><strong>\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</strong> ${Utils.escapeHTML(t.employeeJob||"-")}</div>
                        <div><strong>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(t.employeeDepartment||"-")}</div>
                        <div class="col-span-2"><strong>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B:</strong> ${Utils.escapeHTML(t.incidentDetails||"-")}</div>
                        <div><strong>\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628:</strong> ${Utils.escapeHTML(t.injuredPart||"-")}</div>
                        <div><strong>\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629:</strong> ${Utils.escapeHTML(t.equipmentCause||"-")}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629:</strong> ${t.leaveStartDate?new Date(t.leaveStartDate+"T00:00:00").toLocaleDateString("ar-SA"):"-"}</div>
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644:</strong> ${t.returnToWorkDate?new Date(t.returnToWorkDate+"T00:00:00").toLocaleDateString("ar-SA"):"-"}</div>
                        <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629:</strong> ${t.totalLeaveDays||0} \u064A\u0648\u0645</div>
                        <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> <span class="badge badge-${t.status==="\u0645\u0641\u062A\u0648\u062D"?"primary":"success"}">${t.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="Incidents.exportRegistryEntryPDF('${t.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",a=>{a.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()})},showManualEntryForm(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-plus-circle ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0625\u062E\u0637\u0627\u0631 \u062D\u0627\u062F\u062B / Incident Notification
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="incident-registry-manual-form" class="space-y-4">
                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B / Incident Type *
                                </label>
                                <select id="manual-incident-type" class="form-input" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</option>
                                    <option value="\u0627\u0635\u0627\u0628\u0629">\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644 (Work Injury)</option>
                                    <option value="\u0645\u0639\u062F\u0629">\u0645\u0639\u062F\u0629 (Equipment)</option>
                                    <option value="\u062D\u0631\u064A\u0642">\u062D\u0631\u064A\u0642 (Fire)</option>
                                    <option value="\u0628\u064A\u0626\u0629">\u0628\u064A\u0626\u0629 (Environment)</option>
                                    <option value="\u0648\u0634\u0643 \u062D\u0627\u062F\u062B">\u0648\u0634\u0643 \u062D\u0627\u062F\u062B (Near Miss)</option>
                                    <option value="\u0645\u0631\u0643\u0628\u0629">\u0645\u0631\u0643\u0628\u0629 (Vehicle)</option>
                                    <option value="\u0623\u062E\u0631\u0649">\u0623\u062E\u0631\u0649 (Other)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    \u0627\u0644\u0645\u0635\u0646\u0639 / Factory *
                                </label>
                                <select id="manual-factory" class="form-input" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    \u0627\u0644\u0645\u0648\u0642\u0639 / Location *
                                </label>
                                <select id="manual-incident-location" class="form-input" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                </select>
                            </div>
                        </div>

                        <!-- \u062A\u0648\u0642\u064A\u062A \u0627\u0644\u062D\u0627\u062F\u062B -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-3 rounded">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B *</label>
                                <input type="date" id="manual-incident-date" class="form-input" required value="${new Date().toISOString().split("T")[0]}">
                            </div>
                            <div>
                                <label for="manual-incident-time" class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B *</label>
                                <input type="time" id="manual-incident-time" class="form-input" required>
                            </div>
                            <div>
                                <label for="manual-incident-day" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u064A\u0648\u0645</label>
                                <input type="text" id="manual-incident-day" class="form-input" readonly style="background-color: #e5e7eb;">
                            </div>
                            <div>
                                <label for="manual-shift" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0631\u062F\u064A\u0629 *</label>
                                <select id="manual-shift" class="form-input" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0631\u062F\u064A\u0629</option>
                                    <option value="\u0623\u0648\u0644\u0649">\u0623\u0648\u0644\u0649</option>
                                    <option value="\u062B\u0627\u0646\u064A\u0629">\u062B\u0627\u0646\u064A\u0629</option>
                                    <option value="\u062B\u0627\u0644\u062B\u0629">\u062B\u0627\u0644\u062B\u0629</option>
                                </select>
                            </div>
                        </div>

                        <!-- \u0642\u0633\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628 (\u064A\u0638\u0647\u0631 \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0625\u0635\u0627\u0628\u0629) -->
                        <div id="manual-employee-section" class="border border-blue-200 bg-blue-50 p-4 rounded hidden">
                            <h4 class="text-blue-800 font-bold mb-3 flex items-center">
                                <i class="fas fa-user-injured ml-2"></i>
                                \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628 / Injured Person Details
                            </h4>
                            
                            <!-- \u062D\u0642\u0644 \u0627\u0644\u062A\u0628\u0639\u064A\u0629 -->
                            <div class="mb-3">
                                <label for="manual-affiliation" class="block text-sm font-semibold text-gray-700 mb-2">
                                    \u0627\u0644\u062A\u0628\u0639\u064A\u0629 / Affiliation (\u0645\u0631\u062A\u0628\u0637 \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628)
                                </label>
                                <select id="manual-affiliation" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0628\u0639\u064A\u0629</option>
                                    <option value="\u0634\u0631\u0643\u0629">\u0634\u0631\u0643\u0629 (Company)</option>
                                    <option value="\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629">\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629 (Daily Labor)</option>
                                    <option value="\u0645\u0642\u0627\u0648\u0644">\u0645\u0642\u0627\u0648\u0644 (Contractor)</option>
                                    <option value="\u0632\u0627\u0626\u0631">\u0632\u0627\u0626\u0631 (Visitor)</option>
                                    <option value="\u0644\u0627 \u064A\u0648\u062C\u062F">\u0644\u0627 \u064A\u0648\u062C\u062F (None)</option>
                                </select>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                    <label for="manual-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                    <input type="text" id="manual-employee-code" class="form-input" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F...">
                                </div>
                                <div>
                                    <label for="manual-employee-name" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                    <input type="text" id="manual-employee-name" class="form-input" readonly style="background-color: #e5e7eb;">
                                </div>
                                <div>
                                    <label for="manual-employee-job" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                    <input type="text" id="manual-employee-job" class="form-input" readonly style="background-color: #e5e7eb;">
                                </div>
                            </div>
                            
                            <!-- \u062D\u0642\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0648\u0638\u0641 -->
                            <div class="mb-3">
                                <label for="manual-employee-department" class="block text-sm font-semibold text-gray-700 mb-2">
                                    \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / Department *
                                </label>
                                <input type="text" id="manual-employee-department" class="form-input" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627">
                            </div>

                            <div class="mb-3">
                                <label for="manual-injury-description" class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0627\u0635\u0627\u0628\u0629 / Injury Description</label>
                                <textarea id="manual-injury-description" class="form-input" rows="2" placeholder="\u0648\u0635\u0641 \u0637\u0628\u064A\u0639\u0629 \u0648\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629..."></textarea>
                            </div>
                            
                            <!-- \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 -->
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-blue-200 pt-3">
                                <div>
                                    <label for="manual-leave-start-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</label>
                                    <input type="date" id="manual-leave-start-date" class="form-input">
                                </div>
                                <div>
                                    <label for="manual-return-to-work-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644</label>
                                    <input type="date" id="manual-return-to-work-date" class="form-input">
                                </div>
                                <div>
                                    <label for="manual-total-leave-days" class="block text-sm font-semibold text-gray-700 mb-2">\u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</label>
                                    <input type="text" id="manual-total-leave-days" class="form-input font-bold" readonly value="0 \u064A\u0648\u0645">
                                </div>
                                <div>
                                    <label for="manual-treating-doctor" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</label>
                                    <input type="text" id="manual-treating-doctor" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0637\u0628\u064A\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062C\u062F\u064A\u062F \u0644\u0644\u062D\u0642\u0648\u0644: \u0627\u0644\u062E\u0633\u0627\u0626\u0631 \u062B\u0645 \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0645\u062E\u062A\u0635\u0631 \u062B\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                        
                        <!-- \u0627\u0644\u062E\u0633\u0627\u0626\u0631 -->
                         <div>
                            <label for="manual-losses" class="block text-sm font-semibold text-gray-700 mb-2">
                                \u0627\u0644\u062E\u0633\u0627\u0626\u0631 / Losses
                            </label>
                            <textarea id="manual-losses" class="form-input" rows="3" placeholder="\u0648\u0635\u0641 \u0627\u0644\u062E\u0633\u0627\u0626\u0631 \u0627\u0644\u0645\u0627\u062F\u064A\u0629 \u0623\u0648 \u0627\u0644\u0628\u0634\u0631\u064A\u0629..."></textarea>
                        </div>

                        <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B (\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631) -->
                        <div>
                            <label for="manual-brief-description" class="block text-sm font-semibold text-gray-700 mb-2">
                                \u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062D\u0627\u062F\u062B / Brief Description *
                            </label>
                            <textarea id="manual-brief-description" class="form-input" rows="3" required placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0645\u0627 \u062D\u062F\u062B..."></textarea>
                        </div>

                        <!-- \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629 -->
                        <div>
                            <label for="manual-actions-taken" class="block text-sm font-semibold text-gray-700 mb-2">
                                \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629 / Actions Taken
                            </label>
                            <textarea id="manual-actions-taken" class="form-input" rows="3" placeholder="\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0645 \u0627\u062A\u062E\u0627\u0630\u0647\u0627..."></textarea>
                        </div>
                        
                        <!-- Auto generated -->
                         <div class="hidden">
                             <input type="text" id="manual-sequential-number" value="${this.generateRegistrySequentialNumber()}">
                         </div>

                    </form>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" onclick="Incidents.submitManualEntry()">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e),this.populateManualFormOptions(e);const t=e.querySelector("#manual-incident-type"),i=e.querySelector("#manual-employee-section"),a=e.querySelector("#manual-employee-code"),n=e.querySelector("#manual-employee-name"),o=e.querySelector("#manual-employee-job"),s=e.querySelector("#manual-employee-department"),r=e.querySelector("#manual-affiliation"),d=(I,v)=>{I&&(I.readOnly=!!v,I.style.backgroundColor=v?"#e5e7eb":"")},l=()=>{if(!r)return;const I=(r.value||"").trim(),v=!I||I==="\u0634\u0631\u0643\u0629";d(n,v),d(o,v),a&&(v?(a.setAttribute("required","true"),a.placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F..."):(a.removeAttribute("required"),a.placeholder="\u0627\u0644\u0643\u0648\u062F/\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)")),d(s,!1)};t.addEventListener("change",()=>{t.value==="\u0627\u0635\u0627\u0628\u0629"?(i.classList.remove("hidden"),a.setAttribute("required","true"),n.setAttribute("required","true"),s&&s.setAttribute("required","true"),l()):(i.classList.add("hidden"),a.removeAttribute("required"),n.removeAttribute("required"),s&&s.removeAttribute("required"),a.value="",n.value="",e.querySelector("#manual-employee-job")&&(e.querySelector("#manual-employee-job").value=""),e.querySelector("#manual-employee-department")&&(e.querySelector("#manual-employee-department").value=""),e.querySelector("#manual-affiliation")&&(e.querySelector("#manual-affiliation").value=""))}),r&&(r.addEventListener("change",()=>{l()}),l());const c=e.querySelector("#manual-employee-code");c&&(c.addEventListener("blur",()=>{this.loadEmployeeDataForManual(e)}),c.addEventListener("input",()=>{c.value.trim().length>=3&&this.loadEmployeeDataForManual(e)}));const u=e.querySelector("#manual-factory");u&&u.addEventListener("change",()=>{this.updateManualFormPlaces(e)});const p=e.querySelector("#manual-incident-date"),m=e.querySelector("#manual-incident-day");if(p&&m){const I=()=>{if(p.value)try{const v=new Date(p.value);if(!isNaN(v.getTime())){const $=this.getDayName(v);m.value=$}}catch{m.value=""}else m.value=""};p.addEventListener("change",I),setTimeout(I,100)}const f=e.querySelector("#manual-incident-time"),g=e.querySelector("#manual-shift"),x=e.querySelector("#manual-leave-start-date"),w=e.querySelector("#manual-return-to-work-date"),y=e.querySelector("#manual-total-leave-days"),A=()=>{if(!y)return;const I=this.calculateTotalLeaveDays(x?.value||"",w?.value||"");y.value=`${I} \u064A\u0648\u0645`};x&&x.addEventListener("change",A),w&&w.addEventListener("change",A),f&&g&&f.addEventListener("change",()=>{if(f.value){const I=this.determineShift(f.value);g.value=I}}),e.addEventListener("click",I=>{I.target===e&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&e.remove()})},populateManualFormOptions(e){const t=e.querySelector("#manual-factory"),i=e.querySelector("#manual-incident-location");if(!t||!i)return;this.getSiteOptions().forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=n.name,t.appendChild(o)})},updateManualFormPlaces(e){const t=e.querySelector("#manual-factory"),i=e.querySelector("#manual-incident-location");if(!t||!i)return;const a=t.value;i.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646</option>',a&&this.getPlaceOptions(a).forEach(o=>{const s=document.createElement("option");s.value=o.id,s.textContent=o.name,i.appendChild(s)})},loadEmployeeDataForManual(e){const t=e.querySelector("#manual-employee-code"),i=e.querySelector("#manual-employee-name"),a=e.querySelector("#manual-employee-job"),n=e.querySelector("#manual-employee-department"),o=e.querySelector("#manual-affiliation");if(!t||!i)return;const s=(o?.value||"").trim();if(!(!s||s==="\u0634\u0631\u0643\u0629"))return;const d=t.value.trim();if(!d){i.value="",a&&(a.value=""),n&&(n.value="");return}const l=this.getEmployeeByCode(d);l?(i.value=l.name||l.fullName||"",a&&(a.value=l.job||l.position||l.jobTitle||l.title||""),n&&(n.value=l.department||l.section||l.division||"")):(i.value="",a&&(a.value=""),document.activeElement!==t&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F"))},async submitManualEntry(){const e=document.querySelector(".modal-overlay");if(!e||this._manualEntrySubmitting||!e.querySelector("#incident-registry-manual-form"))return;const i=e.querySelector("#manual-incident-type"),a=e.querySelector("#manual-factory"),n=e.querySelector("#manual-incident-location"),o=e.querySelector("#manual-incident-date"),s=e.querySelector("#manual-incident-time"),r=e.querySelector("#manual-shift"),d=e.querySelector("#manual-brief-description"),l=e.querySelector("#manual-affiliation"),c=e.querySelector("#manual-employee-code"),u=e.querySelector("#manual-employee-name"),p=e.querySelector("#manual-employee-job"),m=e.querySelector("#manual-employee-department"),f=e.querySelector("#manual-injury-description"),g=e.querySelector("#manual-losses"),x=e.querySelector("#manual-actions-taken"),w=e.querySelector("#manual-leave-start-date"),y=e.querySelector("#manual-return-to-work-date"),A=e.querySelector("#manual-treating-doctor");if(!i.value||!a.value||!n.value||!o.value||!s.value||!r.value||!d.value){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}if(i.value==="\u0627\u0635\u0627\u0628\u0629"){const S=(l?.value||"").trim();if((!S||S==="\u0634\u0631\u0643\u0629")&&!c?.value?.trim()){Notification.error('\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0637\u0644\u0648\u0628 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0628\u0639\u064A\u0629 "\u0634\u0631\u0643\u0629"');return}if(!u?.value?.trim()||!m?.value?.trim()){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628 (\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0625\u062F\u0627\u0631\u0629) \u0645\u0637\u0644\u0648\u0628\u0629 \u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}}if(y.value&&w.value){const S=new Date(w.value);if(new Date(y.value)<S){Notification.error("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629");return}}const I=e.querySelector("#manual-sequential-number"),v=I?parseInt(I.value)||this.generateRegistrySequentialNumber():this.generateRegistrySequentialNumber(),$=a.options[a.selectedIndex]?.text||a.value,F=n.options[n.selectedIndex]?.text||n.value,b=new Date(o.value+"T"+s.value),M=e.querySelector("#manual-incident-day")?.value||this.getDayName(b);let R=w?.value||"",D=y?.value||"",P=this.calculateTotalLeaveDays(R,D);P<=0&&(R="",D="",P=0);const E={id:Utils.generateId("INCR"),sequentialNumber:v.toString(),incidentId:null,incidentType:i.value,factory:$,incidentLocation:F,incidentDate:b.toISOString(),incidentDay:M,incidentTime:s.value,shift:r.value,employeeAffiliation:l?.value||"",employeeCode:c?.value.trim()||"",employeeName:u?.value.trim()||"",employeeJob:p?.value.trim()||"",employeeDepartment:m?.value.trim()||"",incidentDetails:d.value.trim(),injuryDescription:f?.value.trim()||"",losses:g?.value.trim()||"",actionsTaken:x?.value.trim()||"",incidentDetailsBrief:d.value.trim(),injuredPart:(()=>{const S=f?.value.trim()||"",q=this.extractInjuredPart(d.value.trim(),S);return q!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?q:S||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})(),equipmentCause:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",leaveStartDate:R,returnToWorkDate:D,totalLeaveDays:P,status:"\u0645\u0641\u062A\u0648\u062D",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},U={id:typeof Utils.generateSequentialId=="function"?Utils.generateSequentialId("INC",AppState.appData?.incidents||[]):Utils.generateId("INC"),isoCode:this.generateISOCode("INC"),title:(E.incidentDetailsBrief||E.incidentDetails||"\u062D\u0627\u062F\u062B \u0645\u0646 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A").substring(0,200),description:E.incidentDetails||"",location:E.incidentLocation||E.factory||"",date:E.incidentDate,severity:"\u0645\u062A\u0648\u0633\u0637\u0629",incidentType:E.incidentType||"",status:"\u0645\u0641\u062A\u0648\u062D",requiresApproval:!0,reportedBy:AppState.currentUser?.name||AppState.currentUser?.displayName||"\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A",reporterName:AppState.currentUser?.name||AppState.currentUser?.displayName||"",department:E.employeeDepartment||"",affectedName:E.employeeName||"",affectedCode:E.employeeCode||"",affectedJobTitle:E.employeeJob||"",affectedDepartment:E.employeeDepartment||"",employeeCode:E.employeeCode||"",employeeName:E.employeeName||"",employeeJob:E.employeeJob||"",employeeDepartment:E.employeeDepartment||"",createdBy:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};E.incidentId=U.id,Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...");try{this._manualEntrySubmitting=!0,AppState.appData.incidents||(AppState.appData.incidents=[]),AppState.appData.incidents.push(U),this.registryData.push(E),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveRegistryData({sync:!1}),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u064A \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F."),e.remove(),setTimeout(async()=>{try{if(this.currentTab==="registry"){const S=document.getElementById("incidents-tab-content");S&&(S.innerHTML=await this.renderRegistryTab(),this.setupTabEventListeners("registry"))}}catch(S){Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0627\u0644\u0633\u062C\u0644 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",S)}},0),setTimeout(()=>{try{typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&(GoogleIntegration.autoSave("Incidents",AppState.appData.incidents).catch(S=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",S)}),GoogleIntegration.autoSave("IncidentsRegistry",this.registryData).catch(S=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",S)}))}catch(S){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",S)}this.syncClinicSickLeaveFromRegistryEntry(E,{treatingDoctor:A?.value||"",actions:x?.value||""}).catch(S=>{Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0631\u0628\u0637 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0627\u0644\u0639\u064A\u0627\u062F\u0629:",S)})},0)}catch(S){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638: "+S.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A:",S)}finally{this._manualEntrySubmitting=!1}},async syncClinicSickLeaveFromRegistryEntry(e,t={}){try{if(!e)return!1;const i=(e.employeeCode||"").toString().trim(),a=(e.employeeName||"").toString().trim(),n=(e.employeeDepartment||"").toString().trim(),o=parseInt(e.totalLeaveDays,10)||0,s=(e.leaveStartDate||"").toString().trim(),r=(e.returnToWorkDate||"").toString().trim();if(!i||!a||!n||o<=0||!s||!r||typeof Clinic>"u"||typeof Clinic.normalizeSickLeaveRecord!="function")return!1;try{Clinic.ensureData?.()}catch{}if((AppState.appData?.sickLeave||[]).some(y=>y?.linkedRegistryId===e.id))return!0;const l=y=>{try{const A=new Date(`${y}T00:00:00`);return Number.isNaN(A.getTime())?null:A.toISOString()}catch{return null}},c=l(s),u=l(r);if(!c||!u)return!1;const p=(t.treatingDoctor||"").toString().trim(),m=(t.actions||e.actionsTaken||"").toString().trim(),f=[];e.injuryDescription&&f.push(`\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0635\u0627\u0628\u0629: ${e.injuryDescription}`),e.incidentDetails&&f.push(`\u0645\u0644\u062E\u0635 \u0627\u0644\u062D\u0627\u062F\u062B: ${e.incidentDetails}`);const g=f.join(`
`)||"\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u062D\u0627\u062F\u062B",x=AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,w=Clinic.normalizeSickLeaveRecord({id:Utils.generateId("SICK_LEAVE"),personType:"employee",employeeName:a,employeeCode:i,employeeNumber:i,employeePosition:e.employeeJob||"",employeeDepartment:n,startDate:c,endDate:u,reason:g,medicalNotes:m,treatingDoctor:p,createdAt:new Date().toISOString(),createdBy:x,createdById:x?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString()});w.linkedRegistryId=e.id||"",w.sourceType="IncidentsRegistryManual",AppState.appData||(AppState.appData={}),Array.isArray(AppState.appData.sickLeave)||(AppState.appData.sickLeave=[]),AppState.appData.sickLeave.push(w),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&await GoogleIntegration.sendRequest({action:"addSickLeave",data:w})}catch(y){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0645\u0639 Google Sheets:",y)}return!0}catch(i){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0631\u0628\u0637 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",i),!1}},applyRegistryFilters(){const e=document.getElementById("incidents-registry-search")?.value.toLowerCase()||"",t=document.getElementById("incidents-registry-filter-status")?.value||"",i=document.getElementById("incidents-registry-filter-date-from")?.value||"",a=document.getElementById("incidents-registry-filter-date-to")?.value||"";let n=[...this.getLinkedRegistryEntries()];e&&(n=n.filter(o=>o.sequentialNumber?.toString().includes(e)||o.employeeName?.toLowerCase().includes(e)||o.employeeCode?.toLowerCase().includes(e)||o.factory?.toLowerCase().includes(e)||o.incidentLocation?.toLowerCase().includes(e))),t&&(n=n.filter(o=>o.status===t)),i&&(n=n.filter(o=>{if(!o.incidentDate)return!1;const s=this.safeDateToISOString(o.incidentDate,10);return s?s>=i:!1})),a&&(n=n.filter(o=>{if(!o.incidentDate)return!1;const s=this.safeDateToISOString(o.incidentDate,10);return s?s<=a:!1})),this.renderFilteredRegistryTable(n)},renderFilteredRegistryTable(e){const t=document.querySelector("#incidents-tab-content .table-responsive");if(!t)return;if(e.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0644\u0628\u062D\u062B</p>
                </div>
            `;return}const i=n=>{if(!n)return"-";try{return new Date(n).toLocaleDateString("ar-SA")}catch{return"-"}};let a=`
            <table class="data-table">
                <thead>
                    <tr>
                        <th>\u0645\u0633\u0644\u0633\u0644</th>
                        <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                        <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u0648\u0631\u062F\u064A\u0629</th>
                        <th>\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                        <th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628</th>
                        <th>\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629</th>
                        <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</th>
                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
        `;e.forEach(n=>{a+=`
                <tr>
                    <td>${n.sequentialNumber||"-"}</td>
                    <td>${Utils.escapeHTML(n.factory||"-")}</td>
                    <td>${Utils.escapeHTML(n.incidentLocation||"-")}</td>
                    <td>${i(n.incidentDate)}</td>
                    <td>${Utils.escapeHTML(n.incidentDay||"-")}</td>
                    <td>${Utils.escapeHTML(n.incidentTime||"-")}</td>
                    <td>${Utils.escapeHTML(n.shift||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeCode||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeName||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeJob||"-")}</td>
                    <td>${Utils.escapeHTML(n.employeeDepartment||"-")}</td>
                    <td>${Utils.escapeHTML((n.incidentDetails||"-").substring(0,50))}${(n.incidentDetails||"").length>50?"...":""}</td>
                    <td>${Utils.escapeHTML(n.injuredPart||"-")}</td>
                    <td>${Utils.escapeHTML(n.equipmentCause||"-")}</td>
                    <td>${n.totalLeaveDays||0} \u064A\u0648\u0645</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <button onclick="Incidents.viewRegistryEntry('${n.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${n.incidentId?`
                                <button onclick="Incidents.viewIncident('${n.incidentId}')" class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u062F\u062B">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}),a+=`
                </tbody>
            </table>
        `,t.innerHTML=a},exportRegistryToExcel(){try{const e=this.registryData;if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}let t="\uFEFF";t+=`\u0645\u0633\u0644\u0633\u0644,\u0627\u0644\u0645\u0635\u0646\u0639,\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B,\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B,\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B,\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B,\u0627\u0644\u0648\u0631\u062F\u064A\u0629,\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641,\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641,\u0627\u0644\u0648\u0638\u064A\u0641\u0629,\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645,\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B,\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628,\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629,\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629
`,e.forEach(o=>{const s=[o.sequentialNumber||"",o.factory||"",o.incidentLocation||"",o.incidentDate?new Date(o.incidentDate).toLocaleDateString("ar-SA"):"",o.incidentDay||"",o.incidentTime||"",o.shift||"",o.employeeCode||"",o.employeeName||"",o.employeeJob||"",o.employeeDepartment||"",(o.incidentDetails||"").replace(/,/g,";"),o.injuredPart||"",o.equipmentCause||"",o.totalLeaveDays||0];t+=s.join(",")+`
`});const i=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(i),n=document.createElement("a");n.href=a,n.download=`\u0633\u062C\u0644_\u0627\u0644\u062D\u0648\u0627\u062F\u062B_${new Date().toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(a)},0),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D")}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644:",e)}},exportRegistryToPDF(){try{const e=this.registryData;if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const t=this.buildRegistryPDFContent(e),i=`
                <html lang="ar" dir="rtl">
                    <head>
                        <meta charset="UTF-8">
                        <style>
                            @page { size: A4 landscape; margin: 1cm; }
                            @media print {
                                @page { size: A4 landscape; margin: 1cm; }
                            }
                            body { font-family: 'Cairo', 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; page-break-inside: auto; }
                            th, td { border: 1px solid #ddd; padding: 6px; text-align: right; }
                            th { background-color: #f2f2f2; font-weight: bold; }
                            tr { page-break-inside: avoid; }
                            tr:nth-child(even) { background-color: #f9f9f9; }
                            thead { display: table-header-group; }
                        </style>
                    </head>
                    <body>
                        <h1>\u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h1>
                        <p>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${new Date().toLocaleDateString("ar-SA")}</p>
                        ${t}
                    </body>
                </html>
            `,a=new Blob([i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(a),o=window.open(n,"_blank");o?o.onload=()=>{setTimeout(()=>{o.print(),setTimeout(()=>{URL.revokeObjectURL(n),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},500)},300)}:Notification.error("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629.")}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644:",e)}},buildRegistryPDFContent(e){const t=a=>{if(!a)return"-";try{return new Date(a).toLocaleDateString("ar-SA")}catch{return"-"}};let i="";return e.forEach(a=>{i+=`
                <tr>
                    <td>${a.sequentialNumber||"-"}</td>
                    <td>${a.factory||"-"}</td>
                    <td>${a.incidentLocation||"-"}</td>
                    <td>${t(a.incidentDate)}</td>
                    <td>${a.incidentDay||"-"}</td>
                    <td>${a.incidentTime||"-"}</td>
                    <td>${a.shift||"-"}</td>
                    <td>${a.employeeCode||"-"}</td>
                    <td>${a.employeeName||"-"}</td>
                    <td>${a.employeeJob||"-"}</td>
                    <td>${a.employeeDepartment||"-"}</td>
                    <td>${(a.incidentDetails||"-").substring(0,100)}</td>
                    <td>${a.injuredPart||"-"}</td>
                    <td>${a.equipmentCause||"-"}</td>
                    <td>${a.totalLeaveDays||0}</td>
                </tr>
            `}),`
            <table>
                <thead>
                    <tr>
                        <th>\u0645\u0633\u0644\u0633\u0644</th>
                        <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                        <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u0648\u0631\u062F\u064A\u0629</th>
                        <th>\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                        <th>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                        <th>\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628</th>
                        <th>\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629</th>
                        <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</th>
                    </tr>
                </thead>
                <tbody>
                    ${i}
                </tbody>
            </table>
        `},renderAnalysisContent(e){const t=this.buildThreeYearAnalytics(),{yearlyStats:i,totals:a,severityTotals:n}=t,o=e?.enabledSections||["summary","trends","severity","department"];let s="";if(o.includes("summary")&&(s+=`
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">\u0645\u0644\u062E\u0635 \u0639\u0627\u0645</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</p>
                            <p class="text-2xl font-bold">${a.totalIncidents}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</p>
                            <p class="text-2xl font-bold text-green-600">${a.closureRate.toFixed(1)}%</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062A\u0648\u0633\u0637 \u0633\u0646\u0648\u064A</p>
                            <p class="text-2xl font-bold">${a.averagePerYear.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            `),o.includes("trends")&&(s+=`
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u0633\u0646\u0629</th>
                                    <th>\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                                    <th>\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629</th>
                                    <th>\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                                    <th>\u0627\u0644\u062A\u063A\u064A\u064A\u0631</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${i.map((r,d)=>{const l=i[d+1],c=l?((r.total-l.total)/l.total*100).toFixed(1):"-",u=c!=="-"?c>0?"text-red-600":"text-green-600":"";return`
                                        <tr>
                                            <td>${r.year}</td>
                                            <td>${r.total}</td>
                                            <td>${r.closed}</td>
                                            <td>${r.closureRate.toFixed(1)}%</td>
                                            <td class="${u}">${c!=="-"?(c>0?"+":"")+c+"%":"-"}</td>
                                        </tr>
                                    `}).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            `),o.includes("severity")&&(s+=`
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="border border-red-200 rounded-lg p-4 bg-red-50">
                            <p class="text-sm text-red-700 mb-1">\u0639\u0627\u0644\u064A\u0629</p>
                            <p class="text-2xl font-bold text-red-600">${n.high||0}</p>
                        </div>
                        <div class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                            <p class="text-sm text-yellow-700 mb-1">\u0645\u062A\u0648\u0633\u0637\u0629</p>
                            <p class="text-2xl font-bold text-yellow-600">${n.medium||0}</p>
                        </div>
                        <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <p class="text-sm text-blue-700 mb-1">\u0645\u0646\u062E\u0641\u0636\u0629</p>
                            <p class="text-2xl font-bold text-blue-600">${n.low||0}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <p class="text-sm text-gray-700 mb-1">\u0623\u062E\u0631\u0649</p>
                            <p class="text-2xl font-bold text-gray-600">${n.other||0}</p>
                        </div>
                    </div>
                </div>
            `),o.includes("department")){const r={};t.incidents.forEach(({incident:l})=>{const c=l?.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[c]=(r[c]||0)+1});const d=Object.entries(r).sort((l,c)=>c[1]-l[1]).map(([l,c])=>`
                    <tr>
                        <td>${Utils.escapeHTML(l)}</td>
                        <td>${c}</td>
                        <td>${a.totalIncidents>0?(c/a.totalIncidents*100).toFixed(1):"0.0"}%</td>
                    </tr>
                `).join("");s+=`
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                    <th>\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                                    <th>\u0627\u0644\u0646\u0633\u0628\u0629</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${d||'<tr><td colspan="3" class="text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `}if(o.includes("location")){const r={};t.incidents.forEach(({incident:l})=>{const c=l?.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[c]=(r[c]||0)+1});const d=Object.entries(r).sort((l,c)=>c[1]-l[1]).map(([l,c])=>`
                    <tr>
                        <td>${Utils.escapeHTML(l)}</td>
                        <td>${c}</td>
                        <td>${a.totalIncidents>0?(c/a.totalIncidents*100).toFixed(1):"0.0"}%</td>
                    </tr>
                `).join("");s+=`
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                    <th>\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                                    <th>\u0627\u0644\u0646\u0633\u0628\u0629</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${d||'<tr><td colspan="3" class="text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `}return s||'<p class="text-gray-500 text-center py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0642\u0633\u0627\u0645 \u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0639\u0644\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.</p>'},async getAnalysisSettings(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.callAppsScript){const e=await GoogleIntegration.callAppsScript("getIncidentAnalysisSettings");if(e&&e.success)return e.data||{}}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",e)}try{const e=localStorage.getItem("incident_analysis_settings");if(e)return JSON.parse(e)}catch{}return{enabledSections:["summary","trends","severity","department"]}},isAdmin(){return typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin"},canDeleteIncident(e=AppState.currentUser){if(!e)return!1;if(this.isAdmin())return!0;let t=e.permissions;if(typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function")t=Permissions.normalizePermissions(t)||t;else if(typeof t=="string")try{t=JSON.parse(t)}catch{t=null}return t&&typeof t=="object"?t.admin===!0||t["manage-modules"]===!0||t["incidents-manage"]===!0:!1},renderIncidentDeleteButton(e,t="\u062D\u0630\u0641 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)"){return this.canDeleteIncident()?`
            <button onclick="Incidents.deleteIncident('${String(e||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'")}')" class="btn-icon btn-icon-danger" title="${Utils.escapeHTML(t)}">
                <i class="fas fa-trash"></i>
            </button>`:""},setupTabEventListeners(e){if(e==="incidents-list")this.loadIncidentsList();else if(e==="analysis")this._incidentBindAnalyticsEvents(),setTimeout(()=>{this.updateIncidentAnalyticsDashboard()},150);else if(e==="registry")setTimeout(()=>{const t=document.getElementById("incidents-registry-add-manual");t&&!t.dataset.listenerAdded&&(t.addEventListener("click",()=>this.showManualEntryForm()),t.dataset.listenerAdded="true");const i=document.getElementById("incidents-registry-search"),a=document.getElementById("incidents-registry-filter-status"),n=document.getElementById("incidents-registry-filter-date-from"),o=document.getElementById("incidents-registry-filter-date-to");i&&!i.dataset.listenerAdded&&(i.addEventListener("input",()=>this.applyRegistryFilters()),i.dataset.listenerAdded="true"),a&&!a.dataset.listenerAdded&&(a.addEventListener("change",()=>this.applyRegistryFilters()),a.dataset.listenerAdded="true"),n&&!n.dataset.listenerAdded&&(n.addEventListener("change",()=>this.applyRegistryFilters()),n.dataset.listenerAdded="true"),o&&!o.dataset.listenerAdded&&(o.addEventListener("change",()=>this.applyRegistryFilters()),o.dataset.listenerAdded="true");const s=document.getElementById("incidents-registry-export-excel"),r=document.getElementById("incidents-registry-export-pdf");s&&!s.dataset.listenerAdded&&(s.addEventListener("click",()=>this.exportRegistryToExcel()),s.dataset.listenerAdded="true"),r&&!r.dataset.listenerAdded&&(r.addEventListener("click",()=>this.exportRegistryToPDF()),r.dataset.listenerAdded="true")},100);else if(e==="annual-log"||e==="detailed-log"){const t=document.getElementById("incidents-report-preview");t&&t.addEventListener("click",()=>this.openReportPreview()),document.querySelectorAll("[data-incidents-export]").forEach(i=>{const a=i.getAttribute("data-incidents-export");i.addEventListener("click",()=>this.exportIncidentsReport(a))})}else e==="approvals"&&setTimeout(()=>{const t=document.getElementById("approvals-search");t&&!t.dataset.listenerAdded&&(t.addEventListener("input",i=>{const a=i.target.value.toLowerCase();document.querySelectorAll("#approvals-table-body tr[data-incident-id]").forEach(o=>{const s=o.textContent.toLowerCase();o.style.display=s.includes(a)?"":"none"})}),t.dataset.listenerAdded="true")},100)},async showAnalysisSettingsModal(){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=await this.getAnalysisSettings(),t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="analysis-settings-form" class="space-y-6">
                        <div>
                            <h3 class="text-base font-semibold text-gray-700 mb-4">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629</h3>
                            <p class="text-sm text-gray-600 mb-4">\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0639\u0631\u0636\u0647\u0627 \u0641\u064A \u062A\u0628\u0648\u064A\u0628 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B:</p>
                            <div class="space-y-3">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="summary" 
                                        ${(e.enabledSections||[]).includes("summary")?"checked":""}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">\u0645\u0644\u062E\u0635 \u0639\u0627\u0645</span>
                                        <p class="text-xs text-gray-500">\u0639\u0631\u0636 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B\u060C \u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u060C \u0648\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0646\u0648\u064A</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="trends" 
                                        ${(e.enabledSections||[]).includes("trends")?"checked":""}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A</span>
                                        <p class="text-xs text-gray-500">\u0639\u0631\u0636 \u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0639\u0644\u0649 \u0645\u0631 \u0627\u0644\u0633\u0646\u064A\u0646</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="severity" 
                                        ${(e.enabledSections||[]).includes("severity")?"checked":""}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0634\u062F\u0629</span>
                                        <p class="text-xs text-gray-500">\u0639\u0631\u0636 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629 (\u0639\u0627\u0644\u064A\u0629\u060C \u0645\u062A\u0648\u0633\u0637\u0629\u060C \u0645\u0646\u062E\u0641\u0636\u0629)</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="department" 
                                        ${(e.enabledSections||[]).includes("department")?"checked":""}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</span>
                                        <p class="text-xs text-gray-500">\u0639\u0631\u0636 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="location" 
                                        ${(e.enabledSections||[]).includes("location")?"checked":""}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</span>
                                        <p class="text-xs text-gray-500">\u0639\u0631\u0636 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button class="btn-primary" onclick="Incidents.saveAnalysisSettings(); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t),t.addEventListener("click",i=>{i.target===t&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&t.remove()})},async saveAnalysisSettings(){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("analysis-settings-form");if(!e)return;const t=e.querySelectorAll('input[name="enabledSections"]:checked'),i=Array.from(t).map(n=>n.value),a={enabledSections:i.length>0?i:["summary","trends","severity","department"],updatedAt:new Date().toISOString(),updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown"};try{if(Loading.show(),typeof GoogleIntegration<"u"&&GoogleIntegration.callAppsScript){const n=await GoogleIntegration.callAppsScript("saveIncidentAnalysisSettings",{settings:a});if(n&&n.success){if(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="analysis"){const o=document.getElementById("incidents-tab-content");o&&(o.innerHTML=await this.renderTabContent("analysis"),this.setupTabEventListeners("analysis"))}}else Notification.error(n?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}else if(localStorage.setItem("incident_analysis_settings",JSON.stringify(a)),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),this.currentTab==="analysis"){const n=document.getElementById("incidents-tab-content");n&&(n.innerHTML=await this.renderTabContent("analysis"),this.setupTabEventListeners("analysis"))}Loading.hide()}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}},renderAnalytics(){const e=this.buildThreeYearAnalytics(),{yearlyStats:t,totals:i,severityTotals:a}=e,n=this.formatImprovementValue(e.currentImprovement),o=i.totalIncidents>0,s=f=>{if(!f)return"-";try{if(typeof Utils<"u"){if(typeof Utils.formatDateTime=="function")return Utils.formatDateTime(f instanceof Date?f.toISOString():f);if(typeof Utils.formatDate=="function")return Utils.formatDate(f instanceof Date?f.toISOString():f)}}catch{}const g=f instanceof Date?f:new Date(f);return Number.isNaN(g.getTime())?"-":g.toLocaleDateString("ar-SA")},r=[{label:"\u0639\u0627\u0644\u064A\u0629",value:a.high||0,color:"bg-red-100 text-red-700 border-red-200"},{label:"\u0645\u062A\u0648\u0633\u0637\u0629",value:a.medium||0,color:"bg-yellow-100 text-yellow-700 border-yellow-200"},{label:"\u0645\u0646\u062E\u0641\u0636\u0629",value:a.low||0,color:"bg-blue-100 text-blue-700 border-blue-200"},{label:"\u0623\u062E\u0631\u0649",value:a.other||0,color:"bg-gray-100 text-gray-700 border-gray-200"}].filter(f=>f.value>0||o),d=r.length>0?r.map(f=>`
                <span class="px-3 py-1 text-xs font-medium border rounded-full ${f.color}">
                    ${f.label}: ${f.value}
                </span>
            `).join(""):'<span class="text-xs text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629.</span>',l=20,c=e.incidents.slice(0,l).map(({incident:f,date:g,year:x})=>{const w=this.getSeverityBadgeClass(f?.severity),y=this.getStatusBadgeClass(f?.status),A=f?.id||"",I=A?`
                <div class="flex items-center gap-2 justify-end">
                    <button onclick="Incidents.viewIncident('${A}')" class="btn-icon btn-icon-info" title="\u0645\u0639\u0627\u064A\u0646\u0629">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.exportPDF('${A}')" class="btn-icon btn-icon-primary" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            `:'<span class="text-xs text-gray-400">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D</span>';return`
                <tr>
                    <td>${x}</td>
                    <td>${s(g)}</td>
                    <td>${Utils.escapeHTML(f?.title||"-")}</td>
                    <td>${Utils.escapeHTML(f?.location||"-")}</td>
                    <td>
                        <span class="badge badge-${w}">
                            ${Utils.escapeHTML(f?.severity||"-")}
                        </span>
                    </td>
                    <td>
                        <span class="badge badge-${y}">
                            ${Utils.escapeHTML(f?.status||"-")}
                        </span>
                    </td>
                    <td>${I}</td>
                </tr>
            `}).join(""),u=e.incidents.length===0?'<tr><td colspan="7" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u0633\u062C\u0644\u0629 \u062E\u0644\u0627\u0644 \u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A.</td></tr>':c,p=t.map(f=>{const g=this.formatImprovementValue(f.improvementVsPrevious);return`
                <tr>
                    <td>${f.year}</td>
                    <td>${f.total}</td>
                    <td>${f.closed}</td>
                    <td>${f.closureRate.toFixed(1)}%</td>
                    <td>
                        <div class="space-y-1 text-xs">
                            <div><span class="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>\u0639\u0627\u0644\u064A\u0629: ${f.severity.high}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-yellow-500 ml-1"></span>\u0645\u062A\u0648\u0633\u0637\u0629: ${f.severity.medium}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-blue-500 ml-1"></span>\u0645\u0646\u062E\u0641\u0636\u0629: ${f.severity.low}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-gray-500 ml-1"></span>\u0623\u062E\u0631\u0649: ${f.severity.other}</div>
                        </div>
                    </td>
                    <td>
                        <span class="font-semibold ${g.className}">${g.label}</span>
                    </td>
                </tr>
            `}).join(""),m=o?p:'<tr><td colspan="6" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A.</td></tr>';return`
            <div class="space-y-6">
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <h2 class="card-title">
                                <i class="fas fa-chart-column ml-2"></i>
                                \u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u062F\u0627\u0621 \u0644\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A
                            </h2>
                            <div class="flex items-center gap-2">
                                <button id="incidents-report-preview" class="btn-secondary">
                                    <i class="fas fa-eye ml-2"></i>
                                    \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                                </button>
                                <button class="btn-primary" data-incidents-export="pdf">
                                    <i class="fas fa-file-pdf ml-2"></i>
                                    PDF
                                </button>
                                <button class="btn-primary" data-incidents-export="excel">
                                    <i class="fas fa-file-excel ml-2"></i>
                                    Excel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</p>
                                <p class="text-3xl font-bold text-gray-900">${i.totalIncidents}</p>
                                <p class="text-xs text-gray-400 mt-1">\u0627\u0644\u0641\u062A\u0631\u0629: ${i.rangeLabel}</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</p>
                                <p class="text-3xl font-bold text-green-600">${i.closureRate.toFixed(1)}%</p>
                                <p class="text-xs text-gray-400 mt-1">\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629: ${i.closedIncidents}</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0639\u0646 \u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642</p>
                                <p class="text-3xl font-bold ${n.className}">${n.label}</p>
                                <p class="text-xs text-gray-400 mt-1">\u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0646\u0629 ${t[0]?.year||""} \u0645\u0639 ${t[1]?.year||""}</p>
                            </div>
                        </div>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p class="text-xs text-gray-500 mb-1">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0646\u0648\u064A</p>
                                <p class="text-2xl font-semibold text-gray-800">${i.averagePerYear.toFixed(1)}</p>
                                <p class="text-xs text-gray-500 mt-1">\u064A\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628 \u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0639\u0644\u0649 \u0623\u0633\u0627\u0633 \u0663 \u0633\u0646\u0648\u0627\u062A.</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p class="text-xs text-gray-500 mb-2">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629</p>
                                <div class="flex flex-wrap gap-2">
                                    ${d}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0646\u0648\u064A (\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A)
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u0633\u0646\u0629</th>
                                        <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                                        <th>\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629</th>
                                        <th>\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                                        <th>\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0634\u062F\u0629</th>
                                        <th>\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${m}
                                </tbody>
                            </table>
                        </div>
                        <p class="text-xs text-gray-500 mt-3">
                            * \u064A\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0646\u062E\u0641\u0627\u0636 \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642 (\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0639\u062F\u062F \u062A\u0639\u0646\u064A \u062A\u0631\u0627\u062C\u0639 \u0627\u0644\u0623\u062F\u0627\u0621).
                        </p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                <i class="fas fa-clipboard-list ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A (\u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A)
                            </h2>
                            <span class="text-xs text-gray-500">
                                ${e.incidents.length} \u062D\u0627\u062F\u062B \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629
                            </span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u0633\u0646\u0629</th>
                                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                                        <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                        <th>\u0627\u0644\u0634\u062F\u0629</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${u}
                                </tbody>
                            </table>
                        </div>
                        ${e.incidents.length>l?`
                            <p class="text-xs text-gray-500 mt-3">
                                * \u062A\u0645 \u0639\u0631\u0636 \u0623\u0648\u0644 ${l} \u062D\u0648\u0627\u062F\u062B \u0641\u0642\u0637. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0631\u062C\u0648\u0639 \u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0644\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644.
                            </p>
                        `:""}
                    </div>
                </div>
            </div>
        `},refreshAnalytics(){const e=document.getElementById("incident-analytics-wrapper");e&&(e.innerHTML=this.renderAnalytics())},buildReportContent(){const e=this.buildThreeYearAnalytics(),{yearlyStats:t,totals:i,severityTotals:a}=e,n=this.formatImprovementValue(e.currentImprovement),o=(f="")=>{const g=f==null?"":String(f);if(typeof Utils<"u"&&typeof Utils.escapeHTML=="function")return Utils.escapeHTML(g);const x=document.createElement("div");return x.textContent=g,x.innerHTML},s=f=>{if(!f)return"-";try{if(typeof Utils<"u"){if(typeof Utils.formatDateTime=="function")return Utils.formatDateTime(f instanceof Date?f.toISOString():f);if(typeof Utils.formatDate=="function")return Utils.formatDate(f instanceof Date?f.toISOString():f)}}catch{}const g=f instanceof Date?f:new Date(f);return Number.isNaN(g.getTime())?"-":g.toLocaleDateString("ar-SA")},r=`
            <h1 style="font-size: 20px; margin-bottom: 8px;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B - \u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A</h1>
            <p style="color: #6b7280; margin-bottom: 16px;">
                \u0627\u0644\u0641\u062A\u0631\u0629: ${i.rangeLabel} \u2022 \u062A\u0645 \u0627\u0644\u062A\u0648\u0644\u064A\u062F \u0641\u064A ${s(new Date)}
            </p>
        `,d=`
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f9fafb;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0645\u0624\u0634\u0631</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0642\u064A\u0645\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u062A\u0641\u0627\u0635\u064A\u0644</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${i.totalIncidents}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${i.closureRate.toFixed(1)}%</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629: ${i.closedIncidents}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0633\u0646\u0648\u064A</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${i.averagePerYear.toFixed(1)}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u062D\u0633\u0648\u0628 \u0639\u0644\u0649 \u0623\u0633\u0627\u0633 \u062B\u0644\u0627\u062B \u0633\u0646\u0648\u0627\u062A</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646 (\u0622\u062E\u0631 \u0633\u0646\u0629)</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${n.label}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${n.value===null?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0631\u0646\u0629":n.value>0?"\u0627\u0646\u062E\u0641\u0627\u0636 \u0641\u064A \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642":"\u0632\u064A\u0627\u062F\u0629 \u0641\u064A \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642"}</td>
                    </tr>
                </tbody>
            </table>
        `,l=`
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0634\u062F\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0639\u0627\u0644\u064A\u0629</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${a.high||0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u062A\u0648\u0633\u0637\u0629</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${a.medium||0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0645\u0646\u062E\u0641\u0636\u0629</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${a.low||0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">\u0623\u062E\u0631\u0649</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${a.other||0}</td>
                    </tr>
                </tbody>
            </table>
        `,u=`
            <h2 style="font-size: 16px; margin: 24px 0 12px;">\u0645\u0644\u062E\u0635 \u0633\u0646\u0648\u064A</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f9fafb;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0633\u0646\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u063A\u0644\u0642\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0634\u062F\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u062D\u0633\u064A\u0646</th>
                    </tr>
                </thead>
                <tbody>
                    ${t.map(f=>{const g=this.formatImprovementValue(f.improvementVsPrevious);return`
                <tr>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${f.year}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${f.total}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${f.closed}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${f.closureRate.toFixed(1)}%</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">
                        \u0639\u0627\u0644\u064A\u0629: ${f.severity.high} \u2022 \u0645\u062A\u0648\u0633\u0637\u0629: ${f.severity.medium} \u2022 \u0645\u0646\u062E\u0641\u0636\u0629: ${f.severity.low} \u2022 \u0623\u062E\u0631\u0649: ${f.severity.other}
                    </td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">
                        ${g.label}
                    </td>
                </tr>
            `}).join("")||'<tr><td colspan="6" style="text-align:center; padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u0646\u0648\u064A\u0629 \u0645\u062A\u0627\u062D\u0629.</td></tr>'}
                </tbody>
            </table>
        `,m=`
            <h2 style="font-size: 16px; margin: 24px 0 12px;">\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0633\u0646\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u0634\u062F\u0629</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.incidents.map(({incident:f,date:g,year:x})=>`
            <tr>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${x}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${s(g)}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${o(f?.title||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${o(f?.location||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${o(f?.severity||"-")}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${o(f?.status||"-")}</td>
            </tr>
        `).join("")||'<tr><td colspan="6" style="text-align:center; padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062B\u0644\u0627\u062B \u0627\u0644\u0645\u0627\u0636\u064A\u0629.</td></tr>'}
                </tbody>
            </table>
        `;return{headerSection:r,summarySection:d,severitySection:l,yearlySection:u,detailsSection:m}},openReportPreview(){const e=document.getElementById(this.reportPreviewModalId);e&&e.remove();const t=this.buildReportContent(),i=document.createElement("div");i.id=this.reportPreviewModalId,i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0645\u0639\u0627\u064A\u0646\u0629 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <div class="prose prose-sm" style="direction: rtl; text-align: right;">
                        ${t.headerSection}
                        ${t.summarySection}
                        ${t.severitySection}
                        ${t.yearlySection}
                        ${t.detailsSection}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="Incidents.exportIncidentsReport('pdf'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",a=>{a.target===i&&i.remove()})},exportIncidentsReport(e="pdf"){const t=this.buildReportContent(),i=`
            ${t.headerSection}
            ${t.summarySection}
            ${t.severitySection}
            ${t.yearlySection}
            ${t.detailsSection}
        `,a=`incidents-report-${new Date().toISOString().slice(0,10)}`;if(e==="pdf"){const o=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML("INCIDENTS-REPORT","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B - \u0622\u062E\u0631 \u0663 \u0633\u0646\u0648\u0627\u062A",i,!1,!0,{version:"1.0"},new Date().toISOString(),new Date().toISOString()):`<html><head>
                <style>
                    body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; color: #111827; margin: 24px; }
                    h1, h2 { color: #1f2937; }
                    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
                    th, td { border: 1px solid #e5e7eb; padding: 8px; font-size: 13px; }
                    thead th { background-color: #f9fafb; font-weight: 600; }
                    tbody tr:nth-child(even) { background-color: #f9fafb; }
                </style>
            </head><body>${i}</body></html>`,s=new Blob([o],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(s),d=window.open(r,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>{URL.revokeObjectURL(r),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},500)},300)}:Notification.error("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629.");return}if(e==="excel"){const n=`
                <html xmlns:o="urn:schemas-microsoft-com:office:office"
                      xmlns:x="urn:schemas-microsoft-com:office:excel"
                      xmlns="http://www.w3.org/TR/REC-html40">
                    <head>
                        <!--[if gte mso 9]><xml>
                        <x:ExcelWorkbook>
                            <x:ExcelWorksheets>
                                <x:ExcelWorksheet>
                                    <x:Name>Incidents</x:Name>
                                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                                </x:ExcelWorksheet>
                            </x:ExcelWorksheets>
                        </x:ExcelWorkbook>
                        </xml><![endif]-->
                    </head>
                    <body>
                        ${i}
                    </body>
                </html>
            `,o=new Blob(["\uFEFF",n],{type:"application/vnd.ms-excel;charset=utf-8"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`${a}.xls`,document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(s)},0),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0635\u064A\u063A\u0629 Excel");return}Notification.error("\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u0629.")},async renderList(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                        </h2>
                        <div class="flex items-center gap-4">
                            <input 
                                type="text" 
                                id="incidents-search" 
                                class="form-input" 
                                style="max-width: 300px;"
                                placeholder="\u0627\u0644\u0628\u062D\u062B..."
                            >
                            <select id="incidents-filter-status" class="form-input" style="max-width: 200px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u0645\u0641\u062A\u0648\u062D</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642">\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</option>
                                <option value="\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A">\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">\u0645\u0643\u062A\u0645\u0644</option>
                                <option value="\u0645\u063A\u0644\u0642">\u0645\u063A\u0644\u0642</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="incidents-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadIncidentsList(){const e=document.getElementById("incidents-table-container");if(!e)return;const t=this.getCanonicalIncidents();t.forEach(n=>this._normalizeIncidentApprovalRecord(n));const i=t.map(n=>`${n?.id||"NA"}-${n?.updatedAt||n?.createdAt||"NA"}`).join("|");if(this.lastRenderedSignature===i&&e.dataset.renderSignature===i){this.refreshAnalytics();return}if(e.innerHTML=`
            <div class="empty-state">
                <div style="width: 300px; margin: 0 auto 16px;">
                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                    </div>
                </div>
                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644...</p>
            </div>
        `,await new Promise(n=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>n(),{timeout:200}):typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>n()):setTimeout(()=>n(),0)}),t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u0633\u062C\u0644\u0629</p>
                    <button id="add-incident-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u062F\u062B \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `,e.dataset.renderSignature=i,this.lastRenderedSignature=i,this.refreshAnalytics();return}let a="";try{a=`
                <div class="table-wrapper" style="overflow-x: auto;">
                    <table class="data-table table-header-red">
                        <thead>
                            <tr>
                                <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th>\u0627\u0644\u0634\u062F\u0629</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                                <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>
                                <th>\u0627\u0644\u0623\u0637\u0631\u0627\u0641 / \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631</th>
                                <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                                <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map(n=>this.renderIncidentsListRow(n)).join("")}
                        </tbody>
                    </table>
                </div>
            `}catch(n){Utils.safeError("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0648\u0644\u064A\u062F \u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B:",n),e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.</p>
                </div>
            `;return}e.innerHTML=a,e.dataset.renderSignature=i,this.lastRenderedSignature=i,this.refreshAnalytics(),this.applyPermissions()},getSeverityBadgeClass(e){return{\u0639\u0627\u0644\u064A\u0629:"danger",\u0645\u062A\u0648\u0633\u0637\u0629:"warning",\u0645\u0646\u062E\u0641\u0636\u0629:"info"}[e]||"secondary"},getStatusBadgeClass(e){return{\u0645\u0641\u062A\u0648\u062D:"info","\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"warning",\u0645\u0643\u062A\u0645\u0644:"success",\u0645\u063A\u0644\u0642:"success","\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629":"warning","\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A":"success"}[e]||"secondary"},renderWorkflowStatusBadge(e){const t=this.getIncidentApprovalState(e),i=[];t.approverName&&i.push(`\u0627\u0639\u062A\u0645\u062F: ${t.approverName}`),t.approvedAt&&i.push(Utils.formatDate(t.approvedAt));const a=i.length?` title="${Utils.escapeHTML(i.join(" \u2014 "))}"`:"";return`<span class="badge badge-${t.badgeClass}"${a}>${Utils.escapeHTML(t.label)}</span>`},_coerceIncidentBoolean(e){if(e===!0||e===1)return!0;if(e===!1||e===0||e==null||e==="")return!1;const t=String(e).trim().toLowerCase();return t==="true"||t==="1"||t==="yes"||t==="\u0646\u0639\u0645"},_resolveIncidentApproverInfo(e){if(!e)return{name:"",raw:""};if(typeof e=="object"){const a=String(e.name||e.displayName||e.fullName||"").trim(),n=String(e.email||"").trim();return{name:a||n,raw:a||n}}const t=String(e).trim();return t?{name:t.includes(" - ")?t.split(" - ")[0].trim():t,raw:t}:{name:"",raw:""}},_normalizeIncidentApprovalRecord(e){if(!e||typeof e!="object")return e;e.requiresApproval=this._coerceIncidentBoolean(e.requiresApproval),["approvedBy","rejectedBy","createdBy"].forEach(i=>{const a=e[i];if(typeof a=="string"&&a.trim().startsWith("{"))try{e[i]=JSON.parse(a)}catch{}});const t=!!(e.approvedAt||this._resolveIncidentApproverInfo(e.approvedBy).raw);return e.requiresApproval&&t&&!e.rejectionReason&&!e.rejectedAt&&(e.requiresApproval=!1),e},normalizeAllIncidentsApprovalState(){(AppState.appData?.incidents||[]).forEach(e=>this._normalizeIncidentApprovalRecord(e))},getIncidentApprovalState(e){if(!e)return{key:"unknown",label:"\u2014",badgeClass:"secondary",awaitingApproval:!1,approved:!1,rejected:!1,approverName:"",approvedAt:null};const t={...e};this._normalizeIncidentApprovalRecord(t);const i=this.hasInvestigationData(t),a=this.isInvestigationComplete(t),n=this._resolveIncidentApproverInfo(t.approvedBy),o=!!(t.rejectedAt||t.rejectionReason),s=(t.requiresApproval===!0||t.status==="\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629")&&a,r=!s&&!o&&(!!(t.approvedAt||n.raw)||t.status==="\u0645\u0643\u062A\u0645\u0644"&&a);let d="draft",l="\u0645\u0633\u0648\u062F\u0629",c="secondary";return o?(d="rejected",l="\u0645\u0631\u0641\u0648\u0636",c="danger"):r?(d="approved",l="\u0645\u0639\u062A\u0645\u062F",c="success"):s?(d="pending",l="\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",c="warning"):a?(d="investigation_complete",l="\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A",c="success"):i&&(d="in_progress",l="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642",c="info"),{key:d,label:l,badgeClass:c,awaitingApproval:s,approved:r,rejected:o,approverName:n.name,approvedAt:t.approvedAt||null}},_syncIncidentWorkflowOnApproval(e,t){try{if(!Array.isArray(AppState.appData?.workflows)||typeof Workflow>"u")return;const i=AppState.appData.workflows.find(a=>a.module==="incidents"&&a.recordId===e);if(!i)return;t==="approved"?i.status=Workflow.STATUSES.APPROVED:t==="rejected"?Workflow.reject(i,AppState.currentUser,{source:"incidents"}):t==="pending"&&(i.status=Workflow.STATUSES.AWAITING_APPROVAL),i.updatedAt=new Date().toISOString()}catch{}},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("open-investigation-form-btn"),t=document.getElementById("add-incident-empty-btn"),i=document.getElementById("add-incident-notification-btn");e&&e.addEventListener("click",()=>{this.showInvestigationFormSelector()}),t&&t.addEventListener("click",()=>this.showNotificationForm()),i&&i.addEventListener("click",()=>this.showNotificationForm()),this.applyPermissions();const a=document.getElementById("incidents-search"),n=document.getElementById("incidents-filter-status");a&&a.addEventListener("input",v=>this.filterIncidents(v.target.value,n?.value)),n&&n.addEventListener("change",v=>this.filterIncidents(a?.value,v.target.value));const o=document.getElementById("incident-form");o&&o.addEventListener("submit",v=>this.handleSubmit(v));const s=document.getElementById("cancel-incident-btn");s&&s.addEventListener("click",()=>{this.exitIncidentForm(this._formReturnTab||"incidents-list")});const r=document.getElementById("incident-form-back-btn");r&&r.addEventListener("click",()=>{this.exitIncidentForm(this._formReturnTab||"incidents-list")});const d=document.getElementById("open-investigation-btn");d&&this.currentEditId?d.addEventListener("click",()=>{try{Utils.safeLog("\u{1F50D} Investigation button clicked for incident:",this.currentEditId),typeof this.showInvestigationForm=="function"?this.showInvestigationForm(this.currentEditId):(Utils.safeError("showInvestigationForm function not found"),Notification.error("\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629."))}catch(v){Utils.safeError("Error opening investigation form:",v),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+v.message)}}):d&&!this.currentEditId&&Utils.safeWarn("Investigation button found but currentEditId is null");const l=document.getElementById("add-action-plan-row");l&&l.addEventListener("click",()=>this.addActionPlanRow());const c=document.getElementById("incident-affected-type");c&&(c.addEventListener("change",v=>this.handleAffectedTypeChange(v.target.value)),this.handleAffectedTypeChange(c.value));const u=document.getElementById("incident-attachments-input");u&&u.addEventListener("change",v=>this.handleAttachmentsChange(v.target.files)),(CloudStorageIntegration?.getAvailableServices()||[]).forEach(v=>{const $=document.getElementById(`incident-cloud-upload-${v}`);$&&$.addEventListener("click",()=>this.handleCloudUpload("incident",v))});const m=document.getElementById("incidents-report-preview");m&&m.addEventListener("click",()=>this.openReportPreview()),document.querySelectorAll("[data-incidents-export]").forEach(v=>{const $=v.getAttribute("data-incidents-export");v.addEventListener("click",()=>this.exportIncidentsReport($))});const f=document.getElementById("incidents-registry-add-manual");f&&!f.dataset.listenerAdded&&(f.addEventListener("click",()=>this.showManualEntryForm()),f.dataset.listenerAdded="true");const g=document.getElementById("incidents-registry-search"),x=document.getElementById("incidents-registry-filter-status"),w=document.getElementById("incidents-registry-filter-date-from"),y=document.getElementById("incidents-registry-filter-date-to");g&&!g.dataset.listenerAdded&&(g.addEventListener("input",()=>this.applyRegistryFilters()),g.dataset.listenerAdded="true"),x&&!x.dataset.listenerAdded&&(x.addEventListener("change",()=>this.applyRegistryFilters()),x.dataset.listenerAdded="true"),w&&!w.dataset.listenerAdded&&(w.addEventListener("change",()=>this.applyRegistryFilters()),w.dataset.listenerAdded="true"),y&&!y.dataset.listenerAdded&&(y.addEventListener("change",()=>this.applyRegistryFilters()),y.dataset.listenerAdded="true");const A=document.getElementById("incidents-registry-export-excel"),I=document.getElementById("incidents-registry-export-pdf");A&&!A.dataset.listenerAdded&&(A.addEventListener("click",()=>this.exportRegistryToExcel()),A.dataset.listenerAdded="true"),I&&!I.dataset.listenerAdded&&(I.addEventListener("click",()=>this.exportRegistryToPDF()),I.dataset.listenerAdded="true")},100)},async exitIncidentForm(e="incidents-list"){const t=e||"incidents-list";this.currentEditId=null,this.currentAttachments=[],this._formReturnTab=null;const i=document.getElementById("incidents-content");if(!i){typeof Loading<"u"&&Loading.hide&&Loading.hide();return}i.innerHTML=await this.renderMainView(),typeof this.applyModuleI18n=="function"&&this.applyModuleI18n(i),this.setupEventListeners(),this.currentTab=t,await this.switchTab(t),typeof Loading<"u"&&Loading.hide&&Loading.hide()},async showForm(e=null){if(typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{await Permissions.ensureFormSettingsState()}catch{}this._formReturnTab||(this._formReturnTab=this.currentTab||"incidents-list"),e&&this._mergeIncidentWithInvestigationData(e),this.currentEditId=e?.id||null;const t=Array.isArray(e?.attachments)?e.attachments:[];this.currentAttachments=t.map(a=>this.normalizeAttachment(a)).filter(Boolean);const i=document.getElementById("incidents-content");i&&(i.innerHTML=await this.renderForm(e),this.setupEventListeners(),this.setupFormFields(e),this.populateActionPlanRows(e?.actionPlan||[]),this.renderAttachmentsList(),this.setupAffectedAutocomplete(e))},async renderForm(e=null){const t=!!e,i=e?.isoCode||this.generateISOCode("INC"),a=typeof AppState<"u"&&AppState.companyLogo?AppState.companyLogo:"",n=this.renderCloudStorageUploadButtons?this.renderCloudStorageUploadButtons("incident"):"";return`
            <div class="content-card">
                ${a?`
                    <div class="mb-4 pb-4 border-b" style="direction: ltr; text-align: left;">
                        <img src="${a}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" style="max-height: 60px; max-width: 150px;">
                    </div>
                `:""}
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <h2 class="card-title mb-0">
                            <i class="fas fa-${t?"edit":"plus-circle"} ml-2"></i>
                            ${t?"\u062A\u0639\u062F\u064A\u0644 \u062D\u0627\u062F\u062B":"\u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u062F\u062B \u062C\u062F\u064A\u062F"}
                        </h2>
                        <button type="button" id="incident-form-back-btn" class="btn-secondary btn-sm">
                            <i class="fas fa-arrow-right ml-2"></i>
                            \u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0642\u0627\u0626\u0645\u0629
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <form id="incident-form" class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-id-card ml-2"></i>
                                    \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u0645\u0628\u0644\u063A *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-employee-code" 
                                    required
                                    class="form-input"
                                    value="${e?.reporterCode||e?.employeeCode||e?.employeeNumber||""}"
                                    placeholder="\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-code ml-2"></i>
                                    \u0643\u0648\u062F ISO *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-iso-code" 
                                    class="form-input"
                                    value="${i}"
                                    readonly
                                    style="background-color: #f3f4f6;"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-heading ml-2"></i>
                                    \u0627\u0644\u0639\u0646\u0648\u0627\u0646 *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-title" 
                                    required
                                    class="form-input"
                                    value="${e?.title||""}"
                                    placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-map-marker-alt ml-2"></i>
                                    \u0627\u0644\u0645\u0648\u0642\u0639 *
                                </label>
                                <select 
                                    id="incident-location" 
                                    required
                                    class="form-input"
                                >
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                </select>
                                <input 
                                    type="text" 
                                    id="incident-location-custom" 
                                    class="form-input mt-2 hidden"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 \u064A\u062F\u0648\u064A\u0627\u064B"
                                >
                                <button type="button" id="incident-location-toggle" class="btn-link text-xs mt-1 text-blue-600">
                                    <i class="fas fa-edit ml-1"></i>\u0625\u062F\u062E\u0627\u0644 \u0645\u0648\u0642\u0639 \u0645\u062E\u0635\u0635
                                </button>
                            </div>
                            <div id="incident-sublocation-wrapper" style="display: none;">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-map-pin ml-2"></i>
                                    \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A
                                </label>
                                <select 
                                    id="incident-sublocation" 
                                    class="form-input"
                                >
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-calendar ml-2"></i>
                                    \u0627\u0644\u062A\u0627\u0631\u064A\u062E *
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="incident-date" 
                                    required
                                    class="form-input"
                                    value="${this.safeDateToISOString(e?.date)}"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-exclamation-circle ml-2"></i>
                                    \u0627\u0644\u0634\u062F\u0629 *
                                </label>
                                <select id="incident-severity" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u062F\u0629</option>
                                    <option value="\u0639\u0627\u0644\u064A\u0629" ${e?.severity==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${e?.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                    <option value="\u0645\u0646\u062E\u0641\u0636\u0629" ${e?.severity==="\u0645\u0646\u062E\u0641\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0641\u0636\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-layer-group ml-2"></i>
                                    \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B *
                                </label>
                                <select id="incident-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</option>
                                    <option value="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644" ${e?.incidentType==="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644"?"selected":""}>\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644</option>
                                    <option value="\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A" ${e?.incidentType==="\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A"?"selected":""}>\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A</option>
                                    <option value="\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A" ${e?.incidentType==="\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A"?"selected":""}>\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A</option>
                                    <option value="\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A" ${e?.incidentType==="\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A"?"selected":""}>\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A</option>
                                    <option value="\u0622\u062E\u0631" ${e?.incidentType==="\u0622\u062E\u0631"?"selected":""}>\u0622\u062E\u0631</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u0627\u0644\u062D\u0627\u0644\u0629 *
                                </label>
                                <select id="incident-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                    <option value="\u0645\u0641\u062A\u0648\u062D" ${e?.status==="\u0645\u0641\u062A\u0648\u062D"?"selected":""}>\u0645\u0641\u062A\u0648\u062D</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${e?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u063A\u0644\u0642" ${e?.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user ml-2"></i>
                                    \u0627\u0644\u0645\u0628\u0644\u063A (\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641) *
                                </label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="incident-reported-by" 
                                        required
                                        class="form-input"
                                        value="${e?.reportedBy||""}"
                                        placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"
                                        autocomplete="off"
                                    >
                                    <div id="incident-reported-dropdown" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-align-right ml-2"></i>
                                    \u0627\u0644\u0648\u0635\u0641 *
                                </label>
                                <textarea 
                                    id="incident-description" 
                                    required
                                    class="form-input" 
                                    rows="4"
                                    placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u0627\u062F\u062B"
                                >${e?.description||""}</textarea>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <h3 class="text-base font-semibold text-gray-700 mb-4">
                                <i class="fas fa-users ml-2"></i>
                                \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0645\u062A\u0636\u0631\u0631
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0648\u0639 *</label>
                                    <select id="incident-affected-type" class="form-input">
                                        <option value="employee" ${e?.affectedType==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                        <option value="contractor" ${e?.affectedType==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                        <option value="visitor" ${e?.affectedType==="visitor"?"selected":""}>\u0632\u0627\u0626\u0631</option>
                                        <option value="other" ${e?.affectedType==="other"?"selected":""}>\u0637\u0631\u0641 \u0622\u062E\u0631</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</label>
                                    <input type="text" id="incident-affected-code" class="form-input" value="${e?.affectedCode||""}" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0643\u0648\u062F \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0648\u0638\u0641" autocomplete="off">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0645\u062A\u0636\u0631\u0631 *</label>
                                    <input type="text" id="incident-affected-name" required class="form-input" value="${e?.affectedName||""}" placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F" autocomplete="off">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</label>
                                    <input type="text" id="incident-affected-job" class="form-input" value="${e?.affectedJobTitle||""}" placeholder="\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                    <input type="text" id="incident-affected-department" class="form-input" value="${e?.affectedDepartment||""}" placeholder="\u0627\u0644\u0642\u0633\u0645 \u0623\u0648 \u0627\u0644\u0625\u062F\u0627\u0631\u0629">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644</label>
                                    <input type="text" id="incident-affected-contact" class="form-input" value="${e?.affectedContact||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A">
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="fas fa-info-circle text-blue-600"></i>
                                    <h4 class="text-sm font-semibold text-blue-800">\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0647\u0645\u0629</h4>
                                </div>
                                <p class="text-sm text-blue-700">
                                    \u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0627\u0644\u0645\u0646\u0641\u0635\u0644 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B.
                                    \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u064A\u0647 \u0645\u0646 \u0635\u0641\u062D\u0629 \u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u062F\u062B \u0623\u0648 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B.
                                </p>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-base font-semibold text-gray-700">
                                    <i class="fas fa-clipboard-check ml-2"></i>
                                    \u062E\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629
                                </h3>
                                <button type="button" id="add-action-plan-row" class="btn-secondary">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621
                                </button>
                            </div>
                            <div class="table-wrapper" style="overflow-x: auto;">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                                            <th>\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                                            <th>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody id="incident-action-plan-body"></tbody>
                                </table>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">\u062A\u0645\u062B\u0644 \u0643\u0644 \u062E\u0637\u0629 \u0645\u0633\u0627\u0631\u0627\u064B \u0627\u0644\u0639\u0645\u0644 \u0648\u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647\u0627 \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0642\u064A\u0642.</p>
                        </div>

                        <div class="border-t pt-4">
                            <h3 class="text-base font-semibold text-gray-700 mb-4">
                                <i class="fas fa-paperclip ml-2"></i>
                                \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0648\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0628\u0635\u0631\u064A
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-upload ml-2"></i>
                                        \u062A\u062D\u0645\u064A\u0644 \u0645\u0631\u0641\u0642\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629
                                    </label>
                                    <input type="file" id="incident-attachments-input" class="form-input" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx" multiple>
                                    <p class="text-xs text-gray-500 mt-2">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0643\u0644 \u0645\u0644\u0641 5MB.</p>
                                    ${n}
                                    <div id="incident-attachments-list" class="mt-3 space-y-2"></div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-image ml-2"></i>
                                        \u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 (\u063A\u064A\u0631 \u0625\u0644\u0632\u0627\u0645\u064A)
                                    </label>
                                    <input type="file" id="incident-image-input" accept="image/*" class="form-input">
                                    <div id="incident-image-preview" class="mt-2 ${e?.image?"":"hidden"}">
                                        <img src="${e?.image?this.convertGoogleDriveLinkToPrintable(e.image):""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u062F\u062B" class="w-48 h-48 object-cover rounded border mt-2" id="incident-image-img">
                                        <button type="button" onclick="document.getElementById('incident-image-input').value=''; document.getElementById('incident-image-preview').classList.add('hidden');" class="mt-1 text-xs text-red-600">\u062D\u0630 \u0627\u0644\u0635\u0648\u0631\u0629</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" id="cancel-incident-btn" class="btn-secondary">
                                \u0625\u0644\u063A\u0627\u0621
                            </button>
                            ${t?`
                            <button type="button" id="open-investigation-btn" class="btn-secondary">
                                <i class="fas fa-search ml-2"></i>
                                ${e?.investigation?"\u0639\u0631\u0636/\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B"}
                            </button>
                            `:""}
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `},setupFormFields(e=null){setTimeout(()=>{const t=this;typeof EmployeeHelper<"u"&&(EmployeeHelper.setupEmployeeCodeSearch("incident-employee-code","incident-reported-by",u=>{if(u){const p=document.getElementById("incident-employee-code"),m=document.getElementById("incident-reported-by");p&&(p.value=u.code||u.employeeNumber||u.sapId||""),m&&(m.value=u.name||u.fullName||"")}}),EmployeeHelper.setupAutocomplete("incident-reported-by",u=>{if(u){const p=document.getElementById("incident-employee-code");p&&(p.value=u.code||u.employeeNumber||u.sapId||"")}}));const i=document.getElementById("incident-location"),a=document.getElementById("incident-location-custom"),n=document.getElementById("incident-location-toggle"),o=document.getElementById("incident-sublocation-wrapper"),s=document.getElementById("incident-sublocation"),r=u=>{if(!s||!o)return;if(s.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',!u){o.style.display="none";return}const p=t.getPlaceOptions(u);p&&p.length>0?(p.forEach(m=>{const f=document.createElement("option");f.value=m.id,f.textContent=m.name,(e?.sublocationId===m.id||e?.sublocation===m.id||e?.sublocationName===m.name)&&(f.selected=!0),s.appendChild(f)}),o.style.display="block"):o.style.display="none"};i&&((async()=>{try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const p=t.getSiteOptions();Utils.safeLog("Incidents: \u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062D\u0645\u0644\u0629:",p.length),p&&p.length>0?p.forEach(m=>{const f=document.createElement("option");f.value=m.id,f.textContent=m.name,(e?.siteId===m.id||e?.location===m.id||e?.siteName===m.name||e?.location===m.name)&&(f.selected=!0,setTimeout(()=>r(m.id),100)),i.appendChild(f)}):Utils.safeWarn("\u26A0\uFE0F Incidents: \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C")}catch(p){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",p)}})().then(()=>{const p=t.getSiteOptions();if(e?.location&&!p.find(m=>m.id===e.location||m.name===e.location)){const m=document.createElement("option");m.value=e.location,m.textContent=e.location+" (\u0645\u062E\u0635\u0635)",m.selected=!0,i.appendChild(m),o.style.display="none"}}).catch(p=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",p)}),i.addEventListener("change",p=>{const m=p.target.value;r(m)}),n&&a&&n.addEventListener("click",()=>{if(a.classList.contains("hidden"))a.classList.remove("hidden"),i.classList.add("hidden"),o.style.display="none",n.innerHTML='<i class="fas fa-list ml-1"></i>\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u0627\u0626\u0645\u0629',i.value&&(a.value=i.options[i.selectedIndex]?.text||i.value);else if(a.classList.add("hidden"),i.classList.remove("hidden"),n.innerHTML='<i class="fas fa-edit ml-1"></i>\u0625\u062F\u062E\u0627\u0644 \u0645\u0648\u0642\u0639 \u0645\u062E\u0635\u0635',a.value){const p=Array.from(i.options).find(m=>m.text===a.value||m.value===a.value);if(p)i.value=p.value,r(p.value);else{const m=document.createElement("option");m.value=a.value,m.textContent=a.value+" (\u0645\u062E\u0635\u0635)",i.appendChild(m),i.value=m.value,o.style.display="none"}}}));const d=document.getElementById("incident-image-input"),l=document.getElementById("incident-image-preview"),c=document.getElementById("incident-image-img");d&&l&&c&&d.addEventListener("change",async u=>{const p=u.target.files[0];if(p){if(p.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB"),d.value="";return}const m=new FileReader;m.onload=f=>{c.src=f.target.result,l.classList.remove("hidden")},m.readAsDataURL(p)}})},100)},generateISOCode(e){const t=new Date().getFullYear(),i=String(new Date().getMonth()+1).padStart(2,"0"),a=(AppState.appData.incidents||[]).length+1;return`${e}-${t}${i}-${String(a).padStart(4,"0")}`},async convertImageToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},async handleSubmit(e){e.preventDefault();const t=e.target?.querySelector('button[type="submit"]')||document.querySelector('#incident-form button[type="submit"]')||e.target?.closest("form")?.querySelector('button[type="submit"]');if(t&&t.disabled)return;let i="";t&&(i=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const a=this.currentEditId?AppState.appData.incidents.find(N=>N.id===this.currentEditId):null,n=document.getElementById("incident-employee-code"),o=document.getElementById("incident-reported-by");if(!n||!o){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&(t.disabled=!1,t.innerHTML=i);return}const s=n.value.trim(),r=o.value.trim();let d=this.currentEditId&&AppState.appData.incidents.find(N=>N.id===this.currentEditId)?.image||"";const l=document.getElementById("incident-image-input");if(l&&l.files.length>0){const N=l.files[0];if(N.size>5242880){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 5MB");return}try{d=await this.convertImageToBase64(N)}catch(H){Notification.error("\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629: "+H.message);return}}const c=document.getElementById("incident-location"),u=document.getElementById("incident-location-custom"),p=document.getElementById("incident-sublocation");let m="",f="",g="",x="",w="",y="";u&&!u.classList.contains("hidden")&&u.value.trim()?(m=u.value.trim(),g=m):c&&c.value&&(f=c.value,g=c.options[c.selectedIndex]?.text||f,m=g,p&&p.value&&(w=p.value,y=p.options[p.selectedIndex]?.text||w,x=y));const A=document.getElementById("incident-affected-type")?.value||"employee",I=document.getElementById("incident-affected-code")?.value.trim()||"",v=document.getElementById("incident-affected-name")?.value.trim()||"",$=document.getElementById("incident-affected-job")?.value.trim()||"",F=document.getElementById("incident-affected-department")?.value.trim()||"",b=document.getElementById("incident-affected-contact")?.value.trim()||"",T=this.collectActionPlanRows();let M=[...this.currentAttachments||[]];const R=document.getElementById("incident-iso-code"),D=document.getElementById("incident-title"),P=document.getElementById("incident-date"),E=document.getElementById("incident-severity"),B=document.getElementById("incident-status"),U=document.getElementById("incident-description");if(!R||!D||!P||!E||!B||!U){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&(t.disabled=!1,t.innerHTML=i);return}const S={id:this.currentEditId||Utils.generateSequentialId("INC",AppState.appData?.incidents||[]),isoCode:R.value.trim(),title:D.value.trim(),location:m,siteId:f,siteName:g,sublocation:x,sublocationId:w,sublocationName:y,date:(()=>{try{if(!P.value)return new Date().toISOString();const N=new Date(P.value);return isNaN(N.getTime())?new Date().toISOString():N.toISOString()}catch{return new Date().toISOString()}})(),severity:E.value,incidentType:document.getElementById("incident-type")?.value||"",reportedBy:r,employeeCode:s,employeeNumber:s,status:B.value,description:U.value.trim(),rootCause:a?.rootCause||"",correctiveAction:a?.correctiveAction||"",preventiveAction:a?.preventiveAction||"",investigation:a?.investigation||null,actionPlan:T,affectedType:A,affectedCode:I,affectedName:v,affectedJobTitle:$,affectedDepartment:F,affectedContact:b,image:d,attachments:M,closureDate:a?.closureDate||null,actionOwner:a?.actionOwner||"",createdAt:this.currentEditId?AppState.appData.incidents.find(N=>N.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null};if(S.reporterCode=s,!S.title||!S.location||!S.severity||!S.status){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),t&&(t.disabled=!1,t.innerHTML=i);return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");const q=this._formReturnTab||"incidents-list",j=!!this.currentEditId;try{if(j){const N=AppState.appData.incidents.findIndex(H=>H.id===this.currentEditId);N!==-1&&(AppState.appData.incidents[N]=S)}else AppState.appData.incidents.push(S);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await this.persistIncidentToServer(S,{syncRegistry:!0,silent:!0}),Notification.success(j?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D"),await this.exitIncidentForm(q),typeof Dashboard<"u"&&Dashboard.refreshIncidents&&Dashboard.refreshIncidents(),this.processIncidentBackgroundTasks(S,{skipServerPersist:!0}).catch(N=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",N)})}catch(N){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B:",N),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+N.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide(),t&&i&&(t.disabled=!1,t.innerHTML=i)}},async processIncidentBackgroundTasks(e,t={}){const{skipServerPersist:i=!1}=t;try{let a=!1;if(e.attachments&&Array.isArray(e.attachments)&&e.attachments.length>0)try{Utils.safeLog("Incidents: \u0642\u0628\u0644 processAttachments - \u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+e.attachments.length);const n=await GoogleIntegration.processAttachments?.(e.attachments,"Incidents")||e.attachments;JSON.stringify(n)!==JSON.stringify(e.attachments)&&(e.attachments=n,a=!0,Utils.safeLog("Incidents: \u062A\u0645 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",n)}if(e.image&&typeof e.image=="string"&&e.image.startsWith("data:"))try{const n=await GoogleIntegration.uploadFileToDrive?.(e.image,`incident_${e.id}_${Date.now()}.jpg`,"image/jpeg","Incidents");n&&n.success&&(e.image=n.directLink||n.shareableLink||e.image,a=!0,Utils.safeLog("Incidents: \u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",n)}if(a){const n=AppState.appData.incidents.findIndex(o=>o.id===e.id);n!==-1&&(AppState.appData.incidents[n]=e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}if(!i||a){const n=AppState.appData.incidents.find(o=>o.id===e.id)||e;await this.persistIncidentToServer(n,{syncRegistry:!1,silent:!0})}if(e.actionPlan&&Array.isArray(e.actionPlan)&&e.actionPlan.length>0){for(const n of e.actionPlan)if(n.description&&n.owner)try{await GoogleIntegration.sendToAppsScript?.("createActionFromModule",{sourceModule:"Incidents",sourceId:e.id,sourceData:{date:e.date,description:n.description,correctiveAction:n.description,department:e.affectedDepartment||"",location:e.location||"",siteId:e.siteId||"",siteName:e.siteName||"",sublocation:e.sublocation||"",sublocationId:e.sublocationId||"",sublocationName:e.sublocationName||"",severity:e.severity||"Medium",reportedBy:e.reportedBy||"",owner:n.owner,dueDate:n.dueDate,actionType:n.actionType==="preventive"?"Preventive":"Corrective",createdBy:e.createdBy?.name||"System",...e}})}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0625\u062C\u0631\u0627\u0621 \u062A\u0644\u0642\u0627\u0626\u064A:",o)}}Utils.safeLog("Incidents: \u062A\u0645 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",a)}},async showList(e="incidents-list"){await this.exitIncidentForm(e)},isNotificationNonInjuryType(e){const t=String(e||"").trim();return t==="\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A"||t==="\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A"||t==="\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A"},getNotificationDepartmentOptions(){try{if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartmentOptions=="function"){const t=DailyObservations.getDepartmentOptions();if(Array.isArray(t)&&t.length)return t}}catch{}const e=new Set;return(AppState?.appData?.employees||[]).forEach(t=>{const i=String(t?.department||"").trim();i&&e.add(i)}),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar"))},buildNotificationDepartmentSelectOptions(e=""){const t=s=>Utils.escapeHTML(String(s??"")),i=String(e||"").trim(),a=this.getNotificationDepartmentOptions();let n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>',o=!1;return a.forEach(s=>{const r=s===i;r&&(o=!0),n+=`<option value="${t(s)}"${r?" selected":""}>${t(s)}</option>`}),i&&!o&&(n+=`<option value="${t(i)}" selected>${t(i)} (\u0645\u062D\u0641\u0648\u0638)</option>`),n},buildNotificationContractorSelectOptions(e=""){return this.buildInvestigationAffectedContractorSelectOptions(e)},getNotificationDepartmentValue(){const e=document.getElementById("notification-employee-department-select"),t=document.getElementById("notification-employee-department"),i=document.getElementById("notification-incident-type"),a=document.getElementById("notification-affiliation"),n=this.isNotificationNonInjuryType(i?.value||""),o=(a?.value||"")==="contractor";return n&&e?(e.value||"").trim():o?this.getNotificationContractorValue():(t?.value||"").trim()},getNotificationContractorValue(){return(document.getElementById("notification-contractor-select")?.value||"").trim()},mapIncidentAffiliationToNotification(e){const t=String(e?.affiliation||"").trim();if(t)return t==="company"?"employee":t;const i=String(e?.affectedType||"").trim();return{employee:"employee",contractor:"contractor",visitor:"visitor",other:"none"}[i]||""},buildNotificationDraftFromIncident(e){if(!e)return null;const t=this.mapIncidentAffiliationToNotification(e),i=this.isNotificationNonInjuryType(e.incidentType||"");let a=String(e.contractorName||"").trim();!a&&t==="contractor"&&(a=String(e.affectedDepartment||e.department||"").trim());let n=String(e.affectedCode||e.employeeAffectedCode||"").trim();const o=String(e.reporterCode||"").trim();if(!n&&t==="employee"){const c=String(e.employeeCode||e.employeeNumber||"").trim();c&&c!==o&&(n=c)}const s=String(e.affectedName||e.employeeName||"").trim(),r=String(e.affectedJobTitle||e.employeeJob||"").trim();let d=String(e.affectedDepartment||e.employeeDepartment||e.department||"").trim();i&&(d=String(e.department||e.affectedDepartment||d).trim());let l=String(e.notificationNumber||"").trim();if(!l&&e.notificationId&&Array.isArray(AppState.appData?.incidentNotifications)){const c=AppState.appData.incidentNotifications.find(u=>u.id===e.notificationId);l=String(c?.notificationNumber||"").trim()}return l||(l=e.isoCode?`REF-${e.isoCode}`:`INC-${e.id}`),{incidentId:e.id,notificationId:e.notificationId||"",notificationNumber:l,date:this.safeDateToISOString(e.date),siteId:e.siteId||"",siteName:e.siteName||"",location:e.location||"",sublocationId:e.sublocationId||"",sublocationName:e.sublocationName||e.sublocation||"",incidentType:e.incidentType||"",affiliation:t,contractorName:a,employeeCode:n,employeeName:s,employeeJob:r,employeeDepartment:d,injuryDescription:e.injuryDescription||"",losses:e.losses||"",description:e.description||"",actions:e.actionsTaken||e.actions||"",reporterName:e.reportedBy||e.reporterName||"",reporterCode:e.reporterCode||o||"",preserve:{isoCode:e.isoCode,title:e.title,status:e.status,severity:e.severity,investigation:e.investigation,actionPlan:e.actionPlan,attachments:e.attachments,image:e.image,createdAt:e.createdAt,createdBy:e.createdBy,affectedType:e.affectedType,affectedContact:e.affectedContact}}},buildIncidentFieldsFromNotification(e,t,i={}){const a=e.affiliation||"";return{...i,notificationId:i.notificationId||e.id,notificationNumber:t,title:i.title||`\u062D\u0627\u062F\u062B - ${e.incidentType}`,location:e.location,siteId:e.siteId,siteName:e.siteName,sublocation:e.sublocation,sublocationId:e.sublocationId,sublocationName:e.sublocationName,date:e.date,department:e.department,incidentType:e.incidentType,affiliation:a,contractorName:e.contractorName,affectedType:a==="employee"||a==="company"?"employee":a||i.affectedType||"other",affectedCode:e.employeeCode||"",affectedName:e.employeeName||"",affectedJobTitle:e.employeeJob||"",affectedDepartment:e.employeeDepartment||e.department||"",employeeName:e.employeeName,employeeJob:e.employeeJob,employeeDepartment:e.employeeDepartment,employeeAffectedCode:e.employeeCode||"",description:e.description,injuryDescription:e.injuryDescription,losses:e.losses,actionsTaken:e.actions,actions:e.actions,reportedBy:e.reporterName,reporterName:e.reporterName,reporterCode:e.reporterCode||"",employeeCode:e.reporterCode||i.employeeCode||"",employeeNumber:e.reporterCode||i.employeeNumber||"",updatedAt:new Date().toISOString()}},getIncidentMutationUserData(){const e=AppState.currentUser||{};let t=e.permissions||{};if(typeof t=="string")try{t=JSON.parse(t)}catch{t={}}return{id:e.id||"",name:e.name||e.displayName||"",email:e.email||"",role:e.role||"",permissions:t}},buildIncidentServerUpdatePayload(e,t={}){if(!e)return{...t};const i=(this.getIncidentDateValue(e)||new Date).toISOString();let a=e.investigation;if(a&&typeof a=="string")try{a=JSON.parse(a)}catch{}return{id:e.id,title:e.title||`\u062D\u0627\u062F\u062B - ${e.incidentType||""}`.trim(),description:e.description||"",date:i,status:e.status,severity:e.severity||"\u0645\u062A\u0648\u0633\u0637\u0629",location:e.location||"",siteId:e.siteId||"",siteName:e.siteName||"",sublocation:e.sublocation||"",sublocationId:e.sublocationId||"",sublocationName:e.sublocationName||"",incidentType:e.incidentType||"",affiliation:e.affiliation||"",contractorName:e.contractorName||"",department:e.department||"",affectedName:e.affectedName||"",affectedCode:e.affectedCode||"",affectedJobTitle:e.affectedJobTitle||"",affectedDepartment:e.affectedDepartment||"",affectedType:e.affectedType||"",affectedContact:e.affectedContact||"",employeeName:e.employeeName||"",employeeJob:e.employeeJob||"",employeeDepartment:e.employeeDepartment||"",employeeCode:e.reporterCode||e.employeeCode||"",employeeNumber:e.reporterCode||e.employeeNumber||"",employeeAffectedCode:e.affectedCode||e.employeeAffectedCode||"",reportedBy:e.reportedBy||e.reporterName||"",reporterName:e.reporterName||e.reportedBy||"",reporterCode:e.reporterCode||"",injuryDescription:e.injuryDescription||"",losses:e.losses||"",actionsTaken:e.actionsTaken||e.actions||"",actions:e.actions||e.actionsTaken||"",injuredPart:e.injuredPart||"",equipmentCause:e.equipmentCause||"",notificationId:e.notificationId||"",notificationNumber:e.notificationNumber||"",isoCode:e.isoCode||"",image:e.image||"",attachments:e.attachments||[],actionPlan:e.actionPlan||[],investigation:a??e.investigation,rootCause:e.rootCause||"",correctiveAction:e.correctiveAction||"",preventiveAction:e.preventiveAction||"",requiresApproval:!!e.requiresApproval,approvedBy:e.approvedBy||null,approvedAt:e.approvedAt||null,rejectedBy:e.rejectedBy||null,rejectionReason:e.rejectionReason||"",rejectedAt:e.rejectedAt||null,updatedAt:e.updatedAt||new Date().toISOString(),createdAt:e.createdAt||new Date().toISOString(),createdBy:e.createdBy||null,userData:this.getIncidentMutationUserData(),...t}},async persistIncidentToServer(e,t={}){const{syncRegistry:i=!0,silent:a=!1}=t;if(!e?.id)throw new Error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)throw new Error("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");const n=this.buildIncidentServerUpdatePayload(e),o=await GoogleIntegration.sendRequest({action:"updateIncident",data:{incidentId:e.id,updateData:n}});if(!o?.success)throw new Error(o?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645");if(typeof GoogleIntegration.clearCache=="function"&&GoogleIntegration.clearCache("Incidents"),i)try{await this.updateRegistryEntry(e,{persist:!0})}catch(s){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",s)}return a||Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B ${e.id} \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645`),o},applyNotificationDraftToForm(e,t={}){if(!e)return;const{locationSelect:i,sublocationSelect:a,updateSublocationOptions:n,notificationIncidentTypeSelect:o,notificationAffiliationSelect:s,updateNotificationFormUI:r,employeeCodeInput:d,employeeNameInput:l,employeeJobInput:c,employeeDepartmentInput:u,employeeDepartmentSelect:p,contractorSelect:m,injuryDescriptionEl:f,descriptionEl:g,lossesEl:x,actionsEl:w,reporterNameEl:y,reporterCodeEl:A,dateEl:I}=t;if((()=>{if(!i)return!1;if(e.siteId)return i.value=e.siteId,typeof n=="function"&&n(e.siteId),!0;const F=(this.getSiteOptions?this.getSiteOptions():[]).find(b=>b.name===e.location||b.id===e.location);if(F)return i.value=F.id,typeof n=="function"&&n(F.id),!0;if(e.location){const b=document.createElement("option");return b.value=e.location,b.textContent=e.location,b.selected=!0,i.appendChild(b),!0}return!1})(),a&&e.sublocationId&&(a.value=e.sublocationId),o&&e.incidentType&&(o.value=e.incidentType),s&&e.affiliation&&(s.value=e.affiliation),typeof r=="function"&&r(),d&&(d.value=e.employeeCode||""),l&&(l.value=e.employeeName||""),c&&(c.value=e.employeeJob||""),u&&(u.value=e.employeeDepartment||""),p&&e.employeeDepartment){const $=e.employeeDepartment;if(!Array.from(p.options).some(b=>b.value===$)){const b=document.createElement("option");b.value=$,b.textContent=$,p.appendChild(b)}p.value=$}if(m&&e.contractorName){const $=e.contractorName;if(!Array.from(m.options).some(b=>b.value===$)){const b=document.createElement("option");b.value=$,b.textContent=$,m.appendChild(b)}m.value=$}f&&(f.value=e.injuryDescription||""),g&&(g.value=e.description||""),x&&(x.value=e.losses||""),w&&(w.value=e.actions||""),y&&(y.value=e.reporterName||""),A&&(A.value=e.reporterCode||""),I&&e.date&&(I.value=e.date)},async showNotificationForm(e=null){const t=e?this.buildNotificationDraftFromIncident(e):null,i=!!t,a=t||{};this._notificationEditContext=i?{incidentId:t.incidentId,notificationId:t.notificationId,preserve:t.preserve}:null;const n=document.createElement("div");n.className="modal-overlay";const o=f=>Utils.escapeHTML(String(f??"")),s=i?a.notificationNumber:`NOT-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,"0")}-${String((AppState.appData.incidentNotifications||[]).length+1).padStart(4,"0")}`,r=this.buildNotificationDepartmentSelectOptions(a.employeeDepartment||""),d=this.buildNotificationContractorSelectOptions(a.contractorName||""),l=i?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062E\u0637\u0627\u0631 / \u062D\u0627\u062F\u062B":"\u0625\u062E\u0637\u0627\u0631 \u0639\u0646 \u062D\u0627\u062F\u062B - Incident Notification",c=i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062E\u0637\u0627\u0631",u=i?"fa-save":"fa-paper-plane",p=i?a.date:new Date().toISOString().slice(0,16);n.innerHTML=`
            <style>
                .notification-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .notification-field:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .notification-field label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 10px;
                }
                .notification-field label i {
                    font-size: 1.2rem;
                }
                .notification-section-title {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px 12px 0 0;
                    margin: 0 -24px 24px -24px;
                    font-size: 1.3rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
            </style>
            <div class="modal-content" style="max-width: 1200px; width: 95%; background: linear-gradient(to bottom, #f8f9fa, #ffffff);">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-${i?"edit":"bell"} ml-2"></i>
                        ${l}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; background: #f8f9fa;">
                    <form id="incident-notification-form">
                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-info-circle"></i>
                                <span>\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-hashtag" style="color: #667eea;"></i>
                                        \u0631\u0642\u0645 \u0627\u0644\u0625\u062E\u0637\u0627\u0631 *
                                    </label>
                                    <input type="text" id="notification-number" class="form-input" value="${o(s)}" readonly style="background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%); font-weight: 700; border: 2px solid #667eea; color: #5145cd;">
                                </div>
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-calendar-alt" style="color: #667eea;"></i>
                                        \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B *
                                    </label>
                                    <input type="datetime-local" id="notification-date" class="form-input" required value="${o(p)}" style="border: 2px solid #667eea; font-weight: 500;">
                                </div>
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
                                        \u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B *
                                    </label>
                                    <select id="notification-location" class="form-input" required style="border: 2px solid #667eea;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                    </select>
                                </div>
                                <div id="notification-sublocation-wrapper" style="display: none;">
                                    <div class="notification-field" style="border-color: #667eea;">
                                        <label>
                                            <i class="fas fa-map-pin" style="color: #667eea;"></i>
                                            \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A
                                        </label>
                                        <select id="notification-sublocation" class="form-input" style="border: 2px solid #667eea;">
                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-clipboard-list"></i>
                                <span>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-tag" style="color: #f59e0b;"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B *
                                    </label>
                                    <select id="notification-incident-type" class="form-input" required style="border: 2px solid #f59e0b;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</option>
                                        <option value="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644" ${a.incidentType==="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644"?"selected":""}>\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644</option>
                                        <option value="\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A" ${a.incidentType==="\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A"?"selected":""}>\u062D\u0627\u062F\u062B \u0645\u0639\u062F\u0627\u062A</option>
                                        <option value="\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A" ${a.incidentType==="\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A"?"selected":""}>\u0623\u0636\u0631\u0627\u0631 \u0645\u0645\u062A\u0644\u0643\u0627\u062A</option>
                                        <option value="\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A" ${a.incidentType==="\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A"?"selected":""}>\u062D\u0627\u062F\u062B \u0628\u064A\u0626\u064A</option>
                                        <option value="\u0622\u062E\u0631" ${a.incidentType==="\u0622\u062E\u0631"?"selected":""}>\u0622\u062E\u0631</option>
                                    </select>
                                </div>
                                <div class="notification-field" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-users" style="color: #f59e0b;"></i>
                                        \u0627\u0644\u062A\u0628\u0639\u064A\u0629
                                    </label>
                                    <select id="notification-affiliation" class="form-input" style="border: 2px solid #f59e0b;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0628\u0639\u064A\u0629</option>
                                        <option value="employee" ${a.affiliation==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                        <option value="daily-labor" ${a.affiliation==="daily-labor"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629</option>
                                        <option value="contractor" ${a.affiliation==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                        <option value="visitor" ${a.affiliation==="visitor"?"selected":""}>\u0632\u0627\u0626\u0631</option>
                                        <option value="none" ${a.affiliation==="none"?"selected":""}>\u0644\u0627 \u064A\u0648\u062C\u062F</option>
                                    </select>
                                </div>

                                <div id="notification-employee-code-wrapper" class="notification-field" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-id-badge" style="color: #f59e0b;"></i>
                                        \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 *
                                    </label>
                                    <input type="text" id="notification-employee-code" class="form-input" value="${o(a.employeeCode)}" placeholder="\u0627\u0643\u062A\u0628/\u0627\u0628\u062D\u062B \u0628\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>

                                <div id="notification-employee-name-wrapper" class="notification-field" style="border-color: #f59e0b;">
                                    <label id="notification-employee-name-label">
                                        <i class="fas fa-user" style="color: #f59e0b;"></i>
                                        <span id="notification-employee-name-label-text">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</span>
                                    </label>
                                    <input type="text" id="notification-employee-name" class="form-input" required value="${o(a.employeeName)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>
                                <div id="notification-employee-job-wrapper" class="notification-field" style="border-color: #f59e0b;">
                                    <label id="notification-employee-job-label">
                                        <i class="fas fa-briefcase" style="color: #f59e0b;"></i>
                                        <span id="notification-employee-job-label-text">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</span>
                                    </label>
                                    <input type="text" id="notification-employee-job" class="form-input" required value="${o(a.employeeJob)}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>
                                <div id="notification-employee-department-text-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-building" style="color: #f59e0b;"></i>
                                        \u0627\u0644\u0625\u062F\u0627\u0631\u0629 *
                                    </label>
                                    <input type="text" id="notification-employee-department" class="form-input" required value="${o(a.employeeDepartment)}" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629" style="border: 2px solid #f59e0b;">
                                </div>
                                <div id="notification-employee-department-select-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-building" style="color: #f59e0b;"></i>
                                        \u0627\u0644\u0625\u062F\u0627\u0631\u0629 *
                                    </label>
                                    <select id="notification-employee-department-select" class="form-input" style="border: 2px solid #f59e0b;">
                                        ${r}
                                    </select>
                                </div>

                                <div id="notification-contractor-name-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-handshake" style="color: #f59e0b;"></i>
                                        \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *
                                    </label>
                                    <select id="notification-contractor-select" class="form-input" style="border: 2px solid #f59e0b;">
                                        ${d}
                                    </select>
                                </div>
                            </div>
                            
                            <div id="notification-injury-description-wrapper" class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-heartbeat" style="color: #f59e0b;"></i>
                                    \u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629
                                </label>
                                <textarea id="notification-injury-description" class="form-input" rows="4" placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0625\u0635\u0627\u0628\u0629..." style="border: 2px solid #f59e0b;">${o(a.injuryDescription)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-coins" style="color: #f59e0b;"></i>
                                    \u0627\u0644\u062E\u0633\u0627\u0626\u0631
                                </label>
                                <textarea id="notification-losses" class="form-input" rows="4" placeholder="\u0648\u0635\u0641 \u0627\u0644\u062E\u0633\u0627\u0626\u0631 \u0627\u0644\u0645\u0627\u062F\u064A\u0629 \u0623\u0648 \u0627\u0644\u0628\u0634\u0631\u064A\u0629..." style="border: 2px solid #f59e0b;">${o(a.losses)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-file-alt" style="color: #f59e0b;"></i>
                                    \u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062D\u0627\u062F\u062B *
                                </label>
                                <textarea id="notification-description" class="form-input" rows="5" required placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u0627\u062F\u062B..." style="border: 2px solid #f59e0b; font-size: 1rem;">${o(a.description)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-tasks" style="color: #f59e0b;"></i>
                                    \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629
                                </label>
                                <textarea id="notification-actions" class="form-input" rows="4" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629..." style="border: 2px solid #f59e0b;">${o(a.actions)}</textarea>
                            </div>
                        </div>

                        <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631 -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-user-edit"></i>
                                <span>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #10b981;">
                                    <label>
                                        <i class="fas fa-user" style="color: #10b981;"></i>
                                        \u0627\u0633\u0645 \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631 *
                                    </label>
                                    <input type="text" id="notification-reporter-name" class="form-input" required value="${o(a.reporterName)}" placeholder="\u0627\u0633\u0645 \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631" style="border: 2px solid #10b981;">
                                </div>
                                <div class="notification-field" style="border-color: #10b981;">
                                    <label>
                                        <i class="fas fa-id-card" style="color: #10b981;"></i>
                                        \u0643\u0648\u062F \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631
                                    </label>
                                    <input type="text" id="notification-reporter-code" class="form-input" value="${o(a.reporterCode)}" placeholder="\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A" style="border: 2px solid #10b981;">
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 bg-white p-5 rounded-lg shadow-lg form-actions-centered" style="border-top: 3px solid #667eea;">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-times ml-2"></i>
                                \u0625\u0644\u063A\u0627\u0621
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printNotification()" title="\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062E\u0637\u0627\u0631" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-print ml-2"></i>
                                \u0637\u0628\u0627\u0639\u0629
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportNotificationPDF()" title="\u062A\u0635\u062F\u064A\u0631 PDF" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button type="submit" class="btn-primary" style="padding: 12px 30px; font-size: 1.1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                <i class="fas ${u} ml-2"></i>
                                ${c}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(n),setTimeout(()=>{const f=document.getElementById("notification-location"),g=document.getElementById("notification-sublocation-wrapper"),x=document.getElementById("notification-sublocation"),w=h=>{if(!x||!g)return;if(x.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',!h){g.style.display="none";return}const L=this.getPlaceOptions(h);L&&L.length>0?(L.forEach(C=>{const W=document.createElement("option");W.value=C.id,W.textContent=C.name,x.appendChild(W)}),g.style.display="block"):g.style.display="none"};f&&f.addEventListener("change",h=>{w(h.target.value)}),typeof EmployeeHelper<"u"&&EmployeeHelper.setupEmployeeCodeSearch("notification-reporter-code","notification-reporter-name",h=>{if(h){const L=document.getElementById("notification-reporter-code"),C=document.getElementById("notification-reporter-name");L&&(L.value=h.code||h.employeeNumber||h.sapId||""),C&&(C.value=h.name||h.fullName||"")}});const y=document.getElementById("notification-incident-type"),A=document.getElementById("notification-affiliation"),I=document.getElementById("notification-employee-code-wrapper"),v=document.getElementById("notification-employee-code"),$=document.getElementById("notification-employee-name-wrapper"),F=document.getElementById("notification-employee-job-wrapper"),b=document.getElementById("notification-employee-name"),T=document.getElementById("notification-employee-job"),M=document.getElementById("notification-employee-department-text-wrapper"),R=document.getElementById("notification-employee-department-select-wrapper"),D=document.getElementById("notification-employee-department"),P=document.getElementById("notification-employee-department-select"),E=document.getElementById("notification-injury-description-wrapper"),B=document.getElementById("notification-contractor-name-wrapper"),U=document.getElementById("notification-contractor-select"),S=document.getElementById("notification-employee-name-label-text"),q=document.getElementById("notification-employee-job-label-text"),j=()=>{const h=(A?.value||"").toString().trim();return h==="employee"||h==="company"},N=()=>(A?.value||"")==="contractor",H=h=>{if(!b)return;const L=`${b.id}-employee-helper-list`;h?(b.setAttribute("list",L),b.setAttribute("autocomplete","off")):(b.removeAttribute("list"),b.setAttribute("autocomplete","off"))},V=h=>{[b,T,D].forEach(C=>{C&&(C.readOnly=!h,C.style.background=h?"":"#fff7ed",C.style.fontWeight=h?"":"600")})},O=()=>{if(!P||!D)return;const h=(D.value||"").trim();if(!h)return;if(!Array.from(P.options).some(C=>C.value===h)){const C=document.createElement("option");C.value=h,C.textContent=h,P.appendChild(C)}P.value=h},Y=h=>{if(!h)return;const L=h.department||h.dept||h.departmentName||"",C=y?.value||"";if(this.isNotificationNonInjuryType(C)){if(P&&L){if(!Array.from(P.options).some(J=>J.value===L)){const J=document.createElement("option");J.value=L,J.textContent=L,P.appendChild(J)}P.value=L}}else D&&(D.value=L)},G=()=>{const h=y?.value||"",L=this.isNotificationNonInjuryType(h),C=h==="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644",W=j(),z=N(),J=C&&z;$&&($.style.display=L?"none":"block"),F&&(F.style.display=L?"none":"block"),M&&(M.style.display=L||z?"none":"block"),R&&(R.style.display=L?"block":"none"),E&&(E.style.display=C?"block":"none"),S&&(S.textContent=J?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 (\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644) *":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *"),q&&(q.textContent=J?"\u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0639\u0627\u0645\u0644 *":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *"),b&&(b.required=!L,b.placeholder=J?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",L&&(b.value="")),T&&(T.required=!L,T.placeholder=J?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629",L&&(T.value="")),D&&(D.required=!L&&!z),P&&(P.required=L),!L&&!z&&O(),I&&(I.style.display=W?"block":"none"),v&&(v.required=W,W||(v.value="")),H(W&&C),V(z||!W&&C),z&&C&&D&&(D.value=""),B&&(B.style.display=z?"block":"none"),U&&(U.required=z,z||(U.value=""))};y&&y.addEventListener("change",G),A&&A.addEventListener("change",G);const k=()=>{t?this.applyNotificationDraftToForm(t,{locationSelect:f,sublocationSelect:x,updateSublocationOptions:w,notificationIncidentTypeSelect:y,notificationAffiliationSelect:A,updateNotificationFormUI:G,employeeCodeInput:v,employeeNameInput:b,employeeJobInput:T,employeeDepartmentInput:D,employeeDepartmentSelect:P,contractorSelect:U,injuryDescriptionEl:document.getElementById("notification-injury-description"),descriptionEl:document.getElementById("notification-description"),lossesEl:document.getElementById("notification-losses"),actionsEl:document.getElementById("notification-actions"),reporterNameEl:document.getElementById("notification-reporter-name"),reporterCodeEl:document.getElementById("notification-reporter-code"),dateEl:document.getElementById("notification-date")}):G()};if((async()=>{if(!f||f.options.length>1)return;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch{}this.getSiteOptions().forEach(L=>{const C=document.createElement("option");C.value=L.id,C.textContent=L.name,f.appendChild(C)})})().finally(()=>k()),typeof EmployeeHelper<"u")EmployeeHelper.setupEmployeeCodeSearch("notification-employee-code","notification-employee-name",h=>{!h||!j()||(y?.value||"")!=="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644"||(v&&(v.value=h.code||h.employeeNumber||h.sapId||h.id||""),b&&(b.value=h.name||h.fullName||""),T&&(T.value=h.job||h.jobTitle||h.position||""),Y.call(this,h))}),EmployeeHelper.setupAutocomplete("notification-employee-name",h=>{!h||!j()||(y?.value||"")!=="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644"||(v&&(v.value=h.code||h.employeeNumber||h.sapId||h.id||""),T&&(T.value=h.job||h.jobTitle||h.position||""),Y.call(this,h))});else if(v){const h=()=>{if(!j())return;const L=(v.value||"").toString().trim();if(!L)return;const C=this.getEmployeeByCode(L);C&&(b&&(b.value=C.name||C.fullName||""),T&&(T.value=C.job||C.jobTitle||C.position||""),Y.call(this,C))};v.addEventListener("blur",h),v.addEventListener("change",h)}},100),n.querySelector("#incident-notification-form")?.addEventListener("submit",async f=>{f.preventDefault(),await this.handleNotificationSubmit(n,s,{isEdit:i})}),n.addEventListener("click",f=>{f.target===n&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&(this._notificationEditContext=null,n.remove())});const m=n.querySelector(".modal-close");m&&m.addEventListener("click",()=>{this._notificationEditContext=null})},async handleNotificationSubmit(e,t,i={}){const a=!!i.isEdit||!!this._notificationEditContext?.incidentId;try{Loading.show(a?"\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A...":"\u062C\u0627\u0631\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062E\u0637\u0627\u0631...");const n=document.getElementById("notification-location"),o=document.getElementById("notification-sublocation"),s=n?.value||"",r=n?.options[n?.selectedIndex]?.text||s,d=o?.value||"",l=o?.options[o?.selectedIndex]?.text||d,c=document.getElementById("notification-date"),u=document.getElementById("notification-incident-type"),p=document.getElementById("notification-affiliation"),m=document.getElementById("notification-contractor-select"),f=document.getElementById("notification-employee-code"),g=document.getElementById("notification-employee-name"),x=document.getElementById("notification-employee-job"),w=document.getElementById("notification-employee-department"),y=document.getElementById("notification-employee-department-select"),A=document.getElementById("notification-injury-description"),I=document.getElementById("notification-description"),v=document.getElementById("notification-losses"),$=document.getElementById("notification-actions"),F=document.getElementById("notification-reporter-name"),b=document.getElementById("notification-reporter-code"),T=(p?.value||"").toString().trim(),M=T==="employee"||T==="company",R=T==="contractor",D=this.isNotificationNonInjuryType(u?.value||""),P=(u?.value||"")==="\u0625\u0635\u0627\u0628\u0629 \u0639\u0645\u0644",E=(m?.value||"").trim();let B=D?(y?.value||"").trim():R?E:(w?.value||"").trim();if(p&&R&&!E){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}if(!D){if(!g||!g.value.trim()){Loading.hide(),Notification.error(R?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0637\u0644\u0648\u0628");return}if(!x||!x.value.trim()){Loading.hide(),Notification.error(R?"\u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0639\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628\u0629":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0645\u0637\u0644\u0648\u0628\u0629");return}}if(!B){Loading.hide(),Notification.error(R&&P?"\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0645\u0637\u0644\u0648\u0628\u0629");return}if(M&&(!f||!f.value.trim())){Loading.hide(),Notification.error("\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0637\u0644\u0648\u0628 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0648\u0638\u0641");return}if(!c||!u||!I||!F){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const U=this._notificationEditContext,S={id:a&&U?.notificationId?U.notificationId:Utils.generateId("NOTIF"),notificationNumber:t,date:(()=>{try{if(!c.value)return new Date().toISOString();const j=new Date(c.value);return isNaN(j.getTime())?new Date().toISOString():j.toISOString()}catch{return new Date().toISOString()}})(),location:r||s,siteId:s,siteName:r,sublocation:l||d,sublocationId:d,sublocationName:l,department:B,incidentType:u.value,affiliation:T,contractorName:E,employeeName:g?.value||"",employeeJob:x?.value||"",employeeDepartment:B,employeeCode:f?.value||"",description:I.value,injuryDescription:A?.value||"",losses:v?.value||"",actions:$?.value||"",reporterName:F.value,reporterCode:b?.value||"",updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null};if(a&&U?.incidentId){AppState.appData.incidents||(AppState.appData.incidents=[]);const j=AppState.appData.incidents.findIndex(O=>O.id===U.incidentId);if(j===-1){Loading.hide(),Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u062F\u062B \u0644\u0644\u062A\u0639\u062F\u064A\u0644");return}const N=AppState.appData.incidents[j],H=U.preserve||{};if(AppState.appData.incidentNotifications||(AppState.appData.incidentNotifications=[]),U.notificationId){const O=AppState.appData.incidentNotifications.findIndex(k=>k.id===U.notificationId),Y=O!==-1?AppState.appData.incidentNotifications[O]:{},G={...Y,...S,id:U.notificationId,createdAt:Y.createdAt||N.createdAt||new Date().toISOString()};O!==-1?AppState.appData.incidentNotifications[O]=G:AppState.appData.incidentNotifications.push(G)}const V=this.buildIncidentFieldsFromNotification(S,t,{...N,id:N.id,notificationId:N.notificationId||U.notificationId||"",isoCode:H.isoCode||N.isoCode,title:H.title||N.title,status:H.status||N.status,severity:H.severity||N.severity,investigation:H.investigation!==void 0?H.investigation:N.investigation,actionPlan:H.actionPlan||N.actionPlan,attachments:H.attachments||N.attachments,image:H.image||N.image,createdAt:N.createdAt,createdBy:N.createdBy||S.createdBy,affectedContact:H.affectedContact||N.affectedContact,rootCause:N.rootCause||"",correctiveAction:N.correctiveAction||"",preventiveAction:N.preventiveAction||""});AppState.appData.incidents[j]=V;try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.persistIncidentToServer(V,{syncRegistry:!0,silent:!0}),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D"),e.remove(),this._notificationEditContext=null,await this._refreshIncidentsViewsAfterUpdate(V.id),this.processIncidentBackgroundTasks(V,{skipServerPersist:!0}).catch(O=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",O)})}catch(O){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062D\u0627\u062F\u062B \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",O),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644: "+(O.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}return}S.createdAt=new Date().toISOString(),AppState.appData.incidentNotifications||(AppState.appData.incidentNotifications=[]),AppState.appData.incidentNotifications.push(S);const q=this.buildIncidentFieldsFromNotification(S,t,{id:Utils.generateId("INCIDENT"),notificationId:S.id,status:"\u0645\u0641\u062A\u0648\u062D",severity:"\u0645\u062A\u0648\u0633\u0637\u0629",rootCause:"",correctiveAction:"",preventiveAction:"",investigation:null,createdAt:new Date().toISOString(),createdBy:S.createdBy});AppState.appData.incidents||(AppState.appData.incidents=[]),AppState.appData.incidents.push(q),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof Dashboard<"u"&&Dashboard.refreshIncidents&&Dashboard.refreshIncidents(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062E\u0637\u0627\u0631 \u0648\u0625\u0646\u0634\u0627\u0621 \u062A\u062D\u0642\u064A\u0642 \u062A\u0644\u0642\u0627\u0626\u064A \u0628\u0646\u062C\u0627\u062D"),e.remove();try{await this.processNotificationBackgroundTasks(S,q)}catch(j){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",j)}setTimeout(()=>{typeof this.showInvestigationForm=="function"?this.showInvestigationForm(q.id):Notification.warning("\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B")},500)}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u062E\u0637\u0627\u0631:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+n.message)}},getNotificationFormData(){if(!document.querySelector(".modal-overlay"))return null;const t=document.getElementById("notification-location"),i=document.getElementById("notification-sublocation"),a=document.getElementById("notification-number"),n=document.getElementById("notification-date"),o=document.getElementById("notification-incident-type"),s=document.getElementById("notification-affiliation"),r=document.getElementById("notification-contractor-select"),d=document.getElementById("notification-employee-code"),l=document.getElementById("notification-employee-name"),c=document.getElementById("notification-employee-job"),u=document.getElementById("notification-employee-department"),p=document.getElementById("notification-employee-department-select"),m=document.getElementById("notification-injury-description"),f=document.getElementById("notification-description"),g=document.getElementById("notification-losses"),x=document.getElementById("notification-actions"),w=document.getElementById("notification-reporter-name"),y=document.getElementById("notification-reporter-code");if(!a||!n||!o||!f||!w)return null;const A=t?.value||"",I=t?.options[t?.selectedIndex]?.text||A,v=i?.value||"",$=i?.options[i?.selectedIndex]?.text||v,F=this.getNotificationDepartmentValue(),b=this.getNotificationContractorValue();return{notificationNumber:a.value,date:n.value,location:I||A,siteId:A,siteName:I,sublocation:$||v,sublocationId:v,sublocationName:$,incidentType:o.value,affiliation:s?.value||"",contractorName:b,employeeCode:d?.value||"",employeeName:l?.value||"",employeeJob:c?.value||"",employeeDepartment:F,department:F,description:f.value,injuryDescription:m?.value||"",losses:g?.value||"",actions:x?.value||"",reporterName:w.value,reporterCode:y?.value||""}},printNotification(){try{const e=this.getNotificationFormData();if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629. \u064A\u0631\u062C\u0649 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u0627\u064B.");return}if(!e.notificationNumber&&!e.description){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const t=this._buildNotificationReportHtml(e);this._openIncidentPrintableHtml(t,"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0625\u062E\u0637\u0627\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062E\u0637\u0627\u0631:",e),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+e.message)}},buildNotificationPrintContent(e){const t=AppState?.companySettings?.name||AppState?.companyName||"",i=AppState?.companySettings?.secondaryName||"",a=AppState?.companyLogo||"",n=s=>{if(!s)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{return new Date(s).toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return s}},o={company:"\u0634\u0631\u0643\u0629",employee:"\u0645\u0648\u0638\u0641","daily-labor":"\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629",contractor:"\u0645\u0642\u0627\u0648\u0644",visitor:"\u0632\u0627\u0626\u0631",none:"\u0644\u0627 \u064A\u0648\u062C\u062F"};return`
            <div style="direction: rtl; text-align: right; font-family: 'Tahoma', Arial, sans-serif;">
                <!-- Header -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #667eea;">
                    <div style="flex: 0 0 auto; text-align: right; padding-left: 20px;">
                        ${a?`<img src="${a}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" style="max-height: 60px; max-width: 150px; object-fit: contain;">`:""}
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #667eea; margin-bottom: 5px;">\u0625\u062E\u0637\u0627\u0631 \u0639\u0646 \u062D\u0627\u062F\u062B</div>
                        <div style="font-size: 1.2rem; font-weight: 600; color: #764ba2;">Incident Notification</div>
                    </div>
                    <div style="flex: 0 0 auto; text-align: left; padding-right: 20px;">
                        <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                            <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(t||"")}</div>
                            ${i?`<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(i)}</div>`:""}
                        </div>
                    </div>
                </div>

                <!-- \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-info-circle"></i> \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #667eea; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right; width: 30%;">\u0631\u0642\u0645 \u0627\u0644\u0625\u062E\u0637\u0627\u0631</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.notificationNumber||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</td>
                        </tr>
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${n(e.date)}</td>
                        </tr>
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.siteName||e.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</td>
                        </tr>
                        ${e.sublocationName?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.sublocationName)}</td>
                        </tr>
                        `:""}
                    </table>
                </div>

                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-clipboard-list"></i> \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #f59e0b; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.incidentType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</td>
                        </tr>
                        ${e.affiliation?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0627\u0644\u062A\u0628\u0639\u064A\u0629</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${o[e.affiliation]||e.affiliation}</td>
                        </tr>
                        `:""}
                        ${e.employeeCode?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.employeeCode)}</td>
                        </tr>
                        `:""}
                        ${e.contractorName?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.contractorName)}</td>
                        </tr>
                        `:""}
                        ${e.employeeName?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.employeeName)}</td>
                        </tr>
                        `:""}
                        ${e.employeeJob?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.employeeJob)}</td>
                        </tr>
                        `:""}
                        ${e.employeeDepartment?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.employeeDepartment)}</td>
                        </tr>
                        `:""}
                    </table>
                    
                    ${e.description?`
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062D\u0627\u062F\u062B:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(e.description)}</div>
                    </div>
                    `:""}
                    
                    ${e.injuryDescription?`
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(e.injuryDescription)}</div>
                    </div>
                    `:""}
                    
                    ${e.losses?`
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">\u0627\u0644\u062E\u0633\u0627\u0626\u0631:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(e.losses)}</div>
                    </div>
                    `:""}
                    
                    ${e.actions?`
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(e.actions)}</div>
                    </div>
                    `:""}
                </div>

                <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631 -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-user-edit"></i> \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #10b981; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #d1fae5; text-align: right; width: 30%;">\u0627\u0633\u0645 \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.reporterName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</td>
                        </tr>
                        ${e.reporterCode?`
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #d1fae5; text-align: right;">\u0643\u0648\u062F \u0645\u0639\u062F \u0627\u0644\u0625\u062E\u0637\u0627\u0631</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(e.reporterCode)}</td>
                        </tr>
                        `:""}
                    </table>
                </div>
            </div>
        `},_buildNotificationReportHtml(e){const t=this.buildNotificationPrintContent(e),i=e.notificationNumber||`NOT-${new Date().toISOString().slice(0,10)}`;return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u0625\u062E\u0637\u0627\u0631 \u0639\u0646 \u062D\u0627\u062F\u062B - Incident Notification",t,!1,!1,{version:AppState?.companySettings?.formVersion||"1.0",titleAr:"\u0625\u062E\u0637\u0627\u0631 \u0639\u0646 \u062D\u0627\u062F\u062B",titleEn:"Incident Notification",includeQRCode:!1},e.date||new Date,new Date):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${t}</body></html>`},async exportNotificationPDFWithData(e){try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 PDF...");const t=this._buildNotificationReportHtml(e),i=e.notificationNumber||"notification",a=`\u0625\u062E\u0637\u0627\u0631-\u062D\u0627\u062F\u062B-${String(i).replace(/[^\w\u0600-\u06FF.-]/g,"_")}`,n=await this._downloadHtmlReportAsPdf(t,a);return Loading.hide(),n?(Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u062E\u0637\u0627\u0631 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D"),!0):(this._openIncidentPrintableHtml(t,"\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),!0)}catch(t){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+t.message),!1}},async exportNotificationPDF(){const e=this.getNotificationFormData();if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u064A\u0631\u062C\u0649 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u0627\u064B.");return}if(!e.notificationNumber&&!e.description){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}await this.exportNotificationPDFWithData(e)},async processNotificationBackgroundTasks(e,t){try{const i=await GoogleIntegration.sendRequest({action:"addIncidentNotification",data:e});if(i&&i.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u062E\u0637\u0627\u0631 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D"):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u062E\u0637\u0627\u0631 \u0641\u064A Google Sheets\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0639\u0628\u0631 autoSave"),await GoogleIntegration.autoSave("IncidentNotifications",AppState.appData.incidentNotifications)),await GoogleIntegration.sendRequest({action:"addIncident",data:t}),e.actions)try{await GoogleIntegration.sendToAppsScript?.("createActionFromModule",{sourceModule:"IncidentNotification",sourceId:e.id,sourceData:{date:e.date,description:e.description,correctiveAction:e.actions,department:e.department,location:e.location,siteId:e.siteId,siteName:e.siteName,sublocation:e.sublocation,sublocationId:e.sublocationId,sublocationName:e.sublocationName,severity:"Medium",reportedBy:e.reporterName,createdBy:e.createdBy?.name||"System",...e}})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 Action Record:",a)}Utils.safeLog("Incidents: \u062A\u0645 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0625\u062E\u0637\u0627\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0625\u062E\u0637\u0627\u0631:",i)}},async editIncident(e){const t=AppState.currentUser;if(!t){Notification.error("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0623\u0648\u0644\u0627\u064B");return}const i=String(t.role||"").trim().toLowerCase(),a=t.permissions||{};if(!(i==="admin"||i==="administrator"||i==="system_admin"||a.admin===!0||a["manage-modules"]===!0||a["incidents-manage"]===!0||i==="safety_officer"||a["incidents-complete-investigation"]===!0)){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B.");return}const o=AppState.appData.incidents.find(s=>s.id===e);if(o){const s={...o};this._mergeIncidentWithInvestigationData(s),await this.showNotificationForm(s)}},async viewIncident(e){const t=AppState.appData.incidents.find(n=>n.id===e);if(!t)return;if(this._normalizeIncidentApprovalRecord(t),t.investigation&&typeof t.investigation=="string")try{t.investigation=JSON.parse(t.investigation)}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 investigation:",n),t.investigation={}}const i=this.getIncidentApprovalState(t),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderApprovalFlowHtml(t)}
                    <div style="margin-bottom:16px;">
                        <span class="text-sm font-semibold text-gray-600">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                        ${this.renderWorkflowStatusBadge(t)}
                    </div>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0643\u0648\u062F ISO:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(t.isoCode||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0639\u0646\u0648\u0627\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.title||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.location||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</label>
                                <p class="text-gray-800">${t.date?Utils.formatDate(t.date):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u062F\u0629:</label>
                                <span class="badge badge-${this.getSeverityBadgeClass(t.severity)}">
                                    ${t.severity||"-"}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0628\u0644\u063A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.reportedBy||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(t))}">
                                    ${Utils.escapeHTML(this.getIncidentDisplayStatus(t))}
                                </span>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0635\u0641:</label>
                                <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(t.description||"")}</p>
                            </div>
                            ${t.image?`
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629:</label>
                                <div class="mt-2">
                                    <img src="${this.convertGoogleDriveLinkToPrintable(t.image)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u062F\u062B" class="max-w-full h-auto rounded border" style="max-height: 400px;"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                                </div>
                            </div>
                            `:""}
                            ${t.correctiveAction?`
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629:</label>
                                <p class="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded border">${Utils.escapeHTML(t.correctiveAction||"")}</p>
                            </div>
                            `:""}
                            ${t.investigation?`
                            <div class="col-span-2 border-t pt-4 mt-4">
                                <h3 class="text-base font-semibold text-gray-700 mb-3">
                                    <i class="fas fa-search ml-2"></i>
                                    \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                                </h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u0642\u064A\u0642:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(t.investigation.investigationNumber||"-")}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0642\u064A\u0642:</label>
                                        <p class="text-gray-800">${t.investigation.investigationDateTime?Utils.formatDate(t.investigation.investigationDateTime):"-"}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(t.investigation.factoryName||"-")}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u062F\u062B:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(t.investigation.locationName||"-")}</p>
                                    </div>
                                    ${t.investigation.riskResult?`
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645:</label>
                                        <span class="badge badge-${t.investigation.riskResult==="high"?"danger":t.investigation.riskResult==="medium"?"warning":"info"}">
                                            ${t.investigation.riskResult==="high"?"\u0639\u0627\u0644\u064A":t.investigation.riskResult==="medium"?"\u0645\u062A\u0648\u0633\u0637":"\u0645\u0646\u062E\u0641\u0636"}
                                        </span>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                            `:""}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-secondary" onclick="Incidents.exportPDF('${t.id}');">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B
                    </button>
                    ${i.awaitingApproval&&this.hasInvestigationData(t)&&this.canApproveIncident()?`
                    <button class="btn-danger" onclick="Incidents.rejectIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-times ml-2"></i>\u0631\u0641\u0636 \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                    </button>
                    <button class="btn-success" onclick="Incidents.approveIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-check ml-2"></i>\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                    </button>
                    `:""}
                    ${t.investigation?`
                    <button class="btn-secondary" onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${t.id}'); this.closest('.modal-overlay').remove(); } else { console.error('Incidents.showInvestigationForm is not available'); alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629.'); }">
                        <i class="fas fa-search ml-2"></i>\u0639\u0631\u0636/\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                    </button>
                    `:`
                    <button class="btn-secondary" onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${t.id}'); this.closest('.modal-overlay').remove(); } else { console.error('Incidents.showInvestigationForm is not available'); alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629.'); }">
                        <i class="fas fa-search ml-2"></i>\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B
                    </button>
                    `}
                    <button class="btn-primary" onclick="Incidents.editIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",n=>{n.target===a&&a.remove()})},async deleteIncident(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!this.canDeleteIncident()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062D\u0648\u0627\u062F\u062B. \u0627\u0644\u062D\u0630\u0641 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637.");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621."))return;if(!(AppState.appData.incidents||[]).find(i=>i.id===e)){Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647 \u0645\u0633\u0628\u0642\u0627\u064B");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B...");try{const i={id:AppState.currentUser?.id||"",email:AppState.currentUser?.email||"",name:AppState.currentUser?.name||"",role:AppState.currentUser?.role||"",permissions:AppState.currentUser?.permissions||{}},a=await GoogleIntegration.sendRequest({action:"deleteIncident",data:{incidentId:e,userData:i}});if(!a?.success)throw new Error(a?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645");if(typeof GoogleIntegration.clearCache=="function"&&GoogleIntegration.clearCache("Incidents"),AppState.appData.incidents=(AppState.appData.incidents||[]).filter(n=>n.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),await this.removeFromRegistry(e),typeof Dashboard<"u"&&Dashboard.refreshIncidents&&Dashboard.refreshIncidents(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="approvals"){const n=document.getElementById("incidents-tab-content");n&&(n.innerHTML=await this.renderApprovalsTab(),this.setupTabEventListeners("approvals"))}else this.loadIncidentsList()}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062D\u0627\u062F\u062B: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{Loading.hide()}},async showInvestigationForm(e){try{if(AppState.debugMode&&Utils.safeLog("\u{1F50D} showInvestigationForm called with incidentId:",e),!e){AppState.debugMode&&Utils.safeError("\u274C incidentId is missing"),Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!AppState||!AppState.appData||!AppState.appData.incidents){AppState.debugMode&&Utils.safeError("\u274C AppState.appData.incidents is not available"),Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629"),Utils.safeError("AppState.appData.incidents is not available");return}AppState.debugMode&&Utils.safeLog("\u2705 AppState check passed, incidents count:",AppState.appData.incidents.length);const t=AppState.appData.incidents.find(T=>T.id===e);if(!t){AppState.debugMode&&(Utils.safeError("\u274C Incident not found with id:",e),Utils.safeLog("Available incident IDs:",AppState.appData.incidents.map(T=>T.id))),Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Utils.safeError("Incident not found with id:",e);return}AppState.debugMode&&Utils.safeLog("\u2705 Incident found:",t.title||t.id);const i=AppState.currentUser?.role==="admin"||AppState.currentUser?.permissions&&(AppState.currentUser.permissions.admin===!0||AppState.currentUser.permissions["manage-modules"]===!0),a=AppState.currentUser?.role==="safety_officer"||AppState.currentUser?.permissions&&AppState.currentUser.permissions["incidents-complete-investigation"]===!0,n=!!t.notificationId,o=i||a;let s=t.investigation||{};if(typeof s=="string")try{s=JSON.parse(s)}catch(T){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 investigation:",T),s={}}const r=!!s.investigationNumber,d=s.investigationNumber||`INV-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,"0")}-${String((AppState.appData.incidents||[]).filter(T=>T.investigation?.investigationNumber).length+1).padStart(4,"0")}`,l=s.investigationDateTime?this.safeDateToISOString(s.investigationDateTime):r?"":Utils.toDateTimeLocalString(new Date),c=s.incidentDateTime?this.safeDateToISOString(s.incidentDateTime):this.safeDateToISOString(t.date),u=s.factoryId||t.siteId||"",p=s.locationId||t.sublocationId||"",m=s.description||t.description||"",f=s.affectedName||t.affectedName||"",g=s.affectedJob||t.affectedJobTitle||"",x=s.affectedDepartment||t.affectedDepartment||"",w=s.affectedEmployeeCode||t.affectedCode||t.employeeCode||"",y=s.affectedAffiliation||t.affiliation||"",A=this.buildInvestigationAffectedContractorSelectOptions(y==="contractor"?x:""),I=s.injuredPart||t.injuredPart||this.resolveIncidentInjuredPart(t),v=s.equipmentCause||t.equipmentCause||"",$=this._buildInvestigationBodyPartsDatalistOptions(),F=this.renderInvestigationActionPlanRows(s.actionPlan||[]),b=document.createElement("div");b.className="modal-overlay",b.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;",b.innerHTML=`
            <style>
                .investigation-section {
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .investigation-section:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                    transform: translateY(-2px);
                }
                .investigation-section h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 3px solid;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .investigation-section h3 i {
                    font-size: 1.5rem;
                    padding: 10px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.3);
                }
                .section-1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .section-1 h3 { color: #1565C0; border-color: #2196F3; }
                .section-1 h3 i { color: #1976D2; background: rgba(33, 150, 243, 0.1); }
                
                .section-2 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .section-2 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .section-2 h3 i { color: #7B1FA2; background: rgba(156, 39, 176, 0.1); }
                
                .section-3 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .section-3 h3 { color: #E65100; border-color: #FF9800; }
                .section-3 h3 i { color: #F57C00; background: rgba(255, 152, 0, 0.1); }
                
                .section-4 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .section-4 h3 { color: #AD1457; border-color: #E91E63; }
                .section-4 h3 i { color: #C2185B; background: rgba(233, 30, 99, 0.1); }
                
                .section-5 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .section-5 h3 { color: #00695C; border-color: #009688; }
                .section-5 h3 i { color: #00796B; background: rgba(0, 150, 136, 0.1); }
                
                .section-6 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .section-6 h3 { color: #2E7D32; border-color: #4CAF50; }
                .section-6 h3 i { color: #388E3C; background: rgba(76, 175, 80, 0.1); }
                
                .section-7 { background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); border-color: #FFC107; }
                .section-7 h3 { color: #F57F17; border-color: #FFC107; }
                .section-7 h3 i { color: #F9A825; background: rgba(255, 193, 7, 0.1); }

                .section-rca { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #7c3aed; }
                .section-rca h3 { color: #5b21b6; border-color: #7c3aed; }
                .section-rca h3 i { color: #6d28d9; background: rgba(124, 58, 237, 0.1); }
            </style>
            <div class="modal-content" style="max-width: 1500px; width: 98%; max-height: 95vh; overflow-y: auto; padding: 0;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 20px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-search ml-2"></i>
                        \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B \u2013 Incident Investigation
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; max-height: calc(95vh - 180px); overflow-y: auto; background: #f5f7fa;">
                    <form id="investigation-form" data-incident-id="${e}">
                        <!-- 1) \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="investigation-section section-1">
                            <h3>
                                <i class="fas fa-info-circle"></i>
                                <span>1) \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-calendar-alt ml-2 text-blue-600"></i>
                                        \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062A\u062D\u0642\u064A\u0642 *
                                    </label>
                                    <input type="datetime-local" id="investigation-datetime" required class="form-input" 
                                        value="${l}" style="border: 2px solid #2196F3; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-calendar-check ml-2 text-blue-600"></i>
                                        \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B *
                                    </label>
                                    <input type="datetime-local" id="incident-datetime" required class="form-input" 
                                        value="${c}" style="border: 2px solid #2196F3; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-industry ml-2 text-blue-600"></i>
                                        \u0627\u0644\u0645\u0635\u0646\u0639 *
                                    </label>
                                    <select id="investigation-factory" required class="form-input" style="border: 2px solid #2196F3;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                        ${u?`<option value="${u}" selected>${Utils.escapeHTML(t.siteName||t.location||"")}</option>`:""}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-map-marker-alt ml-2 text-blue-600"></i>
                                        \u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0627\u0644\u0636\u0628\u0637 *
                                    </label>
                                    <select id="investigation-location" required class="form-input" style="border: 2px solid #2196F3;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</option>
                                        ${p?`<option value="${p}" selected>${Utils.escapeHTML(t.sublocationName||t.sublocation||"")}</option>`:""}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                                        \u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                                    </label>
                                    <input type="text" id="investigation-number" class="form-input" 
                                        value="${d}" readonly style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%); font-weight: 700; border: 2px solid #1976D2; color: #0D47A1;">
                                </div>
                            </div>
                        </div>

                        <!-- 2) \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B -->
                        <div class="investigation-section section-2">
                            <h3>
                                <i class="fas fa-tags"></i>
                                <span>2) \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-nearmiss" class="form-checkbox ml-2 text-purple-600" 
                                        ${s.incidentTypes?.includes("nearmiss")?"checked":""}>
                                    <span class="font-semibold text-gray-700">\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-property" class="form-checkbox ml-2 text-purple-600"
                                        ${s.incidentTypes?.includes("property")?"checked":""}>
                                    <span class="font-semibold text-gray-700">\u062A\u0644\u0641 \u0645\u0645\u062A\u0644\u0643\u0627\u062A</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-injury-no-lost" class="form-checkbox ml-2 text-purple-600"
                                        ${s.incidentTypes?.includes("injury-no-lost")?"checked":""}>
                                    <span class="font-semibold text-gray-700">\u0625\u0635\u0627\u0628\u0629 \u0628\u062F\u0648\u0646 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-injury-lost" class="form-checkbox ml-2 text-purple-600"
                                        ${s.incidentTypes?.includes("injury-lost")?"checked":""}>
                                    <span class="font-semibold text-gray-700">\u0625\u0635\u0627\u0628\u0629 \u0645\u0639 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-fatality" class="form-checkbox ml-2 text-purple-600"
                                        ${s.incidentTypes?.includes("fatality")?"checked":""}>
                                    <span class="font-semibold text-gray-700">\u0648\u0641\u0627\u0629</span>
                                </label>
                            </div>
                        </div>

                        <!-- 3) \u0648\u0635\u0641 \u0648\u0642\u0627\u0626\u0639 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u062D\u0627\u062F\u062B -->
                        <div class="investigation-section section-3">
                            <h3>
                                <i class="fas fa-align-left"></i>
                                <span>3) \u0648\u0635\u0641 \u0648\u0642\u0627\u0626\u0639 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u062D\u0627\u062F\u062B</span>
                            </h3>
                            <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-file-alt ml-2 text-orange-600"></i>
                                        \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0631\u0626\u064A\u0633\u064A *
                                    </label>
                                    <textarea id="investigation-description" required class="form-input" rows="6" 
                                        placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0648\u0642\u0627\u0626\u0639 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u062D\u0627\u062F\u062B..." style="border: 2px solid #FF9800; font-size: 1rem;">${Utils.escapeHTML(m)}</textarea>
                                </div>
                                <div id="nearmiss-description-wrapper" style="display: none;">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-exclamation-triangle ml-2 text-orange-600"></i>
                                        \u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0648\u0634\u064A\u0643\u0629
                                    </label>
                                    <textarea id="investigation-nearmiss-description" class="form-input" rows="4" 
                                        placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0648\u0634\u064A\u0643\u0629..." style="border: 2px solid #FF9800;">${Utils.escapeHTML(s.nearmissDescription||"")}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- 4) \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628 -->
                        <div class="investigation-section section-4">
                            <h3>
                                <i class="fas fa-user-injured"></i>
                                <span>4) \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628</span>
                            </h3>
                            <div id="investigation-affected-panel" class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0628\u0639\u064A\u0629 \u0627\u0644\u0645\u0635\u0627\u0628</label>
                                        <select id="investigation-affected-affiliation" class="form-input">
                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0628\u0639\u064A\u0629</option>
                                            <option value="company" ${s.affectedAffiliation==="company"?"selected":""}>\u0634\u0631\u0643\u0629</option>
                                            <option value="daily-labor" ${s.affectedAffiliation==="daily-labor"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629</option>
                                            <option value="contractor" ${s.affectedAffiliation==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                            <option value="visitor" ${s.affectedAffiliation==="visitor"?"selected":""}>\u0632\u0627\u0626\u0631</option>
                                            <option value="none" ${s.affectedAffiliation==="none"?"selected":""}>\u0644\u0627 \u064A\u0648\u062C\u062F</option>
                                        </select>
                                    </div>

                                    <div id="investigation-affected-code-wrapper" class="md:col-span-2" style="display:none;">
                                        <div class="p-4 rounded-lg border-2 border-pink-200 bg-white/80">
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                                <i class="fas fa-id-badge ml-1 text-pink-600"></i>
                                                \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 *
                                            </label>
                                            <input type="text" id="investigation-affected-employee-code" class="form-input"
                                                value="${Utils.escapeHTML(w)}"
                                                placeholder="\u0627\u0643\u062A\u0628 \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0644\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629" autocomplete="off">
                                            <p class="text-xs text-gray-500 mt-2">\u0639\u0646\u062F \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u062A\u064F\u0645\u0644\u0623 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0633\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.</p>
                                        </div>
                                    </div>

                                    <div id="investigation-affected-contractor-wrapper" class="md:col-span-2" style="display:none;">
                                        <div class="p-4 rounded-lg border-2 border-pink-200 bg-white/80">
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                                <i class="fas fa-handshake ml-1 text-pink-600"></i>
                                                \u0627\u0644\u0645\u0642\u0627\u0648\u0644 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627) *
                                            </label>
                                            <select id="investigation-affected-contractor-select" class="form-input">
                                                ${A}
                                            </select>
                                            <p class="text-xs text-gray-500 mt-2">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629\u060C \u062B\u0645 \u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0644 \u0623\u062F\u0646\u0627\u0647.</p>
                                        </div>
                                    </div>

                                    <div id="investigation-affected-name-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u0645</label>
                                        <input type="text" id="investigation-affected-name" class="form-input"
                                            value="${Utils.escapeHTML(f)}"
                                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628">
                                    </div>
                                    <div id="investigation-affected-job-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                        <input type="text" id="investigation-affected-job" class="form-input"
                                            value="${Utils.escapeHTML(g)}"
                                            placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                                    </div>
                                    <div id="investigation-affected-age-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0646</label>
                                        <input type="number" id="investigation-affected-age" class="form-input"
                                            value="${s.affectedAge||""}"
                                            placeholder="\u064A\u064F\u0639\u0628\u0651\u064E\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641" min="1" max="100">
                                    </div>

                                    <div id="investigation-affected-department-wrapper" class="md:col-span-2">
                                        <label id="investigation-affected-department-label" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627</label>
                                        <input type="text" id="investigation-affected-department" class="form-input"
                                            value="${Utils.escapeHTML(x)}"
                                            placeholder="\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627">
                                    </div>

                                    <div id="investigation-injured-part-wrapper" class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-user-injured ml-1 text-pink-600"></i>
                                            \u0627\u0644\u0623\u0637\u0631\u0627\u0641 / \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631 \u0645\u0646 \u062C\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628
                                        </label>
                                        <input type="text" id="investigation-injured-part" class="form-input"
                                            list="investigation-body-parts-datalist"
                                            value="${Utils.escapeHTML(I&&I!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?I:"")}"
                                            placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631 (\u0645\u062B\u0644: \u0627\u0644\u064A\u062F\u060C \u0627\u0644\u0631\u0623\u0633\u060C \u0627\u0644\u0633\u0627\u0642...)">
                                        <datalist id="investigation-body-parts-datalist">
                                            ${$}
                                        </datalist>
                                    </div>

                                    <div id="investigation-equipment-cause-wrapper" class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-cogs ml-1 text-pink-600"></i>
                                            \u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629 \u0641\u064A \u0627\u0644\u0625\u0635\u0627\u0628\u0629
                                        </label>
                                        <input type="text" id="investigation-equipment-cause" class="form-input"
                                            value="${Utils.escapeHTML(v&&v!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?v:"")}"
                                            placeholder="\u0627\u0633\u0645 \u0623\u0648 \u0648\u0635\u0641 \u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0622\u0644\u0629 / \u0627\u0644\u0623\u062F\u0627\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 5) \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0645\u062D\u0642\u0642 -->
                        <div class="investigation-section section-5">
                            <h3>
                                <i class="fas fa-user-shield"></i>
                                <span>5) \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0645\u062D\u0642\u0642</span>
                            </h3>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646</label>
                                        <select id="investigation-unsafe-behavior" class="form-input">
                                            <option value="">\u0627\u062E\u062A\u0631</option>
                                            <option value="yes" ${s.unsafeBehavior==="yes"?"selected":""}>\u0646\u0639\u0645</option>
                                            <option value="no" ${s.unsafeBehavior==="no"?"selected":""}>\u0644\u0627</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646</label>
                                        <select id="investigation-unsafe-condition" class="form-input">
                                            <option value="">\u0627\u062E\u062A\u0631</option>
                                            <option value="yes" ${s.unsafeCondition==="yes"?"selected":""}>\u0646\u0639\u0645</option>
                                            <option value="no" ${s.unsafeCondition==="no"?"selected":""}>\u0644\u0627</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 -->
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                                        <i class="fas fa-th ml-2 text-teal-600"></i>
                                        \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 - \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u062E\u0644\u064A\u0629 \u0644\u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0631
                                    </label>
                                    <div class="bg-white rounded-lg p-4 border-2 border-teal-300">
                                        <div id="investigation-risk-matrix">
                                            ${typeof RiskMatrix<"u"?RiskMatrix.generate("investigation-risk-matrix",{selectedLikelihood:s.riskProbability?parseInt(s.riskProbability):null,selectedConsequence:s.riskSeverity?parseInt(s.riskSeverity):null,interactive:!0}):`
                                                <div class="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                                    <i class="fas fa-exclamation-triangle text-4xl text-gray-400 mb-3"></i>
                                                    <p class="text-gray-600 font-semibold mb-2">\u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                                                    <p class="text-sm text-gray-500">\u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u0648\u0646 RiskMatrix</p>
                                                </div>
                                            `}
                                        </div>
                                        
                                        <!-- \u062D\u0642\u0648\u0644 \u0645\u062E\u0641\u064A\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629 -->
                                        <input type="hidden" id="investigation-risk-probability" value="${s.riskProbability||""}">
                                        <input type="hidden" id="investigation-risk-severity" value="${s.riskSeverity||""}">
                                        <input type="hidden" id="investigation-risk-level" value="${s.riskLevel||""}">
                                    </div>
                                    
                                    ${s.riskProbability&&s.riskSeverity?`
                                        <script>
                                            (function() {
                                                const probability = ${s.riskProbability?parseInt(s.riskProbability):"null"};
                                                const severity = ${s.riskSeverity?parseInt(s.riskSeverity):"null"};
                                                setTimeout(() => {
                                                    if (typeof RiskMatrix !== 'undefined') {
                                                        const matrixContainer = document.getElementById('investigation-risk-matrix');
                                                        if (matrixContainer) {
                                                            const cells = matrixContainer.querySelectorAll('.risk-cell');
                                                            cells.forEach(cell => {
                                                                const cellLikelihood = parseInt(cell.getAttribute('data-likelihood'));
                                                                const cellConsequence = parseInt(cell.getAttribute('data-consequence'));
                                                                if (probability !== null && severity !== null &&
                                                                    cellLikelihood === probability && 
                                                                    cellConsequence === severity) {
                                                                    cell.classList.add('selected');
                                                                }
                                                            });
                                                        }
                                                    }
                                                }, 100);
                                            })();
                                        <\/script>
                                    `:""}
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-chart-line ml-2 text-teal-600"></i>
                                        \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 (\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)
                                    </label>
                                    <input type="text" id="investigation-risk-result" class="form-input" 
                                        value="${s.riskResult||""}" 
                                        readonly style="background-color: #f0fdfa; border-color: #14b8a6; font-weight: 600; font-size: 1.1rem; text-align: center;">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-comment-alt ml-2 text-teal-600"></i>
                                        \u0634\u0631\u062D \u0627\u0644\u062E\u0637\u0631 (\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)
                                    </label>
                                    <textarea id="investigation-risk-explanation" class="form-input" rows="6" 
                                        placeholder="\u0633\u064A\u062A\u0645 \u0645\u0644\u0621 \u0647\u0630\u0627 \u0627\u0644\u062D\u0642\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u062E\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629..."
                                        style="background-color: #f0fdfa; border-color: #14b8a6;">${Utils.escapeHTML(s.riskExplanation||"")}</textarea>
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-info-circle ml-1"></i>
                                        \u064A\u0645\u0643\u0646\u0643 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0631\u062D \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- 5.5) \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A -->
                        <div class="investigation-section section-rca">
                            <h3>
                                <i class="fas fa-microscope"></i>
                                <span>5.5) \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)</span>
                            </h3>
                            ${o?`
                            <div class="mb-4 p-4 rounded-lg border-2 border-indigo-200 bg-gradient-to-l from-indigo-50 to-purple-50" style="border-color:#a5b4fc;">
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <div class="flex-1 min-w-[200px]">
                                        <p class="text-sm font-semibold text-indigo-900 mb-1">
                                            <i class="fas fa-robot ml-2 text-indigo-600"></i>
                                            \u0627\u0642\u062A\u0631\u0627\u062D \u062A\u062D\u0644\u064A\u0644 \u0630\u0643\u064A (Gemini)
                                        </p>
                                        <p class="text-xs text-indigo-700">
                                            <i class="fas fa-info-circle ml-1"></i>
                                            \u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u2014 \u0644\u064A\u0633\u062A \u0628\u062F\u064A\u0644\u0627\u064B \u0639\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0627\u0644\u0628\u0634\u0631\u064A. \u0627\u0645\u0644\u0623 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 1\u20134 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0627\u0644\u0632\u0631.
                                        </p>
                                    </div>
                                    <button type="button" class="btn-primary" onclick="Incidents.suggestInvestigationWithAI('${e}')"
                                        style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border:none;padding:10px 20px;white-space:nowrap;">
                                        <i class="fas fa-magic ml-2"></i>
                                        \u0627\u0642\u062A\u0631\u0627\u062D \u062A\u062D\u0644\u064A\u0644 \u0630\u0643\u064A
                                    </button>
                                </div>
                            </div>
                            `:""}
                            <div id="investigation-rca-wizard" class="bg-white p-4 rounded-lg border-2" style="border-color:#c4b5fd;"></div>
                        </div>

                        <!-- 6) \u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 -->
                        <div class="investigation-section section-6">
                            <h3>
                                <i class="fas fa-clipboard-list"></i>
                                <span>6) \u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644</span>
                            </h3>
                            <div class="bg-white p-4 rounded-lg border-2 border-green-300" style="width: 100%; box-sizing: border-box;">
                                <div class="table-wrapper" style="width: 100%; overflow-x: auto; overflow-y: visible; box-sizing: border-box;">
                                    <table class="data-table" style="width: 100%; border-collapse: collapse; table-layout: fixed; min-width: 100%;">
                                        <thead>
                                            <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                                                <th style="padding: 14px; width: 35%; text-align: right; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-tasks ml-2"></i>
                                                    \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A
                                                </th>
                                                <th style="padding: 14px; width: 15%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-calendar-alt ml-2"></i>
                                                    \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637
                                                </th>
                                                <th style="padding: 14px; width: 25%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-user-check ml-2"></i>
                                                    \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630
                                                </th>
                                                <th style="padding: 14px; width: 25%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-user-clock ml-2"></i>
                                                    \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="investigation-action-plan-body" style="background: #f9fff9; width: 100%;">
                                            ${F}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="mt-4 text-center" style="width: 100%; box-sizing: border-box;">
                                    <button type="button" class="btn-secondary" onclick="Incidents.addInvestigationActionPlanRow()" style="padding: 10px 24px; background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); color: white; border: none; cursor: pointer;">
                                        <i class="fas fa-plus ml-2"></i>
                                        \u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621 \u062C\u062F\u064A\u062F
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 7) \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A -->
                        <div class="investigation-section section-7">
                            <h3>
                                <i class="fas fa-signature"></i>
                                <span>7) \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u0646\u0637\u0642\u0629</label>
                                    <input type="text" id="investigation-signature-area-manager" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(s.signatureAreaManager?.name||"")}" 
                                        placeholder="\u0627\u0644\u0627\u0633\u0645">
                                    <input type="date" id="investigation-signature-area-manager-date" class="form-input mb-2" 
                                        value="${s.signatureAreaManager?.date||""}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${s.signatureAreaManager?.signature?`<img src="${s.signatureAreaManager.signature}" alt="\u062A\u0648\u0642\u064A\u0639" style="max-height: 50px;">`:'<span class="text-gray-400 text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</span>'}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629</label>
                                    <input type="text" id="investigation-signature-safety-manager" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(s.signatureSafetyManager?.name||"")}" 
                                        placeholder="\u0627\u0644\u0627\u0633\u0645">
                                    <input type="date" id="investigation-signature-safety-manager-date" class="form-input mb-2" 
                                        value="${s.signatureSafetyManager?.date||""}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${s.signatureSafetyManager?.signature?`<img src="${s.signatureSafetyManager.signature}" alt="\u062A\u0648\u0642\u064A\u0639" style="max-height: 50px;">`:'<span class="text-gray-400 text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</span>'}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629</label>
                                    <input type="text" id="investigation-signature-safety-director" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(s.signatureSafetyDirector?.name||"")}" 
                                        placeholder="\u0627\u0644\u0627\u0633\u0645">
                                    <input type="date" id="investigation-signature-safety-director-date" class="form-input mb-2" 
                                        value="${s.signatureSafetyDirector?.date||""}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${s.signatureSafetyDirector?.signature?`<img src="${s.signatureSafetyDirector.signature}" alt="\u062A\u0648\u0642\u064A\u0639" style="max-height: 50px;">`:'<span class="text-gray-400 text-sm">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</span>'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                                \u0625\u063A\u0644\u0627\u0642
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printInvestigation('${e}')" title="\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642">
                                <i class="fas fa-print ml-2"></i>
                                \u0637\u0628\u0627\u0639\u0629
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportInvestigationPDF('${e}')" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button type="submit" class="btn-primary" id="investigation-submit-btn">
                                <i class="fas fa-save ml-2"></i>
                                ${r?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0642\u064A\u0642"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(b),Utils.safeLog("\u2705 Investigation modal added to DOM"),requestAnimationFrame(()=>{b.style.display="flex",b.style.opacity="1",Utils.safeLog("\u2705 Investigation modal displayed")}),setTimeout(()=>{try{Utils.safeLog("\u{1F527} Setting up investigation form listeners..."),this.setupInvestigationFormListeners(b,e,o),this.loadInvestigationFormData(t),Utils.safeLog("\u2705 Investigation form setup complete")}catch(T){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642:",T),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C: "+T.message)}},100),b.addEventListener("click",T=>{T.target===b&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&b.remove()})}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},showInvestigationFormSelector(){try{const e=AppState.appData?.incidents||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u062F\u062B \u0623\u0648\u0644\u0627\u064B.");return}const t=document.createElement("div");t.className="modal-overlay",t.style.cssText="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;",t.innerHTML=`
                <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-search ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u062D\u0627\u062F\u062B \u0644\u0644\u062A\u062D\u0642\u064A\u0642
                        </h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <input 
                                type="text" 
                                id="investigation-incident-search" 
                                class="form-input" 
                                placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u062D\u0627\u062F\u062B \u0628\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F..."
                            >
                        </div>
                        <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u0643\u0648\u062F</th>
                                        <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>
                                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody id="investigation-incidents-list">
                                    ${e.map(a=>`
                                        <tr data-incident-id="${a.id}">
                                            <td>${Utils.escapeHTML(a.isoCode||a.id||"")}</td>
                                            <td>${Utils.escapeHTML(a.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646")}</td>
                                            <td>${a.date?new Date(a.date).toLocaleDateString("ar-SA"):""}</td>
                                            <td>
                                                <span class="badge badge-${a.status==="\u0645\u063A\u0644\u0642"?"success":a.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642"?"warning":"info"}">
                                                    ${Utils.escapeHTML(a.status||"\u0645\u0641\u062A\u0648\u062D")}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    class="btn-primary btn-sm" 
                                                    onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { 
                                                        Incidents.showInvestigationForm('${a.id}'); 
                                                        this.closest('.modal-overlay').remove(); 
                                                    } else { 
                                                        alert('\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D'); 
                                                    }"
                                                >
                                                    <i class="fas fa-search ml-1"></i>
                                                    \u0627\u0644\u062A\u062D\u0642\u064A\u0642
                                                </button>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                        ${e.length===0?'<p class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0648\u0627\u062F\u062B \u0645\u062A\u0627\u062D\u0629</p>':""}
                    </div>
                </div>
            `,document.body.appendChild(t);const i=t.querySelector("#investigation-incident-search");i&&i.addEventListener("input",a=>{const n=a.target.value.toLowerCase();t.querySelectorAll("#investigation-incidents-list tr").forEach(s=>{const r=s.textContent.toLowerCase();s.style.display=r.includes(n)?"":"none"})}),t.addEventListener("click",a=>{a.target===t&&t.remove()})}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message)}},_formatInvestigationIncidentTypesLabel(e){const t={nearmiss:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",property:"\u062A\u0644\u0641 \u0645\u0645\u062A\u0644\u0643\u0627\u062A","injury-no-lost":"\u0625\u0635\u0627\u0628\u0629 \u0628\u062F\u0648\u0646 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644","injury-lost":"\u0625\u0635\u0627\u0628\u0629 \u0645\u0639 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644",fatality:"\u0648\u0641\u0627\u0629"};return(e||[]).map(i=>t[i]||i).join("\u060C ")},_mergeIncidentWithInvestigationData(e){if(!e)return e;let t=e.investigation;if(typeof t=="string")try{t=JSON.parse(t)}catch{t=null}return!t||typeof t!="object"||(t.affectedName&&(e.affectedName=t.affectedName),t.affectedJob&&(e.affectedJobTitle=t.affectedJob),t.affectedDepartment&&(e.affectedDepartment=t.affectedDepartment),t.affectedEmployeeCode&&(e.affectedCode=t.affectedEmployeeCode),t.affectedAffiliation==="contractor"?e.affectedType="contractor":t.affectedAffiliation==="company"&&(e.affectedType=e.affectedType||"employee"),Array.isArray(t.actionPlan)&&t.actionPlan.length&&(e.actionPlan=t.actionPlan),Array.isArray(t.incidentTypes)&&t.incidentTypes.length&&(e.incidentType=this._formatInvestigationIncidentTypesLabel(t.incidentTypes))),e},_applyInvestigationToIncident(e,t){!e||!t||(t.affectedName&&(e.affectedName=t.affectedName),t.affectedJob&&(e.affectedJobTitle=t.affectedJob),t.affectedDepartment&&(e.affectedDepartment=t.affectedDepartment),t.affectedEmployeeCode&&(e.affectedCode=t.affectedEmployeeCode),t.affectedAffiliation==="contractor"?e.affectedType="contractor":t.affectedAffiliation==="company"&&(e.affectedType=e.affectedType||"employee"),Array.isArray(t.incidentTypes)&&t.incidentTypes.length&&(e.incidentType=this._formatInvestigationIncidentTypesLabel(t.incidentTypes)),Array.isArray(t.actionPlan)&&(e.actionPlan=t.actionPlan.map(i=>({correctiveAction:i.correctiveAction||"",plannedDate:i.plannedDate||"",responsibleName:i.responsibleName||"",responsibleDepartment:i.responsibleDepartment||"",responsibleDate:i.responsibleDate||"",followUpName:i.followUpName||"",followUpDepartment:i.followUpDepartment||"",followUpDate:i.followUpDate||""}))),t.factoryId&&(e.siteId=t.factoryId,t.factoryName&&(e.siteName=t.factoryName)),t.locationId&&(e.sublocationId=t.locationId,t.locationName&&(e.sublocationName=t.locationName)),t.description&&(e.description=t.description),t.injuredPart&&(e.injuredPart=t.injuredPart),t.equipmentCause&&(e.equipmentCause=t.equipmentCause))},_closeInvestigationModal(){document.querySelectorAll(".modal-overlay").forEach(e=>{e.querySelector("#investigation-form")&&e.remove()})},async _refreshIncidentsViewsAfterUpdate(e){this.lastRenderedSignature=null;const t=this.currentTab||"incidents-list",i=document.getElementById("incidents-tab-content");if(t==="incidents-list"?await this.loadIncidentsList():i&&(i.innerHTML=await this.renderTabContent(t),this.applyModuleI18n(i),this.setupTabEventListeners(t)),this.currentEditId===e){const a=AppState.appData.incidents.find(n=>n.id===e);a&&(this._mergeIncidentWithInvestigationData(a),this._syncIncidentFormFromData(a))}typeof Dashboard<"u"&&Dashboard.refreshIncidents&&Dashboard.refreshIncidents()},_syncIncidentFormFromData(e){if(!e||!document.getElementById("incident-form"))return;const t=(i,a)=>{const n=document.getElementById(i);n&&a!=null&&a!==""&&(n.value=a)};t("incident-affected-name",e.affectedName),t("incident-affected-job",e.affectedJobTitle),t("incident-affected-department",e.affectedDepartment),t("incident-affected-code",e.affectedCode),Array.isArray(e.actionPlan)&&e.actionPlan.length&&this.populateActionPlanRows(e.actionPlan)},_buildInvestigationActionPlanRowHtml(e={},t=0){const i="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top; box-sizing: border-box;",a="width: 100%; border: 2px solid #4CAF50; border-radius: 6px; padding: 8px; box-sizing: border-box; display: block;";return`
            <tr data-action-row="${t}" style="border-bottom: 1px solid #c8e6c9;">
                <td style="${i}">
                    <textarea class="form-input inv-ap-corrective" rows="3" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0647\u0646\u0627..." style="${a} resize: vertical; min-height: 80px;">${Utils.escapeHTML(e.correctiveAction||"")}</textarea>
                </td>
                <td style="${i} text-align: center;">
                    <input type="date" class="form-input inv-ap-planned-date" value="${e.plannedDate||""}" style="${a} text-align: center;">
                </td>
                <td style="${i}">
                    <input type="text" class="form-input inv-ap-responsible-name" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630" value="${Utils.escapeHTML(e.responsibleName||"")}" autocomplete="off" style="${a} margin-bottom: 8px;">
                    <input type="text" class="form-input inv-ap-responsible-dept" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645" value="${Utils.escapeHTML(e.responsibleDepartment||"")}" readonly style="${a} margin-bottom: 8px; background: #f3f4f6;">
                    <input type="date" class="form-input inv-ap-responsible-date" value="${e.responsibleDate||""}" style="${a}">
                </td>
                <td style="${i}">
                    <input type="text" class="form-input inv-ap-follow-name" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0645\u062A\u0627\u0628\u0639" value="${Utils.escapeHTML(e.followUpName||"")}" autocomplete="off" style="${a} margin-bottom: 8px;">
                    <input type="text" class="form-input inv-ap-follow-dept" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645" value="${Utils.escapeHTML(e.followUpDepartment||"")}" readonly style="${a} margin-bottom: 8px; background: #f3f4f6;">
                    <input type="date" class="form-input inv-ap-follow-date" value="${e.followUpDate||""}" style="${a}">
                </td>
            </tr>
        `},setupInvestigationActionPlanRowPickers(e){if(!e||typeof EmployeeHelper>"u")return;const t=e.querySelector(".inv-ap-responsible-name"),i=e.querySelector(".inv-ap-responsible-dept"),a=e.querySelector(".inv-ap-follow-name"),n=e.querySelector(".inv-ap-follow-dept");t&&!t.dataset.pickerBound&&(t.dataset.pickerBound="1",EmployeeHelper.setupAutocomplete(t,o=>{!o||!i||(i.value=o.department||o.dept||o.section||o.departmentName||"")})),a&&!a.dataset.pickerBound&&(a.dataset.pickerBound="1",EmployeeHelper.setupAutocomplete(a,o=>{!o||!n||(n.value=o.department||o.dept||o.section||o.departmentName||"")}))},bindInvestigationActionPlanPickers(e){(e||document).querySelectorAll("#investigation-action-plan-body tr").forEach(i=>{this.setupInvestigationActionPlanRowPickers(i)})},_populateInvestigationFormFields(e,t,i){if(!e)return;const a=i||{},n=(u,p)=>{const m=e.querySelector(u);m&&p!=null&&p!==""&&(m.value=p)},o=(u,p)=>{const m=e.querySelector(u);m&&(m.checked=!!p)},s=Array.isArray(a.incidentTypes)?a.incidentTypes:[];o("#incident-type-nearmiss",s.includes("nearmiss")),o("#incident-type-property",s.includes("property")),o("#incident-type-injury-no-lost",s.includes("injury-no-lost")),o("#incident-type-injury-lost",s.includes("injury-lost")),o("#incident-type-fatality",s.includes("fatality")),n("#investigation-description",a.description||t?.description),n("#investigation-nearmiss-description",a.nearmissDescription);const r=e.querySelector("#incident-type-nearmiss"),d=e.querySelector("#nearmiss-description-wrapper");d&&(d.style.display=r?.checked?"block":"none"),n("#investigation-unsafe-behavior",a.unsafeBehavior),n("#investigation-unsafe-condition",a.unsafeCondition),a.riskProbability!=null&&n("#investigation-risk-probability",a.riskProbability),a.riskSeverity!=null&&n("#investigation-risk-severity",a.riskSeverity),n("#investigation-risk-level",a.riskLevel),n("#investigation-risk-result",a.riskResult),n("#investigation-risk-explanation",a.riskExplanation),n("#investigation-signature-area-manager",a.signatureAreaManager?.name),n("#investigation-signature-area-manager-date",a.signatureAreaManager?.date),n("#investigation-signature-safety-manager",a.signatureSafetyManager?.name),n("#investigation-signature-safety-manager-date",a.signatureSafetyManager?.date),n("#investigation-signature-safety-director",a.signatureSafetyDirector?.name),n("#investigation-signature-safety-director-date",a.signatureSafetyDirector?.date);const l=a.injuredPart||this.resolveIncidentInjuredPart(t);n("#investigation-injured-part",l&&l!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?l:""),n("#investigation-equipment-cause",a.equipmentCause||t?.equipmentCause||"");const c=e.querySelector("#investigation-action-plan-body");c&&(c.innerHTML=this.renderInvestigationActionPlanRows(a.actionPlan||[]),this.bindInvestigationActionPlanPickers(e))},renderInvestigationActionPlanRows(e){const t=!e||e.length===0?3:Math.max(3,e.length),i=[];for(let a=0;a<t;a++)i.push(this._buildInvestigationActionPlanRowHtml(e?.[a]||{},a));return i.join("")},_formatIncidentPrintDate(e){if(!e)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";try{const t=new Date(e);return isNaN(t.getTime())?String(e):t.toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return String(e||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}},_buildPrintSectionHeading(e,t,i,a){return`<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px; color: ${i}; border-bottom: 3px solid ${a}; padding-bottom: 10px;">${e}) ${Utils.escapeHTML(t)}</div>`},_buildPrintDataTable(e,t="#e3f2fd"){const i=(Array.isArray(e)?e:[]).filter(a=>a&&a.label&&a.value!==void 0&&a.value!==null&&String(a.value).trim()!=="");return i.length?`<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            ${i.map(a=>`
                <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; background-color: ${t}; text-align: right; width: 30%;">${Utils.escapeHTML(a.label)}</th>
                    <td style="padding: 10px; border: 1px solid #ddd; ${a.cellStyle||""}">${a.html?a.html:Utils.escapeHTML(String(a.value))}</td>
                </tr>
            `).join("")}
        </table>`:""},_buildPrintTextPanel(e,t="#fff3e0",i="#FF9800"){return`<div style="padding: 15px; background-color: ${t}; border: 2px solid ${i}; border-radius: 8px; white-space: pre-wrap; line-height: 1.75;">${Utils.escapeHTML(e||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>`},_collectIncidentExportImages(e){const t=[],i=a=>{const n=String(a||"").trim();n&&!t.includes(n)&&t.push(n)};return Array.isArray(e?.attachments)&&e.attachments.forEach(a=>{t.length>=2||!a||!(a.type?.startsWith("image/")||a.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i))||i(a.directLink||a.shareableLink||a.cloudLink?.url||a.data||a.url||"")}),t.length<2&&e?.image&&i(e.image),t.slice(0,2)},_buildIncidentReportImagesSection(e,t="6"){if(!Array.isArray(e)||!e.length)return"";const i="display: inline-block; width: 48%; max-width: 360px; margin: 1%; vertical-align: top; text-align: center;",a="width: 100%; height: 300px; border: 2px solid #1565C0; border-radius: 12px; padding: 8px; background: #f8fafc; box-shadow: 0 4px 12px rgba(15,23,42,0.08); display: flex; align-items: center; justify-content: center; overflow: hidden;",n="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;";return`
            <div style="margin-bottom: 30px;">
                ${this._buildPrintSectionHeading(t,"\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0631\u0641\u0642\u0629","#1565C0","#2196F3")}
                <div style="text-align: center; margin: 10px 0; direction: rtl; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
                    ${e.map((o,s)=>`
                            <div style="${i}">
                                <div style="${a}">
                                <img src="${this.convertGoogleDriveLinkToPrintable(o)}" alt="\u0635\u0648\u0631\u0629 ${s+1}" style="${n}" onerror="this.parentElement.innerHTML='<div style=\\'color:#94a3b8;font-size:14px;\\'>\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629</div>';">
                                </div>
                            <div style="margin-top: 10px; font-size: 13px; color: #475569; font-weight: 600;">\u0635\u0648\u0631\u0629 ${s+1}</div>
                            </div>
                        `).join("")}
                </div>
                    </div>
                `},_buildIncidentReportActionPlanSection(e,t="5"){if(!Array.isArray(e)||!e.length)return"";const i=n=>n==="completed"?"\u062A\u0645 \u0627\u0644\u0625\u0646\u062C\u0627\u0632":n==="in_progress"?"\u062A\u062D\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"\u062C\u0627\u0631\u064D",a=e.map(n=>`
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(n.actionType==="corrective"?"\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A":n.actionType==="preventive"?"\u0625\u062C\u0631\u0627\u0621 \u0648\u0642\u0627\u0626\u064A":n.actionType||"\u0625\u062C\u0631\u0627\u0621")}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(n.description||n.correctiveAction||"")}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${Utils.escapeHTML(n.owner||n.responsibleName||"")}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${n.dueDate||n.plannedDate?this._formatIncidentPrintDate(n.dueDate||n.plannedDate):""}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${n.closedDate?this._formatIncidentPrintDate(n.closedDate):""}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${Utils.escapeHTML(i(n.status))}</td>
                    </tr>
                `).join("");return`
            <div style="margin-bottom: 30px;">
                ${this._buildPrintSectionHeading(t,"\u062E\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629","#2E7D32","#4CAF50")}
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <thead>
                        <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: right;">\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: right;">\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u063A\u0644\u0627\u0642</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                    <tbody>${a}</tbody>
                    </table>
            </div>
        `},_parseIncidentInvestigationSummary(e){if(!e?.investigation)return null;if(typeof e.investigation=="object")return e.investigation;const t=String(e.investigation).trim();if(!t)return null;if(t.startsWith("{")||t.startsWith("["))try{return JSON.parse(t)}catch{}return this._parseInvestigationSummaryText(t)},_parseInvestigationSummaryText(e){const t={description:""},i={"\u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"investigationNumber","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"investigationDateTime","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B":"incidentDateTime",\u0627\u0644\u0645\u0635\u0646\u0639:"factoryName",\u0627\u0644\u0645\u0648\u0642\u0639:"locationName",\u0627\u0644\u062A\u0628\u0639\u064A\u0629:"affectedAffiliation","\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628":"affectedName",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:"affectedJob",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:"affectedDepartment","\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":"riskLevel","\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645":"riskResult",\u0627\u0644\u0648\u0635\u0641:"description","\u0645\u0646\u0647\u062C\u064A\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642":"_rcaMethodLabel","\u0645\u0646\u0647\u062C\u064A\u0629 RCA":"_rcaMethodLabel","\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A":"_rcaRootSummary"};return String(e).split(`
`).forEach(a=>{const n=a.indexOf(":");if(n<0)return;const o=a.slice(0,n).trim(),s=a.slice(n+1).trim();if(!s)return;const r=i[o];r==="_rcaMethodLabel"?(t.rca||(t.rca={}),t.rca.methodLabel=s):r==="_rcaRootSummary"?(t.rca||(t.rca={}),t.rca.rootCauseSummary=s):r&&(t[r]=s)}),t.rca&&typeof InvestigationRCA<"u"&&(t.rca=InvestigationRCA.normalizeRcaForExport(t.rca)),Object.keys(t).length?t:null},_buildInvestigationRcaPrintSection(e,t,i,a={}){if(typeof InvestigationRCA>"u")return"";const n=InvestigationRCA.normalizeRcaForExport(e?.rca);return n?.method?InvestigationRCA.buildPrintSection(n,{includeStyles:a.includeRcaStyles===!0}):e?.rootCauseSummary||t?.rootCause?`
                <div class="inv-print-section rca-print-section inv-s-rca" style="background:linear-gradient(135deg,#f5f3ff 0%,#fff 100%);border:2px solid #7c3aed;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
                    <h3 style="color:#5b21b6;border-color:#7c3aed;font-size:18px;font-weight:700;margin:0 0 14px;padding-bottom:10px;border-bottom:3px solid #7c3aed;">5.5) \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</h3>
                    <div class="rca-root-box" style="padding:16px 18px;border-radius:10px;border:2px solid #10b981;background:linear-gradient(135deg,#ecfdf5,#d1fae5);">
                        <div style="font-weight:800;color:#047857;margin-bottom:8px;">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</div>
                        <div style="white-space:pre-wrap;line-height:1.75;">${i(e.rootCauseSummary||t.rootCause)}</div>
                    </div>
                </div>`:""},_getInvestigationMethodologyMeta(e){if(typeof InvestigationRCA>"u")return{label:"\u2014",reference:"",hasMethod:!1};const t=InvestigationRCA.normalizeRcaForExport(e?.rca);if(!t?.method)return{label:"\u2014",reference:"",hasMethod:!1};const i=InvestigationRCA.METHODS[t.method];return{label:t.methodLabel||i?.label||t.method,reference:i?.reference||"",hasMethod:!0}},_findRegistryEntryForIncident(e){return e&&(this.registryData||[]).find(t=>t.incidentId===e)||null},_formatIncidentPrintDateOnly(e){if(!e)return"\u2014";try{const t=new Date(e);return isNaN(t.getTime())?String(e):t.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"})}catch{return String(e)}},_buildIncidentPrintBadge(e,t,i){return e?`<span style="display:inline-block;padding:4px 14px;border-radius:999px;background:${t};color:${i};font-weight:700;font-size:13px;">${Utils.escapeHTML(String(e))}</span>`:"\u2014"},_hasInvestigationExportData(e){return e?!!(e.investigationNumber||e.description||e.rca?.method||e.rootCauseSummary||Array.isArray(e.actionPlan)&&e.actionPlan.length||e.riskResult||e.riskLevel):!1},_buildIncidentReportRegistrySection(e,t="5"){if(!e)return"";const i=a=>Utils.escapeHTML(String(a??"\u2014"));return this._buildInvestigationFormPrintSection("inv-s7",t,"\u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B",`
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0633\u0644\u0633\u0644",i(e.sequentialNumber),"#FFC107",!0)}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0635\u0646\u0639",i(e.factory),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B",i(e.incidentLocation),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B",this._formatIncidentPrintDateOnly(e.incidentDate),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u064A\u0648\u0645 \u0627\u0644\u062D\u0627\u062F\u062B",i(e.incidentDay),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B",i(e.incidentTime),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0648\u0631\u062F\u064A\u0629",i(e.shift),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641",i(e.employeeCode),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",i(e.employeeName),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",i(e.employeeJob),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",i(e.employeeDepartment),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628",i(e.injuredPart),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629",i(e.equipmentCause),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629",this._formatIncidentPrintDateOnly(e.leaveStartDate),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644",this._formatIncidentPrintDateOnly(e.returnToWorkDate),"#FFC107")}
                ${this._buildInvestigationFormPrintField("\u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629",e.totalLeaveDays!=null?`${e.totalLeaveDays} \u064A\u0648\u0645`:"\u2014","#FFC107")}
                ${this._buildInvestigationFormPrintField("\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u062C\u0644",this._buildIncidentPrintBadge(e.status,"#e0e7ff","#3730a3"),"#FFC107")}
            </div>
            ${e.incidentDetails?`
            <div style="margin-top:14px;">
                <div class="inv-field-label">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B (\u0627\u0644\u0633\u062C\u0644)</div>
                <div class="inv-text-panel" style="border-color:#FFC107;">${i(e.incidentDetails)}</div>
            </div>`:""}
        `)},buildRegistryEntryReportPrintContent(e){const t=s=>Utils.escapeHTML(String(s??"")),i=this._buildInvestigationFormPrintSection("inv-s1","1","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629",`
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0633\u0644\u0633\u0644",t(e.sequentialNumber),"#2196F3",!0)}
                ${this._buildInvestigationFormPrintField("\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B",t(e.incidentType),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0627\u062F\u062B",this._formatIncidentPrintDateOnly(e.incidentDate),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B",t(e.incidentTime),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0648\u0631\u062F\u064A\u0629",t(e.shift),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u062D\u0627\u0644\u0629",this._buildIncidentPrintBadge(e.status,"#e0e7ff","#3730a3"),"#2196F3")}
            </div>
        `),a=this._buildInvestigationFormPrintSection("inv-s2","2","\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0648\u0638\u0641",`
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0635\u0646\u0639",t(e.factory),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B",t(e.incidentLocation),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641",t(e.employeeCode),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",t(e.employeeName),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",t(e.employeeJob),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",t(e.employeeDepartment),"#9C27B0")}
            </div>
        `),n=this._buildInvestigationFormPrintSection("inv-s4","3","\u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0629",`
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u0635\u0627\u0628",t(e.injuredPart),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629",t(e.equipmentCause),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629",this._formatIncidentPrintDateOnly(e.leaveStartDate),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644",this._formatIncidentPrintDateOnly(e.returnToWorkDate),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629",e.totalLeaveDays!=null?`${e.totalLeaveDays} \u064A\u0648\u0645`:"\u2014","#E91E63")}
            </div>
        `),o=this._buildInvestigationFormPrintSection("inv-s3","4","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B",`
            <div class="inv-text-panel" style="border-color:#FF9800;">${t(e.incidentDetails||"\u2014")}</div>
            ${e.injuryDescription?`
            <div style="margin-top:14px;">
                <div class="inv-field-label">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</div>
                <div class="inv-text-panel" style="border-color:#E91E63;">${t(e.injuryDescription)}</div>
            </div>`:""}
            ${e.actionsTaken?`
            <div style="margin-top:14px;">
                <div class="inv-field-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</div>
                <div class="inv-text-panel" style="border-color:#009688;">${t(e.actionsTaken)}</div>
            </div>`:""}
        `);return`
            ${this._getInvestigationFormPrintStyles()}
            <div class="inv-print-wrap">
                ${i}
                ${a}
                ${n}
                ${o}
            </div>
        `},buildIncidentReportPrintContent(e,t={}){const i=b=>Utils.escapeHTML(String(b??"")),a=this._findRegistryEntryForIncident(e.id),n=this.resolveIncidentInjuredPart(e),o=[e.siteName||e.factory||a?.factory,e.sublocationName||e.sublocation||a?.incidentLocation,e.location].filter(b=>b&&String(b).trim()).join(" \u2014 ")||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s=this._buildIncidentPrintBadge(e.severity,"#fee2e2","#991b1b"),r=this._buildIncidentPrintBadge(e.status,"#e0e7ff","#3730a3");let d=1;const l=()=>String(d++),c=this._buildInvestigationFormPrintSection("inv-s1",l(),"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629",`
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField("\u0643\u0648\u062F \u0627\u0644\u062D\u0627\u062F\u062B / ISO",i(e.isoCode||e.id),"#2196F3",!0)}
                ${this._buildInvestigationFormPrintField("\u0631\u0642\u0645 \u0627\u0644\u0625\u062E\u0637\u0627\u0631",i(e.notificationNumber),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0642\u0631\u064A\u0631",i(e.title),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B",this._formatIncidentPrintDate(e.date||e.incidentDateTime),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B",i(e.incidentType),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629",s,"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0627\u062F\u062B",r,"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621",this._formatIncidentPrintDate(e.createdAt),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B",this._formatIncidentPrintDate(e.updatedAt),"#2196F3")}
            </div>
        `),u=this._buildInvestigationFormPrintSection("inv-s2",l(),"\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062C\u0647\u0629",`
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639",i(e.siteName||e.factory||a?.factory),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A",i(e.sublocationName||e.sublocation),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A",i(o),"#9C27B0")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645",i(e.department||a?.employeeDepartment),"#9C27B0")}
            </div>
        `),p=this._buildInvestigationFormPrintSection("inv-s4",l(),"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0648\u0627\u0644\u0645\u062A\u0636\u0631\u0631",`
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0628\u0644\u0651\u0650\u063A",i(e.reportedBy),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A",i(e.employeeCode||e.employeeNumber||a?.employeeCode),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0645\u062A\u0636\u0631\u0631",i(e.affectedName||a?.employeeName),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u062A\u0636\u0631\u0631",i(e.affectedJob||e.affectedRole||a?.employeeJob),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u062C\u0647\u0629 \u0627\u0644\u0645\u062A\u0636\u0631\u0631",i(e.affectedDepartment||a?.employeeDepartment),"#E91E63")}
            </div>
        `),m=[n&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"?this._buildInvestigationFormPrintField("\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631",i(n),"#E91E63"):"",e.injuryDescription?this._buildInvestigationFormPrintField("\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629",i(e.injuryDescription),"#E91E63"):"",e.losses||a?.losses?this._buildInvestigationFormPrintField("\u0627\u0644\u062E\u0633\u0627\u0626\u0631",i(e.losses||a?.losses),"#E91E63"):"",e.actionsTaken||a?.actionsTaken?this._buildInvestigationFormPrintField("\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629",i(e.actionsTaken||a?.actionsTaken),"#E91E63"):""].filter(Boolean).join(""),f=m?this._buildInvestigationFormPrintSection("inv-s4",l(),"\u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0648\u0627\u0644\u062E\u0633\u0627\u0626\u0631 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",`
            <div class="inv-field-grid" style="grid-template-columns: 1fr; gap: 14px;">${m}</div>
        `):"",g=this._buildInvestigationFormPrintSection("inv-s3",l(),"\u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u062F\u062B",`
            <div class="inv-text-panel" style="border-color:#FF9800;">${i(e.description||a?.incidentDetails||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>
        `),x=[];e.rootCause&&x.push(`
                <div style="margin-bottom:14px;">
                    <div class="inv-field-label">\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${i(e.rootCause)}</div>
                </div>
            `),e.correctiveAction&&x.push(`
                <div style="margin-bottom:14px;">
                    <div class="inv-field-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${i(e.correctiveAction)}</div>
                </div>
            `),e.preventiveAction&&x.push(`
                <div>
                    <div class="inv-field-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${i(e.preventiveAction)}</div>
                </div>
            `);const w=x.length?this._buildInvestigationFormPrintSection("inv-s5",l(),"\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629",x.join("")):"",y=a?this._buildIncidentReportRegistrySection(a,l()):"",A=Array.isArray(e.actionPlan)&&e.actionPlan.length>0;let I="";if(A){const b=M=>M==="completed"?"\u062A\u0645 \u0627\u0644\u0625\u0646\u062C\u0627\u0632":M==="in_progress"?"\u062A\u062D\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"\u062C\u0627\u0631\u064D",T=e.actionPlan.map(M=>`
                <tr>
                    <td style="padding:10px;border:1px solid #c8e6c9;">${i(M.actionType==="corrective"?"\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A":M.actionType==="preventive"?"\u0625\u062C\u0631\u0627\u0621 \u0648\u0642\u0627\u0626\u064A":M.actionType||"\u0625\u062C\u0631\u0627\u0621")}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;">${i(M.description||M.correctiveAction||"")}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${i(M.owner||M.responsibleName||"")}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${M.dueDate||M.plannedDate?this._formatIncidentPrintDateOnly(M.dueDate||M.plannedDate):"\u2014"}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${i(b(M.status))}</td>
                </tr>
            `).join("");I=this._buildInvestigationFormPrintSection("inv-s6",l(),"\u062E\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629",`
                <div class="inv-inner-white" style="border-color:#4CAF50;">
                    <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                        <thead>
                            <tr style="background:linear-gradient(135deg,#388E3C 0%,#4CAF50 100%);color:white;">
                                <th style="padding:12px;text-align:right;border:1px solid #2E7D32;">\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                                <th style="padding:12px;text-align:right;border:1px solid #2E7D32;">\u0627\u0644\u0648\u0635\u0641</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody style="background:#f9fff9;">${T}</tbody>
                    </table>
                </div>
            `)}const v=this._collectIncidentExportImages(e);let $="";if(v.length){const b="display:inline-block;width:48%;max-width:360px;margin:1%;vertical-align:top;text-align:center;",T="width:100%;height:280px;border:2px solid #1565C0;border-radius:12px;padding:8px;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;",M="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;";$=this._buildInvestigationFormPrintSection("inv-s1",l(),"\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0631\u0641\u0642\u0629",`
                <div style="text-align:center;display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
                    ${v.map((R,D)=>`
                        <div style="${b}">
                            <div style="${T}">
                                <img src="${this.convertGoogleDriveLinkToPrintable(R)}" alt="\u0635\u0648\u0631\u0629 ${D+1}" style="${M}" onerror="this.parentElement.innerHTML='<div style=\\'color:#94a3b8;font-size:14px;\\'>\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629</div>';">
                            </div>
                            <div style="margin-top:8px;font-size:13px;color:#475569;font-weight:600;">\u0635\u0648\u0631\u0629 ${D+1}</div>
                        </div>
                    `).join("")}
                </div>
            `)}let F="";if(t.includeInvestigation!==!1){const{investigationData:b}=this._resolveInvestigationDataForExport(e.id);this._hasInvestigationExportData(b)&&(F=`
                    <div style="page-break-before:always;margin-top:28px;padding-top:12px;border-top:4px solid #1565C0;">
                        <h2 style="text-align:center;color:#1565C0;margin:0 0 20px;font-size:22px;font-weight:800;">\u0645\u0644\u062D\u0642: \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B</h2>
                    </div>
                    ${this.buildInvestigationPrintContent(e,b,{includeStyles:!1})}
                `)}return`
            ${this._getInvestigationFormPrintStyles()}
            <div class="inv-print-wrap">
                ${c}
                ${u}
                ${p}
                ${f}
                ${g}
                ${w}
                ${y}
                ${I}
                ${$}
                ${F}
            </div>
        `},_buildIncidentReportHtml(e){const t=this.buildIncidentReportPrintContent(e),i=e.isoCode||e.notificationNumber||e.id||`INC-${new Date().toISOString().slice(0,10)}`;return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B \u2013 Incident Report",t,!1,!1,{version:AppState?.companySettings?.formVersion||"1.0",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B",titleEn:"Incident Report",includeQRCode:!1,"\u0645\u0631\u062C\u0639 \u0627\u0644\u062D\u0627\u062F\u062B":e.id||"\u2014"},e.createdAt||e.date,e.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${t}</body></html>`},_buildRegistryEntryReportHtml(e){const t=this.buildRegistryEntryReportPrintContent(e),i=`REG-${e.sequentialNumber||e.id}`;return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u062F\u062B \u2013 Incident Registry Report",t,!1,!1,{version:AppState?.companySettings?.formVersion||"1.0",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u062F\u062B",titleEn:"Incident Registry Report",includeQRCode:!1},e.incidentDate,e.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${t}</body></html>`},async _exportIncidentReportPdf(e){const t=AppState.appData.incidents.find(i=>i.id===e);if(!t)return Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B...");const i=this._buildIncidentReportHtml(t),a=t.isoCode||t.notificationNumber||t.id,n=`\u062A\u0642\u0631\u064A\u0631-\u062D\u0627\u062F\u062B-${String(a).replace(/[^\w\u0600-\u06FF.-]/g,"_")}`,o=await this._downloadHtmlReportAsPdf(i,n);return Loading.hide(),o?(Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D"),!0):(this._openIncidentPrintableHtml(i,"\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),!0)}catch(i){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0627\u062F\u062B:",i),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+i.message),!1}},async exportRegistryEntryPDF(e){const t=this.registryData.find(a=>a.id===e);if(!t)return Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;const i=t.incidentId?AppState.appData.incidents.find(a=>a.id===t.incidentId):null;try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u062C\u0644...");const a=i?this._buildIncidentReportHtml(i):this._buildRegistryEntryReportHtml(t),n=t.sequentialNumber||t.id,o=`\u0633\u062C\u0644-\u062D\u0627\u062F\u062B-${String(n).replace(/[^\w\u0600-\u06FF.-]/g,"_")}`,s=await this._downloadHtmlReportAsPdf(a,o);return Loading.hide(),s?(Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),!0):(this._openIncidentPrintableHtml(a,"\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),!0)}catch(a){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u062C\u0644:",a),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message),!1}},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(i=>{const a=Array.from(document.querySelectorAll("script[src]")).find(o=>String(o.src||"").includes(e));if(a){const o=()=>i(!!t());a.addEventListener("load",o,{once:!0}),setTimeout(o,4e3);return}const n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>i(!!t()),n.onerror=()=>i(!1),document.head.appendChild(n)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("inc-cairo-font-link")){const e=document.createElement("link");e.id="inc-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_getIncidentReportPdfA4Styles(){return`
<style id="incidents-pdf-a4-layout">
    @page { size: A4 portrait; margin: 0; }
    html, body {
        width: 210mm;
        max-width: 210mm;
        margin: 0 auto !important;
        padding: 0 !important;
        background: #ffffff !important;
        box-sizing: border-box;
    }
    .report-wrapper {
        width: 210mm !important;
        max-width: 210mm !important;
        min-height: auto !important;
        margin: 0 auto !important;
        padding: 8mm 10mm !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        box-sizing: border-box !important;
    }
    .report-body, .inv-print-wrap {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }
    .inv-print-section, .rca-print-section {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        break-inside: avoid;
        page-break-inside: avoid;
    }
    .inv-field-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    .inv-type-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    table { width: 100% !important; max-width: 100% !important; table-layout: fixed !important; }
    .report-header {
        break-inside: avoid;
        page-break-inside: avoid;
    }
    img { max-width: 100% !important; height: auto !important; }
</style>`},_prepareArabicPdfHtml_(e){const t=`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="incidents-arabic-pdf-fix">
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
</style>${this._getIncidentReportPdfA4Styles()}`,i=this._stripScriptsFromHtml_(e);return i?i.includes("</head>")?i.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${i}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const i=t.windowWidth||Math.max(e.scrollWidth||0,794),a={scale:2.5,backgroundColor:"#ffffff",logging:!1,width:i,windowWidth:i,windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},n=[{...a,useCORS:!0,allowTaint:!1},{...a,useCORS:!0,allowTaint:!0},{...a,useCORS:!1,allowTaint:!0}];let o=null;for(let s=0;s<n.length;s++)try{const r=await html2canvas(e,n[s]);if(r&&r.width>0&&r.height>0)return r}catch(r){o=r}if(o)throw o;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const a=this._prepareArabicPdfHtml_(e),n=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,o=document.createElement("iframe");o.setAttribute("aria-hidden","true"),o.style.cssText="position:fixed;left:-100000px;top:0;width:794px;min-height:1123px;border:0;visibility:hidden;",document.body.appendChild(o);try{o.srcdoc=a,await new Promise(u=>{o.onload=u,o.onerror=u,setTimeout(u,6e3)});const s=o.contentDocument||o.contentWindow?.document;if(!s)return!1;await this._waitArabicPdfFontsReady_(s);const r=Array.from(s.images||[]);await Promise.all(r.map(u=>new Promise(p=>{if(u.complete)return p();u.onload=p,u.onerror=p,setTimeout(p,3e3)})));const d=s.querySelector(".report-wrapper")||s.body;if(!d)return!1;const l=await this._captureHtmlToCanvas_(d,{windowWidth:794});if(!l)return!1;const c=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return c?(Utils.PdfExport.appendCanvasAsPdfPages(c,l,{marginMm:4}),Utils.PdfExport.savePdf(c,n),!0):!1}catch(s){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",s),!1}finally{o.remove()}},_buildInvestigationDataFromIncident(e,t={}){const i={...t};if(i.investigationNumber||(i.investigationNumber=e.isoCode?`INV-${String(e.isoCode).replace(/^ISO-?/i,"")}`:`INV-${String(e.id||"").substring(0,8)}`),i.investigationDateTime||(i.investigationDateTime=e.updatedAt||e.createdAt),i.incidentDateTime||(i.incidentDateTime=e.date||e.incidentDateTime),i.factoryName||(i.factoryName=e.siteName||e.factory),i.locationName||(i.locationName=[e.sublocationName||e.sublocation,e.location].filter(a=>a&&String(a).trim()).join(" \u2014 ")||e.location),i.description||(i.description=e.description),i.affectedName||(i.affectedName=e.affectedName),i.affectedJob||(i.affectedJob=e.affectedJob||e.affectedRole),i.affectedDepartment||(i.affectedDepartment=e.affectedDepartment),!i.unsafeBehavior&&e.unsafeBehavior&&(i.unsafeBehavior=e.unsafeBehavior),!i.unsafeCondition&&e.unsafeCondition&&(i.unsafeCondition=e.unsafeCondition),!i.riskResult&&(e.riskResult||e.riskLevel)&&(i.riskResult=e.riskResult||e.riskLevel),!i.riskExplanation&&e.rootCause&&(i.riskExplanation=e.rootCause),!i.actionPlan?.length&&Array.isArray(e.actionPlan)&&e.actionPlan.length&&(i.actionPlan=e.actionPlan.map(a=>({correctiveAction:a.correctiveAction||a.description||"",plannedDate:a.plannedDate||a.dueDate||"",responsibleName:a.responsibleName||a.owner||"",responsibleDepartment:a.responsibleDepartment||"",responsibleDate:a.responsibleDate||"",followUpName:a.followUpName||"",followUpDepartment:a.followUpDepartment||"",followUpDate:a.followUpDate||""}))),!i.incidentTypes?.length&&e.incidentType&&(i.incidentTypes=[e.incidentType]),!i.rca?.method&&t.rca?.method)i.rca=t.rca;else if(!i.rca?.method){const a=this._parseIncidentInvestigationSummary(e);a?.rca?.method&&(i.rca=a.rca)}return i},_collectInvestigationRcaData(){const e=document.getElementById("investigation-rca-wizard");if(!e||typeof InvestigationRCA>"u")return null;try{return InvestigationRCA.collect(e)}catch(t){return Utils.safeWarn("\u062A\u0639\u0630\u0651\u0631 \u062C\u0645\u0639 \u0628\u064A\u0627\u0646\u0627\u062A RCA \u0644\u0644\u062A\u0635\u062F\u064A\u0631:",t),null}},_mergeInvestigationRcaForExport(e,t){const i=e?{...e}:{};let n=(this._parseIncidentInvestigationSummary(t)||{}).rca;if(typeof n=="string")try{n=JSON.parse(n)}catch{n=null}let o=i.rca;if(typeof o=="string")try{o=JSON.parse(o)}catch{o=null}const s=this._collectInvestigationRcaData();if(s?.method?i.rca=s:o?.method?i.rca=o:n?.method?i.rca=n:s&&Object.keys(s.stepsData||{}).length?i.rca=s:n&&(i.rca=n),!i.rootCauseSummary&&i.rca?.rootCauseSummary&&(i.rootCauseSummary=i.rca.rootCauseSummary),!i.riskExplanation&&i.rca?.rootCauseSummary&&(i.riskExplanation=i.rca.rootCauseSummary),typeof InvestigationRCA<"u"&&i.rca){const r=InvestigationRCA.normalizeRcaForExport(i.rca);r&&(i.rca=r)}return i},_resolveInvestigationDataForExport(e){const t=AppState.appData.incidents.find(a=>a.id===e);if(!t)return{incident:null,investigationData:null};let i=this.getInvestigationFormData();return i||(i=this._parseIncidentInvestigationSummary(t)||{}),!i.investigationNumber&&!i.description&&(i=this._buildInvestigationDataFromIncident(t,i)),i=this._mergeInvestigationRcaForExport(i,t),{incident:t,investigationData:i}},_buildInvestigationReportHtml(e,t){const i=this.buildInvestigationPrintContent(e,t),a=t.investigationNumber||e.isoCode||`INV-${String(e.id||"").substring(0,8)}`;return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,"\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B \u2013 Incident Investigation",i,!1,!1,{version:AppState?.companySettings?.formVersion||"1.0",titleAr:"\u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u062D\u0627\u062F\u062B",titleEn:"Incident Investigation",includeQRCode:!1,"\u0645\u0631\u062C\u0639 \u0627\u0644\u062D\u0627\u062F\u062B":e.id||"\u2014"},e.createdAt,t.updatedAt||e.updatedAt):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${i}</body></html>`},async _exportInvestigationReportPdf(e){const{incident:t,investigationData:i}=this._resolveInvestigationDataForExport(e);if(!t)return Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;if(!i.investigationNumber&&!i.description)return Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),!1;try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642...");const a=this._buildInvestigationReportHtml(t,i),n=i.investigationNumber||t.isoCode||t.id,o=`\u062A\u062D\u0642\u064A\u0642-\u062D\u0627\u062F\u062B-${String(n).replace(/[^\w\u0600-\u06FF.-]/g,"_")}`,s=await this._downloadHtmlReportAsPdf(a,o);return Loading.hide(),s?(Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"),!0):(this._openIncidentPrintableHtml(a,"\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),!0)}catch(a){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",a),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message),!1}},_openIncidentPrintableHtml(e,t){const i=new Blob([e],{type:"text/html;charset=utf-8"}),a=URL.createObjectURL(i),n=window.open(a,"_blank");return n?(n.onload=()=>{setTimeout(()=>{n.print(),setTimeout(()=>{URL.revokeObjectURL(a),Loading.hide(),Notification.success(t||"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},800)},500)},!0):(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),!1)},async exportPDF(e){await this._exportIncidentReportPdf(e)},applyPermissions(){const e=this.isAdmin(),t=this.canDeleteIncident();if(e)document.querySelectorAll('[onclick*="editIncident"]').forEach(a=>{a.style.display=""});else{document.querySelectorAll('[onclick*="editIncident"]').forEach(n=>{n.style.display="none"});const a=document.getElementById("incident-location-toggle");a&&(a.style.display="none")}document.querySelectorAll('[onclick*="deleteIncident"]').forEach(a=>{a.style.display=t?"":"none"});const i=document.getElementById("add-action-plan-row");i&&(e||AppState.currentUser?.permissions&&AppState.currentUser.permissions["incidents-add-actions"]===!0||(i.disabled=!0,i.title="\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0631\u0627\u0621\u0627\u062A"))},filterIncidents(e="",t=""){let a=AppState.appData.incidents||[];if(e){const o=e.toLowerCase();a=a.filter(s=>s.title?.toLowerCase().includes(o)||this.getIncidentListLocation(s).toLowerCase().includes(o)||this.getIncidentListReporter(s).toLowerCase().includes(o)||this.getIncidentAffectedPartyName(s).toLowerCase().includes(o)||s.isoCode?.toLowerCase().includes(o))}t&&(a=a.filter(o=>this.getIncidentDisplayStatus(o)===t||o.status===t));const n=document.querySelector("#incidents-table-container tbody");n&&(n.innerHTML=a.length===0?'<tr><td colspan="10" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td></tr>':a.map(o=>this.renderIncidentsListRow(o,!0)).join(""))},setupAffectedAutocomplete(e=null){setTimeout(()=>{typeof EmployeeHelper<"u"&&(EmployeeHelper.setupEmployeeCodeSearch("incident-affected-code","incident-affected-name",i=>{if(!i)return;const a=document.getElementById("incident-affected-name"),n=document.getElementById("incident-affected-job"),o=document.getElementById("incident-affected-department"),s=document.getElementById("incident-affected-contact"),r=document.getElementById("incident-affected-type");r&&(r.value="employee"),a&&(a.value=i.name||i.fullName||""),n&&(n.value=i.position||i.jobTitle||""),o&&(o.value=i.department||i.section||""),s&&(s.value=i.phone||i.mobile||i.email||"")}),EmployeeHelper.setupAutocomplete("incident-affected-name",i=>{if(!i)return;const a=document.getElementById("incident-affected-code"),n=document.getElementById("incident-affected-job"),o=document.getElementById("incident-affected-department"),s=document.getElementById("incident-affected-contact"),r=document.getElementById("incident-affected-type");r&&(r.value="employee"),a&&(a.value=i.code||""),n&&(n.value=i.position||i.jobTitle||""),o&&(o.value=i.department||i.section||""),s&&(s.value=i.phone||i.mobile||i.email||"")}));const t=e?.affectedType||"employee";this.handleAffectedTypeChange(t)},200)},handleAffectedTypeChange(e="employee"){const t=document.getElementById("incident-affected-code"),i=document.getElementById("incident-affected-name"),a=document.getElementById("incident-affected-job"),n=document.getElementById("incident-affected-department"),o=document.getElementById("incident-affected-contact");i&&(e==="employee"?(t&&(t.disabled=!1,t.placeholder="\u0627\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),i.readOnly=!1,i.placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F",a&&(a.readOnly=!0),n&&(n.readOnly=!0)):(t&&(t.disabled=!0,t.value="",t.placeholder="\u0644\u0627 \u064A\u062A\u0637\u0644\u0628 \u0643\u0648\u062F\u0627\u064B"),i.readOnly=!1,a&&(a.readOnly=!1),n&&(n.readOnly=!1)),e!=="employee"&&(a&&!a.value&&(a.value=""),n&&!n.value&&(n.value=""),o&&!o.value&&(o.value="")))},populateActionPlanRows(e=[]){const t=document.getElementById("incident-action-plan-body");if(t){if(t.innerHTML="",!Array.isArray(e)||e.length===0){this.addActionPlanRow();return}e.forEach(i=>this.addActionPlanRow(i))}},addActionPlanRow(e={}){const t=document.getElementById("incident-action-plan-body");if(!t)return;const i=e.id||Utils.generateId("ACTPLAN"),a=document.createElement("tr");a.className="incident-action-row",a.setAttribute("data-row-id",i),a.innerHTML=`
            <td style="padding: 8px;">
                <select class="form-input" name="action-type" style="width: 100%;">
                    <option value="corrective" ${e.actionType==="corrective"?"selected":""}>\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A</option>
                    <option value="preventive" ${e.actionType==="preventive"?"selected":""}>\u0625\u062C\u0631\u0627\u0621 \u0648\u0642\u0627\u0626\u064A</option>
                </select>
            </td>
            <td style="padding: 8px;">
                <input type="text" class="form-input" name="action-description" value="${Utils.escapeHTML(e.description||"")}" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0625\u062C\u0631\u0627\u0621" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="text" class="form-input" name="action-owner" value="${Utils.escapeHTML(e.owner||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="date" class="form-input" name="action-due" value="${this.safeDateToISOString(e.dueDate,10)}" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="date" class="form-input" name="action-closed" value="${this.safeDateToISOString(e.closedDate,10)}" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <select class="form-input" name="action-status" style="width: 100%;">
                    <option value="pending" ${e.status==="pending"?"selected":""}>\u062C\u0627\u0631</option>
                    <option value="in_progress" ${e.status==="in_progress"?"selected":""}>\u062A\u062D\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                    <option value="completed" ${e.status==="completed"?"selected":""}>\u062A\u0645 \u0625\u0646\u062C\u0627\u0632\u0647</option>
                </select>
            </td>
            <td style="padding: 8px; text-align: center;">
                <div class="flex items-center justify-center gap-2">
                    <button type="button" class="btn-icon btn-icon-primary" data-edit-action="${i}" title="\u062A\u0639\u062F\u064A\u0644">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn-icon btn-icon-danger" data-remove-action="${i}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        `,t.appendChild(a);const n=a.querySelector(`[data-remove-action="${i}"]`);n&&n.addEventListener("click",()=>this.removeActionPlanRow(i)),a.scrollIntoView({behavior:"smooth",block:"nearest"})},removeActionPlanRow(e){const t=document.getElementById("incident-action-plan-body");if(!t)return;if(t.querySelectorAll(".incident-action-row").length<=1){Notification.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u062E\u064A\u0631 \u0645\u0646 \u062E\u0637\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A.");return}const a=t.querySelector(`.incident-action-row[data-row-id="${e}"]`);a&&a.remove()},collectActionPlanRows(){return Array.from(document.querySelectorAll("#incident-action-plan-body .incident-action-row")).map(t=>{const i=t.getAttribute("data-row-id")||Utils.generateId("ACTPLAN"),a=t.querySelector('[name="action-type"]')?.value||"corrective",n=t.querySelector('[name="action-description"]')?.value?.trim()||"",o=t.querySelector('[name="action-owner"]')?.value?.trim()||"",s=t.querySelector('[name="action-due"]')?.value||"",r=t.querySelector('[name="action-closed"]')?.value||"",d=t.querySelector('[name="action-status"]')?.value||"pending";return{id:i,actionType:a,description:n,owner:o,dueDate:s&&this.safeDateToISOString(s)||null,closedDate:r&&this.safeDateToISOString(r)||null,status:d,updatedAt:new Date().toISOString()}}).filter(t=>t.description||t.owner||t.dueDate)},async handleAttachmentsChange(e){if(!e||e.length===0)return;const t=Array.from(e),i=[];for(const a of t){if(a.size>5242880){Notification.error(`\u0627\u0644\u0645\u0644\u0641 ${a.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 (5MB)`);continue}i.push(a)}if(i.length!==0){Loading.show("\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A...");try{for(const n of i){const o=await this.readFileAsBase64(n),s=this.normalizeAttachment({id:Utils.generateId("ATT"),name:n.name,type:n.type,data:o,size:Math.round(n.size/1024)});this.currentAttachments.push(s)}this.renderAttachmentsList();const a=document.getElementById("incident-attachments-input");a&&(a.value="")}catch(a){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A: "+a.message)}finally{Loading.hide()}}},async readFileAsBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=n=>i(n),a.readAsDataURL(e)})},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"",i=e.size||(t?Math.round(t.length*3/4/1024):0);return{id:e.id||Utils.generateId("ATT"),name:e.name||"attachment",type:e.type||"application/octet-stream",data:t,size:i,createdAt:e.createdAt||new Date().toISOString()}},renderCloudStorageUploadButtons(e){const t=CloudStorageIntegration?.getAvailableServices()||[];return t.length===0?"":`
            <div class="mt-3 mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
                <label class="block text-xs font-semibold text-gray-700 mb-2">
                    <i class="fas fa-cloud ml-1"></i>
                    \u0631\u0641\u0639 \u0625\u0644\u0649 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u064A
                </label>
                <div class="flex items-center gap-2 flex-wrap">
                    ${t.map(i=>`
                        <button type="button" 
                                class="btn-secondary text-xs px-2 py-1" 
                                id="${e}-cloud-upload-${i}"
                                data-service="${i}"
                                title="\u0631\u0641\u0639 \u0625\u0644\u0649 ${CloudStorageIntegration.getServiceName(i)}">
                            <i class="fas fa-cloud-upload-alt ml-1"></i>
                            ${CloudStorageIntegration.getServiceName(i)}
                        </button>
                    `).join("")}
                </div>
            </div>
        `},async handleCloudUpload(e,t){const i=document.getElementById(`${e}-attachments-input`);if(!i||!i.files||i.files.length===0){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0623\u0648\u0644\u0627\u064B");return}const a=i.files[0];try{const n=await CloudStorageIntegration.uploadFile(t,a,a.name),o={id:Utils.generateId("ATT"),name:a.name,type:a.type,size:Math.round(a.size/1024),cloudLink:{id:n.id,url:n.url,service:n.service,fileName:n.fileName,uploadedAt:n.uploadedAt},isCloud:!0,createdAt:new Date().toISOString()};this.currentAttachments||(this.currentAttachments=[]),this.currentAttachments.push(o),this.renderAttachmentsList(),i.value="",Notification.success(`\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 \u0625\u0644\u0649 ${CloudStorageIntegration.getServiceName(t)} \u0628\u0646\u062C\u0627\u062D`)}catch(n){Utils.safeError("Cloud upload error:",n),Notification.error(n.message||"\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u062D\u0627\u0628\u0629")}},renderAttachmentsList(){const e=document.getElementById("incident-attachments-list");if(e){if(!this.currentAttachments||this.currentAttachments.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0645\u0636\u0627\u0641\u0629.</p>';return}e.innerHTML=this.currentAttachments.map((t,i)=>{const a=t.cloudLink||t.isCloud,n=a?`
                <span class="badge badge-info text-xs">
                    <i class="fas fa-cloud ml-1"></i>
                    ${CloudStorageIntegration?.getServiceName(t.cloudLink?.service)||"\u0633\u062D\u0627\u0628\u064A"}
                </span>
            `:"";return`
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-attachment-index="${i}">
                    <div class="flex items-center gap-2">
                        <i class="fas ${a?"fa-cloud":"fa-paperclip"} text-blue-500"></i>
                        <div>
                            <div class="flex items-center gap-2">
                                <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(t.name||"attachment")}</div>
                                ${n}
                            </div>
                            <div class="text-xs text-gray-500">
                                ${t.size||0} KB
                                ${a&&t.cloudLink?.url?`
                                    <a href="${t.cloudLink.url}" target="_blank" class="text-blue-600 hover:underline mr-2">
                                        <i class="fas fa-external-link-alt ml-1"></i>\u0641\u062A\u062D
                                    </a>
                                `:""}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${a?`
                            <button type="button" class="btn-icon btn-icon-info" title="\u062A\u062D\u0645\u064A\u0644 \u0645\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u0629" data-attachment-cloud-download="${i}">
                                <i class="fas fa-cloud-download-alt"></i>
                            </button>
                        `:""}
                        <button type="button" class="btn-icon btn-icon-success" title="\u062A\u062D\u0645\u064A\u0644" data-attachment-download="${i}">
                            <i class="fas fa-download"></i>
                        </button>
                        <button type="button" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" data-attachment-remove="${i}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `}).join(""),e.querySelectorAll("[data-attachment-remove]").forEach(t=>{t.addEventListener("click",i=>{const a=parseInt(t.getAttribute("data-attachment-remove"),10);this.removeAttachment(a)})}),e.querySelectorAll("[data-attachment-download]").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.getAttribute("data-attachment-download"),10);this.downloadAttachment(i)})}),e.querySelectorAll("[data-attachment-cloud-download]").forEach(t=>{t.addEventListener("click",async()=>{const i=parseInt(t.getAttribute("data-attachment-cloud-download"),10),a=this.currentAttachments?.[i];if(a&&a.cloudLink)try{await CloudStorageIntegration.downloadFile(a.cloudLink),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 \u0628\u0646\u062C\u0627\u062D")}catch(n){Notification.error(n.message||"\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 \u0645\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u0629")}})})}},removeAttachment(e){this.currentAttachments&&(this.currentAttachments.splice(e,1),this.renderAttachmentsList())},downloadAttachment(e){const t=this.currentAttachments?.[e];if(!t||!t.data)return;const i=document.createElement("a");i.href=t.data,i.download=t.name||`attachment-${e+1}`,document.body.appendChild(i),i.click(),setTimeout(()=>i.remove(),0)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(d){return String(d??"")},i='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>'+(e||[]).map(function(d){return'<option value="'+t(d.id)+'">'+t(d.name)+"</option>"}).join(""),a=document.getElementById("incident-location");if(a&&a.tagName==="SELECT"){var n=a.value;a.innerHTML=i,n&&(a.value=n)}var o=document.getElementById("incident-sublocation");if(o&&o.tagName==="SELECT"){var s=(document.getElementById("incident-location")||{}).value,r=this.getPlaceOptions(s);o.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+(r||[]).map(function(d){return'<option value="'+t(d.id)+'">'+t(d.name)+"</option>"}).join("")}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Incidents.refreshSiteDropdowns:",d)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(a=>a.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const a=Permissions.formSettingsState.sites.find(n=>n.id===e);if(a&&Array.isArray(a.places))return a.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const a=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===e);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((o,s)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${s+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const a=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===e);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((o,s)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${s+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},getApprovedContractorOptions(){const e=new Map,t=a=>{const n=String(a||"").trim();n&&e.set(n,n)},i=a=>a?![a.isActive,a.active,a.status].some(o=>{const s=String(o??"").trim().toLowerCase();return s==="inactive"||s==="false"||s==="\u063A\u064A\u0631 \u0646\u0634\u0637"||s==="\u0645\u0639\u0637\u0644"}):!1;return(AppState?.appData?.approvedContractors||[]).forEach(a=>{if(!a||!i(a))return;const n=String(a.status||"approved").trim().toLowerCase();n&&!["approved","active","\u0646\u0634\u0637","\u0645\u0639\u062A\u0645\u062F"].includes(n)||t(a.companyName||a.name)}),(AppState?.appData?.contractors||[]).forEach(a=>{i(a)&&t(a.companyName||a.name||a.company)}),Array.from(e.values()).sort((a,n)=>a.localeCompare(n,"ar"))},buildInvestigationAffectedContractorSelectOptions(e=""){const t=s=>Utils.escapeHTML(String(s??"")),i=String(e||"").trim(),a=this.getApprovedContractorOptions();let n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</option>',o=!1;return a.forEach(s=>{const r=s===i;r&&(o=!0),n+=`<option value="${t(s)}"${r?" selected":""}>${t(s)}</option>`}),i&&!o&&(n+=`<option value="${t(i)}" selected>${t(i)} (\u0645\u062D\u0641\u0648\u0638)</option>`),n},_setInvestigationAffectedFieldLock(e,t){e&&(e.readOnly=!!t,e.style.background=t?"#fff7ed":"",e.style.fontWeight=t?"600":"")},fillInvestigationEmployeeFromCode(e,t={}){const i=e?.querySelector("#investigation-affected-employee-code"),a=e?.querySelector("#investigation-affected-name"),n=e?.querySelector("#investigation-affected-job"),o=e?.querySelector("#investigation-affected-department"),s=e?.querySelector("#investigation-affected-age"),r=e?.querySelector("#investigation-affected-affiliation");if(!i||!a||(r?.value||"")!=="company")return;const d=i.value.trim();if(!d){t.keepExisting||(a.value="",n&&(n.value=""),o&&(o.value=""),s&&(s.value=""));return}const l=this.getEmployeeByCode(d);l?this._applyInvestigationEmployeeToForm(e,l,t):t.silent||(a.value="",n&&(n.value=""),s&&(s.value=""),document.activeElement!==i&&Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F"))},_resolveInvestigationAffectedDepartment(e){const t=e?.querySelector("#investigation-affected-affiliation"),i=e?.querySelector("#investigation-affected-department"),a=e?.querySelector("#investigation-affected-contractor-select");return(t?.value||"")==="contractor"?(a?.value||i?.value||"").trim():(i?.value||"").trim()},updateInvestigationAffectedAffiliationUI(e){if(!e)return;const t=e.querySelector("#investigation-affected-affiliation"),i=e.querySelector("#investigation-affected-code-wrapper"),a=e.querySelector("#investigation-affected-contractor-wrapper"),n=e.querySelector("#investigation-affected-department-wrapper"),o=e.querySelector("#investigation-affected-department-label"),s=e.querySelector("#investigation-affected-employee-code"),r=e.querySelector("#investigation-affected-contractor-select"),d=e.querySelector("#investigation-affected-name"),l=e.querySelector("#investigation-affected-job"),c=e.querySelector("#investigation-affected-department"),u=e.querySelector("#investigation-affected-age"),p=t?.value||"",m=p==="company",f=p==="contractor";i&&(i.style.display=m?"block":"none"),a&&(a.style.display=f?"block":"none"),n&&(n.style.display=f?"none":"block"),s&&(s.required=m,m||(s.value="")),r&&(r.required=f,f||(r.value="")),o&&(o.textContent=m?"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627"),this._setInvestigationAffectedFieldLock(d,m),this._setInvestigationAffectedFieldLock(l,m),this._setInvestigationAffectedFieldLock(u,m),this._setInvestigationAffectedFieldLock(c,!1),m&&this.fillInvestigationEmployeeFromCode(e,{keepExisting:!0,silent:!0})},setupInvestigationAffectedPersonUI(e){if(!e)return;const t=e.querySelector("#investigation-affected-affiliation"),i=e.querySelector("#investigation-affected-employee-code"),a=e.querySelector("#investigation-affected-contractor-select");if(a&&!a.dataset.bound){a.dataset.bound="1";const o=a.value;a.innerHTML=this.buildInvestigationAffectedContractorSelectOptions(o)}const n=()=>this.updateInvestigationAffectedAffiliationUI(e);t&&!t.dataset.bound&&(t.dataset.bound="1",t.addEventListener("change",n)),typeof EmployeeHelper<"u"&&EmployeeHelper.setupEmployeeCodeSearch("investigation-affected-employee-code","investigation-affected-name",o=>{(t?.value||"")!=="company"||!o||this._applyInvestigationEmployeeToForm(e,o)}),i&&!i.dataset.blurBound&&(i.dataset.blurBound="1",i.addEventListener("blur",()=>this.fillInvestigationEmployeeFromCode(e,{keepExisting:!0,silent:!0}))),n()},setupInvestigationFormListeners(e,t,i=!0){const a=this,n=e.querySelector("#investigation-form");if(n&&(n.addEventListener("submit",u=>{if(u.preventDefault(),!i){Notification.warning('\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u062D\u0642\u064A\u0642. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0645\u0639 \u0635\u0644\u0627\u062D\u064A\u0629 "\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u062D\u0642\u064A\u0642" \u0623\u0648 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.');return}this.handleInvestigationSubmit(t)}),!i)){n.querySelectorAll('input, textarea, select, button[type="submit"]').forEach(m=>{m.type!=="button"&&m.id!=="investigation-number"&&(m.disabled=!0)});const p=n.querySelector('button[type="submit"]');p&&(p.disabled=!0,p.classList.add("opacity-50","cursor-not-allowed"))}const o=e.querySelector("#incident-type-nearmiss"),s=e.querySelector("#nearmiss-description-wrapper");o&&s&&(o.addEventListener("change",u=>{s.style.display=u.target.checked?"block":"none"}),s.style.display=o.checked?"block":"none");const r=e.querySelector("#investigation-risk-probability"),d=e.querySelector("#investigation-risk-severity"),l=e.querySelector("#investigation-risk-level"),c=()=>{const u=parseInt(r?.value||0),p=parseInt(d?.value||0);if(u>0&&p>0){const m=u*p;l&&(l.value=m.toString())}else l&&(l.value="")};r&&r.addEventListener("change",c),d&&d.addEventListener("change",c),this.loadInvestigationFormOptions(e),this.setupInvestigationAffectedPersonUI(e),this.bindInvestigationActionPlanPickers(e),this.initInvestigationRcaWizard(e,i)},initInvestigationRcaWizard(e,t=!0){const i=e.querySelector("#investigation-rca-wizard");if(!i||typeof InvestigationRCA>"u"){i&&typeof InvestigationRCA>"u"&&(i.innerHTML='<p class="text-amber-600 text-sm p-4"><i class="fas fa-exclamation-triangle ml-2"></i>\u0645\u0643\u0648\u0651\u0646 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629.</p>');return}const n=e.querySelector("#investigation-form")?.dataset?.incidentId;let o=null;if(n&&AppState?.appData?.incidents){let l=AppState.appData.incidents.find(c=>c.id===n)?.investigation;if(l&&typeof l=="string")try{l=JSON.parse(l)}catch{l={}}o=l?.rca||null}const r=e.querySelector("#investigation-description")?.value||"";InvestigationRCA.render(i,{savedRca:o,defaultDescription:r,canEdit:t}),InvestigationRCA.bindEvents(i,{canEdit:t})},_getInvestigationModalEl(){const e=document.getElementById("investigation-form");return e?e.closest(".modal-overlay")||e.closest(".modal-content")?.parentElement||document.body:document.querySelector(".modal-overlay:has(#investigation-form)")},_collectInvestigationAiContext(e){const t=e||this._getInvestigationModalEl(),i=u=>t?.querySelector(u),a=u=>(i(u)?.value||"").trim(),n={"incident-type-nearmiss":{key:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},"incident-type-property":{key:"property",label:"\u062A\u0644\u0641 \u0645\u0645\u062A\u0644\u0643\u0627\u062A"},"incident-type-injury-no-lost":{key:"injury-no-lost",label:"\u0625\u0635\u0627\u0628\u0629 \u0628\u062F\u0648\u0646 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644"},"incident-type-injury-lost":{key:"injury-lost",label:"\u0625\u0635\u0627\u0628\u0629 \u0645\u0639 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644"},"incident-type-fatality":{key:"fatality",label:"\u0648\u0641\u0627\u0629"}},o=[],s=[];Object.entries(n).forEach(([u,p])=>{i(`#${u}`)?.checked&&(o.push(p.key),s.push(p.label))});const r=i("#investigation-factory"),d=i("#investigation-location"),l=r?.selectedOptions?.[0]?.textContent?.trim()||"",c=d?.selectedOptions?.[0]?.textContent?.trim()||"";return{description:a("#investigation-description"),nearmissDescription:a("#investigation-nearmiss-description"),incidentTypes:o,incidentTypeLabels:s,factoryId:a("#investigation-factory"),factoryName:l,locationId:a("#investigation-location"),locationName:c,location:[l,c].filter(Boolean).join(" \u2014 "),affectedName:a("#investigation-affected-name"),affectedJob:a("#investigation-affected-job"),affectedAge:a("#investigation-affected-age"),affectedDepartment:a("#investigation-affected-department"),injuredPart:a("#investigation-injured-part"),equipmentCause:a("#investigation-equipment-cause"),unsafeBehavior:a("#investigation-unsafe-behavior"),unsafeCondition:a("#investigation-unsafe-condition")}},async suggestInvestigationWithAI(e){const t=this._getInvestigationModalEl();if(!t){Notification.error("\u0644\u0645 \u064A\u064F\u0639\u062B\u0631 \u0639\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u062D\u0642\u064A\u0642");return}const i=this._collectInvestigationAiContext(t);if(!i.description){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u062F\u062B (\u0627\u0644\u0642\u0633\u0645 3) \u0623\u0648\u0644\u0627\u064B");return}if(!i.incidentTypes.length){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u062D\u0627\u062F\u062B \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 (\u0627\u0644\u0642\u0633\u0645 2)");return}if(confirm(`\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 RCA \u0648\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 \u0628\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A Gemini.
\u064A\u062C\u0628 \u0645\u0631\u0627\u062C\u0639\u062A\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`)){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){Notification.error("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");return}try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0642\u062A\u0631\u0627\u062D \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0630\u0643\u064A...");const a=await GoogleIntegration.sendRequest({action:"suggestInvestigationAnalysis",data:i});if(Loading.hide(),!a||a.success===!1){Notification.error(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u062D \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const n=a.data||a;this._applyInvestigationAiSuggestion(t,n),Notification.success("\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0627\u0642\u062A\u0631\u0627\u062D \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u2014 \u0631\u0627\u062C\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 5\u20136 \u0648RCA \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(a){Loading.hide(),Utils.safeError("suggestInvestigationWithAI:",a),Notification.error(a?.message||"\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A")}}},_applyInvestigationAiSuggestion(e,t){if(!t||!e)return;const i=e.querySelector("#investigation-rca-wizard");i&&t.rca&&typeof InvestigationRCA<"u"&&InvestigationRCA.applySuggestion(i,t.rca,{recommendedMethod:t.recommendedMethod,canEdit:!0});const a=t.risk||{},n=parseInt(a.probability,10),o=parseInt(a.severity,10);if(n>=1&&n<=5&&o>=1&&o<=5){const l=e.querySelector("#investigation-risk-probability"),c=e.querySelector("#investigation-risk-severity"),u=e.querySelector("#investigation-risk-level");l&&(l.value=String(n)),c&&(c.value=String(o)),u&&(u.value=String(n*o));const p=e.querySelector("#investigation-risk-matrix");if(p&&typeof RiskMatrix<"u"){const m=p.querySelector(`.risk-cell[data-likelihood="${n}"][data-consequence="${o}"]`);m&&RiskMatrix.selectCell(m,"investigation-risk-matrix")}}const s=e.querySelector("#investigation-risk-explanation");if(s&&a.explanation&&(s.value=a.explanation),t.unsafeBehavior){const l=e.querySelector("#investigation-unsafe-behavior");l&&(l.value=t.unsafeBehavior)}if(t.unsafeCondition){const l=e.querySelector("#investigation-unsafe-condition");l&&(l.value=t.unsafeCondition)}const r=Array.isArray(t.actionPlan)?t.actionPlan:[],d=e.querySelector("#investigation-action-plan-body");d&&r.length&&(d.innerHTML=this.renderInvestigationActionPlanRows(r),this.bindInvestigationActionPlanPickers(e))},async loadInvestigationFormOptions(e){const t=e.querySelector("#investigation-factory"),i=e.querySelector("#investigation-location");if(t){const a=this.getSiteOptions(),n=new Set,o=new Set,s=t.querySelector('option[value=""]');t.innerHTML="",s&&t.appendChild(s),a.forEach(r=>{if(!r.id||n.has(r.id)||r.name&&o.has(r.name.trim()))return;n.add(r.id),r.name&&o.add(r.name.trim());const d=document.createElement("option");d.value=r.id,d.textContent=r.name||r.id,t.appendChild(d)})}if(t&&i){const a=()=>{const n=t.value,o=i.value,s=i.querySelector('option[value=""]');if(i.innerHTML="",s&&i.appendChild(s),n){const r=this.getPlaceOptions(n),d=new Set,l=new Set;r.forEach(c=>{if(!c.id||d.has(c.id)||c.name&&l.has(c.name.trim()))return;d.add(c.id),c.name&&l.add(c.name.trim());const u=document.createElement("option");u.value=c.id,u.textContent=c.name||c.id,i.appendChild(u)}),o&&i.querySelector(`option[value="${o}"]`)&&(i.value=o)}};t.addEventListener("change",a),a()}else if(i){const a=this.getSiteOptions(),n=new Set,o=new Set,s=i.querySelector('option[value=""]');i.innerHTML="",s&&i.appendChild(s),a.forEach(r=>{this.getPlaceOptions(r.id).forEach(l=>{if(!l.id||n.has(l.id)||l.name&&o.has(l.name.trim()))return;n.add(l.id),l.name&&o.add(l.name.trim());const c=document.createElement("option");c.value=l.id,c.textContent=`${r.name} - ${l.name}`,i.appendChild(c)})})}},loadInvestigationFormData(e){setTimeout(()=>{let t=e.investigation;if(t&&typeof t=="string")try{t=JSON.parse(t)}catch(a){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 investigation:",a),t={}}if(t){const a=t;if(a.factoryId){const n=document.querySelector("#investigation-factory");n&&Array.from(n.options).find(s=>s.value===a.factoryId)&&(n.value=a.factoryId,n.dispatchEvent(new Event("change",{bubbles:!0})),setTimeout(()=>{if(a.locationId){const s=document.querySelector("#investigation-location");s&&Array.from(s.options).find(d=>d.value===a.locationId)&&(s.value=a.locationId)}},100))}else if(a.locationId){const n=document.querySelector("#investigation-location");n&&Array.from(n.options).find(s=>s.value===a.locationId)&&(n.value=a.locationId)}}else if(e.siteId){const a=document.querySelector("#investigation-factory"),n=document.querySelector("#investigation-location");if(a&&e.siteId){const o=Array.from(a.options).find(s=>s.value===e.siteId||e.siteName&&s.text.trim()===e.siteName.trim()||e.location&&s.text.trim()===e.location.trim());o&&(a.value=o.value,a.dispatchEvent(new Event("change",{bubbles:!0})),setTimeout(()=>{if(n&&e.sublocationId){const s=Array.from(n.options).find(r=>r.value===e.sublocationId||e.sublocationName&&r.text.trim()===e.sublocationName.trim()||e.sublocation&&r.text.trim()===e.sublocation.trim());s&&(n.value=s.value)}},100))}else if(n&&e.sublocationId){const o=Array.from(n.options).find(s=>s.value===e.sublocationId||e.sublocationName&&s.text.trim()===e.sublocationName.trim()||e.sublocation&&s.text.trim()===e.sublocation.trim());o&&(n.value=o.value)}}if(t){const a=t,n=document.querySelector("#investigation-affected-affiliation");n&&(a.affectedAffiliation?n.value=a.affectedAffiliation:e.affiliation&&(n.value=e.affiliation))}else if(e.affiliation){const a=document.querySelector("#investigation-affected-affiliation");a&&(a.value=e.affiliation)}const i=document.getElementById("investigation-form")?.closest(".modal-overlay")||document.querySelector(".modal-overlay");if(i){if(t){const a=t,n=(o,s)=>{const r=i.querySelector(o);r&&s!=null&&s!==""&&(r.value=s)};if(n("#investigation-affected-employee-code",a.affectedEmployeeCode),n("#investigation-affected-name",a.affectedName),n("#investigation-affected-job",a.affectedJob),n("#investigation-affected-age",a.affectedAge),a.affectedAffiliation==="contractor"){const o=i.querySelector("#investigation-affected-contractor-select");o&&(o.innerHTML=this.buildInvestigationAffectedContractorSelectOptions(a.affectedDepartment||""))}else n("#investigation-affected-department",a.affectedDepartment)}this.updateInvestigationAffectedAffiliationUI(i),this._populateInvestigationFormFields(i,e,t)}},300)},async handleInvestigationSubmit(e){const t=document.querySelector(".modal-overlay");if(!t||this._investigationSubmitting)return;const i=document.getElementById("investigation-number"),a=document.getElementById("investigation-datetime"),n=document.getElementById("incident-datetime"),o=document.getElementById("investigation-factory"),s=document.getElementById("investigation-location"),r=document.getElementById("investigation-description"),d=document.getElementById("investigation-nearmiss-description"),l=document.getElementById("investigation-affected-affiliation"),c=document.getElementById("investigation-affected-employee-code"),u=document.getElementById("investigation-affected-name"),p=document.getElementById("investigation-affected-job"),m=document.getElementById("investigation-affected-age"),f=document.getElementById("investigation-affected-department"),g=document.getElementById("investigation-unsafe-behavior"),x=document.getElementById("investigation-unsafe-condition"),w=document.getElementById("investigation-risk-probability"),y=document.getElementById("investigation-risk-severity"),A=document.getElementById("investigation-risk-level"),I=document.getElementById("investigation-risk-result"),v=document.getElementById("investigation-risk-explanation"),$=document.getElementById("investigation-signature-area-manager"),F=document.getElementById("investigation-signature-area-manager-date"),b=document.getElementById("investigation-signature-safety-manager"),T=document.getElementById("investigation-signature-safety-manager-date"),M=document.getElementById("investigation-signature-safety-director"),R=document.getElementById("investigation-signature-safety-director-date");if(!i||!a||!n||!o||!s||!r||!l||!u||!p||!m||!f||!g||!x||!w||!y||!A||!I||!v||!$||!F||!b||!T){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const D={investigationNumber:i.value,investigationDateTime:Utils.dateTimeLocalToISO(a.value)||a.value,incidentDateTime:Utils.dateTimeLocalToISO(n.value)||n.value,factoryId:o.value,factoryName:o.options[o.selectedIndex]?.text||"",locationId:s.value,locationName:s.options[s.selectedIndex]?.text||"",incidentTypes:[],description:r.value,nearmissDescription:d?.value||"",affectedAffiliation:l.value,affectedEmployeeCode:c?.value?.trim()||"",affectedName:u.value,affectedJob:p.value,affectedAge:m.value,affectedDepartment:this._resolveInvestigationAffectedDepartment(t),injuredPart:document.getElementById("investigation-injured-part")?.value?.trim()||"",equipmentCause:document.getElementById("investigation-equipment-cause")?.value?.trim()||"",unsafeBehavior:g.value,unsafeCondition:x.value,riskProbability:parseInt(w.value)||0,riskSeverity:parseInt(y.value)||0,riskLevel:A.value,riskResult:I.value,riskExplanation:v.value,actionPlan:this.collectInvestigationActionPlan(),signatureAreaManager:{name:$.value,date:F.value,signature:""},signatureSafetyManager:{name:b.value,date:T.value,signature:""},signatureSafetyDirector:{name:M?.value||"",date:R?.value||"",signature:""},updatedAt:new Date().toISOString(),updatedBy:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,investigationStatus:"\u0645\u0643\u062A\u0645\u0644",completedAt:new Date().toISOString()};document.getElementById("incident-type-nearmiss")?.checked&&D.incidentTypes.push("nearmiss"),document.getElementById("incident-type-property")?.checked&&D.incidentTypes.push("property"),document.getElementById("incident-type-injury-no-lost")?.checked&&D.incidentTypes.push("injury-no-lost"),document.getElementById("incident-type-injury-lost")?.checked&&D.incidentTypes.push("injury-lost"),document.getElementById("incident-type-fatality")?.checked&&D.incidentTypes.push("fatality");const P=document.getElementById("investigation-rca-wizard");if(P&&typeof InvestigationRCA<"u"){const E=InvestigationRCA.collect(P);E&&(E.method||Object.keys(E.stepsData||{}).length)&&(D.rca=InvestigationRCA.normalizeRcaForExport(E)||E)}if(!D.investigationDateTime||!D.incidentDateTime||!D.factoryId||!D.locationId||!D.description){Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}if(D.affectedAffiliation==="company"&&!D.affectedEmployeeCode){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0628\u0639\u064A\u0629 \xAB\u0634\u0631\u0643\u0629\xBB");return}if(D.affectedAffiliation==="contractor"&&!D.affectedDepartment){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0642\u064A\u0642...");try{this._investigationSubmitting=!0;const E=AppState.appData.incidents.find(B=>B.id===e);if(E){if(E.investigation&&typeof E.investigation=="string")try{E.investigation=JSON.parse(E.investigation)}catch(q){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 investigation \u0627\u0644\u0642\u062F\u064A\u0645:",q),E.investigation={}}E.investigation={...E.investigation||{},...D},this._applyInvestigationToIncident(E,E.investigation),D.rca?.rootCauseSummary&&(E.rootCause=D.rca.rootCauseSummary),!D.riskExplanation&&D.rca?.rootCauseSummary&&(E.investigation.riskExplanation=D.rca.rootCauseSummary),E.updatedAt=new Date().toISOString();const B=this.isAdmin(),U=AppState.currentUser?.role==="safety_officer"||AppState.currentUser?.permissions&&AppState.currentUser.permissions["incidents-complete-investigation"]===!0,S=!!(E.approvedAt||this._resolveIncidentApproverInfo(E.approvedBy).raw)&&!this._coerceIncidentBoolean(E.requiresApproval);this._resolveIncidentStatusAfterInvestigationSave(E,{isAdmin:B,isSafetyOfficer:U,alreadyApproved:S}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.persistIncidentToServer(E,{syncRegistry:!0,silent:!0}),Loading.hide(),!B&&U?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629."):Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"),this._closeInvestigationModal(),await this._refreshIncidentsViewsAfterUpdate(e)}else throw new Error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")}catch(E){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0642\u064A\u0642:",E),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+E.message)}finally{this._investigationSubmitting=!1}},collectInvestigationActionPlan(){const e=[];return document.querySelectorAll("#investigation-action-plan-body tr").forEach(i=>{const a=i.querySelector(".inv-ap-corrective")?.value?.trim()||"",n=i.querySelector(".inv-ap-planned-date")?.value||"",o=i.querySelector(".inv-ap-responsible-name")?.value?.trim()||"",s=i.querySelector(".inv-ap-responsible-dept")?.value?.trim()||"",r=i.querySelector(".inv-ap-responsible-date")?.value||"",d=i.querySelector(".inv-ap-follow-name")?.value?.trim()||"",l=i.querySelector(".inv-ap-follow-dept")?.value?.trim()||"",c=i.querySelector(".inv-ap-follow-date")?.value||"";(a||n||o||d)&&e.push({correctiveAction:a,plannedDate:n,responsibleName:o,responsibleDepartment:s,responsibleDate:r,followUpName:d,followUpDepartment:l,followUpDate:c})}),e},addInvestigationActionPlanRow(e={}){const t=document.getElementById("investigation-action-plan-body");if(!t){Notification.error("\u062C\u062F\u0648\u0644 \u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=t.querySelectorAll("tr").length,a=document.createElement("tbody");a.innerHTML=this._buildInvestigationActionPlanRowHtml(e,i);const n=a.querySelector("tr");n&&(t.appendChild(n),this.setupInvestigationActionPlanRowPickers(n))},getInvestigationFormData(){if(!document.querySelector(".modal-overlay"))return null;const t=document.getElementById("investigation-number"),i=document.getElementById("investigation-datetime"),a=document.getElementById("incident-datetime"),n=document.getElementById("investigation-factory"),o=document.getElementById("investigation-location"),s=document.getElementById("investigation-description"),r=document.getElementById("investigation-nearmiss-description"),d=document.getElementById("investigation-affected-affiliation"),l=document.getElementById("investigation-affected-employee-code"),c=document.getElementById("investigation-affected-name"),u=document.getElementById("investigation-affected-job"),p=document.getElementById("investigation-affected-age"),m=document.getElementById("investigation-affected-department"),f=document.getElementById("investigation-unsafe-behavior"),g=document.getElementById("investigation-unsafe-condition"),x=document.getElementById("investigation-risk-probability"),w=document.getElementById("investigation-risk-severity"),y=document.getElementById("investigation-risk-level"),A=document.getElementById("investigation-risk-result"),I=document.getElementById("investigation-risk-explanation"),v=document.getElementById("investigation-signature-area-manager"),$=document.getElementById("investigation-signature-area-manager-date"),F=document.getElementById("investigation-signature-safety-manager"),b=document.getElementById("investigation-signature-safety-manager-date"),T=document.getElementById("investigation-signature-safety-director"),M=document.getElementById("investigation-signature-safety-director-date");if(!t||!i||!a||!n||!o||!s||!d||!c||!u||!p||!m||!f||!g||!x||!w||!y||!A||!I||!v||!$||!F||!b)return null;const R=[];document.getElementById("incident-type-nearmiss")?.checked&&R.push("nearmiss"),document.getElementById("incident-type-property")?.checked&&R.push("property"),document.getElementById("incident-type-injury-no-lost")?.checked&&R.push("injury-no-lost"),document.getElementById("incident-type-injury-lost")?.checked&&R.push("injury-lost"),document.getElementById("incident-type-fatality")?.checked&&R.push("fatality");const D={investigationNumber:t.value,investigationDateTime:Utils.dateTimeLocalToISO(i.value)||i.value,incidentDateTime:Utils.dateTimeLocalToISO(a.value)||a.value,factoryId:n.value,factoryName:n.options[n.selectedIndex]?.text||"",locationId:o.value,locationName:o.options[o.selectedIndex]?.text||"",incidentTypes:R,description:s.value,nearmissDescription:r?.value||"",affectedAffiliation:d.value,affectedEmployeeCode:l?.value?.trim()||"",affectedName:c.value,affectedJob:u.value,affectedAge:p.value,affectedDepartment:this._resolveInvestigationAffectedDepartment(document.querySelector(".modal-overlay")),injuredPart:document.getElementById("investigation-injured-part")?.value?.trim()||"",equipmentCause:document.getElementById("investigation-equipment-cause")?.value?.trim()||"",unsafeBehavior:f.value,unsafeCondition:g.value,riskProbability:parseInt(x.value)||0,riskSeverity:parseInt(w.value)||0,riskLevel:y.value,riskResult:A.value,riskExplanation:I.value,actionPlan:this.collectInvestigationActionPlan(),signatureAreaManager:{name:v.value,date:$.value},signatureSafetyManager:{name:F.value,date:b.value},signatureSafetyDirector:{name:T?.value||"",date:M?.value||""}},P=this._collectInvestigationRcaData();return P&&(P.method||Object.keys(P.stepsData||{}).length)&&(D.rca=typeof InvestigationRCA<"u"&&InvestigationRCA.normalizeRcaForExport(P)||P),D},printInvestigation(e){try{const{incident:t,investigationData:i}=this._resolveInvestigationDataForExport(e);if(!t){Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!i.investigationNumber&&!i.description){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062D\u0642\u064A\u0642 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629...");const a=this._buildInvestigationReportHtml(t,i);this._openIncidentPrintableHtml(a,"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642:",t),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+t.message)}},async exportInvestigationPDF(e){await this._exportInvestigationReportPdf(e)},_getInvestigationFormPrintStyles(){return`
            <style>
                .inv-print-wrap { direction: rtl; text-align: right; font-family: 'Cairo', 'Tahoma', Arial, sans-serif; width: 100%; max-width: 100%; box-sizing: border-box; }
                .inv-print-section {
                    border-radius: 12px;
                    padding: 20px 24px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                }
                .inv-print-section h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 16px;
                    padding-bottom: 10px;
                    border-bottom: 3px solid;
                }
                .inv-s1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .inv-s1 h3 { color: #1565C0; border-color: #2196F3; }
                .inv-s2 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .inv-s2 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .inv-s3 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .inv-s3 h3 { color: #E65100; border-color: #FF9800; }
                .inv-s4 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .inv-s4 h3 { color: #AD1457; border-color: #E91E63; }
                .inv-s5 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .inv-s5 h3 { color: #00695C; border-color: #009688; }
                .inv-s6 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .inv-s6 h3 { color: #2E7D32; border-color: #4CAF50; }
                .inv-s7 { background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); border-color: #FFC107; }
                .inv-s7 h3 { color: #F57F17; border-color: #FFC107; }
                .inv-s-rca { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #7c3aed; }
                .inv-s-rca h3 { color: #5b21b6; border-color: #7c3aed; }
                ${typeof InvestigationRCA<"u"&&InvestigationRCA.getPrintStyles?InvestigationRCA.getPrintStyles():""}
                .inv-field-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 14px 16px;
                }
                .inv-field-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 6px;
                }
                .inv-field-value {
                    padding: 10px 12px;
                    background: #fff;
                    border-radius: 8px;
                    font-weight: 500;
                    min-height: 20px;
                }
                .inv-type-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 10px;
                }
                .inv-type-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 12px;
                    background: #fff;
                    border: 2px solid #9C27B0;
                    border-radius: 8px;
                    font-weight: 600;
                    color: #374151;
                }
                .inv-type-item.checked { background: #f3e5f5; }
                .inv-type-box {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #9C27B0;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 800;
                    color: #7B1FA2;
                    flex-shrink: 0;
                }
                .inv-text-panel {
                    padding: 14px;
                    background: #fff;
                    border: 2px solid;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    line-height: 1.7;
                }
                .inv-inner-white {
                    background: #fff;
                    padding: 14px;
                    border: 2px solid;
                    border-radius: 10px;
                }
                .inv-sig-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 14px;
                }
                .inv-sig-box {
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    padding: 8px;
                    min-height: 64px;
                    background: #f9fafb;
                    text-align: center;
                }
                .inv-sig-box img { max-height: 56px; max-width: 100%; }
            </style>
        `},_buildInvestigationFormPrintField(e,t,i="#2196F3",a=!1){const n=a?"background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%); font-weight: 700; color: #0D47A1;":"";return`
            <div>
                <div class="inv-field-label">${Utils.escapeHTML(e)}</div>
                <div class="inv-field-value" style="border: 2px solid ${i}; ${n}">${t||"\u2014"}</div>
            </div>
        `},_buildInvestigationFormPrintSection(e,t,i,a){return`
            <div class="inv-print-section ${e}">
                <h3>${t}) ${Utils.escapeHTML(i)}</h3>
                ${a}
            </div>
        `},buildInvestigationPrintContent(e,t,i={}){const a=B=>{if(!B)return"";try{return new Date(B).toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return String(B)}},n=B=>{if(!B)return"";try{return new Date(B).toLocaleDateString("ar-SA")}catch{return String(B)}},o=B=>Utils.escapeHTML(String(B??"")),s=[{key:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{key:"property",label:"\u062A\u0644\u0641 \u0645\u0645\u062A\u0644\u0643\u0627\u062A"},{key:"injury-no-lost",label:"\u0625\u0635\u0627\u0628\u0629 \u0628\u062F\u0648\u0646 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644"},{key:"injury-lost",label:"\u0625\u0635\u0627\u0628\u0629 \u0645\u0639 \u0641\u0642\u062F \u0623\u064A\u0627\u0645 \u0639\u0645\u0644"},{key:"fatality",label:"\u0648\u0641\u0627\u0629"}],r=Array.isArray(t.incidentTypes)?t.incidentTypes:[],d={company:"\u0634\u0631\u0643\u0629","daily-labor":"\u0639\u0645\u0627\u0644\u0629 \u064A\u0648\u0645\u064A\u0629",contractor:"\u0645\u0642\u0627\u0648\u0644",visitor:"\u0632\u0627\u0626\u0631",none:"\u0644\u0627 \u064A\u0648\u062C\u062F"},l={yes:"\u0646\u0639\u0645",no:"\u0644\u0627"},c={low:"\u0645\u0646\u062E\u0641\u0636",medium:"\u0645\u062A\u0648\u0633\u0637",high:"\u0639\u0627\u0644\u064A"},u=this._getInvestigationMethodologyMeta(t),p=u.hasMethod?`${u.label}${u.reference?` (${u.reference})`:""}`:"\u2014",m=this._buildInvestigationFormPrintSection("inv-s1","1","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629",`
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062A\u062D\u0642\u064A\u0642",a(t.investigationDateTime),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u062D\u0627\u062F\u062B",a(t.incidentDateTime),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0635\u0646\u0639",o(t.factoryName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0627\u0644\u0636\u0628\u0637",o(t.locationName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),"#2196F3")}
                ${this._buildInvestigationFormPrintField("\u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u0642\u064A\u0642",o(t.investigationNumber||"\u2014"),"#1976D2",!0)}
                ${e.isoCode?this._buildInvestigationFormPrintField("\u0643\u0648\u062F \u0627\u0644\u062D\u0627\u062F\u062B",o(e.isoCode),"#2196F3"):""}
                ${this._buildInvestigationFormPrintField("\u0645\u0646\u0647\u062C\u064A\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A",o(p),"#7c3aed",u.hasMethod)}
            </div>
        `),f=s.map(B=>{const U=r.includes(B.key);return`
                <div class="inv-type-item${U?" checked":""}">
                    <div class="inv-type-box">${U?"\u2713":""}</div>
                    <span>${o(B.label)}</span>
                </div>
            `}).join(""),g=this._buildInvestigationFormPrintSection("inv-s2","2","\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B",`
            <div class="inv-type-grid">${f}</div>
        `),x=this._buildInvestigationFormPrintSection("inv-s3","3","\u0648\u0635\u0641 \u0648\u0642\u0627\u0626\u0639 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u062D\u0627\u062F\u062B",`
            <div style="margin-bottom: 14px;">
                <div class="inv-field-label">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0631\u0626\u064A\u0633\u064A</div>
                <div class="inv-text-panel" style="border-color:#FF9800;">${o(t.description||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>
                </div>
            ${r.includes("nearmiss")||t.nearmissDescription?`
            <div>
                <div class="inv-field-label">\u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0648\u0634\u064A\u0643\u0629</div>
                <div class="inv-text-panel" style="border-color:#FF9800;">${o(t.nearmissDescription||"\u2014")}</div>
            </div>
            `:""}
        `),w=t.affectedAffiliation==="company",y=t.affectedAffiliation==="contractor",A=w?"\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627",I=this._buildInvestigationFormPrintSection("inv-s4","4","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u0627\u0628",`
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField("\u062A\u0628\u0639\u064A\u0629 \u0627\u0644\u0645\u0635\u0627\u0628",d[t.affectedAffiliation]||t.affectedAffiliation||"\u2014","#E91E63")}
                ${w?this._buildInvestigationFormPrintField("\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641",o(t.affectedEmployeeCode||"\u2014"),"#E91E63"):""}
                ${y?this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0642\u0627\u0648\u0644",o(t.affectedDepartment||"\u2014"),"#E91E63"):""}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0627\u0633\u0645",o(t.affectedName||"\u2014"),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0648\u0638\u064A\u0641\u0629",o(t.affectedJob||"\u2014"),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0633\u0646",o(t.affectedAge||"\u2014"),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0623\u0637\u0631\u0627\u0641 / \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0636\u0631\u0631",o(t.injuredPart||this.resolveIncidentInjuredPart(e)||"\u2014"),"#E91E63")}
                ${this._buildInvestigationFormPrintField("\u0627\u0644\u0645\u0639\u062F\u0629 \u0627\u0644\u0645\u062A\u0633\u0628\u0628\u0629 \u0641\u064A \u0627\u0644\u0625\u0635\u0627\u0628\u0629",o(t.equipmentCause||e.equipmentCause||"\u2014"),"#E91E63")}
                </div>
            ${y?"":`
            <div style="margin-top:14px;">
                ${this._buildInvestigationFormPrintField(A,o(t.affectedDepartment||"\u2014"),"#E91E63")}
                </div>
            `}
        `),v=typeof RiskMatrix<"u"?RiskMatrix.generate(`inv-print-risk-${Date.now()}`,{selectedLikelihood:t.riskProbability?parseInt(t.riskProbability,10):null,selectedConsequence:t.riskSeverity?parseInt(t.riskSeverity,10):null,interactive:!1}):"",$=this._buildInvestigationFormPrintSection("inv-s5","5","\u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0645\u062D\u0642\u0642",`
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 14px;">
                ${this._buildInvestigationFormPrintField("\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646",l[t.unsafeBehavior]||t.unsafeBehavior||"\u2014","#009688")}
                ${this._buildInvestigationFormPrintField("\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",l[t.unsafeCondition]||t.unsafeCondition||"\u2014","#009688")}
                    </div>
            ${v?`
            <div style="margin-bottom: 14px;">
                <div class="inv-field-label">\u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</div>
                <div class="inv-inner-white" style="border-color:#14b8a6;">${v}</div>
                </div>
                `:""}
            <div class="inv-field-grid" style="grid-template-columns: 1fr; gap: 14px;">
                ${this._buildInvestigationFormPrintField("\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645",c[t.riskResult]||t.riskResult||t.riskLevel||"\u2014","#14b8a6")}
            </div>
            <div style="margin-top:14px;">
                <div class="inv-field-label">\u0634\u0631\u062D \u0627\u0644\u062E\u0637\u0631</div>
                <div class="inv-text-panel" style="border-color:#14b8a6; background:#f0fdfa;">${o(t.riskExplanation||"\u2014")}</div>
                </div>
        `),F=this._buildInvestigationRcaPrintSection(t,e,o,{includeRcaStyles:!1}),b=Array.isArray(t.actionPlan)?t.actionPlan:[],T=Math.max(3,b.length),M=Array.from({length:T},(B,U)=>{const S=b[U]||{};return`
                <tr style="border-bottom: 1px solid #c8e6c9;">
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">${o(S.correctiveAction||"")}</td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; text-align: center; vertical-align: top;">${S.plannedDate?n(S.plannedDate):""}</td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">
                        ${o(S.responsibleName||"")}
                        ${S.responsibleDepartment?`<br><span style="font-size:11px;color:#64748b;">${o(S.responsibleDepartment)}</span>`:""}
                        ${S.responsibleDate?`<br><span style="font-size:11px;color:#64748b;">${n(S.responsibleDate)}</span>`:""}
                    </td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">
                        ${o(S.followUpName||"")}
                        ${S.followUpDepartment?`<br><span style="font-size:11px;color:#64748b;">${o(S.followUpDepartment)}</span>`:""}
                        ${S.followUpDate?`<br><span style="font-size:11px;color:#64748b;">${n(S.followUpDate)}</span>`:""}
                        </td>
                    </tr>
            `}).join(""),R=this._buildInvestigationFormPrintSection("inv-s6","6","\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644",`
            <div class="inv-inner-white" style="border-color:#4CAF50;">
                <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                            <th style="padding: 12px; width: 35%; text-align: right; border: 1px solid #2E7D32;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A</th>
                            <th style="padding: 12px; width: 15%; text-align: center; border: 1px solid #2E7D32;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</th>
                            <th style="padding: 12px; width: 25%; text-align: center; border: 1px solid #2E7D32;">\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                            <th style="padding: 12px; width: 25%; text-align: center; border: 1px solid #2E7D32;">\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</th>
                    </tr>
                    </thead>
                    <tbody style="background:#f9fff9;">${M}</tbody>
                </table>
            </div>
        `),D=(B,U)=>{const S=o(B?.name||""),q=B?.date?n(B.date):"",j=B?.signature?String(B.signature).replace(/"/g,"&quot;"):"",N=j?`<img src="${j}" alt="\u062A\u0648\u0642\u064A\u0639">`:'<span style="color:#9ca3af;font-size:12px;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</span>';return`
                <div>
                    <div class="inv-field-label">${o(U)}</div>
                    <div class="inv-field-value" style="border-color:#FFC107;margin-bottom:8px;">${S||"\u2014"}</div>
                    <div class="inv-field-value" style="border-color:#FFC107;margin-bottom:8px;">${q||"\u2014"}</div>
                    <div class="inv-sig-box">${N}</div>
                </div>
            `},P=this._buildInvestigationFormPrintSection("inv-s7","7","\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A",`
            <div class="inv-sig-grid">
                ${D(t.signatureAreaManager,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0645\u0646\u0637\u0642\u0629")}
                ${D(t.signatureSafetyManager,"\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629")}
                ${D(t.signatureSafetyDirector,"\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629")}
                </div>
        `);return`
            ${i.includeStyles!==!1?this._getInvestigationFormPrintStyles():""}
            <div class="inv-print-wrap">
                ${m}
                ${g}
                ${x}
                ${I}
                ${$}
                ${F}
                ${R}
                ${P}
            </div>
        `},generateSafetyAlertSequentialNumber(){const t=(AppState.appData?.safetyAlerts||[]).reduce((i,a)=>{const n=parseInt(a.sequentialNumber)||0;return n>i?n:i},0);return String(t+1).padStart(3,"0")},canCreateSafetyAlert(){const e=AppState.currentUser;return e?e.role==="admin"?!0:e.permissions?.canCreateSafetyAlert===!0||e.permissions?.safetyTeam===!0:!1},canApproveSafetyAlert(){const e=AppState.currentUser;return e?e.role==="admin"?!0:e.permissions?.canApproveSafetyAlert===!0||e.role==="system-manager":!1},canApproveIncident(){return this.isAdmin()||this.canDeleteIncident()},hasInvestigationData(e){if(!e||!e.investigation)return!1;const t=this._parseInvestigationRecord(e);return!!(t&&Object.keys(t).length>0)},_parseInvestigationRecord(e){let t=e?.investigation!==void 0?e.investigation:e;if(!t)return null;if(typeof t=="string")try{t=JSON.parse(t)}catch{return null}return t&&typeof t=="object"?t:null},isInvestigationComplete(e){const t=this._parseInvestigationRecord(e);return t?t.investigationStatus==="\u0645\u0643\u062A\u0645\u0644"||t.completedAt?!0:!!(t.investigationNumber&&t.investigationDateTime&&t.incidentDateTime&&t.factoryId&&t.locationId&&t.description&&t.affectedName&&t.affectedAffiliation):!1},getIncidentDisplayStatus(e){if(!e)return"\u2014";const t=this.getIncidentApprovalState(e);return t.approved?"\u0645\u0643\u062A\u0645\u0644":this.isInvestigationComplete(e)?t.awaitingApproval?"\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u062A\u0647\u064A":"\u0645\u0643\u062A\u0645\u0644":this.hasInvestigationData(e)?"\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642":e.status||"\u0645\u0641\u062A\u0648\u062D"},_resolveIncidentStatusAfterInvestigationSave(e,t={}){const{isAdmin:i=!1,isSafetyOfficer:a=!1,alreadyApproved:n=!1}=t,o=this._parseInvestigationRecord(e)||{};if(o.investigationStatus="\u0645\u0643\u062A\u0645\u0644",o.completedAt=new Date().toISOString(),o.completedBy=AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,e.investigation={...o},n){e.status="\u0645\u0643\u062A\u0645\u0644",e.requiresApproval=!1;return}if(i){e.status="\u0645\u0643\u062A\u0645\u0644",e.requiresApproval=!1,e.approvedBy=AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:e.approvedBy||null,e.approvedAt=e.approvedAt||new Date().toISOString(),e.rejectedBy=null,e.rejectedAt=null,e.rejectionReason=null;return}if(a){e.status="\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629",e.requiresApproval=!0,e.approvedBy=null,e.approvedAt=null;return}e.status="\u0645\u0643\u062A\u0645\u0644",e.requiresApproval=!1},renderApprovalFlowHtml(e){const t=p=>Utils.escapeHTML(String(p??"")),i=this.isInvestigationComplete(e),a=this.getIncidentApprovalState(e),n=a.awaitingApproval,o=a.approved,s=a.rejected,r=(p,m,f=!1)=>f?{bg:"#FEE2E2",border:"#F87171",color:"#991B1B",icon:"fa-times"}:p?{bg:"#DCFCE7",border:"#4ADE80",color:"#166534",icon:"fa-check"}:m?{bg:"#FEF3C7",border:"#FBBF24",color:"#92400E",icon:"fa-clock"}:{bg:"#F1F5F9",border:"#CBD5E1",color:"#64748B",icon:"fa-circle"},d=[{label:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B",done:!0,active:!1},{label:"\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u062D\u0642\u064A\u0642",done:i,active:!i&&!o},{label:s?"\u0645\u0631\u0641\u0648\u0636":o?"\u0645\u0639\u062A\u0645\u062F":"\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062F\u064A\u0631",done:o,active:n,rejected:s&&!o}],l=d.map((p,m)=>{const f=r(p.done,p.active,p.rejected),g=m<d.length-1?`<div style="flex:1;height:3px;margin:0 8px;background:${p.done?"#4ADE80":"#CBD5E1"};align-self:center;border-radius:2px;"></div>`:"";return`
                <div style="display:flex;align-items:center;flex:1;min-width:0;">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;min-width:88px;">
                        <div style="width:52px;height:52px;border-radius:50%;background:${f.bg};border:3px solid ${f.border};color:${f.color};display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(15,23,42,0.08);">
                            <i class="fas ${f.icon}"></i>
                        </div>
                        <div style="font-size:12px;font-weight:700;color:${f.color};text-align:center;line-height:1.4;">${t(p.label)}</div>
                    </div>
                    ${g}
                </div>`}).join(""),c=[];a.approverName&&c.push(`\u0627\u0639\u062A\u0645\u062F: ${t(a.approverName)}${a.approvedAt?" \u2014 "+t(Utils.formatDate(a.approvedAt)):""}`);const u=this._resolveIncidentApproverInfo(e.rejectedBy);return u.name&&c.push(`\u0631\u0641\u0636: ${t(u.name)}${e.rejectionReason?" \u2014 "+t(e.rejectionReason):""}`),`
            <div style="direction:rtl;margin-bottom:20px;padding:18px;border-radius:14px;background:linear-gradient(135deg,#f8fafc,#eff6ff);border:1px solid #bfdbfe;">
                <h4 style="margin:0 0 16px;font-size:15px;font-weight:800;color:#1e40af;text-align:center;">
                    <i class="fas fa-check-circle ml-2"></i>\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u062F\u062B
                </h4>
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;flex-wrap:wrap;">
                    ${l}
                </div>
                ${c.length?`<div style="margin-top:14px;padding-top:12px;border-top:1px dashed #cbd5e1;font-size:12px;color:#475569;text-align:center;">${c.join(" | ")}</div>`:""}
            </div>`},showIncidentApprovalFlow(e){const t=(AppState.appData?.incidents||[]).find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this._normalizeIncidentApprovalRecord(t);const i=this.canApproveIncident(),a=this.getIncidentApprovalState(t),n=i&&a.awaitingApproval&&this.hasInvestigationData(t),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width:720px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u2014 ${Utils.escapeHTML(t.title||t.isoCode||t.id||"")}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    ${this.renderApprovalFlowHtml(t)}
                    <div style="font-size:13px;color:#64748b;line-height:1.7;">
                        <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${Utils.escapeHTML(this.getIncidentDisplayStatus(t))}</div>
                        <div><strong>\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</strong> ${a.awaitingApproval?"\u0646\u0639\u0645":"\u0644\u0627"}</div>
                        <div><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</strong> ${Utils.escapeHTML(a.label)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-secondary" onclick="Incidents.viewIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-eye ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                    </button>
                    ${n?`
                    <button class="btn-danger" onclick="Incidents.rejectIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-times ml-2"></i>\u0631\u0641\u0636
                    </button>
                    <button class="btn-success" onclick="Incidents.approveIncident('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-check ml-2"></i>\u0627\u0639\u062A\u0645\u0627\u062F
                    </button>
                    `:""}
                </div>
            </div>`,document.body.appendChild(o),o.addEventListener("click",s=>{s.target===o&&o.remove()})},manageWorkflow(e){this.showIncidentApprovalFlow(e)},async approveIncident(e){try{const t=AppState.appData.incidents.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(this._normalizeIncidentApprovalRecord(t),!this.canApproveIncident()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062D\u0648\u0627\u062F\u062B");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B\u061F"))return;Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u062F\u062B..."),t.status="\u0645\u0643\u062A\u0645\u0644",t.requiresApproval=!1,t.approvedBy=AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,t.approvedAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),t.rejectedBy=null,t.rejectedAt=null,t.rejectionReason=null,this._syncIncidentWorkflowOnApproval(e,"approved"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.persistIncidentToServer(t,{syncRegistry:!0,silent:!0}),Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D");try{document.getElementById("incidents-content")&&this.loadIncidentsList();const i=document.getElementById("incidents-tab-content");i&&(this.currentTab==="approvals"?(i.innerHTML=await this.renderApprovalsTab(),this.setupTabEventListeners("approvals")):this.currentTab==="registry"&&(i.innerHTML=await this.renderRegistryTab(),this.setupTabEventListeners("registry")))}catch(i){Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",i)}}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u062F\u062B:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},async rejectIncident(e){try{const t=AppState.appData.incidents.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u062D\u0627\u062F\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(this._normalizeIncidentApprovalRecord(t),!this.canApproveIncident()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u062D\u0648\u0627\u062F\u062B");return}const i=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:");if(!i||i.trim()===""){Notification.warning("\u064A\u062C\u0628 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0641\u0636 \u0647\u0630\u0627 \u0627\u0644\u062D\u0627\u062F\u062B\u061F"))return;Loading.show("\u062C\u0627\u0631\u064A \u0631\u0641\u0636 \u0627\u0644\u062D\u0627\u062F\u062B..."),t.status="\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642",t.requiresApproval=!1,t.rejectedBy=AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||AppState.currentUser.displayName||"",email:AppState.currentUser.email||""}:null,t.rejectedAt=new Date().toISOString(),t.rejectionReason=i.trim(),t.updatedAt=new Date().toISOString(),t.approvedBy=null,t.approvedAt=null,this._syncIncidentWorkflowOnApproval(e,"rejected"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.persistIncidentToServer(t,{syncRegistry:!0,silent:!0}),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u062D\u0627\u062F\u062B \u0628\u0646\u062C\u0627\u062D");try{document.getElementById("incidents-content")&&this.loadIncidentsList();const a=document.getElementById("incidents-tab-content");a&&(this.currentTab==="approvals"?(a.innerHTML=await this.renderApprovalsTab(),this.setupTabEventListeners("approvals")):this.currentTab==="registry"&&(a.innerHTML=await this.renderRegistryTab(),this.setupTabEventListeners("registry")))}catch(a){Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0639\u062F \u0627\u0644\u0631\u0641\u0636:",a)}}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u062D\u0627\u062F\u062B:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+t.message)}},getSafetyAlertFormData(){if(!document.querySelector(".modal-overlay"))return null;const t=document.getElementById("safety-alert-incident-type"),i=document.getElementById("incident-type-other-input"),a=document.getElementById("incident-type-other");let n=t?.value||"\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B";a&&a.checked&&i&&i.value.trim()&&(n=i.value.trim());const o=document.getElementById("safety-alert-number-display"),s=o?o.textContent.trim():String((AppState.appData?.safetyAlerts||[]).length+1).padStart(3,"0");return{sequentialNumber:s,incidentType:n,incidentDate:document.getElementById("safety-alert-date")?.value||"",incidentLocation:document.getElementById("safety-alert-location")?.value||"",who:document.getElementById("safety-alert-who")?.value||"",description:document.getElementById("safety-alert-description")?.value||"",facts:document.getElementById("safety-alert-facts")?.value||"",causes:document.getElementById("safety-alert-causes")?.value||"",lessonsLearned:document.getElementById("safety-alert-lessons")?.value||"",preventiveMeasures:document.getElementById("safety-alert-preventive")?.value||"",locationImage:document.getElementById("safety-alert-location-image")?.value||"",causesImage:document.getElementById("safety-alert-causes-image")?.value||"",notificationNumber:document.getElementById("safety-alert-notification-number")?.value||s,preparedBy:document.getElementById("safety-alert-prepared-by")?.value||"",approvedBy:document.getElementById("safety-alert-approved-by")?.value||"",issueDate:document.getElementById("safety-alert-issue-date")?.value||""}},printSafetyAlert(e){try{let t=this.getSafetyAlertFormData();if(!t){if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629. \u064A\u0631\u062C\u0649 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u0627\u064B.");return}if(t=(AppState.appData?.safetyAlerts||[]).find(i=>i.id===e),!t){Notification.error("Safety Alert \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}}if(!t.sequentialNumber&&!t.description){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629..."),this.exportSafetyAlertPDFWithData(t)}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 Safety Alert:",t),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+t.message)}},convertGoogleDriveLinkToPrintable(e){if(!e)return"";if(typeof window.__convertGoogleDriveUrl=="function"&&(e=window.__convertGoogleDriveUrl(e)),e.startsWith("data:image/"))return e;if(e.includes("drive.google.com/thumbnail")){const t=e.match(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/i);if(t&&t[1])return`https://drive.google.com/uc?export=view&id=${t[1]}`}if(e.includes("drive.google.com")){const t=e.match(/\/d\/([a-zA-Z0-9_-]+)/)||e.match(/id=([a-zA-Z0-9_-]+)/);if(t&&t[1])return`https://drive.google.com/uc?export=view&id=${t[1]}`}return e},buildSafetyAlertPrintContent(e){const t=AppState?.companySettings?.name||AppState?.companyName||"",i=AppState?.companySettings?.secondaryName||"",a=AppState?.companyLogo||"",n=e.sequentialNumber||"001",o=e.notificationNumber||n,s=e.locationImage?this.convertGoogleDriveLinkToPrintable(e.locationImage):"",r=e.causesImage?this.convertGoogleDriveLinkToPrintable(e.causesImage):"",d=a?this.convertGoogleDriveLinkToPrintable(a):"";return`
            <div style="direction: rtl; text-align: right; font-family: 'Tahoma', Arial, sans-serif; page-break-inside: avoid;">
                <!-- Top Header with Logo and Company Name -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 3px solid #003865;">
                    <div style="flex: 0 0 auto; text-align: right; padding-left: 20px;">
                        ${d?`<img src="${d}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" style="max-height: 60px; max-width: 150px; object-fit: contain; display: block;" onerror="this.style.display='none';">`:""}
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #003865; margin-bottom: 5px;">\u062A\u0646\u0628\u064A\u0647 - Safety Alert</div>
                        <div style="font-size: 1.3rem; font-weight: 700; color: #003865;">\u0627\u0644\u0633\u0644\u0627\u0645\u0629</div>
                    </div>
                    <div style="flex: 0 0 auto; text-align: left; padding-right: 20px;">
                        <div style="background: #e0f2fe; padding: 8px 16px; border-radius: 8px; font-weight: 600; color: #003865; font-size: 0.95rem;">
                            \u0643\u0648\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631: SAFETY-ALERT
                        </div>
                        <div style="font-size: 14px; font-weight: 700; color: #1f2937; margin-top: 8px; line-height: 1.3;">
                            <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(t||"")}</div>
                            ${i?`<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(i)}</div>`:""}
                        </div>
                    </div>
                </div>

                <!-- Incident Number and Type Section -->
                <div style="text-align: center; margin: 15px 0 20px 0;">
                    <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                    <div style="color: #dc2626; font-weight: 700; font-size: 12px; margin-bottom: 15px;">${Utils.escapeHTML(n)}</div>
                    <div style="background: #9ca3af; color: white; padding: 14px 20px; text-align: center; font-weight: 700; font-size: 1.15rem; border-radius: 8px; display: inline-block; min-width: 200px;">
                        ${Utils.escapeHTML(e.incidentType||"")}
                    </div>
                </div>

                <!-- Incident Details -->
                <div style="background: #9ca3af; height: 4px; margin: 20px 0 15px 0; border-radius: 2px;"></div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px;">
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">\u0623\u064A\u0646</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${Utils.escapeHTML(e.incidentLocation||"")}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">\u0645\u062A\u0649</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${e.incidentDate?new Date(e.incidentDate).toLocaleDateString("ar-SA"):""}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">\u0645\u0646</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${Utils.escapeHTML(e.who||"")}
                        </div>
                    </div>
                </div>

                <!-- Images -->
                ${s||r?`
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 18px; page-break-inside: avoid;">
                    ${s?`
                    <div style="text-align: center;">
                        <div style="margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                        <div style="background: #fbbf24; padding: 8px; text-align: center; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block; max-width: 100%; width: 100%; box-sizing: border-box;">
                            <img src="${s}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0643\u0627\u0646" 
                                style="max-width: 100%; max-height: 350px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;"
                                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding: 20px; color: #666;\\'>\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629</div>';">
                        </div>
                    </div>
                    `:"<div></div>"}
                    ${r?`
                    <div style="text-align: center;">
                        <div style="margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #374151;">\u0635\u0648\u0631\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062D\u0627\u062F\u062B</div>
                        <div style="background: #fbbf24; padding: 8px; text-align: center; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block; max-width: 100%; width: 100%; box-sizing: border-box;">
                            <img src="${r}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0633\u0628\u0627\u0628" 
                                style="max-width: 100%; max-height: 350px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;"
                                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding: 20px; color: #666;\\'>\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629</div>';">
                        </div>
                    </div>
                    `:""}
                </div>
                `:""}

                <!-- Description -->
                <div style="background: #9ca3af; height: 4px; margin: 18px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">\u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u062F\u062B :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(e.description||"")}</div>
                </div>

                ${e.facts?`
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">\u062D\u0642\u0627\u0626\u0642 \u0639\u0646 \u0627\u0644\u062D\u0627\u062F\u062B :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(e.facts)}</div>
                </div>
                `:""}

                ${e.causes?`
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">\u0627\u0644\u0623\u0633\u0628\u0627\u0628 :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(e.causes)}</div>
                </div>
                `:""}

                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0633\u062A\u0641\u0627\u062F\u0629 :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(e.lessonsLearned||"")}</div>
                </div>

                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062D\u062F\u062B :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(e.preventiveMeasures||"")}</div>
                </div>

                <!-- Footer -->
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(o)}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">\u0625\u0639\u062F\u0627\u062F</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(e.preparedBy||"")}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">\u0627\u0639\u062A\u0645\u0627\u062F</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(e.approvedBy||"-")}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${e.issueDate?new Date(e.issueDate).toLocaleDateString("ar-SA"):"-"}
                        </div>
                    </div>
                </div>
            </div>
        `},exportSafetyAlertPDFWithData(e){try{Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 PDF...");const i=`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Safety Alert - \u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 12mm 15mm;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        body {
            font-family: 'Tahoma', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            background: white;
            color: #1f2937;
            font-size: 11px;
            line-height: 1.4;
            padding: 0;
            margin: 0;
        }
        .content-wrapper {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding: 5px;
            page-break-inside: avoid;
            overflow: hidden;
        }
        img {
            max-width: 100%;
            height: auto;
            object-fit: contain;
            display: block;
        }
        .safety-alert-image-container {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        .safety-alert-image-container img {
            max-width: 100%;
            max-height: 350px;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            margin: 0 auto;
        }
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            .safety-alert-image-container {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            img {
                max-width: 100%;
                max-height: 350px;
                object-fit: contain;
            }
        }
    </style>
</head>
<body>
    <div class="content-wrapper">
        ${this.buildSafetyAlertPrintContent(e)}
    </div>
</body>
</html>`,a=new Blob([i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(a),o=window.open(n,"_blank");o?o.onload=()=>{const s=o.document.querySelectorAll("img");let r=0;const d=s.length;if(d===0){setTimeout(()=>{o.print(),setTimeout(()=>{URL.revokeObjectURL(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},800)},500);return}const l=()=>{r++,r>=d&&setTimeout(()=>{o.print(),setTimeout(()=>{URL.revokeObjectURL(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},800)},500)};s.forEach(c=>{c.complete?l():(c.onload=l,c.onerror=()=>{l()})}),setTimeout(()=>{r<d&&(o.print(),setTimeout(()=>{URL.revokeObjectURL(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},800))},3e3)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+t.message)}},async exportSafetyAlertPDF(e){try{let t=null;if(!e||e===""){const i=this.getSafetyAlertFormData();if(i){this.exportSafetyAlertPDFWithData(i);return}else{Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631. \u064A\u0631\u062C\u0649 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u0627\u064B.");return}}if(t=(AppState.appData?.safetyAlerts||[]).find(i=>i.id===e),!t){Notification.error("Safety Alert \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.exportSafetyAlertPDFWithData(t)}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+t.message)}}};(function(){"use strict";try{typeof window<"u"&&typeof Incidents<"u"&&(window.Incidents=Incidents,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Incidents module loaded and available on window.Incidents"))}catch{if(typeof window<"u"&&typeof Incidents<"u")try{window.Incidents=Incidents}catch{}}})();
