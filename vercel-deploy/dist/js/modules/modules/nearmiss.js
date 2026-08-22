const NearMiss={TYPES:[{value:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",label:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",icon:"fa-arrow-down"},{value:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",label:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",icon:"fa-walking"},{value:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",label:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",icon:"fa-truck-pickup"},{value:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",label:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",icon:"fa-bolt"},{value:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",label:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",icon:"fa-flask"},{value:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",label:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",icon:"fa-fire"},{value:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 \u0639\u0627\u0645",icon:"fa-exclamation-triangle"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-user-times"},{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-ban"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D \u062A\u062D\u0633\u064A\u0646",icon:"fa-lightbulb"}],state:{activeTab:"register",filters:{search:"",type:"",department:"",startDate:"",endDate:"",period:"365"},currentAttachments:[],editingId:null},_charts:{},applyModuleI18n(e){const t=e||document,i=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;i&&(typeof i.applyI18n=="function"&&i.applyI18n(t),typeof i.applyLiteralTranslations=="function"&&i.applyLiteralTranslations(t))},ensureI18nObservers(e){},async load(){try{const e=document.getElementById("nearmiss-section");if(!e)return;this.ensureDataIntegrity(),this.renderMainLayout(e)}catch{}},ensureDataIntegrity(){let e=AppState.appData.nearmiss||AppState.appData.NearMiss||[];Array.isArray(e)||(e=[]),AppState.appData.nearmiss=e.map(t=>this.normalizeRecord(t))},normalizeRecord(e={}){const t=this.TYPES[0].value,i=e.id||(typeof Utils<"u"&&Utils.generateId?Utils.generateId("NEARMISS"):"NRM-"+Math.floor(Math.random()*1e5));let a;try{a=e.date?new Date(e.date).toISOString():new Date().toISOString()}catch{a=new Date().toISOString()}let o=[];if(Array.isArray(e.attachments))o=e.attachments.map(r=>this.normalizeAttachment(r)).filter(Boolean);else if(typeof e.attachments=="string"&&e.attachments.trim().startsWith("["))try{const r=JSON.parse(e.attachments);Array.isArray(r)&&(o=r.map(d=>this.normalizeAttachment(d)).filter(Boolean))}catch{}const s=e.correctiveProposed===!0||e.correctiveProposed==="\u0646\u0639\u0645"||!!(e.correctiveDescription||e.correctiveAction);return{id:i,isoCode:e.isoCode||e.id||i,type:e.type||t,severity:e.severity||"\u0645\u062A\u0648\u0633\u0637",date:a,observerName:e.observerName||e.reportedBy||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631 (\u0633\u0631\u064A)",phone:e.phone||"",location:e.location||e.place||"",department:e.department||e.departmentName||"",description:e.description||e.details||"",correctiveProposed:s,correctiveDescription:e.correctiveDescription||e.correctiveProposed||e.correctiveAction||"",attachments:o,status:e.status||(s?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),createdAt:e.createdAt||a,updatedAt:e.updatedAt||a}},normalizeAttachment(e){return e?typeof e=="string"?{id:"att-"+Math.random(),name:"\u0645\u0631\u0641\u0642",url:e,data:e,type:"image/jpeg"}:{id:e.id||"att-"+Math.random(),name:e.name||"\u0645\u0631\u0641\u0642",type:e.type||"image/jpeg",url:e.url||e.data||"",data:e.data||e.url||"",size:e.size||0}:null},renderMainLayout(e){e.innerHTML=`
            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 \u062A\u0631\u0648\u064A\u0633\u0629 \u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0648\u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0628\u0635\u0631\u064A\u0629 \u0644\u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); border-radius: 18px; padding: 22px 28px; color: #fff; margin-bottom: 22px; box-shadow: 0 10px 25px -5px rgba(49, 46, 129, 0.4); border: 1px solid rgba(255,255,255,0.12);">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center gap-4">
                        <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(255,255,255,0.18); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <i class="fas fa-shield-virus text-3xl text-amber-300"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h1 style="font-size: 1.45rem; font-weight: 800; margin: 0; color: #fff; letter-spacing: -0.5px;">\u0625\u062F\u0627\u0631\u0629 \u0648\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h1>
                                <span style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.6); color: #fef08a; font-size: 0.72rem; font-weight: 700; padding: 2px 10px; border-radius: 20px;">Near Miss Suite</span>
                            </div>
                            <p style="font-size: 0.85rem; margin: 4px 0 0 0; color: #c7d2fe;">\u0631\u0635\u062F \u0627\u0633\u062A\u0628\u0627\u0642\u064A \u0644\u0644\u0645\u062E\u0627\u0637\u0631 \u2022 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629 \u2022 \u062B\u0642\u0627\u0641\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A\u0629 | SafetyHub ICAPP</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 flex-wrap">
                        <button id="nearmiss-public-qr-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;">
                            <i class="fas fa-qrcode text-amber-300"></i>
                            <span>\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0648\u0631\u0645\u0648\u0632 QR \u{1F4F1}</span>
                        </button>
                        <button id="nearmiss-print-badges-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.45); color: #a7f3d0; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;">
                            <i class="fas fa-print"></i>
                            <span>\u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u{1F5A8}\uFE0F</span>
                        </button>
                        <button id="nearmiss-create-new-btn" class="btn-primary flex items-center gap-2" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #fff; font-size: 0.85rem; font-weight: 800; padding: 9px 18px; border-radius: 12px; border: none; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); cursor: pointer;">
                            <i class="fas fa-plus-circle"></i>
                            <span>\u062A\u0633\u062C\u064A\u0644 \u0628\u0644\u0627\u063A \u0648\u0634\u064A\u0643 \u2795</span>
                        </button>
                    </div>
                </div>

                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
                <div style="display: flex; gap: 8px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px;">
                    <button class="nrm-nav-tab ${this.state.activeTab==="register"?"active":""}" data-tab="register" style="padding: 8px 18px; border-radius: 10px; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all .2s; background: ${this.state.activeTab==="register"?"#fff":"rgba(255,255,255,0.12)"}; color: ${this.state.activeTab==="register"?"#1e1b4b":"#fff"};">
                        <i class="fas fa-clipboard-list ml-2"></i> \u0633\u062C\u0644 \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A
                    </button>
                    <button class="nrm-nav-tab ${this.state.activeTab==="analytics"?"active":""}" data-tab="analytics" style="padding: 8px 18px; border-radius: 10px; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all .2s; background: ${this.state.activeTab==="analytics"?"#fff":"rgba(255,255,255,0.12)"}; color: ${this.state.activeTab==="analytics"?"#1e1b4b":"#fff"};">
                        <i class="fas fa-chart-pie ml-2"></i> \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u{1F4CA}
                    </button>
                </div>
            </div>

            <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 -->
            <div id="nearmiss-kpi-strip"></div>

            <!-- \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0646\u0634\u0637 -->
            <div id="nearmiss-tab-content"></div>
        `,this.renderKpiStrip(),this.renderActiveTabContent(),this.bindEvents()},renderKpiStrip(){const e=document.getElementById("nearmiss-kpi-strip");if(!e)return;const t=AppState.appData.nearmiss||[],i=t.length,a=t.filter(p=>p.correctiveProposed).length,o=t.filter(p=>{const n=(p.severity||"").toLowerCase();return n.includes("\u0639\u0627\u0644\u064A")||n.includes("high")||n.includes("\u0643\u0627\u0631\u062B\u064A")||n.includes("critical")||n.includes("\u0648\u0634\u064A\u0643")}).length,s=new Date,r=t.filter(p=>{const n=new Date(p.date);return n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()}).length,d={};t.forEach(p=>{const n=(p.department||"").trim();n&&(d[n]=(d[n]||0)+1)});const c=Object.entries(d).sort((p,n)=>n[1]-p[1])[0],f=c?`${c[0]} (${c[1]})`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F";e.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #e0e7ff; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#1e1b4b; line-height:1.2;">${i}</div>
                        <div style="font-size:0.72rem; color:#4338ca; font-weight:600; margin-top:2px;">+${r} \u0628\u0644\u0627\u063A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u{1F4C5}</div>
                    </div>
                </div>

                <!-- \u0628\u0644\u0627\u063A\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #fee2e2; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color:#dc2626; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0628\u0644\u0627\u063A\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#b91c1c; line-height:1.2;">${o}</div>
                        <div style="font-size:0.72rem; color:#dc2626; font-weight:600; margin-top:2px;">\u0645\u062E\u0627\u0637\u0631 \u0648\u0634\u064A\u0643\u0629 \u0645\u062D\u062A\u0645\u0644\u0629 \u{1F6A8}</div>
                    </div>
                </div>

                <!-- \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #fef3c7; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color:#d97706; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629 (CAPA)</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#b45309; line-height:1.2;">${a}</div>
                        <div style="font-size:0.72rem; color:#d97706; font-weight:600; margin-top:2px;">\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u{1F504}</div>
                    </div>
                </div>

                <!-- \u0623\u0639\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0631\u0635\u062F\u0627\u064B -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #d1fae5; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color:#059669; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-building"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">\u0623\u0639\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0631\u0635\u062F\u0627\u064B</div>
                        <div style="font-size:1.05rem; font-weight:800; color:#065f46; line-height:1.2; margin-top:3px;">${Utils.escapeHTML(f)}</div>
                        <div style="font-size:0.72rem; color:#059669; font-weight:600; margin-top:2px;">\u062B\u0642\u0627\u0641\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0645\u0634\u062C\u0639\u0629 \u{1F3C6}</div>
                    </div>
                </div>
            </div>
        `},renderActiveTabContent(){const e=document.getElementById("nearmiss-tab-content");e&&(this.state.activeTab==="register"?this.renderRegisterTab(e):this.renderAnalyticsTab(e))},renderRegisterTab(e){e.innerHTML=`
            <div class="content-card mb-6" style="background:#fff; border-radius:16px; border:1px solid #e2e8f0; padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div class="flex items-center gap-2 font-bold text-gray-800 text-sm">
                        <i class="fas fa-sliders-h text-indigo-600"></i>
                        <span>\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629</span>
                    </div>
                    <button id="nearmiss-reset-filters" class="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer" style="background:none; border:none;">
                        <i class="fas fa-undo"></i> \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">\u0628\u062D\u062B \u062D\u0631</label>
                        <input type="text" id="nearmiss-filter-search" class="form-input w-full p-2 rounded-lg border text-xs" placeholder="\u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u0645\u0648\u0642\u0639\u060C \u0627\u0644\u0645\u0628\u0644\u0651\u063A..." value="${Utils.escapeHTML(this.state.filters.search)}">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</label>
                        <select id="nearmiss-filter-type" class="form-input w-full p-2 rounded-lg border text-xs">
                            ${this.renderTypeOptions(this.state.filters.type)}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                        <select id="nearmiss-filter-department" class="form-input w-full p-2 rounded-lg border text-xs">
                            ${this.renderDepartmentOptions(this.state.filters.department)}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="nearmiss-filter-start" class="form-input w-full p-2 rounded-lg border text-xs" value="${this.state.filters.startDate}">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="nearmiss-filter-end" class="form-input w-full p-2 rounded-lg border text-xs" value="${this.state.filters.endDate}">
                    </div>
                </div>
            </div>

            <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644 -->
            <div class="content-card" style="background:#fff; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden;">
                <div style="padding:16px 20px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                    <div class="flex items-center gap-2 font-bold text-gray-800 text-sm">
                        <i class="fas fa-table text-indigo-600"></i>
                        <span>\u0633\u062C\u0644 \u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</span>
                    </div>
                    <span id="nearmiss-result-count" class="text-xs text-indigo-700 bg-indigo-50 font-bold px-2.5 py-1 rounded-full"></span>
                </div>
                <div id="nearmiss-table-container" style="padding:0;"></div>
            </div>
        `,this.bindFilterEvents(),this.renderTable()},renderAnalyticsTab(e){const t=AppState.appData.nearmiss||[];e.innerHTML=`
            <div style="background:#fff; border-radius:16px; border:1px solid #e2e8f0; padding:20px; margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid #f1f5f9;">
                    <div class="flex items-center gap-3">
                        <div style="width:40px; height:40px; border-radius:10px; background:#e0e7ff; color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div>
                            <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e1b4b;">\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u064A \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h3>
                            <p style="margin:2px 0 0 0; font-size:0.75rem; color:#64748b;">\u062A\u062D\u0644\u064A\u0644 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 \u0648\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u062A\u0643\u0631\u0627\u0631 \u0628\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0623\u0642\u0633\u0627\u0645</p>
                        </div>
                    </div>
                    <button onclick="window.print()" class="btn-secondary flex items-center gap-2" style="font-size:0.8rem; font-weight:700; padding:7px 14px; border-radius:8px;">
                        <i class="fas fa-file-pdf text-red-500"></i>
                        <span>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF</span>
                    </button>
                </div>

                <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0648\u0627\u062F\u062B -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-pie-chart text-indigo-600"></i>
                            <span>\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0627\u062F\u062B</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-types"></canvas>
                        </div>
                    </div>

                    <!-- \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-exclamation-triangle text-amber-600"></i>
                            <span>\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-severity"></canvas>
                        </div>
                    </div>
                </div>

                <!-- \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629: \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u062A\u0633\u062C\u064A\u0644\u0627\u064B -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-map-marker-alt text-red-600"></i>
                            <span>\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u062A\u0633\u062C\u064A\u0644\u0627\u064B \u0644\u0644\u0628\u0644\u0627\u063A\u0627\u062A</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-locations"></canvas>
                        </div>
                    </div>

                    <!-- \u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u062A\u0633\u062C\u064A\u0644\u0627\u064B -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-building text-emerald-600"></i>
                            <span>\u0623\u0643\u062B\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0631\u0635\u062F\u0627\u064B \u0648\u062A\u0641\u0627\u0639\u0644\u0627\u064B</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-departments"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `,setTimeout(()=>this.drawAnalyticsCharts(t),100)},drawAnalyticsCharts(e){if(typeof Chart>"u")return;["types","severity","locations","departments"].forEach(n=>{if(this._charts[n])try{this._charts[n].destroy()}catch{}});const t={};e.forEach(n=>{const l=n.type||"\u0623\u062E\u0631\u0649";t[l]=(t[l]||0)+1});const i=document.getElementById("nrm-chart-types");i&&(this._charts.types=new Chart(i,{type:"doughnut",data:{labels:Object.keys(t),datasets:[{data:Object.values(t),backgroundColor:["#4f46e5","#f59e0b","#10b981","#ef4444","#06b6d4","#8b5cf6","#ec4899"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}));const a={\u0645\u0646\u062E\u0641\u0636:0,\u0645\u062A\u0648\u0633\u0637:0,\u0639\u0627\u0644\u064A:0,"\u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643":0};e.forEach(n=>{const l=n.severity||"\u0645\u062A\u0648\u0633\u0637";l.includes("\u0645\u0646\u062E\u0641\u0636")?a.\u0645\u0646\u062E\u0641\u0636++:l.includes("\u0639\u0627\u0644\u064A")||l.includes("high")?a.\u0639\u0627\u0644\u064A++:l.includes("\u0643\u0627\u0631\u062B\u064A")||l.includes("\u0648\u0634\u064A\u0643")?a["\u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643"]++:a.\u0645\u062A\u0648\u0633\u0637++});const o=document.getElementById("nrm-chart-severity");o&&(this._charts.severity=new Chart(o,{type:"pie",data:{labels:Object.keys(a),datasets:[{data:Object.values(a),backgroundColor:["#10b981","#f59e0b","#ef4444","#991b1b"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}));const s={};e.forEach(n=>{const l=(n.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").split("\u2014")[0].trim();s[l]=(s[l]||0)+1});const r=Object.entries(s).sort((n,l)=>l[1]-n[1]).slice(0,6),d=document.getElementById("nrm-chart-locations");d&&(this._charts.locations=new Chart(d,{type:"bar",data:{labels:r.map(n=>n[0]),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A",data:r.map(n=>n[1]),backgroundColor:"#6366f1",borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}));const c={};e.forEach(n=>{const l=(n.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();c[l]=(c[l]||0)+1});const f=Object.entries(c).sort((n,l)=>l[1]-n[1]).slice(0,6),p=document.getElementById("nrm-chart-departments");p&&(this._charts.departments=new Chart(p,{type:"bar",data:{labels:f.map(n=>n[0]),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A",data:f.map(n=>n[1]),backgroundColor:"#10b981",borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}))},bindEvents(){document.querySelectorAll(".nrm-nav-tab").forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-tab");o&&(this.state.activeTab=o,document.querySelectorAll(".nrm-nav-tab").forEach(s=>{const r=s.getAttribute("data-tab")===o;s.style.background=r?"#fff":"rgba(255,255,255,0.12)",s.style.color=r?"#1e1b4b":"#fff"}),this.renderActiveTabContent())})});const e=document.getElementById("nearmiss-public-qr-btn");e&&e.addEventListener("click",()=>this.openPublicQrModal());const t=document.getElementById("nearmiss-print-badges-btn");t&&t.addEventListener("click",()=>this.printLocationQrBadges());const i=document.getElementById("nearmiss-create-new-btn");i&&i.addEventListener("click",()=>this.showForm())},bindFilterEvents(){const e=document.getElementById("nearmiss-filter-search");e&&e.addEventListener("input",r=>this.handleFilterChange("search",r.target.value));const t=document.getElementById("nearmiss-filter-type");t&&t.addEventListener("change",r=>this.handleFilterChange("type",r.target.value));const i=document.getElementById("nearmiss-filter-department");i&&i.addEventListener("change",r=>this.handleFilterChange("department",r.target.value));const a=document.getElementById("nearmiss-filter-start");a&&a.addEventListener("change",r=>this.handleFilterChange("startDate",r.target.value));const o=document.getElementById("nearmiss-filter-end");o&&o.addEventListener("change",r=>this.handleFilterChange("endDate",r.target.value));const s=document.getElementById("nearmiss-reset-filters");s&&s.addEventListener("click",()=>this.resetFilters())},handleFilterChange(e,t){this.state.filters[e]=t,this.renderTable()},resetFilters(){this.state.filters={search:"",type:"",department:"",startDate:"",endDate:"",period:"365"},this.renderRegisterTab(document.getElementById("nearmiss-tab-content"))},getFilteredItems(){const{search:e,type:t,department:i,startDate:a,endDate:o}=this.state.filters;let s=(AppState.appData.nearmiss||[]).filter(r=>!!r);if(t&&(s=s.filter(r=>(r.type||"").toLowerCase()===t.toLowerCase())),i&&(s=s.filter(r=>(r.department||"").toLowerCase()===i.toLowerCase())),a){const r=new Date(a);r.setHours(0,0,0,0),s=s.filter(d=>new Date(d.date)>=r)}if(o){const r=new Date(o);r.setHours(23,59,59,999),s=s.filter(d=>new Date(d.date)<=r)}if(e){const r=e.toLowerCase();s=s.filter(d=>[d.type,d.location,d.department,d.observerName,d.phone,d.description,d.correctiveDescription,d.isoCode].some(c=>c&&String(c).toLowerCase().includes(r)))}return s.sort((r,d)=>new Date(d.date)-new Date(r.date))},renderTable(){const e=document.getElementById("nearmiss-table-container");if(!e)return;const t=this.getFilteredItems(),i=document.getElementById("nearmiss-result-count");if(i&&(i.textContent=t.length?`${t.length} \u0628\u0644\u0627\u063A`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C"),!t.length){e.innerHTML=`
                <div class="empty-state text-center py-12">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500 font-bold">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0644\u0627\u063A\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629</p>
                </div>
            `;return}e.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                    <thead>
                        <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #475569; text-align: right;">
                            <th style="padding: 12px 14px;">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639\u064A</th>
                            <th style="padding: 12px 14px;">\u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u0645\u0628\u0644\u0651\u063A</th>
                            <th style="padding: 12px 14px;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0648\u0642\u0627\u0626\u064A</th>
                            <th style="padding: 12px 14px; text-align: center;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>`
                            <tr style="border-bottom: 1px solid #f1f5f9; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'">
                                <td style="padding: 12px 14px; font-weight: 800; color: #312e81;">
                                    ${Utils.escapeHTML(a.isoCode||a.id)}
                                </td>
                                <td style="padding: 12px 14px;">
                                    <span style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 0.75rem;">
                                        ${Utils.escapeHTML(a.type||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643")}
                                    </span>
                                </td>
                                <td style="padding: 12px 14px;">
                                    ${this.formatSeverityBadge(a.severity)}
                                </td>
                                <td style="padding: 12px 14px; color: #64748b;">
                                    ${a.date?Utils.formatDateTime(a.date):"-"}
                                </td>
                                <td style="padding: 12px 14px; font-weight: 600; color: #1e1b4b;">
                                    ${Utils.escapeHTML(a.location||"-")}
                                </td>
                                <td style="padding: 12px 14px; color: #334155;">
                                    ${Utils.escapeHTML(a.department||"-")}
                                </td>
                                <td style="padding: 12px 14px;">
                                    <div style="font-weight: 600; color: #0f172a;">${Utils.escapeHTML(a.observerName||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631")}</div>
                                    ${a.phone?`<div style="font-size: 0.7rem; color: #94a3b8;">${Utils.escapeHTML(a.phone)}</div>`:""}
                                </td>
                                <td style="padding: 12px 14px;">
                                    ${a.correctiveProposed?'<span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">\u0645\u062A\u0627\u062D \u2705</span>':'<span style="color:#94a3b8; font-size:0.72rem;">\u2014</span>'}
                                </td>
                                <td style="padding: 12px 14px; text-align: center;">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button class="btn-icon text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg" data-action="view-nearmiss" data-id="${a.id}" title="\u0639\u0631\u0636">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg" data-action="edit-nearmiss" data-id="${a.id}" title="\u062A\u0639\u062F\u064A\u0644">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon text-red-600 hover:bg-red-50 p-1.5 rounded-lg" data-action="delete-nearmiss" data-id="${a.id}" title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `,this.bindTableActions()},formatSeverityBadge(e=""){const t=String(e||"").toLowerCase();return t.includes("\u0645\u0646\u062E\u0641\u0636")?'<span style="background:#dcfce7; color:#166534; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">\u{1F7E2} \u0645\u0646\u062E\u0641\u0636</span>':t.includes("\u0639\u0627\u0644\u064A")||t.includes("high")?'<span style="background:#fee2e2; color:#991b1b; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">\u{1F534} \u0639\u0627\u0644\u064A</span>':t.includes("\u0643\u0627\u0631\u062B\u064A")||t.includes("\u0648\u0634\u064A\u0643")||t.includes("critical")?'<span style="background:#450a0a; color:#fecaca; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">\u{1F6A8} \u0648\u0634\u064A\u0643 / \u0643\u0627\u0631\u062B\u064A</span>':'<span style="background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">\u{1F7E1} \u0645\u062A\u0648\u0633\u0637</span>'},bindTableActions(){document.querySelectorAll('[data-action="view-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.viewNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="edit-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.editNearMiss(e.getAttribute("data-id")))}),document.querySelectorAll('[data-action="delete-nearmiss"]').forEach(e=>{e.addEventListener("click",()=>this.deleteNearMiss(e.getAttribute("data-id")))})},getDepartmentOptions(){const e=new Set;return(AppState.appData.nearmiss||[]).forEach(t=>{const i=(t.department||"").trim();i&&e.add(i)}),(AppState.appData.departments||[]).forEach(t=>{const i=typeof t=="string"?t:t.name||t.departmentName||"";i&&e.add(i)}),e.size===0&&["\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629","\u0627\u0644\u0625\u0646\u062A\u0627\u062C","\u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629","\u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629","\u0627\u0644\u062C\u0648\u062F\u0629","\u0627\u0644\u0645\u062E\u0627\u0632\u0646","\u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629"].forEach(t=>e.add(t)),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar"))},renderTypeOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>'];return this.TYPES.forEach(i=>{t.push(`<option value="${Utils.escapeHTML(i.value)}" ${i.value===e?"selected":""}>${Utils.escapeHTML(i.label)}</option>`)}),t.join("")},renderDepartmentOptions(e=""){const t=['<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>'];return this.getDepartmentOptions().forEach(i=>{t.push(`<option value="${Utils.escapeHTML(i)}" ${i===e?"selected":""}>${Utils.escapeHTML(i)}</option>`)}),t.join("")},viewNearMiss(e){const t=(AppState.appData.nearmiss||[]).find(a=>a.id===e);if(!t){alert("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0644\u0627\u063A");return}const i=document.createElement("div");i.className="modal-overlay",i.style.cssText="position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:16px; backdrop-filter:blur(4px);",i.innerHTML=`
            <div class="modal-content" style="max-width: 740px; width:100%; background:#fff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: 'Segoe UI', Tahoma, sans-serif; max-height:90vh; display:flex; flex-direction:column; direction:rtl;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;">
                    <div class="flex items-center gap-3">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                            <i class="fas fa-file-contract text-amber-300"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #fff;">\u062A\u0642\u0631\u064A\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643</h3>
                                <span style="background: #f59e0b; color: #000; font-weight: 800; font-size: 0.7rem; padding: 2px 8px; border-radius: 12px;">${Utils.escapeHTML(t.isoCode||t.id||"")}</span>
                            </div>
                            <div style="font-size: 0.75rem; color: #c7d2fe; margin-top: 2px;">SafetyHub | ICAPP \u2014 Incident Prevention Record</div>
                        </div>
                    </div>
                    <button class="modal-close text-white/80 hover:text-white text-2xl" onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal-body space-y-4 p-6" style="background: #f8fafc; overflow-y:auto; flex:1;">
                    <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                    <div style="background: #fff; padding: 16px; border-radius: 14px; border: 1px solid #e2e8f0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u0646\u0648\u0639 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0627\u062F\u062B:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-tag text-indigo-500 ml-1"></i> ${Utils.escapeHTML(t.type||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643")}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629:</span>
                            <div style="margin-top: 2px;">
                                ${this.formatSeverityBadge(t.severity)}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-map-marker-alt text-red-500 ml-1"></i> ${Utils.escapeHTML(t.location||"-")}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-building text-blue-500 ml-1"></i> ${Utils.escapeHTML(t.department||"-")}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u062A\u0627\u0631\u064A\u062E \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0631\u0635\u062F:</span>
                            <div style="font-weight: 600; color: #334155; font-size: 0.85rem; margin-top: 2px;">
                                <i class="far fa-calendar-alt text-amber-500 ml-1"></i> ${t.date?Utils.formatDateTime(t.date):"-"}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">\u0635\u0627\u062D\u0628 \u0627\u0644\u0628\u0644\u0627\u063A:</span>
                            <div style="font-weight: 600; color: #334155; font-size: 0.85rem; margin-top: 2px;">
                                <i class="fas fa-user-shield text-emerald-500 ml-1"></i> ${Utils.escapeHTML(t.observerName||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631 (\u0633\u0631\u064A)")}
                                ${t.phone?`<span style="font-size: 0.75rem; color: #64748b;"> (${Utils.escapeHTML(t.phone)})</span>`:""}
                            </div>
                        </div>
                    </div>

                    <!-- \u0643\u0631\u062A \u0648\u0635\u0641 \u0627\u0644\u0648\u0627\u0642\u0639\u0629 \u0648\u0645\u0627 \u0643\u0627\u062F \u0623\u0646 \u064A\u062D\u062F\u062B -->
                    <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 14px; padding: 16px;">
                        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#92400e; font-size:0.88rem; margin-bottom:8px;">
                            <i class="fas fa-exclamation-circle text-amber-600"></i>
                            <span>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0648\u0627\u0642\u0639\u0629 \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0648\u0645\u0627 \u0643\u0627\u062F \u0623\u0646 \u064A\u062D\u062F\u062B:</span>
                        </div>
                        <div style="font-size:0.85rem; color:#78350f; line-height:1.6; white-space:pre-line;">
                            ${Utils.escapeHTML(t.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629")}
                        </div>
                    </div>

                    <!-- \u0643\u0631\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0627\u0644\u0645\u062A\u062E\u0630 -->
                    <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 16px;">
                        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#166534; font-size:0.88rem; margin-bottom:8px;">
                            <i class="fas fa-shield-alt text-emerald-600"></i>
                            <span>\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A \u0648\u0627\u0644\u0648\u0642\u0627\u0626\u064A \u0627\u0644\u0641\u0648\u0631\u064A \u0627\u0644\u0645\u062A\u062E\u0630:</span>
                        </div>
                        <div style="font-size:0.85rem; color:#14532d; line-height:1.6; white-space:pre-line;">
                            ${Utils.escapeHTML(t.correctiveDescription||t.correctiveProposed||"\u062A\u0645 \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u062A\u0635\u0629")}
                        </div>
                    </div>

                    <!-- \u0642\u0633\u0645 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0648\u0627\u0644\u0635\u0648\u0631 -->
                    ${t.attachments&&t.attachments.length?`
                    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                        <div style="font-weight:700; color:#334155; font-size:0.85rem; margin-bottom:10px;">
                            <i class="fas fa-camera text-indigo-600 ml-1"></i> \u0627\u0644\u0635\u0648\u0631 \u0648\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629:
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${t.attachments.map(a=>`
                                    <div style="border-radius:10px; overflow:hidden; border:1px solid #cbd5e1; cursor:pointer;" onclick="window.open('${a.data||a.url}', '_blank')">
                                        <img src="${a.data||a.url}" style="width:100%; height:160px; object-fit:cover;" />
                                        <div style="padding:6px 10px; background:#f8fafc; font-size:0.75rem; color:#475569;">${Utils.escapeHTML(a.name||"\u0635\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643")}</div>
                                    </div>
                                `).join("")}
                        </div>
                    </div>
                    `:""}
                </div>
                <div class="modal-footer" style="padding: 14px 24px; background: #fff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fas fa-check-circle text-emerald-500 ml-1"></i> \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0641\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629</span>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 7px 20px; border-radius: 10px; font-weight:700; cursor:pointer;">\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629</button>
                </div>
            </div>
        `,document.body.appendChild(i)},showForm(e=null){const t=e?this.normalizeRecord(e):null;this.state.editingId=t?.id||null,this.state.currentAttachments=t?.attachments||[];const i=this.buildFormModal(t);document.body.appendChild(i),this.bindFormEvents(i,t)},buildFormModal(e){const t=e?.correctiveProposed===!0,i=this.getDepartmentOptions(),a=e?.severity||"\u0645\u062A\u0648\u0633\u0637",o=document.createElement("div");return o.className="modal-overlay",o.style.cssText="position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:16px; backdrop-filter:blur(4px);",o.innerHTML=`
            <div class="modal-content" style="max-width: 780px; width:100%; background:#fff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: 'Segoe UI', Tahoma, sans-serif; max-height:90vh; display:flex; flex-direction:column; direction:rtl;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;">
                    <div class="flex items-center gap-3">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                            <i class="fas fa-${e?"edit":"plus-circle"} text-amber-300"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.2rem; font-weight: 800; margin: 0; color: #fff;">
                                ${e?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643":"\u062A\u0633\u062C\u064A\u0644 \u0628\u0644\u0627\u063A \u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 \u062C\u062F\u064A\u062F"}
                            </h2>
                            <p style="font-size: 0.75rem; color: #c7d2fe; margin: 2px 0 0 0;">SafetyHub | ICAPP \u2014 Incident Prevention Entry</p>
                        </div>
                    </div>
                    <button class="modal-close text-white/80 hover:text-white text-2xl" onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body p-6" style="background: #f8fafc; overflow-y: auto; flex:1;">
                    <form id="nearmiss-form" class="space-y-5">
                        <!-- Section 1: \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0648\u0627\u0644\u062E\u0637\u0648\u0631\u0629 -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 0.85rem; font-weight: 800; color: #1e1b4b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-tags text-indigo-600"></i>
                                <span>1. \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0627\u062F\u062B \u0648\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">\u0646\u0648\u0639 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0627\u062F\u062B *</label>
                                    <select id="nearmiss-type" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required>
                                        ${this.renderTypeOptions(e?.type||"")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629 *</label>
                                    <select id="nearmiss-severity" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required>
                                        <option value="\u0645\u0646\u062E\u0641\u0636" ${a==="\u0645\u0646\u062E\u0641\u0636"?"selected":""}>\u{1F7E2} \u0645\u0646\u062E\u0641\u0636 (Low Potential)</option>
                                        <option value="\u0645\u062A\u0648\u0633\u0637" ${a==="\u0645\u062A\u0648\u0633\u0637"?"selected":""}>\u{1F7E1} \u0645\u062A\u0648\u0633\u0637 (Medium Potential)</option>
                                        <option value="\u0639\u0627\u0644\u064A" ${a==="\u0639\u0627\u0644\u064A"?"selected":""}>\u{1F534} \u0639\u0627\u0644\u064A (High Potential)</option>
                                        <option value="\u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643" ${a.includes("\u0648\u0634\u064A\u0643")||a.includes("\u0643\u0627\u0631\u062B\u064A")?"selected":""}>\u{1F6A8} \u0648\u0634\u064A\u0643 / \u0643\u0627\u0631\u062B\u064A (Critical Potential)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0631\u0627\u0635\u062F -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 0.85rem; font-weight: 800; color: #1e1b4b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-map-marked-alt text-blue-600"></i>
                                <span>2. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0633\u0624\u0648\u0644</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="nearmiss-location" class="block text-xs font-bold text-gray-700 mb-1.5">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639 \u0648\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A *</label>
                                    <input type="text" id="nearmiss-location" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${Utils.escapeHTML(e?.location||"")}" placeholder="\u0645\u062B\u0627\u0644: ICAPP-1 \u2014 \u0639\u0646\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0627\u062C">
                                </div>
                                <div>
                                    <label for="nearmiss-department" class="block text-xs font-bold text-gray-700 mb-1.5">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629 *</label>
                                    <input type="text" id="nearmiss-department" class="form-input w-full p-2.5 rounded-lg border border-gray-300" list="nearmiss-departments-list" required value="${Utils.escapeHTML(e?.department||"")}" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629">
                                    <datalist id="nearmiss-departments-list">
                                        ${i.map(s=>`<option value="${Utils.escapeHTML(s)}"></option>`).join("")}
                                    </datalist>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">\u062A\u0627\u0631\u064A\u062E \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0648\u0627\u0642\u0639\u0629 *</label>
                                    <input type="datetime-local" id="nearmiss-date" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${e?.date?Utils.toDateTimeLocalString(e.date):Utils.toDateTimeLocalString(new Date)}">
                                </div>
                                <div>
                                    <label for="nearmiss-observer" class="block text-xs font-bold text-gray-700 mb-1.5">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0628\u0644\u0627\u063A / \u0627\u0644\u0645\u0641\u062A\u0634 *</label>
                                    <input type="text" id="nearmiss-observer" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${Utils.escapeHTML(e?.observerName||"")}" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0641\u0627\u0639\u0644 \u062E\u064A\u0631">
                                </div>
                            </div>
                        </div>

                        <!-- Section 3: \u0648\u0635\u0641 \u0627\u0644\u0648\u0627\u0642\u0639\u0629 \u0648\u0645\u0627 \u0643\u0627\u062F \u0623\u0646 \u064A\u062D\u062F\u062B -->
                        <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 14px; padding: 18px;">
                            <label for="nearmiss-description" class="block text-xs font-extrabold text-amber-900 mb-1.5 flex items-center gap-2">
                                <i class="fas fa-exclamation-circle text-amber-600"></i>
                                <span>3. \u0648\u0635\u0641 \u0627\u0644\u0648\u0627\u0642\u0639\u0629 \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644 (\u0645\u0627 \u0643\u0627\u062F \u0623\u0646 \u064A\u062D\u062F\u062B) *</span>
                            </label>
                            <textarea id="nearmiss-description" class="form-input w-full p-3 rounded-lg border border-amber-300 bg-white" rows="3" required placeholder="\u0635\u0641 \u0627\u0644\u0648\u0627\u0642\u0639\u0629 \u0628\u062F\u0642\u0629: \u0645\u0627\u0630\u0627 \u062D\u062F\u062B\u061F \u0648\u0645\u0627 \u0647\u064A \u0627\u0644\u062E\u0633\u0627\u0626\u0631 \u0623\u0648 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u0643\u0627\u062F\u062A \u0623\u0646 \u062A\u0642\u0639 \u0644\u0648\u0644\u0627 \u062A\u062F\u0627\u0631\u0643 \u0627\u0644\u0645\u0648\u0642\u0641\u061F">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>

                        <!-- Section 4: \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A -->
                        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 18px;">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-extrabold text-emerald-900 flex items-center gap-2">
                                    <i class="fas fa-shield-alt text-emerald-600"></i>
                                    <span>4. \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A / \u0627\u0644\u0648\u0642\u0627\u0626\u064A \u0627\u0644\u0645\u062A\u062E\u0630</span>
                                </label>
                                <label class="flex items-center gap-2 text-xs font-bold text-emerald-800 cursor-pointer">
                                    <input type="checkbox" id="nearmiss-corrective-check" onchange="document.getElementById('nearmiss-corrective-wrapper').style.display = this.checked ? 'block' : 'none'" ${t?"checked":""}>
                                    <span>\u062A\u0645 \u0627\u062A\u062E\u0627\u0630 / \u0627\u0642\u062A\u0631\u0627\u062D \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A</span>
                                </label>
                            </div>
                            <div id="nearmiss-corrective-wrapper" style="${t?"display:block;":"display:none;"} margin-top:8px;">
                                <textarea id="nearmiss-corrective-description" class="form-input w-full p-3 rounded-lg border border-emerald-300 bg-white" rows="2" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630 \u0641\u0648\u0631\u064A\u0627\u064B \u0644\u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0648\u0627\u0642\u0639\u0629...">${Utils.escapeHTML(e?.correctiveDescription||"")}</textarea>
                            </div>
                        </div>

                        <!-- Section 5: \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <label class="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                                <i class="fas fa-camera text-indigo-600"></i>
                                <span>5. \u0625\u0631\u0641\u0627\u0642 \u0635\u0648\u0631 \u0623\u0648 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u062A\u0648\u0636\u064A\u062D\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</span>
                            </label>
                            <input type="file" id="nearmiss-attachments" class="form-input w-full p-2 rounded-lg border border-gray-300" accept="image/*,.pdf" multiple>
                            <div id="nearmiss-attachments-preview" class="mt-3 space-y-2"></div>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn-secondary px-5 py-2.5 rounded-xl cursor-pointer">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff;">
                                <i class="fas fa-save text-amber-300"></i>
                                <span>${e?"\u062A\u062D\u062F\u064A\u062B \u0648\u062D\u0641\u0638 \u0627\u0644\u0628\u0644\u0627\u063A":"\u062D\u0641\u0638 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0628\u0644\u0627\u063A"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,o},bindFormEvents(e,t){const i=e.querySelector("#nearmiss-form");i&&i.addEventListener("submit",async o=>{o.preventDefault(),await this.handleSubmit(i,t),e.remove()});const a=e.querySelector("#nearmiss-attachments");a&&a.addEventListener("change",async o=>{const s=o.target.files;if(!(!s||!s.length))for(let r=0;r<s.length;r++){const d=s[r],c=new FileReader;c.onload=f=>{this.state.currentAttachments.push({id:"att-"+Date.now()+"-"+r,name:d.name,type:d.type,data:f.target.result,url:f.target.result}),this.renderAttachmentsPreview(e)},c.readAsDataURL(d)}})},renderAttachmentsPreview(e){const t=e.querySelector("#nearmiss-attachments-preview");if(t){if(!this.state.currentAttachments.length){t.innerHTML="";return}t.innerHTML=this.state.currentAttachments.map((i,a)=>`
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0; font-size:0.8rem;">
                <span class="truncate">${Utils.escapeHTML(i.name)}</span>
                <button type="button" onclick="NearMiss.state.currentAttachments.splice(${a},1); NearMiss.renderAttachmentsPreview(this.closest('.modal-overlay'))" class="text-red-500 hover:text-red-700" style="background:none; border:none; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join("")}},async handleSubmit(e,t){const i=document.getElementById("nearmiss-type")?.value||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",a=document.getElementById("nearmiss-severity")?.value||"\u0645\u062A\u0648\u0633\u0637",o=document.getElementById("nearmiss-location")?.value||"",s=document.getElementById("nearmiss-department")?.value||"",r=document.getElementById("nearmiss-date")?.value||new Date().toISOString(),d=document.getElementById("nearmiss-observer")?.value||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631",c=document.getElementById("nearmiss-description")?.value||"",f=document.getElementById("nearmiss-corrective-check")?.checked||!1,p=document.getElementById("nearmiss-corrective-description")?.value||"",n=t?.id||"NRM-"+Date.now(),l=t?.isoCode||"NM-"+new Date().getFullYear()+"-"+Math.floor(1e3+Math.random()*9e3),m={id:n,isoCode:l,type:i,severity:a,location:o,department:s,date:new Date(r).toISOString(),observerName:d,description:c,correctiveProposed:f,correctiveDescription:f?p:"",attachments:this.state.currentAttachments,status:f?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642",updatedAt:new Date().toISOString()};if(t){const b=AppState.appData.nearmiss.findIndex(g=>g.id===t.id);b!==-1&&(AppState.appData.nearmiss[b]=m)}else m.createdAt=new Date().toISOString(),AppState.appData.nearmiss.unshift(m);try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.callApi){const b=t?"updateNearMiss":"addNearMiss";GoogleIntegration.callApi(b,m)}}catch{}this.renderKpiStrip(),this.renderTable(),alert("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u0644\u0627\u063A \u0628\u0646\u062C\u0627\u062D!")},editNearMiss(e){const t=(AppState.appData.nearmiss||[]).find(i=>i.id===e);t&&this.showForm(t)},deleteNearMiss(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0644\u0627\u063A\u061F")){AppState.appData.nearmiss=(AppState.appData.nearmiss||[]).filter(t=>t.id!==e);try{typeof GoogleIntegration<"u"&&GoogleIntegration.callApi&&GoogleIntegration.callApi("deleteNearMiss",{nearMissId:e})}catch{}this.renderKpiStrip(),this.renderTable()}},openPublicQrModal(){const e=window.location.origin+window.location.pathname.replace(/[^/]*$/,"")+"public-near-miss.html";let t=document.getElementById("nrm-public-qr-modal");t||(t=document.createElement("div"),t.id="nrm-public-qr-modal",t.className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",document.body.appendChild(t));const i="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="+encodeURIComponent(e);t.innerHTML=`
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200" style="direction:rtl; font-family:'Segoe UI', Tahoma, sans-serif;">
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color:#fff; padding:20px 24px; display:flex; justify-content:space-between; align-items:center;">
                    <div class="flex items-center gap-3">
                        <div style="width:44px; height:44px; border-radius:12px; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-qrcode text-xl text-amber-300"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg leading-tight" style="margin:0;">\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h3>
                            <p class="text-xs text-indigo-200" style="margin:2px 0 0 0;">SafetyHub | ICAPP Near Miss Public Suite</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('nrm-public-qr-modal').remove()" class="text-white/80 hover:text-white text-2xl" style="background:none; border:none; cursor:pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="p-6 text-center">
                    <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:12px; padding:12px 16px; margin-bottom:20px; text-align:right; font-size:0.8rem; color:#312e81; display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-info-circle text-indigo-600 text-lg"></i>
                        <div>\u064A\u0645\u0643\u0646 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062D \u0647\u0630\u0627 \u0627\u0644\u0631\u0645\u0632 \u0644\u0644\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0633\u0631\u064A\u0639 \u0639\u0646 \u0623\u064A \u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.</div>
                    </div>
                    <div class="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-indigo-100 mb-4">
                        <img src="${i}" alt="QR Code" style="width:210px; height:210px; border-radius:10px;" class="mx-auto" />
                    </div>
                    <div style="font-size:0.75rem; color:#64748b; font-family:monospace; background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #e2e8f0; margin-bottom:20px; word-break:break-all; direction:ltr; text-align:center;">
                        ${e}
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="window.open('${e}', '_blank')" class="btn-secondary py-2.5 flex items-center justify-center gap-2" style="border-radius:10px; font-weight:600; cursor:pointer;">
                            <i class="fas fa-external-link-alt"></i>
                            <span>\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0622\u0646</span>
                        </button>
                        <button onclick="NearMiss.printLocationQrBadges()" class="btn-primary py-2.5 flex items-center justify-center gap-2" style="background:#312e81; color:#fff; border-radius:10px; font-weight:700; cursor:pointer;">
                            <i class="fas fa-print"></i>
                            <span>\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u{1F5A8}\uFE0F</span>
                        </button>
                    </div>
                </div>
            </div>
        `,t.style.display="flex"},printLocationQrBadges(){const e=window.location.origin+window.location.pathname.replace(/[^/]*$/,"")+"public-near-miss.html";let t=[];try{typeof DailyObservations<"u"&&DailyObservations.getAllSites?t=DailyObservations.getAllSites():Array.isArray(AppState.appData.observationSites)&&(t=AppState.appData.observationSites)}catch{}(!t||t.length===0)&&(t=["ICAPP-1","ICAPP-2","ICAPP-3","ICAPP-4","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"]);const i=[];t.forEach(s=>{const r=typeof s=="string"?s:s.name||s.siteName||"";(s&&Array.isArray(s.places)&&s.places.length>0?s.places:["\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"]).forEach(c=>{const f=typeof c=="string"?c:c.name||c.placeName||"";i.push({site:r,place:f})})});const a=window.open("","_blank");if(!a){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const o=i.map((s,r)=>`
                <div style="border: 2px solid #312e81; border-radius: 12px; padding: 12px; background: #fff; text-align: right; break-inside: avoid; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.06);">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e0e7ff; padding-bottom:6px; margin-bottom:8px;">
                        <span style="font-size:0.75rem; font-weight:bold; color:#3730a3;"><i class="fas fa-shield-alt"></i> SafetyHub | ICAPP</span>
                        <span style="font-size:0.65rem; background:#e0e7ff; color:#3730a3; padding:1px 6px; border-radius:4px; font-weight:bold;">\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data="+encodeURIComponent(`${e}?factory=${encodeURIComponent(s.site)}&place=${encodeURIComponent(s.place)}`)}" style="width:90px; height:90px; border-radius:6px; border:1px solid #e2e8f0;" />
                        <div style="flex:1;">
                            <div style="font-size:0.95rem; font-weight:800; color:#1e1b4b;">${s.site}</div>
                            <div style="font-size:0.8rem; color:#4338ca; font-weight:600; margin-top:2px;">${s.place}</div>
                            <div style="font-size:0.68rem; color:#64748b; margin-top:6px;"><i class="fas fa-camera"></i> \u0627\u0645\u0633\u062D \u0644\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643</div>
                        </div>
                    </div>
                </div>
            `).join("");a.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0645\u0644\u0635\u0642\u0627\u062A QR \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 - SafetyHub ICAPP</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 8mm; }
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #fff; }
                    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
                </style>
            </head>
            <body>
                <div style="text-align:center; margin-bottom:12px; border-bottom:2px solid #312e81; padding-bottom:8px;">
                    <h2 style="margin:0; color:#312e81; font-size:1.2rem;">\u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0640 QR \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u0644\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 (Near Miss Badges)</h2>
                    <p style="margin:4px 0 0 0; color:#64748b; font-size:0.8rem;">SafetyHub | ICAPP \u2014 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u062B\u0628\u064A\u062A \u0628\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639</p>
                </div>
                <div class="grid">${o}</div>
                <script>
                    window.onload = function() { setTimeout(function() { window.print(); }, 500); };
                <\/script>
            </body>
            </html>
        `),a.document.close()}};typeof window<"u"&&(window.NearMiss=NearMiss),typeof module<"u"&&module.exports&&(module.exports=NearMiss);
