const Violations={_t(e,t){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n.t(e,t):window.I18n&&typeof window.I18n.t=="function"?window.I18n.t(e,t):t},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const i=e||document.getElementById("viol-analytics-root");i&&(typeof t.applyI18n=="function"&&t.applyI18n(i),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(i))},currentFilters:{search:"",personType:"",violationType:"",severity:"",status:""},parseFineAmount(e){if(e==null||e==="")return 0;if(typeof e=="number")return Number.isFinite(e)&&e>=0?e:0;const t="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",i="\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",a=r=>String(r||"").replace(/[٠-٩۰-۹]/g,l=>{const c=t.indexOf(l);if(c>=0)return String(c);const d=i.indexOf(l);return d>=0?String(d):l}),o=String(e).trim(),n=a(o).replace(/[,\u066C]/g,"").replace(/\u066B/g,".").replace(/[^\d.\-]/g,""),s=Number(n);return Number.isFinite(s)&&s>=0?s:0},_VIOL_CURRENCY_KEY:"viol_currency",_VIOL_RATE_KEY:"viol_exchange_rate",_VIOL_DEFAULT_RATE:50,getCurrentCurrency(){try{return localStorage.getItem(this._VIOL_CURRENCY_KEY)==="USD"?"USD":"EGP"}catch{return"EGP"}},setCurrentCurrency(e){const t=e==="USD"?"USD":"EGP";try{localStorage.setItem(this._VIOL_CURRENCY_KEY,t)}catch{}return t},getExchangeRate(){try{const e=parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));return Number.isFinite(e)&&e>0?e:this._VIOL_DEFAULT_RATE}catch{return this._VIOL_DEFAULT_RATE}},setExchangeRate(e){const t=parseFloat(e);if(!Number.isFinite(t)||t<=0)return!1;try{localStorage.setItem(this._VIOL_RATE_KEY,String(t))}catch{}return!0},convertFineAmount(e,t){const i=t||this.getCurrentCurrency(),a=Number(e)||0;if(i==="USD"){const o=this.getExchangeRate();return o>0?a/o:0}return a},formatFineAmount(e,t={}){const i=t.currency||this.getCurrentCurrency(),a=i==="USD"?"$":"\u062C.\u0645",o=this.convertFineAmount(e,i),n=i==="USD"?o.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):o.toLocaleString("en-US",{maximumFractionDigits:0});return i==="USD"?`${n} $`:`${n} ${a}`},getCurrencyLabel(e="short"){return this.getCurrentCurrency()==="USD"?e==="long"?this._t("module.violations.analytics.currency.usd_long","\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A"):"$":e==="long"?this._t("module.violations.analytics.currency.egp_long","\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A"):this._t("module.violations.analytics.currency.egp_short","\u062C.\u0645")},normalizeViolationRecord(e){if(!e||typeof e!="object")return null;try{const t=e.fineAmount??e.defaultFineAmount??e.fine_amount??e.fine??e.amount??e["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629"]??e["\u0642\u064A\u0645\u0629 \u0645\u0627\u0644\u064A\u0629"]??0,i=this.parseFineAmount(t),a=e.personType||(e.contractorName?"contractor":"employee");let o="";try{typeof this.getResolvedViolationTime=="function"&&(o=this.getResolvedViolationTime(e))}catch{o=""}if(!o){let p=String(e.violationTime??e["\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"").trim();if(p&&p!=="\u2014"&&p!=="-"){const f=p.includes("1899-12-30")||p.includes("1899-12-31")||p.includes("1900-01-00"),m=p.match(/(?:T|\s|^)(\d{1,2}):(\d{2})/);if(m){const u=parseInt(m[1],10),v=parseInt(m[2],10);f&&(u===0||u===2||u===3)&&v===0||(o=`${String(u).padStart(2,"0")}:${String(v).padStart(2,"0")}`)}}}let n=String(e.contractorId||"").trim(),s=String(e.contractorCode||"").trim();(/^\d{4}-\d{2}-\d{2}/.test(n)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(n))&&(n=""),(/^\d{4}-\d{2}-\d{2}/.test(s)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s))&&(s="");let r=e.violationPlace??e["\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"";r&&(r=typeof this.formatLocationPlace=="function"?this.formatLocationPlace(r):String(r).replace(/\u0640+/g,"").replace(/_+/g," - ").trim());let l=e.violationLocation??e.\u0627\u0644\u0645\u0648\u0642\u0639??"";l&&(l=typeof this.formatLocationPlace=="function"?this.formatLocationPlace(l):String(l).replace(/\u0640+/g,"").replace(/_+/g," - ").trim());let c=String(e.violationTypeId||"").trim();if(/^VTYPE_/i.test(c)&&typeof this.getCleanViolationTypeCode=="function")try{c=this.getCleanViolationTypeCode(e)}catch{}let d=String(e.rootCause??e["\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A"]??e["\u0633\u0628\u0628 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??"").trim();return{...e,personType:a,fineAmount:i,violationTime:o,violationTypeId:c,contractorId:n,contractorCode:s,violationPlace:r||e.violationPlace,violationLocation:l||e.violationLocation,rootCause:d||e.rootCause||""}}catch{return e}},_escapeIdForHandler(e){return JSON.stringify(e==null?"":String(e))},getEffectiveFineAmount(e){const t=this.normalizeViolationRecord(e);if(!t)return 0;const i=this.parseFineAmount(t.fineAmount);if(i>0)return i;let a=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll&&(ViolationTypesManager.ensureInitialized(),a=ViolationTypesManager.getAll()||[])}catch{a=[]}!a.length&&typeof AppState<"u"&&Array.isArray(AppState?.appData?.violationTypes)&&(a=AppState.appData.violationTypes);const o=String(t.violationTypeId||"").trim(),n=String(t.violationType||"").trim().toLowerCase();let s=0;if(o){const r=a.find(l=>l&&String(l.id)===o);r&&(s=this.parseFineAmount(r.fineAmount))}if(s<=0&&n){const r=a.find(l=>l&&String(l.name||"").trim().toLowerCase()===n);r&&(s=this.parseFineAmount(r.fineAmount))}return s>0?s:i},_normKeyStr(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},sameViolationPersonForSequence(e,t){const i=this._normKeyStr(e.personType)||"employee",a=this._normKeyStr(t.personType)||"employee";if(i!==a)return!1;if(i==="contractor"){const l=this._normKeyStr(e.contractorWorker),c=this._normKeyStr(t.contractorWorker);if(l&&c&&l===c)return!0;const d=this._normKeyStr(e.contractorId),p=this._normKeyStr(t.contractorId);if(d&&p&&d===p)return!l&&!c?!0:!l||!c||l===c;const f=this._normKeyStr(e.contractorName),m=this._normKeyStr(t.contractorName);return!f||!m||f!==m?!1:!l&&!c?!0:l===c}const o=this._normKeyStr(e.employeeCode||e.employeeNumber),n=this._normKeyStr(t.employeeCode||t.employeeNumber);if(o&&n)return o===n;const s=this._normKeyStr(e.employeeName),r=this._normKeyStr(t.employeeName);return!!s&&s===r},getViolationYearMonthKey(e){const t=new Date(e);return isNaN(t.getTime())?null:t.getFullYear()*12+t.getMonth()},_recentViolationDupKeys:[],_violationSubmitLock:!1,_violationInflightDupKey:"",_violationDateKey(e){const t=e&&e.violationDate;if(t==null||t==="")return"";const i=String(t).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(i))return i;const a=new Date(i);if(!isNaN(a.getTime())){const n=a.getFullYear(),s=String(a.getMonth()+1).padStart(2,"0"),r=String(a.getDate()).padStart(2,"0");return`${n}-${s}-${r}`}const o=i.match(/^(\d{4}-\d{2}-\d{2})/);return o?o[1]:""},formatLocationPlace(e){if(!e)return"\u2014";let t=String(e).trim();return!t||t==="\u2014"||t==="-"?"\u2014":(t=t.replace(/\u0640+/g,""),t=t.replace(/[\u200B-\u200F\uFEFF]/g,""),t=t.replace(/_+/g," - "),t=t.replace(/\s*-\s*-\s*/g," - ").replace(/\s+/g," ").trim(),t||"\u2014")},getCleanContractorCode(e){if(!e)return"\u2014";let t=String(e.contractorCode||e.contractorId||"").trim();const i=/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{1,2}\/\d{1,2}\/\d{4}/.test(t);if(!t||i||t==="\u2014"||t==="-"){if(e.contractorName&&typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function")try{const a=Contractors.resolveContractorForAnalytics("",e.contractorName);if(a){const o=String(a.code||a.contractorCode||a.isoCode||a.id||"").trim();if(o&&!/^\d{4}-\d{2}-\d{2}/.test(o))return o}}catch{}if(e.contractorName&&typeof AppState<"u"&&Array.isArray(AppState.appData?.approvedContractors)){const a=String(e.contractorName).trim().toLowerCase(),o=AppState.appData.approvedContractors.find(n=>{const s=String(n.companyName||n.name||"").trim().toLowerCase();return s&&(s===a||s.includes(a)||a.includes(s))});if(o){const n=String(o.code||o.contractorCode||o.isoCode||o.id||"").trim();if(n&&!/^\d{4}-\d{2}-\d{2}/.test(n))return n}}return"\u2014"}return t},getResolvedViolationTime(e){if(!e)return"";try{const t=e.violationTime??e["\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??e.time;if(t!=null&&t!==""&&t!=="\u2014"&&t!=="-"){const s=String(t).trim();if(/^0\.\d+$/.test(s)){const l=parseFloat(s),c=Math.round(l*24*60),d=Math.floor(c/60),p=c%60;return`${String(d).padStart(2,"0")}:${String(p).padStart(2,"0")}`}const r=s.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);if(r){const l=s.includes("1899-12-30")||s.includes("1899-12-31")||s.includes("1900-01-00");let c=parseInt(r[1],10);const d=String(r[2]||"00").padStart(2,"0"),p=String(r[4]||"").toUpperCase();if(p==="PM"||p==="\u0645"?c<12&&(c+=12):(p==="AM"||p==="\u0635")&&c===12&&(c=0),!(l&&(c===0||c===2||c===3)&&(d==="00"||d==="0")))return`${String(c).padStart(2,"0")}:${d}`}}const i=e.violationDate??e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"]??e.date;if(i&&typeof i=="string"&&(i.includes("T")||i.includes(" "))){const s=new Date(i);if(!isNaN(s.getTime())){const r=s.getHours(),l=s.getMinutes(),c=s.getSeconds();if(!((r===0||r===2||r===3)&&l===0&&c===0)&&(r!==0||l!==0))return`${String(r).padStart(2,"0")}:${String(l).padStart(2,"0")}`}}const o=String(e.id||"").trim().match(/VIOLATION_(\d{13})_/);if(o){const s=parseInt(o[1],10);if(!isNaN(s)&&s>16e11){const r=new Date(s);if(!isNaN(r.getTime())){const l=r.getHours(),c=r.getMinutes();return`${String(l).padStart(2,"0")}:${String(c).padStart(2,"0")}`}}}const n=e.createdAt??e["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621"]??e.timestamp;if(n&&typeof n=="string"&&(n.includes("T")||n.includes(" "))){const s=new Date(n);if(!isNaN(s.getTime())){const r=s.getHours(),l=s.getMinutes(),c=s.getSeconds();if(!((r===0||r===2||r===3)&&l===0&&c===0)&&(r!==0||l!==0))return`${String(r).padStart(2,"0")}:${String(l).padStart(2,"0")}`}}return""}catch{return""}},getCleanViolationTypeCode(e){if(!e)return"\u2014";const t=String(e.violationTypeId||"").trim(),i=String(e.violationType||"").trim().toLowerCase();let a=[];try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.getAll&&(a=ViolationTypesManager.getAll()||[])}catch{}!a.length&&typeof AppState<"u"&&Array.isArray(AppState.appData?.violationTypes)&&(a=AppState.appData.violationTypes);const o=a.find(n=>t&&String(n.id).trim()===t||i&&String(n.name||"").trim().toLowerCase()===i);if(o){const n=o.code||o.isoCode||o.typeCode;let s="";if(n&&!n.startsWith("VTYPE_"))s=n;else{const r=a.findIndex(l=>l.id===o.id);s=`VT-${String(r>=0?r+1:1).padStart(2,"0")}`}return o.category?`${s} (${o.category})`:s}return/^VTYPE_/i.test(t)?"VT-01":t||"\u2014"},formatViolationTime(e){if(!e)return"";try{const t=String(e).trim();if(!t||t==="\u2014"||t==="-"||/^\d{4}-\d{2}-\d{2}$/.test(t)||/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t))return"";const i=t.includes("1899-12-30")||t.includes("1899-12-31")||t.includes("1900-01-00"),a=t.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);if(!a)return"";let o=parseInt(a[1],10);const n=String(a[2]||"00").padStart(2,"0"),s=String(a[4]||"").toUpperCase();if(i&&o===0&&(n==="00"||n==="0"))return"";s==="PM"||s==="\u0645"?o<12&&(o+=12):(s==="AM"||s==="\u0635")&&o===12&&(o=0);const r=o>=12?"\u0645":"\u0635";return`${o%12||12}:${n} ${r}`}catch{return""}},_violationTimeKey(e){const i=String(e&&e.violationTime||"").trim().match(/(\d{1,2}):(\d{2})/);if(i)return`${String(Number(i[1])).padStart(2,"0")}:${i[2]}`;const a=new Date(e&&e.violationDate);return isNaN(a.getTime())?"":`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`},_sameViolationTextField(e,t){const i=this._normKeyStr(e),a=this._normKeyStr(t);return!i&&!a?!0:!!i&&i===a},isDuplicateViolationRecord(e,t){if(!e||!t||!this.sameViolationPersonForSequence(e,t)||this._violationDateKey(e)!==this._violationDateKey(t)||this._violationTimeKey(e)!==this._violationTimeKey(t))return!1;const i=this._normKeyStr(e.violationTypeId||e.violationType),a=this._normKeyStr(t.violationTypeId||t.violationType);if(i!==a)return!1;const o=this._normKeyStr(e.violationLocationId),n=this._normKeyStr(t.violationLocationId);if(o&&n){if(o!==n)return!1}else if(!this._sameViolationTextField(e.violationLocation,t.violationLocation))return!1;const s=this._normKeyStr(e.violationPlaceId),r=this._normKeyStr(t.violationPlaceId);if(s&&r){if(s!==r)return!1}else if(!this._sameViolationTextField(e.violationPlace,t.violationPlace))return!1;return!0},_buildViolationDupKey(e){const t=this._normKeyStr(e&&e.personType)||"employee",i=t==="contractor"?`${this._normKeyStr(e.contractorName)}|${this._normKeyStr(e.contractorWorker)}`:this._normKeyStr(e&&(e.employeeCode||e.employeeNumber)||"");return[t,i,this._violationDateKey(e),this._violationTimeKey(e),this._normKeyStr(e&&(e.violationTypeId||e.violationType)||""),this._normKeyStr(e&&(e.violationLocationId||e.violationLocation)||""),this._normKeyStr(e&&(e.violationPlaceId||e.violationPlace)||""),this._normKeyStr(e&&e.violationDetails||"")].join("||")},_rememberViolationDupKey(e){Array.isArray(this._recentViolationDupKeys)||(this._recentViolationDupKeys=[]);const t=this._buildViolationDupKey(e);if(!t)return;const i=Date.now();this._recentViolationDupKeys=this._recentViolationDupKeys.filter(a=>a&&i-a.at<6e5),this._recentViolationDupKeys.some(a=>a.key===t)||this._recentViolationDupKeys.push({key:t,at:i})},findDuplicateViolation(e,t={}){if(!e)return null;const i=t.excludeId?String(t.excludeId):"",a=typeof AppState<"u"&&AppState.appData&&AppState.appData.violations||[];for(let r=0;r<a.length;r++){const l=a[r];if(l&&!(i&&String(l.id)===i)&&this.isDuplicateViolationRecord(e,l))return{source:"saved",record:l}}const o=this._violApprovalRequestsCache||[];for(let r=0;r<o.length;r++){const l=o[r];if(!l||String(l.status||"").toLowerCase()!=="pending")continue;const d=l.violationData||{};if(!(i&&(String(d.id||"")===i||String(l.originalViolationId||"")===i))&&this.isDuplicateViolationRecord(e,d))return{source:"pending",record:d,request:l}}const n=Date.now();Array.isArray(this._recentViolationDupKeys)||(this._recentViolationDupKeys=[]),this._recentViolationDupKeys=this._recentViolationDupKeys.filter(r=>r&&n-r.at<6e5);const s=this._buildViolationDupKey(e);return s&&this._violationInflightDupKey&&s===this._violationInflightDupKey?{source:"inflight"}:s&&this._recentViolationDupKeys.some(r=>r.key===s)?{source:"recent"}:null},_violApprovalSettingsCache:null,_violApprovalSettingsCacheAt:0,_violApprovalRequestsCache:null,_violApprovalRequestsCacheAt:0,_violApprovalRequestsCacheKey:"",async getViolationApprovalSettings(){const e=Date.now();if(this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5)return this._violApprovalSettingsCache;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const t=await GoogleIntegration.sendRequest({action:"getViolationApprovalSettings",data:{__timeoutMs:2e4}});if(t&&t.success&&t.data)return this._violApprovalSettingsCache={requireApproval:t.data.requireApproval===!0,defaultApprovers:Array.isArray(t.data.defaultApprovers)?t.data.defaultApprovers:[],bypassRoles:Array.isArray(t.data.bypassRoles)?t.data.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]},this._violApprovalSettingsCacheAt=e,this._violApprovalSettingsCache}}catch(t){AppState.debugMode&&Utils.safeWarn("getViolationApprovalSettings:",t)}return{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},isCurrentUserBypassApproval(e){try{if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin())return!0;const t=AppState.currentUser?.role||"";if(Array.isArray(e)&&e.length>0){const i=String(t).toLowerCase();return e.some(a=>String(a).toLowerCase()===i||String(a)===t)}}catch{}return!1},async checkViolationApprovalGate(e,t={}){const i=await this.getViolationApprovalSettings();return!i||!i.requireApproval?{requiresApproval:!1,settings:i}:this.isCurrentUserBypassApproval(i.bypassRoles)?{requiresApproval:!1,settings:i,bypassed:!0}:!Array.isArray(i.defaultApprovers)||i.defaultApprovers.length===0?(AppState.debugMode&&Utils.safeWarn("approval required but no approvers configured \u2014 allowing direct save"),{requiresApproval:!1,settings:i,reason:"no_approvers"}):{requiresApproval:!0,settings:i}},async submitViolationForApproval(e,t={}){try{const a=((await this.getViolationApprovalSettings()).defaultApprovers||[]).slice(),o=AppState.currentUser||{},n={requestType:t.isEdit?"update":"add",violationData:e,originalViolationId:t.originalId||"",approvers:a,createdBy:o.id||o.email||"",createdByName:o.name||o.email||"",notes:t.notes||""};return await GoogleIntegration.sendRequest({action:"addViolationApprovalRequest",data:{...n,__timeoutMs:3e4}})||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"}}catch(i){return{success:!1,message:i?.message||String(i)}}},async fetchViolationApprovalRequests(e={}){try{const t=await GoogleIntegration.sendRequest({action:"getAllViolationApprovalRequests",data:{...e,__timeoutMs:25e3}});return t&&t.success&&Array.isArray(t.data)?t.data:[]}catch(t){return AppState.debugMode&&Utils.safeWarn("fetchViolationApprovalRequests:",t),[]}},async approveViolationRequest(e,t={}){const i=AppState.currentUser||{},a={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const o=await GoogleIntegration.sendRequest({action:"approveViolationApprovalRequest",data:{requestId:e,approver:a,notes:t.notes||"",force:t.force===!0,__timeoutMs:3e4}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),o||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(o){return{success:!1,message:o?.message||String(o)}}},async rejectViolationRequest(e,t){const i=AppState.currentUser||{},a={userId:i.id||i.email||"",userName:i.name||"",userEmail:i.email||""};try{const o=await GoogleIntegration.sendRequest({action:"rejectViolationApprovalRequest",data:{requestId:e,approver:a,reason:String(t||"").trim(),__timeoutMs:3e4}});return this._invalidateViolationApprovalRequestsCache(),o||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(o){return{success:!1,message:o?.message||String(o)}}},async saveViolationApprovalSettings(e){const t=AppState.currentUser||{};try{const i=await GoogleIntegration.sendRequest({action:"updateViolationApprovalSettings",data:{requireApproval:e.requireApproval===!0,defaultApprovers:Array.isArray(e.defaultApprovers)?e.defaultApprovers:[],bypassRoles:Array.isArray(e.bypassRoles)?e.bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"],updatedBy:t.id||t.email||"",updatedByName:t.name||"",__timeoutMs:25e3}});return this._violApprovalSettingsCache=null,this._invalidateViolationApprovalRequestsCache(),i||{success:!1,message:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629"}}catch(i){return{success:!1,message:i?.message||String(i)}}},_getViolationApprovalRequestsCacheKey(e,t){return e?"admin":String(t?.email||t?.id||"user")},_getCachedViolationApprovalRequests(e,t){const i=this._getViolationApprovalRequestsCacheKey(e,t),a=Date.now();return this._violApprovalRequestsCache&&this._violApprovalRequestsCacheKey===i&&a-this._violApprovalRequestsCacheAt<12e4?this._violApprovalRequestsCache:null},_setCachedViolationApprovalRequests(e,t,i){this._violApprovalRequestsCache=Array.isArray(e)?e:[],this._violApprovalRequestsCacheKey=this._getViolationApprovalRequestsCacheKey(t,i),this._violApprovalRequestsCacheAt=Date.now()},_invalidateViolationApprovalRequestsCache(){this._violApprovalRequestsCache=null,this._violApprovalRequestsCacheAt=0,this._violApprovalRequestsCacheKey=""},_cloneViolationApprovalSettings(e){const t=e||{};return{requireApproval:t.requireApproval===!0,defaultApprovers:Array.isArray(t.defaultApprovers)?t.defaultApprovers.map(i=>({...i})):[],bypassRoles:Array.isArray(t.bypassRoles)?[...t.bypassRoles]:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_getViolationApprovalSettingsSnapshot(){const e=Date.now();return this._violApprovalSettingsCache&&e-this._violApprovalSettingsCacheAt<3e5?this._cloneViolationApprovalSettings(this._violApprovalSettingsCache):{requireApproval:!1,defaultApprovers:[],bypassRoles:["admin","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"]}},_prefetchViolationApprovalPanelData(){const e=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,t=AppState.currentUser||{},i={userEmail:e?"":t.email||"",userId:e?"":t.id||""};Promise.all([this.getViolationApprovalSettings(),this.fetchViolationApprovalRequests(i)]).then(([,a])=>{this._setCachedViolationApprovalRequests(a,e,t),this._updateViolationApprovalsHeaderBadge(a)}).catch(()=>{})},_updateViolationApprovalsHeaderBadge(e){const t=document.getElementById("viol-approvals-pending-badge");if(!t)return;const a=(Array.isArray(e)?e:this._violApprovalRequestsCache||[]).filter(o=>o&&String(o.status||"").toLowerCase()==="pending").length;a>0?(t.hidden=!1,t.textContent=String(a),t.setAttribute("aria-label",String(a))):(t.hidden=!0,t.textContent="")},_sameViolationApproverIdentity(e,t){const i=s=>String(s||"").trim().toLowerCase(),a=s=>[i(s?.userId),i(s?.id),i(s?.email),i(s?.userEmail)].filter(Boolean),o=a(e),n=a(t);return o.some(s=>n.includes(s))},_isCurrentViolationApprover(e){if(!e||String(e.status||"").toLowerCase()!=="pending")return!1;const t=Array.isArray(e.approvers)?e.approvers:[],i=parseInt(e.currentApproverIndex,10)||0,a=t[i];return a?this._sameViolationApproverIdentity(a,AppState.currentUser||{}):!1},_canActOnViolationApproval(e,t){return!!(e&&String(e.status||"").toLowerCase()==="pending"&&(t||this._isCurrentViolationApprover(e)))},_filterViolationApprovalRequests(e){const t=e&&e.filter||"pending",i=String(e&&e.query||"").trim().toLowerCase();let a=Array.isArray(e?.requests)?e.requests.slice():[];return t==="approved"?a=a.filter(o=>["approved","committed"].includes(String(o.status||"").toLowerCase())):t!=="all"&&(a=a.filter(o=>String(o.status||"").toLowerCase()===t)),i&&(a=a.filter(o=>{const n=o.violationData||{};return[o.id,o.createdByName,o.createdBy,n.employeeName,n.contractorName,n.contractorWorker,n.violationType,n.violationLocation,n.violationPlace,n.violationDetails].join(" ").toLowerCase().includes(i)})),a.sort((o,n)=>{const s=this._isCurrentViolationApprover(o)?0:1,r=this._isCurrentViolationApprover(n)?0:1;return s!==r?s-r:new Date(n.createdAt||0).getTime()-new Date(o.createdAt||0).getTime()}),a},_countViolationApprovalsByFilter(e,t){const i=Array.isArray(e)?e:[];return t==="all"?i.length:t==="approved"?i.filter(a=>["approved","committed"].includes(String(a.status||"").toLowerCase())).length:i.filter(a=>String(a.status||"").toLowerCase()===t).length},_ensureViolationApprovalsStyles(){if(document.getElementById("viol-approvals-ux-css"))return;const e=document.createElement("style");e.id="viol-approvals-ux-css",e.textContent=`
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
        `,document.head.appendChild(e)},_buildViolationApprovalsSettingsHtml(e,t,i){if(!t)return"";const a=(s,r)=>this._t(s,r),o=e||{requireApproval:!1,defaultApprovers:[]},n=Array.isArray(o.defaultApprovers)?o.defaultApprovers:[];return`
                    <div id="viol-approvals-settings-panel" class="vap-settings">
                        <h4 style="margin:0;font-size:1rem;font-weight:800;">${a("module.violations.approvals.settingsTitle","\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0648\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646")}</h4>
                        <p style="margin:6px 0 0;font-size:.82rem;color:#9a3412;line-height:1.5;">${a("module.violations.approvals.settingsLead","\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0647\u0648 \u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0627\u0644\u0645\u062F\u064A\u0631 \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638.")}</p>
                        <label class="vap-toggle">
                            <input type="checkbox" id="viol-require-approval" ${o.requireApproval?"checked":""}>
                            <span style="font-weight:700;">${a("module.violations.approvals.enable","\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0642\u0628\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")}</span>
                        </label>
                        <div style="font-weight:700;margin-bottom:8px;">${a("module.violations.approvals.approvers","\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u0639\u064A\u0651\u064E\u0646\u0648\u0646")}</div>
                        <div id="viol-approvers-list">
                            ${n.length?n.map((s,r)=>`
                                <div class="vap-approver-row" data-approver-idx="${r}">
                                    <span class="ord">${r+1}</span>
                                    <span style="flex:1;font-weight:650;">${Utils.escapeHTML(s.userName||s.userEmail||s.userId||"?")}</span>
                                    <button type="button" class="vap-icon-btn viol-approver-up" data-idx="${r}" title="${a("module.violations.approvals.moveUp","\u062A\u0642\u062F\u064A\u0645")}" ${r===0?"disabled":""}><i class="fas fa-arrow-up"></i></button>
                                    <button type="button" class="vap-icon-btn viol-approver-down" data-idx="${r}" title="${a("module.violations.approvals.moveDown","\u062A\u0623\u062E\u064A\u0631")}" ${r===n.length-1?"disabled":""}><i class="fas fa-arrow-down"></i></button>
                                    <button type="button" class="vap-icon-btn viol-remove-approver" data-idx="${r}" title="${a("module.violations.approvals.remove","\u0625\u0632\u0627\u0644\u0629")}" style="color:#b91c1c;"><i class="fas fa-times"></i></button>
                                </div>
                            `).join(""):`<div class="vap-empty" style="padding:16px;">${a("module.violations.approvals.noApprovers","\u0623\u0636\u0641 \u0645\u0639\u062A\u0645\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u062D\u062A\u0649 \u062A\u0639\u0645\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629")}</div>`}
                        </div>
                        <div style="display:flex;gap:8px;align-items:flex-end;margin-top:12px;flex-wrap:wrap;">
                            <div style="flex:1;min-width:200px;">
                                <label style="display:block;font-size:.8rem;margin-bottom:4px;">${a("module.violations.approvals.addApprover","\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u062A\u0645\u062F")}</label>
                                <select id="viol-add-approver-select" class="form-input" style="width:100%;padding:9px;border:1px solid #d1d5db;border-radius:10px;">
                                    <option value="">${a("module.violations.approvals.chooseUser","\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B")}</option>
                                    ${(i||[]).map(s=>`
                                        <option value="${Utils.escapeHTML(String(s.id||s.email||""))}"
                                                data-name="${Utils.escapeHTML(String(s.name||""))}"
                                                data-email="${Utils.escapeHTML(String(s.email||""))}"
                                                data-role="${Utils.escapeHTML(String(s.role||""))}">
                                            ${Utils.escapeHTML(s.name||s.email||s.id)} ${s.role?"("+Utils.escapeHTML(s.role)+")":""}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <button type="button" id="viol-add-approver-btn" class="vap-btn" style="background:#1e3a8a;color:#fff;">
                                <i class="fas fa-plus"></i> ${a("module.violations.approvals.add","\u0625\u0636\u0627\u0641\u0629")}
                            </button>
                        </div>
                        <div style="margin-top:14px;display:flex;justify-content:flex-end;">
                            <button type="button" id="viol-save-settings-btn" class="vap-btn vap-btn-ok">
                                <i class="fas fa-save"></i> ${a("module.violations.approvals.save","\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}
                            </button>
                        </div>
                    </div>`},_buildViolationApprovalsRequestsHtml(e){const t=(a,o)=>this._t(a,o);if(e.loading)return`<div class="vap-empty">
                <i class="fas fa-spinner fa-spin"></i>
                ${t("module.violations.approvals.loading","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A\u2026")}
            </div>`;const i=this._filterViolationApprovalRequests(e);return this._renderViolationApprovalRequests(i,{isAdmin:e.isAdmin})},_renderViolationApprovalFilterBar(e){const t=(o,n)=>this._t(o,n),i=e&&e.filter||"pending";return[["pending","module.violations.approvals.filter.pending","\u0645\u0639\u0644\u0651\u0642\u0629"],["approved","module.violations.approvals.filter.approved","\u0645\u0639\u062A\u0645\u062F\u0629"],["rejected","module.violations.approvals.filter.rejected","\u0645\u0631\u0641\u0648\u0636\u0629"],["all","module.violations.approvals.filter.all","\u0627\u0644\u0643\u0644"]].map(([o,n,s])=>{const r=this._countViolationApprovalsByFilter(e.requests,o);return`<button type="button" class="vap-chip viol-req-filter${i===o?" is-active viol-req-filter-active":""}" data-filter="${o}">
                ${t(n,s)}<span class="vap-n">${r}</span>
            </button>`}).join("")},_refreshViolationApprovalsModalBody(e,t,i={}){const a=this._countViolationApprovalsByFilter(t.requests,"pending"),o=e.querySelector("#viol-approval-pending-count");o&&(o.textContent=t.loading?"\u2026":String(a)),this._updateViolationApprovalsHeaderBadge(t.requests);const n=e.querySelector("#vap-filters");n&&(n.innerHTML=this._renderViolationApprovalFilterBar(t));const s=e.querySelector("#vap-mine-summary");if(s){const c=(t.requests||[]).filter(d=>this._isCurrentViolationApprover(d)).length;c>0&&(t.filter==="pending"||t.filter==="all")?(s.hidden=!1,s.innerHTML=`<i class="fas fa-bell"></i> \u0644\u062F\u064A\u0643 ${c} \u0637\u0644\u0628 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0643 \u2014 \u0638\u0627\u0647\u0631\u0629 \u0623\u0648\u0644\u0627\u064B \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629`):(s.hidden=!0,s.textContent="")}const r=e.querySelector("#vap-search-input");if(r&&r.value!==(t.query||"")&&(r.value=t.query||""),i.settings!==!1){const c=e.querySelector("#viol-approvals-settings-panel");if(c&&t.isAdmin){const d=document.createElement("div");d.innerHTML=this._buildViolationApprovalsSettingsHtml(t.settings,!0,t.allUsers);const p=d.firstElementChild;p&&c.replaceWith(p)}}const l=e.querySelector("#viol-approval-requests-list");l&&(l.innerHTML=this._buildViolationApprovalsRequestsHtml(t),this._wireViolationApprovalActions(e,t.isAdmin))},async _loadViolationApprovalsPanelData(e,t){try{const[i,a]=await Promise.all([this.fetchViolationApprovalRequests(t.filters),this.getViolationApprovalSettings()]);if(!e.isConnected)return;t.requests=Array.isArray(i)?i:[],t.settings=this._cloneViolationApprovalSettings(a),t.loading=!1,this._setCachedViolationApprovalRequests(t.requests,t.isAdmin,AppState.currentUser||{}),this._refreshViolationApprovalsModalBody(e,t)}catch(i){if(!e.isConnected)return;t.loading=!1;const a=e.querySelector("#viol-approval-requests-list");a&&(a.innerHTML=`<div class="vap-empty" style="color:#b91c1c;background:#fef2f2;">
                    <i class="fas fa-exclamation-circle"></i>
                    ${this._t("module.violations.approvals.loadError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u2014 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}
                    <div style="margin-top:12px;"><button type="button" class="vap-btn" id="vap-retry-load" style="background:#0f172a;color:#fff;">${this._t("module.violations.approvals.retry","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}</button></div>
                </div>`),AppState.debugMode&&Utils.safeWarn("_loadViolationApprovalsPanelData:",i)}},_bindViolationApprovalsModalEvents(e){if(e._violApprovalsEventsBound)return;e._violApprovalsEventsBound=!0;const t=()=>e._violApprovalState,i=(o,n)=>this._t(o,n),a=()=>{document.removeEventListener("keydown",e._vapEsc),e.remove()};e._vapEsc=o=>{if(o.key==="Escape"){const n=e.querySelector("#vap-reject-sheet");if(n&&!n.hidden){n.hidden=!0;return}a()}},document.addEventListener("keydown",e._vapEsc),e.addEventListener("click",o=>{if(o.target===e){a();return}if(o.target.closest("#viol-approvals-close")){a();return}const n=o.target.closest("[data-vap-tab]");if(n){const d=n.getAttribute("data-vap-tab");e.querySelectorAll("[data-vap-tab]").forEach(p=>p.classList.toggle("is-active",p===n)),e.querySelectorAll("[data-vap-pane]").forEach(p=>{p.hidden=p.getAttribute("data-vap-pane")!==d});return}if(o.target.closest("#vap-retry-load")){const d=t();if(!d)return;d.loading=!0,this._refreshViolationApprovalsModalBody(e,d),this._loadViolationApprovalsPanelData(e,d);return}const s=o.target.closest(".viol-approver-up");if(s){const d=parseInt(s.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d)||d<=0)return;const f=p.settings.defaultApprovers;[f[d-1],f[d]]=[f[d],f[d-1]],this._refreshViolationApprovalsModalBody(e,p);return}const r=o.target.closest(".viol-approver-down");if(r){const d=parseInt(r.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d))return;const f=p.settings.defaultApprovers;if(d>=f.length-1)return;[f[d+1],f[d]]=[f[d],f[d+1]],this._refreshViolationApprovalsModalBody(e,p);return}const l=o.target.closest(".viol-remove-approver");if(l){const d=parseInt(l.getAttribute("data-idx"),10),p=t();if(!p||isNaN(d))return;p.settings.defaultApprovers.splice(d,1),this._refreshViolationApprovalsModalBody(e,p);return}const c=o.target.closest(".viol-req-filter");if(c){const d=t();if(!d)return;d.filter=c.getAttribute("data-filter")||"pending",this._refreshViolationApprovalsModalBody(e,d,{settings:!1});return}if(o.target.closest("#viol-add-approver-btn")){const d=t();if(!d)return;const p=e.querySelector("#viol-add-approver-select"),f=p?.value;if(!f){Notification.warning(i("module.violations.approvals.pickUser","\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0623\u0648\u0644\u0627\u064B"));return}const m=p.options[p.selectedIndex],u={userId:f,userName:m?.dataset?.name||"",userEmail:m?.dataset?.email||"",role:m?.dataset?.role||""};if(d.settings.defaultApprovers.some(v=>v.userId===u.userId)){Notification.warning(i("module.violations.approvals.alreadyAdded","\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0636\u0627\u0641 \u0628\u0627\u0644\u0641\u0639\u0644"));return}d.settings.defaultApprovers.push(u),this._refreshViolationApprovalsModalBody(e,d);return}if(o.target.closest("#viol-save-settings-btn")){const d=t();if(!d)return;const p=o.target.closest("#viol-save-settings-btn");if(p.disabled)return;p.disabled=!0;const m={requireApproval:e.querySelector("#viol-require-approval")?.checked===!0,defaultApprovers:d.settings.defaultApprovers,bypassRoles:d.settings.bypassRoles};this.saveViolationApprovalSettings(m).then(u=>{p.disabled=!1,u&&u.success?(d.settings=this._cloneViolationApprovalSettings(m),Notification.success(i("module.violations.approvals.saved","\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D"))):Notification.error(u&&u.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A")}).catch(()=>{p.disabled=!1})}if(o.target.closest("#vap-reject-cancel")){const d=e.querySelector("#vap-reject-sheet");d&&(d.hidden=!0);return}}),e.addEventListener("input",o=>{if(o.target&&o.target.id==="vap-search-input"){const n=t();if(!n)return;n.query=o.target.value||"";const s=e.querySelector("#viol-approval-requests-list");s&&(s.innerHTML=this._buildViolationApprovalsRequestsHtml(n),this._wireViolationApprovalActions(e,n.isAdmin))}})},showViolationApprovalsManager(){this._ensureViolationApprovalsStyles();const e=(d,p)=>this._t(d,p),t=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,i=AppState.currentUser||{},a=(AppState.appData?.users||[]).filter(d=>d&&(d.email||d.id||d.name)),o={userEmail:t?"":i.email||"",userId:t?"":i.id||""},n=this._getCachedViolationApprovalRequests(t,i),s={settings:this._getViolationApprovalSettingsSnapshot(),requests:n||[],isAdmin:t,allUsers:a,filters:o,loading:!n,filter:"pending",query:""},r=document.getElementById("viol-approvals-manager-modal");r&&(r._vapEsc&&document.removeEventListener("keydown",r._vapEsc),r.remove());const l=document.createElement("div");l.id="viol-approvals-manager-modal",l.className="modal modal-open",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),l.setAttribute("aria-labelledby","vap-title"),l.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;";const c=s.loading?"\u2026":String(this._countViolationApprovalsByFilter(s.requests,"pending"));l.innerHTML=`
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
                            <div class="vap-filters" id="vap-filters">${this._renderViolationApprovalFilterBar(s)}</div>
                            <div class="vap-search">
                                <i class="fas fa-search"></i>
                                <input type="search" id="vap-search-input" placeholder="${e("module.violations.approvals.search","\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0646\u0648\u0639 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628\u2026")}" autocomplete="off">
                            </div>
                        </div>
                        <div id="vap-mine-summary" class="vap-summary" hidden></div>
                        <div id="viol-approval-requests-list">
                            ${this._buildViolationApprovalsRequestsHtml(s)}
                        </div>
                    </div>
                    ${t?`<div data-vap-pane="settings" hidden>${this._buildViolationApprovalsSettingsHtml(s.settings,t,a)}</div>`:""}
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
        `,document.body.appendChild(l),l._violApprovalState=s,l._violApprovalsEventsBound=!1,this._bindViolationApprovalsModalEvents(l),s.loading||this._wireViolationApprovalActions(l,t),this._loadViolationApprovalsPanelData(l,s)},_renderViolationApprovalRequests(e,t={}){const i=(a,o)=>this._t(a,o);return!e||e.length===0?`<div class="vap-empty">
                <i class="fas fa-inbox"></i>
                <div style="font-weight:800;color:#334155;">${i("module.violations.approvals.empty","\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628")}</div>
                <div style="margin-top:6px;font-size:.85rem;">${i("module.violations.approvals.emptyHint","\u0639\u0646\u062F \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0633\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0643.")}</div>
            </div>`:e.map(a=>{const o=a.violationData||{},n=o.employeeName||o.contractorWorker||o.contractorName||"\u2014",s=String(a.status||"").toLowerCase(),r=s==="rejected"?"vap-badge-no":s==="pending"?"vap-badge-pending":"vap-badge-ok",c=i("module.violations.approvals.status."+(s==="committed"?"committed":s==="approved"?"approved":s==="rejected"?"rejected":"pending"),s),d=a.createdAt?typeof Utils.formatDateTime=="function"?Utils.formatDateTime(a.createdAt):String(a.createdAt):"\u2014",p=Array.isArray(a.approvers)?a.approvers:[],f=parseInt(a.currentApproverIndex,10)||0,m=this._isCurrentViolationApprover(a),u=this._canActOnViolationApproval(a,t.isAdmin),v=String(o.violationDetails||"").trim(),y=v.length>140?v.slice(0,140)+"\u2026":v,b=p.length>0?`
                        <div style="font-size:.75rem;font-weight:700;color:#64748b;margin-bottom:6px;">${i("module.violations.approvals.circuit","\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</div>
                        <ol class="vap-steps">
                            ${p.map((A,B)=>{const T=!!A.approved,E=!T&&B===f&&s==="pending",R=T?"is-done":E?"is-current":"is-wait",D=T?i("module.violations.approvals.doneStep","\u062A\u0645"):E?m?i("module.violations.approvals.yourTurn","\u062F\u0648\u0631\u0643 \u0627\u0644\u0622\u0646"):i("module.violations.approvals.waiting","\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u0647"):i("module.violations.approvals.queued","\u0627\u0644\u062A\u0627\u0644\u064A");return`<li class="vap-step ${R}">
                                    <span class="vap-step-num">${T?"\u2713":B+1}</span>
                                    <span>${Utils.escapeHTML(A.userName||A.userEmail||"?")} \xB7 ${D}</span>
                                </li>`}).join("")}
                        </ol>
                    `:"";return`
                <article class="vap-card${m?" is-mine":""}" data-request-id="${Utils.escapeHTML(String(a.id))}">
                    ${m?`<div class="vap-mine-flag"><i class="fas fa-user-check"></i> ${i("module.violations.approvals.yourTurn","\u062F\u0648\u0631\u0643 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0639\u062A\u0645\u062F \u0623\u0648 \u0627\u0631\u0641\u0636")}</div>`:""}
                    <div class="vap-card-top">
                        <div>
                            <div class="vap-person">${Utils.escapeHTML(n)} \u2014 ${Utils.escapeHTML(o.violationType||"\u2014")}</div>
                            <div class="vap-meta">${i("module.violations.approvals.requestNo","\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628")}: ${Utils.escapeHTML(String(a.id))} \xB7 ${i("module.violations.approvals.createdAt","\u0623\u064F\u0646\u0634\u0626")}: ${d} \xB7 ${i("module.violations.approvals.createdBy","\u0628\u0648\u0627\u0633\u0637\u0629")}: ${Utils.escapeHTML(a.createdByName||a.createdBy||"\u2014")}</div>
                        </div>
                        <span class="vap-badge ${r}">${c}</span>
                    </div>
                    <div class="vap-grid">
                        <div><strong>${i("module.violations.approvals.site","\u0627\u0644\u0645\u0648\u0642\u0639")}:</strong> ${Utils.escapeHTML(o.violationLocation||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.place","\u0627\u0644\u0645\u0643\u0627\u0646")}:</strong> ${Utils.escapeHTML(o.violationPlace||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}:</strong> ${o.violationDate?new Date(o.violationDate).toLocaleDateString("ar-EG-u-nu-latn"):"\u2014"}</div>
                        <div><strong>${i("module.violations.approvals.time","\u0627\u0644\u0648\u0642\u062A")}:</strong> ${Utils.escapeHTML(o.violationTime||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.severity","\u0627\u0644\u0634\u062F\u0629")}:</strong> ${Utils.escapeHTML(o.severity||"\u2014")}</div>
                        <div><strong>${i("module.violations.approvals.fine","\u0627\u0644\u063A\u0631\u0627\u0645\u0629")}:</strong> ${o.fineAmount?Number(o.fineAmount).toLocaleString("en-US")+" \u062C.\u0645":"\u2014"}</div>
                    </div>
                    ${y?`<div style="font-size:.82rem;color:#475569;margin-bottom:10px;line-height:1.5;"><strong>${i("module.violations.approvals.details","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}:</strong> ${Utils.escapeHTML(y)}</div>`:""}
                    ${b}
                    ${a.rejectionReason?`<div style="background:#fef2f2;border-inline-start:3px solid #dc2626;padding:8px 10px;border-radius:8px;font-size:.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>${i("module.violations.approvals.rejectionReason","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636")}:</strong> ${Utils.escapeHTML(a.rejectionReason)}</div>`:""}
                    ${u?`
                        <div class="vap-actions">
                            <button type="button" class="vap-btn vap-btn-no viol-req-reject-btn" data-id="${Utils.escapeHTML(String(a.id))}">
                                <i class="fas fa-times"></i> ${i("module.violations.approvals.reject","\u0631\u0641\u0636")}
                            </button>
                            <button type="button" class="vap-btn vap-btn-ok viol-req-approve-btn" data-id="${Utils.escapeHTML(String(a.id))}">
                                <i class="fas fa-check"></i> ${i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F")}
                            </button>
                        </div>
                    `:""}
                </article>
            `}).join("")},_reloadViolationApprovalsInPlace(e){const t=e&&e._violApprovalState;if(t){this._invalidateViolationApprovalRequestsCache(),t.loading=!0,this._refreshViolationApprovalsModalBody(e,t,{settings:!1}),this._loadViolationApprovalsPanelData(e,t);try{this.load&&this.load()}catch{}}},_wireViolationApprovalActions(e,t){const i=(s,r)=>this._t(s,r),a=e.querySelector("#vap-reject-sheet"),o=e.querySelector("#vap-reject-reason"),n=e.querySelector("#vap-reject-confirm");e.querySelectorAll(".viol-req-approve-btn").forEach(s=>{s.addEventListener("click",async()=>{const r=s.getAttribute("data-id");if(!r)return;const c=(e._violApprovalState?.requests||[]).find(f=>String(f.id)===String(r)),d=!!(t&&c&&!this._isCurrentViolationApprover(c));s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin"></i> '+i("module.violations.approvals.approving","\u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u2026");const p=await this.approveViolationRequest(r,{force:d});p&&p.success?(Notification.success(p.message||i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F")),this._reloadViolationApprovalsInPlace(e)):(Notification.error(p&&p.message||"\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"),s.disabled=!1,s.innerHTML='<i class="fas fa-check"></i> '+i("module.violations.approvals.approve","\u0627\u0639\u062A\u0645\u0627\u062F"))})}),e.querySelectorAll(".viol-req-reject-btn").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-id");!r||!a||(a.hidden=!1,a.dataset.requestId=r,o&&(o.value="",setTimeout(()=>o.focus(),30)))})}),n&&!n.dataset.bound&&(n.dataset.bound="1",n.addEventListener("click",async()=>{const s=a&&a.dataset.requestId,r=String(o?.value||"").trim();if(!s)return;if(!r){Notification.warning(i("module.violations.approvals.rejectRequired","\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0625\u0644\u0632\u0627\u0645\u064A")),o?.focus();return}n.disabled=!0;const l=await this.rejectViolationRequest(s,r);n.disabled=!1,l&&l.success?(a&&(a.hidden=!0),Notification.success(l.message||i("module.violations.approvals.reject","\u0631\u0641\u0636")),this._reloadViolationApprovalsInPlace(e)):Notification.error(l&&l.message||"\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636")}))},countPriorViolationsSamePersonMonth(e,t){const i=this.getViolationYearMonthKey(e.violationDate);if(i==null)return 0;const a=AppState.appData.violations||[];let o=0;for(let n=0;n<a.length;n++){const s=a[n];!s||t&&String(s.id)===String(t)||this.getViolationYearMonthKey(s.violationDate)===i&&this.sameViolationPersonForSequence(e,s)&&o++}return o},getPersonViolationHistory(e,t=null){if(!e)return{totalCount:0,monthCount:0,nextSequence:1,strikeLevel:1,strikeBadgeText:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (Strike 1)",priorList:[],suggestedAction:"\u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u0639 \u0627\u0644\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631"};const i=AppState.appData?.violations||[],a=this.getViolationYearMonthKey(e.violationDate);let o=0,n=0;const s=[];for(let p=0;p<i.length;p++){const f=i[p];!f||t&&String(f.id)===String(t)||this.sameViolationPersonForSequence(e,f)&&(o++,a!=null&&this.getViolationYearMonthKey(f.violationDate)===a&&n++,s.push(f))}s.sort((p,f)=>new Date(f.violationDate||0)-new Date(p.violationDate||0));const r=o+1;let l=1,c="\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (Strike 1)",d="\u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u0639 \u0627\u0644\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631";return r===2?(l=2,c="\u0645\u0643\u0631\u0631 \u2014 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 2 (Strike 2)",d="\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0631\u0633\u0645\u064A \u0645\u0639 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062C\u0632\u0627\u0621 \u0648\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u0642\u0631\u0631\u0629"):r>=3&&(l=3,c=`\u062A\u0643\u0631\u0627\u0631 \u062D\u0631\u062C \u2014 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0631\u0642\u0645 ${r} (Strike 3+)`,d="\u062A\u0635\u0639\u064A\u062F \u0641\u0648\u0631\u064A \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0648\u0625\u0635\u062F\u0627\u0631 \u0623\u0645\u0631 \u0645\u0646\u0639 \u0648\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0645\u0646 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 (Ban Order)"),{totalCount:o,monthCount:n,nextSequence:r,strikeLevel:l,strikeBadgeText:c,priorList:s,suggestedAction:d}},refreshViolationSequenceBadgeInModal(e,t){const i=e&&e.querySelector?e.querySelector("#violation-sequence-info"):null;if(!i)return;const a=document.getElementById("violation-person-type")?.value,n=document.getElementById("violation-date")?.value||new Date().toISOString().slice(0,10);if(!a){i.innerHTML="",i.classList.add("hidden");return}const s={personType:a,violationDate:`${n}T12:00:00`};if(a==="employee"){if(s.employeeCode=document.getElementById("violation-employee-code")?.value.trim()||"",s.employeeName=document.getElementById("violation-person-name")?.value.trim()||"",!s.employeeCode&&!s.employeeName){i.innerHTML="",i.classList.add("hidden");return}}else{const f=document.getElementById("violation-contractor-select");if(s.contractorName=(f?.value||"").trim(),s.contractorWorker=document.getElementById("violation-contractor-worker")?.value.trim()||"",!s.contractorName&&!s.contractorWorker){i.innerHTML="",i.classList.add("hidden");return}}const r=this.getPersonViolationHistory(s,t),l=r.priorList[0],c=l?.violationType||"",d=(()=>{if(!l?.violationDate)return"";const f=new Date(l.violationDate);return isNaN(f.getTime())?String(l.violationDate).slice(0,10):`${f.getFullYear()}/${String(f.getMonth()+1).padStart(2,"0")}/${String(f.getDate()).padStart(2,"0")}`})();let p="";r.strikeLevel===1?(i.className="mt-3",p=`
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
            `),i.innerHTML=p,i.classList.remove("hidden")},getSystemDepartmentOptions(){try{if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartments=="function"){const o=DailyObservations.getDepartments();if(Array.isArray(o)&&o.length>0)return o}}catch{}const e=new Set,t=AppState.companySettings||{};return(Array.isArray(t.formDepartments)?t.formDepartments:typeof t.formDepartments=="string"?t.formDepartments.split(/\n|,/):[]).forEach(o=>{o&&String(o).trim()&&e.add(String(o).trim())}),(Array.isArray(t.departments)?t.departments:typeof t.departments=="string"?t.departments.split(/\n|,/):[]).forEach(o=>{o&&String(o).trim()&&e.add(String(o).trim())}),(AppState.appData?.departments||[]).forEach(o=>{const n=typeof o=="string"?o:o.name||o.departmentName||o.title||"";n&&typeof n=="string"&&n.trim()&&e.add(n.trim())}),e.size===0&&["\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0647\u0646\u062F\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0648\u0627\u0644\u0644\u0648\u062C\u0633\u062A\u064A\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629 \u0648\u0627\u0644\u0634\u0624\u0648\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u064A \u0648\u0627\u0644\u062D\u0631\u0627\u0633\u0627\u062A","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629"].forEach(o=>e.add(o)),Array.from(e).sort((o,n)=>o.localeCompare(n,"ar"))},checkLocationAreaViolations(e,t,i=null){if(!e&&!t)return null;const a=AppState.appData?.violations||[],o=String(e||"").trim().toLowerCase(),n=String(t||"").trim().toLowerCase(),s=a.filter(r=>{if(!r||i&&String(r.id)===String(i))return!1;const l=String(r.violationLocation||"").trim().toLowerCase(),c=String(r.violationPlace||"").trim().toLowerCase();return!!(n&&n!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"&&n!=="__custom__"&&(c===n||c&&(c.includes(n)||n.includes(c)))||!n&&o&&o!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"&&(l===o||l&&(l.includes(o)||o.includes(l))))});return s.length===0?null:(s.sort((r,l)=>new Date(l.violationDate||0)-new Date(r.violationDate||0)),{count:s.length,lastViolation:s[0],list:s})},refreshAreaHotspotInModal(e,t=null){if(!e)return;const i=e.querySelector("#violation-area-hotspot-container");if(!i)return;const a=e.querySelector("#violation-person-type")?.value,o=a==="contractor"?e.querySelector("#violation-contractor-location"):e.querySelector("#violation-employee-location"),n=a==="contractor"?e.querySelector("#violation-contractor-place"):e.querySelector("#violation-employee-place"),s=o?.options[o?.selectedIndex]?.text||o?.value||"",r=n?.options[n?.selectedIndex]?.text||n?.value||"";if(!s||s.includes("-- \u0627\u062E\u062A\u0631")||!r||r.includes("-- \u0627\u062E\u062A\u0631")||r==="__custom__"){i.innerHTML="",i.classList.add("hidden");return}const l=this.checkLocationAreaViolations(s,r,t);if(!l||l.count===0){i.innerHTML="",i.classList.add("hidden");return}const c=l.lastViolation,d=c?.violationDate?Utils.formatDate(c.violationDate):"",p=c?.violationType||"",f=c?.severity||"",m=f==="\u0639\u0627\u0644\u064A\u0629"?"#dc2626":f==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb";i.className="mt-3 p-3 rounded-xl border border-amber-300 shadow-sm",i.style.background="linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",i.innerHTML=`
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
        `,i.classList.remove("hidden")},getViolationSuggestionChips(e=""){const t=String(e||"").toLowerCase();let i=[];const a=["\u062A\u0648\u062C\u064A\u0647 \u0625\u0646\u0630\u0627\u0631 \u0648\u062A\u0646\u0628\u064A\u0647 \u0634\u0641\u0647\u064A \u0641\u0648\u0631\u064A \u0648\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0644 \u0628\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0625\u0635\u062F\u0627\u0631 \u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0631\u0633\u0645\u064A \u0623\u0648\u0644 \u0648\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0639\u062F\u0645 \u0627\u0644\u062A\u0643\u0631\u0627\u0631","\u0625\u0646\u0630\u0627\u0631 \u0643\u062A\u0627\u0628\u064A \u0646\u0647\u0627\u0626\u064A \u0645\u0639 \u0627\u0644\u062A\u0648\u0635\u064A\u0629 \u0628\u062A\u0637\u0628\u064A\u0642 \u062E\u0635\u0645 \u0645\u0627\u0644\u064A \u0648\u0641\u0642 \u0627\u0644\u0644\u0627\u0626\u062D\u0629","\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0639\u0645\u0644 \u0641\u0648\u0631\u0627\u064B \u0648\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0631 \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u0626\u0646\u0627\u0641","\u0633\u062D\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0648\u0625\u0644\u0632\u0627\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u062A\u0642\u062F\u064A\u0645 \u062E\u0637\u0629 \u0639\u0645\u0644 \u0622\u0645\u0646\u0629 \u0645\u0639\u062A\u0645\u062F\u0629","\u0627\u0633\u062A\u0628\u0639\u0627\u062F \u0641\u0648\u0631\u064A \u0644\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0633\u062D\u0628 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u062E\u0627\u0635 \u0628\u0647","\u0625\u0644\u0632\u0627\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0628\u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u062A\u0646\u0634\u064A\u0637\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (Toolbox Talk)"];return t.includes("\u0645\u0647\u0645\u0627\u062A")||t.includes("\u0648\u0642\u0627\u064A\u0629")||t.includes("ppe")?i=["\u0639\u062F\u0645 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0631\u062A\u062F\u0627\u0621 \u0627\u0644\u062E\u0648\u0630\u0629 \u0648\u062D\u0630\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0641\u064A \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062A\u0627\u062C","\u0627\u0644\u0639\u0645\u0644 \u0628\u0627\u0644\u0635\u0627\u0631\u0648\u062E / \u0627\u0644\u062A\u062C\u0644\u064A\u062E \u0628\u062F\u0648\u0646 \u0646\u0638\u0627\u0631\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0639\u064A\u0646 \u0623\u0648 \u0648\u0627\u0642\u064A \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0634\u0641\u0627\u0641","\u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u0643\u0645\u0627\u0645\u0629 \u0627\u0644\u062A\u0646\u0641\u0633 \u0627\u0644\u0648\u0627\u0642\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0628\u064A\u0626\u0629 \u0628\u0647\u0627 \u0623\u062A\u0631\u0628\u0629 \u0648\u0623\u0628\u062E\u0631\u0629","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0642\u0641\u0627\u0632\u0627\u062A \u062A\u0627\u0644\u0641\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0644\u0627\u0626\u0645\u0629 \u0644\u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u064A\u0629 \u0648\u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629"]:t.includes("\u0627\u0631\u062A\u0641\u0627\u0639")||t.includes("\u0633\u0642\u0627\u0644\u0629")||t.includes("\u0633\u0642\u0627\u0644\u0627\u062A")?i=["\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639 \u064A\u062A\u062C\u0627\u0648\u0632 1.8 \u0645\u062A\u0631 \u0628\u062F\u0648\u0646 \u0631\u0628\u0637 \u062D\u0632\u0627\u0645 \u0627\u0644\u0623\u0645\u0627\u0646 \u0628\u0646\u0642\u0637\u0629 \u062A\u062B\u0628\u064A\u062A \u0645\u0639\u062A\u0645\u062F\u0629","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0633\u0642\u0627\u0644\u0629 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629 \u0648\u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0643\u0627\u0631\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0623\u062E\u0636\u0631 (Scaffold Tag)","\u0639\u062F\u0645 \u062A\u0648\u0641\u064A\u0631 \u062D\u0628\u0644 \u0646\u062C\u0627\u0629 (Life Line) \u0623\u062B\u0646\u0627\u0621 \u062D\u0631\u0643\u0629 \u0627\u0644\u0641\u0646\u064A\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A","\u0627\u0644\u0635\u0639\u0648\u062F \u0639\u0644\u0649 \u0647\u064A\u0627\u0643\u0644 \u063A\u064A\u0631 \u0645\u062E\u0635\u0635\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u0644\u0627\u0644\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A"]:t.includes("\u062A\u062F\u062E\u064A\u0646")||t.includes("\u062D\u0631\u064A\u0642")||t.includes("\u0627\u0634\u062A\u0639\u0627\u0644")?i=["\u0627\u0644\u062A\u062F\u062E\u064A\u0646 \u062F\u0627\u062E\u0644 \u0645\u0646\u0637\u0642\u0629 \u0645\u062D\u0638\u0648\u0631\u0629 \u062A\u062D\u0648\u064A \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u0628\u062A\u0631\u0648\u0644\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644","\u062A\u0646\u0641\u064A\u0630 \u0623\u0639\u0645\u0627\u0644 \u0642\u0637\u0639 \u0648\u0644\u062D\u0627\u0645 \u0633\u0627\u062E\u0646 \u0628\u062F\u0648\u0646 \u0645\u0631\u0627\u0642\u0628 \u062D\u0631\u064A\u0642 (Fire Watcher) \u0648\u0637\u0641\u0627\u064A\u0629","\u0648\u0636\u0639 \u0639\u0648\u0627\u0626\u0642 \u0648\u0645\u0648\u0627\u062F \u062E\u0627\u0645 \u0623\u0645\u0627\u0645 \u0637\u0641\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0644\u0648\u062D\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u062A\u0639\u064A\u0642 \u0627\u0644\u0648\u0635\u0648\u0644","\u0639\u062F\u0645 \u0641\u062D\u0635 \u0635\u0644\u0627\u062D\u064A\u0629 \u0637\u0641\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0642\u0628\u0644 \u0628\u062F\u0621 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0633\u0627\u062E\u0646\u0629"]:t.includes("\u062A\u0635\u0631\u064A\u062D")||t.includes("ptw")||t.includes("\u0639\u0632\u0644")||t.includes("loto")?i=["\u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0628\u062F\u0648\u0646 \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0648\u062A\u0648\u0642\u064A\u0639 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (PTW) \u0627\u0644\u0645\u0637\u0644\u0648\u0628","\u062A\u062C\u0627\u0648\u0632 \u0648\u0642\u062A \u0627\u0646\u062A\u0647\u0627\u0621 \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u062F\u0648\u0646 \u0637\u0644\u0628 \u062A\u0645\u062F\u064A\u062F \u0631\u0633\u0645\u064A \u0645\u0646 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u0639\u062F\u0645 \u062A\u0637\u0628\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0632\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u062A\u0623\u0645\u064A\u0646 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u062E\u0637\u0631 \u0628\u0627\u0644\u0642\u0641\u0644 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0629 (LOTO)","\u062F\u062E\u0648\u0644 \u0645\u0643\u0627\u0646 \u0645\u063A\u0644\u0642 (Confined Space) \u0628\u062F\u0648\u0646 \u0642\u064A\u0627\u0633 \u0646\u0633\u0628\u0629 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646"]:i=["\u0633\u0648\u0621 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629 \u0648\u062A\u0631\u0627\u0643\u0645 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0645\u0645\u0627 \u064A\u0639\u064A\u0642 \u0645\u0645\u0631\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0629 \u0648\u0645\u062E\u0627\u0631\u062C \u0627\u0644\u0637\u0648\u0627\u0631\u0626","\u0642\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u062F\u0629 / \u0627\u0644\u0631\u0627\u0641\u0639\u0629 \u0627\u0644\u0634\u0648\u0643\u064A\u0629 \u0628\u0633\u0631\u0639\u0629 \u0632\u0627\u0626\u062F\u0629 \u0623\u0648 \u0628\u062F\u0648\u0646 \u062A\u0641\u0648\u064A\u0636 \u0631\u0633\u0645\u064A \u0645\u0639\u062A\u0645\u062F","\u062A\u062E\u0632\u064A\u0646 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0641\u064A \u0639\u0628\u0648\u0627\u062A \u063A\u064A\u0631 \u0645\u062E\u0635\u0635\u0629 \u0648\u0628\u062F\u0648\u0646 \u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u062A\u062D\u0630\u064A\u0631 (GHS)","\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0629 \u0623\u0648 \u0623\u062F\u0627\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0628\u0647\u0627 \u0623\u0633\u0644\u0627\u0643 \u0645\u0643\u0634\u0648\u0641\u0629 \u0648\u062F\u0648\u0646 \u062A\u0623\u0631\u064A\u0636 \u0645\u0646\u0627\u0633\u0628"],{detailsChips:i,actionChips:a}},_violationsImportNormalizeHeaderKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationsImportPick(e,t){const i={};Object.keys(e||{}).forEach(a=>{i[this._violationsImportNormalizeHeaderKey(a)]=e[a]});for(let a=0;a<t.length;a++){const o=this._violationsImportNormalizeHeaderKey(t[a]);if(i[o]!==void 0&&i[o]!==null&&String(i[o]).trim()!=="")return i[o]}return""},downloadViolationsImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u0648\u0642\u0639","\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u063A\u0631\u0627\u0645\u0629"],t=["\u0645\u0648\u0638\u0641","12345","","","","\u062A\u0623\u062E\u0631 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644","2026-05-01","08:30","\u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u062E\u0637 \u0627\u0644\u0625\u0646\u062A\u0627\u062C 1","\u0645\u062A\u0648\u0633\u0637\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629","\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631","\u0625\u0646\u0630\u0627\u0631 \u0634\u0641\u0647\u064A","100"],i=XLSX.utils.book_new(),a=XLSX.utils.aoa_to_sheet([e,t]);a["!cols"]=e.map(()=>({wch:18})),XLSX.utils.book_append_sheet(i,a,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const o=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],['\u2022 \u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635: \u0627\u0643\u062A\u0628 "\u0645\u0648\u0638\u0641" \u0623\u0648 "\u0645\u0642\u0627\u0648\u0644".'],["\u2022 \u0644\u0644\u0645\u0648\u0638\u0641: \u0639\u0628\u0651\u0626 \u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629."],["\u2022 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0639\u0628\u0651\u0626 \u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0648\u064A\u0645\u0643\u0646 \u062A\u0639\u0628\u0626\u0629 \u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644."],["\u2022 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0635\u064A\u063A\u0629 YYYY-MM-DD \u0623\u0648 \u062A\u0646\u0633\u064A\u0642 \u062A\u0627\u0631\u064A\u062E \u0625\u0643\u0633\u0644."]],n=XLSX.utils.aoa_to_sheet(o);XLSX.utils.book_append_sheet(i,n,"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(i,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},showViolationsImportModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
            </div>`,document.body.appendChild(e);let t=[];const i=e.querySelector("#violations-import-file"),a=e.querySelector("#violations-import-preview"),o=e.querySelector("#violations-import-confirm");e.querySelector("#violations-import-download-template")?.addEventListener("click",()=>this.downloadViolationsImportTemplate()),i?.addEventListener("change",async n=>{const s=n.target.files&&n.target.files[0];if(t=[],o.disabled=!0,a.classList.add("hidden"),!!s){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const r=await s.arrayBuffer(),l=XLSX.read(r,{type:"array"}),c=l.Sheets[l.SheetNames[0]],d=XLSX.utils.sheet_to_json(c,{defval:""});t=Array.isArray(d)?d:[],a.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xAB${Utils.escapeHTML(l.SheetNames[0]||"")}\xBB.</p>`,a.classList.remove("hidden"),o.disabled=t.length===0}catch(r){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",r),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(r.message||""))}}}),o?.addEventListener("click",async()=>{t.length&&(o.disabled=!0,await this.processViolationsImportRows(t,e))}),e.addEventListener("click",n=>{n.target===e&&e.remove()})},async processViolationsImportRows(e,t){let i=0,a=0;const o=[];Array.isArray(AppState.appData.violations)||(AppState.appData.violations=[]);let n=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),n=ViolationTypesManager.getAll()}catch{n=AppState.appData.violationTypes||[]}else n=AppState.appData.violationTypes||[];const s=new Map((n||[]).map(l=>[String(l.name||"").trim().toLowerCase(),l])),r=new Set;for(let l=0;l<e.length;l++){const c=e[l]||{},d=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim();d&&!s.has(d.toLowerCase())&&r.add(d)}if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.addType&&ViolationTypesManager.getTypeByName)try{ViolationTypesManager.ensureInitialized(),r.forEach(l=>{const c=l.toLowerCase();try{const d=ViolationTypesManager.addType({name:l,description:"",fineAmount:0});s.set(c,d)}catch{const p=ViolationTypesManager.getTypeByName(l);p&&s.set(c,p)}})}catch(l){Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641:",l)}for(let l=0;l<e.length;l++){const c=e[l]||{};try{const p=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0634\u062E\u0635","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635","personType","persontype"])||"").trim().toLowerCase(),f=p.includes("\u0645\u0642\u0627\u0648\u0644")||p==="contractor"?"contractor":"employee",m=String(this._violationsImportPick(c,["\u0627\u0644\u0643\u0648\u062F_\u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","employeeCode","employeenumber","employeeNumber"])||"").trim(),u=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641","employeeName"])||"").trim(),v=String(this._violationsImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorName"])||"").trim(),y=String(this._violationsImportPick(c,["\u0639\u0627\u0645\u0644_\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","contractorWorker"])||"").trim(),b=String(this._violationsImportPick(c,["\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationType"])||"").trim(),A=this._violationsImportPick(c,["\u062A\u0627\u0631\u064A\u062E_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationDate","date"]),B=String(this._violationsImportPick(c,["\u0648\u0642\u062A_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationTime","time"])||"08:00"),T=String(this._violationsImportPick(c,["\u0627\u0644\u0645\u0648\u0642\u0639","violationLocation","location"])||"").trim(),E=String(this._violationsImportPick(c,["\u0645\u0643\u0627\u0646_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","violationPlace","place"])||"").trim(),R=String(this._violationsImportPick(c,["\u0627\u0644\u0634\u062F\u0629","severity"])||"\u0645\u062A\u0648\u0633\u0637\u0629").trim(),D=String(this._violationsImportPick(c,["\u0627\u0644\u062D\u0627\u0644\u0629","status"])||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").trim(),N=String(this._violationsImportPick(c,["\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","violationDetails","details"])||"").trim(),K=String(this._violationsImportPick(c,["\u0627\u0644\u0627\u062C\u0631\u0627\u0621_\u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","actionTaken","action"])||"").trim(),S=this._violationsImportPick(c,["\u0627\u0644\u063A\u0631\u0627\u0645\u0629","fineAmount","fine"]);if(!b||!A){a++,o.push(`\u0635\u0641 ${l+2}: \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0646\u0627\u0642\u0635`);continue}if(f==="employee"&&!m){a++,o.push(`\u0635\u0641 ${l+2}: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641`);continue}if(f==="contractor"&&!v){a++,o.push(`\u0635\u0641 ${l+2}: \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0644\u0648\u0628`);continue}let M=A;if(typeof M=="number"&&typeof XLSX<"u"&&XLSX.SSF)try{const z=XLSX.SSF.parse_date_code(M);z&&(M=new Date(Date.UTC(z.y,z.m-1,z.d)).toISOString())}catch{}else if(typeof M=="string"&&/^\d{4}-\d{2}-\d{2}/.test(M.trim()))M=new Date(M.trim().slice(0,10)+"T12:00:00").toISOString();else{const z=new Date(M);M=isNaN(z.getTime())?new Date().toISOString():z.toISOString()}const q=s.get(b.toLowerCase()),h=q?String(q.id||""):"",U=this.parseFineAmount(S!==""&&S!==void 0?S:q?q.fineAmount:0),x={personType:f,violationDate:M,employeeCode:m,employeeNumber:m,employeeName:u,contractorName:v,contractorWorker:y},j=this.countPriorViolationsSamePersonMonth(x,null)+1,it={id:Utils.generateId("VIOLATION"),isoCode:typeof generateISOCode=="function"?generateISOCode("VIOL",AppState.appData.violations):"VIOL-"+Date.now()+"-"+l,personType:f,employeeId:f==="employee"?Utils.generateId("EMP"):"",employeeName:f==="employee"?u:"",employeeCode:f==="employee"?m:"",employeeNumber:f==="employee"?m:"",employeePosition:"",employeeDepartment:"",contractorId:"",contractorName:f==="contractor"?v:"",contractorWorker:f==="contractor"?y:"",contractorPosition:"",contractorDepartment:"",violationTypeId:h,violationType:b,fineAmount:U,violationDate:M,violationTime:B.length>=5?B.slice(0,5):"08:00",violationLocation:T,violationLocationId:T,violationPlace:E,violationPlaceId:E,violationDetails:N,severity:R||"\u0645\u062A\u0648\u0633\u0637\u0629",actionTaken:K,status:D||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",photo:"",violationSequenceInMonth:j,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.violations.push(this.normalizeViolationRecord(it)),i++}catch(d){a++,o.push(`\u0635\u0641 ${l+2}: ${d.message||d}`)}}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(GoogleIntegration.autoSave("Violations",AppState.appData.violations).catch(()=>{Notification.warning("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A \u0644\u0627\u062D\u0642\u0627\u064B.")}),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureViolationsTypeIds)try{ViolationTypesManager.ensureViolationsTypeIds()}catch{}t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${i} \u0645\u062E\u0627\u0644\u0641\u0629${a?` (\u062A\u062E\u0637\u064A ${a})`:""}.`),o.length&&o.length<=5?o.forEach(l=>Utils.safeWarn(l)):o.length&&Utils.safeWarn("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+o.slice(0,5).join(" | ")+" ..."),this.load()},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u"){const t=document.getElementById("violations-section");t&&(t.innerHTML=`
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
                `;return}if(AppState.appData||(AppState.appData={}),AppState.appData.violations||(AppState.appData.violations=[]),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized)try{ViolationTypesManager.ensureInitialized()}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 ViolationTypesManager:",c)}else(!AppState.appData.violationTypes||!Array.isArray(AppState.appData.violationTypes))&&(AppState.appData.violationTypes=[]);const t=Array.isArray(AppState.appData.violations)&&AppState.appData.violations.length>0,i=(()=>{try{return localStorage.getItem("violations_last_sync")}catch{return null}})(),a=i?Date.now()-parseInt(i,10):1/0,o=600*1e3,n=a>=o,s=typeof GoogleIntegration<"u"&&GoogleIntegration.readFromSheets,r=AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl;if(!t&&s&&r)try{await this.ensureViolationsCoreDataLoaded({force:!0})}catch{}else n&&t&&s&&r&&this.ensureViolationsCoreDataLoaded({force:!0}).then(()=>{try{const c=document.getElementById("violations-stats-cards");c&&(c.outerHTML=this.renderAllViolationsStats());const d=document.getElementById("violations-list");d&&(d.innerHTML=this.renderViolationsList());const p=document.getElementById("violations-filters-container");p&&(p.innerHTML=this.renderFilters()),this.bindFilters()}catch{}});const l=(c,d)=>this._t(c,d);e.innerHTML=`
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
            `}},async ensureViolationsCoreDataLoaded({force:e=!1}={}){return this._violationsCoreLoadPromise&&!e?this._violationsCoreLoadPromise:(this._violationsCoreLoadPromise=(async()=>{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl))return;const[i,a]=await Promise.all([GoogleIntegration.readFromSheets("Violations").catch(()=>null),GoogleIntegration.readFromSheets("ViolationTypes").catch(()=>null)]);if(Array.isArray(i)){const o=i.map(s=>this.normalizeViolationRecord(s)).filter(Boolean),n=Array.isArray(AppState.appData.violations)?AppState.appData.violations:[];if(o.length===0&&n.length>0)Utils.safeWarn(`\u26A0\uFE0F \u062A\u062C\u0627\u0647\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u0627\u0631\u063A\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 ${n.length} \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u062D\u0644\u064A\u0629`);else{const s=new Set(o.map(c=>c&&c.id).filter(Boolean)),r=Date.now()-300*1e3,l=n.filter(c=>!c||!c.id||s.has(c.id)?!1:new Date(c.createdAt||c.timestamp||0).getTime()>=r);AppState.appData.violations=l.length>0?[...l,...o]:o}}if(Array.isArray(a)){const o=Array.isArray(AppState.appData.violationTypes)?AppState.appData.violationTypes:[];if(a.length>0?AppState.appData.violationTypes=a:o.length===0&&(AppState.appData.violationTypes=[]),a.length>0||a.length===0&&o.length===0)try{AppState.syncMeta||(AppState.syncMeta={sheets:{},users:0,lastSyncTime:0,userEmail:null}),AppState.syncMeta.sheets||(AppState.syncMeta.sheets={}),AppState.syncMeta.sheets.ViolationTypes=Date.now()}catch{}}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized()}catch{}try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}})().finally(()=>{this._violationsCoreLoadPromise=null}),this._violationsCoreLoadPromise)},renderViolationsList(){try{const e=this.getFilteredViolations();return!e||e.length===0?`<div class="empty-state"><p class="text-gray-500">${this.hasActiveFilters()?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629"}</p></div>`:`
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
            `}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A renderViolationsList:",e),'<div class="empty-state"><p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'}},updateAllViolationsStats(){try{const e=document.getElementById("violations-stats-cards");if(!e)return;const t=document.createElement("div");t.innerHTML=this.renderAllViolationsStats();const i=t.querySelector("#violations-stats-cards");i&&e.replaceWith(i)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A:",e)}},renderAllViolationsStats(){const e=this.getFilteredViolations(),t=e.length,i=e.filter(n=>n&&(n.personType==="employee"||!!n.employeeName&&!n.contractorName)).length,a=e.filter(n=>n&&(n.personType==="contractor"||!!n.contractorName)).length,o=e.reduce((n,s)=>{const r=Number(s?.fineAmount||0);return n+(Number.isFinite(r)&&r>0?r:0)},0);return`
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
                            <p class="text-2xl font-bold text-green-700">${this.formatFineAmount(o)}</p>
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
        `},hasActiveFilters(){const e=this.currentFilters||{};return!!(e.search||e.personType||e.violationType||e.severity||e.status)},getViolationsPermissions(e=AppState.currentUser){if(!e)return{viewDepartmentOnly:!0,viewAll:!1};if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin(e))return{viewDepartmentOnly:!1,viewAll:!0};const t=e.permissions||{},i=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t):t,o=(i&&i.violationsPermissions||{})["violations-view-all"]===!0;return{viewDepartmentOnly:!o,viewAll:o}},isDepartmentMatch(e,t){if(!e||!t)return!1;const i=n=>String(n).trim().toLowerCase().replace(/^(إدارة|قسم)\s+/,"").replace(/\s+/g," "),a=i(e),o=i(t);return a===o||a.includes(o)||o.includes(a)},isViolationVisibleToCurrentUser(e){if(!e)return!1;const t=this.normalizeViolationRecord(e);if(!t)return!1;if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()||this.getViolationsPermissions().viewAll)return!0;if(t.personType==="employee"||!!String(t.employeeName||"").trim()){const o=String(AppState.currentUser?.department||"").trim();let n=String(t.employeeDepartment||"").trim();if(!n&&(t.employeeId||t.employeeCode||t.employeeName)){const s=AppState.appData?.employees||[],r=String(t.employeeId||t.employeeCode||t.employeeName).trim().toLowerCase(),l=s.find(c=>{if(!c)return!1;const d=String(c.id||c.employeeId||c.code||"").trim().toLowerCase(),p=String(c.name||c.employeeName||"").trim().toLowerCase();return d&&d===r||p&&p===r});l&&(n=String(l.department||l.section||"").trim())}return!o||!n?!1:this.isDepartmentMatch(o,n)}return!0},getFilteredViolations(){try{if(typeof AppState>"u"||!AppState.appData)return[];const e=(AppState.appData.violations||[]).map(l=>{const c=this.normalizeViolationRecord(l);if(!c)return null;const d=this.getEffectiveFineAmount(c);return d===c.fineAmount?c:{...c,fineAmount:d}}).filter(Boolean).filter(l=>this.isViolationVisibleToCurrentUser(l)),t=this.currentFilters||{},i=String(t.search||"").trim().toLowerCase(),a=t.personType||"",o=(t.violationType||"").toLowerCase(),n=t.severity||"",s=t.status||"";let r=[];if(i&&typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"){const l=[...AppState?.appData?.approvedContractors||[],...AppState?.appData?.contractors||[]].filter(Boolean),c=Utils.findApprovedContractorByTerm(i,l);r=(c.matches&&c.matches.length>0?c.matches:c.contractor?[c.contractor]:[]).map(p=>Utils.buildContractorIdentityMatcher(p,i))}return e.filter(l=>{if(!l||a==="employee"&&!l.employeeName&&l.personType!=="employee"||a==="contractor"&&!l.contractorName&&!l.contractorCode&&!l.contractorId&&l.personType!=="contractor"||o&&(l.violationType||"").trim().toLowerCase()!==o||n&&(l.severity||"")!==n||s&&(l.status||"")!==s)return!1;if(i){let c=!1;if(r.length>0&&r.some(d=>d.violationBelongsToContractor(l))&&(c=!0),c||(c=Object.values(l||{}).map(p=>String(p??"").toLowerCase()).join(" ").includes(i)),!c)return!1}return!0})}catch(e){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A getFilteredViolations:",e),[]}},renderFilters(e=null){const t=this.currentFilters||{};e!=null&&(t.personType=e);let i=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),i=ViolationTypesManager.getAll()}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",o),i=[]}else i=typeof AppState<"u"&&AppState?.appData?.violationTypes?AppState.appData.violationTypes:[];const a=i.map(o=>`
            <option value="${Utils.escapeHTML(o.name)}" ${t.violationType===o.name?"selected":""}>
                ${Utils.escapeHTML(o.name)}
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
        `},bindFilters(){const e=document.getElementById("violations-filter-search"),t=document.getElementById("violations-filter-person"),i=document.getElementById("violations-filter-type"),a=document.getElementById("violations-filter-severity"),o=document.getElementById("violations-filter-status"),n=document.getElementById("violations-filter-reset");e&&(e.value=this.currentFilters.search||"",e.oninput=()=>{this.currentFilters.search=e.value||"",this.refreshViolationsView({skipFilterRerender:!0})}),t&&(t.value=this.currentFilters.personType||"",t.onchange=()=>{this.currentFilters.personType=t.value,this.refreshViolationsView()}),i&&(i.value=this.currentFilters.violationType||"",i.onchange=()=>{this.currentFilters.violationType=i.value,this.refreshViolationsView()}),a&&(a.value=this.currentFilters.severity||"",a.onchange=()=>{this.currentFilters.severity=a.value,this.refreshViolationsView()}),o&&(o.value=this.currentFilters.status||"",o.onchange=()=>{this.currentFilters.status=o.value,this.refreshViolationsView()}),n&&(n.onclick=()=>{this.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""},this.refreshViolationsView()})},refreshViolationsView(e={}){const t=!!e.skipFilterRerender,i=document.getElementById("violations-list");if(i)switch(document.querySelector(".tab-btn.active")?.dataset.tab||"all"){case"employees":i.innerHTML=this.renderEmployeeViolationsList();break;case"contractors":i.innerHTML=this.renderContractorViolationsList();break;case"analytics":return;default:i.innerHTML=this.renderViolationsList()}const a=document.getElementById("violations-stats-cards");a&&(a.outerHTML=this.renderAllViolationsStats());const o=document.getElementById("violations-filters-container");if(o&&!t){const n=document.querySelector(".tab-btn.active")?.dataset.tab||"all",s=n==="employees"?"employee":n==="contractors"?"contractor":"";o.innerHTML=this.renderFilters(s)}t||this.bindFilters()},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-violation-btn");e&&e.addEventListener("click",()=>this.showViolationForm()),this.bindFilters()},100)},async switchTab(e){document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active"),o.dataset.tab===e&&o.classList.add("active"),o.style.flexShrink||(o.style.setProperty("flex-shrink","0","important"),o.style.setProperty("min-width","fit-content","important"),o.style.setProperty("white-space","nowrap","important"),o.style.setProperty("width","auto","important"),o.style.setProperty("max-width","none","important"))});const i=document.querySelector(".tabs-nav");i&&!i.style.flexWrap&&(i.style.setProperty("flex-wrap","nowrap","important"),i.style.setProperty("overflow-x","auto","important"),i.style.setProperty("overflow-y","visible","important"));const a=document.getElementById("violations-tab-content");if(a)switch(e){case"all":this.currentFilters.personType="",a.innerHTML=`
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
                `,this.bindFilters();break;case"employees":this.currentFilters.personType="employee",a.innerHTML=`
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
                `,this.bindFilters();break;case"contractors":this.currentFilters.personType="contractor",a.innerHTML=`
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
                `,this.bindFilters();break;case"analytics":a.innerHTML=this.renderAnalyticsTab(),setTimeout(()=>{this.updateViolationAnalytics(),this._vBindAnalyticsEvents()},80);break;case"blacklist":a.innerHTML=this.renderBlacklistTab(),this.setupBlacklistEventListeners(),this.loadBlacklistDataAsync().then(()=>{this.refreshBlacklistDisplay()}).catch(o=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",o)});break}},async switchTabAsync(e){try{await this.switchTab(e)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}},refreshModule(){const e=document.getElementById("violations-btn-refresh");if(e){e.disabled=!0;const i=e.querySelector("i.fa-sync-alt");i&&i.classList.add("fa-spin")}const t=typeof this.load=="function"?this.load():Promise.resolve();Promise.resolve(t).finally(()=>{const i=document.getElementById("violations-btn-refresh");if(i){i.disabled=!1;const a=i.querySelector("i.fa-sync-alt");a&&a.classList.remove("fa-spin")}})},renderEmployeeViolationsList(){const e=this.getFilteredViolations().filter(t=>t.employeeName||t.personType==="employee"||!t.contractorName&&t.employeeName);return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p></div>':`
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
        `},getContractorViolationsExportOptions(){const e=new Map,t=(i,a,o="")=>{const n=String(a||"").replace(/\s+/g," ").trim();if(!n)return;const s=this._normalizeContractorExportName(n);!s||e.has(s)||e.set(s,{id:String(i||o||n).trim(),name:n,code:String(o||"").trim()})};return typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function"?Contractors.getContractorOptionsForModules({includeSuppliers:!0,approvedOnly:!1}).forEach(i=>t(i.id,i.name,i.code)):((AppState.appData?.contractors||[]).forEach(i=>{t(i.id||i.contractorId,i.name||i.companyName,i.code||i.contractorCode||i.isoCode)}),(AppState.appData?.approvedContractors||[]).forEach(i=>{t(i.id||i.contractorId,i.companyName||i.name,i.code||i.contractorCode)})),(AppState.appData?.violations||[]).forEach(i=>{i?.contractorName&&t(i.contractorId,i.contractorName,i.contractorCode||i.code||i.isoCode)}),Array.from(e.values()).sort((i,a)=>i.name.localeCompare(a.name,"ar",{sensitivity:"base"}))},_normalizeContractorExportName(e){const t=String(e||"").replace(/\s+/g," ").trim();if(!t)return"";const i=t.indexOf(" - "),a=i>0?t.slice(0,i).trim():t;return this._normKeyStr(a)},_buildContractorExportMatcher(e="",t="",i=""){const a=String(e||"").trim(),o=String(t||"").trim(),n=String(i||"").trim();if(!a&&!o&&!n)return null;let s=null;typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"&&(s=Contractors.resolveContractorForAnalytics(a||n,o));const r=a||n||o,l=s||{id:a,name:o,companyName:o,code:n,contractorCode:n};if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(l,r);if(typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function")return Contractors.buildContractorAnalyticsMatchers(l,r);const c=this._normalizeContractorExportName(o||a),d=new Set([a,n].filter(Boolean).map(p=>String(p).trim().toLowerCase()));return{violationBelongsToContractor:p=>{if(!p||!(p.personType==="contractor"||!!String(p.contractorName||"").trim()))return!1;const m=this._normalizeContractorExportName(p.contractorName),u=String(p.contractorId||p.contractorCode||p.code||"").trim().toLowerCase();return u&&d.has(u)?!0:!!c&&m===c}}},showContractorViolationsReportDialog(){const e=this.getContractorViolationsExportOptions(),t=new Date,i=t.getFullYear(),a=[];for(let p=0;p<24;p++){const f=new Date(i,t.getMonth()-p,1),m=f.getFullYear(),u=f.getMonth()+1,v=`${m}-${String(u).padStart(2,"0")}`,y=f.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});a.push({value:v,label:y})}const o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
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
        `,document.body.appendChild(o);const n=()=>o.remove();o.querySelector(".modal-close")?.addEventListener("click",n),o.querySelector('[data-action="close"]')?.addEventListener("click",n),o.addEventListener("click",p=>{p.target===o&&n()});const s=o.querySelectorAll('input[name="contractor-violations-range-type"]'),r=o.querySelector("#contractor-violations-report-month"),l=o.querySelector("#contractor-violations-report-from-date"),c=o.querySelector("#contractor-violations-report-to-date"),d=()=>{const p=o.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all";r.disabled=p!=="month",r.required=p==="month",l.disabled=p!=="custom",l.required=p==="custom",c.disabled=p!=="custom",c.required=p==="custom"};s.forEach(p=>p.addEventListener("change",d)),o.querySelector("#generate-contractor-violations-report-btn")?.addEventListener("click",async()=>{const p=o.querySelector("#contractor-violations-report-select"),f=p&&p.selectedIndex>=0?p.options[p.selectedIndex]:null,m=p?.selectedIndex===0,u=!m&&f?.value?String(f.value).trim():"",v=!m&&f?.dataset?.contractorName?String(f.dataset.contractorName).trim():"",y=!m&&f?.dataset?.contractorCode?String(f.dataset.contractorCode).trim():"",b=o.querySelector('input[name="contractor-violations-range-type"]:checked')?.value||"all",A=o.querySelector("#contractor-violations-report-month")?.value||"",B=o.querySelector("#contractor-violations-report-from-date")?.value||"",T=o.querySelector("#contractor-violations-report-to-date")?.value||"",E=o.querySelector('input[name="contractor-violations-export-format"]:checked')?.value||"pdf";if(b==="month"&&!A){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(b==="custom"){if(!B||!T){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(B)>new Date(T)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}n(),await this.generateContractorViolationsReport(u,{dateRangeType:b,month:A,fromDate:B,toDate:T,exportFormat:E},v,y)})},_collectContractorViolationsForExport_(e="",t={},i="",a=""){const o=this._buildContractorExportMatcher(e,i,a);let n=(AppState.appData.violations||[]).map(p=>this.normalizeViolationRecord(p)).filter(Boolean).filter(p=>p?.personType==="contractor"||!!String(p?.contractorName||"").trim());o&&(n=n.filter(p=>o.violationBelongsToContractor(p)));const{dateRangeType:s="all",month:r="",fromDate:l="",toDate:c=""}=t||{};if(s==="month"&&r){const[p,f]=r.split("-");n=n.filter(m=>{if(!m.violationDate)return!1;const u=new Date(m.violationDate);return u.getFullYear()===parseInt(p,10)&&u.getMonth()+1===parseInt(f,10)})}else if(s==="custom"&&l&&c){const p=new Date(l);p.setHours(0,0,0,0);const f=new Date(c);f.setHours(23,59,59,999),n=n.filter(m=>{if(!m.violationDate)return!1;const u=new Date(m.violationDate);return u>=p&&u<=f})}let d="";if(s==="month"&&r){const[p,f]=r.split("-");d=new Date(parseInt(p,10),parseInt(f,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else s==="custom"&&l&&c&&(d=`\u0645\u0646 ${Utils.formatDate(l)} \u0625\u0644\u0649 ${Utils.formatDate(c)}`);return{violations:n,periodInfo:d,dateRangeType:s}},exportContractorViolationsToExcel_(e,t="",i=""){if(typeof XLSX>"u")return Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),!1;const a=e.map((c,d)=>({"#":d+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorName||"","\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorCode||"","\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":c.contractorWorker||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":c.violationType||"",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:c.violationDate?Utils.formatDate(c.violationDate):"",\u0627\u0644\u0634\u062F\u0629:c.severity||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630":c.actionTaken||"",\u0627\u0644\u062D\u0627\u0644\u0629:c.status||"","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629":Number(this.getEffectiveFineAmount(c))||0,\u0627\u0644\u0645\u0648\u0642\u0639:c.location||c.site||"",\u0627\u0644\u0648\u0635\u0641:c.description||c.notes||"",\u0627\u0644\u0641\u062A\u0631\u0629:i||""})),o=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(a);n["!cols"]=[{wch:6},{wch:28},{wch:14},{wch:18},{wch:22},{wch:14},{wch:12},{wch:24},{wch:12},{wch:14},{wch:18},{wch:36},{wch:22}],XLSX.utils.book_append_sheet(o,n,"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");const s=t?`\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644_${t}`:"\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",l=`${String(s).replace(/[\\/:*?"<>|]/g,"_").slice(0,80)}_${new Date().toISOString().slice(0,10)}.xlsx`;return XLSX.writeFile(o,l),!0},async generateContractorViolationsReport(e="",t={},i="",a=""){const o=String(t?.exportFormat||"pdf").toLowerCase()==="excel"?"excel":"pdf",{violations:n,periodInfo:s}=this._collectContractorViolationsForExport_(e,t,i,a);if(!n.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0641\u0642 \u0627\u0644\u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}if(o==="excel"){try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646...");const r=this.exportContractorViolationsToExcel_(n,i,s);Loading.hide(),r&&Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 Excel \u0628\u0646\u062C\u0627\u062D")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 Excel: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (ISO 45001)...");const r=n.filter(T=>String(T.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,l=n.filter(T=>String(T.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,c=n.filter(T=>String(T.severity||"").trim()==="\u0645\u0646\u062E\u0641\u0636\u0629").length,d=n.filter(T=>String(T.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,p=Math.max(0,n.length-d),f=n.length>0?Math.round(d/n.length*100):0,m=new Set(n.map(T=>String(T.contractorName||"").trim()).filter(Boolean)).size,u=n.reduce((T,E)=>T+(Number(this.getEffectiveFineAmount(E))||0),0),v=i?`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${i}`:"\u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A \u0627\u0644\u0634\u0631\u0643\u0629",y=this._paginateViolationsList(n,8,11),b=y.length,A=y.map((T,E)=>{const R=E+1,D=R===1,N=R===b,K=T.map((S,M)=>{const q=(E===0?0:8+(E-1)*11)+M+1,h=Number(this.getEffectiveFineAmount(S))||0;return`
                        <tr>
                            <td style="font-weight: 700;">${q}</td>
                            <td style="font-weight: 800; text-align: right;">${Utils.escapeHTML(S.contractorName||"-")}</td>
                            <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(S.violationType||"-")}</td>
                            <td>${S.violationDate?Utils.formatDate(S.violationDate):"-"}</td>
                            <td>
                                <span style="font-weight: 800; color: ${S.severity==="\u0639\u0627\u0644\u064A\u0629"?"#b91c1c":S.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"};">
                                    ${Utils.escapeHTML(S.severity||"-")}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(h)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(S.actionTaken||"-")}</td>
                            <td>
                                <span style="font-weight: 800; color: ${S.status==="\u0645\u062D\u0644\u0648\u0644"?"#047857":"#b91c1c"};">
                                    ${Utils.escapeHTML(S.status||"-")}
                                </span>
                            </td>
                        </tr>
                    `}).join("");return`
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(v,D?"\u0633\u062C\u0644 \u0631\u0633\u0645\u064A \u0645\u0648\u062B\u0642 \u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629":`\u062A\u0627\u0628\u0639 \u062C\u062F\u0648\u0644 ${v} \u2014 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`,"DOC-HSE-VIO-CON-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

                        ${D?`
                            ${s?`
                                <div style="display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border-right: 4px solid #ea580c; border-radius: 6px; padding: 6px 12px; margin-bottom: 10px; font-size: 11px;">
                                    <div><strong style="color: #9a3412;">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629:</strong> <span style="color: #0f172a; font-weight: 700;">${Utils.escapeHTML(s)}</span></div>
                                    <div><strong style="color: #9a3412;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062E\u0631\u0627\u062C:</strong> ${Utils.formatDate(new Date)}</div>
                                </div>
                            `:""}

                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${n.length}</div>
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
                                ${K}
                            </tbody>
                        </table>

                        ${N?`
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

                        <div class="page-counter-footer">\u0635\u0641\u062D\u0629 ${R} \u0645\u0646 ${b}</div>
                    </div>
                `}).join("");Loading.hide();const B=`${String(v).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(v,A,B,!0)}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async deleteViolation(e){if(!e){typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F","error");return}const t=(AppState.appData?.violations||[]).find(i=>i.id===e);if(t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"?Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649"):typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649","error");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.")){typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");try{const i=(AppState.appData?.violations||[]).find(c=>c.id===e),a=i?.contractorId||"",o=i?.contractorName||"",n=i?.employeeId||"",s=i?.employeeCode||i?.employeeNumber||"",r=i?.employeeName||"";let l;if(typeof GoogleIntegration<"u"&&GoogleIntegration.callBackend)l=await GoogleIntegration.callBackend("deleteViolationFromSheet",{id:e});else throw new Error("\u062E\u062F\u0645\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");if(l&&l.success){AppState.appData&&AppState.appData.violations&&(AppState.appData.violations=AppState.appData.violations.filter(c=>c.id!==e)),(a||o)&&(AppState.appData?.contractors||[]).forEach(d=>{d&&(d.id===a||d.name===o||d.contractorName===o)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),(n||s||r)&&(AppState.appData?.employees||[]).forEach(d=>{d&&(d.id===n||d.employeeNumber===s||d.employeeCode===s||d.name===r)&&(Array.isArray(d.violations)&&(d.violations=d.violations.filter(p=>p.id!==e)),d.violationIds&&Array.isArray(d.violationIds)&&(d.violationIds=d.violationIds.filter(p=>p!==e)))}),typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{this.updateAllViolationsStats()}catch{}if(this.refreshViolationsView(),typeof Contractors<"u"&&Contractors.load)try{(AppState?.currentSection||"")==="contractors"&&!Contractors._isLoading&&Contractors.load()}catch{}if(typeof Employees<"u"&&Employees.loadEmployeesList)try{(AppState?.currentSection||"")==="employees"&&Employees.loadEmployeesList()}catch{}typeof Utils<"u"&&Utils.showToast&&Utils.showToast("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629","success")}else throw new Error(l?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(i){typeof Utils<"u"&&Utils.showToast?Utils.showToast("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message,"error"):alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+i.message)}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},renderAnalyticsTab(){this._vEnsureChartJS().catch(()=>{});const e=(i,a)=>this._t(i,a),t=this.getCurrentCurrency();return`
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
                        ${["30","90","180","365","0"].map((i,a)=>{const o=[e("module.violations.analytics.period.30d","30 \u064A\u0648\u0645"),e("module.violations.analytics.period.3m","3 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.6m","6 \u0623\u0634\u0647\u0631"),e("module.violations.analytics.period.1y","\u0633\u0646\u0629"),e("module.violations.analytics.period.all","\u0627\u0644\u0643\u0644")],n=(this._violPeriod||"0")===i;return`<button class="viol-period-btn" data-period="${i}" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;transition:all .2s;background:${n?"#fff":"rgba(255,255,255,0.18)"};color:${n?"#991b1b":"#fff"};">${o[a]}</button>`}).join("")}
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
        </div>`},async updateViolationAnalytics(){const e=document.getElementById("viol-analytics-root");if(!e)return;const t=(h,U)=>this._t(h,U),a=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",o=parseInt(this._violPeriod||"0",10),s=(AppState.appData.violations||[]).map(h=>this.normalizeViolationRecord(h)).filter(h=>h&&this.isViolationVisibleToCurrentUser(h)),r=this._vFilterByPeriod(s,o);this._vPopulateFilters(r);const l=this._vApplyFilters(r),c=l.length,d=document.getElementById("viol-filter-count");d&&(d.textContent=`${c} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const p=l.filter(h=>h.personType==="employee"),f=l.filter(h=>h.personType==="contractor"),m=l.filter(h=>h.severity==="\u0639\u0627\u0644\u064A\u0629").length,u=l.filter(h=>h.status==="\u0645\u062D\u0644\u0648\u0644").length,v=l.filter(h=>h.status==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644").length,y=l.filter(h=>h.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629").length,b=c>0?Math.round(u/c*100):0,A=l.reduce((h,U)=>h+(Number(U.fineAmount)||0),0),B=l.filter(h=>{if(!h.violationDate)return!1;const U=new Date(h.violationDate),x=new Date;return U.getFullYear()===x.getFullYear()&&U.getMonth()===x.getMonth()}).length,T=document.getElementById("viol-kpi-strip");if(T){const h=[{id:"total",label:t("module.violations.analytics.kpi.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),value:c.toLocaleString("en-US"),icon:"fas fa-exclamation-circle",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{id:"employees",label:t("module.violations.analytics.kpi.employees","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),value:p.length.toLocaleString("en-US"),icon:"fas fa-user-tie",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{id:"contractors",label:t("module.violations.analytics.kpi.contractors","\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),value:f.length.toLocaleString("en-US"),icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{id:"highSev",label:t("module.violations.analytics.kpi.highSeverity","\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629"),value:m.toLocaleString("en-US"),icon:"fas fa-bomb",color:"#b91c1c",bg:"#fef2f2",border:"#fca5a5"},{id:"resolved",label:t("module.violations.analytics.kpi.resolved","\u0645\u062D\u0644\u0648\u0644\u0629"),value:u.toLocaleString("en-US"),icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{id:"unresolved",label:t("module.violations.analytics.kpi.unresolved","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629"),value:v.toLocaleString("en-US"),icon:"fas fa-times-circle",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{id:"resolRate",label:t("module.violations.analytics.kpi.resolRate","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"),value:b.toLocaleString("en-US")+"%",icon:"fas fa-chart-pie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{id:"totalFines",label:t("module.violations.analytics.kpi.totalFines","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A"),value:A>0?this.formatFineAmount(A):"\u2014",icon:"fas fa-coins",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{id:"thisMonth",label:t("module.violations.analytics.kpi.thisMonth","\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631"),value:B.toLocaleString("en-US"),icon:"fas fa-calendar-day",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"}];T.innerHTML=h.map(U=>`
                <div class="viol-kpi-card" data-kpi="${U.id}" title="\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062D\u0633\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0639\u064A\u0627\u0631" style="background:${U.bg};border:1.5px solid ${U.border};border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all .2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;background:${U.color};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${U.icon}" style="color:#fff;font-size:17px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.4rem;font-weight:800;color:${U.color};line-height:1.1;">${U.value}</div>
                        <div style="font-size:0.82rem;font-weight:700;color:#475569;margin-top:4px;white-space:nowrap;">${U.label}</div>
                    </div>
                </div>`).join("")}if(!await this._vEnsureChartJS()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",`<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t("module.violations.analytics.chartError","\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0623\u0639\u0644\u0627\u0647.")}</span></div>`);return}this._vDrawFactoryBreakdown("viol-chart-factory","viol-factory-breakdown-list",l);const R=this._vGroupBy(l,"status"),D={\u0645\u062D\u0644\u0648\u0644:"rgba(16,185,129,0.85)",resolved:"rgba(16,185,129,0.85)","\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"rgba(239,68,68,0.85)",unresolved:"rgba(239,68,68,0.85)",open:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"rgba(245,158,11,0.85)","in progress":"rgba(245,158,11,0.85)","under review":"rgba(245,158,11,0.85)"};this._vDrawDoughnut("viol-chart-status",R.labels.map(h=>t("module.violations.status."+h,h)),R.data,R.labels.map(h=>D[h.toLowerCase()]||D[h]||"rgba(148,163,184,0.8)"));const N=this._vGroupBy(l,"severity"),K={\u0639\u0627\u0644\u064A\u0629:"rgba(239,68,68,0.85)",high:"rgba(239,68,68,0.85)",\u0645\u062A\u0648\u0633\u0637\u0629:"rgba(245,158,11,0.85)",medium:"rgba(245,158,11,0.85)",moderate:"rgba(245,158,11,0.85)",\u0645\u0646\u062E\u0641\u0636\u0629:"rgba(16,185,129,0.85)",low:"rgba(16,185,129,0.85)",\u0645\u0646\u062E\u0636\u0629:"rgba(16,185,129,0.85)"};this._vDrawDoughnut("viol-chart-sev",N.labels.map(h=>t("module.violations.severity."+h,h)),N.data,N.labels.map(h=>K[h.toLowerCase()]||K[h]||"rgba(148,163,184,0.8)")),this._vDrawTrend("viol-chart-trend",r),this._vDrawListBreakdown("viol-chart-rca","viol-rca-breakdown-list",l,"rootCause",10,["rgba(220,38,38,0.85)","rgba(234,88,12,0.85)","rgba(217,119,6,0.85)","rgba(13,148,136,0.85)","rgba(37,99,235,0.85)","rgba(124,58,237,0.85)","rgba(190,24,93,0.85)","rgba(75,85,99,0.85)"],"#fef2f2","#991b1b","viol-rca-total-badge","viol-af-rca",null),this._vDrawTypeBreakdown("viol-chart-type","viol-type-breakdown-list",l,10),this._vDrawListBreakdown("viol-chart-loc","viol-loc-breakdown-list",l,"violationLocation",8,["rgba(245,158,11,0.85)","rgba(234,179,8,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)"],"#fffbeb","#92400e","viol-loc-total-badge","viol-af-loc",null),this._vDrawListBreakdown("viol-chart-emp","viol-emp-breakdown-list",p,"employeeName",10,["rgba(99,102,241,0.85)","rgba(79,70,229,0.85)","rgba(67,56,202,0.85)","rgba(55,48,163,0.85)","rgba(109,40,217,0.85)","rgba(124,58,237,0.85)","rgba(139,92,246,0.85)","rgba(167,139,250,0.85)","rgba(196,181,253,0.9)","rgba(76,29,149,0.85)"],"#eef2ff","#4338ca","viol-emp-total-badge",null,null),this._vDrawListBreakdown("viol-chart-con","viol-con-breakdown-list",f,"contractorName",10,["rgba(249,115,22,0.85)","rgba(234,88,12,0.85)","rgba(194,65,12,0.85)","rgba(154,52,18,0.85)","rgba(180,83,9,0.85)","rgba(217,119,6,0.85)","rgba(245,158,11,0.85)","rgba(202,138,4,0.85)","rgba(161,98,7,0.85)","rgba(120,53,15,0.85)"],"#fff7ed","#c2410c","viol-con-total-badge",null,null),this._vDrawFinesByType("viol-chart-fines",l);const S=l.filter(h=>{const U=String(h.severity||"").trim().toLowerCase(),x=String(h.status||"").trim().toLowerCase();return(U==="\u0639\u0627\u0644\u064A\u0629"||U==="high")&&!(x==="\u0645\u062D\u0644\u0648\u0644"||x==="resolved")}).sort((h,U)=>(U.fineAmount||0)-(h.fineAmount||0)).slice(0,20),M=document.getElementById("viol-critical-count"),q=document.getElementById("viol-critical-tbody");M&&(M.textContent=`${S.length} ${t("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`),q&&(S.length===0?q.innerHTML=`<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t("module.violations.analytics.table.noCritical","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0631\u062C\u0629 \u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629")}</td></tr>`:q.innerHTML=S.map((h,U)=>{const x=Utils.escapeHTML(h.employeeName||h.contractorName||"\u2014"),j=h.personType==="contractor"?`<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</span>`:`<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</span>`,it=`<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t("module.violations.analytics.severity.high","\u0639\u0627\u0644\u064A\u0629")}</span>`,z={"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644":"background:#fef3c7;color:#92400e;","\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"background:#ede9fe;color:#5b21b6;"}[h.status]||"background:#f1f5f9;color:#374151;",nt=Number(h.fineAmount)||0,bt=U%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${bt};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${bt}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${h.violationDate?new Date(h.violationDate).toLocaleDateString(a,{year:"numeric",month:"short",day:"numeric"}):"\u2014"}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${x}</td>
                        <td style="padding:9px 12px;">${j}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.violationType||"\u2014")}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(h.violationLocation||"\u2014")}</td>
                        <td style="padding:9px 12px;">${it}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${z}">${t("module.violations.status."+h.status,h.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${nt>0?"#dc2626":"#94a3b8"};">${nt>0?this.formatFineAmount(nt):"\u2014"}</td>
                    </tr>`}).join(""))},_vFilterByPeriod(e,t){if(!t||t===0)return e;const i=new Date;return i.setDate(i.getDate()-t),e.filter(a=>{if(!a.violationDate)return!0;const o=new Date(a.violationDate);return!isNaN(o.getTime())&&o>=i})},_vGroupBy(e,t,i=0){const a=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o={};e.forEach(s=>{const r=String(s[t]||a).trim()||a;o[r]=(o[r]||0)+1});let n=Object.entries(o).sort((s,r)=>r[1]-s[1]);return i>0&&(n=n.slice(0,i)),{labels:n.map(s=>s[0]),data:n.map(s=>s[1])}},_vGetFactoryName(e){const t=this._t?this._t("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return!e||typeof e!="object"?t:String(e.factory||e.violationLocation||e.violationPlace||t).trim()||t},_vApplyFilters(e){const t=p=>{const f=document.getElementById(p);return f?f.value.trim():""},i=t("viol-af-factory"),a=t("viol-af-ptype"),o=t("viol-af-type"),n=t("viol-af-sev"),s=t("viol-af-status"),r=t("viol-af-loc"),l=t("viol-af-rca"),c=[i,a,o,n,s,r,l].some(p=>p!==""),d=document.getElementById("viol-filter-badge");return d&&(d.style.display=c?"inline":"none"),e.filter(p=>!(i&&this._vGetFactoryName(p)!==i||a&&String(p.personType||"").trim()!==a||o&&String(p.violationType||"").trim()!==o||n&&String(p.severity||"").trim()!==n||s&&String(p.status||"").trim()!==s||r&&String(p.violationLocation||"").trim()!==r||l&&String(p.rootCause||"").trim()!==l))},_vPopulateFilters(e){const t=(n,s)=>this._t(n,s),i=n=>[...new Set(e.map(n).filter(Boolean))].sort(),a=(n,s,r)=>{const l=document.getElementById(n);if(!l)return;const c=l.value;l.innerHTML=`<option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>`+s.map(d=>{const p=r?t(r+d,d):d;return`<option value="${d}"${d===c?" selected":""}>${p}</option>`}).join("")},o=document.getElementById("viol-af-ptype");if(o){const n=o.value;o.innerHTML=`
                <option value="">${t("module.common.all","\u0627\u0644\u0643\u0644")}</option>
                <option value="employee"${n==="employee"?" selected":""}>${t("module.violations.analytics.person.employee","\u0645\u0648\u0638\u0641")}</option>
                <option value="contractor"${n==="contractor"?" selected":""}>${t("module.violations.analytics.person.contractor","\u0645\u0642\u0627\u0648\u0644")}</option>
            `}a("viol-af-factory",i(n=>this._vGetFactoryName(n))),a("viol-af-type",i(n=>String(n.violationType||"").trim())),a("viol-af-sev",i(n=>String(n.severity||"").trim()),"module.violations.severity."),a("viol-af-status",i(n=>String(n.status||"").trim()),"module.violations.status."),a("viol-af-loc",i(n=>String(n.violationLocation||"").trim())),a("viol-af-rca",i(n=>String(n.rootCause||"").trim()))},_vDrawListBreakdown(e,t,i,a,o,n,s,r,l,c,d){const p=document.getElementById(e),f=document.getElementById(e+"-empty"),m=document.getElementById(t),u=l?document.getElementById(l):null;if(!p)return;const v=(D,N)=>this._t(D,N),y=v("module.violations.analytics.undefined","\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),b={};i.forEach(D=>{const N=String(D[a]||y).trim()||y;b[N]=(b[N]||0)+1});let A=Object.entries(b).sort((D,N)=>N[1]-D[1]);o>0&&(A=A.slice(0,o));const B=A.map(D=>D[0]),T=A.map(D=>D[1]),E=i.length;if(u&&(u.textContent=`${E.toLocaleString("en-US")} ${v("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`,s&&(u.style.background=s),r&&(u.style.color=r)),!T.length||E===0){p.style.display="none",f&&(f.style.display="flex"),m&&(m.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${v("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}f&&(f.style.display="none"),p.style.display="",this._violCharts||(this._violCharts={});const R=this._violCharts[e];if(R)try{R.destroy()}catch{}this._violCharts[e]=new Chart(p,{type:"doughnut",data:{labels:B,datasets:[{data:T,backgroundColor:B.map((D,N)=>n[N%n.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:D=>{const N=D.parsed,K=E>0?(N/E*100).toFixed(1):"0";return` ${D.label}: ${N.toLocaleString("en-US")} (${K}%)`}}}}}}),m&&(m.innerHTML=A.map((D,N)=>{const K=D[0],S=D[1],M=E>0?(S/E*100).toFixed(1):0,q=n[N%n.length],h=N+1,U=d?v(d+K,K):K;return`
                <div class="viol-list-item" data-filter-val="${Utils.escapeHTML(K)}" data-filter-id="${c||""}" title="${Utils.escapeHTML(U)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;padding:9px 12px;cursor:${c?"pointer":"default"};transition:all 0.2s;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:7px;">
                            <span style="width:20px;height:20px;border-radius:50%;background:${q};color:#fff;font-size:0.68rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${h}</span>
                            <span style="font-weight:800;font-size:0.85rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:155px;">${Utils.escapeHTML(U)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:0.95rem;color:${q.replace("0.85","1")};">${S.toLocaleString("en-US")}</span>
                            <span style="font-size:0.78rem;font-weight:700;color:#64748b;">(${M}%)</span>
                        </div>
                    </div>
                    <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                        <div style="width:${M}%;height:100%;background:${q};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),c&&m.querySelectorAll(".viol-list-item").forEach(D=>{D.addEventListener("mouseover",()=>{D.style.background="#f8fafc",D.style.borderColor="#cbd5e1"}),D.addEventListener("mouseout",()=>{D.style.background="#fff",D.style.borderColor="#f1f5f9"}),D.addEventListener("click",()=>{const N=D.getAttribute("data-filter-val"),K=document.getElementById(c);K&&(K.value=K.value===N?"":N,this.updateViolationAnalytics())})}))},_vDrawTypeBreakdown(e,t,i,a){const o=document.getElementById(e),n=document.getElementById(e+"-empty"),s=document.getElementById(t),r=document.getElementById("viol-type-total-badge");if(!o)return;const l=(y,b)=>this._t(y,b),c=i.length;r&&(r.textContent=`${c.toLocaleString("en-US")} ${l("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const d={};i.forEach(y=>{const b=String(y.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";d[b]||(d[b]=0),d[b]++});let p=Object.entries(d).sort((y,b)=>b[1]-y[1]);a>0&&(p=p.slice(0,a));const f=p.map(y=>y[0]),m=p.map(y=>y[1]),u=["rgba(220,38,38,0.85)","rgba(234,88,12,0.85)","rgba(202,138,4,0.85)","rgba(22,163,74,0.85)","rgba(2,132,199,0.85)","rgba(99,102,241,0.85)","rgba(168,85,247,0.85)","rgba(236,72,153,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!m.length||c===0){o.style.display="none",n&&(n.style.display="flex"),s&&(s.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${l("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}n&&(n.style.display="none"),o.style.display="",this._violCharts||(this._violCharts={});const v=this._violCharts[e];if(v)try{v.destroy()}catch{}this._violCharts[e]=new Chart(o,{type:"doughnut",data:{labels:f,datasets:[{data:m,backgroundColor:f.map((y,b)=>u[b%u.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:y=>{const b=y.parsed,A=c>0?(b/c*100).toFixed(1):"0";return` ${y.label}: ${b.toLocaleString("en-US")} (${A}%)`}}}}}}),s&&(s.innerHTML=p.map((y,b)=>{const A=y[0],B=y[1],T=c>0?(B/c*100).toFixed(1):0,E=u[b%u.length],R=b+1;return`
                <div class="viol-type-item" data-vtype="${Utils.escapeHTML(A)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 ${Utils.escapeHTML(A)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;padding:10px 14px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#fef2f2';this.style.borderColor='#fca5a5';" onmouseout="this.style.background='#fff';this.style.borderColor='#f1f5f9';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:22px;height:22px;border-radius:50%;background:${E};color:#fff;font-size:0.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${R}</span>
                            <span style="font-weight:800;font-size:0.88rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;" title="${Utils.escapeHTML(A)}">${Utils.escapeHTML(A)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:1.0rem;color:${E.replace("0.85","1")};">${B.toLocaleString("en-US")}</span>
                            <span style="font-size:0.82rem;font-weight:700;color:#64748b;">(${T}%)</span>
                        </div>
                    </div>
                    <div style="height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${T}%;height:100%;background:${E};border-radius:4px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`}).join(""),s.querySelectorAll(".viol-type-item").forEach(y=>{y.addEventListener("click",()=>{const b=y.getAttribute("data-vtype"),A=document.getElementById("viol-af-type");A&&(A.value=A.value===b?"":b,this.updateViolationAnalytics())})}))},_vDrawFactoryBreakdown(e,t,i){const a=document.getElementById(e),o=document.getElementById(e+"-empty"),n=document.getElementById(t),s=document.getElementById("viol-factory-total-badge");if(!a)return;const r=(v,y)=>this._t(v,y),l=i.length;s&&(s.textContent=`${l.toLocaleString("en-US")} ${r("module.violations.analytics.violationUnit","\u0645\u062E\u0627\u0644\u0641\u0629")}`);const c={};i.forEach(v=>{const y=this._vGetFactoryName(v);c[y]||(c[y]={count:0,fineSum:0}),c[y].count+=1,c[y].fineSum+=Number(v.fineAmount)||0});const d=Object.entries(c).sort((v,y)=>y[1].count-v[1].count),p=d.map(v=>v[0]),f=d.map(v=>v[1].count),m=["rgba(236,72,153,0.85)","rgba(99,102,241,0.85)","rgba(245,158,11,0.85)","rgba(16,185,129,0.85)","rgba(59,130,246,0.85)","rgba(139,92,246,0.85)","rgba(239,68,68,0.85)","rgba(20,184,166,0.85)","rgba(107,114,128,0.85)"];if(!f.length||l===0){a.style.display="none",o&&(o.style.display="flex"),n&&(n.innerHTML=`<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:20px;">${r("module.violations.analytics.noData","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A")}</div>`);return}o&&(o.style.display="none"),a.style.display="",this._violCharts||(this._violCharts={});const u=this._violCharts[e];if(u)try{u.destroy()}catch{}this._violCharts[e]=new Chart(a,{type:"doughnut",data:{labels:p,datasets:[{data:f,backgroundColor:p.map((v,y)=>m[y%m.length]),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{callbacks:{label:v=>{const y=v.parsed,b=l>0?(y/l*100).toFixed(1):"0";return` ${v.label}: ${y.toLocaleString("en-US")} (${b}%)`}}}}}}),n&&(n.innerHTML=d.map((v,y)=>{const b=v[0],A=v[1].count,B=v[1].fineSum,T=l>0?(A/l*100).toFixed(1):0,E=m[y%m.length],R=B>0?this.formatFineAmount(B):"";return`
                <div class="viol-factory-item" data-factory="${Utils.escapeHTML(b)}" title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u062D\u0633\u0628 \u0645\u0635\u0646\u0639 ${Utils.escapeHTML(b)}" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 14px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.03);" onmouseover="this.style.background='#fdf2f8';this.style.borderColor='#fbcfe8';" onmouseout="this.style.background='#ffffff';this.style.borderColor='#e2e8f0';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:0.95rem;color:#0f172a;">
                            <span style="width:12px;height:12px;border-radius:50%;background:${E};display:inline-block;flex-shrink:0;box-shadow:0 0 6px ${E};"></span>
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;" title="${Utils.escapeHTML(b)}">${Utils.escapeHTML(b)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;font-size:0.88rem;">
                            <span style="font-weight:800;color:#be185d;font-size:1.05rem;">${A.toLocaleString("en-US")}</span>
                            <span style="color:#64748b;font-size:0.85rem;font-weight:700;">(${T}%)</span>
                            ${R?`<span style="background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:8px;font-weight:700;font-size:0.8rem;">${R}</span>`:""}
                        </div>
                    </div>
                    <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${T}%;height:100%;background:${E};border-radius:4px;transition:width 0.5s ease;"></div>
                    </div>
                </div>`}).join(""),n.querySelectorAll(".viol-factory-item").forEach(v=>{v.addEventListener("click",()=>{const y=v.getAttribute("data-factory"),b=document.getElementById("viol-af-factory");b&&(b.value=b.value===y?"":y,this.updateViolationAnalytics())})}))},_vDrawDoughnut(e,t,i,a){const o=document.getElementById(e),n=document.getElementById(e+"-empty");if(!o)return;if(!i.length||i.reduce((l,c)=>l+c,0)===0){o.style.display="none",n&&(n.style.display="flex");return}n&&(n.style.display="none"),o.style.display="";const s=i.reduce((l,c)=>l+c,0);this._violCharts||(this._violCharts={});const r=this._violCharts[e];if(r)try{r.destroy()}catch{}this._violCharts[e]=new Chart(o,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:a||this._vChartColors(i.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:13,weight:"bold",family:"'Cairo', sans-serif"},usePointStyle:!0,boxWidth:10}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed.toLocaleString("en-US")} (${s>0?(l.parsed/s*100).toFixed(1):0}%)`}}}}})},_vDrawHBar(e,t,i,a){const o=document.getElementById(e),n=document.getElementById(e+"-empty");if(!o)return;if(!i.length||i.reduce((r,l)=>r+l,0)===0){o.style.display="none",n&&(n.style.display="flex");return}n&&(n.style.display="none"),o.style.display="",this._violCharts||(this._violCharts={});const s=this._violCharts[e];if(s)try{s.destroy()}catch{}this._violCharts[e]=new Chart(o,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:a||"rgba(220,38,38,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>` ${r.parsed.x.toLocaleString("en-US")}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:12,weight:"bold"}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:12,weight:"bold",family:"'Cairo', sans-serif"},callback:r=>String(t[r]).length>22?String(t[r]).slice(0,21)+"\u2026":t[r]}}}}})},_vDrawTrend(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const o=(p,f)=>this._t(p,f),s=(window.AppI18n&&typeof window.AppI18n.getCurrentLang=="function"?window.AppI18n.getCurrentLang():"ar")==="en"?"en-US":"ar-SA-u-nu-latn",r=new Date,l=[];for(let p=11;p>=0;p--){const f=new Date(r.getFullYear(),r.getMonth()-p,1),m=f.toLocaleDateString(s,{month:"long"});l.push({year:f.getFullYear(),month:f.getMonth(),label:`${m} ${f.getFullYear()}`})}const c=l.map(p=>t.filter(f=>{if(!f.violationDate)return!1;const m=new Date(f.violationDate);return!isNaN(m.getTime())&&m.getFullYear()===p.year&&m.getMonth()===p.month}).length);if(c.reduce((p,f)=>p+f,0)===0){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="",this._violCharts||(this._violCharts={});const d=this._violCharts[e];if(d)try{d.destroy()}catch{}this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:l.map(p=>p.label),datasets:[{label:o("module.violations.analytics.chart.violationCount","\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),data:c,backgroundColor:c.map(p=>p===Math.max(...c)?"rgba(220,38,38,0.85)":"rgba(220,38,38,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:o("module.violations.analytics.chart.trendLine","\u0627\u0644\u0627\u062A\u062C\u0627\u0647"),data:c,type:"line",borderColor:"rgba(139,92,246,0.9)",backgroundColor:"rgba(139,92,246,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#8b5cf6",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_vDrawFinesByType(e,t){const i=document.getElementById(e),a=document.getElementById(e+"-empty");if(!i)return;const o=t.filter(m=>(Number(m.fineAmount)||0)>0);if(!o.length){i.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),i.style.display="";const n={};o.forEach(m=>{const u=String(m.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();n[u]=(n[u]||0)+(Number(m.fineAmount)||0)});const s=Object.entries(n).sort((m,u)=>u[1]-m[1]).slice(0,10),r=s.map(m=>m[0]),l=this.getCurrentCurrency(),c=this.getCurrencyLabel("long"),d=s.map(m=>{const u=this.convertFineAmount(m[1],l);return l==="USD"?Number(u.toFixed(2)):Math.round(u)});this._violCharts||(this._violCharts={});const p=this._violCharts[e];if(p)try{p.destroy()}catch{}const f=m=>l==="USD"?m.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}):m.toLocaleString("en-US",{maximumFractionDigits:0});this._violCharts[e]=new Chart(i,{type:"bar",data:{labels:r,datasets:[{data:d,backgroundColor:"rgba(217,119,6,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:m=>` ${f(m.parsed.x)} ${c}`}}},scales:{x:{beginAtZero:!0,ticks:{font:{size:11},callback:m=>f(m)},grid:{color:"#f1f5f9"},title:{display:!0,text:`\u0627\u0644\u063A\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629 (${c})`,font:{size:11}}},y:{ticks:{font:{size:11},callback:m=>String(r[m]).length>18?String(r[m]).slice(0,17)+"\u2026":r[m]}}}}})},async _vEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(!1)},5e3)}):new Promise(t=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",i.onload=()=>t(!0),i.onerror=()=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",a.onload=()=>t(!0),a.onerror=()=>t(!1),document.head.appendChild(a)},document.head.appendChild(i)})},_vChartColors(e){const t=["rgba(220,38,38,0.8)","rgba(245,158,11,0.8)","rgba(16,185,129,0.8)","rgba(99,102,241,0.8)","rgba(249,115,22,0.8)","rgba(139,92,246,0.8)","rgba(59,130,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:e},(i,a)=>t[a%t.length])},async _loadReportPdfLib_(e,t){return t()?!0:new Promise(i=>{const a=Array.from(document.querySelectorAll("script[src]")).find(n=>String(n.src||"").includes(e));if(a){const n=()=>i(!!t());a.addEventListener("load",n,{once:!0}),setTimeout(n,4e3);return}const o=document.createElement("script");o.src=e,o.async=!0,o.onload=()=>i(!!t()),o.onerror=()=>i(!1),document.head.appendChild(o)})},async _ensureReportPdfLibs_(){const e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return e&&t},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",_stripScriptsFromHtml_(e){return String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("viol-cairo-font-link")){const e=document.createElement("link");e.id="viol-cairo-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(e)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(e){const t=`
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
</style>`,i=this._stripScriptsFromHtml_(e);return i?i.includes("</head>")?i.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${i}</body></html>`:t},async _waitArabicPdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 24px Cairo")]),await e.fonts.ready}catch{}},async _captureHtmlToCanvas_(e,t={}){const i={scale:2.5,backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(e.scrollWidth,900),windowHeight:Math.max(e.scrollHeight,1),scrollX:0,scrollY:0},a=[{...i,useCORS:!0,allowTaint:!1},{...i,useCORS:!0,allowTaint:!0},{...i,useCORS:!1,allowTaint:!0}];let o=null;for(let n=0;n<a.length;n++)try{const s=await html2canvas(e,a[n]);if(s&&s.width>0&&s.height>0)return s}catch(s){o=s}if(o)throw o;return null},async _downloadHtmlReportAsPdf(e,t="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const a=this._prepareArabicPdfHtml_(e),o=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,n=document.createElement("iframe");n.setAttribute("aria-hidden","true"),n.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(n);try{n.srcdoc=a,await new Promise(p=>{n.onload=p,n.onerror=p,setTimeout(p,6e3)});const s=n.contentDocument||n.contentWindow?.document;if(!s)return!1;await this._waitArabicPdfFontsReady_(s);const r=Array.from(s.images||[]);await Promise.all(r.map(p=>new Promise(f=>{if(p.complete)return f();p.onload=f,p.onerror=f,setTimeout(f,3e3)})));const l=s.querySelector(".report-wrapper")||s.body;if(!l)return!1;const c=await this._captureHtmlToCanvas_(l);if(!c)return!1;const d=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return d?(Utils.PdfExport.appendCanvasAsPdfPages(d,c,{marginMm:8}),Utils.PdfExport.savePdf(d,o),!0):!1}catch(s){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",s),!1}finally{n.remove()}},_getViolAnalyticsPeriodLabel_(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._violPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_buildViolAnalyticsExportLegend_(){const e=o=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(o):String(o??""),t=e(this._getViolAnalyticsPeriodLabel_()),i=e(document.getElementById("viol-filter-count")?.textContent?.trim()||""),a=e(new Date().toLocaleString("ar-SA-u-nu-latn",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return`
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ${t}</div>
                ${i?`<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${i}</div>`:""}
                <div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ${a}</div>
            </div>
        </div>`},async _vExportPDF(){const e=document.getElementById("viol-analytics-capture");if(!e)return;const t=document.getElementById("viol-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{if(await this._ensureReportPdfLibs_(),typeof html2canvas>"u")throw new Error("html2canvas unavailable");const a=document.getElementById("viol-filter-panel"),o=a&&a.style.display!=="none";o&&(a.style.display="none");const n=Utils.PdfExport.getOptimalCaptureScale(e.scrollWidth,e.scrollHeight,Utils.PdfExport.DEFAULT_CAPTURE_SCALE),s=await html2canvas(e,{scale:n,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:0,logging:!1});o&&(a.style.display="");const{dataUrl:r}=Utils.PdfExport.compressCanvasToJpegDataUrl(s,Utils.PdfExport.TARGET_MAX_BYTES),l="\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0648\u0645\u0624\u0634\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",c="Violations Performance Analytics & Incident Metrics KPI Report",d=this._buildViolAnalyticsExportLegend_(),p=`
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
            `,f=`Violations-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(l,p,f,!0)}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A")}finally{t&&(t.disabled=!1,t.innerHTML=i)}},_vBindAnalyticsEvents(){const e=document.getElementById("viol-analytics-root");if(!e)return;e.querySelectorAll(".viol-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._violPeriod=r.getAttribute("data-period"),e.querySelectorAll(".viol-period-btn").forEach(l=>{const c=l===r;l.style.background=c?"#fff":"rgba(255,255,255,0.15)",l.style.color=c?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const t=document.getElementById("viol-analytics-refresh");t&&t.addEventListener("click",()=>this.updateViolationAnalytics());const i=document.getElementById("viol-export-pdf-btn");i&&i.addEventListener("click",()=>this._vExportPDF());const a=document.getElementById("viol-toggle-filters-btn"),o=document.getElementById("viol-filter-panel");a&&o&&a.addEventListener("click",()=>{const r=o.style.display!=="none";o.style.display=r?"none":"block",a.style.background=r?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const n=document.getElementById("viol-filter-reset-btn");n&&n.addEventListener("click",()=>{["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(r=>{const l=document.getElementById(r);l&&(l.value="")}),this.updateViolationAnalytics()}),["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(r=>{const l=document.getElementById(r);l&&l.addEventListener("change",()=>this.updateViolationAnalytics())}),e.querySelectorAll(".viol-kpi-card").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-kpi");if(l==="total")["viol-af-factory","viol-af-ptype","viol-af-type","viol-af-sev","viol-af-status","viol-af-loc","viol-af-rca"].forEach(c=>{const d=document.getElementById(c);d&&(d.value="")});else if(l==="employees"){const c=document.getElementById("viol-af-ptype");c&&(c.value=c.value==="employee"?"":"employee")}else if(l==="contractors"){const c=document.getElementById("viol-af-ptype");c&&(c.value=c.value==="contractor"?"":"contractor")}else if(l==="highSev"){const c=document.getElementById("viol-af-sev");c&&(c.value=c.value==="\u0639\u0627\u0644\u064A\u0629"?"":"\u0639\u0627\u0644\u064A\u0629")}else if(l==="resolved"){const c=document.getElementById("viol-af-status");c&&(c.value=c.value==="\u0645\u062D\u0644\u0648\u0644"?"":"\u0645\u062D\u0644\u0648\u0644")}else if(l==="unresolved"){const c=document.getElementById("viol-af-status");c&&(c.value=c.value==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"":"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644")}this.updateViolationAnalytics()})}),e.querySelectorAll(".viol-curr-btn").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-curr");this.setCurrentCurrency(l),e.querySelectorAll(".viol-curr-btn").forEach(c=>{const d=c.getAttribute("data-curr")===l;c.style.background=d?"#fff":"transparent",c.style.color=d?"#991b1b":"#fff"}),this.updateViolationAnalytics()})});const s=document.getElementById("viol-curr-rate-btn");s&&s.addEventListener("click",()=>{const r=this.getExchangeRate(),l=window.prompt(`\u0623\u062F\u062E\u0644 \u0633\u0639\u0631 \u0635\u0631\u0641 \u0627\u0644\u062F\u0648\u0644\u0627\u0631 (\u0643\u0645 \u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A \u064A\u0633\u0627\u0648\u064A 1 \u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A):

\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: ${r} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`,String(r));if(l===null)return;const c=parseFloat(String(l).trim());if(!Number.isFinite(c)||c<=0){typeof Notification<"u"&&Notification.error?Notification.error("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"):alert("\u0633\u0639\u0631 \u0635\u0631\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}this.setExchangeRate(c),typeof Notification<"u"&&Notification.success&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0625\u0644\u0649 ${c} \u062C\u0646\u064A\u0647 = 1 \u062F\u0648\u0644\u0627\u0631`),this.updateViolationAnalytics()})},loadContractorsIntoSelect(e,t="",i=""){if(!e||e.tagName!=="SELECT"){Utils.safeWarn("\u26A0\uFE0F loadContractorsIntoSelect: \u0639\u0646\u0635\u0631 select \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}if(typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"){Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:t,selectedContractorId:i,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1});return}let a=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function")try{const s=Contractors.getAllContractorsForModules();if(s&&s.length>0){const r=new Map;s.forEach(l=>{const c=(l.name||"").trim();if(!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")return;const d=((l.code||l.isoCode||"")+"").trim().toUpperCase(),p=((l.licenseNumber||"")+"").trim(),f=/^CON-\d+$/i.test(d)?`CODE:${d}`:p?`LIC:${p}`:l.id?`ID:${l.id}`:`NAME:${c.toLowerCase()}`;r.has(f)||r.set(f,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||"").trim()})}),a=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 getAllContractorsForModules:",s)}if(a.length===0&&typeof Contractors<"u"&&typeof Contractors.getApprovedOptions=="function")try{const s=Contractors.getApprovedOptions(!1);s&&s.length>0&&(a=s.map(r=>({id:r.id||r.contractorId||"",name:(r.name||"").trim(),serviceType:(r.serviceType||"").trim(),licenseNumber:(r.licenseNumber||"").trim()})).filter(r=>r.name))}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",s)}if(a.length===0){const s=AppState.appData.approvedContractors||[],r=new Map;s.filter(l=>l&&(l.companyName||l.name)&&l.isActive!=="inactive"&&l.isActive!==!1&&l.isActive!=="false"&&l.isActive!=="FALSE").forEach(l=>{const c=(l.companyName||l.name||"").trim();!c||c==="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"||r.has(c)||r.set(c,{id:l.id||"",name:c,serviceType:(l.serviceType||"").trim(),licenseNumber:(l.licenseNumber||l.contractNumber||"").trim()})}),a=Array.from(r.values()).sort((l,c)=>{const d=l.name.toLowerCase(),p=c.name.toLowerCase();return d.localeCompare(p,"ar",{sensitivity:"base"})})}e.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>';const o=document.createDocumentFragment();let n=null;if(a.forEach(s=>{if(!s||!s.name)return;const r=document.createElement("option");r.value=s.name,r.textContent=s.name,s.serviceType&&(r.textContent+=` - ${s.serviceType}`),r.dataset.contractorId=s.id||"",(t&&s.name===t||i&&s.id===i)&&(r.selected=!0,n=r),o.appendChild(r)}),e.appendChild(o),t&&!n&&e.value!==t)try{e.value=t}catch{Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",t)}},async showViolationForm(e=null){let t=null;if(typeof e=="string"?t=AppState.appData.violations?.find(g=>g.id===e)||null:typeof e=="object"&&(t=e),t=this.normalizeViolationRecord(t),t&&!this.isViolationVisibleToCurrentUser(t)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0645\u0634\u0627\u0647\u062F\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const i=t?this.getEffectiveFineAmount(t):0,a=!!t,n=String(t?.personType||"").trim().toLowerCase()==="contractor"||!!t?.contractorName&&!t?.employeeName,s=!n,r=String(t?.violationLocationId||t?.violationLocation||"").trim(),l=String(t?.violationPlaceId||t?.violationPlace||"").trim();let c=[];if(typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.getAll)try{ViolationTypesManager.ensureInitialized(),c=ViolationTypesManager.getAll()}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",g),c=AppState?.appData?.violationTypes||[]}else c=AppState?.appData?.violationTypes||[];const d=t?.violationTypeId||"",p=(t?.violationType||"").trim(),f=(AppState?.currentUser?.role||"").toString().trim().toLowerCase(),m=["admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","system_admin"].includes(f),u=c.map(g=>{const L=d?g.id===d:g.name===p,C=Number(g?.fineAmount||0);return`
                <option value="${Utils.escapeHTML(g.name)}" data-type-id="${Utils.escapeHTML(g.id)}" data-fine-amount="${C}" ${L?"selected":""}>
                    ${Utils.escapeHTML(g.name)}
                </option>
            `}).join(""),y=!c.some(g=>d?g.id===d:g.name===p)&&p?`
                <option value="${Utils.escapeHTML(p)}" data-type-id="${Utils.escapeHTML(d)}" data-fine-amount="${Number(i)}" selected>
                    ${Utils.escapeHTML(p)} (\u063A\u064A\u0631 \u0645\u0639\u0631\u0641)
                </option>
            `:"",A=Array.from(new Set((AppState.appData?.violations||[]).map(g=>(g.contractorWorker||"").trim()).filter(g=>g&&g!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))).sort((g,L)=>g.localeCompare(L,"ar")).map(g=>`<option value="${Utils.escapeHTML(g)}"></option>`).join(""),B=["\u0639\u0627\u0645\u0644 \u0639\u0627\u062F\u064A","\u0641\u0646\u064A \u0643\u0647\u0631\u0628\u0627\u0621","\u0641\u0646\u064A \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627","\u0644\u062D\u0627\u0645 / \u0628\u0631\u0627\u062F","\u0641\u0646\u064A \u0633\u0642\u0627\u0644\u0627\u062A","\u0645\u0634\u0631\u0641 \u0633\u0642\u0627\u0644\u0627\u062A","\u0645\u0634\u063A\u0644 \u0631\u0627\u0641\u0639\u0629 \u0634\u0648\u0643\u064A\u0629","\u0633\u0627\u0626\u0642 \u0645\u0639\u062F\u0627\u062A \u062B\u0642\u064A\u0644\u0629","\u0645\u0634\u0631\u0641 \u0633\u0644\u0627\u0645\u0629 \u0648\u0635\u062D\u0629 \u0645\u0647\u0646\u064A\u0629","\u0645\u0631\u0627\u0642\u0628 \u062D\u0631\u064A\u0642 (Fire Watcher)","\u0641\u0646\u064A \u062F\u0647\u0627\u0646 \u0648\u0639\u0632\u0644","\u0641\u0646\u064A \u0645\u062F\u0646\u064A \u0648\u0628\u0646\u0627\u0621","\u0645\u0633\u0627\u0639\u062F \u0641\u0646\u064A / \u0634\u064A\u0627\u0644"],T=(AppState.appData?.violations||[]).map(g=>(g.contractorPosition||"").trim()).filter(Boolean),R=Array.from(new Set([...B,...T])).sort((g,L)=>g.localeCompare(L,"ar")).map(g=>`<option value="${Utils.escapeHTML(g)}"></option>`).join(""),N=this.getSystemDepartmentOptions().map(g=>{const L=t?.contractorDepartment===g;return`<option value="${Utils.escapeHTML(g)}" ${L?"selected":""}>${Utils.escapeHTML(g)}</option>`}).join(""),K=new Date().toISOString().slice(0,10),S=new Date().toTimeString().slice(0,5),M=t?.violationDate?new Date(t.violationDate).toISOString().slice(0,10):K,q=t?.violationTime||S,h=t?.photo||(Array.isArray(t?.photos)&&t.photos.length>0?t.photos[0]:"")||"",U=t?.photo2||(Array.isArray(t?.photos)&&t.photos.length>1?t.photos[1]:"")||"",x=document.createElement("div");x.className="modal-overlay",x.id="violation-modal-overlay",x.innerHTML=`
            <style>
                #violation-modal-overlay .form-input,
                #violation-modal-overlay select.form-input,
                #violation-modal-overlay input[type="text"].form-input,
                #violation-modal-overlay input[type="date"].form-input,
                #violation-modal-overlay input[type="time"].form-input,
                #violation-modal-overlay input[type="number"].form-input {
                    box-sizing: border-box !important;
                    min-height: 44px !important;
                    height: 44px !important;
                    padding-top: 6px !important;
                    padding-bottom: 6px !important;
                    padding-right: 12px !important;
                    padding-left: 12px !important;
                    font-size: 0.92rem !important;
                    line-height: 1.5 !important;
                    border-radius: 9px !important;
                    border: 1.5px solid #cbd5e1 !important;
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    display: block !important;
                    width: 100% !important;
                    outline: none !important;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
                }
                #violation-modal-overlay select.form-input {
                    padding-right: 10px !important;
                    padding-left: 28px !important;
                    appearance: auto !important;
                    -webkit-appearance: menulist !important;
                    -moz-appearance: menulist !important;
                    cursor: pointer !important;
                }
                #violation-modal-overlay textarea.form-input {
                    box-sizing: border-box !important;
                    min-height: 80px !important;
                    height: auto !important;
                    padding: 9px 12px !important;
                    font-size: 0.90rem !important;
                    line-height: 1.55 !important;
                    border-radius: 9px !important;
                    border: 1.5px solid #cbd5e1 !important;
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    display: block !important;
                    width: 100% !important;
                    resize: vertical !important;
                    outline: none !important;
                }
                #violation-modal-overlay .form-input:focus {
                    border-color: #2563eb !important;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18) !important;
                }
            </style>
            <div class="modal-content" style="max-width: 880px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35); border: 1px solid #cbd5e1;">
                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u064A\u0629 \u0627\u0644\u0639\u0644\u0648\u064A\u0629 (Corporate Identity Ribbon) -->
                <div style="height: 5px; width: 100%; background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 35%, #fbbf24 70%, #10b981 100%);"></div>

                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0628\u0647\u0648\u064A\u0629 ICAPP \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 -->
                <div class="modal-header" style="background: linear-gradient(135deg, #0b1329 0%, #1e293b 60%, #0f172a 100%); color: #ffffff; padding: 18px 24px; border-bottom: 2px solid #2563eb; display: flex; align-items: center; justify-content: space-between; position: relative;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(245, 158, 11, 0.22) 100%); border: 1.5px solid rgba(245, 158, 11, 0.45); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);">
                            <i class="fas fa-shield-halved" style="color: #fbbf24; font-size: 1.35rem;"></i>
                        </div>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <h2 style="font-size: 1.18rem; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.2px;">
                                    ${a?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}
                                </h2>
                                <span style="font-size: 0.70rem; font-weight: 800; color: #38bdf8; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); padding: 2px 7px; border-radius: 5px;">
                                    HSE-OFFICIAL
                                </span>
                            </div>
                            <p style="margin: 3px 0 0 0; font-size: 0.80rem; color: #cbd5e1; font-weight: 500; display: flex; align-items: center; gap: 6px;">
                                <span style="color: #60a5fa; font-weight: 700;">\u0634\u0631\u0643\u0629 \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0644\u0644\u0632\u062C\u0627\u062C (ICAPP)</span>
                                <span style="color: #64748b;">\u2022</span>
                                <span>\u0642\u0637\u0627\u0639 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629 (QHSE)</span>
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="hidden sm:flex" style="flex-direction: column; align-items: flex-end; gap: 2px; text-align: left;">
                            <span style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); padding: 2px 8px; border-radius: 6px; letter-spacing: 0.5px; font-family: monospace;">
                                ICAPP-HSE-VIO-01
                            </span>
                            <span style="font-size: 0.66rem; color: #94a3b8; font-weight: 600;">\u0648\u062B\u064A\u0642\u0629 \u062C\u0648\u062F\u0629 \u0648\u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062A\u0645\u062F\u0629</span>
                        </div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
                            <i class="fas fa-times" style="font-size: 15px;"></i>
                        </button>
                    </div>
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
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #ffffff; font-weight: 800; font-size: 13px; box-shadow: 0 2px 4px rgba(37,99,235,0.25);">1</span>
                                    <span style="font-size: 0.94rem; font-weight: 800; color: #1e293b;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 (\u0627\u0644\u0645\u0648\u0638\u0641 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644)</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe; padding: 3px 11px; border-radius: 20px;">
                                    <i class="fas fa-bolt-lightning ml-1 text-amber-500"></i> \u0641\u062D\u0635 \u0630\u0643\u064A \u0641\u0648\u0631\u064A \u0644\u0633\u062C\u0644 \u0627\u0644\u062C\u0632\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0634\u0647\u0631\u064A
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-user-tag text-blue-600 ml-1"></i> \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                        </label>
                                        <select id="violation-person-type" required class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;">
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0635\u0641\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641 --</option>
                                            <option value="employee" ${s?"selected":""}>\u0645\u0648\u0638\u0641 \u0628\u0627\u0644\u0634\u0631\u0643\u0629 (ICAPP)</option>
                                            <option value="contractor" ${n?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062A\u0627\u0628\u0639\u0629 \u0644\u0645\u0642\u0627\u0648\u0644</option>
                                        </select>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0648\u0638\u0641: \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A -->
                                    <div id="violation-employee-code-container" style="display: ${s?"block":"none"};">
                                        <label for="violation-employee-code" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-id-card text-indigo-600 ml-1"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 *
                                        </label>
                                        <input type="text" id="violation-employee-code" class="form-input"
                                            value="${t?.employeeCode||t?.employeeNumber||""}" 
                                            placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F (\u062C\u0644\u0628 \u0641\u0648\u0631\u064A \u0644\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629)"
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 600;"
                                            ${s?"required":""}>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 -->
                                    <div id="violation-contractor-company-container" style="display: ${n?"block":"none"};">
                                        <label for="violation-contractor-select" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-building text-amber-600 ml-1"></i> \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 *
                                        </label>
                                        <select id="violation-contractor-select" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;"
                                            ${n?"required":""}>
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 -->
                                <div id="violation-employee-details-grid" class="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5" style="display: ${s?"grid":"none"};">
                                    <div>
                                        <label for="violation-person-name" class="block text-xs font-bold text-gray-600 mb-1" id="violation-person-name-label">
                                            <i class="fas fa-user ml-1 text-slate-500"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641
                                        </label>
                                        <input type="text" id="violation-person-name" class="form-input"
                                            value="${t?.employeeName||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 700; color: #0f172a;">
                                    </div>
                                    <div id="violation-employee-position-container">
                                        <label for="violation-employee-position" class="block text-xs font-bold text-gray-600 mb-1">
                                            <i class="fas fa-briefcase ml-1 text-slate-500"></i> \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                        </label>
                                        <input type="text" id="violation-employee-position" class="form-input"
                                            value="${t?.employeePosition||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 600; color: #334155;">
                                    </div>
                                    <div id="violation-employee-department-container">
                                        <label for="violation-employee-department" class="block text-xs font-bold text-gray-600 mb-1">
                                            <i class="fas fa-sitemap ml-1 text-slate-500"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629
                                        </label>
                                        <input type="text" id="violation-employee-department" class="form-input"
                                            value="${t?.employeeDepartment||""}" 
                                            placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062C\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-weight: 600; color: #334155;">
                                    </div>
                                </div>

                                <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0630\u0643\u064A\u0629 -->
                                <div id="violation-contractor-fields-container" class="mt-3.5" style="display: ${n?"block":"none"};">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                        <div id="violation-contractor-worker-container">
                                            <label for="violation-contractor-worker" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-user-hard-hat ml-1 text-amber-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644
                                            </label>
                                            <input type="text" id="violation-contractor-worker" list="violation-contractor-workers-list" class="form-input"
                                                value="${t?.contractorWorker||""}" 
                                                placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644..."
                                                style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 600;">
                                            <datalist id="violation-contractor-workers-list">
                                                ${A}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-position-container">
                                            <label for="violation-contractor-position" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-briefcase ml-1 text-slate-600"></i> \u0645\u0647\u0646\u0629 / \u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0639\u0627\u0645\u0644
                                            </label>
                                            <input type="text" id="violation-contractor-position" list="violation-contractor-positions-list" class="form-input"
                                                value="${t?.contractorPosition||""}" 
                                                placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0645\u0647\u0646\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629..."
                                                style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 600;">
                                            <datalist id="violation-contractor-positions-list">
                                                ${R}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-department-container">
                                            <label for="violation-contractor-department" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-sitemap ml-1 text-teal-600"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *
                                            </label>
                                            <select id="violation-contractor-department" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;">
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                                ${N}
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
                                    <div id="violation-location-fields-container" class="contents" style="display: ${s?"contents":"none"};">
                                        <div>
                                            <label for="violation-employee-location" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-industry ml-1 text-emerald-600"></i> \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A *
                                            </label>
                                            <select id="violation-employee-location" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;" ${s?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-employee-place" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-compass ml-1 text-emerald-600"></i> \u0645\u0643\u0627\u0646 / \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                            </label>
                                            <select id="violation-employee-place" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;" ${s?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            </select>
                                            <div id="violation-employee-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-employee-custom-place" class="form-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F..." style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 8px;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- \u0644\u0644\u0645\u0642\u0627\u0648\u0644: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646 -->
                                    <div id="violation-contractor-location-fields-container" class="contents" style="display: ${n?"contents":"none"};">
                                        <div>
                                            <label for="violation-contractor-location" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-industry ml-1 text-emerald-600"></i> \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A *
                                            </label>
                                            <select id="violation-contractor-location" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;" ${n?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-contractor-place" class="block text-xs font-bold text-gray-700 mb-1.5">
                                                <i class="fas fa-compass ml-1 text-emerald-600"></i> \u0645\u0643\u0627\u0646 / \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                            </label>
                                            <select id="violation-contractor-place" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;" ${n?"required":""}>
                                                <option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            </select>
                                            <div id="violation-contractor-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-contractor-custom-place" class="form-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F..." style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 8px;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A -->
                                    <div>
                                        <label for="violation-date" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-calendar-alt ml-1 text-blue-600"></i> \u062A\u0627\u0631\u064A\u062E \u0631\u0635\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                        </label>
                                        <input type="date" id="violation-date" required class="form-input"
                                            value="${M}"
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 600;">
                                    </div>
                                    <div>
                                        <label for="violation-time" class="block text-xs font-bold text-gray-700 mb-1.5">
                                            <i class="fas fa-clock ml-1 text-purple-600"></i> \u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 *
                                        </label>
                                        <input type="time" id="violation-time" required class="form-input"
                                            value="${q}"
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 600;">
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
                                        <select id="violation-type" required class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 700;">
                                            <option value="">-- \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>
                                            ${y}
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
                                            style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 12px; border-radius: 9px; font-weight: 700;">
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
                                        <select id="violation-severity" required class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;">
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
                                        <select id="violation-status" required class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;">
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
                                        <select id="violation-root-cause" class="form-input" style="min-height: 44px; height: 44px; box-sizing: border-box; padding: 6px 10px; border-radius: 9px; font-weight: 600;">
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
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0635\u0648\u0631\u062A\u064A\u0646</span>
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

                                <!-- \u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 (\u0635\u0648\u0631\u062A\u064A\u0646 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u062A\u064A\u0646 \u0645\u0639 \u062E\u064A\u0627\u0631\u0627\u062A \u0643\u0627\u0645\u0644\u0629) -->
                                <div style="margin-top: 18px; padding: 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <span style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 7px; background: #e0e7ff; color: #4338ca; font-size: 13px;">
                                                <i class="fas fa-camera-retro"></i>
                                            </span>
                                            <div>
                                                <h4 style="margin: 0; font-size: 0.88rem; font-weight: 800; color: #1e293b;">
                                                    \u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 (\u0635\u0648\u0631\u062A\u064A\u0646)
                                                </h4>
                                                <p style="margin: 2px 0 0 0; font-size: 0.72rem; color: #64748b;">
                                                    \u0635\u0648\u0631\u0629 \u0644\u0645\u0634\u0647\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A (\u0642\u0628\u0644) + \u0635\u0648\u0631\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 \u062A\u0648\u062B\u064A\u0642\u064A\u0629 \u0623\u0648 \u0628\u0639\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A (\u0628\u0639\u062F)
                                                </p>
                                            </div>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <button type="button" id="violation-photos-swap-btn" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer" title="\u062A\u0628\u062F\u064A\u0644 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0635\u0648\u0631\u062A\u064A\u0646">
                                                <i class="fas fa-right-left text-indigo-600"></i>
                                                <span>\u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u062A\u064A\u0646 (\u21C4)</span>
                                            </button>
                                            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649: 2MB</span>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- \u0643\u0627\u0631\u062A \u0627\u0644\u0635\u0648\u0631\u0629 1 -->
                                        <div id="violation-photo-card-1" style="background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 12px; transition: all 0.2s;">
                                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                                <span style="font-size: 0.78rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800;">1</span>
                                                    \u0645\u0634\u0647\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629)
                                                </span>
                                                <span id="violation-photo-badge-1" style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 6px;">
                                                    ${h?"\u0645\u0631\u0641\u0642\u0629 \u2713":"\u0641\u0627\u0631\u063A"}
                                                </span>
                                            </div>

                                            <!-- \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0631\u0641\u0639 1 -->
                                            <div id="violation-photo-dropzone-1" style="border: 2px dashed #93c5fd; border-radius: 8px; background: #f8fafc; padding: 18px 10px; text-align: center; cursor: pointer; transition: all 0.2s; display: ${h?"none":"block"};">
                                                <i class="fas fa-cloud-arrow-up text-2xl text-blue-500 mb-1.5" style="display: block;"></i>
                                                <p style="margin: 0 0 3px 0; font-size: 0.8rem; font-weight: 700; color: #1e293b;">\u0627\u0646\u0642\u0631 \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0648 \u0627\u0633\u062D\u0628 \u0627\u0644\u0635\u0648\u0631\u0629 \u0647\u0646\u0627</p>
                                                <p style="margin: 0; font-size: 0.7rem; color: #64748b;">JPG, PNG \u062D\u062A\u0649 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A</p>
                                                <input type="file" id="violation-photo-input-1" accept="image/*" style="display: none;">
                                            </div>

                                            <!-- \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 1 -->
                                            <div id="violation-photo-preview-box-1" style="display: ${h?"block":"none"};">
                                                <div style="position: relative; height: 160px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1;">
                                                    <img id="violation-photo-img-1" src="${h||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 1" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                                                    <button type="button" id="violation-photo-zoom-btn-1" title="\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629" style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 6px; background: rgba(0,0,0,0.65); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                                                        <i class="fas fa-magnifying-glass-plus" style="font-size: 12px;"></i>
                                                    </button>
                                                </div>
                                                <div style="display: flex; gap: 8px; margin-top: 8px;">
                                                    <button type="button" id="violation-photo-change-btn-1" style="flex: 1; height: 32px; border-radius: 7px; background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                                                        <i class="fas fa-sync text-blue-600"></i> \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629
                                                    </button>
                                                    <button type="button" id="violation-photo-del-btn-1" style="height: 32px; padding: 0 12px; border-radius: 7px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
                                                        <i class="fas fa-trash-alt"></i> \u062D\u0630\u0641
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- \u0643\u0627\u0631\u062A \u0627\u0644\u0635\u0648\u0631\u0629 2 -->
                                        <div id="violation-photo-card-2" style="background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 12px; transition: all 0.2s;">
                                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                                <span style="font-size: 0.78rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: #059669; color: #ffffff; font-size: 11px; font-weight: 800;">2</span>
                                                    \u062A\u0648\u062B\u064A\u0642 \u0625\u0636\u0627\u0641\u064A / \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u062D\u064A\u062D
                                                </span>
                                                <span id="violation-photo-badge-2" style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 6px;">
                                                    ${U?"\u0645\u0631\u0641\u0642\u0629 \u2713":"\u0641\u0627\u0631\u063A"}
                                                </span>
                                            </div>

                                            <!-- \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0631\u0641\u0639 2 -->
                                            <div id="violation-photo-dropzone-2" style="border: 2px dashed #a7f3d0; border-radius: 8px; background: #f8fafc; padding: 18px 10px; text-align: center; cursor: pointer; transition: all 0.2s; display: ${U?"none":"block"};">
                                                <i class="fas fa-cloud-arrow-up text-2xl text-emerald-500 mb-1.5" style="display: block;"></i>
                                                <p style="margin: 0 0 3px 0; font-size: 0.8rem; font-weight: 700; color: #1e293b;">\u0627\u0646\u0642\u0631 \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0648 \u0627\u0633\u062D\u0628 \u0627\u0644\u0635\u0648\u0631\u0629 \u0647\u0646\u0627</p>
                                                <p style="margin: 0; font-size: 0.7rem; color: #64748b;">JPG, PNG \u062D\u062A\u0649 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A</p>
                                                <input type="file" id="violation-photo-input-2" accept="image/*" style="display: none;">
                                            </div>

                                            <!-- \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 2 -->
                                            <div id="violation-photo-preview-box-2" style="display: ${U?"block":"none"};">
                                                <div style="position: relative; height: 160px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1;">
                                                    <img id="violation-photo-img-2" src="${U||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 2" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                                                    <button type="button" id="violation-photo-zoom-btn-2" title="\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629" style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 6px; background: rgba(0,0,0,0.65); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                                                        <i class="fas fa-magnifying-glass-plus" style="font-size: 12px;"></i>
                                                    </button>
                                                </div>
                                                <div style="display: flex; gap: 8px; margin-top: 8px;">
                                                    <button type="button" id="violation-photo-change-btn-2" style="flex: 1; height: 32px; border-radius: 7px; background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                                                        <i class="fas fa-sync text-emerald-600"></i> \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629
                                                    </button>
                                                    <button type="button" id="violation-photo-del-btn-2" style="height: 32px; padding: 0 12px; border-radius: 7px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
                                                        <i class="fas fa-trash-alt"></i> \u062D\u0630\u0641
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0633\u0641\u0644\u064A \u0627\u0644\u0645\u062F\u0645\u062C \u0628\u0647\u0648\u064A\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0641\u0627\u062E\u0631\u0629 -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="font-size: 0.82rem; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-shield-check text-emerald-600 text-sm"></i>
                                <span>\u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0648\u0633\u0648\u0645\u0629 \u0628\u0640 (*) \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0631\u0633\u0645\u064A</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="height: 44px; padding: 0 22px; border-radius: 10px; font-weight: 700; font-size: 0.90rem; background: #ffffff; border: 1.5px solid #cbd5e1; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                                    <i class="fas fa-times"></i> \u0625\u0644\u063A\u0627\u0621
                                </button>
                                <button type="submit" id="violation-submit-btn" class="btn-primary" style="height: 44px; padding: 0 28px; border-radius: 10px; font-weight: 800; font-size: 0.94rem; background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%); color: #ffffff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.35); transition: all 0.2s ease;">
                                    <i class="fas fa-save"></i> ${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(x);const j=document.getElementById("violation-person-type"),it=document.getElementById("violation-employee-code-container"),z=document.getElementById("violation-employee-code"),nt=document.getElementById("violation-person-name"),bt=document.getElementById("violation-person-name-label"),vt=document.getElementById("violation-employee-details-grid"),At=document.getElementById("violation-contractor-company-container"),ot=document.getElementById("violation-contractor-select");if(ot){const g=t?.contractorName||"",L=t?.contractorId||"";this.loadContractorsIntoSelect(ot,g,L)}const ge=document.getElementById("violation-employee-position-container"),ve=document.getElementById("violation-employee-department-container"),ye=document.getElementById("violation-employee-position"),be=document.getElementById("violation-employee-department"),$t=document.getElementById("violation-contractor-fields-container"),he=document.getElementById("violation-contractor-worker-container"),xe=document.getElementById("violation-contractor-position-container"),we=document.getElementById("violation-contractor-department-container"),Lt=document.getElementById("violation-contractor-worker"),_t=document.getElementById("violation-contractor-position"),Ut=document.getElementById("violation-contractor-department"),Tt=document.getElementById("violation-location-fields-container"),Ct=document.getElementById("violation-contractor-location-fields-container"),ct=document.getElementById("violation-type"),dt=document.getElementById("violation-fine-amount"),re=new Map((c||[]).map(g=>[String(g.id||"").trim(),g])),le=new Map((c||[]).map(g=>[String(g.name||"").trim().toLowerCase(),g])),Ot=()=>{const g=ct?.selectedOptions?.[0],L=g?.getAttribute("data-type-id")||"",C=(ct?.value||"").trim().toLowerCase(),_=L&&re.get(L)||C&&le.get(C)||null,w=Number(g?.getAttribute("data-fine-amount")||0),V=Number(_?.fineAmount??w??0);return Number.isFinite(V)&&V>=0?V:0},It=({force:g=!1}={})=>{if(!dt)return;const L=Ot();(g||!m||dt.value==="")&&(dt.value=String(L))},Mt=()=>{const g=ct?.value||"",{detailsChips:L,actionChips:C}=this.getViolationSuggestionChips(g),_=x.querySelector("#violation-details-chips"),w=x.querySelector("#violation-action-chips"),V=x.querySelector("#violation-details"),F=x.querySelector("#violation-action");_&&(_.innerHTML="",L.forEach(P=>{const k=document.createElement("button");k.type="button",k.style.cssText=`
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
                    `,k.onmouseenter=()=>{k.style.background="#fef3c7",k.style.borderColor="#f59e0b",k.style.color="#92400e",k.style.transform="translateY(-1px)",k.style.boxShadow="0 2px 4px rgba(245, 158, 11, 0.15)"},k.onmouseleave=()=>{k.style.background="#fffbeb",k.style.borderColor="#fde68a",k.style.color="#78350f",k.style.transform="translateY(0)",k.style.boxShadow="0 1px 2px rgba(0,0,0,0.03)"},k.innerHTML=`<i class="fas fa-plus" style="color: #d97706; font-size: 10px;"></i><span>${Utils.escapeHTML(P)}</span>`,k.addEventListener("click",()=>{if(!V)return;const O=V.value.trim();O?O.includes(P)||(V.value=O+" - "+P):V.value=P,V.focus()}),_.appendChild(k)})),w&&(w.innerHTML="",C.forEach(P=>{const k=document.createElement("button");k.type="button",k.style.cssText=`
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
                    `,k.onmouseenter=()=>{k.style.background="#e0e7ff",k.style.borderColor="#6366f1",k.style.color="#1e1b4b",k.style.transform="translateY(-1px)",k.style.boxShadow="0 2px 4px rgba(99, 102, 241, 0.15)"},k.onmouseleave=()=>{k.style.background="#eef2ff",k.style.borderColor="#c7d2fe",k.style.color="#312e81",k.style.transform="translateY(0)",k.style.boxShadow="0 1px 2px rgba(0,0,0,0.03)"},k.innerHTML=`<i class="fas fa-bolt" style="color: #6366f1; font-size: 10px;"></i><span>${Utils.escapeHTML(P)}</span>`,k.addEventListener("click",()=>{F&&(F.value=P,F.focus())}),w.appendChild(k)}))};dt&&(dt.readOnly=!m),ct&&(ct.addEventListener("change",()=>{It({force:!0}),Mt()}),ct.addEventListener("input",()=>{It({force:!0}),Mt()})),dt&&m&&t&&t.fineAmount!==void 0&&t.fineAmount!==null?dt.value=String(Number(i)):It({force:!0}),Mt(),j.addEventListener("change",g=>{if(g.target.value==="employee"){if(it&&(it.style.display="block"),z&&(z.required=!0,z.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"),vt&&(vt.style.display="grid"),At&&(At.style.display="none"),ot&&(ot.required=!1),$t&&($t.style.display="none"),Tt&&(Tt.style.display="contents"),Ct&&(Ct.style.display="none"),this.loadLocationOptions("employee").then(()=>{const C=document.getElementById("violation-employee-location");if(C){const _=C.cloneNode(!0);C.parentNode.replaceChild(_,C);const w=document.getElementById("violation-employee-location");w&&w.addEventListener("change",V=>{const F=V.target.value;this.loadPlaceOptions(F,"","employee"),this.refreshAreaHotspotInModal(x,a?t?.id:null)})}}),typeof EmployeeHelper<"u"&&z&&z.parentNode)try{const C=z.cloneNode(!0);z.parentNode.replaceChild(C,z),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",w=>{if(w){const V=document.getElementById("violation-person-name"),F=document.getElementById("violation-employee-position"),P=document.getElementById("violation-employee-department");V&&(V.value=w.name||""),F&&(F.value=w.position||w.jobTitle||""),P&&(P.value=w.department||w.section||"")}st()})}catch(C){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",C)}}else It({force:!0}),it&&(it.style.display="none"),z&&(z.required=!1,z.value=""),vt&&(vt.style.display="none"),At&&(At.style.display="block"),ot&&(ot.required=!0,this.loadContractorsIntoSelect(ot)),$t&&($t.style.display="block"),Tt&&(Tt.style.display="none"),Ct&&(Ct.style.display="contents"),this.loadLocationOptions("contractor").then(()=>{const C=document.getElementById("violation-contractor-location");if(C){const _=C.cloneNode(!0);C.parentNode.replaceChild(_,C);const w=document.getElementById("violation-contractor-location");w&&w.addEventListener("change",V=>{const F=V.target.value;this.loadPlaceOptions(F,"","contractor"),this.refreshAreaHotspotInModal(x,a?t?.id:null)})}});st(),this.refreshAreaHotspotInModal(x,a?t?.id:null)});const Wt=()=>{const g=(Lt?.value||"").trim().toLowerCase();if(g){const L=(AppState.appData?.violations||[]).find(C=>C&&(C.contractorWorker||"").trim().toLowerCase()===g);L&&(_t&&!_t.value&&L.contractorPosition&&(_t.value=L.contractorPosition),ot&&!ot.value&&L.contractorName&&(ot.value=L.contractorName),Ut&&!Ut.value&&L.contractorDepartment&&(Ut.value=L.contractorDepartment))}st()};Lt&&(Lt.addEventListener("input",Wt),Lt.addEventListener("change",Wt));const st=()=>{clearTimeout(this._violationSeqBadgeTimer),this._violationSeqBadgeTimer=setTimeout(()=>{this.refreshViolationSequenceBadgeInModal(x,a?t?.id:null)},180)};if(x.addEventListener("input",st),x.addEventListener("change",st),setTimeout(st,300),typeof EmployeeHelper<"u"&&t?.employeeName&&z&&z.parentNode)try{const g=z.cloneNode(!0);z.parentNode.replaceChild(g,z),document.getElementById("violation-employee-code")&&EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",C=>{if(C){const _=document.getElementById("violation-person-name"),w=document.getElementById("violation-employee-position"),V=document.getElementById("violation-employee-department");_&&(_.value=C.name||""),w&&(w.value=C.position||C.jobTitle||""),V&&(V.value=C.department||C.section||"")}st()})}catch(g){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",g)}const Vt=n?"contractor":"employee";setTimeout(async()=>{await this.loadLocationOptions("employee"),await this.loadLocationOptions("contractor");const g=document.getElementById("violation-employee-location"),L=document.getElementById("violation-employee-place"),C=document.getElementById("violation-employee-custom-place-box");if(g&&L){const F=g.cloneNode(!0);g.parentNode.replaceChild(F,g);const P=L.cloneNode(!0);L.parentNode.replaceChild(P,L);const k=document.getElementById("violation-employee-location"),O=document.getElementById("violation-employee-place");k&&k.addEventListener("change",Q=>{const wt=Q.target.value;this.loadPlaceOptions(wt,"","employee"),this.refreshAreaHotspotInModal(x,a?t?.id:null)}),O&&O.addEventListener("change",Q=>{C&&(C.classList.toggle("hidden",Q.target.value!=="__custom__"),Q.target.value==="__custom__"&&document.getElementById("violation-employee-custom-place")?.focus()),this.refreshAreaHotspotInModal(x,a?t?.id:null)})}const _=document.getElementById("violation-contractor-location"),w=document.getElementById("violation-contractor-place"),V=document.getElementById("violation-contractor-custom-place-box");if(_&&w){const F=_.cloneNode(!0);_.parentNode.replaceChild(F,_);const P=w.cloneNode(!0);w.parentNode.replaceChild(P,w);const k=document.getElementById("violation-contractor-location"),O=document.getElementById("violation-contractor-place");k&&k.addEventListener("change",Q=>{const wt=Q.target.value;this.loadPlaceOptions(wt,"","contractor"),this.refreshAreaHotspotInModal(x,a?t?.id:null)}),O&&O.addEventListener("change",Q=>{V&&(V.classList.toggle("hidden",Q.target.value!=="__custom__"),Q.target.value==="__custom__"&&document.getElementById("violation-contractor-custom-place")?.focus()),this.refreshAreaHotspotInModal(x,a?t?.id:null)})}if(Vt==="employee"&&j.value==="employee"&&typeof EmployeeHelper<"u"&&document.getElementById("violation-employee-code"))try{EmployeeHelper.setupEmployeeCodeSearch("violation-employee-code","violation-person-name",P=>{if(P){const k=document.getElementById("violation-person-name"),O=document.getElementById("violation-employee-position"),Q=document.getElementById("violation-employee-department");k&&(k.value=P.name||""),O&&(O.value=P.position||P.jobTitle||""),Q&&(Q.value=P.department||P.section||"")}st()})}catch(P){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:",P)}},100),r&&setTimeout(()=>{if(Vt==="employee"){const g=document.getElementById("violation-employee-location");g&&(g.value=r,r&&this.loadPlaceOptions(r,l,"employee"))}else if(Vt==="contractor"){const g=document.getElementById("violation-contractor-location");g&&(g.value=r,r&&this.loadPlaceOptions(r,l,"contractor"))}setTimeout(()=>{this.refreshAreaHotspotInModal(x,a?t?.id:null)},250)},200);let tt=h,et=U;const ht=()=>{const g=x.querySelector("#violation-photo-dropzone-1"),L=x.querySelector("#violation-photo-preview-box-1"),C=x.querySelector("#violation-photo-img-1"),_=x.querySelector("#violation-photo-badge-1"),w=x.querySelector("#violation-photo-card-1");tt?(g&&(g.style.display="none"),L&&(L.style.display="block"),C&&(C.src=tt),_&&(_.textContent="\u0645\u0631\u0641\u0642\u0629 \u2713",_.style.color="#15803d",_.style.background="#dcfce7"),w&&(w.style.borderStyle="solid")):(g&&(g.style.display="block"),L&&(L.style.display="none"),C&&(C.src=""),_&&(_.textContent="\u0641\u0627\u0631\u063A",_.style.color="#64748b",_.style.background="#f1f5f9"),w&&(w.style.borderStyle="dashed"));const V=x.querySelector("#violation-photo-dropzone-2"),F=x.querySelector("#violation-photo-preview-box-2"),P=x.querySelector("#violation-photo-img-2"),k=x.querySelector("#violation-photo-badge-2"),O=x.querySelector("#violation-photo-card-2");et?(V&&(V.style.display="none"),F&&(F.style.display="block"),P&&(P.src=et),k&&(k.textContent="\u0645\u0631\u0641\u0642\u0629 \u2713",k.style.color="#15803d",k.style.background="#dcfce7"),O&&(O.style.borderStyle="solid")):(V&&(V.style.display="block"),F&&(F.style.display="none"),P&&(P.src=""),k&&(k.textContent="\u0641\u0627\u0631\u063A",k.style.color="#64748b",k.style.background="#f1f5f9"),O&&(O.style.borderStyle="dashed"))},Dt=async(g,L)=>{if(g){if(g.size>2*1024*1024){typeof Notification<"u"&&Notification.warning("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),mt("warning","\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B","\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 \u0647\u0648 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A.");return}try{const C=await Violations.convertImageToBase64(g);L===1?tt=C:et=C,ht()}catch(C){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0635\u0648\u0631\u0629:",C)}}},pt=x.querySelector("#violation-photo-input-1"),rt=x.querySelector("#violation-photo-dropzone-1"),Kt=x.querySelector("#violation-photo-change-btn-1"),Gt=x.querySelector("#violation-photo-del-btn-1"),Xt=x.querySelector("#violation-photo-zoom-btn-1"),Pt=x.querySelector("#violation-photo-img-1");rt&&pt&&(rt.addEventListener("click",()=>pt.click()),rt.addEventListener("dragover",g=>{g.preventDefault(),rt.style.background="#dbeafe"}),rt.addEventListener("dragleave",()=>{rt.style.background="#f8fafc"}),rt.addEventListener("drop",g=>{g.preventDefault(),rt.style.background="#f8fafc",g.dataTransfer?.files?.[0]&&Dt(g.dataTransfer.files[0],1)}),pt.addEventListener("change",g=>{g.target.files?.[0]&&Dt(g.target.files[0],1)})),Kt&&pt&&Kt.addEventListener("click",()=>pt.click()),Gt&&Gt.addEventListener("click",()=>{tt="",pt&&(pt.value=""),ht()}),Xt&&Xt.addEventListener("click",()=>{tt&&Violations.openPhotoLightbox(tt,"\u0645\u0634\u0647\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 (\u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629)")}),Pt&&(Pt.style.cursor="pointer",Pt.addEventListener("click",()=>{tt&&Violations.openPhotoLightbox(tt,"\u0645\u0634\u0647\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 (\u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629)")}));const ft=x.querySelector("#violation-photo-input-2"),lt=x.querySelector("#violation-photo-dropzone-2"),Yt=x.querySelector("#violation-photo-change-btn-2"),Qt=x.querySelector("#violation-photo-del-btn-2"),Jt=x.querySelector("#violation-photo-zoom-btn-2"),Bt=x.querySelector("#violation-photo-img-2");lt&&ft&&(lt.addEventListener("click",()=>ft.click()),lt.addEventListener("dragover",g=>{g.preventDefault(),lt.style.background="#d1fae5"}),lt.addEventListener("dragleave",()=>{lt.style.background="#f8fafc"}),lt.addEventListener("drop",g=>{g.preventDefault(),lt.style.background="#f8fafc",g.dataTransfer?.files?.[0]&&Dt(g.dataTransfer.files[0],2)}),ft.addEventListener("change",g=>{g.target.files?.[0]&&Dt(g.target.files[0],2)})),Yt&&ft&&Yt.addEventListener("click",()=>ft.click()),Qt&&Qt.addEventListener("click",()=>{et="",ft&&(ft.value=""),ht()}),Jt&&Jt.addEventListener("click",()=>{et&&Violations.openPhotoLightbox(et,"\u0635\u0648\u0631\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 / \u0628\u0639\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")}),Bt&&(Bt.style.cursor="pointer",Bt.addEventListener("click",()=>{et&&Violations.openPhotoLightbox(et,"\u0635\u0648\u0631\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 / \u0628\u0639\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A")}));const Zt=x.querySelector("#violation-photos-swap-btn");Zt&&Zt.addEventListener("click",()=>{if(!tt&&!et){typeof Notification<"u"&&Notification.info("\u064A\u0631\u062C\u0649 \u0625\u0631\u0641\u0627\u0642 \u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u062A\u0628\u062F\u064A\u0644 \u0645\u0643\u0627\u0646\u0647\u0627");return}const g=tt;tt=et,et=g,ht(),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0628\u062F\u064A\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0635\u0648\u0631\u062A\u064A\u0646 (\u21C4)")}),ht();const ut=x.querySelector("#violation-form"),xt=x.querySelector("#violation-submit-btn")||ut?.querySelector('button[type="submit"]');if(!ut||!xt){AppState.debugMode&&Utils.safeError("\u274C \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648 \u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}if(xt.parentNode){const g=xt.cloneNode(!0);g.disabled=!1,g.removeAttribute("aria-busy"),xt.parentNode.replaceChild(g,xt)}let Nt=!1;const zt=()=>x.querySelector("#violation-submit-btn")||ut.querySelector('button[type="submit"]'),ce=this._t("module.violations.submit.saving","\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."),mt=(g,L,C)=>{const _=x.querySelector("#violation-form-banner"),w=x.querySelector("#violation-form-banner-icon"),V=x.querySelector("#violation-form-banner-title"),F=x.querySelector("#violation-form-banner-text");if(!_||!w||!V||!F)return;const P={error:{bg:"#fef2f2",border:"#fecaca",text:"#991b1b",icon:"fa-circle-xmark text-red-600"},warning:{bg:"#fffbeb",border:"#fde68a",text:"#92400e",icon:"fa-triangle-exclamation text-amber-600"},success:{bg:"#ecfdf5",border:"#a7f3d0",text:"#065f46",icon:"fa-circle-check text-emerald-600"},info:{bg:"#eff6ff",border:"#bfdbfe",text:"#1e40af",icon:"fa-circle-info text-blue-600"}},k=P[g]||P.info;_.style.background=k.bg,_.style.borderColor=k.border,_.style.color=k.text,w.className="fas "+k.icon+" text-lg mt-0.5",V.textContent=L||"",F.textContent=C||"",_.classList.remove("hidden");try{const O=x.querySelector(".modal-body");O&&O.scrollTo({top:0,behavior:"smooth"})}catch{}},te=()=>{const g=x.querySelector("#violation-form-banner");g&&g.classList.add("hidden")},ee=x.querySelector("#violation-form-banner-close");ee&&ee.addEventListener("click",te);const ie=async g=>{if(g&&(g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation()),Nt||this._violationSubmitLock||ut.dataset.submitting==="1"){typeof Notification<"u"&&Notification.warning&&Notification.warning(this._t("module.violations.duplicate.click","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0622\u0646. \u0644\u0627 \u062A\u0636\u063A\u0637 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")),AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");return}Nt=!0,this._violationSubmitLock=!0,ut.dataset.submitting="1";const L=zt(),C=L?L.innerHTML:"",_=()=>{Nt=!1,this._violationSubmitLock=!1,this._violationInflightDupKey="";try{ut.dataset.submitting=""}catch{}const w=zt();w&&(w.disabled=!1,w.removeAttribute("aria-busy"),w.innerHTML=C)};L&&(L.disabled=!0,L.setAttribute("aria-busy","true"),L.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> '+ce);try{const w=document.getElementById("violation-person-type")?.value,V=document.getElementById("violation-date")?.value,F=document.getElementById("violation-time")?.value,P=document.getElementById("violation-type")?.value,k=document.getElementById("violation-severity")?.value,O=document.getElementById("violation-status")?.value,Q=document.getElementById("violation-details")?.value.trim()||"",wt=document.getElementById("violation-action")?.value.trim()||"",de=document.getElementById("violation-root-cause")?.value.trim()||"",Et=document.getElementById("violation-fine-amount")?.value;let Ht="";if(Et!==""&&Et!==null&&Et!==void 0){const $=this.parseFineAmount(Et);Number.isFinite($)&&$>=0&&(Ht=$)}else Ht=this.parseFineAmount(Ot());const Y=[];w||Y.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"),V||Y.push("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),F||Y.push("\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),P||Y.push("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),k||Y.push("\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),O||Y.push("\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629");let St="",ne="";if(w==="employee"){const $=document.getElementById("violation-employee-code")?.value.trim();St=document.getElementById("violation-person-name")?.value.trim(),$||Y.push("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"),St||Y.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")}else if(w==="contractor"){const $=document.getElementById("violation-contractor-select");if(!$||!$.value)Y.push("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");else{St=$.value;const W=$.options[$.selectedIndex];ne=W?.dataset.contractorCode||W?.dataset.contractorId||""}document.getElementById("violation-contractor-department")?.value.trim()||Y.push("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")}let yt="",kt="",at="",gt="";if(w==="employee"){const $=document.getElementById("violation-employee-location"),I=document.getElementById("violation-employee-place");if(yt=$?.value||"",kt=$?.options[$?.selectedIndex]?.text||"",at=I?.value||"",gt=I?.options[I?.selectedIndex]?.text||"",at==="__custom__"){const W=document.getElementById("violation-employee-custom-place")?.value.trim()||"";at=W,gt=W}}else if(w==="contractor"){const $=document.getElementById("violation-contractor-location"),I=document.getElementById("violation-contractor-place");if(yt=$?.value||"",kt=$?.options[$?.selectedIndex]?.text||"",at=I?.value||"",gt=I?.options[I?.selectedIndex]?.text||"",at==="__custom__"){const W=document.getElementById("violation-contractor-custom-place")?.value.trim()||"";at=W,gt=W}}if(yt||Y.push("\u0627\u0644\u0645\u0648\u0642\u0639"),at||Y.push("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),Y.length>0){mt("error","\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0646\u0627\u0642\u0635\u0629","\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644: "+Y.join("\u060C ")),_(),Y.forEach($=>{let I="";if($.includes("\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")?I="violation-employee-code":$.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641")?I="violation-person-name":$.includes("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?I="violation-contractor-select":$.includes("\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644")?I="violation-contractor-department":$.includes("\u062A\u0627\u0631\u064A\u062E")?I="violation-date":$.includes("\u0648\u0642\u062A")?I="violation-time":$.includes("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")?I="violation-type":$.includes("\u0627\u0644\u0634\u062F\u0629")?I="violation-severity":$.includes("\u0627\u0644\u062D\u0627\u0644\u0629")?I="violation-status":$.includes("\u0627\u0644\u0645\u0648\u0642\u0639")?I=w==="employee"?"violation-employee-location":"violation-contractor-location":$.includes("\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629")&&(I=w==="employee"?"violation-employee-place":"violation-contractor-place"),I){const W=document.getElementById(I);W&&(W.classList.add("border-red-500","ring-2","ring-red-300"),W.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{W.classList.remove("border-red-500","ring-2","ring-red-300")},3e3))}});return}const Ft=tt||"",Rt=et||"",pe=[Ft,Rt].filter(Boolean);te();const fe=ct?.selectedOptions?.[0]?.getAttribute("data-type-id")||"",se=V&&F?new Date(`${V}T${F}`).toISOString():new Date().toISOString(),H={id:t?.id||Utils.generateId("VIOLATION"),isoCode:t?.isoCode||generateISOCode("VIOL",AppState.appData.violations||[]),personType:w,employeeId:w==="employee"?t?.employeeId||Utils.generateId("EMP"):"",employeeName:w==="employee"?St:"",employeeCode:w==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeeNumber:w==="employee"&&document.getElementById("violation-employee-code")?.value.trim()||"",employeePosition:w==="employee"&&document.getElementById("violation-employee-position")?.value.trim()||"",employeeDepartment:w==="employee"&&document.getElementById("violation-employee-department")?.value.trim()||"",contractorId:w==="contractor"?ne:"",contractorName:w==="contractor"?St:"",contractorWorker:w==="contractor"&&document.getElementById("violation-contractor-worker")?.value.trim()||"",contractorPosition:w==="contractor"&&document.getElementById("violation-contractor-position")?.value.trim()||"",contractorDepartment:w==="contractor"&&document.getElementById("violation-contractor-department")?.value.trim()||"",violationTypeId:fe,violationType:P,fineAmount:this.parseFineAmount(Ht),violationDate:se,violationTime:F,violationLocation:kt&&kt!=="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --"?kt:yt,violationLocationId:yt?String(yt).trim():null,violationPlace:gt&&gt!=="-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --"?gt:at,violationPlaceId:at?String(at).trim():null,violationDetails:Q,severity:k,actionTaken:wt,status:O,rootCause:de||t?.rootCause||"\u0633\u0644\u0648\u0643 \u063A\u064A\u0631 \u0622\u0645\u0646 (Unsafe Act)",photo:Ft,photo2:Rt,photos:pe,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),violationDateKey:"",violationTimeKey:""};H.violationDateKey=this._violationDateKey(H),H.violationTimeKey=this._violationTimeKey(H);const ue={personType:w,violationDate:se,employeeCode:H.employeeCode,employeeNumber:H.employeeNumber,contractorName:H.contractorName,contractorWorker:H.contractorWorker},me=this.countPriorViolationsSamePersonMonth(ue,a&&t?.id?t.id:null);H.violationSequenceInMonth=me+1;const qt=this.findDuplicateViolation(H,{excludeId:a&&t?.id?t.id:null});if(qt){const $=this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"),I=qt.source==="pending"?this._t("module.violations.duplicate.pending","\u0637\u0644\u0628 \u0645\u0645\u0627\u062B\u0644 \u0645\u0639\u0644\u0651\u0642 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0625\u0631\u0633\u0627\u0644."):qt.source==="inflight"?this._t("module.violations.duplicate.click","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0622\u0646. \u0644\u0627 \u062A\u0636\u063A\u0637 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."):this._t("module.violations.duplicate.text","\u0646\u0641\u0633 \u0627\u0644\u0645\u0648\u0638\u0641 \u0623\u0648 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0646\u0641\u0633 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u062C\u0648\u062F\u0629 \u0628\u0627\u0644\u0641\u0639\u0644. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u062A\u0633\u062C\u064A\u0644.");mt("warning",$,I),typeof Notification<"u"&&Notification.warning&&Notification.warning($),_();return}this._violationInflightDupKey=this._buildViolationDupKey(H);try{const $=await this.checkViolationApprovalGate(H,{isEdit:a});if($&&$.requiresApproval){let I=photo;if(I&&typeof I=="string"&&I.startsWith("data:"))try{L.innerHTML='<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...';const J=await GoogleIntegration.uploadFileToDrive?.(I,`violation_${H.id}_${Date.now()}.jpg`,"image/jpeg","Violations");J&&J.success?I=J.directLink||J.shareableLink||"":(I="",mt("warning","\u062A\u0639\u0630\u0651\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629","\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u062F\u0648\u0646 \u0627\u0644\u0635\u0648\u0631\u0629. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0623\u0648 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0627\u062D\u0642\u0627\u064B.")),L.innerHTML=C,L.disabled=!0,L.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'}catch(J){AppState.debugMode&&Utils.safeWarn("Drive upload failed in approval path:",J),I=""}const W={...H,photo:I},X=await this.submitViolationForApproval(W,{isEdit:a,originalId:t?.id});if(X&&X.success){this._rememberViolationDupKey(H),this._violationInflightDupKey="",this._violationSubmitLock=!1,this._invalidateViolationApprovalRequestsCache(),x.remove(),Notification.success(X.message||"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627.");try{document.dispatchEvent(new CustomEvent("violation-approval-request-created",{detail:X.data||{}}))}catch{}return}else if(X&&X.duplicate){_(),mt("warning",this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"),X.message||this._t("module.violations.duplicate.pending","\u0637\u0644\u0628 \u0645\u0645\u0627\u062B\u0644 \u0645\u0639\u0644\u0651\u0642 \u0641\u064A \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u0644\u0646 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0625\u0631\u0633\u0627\u0644.")),typeof Notification<"u"&&Notification.warning&&Notification.warning(this._t("module.violations.duplicate.title","\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0633\u0628\u0642\u0627\u064B"));return}else{_();const J=X&&X.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";mt("error","\u062A\u0639\u0630\u0651\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",J);return}}}catch($){AppState.debugMode&&Utils.safeWarn("approvalGate error (continuing with direct save):",$)}if(AppState.appData.violations||(AppState.appData.violations=[]),a&&t?.id){const $=AppState.appData.violations.findIndex(I=>I.id===t.id);if($!==-1)AppState.appData.violations[$]={...AppState.appData.violations[$],...H,id:t.id,isoCode:t.isoCode||H.isoCode,createdAt:t.createdAt||H.createdAt,updatedAt:new Date().toISOString()};else throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}else AppState.appData.violations.push(H);this._rememberViolationDupKey(H),this._violationInflightDupKey="",this._violationSubmitLock=!1,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),x.remove(),Notification.success(`\u062A\u0645 ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629...`);try{this.updateAllViolationsStats()}catch{}try{typeof Dashboard<"u"&&(typeof Dashboard.updateStats=="function"&&Dashboard.updateStats(),typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics())}catch{}try{document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"violations",action:a?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:H}}))}catch{}try{typeof Violations<"u"&&typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations<"u"&&Violations.load&&Violations.load()}catch{}(async($,I)=>{let W=$,X=I,J=!1;if($&&$.startsWith("data:"))try{const G=await GoogleIntegration.uploadFileToDrive?.($,`violation_${H.id}_photo1_${Date.now()}.jpg`,"image/jpeg","Violations");G?.success&&(W=G.directLink||G.shareableLink||$,J=!0)}catch(G){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 1 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",G)}if(I&&I.startsWith("data:"))try{const G=await GoogleIntegration.uploadFileToDrive?.(I,`violation_${H.id}_photo2_${Date.now()}.jpg`,"image/jpeg","Violations");G?.success&&(X=G.directLink||G.shareableLink||I,J=!0)}catch(G){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 2 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",G)}if(J){const G=AppState.appData.violations||[],Z=G.findIndex(jt=>jt.id===H.id);Z!==-1&&(G[Z].photo=W,G[Z].photo2=X,G[Z].photos=[W,X].filter(Boolean),H.photo=W,H.photo2=X,H.photos=[W,X].filter(Boolean),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Violations<"u"&&Violations.load&&Violations.load())}try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const G=Object.assign({},H,{photo:W,photo2:X,photos:[W,X].filter(Boolean)});let Z;if(a?Z=await GoogleIntegration.sendRequest({action:"updateViolation",data:{violationId:H.id,updateData:G}}):Z=await GoogleIntegration.sendRequest({action:"addViolation",data:G}),Z&&(Z.success===!0||Z.duplicate===!0)){try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}AppState.debugMode&&Utils.safeLog("\u2705 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D")}else{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",Z&&Z.message);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}}}catch(G){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",G);try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Violations",AppState.appData.violations)}catch{}}})(Ft,Rt).catch($=>{Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",$)})}catch(w){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",w),mt("error","\u062D\u062F\u062B \u062E\u0637\u0623",w&&(w.message||w.toString())||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"),_()}};ut.addEventListener("submit",ie,{once:!1});const oe=zt();oe&&oe.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),ie(g)}),x.addEventListener("click",g=>{g.target===x&&x.remove()});const ae=g=>{g.key==="Escape"&&document.body.contains(x)&&(x.remove(),document.removeEventListener("keydown",ae))};document.addEventListener("keydown",ae)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(n){return String(n??"")},i='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(n){return'<option value="'+t(n.id)+'">'+t(n.name)+"</option>"}).join(""),a=document.getElementById("blacklist-factory");if(a&&a.tagName==="SELECT"){var o=a.value;a.innerHTML=i,o&&(a.value=o)}}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Violations.refreshSiteDropdowns:",n)}},getPlaceOptions(e){try{if(!e)return[];const t=new Map,i=(l,c)=>{const d=String(c||"").trim();if(!d||d.includes("-- \u0627\u062E\u062A\u0631")||d==="\u0645\u0643\u0627\u0646 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")return;const p=d.toLowerCase();t.has(p)||t.set(p,{id:l||Utils.generateId("PLACE"),name:d})},a=this.getSiteOptions(),o=String(e).trim().toLowerCase(),n=a.find(l=>String(l.id).trim().toLowerCase()===o||String(l.name).trim().toLowerCase()===o),s=n?n.name:e;if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const l=Permissions.formSettingsState.sites.find(c=>String(c.id).toLowerCase()===o||String(c.name).toLowerCase()===o);l&&Array.isArray(l.places)&&l.places.forEach(c=>i(c.id||c.placeId,c.name||c.placeName))}if(Array.isArray(AppState.appData?.observationSites)){const l=AppState.appData.observationSites.find(c=>String(c.id).toLowerCase()===o||String(c.siteId).toLowerCase()===o||String(c.name).toLowerCase()===o);l&&(l.places||l.locations||l.children||l.areas||[]).forEach(d=>i(d.id||d.placeId,d.name||d.placeName||d.title||d.label))}return(AppState.appData?.violations||[]).forEach(l=>{if(!l)return;const c=String(l.violationLocation||"").trim().toLowerCase(),d=String(l.violationLocationId||"").trim().toLowerCase();(c===o||d===o||s&&c===String(s).toLowerCase())&&l.violationPlace&&i(l.violationPlaceId,l.violationPlace)}),["\u0639\u0646\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u0648\u0627\u0644\u062A\u063A\u0644\u064A\u0641","\u0645\u0633\u062A\u0648\u062F\u0639 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0627\u0645","\u0645\u0633\u062A\u0648\u062F\u0639 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0644\u062A\u0627\u0645","\u063A\u0631\u0641\u0629 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u064A\u0639\u064A","\u0645\u062D\u0637\u0629 \u0627\u0644\u0645\u062D\u0648\u0644\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0648\u0631\u0634\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629","\u0648\u0631\u0634\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u062D\u0646 \u0648\u0627\u0644\u062A\u0641\u0631\u064A\u063A (Ramps)","\u0645\u0628\u0646\u0649 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u0643\u0627\u062A\u0628","\u0645\u0639\u0645\u0644 \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A","\u0645\u0646\u0637\u0642\u0629 \u062A\u062E\u0631\u064A\u062F \u0627\u0644\u0646\u0641\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A","\u0645\u0645\u0631 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0647\u0631\u0648\u0628 \u0627\u0644\u0631\u0626\u064A\u0633\u064A","\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062E\u0632\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0636\u062E\u0627\u062A"].forEach(l=>i(null,l)),Array.from(t.values())}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t),[]}},async loadLocationOptions(e="employee"){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=this.getSiteOptions(),i=e==="employee"?"violation-employee-location":"violation-contractor-location",a=document.getElementById(i);if(!a)return;a.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',t&&t.length>0&&t.forEach(o=>{const n=document.createElement("option");n.value=o.name||o.id,n.textContent=o.name||o.id,a.appendChild(n)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t)}},loadPlaceOptions(e,t="",i="employee"){try{const a=i==="employee"?"violation-employee-place":"violation-contractor-place",o=document.getElementById(a);if(!o)return;o.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 --</option>';const n=this.getPlaceOptions(e);let s=!1;if(n&&n.length>0&&n.forEach(c=>{const d=document.createElement("option");d.value=c.name,d.textContent=c.name,t&&(c.id===t||c.name===t)&&(d.selected=!0,s=!0),o.appendChild(d)}),t&&!s&&t!=="__custom__"){const c=document.createElement("option");c.value=t,c.textContent=t,c.selected=!0,o.appendChild(c)}const r=document.createElement("option");r.value="__custom__",r.textContent="\u2795 \u0645\u0643\u0627\u0646 \u0622\u062E\u0631 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A \u0645\u062E\u0635\u0635)...",o.appendChild(r);const l=document.querySelector(".modal-overlay");l&&this.refreshAreaHotspotInModal(l)}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",a)}},async convertImageToBase64(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=i,a.readAsDataURL(e)})},openPhotoLightbox(e,t="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"){if(!e)return;const i=document.createElement("div");i.className="modal-overlay",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);",i.innerHTML=`
            <div style="position:relative;max-width:92vw;max-height:92vh;display:flex;flex-direction:column;background:#1e293b;border-radius:12px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);">
                <div style="padding:10px 16px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;">
                    <span style="font-size:0.9rem;font-weight:700;"><i class="fas fa-image text-blue-400 ml-2"></i>${Utils.escapeHTML(t)}</span>
                    <button type="button" class="lightbox-close-btn" style="color:#94a3b8;background:none;border:none;font-size:1.1rem;cursor:pointer;padding:4px 8px;border-radius:6px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="padding:10px;display:flex;align-items:center;justify-content:center;background:#020617;overflow:auto;">
                    <img src="${Utils.escapeHTML(e)}" alt="\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629" style="max-width:100%;max-height:80vh;object-fit:contain;border-radius:6px;">
                </div>
            </div>
        `,document.body.appendChild(i);const a=()=>i.remove();i.querySelector(".lightbox-close-btn")?.addEventListener("click",a),i.addEventListener("click",n=>{n.target===i&&a()});const o=n=>{n.key==="Escape"&&(a(),document.removeEventListener("keydown",o))};document.addEventListener("keydown",o)},async viewViolation(e){const t=AppState.appData?.violations?.find(r=>r.id===e);if(!t){typeof Notification<"u"&&Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=this.normalizeViolationRecord(t)||t;if(!this.isViolationVisibleToCurrentUser(i)){typeof Notification<"u"&&Notification.error("\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0645\u062E\u0627\u0644\u0641\u0629 \u062A\u0627\u0628\u0639\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0623\u062E\u0631\u0649");return}const a=String(i.severity||"").trim(),o=String(i.status||"").trim(),n=typeof this.getPersonViolationHistory=="function"?this.getPersonViolationHistory(i,i.id):null,s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                                ${n?`
                                    <span class="badge" style="background: ${n.strikeLevel>=3?"#fee2e2":n.strikeLevel===2?"#fef3c7":"#d1fae5"}; color: ${n.strikeLevel>=3?"#991b1b":n.strikeLevel===2?"#92400e":"#065f46"}; border: 1px solid ${n.strikeLevel>=3?"#fca5a5":n.strikeLevel===2?"#fcd34d":"#a7f3d0"}; padding: 3px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px;">
                                        <i class="fas ${n.strikeLevel>=3?"fa-radiation":n.strikeLevel===2?"fa-exclamation-triangle":"fa-shield-alt"} ml-1"></i>${n.strikeBadgeText}
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
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
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

                        <!-- \u0635\u0648\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0635\u0648\u0631\u0629 \u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0635\u0648\u0631\u0629 \u0625\u0636\u0627\u0641\u064A\u0629/\u0628\u0639\u062F \u0627\u0644\u062A\u0635\u062D\u064A\u062D) -->
                        ${(()=>{const r=i.photo||(Array.isArray(i.photos)&&i.photos.length>0?i.photos[0]:""),l=i.photo2||(Array.isArray(i.photos)&&i.photos.length>1?i.photos[1]:""),c=this.processPhoto(r),d=this.processPhoto(l);if(!c&&!d)return"";const p=(m,u,v,y)=>{if(!m)return"";const b=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(m):{canonical:m,displaySrc:m,needsProxy:!1,proxyFileId:""},A=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(b):"";return`
                                    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column;">
                                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                            <span style="font-size: 0.8rem; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: ${u===1?"#2563eb":"#059669"}; color: #fff; font-size: 11px; font-weight: 800;">${u}</span>
                                                ${Utils.escapeHTML(v)}
                                            </span>
                                            <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">${Utils.escapeHTML(y)}</span>
                                        </div>
                                        <div style="position: relative; height: 200px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1; cursor: pointer;"
                                             onclick="Violations.openPhotoLightbox('${Utils.escapeHTML(b.displaySrc)}', '${Utils.escapeHTML(v)}')">
                                            <img src="${Utils.escapeHTML(b.displaySrc)}"${A} alt="${Utils.escapeHTML(v)}" class="violation-detail-photo"
                                                 style="max-height: 100%; max-width: 100%; object-fit: contain;"
                                                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                                            <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.65); color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                                <i class="fas fa-search-plus"></i> \u062A\u0643\u0628\u064A\u0631
                                            </div>
                                        </div>
                                    </div>
                                `},f=!!(c&&d);return`
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                                <h3 style="font-weight: 700; color: #334155; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 0.95rem;">
                                    <span style="display: flex; align-items: center; gap: 8px;">
                                        <i class="fas fa-camera-retro text-indigo-600"></i> \u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629
                                    </span>
                                    <span style="font-size: 0.75rem; font-weight: 600; color: #64748b;">
                                        ${f?"\u0635\u0648\u0631\u062A\u0627\u0646 \u0645\u0648\u062B\u0642\u062A\u0627\u0646 (\u0642\u0628\u0644 / \u0628\u0639\u062F)":"\u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0645\u0648\u062B\u0642\u0629"}
                                    </span>
                                </h3>
                                <div class="grid grid-cols-1 ${f?"md:grid-cols-2":""} gap-4">
                                    ${p(c,1,"\u0645\u0634\u0647\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629","\u0642\u0628\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629")}
                                    ${p(d,2,"\u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0625\u0636\u0627\u0641\u064A / \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A","\u0628\u0639\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621")}
                                </div>
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
                                        <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${o==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                        <option value="\u0645\u062D\u0644\u0648\u0644" ${o==="\u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u0645\u062D\u0644\u0648\u0644</option>
                                        <option value="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644" ${o==="\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644</option>
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
        `,document.body.appendChild(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"violations",record:i,recordId:i.id}),s.querySelector("#violation-view-quick-save")?.addEventListener("click",async()=>{await this.saveViolationQuickEditsFromView(i.id,s)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:r=>{try{r.onerror=null,r.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}}}),s.addEventListener("click",r=>{r.target===s&&s.remove()})},async saveViolationQuickEditsFromView(e,t){const i=t.querySelector("#violation-view-q-severity")?.value?.trim()||"",a=t.querySelector("#violation-view-q-status")?.value?.trim()||"",o=t.querySelector("#violation-view-q-details")?.value?.trim()||"",n=t.querySelector("#violation-view-q-action")?.value?.trim()||"",s=t.querySelector("#violation-view-quick-save");if(!AppState.appData?.violations){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062E\u0627\u0644\u0641\u0627\u062A.");return}const r=AppState.appData.violations.findIndex(c=>c.id===e);if(r===-1){Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.");return}const l=s?.innerHTML;s&&(s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{AppState.appData.violations[r]={...AppState.appData.violations[r],severity:i,status:a,violationDetails:o,actionTaken:n,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();let c=!0;try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave){const d=await GoogleIntegration.autoSave("Violations",AppState.appData.violations);d&&d.success===!1&&(c=!1)}}catch(d){c=!1,AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",d)}if(!c)Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL");else try{localStorage.setItem("violations_last_sync",String(Date.now()))}catch{}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0628\u0646\u062C\u0627\u062D"),t.remove(),await this.viewViolation(e);try{const d=document.querySelector("#violations-section .tabs-container .tab-btn.active")?.dataset?.tab||"all",p=document.getElementById("violations-list");if(p&&(d==="all"?p.innerHTML=this.renderViolationsList():d==="employees"?p.innerHTML=this.renderEmployeeViolationsList():d==="contractors"&&(p.innerHTML=this.renderContractorViolationsList())),d==="all"){const f=document.getElementById("violations-stats-cards");f&&(f.outerHTML=this.renderAllViolationsStats())}}catch(d){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639:",d)}}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",c),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+(c.message||String(c))),s&&(s.disabled=!1,s.innerHTML=l||'<i class="fas fa-save ml-2"></i> \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629')}},_buildViolationReportTableHtml(e){const t=this.normalizeViolationRecord(e)||e,i=(f,m="\u2014")=>Utils.escapeHTML(String(f==null||f===""?m:f)),a=t.personType==="contractor"||!!t.contractorName,o=a?"\u062A\u0642\u0631\u064A\u0631 \u0631\u0635\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0631\u0635\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",n=Number(this.getEffectiveFineAmount(t))||0,s=typeof this.getPersonViolationHistory=="function"?this.getPersonViolationHistory(t,t.id):null,r=s?.strikeBadgeText||`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 ${t.violationSequenceInMonth||1}`,l=t.violationDate?Utils.formatDate(t.violationDate):"\u2014",c=typeof this.getResolvedViolationTime=="function"?this.getResolvedViolationTime(t):t.violationTime||"",d=c?this.formatViolationTime(c):"";let p="";if(t.photo&&typeof t.photo=="string"&&t.photo.startsWith("data:image/"))p=t.photo;else if(t.photo){const f=this.processPhoto(t.photo);p=f?this.convertGoogleDriveLinkToPrintable(f):""}return`
            ${this.getIsoPrintHeaderHtml(o,subtitle,"DOC-HSE-VIO-REC-01","Rev. 03","\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A")}

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
                    <div class="kpi-card-value" style="color: #166534; font-size: 15px;">${this.formatFineAmount(n)}</div>
                </div>
                <div class="kpi-stat-card ${s?.strikeLevel>=3?"accent-red":s?.strikeLevel===2?"accent-amber":"accent-blue"}">
                    <div class="kpi-card-label">\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0634\u062E\u0635</div>
                    <div class="kpi-card-value" style="color: ${s?.strikeLevel>=3?"#991b1b":s?.strikeLevel===2?"#92400e":"#1e3a8a"}; font-size: 13px; font-weight: 800; white-space: nowrap;">${i(r)}</div>
                </div>
            </div>

            <!-- \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641 -->
            <div class="info-section-block">
                <div class="info-section-header">
                    <i class="fas ${a?"fa-hard-hat":"fa-user-tie"}"></i>
                    ${a?"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641":"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062E\u0627\u0644\u0641"}
                </div>
                <div class="info-grid-2">
                    ${a?`
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
                            <span class="info-cell-label">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0647 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</span>
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
        `},_generateViolationPrintDocumentHtml(e,t){const i=this.normalizeViolationRecord(e)||e;return`<div class="report-page portrait">${this._buildViolationReportTableHtml(i)}</div>`},async _completeViolationReportPrint(e,t="\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629.pdf"){return this.openIsoPrintWindow("\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629",e,!1,"",t)},async printViolationProfessional(e){const t=AppState.appData?.violations?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629...");const i=this.normalizeViolationRecord(t)||t,a=i.personType==="contractor"||!!i.contractorName,o=a?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",n=await this._resolveViolationReportPhoto_(i.photo),s={...i,photo:n},r=this._generateViolationPrintDocumentHtml(s,o),l=a?i.contractorName||i.contractorWorker:i.employeeName,c=i.isoCode||i.id||"\u0633\u062C\u0644",d=`\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629_${this._safeViolationReportFilePart(l)}_${this._safeViolationReportFilePart(c)}.pdf`;this.openIsoPrintWindow(o,r,!1,"",d)}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(i.message||""))}finally{Loading.hide()}},_safeViolationReportFilePart(e,t="\u0633\u062C\u0644"){return String(e||t).trim().replace(/[\u0000-\u001f<>:"/\\|?*]+/g,"_").replace(/\s+/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"")||t},_readViolationReportImageBlob_(e){return new Promise(t=>{if(!e||!String(e.type||"").toLowerCase().startsWith("image/")){t("");return}try{const i=new FileReader;i.onload=()=>t(typeof i.result=="string"?i.result:""),i.onerror=()=>t(""),i.readAsDataURL(e)}catch{t("")}})},async _resolveViolationReportPhoto_(e){if(!e)return"";const t=typeof e=="object"?this.getPhotoSource(e)||e.photo||e.url||e.image||"":e;if(!t)return"";if(typeof t=="string"&&t.startsWith("data:image/"))return t;const i=this.processPhoto(t)||String(t).trim();if(/^data:image\//i.test(i))return i;const a=typeof Utils<"u"&&typeof Utils.extractDriveFileId=="function"?Utils.extractDriveFileId(i):(i.match(/\/d\/([a-zA-Z0-9_-]+)/)||i.match(/id=([a-zA-Z0-9_-]+)/))?.[1];if(a&&typeof Utils<"u"&&typeof Utils.fetchDriveImageDataUri=="function")try{const n=await Utils.fetchDriveImageDataUri(a,{force:!0,requireDataUri:!0});if(n&&/^data:image\//i.test(n))return n}catch{}const o=i.startsWith("//")?"https:"+i:i;if(/^(https?:|blob:)/i.test(o)&&typeof fetch=="function")try{const n=await fetch(o,{method:"GET",credentials:"omit",mode:"cors"});if(n.ok){const s=await this._readViolationReportImageBlob_(await n.blob());if(s)return s}}catch{}return this.convertGoogleDriveLinkToPrintable(i)},async downloadViolationReport(e,t=null){const i=AppState.appData?.violations?.find(s=>s.id===e);if(!i)return Notification.error("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),!1;const a=this.normalizeViolationRecord(i)||i,o=a.personType==="contractor"||!!a.contractorName,n=t?.innerHTML||"";try{t&&(t.disabled=!0,t.setAttribute("aria-busy","true"),t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (PDF)...");const s=o?"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0648\u0638\u0641",r=await this._resolveViolationReportPhoto_(a.photo),l={...a,photo:r},c=this._generateViolationPrintDocumentHtml(l,s),d=o?a.contractorName||a.contractorWorker:a.employeeName,p=a.isoCode||a.id||"\u0633\u062C\u0644",f=a.violationDate?String(a.violationDate).slice(0,10):new Date().toISOString().slice(0,10),m=["\u062A\u0642\u0631\u064A\u0631_\u0645\u062E\u0627\u0644\u0641\u0629",this._safeViolationReportFilePart(d,o?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"),this._safeViolationReportFilePart(p),this._safeViolationReportFilePart(f)].join("_")+".pdf";return await this.downloadIsoReportAsPdf(s,c,m,!1)}catch(s){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629: "+(s.message||"")),!1}finally{Loading.hide(),t&&(t.disabled=!1,t.removeAttribute("aria-busy"),t.innerHTML=n||'<i class="fas fa-file-download"></i>')}},async exportPDF(e,t=null){return this.downloadViolationReport(e,t)},async loadBlacklistDataAsync(){try{(typeof AppState>"u"||!AppState.appData)&&(AppState.appData={}),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]);const e=AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl,t=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function";if(!e||!t){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Integration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637");return}const i=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Blacklist_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(o=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL:",o),{success:!1,data:[]}));let a=!1;if(i&&i.success&&Array.isArray(i.data)?(AppState.appData.blacklistRegister=i.data,a=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.data.length} \u0633\u062C\u0644 Blacklist \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL`)):AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),a&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(o){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",o)}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Blacklist:",e),AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[])}},refreshBlacklistDisplay(){const e=document.getElementById("violations-tab-content");if(!(!e||!document.querySelector('.tab-btn.active[data-tab="blacklist"]')))try{const i=e.querySelector(".card-body");if(i){const n=i.querySelector(".grid.grid-cols-1")||i.querySelector(".grid")||i.querySelector('[class*="grid-cols"]');if(n&&n.parentElement)n.outerHTML=this.renderBlacklistStats();else{const s=i.querySelector("div > div.grid");s&&(s.outerHTML=this.renderBlacklistStats())}}const a=document.getElementById("blacklist-cards-container");a&&(a.innerHTML=this.renderBlacklistCards());const o=document.getElementById("blacklist-table-container");o&&(o.innerHTML=this.renderBlacklistTable()),this.setupBlacklistEventListeners()}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 Blacklist:",i)}},renderBlacklistTab(){return`
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
        `},renderBlacklistStats(){const e=AppState.appData?.blacklistRegister||[],t=e.length,i=new Date().getMonth(),a=new Date().getFullYear(),o=e.filter(r=>{if(!r.banDate)return!1;const l=new Date(r.banDate);return l.getMonth()===i&&l.getFullYear()===a}).length,n=new Set;e.forEach(r=>{r.factory&&r.location?n.add(`${r.factory} - ${r.location}`):r.factory?n.add(r.factory):r.location&&n.add(r.location)});const s=n.size;return`
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
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof o=="number"?o.toLocaleString("en-US"):o}</h3>
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
        `},getPhotoSource(e){return typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?Utils.extractImageSourceCandidate(e):e&&typeof e=="string"?e:""},normalizeGoogleDrivePhotoUrl(e){return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"?Utils.normalizeGoogleDriveImageUrl(e):String(e||"").trim()},processPhoto(e){if(typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"){const o=Utils.normalizeImageSource(e);if(o)return o}const t=this.getPhotoSource(e);if(!t)return null;let i=String(t).trim().replace(/^['"`]+|['"`]+$/g,"");if(!i)return null;if(i.startsWith("blob:"))return i;if(/^data:image\//i.test(i)){const o=i.indexOf(",");if(o===-1)return i.replace(/\s+/g,"");const n=i.slice(0,o).replace(/\s+/g,""),s=i.slice(o+1).replace(/\s+/g,"");return s?`${n},${s}`:null}if(/^https?:\/\//i.test(i))return this.normalizeGoogleDrivePhotoUrl(i);const a=i.replace(/\s+/g,"");return a.length>100&&/^[A-Za-z0-9+/=]+$/.test(a.substring(0,Math.min(120,a.length)))?"data:image/jpeg;base64,"+a:(AppState.debugMode,null)},_onBlacklistCardPhotoError(e){try{if(!e)return;e.onerror=null;const t=document.createElement("div");t.className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800",t.innerHTML='<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>',e.replaceWith(t)}catch{}},_onBlacklistTablePhotoError(e){try{if(!e)return;e.onerror=null,e.src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E"}catch{}},_hydrateBlacklistDrivePhotos(){try{if(typeof Utils.hydrateDriveProxyImages!="function")return;const e=a=>{if(!a)return;const o=a.className||"";o.indexOf("blacklist-table-photo")!==-1?this._onBlacklistTablePhotoError(a):o.indexOf("blacklist-detail-photo")!==-1?this._onBlacklistTablePhotoError(a):o.indexOf("blacklist-form-photo")!==-1?this._onBlacklistTablePhotoError(a):this._onBlacklistCardPhotoError(a)},t=document.getElementById("blacklist-cards-container"),i=document.getElementById("blacklist-table");t&&Utils.hydrateDriveProxyImages(t,{onFetchFail:e}),i&&Utils.hydrateDriveProxyImages(i,{onFetchFail:e})}catch{}},renderBlacklistCards(){const e=AppState.appData?.blacklistRegister||[];return e.length===0?`
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                    <p class="text-gray-400 text-sm mt-2">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0644\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F</p>
                </div>
            `:`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[...e].sort((i,a)=>{const o=new Date(i.banDate||i.createdAt||0);return new Date(a.banDate||a.createdAt||0)-o}).map(i=>{const a=this.processPhoto(i),o=a&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a):{canonical:a||"",displaySrc:a||"",needsProxy:!1,proxyFileId:""},n=o.canonical?o.displaySrc:"",s=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"";return`
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${a?`
                                            <img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629"${s}
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
        `},async showBlacklistForm(e=null){const t=!!e;if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(v){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",v)}const i=AppState.appData?.blacklistRegister||[],a=i.length>0?Math.max(...i.map(v=>parseInt(v.serialNumber)||0))+1:1,o=this.getSiteOptions(),n=o.map(v=>`<option value="${Utils.escapeHTML(v.name)}" data-site-id="${v.id}" ${e?.factory===v.name||e?.factoryId===v.id?"selected":""}>${Utils.escapeHTML(v.name)}</option>`).join(""),c=((AppState.appData?.formSettings||{}).departments||[]).map(v=>typeof v=="object"?v.name:v).filter(Boolean).map(v=>`<option value="${Utils.escapeHTML(v)}"></option>`).join(""),d=e?.factoryId||o.find(v=>v.name===e?.factory)?.id||"",p=d?this.getPlaceOptions(d).map(v=>`<option value="${Utils.escapeHTML(v.name)}" data-place-id="${v.id}" ${e?.location===v.name||e?.locationId===v.id?"selected":""}>${Utils.escapeHTML(v.name)}</option>`).join(""):'<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648\u0644\u0627\u064B --</option>',f=AppState.currentUser||{name:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",email:""},m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
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
                    ${this.renderBlacklistFormContent(e,a,n,p,c,f)}
                </div>
            </div>
        `,document.body.appendChild(m),this.setupBlacklistFormInModal(m,e).catch(v=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0646\u0645\u0648\u0630\u062C Blacklist:",v)}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(m,{onFetchFail:v=>this._onBlacklistTablePhotoError(v)}),m.addEventListener("click",v=>{v.target===m&&m.remove()});const u=v=>{v.key==="Escape"&&document.body.contains(m)&&(m.remove(),document.removeEventListener("keydown",u))};document.addEventListener("keydown",u)},renderBlacklistFormContent(e,t,i,a,o,n){const s=!!e,r=this.processPhoto(e),l=r&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r||"",displaySrc:r||"",needsProxy:!1,proxyFileId:""},c=l.canonical?l.displaySrc:"",d=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(l):"";return`
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
                            ${o}
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
                            value="${Utils.escapeHTML(e?.editor||n.name)}" 
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
        `},async setupBlacklistFormInModal(e,t){const i=!!t,a=e.querySelector("#blacklist-form");a&&(a.dataset.editId=i?t.id:""),a&&a.addEventListener("submit",c=>this.handleBlacklistSubmit(c));const o=e.querySelector("#blacklist-cancel-btn");o&&o.addEventListener("click",()=>{e.remove()});const n=e.querySelector("#blacklist-photo-input");n&&n.addEventListener("change",c=>this.handleBlacklistPhotoUpload(c));const s=e.querySelector("#blacklist-contractor"),r=e.querySelector("#blacklist-contractors-list");if(s&&r)try{let c=[];if(typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"&&(c=Contractors.getAllContractorsForModules()||[]),c.length===0){const d=[...AppState.appData?.approvedContractors||[],...AppState.appData?.contractors||[]].filter(f=>f&&f.isActive!=="inactive"&&f.isActive!==!1&&f.isActive!=="false"&&f.isActive!=="FALSE");c=Array.from(new Map(d.map(f=>[f.id||f.contractorId,f])).values()).filter(f=>f&&(f.name||f.companyName||f.contractorName)).map(f=>({id:f.id||f.contractorId||"",name:(f.name||f.companyName||f.contractorName||"").trim()})).filter(f=>f.name&&f.name!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641").sort((f,m)=>f.name.localeCompare(m.name,"ar",{sensitivity:"base"}))}if(r.innerHTML=c.map(d=>`<option value="${Utils.escapeHTML(d.name)}" data-contractor-id="${d.id||""}"></option>`).join(""),t?.contractor){const d=t.contractor.split(" - ")[0].trim();s.value=d}}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",c)}const l=e.querySelector("#blacklist-factory");if(l&&(l.addEventListener("change",async c=>{const d=c.target.selectedOptions[0],p=d?.dataset.siteId||d?.value;await this.loadBlacklistPlaces(p)}),i&&t?.factoryId)){const c=t.factoryId;try{await this.loadBlacklistPlaces(c),setTimeout(()=>{const d=e.querySelector("#blacklist-location");d&&t?.location&&(d.value=t.location)},100)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",d)}}},renderBlacklistTable(){const t=[...AppState.appData?.blacklistRegister||[]].sort((i,a)=>{const o=new Date(i.banDate||i.createdAt||0);return new Date(a.banDate||a.createdAt||0)-o});return t.length===0?`
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
                            ${t.map(i=>{const a=this.processPhoto(i),o=a&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a):{canonical:a||"",displaySrc:a||"",needsProxy:!1,proxyFileId:""},n=o.canonical?o.displaySrc:"",s=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"";return`
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
                                        ${a?`<img src="${Utils.escapeHTML(n)}" alt="\u0635\u0648\u0631\u0629"${s} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
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
        `},async setupBlacklistEventListeners(){setTimeout(async()=>{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",r)}const e=document.getElementById("blacklist-form");if(e&&!e.closest(".modal-overlay")){const r=e.cloneNode(!0);e.parentNode.replaceChild(r,e),r.addEventListener("submit",l=>this.handleBlacklistSubmit(l))}const t=document.getElementById("blacklist-photo-input");t&&!t.closest(".modal-overlay")&&t.addEventListener("change",r=>this.handleBlacklistPhotoUpload(r));const i=document.getElementById("blacklist-search");if(i){const r=i.cloneNode(!0);i.parentNode.replaceChild(r,i),r.addEventListener("input",l=>this.filterBlacklistTable(l.target.value))}const a=document.getElementById("blacklist-add-btn");a?a.dataset.listenerAttached?AppState.debugMode&&Utils.safeLog('\u2139\uFE0F \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0645\u0631\u0628\u0648\u0637 \u0645\u0633\u0628\u0642\u0627\u064B'):(a.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();try{this.showBlacklistForm()}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C Blacklist:",l),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.")}}),a.dataset.listenerAttached="true",AppState.debugMode&&Utils.safeLog('\u2705 \u062A\u0645 \u0631\u0628\u0637 \u0632\u0631 "\u062A\u0633\u062C\u064A\u0644 \u0645\u0645\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u062C\u062F\u064A\u062F" \u0628\u0646\u062C\u0627\u062D')):AppState.debugMode&&Utils.safeWarn('\u26A0\uFE0F \u0632\u0631 "blacklist-add-btn" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM');const o=document.getElementById("blacklist-factory");o&&!o.closest(".modal-overlay")&&o.addEventListener("change",async r=>{const l=r.target.selectedOptions[0],c=l?.dataset.siteId||l?.value;await this.loadBlacklistPlaces(c)});const n=document.getElementById("blacklist-export-pdf");if(n){const r=n.cloneNode(!0);n.parentNode.replaceChild(r,n),r.addEventListener("click",()=>this.exportBlacklistToPDF())}const s=document.getElementById("blacklist-export-excel");if(s){const r=s.cloneNode(!0);s.parentNode.replaceChild(r,s),r.addEventListener("click",()=>this.exportBlacklistToExcel())}this._hydrateBlacklistDrivePhotos()},100)},async handleBlacklistSubmit(e){e.preventDefault();const t=e.target,i=!!t.dataset.editId;let a=i&&AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.photo||"";const o=t.closest(".modal-overlay"),n=o?o.querySelector("#blacklist-photo-input"):document.getElementById("blacklist-photo-input");if(n?.files?.[0]){const f=n.files[0];if(f.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}try{a=await this.convertImageToBase64(f)}catch(m){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629:",m)}}const s=o?o.querySelector("#blacklist-factory"):document.getElementById("blacklist-factory"),r=o?o.querySelector("#blacklist-location"):document.getElementById("blacklist-location"),l=s?.selectedOptions[0],c=r?.selectedOptions[0],d=f=>(o?o.querySelector(`#${f}`):document.getElementById(f))?.value||"",p={id:t.dataset.editId||Utils.generateId("BLACKLIST"),serialNumber:d("blacklist-serial"),factory:s?.value||"",factoryId:l?.dataset.siteId||"",location:r?.value||"",locationId:c?.dataset.placeId||"",fullName:d("blacklist-name"),idNumber:d("blacklist-id-number"),photo:a,job:d("blacklist-job"),contractor:(d("blacklist-contractor")||"").trim().split(" - ")[0],department:d("blacklist-department"),banReason:d("blacklist-ban-reason"),banDate:d("blacklist-ban-date"),bannedBy:d("blacklist-banned-by"),editor:d("blacklist-editor"),notes:d("blacklist-notes"),createdAt:i?AppState.appData?.blacklistRegister?.find(f=>f.id===t.dataset.editId)?.createdAt||new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(a&&a.startsWith("data:"))try{const f=await GoogleIntegration.uploadFileToDrive?.(a,`blacklist_${p.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");f?.success&&(f.directLink||f.shareableLink)?(p.photo=f.directLink||f.shareableLink,AppState.debugMode):(AppState.debugMode,Notification.warning("\u0641\u0634\u0644 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649 Drive. \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0624\u0642\u062A\u0627\u064B."))}catch(f){AppState.debugMode&&Utils.safeWarn("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629:",f),Notification.error("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629: "+f.message)}await this.saveBlacklistRecord(p,i)},async saveBlacklistRecord(e,t){Loading.show();try{if(AppState.appData.blacklistRegister||(AppState.appData.blacklistRegister=[]),t){const s=AppState.appData.blacklistRegister.findIndex(r=>r.id===e.id);s!==-1?AppState.appData.blacklistRegister[s]=e:AppState.appData.blacklistRegister.push(e)}else AppState.appData.blacklistRegister.push(e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(s){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",s),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D`);const i=document.querySelector(".modal-overlay");i&&i.querySelector("#blacklist-form")&&i.remove();const a=document.getElementById("blacklist-cards-container");a&&(a.innerHTML=this.renderBlacklistCards(),this.setupBlacklistEventListeners());const o=document.getElementById("blacklist-table-container");o&&(o.innerHTML=this.renderBlacklistTable(),this.setupBlacklistEventListeners());const n=document.querySelector("#violations-tab-content .card-body");if(n){const s=n.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");s&&(s.outerHTML=this.renderBlacklistStats())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644: "+i.message)}},handleBlacklistPhotoUpload(e){const t=e.target.files?.[0];if(!t)return;const i=new FileReader;i.onload=a=>{const o=document.querySelector(".modal-overlay"),n=o?o.querySelector("#blacklist-photo-preview"):document.getElementById("blacklist-photo-preview"),s=o?o.querySelector("#blacklist-photo-img"):document.getElementById("blacklist-photo-img");n&&s&&(s.src=a.target.result,n.classList.remove("hidden"))},i.readAsDataURL(t)},async loadBlacklistPlaces(e){try{typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.querySelector(".modal-overlay"),i=t?t.querySelector("#blacklist-location"):document.getElementById("blacklist-location");if(!i)return;i.innerHTML='<option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>',this.getPlaceOptions(e).forEach(o=>{const n=document.createElement("option");n.value=o.name,n.dataset.placeId=o.id,n.textContent=o.name,i.appendChild(n)})}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",t)}},filterBlacklistTable(e){const t=document.getElementById("blacklist-table-body");if(!t)return;const i=t.querySelectorAll("tr"),a=e.toLowerCase();i.forEach(o=>{const n=o.textContent.toLowerCase();o.style.display=n.includes(a)?"":"none"})},editBlacklistRecord(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}this.showBlacklistForm(t)},async deleteBlacklistRecord(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{AppState.appData?.blacklistRegister&&(AppState.appData.blacklistRegister=AppState.appData.blacklistRegister.filter(i=>i.id!==e)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{await GoogleIntegration.autoSave("Blacklist_Register",AppState.appData.blacklistRegister)}catch(i){AppState.debugMode&&Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0642\u0627\u0639\u062F\u0629 SQL:",i),Notification.warning("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL")}Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn.active[data-tab="blacklist"]')&&await this.switchTab("blacklist")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",t),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+t.message)}}},viewBlacklistPhoto(e){if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629");return}const t=this.processPhoto(e);if(!t){Notification.error("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");return}const i=o=>{const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="width: 100%; max-height: 70vh; object-fit: contain;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23666%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">
                </div>
            </div>
        `,document.body.appendChild(n)},a=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t):{needsProxy:!1,proxyFileId:""};if(a.needsProxy&&typeof Utils.fetchDriveImageDataUri=="function"){Utils.fetchDriveImageDataUri(a.proxyFileId).then(o=>{o?i(o):Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}).catch(()=>Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"));return}i(t)},viewBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(r=>r.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.processPhoto(t),a=i&&typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(i):{canonical:i||"",displaySrc:i||"",needsProxy:!1,proxyFileId:""},o=a.canonical?a.displaySrc:"",n=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(a):"",s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                            <img src="${Utils.escapeHTML(o)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629"${n}
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
        `,document.body.appendChild(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"violations.blacklist",record:{...t,name:t.fullName||"",nationalId:t.idNumber||"",reason:t.banReason||"",date:t.banDate||t.createdAt||""},recordId:t.id||e||""}),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:r=>this._onBlacklistTablePhotoError(r)})},async printBlacklistDetails(e){const t=AppState.appData?.blacklistRegister?.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062B\u064A\u0642\u0629 \u0623\u0645\u0631 \u0627\u0644\u0645\u0646\u0639 (ISO 45001)...");const i=t.photo||t.image||t.photoUrl||"",a=await this._resolveViolationReportPhoto_(i),o="\u0623\u0645\u0631 \u0645\u0646\u0639 \u0625\u062F\u0627\u0631\u064A \u0645\u0646 \u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",s=`
                <div class="report-page portrait">
                    ${this.getIsoPrintHeaderHtml(o,"Blacklist Ban Order \u2014 \u0625\u062C\u0631\u0627\u0621 \u0623\u0645\u0646\u064A \u0648\u0633\u0644\u0627\u0645\u0629 \u0645\u0647\u0646\u064A\u0629 \u0645\u0634\u062F\u062F","DOC-HSE-VIO-BLK-01","Rev. 03","\u0633\u0631\u064A \u0644\u0644\u063A\u0627\u064A\u0629")}

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
                    ${a?`
                        <div class="info-section-block">
                            <div class="info-section-header">
                                <i class="fas fa-id-card"></i>
                                \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0644\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639
                            </div>
                            <div style="padding: 10px; text-align: center; background: #f8fafc;">
                                <img src="${Utils.escapeHTML(a)}" alt="\u0635\u0648\u0631\u0629 \u0634\u062E\u0635\u064A\u0629" style="max-height: 180px; max-width: 95%; object-fit: contain; border: 1.5px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onerror="this.closest('.info-section-block').style.display='none';">
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
            `;Loading.hide();const r=`\u0623\u0645\u0631_\u0645\u0646\u0639_${Utils.escapeHTML(t.fullName||"\u0634\u062E\u0635")}_${new Date().toISOString().slice(0,10)}.pdf`;this.openIsoPrintWindow(o,s,!1,"",r)}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0637\u0628\u0627\u0639\u0629 \u0623\u0645\u0631 \u0627\u0644\u0645\u0646\u0639:",i),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+i.message)}},async exportBlacklistToPDF(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 \u0645\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 (ISO 45001)...");const t="\u0633\u062C\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0648\u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u0629 \u0645\u0646 \u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629",i="Master Blacklist Register \u2014 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631 \u0627\u0644\u0623\u0645\u0646\u064A \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",a=e.length,o=new Set(e.map(d=>d.factory).filter(Boolean)).size,n=new Set(e.map(d=>d.contractor).filter(Boolean)).size,s=this._paginateViolationsList(e,8,11),r=s.length,l=s.map((d,p)=>{const f=p+1,m=f===1,u=f===r,v=d.map((y,b)=>`
                        <tr>
                            <td style="font-weight: 700;">${(p===0?0:8+(p-1)*11)+b+1}</td>
                            <td>${y.banDate?Utils.formatDate(y.banDate):"-"}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.factory||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.location||"-")}</td>
                            <td style="font-weight: 800; text-align: right; color: #991b1b;">${Utils.escapeHTML(y.fullName||"-")}</td>
                            <td style="font-family: monospace, inherit; font-size: 9.5px;">${Utils.escapeHTML(y.idNumber||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.job||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.contractor||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.department||"-")}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(y.bannedBy||"-")}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(y.banReason||"-")}</td>
                        </tr>
                    `).join("");return`
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(t,m?i:`\u062A\u0627\u0628\u0639 \u062C\u062F\u0648\u0644 ${t} \u2014 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`,"DOC-HSE-VIO-BLK-REG-01","Rev. 03","\u0633\u0631\u064A \u0644\u0644\u063A\u0627\u064A\u0629")}

                        ${m?`
                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${a}</div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u0639\u0646\u064A\u0629</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a;">${o}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646</div>
                                    <div class="kpi-card-value" style="color: #92400e;">${n}</div>
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
                                ${v}
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
                `}).join("");Loading.hide();const c=`\u0633\u062C\u0644_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.pdf`;await this.downloadIsoReportAsPdf(t,l,c,!0)}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646 PDF:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+e.message)}},exportBlacklistToExcel(){try{const e=AppState.appData?.blacklistRegister||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 Excel..."),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 SheetJS");return}const t=e.map(r=>({\u0645:r.serialNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639":r.banDate?Utils.formatDate(r.banDate):"",\u0627\u0644\u0645\u0635\u0646\u0639:r.factory||"",\u0627\u0644\u0645\u0648\u0642\u0639:r.location||"","\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A":r.fullName||"","\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629":r.idNumber||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:r.job||"","\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644":r.contractor||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:r.department||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639":r.bannedBy||"","\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":r.editor||"","\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639":r.banReason||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:r.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDateTime(r.createdAt):"","\u062A\u0627\u0631\u064A\u062E \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":r.updatedAt?Utils.formatDateTime(r.updatedAt):""})),i=XLSX.utils.book_new(),a=XLSX.utils.json_to_sheet(t),o=[{wch:8},{wch:12},{wch:15},{wch:15},{wch:25},{wch:15},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:40},{wch:40},{wch:18},{wch:18}];a["!cols"]=o,XLSX.utils.book_append_sheet(i,a,"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646");const s=`\u0642\u0627\u0626\u0645\u0629_\u0627\u0644\u0645\u0645\u0646\u0648\u0639\u064A\u0646_\u0645\u0646_\u0627\u0644\u062F\u062E\u0648\u0644_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel: "+e.message)}},convertGoogleDriveLinkToPrintable(e){if(!e)return"";if(typeof window.__convertGoogleDriveUrl=="function"&&(e=window.__convertGoogleDriveUrl(e)),e.startsWith("data:image/")||e.includes("drive.google.com/thumbnail"))return e;const t=e.match(/\/d\/([a-zA-Z0-9_-]+)/)||e.match(/id=([a-zA-Z0-9_-]+)/);return t&&t[1]?`https://drive.google.com/thumbnail?id=${t[1]}&sz=w800`:e},getIsoPrintCommonStyles(e=!1){return`
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
        `},getIsoPrintHeaderHtml(e,t,i,a="Rev. 03",o="\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A"){let n="/icons/icapp-logo.png";if(typeof window<"u"&&window.location&&(window.location.protocol==="file:"?n="icons/icapp-logo.png":window.location.origin&&window.location.origin!=="null"&&(n=`${window.location.origin}/icons/icapp-logo.png`)),typeof AppState<"u"&&(AppState.companyLogo||AppState.companySettings?.logo)){const c=AppState.companyLogo||AppState.companySettings?.logo;c&&(n=this.convertGoogleDriveLinkToPrintable(c))}const s="icons/icon-192x192.png",r=new Date,l=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`;return`
            <div class="iso-print-header">
                <div class="iso-box-brand">
                    <img src="${n}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${s}';">
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
                        <strong>${Utils.escapeHTML(a)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                        <strong>${l}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                        <strong style="color: #047857;">${Utils.escapeHTML(o)}</strong>
                    </div>
                </div>
            </div>
        `},getIsoPrintFooterHtml(e,t="Rev. 03",i="ISO 45001:2018 (Clause 10.2)"){let a=String(i||"ISO 45001:2018 (Clause 10.2)").trim();return a=a.replace(/\(Clause\s+([\d.\s&,]+)[^)]*\)/i,"(Clause $1)").replace(/\s{2,}/g," "),`
            <div class="iso-footer-strip" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; white-space: nowrap; gap: 8px;">
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong style="white-space: nowrap;">${Utils.escapeHTML(e)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong style="white-space: nowrap;">${Utils.escapeHTML(t)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong dir="ltr" style="white-space: nowrap;">${Utils.escapeHTML(a)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong style="white-space: nowrap;">ICAPP HSE MS</strong></span>
            </div>
            <footer class="portal-unified-footer">
                <div><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
                <div>\u0648\u062B\u064A\u0642\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0648\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>
            </footer>
        `},openIsoPrintWindow(e,t,i=!1,a="",o=""){const n=o||`${String(e).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,s=`<!DOCTYPE html>
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
        ${a}
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
                    var ok = await window.opener.Utils.downloadHtmlAsPdf(targetHtml, ${JSON.stringify(n)}, {
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
</html>`,r=new Blob([s],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(r);return window.open(l,"_blank")?(setTimeout(()=>{URL.revokeObjectURL(l)},15e3),!0):(Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),!1)},async downloadIsoReportAsPdf(e,t,i="",a=!1,o=""){const n=i||`${String(e).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,s=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(e)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getIsoPrintCommonStyles(a)}
        ${o}
    </style>
</head>
<body>
    <div class="report-page-container">
        ${t}
    </div>
</body>
</html>`;if(typeof Utils<"u"&&typeof Utils.downloadHtmlAsPdf=="function")try{if(await Utils.downloadHtmlAsPdf(s,n,{landscape:a,title:e}))return Notification.success(`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 PDF \u0628\u0646\u062C\u0627\u062D: ${n}`),!0}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",r)}return this.openIsoPrintWindow(e,t,a,o,n)},_paginateViolationsList(e,t=8,i=12){if(!e||e.length===0)return[];const a=[],o=[...e];for(a.push(o.splice(0,t));o.length>0;)a.push(o.splice(0,i));return a},showAllViolationsReportDialog(e=""){const t=document.getElementById("all-violations-report-modal");t&&t.remove();const i=document.createElement("div");i.className="modal-overlay",i.id="all-violations-report-modal";const a=new Date,o=[];for(let f=0;f<12;f++){const m=new Date(a.getFullYear(),a.getMonth()-f,1),u=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`,v=m.toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"});o.push(`<option value="${u}"${f===0?" selected":""}>${v}</option>`)}i.innerHTML=`
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
                                    ${o.join("")}
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
        `,document.body.appendChild(i);const n=()=>i.remove();i.querySelector(".modal-close")?.addEventListener("click",n),i.querySelector('[data-action="close"]')?.addEventListener("click",n),i.addEventListener("click",f=>{f.target===i&&n()});const s=i.querySelectorAll('input[name="all-viol-range-type"]'),r=i.querySelector("#all-viol-month-select"),l=i.querySelector("#all-viol-from-date"),c=i.querySelector("#all-viol-to-date"),d=()=>{const f=i.querySelector('input[name="all-viol-range-type"]:checked')?.value||"all";r.disabled=f!=="month",l.disabled=f!=="custom",c.disabled=f!=="custom"};s.forEach(f=>f.addEventListener("change",d));const p=async f=>{const m=i.querySelector("#all-viol-scope-select")?.value||"all",u=i.querySelector('input[name="all-viol-range-type"]:checked')?.value||"all",v=r?.value||"",y=l?.value||"",b=c?.value||"",A=i.querySelector("#all-viol-severity-select")?.value||"",B=i.querySelector("#all-viol-status-select")?.value||"",T=i.querySelector('input[name="all-viol-format"]:checked')?.value||"pdf";if(u==="custom"){if(!y||!b){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}if(new Date(y)>new Date(b)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}n(),await this.generateAllViolationsReport({personType:m,dateRangeType:u,month:v,fromDate:y,toDate:b,severity:A,status:B,exportFormat:T,directDownload:f})};i.querySelector("#all-viol-preview-btn")?.addEventListener("click",()=>p(!1)),i.querySelector("#all-viol-generate-btn")?.addEventListener("click",()=>p(!0))},async generateAllViolationsReport(e={}){const{personType:t="all",dateRangeType:i="all",month:a="",fromDate:o="",toDate:n="",severity:s="",status:r="",exportFormat:l="pdf",directDownload:c=!0}=e;try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0648\u062A\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A...");let d=(AppState.appData?.violations||[]).map(S=>this.normalizeViolationRecord(S)).filter(Boolean);t==="employee"?d=d.filter(S=>S.employeeName||S.personType==="employee"||!S.contractorName&&S.employeeName):t==="contractor"&&(d=d.filter(S=>S.contractorName||S.contractorCode||S.contractorId||S.personType==="contractor"));let p="\u0643\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629";if(i==="month"&&a){const[S,M]=a.split("-");d=d.filter(h=>{if(!h.violationDate)return!1;const U=new Date(h.violationDate);return U.getFullYear()===parseInt(S,10)&&U.getMonth()+1===parseInt(M,10)}),p=new Date(parseInt(S,10),parseInt(M,10)-1,1).toLocaleDateString("ar-SA-u-nu-latn",{year:"numeric",month:"long"})}else if(i==="custom"&&o&&n){const S=new Date(o);S.setHours(0,0,0,0);const M=new Date(n);M.setHours(23,59,59,999),d=d.filter(q=>{if(!q.violationDate)return!1;const h=new Date(q.violationDate);return h>=S&&h<=M}),p=`\u0645\u0646 ${Utils.formatDate(o)} \u0625\u0644\u0649 ${Utils.formatDate(n)}`}if(s&&(d=d.filter(S=>String(S.severity||"").trim()===s)),r&&(r==="\u0645\u0641\u062A\u0648\u062D"?d=d.filter(S=>String(S.status||"").trim()!=="\u0645\u062D\u0644\u0648\u0644"):d=d.filter(S=>String(S.status||"").trim()===r)),d.length===0){Loading.hide(),Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u062A\u0637\u0627\u0628\u0642 \u0645\u062D\u062F\u062F\u0627\u062A \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629");return}d.sort((S,M)=>new Date(M.violationDate||0)-new Date(S.violationDate||0));const f=t==="employee"?"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646":t==="contractor"?"\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",m=`\u0633\u062C\u0644 ${f} \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D`;if(l==="excel"){this.exportAllViolationsToExcel_(d,f,p),Loading.hide();return}const u=d.length,v=d.filter(S=>String(S.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629").length,y=d.filter(S=>String(S.severity||"").trim()==="\u0645\u062A\u0648\u0633\u0637\u0629").length,b=d.filter(S=>String(S.severity||"").trim()==="\u0645\u0646\u062E\u0641\u0636\u0629").length,A=d.filter(S=>String(S.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644").length,B=u-A,T=u>0?Math.round(A/u*100):0,E=d.reduce((S,M)=>S+(Number(this.getEffectiveFineAmount(M))||0),0),R=this._paginateViolationsList(d,8,11),D=R.length,N=R.map((S,M)=>{const q=M+1,h=q===1,U=q===D,x=S.map((j,it)=>{const z=(M===0?0:8+(M-1)*11)+it+1,nt=j.personType==="contractor"||!!j.contractorName,bt=nt?j.contractorName||j.contractorWorker||"\u0645\u0642\u0627\u0648\u0644":j.employeeName||"\u0645\u0648\u0638\u0641",vt=Number(this.getEffectiveFineAmount(j))||0;return`
                        <tr>
                            <td style="font-weight: 700;">${z}</td>
                            <td style="font-weight: 800; text-align: right;">
                                <i class="fas ${nt?"fa-hard-hat text-amber-600":"fa-user-tie text-blue-600"} ml-1"></i>
                                ${Utils.escapeHTML(bt)}
                            </td>
                            <td style="font-size: 9.5px;">${nt?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(j.violationLocation||"-")}</td>
                            <td style="font-weight: 700; text-align: right;">${Utils.escapeHTML(j.violationType||"-")}</td>
                            <td>${j.violationDate?Utils.formatDate(j.violationDate):"-"}</td>
                            <td>
                                <span style="font-weight: 800; color: ${j.severity==="\u0639\u0627\u0644\u064A\u0629"?"#b91c1c":j.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"#d97706":"#2563eb"};">
                                    ${Utils.escapeHTML(j.severity||"-")}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(vt)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(j.actionTaken||"-")}</td>
                            <td>
                                <span style="font-weight: 800; color: ${j.status==="\u0645\u062D\u0644\u0648\u0644"?"#047857":"#b91c1c"};">
                                    ${Utils.escapeHTML(j.status||"-")}
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
                                    <div class="kpi-card-value" style="color: #92400e; font-size: 15px;">${v} / ${y} / ${b}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642</div>
                                    <div class="kpi-card-value" style="color: #065f46;">${T}% <small style="font-size: 11px; font-weight: 700;">(${A} \u0645\u062D\u0644\u0648\u0644 / ${B} \u0645\u0641\u062A\u0648\u062D)</small></div>
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
                                ${x}
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

                        <div class="page-counter-footer">\u0635\u0641\u062D\u0629 ${q} \u0645\u0646 ${D}</div>
                    </div>
                `}).join("");Loading.hide();const K=`${String(m).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;c?await this.downloadIsoReportAsPdf(m,N,K,!0):this.openIsoPrintWindow(m,N,!0,"",K)}catch(d){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A:",d),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A: "+d.message)}},exportAllViolationsToExcel_(e,t="",i=""){if(typeof XLSX>"u")return Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u062B\u0627\u0646\u064A\u0629."),!1;if(!Array.isArray(e)||e.length===0)return Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627"),!1;const a=e.map((u,v)=>{const y=u.personType==="contractor"||!!u.contractorName,b=this.getPersonViolationHistory(u,u.id),A=b.totalCount===0?"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0648\u0644\u0649":b.totalCount===1?"\u0645\u062E\u0627\u0644\u0641\u0629 \u062B\u0627\u0646\u064A\u0629 (\u0645\u0643\u0631\u0631)":`\u062A\u0643\u0631\u0627\u0631 \u062D\u0631\u062C (${b.totalCount+1} \u0645\u062E\u0627\u0644\u0641\u0627\u062A)`;return{"#":v+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0627\u0644\u0641":u.employeeName||u.contractorWorker||u.contractorName||"",\u0627\u0644\u0635\u0641\u0629:y?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A / \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644":u.employeeCode||u.employeeNumber||u.contractorCode||u.contractorId||"","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u062C\u0647\u0629 \u0627\u0644\u0639\u0645\u0644":y?u.contractorName||"":u.employeeDepartment||"","\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationType||"","\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)":u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationDate?Utils.formatDate(u.violationDate):"","\u0648\u0642\u062A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationTime||"","\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639":u.violationLocation||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationPlace||"","\u062F\u0631\u062C\u0629 \u0627\u0644\u0634\u062F\u0629":u.severity||"","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629":Number(this.getEffectiveFineAmount(u))||0,"\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.status||"","\u0633\u062C\u0644 \u0627\u0644\u062A\u0643\u0631\u0627\u0631 (Strike)":A,"\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0627\u0644\u0634\u0647\u0631":u.violationSequenceInMonth||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630":u.actionTaken||"","\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":u.violationDetails||""}}),o={};e.forEach(u=>{if(!(u.personType==="contractor"||!!u.contractorName))return;const y=String(u.contractorName||"\u0645\u0642\u0627\u0648\u0644 \u0639\u0627\u0645 / \u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();o[y]||(o[y]={name:y,total:0,high:0,medium:0,low:0,unresolved:0,resolved:0,fines:0,rcaCounts:{},typeCounts:{}});const b=o[y];b.total++;const A=String(u.severity||"").trim();A==="\u0639\u0627\u0644\u064A\u0629"?b.high++:A==="\u0645\u062A\u0648\u0633\u0637\u0629"?b.medium++:A==="\u0645\u0646\u062E\u0641\u0636\u0629"&&b.low++,String(u.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644"?b.resolved++:b.unresolved++,b.fines+=Number(this.getEffectiveFineAmount(u))||0;const T=String(u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();b.rcaCounts[T]=(b.rcaCounts[T]||0)+1;const E=String(u.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();b.typeCounts[E]=(b.typeCounts[E]||0)+1});const n=Object.values(o).sort((u,v)=>v.total-u.total||v.high-u.high).map((u,v)=>{const y=Object.entries(u.rcaCounts).sort((T,E)=>E[1]-T[1])[0]?.[0]||"\u2014",b=Object.entries(u.typeCounts).sort((T,E)=>E[1]-T[1])[0]?.[0]||"\u2014";let A="\u{1F7E2} \u0645\u0646\u062E\u0641\u0636";u.high>=2||u.total>=5?A="\u{1F6A8} \u062D\u0631\u062C":(u.high===1||u.total>=2)&&(A="\u26A0\uFE0F \u0645\u062A\u0648\u0633\u0637");const B=u.total>0?`${Math.round(u.resolved/u.total*100)}%`:"0%";return{"#":v+1,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":u.name,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A":u.total,"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629":u.high,"\u0645\u062A\u0648\u0633\u0637\u0629 \u0627\u0644\u0634\u062F\u0629":u.medium,"\u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u0634\u062F\u0629":u.low,"\u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u0644\u0648\u0644\u0629":u.unresolved,"\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642":B,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A":u.fines,"\u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A \u0627\u0644\u0634\u0627\u0626\u0639":y,"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0643\u0631\u0627\u0631\u0627\u064B":b,"\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0637\u0631":A}}),s={};e.forEach(u=>{const v=String(u.rootCause||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();s[v]||(s[v]={category:v,count:0,high:0,resolved:0,unresolved:0,fines:0});const y=s[v];y.count++,String(u.severity||"").trim()==="\u0639\u0627\u0644\u064A\u0629"&&y.high++,String(u.status||"").trim()==="\u0645\u062D\u0644\u0648\u0644"?y.resolved++:y.unresolved++,y.fines+=Number(this.getEffectiveFineAmount(u))||0});const r=e.length||1,l=Object.values(s).sort((u,v)=>v.count-u.count).map((u,v)=>({"#":v+1,"\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u062C\u0630\u0631\u064A (RCA)":u.category,"\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A":u.count,"\u0627\u0644\u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0626\u0648\u064A\u0629":`${(u.count/r*100).toFixed(1)}%`,"\u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u062F\u0629":u.high,\u0645\u062D\u0644\u0648\u0644\u0629:u.resolved,"\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629":u.unresolved,"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u063A\u0631\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629":u.fines})),c=XLSX.utils.book_new(),d=XLSX.utils.json_to_sheet(a);if(XLSX.utils.book_append_sheet(c,d,"\u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"),n.length>0){const u=XLSX.utils.json_to_sheet(n);XLSX.utils.book_append_sheet(c,u,"\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}const p=XLSX.utils.json_to_sheet(l);XLSX.utils.book_append_sheet(c,p,"\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 RCA");const f=new Date().toISOString().slice(0,10),m=`\u0633\u062C\u0644_${t||"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"}_${f}.xlsx`;return XLSX.writeFile(c,m),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D (\u0645\u0639 \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 RCA)"),!0},exportCurrentFilteredViolationsToExcel(){const e=this.getFilteredViolations();if(!e||e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0623\u0648 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const t=document.querySelector(".tab-btn.active")?.dataset.tab||"all";let i="\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0639\u0627\u0645";t==="employees"?i="\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646":t==="contractors"&&(i="\u0645\u062E\u0627\u0644\u0641\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),this.exportAllViolationsToExcel_(e,i,"\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629")}};(function(){"use strict";try{typeof window<"u"&&typeof Violations<"u"&&(window.Violations=Violations,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Violations module loaded and available on window.Violations"))}catch{if(typeof window<"u"&&typeof Violations<"u")try{window.Violations=Violations}catch{}}})();
