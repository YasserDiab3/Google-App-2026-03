const Settings={currentApprovalCircuitOwner:"__default__",async compressLogo(t,e=800,s=800,n=.8){return new Promise((i,o)=>{try{const a=new Image;a.onload=function(){try{let c=a.width,r=a.height;if(c>e||r>s){const b=Math.min(e/c,s/r);c=Math.round(c*b),r=Math.round(r*b)}const f=document.createElement("canvas");f.width=c,f.height=r;const S=f.getContext("2d");S.drawImage(a,0,0,c,r);const d=f.toDataURL("image/jpeg",n);if(d.length>45e3){if(n>.5){const b=f.toDataURL("image/jpeg",.5);if(b.length<=45e3){i(b);return}}if(c>600||r>600){const b=Math.min(600/c,600/r),x=Math.round(c*b),E=Math.round(r*b);f.width=x,f.height=E,S.clearRect(0,0,f.width,f.height),S.drawImage(a,0,0,x,E);const T=f.toDataURL("image/jpeg",.5);i(T);return}}i(d)}catch(c){o(c)}},a.onerror=function(){o(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"))},a.src=t}catch(a){o(a)}})},currentApprovalCircuitId:null,currentApprovalCircuitSteps:[],formSettingsState:null,formSettingsEventsBound:!1,getPostLoginItems(){const t=AppState?.companySettings?.postLoginItems;if(Array.isArray(t))return t.slice();if(typeof t=="string"&&t.trim()!=="")try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}return[]},renderPostLoginItemsList(){const t=document.getElementById("post-login-items-list");if(!t)return;const e=this.getPostLoginItems();if(e.length===0){t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631\xBB \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.</p>';return}const s=e.slice().sort((n,i)=>(n.order??999)-(i.order??999));t.innerHTML=s.map((n,i)=>{const o=Utils.escapeHTML((n.title||"").slice(0,60))||"(\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646)",a=n.durationSeconds!==void 0?n.durationSeconds:10,c=n.active!==!1,r=n.order??i;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-post-login-index="${i}" data-post-login-order="${r}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${o}</span>
                        <span class="text-xs text-gray-500 mr-2">${a} \u062B</span>
                        ${c?'<span class="text-xs text-green-600">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400">\u0645\u0639\u0637\u0651\u0644</span>'}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="post-login-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${i}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="post-login-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${i}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="post-login-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${i}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="post-login-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${i}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},parseHelpContent(t){const e={version:1,enabled:!1,introText:"",qaItems:[]};if(!t)return e;try{const s=typeof t=="string"?JSON.parse(t):t;return!s||typeof s!="object"?e:{version:1,enabled:s.enabled===!0,introText:String(s.introText||"").trim(),qaItems:Array.isArray(s.qaItems)?s.qaItems:[]}}catch{return e}},getHelpContentConfig(){return this.parseHelpContent(AppState?.companySettings?.helpContent)},getHelpContentQaItems(){return this.getHelpContentConfig().qaItems.slice().sort((t,e)=>(t.order??999)-(e.order??999))},setHelpContentConfig(t){AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.helpContent=JSON.stringify(t||{version:1,enabled:!1,introText:"",qaItems:[]})},renderHelpContentQaList(){const t=document.getElementById("help-content-qa-list");if(!t)return;const e=this.getHelpContentQaItems();if(!e.length){t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0626\u0644\u0629 \u0645\u062E\u0635\u0635\u0629. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644\xBB \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0646 \u0627\u0644\u0643\u0648\u062F.</p>';return}t.innerHTML=e.map((s,n)=>{const i=Utils.escapeHTML((s.question||"").slice(0,80))||"(\u0628\u062F\u0648\u0646 \u0633\u0624\u0627\u0644)",o=s.active!==!1;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-help-qa-index="${n}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${i}</span>
                        ${o?'<span class="text-xs text-green-600 mr-2">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400 mr-2">\u0645\u0639\u0637\u0651\u0644</span>'}
                        ${s.moduleId?`<span class="text-xs text-blue-600">\u0645\u0648\u062F\u064A\u0648\u0644: ${Utils.escapeHTML(s.moduleId)}</span>`:""}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="help-qa-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${n}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="help-qa-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${n}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="help-qa-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${n}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="help-qa-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${n}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},async saveHelpContentToBackend(){AppState.companySettings||(AppState.companySettings={});const t=this.getHelpContentConfig();if(this.setHelpContentConfig(t),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),!(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"))return{success:!0};try{const e=AppState.currentUser||{};return await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,profileTeamsUrl:AppState.companySettings.profileTeamsUrl||"",profileWhatsAppUrl:AppState.companySettings.profileWhatsAppUrl||"",address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),helpContent:AppState.companySettings.helpContent||JSON.stringify(t),userData:{email:e.email,name:e.name,role:e.role,permissions:e.permissions}})||{success:!1}}catch(e){return{success:!1,message:e?.message||String(e)}}},initHelpContentTabUI(){const t=this.getHelpContentConfig(),e=document.getElementById("help-content-enabled"),s=document.getElementById("help-content-intro");e&&(e.checked=t.enabled===!0),s&&(s.value=t.introText||""),this.renderHelpContentQaList()},bindHelpContentSettingsEvents(){if(this._helpContentEventsBound){this.initHelpContentTabUI();return}this._helpContentEventsBound=!0;const t=document.getElementById("help-content-qa-form"),e=document.getElementById("help-content-qa-form-title"),s=document.getElementById("help-content-qa-question"),n=document.getElementById("help-content-qa-answer"),i=document.getElementById("help-content-qa-module"),o=document.getElementById("help-content-qa-keywords"),a=document.getElementById("help-content-qa-active"),c=document.getElementById("help-content-qa-list");let r=-1;const f=()=>{t&&t.classList.add("hidden"),r=-1,e&&(e.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),n&&(n.value=""),i&&(i.value=""),o&&(o.value=""),a&&(a.checked=!0)},S=()=>{const d=document.getElementById("help-content-enabled"),b=document.getElementById("help-content-intro"),x=this.getHelpContentConfig();x.enabled=d?d.checked:x.enabled,x.introText=b?b.value.trim():x.introText,this.setHelpContentConfig(x)};this.initHelpContentTabUI(),document.getElementById("help-content-add-qa-btn")?.addEventListener("click",()=>{r=-1,e&&(e.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),n&&(n.value=""),i&&(i.value=""),o&&(o.value=""),a&&(a.checked=!0),t?.classList.remove("hidden")}),document.getElementById("help-content-qa-cancel-btn")?.addEventListener("click",f),document.getElementById("help-content-qa-save-btn")?.addEventListener("click",()=>{const d=s?.value?.trim()||"",b=n?.value?.trim()||"";if(!d||!b){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u0644\u0625\u062C\u0627\u0628\u0629.");return}const x=this.getHelpContentConfig(),E=this.getHelpContentQaItems(),T=E.length?Math.max(...E.map(y=>y.order??0)):0,I={id:r>=0&&E[r]?.id?E[r].id:"qa-"+Date.now(),question:d,answer:b,moduleId:i?.value?.trim()||"",keywords:o?.value?.trim()||"",active:a?a.checked:!0,order:r>=0?E[r].order??r:T+1};r>=0&&r<E.length?E[r]=I:E.push(I),x.qaItems=E,S(),this.setHelpContentConfig(x),this.renderHelpContentQaList(),f(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0624\u0627\u0644 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB \u0644\u0644\u0646\u0634\u0631.")}),c?.addEventListener("click",d=>{const b=d.target.closest(".help-qa-edit-btn"),x=d.target.closest(".help-qa-delete-btn"),E=d.target.closest(".help-qa-up-btn"),T=d.target.closest(".help-qa-down-btn"),I=b?.dataset?.index??x?.dataset?.index??E?.dataset?.index??T?.dataset?.index;if(I===void 0)return;const y=parseInt(I,10),k=this.getHelpContentConfig(),L=this.getHelpContentQaItems(),U=L[y];if(U){if(b){r=y,e&&(e.textContent="\u062A\u0639\u062F\u064A\u0644 \u0633\u0624\u0627\u0644"),s&&(s.value=U.question||""),n&&(n.value=U.answer||""),i&&(i.value=U.moduleId||""),o&&(o.value=U.keywords||""),a&&(a.checked=U.active!==!1),t?.classList.remove("hidden");return}if(x){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u0624\u0627\u0644\u061F"))return;L.splice(y,1),k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList();return}if(E&&y>0){const D=L[y].order??y;L[y].order=L[y-1].order??y-1,L[y-1].order=D,k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList()}if(T&&y<L.length-1){const D=L[y].order??y;L[y].order=L[y+1].order??y+1,L[y+1].order=D,k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList()}}}),document.getElementById("help-content-save-all-btn")?.addEventListener("click",async()=>{S();const d=await this.saveHelpContentToBackend();if(d?.success){if(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D."),typeof DataManager<"u"&&DataManager.loadCompanySettings)try{await DataManager.loadCompanySettings(!0)}catch{}}else Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638: "+(d?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}),document.getElementById("help-content-load-defaults-btn")?.addEventListener("click",()=>{if(!confirm("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u062A\u062D\u0631\u064A\u0631\u061F \u0633\u064A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u0648\u0627\u062C\u0647\u0629 (\u0644\u0645 \u064A\u064F\u062D\u0641\u0638 \u0628\u0639\u062F)."))return;if(typeof Help>"u"||typeof Help.getDefaultQaItems!="function"){Notification.error("\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644.");return}const d=this.getHelpContentConfig();d.enabled=!0,d.qaItems=Help.getDefaultQaItems().map((x,E)=>({id:x.id,question:x.question,answer:x.answer,moduleId:x.moduleId||"",keywords:x.keywords||"",active:!0,order:E+1}));const b=document.getElementById("help-content-enabled");b&&(b.checked=!0),this.setHelpContentConfig(d),this.renderHelpContentQaList(),Notification.info("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u2014 \u0631\u0627\u062C\u0639 \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB.")})},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("settings-section");if(t&&!(typeof Utils>"u")){if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized();const e=this.isCurrentUserAdmin();if(typeof Permissions<"u"&&(Permissions.formSettingsEventsBound=!1,Permissions._formSettingsBindDone=!1),t.innerHTML=`
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
                    <button class="tab-btn" data-tab="help-content" ${e?"":'style="display:none;"'}>
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
                    <button class="tab-btn" data-tab="logs" ${e?"":'style="display:none;"'}>
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
                        <p class="settings-group-subtitle">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 Google Apps Script \u0648\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets</p>
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
                                            \u0631\u0627\u0628\u0637 Web App \u0644\u0640 Google Apps Script (\u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629)
                                        </label>
                                        <input type="url" id="google-apps-script-url" class="form-input"
                                            value="${AppState.googleConfig.appsScript.scriptUrl||""}"
                                            placeholder="https://script.google.com/macros/s/\u2026/exec">
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
                ${e?this.renderCloudStorageSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: Google Drive -->
            <div class="tab-content" id="tab-google-drive">
                ${e?this.renderGoogleDriveSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: Microsoft SharePoint -->
            <div class="tab-content" id="tab-sharepoint">
                ${e?this.renderSharePointSettings():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>

            <!-- Tab Content: \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 -->
            <div class="tab-content" id="tab-system-settings">
                ${this.renderSystemVersionCard()}
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
                ${e&&typeof Permissions?.renderFormSettingsCard=="function"?Permissions.renderFormSettingsCard():'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
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
                        ${e?`
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
                ${e?`
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
                ${e?`
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
                ${e?`
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
        `,this.setupEventListeners(),setTimeout(()=>{this.setupTabsNavigation();const s=document.getElementById("users-permissions-list");s&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:n=>{try{const i=document.createElement("i");i.className="fas fa-user text-gray-600",n.replaceWith(i)}catch{}}})},0),typeof Permissions<"u"&&typeof Permissions.initFormSettingsState=="function"&&Promise.resolve().then(async()=>{try{await Permissions.initFormSettingsState(),e&&document.getElementById("form-settings-card")&&(typeof Permissions.refreshFormSettingsUI=="function"&&Permissions.refreshFormSettingsUI(),typeof Permissions.bindFormSettingsEvents=="function"&&await Permissions.bindFormSettingsEvents())}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0647\u064A\u0626\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s)}}),e&&typeof Permissions<"u"){let s=0;const n=15,i=setInterval(()=>{s++;const o=document.getElementById("form-settings-card");if(o||s>=n)if(clearInterval(i),o&&!Permissions._formSettingsBindDone){Permissions._formSettingsBindDone=!0;try{typeof Permissions.bindFormSettingsEvents=="function"&&(Permissions.bindFormSettingsEvents(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C"))}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",a)}}else!o&&s>=n&&Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 form-settings-card \u0628\u0639\u062F "+n+" \u0645\u062D\u0627\u0648\u0644\u0629")},100)}}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",e),t&&(t.innerHTML=`
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
                `)}}},isCurrentUserAdmin(){if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0631 Permissions.isCurrentUserAdmin:",t)}return(AppState.currentUser?.role||"").toLowerCase()==="admin"},renderSystemVersionCard(){const t=typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion).trim():"\u2014",e=typeof I18n<"u"&&I18n.currentLang==="en"||document.documentElement.lang==="en",s=t==="\u2014"?t:e?`Version${t}`:`V.${t}`;return`
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
            </div>`},setupTabsNavigation(){const t=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-content");t.forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-tab");t.forEach(a=>a.classList.remove("active")),e.forEach(a=>a.classList.remove("active")),n.classList.add("active");const o=document.getElementById(`tab-${i}`);o&&o.classList.add("active"),i==="form-settings"&&this.isCurrentUserAdmin()&&typeof Permissions<"u"&&typeof Permissions.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents().catch(a=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",a)}),i==="help-content"&&this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),i==="notifications"&&this.isCurrentUserAdmin()&&this.ensureEmailSettingsLoaded(!1)})});const s=document.querySelector(".tab-content.active");if(s){const n=s.id.replace("tab-",""),i=document.querySelector(`.tab-btn[data-tab="${n}"]`);i&&(t.forEach(o=>o.classList.remove("active")),i.classList.add("active"))}else{const n=t[0];n&&n.click()}},setupEventListeners(){this.isCurrentUserAdmin()&&typeof BackupUI<"u"&&setTimeout(()=>{BackupUI.init()},500),setTimeout(()=>{const t=document.getElementById("google-settings-form");t&&t.addEventListener("submit",l=>this.handleSubmit(l));const e=document.getElementById("test-connection-btn");e&&e.addEventListener("click",()=>this.testConnection());const s=document.getElementById("sync-data-btn");s&&s.addEventListener("click",()=>GoogleIntegration.syncData({silent:!1,showLoader:!0,notifyOnSuccess:!0,notifyOnError:!0,includeUsersSheet:!0}));const n=document.getElementById("initialize-sheets-btn");n&&n.addEventListener("click",()=>Settings.initializeSheets());const i=document.getElementById("save-all-data-btn");i&&i.addEventListener("click",async()=>{confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u061F
\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0647\u0646\u0627\u0643.`)&&await GoogleIntegration.saveAllToSheets()});const o=document.getElementById("generate-incidents-report-btn");o&&o.addEventListener("click",()=>Settings.generateReport("incidents"));const a=document.getElementById("generate-training-report-btn");a&&a.addEventListener("click",()=>Settings.generateReport("training"));const c=document.getElementById("generate-ptw-report-btn");c&&c.addEventListener("click",()=>Settings.generateReport("ptw"));const r=document.getElementById("generate-full-report-btn");r&&r.addEventListener("click",()=>Settings.generateReport("full"));const f=document.getElementById("generate-monthly-safety-report-ar-btn"),S=document.getElementById("generate-monthly-safety-report-en-btn");f&&f.addEventListener("click",()=>Settings.generateMonthlySafetyReport("ar")),S&&S.addEventListener("click",()=>Settings.generateMonthlySafetyReport("en"));const d=document.getElementById("settings-check-app-update-btn");d&&d.addEventListener("click",async()=>{if(typeof UI<"u"&&typeof UI.updateAppVersionDisplay=="function"&&UI.updateAppVersionDisplay(),typeof UI<"u"&&typeof UI._checkServerVersion=="function"){d.disabled=!0;try{await UI._checkServerVersion(),typeof Notification<"u"&&Notification.info("\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A. \u0625\u0646 \u0648\u064F\u062C\u062F \u0625\u0635\u062F\u0627\u0631 \u0623\u062D\u062F\u062B \u0633\u064A\u0638\u0647\u0631 \u0625\u0634\u0639\u0627\u0631.")}finally{d.disabled=!1}}else typeof Notification<"u"&&Notification.info("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: "+(AppState.appVersion||"\u2014"))});const b=document.getElementById("upload-logo-btn"),x=document.getElementById("company-logo-input"),E=document.getElementById("remove-logo-btn");b&&x&&(b.addEventListener("click",()=>{x.click()}),x.addEventListener("change",async l=>{const p=l.target.files[0];if(!p)return;if(p.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}const m=new FileReader;m.onload=async v=>{let u=v.target.result;try{u=await Settings.compressLogo(u),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+u.length+" \u062D\u0631\u0641)")}catch(g){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",g)}if(AppState.companyLogo=u,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=u,localStorage.setItem("company_logo",u),localStorage.setItem("hse_company_logo",u),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const g=AppState.currentUser||{},h=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:u,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:g.email,name:g.name,role:g.role,permissions:g.permissions}});if(h&&h.success)Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631")}catch(A){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",A)}},100);else{const A=h?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",A),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+A)}}catch(g){const h=g?.message||g?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",g),Notification.error("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+h)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:u}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),Settings.load()},m.onerror=()=>{Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0635\u0648\u0631\u0629")},m.readAsDataURL(p)})),E&&E.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0632\u0627\u0644\u0629 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const l=AppState.currentUser||{},p=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:l.email,name:l.name,role:l.role,permissions:l.permissions}});p&&p.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",p?.message)}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631"),Settings.load()}});const T=document.getElementById("date-format-select"),I=document.getElementById("save-date-format-btn");I&&T&&I.addEventListener("click",()=>{AppState.dateFormat=T.value,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const y=document.getElementById("wh-total-override"),k=document.getElementById("wh-hours-per-day"),L=document.getElementById("wh-days-per-month"),U=document.getElementById("wh-months-per-year"),D=document.getElementById("wh-include-contractors"),tt=document.getElementById("wh-multiplier-trir"),et=document.getElementById("wh-multiplier-afr"),st=document.getElementById("wh-multiplier-far"),it=document.getElementById("wh-multiplier-sr"),at=document.getElementById("wh-multiplier-ir"),rt=document.getElementById("save-work-hours-settings-btn");(()=>{try{if(y&&(y.value=localStorage.getItem("hse_total_work_hours")||""),k&&(k.value=localStorage.getItem("hse_hours_per_day")||""),L&&(L.value=localStorage.getItem("hse_work_days_per_month")||""),U&&(U.value=localStorage.getItem("hse_work_months_per_year")||""),tt&&(tt.value=localStorage.getItem("hse_multiplier_trir")||""),et&&(et.value=localStorage.getItem("hse_multiplier_afr")||""),st&&(st.value=localStorage.getItem("hse_multiplier_far")||""),it&&(it.value=localStorage.getItem("hse_multiplier_sr")||""),at&&(at.value=localStorage.getItem("hse_multiplier_ir")||""),D){const l=localStorage.getItem("hse_work_hours_include_contractors");l===null||String(l).trim()===""?D.checked=!0:D.checked=l!=="0"&&String(l).toLowerCase()!=="false"&&String(l).toLowerCase()!=="no"}}catch(l){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0628\u0626\u0629 \u062D\u0642\u0648\u0644 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",l)}})(),rt&&rt.addEventListener("click",()=>{try{const l=y&&String(y.value).trim();if(!l)localStorage.removeItem("hse_total_work_hours");else{const m=parseFloat(l.replace(/,/g,""));Number.isFinite(m)&&m>0?localStorage.setItem("hse_total_work_hours",String(m)):localStorage.removeItem("hse_total_work_hours")}const p=(m,v)=>{if(!v)return;const u=String(v.value).trim();if(u===""){localStorage.removeItem(m);return}const g=parseFloat(u.replace(/,/g,""));Number.isFinite(g)&&g>0?localStorage.setItem(m,String(g)):localStorage.removeItem(m)};p("hse_hours_per_day",k),p("hse_work_days_per_month",L),p("hse_work_months_per_year",U),p("hse_multiplier_trir",tt),p("hse_multiplier_afr",et),p("hse_multiplier_far",st),p("hse_multiplier_sr",it),p("hse_multiplier_ir",at),localStorage.setItem("hse_work_hours_include_contractors",D&&D.checked?"1":"0"),typeof Dashboard<"u"&&typeof Dashboard.updateKPIs=="function"&&Dashboard.updateKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.updateAllKPIs=="function"&&SafetyPerformanceKPIs.updateAllKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.queueScorecardRefresh=="function"&&SafetyPerformanceKPIs.queueScorecardRefresh(!0),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u062F\u064A\u062B \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645")}catch(l){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",l),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644")}});const G=document.getElementById("company-name-input"),W=document.getElementById("company-name-font-size-input"),X=document.getElementById("company-secondary-name-input"),J=document.getElementById("company-secondary-name-font-size-input"),$=document.getElementById("company-secondary-name-color-input"),_=document.getElementById("company-secondary-name-color-text-input"),ct=document.getElementById("form-version-input"),dt=document.getElementById("clinic-monthly-visits-threshold-input"),pt=document.getElementById("employee-import-hire-months-input"),mt=document.getElementById("profile-teams-url-input"),ut=document.getElementById("profile-whatsapp-url-input"),B=document.getElementById("ppe-eligibility-rules-container"),gt=document.getElementById("ppe-add-rule-btn"),ft=document.getElementById("ppe-download-template-btn"),yt=document.getElementById("ppe-import-rules-btn"),z=document.getElementById("ppe-rules-import-file"),bt=document.getElementById("save-company-settings-btn"),M={items:[],rules:[]},Bt=l=>{let p=[];if(!l)return[];try{let m=l;if(typeof l=="string"&&(m=l.trim()?JSON.parse(l):[]),!Array.isArray(m))return[];p=m.filter(Boolean)}catch{return[]}return p.map(function(m){if(!m||typeof m!="object")return null;const v=String(m.equipmentType||m.itemName||"").trim();let u=parseInt(m.months,10);const g=parseInt(m.days,10)||0;return(isNaN(u)||u<0)&&(u=0),u=Math.min(120,u),u<1&&g>0&&(u=Math.min(120,Math.max(1,Math.ceil(g/30)))),v?{equipmentType:v,months:u,days:0}:null}).filter(Boolean)},Ut=l=>{const p=(l||"").trim(),m=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u2014</option>'];return M.items.forEach(v=>{const u=(v||"").toString(),g=Utils.escapeHTML(u),h=u.trim()===p?" selected":"";m.push(`<option value="${g}"${h}>${g}</option>`)}),m.join("")},Q=()=>{if(!B)return;const l=B.scrollTop||0,p=window.scrollY||window.pageYOffset||0,m=u=>`
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
                                    ${u}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;if(!M.rules.length){B.innerHTML=m(`
                        <tr>
                            <td colspan="4" class="px-4 py-10 text-center text-sm text-slate-500 bg-gradient-to-b from-slate-50 to-white">
                                <i class="fas fa-table text-2xl text-teal-300 mb-2 block"></i>
                                \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0628\u0639\u062F. \u0627\u0636\u063A\u0637 <strong class="text-teal-700">\xAB\u0625\u0636\u0627\u0641\u0629 \u0635\u0641\xBB</strong> \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u0648\u0639\u062F\u062F \u0627\u0644\u0634\u0647\u0648\u0631\u060C \u0648\u0628\u0639\u062F\u0647\u0627 <strong class="text-teal-700">\xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB</strong>.
                            </td>
                        </tr>
                    `),B.scrollTop=l,window.scrollTo({top:p});return}const v=M.rules.map((u,g)=>{const h=Ut(u.equipmentType),A=Math.max(0,Math.min(120,parseInt(u.months,10)||0));return`
                    <tr class="ppe-rule-row hover:bg-blue-50/50 transition-colors" data-index="${g}">
                        <td class="px-3 py-3 text-center text-slate-500 font-semibold">${g+1}</td>
                        <td class="px-3 py-3 align-middle min-w-[10rem]">
                            <select class="form-input ppe-rule-item w-full text-sm border-blue-200/80 focus:ring-blue-500">${h}</select>
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
                    </tr>`}).join("");B.innerHTML=m(v),B.scrollTop=l,window.scrollTo({top:p}),B.querySelectorAll(".ppe-rule-remove").forEach((u,g)=>{u.addEventListener("click",()=>{M.rules.splice(g,1),Q()})}),B.querySelectorAll(".ppe-rule-edit").forEach((u,g)=>{u.addEventListener("click",()=>{const h=B.querySelector(`.ppe-rule-row[data-index="${g}"]`);if(!h)return;h.classList.add("bg-blue-100","ring-1","ring-blue-300");const A=h.querySelector(".ppe-rule-item"),C=h.querySelector(".ppe-rule-months");A?A.focus():C&&C.focus(),setTimeout(()=>h.classList.remove("bg-blue-100","ring-1","ring-blue-300"),1200)})})},Mt=()=>{if(!B)return[];const l=Array.from(B.querySelectorAll(".ppe-rule-row")),p=new Set,m=[];return l.forEach(v=>{const u=v.querySelector(".ppe-rule-item"),g=v.querySelector(".ppe-rule-months"),h=(u?.value||"").trim();if(!h||p.has(h))return;let A=parseInt(g?.value,10);isNaN(A)||A<1||(A=Math.min(120,A),p.add(h),m.push({equipmentType:h,months:A,days:0}))}),m},Dt=()=>{if(!B)return Array.isArray(M.rules)?[...M.rules]:[];const l=Array.from(B.querySelectorAll(".ppe-rule-row"));return l.length?l.map(p=>{const m=p.querySelector(".ppe-rule-item"),v=p.querySelector(".ppe-rule-months"),u=(m?.value||"").trim();let g=parseInt(v?.value,10);return(isNaN(g)||g<1)&&(g=12),g=Math.min(120,g),{equipmentType:u,months:g,days:0}}):Array.isArray(M.rules)?[...M.rules]:[]},ht=l=>{const p=[],m=new Set;return(Array.isArray(l)?l:[]).forEach(v=>{if(!v||typeof v!="object")return;const u=String(v.equipmentType||v.itemName||v["\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641"]||v.\u0627\u0644\u0635\u0646\u0641||"").trim();let g=parseInt(v.months??v.\u0627\u0644\u0634\u0647\u0648\u0631??v.months,10);!u||m.has(u)||isNaN(g)||g<1||(g=Math.min(120,g),m.add(u),p.push({equipmentType:u,months:g,days:0}))}),p},_t=l=>{const p=String(l||"").split(/\r?\n/).map(u=>u.trim()).filter(Boolean);if(!p.length)return[];const v=p.filter((u,g)=>g!==0||!/الصنف|نوع|months|month|الشهور/i.test(u)).map(u=>{const g=u.includes("	")?"	":",",h=u.split(g).map(A=>A.trim()).filter(Boolean);return h.length<2?null:{equipmentType:h[0],months:h[1]}}).filter(Boolean);return ht(v)},$t=async l=>{if(!l)return;const p=(l.name||"").toLowerCase();let m=[];if(p.endsWith(".xlsx")||p.endsWith(".xls")){if(typeof XLSX>"u"){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0642\u0631\u0627\u0621\u0629 Excel \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0633\u062A\u062E\u062F\u0645 CSV \u0623\u0648 \u0641\u0639\u0651\u0644 \u0645\u0643\u062A\u0628\u0629 XLSX.");return}const v=await l.arrayBuffer(),u=XLSX.read(v,{type:"array"}),g=u.SheetNames&&u.SheetNames[0];if(!g){Notification.error("\u0645\u0644\u0641 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0623\u0648\u0631\u0627\u0642 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const h=u.Sheets[g],A=XLSX.utils.sheet_to_json(h,{defval:""});m=ht(A)}else{const v=await l.text();m=_t(v)}if(!m.length){Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628: \u0627\u0644\u0635\u0646\u0641,\u0627\u0644\u0634\u0647\u0648\u0631");return}M.rules=m,Q(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${m.length} \u0642\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D.`)},Nt=async()=>{let l=[];try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const p=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});p&&p.success&&Array.isArray(p.data)&&(l=p.data.map(m=>(m&&(m.itemName||m.name)||"").toString().trim()).filter(Boolean))}}catch{l=[]}if(!l.length){const p=AppState.appData&&AppState.appData.ppe||[];l=[...new Set(p.map(m=>(m.equipmentType||"").toString().trim()).filter(Boolean))]}l.length||(l=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"]),M.items=Array.from(new Set(l)).sort((p,m)=>p.localeCompare(m,"ar"))};(async()=>(M.rules=Bt(AppState.companySettings?.ppeEligibilityRules),await Nt(),Q()))(),gt&&gt.addEventListener("click",()=>{M.rules=Dt(),M.rules.push({equipmentType:"",months:12,days:0}),Q();const l=Array.from(B?.querySelectorAll(".ppe-rule-row")||[]),p=l[l.length-1],m=p?p.querySelector(".ppe-rule-item"):null;m&&typeof m.focus=="function"&&setTimeout(()=>m.focus(),0)}),ft&&ft.addEventListener("click",()=>{const p="\uFEFF"+[["\u0627\u0644\u0635\u0646\u0641","\u0627\u0644\u0634\u0647\u0648\u0631"],["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","12"],["\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","6"]].map(g=>g.join(",")).join(`
`),m=new Blob([p],{type:"text/csv;charset=utf-8;"}),v=URL.createObjectURL(m),u=document.createElement("a");u.href=v,u.download="ppe-eligibility-template.csv",document.body.appendChild(u),u.click(),u.remove(),URL.revokeObjectURL(v)}),yt&&z&&(yt.addEventListener("click",()=>z.click()),z.addEventListener("change",async()=>{const l=z.files&&z.files[0];try{await $t(l)}catch(p){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(p?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{z.value=""}}));const vt=document.getElementById("reset-company-name-btn");$&&_&&($.addEventListener("input",()=>{_.value=$.value}),_.addEventListener("input",()=>{const l=_.value.trim();/^#[0-9A-Fa-f]{6}$/.test(l)&&($.value=l)})),bt&&G&&bt.addEventListener("click",async()=>{const l=G.value.trim();if(!l){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629.");return}const p=X?X.value.trim():"",m=ct&&ct.value.trim()||"1.0";let v=16;if(W){const w=parseInt(W.value,10);!isNaN(w)&&w>=8&&w<=72&&(v=w)}let u=14;if(J){const w=parseInt(J.value,10);!isNaN(w)&&w>=8&&w<=72&&(u=w)}let g="#6B7280";_&&_.value.trim()?g=_.value.trim():$&&(g=$.value);let h=10;if(dt){const w=parseInt(dt.value,10);!isNaN(w)&&w>=1&&w<=1e3&&(h=w)}let A=3;if(pt){const w=parseInt(pt.value,10);!isNaN(w)&&w>=1&&w<=120&&(A=w)}const C=mt?mt.value.trim():"",V=ut?ut.value.trim():"";if(B){const w=Array.from(B.querySelectorAll(".ppe-rule-row"));for(const R of w){const Tt=(R.querySelector(".ppe-rule-item")?.value||"").trim(),lt=R.querySelector(".ppe-rule-months")?.value,Z=parseInt(lt,10);if(Tt&&(isNaN(Z)||Z<1)){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0635\u0627\u0644\u062D (\u0645\u0646 1 \u0625\u0644\u0649 120) \u0644\u0643\u0644 \u0635\u0646\u0641 \u0645\u062D\u062F\u062F \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629.");return}if(!Tt&&lt!==""&&lt!==void 0&&!isNaN(Z)&&Z>=1){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641 \u0644\u0643\u0644 \u0635\u0641 \u0641\u064A\u0647 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.");return}}}const nt=Mt(),Y=JSON.stringify(nt);AppState.companySettings=Object.assign({},AppState.companySettings,{name:l,secondaryName:p,formVersion:m,nameFontSize:v,secondaryNameFontSize:u,secondaryNameColor:g,clinicMonthlyVisitsAlertThreshold:h,employeeImportHireMonths:A,profileTeamsUrl:C,profileWhatsAppUrl:V,ppeEligibilityRules:Y}),DataManager.saveCompanySettings();let ot=!0;if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const w=AppState.currentUser||{},R=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:l,secondaryName:p,formVersion:m,nameFontSize:v,secondaryNameFontSize:u,secondaryNameColor:g,clinicMonthlyVisitsAlertThreshold:h,employeeImportHireMonths:A,profileTeamsUrl:C,profileWhatsAppUrl:V,ppeEligibilityRules:Y,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:w.email,name:w.name,role:w.role,permissions:w.permissions}});R&&R.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",R?.message),ot=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(R?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(w){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",w),ot=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0627\u062A\u0635\u0627\u0644/\u062E\u0627\u062F\u0645): "+(w?.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."))}ot&&(typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638")}catch(w){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",w)}},100),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),Settings.load())}),AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.postLoginItems)||(AppState.companySettings.postLoginItems=Settings.getPostLoginItems()),Settings.renderPostLoginItemsList();const St=document.getElementById("post-login-items-list"),xt=document.getElementById("post-login-add-item-btn"),O=document.getElementById("post-login-item-form"),j=document.getElementById("post-login-form-title"),N=document.getElementById("post-login-item-title"),F=document.getElementById("post-login-item-body"),q=document.getElementById("post-login-item-duration"),H=document.getElementById("post-login-item-active"),It=document.getElementById("post-login-item-save-btn"),wt=document.getElementById("post-login-item-cancel-btn");let P=-1;const Et=()=>{O&&O.classList.add("hidden"),P=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),N&&(N.value=""),F&&(F.value=""),q&&(q.value="10"),H&&(H.checked=!0)},K=async()=>{if(AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=Settings.getPostLoginItems(),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const l=AppState.currentUser||{},p={name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),userData:{email:l.email,name:l.name,role:l.role,permissions:l.permissions}};await GoogleIntegration.sendToAppsScript("saveCompanySettings",p)}catch(l){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062F\u062E\u0648\u0644:",l)}};xt&&xt.addEventListener("click",()=>{P=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),N&&(N.value=""),F&&(F.value=""),q&&(q.value="10"),H&&(H.checked=!0),O&&O.classList.remove("hidden")}),wt&&wt.addEventListener("click",Et),It&&N&&F&&It.addEventListener("click",async()=>{const l=N.value.trim(),p=F.value.trim(),m=parseInt(q?.value,10),v=H?H.checked:!0;if(!l){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646.");return}const g=Settings.getPostLoginItems().slice().sort((A,C)=>(A.order??999)-(C.order??999)),h=g.length?Math.max(...g.map(A=>A.order??0)):0;P>=0&&P<g.length?g[P]={title:l,body:p,durationSeconds:isNaN(m)?10:Math.min(120,Math.max(0,m)),order:g[P].order??P,active:v}:g.push({title:l,body:p,durationSeconds:isNaN(m)?10:Math.min(120,Math.max(0,m)),order:h+1,active:v}),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=g,await K(),Et(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0635\u0631.")}),St&&St.addEventListener("click",async l=>{const p=l.target.closest(".post-login-edit-btn"),m=l.target.closest(".post-login-delete-btn"),v=l.target.closest(".post-login-up-btn"),u=l.target.closest(".post-login-down-btn"),g=p?.dataset?.index??m?.dataset?.index??v?.dataset?.index??u?.dataset?.index;if(g===void 0)return;const h=parseInt(g,10),C=Settings.getPostLoginItems().slice().sort((nt,Y)=>(nt.order??999)-(Y.order??999)),V=C[h];if(V){if(p){P=h,j&&(j.textContent="\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0635\u0631"),N&&(N.value=V.title||""),F&&(F.value=V.body||""),q&&(q.value=String(V.durationSeconds??10)),H&&(H.checked=V.active!==!1),O&&O.classList.remove("hidden");return}if(m){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631\u061F"))return;C.splice(h,1),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await K(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631.");return}if(v&&h>0){[C[h-1].order,C[h].order]=[C[h].order,C[h-1].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await K(),Settings.renderPostLoginItemsList();return}u&&h<C.length-1&&([C[h].order,C[h+1].order]=[C[h+1].order,C[h].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await K(),Settings.renderPostLoginItemsList())}}),this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),vt&&G&&vt.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companySettings=Object.assign({},AppState.companySettings,{name:DEFAULT_COMPANY_NAME,nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280"}),G.value=DEFAULT_COMPANY_NAME,X&&(AppState.companySettings.secondaryName="",X.value=""),W&&(W.value="16"),J&&(J.value="14"),$&&($.value="#6B7280"),_&&(_.value="#6B7280"),DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const l=AppState.currentUser||{},p=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:DEFAULT_COMPANY_NAME,secondaryName:"",formVersion:"1.0",nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:l.email,name:l.name,role:l.role,permissions:l.permissions}});p&&p.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",p?.message)}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",l)}typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629")}catch(l){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",l)}},100),Notification.success("\u062A\u0645\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),Settings.load()}});const At=document.getElementById("view-activity-log-btn");At&&At.addEventListener("click",()=>{UserActivityLog.showModal()});const Lt=document.getElementById("view-user-versions-btn");Lt&&Lt.addEventListener("click",()=>{typeof UserVersionsAdmin<"u"&&UserVersionsAdmin.open?UserVersionsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const Ct=document.getElementById("view-client-errors-btn");Ct&&Ct.addEventListener("click",()=>{typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const kt=document.getElementById("open-client-errors-section-btn");if(kt&&kt.addEventListener("click",()=>{typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection("client-errors"):typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():location.hash="#client-errors"}),this.isCurrentUserAdmin()&&typeof Permissions?.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents(),this.isCurrentUserAdmin()){this._emailSettingsUiReady=!1,this.bindEmailSettingsEvents();const l=document.getElementById("tab-notifications");l&&l.classList.contains("active")&&this.ensureEmailSettingsLoaded(!1)}this.bindViolationTypesEvents(),this.initializeApprovalCircuitsUI(),this.bindCloudStorageSettingsEvents()},100)},ensureEmailSettingsLoaded(t){return!this.isCurrentUserAdmin()||!document.getElementById("email-settings-modules-list")?null:this._emailSettingsLoadingPromise&&!t?this._emailSettingsLoadingPromise:(this._emailSettingsLoadingPromise=this.loadEmailSettingsUI({force:!!t}).catch(e=>{}).finally(()=>{this._emailSettingsLoadingPromise=null}),this._emailSettingsLoadingPromise)},applyEmailSettingsDraftToUI(t){this._emailSettingsDraft=t||(typeof EmailDispatch<"u"?EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}}),this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const e=document.getElementById("email-settings-global-enabled"),s=document.getElementById("email-settings-default-recipients");e&&(e.checked=!!this._emailSettingsDraft.globalEnabled),s&&(s.value=""),this.renderEmailDefaultChips(),this.renderEmailGroupFilters(),this.renderEmailStatusFilters(),this.updateEmailSettingsStatusBanner(),this.renderEmailStatsStrip(),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||"")},async loadEmailSettingsUI(t){const s=!!(t||{}).force;if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsGroupFilter=this._emailSettingsGroupFilter||"all",this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const i=document.getElementById("email-settings-sync-badge");i&&(i.hidden=!1,i.textContent="\u0645\u0632\u0627\u0645\u0646\u0629\u2026");const o=typeof EmailDispatch<"u"?EmailDispatch.getCachedSettings()||EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}};this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1);const a=document.getElementById("email-settings-modules-summary"),c=a?a.textContent:"";a&&(a.textContent=(c||"\u2014")+" \xB7 \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629\u2026");try{let r=o;if(typeof EmailDispatch<"u")r=await EmailDispatch.loadSettings(s);else if(typeof GoogleIntegration<"u"){const f=await GoogleIntegration.sendToAppsScript("getEmailSettings",{__timeoutMs:25e3});r=f&&f.data?f.data:o}if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(r||o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1),this._emailSettingsUiReady=!0,i&&(i.textContent="\u0645\u062D\u062F\u0651\u062B",setTimeout(()=>{i&&(i.hidden=!0)},1200))}catch{this._emailSettingsHydrating=!1,a&&(a.textContent="\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0639\u0631\u0636 \u0645\u062D\u0644\u064A \u0645\u0624\u0642\u062A"),i&&(i.textContent="\u0645\u062D\u0644\u064A",i.hidden=!1),Notification?.warning?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u0644\u064A \u0645\u0624\u0642\u062A.")}},parseEmailListText(t){return String(t||"").split(/[,;\s]+/).map(e=>e.trim().toLowerCase()).filter(e=>e.includes("@"))},getEmailDefaultRecipientsList(){const t=this._emailSettingsDraft||{};return Array.isArray(t.defaultRecipients)?t.defaultRecipients.slice():[]},setEmailDefaultRecipientsList(t){this._emailSettingsDraft||(this._emailSettingsDraft={modules:{}});const e=[],s=new Set;(t||[]).forEach(n=>{const i=String(n||"").trim().toLowerCase();!i.includes("@")||s.has(i)||(s.add(i),e.push(i))}),this._emailSettingsDraft.defaultRecipients=e.slice(0,50),this.renderEmailDefaultChips(),this.renderEmailStatsStrip(),this.setEmailSettingsDirty(!0)},addEmailDefaultRecipientsFromInput(){const t=document.getElementById("email-settings-default-recipients");if(!t)return;const e=this.parseEmailListText(t.value);if(!e.length)return;const s=this.getEmailDefaultRecipientsList().concat(e);this.setEmailDefaultRecipientsList(s),t.value="",t.focus()},renderEmailDefaultChips(){const t=document.getElementById("email-settings-default-chips");if(!t)return;const e=this.getEmailDefaultRecipientsList();if(!e.length){t.innerHTML='<span class="email-settings-chip email-settings-chip-muted">\u0644\u0627 \u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0628\u0639\u062F \u2014 \u0623\u0636\u0641 \u0625\u064A\u0645\u064A\u0644\u0627\u064B \u0628\u0627\u0644\u0623\u0633\u0641\u0644</span>';return}t.innerHTML=e.map(s=>`<span class="email-settings-chip" dir="ltr">
                ${Utils.escapeHTML(s)}
                <button type="button" class="email-settings-chip-x" data-email-chip="${Utils.escapeHTML(s)}" title="\u062D\u0630\u0641" aria-label="\u062D\u0630\u0641 ${Utils.escapeHTML(s)}">&times;</button>
            </span>`).join("")},renderEmailStatsStrip(){const t=document.getElementById("email-settings-stats");if(!t||!this._emailSettingsDraft)return;const e=this._emailSettingsDraft.modules||{},s=Object.keys(e),n=s.filter(r=>e[r].enabled).length,i=s.filter(r=>e[r].enabled&&e[r].manualSend).length,o=s.filter(r=>e[r].enabled&&e[r].autoSend).length,a=this.getEmailDefaultRecipientsList().length,c=!!this._emailSettingsDraft.globalEnabled;t.innerHTML=`
            <div class="email-stat-card${c?" is-hot":""}"><span class="email-stat-num">${c?"ON":"OFF"}</span><span class="email-stat-label">\u0627\u0644\u0646\u0638\u0627\u0645</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${n}</span><span class="email-stat-label">\u0645\u0641\u0639\u0651\u0644</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${i}</span><span class="email-stat-label">\u064A\u062F\u0648\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${o}</span><span class="email-stat-label">\u062A\u0644\u0642\u0627\u0626\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${a}</span><span class="email-stat-label">\u0645\u0633\u062A\u0644\u0645\u0648\u0646</span></div>
        `},setEmailSettingsDirty(t){if(this._emailSettingsHydrating&&t)return;this._emailSettingsDirty=!!t;const e=document.getElementById("email-settings-dirty-hint"),s=document.getElementById("email-settings-sticky-bar");e&&(e.hidden=!t),s&&s.classList.toggle("is-dirty",!!t)},updateEmailSettingsStatusBanner(){const e=!!(this._emailSettingsDraft||{}).globalEnabled||!!document.getElementById("email-settings-global-enabled")?.checked,s=document.getElementById("email-settings-status-banner"),n=document.getElementById("email-settings-status-title"),i=document.getElementById("email-settings-status-hint");s&&s.classList.toggle("is-on",e),n&&(n.textContent=e?"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0641\u0639\u0651\u0644":"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u062A\u0648\u0642\u0641"),i&&(i.textContent=e?"\u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0641\u0639\u0651\u0644\u0629 \u064A\u062F\u0648\u064A\u0627\u064B. \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u064A\u0639\u0645\u0644 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638 \u0625\u0646 \u0643\u0627\u0646 \u0645\u0641\u0639\u0651\u0644\u0627\u064B.":"\u0639\u0646\u062F \u0627\u0644\u0625\u064A\u0642\u0627\u0641: \u0644\u0627 \u0632\u0631 \u064A\u062F\u0648\u064A \u0648\u0644\u0627 \u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."),this.renderEmailStatsStrip()},updateEmailModulesSummary(){const t=document.getElementById("email-settings-modules-summary");if(!t||!this._emailSettingsDraft)return;const e=this._emailSettingsDraft.modules||{},s=Object.keys(e),n=s.filter(a=>e[a].enabled).length,i=s.filter(a=>e[a].enabled&&e[a].manualSend).length,o=s.filter(a=>e[a].enabled&&e[a].autoSend).length;t.textContent=`${n} \u0645\u0641\u0639\u0651\u0644 \u0645\u0646 ${s.length} \xB7 \u064A\u062F\u0648\u064A ${i} \xB7 \u062A\u0644\u0642\u0627\u0626\u064A ${o}`,this.renderEmailStatsStrip()},renderEmailGroupFilters(){const t=document.getElementById("email-settings-group-filters");if(!t||!this._emailSettingsDraft)return;const e=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},s=this._emailSettingsDraft.modules||{},n={all:Object.keys(s).length};Object.keys(s).forEach(a=>{const c=s[a].group||"ops";n[c]=(n[c]||0)+1});const i=this._emailSettingsGroupFilter||"all",o=[{id:"all",label:"\u0627\u0644\u0643\u0644"}].concat(Object.keys(e).filter(a=>n[a]).map(a=>({id:a,label:e[a]})));t.innerHTML=o.map(a=>`
            <button type="button" class="email-settings-group-chip${i===a.id?" is-active":""}" data-email-group="${Utils.escapeHTML(a.id)}">
                ${Utils.escapeHTML(a.label)}
                <span class="email-settings-group-count">${n[a.id]||0}</span>
            </button>
        `).join("")},renderEmailStatusFilters(){const t=document.getElementById("email-settings-status-filters");if(!t)return;const e=this._emailSettingsStatusFilter||"all",s=[{id:"all",label:"\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"},{id:"enabled",label:"\u0645\u0641\u0639\u0651\u0644"},{id:"disabled",label:"\u0645\u062A\u0648\u0642\u0641"},{id:"manual",label:"\u064A\u062F\u0648\u064A"},{id:"auto",label:"\u062A\u0644\u0642\u0627\u0626\u064A"}];t.innerHTML=s.map(n=>`
            <button type="button" class="email-settings-status-chip${e===n.id?" is-active":""}" data-email-status="${n.id}">
                ${n.label}
            </button>
        `).join("")},renderEmailModulesList(t){const e=document.getElementById("email-settings-modules-list");if(!e||!this._emailSettingsDraft)return;const s=String(t||"").trim().toLowerCase(),n=this._emailSettingsGroupFilter||"all",i=this._emailSettingsStatusFilter||"all",o=this._emailSettingsDraft.modules||{},a=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},c=Object.keys(o).sort((S,d)=>{const b=o[S].group||"ops",x=o[d].group||"ops";return b!==x?b.localeCompare(x):String(o[S].labelAr||S).localeCompare(String(o[d].labelAr||d),"ar")});let r="",f="";c.forEach(S=>{const d=o[S],b=d.labelAr||S,x=d.group||"ops";if(n!=="all"&&x!==n||s&&!b.toLowerCase().includes(s)&&!S.toLowerCase().includes(s)||i==="enabled"&&!d.enabled||i==="disabled"&&d.enabled||i==="manual"&&!(d.enabled&&d.manualSend)||i==="auto"&&!(d.enabled&&d.autoSend))return;x!==f&&(f=x,r+=`<div class="email-settings-group-title">${Utils.escapeHTML(a[x]||x)}</div>`);const E=(d.recipients||[]).join(", "),T=!!d.enabled,I=!!(d.recipients&&d.recipients.length);r+=`
                <div class="email-module-row${T?" is-enabled":""}" data-module-key="${Utils.escapeHTML(S)}">
                    <div class="email-module-row-top">
                        <div class="email-module-identity">
                            <span class="email-module-name">${Utils.escapeHTML(b)}</span>
                            <span class="email-module-key" dir="ltr">${Utils.escapeHTML(S)}</span>
                        </div>
                        <div class="email-module-toggles">
                            <label class="email-toggle${d.enabled?" is-checked":""}" title="\u062A\u0641\u0639\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639">
                                <input type="checkbox" class="em-enabled" ${d.enabled?"checked":""}>
                                <span>\u0645\u0641\u0639\u0651\u0644</span>
                            </label>
                            <label class="email-toggle${d.manualSend?" is-checked":""}${T?"":" is-disabled"}" title="\u0632\u0631 \u0625\u0631\u0633\u0627\u0644 \u0645\u0646 \u0634\u0627\u0634\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <input type="checkbox" class="em-manual" ${d.manualSend?"checked":""} ${T?"":"disabled"}>
                                <span>\u064A\u062F\u0648\u064A</span>
                            </label>
                            <label class="email-toggle${d.autoSend?" is-checked":""}${T?"":" is-disabled"}" title="\u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638">
                                <input type="checkbox" class="em-auto" ${d.autoSend?"checked":""} ${T?"":"disabled"}>
                                <span>\u062A\u0644\u0642\u0627\u0626\u064A</span>
                            </label>
                        </div>
                    </div>
                    <button type="button" class="email-module-recipients-toggle${I?" has-custom":""}" data-toggle-recipients="1">
                        <i class="fas fa-chevron-down"></i>
                        \u0645\u0633\u062A\u0644\u0645\u0648\u0646 \u062E\u0627\u0635\u0648\u0646 ${I?`(${d.recipients.length})`:"(\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"}
                    </button>
                    <div class="email-module-recipients-wrap" hidden>
                        <input type="text" class="form-input w-full text-sm em-recipients" placeholder="\u0641\u0627\u0631\u063A = \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u064A\u0646" value="${Utils.escapeHTML(E)}" dir="ltr">
                    </div>
                </div>`}),e.innerHTML=r||'<p class="email-settings-empty">\u0644\u0627 \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0627\u0644\u062A\u0635\u0641\u064A\u0629</p>',this.updateEmailModulesSummary(),this.syncEmailToggleClasses(e),e.querySelectorAll(".email-module-row").forEach(S=>{const d=S.querySelector(".em-enabled");d&&d.addEventListener("change",()=>{const b=d.checked;S.classList.toggle("is-enabled",b),S.querySelectorAll(".em-manual, .em-auto").forEach(x=>{x.disabled=!b}),this.syncEmailToggleClasses(S),this.collectEmailSettingsFromUI(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0)})})},syncEmailToggleClasses(t){!t||typeof t.querySelectorAll!="function"||t.querySelectorAll(".email-toggle").forEach(e=>{const s=e.querySelector('input[type="checkbox"]');s&&(e.classList.toggle("is-checked",!!s.checked),e.classList.toggle("is-disabled",!!s.disabled))})},applyEmailBulkVisible(t,e){this.collectEmailSettingsFromUI(),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(n=>{const i=n.getAttribute("data-module-key");if(!i||!this._emailSettingsDraft?.modules?.[i])return;const o=this._emailSettingsDraft.modules[i];if(e==="manual"){o.enabled||(o.enabled=!0),o.manualSend=!0;return}if(e==="auto"){o.enabled||(o.enabled=!0),o.autoSend=!0;return}o.enabled=!!t,t&&(o.manualSend=!0)}),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||""),this.setEmailSettingsDirty(!0)},collectEmailSettingsFromUI(){const t=this._emailSettingsDraft||{modules:{}};return t.globalEnabled=!!document.getElementById("email-settings-global-enabled")?.checked,Array.isArray(t.defaultRecipients)||(t.defaultRecipients=this.parseEmailListText(document.getElementById("email-settings-default-recipients")?.value||"")),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(e=>{const s=e.getAttribute("data-module-key");if(!s||!t.modules[s])return;t.modules[s].enabled=!!e.querySelector(".em-enabled")?.checked,t.modules[s].manualSend=!!e.querySelector(".em-manual")?.checked,t.modules[s].autoSend=!!e.querySelector(".em-auto")?.checked;const n=e.querySelector(".em-recipients")?.value||"";t.modules[s].recipients=this.parseEmailListText(n)}),this._emailSettingsDraft=t,t},bindEmailSettingsEvents(){const t=document.getElementById("email-settings-save-btn");if(!t||t.dataset.emailBound==="1")return;t.dataset.emailBound="1";const e=()=>{this._emailSettingsHydrating||(this.collectEmailSettingsFromUI(),this.updateEmailSettingsStatusBanner(),this.renderEmailDefaultChips(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0))},s=document.getElementById("email-settings-global-enabled");s&&s.addEventListener("change",()=>{e()});const n=document.getElementById("email-settings-default-recipients"),i=document.getElementById("email-settings-add-recipient-btn");n&&(n.addEventListener("keydown",I=>{(I.key==="Enter"||I.key===",")&&(I.preventDefault(),this.addEmailDefaultRecipientsFromInput())}),n.addEventListener("paste",()=>{setTimeout(()=>this.addEmailDefaultRecipientsFromInput(),0)})),i&&i.addEventListener("click",()=>this.addEmailDefaultRecipientsFromInput());const o=document.getElementById("email-settings-default-chips");o&&o.addEventListener("click",I=>{const y=I.target.closest("[data-email-chip]");if(!y)return;const k=y.getAttribute("data-email-chip"),L=this.getEmailDefaultRecipientsList().filter(U=>U!==k);this.setEmailDefaultRecipientsList(L)});const a=document.getElementById("email-settings-module-filter");if(a){let I=null;a.addEventListener("input",()=>{clearTimeout(I),I=setTimeout(()=>{this.collectEmailSettingsFromUI(),this.renderEmailModulesList(a.value)},120)})}const c=document.getElementById("email-settings-group-filters");c&&c.addEventListener("click",I=>{const y=I.target.closest("[data-email-group]");y&&(this.collectEmailSettingsFromUI(),this._emailSettingsGroupFilter=y.getAttribute("data-email-group")||"all",this.renderEmailGroupFilters(),this.renderEmailModulesList(a?.value||""))});const r=document.getElementById("email-settings-status-filters");r&&r.addEventListener("click",I=>{const y=I.target.closest("[data-email-status]");y&&(this.collectEmailSettingsFromUI(),this._emailSettingsStatusFilter=y.getAttribute("data-email-status")||"all",this.renderEmailStatusFilters(),this.renderEmailModulesList(a?.value||""))});const f=document.getElementById("email-settings-enable-visible-btn");f&&f.addEventListener("click",()=>this.applyEmailBulkVisible(!0));const S=document.getElementById("email-settings-disable-visible-btn");S&&S.addEventListener("click",()=>this.applyEmailBulkVisible(!1));const d=document.getElementById("email-settings-manual-visible-btn");d&&d.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"manual"));const b=document.getElementById("email-settings-auto-visible-btn");b&&b.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"auto"));const x=document.getElementById("email-settings-modules-list");x&&(x.addEventListener("change",I=>{if(!I.target.matches(".em-manual, .em-auto, .em-recipients"))return;const y=I.target.closest(".email-module-row");y&&I.target.matches(".em-manual, .em-auto")&&this.syncEmailToggleClasses(y),e()}),x.addEventListener("input",I=>{I.target.matches(".em-recipients")&&this.setEmailSettingsDirty(!0)}),x.addEventListener("click",I=>{const y=I.target.closest("[data-toggle-recipients]");if(!y)return;const L=y.closest(".email-module-row")?.querySelector(".email-module-recipients-wrap");if(!L)return;const U=L.hasAttribute("hidden");U?L.removeAttribute("hidden"):L.setAttribute("hidden",""),y.classList.toggle("is-open",U)})),t.addEventListener("click",async()=>{const I=this.collectEmailSettingsFromUI();t.disabled=!0;try{const y=AppState.currentUser||{},k=await GoogleIntegration.sendToAppsScript("saveEmailSettings",{settings:I,userData:y});k&&k.success?(AppState.notificationEmails=(I.defaultRecipients||[]).slice(),typeof EmailDispatch<"u"&&(EmailDispatch.invalidateCache(),EmailDispatch._settings=k.data||I),this._emailSettingsDraft=k.data||I,this.setEmailSettingsDirty(!1),this.updateEmailSettingsStatusBanner(),this.updateEmailModulesSummary(),Notification.success(k.message||"\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F")):Notification.error(k&&k.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(y){Notification.error("\u062E\u0637\u0623: "+(y.message||y))}finally{t.disabled=!1}});const E=document.getElementById("email-settings-reload-btn");E&&E.addEventListener("click",()=>this.ensureEmailSettingsLoaded(!0));const T=document.getElementById("email-settings-test-btn");T&&T.addEventListener("click",async()=>{const I=document.getElementById("email-settings-test-to")?.value?.trim();if(!I||!I.includes("@")){Notification.error("\u0623\u062F\u062E\u0644 \u0625\u064A\u0645\u064A\u0644 \u0635\u062D\u064A\u062D \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631");return}T.disabled=!0;try{const y=await GoogleIntegration.sendToAppsScript("sendTestEmail",{to:I,userData:AppState.currentUser||{}});y&&y.success?Notification.success(y.message||"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A"):Notification.error(y&&y.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A")}catch(y){Notification.error(String(y.message||y))}finally{T.disabled=!1}})},removeNotificationEmail(t){AppState.notificationEmails&&AppState.notificationEmails[t]!=null&&AppState.notificationEmails.splice(t,1)},bindCloudStorageSettingsEvents(){const t=document.getElementById("onedrive-settings-form");t&&t.addEventListener("submit",async a=>{a.preventDefault();const c=document.getElementById("onedrive-enabled")?.checked||!1,r=document.getElementById("onedrive-client-id")?.value.trim()||"",f=document.getElementById("onedrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.onedrive.enabled=c,AppState.cloudStorageConfig.onedrive.clientId=r,f&&(AppState.cloudStorageConfig.onedrive.clientSecret=f),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A OneDrive \u0628\u0646\u062C\u0627\u062D"),this.load()});const e=document.getElementById("onedrive-authorize-btn");e&&e.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("onedrive"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 OneDrive")}});const s=document.getElementById("googledrive-settings-form");s&&s.addEventListener("submit",async a=>{a.preventDefault();const c=document.getElementById("googledrive-enabled")?.checked||!1,r=document.getElementById("googledrive-client-id")?.value.trim()||"",f=document.getElementById("googledrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.googleDrive.enabled=c,AppState.cloudStorageConfig.googleDrive.clientId=r,f&&(AppState.cloudStorageConfig.googleDrive.clientSecret=f),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Drive \u0628\u0646\u062C\u0627\u062D"),this.load()});const n=document.getElementById("googledrive-authorize-btn");n&&n.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("googleDrive"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 Google Drive")}});const i=document.getElementById("sharepoint-settings-form");i&&i.addEventListener("submit",async a=>{a.preventDefault();const c=document.getElementById("sharepoint-enabled")?.checked||!1,r=document.getElementById("sharepoint-client-id")?.value.trim()||"",f=document.getElementById("sharepoint-client-secret")?.value.trim()||"",S=document.getElementById("sharepoint-tenant-id")?.value.trim()||"",d=document.getElementById("sharepoint-site-url")?.value.trim()||"";AppState.cloudStorageConfig.sharepoint.enabled=c,AppState.cloudStorageConfig.sharepoint.clientId=r,f&&(AppState.cloudStorageConfig.sharepoint.clientSecret=f),AppState.cloudStorageConfig.sharepoint.tenantId=S,AppState.cloudStorageConfig.sharepoint.siteUrl=d,DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SharePoint \u0628\u0646\u062C\u0627\u062D"),this.load()});const o=document.getElementById("sharepoint-authorize-btn");o&&o.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("sharepoint"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 SharePoint")}})},renderCloudStorageSettings(){const t=AppState.cloudStorageConfig.onedrive,e=AppState.cloudStorageConfig.googleDrive,s=AppState.cloudStorageConfig.sharepoint,n=t.enabled&&t.clientId&&t.accessToken?"success":"warning",i=e.enabled&&e.clientId&&e.accessToken?"success":"warning",o=s.enabled&&s.clientId&&s.accessToken?"success":"warning";return`
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
                            <span class="badge badge-${n}">
                                ${n==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                            </span>
                        </div>
                        <form id="onedrive-settings-form" class="space-y-4">
                            <div>
                                <label class="flex items-center mb-2">
                                    <input type="checkbox" id="onedrive-enabled" class="rounded border-gray-300 text-blue-600"
                                        ${t.enabled?"checked":""}>
                                    <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 OneDrive</span>
                                </label>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                                </label>
                                <input type="text" id="onedrive-client-id" class="form-input"
                                    value="${t.clientId||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Azure Portal"
                                    autocomplete="username">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                                </label>
                                <input type="password" id="onedrive-client-secret" class="form-input"
                                    value="${t.clientSecret||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                    autocomplete="new-password">
                            </div>
                            <div class="flex items-center justify-end gap-4 pt-4 border-t">
                                ${t.clientId&&!t.accessToken?`
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
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u064A\u062C\u0628 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0641\u064A Azure Portal (\u0644\u0640 OneDrive \u0648 SharePoint) \u0623\u0648 Google Cloud Console (\u0644\u0640 Google Drive) \u0623\u0648\u0644\u0627\u064B.
                            \u0627\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0633\u062D\u0627\u0628\u064A\u0629. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0639\u0627\u062F\u064A\u0648\u0646 \u064A\u0645\u0643\u0646\u0647\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0628\u0639\u062F \u062A\u0641\u0639\u064A\u0644\u0647.
                        </p>
                    </div>
                </div>
            </div>
        `},renderGoogleDriveSettings(){const t=AppState.cloudStorageConfig.googleDrive,e=t.enabled&&t.clientId&&t.accessToken?"success":"warning";return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fab fa-google ml-2"></i>
                        Google Drive
                    </h2>
                </div>
                <div class="card-body space-y-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base font-semibold text-gray-700">
                            <i class="fab fa-google ml-2"></i>
                            \u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Drive
                        </h3>
                        <span class="badge badge-${e}">
                            ${e==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                        </span>
                    </div>
                    <form id="googledrive-settings-form" class="space-y-4">
                        <div>
                            <label class="flex items-center mb-2">
                                <input type="checkbox" id="googledrive-enabled" class="rounded border-gray-300 text-blue-600"
                                    ${t.enabled?"checked":""}>
                                <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 Google Drive</span>
                            </label>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                            </label>
                            <input type="text" id="googledrive-client-id" class="form-input"
                                value="${t.clientId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Google Cloud Console"
                                autocomplete="username">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                            </label>
                            <input type="password" id="googledrive-client-secret" class="form-input"
                                value="${t.clientSecret||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                autocomplete="new-password">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            ${t.clientId&&!t.accessToken?`
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
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u064A\u062C\u0628 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0641\u064A Google Cloud Console \u0623\u0648\u0644\u0627\u064B. \u0627\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0640 Google Drive.
                        </p>
                    </div>
                </div>
            </div>
        `},renderSharePointSettings(){const t=AppState.cloudStorageConfig.sharepoint,e=t.enabled&&t.clientId&&t.accessToken?"success":"warning";return`
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
                        <span class="badge badge-${e}">
                            ${e==="success"?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                        </span>
                    </div>
                    <form id="sharepoint-settings-form" class="space-y-4">
                        <div>
                            <label class="flex items-center mb-2">
                                <input type="checkbox" id="sharepoint-enabled" class="rounded border-gray-300 text-blue-600"
                                    ${t.enabled?"checked":""}>
                                <span class="mr-2 text-sm text-gray-700">\u062A\u0641\u0639\u064A\u0644 SharePoint</span>
                            </label>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0637\u0628\u064A\u0642)
                            </label>
                            <input type="text" id="sharepoint-client-id" class="form-input"
                                value="${t.clientId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client ID \u0645\u0646 Azure Portal"
                                autocomplete="username">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Client Secret (\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0633\u0631\u064A)
                            </label>
                            <input type="password" id="sharepoint-client-secret" class="form-input"
                                value="${t.clientSecret||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Client Secret"
                                autocomplete="new-password">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Tenant ID (\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u0623\u062C\u0631)
                            </label>
                            <input type="text" id="sharepoint-tenant-id" class="form-input"
                                value="${t.tenantId||""}"
                                placeholder="\u0623\u062F\u062E\u0644 Tenant ID (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Site URL (\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u0642\u0639)
                            </label>
                            <input type="url" id="sharepoint-site-url" class="form-input"
                                value="${t.siteUrl||""}"
                                placeholder="https://yourcompany.sharepoint.com/sites/yoursite">
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            ${t.clientId&&!t.accessToken?`
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
        `},_violationTypesImportNormalizeKey(t){return String(t??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationTypesImportPick(t,e){const s={};Object.keys(t||{}).forEach(n=>{s[this._violationTypesImportNormalizeKey(n)]=t[n]});for(let n=0;n<e.length;n++){const i=this._violationTypesImportNormalizeKey(e[n]);if(s[i]!==void 0&&s[i]!==null&&String(s[i]).trim()!=="")return s[i]}return""},_parseViolationTypeFineForImport(t){if(t==null||t==="")return 0;if(typeof Violations<"u"&&typeof Violations.parseFineAmount=="function")return Violations.parseFineAmount(t);const e=Number(String(t).replace(/[^\d.\-]/g,""));return Number.isFinite(e)&&e>=0?e:0},downloadViolationTypesImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const t=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629"],e=["\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629","\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A","500"],s=XLSX.utils.book_new(),n=XLSX.utils.aoa_to_sheet([t,e]);n["!cols"]=[{wch:40},{wch:50},{wch:14}],XLSX.utils.book_append_sheet(s,n,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const i=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],["\u2022 \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639\xBB \u0625\u0644\u0632\u0627\u0645\u064A."],["\u2022 \u0625\u0630\u0627 \u0648\u064F\u062C\u062F \u0646\u0648\u0639 \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B\u060C \u064A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641."],["\u2022 \xAB\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629\xBB \u0631\u0642\u0645 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 (\u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0631\u0642\u0627\u0645 \u0639\u0631\u0628\u064A\u0629 \u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D)."]];XLSX.utils.book_append_sheet(s,XLSX.utils.aoa_to_sheet(i),"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(s,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},exportViolationTypesToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}ViolationTypesManager.ensureInitialized();const t=ViolationTypesManager.getAll();if(!t.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}const e=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0639\u062F\u062F_\u0627\u0644\u0633\u062C\u0644\u0627\u062A"],s=t.map(a=>{const c=ViolationTypesManager.countUsage(a),r=Number(a.fineAmount||0);return[a.name||"",a.description||"",Number.isFinite(r)?r:0,a.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635",c]}),n=XLSX.utils.book_new(),i=XLSX.utils.aoa_to_sheet([e,...s]);i["!cols"]=[{wch:42},{wch:55},{wch:16},{wch:12},{wch:14}],XLSX.utils.book_append_sheet(n,i,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const o=new Date().toISOString().slice(0,10);XLSX.writeFile(n,`\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${o}.xlsx`),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${t.length} \u0646\u0648\u0639\u0627\u064B \u0625\u0644\u0649 Excel.`)},showViolationTypesImportModal(){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
            </div>`,document.body.appendChild(t);let e=[];const s=t.querySelector("#violation-types-import-preview"),n=t.querySelector("#violation-types-import-confirm");t.querySelector("#violation-types-import-download-template")?.addEventListener("click",()=>this.downloadViolationTypesImportTemplate()),t.querySelector("#violation-types-import-file")?.addEventListener("change",async i=>{const o=i.target.files&&i.target.files[0];if(e=[],n.disabled=!0,s.classList.add("hidden"),!!o){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const a=await o.arrayBuffer(),c=XLSX.read(a,{type:"array"}),r=c.Sheets[c.SheetNames[0]],f=XLSX.utils.sheet_to_json(r,{defval:""});e=Array.isArray(f)?f:[],s.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${e.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \xAB${Utils.escapeHTML(c.SheetNames[0]||"")}\xBB.</p>`,s.classList.remove("hidden"),n.disabled=e.length===0}catch(a){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",a),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(a.message||""))}}}),n?.addEventListener("click",async()=>{e.length&&(n.disabled=!0,await this.processViolationTypesImportRows(e,t))}),t.addEventListener("click",i=>{i.target===t&&t.remove()})},async processViolationTypesImportRows(t,e){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629.");return}ViolationTypesManager.ensureInitialized(),Array.isArray(AppState.appData.violationTypes)||(AppState.appData.violationTypes=[]);const s=new Date().toISOString();let n=0,i=0,o=0;for(let a=0;a<t.length;a++){const c=t[a]||{},r=String(this._violationTypesImportPick(c,["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639","name","typename","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"])||"").trim();if(!r){o++;continue}const f=String(this._violationTypesImportPick(c,["\u0627\u0644\u0648\u0635\u0641","description","notes"])||"").trim(),S=this._violationTypesImportPick(c,["\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629","fineamount","fine","defaultfine"]),d=this._parseViolationTypeFineForImport(S!==""&&S!==void 0?S:0),b=ViolationTypesManager.getTypeByName(r);b?(b.description=f,b.fineAmount=d,b.updatedAt=s,i++):(AppState.appData.violationTypes.push({id:Utils.generateId("VTYPE"),name:r,description:f,fineAmount:d,isDefault:!1,createdAt:s,updatedAt:s}),n++)}if(ViolationTypesManager.sortTypes(),ViolationTypesManager.ensureViolationsTypeIds(),typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}ViolationTypesManager.persist(!0),e&&e.parentNode&&e.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${n} \u0646\u0648\u0639 \u062C\u062F\u064A\u062F\u060C ${i} \u0645\u062D\u062F\u0651\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C ${o} \u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645.`),this.refreshViolationTypesList()},renderViolationTypesList(){const t=ViolationTypesManager.getAll();return t.length?`
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
                        ${t.map(e=>{const s=ViolationTypesManager.countUsage(e);return`
                                    <tr data-violation-type-id="${e.id}">
                                        <td class="align-top">
                                            <span class="font-semibold">${Utils.escapeHTML(e.name)}</span>
                                        </td>
                                        <td class="align-top">
                                            ${e.description?`<span class="text-sm text-gray-600">${Utils.escapeHTML(e.description)}</span>`:'<span class="text-sm text-gray-400">\u2014</span>'}
                                        </td>
                                        <td class="align-top font-semibold text-red-700">
                                            ${Number(e.fineAmount||0).toLocaleString("ar-EG")} \u062C.\u0645
                                        </td>
                                        <td class="align-top">
                                            <span class="badge ${e.isDefault?"badge-info":"badge-primary"}">
                                                ${e.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635"}
                                            </span>
                                        </td>
                                        <td class="align-top">${s}</td>
                                        <td class="align-top">
                                            <div class="flex items-center gap-2">
                                                <button class="btn-icon btn-icon-primary" data-action="view-violation-type" data-type-id="${e.id}" title="\u0639\u0631\u0636">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn-icon btn-icon-info" data-action="edit-violation-type" data-type-id="${e.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn-icon btn-icon-danger" data-action="delete-violation-type" data-type-id="${e.id}" title="\u062D\u0630\u0641">
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
            `},bindViolationTypesEvents(){const t=document.getElementById("add-violation-type-btn");t&&(t.onclick=()=>this.openViolationTypeModal());const e=document.getElementById("import-violation-types-btn");e&&(e.onclick=()=>this.showViolationTypesImportModal());const s=document.getElementById("export-violation-types-btn");s&&(s.onclick=()=>this.exportViolationTypesToExcel()),document.querySelectorAll('[data-action="view-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.viewViolationType(o)}}),document.querySelectorAll('[data-action="edit-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.openViolationTypeModal(o)}}),document.querySelectorAll('[data-action="delete-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.deleteViolationType(o)}})},refreshViolationTypesList(){const t=document.getElementById("violation-types-management");t&&(t.innerHTML=this.renderViolationTypesList(),this.bindViolationTypesEvents())},viewViolationType(t){try{if(!t||typeof ViolationTypesManager>"u")return;ViolationTypesManager.ensureInitialized?.();const e=ViolationTypesManager.getTypeById(t);if(!e||!e.name){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}typeof UI<"u"&&typeof UI.showSection=="function"&&UI.showSection("violations");const s=()=>typeof Violations>"u"?!1:(Violations.currentFilters||(Violations.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""}),Violations.currentFilters.violationType=e.name,typeof Violations.switchTab=="function"?Violations.switchTab("all"):typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations.refreshModule=="function"&&Violations.refreshModule(),!0);s()||setTimeout(()=>{s()||setTimeout(()=>s(),600)},250)}catch{Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}},openViolationTypeModal(t=null){const e=t?ViolationTypesManager.getTypeById(t):null;if(t&&!e){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 480px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u062E\u0627\u0644\u0641\u0629 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="violation-type-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 *</label>
                            <input type="text" id="violation-type-name" class="form-input" required maxlength="150"
                                value="${e?Utils.escapeHTML(e.name):""}"
                                placeholder="\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <textarea id="violation-type-description" class="form-input" rows="3"
                                placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639">${e?Utils.escapeHTML(e.description||""):""}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629</label>
                            <input type="number" id="violation-type-fine-amount" class="form-input" min="0" step="1"
                                value="${e?Number(e.fineAmount||0):0}"
                                placeholder="\u0645\u062B\u0627\u0644: 500">
                            <p class="text-xs text-gray-500 mt-1">\u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0647\u0630\u0647 \u0627\u0644\u0642\u064A\u0645\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0641\u064A \u0627\u0644\u062A\u0633\u062C\u064A\u0644.</p>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s),s.querySelector("#violation-type-form").addEventListener("submit",async i=>{i.preventDefault();const o=s.querySelector("#violation-type-name"),a=s.querySelector("#violation-type-description"),c=s.querySelector("#violation-type-fine-amount"),r=o?.value.trim()||"",f=a?.value.trim()||"",S=c?.value??"0",d=Number(S),b=Number.isFinite(d)&&d>=0?d:0;if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639"),o?.focus();return}try{e?(ViolationTypesManager.updateType(e.id,{name:r,description:f,fineAmount:b}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")):(ViolationTypesManager.addType({name:r,description:f,fineAmount:b}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")),s.remove(),this.refreshViolationTypesList()}catch(x){Notification.error(x.message)}}),s.addEventListener("click",i=>{i.target===s&&s.remove()})},deleteViolationType(t){if(!t)return;const e=ViolationTypesManager.getTypeById(t);if(!e){Notification.error("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=ViolationTypesManager.countUsage(e),n=s>0?`\u0647\u0646\u0627\u0643 ${s} \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0631\u062A\u0628\u0637 \u0628\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629\u060C \u0644\u0643\u0646 \u0644\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0646\u0648\u0639 \u0645\u062A\u0627\u062D\u0627\u064B \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F.
\u0647\u0644 \u062A\u0631\u063A\u0628 \u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u062D\u0630\u0641 "${e.name}"\u061F`:`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 "${e.name}"\u061F`;confirm(n)&&(async()=>{try{ViolationTypesManager.deleteType(t),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshViolationTypesList()}catch(i){Notification.error(i.message)}})()},normalizeOwner(t){return!t||t==="__default__"?"__default__":String(t)},renderApprovalOwnerOptions(t="__default__"){const e=this.normalizeOwner(t),s=ApprovalCircuits.getUsersList(),n=ApprovalCircuits.listOwners(),i=[];return i.push(`
            <option value="__default__" ${e==="__default__"?"selected":""}>
                \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)
            </option>
        `),s.forEach(o=>{const a=o.id||o.email,c=`${Utils.escapeHTML(o.name||o.email||"")}${o.email?` - ${Utils.escapeHTML(o.email)}`:""}`;i.push(`
                <option value="${Utils.escapeHTML(a)}" ${e===a?"selected":""}>
                    ${c}
                </option>
            `)}),n.filter(o=>o&&o!=="__default__"&&!s.some(a=>a.id===o)).forEach(o=>{const a=ApprovalCircuits.getCircuit(o);i.push(`
                    <option value="${Utils.escapeHTML(o)}" ${e===o?"selected":""}>
                        \u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F (${Utils.escapeHTML(a?.name||o)})
                    </option>
                `)}),i.join("")},renderApprovalStepsPlaceholder(){return`
            <div class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-600">
                <i class="fas fa-layer-group text-2xl text-gray-400 mb-3"></i>
                <p>\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0639\u0644\u0627\u0647 \u062B\u0645 \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u064A \u0643\u0644 \u0645\u0633\u062A\u0648\u0649.</p>
            </div>
        `},updateApprovalCircuitStatusLabel(){const t=document.getElementById("approval-circuit-active-label");if(!t)return;const e=this.normalizeOwner(this.currentApprovalCircuitOwner),s=ApprovalCircuits.getCircuit(e);if(!s||!Array.isArray(s.steps)||s.steps.length===0){t.style.display="none";return}const n=e==="__default__"?null:ApprovalCircuits.getUserById(e),i=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":n?.name||n?.email||`\u0645\u0633\u062A\u062E\u062F\u0645 ${e}`,o=s.steps.length;t.textContent=`${i} \u2022 ${o} \u0645\u0633\u062A\u0648\u0649${o>1?"\u0627\u062A":""}`,t.style.display="inline-flex"},renderApprovalSteps(){const t=document.getElementById("approval-steps-container");if(!t)return;if(!this.currentApprovalCircuitSteps||this.currentApprovalCircuitSteps.length===0){t.innerHTML=this.renderApprovalStepsPlaceholder(),this.updateApprovalCircuitStatusLabel();return}const e=ApprovalCircuits.getUsersList();t.innerHTML=this.currentApprovalCircuitSteps.map((s,n)=>this.renderApprovalStepCard(s,n,e)).join(""),this.updateApprovalCircuitStatusLabel()},renderApprovalStepCard(t,e,s){const n=this.getStepTitle(e),i=Array.isArray(t.userIds)?t.userIds:[],o=s.map(a=>{const c=a.id||a.email,r=`${Utils.escapeHTML(a.name||a.email||"")}${a.email?` (${Utils.escapeHTML(a.email)})`:""}`,f=i.includes(c)?"selected":"";return`<option value="${Utils.escapeHTML(c)}" ${f}>${r}</option>`}).join("");return`
            <div class="approval-step-card border border-gray-200 rounded-lg bg-gray-50 p-4" data-step-index="${e}" data-step-id="${Utils.escapeHTML(t.id||"")}">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700">${n}</h4>
                        <p class="text-xs text-gray-500">\u062D\u062F\u062F \u062F\u0648\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0648\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0645\u062E\u0648\u0644\u064A\u0646 \u0628\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0648\u0649.</p>
                    </div>
                    <button type="button" class="btn-icon btn-icon-danger" data-remove-step-index="${e}" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0648\u0649">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0648\u0649 / \u0627\u0644\u062F\u0648\u0631</label>
                        <input type="text" class="form-input approval-step-name" value="${Utils.escapeHTML(t.name||t.role||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628\u0629" required>
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
                        <input type="checkbox" class="approval-step-required" ${t.required!==!1?"checked":""}>
                        <span>\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u0644\u0632\u0627\u0645\u064A</span>
                    </label>
                    <label class="flex items-center text-sm text-gray-700 gap-2">
                        <input type="checkbox" class="approval-step-safety" ${t.isSafetyOfficer===!0?"checked":""}>
                        <span>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</span>
                    </label>
                </div>
            </div>
        `},getStepTitle(t){return["\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0644","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0646\u064A","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0644\u062B","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0631\u0627\u0628\u0639","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0627\u0645\u0633"][t]||`\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${t+1}`},refreshApprovalOwnerOptions(t="__default__"){const e=document.getElementById("approval-owner-select");e&&(e.innerHTML=this.renderApprovalOwnerOptions(t),e.value=this.normalizeOwner(t))},initializeApprovalCircuitsUI(){const t=document.getElementById("approval-owner-select");if(!t)return;const e=document.getElementById("add-approval-step-btn"),s=document.getElementById("save-approval-circuit-btn"),n=document.getElementById("delete-approval-circuit-btn"),i=document.getElementById("approval-steps-container"),o=this.normalizeOwner(t.value||"__default__");this.currentApprovalCircuitOwner=o,this.loadApprovalCircuitEditor(o),t.addEventListener("change",a=>{const c=this.normalizeOwner(a.target.value);this.currentApprovalCircuitOwner=c,this.loadApprovalCircuitEditor(c)}),e&&e.addEventListener("click",()=>this.addApprovalCircuitStep()),s&&s.addEventListener("click",()=>this.saveApprovalCircuit()),n&&n.addEventListener("click",()=>this.deleteApprovalCircuit()),i&&i.addEventListener("click",a=>{const c=a.target.closest("[data-remove-step-index]");if(c){const r=parseInt(c.getAttribute("data-remove-step-index"),10);Number.isNaN(r)||this.removeApprovalCircuitStep(r)}})},loadApprovalCircuitEditor(t){const e=this.normalizeOwner(t),s=ApprovalCircuits.getCircuit(e),n=document.getElementById("approval-circuit-name"),i=document.getElementById("delete-approval-circuit-btn");s?(this.currentApprovalCircuitId=s.id||null,this.currentApprovalCircuitSteps=Array.isArray(s.steps)?s.steps.map((o,a)=>({id:o.id||Utils.generateId("CSTEP"),name:o.name||o.role||"",userIds:Array.isArray(o.userIds)?o.userIds.filter(Boolean):[],required:o.required!==!1,isSafetyOfficer:o.isSafetyOfficer===!0,order:typeof o.order=="number"?o.order:a})):[],n&&(n.value=s.name||(e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""))):(this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],n&&(n.value=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"")),this.currentApprovalCircuitOwner=e,this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((o,a)=>Object.assign({},o,{order:a})),i&&(i.disabled=!s),this.renderApprovalSteps()},addApprovalCircuitStep(){Array.isArray(this.currentApprovalCircuitSteps)||(this.currentApprovalCircuitSteps=[]),this.currentApprovalCircuitSteps.push({id:Utils.generateId("CSTEP"),name:"",userIds:[],required:!0,isSafetyOfficer:!1,order:this.currentApprovalCircuitSteps.length}),this.renderApprovalSteps()},removeApprovalCircuitStep(t){Array.isArray(this.currentApprovalCircuitSteps)&&(this.currentApprovalCircuitSteps.splice(t,1),this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((e,s)=>Object.assign({},e,{order:s})),this.renderApprovalSteps())},collectApprovalCircuitData(){const t=this.normalizeOwner(this.currentApprovalCircuitOwner),e=document.getElementById("approval-circuit-name"),s=e?e.value.trim():"",n=document.querySelectorAll(".approval-step-card"),i=Array.from(n).map((o,a)=>{const c=o.getAttribute("data-step-id")||Utils.generateId("CSTEP"),r=o.querySelector(".approval-step-name"),f=o.querySelector(".approval-step-users"),S=o.querySelector(".approval-step-required"),d=o.querySelector(".approval-step-safety"),b=r?r.value.trim():"",x=f?Array.from(f.options).filter(E=>E.selected).map(E=>E.value):[];return{id:c,name:b,userIds:x,required:S?S.checked:!0,isSafetyOfficer:d?d.checked:!1,order:a}});return{id:this.currentApprovalCircuitId||Utils.generateId("CIR"),ownerId:t,name:s||(t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""),steps:i,updatedAt:new Date().toISOString()}},saveApprovalCircuit(){const t=this.collectApprovalCircuitData();if(!t.steps||t.steps.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u0649 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.");return}if(t.steps.some(n=>!n.name)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}if(t.steps.some(n=>!Array.isArray(n.userIds)||n.userIds.length===0)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}ApprovalCircuits.saveCircuit(t),this.currentApprovalCircuitId=t.id,this.currentApprovalCircuitSteps=t.steps.map((n,i)=>Object.assign({},n,{order:i})),this.refreshApprovalOwnerOptions(t.ownerId),this.renderApprovalSteps(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")},deleteApprovalCircuit(){const t=this.normalizeOwner(this.currentApprovalCircuitOwner),e=ApprovalCircuits.getCircuit(t);if(!e){Notification.info("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0627\u0631 \u0644\u062D\u0630\u0641\u0647.");return}const s=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":e.name||t;confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${s}"\u061F
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0633\u0627\u0628\u0642\u0629\u060C \u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.`)&&(ApprovalCircuits.deleteCircuit(t),this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],this.refreshApprovalOwnerOptions(t),this.loadApprovalCircuitEditor(t),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."))},renderUsersPermissionsList(){const t=AppState.appData.users||[];return t.length===0?`
                <div class="text-center text-gray-500 py-4">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                </div>
            `:t.map(e=>{const s=this.hasAccessForUser(e,"settings"),n=e.role==="admin"?"badge-danger":e.role==="safety_officer"?"badge-warning":"badge-info",i=e.role==="admin"?"\u0645\u062F\u064A\u0631":e.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645";return`
                <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                    <div class="flex items-center flex-1">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                            ${e.photo?(()=>{const o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(e.photo):{canonical:String(e.photo),displaySrc:String(e.photo),needsProxy:!1,proxyFileId:""},a=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"";return`<img src="${Utils.escapeHTML(o.displaySrc)}" alt="${Utils.escapeHTML(e.name)}"${a} class="settings-perm-user-photo w-full h-full rounded-full object-cover">`})():'<i class="fas fa-user text-gray-600"></i>'}
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold">${Utils.escapeHTML(e.name||"")}</div>
                            <div class="text-sm text-gray-600">${Utils.escapeHTML(e.email||"")}</div>
                        </div>
                        <div class="mr-4">
                            <span class="badge ${n}">${i}</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="badge ${s?"badge-success":"badge-warning"} mr-3">
                            ${s?'<i class="fas fa-check-circle ml-1"></i> \u0644\u062F\u064A\u0647 \u0635\u0644\u0627\u062D\u064A\u0629':'<i class="fas fa-times-circle ml-1"></i> \u0644\u0627 \u064A\u0645\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0629'}
                        </span>
                        <button onclick="Settings.viewUserPermissions('${e.id}')" 
                                class="btn-icon btn-icon-primary" 
                                title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0635\u064A\u0644">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `}).join("")},viewUserPermissions(t){const e=AppState.appData.users.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=this.hasAccessForUser(e,"settings"),n=e.permissions||{},i=[{key:"dashboard",label:"\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{key:"nearmiss",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629"},{key:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{key:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{key:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{key:"fire-equipment",label:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"},{key:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{key:"contractors",label:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"},{key:"employees",label:"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"},{key:"behavior-monitoring",label:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0627\u062A"},{key:"chemical-safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629"},{key:"daily-observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629"},{key:"iso",label:"\u0646\u0638\u0627\u0645 ISO"},{key:"emergency",label:"\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626"},{key:"users",label:"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"},{key:"settings",label:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"}],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-shield-alt ml-2"></i>
                        \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${Utils.escapeHTML(e.name)}
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
                                    <p class="font-semibold text-blue-800">${Utils.escapeHTML(e.name)}</p>
                                    <p class="text-sm text-blue-600">${Utils.escapeHTML(e.email)}</p>
                                </div>
                                <div class="text-left">
                                    <span class="badge ${e.role==="admin"?"badge-danger":e.role==="safety_officer"?"badge-warning":"badge-info"}">
                                        ${e.role==="admin"?"\u0645\u062F\u064A\u0631":e.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-3">\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A:</h3>
                            <div class="grid grid-cols-2 gap-2">
                                ${i.map(a=>{const c=this.hasAccessForUser(e,a.key);return`
                                        <div class="flex items-center justify-between p-2 border rounded ${c?"bg-green-50":"bg-gray-50"}">
                                            <span class="text-sm">${a.label}</span>
                                            ${c?'<i class="fas fa-check-circle text-green-600"></i>':'<i class="fas fa-times-circle text-gray-400"></i>'}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary" onclick="UI.showSection('users'); this.closest('.modal-overlay').remove(); setTimeout(() => Users.editUser('${e.id}'), 500);">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o),o.addEventListener("click",a=>{a.target===o&&o.remove()})},hasAccessForUser(t,e){if(t.role==="admin")return!0;const s=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t.permissions):t.permissions||{};return s&&s.hasOwnProperty(e)?s[e]===!0:!1},async handleSubmit(t){t.preventDefault();try{const e=document.getElementById("google-apps-script-enabled"),s=document.getElementById("google-apps-script-url"),n=document.getElementById("google-sheets-enabled"),i=document.getElementById("google-sheets-id");if(!e||!s||!n||!i){Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0642\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C");return}AppState.googleConfig.appsScript.enabled=e.checked,AppState.googleConfig.appsScript.scriptUrl=s.value.trim(),AppState.googleConfig.sheets.enabled=n.checked,AppState.googleConfig.sheets.spreadsheetId=i.value.trim();let o=!1;if(typeof window.DataManager<"u"&&window.DataManager.saveGoogleConfig)window.DataManager.saveGoogleConfig()?(o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");else if(typeof window.DataManager<"u"&&window.DataManager.save)try{await window.DataManager.save(),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}else try{localStorage.setItem("hse_google_config",JSON.stringify(AppState.googleConfig)),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D (\u062D\u0641\u0638 \u0645\u062D\u0644\u064A)")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+a.message)}if(o&&AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{Loading.show(),await new Promise(c=>setTimeout(c,500));const a=await GoogleIntegration.readFromSheets("Users");Loading.hide(),a&&Array.isArray(a)?Notification.success(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${a.length} \u0633\u062C\u0644`):Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")}catch(a){Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645:",e),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async testConnection(){Loading.show();try{if(AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl){const e=await Utils.promiseWithTimeout(GoogleIntegration.readFromSheets("Users"),3e4,`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646:
1. \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A
2. \u0635\u062D\u0629 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 (RPC)
3. \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0642\u064A\u0648\u062F \u0639\u0644\u0649 \u0627\u0644\u0634\u0628\u0643\u0629`);Loading.hide(),Notification.success("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0646\u062C\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 "+e.length+" \u0633\u062C\u0644")}else Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629")}catch(t){Loading.hide();const e=t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+e),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644:",t)}},async initializeSheets(){if(!AppState.googleConfig.appsScript.enabled){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u0648\u0644\u0627\u064B");return}if(!AppState.googleConfig.sheets.spreadsheetId){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0648\u0644\u0627\u064B \u0625\u0630\u0627 \u0643\u0627\u0646 \u0645\u0637\u0644\u0648\u0628\u0627\u064B");return}if(confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621:
${"Users, Incidents, NearMiss, PTW, Training, ClinicVisits, Medications, SickLeave, ClinicInventory, FireEquipment, FireEquipmentAssets, FireEquipmentInspections, PPE, Violations, Contractors, Employees, BehaviorMonitoring, ChemicalSafety, DailyObservations, ISODocuments, ISOProcedures, ISOForms, EmergencyAlerts, EmergencyPlans".split(", ").map(e=>`- ${e}`).join(`
`)}`))try{Loading.show(),await GoogleIntegration.initializeSheets(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642:",e),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642: "+e.message)}},getMonthlySafetyDefaultFromDate(){const t=new Date,e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0");return`${e}-${s}-01`},getMonthlySafetyDefaultToDate(){const t=new Date,e=new Date(t.getFullYear(),t.getMonth()+1,0),s=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${s}-${n}-${i}`},renderMonthlySafetyYearOptions(){const t=new Date().getFullYear();let e="";for(let s=t+1;s>=t-3;s-=1)e+=`<option value="${s}"${s===t?" selected":""}>${s}</option>`;return e},renderMonthlySafetyMonthOptions(){const t=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],e=new Date().getMonth()+1;return t.map((s,n)=>{const i=n+1;return`<option value="${i}"${i===e?" selected":""}>${s}</option>`}).join("")},async generateMonthlySafetyReport(t){if(!this.isCurrentUserAdmin()){const d=typeof Reports<"u"&&Reports.getTranslations?Reports.getTranslations().t("msg.adminOnlyReport"):"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637";Notification.error(d);return}if(typeof Reports>"u"||typeof Reports.downloadMonthlySafetyReport!="function"){Notification.error("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B");return}const e=document.getElementById("monthly-safety-from"),s=document.getElementById("monthly-safety-to"),n=document.getElementById("monthly-safety-site"),i=document.getElementById("monthly-safety-lang"),o=e?e.value:"",a=s?s.value:"",c=n?String(n.value||"").trim():"",r=t||(i?i.value:"ar")||"ar",f=typeof Reports.buildSafetyReportPeriod=="function"?Reports.buildSafetyReportPeriod(o,a):null,{t:S}=Reports.getTranslations?Reports.getTranslations():{t:d=>d};if(!f){Notification.error(S("msg.invalidDateRange"));return}Loading.show(r==="en"?"Preparing monthly safety report...":"\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A...");try{const d=await Reports.downloadMonthlySafetyReport(f,r,c||null);Loading.hide(),d&&Notification.success(r==="en"?"Monthly safety report downloaded":"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0628\u0646\u062C\u0627\u062D")}catch(d){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(d&&d.message?d.message:String(d)))}},async generateReport(t){Loading.show();try{await Reports.generateAndExport(t),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+e.message)}},setupSettingsListeners(){setTimeout(()=>{const t=document.getElementById("save-date-format-btn");t&&t.addEventListener("click",()=>{const i=document.getElementById("date-format-select").value;AppState.dateFormat=i,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const e=document.getElementById("upload-logo-btn"),s=document.getElementById("company-logo-input");e&&s&&e.addEventListener("click",()=>{const i=s.files[0];if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629");return}if(i.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB");return}const o=new FileReader;o.onload=async a=>{let c=a.target.result;try{c=await Settings.compressLogo(c),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+c.length+" \u062D\u0631\u0641)")}catch(f){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",f)}if(AppState.companyLogo=c,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=c,localStorage.setItem("company_logo",c),localStorage.setItem("hse_company_logo",c),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const f=AppState.currentUser||{},S=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:c,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:f.email,name:f.name,role:f.role,permissions:f.permissions}});S&&S.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",S?.message)}catch(f){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",f)}const r=document.getElementById("company-logo-preview");r&&(r.src=AppState.companyLogo,r.style.display="block"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:c}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D")},o.readAsDataURL(i)});const n=document.getElementById("remove-logo-btn");n&&n.addEventListener("click",async()=>{if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const o=AppState.currentUser||{},a=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:o.email,name:o.name,role:o.role,permissions:o.permissions}});a&&a.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a?.message)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",o)}const i=document.getElementById("company-logo-preview");i&&(i.style.display="none"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),this.load()})},100)}};(function(){"use strict";try{typeof window<"u"&&typeof Settings<"u"&&(window.Settings=Settings,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Settings module loaded and available on window.Settings"))}catch{if(typeof window<"u"&&typeof Settings<"u")try{window.Settings=Settings}catch{}}})();
