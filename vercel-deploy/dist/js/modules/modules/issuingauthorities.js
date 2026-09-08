const IssuingAuthorities={_data:[],_loading:!1,_loadPromise:null,_activeCategory:"employees",_contractorOptions:[],_employeesCache:null,_mergedRowsCache:null,_mergedRowsInflight:null,_IA_ROWS_CACHE_TTL_MS:9e4,_unsupportedActions:{employees:!1,contractors:!1},_iaDocClickHandler:null,_iaDocChangeHandler:null,_modalUiAbort:null,_iaSaveModalBusy:!1,_iaRemoveGlobalDelegation(){if(this._iaDocClickHandler&&(document.removeEventListener("click",this._iaDocClickHandler,!0),this._iaDocClickHandler=null),this._iaDocChangeHandler&&(document.removeEventListener("change",this._iaDocChangeHandler,!0),this._iaDocChangeHandler=null),this._modalUiAbort){try{this._modalUiAbort.abort()}catch{}this._modalUiAbort=null}},_listFilters:{search:"",factory:"",department:"",status:""},_filterSearchTimer:null,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(e,t){const i=this._getI18nCore();return i?i.t(e,null,t!=null?String(t):""):t!=null?String(t):e},_tReplace(e,t,i){let o=this.t(e,t);return i&&typeof i=="object"&&Object.keys(i).forEach(a=>{o=o.split(`{{${a}}}`).join(String(i[a]??""))}),o},_categoryTitle(){return this._activeCategory==="contractors"?this.t("module.issuingAuthorities.cat.contractors","\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"):this.t("module.issuingAuthorities.cat.employees","\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")},_permitKey(e){return`module.issuingAuthorities.permit.${e.key}`},_permitLabel(e){return this.t(this._permitKey(e),e.labelAr)},_permitBilingualHeader(e){const t=this._getI18nCore(),i=this._permitKey(e),o=t&&typeof t.getCurrentLang=="function"?t.getCurrentLang():"ar",a=this.t(i,e.labelAr),s=o==="ar"?t?t.t(i,"en",e.labelEn):e.labelEn:t?t.t(i,"ar",e.labelAr):e.labelAr;return{primary:a,secondary:s}},_badgeMeta(e){const t=String(e||"X").toUpperCase(),i=this.PERMIT_VALUE_STYLES[t]||this.PERMIT_VALUE_STYLES.X;return{class:i.class,title:this.t(`module.issuingAuthorities.badge.${t}.title`,i.title)}},_isActionUnknownMessage(e){const t=String(e||"").toLowerCase();return t.includes("\u063A\u064A\u0631 \u0645\u0639\u062A\u0631\u0641")||t.includes("not recognized")||t.includes("unknown action")},_isNoisyExtensionError(e){const t=String(e||"").toLowerCase();return t.includes("could not establish connection")||t.includes("receiving end does not exist")},_classifyRequestError(e){const t=String(e||"").toLowerCase();return t.includes("403")||t.includes("forbidden")?"forbidden":t.includes("timeout")||t.includes("\u0645\u0647\u0644\u0629")||t.includes("timed out")?"timeout":this._isActionUnknownMessage(t)?"unknown_action":t.includes("cors")||t.includes("access-control-allow-origin")?"cors":"generic"},_getFriendlyErrorMessage(e){const t=this._classifyRequestError(e);return t==="forbidden"?this.t("module.issuingAuthorities.err.forbidden","\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 (403). \u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u0644\u0627\u062D\u064A\u0629 \u0646\u0634\u0631 Web App (Who has access) \u0648\u0623\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u062D\u064A\u062D."):t==="timeout"?this.t("module.issuingAuthorities.err.timeout","\u0627\u0644\u062E\u0627\u062F\u0645 \u062A\u0623\u062E\u0631 \u0641\u064A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u062D\u0627\u0644\u0629 \u062E\u0627\u062F\u0645 SQL."):t==="unknown_action"?this.t("module.issuingAuthorities.err.unknownAction","\u0646\u0633\u062E\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u0642\u062F\u0645 \u0645\u0646 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u064A\u0644\u0632\u0645 \u0625\u0639\u0627\u062F\u0629 \u0646\u0634\u0631 Web App \u0628\u0623\u062D\u062F\u062B \u0645\u0644\u0641\u0627\u062A Backend."):t==="cors"?this.t("module.issuingAuthorities.err.cors","\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u0628\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A CORS/\u0627\u0644\u0648\u0635\u0648\u0644 \u0641\u064A Web App. \u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0634\u0631."):this.t("module.issuingAuthorities.err.generic","\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.")},_userVisibleMutationErrorMessage(e){const t=String(e&&e.message||e||"").trim();if(!t)return this.t("module.issuingAuthorities.err.genericMutation","\u062A\u0639\u0630\u0631 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");const i=this._classifyRequestError(t.toLowerCase());return i==="generic"&&/^[\u0600-\u06FF]/.test(t)?t:i!=="generic"?this._getFriendlyErrorMessage(t):t.length>3&&t.length<500?t:this.t("module.issuingAuthorities.err.genericMutation","\u062A\u0639\u0630\u0631 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.")},_reportModuleError(e,t){const i=String(t&&t.message||t||"");if(this._isNoisyExtensionError(i))return;const o=this._getFriendlyErrorMessage(i);typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(o,"error"),typeof Utils<"u"&&Utils.safeWarn(`${e}: ${o}`,i)},_normalizeEmployeeCode(e){let t=String(e||"").trim().toLowerCase();return t?(t=t.replace(/[٠-٩]/g,i=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(i))).replace(/[۰-۹]/g,i=>String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(i))),t=t.replace(/\.0+$/g,"").replace(/[\s\-_\/\\]+/g,""),t):""},_findEmployeeLocal(e){const t=Array.isArray(this._employeesCache)?this._employeesCache:Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[];if(!t.length)return null;const i=n=>String(n||"").trim().toLowerCase(),o=this._normalizeEmployeeCode(e),a=i(e);let s=t.find(n=>this._normalizeEmployeeCode(n.employeeNumber)===o||this._normalizeEmployeeCode(n.sapId)===o||this._normalizeEmployeeCode(n.id)===o||this._normalizeEmployeeCode(n.employeeCode)===o);return!s&&o&&(s=t.find(n=>[this._normalizeEmployeeCode(n.employeeNumber),this._normalizeEmployeeCode(n.sapId),this._normalizeEmployeeCode(n.id),this._normalizeEmployeeCode(n.employeeCode)].filter(Boolean).some(l=>l.includes(o)||o.includes(l)))),s||(s=t.find(n=>i(n.name)===a)),s||(s=t.find(n=>i(n.name).includes(a))),s||null},async _ensureEmployeesLoaded(){if(Array.isArray(this._employeesCache)&&this._employeesCache.length>0)return this._employeesCache;let e=Array.isArray(AppState?.appData?.employees)?AppState.appData.employees:[];if(e.length>0)return this._employeesCache=e,e;try{const t=await this._withTimeout(GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Employees"}}),8e3);if(t&&t.success&&Array.isArray(t.data))return this._employeesCache=t.data,AppState.appData||(AppState.appData={}),AppState.appData.employees=t.data,t.data}catch{}return this._employeesCache=[],[]},_fillEmployeeFields(e){document.getElementById("ia-f-employee-code")&&(document.getElementById("ia-f-employee-code").value=e.employeeCode||""),document.getElementById("ia-f-name")&&(document.getElementById("ia-f-name").value=e.name||"");const t=document.getElementById("ia-f-dept");if(t){const o=String(e.departmentName||"").trim();if(t.tagName==="SELECT"&&o&&!Array.from(t.options||[]).some(a=>String(a.value||"").trim()===o)){const a=document.createElement("option");a.value=o,a.textContent=o,t.appendChild(a)}t.value=o}document.getElementById("ia-f-job-title")&&(document.getElementById("ia-f-job-title").value=e.jobTitle||""),document.getElementById("ia-f-branch")&&(document.getElementById("ia-f-branch").value=e.branch||"");const i=document.getElementById("ia-f-factory");if(i){const o=String(e.factory||"").trim();if(o&&!Array.from(i.options||[]).some(a=>String(a.value||"").trim()===o)){const a=document.createElement("option");a.value=o,a.textContent=o,i.appendChild(a)}i.value=o}document.getElementById("ia-f-location")&&(document.getElementById("ia-f-location").value=e.location||""),this._refreshSublocationOptions(e.sublocation||"")},_getSiteOptions(){try{if(typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites))return Permissions.formSettingsState.sites.map(e=>({id:String(e.id||e.siteId||"").trim(),name:String(e.name||e.title||e.label||"").trim()})).filter(e=>e.id&&e.name);if(Array.isArray(AppState?.appData?.observationSites)&&AppState.appData.observationSites.length>0)return AppState.appData.observationSites.map(e=>({id:String(e.id||e.siteId||"").trim(),name:String(e.name||e.title||e.label||"").trim()})).filter(e=>e.id&&e.name);if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES))return DailyObservations.DEFAULT_SITES.map(e=>({id:String(e.id||e.siteId||"").trim(),name:String(e.name||e.title||e.label||"").trim()})).filter(e=>e.id&&e.name)}catch(e){typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities._getSiteOptions",e)}return[]},_getPlaceOptions(e){try{const t=String(e||"").trim();if(!t)return[];const i=o=>(Array.isArray(o?.places)?o.places:Array.isArray(o?.locations)?o.locations:Array.isArray(o?.children)?o.children:Array.isArray(o?.areas)?o.areas:[]).map((s,n)=>({id:String(s.id||s.placeId||s.value||`PLACE_${n+1}`).trim(),name:String(s.name||s.placeName||s.title||s.label||s.locationName||this._tReplace("module.issuingAuthorities.placeFallback",`\u0645\u0643\u0627\u0646 ${n+1}`,{n:n+1})).trim()})).filter(s=>s.id&&s.name);if(typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)){const o=Permissions.formSettingsState.sites.find(a=>String(a.id||a.siteId||"").trim()===t);if(o)return i(o)}if(Array.isArray(AppState?.appData?.observationSites)){const o=AppState.appData.observationSites.find(a=>String(a.id||a.siteId||"").trim()===t);if(o)return i(o)}}catch(t){typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities._getPlaceOptions",t)}return[]},_renderFactoryOptions(e){const t=String(e||"").trim(),i=this._getSiteOptions(),o=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:s=>String(s??"");let a=`<option value="">${o(this.t("module.issuingAuthorities.select.factory","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --"))}</option>`;return a+=i.map(s=>`<option value="${o(s.id)}" ${t===s.id?"selected":""}>${o(s.name)}</option>`).join(""),t&&!i.some(s=>s.id===t)&&(a+=`<option value="${o(t)}" selected>${o(t)}</option>`),a},_renderSublocationOptions(e,t){const i=String(t||"").trim(),o=this._getPlaceOptions(e),a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??"");let s=`<option value="">${a(this.t("module.issuingAuthorities.select.sublocation","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A --"))}</option>`;return s+=o.map(n=>`<option value="${a(n.id)}" ${i===n.id?"selected":""}>${a(n.name)}</option>`).join(""),i&&!o.some(n=>n.id===i)&&(s+=`<option value="${a(i)}" selected>${a(i)}</option>`),s},_refreshSublocationOptions(e=""){const t=document.getElementById("ia-f-factory"),i=document.getElementById("ia-f-sublocation");!t||!i||(i.innerHTML=this._renderSublocationOptions(t.value,e))},async _ensureFormSettingsReady(){if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0647\u064A\u0626\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645:",e)}},_syncFactoryControls(e=null){const t=document.getElementById("ia-f-factory");if(!t)return;const i=String(e?.factoryId||e?.factory||t.value||"").trim();t.innerHTML=this._renderFactoryOptions(i),i&&(t.value=i);const o=String(e?.sublocationId||e?.sublocation||"").trim();this._refreshSublocationOptions(o)},_installEmployeeCodeLookupLikeClinic(){if((document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase()!=="employee"||typeof EmployeeHelper>"u"||!EmployeeHelper.setupEmployeeCodeSearch)return;const t=document.getElementById("ia-f-employee-code");if(!t||!t.parentNode)return;const i=t.cloneNode(!0);t.parentNode.replaceChild(i,t),EmployeeHelper.setupEmployeeCodeSearch("ia-f-employee-code","ia-f-name",o=>{o&&(this._fillEmployeeFields({employeeCode:String(o.employeeNumber||o.employeeCode||o.sapId||o.id||"").trim(),name:String(o.name||"").trim(),departmentName:String(o.department||o.unit||o.section||"").trim(),jobTitle:String(o.position||o.job||o.jobTitle||"").trim(),branch:String(o.branch||"").trim(),factory:String(o.factoryId||o.factory||o.factoryName||"").trim(),location:String(o.location||o.locationName||o.employeeLocation||"").trim(),sublocation:String(o.sublocation||o.subLocation||o.subLocationName||"").trim()}),Array.isArray(AppState?.appData?.employees)&&(this._employeesCache=AppState.appData.employees))},{inlineAlertId:"ia-form-alerts",employeeNotFoundWarn:"enter"})},_bindModalFieldEvents(){document.getElementById("ia-lookup-employee-btn")?.addEventListener("click",()=>{const t=document.getElementById("ia-f-employee-code");t&&t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0,cancelable:!0}))}),document.getElementById("ia-f-contractor-name")?.addEventListener("change",()=>this._onContractorChanged()),document.getElementById("ia-f-factory")?.addEventListener("change",()=>this._refreshSublocationOptions("")),document.getElementById("ia-f-name")?.addEventListener("blur",()=>{const t=(document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase(),i=(document.getElementById("ia-f-employee-code")?.value||"").trim(),o=(document.getElementById("ia-f-name")?.value||"").trim();t==="employee"&&!i&&o&&this._lookupEmployeeByCode(o)});const e=async()=>{const i={personType:(document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase()==="contractor"?"contractor":"employee",employeeCode:(document.getElementById("ia-f-employee-code")?.value||"").trim(),contractorCompanyName:(document.getElementById("ia-f-contractor-name")?.value||"").trim(),name:(document.getElementById("ia-f-name")?.value||"").trim()};await this._validateDuplicateBeforeSave(i,this._currentEditId,{silent:!0})};document.getElementById("ia-f-person-type")?.addEventListener("change",()=>{e()}),document.getElementById("ia-f-employee-code")?.addEventListener("blur",()=>{e()}),document.getElementById("ia-f-contractor-name")?.addEventListener("change",()=>{e()}),document.getElementById("ia-f-name")?.addEventListener("blur",()=>{e()}),this._installEmployeeCodeLookupLikeClinic()},_withTimeout(e,t=7e3){return Promise.race([e,new Promise((i,o)=>setTimeout(()=>o(new Error("timeout")),t))])},_normalizeBoolean(e,t=!1){if(e===!0||e===!1)return e;if(typeof e=="string"){const i=e.trim().toLowerCase();if(i==="true")return!0;if(i==="false")return!1}return t},_normalizeRow(e){const t={...e||{}};t.id=String(t.id||"").trim(),t.personType=String(t.personType||"").toLowerCase().trim()==="contractor"?"contractor":"employee",t.employeeCode=String(t.employeeCode||t["\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]||t["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]||"").trim(),t.contractorCompanyName=String(t.contractorCompanyName||t.\u0627\u0644\u0645\u0642\u0627\u0648\u0644||t["\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629"]||"").trim();let i=t.name||t["\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641"]||t.\u0627\u0644\u0627\u0633\u0645||t.name;return t.name=String(i||"").trim(),t.departmentName=String(t.departmentName||"").trim(),t.jobTitle=String(t.jobTitle||"").trim(),t.approvalRole=this._normalizeApprovalRole(t.approvalRole),t.branch=String(t.branch||"").trim(),t.factory=String(t.factory||"").trim(),t.location=String(t.location||"").trim(),t.sublocation=String(t.sublocation||"").trim(),t.email=String(t.email||"").trim(),t.phone=String(t.phone||"").trim(),t.notes=String(t.notes||"").trim(),t.isActive=this._normalizeBoolean(t.isActive,!0),this.PERMIT_TYPES.forEach(o=>{const a=String(t[o.key]||"X").toUpperCase().trim();t[o.key]=["G","Y","X"].includes(a)?a:"X"}),t},async _fetchViaReadFromSheet(){try{const e=this._activeCategory==="contractors"?"PTWContractorIssuingAuthorities":"PTWIssuingAuthorities",t=await this._withTimeout(GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:e}}),7e3);if(t&&t.success){const i=Array.isArray(t.data)?t.data:[];return this._data=i.map(o=>this._normalizeRow(o)).filter(o=>o.id||o.name||o.contractorCompanyName),!0}}catch{}return!1},PERMIT_TYPES:[{key:"coldWork",labelAr:"\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0628\u0627\u0631\u062F\u0629",labelEn:"Cold Work"},{key:"loto",labelAr:"\u0639\u0632\u0644 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629",labelEn:"LOTO"},{key:"hotWork",labelAr:"\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0633\u0627\u062E\u0646\u0629",labelEn:"Hot Work"},{key:"workAtHeight",labelAr:"\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A",labelEn:"W@ H"},{key:"confinedSpace",labelAr:"\u062F\u062E\u0648\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629",labelEn:"Confined Space"},{key:"excavation",labelAr:"\u0627\u0644\u062D\u0641\u0631",labelEn:"Excavation"},{key:"contractorPTW",labelAr:"\u062A\u0635\u0631\u064A\u062D \u062F\u062E\u0648\u0644 \u0645\u0642\u0627\u0648\u0644",labelEn:"Contractor PTW"},{key:"liftingPlan",labelAr:"\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639",labelEn:"Lifting plan"}],APPROVAL_ROLE_OPTIONS:[{key:"general",value:"general",labelKey:"module.issuingAuthorities.approvalRole.general"},{key:"areaManager",value:"areaManager",labelKey:"module.issuingAuthorities.approvalRole.areaManager"},{key:"maintenanceEngineer",value:"maintenanceEngineer",labelKey:"module.issuingAuthorities.approvalRole.maintenanceEngineer"}],_normalizeApprovalRole(e){const t=String(e||"").trim();return t==="areaManager"||t==="maintenanceEngineer"||t==="general"?t:"general"},_approvalRoleLabel(e){const t=this._normalizeApprovalRole(e),i=(this.APPROVAL_ROLE_OPTIONS||[]).find(o=>o.value===t);return i?this.t(i.labelKey,t):t},_renderApprovalRoleOptions(e){const t=this._normalizeApprovalRole(e),i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:o=>String(o??"");return(this.APPROVAL_ROLE_OPTIONS||[]).map(o=>{const a=i(this.t(o.labelKey,o.value));return`<option value="${i(o.value)}" ${t===o.value?"selected":""}>${a}</option>`}).join("")},PERMIT_VALUE_STYLES:{G:{label:"G",class:"ia-badge-g",title:"\u0645\u0635\u0631\u062D \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"},Y:{label:"Y",class:"ia-badge-y",title:"\u0645\u0635\u0631\u062D \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"},X:{label:"X",class:"ia-badge-x",title:"\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0647 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639"}},isAdmin(){if(typeof Permissions<"u"&&Permissions.isCurrentUserEffectiveAdmin)return Permissions.isCurrentUserEffectiveAdmin();const e=AppState&&AppState.currentUser;if(!e)return!1;const t=String(e.role||"").toLowerCase();return t==="admin"||t==="administrator"},hasIssuingAuthoritiesModuleAccess(){return typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&Permissions.hasAccess("issuing-authorities")},isStrictSystemAdmin(){const e=AppState&&AppState.currentUser;if(!e)return!1;const t=e.role==null||e.role===""?"":String(e.role).trim();if(typeof Permissions<"u"&&typeof Permissions.isAdminRole=="function")return Permissions.isAdminRole(t);const i=t.toLowerCase();return i==="admin"||i==="administrator"},_getDepartmentOptionsLikePTW(){try{if(typeof PTW<"u"&&typeof PTW.getDepartmentOptionsForPTW=="function"){const t=PTW.getDepartmentOptionsForPTW();if(Array.isArray(t)&&t.length>0)return t}if(typeof DailyObservations<"u"&&typeof DailyObservations.getDepartmentOptions=="function"){const t=DailyObservations.getDepartmentOptions();if(Array.isArray(t)&&t.length>0)return t}if(typeof AppUtils<"u"&&typeof AppUtils.getInitialFormDepartments=="function"){const t=AppUtils.getInitialFormDepartments();if(Array.isArray(t)&&t.length>0)return t}const e=AppState?.companySettings||{};if(Array.isArray(e.formDepartments)&&e.formDepartments.length>0)return e.formDepartments.map(t=>String(t||"").trim()).filter(Boolean);if(Array.isArray(e.departments))return e.departments.map(t=>String(t||"").trim()).filter(Boolean);if(typeof e.departments=="string")return e.departments.split(/\n|,/).map(t=>t.trim()).filter(Boolean)}catch{}return[]},_renderDepartmentControl(e){const t=String(e||"").trim(),i=this._getDepartmentOptionsLikePTW(),o=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:a=>String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");if(i.length){const a=i.map(s=>{const n=String(s||"").trim();return`<option value="${o(n)}" ${n===t?"selected":""}>${o(n)}</option>`}).join("");return`<select id="ia-f-dept" class="form-select ia-form-select" title="${o(this.t("module.issuingAuthorities.dept.titleHint","\u0645\u0646 \u0646\u0641\u0633 \u0642\u0627\u0626\u0645\u0629 \u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0635\u0631\u064A\u062D"))}">
                <option value="">${o(this.t("module.issuingAuthorities.dept.selectPlaceholder","\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645 \u2014"))}</option>
                ${a}
            </select>`}return`<input type="text" id="ia-f-dept" class="form-input" value="${o(t)}" placeholder="${o(this.t("module.issuingAuthorities.dept.manualPlaceholder","\u0627\u0633\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0625\u062F\u062E\u0627\u0644 \u064A\u062F\u0648\u064A)"))}">`},_contractorCompanyFromRecord(e){if(!e)return"";const t=String(e.contractorCompanyName||"").trim();if(t)return t;const i=String(e.name||"").trim(),o=this._contractorOptions||[];return i&&o.some(a=>a.name===i)?i:""},_responsibleNameFromRecord(e){if(!e)return"";const t=String(e.contractorCompanyName||"").trim(),i=String(e.name||"").trim();if(t)return i;const o=this._contractorOptions||[];return i&&o.some(a=>a.name===i)?"":i},_displayContractorCompany(e){if(!e)return"";const t=String(e.contractorCompanyName||"").trim();if(t)return t;const i=String(e.name||"").trim(),o=this._contractorOptions||[];return i&&o.some(a=>a.name===i)?i:i||""},_displayResponsibleName(e){if(!e)return"";const t=String(e.contractorCompanyName||"").trim(),i=String(e.name||"").trim();if(t)return i;const o=this._contractorOptions||[];return i&&o.some(a=>a.name===i)?"\u2014":i},_authorityWorkflowDisplayName(e){if(!e)return"";const t=String(e.contractorCompanyName||"").trim(),i=String(e.name||"").trim();return t&&i?`${t} \u2014 ${i}`:t||i},_dedupeMergedAuthorityRows(e){const t=new Set,i=[];for(const o of e||[]){if(!o)continue;const a=String(o.id||"").trim(),s=String(o.email||"").trim().toLowerCase(),n=String(o.name||"").trim().toLowerCase(),r=String(o.contractorCompanyName||"").trim().toLowerCase(),l=a||s||`${r}|${n}`||n;!l||t.has(l)||(t.add(l),i.push(o))}return i},_actionsForCategory(e){return e==="contractors"?{add:"addContractorIssuingAuthority",update:"updateContractorIssuingAuthority",remove:"deleteContractorIssuingAuthority"}:{add:"addIssuingAuthority",update:"updateIssuingAuthority",remove:"deleteIssuingAuthority"}},_getActiveCategoryFromUi(){const e=document.getElementById("ia-module-root");if(!e)return this._activeCategory==="contractors"?"contractors":"employees";const t=e.querySelector(".ia-tab-btn.active");return(t&&String(t.getAttribute("data-category")||"").trim())==="contractors"?"contractors":"employees"},_categoryForWrite(e,t){return t?String(t).trim().toUpperCase().startsWith("IAC")?"contractors":"employees":e==="contractor"?"contractors":"employees"},_syncIssuingAuthoritiesCategoryUi(){const e=document.getElementById("ia-module-root");if(e){const o=this._activeCategory==="contractors"?"contractors":"employees";e.querySelectorAll(".ia-tab-btn").forEach(a=>{const s=a.getAttribute("data-category")||"";a.classList.toggle("active",s===o)})}const t=document.getElementById("ia-card-subtitle");if(t){const o=this._categoryTitle();t.innerHTML=`<span style="color:#334155;">${this.t("module.issuingAuthorities.cardCurrentList","\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629:")}</span> ${o}`}const i=document.getElementById("ia-section-module-subtitle");i&&(i.textContent=this._tReplace("module.issuingAuthorities.sectionSubtitle","\u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0626\u0645\u0629: {{cat}} \u2014 {{tag}}",{cat:this._categoryTitle(),tag:this.t("module.issuingAuthorities.ptwTagline","PTW Approvers")}))},_bustIssuingAuthoritiesSheetCache(){typeof GoogleIntegration<"u"&&typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(["PTWIssuingAuthorities","PTWContractorIssuingAuthorities"]),this._mergedRowsCache=null,this._mergedRowsInflight=null},async _getMergedActiveRows(e=!1){const t=Date.now();return!e&&this._mergedRowsCache&&t-this._mergedRowsCache.ts<this._IA_ROWS_CACHE_TTL_MS?this._mergedRowsCache.rows:this._mergedRowsInflight?this._mergedRowsInflight:(this._mergedRowsInflight=Promise.all([this._fetchNormalizedRowsForCategory("employees"),this._fetchNormalizedRowsForCategory("contractors")]).then(([i,o])=>{const s=this._dedupeMergedAuthorityRows([].concat(i||[],o||[])).filter(n=>n.isActive!==!1);return this._mergedRowsCache={rows:s,ts:Date.now()},this._mergedRowsInflight=null,s}).catch(i=>{throw this._mergedRowsInflight=null,i}),this._mergedRowsInflight)},_mapRowToAuthorityCandidate(e,t){const i=String(t||"X").toUpperCase().trim();return{id:e.id,name:this._authorityWorkflowDisplayName(e),departmentId:e.departmentId,departmentName:e.departmentName,email:e.email,phone:e.phone,approvalRole:this._normalizeApprovalRole(e.approvalRole),personType:e.personType||"employee",permitLevel:i,requiresHseCoApproval:i==="Y"}},_bestPermitLevelForFields(e,t){const i=Array.isArray(t)?t:[];if(!i.length)return"X";let o="X";return i.forEach(a=>{const s=String(e[a]||"X").toUpperCase().trim();s==="G"?o="G":s==="Y"&&o!=="G"&&(o="Y")}),o},_filterAuthorityCandidates(e,t,i){const o=this._normalizeApprovalRole(i),a=Array.isArray(t)?[...new Set(t.filter(Boolean))]:t?[String(t).trim()]:[],s={};return(e||[]).forEach(n=>{if(this._normalizeApprovalRole(n.approvalRole)!==o)return;const r=this._bestPermitLevelForFields(n,a);if(r!=="G"&&r!=="Y")return;const l=n.id||n.email||n.name;if(!l)return;const d=this._mapRowToAuthorityCandidate(n,r);s[l]?d.permitLevel==="G"&&(s[l].permitLevel="G",s[l].requiresHseCoApproval=!1):s[l]=d}),Object.values(s).sort((n,r)=>n.permitLevel==="G"&&r.permitLevel!=="G"?-1:r.permitLevel==="G"&&n.permitLevel!=="G"?1:String(n.name||"").localeCompare(String(r.name||""),"ar",{sensitivity:"base"}))},async _fetchNormalizedRowsForCategory(e){const t=e==="contractors",i=t?"PTWContractorIssuingAuthorities":"PTWIssuingAuthorities",o=t?"contractors":"employees",a=t?"getAllContractorIssuingAuthorities":"getAllIssuingAuthorities";try{const s=await this._withTimeout(GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:i}}),7e3);if(s&&s.success)return(Array.isArray(s.data)?s.data:[]).map(r=>this._normalizeRow(r)).filter(r=>r.id||r.name||r.contractorCompanyName)}catch{}if(!this._unsupportedActions[o])try{const s=await this._withTimeout(GoogleIntegration.sendRequest({action:a,data:{}}),4500);if(s&&s.success)return(Array.isArray(s.data)?s.data:[]).map(r=>this._normalizeRow(r)).filter(r=>r.id||r.name||r.contractorCompanyName)}catch(s){const n=String(s&&s.message||"");this._isActionUnknownMessage(n)&&(this._unsupportedActions[o]=!0)}return[]},async load(){return this._loadPromise?this._loadPromise:(this._loadPromise=this._loadOnce().finally(()=>{this._loadPromise=null}),this._loadPromise)},async _loadOnce(){const e=document.getElementById("issuing-authorities-section");if(!e)return;e.innerHTML=this._renderShell(),this._injectStyles();const t=this._fetchData();this._ensureFormSettingsReady(),await t,this._renderTable(),this._attachEvents(),typeof UI<"u"&&typeof UI.addNavigationIconsAfterRender=="function"&&UI.addNavigationIconsAfterRender("issuing-authorities")},async _fetchContractorOptions(){try{let e=[];const t=await this._withTimeout(GoogleIntegration.sendRequest({action:"getAllApprovedContractors",data:{filters:{}}}),7e3);if(t&&t.success&&Array.isArray(t.data))e=t.data;else{const i=await this._withTimeout(GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"ApprovedContractors"}}),7e3);i&&i.success&&Array.isArray(i.data)&&(e=i.data)}this._contractorOptions=(e||[]).filter(i=>{const o=String(i.status||"").toLowerCase().trim(),a=String(i.isActive??"").toLowerCase().trim();return(o===""||o==="approved")&&a!=="false"&&a!=="inactive"}).map(i=>({id:String(i.id||i.contractorId||i.code||"").trim(),name:String(i.companyName||i.name||i.contractorName||"").trim()})).filter(i=>i.name).sort((i,o)=>i.name.localeCompare(o.name,"ar"))}catch{this._contractorOptions=[]}},_iaNotify(e,t="info"){const i=String(e||"");if(i){if(typeof Notification<"u"){t==="success"&&Notification.success?Notification.success(i):t==="error"&&Notification.error?Notification.error(i):t==="warning"&&Notification.warning?Notification.warning(i):Notification.info?Notification.info(i):Notification.success&&Notification.success(i);return}if(typeof Utils<"u"&&Utils.showNotification){const o=t==="error"?"error":t==="warning"?"warning":t==="success"?"success":"info";Utils.showNotification(i,o)}}},_normalizeDupValue(e){return String(e||"").replace(/\s+/g," ").trim().toLowerCase()},_setFormAlert(e="",t="warning"){const i=document.getElementById("ia-form-alerts");if(!i)return;const o=String(e||"").trim();if(!o){i.style.display="none",i.innerHTML="";return}const a=t==="error";i.style.display="block",i.style.border=a?"1px solid #fecaca":"1px solid #fde68a",i.style.background=a?"#fef2f2":"#fffbeb",i.style.color=a?"#991b1b":"#92400e",i.style.padding="8px 10px",i.style.borderRadius="8px",i.innerHTML=`<i class="fas ${a?"fa-exclamation-circle":"fa-exclamation-triangle"}" style="margin-left:6px;"></i>${typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(o):o}`},_buildDuplicateMessage(e){const t=e?.category==="contractors"?this.t("module.issuingAuthorities.cat.contractors","\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"):this.t("module.issuingAuthorities.cat.employees","\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"),i=String(e?.record?.name||"").trim(),o=i?` (${i})`:"";return`\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u0636\u0627\u0641\u0629: \u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0642\u0627\u0626\u0645\u0629 ${t}${o}.`},async _findDuplicateIssuingAuthority(e,t=null){const i=e?.personType==="contractor"?"contractor":"employee",o=i==="contractor"?"contractors":"employees",a=await this._fetchNormalizedRowsForCategory(o),s=this._normalizeDupValue(e?.name),n=this._normalizeDupValue(e?.employeeCode),r=this._normalizeDupValue(e?.contractorCompanyName),l=this._normalizeDupValue(t),d=a.find(m=>{const p=this._normalizeDupValue(m?.id);if(l&&p===l||(String(m?.personType||"").toLowerCase().trim()==="contractor"?"contractor":"employee")!==i)return!1;if(i==="employee"){const g=this._normalizeDupValue(m?.employeeCode);if(n&&g&&n===g)return!0;const y=this._normalizeDupValue(m?.name);return s&&y&&s===y}const h=this._normalizeDupValue(m?.contractorCompanyName),f=this._normalizeDupValue(m?.name);return!!(r&&s&&h===r&&f===s)});return d?{category:o,record:d}:null},async _validateDuplicateBeforeSave(e,t=null,{silent:i=!1}={}){if(!e||!e.name)return this._setFormAlert(""),!1;const o=e.personType==="contractor"?"contractor":"employee";if(o==="employee"&&!e.employeeCode)return this._setFormAlert(""),!1;if(o==="contractor"&&!e.contractorCompanyName)return this._setFormAlert(""),!1;try{const a=await this._findDuplicateIssuingAuthority(e,t);if(!a)return this._setFormAlert(""),!1;const s=this._buildDuplicateMessage(a);return this._setFormAlert(s,"error"),i||this._iaNotify(s,"error"),!0}catch(a){return this._reportModuleError("IssuingAuthorities._validateDuplicateBeforeSave",a),!1}},_collectFilterOptionLists(){const e=[...new Set(this._data.map(i=>String(i.factory||"").trim()).filter(Boolean))].sort((i,o)=>i.localeCompare(o,"ar")),t=[...new Set(this._data.map(i=>String(i.departmentName||"").trim()).filter(Boolean))].sort((i,o)=>i.localeCompare(o,"ar"));return{factories:e,departments:t}},_getBaseRecordsForView(){return this.isStrictSystemAdmin()?this._data.slice():this._data.filter(e=>e.isActive!==!1)},_getFilteredRecords(){let e=this._getBaseRecordsForView();const t=this._listFilters,i=String(t.status||"").trim();i==="active"?e=e.filter(n=>n.isActive!==!1):i==="inactive"&&this.isStrictSystemAdmin()&&(e=e.filter(n=>n.isActive===!1));const o=String(t.factory||"").trim();o&&(e=e.filter(n=>String(n.factory||"").trim()===o));const a=String(t.department||"").trim();a&&(e=e.filter(n=>String(n.departmentName||"").trim()===a));const s=String(t.search||"").trim().toLowerCase();return s&&(e=e.filter(n=>[n.name,n.contractorCompanyName,n.employeeCode,n.departmentName,n.jobTitle,n.branch,n.factory,n.location,n.sublocation,n.email,n.phone,n.notes].map(l=>String(l||"").toLowerCase()).join(" ").includes(s))),e},_readFiltersFromDom(){this._listFilters.search=(document.getElementById("ia-filter-search")?.value||"").trim(),this._listFilters.factory=(document.getElementById("ia-filter-factory")?.value||"").trim(),this._listFilters.department=(document.getElementById("ia-filter-department")?.value||"").trim(),this._listFilters.status=(document.getElementById("ia-filter-status")?.value||"").trim()},_applyFiltersAndRender(){this._readFiltersFromDom(),this._renderTable()},_syncFilterDropdowns(){const e=document.getElementById("ia-filter-factory"),t=document.getElementById("ia-filter-department");if(!e||!t)return;const{factories:i,departments:o}=this._collectFilterOptionLists(),a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:r=>String(r??""),s=this._listFilters.factory,n=this._listFilters.department;e.innerHTML=`<option value="">${a(this.t("module.issuingAuthorities.filter.allFactories","\u0643\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639"))}</option>`+i.map(r=>`<option value="${a(r)}" ${r===s?"selected":""}>${a(r)}</option>`).join(""),t.innerHTML=`<option value="">${a(this.t("module.issuingAuthorities.filter.allDepartments","\u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A"))}</option>`+o.map(r=>`<option value="${a(r)}" ${r===n?"selected":""}>${a(r)}</option>`).join("")},_renderFiltersHtml(){const e=this._listFilters,t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:d=>String(d??""),i=this.isStrictSystemAdmin(),{factories:o,departments:a}=this._collectFilterOptionLists(),s=`
            <option value="" ${e.status?"":"selected"}>${t(this.t("module.issuingAuthorities.filter.all","\u0627\u0644\u0643\u0644"))}</option>
            <option value="active" ${e.status==="active"?"selected":""}>${t(this.t("module.issuingAuthorities.filter.activeOnly","\u0646\u0634\u0637 \u0641\u0642\u0637"))}</option>
            ${i?`<option value="inactive" ${e.status==="inactive"?"selected":""}>${t(this.t("module.issuingAuthorities.filter.inactiveOnly","\u063A\u064A\u0631 \u0646\u0634\u0637 \u0641\u0642\u0637"))}</option>`:""}`,n=`<option value="">${t(this.t("module.issuingAuthorities.filter.allFactories","\u0643\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639"))}</option>`+o.map(d=>`<option value="${t(d)}" ${d===e.factory?"selected":""}>${t(d)}</option>`).join(""),r=`<option value="">${t(this.t("module.issuingAuthorities.filter.allDepartments","\u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A"))}</option>`+a.map(d=>`<option value="${t(d)}" ${d===e.department?"selected":""}>${t(d)}</option>`).join(""),l=this._activeCategory==="contractors"?this.t("module.issuingAuthorities.filter.searchPh.contractors","\u0645\u0642\u0627\u0648\u0644\u060C \u0645\u0633\u0624\u0648\u0644\u060C \u0625\u062F\u0627\u0631\u0629\u060C \u0645\u0635\u0646\u0639\u060C \u0645\u0648\u0642\u0639\u2026"):this.t("module.issuingAuthorities.filter.searchPh.employees","\u0627\u0633\u0645\u060C \u0643\u0648\u062F\u060C \u0625\u062F\u0627\u0631\u0629\u060C \u0645\u0635\u0646\u0639\u060C \u0645\u0648\u0642\u0639\u2026");return`
        <div class="ia-filters-row" style="background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:16px 20px;border-radius:10px;border:1px solid #dee2e6;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;align-items:end;">
                <div>
                    <label for="ia-filter-search" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-search" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.filter.search","\u0628\u062D\u062B"))}
                    </label>
                    <input type="text" id="ia-filter-search" class="form-input" placeholder="${t(l)}" value="${t(e.search)}" dir="rtl" style="width:100%;min-height:42px;">
                </div>
                <div>
                    <label for="ia-filter-factory" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-industry" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.filter.factory","\u0627\u0644\u0645\u0635\u0646\u0639"))}
                    </label>
                    <select id="ia-filter-factory" class="form-select" style="width:100%;min-height:42px;">${n}</select>
                </div>
                <div>
                    <label for="ia-filter-department" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-building" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.filter.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629"))}
                    </label>
                    <select id="ia-filter-department" class="form-select" style="width:100%;min-height:42px;">${r}</select>
                </div>
                <div>
                    <label for="ia-filter-status" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-toggle-on" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.filter.status","\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u062C\u0644"))}
                    </label>
                    <select id="ia-filter-status" class="form-select" style="width:100%;min-height:42px;">${s}</select>
                </div>
                <div style="display:flex;align-items:flex-end;gap:8px;">
                    <button type="button" id="ia-filter-reset" class="btn-secondary" style="min-height:42px;white-space:nowrap;">
                        <i class="fas fa-undo" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.filter.reset","\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631"))}
                    </button>
                </div>
            </div>
        </div>`},_exportStyledPermitLetter(e,t){const i=String(e||"X").toUpperCase().trim(),o=["G","Y","X"].includes(i)?i:"X",a=t(o),s="font-weight:800;border-radius:6px;padding:4px 10px;display:inline-block;min-width:22px;text-align:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;";return`<span style="${o==="G"?`${s}background:#dcfce7;color:#166534;border:1px solid #86efac;`:o==="Y"?`${s}background:#fef9c3;color:#854d0e;border:1px solid #fde047;`:`${s}background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;`}">${a}</span>`},_buildExportTableRowsHtml(e,{escapeForHtml:t=!0,isContractorView:i=!1}={}){const o=t&&typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:a=>String(a??"");return e.map((a,s)=>{const n=this.PERMIT_TYPES.map(l=>{const d=String(a[l.key]||"X").toUpperCase().trim();return`<td style="border:1px solid #d1d5db;padding:6px;text-align:center;vertical-align:middle;">${this._exportStyledPermitLetter(d,o)}</td>`}).join(""),r=a.isActive===!1?this.t("module.issuingAuthorities.status.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637"):this.t("module.issuingAuthorities.status.active","\u0646\u0634\u0637");if(i){const l=o(this._displayContractorCompany(a)),d=o(this._displayResponsibleName(a)),m=o(String(a.id||a.employeeCode||"").trim());return`
            <tr>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${s+1}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${m}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${d}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${l}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.departmentName||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.jobTitle||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.branch||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.factory||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.location||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.sublocation||"")}</td>
                ${n}
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${o(r)}</td>
            </tr>`}return`
            <tr>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${s+1}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${o(a.employeeCode||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.name||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.departmentName||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.jobTitle||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.branch||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.factory||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.location||"")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${o(a.sublocation||"")}</td>
                ${n}
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${o(r)}</td>
            </tr>`}).join("")},_buildExportLegendHtml(e){const t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:r=>String(r??""),i=e?"rtl":"ltr",o=t(this.t("module.issuingAuthorities.legend.title","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062C\u062F\u0648\u0644:")),a=t(this.t("module.issuingAuthorities.legend.g","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")),s=t(this.t("module.issuingAuthorities.legend.y","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")),n=t(this.t("module.issuingAuthorities.legend.x","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0647 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639"));return`
        <div class="ia-export-legend" dir="${i}" style="margin-top:20px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:12px;letter-spacing:0.02em;">${o}</div>
            <div style="display:flex;flex-wrap:wrap;gap:12px 22px;align-items:flex-start;font-size:11px;line-height:1.5;color:#334155;">
                <div style="display:flex;align-items:flex-start;gap:10px;min-width:0;flex:1 1 200px;">
                    <span style="flex-shrink:0;display:inline-block;padding:4px 11px;border-radius:6px;font-weight:800;font-size:11px;background:#dcfce7;color:#166534;border:1px solid #86efac;">G</span>
                    <span style="padding-top:2px;">${a}</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;min-width:0;flex:1 1 220px;">
                    <span style="flex-shrink:0;display:inline-block;padding:4px 11px;border-radius:6px;font-weight:800;font-size:11px;background:#fef9c3;color:#854d0e;border:1px solid #fde047;">Y</span>
                    <span style="padding-top:2px;">${s}</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;min-width:0;flex:1 1 180px;">
                    <span style="flex-shrink:0;display:inline-block;padding:4px 11px;border-radius:6px;font-weight:800;font-size:11px;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;">X</span>
                    <span style="padding-top:2px;">${n}</span>
                </div>
            </div>
        </div>`},_buildExportTableHtml(e,t={}){const i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:v=>String(v??""),o=!!t.omitInnerTitle,a=!!t.omitLegend,s=this._getI18nCore()?.getCurrentLang?.()||"ar",n=s!=="en",r=this.PERMIT_TYPES.map(v=>{const{primary:_,secondary:S}=this._permitBilingualHeader(v);return`<th style="border:1px solid #d1d5db;padding:8px;text-align:center;font-size:10px;">${i(_)}<br><span style="color:#6b7280;font-weight:500;">${i(S)}</span></th>`}).join(""),l=this._activeCategory==="contractors",d=this._buildExportTableRowsHtml(e,{escapeForHtml:!0,isContractorView:l}),m=this._tReplace("module.issuingAuthorities.export.titleWithCat","\u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u2014 {{cat}}",{cat:this._categoryTitle()}),p=new Date().toLocaleString(s==="en"?"en-GB":"ar-SA"),c=this._tReplace("module.issuingAuthorities.export.subtitle","\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: {{count}} \u2014 {{date}}",{count:e.length,date:p}),h=i(this.t("module.issuingAuthorities.ptwTagline","PTW Approvers")),f=(v,_)=>i(this.t(v,_)),g=l?`<th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.col.idx","\u0645")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.code","\u0627\u0644\u0643\u0648\u062F")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.name","\u0627\u0644\u0627\u0633\u0645")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.col.contractorSupplier","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.jobTitle","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.branch","\u0627\u0644\u0641\u0631\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.factory","\u0627\u0644\u0645\u0635\u0646\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.sublocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</th>`:`<th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.col.idx","\u0645")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.code","\u0627\u0644\u0643\u0648\u062F")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.name","\u0627\u0644\u0627\u0633\u0645")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.jobTitle","\u0627\u0644\u0648\u0638\u064A\u0641\u0629")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.branch","\u0627\u0644\u0641\u0631\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.factory","\u0627\u0644\u0645\u0635\u0646\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.location","\u0627\u0644\u0645\u0648\u0642\u0639")}</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">${f("module.issuingAuthorities.export.col.sublocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A")}</th>`,y=o?`<p style="margin:0 0 12px;color:#6b7280;font-size:13px;text-align:center;">${i(c)}</p>`:`
        <div style="margin-bottom:16px;text-align:center;">
            <h2 style="margin:0 0 4px;color:#1f2937;font-size:18px;">${i(m)}</h2>
            <p style="margin:0 0 8px;color:#4b5563;font-size:14px;font-weight:600;letter-spacing:0.02em;">${h}</p>
            <p style="margin:0;color:#6b7280;font-size:13px;">${i(c)}</p>
        </div>`,b=f("module.issuingAuthorities.export.col.status","\u0627\u0644\u062D\u0627\u0644\u0629");return`
        ${y}
        <table style="width:100%;border-collapse:collapse;font-size:11px;direction:${n?"rtl":"ltr"};">
            <thead>
                <tr style="background:#f3f4f6;">
                    ${g}
                    ${r}
                    <th style="border:1px solid #d1d5db;padding:8px;">${b}</th>
                </tr>
            </thead>
            <tbody>${d}</tbody>
        </table>
        ${a?"":this._buildExportLegendHtml(n)}`},printFilteredList(){const e=this._getFilteredRecords();if(!e.length){this._iaNotify(this.t("module.issuingAuthorities.export.noDataPrint","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"),"warning");return}const t=this._buildExportTableHtml(e),i=window.open("","_blank");if(!i){this._iaNotify(this.t("module.issuingAuthorities.export.popupBlocked","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"),"error");return}const o=this._getI18nCore()?.getCurrentLang?.()||"ar",a=o!=="en",s=this.t("module.issuingAuthorities.export.docTitle","\u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u2014 PTW Approvers");i.document.write(`<!DOCTYPE html><html dir="${a?"rtl":"ltr"}" lang="${o}"><head><meta charset="UTF-8"><title>${s.replace(/</g,"")}</title></head><body style="padding:16px;font-family:Segoe UI,Tahoma,sans-serif;">${t}</body></html>`),i.document.close();let n=!1;const r=()=>{if(!n){n=!0;try{i.print()}catch{}this._iaNotify(this.t("module.issuingAuthorities.export.printOpened","\u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),"success")}};i.addEventListener("load",()=>setTimeout(r,200)),setTimeout(r,700)},exportListToExcel(){const e=this._getFilteredRecords();if(!e.length){this._iaNotify(this.t("module.issuingAuthorities.export.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631 \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),"warning");return}if(typeof XLSX>"u"){this._iaNotify(this.t("module.issuingAuthorities.export.excelLibMissing","\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629 \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629"),"error");return}try{const t=this._activeCategory==="contractors",i=this.t("module.issuingAuthorities.status.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637"),o=this.t("module.issuingAuthorities.status.active","\u0646\u0634\u0637"),a=this.t("module.issuingAuthorities.export.permitPrefix","\u062A\u0635\u0631\u064A\u062D:"),s=this.t("module.issuingAuthorities.col.idx","\u0645"),n=this.t("module.issuingAuthorities.export.col.code","\u0627\u0644\u0643\u0648\u062F"),r=this.t("module.issuingAuthorities.export.col.name","\u0627\u0644\u0627\u0633\u0645"),l=this.t("module.issuingAuthorities.col.contractorSupplier","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F"),d=this.t("module.issuingAuthorities.export.col.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629"),m=this.t("module.issuingAuthorities.export.col.jobTitle","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),p=this.t("module.issuingAuthorities.export.col.branch","\u0627\u0644\u0641\u0631\u0639"),c=this.t("module.issuingAuthorities.export.col.factory","\u0627\u0644\u0645\u0635\u0646\u0639"),h=this.t("module.issuingAuthorities.export.col.location","\u0627\u0644\u0645\u0648\u0642\u0639"),f=this.t("module.issuingAuthorities.export.col.sublocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"),g=this.t("module.issuingAuthorities.export.col.status","\u0627\u0644\u062D\u0627\u0644\u0629"),y=e.map((u,x)=>{const A=t?{[s]:x+1,[n]:String(u.id||u.employeeCode||"").trim(),[r]:this._displayResponsibleName(u),[l]:this._displayContractorCompany(u),[d]:u.departmentName||"",[m]:u.jobTitle||"",[p]:u.branch||"",[c]:u.factory||"",[h]:u.location||"",[f]:u.sublocation||"",[g]:u.isActive===!1?i:o}:{[s]:x+1,[n]:u.employeeCode||"",[r]:u.name||"",[d]:u.departmentName||"",[m]:u.jobTitle||"",[p]:u.branch||"",[c]:u.factory||"",[h]:u.location||"",[f]:u.sublocation||"",[g]:u.isActive===!1?i:o};return this.PERMIT_TYPES.forEach(w=>{A[`${a} ${this._permitLabel(w)}`]=String(u[w.key]||"X").toUpperCase()}),A});if(y.length){const u=Object.keys(y[0]),x=Object.fromEntries(u.map(w=>[w,""])),A=u[0];y.push(x),y.push({...x,[A]:this.t("module.issuingAuthorities.legend.title","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062C\u062F\u0648\u0644:")}),y.push({...x,[A]:`G \u2014 ${this.t("module.issuingAuthorities.legend.g","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A")}`}),y.push({...x,[A]:`Y \u2014 ${this.t("module.issuingAuthorities.legend.y","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629")}`}),y.push({...x,[A]:`X \u2014 ${this.t("module.issuingAuthorities.legend.x","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0647 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639")}`})}const b=XLSX.utils.book_new(),v=XLSX.utils.json_to_sheet(y),_=this._activeCategory==="contractors"?this.t("module.issuingAuthorities.excel.sheet.contractors","\u0645\u0635\u0631\u062D_\u0645\u0642\u0627\u0648\u0644\u064A\u0646"):this.t("module.issuingAuthorities.excel.sheet.employees","\u0645\u0635\u0631\u062D_\u0645\u0648\u0638\u0641\u064A\u0646");XLSX.utils.book_append_sheet(b,v,_.slice(0,31));const S=`IssuingAuthorities_${this._activeCategory}_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(b,S),this._iaNotify(this.t("module.issuingAuthorities.export.excelOk","\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 Excel \u0628\u0646\u062C\u0627\u062D"),"success")}catch(t){typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities.exportListToExcel",t),this._iaNotify(this.t("module.issuingAuthorities.export.excelFail","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel"),"error")}},exportListToPDF(){const e=this._getFilteredRecords();if(!e.length){this._iaNotify(this.t("module.issuingAuthorities.export.noDataExport","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631 \u0644\u0644\u062A\u0635\u062F\u064A\u0631"),"warning");return}let t=null;try{const i=this._buildExportTableHtml(e,{omitInnerTitle:!0,omitLegend:!0}),o=`IA-LIST-${new Date().toISOString().slice(0,10)}`,a=this._getI18nCore(),s=a?a.t("module.issuingAuthorities.form.pdfTitle","ar","\u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"):"\u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",n=a?a.t("module.issuingAuthorities.ptwTagline","en","PTW Approvers"):"PTW Approvers",r=new Date().toISOString(),l=a?.getCurrentLang?.()||"ar",d=l!=="en",m=this._buildExportLegendHtml(d),p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(o,s,i,!1,!1,{source:"IssuingAuthorities",titleEn:n,titleAr:s,version:AppState?.companySettings?.formVersion||"1.0",includeQRCode:!1,footerLegendHtml:m,compactPdfFooter:!0},r,r):`<!DOCTYPE html><html dir="${d?"rtl":"ltr"}" lang="${l}"><head><meta charset="UTF-8"><title>${s} \u2014 ${n}</title></head><body style="padding:16px;">${i}</body></html>`,c=new Blob([p],{type:"text/html;charset=utf-8"});t=URL.createObjectURL(c);const h=window.open(t,"_blank");if(h){const f=()=>{try{t&&URL.revokeObjectURL(t)}catch{}};let g=!1;const y=()=>{if(!g){g=!0;try{h.focus(),h.print()}catch{}this._iaNotify(this.t("module.issuingAuthorities.export.pdfReady","\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 PDF / \u0627\u0644\u0637\u0628\u0627\u0639\u0629"),"success"),setTimeout(f,1200)}};h.addEventListener("load",()=>setTimeout(y,350)),setTimeout(y,900)}else t&&URL.revokeObjectURL(t),this._iaNotify(this.t("module.issuingAuthorities.export.popupBlockedPdf","\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629"),"error")}catch(i){if(t)try{URL.revokeObjectURL(t)}catch{}typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities.exportListToPDF",i),this._iaNotify(this.t("module.issuingAuthorities.export.pdfFail","\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF"),"error")}},_bindListFilterEvents(){const e=()=>this._applyFiltersAndRender();document.getElementById("ia-filter-factory")?.addEventListener("change",e),document.getElementById("ia-filter-department")?.addEventListener("change",e),document.getElementById("ia-filter-status")?.addEventListener("change",e);const t=document.getElementById("ia-filter-search");t&&t.addEventListener("input",()=>{this._filterSearchTimer&&clearTimeout(this._filterSearchTimer),this._filterSearchTimer=setTimeout(()=>this._applyFiltersAndRender(),320)}),document.getElementById("ia-filter-reset")?.addEventListener("click",()=>{this._listFilters={search:"",factory:"",department:"",status:""};const i=document.getElementById("ia-filter-search");i&&(i.value="");const o=document.getElementById("ia-filter-factory");o&&(o.value="");const a=document.getElementById("ia-filter-department");a&&(a.value="");const s=document.getElementById("ia-filter-status");s&&(s.value=""),this._applyFiltersAndRender(),this._syncFilterDropdowns()}),document.getElementById("ia-print-btn")?.addEventListener("click",()=>this.printFilteredList()),document.getElementById("ia-export-excel-btn")?.addEventListener("click",()=>this.exportListToExcel()),document.getElementById("ia-export-pdf-btn")?.addEventListener("click",()=>this.exportListToPDF())},computeIaAdminStats(e){const t=Array.isArray(e)?e:[];let i=0,o=0,a=0,s=0,n=0;const r=new Set,l=new Set,d=new Set;return t.forEach(m=>{m&&m.isActive===!1?o+=1:i+=1;let p=!1,c=!1;(this.PERMIT_TYPES||[]).forEach(y=>{const b=String(m&&m[y.key]||"X").toUpperCase().trim();b==="G"?p=!0:b==="Y"&&(c=!0)}),p&&(a+=1),c&&(s+=1),!p&&!c&&(n+=1);const h=String(m?.factory||m?.factoryId||"").trim();h&&r.add(h);const f=String(m?.departmentName||"").trim();f&&l.add(f);const g=String(m?.approvalRole||"").trim();g&&d.add(g)}),{total:t.length,active:i,inactive:o,withG:a,withY:s,onlyX:n,factories:r.size,departments:l.size,roles:d.size}},ensureIaAdminStatsStyles(){const e="ia-admin-stats-styles-v1";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
            #ia-admin-stats {
                --ias-navy: #003865;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
                gap: 0.85rem;
                margin: 0 0 1.15rem;
                align-items: stretch;
            }
            #ia-admin-stats .ias-card {
                --ias-accent: var(--ias-navy);
                --ias-accent-soft: #e8f1f8;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                gap: 0.55rem;
                min-height: 118px;
                padding: 1rem 1.05rem 0.95rem;
                border-radius: 14px;
                background: linear-gradient(155deg, #ffffff 0%, var(--ias-accent-soft) 125%);
                border: 1px solid color-mix(in srgb, var(--ias-accent) 16%, #e2e8f0);
                box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 20px rgba(15, 23, 42, 0.035);
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            #ia-admin-stats .ias-card::after {
                content: '';
                position: absolute;
                inset-inline-start: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background: linear-gradient(180deg, var(--ias-accent), color-mix(in srgb, var(--ias-accent) 40%, #fff));
                border-radius: 14px 0 0 14px;
            }
            [dir="rtl"] #ia-admin-stats .ias-card::after { border-radius: 0 14px 14px 0; }
            #ia-admin-stats .ias-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07), 0 12px 28px rgba(15, 23, 42, 0.05);
                border-color: color-mix(in srgb, var(--ias-accent) 28%, #e2e8f0);
            }
            #ia-admin-stats .ias-card__top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 0.5rem;
                position: relative;
                z-index: 1;
            }
            #ia-admin-stats .ias-card__icon {
                width: 38px;
                height: 38px;
                border-radius: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background: color-mix(in srgb, var(--ias-accent) 12%, #fff);
                color: var(--ias-accent);
                font-size: 0.95rem;
                box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ias-accent) 14%, transparent);
            }
            #ia-admin-stats .ias-card__label {
                margin: 0;
                font-size: 0.78rem;
                font-weight: 700;
                color: #334155;
                line-height: 1.35;
            }
            #ia-admin-stats .ias-card__hint {
                margin: 0.15rem 0 0;
                font-size: 0.68rem;
                color: #64748b;
                line-height: 1.4;
            }
            #ia-admin-stats .ias-card__value {
                position: relative;
                z-index: 1;
                margin-top: auto;
                font-size: 1.7rem;
                font-weight: 800;
                letter-spacing: -0.03em;
                line-height: 1;
                color: var(--ias-accent);
                font-variant-numeric: tabular-nums;
            }
            #ia-admin-stats .ias-card__foot {
                position: relative;
                z-index: 1;
                font-size: 0.68rem;
                color: #64748b;
                font-weight: 600;
            }
            #ia-admin-stats .ias-card--total { --ias-accent: #003865; --ias-accent-soft: #e8f1f8; }
            #ia-admin-stats .ias-card--active { --ias-accent: #0f766e; --ias-accent-soft: #ecfdf8; }
            #ia-admin-stats .ias-card--g { --ias-accent: #15803d; --ias-accent-soft: #f0fdf4; }
            #ia-admin-stats .ias-card--y { --ias-accent: #b45309; --ias-accent-soft: #fffbeb; }
            #ia-admin-stats .ias-card--x { --ias-accent: #b91c1c; --ias-accent-soft: #fef2f2; }
            #ia-admin-stats .ias-card--factory { --ias-accent: #1d4ed8; --ias-accent-soft: #eff6ff; }
            #ia-admin-stats .ias-card--dept { --ias-accent: #0369a1; --ias-accent-soft: #f0f9ff; }
            #ia-admin-stats .ias-card--role { --ias-accent: #7c3aed; --ias-accent-soft: #f5f3ff; }
            @media (max-width: 640px) {
                #ia-admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                #ia-admin-stats .ias-card__value { font-size: 1.45rem; }
            }
        `,document.head.appendChild(t)},renderIaAdminStatsCards(e){this.ensureIaAdminStatsStyles();const t=e||this.computeIaAdminStats(this._data||[]),i=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??""),o=this._categoryTitle(),a=n=>t.total?Math.round(n/Math.max(t.total,1)*100):0,s=[{key:"total",cls:"ias-card--total",icon:"fa-users",label:this.t("module.issuingAuthorities.stats.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A"),hint:this._tReplace("module.issuingAuthorities.stats.totalHint","\u0642\u0627\u0626\u0645\u0629 {{cat}} \u0627\u0644\u062D\u0627\u0644\u064A\u0629",{cat:o}),value:t.total,foot:t.inactive?`${t.inactive} ${this.t("module.issuingAuthorities.stats.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}`:this.t("module.issuingAuthorities.stats.allActiveHint","\u0644\u0627 \u0633\u062C\u0644\u0627\u062A \u0645\u0639\u0637\u0651\u0644\u0629")},{key:"active",cls:"ias-card--active",icon:"fa-user-check",label:this.t("module.issuingAuthorities.stats.active","\u0633\u062C\u0644\u0627\u062A \u0646\u0634\u0637\u0629"),hint:this.t("module.issuingAuthorities.stats.activeHint","\u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"),value:t.active,foot:`${a(t.active)}% ${this.t("module.issuingAuthorities.stats.ofTotal","\u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A")}`},{key:"withG",cls:"ias-card--g",icon:"fa-certificate",label:this.t("module.issuingAuthorities.stats.withG","\u0645\u0635\u0631\u062D\u0648\u0646 (G)"),hint:this.t("module.issuingAuthorities.stats.withGHint","\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0644\u0646\u0648\u0639 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),value:t.withG,foot:`${a(t.withG)}% ${this.t("module.issuingAuthorities.stats.coverage","\u062A\u063A\u0637\u064A\u0629")}`},{key:"withY",cls:"ias-card--y",icon:"fa-handshake",label:this.t("module.issuingAuthorities.stats.withY","\u064A\u062D\u062A\u0627\u062C \u062A\u0646\u0633\u064A\u0642 (Y)"),hint:this.t("module.issuingAuthorities.stats.withYHint","\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u062A\u0646\u0633\u064A\u0642 HSE \u0644\u0646\u0648\u0639 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),value:t.withY,foot:this.t("module.issuingAuthorities.stats.withYFoot","\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")},{key:"onlyX",cls:"ias-card--x",icon:"fa-ban",label:this.t("module.issuingAuthorities.stats.onlyX","\u0628\u0644\u0627 \u0635\u0644\u0627\u062D\u064A\u0629 \u062A\u0648\u0642\u064A\u0639 (X)"),hint:this.t("module.issuingAuthorities.stats.onlyXHint","\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644\u0629"),value:t.onlyX,foot:this.t("module.issuingAuthorities.stats.onlyXFoot","\u0642\u062F \u064A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A")},{key:"factories",cls:"ias-card--factory",icon:"fa-industry",label:this.t("module.issuingAuthorities.stats.factories","\u0645\u0635\u0627\u0646\u0639 \u0645\u063A\u0637\u0627\u0629"),hint:this.t("module.issuingAuthorities.stats.factoriesHint","\u0639\u062F\u062F \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629"),value:t.factories,foot:this.t("module.issuingAuthorities.stats.scopeFoot","\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u0642\u0639")},{key:"departments",cls:"ias-card--dept",icon:"fa-sitemap",label:this.t("module.issuingAuthorities.stats.departments","\u0625\u062F\u0627\u0631\u0627\u062A \u0645\u063A\u0637\u0627\u0629"),hint:this.t("module.issuingAuthorities.stats.departmentsHint","\u062A\u0646\u0648\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u0629"),value:t.departments,foot:this.t("module.issuingAuthorities.stats.orgFoot","\u062A\u0648\u0632\u064A\u0639 \u062A\u0646\u0638\u064A\u0645\u064A")},{key:"roles",cls:"ias-card--role",icon:"fa-user-tag",label:this.t("module.issuingAuthorities.stats.roles","\u0623\u062F\u0648\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F"),hint:this.t("module.issuingAuthorities.stats.rolesHint","\u0623\u0646\u0648\u0627\u0639 \u0623\u062F\u0648\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629"),value:t.roles,foot:this.t("module.issuingAuthorities.stats.rolesFoot","\u062A\u0646\u0648\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}];return`
            <div id="ia-admin-stats" class="ia-admin-stats" role="region" aria-label="${i(this.t("module.issuingAuthorities.stats.region","\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"))}">
                ${s.map(n=>`
                    <article class="ias-card ${n.cls}" data-ias="${n.key}">
                        <div class="ias-card__top">
                            <div>
                                <p class="ias-card__label">${i(n.label)}</p>
                                <p class="ias-card__hint">${i(n.hint)}</p>
                            </div>
                            <div class="ias-card__icon" aria-hidden="true"><i class="fas ${n.icon}"></i></div>
                        </div>
                        <div class="ias-card__value" data-ias-value="${n.key}">${Number(n.value)||0}</div>
                        <div class="ias-card__foot" data-ias-foot="${n.key}">${i(n.foot)}</div>
                    </article>
                `).join("")}
            </div>
        `},updateIaAdminStatsCards(e){const t=document.getElementById("ia-admin-stats");if(!t)return;const i=this.computeIaAdminStats(e??(this._data||[])),o=l=>i.total?Math.round(l/Math.max(i.total,1)*100):0,a=this._categoryTitle(),s={total:i.total,active:i.active,withG:i.withG,withY:i.withY,onlyX:i.onlyX,factories:i.factories,departments:i.departments,roles:i.roles},n={total:i.inactive?`${i.inactive} ${this.t("module.issuingAuthorities.stats.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}`:this.t("module.issuingAuthorities.stats.allActiveHint","\u0644\u0627 \u0633\u062C\u0644\u0627\u062A \u0645\u0639\u0637\u0651\u0644\u0629"),active:`${o(i.active)}% ${this.t("module.issuingAuthorities.stats.ofTotal","\u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A")}`,withG:`${o(i.withG)}% ${this.t("module.issuingAuthorities.stats.coverage","\u062A\u063A\u0637\u064A\u0629")}`,withY:this.t("module.issuingAuthorities.stats.withYFoot","\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),onlyX:this.t("module.issuingAuthorities.stats.onlyXFoot","\u0642\u062F \u064A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A"),factories:this.t("module.issuingAuthorities.stats.scopeFoot","\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u0642\u0639"),departments:this.t("module.issuingAuthorities.stats.orgFoot","\u062A\u0648\u0632\u064A\u0639 \u062A\u0646\u0638\u064A\u0645\u064A"),roles:this.t("module.issuingAuthorities.stats.rolesFoot","\u062A\u0646\u0648\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")},r=t.querySelector('[data-ias="total"] .ias-card__hint');r&&(r.textContent=this._tReplace("module.issuingAuthorities.stats.totalHint","\u0642\u0627\u0626\u0645\u0629 {{cat}} \u0627\u0644\u062D\u0627\u0644\u064A\u0629",{cat:a})),Object.keys(s).forEach(l=>{const d=t.querySelector(`[data-ias-value="${l}"]`),m=t.querySelector(`[data-ias-foot="${l}"]`);d&&(d.textContent=String(Number(s[l])||0)),m&&n[l]!=null&&(m.textContent=n[l])})},_renderShell(){const e=this.hasIssuingAuthoritiesModuleAccess(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:s=>String(s??""),i=t(this._tReplace("module.issuingAuthorities.sectionSubtitle","\u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0626\u0645\u0629: {{cat}} \u2014 {{tag}}",{cat:this._categoryTitle(),tag:this.t("module.issuingAuthorities.ptwTagline","PTW Approvers")})),o=t(this.t("module.issuingAuthorities.cardCurrentList","\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629:")),a=t(this._categoryTitle());return`
        <div class="section-header" style="margin-bottom:0.5rem;">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 class="section-title">
                        <i class="fas fa-user-check ml-3"></i>
                        ${t(this.t("module.issuingAuthorities.pageTitle","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u0628\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"))}
                    </h1>
                    <p id="ia-section-module-subtitle" class="section-subtitle">
                        ${i}
                    </p>
                </div>
            </div>
        </div>
        ${this.renderIaAdminStatsCards(this.computeIaAdminStats(this._data||[]))}
        <div class="ia-module" id="ia-module-root">
            <div class="content-card">
                <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                    <div>
                        <p id="ia-card-subtitle" class="card-subtitle" style="margin:0;color:#64748b;font-size:0.9rem;font-weight:600;">
                            <span style="color:#334155;">${o}</span> ${a}
                        </p>
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                        ${e?`
                        <button class="btn-primary" id="ia-add-btn" style="gap:6px;">
                            <i class="fas fa-plus"></i>
                            <span>${t(this.t("module.issuingAuthorities.btn.addPerson","\u0625\u0636\u0627\u0641\u0629 \u0634\u062E\u0635"))}</span>
                        </button>`:""}
                        <button type="button" class="btn-secondary" id="ia-print-btn" style="gap:6px;" title="${t(this.t("module.issuingAuthorities.btn.printTitle","\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629"))}">
                            <i class="fas fa-print"></i>
                            <span>${t(this.t("module.issuingAuthorities.btn.print","\u0637\u0628\u0627\u0639\u0629"))}</span>
                        </button>
                        <button type="button" class="btn-success" id="ia-export-excel-btn" style="gap:6px;" title="${t(this.t("module.issuingAuthorities.btn.excelTitle","\u062A\u0635\u062F\u064A\u0631 Excel \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629"))}">
                            <i class="fas fa-file-excel"></i>
                            <span>${t(this.t("module.issuingAuthorities.btn.excel","Excel"))}</span>
                        </button>
                        <button type="button" class="btn-secondary" id="ia-export-pdf-btn" style="gap:6px;" title="${t(this.t("module.issuingAuthorities.btn.pdfTitle","\u062A\u0635\u062F\u064A\u0631 / \u0637\u0628\u0627\u0639\u0629 PDF"))}">
                            <i class="fas fa-file-pdf"></i>
                            <span>${t(this.t("module.issuingAuthorities.btn.pdf","PDF"))}</span>
                        </button>
                        <button class="btn-secondary" id="ia-refresh-btn" style="gap:6px;" title="${t(this.t("module.common.refresh","\u062A\u062D\u062F\u064A\u062B"))}">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>

                <div style="padding:0 16px 10px;">
                    <div class="ia-category-tabs">
                        <button type="button" class="ia-tab-btn ${this._activeCategory==="employees"?"active":""}" data-category="employees">${t(this.t("module.issuingAuthorities.cat.employees","\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"))}</button>
                        <button type="button" class="ia-tab-btn ${this._activeCategory==="contractors"?"active":""}" data-category="contractors">${t(this.t("module.issuingAuthorities.cat.contractors","\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"))}</button>
                    </div>
                </div>

                <!-- \u0634\u0631\u062D \u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062C\u062F\u0648\u0644 -->
                <div class="ia-legend" style="margin:0 16px 12px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
                    <strong style="font-size:0.82rem;color:#475569;">${t(this.t("module.issuingAuthorities.legend.title","\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062C\u062F\u0648\u0644:"))}</strong>
                    <span class="ia-badge-g" style="margin-right:10px;">G</span>
                    <span style="font-size:0.82rem;color:#166534;margin-left:4px;">${t(this.t("module.issuingAuthorities.legend.g","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"))}</span>
                    <span class="ia-badge-y" style="margin-right:14px;">Y</span>
                    <span style="font-size:0.82rem;color:#854d0e;margin-left:4px;">${t(this.t("module.issuingAuthorities.legend.y","\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"))}</span>
                    <span class="ia-badge-x" style="margin-right:14px;">X</span>
                    <span style="font-size:0.82rem;color:#991b1b;margin-left:4px;">${t(this.t("module.issuingAuthorities.legend.x","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0647 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639"))}</span>
                </div>

                <div id="ia-filters-wrap" style="margin:0 16px 12px;">
                    ${this._renderFiltersHtml()}
                </div>
                <p id="ia-filter-count" style="margin:0 16px 8px;font-size:0.82rem;color:#64748b;display:none;"></p>

                <div class="card-body" style="padding:0 0 16px;">
                    <div id="ia-table-wrapper" style="overflow-x:auto;">
                        <div id="ia-loading" style="text-align:center;padding:40px;">
                            <i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:#2563eb;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 -->
        <div id="ia-modal-overlay" class="modal-overlay" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="ia-modal-title">
            <div class="modal-container ia-modal-container" style="max-width:900px;width:95%;">
                <div class="modal-header">
                    <h3 id="ia-modal-title" class="modal-title">${t(this.t("module.issuingAuthorities.modal.addTitle","\u0625\u0636\u0627\u0641\u0629 \u0634\u062E\u0635 \u0645\u0635\u0631\u062D \u0644\u0647"))}</h3>
                    <button class="modal-close" id="ia-modal-close" aria-label="${t(this.t("module.issuingAuthorities.modal.closeAria","\u0625\u063A\u0644\u0627\u0642"))}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ia-modal-body" id="ia-modal-body">
                    ${this._renderForm()}
                </div>
                <div class="modal-footer ia-modal-footer">
                    <button class="btn-secondary" id="ia-modal-cancel">${t(this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button class="btn-primary" id="ia-modal-save">
                        <i class="fas fa-save" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.modal.save","\u062D\u0641\u0638"))}
                    </button>
                </div>
            </div>
        </div>

        <!-- Confirm Delete Modal -->
        <div id="ia-delete-modal" class="modal-overlay" style="display:none;">
            <div class="modal-container" style="max-width:420px;width:90%;">
                <div class="modal-header">
                    <h3 class="modal-title" style="color:#dc2626;">
                        <i class="fas fa-exclamation-triangle" style="margin-left:8px;"></i>
                        ${t(this.t("module.issuingAuthorities.delete.title","\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641"))}
                    </h3>
                </div>
                <div class="modal-body">
                    <p id="ia-delete-msg" style="color:#374151;"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" id="ia-delete-cancel">${t(this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))}</button>
                    <button class="btn-danger" id="ia-delete-confirm">
                        <i class="fas fa-trash" style="margin-left:6px;"></i>${t(this.t("module.issuingAuthorities.delete.btn","\u062D\u0630\u0641"))}
                    </button>
                </div>
            </div>
        </div>
        `},_renderViewDetails(e){if(!e)return'<p class="text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629.</p>';const t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:p=>String(p??""),i=String(e.personType||"").toLowerCase()==="contractor"?"contractor":"employee",o=i==="contractor"?this._responsibleNameFromRecord(e):e.name||"\u2014",a=i==="contractor"?this._contractorCompanyFromRecord(e):"",s=this._approvalRoleLabel(e.approvalRole),n=e.isActive!==!1;let r=0,l=0,d=0;const m=this.PERMIT_TYPES.map(p=>{const c=String(e[p.key]||"X").toUpperCase();c==="G"?r++:c==="Y"?l++:d++;const{primary:h,secondary:f}=this._permitBilingualHeader(p);let g="#f1f5f9",y="#64748b",b="#cbd5e1",v="\u063A\u064A\u0631 \u0645\u0635\u0631\u062D (X)",_="fa-ban";return c==="G"?(g="#dcfce7",y="#15803d",b="#86efac",v="\u062A\u0648\u0642\u064A\u0639 \u0645\u0628\u0627\u0634\u0631 (G)",_="fa-check-circle"):c==="Y"&&(g="#fef3c7",y="#b45309",b="#fcd34d",v="\u0628\u062A\u0646\u0633\u064A\u0642 HSE (Y)",_="fa-exclamation-triangle"),`
            <div style="background: #ffffff; border-radius: 10px; border: 1px solid ${b}; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                <div style="min-width: 0;">
                    <div style="font-weight: 700; font-size: 0.9rem; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t(h)}</div>
                    <div style="font-size: 0.75rem; color: #64748b;">${t(f)}</div>
                </div>
                <div style="flex-shrink: 0; background: ${g}; color: ${y}; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fas ${_}"></i>
                    <span>${v}</span>
                </div>
            </div>
            `}).join("");return`
        <div class="ia-view-profile" style="display: flex; flex-direction: column; gap: 20px; font-family: 'Cairo', 'Inter', sans-serif;">
            <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 14px; padding: 20px 24px; color: #ffffff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(59, 130, 246, 0.5); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #60a5fa;">
                        <i class="fas ${i==="contractor"?"fa-hard-hat":"fa-user-shield"}"></i>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin: 0;">${t(o)}</h3>
                            <span class="badge" style="background: ${n?"rgba(16, 185, 129, 0.25)":"rgba(239, 68, 68, 0.25)"}; color: ${n?"#6ee7b7":"#fca5a5"}; border: 1px solid ${n?"rgba(16, 185, 129, 0.4)":"rgba(239, 68, 68, 0.4)"}; font-size: 0.75rem; font-weight: 700; padding: 2px 10px; border-radius: 20px;">
                                <i class="fas ${n?"fa-check-circle":"fa-times-circle"} ml-1"></i> ${n?"\u062D\u0633\u0627\u0628 \u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                            </span>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 0.85rem; color: #cbd5e1;">
                            <span class="badge" style="background: rgba(255,255,255,0.1); padding: 3px 10px; border-radius: 6px;">
                                <i class="fas ${i==="contractor"?"fa-building text-sky-400":"fa-id-card text-indigo-400"} ml-1"></i>
                                ${i==="contractor"?t(a)||"\u062C\u0647\u0629 \u0645\u0642\u0627\u0648\u0644":e.employeeCode?`\u0643\u0648\u062F: ${t(e.employeeCode)}`:"\u0645\u0648\u0638\u0641"}
                            </span>
                            <span>\u2022</span>
                            <span style="color: #38bdf8; font-weight: 600;">${t(s||"\u062F\u0648\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u0634\u0628\u0643\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644 -->
            <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                    <i class="fas fa-id-card text-blue-600"></i>
                    \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${i==="contractor"?"\u0645\u0642\u0627\u0648\u0644 / \u0645\u0648\u0631\u062F \u062E\u0627\u0631\u062C\u064A":"\u0645\u0648\u0638\u0641 \u062F\u0627\u062E\u0644\u064A"}</div>
                    </div>
                    ${i==="contractor"?`
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0284c7;">${t(a||"\u2014")}</div>
                    </div>
                    `:`
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${t(e.employeeCode||"\u2014")}</div>
                    </div>
                    `}
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 / \u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${t(e.jobTitle||"\u2014")}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${t(e.departmentName||"\u2014")}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0641\u0631\u0639</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${t(e.factory||e.branch||"\u2014")}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</div>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">${t(e.sublocation||e.location||"\u2014")}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</div>
                        <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a; direction: ltr; text-align: right;">${t(e.email||"\u2014")}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 2px;">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</div>
                        <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a; direction: ltr; text-align: right;">${t(e.phone||"\u2014")}</div>
                    </div>
                </div>
            </div>

            <!-- \u0645\u0635\u0641\u0648\u0641\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u064A\u0639 -->
            <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-signature text-emerald-600"></i>
                        \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 (Permits Authorization)
                    </h4>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="badge" style="background: #dcfce7; color: #15803d; border: 1px solid #86efac; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px;">\u0645\u0628\u0627\u0634\u0631 (G): ${r}</span>
                        <span class="badge" style="background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px;">\u062A\u0646\u0633\u064A\u0642 HSE (Y): ${l}</span>
                        <span class="badge" style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px;">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D (X): ${d}</span>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
                    ${m}
                </div>
            </div>

            ${e.notes?`
            <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
            <div style="background: #fffbeb; border-radius: 10px; border: 1px solid #fef3c7; padding: 14px 16px;">
                <div style="font-size: 0.8rem; font-weight: 700; color: #92400e; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                    <i class="fas fa-sticky-note"></i> \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0633\u062C\u0644:
                </div>
                <div style="font-size: 0.9rem; color: #78350f; line-height: 1.5;">${t(e.notes)}</div>
            </div>
            `:""}
        </div>
        `},_renderForm(e){const t=p=>e&&e[p]||"",i=p=>e?String(e[p]||"X").toUpperCase():"X",o=String(t("personType")||(this._activeCategory==="contractors"?"contractor":"employee")).toLowerCase()==="contractor"?"contractor":"employee",a=o==="contractor"?this._contractorCompanyFromRecord(e):"",s=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:p=>String(p??""),n=(this._contractorOptions||[]).map(p=>`
            <option value="${s(p.name)}" ${a===p.name?"selected":""}>${s(p.name)}</option>
        `).join(""),r=o==="contractor"?this._responsibleNameFromRecord(e):t("name"),l=o==="contractor"?`${this.t("module.issuingAuthorities.form.nameContractor","\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0629")} <span style="color:red;">*</span>`:`${this.t("module.issuingAuthorities.form.nameEmployee","\u0627\u0644\u0627\u0633\u0645")} <span style="color:red;">*</span>`,d=o==="contractor"?this.t("module.issuingAuthorities.form.namePh.contractor","\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0646 \u062C\u0647\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062F\u0648\u064A\u0627\u064B"):this.t("module.issuingAuthorities.form.namePh.employee","\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647"),m=this.PERMIT_TYPES.map(p=>{const{primary:c,secondary:h}=this._permitBilingualHeader(p);return`
            <div class="ia-permit-row">
                <label class="ia-permit-label">
                    <span>${s(c)}</span>
                    <span class="ia-permit-label-en">${s(h)}</span>
                </label>
                <div class="ia-radio-group">
                    ${["G","Y","X"].map(f=>`
                        <label class="ia-radio-label ia-radio-${f.toLowerCase()} ${i(p.key)===f?"is-selected":""}">
                            <input type="radio" name="permit_${p.key}" value="${f}" ${i(p.key)===f?"checked":""} style="display:none;">
                            ${f}
                        </label>
                    `).join("")}
                </div>
            </div>
        `}).join("");return`
        <div class="ia-form ia-form-grid">
            <div id="ia-form-alerts" class="ia-form-alerts" style="display:none;margin-bottom:10px;"></div>
            <section class="ia-form-section">
                <h4 class="ia-form-section-title">${s(this.t("module.issuingAuthorities.form.section.person","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635"))}</h4>
                <div class="ia-person-mode-hint" id="ia-person-mode-hint">
                    ${s(o==="employee"?this.t("module.issuingAuthorities.form.hint.employee",'\u0648\u0636\u0639 \u0627\u0644\u0645\u0648\u0638\u0641: \u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u062B\u0645 \u0627\u0636\u063A\u0637 "\u0628\u062D\u062B" \u0644\u0645\u0644\u0621 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.'):this.t("module.issuingAuthorities.form.hint.contractor","\u0648\u0636\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629\u060C \u062B\u0645 \u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0629 \u064A\u062F\u0648\u064A\u0627\u064B."))}
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.personType","\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"))} <span style="color:red;">*</span></label>
                    <select id="ia-f-person-type" class="form-select ia-form-select">
                        <option value="employee" ${o==="employee"?"selected":""}>${s(this.t("module.issuingAuthorities.form.personType.employee","\u0645\u0648\u0638\u0641"))}</option>
                        <option value="contractor" ${o==="contractor"?"selected":""}>${s(this.t("module.issuingAuthorities.form.personType.contractor","\u0645\u0642\u0627\u0648\u0644"))}</option>
                    </select>
                </div>
                <div class="form-group ia-contractor-wrap" id="ia-contractor-wrap" style="${o==="contractor"?"":"display:none;"}">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.contractor","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F"))} <span style="color:red;">*</span></label>
                    <select id="ia-f-contractor-name" class="form-select ia-form-select">
                        <option value="">${s(this.t("module.issuingAuthorities.form.contractorPlaceholder","\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F \u2014"))}</option>
                        ${n}
                    </select>
                </div>
                <div class="form-group ia-employee-code-wrap" id="ia-employee-code-wrap" style="${o==="employee"?"":"display:none;"}">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.employeeCode","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))} <span style="color:red;">*</span></label>
                    <div class="ia-employee-lookup-row">
                        <input type="text" id="ia-f-employee-code" class="form-input" value="${t("employeeCode")}" placeholder="${s(this.t("module.issuingAuthorities.form.employeeCodePh","\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}">
                        <button type="button" class="btn-secondary ia-lookup-btn" id="ia-lookup-employee-btn">${s(this.t("module.issuingAuthorities.form.lookup","\u0628\u062D\u062B"))}</button>
                    </div>
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${l}</label>
                    <input type="text" id="ia-f-name" class="form-input" value="${s(o==="contractor"?r:t("name"))}" placeholder="${s(d)}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645"))}</label>
                    ${this._renderDepartmentControl(t("departmentName"))}
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.jobTitle","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"))}</label>
                    <input type="text" id="ia-f-job-title" class="form-input" value="${t("jobTitle")}" placeholder="${s(this.t("module.issuingAuthorities.form.jobTitlePh","\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"))}">
                </div>
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.approvalRole","\u062F\u0648\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A \u062A\u0635\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"))}</label>
                    <select id="ia-f-approval-role" class="form-select ia-form-select">
                        ${this._renderApprovalRoleOptions(t("approvalRole"))}
                    </select>
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.branch","\u0627\u0644\u0641\u0631\u0639 / Branch"))}</label>
                    <input type="text" id="ia-f-branch" class="form-input" value="${t("branch")||""}" placeholder="${s(this.t("module.issuingAuthorities.form.branchPh","\u0627\u0633\u0645 \u0627\u0644\u0641\u0631\u0639"))}">
                </div>
                <div class="form-group"></div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.location","\u0627\u0644\u0645\u0648\u0642\u0639"))}</label>
                    <input type="text" id="ia-f-location" class="form-input" value="${t("location")}" placeholder="${s(this.t("module.issuingAuthorities.form.locationPh","\u0627\u0644\u0645\u0648\u0642\u0639"))}">
                </div>
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.factory","\u0627\u0644\u0645\u0635\u0646\u0639"))}</label>
                    <select id="ia-f-factory" class="form-select ia-form-select">
                        ${this._renderFactoryOptions(t("factoryId")||t("factory"))}
                    </select>
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.sublocation","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"))}</label>
                    <select id="ia-f-sublocation" class="form-select ia-form-select">
                        ${this._renderSublocationOptions(t("factoryId")||t("factory"),t("sublocationId")||t("sublocation"))}
                    </select>
                </div>
                <div class="form-group"></div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.email","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"))}</label>
                    <input type="email" id="ia-f-email" class="form-input" value="${t("email")}" placeholder="example@company.com" dir="ltr">
                </div>
                <div class="form-group">
                    <label class="form-label">${s(this.t("module.issuingAuthorities.form.phone","\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641"))}</label>
                    <input type="text" id="ia-f-phone" class="form-input" value="${t("phone")}" placeholder="${s(this.t("module.issuingAuthorities.form.phonePh","01xxxxxxxxx"))}" dir="ltr">
                </div>
                </div>
            </section>

            <section class="ia-form-section">
                <h4 class="ia-form-section-title">
                    ${s(this.t("module.issuingAuthorities.form.section.permits","\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D"))}
                    <span class="ia-form-section-subtitle">${s(this.t("module.issuingAuthorities.form.section.permitsSub","\u0627\u062E\u062A\u0631 G \u0623\u0648 Y \u0623\u0648 X \u0644\u0643\u0644 \u0646\u0648\u0639 \u062A\u0635\u0631\u064A\u062D"))}</span>
                </h4>
                <div class="ia-legend-inline">
                    <span class="ia-badge-g">G</span><span>${s(this.t("module.issuingAuthorities.form.legendInline.g","\u062A\u0648\u0642\u064A\u0639 \u0645\u0628\u0627\u0634\u0631 \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"))}</span>
                    <span class="ia-badge-y">Y</span><span>${s(this.t("module.issuingAuthorities.form.legendInline.y","\u062A\u0648\u0642\u064A\u0639 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0645\u0639 HSE"))}</span>
                    <span class="ia-badge-x">X</span><span>${s(this.t("module.issuingAuthorities.form.legendInline.x","\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639"))}</span>
                </div>
                <div class="ia-permits-card">
                    ${m}
                </div>
            </section>

            <section class="ia-form-section">
                <h4 class="ia-form-section-title">${s(this.t("module.issuingAuthorities.form.section.settings","\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0633\u062C\u0644"))}</h4>
                <div class="ia-form-two-cols ia-settings-row">
                    <div class="form-group">
                        <label class="form-label">${s(this.t("module.issuingAuthorities.form.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"))}</label>
                        <input type="text" id="ia-f-notes" class="form-input" value="${t("notes")}" placeholder="${s(this.t("module.issuingAuthorities.form.notesPh","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629"))}">
                    </div>
                    <div class="form-group ia-active-group">
                        <input type="checkbox" id="ia-f-active" ${!e||e.isActive!==!1?"checked":""} style="width:16px;height:16px;cursor:pointer;">
                        <label for="ia-f-active">${s(this.t("module.issuingAuthorities.form.activeLabel","\u0646\u0634\u0637 (\u0645\u0641\u0639\u0651\u0644 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0634\u062D\u064A\u0646)"))}</label>
                    </div>
                </div>
            </section>
        </div>
        `},async _fetchData(e={}){const t=!!e.preserveExistingOnFailure,i=t&&Array.isArray(this._data)?this._data.map(o=>Object.assign({},o)):[];this._loading=!0;try{const o=this._activeCategory==="contractors"?"contractors":"employees",a=this._activeCategory==="contractors"?"getAllContractorIssuingAuthorities":"getAllIssuingAuthorities";let s=!1;if(s=await this._fetchViaReadFromSheet(),!s&&!this._unsupportedActions[o])try{const n=await this._withTimeout(GoogleIntegration.sendRequest({action:a,data:{}}),4500);if(n&&n.success){const r=Array.isArray(n.data)?n.data:[];this._data=r.map(l=>this._normalizeRow(l)).filter(l=>l.id||l.name||l.contractorCompanyName),s=!0}}catch(n){const r=String(n&&n.message||"");this._isActionUnknownMessage(r)?this._unsupportedActions[o]=!0:typeof Utils<"u"&&Utils.safeWarn(`\u062A\u0639\u0630\u0631 \u062A\u0646\u0641\u064A\u0630 ${a} \u0648\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0625\u0644\u0649 fallback`,r)}s||(t&&i.length>0?(this._data=i,typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(this.t("module.issuingAuthorities.warn.refreshFailedKeptGrid","\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0639\u064F\u0631\u0636\u062A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u0648 \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0625\u0646 \u0644\u0632\u0645."))):this._data=[],typeof Utils<"u"&&Utils.safeWarn&&!(t&&i.length>0)&&Utils.safeWarn(this.t("module.issuingAuthorities.warn.loadFailed","\u062A\u062D\u0630\u064A\u0631: \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A Issuing Authorities")))}catch(o){t&&i.length>0?(this._data=i,typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(this.t("module.issuingAuthorities.warn.refreshFailedKeptGrid","\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0639\u064F\u0631\u0636\u062A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u0648 \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0625\u0646 \u0644\u0632\u0645."))):this._data=[],this._reportModuleError("IssuingAuthorities._fetchData",o)}this._loading=!1},_renderTable(){const e=document.getElementById("ia-table-wrapper");if(!e)return;try{this.updateIaAdminStatsCards(this._data||[])}catch{}const t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:c=>String(c??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");if(this._loading){e.innerHTML=`<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:#2563eb;"></i><div style="margin-top:8px;color:#64748b;font-size:0.88rem;">${t(this.t("module.common.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..."))}</div></div>`;return}const i=this.hasIssuingAuthoritiesModuleAccess(),o=this.isStrictSystemAdmin(),a=this._getBaseRecordsForView().length,s=this._getFilteredRecords(),n=document.getElementById("ia-filter-count");if(n){const c=!!(this._listFilters.search||this._listFilters.factory||this._listFilters.department||this._listFilters.status);this._data.length&&c?(n.style.display="block",n.textContent=this._tReplace("module.issuingAuthorities.filterCount","\u0639\u0631\u0636 {{shown}} \u0645\u0646 \u0623\u0635\u0644 {{total}} \u0633\u062C\u0644\u064B\u0627 (\u0628\u0639\u062F \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u062A\u0631).",{shown:s.length,total:a})):n.style.display="none"}if(s.length===0){const c=this._getBaseRecordsForView().length>0,h=c?this.t("module.issuingAuthorities.empty.noFilterResults","\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u062A\u0631"):this.t("module.issuingAuthorities.empty.noRecords","\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0628\u0639\u062F"),f=c?this.t("module.issuingAuthorities.empty.hintFiltered","\u062C\u0631\u0651\u0628 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0628\u062D\u062B \u0623\u0648 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0623\u0639\u0644\u0627\u0647."):i?this._tReplace("module.issuingAuthorities.empty.hintAdmin",'\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 "{{add}}" \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0644 \u0633\u062C\u0644 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 {{cat}}.',{add:this.t("module.issuingAuthorities.btn.addPerson","\u0625\u0636\u0627\u0641\u0629 \u0634\u062E\u0635"),cat:this._categoryTitle()}):this._tReplace("module.issuingAuthorities.empty.hintViewer","\u0644\u0645 \u062A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644\u0627\u062A {{cat}} \u0628\u0639\u062F.",{cat:this._categoryTitle()});e.innerHTML=`
                <div class="empty-state" style="padding:48px 24px;">
                    <i class="fas fa-user-check" style="font-size:2.5rem;color:#cbd5e1;margin-bottom:12px;"></i>
                    <h3 style="color:#64748b;margin-bottom:6px;">${t(h)}</h3>
                    <p style="color:#94a3b8;font-size:0.88rem;">
                        ${t(f)}
                    </p>
                </div>`,this._syncFilterDropdowns();return}const r=this.PERMIT_TYPES.map(c=>{const{primary:h,secondary:f}=this._permitBilingualHeader(c);return`
            <th style="text-align:center;white-space:nowrap;padding:8px 6px;font-size:0.8rem;">
                <div style="font-weight:700;color:#1e40af;">${t(h)}</div>
                <div style="font-weight:400;color:#64748b;font-size:0.72rem;">${t(f)}</div>
            </th>`}).join(""),l=this._activeCategory==="contractors",d=l?`<th style="text-align:right;padding:8px 10px;color:#1e40af;min-width:140px;">${t(this.t("module.issuingAuthorities.col.contractorSupplier","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F"))}</th>
                    <th style="text-align:right;padding:8px 10px;color:#1e40af;min-width:120px;">${t(this.t("module.issuingAuthorities.col.responsibleName","\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644"))}</th>`:`<th style="text-align:right;padding:8px 12px;color:#1e40af;min-width:160px;">${t(this.t("module.issuingAuthorities.col.approverName","\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647"))}</th>`,m=s.map((c,h)=>{const f=this.PERMIT_TYPES.map(C=>{const $=String(c[C.key]||"X").toUpperCase().trim(),E=this._badgeMeta($);return`<td style="text-align:center;"><span class="${E.class}" title="${t(E.title)}">${$}</span></td>`}).join(""),g=t(this.t("module.issuingAuthorities.inactiveTag","(\u063A\u064A\u0631 \u0646\u0634\u0637)")),y=c.isActive===!1?`<span style="color:#ef4444;font-size:0.75rem;">${g}</span>`:"",b=l?`${this._displayContractorCompany(c)} \u2014 ${this._displayResponsibleName(c)}`:c.name||"",v=t(this.t("module.common.view","\u0639\u0631\u0636")),_=t(this.t("module.common.edit","\u062A\u0639\u062F\u064A\u0644")),S=t(this.t("module.issuingAuthorities.delete.btn","\u062D\u0630\u0641")),u=`
                <span style="display:inline-flex;align-items:center;gap:6px;justify-content:center;">
                <button type="button" class="ia-btn-view" data-id="${t(c.id)}" title="${v}" style="padding:4px 8px;border:none;background:none;cursor:pointer;color:#0d9488;">
                    <i class="fas fa-eye"></i>
                </button>
                ${o?`
                <button type="button" class="ia-btn-edit" data-id="${t(c.id)}" title="${_}" style="padding:4px 8px;border:none;background:none;cursor:pointer;color:#2563eb;">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="ia-btn-delete" data-id="${t(c.id)}" data-name="${t(b)}" title="${S}" style="padding:4px 8px;border:none;background:none;cursor:pointer;color:#dc2626;">
                    <i class="fas fa-trash"></i>
                </button>`:""}
                </span>`,x=`${t(c.departmentName||"")} ${y}`,A=t([this._approvalRoleLabel(c.approvalRole),c.jobTitle,c.factory,c.location,c.sublocation].filter(Boolean).join(" - ")),w=l?`<td style="padding:8px 10px;">
                    <div style="font-weight:600;color:#1e293b;">${t(this._displayContractorCompany(c))}</div>
                    <div style="font-size:0.75rem;color:#94a3b8;">${A}</div>
                </td>
                <td style="padding:8px 10px;">
                    <div style="font-weight:600;color:#1e293b;">${t(this._displayResponsibleName(c))}</div>
                    <div style="font-size:0.78rem;color:#64748b;">${x}</div>
                </td>`:`<td style="padding:8px 10px;">
                    <div style="font-weight:600;color:#1e293b;">${t(c.name||"")}</div>
                    <div style="font-size:0.78rem;color:#64748b;">${x}</div>
                    <div style="font-size:0.75rem;color:#94a3b8;">${A}</div>
                </td>`;return`
            <tr style="border-bottom:1px solid #f1f5f9;${c.isActive===!1?"opacity:0.55;":""}">
                <td style="text-align:center;color:#64748b;font-size:0.85rem;padding:8px 6px;">${h+1}</td>
                ${w}
                ${f}
                <td style="text-align:center;white-space:nowrap;">${u}</td>
            </tr>`}).join(""),p=`<th style="text-align:center;padding:8px 6px;">${t(this.t("module.issuingAuthorities.col.actions","\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))}</th>`;e.innerHTML=`
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
                <tr style="background:#eff6ff;border-bottom:2px solid #bfdbfe;">
                    <th style="text-align:center;padding:8px 6px;color:#1e40af;width:40px;">${t(this.t("module.issuingAuthorities.col.idx","\u0645"))}</th>
                    ${d}
                    ${r}
                    ${p}
                </tr>
            </thead>
            <tbody id="ia-tbody">
                ${m}
            </tbody>
        </table>`,this._syncFilterDropdowns()},_attachEvents(){const e=document.getElementById("ia-module-root");if(!e)return;this._iaRemoveGlobalDelegation(),this._modalUiAbort=new AbortController;const t=document.getElementById("ia-add-btn");t&&t.addEventListener("click",()=>this._openModal());const i=document.getElementById("ia-refresh-btn");i&&i.addEventListener("click",async()=>{this._readFiltersFromDom(),this._bustIssuingAuthoritiesSheetCache(),await this._fetchData(),this._renderTable()}),e.querySelectorAll(".ia-tab-btn").forEach(s=>{s.addEventListener("click",async()=>{const n=s.getAttribute("data-category")||"employees";if(n===this._activeCategory)return;this._activeCategory=n,this._listFilters={search:"",factory:"",department:"",status:""};const r=document.getElementById("issuing-authorities-section");r&&(r.innerHTML=this._renderShell(),this._injectStyles(),await this._fetchData(),this._renderTable(),this._attachEvents(),typeof UI<"u"&&typeof UI.addNavigationIconsAfterRender=="function"&&UI.addNavigationIconsAfterRender("issuing-authorities"))})}),this._iaDocClickHandler=s=>{const n=document.getElementById("issuing-authorities-section");if(!n||!n.contains(s.target))return;const r=s.target.closest(".ia-btn-view");if(r){const m=r.getAttribute("data-id"),p=this._data.find(c=>c.id===m);p&&this._openModal(p,{readOnly:!0});return}const l=s.target.closest(".ia-btn-edit");if(l){const m=l.getAttribute("data-id"),p=this._data.find(c=>c.id===m);p&&this._openModal(p);return}const d=s.target.closest(".ia-btn-delete");if(d){const m=d.getAttribute("data-id"),p=d.getAttribute("data-name");this._confirmDelete(m,p)}},document.addEventListener("click",this._iaDocClickHandler,!0);const o=this._modalUiAbort.signal,a=document.getElementById("ia-modal-overlay");document.getElementById("ia-modal-close")?.addEventListener("click",()=>this._closeModal(),{signal:o}),document.getElementById("ia-modal-cancel")?.addEventListener("click",()=>this._closeModal(),{signal:o}),document.getElementById("ia-modal-save")?.addEventListener("click",()=>this._saveModal(),{signal:o}),a&&a.addEventListener("click",s=>{s.target===a&&this._closeModal()},{signal:o}),this._iaDocChangeHandler=s=>{const n=document.getElementById("issuing-authorities-section");!n||!n.contains(s.target)||(s.target.type==="radio"&&s.target.name&&s.target.name.startsWith("permit_")&&document.querySelectorAll(`input[name="${s.target.name}"]`).forEach(l=>{const d=l.closest("label.ia-radio-label");d&&d.classList.toggle("is-selected",!!l.checked)}),s.target.id==="ia-f-person-type"&&this._togglePersonTypeInputs())},document.addEventListener("change",this._iaDocChangeHandler,!0),document.getElementById("ia-delete-cancel")?.addEventListener("click",()=>{const s=document.getElementById("ia-delete-modal");s&&(s.style.display="none")},{signal:o}),this._bindModalFieldEvents(),this._bindListFilterEvents()},_togglePersonTypeInputs(){const e=(document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase(),t=document.getElementById("ia-employee-code-wrap"),i=document.getElementById("ia-contractor-wrap");t&&(t.style.display=e==="employee"?"":"none"),i&&(i.style.display=e==="contractor"?"":"none");const o=document.getElementById("ia-person-mode-hint");o&&(o.textContent=e==="employee"?this.t("module.issuingAuthorities.toggle.hint.employee",'\u0648\u0636\u0639 \u0627\u0644\u0645\u0648\u0638\u0641: \u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u062B\u0645 \u0627\u0636\u063A\u0637 "\u0628\u062D\u062B" \u0644\u0645\u0644\u0621 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.'):this.t("module.issuingAuthorities.toggle.hint.contractor","\u0648\u0636\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u0623\u062F\u062E\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u062F\u0648\u064A\u064B\u0627.")),["ia-f-name","ia-f-dept","ia-f-job-title","ia-f-branch"].forEach(s=>{const n=document.getElementById(s);n&&n.removeAttribute("readonly")}),e==="contractor"&&this._onContractorChanged(),e==="employee"&&this._installEmployeeCodeLookupLikeClinic()},_onContractorChanged(){},async _lookupEmployeeByCode(e){try{if((document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase()!=="employee")return;const i=String(e||"").trim()||(document.getElementById("ia-f-employee-code")?.value||"").trim();if(!i)return;await this._ensureEmployeesLoaded();const o=this._findEmployeeLocal(i);if(o){this._fillEmployeeFields({employeeCode:String(o.employeeNumber||o.employeeCode||o.sapId||o.id||"").trim(),name:String(o.name||"").trim(),departmentName:String(o.department||o.unit||o.section||"").trim(),jobTitle:String(o.position||o.job||o.jobTitle||"").trim(),branch:String(o.branch||"").trim(),factory:String(o.factoryId||o.factory||o.factoryName||"").trim(),location:String(o.location||o.locationName||o.employeeLocation||"").trim(),sublocation:String(o.sublocation||o.subLocation||o.subLocationName||"").trim()}),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(this.t("module.issuingAuthorities.notify.empLoaded","\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),"success");return}let a=null;try{a=await this._withTimeout(GoogleIntegration.sendRequest({action:"getEmployeeByCode",data:{employeeCode:i}}),4500)}catch{}if(!a||!a.success||!a.data){const n=await this._withTimeout(GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Employees"}}),7e3);if(n&&n.success&&Array.isArray(n.data)){const r=m=>String(m||"").trim().toLowerCase(),l=r(i),d=n.data.find(m=>r(m.employeeNumber)===l||r(m.sapId)===l||r(m.id)===l||r(m.employeeCode)===l||r(m.name)===l||r(m.name).includes(l));d&&(a={success:!0,data:{employeeCode:String(d.employeeNumber||d.sapId||d.id||"").trim(),name:String(d.name||"").trim(),departmentName:String(d.department||"").trim(),jobTitle:String(d.job||d.position||"").trim(),branch:String(d.branch||"").trim(),factory:String(d.factoryId||d.factory||"").trim(),location:String(d.location||"").trim(),sublocation:String(d.sublocation||d.subLocation||d.subLocationName||d.locationName||"").trim()}})}}if(!a||!a.success||!a.data){typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(a&&a.message||this.t("module.issuingAuthorities.notify.empNotFound","\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641"),"warning");return}const s=a.data;this._fillEmployeeFields({employeeCode:s.employeeCode||i,name:s.name||"",departmentName:s.departmentName||"",jobTitle:s.jobTitle||"",branch:s.branch||"",factory:s.factory||"",location:s.location||"",sublocation:s.sublocation||""}),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(this.t("module.issuingAuthorities.notify.empLoaded","\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),"success")}catch(t){this._reportModuleError("IssuingAuthorities._lookupEmployeeByCode",t)}},_currentEditId:null,_modalReadOnly:!1,_applyModalReadOnly(e){const t=document.getElementById("ia-modal-save");t&&(t.style.display=e?"none":"");const i=document.getElementById("ia-modal-body");i&&i.querySelectorAll("input, select, textarea, button").forEach(o=>{e?o.setAttribute("disabled","disabled"):o.removeAttribute("disabled")})},async _openModal(e,t){let i=!!(t&&t.readOnly);e&&!i&&!this.isStrictSystemAdmin()&&(i=!0);const o=document.getElementById("ia-modal-overlay"),a=document.getElementById("ia-modal-title"),s=document.getElementById("ia-modal-body");if(!o||!a||!s)return;this._modalReadOnly=i,this._currentEditId=i?null:e?e.id:null,i&&e?a.textContent=this.t("module.issuingAuthorities.modal.viewTitle","\u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647"):a.textContent=e?this.t("module.issuingAuthorities.modal.editTitle","\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647"):this.t("module.issuingAuthorities.modal.addTitle","\u0625\u0636\u0627\u0641\u0629 \u0634\u062E\u0635 \u0645\u0635\u0631\u062D \u0644\u0647");const n=document.getElementById("ia-modal-cancel");if(n&&(n.textContent=i?this.t("module.common.close","\u0625\u063A\u0644\u0627\u0642"):this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621")),await this._ensureFormSettingsReady(),await this._fetchContractorOptions(),i&&e?s.innerHTML=this._renderViewDetails(e):(s.innerHTML=this._renderForm(e),this._togglePersonTypeInputs(),this._bindModalFieldEvents(),this._syncFactoryControls(e),s.querySelectorAll('input[type="radio"]').forEach(r=>{const l=r.closest("label.ia-radio-label");l&&l.classList.toggle("is-selected",!!r.checked)})),o.style.display="flex",this._applyModalReadOnly(i),i&&e&&typeof EmailDispatch<"u"){const r=document.querySelector(".ia-modal-footer");r&&!r.querySelector('.email-dispatch-send-btn[data-email-module="issuing-authorities"]')&&r.insertAdjacentHTML("beforeend",EmailDispatch.renderFooterButtonHtml("issuing-authorities")),EmailDispatch.bindFooterButtons(o,{moduleKey:"issuing-authorities",record:e,recordId:e.id||""})}else document.querySelector('.ia-modal-footer .email-dispatch-send-btn[data-email-module="issuing-authorities"]')?.remove()},_closeModal(){const e=document.getElementById("ia-modal-overlay");e&&(e.style.display="none"),this._currentEditId=null,this._modalReadOnly=!1;const t=document.getElementById("ia-modal-save");t&&(t.style.display="");const i=document.getElementById("ia-modal-cancel");i&&(i.textContent=this.t("module.common.cancel","\u0625\u0644\u063A\u0627\u0621"))},async _saveModal(){if(this._modalReadOnly)return;if(this._currentEditId&&!this.isStrictSystemAdmin()){this._iaNotify(this.t("module.issuingAuthorities.notify.saveEditRequiresSystemAdmin","\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0627 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),"error");return}if(!this.hasIssuingAuthoritiesModuleAccess()){this._iaNotify(this.t("module.issuingAuthorities.notify.saveFail","\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"),"error");return}const e=(document.getElementById("ia-f-person-type")?.value||"employee").toLowerCase()==="contractor"?"contractor":"employee",t=(document.getElementById("ia-f-employee-code")?.value||"").trim(),i=(document.getElementById("ia-f-contractor-name")?.value||"").trim(),o=(document.getElementById("ia-f-name")?.value||"").trim();if(!o){const u=e==="contractor"?this.t("module.issuingAuthorities.notify.nameRequired.contractor","\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0637\u0644\u0648\u0628"):this.t("module.issuingAuthorities.notify.nameRequired.employee","\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0645\u0637\u0644\u0648\u0628");typeof Utils<"u"&&Utils.showNotification?Utils.showNotification(u,"error"):alert(u);return}if(e==="employee"&&!t){const u=this.t("module.issuingAuthorities.notify.codeRequired","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0648\u0638\u0641");typeof Utils<"u"&&Utils.showNotification?Utils.showNotification(u,"error"):alert(u);return}if(e==="contractor"&&!i){const u=this.t("module.issuingAuthorities.notify.contractorRequired","\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0645\u0648\u0631\u062F \u0645\u0637\u0644\u0648\u0628");typeof Utils<"u"&&Utils.showNotification?Utils.showNotification(u,"error"):alert(u);return}const a=AppState&&AppState.currentUser?AppState.currentUser:{},s=document.getElementById("ia-f-factory"),n=document.getElementById("ia-f-sublocation"),r=s?.options?.[s.selectedIndex]?.text||"",l=n?.options?.[n.selectedIndex]?.text||"",d=this.t("module.issuingAuthorities.select.factory","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --").trim(),m=this.t("module.issuingAuthorities.select.sublocation","-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A --").trim(),p=String(r||"").trim(),c=String(l||"").trim(),h=!p||p===d||/^(--|—)/.test(p),f=!c||c===m||/^(--|—)/.test(c),g={personType:e,employeeCode:e==="contractor"?"":t,contractorCompanyName:e==="contractor"?i:"",name:o,departmentName:document.getElementById("ia-f-dept")?.value?.trim()||"",jobTitle:document.getElementById("ia-f-job-title")?.value?.trim()||"",approvalRole:this._normalizeApprovalRole(document.getElementById("ia-f-approval-role")?.value),branch:document.getElementById("ia-f-branch")?.value?.trim()||"",factory:h?document.getElementById("ia-f-factory")?.value?.trim()||"":p,factoryId:document.getElementById("ia-f-factory")?.value?.trim()||"",location:document.getElementById("ia-f-location")?.value?.trim()||"",sublocation:f?document.getElementById("ia-f-sublocation")?.value?.trim()||"":c,sublocationId:document.getElementById("ia-f-sublocation")?.value?.trim()||"",email:document.getElementById("ia-f-email")?.value?.trim()||"",phone:document.getElementById("ia-f-phone")?.value?.trim()||"",isActive:document.getElementById("ia-f-active")?.checked!==!1,notes:document.getElementById("ia-f-notes")?.value?.trim()||"",userData:a};if(this.PERMIT_TYPES.forEach(u=>{const x=document.querySelector(`input[name="permit_${u.key}"]:checked`);g[u.key]=x?x.value:"X"}),await this._validateDuplicateBeforeSave(g,this._currentEditId,{silent:!1})||this._iaSaveModalBusy)return;this._iaSaveModalBusy=!0;const b=document.getElementById("ia-modal-save"),v=`<i class="fas fa-spinner fa-spin"></i> ${this.t("module.issuingAuthorities.modal.saving","\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...")}`;b&&(b.disabled=!0,b.innerHTML=v);const _=!!this._currentEditId,S=28e3;try{let u;const x=this._categoryForWrite(e,this._currentEditId),A=this._actionsForCategory(x);if(this._currentEditId?(g.id=this._currentEditId,u=await this._withTimeout(GoogleIntegration.sendRequest({action:A.update,data:g}),S)):u=await this._withTimeout(GoogleIntegration.sendRequest({action:A.add,data:g}),S),u&&u.success){this._activeCategory=x,this._syncIssuingAuthoritiesCategoryUi(),this._closeModal(),this._bustIssuingAuthoritiesSheetCache();try{await this._fetchData({preserveExistingOnFailure:!0})}catch(w){this._reportModuleError("IssuingAuthorities._saveModal.fetchAfterSave",w)}this._renderTable(),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(_?this.t("module.issuingAuthorities.notify.updated","\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u0646\u062C\u0627\u062D"):this.t("module.issuingAuthorities.notify.added","\u062A\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),"success"),document.dispatchEvent(new CustomEvent("issuingAuthoritiesUpdated",{detail:{data:this._data}}))}else{const w=u&&u.message||this.t("module.issuingAuthorities.notify.saveFail","\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638");typeof Utils<"u"&&Utils.showNotification?Utils.showNotification(w,"error"):alert(w)}}catch(u){const x=String(u&&u.message||"").toLowerCase();u&&(u.message==="timeout"||x.includes("timeout"))?this._iaNotify(this._getFriendlyErrorMessage("timeout"),"error"):(this._iaNotify(this._userVisibleMutationErrorMessage(u),"error"),typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities._saveModal",u&&u.message||u))}finally{this._iaSaveModalBusy=!1,b&&(b.disabled=!1,b.innerHTML=`<i class="fas fa-save" style="margin-left:6px;"></i>${this.t("module.issuingAuthorities.modal.save","\u062D\u0641\u0638")}`)}},_confirmDelete(e,t){if(!this.isStrictSystemAdmin()){this._iaNotify(this.t("module.issuingAuthorities.notify.deleteRequiresSystemAdmin","\u0627\u0644\u062D\u0630\u0641 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637."),"error");return}const i=document.getElementById("ia-delete-modal"),o=document.getElementById("ia-delete-msg");if(!i||!o)return;o.textContent=this._tReplace("module.issuingAuthorities.delete.message",'\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062E\u0627\u0635 \u0628\u0640 "{{name}}"\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.',{name:String(t||"")}),i.style.display="flex";const a=document.getElementById("ia-delete-confirm");if(a){const s=a.cloneNode(!0);a.parentNode.replaceChild(s,a),s.addEventListener("click",async()=>{i.style.display="none",await this._deleteRecord(e)})}},async _deleteRecord(e){if(!this.isStrictSystemAdmin()){this._iaNotify(this.t("module.issuingAuthorities.notify.deleteRequiresSystemAdmin","\u0627\u0644\u062D\u0630\u0641 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637."),"error");return}try{const t=AppState&&AppState.currentUser?AppState.currentUser:{},i=this._categoryForWrite(null,e),o=this._actionsForCategory(i),a=await GoogleIntegration.sendRequest({action:o.remove,data:{id:e,userData:t}});if(a&&a.success)this._activeCategory=i,this._syncIssuingAuthoritiesCategoryUi(),this._bustIssuingAuthoritiesSheetCache(),await this._fetchData({preserveExistingOnFailure:!0}),this._renderTable(),typeof Utils<"u"&&Utils.showNotification&&Utils.showNotification(this.t("module.issuingAuthorities.notify.deleted","\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),"success"),document.dispatchEvent(new CustomEvent("issuingAuthoritiesUpdated",{detail:{data:this._data}}));else{const s=a&&a.message||this.t("module.issuingAuthorities.notify.deleteFail","\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641");typeof Utils<"u"&&Utils.showNotification?Utils.showNotification(s,"error"):alert(s)}}catch(t){this._iaNotify(this._userVisibleMutationErrorMessage(t),"error"),typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities._deleteRecord",t&&t.message||t)}},async getAuthoritiesForApprovalRole(e,t){try{const i=this._normalizeApprovalRole(t);if(i==="general")return[];const o=Array.isArray(e)?[...new Set(e.filter(Boolean))]:e?[String(e).trim()]:[],a=await this._getMergedActiveRows();return this._filterAuthorityCandidates(a,o,i)}catch(i){return typeof Utils<"u"&&Utils.safeError("IssuingAuthorities.getAuthoritiesForApprovalRole error:",i),[]}},async getGeneralAuthoritiesForPermitTypes(e){try{const t=Array.isArray(e)?[...new Set(e.filter(Boolean))]:[];if(!t.length)return[];const i=await this._getMergedActiveRows();return this._filterAuthorityCandidates(i,t,"general")}catch(t){return typeof Utils<"u"&&Utils.safeWarn("IssuingAuthorities.getGeneralAuthoritiesForPermitTypes error:",t),[]}},async getAuthoritiesForPermitType(e){try{const t=String(e||"").trim();if(!t)return[];const i=await this._getMergedActiveRows(),o={};return i.forEach(a=>{const s=String(a[t]||"X").toUpperCase().trim();if(s!=="G"&&s!=="Y")return;const n=a.id||a.email||a.name;if(!n)return;const r=this._mapRowToAuthorityCandidate(a,s);o[n]?r.permitLevel==="G"&&(o[n].permitLevel="G",o[n].requiresHseCoApproval=!1):o[n]=r}),Object.values(o).sort((a,s)=>a.permitLevel==="G"&&s.permitLevel!=="G"?-1:s.permitLevel==="G"&&a.permitLevel!=="G"?1:0)}catch(t){return typeof Utils<"u"&&Utils.safeError("IssuingAuthorities.getAuthoritiesForPermitType error:",t),[]}},mapPermitTypeToField(e){const t={"\u0623\u0639\u0645\u0627\u0644 \u0628\u0627\u0631\u062F\u0629":"coldWork","cold work":"coldWork","\u0639\u0632\u0644 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629":"loto",loto:"loto","\u0623\u0639\u0645\u0627\u0644 \u0633\u0627\u062E\u0646\u0629":"hotWork","hot work":"hotWork","\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A":"workAtHeight","work at height":"workAtHeight","w@h":"workAtHeight","\u062F\u062E\u0648\u0644 \u0623\u0645\u0627\u0643\u0646 \u0645\u063A\u0644\u0642\u0629":"confinedSpace","confined space":"confinedSpace",\u062D\u0641\u0631:"excavation",excavation:"excavation","\u062F\u062E\u0648\u0644 \u0645\u0642\u0627\u0648\u0644":"contractorPTW","contractor ptw":"contractorPTW","\u062E\u0637\u0629 \u0627\u0644\u0631\u0641\u0639":"liftingPlan","lifting plan":"liftingPlan"},i=String(e||"").toLowerCase().trim();return t[i]||null},_injectStyles(){let e=document.getElementById("ia-styles");e||(e=document.createElement("style"),e.id="ia-styles",document.head.appendChild(e)),e.textContent=`
            .ia-badge-g {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#dcfce7;color:#166534;border:1px solid #86efac;
            }
            .ia-badge-y {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#fef9c3;color:#854d0e;border:1px solid #fde047;
            }
            .ia-badge-x {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;
            }
            /* \u0623\u0632\u0631\u0627\u0631 G / Y / X: \u063A\u064A\u0631 \u0627\u0644\u0645\u062D\u062F\u062F = \u0625\u0637\u0627\u0631 \u0645\u0644\u0648\u0646 \u0648\u0627\u0636\u062D\u061B \u0627\u0644\u0645\u062D\u062F\u062F = \u062A\u0639\u0628\u0626\u0629 \u0642\u0648\u064A\u0629 + \u0647\u0627\u0644\u0629 */
            .ia-radio-label {
                border-radius:8px;
                cursor:pointer;
                padding:8px 14px;
                font-weight:800;
                font-size:0.88rem;
                min-width:42px;
                text-align:center;
                user-select:none;
                -webkit-tap-highlight-color:transparent;
                border:2px solid transparent;
                transition:transform .12s ease, box-shadow .15s ease, background .15s ease, color .15s ease, border-color .15s ease;
            }
            .ia-radio-label.ia-radio-g {
                background:#ffffff;
                color:#047857;
                border-color:#6ee7b7;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-g.is-selected {
                background:linear-gradient(180deg,#34d399 0%,#10b981 100%);
                color:#ffffff;
                border-color:#047857;
                box-shadow:0 0 0 3px rgba(16,185,129,0.45), 0 4px 14px rgba(5,150,105,0.28);
                transform:scale(1.06);
            }
            .ia-radio-label.ia-radio-y {
                background:#ffffff;
                color:#b45309;
                border-color:#fcd34d;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-y.is-selected {
                background:linear-gradient(180deg,#fbbf24 0%,#f59e0b 100%);
                color:#422006;
                border-color:#b45309;
                box-shadow:0 0 0 3px rgba(245,158,11,0.5), 0 4px 14px rgba(180,83,9,0.22);
                transform:scale(1.06);
            }
            .ia-radio-label.ia-radio-x {
                background:#ffffff;
                color:#b91c1c;
                border-color:#fca5a5;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-x.is-selected {
                background:linear-gradient(180deg,#f87171 0%,#ef4444 100%);
                color:#ffffff;
                border-color:#991b1b;
                box-shadow:0 0 0 3px rgba(239,68,68,0.45), 0 4px 14px rgba(185,28,28,0.25);
                transform:scale(1.06);
            }
            .ia-radio-label:hover:not(.is-selected) {
                transform:translateY(-1px);
                filter:brightness(0.98);
            }
            .ia-radio-label.is-selected:hover {
                transform:scale(1.07);
            }
            .ia-module table th, .ia-module table td {
                border-bottom:1px solid #f1f5f9;
            }
            .ia-category-tabs { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
            .ia-tab-btn {
                border:2px solid #cbd5e1;
                background:#fff;
                color:#334155;
                border-radius:12px;
                padding:12px 22px;
                min-height:48px;
                cursor:pointer;
                font-weight:800;
                font-size:1rem;
                letter-spacing:0.01em;
                transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease,box-shadow 0.15s ease;
            }
            .ia-tab-btn:hover:not(.active) {
                border-color:#94a3b8;
                background:#f8fafc;
            }
            .ia-tab-btn.active {
                border-color:#2563eb;
                color:#1d4ed8;
                background:#eff6ff;
                box-shadow:0 2px 8px rgba(37,99,235,0.12);
            }
            .ia-module table tbody tr:hover { background:#f8fafc; }
            .ia-modal-container { border-radius:12px; overflow:hidden; }
            .ia-modal-container .modal-header {
                position:sticky; top:0; z-index:3; background:#ffffff;
                border-bottom:1px solid #e2e8f0;
            }
            .ia-modal-body {
                max-height:68vh; overflow:auto; padding:14px;
                background:#f1f5f9;
            }
            .ia-modal-footer.ia-modal-footer {
                position:sticky; bottom:0; z-index:3;
                background:#ffffff; border-top:1px solid #e2e8f0;
            }
            .ia-form-grid { display:grid; gap:14px; }
            .ia-form-section { border:1px solid #dbeafe; border-radius:10px; padding:14px; background:#ffffff; box-shadow:0 1px 2px rgba(15,23,42,0.03); }
            .ia-form-section-title { margin:0 0 10px; color:#1e3a8a; font-size:0.95rem; font-weight:700; }
            .ia-form-section-subtitle { display:block; margin-top:4px; color:#475569; font-size:0.78rem; font-weight:500; }
            .ia-form-two-cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
            .ia-form-select,
            .ia-form .form-input,
            .ia-form .form-select {
                width:100%;
                border:1px solid #cbd5e1;
                border-radius:8px;
                padding:10px 12px;
                font-size:0.9rem;
                background:#fff;
            }
            .ia-form .form-input:focus,
            .ia-form .form-select:focus {
                outline:none;
                border-color:#3b82f6;
                box-shadow:0 0 0 3px rgba(59,130,246,0.15);
            }
            .ia-form .form-input[readonly] {
                background:#f8fafc;
                color:#475569;
            }
            .ia-employee-lookup-row { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; }
            .ia-lookup-btn { min-width:72px; height:42px; white-space:nowrap; border-radius:8px; }
            .ia-person-mode-hint {
                margin-bottom:10px;
                padding:8px 10px;
                border-radius:8px;
                background:#f1f5f9;
                border:1px dashed #cbd5e1;
                color:#334155;
                font-size:0.82rem;
                font-weight:600;
            }
            .ia-legend-inline {
                display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;
                color:#334155; font-size:0.8rem;
            }
            .ia-permits-card { background:#f1f5f9; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.7); }
            .ia-permit-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid #e5e7eb; gap:10px; }
            .ia-permit-row:last-child { border-bottom:none; }
            .ia-permit-label { font-size:0.9rem; color:#1f2937; font-weight:600; display:flex; align-items:center; gap:6px; }
            .ia-permit-label-en { color:#64748b; font-size:0.78rem; font-weight:500; }
            .ia-radio-group { display:flex; gap:8px; }
            .ia-settings-row { align-items:center; }
            .ia-active-group { display:flex; align-items:center; gap:10px; padding-top:24px; }
            .ia-active-group label { cursor:pointer; font-size:0.9rem; color:#334155; font-weight:600; }
            .ia-form .form-label { color:#334155; font-weight:700; }
            .ia-form .form-input::placeholder { color:#94a3b8; }
            @media (max-width: 768px) {
                .ia-form-two-cols { grid-template-columns:1fr; }
                .ia-employee-lookup-row { grid-template-columns:1fr; }
                .ia-lookup-btn { width:100%; }
                .ia-active-group { padding-top:4px; }
                .ia-permit-row { flex-direction:column; align-items:flex-start; }
            }
        `}};typeof window<"u"&&(window.IssuingAuthorities=IssuingAuthorities);
