const Users={currentView:"list",currentEditId:null,autoRefreshInterval:null,refreshInterval:15e3,sectionChangeHandler:null,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(t,s){const a=this._getI18nCore();return a?a.t(t,null,s||t):s||t},applyModuleI18n(t){const s=this._getI18nCore();if(!s)return;const a=t||document.getElementById("users-section")||document;typeof s.applyI18n=="function"&&s.applyI18n(a),typeof s.applyLiteralTranslations=="function"&&s.applyLiteralTranslations(a)},_photoFailKey(t){return`hse_user_photo_failed_${String(t||"").trim()}`},_getDriveIdFromUrl(t){try{const s=String(t||"").trim();if(!s)return"";const a=s.match(/[?&]id=([^&]+)/)||s.match(/\/file\/d\/([^/]+)/);return a?String(a[1]||"").trim():""}catch{return""}},_normalizeUserPhotoUrl(t,s=""){try{const a=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(t)||"").trim():String(t||"").trim();if(!a)return"";let n=a;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?n=Utils.normalizeImageSource(a)||a:a.startsWith("data:image/")?n=a:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(n=window.__convertGoogleDriveUrl(a)||a);const e=this._getDriveIdFromUrl(n)||s||n,r=sessionStorage.getItem(this._photoFailKey(e));if(r){const l=parseInt(r,10),o=Date.now(),d=300*1e3;if(o-l<d)return"";sessionStorage.removeItem(this._photoFailKey(e))}return n}catch{return""}},_setupUserPhotoFallbacks(t){try{const a=(t||document).querySelectorAll('img[data-user-photo="1"]');if(!a||a.length===0)return;a.forEach(n=>{if(!n||n.dataset._fallbackBound==="1")return;n.dataset._fallbackBound="1";const i=(n.dataset.photoKey||"").trim(),e=n.src;if(n.addEventListener("error",()=>{try{i&&sessionStorage.setItem(this._photoFailKey(i),Date.now().toString())}catch{}requestAnimationFrame(()=>{try{const r=document.createElement("div");r.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",r.title="\u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629",r.innerHTML='<i class="fas fa-user text-gray-400"></i>',n.replaceWith(r)}catch{}})},{passive:!0}),i&&n.src){const r=sessionStorage.getItem(this._photoFailKey(i));if(r){const l=parseInt(r,10),o=Date.now(),d=300*1e3;o-l>=d&&(sessionStorage.removeItem(this._photoFailKey(i)),n.src=e+(e.includes("?")?"&":"?")+"retry="+Date.now())}}})}catch{}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("users-section");if(!t)return;if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){t.innerHTML=`
                <div class="content-card">
                    <div class="empty-state">
                        <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                        <p class="text-sm text-gray-400 mt-2">\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629</p>
                    </div>
                </div>
            `;return}try{t.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-users ml-3" aria-hidden="true"></i>
                            ${this.t("module.users.title","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}
                        </h1>
                        <p class="section-subtitle">${this.t("module.users.subtitle","\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0647\u0645")}</p>
                    </div>
                    <button id="add-user-btn" class="btn-primary">
                        <i class="fas fa-plus ml-2" aria-hidden="true"></i>
                        ${this.t("module.users.addNewUser","\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F")}
                    </button>
                </div>
            </div>

            <div id="users-content" class="mt-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t("module.users.loadingList","\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646...")}</p>
                        </div>
                    </div>
                </div>
            </div>
        `,this.applyModuleI18n(t),this.setupEventListeners();try{const a=document.getElementById("users-content");if(a){const n=await this.renderList().catch(i=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",i),`
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                        <button onclick="Users.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `));a.innerHTML=n,this.applyModuleI18n(a),setTimeout(()=>this.loadUsersList(),0)}}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",a)}this.startAutoRefresh(),this.setupSectionChangeListener()}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",a),t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Users.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(t))}},async renderList(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2" aria-hidden="true"></i>
                            ${this.t("module.users.listTitle","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")}
                        </h2>
                        <div class="flex items-center gap-4">
                            <input 
                                type="text" 
                                id="users-search" 
                                class="form-input" 
                                style="max-width: 300px;"
                                placeholder="${this.t("module.users.searchPlaceholder","\u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0645\u0633\u062A\u062E\u062F\u0645...")}"
                            >
                            <select id="users-filter-role" class="form-input" style="max-width: 200px;">
                                <option value="">${this.t("module.users.allRoles","\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062F\u0648\u0627\u0631")}</option>
                                <option value="admin">${this.t("module.users.roleAdmin","\u0645\u062F\u064A\u0631")}</option>
                                <option value="safety_officer">${this.t("module.users.roleSafetyOfficer","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629")}</option>
                                <option value="user">${this.t("module.users.roleUser","\u0645\u0633\u062A\u062E\u062F\u0645")}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="users-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t("module.users.loading","\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...")}</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderForm(t=null){const s=!!t;return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-${s?"edit":"user-plus"} ml-2" aria-hidden="true"></i>
                        ${s?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F"}
                    </h2>
                </div>
                <div class="card-body">
                    <form id="user-form" class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="col-span-2">
                                <label for="user-photo-input" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-image ml-2"></i>
                                    \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645
                                </label>
                                <div class="flex items-center gap-4">
                                    <div class="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                                        <img id="user-photo-preview" src="${t?.photo||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" style="width: 100%; height: 100%; object-fit: cover; display: ${t?.photo?"block":"none"};">
                                        <i id="user-photo-icon" class="fas fa-user text-3xl text-gray-400" style="display: ${t?.photo?"none":"block"}"></i>
                                    </div>
                                    <div class="flex-1">
                                        <input 
                                            type="file" 
                                            id="user-photo-input" 
                                            accept="image/*"
                                            class="form-input"
                                            style="padding: 0.5rem;"
                                        >
                                        <p class="text-xs text-gray-500 mt-1">\u0627\u0636\u0641 \u0635\u0648\u0631\u0629 \u0645\u0631\u0628\u0639\u0629 \u0628\u062D\u062C\u0645 \u0644\u0627 \u064A\u062A\u062C\u0627\u0648\u0632 2MB</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="user-name" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user ml-2"></i>
                                    \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *
                                </label>
                                <input 
                                    type="text" 
                                    id="user-name" 
                                    name="name" 
                                    required
                                    class="form-input"
                                    value="${t?.name||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"
                                >
                            </div>

                            <div>
                                <label for="user-email" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-envelope ml-2"></i>
                                    \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A *
                                </label>
                                <input 
                                    type="email" 
                                    id="user-email" 
                                    name="email" 
                                    autocomplete="email"
                                    required
                                    class="form-input"
                                    value="${t?.email||""}"
                                    placeholder="example@icapp.com.eg"
                                    ${s?"readonly":""}
                                >
                            </div>

                            <div>
                                <label for="user-password" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-key ml-2"></i>
                                    \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 ${s?"(\u0627\u062A\u0631\u0643\u0647 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0642\u062F\u064A\u0645)":"*"}
                                </label>
                                <input 
                                    type="password" 
                                    id="user-password" 
                                    name="password" 
                                    autocomplete="current-password"
                                    ${s?"":"required"}
                                    class="form-input"
                                    placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                                >
                            </div>

                            <div>
                                <label for="user-role" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user-tag ml-2"></i>
                                    \u0627\u0644\u062F\u0648\u0631 *
                                </label>
                                <select id="user-role" name="role" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631</option>
                                    <option value="admin" ${t?.role==="admin"?"selected":""}>\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (System Administrator)</option>
                                    <option value="safety_officer" ${t?.role==="safety_officer"?"selected":""}>\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Officer)</option>
                                    <option value="user" ${t?.role==="user"?"selected":""}>\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A (Regular User)</option>
                                    <option value="read_only" ${t?.role==="read_only"?"selected":""}>\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 (Read Only)</option>
                                </select>
                            </div>

                            <div>
                                <label for="user-department" class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-building ml-2"></i>
                                    \u0627\u0644\u0642\u0633\u0645 *
                                </label>
                                <input 
                                    type="text" 
                                    id="user-department" 
                                    name="department" 
                                    required
                                    class="form-input"
                                    value="${t?.department||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0642\u0633\u0645"
                                >
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-toggle-on ml-2"></i>
                                    \u0627\u0644\u062D\u0627\u0644\u0629
                                </label>
                                <label class="flex items-center mt-2">
                                    <input 
                                        type="checkbox" 
                                        id="user-active" 
                                        name="active"
                                        class="rounded border-gray-300 text-blue-600"
                                        ${t?.active!==!1?"checked":""}
                                    >
                                    <span class="mr-2 text-sm text-gray-700">\u0646\u0634\u0637</span>
                                </label>
                            </div>
                        </div>

                        <div class="border-t pt-4 mt-4">
                            <div class="flex items-center justify-between mb-3">
                                <label class="block text-sm font-semibold text-gray-700">
                                    <i class="fas fa-shield-alt ml-2"></i>
                                    \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A
                                </label>
                                <div class="flex gap-2">
                                    <button type="button" id="select-all-permissions-btn" class="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                        <i class="fas fa-check-double ml-1"></i>
                                        \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644
                                    </button>
                                    <button type="button" id="deselect-all-permissions-btn" class="text-xs px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                                        <i class="fas fa-times ml-1"></i>
                                        \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0643\u0644
                                    </button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="modules-permissions-container">
                                ${MODULE_PERMISSIONS_CONFIG.map(a=>{const n=t?.permissions&&t.permissions[a.key]===!0,e=(document.getElementById("user-role")?.value||t?.role)==="admin"||t?.role==="admin",r=a.hasDetailedPermissions&&MODULE_DETAILED_PERMISSIONS[a.key];return`
                                        <div class="module-permission-item ${r?"has-detailed":""}">
                                            <label class="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer ${e?"opacity-50 cursor-not-allowed":""}">
                                                <input 
                                                    type="checkbox" 
                                                    class="user-permission-checkbox rounded border-gray-300 text-blue-600 mr-2" 
                                                    data-module="${a.key}"
                                                    ${n?"checked":""}
                                                    ${e?"disabled":""}
                                                    ${e?'title="\u0627\u0644\u0645\u062F\u064A\u0631 \u0644\u062F\u064A\u0647 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0643\u0627\u0645\u0644\u0629"':""}
                                                >
                                                <i class="fas ${a.icon} ml-1 text-gray-600"></i>
                                                <span class="text-sm text-gray-700">${a.label}</span>
                                                ${r&&!e?`
                                                    <button type="button" class="mr-auto text-blue-500 hover:text-blue-700" 
                                                            data-action="show-detailed-permissions" 
                                                            data-module="${a.key}"
                                                            title="\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629">
                                                        <i class="fas fa-cog text-xs"></i>
                                                    </button>
                                                `:""}
                                            </label>
                                        </div>
                                    `}).join("")}
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0627\u0644\u062A\u064A \u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u064A\u0647\u0627. \u0627\u0644\u0645\u062F\u064A\u0631 \u0644\u062F\u064A\u0647 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.
                                <br>
                                <i class="fas fa-cog ml-1 text-blue-500"></i>
                                \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u062A\u064A \u0628\u0647\u0627 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u062A\u0631\u0633 \u064A\u0645\u0643\u0646 \u062A\u062E\u0635\u064A\u0635 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0647\u0627.
                            </p>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" id="cancel-user-btn" class="btn-secondary">
                                \u0625\u0644\u063A\u0627\u0621
                            </button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2" aria-hidden="true"></i>
                                ${s?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `},async loadUsersList(){const t=document.getElementById("users-table-container");if(!t)return;let s=AppState.appData.users||[];if(s.length===0&&typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncUsers=="function")try{t.innerHTML=`
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645...</p>
                        </div>
                    `,await GoogleIntegration.syncUsers(!0),s=AppState.appData.users||[]}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",i)}if(s.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                    <button id="add-user-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `,this.applyModuleI18n(t);return}const a=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                            <th>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</th>
                            <th>\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</th>
                            <th>\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0634\u0641\u0631\u0629</th>
                            <th>\u0627\u0644\u062F\u0648\u0631</th>
                            <th>\u0627\u0644\u0642\u0633\u0645</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644</th>
                            <th>\u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.map(i=>{const e=i.isOnline===!0,r=i.lastLogin?Utils.formatDateTime(i.lastLogin):"-";return`
                            <tr>
                                <td>
                                    <div class="flex items-center gap-3">
                                        ${(()=>{const o=(this._getDriveIdFromUrl(i.photo||"")||i.id||i.email||i.name||"").toString(),d=this._normalizeUserPhotoUrl(i.photo,i.id);if(!d)return'<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>';const f=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(d):{canonical:d,displaySrc:d,needsProxy:!1,proxyFileId:""},h=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";return`<img data-user-photo="1" data-photo-key="${Utils.escapeHTML(o)}" src="${Utils.escapeHTML(f.displaySrc)}" alt="${Utils.escapeHTML(i.name||"")}"${h} class="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`})()}
                                        <span>${Utils.escapeHTML(i.name||"")}</span>
                                    </div>
                                </td>
                                <td>${Utils.escapeHTML(i.email||"")}${typeof Auth<"u"&&Auth._isMfaEnabledForUser&&Auth._isMfaEnabledForUser(i)?' <span class="badge badge-info text-xs" title="\u0645\u0635\u0627\u062F\u0642\u0629 \u062B\u0646\u0627\u0626\u064A\u0629"><i class="fas fa-shield-halved"></i> MFA</span>':""}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-lock text-gray-400 text-sm"></i>
                                        <span class="text-sm text-gray-600" title="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u062E\u0641\u064A\u0629 \u0644\u0644\u0623\u0645\u0627\u0646">
                                            ${i.password&&i.password!=="***"?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":'<span class="text-gray-400">***</span>'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-key text-gray-400 text-sm"></i>
                                        <span class="text-sm text-gray-600 font-mono" title="${i.passwordHash||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}">
                                            ${i.passwordHash?i.passwordHash.substring(0,8)+"...":'<span class="text-gray-400">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-${this.getRoleBadgeClass(i.role)}">
                                        ${this.getRoleName(i.role)}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(i.department||"")}</td>
                                <td>
                                    <span class="badge badge-${i.active!==!1?"success":"danger"}">
                                        ${i.active!==!1?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-3 h-3 rounded-full ${e?"bg-green-500":"bg-gray-400"}" style="animation: ${e?"pulse 2s infinite":"none"};"></div>
                                        <span class="text-sm ${e?"text-green-600":"text-gray-500"}">
                                            ${e?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="text-sm text-gray-600" title="${i.lastLogin||"-"}">
                                        ${r}
                                    </span>
                                </td>
                                <td>${i.createdAt?Utils.formatDate(i.createdAt):"-"}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button 
                                            onclick="Users.resetUserPassword('${i.id}', '${i.email}')" 
                                            class="btn-icon btn-icon-warning"
                                            title="\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"
                                        >
                                            <i class="fas fa-key"></i>
                                        </button>
                                        ${typeof Auth<"u"&&Auth._isMfaEnabledForUser&&Auth._isMfaEnabledForUser(i)?`
                                        <button 
                                            onclick="Users.disableUserMfa('${i.id}', '${i.email}')" 
                                            class="btn-icon btn-icon-secondary"
                                            title="\u062A\u0639\u0637\u064A\u0644 MFA"
                                        >
                                            <i class="fas fa-shield-halved"></i>
                                        </button>`:""}
                                        <button 
                                            onclick="Users.editUser('${i.id}')" 
                                            class="btn-icon btn-icon-primary"
                                            title="\u062A\u0639\u062F\u064A\u0644"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            onclick="Users.deleteUser('${i.id}')" 
                                            class="btn-icon btn-icon-danger"
                                            title="\u062D\u0630\u0641"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `}).join("")}
                    </tbody>
                </table>
            </div>
        `;t.innerHTML=a,this.applyModuleI18n(t);const n=()=>{this._setupUserPhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:i=>{try{const e=(i.dataset.photoKey||"").trim();e&&sessionStorage.setItem(this._photoFailKey(e),Date.now().toString())}catch{}try{const e=document.createElement("div");e.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",e.innerHTML='<i class="fas fa-user text-gray-400"></i>',i.replaceWith(e)}catch{}}})};typeof requestIdleCallback=="function"?requestIdleCallback(()=>n(),{timeout:600}):setTimeout(()=>n(),0)},getRoleName(t){return{admin:"\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",safety_officer:"\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",user:"\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A",read_only:"\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637"}[t]||t},getRoleBadgeClass(t){return{admin:"danger",safety_officer:"warning",user:"info",read_only:"secondary"}[t]||"secondary"},setupEventListeners(){setTimeout(()=>{const t=document.getElementById("add-user-btn"),s=document.getElementById("add-user-empty-btn");t&&t.addEventListener("click",()=>this.showForm()),s&&s.addEventListener("click",()=>this.showForm());const a=document.getElementById("import-excel-btn");a&&a.addEventListener("click",()=>this.showImportExcel());const n=document.getElementById("users-search"),i=document.getElementById("users-filter-role");n&&n.addEventListener("input",l=>this.filterUsers(l.target.value,i?.value)),i&&i.addEventListener("change",l=>this.filterUsers(n?.value,l.target.value));const e=document.getElementById("user-form");e&&e.addEventListener("submit",l=>this.handleSubmit(l));const r=document.getElementById("cancel-user-btn");r&&r.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async showForm(t=null){Utils.safeLog("\u{1F527} \u0639\u0631\u0636 \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645:",t?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F"),this.currentEditId=t?.id||null,this.currentDetailedPermissions={};let s=null;if(t&&t.permissions){let n;try{if(typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function")n=Permissions.normalizePermissions(t.permissions);else if(typeof t.permissions=="string"){const e=t.permissions.trim();if(e.startsWith("{")||e.startsWith("["))n=JSON.parse(e);else try{const r=e.split(`
`).filter(l=>l.trim());n={},r.forEach(l=>{const o=l.match(/^([^:]+):\s*(.+)$/);if(o){const d=o[1].trim(),f=o[2].trim();f==="true"?n[d]=!0:f==="false"?n[d]=!1:isNaN(f)?n[d]=f:n[d]=Number(f)}})}catch{n={}}}else n=t.permissions}catch{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 - \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),n={}}(!n||typeof n!="object"||Array.isArray(n))&&(n={});const i={};Object.keys(n).forEach(e=>{const r=n[e];e.endsWith("Permissions")&&typeof r=="object"&&!Array.isArray(r)?this.currentDetailedPermissions[e]=r:e.endsWith("Permissions")||(i[e]=r===!0)}),s=i}const a=document.getElementById("users-content");if(a){const n=t?{...t,permissions:s??(t.permissions&&typeof t.permissions=="object"&&!Array.isArray(t.permissions)?t.permissions:{})}:null;a.innerHTML=await this.renderForm(n),this.applyModuleI18n(a),this.setupEventListeners(),setTimeout(()=>{const i=document.getElementById("user-role");i&&i.addEventListener("change",()=>{this.updatePermissionsUI()}),this.setupSelectAllButtons(),this.setupDetailedPermissionsButtons(),this.updatePermissionsUI()},100)}else Utils.safeError(" \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 users-content")},updatePermissionsUI(){const s=document.getElementById("user-role")?.value;document.querySelectorAll(".user-permission-checkbox").forEach(e=>{s==="admin"?(e.disabled=!0,e.checked=!0,e.parentElement.classList.add("opacity-50","cursor-not-allowed")):(e.disabled=!1,e.parentElement.classList.remove("opacity-50","cursor-not-allowed"))});const n=document.getElementById("select-all-permissions-btn"),i=document.getElementById("deselect-all-permissions-btn");n&&i&&(s==="admin"?(n.style.display="none",i.style.display="none"):(n.style.display="inline-flex",i.style.display="inline-flex"))},setupSelectAllButtons(){const t=document.getElementById("select-all-permissions-btn"),s=document.getElementById("deselect-all-permissions-btn");t&&t.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(n=>{n.checked=!0}),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")}),s&&s.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(n=>{n.checked=!1}),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")})},setupDetailedPermissionsButtons(){document.querySelectorAll('[data-action="show-detailed-permissions"]').forEach(s=>{s.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=s.getAttribute("data-module");this.showDetailedPermissionsModal(n)})})},showDetailedPermissionsModal(t){const s=MODULE_DETAILED_PERMISSIONS[t];if(!s){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062F\u064A\u0648\u0644");return}const n=(this.currentDetailedPermissions||{})[`${t}Permissions`]||{},i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${s.label}
                    </h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-sm text-gray-600 mb-4">
                        <i class="fas fa-info-circle ml-1"></i>
                        \u062D\u062F\u062F \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0645\u0646\u062D\u0647\u0627 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062F\u0627\u062E\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u062F\u064A\u0648\u0644
                    </p>
                    <div class="space-y-2">
                        ${s.permissions.map(o=>{const d=o.key==="observations-view-department"?n[o.key]!==!1:n[o.key]===!0;return`
                            <label class="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    class="detailed-permission-checkbox rounded border-gray-300 text-blue-600 mr-2" 
                                    data-module="${t}"
                                    data-permission="${o.key}"
                                    ${d?"checked":""}
                                >
                                <i class="fas ${o.icon} ml-2 text-gray-600"></i>
                                <span class="text-sm text-gray-700">${o.label}</span>
                            </label>
                        `}).join("")}
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button type="button" id="select-all-detailed-btn" class="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            <i class="fas fa-check-double ml-1"></i>
                            \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644
                        </button>
                        <button type="button" id="deselect-all-detailed-btn" class="text-xs px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                            <i class="fas fa-times ml-1"></i>
                            \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0643\u0644
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" class="btn-primary" id="save-detailed-permissions-btn">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",o=>{o.target===i&&i.remove()});const e=i.querySelector("#select-all-detailed-btn"),r=i.querySelector("#deselect-all-detailed-btn");e&&e.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(d=>d.checked=!0)}),r&&r.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(d=>d.checked=!1)});const l=i.querySelector("#save-detailed-permissions-btn");l&&l.addEventListener("click",()=>{const o=i.querySelectorAll(".detailed-permission-checkbox"),d={};o.forEach(f=>{const h=f.getAttribute("data-permission");d[h]=f.checked}),this.currentDetailedPermissions||(this.currentDetailedPermissions={}),this.currentDetailedPermissions[`${t}Permissions`]=d,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629"),i.remove()})},async showList(){this.currentEditId=null;const t=document.getElementById("users-content");t&&(t.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadUsersList())},async handleSubmit(t){t.preventDefault();const s=t.target?.querySelector('button[type="submit"]')||document.querySelector('#user-form button[type="submit"]');if(s&&s.disabled)return;let a="";if(s&&(a=s.innerHTML,s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'),Loading.show(),!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Loading.hide(),Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),s&&(s.disabled=!1,s.innerHTML=a);return}const i=this.currentEditId?AppState.appData.users.find(m=>m.id===this.currentEditId):null;let e=i?.photo||"";const r=document.getElementById("user-photo-input");if(r&&r.files.length>0){const m=r.files[0];if(m.size>2097152){Loading.hide(),Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),s&&(s.disabled=!1,s.innerHTML=a);return}e=await this.convertImageToBase64(m)}const l=document.getElementById("user-password"),o=l?l.value:"",d=o?o.trim():"",f=i?.passwordHash||(Utils.isSha256Hex(i?.password)?i?.password:""),h=i?.password&&i.password!==""?i.password:"***",b=document.getElementById("user-name"),v=document.getElementById("user-email"),w=document.getElementById("user-role"),y=document.getElementById("user-department"),g=document.getElementById("user-active");if(!b||!v||!w||!y||!g){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),s&&(s.disabled=!1,s.innerHTML=a);return}const x=this.collectPermissions(),c={id:this.currentEditId||Utils.generateId("USER"),name:b.value.trim(),email:v.value.trim().toLowerCase(),role:w.value,department:y.value.trim(),active:g.checked,photo:e,permissions:x&&typeof x=="object"?x:{},createdAt:this.currentEditId?AppState.appData.users.find(m=>m.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),lastLogin:i?.lastLogin||null,lastLogout:i?.lastLogout||null,isOnline:i?.isOnline||!1,loginHistory:i?.loginHistory||[]};if(!c.name||!c.email||!c.role||!c.department){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),s&&(s.disabled=!1,s.innerHTML=a);return}if(!Utils.isValidEmail(c.email)){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0635\u062D\u064A\u062D"),s&&(s.disabled=!1,s.innerHTML=a);return}const P=!this.currentEditId,I=d.length>0,S=this.currentEditId?AppState.appData.users.find(m=>m.id===this.currentEditId):null;let L=(m=>!!(m&&m!=="***"&&typeof Utils<"u"&&Utils.isSha256Hex&&Utils.isSha256Hex(m)))(S?.passwordHash)?S.passwordHash:"",A=S?.forcePasswordChange??!1,E=S?.passwordChanged??!1;if(P){if(!I){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"),s&&(s.disabled=!1,s.innerHTML=a);return}if(d.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),s&&(s.disabled=!1,s.innerHTML=a);return}L=await Utils.hashPassword(d),A=!0,E=!1}else if(I){if(d.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),s&&(s.disabled=!1,s.innerHTML=a);return}L=await Utils.hashPassword(d),A=!0,E=!1}if(c.password="***",L?c.passwordHash=L:delete c.passwordHash,c.forcePasswordChange=A,c.passwordChanged=E,AppState.appData.users.find(m=>m.email===c.email&&m.id!==c.id)){Loading.hide(),Notification.error("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644"),s&&(s.disabled=!1,s.innerHTML=a);return}try{if(!this.currentEditId){if(AppState.appData.users.push(c),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(p){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",p)}Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("addUser",c,3).then(p=>{p&&p.success?(Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062C\u062F\u064A\u062F \u0625\u0644\u0649 Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):p&&p.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",p?.message),typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Users",AppState.appData.users),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",p?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(p=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",p),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}else{const p=AppState.appData.users.findIndex(u=>u.id===this.currentEditId);if(p!==-1){const u=AppState.appData.users[p],U=AppState.currentUser&&AppState.currentUser.email&&c.email.toLowerCase()===AppState.currentUser.email.toLowerCase(),$={...c,isOnline:U?!0:c.isOnline};AppState.appData.users[p]={...u,...$}}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("updateUser",{userId:c.id,updateData:c},3).then(u=>{u&&u.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):u&&u.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",u?.message),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(U=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",U)),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",u?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(u=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",u),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(U=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",U)),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}if(AppState.currentUser&&((c.email||"").toLowerCase()===(AppState.currentUser.email||"").toLowerCase()||c.id&&AppState.currentUser.id&&String(c.id).trim()===String(AppState.currentUser.id).trim())){if(AppState.currentUser={...AppState.currentUser,...c,loginTime:AppState.currentUser.loginTime},c.permissions&&typeof c.permissions=="object"){const u=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(c.permissions):c.permissions;AppState.currentUser.permissions=u||{}}else AppState.currentUser.permissions={};let p=!1;typeof window.Auth<"u"&&typeof window.Auth.updateUserSession=="function"?(p=!!window.Auth.updateUserSession(),p&&(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A \u0628\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0643 \u0628\u0646\u062C\u0627\u062D. \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0645\u062A\u0627\u062D\u0629 \u0627\u0644\u0622\u0646 \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C."))):(typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&Permissions.updateNavigation(),Notification.info("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A\u0643. \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A.")),!p&&typeof UI<"u"&&typeof UI.updateUserProfilePhoto=="function"&&UI.updateUserProfilePhoto(),typeof UI<"u"&&AppState.currentSection==="profile"&&typeof UI.renderMyProfileSection=="function"&&Promise.resolve(UI.renderMyProfileSection()).catch(()=>{})}else{const p=AppState.appData.users.find(u=>u.id===c.id);p&&p.isOnline===!0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ${p.email} - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629`)}typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&(Permissions.updateNavigation(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0628\u0639\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A"));try{typeof window.RealtimeSyncManager<"u"&&typeof window.RealtimeSyncManager.broadcast=="function"&&(window.RealtimeSyncManager.broadcast("user-permissions-updated","users",{id:c.id,email:c.email,role:c.role,active:c.active,permissions:c.permissions}),window.RealtimeSyncManager.broadcast("sync-request","users"))}catch{}s&&(s.disabled=!1,s.innerHTML=a),this.showList()}catch(m){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",m),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+m.message),s&&(s.disabled=!1,s.innerHTML=a)}},async editUser(t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const a=AppState.appData.users.find(n=>n.id===t);a?await this.showForm(a):Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async disableUserMfa(t,s){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u0637\u064A\u0644 MFA");return}const n=(AppState.appData.users||[]).find(e=>e&&(e.id===t||e.email===s));if(!n){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u062A\u0639\u0637\u064A\u0644 MFA",`\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629 \u0627\u0644\u062B\u0646\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${n.name}" (${n.email})\u061F`,"\u062A\u0639\u0637\u064A\u0644","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{const e=await Auth.adminDisableUserMfa(n.email);Loading.hide(),e&&e.success&&this.load()}catch{Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u0639\u0637\u064A\u0644 MFA")}}},async resetUserPassword(t,s){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");return}const n=AppState.appData.users.find(e=>e.id===t||e.email===s);if(!n){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${n.name}" (${n.email})\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0645\u0624\u0642\u062A\u0629 \u062C\u062F\u064A\u062F\u0629.`,"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u0625\u0644\u063A\u0627\u0621"))try{Loading.show();const e=await Auth.resetPassword(n.email);if(Loading.hide(),e&&e.success){const r=e.tempPassword||"\u063A\u064A\u0631 \u0645\u062A\u0627\u062D",l=`
                    <div style="text-align: right; direction: rtl;">
                        <p style="margin-bottom: 10px; font-weight: bold;">\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062C\u0627\u062D!</p>
                        <p style="margin-bottom: 10px;">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 <strong>${Utils.escapeHTML(n.email)}</strong>:</p>
                        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; text-align: center; direction: ltr;">
                            <strong>${Utils.escapeHTML(r)}</strong>
                        </div>
                        <p style="margin-top: 10px; color: #666; font-size: 14px;">
                            \u26A0\uFE0F \u064A\u0631\u062C\u0649 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629. \u0633\u064A\u064F\u0637\u0644\u0628 \u0645\u0646\u0647 \u062A\u063A\u064A\u064A\u0631\u0647\u0627 \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.
                        </p>
                    </div>
                `,o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
                    <div class="modal-content" style="max-width: 500px;">
                        <div class="modal-header">
                            <h3>\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629</h3>
                            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${l}
                        </div>
                        <div class="modal-footer">
                            <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-check ml-2"></i>
                                \u062A\u0645
                            </button>
                            <button class="btn-secondary" onclick="navigator.clipboard.writeText('${r}').then(() => Notification.success('\u062A\u0645 \u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631')).catch(() => {})">
                                <i class="fas fa-copy ml-2"></i>
                                \u0646\u0633\u062E
                            </button>
                        </div>
                    </div>
                `,document.body.appendChild(o),o.addEventListener("click",d=>{d.target===o&&o.remove()}),this.loadUsersList()}else Notification.error(e?.message||"\u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631")}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:",e)}},async deleteUser(t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const a=AppState.appData.users.find(e=>e.id===t);if(!a){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(AppState.currentUser&&a.id===AppState.currentUser.id){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062E\u0627\u0635");return}const n=AppState.appData.users.filter(e=>e.role==="admin"&&e.active!==!1);if(a.role==="admin"&&n.length===1){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0622\u062E\u0631 \u0645\u062F\u064A\u0631 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645");return}if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${a.name}" (${a.email})\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{let e=!1;if(AppState.googleConfig.appsScript.enabled)try{const r=await GoogleIntegration.sendToAppsScript("deleteUser",{userId:t});if(e=r&&r.success===!0,!e&&r&&r.message)throw new Error(r.message)}catch(r){const l=AppState.appData.users.filter(o=>o.id!==t);try{await GoogleIntegration.autoSave("Users",l),e=!0}catch(o){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 Google Sheets \u0648\u0628\u062F\u064A\u0644 autoSave:",o),Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(r.message||r)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",r);return}}else await GoogleIntegration.autoSave("Users",AppState.appData.users.filter(r=>r.id!==t)),e=!0;if(!e){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}AppState.appData.users=AppState.appData.users.filter(r=>r.id!==t),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),this.loadUsersList()}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(e&&e.message?e.message:String(e))),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",e)}}},filterUsers(t="",s=""){let n=AppState.appData.users||[];if(t){const e=t.toLowerCase();n=n.filter(r=>r.name?.toLowerCase().includes(e)||r.email?.toLowerCase().includes(e)||r.department?.toLowerCase().includes(e))}s&&(n=n.filter(e=>e.role===s));const i=document.querySelector("#users-table-container tbody");i&&(n.length===0?i.innerHTML=`
                    <tr>
                        <td colspan="7" class="text-center text-gray-500 py-8">
                            \u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C
                        </td>
                    </tr>
                `:i.innerHTML=n.map(e=>`
                    <tr>
                        <td>${Utils.escapeHTML(e.name||"")}</td>
                        <td>${Utils.escapeHTML(e.email||"")}</td>
                        <td>
                            <span class="badge badge-${this.getRoleBadgeClass(e.role)}">
                                ${this.getRoleName(e.role)}
                            </span>
                        </td>
                        <td>${Utils.escapeHTML(e.department||"")}</td>
                        <td>
                            <span class="badge badge-${e.active!==!1?"success":"danger"}">
                                ${e.active!==!1?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                            </span>
                        </td>
                        <td>${e.createdAt?Utils.formatDate(e.createdAt):"-"}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick="Users.editUser('${e.id}')" 
                                    class="btn-icon btn-icon-primary"
                                    title="\u062A\u0639\u062F\u064A\u0644"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button 
                                    onclick="Users.deleteUser('${e.id}')" 
                                    class="btn-icon btn-icon-danger"
                                    title="\u062D\u0630\u0641"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join(""))},async showImportExcel(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0648\u0638\u064A\u0646 \u0645\u0646 \u0645\u0644\u0641 Excel</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0647\u0645\u0629:</strong></p>
                            <p class="text-sm text-blue-700">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:</p>
                            <ul class="text-sm text-blue-700 list-disc mr-6 mt-2">
                                <li><strong>\u0627\u0644\u0627\u0633\u0645</strong> \u0623\u0648 <strong>Name</strong> - \u0625\u0644\u0632\u0627\u0645\u064A</li>
                                <li><strong>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</strong> \u0623\u0648 <strong>Email</strong> - \u0625\u0644\u0632\u0627\u0645\u064A</li>
                                <li><strong>\u0627\u0644\u062F\u0648\u0631</strong> \u0623\u0648 <strong>Role</strong> (\u0645\u062F\u064A\u0631\u060C \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\u060C \u0645\u0633\u062A\u062E\u062F\u0645)</li>
                                <li><strong>\u0627\u0644\u0642\u0633\u0645</strong> \u0623\u0648 <strong>Department</strong></li>
                            </ul>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls)
                            </label>
                            <input type="file" id="excel-file-input" accept=".xlsx,.xls" class="form-input">
                        </div>
                        <div id="import-preview" class="hidden">
                            <h3 class="text-sm font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0623\u0648\u0644 5 \u0635\u0648):</h3>
                            <div class="max-h-60 overflow-auto border rounded">
                                <table class="data-table text-xs">
                                    <thead id="preview-head"></thead>
                                    <tbody id="preview-body"></tbody>
                                </table>
                            </div>
                            <p id="preview-count" class="text-sm text-gray-600 mt-2"></p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="confirm-import-btn" class="btn-primary" disabled>
                        <i class="fas fa-upload ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(s);const a=document.getElementById("excel-file-input"),n=document.getElementById("confirm-import-btn");let i=[];(()=>{if(typeof XLSX>"u"){const r=document.createElement("script");r.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",r.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},r.onload=()=>{a.addEventListener("change",l=>{i=[],this.handleExcelFile(l.target.files[0],s,n,o=>{i=o})})},document.head.appendChild(r)}else a.addEventListener("change",r=>{i=[],this.handleExcelFile(r.target.files[0],s,n,l=>{i=l})})})(),n.addEventListener("click",async()=>{if(i.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(i,s)}),s.addEventListener("click",r=>{r.target===s&&s.remove()})},handleExcelFile(t,s,a,n){if(!t)return;const i=new FileReader;i.onload=async e=>{try{Loading.show();const r=new Uint8Array(e.target.result),l=XLSX.read(r,{type:"array"}),o=l.SheetNames[0],d=l.Sheets[o],f=XLSX.utils.sheet_to_json(d);if(f.length===0){Loading.hide(),Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}n&&n(f);const h=document.getElementById("import-preview"),b=document.getElementById("preview-head"),v=document.getElementById("preview-body"),w=document.getElementById("preview-count");if(h&&f.length>0){const y=Object.keys(f[0]);b.innerHTML=`<tr>${y.map(g=>`<th class="px-2 py-1">${Utils.escapeHTML(g)}</th>`).join("")}</tr>`,v.innerHTML=f.slice(0,5).map(g=>`<tr>${y.map(x=>`<td class="px-2 py-1">${Utils.escapeHTML(String(g[x]||""))}</td>`).join("")}</tr>`).join(""),w.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${f.length}`,h.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(r){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+r.message)}},i.readAsArrayBuffer(t)},async processImport(t,s){try{Loading.show();let a=0,n=0;const i=[];for(const e of t)try{const r=e.\u0627\u0644\u0627\u0633\u0645||e.Name||e.name||e.NAME||"",l=e["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||e.Email||e.email||e.EMAIL||"",o=e.\u0627\u0644\u062F\u0648\u0631||e.Role||e.role||e.ROLE||"user",d=e.\u0627\u0644\u0642\u0633\u0645||e.Department||e.department||e.DEPARTMENT||"";if(!r||!l){n++,i.push(`\u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0623\u0648 \u0628\u0631\u064A\u062F: ${JSON.stringify(e)}`);continue}if(!Utils.isValidEmail(l)){n++,i.push(`\u0628\u0631\u064A\u062F \u063A\u064A\u0631 \u0635\u062D\u064A\u062D: ${l}`);continue}if(AppState.appData.users.find(g=>g.email===l.toLowerCase())){n++;continue}const h=Math.random().toString(36).substring(2,10),b=Date.now().toString(36).substring(5,9),v="Temp"+h+b+"!",w=await Utils.hashPassword(v),y={id:Utils.generateId("USER"),name:r.trim(),email:l.toLowerCase().trim(),password:"***",passwordHash:w,role:this.mapRole(o),department:d.trim(),active:!0,permissions:this.mapRole(o)==="admin"?{}:void 0,forcePasswordChange:!0,passwordChanged:!1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.users.push(y),a++}catch{n++}if(a>0&&typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(e){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",e)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),a>0&&await GoogleIntegration.autoSave("Users",AppState.appData.users),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${a} \u0645\u0648\u0638${n>0?` (\u0641\u0634\u0644 ${n})`:""}`),s.remove(),this.loadUsersList()}catch(a){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+a.message)}},mapRole(t){const s=String(t||"").toLowerCase().trim();return s.includes("\u0645\u062F\u064A\u0631")||s.includes("admin")?"admin":s.includes("\u0633\u0644\u0627\u0645\u0629")||s.includes("safety")?"safety_officer":"user"},async convertImageToBase64(t){return new Promise((s,a)=>{const n=new FileReader;n.onload=()=>s(n.result),n.onerror=a,n.readAsDataURL(t)})},collectPermissions(){const t={},s=document.querySelectorAll(".user-permission-checkbox:checked:not([disabled])");for(const a of s){const n=a.getAttribute("data-module");n&&(t[n]=!0)}return this.currentDetailedPermissions&&typeof this.currentDetailedPermissions=="object"&&Object.assign(t,this.currentDetailedPermissions),typeof MODULE_PERMISSIONS_CONFIG<"u"&&MODULE_PERMISSIONS_CONFIG.forEach(a=>{t[a.key]||delete t[`${a.key}Permissions`]}),Object.keys(t).length>0?t:{}},setupPhotoPreview(){const t=document.getElementById("user-photo-input"),s=document.getElementById("user-photo-preview"),a=document.getElementById("user-photo-icon");t&&s&&a&&t.addEventListener("change",n=>{const i=n.target.files[0];if(i){const e=new FileReader;e.onload=r=>{s.src=r.target.result,s.style.display="block",a.style.display="none"},e.readAsDataURL(i)}})},startAutoRefresh(){this.stopAutoRefresh(),this.autoRefreshInterval=setInterval(()=>{const t=document.getElementById("users-section");t&&t.style.display!=="none"&&!t.hidden&&this.refreshUsersTable()},this.refreshInterval),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644")},stopAutoRefresh(){this.autoRefreshInterval&&(clearInterval(this.autoRefreshInterval),this.autoRefreshInterval=null,Utils.safeLog("\u{1F6D1} \u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A"))},refreshUsersTable(){const t=document.getElementById("users-table-container");if(!t)return;const s=t.querySelector("tbody");if(!s){this.loadUsersList();return}const a=AppState.appData.users||[];s.querySelectorAll("tr").forEach(n=>{const i=n.querySelectorAll("td");if(i.length<9)return;const e=i[1]?.textContent?.trim();if(!e)return;const r=a.find(h=>h.email&&h.email.toLowerCase().trim()===e.toLowerCase().trim());if(!r)return;const l=r.isOnline===!0,o=r.lastLogin?Utils.formatDateTime(r.lastLogin):"-",d=i[7];d&&(d.innerHTML=`
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${l?"bg-green-500":"bg-gray-400"}" style="animation: ${l?"pulse 2s infinite":"none"};"></div>
                        <span class="text-sm ${l?"text-green-600":"text-gray-500"}">
                            ${l?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                        </span>
                    </div>
                `);const f=i[8];f&&(f.innerHTML=`
                    <span class="text-sm text-gray-600" title="${r.lastLogin||"-"}">
                        ${o}
                    </span>
                `)})},updateUserStatus(t){const s=document.getElementById("users-table-container");if(!s)return;const a=s.querySelector("tbody");if(!a)return;const n=AppState.appData.users.find(e=>e.id===t);if(!n)return;a.querySelectorAll("tr").forEach(e=>{const r=e.querySelectorAll("td");if(r.length>0){const l=n.email;if(r[1]?.textContent?.trim()===l){const d=n.isOnline===!0,f=n.lastLogin?Utils.formatDateTime(n.lastLogin):"-";r[7]&&(r[7].innerHTML=`
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full ${d?"bg-green-500":"bg-gray-400"}" style="animation: ${d?"pulse 2s infinite":"none"};"></div>
                                <span class="text-sm ${d?"text-green-600":"text-gray-500"}">
                                    ${d?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                                </span>
                            </div>
                        `),r[8]&&(r[8].innerHTML=`
                            <span class="text-sm text-gray-600" title="${n.lastLogin||"-"}">
                                ${f}
                            </span>
                        `),AppState.currentUser&&AppState.currentUser.email&&l.toLowerCase()===AppState.currentUser.email.toLowerCase()&&typeof UI<"u"&&typeof UI.updateUserConnectionStatus=="function"&&setTimeout(()=>{UI.updateUserConnectionStatus()},100)}}})},setupSectionChangeListener(){this.sectionChangeHandler&&document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=t=>{const s=t.detail?.section,a=t.detail?.previousSection;s==="users"?this.startAutoRefresh():a==="users"&&s!=="users"&&this.stopAutoRefresh()},document.addEventListener("section-changed",this.sectionChangeHandler)},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module..."),this.stopAutoRefresh(),this.sectionChangeHandler&&(document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=null),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Users module:",t)}}};(function(){"use strict";try{typeof window<"u"&&typeof Users<"u"?window.Users=Users:typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C users.js: \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}catch{if(typeof window<"u"&&typeof Users<"u")try{window.Users=Users}catch{}}})();
