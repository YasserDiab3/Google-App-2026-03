const Violations={_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const i=e||document.getElementById("viol-analytics-root");i&&(typeof t.applyI18n=="function"&&t.applyI18n(i),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(i))},currentFilters:{search:"",personType:"",violationType:"",severity:"",status:""},parseFineAmount(e){if(e==null||e==="")return 0;if(typeof e=="number")return Number.isFinite(e)&&e>=0?e:0;const t="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",i="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",o=r=>String(r||"").replace(/[٠-٩۰-۹]/g,l=>{const c=t.indexOf(l);if(c>=0)return String(c);const d=i.indexOf(l);return d>=0?String(d):l}),a=String(e).trim(),s=o(a).replace(/[,\u066C]/g,"").replace(/\u066B/g,".").replace(/[^\d.\-]/g,""),n=Number(s);return Number.isFinite(n)&&n>=0?n:0},_VIOL_CURRENCY_KEY:"viol_currency",_VIOL_RATE_KEY:"viol_exchange_rate",_VIOL_DEFAULT_RATE:50,getCurrentCurrency(){try{return localStorage.getItem(this._VIOL_CURRENCY_KEY)==="USD"?"USD":"EGP"}catch{return"EGP"}},setCurrentCurrency(e){const t=e==="USD"?"USD":"EGP";try{localStorage.setItem(this._VIOL_CURRENCY_KEY,t)}catch{}return t},getExchangeRate(){try{const e=parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));return Number.isFinite(e)&&e>0?e:this._VIOL_DEFAULT_RATE}catch{return this._VIOL_DEFAULT_RATE}},setExchangeRate(e){const t=parseFloat(e);if(!Number.isFinite(t)||t<=0)return!1;try{localStorage.setItem(this._VIOL_RATE_KEY,String(t))}catch{}return!0},convertFineAmount(e,t){const i=t||this.getCurrentCurrency(),o=Number(e)||0;if(i==="USD"){const a=this.getExchangeRate();return a>0?o/a:0}return o},formatFineAmount(e,t={}){const i=t.currency||this.getCurrentCurrency(),o=i==="USD"?"$":"\u062C.\u0645",a=this.convertFineAmount(e,i),s=i==="USD"?a.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):a.toLocaleString("en-US",{maximumFractionDigits:0});return i==="USD"?`${s} $`:`${s} ${o}`},getCurrencyLabel(e="short"){return this.getCurrentCurrency()==="USD"?e==="long"?this._t("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):"$":e==="long"?this._t("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"):this._t("module.violations.analytics.currency.egp_short","\u062C.\u0645")},normalizeViolationRecord(e){if(!e||typeof e!="object")return null;try{const t=e.fineAmount??e.defaultFineAmount??e.fine_amount??e.fine??e.amount??e["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"]??e["\u0642\u064A\u0645\u0629 \u0645\u0627\u0644\u064A\u0629"]??0,i=this.parseFineAmount(t),o=e.personType||(e.contractorName?"contractor":"employee");let a="";try{typeof this.getResolvedViolationTime=="function"&&(a=this.getResolvedViolationTime(e))}catch{a=""}if(!a){let p=String(e.violationTime??e["\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"").trim();if(p&&p!=="\u2014"&&p!=="-"){const f=p.includes("1899-12-30")||p.includes("1899-12-31")||p.includes("1900-01-00"),m=p.match(/(?:T|\s|^)(\d{1,2}):(\d{2})/);if(m){const u=parseInt(m[1],10),g=parseInt(m[2],10);f&&(u===0||u===2||u===3)&&g===0||(a=`${String(u).padStart(2,"0")}:${String(g).padStart(2,"0")}`)}}}let s=String(e.contractorId||"").trim(),n=String(e.contractorCode||"").trim();(/^\d{4}-\d{2}-\d{2}/.test(s)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s))&&(s=""),(/^\d{4}-\d{2}-\d{2}/.test(n)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(n))&&(n="");let r=e.violationPlace??e["\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"";r&&(r=typeof this.formatLocationPlace=="function"?this.formatLocationPlace(r):String(r).replace(/\u0640+/g,"").replace(/_+/g," - ").trim());let l=e.violationLocation??e.\u0627\u0644\u0645\u0648\u0642\u0639??"";l&&(l=typeof this.formatLocationPlace=="function"?this.formatLocationPlace(l):String(l).replace(/\u0640+/g,"").replace(/_+/g," - ").trim());let c=String(e.violationTypeId||"").trim();if(/^VTYPE_/i.test(c)&&typeof this.getCleanViolationTypeCode=="function")try{c=this.getCleanViolationTypeCode(e)}catch{}let d=String(e.rootCause??e["\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A"]??e["\u0633\u0628\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"").trim();return{...e,personType:o,fineAmount:i,violationTime:a,violationTypeId:c,contractorId:s,contractorCode:n,violationPlace:r||e.violationPlace,violationLocation:l||e.violationLocation,rootCause:d||e.rootCause||""}}catch{return e}},_escapeIdForHandler(e){return JSON.stringify(e==null?"":String(e))},getEffectiveFineAmount(e){const t=this.normalizeViolationRecord(e);if(!t)return 0;const i=this.parseFineAmount(t.fineAmount);if(i>0)return i;let o=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll&&(ViolationTypesManager.ensureInitialized(),o=ViolationTypesManager.getAll()||[])}catch{o=[]}!o.length&&typeof AppState<"u"&&Array.isArray(AppState?.appData?.violationTypes)&&(o=AppState.appData.violationTypes);const a=String(t.violationTypeId||"").trim(),s=String(t.violationType||"").trim().toLowerCase();let n=0;if(a){const r=o.find(l=>l&&String(l.id)===a);r&&(n=this.parseFineAmount(r.fineAmount))}if(n<=0&&s){const r=o.find(l=>l&&String(l.name||"").trim().toLowerCase()===s);r&&(n=this.parseFineAmount(r.fineAmount))}return n>0?n:i},_normKeyStr(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},sameViolationPersonForSequence(e,t){const i=this._normKeyStr(e.personType)||"employee",o=this._normKeyStr(t.personType)||"employee";if(i!==o)return!1;if(i==="contractor"){const l=this._normKeyStr(e.contractorWorker),c=this._normKeyStr(t.contractorWorker);if(l&&c&&l===c)return!0;const d=this._normKeyStr(e.contractorId),p=this._normKeyStr(t.contractorId);if(d&&p&&d===p)return!l&&!c?!0:!l||!c||l===c;const f=this._normKeyStr(e.contractorName),m=this._normKeyStr(t.contractorName);return!f||!m||f!==m?!1:!l&&!c?!0:l===c}const a=this._normKeyStr(e.employeeCode||e.employeeNumber),s=this._normKeyStr(t.employeeCode||t.employeeNumber);if(a&&s)return a===s;const n=this._normKeyStr(e.employeeName),r=this._normKeyStr(t.employeeName);return!!n&&n===r},getViolationYearMonthKey(e){const t=new Date(e);return isNaN(t.getTime())?null:t.getFullYear()*12+t.getMonth()},_recentViolationDupKeys:[],_violationSubmitLock:!1,_violationInflightDupKey:"",_violationDateKey(e){const t=e&&e.violationDate;if(t==null||t==="")return"";const i=String(t).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(i))return i;const o=new Date(i);if(!isNaN(o.getTime())){const s=o.getFullYear(),n=String(o.getMonth()+1).padStart(2,"0"),r=String(o.getDate()).padStart(2,"0");return`${s}-${n}-${r}`}const a=i.match(/^(\d{4}-\d{2}-\d{2})/);return a?a[1]:""},formatLocationPlace(e){if(!e)return"\u2014";let t=String(e).trim();return!t||t==="\u2014"||t==="-"?"\u2014":(t=t.replace(/\u0640+/g,""),t=t.replace(/[\u200B-\u200F\uFEFF]/g,""),t=t.replace(/_+/g," - "),t=t.replace(/\s*-\s*-\s*/g," - ").replace(/\s+/g," ").trim(),t||"\u2014")},getCleanContractorCode(e){if(!e)return"\u2014";let t=String(e.contractorCode||e.contractorId||"").trim();const i=/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(t);if(!t||i||t==="\u2014"||t==="-"){if(e.contractorName&&typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function")try{const o=Contractors.resolveContractorForAnalytics("",e.contractorName);if(o){const a=String(o.code||o.contractorCode||o.isoCode||o.id||"").trim();if(a&&!/^\d{4}-\d{2}-\d{2}/.test(a))return a}}catch{}if(e.contractorName&&typeof AppState<"u"&&Array.isArray(AppState.appData?.approvedContractors)){const o=String(e.contractorName).trim().toLowerCase(),a=AppState.appData.approvedContractors.find(s=>{const n=String(s.companyName||s.name||"").trim().toLowerCase();return n&&(n===o||n.includes(o)||o.includes(n))});if(a){const s=String(a.code||a.contractorCode||a.isoCode||a.id||"").trim();if(s&&!/^\d{4}-\d{2}-\d{2}/.test(s))return s}}return"\u2014"}return t},getResolvedViolationTime(e){if(!e)return"";try{const t=e.violationTime??e["\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??e.time;if(t!=null&&t!==""&&t!=="\u2014"&&t!=="-"){const n=String(t).trim();if(/^0\.\d+$/.test(n)){const l=parseFloat(n),c=Math.round(l*24*60),d=Math.floor(c/60),p=c%60;return`${String(d).padStart(2,"0")}:${String(p).padStart(2,"0")}`}const r=n.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);if(r){const l=n.includes("1899-12-30")||n.includes("1899-12-31")||n.includes("1900-01-00");let c=parseInt(r[1],10);const d=String(r[2]||"00").padStart(2,"0"),p=String(r[4]||"").toUpperCase();if(p==="PM"||p==="\u0645"?c<12&&(c+=12):(p==="AM"||p==="\u0635")&&c===12&&(c=0),!(l&&(c===0||c===2||c===3)&&(d==="00"||d==="0")))return`${String(c).padStart(2,"0")}:${d}`}}const i=e.violationDate??e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??e.date;if(i&&typeof i=="string"&&(i.includes("T")||i.includes(" "))){const n=new Date(i);if(!isNaN(n.getTime())){const r=n.getHours(),l=n.getMinutes(),c=n.getSeconds();if(!((r===0||r===2||r===3)&&l===0&&c===0)&&(r!==0||l!==0))return`${String(r).padStart(2,"0")}:${String(l).padStart(2,"0")}`}}const a=String(e.id||"").trim().match(/VIOLATION_(\d{13})_/);if(a){const n=parseInt(a[1],10);if(!isNaN(n)&&n>16e11){const r=new Date(n);if(!isNaN(r.getTime())){const l=r.getHours(),c=r.getMinutes();return`${String(l).padStart(2,"0")}:${String(c).padStart(2,"0")}`}}}const s=e.createdAt??e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621"]??e.timestamp;if(s&&typeof s=="string"&&(s.includes("T")||s.includes(" "))){const n=new Date(s);if(!isNaN(n.getTime())){const r=n.getHours(),l=n.getMinutes(),c=n.getSeconds();if(!((r===0||r===2||r===3)&&l===0&&c===0)&&(r!==0||l!==0))return`${String(r).padStart(2,"0")}:${String(l).padStart(2,"0")}`}}return""}catch{return""}},getCleanViolationTypeCode(e){if(!e)return"\u2014";const t=String(e.violationTypeId||"").trim(),i=String(e.violationType||"").trim().toLowerCase();let o=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.getAll&&(o=ViolationTypesManager.getAll()||[])}catch{}!o.length&&typeof AppState<"u"&&Array.isArray(AppState.appData?.violationTypes)&&(o=AppState.appData.violationTypes);const a=o.find(s=>t&&String(s.id).trim()===t||i&&String(s.name||"").trim().toLowerCase()===i);if(a){const s=a.code||a.isoCode||a.typeCode;let n="";if(s&&!s.startsWith("VTYPE_"))n=s;else{const r=o.findIndex(l=>l.id===a.id);n=`VT-${String(r>=0?r+1:1).padStart(2,"0")}`}return a.category?`${n} (${a.category})`:n}return/^VTYPE_/i.test(t)?"VT-01":t||"\u2014"},formatViolationTime(e){if(!e)return"";try{const t=String(e).trim();if(!t||t==="\u2014"||t==="-"||/^\d{4}-\d{2}-\d{2}$/.test(t)||/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t))return"";const i=t.includes("1899-12-30")||t.includes("1899-12-31")||t.includes("1900-01-00"),o=t.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);if(!o)return"";let a=parseInt(o[1],10);const s=String(o[2]||"00").padStart(2,"0"),n=String(o[4]||"").toUpperCase();if(i&&a===0&&(s==="00"||s==="0"))return"";n==="PM"||n==="\u0645"?a<12&&(a+=12):(n==="AM"||n==="\u0635")&&a===12&&(a=0);const r=a>=12?"\u0645":"\u0635";return`${a%12||12}:${s} ${r}`}catch{return""}},_violationTimeKey(e){const i=String(e&&e.violationTime||"").trim().match(/(\d{1,2}):(\d{2})/);if(i)return`${String(Number(i[1])).padStart(2,"0")}:${i[2]}`;const o=new Date(e&&e.violationDate);return isNaN(o.getTime())?"":`${String(o.getHours()).padStart(2,"0")}:${String(o.getMinutes()).padStart(2,"0")}`},_sameViolationTextField(e,t){const i=this._normKeyStr(e),o=this._normKeyStr(t);return!i&&!o?!0:!!i&&i===o},isDuplicateViolationRecord(e,t){if(!e||!t||!this.sameViolationPersonForSequence(e,t)||this._violationDateKey(e)!==this._violationDateKey(t)||this._violationTimeKey(e)!==this._violationTimeKey(t))return!1;const i=this._normKeyStr(e.violationTypeId||e.violationType),o=this._normKeyStr(t.violationTypeId||t.violationType);if(i!==o)return!1;const a=this._normKeyStr(e.violationLocationId),s=this._normKeyStr(t.violationLocationId);if(a&&s){if(a!==s)return!1}else if(!this._sameViolationTextField(e.violationLocation,t.violationLocation))return!1;const n=this._normKeyStr(e.violationPlaceId),r=this._normKeyStr(t.violationPlaceId);if(n&&r){if(n!==r)return!1}else if(!this._sameViolationTextField(e.violationPlace,t.violationPlace))return!1;return!0},_buildViolationDupKey(e){const t=this._normKeyStr(e&&e.personType)||"employee",i=t==="contractor"?`${this._normKeyStr(e.contractorName)}|${this._normKeyStr(e.contractorWorker)}`:this._normKeyStr(e&&(e.employeeCode||e.employeeNumber)||"");return[t,i,this._violationDateKey(e),this._violationTimeKey(e),this._normKeyStr(e&&(e.violationTypeId||e.violationType)||""),this._normKeyStr(e&&(e.violationLocationId||e.violationLocation)||""),this._normKeyStr(e&&(e.violationPlaceId||e.violationPlace)||""),this._normKeyStr(e&&e.violationDetails||"")].join("||")},_rememberViolationDupKey(e){Array.isArray(this._recentViolationDupKeys)||(this._recentViolationDupKeys=[]);const t=this._buildViolationDupKey(e);if(!t)return;const i=Date.now();this._recentViolationDupKeys=this._recentViolationDupKeys.filter(o=>o&&i-o.at<6e5),this._recentViolationDupKeys.some(o=>o.key===t)||this._recentViolationDupKeys.push({key:t,at:i})},findDuplicateViolation(e,t={}){if(!e)return null;const i=t.excludeId?String(t.excludeId):"",o=typeof AppState<"u"&&AppState.appData&&AppState.appData.violations||[];for(let r=0;r<o.length;r++){const l=o[r];if(l&&!(i&&String(l.id)===i)&&this.isDuplicateViolationRecord(e,l))return{source:"saved",record:l}}const a=this._violApprovalRequestsCache||[];for(let r=0;r<a.length;r++){const l=a[r];if(!l||String(l.status||"").toLowerCase()!=="pending")continue;const d=l.violationData||{};if(!(i&&(String(d.id||"")===i||String(l.originalViolationId||"")===i))&&this.isDuplicateViolationRecord(e,d))return{source:"pending",record:d,request:l}}const s=Date.now();Array.isArray(this._recentViolationDupKeys)||(this._recentViolationDupKeys=[]),this._recentViolationDupKeys=this._recentViolationDupKeys.filter(r=>r&&s-r.at<6e5);const n=this._buildViolationDupKey(e);return n&&this._violationInflightDupKey&&n===this._violationInflightDupKey?{source:"inflight"}:n&&this._recentViolationDupKeys.some(r=>r.key===n)?{source:"recent"}:null},_violApprovalSettingsCache:null,_violApprovalSettingsCacheAt:0,_violApprovalRequestsCache:null,_violApprovalRequestsCacheAt:0,_violApprovalRequestsCacheKey:"",async getViolationApprovalSettings(){const e=Date.now();if(this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5)return this._violApprovalSettingsCache;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const t=await GoogleIntegration.sendRequest({action:"getViolationApprovalSettings",data:{__timeoutMs:2e4}});if(t&&t.success&&t.data)return this._violApprovalSettingsCache={requireApproval:t.data.requireApproval===!0,defaultApprovers:Array.isArray(t.data.defaultApprovers)?t.data.defaultApprovers:[],bypassRoles:Array.isArray(t.data.bypassRoles)?t.data.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]},this._violApprovalSettingsCacheAt=e,this._violApprovalSettingsCache}}catch(t){AppState.debugMode&&Utils.safeWarn("getViolationApprovalSettings:",t)}return{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},isCurrentUserBypassApproval(e){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState.currentUser?.role||"";if(Array.isArray(e)&&e.length>0){const i=String(t).toLowerCase();return e.some(o=>String(o).toLowerCase()===i||String(o)===t)}}catch{}return!1},async checkViolationApprovalGate(e,t={}){const i=await this.getViolationApprovalSettings();return!i||!i.requireApproval?{requiresApproval:!1,settings:i}:this.isCurrentUserBypassApproval(i.bypassRoles)?{requiresApproval:!1,settings:i,bypassed:!0}:!Array.isArray(i.defaultApprovers)||i.defaultApprovers.length===0?(AppState.debugMode&&Utils.safeWarn("approval required but no approvers configured \u2014 allowing direct save"),{requiresApproval:!1,settings:i,reason:"no_approvers"}):{requiresApproval:!0,settings:i}},async submitViolationForApproval(e,t={}){try{const o=((await this.getViolationApprovalSettings()).defaultApprovers||[]).slice(),a=AppState.currentUser||{},s={requestType:t.isEdit?"update":"add",violationData:e,originalViolationId:t.originalId||"",approvers:o,createdBy:a.id||a.email||"",createdByName:a.name||a.email||"",notes:t.notes||""};return await GoogleIntegration.sendRequest({action:"addViolationApprovalRequest",data:{...s,__timeoutMs:3e4}})||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"}}catch(i){return{success:!1,message:i?.message||String(i)}}},async fetchViolationApprovalRequests(e={}){try{const t=await GoogleIntegration.sendRequest({action:"getAllViolationApprovalRequests",data:{...e,__timeoutMs:25e3}});return t&&t.success&&Array.isArray(t.data)?t.data:[]}catch(t){return AppState.debugMode&&Utils.safeWarn("fetchViolationApprovalRequests:",t),[]}},async approveViolationRequest(e,t={}){const i=AppState.currentUser||{},o={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const a=await GoogleIntegration.sendRequest({action:"approveViolationApprovalRequest",data:{requestId:e,approver:o,notes:t.notes||"",force:t.force===!0,__timeoutMs:3e4}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),a||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(a){return{success:!1,message:a?.message||String(a)}}},async rejectViolationRequest(e,t){const i=AppState.currentUser||{},o={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const a=await GoogleIntegration.sendRequest({action:"rejectViolationApprovalRequest",data:{requestId:e,approver:o,reason:String(t||"").trim(),__timeoutMs:3e4}});return this._invalidateViolationApprovalRequestsCache(),a||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(a){return{success:!1,message:a?.message||String(a)}}},async saveViolationApprovalSettings(e){const t=AppState.currentUser||{};try{const i=await GoogleIntegration.sendRequest({action:"updateViolationApprovalSettings",data:{requireApproval:e.requireApproval===!0,defaultApprovers:Array.isArray(e.defaultApprovers)?e.defaultApprovers:[],bypassRoles:Array.isArray(e.bypassRoles)?e.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"],updatedBy:t.id||t.email||"",updatedByName:t.name||"",__timeoutMs:25e3}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),i||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(i){return{success:!1,message:i?.message||String(i)}}},_getViolationApprovalRequestsCacheKey(e,t){return e?"admin":String(t?.email||t?.id||"user")},_getCachedViolationApprovalRequests(e,t){const i=this._getViolationApprovalRequestsCacheKey(e,t),o=Date.now();return this._violApprovalRequestsCache&&this._violApprovalRequestsCacheKey===i&&o-this._violApprovalRequestsCacheAt<12e4?this._violApprovalRequestsCache:null},_setCachedViolationApprovalRequests(e,t,i){this._violApprovalRequestsCache=Array.isArray(e)?e:[],this._violApprovalRequestsCacheKey=this._getViolationApprovalRequestsCacheKey(t,i),this._violApprovalRequestsCacheAt=Date.now()},_invalidateViolationApprovalRequestsCache(){this._violApprovalRequestsCache=null,this._violApprovalRequestsCacheAt=0,this._violApprovalRequestsCacheKey=""},_cloneViolationApprovalSettings(e){const t=e||{};return{requireApproval:t.requireApproval===!0,defaultApprovers:Array.isArray(t.defaultApprovers)?t.defaultApprovers.map(i=>({...i})):[],bypassRoles:Array.isArray(t.bypassRoles)?[...t.bypassRoles]:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_getViolationApprovalSettingsSnapshot(){const e=Date.now();return this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5?this._cloneViolationApprovalSettings(this._violApprovalSettingsCache):{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_prefetchViolationApprovalPanelData(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i={userEmail:e?"":t.email||"",userId:e?"":t.id||""};Promise.all([this.getViolationApprovalSettings(),this.fetchViolationApprovalRequests(i)]).then(([,o])=>{this._setCachedViolationApprovalRequests(o,e,t),this._updateViolationApprovalsHeaderBadge(o)}).catch(()=>{})},_updateViolationApprovalsHeaderBadge(e){const t=document.getElementById("viol-approvals-pending-badge");if(!t)return;const o=(Array.isArray(e)?e:this._violApprovalRequestsCache||[]).filter(a=>a&&String(a.status||"").toLowerCase()==="pending").length;o>0?(t.hidden=!1,t.textContent=String(o),t.setAttribute("aria-label",String(o))):(t.hidden=!0,t.textContent="")},_sameViolationApproverIdentity(e,t){const i=n=>String(n||"").trim().toLowerCase(),o=n=>[i(n?.userId),i(n?.id),i(n?.email),i(n?.userEmail)].filter(Boolean),a=o(e),s=o(t);return a.some(n=>s.includes(n))},_isCurrentViolationApprover(e){if(!e||String(e.status||"").toLowerCase()!=="pending")return!1;const t=Array.isArray(e.approvers)?e.approvers:[],i=parseInt(e.currentApproverIndex,10)||0,o=t[i];return o?this._sameViolationApproverIdentity(o,AppState.currentUser||{}):!1},_canActOnViolationApproval(e,t){return!!(e&&String(e.status||"").toLowerCase()==="pending"&&(t||this._isCurrentViolationApprover(e)))},_filterViolationApprovalRequests(e){const t=e&&e.filter||"pending",i=String(e&&e.query||"").trim().toLowerCase();let o=Array.isArray(e?.requests)?e.requests.slice():[];return t==="approved"?o=o.filter(a=>["approved","committed"].includes(String(a.status||"").toLowerCase())):t!=="all"&&(o=o.filter(a=>String(a.status||"").toLowerCase()===t)),i&&(o=o.filter(a=>{const s=a.violationData||{};return[a.id,a.createdByName,a.createdBy,s.employeeName,s.contractorName,s.contractorWorker,s.violationType,s.violationLocation,s.violationPlace,s.violationDetails].join(" ").toLowerCase().includes(i)})),o.sort((a,s)=>{const n=this._isCurrentViolationApprover(a)?0:1,r=this._isCurrentViolationApprover(s)?0:1;return n!==r?n-r:new Date(s.createdAt||0).getTime()-new Date(a.createdAt||0).getTime()}),o},_countViolationApprovalsByFilter(e,t){const i=Array.isArray(e)?e:[];return t==="all"?i.length:t==="approved"?i.filter(o=>["approved","committed"].includes(String(o.status||"").toLowerCase())).length:i.filter(o=>String(o.status||"").toLowerCase()===t).length},_ensureViolationApprovalsStyles(){if(document.getElementById("viol-approvals-ux-css"))return;const e=document.createElement("style");e.id="viol-approvals-ux-css",e.textContent=`
            .vap-nav-badge{display:inline-flex;align-items:center;justify-content:center;min-width:1.35rem;height:1.35rem;padding:0 .35rem;margin-inline-start:.4rem;border-radius:999px;background:#fff;color:#b91c1c;font-size:.72rem;font-weight:800;line-height:1;}
            .vap-shell{background:var(--vap-bg,#fff);color:var(--vap-fg,#0f172a);border-radius:18px;max-width:1080px;width:100%;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 48px rgba(15,23,42,.28);}
            .vap-head{background:linear-gradient(135deg,#b91c1c,#7f1d1d);color:#fff;padding:18px 22px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
            .vap-head h3{margin:0;font-size:1.2rem;font-weight:800;letter-spacing:-.01em;}
            .vap-head p{margin:.28rem 0 0;font-size:.82rem;opacity:.88;line-height:1.45;max-width:42rem;}
            .vap-close{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);border-radius:10px;color:#fff;width:40px;height:40px;cursor:pointer;font-size:1.25rem;flex-shrink:0;}
            .vap-close:hover,.vap-close:focus-visible{background:rgba(255,255,255,.28);outline:none;}
            .vap-tabs{display:flex;gap:6px;padding:10px 16px 0;background:inherit;}
            .vap-tab{border:none;background:transparent;color:inherit;opacity:.55;padding:10px 14px;border-radius:10px 10px 0 0;cursor:pointer;font-weight:700;font-size:.9rem;}
            .vap-tab.is-active{opacity:1;background:rgba(127,29,29,.08);}
            .vap-body{padding:16px 18px 20px;overflow:auto;flex:1;}
            .vap-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px;}
            .vap-filters{display:flex;flex-wrap:wrap;gap:6px;}
            .vap-chip{border:1px solid #e2e8f0;background:#f8fafc;color:#334155;padding:7px 12px;border-radius:999px;cursor:pointer;font-size:.82rem;font-weight:650;}
            .vap-chip .vap-n{margin-inline-start:.35rem;opacity:.7;font-variant-numeric:tabular-nums;}
            .vap-chip.is-active{background:#0f172a;color:#fff;border-color:#0f172a;}
            .vap-search{flex:1;min-width:180px;position:relative;}
            .vap-search input{width:100%;border:1px solid #e2e8f0;border-radius:12px;padding:9px 12px;padding-inline-start:36px;font-size:.9rem;background:#fff;}
            .vap-search i{position:absolute;inset-inline-start:12px;top:50%;transform:translateY(-50%);color:#94a3b8;pointer-events:none;}
            .vap-card{background:#fff;border:1px solid #e8edf4;border-radius:16px;padding:14px 16px;margin-bottom:10px;box-shadow:0 8px 18px rgba(15,23,42,.05);}
            .vap-card.is-mine{border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,.18);}
            .vap-mine-flag{display:inline-flex;align-items:center;gap:6px;background:#fffbeb;color:#92400e;border:1px solid #fcd34d;border-radius:999px;padding:4px 10px;font-size:.75rem;font-weight:800;margin-bottom:8px;}
            .vap-summary{background:#fffbeb;border:1px solid #fde68a;color:#92400e;border-radius:14px;padding:10px 14px;margin-bottom:12px;font-size:.88rem;font-weight:700;display:flex;align-items:center;gap:8px;}
            .vap-summary[hidden]{display:none;}
            .vap-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;}
            .vap-person{font-weight:800;font-size:.98rem;color:#0f172a;}
            .vap-meta{font-size:.78rem;color:#64748b;margin-top:4px;line-height:1.5;}
            .vap-badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;font-size:.72rem;font-weight:800;}
            .vap-badge-pending{background:#fef3c7;color:#92400e;}
            .vap-badge-ok{background:#dcfce7;color:#166534;}
            .vap-badge-no{background:#fee2e2;color:#991b1b;}
            .vap-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;font-size:.8rem;color:#475569;background:#f8fafc;padding:10px 12px;border-radius:12px;margin:10px 0;}
            .vap-grid strong{color:#0f172a;}
            .vap-steps{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 0 10px;padding:0;}
            .vap-step{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:12px;background:#f1f5f9;color:#64748b;font-size:.78rem;max-width:100%;}
            .vap-step-num{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.72rem;background:#cbd5e1;color:#0f172a;flex-shrink:0;}
            .vap-step.is-done{background:#ecfdf5;color:#166534;}
            .vap-step.is-done .vap-step-num{background:#16a34a;color:#fff;}
            .vap-step.is-current{background:#fffbeb;color:#92400e;box-shadow:inset 0 0 0 1px #fcd34d;}
            .vap-step.is-current .vap-step-num{background:#d97706;color:#fff;}
            .vap-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;}
            .vap-btn{border:none;border-radius:11px;padding:9px 16px;cursor:pointer;font-weight:750;font-size:.86rem;min-height:40px;}
            .vap-btn:focus-visible{outline:2px solid #b91c1c;outline-offset:2px;}
            .vap-btn-ok{background:#15803d;color:#fff;}
            .vap-btn-no{background:#fff;color:#b91c1c;border:1px solid #fecaca;}
            .vap-btn:disabled{opacity:.65;cursor:wait;}
            .vap-empty{text-align:center;padding:40px 16px;color:#64748b;background:#f8fafc;border-radius:16px;}
            .vap-empty i{font-size:1.8rem;color:#cbd5e1;margin-bottom:10px;display:block;}
            .vap-settings{background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:16px;}
            .vap-toggle{display:flex;align-items:flex-start;gap:12px;cursor:pointer;margin:12px 0 16px;}
            .vap-toggle input{width:18px;height:18px;margin-top:2px;}
            .vap-approver-row{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:8px 10px;margin-bottom:6px;}
            .vap-approver-row .ord{width:26px;height:26px;border-radius:8px;background:#0f172a;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800;flex-shrink:0;}
            .vap-icon-btn{border:none;background:#f1f5f9;color:#334155;width:32px;height:32px;border-radius:8px;cursor:pointer;}
            .vap-icon-btn:hover{background:#e2e8f0;}
            .vap-sheet{position:absolute;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-end;justify-content:center;padding:16px;z-index:2;}
            .vap-sheet[hidden]{display:none;}
            .vap-sheet-card{background:#fff;border-radius:16px 16px 12px 12px;padding:18px;width:min(520px,100%);box-shadow:0 16px 40px rgba(0,0,0,.2);}
            .vap-sheet textarea{width:100%;min-height:96px;border:1px solid #e2e8f0;border-radius:12px;padding:10px;font:inherit;resize:vertical;}
            .vap-shell{position:relative;}
            [data-theme="dark"] .vap-shell{--vap-bg:#0f172a;--vap-fg:#e2e8f0;}
            [data-theme="dark"] .vap-card,[data-theme="dark"] .vap-sheet-card,[data-theme="dark"] .vap-search input,[data-theme="dark"] .vap-settings,[data-theme="dark"] .vap-approver-row{background:#1e293b;border-color:#334155;color:#e2e8f0;}
            [data-theme="dark"] .vap-grid,[data-theme="dark"] .vap-empty,[data-theme="dark"] .vap-chip{background:#0f172a;border-color:#334155;color:#cbd5e1;}
            [data-theme="dark"] .vap-chip.is-active{background:#f8fafc;color:#0f172a;}
            [data-theme="dark"] .vap-person,[data-theme="dark"] .vap-grid strong{color:#f8fafc;}
            [data-theme="dark"] .vap-tab.is-active{background:rgba(255,255,255,.08);}
            @media (max-width:640px){
                .vap-head{padding:14px 14px;}
                .vap-body{padding:12px;}
                .vap-actions{justify-content:stretch;}
                .vap-btn{flex:1;}
            }
        `,document.head.appendChild(e)},_buildViolationApprovalsSettingsHtml(e,t,i){if(!t)return"";const o=(n,r)=>this._t(n,r),a=e||{requireApproval:!1,defaultApprovers:[]},s=Array.isArray(a.defaultApprovers)?a.defaultApprovers:[];return`
                    <div id="viol-approvals-settings-panel" class="vap-settings">
                        <h4 style="margin:0;font-size:1rem;font-weight:800;">${o("module.violations.approvals.settingsTitle","\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0648\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646")}</h4>
                        <p style="margin:6px 0 0;font-size:.82rem;color:#9a3412;line-height:1.5;">${o("module.violations.approvals.settingsLead","\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0647\u0648 \u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0627\u0644\u0645\u062F\u064A\u0631 \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638.")}</p>
                        <label class="vap-toggle">
                            <input type="checkbox" id="viol-require-approval" ${a.requireApproval?"checked":""}>
                            <span style="font-weight:700;">${o("module.violations.approvals.enable","\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0642\u0628\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")}</span>
                        </label>
                        <div style="font-weight:700;margin-bottom:8px;">${o("module.violations.approvals.approvers","\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u0639\u064A\u0651\u064E\u0646\u0648\u0646")}</div>
                        <div id="viol-approvers-list">
                            ${s.length?s.map((n,r)=>`
                                <div class="vap-approver-row" data-approver-idx="${r}">
                                    <span class="ord">${r+1}</span>
                                    <span style="flex:1;font-weight:650;">${Utils.escapeHTML(n.userName||n.userEmail||n.userId||"?")}</span>
                                    <button type="button" class="vap-icon-btn viol-approver-up" data-idx="${r}" title="${o("module.violations.approvals.moveUp","\u062A\u0642\u062F\u064A\u0645")}" ${r===0?"disabled":""}><i class="fas fa-arrow-up"></i></button>
                                    <button type="button" class="vap-icon-btn viol-approver-down" data-idx="${r}" title="${o("module.violations.approvals.moveDown","\u062A\u0623\u062E\u064A\u0631")}" ${r===s.length-1?"disabled":""}><i class="fas fa-arrow-down"></i></button>
                                    <button type="button" class="vap-icon-btn viol-remove-approver" data-idx="${r}" title="${o("module.violations.approvals.remove","\u0625\u0632\u0627\u0644\u0629")}" style="color:#b91c1c;"><i class="fas fa-times"></i></button>
                                </div>
                            `).join(""):`<div class="vap-empty" style="padding:16px;">${o("module.violations.approvals.noApprovers","\u0623\u0636\u0641 \u0645\u0639\u062A\u0645\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u062D\u062A\u0649 \u062A\u0639\u0645\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629")}</div>`}
                        </div>
                        <div style="display:flex;gap:8px;align-items:flex-end;margin-top:12px;flex-wrap:wrap;">
                            <div style="flex:1;min-width:200px;">
                                <label style="display:block;font-size:.8rem;margin-bottom:4px;">${o("module.violations.approvals.addApprover","\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u062A\u0645\u062F")}</label>
                                <select id="viol-add-approver-select" class="form-input" style="width:100%;padding:9px;border:1px solid #d1d5db;border-radius:10px;">
                                    <option value="">${o("module.violations.approvals.chooseUser","\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B")}</option>
                                    ${(i||[]).map(n=>`
                                        <option value="${Utils.escapeHTML(String(n.id||n.email||""))}"
                                                data-name="${Utils.escapeHTML(String(n.name||""))}"
                                                data-email="${Utils.escapeHTML(String(n.email||""))}"
                                                data-role="${Utils.escapeHTML(String(n.role||""))}">
                                            ${Utils.escapeHTML(n.name||n.email||n.id)} ${n.role?"("+Utils.escapeHTML(n.role)+")":""}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <button type="button" id="viol-add-approver-btn" class="vap-btn" style="background:#1e3a8a;color:#fff;">
                                <i class="fas fa-plus"></i> ${o("module.violations.approvals.add","\u0625\u0636\u0627\u0641\u0629")}
                            </button>
                        </div>
                        <div style="margin-top:14px;display:flex;justify-content:flex-end;">
                            <button type="button" id="viol-save-settings-btn" class="vap-btn vap-btn-ok">
                                <i class="fas fa-save"></i> ${o("module.violations.approvals.save","\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}
                            </button>
                        </div>
                    </div>`},_buildViolationApprovalsRequestsHtml(e){const t=(o,a)=>this._t(o,a);if(e.loading)return`<div class="vap-empty">
                <i class="fas fa-spinner fa-spin"></i>
                ${t("module.violations.approvals.loading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A\u2026")}
            </div>`;const i=this._filterViolationApprovalRequests(e);return this._renderViolationApprovalRequests(i,{isAdmin:e.isAdmin})},_renderViolationApprovalFilterBar(e){const t=(a,s)=>this._t(a,s),i=e&&e.filter||"pending";return[["pending","module.violations.approvals.filter.pending","\u0645\u0639\u0644\u0651\u0642\u0629"],["approved","module.violations.approvals.filter.approved","\u0645\u0639\u062A\u0645\u062F\u0629"],["rejected","module.violations.approvals.filter.rejected","\u0645\u0631\u0641\u0648\u0636\u0629"],["all","module.violations.approvals.filter.all","\u0627\u0644\u0643\u0644"]].map(([a,s,n])=>{const r=this._countViolationApprovalsByFilter(e.requests,a);return`<button type="button" class="vap-chip viol-req-filter${i===a?" is-active viol-req-filter-active":""}" data-filter="${a}">
                ${t(s,n)}<span class="vap-n">${r}</span>
            </button>`}).join("")},_refreshViolationApprovalsModalBody(e,t,i={}){const o=this._countViolationApprovalsByFilter(t.requests,"pending"),a=e.querySelector("#viol-approval-pending-count");a&&(a.textContent=t.loading?"\u2026":String(o)),this._updateViolationApprovalsHeaderBadge(t.requests);const s=e.querySelector("#vap-filters");s&&(s.innerHTML=this._renderViolationApprovalFilterBar(t));const n=e.querySelector("#vap-mine-summary");if(n){const c=(t.requests||[]).filter(d=>this._isCurrentViolationApprover(d)).length;c>0&&(t.filter==="pending"||t.filter==="all")?(n.hidden=!1,n.innerHTML=`<i class="fas fa-bell"></i> \u0644\u062F\u064A\u0643 ${c} \u0637\u0644\u0628 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0643 \u2014 \u0638\u0627\u0647\u0631\u0629 \u0623\u0648\u0644\u0627\u064B \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629`):(n.hidden=!0,n.textContent="")}const r=e.querySelector("#vap-search-input");if(r&&r.value!==(t.query||"")&&(r.value=t.query||""),i.settings!==!1){const c=e.querySelector("#viol-approvals-settings-panel");if(c&&t.isAdmin){const d=document.createElement("div");d.innerHTML=this._buildViolationApprovalsSettingsHtml(t.settings,!0,t.allUsers);const p=d.firstElementChild;p&&c.replaceWith(p)}}const l=e.querySelector("#viol-approval-requests-list");l&&(l.innerHTML=this._buildViolationApprovalsRequestsHtml(t),this._wireViolationApprovalActions(e,t.isAdmin))},async _loadViolationApprovalsPanelData(e,t){try{const[i,o]=await Promise.all([this.fetchViolationApprovalRequests(t.filters),this.getViolationApprovalSettings()]);if(!e.isConnected)return;t.requests=Array.isArray(i)?i:[],t.settings=this._cloneViolationApprovalSettings(o),t.loading=!1,this._setCachedViolationApprovalRequests(t.requests,t.isAdmin,AppState.currentUser||{}),this._refreshViolationApprovalsModalBody(e,t)}catch(i){if(!e.isConnected)return;t.loading=!1;const o=e.querySelector("#viol-approval-requests-list");o&&(o.innerHTML=`<div class="vap-empty" style="color:#b91c1c;background:#fef2f2;">
                    <i class="fas fa-exclamation-circle"></i>
                    ${this._t("module.violations.approvals.loadError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u2014 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                    <div style="margin-top:12px;"><button type="button" class="vap-btn" id="vap-retry-load" style="background:#0f172a;color:#fff;">${this._t("module.violations.approvals.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}</button></div>
                </div>`),AppState.debugMode&&Utils.safeWarn("_loadViolationApprovalsPanelData:",i)}},_bindViolationApprovalsModalEvents(e){if(e._violApprovalsEventsBound)return;e._violApprovalsEventsBound=!0;const t=()=>e._violApprovalState,i=(a,s)=>this._t(a,s),o=()=>{document.removeEventListener("keydown",e._vapEsc),e.remove()};e._vapEsc=a=>{if(a.key==="Escape"){const s=e.querySelector("#vap-reject-sheet");if(s&&!s.hidden){s.hidden=!0;return}o()}},document.addEventListener("keydown",e._vapEsc),e.addEventListener("click",a=>{if(a.target===e){o();return}if(a.target.closest("#viol-approvals-close")){o();return}const s=a.target.closest("[data-vap-tab]");if(s){const d=s.getAttribute("data-vap-tab");e.querySelectorAll("[data-vap-tab]").forEach(p=>p.classList.toggle("is-active",p===s)),e.querySelectorAll("[data-vap-pane]").forEach(p=>{p.hidden=p.getAttribute("data-vap-pane")!==d});return}if(a.target.closest("#vap-retry-load")){const d=t();if(!d)return;d.loading=!0,this._refreshViolationApprovalsModalBody(e,d),this._loadViolationApprovalsPanelData(e,d);return}const n=a.target.closest(".viol-approver-up");if(n){const d=parseInt(n.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d)||d<=0)return;const f=p.settings.defaultApprovers;[f[d-1],f[d]]=[f[d],f[d-1]],this._refreshViolationApprovalsModalBody(e,p);return}const r=a.target.closest(".viol-approver-down");if(r){const d=parseInt(r.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d))return;const f=p.settings.defaultApprovers;if(d>=f.length-1)return;[f[d+1],f[d]]=[f[d],f[d+1]],this._refreshViolationApprovalsModalBody(e,p);return}const l=a.target.closest(".viol-remove-approver");if(l){const d=parseInt(l.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d))return;p.settings.defaultApprovers.splice(d,1),this._refreshViolationApprovalsModalBody(e,p);return}const c=a.target.closest(".viol-req-filter");if(c){const d=t();if(!d)return;d.filter=c.getAttribute("data-filter")||"pending",this._refreshViolationApprovalsModalBody(e,d,{settings:!1});return}if(a.target.closest("#viol-add-approver-btn")){const d=t();if(!d)return;const p=e.querySelector("#viol-add-approver-select"),f=p?.value;if(!f){Notification.warning(i("module.violations.approvals.pickUser","\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0623\u0648\u0644\u0627\u064B"));return}const m=p.options[p.selectedIndex],u={userId:f,userName:m?.dataset?.name||"",userEmail:m?.dataset?.email||"",role:m?.dataset?.role||""};if(d.settings.defaultApprovers.some(g=>g.userId===u.userId)){Notification.warning(i("module.violations.approvals.alreadyAdded","\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0636\u0627\u0641 \u0628\u0627\u0644\u0641\u0639\u0644"));return}d.settings.defaultApprovers.push(u),this._refreshViolationApprovalsModalBody(e,d);return}if(a.target.closest("#viol-save-settings-btn")){const d=t();if(!d)return;const p=a.target.closest("#viol-save-settings-btn");if(p.disabled)return;p.disabled=!0;const m={requireApproval:e.querySelector("#viol-require-approval")?.checked===!0,defaultApprovers:d.settings.defaultApprovers,bypassRoles:d.settings.bypassRoles};this.saveViolationApprovalSettings(m).then(u=>{p.disabled=!1,u&&u.success?(d.settings=this._cloneViolationApprovalSettings(m),Notification.success(i("module.violations.approvals.saved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))):Notification.error(u&&u.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}).catch(()=>{p.disabled=!1})}if(a.target.closest("#vap-reject-cancel")){const d=e.querySelector("#vap-reject-sheet");d&&(d.hidden=!0);return}}),e.addEventListener("input",a=>{if(a.target&&a.target.id==="vap-search-input"){const s=t();if(!s)return;s.query=a.target.value||"";const n=e.querySelector("#viol-approval-requests-list");n&&(n.innerHTML=this._buildViolationApprovalsRequestsHtml(s),this._wireViolationApprovalActions(e,s.isAdmin))}})},showViolationApprovalsManager(){this._ensureViolationApprovalsStyles();const e=(d,p)=>this._t(d,p),t=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,i=AppState.currentUser||{},o=(AppState.appData?.users||[]).filter(d=>d&&(d.email||d.id||d.name)),a={userEmail:t?"":i.email||"",userId:t?"":i.id||""},s=this._getCachedViolationApprovalRequests(t,i),n={settings:this._getViolationApprovalSettingsSnapshot(),requests:s||[],isAdmin:t,allUsers:o,filters:a,loading:!s,filter:"pending",query:""},r=document.getElementById("viol-approvals-manager-modal");r&&(r._vapEsc&&document.removeEventListener("keydown",r._vapEsc),r.remove());const l=document.createElement("div");l.id="viol-approvals-manager-modal",l.className="modal modal-open",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),l.setAttribute("aria-labelledby","vap-title"),l.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;";const c=n.loading?"\u2026":String(this._countViolationApprovalsByFilter(n.requests,"pending"));l.innerHTML=`
            <div class="vap-shell" data-no-literal-translate>
                <div class="vap-head">
                    <div>
                        <h3 id="vap-title">${e("module.violations.approvals.title","\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}</h3>
                        <p>${e("module.violations.approvals.subtitle","\u0631\u0627\u062C\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628\u060C \u062B\u0645 \u0627\u0639\u062A\u0645\u062F \u0623\u0648 \u0627\u0631\u0641\u0636 \u0628\u0648\u0636\u0648\u062D")}</p>
                    </div>
                    <button type="button" id="viol-approvals-close" class="vap-close" aria-label="${e("module.violations.approvals.close","\u0625\u063A\u0644\u0627\u0642")}">\xD7</button>
                </div>
                ${t?`
                <div class="vap-tabs" role="tablist">
                    <button type="button" class="vap-tab is-active" data-vap-tab="inbox" role="tab">
                        ${e("module.violations.approvals.tab.inbox","\u0627\u0644\u0637\u0644\u0628\u0627\u062A")}
                        <span id="viol-approval-pending-count" class="vap-n" style="margin-inline-start:.35rem;opacity:.8;">${c}</span>
                    </button>
                    <button type="button" class="vap-tab" data-vap-tab="settings" role="tab">${e("module.violations.approvals.tab.settings","\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}</button>
                </div>`:`<div class="vap-tabs"><span id="viol-approval-pending-count" hidden>${c}</span></div>`}
                <div class="vap-body">
                    <div data-vap-pane="inbox">
                        <div class="vap-toolbar">
                            <div class="vap-filters" id="vap-filters">${this._renderViolationApprovalFilterBar(n)}</div>
                            <div class="vap-search">
                                <i class="fas fa-search"></i>
                                <input type="search" id="vap-search-input" placeholder="${e("module.violations.approvals.search","\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0646\u0648\u0639 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628\u2026")}" autocomplete="off">
                            </div>
                        </div>
                        <div id="vap-mine-summary" class="vap-summary" hidden></div>
                        <div id="viol-approval-requests-list">
                            ${this._buildViolationApprovalsRequestsHtml(n)}
                        </div>
                    </div>
                    ${t?`<div data-vap-pane="settings" hidden>${this._buildViolationApprovalsSettingsHtml(n.settings,t,o)}</div>`:""}
                </div>
                <div id="vap-reject-sheet" class="vap-sheet" hidden>
                    <div class="vap-sheet-card">
                        <h4 style="margin:0 0 6px;font-size:1rem;">${e("module.violations.approvals.rejectTitle","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636")}</h4>
                        <p style="margin:0 0 10px;font-size:.82rem;color:#64748b;">${e("module.violations.approvals.rejectHint","\u0627\u0643\u062A\u0628 \u0633\u0628\u0628\u0627\u064B \u0648\u0627\u0636\u062D\u0627\u064B \u064A\u0635\u0644 \u0644\u0645\u064F\u0633\u062C\u0651\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.")}</p>
                        <textarea id="vap-reject-reason" placeholder="${e("module.violations.approvals.rejectPlaceholder","\u0645\u062B\u0627\u0644: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0627\u0642\u0635\u0629 \u0623\u0648 \u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0627\u0626\u062D\u0629\u2026")}"></textarea>
                        <div class="vap-actions" style="margin-top:12px;">
                            <button type="button" id="vap-reject-cancel" class="vap-btn vap-btn-no">${e("module.violations.approvals.cancel","\u0625\u0644\u063A\u0627\u0621")}</button>
                            <button type="button" id="vap-reject-confirm" class="vap-btn" style="background:#b91c1c;color:#fff;">${e("module.violations.approvals.rejectConfirm","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0631\u0641\u0636")}</button>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(l),l._violApprovalState=n,l._violApprovalsEventsBound=!1,this._bindViolationApprovalsModalEvents(l),n.loading||this._wireViolationApprovalActions(l,t),this._loadViolationApprovalsPanelData(l,n)},_renderViolationApprovalRequests(e,t={}){const i=(o,a)=>this._t(o,a);return!e||e.length===0?`<div class="vap-empty">
                <i class="fas fa-inbox"></i>
                <div style="font-weight:800;color:#334155;">${i("module.violations.approvals.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628")}</div>
                <div style="margin-top:6px;font-size:.85rem;">${i("module.violations.approvals.emptyHint","\u0639\u0646\u062F \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0633\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0643.")}</div>
            </div>`:e.map(o=>{const a=o.violationData||{},s=a.employeeName||a.contractorWorker||a.contractorName||"\u2014",n=String(o.status||"").toLowerCase(),r=n==="rejected"?"vap-badge-no":n==="pending"?"vap-badge-pending":"vap-badge-ok",c=i("module.violations.approvals.status."+(n==="committed"?"committed":n==="approved"?"approved":n==="rejected"?"rejected":"pending"),n),d=o.createdAt?typeof Utils.formatDateTime=="function"?Utils.formatDateTime(o.createdAt):String(o.createdAt):"\u2014",p=Array.isArray(o.approvers)?o.approvers:[],f=parseInt(o.currentApproverIndex,10)||0,m=this._isCurrentViolationApprover(o),u=this._canActOnViolationApproval(o,t.isAdmin),g=String(a.violationDetails||"").trim(),v=g.length>140?g.slice(0,140)+"\u2026":g,b=p.length>0?`
                        <div style="font-size:.75rem;font-weight:700;color:#64748b;margin-bottom:6px;">${i("module.violations.approvals.circuit","\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</div>
                        <ol class="vap-steps">
                            ${p.map((k,V)=>{const $=!!k.approved,E=!$&&V===f&&n==="pending",z=$?"is-done":E?"is-current":"is-wait",I=$?i("module.violations.approvals.doneStep","\u062A\u0645"):E?m?i("module.violations.approvals.yourTurn","\u062F\u0648\u0631\u0643 \u0627\u0644\u0622\u0646"):i("module.violations.approvals.waiting","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0647"):i("module.violations.approvals.queued","\u0627\u0644\u062A\u0627\u0644\u064A");return`<li class="vap-step ${z}">
                                    <span class="vap-step-num">${$?"\u2713":V+1}</span>
                                    <span>${Utils.escapeHTML(k.userName||k.userEmail||"?")} \xB7 ${I}</span>
                                </li>`}).join("")}
                        </ol>
                    `:"";return`
                <article class="vap-card${m?" is-mine":""}" data-request-id="${Utils.escapeHTML(String(o.id))}">
                    ${m?`<div class="vap-mine-flag"><i class="fas fa-user-check"></i> ${i("module.violations.approvals.yourTurn","\u062F\u0648\u0631\u0643 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0639\u062A\u0645\u062F \u0623\u0648 \u0627\u0631\u0641\u0636")}</div>`:""}
                    <div class="vap-card-top">
                        <div>
                            <div class="vap-person">${Utils.escapeHTML(s)} \u2014 ${Utils.escapeHTML(a.violationType||"\u2014")}</div>
                            <div class="vap-meta">${i("module.violations.approvals.requestNo","\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628")}: ${Utils.escapeHTML(String(o.id))} \xB7 ${i("module.violations.approvals.createdAt","\u0623\u064F\u0646\u0634\u0626")}: ${d} \xB7 ${i("module.violations.approvals.createdBy","\u0628\u0648\u0627\u0633\u0637\u0629")}: ${Utils.escapeHTML(o.createdByName||o.createdBy||"\u2014")}</div>
                        </div>
                        <span class="vap-badge ${r}">${c}</span>
                    </div>
                    <div class="vap-grid">
                        <div><strong>${i("module.violations.approvals.site","\u0627\u0644\u0645\u0648\u0642\u0639")}:</strong> ${Utils.escapeHTML(a.violationLocation||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.place","\u0627\u0644\u0645\u0643\u0627\u0646")}:</strong> ${Utils.escapeHTML(a.violationPlace||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}:</strong> ${a.violationDate?new Date(a.violationDate).toLocaleDateString("ar-EG-u-nu-latn"):"\u2014"}</div>
                        <div><strong>${i("module.violations.approvals.time","\u0627\u0644\u0648\u0642\u062A")}:</strong> ${Utils.escapeHTML(a.violationTime||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.severity","\u0627\u0644\u0634\u062F\u0629")}:</strong> ${Utils.escapeHTML(a.severity||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.fine","\u0627\u0644\u063A\u0631\u0627\u0645\u0629")}:</strong> ${a.fineAmount?Number(a.fineAmount).toLocaleString("en-US")+" \u062C.\u0645":"\u2014"}</div>
                    </div>
                    ${v?`<div style="font-size:.82rem;color:#475569;margin-bottom:10px;line-height:1.5;"><strong>${i("module.violations.approvals.details","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}:</strong> ${Utils.escapeHTML(v)}</div>`:""}
                    ${b}
                    ${o.rejectionReason?`<div style="background:#fef2f2;border-inline-start:3px solid #dc2626;padding:8px 10px;border-radius:8px;font-size:.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>${i("module.violations.approvals.rejectionReason","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636")}:</strong> ${Utils.escapeHTML(o.rejectionReason)}</div>`:""}
                    ${u?`
                        <div class="vap-actions">
                            <button type="button" class="vap-btn vap-btn-no viol-req-reject-btn" data-id="${Utils.escapeHTML(String(o.id))}">
                                <i class="fas fa-times"></i> ${i("module.violations.approvals.reject","\u0631\u0641\u0636")}
                            </button>
                            <button type="button" class="vap-btn vap-btn-ok viol-req-approve-btn" data-id="${Utils.escapeHTML(String(o.id))}">
                                <i class="fas fa-check"></i> ${i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F")}
                            </button>
                        </div>
                    `:""}
                </article>
            `}).join("")},_reloadViolationApprovalsInPlace(e){const t=e&&e._violApprovalState;if(t){this._invalidateViolationApprovalRequestsCache(),t.loading=!0,this._refreshViolationApprovalsModalBody(e,t,{settings:!1}),this._loadViolationApprovalsPanelData(e,t);try{this.load&&this.load()}catch{}}},_wireViolationApprovalActions(e,t){const i=(n,r)=>this._t(n,r),o=e.querySelector("#vap-reject-sheet"),a=e.querySelector("#vap-reject-reason"),s=e.querySelector("#vap-reject-confirm");e.querySelectorAll(".viol-req-approve-btn").forEach(n=>{n.addEventListener("click",async()=>{const r=n.getAttribute("data-id");if(!r)return;const c=(e._violApprovalState?.requests||[]).find(f=>String(f.id)===String(r)),d=!!(t&&c&&!this._isCurrentViolationApprover(c));n.disabled=!0,n.innerHTML='<i class="fas fa-spinner fa-spin"></i> '+i("module.violations.approvals.approving","\u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u2026");const p=await this.approveViolationRequest(r,{force:d});p&&p.success?(Notification.success(p.message||i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F")),this._reloadViolationApprovalsInPlace(e)):(Notification.error(p&&p.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),n.disabled=!1,n.innerHTML='<i class="fas fa-check"></i> '+i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F"))})}),e.querySelectorAll(".viol-req-reject-btn").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-id");!r||!o||(o.hidden=!1,o.dataset.requestId=r,a&&(a.value="",setTimeout(()=>a.focus(),30)))})}),s&&!s.dataset.bound&&(s.dataset.bound="1",s.addEventListener("click",async()=>{const n=o&&o.dataset.requestId,r=String(a?.value||"").trim();if(!n)return;if(!r){Notification.warning(i("module.violations.approvals.rejectRequired","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0625\u0644\u0632\u0627\u0645\u064A")),a?.focus();return}s.disabled=!0;const l=await this.rejectViolationRequest(n,r);s.disabled=!1,l&&l.success?(o&&(o.hidden=!0),Notification.success(l.message||i("module.violations.approvals.reject","\u0631\u0641\u0636")),this._reloadViolationApprovalsInPlace(e)):Notification.error(l&&l.message||"\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636")}))},countPriorViolationsSamePersonMonth(e,t){const i=this.getViolationYearMonthKey(e.violationDate);if(i==null)return 0;const o=AppState.appData.violations||[];let a=0;for(let s=0;s<o.length;s++){const n=o[s];!n||t&&String(n.id)===String(t)||this.getViolationYearMonthKey(n.violationDate)===i&&this.sameViolationPersonForSequence(e,n)&&a++}return a},getPersonViolationHistory(e,t=null){if(!e)return{totalCount:0,monthCount:0,nextSequence:1,strikeLevel:1,strikeBadgeText:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (Strike 1)",priorList:[],suggestedAction:"\u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u0639 \u0627\u0644\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631"};const i=AppState.appData?.violations||[],o=this.getViolationYearMonthKey(e.violationDate);let a=0,s=0;const n=[];for(let p=0;p<i.length;p++){const f=i[p];!f||t&&String(f.id)===String(t)||this.sameViolationPersonForSequence(e,f)&&(a++,o!=null&&this.getViolationYearMonthKey(f.violationDate)===o&&s++,n.push(f))}n.sort((p,f)=>new Date(f.violationDate||0)-new Date(p.violationDate||0));const r=a+1;let l=1,c="\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (Strike 1)",d="\u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u0639 \u0627\u0644\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631";return r===2?(l=2,c="\u0645\u0643\u0631\u0631 \u2014 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 2 (Strike 2)",d="\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0631\u0633\u0645\u064A \u0645\u0639 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062C\u0632\u0627\u0621 \u0648\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u0642\u0631\u0631\u0629"):r>=3&&(l=3,c=`\u062A\u0643\u0631\u0627\u0631 \u062D\u0631\u062C \u2014 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${r} (Strike 3+)`,d="\u062A\u0635\u0639\u064A\u062F \u0641\u0648\u0631\u064A \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0648\u0625\u0635\u062F\u0627\u0631 \u0623\u0645\u0631 \u0645\u0646\u0639 \u0648\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0645\u0646 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 (Ban Order)"),{totalCount:a,monthCount:s,nextSequence:r,strikeLevel:l,strikeBadgeText:c,priorList:n,suggestedAction:d}},refreshViolationSequenceBadgeInModal(e,t){const i=e&&e.querySelector?e.querySelector("#violation-sequence-info"):null;if(!i)return;const o=document.getElementById("violation-person-type")?.value,s=document.getElementById("violation-date")?.value||new Date().toISOString().slice(0,10);if(!o){i.innerHTML="",i.classList.add("hidden");return}const n={personType:o,violationDate:`${s}T12:00:00`};if(o==="employee"){if(n.employeeCode=document.getElementById("violation-employee-code")?.value.trim()||"",n.employeeName=document.getElementById("violation-person-name")?.value.trim()||"",!n.employeeCode&&!n.employeeName){i.innerHTML="",i.classList.add("hidden");return}}else{const f=document.getElementById("violation-contractor-select");if(n.contractorName=(f?.value||"").trim(),n.contractorWorker=document.getElementById("violation-contractor-worker")?.value.trim()||"",!n.contractorName&&!n.contractorWorker){i.innerHTML="",i.classList.add("hidden");return}}const r=this.getPersonViolationHistory(n,t),l=r.priorList[0],c=l?.violationType||"",d=(()=>{if(!l?.violationDate)return"";const f=new Date(l.violationDate);return isNaN(f.getTime())?String(l.violationDate).slice(0,10):`${f.getFullYear()}/${String(f.getMonth()+1).padStart(2,"0")}/${String(f.getDate()).padStart(2,"0")}`})();let p="";r.strikeLevel===1?(i.className="mt-3",p=`
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-right: 4px solid #16a34a; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 34px; height: 34px; border-radius: 8px; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-check-circle" style="color: #16a34a; font-size: 17px;"></i>
                        </div>
                        <div>
                            <strong style="color: #166534; font-size: 0.88rem; display: block;">\u0627\u0644\u0633\u062C\u0644 \u0633\u0644\u064A\u0645 (\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u2014 Strike 1)</strong>
                            <p style="margin: 2px 0 0 0; font-size: 0.78rem; color: #15803d; line-height: 1.4;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0633\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635. \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647: ${r.suggestedAction}</p>
                        </div>
                    </div>
                    <span style="background: #dcfce7; color: #166534; border: 1px solid #86efac; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 11px; white-space: nowrap;">
                        \u0633\u062C\u0644 \u0646\u0638\u064A\u0641
                    </span>
                </div>
            `):r.strikeLevel===2?(i.className="mt-3",p=`
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 13px 16px; background: #fffbeb; border: 1px solid #fde68a; border-right: 4px solid #d97706; border-radius: 12px; box-shadow: 0 1px 3px rgba(217, 119, 6, 0.08);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #fef3c7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas fa-exclamation-triangle" style="color: #d97706; font-size: 16px;"></i>
                            </div>
                            <strong style="color: #92400e; font-size: 0.9rem;">\u062A\u0646\u0628\u064A\u0647 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062C\u0632\u0627\u0621 (\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 2 \u2014 Strike 2)</strong>
                        </div>
                        <span style="background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 11px;">
                            \u26A0\uFE0F \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0643\u0631\u0631\u0629 (2)
                        </span>
                    </div>
                    <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.5;">
                        \u0644\u062F\u0649 \u0627\u0644\u0634\u062E\u0635 \u0645\u062E\u0627\u0644\u0641\u0629 \u0633\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629 \u0628\u062A\u0627\u0631\u064A\u062E <strong dir="ltr">${d}</strong> (${Utils.escapeHTML(c)}).
                        <br><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0646\u0638\u0627\u0645\u064A \u0627\u0644\u0645\u0642\u062A\u0631\u062D:</strong> ${r.suggestedAction}
                    </p>
                    <div style="display: flex; gap: 8px; margin-top: 4px;">
                        <button type="button" onclick="const a = document.getElementById('violation-action'); if(a){ a.value = '${r.suggestedAction}'; a.focus(); }" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 4px rgba(180, 83, 9, 0.2); transition: all 0.15s;">
                            <i class="fas fa-magic"></i> \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0642\u062A\u0631\u062D \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                        </button>
                    </div>
                </div>
            `):(i.className="mt-3",p=`
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 13px 16px; background: #fef2f2; border: 1px solid #fecaca; border-right: 4px solid #dc2626; border-radius: 12px; box-shadow: 0 1px 3px rgba(220, 38, 38, 0.1);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #fee2e2; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas fa-radiation text-red-600 text-lg animate-pulse"></i>
                            </div>
                            <strong style="color: #991b1b; font-size: 0.92rem;">\u{1F6A8} \u062A\u062D\u0630\u064A\u0631 \u0639\u0627\u0644\u064A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (\u062A\u0643\u0631\u0627\u0631 \u062D\u0631\u062C \u2014 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${r.nextSequence} \u2014 Strike 3+)</strong>
                        </div>
                        <span style="background: #fee2e2; color: #991b1b; border: 1.5px solid #f87171; padding: 3px 12px; border-radius: 9999px; font-weight: 900; font-size: 11px;">
                            \u062D\u0638\u0631 \u0648\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0645\u0642\u062A\u0631\u062D
                        </span>
                    </div>
                    <p style="margin: 0; font-size: 0.82rem; color: #7f1d1d; line-height: 1.5;">
                        \u0627\u0644\u0634\u062E\u0635 \u0628\u0644\u063A \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${r.totalCount} \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0633\u0627\u0628\u0642\u0629). \u0622\u062E\u0631\u0647\u0627 \u0628\u062A\u0627\u0631\u064A\u062E <strong dir="ltr">${d}</strong>.
                        <br><strong>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0635\u0627\u0631\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628:</strong> ${r.suggestedAction}
                    </p>
                    <div style="display: flex; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
                        <button type="button" onclick="const a = document.getElementById('violation-action'); if(a){ a.value = '${r.suggestedAction}'; a.focus(); }" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 800; cursor: pointer; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.25); transition: all 0.15s;">
                            <i class="fas fa-ban"></i> \u062A\u0637\u0628\u064A\u0642 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0639 \u0648\u0627\u0644\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0627\u0644\u0645\u0642\u062A\u0631\u062D
                        </button>
                    </div>
                </div>
            `),i.innerHTML=p,i.classList.remove("hidden")},getSystemDepartmentOptions(){const e=new Set;return(AppState.appData?.departments||[]).forEach(t=>{const i=typeof t=="string"?t:t.name||t.departmentName||t.title||"";i&&typeof i=="string"&&i.trim()&&e.add(i.trim())}),(AppState.appData?.employees||[]).forEach(t=>{const i=(t.department||t.section||"").trim();i&&e.add(i)}),(AppState.appData?.violations||[]).forEach(t=>{const i=(t.employeeDepartment||t.contractorDepartment||"").trim();i&&e.add(i)}),e.size===0&&["\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0647\u0646\u062F\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0648\u0627\u0644\u0644\u0648\u062C\u0633\u062A\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629 \u0648\u0627\u0644\u0634\u0624\u0648\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0648\u0627\u0644\u062D\u0631\u0627\u0633\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629"].forEach(t=>e.add(t)),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar"))},checkLocationAreaViolations(e,t,i=null){if(!e&&!t)return null;const o=AppState.appData?.violations||[],a=String(e||"").trim().toLowerCase(),s=String(t||"").trim().toLowerCase(),n=o.filter(r=>{if(!r||i&&String(r.id)===String(i))return!1;const l=String(r.violationLocation||"").trim().toLowerCase(),c=String(r.violationPlace||"").trim().toLowerCase();return!!(s&&s!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"&&s!=="__custom__"&&(c===s||c&&(c.includes(s)||s.includes(c)))||!s&&a&&a!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"&&(l===a||l&&(l.includes(a)||a.includes(l))))});return n.length===0?null:(n.sort((r,l)=>new Date(l.violationDate||0)-new Date(r.violationDate||0)),{count:n.length,lastViolation:n[0],list:n})},refreshAreaHotspotInModal(e,t=null){if(!e)return;const i=e.querySelector("#violation-area-hotspot-container");if(!i)return;const o=e.querySelector("#violation-person-type")?.value,a=o==="contractor"?e.querySelector("#violation-contractor-location"):e.querySelector("#violation-employee-location"),s=o==="contractor"?e.querySelector("#violation-contractor-place"):e.querySelector("#violation-employee-place"),n=a?.options[a?.selectedIndex]?.text||a?.value||"",r=s?.options[s?.selectedIndex]?.text||s?.value||"";if(!n||n.includes("-- \u0627\u062E\u062A\u0631")||!r||r.includes("-- \u0627\u062E\u062A\u0631")||r==="__custom__"){i.innerHTML="",i.classList.add("hidden");return}const l=this.checkLocationAreaViolations(n,r,t);if(!l||l.count===0){i.innerHTML="",i.classList.add("hidden");return}const c=l.lastViolation,d=c?.violationDate?Utils.formatDate(c.violationDate):"",p=c?.violationType||"",f=c?.severity||"",m=f==="\u0639\u0627\u0644\u064A\u0629"?"#dc2626":f==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb";i.className="mt-3 p-3 rounded-xl border border-amber-300 shadow-sm",i.style.background="linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",i.innerHTML=`
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="width: 32px; height: 32px; border-radius: 8px; background: #fde68a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <i class="fas fa-map-marked-alt text-amber-800 text-base"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                        <strong style="color: #92400e; font-size: 0.9rem;">
                            \u26A0\uFE0F \u062A\u0646\u0628\u064A\u0647 \u0628\u0624\u0631\u0629 \u062E\u0637\u0631: \u0631\u064F\u0635\u062F \u0633\u0627\u0628\u0642\u0627\u064B (${l.count}) \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u064A \u0645\u0646\u0637\u0642\u0629 "${Utils.escapeHTML(r)}"
                        </strong>
                        <span class="badge" style="background: #fef08a; color: #854d0e; font-size: 11px; padding: 2px 8px; border-radius: 9999px; font-weight: 800; border: 1px solid #fcd34d;">
                            \u062A\u0643\u0631\u0627\u0631 \u0645\u0643\u0627\u0646\u064A
                        </span>
                    </div>
                    <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #78350f; line-height: 1.45;">
                        \u0622\u062E\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646: <strong style="color: ${m};">${Utils.escapeHTML(p)}</strong> \u0628\u062A\u0627\u0631\u064A\u062E <strong>${d}</strong> (${c.status||"\u0645\u062D\u0644\u0648\u0644"}).
                        <br><span style="color: #b45309; font-weight: 600;">\u{1F4A1} \u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0633\u0644\u0627\u0645\u0629: \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0623\u0633\u0628\u0627\u0628 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0629 \u0628\u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A \u062C\u0630\u0631\u064A.</span>
                    </p>
                </div>
            </div>
        `,i.classList.remove("hidden")},getViolationSuggestionChips(e=""){const t=String(e||"").toLowerCase();let i=[];const o=["\u062A\u0648\u062C\u064A\u0647 \u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0641\u0648\u0631\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0644 \u0628\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0625\u0635\u062F\u0627\u0631 \u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0631\u0633\u0645\u064A \u0623\u0648\u0644 \u0648\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631","\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0646\u0647\u0627\u0626\u064A \u0645\u0639 \u0627\u0644\u062A\u0648\u0635\u064A\u0629 \u0628\u062A\u0637\u0628\u064A\u0642 \u062E\u0635\u0645 \u0645\u0627\u0644\u064A \u0648\u0641\u0642 \u0627\u0644\u0644\u0627\u0626\u062D\u0629","\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0639\u0645\u0644 \u0641\u0648\u0631\u0627\u064B \u0648\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0631 \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u0626\u0646\u0627\u0641","\u0633\u062D\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0648\u0625\u0644\u0632\u0627\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u062A\u0642\u062F\u064A\u0645 \u062E\u0637\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0645\u0639\u062A\u0645\u062F\u0629","\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0641\u0648\u0631\u064A \u0644\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0633\u062D\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u062E\u0627\u0635 \u0628\u0647","\u0625\u0644\u0632\u0627\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0628\u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u062A\u0646\u0634\u064A\u0637\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (Toolbox Talk)"];return t.includes("\u0645\u0647\u0645\u0627\u062A")||t.includes("\u0648\u0642\u0627\u064A\u0629")||t.includes("ppe")?i=["\u0639\u062F\u0645 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0631\u062A\u062F\u0627\u0621 \u0627\u0644\u062E\u0648\u0630\u0629 \u0648\u062D\u0630\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0641\u064A \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062A\u0627\u062C","\u0627\u0644\u0639\u0645\u0644 \u0628\u0627\u0644\u0635\u0627\u0631\u0648\u062E / \u0627\u0644\u062A\u062C\u0644\u064A\u062E \u0628\u062F\u0648\u0646 \u0646\u0638\u0627\u0631\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0639\u064A\u0646 \u0623\u0648 \u0648\u0627\u0642\u064A \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0634\u0641\u0627\u0641","\u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u0643\u0645\u0627\u0645\u0629 \u0627\u0644\u062A\u0646\u0641\u0633 \u0627\u0644\u0648\u0627\u0642\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0628\u064A\u0626\u0629 \u0628\u0647\u0627 \u0623\u062A\u0631\u0628\u0629 \u0648\u0623\u0628\u062E\u0631\u0629","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0642\u0641\u0627\u0632\u0627\u062A \u062A\u0627\u0644\u0641\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0644\u0627\u0626\u0645\u0629 \u0644\u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u064A\u0629 \u0648\u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629"]:t.includes("\u0627\u0631\u062A\u0641\u0627\u0639")||t.includes("\u0633\u0642\u0627\u0644\u0629")||t.includes("\u0633\u0642\u0627\u0644\u0627\u062A")?i=["\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 \u064A\u062A\u062C\u0627\u0648\u0632 1.8 \u0645\u062A\u0631 \u0628\u062F\u0648\u0646 \u0631\u0628\u0637 \u062D\u0632\u0627\u0645 \u0627\u0644\u0623\u0645\u0627\u0646 \u0628\u0646\u0642\u0637\u0629 \u062A\u062B\u0628\u064A\u062A \u0645\u0639\u062A\u0645\u062F\u0629","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0633\u0642\u0627\u0644\u0629 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629 \u0648\u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0643\u0627\u0631\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0623\u062E\u0636\u0631 (Scaffold Tag)","\u0639\u062F\u0645 \u062A\u0648\u0641\u064A\u0631 \u062D\u0628\u0644 \u0646\u062C\u0627\u0629 (Life Line) \u0623\u062B\u0646\u0627\u0621 \u062D\u0631\u0643\u0629 \u0627\u0644\u0641\u0646\u064A\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A","\u0627\u0644\u0635\u0639\u0648\u062F \u0639\u0644\u0649 \u0647\u064A\u0627\u0643\u0644 \u063A\u064A\u0631 \u0645\u062E\u0635\u0635\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u0644\u0627\u0644\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A"]:t.includes("\u062A\u062F\u062E\u064A\u0646")||t.includes("\u062D\u0631\u064A\u0642")||t.includes("\u0627\u0634\u062A\u0639\u0627\u0644")?i=["\u0627\u0644\u062A\u062F\u062E\u064A\u0646 \u062F\u0627\u062E\u0644 \u0645\u0646\u0637\u0642\u0629 \u0645\u062D\u0638\u0648\u0631\u0629 \u062A\u062D\u0648\u064A \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u0628\u062A\u0631\u0648\u0644\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644","\u062A\u0646\u0641\u064A\u0630 \u0623\u0639\u0645\u0627\u0644 \u0642\u0637\u0639 \u0648\u0644\u062D\u0627\u0645 \u0633\u0627\u062E\u0646 \u0628\u062F\u0648\u0646 \u0645\u0631\u0627\u0642\u0628 \u062D\u0631\u064A\u0642 (Fire Watcher) \u0648\u0637\u0641\u0627\u064A\u0629","\u0648\u0636\u0639 \u0639\u0648\u0627\u0626\u0642 \u0648\u0645\u0648\u0627\u062F \u062E\u0627\u0645 \u0623\u0645\u0627\u0645 \u0637\u0641\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0644\u0648\u062D\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u062A\u0639\u064A\u0642 \u0627\u0644\u0648\u0635\u0648\u0644","\u0639\u062F\u0645 \u0641\u062D\u0635 \u0635\u0644\u0627\u062D\u064A\u0629 \u0637\u0641\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0642\u0628\u0644 \u0628\u062F\u0621 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0633\u0627\u062E\u0646\u0629"]:t.includes("\u062A\u0635\u0631\u064A\u062D")||t.includes("ptw")||t.includes("\u0639\u0632\u0644")||t.includes("loto")?i=["\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0628\u062F\u0648\u0646 \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0648\u062A\u0648\u0642\u064A\u0639 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (PTW) \u0627\u0644\u0645\u0637\u0644\u0648\u0628","\u062A\u062C\u0627\u0648\u0632 \u0648\u0642\u062A \u0627\u0646\u062A\u0647\u0627\u0621 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u062F\u0648\u0646 \u0637\u0644\u0628 \u062A\u0645\u062F\u064A\u062F \u0631\u0633\u0645\u064A \u0645\u0646 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u0639\u062F\u0645 \u062A\u0637\u0628\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0632\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u062A\u0623\u0645\u064A\u0646 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u062E\u0637\u0631 \u0628\u0627\u0644\u0642\u0641\u0644 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0629 (LOTO)","\u062F\u062E\u0648\u0644 \u0645\u0643\u0627\u0646 \u0645\u063A\u0644\u0642 (Confined Space) \u0628\u062F\u0648\u0646 \u0642\u064A\u0627\u0633 \u0646\u0633\u0628\u0629 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646"]:i=["\u0633\u0648\u0621 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629 \u0648\u062A\u0631\u0627\u0643\u0645 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0645\u0645\u0627 \u064A\u0639\u064A\u0642 \u0645\u0645\u0631\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0629 \u0648\u0645\u062E\u0627\u0631\u062C \u0627\u0644\u0637\u0648\u0627\u0631\u0626","\u0642\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0631\u0627\u0641\u0639\u0629 \u0627\u0644\u0634\u0648\u0643\u064A\u0629 \u0628\u0633\u0631\u0639\u0629 \u0632\u0627\u0626\u062F\u0629 \u0623\u0648 \u0628\u062F\u0648\u0646 \u062A\u0641\u0648\u064A\u0636 \u0631\u0633\u0645\u064A \u0645\u0639\u062A\u0645\u062F","\u062A\u062E\u0632\u064A\u0646 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0641\u064A \u0639\u0628\u0648\u0627\u062A \u063A\u064A\u0631 \u0645\u062E\u0635\u0635\u0629 \u0648\u0628\u062F\u0648\u0646 \u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u062A\u062D\u0630\u064A\u0631 (GHS)","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0629 \u0623\u0648 \u0623\u062F\u0627\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0628\u0647\u0627 \u0623\u0633\u0644\u0627\u0643 \u0645\u0643\u0634\u0648\u0641\u0629 \u0648\u062F\u0648\u0646 \u062A\u0623\u0631\u064A\u0636 \u0645\u0646\u0627\u0633\u0628"],{detailsChips:i,actionChips:o}},_violationsImportNormalizeHeaderKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationsImportPick(e,t){const i={};Object.keys(e||{}).forEach(o=>{i[this._violationsImportNormalizeHeaderKey(o)]=e[o]});for(let o=0;o<t.length;o++){const a=this._violationsImportNormalizeHeaderKey(t[o]);if(i[a]!==void 0&&i[a]!==null&&String(i[a]).trim()!=="")return i[a]}return""},downloadViolationsImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u063A\u0631\u0627\u0645\u0629"],t=["\u0645\u0648\u0638\u0641","12345","","","","\u062A\u0623\u062E\u0631 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","2026-05-01","08:30","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 1","\u0645\u062A\u0648\u0633\u0637\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631","\u0625\u0646\u0630\u0627\u0631 \u0634\u0641\u0647\u064A","100"],i=XLSX.utils.book_new(),o=XLSX.utils.aoa_to_sheet([e,t]);o["!cols"]=e.map(()=>({wch:18})),XLSX.utils.book_append_sheet(i,o,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const a=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],['\u2022 \u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635: \u0627\u0643\u062A\u0628 "\u0645\u0648\u0638\u0641" \u0623\u0648 "\u0645\u0642\u0627\u0648\u0644".'],["\u2022 \u0644\u0644\u0645\u0648\u0638\u0641: \u0639\u0628\u0651\u0626 \u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629."],["\u2022 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0639\u0628\u0651\u0626 \u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u0628\u0626\u0629 \u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644."],["\u2022 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 \u062A\u0646\u0633\u064A\u0642 \u062A\u0627\u0631\u064A\u062E \u0625\u0643\u0633\u0644."]],s=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(i,s,"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(i,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},showViolationsImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
            </div>`,document.body.appendChild(e);let t=[];const i=e.querySelector("#violations-import-file"),o=e.querySelector("#violations-import-preview"),a=e.querySelector("#violations-import-confirm");e.querySelector("#violations-import-download-template")?.addEventListener("click",()=>this.downloadViolationsImportTemplate()),i?.addEventListener("change",async s=>{const n=s.target.files&&s.target.files[0];if(t=[],a.disabled=!0,o.classList.add("hidden"),!!n){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const r=await n.arrayBuffer(),l=XLSX.read(r,{type:"array"}),c=l.Sheets[l.SheetNames[0]],d=XLSX.utils.sheet_to_json(c,{defval:""});t=Array.isArray(d)?d:[],o.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xAB${Utils.escapeHTML(l.SheetNames[0]||"")}\xBB.</p>`,o.classList.remove("hidden"),a.disabled=t.length===0}catch(r){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",r),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(r.message||""))}}}),a?.addEventListener("click",async()=>{t.length&&(a.disabled=!0,await this.processViolationsImportRows(t,e))}),e.addEventListener("click",s=>{s.target===e&&e.remove()})},async processViolationsImportRows(e,t){let i=0,o=0;const a=[];Array.isArray(AppState.appData.violations)||(AppState.appData.violations=[]);let s=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),s=ViolationTypesManager.getAll()}catch{s=AppState.appData.violationTypes||[]}else s=AppState.appData.violationTypes||[];const n=new Map((s||[]).map(l=>[String(l.name||"").trim().toLowerCase(),l])),r=new Set;for(let l=0;l<e.length;l++){const c=e[l]||{},d=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim();d&&!n.has(d.toLowerCase())&&r.add(d)}if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.addType&&ViolationTypesManager.getTypeByName)try{ViolationTypesManager.ensureInitialized(),r.forEach(l=>{const c=l.toLowerCase();try{const d=ViolationTypesManager.addType({name:l,description:"",fineAmount:0});n.set(c,d)}catch{const p=ViolationTypesManager.getTypeByName(l);p&&n.set(c,p)}})}catch(l){Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641:",l)}for(let l=0;l<e.length;l++){const c=e[l]||{};try{const p=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635","personType","persontype"])||"").trim().toLowerCase(),f=p.includes("\u0645\u0642\u0627\u0648\u0644")||p==="contractor"?"contractor":"employee",m=String(this._violationsImportPick(c,["\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","employeeCode","employeenumber","employeeNumber"])||"").trim(),u=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641","employeeName"])||"").trim(),g=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorName"])||"").trim(),v=String(this._violationsImportPick(c,["\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorWorker"])||"").trim(),b=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim(),k=this._violationsImportPick(c,["\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationDate","date"]),V=String(this._violationsImportPick(c,["\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationTime","time"])||"08:00"),$=String(this._violationsImportPick(c,["\u0627\u0644\u0645\u0648\u0642\u0639","violationLocation","location"])||"").trim(),E=String(this._violationsImportPick(c,["\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationPlace","place"])||"").trim(),z=String(this._violationsImportPick(c,["\u0627\u0644\u0634\u062F\u0629","severity"])||"\u0645\u062A\u0648\u0633\u0637\u0629").trim(),I=String(this._violationsImportPick(c,["\u0627\u0644\u062D\u0627\u0644\u0629","status"])||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").trim(),P=String(this._violationsImportPick(c,["\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","violationDetails","details"])||"").trim(),W=String(this._violationsImportPick(c,["\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","actionTaken","action"])||"").trim(),x=this._violationsImportPick(c,["\u0627\u0644\u063A\u0631\u0627\u0645\u0629","fineAmount","fine"]);if(!b||!k){o++,a.push(`\u0635\u0641 ${l+2}: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0646\u0627\u0642\u0635`);continue}if(f==="employee"&&!m){o++,a.push(`\u0635\u0641 ${l+2}: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641`);continue}if(f==="contractor"&&!g){o++,a.push(`\u0635\u0641 ${l+2}: \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628`);continue}let _=k;if(typeof _=="number"&&typeof XLSX<"u"&&XLSX.SSF)try{const N=XLSX.SSF.parse_date_code(_);N&&(_=new Date(Date.UTC(N.y,N.m-1,N.d)).toISOString())}catch{}else if(typeof _=="string"&&/^\d{4}-\d{2}-\d{2}/.test(_.trim()))_=new Date(_.trim().slice(0,10)+"T12:00:00").toISOString();else{const N=new Date(_);_=isNaN(N.getTime())?new Date().toISOString():N.toISOString()}const R=n.get(b.toLowerCase()),h=R?String(R.id||""):"",U=this.parseFineAmount(x!==""&&x!==void 0?x:R?R.fineAmount:0),T={personType:f,violationDate:_,employeeCode:m,employeeNumber:m,employeeName:u,contractorName:g,contractorWorker:v},q=this.countPriorViolationsSamePersonMonth(T,null)+1,J={id:Utils.generateId("VIOLATION"),isoCode:typeof generateISOCode=="function"?generateISOCode("VIOL",AppState.appData.violations):"VIOL-"+Date.now()+"-"+l,personType:f,employeeId:f==="employee"?Utils.generateId("EMP"):"",employeeName:f==="employee"?u:"",employeeCode:f==="employee"?m:"",employeeNumber:f==="employee"?m:"",employeePosition:"",employeeDepartment:"",contractorId:"",contractorName:f==="contractor"?g:"",contractorWorker:f==="contractor"?v:"",contractorPosition:"",contractorDepartment:"",violationTypeId:h,violationType:b,fineAmount:U,violationDate:_,violationTime:V.length>=5?V.slice(0,5):"08:00",violationLocation:$,violationLocationId:$,violationPlace:E,violationPlaceId:E,violationDetails:P,severity:z||"\u0645\u062A\u0648\u0633\u0637\u0629",actionTaken:W,status:I||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",photo:"",violationSequenceInMonth:q,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.violations.push(this.normalizeViolationRecord(J)),i++}catch(d){o++,a.push(`\u0635\u0641 ${l+2}: ${d.message||d}`)}}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(GoogleIntegration.autoSave("Violations",AppState.appData.violations).catch(()=>{Notification.warning("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A \u0644\u0627\u062D\u0642\u0627\u064B.")}),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureViolationsTypeIds)try{ViolationTypesManager.ensureViolationsTypeIds()}catch{}t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u062E\u0627\u0644\u0641\u0629${o?` (\u062A\u062E\u0637\u064A ${o})`:""}.`),a.length&&a.length<=5?a.forEach(l=>Utils.safeWarn(l)):a.length&&Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+a.slice(0,5).join(" | ")+" ..."),this.load()},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u"){const t=document.getElementById("violations-section");t&&(t.innerHTML=`
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
                `;return}if(AppState.appData||(AppState.appData={}),AppState.appData.violations||(AppState.appData.violations=[]),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized)try{ViolationTypesManager.ensureInitialized()}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 ViolationTypesManager:",c)}else(!AppState.appData.violationTypes||!Array.isArray(AppState.appData.violationTypes))&&(AppState.appData.violationTypes=[]);const t=Array.isArray(AppState.appData.violations)&&AppState.appData.violations.length>0,i=(()=>{try{return localStorage.getItem("violations_last_sync")}catch{return null}})(),o=i?Date.now()-parseInt(i,10):1/0,a=600*1e3,s=o>=a,n=typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets,r=AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl;if(!t&&n&&r)try{await this.ensureViolationsCoreDataLoaded({force:!0})}catch{}else s&&t&&n&&r&&this.ensureViolationsCoreDataLoaded({force:!0}).then(()=>{try{const c=document.getElementById("violations-stats-cards");c&&(c.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters()),this.bindFilters()}catch{}});const l=(c,d)=>this._t(c,d);e.innerHTML=`
            <div class="section-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 16px; padding: 24px 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(220, 38, 38, 0.25);">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div class="text-center w-full" style="flex-grow: 1; min-width: 200px;">
                        <h1 class="section-title" style="color: white; font-size: 2rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-exclamation-triangle ml-3" style="font-size: 1.8rem;"></i>
                            ${l("module.violations.title","\u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}
                        </h1>
                        <p class="section-subtitle" style="color: rgba(255,255,255,0.9); font-size: 1rem; margin: 0;">${l("module.violations.subtitle","\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}</p>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap gap-2 justify-center">
                        <button type="button" id="add-violation-btn" class="btn-primary" style="background: white; color: #dc2626; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                            <i class="fas fa-plus ml-2"></i>
                            ${l("module.violations.btn.new","\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F\u0629")}
                        </button>
                        <button type="button" id="viol-approvals-btn" onclick="Violations.showViolationApprovalsManager()" style="background: rgba(255,255,255,0.18); color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 12px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; position: relative;" title="${l("module.violations.btn.approvals","\u062F\u0627\u0626\u0631\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${l("module.violations.btn.approvals","\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}
                            <span id="viol-approvals-pending-badge" class="vap-nav-badge" hidden></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <!-- Tabs Navigation -->
                <div class="tabs-container mb-4">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="all" onclick="Violations.switchTab('all')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-list ml-2"></i>${l("module.violations.tab.all","\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}
                        </button>
                        <button class="tab-btn" data-tab="employees" onclick="Violations.switchTab('employees')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-tie ml-2"></i>${l("module.violations.tab.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")}
                        </button>
                        <button class="tab-btn" data-tab="contractors" onclick="Violations.switchTab('contractors')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-users-cog ml-2"></i>${l("module.violations.tab.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}
                        </button>
                        <button class="tab-btn" data-tab="analytics" onclick="Violations.switchTab('analytics')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-chart-bar ml-2"></i>${l("module.violations.tab.analytics","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}
                        </button>
                        <button class="tab-btn" data-tab="blacklist" onclick="Violations.switchTabAsync('blacklist')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-slash ml-2"></i>${l("module.violations.tab.blacklist","\u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u2013 Blacklist")}
                        </button>
                        <button id="violations-btn-refresh" type="button" class="tab-btn" onclick="Violations.refreshModule()" title="${l("module.common.refresh","\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-sync-alt ml-2"></i>${l("module.common.refresh","\u062A\u062D\u062F\u064A\u062B")}
                        </button>
                    </div>
                </div>
                
                <!-- Tab Content -->
                <div id="violations-tab-content">
                    <div class="content-card" id="violations-list-tab">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h2>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u0644\u064A \u0625\u0644\u0649 Excel \u0645\u0646\u0633\u0642 \u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u062A\u062D\u0644\u064A\u0644 RCA">
                                <i class="fas fa-file-excel ml-1"></i>\u062A\u0635\u062F\u064A\u0631 Excel (\u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648 RCA)
                            </button>
                            <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog()" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                <i class="fas fa-file-pdf ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 (ISO PDF)
                            </button>
                        </div>
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
        `,this.setupEventListeners(),this._ensureViolationApprovalsStyles(),this._prefetchViolationApprovalPanelData(),Promise.resolve(this.ensureViolationsCoreDataLoaded({force:!1})).then(()=>{try{const c=document.getElementById("violations-stats-cards");c&&(c.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters()),this.bindFilters()}catch{}}).catch(()=>{})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",t),e.innerHTML=`
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
            `}},async ensureViolationsCoreDataLoaded({force:e=!1}={}){return this._violationsCoreLoadPromise&&!e?this._violationsCoreLoadPromise:(this._violationsCoreLoadPromise=(async()=>{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl))return;const[i,o]=await Promise.all([GoogleIntegration.readFromSheets("Violations").catch(()=>null),GoogleIntegration.readFromSheets("ViolationTypes").catch(()=>null)]);if(Array.isArray(i)){const a=i.map(n=>this.normalizeViolationRecord(n)).filter(Boolean),s=Array.isArray(AppState.appData.violations)?AppState.appData.violations:[];if(a.length===0&&s.length>0)Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u0627\u0631\u063A\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${s.length} \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u062D\u0644\u064A\u0629`);else{const n=new Set(a.map(c=>c&&c.id).filter(Boolean)),r=Date.now()-300*1e3,l=s.filter(c=>!c||!c.id||n.has(c.id)?!1:new Date(c.createdAt||c.timestamp||0).getTime()>=r);AppState.appData.violations=l.length>0?[...l,...a]:a}}if(Array.isArray(o)){const a=Array.isArray(AppState.appData.violationTypes)?AppState.appData.violationTypes:[];if(o.length>0?AppState.appData.violationTypes=o:a.length===0&&(AppState.appData.violationTypes=[]),o.length>0||o.length===0&&a.length===0)try{AppState.syncMeta||(AppState.syncMeta={sheets:{},users:0,lastSyncTime:0,userEmail:null}),AppState.syncMeta.sheets||(AppState.syncMeta.sheets={}),AppState.syncMeta.sheets.ViolationTypes=Date.now()}catch{}}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized()}catch{}try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}})().finally(()=>{this._violationsCoreLoadPromise=null}),this._violationsCoreLoadPromise)},renderViolationsList(){try{const e=this.getFilteredViolations();return!e||e.length===0?`<div class="empty-state"><p class="text-gray-500">${this.hasActiveFilters()?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629"}</p></div>`:`
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
                                            <button type="button" onclick='Violations.printViolationProfessional(${this._escapeIdForHandler(t.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #0f766e, #0d9488); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(15,118,110,0.3);" title="\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C (ISO)">
                                                <i class="fas fa-print"></i>
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
            `}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A renderViolationsList:",e),'<div class="empty-state"><p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}},updateAllViolationsStats(){try{const e=document.getElementById("violations-stats-cards");if(!e)return;const t=document.createElement("div");t.innerHTML=this.renderAllViolationsStats();const i=t.querySelector("#violations-stats-cards");i&&e.replaceWith(i)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A:",e)}},renderAllViolationsStats(){const e=this.getFilteredViolations(),t=e.length,i=e.filter(s=>s&&(s.personType==="employee"||!!s.employeeName&&!s.contractorName)).length,o=e.filter(s=>s&&(s.personType==="contractor"||!!s.contractorName)).length,a=e.reduce((s,n)=>{const r=Number(n?.fineAmount||0);return s+(Number.isFinite(r)&&r>0?r:0)},0);return`
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
                            <p class="text-2xl font-bold text-green-700">${this.formatFineAmount(a)}</p>
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
        `},hasActiveFilters(){const e=this.currentFilters||{};return!!(e.search||e.personType||e.violationType||e.severity||e.status)},getViolationsPermissions(e=AppState.currentUser){if(!e)return{viewDepartmentOnly:!0,viewAll:!1};if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin(e))return{viewDepartmentOnly:!1,viewAll:!0};const t=e.permissions||{},i=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t):t,a=(i&&i.violationsPermissions||{})["violations-view-all"]===!0;return{viewDepartmentOnly:!a,viewAll:a}},isDepartmentMatch(e,t){if(!e||!t)return!1;const i=s=>String(s).trim().toLowerCase().replace(/^(إدارة|قسم)\s+/,"").replace(/\s+/g," "),o=i(e),a=i(t);return o===a||o.includes(a)||a.includes(o)},isViolationVisibleToCurrentUser(e){if(!e)return!1;const t=this.normalizeViolationRecord(e);if(!t)return!1;if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()||this.getViolationsPermissions().viewAll)return!0;if(t.personType==="employee"||!!String(t.employeeName||"").trim()){const a=String(AppState.currentUser?.department||"").trim();let s=String(t.employeeDepartment||"").trim();if(!s&&(t.employeeId||t.employeeCode||t.employeeName)){const n=AppState.appData?.employees||[],r=String(t.employeeId||t.employeeCode||t.employeeName).trim().toLowerCase(),l=n.find(c=>{if(!c)return!1;const d=String(c.id||c.employeeId||c.code||"").trim().toLowerCase(),p=String(c.name||c.employeeName||"").trim().toLowerCase();return d&&d===r||p&&p===r});l&&(s=String(l.department||l.section||"").trim())}return!a||!s?!1:this.isDepartmentMatch(a,s)}return!0},getFilteredViolations(){try{if(typeof AppState>"u"||!AppState.appData)return[];const e=(AppState.appData.violations||[]).map(l=>{const c=this.normalizeViolationRecord(l);if(!c)return null;const d=this.getEffectiveFineAmount(c);return d===c.fineAmount?c:{...c,fineAmount:d}}).filter(Boolean).filter(l=>this.isViolationVisibleToCurrentUser(l)),t=this.currentFilters||{},i=String(t.search||"").trim().toLowerCase(),o=t.personType||"",a=(t.violationType||"").toLowerCase(),s=t.severity||"",n=t.status||"";let r=[];if(i&&typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"){const l=[...AppState?.appData?.approvedContractors||[],...AppState?.appData?.contractors||[]].filter(Boolean),c=Utils.findApprovedContractorByTerm(i,l);r=(c.matches&&c.matches.length>0?c.matches:c.contractor?[c.contractor]:[]).map(p=>Utils.buildContractorIdentityMatcher(p,i))}return e.filter(l=>{if(!l||o==="employee"&&!l.employeeName&&l.personType!=="employee"||o==="contractor"&&!l.contractorName&&!l.contractorCode&&!l.contractorId&&l.personType!=="contractor"||a&&(l.violationType||"").trim().toLowerCase()!==a||s&&(l.severity||"")!==s||n&&(l.status||"")!==n)return!1;if(i){let c=!1;if(r.length>0&&r.some(d=>d.violationBelongsToContractor(l))&&(c=!0),c||(c=Object.values(l||{}).map(p=>String(p??"").toLowerCase()).join(" ").includes(i)),!c)return!1}return!0})}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A getFilteredViolations:",e),[]}},renderFilters(e=null){const t=this.currentFilters||{};e!=null&&(t.personType=e);let i=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),i=ViolationTypesManager.getAll()}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",a),i=[]}else i=typeof AppState<"u"&&AppState?.appData?.violationTypes?AppState.appData.violationTypes:[];const o=i.map(a=>`
            <option value="${Utils.escapeHTML(a.name)}" ${t.violationType===a.name?"selected":""}>
                ${Utils.escapeHTML(a.name)}
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
        `},bindFilters(){const e=document.getElementById("violations-filter-search"),t=document.getElementById("violations-filter-person"),i=document.getElementById("violations-filter-type"),o=document.getElementById("violations-filter-severity"),a=document.getElementById("violations-filter-status"),s=document.getElementById("violations-filter-reset");e&&(e.value=this.currentFilters.search||"",e.oninput=()=>{this.currentFilters.search=e.value||"",this.refreshViolationsView({skipFilterRerender:!0})}),t&&(t.value=this.currentFilters.personType||"",t.onchange=()=>{this.currentFilters.personType=t.value,this.refreshViolationsView()}),i&&(i.value=this.currentFilters.violationType||"",i.onchange=()=>{this.currentFilters.violationType=i.value,this.refreshViolationsView()}),o&&(o.value=this.currentFilters.severity||"",o.onchange=()=>{this.currentFilters.severity=o.value,this.refreshViolationsView()}),a&&(a.value=this.currentFilters.status||"",a.onchange=()=>{this.currentFilters.status=a.value,this.refreshViolationsView()}),s&&(s.onclick=()=>{this.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""},this.refreshViolationsView()})},refreshViolationsView(e={}){const t=!!e.skipFilterRerender,i=document.getElementById("violations-list");if(i)switch(document.querySelector(".tab-btn.active")?.dataset.tab||"all"){case"employees":i.innerHTML=this.renderEmployeeViolationsList();break;case"contractors":i.innerHTML=this.renderContractorViolationsList();break;case"analytics":return;default:i.innerHTML=this.renderViolationsList()}const o=document.getElementById("violations-stats-cards");o&&(o.outerHTML=this.renderAllViolationsStats());const a=document.getElementById("violations-filters-container");if(a&&!t){const s=document.querySelector(".tab-btn.active")?.dataset.tab||"all",n=s==="employees"?"employee":s==="contractors"?"contractor":"";a.innerHTML=this.renderFilters(n)}t||this.bindFilters()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-violation-btn");e&&e.addEventListener("click",()=>this.showViolationForm()),this.bindFilters()},100)},async switchTab(e){document.querySelectorAll(".tab-btn").forEach(a=>{a.classList.remove("active"),a.dataset.tab===e&&a.classList.add("active"),a.style.flexShrink||(a.style.setProperty("flex-shrink","0","important"),a.style.setProperty("min-width","fit-content","important"),a.style.setProperty("white-space","nowrap","important"),a.style.setProperty("width","auto","important"),a.style.setProperty("max-width","none","important"))});const i=document.querySelector(".tabs-nav");i&&!i.style.flexWrap&&(i.style.setProperty("flex-wrap","nowrap","important"),i.style.setProperty("overflow-x","auto","important"),i.style.setProperty("overflow-y","visible","important"));const o=document.getElementById("violations-tab-content");if(o)switch(e){case"all":this.currentFilters.personType="",o.innerHTML=`
                    <div class="content-card" id="violations-list-tab">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u0644\u064A \u0625\u0644\u0649 Excel \u0645\u0646\u0633\u0642 \u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u062A\u062D\u0644\u064A\u0644 RCA">
                                    <i class="fas fa-file-excel ml-1"></i>\u062A\u0635\u062F\u064A\u0631 Excel (\u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648 RCA)
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog()" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                    <i class="fas fa-file-pdf ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 (ISO PDF)
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            ${this.renderAllViolationsStats()}
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters("")}
                            </div>
                            <div id="violations-list" class="violations-list-scroll">
                                ${this.renderViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"employees":this.currentFilters.personType="employee",o.innerHTML=`
                    <div class="content-card">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-user-tie ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0641\u0644\u062A\u0631 \u0625\u0644\u0649 Excel">
                                    <i class="fas fa-file-excel ml-1"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog('employee')" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                    <i class="fas fa-file-pdf ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (ISO PDF)
                                </button>
                            </div>
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
                `,this.bindFilters();break;case"contractors":this.currentFilters.personType="contractor",o.innerHTML=`
                    <div class="content-card">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-users-cog ml-2"></i>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="\u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0648\u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0625\u0644\u0649 Excel">
                                    <i class="fas fa-file-excel ml-1"></i>\u062A\u0635\u062F\u064A\u0631 Excel (\u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648 RCA)
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showContractorViolationsReportDialog()">
                                    <i class="fas fa-file-export ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters("contractor")}
                            </div>
                            <div id="violations-list">
                                ${this.renderContractorViolationsList()}
                            </div>
                        </div>
                    </div>
                `,this.bindFilters();break;case"analytics":o.innerHTML=this.renderAnalyticsTab(),setTimeout(()=>{this.updateViolationAnalytics(),this._vBindAnalyticsEvents()},80);break;case"blacklist":o.innerHTML=this.renderBlacklistTab(),this.setupBlacklistEventListeners(),this.loadBlacklistDataAsync().then(()=>{this.refreshBlacklistDisplay()}).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",a)});break}},async switchTabAsync(e){try{await this.switchTab(e)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}},refreshModule(){const e=document.getElementById("violations-btn-refresh");if(e){e.disabled=!0;const i=e.querySelector("i.fa-sync-alt");i&&i.classList.add("fa-spin")}const t=typeof this.load=="function"?this.load():Promise.resolve();Promise.resolve(t).finally(()=>{const i=document.getElementById("violations-btn-refresh");if(i){i.disabled=!1;const o=i.querySelector("i.fa-sync-alt");o&&o.classList.remove("fa-spin")}})},renderEmployeeViolationsList(){const e=this.getFilteredViolations().filter(t=>t.employeeName||t.personType==="employee"||!t.contractorName&&t.employeeName);return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p></div>':`
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
        `},getContractorViolationsExportOptions(){const e=new Map,t=(i,o,a="")=>{const s=String(o||"").replace(/\s+/g," ").trim();if(!s)return;const n=this._normalizeContractorExportName(s);!n||e.has(n)||e.set(n,{id:String(i||a||s).trim(),name:s,code:String(a||"").trim()})};return typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!1}).forEach(i=>t(i.id,i.name,i.code)):((AppState.appData?.contractors||[]).forEach(i=>{t(i.id||i.contractorId,i.name||i.companyName,i.code||i.contractorCode||i.isoCode)}),(AppState.appData?.approvedContractors||[]).forEach(i=>{t(i.id||i.contractorId,i.companyName||i.name,i.code||i.contractorCode)})),(AppState.appData?.violations||[]).forEach(i=>{i?.contractorName&&t(i.contractorId,i.contractorName,i.contractorCode||i.code||i.isoCode)}),Array.from(e.values()).sort((i,o)=>i.name.localeCompare(o.name,"ar",{sensitivity:"base"}))},_normalizeContractorExportName(e){const t=String(e||"").replace(/\s+/g," ").trim();if(!t)return"";const i=t.indexOf(" - "),o=i>0?t.slice(0,i).trim():t;return this._normKeyStr(o)},_buildContractorExportMatcher(e="",t="",i=""){const o=String(e||"").trim(),a=String(t||"").trim(),s=String(i||"").trim();if(!o&&!a&&!s)return null;let n=null;typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"&&(n=Contractors.resolveContractorForAnalytics(o||s,a));const r=o||s||a,l=n||{id:o,name:a,companyName:a,code:s,contractorCode:s};if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(l,r);if(typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function")return Contractors.buildContractorAnalyticsMatchers(l,r);const c=this._normalizeContractorExportName(a||o),d=new Set([o,s].filter(Boolean).map(p=>String(p).trim().toLowerCase()));return{violationBelongsToContractor:p=>{if(!p||!(p.personType==="contractor"||!!String(p.contractorName||"").trim()))return!1;const m=this._normalizeContractorExportName(p.contractorName),u=String(p.contractorId||p.contractorCode||p.code||"").trim().toLowerCase();return u&&d.has(u)?!0:!!c&&m===c}}},showContractorViolationsReportDialog(){const e=this.getContractorViolationsExportOptions(),t=new Date,i=t.getFullYear(),o=[];for(let p=0;p<24;p++){const f=new Date(i,t.getMonth()-p,1),m=f.getFullYear(),u=f.getMonth()+1,g=`${m}-${String(u).padStart(2,"0")}`,v=f.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});o.push({value:g,label:v})}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a);const s=()=>a.remove();a.querySelector(".modal-close")?.addEventListener("click",s),a.querySelector('[data-action="close"]')?.addEventListener("click",s),a.addEventListener("click",p=>{p.target===a&&s()});const n=a.querySelectorAll('input[name="contractor-violations-range-type"]'),r=a.querySelector("#contractor-violations-report-month"),l=a.querySelector("#contractor-violations-report-from-date"),c=a.querySelector("#contractor-violations-report-to-date"),d=()=>{const p=a.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all";r.disabled=p!=="month",r.required=p==="month",l.disabled=p!=="custom",l.required=p==="custom",c.disabled=p!=="custom",c.required=p==="custom"};n.forEach(p=>p.addEventListener("change",d)),a.querySelector("#generate-contractor-violations-report-btn")?.addEventListener("click",async()=>{const p=a.querySelector("#contractor-violations-report-select"),f=p&&p.selectedIndex>=0?p.options[p.selectedIndex]:null,m=p?.selectedIndex===0,u=!m&&f?.value?String(f.value).trim():"",g=!m&&f?.dataset?.contractorName?String(f.dataset.contractorName).trim():"",v=!m&&f?.dataset?.contractorCode?String(f.dataset.contractorCode).trim():"",b=a.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all",k=a.querySelector("#contractor-violations-report-month")?.value||"",V=a.querySelector("#contractor-violations-report-from-date")?.value||"",$=a.querySelector("#contractor-violations-report-to-date")?.value||"",E=a.querySelector('input[name="contractor-violations-export-format"]:checked')?.value||"pdf";if(b==="month"&&!k){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(b==="custom"){if(!V||!$){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(V)>new Date($)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}s(),await this.generateContractorViolationsReport(u,{dateRangeType:b,month:k,fromDate:V,toDate:$,exportFormat:E},g,v)})},_collectContractorViolationsForExport_(e="",t={},i="",o=""){const a=this._buildContractorExportMatcher(e,i,o);let s=(AppState.appData.violations||[]).map(p=>this.normalizeViolationRecord(p)).filter(Boolean).filter(p=>p?.personType==="contractor"||!!String(p?.contractorName||"").trim());a&&(s=s.filter(p=>a.violationBelongsToContractor(p)));const{dateRangeType:n="all",month:r="",fromDate:l="",toDate:c=""}=t||{};if(n==="month"&&r){const[p,f]=r.split("-");s=s.filter(m=>{if(!m.violationDate)return!1;const u=new Date(m.violationDate);return u.getFullYear()===parseInt(p,10)&&u.getMonth()+1===parseInt(f,10)})}else if(n==="custom"&&l&&c){const p=new Date(l);p.setHours(0,0,0,0);const f=new Date(c);f.setHours(23,59,59,999),s=s.filter(m=>{if(!m.violationDate)return!1;const u=new Date(m.violationDate);return u>=p&&u<=f})}let d="";if(n==="month"&&r){const[p,f]=r.split("-");d=new Date(parseInt(p,10),parseInt(f,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else n==="custom"&&l&&c&&(d=`\u0645\u0646 ${Utils.formatDate(l)} \u0625\u0644\u0649 ${Utils.formatDate(c)}`);return{violations:s,periodInfo:d,dateRangeType:n}},exportContractorViolationsToExcel_(e,t="",i=""){if(typeof XLSX>"u")return Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),!1;const o=e.map((c,d)=>({"#":d+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorName||"","\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorCode||"","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorWorker||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":c.violationType||"",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:c.violationDate?Utils.formatDate(c.violationDate):"",\u0627\u0644\u0634\u062F\u0629:c.severity||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630":c.actionTaken||"",\u0627\u0644\u062D\u0627\u0644\u0629:c.status||"","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629":Number(this.getEffectiveFineAmount(c))||0,\u0627\u0644\u0645\u0648\u0642\u0639:c.location||c.site||"",\u0627\u0644\u0648\u0635\u0641:c.description||c.notes||"",\u0627\u0644\u0641\u062A\u0631\u0629:i||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(o);s["!cols"]=[{wch:6},{wch:28},{wch:14},{wch:18},{wch:22},{wch:14},{wch:12},{wch:24},{wch:12},{wch:14},{wch:18},{wch:36},{wch:22}],XLSX.utils.book_append_sheet(a,s,"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");const n=t?`\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644_${t}`:"\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",l=`${String(n).replace(/[\\/:*?"<>|]/g,"_").slice(0,80)}_${new Date().toISOString().slice(0,10)}.xlsx`;return XLSX.writeFile(a,l),!0},async generateContractorViolationsReport(e="",t={},i="",o=""){const a=String(t?.exportFormat||"pdf").toLowerCase()==="excel"?"excel":"pdf",{violations:s,periodInfo:n}=this._collectContractorViolationsForExport_(e,t,i,o);if(!s.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0641\u0642 \u0627\u0644\u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}if(a==="excel"){try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const r=this.exportContractorViolationsToExcel_(s,i,n);Loading.hide(),r&&Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 Excel \u0628\u0646\u062C\u0627\u062D")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 Excel: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (ISO 45001)...");const r=s.filter($=>String($.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,l=s.filter($=>String($.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,c=s.filter($=>String($.severity||"").trim()==="\u0645\u0646\u062E\u0641\u0636\u0629").length,d=s.filter($=>String($.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,p=Math.max(0,s.length-d),f=s.length>0?Math.round(d/s.length*100):0,m=new Set(s.map($=>String($.contractorName||"").trim()).filter(Boolean)).size,u=s.reduce(($,E)=>$+(Number(this.getEffectiveFineAmount(E))||0),0),g=i?`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${i}`:"\u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A \u0627\u0644\u0634\u0631\u0643\u0629",v=this._paginateViolationsList(s,8,11),b=v.length,k=v.map(($,E)=>{const z=E+1,I=z===1,P=z===b,W=$.map((x,_)=>{const R=(E===0?0:8+(E-1)*11)+_+1,h=Number(this.getEffectiveFineAmount(x))||0;return`
                        <tr>
                            <td style="font-weight: 700;">${R}</td>
                            <td style="font-weight: 800; text-align: right;">${Utils.escapeHTML(x.contractorName||"-")}</td>
                            <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(x.violationType||"-")}</td>
                            <td>${x.violationDate?Utils.formatDate(x.violationDate):"-"}</td>
                            <td>
                                <span style="font-weight: 800; color: ${x.severity==="\u0639\u0627\u0644\u064A\u0629"?"#b91c1c":x.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"};">
                                    ${Utils.escapeHTML(x.severity||"-")}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(h)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(x.actionTaken||"-")}</td>
                            <td>
                                <span style="font-weight: 800; color: ${x.status==="\u0645\u062D\u0644\u0648\u0644"?"#047857":"#b91c1c"};">
                                    ${Utils.escapeHTML(x.status||"-")}
                                </span>
                            </td>
                        </tr>
                    `}).join("");return`
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(g,I?"\u0633\u062C\u0644 \u0631\u0633\u0645\u064A \u0645\u0648\u062B\u0642 \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629":`\u062A\u0627\u0628\u0639 \u062C\u062F\u0648\u0644 ${g} \u2014 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`,"DOC-HSE-VIO-CON-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

                        ${I?`
                            ${n?`
                                <div style="display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border-right: 4px solid #ea580c; border-radius: 6px; padding: 6px 12px; margin-bottom: 10px; font-size: 11px;">
                                    <div><strong style="color: #9a3412;">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629:</strong> <span style="color: #0f172a; font-weight: 700;">${Utils.escapeHTML(n)}</span></div>
                                    <div><strong style="color: #9a3412;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062E\u0631\u0627\u062C:</strong> ${Utils.formatDate(new Date)}</div>
                                </div>
                            `:""}

                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${s.length}</div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a;">${m}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                                    <div class="kpi-card-value" style="color: #166534; font-size: 16px;">${this.formatFineAmount(Number(u))}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">\u0639\u0627\u0644\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637\u0629 / \u0645\u0646\u062E\u0641\u0636\u0629</div>
                                    <div class="kpi-card-value" style="color: #92400e; font-size: 15px;">${r} / ${l} / ${c}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                                    <div class="kpi-card-value" style="color: #065f46;">${f}% <small style="font-size: 11px; font-weight: 700;">(${d} \u0645\u062D\u0644\u0648\u0644 / ${p} \u0645\u0641\u062A\u0648\u062D)</small></div>
                                </div>
                            </div>
                        `:""}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 35px;">#</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                    <th style="width: 80px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th style="width: 65px;">\u0627\u0644\u0634\u062F\u0629</th>
                                    <th style="width: 85px;">\u0627\u0644\u063A\u0631\u0627\u0645\u0629</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                                    <th style="width: 70px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${W}
                            </tbody>
                        </table>

                        ${P?`
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0645\u0645\u062B\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</div>
                                    <div class="sig-card-name">\u0627\u0644\u0639\u0644\u0645 \u0648\u0627\u0644\u062A\u0639\u0647\u062F \u0628\u062A\u0644\u0627\u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0636\u0627\u0628\u0637 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</div>
                                    <div class="sig-card-name">\u0627\u0644\u0645\u0631\u0627\u062C\u0639 \u0648\u0627\u0644\u0645\u062F\u0642\u0642 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A</div>
                                    <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-CON-01","Rev. 03","ISO 45001:2018 (Clause 8.1.4.2 & 10.2)")}
                        `:""}

                        <div class="page-counter-footer">\u0635\u0641\u062D\u0629 ${z} \u0645\u0646 ${b}</div>
                    </div>
                `}).join("");Loading.hide();const V=`${String(g).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(g,k,V,!0)}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async deleteViolation(e){if(!e){typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","error");return}const t=(AppState.appData?.violations||[]).find(i=>i.id===e);if(t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"?Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649"):typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649","error");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.")){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");try{const i=(AppState.appData?.violations||[]).find(c=>c.id===e),o=i?.contractorId||"",a=i?.contractorName||"",s=i?.employeeId||"",n=i?.employeeCode||i?.employeeNumber||"",r=i?.employeeName||"";let l;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callBackend)l=await GoogleIntegration.callBackend("deleteViolationFromSheet",{id:e});else throw new Error("\u062E\u062F\u0645\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");if(l&&l.success){AppState.appData&&AppState.appData.violations&&(AppState.appData.violations=AppState.appData.violations.filter(c=>c.id!==e)),(o||a)&&(AppState.appData?.contractors||[]).forEach(d=>{d&&(d.id===o||d.name===a||d.contractorName===a)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),(s||n||r)&&(AppState.appData?.employees||[]).forEach(d=>{d&&(d.id===s||d.employeeNumber===n||d.employeeCode===n||d.name===r)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{this.updateAllViolationsStats()}catch{}if(this.refreshViolationsView(),typeof Contractors<"u"&&Contractors.load)try{(AppState?.currentSection||"")==="contractors"&&!Contractors._isLoading&&Contractors.load()}catch{}if(typeof Employees<"u"&&Employees.loadEmployeesList)try{(AppState?.currentSection||"")==="employees"&&Employees.loadEmployeesList()}catch{}typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629","success")}else throw new Error(l?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(i){typeof Utils<"u"&&Utils.showToast?Utils.showToast("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message,"error"):alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},renderAnalyticsTab(){this._vEnsureChartJS().catch(()=>{});const e=(i,o)=>this._t(i,o),t=this.getCurrentCurrency();return`
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
                        ${["30","90","180","365","0"].map((i,o)=>{const a=[e("module.violations.analytics.period.30d","30 \u064A\u0648\u0645"),e("module.violations.analytics.period.3m","3 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.6m","6 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.1y","\u0633\u0646\u0629"),e("module.violations.analytics.period.all","\u0627\u0644\u0643\u0644")],s=(this._violPeriod||"0")===i;return`<button class="viol-period-btn" data-period="${i}" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.18)"};color:${s?"#991b1b":"#fff"};">${a[o]}</button>`}).join("")}
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
                    ${[{id:"viol-af-factory",icon:"fas fa-industry",color:"#ec4899",label:e("module.violations.analytics.filter.factory","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A")},{id:"viol-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:e("module.violations.analytics.filter.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635")},{id:"viol-af-type",icon:"fas fa-tag",color:"#dc2626",label:e("module.violations.analytics.filter.type","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")},{id:"viol-af-sev",icon:"fas fa-exclamation-circle",color:"#f59e0b",label:e("module.violations.analytics.filter.severity","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629")},{id:"viol-af-status",icon:"fas fa-circle",color:"#10b981",label:e("module.violations.analytics.filter.status","\u0627\u0644\u062D\u0627\u0644\u0629")},{id:"viol-af-loc",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:e("module.violations.analytics.filter.location","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")},{id:"viol-af-rca",icon:"fas fa-search-plus",color:"#b91c1c",label:e("module.violations.analytics.filter.rca","\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)")}].map(i=>`
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

            <!-- \u2500\u2500 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (RCA) \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-search-plus" style="color:#b91c1c;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${e("module.violations.analytics.chart.rootCause","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (Root Cause Analysis - RCA)")}</span>
                    </div>
                    <span id="viol-rca-total-badge" style="background:#fef2f2;color:#991b1b;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                </div>
                <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;align-items:center;">
                    <div style="position:relative;height:250px;">
                        <canvas id="viol-chart-rca"></canvas>
                        <div id="viol-chart-rca-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${e("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>
                    </div>
                    <div id="viol-rca-breakdown-list" style="display:flex;flex-direction:column;gap:10px;max-height:260px;overflow-y:auto;padding-left:4px;"></div>
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
        </div>`},async updateViolationAnalytics(){const e=document.getElementById("viol-analytics-root");if(!e)return;const t=(h,U)=>this._t(h,U),o=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",a=parseInt(this._violPeriod||"0",10),n=(AppState.appData.violations||[]).map(h=>this.normalizeViolationRecord(h)).filter(h=>h&&this.isViolationVisibleToCurrentUser(h)),r=this._vFilterByPeriod(n,a);this._vPopulateFilters(r);const l=this._vApplyFilters(r),c=l.length,d=document.getElementById("viol-filter-count");d&&(d.textContent=`${c} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const p=l.filter(h=>h.personType==="employee"),f=l.filter(h=>h.personType==="contractor"),m=l.filter(h=>h.severity==="\u0639\u0627\u0644\u064A\u0629").length,u=l.filter(h=>h.status==="\u0645\u062D\u0644\u0648\u0644").length,g=l.filter(h=>h.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644").length,v=l.filter(h=>h.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,b=c>0?Math.round(u/c*100):0,k=l.reduce((h,U)=>h+(Number(U.fineAmount)||0),0),V=l.filter(h=>{if(!h.violationDate)return!1;const U=new Date(h.violationDate),T=new Date;return U.getFullYear()===T.getFullYear()&&U.getMonth()===T.getMonth()}).length,$=document.getElementById("viol-kpi-strip");if($){const h=[{id:"total",label:t("module.violations.analytics.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),value:c.toLocaleString("en-US"),icon:"fas fa-exclamation-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{id:"employees",label:t("module.violations.analytics.kpi.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:p.length.toLocaleString("en-US"),icon:"fas fa-user-tie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{id:"contractors",label:t("module.violations.analytics.kpi.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),value:f.length.toLocaleString("en-US"),icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{id:"highSev",label:t("module.violations.analytics.kpi.highSeverity","\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629"),value:m.toLocaleString("en-US"),icon:"fas fa-bomb",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{id:"resolved",label:t("module.violations.analytics.kpi.resolved","\u0645\u062D\u0644\u0648\u0644\u0629"),value:u.toLocaleString("en-US"),icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{id:"unresolved",label:t("module.violations.analytics.kpi.unresolved","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629"),value:g.toLocaleString("en-US"),icon:"fas fa-times-circle",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{id:"resolRate",label:t("module.violations.analytics.kpi.resolRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"),value:b.toLocaleString("en-US")+"%",icon:"fas fa-chart-pie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{id:"totalFines",label:t("module.violations.analytics.kpi.totalFines","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A"),value:k>0?this.formatFineAmount(k):"\u2014",icon:"fas fa-coins",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{id:"thisMonth",label:t("module.violations.analytics.kpi.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631"),value:V.toLocaleString("en-US"),icon:"fas fa-calendar-day",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"}];$.innerHTML=h.map(U=>`
                <div class="viol-kpi-card" data-kpi="${U.id}" title="\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062D\u0633\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0639\u064A\u0627\u0631" style="background:${U.bg};border:1.5px solid ${U.border};border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all .2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;background:${U.color};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${U.icon}" style="color:#fff;font-size:17px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.4rem;font-weight:800;color:${U.color};line-height:1.1;">${U.value}</div>
                        <div style="font-size:0.82rem;font-weight:700;color:#475569;margin-top:4px;white-space:nowrap;">${U.label}</div>
                    </div>
                </div>`).join("")}if(!await this._vEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",`<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t("module.violations.analytics.chartError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.")}</span></div>`);return}this._vDrawFactoryBreakdown("viol-chart-factory","viol-factory-breakdown-list",l);const z=this._vGroupBy(l,"status"),I={\u0645\u062D\u0644\u0648\u0644:"rgba(16,185,129,0.85)",resolved:"rgba(16,185,129,0.85)","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"rgba(239,68,68,0.85)",unresolved:"rgba(239,68,68,0.85)",open:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(245,158,11,0.85)","in progress":"rgba(245,158,11,0.85)","under review":"rgba(245,158,11,0.85)"};this._vDrawDoughnut("viol-chart-status",z.labels.map(h=>t("module.violations.status."+h,h)),z.data,z.labels.map(h=>I[h.toLowerCase()]||I[h]||"rgba(148,163,184,0.8)"));const P=this._vGroupBy(l,"severity"),W={\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",high:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",medium:"rgba(245,158,11,0.85)",moderate:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(16,185,129,0.85)",low:"rgba(16,185,129,0.85)",\u0645\u0646\u062E\u0636\u0629:"rgba(16,185,129,0.85)"};this._vDrawDoughnut("viol-chart-sev",P.labels.map(h=>t("module.violations.severity."+h,h)),P.data,P.labels.map(h=>W[h.toLowerCase()]||W[h]||"rgba(148,163,184,0.8)")),this._vDrawTrend("viol-chart-trend",r),this._vDrawListBreakdown("viol-chart-rca","viol-rca-breakdown-list",l,"rootCause",10,["rgba(220,38,38,0.85)","rgba(234,88,12,0.85)","rgba(217,119,6,0.85)","rgba(13,148,136,0.85)","rgba(37,99,235,0.85)","rgba(124,58,237,0.85)","rgba(190,24,93,0.85)","rgba(75,85,99,0.85)"],"#fef2f2","#991b1b","viol-rca-total-badge","viol-af-rca",null),this._vDrawTypeBreakdown("viol-chart-type","viol-type-breakdown-list",l,10),this._vDrawListBreakdown("viol-chart-loc","viol-loc-breakdown-list",l,"violationLocation",8,["rgba(245,158,11,0.85)","rgba(234,179,8,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)"],"#fffbeb","#92400e","viol-loc-total-badge","viol-af-loc",null),this._vDrawListBreakdown("viol-chart-emp","viol-emp-breakdown-list",p,"employeeName",10,["rgba(99,102,241,0.85)","rgba(79,70,229,0.85)","rgba(67,56,202,0.85)","rgba(55,48,163,0.85)","rgba(109,40,217,0.85)","rgba(124,58,237,0.85)","rgba(139,92,246,0.85)","rgba(167,139,250,0.85)","rgba(196,181,253,0.9)","rgba(76,29,149,0.85)"],"#eef2ff","#4338ca","viol-emp-total-badge",null,null),this._vDrawListBreakdown("viol-chart-con","viol-con-breakdown-list",f,"contractorName",10,["rgba(249,115,22,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)","rgba(180,83,9,0.85)","rgba(217,119,6,0.85)","rgba(245,158,11,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)"],"#fff7ed","#c2410c","viol-con-total-badge",null,null),this._vDrawFinesByType("viol-chart-fines",l);const x=l.filter(h=>{const U=String(h.severity||"").trim().toLowerCase(),T=String(h.status||"").trim().toLowerCase();return(U==="\u0639\u0627\u0644\u064A\u0629"||U==="high")&&!(T==="\u0645\u062D\u0644\u0648\u0644"||T==="resolved")}).sort((h,U)=>(U.fineAmount||0)-(h.fineAmount||0)).slice(0,20),_=document.getElementById("viol-critical-count"),R=document.getElementById("viol-critical-tbody");_&&(_.textContent=`${x.length} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`),R&&(x.length===0?R.innerHTML=`<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t("module.violations.analytics.table.noCritical","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0631\u062C\u0629 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629")}</td></tr>`:R.innerHTML=x.map((h,U)=>{const T=Utils.escapeHTML(h.employeeName||h.contractorName||"\u2014"),q=h.personType==="contractor"?`<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</span>`:`<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</span>`,J=`<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.severity.high","\u0639\u0627\u0644\u064A\u0629")}</span>`,N={"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"background:#fef3c7;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#ede9fe;color:#5b21b6;"}[h.status]||"background:#f1f5f9;color:#374151;",et=Number(h.fineAmount)||0,dt=U%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${dt};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${dt}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${h.violationDate?new Date(h.violationDate).toLocaleDateString(o,{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${T}</td>
                        <td style="padding:9px 12px;">${q}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.violationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.violationLocation||"\u2014")}</td>
                        <td style="padding:9px 12px;">${J}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${N}">${t("module.violations.status."+h.status,h.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${et>0?"#dc2626":"#94a3b8"};">${et>0?this.formatFineAmount(et):"\u2014"}</td>
                    </tr>`}).join(""))},_vFilterByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(o=>{if(!o.violationDate)return!0;const a=new Date(o.violationDate);return!isNaN(a.getTime())&&a>=i})},_vGroupBy(e,t,i=0){const o=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a={};e.forEach(n=>{const r=String(n[t]||o).trim()||o;a[r]=(a[r]||0)+1});let s=Object.entries(a).sort((n,r)=>r[1]-n[1]);return i>0&&(s=s.slice(0,i)),{labels:s.map(n=>n[0]),data:s.map(n=>n[1])}},_vGetFactoryName(e){const t=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return!e||typeof e!="object"?t:String(e.factory||e.violationLocation||e.violationPlace||t).trim()||t},_vApplyFilters(e){const t=p=>{const f=document.getElementById(p);return f?f.value.trim():""},i=t("viol-af-factory"),o=t("viol-af-ptype"),a=t("viol-af-type"),s=t("viol-af-sev"),n=t("viol-af-status"),r=t("viol-af-loc"),l=t("viol-af-rca"),c=[i,o,a,s,n,r,l].some(p=>p!==""),d=document.getElementById("viol-filter-badge");return d&&(d.style.display=c?"inline":"none"),e.filter(p=>!(i&&this._vGetFactoryName(p)!==i||o&&String(p.personType||"").trim()!==o||a&&String(p.violationType||"").trim()!==a||s&&String(p.severity||"").trim()!==s||n&&String(p.status||"").trim()!==n||r&&String(p.violationLocation||"").trim()!==r||l&&String(p.rootCause||"").trim()!==l))},_vPopulateFilters(e){const t=(s,n)=>this._t(s,n),i=s=>[...new Set(e.map(s).filter(Boolean))].sort(),o=(s,n,r)=>{const l=document.getElementById(s);if(!l)return;const c=l.value;l.innerHTML=`<option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>`+n.map(d=>{const p=r?t(r+d,d):d;return`<option value="${d}"${d===c?" selected":""}>${p}</option>`}).join("")},a=document.getElementById("viol-af-ptype");if(a){const s=a.value;a.innerHTML=`
                <option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                <option value="employee"${s==="employee"?" selected":""}>${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</option>
                <option value="contractor"${s==="contractor"?" selected":""}>${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</option>
            `}o("viol-af-factory",i(s=>this._vGetFactoryName(s))),o("viol-af-type",i(s=>String(s.violationType||"").trim())),o("viol-af-sev",i(s=>String(s.severity||"").trim()),"module.violations.severity."),o("viol-af-status",i(s=>String(s.status||"").trim()),"module.violations.status."),o("viol-af-loc",i(s=>String(s.violationLocation||"").trim())),o("viol-af-rca",i(s=>String(s.rootCause||"").trim()))},_vDrawListBreakdown(e,t,i,o,a,s,n,r,l,c,d){const p=document.getElementById(e),f=document.getElementById(e+"-empty"),m=document.getElementById(t),u=l?document.getElementById(l):null;if(!p)return;const g=(I,P)=>this._t(I,P),v=g("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),b={};i.forEach(I=>{const P=String(I[o]||v).trim()||v;b[P]=(b[P]||0)+1});let k=Object.entries(b).sort((I,P)=>P[1]-I[1]);a>0&&(k=k.slice(0,a));const V=k.map(I=>I[0]),$=k.map(I=>I[1]),E=i.length;if(u&&(u.textContent=`${E.toLocaleString("en-US")} ${g("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`,n&&(u.style.background=n),r&&(u.style.color=r)),!$.length||E===0){p.style.display="none",f&&(f.style.display="flex"),m&&(m.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${g("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}f&&(f.style.display="none"),p.style.display="",this._violCharts||(this._violCharts={});const z=this._violCharts[e];if(z)try{z.destroy()}catch{}this._violCharts[e]=new Chart(p,{type:"doughnut",data:{labels:V,datasets:[{data:$,backgroundColor:V.map((I,P)=>s[P%s.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:I=>{const P=I.parsed,W=E>0?(P/E*100).toFixed(1):"0";return` ${I.label}: ${P.toLocaleString("en-US")} (${W}%)`}}}}}}),m&&(m.innerHTML=k.map((I,P)=>{const W=I[0],x=I[1],_=E>0?(x/E*100).toFixed(1):0,R=s[P%s.length],h=P+1,U=d?g(d+W,W):W;return`
                <div class="viol-list-item" data-filter-val="${Utils.escapeHTML(W)}" data-filter-id="${c||""}" title="${Utils.escapeHTML(U)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;padding:9px 12px;cursor:${c?"pointer":"default"};transition:all 0.2s;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:7px;">
                            <span style="width:20px;height:20px;border-radius:50%;background:${R};color:#fff;font-size:0.68rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${h}</span>
                            <span style="font-weight:800;font-size:0.85rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:155px;">${Utils.escapeHTML(U)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:0.95rem;color:${R.replace("0.85","1")};">${x.toLocaleString("en-US")}</span>
                            <span style="font-size:0.78rem;font-weight:700;color:#64748b;">(${_}%)</span>
                        </div>
                    </div>
                    <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                        <div style="width:${_}%;height:100%;background:${R};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),c&&m.querySelectorAll(".viol-list-item").forEach(I=>{I.addEventListener("mouseover",()=>{I.style.background="#f8fafc",I.style.borderColor="#cbd5e1"}),I.addEventListener("mouseout",()=>{I.style.background="#fff",I.style.borderColor="#f1f5f9"}),I.addEventListener("click",()=>{const P=I.getAttribute("data-filter-val"),W=document.getElementById(c);W&&(W.value=W.value===P?"":P,this.updateViolationAnalytics())})}))},_vDrawTypeBreakdown(e,t,i,o){const a=document.getElementById(e),s=document.getElementById(e+"-empty"),n=document.getElementById(t),r=document.getElementById("viol-type-total-badge");if(!a)return;const l=(v,b)=>this._t(v,b),c=i.length;r&&(r.textContent=`${c.toLocaleString("en-US")} ${l("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const d={};i.forEach(v=>{const b=String(v.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";d[b]||(d[b]=0),d[b]++});let p=Object.entries(d).sort((v,b)=>b[1]-v[1]);o>0&&(p=p.slice(0,o));const f=p.map(v=>v[0]),m=p.map(v=>v[1]),u=["rgba(220,38,38,0.85)","rgba(234,88,12,0.85)","rgba(202,138,4,0.85)","rgba(22,163,74,0.85)","rgba(2,132,199,0.85)","rgba(99,102,241,0.85)","rgba(168,85,247,0.85)","rgba(236,72,153,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!m.length||c===0){a.style.display="none",s&&(s.style.display="flex"),n&&(n.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${l("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}s&&(s.style.display="none"),a.style.display="",this._violCharts||(this._violCharts={});const g=this._violCharts[e];if(g)try{g.destroy()}catch{}this._violCharts[e]=new Chart(a,{type:"doughnut",data:{labels:f,datasets:[{data:m,backgroundColor:f.map((v,b)=>u[b%u.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:v=>{const b=v.parsed,k=c>0?(b/c*100).toFixed(1):"0";return` ${v.label}: ${b.toLocaleString("en-US")} (${k}%)`}}}}}}),n&&(n.innerHTML=p.map((v,b)=>{const k=v[0],V=v[1],$=c>0?(V/c*100).toFixed(1):0,E=u[b%u.length],z=b+1;return`
                <div class="viol-type-item" data-vtype="${Utils.escapeHTML(k)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 ${Utils.escapeHTML(k)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;padding:10px 14px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#fef2f2';this.style.borderColor='#fca5a5';" onmouseout="this.style.background='#fff';this.style.borderColor='#f1f5f9';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:22px;height:22px;border-radius:50%;background:${E};color:#fff;font-size:0.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${z}</span>
                            <span style="font-weight:800;font-size:0.88rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;" title="${Utils.escapeHTML(k)}">${Utils.escapeHTML(k)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:1.0rem;color:${E.replace("0.85","1")};">${V.toLocaleString("en-US")}</span>
                            <span style="font-size:0.82rem;font-weight:700;color:#64748b;">(${$}%)</span>
                        </div>
                    </div>
                    <div style="height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${$}%;height:100%;background:${E};border-radius:4px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),n.querySelectorAll(".viol-type-item").forEach(v=>{v.addEventListener("click",()=>{const b=v.getAttribute("data-vtype"),k=document.getElementById("viol-af-type");k&&(k.value=k.value===b?"":b,this.updateViolationAnalytics())})}))},_vDrawFactoryBreakdown(e,t,i){const o=document.getElementById(e),a=document.getElementById(e+"-empty"),s=document.getElementById(t),n=document.getElementById("viol-factory-total-badge");if(!o)return;const r=(g,v)=>this._t(g,v),l=i.length;n&&(n.textContent=`${l.toLocaleString("en-US")} ${r("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const c={};i.forEach(g=>{const v=this._vGetFactoryName(g);c[v]||(c[v]={count:0,fineSum:0}),c[v].count+=1,c[v].fineSum+=Number(g.fineAmount)||0});const d=Object.entries(c).sort((g,v)=>v[1].count-g[1].count),p=d.map(g=>g[0]),f=d.map(g=>g[1].count),m=["rgba(236,72,153,0.85)","rgba(99,102,241,0.85)","rgba(245,158,11,0.85)","rgba(16,185,129,0.85)","rgba(59,130,246,0.85)","rgba(139,92,246,0.85)","rgba(239,68,68,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!f.length||l===0){o.style.display="none",a&&(a.style.display="flex"),s&&(s.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:20px;">${r("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}a&&(a.style.display="none"),o.style.display="",this._violCharts||(this._violCharts={});const u=this._violCharts[e];if(u)try{u.destroy()}catch{}this._violCharts[e]=new Chart(o,{type:"doughnut",data:{labels:p,datasets:[{data:f,backgroundColor:p.map((g,v)=>m[v%m.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:g=>{const v=g.parsed,b=l>0?(v/l*100).toFixed(1):"0";return` ${g.label}: ${v.toLocaleString("en-US")} (${b}%)`}}}}}}),s&&(s.innerHTML=d.map((g,v)=>{const b=g[0],k=g[1].count,V=g[1].fineSum,$=l>0?(k/l*100).toFixed(1):0,E=m[v%m.length],z=V>0?this.formatFineAmount(V):"";return`
                <div class="viol-factory-item" data-factory="${Utils.escapeHTML(b)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u062D\u0633\u0628 \u0645\u0635\u0646\u0639 ${Utils.escapeHTML(b)}" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 14px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.03);" onmouseover="this.style.background='#fdf2f8';this.style.borderColor='#fbcfe8';" onmouseout="this.style.background='#ffffff';this.style.borderColor='#e2e8f0';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:0.95rem;color:#0f172a;">
                            <span style="width:12px;height:12px;border-radius:50%;background:${E};display:inline-block;flex-shrink:0;box-shadow:0 0 6px ${E};"></span>
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;" title="${Utils.escapeHTML(b)}">${Utils.escapeHTML(b)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;font-size:0.88rem;">
                            <span style="font-weight:800;color:#be185d;font-size:1.05rem;">${k.toLocaleString("en-US")}</span>
                            <span style="color:#64748b;font-size:0.85rem;font-weight:700;">(${$}%)</span>
                            ${z?`<span style="background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:8px;font-weight:700;font-size:0.8rem;">${z}</span>`:""}
                        </div>
                    </div>
                    <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${$}%;height:100%;background:${E};border-radius:4px;transition:width 0.5s ease;"></div>
                    </div>
                </div>`}).join(""),s.querySelectorAll(".viol-factory-item").forEach(g=>{g.addEventListener("click",()=>{const v=g.getAttribute("data-factory"),b=document.getElementById("viol-af-factory");b&&(b.value=b.value===v?"":v,this.updateViolationAnalytics())})}))},_vDrawDoughnut(e,t,i,o){const a=document.getElementById(e),s=document.getElementById(e+"-empty");if(!a)return;if(!i.length||i.reduce((l,c)=>l+c,0)===0){a.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),a.style.display="";const n=i.reduce((l,c)=>l+c,0);this._violCharts||(this._violCharts={});const r=this._violCharts[e];if(r)try{r.destroy()}catch{}this._violCharts[e]=new Chart(a,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:o||this._vChartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:13,weight:"bold",family:"'Cairo', sans-serif"},usePointStyle:!0,boxWidth:10}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed.toLocaleString("en-US")} (${n>0?(l.parsed/n*100).toFixed(1):0}%)`}}}}})},_vDrawHBar(e,t,i,o){const a=document.getElementById(e),s=document.getElementById(e+"-empty");if(!a)return;if(!i.length||i.reduce((r,l)=>r+l,0)===0){a.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),a.style.display="",this._violCharts||(this._violCharts={});const n=this._violCharts[e];if(n)try{n.destroy()}catch{}this._violCharts[e]=new Chart(a,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:o||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${r.parsed.x.toLocaleString("en-US")}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:12,weight:"bold"}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:12,weight:"bold",family:"'Cairo', sans-serif"},callback:r=>String(t[r]).length>22?String(t[r]).slice(0,21)+"\u2026":t[r]}}}}})},_vDrawTrend(e,t){const i=document.getElementById(e),o=document.getElementById(e+"-empty");if(!i)return;const a=(p,f)=>this._t(p,f),n=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",r=new Date,l=[];for(let p=11;p>=0;p--){const f=new Date(r.getFullYear(),r.getMonth()-p,1),m=f.toLocaleDateString(n,{month:"long"});l.push({year:f.getFullYear(),month:f.getMonth(),label:`${m} ${f.getFullYear()}`})}const c=l.map(p=>t.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return!isNaN(m.getTime())&&m.getFullYear()===p.year&&m.getMonth()===p.month}).length);if(c.reduce((p,f)=>p+f,0)===0){i.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),i.style.display="",this._violCharts||(this._violCharts={});const d=this._violCharts[e];if(d)try{d.destroy()}catch{}this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:l.map(p=>p.label),datasets:[{label:a("module.violations.analytics.chart.violationCount","\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),data:c,backgroundColor:c.map(p=>p===Math.max(...c)?"rgba(220,38,38,0.85)":"rgba(220,38,38,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:a("module.violations.analytics.chart.trendLine","\u0627\u0644\u0627\u062A\u062C\u0627\u0647"),data:c,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_vDrawFinesByType(e,t){const i=document.getElementById(e),o=document.getElementById(e+"-empty");if(!i)return;const a=t.filter(m=>(Number(m.fineAmount)||0)>0);if(!a.length){i.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),i.style.display="";const s={};a.forEach(m=>{const u=String(m.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();s[u]=(s[u]||0)+(Number(m.fineAmount)||0)});const n=Object.entries(s).sort((m,u)=>u[1]-m[1]).slice(0,10),r=n.map(m=>m[0]),l=this.getCurrentCurrency(),c=this.getCurrencyLabel("long"),d=n.map(m=>{const u=this.convertFineAmount(m[1],l);return l==="USD"?Number(u.toFixed(2)):Math.round(u)});this._violCharts||(this._violCharts={});const p=this._violCharts[e];if(p)try{p.destroy()}catch{}const f=m=>l==="USD"?m.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):m.toLocaleString("en-US",{maximumFractionDigits:0});this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:d,backgroundColor:"rgba(217,119,6,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>` ${f(m.parsed.x)} ${c}`}}},scales:{x:{beginAtZero:!0,ticks:{font:{size:11},callback:m=>f(m)},grid:{color:"#f1f5f9"},title:{display:!0,text:`\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 (${c})`,font:{size:11}}},y:{ticks:{font:{size:11},callback:m=>String(r[m]).length>18?String(r[m]).slice(0,17)+"\u2026":r[m]}}}}})},async _vEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>{const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",o.onload=()=>t(!0),o.onerror=()=>t(!1),document.head.appendChild(o)},document.head.appendChild(i)})},_vChartColors(e){const t=["rgba(220,38,38,0.8)","rgba(245,158,11,0.8)","rgba(16,185,129,0.8)","rgba(99,102,241,0.8)","rgba(249,115,22,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,o)=>t[o%t.length])},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(i=>{const o=Array.from(document.querySelectorAll("script[src]")).find(s=>String(s.src||"").includes(e));if(o){const s=()=>i(!!t());o.addEventListener("load",s,{once:!0}),setTimeout(s,4e3);return}const a=document.createElement("script");a.src=e,a.async=!0,a.onload=()=>i(!!t()),a.onerror=()=>i(!1),document.head.appendChild(a)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("viol-cairo-font-link")){const e=document.createElement("link");e.id="viol-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(e){const t=`
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
</style>`,i=this._stripScriptsFromHtml_(e);return i?i.includes("</head>")?i.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${i}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const i={scale:2.5,backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(e.scrollWidth,900),windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},o=[{...i,useCORS:!0,allowTaint:!1},{...i,useCORS:!0,allowTaint:!0},{...i,useCORS:!1,allowTaint:!0}];let a=null;for(let s=0;s<o.length;s++)try{const n=await html2canvas(e,o[s]);if(n&&n.width>0&&n.height>0)return n}catch(n){a=n}if(a)throw a;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const o=this._prepareArabicPdfHtml_(e),a=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,s=document.createElement("iframe");s.setAttribute("aria-hidden","true"),s.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(s);try{s.srcdoc=o,await new Promise(p=>{s.onload=p,s.onerror=p,setTimeout(p,6e3)});const n=s.contentDocument||s.contentWindow?.document;if(!n)return!1;await this._waitArabicPdfFontsReady_(n);const r=Array.from(n.images||[]);await Promise.all(r.map(p=>new Promise(f=>{if(p.complete)return f();p.onload=f,p.onerror=f,setTimeout(f,3e3)})));const l=n.querySelector(".report-wrapper")||n.body;if(!l)return!1;const c=await this._captureHtmlToCanvas_(l);if(!c)return!1;const d=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return d?(Utils.PdfExport.appendCanvasAsPdfPages(d,c,{marginMm:8}),Utils.PdfExport.savePdf(d,a),!0):!1}catch(n){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",n),!1}finally{s.remove()}},_getViolAnalyticsPeriodLabel_(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._violPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_buildViolAnalyticsExportLegend_(){const e=a=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(a):String(a??""),t=e(this._getViolAnalyticsPeriodLabel_()),i=e(document.getElementById("viol-filter-count")?.textContent?.trim()||""),o=e(new Date().toLocaleString("ar-SA-u-nu-latn",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return`
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ${t}</div>
                ${i?`<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${i}</div>`:""}
                <div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${o}</div>
            </div>
        </div>`},async _vExportPDF(){const e=document.getElementById("viol-analytics-capture");if(!e)return;const t=document.getElementById("viol-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{if(await this._ensureReportPdfLibs_(),typeof html2canvas>"u")throw new Error("html2canvas unavailable");const o=document.getElementById("viol-filter-panel"),a=o&&o.style.display!=="none";a&&(o.style.display="none");const s=Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),n=await html2canvas(e,{scale:s,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:0,logging:!1});a&&(o.style.display="");const{dataUrl:r}=Utils.PdfExport.compressCanvasToJpegDataUrl(n,Utils.PdfExport.TARGET_MAX_BYTES),l="\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0648\u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",c="Violations Performance Analytics & Incident Metrics KPI Report",d=this._buildViolAnalyticsExportLegend_(),p=`
                <div class="report-page landscape">
                    ${this.getIsoPrintHeaderHtml(l,c,"DOC-HSE-VIO-KPI-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

                    <div style="margin: 0 auto 12px auto; max-width: 100%; text-align: center;">
                        <img src="${r}" alt="Violations Analytics Dashboard" style="width: 100%; max-width: 100%; height: auto; display: block; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                    </div>

                    ${d?`<div style="margin-top: 8px;">${d}</div>`:""}

                    <div class="signatures-grid">
                        <div class="sig-card">
                            <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>
                            <div class="sig-card-name">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0621 \u0648\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</div>
                            <div class="sig-card-name">\u0631\u0626\u064A\u0633 \u0642\u0633\u0645 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A</div>
                            <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                        </div>
                    </div>

                    ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-KPI-01","Rev. 03","ISO 45001:2018 (Clause 9.1)")}
                </div>
            `,f=`Violations-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(l,p,f,!0)}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_vBindAnalyticsEvents(){const e=document.getElementById("viol-analytics-root");if(!e)return;e.querySelectorAll(".viol-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._violPeriod=r.getAttribute("data-period"),e.querySelectorAll(".viol-period-btn").forEach(l=>{const c=l===r;l.style.background=c?"#fff":"rgba(255,255,255,0.15)",l.style.color=c?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const t=document.getElementById("viol-analytics-refresh");t&&t.addEventListener("click",()=>this.updateViolationAnalytics());const i=document.getElementById("viol-export-pdf-btn");i&&i.addEventListener("click",()=>this._vExportPDF());const o=document.getElementById("viol-toggle-filters-btn"),a=document.getElementById("viol-filter-panel");o&&a&&o.addEventListener("click",()=>{const r=a.style.display!=="none";a.style.display=r?"none":"block",o.style.background=r?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const s=document.getElementById("viol-filter-reset-btn");s&&s.addEventListener("click",()=>{["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(r=>{const l=document.getElementById(r);l&&(l.value="")}),this.updateViolationAnalytics()}),["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(r=>{const l=document.getElementById(r);l&&l.addEventListener("change",()=>this.updateViolationAnalytics())}),e.querySelectorAll(".viol-kpi-card").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-kpi");if(l==="total")["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(c=>{const d=document.getElementById(c);d&&(d.value="")});else if(l==="employees"){const c=document.getElementById("viol-af-ptype");c&&(c.value=c.value==="employee"?"":"employee")}else if(l==="contractors"){const c=document.getElementById("viol-af-ptype");c&&(c.value=c.value==="contractor"?"":"contractor")}else if(l==="highSev"){const c=document.getElementById("viol-af-sev");c&&(c.value=c.value==="\u0639\u0627\u0644\u064A\u0629"?"":"\u0639\u0627\u0644\u064A\u0629")}else if(l==="resolved"){const c=document.getElementById("viol-af-status");c&&(c.value=c.value==="\u0645\u062D\u0644\u0648\u0644"?"":"\u0645\u062D\u0644\u0648\u0644")}else if(l==="unresolved"){const c=document.getElementById("viol-af-status");c&&(c.value=c.value==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"":"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644")}this.updateViolationAnalytics()})}),e.querySelectorAll(".viol-curr-btn").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-curr");this.setCurrentCurrency(l),e.querySelectorAll(".viol-curr-btn").forEach(c=>{const d=c.getAttribute("data-curr")===l;c.style.background=d?"#fff":"transparent",c.style.color=d?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const n=document.getElementById("viol-curr-rate-btn");n&&n.addEventListener("click",()=>{const r=this.getExchangeRate(),l=window.prompt(`\u0623\u062F\u062E\u0644 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 (\u0643\u0645 \u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A \u064A\u0633\u0627\u0648\u064A 1 \u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A):

\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ${r} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`,String(r));if(l===null)return;const c=parseFloat(String(l).trim());if(!Number.isFinite(c)||c<=0){typeof Notification<"u"&&Notification.error?Notification.error("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"):alert("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}this.setExchangeRate(c),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0625\u0644\u0649 ${c} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`),this.updateViolationAnalytics()})},loadContractorsIntoSelect(e,t="",i=""){if(!e||e.tagName!=="SELECT"){Utils.safeWarn("\u26A0\uFE0F loadContractorsIntoSelect: \u0639\u0646\u0635\u0631 select \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}if(typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"){Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:t,selectedContractorId:i,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1});return}let o=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function")try{const n=Contractors.getAllContractorsForModules();if(n&&n.length>0){const r=new Map;n.forEach(l=>{const c=(l.name||"").trim();if(!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")return;const d=((l.code||l.isoCode||"")+"").trim().toUpperCase(),p=((l.licenseNumber||"")+"").trim(),f=/^CON-\d+$/i.test(d)?`CODE:${d}`:p?`LIC:${p}`:l.id?`ID:${l.id}`:`NAME:${c.toLowerCase()}`;r.has(f)||r.set(f,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||"").trim()})}),o=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 getAllContractorsForModules:",n)}if(o.length===0&&typeof Contractors<"u"&&typeof Contractors.getApprovedOptions=="function")try{const n=Contractors.getApprovedOptions(!1);n&&n.length>0&&(o=n.map(r=>({id:r.id||r.contractorId||"",name:(r.name||"").trim(),serviceType:(r.serviceType||"").trim(),licenseNumber:(r.licenseNumber||"").trim()})).filter(r=>r.name))}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",n)}if(o.length===0){const n=AppState.appData.approvedContractors||[],r=new Map;n.filter(l=>l&&(l.companyName||l.name)&&l.isActive!=="inactive"&&l.isActive!==!1&&l.isActive!=="false"&&l.isActive!=="FALSE").forEach(l=>{const c=(l.companyName||l.name||"").trim();!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"||r.has(c)||r.set(c,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||l.contractNumber||"").trim()})}),o=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}e.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>';const a=document.createDocumentFragment();let s=null;if(o.forEach(n=>{if(!n||!n.name)return;const r=document.createElement("option");r.value=n.name,r.textContent=n.name,n.serviceType&&(r.textContent+=` - ${n.serviceType}`),r.dataset.contractorId=n.id||"",(t&&n.name===t||i&&n.id===i)&&(r.selected=!0,s=r),a.appendChild(r)}),e.appendChild(a),t&&!s&&e.value!==t)try{e.value=t}catch{Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",t)}},async showViolationForm(e=null){let t=null;if(typeof e=="string"?t=AppState.appData.violations?.find(y=>y.id===e)||null:typeof e=="object"&&(t=e),t=this.normalizeViolationRecord(t),t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const i=t?this.getEffectiveFineAmount(t):0,o=!!t,s=String(t?.personType||"").trim().toLowerCase()==="contractor"||!!t?.contractorName&&!t?.employeeName,n=!s,r=String(t?.violationLocationId||t?.violationLocation||"").trim(),l=String(t?.violationPlaceId||t?.violationPlace||"").trim();let c=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),c=ViolationTypesManager.getAll()}catch(y){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",y),c=AppState?.appData?.violationTypes||[]}else c=AppState?.appData?.violationTypes||[];const d=t?.violationTypeId||"",p=(t?.violationType||"").trim(),f=(AppState?.currentUser?.role||"").toString().trim().toLowerCase(),m=["admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","system_admin"].includes(f),u=c.map(y=>{const L=d?y.id===d:y.name===p,D=Number(y?.fineAmount||0);return`
                <option value="${Utils.escapeHTML(y.name)}" data-type-id="${Utils.escapeHTML(y.id)}" data-fine-amount="${D}" ${L?"selected":""}>
                    ${Utils.escapeHTML(y.name)}
                </option>
            `}).join(""),v=!c.some(y=>d?y.id===d:y.name===p)&&p?`
                <option value="${Utils.escapeHTML(p)}" data-type-id="${Utils.escapeHTML(d)}" data-fine-amount="${Number(i)}" selected>
                    ${Utils.escapeHTML(p)} (\u063A\u064A\u0631 \u0645\u0639\u0631\u0641)
                </option>
            `:"",k=Array.from(new Set((AppState.appData?.violations||[]).map(y=>(y.contractorWorker||"").trim()).filter(y=>y&&y!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))).sort((y,L)=>y.localeCompare(L,"ar")).map(y=>`<option value="${Utils.escapeHTML(y)}"></option>`).join(""),V=["\u0639\u0627\u0645\u0644 \u0639\u0627\u062F\u064A","\u0641\u0646\u064A \u0643\u0647\u0631\u0628\u0627\u0621","\u0641\u0646\u064A \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627","\u0644\u062D\u0627\u0645 / \u0628\u0631\u0627\u062F","\u0641\u0646\u064A \u0633\u0642\u0627\u0644\u0627\u062A","\u0645\u0634\u0631\u0641 \u0633\u0642\u0627\u0644\u0627\u062A","\u0645\u0634\u063A\u0644 \u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","\u0633\u0627\u0626\u0642 \u0645\u0639\u062F\u0627\u062A \u062B\u0642\u064A\u0644\u0629","\u0645\u0634\u0631\u0641 \u0633\u0644\u0627\u0645\u0629 \u0648\u0635\u062D\u0629 \u0645\u0647\u0646\u064A\u0629","\u0645\u0631\u0627\u0642\u0628 \u062D\u0631\u064A\u0642 (Fire Watcher)","\u0641\u0646\u064A \u062F\u0647\u0627\u0646 \u0648\u0639\u0632\u0644","\u0641\u0646\u064A \u0645\u062F\u0646\u064A \u0648\u0628\u0646\u0627\u0621","\u0645\u0633\u0627\u0639\u062F \u0641\u0646\u064A / \u0634\u064A\u0627\u0644"],$=(AppState.appData?.violations||[]).map(y=>(y.contractorPosition||"").trim()).filter(Boolean),z=Array.from(new Set([...V,...$])).sort((y,L)=>y.localeCompare(L,"ar")).map(y=>`<option value="${Utils.escapeHTML(y)}"></option>`).join(""),I=this.getSystemDepartmentOptions(),P=I.map(y=>{const L=t?.contractorDepartment===y;return`<option value="${Utils.escapeHTML(y)}" ${L?"selected":""}>${Utils.escapeHTML(y)}</option>`}).join(""),x=!(!t?.contractorDepartment||I.includes(t.contractorDepartment))&&t?.contractorDepartment?`<option value="${Utils.escapeHTML(t.contractorDepartment)}" selected>${Utils.escapeHTML(t.contractorDepartment)}</option>`:"",_=new Date().toISOString().slice(0,10),R=new Date().toTimeString().slice(0,5),h=t?.violationDate?new Date(t.violationDate).toISOString().slice(0,10):_,U=t?.violationTime||R,T=document.createElement("div");T.className="modal-overlay",T.innerHTML=`
            <div class="modal-content" style="max-width: 880px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.25); border: 1px solid #cbd5e1;">
                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A -->
                <div class="modal-header" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 16px 22px; border-bottom: 2px solid #3b82f6; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-exclamation-triangle" style="color: #fbbf24; font-size: 1.2rem;"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.15rem; font-weight: 800; color: #f8fafc; margin: 0; letter-spacing: -0.2px;">
                                ${o?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}
                            </h2>
                            <p style="margin: 2px 0 0 0; font-size: 0.78rem; color: #94a3b8; font-weight: 500;">
                                \u0646\u0638\u0627\u0645 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0631\u0642\u0645\u064A (ICAPP HSE System)
                            </p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642" style="width: 34px; height: 34px; border-radius: 9px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                        <i class="fas fa-times" style="font-size: 15px;"></i>
                    </button>
                </div>

                <!-- \u062C\u0633\u0645 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                <div class="modal-body" style="background: #f8fafc; padding: 18px 22px; overflow-y: auto; flex: 1;">
                    <!-- \u2705 \u0634\u0631\u064A\u0637 \u062A\u0646\u0628\u064A\u0647 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C -->
                    <div id="violation-form-banner" class="hidden mb-4 rounded-xl border p-3.5 flex items-start gap-3" role="alert" style="font-size: 0.9rem;">
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
                        <!-- \u0627\u0644\u0628\u0637\u0627\u0642\u0629 1: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 16px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 11px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 9px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px; box-shadow: 0 1px 2px rgba(37,99,235,0.25);">1</span>
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 (\u0627\u0644\u0645\u0648\u0638\u0641 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644)</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe; padding: 2px 10px; border-radius: 20px;">
                                    \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0630\u0643\u064A \u0627\u0644\u0641\u0648\u0631\u064A \u0645\u0646 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062C\u0632\u0627\u0621\u0627\u062A
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-user-tag text-blue-600 ml-1"></i> \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                        </label>
                                        <select id="violation-person-type" required class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0635\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 --</option>
                                            <option value="employee" ${n?"selected":""}>\u0645\u0648\u0638\u0641 \u0628\u0627\u0644\u0634\u0631\u0643\u0629 (ICAPP)</option>
                                            <option value="contractor" ${s?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062A\u0627\u0628\u0639\u0629 \u0644\u0645\u0642\u0627\u0648\u0644</option>
                                        </select>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0648\u0638\u0641: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A -->
                                    <div id="violation-employee-code-container" style="display: ${n?"block":"none"};">
                                        <label for="violation-employee-code" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-id-card text-indigo-600 ml-1"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                        </label>
                                        <input type="text" id="violation-employee-code" class="form-input"
                                            value="${t?.employeeCode||t?.employeeNumber||""}" 
                                            placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F (\u062C\u0644\u0628 \u0641\u0648\u0631\u064A \u0644\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629)"
                                            style="height: 42px; border-radius: 9px; font-weight: 600;"
                                            ${n?"required":""}>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 -->
                                    <div id="violation-contractor-company-container" style="display: ${s?"block":"none"};">
                                        <label for="violation-contractor-select" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-building text-amber-600 ml-1"></i> \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 *
                                        </label>
                                        <select id="violation-contractor-select" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;"
                                            ${s?"required":""}>
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 -->
                                <div id="violation-employee-details-grid" class="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5" style="display: ${n?"grid":"none"};">
                                    <div>
                                        <label for="violation-person-name" class="block text-xs font-bold text-gray-600 mb-1" id="violation-person-name-label">
                                            <i class="fas fa-user ml-1 text-slate-500"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641
                                        </label>
                                        <input type="text" id="violation-person-name" class="form-input"
                                            value="${t?.employeeName||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="height: 40px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 700; color: #0f172a;">
                                    </div>
                                    <div id="violation-employee-position-container">
                                        <label for="violation-employee-position" class="block text-xs font-bold text-gray-600 mb-1">
                                            <i class="fas fa-briefcase ml-1 text-slate-500"></i> \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                        </label>
                                        <input type="text" id="violation-employee-position" class="form-input"
                                            value="${t?.employeePosition||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="height: 40px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 600; color: #334155;">
                                    </div>
                                    <div id="violation-employee-department-container">
                                        <label for="violation-employee-department" class="block text-xs font-bold text-gray-600 mb-1">
                                            <i class="fas fa-sitemap ml-1 text-slate-500"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629
                                        </label>
                                        <input type="text" id="violation-employee-department" class="form-input"
                                            value="${t?.employeeDepartment||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="height: 40px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 600; color: #334155;">
                                    </div>
                                </div>

                                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0630\u0643\u064A\u0629 -->
                                <div id="violation-contractor-fields-container" class="mt-3.5" style="display: ${s?"block":"none"};">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                        <div id="violation-contractor-worker-container">
                                            <label for="violation-contractor-worker" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-user-hard-hat ml-1 text-amber-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644
                                            </label>
                                            <input type="text" id="violation-contractor-worker" list="violation-contractor-workers-list" class="form-input"
                                                value="${t?.contractorWorker||""}" 
                                                placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644..."
                                                style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <datalist id="violation-contractor-workers-list">
                                                ${k}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-position-container">
                                            <label for="violation-contractor-position" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-briefcase ml-1 text-slate-600"></i> \u0627\u0644\u0648\u0638\u064A\u0641\u0629 (\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u0643\u062A\u0627\u0628\u0629 \u062D\u0631\u0629)
                                            </label>
                                            <input type="text" id="violation-contractor-position" list="violation-contractor-positions-list" class="form-input"
                                                value="${t?.contractorPosition||""}" 
                                                placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0645\u0647\u0646\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629..."
                                                style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <datalist id="violation-contractor-positions-list">
                                                ${z}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-department-container">
                                            <label for="violation-contractor-department" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-sitemap ml-1 text-teal-600"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645
                                            </label>
                                            <select id="violation-contractor-department" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;">
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 --</option>
                                                ${x}
                                                ${P}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- \u2705 \u0628\u0637\u0627\u0642\u0629 \u0631\u0635\u062F \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u062C\u0632\u0627\u0621\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629 (Strike Alert Card) -->
                                <div id="violation-sequence-info" class="hidden"></div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0628\u0637\u0627\u0642\u0629 2: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0631\u0635\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 16px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 11px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 9px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: #059669; color: #ffffff; font-weight: 800; font-size: 12px; box-shadow: 0 1px 2px rgba(5,150,105,0.25);">2</span>
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0631\u0635\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 2px 10px; border-radius: 20px;">
                                    \u0641\u062D\u0635 \u0648\u062A\u0646\u0628\u064A\u0647 \u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0628\u0624\u0631 \u0627\u0644\u062E\u0637\u0631 \u0628\u0627\u0644\u0645\u0646\u0637\u0642\u0629
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <!-- \u0644\u0644\u0645\u0648\u0638\u0641: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646 -->
                                    <div id="violation-location-fields-container" class="contents" style="display: ${n?"contents":"none"};">
                                        <div>
                                            <label for="violation-employee-location" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-industry ml-1 text-emerald-600"></i> \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A *
                                            </label>
                                            <select id="violation-employee-location" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;" ${n?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-employee-place" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-compass ml-1 text-emerald-600"></i> \u0645\u0643\u0627\u0646 / \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                            </label>
                                            <select id="violation-employee-place" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;" ${n?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            </select>
                                            <div id="violation-employee-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-employee-custom-place" class="form-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F..." style="height: 40px; border-radius: 8px;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646 -->
                                    <div id="violation-contractor-location-fields-container" class="contents" style="display: ${s?"contents":"none"};">
                                        <div>
                                            <label for="violation-contractor-location" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-industry ml-1 text-emerald-600"></i> \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A *
                                            </label>
                                            <select id="violation-contractor-location" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;" ${s?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-contractor-place" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-compass ml-1 text-emerald-600"></i> \u0645\u0643\u0627\u0646 / \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                            </label>
                                            <select id="violation-contractor-place" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;" ${s?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            </select>
                                            <div id="violation-contractor-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-contractor-custom-place" class="form-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F..." style="height: 40px; border-radius: 8px;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A -->
                                    <div>
                                        <label for="violation-date" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-calendar-alt ml-1 text-blue-600"></i> \u062A\u0627\u0631\u064A\u062E \u0631\u0635\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                        </label>
                                        <input type="date" id="violation-date" required class="form-input"
                                            value="${h}"
                                            style="height: 42px; border-radius: 9px; font-weight: 600;">
                                    </div>
                                    <div>
                                        <label for="violation-time" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-clock ml-1 text-purple-600"></i> \u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                        </label>
                                        <input type="time" id="violation-time" required class="form-input"
                                            value="${U}"
                                            style="height: 42px; border-radius: 9px; font-weight: 600;">
                                    </div>
                                </div>

                                <!-- \u2705 \u0628\u0637\u0627\u0642\u0629 \u062A\u0646\u0628\u064A\u0647 \u0628\u0624\u0631\u0629 \u0627\u0644\u062E\u0637\u0631 \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 -->
                                <div id="violation-area-hotspot-container" class="hidden"></div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0628\u0637\u0627\u0642\u0629 3: \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062C\u0630\u0631\u064A -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 16px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 11px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 9px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: #d97706; color: #ffffff; font-weight: 800; font-size: 12px; box-shadow: 0 1px 2px rgba(217,119,6,0.25);">3</span>
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0648\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #d97706; background: #fffbeb; border: 1px solid #fde68a; padding: 2px 10px; border-radius: 20px;">
                                    \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0646\u0648\u0639 \u064A\u0636\u0628\u0637 \u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0648\u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label for="violation-type" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-exclamation-circle ml-1 text-red-600"></i> \u0646\u0648\u0639 \u0648\u062A\u0648\u0635\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                        </label>
                                        <select id="violation-type" required class="form-input" style="height: 42px; border-radius: 9px; font-weight: 700;">
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            ${v}
                                            ${u}
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-fine-amount" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-money-bill-wave ml-1 text-green-600"></i> \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u063A\u0631\u0627\u0645\u0629 (\u062C.\u0645)
                                        </label>
                                        <input type="number" id="violation-fine-amount" class="form-input" min="0" step="1"
                                            value="${Number(i)}"
                                            placeholder="\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"
                                            style="height: 42px; border-radius: 9px; font-weight: 700;">
                                        <p style="font-size: 0.74rem; color: #64748b; margin: 4px 0 0 0;">
                                            ${m?"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u060C \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631.":"\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0627\u0644\u0644\u0627\u0626\u062D\u0629\u060C \u0648\u062A\u0639\u062F\u064A\u0644\u0647\u0627 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637."}
                                        </p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5">
                                    <div>
                                        <label for="violation-severity" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-signal ml-1 text-orange-600"></i> \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0634\u062F\u0629 \u0648\u0627\u0644\u062E\u0637\u0648\u0631\u0629 *
                                        </label>
                                        <select id="violation-severity" required class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u062F\u0629</option>
                                            <option value="\u0639\u0627\u0644\u064A\u0629" ${t?.severity==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u{1F534} \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</option>
                                            <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${t?.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u{1F7E1} \u0645\u062A\u0648\u0633\u0637\u0629</option>
                                            <option value="\u0645\u0646\u062E\u0641\u0636\u0629" ${t?.severity==="\u0645\u0646\u062E\u0641\u0636\u0629"||t?.severity==="\u0645\u0646\u062E\u0636\u0629"?"selected":""}>\u{1F7E2} \u0645\u0646\u062E\u0641\u0636\u0629</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-status" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-info-circle ml-1 text-blue-600"></i> \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 *
                                        </label>
                                        <select id="violation-status" required class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${!t?.status||t?.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u23F3 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</option>
                                            <option value="\u0645\u062D\u0644\u0648\u0644" ${t?.status==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u2705 \u062A\u0645 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u062A\u0635\u062D\u064A\u062D (\u0645\u062D\u0644\u0648\u0644)</option>
                                            <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${t?.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u274C \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644 (\u0645\u0641\u062A\u0648\u062D)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-root-cause" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-search-plus ml-1 text-teal-600"></i> \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)
                                        </label>
                                        <select id="violation-root-cause" class="form-input" style="height: 42px; border-radius: 9px; font-weight: 600;">
                                            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A</option>
                                            <option value="\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)" ${t?.rootCause==="\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)"?"selected":""}>\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)</option>
                                            <option value="\u0638\u0631\u0641 \u0639\u0645\u0644 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Condition)" ${t?.rootCause==="\u0638\u0631\u0641 \u0639\u0645\u0644 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Condition)"?"selected":""}>\u0638\u0631\u0641 \u0639\u0645\u0644 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Condition)</option>
                                            <option value="\u0642\u0635\u0648\u0631 \u062A\u062F\u0631\u064A\u0628\u064A \u0648\u062A\u0648\u0639\u0648\u064A (Training Gap)" ${t?.rootCause==="\u0642\u0635\u0648\u0631 \u062A\u062F\u0631\u064A\u0628\u064A \u0648\u062A\u0648\u0639\u0648\u064A (Training Gap)"?"selected":""}>\u0642\u0635\u0648\u0631 \u062A\u062F\u0631\u064A\u0628\u064A \u0648\u062A\u0648\u0639\u0648\u064A (Training Gap)</option>
                                            <option value="\u0642\u0635\u0648\u0631 \u0625\u0634\u0631\u0627\u0641\u064A \u0648\u0625\u062C\u0631\u0627\u0626\u064A (Supervisory Defect)" ${t?.rootCause==="\u0642\u0635\u0648\u0631 \u0625\u0634\u0631\u0627\u0641\u064A \u0648\u0625\u062C\u0631\u0627\u0626\u064A (Supervisory Defect)"?"selected":""}>\u0642\u0635\u0648\u0631 \u0625\u0634\u0631\u0627\u0641\u064A \u0648\u0625\u062C\u0631\u0627\u0626\u064A (Supervisory Defect)</option>
                                            <option value="\u062E\u0644\u0644 \u0641\u064A \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629" ${t?.rootCause==="\u062E\u0644\u0644 \u0641\u064A \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"?"selected":""}>\u062E\u0644\u0644 \u0641\u064A \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</option>
                                            <option value="\u0639\u0648\u0627\u0645\u0644 \u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0628\u064A\u0626\u064A\u0629" ${t?.rootCause==="\u0639\u0648\u0627\u0645\u0644 \u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0628\u064A\u0626\u064A\u0629"?"selected":""}>\u0639\u0648\u0627\u0645\u0644 \u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0628\u064A\u0626\u064A\u0629</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0628\u0637\u0627\u0642\u0629 4: \u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 8px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 11px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 9px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: #7c3aed; color: #ffffff; font-weight: 800; font-size: 12px; box-shadow: 0 1px 2px rgba(124,58,237,0.25);">4</span>
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629 \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #7c3aed; background: #f5f3ff; border: 1px solid #ddd6fe; padding: 2px 10px; border-radius: 20px;">
                                    \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0642\u062A\u0631\u062D \u0630\u0643\u064A \u0644\u0625\u0636\u0627\u0641\u062A\u0647 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A -->
                                <div style="margin-bottom: 18px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                                        <label for="violation-details" class="block text-xs font-bold text-gray-700" style="margin: 0;">
                                            <i class="fas fa-file-alt ml-1 text-amber-600"></i> \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0648\u0635\u0641 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629
                                        </label>
                                        <span style="font-size: 0.75rem; font-weight: 700; color: #92400e; background: #fef3c7; border: 1px solid #fde68a; padding: 2px 10px; border-radius: 6px;">
                                            \u{1F4A1} \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0627\u0646\u0642\u0631 \u0644\u0644\u0625\u0636\u0627\u0641\u0629):
                                        </span>
                                    </div>
                                    <div id="violation-details-chips" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; min-height: 32px;"></div>
                                    <textarea id="violation-details" class="form-input" rows="3"
                                        placeholder="\u0627\u0643\u062A\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0648\u0635\u0641\u0647\u0627 \u0627\u0644\u0643\u0627\u0645\u0644\u060C \u0623\u0648 \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629 \u0627\u0644\u062C\u0627\u0647\u0632\u0629 \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u0625\u062F\u0631\u0627\u062C \u0627\u0644\u0645\u0628\u0627\u0634\u0631..."
                                        style="width: 100%; min-height: 85px; border-radius: 9px; padding: 10px 12px; font-size: 0.88rem; line-height: 1.55; resize: vertical;">${t?.violationDetails||""}</textarea>
                                </div>

                                <!-- \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 \u0648\u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A -->
                                <div style="margin-bottom: 18px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                                        <label for="violation-action" class="block text-xs font-bold text-gray-700" style="margin: 0;">
                                            <i class="fas fa-tasks ml-1 text-indigo-600"></i> \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 \u0641\u0648\u0631\u064A\u0627\u064B / \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A
                                        </label>
                                        <span style="font-size: 0.75rem; font-weight: 700; color: #3730a3; background: #e0e7ff; border: 1px solid #c7d2fe; padding: 2px 10px; border-radius: 6px;">
                                            \u26A1 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:
                                        </span>
                                    </div>
                                    <div id="violation-action-chips" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; min-height: 32px;"></div>
                                    <textarea id="violation-action" class="form-input" rows="3"
                                        placeholder="\u062D\u062F\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0627\u0644\u0645\u062A\u062E\u0630 \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645\u064A\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0623\u0639\u0644\u0627\u0647..."
                                        style="width: 100%; min-height: 75px; border-radius: 9px; padding: 10px 12px; font-size: 0.88rem; line-height: 1.55; resize: vertical;">${t?.actionTaken||""}</textarea>
                                </div>

                                <!-- \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 -->
                                <div style="padding: 12px 14px; background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 10px;">
                                    <label for="violation-photo-input" class="block text-xs font-bold text-gray-700 mb-1.5">
                                        <i class="fas fa-camera ml-1 text-blue-600"></i> \u0635\u0648\u0631\u0629 \u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0627\u064B (\u0645\u0631\u0641\u0642 \u0627\u062E\u062A\u064A\u0627\u0631\u064A)
                                    </label>
                                    <input type="file" id="violation-photo-input" accept="image/*" class="form-input" style="height: 38px; border-radius: 8px; background: #fff;">
                                    <div id="violation-photo-preview" class="mt-3 ${t?.photo?"":"hidden"}">
                                        <div class="relative inline-block">
                                            <img src="${t?.photo||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" class="w-48 h-36 object-cover rounded-lg border shadow-sm" id="violation-photo-img">
                                            <button type="button" onclick="const p=document.getElementById('violation-photo-input'); if(p) p.value=''; const prev=document.getElementById('violation-photo-preview'); if(prev) prev.classList.add('hidden');" class="mt-1.5 block text-xs text-red-600 hover:text-red-800 font-bold">
                                                <i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0633\u0641\u0644\u064A \u0627\u0644\u0645\u062F\u0645\u062C -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                            <div style="font-size: 0.8rem; color: #64748b; font-weight: 600;">
                                <i class="fas fa-shield-check text-emerald-600 ml-1"></i>
                                <span>\u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0648\u0633\u0648\u0645\u0629 \u0628\u0640 (*) \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0633\u062C\u0644</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="height: 42px; padding: 0 20px; border-radius: 9px; font-weight: 700; font-size: 0.88rem; background: #f8fafc; border: 1.5px solid #cbd5e1; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-times"></i> \u0625\u0644\u063A\u0627\u0621
                                </button>
                                <button type="submit" id="violation-submit-btn" class="btn-primary" style="height: 42px; padding: 0 26px; border-radius: 9px; font-weight: 800; font-size: 0.92rem; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(37,99,235,0.3);">
                                    <i class="fas fa-save"></i> ${o?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(T);const q=document.getElementById("violation-person-type"),J=document.getElementById("violation-employee-code-container"),N=document.getElementById("violation-employee-code"),et=document.getElementById("violation-person-name"),dt=document.getElementById("violation-person-name-label"),lt=document.getElementById("violation-employee-details-grid"),gt=document.getElementById("violation-contractor-company-container"),Z=document.getElementById("violation-contractor-select");if(Z){const y=t?.contractorName||"",L=t?.contractorId||"";this.loadContractorsIntoSelect(Z,y,L)}const Jt=document.getElementById("violation-employee-position-container"),Zt=document.getElementById("violation-employee-department-container"),te=document.getElementById("violation-employee-position"),ee=document.getElementById("violation-employee-department"),vt=document.getElementById("violation-contractor-fields-container"),ie=document.getElementById("violation-contractor-worker-container"),oe=document.getElementById("violation-contractor-position-container"),ae=document.getElementById("violation-contractor-department-container"),yt=document.getElementById("violation-contractor-worker"),kt=document.getElementById("violation-contractor-position"),At=document.getElementById("violation-contractor-department"),bt=document.getElementById("violation-location-fields-container"),ht=document.getElementById("violation-contractor-location-fields-container"),ot=document.getElementById("violation-type"),at=document.getElementById("violation-fine-amount"),Ot=new Map((c||[]).map(y=>[String(y.id||"").trim(),y])),Wt=new Map((c||[]).map(y=>[String(y.name||"").trim().toLowerCase(),y])),Ut=()=>{const y=ot?.selectedOptions?.[0],L=y?.getAttribute("data-type-id")||"",D=(ot?.value||"").trim().toLowerCase(),M=L&&Ot.get(L)||D&&Wt.get(D)||null,w=Number(y?.getAttribute("data-fine-amount")||0),B=Number(M?.fineAmount??w??0);return Number.isFinite(B)&&B>=0?B:0},xt=({force:y=!1}={})=>{if(!at)return;const L=Ut();(y||!m||at.value==="")&&(at.value=String(L))},$t=()=>{const y=ot?.value||"",{detailsChips:L,actionChips:D}=this.getViolationSuggestionChips(y),M=T.querySelector("#violation-details-chips"),w=T.querySelector("#violation-action-chips"),B=T.querySelector("#violation-details"),j=T.querySelector("#violation-action");M&&(M.innerHTML="",L.forEach(H=>{const A=document.createElement("button");A.type="button",A.style.cssText=`
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 13px;
                        font-size: 12px;
                        font-weight: 600;
                        line-height: 1.4;
                        color: #78350f;
                        background: #fffbeb;
                        border: 1px solid #fde68a;
                        border-radius: 9999px;
                        cursor: pointer;
                        text-align: right;
                        white-space: normal;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
                        transition: all 0.15s ease-in-out;
                    `,A.onmouseenter=()=>{A.style.background="#fef3c7",A.style.borderColor="#f59e0b",A.style.color="#92400e",A.style.transform="translateY(-1px)",A.style.boxShadow="0 2px 4px rgba(245, 158, 11, 0.15)"},A.onmouseleave=()=>{A.style.background="#fffbeb",A.style.borderColor="#fde68a",A.style.color="#78350f",A.style.transform="translateY(0)",A.style.boxShadow="0 1px 2px rgba(0,0,0,0.03)"},A.innerHTML=`<i class="fas fa-plus" style="color: #d97706; font-size: 10px;"></i><span>${Utils.escapeHTML(H)}</span>`,A.addEventListener("click",()=>{if(!B)return;const G=B.value.trim();G?G.includes(H)||(B.value=G+" - "+H):B.value=H,B.focus()}),M.appendChild(A)})),w&&(w.innerHTML="",D.forEach(H=>{const A=document.createElement("button");A.type="button",A.style.cssText=`
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 13px;
                        font-size: 12px;
                        font-weight: 600;
                        line-height: 1.4;
                        color: #312e81;
                        background: #eef2ff;
                        border: 1px solid #c7d2fe;
                        border-radius: 9999px;
                        cursor: pointer;
                        text-align: right;
                        white-space: normal;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
                        transition: all 0.15s ease-in-out;
                    `,A.onmouseenter=()=>{A.style.background="#e0e7ff",A.style.borderColor="#6366f1",A.style.color="#1e1b4b",A.style.transform="translateY(-1px)",A.style.boxShadow="0 2px 4px rgba(99, 102, 241, 0.15)"},A.onmouseleave=()=>{A.style.background="#eef2ff",A.style.borderColor="#c7d2fe",A.style.color="#312e81",A.style.transform="translateY(0)",A.style.boxShadow="0 1px 2px rgba(0,0,0,0.03)"},A.innerHTML=`<i class="fas fa-bolt" style="color: #6366f1; font-size: 10px;"></i><span>${Utils.escapeHTML(H)}</span>`,A.addEventListener("click",()=>{j&&(j.value=H,j.focus())}),w.appendChild(A)}))};at&&(at.readOnly=!m),ot&&(ot.addEventListener("change",()=>{xt({force:!0}),$t()}),ot.addEventListener("input",()=>{xt({force:!0}),$t()})),at&&m&&t&&t.fineAmount!==void 0&&t.fineAmount!==null?at.value=String(Number(i)):xt({force:!0}),$t(),q.addEventListener("change",y=>{if(y.target.value==="employee"){if(J&&(J.style.display="block"),N&&(N.required=!0,N.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"),lt&&(lt.style.display="grid"),gt&&(gt.style.display="none"),Z&&(Z.required=!1),vt&&(vt.style.display="none"),bt&&(bt.style.display="contents"),ht&&(ht.style.display="none"),this.loadLocationOptions("employee").then(()=>{const D=document.getElementById("violation-employee-location");if(D){const M=D.cloneNode(!0);D.parentNode.replaceChild(M,D);const w=document.getElementById("violation-employee-location");w&&w.addEventListener("change",B=>{const j=B.target.value;this.loadPlaceOptions(j,"","employee"),this.refreshAreaHotspotInModal(T,o?t?.id:null)})}}),typeof EmployeeHelper<"u"&&N&&N.parentNode)try{const D=N.cloneNode(!0);N.parentNode.replaceChild(D,N),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",w=>{if(w){const B=document.getElementById("violation-person-name"),j=document.getElementById("violation-employee-position"),H=document.getElementById("violation-employee-department");B&&(B.value=w.name||""),j&&(j.value=w.position||w.jobTitle||""),H&&(H.value=w.department||w.section||"")}it()})}catch(D){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",D)}}else xt({force:!0}),J&&(J.style.display="none"),N&&(N.required=!1,N.value=""),lt&&(lt.style.display="none"),gt&&(gt.style.display="block"),Z&&(Z.required=!0,this.loadContractorsIntoSelect(Z)),vt&&(vt.style.display="block"),bt&&(bt.style.display="none"),ht&&(ht.style.display="contents"),this.loadLocationOptions("contractor").then(()=>{const D=document.getElementById("violation-contractor-location");if(D){const M=D.cloneNode(!0);D.parentNode.replaceChild(M,D);const w=document.getElementById("violation-contractor-location");w&&w.addEventListener("change",B=>{const j=B.target.value;this.loadPlaceOptions(j,"","contractor"),this.refreshAreaHotspotInModal(T,o?t?.id:null)})}});it(),this.refreshAreaHotspotInModal(T,o?t?.id:null)});const Mt=()=>{const y=(yt?.value||"").trim().toLowerCase();if(y){const L=(AppState.appData?.violations||[]).find(D=>D&&(D.contractorWorker||"").trim().toLowerCase()===y);L&&(kt&&!kt.value&&L.contractorPosition&&(kt.value=L.contractorPosition),Z&&!Z.value&&L.contractorName&&(Z.value=L.contractorName),At&&!At.value&&L.contractorDepartment&&(At.value=L.contractorDepartment))}it()};yt&&(yt.addEventListener("input",Mt),yt.addEventListener("change",Mt));const it=()=>{clearTimeout(this._violationSeqBadgeTimer),this._violationSeqBadgeTimer=setTimeout(()=>{this.refreshViolationSequenceBadgeInModal(T,o?t?.id:null)},180)};if(T.addEventListener("input",it),T.addEventListener("change",it),setTimeout(it,300),typeof EmployeeHelper<"u"&&t?.employeeName&&N&&N.parentNode)try{const y=N.cloneNode(!0);N.parentNode.replaceChild(y,N),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",D=>{if(D){const M=document.getElementById("violation-person-name"),w=document.getElementById("violation-employee-position"),B=document.getElementById("violation-employee-department");M&&(M.value=D.name||""),w&&(w.value=D.position||D.jobTitle||""),B&&(B.value=D.department||D.section||"")}it()})}catch(y){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",y)}const Lt=s?"contractor":"employee";setTimeout(async()=>{await this.loadLocationOptions("employee"),await this.loadLocationOptions("contractor");const y=document.getElementById("violation-employee-location"),L=document.getElementById("violation-employee-place"),D=document.getElementById("violation-employee-custom-place-box");if(y&&L){const j=y.cloneNode(!0);y.parentNode.replaceChild(j,y);const H=L.cloneNode(!0);L.parentNode.replaceChild(H,L);const A=document.getElementById("violation-employee-location"),G=document.getElementById("violation-employee-place");A&&A.addEventListener("change",Y=>{const ft=Y.target.value;this.loadPlaceOptions(ft,"","employee"),this.refreshAreaHotspotInModal(T,o?t?.id:null)}),G&&G.addEventListener("change",Y=>{D&&(D.classList.toggle("hidden",Y.target.value!=="__custom__"),Y.target.value==="__custom__"&&document.getElementById("violation-employee-custom-place")?.focus()),this.refreshAreaHotspotInModal(T,o?t?.id:null)})}const M=document.getElementById("violation-contractor-location"),w=document.getElementById("violation-contractor-place"),B=document.getElementById("violation-contractor-custom-place-box");if(M&&w){const j=M.cloneNode(!0);M.parentNode.replaceChild(j,M);const H=w.cloneNode(!0);w.parentNode.replaceChild(H,w);const A=document.getElementById("violation-contractor-location"),G=document.getElementById("violation-contractor-place");A&&A.addEventListener("change",Y=>{const ft=Y.target.value;this.loadPlaceOptions(ft,"","contractor"),this.refreshAreaHotspotInModal(T,o?t?.id:null)}),G&&G.addEventListener("change",Y=>{B&&(B.classList.toggle("hidden",Y.target.value!=="__custom__"),Y.target.value==="__custom__"&&document.getElementById("violation-contractor-custom-place")?.focus()),this.refreshAreaHotspotInModal(T,o?t?.id:null)})}if(Lt==="employee"&&q.value==="employee"&&typeof EmployeeHelper<"u"&&document.getElementById("violation-employee-code"))try{EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",H=>{if(H){const A=document.getElementById("violation-person-name"),G=document.getElementById("violation-employee-position"),Y=document.getElementById("violation-employee-department");A&&(A.value=H.name||""),G&&(G.value=H.position||H.jobTitle||""),Y&&(Y.value=H.department||H.section||"")}it()})}catch(H){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",H)}},100),r&&setTimeout(()=>{if(Lt==="employee"){const y=document.getElementById("violation-employee-location");y&&(y.value=r,r&&this.loadPlaceOptions(r,l,"employee"))}else if(Lt==="contractor"){const y=document.getElementById("violation-contractor-location");y&&(y.value=r,r&&this.loadPlaceOptions(r,l,"contractor"))}setTimeout(()=>{this.refreshAreaHotspotInModal(T,o?t?.id:null)},250)},200);const Tt=document.getElementById("violation-photo-input"),Vt=document.getElementById("violation-photo-preview"),Pt=document.getElementById("violation-photo-img");Tt&&Vt&&Pt&&Tt.addEventListener("change",async y=>{const L=y.target.files[0];if(L){if(L.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),Tt.value="";return}const D=new FileReader;D.onload=M=>{Pt.src=M.target.result,Vt.classList.remove("hidden")},D.readAsDataURL(L)}});const st=T.querySelector("#violation-form"),pt=T.querySelector("#violation-submit-btn")||st?.querySelector('button[type="submit"]');if(!st||!pt){AppState.debugMode&&Utils.safeError("\u274C \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648 \u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}if(pt.parentNode){const y=pt.cloneNode(!0);y.disabled=!1,y.removeAttribute("aria-busy"),pt.parentNode.replaceChild(y,pt)}let Ct=!1;const It=()=>T.querySelector("#violation-submit-btn")||st.querySelector('button[type="submit"]'),Kt=this._t("module.violations.submit.saving","\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."),nt=(y,L,D)=>{const M=T.querySelector("#violation-form-banner"),w=T.querySelector("#violation-form-banner-icon"),B=T.querySelector("#violation-form-banner-title"),j=T.querySelector("#violation-form-banner-text");if(!M||!w||!B||!j)return;const H={error:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",icon:"fa-circle-xmark text-red-600"},warning:{bg:"#fffbeb",border:"#fde68a",text:"#92400e",icon:"fa-triangle-exclamation text-amber-600"},success:{bg:"#ecfdf5",border:"#a7f3d0",text:"#065f46",icon:"fa-circle-check text-emerald-600"},info:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",icon:"fa-circle-info text-blue-600"}},A=H[y]||H.info;M.style.background=A.bg,M.style.borderColor=A.border,M.style.color=A.text,w.className="fas "+A.icon+" text-lg mt-0.5",B.textContent=L||"",j.textContent=D||"",M.classList.remove("hidden");try{const G=T.querySelector(".modal-body");G&&G.scrollTo({top:0,behavior:"smooth"})}catch{}},Bt=()=>{const y=T.querySelector("#violation-form-banner");y&&y.classList.add("hidden")},Nt=T.querySelector("#violation-form-banner-close");Nt&&Nt.addEventListener("click",Bt);const Ht=async y=>{if(y&&(y.preventDefault(),y.stopPropagation(),y.stopImmediatePropagation()),Ct||this._violationSubmitLock||st.dataset.submitting==="1"){typeof Notification<"u"&&Notification.warning&&Notification.warning(this._t("module.violations.duplicate.click","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0622\u0646. \u0644\u0627 \u062A\u0636\u063A\u0637 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");return}Ct=!0,this._violationSubmitLock=!0,st.dataset.submitting="1";const L=It(),D=L?L.innerHTML:"",M=()=>{Ct=!1,this._violationSubmitLock=!1,this._violationInflightDupKey="";try{st.dataset.submitting=""}catch{}const w=It();w&&(w.disabled=!1,w.removeAttribute("aria-busy"),w.innerHTML=D)};L&&(L.disabled=!0,L.setAttribute("aria-busy","true"),L.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> '+Kt);try{const w=document.getElementById("violation-person-type")?.value,B=document.getElementById("violation-date")?.value,j=document.getElementById("violation-time")?.value,H=document.getElementById("violation-type")?.value,A=document.getElementById("violation-severity")?.value,G=document.getElementById("violation-status")?.value,Y=document.getElementById("violation-details")?.value.trim()||"",ft=document.getElementById("violation-action")?.value.trim()||"",Gt=document.getElementById("violation-root-cause")?.value.trim()||"",wt=document.getElementById("violation-fine-amount")?.value;let Dt="";if(wt!==""&&wt!==null&&wt!==void 0){const S=this.parseFineAmount(wt);Number.isFinite(S)&&S>=0&&(Dt=S)}else Dt=this.parseFineAmount(Ut());const Q=[];w||Q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"),B||Q.push("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),j||Q.push("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),H||Q.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),A||Q.push("\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),G||Q.push("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629");let ut="",Rt="";if(w==="employee"){const S=document.getElementById("violation-employee-code")?.value.trim();ut=document.getElementById("violation-person-name")?.value.trim(),S||Q.push("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),ut||Q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}else if(w==="contractor"){const S=document.getElementById("violation-contractor-select");if(!S||!S.value)Q.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");else{ut=S.value;const C=S.options[S.selectedIndex];Rt=C?.dataset.contractorCode||C?.dataset.contractorId||""}}let ct="",mt="",tt="",rt="";if(w==="employee"){const S=document.getElementById("violation-employee-location"),C=document.getElementById("violation-employee-place");if(ct=S?.value||"",mt=S?.options[S?.selectedIndex]?.text||"",tt=C?.value||"",rt=C?.options[C?.selectedIndex]?.text||"",tt==="__custom__"){const X=document.getElementById("violation-employee-custom-place")?.value.trim()||"";tt=X,rt=X}}else if(w==="contractor"){const S=document.getElementById("violation-contractor-location"),C=document.getElementById("violation-contractor-place");if(ct=S?.value||"",mt=S?.options[S?.selectedIndex]?.text||"",tt=C?.value||"",rt=C?.options[C?.selectedIndex]?.text||"",tt==="__custom__"){const X=document.getElementById("violation-contractor-custom-place")?.value.trim()||"";tt=X,rt=X}}if(ct||Q.push("\u0627\u0644\u0645\u0648\u0642\u0639"),tt||Q.push("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),Q.length>0){nt("error","\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0646\u0627\u0642\u0635\u0629","\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644: "+Q.join("\u060C ")),M(),Q.forEach(S=>{let C="";if(S.includes("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")?C="violation-employee-code":S.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")?C="violation-person-name":S.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?C="violation-contractor-select":S.includes("\u062A\u0627\u0631\u064A\u062E")?C="violation-date":S.includes("\u0648\u0642\u062A")?C="violation-time":S.includes("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")?C="violation-type":S.includes("\u0627\u0644\u0634\u062F\u0629")?C="violation-severity":S.includes("\u0627\u0644\u062D\u0627\u0644\u0629")?C="violation-status":S.includes("\u0627\u0644\u0645\u0648\u0642\u0639")?C=w==="employee"?"violation-employee-location":"violation-contractor-location":S.includes("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")&&(C=w==="employee"?"violation-employee-place":"violation-contractor-place"),C){const X=document.getElementById(C);X&&(X.classList.add("border-red-500","ring-2","ring-red-300"),X.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{X.classList.remove("border-red-500","ring-2","ring-red-300")},3e3))}});return}let St=t?.photo||"";const qt=document.getElementById("violation-photo-input");if(qt?.files.length>0){const S=qt.files[0];if(S.size>2*1024*1024){nt("error","\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627\u064B","\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 2MB. \u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0623\u0635\u063A\u0631."),M();return}try{St=await Violations.convertImageToBase64(S)}catch(C){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",C)}}Bt();const Xt=ot?.selectedOptions?.[0]?.getAttribute("data-type-id")||"",jt=B&&j?new Date(`${B}T${j}`).toISOString():new Date().toISOString(),F={id:t?.id||Utils.generateId("VIOLATION"),isoCode:t?.isoCode||generateISOCode("VIOL",AppState.appData.violations||[]),personType:w,employeeId:w==="employee"?t?.employeeId||Utils.generateId("EMP"):"",employeeName:w==="employee"?ut:"",employeeCode:w==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeeNumber:w==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeePosition:w==="employee"&&document.getElementById("violation-employee-position")?.value.trim()||"",employeeDepartment:w==="employee"&&document.getElementById("violation-employee-department")?.value.trim()||"",contractorId:w==="contractor"?Rt:"",contractorName:w==="contractor"?ut:"",contractorWorker:w==="contractor"&&document.getElementById("violation-contractor-worker")?.value.trim()||"",contractorPosition:w==="contractor"&&document.getElementById("violation-contractor-position")?.value.trim()||"",contractorDepartment:w==="contractor"&&document.getElementById("violation-contractor-department")?.value.trim()||"",violationTypeId:Xt,violationType:H,fineAmount:this.parseFineAmount(Dt),violationDate:jt,violationTime:j,violationLocation:mt&&mt!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"?mt:ct,violationLocationId:ct?String(ct).trim():null,violationPlace:rt&&rt!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"?rt:tt,violationPlaceId:tt?String(tt).trim():null,violationDetails:Y,severity:A,actionTaken:ft,status:G,rootCause:Gt||t?.rootCause||"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)",photo:St,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),violationDateKey:"",violationTimeKey:""};F.violationDateKey=this._violationDateKey(F),F.violationTimeKey=this._violationTimeKey(F);const Yt={personType:w,violationDate:jt,employeeCode:F.employeeCode,employeeNumber:F.employeeNumber,contractorName:F.contractorName,contractorWorker:F.contractorWorker},Qt=this.countPriorViolationsSamePersonMonth(Yt,o&&t?.id?t.id:null);F.violationSequenceInMonth=Qt+1;const Et=this.findDuplicateViolation(F,{excludeId:o&&t?.id?t.id:null});if(Et){const S=this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"),C=Et.source==="pending"?this._t("module.violations.duplicate.pending","\u0637\u0644\u0628 \u0645\u0645\u0627\u062B\u0644 \u0645\u0639\u0644\u0651\u0642 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0625\u0631\u0633\u0627\u0644."):Et.source==="inflight"?this._t("module.violations.duplicate.click","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0622\u0646. \u0644\u0627 \u062A\u0636\u063A\u0637 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."):this._t("module.violations.duplicate.text","\u0646\u0641\u0633 \u0627\u0644\u0645\u0648\u0638\u0641 \u0623\u0648 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0646\u0641\u0633 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u062C\u0648\u062F\u0629 \u0628\u0627\u0644\u0641\u0639\u0644. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u062A\u0633\u062C\u064A\u0644.");nt("warning",S,C),typeof Notification<"u"&&Notification.warning&&Notification.warning(S),M();return}this._violationInflightDupKey=this._buildViolationDupKey(F);try{const S=await this.checkViolationApprovalGate(F,{isEdit:o});if(S&&S.requiresApproval){let C=St;if(C&&typeof C=="string"&&C.startsWith("data:"))try{L.innerHTML='<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...';const K=await GoogleIntegration.uploadFileToDrive?.(C,`violation_${F.id}_${Date.now()}.jpg`,"image/jpeg","Violations");K&&K.success?C=K.directLink||K.shareableLink||"":(C="",nt("warning","\u062A\u0639\u0630\u0651\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629","\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u062F\u0648\u0646 \u0627\u0644\u0635\u0648\u0631\u0629. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0623\u0648 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0627\u062D\u0642\u0627\u064B.")),L.innerHTML=D,L.disabled=!0,L.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'}catch(K){AppState.debugMode&&Utils.safeWarn("Drive upload failed in approval path:",K),C=""}const X={...F,photo:C},O=await this.submitViolationForApproval(X,{isEdit:o,originalId:t?.id});if(O&&O.success){this._rememberViolationDupKey(F),this._violationInflightDupKey="",this._violationSubmitLock=!1,this._invalidateViolationApprovalRequestsCache(),T.remove(),Notification.success(O.message||"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627.");try{document.dispatchEvent(new CustomEvent("violation-approval-request-created",{detail:O.data||{}}))}catch{}return}else if(O&&O.duplicate){M(),nt("warning",this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"),O.message||this._t("module.violations.duplicate.pending","\u0637\u0644\u0628 \u0645\u0645\u0627\u062B\u0644 \u0645\u0639\u0644\u0651\u0642 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0625\u0631\u0633\u0627\u0644.")),typeof Notification<"u"&&Notification.warning&&Notification.warning(this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"));return}else{M();const K=O&&O.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";nt("error","\u062A\u0639\u0630\u0651\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",K);return}}}catch(S){AppState.debugMode&&Utils.safeWarn("approvalGate error (continuing with direct save):",S)}if(AppState.appData.violations||(AppState.appData.violations=[]),o&&t?.id){const S=AppState.appData.violations.findIndex(C=>C.id===t.id);if(S!==-1)AppState.appData.violations[S]={...AppState.appData.violations[S],...F,id:t.id,isoCode:t.isoCode||F.isoCode,createdAt:t.createdAt||F.createdAt,updatedAt:new Date().toISOString()};else throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}else AppState.appData.violations.push(F);this._rememberViolationDupKey(F),this._violationInflightDupKey="",this._violationSubmitLock=!1,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),T.remove(),Notification.success(`\u062A\u0645 ${o?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629...`);try{this.updateAllViolationsStats()}catch{}try{typeof Dashboard<"u"&&(typeof Dashboard.updateStats=="function"&&Dashboard.updateStats(),typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics())}catch{}try{document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"violations",action:o?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:F}}))}catch{}try{typeof Violations<"u"&&typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations<"u"&&Violations.load&&Violations.load()}catch{}(async S=>{let C=S,X=!1;if(S&&S.startsWith("data:"))try{const O=await GoogleIntegration.uploadFileToDrive?.(S,`violation_${F.id}_${Date.now()}.jpg`,"image/jpeg","Violations");O?.success&&(C=O.directLink||O.shareableLink||S,X=!0)}catch(O){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",O)}if(X){const O=AppState.appData.violations||[],K=O.findIndex(_t=>_t.id===F.id);K!==-1&&(O[K].photo=C,F.photo=C,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Violations<"u"&&Violations.load&&Violations.load())}try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const O=Object.assign({},F,{photo:C});let K;if(o?K=await GoogleIntegration.sendRequest({action:"updateViolation",data:{violationId:F.id,updateData:O}}):K=await GoogleIntegration.sendRequest({action:"addViolation",data:O}),K&&(K.success===!0||K.duplicate===!0)){try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}AppState.debugMode&&Utils.safeLog("\u2705 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D")}else{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",K&&K.message);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}}}catch(O){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",O);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}})(St).catch(S=>{Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",S)})}catch(w){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",w),nt("error","\u062D\u062F\u062B \u062E\u0637\u0623",w&&(w.message||w.toString())||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),M()}};st.addEventListener("submit",Ht,{once:!1});const Ft=It();Ft&&Ft.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),Ht(y)}),T.addEventListener("click",y=>{y.target===T&&T.remove()});const zt=y=>{y.key==="Escape"&&document.body.contains(T)&&(T.remove(),document.removeEventListener("keydown",zt))};document.addEventListener("keydown",zt)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(s){return String(s??"")},i='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(s){return'<option value="'+t(s.id)+'">'+t(s.name)+"</option>"}).join(""),o=document.getElementById("blacklist-factory");if(o&&o.tagName==="SELECT"){var a=o.value;o.innerHTML=i,a&&(o.value=a)}}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Violations.refreshSiteDropdowns:",s)}},getPlaceOptions(e){try{if(!e)return[];const t=new Map,i=(l,c)=>{const d=String(c||"").trim();if(!d||d.includes("-- \u0627\u062E\u062A\u0631")||d==="\u0645\u0643\u0627\u0646 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return;const p=d.toLowerCase();t.has(p)||t.set(p,{id:l||Utils.generateId("PLACE"),name:d})},o=this.getSiteOptions(),a=String(e).trim().toLowerCase(),s=o.find(l=>String(l.id).trim().toLowerCase()===a||String(l.name).trim().toLowerCase()===a),n=s?s.name:e;if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const l=Permissions.formSettingsState.sites.find(c=>String(c.id).toLowerCase()===a||String(c.name).toLowerCase()===a);l&&Array.isArray(l.places)&&l.places.forEach(c=>i(c.id||c.placeId,c.name||c.placeName))}if(Array.isArray(AppState.appData?.observationSites)){const l=AppState.appData.observationSites.find(c=>String(c.id).toLowerCase()===a||String(c.siteId).toLowerCase()===a||String(c.name).toLowerCase()===a);l&&(l.places||l.locations||l.children||l.areas||[]).forEach(d=>i(d.id||d.placeId,d.name||d.placeName||d.title||d.label))}return(AppState.appData?.violations||[]).forEach(l=>{if(!l)return;const c=String(l.violationLocation||"").trim().toLowerCase(),d=String(l.violationLocationId||"").trim().toLowerCase();(c===a||d===a||n&&c===String(n).toLowerCase())&&l.violationPlace&&i(l.violationPlaceId,l.violationPlace)}),["\u0639\u0646\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u0648\u0627\u0644\u062A\u063A\u0644\u064A\u0641","\u0645\u0633\u062A\u0648\u062F\u0639 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0627\u0645","\u0645\u0633\u062A\u0648\u062F\u0639 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0644\u062A\u0627\u0645","\u063A\u0631\u0641\u0629 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u064A\u0639\u064A","\u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u062D\u0648\u0644\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0648\u0631\u0634\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629","\u0648\u0631\u0634\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u062D\u0646 \u0648\u0627\u0644\u062A\u0641\u0631\u064A\u063A (Ramps)","\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u0643\u0627\u062A\u0628","\u0645\u0639\u0645\u0644 \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0645\u0646\u0637\u0642\u0629 \u062A\u062E\u0631\u064A\u062F \u0627\u0644\u0646\u0641\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A","\u0645\u0645\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0647\u0631\u0648\u0628 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062E\u0632\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0636\u062E\u0627\u062A"].forEach(l=>i(null,l)),Array.from(t.values())}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},async loadLocationOptions(e="employee"){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=this.getSiteOptions(),i=e==="employee"?"violation-employee-location":"violation-contractor-location",o=document.getElementById(i);if(!o)return;o.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',t&&t.length>0&&t.forEach(a=>{const s=document.createElement("option");s.value=a.name||a.id,s.textContent=a.name||a.id,o.appendChild(s)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)}},loadPlaceOptions(e,t="",i="employee"){try{const o=i==="employee"?"violation-employee-place":"violation-contractor-place",a=document.getElementById(o);if(!a)return;a.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>';const s=this.getPlaceOptions(e);let n=!1;if(s&&s.length>0&&s.forEach(c=>{const d=document.createElement("option");d.value=c.name,d.textContent=c.name,t&&(c.id===t||c.name===t)&&(d.selected=!0,n=!0),a.appendChild(d)}),t&&!n&&t!=="__custom__"){const c=document.createElement("option");c.value=t,c.textContent=t,c.selected=!0,a.appendChild(c)}const r=document.createElement("option");r.value="__custom__",r.textContent="\u2795 \u0645\u0643\u0627\u0646 \u0622\u062E\u0631 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A \u0645\u062E\u0635\u0635)...",a.appendChild(r);const l=document.querySelector(".modal-overlay");l&&this.refreshAreaHotspotInModal(l)}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",o)}},async convertImageToBase64(e){return new Promise((t,i)=>{const o=new FileReader;o.onload=()=>t(o.result),o.onerror=i,o.readAsDataURL(e)})},async viewViolation(e){const t=AppState.appData?.violations?.find(r=>r.id===e);if(!t){typeof Notification<"u"&&Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeViolationRecord(t)||t;if(!this.isViolationVisibleToCurrentUser(i)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0645\u062E\u0627\u0644\u0641\u0629 \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const o=String(i.severity||"").trim(),a=String(i.status||"").trim(),s=typeof this.getPersonViolationHistory=="function"?this.getPersonViolationHistory(i,i.id):null,n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
                            <h3 style="font-weight: 600; color: #991b1b; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                                <span><i class="fas fa-user"></i> \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641</span>
                                ${s?`
                                    <span class="badge" style="background: ${s.strikeLevel>=3?"#fee2e2":s.strikeLevel===2?"#fef3c7":"#d1fae5"}; color: ${s.strikeLevel>=3?"#991b1b":s.strikeLevel===2?"#92400e":"#065f46"}; border: 1px solid ${s.strikeLevel>=3?"#fca5a5":s.strikeLevel===2?"#fcd34d":"#a7f3d0"}; padding: 3px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px;">
                                        <i class="fas ${s.strikeLevel>=3?"fa-radiation":s.strikeLevel===2?"fa-exclamation-triangle":"fa-shield-alt"} ml-1"></i>${s.strikeBadgeText}
                                    </span>
                                `:""}
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
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA):</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 700; background: #f0fdfa; color: #0f766e; border: 1px solid #99f6e4;">
                                        ${Utils.escapeHTML(i.rootCause||"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)")}
                                    </span>
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
                                        <option value="\u0639\u0627\u0644\u064A\u0629" ${o==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                        <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${o==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                        <option value="\u0645\u0646\u062E\u0636\u0629" ${o==="\u0645\u0646\u062E\u0636\u0629"||o==="\u0645\u0646\u062E\u0641\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="violation-view-q-status" class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                    <select id="violation-view-q-status" class="form-input" style="width:100%;">
                                        <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${a==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                        <option value="\u0645\u062D\u0644\u0648\u0644" ${a==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                                        <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${a==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644</option>
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
        `,document.body.appendChild(n),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(n,{moduleKey:"violations",record:i,recordId:i.id}),n.querySelector("#violation-view-quick-save")?.addEventListener("click",async()=>{await this.saveViolationQuickEditsFromView(i.id,n)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(n,{onFetchFail:r=>{try{r.onerror=null,r.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),n.addEventListener("click",r=>{r.target===n&&n.remove()})},async saveViolationQuickEditsFromView(e,t){const i=t.querySelector("#violation-view-q-severity")?.value?.trim()||"",o=t.querySelector("#violation-view-q-status")?.value?.trim()||"",a=t.querySelector("#violation-view-q-details")?.value?.trim()||"",s=t.querySelector("#violation-view-q-action")?.value?.trim()||"",n=t.querySelector("#violation-view-quick-save");if(!AppState.appData?.violations){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0627\u0644\u0641\u0627\u062A.");return}const r=AppState.appData.violations.findIndex(c=>c.id===e);if(r===-1){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.");return}const l=n?.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{AppState.appData.violations[r]={...AppState.appData.violations[r],severity:i,status:o,violationDetails:a,actionTaken:s,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();let c=!0;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const d=await GoogleIntegration.autoSave("Violations",AppState.appData.violations);d&&d.success===!1&&(c=!1)}}catch(d){c=!1,AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",d)}if(!c)Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL");else try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewViolation(e);try{const d=document.querySelector("#violations-section .tabs-container .tab-btn.active")?.dataset?.tab||"all",p=document.getElementById("violations-list");if(p&&(d==="all"?p.innerHTML=this.renderViolationsList():d==="employees"?p.innerHTML=this.renderEmployeeViolationsList():d==="contractors"&&(p.innerHTML=this.renderContractorViolationsList())),d==="all"){const f=document.getElementById("violations-stats-cards");f&&(f.outerHTML=this.renderAllViolationsStats())}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639:",d)}}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",c),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+(c.message||String(c))),n&&(n.disabled=!1,n.innerHTML=l||'<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629')}},_buildViolationReportTableHtml(e){const t=this.normalizeViolationRecord(e)||e,i=(f,m="\u2014")=>Utils.escapeHTML(String(f==null||f===""?m:f)),o=t.personType==="contractor"||!!t.contractorName,a=o?"\u062A\u0642\u0631\u064A\u0631 \u0631\u0635\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0631\u0635\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",s=Number(this.getEffectiveFineAmount(t))||0,n=typeof this.getPersonViolationHistory=="function"?this.getPersonViolationHistory(t,t.id):null,r=n?.strikeBadgeText||`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 ${t.violationSequenceInMonth||1}`,l=t.violationDate?Utils.formatDate(t.violationDate):"\u2014",c=typeof this.getResolvedViolationTime=="function"?this.getResolvedViolationTime(t):t.violationTime||"",d=c?this.formatViolationTime(c):"";let p="";if(t.photo&&typeof t.photo=="string"&&t.photo.startsWith("data:image/"))p=t.photo;else if(t.photo){const f=this.processPhoto(t.photo);p=f?this.convertGoogleDriveLinkToPrintable(f):""}return`
            ${this.getIsoPrintHeaderHtml(a,subtitle,"DOC-HSE-VIO-REC-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

            <div class="summary-cards-row">
                <div class="kpi-stat-card accent-red">
                    <div class="kpi-card-label">\u0631\u0642\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 / \u0627\u0644\u0643\u0648\u062F</div>
                    <div class="kpi-card-value" style="color: #991b1b; font-size: 14px;">${i(t.isoCode||t.id||"\u2014")}</div>
                </div>
                <div class="kpi-stat-card accent-amber">
                    <div class="kpi-card-label">\u062A\u0627\u0631\u064A\u062E \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div>
                    <div class="kpi-card-value" style="color: #92400e; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 4px; white-space: nowrap;">
                        <bdi dir="ltr" style="font-weight: 700; color: #92400e;">${l}</bdi>
                        ${d?`
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #b45309; font-weight: 700; font-size: 12px;">
                                <i class="far fa-clock ml-1" style="font-size: 11px;"></i>
                                <bdi dir="rtl">${d}</bdi>
                            </span>
                        `:t.shift?`
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #b45309; font-weight: 700; font-size: 11.5px;">
                                <i class="fas fa-sun ml-1" style="font-size: 11px;"></i>
                                <bdi>${i(t.shift)}</bdi>
                            </span>
                        `:`
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #92400e; font-weight: 600; font-size: 11px;">
                                <i class="far fa-clock ml-1" style="font-size: 11px;"></i>
                                <bdi>\u062C\u0648\u0644\u0629 \u062A\u0641\u062A\u064A\u0634</bdi>
                            </span>
                        `}
                    </div>
                </div>
                <div class="kpi-stat-card ${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"accent-red":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"accent-amber":"accent-blue"}">
                    <div class="kpi-card-label">\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629</div>
                    <div class="kpi-card-value" style="font-size: 15px; color: ${t.severity==="\u0639\u0627\u0644\u064A\u0629"?"#b91c1c":t.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"};">
                        ${i(t.severity||"\u2014")}
                    </div>
                </div>
                <div class="kpi-stat-card ${t.status==="\u0645\u062D\u0644\u0648\u0644"?"accent-green":"accent-red"}">
                    <div class="kpi-card-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</div>
                    <div class="kpi-card-value" style="font-size: 15px; color: ${t.status==="\u0645\u062D\u0644\u0648\u0644"?"#047857":"#b91c1c"};">
                        ${i(t.status||"\u2014")}
                    </div>
                </div>
                <div class="kpi-stat-card accent-green">
                    <div class="kpi-card-label">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u063A\u0631\u0627\u0645\u0629</div>
                    <div class="kpi-card-value" style="color: #166534; font-size: 15px;">${this.formatFineAmount(s)}</div>
                </div>
                <div class="kpi-stat-card ${n?.strikeLevel>=3?"accent-red":n?.strikeLevel===2?"accent-amber":"accent-blue"}">
                    <div class="kpi-card-label">\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0634\u062E\u0635</div>
                    <div class="kpi-card-value" style="color: ${n?.strikeLevel>=3?"#991b1b":n?.strikeLevel===2?"#92400e":"#1e3a8a"}; font-size: 13px; font-weight: 800; white-space: nowrap;">${i(r)}</div>
                </div>
            </div>

            <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 -->
            <div class="info-section-block">
                <div class="info-section-header">
                    <i class="fas ${o?"fa-hard-hat":"fa-user-tie"}"></i>
                    ${o?"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641":"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641"}
                </div>
                <div class="info-grid-2">
                    ${o?`
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0633\u0645 \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062A</span>
                            <span class="info-cell-value">${i(t.contractorName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0643\u0648\u062F / \u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</span>
                            <span class="info-cell-value" dir="ltr" style="text-align: right;"><bdi>${i(this.getCleanContractorCode(t))}</bdi></span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641</span>
                            <span class="info-cell-value" style="color: #991b1b; font-weight: 900;">${i(t.contractorWorker||t.employeeName||t.contractorName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 / \u0627\u0644\u0645\u0647\u0646\u0629</span>
                            <span class="info-cell-value">${i(t.contractorPosition||"\u0639\u0627\u0645\u0644 \u0645\u0642\u0627\u0648\u0644")}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0641</span>
                            <span class="info-cell-value">${i(t.contractorDepartment||"\u2014")}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0646\u0648\u0639 \u0627\u0644\u0633\u062C\u0644</span>
                            <span class="info-cell-value">\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u0645\u0639\u062A\u0645\u062F</span>
                        </div>
                    `:`
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</span>
                            <span class="info-cell-value" style="color: #991b1b; font-weight: 900;">${i(t.employeeName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0644\u0631\u0642\u0645 / \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                            <span class="info-cell-value" dir="ltr" style="text-align: right;"><bdi>${i(t.employeeCode||t.employeeNumber||"\u2014")}</bdi></span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                            <span class="info-cell-value">${i(t.employeePosition||"\u2014")}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647</span>
                            <span class="info-cell-value">${i(t.employeeDepartment||"\u2014")}</span>
                        </div>
                    `}
                </div>
            </div>

            <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u0627\u0642\u0639\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 -->
            <div class="info-section-block">
                <div class="info-section-header">
                    <i class="fas fa-exclamation-circle"></i>
                    \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0627\u0642\u0639\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                </div>
                <div class="info-grid-2">
                    <div class="info-cell">
                        <span class="info-cell-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0646\u0634\u0623\u0629</span>
                        <span class="info-cell-value" dir="auto" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;"><bdi>${i(this.formatLocationPlace(t.violationLocation)||"\u0645\u0635\u0646\u0639 ICAPP")}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062D\u062F\u062F \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639</span>
                        <span class="info-cell-value" dir="auto" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;"><bdi>${i(this.formatLocationPlace(t.violationPlace))}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</span>
                        <span class="info-cell-value" style="color: #991b1b; font-weight: 800;">${i(t.violationType||"\u2014")}</span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">\u0643\u0648\u062F \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</span>
                        <span class="info-cell-value" dir="ltr" style="font-family: monospace, inherit; font-weight: 900; color: #1e3a8a;"><bdi>${i(this.getCleanViolationTypeCode(t))}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)</span>
                        <span class="info-cell-value" style="color: #0f766e; font-weight: 800;"><bdi>${i(t.rootCause||"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)")}</bdi></span>
                    </div>
                    ${t.violationDetails?`
                        <div class="info-cell info-cell-wide">
                            <span class="info-cell-label">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0648\u0627\u0642\u0639\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</span>
                            <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5;">${i(t.violationDetails)}</span>
                        </div>
                    `:""}
                    ${t.actionTaken?`
                        <div class="info-cell info-cell-wide">
                            <span class="info-cell-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u0648\u0631\u064A \u0627\u0644\u0645\u062A\u062E\u0630 / \u0627\u0644\u062C\u0632\u0627\u0621 \u0627\u0644\u0645\u0648\u0642\u0639</span>
                            <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5; color: #047857; font-weight: 800;">${i(t.actionTaken)}</span>
                        </div>
                    `:""}
                </div>
            </div>

            <!-- \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0641\u0648\u062A\u0648\u063A\u0631\u0627\u0641\u064A -->
            ${p?`
                <div class="info-section-block">
                    <div class="info-section-header">
                        <i class="fas fa-camera"></i>
                        \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0635\u0648\u0631 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629
                    </div>
                    <div style="padding: 10px; text-align: center; background: #f8fafc;">
                        <img src="${i(p,"")}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629" style="max-height: 180px; max-width: 95%; object-fit: contain; border: 1.5px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onerror="this.closest('.info-section-block').style.display='none';">
                    </div>
                </div>
            `:""}

            <!-- \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F -->
            <div class="signatures-grid">
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u0631\u062A\u0643\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 / \u0645\u0645\u062B\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</div>
                    <div class="sig-card-name">\u0625\u0642\u0631\u0627\u0631 \u0628\u0627\u0644\u0639\u0644\u0645 \u0648\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631</div>
                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u0634\u0631\u0641 / \u0636\u0627\u0628\u0637 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</div>
                    <div class="sig-card-name">\u0627\u0644\u0645\u062D\u0631\u0631 \u0648\u0627\u0644\u0631\u0627\u0635\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A</div>
                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A \u0644\u0644\u062C\u0632\u0627\u0621</div>
                    <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                    <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                </div>
            </div>

            ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-REC-01","Rev. 03","ISO 45001:2018 (Clause 10.2)")}
        `},_generateViolationPrintDocumentHtml(e,t){const i=this.normalizeViolationRecord(e)||e;return`<div class="report-page portrait">${this._buildViolationReportTableHtml(i)}</div>`},async _completeViolationReportPrint(e,t="\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.pdf"){return this.openIsoPrintWindow("\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",e,!1,"",t)},async printViolationProfessional(e){const t=AppState.appData?.violations?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");const i=this.normalizeViolationRecord(t)||t,o=i.personType==="contractor"||!!i.contractorName,a=o?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",s=await this._resolveViolationReportPhoto_(i.photo),n={...i,photo:s},r=this._generateViolationPrintDocumentHtml(n,a),l=o?i.contractorName||i.contractorWorker:i.employeeName,c=i.isoCode||i.id||"\u0633\u062C\u0644",d=`\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629_${this._safeViolationReportFilePart(l)}_${this._safeViolationReportFilePart(c)}.pdf`;this.openIsoPrintWindow(a,r,!1,"",d)}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(i.message||""))}finally{Loading.hide()}},_safeViolationReportFilePart(e,t="\u0633\u062C\u0644"){return String(e||t).trim().replace(/[\u0000-\u001f<>:"/\\|?*]+/g,"_").replace(/\s+/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"")||t},_readViolationReportImageBlob_(e){return new Promise(t=>{if(!e||!String(e.type||"").toLowerCase().startsWith("image/")){t("");return}try{const i=new FileReader;i.onload=()=>t(typeof i.result=="string"?i.result:""),i.onerror=()=>t(""),i.readAsDataURL(e)}catch{t("")}})},async _resolveViolationReportPhoto_(e){if(!e)return"";const t=typeof e=="object"?this.getPhotoSource(e)||e.photo||e.url||e.image||"":e;if(!t)return"";if(typeof t=="string"&&t.startsWith("data:image/"))return t;const i=this.processPhoto(t)||String(t).trim();if(/^data:image\//i.test(i))return i;const o=typeof Utils<"u"&&typeof Utils.extractDriveFileId=="function"?Utils.extractDriveFileId(i):(i.match(/\/d\/([a-zA-Z0-9_-]+)/)||i.match(/id=([a-zA-Z0-9_-]+)/))?.[1];if(o&&typeof Utils<"u"&&typeof Utils.fetchDriveImageDataUri=="function")try{const s=await Utils.fetchDriveImageDataUri(o,{force:!0,requireDataUri:!0});if(s&&/^data:image\//i.test(s))return s}catch{}const a=i.startsWith("//")?"https:"+i:i;if(/^(https?:|blob:)/i.test(a)&&typeof fetch=="function")try{const s=await fetch(a,{method:"GET",credentials:"omit",mode:"cors"});if(s.ok){const n=await this._readViolationReportImageBlob_(await s.blob());if(n)return n}}catch{}return this.convertGoogleDriveLinkToPrintable(i)},async downloadViolationReport(e,t=null){const i=AppState.appData?.violations?.find(n=>n.id===e);if(!i)return Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),!1;const o=this.normalizeViolationRecord(i)||i,a=o.personType==="contractor"||!!o.contractorName,s=t?.innerHTML||"";try{t&&(t.disabled=!0,t.setAttribute("aria-busy","true"),t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (PDF)...");const n=a?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",r=await this._resolveViolationReportPhoto_(o.photo),l={...o,photo:r},c=this._generateViolationPrintDocumentHtml(l,n),d=a?o.contractorName||o.contractorWorker:o.employeeName,p=o.isoCode||o.id||"\u0633\u062C\u0644",f=o.violationDate?String(o.violationDate).slice(0,10):new Date().toISOString().slice(0,10),m=["\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629",this._safeViolationReportFilePart(d,a?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"),this._safeViolationReportFilePart(p),this._safeViolationReportFilePart(f)].join("_")+".pdf";return await this.downloadIsoReportAsPdf(n,c,m,!1)}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF:",n),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+(n.message||"")),!1}finally{Loading.hide(),t&&(t.disabled=!1,t.removeAttribute("aria-busy"),t.innerHTML=s||'<i class="fas fa-file-download"></i>')}},async exportPDF(e,t=null){return this.downloadViolationReport(e,t)},async loadBlacklistDataAsync(){try{(typeof AppState>"u"||!AppState.appData)&&(AppState.appData={}),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]);const e=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,t=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";if(!e||!t){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Integration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637");return}const i=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Blacklist_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(a=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL:",a),{success:!1,data:[]}));let o=!1;if(i&&i.success&&Array.isArray(i.data)?(AppState.appData.blacklistRegister=i.data,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.data.length} \u0633\u062C\u0644 Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL`)):AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",a)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",e),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[])}},refreshBlacklistDisplay(){const e=document.getElementById("violations-tab-content");if(!(!e||!document.querySelector('.tab-btn.active[data-tab="blacklist"]')))try{const i=e.querySelector(".card-body");if(i){const s=i.querySelector(".grid.grid-cols-1")||i.querySelector(".grid")||i.querySelector('[class*="grid-cols"]');if(s&&s.parentElement)s.outerHTML=this.renderBlacklistStats();else{const n=i.querySelector("div > div.grid");n&&(n.outerHTML=this.renderBlacklistStats())}}const o=document.getElementById("blacklist-cards-container");o&&(o.innerHTML=this.renderBlacklistCards());const a=document.getElementById("blacklist-table-container");a&&(a.innerHTML=this.renderBlacklistTable()),this.setupBlacklistEventListeners()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 Blacklist:",i)}},renderBlacklistTab(){return`
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
        `},renderBlacklistStats(){const e=AppState.appData?.blacklistRegister||[],t=e.length,i=new Date().getMonth(),o=new Date().getFullYear(),a=e.filter(r=>{if(!r.banDate)return!1;const l=new Date(r.banDate);return l.getMonth()===i&&l.getFullYear()===o}).length,s=new Set;e.forEach(r=>{r.factory&&r.location?s.add(`${r.factory} - ${r.location}`):r.factory?s.add(r.factory):r.location&&s.add(r.location)});const n=s.size;return`
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
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof a=="number"?a.toLocaleString("en-US"):a}</h3>
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
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof n=="number"?n.toLocaleString("en-US"):n}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">\u0627\u0644\u0645\u0635\u0646\u0639 - \u0627\u0644\u0645\u0648\u0642\u0639</p>
                    </div>
                </div>
            </div>
        `},getPhotoSource(e){return typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?Utils.extractImageSourceCandidate(e):e&&typeof e=="string"?e:""},normalizeGoogleDrivePhotoUrl(e){return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"?Utils.normalizeGoogleDriveImageUrl(e):String(e||"").trim()},processPhoto(e){if(typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"){const a=Utils.normalizeImageSource(e);if(a)return a}const t=this.getPhotoSource(e);if(!t)return null;let i=String(t).trim().replace(/^['"`]+|['"`]+$/g,"");if(!i)return null;if(i.startsWith("blob:"))return i;if(/^data:image\//i.test(i)){const a=i.indexOf(",");if(a===-1)return i.replace(/\s+/g,"");const s=i.slice(0,a).replace(/\s+/g,""),n=i.slice(a+1).replace(/\s+/g,"");return n?`${s},${n}`:null}if(/^https?:\/\//i.test(i))return this.normalizeGoogleDrivePhotoUrl(i);const o=i.replace(/\s+/g,"");return o.length>100&&/^[A-Za-z0-9+/=]+$/.test(o.substring(0,Math.min(120,o.length)))?"data:image/jpeg;base64,"+o:(AppState.debugMode,null)},_onBlacklistCardPhotoError(e){try{if(!e)return;e.onerror=null;const t=document.createElement("div");t.className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800",t.innerHTML='<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>',e.replaceWith(t)}catch{}},_onBlacklistTablePhotoError(e){try{if(!e)return;e.onerror=null,e.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}},_hydrateBlacklistDrivePhotos(){try{if(typeof Utils.hydrateDriveProxyImages!="function")return;const e=o=>{if(!o)return;const a=o.className||"";a.indexOf("blacklist-table-photo")!==-1?this._onBlacklistTablePhotoError(o):a.indexOf("blacklist-detail-photo")!==-1?this._onBlacklistTablePhotoError(o):a.indexOf("blacklist-form-photo")!==-1?this._onBlacklistTablePhotoError(o):this._onBlacklistCardPhotoError(o)},t=document.getElementById("blacklist-cards-container"),i=document.getElementById("blacklist-table");t&&Utils.hydrateDriveProxyImages(t,{onFetchFail:e}),i&&Utils.hydrateDriveProxyImages(i,{onFetchFail:e})}catch{}},renderBlacklistCards(){const e=AppState.appData?.blacklistRegister||[];return e.length===0?`
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    <p class="text-gray-400 text-sm mt-2">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F</p>
                </div>
            `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[...e].sort((i,o)=>{const a=new Date(i.banDate||i.createdAt||0);return new Date(o.banDate||o.createdAt||0)-a}).map(i=>{const o=this.processPhoto(i),a=o&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(o):{canonical:o||"",displaySrc:o||"",needsProxy:!1,proxyFileId:""},s=a.canonical?a.displaySrc:"",n=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(a):"";return`
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${o?`
                                            <img src="${Utils.escapeHTML(s)}" alt="\u0635\u0648\u0631\u0629"${n}
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
        `},async showBlacklistForm(e=null){const t=!!e;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",g)}const i=AppState.appData?.blacklistRegister||[],o=i.length>0?Math.max(...i.map(g=>parseInt(g.serialNumber)||0))+1:1,a=this.getSiteOptions(),s=a.map(g=>`<option value="${Utils.escapeHTML(g.name)}" data-site-id="${g.id}" ${e?.factory===g.name||e?.factoryId===g.id?"selected":""}>${Utils.escapeHTML(g.name)}</option>`).join(""),c=((AppState.appData?.formSettings||{}).departments||[]).map(g=>typeof g=="object"?g.name:g).filter(Boolean).map(g=>`<option value="${Utils.escapeHTML(g)}"></option>`).join(""),d=e?.factoryId||a.find(g=>g.name===e?.factory)?.id||"",p=d?this.getPlaceOptions(d).map(g=>`<option value="${Utils.escapeHTML(g.name)}" data-place-id="${g.id}" ${e?.location===g.name||e?.locationId===g.id?"selected":""}>${Utils.escapeHTML(g.name)}</option>`).join(""):'<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B --</option>',f=AppState.currentUser||{name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",email:""},m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
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
                    ${this.renderBlacklistFormContent(e,o,s,p,c,f)}
                </div>
            </div>
        `,document.body.appendChild(m),this.setupBlacklistFormInModal(m,e).catch(g=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C Blacklist:",g)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(m,{onFetchFail:g=>this._onBlacklistTablePhotoError(g)}),m.addEventListener("click",g=>{g.target===m&&m.remove()});const u=g=>{g.key==="Escape"&&document.body.contains(m)&&(m.remove(),document.removeEventListener("keydown",u))};document.addEventListener("keydown",u)},renderBlacklistFormContent(e,t,i,o,a,s){const n=!!e,r=this.processPhoto(e),l=r&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r||"",displaySrc:r||"",needsProxy:!1,proxyFileId:""},c=l.canonical?l.displaySrc:"",d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`
            <form id="blacklist-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644) -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                            \u0645 (\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644)
                        </label>
                        <input type="text" id="blacklist-serial" class="form-input" 
                            value="${n&&e.serialNumber||t}" 
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
                            ${a}
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
                            value="${Utils.escapeHTML(e?.editor||s.name)}" 
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
                        <i class="fas fa-save ml-2"></i>${n?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644"}
                    </button>
                </div>
            </form>
        `},async setupBlacklistFormInModal(e,t){const i=!!t,o=e.querySelector("#blacklist-form");o&&(o.dataset.editId=i?t.id:""),o&&o.addEventListener("submit",c=>this.handleBlacklistSubmit(c));const a=e.querySelector("#blacklist-cancel-btn");a&&a.addEventListener("click",()=>{e.remove()});const s=e.querySelector("#blacklist-photo-input");s&&s.addEventListener("change",c=>this.handleBlacklistPhotoUpload(c));const n=e.querySelector("#blacklist-contractor"),r=e.querySelector("#blacklist-contractors-list");if(n&&r)try{let c=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(c=Contractors.getAllContractorsForModules()||[]),c.length===0){const d=[...AppState.appData?.approvedContractors||[],...AppState.appData?.contractors||[]].filter(f=>f&&f.isActive!=="inactive"&&f.isActive!==!1&&f.isActive!=="false"&&f.isActive!=="FALSE");c=Array.from(new Map(d.map(f=>[f.id||f.contractorId,f])).values()).filter(f=>f&&(f.name||f.companyName||f.contractorName)).map(f=>({id:f.id||f.contractorId||"",name:(f.name||f.companyName||f.contractorName||"").trim()})).filter(f=>f.name&&f.name!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641").sort((f,m)=>f.name.localeCompare(m.name,"ar",{sensitivity:"base"}))}if(r.innerHTML=c.map(d=>`<option value="${Utils.escapeHTML(d.name)}" data-contractor-id="${d.id||""}"></option>`).join(""),t?.contractor){const d=t.contractor.split(" - ")[0].trim();n.value=d}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",c)}const l=e.querySelector("#blacklist-factory");if(l&&(l.addEventListener("change",async c=>{const d=c.target.selectedOptions[0],p=d?.dataset.siteId||d?.value;await this.loadBlacklistPlaces(p)}),i&&t?.factoryId)){const c=t.factoryId;try{await this.loadBlacklistPlaces(c),setTimeout(()=>{const d=e.querySelector("#blacklist-location");d&&t?.location&&(d.value=t.location)},100)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",d)}}},renderBlacklistTable(){const t=[...AppState.appData?.blacklistRegister||[]].sort((i,o)=>{const a=new Date(i.banDate||i.createdAt||0);return new Date(o.banDate||o.createdAt||0)-a});return t.length===0?`
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
                            ${t.map(i=>{const o=this.processPhoto(i),a=o&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(o):{canonical:o||"",displaySrc:o||"",needsProxy:!1,proxyFileId:""},s=a.canonical?a.displaySrc:"",n=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(a):"";return`
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
                                        ${o?`<img src="${Utils.escapeHTML(s)}" alt="\u0635\u0648\u0631\u0629"${n} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
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
        `},async setupBlacklistEventListeners(){setTimeout(async()=>{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",r)}const e=document.getElementById("blacklist-form");if(e&&!e.closest(".modal-overlay")){const r=e.cloneNode(!0);e.parentNode.replaceChild(r,e),r.addEventListener("submit",l=>this.handleBlacklistSubmit(l))}const t=document.getElementById("blacklist-photo-input");t&&!t.closest(".modal-overlay")&&t.addEventListener("change",r=>this.handleBlacklistPhotoUpload(r));const i=document.getElementById("blacklist-search");if(i){const r=i.cloneNode(!0);i.parentNode.replaceChild(r,i),r.addEventListener("input",l=>this.filterBlacklistTable(l.target.value))}const o=document.getElementById("blacklist-add-btn");o?o.dataset.listenerAttached?AppState.debugMode&&Utils.safeLog('\u2139\uFE0F \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0645\u0631\u0628\u0648\u0637 \u0645\u0633\u0628\u0642\u0627\u064B'):(o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();try{this.showBlacklistForm()}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C Blacklist:",l),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}}),o.dataset.listenerAttached="true",AppState.debugMode&&Utils.safeLog('\u2705 \u062A\u0645 \u0631\u0628\u0637 \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0628\u0646\u062C\u0627\u062D')):AppState.debugMode&&Utils.safeWarn('\u26A0\uFE0F \u0632\u0631 "blacklist-add-btn" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM');const a=document.getElementById("blacklist-factory");a&&!a.closest(".modal-overlay")&&a.addEventListener("change",async r=>{const l=r.target.selectedOptions[0],c=l?.dataset.siteId||l?.value;await this.loadBlacklistPlaces(c)});const s=document.getElementById("blacklist-export-pdf");if(s){const r=s.cloneNode(!0);s.parentNode.replaceChild(r,s),r.addEventListener("click",()=>this.exportBlacklistToPDF())}const n=document.getElementById("blacklist-export-excel");if(n){const r=n.cloneNode(!0);n.parentNode.replaceChild(r,n),r.addEventListener("click",()=>this.exportBlacklistToExcel())}this._hydrateBlacklistDrivePhotos()},100)},async handleBlacklistSubmit(e){e.preventDefault();const t=e.target,i=!!t.dataset.editId;let o=i&&AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.photo||"";const a=t.closest(".modal-overlay"),s=a?a.querySelector("#blacklist-photo-input"):document.getElementById("blacklist-photo-input");if(s?.files?.[0]){const f=s.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}try{o=await this.convertImageToBase64(f)}catch(m){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",m)}}const n=a?a.querySelector("#blacklist-factory"):document.getElementById("blacklist-factory"),r=a?a.querySelector("#blacklist-location"):document.getElementById("blacklist-location"),l=n?.selectedOptions[0],c=r?.selectedOptions[0],d=f=>(a?a.querySelector(`#${f}`):document.getElementById(f))?.value||"",p={id:t.dataset.editId||Utils.generateId("BLACKLIST"),serialNumber:d("blacklist-serial"),factory:n?.value||"",factoryId:l?.dataset.siteId||"",location:r?.value||"",locationId:c?.dataset.placeId||"",fullName:d("blacklist-name"),idNumber:d("blacklist-id-number"),photo:o,job:d("blacklist-job"),contractor:(d("blacklist-contractor")||"").trim().split(" - ")[0],department:d("blacklist-department"),banReason:d("blacklist-ban-reason"),banDate:d("blacklist-ban-date"),bannedBy:d("blacklist-banned-by"),editor:d("blacklist-editor"),notes:d("blacklist-notes"),createdAt:i?AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(o&&o.startsWith("data:"))try{const f=await GoogleIntegration.uploadFileToDrive?.(o,`blacklist_${p.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");f?.success&&(f.directLink||f.shareableLink)?(p.photo=f.directLink||f.shareableLink,AppState.debugMode):(AppState.debugMode,Notification.warning("\u0641\u0634\u0644 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649 Drive. \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0624\u0642\u062A\u0627\u064B."))}catch(f){AppState.debugMode&&Utils.safeWarn("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",f),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+f.message)}await this.saveBlacklistRecord(p,i)},async saveBlacklistRecord(e,t){Loading.show();try{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),t){const n=AppState.appData.blacklistRegister.findIndex(r=>r.id===e.id);n!==-1?AppState.appData.blacklistRegister[n]=e:AppState.appData.blacklistRegister.push(e)}else AppState.appData.blacklistRegister.push(e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(n){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",n),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D`);const i=document.querySelector(".modal-overlay");i&&i.querySelector("#blacklist-form")&&i.remove();const o=document.getElementById("blacklist-cards-container");o&&(o.innerHTML=this.renderBlacklistCards(),this.setupBlacklistEventListeners());const a=document.getElementById("blacklist-table-container");a&&(a.innerHTML=this.renderBlacklistTable(),this.setupBlacklistEventListeners());const s=document.querySelector("#violations-tab-content .card-body");if(s){const n=s.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");n&&(n.outerHTML=this.renderBlacklistStats())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644: "+i.message)}},handleBlacklistPhotoUpload(e){const t=e.target.files?.[0];if(!t)return;const i=new FileReader;i.onload=o=>{const a=document.querySelector(".modal-overlay"),s=a?a.querySelector("#blacklist-photo-preview"):document.getElementById("blacklist-photo-preview"),n=a?a.querySelector("#blacklist-photo-img"):document.getElementById("blacklist-photo-img");s&&n&&(n.src=o.target.result,s.classList.remove("hidden"))},i.readAsDataURL(t)},async loadBlacklistPlaces(e){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.querySelector(".modal-overlay"),i=t?t.querySelector("#blacklist-location"):document.getElementById("blacklist-location");if(!i)return;i.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',this.getPlaceOptions(e).forEach(a=>{const s=document.createElement("option");s.value=a.name,s.dataset.placeId=a.id,s.textContent=a.name,i.appendChild(s)})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t)}},filterBlacklistTable(e){const t=document.getElementById("blacklist-table-body");if(!t)return;const i=t.querySelectorAll("tr"),o=e.toLowerCase();i.forEach(a=>{const s=a.textContent.toLowerCase();a.style.display=s.includes(o)?"":"none"})},editBlacklistRecord(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showBlacklistForm(t)},async deleteBlacklistRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData?.blacklistRegister&&(AppState.appData.blacklistRegister=AppState.appData.blacklistRegister.filter(i=>i.id!==e)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",i),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn.active[data-tab="blacklist"]')&&await this.switchTab("blacklist")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",t),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+t.message)}}},viewBlacklistPhoto(e){if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629");return}const t=this.processPhoto(e);if(!t){Notification.error("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}const i=a=>{const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="width: 100%; max-height: 70vh; object-fit: contain;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23666%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                </div>
            </div>
        `,document.body.appendChild(s)},o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{needsProxy:!1,proxyFileId:""};if(o.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function"){Utils.fetchDriveImageDataUri(o.proxyFileId).then(a=>{a?i(a):Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}).catch(()=>Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"));return}i(t)},viewBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(r=>r.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t),o=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},a=o.canonical?o.displaySrc:"",s=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"",n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
                            <img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${s}
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
        `,document.body.appendChild(n),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(n,{moduleKey:"violations.blacklist",record:{...t,name:t.fullName||"",nationalId:t.idNumber||"",reason:t.banReason||"",date:t.banDate||t.createdAt||""},recordId:t.id||e||""}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(n,{onFetchFail:r=>this._onBlacklistTablePhotoError(r)})},async printBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062B\u064A\u0642\u0629 \u0623\u0645\u0631 \u0627\u0644\u0645\u0646\u0639 (ISO 45001)...");const i=t.photo||t.image||t.photoUrl||"",o=await this._resolveViolationReportPhoto_(i),a="\u0623\u0645\u0631 \u0645\u0646\u0639 \u0625\u062F\u0627\u0631\u064A \u0645\u0646 \u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",n=`
                <div class="report-page portrait">
                    ${this.getIsoPrintHeaderHtml(a,"Blacklist Ban Order \u2014 \u0625\u062C\u0631\u0627\u0621 \u0623\u0645\u0646\u064A \u0648\u0633\u0644\u0627\u0645\u0629 \u0645\u0647\u0646\u064A\u0629 \u0645\u0634\u062F\u062F","DOC-HSE-VIO-BLK-01","Rev. 03","\u0633\u0631\u064A \u0644\u0644\u063A\u0627\u064A\u0629")}

                    <div style="background: #fef2f2; border: 2px solid #b91c1c; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; color: #991b1b; font-weight: 800; font-size: 11.5px; text-align: center;">
                        <i class="fas fa-exclamation-triangle ml-2"></i>
                        \u0642\u0631\u0627\u0631 \u0625\u062F\u0627\u0631\u064A \u0645\u0644\u0632\u0645: \u064A\u064F\u0645\u0646\u0639 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u062F\u0646\u0627\u0647 \u0645\u0646\u0639\u0627\u064B \u0628\u0627\u062A\u0627\u064B \u0645\u0646 \u062F\u062E\u0648\u0644 \u062C\u0645\u064A\u0639 \u0645\u0635\u0627\u0646\u0639 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP) \u0644\u0645\u062E\u0627\u0644\u0641\u062A\u0647 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A
                    </div>

                    <div class="summary-cards-row">
                        <div class="kpi-stat-card accent-red">
                            <div class="kpi-card-label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A \u0644\u0644\u0645\u0646\u0639</div>
                            <div class="kpi-card-value" style="color: #991b1b; font-size: 14px;">${Utils.escapeHTML(t.serialNumber||t.id||"-")}</div>
                        </div>
                        <div class="kpi-stat-card accent-amber">
                            <div class="kpi-card-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</div>
                            <div class="kpi-card-value" style="color: #92400e; font-size: 14px;">${t.banDate?Utils.formatDate(t.banDate):"-"}</div>
                        </div>
                        <div class="kpi-stat-card accent-blue">
                            <div class="kpi-card-label">\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0639\u0646\u064A</div>
                            <div class="kpi-card-value" style="color: #1e3a8a; font-size: 14px;">${Utils.escapeHTML(t.factory||"-")}</div>
                        </div>
                        <div class="kpi-stat-card accent-green">
                            <div class="kpi-card-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062D\u062F\u062F</div>
                            <div class="kpi-card-value" style="color: #047857; font-size: 14px;">${Utils.escapeHTML(t.location||"-")}</div>
                        </div>
                    </div>

                    <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 -->
                    <div class="info-section-block">
                        <div class="info-section-header">
                            <i class="fas fa-user-slash"></i>
                            \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0647\u0648\u064A\u0629 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644
                        </div>
                        <div class="info-grid-2">
                            <div class="info-cell">
                                <span class="info-cell-label">\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</span>
                                <span class="info-cell-value" style="color: #991b1b; font-weight: 900; font-size: 12px;">${Utils.escapeHTML(t.fullName||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u0631\u0642\u0645 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</span>
                                <span class="info-cell-value" style="font-family: monospace, inherit; font-weight: 900;">${Utils.escapeHTML(t.idNumber||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 / \u0627\u0644\u0645\u0647\u0646\u0629</span>
                                <span class="info-cell-value">${Utils.escapeHTML(t.job||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647\u0627 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</span>
                                <span class="info-cell-value">${Utils.escapeHTML(t.contractor||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</span>
                                <span class="info-cell-value">${Utils.escapeHTML(t.department||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</span>
                                <span class="info-cell-value">${Utils.escapeHTML(t.bannedBy||"-")}</span>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 -->
                    ${o?`
                        <div class="info-section-block">
                            <div class="info-section-header">
                                <i class="fas fa-id-card"></i>
                                \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0644\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639
                            </div>
                            <div style="padding: 10px; text-align: center; background: #f8fafc;">
                                <img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="max-height: 180px; max-width: 95%; object-fit: contain; border: 1.5px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onerror="this.closest('.info-section-block').style.display='none';">
                            </div>
                        </div>
                    `:""}

                    <!-- \u0623\u0633\u0628\u0627\u0628 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0642\u0631\u0627\u0631 \u0627\u0644\u0645\u0646\u0639 -->
                    <div class="info-section-block">
                        <div class="info-section-header">
                            <i class="fas fa-file-alt"></i>
                            \u0623\u0633\u0628\u0627\u0628 \u0648\u062D\u064A\u062B\u064A\u0627\u062A \u0642\u0631\u0627\u0631 \u0627\u0644\u0645\u0646\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u064A
                        </div>
                        <div class="info-grid-2">
                            <div class="info-cell info-cell-wide">
                                <span class="info-cell-label">\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639 \u0648\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0631\u062A\u0643\u0628\u0629</span>
                                <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5; color: #b91c1c;">${Utils.escapeHTML(t.banReason||"-")}</span>
                            </div>
                            ${t.notes?`
                                <div class="info-cell info-cell-wide">
                                    <span class="info-cell-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0645\u0646\u064A\u0629 \u0648\u0625\u062F\u0627\u0631\u064A\u0629</span>
                                    <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5;">${Utils.escapeHTML(t.notes)}</span>
                                </div>
                            `:""}
                            <div class="info-cell">
                                <span class="info-cell-label">\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</span>
                                <span class="info-cell-value">${Utils.escapeHTML(t.editor||"-")}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">\u062A\u0627\u0631\u064A\u062E \u062A\u062D\u0631\u064A\u0631 \u0627\u0644\u0633\u062C\u0644</span>
                                <span class="info-cell-value">${t.createdAt?Utils.formatDateTime(t.createdAt):"-"}</span>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A -->
                    <div class="signatures-grid">
                        <div class="sig-card">
                            <div class="sig-card-title">\u0623\u0645\u0646 \u0627\u0644\u0645\u0646\u0634\u0622\u062A \u0648\u0627\u0644\u062D\u0631\u0627\u0633\u0627\u062A</div>
                            <div class="sig-card-name">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0628\u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                            <div class="sig-card-name">\u0645\u064F\u0635\u062F\u0631 \u0642\u0631\u0627\u0631 \u0627\u0644\u0645\u0646\u0639 \u0648\u0627\u0644\u062A\u062F\u0642\u064A\u0642</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                            <div class="sig-card-name">\u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627</div>
                            <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                        </div>
                    </div>

                    ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-BLK-01","Rev. 03","ISO 45001:2018 (Clause 8.1.4)")}
                </div>
            `;Loading.hide();const r=`\u0623\u0645\u0631_\u0645\u0646\u0639_${Utils.escapeHTML(t.fullName||"\u0634\u062E\u0635")}_${new Date().toISOString().slice(0,10)}.pdf`;this.openIsoPrintWindow(a,n,!1,"",r)}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0637\u0628\u0627\u0639\u0629 \u0623\u0645\u0631 \u0627\u0644\u0645\u0646\u0639:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+i.message)}},async exportBlacklistToPDF(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 (ISO 45001)...");const t="\u0633\u062C\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0648\u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u0629 \u0645\u0646 \u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629",i="Master Blacklist Register \u2014 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631 \u0627\u0644\u0623\u0645\u0646\u064A \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",o=e.length,a=new Set(e.map(d=>d.factory).filter(Boolean)).size,s=new Set(e.map(d=>d.contractor).filter(Boolean)).size,n=this._paginateViolationsList(e,8,11),r=n.length,l=n.map((d,p)=>{const f=p+1,m=f===1,u=f===r,g=d.map((v,b)=>`
                        <tr>
                            <td style="font-weight: 700;">${(p===0?0:8+(p-1)*11)+b+1}</td>
                            <td>${v.banDate?Utils.formatDate(v.banDate):"-"}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.factory||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.location||"-")}</td>
                            <td style="font-weight: 800; text-align: right; color: #991b1b;">${Utils.escapeHTML(v.fullName||"-")}</td>
                            <td style="font-family: monospace, inherit; font-size: 9.5px;">${Utils.escapeHTML(v.idNumber||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.job||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.contractor||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.department||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.bannedBy||"-")}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(v.banReason||"-")}</td>
                        </tr>
                    `).join("");return`
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(t,m?i:`\u062A\u0627\u0628\u0639 \u062C\u062F\u0648\u0644 ${t} \u2014 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`,"DOC-HSE-VIO-BLK-REG-01","Rev. 03","\u0633\u0631\u064A \u0644\u0644\u063A\u0627\u064A\u0629")}

                        ${m?`
                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${o}</div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u0639\u0646\u064A\u0629</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a;">${a}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646</div>
                                    <div class="kpi-card-value" style="color: #92400e;">${s}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0627\u0644\u0633\u062C\u0644</div>
                                    <div class="kpi-card-value" style="color: #047857; font-size: 14px;">${Utils.formatDate(new Date)}</div>
                                </div>
                            </div>
                        `:""}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 32px;">\u0645</th>
                                    <th style="width: 75px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</th>
                                    <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                    <th>\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</th>
                                    <th>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</th>
                                    <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                                    <th>\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                    <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                    <th>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</th>
                                    <th>\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${g}
                            </tbody>
                        </table>

                        ${u?`
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0645\u0633\u0624\u0648\u0644 \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0646\u0634\u0622\u062A</div>
                                    <div class="sig-card-name">\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0648\u0625\u062E\u0637\u0627\u0631 \u0627\u0644\u062D\u0631\u0627\u0633\u0627\u062A</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                                    <div class="sig-card-name">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u0646\u0638\u0627\u0645\u064A</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A</div>
                                    <div class="sig-card-name">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A \u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-BLK-REG-01","Rev. 03","ISO 45001:2018 (Clause 8.1.4)")}
                        `:""}

                        <div class="page-counter-footer">\u0635\u0641\u062D\u0629 ${f} \u0645\u0646 ${r}</div>
                    </div>
                `}).join("");Loading.hide();const c=`\u0633\u062C\u0644_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(t,l,c,!0)}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 PDF:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportBlacklistToExcel(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel..."),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS");return}const t=e.map(r=>({\u0645:r.serialNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639":r.banDate?Utils.formatDate(r.banDate):"",\u0627\u0644\u0645\u0635\u0646\u0639:r.factory||"",\u0627\u0644\u0645\u0648\u0642\u0639:r.location||"","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A":r.fullName||"","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629":r.idNumber||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:r.job||"","\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644":r.contractor||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:r.department||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639":r.bannedBy||"","\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":r.editor||"","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639":r.banReason||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:r.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDateTime(r.createdAt):"","\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":r.updatedAt?Utils.formatDateTime(r.updatedAt):""})),i=XLSX.utils.book_new(),o=XLSX.utils.json_to_sheet(t),a=[{wch:8},{wch:12},{wch:15},{wch:15},{wch:25},{wch:15},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:40},{wch:40},{wch:18},{wch:18}];o["!cols"]=a,XLSX.utils.book_append_sheet(i,o,"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646");const n=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}},convertGoogleDriveLinkToPrintable(e){if(!e)return"";if(typeof window.__convertGoogleDriveUrl=="function"&&(e=window.__convertGoogleDriveUrl(e)),e.startsWith("data:image/")||e.includes("drive.google.com/thumbnail"))return e;const t=e.match(/\/d\/([a-zA-Z0-9_-]+)/)||e.match(/id=([a-zA-Z0-9_-]+)/);return t&&t[1]?`https://drive.google.com/thumbnail?id=${t[1]}&sz=w800`:e},getIsoPrintCommonStyles(e=!1){return`
            :root {
                --brand-primary: #991b1b;
                --brand-navy: #0f172a;
                --brand-green: #047857;
                --brand-red: #b91c1c;
                --brand-amber: #d97706;
                --border-color: #cbd5e1;
            }
            * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body {
                font-family: 'Cairo', system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 0;
                background: #f8fafc;
                color: #0f172a;
                line-height: 1.5;
                direction: rtl;
            }
            .no-print-bar {
                position: sticky;
                top: 0;
                z-index: 9999;
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                border-bottom: 3px solid #dc2626;
            }
            .no-print-bar .brand-badge {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .no-print-bar .pill-tag {
                background: #dc2626;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 11px;
                letter-spacing: 0.5px;
            }
            .no-print-bar .title-text {
                font-size: 13.5px;
                font-weight: 800;
            }
            .no-print-bar .action-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .btn-direct-download {
                padding: 8px 18px;
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(5,150,105,0.35);
            }
            .btn-direct-download:hover { background: #047857; }
            .btn-print {
                padding: 8px 18px;
                background: #2563eb;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(37,99,235,0.4);
            }
            .btn-print:hover { background: #1d4ed8; }
            .btn-close {
                padding: 8px 16px;
                background: #475569;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
            }
            .btn-close:hover { background: #334155; }

            .report-page-container {
                max-width: ${e?"1180px":"920px"};
                margin: 22px auto 40px auto;
                background: #ffffff;
                padding: 12px 16px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
                border: 1px solid #e2e8f0;
            }
            .report-page {
                box-sizing: border-box;
                width: 100%;
                min-height: ${e?"740px":"1080px"};
                padding: 16px 20px;
                background: #ffffff;
                page-break-after: always;
                break-after: page;
            }
            .report-page:last-child {
                page-break-after: auto;
                break-after: auto;
            }

            .iso-print-header {
                display: grid;
                grid-template-columns: 240px 1fr 210px;
                border: 2px solid #0f172a;
                border-top: 5px solid #991b1b;
                border-radius: 8px;
                overflow: hidden;
                background: #ffffff;
                margin-bottom: 14px;
            }
            .iso-box-brand {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1.5px solid #0f172a;
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                gap: 4px;
                text-align: center;
            }
            .iso-print-logo {
                max-height: 46px;
                max-width: 130px;
                object-fit: contain;
                margin-bottom: 2px;
            }
            .iso-company-title {
                font-size: 10.5px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.3;
            }
            .iso-dept-title {
                font-size: 9.5px;
                font-weight: 800;
                color: #991b1b;
                line-height: 1.25;
            }

            .iso-box-title {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: #ffffff;
            }
            .iso-main-title {
                margin: 0;
                font-size: 15.5px;
                font-weight: 900;
                color: #991b1b;
                line-height: 1.3;
            }
            .iso-sub-title {
                font-size: 10px;
                font-weight: 700;
                color: #475569;
                margin-top: 3px;
            }
            .iso-badge-std {
                display: inline-block;
                margin-top: 5px;
                background: #fef2f2;
                color: #b91c1c;
                border: 1px solid #fecaca;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 9px;
                font-weight: 800;
            }

            .iso-box-meta {
                padding: 8px 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1.5px solid #0f172a;
                background: #f8fafc;
                gap: 3px;
            }
            .meta-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px dashed #cbd5e1;
                padding-bottom: 2px;
                font-size: 10px;
            }
            .meta-row:last-child { border-bottom: none; }
            .meta-row span { color: #64748b; font-weight: 700; }
            .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

            .summary-cards-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 14px;
            }
            .kpi-stat-card {
                flex: 1 1 140px;
                padding: 10px 12px;
                border-radius: 8px;
                border: 1.5px solid #cbd5e1;
                background: #f8fafc;
            }
            .kpi-stat-card.accent-red { background: #fef2f2; border-color: #fecaca; }
            .kpi-stat-card.accent-blue { background: #eff6ff; border-color: #bfdbfe; }
            .kpi-stat-card.accent-amber { background: #fffbeb; border-color: #fde68a; }
            .kpi-stat-card.accent-green { background: #ecfdf5; border-color: #a7f3d0; }
            .kpi-card-label {
                font-size: 10px;
                font-weight: 700;
                color: #64748b;
                margin-bottom: 4px;
            }
            .kpi-card-value {
                font-size: 18px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.1;
            }

            .info-section-block {
                border: 1.5px solid #cbd5e1;
                border-radius: 8px;
                margin-bottom: 12px;
                overflow: hidden;
                background: #ffffff;
                page-break-inside: avoid;
            }
            .info-section-header {
                background: #f1f5f9;
                color: #0f172a;
                font-size: 11px;
                font-weight: 900;
                padding: 6px 12px;
                border-bottom: 1.5px solid #cbd5e1;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .info-section-header i { color: #991b1b; }
            .info-grid-2 {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .info-grid-4 {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            .info-cell {
                padding: 6px 10px;
                border-bottom: 1px solid #e2e8f0;
                border-left: 1px solid #e2e8f0;
            }
            .info-cell-wide {
                grid-column: 1 / -1;
            }
            .info-cell-label {
                font-size: 9.5px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 2px;
                display: block;
            }
            .info-cell-value {
                font-size: 11px;
                font-weight: 800;
                color: #0f172a;
                line-height: 1.35;
                word-break: normal;
                overflow-wrap: break-word;
            }
            .info-cell-value.danger { color: #b91c1c; }
            .info-cell-value.success { color: #047857; }
            .info-cell-value.money { color: #166534; font-size: 13px; font-weight: 900; }

            .iso-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 8px;
                margin-bottom: 12px;
                font-size: 10.5px;
            }
            .iso-table th {
                background: #991b1b;
                color: #ffffff;
                padding: 7px 6px;
                font-weight: 800;
                border: 1px solid #7f1d1d;
                text-align: center;
            }
            .iso-table td {
                padding: 6px 6px;
                border: 1px solid #cbd5e1;
                text-align: center;
                color: #0f172a;
            }
            .iso-table tr:nth-child(even) td {
                background: #fef2f2;
            }

            .signatures-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-top: 14px;
                page-break-inside: avoid;
            }
            .sig-card {
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 8px 10px;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 90px;
            }
            .sig-card-title {
                font-size: 10px;
                font-weight: 800;
                color: #991b1b;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 3px;
                margin-bottom: 4px;
                text-align: center;
            }
            .sig-card-name {
                font-size: 10px;
                font-weight: 800;
                color: #0f172a;
                text-align: center;
            }
            .sig-line-area {
                margin-top: 14px;
                border-top: 1.5px dashed #64748b;
                padding-top: 3px;
                text-align: center;
                font-size: 8.5px;
                color: #64748b;
                font-weight: 700;
            }

            .iso-footer-strip {
                margin-top: 14px;
                border: 1.5px solid #0f172a;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                white-space: nowrap;
                gap: 8px;
                padding: 5px 12px;
                background: #f8fafc;
                font-size: 8.5px;
                font-weight: 800;
                color: #334155;
                page-break-inside: avoid;
            }
            .iso-footer-strip span {
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                gap: 3px;
                flex-shrink: 0;
            }
            .iso-footer-strip span strong {
                color: #0f172a;
                font-family: monospace, inherit;
                white-space: nowrap;
            }
            .portal-unified-footer {
                margin-top: 8px;
                text-align: center;
                font-size: 8.5px;
                color: #64748b;
                line-height: 1.45;
                page-break-inside: avoid;
            }
            .portal-unified-footer strong {
                color: #991b1b;
                font-weight: 800;
            }
            .page-counter-footer {
                text-align: center;
                font-size: 9px;
                font-weight: 700;
                color: #64748b;
                margin-top: 6px;
            }

            @media print {
                body {
                    background: #ffffff !important;
                    padding: 0 !important;
                }
                .no-print-bar {
                    display: none !important;
                }
                .report-page-container {
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .report-page {
                    min-height: auto !important;
                    padding: 4mm 6mm !important;
                    page-break-after: always !important;
                    break-after: page !important;
                }
                .report-page:last-child {
                    page-break-after: auto !important;
                    break-after: auto !important;
                }
                @page {
                    size: ${e?"A4 landscape":"A4 portrait"};
                    margin: 8mm 10mm 8mm 10mm;
                }
            }
        `},getIsoPrintHeaderHtml(e,t,i,o="Rev. 03",a="\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A"){let s="/icons/icapp-logo.png";if(typeof window<"u"&&window.location&&(window.location.protocol==="file:"?s="icons/icapp-logo.png":window.location.origin&&window.location.origin!=="null"&&(s=`${window.location.origin}/icons/icapp-logo.png`)),typeof AppState<"u"&&(AppState.companyLogo||AppState.companySettings?.logo)){const c=AppState.companyLogo||AppState.companySettings?.logo;c&&(s=this.convertGoogleDriveLinkToPrintable(c))}const n="icons/icon-192x192.png",r=new Date,l=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`;return`
            <div class="iso-print-header">
                <div class="iso-box-brand">
                    <img src="${s}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${n}';">
                    <div class="iso-company-title">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                    <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                </div>

                <div class="iso-box-title">
                    <h1 class="iso-main-title">${Utils.escapeHTML(e)}</h1>
                    <div class="iso-sub-title">${Utils.escapeHTML(t)}</div>
                    <div class="iso-badge-std">\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 ISO 45001:2018 & ISO 9001:2015</div>
                </div>

                <div class="iso-box-meta">
                    <div class="meta-row">
                        <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                        <strong>${Utils.escapeHTML(i)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                        <strong>${Utils.escapeHTML(o)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                        <strong>${l}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                        <strong style="color: #047857;">${Utils.escapeHTML(a)}</strong>
                    </div>
                </div>
            </div>
        `},getIsoPrintFooterHtml(e,t="Rev. 03",i="ISO 45001:2018 (Clause 10.2)"){let o=String(i||"ISO 45001:2018 (Clause 10.2)").trim();return o=o.replace(/\(Clause\s+([\d.\s&,]+)[^)]*\)/i,"(Clause $1)").replace(/\s{2,}/g," "),`
            <div class="iso-footer-strip" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; white-space: nowrap; gap: 8px;">
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong style="white-space: nowrap;">${Utils.escapeHTML(e)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong style="white-space: nowrap;">${Utils.escapeHTML(t)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong dir="ltr" style="white-space: nowrap;">${Utils.escapeHTML(o)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong style="white-space: nowrap;">ICAPP HSE MS</strong></span>
            </div>
            <footer class="portal-unified-footer">
                <div><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
                <div>\u0648\u062B\u064A\u0642\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0648\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>
            </footer>
        `},openIsoPrintWindow(e,t,i=!1,o="",a=""){const s=a||`${String(e).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,n=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(e)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        ${this.getIsoPrintCommonStyles(i)}
        ${o}
    </style>
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP SAFETY HUB</span>
            <span class="title-text">${Utils.escapeHTML(e)}</span>
        </div>
        <div class="action-buttons">
            <button class="btn-direct-download" id="dl-pdf-top-btn" onclick="directDownloadReportPdf()">
                <i class="fas fa-file-arrow-down"></i> \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (PDF)
            </button>
            <button class="btn-print" onclick="window.print()">
                <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F
            </button>
            <button class="btn-close" onclick="window.close()">
                <i class="fas fa-times"></i> \u0625\u063A\u0644\u0627\u0642
            </button>
        </div>
    </div>
    <div class="report-page-container">
        ${t}
    </div>
    <script>
        async function directDownloadReportPdf() {
            var btn = document.getElementById('dl-pdf-top-btn');
            var originalText = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...';
            }
            try {
                if (window.opener && window.opener.Utils && typeof window.opener.Utils.downloadHtmlAsPdf === 'function') {
                    var container = document.querySelector('.report-page-container');
                    var targetHtml = container ? container.outerHTML : document.body.innerHTML;
                    var ok = await window.opener.Utils.downloadHtmlAsPdf(targetHtml, ${JSON.stringify(s)}, {
                        landscape: ${i?"true":"false"},
                        title: ${JSON.stringify(e)}
                    });
                    if (ok) {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-check"></i> \u062A\u0645 \u0627\u0644\u062A\u062D\u0645\u064A\u0644!';
                            setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                        }
                        return;
                    }
                }
                window.print();
            } catch (err) {
                console.warn('Direct PDF download error, fallback to print:', err);
                window.print();
            } finally {
                if (btn) {
                    btn.disabled = false;
                    setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                }
            }
        }
    <\/script>
</body>
</html>`,r=new Blob([n],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(r);return window.open(l,"_blank")?(setTimeout(()=>{URL.revokeObjectURL(l)},15e3),!0):(Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),!1)},async downloadIsoReportAsPdf(e,t,i="",o=!1,a=""){const s=i||`${String(e).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,n=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(e)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getIsoPrintCommonStyles(o)}
        ${a}
    </style>
</head>
<body>
    <div class="report-page-container">
        ${t}
    </div>
</body>
</html>`;if(typeof Utils<"u"&&typeof Utils.downloadHtmlAsPdf=="function")try{if(await Utils.downloadHtmlAsPdf(n,s,{landscape:o,title:e}))return Notification.success(`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 PDF \u0628\u0646\u062C\u0627\u062D: ${s}`),!0}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",r)}return this.openIsoPrintWindow(e,t,o,a,s)},_paginateViolationsList(e,t=8,i=12){if(!e||e.length===0)return[];const o=[],a=[...e];for(o.push(a.splice(0,t));a.length>0;)o.push(a.splice(0,i));return o},showAllViolationsReportDialog(e=""){const t=document.getElementById("all-violations-report-modal");t&&t.remove();const i=document.createElement("div");i.className="modal-overlay",i.id="all-violations-report-modal";const o=new Date,a=[];for(let f=0;f<12;f++){const m=new Date(o.getFullYear(),o.getMonth()-f,1),u=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`,g=m.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});a.push(`<option value="${u}"${f===0?" selected":""}>${g}</option>`)}i.innerHTML=`
            <div class="modal-content" style="max-width: 540px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #991b1b, #7f1d1d); color: white;">
                    <h3 class="text-lg font-bold flex items-center gap-2">
                        <i class="fas fa-file-pdf"></i>
                        \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u0645 (ISO 45001)
                    </h3>
                    <button type="button" class="modal-close text-white hover:text-gray-200" data-action="close">&times;</button>
                </div>
                <div class="modal-body p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0636\u0645\u064A\u0646\u0647\u0627:</label>
                        <select id="all-viol-scope-select" class="form-input w-full">
                            <option value="all"${e?"":" selected"}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0645\u0648\u0638\u0641\u064A\u0646 + \u0645\u0642\u0627\u0648\u0644\u064A\u0646)</option>
                            <option value="employee"${e==="employee"?" selected":""}>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u0642\u0637</option>
                            <option value="contractor"${e==="contractor"?" selected":""}>\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0641\u0642\u0637</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0637\u0627\u0642 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629:</label>
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="all" checked>
                                <span>\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="month">
                                <span>\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</span>
                            </label>
                            <div class="mr-6">
                                <select id="all-viol-month-select" class="form-input w-full text-sm" disabled>
                                    ${a.join("")}
                                </select>
                            </div>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="custom">
                                <span>\u0641\u062A\u0631\u0629 \u0645\u062E\u0635\u0635\u0629 (\u0645\u0646 / \u0625\u0644\u0649)</span>
                            </label>
                            <div class="mr-6 grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-xs text-gray-600 mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E:</label>
                                    <input type="date" id="all-viol-from-date" class="form-input w-full text-sm" disabled>
                                </div>
                                <div>
                                    <label class="block text-xs text-gray-600 mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E:</label>
                                    <input type="date" id="all-viol-to-date" class="form-input w-full text-sm" disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629:</label>
                            <select id="all-viol-severity-select" class="form-input w-full text-sm">
                                <option value="">\u0627\u0644\u0643\u0644 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062F\u0631\u062C\u0627\u062A)</option>
                                <option value="\u0639\u0627\u0644\u064A\u0629">\u0639\u0627\u0644\u064A\u0629 \u0641\u0642\u0637</option>
                                <option value="\u0645\u062A\u0648\u0633\u0637\u0629">\u0645\u062A\u0648\u0633\u0637\u0629 \u0641\u0642\u0637</option>
                                <option value="\u0645\u0646\u062E\u0641\u0636\u0629">\u0645\u0646\u062E\u0641\u0636\u0629 \u0641\u0642\u0637</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:</label>
                            <select id="all-viol-status-select" class="form-input w-full text-sm">
                                <option value="">\u0627\u0644\u0643\u0644 (\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A)</option>
                                <option value="\u0645\u062D\u0644\u0648\u0644">\u0645\u062D\u0644\u0648\u0644 \u0641\u0642\u0637</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629">\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0641\u0642\u0637</option>
                                <option value="\u0645\u0641\u062A\u0648\u062D">\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644 / \u0645\u0641\u062A\u0648\u062D</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u064A\u063A\u0629 \u0627\u0644\u0625\u062E\u0631\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631:</label>
                        <div class="flex items-center gap-6">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-format" value="pdf" checked>
                                <span class="font-medium text-red-700"><i class="fas fa-file-pdf ml-1"></i>PDF \u0645\u0639\u062A\u0645\u062F ISO</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-format" value="excel">
                                <span class="font-medium text-green-700"><i class="fas fa-file-excel ml-1"></i>Excel (.xlsx)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-footer flex items-center justify-between p-4 bg-gray-50 border-t">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn-primary" id="all-viol-preview-btn" style="background: linear-gradient(135deg, #1e3a8a, #0f172a);">
                            <i class="fas fa-eye ml-1"></i>
                            \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629
                        </button>
                        <button type="button" class="btn-primary" id="all-viol-generate-btn" style="background: linear-gradient(135deg, #059669, #047857);">
                            <i class="fas fa-file-download ml-1"></i>
                            \u062A\u062D\u0645\u064A\u0644 \u0645\u0628\u0627\u0634\u0631
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(i);const s=()=>i.remove();i.querySelector(".modal-close")?.addEventListener("click",s),i.querySelector('[data-action="close"]')?.addEventListener("click",s),i.addEventListener("click",f=>{f.target===i&&s()});const n=i.querySelectorAll('input[name="all-viol-range-type"]'),r=i.querySelector("#all-viol-month-select"),l=i.querySelector("#all-viol-from-date"),c=i.querySelector("#all-viol-to-date"),d=()=>{const f=i.querySelector('input[name="all-viol-range-type"]:checked')?.value||"all";r.disabled=f!=="month",l.disabled=f!=="custom",c.disabled=f!=="custom"};n.forEach(f=>f.addEventListener("change",d));const p=async f=>{const m=i.querySelector("#all-viol-scope-select")?.value||"all",u=i.querySelector('input[name="all-viol-range-type"]:checked')?.value||"all",g=r?.value||"",v=l?.value||"",b=c?.value||"",k=i.querySelector("#all-viol-severity-select")?.value||"",V=i.querySelector("#all-viol-status-select")?.value||"",$=i.querySelector('input[name="all-viol-format"]:checked')?.value||"pdf";if(u==="custom"){if(!v||!b){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}if(new Date(v)>new Date(b)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}s(),await this.generateAllViolationsReport({personType:m,dateRangeType:u,month:g,fromDate:v,toDate:b,severity:k,status:V,exportFormat:$,directDownload:f})};i.querySelector("#all-viol-preview-btn")?.addEventListener("click",()=>p(!1)),i.querySelector("#all-viol-generate-btn")?.addEventListener("click",()=>p(!0))},async generateAllViolationsReport(e={}){const{personType:t="all",dateRangeType:i="all",month:o="",fromDate:a="",toDate:s="",severity:n="",status:r="",exportFormat:l="pdf",directDownload:c=!0}=e;try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0648\u062A\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A...");let d=(AppState.appData?.violations||[]).map(x=>this.normalizeViolationRecord(x)).filter(Boolean);t==="employee"?d=d.filter(x=>x.employeeName||x.personType==="employee"||!x.contractorName&&x.employeeName):t==="contractor"&&(d=d.filter(x=>x.contractorName||x.contractorCode||x.contractorId||x.personType==="contractor"));let p="\u0643\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629";if(i==="month"&&o){const[x,_]=o.split("-");d=d.filter(h=>{if(!h.violationDate)return!1;const U=new Date(h.violationDate);return U.getFullYear()===parseInt(x,10)&&U.getMonth()+1===parseInt(_,10)}),p=new Date(parseInt(x,10),parseInt(_,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else if(i==="custom"&&a&&s){const x=new Date(a);x.setHours(0,0,0,0);const _=new Date(s);_.setHours(23,59,59,999),d=d.filter(R=>{if(!R.violationDate)return!1;const h=new Date(R.violationDate);return h>=x&&h<=_}),p=`\u0645\u0646 ${Utils.formatDate(a)} \u0625\u0644\u0649 ${Utils.formatDate(s)}`}if(n&&(d=d.filter(x=>String(x.severity||"").trim()===n)),r&&(r==="\u0645\u0641\u062A\u0648\u062D"?d=d.filter(x=>String(x.status||"").trim()!=="\u0645\u062D\u0644\u0648\u0644"):d=d.filter(x=>String(x.status||"").trim()===r)),d.length===0){Loading.hide(),Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u062A\u0637\u0627\u0628\u0642 \u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}d.sort((x,_)=>new Date(_.violationDate||0)-new Date(x.violationDate||0));const f=t==="employee"?"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646":t==="contractor"?"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",m=`\u0633\u062C\u0644 ${f} \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D`;if(l==="excel"){this.exportAllViolationsToExcel_(d,f,p),Loading.hide();return}const u=d.length,g=d.filter(x=>String(x.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,v=d.filter(x=>String(x.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,b=d.filter(x=>String(x.severity||"").trim()==="\u0645\u0646\u062E\u0641\u0636\u0629").length,k=d.filter(x=>String(x.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,V=u-k,$=u>0?Math.round(k/u*100):0,E=d.reduce((x,_)=>x+(Number(this.getEffectiveFineAmount(_))||0),0),z=this._paginateViolationsList(d,8,11),I=z.length,P=z.map((x,_)=>{const R=_+1,h=R===1,U=R===I,T=x.map((q,J)=>{const N=(_===0?0:8+(_-1)*11)+J+1,et=q.personType==="contractor"||!!q.contractorName,dt=et?q.contractorName||q.contractorWorker||"\u0645\u0642\u0627\u0648\u0644":q.employeeName||"\u0645\u0648\u0638\u0641",lt=Number(this.getEffectiveFineAmount(q))||0;return`
                        <tr>
                            <td style="font-weight: 700;">${N}</td>
                            <td style="font-weight: 800; text-align: right;">
                                <i class="fas ${et?"fa-hard-hat text-amber-600":"fa-user-tie text-blue-600"} ml-1"></i>
                                ${Utils.escapeHTML(dt)}
                            </td>
                            <td style="font-size: 9.5px;">${et?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(q.violationLocation||"-")}</td>
                            <td style="font-weight: 700; text-align: right;">${Utils.escapeHTML(q.violationType||"-")}</td>
                            <td>${q.violationDate?Utils.formatDate(q.violationDate):"-"}</td>
                            <td>
                                <span style="font-weight: 800; color: ${q.severity==="\u0639\u0627\u0644\u064A\u0629"?"#b91c1c":q.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"};">
                                    ${Utils.escapeHTML(q.severity||"-")}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(lt)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(q.actionTaken||"-")}</td>
                            <td>
                                <span style="font-weight: 800; color: ${q.status==="\u0645\u062D\u0644\u0648\u0644"?"#047857":"#b91c1c"};">
                                    ${Utils.escapeHTML(q.status||"-")}
                                </span>
                            </td>
                        </tr>
                    `}).join("");return`
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(m,h?"\u0633\u062C\u0644 \u0631\u0633\u0645\u064A \u0645\u0648\u062B\u0642 \u0644\u062D\u0627\u0644\u0627\u062A \u0639\u062F\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629":`\u062A\u0627\u0628\u0639 \u062C\u062F\u0648\u0644 ${m} \u2014 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`,"DOC-HSE-VIO-REG-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

                        ${h?`
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border-right: 4px solid #ea580c; border-radius: 6px; padding: 6px 12px; margin-bottom: 10px; font-size: 11px;">
                                <div><strong style="color: #9a3412;">\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0648\u0627\u0644\u0641\u062A\u0631\u0629:</strong> <span style="color: #0f172a; font-weight: 700;">${Utils.escapeHTML(p)}</span></div>
                                <div><strong style="color: #9a3412;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${Utils.formatDate(new Date)}</div>
                            </div>

                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${u}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">\u0627\u0644\u0634\u062F\u0629 (\u0639\u0627\u0644\u064A\u0629 / \u0645\u062A\u0648\u0633\u0637\u0629 / \u0645\u0646\u062E\u0641\u0636\u0629)</div>
                                    <div class="kpi-card-value" style="color: #92400e; font-size: 15px;">${g} / ${v} / ${b}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                                    <div class="kpi-card-value" style="color: #065f46;">${$}% <small style="font-size: 11px; font-weight: 700;">(${k} \u0645\u062D\u0644\u0648\u0644 / ${V} \u0645\u0641\u062A\u0648\u062D)</small></div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a; font-size: 16px;">${this.formatFineAmount(E)}</div>
                                </div>
                            </div>
                        `:""}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 32px;">#</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641</th>
                                    <th style="width: 65px;">\u0627\u0644\u0635\u0641\u0629</th>
                                    <th>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                    <th style="width: 75px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th style="width: 60px;">\u0627\u0644\u0634\u062F\u0629</th>
                                    <th style="width: 85px;">\u0627\u0644\u063A\u0631\u0627\u0645\u0629</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630</th>
                                    <th style="width: 65px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${T}
                            </tbody>
                        </table>

                        ${U?`
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0631\u0635\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0648\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>
                                    <div class="sig-card-name">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</div>
                                    <div class="sig-card-name">\u0631\u0626\u064A\u0633 \u0642\u0633\u0645 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0633\u0645\u064A</div>
                                    <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                                    <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml("DOC-HSE-VIO-REG-01","Rev. 03","ISO 45001:2018 (Clause 9.1 & 10.2)")}
                        `:""}

                        <div class="page-counter-footer">\u0635\u0641\u062D\u0629 ${R} \u0645\u0646 ${I}</div>
                    </div>
                `}).join("");Loading.hide();const W=`${String(m).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;c?await this.downloadIsoReportAsPdf(m,P,W,!0):this.openIsoPrintWindow(m,P,!0,"",W)}catch(d){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",d),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+d.message)}},exportAllViolationsToExcel_(e,t="",i=""){if(typeof XLSX>"u")return Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629."),!1;if(!Array.isArray(e)||e.length===0)return Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627"),!1;const o=e.map((u,g)=>{const v=u.personType==="contractor"||!!u.contractorName,b=this.getPersonViolationHistory(u,u.id),k=b.totalCount===0?"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649":b.totalCount===1?"\u0645\u062E\u0627\u0644\u0641\u0629 \u062B\u0627\u0646\u064A\u0629 (\u0645\u0643\u0631\u0631)":`\u062A\u0643\u0631\u0627\u0631 \u062D\u0631\u062C (${b.totalCount+1} \u0645\u062E\u0627\u0644\u0641\u0627\u062A)`;return{"#":g+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641":u.employeeName||u.contractorWorker||u.contractorName||"",\u0627\u0644\u0635\u0641\u0629:v?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A / \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644":u.employeeCode||u.employeeNumber||u.contractorCode||u.contractorId||"","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u062C\u0647\u0629 \u0627\u0644\u0639\u0645\u0644":v?u.contractorName||"":u.employeeDepartment||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationType||"","\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)":u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationDate?Utils.formatDate(u.violationDate):"","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationTime||"","\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639":u.violationLocation||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationPlace||"","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629":u.severity||"","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629":Number(this.getEffectiveFineAmount(u))||0,"\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.status||"","\u0633\u062C\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631 (Strike)":k,"\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0634\u0647\u0631":u.violationSequenceInMonth||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630":u.actionTaken||"","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationDetails||""}}),a={};e.forEach(u=>{if(!(u.personType==="contractor"||!!u.contractorName))return;const v=String(u.contractorName||"\u0645\u0642\u0627\u0648\u0644 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();a[v]||(a[v]={name:v,total:0,high:0,medium:0,low:0,unresolved:0,resolved:0,fines:0,rcaCounts:{},typeCounts:{}});const b=a[v];b.total++;const k=String(u.severity||"").trim();k==="\u0639\u0627\u0644\u064A\u0629"?b.high++:k==="\u0645\u062A\u0648\u0633\u0637\u0629"?b.medium++:k==="\u0645\u0646\u062E\u0641\u0636\u0629"&&b.low++,String(u.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644"?b.resolved++:b.unresolved++,b.fines+=Number(this.getEffectiveFineAmount(u))||0;const $=String(u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();b.rcaCounts[$]=(b.rcaCounts[$]||0)+1;const E=String(u.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();b.typeCounts[E]=(b.typeCounts[E]||0)+1});const s=Object.values(a).sort((u,g)=>g.total-u.total||g.high-u.high).map((u,g)=>{const v=Object.entries(u.rcaCounts).sort(($,E)=>E[1]-$[1])[0]?.[0]||"\u2014",b=Object.entries(u.typeCounts).sort(($,E)=>E[1]-$[1])[0]?.[0]||"\u2014";let k="\u{1F7E2} \u0645\u0646\u062E\u0641\u0636";u.high>=2||u.total>=5?k="\u{1F6A8} \u062D\u0631\u062C":(u.high===1||u.total>=2)&&(k="\u26A0\uFE0F \u0645\u062A\u0648\u0633\u0637");const V=u.total>0?`${Math.round(u.resolved/u.total*100)}%`:"0%";return{"#":g+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":u.name,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A":u.total,"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629":u.high,"\u0645\u062A\u0648\u0633\u0637\u0629 \u0627\u0644\u0634\u062F\u0629":u.medium,"\u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u0634\u062F\u0629":u.low,"\u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u0644\u0648\u0644\u0629":u.unresolved,"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642":V,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A":u.fines,"\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A \u0627\u0644\u0634\u0627\u0626\u0639":v,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0643\u0631\u0627\u0631\u0627\u064B":b,"\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0637\u0631":k}}),n={};e.forEach(u=>{const g=String(u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();n[g]||(n[g]={category:g,count:0,high:0,resolved:0,unresolved:0,fines:0});const v=n[g];v.count++,String(u.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629"&&v.high++,String(u.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644"?v.resolved++:v.unresolved++,v.fines+=Number(this.getEffectiveFineAmount(u))||0});const r=e.length||1,l=Object.values(n).sort((u,g)=>g.count-u.count).map((u,g)=>({"#":g+1,"\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)":u.category,"\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A":u.count,"\u0627\u0644\u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0626\u0648\u064A\u0629":`${(u.count/r*100).toFixed(1)}%`,"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629":u.high,\u0645\u062D\u0644\u0648\u0644\u0629:u.resolved,"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629":u.unresolved,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629":u.fines})),c=XLSX.utils.book_new(),d=XLSX.utils.json_to_sheet(o);if(XLSX.utils.book_append_sheet(c,d,"\u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),s.length>0){const u=XLSX.utils.json_to_sheet(s);XLSX.utils.book_append_sheet(c,u,"\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}const p=XLSX.utils.json_to_sheet(l);XLSX.utils.book_append_sheet(c,p,"\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 RCA");const f=new Date().toISOString().slice(0,10),m=`\u0633\u062C\u0644_${t||"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"}_${f}.xlsx`;return XLSX.writeFile(c,m),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D (\u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 RCA)"),!0},exportCurrentFilteredViolationsToExcel(){const e=this.getFilteredViolations();if(!e||e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0623\u0648 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const t=document.querySelector(".tab-btn.active")?.dataset.tab||"all";let i="\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0639\u0627\u0645";t==="employees"?i="\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646":t==="contractors"&&(i="\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),this.exportAllViolationsToExcel_(e,i,"\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629")}};(function(){"use strict";try{typeof window<"u"&&typeof Violations<"u"&&(window.Violations=Violations,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Violations module loaded and available on window.Violations"))}catch{if(typeof window<"u"&&typeof Violations<"u")try{window.Violations=Violations}catch{}}})();
