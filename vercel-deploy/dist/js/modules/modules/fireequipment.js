FireEquipment={state:{currentTab:"database",filters:{search:"",type:"all",status:"all",location:"all"}},applyModuleI18n(e){const a=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!a)return;const s=e||document.getElementById("fire-equipment-section")||document;a.applyI18n(s),typeof a.applyLiteralTranslations=="function"&&a.applyLiteralTranslations(s)},assetTypes:["\u0637\u0641\u0627\u064A\u0629 \u062D\u0631\u064A\u0642","\u062E\u0631\u0637\u0648\u0645 \u062D\u0631\u064A\u0642","\u0635\u0646\u062F\u0648\u0642 \u062D\u0631\u064A\u0642","\u062C\u0647\u0627\u0632 \u0625\u0646\u0630\u0627\u0631","\u0646\u0638\u0627\u0645 \u0631\u0634 \u0645\u0627\u0626\u064A","\u0645\u0636\u062E\u0629 \u062D\u0631\u064A\u0642","\u0635\u0645\u0627\u0645 \u062D\u0631\u064A\u0642","\u0623\u062E\u0631\u0649"],statusOptions:[{value:"\u0635\u0627\u0644\u062D",label:"\u0635\u0627\u0644\u062D"},{value:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",label:"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"},{value:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629",label:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"}],confirmClose(e){confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u061F
\u0633\u064A\u062A\u0645 \u0641\u0642\u062F\u0627\u0646 \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.`)&&e.closest(".modal-overlay").remove()},closeModal(e){const a=e.closest(".modal-overlay");a&&a.remove()},generateFireDeviceID(){const a=this.getAssets().map(i=>i.id).filter(i=>i&&i.match(/^EFA-\d{4}$/)).map(i=>parseInt(i.split("-")[1])).filter(i=>!isNaN(i)),s=a.length>0?Math.max(...a)+1:1;return`EFA-${String(s).padStart(4,"0")}`},async load(){try{const e=document.getElementById("fire-equipment-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 fire-equipment-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>',this.applyModuleI18n(e);return}AppState.appData||(AppState.appData={});const a='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';e.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-fire-extinguisher ml-3"></i>
                                \u0633\u062C\u0644 \u0648\u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                            </h1>
                            <p class="section-subtitle">
                                \u0625\u062F\u0627\u0631\u0629 \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u0644\u0643\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0645\u0639 \u062A\u062A\u0628\u0639 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0648QR Code \u0644\u0643\u0644 \u062C\u0647\u0627\u0632
                            </p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${this.canAdd()?`
                            <button id="add-fire-asset-btn" class="btn-secondary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F
                            </button>
                            `:""}
                            <button id="scan-qr-inspection-btn" class="btn-primary">
                                <i class="fas fa-qrcode ml-2"></i>
                                \u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A
                            </button>
                            <button id="refresh-fire-equipment-btn" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </div>
                </div>
                <style>
                    .fire-tabs-container {
                        margin-bottom: 1.5rem;
                    }
                    .fire-tabs-header {
                        display: flex;
                        gap: 0.5rem;
                        border-bottom: 2px solid #e5e7eb;
                        padding-bottom: 0;
                    }
                    .fire-tab-btn {
                        padding: 0.75rem 1.5rem;
                        background: none;
                        border: none;
                        border-bottom: 3px solid transparent;
                        color: #6b7280;
                        font-size: 0.9375rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        position: relative;
                        margin-bottom: -2px;
                    }
                    .fire-tab-btn:hover {
                        color: #3b82f6;
                        background-color: rgba(59, 130, 246, 0.05);
                    }
                    .fire-tab-btn.active {
                        color: #3b82f6;
                        border-bottom-color: #3b82f6;
                        font-weight: 600;
                    }
                    .fire-tab-btn i {
                        font-size: 14px;
                    }
                    .fire-tab-content {
                        display: none;
                    }
                    .fire-tab-content.active {
                        display: block;
                    }
                    .fire-tab-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 3rem;
                        min-height: 200px;
                    }
                    .fire-tab-loading i {
                        font-size: 2rem;
                        color: #3b82f6;
                        margin-bottom: 1rem;
                    }
                    @media (max-width: 768px) {
                        .fire-tabs-header {
                            flex-wrap: wrap;
                            gap: 0.25rem;
                        }
                        .fire-tab-btn {
                            padding: 0.625rem 1rem;
                            font-size: 0.875rem;
                        }
                    }
                </style>
                <div class="fire-tabs-container mt-6">
                    <div class="fire-tabs-header">
                        ${this.hasTabAccess("database")?`
                        <button class="fire-tab-btn active" data-tab="database" onclick="FireEquipment.switchTab('database')">
                            <i class="fas fa-database ml-2"></i>
                            \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                        </button>
                        `:""}
                        ${this.hasTabAccess("register")?`
                        <button class="fire-tab-btn" data-tab="register" onclick="FireEquipment.switchTab('register')">
                            <i class="fas fa-clipboard-list ml-2"></i>
                            \u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631
                        </button>
                        `:""}
                        ${this.hasTabAccess("inspections")?`
                        <button class="fire-tab-btn" data-tab="inspections" onclick="FireEquipment.switchTab('inspections')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629
                        </button>
                        `:""}
                        ${this.hasTabAccess("analytics")?`
                        <button class="fire-tab-btn" data-tab="analytics" onclick="FireEquipment.switchTab('analytics')">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </button>
                        `:""}
                        ${this.hasTabAccess("approval-requests")?`
                        <button class="fire-tab-btn" data-tab="approval-requests" onclick="FireEquipment.switchTab('approval-requests')">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </button>
                        `:""}
                    </div>
                </div>
                <div id="fire-tab-content">
                    <div id="fire-tab-database" class="fire-tab-content active">
                        ${a}
                    </div>
                    <div id="fire-tab-register" class="fire-tab-content" style="display: none;">
                        ${a}
                    </div>
                    <div id="fire-tab-inspections" class="fire-tab-content" style="display: none;">
                        ${a}
                    </div>
                    ${this.isAdmin()?`
                    <div id="fire-tab-analytics" class="fire-tab-content" style="display: none;">
                        ${a}
                    </div>
                    <div id="fire-tab-approval-requests" class="fire-tab-content" style="display: none;">
                        ${a}
                    </div>
                    `:""}
                </div>
            `,this.applyModuleI18n(e);try{this.setupEventListeners()}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A setupEventListeners:",s)}setTimeout(async()=>{try{await new Promise(n=>{if(typeof AppState<"u"&&AppState&&AppState.appData){n();return}let o=0;const l=50,r=setInterval(()=>{o++,typeof AppState<"u"&&AppState&&AppState.appData?(clearInterval(r),n()):o>=l&&(clearInterval(r),(typeof AppState>"u"||!AppState)&&(AppState={}),AppState.appData||(AppState.appData={}),n())},100)});let t=!1;try{t=this.ensureData()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A ensureData:",n)}if(t)try{setTimeout(async()=>{try{await this.persistAll()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",n)}},0)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A persistAll:",n)}const i=document.getElementById("fire-tab-database");if(i){const n=async l=>{const r=(c,f,d)=>{const p=new Promise((u,g)=>{setTimeout(()=>g(new Error(d||"Timeout")),f)});return Promise.race([c,p])};return typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(l(),1e4,"Timeout: renderTabContent"):await r(l(),1e4,"Timeout: renderTabContent")},o=`
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p><p class="text-2xl font-bold" id="fire-summary-total">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0641\u0639\u0651\u0627\u0644\u0629</p><p class="text-2xl font-bold text-green-600" id="fire-summary-active">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629</p><p class="text-2xl font-bold text-yellow-600" id="fire-summary-maintenance">0</p></div></div>
                            </div>
                            <div class="content-card mt-6"><div class="card-body"><div id="fire-assets-table" class="overflow-x-auto"><div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0623\u0648 \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644.</p></div></div></div>
                        `;try{const l=await n(()=>this.renderTabContent("database"));i.innerHTML=l&&l.trim()?l:o}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l),i.innerHTML=o}try{this.renderAssets()}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",l)}}if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="database")try{this.renderAssets()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B renderAssets:",n)}if(this.state.currentTab==="register")try{typeof this.refreshRegisterTable=="function"?this.refreshRegisterTable():typeof this.refreshCurrentTab=="function"&&this.refreshCurrentTab()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0633\u062C\u0644:",n)}}).catch(n=>{if(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",n),this.state.currentTab==="database")try{this.renderAssets()}catch(o){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets \u0628\u0639\u062F \u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644:",o)}});else if(this.state.currentTab==="database")try{this.renderAssets()}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A renderAssets:",n)}}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:",s)}},0)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",e),section&&(section.innerHTML=`
                    <div class="section-header">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="section-title">
                                    <i class="fas fa-fire-extinguisher ml-3"></i>
                                    \u0633\u062C\u0644 \u0648\u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                                </h1>
                                <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u0644\u0643\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                    <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                    <p class="text-sm text-gray-400 mb-4">${e&&e.message?Utils.escapeHTML(e.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                    <button onclick="FireEquipment.load()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(section)),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:3e3})}},async switchTab(e){if(this.state.currentTab===e)return;this.ensureData(),document.querySelectorAll(".fire-tab-btn").forEach(s=>{s.classList.remove("active"),s.dataset.tab===e&&s.classList.add("active")}),document.querySelectorAll(".fire-tab-content").forEach(s=>{s.style.display="none",s.classList.remove("active")});const a=document.getElementById(`fire-tab-${e}`);if(a){if(a.style.display="block",a.classList.add("active"),a.innerHTML.includes("fire-tab-loading")||a.innerHTML.includes("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644"))try{const i=await(async n=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(n(),1e4,"Timeout: renderTabContent took too long"):await n())(()=>this.renderTabContent(e));a.innerHTML=i||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(a)}catch(t){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,t),a.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(a)}}else{const s=document.getElementById("fire-tab-content");if(s){const t=document.createElement("div");t.id=`fire-tab-${e}`,t.className="fire-tab-content active";const i='<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>';t.innerHTML=i,s.appendChild(t);try{const n=(r,c,f)=>{const d=new Promise((p,u)=>{setTimeout(()=>{u(new Error(f||`Timeout: \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0633\u062A\u063A\u0631\u0642\u062A \u0623\u0643\u062B\u0631 \u0645\u0646 ${c}ms`))},c)});return Promise.race([r,d])},l=await(async r=>typeof Utils<"u"&&Utils.promiseWithTimeout?await Utils.promiseWithTimeout(r(),1e4,"Timeout: renderTabContent took too long"):await n(r(),1e4,"Timeout: renderTabContent took too long"))(()=>this.renderTabContent(e));t.innerHTML=l||'<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(t)}catch(n){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 ${e}:`,n),t.innerHTML='<div class="fire-tab-loading"><p>\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</p></div>',this.applyModuleI18n(t)}}}if(this.state.currentTab=e,e==="database"){this.renderAssets();const s=this.getAssets();(!s||s.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="database"&&this.renderAssets()}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",t)})}else if(e==="register"){await this.refreshRegisterTable();const s=this.getAssets();(!s||s.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{this.state.currentTab==="register"&&this.refreshRegisterTable()}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062C\u0644:",t)})}else if(e==="inspections"){const s=this.getMonthlyInspections(),t=document.getElementById("inspections-completed"),i=document.getElementById("inspections-needs-repair"),n=document.getElementById("inspections-out-of-service"),o=document.getElementById("inspections-total");t&&(t.textContent=s.completed),i&&(i.textContent=s.needsRepair),n&&(n.textContent=s.outOfService),o&&(o.textContent=s.total);const l=document.getElementById("monthly-inspections-table");l&&(l.innerHTML=this.renderMonthlyInspectionsTable(s.list));const r=this.getInspections();(!r||r.length===0)&&this.loadFireEquipmentDataAsync().then(()=>{if(this.state.currentTab==="inspections"){const c=this.getMonthlyInspections(),f=document.getElementById("inspections-completed"),d=document.getElementById("inspections-needs-repair"),p=document.getElementById("inspections-out-of-service"),u=document.getElementById("inspections-total"),g=document.getElementById("monthly-inspections-table");f&&(f.textContent=c.completed),d&&(d.textContent=c.needsRepair),p&&(p.textContent=c.outOfService),u&&(u.textContent=c.total),g&&(g.innerHTML=this.renderMonthlyInspectionsTable(c.list))}}).catch(c=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A:",c)})}else if(e==="analytics")this.renderAnalyticsData();else if(e==="approval-requests"){const s=document.getElementById("fire-tab-approval-requests");if(s){const t=await this.renderApprovalRequestsTab();s.innerHTML=t,this.setupApprovalRequestsEventListeners();const i=this.getApprovalRequests();(!i||i.length===0)&&this.loadApprovalRequestsFromBackend().then(async()=>{if(this.state.currentTab==="approval-requests"){const n=await this.renderApprovalRequestsTab();s.innerHTML=n,this.setupApprovalRequestsEventListeners()}}).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n)})}}this.setupTabEventListeners(e)},async loadFireEquipmentDataAsync(){try{const[e,a,s]=await Promise.allSettled([GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0635\u0648\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getAllFireEquipmentInspections",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642:",o),{success:!1,data:[]})}),GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}}).catch(o=>{const l=o.message||o.toString()||"";return l.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||l.includes("timeout")?(Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645"),{success:!1,data:[]}):(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",o),{success:!1,data:[]})})]);let t=!1,i=!1;if(e.status==="fulfilled"&&e.value&&e.value.success&&Array.isArray(e.value.data)){AppState.appData.fireEquipmentAssets||(AppState.appData.fireEquipmentAssets=[]);const o=AppState.appData.fireEquipmentAssets||[],l=e.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentAssets=Array.from(r.values()),t=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.value.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}if(a.status==="fulfilled"&&a.value&&a.value.success&&Array.isArray(a.value.data)){AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const o=AppState.appData.fireEquipmentInspections||[],l=a.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentInspections=Array.from(r.values()),i=!0,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${a.value.data.length} \u0641\u062D\u0635 \u0645\u0646 Google Sheets (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentInspections.length})`)}if(s.status==="fulfilled"&&s.value&&s.value.success&&Array.isArray(s.value.data)){AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]);const o=AppState.appData.fireEquipmentApprovalRequests||[],l=s.value.data,r=new Map;o.forEach(c=>{c.id&&r.set(c.id,c)}),l.forEach(c=>{c.id&&r.set(c.id,c)}),AppState.appData.fireEquipmentApprovalRequests=Array.from(r.values()),localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${s.value.data.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentApprovalRequests.length})`)}const n=this.state.currentTab;if(n==="database")this.renderAssets();else if(n==="register"&&(t||i))this.state.currentTab==="register"&&await this.refreshRegisterTable();else if(n==="inspections"&&i&&this.state.currentTab==="inspections"){const o=this.getMonthlyInspections(),l=document.getElementById("inspections-completed"),r=document.getElementById("inspections-needs-repair"),c=document.getElementById("inspections-out-of-service"),f=document.getElementById("inspections-total");l&&(l.textContent=o.completed),r&&(r.textContent=o.needsRepair),c&&(c.textContent=o.outOfService),f&&(f.textContent=o.total);const d=document.getElementById("monthly-inspections-table");d&&(d.innerHTML=this.renderMonthlyInspectionsTable(o.list))}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(e){const a=e.message||e.toString()||"";Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Google Sheets:",e),(a.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||a.includes("timeout"))&&Notification.warning({title:"\u0627\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",message:"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629.",duration:5e3,persistent:!1})}},renderTabContentSync(e){const a=`
            <div class="fire-tab-loading">
                <div style="width: 300px; margin: 0 auto 16px;">
                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                    </div>
                </div>
                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
            </div>
        `;return e==="database"?`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-database ml-2"></i>
                            \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
                        </h2>
                    </div>
                    <div class="card-body">
                        ${a}
                        <div id="fire-assets-container" style="display: none;"></div>
                    </div>
                </div>
            `:a},async hideLoadingAndShowContent(){const e=this.state.currentTab,a=document.getElementById(`fire-tab-${e}`);if(a){const s=a.querySelector(".fire-tab-loading");s&&(s.style.display="none");try{const t=await this.renderTabContent(e);t&&(a.innerHTML=t,this.setupTabEventListeners(e))}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",t)}}},async renderTabContent(e){return e==="database"?await this.renderDatabaseTab():e==="register"?await this.renderRegisterTab():e==="inspections"?await this.renderInspectionsTab():e==="analytics"?await this.renderAnalyticsTab():e==="approval-requests"?await this.renderApprovalRequestsTab():""},async renderDatabaseTab(){return`
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="content-card">
                    <div class="text-center">
                        <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p>
                        <p class="text-2xl font-bold" id="fire-summary-total">0</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="text-center">
                        <p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0641\u0639\u0651\u0627\u0644\u0629</p>
                        <p class="text-2xl font-bold text-green-600" id="fire-summary-active">0</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="text-center">
                        <p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629</p>
                        <p class="text-2xl font-bold text-yellow-600" id="fire-summary-maintenance">0</p>
                    </div>
                </div>
            </div>
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-filter ml-2"></i>\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0633\u062C\u0644</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="form-label">\u0628\u062D\u062B</label>
                            <input type="text" id="fire-assets-search" class="form-input" placeholder="\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u0645\u0648\u0642\u0639...">
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u0646\u0648\u0639</label>
                            <select id="fire-assets-type" class="form-input">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="fire-assets-status" class="form-input">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <select id="fire-assets-location" class="form-input">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
                <div class="content-card xl:col-span-2">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-database ml-2"></i>\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642</h2>
                    </div>
                    <div class="card-body" id="fire-assets-table"></div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-history ml-2"></i>\u0623\u062D\u062F\u062B \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</h2>
                    </div>
                    <div class="card-body" id="fire-recent-inspections"></div>
                </div>
            </div>
        `},renderRegisterStatisticsCards(){const e=this.getRegisterStatistics();return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="content-card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p>
                            <p class="text-3xl font-bold text-blue-600" id="register-stat-total">${e.total}</p>
                        </div>
                        <div class="bg-blue-500 rounded-full p-4">
                            <i class="fas fa-fire-extinguisher text-white text-2xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs text-gray-500">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629</p>
                    </div>
                </div>
                
                <div class="content-card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0635\u0627\u0644\u062D\u0629</p>
                            <p class="text-3xl font-bold text-green-600" id="register-stat-operational">${e.operational}</p>
                        </div>
                        <div class="bg-green-500 rounded-full p-4">
                            <i class="fas fa-check-circle text-white text-2xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs text-gray-500">\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</p>
                    </div>
                </div>
                
                <div class="content-card bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</p>
                            <p class="text-3xl font-bold text-yellow-600" id="register-stat-needs-maintenance">${e.needsMaintenance}</p>
                        </div>
                        <div class="bg-yellow-500 rounded-full p-4">
                            <i class="fas fa-tools text-white text-2xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs text-gray-500">\u062A\u062A\u0637\u0644\u0628 \u0645\u062A\u0627\u0628\u0639\u0629</p>
                    </div>
                </div>
                
                <div class="content-card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</p>
                            <p class="text-3xl font-bold text-red-600" id="register-stat-out-of-service">${e.outOfService}</p>
                        </div>
                        <div class="bg-red-500 rounded-full p-4">
                            <i class="fas fa-ban text-white text-2xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-xs text-gray-500">\u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</p>
                    </div>
                </div>
            </div>
        `},updateRegisterStatisticsCards(){this.ensureData();const e=this.getRegisterStatistics(),a=document.getElementById("register-stat-total"),s=document.getElementById("register-stat-operational"),t=document.getElementById("register-stat-needs-maintenance"),i=document.getElementById("register-stat-out-of-service");a&&(a.textContent=e.total),s&&(s.textContent=e.operational),t&&(t.textContent=e.needsMaintenance),i&&(i.textContent=e.outOfService)},async renderRegisterTab(){this.ensureData();const e=this.getAssets(),a=e&&e.length>0;let s="";return a?s=this.renderRegisterTable():s=`
                <div class="empty-state">
                    <div style="width: 300px; margin: 0 auto 16px;">
                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                        </div>
                    </div>
                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                </div>
            `,`
            ${this.renderRegisterStatisticsCards()}
            <div class="content-card">
                <div class="card-header flex items-center justify-between flex-wrap gap-3">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        \u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631
                    </h2>
                    <div class="flex items-center gap-2 flex-wrap">
                        <button id="register-import-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-import ml-2"></i>
                            \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel
                        </button>
                        <button id="register-export-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 Excel
                        </button>
                        <button id="register-export-pdf-btn" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 \u0625\u0644\u0649 PDF
                        </button>
                        <button id="register-add-device-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
                <div class="card-body" id="fire-register-table">
                    ${s}
                </div>
            </div>
        `},renderRegisterTable(){const e=this.getAssets();return!e||e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>':`
            <div class="table-wrapper fire-register-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 100px;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                            <th style="min-width: 150px;">\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 80px;">\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645</th>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</th>
                            <th style="min-width: 80px;">\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</th>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</th>
                            <th style="min-width: 150px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621</th>
                            <th style="min-width: 150px; word-wrap: break-word;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(s=>{const t=this.getStatusBadge(s.status),i=s.manufacturingYear||"-";return`
                <tr>
                    <td>${Utils.escapeHTML(s.factoryName||s.factory||"-")}</td>
                    <td>${Utils.escapeHTML(s.subLocationName||s.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(s.location||"-")}</td>
                    <td>${Utils.escapeHTML(s.type||"-")}</td>
                    <td>${Utils.escapeHTML(s.capacity||s.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(s.siteNumber||s.number||"-")}</td>
                    <td>${Utils.escapeHTML(s.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(i)}</td>
                    <td>${Utils.escapeHTML(s.serialNumber||"-")}</td>
                    <td>${t}</td>
                    <td style="word-wrap: break-word; max-width: 120px;">${Utils.escapeHTML(s.installationMethod||"-")}</td>
                    <td>
                        <div class="flex flex-wrap gap-2" style="min-width: 150px;">
                            <button class="btn-icon btn-icon-primary" data-action="view-details" data-id="${s.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="print-qr" data-id="${s.id}" title="\u0637\u0628\u0627\u0639\u0629 QR">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-device" data-id="${s.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete-device" data-id="${s.id}" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">${Utils.escapeHTML(s.notes||"-")}</td>
                </tr>
            `}).join("")}</tbody>
                    <tfoot style="display: none;"></tfoot>
                </table>
            </div>
        `},async renderInspectionsTab(){this.ensureData();const e=this.getMonthlyInspections();return`
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-clipboard-check ml-2"></i>
                    \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629 - ${new Date().toLocaleDateString("ar-SA",{year:"numeric",month:"long"})}
                </h3>
                <button id="mobile-scan-qr-btn" class="btn-primary w-full sm:w-auto" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    <i class="fas fa-qrcode ml-2"></i>
                    <span class="hidden sm:inline">\u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635</span>
                    <span class="sm:hidden">\u0645\u0633\u062D QR</span>
                </button>
                        </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div class="content-card text-center">
                    <div class="text-2xl font-bold text-blue-600" id="inspections-total">${e.total}</div>
                    <div class="text-sm text-gray-600 mt-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</div>
                    </div>
                <div class="content-card text-center">
                    <div class="text-2xl font-bold text-green-600" id="inspections-completed">${e.completed}</div>
                    <div class="text-sm text-gray-600 mt-1">\u0635\u0627\u0644\u062D</div>
                        </div>
                <div class="content-card text-center">
                    <div class="text-2xl font-bold text-yellow-600" id="inspections-needs-repair">${e.needsRepair}</div>
                    <div class="text-sm text-gray-600 mt-1">\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</div>
                    </div>
                <div class="content-card text-center">
                    <div class="text-2xl font-bold text-red-600" id="inspections-out-of-service">${e.outOfService}</div>
                    <div class="text-sm text-gray-600 mt-1">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</div>
                        </div>
                    </div>
                    <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0634\u0647\u0631\u064A\u0629
                    </h2>
                </div>
                <div class="card-body" id="monthly-inspections-table">
                    ${this.renderMonthlyInspectionsTable(e.list)}
                </div>
            </div>
        `},async refreshRegisterTable(){this.ensureData(),this.updateRegisterStatisticsCards();const e=document.getElementById("fire-register-table");if(!e)return;const a=this.getAssets();!a||a.length===0?e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>':(e.innerHTML=this.renderRegisterTable(),e.dataset.eventsBound="false",this.bindRegisterTableEvents(e))},async refreshCurrentTab(e=!1){if(this.state.currentTab==="database")this.renderAssets();else if(this.state.currentTab==="register")await this.refreshRegisterTable();else if(this.state.currentTab==="inspections"){const a=this.getMonthlyInspections(),s=document.getElementById("inspections-completed"),t=document.getElementById("inspections-needs-repair"),i=document.getElementById("inspections-out-of-service"),n=document.getElementById("inspections-total");s&&(s.textContent=a.completed),t&&(t.textContent=a.needsRepair),i&&(i.textContent=a.outOfService),n&&(n.textContent=a.total);const o=document.getElementById("monthly-inspections-table");o&&(o.innerHTML=this.renderMonthlyInspectionsTable(a.list))}else this.renderAssets()},getMonthlyInspections(){const e=new Date,a=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0,23,59,59),t=this.getInspections().filter(i=>{const n=new Date(i.checkDate||i.createdAt);return n>=a&&n<=s}).sort((i,n)=>{const o=new Date(i.checkDate||i.createdAt);return new Date(n.checkDate||n.createdAt)-o});return{list:t,total:t.length,completed:t.filter(i=>i.status==="\u0635\u0627\u0644\u062D").length,needsRepair:t.filter(i=>i.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:t.filter(i=>i.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},renderMonthlyInspectionsTable(e){return!e||e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</p></div>':`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 150px;">\u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 120px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635</th>
                            <th style="min-width: 120px;">\u0627\u0644\u0645\u0641\u062A\u0634</th>
                            <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 200px; word-wrap: break-word;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(s=>{const t=this.getAssets().find(l=>l.id===s.assetId),i=t?`${t.number||t.id} - ${t.location||""}`:s.assetId,n=this.getStatusBadge(s.status),o=s.checkDate?Utils.formatDate(s.checkDate):"-";return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(i)}</div>
                        <div class="text-xs text-gray-400">DeviceID: ${Utils.escapeHTML(s.assetId||"-")}</div>
                    </td>
                    <td>${o}</td>
                    <td>${Utils.escapeHTML(s.inspector||"-")}</td>
                    <td style="word-wrap: break-word;">${n}</td>
                    <td style="word-wrap: break-word; max-width: 250px; white-space: normal;">${Utils.escapeHTML(s.remarks||"-")}</td>
                    <td>
                        <button class="btn-icon btn-icon-primary" onclick="FireEquipment.viewInspection('${s.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `},viewInspection(e){const a=this.getInspections().find(n=>n.id===e);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635");return}const s=this.getAssets().find(n=>n.id===a.assetId),t=s?`${s.number||s.id} - ${s.location||""}`:a.assetId,i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-clipboard-check"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(t)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">DeviceID:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635:</label>
                                <p class="text-gray-800">${a.checkDate?Utils.formatDate(a.checkDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0641\u062A\u0634:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.inspector||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <p class="text-gray-800">${this.getStatusBadge(a.status)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F / \u0627\u0644\u0636\u063A\u0637:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.gaugeReading||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062E\u062A\u0645 \u0627\u0644\u0623\u0645\u0627\u0646:</label>
                                <p class="text-gray-800">${a.sealIntact===!0?"\u0633\u0644\u064A\u0645":a.sealIntact===!1?"\u0645\u0643\u0633\u0648\u0631":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}</p>
                            </div>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(a.remarks||"-")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(a.actions||"-")}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(i)},async loadAssetsFromBackend(){try{if(!GoogleIntegration||!AppState.googleConfig?.appsScript?.enabled){Utils.safeWarn("\u26A0\uFE0F Backend \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629");return}this.ensureData(),Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u062D\u0631\u064A\u0642 \u0645\u0646 Backend...");const e=await GoogleIntegration.sendRequest({action:"getAllFireEquipmentAssets",data:{}});if(e&&e.success&&Array.isArray(e.data)){const a=AppState.appData.fireEquipmentAssets||[],s=e.data,t=new Map;a.forEach(i=>{i.id&&t.set(i.id,i)}),s.forEach(i=>{i.id&&t.set(i.id,i)}),AppState.appData.fireEquipmentAssets=Array.from(t.values()),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${e.data.length} \u062C\u0647\u0627\u0632 \u0645\u0646 Backend (\u0625\u062C\u0645\u0627\u0644\u064A: ${AppState.appData.fireEquipmentAssets.length})`)}else Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e?.message)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",e)}},ensureData(){typeof AppState>"u"&&(AppState={}),AppState.appData||(AppState.appData={});const e=AppState.appData;let a=!1;if(Array.isArray(e.fireEquipmentAssets)||(e.fireEquipmentAssets=[]),Array.isArray(e.fireEquipmentInspections)||(e.fireEquipmentInspections=[]),Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const s=e.fireEquipment.filter(t=>t.assetId&&(t.checkDate||t.createdAt));s.length>0&&(s.forEach(t=>{e.fireEquipmentInspections.some(n=>n.id===t.id)||e.fireEquipmentInspections.push({id:t.id||Utils.generateId("FEI"),assetId:t.assetId,checkDate:t.checkDate||t.createdAt,inspector:t.inspector||"",status:t.status||"\u0635\u0627\u0644\u062D",gaugeReading:t.gaugeReading||"",sealIntact:typeof t.sealIntact=="boolean"?t.sealIntact:null,remarks:t.remarks||t.notes||"",actions:t.actions||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString()})}),a=!0)}if(Array.isArray(e.fireEquipment)&&e.fireEquipment.length>0){const s=new Map,t=new Map;e.fireEquipmentAssets.forEach(r=>{r.id&&s.set(r.id,r),r.number&&s.set(r.number.toLowerCase(),r)}),e.fireEquipmentInspections.forEach(r=>{r.id&&t.set(r.id,r)});const i=new Map,n=new Map,o={\u0635\u0627\u0644\u062D:"\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0625\u0635\u0644\u0627\u062D":"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629",\u0645\u0639\u0637\u0644:"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"};e.fireEquipment.forEach(r=>{const c=String(r.equipmentNumber||r.number||"").trim(),f=c.toLowerCase();let d=f?i.get(f):null;!d&&f&&(d=s.get(f));let p=r.assetId?String(r.assetId):null;if(p&&p.startsWith("FEA_")){const y=s.get(p);y&&y.id.match(/^EFA-\d{4}$/)?p=y.id:p=null}if(!d&&p&&(d=s.get(p)),d)r.equipmentType&&(d.type=r.equipmentType),r.location&&(d.location=r.location),r.manufacturer&&(d.manufacturer=r.manufacturer),r.model&&(d.model=r.model),r.capacity&&(d.capacity=r.capacity),r.installationDate&&(d.installationDate=r.installationDate),(r.checkDate||r.lastServiceDate)&&(d.lastServiceDate=r.checkDate||r.lastServiceDate),r.status&&(d.status=o[r.status]||r.status),r.inspector&&(d.responsible=r.inspector),r.notes&&(d.notes=r.notes),r.updatedAt&&(d.updatedAt=r.updatedAt),n.set(d.id,d);else{const y=p&&p.match(/^EFA-\d{4}$/)?p:this.generateFireDeviceID(),S=this.generateQrData(y),x=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";d={id:y,number:c||y,type:r.equipmentType||"",location:r.location||"",manufacturer:r.manufacturer||"",model:r.model||"",capacity:r.capacity||"",installationDate:r.installationDate||"",lastServiceDate:r.checkDate||r.lastServiceDate||"",status:x,responsible:r.inspector||"",notes:r.notes||"",qrCodeData:S,createdAt:r.createdAt||new Date().toISOString(),updatedAt:r.updatedAt||new Date().toISOString()},f&&i.set(f,d),n.set(d.id,d)}const u=r.id?String(r.id):Utils.generateId("FEI"),g=u.startsWith("FEI")?u:u.replace(/^FIRE_EQUIP/,"FEI"),w=r.checkDate||r.createdAt||new Date().toISOString(),A=o[r.status]||r.status||"\u0635\u0627\u0644\u062D";let m=t.get(g);m?(r.checkDate&&(m.checkDate=r.checkDate),r.inspector&&(m.inspector=r.inspector),r.status&&(m.status=o[r.status]||r.status),r.gaugeReading!==void 0&&(m.gaugeReading=r.gaugeReading),typeof r.sealIntact=="boolean"&&(m.sealIntact=r.sealIntact),r.notes&&(m.remarks=r.notes),r.actions&&(m.actions=r.actions),r.updatedAt&&(m.updatedAt=r.updatedAt)):(m={id:g,assetId:d.id,checkDate:w,inspector:r.inspector||d.responsible||"",status:A,gaugeReading:r.gaugeReading||"",sealIntact:typeof r.sealIntact=="boolean"?r.sealIntact:null,remarks:r.notes||"",actions:r.actions||"",createdAt:r.createdAt||w,updatedAt:r.updatedAt||w},e.fireEquipmentInspections.push(m))});const l=[...e.fireEquipmentAssets];n.forEach((r,c)=>{const f=l.findIndex(d=>d.id===c);f>=0?l[f]=r:l.push(r)}),e.fireEquipmentAssets=l,e.fireEquipment=[],a=!0}return a},getAssets(){return Array.isArray(AppState.appData.fireEquipmentAssets)?AppState.appData.fireEquipmentAssets:[]},getRegisterStatistics(){const e=this.getAssets();return{total:e.length,operational:e.filter(a=>a.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:e.filter(a=>a.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:e.filter(a=>a.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length}},getInspections(){const e=Array.isArray(AppState.appData.fireEquipmentInspections)?AppState.appData.fireEquipmentInspections:[];return e.length===0&&Array.isArray(AppState.appData.fireEquipment)&&AppState.appData.fireEquipment.length>0?(AppState.appData.fireEquipmentInspections=AppState.appData.fireEquipment,AppState.appData.fireEquipment):e},async renderAssets(){this.refreshFilterOptions(),this.renderSummary();const e=this.getFilteredAssets(),a=document.getElementById("fire-assets-table");a&&(a.innerHTML=this.renderAssetsTable(e),this.bindTableEvents(a));const s=document.getElementById("fire-recent-inspections");s&&(s.innerHTML=this.renderRecentInspections())},refreshFilterOptions(){const e=this.getAssets(),a=document.getElementById("fire-assets-type"),s=document.getElementById("fire-assets-status"),t=document.getElementById("fire-assets-location");if(a){const i=this.state.filters.type,n=Array.from(new Set(e.map(o=>o.type).filter(Boolean)));a.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>',...n.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`)].join(""),a.value=n.includes(i)?i:"all",this.state.filters.type=a.value}if(s){const i=this.state.filters.status;s.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>',...this.statusOptions.map(n=>`<option value="${n.value}">${n.label}</option>`)].join(""),s.value=this.statusOptions.some(n=>n.value===i)?i:"all",this.state.filters.status=s.value}if(t){const i=this.state.filters.location,n=Array.from(new Set(e.map(o=>o.location).filter(Boolean)));t.innerHTML=['<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>',...n.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`)].join(""),t.value=n.includes(i)?i:"all",this.state.filters.location=t.value}},renderSummary(){const e=this.getAssetStats(),a=document.getElementById("fire-summary-total"),s=document.getElementById("fire-summary-active"),t=document.getElementById("fire-summary-maintenance");a&&(a.textContent=e.total),s&&(s.textContent=e.active),t&&(t.textContent=e.needsMaintenance)},renderAssetsTable(e){return e.length?`
            <div class="table-wrapper fire-assets-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0646\u0648\u0639</th>
                            <th style="min-width: 150px;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 120px;">\u0622\u062E\u0631 \u0641\u062D\u0635</th>
                            <th style="min-width: 150px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${e.map(s=>{const t=this.getLatestInspection(s.id),i=t?Utils.formatDate(t.checkDate):"-",n=this.getStatusBadge(s.status);return`
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(s.number||"-")}</div>
                        <div class="text-xs text-gray-400">${Utils.escapeHTML(s.model||"")}</div>
                    </td>
                    <td>${Utils.escapeHTML(s.type||"")}</td>
                    <td>${Utils.escapeHTML(s.location||"")}</td>
                    <td>${n}</td>
                    <td>${i}</td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn-icon btn-icon-primary" data-action="view" data-id="${s.id}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="qr" data-id="${s.id}" title="\u0637\u0628\u0627\u0639\u0629 QR Code">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit()?`
                            <button class="btn-icon btn-icon-warning" data-action="edit" data-id="${s.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            ${this.canDelete()?`
                            <button class="btn-icon btn-icon-danger" data-action="delete" data-id="${s.id}" title="\u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632">
                                <i class="fas fa-trash"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}</tbody>
                </table>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0639\u062F\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F\u060C \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.</p></div>'},renderRecentInspections(){const e=this.getInspections().slice().sort((s,t)=>new Date(t.checkDate||t.createdAt||0)-new Date(s.checkDate||s.createdAt||0)).slice(0,6);return e.length?`<div class="divide-y divide-gray-100">${e.map(s=>{const t=this.getAssets().find(n=>n.id===s.assetId),i=t?t.number:s.assetId;return`
                <div class="border-b border-gray-100 py-3 last:border-b-0">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-semibold text-gray-800">${Utils.escapeHTML(i||"-")}</p>
                            <p class="text-xs text-gray-500">${Utils.formatDate(s.checkDate)}</p>
                        </div>
                        <div>${this.getStatusBadge(s.status)}</div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">\u0627\u0644\u0645\u0641\u062A\u0634: ${Utils.escapeHTML(s.inspector||"-")}</p>
                </div>
            `}).join("")}</div>`:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0645\u0624\u062E\u0631\u0627\u064B.</p></div>'},getStatusBadge(e){const a=e||"";let s="badge-info";return a==="\u0635\u0627\u0644\u062D"?s="badge-success":a==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?s="badge-warning":a==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&(s="badge-danger"),`<span class="badge ${s}">${Utils.escapeHTML(a||"-")}</span>`},bindTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async a=>{const s=a.target.closest("[data-action]");if(!s)return;a.preventDefault();const t=s.dataset.action,i=s.dataset.id;switch(t){case"view":this.viewAsset(i);break;case"qr":this.printQr(i);break;case"edit":await this.showAssetForm(this.getAssets().find(n=>n.id===i)||null);break;case"delete":await this.deleteAsset(i);break;default:break}}),e.dataset.eventsBound="true")},setupEventListeners(){const e=document.getElementById("add-fire-asset-btn");e&&e.addEventListener("click",async()=>await this.showAssetForm());const a=document.getElementById("scan-qr-inspection-btn");a&&a.addEventListener("click",()=>this.startQRScan());const s=document.getElementById("mobile-scan-qr-btn");s&&s.addEventListener("click",()=>this.startQRScan());const t=document.getElementById("refresh-fire-equipment-btn");t&&t.addEventListener("click",async()=>{try{const i=t.innerHTML;t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...',await this.loadFireEquipmentDataAsync(),await this.refreshCurrentTab(),t.disabled=!1,t.innerHTML=i,typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",i),typeof Notification<"u"&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),t.disabled=!1,t.innerHTML='<i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B'}}),this.setupTabEventListeners(this.state.currentTab)},bindRegisterTableEvents(e){!e||e.dataset.eventsBound==="true"||(e.addEventListener("click",async a=>{const s=a.target.closest("[data-action]");if(!s)return;a.preventDefault();const t=s.dataset.action,i=s.dataset.id;switch(t){case"view-details":this.viewAsset(i);break;case"print-qr":this.printQr(i);break;case"edit-device":await this.showAssetForm(this.getAssets().find(n=>n.id===i)||null);break;case"delete-device":await this.deleteAsset(i);break;default:break}}),e.dataset.eventsBound="true")},setupTabEventListeners(e){if(e==="database"){const a=document.getElementById("fire-assets-search");if(a){const n=a.cloneNode(!0);a.parentNode.replaceChild(n,a),n.addEventListener("input",()=>this.applyFilters())}const s=document.getElementById("fire-assets-type");if(s){const n=s.cloneNode(!0);s.parentNode.replaceChild(n,s),n.addEventListener("change",()=>this.applyFilters())}const t=document.getElementById("fire-assets-status");if(t){const n=t.cloneNode(!0);t.parentNode.replaceChild(n,t),n.addEventListener("change",()=>this.applyFilters())}const i=document.getElementById("fire-assets-location");if(i){const n=i.cloneNode(!0);i.parentNode.replaceChild(n,i),n.addEventListener("change",()=>this.applyFilters())}}else if(e==="inspections"){const a=document.getElementById("new-inspection-btn");if(a){const t=a.cloneNode(!0);a.parentNode.replaceChild(t,a),t.addEventListener("click",()=>{this.startQRScan()})}const s=document.getElementById("mobile-scan-qr-btn");if(s){const t=s.cloneNode(!0);s.parentNode.replaceChild(t,s),t.addEventListener("click",()=>{this.startQRScan()})}}else if(e==="register"){const a=document.getElementById("fire-register-table");a&&this.bindRegisterTableEvents(a);const s=document.getElementById("register-add-device-btn");if(s){const o=s.cloneNode(!0);s.parentNode.replaceChild(o,s),o.addEventListener("click",async()=>{await this.showAssetForm()})}const t=document.getElementById("register-import-excel-btn");if(t){const o=t.cloneNode(!0);t.parentNode.replaceChild(o,t),o.addEventListener("click",()=>{this.showImportExcelModal()})}const i=document.getElementById("register-export-excel-btn");if(i){const o=i.cloneNode(!0);i.parentNode.replaceChild(o,i),o.addEventListener("click",()=>{this.exportToExcel()})}const n=document.getElementById("register-export-pdf-btn");if(n){const o=n.cloneNode(!0);n.parentNode.replaceChild(o,n),o.addEventListener("click",()=>{this.exportRegisterToPDF()})}}else e==="analytics"?this.setupAnalyticsEventListeners():e==="approval-requests"&&this.setupApprovalRequestsEventListeners()},applyFilters(){const e=document.getElementById("fire-assets-search"),a=document.getElementById("fire-assets-type"),s=document.getElementById("fire-assets-status"),t=document.getElementById("fire-assets-location");this.state.filters.search=(e?.value||"").trim().toLowerCase(),this.state.filters.type=a?a.value:"all",this.state.filters.status=s?s.value:"all",this.state.filters.location=t?t.value:"all",this.renderAssets()},getFilteredAssets(){const e=this.state.filters;return this.getAssets().filter(a=>{const s=e.search,t=!s||[a.number,a.type,a.location,a.manufacturer,a.responsible].some(l=>String(l||"").toLowerCase().includes(s)),i=e.type==="all"||a.type===e.type,n=e.status==="all"||a.status===e.status,o=e.location==="all"||a.location===e.location;return t&&i&&n&&o})},async showAssetForm(e=null){const a=!!e;if(a&&!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0639\u062F\u064A\u0644.");return}if(!a&&!this.canAdd()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u062C\u0647\u0632\u0629 \u062C\u062F\u064A\u062F\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u0629.");return}const s=e?.id||this.generateFireDeviceID();typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState();const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${a?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632 \u0625\u0637\u0641\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-asset-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="asset-factory" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                    ${this.getSiteOptions().map(o=>{const l=e&&(e.factoryId===o.id||e.factoryId===String(o.id)||e.factory===o.id&&!e.factoryId||e.factory===o.name);return`<option value="${o.id}" ${l?"selected":""}>${Utils.escapeHTML(o.name)}</option>`}).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <select id="asset-sub-location" class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                    ${(()=>{const o=e?.factoryId||e?.factory||"";return this.getPlaceOptions(o).map(r=>{const c=e&&(e.subLocationId===r.id||e.subLocationId===String(r.id)||e.subLocation===r.id&&!e.subLocationId||e.subLocation===r.name);return`<option value="${r.id}" ${c?"selected":""}>${Utils.escapeHTML(r.name)}</option>`}).join("")})()}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <input type="text" id="asset-location" required class="form-input" value="${Utils.escapeHTML(e?.location||"")}" placeholder="\u0627\u0644\u0645\u0628\u0646\u0649 / \u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0637\u0642\u0629">
                            </div>
                            <div>
                                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <div class="flex gap-2">
                                    <input type="text" id="asset-type" list="fire-asset-types" required class="form-input flex-1" value="${Utils.escapeHTML(e?.type||"")}" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0623\u0636\u0641 \u0646\u0648\u0639 \u062C\u062F\u064A\u062F">
                                    <button type="button" id="manage-types-btn" class="btn-secondary" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                                <datalist id="fire-asset-types">
                                    ${this.assetTypes.map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645 *</label>
                                <input type="text" id="asset-capacity" required class="form-input" value="${Utils.escapeHTML(e?.capacity||e?.capacityKg||"")}" placeholder="\u0645\u062B\u0627\u0644: 6 \u0643\u062C\u0645">
                            </div>
                            <div>
                                <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                <input type="text" id="asset-site-number" required class="form-input" value="${Utils.escapeHTML(e?.siteNumber||e?.number||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</label>
                                <input type="text" id="asset-manufacturer" class="form-input" value="${Utils.escapeHTML(e?.manufacturer||"")}" placeholder="\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629">
                            </div>
                            <div>
                                <label class="form-label">\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</label>
                                <input type="number" id="asset-manufacturing-year" class="form-input" value="${e?.manufacturingYear||""}" placeholder="\u0645\u062B\u0627\u0644: 2023" min="1900" max="2100">
                            </div>
                            <div>
                                <label class="form-label">\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <input type="text" id="asset-serial-number" class="form-input" value="${Utils.escapeHTML(e?.serialNumber||"")}" placeholder="\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644">
                            </div>
                            <div>
                                <label class="form-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 *</label>
                                <select id="asset-status" class="form-input" required>
                                    ${this.statusOptions.map(o=>`<option value="${o.value}" ${e?.status===o.value?"selected":""}>${o.label}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</label>
                                <input type="text" id="asset-installation-method" class="form-input" value="${Utils.escapeHTML(e?.installationMethod||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062B\u0628\u062A \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u0626\u0637\u060C \u0645\u062A\u062D\u0631\u0643">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u062F\u064A\u0644 / \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A</label>
                                <input type="text" id="asset-model" class="form-input" value="${Utils.escapeHTML(e?.model||"")}" placeholder="\u0627\u0644\u0645\u0648\u062F\u064A\u0644 \u0623\u0648 \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A">
                            </div>
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628</label>
                                <input type="date" id="asset-installation" class="form-input" value="${e?.installationDate?new Date(e.installationDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="form-label">\u0622\u062E\u0631 \u0635\u064A\u0627\u0646\u0629</label>
                                <input type="date" id="asset-last-service" class="form-input" value="${e?.lastServiceDate?new Date(e.lastServiceDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <input type="text" id="asset-responsible" class="form-input" value="${Utils.escapeHTML(e?.responsible||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0623\u0648 \u0627\u0644\u0642\u0633\u0645">
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="asset-notes" class="form-input" rows="3" placeholder="\u0623\u064A \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t);const i=t.querySelector("#fire-asset-form");i.addEventListener("submit",async o=>{o.preventDefault();const l=i?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const c=new Date().toISOString(),f=this.getAssets(),d=f.findIndex(b=>b.id===s),p=document.getElementById("asset-type").value.trim();p&&!this.assetTypes.includes(p)&&this.assetTypes.push(p);const u=b=>{const E=document.getElementById(b);return E?E.value.trim():""},g=b=>{const E=document.getElementById(b);return E?E.value.trim():null},w=u("asset-factory"),A=u("asset-sub-location"),y=this.getSiteOptions().find(b=>b.id===w),x=this.getPlaceOptions(w).find(b=>b.id===A),v={id:s,number:u("asset-site-number")||s,siteNumber:u("asset-site-number")||s,type:p,location:u("asset-location"),subLocation:A,subLocationId:A?String(A).trim():null,subLocationName:x?x.name:"",manufacturer:u("asset-manufacturer"),factory:w,factoryId:w?String(w).trim():null,factoryName:y?y.name:"",model:u("asset-model"),capacity:u("asset-capacity"),capacityKg:u("asset-capacity"),manufacturingYear:(()=>{const b=document.getElementById("asset-manufacturing-year");return b&&b.value?parseInt(b.value):null})(),productionDate:(()=>{const b=document.getElementById("asset-production-date");return b?this.toISODate(b.value):null})(),serialNumber:u("asset-serial-number"),installationMethod:u("asset-installation-method"),installationDate:(()=>{const b=document.getElementById("asset-installation");return b?this.toISODate(b.value):null})(),lastServiceDate:(()=>{const b=document.getElementById("asset-last-service");return b?this.toISODate(b.value):null})(),status:u("asset-status"),responsible:u("asset-responsible"),notes:u("asset-notes"),qrCodeData:e?.qrCodeData||this.generateQrData(s),createdAt:e?.createdAt||c,updatedAt:c};d>-1?f[d]={...f[d],...v}:f.push(v),Loading.show();let h;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){if(h=await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:v}),!h.success)throw new Error(h.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 \u0641\u064A Backend:",v.id);try{await this.loadAssetsFromBackend()}catch(b){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend\u060C \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",b)}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),l&&(l.disabled=!1,l.innerHTML=r),t.remove(),this.state.currentTab==="database"?this.renderAssets():this.state.currentTab==="register"?await this.refreshRegisterTable():await this.refreshCurrentTab()}catch(c){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632:",c),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632: "+(c.message||c)),l&&(l.disabled=!1,l.innerHTML=r)}});const n=t.querySelector("#manage-types-btn");n&&n.addEventListener("click",()=>{this.showManageTypesModal()}),setTimeout(()=>{const o=t.querySelector("#asset-factory"),l=t.querySelector("#asset-sub-location");o&&l&&o.addEventListener("change",()=>{const r=o.value,c=this.getPlaceOptions(r);l.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',c.forEach(f=>{const d=document.createElement("option");d.value=f.id,d.textContent=f.name,l.appendChild(d)})})},100)},async startQRScan(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){Notification.error("\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0644\u0627 \u064A\u062F\u0639\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u062A\u0635\u0641\u062D \u062D\u062F\u064A\u062B.");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <style>
                .qr-scanner-modal {
                    max-width: 95%;
                    width: 100%;
                    max-height: 95vh;
                    overflow-y: auto;
                }
                @media (min-width: 768px) {
                    .qr-scanner-modal {
                        max-width: 650px;
                    }
                }
                #qr-scanner-container {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                }
                #qr-video {
                    width: 100%;
                    height: auto;
                    min-height: 300px;
                    max-height: 60vh;
                    object-fit: cover;
                    display: block;
                }
                #qr-scan-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70%;
                    max-width: 250px;
                    height: 250px;
                    border: 3px solid #3B82F6;
                    border-radius: 12px;
                    pointer-events: none;
                    animation: pulse-border 2s infinite;
                }
                @keyframes pulse-border {
                    0%, 100% { border-color: #3B82F6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { border-color: #60A5FA; box-shadow: 0 0 30px rgba(96, 165, 250, 0.8); }
                }
                .qr-scan-status {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .manual-input-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 20px;
                }
            </style>
            <div class="modal-content qr-scanner-modal">
                <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h2 class="modal-title" style="font-size: 1.5rem; font-weight: 700; color: white;">
                        <i class="fas fa-qrcode ml-2"></i>
                        \u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A
                    </h2>
                    <button class="modal-close" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u063A\u0644\u0627\u0642 \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0633\u062D\u061F')) { this.closest('.modal-overlay').remove(); FireEquipment.stopQRScan(); }" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div id="qr-scanner-container">
                        <video id="qr-video" autoplay playsinline muted></video>
                        <canvas id="qr-canvas" style="display: none;"></canvas>
                        <div id="qr-scan-overlay"></div>
                        <div class="qr-scan-status">
                            <i class="fas fa-camera ml-2"></i>
                            \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0633\u062D...
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-base font-semibold text-gray-700 mb-2">
                            <i class="fas fa-info-circle ml-2 text-blue-500"></i>
                            \u0648\u062C\u0651\u0647 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0646\u062D\u0648 QR Code \u0627\u0644\u0645\u064F\u0644\u0635\u0642 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632
                        </p>
                        <p class="text-sm text-gray-500">
                            \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u0636\u0648\u062D \u0627\u0644\u0625\u0636\u0627\u0621\u0629 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0639\u0644\u0649 \u0627\u0644\u0643\u0648\u062F
                        </p>
                    </div>
                    <div class="manual-input-section">
                        <label class="form-label" style="font-weight: 600; color: #495057; margin-bottom: 10px; display: block;">
                            <i class="fas fa-keyboard ml-2"></i>
                            \u0623\u0648 \u0623\u062F\u062E\u0644 DeviceID \u064A\u062F\u0648\u064A\u0627\u064B:
                        </label>
                        <div class="flex gap-2">
                            <input type="text" id="manual-device-id" class="form-input flex-1" placeholder="\u0645\u062B\u0627\u0644: EFA-0001" style="border: 2px solid #667eea; font-size: 1rem; padding: 12px;">
                            <button type="button" id="manual-submit-btn" class="btn-primary" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); white-space: nowrap;">
                                <i class="fas fa-check ml-2"></i>\u062A\u0623\u0643\u064A\u062F
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-lightbulb ml-1"></i>
                            \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0645\u062A\u0648\u0642\u0639: EFA-0000
                        </p>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e);const a=e.querySelector("#qr-video"),s=e.querySelector("#qr-canvas"),t=s.getContext("2d");let i=null,n=null;const o=e.querySelector("#manual-submit-btn"),l=e.querySelector("#manual-device-id"),r=e.querySelector(".qr-scan-status");o.addEventListener("click",async()=>{const c=l.value.trim();if(!c){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 DeviceID");return}this.stopQRScan(),e.remove(),await this.processScannedDeviceId(c)}),l.addEventListener("keypress",async c=>{c.key==="Enter"&&o.click()});try{const c={video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}}};i=await navigator.mediaDevices.getUserMedia(c),a.srcObject=i,r&&(r.innerHTML='<i class="fas fa-camera ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0633\u062D...',r.style.background="rgba(34, 197, 94, 0.8)"),a.addEventListener("loadedmetadata",()=>{s.width=a.videoWidth,s.height=a.videoHeight}),n=setInterval(()=>{if(a.readyState===a.HAVE_ENOUGH_DATA){t.drawImage(a,0,0,s.width,s.height);const f=t.getImageData(0,0,s.width,s.height);if(typeof jsQR<"u"){const d=jsQR(f.data,f.width,f.height,{inversionAttempts:"dontInvert"});if(d&&d.data){const p=d.data.trim();r&&(r.innerHTML='<i class="fas fa-check-circle ml-2"></i>\u062A\u0645 \u0627\u0644\u0645\u0633\u062D!',r.style.background="rgba(34, 197, 94, 0.9)"),this.stopQRScan(),setTimeout(()=>e.remove(),300),this.processScannedDeviceId(p)}}}},100)}catch(c){const f=c?.message||c?.toString()||"",d=f.includes("Permissions policy")||f.includes("Permission policy")||f.includes("[Violation]")||f.includes("not allowed in this document");d||Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627:",c),r&&(r.innerHTML='<i class="fas fa-exclamation-triangle ml-2"></i>\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0643\u0627\u0645\u064A\u0631\u0627',r.style.background="rgba(239, 68, 68, 0.8)"),d?Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0641\u064A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A."):Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A.")}e.dataset.stream="active",window._fireEquipmentStream=i,window._fireEquipmentScanInterval=n},stopQRScan(){window._fireEquipmentStream&&(window._fireEquipmentStream.getTracks().forEach(e=>e.stop()),window._fireEquipmentStream=null),window._fireEquipmentScanInterval&&(clearInterval(window._fireEquipmentScanInterval),window._fireEquipmentScanInterval=null)},async processScannedDeviceId(e){if(!e){Notification.error("DeviceID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}Loading.show();try{const a=await this.getDeviceDataFromRegister(e);if(!a){Notification.error(`\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632 \u0628\u0631\u0642\u0645: ${e}`),Loading.hide();return}await this.showDeviceDataFromQR(a)}catch(a){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632: "+a.message)}finally{Loading.hide()}},getDeviceDataFromRegister(e){const a=this.getAssets().find(t=>t.id===e);if(!a)return null;const s=this.getLatestInspection(e);return{deviceId:a.id,deviceNumber:a.number||a.id,deviceType:a.type||"",location:a.location||"",capacity:a.capacity||"",lastInspectionDate:s?s.checkDate:null,lastInspector:s?s.inspector:"",deviceStatus:a.status||"",manufacturer:a.manufacturer||"",model:a.model||"",installationDate:a.installationDate||""}},async showDeviceDataFromQR(e){const a=this.checkMonthlyInspectionAllowed(e.deviceId);if(!a.allowed){Notification.warning(a.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}const s=AppState.currentUser,t=s&&(s.role==="admin"||s.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||s.role==="system_admin"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin()),i=s&&(s.role==="safety_officer"||s.role==="\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"),n=typeof Permissions<"u"&&Permissions.hasDetailedPermission&&Permissions.hasDetailedPermission("fire-equipment","inspections");if(!t&&!(i&&n)&&!(typeof Permissions<"u"&&Permissions.hasAccess&&Permissions.hasAccess("fire-equipment"))){Notification.error("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u064A\u062A\u0637\u0644\u0628 \u0635\u0644\u0627\u062D\u064A\u0629 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}this.showMobileInspectionForm(null,e.deviceId)},async initiateMonthlyInspection(e){const a=this.checkMonthlyInspectionAllowed(e);if(!a.allowed){Notification.warning(a.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A");return}if(!await this.requestAdminApproval(e)){Notification.info("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 - \u0645\u0637\u0644\u0648\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631");return}this.showInspectionForm(null,e)},checkMonthlyInspectionAllowed(e){const a=new Date,s=a.getMonth(),t=a.getFullYear(),i=this.getInspections().filter(n=>{if(n.assetId!==e)return!1;const o=new Date(n.checkDate||n.createdAt);return o.getMonth()===s&&o.getFullYear()===t});if(i.length>0){const n=i[0];return{allowed:!1,reason:`\u062A\u0645 \u0641\u062D\u0635 \u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 (${Utils.formatDate(n.checkDate||n.createdAt)}). \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0622\u062E\u0631 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0634\u0647\u0631.`}}return{allowed:!0,reason:""}},async requestAdminApproval(e){return new Promise(async a=>{const s=AppState.currentUser;if(s&&(s.role==="admin"||s.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isCurrentUserAdmin&&Permissions.isCurrentUserAdmin())){a(!0);return}try{const i=this.getAssets().find(r=>r.id===e),n=i?i.number||i.id:e,o=i&&i.location||"",l=await this.createInspectionApprovalRequest(e,n,o);l&&(Notification.info("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0633\u064A\u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0645\u062F\u064A\u0631 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629."),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","add",l.id)),a(!1)}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),a(!1)}})},async createInspectionApprovalRequest(e,a,s){const t=AppState.currentUser;if(!t)throw new Error("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0633\u062C\u0644 \u062F\u062E\u0648\u0644");const i=Utils.generateId("FEAR"),n=new Date().toISOString(),o={id:i,type:"inspection",assetId:e,assetNumber:a,assetLocation:s,requestedBy:t.name||t.email||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",requestedById:t.id||t.email||"",userEmail:t.email||"",requestedAt:n,status:"pending",comments:`\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${a}${s?` - ${s}`:""}`,createdAt:n,updatedAt:n};return AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests||(AppState.appData.fireEquipmentApprovalRequests=[]),AppState.appData.fireEquipmentApprovalRequests.push(o),typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(AppState.appData.fireEquipmentApprovalRequests)),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const l=await GoogleIntegration.sendRequest({action:"addFireEquipmentApprovalRequest",data:o});l.success?(Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend:",i),await this.loadApprovalRequestsFromBackend(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()):Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l.message)}}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend:",l)}})(),this.notifyAdminsAboutApprovalRequest(o).catch(l=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",l)}),o},async notifyAdminsAboutApprovalRequest(e){try{const a=[];if(AppState.appData&&AppState.appData.users&&a.push(...AppState.appData.users.filter(s=>s.role==="admin"||s.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||typeof Permissions<"u"&&Permissions.isUserAdmin&&Permissions.isUserAdmin(s))),a.length===0)GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:"admin",title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(s=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631:",s)});else for(const s of a)if(s.id||s.email)try{GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:s.id||s.email,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0625\u0637\u0641\u0627\u0621",message:`\u0637\u0644\u0628 ${e.requestedBy} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u062C\u0647\u0627\u0632: ${e.assetNumber}${e.assetLocation?` - ${e.assetLocation}`:""}`,type:"approval_request",priority:"high",link:"#fire-equipment-approval-requests",data:{module:"fire-equipment",action:"inspection_approval",requestId:e.id}}}).catch(t=>{Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${s.name||s.email}:`,t)})}catch(t){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631 ${s.name||s.email}:`,t)}Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0628\u062E\u0635\u0648\u0635 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",e.id)}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",a)}},showInspectionForm(e=null,a=null){if(!a&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const s=!!e,t=e?.id||Utils.generateId("FEI"),i=e?.assetId||a,n=this.getAssets().find(f=>f.id===i);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${s?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635 \u062C\u0647\u0627\u0632":"\u062A\u0633\u062C\u064A\u0644 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0644\u0644\u062C\u0647\u0627\u0632"}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-inspection-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p class="text-sm text-blue-800">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>DeviceID:</strong> ${Utils.escapeHTML(n.id)} | 
                                <strong>\u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(n.number||n.id)} | 
                                <strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(n.location||"-")}
                            </p>
                        </div>
                        <input type="hidden" id="inspection-asset" value="${i}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635 *</label>
                                <input type="date" id="inspection-date" required class="form-input" value="${o}">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0641\u062A\u0634 *</label>
                                <input type="text" id="inspection-inspector" required class="form-input" value="${Utils.escapeHTML(e?.inspector||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634">
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="inspection-status" class="form-input" required>
                                    ${this.statusOptions.map(f=>`<option value="${f.value}" ${e?.status===f.value?"selected":""}>${f.label}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F / \u0627\u0644\u0636\u063A\u0637</label>
                                <input type="text" id="inspection-gauge" class="form-input" value="${Utils.escapeHTML(e?.gaugeReading||"")}" placeholder="\u0645\u062B\u0627\u0644: 150 PSI">
                            </div>
                            <div>
                                <label class="form-label">\u062E\u062A\u0645 \u0627\u0644\u0623\u0645\u0627\u0646</label>
                                <select id="inspection-seal" class="form-input">
                                    <option value="unknown">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</option>
                                    <option value="true" ${e?.sealIntact===!0?"selected":""}>\u0633\u0644\u064A\u0645</option>
                                    <option value="false" ${e?.sealIntact===!1?"selected":""}>\u0645\u0643\u0633\u0648\u0631</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="inspection-remarks" class="form-input" rows="3" placeholder="\u0623\u064A\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.remarks||"")}</textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</label>
                                <textarea id="inspection-actions" class="form-input" rows="2" placeholder="\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A">${Utils.escapeHTML(e?.actions||"")}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${s?"\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#fire-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #fire-inspection-form");return}let c=!1;r.addEventListener("submit",async f=>{if(f.preventDefault(),f.stopPropagation(),c){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}c=!0;const d=r.querySelector('button[type="submit"]'),p=d?d.innerHTML:"";try{d&&(d.disabled=!0,d.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),g=h=>{const b=document.getElementById(h);return b?b.value.trim():""},w=h=>{const b=document.getElementById(h);return b?b.value:null},A=document.getElementById("inspection-asset"),m=(A?A.value:"")||i;if(!m){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}if(!s){const h=this.checkMonthlyInspectionAllowed(m);if(!h.allowed){Notification.warning(h.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}}const y={id:t,assetId:m,checkDate:(()=>{const h=document.getElementById("inspection-date");return h&&this.toISODate(h.value)||u})(),inspector:g("inspection-inspector"),status:g("inspection-status"),gaugeReading:g("inspection-gauge"),sealIntact:(()=>{const h=document.getElementById("inspection-seal");if(!h)return null;const b=h.value;return b==="true"?!0:b==="false"?!1:null})(),remarks:g("inspection-remarks"),actions:g("inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const S=AppState.appData.fireEquipmentInspections,x=S.findIndex(h=>h.id===t);x>-1?S[x]={...S[x],...y}:S.push(y);const v=this.getAssets().find(h=>h.id===m);v&&(v.lastServiceDate=y.checkDate,v.status=y.status,v.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(h=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",h)}),Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const h=await GoogleIntegration.sendRequest({action:s?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:y});if(!h.success)throw new Error(h.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",y.id),v&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:v}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",v.id)),this.refreshCurrentTab().catch(b=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",b)})}}catch(h){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",h)}})(),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}})},showMobileInspectionForm(e=null,a=null){if(!a&&!e?.assetId){Notification.warning("\u064A\u062C\u0628 \u0645\u0633\u062D QR Code \u0623\u0648\u0644\u0627\u064B \u0644\u0628\u062F\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A");return}const s=!!e,t=e?.id||Utils.generateId("FEI"),i=e?.assetId||a,n=this.getAssets().find(f=>f.id===i);if(!n){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");return}const o=e?.checkDate?new Date(e.checkDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <style>
                .mobile-inspection-modal {
                    max-width: 100%;
                    width: 100%;
                    max-height: 100vh;
                    height: 100vh;
                    margin: 0;
                    border-radius: 0;
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-modal {
                        max-width: 600px;
                        max-height: 95vh;
                        height: auto;
                        margin: auto;
                        border-radius: 12px;
                    }
                }
                .mobile-inspection-header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 1.25rem;
                    border-radius: 0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-header {
                        border-radius: 12px 12px 0 0;
                    }
                }
                .mobile-inspection-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.25rem;
                    -webkit-overflow-scrolling: touch;
                }
                .mobile-inspection-form-group {
                    margin-bottom: 1.5rem;
                }
                .mobile-inspection-label {
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                .mobile-inspection-input {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }
                .mobile-inspection-input:focus {
                    outline: none;
                    border-color: #dc2626;
                }
                .mobile-inspection-select {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    background: white;
                }
                .mobile-inspection-textarea {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    min-height: 100px;
                    resize: vertical;
                }
                .mobile-inspection-actions {
                    position: sticky;
                    bottom: 0;
                    background: white;
                    padding: 1rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 0.75rem;
                }
                .mobile-inspection-btn {
                    flex: 1;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .mobile-inspection-btn-primary {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                }
                .mobile-inspection-btn-secondary {
                    background: #f3f4f6;
                    color: #374151;
                }
                .device-info-card {
                    background: #f9fafb;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                }
                .device-info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e5e7eb;
                }
                .device-info-row:last-child {
                    border-bottom: none;
                }
                .device-info-label {
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                .device-info-value {
                    color: #111827;
                    font-weight: 500;
                }
                @media (max-width: 480px) {
                    .mobile-inspection-body {
                        padding: 1rem;
                    }
                    .mobile-inspection-form-group {
                        margin-bottom: 1.25rem;
                    }
                }
            </style>
            <div class="modal-content mobile-inspection-modal">
                <div class="mobile-inspection-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: white;">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${s?"\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635":"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A"}
                        </h2>
                        <button class="modal-close" onclick="FireEquipment.confirmClose(this)" style="color: white; font-size: 1.5rem; background: rgba(255,255,255,0.2); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-inspection-body">
                    <form id="mobile-inspection-form">
                        <div class="device-info-card">
                            <div class="device-info-row">
                                <span class="device-info-label">DeviceID:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u062C\u0647\u0627\u0632:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.number||n.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0645\u0648\u0642\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.location||"-")}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">\u0627\u0644\u0646\u0648\u0639:</span>
                                <span class="device-info-value">${Utils.escapeHTML(n.type||n.equipmentType||"-")}</span>
                            </div>
                        </div>

                        <input type="hidden" id="mobile-inspection-asset" value="${i}">

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-calendar ml-2"></i>
                                \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u062D\u0635 *
                            </label>
                            <input type="date" id="mobile-inspection-date" required class="mobile-inspection-input" value="${o}">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-user ml-2"></i>
                                \u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634 *
                            </label>
                            <input type="text" id="mobile-inspection-inspector" required class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(e?.inspector||"")}" 
                                   placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0641\u062A\u0634">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-check-circle ml-2"></i>
                                \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 *
                            </label>
                            <select id="mobile-inspection-status" class="mobile-inspection-select" required>
                                ${this.statusOptions.map(f=>`<option value="${f.value}" ${e?.status===f.value?"selected":""}>${f.label}</option>`).join("")}
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-gauge ml-2"></i>
                                \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F / \u0627\u0644\u0636\u063A\u0637
                            </label>
                            <input type="text" id="mobile-inspection-gauge" class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(e?.gaugeReading||"")}" 
                                   placeholder="\u0645\u062B\u0627\u0644: 150 PSI">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-shield-alt ml-2"></i>
                                \u062E\u062A\u0645 \u0627\u0644\u0623\u0645\u0627\u0646
                            </label>
                            <select id="mobile-inspection-seal" class="mobile-inspection-select">
                                <option value="unknown">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</option>
                                <option value="true" ${e?.sealIntact===!0?"selected":""}>\u0633\u0644\u064A\u0645</option>
                                <option value="false" ${e?.sealIntact===!1?"selected":""}>\u0645\u0643\u0633\u0648\u0631</option>
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-comment ml-2"></i>
                                \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="mobile-inspection-remarks" class="mobile-inspection-textarea" 
                                      placeholder="\u0623\u064A\u0629 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0646 \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632">${Utils.escapeHTML(e?.remarks||"")}</textarea>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-tools ml-2"></i>
                                \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629
                            </label>
                            <textarea id="mobile-inspection-actions" class="mobile-inspection-textarea" 
                                      placeholder="\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A">${Utils.escapeHTML(e?.actions||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="mobile-inspection-actions">
                    <button type="button" class="mobile-inspection-btn mobile-inspection-btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" form="mobile-inspection-form" class="mobile-inspection-btn mobile-inspection-btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        ${s?"\u062D\u0641\u0638":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l);const r=l.querySelector("#mobile-inspection-form");if(!r){Utils.safeError("\u274C \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C #mobile-inspection-form");return}let c=!1;r.addEventListener("submit",async f=>{if(f.preventDefault(),f.stopPropagation(),c){Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0641\u0639\u0644");return}c=!0;const d=l.querySelector('button[type="submit"]'),p=d?d.innerHTML:"";try{d&&(d.disabled=!0,d.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const u=new Date().toISOString(),g=v=>{const h=document.getElementById(v);return h?h.value.trim():""},w=document.getElementById("mobile-inspection-asset"),A=(w?w.value:"")||i;if(!A){Notification.error("\u062E\u0637\u0623: DeviceID \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}if(!s){const v=this.checkMonthlyInspectionAllowed(A);if(!v.allowed){Notification.warning(v.reason||"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u0642\u062A"),c=!1,d&&(d.disabled=!1,d.innerHTML=p);return}}const m={id:t,assetId:A,checkDate:(()=>{const v=document.getElementById("mobile-inspection-date");return v&&this.toISODate(v.value)||u})(),inspector:g("mobile-inspection-inspector"),status:g("mobile-inspection-status"),gaugeReading:g("mobile-inspection-gauge"),sealIntact:(()=>{const v=document.getElementById("mobile-inspection-seal");if(!v)return null;const h=v.value;return h==="true"?!0:h==="false"?!1:null})(),remarks:g("mobile-inspection-remarks"),actions:g("mobile-inspection-actions"),createdAt:e?.createdAt||u,updatedAt:u};AppState.appData.fireEquipmentInspections||(AppState.appData.fireEquipmentInspections=[]);const y=AppState.appData.fireEquipmentInspections,S=y.findIndex(v=>v.id===t);S>-1?y[S]={...y[S],...m}:y.push(m);const x=this.getAssets().find(v=>v.id===A);x&&(x.lastServiceDate=m.checkDate,x.status=m.status,x.updatedAt=u),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),l&&l.parentNode&&l.remove(),this.refreshCurrentTab().catch(v=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",v)}),Notification.success(s?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u062D\u0635":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0641\u062D\u0635 \u0628\u0646\u062C\u0627\u062D"),(async()=>{try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const v=await GoogleIntegration.sendRequest({action:s?"updateFireEquipmentInspection":"addFireEquipmentInspection",data:m});if(!v.success)throw new Error(v.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635");Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u062D\u0635 \u0641\u064A Backend:",m.id),x&&(await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:x}),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:",x.id)),this.refreshCurrentTab().catch(h=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",h)})}}catch(v){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0641\u062D\u0635:",v)}})(),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}catch(u){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",u),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639: "+(u.message||u)),c=!1,d&&(d.disabled=!1,d.innerHTML=p)}})},viewAsset(e){const a=this.getAssets().find(l=>l.id===e);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632.");return}const s=this.getInspectionsByAsset(e),t=typeof QRCode<"u"?QRCode.generate(a.qrCodeData||this.generateQrData(a.id),200):null,i=JSON.stringify(a).replace(/"/g,"&quot;"),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632 ${Utils.escapeHTML(a.number||"")}</h2>
                    <button class="modal-close" onclick="FireEquipment.closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-info-circle ml-2"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632</h3>
                            </div>
                            <div class="card-body space-y-2 text-sm">
                                <p><strong>\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(a.location||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A:</strong> ${Utils.escapeHTML(a.subLocationName||a.subLocation||"-")}</p>
                                <p><strong>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(a.type||"-")}</p>
                                <p><strong>\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645:</strong> ${Utils.escapeHTML(a.capacity||a.capacityKg||"-")}</p>
                                <p><strong>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(a.siteNumber||a.number||"-")}</p>
                                <p><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629:</strong> ${Utils.escapeHTML(a.manufacturer||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(a.factoryName||a.factory||"-")}</p>
                                <p><strong>\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639:</strong> ${a.manufacturingYear||"-"}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C:</strong> ${a.productionDate?Utils.formatDate(a.productionDate):"-"}</p>
                                <p><strong>\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(a.serialNumber||"-")}</p>
                                <p><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${this.getStatusBadge(a.status)}</p>
                                <p><strong>\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A:</strong> ${Utils.escapeHTML(a.installationMethod||"-")}</p>
                                <p><strong>\u0627\u0644\u0645\u0648\u062F\u064A\u0644:</strong> ${Utils.escapeHTML(a.model||"-")}</p>
                                <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0631\u0643\u064A\u0628:</strong> ${a.installationDate?Utils.formatDate(a.installationDate):"-"}</p>
                                <p><strong>\u0622\u062E\u0631 \u0635\u064A\u0627\u0646\u0629:</strong> ${a.lastServiceDate?Utils.formatDate(a.lastServiceDate):"-"}</p>
                                <p><strong>\u0627\u0644\u0645\u0633\u0624\u0648\u0644:</strong> ${Utils.escapeHTML(a.responsible||"-")}</p>
                                ${a.notes?`<p><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(a.notes)}</p>`:""}
                            </div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-qrcode ml-2"></i>QR Code \u0644\u0644\u062C\u0647\u0627\u0632</h3>
                            </div>
                            <div class="card-body text-center space-y-3">
                                ${t?`<img src="${t}" alt="QR Code" class="mx-auto h-40 w-40 border border-gray-200 p-2 bg-white">`:'<p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F QR Code</p>'}
                                <div class="flex flex-wrap justify-center gap-2">
                                    <button class="btn-secondary" onclick="FireEquipment.printQr('${a.id}')">
                                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629 QR Code
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A: \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0645\u0633\u062D QR Code \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0647\u0631\u064A" \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629
                                </p>
                                <p class="text-xs text-gray-400 break-words">${Utils.escapeHTML(a.qrCodeData||this.generateQrData(a.id))}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header flex items-center justify-between">
                            <h3 class="card-title"><i class="fas fa-history ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</h3>
                            <span class="text-xs text-gray-400">${s.length} \u0641\u062D\u0635</span>
                        </div>
                        <div class="card-body">
                            ${s.length?`
                                <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                                    <table class="data-table text-sm" style="width: 100%; min-width: 100%; table-layout: auto;">
                                        <thead>
                                            <tr>
                                                <th style="min-width: 120px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                                <th style="min-width: 120px;">\u0627\u0644\u0645\u0641\u062A\u0634</th>
                                                <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                                <th style="min-width: 200px; word-wrap: break-word;">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${s.map(l=>`
                                                <tr>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.formatDate(l.checkDate)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(l.inspector||"-")}</td>
                                                    <td style="word-wrap: break-word;">${this.getStatusBadge(l.status)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px;">${Utils.escapeHTML(l.remarks||"-")}</td>
                                                </tr>
                                            `).join("")}
                                        </tbody>
                                    </table>
                                </div>
                            `:'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u062C\u0647\u0627\u0632.</p></div>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-center gap-2 form-actions-centered">
                    <button class="btn-secondary" onclick="FireEquipment.closeModal(this)">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="FireEquipment.showAssetForm(${i}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0647\u0627\u0632
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),n.addEventListener("click",l=>{l.target===n&&n.remove()});const o=n.querySelector(".modal-content");o&&o.addEventListener("click",l=>{l.stopPropagation()})},getInspectionsByAsset(e){return this.getInspections().filter(a=>a.assetId===e).sort((a,s)=>new Date(s.checkDate||s.createdAt||0)-new Date(a.checkDate||a.createdAt||0))},getLatestInspection(e){const a=this.getInspectionsByAsset(e);return a.length?a[0]:null},getAssetStats(){const e=this.getAssets(),a=e.length,s=e.filter(i=>i.status==="\u0635\u0627\u0644\u062D").length,t=e.filter(i=>i.status&&i.status!=="\u0635\u0627\u0644\u062D").length;return{total:a,active:s,needsMaintenance:t}},generateQrData(e){return String(e||"").trim()},async persistAll(){if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642...");const e=AppState.appData.fireEquipmentAssets||[];if(e.length>0){Utils.safeLog(`\u{1F4E6} \u062D\u0641\u0638 ${e.length} \u062C\u0647\u0627\u0632...`);const s=e.map(async o=>{try{return await GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:o}),{success:!0,id:o.id}}catch(l){return Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0627\u0632 ${o.id}:`,l),{success:!1,id:o.id,error:l}}}),t=await Promise.allSettled(s),i=t.filter(o=>o.status==="fulfilled"&&o.value.success).length,n=t.filter(o=>o.status==="rejected"||o.status==="fulfilled"&&!o.value.success).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 ${i} \u062C\u0647\u0627\u0632\u060C \u0641\u0634\u0644 ${n}`)}const a=AppState.appData.fireEquipmentInspections||[];a.length>0&&(Utils.safeLog(`\u{1F4CB} \u062D\u0641\u0638 ${a.length} \u0641\u062D\u0635...`),await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"FireEquipmentInspections",data:a}})),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){if(Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets:",e),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const a=AppState.appData.fireEquipmentAssets.map(t=>({...t})),s=AppState.appData.fireEquipmentInspections.map(t=>({...t}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",a),GoogleIntegration.autoSave("FireEquipmentInspections",s)])}catch(a){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062A\u0649 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 autoSave:",a)}}else if(typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave)try{const e=AppState.appData.fireEquipmentAssets.map(s=>({...s})),a=AppState.appData.fireEquipmentInspections.map(s=>({...s}));await Promise.allSettled([GoogleIntegration.autoSave("FireEquipmentAssets",e),GoogleIntegration.autoSave("FireEquipmentInspections",a)])}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0641\u064A Google Sheets",e)}},printQr(e){const a=this.getAssets().find(n=>n.id===e);if(!a){Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0645\u062D\u062F\u062F.");return}const s=a.qrCodeData||this.generateQrData(a.id),t=typeof QRCode<"u"?QRCode.generate(s,240):null;if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0648\u0644\u064A\u062F QR Code.");return}const i=window.open("","_blank");if(!i){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 QR Code");return}i.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>QR Code - ${Utils.escapeHTML(a.number||a.id)}</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
                    img { max-width: 320px; margin: 20px auto; display: block; }
                    .info { margin-top: 10px; font-size: 14px; }
                </style>
            </head>
            <body>
                <h2>QR Code \u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0625\u0637\u0641\u0627\u0621</h2>
                <p class="info"><strong>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632:</strong> ${Utils.escapeHTML(a.number||a.id)}</p>
                <p class="info"><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(a.location||"-")}</p>
                <img src="${t}" alt="QR Code">
                <p class="info">${s}</p>
                <script>window.onload = () => window.print();<\/script>
            </body>
            </html>
        `),i.document.close()},toISODate(e){if(!e)return"";try{const a=new Date(e);return Number.isNaN(a.getTime())?"":a.toISOString()}catch{return""}},showManageTypesModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-cog"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0623\u062C\u0647\u0632\u0629
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u062C\u062F\u064A\u062F</label>
                        <div class="flex gap-2">
                            <input type="text" id="new-type-input" class="form-input flex-1" placeholder="\u0623\u062F\u062E\u0644 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u062C\u062F\u064A\u062F">
                            <button type="button" id="add-type-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629
                            </button>
                        </div>
                    </div>
                    <div>
                        <label class="form-label">\u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</label>
                        <div id="types-list" class="space-y-2 max-h-64 overflow-y-auto p-3 border rounded">
                            ${this.assetTypes.map((t,i)=>`
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${i}">
                                    <span>${Utils.escapeHTML(t)}</span>
                                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${i}" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=e.querySelector("#add-type-btn"),s=e.querySelector("#new-type-input");a.addEventListener("click",()=>{const t=s.value.trim();if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(this.assetTypes.includes(t)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644");return}this.assetTypes.push(t),s.value="",this.refreshTypesList(e),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D")}),e.addEventListener("click",t=>{if(t.target.closest(".btn-remove-type")){const i=parseInt(t.target.closest(".btn-remove-type").dataset.typeIndex);confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639\u061F")&&(this.assetTypes.splice(i,1),this.refreshTypesList(e),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D"))}})},refreshTypesList(e){const a=e.querySelector("#types-list");a&&(a.innerHTML=this.assetTypes.map((s,t)=>`
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${t}">
                    <span>${Utils.escapeHTML(s)}</span>
                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${t}" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""))},showImportExcelModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-import ml-2"></i>
                        \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0645\u0644\u0641 Excel
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">\u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel</label>
                        <input type="file" id="excel-file-input" accept=".xlsx,.xls" class="form-input">
                        <p class="text-xs text-gray-500 mt-2">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u0645\u0644\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629: \u0645\u0643\u0627\u0646/\u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u060C \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0627\u0644\u0633\u0639\u0629/\u0643\u062C\u0645\u060C \u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629\u060C \u0627\u0644\u0645\u0635\u0646\u0639\u060C \u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C\u060C \u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632\u060C \u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A\u060C \u0645\u0644\u0627\u062D\u0638\u0627\u062A</p>
                    </div>
                    <div id="import-preview" class="hidden">
                        <h3 class="text-lg font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</h3>
                        <div class="table-wrapper" style="width: 100%; max-width: 100%; max-height: 16rem; overflow-x: auto; overflow-y: auto;">
                            <table class="data-table" id="preview-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead id="preview-head"></thead>
                                <tbody id="preview-body"></tbody>
                            </table>
                        </div>
                        <p class="text-sm text-gray-600 mt-2" id="preview-count"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="confirm-import-btn" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=e.querySelector("#excel-file-input"),s=e.querySelector("#confirm-import-btn"),t=e.querySelector("#import-preview"),i=e.querySelector("#preview-head"),n=e.querySelector("#preview-body"),o=e.querySelector("#preview-count");let l=[];(()=>{if(typeof XLSX>"u"){const c=document.createElement("script");c.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",c.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},c.onload=()=>{a.addEventListener("change",f=>{this.handleExcelFile(f.target.files[0],e,s,t,i,n,o,d=>{l=d})})},document.head.appendChild(c)}else a.addEventListener("change",c=>{this.handleExcelFile(c.target.files[0],e,s,t,i,n,o,f=>{l=f})})})(),s.addEventListener("click",async()=>{if(l.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 Excel \u0623\u0648\u0644\u0627\u064B");return}await this.processImport(l,e)})},async handleExcelFile(e,a,s,t,i,n,o,l){if(e){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");return}Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");try{const r=await e.arrayBuffer(),c=XLSX.read(r,{type:"array"}),f=c.SheetNames[0],d=c.Sheets[f],p=XLSX.utils.sheet_to_json(d);if(p.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}const g=this.getAssets().map(m=>m.id).filter(m=>m&&m.match(/^EFA-\d{4}$/)).map(m=>parseInt(m.split("-")[1])).filter(m=>!isNaN(m));let w=g.length>0?Math.max(...g)+1:1;const A=p.map(m=>{const S=`EFA-${String(w).padStart(4,"0")}`;return w++,{id:S,location:m["\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0645\u0643\u0627\u0646 \u0627\u0644\u062C\u0647\u0627\u0632"]||m.\u0627\u0644\u0645\u0648\u0642\u0639||"",subLocation:m["\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"]||"",type:m["\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",capacity:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",capacityKg:m["\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645"]||m.\u0627\u0644\u0633\u0639\u0629||"",siteNumber:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",number:m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639"]||m["\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632"]||"",manufacturer:m["\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629"]||"",factory:m.\u0627\u0644\u0645\u0635\u0646\u0639||"",manufacturingYear:m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]?parseInt(m["\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639"]):null,productionDate:m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]?this.parseDate(m["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C"]):"",serialNumber:m["\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632"]||m["\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u0644\u0633\u0644"]||"",status:m["\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632"]||"\u0635\u0627\u0644\u062D",installationMethod:m["\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A"]||"",notes:m.\u0645\u0644\u0627\u062D\u0638\u0627\u062A||"",qrCodeData:this.generateQrData(S),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}).filter(m=>m.location&&m.type);if(A.length>0){const m=Object.keys(p[0]);i.innerHTML=`<tr>${m.map(y=>`<th>${Utils.escapeHTML(y)}</th>`).join("")}</tr>`,n.innerHTML=p.slice(0,5).map(y=>`<tr>${m.map(S=>`<td>${Utils.escapeHTML(String(y[S]||""))}</td>`).join("")}</tr>`).join(""),o.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0631\u0627\u062F \u0627\u0633\u062A\u064A\u0631\u0627\u062F\u0647\u0627: ${A.length}`,t.classList.remove("hidden"),s.disabled=!1,l(A)}else Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u062D\u064A\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F");Loading.hide()}catch(r){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+r.message)}}},async processImport(e,a){if(!e||e.length===0){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062D\u0641\u0638\u0647\u0627 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{let s=0,t=0;const i=e.length;if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){for(let o=0;o<i;o+=5){const l=e.slice(o,o+5),r=l.map(f=>GoogleIntegration.sendRequest({action:"saveOrUpdateFireEquipmentAsset",data:f}).then(d=>(d.success?s++:t++,d)).catch(d=>(t++,{success:!1,error:d})));await Promise.allSettled(r);const c=Math.min(100,Math.round((o+l.length)/i*100));Loading.show(`\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A... ${c}% (${s} \u0646\u0627\u062C\u062D)`)}await this.loadAssetsFromBackend()}else{const n=this.getAssets();let o=0,l=0;e.forEach(r=>{const c=n.find(f=>f.id===r.id);c?(Object.assign(c,r),c.updatedAt=new Date().toISOString(),o++):(n.push(r),l++)}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),s=l+o}if(Loading.hide(),t>0?Notification.warning(`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: ${s} \u0646\u0627\u062C\u062D\u060C ${t} \u0641\u0634\u0644.`):Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${s} \u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D.`),a&&a.remove(),this.state.currentTab==="register"){const n=document.getElementById("fire-register-table");n&&(n.innerHTML=this.renderRegisterTable(),this.bindRegisterTableEvents(n))}else this.renderAssets();this.renderStats()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+s.message)}},parseDate(e){if(!e)return"";if(e instanceof Date)return e.toISOString();if(typeof e=="number"){const s=Math.floor(e),t=e-s,i=new Date(1899,11,30),n=new Date(i.getTime()+s*24*60*60*1e3);if(t>0){const o=Math.round(t*24*60*60),l=Math.floor(o/3600),r=Math.floor(o%3600/60),c=o%60;n.setHours(l,r,c,0)}return n.toISOString()}const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString()},exportToExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644\u0647\u0627...");const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",e.onerror=function(){this.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"},e.onload=()=>this.exportToExcel(),document.head.appendChild(e);return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");try{const a=this.getAssets().map(n=>({\u0627\u0644\u0645\u0635\u0646\u0639:n.factoryName||n.factory||"","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A":n.subLocationName||n.subLocation||"","\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":n.location||"","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632":n.type||"","\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645":n.capacity||n.capacityKg||"","\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639":n.siteNumber||n.number||"","\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629":n.manufacturer||"","\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639":n.manufacturingYear||"","\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632":n.serialNumber||"","\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632":n.status||"","\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A":n.installationMethod||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:n.notes||""})),s=XLSX.utils.json_to_sheet(a),t=XLSX.utils.book_new();XLSX.utils.book_append_sheet(t,s,"\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621");const i=`\u0633\u062C\u0644_\u0645\u0639\u062F\u0627\u062A_\u0627\u0644\u0627\u0637\u0641\u0627\u0621_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(t,i),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+e.message)}},async exportRegisterToPDF(){const e=this.getAssets();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 PDF...");try{const a=window.open("","_blank");if(!a){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),Loading.hide();return}const s=e.map(i=>`
                <tr>
                    <td>${Utils.escapeHTML(i.factoryName||i.factory||"-")}</td>
                    <td>${Utils.escapeHTML(i.subLocationName||i.subLocation||"-")}</td>
                    <td>${Utils.escapeHTML(i.location||"-")}</td>
                    <td>${Utils.escapeHTML(i.type||"-")}</td>
                    <td>${Utils.escapeHTML(i.capacity||i.capacityKg||"-")}</td>
                    <td>${Utils.escapeHTML(i.siteNumber||i.number||"-")}</td>
                    <td>${Utils.escapeHTML(i.manufacturer||"-")}</td>
                    <td>${Utils.escapeHTML(i.manufacturingYear||"-")}</td>
                    <td>${Utils.escapeHTML(i.serialNumber||"-")}</td>
                    <td>${Utils.escapeHTML(i.status||"-")}</td>
                    <td>${Utils.escapeHTML(i.installationMethod||"-")}</td>
                    <td>${Utils.escapeHTML(i.notes||"-")}</td>
                </tr>
            `).join(""),t=`
                <!DOCTYPE html>
                <html dir="rtl" lang="ar">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            direction: rtl;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                            font-size: 11px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: right;
                        }
                        th {
                            background-color: #3b82f6;
                            color: white;
                            font-weight: bold;
                        }
                        tr:nth-child(even) {
                            background-color: #f9fafb;
                        }
                        @media print {
                            body { padding: 10px; }
                            table { font-size: 9px; }
                            th, td { padding: 5px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>\u0633\u062C\u0644 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u0637\u0641\u0627\u0621 \u0648\u0627\u0644\u0627\u0646\u0630\u0627\u0631</h1>
                    <p style="text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${new Date().toLocaleDateString("ar-SA")}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th>\u0645\u0643\u0627\u0646 / \u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0627\u0644\u0633\u0639\u0629 / \u0643\u062C\u0645</th>
                                <th>\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629</th>
                                <th>\u0633\u0646\u0629 \u0627\u0644\u0635\u0646\u0639</th>
                                <th>\u0631\u0642\u0645 \u0645\u0633\u0644\u0633\u0644 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                <th>\u0637\u0631\u064A\u0642\u0629 \u062A\u062B\u0628\u064A\u062A</th>
                                <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${s}
                        </tbody>
                    </table>
                    <script>window.onload = () => setTimeout(() => window.print(), 500);<\/script>
                </body>
                </html>
            `;a.document.write(t),a.document.close(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 PDF \u0628\u0646\u062C\u0627\u062D")}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 PDF: "+a.message)}},isAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function")return Permissions.isCurrentUserEffectiveAdmin();const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return!!(e&&(e.role==="admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="system_admin"||e.permissions&&(e.permissions.admin===!0||e.permissions["manage-modules"]===!0)))},hasTabAccess(e){return(typeof AppState<"u"&&AppState?AppState.currentUser:null)?this.isAdmin()?!0:typeof Permissions<"u"?Permissions.hasDetailedPermission("fire-equipment",e):!0:e==="database"},canAdd(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;if(!e)return!1;if(this.isAdmin())return!0;const a=e.permissions?.fireEquipment||{};return a.add===!0||a.edit===!0},canEdit(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).edit===!0:!1},canDelete(){const e=typeof AppState<"u"&&AppState?AppState.currentUser:null;return e?this.isAdmin()?!0:(e.permissions?.fireEquipment||{}).delete===!0:!1},async deleteAsset(e){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0623\u062C\u0647\u0632\u0629. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.");return}const a=this.getAssets().find(t=>t.id===e);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 "${a.number||e}"\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B.`)){Loading.show();try{let t=!1;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const r=await GoogleIntegration.sendRequest({action:"deleteFireEquipment",data:{assetId:e}});if(r&&r.success)t=!0,Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend \u0628\u0646\u062C\u0627\u062D");else{const c=r?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend";Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",c)}}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u0646 Backend:",r)}else t=!0;const i=this.getAssets(),n=i.findIndex(r=>r.id===e);n>-1&&i.splice(n,1);const o=this.getInspections();if(o.filter(r=>r.assetId===e).forEach(r=>{const c=o.findIndex(f=>f.id===r.id);c>-1&&o.splice(c,1)}),AppState.appData&&AppState.appData.fireEquipmentApprovalRequests){const r=AppState.appData.fireEquipmentApprovalRequests;r.filter(f=>f.assetId===e).forEach(f=>{const d=r.findIndex(p=>p.id===f.id);d>-1&&r.splice(d,1)})}AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentAssets=i,AppState.appData.fireEquipmentInspections=o,typeof DataManager<"u"&&DataManager.save?DataManager.save():(localStorage.setItem("fire_equipment_assets",JSON.stringify(i)),localStorage.setItem("fire_equipment_inspections",JSON.stringify(o))),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0645\u062D\u0644\u064A\u0627\u064B"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632 \u0628\u0646\u062C\u0627\u062D"),await this.refreshCurrentTab(!0),this.state.currentTab==="database"?(this.refreshFilterOptions(),this.renderSummary()):this.state.currentTab==="register"&&this.updateRegisterStatisticsCards()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0627\u0632")}finally{Loading.hide()}}},async renderAnalyticsTab(){return this.isAdmin()?`
            <div class="space-y-6">
                <!-- \u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-filter ml-2"></i>
                            \u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label class="form-label">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="analytics-date-from" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                <input type="date" id="analytics-date-to" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632</label>
                                <select id="analytics-type-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <select id="analytics-location-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <button id="analytics-apply-filters" class="btn-primary">
                                <i class="fas fa-search ml-2"></i>
                                \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u062A\u0631\u0629
                            </button>
                            <button id="analytics-reset-filters" class="btn-secondary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                            </button>
                            <button id="analytics-export-data" class="btn-secondary">
                                <i class="fas fa-download ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                            </button>
                        </div>
                    </div>
                </div>

                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0639\u0627\u0645\u0629 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-fire-extinguisher text-4xl text-blue-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062C\u0647\u0632\u0629</p>
                            <p class="text-3xl font-bold" id="analytics-total-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-check-circle text-4xl text-green-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0623\u062C\u0647\u0632\u0629 \u0635\u0627\u0644\u062D\u0629</p>
                            <p class="text-3xl font-bold text-green-600" id="analytics-active-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-tools text-4xl text-yellow-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0628\u062D\u0627\u062C\u0629 \u0635\u064A\u0627\u0646\u0629</p>
                            <p class="text-3xl font-bold text-yellow-600" id="analytics-maintenance-assets">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-times-circle text-4xl text-red-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</p>
                            <p class="text-3xl font-bold text-red-600" id="analytics-out-service-assets">0</p>
                        </div>
                    </div>
                </div>

                <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-clipboard-check text-4xl text-blue-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A</p>
                            <p class="text-3xl font-bold" id="analytics-total-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-check-double text-4xl text-green-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0641\u062D\u0648\u0635\u0627\u062A \u0645\u0643\u062A\u0645\u0644\u0629</p>
                            <p class="text-3xl font-bold text-green-600" id="analytics-completed-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0641\u062D\u0648\u0635\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</p>
                            <p class="text-3xl font-bold text-yellow-600" id="analytics-maintenance-inspections">0</p>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="text-center">
                            <i class="fas fa-percentage text-4xl text-purple-600 mb-2"></i>
                            <p class="text-sm text-gray-500">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0643\u062A\u0645\u0627\u0644</p>
                            <p class="text-3xl font-bold text-purple-600" id="analytics-completion-rate">0%</p>
                        </div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-pie ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0627\u0632
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-type-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-location-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0632\u0645\u0646\u064A \u0644\u0644\u0641\u062D\u0648\u0635\u0627\u062A -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0632\u0645\u0646\u064A \u0644\u0644\u0641\u062D\u0648\u0635\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-timeline-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0641\u062A\u0634\u064A\u0646 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-user-check ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0641\u062A\u0634
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-inspector-table"></div>
                    </div>
                </div>

                <!-- \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <div id="analytics-by-status-table"></div>
                    </div>
                </div>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645</p></div>'},getAnalyticsData(e={}){const a=this.getAssets(),s=this.getInspections();let t=s;(e.dateFrom||e.dateTo)&&(t=s.filter(p=>{const u=new Date(p.checkDate||p.createdAt);if(e.dateFrom&&u<new Date(e.dateFrom))return!1;if(e.dateTo){const g=new Date(e.dateTo);if(g.setHours(23,59,59,999),u>g)return!1}return!0}));let i=a;e.type&&e.type!=="all"&&(i=i.filter(p=>p.type===e.type)),e.location&&e.location!=="all"&&(i=i.filter(p=>p.location===e.location));const n={total:i.length,active:i.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:i.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:i.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length},o={total:t.length,completed:t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,needsMaintenance:t.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,outOfService:t.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length,completionRate:t.length>0?(t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length/t.length*100).toFixed(1):0},l={};i.forEach(p=>{const u=p.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";l[u]||(l[u]={total:0,active:0,needsMaintenance:0,outOfService:0}),l[u].total++,p.status==="\u0635\u0627\u0644\u062D"?l[u].active++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?l[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&l[u].outOfService++});const r={};i.forEach(p=>{const u=p.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[u]||(r[u]={total:0,active:0,needsMaintenance:0,outOfService:0}),r[u].total++,p.status==="\u0635\u0627\u0644\u062D"?r[u].active++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?r[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&r[u].outOfService++});const c={};t.forEach(p=>{const u=new Date(p.checkDate||p.createdAt),g=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`,w=u.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});c[g]||(c[g]={label:w,total:0,completed:0,needsMaintenance:0,outOfService:0}),c[g].total++,p.status==="\u0635\u0627\u0644\u062D"?c[g].completed++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?c[g].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&c[g].outOfService++});const f={};t.forEach(p=>{const u=p.inspector||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";f[u]||(f[u]={total:0,completed:0,needsMaintenance:0,outOfService:0}),f[u].total++,p.status==="\u0635\u0627\u0644\u062D"?f[u].completed++:p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?f[u].needsMaintenance++:p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&f[u].outOfService++});const d={\u0635\u0627\u0644\u062D:t.filter(p=>p.status==="\u0635\u0627\u0644\u062D").length,"\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629":t.filter(p=>p.status==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629").length,"\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629":t.filter(p=>p.status==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629").length};return{assetStats:n,inspectionStats:o,byType:l,byLocation:r,byMonth:c,byInspector:f,byStatus:d}},renderAnalyticsData(){if(!this.isAdmin()||!document.getElementById("fire-tab-content")||this.state.currentTab!=="analytics")return;const a=document.getElementById("analytics-date-from")?.value||"",s=document.getElementById("analytics-date-to")?.value||"",t=document.getElementById("analytics-type-filter")?.value||"all",i=document.getElementById("analytics-location-filter")?.value||"all",n={dateFrom:a,dateTo:s,type:t,location:i},o=this.getAnalyticsData(n),l=document.getElementById("analytics-total-assets");l&&(l.textContent=o.assetStats.total);const r=document.getElementById("analytics-active-assets");r&&(r.textContent=o.assetStats.active);const c=document.getElementById("analytics-maintenance-assets");c&&(c.textContent=o.assetStats.needsMaintenance);const f=document.getElementById("analytics-out-service-assets");f&&(f.textContent=o.assetStats.outOfService);const d=document.getElementById("analytics-total-inspections");d&&(d.textContent=o.inspectionStats.total);const p=document.getElementById("analytics-completed-inspections");p&&(p.textContent=o.inspectionStats.completed);const u=document.getElementById("analytics-maintenance-inspections");u&&(u.textContent=o.inspectionStats.needsMaintenance);const g=document.getElementById("analytics-completion-rate");g&&(g.textContent=o.inspectionStats.completionRate+"%");const w=document.getElementById("analytics-by-type-table");if(w){const x=this.renderAnalyticsTable(o.byType,["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"]);w.innerHTML=x}const A=document.getElementById("analytics-by-location-table");if(A){const x=this.renderAnalyticsTable(o.byLocation,["\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0635\u0627\u0644\u062D","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"]);A.innerHTML=x}const m=document.getElementById("analytics-timeline-table");if(m){const x=this.renderTimelineTable(o.byMonth);m.innerHTML=x}const y=document.getElementById("analytics-by-inspector-table");if(y){const x=this.renderAnalyticsTable(o.byInspector,["\u0627\u0644\u0645\u0641\u062A\u0634","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0643\u062A\u0645\u0644","\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629","\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"],["total","completed","needsMaintenance","outOfService"]);y.innerHTML=x}const S=document.getElementById("analytics-by-status-table");if(S){const x=this.renderStatusTable(o.byStatus);S.innerHTML=x}},renderAnalyticsTable(e,a,s=["total","active","needsMaintenance","outOfService"]){if(!e||Object.keys(e).length===0)return'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>';const t=Object.entries(e).sort((i,n)=>n[1].total-i[1].total).map(([i,n])=>`
                    <tr>
                        <td class="font-semibold">${Utils.escapeHTML(i)}</td>
                        <td>${n.total||0}</td>
                        <td>${n[s[1]]||0}</td>
                        <td>${n[s[2]]||0}</td>
                        <td>${n[s[3]]||0}</td>
                    </tr>
                `).join("");return`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            ${a.map(i=>`<th style="min-width: 100px; word-wrap: break-word;">${i}</th>`).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${t}
                    </tbody>
                </table>
            </div>
        `},renderTimelineTable(e){return!e||Object.keys(e).length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u0645\u0646\u064A\u0629 \u0644\u0644\u0639\u0631\u0636</p></div>':`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0627\u0644\u0634\u0647\u0631</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                            <th style="min-width: 100px;">\u0645\u0643\u062A\u0645\u0644</th>
                            <th style="min-width: 120px;">\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629</th>
                            <th style="min-width: 120px;">\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(e).sort((s,t)=>s[0].localeCompare(t[0])).map(([s,t])=>`
                    <tr>
                        <td class="font-semibold">${Utils.escapeHTML(t.label)}</td>
                        <td>${t.total||0}</td>
                        <td>${t.completed||0}</td>
                        <td>${t.needsMaintenance||0}</td>
                        <td>${t.outOfService||0}</td>
                    </tr>
                `).join("")}
                    </tbody>
                </table>
            </div>
        `},renderStatusTable(e){if(!e||Object.keys(e).length===0)return'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>';const a=Object.values(e).reduce((t,i)=>t+i,0);return`
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0639\u062F\u062F</th>
                            <th style="min-width: 100px;">\u0627\u0644\u0646\u0633\u0628\u0629</th>
                            <th style="min-width: 150px;">\u0627\u0644\u062A\u0645\u062B\u064A\u0644</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(e).map(([t,i])=>{const n=a>0?(i/a*100).toFixed(1):0;let o="badge-info";return t==="\u0635\u0627\u0644\u062D"?o="badge-success":t==="\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629"?o="badge-warning":t==="\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629"&&(o="badge-danger"),`
                    <tr>
                        <td><span class="badge ${o}">${Utils.escapeHTML(t)}</span></td>
                        <td class="font-semibold">${i}</td>
                        <td>${n}%</td>
                        <td>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${n}%"></div>
                            </div>
                        </td>
                    </tr>
                `}).join("")}
                    </tbody>
                </table>
            </div>
        `},setupAnalyticsEventListeners(){const e=this.getAssets(),a=document.getElementById("analytics-type-filter"),s=document.getElementById("analytics-location-filter");if(a){const o=Array.from(new Set(e.map(l=>l.type).filter(Boolean)));a.innerHTML='<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>'+o.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join("")}if(s){const o=Array.from(new Set(e.map(l=>l.location).filter(Boolean)));s.innerHTML='<option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639</option>'+o.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join("")}const t=document.getElementById("analytics-apply-filters");if(t){const o=t.cloneNode(!0);t.parentNode.replaceChild(o,t),o.addEventListener("click",()=>{this.renderAnalyticsData()})}const i=document.getElementById("analytics-reset-filters");if(i){const o=i.cloneNode(!0);i.parentNode.replaceChild(o,i),o.addEventListener("click",()=>{document.getElementById("analytics-date-from").value="",document.getElementById("analytics-date-to").value="",document.getElementById("analytics-type-filter").value="all",document.getElementById("analytics-location-filter").value="all",this.renderAnalyticsData()})}const n=document.getElementById("analytics-export-data");if(n){const o=n.cloneNode(!0);n.parentNode.replaceChild(o,n),o.addEventListener("click",()=>{this.exportAnalyticsData()})}this.renderAnalyticsData()},exportAnalyticsData(){try{const e=document.getElementById("analytics-date-from")?.value||"",a=document.getElementById("analytics-date-to")?.value||"",s=document.getElementById("analytics-type-filter")?.value||"all",t=document.getElementById("analytics-location-filter")?.value||"all",i={dateFrom:e,dateTo:a,type:s,location:t},n=this.getAnalyticsData(i),o=this.getAssets(),l=this.getInspections();let r=`\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642
`;r+=`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${new Date().toLocaleDateString("ar-SA")}

`,r+=`\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u062C\u0647\u0632\u0629
`,r+=`\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,r+=`${n.assetStats.total},${n.assetStats.active},${n.assetStats.needsMaintenance},${n.assetStats.outOfService}

`,r+=`\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A
`,r+=`\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0645\u0643\u062A\u0645\u0644,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629,\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0643\u062A\u0645\u0627\u0644
`,r+=`${n.inspectionStats.total},${n.inspectionStats.completed},${n.inspectionStats.needsMaintenance},${n.inspectionStats.outOfService},${n.inspectionStats.completionRate}%

`,r+=`\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639
`,r+=`\u0627\u0644\u0646\u0648\u0639,\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,Object.entries(n.byType).sort((p,u)=>u[1].total-p[1].total).forEach(([p,u])=>{r+=`${p},${u.total},${u.active},${u.needsMaintenance},${u.outOfService}
`}),r+=`
`,r+=`\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639
`,r+=`\u0627\u0644\u0645\u0648\u0642\u0639,\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A,\u0635\u0627\u0644\u062D,\u064A\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629,\u062E\u0627\u0631\u062C \u0627\u0644\u062E\u062F\u0645\u0629
`,Object.entries(n.byLocation).sort((p,u)=>u[1].total-p[1].total).forEach(([p,u])=>{r+=`${p},${u.total},${u.active},${u.needsMaintenance},${u.outOfService}
`});const c=new Blob(["\uFEFF"+r],{type:"text/csv;charset=utf-8;"}),f=document.createElement("a"),d=URL.createObjectURL(c);f.setAttribute("href",d),f.setAttribute("download",`\u062A\u062D\u0644\u064A\u0644_\u0645\u0639\u062F\u0627\u062A_\u0627\u0644\u062D\u0631\u064A\u0642_${new Date().toISOString().slice(0,10)}.csv`),f.style.visibility="hidden",document.body.appendChild(f),f.click(),document.body.removeChild(f),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+e.message)}},async renderApprovalRequestsTab(){if(!this.isAdmin())return'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.</p></div>';this.ensureData();try{const t=await this.loadApprovalRequestsFromBackend();t&&t.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${t.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",t)}const e=this.getApprovalRequests();if(!e||!Array.isArray(e))return Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u062A\u0627\u062D\u0629"),'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p></div>';const s=[...e].sort((t,i)=>{const n={pending:1,approved:2,rejected:3},o=n[t.status]||99,l=n[i.status]||99;if(o!==l)return o-l;const r=new Date(t.requestedAt||0);return new Date(i.requestedAt||0)-r}).map(t=>{const i=t.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':t.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',n=t.type==="inspection"?'<i class="fas fa-clipboard-check ml-1"></i>\u0641\u062D\u0635 \u0634\u0647\u0631\u064A':t.type==="add"?'<i class="fas fa-plus-circle ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632':t.type==="edit"?'<i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632':t.type==="delete"?'<i class="fas fa-trash ml-1"></i>\u062D\u0630\u0641 \u062C\u0647\u0627\u0632':'<i class="fas fa-question-circle ml-1"></i>\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F',o=this.getAssets().find(r=>r.id===t.assetId||r.number===t.assetNumber),l=o?`${o.number||o.id} - ${o.location||""}`:t.assetNumber||t.assetId||"-";return`
                <tr data-request-id="${t.id}" data-status="${t.status||"pending"}" style="${t.status==="pending"?"background-color: rgba(255, 193, 7, 0.05);":""}">
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.id||"-")}</div>
                        ${t.status==="pending"?'<div class="text-xs text-yellow-600 mt-1"><i class="fas fa-exclamation-circle ml-1"></i>\u064A\u062A\u0637\u0644\u0628 \u0645\u0631\u0627\u062C\u0639\u0629</div>':""}
                    </td>
                    <td>${n}</td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(l)}</div>
                        ${o?`<div class="text-xs text-gray-500">${Utils.escapeHTML(o.type||"")}</div>`:""}
                    </td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(t.requestedBy||t.userName||"-")}</div>
                        ${t.userEmail?`<div class="text-xs text-gray-500">${Utils.escapeHTML(t.userEmail)}</div>`:""}
                    </td>
                    <td>
                        <div>${t.requestedAt?Utils.formatDate(t.requestedAt):"-"}</div>
                        ${t.approvedAt||t.rejectedAt?`<div class="text-xs text-gray-500 mt-1">
                                ${t.status==="approved"&&t.approvedAt?`\u0645\u0648\u0627\u0641\u0642: ${Utils.formatDate(t.approvedAt)}`:""}
                                ${t.status==="rejected"&&t.rejectedAt?`\u0645\u0631\u0641\u0648\u0636: ${Utils.formatDate(t.rejectedAt)}`:""}
                            </div>`:""}
                    </td>
                    <td>${i}</td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">
                        <div class="text-sm">${Utils.escapeHTML(t.comments||t.reason||"-")}</div>
                        ${t.rejectionReason?`<div class="text-xs text-red-600 mt-1"><i class="fas fa-info-circle ml-1"></i>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636: ${Utils.escapeHTML(t.rejectionReason)}</div>`:""}
                    </td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            ${t.status==="pending"?`
                            <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${t.id}" title="\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${t.id}" title="\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-times"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${t.id}" title="\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${t.status==="pending"?`
                            <button class="btn-icon btn-icon-warning" data-action="edit-request" data-id="${t.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-edit"></i>
                            </button>
                            `:""}
                            <button class="btn-icon btn-icon-danger" data-action="delete-request" data-id="${t.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("");return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </h2>
                        <div class="flex items-center gap-2">
                            <input type="text" id="approval-requests-search" class="form-input" placeholder="\u0628\u062D\u062B..." style="width: 250px;">
                            <button id="approval-requests-refresh" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                \u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${e.length===0?`
                        <div class="empty-state">
                            <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0648\u0627\u0641\u0642\u0629 \u062D\u0627\u0644\u064A\u0627\u064B</p>
                        </div>
                    `:`
                        <div class="table-wrapper approval-requests-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                            <table class="data-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead style="position: sticky; top: 0; background: var(--card-bg); z-index: 10;">
                                    <tr>
                                        <th style="min-width: 100px;">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632</th>
                                        <th style="min-width: 150px;">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 120px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                                        <th style="min-width: 100px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th style="min-width: 200px; word-wrap: break-word;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                        <th style="min-width: 150px;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody id="approval-requests-table-body">
                                    ${s}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `},async loadApprovalRequestsFromBackend(){try{if(GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled){const a=await GoogleIntegration.sendRequest({action:"getFireEquipmentApprovalRequests",data:{}});if(a&&a.success&&a.data){AppState.appData||(AppState.appData={});const s=Array.isArray(a.data)?a.data:[],i=[...AppState.appData.fireEquipmentApprovalRequests||[]];return s.forEach(n=>{const o=i.findIndex(l=>l.id===n.id);o>=0?i[o]={...i[o],...n}:i.push(n)}),AppState.appData.fireEquipmentApprovalRequests=i,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(i)),Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0648\u062F\u0645\u062C ${i.length} \u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 (${s.length} \u0645\u0646 Backend)`),i}else Utils.safeWarn("\u26A0\uFE0F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629 \u0645\u0646 Backend:",a)}else Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u0623\u0648 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644")}catch(a){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 Backend:",a)}return this.getApprovalRequests()||[]},getApprovalRequests(){if(AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests&&Array.isArray(AppState.appData.fireEquipmentApprovalRequests))return AppState.appData.fireEquipmentApprovalRequests;const e=localStorage.getItem("fire_equipment_approval_requests");if(e)try{const a=JSON.parse(e);if(Array.isArray(a))return AppState.appData.fireEquipmentApprovalRequests=a,a}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0646 localStorage:",a)}return AppState.appData.fireEquipmentApprovalRequests=[],[]},setupApprovalRequestsEventListeners(){const e=document.getElementById("approval-requests-search");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),t.addEventListener("input",i=>{const n=i.target.value.toLowerCase();document.querySelectorAll("#approval-requests-table-body tr[data-request-id]").forEach(l=>{const r=l.textContent.toLowerCase();l.style.display=r.includes(n)?"":"none"})})}const a=document.getElementById("approval-requests-refresh");if(a){const t=a.cloneNode(!0);a.parentNode&&a.parentNode.replaceChild(t,a),t.addEventListener("click",async i=>{i.preventDefault(),i.stopPropagation();try{Loading.show(),await this.loadApprovalRequestsFromBackend(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),await this.switchTab("approval-requests"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A")}finally{Loading.hide()}})}const s=document.getElementById("approval-requests-table-body");s&&s.addEventListener("click",async t=>{const i=t.target.closest("[data-action]");if(!i)return;const n=i.dataset.action,o=i.dataset.id;switch(n){case"approve-request":await this.approveRequest(o);break;case"reject-request":await this.rejectRequest(o);break;case"view-request":await this.viewRequest(o);break;case"edit-request":await this.editRequest(o);break;case"delete-request":await this.deleteRequest(o);break}})},async approveRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const s=this.getApprovalRequests(),t=s.find(i=>i.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}if(t.status="approved",t.approvedBy=AppState.currentUser?.name||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",t.approvedAt=new Date().toISOString(),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=s,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(s)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const i=await GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"approved",approvedBy:t.approvedBy,approvedAt:t.approvedAt}});i&&!i.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A Backend:",i.message):Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0641\u064A Backend:",i)}Notification.success("\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyUserAboutRequestStatus(t,"approved").catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",i)}),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","update",e),await this.switchTab("approval-requests"),t.type==="inspection"&&t.assetId&&setTimeout(()=>{this.switchTab("inspections").then(()=>{setTimeout(()=>{this.showInspectionForm(null,t.assetId)},300)})},500)}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async rejectRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}const a=prompt("\u0623\u062F\u062E\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(a!==null){Loading.show();try{const s=this.getApprovalRequests(),t=s.find(i=>i.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}if(t.status="rejected",t.rejectedBy=AppState.currentUser?.name||AppState.currentUser?.email||"\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",t.rejectedAt=new Date().toISOString(),t.rejectionReason=a||"",AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=s,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(s)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const i=await GoogleIntegration.sendRequest({action:"updateFireEquipmentApprovalRequest",data:{requestId:e,status:"rejected",rejectedBy:t.rejectedBy,rejectedAt:t.rejectedAt,rejectionReason:t.rejectionReason}});i&&!i.success?Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u064A Backend:",i.message):Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0641\u0636 \u0641\u064A Backend \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0631\u0641\u0636 \u0641\u064A Backend:",i)}Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyUserAboutRequestStatus(t,"rejected",a).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",i)}),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("fireEquipmentApprovalRequests","update",e),await this.switchTab("approval-requests")}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async notifyUserAboutRequestStatus(e,a,s=""){try{const t=e.requestedById||e.userEmail||"";if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631: \u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=e.assetNumber||e.assetId||"\u062C\u0647\u0627\u0632 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F";let n,o,l;if(a==="approved")n="\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628\u0643",o=`\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628\u0643 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${i}`,l="success";else if(a==="rejected")n="\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628\u0643",o=`\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628\u0643 \u0644\u0625\u062C\u0631\u0627\u0621 \u0641\u062D\u0635 \u0634\u0647\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062C\u0647\u0627\u0632: ${i}${s?`. \u0627\u0644\u0633\u0628\u0628: ${s}`:""}`,l="error";else return;GoogleIntegration&&AppState.googleConfig?.appsScript?.enabled&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:t,title:n,message:o,type:l,priority:a==="approved"?"normal":"high",link:"#fire-equipment-inspections",data:{module:"fire-equipment",action:"inspection_approval_status",requestId:e.id,status:a}}}).catch(r=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",r)}),Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u062E\u0635\u0648\u0635 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628: ${a}`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628:",t)}},async viewRequest(e){const s=this.getApprovalRequests().find(l=>l.id===e);if(!s){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const t=this.getAssets().find(l=>l.id===s.assetId||l.number===s.assetNumber),i=s.status==="approved"?'<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>':s.status==="rejected"?'<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>\u0645\u0631\u0641\u0648\u0636</span>':'<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',n=s.type==="inspection"?"\u0641\u062D\u0635 \u0634\u0647\u0631\u064A":s.type==="add"?"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0627\u0632":s.type==="edit"?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0627\u0632":s.type==="delete"?"\u062D\u0630\u0641 \u062C\u0647\u0627\u0632":"\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-file-alt ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(s.id||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(n)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(s.assetNumber||s.assetId||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062C\u0647\u0627\u0632:</label>
                                <p class="text-gray-800">${t?`${Utils.escapeHTML(t.number||t.id)} - ${Utils.escapeHTML(t.location||"")}`:"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(s.requestedBy||s.userName||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(s.userEmail||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628:</label>
                                <p class="text-gray-800">${s.requestedAt?Utils.formatDate(s.requestedAt):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <p class="text-gray-800">${i}</p>
                            </div>
                            ${s.status==="approved"?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647 \u0645\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(s.approvedBy||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</label>
                                <p class="text-gray-800">${s.approvedAt?Utils.formatDate(s.approvedAt):"-"}</p>
                            </div>
                            `:""}
                            ${s.status==="rejected"?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0645\u0631\u0641\u0648\u0636 \u0645\u0646:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(s.rejectedBy||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636:</label>
                                <p class="text-gray-800">${s.rejectedAt?Utils.formatDate(s.rejectedAt):"-"}</p>
                            </div>
                            `:""}
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0627\u0644\u0633\u0628\u0628:</label>
                            <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border">${Utils.escapeHTML(s.comments||s.reason||"-")}</p>
                        </div>
                        ${s.rejectionReason?`
                        <div>
                            <label class="text-sm font-semibold text-red-600">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</label>
                            <p class="text-red-800 bg-red-50 p-3 rounded-lg border border-red-200">${Utils.escapeHTML(s.rejectionReason)}</p>
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer" style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 0.75rem;">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o)},async editRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}const a=this.getApprovalRequests(),s=a.find(i=>i.id===e);if(!s){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const t=prompt("\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A:",s.comments||"");if(t!==null){Loading.show();try{s.comments=t,s.updatedAt=new Date().toISOString(),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=a,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(a)),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.switchTab("approval-requests")}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},async deleteRequest(e){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F")){Loading.show();try{const s=this.getApprovalRequests(),t=s.findIndex(i=>i.id===e);if(t===-1){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}s.splice(t,1),AppState.appData||(AppState.appData={}),AppState.appData.fireEquipmentApprovalRequests=s,typeof DataManager<"u"&&DataManager.save?DataManager.save():localStorage.setItem("fire_equipment_approval_requests",JSON.stringify(s)),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&await GoogleIntegration.sendRequest({action:"deleteFireEquipmentApprovalRequest",data:{requestId:e}}).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 Google Sheets:",i)}),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),await this.switchTab("approval-requests")}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628")}finally{Loading.hide()}}},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,a)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${a+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},refreshSiteDropdowns(){try{var e=this.getSiteOptions(),a=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:function(o){return String(o??"")},s='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>'+(e||[]).map(function(o){return'<option value="'+a(o.id)+'">'+a(o.name)+"</option>"}).join("");["asset-factory","fire-assets-location"].forEach(function(o){var l=document.getElementById(o);if(l&&l.tagName==="SELECT"){var r=l.value;l.innerHTML=s,r&&(l.value=r)}});var t=document.getElementById("asset-sub-location");if(t&&t.tagName==="SELECT"){var i=(document.getElementById("asset-factory")||{}).value,n=this.getPlaceOptions(i);t.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>'+(n||[]).map(function(o){return'<option value="'+a(o.id)+'">'+a(o.name)+"</option>"}).join("")}}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F FireEquipment.refreshSiteDropdowns:",o)}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(t=>t.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const t=Permissions.formSettingsState.sites.find(i=>i.id===e);if(t&&Array.isArray(t.places))return t.places.map(i=>({id:i.id,name:i.name}))}if(Array.isArray(AppState.appData?.observationSites)){const t=AppState.appData.observationSites.find(i=>(i.id||i.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((n,o)=>({id:n.id||n.placeId||n.value||Utils.generateId("PLACE"),name:n.name||n.placeName||n.title||n.label||n.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const t=DailyObservations.DEFAULT_SITES.find(i=>(i.id||i.siteId)===e);if(t)return(Array.isArray(t.places)?t.places:Array.isArray(t.locations)?t.locations:Array.isArray(t.children)?t.children:Array.isArray(t.areas)?t.areas:[]).map((n,o)=>({id:n.id||n.placeId||n.value||Utils.generateId("PLACE"),name:n.name||n.placeName||n.title||n.label||n.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:",a),[]}}},(function(){"use strict";try{typeof window<"u"&&typeof FireEquipment<"u"&&(window.FireEquipment=FireEquipment,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 FireEquipment module loaded and available on window.FireEquipment"))}catch{if(typeof window<"u"&&typeof FireEquipment<"u")try{window.FireEquipment=FireEquipment}catch{}}})();
