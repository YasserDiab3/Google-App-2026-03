const Settings={currentApprovalCircuitOwner:"__default__",async compressLogo(t,e=800,s=800,a=.8){return new Promise((o,n)=>{try{const i=new Image;i.onload=function(){try{let d=i.width,p=i.height;if(d>e||p>s){const v=Math.min(e/d,s/p);d=Math.round(d*v),p=Math.round(p*v)}const f=document.createElement("canvas");f.width=d,f.height=p;const h=f.getContext("2d");h.drawImage(i,0,0,d,p);const g=f.toDataURL("image/jpeg",a);if(g.length>45e3){if(a>.5){const v=f.toDataURL("image/jpeg",.5);if(v.length<=45e3){o(v);return}}if(d>600||p>600){const v=Math.min(600/d,600/p),S=Math.round(d*v),I=Math.round(p*v);f.width=S,f.height=I,h.clearRect(0,0,f.width,f.height),h.drawImage(i,0,0,S,I);const M=f.toDataURL("image/jpeg",.5);o(M);return}}o(g)}catch(d){n(d)}},i.onerror=function(){n(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"))},i.src=t}catch(i){n(i)}})},currentApprovalCircuitId:null,currentApprovalCircuitSteps:[],formSettingsState:null,formSettingsEventsBound:!1,getPostLoginItems(){const t=AppState?.companySettings?.postLoginItems;if(Array.isArray(t))return t.slice();if(typeof t=="string"&&t.trim()!=="")try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}return[]},renderPostLoginItemsList(){const t=document.getElementById("post-login-items-list");if(!t)return;const e=this.getPostLoginItems();if(e.length===0){t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631\xBB \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.</p>';return}const s=e.slice().sort((a,o)=>(a.order??999)-(o.order??999));t.innerHTML=s.map((a,o)=>{const n=Utils.escapeHTML((a.title||"").slice(0,60))||"(\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646)",i=a.durationSeconds!==void 0?a.durationSeconds:10,d=a.active!==!1,p=a.order??o;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-post-login-index="${o}" data-post-login-order="${p}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${n}</span>
                        <span class="text-xs text-gray-500 mr-2">${i} \u062B</span>
                        ${d?'<span class="text-xs text-green-600">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400">\u0645\u0639\u0637\u0651\u0644</span>'}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="post-login-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${o}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="post-login-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${o}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="post-login-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${o}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="post-login-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${o}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},parseHelpContent(t){const e={version:1,enabled:!1,introText:"",qaItems:[]};if(!t)return e;try{const s=typeof t=="string"?JSON.parse(t):t;return!s||typeof s!="object"?e:{version:1,enabled:s.enabled===!0,introText:String(s.introText||"").trim(),qaItems:Array.isArray(s.qaItems)?s.qaItems:[]}}catch{return e}},getHelpContentConfig(){return this.parseHelpContent(AppState?.companySettings?.helpContent)},getHelpContentQaItems(){return this.getHelpContentConfig().qaItems.slice().sort((t,e)=>(t.order??999)-(e.order??999))},setHelpContentConfig(t){AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.helpContent=JSON.stringify(t||{version:1,enabled:!1,introText:"",qaItems:[]})},renderHelpContentQaList(){const t=document.getElementById("help-content-qa-list");if(!t)return;const e=this.getHelpContentQaItems();if(!e.length){t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0626\u0644\u0629 \u0645\u062E\u0635\u0635\u0629. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644\xBB \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0646 \u0627\u0644\u0643\u0648\u062F.</p>';return}t.innerHTML=e.map((s,a)=>{const o=Utils.escapeHTML((s.question||"").slice(0,80))||"(\u0628\u062F\u0648\u0646 \u0633\u0624\u0627\u0644)",n=s.active!==!1;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-help-qa-index="${a}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${o}</span>
                        ${n?'<span class="text-xs text-green-600 mr-2">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400 mr-2">\u0645\u0639\u0637\u0651\u0644</span>'}
                        ${s.moduleId?`<span class="text-xs text-blue-600">\u0645\u0648\u062F\u064A\u0648\u0644: ${Utils.escapeHTML(s.moduleId)}</span>`:""}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="help-qa-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${a}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="help-qa-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${a}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="help-qa-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${a}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="help-qa-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${a}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},async saveHelpContentToBackend(){AppState.companySettings||(AppState.companySettings={});const t=this.getHelpContentConfig();if(this.setHelpContentConfig(t),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),!(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"))return{success:!0};try{const e=AppState.currentUser||{};return await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,profileTeamsUrl:AppState.companySettings.profileTeamsUrl||"",profileWhatsAppUrl:AppState.companySettings.profileWhatsAppUrl||"",address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),helpContent:AppState.companySettings.helpContent||JSON.stringify(t),userData:{email:e.email,name:e.name,role:e.role,permissions:e.permissions}})||{success:!1}}catch(e){return{success:!1,message:e?.message||String(e)}}},initHelpContentTabUI(){const t=this.getHelpContentConfig(),e=document.getElementById("help-content-enabled"),s=document.getElementById("help-content-intro");e&&(e.checked=t.enabled===!0),s&&(s.value=t.introText||""),this.renderHelpContentQaList()},bindHelpContentSettingsEvents(){if(this._helpContentEventsBound){this.initHelpContentTabUI();return}this._helpContentEventsBound=!0;const t=document.getElementById("help-content-qa-form"),e=document.getElementById("help-content-qa-form-title"),s=document.getElementById("help-content-qa-question"),a=document.getElementById("help-content-qa-answer"),o=document.getElementById("help-content-qa-module"),n=document.getElementById("help-content-qa-keywords"),i=document.getElementById("help-content-qa-active"),d=document.getElementById("help-content-qa-list");let p=-1;const f=()=>{t&&t.classList.add("hidden"),p=-1,e&&(e.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),a&&(a.value=""),o&&(o.value=""),n&&(n.value=""),i&&(i.checked=!0)},h=()=>{const g=document.getElementById("help-content-enabled"),v=document.getElementById("help-content-intro"),S=this.getHelpContentConfig();S.enabled=g?g.checked:S.enabled,S.introText=v?v.value.trim():S.introText,this.setHelpContentConfig(S)};this.initHelpContentTabUI(),document.getElementById("help-content-add-qa-btn")?.addEventListener("click",()=>{p=-1,e&&(e.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),a&&(a.value=""),o&&(o.value=""),n&&(n.value=""),i&&(i.checked=!0),t?.classList.remove("hidden")}),document.getElementById("help-content-qa-cancel-btn")?.addEventListener("click",f),document.getElementById("help-content-qa-save-btn")?.addEventListener("click",()=>{const g=s?.value?.trim()||"",v=a?.value?.trim()||"";if(!g||!v){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u0644\u0625\u062C\u0627\u0628\u0629.");return}const S=this.getHelpContentConfig(),I=this.getHelpContentQaItems(),M=I.length?Math.max(...I.map(A=>A.order??0)):0,D={id:p>=0&&I[p]?.id?I[p].id:"qa-"+Date.now(),question:g,answer:v,moduleId:o?.value?.trim()||"",keywords:n?.value?.trim()||"",active:i?i.checked:!0,order:p>=0?I[p].order??p:M+1};p>=0&&p<I.length?I[p]=D:I.push(D),S.qaItems=I,h(),this.setHelpContentConfig(S),this.renderHelpContentQaList(),f(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0624\u0627\u0644 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB \u0644\u0644\u0646\u0634\u0631.")}),d?.addEventListener("click",g=>{const v=g.target.closest(".help-qa-edit-btn"),S=g.target.closest(".help-qa-delete-btn"),I=g.target.closest(".help-qa-up-btn"),M=g.target.closest(".help-qa-down-btn"),D=v?.dataset?.index??S?.dataset?.index??I?.dataset?.index??M?.dataset?.index;if(D===void 0)return;const A=parseInt(D,10),T=this.getHelpContentConfig(),L=this.getHelpContentQaItems(),U=L[A];if(U){if(v){p=A,e&&(e.textContent="\u062A\u0639\u062F\u064A\u0644 \u0633\u0624\u0627\u0644"),s&&(s.value=U.question||""),a&&(a.value=U.answer||""),o&&(o.value=U.moduleId||""),n&&(n.value=U.keywords||""),i&&(i.checked=U.active!==!1),t?.classList.remove("hidden");return}if(S){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u0624\u0627\u0644\u061F"))return;L.splice(A,1),T.qaItems=L,this.setHelpContentConfig(T),this.renderHelpContentQaList();return}if(I&&A>0){const N=L[A].order??A;L[A].order=L[A-1].order??A-1,L[A-1].order=N,T.qaItems=L,this.setHelpContentConfig(T),this.renderHelpContentQaList()}if(M&&A<L.length-1){const N=L[A].order??A;L[A].order=L[A+1].order??A+1,L[A+1].order=N,T.qaItems=L,this.setHelpContentConfig(T),this.renderHelpContentQaList()}}}),document.getElementById("help-content-save-all-btn")?.addEventListener("click",async()=>{h();const g=await this.saveHelpContentToBackend();if(g?.success){if(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D."),typeof DataManager<"u"&&DataManager.loadCompanySettings)try{await DataManager.loadCompanySettings(!0)}catch{}}else Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638: "+(g?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}),document.getElementById("help-content-load-defaults-btn")?.addEventListener("click",()=>{if(!confirm("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u062A\u062D\u0631\u064A\u0631\u061F \u0633\u064A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u0648\u0627\u062C\u0647\u0629 (\u0644\u0645 \u064A\u064F\u062D\u0641\u0638 \u0628\u0639\u062F)."))return;if(typeof Help>"u"||typeof Help.getDefaultQaItems!="function"){Notification.error("\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644.");return}const g=this.getHelpContentConfig();g.enabled=!0,g.qaItems=Help.getDefaultQaItems().map((S,I)=>({id:S.id,question:S.question,answer:S.answer,moduleId:S.moduleId||"",keywords:S.keywords||"",active:!0,order:I+1}));const v=document.getElementById("help-content-enabled");v&&(v.checked=!0),this.setHelpContentConfig(g),this.renderHelpContentQaList(),Notification.info("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u2014 \u0631\u0627\u062C\u0639 \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB.")})},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("settings-section");if(t&&!(typeof Utils>"u")){if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized();const e=this.isCurrentUserAdmin();if(typeof Permissions<"u"&&(Permissions.formSettingsEventsBound=!1,Permissions._formSettingsBindDone=!1),t.innerHTML=`
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
                <div class="settings-group mt-6">
                    <div class="settings-group-header">
                        <h2 class="settings-group-title">
                            <i class="fas fa-envelope text-red-600 ml-2"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629
                        </h2>
                        <p class="settings-group-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0644\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A</p>
                    </div>
                    <div class="settings-group-content">
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title"><i class="fas fa-envelope ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-envelope-open-text ml-2"></i>
                                        \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0644\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A
                                    </label>
                                    <p class="text-xs text-gray-500 mb-2">
                                        <i class="fas fa-info-circle ml-1"></i>
                                        \u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0625\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648 \u062A\u0646\u0628\u064A\u0647
                                    </p>
                                    <div id="notification-emails-list" class="space-y-2 mb-3">
                                        ${(AppState.notificationEmails||[]).map((s,a)=>`
                                            <div class="flex items-center gap-2 p-2 border rounded bg-gray-50">
                                                <span class="flex-1">${Utils.escapeHTML(s)}</span>
                                                <button type="button" onclick="Settings.removeNotificationEmail(${a})" class="text-red-600 hover:text-red-800">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        `).join("")}
                                    </div>
                                    <div class="flex gap-2">
                                        <input type="email" id="notification-email-input" class="form-input flex-1" 
                                            placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0625\u064A\u0645\u064A\u0644 \u0644\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A">
                                        <button type="button" id="add-notification-email-btn" class="btn-primary">
                                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0625\u064A\u0645\u064A\u0644
                                        </button>
                                    </div>
                                    <button type="button" id="save-notification-emails-btn" class="btn-primary mt-2">
                                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                </div>
                `:'<div class="settings-group mt-6"><p class="text-gray-600">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</p></div>'}
            </div>
        `,this.setupEventListeners(),setTimeout(()=>{this.setupTabsNavigation();const s=document.getElementById("users-permissions-list");s&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:a=>{try{const o=document.createElement("i");o.className="fas fa-user text-gray-600",a.replaceWith(o)}catch{}}})},0),typeof Permissions<"u"&&typeof Permissions.initFormSettingsState=="function"&&Promise.resolve().then(async()=>{try{await Permissions.initFormSettingsState(),e&&document.getElementById("form-settings-card")&&(typeof Permissions.refreshFormSettingsUI=="function"&&Permissions.refreshFormSettingsUI(),typeof Permissions.bindFormSettingsEvents=="function"&&await Permissions.bindFormSettingsEvents())}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0647\u064A\u0626\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s)}}),e&&typeof Permissions<"u"){let s=0;const a=15,o=setInterval(()=>{s++;const n=document.getElementById("form-settings-card");if(n||s>=a)if(clearInterval(o),n&&!Permissions._formSettingsBindDone){Permissions._formSettingsBindDone=!0;try{typeof Permissions.bindFormSettingsEvents=="function"&&(Permissions.bindFormSettingsEvents(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C"))}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",i)}}else!n&&s>=a&&Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 form-settings-card \u0628\u0639\u062F "+a+" \u0645\u062D\u0627\u0648\u0644\u0629")},100)}}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",e),t&&(t.innerHTML=`
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
                `)}}},isCurrentUserAdmin(){if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0631 Permissions.isCurrentUserAdmin:",t)}return(AppState.currentUser?.role||"").toLowerCase()==="admin"},renderSystemVersionCard(){const t=typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion).trim():"\u2014",e=t==="\u2014"?t:`v${t}`;return`
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
                            <strong id="settings-app-version-value" dir="ltr" style="font-size:1.15rem;color:#0f766e;">${Utils.escapeHTML(e)}</strong>
                        </div>
                        <button type="button" id="settings-check-app-update-btn" class="btn-secondary btn-sm" style="align-self:flex-end;">
                            <i class="fas fa-sync-alt ml-2"></i>\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A
                        </button>
                    </div>
                </div>
            </div>`},setupTabsNavigation(){const t=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-content");t.forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-tab");t.forEach(i=>i.classList.remove("active")),e.forEach(i=>i.classList.remove("active")),a.classList.add("active");const n=document.getElementById(`tab-${o}`);n&&n.classList.add("active"),o==="form-settings"&&this.isCurrentUserAdmin()&&typeof Permissions<"u"&&typeof Permissions.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents().catch(i=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",i)}),o==="help-content"&&this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents()})});const s=document.querySelector(".tab-content.active");if(s){const a=s.id.replace("tab-",""),o=document.querySelector(`.tab-btn[data-tab="${a}"]`);o&&(t.forEach(n=>n.classList.remove("active")),o.classList.add("active"))}else{const a=t[0];a&&a.click()}},setupEventListeners(){this.isCurrentUserAdmin()&&typeof BackupUI<"u"&&setTimeout(()=>{BackupUI.init()},500),setTimeout(()=>{const t=document.getElementById("google-settings-form");t&&t.addEventListener("submit",r=>this.handleSubmit(r));const e=document.getElementById("test-connection-btn");e&&e.addEventListener("click",()=>this.testConnection());const s=document.getElementById("sync-data-btn");s&&s.addEventListener("click",()=>GoogleIntegration.syncData({silent:!1,showLoader:!0,notifyOnSuccess:!0,notifyOnError:!0,includeUsersSheet:!0}));const a=document.getElementById("initialize-sheets-btn");a&&a.addEventListener("click",()=>Settings.initializeSheets());const o=document.getElementById("save-all-data-btn");o&&o.addEventListener("click",async()=>{confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u061F
\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0647\u0646\u0627\u0643.`)&&await GoogleIntegration.saveAllToSheets()});const n=document.getElementById("generate-incidents-report-btn");n&&n.addEventListener("click",()=>Settings.generateReport("incidents"));const i=document.getElementById("generate-training-report-btn");i&&i.addEventListener("click",()=>Settings.generateReport("training"));const d=document.getElementById("generate-ptw-report-btn");d&&d.addEventListener("click",()=>Settings.generateReport("ptw"));const p=document.getElementById("generate-full-report-btn");p&&p.addEventListener("click",()=>Settings.generateReport("full"));const f=document.getElementById("generate-monthly-safety-report-ar-btn"),h=document.getElementById("generate-monthly-safety-report-en-btn");f&&f.addEventListener("click",()=>Settings.generateMonthlySafetyReport("ar")),h&&h.addEventListener("click",()=>Settings.generateMonthlySafetyReport("en"));const g=document.getElementById("settings-check-app-update-btn");g&&g.addEventListener("click",async()=>{if(typeof UI<"u"&&typeof UI.updateAppVersionDisplay=="function"&&UI.updateAppVersionDisplay(),typeof UI<"u"&&typeof UI._checkServerVersion=="function"){g.disabled=!0;try{await UI._checkServerVersion(),typeof Notification<"u"&&Notification.info("\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A. \u0625\u0646 \u0648\u064F\u062C\u062F \u0625\u0635\u062F\u0627\u0631 \u0623\u062D\u062F\u062B \u0633\u064A\u0638\u0647\u0631 \u0625\u0634\u0639\u0627\u0631.")}finally{g.disabled=!1}}else typeof Notification<"u"&&Notification.info("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: "+(AppState.appVersion||"\u2014"))});const v=document.getElementById("upload-logo-btn"),S=document.getElementById("company-logo-input"),I=document.getElementById("remove-logo-btn");v&&S&&(v.addEventListener("click",()=>{S.click()}),S.addEventListener("change",async r=>{const l=r.target.files[0];if(!l)return;if(l.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}const c=new FileReader;c.onload=async b=>{let m=b.target.result;try{m=await Settings.compressLogo(m),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+m.length+" \u062D\u0631\u0641)")}catch(u){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",u)}if(AppState.companyLogo=m,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=m,localStorage.setItem("company_logo",m),localStorage.setItem("hse_company_logo",m),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const u=AppState.currentUser||{},y=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:m,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:u.email,name:u.name,role:u.role,permissions:u.permissions}});if(y&&y.success)Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631")}catch(x){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",x)}},100);else{const x=y?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",x),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+x)}}catch(u){const y=u?.message||u?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",u),Notification.error("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+y)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:m}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),Settings.load()},c.onerror=()=>{Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0635\u0648\u0631\u0629")},c.readAsDataURL(l)})),I&&I.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0632\u0627\u0644\u0629 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},l=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}});l&&l.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l?.message)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631"),Settings.load()}});const M=document.getElementById("date-format-select"),D=document.getElementById("save-date-format-btn");D&&M&&D.addEventListener("click",()=>{AppState.dateFormat=M.value,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const A=document.getElementById("wh-total-override"),T=document.getElementById("wh-hours-per-day"),L=document.getElementById("wh-days-per-month"),U=document.getElementById("wh-months-per-year"),N=document.getElementById("wh-include-contractors"),et=document.getElementById("wh-multiplier-trir"),st=document.getElementById("wh-multiplier-afr"),at=document.getElementById("wh-multiplier-far"),it=document.getElementById("wh-multiplier-sr"),nt=document.getElementById("wh-multiplier-ir"),lt=document.getElementById("save-work-hours-settings-btn");(()=>{try{if(A&&(A.value=localStorage.getItem("hse_total_work_hours")||""),T&&(T.value=localStorage.getItem("hse_hours_per_day")||""),L&&(L.value=localStorage.getItem("hse_work_days_per_month")||""),U&&(U.value=localStorage.getItem("hse_work_months_per_year")||""),et&&(et.value=localStorage.getItem("hse_multiplier_trir")||""),st&&(st.value=localStorage.getItem("hse_multiplier_afr")||""),at&&(at.value=localStorage.getItem("hse_multiplier_far")||""),it&&(it.value=localStorage.getItem("hse_multiplier_sr")||""),nt&&(nt.value=localStorage.getItem("hse_multiplier_ir")||""),N){const r=localStorage.getItem("hse_work_hours_include_contractors");r===null||String(r).trim()===""?N.checked=!0:N.checked=r!=="0"&&String(r).toLowerCase()!=="false"&&String(r).toLowerCase()!=="no"}}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0628\u0626\u0629 \u062D\u0642\u0648\u0644 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",r)}})(),lt&&lt.addEventListener("click",()=>{try{const r=A&&String(A.value).trim();if(!r)localStorage.removeItem("hse_total_work_hours");else{const c=parseFloat(r.replace(/,/g,""));Number.isFinite(c)&&c>0?localStorage.setItem("hse_total_work_hours",String(c)):localStorage.removeItem("hse_total_work_hours")}const l=(c,b)=>{if(!b)return;const m=String(b.value).trim();if(m===""){localStorage.removeItem(c);return}const u=parseFloat(m.replace(/,/g,""));Number.isFinite(u)&&u>0?localStorage.setItem(c,String(u)):localStorage.removeItem(c)};l("hse_hours_per_day",T),l("hse_work_days_per_month",L),l("hse_work_months_per_year",U),l("hse_multiplier_trir",et),l("hse_multiplier_afr",st),l("hse_multiplier_far",at),l("hse_multiplier_sr",it),l("hse_multiplier_ir",nt),localStorage.setItem("hse_work_hours_include_contractors",N&&N.checked?"1":"0"),typeof Dashboard<"u"&&typeof Dashboard.updateKPIs=="function"&&Dashboard.updateKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.updateAllKPIs=="function"&&SafetyPerformanceKPIs.updateAllKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.queueScorecardRefresh=="function"&&SafetyPerformanceKPIs.queueScorecardRefresh(!0),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u062F\u064A\u062B \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645")}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644")}});const G=document.getElementById("company-name-input"),X=document.getElementById("company-name-font-size-input"),J=document.getElementById("company-secondary-name-input"),Q=document.getElementById("company-secondary-name-font-size-input"),$=document.getElementById("company-secondary-name-color-input"),B=document.getElementById("company-secondary-name-color-text-input"),ct=document.getElementById("form-version-input"),dt=document.getElementById("clinic-monthly-visits-threshold-input"),pt=document.getElementById("profile-teams-url-input"),mt=document.getElementById("profile-whatsapp-url-input"),C=document.getElementById("ppe-eligibility-rules-container"),ut=document.getElementById("ppe-add-rule-btn"),ft=document.getElementById("ppe-download-template-btn"),gt=document.getElementById("ppe-import-rules-btn"),R=document.getElementById("ppe-rules-import-file"),yt=document.getElementById("save-company-settings-btn"),k={items:[],rules:[]},Tt=r=>{let l=[];if(!r)return[];try{let c=r;if(typeof r=="string"&&(c=r.trim()?JSON.parse(r):[]),!Array.isArray(c))return[];l=c.filter(Boolean)}catch{return[]}return l.map(function(c){if(!c||typeof c!="object")return null;const b=String(c.equipmentType||c.itemName||"").trim();let m=parseInt(c.months,10);const u=parseInt(c.days,10)||0;return(isNaN(m)||m<0)&&(m=0),m=Math.min(120,m),m<1&&u>0&&(m=Math.min(120,Math.max(1,Math.ceil(u/30)))),b?{equipmentType:b,months:m,days:0}:null}).filter(Boolean)},Ut=r=>{const l=(r||"").trim(),c=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u2014</option>'];return k.items.forEach(b=>{const m=(b||"").toString(),u=Utils.escapeHTML(m),y=m.trim()===l?" selected":"";c.push(`<option value="${u}"${y}>${u}</option>`)}),c.join("")},K=()=>{if(!C)return;const r=C.scrollTop||0,l=window.scrollY||window.pageYOffset||0,c=m=>`
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
                                    ${m}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;if(!k.rules.length){C.innerHTML=c(`
                        <tr>
                            <td colspan="4" class="px-4 py-10 text-center text-sm text-slate-500 bg-gradient-to-b from-slate-50 to-white">
                                <i class="fas fa-table text-2xl text-teal-300 mb-2 block"></i>
                                \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0628\u0639\u062F. \u0627\u0636\u063A\u0637 <strong class="text-teal-700">\xAB\u0625\u0636\u0627\u0641\u0629 \u0635\u0641\xBB</strong> \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u0648\u0639\u062F\u062F \u0627\u0644\u0634\u0647\u0648\u0631\u060C \u0648\u0628\u0639\u062F\u0647\u0627 <strong class="text-teal-700">\xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB</strong>.
                            </td>
                        </tr>
                    `),C.scrollTop=r,window.scrollTo({top:l});return}const b=k.rules.map((m,u)=>{const y=Ut(m.equipmentType),x=Math.max(0,Math.min(120,parseInt(m.months,10)||0));return`
                    <tr class="ppe-rule-row hover:bg-blue-50/50 transition-colors" data-index="${u}">
                        <td class="px-3 py-3 text-center text-slate-500 font-semibold">${u+1}</td>
                        <td class="px-3 py-3 align-middle min-w-[10rem]">
                            <select class="form-input ppe-rule-item w-full text-sm border-blue-200/80 focus:ring-blue-500">${y}</select>
                        </td>
                        <td class="px-3 py-3 align-middle text-center">
                            <div class="inline-flex items-center justify-center gap-1">
                                <input type="number" class="form-input ppe-rule-months w-24 text-center text-sm border-blue-200/80 font-bold tabular-nums"
                                    min="1" max="120" step="1" inputmode="numeric" value="${x||""}" placeholder="1">
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
                    </tr>`}).join("");C.innerHTML=c(b),C.scrollTop=r,window.scrollTo({top:l}),C.querySelectorAll(".ppe-rule-remove").forEach((m,u)=>{m.addEventListener("click",()=>{k.rules.splice(u,1),K()})}),C.querySelectorAll(".ppe-rule-edit").forEach((m,u)=>{m.addEventListener("click",()=>{const y=C.querySelector(`.ppe-rule-row[data-index="${u}"]`);if(!y)return;y.classList.add("bg-blue-100","ring-1","ring-blue-300");const x=y.querySelector(".ppe-rule-item"),E=y.querySelector(".ppe-rule-months");x?x.focus():E&&E.focus(),setTimeout(()=>y.classList.remove("bg-blue-100","ring-1","ring-blue-300"),1200)})})},Mt=()=>{if(!C)return[];const r=Array.from(C.querySelectorAll(".ppe-rule-row")),l=new Set,c=[];return r.forEach(b=>{const m=b.querySelector(".ppe-rule-item"),u=b.querySelector(".ppe-rule-months"),y=(m?.value||"").trim();if(!y||l.has(y))return;let x=parseInt(u?.value,10);isNaN(x)||x<1||(x=Math.min(120,x),l.add(y),c.push({equipmentType:y,months:x,days:0}))}),c},Nt=()=>{if(!C)return Array.isArray(k.rules)?[...k.rules]:[];const r=Array.from(C.querySelectorAll(".ppe-rule-row"));return r.length?r.map(l=>{const c=l.querySelector(".ppe-rule-item"),b=l.querySelector(".ppe-rule-months"),m=(c?.value||"").trim();let u=parseInt(b?.value,10);return(isNaN(u)||u<1)&&(u=12),u=Math.min(120,u),{equipmentType:m,months:u,days:0}}):Array.isArray(k.rules)?[...k.rules]:[]},bt=r=>{const l=[],c=new Set;return(Array.isArray(r)?r:[]).forEach(b=>{if(!b||typeof b!="object")return;const m=String(b.equipmentType||b.itemName||b["\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641"]||b.\u0627\u0644\u0635\u0646\u0641||"").trim();let u=parseInt(b.months??b.\u0627\u0644\u0634\u0647\u0648\u0631??b.months,10);!m||c.has(m)||isNaN(u)||u<1||(u=Math.min(120,u),c.add(m),l.push({equipmentType:m,months:u,days:0}))}),l},Bt=r=>{const l=String(r||"").split(/\r?\n/).map(m=>m.trim()).filter(Boolean);if(!l.length)return[];const b=l.filter((m,u)=>u!==0||!/الصنف|نوع|months|month|الشهور/i.test(m)).map(m=>{const u=m.includes("	")?"	":",",y=m.split(u).map(x=>x.trim()).filter(Boolean);return y.length<2?null:{equipmentType:y[0],months:y[1]}}).filter(Boolean);return bt(b)},Dt=async r=>{if(!r)return;const l=(r.name||"").toLowerCase();let c=[];if(l.endsWith(".xlsx")||l.endsWith(".xls")){if(typeof XLSX>"u"){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0642\u0631\u0627\u0621\u0629 Excel \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0633\u062A\u062E\u062F\u0645 CSV \u0623\u0648 \u0641\u0639\u0651\u0644 \u0645\u0643\u062A\u0628\u0629 XLSX.");return}const b=await r.arrayBuffer(),m=XLSX.read(b,{type:"array"}),u=m.SheetNames&&m.SheetNames[0];if(!u){Notification.error("\u0645\u0644\u0641 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0623\u0648\u0631\u0627\u0642 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const y=m.Sheets[u],x=XLSX.utils.sheet_to_json(y,{defval:""});c=bt(x)}else{const b=await r.text();c=Bt(b)}if(!c.length){Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628: \u0627\u0644\u0635\u0646\u0641,\u0627\u0644\u0634\u0647\u0648\u0631");return}k.rules=c,K(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${c.length} \u0642\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D.`)},$t=async()=>{let r=[];try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const l=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});l&&l.success&&Array.isArray(l.data)&&(r=l.data.map(c=>(c&&(c.itemName||c.name)||"").toString().trim()).filter(Boolean))}}catch{r=[]}if(!r.length){const l=AppState.appData&&AppState.appData.ppe||[];r=[...new Set(l.map(c=>(c.equipmentType||"").toString().trim()).filter(Boolean))]}r.length||(r=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"]),k.items=Array.from(new Set(r)).sort((l,c)=>l.localeCompare(c,"ar"))};(async()=>(k.rules=Tt(AppState.companySettings?.ppeEligibilityRules),await $t(),K()))(),ut&&ut.addEventListener("click",()=>{k.rules=Nt(),k.rules.push({equipmentType:"",months:12,days:0}),K();const r=Array.from(C?.querySelectorAll(".ppe-rule-row")||[]),l=r[r.length-1],c=l?l.querySelector(".ppe-rule-item"):null;c&&typeof c.focus=="function"&&setTimeout(()=>c.focus(),0)}),ft&&ft.addEventListener("click",()=>{const l="\uFEFF"+[["\u0627\u0644\u0635\u0646\u0641","\u0627\u0644\u0634\u0647\u0648\u0631"],["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","12"],["\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","6"]].map(u=>u.join(",")).join(`
`),c=new Blob([l],{type:"text/csv;charset=utf-8;"}),b=URL.createObjectURL(c),m=document.createElement("a");m.href=b,m.download="ppe-eligibility-template.csv",document.body.appendChild(m),m.click(),m.remove(),URL.revokeObjectURL(b)}),gt&&R&&(gt.addEventListener("click",()=>R.click()),R.addEventListener("change",async()=>{const r=R.files&&R.files[0];try{await Dt(r)}catch(l){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(l?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{R.value=""}}));const vt=document.getElementById("reset-company-name-btn");$&&B&&($.addEventListener("input",()=>{B.value=$.value}),B.addEventListener("input",()=>{const r=B.value.trim();/^#[0-9A-Fa-f]{6}$/.test(r)&&($.value=r)})),yt&&G&&yt.addEventListener("click",async()=>{const r=G.value.trim();if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629.");return}const l=J?J.value.trim():"",c=ct&&ct.value.trim()||"1.0";let b=16;if(X){const w=parseInt(X.value,10);!isNaN(w)&&w>=8&&w<=72&&(b=w)}let m=14;if(Q){const w=parseInt(Q.value,10);!isNaN(w)&&w>=8&&w<=72&&(m=w)}let u="#6B7280";B&&B.value.trim()?u=B.value.trim():$&&(u=$.value);let y=10;if(dt){const w=parseInt(dt.value,10);!isNaN(w)&&w>=1&&w<=1e3&&(y=w)}const x=pt?pt.value.trim():"",E=mt?mt.value.trim():"";if(C){const w=Array.from(C.querySelectorAll(".ppe-rule-row"));for(const z of w){const kt=(z.querySelector(".ppe-rule-item")?.value||"").trim(),rt=z.querySelector(".ppe-rule-months")?.value,tt=parseInt(rt,10);if(kt&&(isNaN(tt)||tt<1)){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0635\u0627\u0644\u062D (\u0645\u0646 1 \u0625\u0644\u0649 120) \u0644\u0643\u0644 \u0635\u0646\u0641 \u0645\u062D\u062F\u062F \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629.");return}if(!kt&&rt!==""&&rt!==void 0&&!isNaN(tt)&&tt>=1){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641 \u0644\u0643\u0644 \u0635\u0641 \u0641\u064A\u0647 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.");return}}}const H=Mt(),Z=JSON.stringify(H);AppState.companySettings=Object.assign({},AppState.companySettings,{name:r,secondaryName:l,formVersion:c,nameFontSize:b,secondaryNameFontSize:m,secondaryNameColor:u,clinicMonthlyVisitsAlertThreshold:y,profileTeamsUrl:x,profileWhatsAppUrl:E,ppeEligibilityRules:Z}),DataManager.saveCompanySettings();let W=!0;if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const w=AppState.currentUser||{},z=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:r,secondaryName:l,formVersion:c,nameFontSize:b,secondaryNameFontSize:m,secondaryNameColor:u,clinicMonthlyVisitsAlertThreshold:y,profileTeamsUrl:x,profileWhatsAppUrl:E,ppeEligibilityRules:Z,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:w.email,name:w.name,role:w.role,permissions:w.permissions}});z&&z.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",z?.message),W=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(z?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(w){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",w),W=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0627\u062A\u0635\u0627\u0644/\u062E\u0627\u062F\u0645): "+(w?.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."))}W&&(typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638")}catch(w){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",w)}},100),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),Settings.load())}),AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.postLoginItems)||(AppState.companySettings.postLoginItems=Settings.getPostLoginItems()),Settings.renderPostLoginItemsList();const ht=document.getElementById("post-login-items-list"),St=document.getElementById("post-login-add-item-btn"),O=document.getElementById("post-login-item-form"),j=document.getElementById("post-login-form-title"),_=document.getElementById("post-login-item-title"),F=document.getElementById("post-login-item-body"),q=document.getElementById("post-login-item-duration"),P=document.getElementById("post-login-item-active"),xt=document.getElementById("post-login-item-save-btn"),wt=document.getElementById("post-login-item-cancel-btn");let V=-1;const It=()=>{O&&O.classList.add("hidden"),V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),_&&(_.value=""),F&&(F.value=""),q&&(q.value="10"),P&&(P.checked=!0)},Y=async()=>{if(AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=Settings.getPostLoginItems(),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},l={name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}};await GoogleIntegration.sendToAppsScript("saveCompanySettings",l)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062F\u062E\u0648\u0644:",r)}};St&&St.addEventListener("click",()=>{V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),_&&(_.value=""),F&&(F.value=""),q&&(q.value="10"),P&&(P.checked=!0),O&&O.classList.remove("hidden")}),wt&&wt.addEventListener("click",It),xt&&_&&F&&xt.addEventListener("click",async()=>{const r=_.value.trim(),l=F.value.trim(),c=parseInt(q?.value,10),b=P?P.checked:!0;if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646.");return}const u=Settings.getPostLoginItems().slice().sort((x,E)=>(x.order??999)-(E.order??999)),y=u.length?Math.max(...u.map(x=>x.order??0)):0;V>=0&&V<u.length?u[V]={title:r,body:l,durationSeconds:isNaN(c)?10:Math.min(120,Math.max(0,c)),order:u[V].order??V,active:b}:u.push({title:r,body:l,durationSeconds:isNaN(c)?10:Math.min(120,Math.max(0,c)),order:y+1,active:b}),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=u,await Y(),It(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0635\u0631.")}),ht&&ht.addEventListener("click",async r=>{const l=r.target.closest(".post-login-edit-btn"),c=r.target.closest(".post-login-delete-btn"),b=r.target.closest(".post-login-up-btn"),m=r.target.closest(".post-login-down-btn"),u=l?.dataset?.index??c?.dataset?.index??b?.dataset?.index??m?.dataset?.index;if(u===void 0)return;const y=parseInt(u,10),E=Settings.getPostLoginItems().slice().sort((Z,W)=>(Z.order??999)-(W.order??999)),H=E[y];if(H){if(l){V=y,j&&(j.textContent="\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0635\u0631"),_&&(_.value=H.title||""),F&&(F.value=H.body||""),q&&(q.value=String(H.durationSeconds??10)),P&&(P.checked=H.active!==!1),O&&O.classList.remove("hidden");return}if(c){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631\u061F"))return;E.splice(y,1),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=E,await Y(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631.");return}if(b&&y>0){[E[y-1].order,E[y].order]=[E[y].order,E[y-1].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=E,await Y(),Settings.renderPostLoginItemsList();return}m&&y<E.length-1&&([E[y].order,E[y+1].order]=[E[y+1].order,E[y].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=E,await Y(),Settings.renderPostLoginItemsList())}}),this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),vt&&G&&vt.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companySettings=Object.assign({},AppState.companySettings,{name:DEFAULT_COMPANY_NAME,nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280"}),G.value=DEFAULT_COMPANY_NAME,J&&(AppState.companySettings.secondaryName="",J.value=""),X&&(X.value="16"),Q&&(Q.value="14"),$&&($.value="#6B7280"),B&&(B.value="#6B7280"),DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},l=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:DEFAULT_COMPANY_NAME,secondaryName:"",formVersion:"1.0",nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}});l&&l.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",l?.message)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",r)}typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629")}catch(r){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",r)}},100),Notification.success("\u062A\u0645\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),Settings.load()}});const At=document.getElementById("view-activity-log-btn");At&&At.addEventListener("click",()=>{UserActivityLog.showModal()});const Et=document.getElementById("view-user-versions-btn");Et&&Et.addEventListener("click",()=>{typeof UserVersionsAdmin<"u"&&UserVersionsAdmin.open?UserVersionsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")}),this.isCurrentUserAdmin()&&typeof Permissions?.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents();const Lt=document.getElementById("add-notification-email-btn"),ot=document.getElementById("notification-email-input");Lt&&ot&&Lt.addEventListener("click",()=>{const r=ot.value.trim().toLowerCase();if(!r||!Utils.isValidEmail(r)){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0625\u064A\u0645\u064A\u0644 \u0635\u062D\u064A\u062D");return}if(AppState.notificationEmails||(AppState.notificationEmails=[]),AppState.notificationEmails.includes(r)){Notification.warning("\u0627\u0644\u0625\u064A\u0645\u064A\u0644 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}AppState.notificationEmails.push(r),ot.value="",typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");const l=document.getElementById("notification-emails-list");if(l){const c=document.createElement("div");c.className="flex items-center gap-2 p-2 border rounded bg-gray-50",c.innerHTML=`
                            <span class="flex-1">${Utils.escapeHTML(r)}</span>
                            <button type="button" onclick="Settings.removeNotificationEmail(${AppState.notificationEmails.length-1})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-times"></i>
                            </button>
                        `,l.appendChild(c)}Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644 \u0628\u0646\u062C\u0627\u062D")});const Ct=document.getElementById("save-notification-emails-btn");Ct&&Ct.addEventListener("click",()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}),this.bindViolationTypesEvents(),this.initializeApprovalCircuitsUI(),this.bindCloudStorageSettingsEvents()},100)},bindCloudStorageSettingsEvents(){const t=document.getElementById("onedrive-settings-form");t&&t.addEventListener("submit",async i=>{i.preventDefault();const d=document.getElementById("onedrive-enabled")?.checked||!1,p=document.getElementById("onedrive-client-id")?.value.trim()||"",f=document.getElementById("onedrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.onedrive.enabled=d,AppState.cloudStorageConfig.onedrive.clientId=p,f&&(AppState.cloudStorageConfig.onedrive.clientSecret=f),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A OneDrive \u0628\u0646\u062C\u0627\u062D"),this.load()});const e=document.getElementById("onedrive-authorize-btn");e&&e.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("onedrive"),this.load()}catch(i){Notification.error(i.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 OneDrive")}});const s=document.getElementById("googledrive-settings-form");s&&s.addEventListener("submit",async i=>{i.preventDefault();const d=document.getElementById("googledrive-enabled")?.checked||!1,p=document.getElementById("googledrive-client-id")?.value.trim()||"",f=document.getElementById("googledrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.googleDrive.enabled=d,AppState.cloudStorageConfig.googleDrive.clientId=p,f&&(AppState.cloudStorageConfig.googleDrive.clientSecret=f),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Drive \u0628\u0646\u062C\u0627\u062D"),this.load()});const a=document.getElementById("googledrive-authorize-btn");a&&a.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("googleDrive"),this.load()}catch(i){Notification.error(i.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 Google Drive")}});const o=document.getElementById("sharepoint-settings-form");o&&o.addEventListener("submit",async i=>{i.preventDefault();const d=document.getElementById("sharepoint-enabled")?.checked||!1,p=document.getElementById("sharepoint-client-id")?.value.trim()||"",f=document.getElementById("sharepoint-client-secret")?.value.trim()||"",h=document.getElementById("sharepoint-tenant-id")?.value.trim()||"",g=document.getElementById("sharepoint-site-url")?.value.trim()||"";AppState.cloudStorageConfig.sharepoint.enabled=d,AppState.cloudStorageConfig.sharepoint.clientId=p,f&&(AppState.cloudStorageConfig.sharepoint.clientSecret=f),AppState.cloudStorageConfig.sharepoint.tenantId=h,AppState.cloudStorageConfig.sharepoint.siteUrl=g,DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SharePoint \u0628\u0646\u062C\u0627\u062D"),this.load()});const n=document.getElementById("sharepoint-authorize-btn");n&&n.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("sharepoint"),this.load()}catch(i){Notification.error(i.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 SharePoint")}})},renderCloudStorageSettings(){const t=AppState.cloudStorageConfig.onedrive,e=AppState.cloudStorageConfig.googleDrive,s=AppState.cloudStorageConfig.sharepoint,a=t.enabled&&t.clientId&&t.accessToken?"success":"warning",o=e.enabled&&e.clientId&&e.accessToken?"success":"warning",n=s.enabled&&s.clientId&&s.accessToken?"success":"warning";return`
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
        `},_violationTypesImportNormalizeKey(t){return String(t??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationTypesImportPick(t,e){const s={};Object.keys(t||{}).forEach(a=>{s[this._violationTypesImportNormalizeKey(a)]=t[a]});for(let a=0;a<e.length;a++){const o=this._violationTypesImportNormalizeKey(e[a]);if(s[o]!==void 0&&s[o]!==null&&String(s[o]).trim()!=="")return s[o]}return""},_parseViolationTypeFineForImport(t){if(t==null||t==="")return 0;if(typeof Violations<"u"&&typeof Violations.parseFineAmount=="function")return Violations.parseFineAmount(t);const e=Number(String(t).replace(/[^\d.\-]/g,""));return Number.isFinite(e)&&e>=0?e:0},downloadViolationTypesImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const t=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629"],e=["\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629","\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A","500"],s=XLSX.utils.book_new(),a=XLSX.utils.aoa_to_sheet([t,e]);a["!cols"]=[{wch:40},{wch:50},{wch:14}],XLSX.utils.book_append_sheet(s,a,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const o=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],["\u2022 \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639\xBB \u0625\u0644\u0632\u0627\u0645\u064A."],["\u2022 \u0625\u0630\u0627 \u0648\u064F\u062C\u062F \u0646\u0648\u0639 \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B\u060C \u064A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641."],["\u2022 \xAB\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629\xBB \u0631\u0642\u0645 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 (\u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0631\u0642\u0627\u0645 \u0639\u0631\u0628\u064A\u0629 \u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D)."]];XLSX.utils.book_append_sheet(s,XLSX.utils.aoa_to_sheet(o),"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(s,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},exportViolationTypesToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}ViolationTypesManager.ensureInitialized();const t=ViolationTypesManager.getAll();if(!t.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}const e=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0639\u062F\u062F_\u0627\u0644\u0633\u062C\u0644\u0627\u062A"],s=t.map(i=>{const d=ViolationTypesManager.countUsage(i),p=Number(i.fineAmount||0);return[i.name||"",i.description||"",Number.isFinite(p)?p:0,i.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635",d]}),a=XLSX.utils.book_new(),o=XLSX.utils.aoa_to_sheet([e,...s]);o["!cols"]=[{wch:42},{wch:55},{wch:16},{wch:12},{wch:14}],XLSX.utils.book_append_sheet(a,o,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const n=new Date().toISOString().slice(0,10);XLSX.writeFile(a,`\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${n}.xlsx`),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${t.length} \u0646\u0648\u0639\u0627\u064B \u0625\u0644\u0649 Excel.`)},showViolationTypesImportModal(){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
            </div>`,document.body.appendChild(t);let e=[];const s=t.querySelector("#violation-types-import-preview"),a=t.querySelector("#violation-types-import-confirm");t.querySelector("#violation-types-import-download-template")?.addEventListener("click",()=>this.downloadViolationTypesImportTemplate()),t.querySelector("#violation-types-import-file")?.addEventListener("change",async o=>{const n=o.target.files&&o.target.files[0];if(e=[],a.disabled=!0,s.classList.add("hidden"),!!n){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const i=await n.arrayBuffer(),d=XLSX.read(i,{type:"array"}),p=d.Sheets[d.SheetNames[0]],f=XLSX.utils.sheet_to_json(p,{defval:""});e=Array.isArray(f)?f:[],s.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${e.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \xAB${Utils.escapeHTML(d.SheetNames[0]||"")}\xBB.</p>`,s.classList.remove("hidden"),a.disabled=e.length===0}catch(i){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",i),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(i.message||""))}}}),a?.addEventListener("click",async()=>{e.length&&(a.disabled=!0,await this.processViolationTypesImportRows(e,t))}),t.addEventListener("click",o=>{o.target===t&&t.remove()})},async processViolationTypesImportRows(t,e){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629.");return}ViolationTypesManager.ensureInitialized(),Array.isArray(AppState.appData.violationTypes)||(AppState.appData.violationTypes=[]);const s=new Date().toISOString();let a=0,o=0,n=0;for(let i=0;i<t.length;i++){const d=t[i]||{},p=String(this._violationTypesImportPick(d,["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639","name","typename","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"])||"").trim();if(!p){n++;continue}const f=String(this._violationTypesImportPick(d,["\u0627\u0644\u0648\u0635\u0641","description","notes"])||"").trim(),h=this._violationTypesImportPick(d,["\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629","fineamount","fine","defaultfine"]),g=this._parseViolationTypeFineForImport(h!==""&&h!==void 0?h:0),v=ViolationTypesManager.getTypeByName(p);v?(v.description=f,v.fineAmount=g,v.updatedAt=s,o++):(AppState.appData.violationTypes.push({id:Utils.generateId("VTYPE"),name:p,description:f,fineAmount:g,isDefault:!1,createdAt:s,updatedAt:s}),a++)}if(ViolationTypesManager.sortTypes(),ViolationTypesManager.ensureViolationsTypeIds(),typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}ViolationTypesManager.persist(!0),e&&e.parentNode&&e.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${a} \u0646\u0648\u0639 \u062C\u062F\u064A\u062F\u060C ${o} \u0645\u062D\u062F\u0651\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C ${n} \u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645.`),this.refreshViolationTypesList()},renderViolationTypesList(){const t=ViolationTypesManager.getAll();return t.length?`
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
            `},bindViolationTypesEvents(){const t=document.getElementById("add-violation-type-btn");t&&(t.onclick=()=>this.openViolationTypeModal());const e=document.getElementById("import-violation-types-btn");e&&(e.onclick=()=>this.showViolationTypesImportModal());const s=document.getElementById("export-violation-types-btn");s&&(s.onclick=()=>this.exportViolationTypesToExcel()),document.querySelectorAll('[data-action="view-violation-type"]').forEach(a=>{a.onclick=o=>{const n=o.currentTarget.getAttribute("data-type-id");this.viewViolationType(n)}}),document.querySelectorAll('[data-action="edit-violation-type"]').forEach(a=>{a.onclick=o=>{const n=o.currentTarget.getAttribute("data-type-id");this.openViolationTypeModal(n)}}),document.querySelectorAll('[data-action="delete-violation-type"]').forEach(a=>{a.onclick=o=>{const n=o.currentTarget.getAttribute("data-type-id");this.deleteViolationType(n)}})},refreshViolationTypesList(){const t=document.getElementById("violation-types-management");t&&(t.innerHTML=this.renderViolationTypesList(),this.bindViolationTypesEvents())},viewViolationType(t){try{if(!t||typeof ViolationTypesManager>"u")return;ViolationTypesManager.ensureInitialized?.();const e=ViolationTypesManager.getTypeById(t);if(!e||!e.name){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}typeof UI<"u"&&typeof UI.showSection=="function"&&UI.showSection("violations");const s=()=>typeof Violations>"u"?!1:(Violations.currentFilters||(Violations.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""}),Violations.currentFilters.violationType=e.name,typeof Violations.switchTab=="function"?Violations.switchTab("all"):typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations.refreshModule=="function"&&Violations.refreshModule(),!0);s()||setTimeout(()=>{s()||setTimeout(()=>s(),600)},250)}catch{Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}},openViolationTypeModal(t=null){const e=t?ViolationTypesManager.getTypeById(t):null;if(t&&!e){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
        `,document.body.appendChild(s),s.querySelector("#violation-type-form").addEventListener("submit",async o=>{o.preventDefault();const n=s.querySelector("#violation-type-name"),i=s.querySelector("#violation-type-description"),d=s.querySelector("#violation-type-fine-amount"),p=n?.value.trim()||"",f=i?.value.trim()||"",h=d?.value??"0",g=Number(h),v=Number.isFinite(g)&&g>=0?g:0;if(!p){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639"),n?.focus();return}try{e?(ViolationTypesManager.updateType(e.id,{name:p,description:f,fineAmount:v}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")):(ViolationTypesManager.addType({name:p,description:f,fineAmount:v}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")),s.remove(),this.refreshViolationTypesList()}catch(S){Notification.error(S.message)}}),s.addEventListener("click",o=>{o.target===s&&s.remove()})},deleteViolationType(t){if(!t)return;const e=ViolationTypesManager.getTypeById(t);if(!e){Notification.error("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=ViolationTypesManager.countUsage(e),a=s>0?`\u0647\u0646\u0627\u0643 ${s} \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0631\u062A\u0628\u0637 \u0628\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629\u060C \u0644\u0643\u0646 \u0644\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0646\u0648\u0639 \u0645\u062A\u0627\u062D\u0627\u064B \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F.
\u0647\u0644 \u062A\u0631\u063A\u0628 \u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u062D\u0630\u0641 "${e.name}"\u061F`:`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 "${e.name}"\u061F`;confirm(a)&&(async()=>{try{ViolationTypesManager.deleteType(t),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshViolationTypesList()}catch(o){Notification.error(o.message)}})()},normalizeOwner(t){return!t||t==="__default__"?"__default__":String(t)},renderApprovalOwnerOptions(t="__default__"){const e=this.normalizeOwner(t),s=ApprovalCircuits.getUsersList(),a=ApprovalCircuits.listOwners(),o=[];return o.push(`
            <option value="__default__" ${e==="__default__"?"selected":""}>
                \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)
            </option>
        `),s.forEach(n=>{const i=n.id||n.email,d=`${Utils.escapeHTML(n.name||n.email||"")}${n.email?` - ${Utils.escapeHTML(n.email)}`:""}`;o.push(`
                <option value="${Utils.escapeHTML(i)}" ${e===i?"selected":""}>
                    ${d}
                </option>
            `)}),a.filter(n=>n&&n!=="__default__"&&!s.some(i=>i.id===n)).forEach(n=>{const i=ApprovalCircuits.getCircuit(n);o.push(`
                    <option value="${Utils.escapeHTML(n)}" ${e===n?"selected":""}>
                        \u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F (${Utils.escapeHTML(i?.name||n)})
                    </option>
                `)}),o.join("")},renderApprovalStepsPlaceholder(){return`
            <div class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-600">
                <i class="fas fa-layer-group text-2xl text-gray-400 mb-3"></i>
                <p>\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0639\u0644\u0627\u0647 \u062B\u0645 \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u064A \u0643\u0644 \u0645\u0633\u062A\u0648\u0649.</p>
            </div>
        `},updateApprovalCircuitStatusLabel(){const t=document.getElementById("approval-circuit-active-label");if(!t)return;const e=this.normalizeOwner(this.currentApprovalCircuitOwner),s=ApprovalCircuits.getCircuit(e);if(!s||!Array.isArray(s.steps)||s.steps.length===0){t.style.display="none";return}const a=e==="__default__"?null:ApprovalCircuits.getUserById(e),o=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":a?.name||a?.email||`\u0645\u0633\u062A\u062E\u062F\u0645 ${e}`,n=s.steps.length;t.textContent=`${o} \u2022 ${n} \u0645\u0633\u062A\u0648\u0649${n>1?"\u0627\u062A":""}`,t.style.display="inline-flex"},renderApprovalSteps(){const t=document.getElementById("approval-steps-container");if(!t)return;if(!this.currentApprovalCircuitSteps||this.currentApprovalCircuitSteps.length===0){t.innerHTML=this.renderApprovalStepsPlaceholder(),this.updateApprovalCircuitStatusLabel();return}const e=ApprovalCircuits.getUsersList();t.innerHTML=this.currentApprovalCircuitSteps.map((s,a)=>this.renderApprovalStepCard(s,a,e)).join(""),this.updateApprovalCircuitStatusLabel()},renderApprovalStepCard(t,e,s){const a=this.getStepTitle(e),o=Array.isArray(t.userIds)?t.userIds:[],n=s.map(i=>{const d=i.id||i.email,p=`${Utils.escapeHTML(i.name||i.email||"")}${i.email?` (${Utils.escapeHTML(i.email)})`:""}`,f=o.includes(d)?"selected":"";return`<option value="${Utils.escapeHTML(d)}" ${f}>${p}</option>`}).join("");return`
            <div class="approval-step-card border border-gray-200 rounded-lg bg-gray-50 p-4" data-step-index="${e}" data-step-id="${Utils.escapeHTML(t.id||"")}">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700">${a}</h4>
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
                            ${n}
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
        `},getStepTitle(t){return["\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0644","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0646\u064A","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0644\u062B","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0631\u0627\u0628\u0639","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0627\u0645\u0633"][t]||`\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${t+1}`},refreshApprovalOwnerOptions(t="__default__"){const e=document.getElementById("approval-owner-select");e&&(e.innerHTML=this.renderApprovalOwnerOptions(t),e.value=this.normalizeOwner(t))},initializeApprovalCircuitsUI(){const t=document.getElementById("approval-owner-select");if(!t)return;const e=document.getElementById("add-approval-step-btn"),s=document.getElementById("save-approval-circuit-btn"),a=document.getElementById("delete-approval-circuit-btn"),o=document.getElementById("approval-steps-container"),n=this.normalizeOwner(t.value||"__default__");this.currentApprovalCircuitOwner=n,this.loadApprovalCircuitEditor(n),t.addEventListener("change",i=>{const d=this.normalizeOwner(i.target.value);this.currentApprovalCircuitOwner=d,this.loadApprovalCircuitEditor(d)}),e&&e.addEventListener("click",()=>this.addApprovalCircuitStep()),s&&s.addEventListener("click",()=>this.saveApprovalCircuit()),a&&a.addEventListener("click",()=>this.deleteApprovalCircuit()),o&&o.addEventListener("click",i=>{const d=i.target.closest("[data-remove-step-index]");if(d){const p=parseInt(d.getAttribute("data-remove-step-index"),10);Number.isNaN(p)||this.removeApprovalCircuitStep(p)}})},loadApprovalCircuitEditor(t){const e=this.normalizeOwner(t),s=ApprovalCircuits.getCircuit(e),a=document.getElementById("approval-circuit-name"),o=document.getElementById("delete-approval-circuit-btn");s?(this.currentApprovalCircuitId=s.id||null,this.currentApprovalCircuitSteps=Array.isArray(s.steps)?s.steps.map((n,i)=>({id:n.id||Utils.generateId("CSTEP"),name:n.name||n.role||"",userIds:Array.isArray(n.userIds)?n.userIds.filter(Boolean):[],required:n.required!==!1,isSafetyOfficer:n.isSafetyOfficer===!0,order:typeof n.order=="number"?n.order:i})):[],a&&(a.value=s.name||(e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""))):(this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],a&&(a.value=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"")),this.currentApprovalCircuitOwner=e,this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((n,i)=>Object.assign({},n,{order:i})),o&&(o.disabled=!s),this.renderApprovalSteps()},addApprovalCircuitStep(){Array.isArray(this.currentApprovalCircuitSteps)||(this.currentApprovalCircuitSteps=[]),this.currentApprovalCircuitSteps.push({id:Utils.generateId("CSTEP"),name:"",userIds:[],required:!0,isSafetyOfficer:!1,order:this.currentApprovalCircuitSteps.length}),this.renderApprovalSteps()},removeApprovalCircuitStep(t){Array.isArray(this.currentApprovalCircuitSteps)&&(this.currentApprovalCircuitSteps.splice(t,1),this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((e,s)=>Object.assign({},e,{order:s})),this.renderApprovalSteps())},collectApprovalCircuitData(){const t=this.normalizeOwner(this.currentApprovalCircuitOwner),e=document.getElementById("approval-circuit-name"),s=e?e.value.trim():"",a=document.querySelectorAll(".approval-step-card"),o=Array.from(a).map((n,i)=>{const d=n.getAttribute("data-step-id")||Utils.generateId("CSTEP"),p=n.querySelector(".approval-step-name"),f=n.querySelector(".approval-step-users"),h=n.querySelector(".approval-step-required"),g=n.querySelector(".approval-step-safety"),v=p?p.value.trim():"",S=f?Array.from(f.options).filter(I=>I.selected).map(I=>I.value):[];return{id:d,name:v,userIds:S,required:h?h.checked:!0,isSafetyOfficer:g?g.checked:!1,order:i}});return{id:this.currentApprovalCircuitId||Utils.generateId("CIR"),ownerId:t,name:s||(t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""),steps:o,updatedAt:new Date().toISOString()}},saveApprovalCircuit(){const t=this.collectApprovalCircuitData();if(!t.steps||t.steps.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u0649 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.");return}if(t.steps.some(a=>!a.name)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}if(t.steps.some(a=>!Array.isArray(a.userIds)||a.userIds.length===0)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}ApprovalCircuits.saveCircuit(t),this.currentApprovalCircuitId=t.id,this.currentApprovalCircuitSteps=t.steps.map((a,o)=>Object.assign({},a,{order:o})),this.refreshApprovalOwnerOptions(t.ownerId),this.renderApprovalSteps(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")},deleteApprovalCircuit(){const t=this.normalizeOwner(this.currentApprovalCircuitOwner),e=ApprovalCircuits.getCircuit(t);if(!e){Notification.info("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0627\u0631 \u0644\u062D\u0630\u0641\u0647.");return}const s=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":e.name||t;confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${s}"\u061F
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0633\u0627\u0628\u0642\u0629\u060C \u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.`)&&(ApprovalCircuits.deleteCircuit(t),this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],this.refreshApprovalOwnerOptions(t),this.loadApprovalCircuitEditor(t),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."))},renderUsersPermissionsList(){const t=AppState.appData.users||[];return t.length===0?`
                <div class="text-center text-gray-500 py-4">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                </div>
            `:t.map(e=>{const s=this.hasAccessForUser(e,"settings"),a=e.role==="admin"?"badge-danger":e.role==="safety_officer"?"badge-warning":"badge-info",o=e.role==="admin"?"\u0645\u062F\u064A\u0631":e.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645";return`
                <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                    <div class="flex items-center flex-1">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                            ${e.photo?(()=>{const n=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(e.photo):{canonical:String(e.photo),displaySrc:String(e.photo),needsProxy:!1,proxyFileId:""},i=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(n):"";return`<img src="${Utils.escapeHTML(n.displaySrc)}" alt="${Utils.escapeHTML(e.name)}"${i} class="settings-perm-user-photo w-full h-full rounded-full object-cover">`})():'<i class="fas fa-user text-gray-600"></i>'}
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold">${Utils.escapeHTML(e.name||"")}</div>
                            <div class="text-sm text-gray-600">${Utils.escapeHTML(e.email||"")}</div>
                        </div>
                        <div class="mr-4">
                            <span class="badge ${a}">${o}</span>
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
            `}).join("")},viewUserPermissions(t){const e=AppState.appData.users.find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=this.hasAccessForUser(e,"settings"),a=e.permissions||{},o=[{key:"dashboard",label:"\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{key:"nearmiss",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629"},{key:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{key:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{key:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{key:"fire-equipment",label:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"},{key:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{key:"contractors",label:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"},{key:"employees",label:"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"},{key:"behavior-monitoring",label:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0627\u062A"},{key:"chemical-safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629"},{key:"daily-observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629"},{key:"iso",label:"\u0646\u0638\u0627\u0645 ISO"},{key:"emergency",label:"\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626"},{key:"users",label:"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"},{key:"settings",label:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"}],n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
                                ${o.map(i=>{const d=this.hasAccessForUser(e,i.key);return`
                                        <div class="flex items-center justify-between p-2 border rounded ${d?"bg-green-50":"bg-gray-50"}">
                                            <span class="text-sm">${i.label}</span>
                                            ${d?'<i class="fas fa-check-circle text-green-600"></i>':'<i class="fas fa-times-circle text-gray-400"></i>'}
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
        `,document.body.appendChild(n),n.addEventListener("click",i=>{i.target===n&&n.remove()})},hasAccessForUser(t,e){if(t.role==="admin")return!0;const s=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t.permissions):t.permissions||{};return s&&s.hasOwnProperty(e)?s[e]===!0:!1},async handleSubmit(t){t.preventDefault();try{const e=document.getElementById("google-apps-script-enabled"),s=document.getElementById("google-apps-script-url"),a=document.getElementById("google-sheets-enabled"),o=document.getElementById("google-sheets-id");if(!e||!s||!a||!o){Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0642\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C");return}AppState.googleConfig.appsScript.enabled=e.checked,AppState.googleConfig.appsScript.scriptUrl=s.value.trim(),AppState.googleConfig.sheets.enabled=a.checked,AppState.googleConfig.sheets.spreadsheetId=o.value.trim();let n=!1;if(typeof window.DataManager<"u"&&window.DataManager.saveGoogleConfig)window.DataManager.saveGoogleConfig()?(n=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");else if(typeof window.DataManager<"u"&&window.DataManager.save)try{await window.DataManager.save(),n=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}else try{localStorage.setItem("hse_google_config",JSON.stringify(AppState.googleConfig)),n=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D (\u062D\u0641\u0638 \u0645\u062D\u0644\u064A)")}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+i.message)}if(n&&AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{Loading.show(),await new Promise(d=>setTimeout(d,500));const i=await GoogleIntegration.readFromSheets("Users");Loading.hide(),i&&Array.isArray(i)?Notification.success(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${i.length} \u0633\u062C\u0644`):Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")}catch(i){Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",i),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645:",e),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async testConnection(){Loading.show();try{if(AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl){const e=await Utils.promiseWithTimeout(GoogleIntegration.readFromSheets("Users"),3e4,`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646:
1. \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A
2. \u0635\u062D\u0629 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 (RPC)
3. \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0642\u064A\u0648\u062F \u0639\u0644\u0649 \u0627\u0644\u0634\u0628\u0643\u0629`);Loading.hide(),Notification.success("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0646\u062C\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 "+e.length+" \u0633\u062C\u0644")}else Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629")}catch(t){Loading.hide();const e=t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+e),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644:",t)}},async initializeSheets(){if(!AppState.googleConfig.appsScript.enabled){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u0648\u0644\u0627\u064B");return}if(!AppState.googleConfig.sheets.spreadsheetId){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0648\u0644\u0627\u064B \u0625\u0630\u0627 \u0643\u0627\u0646 \u0645\u0637\u0644\u0648\u0628\u0627\u064B");return}if(confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621:
${"Users, Incidents, NearMiss, PTW, Training, ClinicVisits, Medications, SickLeave, ClinicInventory, FireEquipment, FireEquipmentAssets, FireEquipmentInspections, PPE, Violations, Contractors, Employees, BehaviorMonitoring, ChemicalSafety, DailyObservations, ISODocuments, ISOProcedures, ISOForms, EmergencyAlerts, EmergencyPlans".split(", ").map(e=>`- ${e}`).join(`
`)}`))try{Loading.show(),await GoogleIntegration.initializeSheets(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642:",e),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642: "+e.message)}},getMonthlySafetyDefaultFromDate(){const t=new Date,e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0");return`${e}-${s}-01`},getMonthlySafetyDefaultToDate(){const t=new Date,e=new Date(t.getFullYear(),t.getMonth()+1,0),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${o}`},renderMonthlySafetyYearOptions(){const t=new Date().getFullYear();let e="";for(let s=t+1;s>=t-3;s-=1)e+=`<option value="${s}"${s===t?" selected":""}>${s}</option>`;return e},renderMonthlySafetyMonthOptions(){const t=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],e=new Date().getMonth()+1;return t.map((s,a)=>{const o=a+1;return`<option value="${o}"${o===e?" selected":""}>${s}</option>`}).join("")},async generateMonthlySafetyReport(t){if(!this.isCurrentUserAdmin()){const g=typeof Reports<"u"&&Reports.getTranslations?Reports.getTranslations().t("msg.adminOnlyReport"):"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637";Notification.error(g);return}if(typeof Reports>"u"||typeof Reports.downloadMonthlySafetyReport!="function"){Notification.error("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B");return}const e=document.getElementById("monthly-safety-from"),s=document.getElementById("monthly-safety-to"),a=document.getElementById("monthly-safety-site"),o=document.getElementById("monthly-safety-lang"),n=e?e.value:"",i=s?s.value:"",d=a?String(a.value||"").trim():"",p=t||(o?o.value:"ar")||"ar",f=typeof Reports.buildSafetyReportPeriod=="function"?Reports.buildSafetyReportPeriod(n,i):null,{t:h}=Reports.getTranslations?Reports.getTranslations():{t:g=>g};if(!f){Notification.error(h("msg.invalidDateRange"));return}Loading.show(p==="en"?"Preparing monthly safety report...":"\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A...");try{const g=await Reports.downloadMonthlySafetyReport(f,p,d||null);Loading.hide(),g&&Notification.success(p==="en"?"Monthly safety report downloaded":"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0628\u0646\u062C\u0627\u062D")}catch(g){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(g&&g.message?g.message:String(g)))}},async generateReport(t){Loading.show();try{await Reports.generateAndExport(t),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+e.message)}},removeNotificationEmail(t){AppState.notificationEmails&&AppState.notificationEmails[t]&&(AppState.notificationEmails.splice(t,1),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.load())},setupSettingsListeners(){setTimeout(()=>{const t=document.getElementById("save-date-format-btn");t&&t.addEventListener("click",()=>{const d=document.getElementById("date-format-select").value;AppState.dateFormat=d,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const e=document.getElementById("add-notification-email-btn"),s=document.getElementById("notification-email-input");e&&s&&e.addEventListener("click",()=>{const d=s.value.trim().toLowerCase();if(!d||!Utils.isValidEmail(d)){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0625\u064A\u0645\u064A\u0644 \u0635\u062D\u064A\u062D");return}if(AppState.notificationEmails||(AppState.notificationEmails=[]),AppState.notificationEmails.includes(d)){Notification.warning("\u0627\u0644\u0625\u064A\u0645\u064A\u0644 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}AppState.notificationEmails.push(d),s.value="";const p=document.getElementById("notification-emails-list");if(p){const f=document.createElement("div");f.className="flex items-center gap-2 p-2 border rounded bg-gray-50",f.innerHTML=`
                            <span class="flex-1">${Utils.escapeHTML(d)}</span>
                            <button type="button" onclick="Settings.removeNotificationEmail(${AppState.notificationEmails.length-1})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-times"></i>
                            </button>
                        `,p.appendChild(f)}});const a=document.getElementById("save-notification-emails-btn");a&&a.addEventListener("click",()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")});const o=document.getElementById("upload-logo-btn"),n=document.getElementById("company-logo-input");o&&n&&o.addEventListener("click",()=>{const d=n.files[0];if(!d){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629");return}if(d.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB");return}const p=new FileReader;p.onload=async f=>{let h=f.target.result;try{h=await Settings.compressLogo(h),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+h.length+" \u062D\u0631\u0641)")}catch(v){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",v)}if(AppState.companyLogo=h,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=h,localStorage.setItem("company_logo",h),localStorage.setItem("hse_company_logo",h),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const v=AppState.currentUser||{},S=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:h,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:v.email,name:v.name,role:v.role,permissions:v.permissions}});S&&S.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",S?.message)}catch(v){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",v)}const g=document.getElementById("company-logo-preview");g&&(g.src=AppState.companyLogo,g.style.display="block"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:h}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D")},p.readAsDataURL(d)});const i=document.getElementById("remove-logo-btn");i&&i.addEventListener("click",async()=>{if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const p=AppState.currentUser||{},f=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:p.email,name:p.name,role:p.role,permissions:p.permissions}});f&&f.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",f?.message)}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",p)}const d=document.getElementById("company-logo-preview");d&&(d.style.display="none"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),this.load()})},100)}};(function(){"use strict";try{typeof window<"u"&&typeof Settings<"u"&&(window.Settings=Settings,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Settings module loaded and available on window.Settings"))}catch{if(typeof window<"u"&&typeof Settings<"u")try{window.Settings=Settings}catch{}}})();
