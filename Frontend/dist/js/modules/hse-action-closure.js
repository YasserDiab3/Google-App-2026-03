(()=>{"use strict";if(!(typeof window>"u")&&!window.HseActionClosureInitialized){window.HseActionClosureInitialized=!0;try{let k=function(){return window.HseFeatureFlags&&typeof window.HseFeatureFlags.isEnabled=="function"?window.HseFeatureFlags.isEnabled("action_closure_workflow"):!0},v=function(){if(document.getElementById("hseActionClosureModal"))return document.getElementById("hseActionClosureModal");const e=document.createElement("div");e.id="hseActionClosureModal",e.className="emergency-modal-overlay",e.style.display="none",e.innerHTML=`
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
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseClosureModal" title="\u0625\u063A\u0644\u0627\u0642">&times;</button>
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
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    \u0627\u0633\u0645 \u0645\u0633\u0624\u0648\u0644 / \u0641\u0646\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642: <span style="color:#ef4444;">*</span>
                                </label>
                                <input type="text" id="closureInspectorName" required placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645\u0643 \u0623\u0648 \u0631\u0642\u0645\u0643 \u0627\u0644\u0648\u0638\u064A\u0641\u064A..."
                                       style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box;" />
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
                                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                                    <label for="closurePhotoInput" style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1.5px dashed #059669; color: #047857; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">
                                        <i class="fas fa-camera fa-lg"></i>
                                        <span>\u0627\u0644\u062A\u0642\u0627\u0637 / \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D</span>
                                    </label>
                                    <input type="file" id="closurePhotoInput" accept="image/*" capture="environment" style="display: none;" onchange="HseActionClosure.handlePhotoSelected(event)" />
                                    <span id="closurePhotoStatus" style="font-size: 0.78rem; color: #64748b; font-weight: 600;">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F</span>
                                </div>

                                <!-- Photo Preview -->
                                <div id="closurePhotoPreviewWrap" style="display: none; margin-top: 10px; position: relative; width: 140px; height: 140px; border-radius: 12px; overflow: hidden; border: 2px solid #059669;">
                                    <img id="closurePhotoPreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;" alt="\u0645\u0639\u0627\u064A\u0646\u0629 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D" />
                                    <button type="button" onclick="HseActionClosure.removePhoto()" style="position: absolute; top: 4px; left: 4px; background: rgba(239, 68, 68, 0.9); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
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
            `,document.body.appendChild(e),g=e,e.onclick=t=>{t.target===e&&u()};const i=e.querySelector("#btnCloseClosureModal"),o=e.querySelector("#btnCancelClosure");return i&&(i.onclick=u),o&&(o.onclick=u),e},S=function(e,i=null){const o=v();let t=null;typeof e=="object"&&e!==null?t=e:i&&typeof i=="object"?t=Object.assign({id:String(e||"").trim(),isoCode:String(e||"").trim()},i):t={id:String(e||"OBS-NEW").trim(),refCode:String(e||"").trim()},p=t,c=null;const s=t.isoCode||t.id||t.refCode||"OBS",l=t.site||t.siteName||"\u0645\u0635\u0646\u0639 ICAPP",n=t.place||t.locationName||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645",b=t.riskLevel||t.risk||"\u0645\u062A\u0648\u0633\u0637",m=t.details||t.description||"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0645\u0633\u062C\u0644\u0629",x=o.querySelector("#closureObsSummary");x&&(x.innerHTML=`
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div>
                            <span style="font-size: 0.72rem; color: #64748b; font-weight: 700;">\u0643\u0648\u062F \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u0625\u063A\u0644\u0627\u0642\u0647\u0627:</span>
                            <div style="font-size: 1rem; font-weight: 900; color: #047857;">${f(s)}</div>
                        </div>
                        <span style="background: #fee2e2; color: #b91c1c; padding: 3px 10px; border-radius: 20px; font-weight: 800; font-size: 0.75rem;">
                            \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${f(b)}
                        </span>
                    </div>
                    <div style="font-size: 0.8rem; color: #334155; margin-bottom: 4px;">
                        <b>\u0627\u0644\u0645\u0648\u0642\u0639:</b> ${f(l)} - ${f(n)}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">
                        <b>\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0623\u0635\u0644\u064A \u0644\u0644\u062E\u0637\u0631:</b> ${f(m)}
                    </div>
                `);try{const r=sessionStorage.getItem("HSE_FIELD_SESSION")||localStorage.getItem("HSE_LAST_USER_NAME");if(r){let a=null;try{a=JSON.parse(r)}catch{}const d=a&&(a.userName||a.name)||(typeof r=="string"&&!r.startsWith("{")?r:""),y=o.querySelector("#closureInspectorName");y&&d&&(y.value=d)}}catch{}h(),o.style.display="flex",document.body.style.overflow="hidden"},u=function(){g&&(g.style.display="none",document.body.style.overflow="")},C=function(e){const i=e.target.files&&e.target.files[0];if(!i)return;const o=new FileReader;o.onload=t=>{c=t.target.result;const s=document.getElementById("closurePhotoPreviewWrap"),l=document.getElementById("closurePhotoPreviewImg"),n=document.getElementById("closurePhotoStatus");s&&l&&(l.src=c,s.style.display="block"),n&&(n.textContent=`\u062A\u0645 \u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 (${Math.round(i.size/1024)} KB)`,n.style.color="#059669")},o.readAsDataURL(i)},h=function(){c=null;const e=document.getElementById("closurePhotoInput");e&&(e.value="");const i=document.getElementById("closurePhotoPreviewWrap");i&&(i.style.display="none");const o=document.getElementById("closurePhotoStatus");o&&(o.textContent="\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F",o.style.color="#64748b")},f=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""},g=null,p=null,c=null;async function I(){if(!p)return;const e=document.getElementById("closureInspectorName"),i=document.getElementById("closureActionTaken"),o=document.getElementById("btnSubmitClosure"),t=document.getElementById("lblSubmitClosureText"),s=e?e.value.trim():"",l=i?i.value.trim():"";if(!s||!l){alert("\u064A\u0631\u062C\u0649 \u0643\u062A\u0627\u0628\u0629 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0641\u0630.");return}if(!c&&!confirm("\u062A\u0646\u0628\u064A\u0647: \u064A\u0641\u0636\u0644 \u0628\u0634\u062F\u0629 \u0625\u0631\u0641\u0627\u0642 \u0635\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D \u0644\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0640 ISO. \u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u062F\u0648\u0646 \u0635\u0648\u0631\u0629\u061F"))return;o&&(o.disabled=!0),t&&(t.innerHTML='<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0625\u063A\u0644\u0627\u0642...');const n=p.id||p.isoCode||p.refCode,b={action:"submitObservationClosure",id:n,isoCode:n,status:"Closed",closedBy:s,closureNotes:l,afterPhoto:c||"",closedAt:new Date().toISOString()};try{const m=typeof getEffectiveApiUrl=="function"?getEffectiveApiUrl():"/api/exec",x=await fetch(m,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});try{const r=localStorage.getItem("HSE_PUBLIC_OBS_LOCAL_HISTORY");if(r){const a=JSON.parse(r);if(Array.isArray(a)){const d=a.find(y=>y.id===n||y.isoCode===n);d&&(d.status="\u0645\u063A\u0644\u0642 (Closed)",d.closedAt=b.closedAt,d.closedBy=s,d.closureNotes=l,localStorage.setItem("HSE_PUBLIC_OBS_LOCAL_HISTORY",JSON.stringify(a)))}}}catch{}alert(`\u2705 \u062A\u0645 \u062A\u0648\u062B\u064A\u0642 \u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 (${n}) \u0628\u0646\u062C\u0627\u062D! \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0648\u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0625\u062B\u0628\u0627\u062A.`),u(),typeof executeTrackSearch=="function"&&executeTrackSearch(n),window.HseMyTasks&&typeof window.HseMyTasks.refresh=="function"&&window.HseMyTasks.refresh()}catch{alert(`\u2705 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0645\u062D\u0644\u064A\u0627\u064B (${n}) \u0648\u0633\u062A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0633\u062A\u0642\u0631\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644.`),u(),window.HseMyTasks&&typeof window.HseMyTasks.refresh=="function"&&window.HseMyTasks.refresh()}finally{o&&(o.disabled=!1),t&&(t.innerHTML="\u0627\u0639\u062A\u0645\u0627\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629")}}const w={open:S,close:u,handlePhotoSelected:C,removePhoto:h,submitClosure:I};window.HseActionClosure=w,window.HseClosure=w}catch{}}})();
