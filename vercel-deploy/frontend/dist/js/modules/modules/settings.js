const Settings={currentApprovalCircuitOwner:"__default__",async compressLogo(e,t=800,s=800,n=.8){return new Promise((i,o)=>{try{const a=new Image;a.onload=function(){try{let l=a.width,c=a.height;if(l>t||c>s){const h=Math.min(t/l,s/c);l=Math.round(l*h),c=Math.round(c*h)}const p=document.createElement("canvas");p.width=l,p.height=c;const S=p.getContext("2d");S.drawImage(a,0,0,l,c);const d=p.toDataURL("image/jpeg",n);if(d.length>45e3){if(n>.5){const h=p.toDataURL("image/jpeg",.5);if(h.length<=45e3){i(h);return}}if(l>600||c>600){const h=Math.min(600/l,600/c),x=Math.round(l*h),w=Math.round(c*h);p.width=x,p.height=w,S.clearRect(0,0,p.width,p.height),S.drawImage(a,0,0,x,w);const B=p.toDataURL("image/jpeg",.5);i(B);return}}i(d)}catch(l){o(l)}},a.onerror=function(){o(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"))},a.src=e}catch(a){o(a)}})},currentApprovalCircuitId:null,currentApprovalCircuitSteps:[],formSettingsState:null,formSettingsEventsBound:!1,getPostLoginItems(){const e=AppState?.companySettings?.postLoginItems;if(Array.isArray(e))return e.slice();if(typeof e=="string"&&e.trim()!=="")try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}return[]},renderPostLoginItemsList(){const e=document.getElementById("post-login-items-list");if(!e)return;const t=this.getPostLoginItems();if(t.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631\xBB \u0644\u0628\u062F\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.</p>';return}const s=t.slice().sort((n,i)=>(n.order??999)-(i.order??999));e.innerHTML=s.map((n,i)=>{const o=Utils.escapeHTML((n.title||"").slice(0,60))||"(\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646)",a=n.durationSeconds!==void 0?n.durationSeconds:10,l=n.active!==!1,c=n.order??i;return`
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white" data-post-login-index="${i}" data-post-login-order="${c}">
                    <div class="flex-1 min-w-0">
                        <span class="font-medium text-gray-800">${o}</span>
                        <span class="text-xs text-gray-500 mr-2">${a} \u062B</span>
                        ${l?'<span class="text-xs text-green-600">\u0645\u0641\u0639\u0651\u0644</span>':'<span class="text-xs text-gray-400">\u0645\u0639\u0637\u0651\u0644</span>'}
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" class="post-login-edit-btn btn-icon btn-icon-secondary p-2" title="\u062A\u0639\u062F\u064A\u0644" data-index="${i}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="post-login-delete-btn btn-icon btn-icon-secondary p-2 text-red-600" title="\u062D\u0630\u0641" data-index="${i}"><i class="fas fa-trash"></i></button>
                        <button type="button" class="post-login-up-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0639\u0644\u0649" data-index="${i}"><i class="fas fa-arrow-up"></i></button>
                        <button type="button" class="post-login-down-btn btn-icon btn-icon-secondary p-2" title="\u0623\u0633\u0641\u0644" data-index="${i}"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </div>`}).join("")},parseHelpContent(e){const t={version:1,enabled:!1,introText:"",qaItems:[]};if(!e)return t;try{const s=typeof e=="string"?JSON.parse(e):e;return!s||typeof s!="object"?t:{version:1,enabled:s.enabled===!0,introText:String(s.introText||"").trim(),qaItems:Array.isArray(s.qaItems)?s.qaItems:[]}}catch{return t}},getHelpContentConfig(){return this.parseHelpContent(AppState?.companySettings?.helpContent)},getHelpContentQaItems(){return this.getHelpContentConfig().qaItems.slice().sort((e,t)=>(e.order??999)-(t.order??999))},setHelpContentConfig(e){AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.helpContent=JSON.stringify(e||{version:1,enabled:!1,introText:"",qaItems:[]})},renderHelpContentQaList(){const e=document.getElementById("help-content-qa-list");if(!e)return;const t=this.getHelpContentQaItems();if(!t.length){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0626\u0644\u0629 \u0645\u062E\u0635\u0635\u0629. \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644\xBB \u0623\u0648 \u0641\u0639\u0651\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0646 \u0627\u0644\u0643\u0648\u062F.</p>';return}e.innerHTML=t.map((s,n)=>{const i=Utils.escapeHTML((s.question||"").slice(0,80))||"(\u0628\u062F\u0648\u0646 \u0633\u0624\u0627\u0644)",o=s.active!==!1;return`
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
                </div>`}).join("")},async saveHelpContentToBackend(){AppState.companySettings||(AppState.companySettings={});const e=this.getHelpContentConfig();if(this.setHelpContentConfig(e),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),!(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"))return{success:!0};try{const t=AppState.currentUser||{};return await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,profileTeamsUrl:AppState.companySettings.profileTeamsUrl||"",profileWhatsAppUrl:AppState.companySettings.profileWhatsAppUrl||"",address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),helpContent:AppState.companySettings.helpContent||JSON.stringify(e),userData:{email:t.email,name:t.name,role:t.role,permissions:t.permissions}})||{success:!1}}catch(t){return{success:!1,message:t?.message||String(t)}}},initHelpContentTabUI(){const e=this.getHelpContentConfig(),t=document.getElementById("help-content-enabled"),s=document.getElementById("help-content-intro");t&&(t.checked=e.enabled===!0),s&&(s.value=e.introText||""),this.renderHelpContentQaList()},bindHelpContentSettingsEvents(){if(this._helpContentEventsBound){this.initHelpContentTabUI();return}this._helpContentEventsBound=!0;const e=document.getElementById("help-content-qa-form"),t=document.getElementById("help-content-qa-form-title"),s=document.getElementById("help-content-qa-question"),n=document.getElementById("help-content-qa-answer"),i=document.getElementById("help-content-qa-module"),o=document.getElementById("help-content-qa-keywords"),a=document.getElementById("help-content-qa-active"),l=document.getElementById("help-content-qa-list");let c=-1;const p=()=>{e&&e.classList.add("hidden"),c=-1,t&&(t.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),n&&(n.value=""),i&&(i.value=""),o&&(o.value=""),a&&(a.checked=!0)},S=()=>{const d=document.getElementById("help-content-enabled"),h=document.getElementById("help-content-intro"),x=this.getHelpContentConfig();x.enabled=d?d.checked:x.enabled,x.introText=h?h.value.trim():x.introText,this.setHelpContentConfig(x)};this.initHelpContentTabUI(),document.getElementById("help-content-add-qa-btn")?.addEventListener("click",()=>{c=-1,t&&(t.textContent="\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644 \u062C\u062F\u064A\u062F"),s&&(s.value=""),n&&(n.value=""),i&&(i.value=""),o&&(o.value=""),a&&(a.checked=!0),e?.classList.remove("hidden")}),document.getElementById("help-content-qa-cancel-btn")?.addEventListener("click",p),document.getElementById("help-content-qa-save-btn")?.addEventListener("click",()=>{const d=s?.value?.trim()||"",h=n?.value?.trim()||"";if(!d||!h){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u0644\u0625\u062C\u0627\u0628\u0629.");return}const x=this.getHelpContentConfig(),w=this.getHelpContentQaItems(),B=w.length?Math.max(...w.map(y=>y.order??0)):0,I={id:c>=0&&w[c]?.id?w[c].id:"qa-"+Date.now(),question:d,answer:h,moduleId:i?.value?.trim()||"",keywords:o?.value?.trim()||"",active:a?a.checked:!0,order:c>=0?w[c].order??c:B+1};c>=0&&c<w.length?w[c]=I:w.push(I),x.qaItems=w,S(),this.setHelpContentConfig(x),this.renderHelpContentQaList(),p(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0624\u0627\u0644 \u0645\u062D\u0644\u064A\u0627\u064B \u2014 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB \u0644\u0644\u0646\u0634\u0631.")}),l?.addEventListener("click",d=>{const h=d.target.closest(".help-qa-edit-btn"),x=d.target.closest(".help-qa-delete-btn"),w=d.target.closest(".help-qa-up-btn"),B=d.target.closest(".help-qa-down-btn"),I=h?.dataset?.index??x?.dataset?.index??w?.dataset?.index??B?.dataset?.index;if(I===void 0)return;const y=parseInt(I,10),k=this.getHelpContentConfig(),L=this.getHelpContentQaItems(),U=L[y];if(U){if(h){c=y,t&&(t.textContent="\u062A\u0639\u062F\u064A\u0644 \u0633\u0624\u0627\u0644"),s&&(s.value=U.question||""),n&&(n.value=U.answer||""),i&&(i.value=U.moduleId||""),o&&(o.value=U.keywords||""),a&&(a.checked=U.active!==!1),e?.classList.remove("hidden");return}if(x){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u0624\u0627\u0644\u061F"))return;L.splice(y,1),k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList();return}if(w&&y>0){const _=L[y].order??y;L[y].order=L[y-1].order??y-1,L[y-1].order=_,k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList()}if(B&&y<L.length-1){const _=L[y].order??y;L[y].order=L[y+1].order??y+1,L[y+1].order=_,k.qaItems=L,this.setHelpContentConfig(k),this.renderHelpContentQaList()}}}),document.getElementById("help-content-save-all-btn")?.addEventListener("click",async()=>{S();const d=await this.saveHelpContentToBackend();if(d?.success){if(Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D."),typeof DataManager<"u"&&DataManager.loadCompanySettings)try{await DataManager.loadCompanySettings(!0)}catch{}}else Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638: "+(d?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}),document.getElementById("help-content-load-defaults-btn")?.addEventListener("click",()=>{if(!confirm("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u062A\u062D\u0631\u064A\u0631\u061F \u0633\u064A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u0648\u0627\u062C\u0647\u0629 (\u0644\u0645 \u064A\u064F\u062D\u0641\u0638 \u0628\u0639\u062F)."))return;if(typeof Help>"u"||typeof Help.getDefaultQaItems!="function"){Notification.error("\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644.");return}const d=this.getHelpContentConfig();d.enabled=!0,d.qaItems=Help.getDefaultQaItems().map((x,w)=>({id:x.id,question:x.question,answer:x.answer,moduleId:x.moduleId||"",keywords:x.keywords||"",active:!0,order:w+1}));const h=document.getElementById("help-content-enabled");h&&(h.checked=!0),this.setHelpContentConfig(d),this.renderHelpContentQaList(),Notification.info("\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u2014 \u0631\u0627\u062C\u0639 \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u062D\u0641\u0638 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\xBB.")})},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("settings-section");if(e&&!(typeof Utils>"u")){if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}try{typeof ViolationTypesManager<"u"&&ViolationTypesManager.ensureInitialized&&ViolationTypesManager.ensureInitialized();const t=this.isCurrentUserAdmin();if(typeof Permissions<"u"&&(Permissions.formSettingsEventsBound=!1,Permissions._formSettingsBindDone=!1),e.innerHTML=`
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
                        <p class="settings-group-subtitle">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u062E\u0627\u062F\u0645 SQL \u0648\u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
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
                                            placeholder="https://www.safety-icapp.com/api/exec">
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
        `,this.setupEventListeners(),setTimeout(()=>{this.setupTabsNavigation();const s=document.getElementById("users-permissions-list");s&&typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(s,{onFetchFail:n=>{try{const i=document.createElement("i");i.className="fas fa-user text-gray-600",n.replaceWith(i)}catch{}}})},0),typeof Permissions<"u"&&typeof Permissions.initFormSettingsState=="function"&&Promise.resolve().then(async()=>{try{await Permissions.initFormSettingsState(),t&&document.getElementById("form-settings-card")&&(typeof Permissions.refreshFormSettingsUI=="function"&&Permissions.refreshFormSettingsUI(),typeof Permissions.bindFormSettingsEvents=="function"&&await Permissions.bindFormSettingsEvents())}catch(s){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u0647\u064A\u0626\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",s)}}),t&&typeof Permissions<"u"){let s=0;const n=15,i=setInterval(()=>{s++;const o=document.getElementById("form-settings-card");if(o||s>=n)if(clearInterval(i),o&&!Permissions._formSettingsBindDone){Permissions._formSettingsBindDone=!0;try{typeof Permissions.bindFormSettingsEvents=="function"&&(Permissions.bindFormSettingsEvents(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C"))}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0623\u062D\u062F\u0627\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",a)}}else!o&&s>=n&&Utils.safeWarn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 form-settings-card \u0628\u0639\u062F "+n+" \u0645\u062D\u0627\u0648\u0644\u0629")},100)}}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",t),e&&(e.innerHTML=`
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
                `)}}},isCurrentUserAdmin(){if(typeof Permissions?.isCurrentUserAdmin=="function")try{return Permissions.isCurrentUserAdmin()}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0631 Permissions.isCurrentUserAdmin:",e)}return(AppState.currentUser?.role||"").toLowerCase()==="admin"},renderSystemVersionCard(){const e=typeof AppState<"u"&&AppState.appVersion?String(AppState.appVersion).trim():"\u2014",t=typeof I18n<"u"&&I18n.currentLang==="en"||document.documentElement.lang==="en",s=e==="\u2014"?e:t?`Version${e}`:`V.${e}`;return`
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
            </div>`},renderEmergencyContactsCard(){return`
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
            </div>`},async loadEmergencyContactsSettings(){try{const e=document.getElementById("settings-clinic-phone"),t=document.getElementById("settings-hse-phone"),s=document.getElementById("settings-fire-phone"),n=document.getElementById("settings-security-phone"),i=document.getElementById("settings-ambulance-phone"),o=document.getElementById("settings-natfire-phone"),a=document.getElementById("settings-police-phone");let l=null;try{const c=localStorage.getItem("HSE_EMERGENCY_CONTACTS_CACHE");c&&(l=JSON.parse(c))}catch{}if(l||(l={clinicPhone:"01000000001",hsePhone:"01000000002",firePhone:"01000000003",securityPhone:"01000000004",ambulancePhone:"123",nationalFirePhone:"180",policePhone:"122"}),e&&(e.value=l.clinicPhone||""),t&&(t.value=l.hsePhone||""),s&&(s.value=l.firePhone||""),n&&(n.value=l.securityPhone||""),i&&(i.value=l.ambulancePhone||"123"),o&&(o.value=l.nationalFirePhone||"180"),a&&(a.value=l.policePhone||"122"),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"){const c=await GoogleIntegration.sendRequest({action:"getHseEmergencyContacts"});if(c&&c.success&&c.contacts){l=c.contacts;try{localStorage.setItem("HSE_EMERGENCY_CONTACTS_CACHE",JSON.stringify(l))}catch{}e&&(e.value=l.clinicPhone||""),t&&(t.value=l.hsePhone||""),s&&(s.value=l.firePhone||""),n&&(n.value=l.securityPhone||""),i&&(i.value=l.ambulancePhone||"123"),o&&(o.value=l.nationalFirePhone||"180"),a&&(a.value=l.policePhone||"122")}}}catch{}},async saveEmergencyContactsSettings(){const e=document.getElementById("settings-clinic-phone"),t=document.getElementById("settings-hse-phone"),s=document.getElementById("settings-fire-phone"),n=document.getElementById("settings-security-phone"),i=document.getElementById("settings-ambulance-phone"),o=document.getElementById("settings-natfire-phone"),a=document.getElementById("settings-police-phone"),l=document.getElementById("btn-save-emergency-contacts"),c={clinicPhone:e?e.value.trim():"01000000001",hsePhone:t?t.value.trim():"01000000002",firePhone:s?s.value.trim():"01000000003",securityPhone:n?n.value.trim():"01000000004",ambulancePhone:i?i.value.trim():"123",nationalFirePhone:o?o.value.trim():"180",policePhone:a?a.value.trim():"122"};try{l&&(l.disabled=!0,l.innerHTML='<i class="fas fa-circle-notch fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638 \u0628\u0627\u0644\u0633\u062D\u0627\u0628\u0629...');try{localStorage.setItem("HSE_EMERGENCY_CONTACTS_CACHE",JSON.stringify(c))}catch{}if(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"){const p=await GoogleIntegration.sendRequest({action:"saveHseEmergencyContacts",data:{...c,adminPin:"2026",updatedBy:AppState&&AppState.currentUser&&(AppState.currentUser.name||AppState.currentUser.username)||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"}});if(p&&p.success)typeof Notification<"u"&&typeof Notification.success=="function"?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0628\u0646\u062C\u0627\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0634\u064A\u062A HSE_Settings"):alert("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0628\u0646\u062C\u0627\u062D \u0648\u0645\u0632\u0627\u0645\u0646\u062A\u0647\u0627 \u0628\u0634\u064A\u062A HSE_Settings");else throw new Error(p&&p.message||"\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638")}else typeof Notification<"u"&&typeof Notification.success=="function"&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0645\u062D\u0644\u064A\u0627\u064B")}catch(p){typeof Notification<"u"&&typeof Notification.error=="function"?Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A: "+(p.message||p)):alert("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A: "+p.message)}finally{l&&(l.disabled=!1,l.innerHTML='<i class="fas fa-cloud-arrow-up ml-2"></i>\u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645 \u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0633\u062D\u0627\u0628\u064A\u0627\u064B')}},setupTabsNavigation(){const e=document.querySelectorAll(".tab-btn"),t=document.querySelectorAll(".tab-content");e.forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-tab");e.forEach(a=>a.classList.remove("active")),t.forEach(a=>a.classList.remove("active")),n.classList.add("active");const o=document.getElementById(`tab-${i}`);o&&o.classList.add("active"),i==="form-settings"&&this.isCurrentUserAdmin()&&typeof Permissions<"u"&&typeof Permissions.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents().catch(a=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u0645\u0627\u0630\u062C:",a)}),i==="system-settings"&&this.isCurrentUserAdmin()&&this.loadEmergencyContactsSettings(),i==="help-content"&&this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),i==="notifications"&&this.isCurrentUserAdmin()&&this.ensureEmailSettingsLoaded(!1)})});const s=document.querySelector(".tab-content.active");if(s){const n=s.id.replace("tab-",""),i=document.querySelector(`.tab-btn[data-tab="${n}"]`);i&&(e.forEach(o=>o.classList.remove("active")),i.classList.add("active"))}else{const n=e[0];n&&n.click()}},setupEventListeners(){this.isCurrentUserAdmin()&&typeof BackupUI<"u"&&setTimeout(()=>{BackupUI.init()},500),setTimeout(()=>{const e=document.getElementById("google-settings-form");e&&e.addEventListener("submit",r=>this.handleSubmit(r));const t=document.getElementById("test-connection-btn");t&&t.addEventListener("click",()=>this.testConnection());const s=document.getElementById("sync-data-btn");s&&s.addEventListener("click",()=>GoogleIntegration.syncData({silent:!1,showLoader:!0,notifyOnSuccess:!0,notifyOnError:!0,includeUsersSheet:!0}));const n=document.getElementById("initialize-sheets-btn");n&&n.addEventListener("click",()=>Settings.initializeSheets());const i=document.getElementById("save-all-data-btn");i&&i.addEventListener("click",async()=>{confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u061F
\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0647\u0646\u0627\u0643.`)&&await GoogleIntegration.saveAllToSheets()});const o=document.getElementById("generate-incidents-report-btn");o&&o.addEventListener("click",()=>Settings.generateReport("incidents"));const a=document.getElementById("generate-training-report-btn");a&&a.addEventListener("click",()=>Settings.generateReport("training"));const l=document.getElementById("generate-ptw-report-btn");l&&l.addEventListener("click",()=>Settings.generateReport("ptw"));const c=document.getElementById("generate-full-report-btn");c&&c.addEventListener("click",()=>Settings.generateReport("full"));const p=document.getElementById("generate-monthly-safety-report-ar-btn"),S=document.getElementById("generate-monthly-safety-report-en-btn");p&&p.addEventListener("click",()=>Settings.generateMonthlySafetyReport("ar")),S&&S.addEventListener("click",()=>Settings.generateMonthlySafetyReport("en"));const d=document.getElementById("settings-check-app-update-btn");d&&d.addEventListener("click",async()=>{if(typeof UI<"u"&&typeof UI.updateAppVersionDisplay=="function"&&UI.updateAppVersionDisplay(),typeof UI<"u"&&typeof UI._checkServerVersion=="function"){d.disabled=!0;try{await UI._checkServerVersion(),typeof Notification<"u"&&Notification.info("\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A. \u0625\u0646 \u0648\u064F\u062C\u062F \u0625\u0635\u062F\u0627\u0631 \u0623\u062D\u062F\u062B \u0633\u064A\u0638\u0647\u0631 \u0625\u0634\u0639\u0627\u0631.")}finally{d.disabled=!1}}else typeof Notification<"u"&&Notification.info("\u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A: "+(AppState.appVersion||"\u2014"))});const h=document.getElementById("upload-logo-btn"),x=document.getElementById("company-logo-input"),w=document.getElementById("remove-logo-btn");h&&x&&(h.addEventListener("click",()=>{x.click()}),x.addEventListener("change",async r=>{const m=r.target.files[0];if(!m)return;if(m.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB");return}const u=new FileReader;u.onload=async v=>{let g=v.target.result;try{g=await Settings.compressLogo(g),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+g.length+" \u062D\u0631\u0641)")}catch(f){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",f)}if(AppState.companyLogo=g,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=g,localStorage.setItem("company_logo",g),localStorage.setItem("hse_company_logo",g),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const f=AppState.currentUser||{},b=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:g,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:f.email,name:f.name,role:f.role,permissions:f.permissions}});if(b&&b.success)Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),b.data&&typeof DataManager.applyCompanySettingsFromServer=="function"&&DataManager.applyCompanySettingsFromServer(b.data,{preserveLocalLogo:!0,updateUI:!0});else{const A=b?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",A),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+A)}}catch(f){const b=f?.message||f?.toString()||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",f),Notification.error("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+b)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:g}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),Settings.load()},u.onerror=()=>{Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0635\u0648\u0631\u0629")},u.readAsDataURL(m)})),w&&w.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0632\u0627\u0644\u0629 \u0634\u0639\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},m=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",clearLogo:!0,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}});m&&m.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",m?.message)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r)}typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631"),Settings.load()}});const B=document.getElementById("date-format-select"),I=document.getElementById("save-date-format-btn");I&&B&&I.addEventListener("click",()=>{AppState.dateFormat=B.value,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const y=document.getElementById("wh-total-override"),k=document.getElementById("wh-hours-per-day"),L=document.getElementById("wh-days-per-month"),U=document.getElementById("wh-months-per-year"),_=document.getElementById("wh-include-contractors"),te=document.getElementById("wh-multiplier-trir"),se=document.getElementById("wh-multiplier-afr"),ie=document.getElementById("wh-multiplier-far"),ae=document.getElementById("wh-multiplier-sr"),ne=document.getElementById("wh-multiplier-ir"),ce=document.getElementById("save-work-hours-settings-btn");(()=>{try{if(y&&(y.value=localStorage.getItem("hse_total_work_hours")||""),k&&(k.value=localStorage.getItem("hse_hours_per_day")||""),L&&(L.value=localStorage.getItem("hse_work_days_per_month")||""),U&&(U.value=localStorage.getItem("hse_work_months_per_year")||""),te&&(te.value=localStorage.getItem("hse_multiplier_trir")||""),se&&(se.value=localStorage.getItem("hse_multiplier_afr")||""),ie&&(ie.value=localStorage.getItem("hse_multiplier_far")||""),ae&&(ae.value=localStorage.getItem("hse_multiplier_sr")||""),ne&&(ne.value=localStorage.getItem("hse_multiplier_ir")||""),_){const r=localStorage.getItem("hse_work_hours_include_contractors");r===null||String(r).trim()===""?_.checked=!0:_.checked=r!=="0"&&String(r).toLowerCase()!=="false"&&String(r).toLowerCase()!=="no"}}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0628\u0626\u0629 \u062D\u0642\u0648\u0644 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",r)}})(),ce&&ce.addEventListener("click",()=>{try{const r=y&&String(y.value).trim();if(!r)localStorage.removeItem("hse_total_work_hours");else{const u=parseFloat(r.replace(/,/g,""));Number.isFinite(u)&&u>0?localStorage.setItem("hse_total_work_hours",String(u)):localStorage.removeItem("hse_total_work_hours")}const m=(u,v)=>{if(!v)return;const g=String(v.value).trim();if(g===""){localStorage.removeItem(u);return}const f=parseFloat(g.replace(/,/g,""));Number.isFinite(f)&&f>0?localStorage.setItem(u,String(f)):localStorage.removeItem(u)};m("hse_hours_per_day",k),m("hse_work_days_per_month",L),m("hse_work_months_per_year",U),m("hse_multiplier_trir",te),m("hse_multiplier_afr",se),m("hse_multiplier_far",ie),m("hse_multiplier_sr",ae),m("hse_multiplier_ir",ne),localStorage.setItem("hse_work_hours_include_contractors",_&&_.checked?"1":"0"),typeof Dashboard<"u"&&typeof Dashboard.updateKPIs=="function"&&Dashboard.updateKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.updateAllKPIs=="function"&&SafetyPerformanceKPIs.updateAllKPIs(),typeof SafetyPerformanceKPIs<"u"&&typeof SafetyPerformanceKPIs.queueScorecardRefresh=="function"&&SafetyPerformanceKPIs.queueScorecardRefresh(!0),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u062F\u064A\u062B \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645")}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644:",r),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644")}});const de=document.getElementById("btn-save-emergency-contacts");de&&de.addEventListener("click",()=>{this.saveEmergencyContactsSettings()}),this.isCurrentUserAdmin()&&this.loadEmergencyContactsSettings();const G=document.getElementById("company-name-input"),W=document.getElementById("company-name-font-size-input"),X=document.getElementById("company-secondary-name-input"),J=document.getElementById("company-secondary-name-font-size-input"),$=document.getElementById("company-secondary-name-color-input"),D=document.getElementById("company-secondary-name-color-text-input"),pe=document.getElementById("form-version-input"),me=document.getElementById("clinic-monthly-visits-threshold-input"),ue=document.getElementById("employee-import-hire-months-input"),ge=document.getElementById("profile-teams-url-input"),fe=document.getElementById("profile-whatsapp-url-input"),T=document.getElementById("ppe-eligibility-rules-container"),ye=document.getElementById("ppe-add-rule-btn"),be=document.getElementById("ppe-download-template-btn"),he=document.getElementById("ppe-import-rules-btn"),O=document.getElementById("ppe-rules-import-file"),ve=document.getElementById("save-company-settings-btn"),M={items:[],rules:[]},Me=r=>{let m=[];if(!r)return[];try{let u=r;if(typeof r=="string"&&(u=r.trim()?JSON.parse(r):[]),!Array.isArray(u))return[];m=u.filter(Boolean)}catch{return[]}return m.map(function(u){if(!u||typeof u!="object")return null;const v=String(u.equipmentType||u.itemName||"").trim();let g=parseInt(u.months,10);const f=parseInt(u.days,10)||0;return(isNaN(g)||g<0)&&(g=0),g=Math.min(120,g),g<1&&f>0&&(g=Math.min(120,Math.max(1,Math.ceil(f/30)))),v?{equipmentType:v,months:g,days:0}:null}).filter(Boolean)},_e=r=>{const m=(r||"").trim(),u=['<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u2014</option>'];return M.items.forEach(v=>{const g=(v||"").toString(),f=Utils.escapeHTML(g),b=g.trim()===m?" selected":"";u.push(`<option value="${f}"${b}>${f}</option>`)}),u.join("")},Q=()=>{if(!T)return;const r=T.scrollTop||0,m=window.scrollY||window.pageYOffset||0,u=g=>`
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
                                    ${g}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;if(!M.rules.length){T.innerHTML=u(`
                        <tr>
                            <td colspan="4" class="px-4 py-10 text-center text-sm text-slate-500 bg-gradient-to-b from-slate-50 to-white">
                                <i class="fas fa-table text-2xl text-teal-300 mb-2 block"></i>
                                \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0628\u0639\u062F. \u0627\u0636\u063A\u0637 <strong class="text-teal-700">\xAB\u0625\u0636\u0627\u0641\u0629 \u0635\u0641\xBB</strong> \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641 \u0648\u0639\u062F\u062F \u0627\u0644\u0634\u0647\u0648\u0631\u060C \u0648\u0628\u0639\u062F\u0647\u0627 <strong class="text-teal-700">\xAB\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629\xBB</strong>.
                            </td>
                        </tr>
                    `),T.scrollTop=r,window.scrollTo({top:m});return}const v=M.rules.map((g,f)=>{const b=_e(g.equipmentType),A=Math.max(0,Math.min(120,parseInt(g.months,10)||0));return`
                    <tr class="ppe-rule-row hover:bg-blue-50/50 transition-colors" data-index="${f}">
                        <td class="px-3 py-3 text-center text-slate-500 font-semibold">${f+1}</td>
                        <td class="px-3 py-3 align-middle min-w-[10rem]">
                            <select class="form-input ppe-rule-item w-full text-sm border-blue-200/80 focus:ring-blue-500">${b}</select>
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
                    </tr>`}).join("");T.innerHTML=u(v),T.scrollTop=r,window.scrollTo({top:m}),T.querySelectorAll(".ppe-rule-remove").forEach((g,f)=>{g.addEventListener("click",()=>{M.rules.splice(f,1),Q()})}),T.querySelectorAll(".ppe-rule-edit").forEach((g,f)=>{g.addEventListener("click",()=>{const b=T.querySelector(`.ppe-rule-row[data-index="${f}"]`);if(!b)return;b.classList.add("bg-blue-100","ring-1","ring-blue-300");const A=b.querySelector(".ppe-rule-item"),C=b.querySelector(".ppe-rule-months");A?A.focus():C&&C.focus(),setTimeout(()=>b.classList.remove("bg-blue-100","ring-1","ring-blue-300"),1200)})})},De=()=>{if(!T)return[];const r=Array.from(T.querySelectorAll(".ppe-rule-row")),m=new Set,u=[];return r.forEach(v=>{const g=v.querySelector(".ppe-rule-item"),f=v.querySelector(".ppe-rule-months"),b=(g?.value||"").trim();if(!b||m.has(b))return;let A=parseInt(f?.value,10);isNaN(A)||A<1||(A=Math.min(120,A),m.add(b),u.push({equipmentType:b,months:A,days:0}))}),u},Ne=()=>{if(!T)return Array.isArray(M.rules)?[...M.rules]:[];const r=Array.from(T.querySelectorAll(".ppe-rule-row"));return r.length?r.map(m=>{const u=m.querySelector(".ppe-rule-item"),v=m.querySelector(".ppe-rule-months"),g=(u?.value||"").trim();let f=parseInt(v?.value,10);return(isNaN(f)||f<1)&&(f=12),f=Math.min(120,f),{equipmentType:g,months:f,days:0}}):Array.isArray(M.rules)?[...M.rules]:[]},Se=r=>{const m=[],u=new Set;return(Array.isArray(r)?r:[]).forEach(v=>{if(!v||typeof v!="object")return;const g=String(v.equipmentType||v.itemName||v["\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641"]||v.\u0627\u0644\u0635\u0646\u0641||"").trim();let f=parseInt(v.months??v.\u0627\u0644\u0634\u0647\u0648\u0631??v.months,10);!g||u.has(g)||isNaN(f)||f<1||(f=Math.min(120,f),u.add(g),m.push({equipmentType:g,months:f,days:0}))}),m},$e=r=>{const m=String(r||"").split(/\r?\n/).map(g=>g.trim()).filter(Boolean);if(!m.length)return[];const v=m.filter((g,f)=>f!==0||!/الصنف|نوع|months|month|الشهور/i.test(g)).map(g=>{const f=g.includes("	")?"	":",",b=g.split(f).map(A=>A.trim()).filter(Boolean);return b.length<2?null:{equipmentType:b[0],months:b[1]}}).filter(Boolean);return Se(v)},Fe=async r=>{if(!r)return;const m=(r.name||"").toLowerCase();let u=[];if(m.endsWith(".xlsx")||m.endsWith(".xls")){if(typeof XLSX>"u"){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0642\u0631\u0627\u0621\u0629 Excel \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0633\u062A\u062E\u062F\u0645 CSV \u0623\u0648 \u0641\u0639\u0651\u0644 \u0645\u0643\u062A\u0628\u0629 XLSX.");return}const v=await r.arrayBuffer(),g=XLSX.read(v,{type:"array"}),f=g.SheetNames&&g.SheetNames[0];if(!f){Notification.error("\u0645\u0644\u0641 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0623\u0648\u0631\u0627\u0642 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const b=g.Sheets[f],A=XLSX.utils.sheet_to_json(b,{defval:""});u=Se(A)}else{const v=await r.text();u=$e(v)}if(!u.length){Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628: \u0627\u0644\u0635\u0646\u0641,\u0627\u0644\u0634\u0647\u0648\u0631");return}M.rules=u,Q(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${u.length} \u0642\u0627\u0639\u062F\u0629 \u0628\u0646\u062C\u0627\u062D.`)},Pe=async()=>{let r=[];try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const m=await GoogleIntegration.sendToAppsScript("getPPEItemsList",{});m&&m.success&&Array.isArray(m.data)&&(r=m.data.map(u=>(u&&(u.itemName||u.name)||"").toString().trim()).filter(Boolean))}}catch{r=[]}if(!r.length){const m=AppState.appData&&AppState.appData.ppe||[];r=[...new Set(m.map(u=>(u.equipmentType||"").toString().trim()).filter(Boolean))]}r.length||(r=["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","\u0642\u0641\u0627\u0632\u0627\u062A","\u0623\u062D\u0630\u064A\u0629 \u0623\u0645\u0627\u0646","\u0633\u062A\u0631\u0629 \u0639\u0627\u0643\u0633\u0629","\u0633\u062F\u0627\u062F\u0627\u062A \u0623\u0630\u0646","\u0643\u0645\u0627\u0645\u0629","\u0628\u062F\u0644\u0629 \u0648\u0627\u0642\u064A\u0629","\u062D\u0632\u0627\u0645 \u0623\u0645\u0627\u0646","\u0645\u0639\u062F\u0627\u062A \u062D\u0645\u0627\u064A\u0629 \u062A\u0646\u0641\u0633\u064A\u0629"]),M.items=Array.from(new Set(r)).sort((m,u)=>m.localeCompare(u,"ar"))};(async()=>(M.rules=Me(AppState.companySettings?.ppeEligibilityRules),await Pe(),Q()))(),ye&&ye.addEventListener("click",()=>{M.rules=Ne(),M.rules.push({equipmentType:"",months:12,days:0}),Q();const r=Array.from(T?.querySelectorAll(".ppe-rule-row")||[]),m=r[r.length-1],u=m?m.querySelector(".ppe-rule-item"):null;u&&typeof u.focus=="function"&&setTimeout(()=>u.focus(),0)}),be&&be.addEventListener("click",()=>{const m="\uFEFF"+[["\u0627\u0644\u0635\u0646\u0641","\u0627\u0644\u0634\u0647\u0648\u0631"],["\u062E\u0648\u0630\u0629 \u0623\u0645\u0627\u0646","12"],["\u0646\u0638\u0627\u0631\u0627\u062A \u0648\u0642\u0627\u064A\u0629","6"]].map(f=>f.join(",")).join(`
`),u=new Blob([m],{type:"text/csv;charset=utf-8;"}),v=URL.createObjectURL(u),g=document.createElement("a");g.href=v,g.download="ppe-eligibility-template.csv",document.body.appendChild(g),g.click(),g.remove(),URL.revokeObjectURL(v)}),he&&O&&(he.addEventListener("click",()=>O.click()),O.addEventListener("change",async()=>{const r=O.files&&O.files[0];try{await Fe(r)}catch(m){Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(m?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{O.value=""}}));const xe=document.getElementById("reset-company-name-btn");$&&D&&($.addEventListener("input",()=>{D.value=$.value}),D.addEventListener("input",()=>{const r=D.value.trim();/^#[0-9A-Fa-f]{6}$/.test(r)&&($.value=r)})),ve&&G&&ve.addEventListener("click",async()=>{const r=G.value.trim();if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629.");return}const m=X?X.value.trim():"",u=pe&&pe.value.trim()||"1.0";let v=16;if(W){const E=parseInt(W.value,10);!isNaN(E)&&E>=8&&E<=72&&(v=E)}let g=14;if(J){const E=parseInt(J.value,10);!isNaN(E)&&E>=8&&E<=72&&(g=E)}let f="#6B7280";D&&D.value.trim()?f=D.value.trim():$&&(f=$.value);let b=10;if(me){const E=parseInt(me.value,10);!isNaN(E)&&E>=1&&E<=1e3&&(b=E)}let A=3;if(ue){const E=parseInt(ue.value,10);!isNaN(E)&&E>=1&&E<=120&&(A=E)}const C=ge?ge.value.trim():"",q=fe?fe.value.trim():"";if(T){const E=Array.from(T.querySelectorAll(".ppe-rule-row"));for(const N of E){const Ue=(N.querySelector(".ppe-rule-item")?.value||"").trim(),re=N.querySelector(".ppe-rule-months")?.value,ee=parseInt(re,10);if(Ue&&(isNaN(ee)||ee<1)){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0635\u0627\u0644\u062D (\u0645\u0646 1 \u0625\u0644\u0649 120) \u0644\u0643\u0644 \u0635\u0646\u0641 \u0645\u062D\u062F\u062F \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629.");return}if(!Ue&&re!==""&&re!==void 0&&!isNaN(ee)&&ee>=1){Notification.error("\u064A\u064F\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0641 \u0644\u0643\u0644 \u0635\u0641 \u0641\u064A\u0647 \u0639\u062F\u062F \u0634\u0647\u0648\u0631 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642.");return}}}const oe=De(),K=JSON.stringify(oe),Z=String(AppState.companySettings?.logo||AppState.companyLogo||localStorage.getItem("hse_company_logo")||localStorage.getItem("company_logo")||"").trim();AppState.companySettings=Object.assign({},AppState.companySettings,{name:r,secondaryName:m,formVersion:u,nameFontSize:v,secondaryNameFontSize:g,secondaryNameColor:f,clinicMonthlyVisitsAlertThreshold:b,employeeImportHireMonths:A,profileTeamsUrl:C,profileWhatsAppUrl:q,ppeEligibilityRules:K,logo:Z}),Z&&(AppState.companyLogo=Z),DataManager.saveCompanySettings();let le=!0;if(AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const E=AppState.currentUser||{},N=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:r,secondaryName:m,formVersion:u,nameFontSize:v,secondaryNameFontSize:g,secondaryNameColor:f,clinicMonthlyVisitsAlertThreshold:b,employeeImportHireMonths:A,profileTeamsUrl:C,profileWhatsAppUrl:q,ppeEligibilityRules:K,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:Z,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:E.email,name:E.name,role:E.role,permissions:E.permissions}});N&&N.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),N.data&&typeof DataManager.applyCompanySettingsFromServer=="function"&&DataManager.applyCompanySettingsFromServer(N.data,{preserveLocalLogo:!0,allowClearLogo:!1,updateUI:!1})):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",N?.message),le=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(N?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(E){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",E),le=!1,Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0627\u062A\u0635\u0627\u0644/\u062E\u0627\u062F\u0645): "+(E?.message||"\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."))}le&&(typeof UI<"u"&&(typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof UI.updateCompanyLogoHeader=="function"&&UI.updateCompanyLogoHeader(),typeof UI.updateLoginLogo=="function"&&UI.updateLoginLogo()),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D"),Settings.load())}),AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.postLoginItems)||(AppState.companySettings.postLoginItems=Settings.getPostLoginItems()),Settings.renderPostLoginItemsList();const Ie=document.getElementById("post-login-items-list"),we=document.getElementById("post-login-add-item-btn"),z=document.getElementById("post-login-item-form"),j=document.getElementById("post-login-form-title"),F=document.getElementById("post-login-item-title"),P=document.getElementById("post-login-item-body"),R=document.getElementById("post-login-item-duration"),H=document.getElementById("post-login-item-active"),Ee=document.getElementById("post-login-item-save-btn"),Ae=document.getElementById("post-login-item-cancel-btn");let V=-1;const Le=()=>{z&&z.classList.add("hidden"),V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),F&&(F.value=""),P&&(P.value=""),R&&(R.value="10"),H&&(H.checked=!0)},Y=async()=>{if(AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=Settings.getPostLoginItems(),typeof DataManager<"u"&&DataManager.saveCompanySettings&&DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},m={name:AppState.companySettings.name||"",secondaryName:AppState.companySettings.secondaryName||"",formVersion:AppState.companySettings.formVersion||"1.0",nameFontSize:AppState.companySettings.nameFontSize||16,secondaryNameFontSize:AppState.companySettings.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings.employeeImportHireMonths??3,address:AppState.companySettings.address||"",phone:AppState.companySettings.phone||"",email:AppState.companySettings.email||"",logo:AppState.companySettings.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}};await GoogleIntegration.sendToAppsScript("saveCompanySettings",m)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062F\u062E\u0648\u0644:",r)}};we&&we.addEventListener("click",()=>{V=-1,j&&(j.textContent="\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F"),F&&(F.value=""),P&&(P.value=""),R&&(R.value="10"),H&&(H.checked=!0),z&&z.classList.remove("hidden")}),Ae&&Ae.addEventListener("click",Le),Ee&&F&&P&&Ee.addEventListener("click",async()=>{const r=F.value.trim(),m=P.value.trim(),u=parseInt(R?.value,10),v=H?H.checked:!0;if(!r){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646.");return}const f=Settings.getPostLoginItems().slice().sort((A,C)=>(A.order??999)-(C.order??999)),b=f.length?Math.max(...f.map(A=>A.order??0)):0;V>=0&&V<f.length?f[V]={title:r,body:m,durationSeconds:isNaN(u)?10:Math.min(120,Math.max(0,u)),order:f[V].order??V,active:v}:f.push({title:r,body:m,durationSeconds:isNaN(u)?10:Math.min(120,Math.max(0,u)),order:b+1,active:v}),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=f,await Y(),Le(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0635\u0631.")}),Ie&&Ie.addEventListener("click",async r=>{const m=r.target.closest(".post-login-edit-btn"),u=r.target.closest(".post-login-delete-btn"),v=r.target.closest(".post-login-up-btn"),g=r.target.closest(".post-login-down-btn"),f=m?.dataset?.index??u?.dataset?.index??v?.dataset?.index??g?.dataset?.index;if(f===void 0)return;const b=parseInt(f,10),C=Settings.getPostLoginItems().slice().sort((oe,K)=>(oe.order??999)-(K.order??999)),q=C[b];if(q){if(m){V=b,j&&(j.textContent="\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0635\u0631"),F&&(F.value=q.title||""),P&&(P.value=q.body||""),R&&(R.value=String(q.durationSeconds??10)),H&&(H.checked=q.active!==!1),z&&z.classList.remove("hidden");return}if(u){if(!confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631\u061F"))return;C.splice(b,1),AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await Y(),Settings.renderPostLoginItemsList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631.");return}if(v&&b>0){[C[b-1].order,C[b].order]=[C[b].order,C[b-1].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await Y(),Settings.renderPostLoginItemsList();return}g&&b<C.length-1&&([C[b].order,C[b+1].order]=[C[b+1].order,C[b].order],AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.postLoginItems=C,await Y(),Settings.renderPostLoginItemsList())}}),this.isCurrentUserAdmin()&&Settings.bindHelpContentSettingsEvents(),xe&&G&&xe.addEventListener("click",async()=>{if(confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u0634\u0631\u0643\u0629\u061F")){if(AppState.companySettings=Object.assign({},AppState.companySettings,{name:DEFAULT_COMPANY_NAME,nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280"}),G.value=DEFAULT_COMPANY_NAME,X&&(AppState.companySettings.secondaryName="",X.value=""),W&&(W.value="16"),J&&(J.value="14"),$&&($.value="#6B7280"),D&&(D.value="#6B7280"),DataManager.saveCompanySettings(),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const r=AppState.currentUser||{},m=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:DEFAULT_COMPANY_NAME,secondaryName:"",formVersion:"1.0",nameFontSize:16,secondaryNameFontSize:14,secondaryNameColor:"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:AppState.companySettings?.logo||AppState.companyLogo||"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:r.email,name:r.name,role:r.role,permissions:r.permissions}});m&&m.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645:",m?.message)}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645:",r)}typeof UI<"u"&&typeof UI.updateCompanyBranding=="function"&&UI.updateCompanyBranding(),typeof DataManager<"u"&&DataManager.loadCompanySettings&&setTimeout(async()=>{try{await DataManager.loadCompanySettings(!0),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629")}catch(r){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629:",r)}},100),Notification.success("\u062A\u0645\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),Settings.load()}});const Ce=document.getElementById("view-activity-log-btn");Ce&&Ce.addEventListener("click",()=>{UserActivityLog.showModal()});const ke=document.getElementById("view-user-versions-btn");ke&&ke.addEventListener("click",()=>{typeof UserVersionsAdmin<"u"&&UserVersionsAdmin.open?UserVersionsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const Be=document.getElementById("view-client-errors-btn");Be&&Be.addEventListener("click",()=>{typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():Notification.error("\u0644\u0648\u062D\u0629 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u062D\u0627\u0648\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.")});const Te=document.getElementById("open-client-errors-section-btn");if(Te&&Te.addEventListener("click",()=>{typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection("client-errors"):typeof ClientErrorsAdmin<"u"&&ClientErrorsAdmin.open?ClientErrorsAdmin.open():location.hash="#client-errors"}),this.isCurrentUserAdmin()&&typeof Permissions?.bindFormSettingsEvents=="function"&&Permissions.bindFormSettingsEvents(),this.isCurrentUserAdmin()){this._emailSettingsUiReady=!1,this.bindEmailSettingsEvents();const r=document.getElementById("tab-notifications");r&&r.classList.contains("active")&&this.ensureEmailSettingsLoaded(!1)}this.bindViolationTypesEvents(),this.initializeApprovalCircuitsUI(),this.bindCloudStorageSettingsEvents()},100)},ensureEmailSettingsLoaded(e){return!this.isCurrentUserAdmin()||!document.getElementById("email-settings-modules-list")?null:this._emailSettingsLoadingPromise&&!e?this._emailSettingsLoadingPromise:(this._emailSettingsLoadingPromise=this.loadEmailSettingsUI({force:!!e}).catch(t=>{}).finally(()=>{this._emailSettingsLoadingPromise=null}),this._emailSettingsLoadingPromise)},applyEmailSettingsDraftToUI(e){this._emailSettingsDraft=e||(typeof EmailDispatch<"u"?EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}}),this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const t=document.getElementById("email-settings-global-enabled"),s=document.getElementById("email-settings-default-recipients");t&&(t.checked=!!this._emailSettingsDraft.globalEnabled),s&&(s.value=""),this.renderEmailDefaultChips(),this.renderEmailGroupFilters(),this.renderEmailStatusFilters(),this.updateEmailSettingsStatusBanner(),this.renderEmailStatsStrip(),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||"")},async loadEmailSettingsUI(e){const s=!!(e||{}).force;if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsGroupFilter=this._emailSettingsGroupFilter||"all",this._emailSettingsStatusFilter=this._emailSettingsStatusFilter||"all";const i=document.getElementById("email-settings-sync-badge");i&&(i.hidden=!1,i.textContent="\u0645\u0632\u0627\u0645\u0646\u0629\u2026");const o=typeof EmailDispatch<"u"?EmailDispatch.getCachedSettings()||EmailDispatch.getDefaultSettings():{globalEnabled:!1,defaultRecipients:[],modules:{}};this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1);const a=document.getElementById("email-settings-modules-summary"),l=a?a.textContent:"";a&&(a.textContent=(l||"\u2014")+" \xB7 \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629\u2026");try{let c=o;if(typeof EmailDispatch<"u")c=await EmailDispatch.loadSettings(s);else if(typeof GoogleIntegration<"u"){const p=await GoogleIntegration.sendToAppsScript("getEmailSettings",{__timeoutMs:25e3});c=p&&p.data?p.data:o}if(!document.getElementById("email-settings-modules-list"))return;this._emailSettingsHydrating=!0,this.applyEmailSettingsDraftToUI(c||o),this._emailSettingsHydrating=!1,this.setEmailSettingsDirty(!1),this._emailSettingsUiReady=!0,i&&(i.textContent="\u0645\u062D\u062F\u0651\u062B",setTimeout(()=>{i&&(i.hidden=!0)},1200))}catch{this._emailSettingsHydrating=!1,a&&(a.textContent="\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0639\u0631\u0636 \u0645\u062D\u0644\u064A \u0645\u0624\u0642\u062A"),i&&(i.textContent="\u0645\u062D\u0644\u064A",i.hidden=!1),Notification?.warning?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u062F\u064A\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062D\u0627\u0644\u064A \u0645\u0624\u0642\u062A.")}},parseEmailListText(e){return String(e||"").split(/[,;\s]+/).map(t=>t.trim().toLowerCase()).filter(t=>t.includes("@"))},getEmailDefaultRecipientsList(){const e=this._emailSettingsDraft||{};return Array.isArray(e.defaultRecipients)?e.defaultRecipients.slice():[]},setEmailDefaultRecipientsList(e){this._emailSettingsDraft||(this._emailSettingsDraft={modules:{}});const t=[],s=new Set;(e||[]).forEach(n=>{const i=String(n||"").trim().toLowerCase();!i.includes("@")||s.has(i)||(s.add(i),t.push(i))}),this._emailSettingsDraft.defaultRecipients=t.slice(0,50),this.renderEmailDefaultChips(),this.renderEmailStatsStrip(),this.setEmailSettingsDirty(!0)},addEmailDefaultRecipientsFromInput(){const e=document.getElementById("email-settings-default-recipients");if(!e)return;const t=this.parseEmailListText(e.value);if(!t.length)return;const s=this.getEmailDefaultRecipientsList().concat(t);this.setEmailDefaultRecipientsList(s),e.value="",e.focus()},renderEmailDefaultChips(){const e=document.getElementById("email-settings-default-chips");if(!e)return;const t=this.getEmailDefaultRecipientsList();if(!t.length){e.innerHTML='<span class="email-settings-chip email-settings-chip-muted">\u0644\u0627 \u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0628\u0639\u062F \u2014 \u0623\u0636\u0641 \u0625\u064A\u0645\u064A\u0644\u0627\u064B \u0628\u0627\u0644\u0623\u0633\u0641\u0644</span>';return}e.innerHTML=t.map(s=>`<span class="email-settings-chip" dir="ltr">
                ${Utils.escapeHTML(s)}
                <button type="button" class="email-settings-chip-x" data-email-chip="${Utils.escapeHTML(s)}" title="\u062D\u0630\u0641" aria-label="\u062D\u0630\u0641 ${Utils.escapeHTML(s)}">&times;</button>
            </span>`).join("")},renderEmailStatsStrip(){const e=document.getElementById("email-settings-stats");if(!e||!this._emailSettingsDraft)return;const t=this._emailSettingsDraft.modules||{},s=Object.keys(t),n=s.filter(c=>t[c].enabled).length,i=s.filter(c=>t[c].enabled&&t[c].manualSend).length,o=s.filter(c=>t[c].enabled&&t[c].autoSend).length,a=this.getEmailDefaultRecipientsList().length,l=!!this._emailSettingsDraft.globalEnabled;e.innerHTML=`
            <div class="email-stat-card${l?" is-hot":""}"><span class="email-stat-num">${l?"ON":"OFF"}</span><span class="email-stat-label">\u0627\u0644\u0646\u0638\u0627\u0645</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${n}</span><span class="email-stat-label">\u0645\u0641\u0639\u0651\u0644</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${i}</span><span class="email-stat-label">\u064A\u062F\u0648\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${o}</span><span class="email-stat-label">\u062A\u0644\u0642\u0627\u0626\u064A</span></div>
            <div class="email-stat-card"><span class="email-stat-num">${a}</span><span class="email-stat-label">\u0645\u0633\u062A\u0644\u0645\u0648\u0646</span></div>
        `},setEmailSettingsDirty(e){if(this._emailSettingsHydrating&&e)return;this._emailSettingsDirty=!!e;const t=document.getElementById("email-settings-dirty-hint"),s=document.getElementById("email-settings-sticky-bar");t&&(t.hidden=!e),s&&s.classList.toggle("is-dirty",!!e)},updateEmailSettingsStatusBanner(){const t=!!(this._emailSettingsDraft||{}).globalEnabled||!!document.getElementById("email-settings-global-enabled")?.checked,s=document.getElementById("email-settings-status-banner"),n=document.getElementById("email-settings-status-title"),i=document.getElementById("email-settings-status-hint");s&&s.classList.toggle("is-on",t),n&&(n.textContent=t?"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u0641\u0639\u0651\u0644":"\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0645\u062A\u0648\u0642\u0641"),i&&(i.textContent=t?"\u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0641\u0639\u0651\u0644\u0629 \u064A\u062F\u0648\u064A\u0627\u064B. \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u064A\u0639\u0645\u0644 \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638 \u0625\u0646 \u0643\u0627\u0646 \u0645\u0641\u0639\u0651\u0644\u0627\u064B.":"\u0639\u0646\u062F \u0627\u0644\u0625\u064A\u0642\u0627\u0641: \u0644\u0627 \u0632\u0631 \u064A\u062F\u0648\u064A \u0648\u0644\u0627 \u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."),this.renderEmailStatsStrip()},updateEmailModulesSummary(){const e=document.getElementById("email-settings-modules-summary");if(!e||!this._emailSettingsDraft)return;const t=this._emailSettingsDraft.modules||{},s=Object.keys(t),n=s.filter(a=>t[a].enabled).length,i=s.filter(a=>t[a].enabled&&t[a].manualSend).length,o=s.filter(a=>t[a].enabled&&t[a].autoSend).length;e.textContent=`${n} \u0645\u0641\u0639\u0651\u0644 \u0645\u0646 ${s.length} \xB7 \u064A\u062F\u0648\u064A ${i} \xB7 \u062A\u0644\u0642\u0627\u0626\u064A ${o}`,this.renderEmailStatsStrip()},renderEmailGroupFilters(){const e=document.getElementById("email-settings-group-filters");if(!e||!this._emailSettingsDraft)return;const t=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},s=this._emailSettingsDraft.modules||{},n={all:Object.keys(s).length};Object.keys(s).forEach(a=>{const l=s[a].group||"ops";n[l]=(n[l]||0)+1});const i=this._emailSettingsGroupFilter||"all",o=[{id:"all",label:"\u0627\u0644\u0643\u0644"}].concat(Object.keys(t).filter(a=>n[a]).map(a=>({id:a,label:t[a]})));e.innerHTML=o.map(a=>`
            <button type="button" class="email-settings-group-chip${i===a.id?" is-active":""}" data-email-group="${Utils.escapeHTML(a.id)}">
                ${Utils.escapeHTML(a.label)}
                <span class="email-settings-group-count">${n[a.id]||0}</span>
            </button>
        `).join("")},renderEmailStatusFilters(){const e=document.getElementById("email-settings-status-filters");if(!e)return;const t=this._emailSettingsStatusFilter||"all",s=[{id:"all",label:"\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A"},{id:"enabled",label:"\u0645\u0641\u0639\u0651\u0644"},{id:"disabled",label:"\u0645\u062A\u0648\u0642\u0641"},{id:"manual",label:"\u064A\u062F\u0648\u064A"},{id:"auto",label:"\u062A\u0644\u0642\u0627\u0626\u064A"}];e.innerHTML=s.map(n=>`
            <button type="button" class="email-settings-status-chip${t===n.id?" is-active":""}" data-email-status="${n.id}">
                ${n.label}
            </button>
        `).join("")},renderEmailModulesList(e){const t=document.getElementById("email-settings-modules-list");if(!t||!this._emailSettingsDraft)return;const s=String(e||"").trim().toLowerCase(),n=this._emailSettingsGroupFilter||"all",i=this._emailSettingsStatusFilter||"all",o=this._emailSettingsDraft.modules||{},a=typeof EmailDispatch<"u"&&EmailDispatch.GROUP_LABELS?EmailDispatch.GROUP_LABELS:{ops:"\u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629",clinic:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",reports:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",system:"\u0627\u0644\u0646\u0638\u0627\u0645"},l=Object.keys(o).sort((S,d)=>{const h=o[S].group||"ops",x=o[d].group||"ops";return h!==x?h.localeCompare(x):String(o[S].labelAr||S).localeCompare(String(o[d].labelAr||d),"ar")});let c="",p="";l.forEach(S=>{const d=o[S],h=d.labelAr||S,x=d.group||"ops";if(n!=="all"&&x!==n||s&&!h.toLowerCase().includes(s)&&!S.toLowerCase().includes(s)||i==="enabled"&&!d.enabled||i==="disabled"&&d.enabled||i==="manual"&&!(d.enabled&&d.manualSend)||i==="auto"&&!(d.enabled&&d.autoSend))return;x!==p&&(p=x,c+=`<div class="email-settings-group-title">${Utils.escapeHTML(a[x]||x)}</div>`);const w=(d.recipients||[]).join(", "),B=!!d.enabled,I=!!(d.recipients&&d.recipients.length);c+=`
                <div class="email-module-row${B?" is-enabled":""}" data-module-key="${Utils.escapeHTML(S)}">
                    <div class="email-module-row-top">
                        <div class="email-module-identity">
                            <span class="email-module-name">${Utils.escapeHTML(h)}</span>
                            <span class="email-module-key" dir="ltr">${Utils.escapeHTML(S)}</span>
                        </div>
                        <div class="email-module-toggles">
                            <label class="email-toggle${d.enabled?" is-checked":""}" title="\u062A\u0641\u0639\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639">
                                <input type="checkbox" class="em-enabled" ${d.enabled?"checked":""}>
                                <span>\u0645\u0641\u0639\u0651\u0644</span>
                            </label>
                            <label class="email-toggle${d.manualSend?" is-checked":""}${B?"":" is-disabled"}" title="\u0632\u0631 \u0625\u0631\u0633\u0627\u0644 \u0645\u0646 \u0634\u0627\u0634\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <input type="checkbox" class="em-manual" ${d.manualSend?"checked":""} ${B?"":"disabled"}>
                                <span>\u064A\u062F\u0648\u064A</span>
                            </label>
                            <label class="email-toggle${d.autoSend?" is-checked":""}${B?"":" is-disabled"}" title="\u0625\u0631\u0633\u0627\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062D\u0641\u0638">
                                <input type="checkbox" class="em-auto" ${d.autoSend?"checked":""} ${B?"":"disabled"}>
                                <span>\u062A\u0644\u0642\u0627\u0626\u064A</span>
                            </label>
                        </div>
                    </div>
                    <button type="button" class="email-module-recipients-toggle${I?" has-custom":""}" data-toggle-recipients="1">
                        <i class="fas fa-chevron-down"></i>
                        \u0645\u0633\u062A\u0644\u0645\u0648\u0646 \u062E\u0627\u0635\u0648\u0646 ${I?`(${d.recipients.length})`:"(\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"}
                    </button>
                    <div class="email-module-recipients-wrap" hidden>
                        <input type="text" class="form-input w-full text-sm em-recipients" placeholder="\u0641\u0627\u0631\u063A = \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u064A\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u064A\u0646" value="${Utils.escapeHTML(w)}" dir="ltr">
                    </div>
                </div>`}),t.innerHTML=c||'<p class="email-settings-empty">\u0644\u0627 \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0627\u0644\u062A\u0635\u0641\u064A\u0629</p>',this.updateEmailModulesSummary(),this.syncEmailToggleClasses(t),t.querySelectorAll(".email-module-row").forEach(S=>{const d=S.querySelector(".em-enabled");d&&d.addEventListener("change",()=>{const h=d.checked;S.classList.toggle("is-enabled",h),S.querySelectorAll(".em-manual, .em-auto").forEach(x=>{x.disabled=!h}),this.syncEmailToggleClasses(S),this.collectEmailSettingsFromUI(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0)})})},syncEmailToggleClasses(e){!e||typeof e.querySelectorAll!="function"||e.querySelectorAll(".email-toggle").forEach(t=>{const s=t.querySelector('input[type="checkbox"]');s&&(t.classList.toggle("is-checked",!!s.checked),t.classList.toggle("is-disabled",!!s.disabled))})},applyEmailBulkVisible(e,t){this.collectEmailSettingsFromUI(),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(n=>{const i=n.getAttribute("data-module-key");if(!i||!this._emailSettingsDraft?.modules?.[i])return;const o=this._emailSettingsDraft.modules[i];if(t==="manual"){o.enabled||(o.enabled=!0),o.manualSend=!0;return}if(t==="auto"){o.enabled||(o.enabled=!0),o.autoSend=!0;return}o.enabled=!!e,e&&(o.manualSend=!0)}),this.renderEmailModulesList(document.getElementById("email-settings-module-filter")?.value||""),this.setEmailSettingsDirty(!0)},collectEmailSettingsFromUI(){const e=this._emailSettingsDraft||{modules:{}};return e.globalEnabled=!!document.getElementById("email-settings-global-enabled")?.checked,Array.isArray(e.defaultRecipients)||(e.defaultRecipients=this.parseEmailListText(document.getElementById("email-settings-default-recipients")?.value||"")),document.querySelectorAll("#email-settings-modules-list .email-module-row").forEach(t=>{const s=t.getAttribute("data-module-key");if(!s||!e.modules[s])return;e.modules[s].enabled=!!t.querySelector(".em-enabled")?.checked,e.modules[s].manualSend=!!t.querySelector(".em-manual")?.checked,e.modules[s].autoSend=!!t.querySelector(".em-auto")?.checked;const n=t.querySelector(".em-recipients")?.value||"";e.modules[s].recipients=this.parseEmailListText(n)}),this._emailSettingsDraft=e,e},bindEmailSettingsEvents(){const e=document.getElementById("email-settings-save-btn");if(!e||e.dataset.emailBound==="1")return;e.dataset.emailBound="1";const t=()=>{this._emailSettingsHydrating||(this.collectEmailSettingsFromUI(),this.updateEmailSettingsStatusBanner(),this.renderEmailDefaultChips(),this.updateEmailModulesSummary(),this.setEmailSettingsDirty(!0))},s=document.getElementById("email-settings-global-enabled");s&&s.addEventListener("change",()=>{t()});const n=document.getElementById("email-settings-default-recipients"),i=document.getElementById("email-settings-add-recipient-btn");n&&(n.addEventListener("keydown",I=>{(I.key==="Enter"||I.key===",")&&(I.preventDefault(),this.addEmailDefaultRecipientsFromInput())}),n.addEventListener("paste",()=>{setTimeout(()=>this.addEmailDefaultRecipientsFromInput(),0)})),i&&i.addEventListener("click",()=>this.addEmailDefaultRecipientsFromInput());const o=document.getElementById("email-settings-default-chips");o&&o.addEventListener("click",I=>{const y=I.target.closest("[data-email-chip]");if(!y)return;const k=y.getAttribute("data-email-chip"),L=this.getEmailDefaultRecipientsList().filter(U=>U!==k);this.setEmailDefaultRecipientsList(L)});const a=document.getElementById("email-settings-module-filter");if(a){let I=null;a.addEventListener("input",()=>{clearTimeout(I),I=setTimeout(()=>{this.collectEmailSettingsFromUI(),this.renderEmailModulesList(a.value)},120)})}const l=document.getElementById("email-settings-group-filters");l&&l.addEventListener("click",I=>{const y=I.target.closest("[data-email-group]");y&&(this.collectEmailSettingsFromUI(),this._emailSettingsGroupFilter=y.getAttribute("data-email-group")||"all",this.renderEmailGroupFilters(),this.renderEmailModulesList(a?.value||""))});const c=document.getElementById("email-settings-status-filters");c&&c.addEventListener("click",I=>{const y=I.target.closest("[data-email-status]");y&&(this.collectEmailSettingsFromUI(),this._emailSettingsStatusFilter=y.getAttribute("data-email-status")||"all",this.renderEmailStatusFilters(),this.renderEmailModulesList(a?.value||""))});const p=document.getElementById("email-settings-enable-visible-btn");p&&p.addEventListener("click",()=>this.applyEmailBulkVisible(!0));const S=document.getElementById("email-settings-disable-visible-btn");S&&S.addEventListener("click",()=>this.applyEmailBulkVisible(!1));const d=document.getElementById("email-settings-manual-visible-btn");d&&d.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"manual"));const h=document.getElementById("email-settings-auto-visible-btn");h&&h.addEventListener("click",()=>this.applyEmailBulkVisible(!0,"auto"));const x=document.getElementById("email-settings-modules-list");x&&(x.addEventListener("change",I=>{if(!I.target.matches(".em-manual, .em-auto, .em-recipients"))return;const y=I.target.closest(".email-module-row");y&&I.target.matches(".em-manual, .em-auto")&&this.syncEmailToggleClasses(y),t()}),x.addEventListener("input",I=>{I.target.matches(".em-recipients")&&this.setEmailSettingsDirty(!0)}),x.addEventListener("click",I=>{const y=I.target.closest("[data-toggle-recipients]");if(!y)return;const L=y.closest(".email-module-row")?.querySelector(".email-module-recipients-wrap");if(!L)return;const U=L.hasAttribute("hidden");U?L.removeAttribute("hidden"):L.setAttribute("hidden",""),y.classList.toggle("is-open",U)})),e.addEventListener("click",async()=>{const I=this.collectEmailSettingsFromUI();e.disabled=!0;try{const y=AppState.currentUser||{},k=await GoogleIntegration.sendToAppsScript("saveEmailSettings",{settings:I,userData:y});k&&k.success?(AppState.notificationEmails=(I.defaultRecipients||[]).slice(),typeof EmailDispatch<"u"&&(EmailDispatch.invalidateCache(),EmailDispatch._settings=k.data||I),this._emailSettingsDraft=k.data||I,this.setEmailSettingsDirty(!1),this.updateEmailSettingsStatusBanner(),this.updateEmailModulesSummary(),Notification.success(k.message||"\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F")):Notification.error(k&&k.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(y){Notification.error("\u062E\u0637\u0623: "+(y.message||y))}finally{e.disabled=!1}});const w=document.getElementById("email-settings-reload-btn");w&&w.addEventListener("click",()=>this.ensureEmailSettingsLoaded(!0));const B=document.getElementById("email-settings-test-btn");B&&B.addEventListener("click",async()=>{const I=document.getElementById("email-settings-test-to")?.value?.trim();if(!I||!I.includes("@")){Notification.error("\u0623\u062F\u062E\u0644 \u0625\u064A\u0645\u064A\u0644 \u0635\u062D\u064A\u062D \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631");return}B.disabled=!0;try{const y=await GoogleIntegration.sendToAppsScript("sendTestEmail",{to:I,userData:AppState.currentUser||{}});y&&y.success?Notification.success(y.message||"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A"):Notification.error(y&&y.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A")}catch(y){Notification.error(String(y.message||y))}finally{B.disabled=!1}})},removeNotificationEmail(e){AppState.notificationEmails&&AppState.notificationEmails[e]!=null&&AppState.notificationEmails.splice(e,1)},bindCloudStorageSettingsEvents(){const e=document.getElementById("onedrive-settings-form");e&&e.addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("onedrive-enabled")?.checked||!1,c=document.getElementById("onedrive-client-id")?.value.trim()||"",p=document.getElementById("onedrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.onedrive.enabled=l,AppState.cloudStorageConfig.onedrive.clientId=c,p&&(AppState.cloudStorageConfig.onedrive.clientSecret=p),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A OneDrive \u0628\u0646\u062C\u0627\u062D"),this.load()});const t=document.getElementById("onedrive-authorize-btn");t&&t.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("onedrive"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 OneDrive")}});const s=document.getElementById("googledrive-settings-form");s&&s.addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("googledrive-enabled")?.checked||!1,c=document.getElementById("googledrive-client-id")?.value.trim()||"",p=document.getElementById("googledrive-client-secret")?.value.trim()||"";AppState.cloudStorageConfig.googleDrive.enabled=l,AppState.cloudStorageConfig.googleDrive.clientId=c,p&&(AppState.cloudStorageConfig.googleDrive.clientSecret=p),DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),this.load()});const n=document.getElementById("googledrive-authorize-btn");n&&n.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("googleDrive"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u062F\u0645")}});const i=document.getElementById("sharepoint-settings-form");i&&i.addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("sharepoint-enabled")?.checked||!1,c=document.getElementById("sharepoint-client-id")?.value.trim()||"",p=document.getElementById("sharepoint-client-secret")?.value.trim()||"",S=document.getElementById("sharepoint-tenant-id")?.value.trim()||"",d=document.getElementById("sharepoint-site-url")?.value.trim()||"";AppState.cloudStorageConfig.sharepoint.enabled=l,AppState.cloudStorageConfig.sharepoint.clientId=c,p&&(AppState.cloudStorageConfig.sharepoint.clientSecret=p),AppState.cloudStorageConfig.sharepoint.tenantId=S,AppState.cloudStorageConfig.sharepoint.siteUrl=d,DataManager.saveCloudStorageConfig(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SharePoint \u0628\u0646\u062C\u0627\u062D"),this.load()});const o=document.getElementById("sharepoint-authorize-btn");o&&o.addEventListener("click",async()=>{try{await CloudStorageIntegration.authorize("sharepoint"),this.load()}catch(a){Notification.error(a.message||"\u0641\u0634\u0644 \u0631\u0628\u0637 SharePoint")}})},renderCloudStorageSettings(){const e=AppState.cloudStorageConfig.onedrive,t=AppState.cloudStorageConfig.googleDrive,s=AppState.cloudStorageConfig.sharepoint,n=e.enabled&&e.clientId&&e.accessToken?"success":"warning",i=t.enabled&&t.clientId&&t.accessToken?"success":"warning",o=s.enabled&&s.clientId&&s.accessToken?"success":"warning";return`
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
        `},_violationTypesImportNormalizeKey(e){return String(e??"").trim().replace(/\s+/g,"_").replace(/[^\w\u0600-\u06FF]/g,"").toLowerCase()},_violationTypesImportPick(e,t){const s={};Object.keys(e||{}).forEach(n=>{s[this._violationTypesImportNormalizeKey(n)]=e[n]});for(let n=0;n<t.length;n++){const i=this._violationTypesImportNormalizeKey(t[n]);if(s[i]!==void 0&&s[i]!==null&&String(s[i]).trim()!=="")return s[i]}return""},_parseViolationTypeFineForImport(e){if(e==null||e==="")return 0;if(typeof Violations<"u"&&typeof Violations.parseFineAmount=="function")return Violations.parseFineAmount(e);const t=Number(String(e).replace(/[^\d.\-]/g,""));return Number.isFinite(t)&&t>=0?t:0},downloadViolationTypesImportTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const e=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629"],t=["\u0645\u062B\u0627\u0644: \u0639\u062F\u0645 \u0627\u0631\u062A\u062F\u0627\u0621 \u062E\u0648\u0630\u0629","\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A","500"],s=XLSX.utils.book_new(),n=XLSX.utils.aoa_to_sheet([e,t]);n["!cols"]=[{wch:40},{wch:50},{wch:14}],XLSX.utils.book_append_sheet(s,n,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const i=[["\u062A\u0639\u0644\u064A\u0645\u0627\u062A:"],["\u2022 \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639\xBB \u0625\u0644\u0632\u0627\u0645\u064A."],["\u2022 \u0625\u0630\u0627 \u0648\u064F\u062C\u062F \u0646\u0648\u0639 \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B\u060C \u064A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641."],["\u2022 \xAB\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629\xBB \u0631\u0642\u0645 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 (\u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0631\u0642\u0627\u0645 \u0639\u0631\u0628\u064A\u0629 \u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D)."]];XLSX.utils.book_append_sheet(s,XLSX.utils.aoa_to_sheet(i),"\u062A\u0639\u0644\u064A\u0645\u0627\u062A"),XLSX.writeFile(s,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`)},exportViolationTypesToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u062D\u062F\u0651\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}ViolationTypesManager.ensureInitialized();const e=ViolationTypesManager.getAll();if(!e.length){Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627.");return}const t=["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u062D\u0627\u0644\u0629","\u0639\u062F\u062F_\u0627\u0644\u0633\u062C\u0644\u0627\u062A"],s=e.map(a=>{const l=ViolationTypesManager.countUsage(a),c=Number(a.fineAmount||0);return[a.name||"",a.description||"",Number.isFinite(c)?c:0,a.isDefault?"\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"\u0645\u062E\u0635\u0635",l]}),n=XLSX.utils.book_new(),i=XLSX.utils.aoa_to_sheet([t,...s]);i["!cols"]=[{wch:42},{wch:55},{wch:16},{wch:12},{wch:14}],XLSX.utils.book_append_sheet(n,i,"\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A");const o=new Date().toISOString().slice(0,10);XLSX.writeFile(n,`\u0623\u0646\u0648\u0627\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A_${o}.xlsx`),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${e.length} \u0646\u0648\u0639\u0627\u064B \u0625\u0644\u0649 Excel.`)},showViolationTypesImportModal(){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
            </div>`,document.body.appendChild(e);let t=[];const s=e.querySelector("#violation-types-import-preview"),n=e.querySelector("#violation-types-import-confirm");e.querySelector("#violation-types-import-download-template")?.addEventListener("click",()=>this.downloadViolationTypesImportTemplate()),e.querySelector("#violation-types-import-file")?.addEventListener("change",async i=>{const o=i.target.files&&i.target.files[0];if(t=[],n.disabled=!0,s.classList.add("hidden"),!!o){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629.");return}try{const a=await o.arrayBuffer(),l=XLSX.read(a,{type:"array"}),c=l.Sheets[l.SheetNames[0]],p=XLSX.utils.sheet_to_json(c,{defval:""});t=Array.isArray(p)?p:[],s.innerHTML=`<p>\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 <strong>${t.length}</strong> \u0635\u0641\u0627\u064B \u0645\u0646 \u0627\u0644\u0648\u0631\u0642\u0629 \xAB${Utils.escapeHTML(l.SheetNames[0]||"")}\xBB.</p>`,s.classList.remove("hidden"),n.disabled=t.length===0}catch(a){Utils.safeError("\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u062E\u0627\u0644\u0641\u0627\u062A:",a),Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(a.message||""))}}}),n?.addEventListener("click",async()=>{t.length&&(n.disabled=!0,await this.processViolationTypesImportRows(t,e))}),e.addEventListener("click",i=>{i.target===e&&e.remove()})},async processViolationTypesImportRows(e,t){if(typeof ViolationTypesManager>"u"){Notification.error("\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629.");return}ViolationTypesManager.ensureInitialized(),Array.isArray(AppState.appData.violationTypes)||(AppState.appData.violationTypes=[]);const s=new Date().toISOString();let n=0,i=0,o=0;for(let a=0;a<e.length;a++){const l=e[a]||{},c=String(this._violationTypesImportPick(l,["\u0627\u0633\u0645_\u0627\u0644\u0646\u0648\u0639","\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639","name","typename","\u0646\u0648\u0639_\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629"])||"").trim();if(!c){o++;continue}const p=String(this._violationTypesImportPick(l,["\u0627\u0644\u0648\u0635\u0641","description","notes"])||"").trim(),S=this._violationTypesImportPick(l,["\u0627\u0644\u0642\u064A\u0645\u0629_\u0627\u0644\u0645\u0627\u0644\u064A\u0629","\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629","fineamount","fine","defaultfine"]),d=this._parseViolationTypeFineForImport(S!==""&&S!==void 0?S:0),h=ViolationTypesManager.getTypeByName(c);h?(h.description=p,h.fineAmount=d,h.updatedAt=s,i++):(AppState.appData.violationTypes.push({id:Utils.generateId("VTYPE"),name:c,description:p,fineAmount:d,isDefault:!1,createdAt:s,updatedAt:s}),n++)}if(ViolationTypesManager.sortTypes(),ViolationTypesManager.ensureViolationsTypeIds(),typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}ViolationTypesManager.persist(!0),t&&t.parentNode&&t.remove(),Notification.success(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${n} \u0646\u0648\u0639 \u062C\u062F\u064A\u062F\u060C ${i} \u0645\u062D\u062F\u0651\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C ${o} \u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645.`),this.refreshViolationTypesList()},renderViolationTypesList(){const e=ViolationTypesManager.getAll();return e.length?`
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
            `},bindViolationTypesEvents(){const e=document.getElementById("add-violation-type-btn");e&&(e.onclick=()=>this.openViolationTypeModal());const t=document.getElementById("import-violation-types-btn");t&&(t.onclick=()=>this.showViolationTypesImportModal());const s=document.getElementById("export-violation-types-btn");s&&(s.onclick=()=>this.exportViolationTypesToExcel()),document.querySelectorAll('[data-action="view-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.viewViolationType(o)}}),document.querySelectorAll('[data-action="edit-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.openViolationTypeModal(o)}}),document.querySelectorAll('[data-action="delete-violation-type"]').forEach(n=>{n.onclick=i=>{const o=i.currentTarget.getAttribute("data-type-id");this.deleteViolationType(o)}})},refreshViolationTypesList(){const e=document.getElementById("violation-types-management");e&&(e.innerHTML=this.renderViolationTypesList(),this.bindViolationTypesEvents())},viewViolationType(e){try{if(!e||typeof ViolationTypesManager>"u")return;ViolationTypesManager.ensureInitialized?.();const t=ViolationTypesManager.getTypeById(e);if(!t||!t.name){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}typeof UI<"u"&&typeof UI.showSection=="function"&&UI.showSection("violations");const s=()=>typeof Violations>"u"?!1:(Violations.currentFilters||(Violations.currentFilters={search:"",personType:"",violationType:"",severity:"",status:""}),Violations.currentFilters.violationType=t.name,typeof Violations.switchTab=="function"?Violations.switchTab("all"):typeof Violations.refreshViolationsView=="function"?Violations.refreshViolationsView():typeof Violations.refreshModule=="function"&&Violations.refreshModule(),!0);s()||setTimeout(()=>{s()||setTimeout(()=>s(),600)},250)}catch{Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0641\u062A\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A")}},openViolationTypeModal(e=null){const t=e?ViolationTypesManager.getTypeById(e):null;if(e&&!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0627\u0644\u0645\u062D\u062F\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
        `,document.body.appendChild(s),s.querySelector("#violation-type-form").addEventListener("submit",async i=>{i.preventDefault();const o=s.querySelector("#violation-type-name"),a=s.querySelector("#violation-type-description"),l=s.querySelector("#violation-type-fine-amount"),c=o?.value.trim()||"",p=a?.value.trim()||"",S=l?.value??"0",d=Number(S),h=Number.isFinite(d)&&d>=0?d:0;if(!c){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639"),o?.focus();return}try{t?(ViolationTypesManager.updateType(t.id,{name:c,description:p,fineAmount:h}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")):(ViolationTypesManager.addType({name:c,description:p,fineAmount:h}),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D")),s.remove(),this.refreshViolationTypesList()}catch(x){Notification.error(x.message)}}),s.addEventListener("click",i=>{i.target===s&&s.remove()})},deleteViolationType(e){if(!e)return;const t=ViolationTypesManager.getTypeById(e);if(!t){Notification.error("\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=ViolationTypesManager.countUsage(t),n=s>0?`\u0647\u0646\u0627\u0643 ${s} \u0633\u062C\u0644 \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u0631\u062A\u0628\u0637 \u0628\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639.
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629\u060C \u0644\u0643\u0646 \u0644\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0646\u0648\u0639 \u0645\u062A\u0627\u062D\u0627\u064B \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062C\u062F\u064A\u062F.
\u0647\u0644 \u062A\u0631\u063A\u0628 \u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u062D\u0630\u0641 "${t.name}"\u061F`:`\u0647\u0644 \u062A\u0631\u064A\u062F \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 "${t.name}"\u061F`;confirm(n)&&(async()=>{try{ViolationTypesManager.deleteType(e),await ViolationTypesManager.persist(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),this.refreshViolationTypesList()}catch(i){Notification.error(i.message)}})()},normalizeOwner(e){return!e||e==="__default__"?"__default__":String(e)},renderApprovalOwnerOptions(e="__default__"){const t=this.normalizeOwner(e),s=ApprovalCircuits.getUsersList(),n=ApprovalCircuits.listOwners(),i=[];return i.push(`
            <option value="__default__" ${t==="__default__"?"selected":""}>
                \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)
            </option>
        `),s.forEach(o=>{const a=o.id||o.email,l=`${Utils.escapeHTML(o.name||o.email||"")}${o.email?` - ${Utils.escapeHTML(o.email)}`:""}`;i.push(`
                <option value="${Utils.escapeHTML(a)}" ${t===a?"selected":""}>
                    ${l}
                </option>
            `)}),n.filter(o=>o&&o!=="__default__"&&!s.some(a=>a.id===o)).forEach(o=>{const a=ApprovalCircuits.getCircuit(o);i.push(`
                    <option value="${Utils.escapeHTML(o)}" ${t===o?"selected":""}>
                        \u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F (${Utils.escapeHTML(a?.name||o)})
                    </option>
                `)}),i.join("")},renderApprovalStepsPlaceholder(){return`
            <div class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-600">
                <i class="fas fa-layer-group text-2xl text-gray-400 mb-3"></i>
                <p>\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0639\u0644\u0627\u0647 \u062B\u0645 \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u064A \u0643\u0644 \u0645\u0633\u062A\u0648\u0649.</p>
            </div>
        `},updateApprovalCircuitStatusLabel(){const e=document.getElementById("approval-circuit-active-label");if(!e)return;const t=this.normalizeOwner(this.currentApprovalCircuitOwner),s=ApprovalCircuits.getCircuit(t);if(!s||!Array.isArray(s.steps)||s.steps.length===0){e.style.display="none";return}const n=t==="__default__"?null:ApprovalCircuits.getUserById(t),i=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":n?.name||n?.email||`\u0645\u0633\u062A\u062E\u062F\u0645 ${t}`,o=s.steps.length;e.textContent=`${i} \u2022 ${o} \u0645\u0633\u062A\u0648\u0649${o>1?"\u0627\u062A":""}`,e.style.display="inline-flex"},renderApprovalSteps(){const e=document.getElementById("approval-steps-container");if(!e)return;if(!this.currentApprovalCircuitSteps||this.currentApprovalCircuitSteps.length===0){e.innerHTML=this.renderApprovalStepsPlaceholder(),this.updateApprovalCircuitStatusLabel();return}const t=ApprovalCircuits.getUsersList();e.innerHTML=this.currentApprovalCircuitSteps.map((s,n)=>this.renderApprovalStepCard(s,n,t)).join(""),this.updateApprovalCircuitStatusLabel()},renderApprovalStepCard(e,t,s){const n=this.getStepTitle(t),i=Array.isArray(e.userIds)?e.userIds:[],o=s.map(a=>{const l=a.id||a.email,c=`${Utils.escapeHTML(a.name||a.email||"")}${a.email?` (${Utils.escapeHTML(a.email)})`:""}`,p=i.includes(l)?"selected":"";return`<option value="${Utils.escapeHTML(l)}" ${p}>${c}</option>`}).join("");return`
            <div class="approval-step-card border border-gray-200 rounded-lg bg-gray-50 p-4" data-step-index="${t}" data-step-id="${Utils.escapeHTML(e.id||"")}">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700">${n}</h4>
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
        `},getStepTitle(e){return["\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0644","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0646\u064A","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0644\u062B","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0631\u0627\u0628\u0639","\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0627\u0645\u0633"][e]||`\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${e+1}`},refreshApprovalOwnerOptions(e="__default__"){const t=document.getElementById("approval-owner-select");t&&(t.innerHTML=this.renderApprovalOwnerOptions(e),t.value=this.normalizeOwner(e))},initializeApprovalCircuitsUI(){const e=document.getElementById("approval-owner-select");if(!e)return;const t=document.getElementById("add-approval-step-btn"),s=document.getElementById("save-approval-circuit-btn"),n=document.getElementById("delete-approval-circuit-btn"),i=document.getElementById("approval-steps-container"),o=this.normalizeOwner(e.value||"__default__");this.currentApprovalCircuitOwner=o,this.loadApprovalCircuitEditor(o),e.addEventListener("change",a=>{const l=this.normalizeOwner(a.target.value);this.currentApprovalCircuitOwner=l,this.loadApprovalCircuitEditor(l)}),t&&t.addEventListener("click",()=>this.addApprovalCircuitStep()),s&&s.addEventListener("click",()=>this.saveApprovalCircuit()),n&&n.addEventListener("click",()=>this.deleteApprovalCircuit()),i&&i.addEventListener("click",a=>{const l=a.target.closest("[data-remove-step-index]");if(l){const c=parseInt(l.getAttribute("data-remove-step-index"),10);Number.isNaN(c)||this.removeApprovalCircuitStep(c)}})},loadApprovalCircuitEditor(e){const t=this.normalizeOwner(e),s=ApprovalCircuits.getCircuit(t),n=document.getElementById("approval-circuit-name"),i=document.getElementById("delete-approval-circuit-btn");s?(this.currentApprovalCircuitId=s.id||null,this.currentApprovalCircuitSteps=Array.isArray(s.steps)?s.steps.map((o,a)=>({id:o.id||Utils.generateId("CSTEP"),name:o.name||o.role||"",userIds:Array.isArray(o.userIds)?o.userIds.filter(Boolean):[],required:o.required!==!1,isSafetyOfficer:o.isSafetyOfficer===!0,order:typeof o.order=="number"?o.order:a})):[],n&&(n.value=s.name||(t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""))):(this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],n&&(n.value=t==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"")),this.currentApprovalCircuitOwner=t,this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((o,a)=>Object.assign({},o,{order:a})),i&&(i.disabled=!s),this.renderApprovalSteps()},addApprovalCircuitStep(){Array.isArray(this.currentApprovalCircuitSteps)||(this.currentApprovalCircuitSteps=[]),this.currentApprovalCircuitSteps.push({id:Utils.generateId("CSTEP"),name:"",userIds:[],required:!0,isSafetyOfficer:!1,order:this.currentApprovalCircuitSteps.length}),this.renderApprovalSteps()},removeApprovalCircuitStep(e){Array.isArray(this.currentApprovalCircuitSteps)&&(this.currentApprovalCircuitSteps.splice(e,1),this.currentApprovalCircuitSteps=this.currentApprovalCircuitSteps.map((t,s)=>Object.assign({},t,{order:s})),this.renderApprovalSteps())},collectApprovalCircuitData(){const e=this.normalizeOwner(this.currentApprovalCircuitOwner),t=document.getElementById("approval-circuit-name"),s=t?t.value.trim():"",n=document.querySelectorAll(".approval-step-card"),i=Array.from(n).map((o,a)=>{const l=o.getAttribute("data-step-id")||Utils.generateId("CSTEP"),c=o.querySelector(".approval-step-name"),p=o.querySelector(".approval-step-users"),S=o.querySelector(".approval-step-required"),d=o.querySelector(".approval-step-safety"),h=c?c.value.trim():"",x=p?Array.from(p.options).filter(w=>w.selected).map(w=>w.value):[];return{id:l,name:h,userIds:x,required:S?S.checked:!0,isSafetyOfficer:d?d.checked:!1,order:a}});return{id:this.currentApprovalCircuitId||Utils.generateId("CIR"),ownerId:e,name:s||(e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":""),steps:i,updatedAt:new Date().toISOString()}},saveApprovalCircuit(){const e=this.collectApprovalCircuitData();if(!e.steps||e.steps.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0648\u0649 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.");return}if(e.steps.some(n=>!n.name)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}if(e.steps.some(n=>!Array.isArray(n.userIds)||n.userIds.length===0)){Notification.error("\u064A\u062C\u0628 \u062A\u062D\u062F\u064A\u062F \u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0643\u0644 \u0645\u0633\u062A\u0648\u0649 \u0627\u0639\u062A\u0645\u0627\u062F.");return}ApprovalCircuits.saveCircuit(e),this.currentApprovalCircuitId=e.id,this.currentApprovalCircuitSteps=e.steps.map((n,i)=>Object.assign({},n,{order:i})),this.refreshApprovalOwnerOptions(e.ownerId),this.renderApprovalSteps(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")},deleteApprovalCircuit(){const e=this.normalizeOwner(this.currentApprovalCircuitOwner),t=ApprovalCircuits.getCircuit(e);if(!t){Notification.info("\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0627\u0631 \u0644\u062D\u0630\u0641\u0647.");return}const s=e==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":t.name||e;confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${s}"\u061F
\u0644\u0646 \u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0633\u0627\u0628\u0642\u0629\u060C \u0644\u0643\u0646 \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.`)&&(ApprovalCircuits.deleteCircuit(e),this.currentApprovalCircuitId=null,this.currentApprovalCircuitSteps=[],this.refreshApprovalOwnerOptions(e),this.loadApprovalCircuitEditor(e),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F."))},renderUsersPermissionsList(){const e=AppState.appData.users||[];return e.length===0?`
                <div class="text-center text-gray-500 py-4">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                </div>
            `:e.map(t=>{const s=this.hasAccessForUser(t,"settings"),n=t.role==="admin"?"badge-danger":t.role==="safety_officer"?"badge-warning":"badge-info",i=t.role==="admin"?"\u0645\u062F\u064A\u0631":t.role==="safety_officer"?"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"\u0645\u0633\u062A\u062E\u062F\u0645";return`
                <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                    <div class="flex items-center flex-1">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                            ${t.photo?(()=>{const o=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(t.photo):{canonical:String(t.photo),displaySrc:String(t.photo),needsProxy:!1,proxyFileId:""},a=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(o):"";return`<img src="${Utils.escapeHTML(o.displaySrc)}" alt="${Utils.escapeHTML(t.name)}"${a} class="settings-perm-user-photo w-full h-full rounded-full object-cover">`})():'<i class="fas fa-user text-gray-600"></i>'}
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold">${Utils.escapeHTML(t.name||"")}</div>
                            <div class="text-sm text-gray-600">${Utils.escapeHTML(t.email||"")}</div>
                        </div>
                        <div class="mr-4">
                            <span class="badge ${n}">${i}</span>
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
            `}).join("")},viewUserPermissions(e){const t=AppState.appData.users.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=this.hasAccessForUser(t,"settings"),n=t.permissions||{},i=[{key:"dashboard",label:"\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"},{key:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{key:"nearmiss",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629"},{key:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{key:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{key:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{key:"fire-equipment",label:"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621"},{key:"ppe",label:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629"},{key:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{key:"contractors",label:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"},{key:"employees",label:"\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"},{key:"behavior-monitoring",label:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0635\u0631\u0627\u062A"},{key:"chemical-safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629"},{key:"daily-observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629"},{key:"iso",label:"\u0646\u0638\u0627\u0645 ISO"},{key:"emergency",label:"\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626"},{key:"users",label:"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"},{key:"settings",label:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"}],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
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
                                ${i.map(a=>{const l=this.hasAccessForUser(t,a.key);return`
                                        <div class="flex items-center justify-between p-2 border rounded ${l?"bg-green-50":"bg-gray-50"}">
                                            <span class="text-sm">${a.label}</span>
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
        `,document.body.appendChild(o),o.addEventListener("click",a=>{a.target===o&&o.remove()})},hasAccessForUser(e,t){if(e.role==="admin")return!0;const s=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(e.permissions):e.permissions||{};return s&&s.hasOwnProperty(t)?s[t]===!0:!1},async handleSubmit(e){e.preventDefault();try{const t=document.getElementById("google-apps-script-enabled"),s=document.getElementById("google-apps-script-url"),n=document.getElementById("google-sheets-enabled"),i=document.getElementById("google-sheets-id");if(!t||!s||!n||!i){Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062D\u0642\u0648\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C");return}AppState.googleConfig.appsScript.enabled=t.checked,AppState.googleConfig.appsScript.scriptUrl=s.value.trim(),AppState.googleConfig.sheets.enabled=n.checked,AppState.googleConfig.sheets.spreadsheetId=i.value.trim();let o=!1;if(typeof window.DataManager<"u"&&window.DataManager.saveGoogleConfig)window.DataManager.saveGoogleConfig()?(o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")):Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");else if(typeof window.DataManager<"u"&&window.DataManager.save)try{await window.DataManager.save(),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}else try{localStorage.setItem("hse_google_config",JSON.stringify(AppState.googleConfig)),o=!0,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D (\u062D\u0641\u0638 \u0645\u062D\u0644\u064A)")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+a.message)}if(o&&AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl)try{Loading.show(),await new Promise(l=>setTimeout(l,500));const a=await GoogleIntegration.readFromSheets("Users");Loading.hide(),a&&Array.isArray(a)?Notification.success(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${a.length} \u0633\u062C\u0644`):Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")}catch(a){Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0639\u062F \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",a),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0644\u0643\u0646 \u0641\u0634\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645:",t),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async testConnection(){Loading.show();try{if(AppState.googleConfig.appsScript.enabled&&AppState.googleConfig.appsScript.scriptUrl){const t=await Utils.promiseWithTimeout(GoogleIntegration.readFromSheets("Users"),3e4,`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646:
1. \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A
2. \u0635\u062D\u0629 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 (RPC)
3. \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0642\u064A\u0648\u062F \u0639\u0644\u0649 \u0627\u0644\u0634\u0628\u0643\u0629`);Loading.hide(),Notification.success("\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0646\u062C\u062D! \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 "+t.length+" \u0633\u062C\u0644")}else Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0625\u062F\u062E\u0627\u0644 \u0631\u0627\u0628\u0637 \u0646\u0642\u0637\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629")}catch(e){Loading.hide();const t=e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: "+t),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644:",e)}},async initializeSheets(){if(!AppState.googleConfig.appsScript.enabled){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u0648\u0644\u0627\u064B");return}if(!AppState.googleConfig.sheets.spreadsheetId){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0648\u0644\u0627\u064B \u0625\u0630\u0627 \u0643\u0627\u0646 \u0645\u0637\u0644\u0648\u0628\u0627\u064B");return}if(confirm(`\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621:
${"Users, Incidents, NearMiss, PTW, Training, ClinicVisits, Medications, SickLeave, ClinicInventory, FireEquipment, FireEquipmentAssets, FireEquipmentInspections, PPE, Violations, Contractors, Employees, BehaviorMonitoring, ChemicalSafety, DailyObservations, ISODocuments, ISOProcedures, ISOForms, EmergencyAlerts, EmergencyPlans".split(", ").map(t=>`- ${t}`).join(`
`)}`))try{Loading.show(),await GoogleIntegration.initializeSheets(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642:",t),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0648\u0631\u0627\u0642: "+t.message)}},getMonthlySafetyDefaultFromDate(){const e=new Date,t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0");return`${t}-${s}-01`},getMonthlySafetyDefaultToDate(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0),s=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${s}-${n}-${i}`},renderMonthlySafetyYearOptions(){const e=new Date().getFullYear();let t="";for(let s=e+1;s>=e-3;s-=1)t+=`<option value="${s}"${s===e?" selected":""}>${s}</option>`;return t},renderMonthlySafetyMonthOptions(){const e=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],t=new Date().getMonth()+1;return e.map((s,n)=>{const i=n+1;return`<option value="${i}"${i===t?" selected":""}>${s}</option>`}).join("")},async generateMonthlySafetyReport(e){if(!this.isCurrentUserAdmin()){const d=typeof Reports<"u"&&Reports.getTranslations?Reports.getTranslations().t("msg.adminOnlyReport"):"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637";Notification.error(d);return}if(typeof Reports>"u"||typeof Reports.downloadMonthlySafetyReport!="function"){Notification.error("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B");return}const t=document.getElementById("monthly-safety-from"),s=document.getElementById("monthly-safety-to"),n=document.getElementById("monthly-safety-site"),i=document.getElementById("monthly-safety-lang"),o=t?t.value:"",a=s?s.value:"",l=n?String(n.value||"").trim():"",c=e||(i?i.value:"ar")||"ar",p=typeof Reports.buildSafetyReportPeriod=="function"?Reports.buildSafetyReportPeriod(o,a):null,{t:S}=Reports.getTranslations?Reports.getTranslations():{t:d=>d};if(!p){Notification.error(S("msg.invalidDateRange"));return}Loading.show(c==="en"?"Preparing monthly safety report...":"\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A...");try{const d=await Reports.downloadMonthlySafetyReport(p,c,l||null);Loading.hide(),d&&Notification.success(c==="en"?"Monthly safety report downloaded":"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0628\u0646\u062C\u0627\u062D")}catch(d){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+(d&&d.message?d.message:String(d)))}},async generateReport(e){Loading.show();try{await Reports.generateAndExport(e),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message)}},setupSettingsListeners(){setTimeout(()=>{const e=document.getElementById("save-date-format-btn");e&&e.addEventListener("click",()=>{const i=document.getElementById("date-format-select").value;AppState.dateFormat=i,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0628\u0646\u062C\u0627\u062D")});const t=document.getElementById("upload-logo-btn"),s=document.getElementById("company-logo-input");t&&s&&t.addEventListener("click",()=>{const i=s.files[0];if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629");return}if(i.size>2097152){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u064A\u062C\u0628 \u0623\u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB");return}const o=new FileReader;o.onload=async a=>{let l=a.target.result;try{l=await Settings.compressLogo(l),Utils.safeLog("\u2705 \u062A\u0645 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631 (\u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A: "+l.length+" \u062D\u0631\u0641)")}catch(p){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0636\u063A\u0637 \u0627\u0644\u0634\u0639\u0627\u0631\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",p)}if(AppState.companyLogo=l,AppState.companySettings||(AppState.companySettings={}),AppState.companySettings.logo=l,localStorage.setItem("company_logo",l),localStorage.setItem("hse_company_logo",l),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const p=AppState.currentUser||{},S=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:l,postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:p.email,name:p.name,role:p.role,permissions:p.permissions}});S&&S.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",S?.message)}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0639\u0627\u0631 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",p)}const c=document.getElementById("company-logo-preview");c&&(c.src=AppState.companyLogo,c.style.display="block"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateDashboardLogo&&UI.updateDashboardLogo(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:l}})),Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D")},o.readAsDataURL(i)});const n=document.getElementById("remove-logo-btn");n&&n.addEventListener("click",async()=>{if(AppState.companyLogo="",AppState.companySettings&&(AppState.companySettings.logo=""),localStorage.removeItem("company_logo"),localStorage.removeItem("hse_company_logo"),typeof window.DataManager<"u"&&window.DataManager.saveCompanySettings&&window.DataManager.saveCompanySettings(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u")try{const o=AppState.currentUser||{},a=await GoogleIntegration.sendToAppsScript("saveCompanySettings",{name:AppState.companySettings?.name||"",secondaryName:AppState.companySettings?.secondaryName||"",formVersion:AppState.companySettings?.formVersion||"1.0",nameFontSize:AppState.companySettings?.nameFontSize||16,secondaryNameFontSize:AppState.companySettings?.secondaryNameFontSize||14,secondaryNameColor:AppState.companySettings?.secondaryNameColor||"#6B7280",clinicMonthlyVisitsAlertThreshold:AppState.companySettings?.clinicMonthlyVisitsAlertThreshold??10,employeeImportHireMonths:AppState.companySettings?.employeeImportHireMonths??3,address:AppState.companySettings?.address||"",phone:AppState.companySettings?.phone||"",email:AppState.companySettings?.email||"",logo:"",postLoginItems:typeof AppState.companySettings?.postLoginItems=="string"?AppState.companySettings.postLoginItems:JSON.stringify(AppState.companySettings?.postLoginItems||[]),userData:{email:o.email,name:o.name,role:o.role,permissions:o.permissions}});a&&a.success?Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D"):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a?.message)}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",o)}const i=document.getElementById("company-logo-preview");i&&(i.style.display="none"),typeof UI<"u"&&UI.updateCompanyLogoHeader&&UI.updateCompanyLogoHeader(),typeof UI<"u"&&UI.updateLoginLogo&&UI.updateLoginLogo(),window.dispatchEvent(new CustomEvent("companyLogoUpdated",{detail:{logoUrl:""}})),Notification.success("\u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D"),this.load()})},100)}};(function(){"use strict";try{typeof window<"u"&&typeof Settings<"u"&&(window.Settings=Settings,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Settings module loaded and available on window.Settings"))}catch{if(typeof window<"u"&&typeof Settings<"u")try{window.Settings=Settings}catch{}}})();
