(()=>{"use strict";if(!(typeof window>"u")&&!window.HseActionClosureInitialized){window.HseActionClosureInitialized=!0;try{let A=function(){return window.HseFeatureFlags&&typeof window.HseFeatureFlags.isEnabled=="function"?window.HseFeatureFlags.isEnabled("action_closure_workflow"):!0},C=function(){const e=new Set;if(typeof window.getSystemSafetyTeamMembers=="function")try{const i=window.getSystemSafetyTeamMembers();Array.isArray(i)&&i.forEach(t=>t&&e.add(t.trim()))}catch{}try{const i=JSON.parse(localStorage.getItem("HSE_PUBLIC_OBS_CONFIG")||"{}");Array.isArray(i.safetyMembers)&&i.safetyMembers.forEach(t=>{const n=typeof t=="string"?t.trim():t&&t.name?t.name.trim():"";n&&e.add(n)})}catch{}try{const i=JSON.parse(localStorage.getItem("HSE_DAILY_SAFETY_MEMBERS")||"[]");Array.isArray(i)&&i.forEach(t=>{const n=typeof t=="string"?t.trim():t&&t.name?t.name.trim():"";n&&e.add(n)})}catch{}return e.size===0&&["\u0645/ \u0645\u062D\u0645\u062F \u0633\u0639\u064A\u062F","\u0645/ \u062D\u0633\u0627\u0645 \u0627\u0644\u0633\u064A\u062F","\u0623/ \u0623\u062D\u0645\u062F \u0641\u0624\u0627\u062F","\u0645/ \u0639\u0645\u0627\u062F \u0637\u0627\u0631\u0642","\u0645/ \u0645\u062D\u0645\u0648\u062F \u0639\u0644\u064A","\u0623/ \u0637\u0627\u0631\u0642 \u0645\u0635\u0637\u0641\u0649"].forEach(i=>e.add(i)),Array.from(e).sort((i,t)=>i.localeCompare(t,"ar"))},x=function(){const e=document.getElementById("closureInspectorName");if(!e)return;const i=C();let t="";try{const o=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(o){let r=null;try{r=JSON.parse(o)}catch{}t=r&&(r.userName||r.name||r.inspector)||(typeof o=="string"&&!o.startsWith("{")?o:""),t&&(t=t.trim())}}catch{}const n=e.value;e.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 / \u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014</option>';let s=!1;if(i.forEach(o=>{t&&(o.toLowerCase().includes(t.toLowerCase())||t.toLowerCase().includes(o.toLowerCase()))&&(s=!0)}),t&&!s){const o=document.createElement("option");o.value=t,o.textContent=`\u{1F464} ${t} (\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A)`,e.appendChild(o)}if(i.forEach(o=>{const r=document.createElement("option");r.value=o,r.textContent=`\u{1F464} ${o}`,e.appendChild(r)}),n)e.value=n;else if(t)for(let o=0;o<e.options.length;o++){const r=e.options[o].value;if(r&&(r.toLowerCase().includes(t.toLowerCase())||t.toLowerCase().includes(r.toLowerCase()))){e.selectedIndex=o;break}}e.onchange=()=>{const o=document.getElementById("closureInspectorBadge");o&&(t&&e.value&&(e.value.toLowerCase().includes(t.toLowerCase())||t.toLowerCase().includes(e.value.toLowerCase()))?(o.style.display="inline-block",o.textContent="\u0645\u062D\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",o.style.background="#e0f2fe",o.style.color="#0284c7"):e.value?(o.style.display="inline-block",o.textContent="\u0627\u062E\u062A\u064A\u0627\u0631 \u064A\u062F\u0648\u064A",o.style.background="#f1f5f9",o.style.color="#475569"):o.style.display="none")},e.onchange()},S=function(){if(document.getElementById("hseActionClosureModal"))return document.getElementById("hseActionClosureModal");const e=document.createElement("div");e.id="hseActionClosureModal",e.className="emergency-modal-overlay",e.style.display="none",e.innerHTML=`
                <div class="emergency-modal-dialog" style="max-width: 620px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">\u062A\u0648\u062B\u064A\u0642 \u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0648\u0625\u0631\u0641\u0627\u0642 \u0625\u062B\u0628\u0627\u062A \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D (ISO 45001)</p>
                            </div>
                        </div>
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseClosureModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="\u0625\u063A\u0644\u0627\u0642">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 75vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- Obs Summary Card -->
                        <div id="closureObsSummary" style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 16px;">
                            <!-- Dynamic summary injected here -->
                        </div>

                        <!-- Form Inputs -->
                        <form id="frmActionClosure" onsubmit="event.preventDefault(); HseActionClosure.submitClosure();">
                            <!-- Inspector / Verifier Name -->
                            <div style="margin-bottom: 14px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                    <label style="font-size: 0.82rem; font-weight: 800; color: #1e293b; margin: 0;">
                                        \u0627\u0633\u0645 \u0645\u0633\u0624\u0648\u0644 / \u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642: <span style="color:#ef4444;">*</span>
                                    </label>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span id="closureInspectorBadge" style="font-size: 0.68rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; display: none;">\u0645\u062D\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>
                                        <button type="button" onclick="HseActionClosure.populateOfficersDropdown()" title="\u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0641\u064A\u0646" style="background: none; border: none; color: #0284c7; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                                            <i class="fas fa-rotate"></i>
                                            <span>\u062A\u062D\u062F\u064A\u062B</span>
                                        </button>
                                    </div>
                                </div>
                                <select id="closureInspectorName" required style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                    <option value="">\u2014 \u0627\u062E\u062A\u0631 \u0645\u0633\u0624\u0648\u0644 / \u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014</option>
                                </select>
                            </div>

                            <!-- Action Details -->
                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u0646\u0641\u0630 \u0639\u0644\u0649 \u0623\u0631\u0636 \u0627\u0644\u0648\u0627\u0642\u0639: <span style="color:#ef4444;">*</span>
                                </label>
                                <textarea id="closureActionTaken" required rows="3" placeholder="\u0627\u0634\u0631\u062D \u0645\u0627 \u062A\u0645 \u062A\u0646\u0641\u064A\u0630\u0647 \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062E\u0637\u0631 \u0648\u0625\u0632\u0627\u0644\u062A\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B..."
                                          style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; resize: vertical;"></textarea>
                            </div>

                            <!-- After Photo Upload -->
                            <div style="margin-bottom: 18px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    \u0635\u0648\u0631\u0629 \u0625\u062B\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 (\u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D / After Fix Photo): <span style="color:#ef4444;">*</span>
                                </label>
                                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                    <!-- Camera Button -->
                                    <label for="closureCameraInput" style="display: inline-flex; align-items: center; gap: 7px; background: #ecfdf5; border: 1.5px solid #059669; color: #047857; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease;">
                                        <i class="fas fa-camera fa-lg"></i>
                                        <span>\u0627\u0644\u062A\u0642\u0627\u0637 \u0628\u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627</span>
                                    </label>
                                    <input type="file" id="closureCameraInput" accept="image/*" capture="environment" style="display: none;" onchange="HseActionClosure.handlePhotoSelected(event)" />

                                    <!-- Gallery / Studio Button -->
                                    <label for="closureGalleryInput" style="display: inline-flex; align-items: center; gap: 7px; background: #eff6ff; border: 1.5px solid #3b82f6; color: #1d4ed8; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease;">
                                        <i class="fas fa-images fa-lg"></i>
                                        <span>\u0631\u0641\u0639 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u0648\u062F\u064A\u0648</span>
                                    </label>
                                    <input type="file" id="closureGalleryInput" accept="image/*" style="display: none;" onchange="HseActionClosure.handlePhotoSelected(event)" />

                                    <span id="closurePhotoStatus" style="font-size: 0.78rem; color: #64748b; font-weight: 600; margin-right: 4px;">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F</span>
                                </div>

                                <!-- Photo Preview -->
                                <div id="closurePhotoPreviewWrap" style="display: none; margin-top: 10px; position: relative; width: 140px; height: 140px; border-radius: 12px; overflow: hidden; border: 2px solid #059669; box-shadow: 0 2px 8px rgba(5,150,105,0.2);">
                                    <img id="closurePhotoPreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;" alt="\u0645\u0639\u0627\u064A\u0646\u0629 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D" />
                                    <button type="button" onclick="HseActionClosure.removePhoto()" style="position: absolute; top: 5px; left: 5px; background: rgba(239, 68, 68, 0.95); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.3);">&times;</button>
                                </div>
                            </div>

                            <!-- Buttons -->
                            <div style="display: flex; gap: 10px; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                                <button type="button" id="btnCancelClosure" style="padding: 10px 18px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                                    \u0625\u0644\u063A\u0627\u0621
                                </button>
                                <button type="submit" id="btnSubmitClosure" style="padding: 10px 24px; background: linear-gradient(135deg, #059669, #047857); color: #ffffff; border: none; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-check-double"></i>
                                    <span id="lblSubmitClosureText">\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `,document.body.appendChild(e),m=e,e.onclick=n=>{n.target===e&&a()};const i=e.querySelector("#btnCloseClosureModal"),t=e.querySelector("#btnCancelClosure");return i&&(i.onclick=a),t&&(t.onclick=a),e},I=function(e,i=null){const t=S();let n=null;typeof e=="object"&&e!==null?n=e:i&&typeof i=="object"?n=Object.assign({id:String(e||"").trim(),isoCode:String(e||"").trim()},i):n={id:String(e||"OBS-NEW").trim(),refCode:String(e||"").trim()},c=n,l=null;const s=n.isoCode||n.id||n.refCode||"OBS",o=n.site||n.siteName||"\u0645\u0635\u0646\u0639 ICAPP",r=n.place||n.locationName||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645",p=n.riskLevel||n.risk||"\u0645\u062A\u0648\u0633\u0637",u=n.details||n.description||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629",y=t.querySelector("#closureObsSummary");y&&(y.innerHTML=`
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div>
                            <span style="font-size: 0.72rem; color: #64748b; font-weight: 700;">\u0643\u0648\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u0625\u063A\u0644\u0627\u0642\u0647\u0627:</span>
                            <div style="font-size: 1rem; font-weight: 900; color: #047857;">${d(s)}</div>
                        </div>
                        <span style="background: #fee2e2; color: #b91c1c; padding: 3px 10px; border-radius: 20px; font-weight: 800; font-size: 0.75rem;">
                            \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${d(p)}
                        </span>
                    </div>
                    <div style="font-size: 0.8rem; color: #334155; margin-bottom: 4px;">
                        <b>\u0627\u0644\u0645\u0648\u0642\u0639:</b> ${d(o)} - ${d(r)}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">
                        <b>\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062E\u0637\u0631:</b> ${d(u)}
                    </div>
                `),x(),h(),t.style.display="flex",document.body.style.overflow="hidden"},a=function(){m&&(m.style.display="none",document.body.style.overflow="")},k=function(e){const i=e.target.files&&e.target.files[0];if(!i)return;const t=new FileReader;t.onload=n=>{l=n.target.result;const s=document.getElementById("closurePhotoPreviewWrap"),o=document.getElementById("closurePhotoPreviewImg"),r=document.getElementById("closurePhotoStatus");s&&o&&(o.src=l,s.style.display="block"),r&&(r.textContent=`\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0635\u0648\u0631\u0629 (${Math.round(i.size/1024)} KB) \u2705`,r.style.color="#059669")},t.readAsDataURL(i)},h=function(){l=null;const e=document.getElementById("closureCameraInput");e&&(e.value="");const i=document.getElementById("closureGalleryInput");i&&(i.value="");const t=document.getElementById("closurePhotoPreviewWrap");t&&(t.style.display="none");const n=document.getElementById("closurePhotoStatus");n&&(n.textContent="\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F",n.style.color="#64748b")},d=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},m=null,c=null,l=null;async function E(){if(!c)return;const e=document.getElementById("closureInspectorName"),i=document.getElementById("closureActionTaken"),t=document.getElementById("btnSubmitClosure"),n=document.getElementById("lblSubmitClosureText"),s=e?e.value.trim():"",o=i?i.value.trim():"";if(!s||!o){alert("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0641\u0630.");return}if(!l&&!confirm("\u062A\u0646\u0628\u064A\u0647: \u064A\u0641\u0636\u0644 \u0628\u0634\u062F\u0629 \u0625\u0631\u0641\u0627\u0642 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D (\u0645\u0646 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0623\u0648 \u0627\u0644\u0627\u0633\u062A\u0648\u062F\u064A\u0648) \u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0640 ISO. \u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u062F\u0648\u0646 \u0635\u0648\u0631\u0629\u061F"))return;t&&(t.disabled=!0),n&&(n.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0625\u063A\u0644\u0627\u0642...');const r=c.id||c.isoCode||c.refCode,p={action:"submitObservationClosure",id:r,isoCode:r,status:"Closed",closedBy:s,closureNotes:o,afterPhoto:l||"",closedAt:new Date().toISOString()};try{const u=typeof getEffectiveApiUrl=="function"?getEffectiveApiUrl():"/api/exec",y=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});try{const g=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(g){const b=JSON.parse(g);if(Array.isArray(b)){const f=b.find(v=>v.id===r||v.isoCode===r);f&&(f.status="\u0645\u063A\u0644\u0642 (Closed)",f.closedAt=p.closedAt,f.closedBy=s,f.closureNotes=o,localStorage.setItem("HSE_PUBLIC_OBS_LOCAL_HISTORY",JSON.stringify(b)))}}}catch{}alert(`\u2705 \u062A\u0645 \u062A\u0648\u062B\u064A\u0642 \u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (${r}) \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0648\u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0625\u062B\u0628\u0627\u062A.`),a(),typeof executeTrackSearch=="function"&&executeTrackSearch(r),window.HseMyTasks&&typeof window.HseMyTasks.refresh=="function"&&window.HseMyTasks.refresh()}catch{alert(`\u2705 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0645\u062D\u0644\u064A\u0627\u064B (${r}) \u0648\u0633\u062A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0633\u062A\u0642\u0631\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644.`),a(),window.HseMyTasks&&typeof window.HseMyTasks.refresh=="function"&&window.HseMyTasks.refresh()}finally{t&&(t.disabled=!1),n&&(n.innerHTML="\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}}const w={open:I,close:a,populateOfficersDropdown:x,handlePhotoSelected:k,removePhoto:h,submitClosure:E};window.HseActionClosure=w,window.HseClosure=w}catch{}}})();
