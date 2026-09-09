const Settings={currentApprovalCircuitOwner:"__default__",async compressLogo(e,t=800,s=800,a=.8){return new Promise((i,o)=>{try{const n=new Image;n.onload=function(){try{let l=n.width,r=n.height;if(l>t||r>s){const v=Math.min(t/l,s/r);l=Math.round(l*v),r=Math.round(r*v)}const d=document.createElement("canvas");d.width=l,d.height=r;const m=d.getContext("2d");m.drawImage(n,0,0,l,r);const p=d.toDataURL("image/jpeg",a);if(p.length>45e3){if(a>.5){const v=d.toDataURL("image/jpeg",.5);if(v.length<=45e3){i(v);return}}if(l>600||r>600){const v=Math.min(600/l,600/r),u=Math.round(l*v),E=Math.round(r*v);d.width=u,d.height=E,m.clearRect(0,0,d.width,d.height),m.drawImage(n,0,0,u,E);const C=d.toDataURL("image/jpeg",.5);i(C);return}}i(p)}catch(l){o(l)}},n.onerror=function(){o(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"))},n.src=e}catch(n){o(n)}})},currentApprovalCircuitId:null,currentApprovalCircuitSteps:[],formSettingsState:null,formSettingsEventsBound:!1,getPostLoginItems(){const e=AppState?.companySettings?.postLoginItems;if(Array.isArray(e))return e.slice();if(typeof e=="string"&&e.trim()!=="")try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}return[]},renderPostLoginItemsList(){const e=document.getElementById("post-login-items-list");if(!e)return;const t=this.getPostLoginItems();if(t.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631\xBB \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.</p>';return}const s=t.slice().sort((a,i)=>(a.order??999)-(i.order??999));e.innerHTML=s.map((a,i)=>{const o=Utils.escapeHTML((a.title||"").slice(0,60))||"(\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646)",n=a.durationSeconds!==void 0?a.durationSeconds:10,l=a.active!==!1,r=a.order??i;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-post-login-index="${i}" data-post-login-order="${r}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${o}</span>
                        <span class="text-xs text-gray-500 mr-2">${n} \u062B</span>
                        ${l?'<span class="text-xs text-green-600">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400">\u0645\u0639\u0637\u0651\u0644</span>'}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="post-login-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${i}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="post-login-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${i}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="post-login-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${i}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="post-login-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${i}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},parseHelpContent(e){const t={version:1,enabled:!1,introText:"",qaItems:[]};if(!e)return t;try{const s=typeof e=="string"?JSON.parse(e):e;return!s||typeof s!="object"?t:{version:1,enabled:s.enabled===!0,introText:String(s.introText||"").trim(),qaItems:Array.isArray(s.qaItems)?s.qaItems:[]}}catch{return t}},getHelpContentConfig(){return this.parseHelpContent(AppState?.companySettings?.helpContent)},getHelpContentQaItems(){return this.getHelpContentConfig().qaItems.slice().sort((e,t)=>(e.order??999)-(t.order??999))},setHelpContentConfig(e){AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.helpContent=JSON.stringify(e||{version:1,enabled:!1,introText:"",qaItems:[]})},renderHelpContentQaList(){const e=document.getElementById("help-content-qa-list");if(!e)return;const t=this.getHelpContentQaItems();if(!t.length){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0626\u0644\u0629 \u0645\u062E\u0635\u0635\u0629. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644\xBB \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0646 \u0627\u0644\u0643\u0648\u062F.</p>';return}e.innerHTML=t.map((s,a)=>{const i=Utils.escapeHTML((s.question||"").slice(0,80))||"(\u0628\u062F\u0648\u0646 \u0633\u0624\u0627\u0644)",o=s.active!==!1;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-help-qa-index="${a}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${i}</span>
                        ${o?'<span class="text-xs text-green-600 mr-2">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400 mr-2">\u0645\u0639\u0637\u0651\u0644</span>'}
                        ${s.moduleId?`<span class="text-xs text-blue-600">\u0645\u0648\u062F\u064A\u0648\u0644: ${Utils.escapeHTML(s.moduleId)}</span>`:""}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="help-qa-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${a}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="help-qa-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${a}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="help-qa-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${a}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="help-qa-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${a}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},async saveHelpContentToBackend(){AppState.companySettings||(AppState.companySettings={});const e=this.getHelpContentConfig();if(this.setHelpContentConfig(e),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),!(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"))return{success:!0};try{const t=AppState.currentUser||{};return await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,profileTeamsUrl:AppState.companySettings.profileTeamsUrl||"",profileWhatsAppUrl:AppState.companySettings.profileWhatsAppUrl||"",address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),helpContent:AppState.companySettings.helpContent||JSON.stringify(e),userData:{email:t.email,name:t.name,role:t.role,permissions:t.permissions}})||{success:!1}}catch(t){return{success:!1,message:t?.message||String(t)}}},initHelpContentTabUI(){const e=this.getHelpContentConfig(),t=document.getElementById("help-content-enabled"),s=document.getElementById("help-content-intro");t&&(t.checked=e.enabled===!0),s&&(s.value=e.introText||""),this.renderHelpContentQaList()},bindHelpContentSettingsEvents(){if(this._helpContentEventsBound){this.initHelpContentTabUI();return}this._helpContentEventsBound=!0;const e=document.getElementById("help-content-qa-form"),t=document.getElementById("help-content-qa-form-title"),s=document.getElementById("help-content-qa-question"),a=document.getElementById("help-content-qa-answer"),i=document.getElementById("help-content-qa-module"),o=document.getElementById("help-content-qa-keywords"),n=document.getElementById("help-content-qa-active"),l=document.getElementById("help-content-qa-list");let r=-1;const d=()=>{e&&e.classList.add("hidden"),r=-1,t&&(t.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),a&&(a.value=""),i&&(i.value=""),o&&(o.value=""),n&&(n.checked=!0)},m=()=>{const p=document.getElementById("help-content-enabled"),v=document.getElementById("help-content-intro"),u=this.getHelpContentConfig();u.enabled=p?p.checked:u.enabled,u.introText=v?v.value.trim():u.introText,this.setHelpContentConfig(u)};this.initHelpContentTabUI(),document.getElementById("help-content-add-qa-btn")?.addEventListener("click",()=>{r=-1,t&&(t.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),a&&(a.value=""),i&&(i.value=""),o&&(o.value=""),n&&(n.checked=!0),e?.classList.remove("hidden")}),document.getElementById("help-content-qa-cancel-btn")?.addEventListener("click",d),document.getElementById("help-content-qa-save-btn")?.addEventListener("click",()=>{const p=s?.value?.trim()||"",v=a?.value?.trim()||"";if(!p||!v){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u0644\u0625\u062C\u0627\u0628\u0629.");return}const u=this.getHelpContentConfig(),E=this.getHelpContentQaItems(),C=E.length?Math.max(...E.map(h=>h.order??0)):0,S={id:r>=0&&E[r]?.id?E[r].id:"qa-"+Date.now(),question:p,answer:v,moduleId:i?.value?.trim()||"",keywords:o?.value?.trim()||"",active:n?n.checked:!0,order:r>=0?E[r].order??r:C+1};r>=0&&r<E.length?E[r]=S:E.push(S),u.qaItems=E,m(),this.setHelpContentConfig(u),this.renderHelpContentQaList(),d(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0624\u0627\u0644 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB \u0644\u0644\u0646\u0634\u0631.")}),l?.addEventListener("click",p=>{const v=p.target.closest(".help-qa-edit-btn"),u=p.target.closest(".help-qa-delete-btn"),E=p.target.closest(".help-qa-up-btn"),C=p.target.closest(".help-qa-down-btn"),S=v?.dataset?.index??u?.dataset?.index??E?.dataset?.index??C?.dataset?.index;if(S===void 0)return;const h=parseInt(S,10),U=this.getHelpContentConfig(),L=this.getHelpContentQaItems(),T=L[h];if(T){if(v){r=h,t&&(t.textContent="\u062A\u0639\u062F\u064A\u0644 \u0633\u0624\u0627\u0644"),s&&(s.value=T.question||""),a&&(a.value=T.answer||""),i&&(i.value=T.moduleId||""),o&&(o.value=T.keywords||""),n&&(n.checked=T.active!==!1),e?.classList.remove("hidden");return}if(u){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u0624\u0627\u0644\u061F"))return;L.splice(h,1),U.qaItems=L,this.setHelpContentConfig(U),this.renderHelpContentQaList();return}if(E&&h>0){const _=L[h].order??h;L[h].order=L[h-1].order??h-1,L[h-1].order=_,U.qaItems=L,this.setHelpContentConfig(U),this.renderHelpContentQaList()}if(C&&h<L.length-1){const _=L[h].order??h;L[h].order=L[h+1].order??h+1,L[h+1].order=_,U.qaItems=L,this.setHelpContentConfig(U),this.renderHelpContentQaList()}}}),document.getElementById("help-content-save-all-btn")?.addEventListener("click",async()=>{m();const p=await this.saveHelpContentToBackend();if(p?.success){if(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D."),typeof DataManager<"u"&&DataManager.loadCompanySettings)try{await DataManager.loadCompanySettings(!0)}catch{}}else Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638: "+(p?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}),document.getElementById("help-content-load-defaults-btn")?.addEventListener("click",()=>{if(!confirm("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u062A\u062D\u0631\u064A\u0631\u061F \u0633\u064A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u0648\u0627\u062C\u0647\u0629 (\u0644\u0645 \u064A\u064F\u062D\u0641\u0638 \u0628\u0639\u062F)."))return;if(typeof Help>"u"||typeof Help.getDefaultQaItems!="function"){Notification.error("\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644.");return}const p=this.getHelpContentConfig();p.enabled=!0,p.qaItems=Help.getDefaultQaItems().map((u,E)=>({id:u.id,question:u.question,answer:u.answer,moduleId:u.moduleId||"",keywords:u.keywords||"",active:!0,order:E+1}));const v=document.getElementById("help-content-enabled");v&&(v.checked=!0),this.setHelpContentConfig(p),this.renderHelpContentQaList(),Notification.info("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u2014 \u0631\u0627\u062C\u0639 \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB.")})},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("settings-section");if(e&&!(typeof Utils>"u")){if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized();const t=this.isCurrentUserAdmin();if(typeof Permissions<"u"&&(Permissions.formSettingsEventsBound=!1,Permissions._formSettingsBindDone=!1),e.innerHTML=`
            <div class="section-header">
                <h1 class="section-title">
                    <i class="fas fa-cog ml-3"></i>
                    ${I18n.t("settings.title")}
                </h1>
                <p class="section-subtitle">${I18n.t("settings.subtitle")}</p>
            </div>

            <!-- Tabs Navigation -->
            <div class="tabs-container mt-6">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="company-data">
                        <i class="fas fa-building ml-2"></i>
                        ${I18n.t("settings.tabs.company")}
                    </button>
                    <button class="tab-btn" data-tab="integration">
                        <i class="fas fa-cloud ml-2"></i>
                        ${I18n.t("settings.tabs.integration")}
                    </button>
                    <button class="tab-btn" data-tab="cloud-storage">
                        <i class="fas fa-cloud-upload-alt ml-2"></i>
                        ${I18n.t("settings.tabs.cloud")}
                    </button>
                    <button class="tab-btn" data-tab="google-drive">
                        <i class="fab fa-google-drive ml-2"></i>
                        ${I18n.t("settings.tabs.drive")}
                    </button>
                    <button class="tab-btn" data-tab="sharepoint">
                        <i class="fab fa-microsoft ml-2"></i>
                        ${I18n.t("settings.tabs.sharepoint")}
                    </button>
                    <button class="tab-btn" data-tab="system-settings">
                        <i class="fas fa-sliders-h ml-2"></i>
                        ${I18n.t("settings.tabs.system")}
                    </button>
                    <button class="tab-btn" data-tab="form-settings">
                        <i class="fas fa-file-alt ml-2"></i>
                        ${I18n.t("settings.tabs.forms")}
                    </button>
                    <button class="tab-btn" data-tab="violation-types">
                        <i class="fas fa-tags ml-2"></i>
                        ${I18n.t("settings.tabs.violations")}
                    </button>
                    <button class="tab-btn" data-tab="reports">
                        <i class="fas fa-file-pdf ml-2"></i>
                        ${I18n.t("settings.tabs.reports")}
                    </button>
                    <button class="tab-btn" data-tab="notifications">
                        <i class="fas fa-envelope ml-2"></i>
                        ${I18n.t("settings.tabs.email")}
                    </button>
                    <button class="tab-btn" data-tab="help-content" ${t?"":'style="display:none;"'}>
                        <i class="fas fa-circle-question ml-2"></i>
                        \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629
                    </button>
                    <button class="tab-btn" data-tab="permissions">
                        <i class="fas fa-shield-alt ml-2"></i>
                        ${I18n.t("settings.tabs.permissions")}
                    </button>
                    <button class="tab-btn" data-tab="approval-circuit">
                        <i class="fas fa-project-diagram ml-2"></i>
                        ${I18n.t("settings.tabs.circuit")}
                    </button>
                    <button class="tab-btn" data-tab="logs" ${t?"":'style="display:none;"'}>
                        <i class="fas fa-history ml-2"></i>
                        ${I18n.t("settings.tabs.logs")}
                    </button>
                </div>
            </div>

            <!-- Tab Content: Company Data -->
            <div class="tab-content active" id="tab-company-data">
                <div class="settings-group mt-6">
                <div class="settings-group-header">
                    <h2 class="settings-group-title">
                        <i class="fas fa-building text-blue-600 ml-2"></i>
                        ${I18n.t("settings.company.title")}
                    </h2>
                    <p class="settings-group-subtitle">${I18n.t("settings.company.subtitle")}</p>
                </div>
                <div class="settings-group-content">
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-building ml-2"></i>${I18n.t("settings.company.title")}</h2>
                        </div>
                        <div class="card-body space-y-4">
                            <div>
                                <label for="company-name-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-pen ml-2"></i>
                                    ${I18n.t("settings.company.name")}
                                </label>
                                <input type="text" id="company-name-input" class="form-input"
                                    placeholder="${I18n.isRTL()?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629":"Enter company name"}" value="${Utils.escapeHTML(AppState.companySettings?.name||"")}">
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    ${I18n.t("settings.company.nameHint")}
                                </p>
                            </div>
                            <div>
                                <label for="company-name-font-size-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-text-height ml-2"></i>
                                    ${I18n.t("settings.company.fontSize")}
                                </label>
                                <div class="flex items-center gap-3">
                                    <input type="number" id="company-name-font-size-input" class="form-input" min="8" max="72" step="1"
                                        placeholder="${I18n.isRTL()?"\u0645\u062B\u0627\u0644: 16":"e.g., 16"}" value="${AppState.companySettings?.nameFontSize||"16"}">
                                    <span class="text-xs text-gray-500">${I18n.isRTL()?"\u0628\u0643\u0633\u0644":"px"}</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    ${I18n.t("settings.company.fontSizeHint")}
                                </p>
                            </div>
                            <div>
                                <label for="company-secondary-name-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-pen-nib ml-2"></i>
                                    ${I18n.t("settings.company.secondaryName")}
                                </label>
                                <input type="text" id="company-secondary-name-input" class="form-input"
                                    placeholder="${I18n.isRTL()?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A \u0644\u0644\u0634\u0631\u0643\u0629":"Enter secondary company name"}" value="${Utils.escapeHTML(AppState.companySettings?.secondaryName||"")}">
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    ${I18n.t("settings.company.secondaryNameHint")}
                                </p>
                            </div>
                            <div>
                                <label for="company-secondary-name-font-size-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-text-height ml-2"></i>
                                    \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A (\u0628\u0627\u0644\u0628\u0643\u0633\u0644)
                                </label>
                                <div class="flex items-center gap-3">
                                    <input type="number" id="company-secondary-name-font-size-input" class="form-input" min="8" max="72" step="1"
                                        placeholder="\u0645\u062B\u0627\u0644: 14" value="${AppState.companySettings?.secondaryNameFontSize||"14"}">
                                    <span class="text-xs text-gray-500">\u0628\u0643\u0633\u0644</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u062D\u062C\u0645 \u0627\u0644\u062E\u0637 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A: 14 \u0628\u0643\u0633\u0644. \u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631\u0647 \u0645\u0646 8 \u0625\u0644\u0649 72 \u0628\u0643\u0633\u0644.
                                </p>
                            </div>
                            <div>
                                <span id="company-secondary-name-color-label" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-palette ml-2"></i>
                                    \u0644\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A
                                </span>
                                <div class="flex items-center gap-3" role="group" aria-labelledby="company-secondary-name-color-label">
                                    <label for="company-secondary-name-color-input" class="sr-only">\u0644\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A (\u0645\u0646\u062A\u0642\u064A)</label>
                                    <input type="color" id="company-secondary-name-color-input" class="form-input" style="width: 80px; height: 40px; cursor: pointer;"
                                        value="${AppState.companySettings?.secondaryNameColor||"#6B7280"}">
                                    <label for="company-secondary-name-color-text-input" class="sr-only">\u0644\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A (\u0643\u0648\u062F)</label>
                                    <input type="text" id="company-secondary-name-color-text-input" class="form-input flex-1"
                                        placeholder="#6B7280" value="${AppState.companySettings?.secondaryNameColor||"#6B7280"}">
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u064A\u0645\u0643\u0646\u0643 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0644\u0648\u0646 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0646\u062A\u0642\u064A \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0623\u0648 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0644\u0648\u0646 \u0645\u0628\u0627\u0634\u0631\u0629 (\u0645\u062B\u0644: #6B7280 \u0623\u0648 rgb(107, 112, 128)).
                                </p>
                            </div>
                            <div>
                                <label for="form-version-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-code-branch ml-2"></i>
                                    \u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 (\u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0647\u064A\u062F\u0631 \u0648\u0627\u0644\u0641\u0648\u062A\u0631)
                                </label>
                                <input type="text" id="form-version-input" class="form-input"
                                    placeholder="\u0645\u062B\u0627\u0644: 1.0" value="${Utils.escapeHTML(AppState.companySettings?.formVersion||"1.0")}">
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0641\u064A \u0627\u0644\u0647\u064A\u062F\u0631 \u0648\u0627\u0644\u0641\u0648\u062A\u0631 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0648\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631.
                                </p>
                            </div>
                            <div>
                                <label for="clinic-monthly-visits-threshold-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-hospital ml-2"></i>
                                    \u062D\u062F \u062A\u0646\u0628\u064A\u0647 \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A\u0629
                                </label>
                                <div class="flex items-center gap-3">
                                    <input type="number" id="clinic-monthly-visits-threshold-input" class="form-input" min="1" max="1000" step="1"
                                        placeholder="10" value="${Math.max(1,Math.min(1e3,parseInt(AppState.companySettings?.clinicMonthlyVisitsAlertThreshold,10)||10))}">
                                    <span class="text-xs text-gray-500">\u0632\u064A\u0627\u0631\u0629/\u0634\u0647\u0631</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u062D\u062F \u0641\u064A \u0627\u0644\u0634\u0647\u0631\u060C \u064A\u0638\u0647\u0631 \u062A\u0646\u0628\u064A\u0647 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u064A\u064F\u0631\u0633\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.
                                </p>
                            </div>
                            <div>
                                <label for="employee-import-hire-months-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user-plus ml-2"></i>
                                    \u0641\u062A\u0631\u0629 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0628\u0627\u0644\u0623\u0634\u0647\u0631)
                                </label>
                                <div class="flex items-center gap-3">
                                    <input type="number" id="employee-import-hire-months-input" class="form-input" min="1" max="120" step="1"
                                        placeholder="3" value="${Math.max(1,Math.min(120,parseInt(AppState.companySettings?.employeeImportHireMonths,10)||3))}">
                                    <span class="text-xs text-gray-500">\u0634\u0647\u0631</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0639\u0646\u062F \u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel: \u064A\u064F\u0642\u0628\u0644 \u0641\u0642\u0637 \u0627\u0644\u062C\u062F\u062F \u0627\u0644\u0630\u064A\u0646 \u062A\u0627\u0631\u064A\u062E \u062A\u0639\u064A\u064A\u0646\u0647\u0645 \u062E\u0644\u0627\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062F\u0629 \u062D\u062A\u0649 \u0627\u0644\u064A\u0648\u0645 (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A 3). \u0644\u0627 \u064A\u0624\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u064A\u0646.
                                </p>
                            </div>
                            <div>
                                <label for="profile-teams-url-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fab fa-microsoft ml-2"></i>
                                    \u0631\u0627\u0628\u0637 Microsoft Teams (\u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A)
                                </label>
                                <input type="url" id="profile-teams-url-input" class="form-input" dir="ltr"
                                    placeholder="https://teams.microsoft.com/..."
                                    value="${Utils.escapeHTML(AppState.companySettings?.profileTeamsUrl||"")}">
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0631\u0627\u0628\u0637 \u0642\u0646\u0627\u0629 \u0623\u0648 \u0641\u0631\u064A\u0642 \u0623\u0648 \u0627\u062C\u062A\u0645\u0627\u0639 Teams. \u064A\u064F\u0639\u0631\u0636 \u0643\u0623\u064A\u0642\u0648\u0646\u0629 \u0628\u062C\u0627\u0646\u0628 \xAB\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\xBB.
                                </p>
                            </div>
                            <div>
                                <label for="profile-whatsapp-url-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fab fa-whatsapp ml-2"></i>
                                    \u0631\u0627\u0628\u0637 \u0648\u0627\u062A\u0633\u0627\u0628 (\u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A)
                                </label>
                                <input type="url" id="profile-whatsapp-url-input" class="form-input" dir="ltr"
                                    placeholder="https://wa.me/9665xxxxxxxx \u0623\u0648 \u0631\u0627\u0628\u0637 \u0645\u062C\u0645\u0648\u0639\u0629"
                                    value="${Utils.escapeHTML(AppState.companySettings?.profileWhatsAppUrl||"")}">
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0625\u0630\u0627 \u062A\u064F\u0631\u0643 \u0641\u0627\u0631\u063A\u0627\u064B\u060C \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0644\u0631\u0627\u0628\u0637 wa.me \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 \u0627\u0644\u0631\u0642\u0645 \u0635\u0627\u0644\u062D\u0627\u064B.
                                </p>
                            </div>
                            <div class="md:col-span-2 border-t pt-4">
                                <div class="flex flex-wrap items-start justify-between gap-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-cyan-50/40 border border-blue-200/70 shadow-sm">
                                    <div class="flex-1 min-w-0">
                                        <h3 class="text-sm font-bold text-blue-900 mb-2 flex flex-wrap items-center gap-2">
                                            <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                                                <i class="fas fa-shield-alt text-sm"></i>
                                            </span>
                                            \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u062D\u062F\u0651 \u0627\u0644\u0623\u062F\u0646\u0649 \u0628\u064A\u0646 \u0627\u0633\u062A\u0644\u0627\u0645\u064E\u064A\u0646 \u0628\u0646\u0641\u0633 \u0627\u0644\u0645\u0648\u0638\u0641 (\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629)
                                        </h3>
                                        <p class="text-xs text-blue-800/85 leading-relaxed max-w-3xl">
                                            \u062C\u062F\u0651\u062F \u0627\u0644\u062C\u062F\u0648\u0644 \u0644\u0643\u0644 <strong class="font-semibold">\u0635\u0646\u0641</strong> \u0639\u062F\u062F <strong class="font-semibold">\u0627\u0644\u0634\u0647\u0648\u0631</strong> \u0643\u062D\u062F\u0651 \u0623\u062F\u0646\u0649 \u0628\u064A\u0646 \u0627\u0633\u062A\u0644\u0627\u0645 \u0648\u0627\u062D\u062F \u0648\u0627\u0644\u0630\u064A \u0628\u0639\u062F\u0647. \u062B\u0645 \u0627\u062D\u0641\u0638 \u0628\u0640<strong>\xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB</strong> \u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0634\u064A\u062A \u0648\u0627\u0644\u062A\u0637\u0628\u064A\u0642.
                                        </p>
                                        <p class="text-[11px] text-slate-600 mt-2">
                                            <i class="fas fa-database ml-1 text-blue-600"></i>
                                            \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u064F\u0632\u0627\u062F \u0647\u0646\u0627\u061B \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 \u0639\u0646\u062F \u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB \u0623\u0633\u0641\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629.
                                        </p>
                                    </div>
                                    <div class="flex flex-wrap items-center gap-2.5">
                                        <button type="button" id="ppe-download-template-btn" style="font-size:1rem;font-weight:800;" class="btn-primary shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            <i class="fas fa-file-download"></i> \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0644\u0628
                                        </button>
                                        <button type="button" id="ppe-import-rules-btn" style="font-size:1rem;font-weight:800;" class="btn-primary shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            <i class="fas fa-file-import"></i> \u0627\u0633\u062A\u064A\u0631\u0627\u062F
                                        </button>
                                        <button type="button" id="ppe-add-rule-btn" style="font-size:1rem;font-weight:800;" class="btn-primary inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            <i class="fas fa-plus"></i> \u0625\u0636\u0627\u0641\u0629 \u0635\u0641
                                        </button>
                                    </div>
                                </div>
                                <div id="ppe-eligibility-rules-container" class="w-full min-w-0"></div>
                                <input type="file" id="ppe-rules-import-file" accept=".csv,.txt,.xlsx,.xls" class="hidden">
                            </div>
                            <div class="flex flex-wrap items-center gap-3 pt-3 mt-1 border-t border-slate-200">
                                <button type="button" id="save-company-settings-btn" style="font-size:1rem;font-weight:800;" class="btn-primary inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                    <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629
                                </button>
                                <button type="button" id="reset-company-name-btn" style="font-size:1rem;font-weight:800;" class="btn-primary inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                    <i class="fas fa-undo ml-2"></i>\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-card mt-6">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-image ml-2"></i>\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629</h2>
                        </div>
                        <div class="card-body space-y-4">
                            <div>
<label for="company-logo-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-upload ml-2"></i>
                                    \u0631\u0641\u0639 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629
                                </label>
                                <div class="flex items-center gap-4">
                                    ${AppState.companyLogo?`
                                        <div class="flex-shrink-0">
                                            <img src="${AppState.companyLogo}" alt="\u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" id="company-logo-preview"
                                                class="w-32 h-32 object-contain border border-gray-300 rounded p-2 bg-white">
                                        </div>
                                    `:""}
                                    <div class="flex-1">
                                        <input type="file" id="company-logo-input" accept="image/*" class="form-input text-sm">
                                        <p class="text-xs text-gray-500 mt-1">
                                            <i class="fas fa-info-circle ml-1"></i>
                                            \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u064A\u0633\u0627\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0648\u0627\u0644\u0635\u0641\u062D\u0627\u062A. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629: 2MB
                                        </p>
                                        <div class="flex items-center gap-2 mt-2">
                                            <button type="button" id="upload-logo-btn" style="font-size:1rem;font-weight:800;" class="btn-primary inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                                <i class="fas fa-upload ml-2"></i>\u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631
                                            </button>
                                            ${AppState.companyLogo?`
                                                <button type="button" id="remove-logo-btn" class="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-600 hover:bg-red-700 text-white text-base font-extrabold px-5 py-3 min-h-[48px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300">
                                                    <i class="fas fa-trash ml-2"></i>\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631
                                                </button>
                                            `:""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-card mt-6" id="post-login-items-card">
                        <div class="card-header">
                            <h2 class="card-title"><i class="fas fa-clipboard-list ml-2"></i>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0648\u0639\u0631\u0648\u0636 \u0645\u0627 \u0628\u0639\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</h2>
                        </div>
                        <div class="card-body space-y-4">
                            <p class="text-sm text-gray-600">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u062A\u0638\u0647\u0631 \u0647\u0630\u0647 \u0627\u0644\u0646\u0635\u0648\u0635 \u0623\u0648 \u0627\u0644\u0633\u064A\u0627\u0633\u0627\u062A \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0639\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0645\u062F\u0629 \u0645\u062D\u062F\u062F\u0629 (\u0645\u062B\u0644 \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629). \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0639\u0646\u0635\u0631 \u0648\u062A\u0631\u062A\u064A\u0628\u0647\u0627.
                            </p>
                            <div id="post-login-items-list" class="space-y-3"></div>
                            <div class="flex items-center gap-2 pt-2 border-t">
                                <button type="button" id="post-login-add-item-btn" style="font-size:1rem;font-weight:800;" class="btn-primary inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 text-base font-extrabold px-6 py-3 min-h-[50px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                    <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631
                                </button>
                            </div>
                            <div id="post-login-item-form" class="hidden mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                                <h3 class="font-semibold text-gray-800" id="post-login-form-title">\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F</h3>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>
                                    <input type="text" id="post-login-item-title" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629" maxlength="200">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0646\u0635</label>
                                    <textarea id="post-login-item-body" class="form-input" rows="4" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0646\u0635 \u0623\u0648 \u0627\u0644\u0633\u064A\u0627\u0633\u0629..." maxlength="2000"></textarea>
                                    <p class="text-xs text-gray-500 mt-1">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2000 \u062D\u0631\u0641</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0645\u062F\u0629 \u0627\u0644\u0639\u0631\u0636 (\u062B\u0627\u0646\u064A\u0629)</label>
                                    <input type="number" id="post-login-item-duration" class="form-input" min="0" max="120" value="10" placeholder="10">
                                    <p class="text-xs text-gray-500 mt-1">0 = \u062D\u062A\u0649 \u064A\u0636\u063A\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u062E\u0637\u064A \u0641\u0642\u0637</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="post-login-item-active" class="rounded border-gray-300 text-blue-600" checked>
                                    <label for="post-login-item-active" class="text-sm text-gray-700">\u0645\u0641\u0639\u0651\u0644 (\u064A\u064F\u0639\u0631\u0636 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button type="button" id="post-login-item-save-btn" class="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold px-5 py-2.5 min-h-[44px] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                                    <button type="button" id="post-login-item-cancel-btn" class="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold px-5 py-2.5 min-h-[44px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"><i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <!-- Tab Content: \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0648\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 -->
            <div class="tab-content" id="tab-integration">
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-cloud text-green-600 ml-2"></i>
                            \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0648\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0645\u062D\u0631\u0643 \u0627\u0644\u0628\u0627\u0643 \u0625\u0646\u062F \u0648\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A SQL</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-cloud ml-2"></i>\u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629</h2>
                            </div>
                            <div class="card-body">
                                <form id="google-settings-form" class="space-y-6">
                                    <div>
                                        <label class="flex items-center mb-4">
                                            <input type="checkbox" id="google-apps-script-enabled" class="rounded border-gray-300 text-blue-600"
                                                ${AppState.googleConfig.appsScript.enabled?"checked":""}>
                                            <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0627\u0644\u062E\u0644\u0641\u064A</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-link ml-2"></i>
                                            \u0631\u0627\u0628\u0637 API \u0644\u0644\u062E\u0627\u062F\u0645 (\u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629)
                                        </label>
                                        <input type="url" id="google-apps-script-url" class="form-input"
                                            value="${AppState.googleConfig.appsScript.scriptUrl||""}"
                                            placeholder="https://script.google.com/macros/s/XXXX/exec">
                                    </div>
                                    <div>
                                        <label class="flex items-center mb-4">
                                            <input type="checkbox" id="google-sheets-enabled" class="rounded border-gray-300 text-blue-600"
                                                ${AppState.googleConfig.sheets.enabled?"checked":""}>
                                            <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 (\u0625\u0646 \u064A\u0637\u0644\u0628\u0647\u0627 \u0627\u0644\u062E\u0627\u062F\u0645)</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-table ml-2"></i>
                                            \u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 / \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)
                                        </label>
                                        <input type="text" id="google-sheets-id" class="form-input"
                                            value="${AppState.googleConfig.sheets.spreadsheetId||""}"
                                            placeholder="\u0625\u0646 \u0648\u064F\u062C\u062F \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645">
                                    </div>
                                    <div class="flex items-center justify-end gap-4 pt-4 border-t">
                                        <button type="button" id="test-connection-btn" class="btn-secondary">
                                            <i class="fas fa-plug ml-2"></i>
                                            \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644
                                        </button>
                                        <button type="submit" class="btn-primary">
                                            <i class="fas fa-save ml-2"></i>
                                            \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F -->
                        <div class="content-card mt-6">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-sync ml-2"></i>\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div>
                                    <p class="text-sm text-gray-600 mb-4">
                                        <i class="fas fa-info-circle ml-2"></i>
                                        \u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (Users, Incidents, NearMiss, PTW, Training, Clinic, Fire Equipment, PPE, ViolationTypes, Violations, Contractors) \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0639 \u0627\u0644\u0631\u0624\u0648\u0633 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629
                                    </p>
                                    <button id="initialize-sheets-btn" class="btn-primary w-full">
                                        <i class="fas fa-magic ml-2"></i>
                                        \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                                    </button>
                                </div>
                                <div class="border-t pt-4">
                                    <button id="sync-data-btn" class="btn-primary w-full">
                                        <i class="fas fa-sync ml-2"></i>
                                        \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 (\u0642\u0631\u0627\u0621\u0629)
                                    </button>
                                </div>
                                <div class="border-t pt-4">
                                    <button id="save-all-data-btn" class="btn-success w-full">
                                        <i class="fas fa-cloud-upload-alt ml-2"></i>
                                        \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 (\u0643\u062A\u0627\u0628\u0629)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u062A\u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u064A -->
            <div class="tab-content" id="tab-cloud-storage">
                ${t?this.renderCloudStorageSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: \u0627\u0644\u062E\u0627\u062F\u0645 -->
            <div class="tab-content" id="tab-google-drive">
                ${t?this.renderGoogleDriveSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: Microsoft SharePoint -->
            <div class="tab-content" id="tab-sharepoint">
                ${t?this.renderSharePointSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 -->
            <div class="tab-content" id="tab-system-settings">
                ${this.renderSystemVersionCard()}
                ${this.isCurrentUserAdmin()?this.renderUserPhotoMigrationCard():""}
                ${this.isCurrentUserAdmin()?this.renderDataArchivingCard():""}
                ${this.renderEmergencyContactsCard()}
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-sliders-h text-purple-600 ml-2"></i>
                            \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0648\u0627\u0644\u0623\u0646\u0648\u0627\u0639</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-calendar-alt ml-2"></i>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-calendar-check ml-2"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0648\u064A\u0645
                                    </label>
                                    <select id="date-format-select" class="form-input">
                                        <option value="gregorian" ${AppState.dateFormat==="gregorian"?"selected":""}>\u0627\u0644\u0645\u064A\u0644\u0627\u062F\u064A (Gregorian)</option>
                                        <option value="hijri" ${AppState.dateFormat==="hijri"?"selected":""}>\u0627\u0644\u0647\u062C\u0631\u064A (Hijri)</option>
                                    </select>
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-info-circle ml-1"></i>
                                        \u0633\u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0648\u064A\u0645 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645
                                    </p>
                                    <button type="button" id="save-date-format-btn" class="btn-primary mt-2">
                                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="content-card mt-6">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-clock ml-2"></i>\u062D\u0633\u0627\u0628 \u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u2014 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0643\u0627\u0631\u062A <strong>\u0639\u062F\u062F \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644</strong> \u0648\u0645\u0624\u0634\u0651\u0631\u064A <strong>TRIR</strong> \u0648<strong>AFR</strong> \u0648<strong>FAR</strong> \u0648<strong>FR</strong> \u0648<strong>LTI</strong> (\u0639\u0628\u0631 \u0645\u062D\u0631\u0643 HseMetrics \u0627\u0644\u0645\u0648\u062D\u0651\u062F \u0645\u0639 \u0627\u0644\u0633\u0643\u0648\u0631\u0643\u0627\u0631\u062F).
                                    \u0625\u0646 \u0644\u0645 \u064A\u064F\u0645\u0644\u0623 \xAB\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u064A\u062F\u0648\u064A\xBB \u064A\u064F\u0642\u062F\u0651\u064E\u0631 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0646: \u0645\u0648\u0638\u0641\u0648\u0646 \u0646\u0634\u0637\u0648\u0646 \xD7 (\u0633\u0627\u0639\u0627\u062A/\u064A\u0648\u0645 \xD7 \u0623\u064A\u0627\u0645/\u0634\u0647\u0631 \xD7 \u0623\u0634\u0647\u0631/\u0633\u0646\u0629) \u0645\u0639 \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0625\u0646 \u0641\u064F\u0639\u0651\u0644 \u0627\u0644\u062E\u064A\u0627\u0631 \u0648\u0648\u064F\u062C\u062F\u062A \u0623\u0639\u062F\u0627\u062F \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F.
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-total-override">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 (\u064A\u062F\u0648\u064A \u2014 \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062A\u0642\u062F\u064A\u0631)</label>
                                        <input type="text" id="wh-total-override" class="form-input" placeholder="\u0627\u062A\u0631\u0643\u0647 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062A\u0642\u062F\u064A\u0631 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A" inputmode="decimal" autocomplete="off" />
                                        <p class="text-xs text-gray-500 mt-1">\u064A\u064F\u062D\u0641\u0638 \u0641\u064A \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A \u062A\u062D\u062A \u0627\u0644\u0645\u0641\u062A\u0627\u062D <code class="text-xs">hse_total_work_hours</code>. \u0641\u0627\u0631\u063A = \u062D\u0630\u0641 \u0627\u0644\u064A\u062F\u0648\u064A.</p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-hours-per-day">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u064A\u0648\u0645\u064A\u0627\u064B</label>
                                        <input type="number" id="wh-hours-per-day" class="form-input" min="1" max="24" step="0.25" placeholder="8" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-days-per-month">\u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644 \u0641\u064A \u0627\u0644\u0634\u0647\u0631</label>
                                        <input type="number" id="wh-days-per-month" class="form-input" min="1" max="31" step="1" placeholder="22" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-months-per-year">\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u0647\u0631 \u0641\u064A \u0627\u0644\u0633\u0646\u0629 (\u0644\u0644\u062A\u0642\u062F\u064A\u0631)</label>
                                        <input type="number" id="wh-months-per-year" class="form-input" min="1" max="12" step="1" placeholder="12" />
                                    </div>
                                    <div class="flex items-center pt-6">
                                        <input type="checkbox" id="wh-include-contractors" class="form-checkbox h-5 w-5" />
                                        <label for="wh-include-contractors" class="mr-2 text-sm font-medium text-gray-800">\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 (\u0645\u0646 \u062D\u0642\u0648\u0644 \u0631\u0642\u0645\u064A\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0625\u0646 \u0648\u064F\u062C\u062F\u062A)</label>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-multiplier-trir">\u0645\u0636\u0627\u0639\u0641 TRIR</label>
                                        <input type="number" id="wh-multiplier-trir" class="form-input" min="1" step="1000" placeholder="200000" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-multiplier-afr">\u0645\u0636\u0627\u0639\u0641 AFR</label>
                                        <input type="number" id="wh-multiplier-afr" class="form-input" min="1" step="1000" placeholder="1000000" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-multiplier-far">\u0645\u0636\u0627\u0639\u0641 FAR</label>
                                        <input type="number" id="wh-multiplier-far" class="form-input" min="1" step="1000000" placeholder="100000000" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-multiplier-sr">\u0645\u0636\u0627\u0639\u0641 SR</label>
                                        <input type="number" id="wh-multiplier-sr" class="form-input" min="1" step="1000" placeholder="1000000" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="wh-multiplier-ir">\u0645\u0636\u0627\u0639\u0641 IR</label>
                                        <input type="number" id="wh-multiplier-ir" class="form-input" min="1" step="1000" placeholder="1000000" />
                                    </div>
                                </div>
                                <p class="text-xs text-gray-500">
                                    \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D: <code>hse_hours_per_day</code>\u060C <code>hse_work_days_per_month</code>\u060C <code>hse_multiplier_trir/afr/far/sr/ir</code>.
                                </p>
                                <button type="button" id="save-work-hours-settings-btn" class="btn-primary">
                                    <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Backup Management Section (Admin Only) -->
                <div id="backup-management-section" class="settings-group mt-6" style="display: none;">
                    <div class="settings-group-header">
                        <h3 class="settings-group-title">
                            <i class="fas fa-database ml-2"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629
                        </h3>
                        <p class="settings-group-subtitle">
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0625\u0646\u0634\u0627\u0621 \u0646\u0633\u062E \u064A\u062F\u0648\u064A\u0629
                        </p>
                    </div>
                    <div class="settings-group-content">
                        <!-- Backup Statistics Card -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                            <h4 class="text-lg font-semibold mb-4 flex items-center">
                                <i class="fas fa-chart-bar ml-2 text-blue-600"></i>
                                \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629
                            </h4>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0646\u0633\u062E</p>
                                    <p class="text-xl font-bold" id="total-backups-count">0</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0646\u0627\u062C\u062D\u0629</p>
                                    <p class="text-xl font-bold text-green-600" id="successful-backups-count">0</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0641\u0627\u0634\u0644\u0629</p>
                                    <p class="text-xl font-bold text-red-600" id="failed-backups-count">0</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0645\u0639\u062F\u0644 \u0627\u0644\u0646\u062C\u0627\u062D</p>
                                    <p class="text-xl font-bold" id="backup-success-rate">0%</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0622\u062E\u0631 \u0646\u0633\u062E\u0629</p>
                                    <p class="text-sm" id="last-backup-time">-</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded p-4">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">\u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629</p>
                                    <p class="text-sm font-bold" id="backup-storage-used">0 Bytes</p>
                                </div>
                            </div>
                            <div class="mt-4 flex gap-2">
                                <button id="create-manual-backup-btn" class="btn btn-primary">
                                    <i class="fas fa-database ml-2"></i>
                                    \u0625\u0646\u0634\u0627\u0621 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u064A\u062F\u0648\u064A\u0629
                                </button>
                                <button id="refresh-backups-btn" class="btn btn-secondary">
                                    <i class="fas fa-sync-alt ml-2"></i>
                                    \u062A\u062D\u062F\u064A\u062B
                                </button>
                            </div>
                        </div>
                        
                        <!-- Backup Settings Card -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                            <h4 class="text-lg font-semibold mb-4 flex items-center">
                                <i class="fas fa-cog ml-2 text-green-600"></i>
                                \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629
                            </h4>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <input type="checkbox" id="auto-backup-enabled" class="form-checkbox">
                                    <label for="auto-backup-enabled" class="mr-2">\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A</label>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0646\u0633\u062E</label>
                                        <input type="number" id="max-backup-files" class="form-input" value="30" min="1" max="100">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-2">\u0645\u062F\u0629 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 (\u0628\u0627\u0644\u0623\u064A\u0627\u0645)</label>
                                        <input type="number" id="retention-days" class="form-input" value="30" min="1" max="365">
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <label class="flex items-center">
                                        <input type="checkbox" id="notify-on-backup" class="form-checkbox" checked>
                                        <span class="mr-2">\u0625\u0634\u0639\u0627\u0631 \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" id="notify-on-failure" class="form-checkbox" checked>
                                        <span class="mr-2">\u0625\u0634\u0639\u0627\u0631 \u0639\u0646\u062F \u0641\u0634\u0644 \u0627\u0644\u0646\u0633\u062E</span>
                                    </label>
                                </div>
                                <div class="flex gap-2">
                                    <button id="save-backup-settings-btn" class="btn btn-primary">
                                        <i class="fas fa-save ml-2"></i>
                                        \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Backups List -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h4 class="text-lg font-semibold mb-4 flex items-center">
                                <i class="fas fa-list ml-2 text-purple-600"></i>
                                \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629
                            </h4>
                            <div id="backups-list" class="space-y-3 max-h-96 overflow-y-auto">
                                <p class="text-gray-500 text-center py-4">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C -->
            <div class="tab-content" id="tab-form-settings">
                ${t&&typeof Permissions?.renderFormSettingsCard=="function"?Permissions.renderFormSettingsCard():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A -->
            <div class="tab-content" id="tab-violation-types">
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-tags text-purple-600 ml-2"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header flex items-center justify-between flex-wrap gap-2">
                                <h2 class="card-title"><i class="fas fa-tags ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h2>
                                <div class="flex flex-wrap gap-2 items-center">
                                    <button type="button" id="export-violation-types-btn" class="btn-secondary" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0625\u0644\u0649 \u0645\u0644\u0641 Excel">
                                        <i class="fas fa-file-export ml-2 text-green-700"></i>
                                        \u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel
                                    </button>
                                    <button type="button" id="import-violation-types-btn" class="btn-secondary">
                                        <i class="fas fa-file-excel ml-2 text-green-700"></i>
                                        \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel
                                    </button>
                                    <button type="button" id="add-violation-type-btn" class="btn-primary">
                                        <i class="fas fa-plus ml-2"></i>
                                        \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u062E\u0627\u0644\u0641\u0629
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="violation-types-management">
                                    ${this.renderViolationTypesList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A -->
            <div class="tab-content" id="tab-reports">
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-file-pdf text-red-600 ml-2"></i>
                            \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0627\u0631\u064A\u0631 PDF \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-file-pdf ml-2"></i>\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <p class="text-sm text-gray-600 mb-4">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0627\u0631\u064A\u0631 PDF \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button id="generate-incidents-report-btn" class="btn-secondary w-full">
                                        <i class="fas fa-file-pdf ml-2"></i>
                                        \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                                    </button>
                                    <button id="generate-training-report-btn" class="btn-secondary w-full">
                                        <i class="fas fa-file-pdf ml-2"></i>
                                        \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                                    </button>
                                    <button id="generate-ptw-report-btn" class="btn-secondary w-full">
                                        <i class="fas fa-file-pdf ml-2"></i>
                                        \u062A\u0642\u0631\u064A\u0631 \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644
                                    </button>
                                    <button id="generate-full-report-btn" class="btn-primary w-full">
                                        <i class="fas fa-file-pdf ml-2"></i>
                                        \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 (\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A)
                                    </button>
                                </div>
                            </div>
                        </div>
                        ${t?`
                        <div class="content-card mt-4">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-calendar-check ml-2"></i>\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <p class="text-sm text-gray-600 mb-2">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u0645\u0637 \u0645\u0648\u062D\u0651\u062F \u2014 \u062D\u062F\u0651\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0645\u0646 / \u0625\u0644\u0649 \u2014 \u0645\u0648\u0642\u0639 \u0648\u0627\u062D\u062F \u0623\u0648 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label for="monthly-safety-from" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                                        <input type="date" id="monthly-safety-from" class="form-input w-full" value="${this.getMonthlySafetyDefaultFromDate()}">
                                    </div>
                                    <div>
                                        <label for="monthly-safety-to" class="block text-sm font-semibold text-gray-700 mb-2">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                        <input type="date" id="monthly-safety-to" class="form-input w-full" value="${this.getMonthlySafetyDefaultToDate()}">
                                    </div>
                                    <div>
                                        <label for="monthly-safety-site" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                        <select id="monthly-safety-site" class="form-input w-full">
                                            ${typeof Reports<"u"&&Reports.renderMonthlySafetySiteOptions?Reports.renderMonthlySafetySiteOptions("ar"):'<option value="factory-1">\u0645\u0635\u0646\u0639 1</option><option value="factory-2">\u0645\u0635\u0646\u0639 2</option><option value="warehouse-1">\u0627\u0644\u0645\u062E\u0627\u0632\u0646</option>'}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="monthly-safety-lang" class="block text-sm font-semibold text-gray-700 mb-2">\u0644\u063A\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</label>
                                        <select id="monthly-safety-lang" class="form-input w-full">
                                            <option value="ar">\u0627\u0644\u0639\u0631\u0628\u064A\u0629</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex flex-wrap gap-3">
                                    <button type="button" id="generate-monthly-safety-report-ar-btn" class="btn-primary" data-msr-lang="ar">
                                        <i class="fas fa-download ml-2"></i>
                                        \u062A\u062D\u0645\u064A\u0644 PDF (\u0639\u0631\u0628\u064A)
                                    </button>
                                    <button type="button" id="generate-monthly-safety-report-en-btn" class="btn-secondary" data-msr-lang="en">
                                        <i class="fas fa-download ml-2"></i>
                                        Download PDF (English)
                                    </button>
                                </div>
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 -->
            <div class="tab-content" id="tab-notifications">
                ${t?`
                <div class="settings-group mt-6 email-settings-panel">
                    <div class="email-settings-hero">
                        <div class="email-settings-hero-copy">
                            <p class="email-settings-eyebrow">\u0645\u0631\u0643\u0632 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A</p>
                            <h2 class="email-settings-hero-title">
                                <i class="fas fa-envelope-open-text"></i>
                                \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A
                            </h2>
                            <p class="email-settings-hero-sub">\u062A\u0634\u063A\u064A\u0644 \u0633\u0631\u064A\u0639 \xB7 \u0645\u0633\u062A\u0644\u0645\u0648\u0646 \xB7 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \xB7 \u0627\u062E\u062A\u0628\u0627\u0631 \u0641\u0648\u0631\u064A</p>
                        </div>
                        <label class="email-settings-switch email-settings-switch-hero" for="email-settings-global-enabled">
                            <input type="checkbox" id="email-settings-global-enabled">
                            <span class="email-settings-switch-ui" aria-hidden="true"></span>
                            <span class="email-settings-switch-label">\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0646\u0638\u0627\u0645</span>
                        </label>
                    </div>

                    <div class="email-settings-status" id="email-settings-status-banner" role="status">
                        <div class="email-settings-status-main">
                            <span class="email-settings-status-dot" aria-hidden="true"></span>
                            <div>
                                <p class="email-settings-status-title" id="email-settings-status-title">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</p>
                                <p class="email-settings-status-hint" id="email-settings-status-hint">\u2014</p>
                            </div>
                        </div>
                        <span class="email-settings-sync-badge" id="email-settings-sync-badge" hidden>\u0645\u0632\u0627\u0645\u0646\u0629\u2026</span>
                    </div>

                    <div class="email-settings-stats" id="email-settings-stats" aria-live="polite"></div>

                    <div class="settings-group-content space-y-4">
                        <div class="email-settings-grid">
                            <div class="content-card email-settings-card">
                                <div class="card-body space-y-3">
                                    <div class="email-settings-card-head">
                                        <h3 class="email-settings-card-title"><i class="fas fa-users ml-2"></i>\u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0648\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0648\u0646</h3>
                                        <p class="email-settings-card-desc">\u064A\u064F\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0644\u0643\u0644 \u0646\u0648\u0639 \u0628\u0644\u0627 \u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u062E\u0627\u0635\u064A\u0646 \u2014 \u0627\u0636\u063A\u0637 \xD7 \u0644\u062D\u0630\u0641 \u0634\u0631\u064A\u062D\u0629</p>
                                    </div>
                                    <div class="email-settings-chip-editor">
                                        <div id="email-settings-default-chips" class="email-settings-chips" aria-live="polite"></div>
                                        <div class="email-settings-chip-add">
                                            <input type="text" id="email-settings-default-recipients" class="form-input email-settings-recipients-input" placeholder="\u0623\u0636\u0641 \u0625\u064A\u0645\u064A\u0644 \u062B\u0645 Enter" dir="ltr" autocomplete="email">
                                            <button type="button" id="email-settings-add-recipient-btn" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p class="email-settings-help"><i class="fas fa-info-circle ml-1"></i>\u064A\u0645\u0643\u0646 \u0644\u0635\u0642 \u0639\u062F\u0629 \u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629.</p>
                                </div>
                            </div>
                            <div class="content-card email-settings-card email-settings-card-test">
                                <div class="card-body space-y-3">
                                    <div class="email-settings-card-head">
                                        <h3 class="email-settings-card-title"><i class="fas fa-bolt ml-2"></i>\u0627\u062E\u062A\u0628\u0627\u0631 \u0633\u0631\u064A\u0639</h3>
                                        <p class="email-settings-card-desc">\u062A\u0623\u0643\u062F \u0645\u0646 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u062E\u0644\u0627\u0644 \u062B\u0648\u0627\u0646\u064D</p>
                                    </div>
                                    <div class="email-settings-test-row">
                                        <input type="email" id="email-settings-test-to" class="form-input flex-1" placeholder="your@email.com" dir="ltr">
                                        <button type="button" id="email-settings-test-btn" class="btn-primary email-settings-test-send">
                                            <i class="fas fa-paper-plane ml-2"></i>\u0625\u0631\u0633\u0627\u0644 \u062A\u062C\u0631\u064A\u0628\u064A
                                        </button>
                                    </div>
                                    <p class="email-settings-help" id="email-settings-test-hint">\u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u062A\u0641\u0639\u064A\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u2014 \u064A\u062E\u062A\u0628\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0641\u0642\u0637.</p>
                                </div>
                            </div>
                        </div>

                        <div class="content-card email-settings-card">
                            <div class="card-header email-settings-modules-header">
                                <div>
                                    <h2 class="card-title mb-1"><i class="fas fa-sliders-h ml-2"></i>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</h2>
                                    <p class="email-settings-summary" id="email-settings-modules-summary">\u2014</p>
                                </div>
                                <div class="email-settings-toolbar">
                                    <input type="search" id="email-settings-module-filter" class="form-input email-settings-search" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u2026">
                                    <button type="button" id="email-settings-enable-visible-btn" class="btn-secondary btn-sm" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0638\u0627\u0647\u0631\u0629">
                                        <i class="fas fa-check-double ml-1"></i>\u062A\u0641\u0639\u064A\u0644
                                    </button>
                                    <button type="button" id="email-settings-manual-visible-btn" class="btn-secondary btn-sm" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0644\u0644\u0638\u0627\u0647\u0631">
                                        <i class="fas fa-hand-pointer ml-1"></i>\u064A\u062F\u0648\u064A
                                    </button>
                                    <button type="button" id="email-settings-auto-visible-btn" class="btn-secondary btn-sm" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0644\u0638\u0627\u0647\u0631">
                                        <i class="fas fa-bolt ml-1"></i>\u062A\u0644\u0642\u0627\u0626\u064A
                                    </button>
                                    <button type="button" id="email-settings-disable-visible-btn" class="btn-secondary btn-sm" title="\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0638\u0627\u0647\u0631\u0629">
                                        <i class="fas fa-ban ml-1"></i>\u0625\u064A\u0642\u0627\u0641
                                    </button>
                                </div>
                            </div>
                            <div class="card-body pt-3">
                                <div class="email-settings-group-filters" id="email-settings-group-filters" role="tablist" aria-label="\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0627\u062A"></div>
                                <div class="email-settings-status-filters" id="email-settings-status-filters" role="tablist" aria-label="\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u0629"></div>
                                <div class="email-settings-legend">
                                    <span><i class="fas fa-power-off"></i> \u0645\u0641\u0639\u0651\u0644</span>
                                    <span><i class="fas fa-hand-pointer"></i> \u064A\u062F\u0648\u064A = \u0632\u0631 \u0645\u0646 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span>
                                    <span><i class="fas fa-bolt"></i> \u062A\u0644\u0642\u0627\u0626\u064A = \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638</span>
                                    <span><i class="fas fa-chevron-down"></i> \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0648\u0646 \u0627\u0644\u062E\u0627\u0635\u0648\u0646 \u0645\u0637\u0648\u064A\u0629 \u2014 \u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u0648\u0633\u064A\u0639</span>
                                </div>
                                <div id="email-settings-modules-list" class="email-settings-modules-list"></div>
                            </div>
                        </div>

                        <div class="email-settings-sticky-bar" id="email-settings-sticky-bar">
                            <span class="email-settings-dirty" id="email-settings-dirty-hint" hidden>\u062A\u0648\u062C\u062F \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629</span>
                            <div class="email-settings-sticky-actions">
                                <button type="button" id="email-settings-reload-btn" class="btn-secondary">
                                    <i class="fas fa-sync ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644
                                </button>
                                <button type="button" id="email-settings-save-btn" class="btn-primary email-settings-save-glow">
                                    <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `:`
                <div class="settings-group mt-6">
                    <div class="email-settings-locked">
                        <i class="fas fa-lock"></i>
                        <p>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637.</p>
                    </div>
                </div>
                `}
            </div>

            <!-- Tab Content: \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0648 Q&A -->
            <div class="tab-content" id="tab-help-content">
                ${t?`
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-circle-question text-teal-600 ml-2"></i>
                            \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0648\u0623\u0633\u0626\u0644\u0629 \u0648\u0623\u062C\u0648\u0628\u0629 (Q&amp;A)
                        </h2>
                        <p class="settings-group-subtitle">\u062A\u062E\u0635\u064A\u0635 \u0646\u0635 \u0627\u0644\u0645\u0642\u062F\u0645\u0629 \u0648\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u2014 \u0645\u0639 \u0628\u0642\u0627\u0621 \u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0627\u064B</p>
                    </div>
                    <div class="settings-group-content space-y-4">
                        <div class="content-card">
                            <div class="card-body space-y-4">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" id="help-content-enabled" class="rounded border-gray-300 text-teal-600">
                                    <span class="text-sm font-semibold text-gray-800">\u062A\u0641\u0639\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u062E\u0635\u0635</span>
                                </label>
                                <p class="text-xs text-gray-500">\u0639\u0646\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644: \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0623\u062F\u0646\u0627\u0647 (\u0625\u0646 \u0648\u064F\u062C\u062F\u062A) \u0648\u0646\u0635 \u0627\u0644\u0645\u0642\u062F\u0645\u0629. \u0625\u0646 \u0644\u0645 \u062A\u064F\u0636\u0641 \u0623\u0633\u0626\u0644\u0629\u060C \u064A\u0628\u0642\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.</p>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">\u0646\u0635 \u0645\u0642\u062F\u0645\u0629 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                                    <textarea id="help-content-intro" class="form-input" rows="3" maxlength="500" placeholder="\u0646\u0635 \u064A\u0638\u0647\u0631 \u0623\u0639\u0644\u0649 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-comments ml-2"></i>\u0623\u0633\u0626\u0644\u0629 \u0648\u0623\u062C\u0648\u0628\u0629 \u0645\u062E\u0635\u0635\u0629</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div id="help-content-qa-list" class="space-y-3"></div>
                                <button type="button" id="help-content-add-qa-btn" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644
                                </button>
                                <div id="help-content-qa-form" class="hidden mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                                    <h3 class="font-semibold text-gray-800" id="help-content-qa-form-title">\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F</h3>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0633\u0624\u0627\u0644</label>
                                        <input type="text" id="help-content-qa-question" class="form-input" maxlength="300" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0633\u0624\u0627\u0644...">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u0625\u062C\u0627\u0628\u0629</label>
                                        <textarea id="help-content-qa-answer" class="form-input" rows="4" maxlength="3000" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062C\u0627\u0628\u0629..."></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1">\u0631\u0628\u0637 \u0628\u0645\u0648\u062F\u064A\u0648\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u2014 slug \u0645\u062B\u0644 clinic)</label>
                                        <input type="text" id="help-content-qa-module" class="form-input" maxlength="80" placeholder="\u0645\u062B\u0627\u0644: clinic \u0623\u0648 profile">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1">\u0643\u0644\u0645\u0627\u062A \u0628\u062D\u062B (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                                        <input type="text" id="help-content-qa-keywords" class="form-input" maxlength="200" placeholder="\u0643\u0644\u0645\u0627\u062A \u0644\u0644\u0628\u062D\u062B \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629">
                                    </div>
                                    <label class="flex items-center gap-2">
                                        <input type="checkbox" id="help-content-qa-active" class="rounded border-gray-300 text-teal-600" checked>
                                        <span class="text-sm text-gray-700">\u0645\u0641\u0639\u0651\u0644</span>
                                    </label>
                                    <div class="flex gap-2">
                                        <button type="button" id="help-content-qa-save-btn" class="btn-primary"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0633\u0624\u0627\u0644</button>
                                        <button type="button" id="help-content-qa-cancel-btn" class="btn-secondary"><i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621</button>
                                    </div>
                                </div>
                                <div class="flex flex-wrap gap-2 pt-2 border-t">
                                    <button type="button" id="help-content-save-all-btn" class="btn-success">
                                        <i class="fas fa-cloud-upload-alt ml-2"></i>\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629
                                    </button>
                                    <button type="button" id="help-content-load-defaults-btn" class="btn-secondary" title="\u0646\u0633\u062E \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u062A\u062D\u0631\u064A\u0631">
                                        <i class="fas fa-copy ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u062A\u062D\u0631\u064A\u0631
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `:'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A -->
            <div class="tab-content" id="tab-permissions">
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-shield-alt text-orange-600 ml-2"></i>
                            \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u062F\u0648\u0627\u0626\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-shield-alt ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                                    <p class="text-sm text-blue-800 mb-2">
                                        <i class="fas fa-info-circle ml-2"></i>
                                        <strong>\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0647\u0645\u0629:</strong>
                                    </p>
                                    <ul class="text-sm text-blue-700 list-disc mr-6 space-y-1">
                                        <li>\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0642\u0633\u0645 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062D\u0638\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0639\u0627\u062F\u064A\u064A\u0646</li>
                                        <li>\u0641\u0642\u0637 \u0627\u0644\u0645\u062F\u064A\u0631\u0648\u0646 \u0648\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0648\u0646 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645 \u064A\u0645\u0643\u0646\u0647\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</li>
                                        <li>\u064A\u0645\u0643\u0646 \u0625\u062F\u0627\u0631\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0645\u0646 \u0642\u0633\u0645 "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" \u0639\u0646\u062F \u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645</li>
                                        <li>\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629: \u0627\u0644\u0645\u062F\u064A\u0631\u0648\u0646 \u0641\u0642\u0637 \u064A\u0645\u0643\u0646\u0647\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</li>
                                    </ul>
                                </div>
                                
                                <div class="border rounded p-4">
                                    <h3 class="text-lg font-semibold mb-4">
                                        <i class="fas fa-users-cog ml-2"></i>
                                        \u0645\u0646 \u064A\u0645\u0643\u0646\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                                    </h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div class="flex items-center">
                                                <i class="fas fa-user-shield text-blue-600 ml-3"></i>
                                                <span class="font-semibold">\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (Admin)</span>
                                            </div>
                                            <span class="badge badge-success">\u0635\u0644\u0627\u062D\u064A\u0629 \u0643\u0627\u0645\u0644\u0629</span>
                                        </div>
                                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div class="flex items-center">
                                                <i class="fas fa-user-check text-green-600 ml-3"></i>
                                                <span class="font-semibold">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0645\u0635\u0631\u062D \u0644\u0647\u0645</span>
                                            </div>
                                            <span class="badge badge-info">\u062D\u0633\u0628 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A</span>
                                        </div>
                                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div class="flex items-center">
                                                <i class="fas fa-user-times text-red-600 ml-3"></i>
                                                <span class="font-semibold">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0639\u0627\u062F\u064A\u0648\u0646</span>
                                            </div>
                                            <span class="badge badge-warning">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="border-t pt-4 mt-4">
                                    <h3 class="text-lg font-semibold mb-4">
                                        <i class="fas fa-key ml-2"></i>
                                        \u0643\u064A\u0641\u064A\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                                    </h3>
                                    <div class="space-y-2 text-sm text-gray-700">
                                        <p class="flex items-start">
                                            <i class="fas fa-check-circle text-green-600 ml-2 mt-1"></i>
                                            <span>\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0642\u0633\u0645 "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629</span>
                                        </p>
                                        <p class="flex items-start">
                                            <i class="fas fa-check-circle text-green-600 ml-2 mt-1"></i>
                                            <span>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F" \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0648\u062C\u0648\u062F \u0644\u0644\u062A\u062D\u0631\u064A\u0631</span>
                                        </p>
                                        <p class="flex items-start">
                                            <i class="fas fa-check-circle text-green-600 ml-2 mt-1"></i>
                                            <span>\u0641\u064A \u0642\u0633\u0645 "\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A"\u060C \u062D\u062F\u062F "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A" \u0644\u0625\u0639\u0637\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644</span>
                                        </p>
                                        <p class="flex items-start">
                                            <i class="fas fa-check-circle text-green-600 ml-2 mt-1"></i>
                                            <span>\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0644\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="border-t pt-4 mt-4">
                                    <h3 class="text-lg font-semibold mb-4">
                                        <i class="fas fa-list-check ml-2"></i>
                                        \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                                    </h3>
                                    <div id="users-permissions-list" class="space-y-2">
                                        ${this.renderUsersPermissionsList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A -->
            <div class="tab-content" id="tab-approval-circuit">
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-project-diagram text-orange-600 ml-2"></i>
                            \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0627\u0626\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header flex items-center justify-between">
                                <h2 class="card-title">
                                    <i class="fas fa-project-diagram ml-2"></i>
                                    \u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                                </h2>
                                <span class="badge badge-info" id="approval-circuit-active-label" style="display:none;"></span>
                            </div>
                            <div class="card-body space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-user-circle ml-2"></i>
                                            \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645
                                        </label>
                                        <select id="approval-owner-select" class="form-input">
                                            ${this.renderApprovalOwnerOptions()}
                                        </select>
                                        <p class="text-xs text-gray-500 mt-1">
                                            <i class="fas fa-info-circle ml-1"></i>
                                            \u0641\u064A \u062D\u0627\u0644 \u0639\u062F\u0645 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u0627\u0631 \u062E\u0627\u0635 \u0628\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A.
                                        </p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-signature ml-2"></i>
                                            \u0627\u0633\u0645 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                                        </label>
                                        <input type="text" id="approval-circuit-name" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">
                                        <p class="text-xs text-gray-500 mt-1">
                                            \u064A\u0638\u0647\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0644\u0644\u062A\u0633\u0647\u064A\u0644 \u0639\u0646\u062F \u0625\u062F\u0627\u0631\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F.
                                        </p>
                                    </div>
                                </div>

                                <div id="approval-steps-container" class="space-y-4">
                                    ${this.renderApprovalStepsPlaceholder()}
                                </div>

                                <div class="flex flex-wrap items-center gap-3">
                                    <button type="button" id="add-approval-step-btn" class="btn-secondary">
                                        <i class="fas fa-plus ml-2"></i>
                                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F
                                    </button>
                                    <span class="text-xs text-gray-500">
                                        \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0646 \u0639\u0646 \u0643\u0644 \u0645\u0633\u062A\u0648\u0649.
                                    </span>
                                </div>

                                <div class="flex items-center justify-end gap-3 border-t pt-4">
                                    <button type="button" id="delete-approval-circuit-btn" class="btn-secondary">
                                        <i class="fas fa-trash ml-2"></i>
                                        \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u0627\u0631
                                    </button>
                                    <button type="button" id="save-approval-circuit-btn" class="btn-primary">
                                        <i class="fas fa-save ml-2"></i>
                                        \u062D\u0641\u0638 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 -->
            <div class="tab-content" id="tab-logs">
                ${t?`
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-history text-indigo-600 ml-2"></i>
                            \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629
                        </h2>
                        <p class="settings-group-subtitle">\u0639\u0631\u0636 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0646\u0634\u0627\u0637\u0627\u062A \u0648\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-history ml-2"></i>
                                    \u0633\u062C\u0644 \u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                                </h2>
                            </div>
                            <div class="card-body">
                                <p class="text-sm text-gray-600 mb-4">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u0639\u0631\u0636 \u0633\u062C\u0644 \u0643\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631.
                                </p>
                                <button type="button" id="view-activity-log-btn" class="btn-primary w-full">
                                    <i class="fas fa-history ml-2"></i>
                                    \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0646\u0634\u0627\u0637
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- \u2705 \u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 -->
                    <div class="settings-group-content mt-4">
                        <div class="content-card" style="border: 1px solid rgba(15,118,110,0.18);">
                            <div class="card-header" style="background: linear-gradient(135deg, rgba(15,118,110,0.08), rgba(30,58,138,0.06)); border-bottom: 1px solid rgba(15,118,110,0.18);">
                                <h2 class="card-title" style="color: #0F766E;">
                                    <i class="fas fa-code-branch ml-2"></i>
                                    \u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                                </h2>
                            </div>
                            <div class="card-body">
                                <p class="text-sm text-gray-600 mb-4">
                                    <i class="fas fa-info-circle ml-2 text-teal-600"></i>
                                    \u0645\u0639\u0631\u0641\u0629 \u0623\u064A \u0625\u0635\u062F\u0627\u0631 \u0645\u0646 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u064A\u0639\u0645\u0644 \u0639\u0644\u064A\u0647 \u0643\u0644 \u0645\u0633\u062A\u062E\u062F\u0645\u060C \u0622\u062E\u0631 \u0645\u0631\u0629 \u0641\u062A\u062D \u0641\u064A\u0647\u0627 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u060C
                                    \u0648\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0646 \u0627\u0644\u062C\u0645\u064A\u0639 \u064A\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0623\u062D\u062F\u062B.
                                </p>
                                <button type="button" id="view-user-versions-btn" class="btn-primary w-full" style="background: linear-gradient(135deg, #0F766E, #1E3A8A);">
                                    <i class="fas fa-code-branch ml-2"></i>
                                    \u0641\u062A\u062D \u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- \u2705 \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 -->
                    <div class="settings-group-content mt-4">
                        <div class="content-card" style="border: 1px solid rgba(185,28,28,0.22);">
                            <div class="card-header" style="background: linear-gradient(135deg, rgba(185,28,28,0.08), rgba(127,29,29,0.06)); border-bottom: 1px solid rgba(185,28,28,0.18);">
                                <h2 class="card-title" style="color: #b91c1c;">
                                    <i class="fas fa-bug ml-2"></i>
                                    \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
                                </h2>
                            </div>
                            <div class="card-body">
                                <p class="text-sm text-gray-600 mb-4">
                                    <i class="fas fa-info-circle ml-2 text-red-600"></i>
                                    \u062A\u0633\u062C\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062E\u0637\u0623 \u0627\u0644\u0638\u0627\u0647\u0631\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0628\u0627\u0634\u0631\u0629\u060C \u0648\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062E\u0637\u0623 \u0625\u0644\u0649 \u0628\u0644\u0627\u063A \u0645\u0634\u0643\u0644\u0629.
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <button type="button" id="view-client-errors-btn" class="btn-primary w-full" style="background: linear-gradient(135deg, #b91c1c, #7f1d1d);">
                                        <i class="fas fa-bug ml-2"></i>
                                        \u0641\u062A\u062D \u0644\u0648\u062D\u0629 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621
                                    </button>
                                    <button type="button" id="open-client-errors-section-btn" class="btn-secondary w-full">
                                        <i class="fas fa-broadcast-tower ml-2"></i>
                                        \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u0628\u0627\u0634\u0631
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `:'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>
        `,this.setupEventListeners(),setTimeout(()=>{this.setupTabsNavigation();const s=document.getElementById("users-permissions-list");s&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:a=>{try{const i=document.createElement("i");i.className="fas fa-user text-gray-600",a.replaceWith(i)}catch{}}})},0),typeof Permissions<"u"&&typeof Permissions.initFormSettingsState=="function"&&Promise.resolve().then(async()=>{try{await Permissions.initFormSettingsState(),t&&document.getElementById("form-settings-card")&&(typeof Permissions.refreshFormSettingsUI=="function"&&Permissions.refreshFormSettingsUI(),typeof Permissions.bindFormSettingsEvents=="function"&&await Permissions.bindFormSettingsEvents())}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0647\u064A\u0626\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s)}}),t&&typeof Permissions<"u"){let s=0;const a=15,i=setInterval(()=>{s++;const o=document.getElementById("form-settings-card");if(o||s>=a)if(clearInterval(i),o&&!Permissions._formSettingsBindDone){Permissions._formSettingsBindDone=!0;try{typeof Permissions.bindFormSettingsEvents=="function"&&(Permissions.bindFormSettingsEvents(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C"))}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",n)}}else!o&&s>=a&&Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 form-settings-card \u0628\u0639\u062F "+a+" \u0645\u062D\u0627\u0648\u0644\u0629")},100)}}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",t),e&&(e.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Settings.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `)}}},isCurrentUserAdmin(){if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0631 Permissions.isCurrentUserAdmin:",s)}if(typeof Permissions?.isCurrentUserEffectiveAdmin=="function")try{return Permissions.isCurrentUserEffectiveAdmin()}catch{}const e=AppState?.currentUser||(typeof GoogleIntegration<"u"&&GoogleIntegration.resolveCurrentUser?GoogleIntegration.resolveCurrentUser():null);if(!e)return!0;const t=String(e.role||"").toLowerCase().trim();return t==="admin"||t==="administrator"||t==="system_admin"||t==="system-manager"||t==="\u0645\u062F\u064A\u0631"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.isAdmin===!0||!t},renderSystemVersionCard(){const e=typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion).trim():"\u2014",t=typeof I18n<"u"&&I18n.currentLang==="en"||document.documentElement.lang==="en",s=e==="\u2014"?e:t?`Version${e}`:`V.${e}`;return`
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-code-branch ml-2"></i>\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0646\u0638\u0627\u0645</h2>
                </div>
                <div class="card-body space-y-3">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        \u064A\u0639\u0631\u0636 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A \u0627\u0644\u0645\u062B\u0628\u0651\u062A \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643. \u0639\u0646\u062F \u0646\u0634\u0631 \u062A\u062D\u062F\u064A\u062B \u062C\u062F\u064A\u062F \u0633\u064A\u0638\u0647\u0631 \u0625\u0634\u0639\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A \u0628\u0639\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.
                    </p>
                    <div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px;">
                        <div style="padding:10px 14px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0;">
                            <span style="font-size:0.75rem;color:#64748b;font-weight:600;display:block;margin-bottom:4px;">\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A</span>
                            <strong id="settings-app-version-value" dir="ltr" style="font-size:1.15rem;color:#0f766e;">${Utils.escapeHTML(s)}</strong>
                        </div>
                        <button type="button" id="settings-check-app-update-btn" class="btn-secondary btn-sm" style="align-self:flex-end;">
                            <i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A
                        </button>
                    </div>
                </div>
            </div>`},renderUserPhotoMigrationCard(){return`
            <div class="content-card mt-6" id="user-photo-migration-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-images ml-2"></i>\u062A\u0631\u062D\u064A\u0644 \u0635\u0648\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0625\u0644\u0649 SQL</h2>
                </div>
                <div class="card-body space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        \u064A\u062D\u0648\u0651\u0644 \u0635\u0648\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0631\u0648\u0627\u0628\u0637 Drive \u0623\u0648 base64 \u0627\u0644\u0645\u0636\u0645\u0651\u0646 \u0625\u0644\u0649 \u0645\u0631\u0627\u062C\u0639 <code dir="ltr">FILE_*</code> \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A.
                        \u0627\u0644\u062A\u0631\u062D\u064A\u0644 \u064A\u0639\u0645\u0644 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629 (\u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0643\u0644 \u062B\u0627\u0646\u064A\u0629 \u062A\u0642\u0631\u064A\u0628\u0627\u064B) \u0648\u064A\u0645\u0643\u0646 \u0625\u064A\u0642\u0627\u0641\u0647 \u0641\u064A \u0623\u064A \u0648\u0642\u062A.
                    </p>
                    <div id="user-photo-migration-stats" class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"></div>
                    <div class="user-photo-migration-track" style="width:100%;height:8px;max-height:8px;border-radius:999px;background:#e5e7eb;overflow:hidden;">
                        <div id="user-photo-migration-progress-bar" style="width:0%;height:8px;max-height:8px;border-radius:999px;background:#0d9488;transition:width .3s ease;"></div>
                    </div>
                    <p id="user-photo-migration-status" class="text-sm text-gray-700">\u062C\u0627\u0647\u0632 \u0644\u0644\u062A\u0631\u062D\u064A\u0644.</p>
                    <div class="flex flex-wrap items-center gap-2">
                        <button type="button" id="user-photo-migration-start-btn" class="btn-primary">
                            <i class="fas fa-play ml-2"></i>\u0628\u062F\u0621 \u0627\u0644\u062A\u0631\u062D\u064A\u0644
                        </button>
                        <button type="button" id="user-photo-migration-stop-btn" class="btn-secondary" disabled>
                            <i class="fas fa-stop ml-2"></i>\u0625\u064A\u0642\u0627\u0641
                        </button>
                        <button type="button" id="user-photo-migration-refresh-btn" class="btn-secondary btn-sm">
                            <i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062D\u0635\u0627\u0621
                        </button>
                    </div>
                    <div id="user-photo-migration-log" class="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto" style="display:none;"></div>
                </div>
            </div>
        `},refreshUserPhotoMigrationStats(){const e=document.getElementById("user-photo-migration-stats");if(!e)return;const t=typeof Users<"u"&&typeof Users.getUserPhotoMigrationStats=="function"?Users.getUserPhotoMigrationStats():{total:0,linked:0,needsMigration:0,drive_url:0,inline_base64:0};e.innerHTML=`
            <div class="p-2 rounded bg-slate-50 border"><span class="text-gray-500 block">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</span><strong>${t.total||0}</strong></div>
            <div class="p-2 rounded bg-green-50 border border-green-100"><span class="text-gray-500 block">\u0645\u0631\u0628\u0648\u0637\u0629 FILE_*</span><strong>${t.linked||0}</strong></div>
            <div class="p-2 rounded bg-amber-50 border border-amber-100"><span class="text-gray-500 block">\u062A\u062D\u062A\u0627\u062C \u062A\u0631\u062D\u064A\u0644</span><strong>${t.needsMigration||0}</strong></div>
            <div class="p-2 rounded bg-blue-50 border border-blue-100"><span class="text-gray-500 block">Drive / base64</span><strong>${(t.drive_url||0)+(t.inline_base64||0)}</strong></div>
        `;const s=document.getElementById("user-photo-migration-status");s&&!(typeof Users<"u"&&Users._photoMigrationRunning)&&(s.textContent=(t.needsMigration||0)>0?`\u064A\u0648\u062C\u062F ${t.needsMigration} \u0635\u0648\u0631\u0629 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0631\u062D\u064A\u0644.`:"\u0643\u0644 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0645\u0631\u0628\u0648\u0637\u0629 \u0623\u0648 \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631 \u0644\u0644\u062A\u0631\u062D\u064A\u0644.")},bindUserPhotoMigrationEvents(){if(!this.isCurrentUserAdmin())return;this.refreshUserPhotoMigrationStats();const e=document.getElementById("user-photo-migration-start-btn"),t=document.getElementById("user-photo-migration-stop-btn"),s=document.getElementById("user-photo-migration-refresh-btn"),a=document.getElementById("user-photo-migration-progress-bar"),i=document.getElementById("user-photo-migration-status"),o=document.getElementById("user-photo-migration-log");s&&!s.dataset.bound&&(s.dataset.bound="1",s.addEventListener("click",()=>this.refreshUserPhotoMigrationStats())),t&&!t.dataset.bound&&(t.dataset.bound="1",t.addEventListener("click",()=>{typeof Users<"u"&&typeof Users.stopUserPhotoMigration=="function"&&Users.stopUserPhotoMigration(),t.disabled=!0,i&&(i.textContent="\u062C\u0627\u0631\u064A \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0631\u062D\u064A\u0644 \u0628\u0639\u062F \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629...")})),e&&!e.dataset.bound&&(e.dataset.bound="1",e.addEventListener("click",async()=>{if(typeof Users>"u"||typeof Users.migrateAllUserPhotosToFileRefs!="function"){Notification.error("\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D.");return}const n=Users.getUserPhotoMigrationStats();if(!n.needsMigration){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631 \u062A\u062D\u062A\u0627\u062C \u062A\u0631\u062D\u064A\u0644.");return}if(!confirm(`\u0633\u064A\u062A\u0645 \u062A\u0631\u062D\u064A\u0644 ${n.needsMigration} \u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629.
\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`))return;e.disabled=!0,t&&(t.disabled=!1),o&&(o.style.display="block",o.innerHTML="");const l=m=>{if(!o)return;const p=document.createElement("div");p.textContent=m,o.appendChild(p),o.scrollTop=o.scrollHeight},r=await Users.migrateAllUserPhotosToFileRefs({onProgress:m=>{const p=m.total?Math.round(m.processed/m.total*100):0;a&&(a.style.width=p+"%"),i&&(i.textContent=`\u0627\u0644\u062A\u0642\u062F\u0645: ${m.processed}/${m.total} \u2014 \u0646\u062C\u062D ${m.ok} \u2014 Drive \u062E\u0627\u0635 ${m.drive_private} \u2014 \u0641\u0634\u0644 ${m.failed}`),m.current&&l(`${m.index}/${m.total} \u2014 ${m.current.name||m.current.email||m.current.id}: ${m.details[m.details.length-1]?.message||""}`)}});e.disabled=!1,t&&(t.disabled=!0),a&&(a.style.width="100%");const d=r?.report||{};i&&(i.textContent=r?.aborted?`\u062A\u0645 \u0627\u0644\u0625\u064A\u0642\u0627\u0641 \u2014 \u0646\u062C\u062D ${d.ok||0} \u0645\u0646 ${d.processed||0}.`:`\u0627\u0643\u062A\u0645\u0644 \u2014 \u0646\u062C\u062D ${d.ok||0} \u2014 Drive \u062E\u0627\u0635 ${d.drive_private||0} \u2014 \u0641\u0634\u0644 ${d.failed||0}.`),this.refreshUserPhotoMigrationStats(),d.ok>0?Notification.success(`\u062A\u0645 \u062A\u0631\u062D\u064A\u0644 ${d.ok} \u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D.`):(d.drive_private||0)>0?Notification.warning("\u0628\u0639\u0636 \u0635\u0648\u0631 Drive \u062E\u0627\u0635\u0629 \u2014 \u064A\u064F\u0639\u0627\u062F \u0631\u0641\u0639\u0647\u0627 \u064A\u062F\u0648\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A."):Notification.info("\u0644\u0645 \u064A\u064F\u0631\u062D\u0651\u064E\u0644 \u0623\u064A \u0645\u0644\u0641 \u062C\u062F\u064A\u062F.")}))},renderDataArchivingCard(){return`
            <div class="content-card mt-6" id="data-retention-archiving-card">
                <div class="card-header flex justify-between items-center" style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(180, 83, 9, 0.04));">
                    <h2 class="card-title text-amber-700">
                        <i class="fas fa-archive ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0648\u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (Data Archiving & Retention)
                    </h2>
                    <span class="badge" style="background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 0.75rem;">
                        <i class="fas fa-user-shield ml-1"></i> \u0645\u062E\u0635\u0635 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637
                    </span>
                </div>
                <div class="card-body space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        \u0646\u0638\u0627\u0645 \u0623\u0631\u0634\u0641\u0629 \u0630\u0643\u064A \u0644\u0646\u0642\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629 (\u0633\u0646\u062A\u064A\u0646 \u0641\u0623\u0643\u062B\u0631) \u0625\u0644\u0649 \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u062A\u0633\u0631\u064A\u0639 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0648\u062A\u0642\u0644\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0630\u0627\u0643\u0631\u0629\u060C \u0645\u0639 \u0636\u0645\u0627\u0646 \u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0648\u0639\u062F\u0645 \u0641\u0642\u062F\u0627\u0646 \u0623\u064A \u0633\u062C\u0644.
                    </p>

                    <!-- \u062E\u064A\u0627\u0631\u0627\u062A \u0641\u062A\u0631\u0629 \u0627\u0644\u0627\u0633\u062A\u0628\u0642\u0627\u0621 -->
                    <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-3">
                            <label class="text-sm font-bold text-gray-700">
                                <i class="fas fa-clock text-amber-600 ml-1"></i>
                                \u0641\u062A\u0631\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629 (\u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638):
                            </label>
                            <select id="archive-retention-period-select" class="form-input text-sm font-semibold" style="width: auto; min-width: 180px;">
                                <option value="2" selected>\u0622\u062E\u0631 \u0633\u0646\u062A\u064A\u0646 (\u0645\u0648\u0635\u0649 \u0628\u0647)</option>
                                <option value="1">\u0622\u062E\u0631 \u0633\u0646\u0629 \u0648\u0627\u062D\u062F\u0629</option>
                                <option value="3">\u0622\u062E\u0631 3 \u0633\u0646\u0648\u0627\u062A</option>
                                <option value="custom">\u062A\u0627\u0631\u064A\u062E \u0645\u062E\u0635\u0635...</option>
                            </select>
                            <input type="date" id="archive-custom-cutoff-date" class="form-input text-sm" style="display: none; width: auto;" />
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" id="archive-check-status-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-search ml-1"></i> \u0641\u062D\u0635 \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A
                            </button>
                            <button type="button" id="archive-show-history-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-history ml-1"></i> \u0633\u062C\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A
                            </button>
                        </div>
                    </div>

                    <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
                    <div id="archive-stats-strip" class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <span class="text-xs text-gray-500 block mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629</span>
                            <strong id="archive-total-active" class="text-lg text-slate-800 font-mono">\u2014</strong>
                        </div>
                        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <span class="text-xs text-amber-700 block mb-1">\u0645\u0624\u0647\u0644\u0629 \u0644\u0644\u0623\u0631\u0634\u0641\u0629 (\u0627\u0644\u0642\u062F\u064A\u0645\u0629)</span>
                            <strong id="archive-total-eligible" class="text-lg text-amber-800 font-mono">\u2014</strong>
                        </div>
                        <div class="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <span class="text-xs text-blue-700 block mb-1">\u0645\u0624\u0631\u0634\u0641\u0629 \u062D\u0627\u0644\u064A\u0627\u064B \u0628\u0627\u0644\u0623\u0631\u0634\u064A\u0641</span>
                            <strong id="archive-total-archived" class="text-lg text-blue-800 font-mono">\u2014</strong>
                        </div>
                        <div class="p-3 rounded-lg bg-purple-50 border border-purple-200">
                            <span class="text-xs text-purple-700 block mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0642\u0637\u0639 \u0627\u0644\u0645\u062D\u0633\u0648\u0628</span>
                            <strong id="archive-calculated-cutoff" class="text-sm text-purple-900 font-mono">\u2014</strong>
                        </div>
                    </div>

                    <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u0634\u0645\u0648\u0644\u0629 -->
                    <div class="border border-gray-200 rounded-lg overflow-hidden mt-3">
                        <div class="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 flex justify-between items-center border-b border-gray-200">
                            <span>\u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u062E\u0627\u0636\u0639\u0629 \u0644\u0644\u0623\u0631\u0634\u0641\u0629</span>
                            <span id="archive-selected-summary" class="text-amber-700">7 \u0645\u062F\u064A\u0648\u0644\u0627\u062A \u0645\u062D\u062F\u062F\u0629</span>
                        </div>
                        <div id="archive-modules-table-container" class="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                            <div class="p-4 text-center text-sm text-gray-500">
                                \u0627\u0636\u063A\u0637 "\u0641\u062D\u0635 \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A" \u0644\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A
                            </div>
                        </div>
                    </div>

                    <!-- \u062A\u0646\u0628\u064A\u0647 \u0648\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 -->
                    <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div id="archive-status-message" class="text-sm text-gray-600">
                            \u062C\u0627\u0647\u0632 \u0644\u0644\u0641\u062D\u0635 \u0648\u0627\u0644\u0623\u0631\u0634\u0641\u0629.
                        </div>
                        <button type="button" id="archive-execute-btn" class="btn-primary" style="background: #d97706; border-color: #b45309;" disabled>
                            <i class="fas fa-file-archive ml-2"></i> \u0628\u062F\u0621 \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0648\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A
                        </button>
                    </div>

                    <!-- \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0633\u062C\u0644 / \u062A\u0642\u062F\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 -->
                    <div id="archive-execution-log" class="text-xs text-gray-700 bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-36 overflow-y-auto" style="display: none;"></div>
                </div>
            </div>
        `},_archiveLastStatusData:null,bindDataArchivingEvents(){if(!this.isCurrentUserAdmin())return;const e=document.getElementById("archive-retention-period-select"),t=document.getElementById("archive-custom-cutoff-date"),s=document.getElementById("archive-check-status-btn"),a=document.getElementById("archive-execute-btn"),i=document.getElementById("archive-show-history-btn");e&&!e.dataset.bound&&(e.dataset.bound="1",e.addEventListener("change",()=>{t&&(t.style.display=e.value==="custom"?"inline-block":"none"),this.refreshArchiveStatusUI(!1)})),t&&!t.dataset.bound&&(t.dataset.bound="1",t.addEventListener("change",()=>{this.refreshArchiveStatusUI(!1)})),s&&!s.dataset.bound&&(s.dataset.bound="1",s.addEventListener("click",()=>{this.refreshArchiveStatusUI(!0)})),i&&!i.dataset.bound&&(i.dataset.bound="1",i.addEventListener("click",()=>{this.showArchiveHistoryModal()})),a&&!a.dataset.bound&&(a.dataset.bound="1",a.addEventListener("click",()=>{this.executeDataArchivingFromUI()})),this.refreshArchiveStatusUI(!1)},async refreshArchiveStatusUI(e=!1){const t=document.getElementById("archive-retention-period-select"),s=document.getElementById("archive-custom-cutoff-date"),a=document.getElementById("archive-total-active"),i=document.getElementById("archive-total-eligible"),o=document.getElementById("archive-total-archived"),n=document.getElementById("archive-calculated-cutoff"),l=document.getElementById("archive-modules-table-container"),r=document.getElementById("archive-execute-btn"),d=document.getElementById("archive-status-message");if(!a)return;const m=t?t.value:"2",p=m==="custom"?2:Number(m||2),v=m==="custom"&&s?s.value:null;d&&(d.textContent="\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u062A\u062D\u0644\u064A\u0644 \u0641\u062A\u0631\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638...");try{const u=await GoogleIntegration.callAppsScriptRPC("getArchiveStatus",{retentionYears:p,customCutoffDate:v,actorUserData:AppState?.currentUser||null});if(!u||!u.success){d&&(d.textContent=u?.message||"\u0641\u0634\u0644 \u062C\u0644\u0628 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629.");return}if(this._archiveLastStatusData=u,a&&(a.textContent=(u.grandTotalActive||0).toLocaleString()),i&&(i.textContent=(u.grandTotalEligible||0).toLocaleString()),o&&(o.textContent=(u.grandTotalArchived||0).toLocaleString()),n&&(n.textContent=u.cutoffDate||"\u2014"),l&&u.modules){const E=Object.entries(u.modules).map(([C,S])=>{const h=(S.eligibleCount||0)>0;return`
                        <div class="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="archive-module-checkbox form-checkbox text-amber-600 rounded" value="${C}" checked />
                                <span class="font-bold text-gray-800">${Utils.escapeHTML(S.labelAr)}</span>
                                <span class="text-gray-400 font-mono">(${Utils.escapeHTML(S.table)})</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="text-gray-600">\u0646\u0634\u0637: <strong class="font-mono">${(S.activeCount||0).toLocaleString()}</strong></span>
                                <span class="${h?"text-amber-700 font-bold":"text-gray-400"}">
                                    \u0645\u0624\u0647\u0644 \u0644\u0644\u0623\u0631\u0634\u0641\u0629: <strong class="font-mono">${(S.eligibleCount||0).toLocaleString()}</strong>
                                </span>
                                <span class="text-blue-600">\u0645\u0624\u0631\u0634\u0641: <strong class="font-mono">${(S.archivedCount||0).toLocaleString()}</strong></span>
                            </div>
                        </div>
                    `}).join("");l.innerHTML=E}r&&(r.disabled=(u.grandTotalEligible||0)<=0),d&&(d.textContent=(u.grandTotalEligible||0)>0?`\u064A\u0648\u062C\u062F ${u.grandTotalEligible} \u0633\u062C\u0644 \u0645\u0624\u0647\u0644 \u0644\u0644\u0646\u0642\u0644 \u0625\u0644\u0649 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0628\u0623\u0645\u0627\u0646.`:"\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u062A\u0642\u0639 \u0636\u0645\u0646 \u0641\u062A\u0631\u0629 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0627\u0644\u0645\u062D\u062F\u062F\u0629."),e&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629 (\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0642\u0637\u0639: ${u.cutoffDate})`)}catch{d&&(d.textContent="\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062D\u0635 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}},async executeDataArchivingFromUI(){if(!this._archiveLastStatusData||(this._archiveLastStatusData.grandTotalEligible||0)<=0){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0624\u0647\u0644\u0629 \u0644\u0644\u0623\u0631\u0634\u0641\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}const t=Array.from(document.querySelectorAll(".archive-module-checkbox:checked")).map(r=>r.value);if(t.length===0){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062F\u064A\u0648\u0644 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0644\u0623\u0631\u0634\u0641\u0629.");return}const s=this._archiveLastStatusData.grandTotalEligible||0,a=this._archiveLastStatusData.cutoffDate,i=`\u062A\u0646\u0628\u064A\u0647 \u0623\u0645\u0646\u064A \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645:

\u0633\u064A\u062A\u0645 \u0623\u0631\u0634\u0641\u0629 \u0648\u0646\u0642\u0644 ${s} \u0633\u062C\u0644 \u0623\u0642\u062F\u0645 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E (${a}) \u0625\u0644\u0649 \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629.
\u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0645\u062D\u0644\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0642\u0628\u0644 \u0628\u062F\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.

\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0622\u0646\u061F`;if(!confirm(i))return;const o=document.getElementById("archive-execute-btn"),n=document.getElementById("archive-status-message"),l=document.getElementById("archive-execution-log");o&&(o.disabled=!0),n&&(n.textContent="\u062C\u0627\u0631\u064A \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0648\u0627\u0644\u0646\u0633\u062E \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0627\u0644\u0630\u0631\u064A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645..."),l&&(l.style.display="block",l.innerHTML='<p class="text-amber-700"><i class="fas fa-spinner fa-spin ml-1"></i> \u062C\u0627\u0631\u064A \u0646\u0642\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0625\u0644\u0649 \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641...</p>');try{const r=document.getElementById("archive-retention-period-select"),d=document.getElementById("archive-custom-cutoff-date"),m=r?r.value:"2",p=m==="custom"?2:Number(m||2),v=m==="custom"&&d?d.value:null,u=await GoogleIntegration.callAppsScriptRPC("executeDataArchiving",{retentionYears:p,customCutoffDate:v,selectedModules:t,actorUserData:AppState?.currentUser||null});u&&u.success?(l&&(l.innerHTML=`
                        <div class="text-green-700 font-bold mb-1">
                            <i class="fas fa-check-circle ml-1"></i> ${Utils.escapeHTML(u.message)}
                        </div>
                        <div class="text-slate-600">
                            \u2022 \u0643\u0648\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0629: <code class="font-mono">${u.executionId}</code><br/>
                            \u2022 \u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0646\u0642\u0648\u0644\u0629: <strong>${u.totalRecordsArchived}</strong><br/>
                            \u2022 \u0645\u0644\u0641 \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629: <code class="font-mono">${u.backupFileName}</code><br/>
                            \u2022 \u0627\u0633\u062A\u063A\u0631\u0642 \u0627\u0644\u062A\u0646\u0641\u064A\u0630: ${u.durationMs}ms
                        </div>
                    `),Notification.success(`\u062A\u0645\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u062A\u0641\u0631\u064A\u063A \u0645\u0633\u0627\u062D\u0629 ${u.totalRecordsArchived} \u0633\u062C\u0644 \u0646\u0634\u0637.`),await this.refreshArchiveStatusUI(!1)):(l&&(l.innerHTML=`<p class="text-red-600"><i class="fas fa-exclamation-triangle ml-1"></i> ${Utils.escapeHTML(u?.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629")}</p>`),Notification.error(u?.message||"\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0623\u0631\u0634\u0641\u0629."))}catch(r){Notification.error(`\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0641\u064A\u0630: ${r.message}`)}finally{o&&(o.disabled=!1)}},showArchiveHistoryModal(){const e=this._archiveLastStatusData?.recentLogs||[],s=`
            <div id="archive-history-modal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
                    <div class="flex justify-between items-center border-b pb-3">
                        <h3 class="font-bold text-base text-gray-800 flex items-center">
                            <i class="fas fa-history text-amber-600 ml-2"></i> \u0633\u062C\u0644 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629
                        </h3>
                        <button type="button" onclick="document.getElementById('archive-history-modal').remove()" class="text-gray-400 hover:text-gray-600 text-lg">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        ${e.length===0?'<p class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0623\u0631\u0634\u0641\u0629 \u0633\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629.</p>':`
                <div class="overflow-x-auto">
                    <table class="w-full text-xs text-right border-collapse">
                        <thead>
                            <tr class="bg-gray-100 text-gray-700 font-bold border-b">
                                <th class="p-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                <th class="p-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0642\u0637\u0639</th>
                                <th class="p-2">\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0624\u0631\u0634\u0641\u0629</th>
                                <th class="p-2">\u0627\u0644\u0645\u0646\u0641\u0630</th>
                                <th class="p-2">\u0645\u0644\u0641 \u0627\u0644\u0646\u0633\u062E\u0629</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${e.map(i=>`
                                <tr>
                                    <td class="p-2 font-mono">${Utils.escapeHTML((i.executedAt||"").slice(0,19).replace("T"," "))}</td>
                                    <td class="p-2 font-mono text-amber-700">${Utils.escapeHTML(i.cutoffDate||"")}</td>
                                    <td class="p-2 font-bold text-green-700 font-mono">${Number(i.totalArchivedCount||0).toLocaleString()}</td>
                                    <td class="p-2">${Utils.escapeHTML(i.executedByEmail||"admin")}</td>
                                    <td class="p-2 font-mono text-gray-500 text-[10px]">${Utils.escapeHTML(i.backupFileName||"\u2014")}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            `}
                    </div>
                    <div class="pt-3 border-t flex justify-end">
                        <button type="button" onclick="document.getElementById('archive-history-modal').remove()" class="btn-secondary btn-sm">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            </div>
        `,a=document.getElementById("archive-history-modal");a&&a.remove(),document.body.insertAdjacentHTML("beforeend",s)},renderEmergencyContactsCard(){return`
            <div class="content-card mt-6" id="card-hse-emergency-contacts">
                <div class="card-header flex justify-between items-center" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(185, 28, 28, 0.04));">
                    <h2 class="card-title text-red-600">
                        <i class="fas fa-phone-volume ml-2"></i>
                        \u0623\u0631\u0642\u0627\u0645 \u0648\u062E\u0637\u0648\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u0642\u0648\u0645\u064A\u0629 (One-Tap SOS)
                    </h2>
                    <span class="badge badge-success text-xs font-bold" style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 4px 8px; border-radius: 6px;">
                        <i class="fas fa-cloud ml-1"></i> \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062D\u0627\u0628\u064A\u0629 \u0645\u0639 HSE_Settings
                    </span>
                </div>
                <div class="card-body space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        \u064A\u062A\u0645 \u062A\u0639\u0645\u064A\u0645 \u0647\u0630\u0647 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0644\u0649 <strong>\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0648\u062D\u062F\u0629</strong> \u0648\u062C\u0645\u064A\u0639 \u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A \u0648\u0627\u0644\u062A\u0641\u062A\u064A\u0634 \u0648\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0632\u0648\u0627\u0631 \u0644\u0644\u0645\u0635\u0646\u0639. \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0647\u0646\u0627 \u064A\u064F\u062D\u0641\u0638 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0634\u064A\u062A <code>HSE_Settings</code> \u0628\u0627\u0644\u0633\u062D\u0627\u0628\u0629.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u{1F3E5} \u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 (\u0637\u0648\u0627\u0631\u0626 \u0648\u0625\u0633\u0639\u0627\u0641\u0627\u062A)</label>
                            <input type="tel" id="settings-clinic-phone" class="form-input font-mono" placeholder="01000000001" dir="ltr" />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u{1F6E1}\uFE0F \u063A\u0631\u0641\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (HSE)</label>
                            <input type="tel" id="settings-hse-phone" class="form-input font-mono" placeholder="01000000002" dir="ltr" />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u{1F692} \u0641\u0631\u064A\u0642 \u0645\u0643\u0627\u0641\u062D\u0629 \u0627\u0644\u062D\u0631\u064A\u0642</label>
                            <input type="tel" id="settings-fire-phone" class="form-input font-mono" placeholder="01000000003" dir="ltr" />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u{1F6C2} \u0623\u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u062D\u0631\u0627\u0633\u0627\u062A</label>
                            <input type="tel" id="settings-security-phone" class="form-input font-mono" placeholder="01000000004" dir="ltr" />
                        </div>
                    </div>

                    <div class="border-t border-gray-200 pt-4 mt-2">
                        <h3 class="text-xs font-bold text-gray-700 uppercase mb-3">
                            <i class="fas fa-tower-broadcast text-blue-500 ml-1"></i> \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u0642\u0648\u0645\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">\u{1F691} \u0627\u0644\u0625\u0633\u0639\u0627\u0641</label>
                                <input type="tel" id="settings-ambulance-phone" class="form-input font-mono" placeholder="123" dir="ltr" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">\u{1F525} \u0627\u0644\u0645\u0637\u0627\u0641\u0626</label>
                                <input type="tel" id="settings-natfire-phone" class="form-input font-mono" placeholder="180" dir="ltr" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">\u{1F694} \u0634\u0631\u0637\u0629 \u0627\u0644\u0646\u062C\u062F\u0629</label>
                                <input type="tel" id="settings-police-phone" class="form-input font-mono" placeholder="122" dir="ltr" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-2">
                        <button type="button" id="btn-save-emergency-contacts" class="btn-primary" style="background: linear-gradient(135deg, #1e40af, #2563eb);">
                            <i class="fas fa-cloud-arrow-up ml-2"></i>\u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0633\u062D\u0627\u0628\u064A\u0627\u064B
                        </button>
                    </div>
                </div>
            </div>`},async loadEmergencyContactsSettings(){try{const e=document.getElementById("settings-clinic-phone"),t=document.getElementById("settings-hse-phone"),s=document.getElementById("settings-fire-phone"),a=document.getElementById("settings-security-phone"),i=document.getElementById("settings-ambulance-phone"),o=document.getElementById("settings-natfire-phone"),n=document.getElementById("settings-police-phone");let l=null;try{const r=localStorage.getItem("HSE_EMERGENCY_CONTACTS_CACHE");r&&(l=JSON.parse(r))}catch{}if(l||(l={clinicPhone:"01000000001",hsePhone:"01000000002",firePhone:"01000000003",securityPhone:"01000000004",ambulancePhone:"123",nationalFirePhone:"180",policePhone:"122"}),e&&(e.value=l.clinicPhone||""),t&&(t.value=l.hsePhone||""),s&&(s.value=l.firePhone||""),a&&(a.value=l.securityPhone||""),i&&(i.value=l.ambulancePhone||"123"),o&&(o.value=l.nationalFirePhone||"180"),n&&(n.value=l.policePhone||"122"),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"){const r=await GoogleIntegration.sendRequest({action:"getHseEmergencyContacts"});if(r&&r.success&&r.contacts){l=r.contacts;try{localStorage.setItem("HSE_EMERGENCY_CONTACTS_CACHE",JSON.stringify(l))}catch{}e&&(e.value=l.clinicPhone||""),t&&(t.value=l.hsePhone||""),s&&(s.value=l.firePhone||""),a&&(a.value=l.securityPhone||""),i&&(i.value=l.ambulancePhone||"123"),o&&(o.value=l.nationalFirePhone||"180"),n&&(n.value=l.policePhone||"122")}}}catch{}},async saveEmergencyContactsSettings(){const e=document.getElementById("settings-clinic-phone"),t=document.getElementById("settings-hse-phone"),s=document.getElementById("settings-fire-phone"),a=document.getElementById("settings-security-phone"),i=document.getElementById("settings-ambulance-phone"),o=document.getElementById("settings-natfire-phone"),n=document.getElementById("settings-police-phone"),l=document.getElementById("btn-save-emergency-contacts"),r={clinicPhone:e?e.value.trim():"01000000001",hsePhone:t?t.value.trim():"01000000002",firePhone:s?s.value.trim():"01000000003",securityPhone:a?a.value.trim():"01000000004",ambulancePhone:i?i.value.trim():"123",nationalFirePhone:o?o.value.trim():"180",policePhone:n?n.value.trim():"122"};try{l&&(l.disabled=!0,l.innerHTML='<i class="fas fa-circle-notch fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638 \u0628\u0627\u0644\u0633\u062D\u0627\u0628\u0629...');try{localStorage.setItem("HSE_EMERGENCY_CONTACTS_CACHE",JSON.stringify(r))}catch{}if(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"){const d=await GoogleIntegration.sendRequest({action:"saveHseEmergencyContacts",data:{...r,adminPin:"2026",updatedBy:AppState&&AppState.currentUser&&(AppState.currentUser.name||AppState.currentUser.username)||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"}});if(d&&d.success)typeof Notification<"u"&&typeof Notification.success=="function"?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0628\u0646\u062C\u0627\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0634\u064A\u062A HSE_Settings"):alert("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0628\u0646\u062C\u0627\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0634\u064A\u062A HSE_Settings");else throw new Error(d&&d.message||"\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638")}else typeof Notification<"u"&&typeof Notification.success=="function"&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0645\u062D\u0644\u064A\u0627\u064B")}catch(d){typeof Notification<"u"&&typeof Notification.error=="function"?Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A: "+(d.message||d)):alert("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A: "+d.message)}finally{l&&(l.disabled=!1,l.innerHTML='<i class="fas fa-cloud-arrow-up ml-2"></i>\u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0633\u062D\u0627\u0628\u064A\u0627\u064B')}},setupTabsNavigation(){const e=document.querySelectorAll(".tab-btn"),t=document.querySelectorAll(".tab-content");e.forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-tab");e.forEach(n=>n.classList.remove("active")),t.forEach(n=>n.classList.remove("active")),a.classList.add("active");const o=document.getElementById(`tab-${i}`);o&&o.classList.add("active"),i==="form-settings"&&this.isCurrentUserAdmin()&&typeof Permissions<"u"&&(typeof Permissions.ensureFormSettingsState=="function"?Permissions.ensureFormSettingsState(!0).then(()=>{typeof Permissions.refreshFormSettingsUI=="function"&&Permissions.refreshFormSettingsUI(),typeof Permissions.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents()}).catch(n=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",n)}):typeof Permissions.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents().catch(n=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",n)})),i==="violation-types"&&typeof ViolationTypesManager<"u"&&(typeof ViolationTypesManager.ensureRemoteLoaded=="function"?ViolationTypesManager.ensureRemoteLoaded().then(()=>{this.refreshViolationTypesList()}):this.refreshViolationTypesList()),i==="system-settings"&&this.isCurrentUserAdmin()&&(this.loadEmergencyContactsSettings(),this.bindUserPhotoMigrationEvents(),this.bindDataArchivingEvents()),i==="help-content"&&this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),i==="notifications"&&this.isCurrentUserAdmin()&&this.ensureEmailSettingsLoaded(!1)})});const s=document.querySelector(".tab-content.active");if(s){const a=s.id.replace("tab-",""),i=document.querySelector(`.tab-btn[data-tab="${a}"]`);i&&(e.forEach(o=>o.classList.remove("active")),i.classList.add("active"))}else{const a=e[0];a&&a.click()}},setupEventListeners(){this.isCurrentUserAdmin()&&typeof BackupUI<"u"&&setTimeout(()=>{BackupUI.init()},500),setTimeout(()=>{const e=document.getElementById("google-settings-form");e&&e.addEventListener("submit",c=>this.handleSubmit(c));const t=document.getElementById("test-connection-btn");t&&t.addEventListener("click",()=>this.testConnection());const s=document.getElementById("sync-data-btn");s&&s.addEventListener("click",()=>GoogleIntegration.syncData({silent:!1,showLoader:!0,notifyOnSuccess:!0,notifyOnError:!0,includeUsersSheet:!0}));const a=document.getElementById("initialize-sheets-btn");a&&a.addEventListener("click",()=>Settings.initializeSheets());const i=document.getElementById("save-all-data-btn");i&&i.addEventListener("click",async()=>{confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u061F
\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0647\u0646\u0627\u0643.`)&&await GoogleIntegration.saveAllToSheets()});const o=document.getElementById("generate-incidents-report-btn");o&&o.addEventListener("click",()=>Settings.generateReport("incidents"));const n=document.getElementById("generate-training-report-btn");n&&n.addEventListener("click",()=>Settings.generateReport("training"));const l=document.getElementById("generate-ptw-report-btn");l&&l.addEventListener("click",()=>Settings.generateReport("ptw"));const r=document.getElementById("generate-full-report-btn");r&&r.addEventListener("click",()=>Settings.generateReport("full"));const d=document.getElementById("generate-monthly-safety-report-ar-btn"),m=document.getElementById("generate-monthly-safety-report-en-btn");d&&d.addEventListener("click",()=>Settings.generateMonthlySafetyReport("ar")),m&&m.addEventListener("click",()=>Settings.generateMonthlySafetyReport("en"));const p=document.getElementById("settings-check-app-update-btn");p&&p.addEventListener("click",async()=>{if(typeof UI<"u"&&typeof UI.updateAppVersionDisplay=="function"&&UI.updateAppVersionDisplay(),typeof UI<"u"&&typeof UI._checkServerVersion=="function"){p.disabled=!0;try{await UI._checkServerVersion(),typeof Notification<"u"&&Notification.info("\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A. \u0625\u0646 \u0648\u064F\u062C\u062F \u0625\u0635\u062F\u0627\u0631 \u0623\u062D\u062F\u062B \u0633\u064A\u0638\u0647\u0631 \u0625\u0634\u0639\u0627\u0631.")}finally{p.disabled=!1}}else typeof Notification<"u"&&Notification.info("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: "+(AppState.appVersion||"\u2014"))});const v=document.getElementById("upload-logo-btn"),u=document.getElementById("company-logo-input"),E=document.getElementById("remove-logo-btn");v&&u&&(v.addEventListener("click",()=>{u.click()}),u.addEventListener("change",async c=>{const g=c.target.files[0];if(!g)return;if(g.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}const f=new FileReader;f.onload=async I=>{let y=I.target.result;try{y=await Settings.compressLogo(y),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+y.length+" \u062D\u0631\u0641)")}catch(b){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",b)}if(AppState.companyLogo=y,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=y,localStorage.setItem("company_logo",y),localStorage.setItem("hse_company_logo",y),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const b=AppState.currentUser||{},x=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:y,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:b.email,name:b.name,role:b.role,permissions:b.permissions}});if(x&&x.success)Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),x.data&&typeof DataManager.applyCompanySettingsFromServer=="function"&&DataManager.applyCompanySettingsFromServer(x.data,{preserveLocalLogo:!0,updateUI:!0});else{const A=x?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",A),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+A)}}catch(b){const x=b?.message||b?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",b),Notification.error("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+x)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:y}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),Settings.load()},f.onerror=()=>{Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0635\u0648\u0631\u0629")},f.readAsDataURL(g)})),E&&E.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0632\u0627\u0644\u0629 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const c=AppState.currentUser||{},g=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",clearLogo:!0,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:c.email,name:c.name,role:c.role,permissions:c.permissions}});g&&g.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",g?.message)}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",c)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631"),Settings.load()}});const C=document.getElementById("date-format-select"),S=document.getElementById("save-date-format-btn");S&&C&&S.addEventListener("click",()=>{AppState.dateFormat=C.value,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const h=document.getElementById("wh-total-override"),U=document.getElementById("wh-hours-per-day"),L=document.getElementById("wh-days-per-month"),T=document.getElementById("wh-months-per-year"),_=document.getElementById("wh-include-contractors"),et=document.getElementById("wh-multiplier-trir"),st=document.getElementById("wh-multiplier-afr"),it=document.getElementById("wh-multiplier-far"),at=document.getElementById("wh-multiplier-sr"),nt=document.getElementById("wh-multiplier-ir"),ct=document.getElementById("save-work-hours-settings-btn");(()=>{try{if(h&&(h.value=localStorage.getItem("hse_total_work_hours")||""),U&&(U.value=localStorage.getItem("hse_hours_per_day")||""),L&&(L.value=localStorage.getItem("hse_work_days_per_month")||""),T&&(T.value=localStorage.getItem("hse_work_months_per_year")||""),et&&(et.value=localStorage.getItem("hse_multiplier_trir")||""),st&&(st.value=localStorage.getItem("hse_multiplier_afr")||""),it&&(it.value=localStorage.getItem("hse_multiplier_far")||""),at&&(at.value=localStorage.getItem("hse_multiplier_sr")||""),nt&&(nt.value=localStorage.getItem("hse_multiplier_ir")||""),_){const c=localStorage.getItem("hse_work_hours_include_contractors");c===null||String(c).trim()===""?_.checked=!0:_.checked=c!=="0"&&String(c).toLowerCase()!=="false"&&String(c).toLowerCase()!=="no"}}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0628\u0626\u0629 \u062D\u0642\u0648\u0644 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",c)}})(),ct&&ct.addEventListener("click",()=>{try{const c=h&&String(h.value).trim();if(!c)localStorage.removeItem("hse_total_work_hours");else{const f=parseFloat(c.replace(/,/g,""));Number.isFinite(f)&&f>0?localStorage.setItem("hse_total_work_hours",String(f)):localStorage.removeItem("hse_total_work_hours")}const g=(f,I)=>{if(!I)return;const y=String(I.value).trim();if(y===""){localStorage.removeItem(f);return}const b=parseFloat(y.replace(/,/g,""));Number.isFinite(b)&&b>0?localStorage.setItem(f,String(b)):localStorage.removeItem(f)};g("hse_hours_per_day",U),g("hse_work_days_per_month",L),g("hse_work_months_per_year",T),g("hse_multiplier_trir",et),g("hse_multiplier_afr",st),g("hse_multiplier_far",it),g("hse_multiplier_sr",at),g("hse_multiplier_ir",nt),localStorage.setItem("hse_work_hours_include_contractors",_&&_.checked?"1":"0"),typeof Dashboard<"u"&&typeof Dashboard.updateKPIs=="function"&&Dashboard.updateKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.updateAllKPIs=="function"&&SafetyPerformanceKPIs.updateAllKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.queueScorecardRefresh=="function"&&SafetyPerformanceKPIs.queueScorecardRefresh(!0),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u062F\u064A\u062B \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645")}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",c),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644")}});const dt=document.getElementById("btn-save-emergency-contacts");dt&&dt.addEventListener("click",()=>{this.saveEmergencyContactsSettings()}),this.isCurrentUserAdmin()&&(this.loadEmergencyContactsSettings(),this.bindUserPhotoMigrationEvents(),this.bindDataArchivingEvents());const G=document.getElementById("company-name-input"),W=document.getElementById("company-name-font-size-input"),X=document.getElementById("company-secondary-name-input"),J=document.getElementById("company-secondary-name-font-size-input"),N=document.getElementById("company-secondary-name-color-input"),D=document.getElementById("company-secondary-name-color-text-input"),pt=document.getElementById("form-version-input"),mt=document.getElementById("clinic-monthly-visits-threshold-input"),ut=document.getElementById("employee-import-hire-months-input"),gt=document.getElementById("profile-teams-url-input"),ft=document.getElementById("profile-whatsapp-url-input"),B=document.getElementById("ppe-eligibility-rules-container"),yt=document.getElementById("ppe-add-rule-btn"),bt=document.getElementById("ppe-download-template-btn"),ht=document.getElementById("ppe-import-rules-btn"),O=document.getElementById("ppe-rules-import-file"),vt=document.getElementById("save-company-settings-btn"),M={items:[],rules:[]},Mt=c=>{let g=[];if(!c)return[];try{let f=c;if(typeof c=="string"&&(f=c.trim()?JSON.parse(c):[]),!Array.isArray(f))return[];g=f.filter(Boolean)}catch{return[]}return g.map(function(f){if(!f||typeof f!="object")return null;const I=String(f.equipmentType||f.itemName||"").trim();let y=parseInt(f.months,10);const b=parseInt(f.days,10)||0;return(isNaN(y)||y<0)&&(y=0),y=Math.min(120,y),y<1&&b>0&&(y=Math.min(120,Math.max(1,Math.ceil(b/30)))),I?{equipmentType:I,months:y,days:0}:null}).filter(Boolean)},_t=c=>{const g=(c||"").trim(),f=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u2014</option>'];return M.items.forEach(I=>{const y=(I||"").toString(),b=Utils.escapeHTML(y),x=y.trim()===g?" selected":"";f.push(`<option value="${b}"${x}>${b}</option>`)}),f.join("")},Y=()=>{if(!B)return;const c=B.scrollTop||0,g=window.scrollY||window.pageYOffset||0,f=y=>`
                    <div class="rounded-xl overflow-hidden border border-blue-200/70 shadow-md ring-1 ring-blue-900/5 bg-white min-h-[8rem]">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm ppe-eligibility-rules-table table-fixed">
                                <thead>
                                    <tr class="bg-gradient-to-l from-blue-700 via-blue-600 to-indigo-600 text-white">
                                        <th class="px-3 py-3 text-center font-bold w-12 border-b border-white/20">#</th>
                                        <th class="px-3 py-3 text-right font-bold min-w-[12rem] border-b border-white/20">\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641</th>
                                        <th class="px-3 py-3 text-center font-bold w-40 border-b border-white/20">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 (\u0634\u0647\u0648\u0631)</th>
                                        <th class="px-3 py-3 text-center font-bold w-52 border-b border-white/20">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${y}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;if(!M.rules.length){B.innerHTML=f(`
                        <tr>
                            <td colspan="4" class="px-4 py-10 text-center text-sm text-slate-500 bg-gradient-to-b from-slate-50 to-white">
                                <i class="fas fa-table text-2xl text-teal-300 mb-2 block"></i>
                                \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0628\u0639\u062F. \u0627\u0636\u063A\u0637 <strong class="text-teal-700">\xAB\u0625\u0636\u0627\u0641\u0629 \u0635\u0641\xBB</strong> \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u0648\u0639\u062F\u062F \u0627\u0644\u0634\u0647\u0648\u0631\u060C \u0648\u0628\u0639\u062F\u0647\u0627 <strong class="text-teal-700">\xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB</strong>.
                            </td>
                        </tr>
                    `),B.scrollTop=c,window.scrollTo({top:g});return}const I=M.rules.map((y,b)=>{const x=_t(y.equipmentType),A=Math.max(0,Math.min(120,parseInt(y.months,10)||0));return`
                    <tr class="ppe-rule-row hover:bg-blue-50/50 transition-colors" data-index="${b}">
                        <td class="px-3 py-3 text-center text-slate-500 font-semibold">${b+1}</td>
                        <td class="px-3 py-3 align-middle min-w-[10rem]">
                            <select class="form-input ppe-rule-item w-full text-sm border-blue-200/80 focus:ring-blue-500">${x}</select>
                        </td>
                        <td class="px-3 py-3 align-middle text-center">
                            <div class="inline-flex items-center justify-center gap-1">
                                <input type="number" class="form-input ppe-rule-months w-24 text-center text-sm border-blue-200/80 font-bold tabular-nums"
                                    min="1" max="120" step="1" inputmode="numeric" value="${A||""}" placeholder="1">
                                <span class="text-xs text-slate-500 whitespace-nowrap">\u0634\u0647\u0631\u064B\u0627</span>
                            </div>
                        </td>
                        <td class="px-3 py-3 text-center align-middle">
                            <div class="inline-flex items-center justify-center gap-2 flex-wrap">
                                <button type="button" class="ppe-rule-edit inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-300 bg-blue-600 text-white hover:bg-blue-700 text-sm font-extrabold px-4 py-2.5 min-h-[42px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    title="\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0635\u0641">
                                    <i class="fas fa-pen"></i> \u062A\u0639\u062F\u064A\u0644
                                </button>
                                <button type="button" class="ppe-rule-remove inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-300 bg-red-600 text-white hover:bg-red-700 text-sm font-extrabold px-4 py-2.5 min-h-[42px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    title="\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0635\u0641">
                                    <i class="fas fa-trash-alt"></i> \u062D\u0630\u0641
                                </button>
                            </div>
                        </td>
                    </tr>`}).join("");B.innerHTML=f(I),B.scrollTop=c,window.scrollTo({top:g}),B.querySelectorAll(".ppe-rule-remove").forEach((y,b)=>{y.addEventListener("click",()=>{M.rules.splice(b,1),Y()})}),B.querySelectorAll(".ppe-rule-edit").forEach((y,b)=>{y.addEventListener("click",()=>{const x=B.querySelector(`.ppe-rule-row[data-index="${b}"]`);if(!x)return;x.classList.add("bg-blue-100","ring-1","ring-blue-300");const A=x.querySelector(".ppe-rule-item"),k=x.querySelector(".ppe-rule-months");A?A.focus():k&&k.focus(),setTimeout(()=>x.classList.remove("bg-blue-100","ring-1","ring-blue-300"),1200)})})},Dt=()=>{if(!B)return[];const c=Array.from(B.querySelectorAll(".ppe-rule-row")),g=new Set,f=[];return c.forEach(I=>{const y=I.querySelector(".ppe-rule-item"),b=I.querySelector(".ppe-rule-months"),x=(y?.value||"").trim();if(!x||g.has(x))return;let A=parseInt(b?.value,10);isNaN(A)||A<1||(A=Math.min(120,A),g.add(x),f.push({equipmentType:x,months:A,days:0}))}),f},$t=()=>{if(!B)return Array.isArray(M.rules)?[...M.rules]:[];const c=Array.from(B.querySelectorAll(".ppe-rule-row"));return c.length?c.map(g=>{const f=g.querySelector(".ppe-rule-item"),I=g.querySelector(".ppe-rule-months"),y=(f?.value||"").trim();let b=parseInt(I?.value,10);return(isNaN(b)||b<1)&&(b=12),b=Math.min(120,b),{equipmentType:y,months:b,days:0}}):Array.isArray(M.rules)?[...M.rules]:[]},St=c=>{const g=[],f=new Set;return(Array.isArray(c)?c:[]).forEach(I=>{if(!I||typeof I!="object")return;const y=String(I.equipmentType||I.itemName||I["\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641"]||I.\u0627\u0644\u0635\u0646\u0641||"").trim();let b=parseInt(I.months??I.\u0627\u0644\u0634\u0647\u0648\u0631??I.months,10);!y||f.has(y)||isNaN(b)||b<1||(b=Math.min(120,b),f.add(y),g.push({equipmentType:y,months:b,days:0}))}),g},Nt=c=>{const g=String(c||"").split(/\r?\n/).map(y=>y.trim()).filter(Boolean);if(!g.length)return[];const I=g.filter((y,b)=>b!==0||!/الصنف|نوع|months|month|الشهور/i.test(y)).map(y=>{const b=y.includes("	")?"	":",",x=y.split(b).map(A=>A.trim()).filter(Boolean);return x.length<2?null:{equipmentType:x[0],months:x[1]}}).filter(Boolean);return St(I)},Pt=async c=>{if(!c)return;const g=(c.name||"").toLowerCase();let f=[];if(g.endsWith(".xlsx")||g.endsWith(".xls")){if(typeof XLSX>"u"){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0642\u0631\u0627\u0621\u0629 Excel \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0633\u062A\u062E\u062F\u0645 CSV \u0623\u0648 \u0641\u0639\u0651\u0644 \u0645\u0643\u062A\u0628\u0629 XLSX.");return}const I=await c.arrayBuffer(),y=XLSX.read(I,{type:"array"}),b=y.SheetNames&&y.SheetNames[0];if(!b){Notification.error("\u0645\u0644\u0641 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0623\u0648\u0631\u0627\u0642 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const x=y.Sheets[b],A=XLSX.utils.sheet_to_json(x,{defval:""});f=St(A)}else{const I=await c.text();f=Nt(I)}if(!f.length){Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628: \u0627\u0644\u0635\u0646\u0641,\u0627\u0644\u0634\u0647\u0648\u0631");return}M.rules=f,Y(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${f.length} \u0642\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D.`)},Ft=async()=>{let c=[];try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const g=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});g&&g.success&&Array.isArray(g.data)&&(c=g.data.map(f=>(f&&(f.itemName||f.name)||"").toString().trim()).filter(Boolean))}}catch{c=[]}if(!c.length){const g=AppState.appData&&AppState.appData.ppe||[];c=[...new Set(g.map(f=>(f.equipmentType||"").toString().trim()).filter(Boolean))]}c.length||(c=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"]),M.items=Array.from(new Set(c)).sort((g,f)=>g.localeCompare(f,"ar"))};(async()=>(M.rules=Mt(AppState.companySettings?.ppeEligibilityRules),await Ft(),Y()))(),yt&&yt.addEventListener("click",()=>{M.rules=$t(),M.rules.push({equipmentType:"",months:12,days:0}),Y();const c=Array.from(B?.querySelectorAll(".ppe-rule-row")||[]),g=c[c.length-1],f=g?g.querySelector(".ppe-rule-item"):null;f&&typeof f.focus=="function"&&setTimeout(()=>f.focus(),0)}),bt&&bt.addEventListener("click",()=>{const g="\uFEFF"+[["\u0627\u0644\u0635\u0646\u0641","\u0627\u0644\u0634\u0647\u0648\u0631"],["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","12"],["\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","6"]].map(b=>b.join(",")).join(`
`),f=new Blob([g],{type:"text/csv;charset=utf-8;"}),I=URL.createObjectURL(f),y=document.createElement("a");y.href=I,y.download="ppe-eligibility-template.csv",document.body.appendChild(y),y.click(),y.remove(),URL.revokeObjectURL(I)}),ht&&O&&(ht.addEventListener("click",()=>O.click()),O.addEventListener("change",async()=>{const c=O.files&&O.files[0];try{await Pt(c)}catch(g){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(g?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{O.value=""}}));const xt=document.getElementById("reset-company-name-btn");N&&D&&(N.addEventListener("input",()=>{D.value=N.value}),D.addEventListener("input",()=>{const c=D.value.trim();/^#[0-9A-Fa-f]{6}$/.test(c)&&(N.value=c)})),vt&&G&&vt.addEventListener("click",async()=>{const c=G.value.trim();if(!c){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629.");return}const g=X?X.value.trim():"",f=pt&&pt.value.trim()||"1.0";let I=16;if(W){const w=parseInt(W.value,10);!isNaN(w)&&w>=8&&w<=72&&(I=w)}let y=14;if(J){const w=parseInt(J.value,10);!isNaN(w)&&w>=8&&w<=72&&(y=w)}let b="#6B7280";D&&D.value.trim()?b=D.value.trim():N&&(b=N.value);let x=10;if(mt){const w=parseInt(mt.value,10);!isNaN(w)&&w>=1&&w<=1e3&&(x=w)}let A=3;if(ut){const w=parseInt(ut.value,10);!isNaN(w)&&w>=1&&w<=120&&(A=w)}const k=gt?gt.value.trim():"",R=ft?ft.value.trim():"";if(B){const w=Array.from(B.querySelectorAll(".ppe-rule-row"));for(const $ of w){const Tt=($.querySelector(".ppe-rule-item")?.value||"").trim(),rt=$.querySelector(".ppe-rule-months")?.value,tt=parseInt(rt,10);if(Tt&&(isNaN(tt)||tt<1)){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0635\u0627\u0644\u062D (\u0645\u0646 1 \u0625\u0644\u0649 120) \u0644\u0643\u0644 \u0635\u0646\u0641 \u0645\u062D\u062F\u062F \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629.");return}if(!Tt&&rt!==""&&rt!==void 0&&!isNaN(tt)&&tt>=1){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641 \u0644\u0643\u0644 \u0635\u0641 \u0641\u064A\u0647 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.");return}}}const ot=Dt(),K=JSON.stringify(ot),Z=String(AppState.companySettings?.logo||AppState.companyLogo||localStorage.getItem("hse_company_logo")||localStorage.getItem("company_logo")||"").trim();AppState.companySettings=Object.assign({},AppState.companySettings,{name:c,secondaryName:g,formVersion:f,nameFontSize:I,secondaryNameFontSize:y,secondaryNameColor:b,clinicMonthlyVisitsAlertThreshold:x,employeeImportHireMonths:A,profileTeamsUrl:k,profileWhatsAppUrl:R,ppeEligibilityRules:K,logo:Z}),Z&&(AppState.companyLogo=Z),DataManager.saveCompanySettings();let lt=!0;if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const w=AppState.currentUser||{},$=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:c,secondaryName:g,formVersion:f,nameFontSize:I,secondaryNameFontSize:y,secondaryNameColor:b,clinicMonthlyVisitsAlertThreshold:x,employeeImportHireMonths:A,profileTeamsUrl:k,profileWhatsAppUrl:R,ppeEligibilityRules:K,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:Z,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:w.email,name:w.name,role:w.role,permissions:w.permissions}});$&&$.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),$.data&&typeof DataManager.applyCompanySettingsFromServer=="function"&&DataManager.applyCompanySettingsFromServer($.data,{preserveLocalLogo:!0,allowClearLogo:!1,updateUI:!1})):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",$?.message),lt=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+($?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(w){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",w),lt=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0627\u062A\u0635\u0627\u0644/\u062E\u0627\u062F\u0645): "+(w?.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."))}lt&&(typeof UI<"u"&&(typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof UI.updateCompanyLogoHeader=="function"&&UI.updateCompanyLogoHeader(),typeof UI.updateLoginLogo=="function"&&UI.updateLoginLogo()),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),Settings.load())}),AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.postLoginItems)||(AppState.companySettings.postLoginItems=Settings.getPostLoginItems()),Settings.renderPostLoginItemsList();const It=document.getElementById("post-login-items-list"),Et=document.getElementById("post-login-add-item-btn"),z=document.getElementById("post-login-item-form"),j=document.getElementById("post-login-form-title"),P=document.getElementById("post-login-item-title"),F=document.getElementById("post-login-item-body"),q=document.getElementById("post-login-item-duration"),H=document.getElementById("post-login-item-active"),wt=document.getElementById("post-login-item-save-btn"),At=document.getElementById("post-login-item-cancel-btn");let V=-1;const Lt=()=>{z&&z.classList.add("hidden"),V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),P&&(P.value=""),F&&(F.value=""),q&&(q.value="10"),H&&(H.checked=!0)},Q=async()=>{if(AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=Settings.getPostLoginItems(),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const c=AppState.currentUser||{},g={name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),userData:{email:c.email,name:c.name,role:c.role,permissions:c.permissions}};await GoogleIntegration.sendToAppsScript("saveCompanySettings",g)}catch(c){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062F\u062E\u0648\u0644:",c)}};Et&&Et.addEventListener("click",()=>{V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),P&&(P.value=""),F&&(F.value=""),q&&(q.value="10"),H&&(H.checked=!0),z&&z.classList.remove("hidden")}),At&&At.addEventListener("click",Lt),wt&&P&&F&&wt.addEventListener("click",async()=>{const c=P.value.trim(),g=F.value.trim(),f=parseInt(q?.value,10),I=H?H.checked:!0;if(!c){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646.");return}const b=Settings.getPostLoginItems().slice().sort((A,k)=>(A.order??999)-(k.order??999)),x=b.length?Math.max(...b.map(A=>A.order??0)):0;V>=0&&V<b.length?b[V]={title:c,body:g,durationSeconds:isNaN(f)?10:Math.min(120,Math.max(0,f)),order:b[V].order??V,active:I}:b.push({title:c,body:g,durationSeconds:isNaN(f)?10:Math.min(120,Math.max(0,f)),order:x+1,active:I}),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=b,await Q(),Lt(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0635\u0631.")}),It&&It.addEventListener("click",async c=>{const g=c.target.closest(".post-login-edit-btn"),f=c.target.closest(".post-login-delete-btn"),I=c.target.closest(".post-login-up-btn"),y=c.target.closest(".post-login-down-btn"),b=g?.dataset?.index??f?.dataset?.index??I?.dataset?.index??y?.dataset?.index;if(b===void 0)return;const x=parseInt(b,10),k=Settings.getPostLoginItems().slice().sort((ot,K)=>(ot.order??999)-(K.order??999)),R=k[x];if(R){if(g){V=x,j&&(j.textContent="\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0635\u0631"),P&&(P.value=R.title||""),F&&(F.value=R.body||""),q&&(q.value=String(R.durationSeconds??10)),H&&(H.checked=R.active!==!1),z&&z.classList.remove("hidden");return}if(f){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631\u061F"))return;k.splice(x,1),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=k,await Q(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631.");return}if(I&&x>0){[k[x-1].order,k[x].order]=[k[x].order,k[x-1].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=k,await Q(),Settings.renderPostLoginItemsList();return}y&&x<k.length-1&&([k[x].order,k[x+1].order]=[k[x+1].order,k[x].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=k,await Q(),Settings.renderPostLoginItemsList())}}),this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),xt&&G&&xt.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companySettings=Object.assign({},AppState.companySettings,{name:DEFAULT_COMPANY_NAME,nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280"}),G.value=DEFAULT_COMPANY_NAME,X&&(AppState.companySettings.secondaryName="",X.value=""),W&&(W.value="16"),J&&(J.value="14"),N&&(N.value="#6B7280"),D&&(D.value="#6B7280"),DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const c=AppState.currentUser||{},g=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:DEFAULT_COMPANY_NAME,secondaryName:"",formVersion:"1.0",nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:c.email,name:c.name,role:c.role,permissions:c.permissions}});g&&g.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",g?.message)}catch(c){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",c)}typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629")}catch(c){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",c)}},100),Notification.success("\u062A\u0645\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),Settings.load()}});const Ct=document.getElementById("view-activity-log-btn");Ct&&Ct.addEventListener("click",()=>{UserActivityLog.showModal()});const kt=document.getElementById("view-user-versions-btn");kt&&kt.addEventListener("click",()=>{typeof UserVersionsAdmin<"u"&&UserVersionsAdmin.open?UserVersionsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const Ut=document.getElementById("view-client-errors-btn");Ut&&Ut.addEventListener("click",()=>{typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const Bt=document.getElementById("open-client-errors-section-btn");if(Bt&&Bt.addEventListener("click",()=>{typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection("client-errors"):typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():location.hash="#client-errors"}),this.isCurrentUserAdmin()&&typeof Permissions?.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents(),this.isCurrentUserAdmin()){this._emailSettingsUiReady=!1,this.bindEmailSettingsEvents();const c=document.getElementById("tab-notifications");c&&c.classList.contains("active")&&this.ensureEmailSettingsLoaded(!1)}this.bindViolationTypesEvents(),this.initializeApprovalCircuitsUI(),this.bindCloudStorageSettingsEvents()},100)},ensureEmailSettingsLoaded(e){return!this.isCurrentUserAdmin()||!document.getElementById("email-settings-modules-list")?null:this._emailSettingsLoadingPromise&&!e?this._emailSettingsLoadingPromise:(this._emailSettingsLoadingPromise=this.loadEmailSettingsUI({force:!!e}).catch(t=>{}).finally(()=>{this._emailSettingsLoadingPromise=null}),this._emailSettingsLoadingPromise)},applyEmailSettingsDraftToUI(e){this._emailSettingsDraft=e||(typeof EmailDispatch<"u"?EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}}),this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const t=document.getElementById("email-settings-global-enabled"),s=document.getElementById("email-settings-default-recipients");t&&(t.checked=!!this._emailSettingsDraft.globalEnabled),s&&(s.value=""),this.renderEmailDefaultChips(),this.renderEmailGroupFilters(),this.renderEmailStatusFilters(),this.updateEmailSettingsStatusBanner(),this.renderEmailStatsStrip(),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||"")},async loadEmailSettingsUI(e){const s=!!(e||{}).force;if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsGroupFilter=this._emailSettingsGroupFilter||"all",this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const i=document.getElementById("email-settings-sync-badge");i&&(i.hidden=!1,i.textContent="\u0645\u0632\u0627\u0645\u0646\u0629\u2026");const o=typeof EmailDispatch<"u"?EmailDispatch.getCachedSettings()||EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}};this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1);const n=document.getElementById("email-settings-modules-summary"),l=n?n.textContent:"";n&&(n.textContent=(l||"\u2014")+" \xB7 \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629\u2026");try{let r=o;if(typeof EmailDispatch<"u")r=await EmailDispatch.loadSettings(s);else if(typeof GoogleIntegration<"u"){const d=await GoogleIntegration.sendToAppsScript("getEmailSettings",{__timeoutMs:25e3});r=d&&d.data?d.data:o}if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(r||o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1),this._emailSettingsUiReady=!0,i&&(i.textContent="\u0645\u062D\u062F\u0651\u062B",setTimeout(()=>{i&&(i.hidden=!0)},1200))}catch{this._emailSettingsHydrating=!1,n&&(n.textContent="\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0639\u0631\u0636 \u0645\u062D\u0644\u064A \u0645\u0624\u0642\u062A"),i&&(i.textContent="\u0645\u062D\u0644\u064A",i.hidden=!1),Notification?.warning?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u0644\u064A \u0645\u0624\u0642\u062A.")}},parseEmailListText(e){return String(e||"").split(/[,;\s]+/).map(t=>t.trim().toLowerCase()).filter(t=>t.includes("@"))},getEmailDefaultRecipientsList(){const e=this._emailSettingsDraft||{};return Array.isArray(e.defaultRecipients)?e.defaultRecipients.slice():[]},setEmailDefaultRecipientsList(e){this._emailSettingsDraft||(this._emailSettingsDraft={modules:{}});const t=[],s=new Set;(e||[]).forEach(a=>{const i=String(a||"").trim().toLowerCase();!i.includes("@")||s.has(i)||(s.add(i),t.push(i))}),this._emailSettingsDraft.defaultRecipients=t.slice(0,50),this.renderEmailDefaultChips(),this.renderEmailStatsStrip(),this.setEmailSettingsDirty(!0)},addEmailDefaultRecipientsFromInput(){const e=document.getElementById("email-settings-default-recipients");if(!e)return;const t=this.parseEmailListText(e.value);if(!t.length)return;const s=this.getEmailDefaultRecipientsList().concat(t);this.setEmailDefaultRecipientsList(s),e.value="",e.focus()},renderEmailDefaultChips(){const e=document.getElementById("email-settings-default-chips");if(!e)return;const t=this.getEmailDefaultRecipientsList();if(!t.length){e.innerHTML='<span class="email-settings-chip email-settings-chip-muted">\u0644\u0627 \u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0628\u0639\u062F \u2014 \u0623\u0636\u0641 \u0625\u064A\u0645\u064A\u0644\u0627\u064B \u0628\u0627\u0644\u0623\u0633\u0641\u0644</span>';return}e.innerHTML=t.map(s=>`<span class="email-settings-chip" dir="ltr">
                ${Utils.escapeHTML(s)}
                <button type="button" class="email-settings-chip-x" data-email-chip="${Utils.escapeHTML(s)}" title="\u062D\u0630\u0641" aria-label="\u062D\u0630\u0641 ${Utils.escapeHTML(s)}">&times;</button>
            </span>`).join("")},renderEmailStatsStrip(){const e=document.getElementById("email-settings-stats");if(!e||!this._emailSettingsDraft)return;const t=this._emailSettingsDraft.modules||{},s=Object.keys(t),a=s.filter(r=>t[r].enabled).length,i=s.filter(r=>t[r].enabled&&t[r].manualSend).length,o=s.filter(r=>t[r].enabled&&t[r].autoSend).length,n=this.getEmailDefaultRecipientsList().length,l=!!this._emailSettingsDraft.globalEnabled;e.innerHTML=`
            <div class="email-stat-card${l?" is-hot":""}"><span class="email-stat-num">${l?"ON":"OFF"}</span><span class="email-stat-label">\u0627\u0644\u0646\u0638\u0627\u0645</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${a}</span><span class="email-stat-label">\u0645\u0641\u0639\u0651\u0644</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${i}</span><span class="email-stat-label">\u064A\u062F\u0648\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${o}</span><span class="email-stat-label">\u062A\u0644\u0642\u0627\u0626\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${n}</span><span class="email-stat-label">\u0645\u0633\u062A\u0644\u0645\u0648\u0646</span></div>
        `},setEmailSettingsDirty(e){if(this._emailSettingsHydrating&&e)return;this._emailSettingsDirty=!!e;const t=document.getElementById("email-settings-dirty-hint"),s=document.getElementById("email-settings-sticky-bar");t&&(t.hidden=!e),s&&s.classList.toggle("is-dirty",!!e)},updateEmailSettingsStatusBanner(){const t=!!(this._emailSettingsDraft||{}).globalEnabled||!!document.getElementById("email-settings-global-enabled")?.checked,s=document.getElementById("email-settings-status-banner"),a=document.getElementById("email-settings-status-title"),i=document.getElementById("email-settings-status-hint");s&&s.classList.toggle("is-on",t),a&&(a.textContent=t?"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0641\u0639\u0651\u0644":"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u062A\u0648\u0642\u0641"),i&&(i.textContent=t?"\u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0641\u0639\u0651\u0644\u0629 \u064A\u062F\u0648\u064A\u0627\u064B. \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u064A\u0639\u0645\u0644 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638 \u0625\u0646 \u0643\u0627\u0646 \u0645\u0641\u0639\u0651\u0644\u0627\u064B.":"\u0639\u0646\u062F \u0627\u0644\u0625\u064A\u0642\u0627\u0641: \u0644\u0627 \u0632\u0631 \u064A\u062F\u0648\u064A \u0648\u0644\u0627 \u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."),this.renderEmailStatsStrip()},updateEmailModulesSummary(){const e=document.getElementById("email-settings-modules-summary");if(!e||!this._emailSettingsDraft)return;const t=this._emailSettingsDraft.modules||{},s=Object.keys(t),a=s.filter(n=>t[n].enabled).length,i=s.filter(n=>t[n].enabled&&t[n].manualSend).length,o=s.filter(n=>t[n].enabled&&t[n].autoSend).length;e.textContent=`${a} \u0645\u0641\u0639\u0651\u0644 \u0645\u0646 ${s.length} \xB7 \u064A\u062F\u0648\u064A ${i} \xB7 \u062A\u0644\u0642\u0627\u0626\u064A ${o}`,this.renderEmailStatsStrip()},renderEmailGroupFilters(){const e=document.getElementById("email-settings-group-filters");if(!e||!this._emailSettingsDraft)return;const t=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},s=this._emailSettingsDraft.modules||{},a={all:Object.keys(s).length};Object.keys(s).forEach(n=>{const l=s[n].group||"ops";a[l]=(a[l]||0)+1});const i=this._emailSettingsGroupFilter||"all",o=[{id:"all",label:"\u0627\u0644\u0643\u0644"}].concat(Object.keys(t).filter(n=>a[n]).map(n=>({id:n,label:t[n]})));e.innerHTML=o.map(n=>`
            <button type="button" class="email-settings-group-chip${i===n.id?" is-active":""}" data-email-group="${Utils.escapeHTML(n.id)}">
                ${Utils.escapeHTML(n.label)}
                <span class="email-settings-group-count">${a[n.id]||0}</span>
            </button>
        `).join("")},renderEmailStatusFilters(){const e=document.getElementById("email-settings-status-filters");if(!e)return;const t=this._emailSettingsStatusFilter||"all",s=[{id:"all",label:"\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"},{id:"enabled",label:"\u0645\u0641\u0639\u0651\u0644"},{id:"disabled",label:"\u0645\u062A\u0648\u0642\u0641"},{id:"manual",label:"\u064A\u062F\u0648\u064A"},{id:"auto",label:"\u062A\u0644\u0642\u0627\u0626\u064A"}];e.innerHTML=s.map(a=>`
            <button type="button" class="email-settings-status-chip${t===a.id?" is-active":""}" data-email-status="${a.id}">
                ${a.label}
            </button>
        `).join("")},renderEmailModulesList(e){const t=document.getElementById("email-settings-modules-list");if(!t||!this._emailSettingsDraft)return;const s=String(e||"").trim().toLowerCase(),a=this._emailSettingsGroupFilter||"all",i=this._emailSettingsStatusFilter||"all",o=this._emailSettingsDraft.modules||{},n=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},l=Object.keys(o).sort((m,p)=>{const v=o[m].group||"ops",u=o[p].group||"ops";return v!==u?v.localeCompare(u):String(o[m].labelAr||m).localeCompare(String(o[p].labelAr||p),"ar")});let r="",d="";l.forEach(m=>{const p=o[m],v=p.labelAr||m,u=p.group||"ops";if(a!=="all"&&u!==a||s&&!v.toLowerCase().includes(s)&&!m.toLowerCase().includes(s)||i==="enabled"&&!p.enabled||i==="disabled"&&p.enabled||i==="manual"&&!(p.enabled&&p.manualSend)||i==="auto"&&!(p.enabled&&p.autoSend))return;u!==d&&(d=u,r+=`<div class="email-settings-group-title">${Utils.escapeHTML(n[u]||u)}</div>`);const E=(p.recipients||[]).join(", "),C=!!p.enabled,S=!!(p.recipients&&p.recipients.length);r+=`
                <div class="email-module-row${C?" is-enabled":""}" data-module-key="${Utils.escapeHTML(m)}">
                    <div class="email-module-row-top">
                        <div class="email-module-identity">
                            <span class="email-module-name">${Utils.escapeHTML(v)}</span>
                            <span class="email-module-key" dir="ltr">${Utils.escapeHTML(m)}</span>
                        </div>
                        <div class="email-module-toggles">
                            <label class="email-toggle${p.enabled?" is-checked":""}" title="\u062A\u0641\u0639\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639">
                                <input type="checkbox" class="em-enabled" ${p.enabled?"checked":""}>
                                <span>\u0645\u0641\u0639\u0651\u0644</span>
                            </label>
                            <label class="email-toggle${p.manualSend?" is-checked":""}${C?"":" is-disabled"}" title="\u0632\u0631 \u0625\u0631\u0633\u0627\u0644 \u0645\u0646 \u0634\u0627\u0634\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <input type="checkbox" class="em-manual" ${p.manualSend?"checked":""} ${C?"":"disabled"}>
                                <span>\u064A\u062F\u0648\u064A</span>
                            </label>
                            <label class="email-toggle${p.autoSend?" is-checked":""}${C?"":" is-disabled"}" title="\u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638">
                                <input type="checkbox" class="em-auto" ${p.autoSend?"checked":""} ${C?"":"disabled"}>
                                <span>\u062A\u0644\u0642\u0627\u0626\u064A</span>
                            </label>
                        </div>
                    </div>
                    <button type="button" class="email-module-recipients-toggle${S?" has-custom":""}" data-toggle-recipients="1">
                        <i class="fas fa-chevron-down"></i>
                        \u0645\u0633\u062A\u0644\u0645\u0648\u0646 \u062E\u0627\u0635\u0648\u0646 ${S?`(${p.recipients.length})`:"(\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"}
                    </button>
                    <div class="email-module-recipients-wrap" hidden>
                        <input type="text" class="form-input w-full text-sm em-recipients" placeholder="\u0641\u0627\u0631\u063A = \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u064A\u0646" value="${Utils.escapeHTML(E)}" dir="ltr">
                    </div>
                </div>`}),t.innerHTML=r||'<p class="email-settings-empty">\u0644\u0627 \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0627\u0644\u062A\u0635\u0641\u064A\u0629</p>',this.updateEmailModulesSummary(),this.syncEmailToggleClasses(t),t.querySelectorAll(".email-module-row").forEach(m=>{const p=m.querySelector(".em-enabled");p&&p.addEventListener("change",()=>{const v=p.checked;m.classList.toggle("is-enabled",v),m.querySelectorAll(".em-manual, .em-auto").forEach(u=>{u.disabled=!v}),this.syncEmailToggleClasses(m),this.collectEmailSettingsFromUI(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0)})})},syncEmailToggleClasses(e){!e||typeof e.querySelectorAll!="function"||e.querySelectorAll(".email-toggle").forEach(t=>{const s=t.querySelector('input[type="checkbox"]');s&&(t.classList.toggle("is-checked",!!s.checked),t.classList.toggle("is-disabled",!!s.disabled))})},applyEmailBulkVisible(e,t){this.collectEmailSettingsFromUI(),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(a=>{const i=a.getAttribute("data-module-key");if(!i||!this._emailSettingsDraft?.modules?.[i])return;const o=this._emailSettingsDraft.modules[i];if(t==="manual"){o.enabled||(o.enabled=!0),o.manualSend=!0;return}if(t==="auto"){o.enabled||(o.enabled=!0),o.autoSend=!0;return}o.enabled=!!e,e&&(o.manualSend=!0)}),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||""),this.setEmailSettingsDirty(!0)},collectEmailSettingsFromUI(){const e=this._emailSettingsDraft||{modules:{}};return e.globalEnabled=!!document.getElementById("email-settings-global-enabled")?.checked,Array.isArray(e.defaultRecipients)||(e.defaultRecipients=this.parseEmailListText(document.getElementById("email-settings-default-recipients")?.value||"")),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(t=>{const s=t.getAttribute("data-module-key");if(!s||!e.modules[s])return;e.modules[s].enabled=!!t.querySelector(".em-enabled")?.checked,e.modules[s].manualSend=!!t.querySelector(".em-manual")?.checked,e.modules[s].autoSend=!!t.querySelector(".em-auto")?.checked;const a=t.querySelector(".em-recipients")?.value||"";e.modules[s].recipients=this.parseEmailListText(a)}),this._emailSettingsDraft=e,e},bindEmailSettingsEvents(){const e=document.getElementById("email-settings-save-btn");if(!e||e.dataset.emailBound==="1")return;e.dataset.emailBound="1";const t=()=>{this._emailSettingsHydrating||(this.collectEmailSettingsFromUI(),this.updateEmailSettingsStatusBanner(),this.renderEmailDefaultChips(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0))},s=document.getElementById("email-settings-global-enabled");s&&s.addEventListener("change",()=>{t()});const a=document.getElementById("email-settings-default-recipients"),i=document.getElementById("email-settings-add-recipient-btn");a&&(a.addEventListener("keydown",S=>{(S.key==="Enter"||S.key===",")&&(S.preventDefault(),this.addEmailDefaultRecipientsFromInput())}),a.addEventListener("paste",()=>{setTimeout(()=>this.addEmailDefaultRecipientsFromInput(),0)})),i&&i.addEventListener("click",()=>this.addEmailDefaultRecipientsFromInput());const o=document.getElementById("email-settings-default-chips");o&&o.addEventListener("click",S=>{const h=S.target.closest("[data-email-chip]");if(!h)return;const U=h.getAttribute("data-email-chip"),L=this.getEmailDefaultRecipientsList().filter(T=>T!==U);this.setEmailDefaultRecipientsList(L)});const n=document.getElementById("email-settings-module-filter");if(n){let S=null;n.addEventListener("input",()=>{clearTimeout(S),S=setTimeout(()=>{this.collectEmailSettingsFromUI(),this.renderEmailModulesList(n.value)},120)})}const l=document.getElementById("email-settings-group-filters");l&&l.addEventListener("click",S=>{const h=S.target.closest("[data-email-group]");h&&(this.collectEmailSettingsFromUI(),this._emailSettingsGroupFilter=h.getAttribute("data-email-group")||"all",this.renderEmailGroupFilters(),this.renderEmailModulesList(n?.value||""))});const r=document.getElementById("email-settings-status-filters");r&&r.addEventListener("click",S=>{const h=S.target.closest("[data-email-status]");h&&(this.collectEmailSettingsFromUI(),this._emailSettingsStatusFilter=h.getAttribute("data-email-status")||"all",this.renderEmailStatusFilters(),this.renderEmailModulesList(n?.value||""))});const d=document.getElementById("email-settings-enable-visible-btn");d&&d.addEventListener("click",()=>this.applyEmailBulkVisible(!0));const m=document.getElementById("email-settings-disable-visible-btn");m&&m.addEventListener("click",()=>this.applyEmailBulkVisible(!1));const p=document.getElementById("email-settings-manual-visible-btn");p&&p.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"manual"));const v=document.getElementById("email-settings-auto-visible-btn");v&&v.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"auto"));const u=document.getElementById("email-settings-modules-list");u&&(u.addEventListener("change",S=>{if(!S.target.matches(".em-manual, .em-auto, .em-recipients"))return;const h=S.target.closest(".email-module-row");h&&S.target.matches(".em-manual, .em-auto")&&this.syncEmailToggleClasses(h),t()}),u.addEventListener("input",S=>{S.target.matches(".em-recipients")&&this.setEmailSettingsDirty(!0)}),u.addEventListener("click",S=>{const h=S.target.closest("[data-toggle-recipients]");if(!h)return;const L=h.closest(".email-module-row")?.querySelector(".email-module-recipients-wrap");if(!L)return;const T=L.hasAttribute("hidden");T?L.removeAttribute("hidden"):L.setAttribute("hidden",""),h.classList.toggle("is-open",T)})),e.addEventListener("click",async()=>{const S=this.collectEmailSettingsFromUI();e.disabled=!0;try{const h=AppState.currentUser||{},U=await GoogleIntegration.sendToAppsScript("saveEmailSettings",{settings:S,userData:h});U&&U.success?(AppState.notificationEmails=(S.defaultRecipients||[]).slice(),typeof EmailDispatch<"u"&&(EmailDispatch.invalidateCache(),EmailDispatch._settings=U.data||S),this._emailSettingsDraft=U.data||S,this.setEmailSettingsDirty(!1),this.updateEmailSettingsStatusBanner(),this.updateEmailModulesSummary(),Notification.success(U.message||"\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F")):Notification.error(U&&U.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(h){Notification.error("\u062E\u0637\u0623: "+(h.message||h))}finally{e.disabled=!1}});const E=document.getElementById("email-settings-reload-btn");E&&E.addEventListener("click",()=>this.ensureEmailSettingsLoaded(!0));const C=document.getElementById("email-settings-test-btn");C&&C.addEventListener("click",async()=>{const S=document.getElementById("email-settings-test-to")?.value?.trim();if(!S||!S.includes("@")){Notification.error("\u0623\u062F\u062E\u0644 \u0625\u064A\u0645\u064A\u0644 \u0635\u062D\u064A\u062D \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631");return}C.disabled=!0;try{const h=await GoogleIntegration.sendToAppsScript("sendTestEmail",{to:S,userData:AppState.currentUser||{}});h&&h.success?Notification.success(h.message||"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A"):Notification.error(h&&h.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A")}catch(h){Notification.error(String(h.message||h))}finally{C.disabled=!1}})},removeNotificationEmail(e){AppState.notificationEmails&&AppState.notificationEmails[e]!=null&&AppState.notificationEmails.splice(e,1)},bindCloudStorageSettingsEvents(){const e=document.getElementById("onedrive-settings-form");e&&e.addEventListener("submit",async n=>{n.preventDefault();const l=document.getElementById("onedrive-enabled")?.checked||!1,r=document.getElementById("onedrive-client-id")?.value.trim()||"",d=document.getElementById("onedrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.onedrive.enabled=l,AppState.cloudStorageConfig.onedrive.clientId=r,d&&(AppState.cloudStorageConfig.onedrive.clientSecret=d),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A OneDrive \u0628\u0646\u062C\u0627\u062D"),this.load()});const t=document.getElementById("onedrive-authorize-btn");t&&t.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("onedrive"),this.load()}catch(n){Notification.error(n.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 OneDrive")}});const s=document.getElementById("googledrive-settings-form");s&&s.addEventListener("submit",async n=>{n.preventDefault();const l=document.getElementById("googledrive-enabled")?.checked||!1,r=document.getElementById("googledrive-client-id")?.value.trim()||"",d=document.getElementById("googledrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.googleDrive.enabled=l,AppState.cloudStorageConfig.googleDrive.clientId=r,d&&(AppState.cloudStorageConfig.googleDrive.clientSecret=d),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),this.load()});const a=document.getElementById("googledrive-authorize-btn");a&&a.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("googleDrive"),this.load()}catch(n){Notification.error(n.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u062F\u0645")}});const i=document.getElementById("sharepoint-settings-form");i&&i.addEventListener("submit",async n=>{n.preventDefault();const l=document.getElementById("sharepoint-enabled")?.checked||!1,r=document.getElementById("sharepoint-client-id")?.value.trim()||"",d=document.getElementById("sharepoint-client-secret")?.value.trim()||"",m=document.getElementById("sharepoint-tenant-id")?.value.trim()||"",p=document.getElementById("sharepoint-site-url")?.value.trim()||"";AppState.cloudStorageConfig.sharepoint.enabled=l,AppState.cloudStorageConfig.sharepoint.clientId=r,d&&(AppState.cloudStorageConfig.sharepoint.clientSecret=d),AppState.cloudStorageConfig.sharepoint.tenantId=m,AppState.cloudStorageConfig.sharepoint.siteUrl=p,DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SharePoint \u0628\u0646\u062C\u0627\u062D"),this.load()});const o=document.getElementById("sharepoint-authorize-btn");o&&o.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("sharepoint"),this.load()}catch(n){Notification.error(n.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 SharePoint")}})},renderCloudStorageSettings(){const e=AppState.cloudStorageConfig.onedrive,t=AppState.cloudStorageConfig.googleDrive,s=AppState.cloudStorageConfig.sharepoint,a=e.enabled&&e.clientId&&e.accessToken?"success":"warning",i=t.enabled&&t.clientId&&t.accessToken?"success":"warning",o=s.enabled&&s.clientId&&s.accessToken?"success":"warning";return`
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-cloud ml-2"></i>
                        \u062A\u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u064A
                    </h2>
                </div>
                <div class="card-body space-y-6">
                    <!-- Microsoft OneDrive -->
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-base font-semibold text-gray-700">
                                <i class="fab fa-microsoft ml-2"></i>
                                Microsoft OneDrive
                            </h3>
                            <span class="badge badge-${a}">
                                ${a==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                            </span>
                        </div>
                        <form id="onedrive-settings-form" class="space-y-4">
                            <div>
                                <label class="flex items-center mb-2">
                                    <input type="checkbox" id="onedrive-enabled" class="rounded border-gray-300 text-blue-600"
                                        ${e.enabled?"checked":""}>
                                    <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 OneDrive</span>
                                </label>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                                </label>
                                <input type="text" id="onedrive-client-id" class="form-input"
                                    value="${e.clientId||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Azure Portal"
                                    autocomplete="username">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                                </label>
                                <input type="password" id="onedrive-client-secret" class="form-input"
                                    value="${e.clientSecret||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                    autocomplete="new-password">
                            </div>
                            <div class="flex items-center justify-end gap-4 pt-4 border-t">
                                ${e.clientId&&!e.accessToken?`
                                    <button type="button" id="onedrive-authorize-btn" class="btn-secondary">
                                        <i class="fas fa-key ml-2"></i>
                                        \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628
                                    </button>
                                `:""}
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-save ml-2"></i>
                                    \u062D\u0641\u0638
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-xs text-gray-600">
                            <i class="fas fa-info-circle ml-1 text-blue-600"></i>
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u064A\u062C\u0628 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0641\u064A Azure Portal (\u0644\u0640 OneDrive \u0648 SharePoint) \u0623\u0648 Google Cloud Console (\u0644\u0640 \u0627\u0644\u062E\u0627\u062F\u0645) \u0623\u0648\u0644\u0627\u064B.
                            \u0627\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0633\u062D\u0627\u0628\u064A\u0629. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0639\u0627\u062F\u064A\u0648\u0646 \u064A\u0645\u0643\u0646\u0647\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0628\u0639\u062F \u062A\u0641\u0639\u064A\u0644\u0647.
                        </p>
                    </div>
                </div>
            </div>
        `},renderGoogleDriveSettings(){const e=AppState.cloudStorageConfig.googleDrive,t=e.enabled&&e.clientId&&e.accessToken?"success":"warning";return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fab fa-google ml-2"></i>
                        \u0627\u0644\u062E\u0627\u062F\u0645
                    </h2>
                </div>
                <div class="card-body space-y-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base font-semibold text-gray-700">
                            <i class="fab fa-google ml-2"></i>
                            \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645
                        </h3>
                        <span class="badge badge-${t}">
                            ${t==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                        </span>
                    </div>
                    <form id="googledrive-settings-form" class="space-y-4">
                        <div>
                            <label class="flex items-center mb-2">
                                <input type="checkbox" id="googledrive-enabled" class="rounded border-gray-300 text-blue-600"
                                    ${e.enabled?"checked":""}>
                                <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062E\u0627\u062F\u0645</span>
                            </label>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                            </label>
                            <input type="text" id="googledrive-client-id" class="form-input"
                                value="${e.clientId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Google Cloud Console"
                                autocomplete="username">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                            </label>
                            <input type="password" id="googledrive-client-secret" class="form-input"
                                value="${e.clientSecret||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                autocomplete="new-password">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            ${e.clientId&&!e.accessToken?`
                                <button type="button" id="googledrive-authorize-btn" class="btn-secondary">
                                    <i class="fas fa-key ml-2"></i>
                                    \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628
                                </button>
                            `:""}
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                \u062D\u0641\u0638
                            </button>
                        </div>
                    </form>
                    <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-xs text-gray-600">
                            <i class="fas fa-info-circle ml-1 text-blue-600"></i>
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u064A\u062C\u0628 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0641\u064A Google Cloud Console \u0623\u0648\u0644\u0627\u064B. \u0627\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0640 \u0627\u0644\u062E\u0627\u062F\u0645.
                        </p>
                    </div>
                </div>
            </div>
        `},renderSharePointSettings(){const e=AppState.cloudStorageConfig.sharepoint,t=e.enabled&&e.clientId&&e.accessToken?"success":"warning";return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fab fa-microsoft ml-2"></i>
                        Microsoft SharePoint
                    </h2>
                </div>
                <div class="card-body space-y-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base font-semibold text-gray-700">
                            <i class="fab fa-microsoft ml-2"></i>
                            \u0625\u0639\u062F\u0627\u062F\u0627\u062A Microsoft SharePoint
                        </h3>
                        <span class="badge badge-${t}">
                            ${t==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                        </span>
                    </div>
                    <form id="sharepoint-settings-form" class="space-y-4">
                        <div>
                            <label class="flex items-center mb-2">
                                <input type="checkbox" id="sharepoint-enabled" class="rounded border-gray-300 text-blue-600"
                                    ${e.enabled?"checked":""}>
                                <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 SharePoint</span>
                            </label>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                            </label>
                            <input type="text" id="sharepoint-client-id" class="form-input"
                                value="${e.clientId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Azure Portal"
                                autocomplete="username">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                            </label>
                            <input type="password" id="sharepoint-client-secret" class="form-input"
                                value="${e.clientSecret||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                autocomplete="new-password">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Tenant ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0623\u062C\u0631)
                            </label>
                            <input type="text" id="sharepoint-tenant-id" class="form-input"
                                value="${e.tenantId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Tenant ID (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Site URL (\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u0642\u0639)
                            </label>
                            <input type="url" id="sharepoint-site-url" class="form-input"
                                value="${e.siteUrl||""}"
                                placeholder="https://yourcompany.sharepoint.com/sites/yoursite">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            ${e.clientId&&!e.accessToken?`
                                <button type="button" id="sharepoint-authorize-btn" class="btn-secondary">
                                    <i class="fas fa-key ml-2"></i>
                                    \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628
                                </button>
                            `:""}
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                \u062D\u0641\u0638
                            </button>
                        </div>
                    </form>
                    <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-xs text-gray-600">
                            <i class="fas fa-info-circle ml-1 text-blue-600"></i>
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u064A\u062C\u0628 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0641\u064A Azure Portal \u0623\u0648\u0644\u0627\u064B. \u0627\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0640 SharePoint.
                        </p>
                    </div>
                </div>
            </div>
        `},_violationTypesImportNormalizeKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationTypesImportPick(e,t){const s={};Object.keys(e||{}).forEach(a=>{s[this._violationTypesImportNormalizeKey(a)]=e[a]});for(let a=0;a<t.length;a++){const i=this._violationTypesImportNormalizeKey(t[a]);if(s[i]!==void 0&&s[i]!==null&&String(s[i]).trim()!=="")return s[i]}return""},_parseViolationTypeFineForImport(e){if(e==null||e==="")return 0;if(typeof Violations<"u"&&typeof Violations.parseFineAmount=="function")return Violations.parseFineAmount(e);const t=Number(String(e).replace(/[^\d.\-]/g,""));return Number.isFinite(t)&&t>=0?t:0},downloadViolationTypesImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629"],t=["\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629","\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A","500"],s=XLSX.utils.book_new(),a=XLSX.utils.aoa_to_sheet([e,t]);a["!cols"]=[{wch:40},{wch:50},{wch:14}],XLSX.utils.book_append_sheet(s,a,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const i=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],["\u2022 \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639\xBB \u0625\u0644\u0632\u0627\u0645\u064A."],["\u2022 \u0625\u0630\u0627 \u0648\u064F\u062C\u062F \u0646\u0648\u0639 \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B\u060C \u064A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641."],["\u2022 \xAB\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629\xBB \u0631\u0642\u0645 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 (\u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0631\u0642\u0627\u0645 \u0639\u0631\u0628\u064A\u0629 \u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D)."]];XLSX.utils.book_append_sheet(s,XLSX.utils.aoa_to_sheet(i),"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(s,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},exportViolationTypesToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}ViolationTypesManager.ensureInitialized();const e=ViolationTypesManager.getAll();if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}const t=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0639\u062F\u062F_\u0627\u0644\u0633\u062C\u0644\u0627\u062A"],s=e.map(n=>{const l=ViolationTypesManager.countUsage(n),r=Number(n.fineAmount||0);return[n.name||"",n.description||"",Number.isFinite(r)?r:0,n.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635",l]}),a=XLSX.utils.book_new(),i=XLSX.utils.aoa_to_sheet([t,...s]);i["!cols"]=[{wch:42},{wch:55},{wch:16},{wch:12},{wch:14}],XLSX.utils.book_append_sheet(a,i,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const o=new Date().toISOString().slice(0,10);XLSX.writeFile(a,`\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${o}.xlsx`),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${e.length} \u0646\u0648\u0639\u0627\u064B \u0625\u0644\u0649 Excel.`)},showViolationTypesImportModal(){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 640px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0646 Excel</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
                        <p class="m-0 mb-2"><i class="fas fa-download ml-2"></i>\u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 (\u0639\u0646\u0627\u0648\u064A\u0646 + \u0635\u0641 \u0645\u062B\u0627\u0644)\u060C \u0639\u0628\u0651\u0626 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u062B\u0645 \u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641.</p>
                        <button type="button" id="violation-types-import-download-template" class="btn-secondary btn-sm">
                            <i class="fas fa-file-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0644\u0628 Excel
                        </button>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0641 Excel (.xlsx)</label>
                        <input type="file" id="violation-types-import-file" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="violation-types-import-preview" class="hidden text-sm text-gray-600 max-h-40 overflow-auto border rounded p-2 bg-gray-50"></div>
                    <div class="flex justify-end gap-2 pt-2 border-t">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="violation-types-import-confirm" class="btn-primary" disabled>
                            <i class="fas fa-upload ml-2"></i>\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                        </button>
                    </div>
                </div>
            </div>`,document.body.appendChild(e);let t=[];const s=e.querySelector("#violation-types-import-preview"),a=e.querySelector("#violation-types-import-confirm");e.querySelector("#violation-types-import-download-template")?.addEventListener("click",()=>this.downloadViolationTypesImportTemplate()),e.querySelector("#violation-types-import-file")?.addEventListener("change",async i=>{const o=i.target.files&&i.target.files[0];if(t=[],a.disabled=!0,s.classList.add("hidden"),!!o){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const n=await o.arrayBuffer(),l=XLSX.read(n,{type:"array"}),r=l.Sheets[l.SheetNames[0]],d=XLSX.utils.sheet_to_json(r,{defval:""});t=Array.isArray(d)?d:[],s.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \xAB${Utils.escapeHTML(l.SheetNames[0]||"")}\xBB.</p>`,s.classList.remove("hidden"),a.disabled=t.length===0}catch(n){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",n),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(n.message||""))}}}),a?.addEventListener("click",async()=>{t.length&&(a.disabled=!0,await this.processViolationTypesImportRows(t,e))}),e.addEventListener("click",i=>{i.target===e&&e.remove()})},async processViolationTypesImportRows(e,t){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629.");return}ViolationTypesManager.ensureInitialized(),Array.isArray(AppState.appData.violationTypes)||(AppState.appData.violationTypes=[]);const s=new Date().toISOString();let a=0,i=0,o=0;for(let n=0;n<e.length;n++){const l=e[n]||{},r=String(this._violationTypesImportPick(l,["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639","name","typename","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"])||"").trim();if(!r){o++;continue}const d=String(this._violationTypesImportPick(l,["\u0627\u0644\u0648\u0635\u0641","description","notes"])||"").trim(),m=this._violationTypesImportPick(l,["\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629","fineamount","fine","defaultfine"]),p=this._parseViolationTypeFineForImport(m!==""&&m!==void 0?m:0),v=ViolationTypesManager.getTypeByName(r);v?(v.description=d,v.fineAmount=p,v.updatedAt=s,i++):(AppState.appData.violationTypes.push({id:Utils.generateId("VTYPE"),name:r,description:d,fineAmount:p,isDefault:!1,createdAt:s,updatedAt:s}),a++)}if(ViolationTypesManager.sortTypes(),ViolationTypesManager.ensureViolationsTypeIds(),typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}ViolationTypesManager.persist(!0),t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${a} \u0646\u0648\u0639 \u062C\u062F\u064A\u062F\u060C ${i} \u0645\u062D\u062F\u0651\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C ${o} \u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645.`),this.refreshViolationTypesList()},renderViolationTypesList(){const e=ViolationTypesManager.getAll();return e.length?`
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                            <th>\u0627\u0644\u0648\u0635\u0641</th>
                            <th>\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(t=>{const s=ViolationTypesManager.countUsage(t);return`
                                    <tr data-violation-type-id="${t.id}">
                                        <td class="align-top">
                                            <span class="font-semibold">${Utils.escapeHTML(t.name)}</span>
                                        </td>
                                        <td class="align-top">
                                            ${t.description?`<span class="text-sm text-gray-600">${Utils.escapeHTML(t.description)}</span>`:'<span class="text-sm text-gray-400">\u2014</span>'}
                                        </td>
                                        <td class="align-top font-semibold text-red-700">
                                            ${Number(t.fineAmount||0).toLocaleString("ar-EG")} \u062C.\u0645
                                        </td>
                                        <td class="align-top">
                                            <span class="badge ${t.isDefault?"badge-info":"badge-primary"}">
                                                ${t.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635"}
                                            </span>
                                        </td>
                                        <td class="align-top">${s}</td>
                                        <td class="align-top">
                                            <div class="flex items-center gap-2">
                                                <button class="btn-icon btn-icon-primary" data-action="view-violation-type" data-type-id="${t.id}" title="\u0639\u0631\u0636">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn-icon btn-icon-info" data-action="edit-violation-type" data-type-id="${t.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn-icon btn-icon-danger" data-action="delete-violation-type" data-type-id="${t.id}" title="\u062D\u0630\u0641">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `}).join("")}
                    </tbody>
                </table>
            </div>
        `:`
                <div class="empty-state">
                    <i class="fas fa-tags text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u0631\u064A\u0641 \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</p>
                </div>
            `},bindViolationTypesEvents(){const e=document.getElementById("add-violation-type-btn");e&&(e.onclick=()=>this.openViolationTypeModal());const t=document.getElementById("import-violation-types-btn");t&&(t.onclick=()=>this.showViolationTypesImportModal());const s=document.getElementById("export-violation-types-btn");s&&(s.onclick=()=>this.exportViolationTypesToExcel()),document.querySelectorAll('[data-action="view-violation-type"]').forEach(a=>{a.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.viewViolationType(o)}}),document.querySelectorAll('[data-action="edit-violation-type"]').forEach(a=>{a.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.openViolationTypeModal(o)}}),document.querySelectorAll('[data-action="delete-violation-type"]').forEach(a=>{a.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.deleteViolationType(o)}})},refreshViolationTypesList(){const e=document.getElementById("violation-types-management");e&&(e.innerHTML=this.renderViolationTypesList(),this.bindViolationTypesEvents())},viewViolationType(e){try{if(!e||typeof ViolationTypesManager>"u")return;ViolationTypesManager.ensureInitialized?.();const t=ViolationTypesManager.getTypeById(e);if(!t||!t.name){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}typeof UI<"u"&&typeof UI.showSection=="function"&&UI.showSection("violations");const s=()=>typeof Violations>"u"?!1:(Violations.currentFilters||(Violations.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""}),Violations.currentFilters.violationType=t.name,typeof Violations.switchTab=="function"?Violations.switchTab("all"):typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations.refreshModule=="function"&&Violations.refreshModule(),!0);s()||setTimeout(()=>{s()||setTimeout(()=>s(),600)},250)}catch{Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}},openViolationTypeModal(e=null){const t=e?ViolationTypesManager.getTypeById(e):null;if(e&&!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 480px;">
                <div class="modal-header">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="violation-type-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 *</label>
                            <input type="text" id="violation-type-name" class="form-input" required maxlength="150"
                                value="${t?Utils.escapeHTML(t.name):""}"
                                placeholder="\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <textarea id="violation-type-description" class="form-input" rows="3"
                                placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639">${t?Utils.escapeHTML(t.description||""):""}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629</label>
                            <input type="number" id="violation-type-fine-amount" class="form-input" min="0" step="1"
                                value="${t?Number(t.fineAmount||0):0}"
                                placeholder="\u0645\u062B\u0627\u0644: 500">
                            <p class="text-xs text-gray-500 mt-1">\u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0647\u0630\u0647 \u0627\u0644\u0642\u064A\u0645\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644.</p>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#violation-type-form").addEventListener("submit",async i=>{i.preventDefault();const o=s.querySelector("#violation-type-name"),n=s.querySelector("#violation-type-description"),l=s.querySelector("#violation-type-fine-amount"),r=o?.value.trim()||"",d=n?.value.trim()||"",m=l?.value??"0",p=Number(m),v=Number.isFinite(p)&&p>=0?p:0;if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639"),o?.focus();return}try{t?(ViolationTypesManager.updateType(t.id,{name:r,description:d,fineAmount:v}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")):(ViolationTypesManager.addType({name:r,description:d,fineAmount:v}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")),s.remove(),this.refreshViolationTypesList()}catch(u){Notification.error(u.message)}}),s.addEventListener("click",i=>{i.target===s&&s.remove()})},deleteViolationType(e){if(!e)return;const t=ViolationTypesManager.getTypeById(e);if(!t){Notification.error("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=ViolationTypesManager.countUsage(t),a=s>0?`\u0647\u0646\u0627\u0643 ${s} \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0631\u062A\u0628\u0637 \u0628\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629\u060C \u0644\u0643\u0646 \u0644\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0646\u0648\u0639 \u0645\u062A\u0627\u062D\u0627\u064B \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F.
\u0647\u0644 \u062A\u0631\u063A\u0628 \u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u062D\u0630\u0641 "${t.name}"\u061F`:`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 "${t.name}"\u061F`;confirm(a)&&(async()=>{try{ViolationTypesManager.deleteType(e),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshViolationTypesList()}catch(i){Notification.error(i.message)}})()},normalizeOwner(e){return!e||e==="__default__"?"__default__":String(e)},renderApprovalOwnerOptions(e="__default__"){const t=this.normalizeOwner(e),s=ApprovalCircuits.getUsersList(),a=ApprovalCircuits.listOwners(),i=[];return i.push(`
            <option value="__default__" ${t==="__default__"?"selected":""}>
                \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)
            </option>
        `),s.forEach(o=>{const n=o.id||o.email,l=`${Utils.escapeHTML(o.name||o.email||"")}${o.email?` - ${Utils.escapeHTML(o.email)}`:""}`;i.push(`
                <option value="${Utils.escapeHTML(n)}" ${t===n?"selected":""}>
                    ${l}
                </option>
            `)}),a.filter(o=>o&&o!=="__default__"&&!s.some(n=>n.id===o)).forEach(o=>{const n=ApprovalCircuits.getCircuit(o);i.push(`
                    <option value="${Utils.escapeHTML(o)}" ${t===o?"selected":""}>
                        \u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F (${Utils.escapeHTML(n?.name||o)})
                    </option>
                `)}),i.join("")},renderApprovalStepsPlaceholder(){return`
            <div class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-600">
                <i class="fas fa-layer-group text-2xl text-gray-400 mb-3"></i>
                <p>\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0639\u0644\u0627\u0647 \u062B\u0645 \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u064A \u0643\u0644 \u0645\u0633\u062A\u0648\u0649.</p>
            </div>
        `},updateApprovalCircuitStatusLabel(){const e=document.getElementById("approval-circuit-active-label");if(!e)return;const t=this.normalizeOwner(this.currentApprovalCircuitOwner),s=ApprovalCircuits.getCircuit(t);if(!s||!Array.isArray(s.steps)||s.steps.length===0){e.style.display="none";return}const a=t==="__default__"?null:ApprovalCircuits.getUserById(t),i=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":a?.name||a?.email||`\u0645\u0633\u062A\u062E\u062F\u0645 ${t}`,o=s.steps.length;e.textContent=`${i} \u2022 ${o} \u0645\u0633\u062A\u0648\u0649${o>1?"\u0627\u062A":""}`,e.style.display="inline-flex"},renderApprovalSteps(){const e=document.getElementById("approval-steps-container");if(!e)return;if(!this.currentApprovalCircuitSteps||this.currentApprovalCircuitSteps.length===0){e.innerHTML=this.renderApprovalStepsPlaceholder(),this.updateApprovalCircuitStatusLabel();return}const t=ApprovalCircuits.getUsersList();e.innerHTML=this.currentApprovalCircuitSteps.map((s,a)=>this.renderApprovalStepCard(s,a,t)).join(""),this.updateApprovalCircuitStatusLabel()},renderApprovalStepCard(e,t,s){const a=this.getStepTitle(t),i=Array.isArray(e.userIds)?e.userIds:[],o=s.map(n=>{const l=n.id||n.email,r=`${Utils.escapeHTML(n.name||n.email||"")}${n.email?` (${Utils.escapeHTML(n.email)})`:""}`,d=i.includes(l)?"selected":"";return`<option value="${Utils.escapeHTML(l)}" ${d}>${r}</option>`}).join("");return`
            <div class="approval-step-card border border-gray-200 rounded-lg bg-gray-50 p-4" data-step-index="${t}" data-step-id="${Utils.escapeHTML(e.id||"")}">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700">${a}</h4>
                        <p class="text-xs text-gray-500">\u062D\u062F\u062F \u062F\u0648\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0648\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0645\u062E\u0648\u0644\u064A\u0646 \u0628\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0648\u0649.</p>
                    </div>
                    <button type="button" class="btn-icon btn-icon-danger" data-remove-step-index="${t}" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0648\u0649">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0648\u0649 / \u0627\u0644\u062F\u0648\u0631</label>
                        <input type="text" class="form-input approval-step-name" value="${Utils.escapeHTML(e.name||e.role||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" required>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0648\u0646</label>
                        <select class="form-input approval-step-users" multiple size="4">
                            ${o}
                        </select>
                        <p class="text-xs text-gray-500 mt-1">\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u064A\u0643\u0648\u0646 \u0645\u0633\u0624\u0648\u0644\u0627\u064B \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0648\u0649.</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-4 mt-4">
                    <label class="flex items-center text-sm text-gray-700 gap-2">
                        <input type="checkbox" class="approval-step-required" ${e.required!==!1?"checked":""}>
                        <span>\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u0644\u0632\u0627\u0645\u064A</span>
                    </label>
                    <label class="flex items-center text-sm text-gray-700 gap-2">
                        <input type="checkbox" class="approval-step-safety" ${e.isSafetyOfficer===!0?"checked":""}>
                        <span>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</span>
                    </label>
                </div>
            </div>
        `},getStepTitle(e){return["\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0644","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0646\u064A","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0644\u062B","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0631\u0627\u0628\u0639","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0627\u0645\u0633"][e]||`\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${e+1}`},refreshApprovalOwnerOptions(e="__default__"){const t=document.getElementById("approval-owner-select");t&&(t.innerHTML=this.renderApprovalOwnerOptions(e),t.value=this.normalizeOwner(e))},initializeApprovalCircuitsUI(){const e=document.getElementById("approval-owner-select");if(!e)return;const t=document.getElementById("add-approval-step-btn"),s=document.getElementById("save-approval-circuit-btn"),a=document.getElementById("delete-approval-circuit-btn"),i=document.getElementById("approval-steps-container"),o=this.normalizeOwner(e.value||"__default__");this.currentApprovalCircuitOwner=o,this.loadApprovalCircuitEditor(o),e.addEventListener("change",n=>{const l=this.normalizeOwner(n.target.value);this.currentApprovalCircuitOwner=l,this.loadApprovalCircuitEditor(l)}),t&&t.addEventListener("click",()=>this.addApprovalCircuitStep()),s&&s.addEventListener("click",()=>this.saveApprovalCircuit()),a&&a.addEventListener("click",()=>this.deleteApprovalCircuit()),i&&i.addEventListener("click",n=>{const l=n.target.closest("[data-remove-step-index]");if(l){const r=parseInt(l.getAttribute("data-remove-step-index"),10);Number.isNaN(r)||this.removeApprovalCircuitStep(r)}})},loadApprovalCircuitEditor(e){const t=this.normalizeOwner(e),s=ApprovalCircuits.getCircuit(t),a=document.getElementById("approval-circuit-name"),i=document.getElementById("delete-approval-circuit-btn");s?(this.currentApprovalCircuitId=s.id||null,this.currentApprovalCircuitSteps=Array.isArray(s.steps)?s.steps.map((o,n)=>({id:o.id||Utils.generateId("CSTEP"),name:o.name||o.role||"",userIds:Array.isArray(o.userIds)?o.userIds.filter(Boolean):[],required:o.required!==!1,isSafetyOfficer:o.isSafetyOfficer===!0,order:typeof o.order=="number"?o.order:n})):[],a&&(a.value=s.name||(t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""))):(this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],a&&(a.value=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"")),this.currentApprovalCircuitOwner=t,this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((o,n)=>Object.assign({},o,{order:n})),i&&(i.disabled=!s),this.renderApprovalSteps()},addApprovalCircuitStep(){Array.isArray(this.currentApprovalCircuitSteps)||(this.currentApprovalCircuitSteps=[]),this.currentApprovalCircuitSteps.push({id:Utils.generateId("CSTEP"),name:"",userIds:[],required:!0,isSafetyOfficer:!1,order:this.currentApprovalCircuitSteps.length}),this.renderApprovalSteps()},removeApprovalCircuitStep(e){Array.isArray(this.currentApprovalCircuitSteps)&&(this.currentApprovalCircuitSteps.splice(e,1),this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((t,s)=>Object.assign({},t,{order:s})),this.renderApprovalSteps())},collectApprovalCircuitData(){const e=this.normalizeOwner(this.currentApprovalCircuitOwner),t=document.getElementById("approval-circuit-name"),s=t?t.value.trim():"",a=document.querySelectorAll(".approval-step-card"),i=Array.from(a).map((o,n)=>{const l=o.getAttribute("data-step-id")||Utils.generateId("CSTEP"),r=o.querySelector(".approval-step-name"),d=o.querySelector(".approval-step-users"),m=o.querySelector(".approval-step-required"),p=o.querySelector(".approval-step-safety"),v=r?r.value.trim():"",u=d?Array.from(d.options).filter(E=>E.selected).map(E=>E.value):[];return{id:l,name:v,userIds:u,required:m?m.checked:!0,isSafetyOfficer:p?p.checked:!1,order:n}});return{id:this.currentApprovalCircuitId||Utils.generateId("CIR"),ownerId:e,name:s||(e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""),steps:i,updatedAt:new Date().toISOString()}},saveApprovalCircuit(){const e=this.collectApprovalCircuitData();if(!e.steps||e.steps.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u0649 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.");return}if(e.steps.some(a=>!a.name)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}if(e.steps.some(a=>!Array.isArray(a.userIds)||a.userIds.length===0)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}ApprovalCircuits.saveCircuit(e),this.currentApprovalCircuitId=e.id,this.currentApprovalCircuitSteps=e.steps.map((a,i)=>Object.assign({},a,{order:i})),this.refreshApprovalOwnerOptions(e.ownerId),this.renderApprovalSteps(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")},deleteApprovalCircuit(){const e=this.normalizeOwner(this.currentApprovalCircuitOwner),t=ApprovalCircuits.getCircuit(e);if(!t){Notification.info("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0627\u0631 \u0644\u062D\u0630\u0641\u0647.");return}const s=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":t.name||e;confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${s}"\u061F
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0633\u0627\u0628\u0642\u0629\u060C \u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.`)&&(ApprovalCircuits.deleteCircuit(e),this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],this.refreshApprovalOwnerOptions(e),this.loadApprovalCircuitEditor(e),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."))},renderUsersPermissionsList(){const e=AppState.appData.users||[];return e.length===0?`
                <div class="text-center text-gray-500 py-4">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                </div>
            `:e.map(t=>{const s=this.hasAccessForUser(t,"settings"),a=t.role==="admin"?"badge-danger":t.role==="safety_officer"?"badge-warning":"badge-info",i=t.role==="admin"?"\u0645\u062F\u064A\u0631":t.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645";return`
                <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                    <div class="flex items-center flex-1">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                            ${t.photo?(()=>{const o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t.photo):{canonical:String(t.photo),displaySrc:String(t.photo),needsProxy:!1,proxyFileId:""},n=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"";return`<img src="${Utils.escapeHTML(o.displaySrc)}" alt="${Utils.escapeHTML(t.name)}"${n} class="settings-perm-user-photo w-full h-full rounded-full object-cover">`})():'<i class="fas fa-user text-gray-600"></i>'}
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold">${Utils.escapeHTML(t.name||"")}</div>
                            <div class="text-sm text-gray-600">${Utils.escapeHTML(t.email||"")}</div>
                        </div>
                        <div class="mr-4">
                            <span class="badge ${a}">${i}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="badge ${s?"badge-success":"badge-warning"} mr-3">
                            ${s?'<i class="fas fa-check-circle ml-1"></i> \u0644\u062F\u064A\u0647 \u0635\u0644\u0627\u062D\u064A\u0629':'<i class="fas fa-times-circle ml-1"></i> \u0644\u0627 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629'}
                        </span>
                        <button onclick="Settings.viewUserPermissions('${t.id}')" 
                                class="btn-icon btn-icon-primary" 
                                title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0635\u064A\u0644">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `}).join("")},viewUserPermissions(e){const t=AppState.appData.users.find(n=>n.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=this.hasAccessForUser(t,"settings"),a=t.permissions||{},i=[{key:"dashboard",label:"\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{key:"nearmiss",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629"},{key:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{key:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{key:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{key:"fire-equipment",label:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"},{key:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{key:"contractors",label:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"},{key:"employees",label:"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"},{key:"behavior-monitoring",label:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0627\u062A"},{key:"chemical-safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629"},{key:"daily-observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629"},{key:"iso",label:"\u0646\u0638\u0627\u0645 ISO"},{key:"emergency",label:"\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626"},{key:"users",label:"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"},{key:"settings",label:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"}],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-shield-alt ml-2"></i>
                        \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${Utils.escapeHTML(t.name)}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-semibold text-blue-800">${Utils.escapeHTML(t.name)}</p>
                                    <p class="text-sm text-blue-600">${Utils.escapeHTML(t.email)}</p>
                                </div>
                                <div class="text-left">
                                    <span class="badge ${t.role==="admin"?"badge-danger":t.role==="safety_officer"?"badge-warning":"badge-info"}">
                                        ${t.role==="admin"?"\u0645\u062F\u064A\u0631":t.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-3">\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A:</h3>
                            <div class="grid grid-cols-2 gap-2">
                                ${i.map(n=>{const l=this.hasAccessForUser(t,n.key);return`
                                        <div class="flex items-center justify-between p-2 border rounded ${l?"bg-green-50":"bg-gray-50"}">
                                            <span class="text-sm">${n.label}</span>
                                            ${l?'<i class="fas fa-check-circle text-green-600"></i>':'<i class="fas fa-times-circle text-gray-400"></i>'}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary" onclick="UI.showSection('users'); this.closest('.modal-overlay').remove(); setTimeout(() => Users.editUser('${t.id}'), 500);">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o),o.addEventListener("click",n=>{n.target===o&&o.remove()})},hasAccessForUser(e,t){if(e.role==="admin")return!0;const s=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(e.permissions):e.permissions||{};return s&&s.hasOwnProperty(t)?s[t]===!0:!1},async handleSubmit(e){e.preventDefault();try{const t=document.getElementById("google-apps-script-enabled"),s=document.getElementById("google-apps-script-url"),a=document.getElementById("google-sheets-enabled"),i=document.getElementById("google-sheets-id");if(!t||!s||!a||!i){Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0642\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C");return}AppState.googleConfig.appsScript.enabled=t.checked,AppState.googleConfig.appsScript.scriptUrl=s.value.trim(),AppState.googleConfig.sheets.enabled=a.checked,AppState.googleConfig.sheets.spreadsheetId=i.value.trim();let o=!1;if(typeof window.DataManager<"u"&&window.DataManager.saveGoogleConfig)window.DataManager.saveGoogleConfig()?(o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");else if(typeof window.DataManager<"u"&&window.DataManager.save)try{await window.DataManager.save(),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",n),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}else try{localStorage.setItem("hse_google_config",JSON.stringify(AppState.googleConfig)),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D (\u062D\u0641\u0638 \u0645\u062D\u0644\u064A)")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",n),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+n.message)}if(o&&AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{Loading.show(),await new Promise(l=>setTimeout(l,500));const n=await GoogleIntegration.readFromSheets("Users");Loading.hide(),n&&Array.isArray(n)?Notification.success(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${n.length} \u0633\u062C\u0644`):Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")}catch(n){Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",n),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645:",t),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async testConnection(){Loading.show();try{if(AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl){const t=await Utils.promiseWithTimeout(GoogleIntegration.readFromSheets("Users"),3e4,`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646:
1. \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A
2. \u0635\u062D\u0629 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 (RPC)
3. \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0642\u064A\u0648\u062F \u0639\u0644\u0649 \u0627\u0644\u0634\u0628\u0643\u0629`);Loading.hide(),Notification.success("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0646\u062C\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 "+t.length+" \u0633\u062C\u0644")}else Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629")}catch(e){Loading.hide();const t=e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+t),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644:",e)}},async initializeSheets(){if(!AppState.googleConfig.appsScript.enabled){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u0648\u0644\u0627\u064B");return}if(!AppState.googleConfig.sheets.spreadsheetId){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0648\u0644\u0627\u064B \u0625\u0630\u0627 \u0643\u0627\u0646 \u0645\u0637\u0644\u0648\u0628\u0627\u064B");return}if(confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621:
${"Users, Incidents, NearMiss, PTW, Training, ClinicVisits, Medications, SickLeave, ClinicInventory, FireEquipment, FireEquipmentAssets, FireEquipmentInspections, PPE, Violations, Contractors, Employees, BehaviorMonitoring, ChemicalSafety, DailyObservations, ISODocuments, ISOProcedures, ISOForms, EmergencyAlerts, EmergencyPlans".split(", ").map(t=>`- ${t}`).join(`
`)}`))try{Loading.show(),await GoogleIntegration.initializeSheets(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642:",t),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642: "+t.message)}},getMonthlySafetyDefaultFromDate(){const e=new Date,t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0");return`${t}-${s}-01`},getMonthlySafetyDefaultToDate(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0),s=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${s}-${a}-${i}`},renderMonthlySafetyYearOptions(){const e=new Date().getFullYear();let t="";for(let s=e+1;s>=e-3;s-=1)t+=`<option value="${s}"${s===e?" selected":""}>${s}</option>`;return t},renderMonthlySafetyMonthOptions(){const e=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],t=new Date().getMonth()+1;return e.map((s,a)=>{const i=a+1;return`<option value="${i}"${i===t?" selected":""}>${s}</option>`}).join("")},async generateMonthlySafetyReport(e){if(!this.isCurrentUserAdmin()){const p=typeof Reports<"u"&&Reports.getTranslations?Reports.getTranslations().t("msg.adminOnlyReport"):"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637";Notification.error(p);return}if(typeof Reports>"u"||typeof Reports.downloadMonthlySafetyReport!="function"){Notification.error("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B");return}const t=document.getElementById("monthly-safety-from"),s=document.getElementById("monthly-safety-to"),a=document.getElementById("monthly-safety-site"),i=document.getElementById("monthly-safety-lang"),o=t?t.value:"",n=s?s.value:"",l=a?String(a.value||"").trim():"",r=e||(i?i.value:"ar")||"ar",d=typeof Reports.buildSafetyReportPeriod=="function"?Reports.buildSafetyReportPeriod(o,n):null,{t:m}=Reports.getTranslations?Reports.getTranslations():{t:p=>p};if(!d){Notification.error(m("msg.invalidDateRange"));return}Loading.show(r==="en"?"Preparing monthly safety report...":"\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A...");try{const p=await Reports.downloadMonthlySafetyReport(d,r,l||null);Loading.hide(),p&&Notification.success(r==="en"?"Monthly safety report downloaded":"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0628\u0646\u062C\u0627\u062D")}catch(p){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(p&&p.message?p.message:String(p)))}},async generateReport(e){Loading.show();try{await Reports.generateAndExport(e),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message)}},setupSettingsListeners(){setTimeout(()=>{const e=document.getElementById("save-date-format-btn");e&&e.addEventListener("click",()=>{const i=document.getElementById("date-format-select").value;AppState.dateFormat=i,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const t=document.getElementById("upload-logo-btn"),s=document.getElementById("company-logo-input");t&&s&&t.addEventListener("click",()=>{const i=s.files[0];if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629");return}if(i.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB");return}const o=new FileReader;o.onload=async n=>{let l=n.target.result;try{l=await Settings.compressLogo(l),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+l.length+" \u062D\u0631\u0641)")}catch(d){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",d)}if(AppState.companyLogo=l,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=l,localStorage.setItem("company_logo",l),localStorage.setItem("hse_company_logo",l),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const d=AppState.currentUser||{},m=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:l,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:d.email,name:d.name,role:d.role,permissions:d.permissions}});m&&m.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",m?.message)}catch(d){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",d)}const r=document.getElementById("company-logo-preview");r&&(r.src=AppState.companyLogo,r.style.display="block"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:l}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D")},o.readAsDataURL(i)});const a=document.getElementById("remove-logo-btn");a&&a.addEventListener("click",async()=>{if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const o=AppState.currentUser||{},n=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:o.email,name:o.name,role:o.role,permissions:o.permissions}});n&&n.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",n?.message)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",o)}const i=document.getElementById("company-logo-preview");i&&(i.style.display="none"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),this.load()})},100)}};(function(){"use strict";try{typeof window<"u"&&typeof Settings<"u"&&(window.Settings=Settings,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Settings module loaded and available on window.Settings"))}catch{if(typeof window<"u"&&typeof Settings<"u")try{window.Settings=Settings}catch{}}})();
