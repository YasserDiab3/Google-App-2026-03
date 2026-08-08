const PHYSICAL_SHAPES=["Powder","Flakes","Pellets","Liquid","Lubricant","Oil","Gel","Gas","Spray"],PURPOSE_OF_USE_OPTIONS=["Electrical panels cleaners","CIP","Water Treatment","Conveyors lubricants","Data Coding","Boilers additives","BW Recovery","BW additives","Cleaning Agent","Pesticide","Lubricants","Fuels","Lab chemicals","Microbiology Media","Cooling Gases","Ingredients","Stationary"],LOCAL_IMPORT_OPTIONS=["Local","Import"],GHS_PICTOGRAMS=[{key:"environment",labelAr:"\u062E\u0637\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0626\u0629",svg:`
            <svg viewBox="0 0 100 100" width="74" height="74" aria-hidden="true" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">
                <polygon points="50,3 97,50 50,97 3,50" fill="#FFFFFF" stroke="#FF0000" stroke-width="6" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- ground -->
                <line x1="22" y1="72" x2="78" y2="72" stroke="#000000" stroke-width="3" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- tree -->
                <path d="M44 70 L44 46" stroke="#000000" stroke-width="4" stroke-linecap="round" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M44 46 C36 44, 32 36, 36 30 C40 24, 52 24, 56 30 C60 36, 56 44, 48 46 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- fish -->
                <path d="M60 68 C66 66, 70 62, 73 58 C76 62, 80 66, 86 68 C80 70, 76 74, 73 78 C70 74, 66 70, 60 68 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <circle cx="69" cy="66" r="1.8" fill="#FFFFFF" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
            </svg>
        `.trim()},{key:"corrosion",labelAr:"\u0645\u0627\u062F\u0629 \u0622\u0643\u0644\u0629",svg:`
            <svg viewBox="0 0 100 100" width="74" height="74" aria-hidden="true" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">
                <polygon points="50,3 97,50 50,97 3,50" fill="#FFFFFF" stroke="#FF0000" stroke-width="6" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- test tube 1 -->
                <path d="M30 28 L42 28 L39 58 C38 66,34 70,30 70 C26 70,22 66,23 58 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <rect x="28" y="24" width="16" height="6" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- test tube 2 -->
                <path d="M52 28 L64 28 L61 52 C60 60,56 64,52 64 C48 64,44 60,45 52 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <rect x="50" y="24" width="16" height="6" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- drops -->
                <path d="M40 62 C41 60,42 58,42 56 C42 58,43 60,44 62 C45 64,44 66,42 66 C40 66,39 64,40 62 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M62 56 C63 54,64 52,64 50 C64 52,65 54,66 56 C67 58,66 60,64 60 C62 60,61 58,62 56 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- corrosion lines -->
                <line x1="36" y1="70" x2="50" y2="70" stroke="#000000" stroke-width="3" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <line x1="56" y1="64" x2="74" y2="64" stroke="#000000" stroke-width="3" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <line x1="58" y1="70" x2="82" y2="70" stroke="#000000" stroke-width="3" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
            </svg>
        `.trim()},{key:"skull",labelAr:"\u0633\u0627\u0645 (\u0633\u0645\u0651\u064A\u0629 \u062D\u0627\u062F\u0629)",svg:`
            <svg viewBox="0 0 100 100" width="74" height="74" aria-hidden="true" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">
                <polygon points="50,3 97,50 50,97 3,50" fill="#FFFFFF" stroke="#FF0000" stroke-width="6" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M50 28 C38 28,30 36,30 48 C30 57,35 62,40 64 L40 72 L60 72 L60 64 C65 62,70 57,70 48 C70 36,62 28,50 28 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <circle cx="42" cy="46" r="6" fill="#FFFFFF" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <circle cx="58" cy="46" r="6" fill="#FFFFFF" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <rect x="46" y="54" width="8" height="6" rx="2" fill="#FFFFFF" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <!-- crossbones -->
                <path d="M28 76 L72 56" stroke="#000000" stroke-width="6" stroke-linecap="round" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M28 56 L72 76" stroke="#000000" stroke-width="6" stroke-linecap="round" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
            </svg>
        `.trim()},{key:"flame",labelAr:"\u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644",svg:`
            <svg viewBox="0 0 100 100" width="74" height="74" aria-hidden="true" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">
                <polygon points="50,3 97,50 50,97 3,50" fill="#FFFFFF" stroke="#FF0000" stroke-width="6" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M52 24 C58 34,52 38,60 46 C67 53,66 64,58 72 C52 78,42 78,36 72 C28 64,30 52,40 44 C45 40,44 34,48 30 C49 34,52 36,52 24 Z" fill="#000000" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <path d="M48 54 C52 58,50 60,54 64 C56 66,56 70,52 72 C48 74,44 72,42 68 C40 64,42 60,46 58 C47 57,48 56,48 54 Z" fill="#FFFFFF" opacity="0.3" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
                <line x1="30" y1="76" x2="70" y2="76" stroke="#000000" stroke-width="4" style="-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;"/>
            </svg>
        `.trim()}],ChemicalSafety={currentEditId:null,filters:{search:"",department:"",physicalShape:"",classification:""},msdsFiles:{arabic:null,english:null},_eventListenersAbortController:null,_setupTimeoutId:null,_chemicalDataLoadPromise:null,_chemicalBackendFetchOk:!1,_injectChemicalIdentityStyles(){try{if(document.getElementById("chemical-professional-identity-styles"))return;const e=document.createElement("style");e.id="chemical-professional-identity-styles",e.textContent=`
                #chemical-safety-section .chem-id-hero {
                    --c-navy: #0b2a55;
                    --c-blue: #1e40af;
                    --c-blue2: #2563eb;
                }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u062A\u0631\u0648\u064A\u0633\u0629 \u0627\u0644\u0645\u062F\u064A\u0648\u0644 (Hero) */
                #chemical-safety-section .chem-id-hero {
                    position: relative; overflow: hidden;
                    display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
                    padding: 20px 24px; border-radius: 18px; color: #fff;
                    background: linear-gradient(130deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
                    box-shadow: 0 14px 34px rgba(11,42,85,.25);
                }
                #chemical-safety-section .chem-id-hero::after {
                    content: ""; position: absolute; inset-inline-end: -64px; top: -96px;
                    width: 220px; height: 220px; border: 30px solid rgba(255,255,255,.05); border-radius: 50%; pointer-events: none;
                }
                #chemical-safety-section .chem-id-hero::before {
                    content: ""; position: absolute; inset-inline-start: 38%; bottom: -70px;
                    width: 150px; height: 150px; border: 20px solid rgba(255,255,255,.04); border-radius: 50%; pointer-events: none;
                }
                #chemical-safety-section .chem-id-hero__copy { position: relative; z-index: 1; display: flex; align-items: center; gap: 15px; min-width: min(100%, 340px); }
                #chemical-safety-section .chem-id-hero__icon {
                    flex: 0 0 auto; width: 54px; height: 54px; display: grid; place-items: center;
                    border: 1px solid rgba(255,255,255,.24); border-radius: 15px; background: rgba(255,255,255,.12); font-size: 23px; color: #fde68a;
                }
                #chemical-safety-section .chem-id-hero__eyebrow { display: block; margin-bottom: 4px; color: #bfdbfe; font-size: .68rem; font-weight: 800; letter-spacing: .04em; }
                #chemical-safety-section .chem-id-hero h1 { margin: 0; color: #fff; font-size: 1.3rem; font-weight: 900; line-height: 1.35; }
                #chemical-safety-section .chem-id-hero p { margin: 5px 0 0; color: #dbeafe; font-size: .78rem; }
                #chemical-safety-section .chem-id-hero__meta { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #chemical-safety-section .chem-id-hero__meta span {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px;
                    border: 1px solid rgba(255,255,255,.22); border-radius: 10px; background: rgba(255,255,255,.1);
                    font-size: .72rem; font-weight: 750; white-space: nowrap;
                }
                #chemical-safety-section .chem-id-hero__meta span i { color: #93c5fd; }
                #chemical-safety-section .chem-id-hero__actions { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                #chemical-safety-section .chem-id-hero__actions .btn-primary {
                    background: linear-gradient(135deg,#fbbf24,#f59e0b); color: #7c2d12; border: none; font-weight: 800;
                    box-shadow: 0 6px 18px rgba(0,0,0,.18);
                }
                #chemical-safety-section .chem-id-hero__actions .btn-secondary {
                    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; font-weight: 700;
                }
                #chemical-safety-section .chem-id-hero__actions .btn-secondary:hover { background: rgba(255,255,255,.2); color: #fff; }
                @media (max-width: 820px) {
                    #chemical-safety-section .chem-id-hero { padding: 18px; }
                    #chemical-safety-section .chem-id-hero__copy { align-items: flex-start; }
                    #chemical-safety-section .chem-id-hero__icon { width: 46px; height: 46px; font-size: 19px; }
                    #chemical-safety-section .chem-id-hero h1 { font-size: 1.05rem; }
                    #chemical-safety-section .chem-id-hero__meta { width: 100%; }
                    #chemical-safety-section .chem-id-hero__meta span { flex: 1; justify-content: center; }
                    #chemical-safety-section .chem-id-hero__actions { width: 100%; }
                    #chemical-safety-section .chem-id-hero__actions .btn { flex: 1; justify-content: center; }
                }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0623\u0633\u0637\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0648\u0627\u0644\u062C\u062F\u0627\u0648\u0644 */
                #chemical-safety-section #chemical-content { animation: chemSurfaceIn .24s ease-out; }
                @keyframes chemSurfaceIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                #chemical-safety-section #chemical-content .content-card {
                    border-radius: 16px; border-color: #dce7f5 !important;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                }
                #chemical-safety-section .card-header {
                    border-bottom: 1px solid #e5edf7; border-radius: 16px 16px 0 0;
                    background: linear-gradient(90deg, #f8fbff, #fff);
                }
                #chemical-safety-section .card-header .card-title { color: #0b2a55; font-weight: 800; }
                #chemical-safety-section .card-header .card-title i { color: #2563eb; }
                #chemical-safety-section .data-table thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb) !important; color: #ffffff !important;
                    font-weight: 700; white-space: nowrap; border: none !important;
                }
                #chemical-safety-section .data-table tbody tr:hover td { background: #f2f7ff !important; }
                #chemical-safety-section .data-table td { vertical-align: middle; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u062A\u062D\u0648\u064A\u0644 \u0628\u0637\u0627\u0642\u0629 MSDS \u0645\u0646 \u0628\u0646\u0641\u0633\u062C\u064A \u0625\u0644\u0649 \u0623\u0632\u0631\u0642 */
                #chemical-safety-section .content-card[class*="purple"] {
                    background: linear-gradient(135deg, #eff6ff, #dbeafe) !important;
                    border-inline-start-color: #2563eb !important;
                }
                #chemical-safety-section .content-card[class*="purple"] .bg-purple-500 { background: #2563eb !important; }
                #chemical-safety-section .content-card[class*="purple"] .text-purple-600 { color: #2563eb !important; }
            `,document.head.appendChild(e)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0642\u0646 \u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",e)}},async load(){this._injectChemicalIdentityStyles(),this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0);const e=document.getElementById("chemical-safety-section");if(e){if(typeof AppState>"u"){e.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</p>
                            <p class="text-sm text-gray-400">AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B. \u062C\u0631\u0651\u0628 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `,Utils?.safeError?.("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}AppState.appData||(AppState.appData={}),AppState.appData.chemicalRegister||(AppState.appData.chemicalRegister=[]);try{e.innerHTML=`
                <div class="chem-id-hero">
                    <div class="chem-id-hero__copy">
                        <div class="chem-id-hero__icon"><i class="fas fa-flask"></i></div>
                        <div>
                            <span class="chem-id-hero__eyebrow">\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u2014 HSE</span>
                            <h1>\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</h1>
                            <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                    <div class="chem-id-hero__actions">
                        <button class="btn-primary" disabled>
                            <i class="fas fa-spinner fa-spin ml-2"></i>
                            \u062A\u062D\u0645\u064A\u0644
                        </button>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0648\u0627\u062C\u0647\u0629...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;let t="";try{const a=this.renderList();t=await Utils.promiseWithTimeout(a,1e4,()=>new Error("Timeout: renderList took too long"))}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",a),t=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="ChemicalSafety.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `}e.innerHTML=`
                <div class="chem-id-hero">
                    <div class="chem-id-hero__copy">
                        <div class="chem-id-hero__icon"><i class="fas fa-flask"></i></div>
                        <div>
                            <span class="chem-id-hero__eyebrow">\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u2014 HSE</span>
                            <h1>\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</h1>
                            <p>\u0625\u062F\u0627\u0631\u0629 \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0627\u0645</p>
                        </div>
                    </div>
                    <div class="chem-id-hero__meta">
                        <span><i class="fas fa-list-check"></i> \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0643\u0627\u0645\u0644</span>
                        <span><i class="fas fa-file-pdf"></i> MSDS \u0645\u0648\u062B\u0642</span>
                        <span><i class="fas fa-database"></i> \u062A\u062D\u062F\u064A\u062B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645</span>
                    </div>
                    <div class="chem-id-hero__actions">
                        <button id="add-chemical-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0645\u0627\u062F\u0629 \u062C\u062F\u064A\u062F\u0629
                        </button>
                    </div>
                </div>
                <div id="chemical-content" class="mt-6">
                    ${t}
                </div>
            `,this.setupEventListeners();try{await this.loadChemicalDataAsync()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",a),this.loadChemicalList()}}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",t),e.innerHTML=`
                <div class="chem-id-hero">
                    <div class="chem-id-hero__copy">
                        <div class="chem-id-hero__icon"><i class="fas fa-flask"></i></div>
                        <div>
                            <span class="chem-id-hero__eyebrow">\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u2014 HSE</span>
                            <h1>\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</h1>
                            <p>\u062A\u0639\u0630\u0631 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0648\u0627\u062C\u0647\u0629</p>
                        </div>
                    </div>
                    <div class="chem-id-hero__actions">
                        <button onclick="ChemicalSafety.load()" class="btn-secondary">
                            <i class="fas fa-redo ml-2"></i>
                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <p class="text-sm text-gray-400 mb-4">${t&&t.message?Utils.escapeHTML(t.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="ChemicalSafety.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}}},async loadChemicalDataAsync(){return this._chemicalDataLoadPromise?this._chemicalDataLoadPromise:(this._chemicalDataLoadPromise=(async()=>{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){this._chemicalBackendFetchOk=!0,this.loadChemicalList();return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){this._chemicalBackendFetchOk=!0,this.loadChemicalList();return}try{const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Chemical_Register",spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}).catch(l=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",l),{success:!1,data:[]}));let t=!1;e&&e.success&&Array.isArray(e.data)?(AppState.appData.chemicalRegister=e.data,t=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${e.data.length} \u0633\u062C\u0644 \u0645\u0646 Google Sheets`)):AppState.appData.chemicalRegister||(AppState.appData.chemicalRegister=[]);const a=document.getElementById("chemical-stats-container");a&&(a.innerHTML=this.renderStatisticsCards()),this.loadChemicalList(),t&&typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{localStorage.setItem("chemical_safety_last_sync",String(Date.now()))}catch{}}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",e);const t=document.getElementById("chemical-stats-container");t&&(t.innerHTML=this.renderStatisticsCards()),this.loadChemicalList()}this._chemicalBackendFetchOk=!0})().finally(()=>{this._chemicalDataLoadPromise=null}),this._chemicalDataLoadPromise)},getStatistics(){const e=AppState.appData.chemicalRegister||[],t=e.length,a=e.filter(p=>{const m=(p.hazardClass||"").toLowerCase();return m.includes("hazard")||m.includes("\u062E\u0637")||m.includes("danger")}).length,l=t-a,s={};e.forEach(p=>{const m=p.physicalShape||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s[m]=(s[m]||0)+1});const n={};e.forEach(p=>{const m=p.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n[m]=(n[m]||0)+1});const i=e.filter(p=>p.msdsArabic||p.msdsEnglish).length,g=t-i;return{total:t,hazardous:a,safe:l,shapeDistribution:s,deptDistribution:n,withMSDS:i,withoutMSDS:g,hazardousPercentage:t>0?Math.round(a/t*100):0}},renderStatisticsCards(){const e=this.getStatistics();return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0627\u062F -->
                <div class="content-card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-flask ml-2"></i>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0627\u062F
                            </p>
                            <p class="text-3xl font-bold text-blue-600">${e.total}</p>
                            <p class="text-xs text-gray-500 mt-1">\u0645\u0627\u062F\u0629 \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                        </div>
                        <div class="bg-blue-500 rounded-full p-4">
                            <i class="fas fa-flask text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 -->
                <div class="content-card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629
                            </p>
                            <p class="text-3xl font-bold text-red-600">${e.hazardous}</p>
                            <p class="text-xs text-gray-500 mt-1">${e.hazardousPercentage}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</p>
                        </div>
                        <div class="bg-red-500 rounded-full p-4">
                            <i class="fas fa-exclamation-triangle text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0622\u0645\u0646\u0629 -->
                <div class="content-card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-shield-alt ml-2"></i>\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0622\u0645\u0646\u0629
                            </p>
                            <p class="text-3xl font-bold text-green-600">${e.safe}</p>
                            <p class="text-xs text-gray-500 mt-1">\u0645\u0648\u0627\u062F \u0622\u0645\u0646\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</p>
                        </div>
                        <div class="bg-green-500 rounded-full p-4">
                            <i class="fas fa-shield-alt text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u0648\u0627\u062F \u0645\u0639 MSDS -->
                <div class="content-card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-file-pdf ml-2"></i>\u0645\u0648\u0627\u062F \u0645\u0639 MSDS
                            </p>
                            <p class="text-3xl font-bold text-purple-600">${e.withMSDS}</p>
                            <p class="text-xs text-gray-500 mt-1">${e.withoutMSDS} \u0628\u062F\u0648\u0646 MSDS</p>
                        </div>
                        <div class="bg-purple-500 rounded-full p-4">
                            <i class="fas fa-file-pdf text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderList(){return`
            <!-- \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
            <div id="chemical-stats-container" class="mb-6">
                ${this.renderStatisticsCards()}
            </div>
            
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629
                        </h2>
                        <div class="flex items-center gap-2">
                            <button id="export-pdf-btn" class="btn-secondary">
                                <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button id="export-excel-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0645\u062D\u0633\u0646\u0629 -->
                    <div class="bg-gray-50 p-4 rounded-lg mb-6">
                        <div class="flex items-center gap-2 mb-4">
                            <i class="fas fa-filter text-blue-600"></i>
                            <h3 class="text-sm font-semibold text-gray-700">\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0628\u062D\u062B</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-search ml-1 text-gray-400"></i>\u0628\u062D\u062B \u0639\u0627\u0645
                                </label>
                                <input type="text" id="search-filter" class="form-input" 
                                    placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F..." value="${Utils.escapeHTML(this.filters.search)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-building ml-1 text-gray-400"></i>\u0627\u0644\u0642\u0633\u0645
                                </label>
                                <input type="text" id="department-filter" class="form-input" 
                                    placeholder="\u0627\u0644\u0642\u0633\u0645" value="${Utils.escapeHTML(this.filters.department)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-shapes ml-1 text-gray-400"></i>\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A
                                </label>
                                <select id="physical-shape-filter" class="form-input">
                                    <option value="">\u0627\u0644\u0643\u0644</option>
                                    ${PHYSICAL_SHAPES.map(e=>`
                                        <option value="${e}" ${this.filters.physicalShape===e?"selected":""}>
                                            ${e}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-tags ml-1 text-gray-400"></i>\u0627\u0644\u062A\u0635\u0646\u064A\u0641
                                </label>
                                <input type="text" id="classification-filter" class="form-input" 
                                    placeholder="\u0627\u0644\u062A\u0635\u0646\u064A\u0641" value="${Utils.escapeHTML(this.filters.classification)}">
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <button id="reset-filters-btn" class="btn-secondary btn-sm">
                                <i class="fas fa-undo-alt ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                            </button>
                        </div>
                    </div>
                    <div id="chemical-table-container">
                        <div class="empty-state">
                            <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                        </div>
                    </div>
                </div>
            </div>
        `},async loadChemicalList(){const e=document.getElementById("chemical-table-container");if(!e)return;const t=AppState.appData.chemicalRegister||[],a=this.getFilteredChemicals(t),l=document.getElementById("chemical-stats-container");if(l&&(l.innerHTML=this.renderStatisticsCards()),a.length===0){e.innerHTML=`
                <div class="empty-state py-12">
                    <i class="fas fa-flask text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg mb-2">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p>
                    <p class="text-gray-400 text-sm">\u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0627\u062F\u0629 \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u062C\u062F\u064A\u062F\u0629</p>
                    <button onclick="ChemicalSafety.showForm()" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0627\u062F\u0629 \u062C\u062F\u064A\u062F\u0629
                    </button>
                </div>
            `;return}e.innerHTML=`
            <div class="overflow-x-auto rounded-lg border border-gray-200">
                <table class="data-table">
                    <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
                        <tr>
                            <th class="text-white">\u0645</th>
                            <th class="text-white">\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629</th>
                            <th class="text-white">\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A</th>
                            <th class="text-white">\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
                            <th class="text-white">\u0627\u0644\u0642\u0633\u0645</th>
                            <th class="text-white">\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                            <th class="text-white">\u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u062E\u0632\u0646</th>
                            <th class="text-white">\u0627\u0644\u0643\u0645\u064A\u0629/\u0627\u0644\u0633\u0646\u0629</th>
                            <th class="text-white">\u062E\u0637\u0648\u0631\u0629</th>
                            <th class="text-white">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a.map((s,n)=>{const i=s.hazardClass&&(s.hazardClass.toLowerCase().includes("hazard")||s.hazardClass.toLowerCase().includes("\u062E\u0637")||s.hazardClass.toLowerCase().includes("danger")),g=!!(s.msdsArabic||s.msdsEnglish);return`
                                <tr class="${i?"bg-red-50 hover:bg-red-100":"hover:bg-gray-50"} transition-colors duration-150">
                                    <td class="font-semibold text-gray-700">${s.serialNumber||n+1}</td>
                                    <td>
                                        <div class="font-semibold text-gray-900">${Utils.escapeHTML(s.rmName||"")}</div>
                                        <div class="flex items-center gap-2 mt-1">
                                            ${i?'<span class="badge badge-danger text-xs"><i class="fas fa-exclamation-triangle ml-1"></i>\u062E\u0637\u064A\u0631</span>':""}
                                            ${g?'<span class="badge badge-info text-xs"><i class="fas fa-file-pdf ml-1"></i>MSDS</span>':""}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-gray-700">${Utils.escapeHTML(s.physicalShape||"-")}</span>
                                    </td>
                                    <td>
                                        <div class="max-w-xs truncate" title="${Array.isArray(s.purposeOfUse)?s.purposeOfUse.join(", "):Utils.escapeHTML(s.purposeOfUse||"")}">
                                            ${Array.isArray(s.purposeOfUse)?s.purposeOfUse.slice(0,2).join(", ")+(s.purposeOfUse.length>2?"...":""):Utils.escapeHTML((s.purposeOfUse||"").substring(0,30)+((s.purposeOfUse||"").length>30?"...":""))}
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-gray-700">${Utils.escapeHTML(s.department||"-")}</span>
                                    </td>
                                    <td>
                                        ${s.hazardClass?`<span class="px-2 py-1 rounded text-xs font-semibold ${i?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800"}">${Utils.escapeHTML(s.hazardClass)}</span>`:'<span class="text-gray-400">-</span>'}
                                    </td>
                                    <td>
                                        <span class="text-gray-700">${Utils.escapeHTML(s.locationStore||"-")}</span>
                                    </td>
                                    <td>
                                        <span class="font-semibold text-gray-800">${Utils.escapeHTML(s.qtyYear||"-")}</span>
                                    </td>
                                    <td>
                                        ${i?'<span class="badge badge-danger"><i class="fas fa-exclamation-triangle ml-1"></i>\u062E\u0637\u064A\u0631</span>':'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0622\u0645\u0646</span>'}
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="ChemicalSafety.viewChemical('${s.id}')" 
                                                class="btn-icon btn-icon-primary hover:scale-110 transition-transform" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="ChemicalSafety.editChemical('${s.id}')" 
                                                class="btn-icon btn-icon-info hover:scale-110 transition-transform" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="ChemicalSafety.deleteChemical('${s.id}')" 
                                                class="btn-icon btn-icon-danger hover:scale-110 transition-transform" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
            <div class="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <div class="text-sm text-gray-700">
                    <i class="fas fa-info-circle ml-1 text-blue-600"></i>
                    <span class="font-semibold">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A:</span> 
                    <span class="text-blue-600 font-bold">${a.length}</span> \u0645\u0646 
                    <span class="text-gray-600">${t.length}</span>
                </div>
                ${a.length<t.length?`
                    <div class="text-xs text-gray-500">
                        <i class="fas fa-filter ml-1"></i>
                        \u064A\u062A\u0645 \u0639\u0631\u0636 ${a.length} \u0633\u062C\u0644 \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629
                    </div>
                `:""}
            </div>
        `},getFilteredChemicals(e){return e.filter(t=>{const a=!this.filters.search||t.rmName&&t.rmName.toLowerCase().includes(this.filters.search.toLowerCase())||t.serialNumber&&t.serialNumber.toString().includes(this.filters.search),l=!this.filters.department||t.department&&t.department.toLowerCase().includes(this.filters.department.toLowerCase()),s=!this.filters.physicalShape||t.physicalShape===this.filters.physicalShape,n=!this.filters.classification||t.hazardClass&&t.hazardClass.toLowerCase().includes(this.filters.classification.toLowerCase());return a&&l&&s&&n})},setupEventListeners(){this._eventListenersAbortController&&this._eventListenersAbortController.abort(),this._eventListenersAbortController=new AbortController;const e=this._eventListenersAbortController.signal;this._setupTimeoutId&&clearTimeout(this._setupTimeoutId),this._setupTimeoutId=setTimeout(()=>{const t=document.getElementById("add-chemical-btn");t&&!e.aborted&&t.addEventListener("click",()=>this.showForm(),{signal:e});const a=document.getElementById("search-filter"),l=document.getElementById("department-filter"),s=document.getElementById("physical-shape-filter"),n=document.getElementById("classification-filter"),i=document.getElementById("reset-filters-btn");a&&!e.aborted&&a.addEventListener("input",()=>{this.filters.search=a.value,this.loadChemicalList()},{signal:e}),l&&!e.aborted&&l.addEventListener("input",()=>{this.filters.department=l.value,this.loadChemicalList()},{signal:e}),s&&!e.aborted&&s.addEventListener("change",()=>{this.filters.physicalShape=s.value,this.loadChemicalList()},{signal:e}),n&&!e.aborted&&n.addEventListener("input",()=>{this.filters.classification=n.value,this.loadChemicalList()},{signal:e}),i&&!e.aborted&&i.addEventListener("click",()=>{this.filters={search:"",department:"",physicalShape:"",classification:""},a&&(a.value=""),l&&(l.value=""),s&&(s.value=""),n&&(n.value=""),this.loadChemicalList()},{signal:e});const g=document.getElementById("export-pdf-btn"),p=document.getElementById("export-excel-btn");g&&!e.aborted&&g.addEventListener("click",()=>this.exportToPDF(),{signal:e}),p&&!e.aborted&&p.addEventListener("click",()=>this.exportToExcel(),{signal:e})},100)},async showForm(e=null){this.currentEditId=e?.id||null,this.msdsFiles={arabic:null,english:null};const t=document.createElement("div");t.className="modal-overlay",t.style.zIndex="10000";const a=e?.purposeOfUse||[],l=Array.isArray(a)?a:a?[a]:[],s=e?.sds||{},n=Array.isArray(s?.ghsPictograms)?s.ghsPictograms:typeof s?.ghsPictograms=="string"?s.ghsPictograms.split(",").map(o=>o.trim()).filter(Boolean):[],i=s?.instructions||{},g=s?.approval||{};t.innerHTML=`
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto; overflow-x: hidden;">
                <div class="modal-header bg-white border-b border-gray-200 flex items-center justify-center relative">
                    <h2 class="modal-title text-gray-900 text-2xl font-extrabold text-center">
                        <i class="fas fa-flask ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0627\u062F\u0629 \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0627\u062F\u0629 \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}
                    </h2>
                    <button class="modal-close absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:bg-gray-100 rounded p-2 transition-colors" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body p-6">
                    <form id="chemical-form" class="space-y-6">
                        <!-- Tabs Navigation -->
                        <div class="tabs-container">
                            <div class="tabs-nav">
                                <button type="button" class="tab-btn active" data-tab="basic-info">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                                </button>
                                <button type="button" class="tab-btn" data-tab="documents">
                                    <i class="fas fa-file-pdf ml-2"></i>
                                    \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0627\u0644\u0648\u062B\u0627\u0626\u0642
                                </button>
                                <button type="button" class="tab-btn" data-tab="manufacturer">
                                    <i class="fas fa-industry ml-2"></i>
                                    \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629
                                </button>
                                <button type="button" class="tab-btn" data-tab="container">
                                    <i class="fas fa-box ml-2"></i>
                                    \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062D\u0627\u0648\u064A\u0629
                                </button>
                                <button type="button" class="tab-btn" data-tab="hazards">
                                    <i class="fas fa-exclamation-triangle ml-2"></i>
                                    \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                                </button>
                                <button type="button" class="tab-btn" data-tab="location">
                                    <i class="fas fa-map-marker-alt ml-2"></i>
                                    \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0643\u0645\u064A\u0629
                                </button>
                                <button type="button" class="tab-btn" data-tab="sds">
                                    <i class="fas fa-shield-alt ml-2"></i>
                                    \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 SDS
                                </button>
                            </div>
                        </div>

                        <!-- Tab Content: \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div class="tab-content active" id="tab-basic-info">
                            <!-- S.N (Auto) -->
                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-300 shadow-sm mb-4">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-hashtag text-blue-600"></i>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A (S.N)
                                </label>
                                <input type="text" id="serial-number" class="form-input bg-white text-gray-900 font-bold text-lg text-center" 
                                    value="${e?.serialNumber||(AppState.appData.chemicalRegister?.length||0)+1}" readonly style="color: #111827 !important; background-color: #ffffff !important;">
                                <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <i class="fas fa-info-circle"></i>\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                                </p>
                            </div>

                            <!-- RM Name -->
                            <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border-2 border-blue-200 shadow-sm mb-4">
                                <label class="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    <i class="fas fa-tag text-blue-600"></i>\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 (RM Name) *
                                </label>
                                <input type="text" id="rm-name" required class="form-input bg-white text-gray-900 text-lg" 
                                    value="${Utils.escapeHTML(e?.rmName||"")}" 
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629" style="color: #111827 !important; background-color: #ffffff !important;">
                            </div>

                            <!-- Physical Shape -->
                            <div class="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg border-2 border-indigo-200 shadow-sm mb-4">
                                <label class="block text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                                    <i class="fas fa-shapes text-indigo-600"></i>\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A (Physical Shape) *
                                </label>
                                <select id="physical-shape" required class="form-input bg-white text-gray-900" style="color: #111827 !important; background-color: #ffffff !important;">
                                    <option value="" style="color: #6b7280;">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A</option>
                                    ${PHYSICAL_SHAPES.map(o=>`
                                        <option value="${o}" ${e?.physicalShape===o?"selected":""} style="color: #111827; background-color: #ffffff;">
                                            ${o}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>

                            <!-- Purpose of Use (Custom Multi-Select Dropdown) -->
                            <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border-2 border-purple-200 shadow-sm mb-4">
                                <label class="block text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
                                    <i class="fas fa-list-check text-purple-600"></i>\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 (Purpose of Use) *
                                </label>
                                
                                <!-- Selected Tags Display -->
                                <div id="purpose-selected-tags" class="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    ${l.length>0?l.map(o=>`
                                        <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold purpose-tag" data-value="${Utils.escapeHTML(o)}">
                                            ${Utils.escapeHTML(o)}
                                            <button type="button" onclick="ChemicalSafety.removePurposeTag('${Utils.escapeHTML(o)}')" 
                                                class="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                                                <i class="fas fa-times text-xs"></i>
                                            </button>
                                        </span>
                                    `).join(""):'<span class="text-gray-400 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u064A \u063A\u0631\u0636</span>'}
                                </div>
                                
                                <!-- Dropdown -->
                                <div class="relative">
                                    <button type="button" id="purpose-dropdown-btn" 
                                        class="w-full form-input text-right flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-gray-900" style="color: #111827 !important; background-color: #ffffff !important;">
                                        <span class="text-gray-500">\u0627\u062E\u062A\u0631 \u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                                        <i class="fas fa-chevron-down text-gray-400"></i>
                                    </button>
                                    <div id="purpose-dropdown-menu" 
                                        class="hse-lookup-dropdown hidden absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        ${PURPOSE_OF_USE_OPTIONS.map(o=>`
                                            <label class="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0">
                                                <input type="checkbox" 
                                                    class="purpose-checkbox rounded border-gray-300 text-blue-600" 
                                                    value="${Utils.escapeHTML(o)}" 
                                                    ${l.includes(o)?"checked":""}
                                                    onchange="ChemicalSafety.togglePurposeOption('${Utils.escapeHTML(o)}', this.checked)">
                                                <span class="flex-1 text-sm text-gray-700">${Utils.escapeHTML(o)}</span>
                                            </label>
                                        `).join("")}
                                    </div>
                                </div>
                                
                                <input type="hidden" id="purpose-of-use" required 
                                    value="${l.map(o=>Utils.escapeHTML(o)).join(",")}">
                                
                                <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <i class="fas fa-info-circle text-blue-600"></i>
                                    \u064A\u0645\u0643\u0646\u0643 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629
                                </p>
                            </div>

                            <!-- Method of Application & Department -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gradient-to-br from-teal-50 to-white p-4 rounded-lg border-2 border-teal-200 shadow-sm">
                                    <label class="block text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-tools text-teal-600"></i>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 (Method of Application)
                                    </label>
                                    <input type="text" id="method-of-application" class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.methodOfApplication||"")}" 
                                        placeholder="\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                                <div class="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-lg border-2 border-cyan-200 shadow-sm">
                                    <label class="block text-sm font-bold text-cyan-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-building text-cyan-600"></i>\u0627\u0644\u0642\u0633\u0645 (Department) *
                                    </label>
                                    <input type="text" id="department" required class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.department||"")}" 
                                        placeholder="\u0627\u0644\u0642\u0633\u0645" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0627\u0644\u0648\u062B\u0627\u0626\u0642 -->
                        <div class="tab-content" id="tab-documents">
                            <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border-2 border-purple-200">
                                <label class="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <i class="fas fa-file-pdf text-purple-600"></i>\u0645\u0644\u0641\u0627\u062A MSDS (Material Safety Data Sheet)
                                </label>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border-2 border-purple-200">
                                        <label class="block text-sm font-bold text-purple-800 mb-2">
                                            <i class="fas fa-file-pdf text-red-500 ml-1"></i>MSDS (Arabic)
                                        </label>
                                        <input type="file" id="msds-arabic" accept=".pdf,.doc,.docx" class="form-input bg-white text-gray-900" style="color: #111827 !important; background-color: #ffffff !important;">
                                        ${e?.msdsArabic?`
                                            <div class="mt-3 p-2 bg-green-50 rounded border border-green-200">
                                                <a href="${Utils.escapeHTML(e.msdsArabic)}" target="_blank" 
                                                   class="text-green-700 hover:text-green-900 flex items-center gap-2 font-semibold">
                                                    <i class="fas fa-check-circle"></i>
                                                    \u0645\u0644\u0641 \u0645\u0648\u062C\u0648\u062F - \u0627\u0636\u063A\u0637 \u0644\u0644\u0639\u0631\u0636
                                                </a>
                                            </div>
                                        `:'<p class="text-xs text-gray-500 mt-2">\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0645\u0644\u0641</p>'}
                                    </div>
                                    <div class="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg border-2 border-indigo-200">
                                        <label class="block text-sm font-bold text-indigo-800 mb-2">
                                            <i class="fas fa-file-pdf text-red-500 ml-1"></i>MSDS (English)
                                        </label>
                                        <input type="file" id="msds-english" accept=".pdf,.doc,.docx" class="form-input bg-white text-gray-900" style="color: #111827 !important; background-color: #ffffff !important;">
                                        ${e?.msdsEnglish?`
                                            <div class="mt-3 p-2 bg-green-50 rounded border border-green-200">
                                                <a href="${Utils.escapeHTML(e.msdsEnglish)}" target="_blank" 
                                                   class="text-green-700 hover:text-green-900 flex items-center gap-2 font-semibold">
                                                    <i class="fas fa-check-circle"></i>
                                                    \u0645\u0644\u0641 \u0645\u0648\u062C\u0648\u062F - \u0627\u0636\u063A\u0637 \u0644\u0644\u0639\u0631\u0636
                                                </a>
                                            </div>
                                        `:'<p class="text-xs text-gray-500 mt-2">\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0645\u0644\u0641</p>'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629 -->
                        <div class="tab-content" id="tab-manufacturer">
                            <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200">
                                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i class="fas fa-industry text-indigo-600"></i>
                                    \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629 \u0648\u0627\u0644\u0648\u0643\u064A\u0644
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg border-2 border-indigo-200">
                                        <label class="block text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                                            <i class="fas fa-globe text-indigo-600"></i>\u0645\u062D\u0644\u064A / \u0645\u0633\u062A\u0648\u0631\u062F
                                        </label>
                                        <select id="local-import" class="form-input bg-white text-gray-900" style="color: #111827 !important; background-color: #ffffff !important;">
                                            <option value="" style="color: #6b7280;">\u0627\u062E\u062A\u0631</option>
                                            ${LOCAL_IMPORT_OPTIONS.map(o=>`
                                                <option value="${o}" ${e?.localImport===o?"selected":""} style="color: #111827; background-color: #ffffff;">
                                                    ${o}
                                                </option>
                                            `).join("")}
                                        </select>
                                    </div>
                                    <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border-2 border-blue-200">
                                        <label class="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                            <i class="fas fa-industry text-blue-600"></i>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629
                                        </label>
                                        <input type="text" id="manufacturer" class="form-input bg-white text-gray-900" 
                                            value="${Utils.escapeHTML(e?.manufacturer||"")}" 
                                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                    <div class="bg-gradient-to-br from-violet-50 to-white p-4 rounded-lg border-2 border-violet-200 md:col-span-2">
                                        <label class="block text-sm font-bold text-violet-800 mb-2 flex items-center gap-2">
                                            <i class="fas fa-handshake text-violet-600"></i>\u0627\u0644\u0648\u0643\u064A\u0644 \u0641\u064A \u0645\u0635\u0631
                                        </label>
                                        <input type="text" id="agent-egypt" class="form-input bg-white text-gray-900" 
                                            value="${Utils.escapeHTML(e?.agentEgypt||"")}" 
                                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0648\u0643\u064A\u0644 \u0641\u064A \u0645\u0635\u0631" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062D\u0627\u0648\u064A\u0629 -->
                        <div class="tab-content" id="tab-container">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border-2 border-green-200 shadow-sm">
                                    <label class="block text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-box text-green-600"></i>\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629
                                    </label>
                                    <input type="text" id="container-type" class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.containerType||"")}" 
                                        placeholder="\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                                <div class="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-lg border-2 border-emerald-200 shadow-sm">
                                    <label class="block text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-recycle text-emerald-600"></i>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0644\u0635
                                    </label>
                                    <input type="text" id="container-disposal" class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.containerDisposalMethod||"")}" 
                                        placeholder="\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0644\u0635 \u0645\u0646 \u0627\u0644\u062D\u0627\u0648\u064A\u0629" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                        <div class="tab-content" id="tab-hazards">
                            <!-- Header Section -->
                            <div class="mb-6 flex items-center justify-end gap-3">
                                <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <i class="fas fa-skull text-red-600 text-2xl"></i>
                                    \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                                </h3>
                            </div>

                            <!-- Main Content: NFPA Values (Left) and Diamond (Right) -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <!-- Left Side: NFPA Hazard Values -->
                                <div class="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
                                    <h4 class="text-lg font-bold text-gray-800 mb-4 text-right">\u0642\u064A\u0645 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 NFPA</h4>
                                    
                                    <!-- Health Dropdown -->
                                    <div class="mb-4">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 justify-end">
                                            <i class="fas fa-heartbeat text-blue-600"></i>
                                            \u0627\u0644\u0635\u062D\u0629 (Health)
                                        </label>
                                        <div class="relative">
                                            <select id="nfpa-health-dropdown" 
                                                class="form-input bg-white text-gray-900 w-full pr-10 pl-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                onchange="ChemicalSafety.updateNFPADiamondFromDropdown()"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                                <option value="0" ${(e?.nfpaDiamond?.health||0)===0?"selected":""}>Normal Material - 0</option>
                                                <option value="1" ${(e?.nfpaDiamond?.health||0)===1?"selected":""}>Slightly Hazardous - 1</option>
                                                <option value="2" ${(e?.nfpaDiamond?.health||0)===2?"selected":""}>Hazardous - 2</option>
                                                <option value="3" ${(e?.nfpaDiamond?.health||0)===3?"selected":""}>Extreme Danger - 3</option>
                                                <option value="4" ${(e?.nfpaDiamond?.health||0)===4?"selected":""}>Deadly - 4</option>
                                            </select>
                                            <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                        </div>
                                    </div>

                                    <!-- Fire Dropdown -->
                                    <div class="mb-4">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 justify-end">
                                            <i class="fas fa-fire text-red-600"></i>
                                            \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 (Fire)
                                        </label>
                                        <div class="relative">
                                            <select id="nfpa-fire-dropdown" 
                                                class="form-input bg-white text-gray-900 w-full pr-10 pl-3 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                                onchange="ChemicalSafety.updateNFPADiamondFromDropdown()"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                                <option value="0" ${(e?.nfpaDiamond?.flammability||0)===0?"selected":""}>Will Not Burn - 0</option>
                                                <option value="1" ${(e?.nfpaDiamond?.flammability||0)===1?"selected":""}>Above 200\xB0F - 1</option>
                                                <option value="2" ${(e?.nfpaDiamond?.flammability||0)===2?"selected":""}>Below 200\xB0F - 2</option>
                                                <option value="3" ${(e?.nfpaDiamond?.flammability||0)===3?"selected":""}>Below 100\xB0F - 3</option>
                                                <option value="4" ${(e?.nfpaDiamond?.flammability||0)===4?"selected":""}>Below 73\xB0F - 4</option>
                                            </select>
                                            <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                        </div>
                                    </div>

                                    <!-- Reactivity Dropdown -->
                                    <div class="mb-4">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 justify-end">
                                            <i class="fas fa-cog text-yellow-600"></i>
                                            \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 (Reactivity)
                                        </label>
                                        <div class="relative">
                                            <select id="nfpa-reactivity-dropdown" 
                                                class="form-input bg-white text-gray-900 w-full pr-10 pl-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                                                onchange="ChemicalSafety.updateNFPADiamondFromDropdown()"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                                <option value="0" ${(e?.nfpaDiamond?.instability||0)===0?"selected":""}>Stable - 0</option>
                                                <option value="1" ${(e?.nfpaDiamond?.instability||0)===1?"selected":""}>Unstable if Heated - 1</option>
                                                <option value="2" ${(e?.nfpaDiamond?.instability||0)===2?"selected":""}>Violent Chemical Change - 2</option>
                                                <option value="3" ${(e?.nfpaDiamond?.instability||0)===3?"selected":""}>Shock and Heat May Detonate - 3</option>
                                                <option value="4" ${(e?.nfpaDiamond?.instability||0)===4?"selected":""}>May Detonate - 4</option>
                                            </select>
                                            <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                        </div>
                                    </div>

                                    <!-- Special Dropdown -->
                                    <div class="mb-4">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 justify-end">
                                            <i class="fas fa-exclamation-circle text-gray-700"></i>
                                            \u062E\u0627\u0635 (Special)
                                        </label>
                                        <div class="relative">
                                            <select id="nfpa-special-dropdown" 
                                                class="form-input bg-white text-gray-900 w-full pr-10 pl-3 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                                                onchange="ChemicalSafety.updateNFPADiamondFromDropdown()"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                                <option value="">\u0644\u0627 \u064A\u0648\u062C\u062F - None</option>
                                                <option value="W" ${(e?.nfpaDiamond?.special||"").toUpperCase()==="W"?"selected":""}>W - Use No Water</option>
                                                <option value="OX" ${(e?.nfpaDiamond?.special||"").toUpperCase()==="OX"?"selected":""}>OX - Oxidizer</option>
                                                <option value="ACID" ${(e?.nfpaDiamond?.special||"").toUpperCase()==="ACID"?"selected":""}>ACID - Acid</option>
                                                <option value="ALK" ${(e?.nfpaDiamond?.special||"").toUpperCase()==="ALK"?"selected":""}>ALK - Alkali</option>
                                                <option value="COR" ${(e?.nfpaDiamond?.special||"").toUpperCase()==="COR"?"selected":""}>COR - Corrosive</option>
                                            </select>
                                            <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Side: NFPA Diamond -->
                                <div class="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
                                    <h4 class="text-lg font-bold text-gray-800 mb-6 text-center">\u0645\u0631\u0628\u0639 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (NFPA Diamond)</h4>
                                    <div id="nfpa-diamond-container" class="w-full py-4">
                                        ${this.renderNFPADiamond(e?.nfpaDiamond||{},"compact")}
                                    </div>
                                </div>
                            </div>

                            <!-- Hazard Classification Section -->
                            <div class="mb-6">
                                <div class="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
                                    <label class="block text-sm font-bold text-gray-800 mb-2 text-right">
                                        \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (Class)
                                    </label>
                                    <input type="text" id="hazard-class" class="form-input bg-white text-gray-900 w-full" 
                                        value="${Utils.escapeHTML(e?.hazardClass||"")}" 
                                        placeholder="\u0645\u062B\u0627\u0644: Class 3 - Flammable" 
                                        style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                            </div>

                            <!-- Hazard Description Section -->
                            <div class="mb-6">
                                <div class="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
                                    <label class="block text-sm font-bold text-gray-800 mb-2 text-right">
                                        \u0648\u0635\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                                    </label>
                                    <textarea id="hazard-description" class="form-input bg-white text-gray-900 w-full" rows="5" 
                                        placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0645\u0627\u062F\u0629" 
                                        style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(e?.hazardDescription||"")}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 SDS -->
                        <div class="tab-content" id="tab-sds">
                            <div class="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border-2 border-gray-200 shadow-sm mb-6">
                                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 justify-end">
                                    <i class="fas fa-file-alt text-gray-700"></i>
                                    \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 (SDS)
                                </h3>

                                <!-- Header Fields -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0641\u0631\u0639</label>
                                        <input type="text" id="sds-company-branch" class="form-input bg-white text-gray-900"
                                            value="${Utils.escapeHTML(s?.companyBranch||"")}"
                                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0641\u0631\u0639" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0631\u062C\u0645\u0629</label>
                                        <input type="text" id="sds-translation-status" class="form-input bg-white text-gray-900"
                                            value="${Utils.escapeHTML(s?.translationStatus||"\u063A\u064A\u0631 \u0645\u062A\u0631\u062C\u0645")}"
                                            placeholder="\u0645\u062B\u0627\u0644: \u063A\u064A\u0631 \u0645\u062A\u0631\u062C\u0645" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0639\u0644\u0645\u064A \u0644\u0644\u0645\u0627\u062F\u0629</label>
                                        <input type="text" id="sds-scientific-name" class="form-input bg-white text-gray-900"
                                            value="${Utils.escapeHTML(s?.scientificName||e?.rmName||"")}"
                                            placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0639\u0644\u0645\u064A" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0644\u0644\u0645\u0627\u062F\u0629</label>
                                        <input type="text" id="sds-trade-name" class="form-input bg-white text-gray-900"
                                            value="${Utils.escapeHTML(s?.tradeName||e?.rmName||"")}"
                                            placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062A\u062C\u0627\u0631\u064A" style="color: #111827 !important; background-color: #ffffff !important;">
                                    </div>
                                </div>

                                <!-- GHS Pictograms -->
                                <div class="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-3">\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 (GHS)</label>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        ${GHS_PICTOGRAMS.map(o=>`
                                            <label class="flex flex-col items-center gap-2 p-3 rounded-lg border-2 ${n.includes(o.key)?"border-blue-400 bg-blue-50":"border-gray-200 bg-gray-50"} cursor-pointer hover:border-blue-300 transition-colors">
                                                <input type="checkbox" class="sds-ghs-checkbox" value="${Utils.escapeHTML(o.key)}" ${n.includes(o.key)?"checked":""}>
                                                <div class="bg-white rounded-lg p-2 border border-gray-200">${o.svg}</div>
                                                <div class="text-xs font-semibold text-gray-700 text-center">${Utils.escapeHTML(o.labelAr)}</div>
                                            </label>
                                        `).join("")}
                                    </div>
                                    <p class="text-xs text-gray-500 mt-2">\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u062A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0641\u064A \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0637\u0628\u0627\u0639\u0629.</p>
                                </div>

                                <!-- SDS Instructions -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629</label>
                                        <textarea id="sds-first-aid" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.firstAid||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0626\u064A\u0629</label>
                                        <textarea id="sds-fire-fighting" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0645\u0643\u0627\u0641\u062D\u0629 \u0627\u0644\u062D\u0631\u064A\u0642..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.fireFighting||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0646\u0633\u0643\u0627\u0628\u0627\u062A</label>
                                        <textarea id="sds-spill-response" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u0627\u0646\u0633\u0643\u0627\u0628\u0627\u062A..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.spillResponse||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062A\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u062A\u062E\u0632\u064A\u0646</label>
                                        <textarea id="sds-handling-storage" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u062A\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u062A\u062E\u0632\u064A\u0646..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.handlingStorage||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</label>
                                        <textarea id="sds-ppe" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.ppe||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</label>
                                        <textarea id="sds-chemical-properties" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.chemicalProperties||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629</label>
                                        <textarea id="sds-physical-properties" class="form-input bg-white text-gray-900 w-full" rows="4"
                                            placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.physicalProperties||"")}</textarea>
                                    </div>
                                    <div class="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                                        <label class="block text-sm font-bold text-gray-700 mb-2">\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0623\u062E\u0631\u0649</label>
                                        <textarea id="sds-other-requirements" class="form-input bg-white text-gray-900 w-full" rows="3"
                                            placeholder="\u0623\u064A \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..." style="color: #111827 !important; background-color: #ffffff !important;">${Utils.escapeHTML(i?.otherRequirements||"")}</textarea>
                                    </div>
                                </div>

                                <!-- Approval -->
                                <div class="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 class="text-sm font-bold text-gray-800 mb-3">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-600 mb-1">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                            <input type="text" id="sds-approval-job" class="form-input bg-white text-gray-900"
                                                value="${Utils.escapeHTML(g?.jobTitle||"")}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-600 mb-1">\u0627\u0644\u0627\u0633\u0645</label>
                                            <input type="text" id="sds-approval-name" class="form-input bg-white text-gray-900"
                                                value="${Utils.escapeHTML(g?.name||"")}" placeholder="\u0627\u0644\u0627\u0633\u0645"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-600 mb-1">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</label>
                                            <input type="text" id="sds-approval-signature" class="form-input bg-white text-gray-900"
                                                value="${Utils.escapeHTML(g?.signature||"")}" placeholder="\u0627\u0644\u062A\u0648\u0642\u064A\u0639"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-gray-600 mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>
                                            <input type="date" id="sds-approval-date" class="form-input bg-white text-gray-900"
                                                value="${Utils.escapeHTML(g?.date||"")}"
                                                style="color: #111827 !important; background-color: #ffffff !important;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab Content: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0643\u0645\u064A\u0629 -->
                        <div class="tab-content" id="tab-location">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gradient-to-br from-sky-50 to-white p-4 rounded-lg border-2 border-sky-200 shadow-sm">
                                    <label class="block text-sm font-bold text-sky-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-map-marker-alt text-sky-600"></i>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u062E\u0632\u0646 *
                                    </label>
                                    <input type="text" id="location-store" class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.locationStore||"")}" 
                                        placeholder="\u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648 \u0627\u0644\u0645\u062E\u0632\u0646" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                                <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                                    <label class="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                                        <i class="fas fa-calculator text-blue-600"></i>\u0627\u0644\u0643\u0645\u064A\u0629 / \u0627\u0644\u0633\u0646\u0629
                                    </label>
                                    <input type="text" id="qty-year" class="form-input bg-white text-gray-900" 
                                        value="${Utils.escapeHTML(e?.qtyYear||"")}" 
                                        placeholder="\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0633\u0646\u0648\u064A\u0627\u064B" style="color: #111827 !important; background-color: #ffffff !important;">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer bg-gray-50 border-t border-gray-200 p-4 flex justify-center gap-3">
                    <button type="button" id="prev-tab-btn" class="btn-warning px-5 py-2" disabled>
                        <i class="fas fa-arrow-right ml-2"></i>\u0627\u0644\u0633\u0627\u0628\u0642
                    </button>
                    <button type="button" class="btn-danger px-5 py-2" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" id="next-tab-btn" class="btn-info px-5 py-2">
                        <i class="fas fa-arrow-left ml-2"></i>\u0627\u0644\u062A\u0627\u0644\u064A
                    </button>
                    <button type="button" id="save-chemical-btn" class="btn-primary text-lg px-6 py-3">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0645\u0627\u062F\u0629
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-chemical-btn").addEventListener("click",()=>this.handleSubmit(t));const m=t.querySelector("#msds-arabic"),x=t.querySelector("#msds-english");m&&m.addEventListener("change",o=>{this.msdsFiles.arabic=o.target.files[0]}),x&&x.addEventListener("change",o=>{this.msdsFiles.english=o.target.files[0]});const b=t.querySelector("#purpose-dropdown-btn"),h=t.querySelector("#purpose-dropdown-menu");b&&h&&(b.addEventListener("click",o=>{o.stopPropagation(),h.classList.toggle("hidden");const d=b.querySelector("i");d&&(d.classList.toggle("fa-chevron-down"),d.classList.toggle("fa-chevron-up"))}),document.addEventListener("click",function(d){if(!h.contains(d.target)&&!b.contains(d.target)){h.classList.add("hidden");const f=b.querySelector("i");f&&(f.classList.remove("fa-chevron-up"),f.classList.add("fa-chevron-down"))}}));const y=t.querySelectorAll(".tab-btn"),C=t.querySelectorAll(".tab-content"),S=t.querySelector("#prev-tab-btn"),L=t.querySelector("#next-tab-btn"),w=["basic-info","documents","manufacturer","container","hazards","location","sds"],A=()=>{const o=t.querySelector(".tab-btn.active");if(!o)return;const d=w.indexOf(o.getAttribute("data-tab"));S.disabled=d===0,L.disabled=d===w.length-1};y.forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-tab");y.forEach(r=>r.classList.remove("active")),C.forEach(r=>r.classList.remove("active")),o.classList.add("active");const f=t.querySelector(`#tab-${d}`);f&&f.classList.add("active"),A()})}),S&&S.addEventListener("click",()=>{const o=t.querySelector(".tab-btn.active");if(!o)return;const d=w.indexOf(o.getAttribute("data-tab"));if(d>0){const f=w[d-1],r=t.querySelector(`[data-tab="${f}"]`);r&&r.click()}}),L&&L.addEventListener("click",()=>{const o=t.querySelector(".tab-btn.active");if(!o)return;const d=w.indexOf(o.getAttribute("data-tab"));if(d<w.length-1){const f=w[d+1],r=t.querySelector(`[data-tab="${f}"]`);r&&r.click()}}),A(),(()=>{const o=["rm-name","physical-shape","purpose-of-use","department"];let d=!1;const f=()=>{const r=t.querySelector(".tab-btn.active");if(!r||r.getAttribute("data-tab")!=="basic-info")return;let v=0;o.forEach(T=>{const k=t.querySelector(`#${T}`);if(k){let $=!1;k.tagName==="SELECT"?$=k.value&&k.value!=="":(k.type,$=k.value&&k.value.trim()!==""),$&&v++}}),v===o.length&&!d&&(d=!0,setTimeout(()=>{L&&!L.disabled&&L.click()},500))};o.forEach(r=>{const v=t.querySelector(`#${r}`);v&&(v.addEventListener("input",f),v.addEventListener("change",f))}),y.forEach(r=>{r.addEventListener("click",()=>{r.getAttribute("data-tab")==="basic-info"&&(d=!1)})})})(),(()=>{if(this.currentEditId)return;const o=c=>t.querySelector(`#${c}`),d=c=>(o(c)?.value||"").trim(),f=o("sds-company-branch"),r=o("sds-scientific-name"),v=o("sds-trade-name"),T=o("sds-chemical-properties"),k=o("sds-physical-properties"),$=o("sds-other-requirements"),z=[f,r,v,T,k,$].filter(Boolean),U=c=>{c&&(c.dataset.sdsUserEdited="1")};z.forEach(c=>{c.addEventListener("input",()=>U(c)),c.addEventListener("change",()=>U(c))});const j=(c,u)=>{if(!c||c.dataset.sdsUserEdited==="1")return;const D=(u||"").trim();if(c.value!==D){c.value=D,c.dataset.sdsAutofilled="1";try{c.dispatchEvent(new Event("input",{bubbles:!0}))}catch{}}},B=()=>{const c=(AppState?.companySettings?.name||AppState?.companyName||"").trim(),u=d("department");return c&&u?`${c} - ${u}`:c||u},P=()=>{const c=d("hazard-class"),u=d("hazard-description"),D=[];return c&&D.push(`\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${c}`),u&&D.push(`\u0648\u0635\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${u}`),D.join(`
`)},_=()=>{const c=d("physical-shape"),u=d("qty-year"),D=d("location-store"),M=[];return c&&M.push(`\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A: ${c}`),D&&M.push(`\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646: ${D}`),u&&M.push(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0633\u0646\u0648\u064A\u0627\u064B: ${u}`),M.join(`
`)},N=()=>{const c=d("local-import"),u=d("manufacturer"),D=d("agent-egypt"),M=(t.querySelector("#nfpa-health-dropdown")?.value||"").trim(),R=(t.querySelector("#nfpa-fire-dropdown")?.value||"").trim(),O=(t.querySelector("#nfpa-reactivity-dropdown")?.value||"").trim(),q=(t.querySelector("#nfpa-special-dropdown")?.value||"").trim(),W=[M||"0",R||"0",O||"0",q||""].join("-"),H=[];return c&&H.push(`\u0645\u062D\u0644\u064A/\u0645\u0633\u062A\u0648\u0631\u062F: ${c}`),u&&H.push(`\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629: ${u}`),D&&H.push(`\u0627\u0644\u0648\u0643\u064A\u0644 \u0641\u064A \u0645\u0635\u0631: ${D}`),H.push(`NFPA: ${W}`),H.filter(Boolean).join(`
`)},I=()=>{const c=d("rm-name");j(r,c),j(v,c),j(f,B()),j(T,P()),j(k,_()),j($,N())};["rm-name","department","local-import","manufacturer","agent-egypt","hazard-class","hazard-description","physical-shape","location-store","qty-year"].forEach(c=>{const u=o(c);u&&(u.addEventListener("input",I),u.addEventListener("change",I))}),["nfpa-health-dropdown","nfpa-fire-dropdown","nfpa-reactivity-dropdown","nfpa-special-dropdown"].forEach(c=>{const u=o(c);u&&u.addEventListener("change",I)}),I()})(),t.addEventListener("click",o=>{o.target===t&&t.remove()})},togglePurposeOption(e,t){const a=document.getElementById("purpose-selected-tags"),l=document.getElementById("purpose-of-use");if(!a||!l)return;if(t){const n=document.createElement("span");n.className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold purpose-tag",n.setAttribute("data-value",e),n.innerHTML=`
                ${Utils.escapeHTML(e)}
                <button type="button" onclick="ChemicalSafety.removePurposeTag('${Utils.escapeHTML(e)}')" 
                    class="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                    <i class="fas fa-times text-xs"></i>
                </button>
            `,a.innerHTML=a.innerHTML.replace('<span class="text-gray-400 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u064A \u063A\u0631\u0636</span>',""),a.appendChild(n)}else{const n=a.querySelector(`[data-value="${Utils.escapeHTML(e)}"]`);n&&n.remove();const i=document.querySelector(`.purpose-checkbox[value="${Utils.escapeHTML(e)}"]`);i&&(i.checked=!1)}const s=Array.from(a.querySelectorAll(".purpose-tag")).map(n=>n.getAttribute("data-value"));l.value=s.join(","),s.length===0?(a.innerHTML='<span class="text-gray-400 text-sm">\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u064A \u063A\u0631\u0636</span>',l.setCustomValidity("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u0631\u0636 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644")):l.setCustomValidity("");try{l.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}},removePurposeTag(e){const t=document.querySelector(`.purpose-checkbox[value="${Utils.escapeHTML(e)}"]`);t&&(t.checked=!1,this.togglePurposeOption(e,!1))},renderNFPADiamond(e,t="normal"){const a=e.health||0,l=e.flammability||0,s=e.instability||0,n=String(e.special||"").trim().toUpperCase(),i=t==="compact",g=a>0||l>0||s>0||n,p=i?280:320,m=i?56:64,b=(d=>{const r=String(d||"").length;return r<=1?i?32:36:r===2?i?28:32:r===3?i?24:28:r===4?i?20:24:i?18:20})(n),h=Utils.escapeHTML(n),y=i?4:5,C=i?"0":"30px",S=i?"0":"30px",L=!i,w=(d,f)=>f==="health"?"#0066CC":f==="flammability"?"#FF0000":f==="instability"?"#FFCC00":"#F5F5F5",A=(d,f)=>f==="health"||f==="flammability"||f==="instability"?"#FFFFFF":"#000000",F=d=>({0:"Normal Material",1:"Slightly Hazardous",2:"Hazardous",3:"Extreme Danger",4:"Deadly"})[d]||"",E=d=>({0:"Will Not Burn",1:"Above 200\xB0F",2:"Below 200\xB0F",3:"Below 100\xB0F",4:"Below 73\xB0F"})[d]||"",o=d=>({0:"Stable",1:"Unstable if Heated",2:"Violent Chemical Change",3:"Shock and Heat May Detonate",4:"May Detonate"})[d]||"";return`
            <style>
                .nfpa-diamond-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: ${S};
                    padding: ${C};
                    background: ${i?"transparent":"linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"};
                    border-radius: ${i?"0":"16px"};
                    box-shadow: ${i?"none":"0 8px 16px rgba(0,0,0,0.1)"};
                    position: relative;
                }
                .nfpa-info-grid {
                    display: ${L?"grid":"none"};
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    width: 100%;
                    max-width: 800px;
                }
                .nfpa-info-box {
                    background: white;
                    border: 2px solid;
                    border-radius: 8px;
                    padding: 12px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .nfpa-info-box:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                }
                .nfpa-info-box.health { border-color: #0046BE; }
                .nfpa-info-box.fire { border-color: #DC2626; }
                .nfpa-info-box.instability { border-color: #EAB308; }
                .nfpa-info-box.special { border-color: #000000; }
                .nfpa-info-title {
                    font-weight: bold;
                    font-size: 13px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    padding-bottom: 6px;
                    border-bottom: 2px solid;
                }
                .nfpa-info-box.health .nfpa-info-title { color: #0046BE; border-color: #0046BE; }
                .nfpa-info-box.fire .nfpa-info-title { color: #DC2626; border-color: #DC2626; }
                .nfpa-info-box.instability .nfpa-info-title { color: #EAB308; border-color: #EAB308; }
                .nfpa-info-box.special .nfpa-info-title { color: #000000; border-color: #000000; }
                .nfpa-info-item {
                    font-size: 11px;
                    padding: 4px 0;
                    border-bottom: 1px solid #eee;
                    line-height: 1.4;
                }
                .nfpa-info-item:last-child {
                    border-bottom: none;
                }
                .nfpa-diamond-main {
                    width: ${p}px;
                    height: ${p}px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: ${i?"20px auto":"30px auto"};
                    overflow: visible;
                    flex-shrink: 0;
                }
                .nfpa-diamond-main svg {
                    width: ${p}px;
                    height: ${p}px;
                    display: block;
                    overflow: visible;
                    shape-rendering: geometricPrecision;
                    flex-shrink: 0;
                }
                .nfpa-diamond-main svg polygon {
                    stroke-width: ${y};
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                }
                .nfpa-diamond-main svg path {
                    stroke-width: ${y};
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                }
                .nfpa-diamond-main svg text {
                    font-family: 'Arial Black', 'Arial', 'Helvetica', sans-serif;
                    font-weight: 900;
                    font-stretch: condensed;
                    letter-spacing: -1px;
                }
                .nfpa-compact-layout {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    gap: 30px;
                    justify-content: center;
                    width: 100%;
                    flex-wrap: wrap;
                }
                .nfpa-compact-values {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    min-width: 180px;
                }
                .nfpa-compact-value-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    border: 2px solid;
                }
                .nfpa-compact-value-item.health {
                    background-color: #0046BE;
                    color: white;
                    border-color: #003399;
                }
                .nfpa-compact-value-item.fire {
                    background-color: #DC2626;
                    color: white;
                    border-color: #B91C1C;
                }
                .nfpa-compact-value-item.reactivity {
                    background-color: #EAB308;
                    color: #000000;
                    border-color: #CA8A04;
                }
                .nfpa-compact-value-item.protection {
                    background-color: #FFFFFF;
                    color: #000000;
                    border-color: #000000;
                }
                .nfpa-compact-value-label {
                    font-weight: 700;
                    margin-right: 12px;
                    min-width: 100px;
                    text-transform: uppercase;
                    font-size: 13px;
                }
                .nfpa-compact-value-number {
                    font-weight: 900;
                    font-size: 24px;
                    margin-right: auto;
                }
            </style>
            ${i?"":`
            <div class="nfpa-diamond-wrapper">
                <!-- Info Boxes Grid -->
                <div class="nfpa-info-grid">
                    <!-- Health Info Box -->
                    <div class="nfpa-info-box health">
                        <div class="nfpa-info-title">HEALTH HAZARD</div>
                        <div class="nfpa-info-item"><strong>4</strong> Deadly</div>
                        <div class="nfpa-info-item"><strong>3</strong> Extreme Danger</div>
                        <div class="nfpa-info-item"><strong>2</strong> Hazardous</div>
                        <div class="nfpa-info-item"><strong>1</strong> Slightly Hazardous</div>
                        <div class="nfpa-info-item"><strong>0</strong> Normal Material</div>
                    </div>

                    <!-- Fire Info Box -->
                    <div class="nfpa-info-box fire">
                        <div class="nfpa-info-title">FIRE HAZARD</div>
                        <div class="nfpa-info-item"><strong>4</strong> Below 73\xB0F</div>
                        <div class="nfpa-info-item"><strong>3</strong> Below 100\xB0F</div>
                        <div class="nfpa-info-item"><strong>2</strong> Below 200\xB0F</div>
                        <div class="nfpa-info-item"><strong>1</strong> Above 200\xB0F</div>
                        <div class="nfpa-info-item"><strong>0</strong> Will Not Burn</div>
                    </div>

                    <!-- Instability Info Box -->
                    <div class="nfpa-info-box instability">
                        <div class="nfpa-info-title">INSTABILITY HAZARD</div>
                        <div class="nfpa-info-item"><strong>4</strong> May Detonate</div>
                        <div class="nfpa-info-item"><strong>3</strong> Shock and Heat May Detonate</div>
                        <div class="nfpa-info-item"><strong>2</strong> Violent Chemical Change</div>
                        <div class="nfpa-info-item"><strong>1</strong> Unstable if Heated</div>
                        <div class="nfpa-info-item"><strong>0</strong> Stable</div>
                    </div>

                    <!-- Specific Hazard Info Box -->
                    <div class="nfpa-info-box special">
                        <div class="nfpa-info-title">SPECIFIC HAZARD</div>
                        <div class="nfpa-info-item"><strong>ACID</strong> Acid</div>
                        <div class="nfpa-info-item"><strong>ALK</strong> Alkali</div>
                        <div class="nfpa-info-item"><strong>COR</strong> Corrosive</div>
                        <div class="nfpa-info-item"><strong>OX</strong> Oxidizer</div>
                        <div class="nfpa-info-item"><strong>W</strong> Use No Water</div>
                    </div>
                </div>
            </div>
            `}
            <!-- Main Diamond Layout - \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0635\u0648\u0631\u0629 \u0628\u062F\u0642\u0629 -->
            <div class="${i?"nfpa-compact-layout":""}">
                <!-- Main Diamond - \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0635\u0648\u0631\u0629 \u0628\u062F\u0642\u0629 -->
            <div class="nfpa-diamond-main">
                <svg width="${p}" height="${p}" viewBox="-6 -6 232 232" preserveAspectRatio="xMidYMid meet" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));">
                    <!-- Outer border - square rotated 45 degrees with thin border -->
                    <path d="M 110 0 L 220 110 L 110 220 L 0 110 Z" 
                        fill="none" 
                        stroke="#000000" 
                        stroke-width="${y}" 
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"/>
                    
                    <!-- NFPA 704 quadrants (rhombus) - \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u062A\u0642\u0633\u064A\u0645 \u0627\u0644\u0642\u064A\u0627\u0633\u064A -->
                    <!-- Midpoints: (55,55) (165,55) (55,165) (165,165) -->
                    <!-- Top (Flammability) - Red -->
                    <polygon points="110,0 165,55 110,110 55,55" 
                        fill="${w(l,"flammability")}"/>
                    <!-- Left (Health) - Blue -->
                    <polygon points="0,110 55,55 110,110 55,165" 
                        fill="${w(a,"health")}"/>
                    <!-- Right (Instability) - Yellow -->
                    <polygon points="220,110 165,55 110,110 165,165" 
                        fill="${w(s,"instability")}"/>
                    <!-- Bottom (Special) - White/Light Grey -->
                    <polygon points="110,220 55,165 110,110 165,165" 
                        fill="#F5F5F5"/>

                    <!-- Divider lines -->
                    <path d="M 55 55 L 165 165" stroke="#000000" stroke-width="${y}" stroke-linejoin="miter" stroke-miterlimit="10"/>
                    <path d="M 165 55 L 55 165" stroke="#000000" stroke-width="${y}" stroke-linejoin="miter" stroke-miterlimit="10"/>

                    <!-- Text values - centered \u062F\u0627\u062E\u0644 \u0643\u0644 \u062C\u0632\u0621 -->
                    <text x="110" y="55"
                        dy=".35em"
                        text-anchor="middle"
                        font-size="${m}" 
                        font-weight="900" 
                        fill="${A(l,"flammability")}" 
                        font-family="Arial, Helvetica, sans-serif"
                        style="user-select: none; pointer-events: none; font-stretch: normal;">
                        ${l}
                    </text>
                    
                    <text x="55" y="110"
                        dy=".35em"
                        text-anchor="middle"
                        font-size="${m}" 
                        font-weight="900" 
                        fill="${A(a,"health")}" 
                        font-family="Arial, Helvetica, sans-serif"
                        style="user-select: none; pointer-events: none; font-stretch: normal;">
                        ${a}
                    </text>
                    
                    <text x="165" y="110"
                        dy=".35em"
                        text-anchor="middle"
                        font-size="${m}" 
                        font-weight="900" 
                        fill="${A(s,"instability")}" 
                        font-family="Arial, Helvetica, sans-serif"
                        style="user-select: none; pointer-events: none; font-stretch: normal;">
                        ${s}
                    </text>
                    
                    ${n?`
                    <text x="110" y="165"
                        dy=".35em"
                        text-anchor="middle"
                        font-size="${b}" 
                        font-weight="900" 
                        fill="#000000" 
                        font-family="Arial, Helvetica, sans-serif"
                        letter-spacing="1px"
                        style="user-select: none; pointer-events: none;">
                        ${h}
                    </text>
                    `:""}
                </svg>
            </div>
            ${i?`
            <!-- Compact Values List - \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0635\u0648\u0631\u0629 -->
            <div class="nfpa-compact-values">
                <div class="nfpa-compact-value-item health">
                    <span class="nfpa-compact-value-label">Health</span>
                    <span class="nfpa-compact-value-number">${a}</span>
                </div>
                <div class="nfpa-compact-value-item fire">
                    <span class="nfpa-compact-value-label">Fire</span>
                    <span class="nfpa-compact-value-number">${l}</span>
                </div>
                <div class="nfpa-compact-value-item reactivity">
                    <span class="nfpa-compact-value-label">Reactivity</span>
                    <span class="nfpa-compact-value-number">${s}</span>
                </div>
                <div class="nfpa-compact-value-item protection">
                    <span class="nfpa-compact-value-label">Special</span>
                    <span class="nfpa-compact-value-number">${h||"-"}</span>
                </div>
            </div>
            `:`
            <!-- Current Values Description -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-300 shadow-sm">
                    <div class="text-xs font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <i class="fas fa-heartbeat"></i>HEALTH (\u0627\u0644\u0635\u062D\u0629)
                    </div>
                    <div class="text-sm text-blue-900 font-semibold">${F(a)}</div>
                </div>
                <div class="bg-red-50 p-4 rounded-lg border-2 border-red-300 shadow-sm">
                    <div class="text-xs font-bold text-red-800 mb-2 flex items-center gap-2">
                        <i class="fas fa-fire"></i>FIRE (\u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644)
                    </div>
                    <div class="text-sm text-red-900 font-semibold">${E(l)}</div>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300 shadow-sm">
                    <div class="text-xs font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle"></i>INSTABILITY (\u0627\u0644\u0627\u0633\u062A\u0642\u0631\u0627\u0631)
                    </div>
                    <div class="text-sm text-yellow-900 font-semibold">${o(s)}</div>
                </div>
            </div>
            `}
            </div>
        `},updateNFPADiamond(){const e=parseInt(document.getElementById("nfpa-health")?.value||0),t=parseInt(document.getElementById("nfpa-flammability")?.value||0),a=parseInt(document.getElementById("nfpa-instability")?.value||0),l=document.getElementById("nfpa-special")?.value||"",s=document.getElementById("nfpa-diamond-container");s&&(s.innerHTML=this.renderNFPADiamond({health:e,flammability:t,instability:a,special:l}))},updateNFPADiamondFromDropdown(){const e=document.getElementById("nfpa-health-dropdown"),t=document.getElementById("nfpa-fire-dropdown"),a=document.getElementById("nfpa-reactivity-dropdown"),l=document.getElementById("nfpa-special-dropdown"),s=parseInt(e?.value||0),n=parseInt(t?.value||0),i=parseInt(a?.value||0),g=l?.value||"",p=document.getElementById("nfpa-diamond-container");p&&(p.innerHTML=this.renderNFPADiamond({health:s,flammability:n,instability:i,special:g},"compact"))},async handleSubmit(e){const t=e.querySelector("#chemical-form");if(!t.checkValidity()){t.reportValidity();return}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...");try{const a=document.getElementById("purpose-of-use"),l=a?.value?a.value.split(",").filter(r=>r.trim()):[];if(l.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u0631\u0636 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645");return}const s={id:this.currentEditId||Utils.generateId("CHEM"),serialNumber:document.getElementById("serial-number").value||(AppState.appData.chemicalRegister?.length||0)+1,rmName:document.getElementById("rm-name").value.trim(),physicalShape:document.getElementById("physical-shape").value,purposeOfUse:l,methodOfApplication:document.getElementById("method-of-application").value.trim(),department:document.getElementById("department").value.trim(),localImport:document.getElementById("local-import").value,manufacturer:document.getElementById("manufacturer").value.trim(),agentEgypt:document.getElementById("agent-egypt").value.trim(),containerType:document.getElementById("container-type").value.trim(),containerDisposalMethod:document.getElementById("container-disposal").value.trim(),hazardClass:document.getElementById("hazard-class").value.trim(),hazardDescription:document.getElementById("hazard-description").value.trim(),locationStore:document.getElementById("location-store").value.trim(),qtyYear:document.getElementById("qty-year").value.trim(),nfpaDiamond:{health:parseInt(document.getElementById("nfpa-health-dropdown")?.value||document.getElementById("nfpa-health")?.value||0),flammability:parseInt(document.getElementById("nfpa-fire-dropdown")?.value||document.getElementById("nfpa-flammability")?.value||0),instability:parseInt(document.getElementById("nfpa-reactivity-dropdown")?.value||document.getElementById("nfpa-instability")?.value||0),special:(document.getElementById("nfpa-special-dropdown")?.value||document.getElementById("nfpa-special")?.value||"").trim()},createdAt:this.currentEditId?AppState.appData.chemicalRegister.find(r=>r.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},n=Array.from(document.querySelectorAll(".sds-ghs-checkbox:checked")).map(r=>(r?.value||"").trim()).filter(Boolean),i=(document.getElementById("sds-company-branch")?.value||"").trim(),g=(document.getElementById("sds-translation-status")?.value||"").trim(),p=(document.getElementById("sds-scientific-name")?.value||"").trim(),m=(document.getElementById("sds-trade-name")?.value||"").trim(),x=p||s.rmName||"",b=m||s.rmName||"",h=(document.getElementById("sds-first-aid")?.value||"").trim(),y=(document.getElementById("sds-fire-fighting")?.value||"").trim(),C=(document.getElementById("sds-spill-response")?.value||"").trim(),S=(document.getElementById("sds-handling-storage")?.value||"").trim(),L=(document.getElementById("sds-ppe")?.value||"").trim(),w=(document.getElementById("sds-chemical-properties")?.value||"").trim(),A=(document.getElementById("sds-physical-properties")?.value||"").trim(),F=(document.getElementById("sds-other-requirements")?.value||"").trim(),E=(document.getElementById("sds-approval-job")?.value||"").trim(),o=(document.getElementById("sds-approval-name")?.value||"").trim(),d=(document.getElementById("sds-approval-signature")?.value||"").trim(),f=(document.getElementById("sds-approval-date")?.value||"").trim();if(s.sds={companyBranch:i,translationStatus:g||"\u063A\u064A\u0631 \u0645\u062A\u0631\u062C\u0645",scientificName:x,tradeName:b,ghsPictograms:n,instructions:{firstAid:h,fireFighting:y,spillResponse:C,handlingStorage:S,ppe:L,chemicalProperties:w,physicalProperties:A,otherRequirements:F},approval:{jobTitle:E,name:o,signature:d,date:f}},this.msdsFiles.arabic){const r=await GoogleIntegration.uploadMultipleFilesToDrive([{file:this.msdsFiles.arabic,name:`MSDS_Arabic_${s.id}.pdf`}],"ChemicalManagement");r&&r.success&&r.files&&r.files[0]&&(s.msdsArabic=r.files[0].shareableLink||r.files[0].directLink)}else if(this.currentEditId){const r=AppState.appData.chemicalRegister.find(v=>v.id===this.currentEditId);r?.msdsArabic&&(s.msdsArabic=r.msdsArabic)}if(this.msdsFiles.english){const r=await GoogleIntegration.uploadMultipleFilesToDrive([{file:this.msdsFiles.english,name:`MSDS_English_${s.id}.pdf`}],"ChemicalManagement");r&&r.success&&r.files&&r.files[0]&&(s.msdsEnglish=r.files[0].shareableLink||r.files[0].directLink)}else if(this.currentEditId){const r=AppState.appData.chemicalRegister.find(v=>v.id===this.currentEditId);r?.msdsEnglish&&(s.msdsEnglish=r.msdsEnglish)}if(AppState.appData.chemicalRegister||(AppState.appData.chemicalRegister=[]),this.currentEditId){const r=AppState.appData.chemicalRegister.findIndex(v=>v.id===this.currentEditId);r!==-1&&(AppState.appData.chemicalRegister[r]=s)}else AppState.appData.chemicalRegister.push(s);await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"Chemical_Register",data:s,spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(this.currentEditId?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),e.remove(),this.currentEditId=null,this.msdsFiles={arabic:null,english:null},await this.loadChemicalList()}catch(a){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0627\u062F\u0629:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async viewChemical(e){const t=AppState.appData.chemicalRegister.find(n=>n.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const a=t.hazardClass&&(t.hazardClass.toLowerCase().includes("hazard")||t.hazardClass.toLowerCase().includes("\u062E\u0637")||t.hazardClass.toLowerCase().includes("danger")),l=!!(t.msdsArabic||t.msdsEnglish),s=document.createElement("div");s.className="modal-overlay",s.style.zIndex="10000",s.innerHTML=`
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto; overflow-x: hidden; border-radius: 15px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;">
                        <i class="fas fa-flask"></i>
                        <span>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</span>
                        ${a?'<span class="badge badge-danger mr-2 bg-red-500"><i class="fas fa-exclamation-triangle ml-1"></i>\u062E\u0637\u064A\u0631</span>':""}
                    </h2>
                    <button class="modal-close" style="color: white;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="background: #f8f9fa; padding: 25px;">
                    <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 -->
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-left: 4px solid #2196F3;">
                        <h3 class="text-lg font-bold mb-4 flex items-center gap-2" style="color: #1565C0;">
                            <i class="fas fa-info-circle" style="color: #1976D2;"></i>
                            \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-3 rounded-lg shadow-sm">
                                <label class="text-xs mb-1" style="color: #64748b;">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</label>
                                <p class="font-bold" style="color: #111827;">${Utils.escapeHTML(t.serialNumber||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded-lg shadow-sm">
                                <label class="text-xs mb-1" style="color: #64748b;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629</label>
                                <p class="font-bold" style="color: #111827;">${Utils.escapeHTML(t.rmName||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded-lg shadow-sm">
                                <label class="text-xs mb-1" style="color: #64748b;">\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A</label>
                                <p class="font-semibold" style="color: #111827;">${Utils.escapeHTML(t.physicalShape||"-")}</p>
                            </div>
                            <div class="bg-white p-3 rounded-lg shadow-sm">
                                <label class="text-xs mb-1" style="color: #64748b;">\u0627\u0644\u0642\u0633\u0645</label>
                                <p class="font-semibold" style="color: #111827;">${Utils.escapeHTML(t.department||"-")}</p>
                            </div>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 -->
                    <div class="mb-6">
                        <h3 class="text-lg font-bold mb-3 flex items-center gap-2" style="color: #111827;">
                            <i class="fas fa-list-check" style="color: #4CAF50;"></i>
                            \u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645
                        </h3>
                        <div class="p-4 rounded-lg border" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border: 2px solid #4CAF50;">
                            <div class="flex flex-wrap gap-2">
                                ${Array.isArray(t.purposeOfUse)?t.purposeOfUse.map(n=>`
                                        <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background: #4CAF50; color: white;">
                                            ${Utils.escapeHTML(n)}
                                        </span>
                                    `).join(""):`<span class="px-3 py-1 rounded-full text-sm" style="background: #4CAF50; color: white;">${Utils.escapeHTML(t.purposeOfUse||"-")}</span>`}
                            </div>
                        </div>
                    </div>

                    <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-tools" style="color: #9ca3af;"></i>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.methodOfApplication||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-globe" style="color: #9ca3af;"></i>\u0645\u062D\u0644\u064A / \u0645\u0633\u062A\u0648\u0631\u062F
                            </label>
                            <p style="color: #111827;">
                                <span class="px-2 py-1 rounded ${t.localImport==="Local"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800"}">
                                    ${Utils.escapeHTML(t.localImport||"-")}
                                </span>
                            </p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-industry" style="color: #9ca3af;"></i>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.manufacturer||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-handshake" style="color: #9ca3af;"></i>\u0627\u0644\u0648\u0643\u064A\u0644 \u0641\u064A \u0645\u0635\u0631
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.agentEgypt||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-box" style="color: #9ca3af;"></i>\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.containerType||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-recycle" style="color: #9ca3af;"></i>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0644\u0635
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.containerDisposalMethod||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-map-marker-alt" style="color: #9ca3af;"></i>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u062E\u0632\u0646
                            </label>
                            <p style="color: #111827;">${Utils.escapeHTML(t.locationStore||"-")}</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg border shadow-sm" style="border: 1px solid #e5e7eb;">
                            <label class="text-xs mb-1 flex items-center gap-1" style="color: #64748b;">
                                <i class="fas fa-calculator" style="color: #9ca3af;"></i>\u0627\u0644\u0643\u0645\u064A\u0629 / \u0627\u0644\u0633\u0646\u0629
                            </label>
                            <p class="font-semibold" style="color: #111827;">${Utils.escapeHTML(t.qtyYear||"-")}</p>
                        </div>
                    </div>

                    <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                    ${a||t.hazardClass||t.hazardDescription?`
                        <div class="p-4 rounded-lg mb-6 border-l-4" style="background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-left: 4px solid #f44336;">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2" style="color: #c62828;">
                                <i class="fas fa-exclamation-triangle" style="color: #d32f2f;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${t.hazardClass?`
                                    <div class="bg-white p-3 rounded-lg shadow-sm">
                                        <label class="text-xs mb-1" style="color: #64748b;">\u0627\u0644\u062A\u0635\u0646\u064A\u0641</label>
                                        <p class="font-bold" style="color: #c62828;">${Utils.escapeHTML(t.hazardClass)}</p>
                                    </div>
                                `:""}
                                ${t.hazardDescription?`
                                    <div class="bg-white p-3 rounded-lg shadow-sm md:col-span-2">
                                        <label class="text-xs mb-1" style="color: #64748b;">\u0648\u0635\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                        <p class="whitespace-pre-line" style="color: #111827;">${Utils.escapeHTML(t.hazardDescription)}</p>
                                    </div>
                                `:""}
                            </div>
                        </div>
                    `:""}

                    <!-- \u0645\u0644\u0641\u0627\u062A MSDS -->
                    ${l?`
                        <div class="p-4 rounded-lg mb-6 border-l-4" style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-left: 4px solid #9C27B0;">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2" style="color: #6A1B9A;">
                                <i class="fas fa-file-pdf" style="color: #7B1FA2;"></i>
                                \u0645\u0644\u0641\u0627\u062A MSDS
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${t.msdsArabic?`
                                    <a href="${Utils.escapeHTML(t.msdsArabic)}" target="_blank" 
                                       class="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all flex items-center justify-between group">
                                        <div class="flex items-center gap-3">
                                            <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                                <i class="fas fa-file-pdf text-purple-600 text-2xl"></i>
                                            </div>
                                            <div>
                                                <p class="font-semibold text-gray-800">MSDS (Arabic)</p>
                                                <p class="text-xs text-gray-500">\u0627\u0636\u063A\u0637 \u0644\u0644\u0641\u062A\u062D</p>
                                            </div>
                                        </div>
                                        <i class="fas fa-external-link-alt text-purple-600 group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                `:""}
                                ${t.msdsEnglish?`
                                    <a href="${Utils.escapeHTML(t.msdsEnglish)}" target="_blank" 
                                       class="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all flex items-center justify-between group">
                                        <div class="flex items-center gap-3">
                                            <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                                <i class="fas fa-file-pdf text-purple-600 text-2xl"></i>
                                            </div>
                                            <div>
                                                <p class="font-semibold text-gray-800">MSDS (English)</p>
                                                <p class="text-xs text-gray-500">\u0627\u0636\u063A\u0637 \u0644\u0644\u0641\u062A\u062D</p>
                                            </div>
                                        </div>
                                        <i class="fas fa-external-link-alt text-purple-600 group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                `:""}
                            </div>
                        </div>
                    `:""}

                    <!-- NFPA Diamond -->
                    ${t.nfpaDiamond?`
                        <div class="p-4 rounded-lg border-2 mb-6" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border: 2px solid #FF9800;">
                            <h3 class="text-lg font-bold mb-3 flex items-center gap-2" style="color: #E65100;">
                                <i class="fas fa-gem" style="color: #F57C00;"></i>
                                \u0645\u0631\u0628\u0639 NFPA (NFPA Diamond)
                            </h3>
                            <div class="flex justify-center">
                                ${this.renderNFPADiamond(t.nfpaDiamond,"compact")}
                            </div>
                        </div>
                    `:""}
                </div>
                <div class="modal-footer" style="background: #f8f9fa; border-top: 1px solid #e5e7eb; padding: 20px; display: flex; justify-content: center; gap: 12px;">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 20px;">
                        <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("chemical-safety"):""}
                    <button type="button" onclick="ChemicalSafety.exportPDF('${t.id}');"
                        class="btn-success" style="padding: 10px 20px;">
                        <i class="fas fa-file-pdf ml-2"></i>\u0637\u0628\u0627\u0639\u0629 / \u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" onclick="ChemicalSafety.downloadChemicalPDF('${t.id}');"
                        class="btn-primary" style="padding: 10px 20px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: none;">
                        <i class="fas fa-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 PDF (A4)
                    </button>
                    <button type="button" onclick="ChemicalSafety.editChemical('${t.id}'); this.closest('.modal-overlay').remove();"
                        class="btn-primary" style="padding: 10px 20px;">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(s),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(s,{moduleKey:"chemical-safety",record:t,recordId:t.id||t.isoCode||""}),s.addEventListener("click",n=>{n.target===s&&s.remove()})},async editChemical(e){const t=AppState.appData.chemicalRegister.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}await this.showForm(t)},async deleteChemical(e){const t=AppState.appData.chemicalRegister.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0627\u062F\u0629 "${t.rmName}"\u061F`)){Loading.show("\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641...");try{AppState.appData.chemicalRegister=AppState.appData.chemicalRegister.filter(a=>a.id!==e),await GoogleIntegration.sendRequest({action:"deleteFromSheet",data:{sheetName:"Chemical_Register",id:e,spreadsheetId:AppState.googleConfig?.sheets?.spreadsheetId}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),await this.loadChemicalList()}catch(a){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0627\u062F\u0629:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}},_escapePrint(e){try{return Utils.escapeHTML(e||"")}catch{return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}},_formatSDSCell(e,t="\u064A\u0638\u0647\u0631 \u0628\u0634\u0643\u0644 \u062A\u0644\u0642\u0627\u0626\u064A"){const a=String(e||"").trim();return a?`<div class="sds-pre">${this._escapePrint(a)}</div>`:`<div class="sds-placeholder">${this._escapePrint(t)}</div>`},_getSDSData(e){const t=e?.sds||{},a=t?.instructions||{},l=t?.approval||{},s=Array.isArray(t?.ghsPictograms)?t.ghsPictograms:typeof t?.ghsPictograms=="string"?t.ghsPictograms.split(",").map(n=>n.trim()).filter(Boolean):[];return{companyBranch:t?.companyBranch||"",translationStatus:t?.translationStatus||"\u063A\u064A\u0631 \u0645\u062A\u0631\u062C\u0645",scientificName:t?.scientificName||"",tradeName:t?.tradeName||"",ghsPictograms:s,instructions:{firstAid:a?.firstAid||"",fireFighting:a?.fireFighting||"",spillResponse:a?.spillResponse||"",handlingStorage:a?.handlingStorage||"",ppe:a?.ppe||"",chemicalProperties:a?.chemicalProperties||"",physicalProperties:a?.physicalProperties||"",otherRequirements:a?.otherRequirements||""},approval:{jobTitle:l?.jobTitle||"",name:l?.name||"",signature:l?.signature||"",date:l?.date||""}}},_renderGHSPictogramsPrint(e=[]){const t=new Set(Array.isArray(e)?e:[]),a=["environment","corrosion","skull","flame"],l=s=>GHS_PICTOGRAMS.find(n=>n.key===s);return`
            <div class="ghs-wrap">
                <div class="ghs-title">GHS</div>
                <div class="ghs-grid">
                    ${a.map(s=>{const n=l(s);if(!n)return"";const i=t.has(s);return`
                            <div class="ghs-item ${i?"selected":"unselected"}">
                                <div class="ghs-icon">${n.svg}</div>
                                <div class="ghs-caption">${this._escapePrint(n.labelAr)}</div>
                                <div class="ghs-checkbox ${i?"checked":""}"></div>
                            </div>
                        `}).join("")}
                </div>
            </div>
        `},generateSDSPrintContent(e){const t=this._getSDSData(e),a=g=>this._escapePrint(g),l=t.scientificName||e?.rmName||"",s=t.tradeName||e?.rmName||"",n=this.renderNFPADiamond(e?.nfpaDiamond||{},"compact"),i=this._renderGHSPictogramsPrint(t.ghsPictograms||[]);return`
            <style>
                /* Try to keep SDS in one page when possible (content-dependent) */
                @page { size: A4; margin: 12mm 10mm; }
                .report-body { background: #fff !important; }
                .sds-page { width: 100%; }
                .top-bar {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .top-box {
                    border: 1.5px solid #000;
                    padding: 6px 8px;
                    font-size: 12px;
                    text-align: center;
                    white-space: nowrap;
                }
                .title {
                    text-align: center;
                    font-size: 18px;
                    font-weight: 700;
                }

                table.sds-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    table-layout: fixed; 
                    page-break-inside: avoid;
                    direction: rtl;
                }
                .sds-table td { border: 1.5px solid #000; vertical-align: top; padding: 5px 6px; }
                .sds-label {
                    width: 26%;
                    background: #d9d9d9;
                    font-weight: 700;
                    text-align: right;
                    padding: 8px 8px;
                    font-size: 12px;
                }
                .sds-value { 
                    width: 74%; 
                    font-size: 12px;
                    text-align: right;
                    direction: rtl;
                }
                .sds-pre { white-space: pre-wrap; line-height: 1.45; }
                .sds-placeholder { color: #666; font-style: italic; }

                .hazards-row { padding: 0; }
                .hazards-inner {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    align-items: start;
                }
                .nfpa-wrap { text-align: center; }
                .nfpa-title { font-weight: 700; margin-bottom: 6px; font-size: 13px; }
                .nfpa-legend { margin-top: 6px; font-size: 10px; line-height: 1.35; text-align: right; }
                .nfpa-legend .c-blue { color: #0066CC; font-weight: 700; }
                .nfpa-legend .c-red { color: #FF0000; font-weight: 700; }
                .nfpa-legend .c-yellow { color: #B45309; font-weight: 700; }
                .nfpa-legend .c-white { color: #111; font-weight: 700; }

                .ghs-wrap { text-align: center; }
                .ghs-title { font-weight: 700; margin-bottom: 8px; font-size: 13px; }
                .ghs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    justify-items: center;
                }
                .ghs-item {
                    width: 112px;
                    padding: 6px 6px 8px 6px;
                    border: 2px solid #000;
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .ghs-item.unselected { opacity: 0.3; }
                .ghs-icon { 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                }
                .ghs-icon svg { 
                    width: 60px !important; 
                    height: 60px !important; 
                    display: block;
                    margin: 0 auto;
                }
                /* \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0638\u0647\u0648\u0631 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629 */
                .ghs-icon svg polygon,
                .ghs-icon svg path,
                .ghs-icon svg line,
                .ghs-icon svg circle,
                .ghs-icon svg rect {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                .ghs-checkbox {
                    width: 14px;
                    height: 14px;
                    border: 2px solid #000;
                    background: #ffffff;
                    margin: 4px auto 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                .ghs-checkbox.checked {
                    background: #000;
                }
                .ghs-checkbox.checked::after {
                    content: '\u2713';
                    color: #ffffff;
                    font-size: 10px;
                    font-weight: bold;
                    line-height: 1;
                }
                .ghs-caption { 
                    font-size: 11px; 
                    font-weight: 800; 
                    margin-top: 6px; 
                    color: #000;
                    text-align: center;
                    width: 100%;
                    border-top: 1px solid #000;
                    padding-top: 4px;
                    margin-bottom: 4px;
                }

                .approval-title { margin-top: 10px; font-weight: 800; text-decoration: underline; font-size: 13px; }
                table.approval { width: 100%; border-collapse: collapse; margin-top: 6px; table-layout: fixed; page-break-inside: avoid; }
                table.approval th, table.approval td { border: 1.5px solid #000; padding: 7px; font-size: 12px; }
                table.approval th { background: #d9d9d9; font-weight: 800; }

                .meta { margin-top: 8px; font-size: 10px; color: #444; text-align: left; direction: ltr; }

                /* Avoid breaking key blocks across pages */
                .sds-page, .top-bar, .approval-title { page-break-inside: avoid; }
            </style>

            <div class="sds-page">
                <div class="top-bar">
                    <div class="top-box">${a(t.companyBranch||"")}</div>
                    <div class="title">\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</div>
                    <div class="top-box">${a(t.translationStatus||"\u063A\u064A\u0631 \u0645\u062A\u0631\u062C\u0645")}</div>
                </div>

                <table class="sds-table">
                    <tr>
                        <td class="sds-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0639\u0644\u0645\u064A \u0644\u0644\u0645\u0627\u062F\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(l,"")}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0644\u0644\u0645\u0627\u062F\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(s,"")}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</td>
                        <td class="sds-value hazards-row">
                            <div class="hazards-inner">
                                <div class="nfpa-wrap">
                                    <div class="nfpa-title">NFPA</div>
                                    ${n}
                                    <div class="nfpa-legend">
                                        <div><span class="c-red">\u0627\u0644\u0623\u062D\u0645\u0631</span>: \u062E\u0637\u0631 \u062D\u0631\u064A\u0642</div>
                                        <div><span class="c-yellow">\u0627\u0644\u0623\u0635\u0641\u0631</span>: \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644</div>
                                        <div><span class="c-blue">\u0627\u0644\u0623\u0632\u0631\u0642</span>: \u062E\u0637\u0631 \u0639\u0644\u0649 \u0635\u062D\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646</div>
                                        <div><span class="c-white">\u0627\u0644\u0623\u0628\u064A\u0636</span>: \u062E\u0637\u0631 \u062E\u0627\u0635</div>
                                    </div>
                                </div>
                                ${i}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.firstAid)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0626\u064A\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.fireFighting)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0641\u064A \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0646\u0633\u0643\u0627\u0628\u0627\u062A</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.spillResponse)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u062A\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u062A\u062E\u0632\u064A\u0646</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.handlingStorage)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.ppe)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.chemicalProperties)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0627\u0644\u062E\u0648\u0627\u0635 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.physicalProperties)}</td>
                    </tr>
                    <tr>
                        <td class="sds-label">\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0623\u062E\u0631\u0649</td>
                        <td class="sds-value">${this._formatSDSCell(t.instructions.otherRequirements)}</td>
                    </tr>
                </table>

                <div class="approval-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</div>
                <table class="approval">
                    <thead>
                        <tr>
                            <th style="width: 25%;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <th style="width: 25%;">\u0627\u0644\u0627\u0633\u0645</th>
                            <th style="width: 25%;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                            <th style="width: 25%;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${a(t.approval.jobTitle)}</td>
                            <td>${a(t.approval.name)}</td>
                            <td>${a(t.approval.signature)}</td>
                            <td>${a(t.approval.date)}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="meta">Printed: ${a(new Date().toLocaleString("ar-EG"))}</div>
            </div>
        `},async exportPDF(e){const t=AppState.appData.chemicalRegister.find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");const a=t.serialNumber||`CHEM-${t.id?.substring(0,8)||"UNKNOWN"}`,l=this.generateSDSPrintContent(t),s="\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 (SDS)",n={type:"ChemicalSDS",id:t.id,code:a,url:`${window.location.origin}/chemical/${t.id}`},i=l+`
                <style>
                    /* \u062A\u0642\u0644\u064A\u0644 \u062D\u062C\u0645 \u0627\u0644\u0641\u0648\u062A\u0631 */
                    .report-footer {
                        margin-top: 15px !important;
                    }
                    .footer-watermark-frame {
                        padding: 10px 14px !important;
                        margin-top: 8px !important;
                    }
                    .footer-contact {
                        font-size: 9px !important;
                        margin-bottom: 6px !important;
                    }
                    .footer-bottom {
                        gap: 6px !important;
                        font-size: 10px !important;
                    }
                    .footer-meta-line {
                        font-size: 10px !important;
                        padding: 6px 0 !important;
                        gap: 15px !important;
                    }
                    .footer-meta-item {
                        font-size: 10px !important;
                        padding: 3px 10px !important;
                    }
                    .footer-bottom-text {
                        font-size: 10px !important;
                    }
                    /* \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0638\u0647\u0648\u0631 \u0623\u0644\u0648\u0627\u0646 GHS \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629 */
                    @media print {
                        .ghs-icon svg * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                    }
                </style>
            `,g=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(a,s,i,!1,!0,{version:"1.0",releaseDate:t.createdAt,revisionDate:t.updatedAt||t.createdAt,qrData:n},t.createdAt,t.updatedAt||t.createdAt):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${s}</title></head><body>${l}</body></html>`,p=new Blob([g],{type:"text/html;charset=utf-8"}),m=URL.createObjectURL(p),x=window.open(m,"_blank");x?x.onload=()=>{setTimeout(()=>{x.print(),setTimeout(()=>{URL.revokeObjectURL(m),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",a),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+a.message)}},async downloadChemicalPDF(e){const t=AppState.appData.chemicalRegister.find(l=>l.id===e);if(!t){Notification.error("\u0627\u0644\u0645\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let a=null;try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");const l=(r,v)=>new Promise((T,k)=>{if(v())return T();const $=document.createElement("script");$.src=r,$.onload=()=>T(),$.onerror=()=>k(new Error("Failed to load: "+r)),document.head.appendChild($)});await l("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof window.html2canvas<"u"),await l("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const s=t.serialNumber||`CHEM-${t.id?.substring(0,8)||"UNKNOWN"}`,n=this.generateSDSPrintContent(t);a=document.createElement("div"),a.id="chemical-pdf-temp-container",a.style.cssText=["position: fixed","top: -10000px","left: 0","width: 794px","background: #ffffff","padding: 24px 32px","box-sizing: border-box","font-family: Tahoma, Arial, sans-serif","direction: rtl","color: #111827","z-index: -1"].join("; ");const i=AppState&&(AppState.companySettings?.name||AppState.companyName)||"",g=AppState&&AppState.companyLogo||AppState&&AppState.companySettings?.logo||"",p=new Date().toLocaleDateString("en-GB");a.innerHTML=`
                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #dc2626;padding-bottom:10px;margin-bottom:14px;gap:12px;">
                    <div style="flex:0 0 auto;min-width:80px;">
                        ${g?`<img src="${g}" alt="" crossorigin="anonymous" style="max-height:54px;max-width:130px;object-fit:contain;">`:""}
                    </div>
                    <div style="flex:1;text-align:center;">
                        <div style="font-size:18px;font-weight:800;color:#991b1b;line-height:1.2;">\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 (SDS)</div>
                        <div style="font-size:11px;color:#6b7280;margin-top:4px;">Chemical Safety Data Sheet \u2014 ${s}</div>
                    </div>
                    <div style="flex:0 0 auto;min-width:80px;text-align:left;font-size:11px;color:#374151;">
                        <div style="font-weight:700;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(i)}</div>
                        <div style="margin-top:3px;color:#6b7280;">${p}</div>
                    </div>
                </div>
                <div id="chemical-pdf-body" style="font-size:11px;line-height:1.5;">
                    ${n}
                </div>
            `,document.body.appendChild(a);const m=a.querySelector("img");m&&!m.complete&&await new Promise(r=>{m.onload=r,m.onerror=r,setTimeout(r,2e3)});const x=await window.html2canvas(a,{scale:2,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",logging:!1,scrollX:0,scrollY:0,windowWidth:a.scrollWidth,windowHeight:a.scrollHeight}),{jsPDF:b}=window.jspdf,h=new b({orientation:"portrait",unit:"mm",format:"a4"}),y=h.internal.pageSize.getWidth(),C=h.internal.pageSize.getHeight(),S=8,L=y-S*2,w=C-S*2,A=x.width/x.height;let F=L,E=F/A;E>w&&(E=w,F=E*A);const o=(y-F)/2,d=S;h.addImage(x.toDataURL("image/jpeg",.92),"JPEG",o,d,F,E),h.setDrawColor(220,38,38),h.setLineWidth(.3),h.line(S,C-7,y-S,C-7),h.setTextColor(120,120,120),h.setFontSize(8),h.text(`${s}`,S,C-3,{align:"left"}),h.text(`${new Date().toISOString().slice(0,10)}`,y/2,C-3,{align:"center"}),h.text("1 / 1",y-S,C-3,{align:"right"});const f=(t.materialName||t.tradeName||s).toString().replace(/[\/\\:*?"<>|]/g,"_").substring(0,60);h.save(`SDS_${f}_${s}.pdf`),Loading.hide(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(l){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 PDF \u0644\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629:",l),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF: "+(l?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{a&&a.parentNode&&a.parentNode.removeChild(a)}},async exportToPDF(){const e=this.getFilteredChemicals(AppState.appData.chemicalRegister||[]);if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");try{const t=e.map(b=>{const h=b.hazardClass&&(b.hazardClass.toLowerCase().includes("hazard")||b.hazardClass.toLowerCase().includes("\u062E\u0637")||b.hazardClass.toLowerCase().includes("danger"));return`
                    <tr class="${h?"hazardous-row":""}">
                        <td>${Utils.escapeHTML(b.serialNumber||"")}</td>
                        <td><strong>${Utils.escapeHTML(b.rmName||"")}</strong>${h?" \u26A0\uFE0F":""}</td>
                        <td>${Utils.escapeHTML(b.physicalShape||"")}</td>
                        <td>${Array.isArray(b.purposeOfUse)?b.purposeOfUse.join(", "):Utils.escapeHTML(b.purposeOfUse||"")}</td>
                        <td>${Utils.escapeHTML(b.department||"")}</td>
                        <td><strong>${Utils.escapeHTML(b.hazardClass||"-")}</strong></td>
                        <td>${Utils.escapeHTML(b.locationStore||"")}</td>
                        <td>${Utils.escapeHTML(b.qtyYear||"")}</td>
                        <td>${h?'<strong style="color: #dc2626;">\u062E\u0637\u064A\u0631</strong>':'<span style="color: #16a34a;">\u0622\u0645\u0646</span>'}</td>
                    </tr>
                `}).join(""),a=this.getStatistics(),l=`
                <style>
                    .chemical-report-info {
                        display: flex;
                        justify-content: space-around;
                        margin: 20px 0;
                        padding: 15px;
                        background: #f0f9ff;
                        border-radius: 8px;
                    }
                    .chemical-report-info-item {
                        text-align: center;
                    }
                    .chemical-report-info-label {
                        font-size: 12px;
                        color: #64748b;
                        margin-bottom: 5px;
                    }
                    .chemical-report-info-value {
                        font-size: 18px;
                        font-weight: bold;
                        color: #1e40af;
                    }
                    .chemical-report-table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 20px; 
                        font-size: 10px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .chemical-report-table th, .chemical-report-table td { 
                        border: 1px solid #cbd5e1; 
                        padding: 10px 8px; 
                        text-align: right; 
                    }
                    .chemical-report-table th { 
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        color: white; 
                        font-weight: bold;
                        font-size: 11px;
                    }
                    .chemical-report-table tr:nth-child(even) { 
                        background-color: #f8fafc; 
                    }
                    .chemical-report-table tr:hover {
                        background-color: #e0f2fe;
                    }
                    .chemical-report-table .hazardous-row {
                        background-color: #fef2f2 !important;
                    }
                    /* \u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0641\u0648\u062A\u0631 \u0644\u064A\u0643\u0648\u0646 \u0623\u0635\u063A\u0631 */
                    .report-footer {
                        margin-top: 20px !important;
                    }
                    .footer-watermark-frame {
                        padding: 12px 16px !important;
                        margin-top: 10px !important;
                    }
                    .footer-contact {
                        font-size: 10px !important;
                        margin-bottom: 8px !important;
                    }
                    .footer-bottom {
                        gap: 8px !important;
                        font-size: 11px !important;
                    }
                    .footer-meta-line {
                        font-size: 11px !important;
                        padding: 8px 0 !important;
                        gap: 20px !important;
                    }
                    .footer-meta-item {
                        font-size: 11px !important;
                        padding: 4px 12px !important;
                    }
                    .footer-bottom-text {
                        font-size: 11px !important;
                    }
                    @media print { 
                        .chemical-report-table { font-size: 9px; } 
                        .chemical-report-table th, .chemical-report-table td { padding: 6px 4px; }
                    }
                </style>
                <div class="chemical-report-info">
                    <div class="chemical-report-info-item">
                        <div class="chemical-report-info-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631</div>
                        <div class="chemical-report-info-value">${new Date().toLocaleDateString("ar-EG")}</div>
                    </div>
                    <div class="chemical-report-info-item">
                        <div class="chemical-report-info-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0627\u062F</div>
                        <div class="chemical-report-info-value">${a.total}</div>
                    </div>
                    <div class="chemical-report-info-item">
                        <div class="chemical-report-info-label">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629</div>
                        <div class="chemical-report-info-value" style="color: #dc2626;">${a.hazardous}</div>
                    </div>
                    <div class="chemical-report-info-item">
                        <div class="chemical-report-info-label">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0622\u0645\u0646\u0629</div>
                        <div class="chemical-report-info-value" style="color: #16a34a;">${a.safe}</div>
                    </div>
                </div>
                <table class="chemical-report-table">
                    <thead>
                        <tr>
                            <th>\u0645</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629</th>
                            <th>\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A</th>
                            <th>\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
                            <th>\u0627\u0644\u0642\u0633\u0645</th>
                            <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u062E\u0632\u0646</th>
                            <th>\u0627\u0644\u0643\u0645\u064A\u0629/\u0627\u0644\u0633\u0646\u0629</th>
                            <th>\u062E\u0637\u0648\u0631\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t}
                    </tbody>
                </table>
                <p style="margin-top: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                    \u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629: ${e.length}
                </p>
            `,s="\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",n="CHEMICAL-REGISTER",i=new Date().toISOString(),g=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(n,s,l,!1,!1,{version:"1.0",releaseDate:i,revisionDate:i},i,i):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${s}</title></head><body>${l}</body></html>`,p=new Blob([g],{type:"text/html;charset=utf-8"}),m=URL.createObjectURL(p),x=window.open(m,"_blank");x?x.onload=()=>{setTimeout(()=>{x.print(),setTimeout(()=>{URL.revokeObjectURL(m),Loading.hide()},800)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(t){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async exportToExcel(){const e=this.getFilteredChemicals(AppState.appData.chemicalRegister||[]);if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 Excel...");try{if(typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629");return}const t=e.map(i=>{const g=i.hazardClass&&(i.hazardClass.toLowerCase().includes("hazard")||i.hazardClass.toLowerCase().includes("\u062E\u0637")||i.hazardClass.toLowerCase().includes("danger")),p=i.nfpaDiamond||{};return{\u0645:i.serialNumber||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u062F\u0629":i.rmName||"","\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A":i.physicalShape||"","\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645":Array.isArray(i.purposeOfUse)?i.purposeOfUse.join("; "):i.purposeOfUse||"","\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642":i.methodOfApplication||"",\u0627\u0644\u0642\u0633\u0645:i.department||"","MSDS (Arabic)":i.msdsArabic||"","MSDS (English)":i.msdsEnglish||"","\u0645\u062D\u0644\u064A / \u0645\u0633\u062A\u0648\u0631\u062F":i.localImport||"","\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629":i.manufacturer||"","\u0627\u0644\u0648\u0643\u064A\u0644 \u0641\u064A \u0645\u0635\u0631":i.agentEgypt||"","\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u0648\u064A\u0629":i.containerType||"","\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0644\u0635":i.containerDisposalMethod||"",\u0627\u0644\u062A\u0635\u0646\u064A\u0641:i.hazardClass||"","\u0648\u0635\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":i.hazardDescription||"","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u062E\u0632\u0646":i.locationStore||"","\u0627\u0644\u0643\u0645\u064A\u0629 / \u0627\u0644\u0633\u0646\u0629":i.qtyYear||"","NFPA Health":p.health||0,"NFPA Flammability":p.flammability||0,"NFPA Instability":p.instability||0,"NFPA Special":p.special||"","\u062D\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629":g?"\u062E\u0637\u064A\u0631":"\u0622\u0645\u0646"}}),a=XLSX.utils.json_to_sheet(t),l=[{wch:8},{wch:25},{wch:15},{wch:30},{wch:20},{wch:15},{wch:30},{wch:30},{wch:12},{wch:20},{wch:20},{wch:15},{wch:20},{wch:20},{wch:30},{wch:20},{wch:15},{wch:12},{wch:15},{wch:15},{wch:12},{wch:12}];a["!cols"]=l;const s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,a,"\u0633\u062C\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629");const n=`\u0633\u062C\u0644_\u0627\u0644\u0645\u0648\u0627\u062F_\u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(s,n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F ChemicalSafety module..."),this._eventListenersAbortController&&(this._eventListenersAbortController.abort(),this._eventListenersAbortController=null),this._setupTimeoutId&&(clearTimeout(this._setupTimeoutId),this._setupTimeoutId=null),this.currentEditId=null,this.msdsFiles={arabic:null,english:null},this.filters={search:"",department:"",physicalShape:"",classification:""},typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F ChemicalSafety module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 ChemicalSafety module:",e)}}};(function(){"use strict";try{typeof window<"u"&&typeof ChemicalSafety<"u"&&(window.ChemicalSafety=ChemicalSafety,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 ChemicalSafety module loaded and available on window.ChemicalSafety"))}catch{if(typeof window<"u"&&typeof ChemicalSafety<"u")try{window.ChemicalSafety=ChemicalSafety}catch{}}})();
