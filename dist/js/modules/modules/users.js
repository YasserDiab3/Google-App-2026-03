const Users={currentView:"list",currentEditId:null,autoRefreshInterval:null,refreshInterval:15e3,sectionChangeHandler:null,_getI18nCore(){return window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null},t(e,t){const o=this._getI18nCore();return o?o.t(e,null,t||e):t||e},applyModuleI18n(e){const t=this._getI18nCore();if(!t)return;const o=e||document.getElementById("users-section")||document;typeof t.applyI18n=="function"&&t.applyI18n(o),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(o)},generateRandomPassword(e=10){const t="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";let o="";if(window.crypto&&window.crypto.getRandomValues){const a=new Uint32Array(e);window.crypto.getRandomValues(a);for(let i=0;i<e;i++)o+=t[a[i]%t.length]}else for(let a=0;a<e;a++)o+=t.charAt(Math.floor(Math.random()*t.length));return o},showUserCredentialsModal(e){if(!e||!e.email)return;const t=document.getElementById("user-credentials-modal-overlay");t&&t.remove();const a={admin:"\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (Admin)",safety_officer:"\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Officer)",user:"\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A (Regular User)",read_only:"\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 (Read Only)"}[e.role]||e.role||"\u0645\u0633\u062A\u062E\u062F\u0645",i=window.location.origin+window.location.pathname,s=`\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0648\u0631\u062D\u0645\u0629 \u0627\u0644\u0644\u0647 \u0648\u0628\u0631\u0643\u0627\u062A\u0647\u060C\r
\r
\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A: ${e.name||"\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"}\r
\r
\u062A\u0645 \u0625\u0646\u0634\u0627\u0621/\u062A\u062D\u062F\u064A\u062B \u062D\u0633\u0627\u0628\u0643\u0645 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP HSE).\r
\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643:\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\u{1F464} \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644: ${e.name||"\u2014"}\r
\u2709\uFE0F \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A: ${e.email}\r
\u{1F511} \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631: ${e.password||"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}\r
\u{1F6E1}\uFE0F \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u064A: ${a}\r
\u{1F3E2} \u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629: ${e.department||"\u2014"}\r
\u{1F310} \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0646\u0638\u0627\u0645: ${i}\r
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
\r
\u26A0\uFE0F \u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0645\u0646\u064A\u0629: \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0647\u0630\u0647 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643 \u0639\u0646\u062F \u0623\u0648\u0644 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.\r
\r
\u0645\u0639 \u062A\u062D\u064A\u0627\u062A\u060C\r
\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP HSE)`,n=encodeURIComponent(`\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0633\u0627\u0628\u0643 \u0641\u064A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 - ${e.name||""}`),l=encodeURIComponent(s),d=`mailto:${encodeURIComponent(e.email)}?subject=${n}&body=${l}`,r=document.createElement("div");r.id="user-credentials-modal-overlay",r.className="modal-overlay animate-fade-in",r.style.zIndex="9999",r.style.backdropFilter="blur(8px)",r.innerHTML=`
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
                            <strong style="font-size: 14px; color: #1e293b;">${Utils.escapeHTML(e.name||"")}</strong>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-envelope ml-1 text-blue-600"></i> \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code style="font-size: 13px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 6px; direction: ltr;">${Utils.escapeHTML(e.email||"")}</code>
                                <button type="button" onclick="navigator.clipboard.writeText('${e.email}').then(() => Notification.success('\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A')).catch(() => {})" title="\u0646\u0633\u062E \u0627\u0644\u0628\u0631\u064A\u062F" style="background: #e2e8f0; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-key ml-1 text-amber-600"></i> \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code id="cred-modal-pass-text" style="font-size: 15px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; direction: ltr;">${Utils.escapeHTML(e.password||"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")}</code>
                                <button type="button" onclick="navigator.clipboard.writeText('${e.password}').then(() => Notification.success('\u062A\u0645 \u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631')).catch(() => {})" title="\u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" style="background: #d1fae5; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #047857;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-user-shield ml-1 text-purple-600"></i> \u0627\u0644\u062F\u0648\u0631 \u0648\u0627\u0644\u0642\u0633\u0645</span>
                            <span style="font-size: 12px; font-weight: 700; color: #334155; background: #f1f5f9; padding: 3px 10px; border-radius: 20px;">${Utils.escapeHTML(a)} - ${Utils.escapeHTML(e.department||"")}</span>
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
        `,document.body.appendChild(r),r.addEventListener("click",c=>{c.target===r&&r.remove()});const f=r.querySelector("#copy-all-creds-btn");f&&f.addEventListener("click",()=>{navigator.clipboard.writeText(s).then(()=>{Notification.success("\u062A\u0645 \u0646\u0633\u062E \u0643\u0627\u0641\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D!")}).catch(()=>{Notification.error("\u062A\u0639\u0630\u0631 \u0646\u0633\u062E \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B")})})},_photoFailKey(e){return`hse_user_photo_failed_${String(e||"").trim()}`},_getDriveIdFromUrl(e){try{const t=String(e||"").trim();if(!t)return"";const o=t.match(/[?&]id=([^&]+)/)||t.match(/\/file\/d\/([^/]+)/);return o?String(o[1]||"").trim():""}catch{return""}},_normalizeUserPhotoUrl(e,t=""){try{const o=typeof Utils<"u"&&typeof Utils.extractImageSourceCandidate=="function"?String(Utils.extractImageSourceCandidate(e)||"").trim():String(e||"").trim();if(!o)return"";let a=o;typeof Utils<"u"&&typeof Utils.normalizeImageSource=="function"?a=Utils.normalizeImageSource(o)||o:o.startsWith("data:image/")?a=o:typeof window<"u"&&typeof window.__convertGoogleDriveUrl=="function"&&(a=window.__convertGoogleDriveUrl(o)||o);const s=this._getDriveIdFromUrl(a)||t||a,n=sessionStorage.getItem(this._photoFailKey(s));if(n){const l=parseInt(n,10),d=Date.now(),r=300*1e3;if(d-l<r)return"";sessionStorage.removeItem(this._photoFailKey(s))}return a}catch{return""}},_setupUserPhotoFallbacks(e){try{const o=(e||document).querySelectorAll('img[data-user-photo="1"]');if(!o||o.length===0)return;o.forEach(a=>{if(!a||a.dataset._fallbackBound==="1")return;a.dataset._fallbackBound="1";const i=(a.dataset.photoKey||"").trim(),s=a.src;if(a.addEventListener("error",()=>{try{i&&sessionStorage.setItem(this._photoFailKey(i),Date.now().toString())}catch{}requestAnimationFrame(()=>{try{const n=document.createElement("div");n.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",n.title="\u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629",n.innerHTML='<i class="fas fa-user text-gray-400"></i>',a.replaceWith(n)}catch{}})},{passive:!0}),i&&a.src){const n=sessionStorage.getItem(this._photoFailKey(i));if(n){const l=parseInt(n,10),d=Date.now(),r=300*1e3;d-l>=r&&(sessionStorage.removeItem(this._photoFailKey(i)),a.src=s+(s.includes("?")?"&":"?")+"retry="+Date.now())}}})}catch{}},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("users-section");if(!e)return;if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){e.innerHTML=`
                <div class="content-card">
                    <div class="empty-state">
                        <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                        <p class="text-sm text-gray-400 mt-2">\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629</p>
                    </div>
                </div>
            `;return}try{e.innerHTML=`
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
        `,this.applyModuleI18n(e),this.setupEventListeners();try{const o=document.getElementById("users-content");if(o){const a=await this.renderList().catch(i=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",i),`
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
                        `));o.innerHTML=a,this.applyModuleI18n(o),setTimeout(()=>this.loadUsersList(),0)}}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",o)}this.startAutoRefresh(),this.setupSectionChangeListener()}catch(o){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",o),e&&(e.innerHTML=`
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
                `,this.applyModuleI18n(e))}},async renderList(){return`
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
        `},async renderForm(e=null){const t=!!e;return`
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
                                <img id="user-photo-preview" src="${e?.photo||""}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" style="width: 100%; height: 100%; object-fit: cover; display: ${e?.photo?"block":"none"};">
                                <i id="user-photo-icon" class="fas fa-user text-2xl text-gray-400" style="display: ${e?.photo?"none":"block"}"></i>
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
                                value="${Utils.escapeHTML(e?.name||"")}"
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
                                value="${Utils.escapeHTML(e?.email||"")}"
                                placeholder="example@company.com"
                                ${t?"readonly":""}
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
                                value="${Utils.escapeHTML(e?.department||"")}"
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
                                <span id="user-emp-link-status" style="font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: ${e?.employeeCode?"#dcfce7":"#f1f5f9"}; color: ${e?.employeeCode?"#166534":"#64748b"};">
                                    ${e?.employeeCode?"\u{1F517} \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0648\u0638\u0641":"\u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637"}
                                </span>
                            </div>
                            <input 
                                type="text" 
                                id="user-employee-code" 
                                name="employeeCode" 
                                list="user-employees-list"
                                class="form-input"
                                value="${Utils.escapeHTML(e?.employeeCode||"")}"
                                placeholder="\u0627\u0628\u062D\u062B \u0628\u0631\u0642\u0645/\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0623\u0648 \u0627\u0633\u0645\u0647..."
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                            <datalist id="user-employees-list">
                                ${(AppState.appData?.employees||[]).filter(o=>o&&!o.isResigned).map(o=>{const a=o.employeeNumber||o.employeeCode||o.sapId||o.id||o.code||"",i=o.name||o.employeeName||"",s=o.department||o.section||"";return`<option value="${Utils.escapeHTML(a)}">${Utils.escapeHTML(i)} - ${Utils.escapeHTML(s)}</option>`}).join("")}
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
                                    <i class="fas fa-key ml-1 text-amber-500"></i> \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 ${t?"":'<span style="color: #ef4444;">*</span>'}
                                </label>
                                ${t?`
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
                                        ${t?'disabled placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0645\u062D\u0645\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B (\u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631 \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u062A\u063A\u064A\u064A\u0631)"':'required placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"'}
                                        class="form-input"
                                        style="direction: ltr; padding-left: 40px; border-radius: 8px; border-color: #cbd5e1; background: ${t?"#f8fafc":"#ffffff"};"
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
                                    ${t?'disabled style="display: none;"':""}
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
                                <option value="admin" ${e?.role==="admin"?"selected":""}>\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 (System Administrator)</option>
                                <option value="safety_officer" ${e?.role==="safety_officer"?"selected":""}>\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Safety Officer)</option>
                                <option value="user" ${e?.role==="user"?"selected":""}>\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A (Regular User)</option>
                                <option value="read_only" ${e?.role==="read_only"?"selected":""}>\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 (Read Only)</option>
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
                                    ${e?.active!==!1?"checked":""}
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
                    <div id="admin-permissions-banner" style="display: ${e?.role==="admin"?"flex":"none"}; align-items: center; gap: 10px; background: #eff6ff; border: 1px solid #93c5fd; border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; color: #1e40af;">
                        <i class="fas fa-shield-halved text-xl text-blue-600"></i>
                        <span style="font-size: 13px; font-weight: 700;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0645\u062A\u0644\u0643 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0643\u0627\u0641\u0629 \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0644\u062E\u0635\u0627\u0626\u0635 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.</span>
                    </div>

                    <!-- Modules Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;" id="modules-permissions-container">
                        ${MODULE_PERMISSIONS_CONFIG.map(o=>{const a=e?.permissions&&e.permissions[o.key]===!0,s=(document.getElementById("user-role")?.value||e?.role)==="admin"||e?.role==="admin",n=o.hasDetailedPermissions&&MODULE_DETAILED_PERMISSIONS[o.key];return`
                                <div class="module-perm-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                    <label style="display: flex; align-items: center; gap: 8px; flex: 1; cursor: ${s?"not-allowed":"pointer"}; margin: 0;">
                                        <input 
                                            type="checkbox" 
                                            class="user-permission-checkbox" 
                                            data-module="${o.key}"
                                            ${a||s?"checked":""}
                                            ${s?"disabled":""}
                                            style="width: 16px; height: 16px; accent-color: #2563eb; cursor: ${s?"not-allowed":"pointer"};"
                                        >
                                        <i class="fas ${o.icon}" style="color: #64748b; font-size: 14px; width: 16px; text-align: center;"></i>
                                        <span style="font-size: 13px; font-weight: 700; color: #1e293b; flex: 1;">${o.label}</span>
                                    </label>
                                    ${n?`
                                        <button 
                                            type="button" 
                                            class="detailed-perm-btn"
                                            data-action="show-detailed-permissions" 
                                            data-module="${o.key}"
                                            title="\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0640 ${o.label}"
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
                        ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"}
                    </button>
                </div>
            </form>
        `},async loadUsersList(){const e=document.getElementById("users-table-container");if(!e)return;let t=AppState.appData.users||[];if(t.length===0&&typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncUsers=="function")try{e.innerHTML=`
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645...</p>
                        </div>
                    `,await GoogleIntegration.syncUsers(!0),t=AppState.appData.users||[]}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646:",i)}if(t.length===0){e.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>
                    <button id="add-user-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `,this.applyModuleI18n(e);return}const o=`
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
                        ${t.map(i=>{const s=i.isOnline===!0,n=i.lastLogin?Utils.formatDateTime(i.lastLogin):"-";return`
                            <tr>
                                <td>
                                    <div class="flex items-center gap-3">
                                        ${(()=>{const d=(this._getDriveIdFromUrl(i.photo||"")||i.id||i.email||i.name||"").toString(),r=this._normalizeUserPhotoUrl(i.photo,i.id);if(!r)return'<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>';const f=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(r):{canonical:r,displaySrc:r,needsProxy:!1,proxyFileId:""},c=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(f):"";return`<img data-user-photo="1" data-photo-key="${Utils.escapeHTML(d)}" src="${Utils.escapeHTML(f.displaySrc)}" alt="${Utils.escapeHTML(i.name||"")}"${c} class="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`})()}
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
                                        ${n}
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
        `;e.innerHTML=o,this.applyModuleI18n(e);const a=()=>{this._setupUserPhotoFallbacks(e),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(e,{onFetchFail:i=>{try{const s=(i.dataset.photoKey||"").trim();s&&sessionStorage.setItem(this._photoFailKey(s),Date.now().toString())}catch{}try{const s=document.createElement("div");s.className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center",s.innerHTML='<i class="fas fa-user text-gray-400"></i>',i.replaceWith(s)}catch{}}})};typeof requestIdleCallback=="function"?requestIdleCallback(()=>a(),{timeout:600}):setTimeout(()=>a(),0)},getRoleName(e){return{admin:"\u{1F534} \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",safety_officer:"\u{1F535} \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629",user:"\u{1F7E2} \u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0627\u062F\u064A",read_only:"\u{1F7E3} \u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637"}[e]||e},getRoleBadgeClass(e){return{admin:"danger",safety_officer:"warning",user:"info",read_only:"secondary"}[e]||"secondary"},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-user-btn"),t=document.getElementById("add-user-empty-btn");e&&e.addEventListener("click",()=>this.showForm()),t&&t.addEventListener("click",()=>this.showForm());const o=document.getElementById("import-excel-btn");o&&o.addEventListener("click",()=>this.showImportExcel());const a=document.getElementById("users-search"),i=document.getElementById("users-filter-role");a&&a.addEventListener("input",l=>this.filterUsers(l.target.value,i?.value)),i&&i.addEventListener("change",l=>this.filterUsers(a?.value,l.target.value));const s=document.getElementById("user-form");s&&s.addEventListener("submit",l=>this.handleSubmit(l));const n=document.getElementById("cancel-user-btn");n&&n.addEventListener("click",()=>this.showList()),this.setupPhotoPreview()},100)},async showForm(e=null){Utils.safeLog("\u{1F527} \u0639\u0631\u0636 \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645 (Modal):",e?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F"),this.currentEditId=e?.id||null,this.currentDetailedPermissions={};let t=null;if(e&&e.permissions){let n;try{if(typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function")n=Permissions.normalizePermissions(e.permissions);else if(typeof e.permissions=="string"){const d=e.permissions.trim();if(d.startsWith("{")||d.startsWith("["))n=JSON.parse(d);else try{const r=d.split(`
`).filter(f=>f.trim());n={},r.forEach(f=>{const c=f.match(/^([^:]+):\s*(.+)$/);if(c){const u=c[1].trim(),p=c[2].trim();p==="true"?n[u]=!0:p==="false"?n[u]=!1:isNaN(p)?n[u]=p:n[u]=Number(p)}})}catch{n={}}}else n=e.permissions}catch{n={}}(!n||typeof n!="object"||Array.isArray(n))&&(n={});const l={};Object.keys(n).forEach(d=>{const r=n[d];d.endsWith("Permissions")&&typeof r=="object"&&!Array.isArray(r)?this.currentDetailedPermissions[d]=r:d.endsWith("Permissions")||(l[d]=r===!0)}),t=l}const o=e?{...e,permissions:t??(e.permissions&&typeof e.permissions=="object"&&!Array.isArray(e.permissions)?e.permissions:{})}:null,a=document.getElementById("user-form-modal-overlay");a&&a.remove();const i=!!e,s=document.createElement("div");s.id="user-form-modal-overlay",s.className="modal-overlay animate-fade-in",s.style.zIndex="9990",s.style.backdropFilter="blur(6px)",s.innerHTML=`
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
                    ${await this.renderForm(o)}
                </div>
            </div>
        `,document.body.appendChild(s),this.applyModuleI18n(s),this.setupEventListeners(),setTimeout(()=>{const n=s.querySelector("#generate-password-btn");n&&n.addEventListener("click",()=>{const c=s.querySelector("#user-password");if(c){const u=this.generateRandomPassword(10);c.value=u,c.type="text";const p=s.querySelector("#toggle-password-visibility-btn i");p&&(p.className="fas fa-eye-slash text-amber-600");const g=s.querySelector("#generated-pass-notice");g&&g.classList.remove("hidden"),Notification.success("\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0639\u0634\u0648\u0627\u0626\u064A\u0629 \u0642\u0648\u064A\u0629")}});const l=s.querySelector("#change-password-toggle");l&&l.addEventListener("change",c=>{const u=s.querySelector("#user-password"),p=s.querySelector("#generate-password-btn");u&&(u.disabled=!c.target.checked,u.style.background=c.target.checked?"#ffffff":"#f8fafc",u.placeholder=c.target.checked?"\u0623\u062F\u062E\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644)":"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0645\u062D\u0645\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B (\u062D\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631 \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u062A\u063A\u064A\u064A\u0631)",c.target.checked||(u.value="")),p&&(p.disabled=!c.target.checked,p.style.display=c.target.checked?"flex":"none")});const d=s.querySelector("#toggle-password-visibility-btn");d&&d.addEventListener("click",()=>{const c=s.querySelector("#user-password");if(c){const u=c.type==="password";c.type=u?"text":"password";const p=d.querySelector("i");p&&(p.className=u?"fas fa-eye-slash text-amber-600":"fas fa-eye text-gray-400")}});const r=s.querySelector("#user-role");r&&r.addEventListener("change",()=>{this.updatePermissionsUI()});const f=s.querySelector("#cancel-user-btn");f&&f.addEventListener("click",()=>s.remove()),this.setupSelectAllButtons(),this.setupDetailedPermissionsButtons(),this.setupEmployeeCodeAutoLookup(),this.updatePermissionsUI()},100)},updatePermissionsUI(){const o=document.getElementById("user-role")?.value==="admin";document.querySelectorAll(".user-permission-checkbox").forEach(n=>{if(o){n.disabled=!0,n.checked=!0;const l=n.closest(".module-perm-card")||n.parentElement;l&&(l.style.opacity="0.75",l.style.cursor="not-allowed")}else{n.disabled=!1;const l=n.closest(".module-perm-card")||n.parentElement;l&&(l.style.opacity="1",l.style.cursor="pointer")}});const i=document.getElementById("admin-permissions-banner");i&&(i.style.display=o?"flex":"none");const s=document.getElementById("permissions-action-btns");s&&(s.style.display=o?"none":"flex")},setupSelectAllButtons(){const e=document.getElementById("select-all-permissions-btn"),t=document.getElementById("deselect-all-permissions-btn");e&&e.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(a=>{a.checked=!0}),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")}),t&&t.addEventListener("click",()=>{document.querySelectorAll(".user-permission-checkbox:not([disabled])").forEach(a=>{a.checked=!1}),Notification.success("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A")})},setupDetailedPermissionsButtons(){document.querySelectorAll('[data-action="show-detailed-permissions"]').forEach(t=>{t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const a=t.getAttribute("data-module");this.showDetailedPermissionsModal(a)})})},showDetailedPermissionsModal(e){const t=MODULE_DETAILED_PERMISSIONS[e];if(!t){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062F\u064A\u0648\u0644");return}const a=(this.currentDetailedPermissions||{})[`${e}Permissions`]||{},i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${t.label}
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
                        ${t.permissions.map(d=>{const r=d.key==="observations-view-department"?a[d.key]!==!1:a[d.key]===!0;return`
                            <label class="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    class="detailed-permission-checkbox rounded border-gray-300 text-blue-600 mr-2" 
                                    data-module="${e}"
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
        `,document.body.appendChild(i),i.addEventListener("click",d=>{d.target===i&&i.remove()});const s=i.querySelector("#select-all-detailed-btn"),n=i.querySelector("#deselect-all-detailed-btn");s&&s.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(r=>r.checked=!0)}),n&&n.addEventListener("click",()=>{i.querySelectorAll(".detailed-permission-checkbox").forEach(r=>r.checked=!1)});const l=i.querySelector("#save-detailed-permissions-btn");l&&l.addEventListener("click",()=>{const d=i.querySelectorAll(".detailed-permission-checkbox"),r={};d.forEach(f=>{const c=f.getAttribute("data-permission");r[c]=f.checked}),this.currentDetailedPermissions||(this.currentDetailedPermissions={}),this.currentDetailedPermissions[`${e}Permissions`]=r,Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629"),i.remove()})},setupEmployeeCodeAutoLookup(){const e=document.getElementById("user-employee-code"),t=document.getElementById("user-name"),o=document.getElementById("user-department"),a=document.getElementById("user-emp-link-status"),i=document.getElementById("user-emp-link-hint");if(!e)return;const s=()=>{const n=e.value.trim();if(!n){a&&(a.textContent="\u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637",a.style.background="#f1f5f9",a.style.color="#64748b"),i&&(i.innerHTML="\u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0643\u0648\u062F \u0645\u0648\u0638\u0641\u060C \u064A\u062A\u0645 \u0631\u0628\u0637 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A \u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.",i.style.color="#64748b");return}let l=null;if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByTerm=="function")l=EmployeeHelper.findByTerm(n);else if(Array.isArray(AppState.appData?.employees)){const d=n.toLowerCase();l=AppState.appData.employees.find(r=>{if(!r)return!1;const f=String(r.employeeNumber||r.employeeCode||r.sapId||r.id||r.code||"").trim().toLowerCase(),c=String(r.name||r.employeeName||"").trim().toLowerCase();return f===d||c===d})}if(l){const d=this.currentEditId,r=typeof EmployeeHelper<"u"&&typeof EmployeeHelper.getPrimaryCode=="function"?EmployeeHelper.getPrimaryCode(l):l.employeeNumber||l.employeeCode||l.sapId||l.id||l.code||n,f=(AppState.appData?.users||[]).find(p=>{if(!p||p.id===d)return!1;const g=String(p.employeeCode||p.employeeNumber||"").trim().toLowerCase();return g&&(g===n.toLowerCase()||g===String(r).toLowerCase())});if(f){a&&(a.textContent="\u26A0\uFE0F \u0643\u0648\u062F \u0645\u0643\u0631\u0631",a.style.background="#fee2e2",a.style.color="#991b1b"),i&&(i.innerHTML=`\u26A0\uFE0F \u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u062D\u0633\u0627\u0628 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631 \u0645\u0633\u0628\u0642\u0627\u064B (${Utils.escapeHTML(f.name||f.email)}).`,i.style.color="#dc2626");return}const c=l.name||l.employeeName||"",u=l.department||l.section||"";if(t&&c&&!t.value.trim()&&(t.value=c,t.setAttribute("data-auto-filled","true")),o&&u&&!o.value.trim()&&(o.value=u,o.setAttribute("data-auto-filled","true")),a&&(a.textContent="\u{1F517} \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0645\u0648\u0638\u0641",a.style.background="#dcfce7",a.style.color="#166534"),i){const p=t?t.value.trim():"",g=c&&p&&c!==p;let b=`\u2705 \u062A\u0645 \u0627\u0644\u0631\u0628\u0637 \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641: <strong>${Utils.escapeHTML(c)}</strong> (${Utils.escapeHTML(u||"\u0628\u062F\u0648\u0646 \u0642\u0633\u0645")}).`;g&&(b+=` <button type="button" id="btn-sync-emp-name-inline" style="margin-right: 6px; padding: 2px 8px; border-radius: 6px; background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.2s;"><i class="fas fa-sync-alt ml-1"></i> \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0633\u0645 \u0625\u0644\u0649 "${Utils.escapeHTML(c)}"</button>`),i.innerHTML=b,i.style.color="#16a34a";const v=document.getElementById("btn-sync-emp-name-inline");v&&v.addEventListener("click",w=>{w.preventDefault(),t&&(t.value=c,t.setAttribute("data-auto-filled","false")),o&&u&&(o.value=u),typeof Notification<"u"&&Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0625\u0644\u0649 "${c}"`),s()})}}else a&&(a.textContent="\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",a.style.background="#fef3c7",a.style.color="#92400e"),i&&(i.innerHTML="\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0645\u0637\u0627\u0628\u0642 \u0644\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.",i.style.color="#d97706")};e.addEventListener("input",s),e.addEventListener("change",s),e.addEventListener("blur",s)},async linkExistingUsersToEmployees(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...");try{typeof EmployeeHelper<"u"&&typeof EmployeeHelper.ensureEmployeesLoaded=="function"&&await EmployeeHelper.ensureEmployeesLoaded();const t=AppState.appData?.users||[],o=AppState.appData?.employees||[];if(!o.length){Loading.hide(),Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}const a=t.filter(r=>r&&!String(r.employeeCode||"").trim()),i=[],s=r=>String(r||"").trim().toLowerCase();if(a.forEach(r=>{const f=s(r.email),c=f.includes("@")?f.split("@")[0]:"",u=s(r.name);let p=null;if(f&&(p=o.find(g=>{const b=s(g.email||g.mail||g["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]);return b&&(b===f||c&&b.split("@")[0]===c)})),!p&&u&&(p=o.find(g=>{const b=s(g.name||g.employeeName);return b&&b===u})),p){const g=typeof EmployeeHelper<"u"&&typeof EmployeeHelper.getPrimaryCode=="function"?EmployeeHelper.getPrimaryCode(p):p.employeeNumber||p.employeeCode||p.sapId||p.id||p.code;g&&i.push({user:r,employee:p,code:String(g).trim(),department:p.department||p.section||r.department||""})}}),Loading.hide(),!i.length){Notification.info("\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0623\u0648 \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0637\u0627\u0628\u0642\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.");return}const n=document.createElement("div");n.className="modal-overlay",n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;",n.innerHTML=`
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
            `,document.body.appendChild(n);const l=n.querySelector("#select-all-matches");l&&l.addEventListener("change",r=>{n.querySelectorAll(".match-item-cb").forEach(f=>f.checked=r.target.checked)});const d=n.querySelector("#confirm-link-users-btn");d&&d.addEventListener("click",async()=>{const r=n.querySelectorAll(".match-item-cb:checked");if(!r.length){Notification.warning("\u0644\u0645 \u062A\u0642\u0645 \u0628\u062A\u062D\u062F\u064A\u062F \u0623\u064A \u062D\u0633\u0627\u0628 \u0644\u0644\u0631\u0628\u0637");return}typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0631\u0628\u0637 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A..."),d.disabled=!0;let f=0;r.forEach(c=>{const u=parseInt(c.getAttribute("data-index"),10),p=i[u];if(p){const g=(AppState.appData?.users||[]).findIndex(b=>b.id===p.user.id);g!==-1&&(AppState.appData.users[g]={...AppState.appData.users[g],employeeCode:p.code,department:p.department||AppState.appData.users[g].department},f++)}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Users",AppState.appData.users).catch(c=>Utils.safeWarn("autoSave Users:",c)),Loading.hide(),n.remove(),Notification.success(`\u062A\u0645 \u0631\u0628\u0637 ${f} \u062D\u0633\u0627\u0628\u0627\u064B \u0628\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0628\u0646\u062C\u0627\u062D \u0648\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`),this.showList()})}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A: "+(t.message||String(t)))}},async handleSubmit(e){e.preventDefault();const t=e.target?.querySelector('button[type="submit"]')||document.querySelector('#user-form button[type="submit"]');if(t&&t.disabled)return;let o="";if(t&&(o=t.innerHTML,t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...'),Loading.show(),!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Loading.hide(),Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),t&&(t.disabled=!1,t.innerHTML=o);return}const i=this.currentEditId?AppState.appData.users.find(h=>h.id===this.currentEditId):null;let s=i?.photo||"";const n=document.getElementById("user-photo-input");if(n&&n.files.length>0){const h=n.files[0];if(h.size>2097152){Loading.hide(),Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 2MB"),t&&(t.disabled=!1,t.innerHTML=o);return}s=await this.convertImageToBase64(h)}const l=document.getElementById("user-password"),d=l?l.value:"",r=d?d.trim():"",f=i?.passwordHash||(Utils.isSha256Hex(i?.password)?i?.password:""),c=i?.password&&i.password!==""?i.password:"***",u=document.getElementById("user-name"),p=document.getElementById("user-email"),g=document.getElementById("user-role"),b=document.getElementById("user-department"),v=document.getElementById("user-active");if(!u||!p||!g||!b||!v){Loading.hide(),Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&(t.disabled=!1,t.innerHTML=o);return}const w=document.getElementById("user-employee-code"),C=w?w.value.trim():"",m={id:this.currentEditId||Utils.generateId("USER"),name:u.value.trim(),email:p.value.trim().toLowerCase(),role:g.value,department:b.value.trim(),employeeCode:C,active:v.checked,photo:s,permissions:collectedPermissions&&typeof collectedPermissions=="object"?collectedPermissions:{},createdAt:this.currentEditId?AppState.appData.users.find(h=>h.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),lastLogin:i?.lastLogin||null,lastLogout:i?.lastLogout||null,isOnline:i?.isOnline||!1,loginHistory:i?.loginHistory||[]};if(!m.name||!m.email||!m.role||!m.department){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),t&&(t.disabled=!1,t.innerHTML=o);return}if(!Utils.isValidEmail(m.email)){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0635\u062D\u064A\u062D"),t&&(t.disabled=!1,t.innerHTML=o);return}const A=!this.currentEditId,$=document.getElementById("change-password-toggle"),E=(A||!!($&&$.checked))&&r.length>0,L=this.currentEditId?AppState.appData.users.find(h=>h.id===this.currentEditId):null;let S=(h=>!!(h&&h!=="***"&&typeof Utils<"u"&&Utils.isSha256Hex&&Utils.isSha256Hex(h)))(L?.passwordHash)?L.passwordHash:"",I=L?.forcePasswordChange??!1,k=L?.passwordChanged??!1;if(A){if(!E){Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"),t&&(t.disabled=!1,t.innerHTML=o);return}if(r.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),t&&(t.disabled=!1,t.innerHTML=o);return}S=await Utils.hashPassword(r),I=!0,k=!1}else if(E){if(r.length<6){Loading.hide(),Notification.error("\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),t&&(t.disabled=!1,t.innerHTML=o);return}S=await Utils.hashPassword(r),I=!0,k=!1}if(m.password="***",S?m.passwordHash=S:delete m.passwordHash,m.forcePasswordChange=I,m.passwordChanged=k,AppState.appData.users.find(h=>h.email===m.email&&h.id!==m.id)){Loading.hide(),Notification.error("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644"),t&&(t.disabled=!1,t.innerHTML=o);return}try{const h=!this.currentEditId;if(h){if(AppState.appData.users.push(m),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(y){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",y)}Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("addUser",m,3).then(y=>{y&&y.success?(Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062C\u062F\u064A\u062F \u0625\u0644\u0649 Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):y&&y.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",y?.message),typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("Users",AppState.appData.users),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",y?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(y=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",y),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}else{const y=AppState.appData.users.findIndex(x=>x.id===this.currentEditId);if(y!==-1){const x=AppState.appData.users[y],U=AppState.currentUser&&AppState.currentUser.email&&m.email.toLowerCase()===AppState.currentUser.email.toLowerCase(),M={...m,isOnline:U?!0:m.isOnline};AppState.appData.users[y]={...x,...M}}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),Loading.hide(),AppState.googleConfig.appsScript.enabled&&GoogleIntegration.immediateSyncWithRetry("updateUser",{userId:m.id,updateData:m},3).then(x=>{x&&x.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D"),Notification.success("\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u0628\u0646\u062C\u0627\u062D")):x&&x.shouldDefer?(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F 3 \u0645\u062D\u0627\u0648\u0644\u0627\u062A:",x?.message),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(U=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",U)),Notification.warning("\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")):(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",x?.message),Notification.warning("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."))}).catch(x=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",x),GoogleIntegration.autoSave("Users",AppState.appData.users).catch(U=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A autoSave:",U)),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")})}if(AppState.currentUser&&((m.email||"").toLowerCase()===(AppState.currentUser.email||"").toLowerCase()||m.id&&AppState.currentUser.id&&String(m.id).trim()===String(AppState.currentUser.id).trim())){if(AppState.currentUser={...AppState.currentUser,...m,loginTime:AppState.currentUser.loginTime},m.permissions&&typeof m.permissions=="object"){const x=typeof Permissions<"u"&&typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(m.permissions):m.permissions;AppState.currentUser.permissions=x||{}}else AppState.currentUser.permissions={};let y=!1;typeof window.Auth<"u"&&typeof window.Auth.updateUserSession=="function"?(y=!!window.Auth.updateUserSession(),y&&(Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A \u0628\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0643 \u0628\u0646\u062C\u0627\u062D. \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0645\u062A\u0627\u062D\u0629 \u0627\u0644\u0622\u0646 \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C."))):(typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&Permissions.updateNavigation(),Notification.info("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A\u0643. \u0642\u062F \u062A\u062D\u062A\u0627\u062C \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A.")),!y&&typeof UI<"u"&&typeof UI.updateUserProfilePhoto=="function"&&UI.updateUserProfilePhoto(),typeof UI<"u"&&AppState.currentSection==="profile"&&typeof UI.renderMyProfileSection=="function"&&Promise.resolve(UI.renderMyProfileSection()).catch(()=>{})}else{const y=AppState.appData.users.find(x=>x.id===m.id);y&&y.isOnline===!0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ${y.email} - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062C\u0644\u0633\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629`)}typeof Permissions<"u"&&typeof Permissions.updateNavigation=="function"&&(Permissions.updateNavigation(),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0628\u0639\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A"));try{typeof window.RealtimeSyncManager<"u"&&typeof window.RealtimeSyncManager.broadcast=="function"&&(window.RealtimeSyncManager.broadcast("user-permissions-updated","users",{id:m.id,email:m.email,role:m.role,active:m.active,permissions:m.permissions}),window.RealtimeSyncManager.broadcast("sync-request","users"))}catch{}t&&(t.disabled=!1,t.innerHTML=o),document.getElementById("user-form-modal-overlay")?.remove(),(h||E)&&this.showUserCredentialsModal({name:m.name,email:m.email,password:d||r,role:m.role,department:m.department}),this.showList()}catch(h){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",h),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+h.message),t&&(t.disabled=!1,t.innerHTML=o)}},async editUser(e){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const o=AppState.appData.users.find(a=>a.id===e);o?await this.showForm(o):Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async disableUserMfa(e,t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u0637\u064A\u0644 MFA");return}const a=(AppState.appData.users||[]).find(s=>s&&(s.id===e||s.email===t));if(!a){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u062A\u0639\u0637\u064A\u0644 MFA",`\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629 \u0627\u0644\u062B\u0646\u0627\u0626\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${a.name}" (${a.email})\u061F`,"\u062A\u0639\u0637\u064A\u0644","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{const s=await Auth.adminDisableUserMfa(a.email);Loading.hide(),s&&s.success&&this.load()}catch{Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062A\u0639\u0637\u064A\u0644 MFA")}}},async resetUserPassword(e,t){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");return}const a=AppState.appData.users.find(s=>s.id===e||s.email===t);if(!a){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(await Utils.confirmDialog("\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${a.name}" (${a.email})\u061F

\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0645\u0624\u0642\u062A\u0629 \u062C\u062F\u064A\u062F\u0629.`,"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u0625\u0644\u063A\u0627\u0621"))try{Loading.show();const s=await Auth.resetPassword(a.email);if(Loading.hide(),s&&s.success){const n=s.tempPassword||"\u063A\u064A\u0631 \u0645\u062A\u0627\u062D",l=`
                    <div style="text-align: right; direction: rtl;">
                        <p style="margin-bottom: 10px; font-weight: bold;">\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062C\u0627\u062D!</p>
                        <p style="margin-bottom: 10px;">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0624\u0642\u062A\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 <strong>${Utils.escapeHTML(a.email)}</strong>:</p>
                        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; text-align: center; direction: ltr;">
                            <strong>${Utils.escapeHTML(n)}</strong>
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
                            <button class="btn-secondary" onclick="navigator.clipboard.writeText('${n}').then(() => Notification.success('\u062A\u0645 \u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631')).catch(() => {})">
                                <i class="fas fa-copy ml-2"></i>
                                \u0646\u0633\u062E
                            </button>
                        </div>
                    </div>
                `,document.body.appendChild(d),d.addEventListener("click",r=>{r.target===d&&d.remove()}),this.loadUsersList()}else Notification.error(s?.message||"\u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:",s)}},async deleteUser(e){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const o=AppState.appData.users.find(s=>s.id===e);if(!o){Notification.error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(AppState.currentUser&&o.id===AppState.currentUser.id){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062E\u0627\u0635");return}const a=AppState.appData.users.filter(s=>s.role==="admin"&&s.active!==!1);if(o.role==="admin"&&a.length===1){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0622\u062E\u0631 \u0645\u062F\u064A\u0631 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645");return}if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 "${o.name}" (${o.email})\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show();try{let s=!1;if(AppState.googleConfig.appsScript.enabled)try{const n=await GoogleIntegration.sendToAppsScript("deleteUser",{userId:e});if(s=n&&n.success===!0,!s&&n&&n.message)throw new Error(n.message)}catch(n){const l=AppState.appData.users.filter(d=>d.id!==e);try{await GoogleIntegration.autoSave("Users",l),s=!0}catch(d){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641 \u0645\u0646 Google Sheets \u0648\u0628\u062F\u064A\u0644 autoSave:",d),Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(n.message||n)),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",n);return}}else await GoogleIntegration.autoSave("Users",AppState.appData.users.filter(n=>n.id!==e)),s=!0;if(!s){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}AppState.appData.users=AppState.appData.users.filter(n=>n.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D"),this.loadUsersList()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+(s&&s.message?s.message:String(s))),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",s)}}},filterUsers(e="",t=""){let a=AppState.appData.users||[];if(e){const s=e.toLowerCase();a=a.filter(n=>n.name?.toLowerCase().includes(s)||n.email?.toLowerCase().includes(s)||n.department?.toLowerCase().includes(s))}t&&(a=a.filter(s=>s.role===t));const i=document.querySelector("#users-table-container tbody");i&&(a.length===0?i.innerHTML=`
                    <tr>
                        <td colspan="7" class="text-center text-gray-500 py-8">
                            \u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C
                        </td>
                    </tr>
                `:i.innerHTML=a.map(s=>`
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
                `).join(""))},async showImportExcel(){if(!(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin")){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t);const o=document.getElementById("excel-file-input"),a=document.getElementById("confirm-import-btn");let i=[];(()=>{if(typeof XLSX>"u"){const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",n.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},n.onload=()=>{o.addEventListener("change",l=>{i=[],this.handleExcelFile(l.target.files[0],t,a,d=>{i=d})})},document.head.appendChild(n)}else o.addEventListener("change",n=>{i=[],this.handleExcelFile(n.target.files[0],t,a,l=>{i=l})})})(),a.addEventListener("click",async()=>{if(i.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(i,t)}),t.addEventListener("click",n=>{n.target===t&&t.remove()})},handleExcelFile(e,t,o,a){if(!e)return;const i=new FileReader;i.onload=async s=>{try{Loading.show();const n=new Uint8Array(s.target.result),l=XLSX.read(n,{type:"array"}),d=l.SheetNames[0],r=l.Sheets[d],f=XLSX.utils.sheet_to_json(r);if(f.length===0){Loading.hide(),Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}a&&a(f);const c=document.getElementById("import-preview"),u=document.getElementById("preview-head"),p=document.getElementById("preview-body"),g=document.getElementById("preview-count");if(c&&f.length>0){const b=Object.keys(f[0]);u.innerHTML=`<tr>${b.map(v=>`<th class="px-2 py-1">${Utils.escapeHTML(v)}</th>`).join("")}</tr>`,p.innerHTML=f.slice(0,5).map(v=>`<tr>${b.map(w=>`<td class="px-2 py-1">${Utils.escapeHTML(String(v[w]||""))}</td>`).join("")}</tr>`).join(""),g.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${f.length}`,c.classList.remove("hidden"),o.disabled=!1}Loading.hide()}catch(n){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+n.message)}},i.readAsArrayBuffer(e)},async processImport(e,t){try{Loading.show();let o=0,a=0;const i=[];for(const s of e)try{const n=s.\u0627\u0644\u0627\u0633\u0645||s.Name||s.name||s.NAME||"",l=s["\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"]||s.Email||s.email||s.EMAIL||"",d=s.\u0627\u0644\u062F\u0648\u0631||s.Role||s.role||s.ROLE||"user",r=s.\u0627\u0644\u0642\u0633\u0645||s.Department||s.department||s.DEPARTMENT||"";if(!n||!l){a++,i.push(`\u0635\u0641 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0623\u0648 \u0628\u0631\u064A\u062F: ${JSON.stringify(s)}`);continue}if(!Utils.isValidEmail(l)){a++,i.push(`\u0628\u0631\u064A\u062F \u063A\u064A\u0631 \u0635\u062D\u064A\u062D: ${l}`);continue}if(AppState.appData.users.find(v=>v.email===l.toLowerCase())){a++;continue}const c=Math.random().toString(36).substring(2,10),u=Date.now().toString(36).substring(5,9),p="Temp"+c+u+"!",g=await Utils.hashPassword(p),b={id:Utils.generateId("USER"),name:n.trim(),email:l.toLowerCase().trim(),password:"***",passwordHash:g,role:this.mapRole(d),department:r.trim(),active:!0,permissions:this.mapRole(d)==="admin"?{}:void 0,forcePasswordChange:!0,passwordChanged:!1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.users.push(b),o++}catch{a++}if(o>0&&typeof removeDefaultUsersIfNeeded=="function")try{await removeDefaultUsersIfNeeded()}catch(s){Utils.safeWarn("\u26A0 \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:",s)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),o>0&&await GoogleIntegration.autoSave("Users",AppState.appData.users),Loading.hide(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${o} \u0645\u0648\u0638${a>0?` (\u0641\u0634\u0644 ${a})`:""}`),t.remove(),this.loadUsersList()}catch(o){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+o.message)}},mapRole(e){const t=String(e||"").toLowerCase().trim();return t.includes("\u0645\u062F\u064A\u0631")||t.includes("admin")?"admin":t.includes("\u0633\u0644\u0627\u0645\u0629")||t.includes("safety")?"safety_officer":"user"},async convertImageToBase64(e){return new Promise((t,o)=>{const a=new FileReader;a.onload=()=>t(a.result),a.onerror=o,a.readAsDataURL(e)})},collectPermissions(){const e={};return typeof MODULE_PERMISSIONS_CONFIG<"u"&&Array.isArray(MODULE_PERMISSIONS_CONFIG)&&MODULE_PERMISSIONS_CONFIG.forEach(t=>{if(!t.adminOnly){const o=document.querySelector(`.user-permission-checkbox[data-module="${t.key}"]`);o&&!o.disabled&&(e[t.key]=o.checked)}}),this.currentDetailedPermissions&&typeof this.currentDetailedPermissions=="object"&&Object.assign(e,this.currentDetailedPermissions),typeof MODULE_PERMISSIONS_CONFIG<"u"&&MODULE_PERMISSIONS_CONFIG.forEach(t=>{e[t.key]||delete e[`${t.key}Permissions`]}),e},setupPhotoPreview(){const e=document.getElementById("user-photo-input"),t=document.getElementById("user-photo-preview"),o=document.getElementById("user-photo-icon");e&&t&&o&&e.addEventListener("change",a=>{const i=a.target.files[0];if(i){const s=new FileReader;s.onload=n=>{t.src=n.target.result,t.style.display="block",o.style.display="none"},s.readAsDataURL(i)}})},startAutoRefresh(){this.stopAutoRefresh(),this.autoRefreshInterval=setInterval(()=>{const e=document.getElementById("users-section");e&&e.style.display!=="none"&&!e.hidden&&this.refreshUsersTable()},this.refreshInterval),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644")},stopAutoRefresh(){this.autoRefreshInterval&&(clearInterval(this.autoRefreshInterval),this.autoRefreshInterval=null,Utils.safeLog("\u{1F6D1} \u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A"))},refreshUsersTable(){const e=document.getElementById("users-table-container");if(!e)return;const t=e.querySelector("tbody");if(!t){this.loadUsersList();return}const o=AppState.appData.users||[];t.querySelectorAll("tr").forEach(a=>{const i=a.querySelectorAll("td");if(i.length<9)return;const s=i[1]?.textContent?.trim();if(!s)return;const n=o.find(c=>c.email&&c.email.toLowerCase().trim()===s.toLowerCase().trim());if(!n)return;const l=n.isOnline===!0,d=n.lastLogin?Utils.formatDateTime(n.lastLogin):"-",r=i[7];r&&(r.innerHTML=`
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${l?"bg-green-500":"bg-gray-400"}" style="animation: ${l?"pulse 2s infinite":"none"};"></div>
                        <span class="text-sm ${l?"text-green-600":"text-gray-500"}">
                            ${l?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                        </span>
                    </div>
                `);const f=i[8];f&&(f.innerHTML=`
                    <span class="text-sm text-gray-600" title="${n.lastLogin||"-"}">
                        ${d}
                    </span>
                `)})},updateUserStatus(e){const t=document.getElementById("users-table-container");if(!t)return;const o=t.querySelector("tbody");if(!o)return;const a=AppState.appData.users.find(s=>s.id===e);if(!a)return;o.querySelectorAll("tr").forEach(s=>{const n=s.querySelectorAll("td");if(n.length>0){const l=a.email;if(n[1]?.textContent?.trim()===l){const r=a.isOnline===!0,f=a.lastLogin?Utils.formatDateTime(a.lastLogin):"-";n[7]&&(n[7].innerHTML=`
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full ${r?"bg-green-500":"bg-gray-400"}" style="animation: ${r?"pulse 2s infinite":"none"};"></div>
                                <span class="text-sm ${r?"text-green-600":"text-gray-500"}">
                                    ${r?"\u0645\u062A\u0635\u0644":"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644"}
                                </span>
                            </div>
                        `),n[8]&&(n[8].innerHTML=`
                            <span class="text-sm text-gray-600" title="${a.lastLogin||"-"}">
                                ${f}
                            </span>
                        `),AppState.currentUser&&AppState.currentUser.email&&l.toLowerCase()===AppState.currentUser.email.toLowerCase()&&typeof UI<"u"&&typeof UI.updateUserConnectionStatus=="function"&&setTimeout(()=>{UI.updateUserConnectionStatus()},100)}}})},setupSectionChangeListener(){this.sectionChangeHandler&&document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=e=>{const t=e.detail?.section,o=e.detail?.previousSection;t==="users"?this.startAutoRefresh():o==="users"&&t!=="users"&&this.stopAutoRefresh()},document.addEventListener("section-changed",this.sectionChangeHandler)},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module..."),this.stopAutoRefresh(),this.sectionChangeHandler&&(document.removeEventListener("section-changed",this.sectionChangeHandler),this.sectionChangeHandler=null),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Users module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Users module:",e)}}};(function(){"use strict";try{typeof window<"u"&&typeof Users<"u"?window.Users=Users:typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C users.js: \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631")}catch{if(typeof window<"u"&&typeof Users<"u")try{window.Users=Users}catch{}}})();
