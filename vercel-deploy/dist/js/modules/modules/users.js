const Users={currentView:"list",currentEditId:null,autoRefreshInterval:null,refreshInterval:15e3,sectionChangeHandler:null,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(t,e){const a=this._getI18nCore();return a?a.t(t,null,e||t):e||t},applyModuleI18n(t){const e=this._getI18nCore();if(!e)return;const a=t||document.getElementById("users-section")||document;typeof e.applyI18n=="function"&&e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},generateRandomPassword(t=10){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";let a="";if(window.crypto&&window.crypto.getRandomValues){const n=new Uint32Array(t);window.crypto.getRandomValues(n);for(let i=0;i<t;i++)a+=e[n[i]%e.length]}else for(let n=0;n<t;n++)a+=e.charAt(Math.floor(Math.random()*e.length));return a},showUserCredentialsModal(t){if(!t||!t.email)return;const e=document.getElementById("user-credentials-modal-overlay");e&&e.remove();const n={admin:"\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (Admin)",safety_officer:"\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Officer)",user:"\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A (Regular User)",read_only:"\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 (Read Only)"}[t.role]||t.role||"\u0645\u0633\u062A\u062E\u062F\u0645",i=window.location.origin+window.location.pathname,s=`\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0648\u0631\u062D\u0645\u0629 \u0627\u0644\u0644\u0647 \u0648\u0628\u0631\u0643\u0627\u062A\u0647\u060C\r
\r
\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A: ${t.name||"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"}\r
\r
\u062A\u0645 \u0625\u0646\u0634\u0627\u0621/\u062A\u062D\u062F\u064A\u062B \u062D\u0633\u0627\u0628\u0643\u0645 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP HSE).\r
\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643:\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\u{1F464} \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644: ${t.name||"\u2014"}\r
\u2709\uFE0F \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${t.email}\r
\u{1F511} \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631: ${t.password||"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}\r
\u{1F6E1}\uFE0F \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A: ${n}\r
\u{1F3E2} \u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629: ${t.department||"\u2014"}\r
\u{1F310} \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0646\u0638\u0627\u0645: ${i}\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\r
\u26A0\uFE0F \u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0645\u0646\u064A\u0629: \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0630\u0647 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643 \u0639\u0646\u062F \u0623\u0648\u0644 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.\r
\r
\u0645\u0639 \u062A\u062D\u064A\u0627\u062A\u060C\r
\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP HSE)`,o=encodeURIComponent(`\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0633\u0627\u0628\u0643 \u0641\u064A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 - ${t.name||""}`),l=encodeURIComponent(s),d=`mailto:${encodeURIComponent(t.email)}?subject=${o}&body=${l}`,r=document.createElement("div");r.id="user-credentials-modal-overlay",r.className="modal-overlay animate-fade-in",r.style.zIndex="9999",r.style.backdropFilter="blur(8px)",r.innerHTML=`
            <div class="modal-content animate-scale-up" style="max-width: 580px; width: 95%; border-radius: 20px; padding: 0; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);">
                <div style="background: linear-gradient(135deg, #003865 0%, #1d4ed8 50%, #005696 100%); padding: 28px 24px; text-align: center; color: white; position: relative; border-bottom: 3px solid #FFC72C;">
                    <button type="button" class="modal-close text-white opacity-80 hover:opacity-100" onclick="document.getElementById('user-credentials-modal-overlay')?.remove()" style="position: absolute; left: 16px; top: 16px; background: rgba(255,255,255,0.15); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                    <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                        <i class="fas fa-user-check text-3xl text-amber-300"></i>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 800; margin: 0 0 6px; color: #ffffff;">\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D!</h3>
                    <p style="font-size: 13px; opacity: 0.9; margin: 0; color: #e2e8f0;">\u062C\u0627\u0647\u0632 \u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</p>
                </div>

                <div style="padding: 24px; background: #ffffff;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-user ml-1 text-blue-600"></i> \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</span>
                            <strong style="font-size: 14px; color: #1e293b;">${Utils.escapeHTML(t.name||"")}</strong>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-envelope ml-1 text-blue-600"></i> \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code style="font-size: 13px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 6px; direction: ltr;">${Utils.escapeHTML(t.email||"")}</code>
                                <button type="button" data-copy="email" title="\u0646\u0633\u062E \u0627\u0644\u0628\u0631\u064A\u062F" style="background: #e2e8f0; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-key ml-1 text-amber-600"></i> \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code id="cred-modal-pass-text" style="font-size: 15px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; direction: ltr;">${Utils.escapeHTML(t.password||"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")}</code>
                                <button type="button" data-copy="password" title="\u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" style="background: #d1fae5; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #047857;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-user-shield ml-1 text-purple-600"></i> \u0627\u0644\u062F\u0648\u0631 \u0648\u0627\u0644\u0642\u0633\u0645</span>
                            <span style="font-size: 12px; font-weight: 700; color: #334155; background: #f1f5f9; padding: 3px 10px; border-radius: 20px;">${Utils.escapeHTML(n)} - ${Utils.escapeHTML(t.department||"")}</span>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-link ml-1 text-blue-600"></i> \u0631\u0627\u0628\u0637 \u0627\u0644\u0646\u0638\u0627\u0645</span>
                            <a href="${i}" target="_blank" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: underline; direction: ltr;">${i}</a>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                        <button type="button" id="copy-all-creds-btn" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: linear-gradient(135deg, #003865, #005696); border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; border: none;">
                            <i class="fas fa-copy"></i>
                            \u0646\u0633\u062E \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628
                        </button>
                        <a href="${d}" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; text-align: center;">
                            <i class="fas fa-envelope"></i>
                            \u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064A\u062F
                        </a>
                    </div>

                    <button type="button" onclick="document.getElementById('user-credentials-modal-overlay')?.remove()" style="width: 100%; padding: 10px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 13px;">
                        <i class="fas fa-check ml-1"></i> \u062A\u0645 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,document.body.appendChild(r),r.addEventListener("click",p=>{p.target===r&&r.remove()});const f=r.querySelector("#copy-all-creds-btn");f&&f.addEventListener("click",()=>{navigator.clipboard.writeText(s).then(()=>{Notification.success("\u062A\u0645 \u0646\u0633\u062E \u0643\u0627\u0641\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D!")}).catch(()=>{Notification.error("\u062A\u0639\u0630\u0631 \u0646\u0633\u062E \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B")})}),r.querySelectorAll("[data-copy]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-copy"),c=String(m==="password"?t.password||"":t.email||""),g=m==="password"?"\u062A\u0645 \u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631":"\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A";navigator.clipboard.writeText(c).then(()=>{Notification.success(g)}).catch(()=>{})})})},_photoFailKey(t){return`hse_user_photo_failed_${String(t||"").trim()}`},_getDriveIdFromUrl(t){try{const e=String(t||"").trim();if(!e)return"";const a=e.match(/[?&]id=([^&]+)/)||e.match(/\/file\/d\/([^/]+)/);return a?String(a[1]||"").trim():""}catch{return""}},_normalizeUserPhotoUrl(t,e=""){try{const a=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(t)||"").trim():String(t||"").trim();if(!a)return"";let n=a;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?n=Utils.normalizeImageSource(a)||a:a.startsWith("data:image/")?n=a:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(n=window.__convertGoogleDriveUrl(a)||a);const s=this._getDriveIdFromUrl(n)||e||n,o=sessionStorage.getItem(this._photoFailKey(s));if(o){const l=parseInt(o,10),d=Date.now(),r=300*1e3;if(d-l<r)return"";sessionStorage.removeItem(this._photoFailKey(s))}return n}catch{return""}},_setupUserPhotoFallbacks(t){try{const a=(t||document).querySelectorAll('img[data-user-photo="1"]');if(!a||a.length===0)return;a.forEach(n=>{if(!n||n.dataset._fallbackBound==="1")return;n.dataset._fallbackBound="1";const i=(n.dataset.photoKey||"").trim(),s=n.src;if(n.addEventListener("error",()=>{try{i&&sessionStorage.setItem(this._photoFailKey(i),Date.now().toString())}catch{}requestAnimationFrame(()=>{try{const o=document.createElement("div");o.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",o.title="\u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629",o.innerHTML='<i class="fas fa-user text-gray-400"></i>',n.replaceWith(o)}catch{}})},{passive:!0}),i&&n.src){const o=sessionStorage.getItem(this._photoFailKey(i));if(o){const l=parseInt(o,10),d=Date.now(),r=300*1e3;d-l>=r&&(sessionStorage.removeItem(this._photoFailKey(i)),n.src=s+(s.includes("?")?"&":"?")+"retry="+Date.now())}}})}catch{}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const t=document.getElementById("users-section");if(!t)return;if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){t.innerHTML=`
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
                    <div class="flex items-center gap-2">
                        <button id="link-existing-users-btn" class="btn-secondary" onclick="Users.linkExistingUsersToEmployees()" style="background: #0284c7; color: white; border: none; border-radius: 8px; padding: 8px 14px; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-link" aria-hidden="true"></i>
                            \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                        </button>
                        <button id="add-user-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2" aria-hidden="true"></i>
                            ${this.t("module.users.addNewUser","\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F")}
                        </button>
                    </div>
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
                `,this.applyModuleI18n(t))}},async showList(){typeof Loading<"u"&&Loading.hide&&Loading.hide(),this.currentView="list";const t=document.getElementById("user-form-modal-overlay");t&&t.remove(),document.getElementById("users-table-container")?await this.loadUsersList():document.getElementById("users-section")&&await this.load()},computeUsersAdminStats(t){const e=Array.isArray(t)?t:[],a=Date.now(),n=1440*60*1e3;let i=0,s=0,o=0,l=0,d=0,r=0,f=0,p=0,m=0;return e.forEach(c=>{if(!c||typeof c!="object")return;const g=c.active!==!1;g?i+=1:s+=1,c.isOnline===!0&&(o+=1);const h=String(c.role||"").toLowerCase();h==="admin"&&(l+=1),h==="safety_officer"&&(d+=1);try{(typeof Auth<"u"&&typeof Auth._isMfaEnabledForUser=="function"&&Auth._isMfaEnabledForUser(c)||c.mfaEnabled===!0||c.mfa===!0||c.totpEnabled===!0)&&(r+=1)}catch{}if((c.employeeCode||c.employeeId||c.linkedEmployeeId)&&(f+=1),!c.lastLogin)p+=1;else{const v=new Date(c.lastLogin).getTime();Number.isFinite(v)&&g&&a-v>30*n&&(m+=1)}}),{total:e.length,active:i,inactive:s,online:o,admins:l,safety:d,mfa:r,linked:f,neverLogin:p,stale30:m}},ensureUsersAdminStatsStyles(){const t="users-admin-stats-styles-v1";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
            #users-admin-stats {
                --uas-navy: #003865;
                --uas-gold: #c9a227;
                --uas-slate: #0f172a;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
                gap: 0.85rem;
                margin-bottom: 1.25rem;
                align-items: stretch;
            }
            #users-admin-stats .uas-card {
                --uas-accent: var(--uas-navy);
                --uas-accent-soft: #e8f1f8;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                gap: 0.55rem;
                min-height: 118px;
                padding: 1rem 1.05rem 0.95rem;
                border-radius: 14px;
                background: linear-gradient(155deg, #ffffff 0%, var(--uas-accent-soft) 125%);
                border: 1px solid color-mix(in srgb, var(--uas-accent) 16%, #e2e8f0);
                box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 20px rgba(15, 23, 42, 0.035);
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            #users-admin-stats .uas-card::after {
                content: '';
                position: absolute;
                inset-inline-start: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background: linear-gradient(180deg, var(--uas-accent), color-mix(in srgb, var(--uas-accent) 40%, #fff));
                border-radius: 14px 0 0 14px;
            }
            [dir="rtl"] #users-admin-stats .uas-card::after {
                border-radius: 0 14px 14px 0;
            }
            #users-admin-stats .uas-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07), 0 12px 28px rgba(15, 23, 42, 0.05);
                border-color: color-mix(in srgb, var(--uas-accent) 28%, #e2e8f0);
            }
            #users-admin-stats .uas-card__top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 0.5rem;
                position: relative;
                z-index: 1;
            }
            #users-admin-stats .uas-card__icon {
                width: 38px;
                height: 38px;
                border-radius: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background: color-mix(in srgb, var(--uas-accent) 12%, #fff);
                color: var(--uas-accent);
                font-size: 0.95rem;
                box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--uas-accent) 14%, transparent);
            }
            #users-admin-stats .uas-card__label {
                margin: 0;
                font-size: 0.78rem;
                font-weight: 700;
                color: #334155;
                line-height: 1.35;
            }
            #users-admin-stats .uas-card__hint {
                margin: 0.15rem 0 0;
                font-size: 0.68rem;
                color: #64748b;
                line-height: 1.4;
            }
            #users-admin-stats .uas-card__value {
                position: relative;
                z-index: 1;
                margin-top: auto;
                font-size: 1.7rem;
                font-weight: 800;
                letter-spacing: -0.03em;
                line-height: 1;
                color: var(--uas-accent);
                font-variant-numeric: tabular-nums;
            }
            #users-admin-stats .uas-card__foot {
                position: relative;
                z-index: 1;
                font-size: 0.68rem;
                color: #64748b;
                font-weight: 600;
            }
            #users-admin-stats .uas-card--total { --uas-accent: #003865; --uas-accent-soft: #e8f1f8; }
            #users-admin-stats .uas-card--active { --uas-accent: #0f766e; --uas-accent-soft: #ecfdf8; }
            #users-admin-stats .uas-card--online { --uas-accent: #15803d; --uas-accent-soft: #f0fdf4; }
            #users-admin-stats .uas-card--admin { --uas-accent: #b45309; --uas-accent-soft: #fffbeb; }
            #users-admin-stats .uas-card--mfa { --uas-accent: #1d4ed8; --uas-accent-soft: #eff6ff; }
            #users-admin-stats .uas-card--linked { --uas-accent: #0369a1; --uas-accent-soft: #f0f9ff; }
            #users-admin-stats .uas-card--never { --uas-accent: #475569; --uas-accent-soft: #f8fafc; }
            #users-admin-stats .uas-card--stale { --uas-accent: #b91c1c; --uas-accent-soft: #fef2f2; }
            @media (max-width: 640px) {
                #users-admin-stats {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
                #users-admin-stats .uas-card__value { font-size: 1.45rem; }
            }
        `,document.head.appendChild(e)},renderUsersAdminStatsCards(t){this.ensureUsersAdminStatsStyles();const e=t||this.computeUsersAdminStats(AppState.appData?.users||[]),a=e.inactive?`${e.inactive} ${this.t("module.users.stats.inactive","\u063A\u064A\u0631 \u0646\u0634\u0637")}`:this.t("module.users.stats.allActiveHint","\u0644\u0627 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0637\u0651\u0644\u0629"),n=[{key:"total",cls:"uas-card--total",icon:"fa-users",label:this.t("module.users.stats.total","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A"),hint:this.t("module.users.stats.totalHint","\u0643\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u064A\u0646"),value:e.total,foot:a},{key:"active",cls:"uas-card--active",icon:"fa-user-check",label:this.t("module.users.stats.active","\u062D\u0633\u0627\u0628\u0627\u062A \u0646\u0634\u0637\u0629"),hint:this.t("module.users.stats.activeHint","\u0645\u0633\u0645\u0648\u062D \u0644\u0647\u0627 \u0628\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"),value:e.active,foot:`${e.total?Math.round(e.active/Math.max(e.total,1)*100):0}% ${this.t("module.users.stats.ofTotal","\u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A")}`},{key:"online",cls:"uas-card--online",icon:"fa-signal",label:this.t("module.users.stats.online","\u0645\u062A\u0635\u0644 \u0627\u0644\u0622\u0646"),hint:this.t("module.users.stats.onlineHint","\u062C\u0644\u0633\u0627\u062A \u0646\u0634\u0637\u0629 \u062D\u0627\u0644\u064A\u0627\u064B"),value:e.online,foot:this.t("module.users.stats.liveHint","\u064A\u062A\u062D\u062F\u0651\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B")},{key:"admins",cls:"uas-card--admin",icon:"fa-user-shield",label:this.t("module.users.stats.admins","\u0645\u062F\u0631\u0627\u0621 \u0627\u0644\u0646\u0638\u0627\u0645"),hint:this.t("module.users.stats.adminsHint","\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0625\u062F\u0627\u0631\u064A\u0629 \u0643\u0627\u0645\u0644\u0629"),value:e.admins,foot:`${e.safety} ${this.t("module.users.stats.safetyOfficers","\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629")}`},{key:"mfa",cls:"uas-card--mfa",icon:"fa-shield-halved",label:this.t("module.users.stats.mfa","\u0645\u0635\u0627\u062F\u0642\u0629 \u062B\u0646\u0627\u0626\u064A\u0629 MFA"),hint:this.t("module.users.stats.mfaHint","\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062D\u0645\u064A\u0629 \u0628\u062E\u0637\u0648\u0629 \u062B\u0627\u0646\u064A\u0629"),value:e.mfa,foot:e.total?`${Math.round(e.mfa/Math.max(e.total,1)*100)}% ${this.t("module.users.stats.coverage","\u062A\u063A\u0637\u064A\u0629")}`:this.t("module.users.stats.noUsers","\u0644\u0627 \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646")},{key:"linked",cls:"uas-card--linked",icon:"fa-id-badge",label:this.t("module.users.stats.linked","\u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0648\u0638\u0641"),hint:this.t("module.users.stats.linkedHint","\u062D\u0633\u0627\u0628 \u0645\u0631\u0628\u0648\u0637 \u0628\u0633\u062C\u0644 \u0645\u0648\u0638\u0641\u064A\u0646"),value:e.linked,foot:`${Math.max(0,e.total-e.linked)} ${this.t("module.users.stats.unlinked","\u063A\u064A\u0631 \u0645\u0631\u0628\u0648\u0637")}`},{key:"never",cls:"uas-card--never",icon:"fa-user-clock",label:this.t("module.users.stats.neverLogin","\u0644\u0645 \u064A\u0633\u062C\u0651\u0644\u0648\u0627 \u062F\u062E\u0648\u0644\u0627\u064B"),hint:this.t("module.users.stats.neverLoginHint","\u062D\u0633\u0627\u0628\u0627\u062A \u0628\u0644\u0627 \u0622\u062E\u0631 \u062F\u062E\u0648\u0644"),value:e.neverLogin,foot:this.t("module.users.stats.reviewHint","\u0645\u0631\u0627\u062C\u0639\u0629 \u062F\u0639\u0648\u0627\u062A/\u062A\u0641\u0639\u064A\u0644")},{key:"stale",cls:"uas-card--stale",icon:"fa-triangle-exclamation",label:this.t("module.users.stats.stale","\u062E\u0645\u0648\u0644 +30 \u064A\u0648\u0645\u0627\u064B"),hint:this.t("module.users.stats.staleHint","\u0646\u0634\u0637 \u0644\u0643\u0646 \u0628\u062F\u0648\u0646 \u062F\u062E\u0648\u0644 \u062D\u062F\u064A\u062B"),value:e.stale30,foot:this.t("module.users.stats.staleFoot","\u0642\u062F \u064A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A")}];return`
            <div id="users-admin-stats" class="users-admin-stats" role="region" aria-label="${Utils.escapeHTML(this.t("module.users.stats.region","\u0645\u0644\u062E\u0635 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"))}">
                ${n.map(i=>`
                    <article class="uas-card ${i.cls}" data-uas="${i.key}">
                        <div class="uas-card__top">
                            <div>
                                <p class="uas-card__label">${Utils.escapeHTML(i.label)}</p>
                                <p class="uas-card__hint">${Utils.escapeHTML(i.hint)}</p>
                            </div>
                            <div class="uas-card__icon" aria-hidden="true"><i class="fas ${i.icon}"></i></div>
                        </div>
                        <div class="uas-card__value" data-uas-value="${i.key}">${Number(i.value)||0}</div>
                        <div class="uas-card__foot" data-uas-foot="${i.key}">${Utils.escapeHTML(i.foot)}</div>
                    </article>
                `).join("")}
            </div>
        `},updateUsersAdminStatsCards(t){const e=document.getElementById("users-admin-stats");if(!e||!e.parentElement)return;const n=this.renderUsersAdminStatsCards(this.computeUsersAdminStats(t||AppState.appData?.users||[])),i=document.createElement("div");i.innerHTML=n.trim();const s=i.firstElementChild;s&&(e.replaceWith(s),this.applyModuleI18n(s))},async renderList(){return`
            ${this.renderUsersAdminStatsCards(this.computeUsersAdminStats(AppState.appData?.users||[]))}
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
        `},async renderForm(t=null){const e=!!t;return`
            <form id="user-form" class="space-y-6">
                <!-- ==================== SECTION 1: USER PROFILE & IDENTITY ==================== -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                            <i class="fas fa-id-card"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">1. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0648\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A</h4>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                        <!-- Photo Upload Block -->
                        <div style="grid-column: 1 / -1; display: flex; align-items: center; gap: 16px; background: #ffffff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1;">
                            <div style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #3b82f6; overflow: hidden; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <img id="user-photo-preview" src="${t?.photo||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" style="width: 100%; height: 100%; object-fit: cover; display: ${t?.photo?"block":"none"};">
                                <i id="user-photo-icon" class="fas fa-user text-2xl text-gray-400" style="display: ${t?.photo?"none":"block"}"></i>
                            </div>
                            <div style="flex: 1;">
                                <label for="user-photo-input" style="display: block; font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">
                                    <i class="fas fa-camera ml-1 text-blue-600"></i> \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A
                                </label>
                                <input 
                                    type="file" 
                                    id="user-photo-input" 
                                    accept="image/*"
                                    class="form-input"
                                    style="padding: 6px 10px; font-size: 12px; height: auto;"
                                >
                                <p style="margin: 4px 0 0; font-size: 11px; color: #64748b;">\u0645\u0648\u0635\u0649 \u0628\u0647\u0627: \u0635\u0648\u0631\u0629 \u0645\u0631\u0628\u0639\u0629 \u0628\u062D\u062C\u0645 \u0623\u0642\u0635\u0649 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A (PNG / JPG)</p>
                            </div>
                        </div>

                        <!-- Full Name -->
                        <div>
                            <label for="user-name" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user ml-1 text-blue-600"></i> \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="user-name" 
                                name="name" 
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(t?.name||"")}"
                                placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="user-email" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-envelope ml-1 text-blue-600"></i> \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="user-email" 
                                name="email" 
                                autocomplete="email"
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(t?.email||"")}"
                                placeholder="example@company.com"
                                ${e?"readonly":""}
                                style="border-radius: 8px; border-color: #cbd5e1; direction: ltr;"
                            >
                        </div>

                        <!-- Department -->
                        <div>
                            <label for="user-department" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-building ml-1 text-blue-600"></i> \u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629 <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="user-department" 
                                name="department" 
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(t?.department||"")}"
                                placeholder="\u0645\u062B\u0627\u0644: \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                        </div>

                        <!-- Employee Code / Linking -->
                        <div>
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                                <label for="user-employee-code" style="font-size: 13px; font-weight: 700; color: #334155; margin: 0;">
                                    <i class="fas fa-id-badge ml-1 text-blue-600"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0631\u0628\u0637 \u0628\u0627\u0644\u0645\u0648\u0638\u0641)
                                </label>
                                <span id="user-emp-link-status" style="font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: ${t?.employeeCode?"#dcfce7":"#f1f5f9"}; color: ${t?.employeeCode?"#166534":"#64748b"};">
                                    ${t?.employeeCode?"\u{1F517} \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0648\u0638\u0641":"\u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637"}
                                </span>
                            </div>
                            <input 
                                type="text" 
                                id="user-employee-code" 
                                name="employeeCode" 
                                list="user-employees-list"
                                class="form-input"
                                value="${Utils.escapeHTML(t?.employeeCode||"")}"
                                placeholder="\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645/\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0623\u0648 \u0627\u0633\u0645\u0647..."
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                            <datalist id="user-employees-list">
                                ${(AppState.appData?.employees||[]).filter(a=>a&&!a.isResigned).map(a=>{const n=a.employeeNumber||a.employeeCode||a.sapId||a.id||a.code||"",i=a.name||a.employeeName||"",s=a.department||a.section||"";return`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(i)} - ${Utils.escapeHTML(s)}</option>`}).join("")}
                            </datalist>
                            <p id="user-emp-link-hint" style="margin: 4px 0 0; font-size: 11px; color: #64748b;">
                                \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0645\u0648\u0638\u0641\u060C \u064A\u062A\u0645 \u0631\u0628\u0637 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A \u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- ==================== SECTION 2: SECURITY & ROLE CONFIGURATION ==================== -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: #fff7ed; color: #ea580c; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">2. \u0627\u0644\u0623\u0645\u0627\u0646 \u0648\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</h4>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">\u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0631 \u0648\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0648\u062D\u0627\u0644\u0629 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                        <!-- Password & Auto-generator -->
                        <div style="grid-column: 1 / -1;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                                <label for="user-password" style="font-size: 13px; font-weight: 700; color: #334155; margin: 0;">
                                    <i class="fas fa-key ml-1 text-amber-500"></i> \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 ${e?"":'<span style="color: #ef4444;">*</span>'}
                                </label>
                                ${e?`
                                    <label style="font-size: 12px; font-weight: 700; color: #2563eb; cursor: pointer; display: flex; align-items: center; gap: 6px; background: #eff6ff; padding: 4px 10px; border-radius: 6px; border: 1px solid #bfdbfe;">
                                        <input type="checkbox" id="change-password-toggle" style="width: 15px; height: 15px; accent-color: #2563eb; cursor: pointer;">
                                        \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645
                                    </label>
                                `:""}
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="position: relative; flex: 1;">
                                    <input 
                                        type="password" 
                                        id="user-password" 
                                        name="password" 
                                        autocomplete="off"
                                        ${e?'disabled placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0645\u062D\u0645\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B (\u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631 \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u062A\u063A\u064A\u064A\u0631)"':'required placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"'}
                                        class="form-input"
                                        style="direction: ltr; padding-left: 40px; border-radius: 8px; border-color: #cbd5e1; background: ${e?"#f8fafc":"#ffffff"};"
                                    >
                                    <button 
                                        type="button" 
                                        id="toggle-password-visibility-btn"
                                        style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px;"
                                        title="\u0625\u0638\u0647\u0627\u0631 / \u0625\u062E\u0641\u0627\u0621 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <button 
                                    type="button" 
                                    id="generate-password-btn" 
                                    ${e?'disabled style="display: none;"':""}
                                    style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; border: none; border-radius: 8px; padding: 10px 16px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 4px rgba(217, 119, 6, 0.2);"
                                    title="\u062A\u0648\u0644\u064A\u062F \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0642\u0648\u064A\u0629 \u0648\u062D\u0641\u0638\u0647\u0627"
                                >
                                    <i class="fas fa-wand-magic-sparkles"></i>
                                    \u062A\u0648\u0644\u064A\u062F \u0643\u0644\u0645\u0629 \u0633\u0631
                                </button>
                            </div>
                            <div id="generated-pass-notice" class="hidden" style="margin-top: 6px; font-size: 12px; font-weight: 700; color: #059669; display: flex; align-items: center; gap: 4px;">
                                <i class="fas fa-check-circle"></i> \u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0642\u0648\u064A\u0629 \u0648\u062A\u0637\u0628\u064A\u0642\u0647\u0627 \u0628\u0646\u062C\u0627\u062D!
                            </div>
                        </div>

                        <!-- Role Selector -->
                        <div>
                            <label for="user-role" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-tag ml-1 text-blue-600"></i> \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A <span style="color: #ef4444;">*</span>
                            </label>
                            <select id="user-role" name="role" required class="form-input" style="border-radius: 8px; border-color: #cbd5e1; font-weight: 600;">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A...</option>
                                <option value="admin" ${t?.role==="admin"?"selected":""}>\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (System Administrator)</option>
                                <option value="safety_officer" ${t?.role==="safety_officer"?"selected":""}>\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Officer)</option>
                                <option value="user" ${t?.role==="user"?"selected":""}>\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A (Regular User)</option>
                                <option value="read_only" ${t?.role==="read_only"?"selected":""}>\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 (Read Only)</option>
                            </select>
                        </div>

                        <!-- Account Status Switch -->
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-toggle-on ml-1 text-emerald-600"></i> \u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; background: #ffffff; padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer;">
                                <input 
                                    type="checkbox" 
                                    id="user-active" 
                                    name="active"
                                    style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer;"
                                    ${t?.active!==!1?"checked":""}
                                >
                                <span style="font-size: 13px; font-weight: 700; color: #1e293b;">\u062D\u0633\u0627\u0628 \u0646\u0634\u0637 (\u064A\u0645\u0643\u0646\u0647 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- ==================== SECTION 3: MODULE PERMISSIONS MATRIX ==================== -->
                <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                                <i class="fas fa-user-lock"></i>
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">3. \u0645\u0635\u0641\u0648\u0641\u0629 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A</h4>
                                <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645</p>
                            </div>
                        </div>

                        <div id="permissions-action-btns" style="display: flex; gap: 8px;">
                            <button type="button" id="select-all-permissions-btn" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                                <i class="fas fa-check-double"></i> \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644
                            </button>
                            <button type="button" id="deselect-all-permissions-btn" style="background: #f8fafc; color: #64748b; border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                                <i class="fas fa-times"></i> \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0643\u0644
                            </button>
                        </div>
                    </div>

                    <!-- Admin Info Banner -->
                    <div id="admin-permissions-banner" style="display: ${t?.role==="admin"?"flex":"none"}; align-items: center; gap: 10px; background: #eff6ff; border: 1px solid #93c5fd; border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; color: #1e40af;">
                        <i class="fas fa-shield-halved text-xl text-blue-600"></i>
                        <span style="font-size: 13px; font-weight: 700;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0645\u062A\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0643\u0627\u0641\u0629 \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0644\u062E\u0635\u0627\u0626\u0635 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.</span>
                    </div>

                    <!-- Modules Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;" id="modules-permissions-container">
                        ${MODULE_PERMISSIONS_CONFIG.map(a=>{const n=t?.permissions&&t.permissions[a.key]===!0,s=(document.getElementById("user-role")?.value||t?.role)==="admin"||t?.role==="admin",o=a.hasDetailedPermissions&&MODULE_DETAILED_PERMISSIONS[a.key];return`
                                <div class="module-perm-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                    <label style="display: flex; align-items: center; gap: 8px; flex: 1; cursor: ${s?"not-allowed":"pointer"}; margin: 0;">
                                        <input 
                                            type="checkbox" 
                                            class="user-permission-checkbox" 
                                            data-module="${a.key}"
                                            ${n||s?"checked":""}
                                            ${s?"disabled":""}
                                            style="width: 16px; height: 16px; accent-color: #2563eb; cursor: ${s?"not-allowed":"pointer"};"
                                        >
                                        <i class="fas ${a.icon}" style="color: #64748b; font-size: 14px; width: 16px; text-align: center;"></i>
                                        <span style="font-size: 13px; font-weight: 700; color: #1e293b; flex: 1;">${a.label}</span>
                                    </label>
                                    ${o?`
                                        <button 
                                            type="button" 
                                            class="detailed-perm-btn"
                                            data-action="show-detailed-permissions" 
                                            data-module="${a.key}"
                                            title="\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0640 ${a.label}"
                                            style="background: #e0e7ff; color: #4338ca; border: none; border-radius: 6px; padding: 4px 8px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s; white-space: nowrap;"
                                        >
                                            <i class="fas fa-sliders text-xs"></i> \u062A\u062E\u0635\u064A\u0635
                                        </button>
                                    `:""}
                                </div>
                            `}).join("")}
                    </div>
                </div>

                <!-- Modal Actions Footer -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding-top: 16px; margin-top: 8px; border-top: 1px solid #e2e8f0;">
                    <button type="button" id="cancel-user-btn" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;">
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #003865 0%, #005696 100%); color: white; border: none; border-radius: 10px; padding: 10px 24px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 12px rgba(0, 56, 101, 0.2); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-save"></i>
                        ${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"}
                    </button>
                </div>
            </form>
        `},async loadUsersList(){const t=document.getElementById("users-table-container");if(!t)return;let e=AppState.appData.users||[];if(e.length===0&&typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncUsers=="function")try{t.innerHTML=`
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645...</p>
                        </div>
                    `,await GoogleIntegration.syncUsers(!0),e=AppState.appData.users||[]}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",i)}if(e.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                    <button id="add-user-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `,this.applyModuleI18n(t),this.updateUsersAdminStatsCards([]);return}const a=`
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
                        ${e.map(i=>{const s=i.isOnline===!0,o=i.lastLogin?Utils.formatDateTime(i.lastLogin):"-";return`
                            <tr>
                                <td>
                                    <div class="flex items-center gap-3">
                                        ${(()=>{const d=(this._getDriveIdFromUrl(i.photo||"")||i.id||i.email||i.name||"").toString(),r=this._normalizeUserPhotoUrl(i.photo,i.id);if(!r)return'<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>';const f=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r,displaySrc:r,needsProxy:!1,proxyFileId:""},p=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";return`<img data-user-photo="1" data-photo-key="${Utils.escapeHTML(d)}" src="${Utils.escapeHTML(f.displaySrc)}" alt="${Utils.escapeHTML(i.name||"")}"${p} class="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`})()}
                                        <div class="flex flex-col">
                                            <span class="font-semibold text-gray-800">${Utils.escapeHTML(i.name||"")}</span>
                                            ${i.employeeCode?`<span class="text-xs text-blue-600 font-mono" title="\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0645\u0631\u062A\u0628\u0637"><i class="fas fa-id-badge ml-1"></i> \u0643\u0648\u062F: ${Utils.escapeHTML(i.employeeCode)}</span>`:""}
                                        </div>
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
                                        <div class="w-3 h-3 rounded-full ${s?"bg-green-500":"bg-gray-400"}" style="animation: ${s?"pulse 2s infinite":"none"};"></div>
                                        <span class="text-sm ${s?"text-green-600":"text-gray-500"}">
                                            ${s?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="text-sm text-gray-600" title="${i.lastLogin||"-"}">
                                        ${o}
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
        `;t.innerHTML=a,this.applyModuleI18n(t),this.updateUsersAdminStatsCards(e);const n=()=>{this._setupUserPhotoFallbacks(t),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(t,{onFetchFail:i=>{try{const s=(i.dataset.photoKey||"").trim();s&&sessionStorage.setItem(this._photoFailKey(s),Date.now().toString())}catch{}try{const s=document.createElement("div");s.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",s.innerHTML='<i class="fas fa-user text-gray-400"></i>',i.replaceWith(s)}catch{}}})};typeof requestIdleCallback=="function"?requestIdleCallback(()=>n(),{timeout:600}):setTimeout(()=>n(),0)},getRoleName(t){return{admin:"\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",safety_officer:"\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",user:"\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A",read_only:"\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637"}[t]||t},getRoleBadgeClass(t){return{admin:"danger",safety_officer:"warning",user:"info",read_only:"secondary"}[t]||"secondary"},setupEventListeners(){setTimeout(()=>{const t=document.getElementById("add-user-btn"),e=document.getElementById("add-user-empty-btn");t&&t.addEventListener("click",()=>this.showForm()),e&&e.addEventListener("click",()=>this.showForm());const a=document.getElementById("import-excel-btn");a&&a.addEventListener("click",()=>this.showImportExcel());const n=document.getElementById("users-search"),i=document.getElementById("users-filter-role");n&&n.addEventListener("input",l=>this.filterUsers(l.target.value,i?.value)),i&&i.addEventListener("change",l=>this.filterUsers(n?.value,l.target.value));const s=document.getElementById("user-form");s&&s.addEventListener("submit",l=>this.handleSubmit(l));const o=document.getElementById("cancel-user-btn");o&&o.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async showForm(t=null){Utils.safeLog("\u{1F527} \u0639\u0631\u0636 \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645 (Modal):",t?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F"),this.currentEditId=t?.id||null,this.currentDetailedPermissions={};let e=null;if(t&&t.permissions){let o;try{if(typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function")o=Permissions.normalizePermissions(t.permissions);else if(typeof t.permissions=="string"){const d=t.permissions.trim();if(d.startsWith("{")||d.startsWith("["))o=JSON.parse(d);else try{const r=d.split(`
`).filter(f=>f.trim());o={},r.forEach(f=>{const p=f.match(/^([^:]+):\s*(.+)$/);if(p){const m=p[1].trim(),c=p[2].trim();c==="true"?o[m]=!0:c==="false"?o[m]=!1:isNaN(c)?o[m]=c:o[m]=Number(c)}})}catch{o={}}}else o=t.permissions}catch{o={}}(!o||typeof o!="object"||Array.isArray(o))&&(o={});const l={};Object.keys(o).forEach(d=>{const r=o[d];d.endsWith("Permissions")&&typeof r=="object"&&!Array.isArray(r)?this.currentDetailedPermissions[d]=r:d.endsWith("Permissions")||(l[d]=r===!0)}),e=l}const a=t?{...t,permissions:e??(t.permissions&&typeof t.permissions=="object"&&!Array.isArray(t.permissions)?t.permissions:{})}:null,n=document.getElementById("user-form-modal-overlay");n&&n.remove();const i=!!t,s=document.createElement("div");s.id="user-form-modal-overlay",s.className="modal-overlay animate-fade-in",s.style.zIndex="9990",s.style.backdropFilter="blur(6px)",s.innerHTML=`
            <div class="modal-content animate-scale-up" style="max-width: 840px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; padding: 0; border-radius: 18px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);">
                <div class="modal-header" style="background: linear-gradient(135deg, #003865 0%, #005696 100%); color: white; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #FFC72C;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(255,255,255,0.15); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #FFC72C;">
                            <i class="fas fa-${i?"user-pen":"user-plus"}"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: white;">
                                ${i?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F \u0644\u0644\u0646\u0638\u0627\u0645"}
                            </h3>
                            <p style="margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">
                                ${i?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0648\u0627\u0644\u062F\u0648\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A":"\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062C\u062F\u064A\u062F \u0648\u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629"}
                            </p>
                        </div>
                    </div>
                    <button type="button" class="modal-close-btn" onclick="document.getElementById('user-form-modal-overlay')?.remove()" style="background: rgba(255,255,255,0.15); border: none; color: white; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 24px; overflow-y: auto; flex: 1; background: #ffffff;">
                    ${await this.renderForm(a)}
                </div>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s),this.setupEventListeners(),setTimeout(()=>{const o=s.querySelector("#generate-password-btn");o&&o.addEventListener("click",()=>{const p=s.querySelector("#user-password");if(p){const m=this.generateRandomPassword(10);p.value=m,p.type="text";const c=s.querySelector("#toggle-password-visibility-btn i");c&&(c.className="fas fa-eye-slash text-amber-600");const g=s.querySelector("#generated-pass-notice");g&&g.classList.remove("hidden"),Notification.success("\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0642\u0648\u064A\u0629")}});const l=s.querySelector("#change-password-toggle");l&&l.addEventListener("change",p=>{const m=s.querySelector("#user-password"),c=s.querySelector("#generate-password-btn");m&&(m.disabled=!p.target.checked,m.style.background=p.target.checked?"#ffffff":"#f8fafc",m.placeholder=p.target.checked?"\u0623\u062F\u062E\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644)":"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0645\u062D\u0645\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B (\u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631 \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u062A\u063A\u064A\u064A\u0631)",p.target.checked||(m.value="")),c&&(c.disabled=!p.target.checked,c.style.display=p.target.checked?"flex":"none")});const d=s.querySelector("#toggle-password-visibility-btn");d&&d.addEventListener("click",()=>{const p=s.querySelector("#user-password");if(p){const m=p.type==="password";p.type=m?"text":"password";const c=d.querySelector("i");c&&(c.className=m?"fas fa-eye-slash text-amber-600":"fas fa-eye text-gray-400")}});const r=s.querySelector("#user-role");r&&r.addEventListener("change",()=>{this.updatePermissionsUI()});const f=s.querySelector("#cancel-user-btn");f&&f.addEventListener("click",()=>s.remove()),this.setupSelectAllButtons(),this.setupDetailedPermissionsButtons(),this.setupEmployeeCodeAutoLookup(),this.updatePermissionsUI()},100)},updatePermissionsUI(){const a=document.getElementById("user-role")?.value==="admin";document.querySelectorAll(".user-permission-checkbox").forEach(o=>{if(a){o.disabled=!0,o.checked=!0;const l=o.closest(".module-perm-card")||o.parentElement;l&&(l.style.opacity="0.75",l.style.cursor="not-allowed")}else{o.disabled=!1;const l=o.closest(".module-perm-card")||o.parentElement;l&&(l.style.opacity="1",l.style.cursor="pointer")}});const i=document.getElementById("admin-permissions-banner");i&&(i.style.display=a?"flex":"none");const s=document.getElementById("permissions-action-btns");s&&(s.style.display=a?"none":"flex")},setupSelectAllButtons(){const t=document.getElementById("select-all-permissions-btn"),e=document.getElementById("deselect-all-permissions-btn");t&&t.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(n=>{n.checked=!0}),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")}),e&&e.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(n=>{n.checked=!1}),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")})},setupDetailedPermissionsButtons(){document.querySelectorAll('[data-action="show-detailed-permissions"]').forEach(e=>{e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=e.getAttribute("data-module");this.showDetailedPermissionsModal(n)})})},showDetailedPermissionsModal(t){const e=MODULE_DETAILED_PERMISSIONS[t];if(!e){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062F\u064A\u0648\u0644");return}const n=(this.currentDetailedPermissions||{})[`${t}Permissions`]||{},i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${e.label}
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
                        ${e.permissions.map(d=>{const r=d.key==="observations-view-department"?n[d.key]!==!1:n[d.key]===!0;return`
                            <label class="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    class="detailed-permission-checkbox rounded border-gray-300 text-blue-600 mr-2" 
                                    data-module="${t}"
                                    data-permission="${d.key}"
                                    ${r?"checked":""}
                                >
                                <i class="fas ${d.icon} ml-2 text-gray-600"></i>
                                <span class="text-sm text-gray-700">${d.label}</span>
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
        `,document.body.appendChild(i),i.addEventListener("click",d=>{d.target===i&&i.remove()});const s=i.querySelector("#select-all-detailed-btn"),o=i.querySelector("#deselect-all-detailed-btn");s&&s.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(r=>r.checked=!0)}),o&&o.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(r=>r.checked=!1)});const l=i.querySelector("#save-detailed-permissions-btn");l&&l.addEventListener("click",()=>{const d=i.querySelectorAll(".detailed-permission-checkbox"),r={};d.forEach(f=>{const p=f.getAttribute("data-permission");r[p]=f.checked}),this.currentDetailedPermissions||(this.currentDetailedPermissions={}),this.currentDetailedPermissions[`${t}Permissions`]=r,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629"),i.remove()})},setupEmployeeCodeAutoLookup(){const t=document.getElementById("user-employee-code"),e=document.getElementById("user-name"),a=document.getElementById("user-department"),n=document.getElementById("user-emp-link-status"),i=document.getElementById("user-emp-link-hint");if(!t)return;const s=()=>{const o=t.value.trim();if(!o){n&&(n.textContent="\u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637",n.style.background="#f1f5f9",n.style.color="#64748b"),i&&(i.innerHTML="\u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0645\u0648\u0638\u0641\u060C \u064A\u062A\u0645 \u0631\u0628\u0637 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A \u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.",i.style.color="#64748b");return}let l=null;if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByTerm=="function")l=EmployeeHelper.findByTerm(o);else if(Array.isArray(AppState.appData?.employees)){const d=o.toLowerCase();l=AppState.appData.employees.find(r=>{if(!r)return!1;const f=String(r.employeeNumber||r.employeeCode||r.sapId||r.id||r.code||"").trim().toLowerCase(),p=String(r.name||r.employeeName||"").trim().toLowerCase();return f===d||p===d})}if(l){const d=this.currentEditId,r=typeof EmployeeHelper<"u"&&typeof EmployeeHelper.getPrimaryCode=="function"?EmployeeHelper.getPrimaryCode(l):l.employeeNumber||l.employeeCode||l.sapId||l.id||l.code||o,f=(AppState.appData?.users||[]).find(c=>{if(!c||c.id===d)return!1;const g=String(c.employeeCode||c.employeeNumber||"").trim().toLowerCase();return g&&(g===o.toLowerCase()||g===String(r).toLowerCase())});if(f){n&&(n.textContent="\u26A0\uFE0F \u0643\u0648\u062F \u0645\u0643\u0631\u0631",n.style.background="#fee2e2",n.style.color="#991b1b"),i&&(i.innerHTML=`\u26A0\uFE0F \u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u062D\u0633\u0627\u0628 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631 \u0645\u0633\u0628\u0642\u0627\u064B (${Utils.escapeHTML(f.name||f.email)}).`,i.style.color="#dc2626");return}const p=l.name||l.employeeName||"",m=l.department||l.section||"";if(e&&p&&!e.value.trim()&&(e.value=p,e.setAttribute("data-auto-filled","true")),a&&m&&!a.value.trim()&&(a.value=m,a.setAttribute("data-auto-filled","true")),n&&(n.textContent="\u{1F517} \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0648\u0638\u0641",n.style.background="#dcfce7",n.style.color="#166534"),i){const c=e?e.value.trim():"",g=p&&c&&p!==c;let h=`\u2705 \u062A\u0645 \u0627\u0644\u0631\u0628\u0637 \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641: <strong>${Utils.escapeHTML(p)}</strong> (${Utils.escapeHTML(m||"\u0628\u062F\u0648\u0646 \u0642\u0633\u0645")}).`;g&&(h+=` <button type="button" id="btn-sync-emp-name-inline" style="margin-right: 6px; padding: 2px 8px; border-radius: 6px; background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.2s;"><i class="fas fa-sync-alt ml-1"></i> \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0633\u0645 \u0625\u0644\u0649 "${Utils.escapeHTML(p)}"</button>`),i.innerHTML=h,i.style.color="#16a34a";const v=document.getElementById("btn-sync-emp-name-inline");v&&v.addEventListener("click",w=>{w.preventDefault(),e&&(e.value=p,e.setAttribute("data-auto-filled","false")),a&&m&&(a.value=m),typeof Notification<"u"&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0625\u0644\u0649 "${p}"`),s()})}}else n&&(n.textContent="\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",n.style.background="#fef3c7",n.style.color="#92400e"),i&&(i.innerHTML="\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0645\u0637\u0627\u0628\u0642 \u0644\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.",i.style.color="#d97706")};t.addEventListener("input",s),t.addEventListener("change",s),t.addEventListener("blur",s)},async linkExistingUsersToEmployees(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...");try{typeof EmployeeHelper<"u"&&typeof EmployeeHelper.ensureEmployeesLoaded=="function"&&await EmployeeHelper.ensureEmployeesLoaded();const e=AppState.appData?.users||[],a=AppState.appData?.employees||[];if(!a.length){Loading.hide(),Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}const n=e.filter(r=>r&&!String(r.employeeCode||"").trim()),i=[],s=r=>String(r||"").trim().toLowerCase();if(n.forEach(r=>{const f=s(r.email),p=f.includes("@")?f.split("@")[0]:"",m=s(r.name);let c=null;if(f&&(c=a.find(g=>{const h=s(g.email||g.mail||g["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]);return h&&(h===f||p&&h.split("@")[0]===p)})),!c&&m&&(c=a.find(g=>{const h=s(g.name||g.employeeName);return h&&h===m})),c){const g=typeof EmployeeHelper<"u"&&typeof EmployeeHelper.getPrimaryCode=="function"?EmployeeHelper.getPrimaryCode(c):c.employeeNumber||c.employeeCode||c.sapId||c.id||c.code;g&&i.push({user:r,employee:c,code:String(g).trim(),department:c.department||c.section||r.department||""})}}),Loading.hide(),!i.length){Notification.info("\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0623\u0648 \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0637\u0627\u0628\u0642\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.");return}const o=document.createElement("div");o.className="modal-overlay",o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;",o.innerHTML=`
                <div class="modal-content" style="max-width: 800px; width: 100%; border-radius: 16px; overflow: hidden; background: white; max-height: 90vh; display: flex; flex-direction: column;">
                    <div class="modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin:0; font-size: 1.15rem; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-link"></i> \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                        </h3>
                        <button type="button" class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; border-radius: 50%; width: 32px; height: 32px; cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body" style="padding: 20px; overflow-y: auto; flex: 1;">
                        <p style="margin-top:0; color:#475569; font-size:13px;">
                            \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 <strong>${i.length}</strong> \u062D\u0633\u0627\u0628 \u064A\u0645\u0643\u0646 \u0631\u0628\u0637\u0647\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629. \u062D\u062F\u062F \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062F \u0631\u0628\u0637\u0647\u0627 \u062B\u0645 \u0627\u0636\u063A\u0637 \u062D\u0641\u0638.
                        </p>
                        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                                <thead>
                                    <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; text-align: right;">
                                        <th style="padding: 10px 12px;"><input type="checkbox" id="select-all-matches" checked style="accent-color:#0284c7;"></th>
                                        <th style="padding: 10px 12px;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                                        <th style="padding: 10px 12px;">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</th>
                                        <th style="padding: 10px 12px;">\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u0637\u0627\u0628\u0642</th>
                                        <th style="padding: 10px 12px;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                        <th style="padding: 10px 12px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${i.map((r,f)=>`
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                            <td style="padding: 10px 12px;"><input type="checkbox" class="match-item-cb" data-index="${f}" checked style="accent-color:#0284c7;"></td>
                                            <td style="padding: 10px 12px; font-weight:600; color:#1e293b;">${Utils.escapeHTML(r.user.name||"")}</td>
                                            <td style="padding: 10px 12px; color:#64748b;">${Utils.escapeHTML(r.user.email||"")}</td>
                                            <td style="padding: 10px 12px; color:#0369a1; font-weight:600;">${Utils.escapeHTML(r.employee.name||r.employee.employeeName||"")}</td>
                                            <td style="padding: 10px 12px;"><span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:6px; font-weight:700;">${Utils.escapeHTML(r.code)}</span></td>
                                            <td style="padding: 10px 12px; color:#475569;">${Utils.escapeHTML(r.department||"-")}</td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px;">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="confirm-link-users-btn" class="btn-primary" style="background:#0284c7;">
                            <i class="fas fa-save ml-2"></i> \u062A\u0623\u0643\u064A\u062F \u0648\u062D\u0641\u0638 \u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u0645\u062D\u062F\u062F
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(o);const l=o.querySelector("#select-all-matches");l&&l.addEventListener("change",r=>{o.querySelectorAll(".match-item-cb").forEach(f=>f.checked=r.target.checked)});const d=o.querySelector("#confirm-link-users-btn");d&&d.addEventListener("click",async()=>{const r=o.querySelectorAll(".match-item-cb:checked");if(!r.length){Notification.warning("\u0644\u0645 \u062A\u0642\u0645 \u0628\u062A\u062D\u062F\u064A\u062F \u0623\u064A \u062D\u0633\u0627\u0628 \u0644\u0644\u0631\u0628\u0637");return}typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0631\u0628\u0637 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A..."),d.disabled=!0;let f=0;r.forEach(p=>{const m=parseInt(p.getAttribute("data-index"),10),c=i[m];if(c){const g=(AppState.appData?.users||[]).findIndex(h=>h.id===c.user.id);g!==-1&&(AppState.appData.users[g]={...AppState.appData.users[g],employeeCode:c.code,department:c.department||AppState.appData.users[g].department},f++)}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Users",AppState.appData.users).catch(p=>Utils.safeWarn("autoSave Users:",p)),Loading.hide(),o.remove(),Notification.success(`\u062A\u0645 \u0631\u0628\u0637 ${f} \u062D\u0633\u0627\u0628\u0627\u064B \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D \u0648\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`),this.showList()})}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A: "+(e.message||String(e)))}},async handleSubmit(t){t.preventDefault();const e=t.target?.querySelector('button[type="submit"]')||document.querySelector('#user-form button[type="submit"]');if(e&&e.disabled)return;let a="";if(e&&(a=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'),Loading.show(),!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Loading.hide(),Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),e&&(e.disabled=!1,e.innerHTML=a);return}const i=this.currentEditId?AppState.appData.users.find(b=>String(b.id).trim()===String(this.currentEditId).trim()):null;let s=i?.photo||"";const o=document.getElementById("user-photo-input");if(o&&o.files.length>0){const b=o.files[0];if(b.size>2097152){Loading.hide(),Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),e&&(e.disabled=!1,e.innerHTML=a);return}s=await this.convertImageToBase64(b)}const l=document.getElementById("user-password"),d=l?l.value:"",r=d?d.trim():"",f=i?.passwordHash||(Utils.isSha256Hex(i?.password)?i?.password:""),p=i?.password&&i.password!==""?i.password:"***",m=document.getElementById("user-name"),c=document.getElementById("user-email"),g=document.getElementById("user-role"),h=document.getElementById("user-department"),v=document.getElementById("user-active");if(!m||!c||!g||!h||!v){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),e&&(e.disabled=!1,e.innerHTML=a);return}const w=document.getElementById("user-employee-code"),C=w?w.value.trim():"",E=typeof this.collectPermissions=="function"?this.collectPermissions():{},u={id:this.currentEditId||Utils.generateId("USER"),name:m.value.trim(),email:c.value.trim().toLowerCase(),role:g.value,department:h.value.trim(),employeeCode:C,active:v.checked,photo:s,permissions:E&&typeof E=="object"?E:{},createdAt:this.currentEditId?AppState.appData.users.find(b=>String(b.id).trim()===String(this.currentEditId).trim())?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),lastLogin:i?.lastLogin||null,lastLogout:i?.lastLogout||null,isOnline:i?.isOnline||!1,loginHistory:i?.loginHistory||[]};if(!u.name||!u.email||!u.role||!u.department){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),e&&(e.disabled=!1,e.innerHTML=a);return}if(!Utils.isValidEmail(u.email)){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0635\u062D\u064A\u062D"),e&&(e.disabled=!1,e.innerHTML=a);return}const $=!this.currentEditId,M=document.getElementById("change-password-toggle"),k=($||!!(M&&M.checked))&&r.length>0,U=this.currentEditId?AppState.appData.users.find(b=>String(b.id).trim()===String(this.currentEditId).trim()):null;let L=(b=>!!(b&&b!=="***"&&typeof Utils<"u"&&Utils.isSha256Hex&&Utils.isSha256Hex(b)))(U?.passwordHash)?U.passwordHash:"",A=U?.forcePasswordChange??!1,I=U?.passwordChanged??!1;if($){if(!k){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"),e&&(e.disabled=!1,e.innerHTML=a);return}if(r.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}L=await Utils.hashPassword(r),A=!0,I=!1}else if(k){if(r.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}L=await Utils.hashPassword(r),A=!0,I=!1}if(u.password="***",L?u.passwordHash=L:delete u.passwordHash,u.forcePasswordChange=A,u.passwordChanged=I,AppState.appData.users.find(b=>(b.email||"").toLowerCase()===u.email&&String(b.id).trim()!==String(u.id).trim())){Loading.hide(),Notification.error("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}try{const b=!this.currentEditId;if(b){if(AppState.appData.users.push(u),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(y){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",y)}Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("addUser",u,3).then(y=>{y&&y.success?(Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062C\u062F\u064A\u062F \u0625\u0644\u0649 Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):y&&y.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",y?.message),typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Users",AppState.appData.users),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",y?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(y=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",y),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}else{const y=AppState.appData.users.findIndex(x=>String(x.id).trim()===String(this.currentEditId).trim());if(y!==-1){const x=AppState.appData.users[y],S=AppState.currentUser&&AppState.currentUser.email&&u.email.toLowerCase()===AppState.currentUser.email.toLowerCase(),P={...u,isOnline:S?!0:u.isOnline};AppState.appData.users[y]={...x,...P}}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("updateUser",{userId:u.id,updateData:u},3).then(x=>{x&&x.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):x&&x.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",x?.message),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(S=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",S)),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",x?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(x=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",x),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(S=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",S)),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}if(AppState.currentUser&&((u.email||"").toLowerCase()===(AppState.currentUser.email||"").toLowerCase()||u.id&&AppState.currentUser.id&&String(u.id).trim()===String(AppState.currentUser.id).trim())){if(AppState.currentUser={...AppState.currentUser,...u,loginTime:AppState.currentUser.loginTime},u.permissions&&typeof u.permissions=="object"){const x=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(u.permissions):u.permissions;AppState.currentUser.permissions=x||{}}else AppState.currentUser.permissions={};let y=!1;typeof window.Auth<"u"&&typeof window.Auth.updateUserSession=="function"?(y=!!window.Auth.updateUserSession(),y&&(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A \u0628\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0643 \u0628\u0646\u062C\u0627\u062D. \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0645\u062A\u0627\u062D\u0629 \u0627\u0644\u0622\u0646 \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C."))):(typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&Permissions.updateNavigation(),Notification.info("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A\u0643. \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A.")),!y&&typeof UI<"u"&&typeof UI.updateUserProfilePhoto=="function"&&UI.updateUserProfilePhoto(),typeof UI<"u"&&AppState.currentSection==="profile"&&typeof UI.renderMyProfileSection=="function"&&Promise.resolve(UI.renderMyProfileSection()).catch(()=>{})}else{const y=AppState.appData.users.find(x=>String(x.id).trim()===String(u.id).trim());y&&y.isOnline===!0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ${y.email} - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629`)}typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&(Permissions.updateNavigation(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0628\u0639\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A"));try{typeof window.RealtimeSyncManager<"u"&&typeof window.RealtimeSyncManager.broadcast=="function"&&(window.RealtimeSyncManager.broadcast("user-permissions-updated","users",{id:u.id,email:u.email,role:u.role,active:u.active,permissions:u.permissions}),window.RealtimeSyncManager.broadcast("sync-request","users"))}catch{}e&&(e.disabled=!1,e.innerHTML=a),document.getElementById("user-form-modal-overlay")?.remove(),(b||k)&&this.showUserCredentialsModal({name:u.name,email:u.email,password:d||r,role:u.role,department:u.department}),this.showList()}catch(b){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",b),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+b.message),e&&(e.disabled=!1,e.innerHTML=a)}},async editUser(t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const a=AppState.appData.users.find(n=>String(n.id).trim()===String(t).trim());a?await this.showForm(a):Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async disableUserMfa(t,e){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u0637\u064A\u0644 MFA");return}const n=(AppState.appData.users||[]).find(s=>s&&(String(s.id).trim()===String(t).trim()||s.email===e));if(!n){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u062A\u0639\u0637\u064A\u0644 MFA",`\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629 \u0627\u0644\u062B\u0646\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${n.name}" (${n.email})\u061F`,"\u062A\u0639\u0637\u064A\u0644","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{const s=await Auth.adminDisableUserMfa(n.email);Loading.hide(),s&&s.success&&this.load()}catch{Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u0639\u0637\u064A\u0644 MFA")}}},async resetUserPassword(t,e){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");return}const n=AppState.appData.users.find(s=>String(s.id).trim()===String(t).trim()||s.email===e);if(!n){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${n.name}" (${n.email})\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0645\u0624\u0642\u062A\u0629 \u062C\u062F\u064A\u062F\u0629.`,"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u0625\u0644\u063A\u0627\u0621"))try{Loading.show();const s=await Auth.resetPassword(n.email);if(Loading.hide(),s&&s.success){const o=s.tempPassword||"\u063A\u064A\u0631 \u0645\u062A\u0627\u062D",l=`
                    <div style="text-align: right; direction: rtl;">
                        <p style="margin-bottom: 10px; font-weight: bold;">\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062C\u0627\u062D!</p>
                        <p style="margin-bottom: 10px;">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 <strong>${Utils.escapeHTML(n.email)}</strong>:</p>
                        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; text-align: center; direction: ltr;">
                            <strong>${Utils.escapeHTML(o)}</strong>
                        </div>
                        <p style="margin-top: 10px; color: #666; font-size: 14px;">
                            \u26A0\uFE0F \u064A\u0631\u062C\u0649 \u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629. \u0633\u064A\u064F\u0637\u0644\u0628 \u0645\u0646\u0647 \u062A\u063A\u064A\u064A\u0631\u0647\u0627 \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.
                        </p>
                    </div>
                `,d=document.createElement("div");d.className="modal-overlay",d.innerHTML=`
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
                            <button class="btn-secondary" onclick="navigator.clipboard.writeText('${o}').then(() => Notification.success('\u062A\u0645 \u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631')).catch(() => {})">
                                <i class="fas fa-copy ml-2"></i>
                                \u0646\u0633\u062E
                            </button>
                        </div>
                    </div>
                `,document.body.appendChild(d),d.addEventListener("click",r=>{r.target===d&&d.remove()}),this.loadUsersList()}else Notification.error(s?.message||"\u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:",s)}},async deleteUser(t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const a=AppState.appData.users.find(s=>s.id===t);if(!a){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(AppState.currentUser&&a.id===AppState.currentUser.id){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062E\u0627\u0635");return}const n=AppState.appData.users.filter(s=>s.role==="admin"&&s.active!==!1);if(a.role==="admin"&&n.length===1){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0622\u062E\u0631 \u0645\u062F\u064A\u0631 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645");return}if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${a.name}" (${a.email})\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{let s=!1;if(AppState.googleConfig.appsScript.enabled)try{const o=await GoogleIntegration.sendToAppsScript("deleteUser",{userId:t});if(s=o&&o.success===!0,!s&&o&&o.message)throw new Error(o.message)}catch(o){const l=AppState.appData.users.filter(d=>d.id!==t);try{await GoogleIntegration.autoSave("Users",l),s=!0}catch(d){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 Google Sheets \u0648\u0628\u062F\u064A\u0644 autoSave:",d),Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(o.message||o)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",o);return}}else await GoogleIntegration.autoSave("Users",AppState.appData.users.filter(o=>o.id!==t)),s=!0;if(!s){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}AppState.appData.users=AppState.appData.users.filter(o=>o.id!==t),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),this.loadUsersList()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s&&s.message?s.message:String(s))),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",s)}}},filterUsers(t="",e=""){let n=AppState.appData.users||[];if(t){const s=t.toLowerCase();n=n.filter(o=>o.name?.toLowerCase().includes(s)||o.email?.toLowerCase().includes(s)||o.department?.toLowerCase().includes(s))}e&&(n=n.filter(s=>s.role===e));const i=document.querySelector("#users-table-container tbody");i&&(n.length===0?i.innerHTML=`
                    <tr>
                        <td colspan="7" class="text-center text-gray-500 py-8">
                            \u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C
                        </td>
                    </tr>
                `:i.innerHTML=n.map(s=>`
                    <tr>
                        <td>${Utils.escapeHTML(s.name||"")}</td>
                        <td>${Utils.escapeHTML(s.email||"")}</td>
                        <td>
                            <span class="badge badge-${this.getRoleBadgeClass(s.role)}">
                                ${this.getRoleName(s.role)}
                            </span>
                        </td>
                        <td>${Utils.escapeHTML(s.department||"")}</td>
                        <td>
                            <span class="badge badge-${s.active!==!1?"success":"danger"}">
                                ${s.active!==!1?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637"}
                            </span>
                        </td>
                        <td>${s.createdAt?Utils.formatDate(s.createdAt):"-"}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick="Users.editUser('${s.id}')" 
                                    class="btn-icon btn-icon-primary"
                                    title="\u062A\u0639\u062F\u064A\u0644"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button 
                                    onclick="Users.deleteUser('${s.id}')" 
                                    class="btn-icon btn-icon-danger"
                                    title="\u062D\u0630\u0641"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join(""))},async showImportExcel(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e);const a=document.getElementById("excel-file-input"),n=document.getElementById("confirm-import-btn");let i=[];(()=>{if(typeof XLSX>"u"){const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",o.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},o.onload=()=>{a.addEventListener("change",l=>{i=[],this.handleExcelFile(l.target.files[0],e,n,d=>{i=d})})},document.head.appendChild(o)}else a.addEventListener("change",o=>{i=[],this.handleExcelFile(o.target.files[0],e,n,l=>{i=l})})})(),n.addEventListener("click",async()=>{if(i.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(i,e)}),e.addEventListener("click",o=>{o.target===e&&e.remove()})},handleExcelFile(t,e,a,n){if(!t)return;const i=new FileReader;i.onload=async s=>{try{Loading.show();const o=new Uint8Array(s.target.result),l=XLSX.read(o,{type:"array"}),d=l.SheetNames[0],r=l.Sheets[d],f=XLSX.utils.sheet_to_json(r);if(f.length===0){Loading.hide(),Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}n&&n(f);const p=document.getElementById("import-preview"),m=document.getElementById("preview-head"),c=document.getElementById("preview-body"),g=document.getElementById("preview-count");if(p&&f.length>0){const h=Object.keys(f[0]);m.innerHTML=`<tr>${h.map(v=>`<th class="px-2 py-1">${Utils.escapeHTML(v)}</th>`).join("")}</tr>`,c.innerHTML=f.slice(0,5).map(v=>`<tr>${h.map(w=>`<td class="px-2 py-1">${Utils.escapeHTML(String(v[w]||""))}</td>`).join("")}</tr>`).join(""),g.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${f.length}`,p.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(o){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+o.message)}},i.readAsArrayBuffer(t)},async processImport(t,e){try{Loading.show();let a=0,n=0;const i=[];for(const s of t)try{const o=s.\u0627\u0644\u0627\u0633\u0645||s.Name||s.name||s.NAME||"",l=s["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||s.Email||s.email||s.EMAIL||"",d=s.\u0627\u0644\u062F\u0648\u0631||s.Role||s.role||s.ROLE||"user",r=s.\u0627\u0644\u0642\u0633\u0645||s.Department||s.department||s.DEPARTMENT||"";if(!o||!l){n++,i.push(`\u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0623\u0648 \u0628\u0631\u064A\u062F: ${JSON.stringify(s)}`);continue}if(!Utils.isValidEmail(l)){n++,i.push(`\u0628\u0631\u064A\u062F \u063A\u064A\u0631 \u0635\u062D\u064A\u062D: ${l}`);continue}if(AppState.appData.users.find(v=>v.email===l.toLowerCase())){n++;continue}const p=Math.random().toString(36).substring(2,10),m=Date.now().toString(36).substring(5,9),c="Temp"+p+m+"!",g=await Utils.hashPassword(c),h={id:Utils.generateId("USER"),name:o.trim(),email:l.toLowerCase().trim(),password:"***",passwordHash:g,role:this.mapRole(d),department:r.trim(),active:!0,permissions:this.mapRole(d)==="admin"?{}:void 0,forcePasswordChange:!0,passwordChanged:!1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.users.push(h),a++}catch{n++}if(a>0&&typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(s){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",s)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),a>0&&await GoogleIntegration.autoSave("Users",AppState.appData.users),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${a} \u0645\u0648\u0638${n>0?` (\u0641\u0634\u0644 ${n})`:""}`),e.remove(),this.loadUsersList()}catch(a){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+a.message)}},mapRole(t){const e=String(t||"").toLowerCase().trim();return e.includes("\u0645\u062F\u064A\u0631")||e.includes("admin")?"admin":e.includes("\u0633\u0644\u0627\u0645\u0629")||e.includes("safety")?"safety_officer":"user"},async convertImageToBase64(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=a,n.readAsDataURL(t)})},collectPermissions(){const t={};return typeof MODULE_PERMISSIONS_CONFIG<"u"&&Array.isArray(MODULE_PERMISSIONS_CONFIG)&&MODULE_PERMISSIONS_CONFIG.forEach(e=>{if(!e.adminOnly){const a=document.querySelector(`.user-permission-checkbox[data-module="${e.key}"]`);a&&!a.disabled&&(t[e.key]=a.checked)}}),this.currentDetailedPermissions&&typeof this.currentDetailedPermissions=="object"&&Object.assign(t,this.currentDetailedPermissions),typeof MODULE_PERMISSIONS_CONFIG<"u"&&MODULE_PERMISSIONS_CONFIG.forEach(e=>{t[e.key]||delete t[`${e.key}Permissions`]}),t},setupPhotoPreview(){const t=document.getElementById("user-photo-input"),e=document.getElementById("user-photo-preview"),a=document.getElementById("user-photo-icon");t&&e&&a&&t.addEventListener("change",n=>{const i=n.target.files[0];if(i){const s=new FileReader;s.onload=o=>{e.src=o.target.result,e.style.display="block",a.style.display="none"},s.readAsDataURL(i)}})},startAutoRefresh(){this.stopAutoRefresh(),this.autoRefreshInterval=setInterval(()=>{const t=document.getElementById("users-section");t&&t.style.display!=="none"&&!t.hidden&&this.refreshUsersTable()},this.refreshInterval),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644")},stopAutoRefresh(){this.autoRefreshInterval&&(clearInterval(this.autoRefreshInterval),this.autoRefreshInterval=null,Utils.safeLog("\u{1F6D1} \u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A"))},refreshUsersTable(){const t=document.getElementById("users-table-container");if(!t)return;const e=t.querySelector("tbody");if(!e){this.loadUsersList();return}const a=AppState.appData.users||[];e.querySelectorAll("tr").forEach(n=>{const i=n.querySelectorAll("td");if(i.length<9)return;const s=i[1]?.textContent?.trim();if(!s)return;const o=a.find(p=>p.email&&p.email.toLowerCase().trim()===s.toLowerCase().trim());if(!o)return;const l=o.isOnline===!0,d=o.lastLogin?Utils.formatDateTime(o.lastLogin):"-",r=i[7];r&&(r.innerHTML=`
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${l?"bg-green-500":"bg-gray-400"}" style="animation: ${l?"pulse 2s infinite":"none"};"></div>
                        <span class="text-sm ${l?"text-green-600":"text-gray-500"}">
                            ${l?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                        </span>
                    </div>
                `);const f=i[8];f&&(f.innerHTML=`
                    <span class="text-sm text-gray-600" title="${o.lastLogin||"-"}">
                        ${d}
                    </span>
                `)}),this.updateUsersAdminStatsCards(a)},updateUserStatus(t){const e=document.getElementById("users-table-container");if(!e)return;const a=e.querySelector("tbody");if(!a)return;const n=AppState.appData.users.find(s=>s.id===t);if(!n)return;a.querySelectorAll("tr").forEach(s=>{const o=s.querySelectorAll("td");if(o.length>0){const l=n.email;if(o[1]?.textContent?.trim()===l){const r=n.isOnline===!0,f=n.lastLogin?Utils.formatDateTime(n.lastLogin):"-";o[7]&&(o[7].innerHTML=`
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full ${r?"bg-green-500":"bg-gray-400"}" style="animation: ${r?"pulse 2s infinite":"none"};"></div>
                                <span class="text-sm ${r?"text-green-600":"text-gray-500"}">
                                    ${r?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                                </span>
                            </div>
                        `),o[8]&&(o[8].innerHTML=`
                            <span class="text-sm text-gray-600" title="${n.lastLogin||"-"}">
                                ${f}
                            </span>
                        `),AppState.currentUser&&AppState.currentUser.email&&l.toLowerCase()===AppState.currentUser.email.toLowerCase()&&typeof UI<"u"&&typeof UI.updateUserConnectionStatus=="function"&&setTimeout(()=>{UI.updateUserConnectionStatus()},100)}}})},setupSectionChangeListener(){this.sectionChangeHandler&&document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=t=>{const e=t.detail?.section,a=t.detail?.previousSection;e==="users"?this.startAutoRefresh():a==="users"&&e!=="users"&&this.stopAutoRefresh()},document.addEventListener("section-changed",this.sectionChangeHandler)},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module..."),this.stopAutoRefresh(),this.sectionChangeHandler&&(document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=null),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Users module:",t)}}};(function(){"use strict";try{typeof window<"u"&&typeof Users<"u"?window.Users=Users:typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C users.js: \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}catch{if(typeof window<"u"&&typeof Users<"u")try{window.Users=Users}catch{}}})();
