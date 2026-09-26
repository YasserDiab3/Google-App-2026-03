const HseFeatureFlags=(()=>{"use strict";const h="HSE_FEATURE_FLAGS_OVERRIDES",k="hse-feature-flag-changed",c={voice_dictation:{id:"voice_dictation",default:!1,badge:"BETA",badgeColor:"#8b5cf6",category:"ai_smart",labelAr:"\u0627\u0644\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u0635\u0648\u062A\u064A \u0628\u062F\u0648\u0646 \u064A\u062F\u064A\u0646 (Voice Dictation)",labelEn:"Hands-Free Voice Dictation",descAr:"\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0643\u0644\u0627\u0645 \u0627\u0644\u0635\u0648\u062A\u064A \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0643\u062A\u0648\u0628\u0629 \u0641\u064A \u0643\u0634\u0641 \u0627\u0644\u0645\u0631\u0648\u0631 \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0641\u064A \u0627\u0644\u0628\u064A\u0626\u0627\u062A \u0627\u0644\u0635\u0639\u0628\u0629 \u0648\u062B\u0644\u0627\u062C\u0627\u062A \u0627\u0644\u062A\u062C\u0645\u064A\u062F.",descEn:"Transcribe spoken words into text observations in daily safety checklist and forms."},image_smart_compress:{id:"image_smart_compress",default:!0,badge:"NEW",badgeColor:"#10b981",category:"ux_performance",labelAr:"\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0630\u0643\u064A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0635\u0648\u0631 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627",labelEn:"Smart Auto Image Compression",descAr:"\u0636\u063A\u0637 \u0635\u0648\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0642\u0628\u0644 \u0627\u0644\u0631\u0641\u0639 \u0644\u062A\u0633\u0631\u064A\u0639 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0648\u062A\u0648\u0641\u064A\u0631 \u0628\u0627\u0642\u0629 \u0627\u0644\u0647\u0627\u062A\u0641 \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0630\u0627\u062A \u0627\u0644\u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0636\u0639\u064A\u0641\u0629.",descEn:"Compresses photos on device before upload to speed up field submissions in low-signal areas."},glossary_overlay:{id:"glossary_overlay",default:!0,badge:"NEW",badgeColor:"#0ea5e9",category:"ux_performance",labelAr:"\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0641\u0646\u064A \u0644\u0645\u0631\u0627\u0642\u0628\u064A \u0648\u0641\u0646\u064A\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (Technical Standards Guide)",labelEn:"HSE Field Technical Standards Guide",descAr:"\u0645\u0631\u062C\u0639 \u0641\u0646\u064A \u0645\u064A\u062F\u0627\u0646\u064A \u0633\u0631\u064A\u0639 \u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 (OSHA/ISO) \u0648\u062D\u0633\u0645 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0648\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0644\u0648\u062A\u0648.",descEn:"Instant field compliance reference for risk scoring, inspection criteria, LOTO, and PTW standards."},multilingual_ur:{id:"multilingual_ur",default:!1,badge:"EXPERIMENTAL",badgeColor:"#f59e0b",category:"localization",labelAr:"\u0644\u063A\u0629 \u0627\u0644\u0623\u0648\u0631\u062F\u0648 (Urdu) \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",labelEn:"Urdu Language for Field Contractors",descAr:"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0623\u0648\u0631\u062F\u0648 \u0643\u062E\u064A\u0627\u0631 \u0644\u063A\u0629 \u062B\u0627\u0644\u062B\u0629 \u0625\u0644\u0649 \u062C\u0627\u0646\u0628 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0641\u064A \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0648\u062C\u0644\u0633\u0627\u062A TBT.",descEn:"Adds Urdu as a third language option alongside Arabic and English for contractor safety inductions."},quick_qr_scanner:{id:"quick_qr_scanner",default:!0,badge:"STABLE",badgeColor:"#2563eb",category:"inspection",labelAr:"\u0627\u0644\u0645\u0627\u0633\u062D \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0643\u0648\u062F QR \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0644\u0644\u0645\u0639\u062F\u0627\u062A",labelEn:"Quick Equipment QR Scanner",descAr:"\u0625\u062A\u0627\u062D\u0629 \u0632\u0631 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0644\u0645\u0633\u062D \u0643\u0648\u062F QR \u0627\u0644\u0645\u0644\u0635\u0642 \u0639\u0644\u0649 \u0627\u0644\u0637\u0641\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0644\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064B.",descEn:"Enables camera QR scanning on equipment & extinguishers to jump straight to their inspection form."},action_closure_workflow:{id:"action_closure_workflow",default:!1,badge:"BETA",badgeColor:"#ec4899",category:"inspection",labelAr:"\u062D\u0644\u0642\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 (Action Closure)",labelEn:"Critical Action Closure Workflow",descAr:'\u0625\u062A\u0627\u062D\u0629 \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 "\u0628\u0639\u062F \u0627\u0644\u0625\u0635\u0644\u0627\u062D" \u0648\u062A\u0648\u062B\u064A\u0642 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0630\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0639\u0627\u0644\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629.',descEn:'Allows uploading "after fix" photos and marking high-risk observations as closed.'},offline_queue_inspector:{id:"offline_queue_inspector",default:!0,badge:"STABLE",badgeColor:"#10b981",category:"ux_performance",labelAr:"\u0634\u0631\u064A\u0637 \u0641\u062D\u0635 \u0648\u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0623\u0648\u0641\u0644\u0627\u064A\u0646",labelEn:"Offline Records Inspector & Sync Bar",descAr:"\u0625\u0638\u0647\u0627\u0631 \u0645\u0624\u0634\u0631 \u062A\u0641\u0627\u0639\u0644\u064A \u0628\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0641\u064A \u0648\u0636\u0639 \u0639\u062F\u0645 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0645\u0639 \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629.",descEn:"Shows live count of pending offline records with manual immediate sync trigger."},strict_signature_audit:{id:"strict_signature_audit",default:!0,badge:"STABLE",badgeColor:"#059669",category:"security_audit",labelAr:"\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0635\u0627\u0631\u0645 \u0644\u0644\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0631\u0642\u0645\u064A \u0648\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0629",labelEn:"Strict Digital Signature & Shift Audit",descAr:"\u0645\u0646\u0639 \u0625\u0631\u0633\u0627\u0644 \u0623\u064A \u062A\u0642\u0631\u064A\u0631 \u0645\u0631\u0648\u0631 \u0623\u0648 \u062A\u0641\u062A\u064A\u0634 \u0628\u062F\u0648\u0646 \u062A\u0648\u0642\u064A\u0639 \u064A\u062F\u0648\u064A \u0645\u0643\u062A\u0645\u0644 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0637\u0627\u0628\u0639 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u0645\u0648\u062B\u0642.",descEn:"Enforces complete touch signature and audit timestamps on all inspection submissions."}},S={ai_smart:{ar:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629",en:"AI & Smart Features",icon:"fa-brain"},ux_performance:{ar:"\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0633\u0631\u0639\u0629 \u0627\u0644\u0623\u062F\u0627\u0621",en:"UX & Performance",icon:"fa-bolt"},inspection:{ar:"\u0627\u0644\u062A\u0641\u062A\u064A\u0634 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629",en:"Field Inspection",icon:"fa-clipboard-check"},localization:{ar:"\u0627\u0644\u0644\u063A\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0637\u064A\u0646",en:"Languages & Localization",icon:"fa-language"},security_audit:{ar:"\u0627\u0644\u062D\u0648\u0643\u0645\u0629 \u0648\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A",en:"Governance & Audit",icon:"fa-shield-halved"}};function u(){try{const e=localStorage.getItem(h);return e?JSON.parse(e):{}}catch{return{}}}function A(e){try{localStorage.setItem(h,JSON.stringify(e))}catch{}}function $(){const e={};try{if(typeof window>"u"||!window.location||!window.location.search)return e;const o=new URLSearchParams(window.location.search);(o.get("ff_reset")==="1"||o.get("ff_reset")==="true")&&localStorage.removeItem(h),o.forEach((t,r)=>{if(r.startsWith("ff_")){const s=r.substring(3);c[s]&&(e[s]=t==="1"||t==="true"||t==="yes")}})}catch{}return e}const b=$();function g(e,o=!1){if(!e)return o;if(Object.prototype.hasOwnProperty.call(b,e))return!!b[e];const t=u();return Object.prototype.hasOwnProperty.call(t,e)?!!t[e]:c[e]?!!c[e].default:o}function _(e,o){if(!c[e])return;const t=u();t[e]=!!o,A(t),E(e,t[e])}function T(e){const o=g(e);return _(e,!o),!o}function z(e){const o=u();Object.prototype.hasOwnProperty.call(o,e)&&(delete o[e],A(o),E(e,g(e)))}function F(){try{localStorage.removeItem(h)}catch{}Object.keys(c).forEach(e=>{E(e,c[e].default)})}function O(){const e=u();return Object.keys(c).map(o=>{const t=c[o],r=Object.prototype.hasOwnProperty.call(e,o)||Object.prototype.hasOwnProperty.call(b,o),s=g(o);return{...t,enabled:s,isOverridden:r,source:Object.prototype.hasOwnProperty.call(b,o)?"url":Object.prototype.hasOwnProperty.call(e,o)?"local":"default"}})}function R(e,o){if(typeof window>"u"||typeof o!="function")return()=>{};const t=r=>{if(!r||!r.detail)return;const{flagId:s,enabled:i}=r.detail;(e==="*"||e===s)&&o(i,s)};return window.addEventListener(k,t),()=>window.removeEventListener(k,t)}function E(e,o){if(typeof window<"u"&&typeof window.dispatchEvent=="function")try{window.dispatchEvent(new CustomEvent(k,{detail:{flagId:e,enabled:o,timestamp:Date.now()}}))}catch{}}let d=null;function B(){if(d&&document.body.contains(d))return d;const e=document.documentElement.dir==="rtl"||!document.documentElement.dir,t=(localStorage.getItem("HSE_PORTAL_LANG")||"ar")==="ar",r=document.createElement("div");r.id="hseFeatureFlagsModal",r.className="hse-ff-modal-backdrop",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
            <div class="hse-ff-modal-container">
                <div class="hse-ff-modal-header">
                    <div class="hse-ff-header-title-wrap">
                        <div class="hse-ff-header-icon"><i class="fas fa-sliders"></i></div>
                        <div>
                            <h3 class="hse-ff-title">${t?"\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629":"Feature Flags Control Panel"}</h3>
                            <p class="hse-ff-subtitle">${t?"\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0641\u0639\u064A\u0644 \u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0628\u0645\u0631\u0648\u0646\u0629 \u0641\u0648\u0631\u064A\u0629":"Manage & toggle experimental portal features in real-time"}</p>
                        </div>
                    </div>
                    <button type="button" class="hse-ff-close-btn" id="hseFfCloseBtn" title="${t?"\u0625\u063A\u0644\u0627\u0642":"Close"}">&times;</button>
                </div>

                <div class="hse-ff-search-bar">
                    <i class="fas fa-search hse-ff-search-icon"></i>
                    <input type="text" id="hseFfSearchInput" class="hse-ff-search-input" placeholder="${t?"\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0623\u0648 \u0627\u0644\u0641\u0626\u0627\u062A...":"Search features or categories..."}" />
                    <button type="button" id="hseFfResetAllBtn" class="hse-ff-btn-secondary" title="${t?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u062A":"Reset All to Defaults"}">
                        <i class="fas fa-rotate-left"></i> <span>${t?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"Reset Defaults"}</span>
                    </button>
                </div>

                <div class="hse-ff-modal-body" id="hseFfListContainer">
                    <!-- \u0633\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0628\u0646\u0648\u062F \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0647\u0646\u0627 -->
                </div>

                <div class="hse-ff-modal-footer">
                    <div class="hse-ff-footer-info">
                        <span class="hse-ff-status-pill"><i class="fas fa-code-branch"></i> ICAPP v1.0.1751</span>
                        <span style="font-size: 11.5px; color: #64748b;">${t?"\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062A\u064F\u062D\u0641\u0638 \u0641\u0648\u0631\u064A\u0627\u064B \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D":"Changes apply immediately to this browser"}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="hse-ff-btn-primary" id="hseFfDoneBtn">
                            <i class="fas fa-check"></i> <span>${t?"\u062A\u0645 \u0648\u062D\u0641\u0638":"Done & Apply"}</span>
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(r),d=r;const s=r.querySelector("#hseFfCloseBtn"),i=r.querySelector("#hseFfDoneBtn"),l=r.querySelector("#hseFfResetAllBtn"),p=r.querySelector("#hseFfSearchInput");return s&&(s.onclick=y),i&&(i.onclick=()=>{y(),typeof window.showToast=="function"&&window.showToast(t?"\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0628\u0646\u062C\u0627\u062D":"Feature settings applied successfully","success")}),l&&(l.onclick=()=>{confirm(t?"\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u061F":"Reset all features to system defaults?")&&(F(),m())}),p&&(p.oninput=()=>{m(p.value.trim().toLowerCase())}),r.onclick=a=>{a.target===r&&y()},r}function m(e=""){const o=document.getElementById("hseFfListContainer");if(!o)return;const r=(localStorage.getItem("HSE_PORTAL_LANG")||"ar")==="ar",s=O(),i={};Object.keys(S).forEach(a=>{i[a]=[]}),s.forEach(a=>{const f=a.category||"ux_performance";i[f]||(i[f]=[]),!(e&&!`${a.id} ${a.labelAr} ${a.labelEn} ${a.descAr} ${a.descEn}`.toLowerCase().includes(e))&&i[f].push(a)});let l="",p=0;Object.keys(i).forEach(a=>{const f=i[a];if(!f||f.length===0)return;p+=f.length;const v=S[a]||{ar:a,en:a,icon:"fa-folder"};l+=`
                <div class="hse-ff-category-group">
                    <div class="hse-ff-category-header">
                        <i class="fas ${v.icon}"></i>
                        <span>${r?v.ar:v.en}</span>
                        <span class="hse-ff-cat-badge">${f.length}</span>
                    </div>
                    <div class="hse-ff-items-wrap">
            `,f.forEach(n=>{const P=n.enabled?"checked":"",D=r?n.labelAr:n.labelEn,q=r?n.descAr:n.descEn;let L="";n.isOverridden&&(L=`
                        <span class="hse-ff-override-pill" title="${r?"\u062A\u0645 \u062A\u0639\u062F\u064A\u0644\u0647\u0627 \u0645\u062D\u0644\u064A\u0627\u064B":"Locally overridden"}">
                            ${r?"\u0645\u064F\u0639\u062F\u0644 \u0645\u062D\u0644\u064A\u0627\u064B":"Overridden"}
                        </span>
                        <button type="button" class="hse-ff-revert-btn" onclick="HseFeatureFlags.reset('${n.id}'); HseFeatureFlags.refreshUi();" title="${r?"\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A":"Reset to default"}">
                            <i class="fas fa-undo"></i>
                        </button>
                    `),l+=`
                    <div class="hse-ff-card ${n.enabled?"is-active":""}">
                        <div class="hse-ff-card-info">
                            <div class="hse-ff-card-top">
                                <span class="hse-ff-card-title">${D}</span>
                                <span class="hse-ff-badge" style="background-color: ${n.badgeColor||"#3b82f6"};">${n.badge}</span>
                                ${L}
                            </div>
                            <div class="hse-ff-card-desc">${q}</div>
                            <div class="hse-ff-card-key"><code>${n.id}</code> (Default: <strong>${n.default?"ON":"OFF"}</strong>)</div>
                        </div>
                        <div class="hse-ff-card-action">
                            <label class="hse-ff-switch">
                                <input type="checkbox" ${P} onchange="HseFeatureFlags.set('${n.id}', this.checked); HseFeatureFlags.refreshUi();" />
                                <span class="hse-ff-slider"></span>
                            </label>
                        </div>
                    </div>
                `}),l+=`
                    </div>
                </div>
            `}),p===0&&(l=`
                <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                    <i class="fas fa-search" style="font-size: 2.2rem; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p style="font-size: 14px; font-weight: 700; margin: 0;">${r?"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u064A\u0632\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0628\u062D\u062B":"No matching features found"}</p>
                </div>
            `),o.innerHTML=l}function x(){j();const e=B();m(),e.classList.add("is-open"),document.body.style.overflow="hidden"}function y(){d&&(d.classList.remove("is-open"),document.body.style.overflow="")}function H(){if(d&&d.classList.contains("is-open")){const e=d.querySelector("#hseFfSearchInput");m(e?e.value.trim().toLowerCase():"")}}function j(){if(document.getElementById("hseFeatureFlagsStyles"))return;const e=`
            /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 HSE Feature Flags Styles \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
            .hse-ff-modal-backdrop {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.25s ease, visibility 0.25s ease;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
            }
            .hse-ff-modal-backdrop.is-open {
                opacity: 1;
                visibility: visible;
            }
            .hse-ff-modal-container {
                background: #ffffff;
                color: #0f172a;
                border-radius: 18px;
                width: 100%;
                max-width: 680px;
                max-height: 88vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(226, 232, 240, 0.8);
                overflow: hidden;
                transform: scale(0.96);
                transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .hse-ff-modal-backdrop.is-open .hse-ff-modal-container {
                transform: scale(1);
            }
            [data-theme="dark"] .hse-ff-modal-container {
                background: #0f172a;
                color: #f8fafc;
                border-color: #334155;
            }
            .hse-ff-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid #e2e8f0;
                background: #f8fafc;
            }
            [data-theme="dark"] .hse-ff-modal-header {
                background: #1e293b;
                border-color: #334155;
            }
            .hse-ff-header-title-wrap {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .hse-ff-header-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.15rem;
                box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            }
            .hse-ff-title {
                margin: 0;
                font-size: 1.05rem;
                font-weight: 800;
                line-height: 1.3;
            }
            .hse-ff-subtitle {
                margin: 2px 0 0;
                font-size: 0.78rem;
                color: #64748b;
                line-height: 1.3;
            }
            [data-theme="dark"] .hse-ff-subtitle { color: #94a3b8; }
            .hse-ff-close-btn {
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #94a3b8;
                cursor: pointer;
                line-height: 1;
                padding: 0 6px;
                border-radius: 8px;
                transition: color 0.15s, background-color 0.15s;
            }
            .hse-ff-close-btn:hover {
                color: #dc2626;
                background: #fee2e2;
            }
            [data-theme="dark"] .hse-ff-close-btn:hover { background: #450a0a; color: #f87171; }
            .hse-ff-search-bar {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 20px;
                background: #ffffff;
                border-bottom: 1px solid #f1f5f9;
            }
            [data-theme="dark"] .hse-ff-search-bar {
                background: #0f172a;
                border-color: #1e293b;
            }
            .hse-ff-search-icon {
                color: #94a3b8;
                font-size: 0.95rem;
            }
            .hse-ff-search-input {
                flex: 1;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                padding: 7px 12px;
                font-size: 0.85rem;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .hse-ff-search-input:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            [data-theme="dark"] .hse-ff-search-input {
                background: #1e293b;
                border-color: #475569;
                color: #f8fafc;
            }
            .hse-ff-btn-secondary {
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                transition: all 0.2s;
            }
            .hse-ff-btn-secondary:hover {
                background: #e2e8f0;
                color: #0f172a;
            }
            [data-theme="dark"] .hse-ff-btn-secondary {
                background: #1e293b;
                color: #cbd5e1;
                border-color: #334155;
            }
            [data-theme="dark"] .hse-ff-btn-secondary:hover {
                background: #334155;
                color: #ffffff;
            }
            .hse-ff-modal-body {
                flex: 1;
                overflow-y: auto;
                padding: 16px 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .hse-ff-category-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .hse-ff-category-header {
                font-size: 0.82rem;
                font-weight: 800;
                color: #475569;
                display: flex;
                align-items: center;
                gap: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            [data-theme="dark"] .hse-ff-category-header { color: #94a3b8; }
            .hse-ff-cat-badge {
                font-size: 0.7rem;
                background: #e2e8f0;
                color: #475569;
                padding: 1px 7px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-cat-badge { background: #334155; color: #cbd5e1; }
            .hse-ff-items-wrap {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .hse-ff-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 12px 14px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
            }
            .hse-ff-card:hover {
                border-color: #93c5fd;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            }
            .hse-ff-card.is-active {
                border-left: 3px solid #10b981;
            }
            [data-theme="dark"] .hse-ff-card {
                background: #1e293b;
                border-color: #334155;
            }
            [data-theme="dark"] .hse-ff-card:hover { border-color: #60a5fa; }
            .hse-ff-card-info {
                flex: 1;
                min-width: 0;
            }
            .hse-ff-card-top {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 3px;
            }
            .hse-ff-card-title {
                font-size: 0.9rem;
                font-weight: 800;
                color: #0f172a;
            }
            [data-theme="dark"] .hse-ff-card-title { color: #f8fafc; }
            .hse-ff-badge {
                font-size: 0.65rem;
                font-weight: 800;
                color: #ffffff;
                padding: 2px 6px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .hse-ff-override-pill {
                font-size: 0.68rem;
                font-weight: 700;
                background: #fef3c7;
                color: #b45309;
                border: 1px solid #fde68a;
                padding: 1px 7px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-override-pill {
                background: #451a03;
                color: #fcd34d;
                border-color: #78350f;
            }
            .hse-ff-revert-btn {
                background: none;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 2px 5px;
                font-size: 0.78rem;
                border-radius: 4px;
            }
            .hse-ff-revert-btn:hover { color: #dc2626; background: #fee2e2; }
            .hse-ff-card-desc {
                font-size: 0.78rem;
                color: #475569;
                line-height: 1.4;
                margin-bottom: 4px;
            }
            [data-theme="dark"] .hse-ff-card-desc { color: #94a3b8; }
            .hse-ff-card-key {
                font-size: 0.72rem;
                color: #94a3b8;
            }
            .hse-ff-card-key code {
                font-family: monospace;
                background: #f1f5f9;
                padding: 1px 5px;
                border-radius: 4px;
                color: #2563eb;
            }
            [data-theme="dark"] .hse-ff-card-key code {
                background: #0f172a;
                color: #60a5fa;
            }
            /* iOS-style toggle switch */
            .hse-ff-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
                flex-shrink: 0;
            }
            .hse-ff-switch input { opacity: 0; width: 0; height: 0; }
            .hse-ff-slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #cbd5e1;
                transition: .25s;
                border-radius: 24px;
            }
            [data-theme="dark"] .hse-ff-slider { background-color: #475569; }
            .hse-ff-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .25s;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            .hse-ff-switch input:checked + .hse-ff-slider {
                background-color: #10b981;
            }
            .hse-ff-switch input:checked + .hse-ff-slider:before {
                transform: translateX(20px);
            }
            .hse-ff-modal-footer {
                padding: 12px 20px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                flex-wrap: wrap;
            }
            [data-theme="dark"] .hse-ff-modal-footer {
                background: #1e293b;
                border-color: #334155;
            }
            .hse-ff-footer-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .hse-ff-status-pill {
                font-size: 0.72rem;
                font-weight: 700;
                background: #eff6ff;
                color: #1d4ed8;
                border: 1px solid #bfdbfe;
                padding: 2px 8px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-status-pill {
                background: #172554;
                color: #93c5fd;
                border-color: #1e3a8a;
            }
            .hse-ff-btn-primary {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: #ffffff;
                border: none;
                padding: 8px 18px;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 800;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
                transition: transform 0.15s, box-shadow 0.15s;
            }
            .hse-ff-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
            }
        `,o=document.createElement("style");o.id="hseFeatureFlagsStyles",o.textContent=e,document.head.appendChild(o)}function C(){if(typeof window>"u")return;window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.shiftKey&&(t.key==="F"||t.key==="f")&&(t.preventDefault(),x())});let e=0,o=0;document.addEventListener("click",t=>{if(!t.target.closest(".footer-version-pill, .tbt-version-pill, .header-title, #hubTitle, [data-ff-trigger]"))return;const s=Date.now();s-o<600?e++:e=1,o=s,e>=5&&(e=0,x())});try{const t=new URLSearchParams(window.location.search);(t.get("show_flags")==="1"||t.get("admin_flags")==="1")&&setTimeout(x,400)}catch{}}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C());const w={isEnabled:g,set:_,toggle:T,reset:z,resetAll:F,getAll:O,subscribe:R,openSettingsModal:x,closeSettingsModal:y,refreshUi:H,MASTER_FLAGS:c};return typeof window<"u"&&(window.HseFeatureFlags=w,window.FeatureFlags=w,window.HSE_FLAGS=w),w})();
