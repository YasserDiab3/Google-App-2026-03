const NearMiss={TYPES:[{value:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",label:"\u0633\u0642\u0648\u0637 \u0623\u0634\u064A\u0627\u0621 / \u0623\u062D\u0645\u0627\u0644",icon:"fa-arrow-down"},{value:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",label:"\u062A\u0639\u062B\u0631 / \u0627\u0646\u0632\u0644\u0627\u0642",icon:"fa-walking"},{value:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",label:"\u0627\u0642\u062A\u0631\u0627\u0628 \u0645\u0639\u062F\u0627\u062A / \u0641\u0648\u0631\u0643\u0644\u0641\u062A",icon:"fa-truck-pickup"},{value:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",label:"\u062E\u0637\u0631 \u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0634\u064A\u0643",icon:"fa-bolt"},{value:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",label:"\u062A\u0633\u0631\u064A\u0628 \u0645\u0648\u0627\u062F \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 / \u063A\u0627\u0632",icon:"fa-flask"},{value:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",label:"\u062D\u0631\u064A\u0642 \u0648\u0634\u064A\u0643",icon:"fa-fire"},{value:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 \u0639\u0627\u0645",icon:"fa-exclamation-triangle"},{value:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-user-times"},{value:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",label:"\u0648\u0636\u0639 \u063A\u064A\u0631 \u0622\u0645\u0646",icon:"fa-ban"},{value:"\u0645\u0642\u062A\u0631\u062D",label:"\u0645\u0642\u062A\u0631\u062D \u062A\u062D\u0633\u064A\u0646",icon:"fa-lightbulb"}],state:{activeTab:"register",filters:{search:"",type:"",department:"",startDate:"",endDate:"",period:"365"},currentAttachments:[],editingId:null},_charts:{},applyModuleI18n(e){const t=e||document,i=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;i&&(typeof i.applyI18n=="function"&&i.applyI18n(t),typeof i.applyLiteralTranslations=="function"&&i.applyLiteralTranslations(t))},ensureI18nObservers(e){},async fetchLiveNearMisses(){try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.callApi){const e=await GoogleIntegration.callApi("getAllNearMisses");e&&e.success&&Array.isArray(e.data)&&(AppState.appData.nearmiss=e.data.map(t=>this.normalizeRecord(t)),this.renderKpiStrip(),this.renderActiveTabContent())}}catch{}},async load(){try{const e=document.getElementById("nearmiss-section");if(!e)return;this.ensureDataIntegrity(),this.renderMainLayout(e),this.fetchLiveNearMisses()}catch{}},ensureDataIntegrity(){let e=AppState.appData.nearmiss||AppState.appData.NearMiss||[];Array.isArray(e)||(e=[]),AppState.appData.nearmiss=e.map(t=>this.normalizeRecord(t))},normalizeRecord(e={}){const t=this.TYPES[0].value,i=e.id||(typeof Utils<"u"&&Utils.generateId?Utils.generateId("NEARMISS"):"NRM-"+Math.floor(Math.random()*1e5));let a;try{a=e.date?new Date(e.date).toISOString():new Date().toISOString()}catch{a=new Date().toISOString()}let l=[];if(Array.isArray(e.attachments))l=e.attachments.map(r=>this.normalizeAttachment(r)).filter(Boolean);else if(typeof e.attachments=="string"&&e.attachments.trim().startsWith("["))try{const r=JSON.parse(e.attachments);Array.isArray(r)&&(l=r.map(s=>this.normalizeAttachment(s)).filter(Boolean))}catch{}const p=e.correctiveProposed===!0||e.correctiveProposed==="\u0646\u0639\u0645"||!!(e.correctiveDescription||e.correctiveAction);return{id:i,isoCode:e.isoCode||e.id||i,type:e.type||t,severity:e.severity||"\u0645\u062A\u0648\u0633\u0637",date:a,observerName:e.observerName||e.reportedBy||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631 (\u0633\u0631\u064A)",phone:e.phone||"",location:e.location||e.place||"",department:e.department||e.departmentName||"",description:e.description||e.details||"",correctiveProposed:p,correctiveDescription:e.correctiveDescription||e.correctiveProposed||e.correctiveAction||"",attachments:l,status:e.status||(p?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642"),createdAt:e.createdAt||a,updatedAt:e.updatedAt||a}},normalizeAttachment(e){return e?typeof e=="string"?{id:"att-"+Math.random(),name:"\u0645\u0631\u0641\u0642",url:e,data:e,type:"image/jpeg"}:{id:e.id||"att-"+Math.random(),name:e.name||"\u0645\u0631\u0641\u0642",type:e.type||"image/jpeg",url:e.url||e.data||"",data:e.data||e.url||"",size:e.size||0}:null},renderMainLayout(e){e.innerHTML=`
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
                        <button id="nearmiss-refresh-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;" onclick="NearMiss.fetchLiveNearMisses(); alert('\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u0629...');">
                            <i class="fas fa-sync-alt text-cyan-300"></i>
                            <span>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u{1F504}</span>
                        </button>
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
        `,this.renderKpiStrip(),this.renderActiveTabContent(),this.bindEvents()},renderKpiStrip(){const e=document.getElementById("nearmiss-kpi-strip");if(!e)return;const t=AppState.appData.nearmiss||[],i=t.length,a=t.filter(f=>f.correctiveProposed).length,l=t.filter(f=>{const o=(f.severity||"").toLowerCase();return o.includes("\u0639\u0627\u0644\u064A")||o.includes("high")||o.includes("\u0643\u0627\u0631\u062B\u064A")||o.includes("critical")||o.includes("\u0648\u0634\u064A\u0643")}).length,p=new Date,r=t.filter(f=>{const o=new Date(f.date);return o.getFullYear()===p.getFullYear()&&o.getMonth()===p.getMonth()}).length,s={};t.forEach(f=>{const o=(f.department||"").trim();o&&(s[o]=(s[o]||0)+1)});const d=Object.entries(s).sort((f,o)=>o[1]-f[1])[0],c=d?`${d[0]} (${d[1]})`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F";e.innerHTML=`
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
                        <div style="font-size:1.6rem; font-weight:800; color:#b91c1c; line-height:1.2;">${l}</div>
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
                        <div style="font-size:1.05rem; font-weight:800; color:#065f46; line-height:1.2; margin-top:3px;">${Utils.escapeHTML(c)}</div>
                        <div style="font-size:0.72rem; color:#059669; font-weight:600; margin-top:2px;">\u062B\u0642\u0627\u0641\u0629 \u0625\u064A\u062C\u0627\u0628\u064A\u0629 \u0645\u0634\u062C\u0639\u0629 \u{1F3C6}</div>
                    </div>
                </div>
            </div>
        `},renderActiveTabContent(){const e=document.getElementById("nearmiss-tab-content");e&&(this.state.activeTab==="register"?this.renderRegisterTab(e):this.renderAnalyticsTab(e))},renderRegisterTab(e){const t=this.state.filters,i=this._getActiveFilterCount(),a=[{value:"",label:"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A"},{value:"\u0645\u0646\u062E\u0641\u0636",label:"\u{1F7E2} \u0645\u0646\u062E\u0641\u0636"},{value:"\u0645\u062A\u0648\u0633\u0637",label:"\u{1F7E1} \u0645\u062A\u0648\u0633\u0637"},{value:"\u0639\u0627\u0644\u064A",label:"\u{1F534} \u0639\u0627\u0644\u064A"},{value:"\u0643\u0627\u0631\u062B\u064A",label:"\u{1F6A8} \u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643"}];e.innerHTML=`
            <style>
                .nrm-filter-bar { background:#fff; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden; margin-bottom:0; box-shadow:0 1px 3px rgba(0,0,0,.04); }
                .nrm-filter-header { padding:12px 20px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; border-bottom:1px solid #f1f5f9; }
                .nrm-filter-toggle { display:flex; align-items:center; gap:8px; cursor:pointer; background:none; border:none; font-size:0.82rem; font-weight:700; color:#1e1b4b; padding:0; }
                .nrm-filter-toggle .nrm-chevron { transition:transform .25s ease; font-size:.7rem; color:#6366f1; }
                .nrm-filter-toggle .nrm-chevron.open { transform:rotate(180deg); }
                .nrm-filter-badge { background:linear-gradient(135deg,#6366f1,#4f46e5); color:#fff; font-size:.65rem; font-weight:800; min-width:18px; height:18px; border-radius:99px; display:inline-flex; align-items:center; justify-content:center; padding:0 5px; }
                .nrm-filter-actions { display:flex; align-items:center; gap:8px; }
                .nrm-filter-reset { background:none; border:1px solid #e2e8f0; border-radius:8px; padding:5px 12px; font-size:.72rem; font-weight:700; color:#6366f1; cursor:pointer; display:flex; align-items:center; gap:4px; transition:all .2s; }
                .nrm-filter-reset:hover { background:#eef2ff; border-color:#c7d2fe; }
                .nrm-filter-body { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; padding:14px 20px 16px; transition:all .3s ease; }
                .nrm-filter-body.collapsed { display:none; }
                .nrm-filter-group { position:relative; }
                .nrm-filter-group label { display:block; font-size:.68rem; font-weight:700; color:#64748b; margin-bottom:4px; letter-spacing:.02em; text-transform:uppercase; }
                .nrm-filter-group input, .nrm-filter-group select { width:100%; padding:8px 10px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:.78rem; color:#1e1b4b; background:#f8fafc; transition:all .2s; outline:none; font-family:inherit; }
                .nrm-filter-group input:focus, .nrm-filter-group select:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.1); }
                .nrm-filter-group input.has-value, .nrm-filter-group select.has-value { border-color:#6366f1; background:#eef2ff; }
                .nrm-filter-group .nrm-search-icon { position:absolute; left:10px; top:26px; color:#94a3b8; font-size:.75rem; pointer-events:none; }
                .nrm-active-tags { display:flex; flex-wrap:wrap; gap:6px; padding:0 20px 12px; }
                .nrm-active-tags:empty { display:none; }
                .nrm-tag { display:inline-flex; align-items:center; gap:4px; background:#eef2ff; color:#4338ca; font-size:.7rem; font-weight:700; padding:4px 10px 4px 6px; border-radius:99px; border:1px solid #c7d2fe; animation:nrmTagIn .25s ease; }
                .nrm-tag button { background:none; border:none; color:#6366f1; cursor:pointer; font-size:.65rem; padding:0 2px; display:flex; align-items:center; }
                .nrm-tag button:hover { color:#ef4444; }
                @keyframes nrmTagIn { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }

                .nrm-table-card { background:#fff; border-radius:0 0 16px 16px; border:1px solid #e2e8f0; border-top:none; overflow:hidden; }
                .nrm-table-header { padding:12px 20px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }

                @media (max-width: 1024px) {
                    .nrm-filter-body { grid-template-columns:repeat(3,1fr); }
                }
                @media (max-width: 640px) {
                    .nrm-filter-body { grid-template-columns:1fr 1fr; gap:8px; padding:10px 14px 14px; }
                    .nrm-filter-header { padding:10px 14px; }
                    .nrm-active-tags { padding:0 14px 10px; }
                    .nrm-table-header { padding:10px 14px; }
                }
            </style>

            <div class="nrm-filter-bar">
                <div class="nrm-filter-header">
                    <button id="nrm-filter-toggle-btn" class="nrm-filter-toggle" type="button">
                        <i class="fas fa-filter" style="color:#6366f1;font-size:.85rem;"></i>
                        <span>\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A</span>
                        ${i?`<span class="nrm-filter-badge">${i}</span>`:""}
                        <i class="fas fa-chevron-down nrm-chevron ${this.state._filtersExpanded!==!1?"open":""}"></i>
                    </button>
                    <div class="nrm-filter-actions">
                        ${i?'<button id="nearmiss-reset-filters" class="nrm-filter-reset" type="button"><i class="fas fa-undo" style="font-size:.65rem;"></i> \u0645\u0633\u062D \u0627\u0644\u0643\u0644</button>':""}
                        <span id="nearmiss-result-count" class="text-xs text-indigo-700 bg-indigo-50 font-bold px-2.5 py-1 rounded-full" style="min-width:40px;text-align:center;"></span>
                    </div>
                </div>

                <div id="nrm-filter-body" class="nrm-filter-body ${this.state._filtersExpanded===!1?"collapsed":""}">
                    <div class="nrm-filter-group" style="position:relative;">
                        <label><i class="fas fa-search" style="margin-left:3px;"></i> \u0628\u062D\u062B \u062D\u0631</label>
                        <input type="text" id="nearmiss-filter-search" placeholder="\u0627\u0633\u0645\u060C \u0645\u0648\u0642\u0639\u060C \u0631\u0642\u0645 \u0645\u0631\u062C\u0639\u064A..." value="${Utils.escapeHTML(t.search)}" class="${t.search?"has-value":""}">
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-tag" style="margin-left:3px;"></i> \u0646\u0648\u0639 \u0627\u0644\u062D\u0627\u062F\u062B</label>
                        <select id="nearmiss-filter-type" class="${t.type?"has-value":""}">
                            ${this.renderTypeOptions(t.type)}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-exclamation-circle" style="margin-left:3px;"></i> \u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                        <select id="nearmiss-filter-severity" class="${t.severity?"has-value":""}">
                            ${a.map(l=>`<option value="${l.value}" ${(t.severity||"")===l.value?"selected":""}>${l.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-building" style="margin-left:3px;"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                        <select id="nearmiss-filter-department" class="${t.department?"has-value":""}">
                            ${this.renderDepartmentOptions(t.department)}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-calendar" style="margin-left:3px;"></i> \u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="nearmiss-filter-start" value="${t.startDate}" class="${t.startDate?"has-value":""}">
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-calendar-check" style="margin-left:3px;"></i> \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="nearmiss-filter-end" value="${t.endDate}" class="${t.endDate?"has-value":""}">
                    </div>
                </div>

                <div id="nrm-active-tags" class="nrm-active-tags">
                    ${this._renderActiveFilterTags()}
                </div>

                <div class="nrm-table-header">
                    <div class="flex items-center gap-2 font-bold text-gray-800 text-sm">
                        <i class="fas fa-table text-indigo-600"></i>
                        <span>\u0633\u062C\u0644 \u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</span>
                    </div>
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
        `,setTimeout(()=>this.drawAnalyticsCharts(t),100)},drawAnalyticsCharts(e){if(typeof Chart>"u")return;["types","severity","locations","departments"].forEach(o=>{if(this._charts[o])try{this._charts[o].destroy()}catch{}});const t={};e.forEach(o=>{const g=o.type||"\u0623\u062E\u0631\u0649";t[g]=(t[g]||0)+1});const i=document.getElementById("nrm-chart-types");i&&(this._charts.types=new Chart(i,{type:"doughnut",data:{labels:Object.keys(t),datasets:[{data:Object.values(t),backgroundColor:["#4f46e5","#f59e0b","#10b981","#ef4444","#06b6d4","#8b5cf6","#ec4899"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}));const a={\u0645\u0646\u062E\u0641\u0636:0,\u0645\u062A\u0648\u0633\u0637:0,\u0639\u0627\u0644\u064A:0,"\u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643":0};e.forEach(o=>{const g=o.severity||"\u0645\u062A\u0648\u0633\u0637";g.includes("\u0645\u0646\u062E\u0641\u0636")?a.\u0645\u0646\u062E\u0641\u0636++:g.includes("\u0639\u0627\u0644\u064A")||g.includes("high")?a.\u0639\u0627\u0644\u064A++:g.includes("\u0643\u0627\u0631\u062B\u064A")||g.includes("\u0648\u0634\u064A\u0643")?a["\u0643\u0627\u0631\u062B\u064A / \u0648\u0634\u064A\u0643"]++:a.\u0645\u062A\u0648\u0633\u0637++});const l=document.getElementById("nrm-chart-severity");l&&(this._charts.severity=new Chart(l,{type:"pie",data:{labels:Object.keys(a),datasets:[{data:Object.values(a),backgroundColor:["#10b981","#f59e0b","#ef4444","#991b1b"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}));const p={};e.forEach(o=>{const g=(o.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").split("\u2014")[0].trim();p[g]=(p[g]||0)+1});const r=Object.entries(p).sort((o,g)=>g[1]-o[1]).slice(0,6),s=document.getElementById("nrm-chart-locations");s&&(this._charts.locations=new Chart(s,{type:"bar",data:{labels:r.map(o=>o[0]),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A",data:r.map(o=>o[1]),backgroundColor:"#6366f1",borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}));const d={};e.forEach(o=>{const g=(o.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim();d[g]=(d[g]||0)+1});const c=Object.entries(d).sort((o,g)=>g[1]-o[1]).slice(0,6),f=document.getElementById("nrm-chart-departments");f&&(this._charts.departments=new Chart(f,{type:"bar",data:{labels:c.map(o=>o[0]),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A",data:c.map(o=>o[1]),backgroundColor:"#10b981",borderRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}}))},bindEvents(){document.querySelectorAll(".nrm-nav-tab").forEach(a=>{a.addEventListener("click",()=>{const l=a.getAttribute("data-tab");l&&(this.state.activeTab=l,document.querySelectorAll(".nrm-nav-tab").forEach(p=>{const r=p.getAttribute("data-tab")===l;p.style.background=r?"#fff":"rgba(255,255,255,0.12)",p.style.color=r?"#1e1b4b":"#fff"}),this.renderActiveTabContent())})});const e=document.getElementById("nearmiss-public-qr-btn");e&&e.addEventListener("click",()=>this.openPublicQrModal());const t=document.getElementById("nearmiss-print-badges-btn");t&&t.addEventListener("click",()=>this.printLocationQrBadges());const i=document.getElementById("nearmiss-create-new-btn");i&&i.addEventListener("click",()=>this.showForm())},bindFilterEvents(){const e=document.getElementById("nrm-filter-toggle-btn");e&&e.addEventListener("click",()=>{const c=document.getElementById("nrm-filter-body"),f=e.querySelector(".nrm-chevron");if(c){const o=c.classList.toggle("collapsed");this.state._filtersExpanded=!o,f&&f.classList.toggle("open",!o)}});const t=document.getElementById("nearmiss-filter-search");if(t){let c;t.addEventListener("input",f=>{clearTimeout(c),c=setTimeout(()=>{this.handleFilterChange("search",f.target.value)},250)})}const i=document.getElementById("nearmiss-filter-type");i&&i.addEventListener("change",c=>this.handleFilterChange("type",c.target.value));const a=document.getElementById("nearmiss-filter-severity");a&&a.addEventListener("change",c=>this.handleFilterChange("severity",c.target.value));const l=document.getElementById("nearmiss-filter-department");l&&l.addEventListener("change",c=>this.handleFilterChange("department",c.target.value));const p=document.getElementById("nearmiss-filter-start");p&&p.addEventListener("change",c=>this.handleFilterChange("startDate",c.target.value));const r=document.getElementById("nearmiss-filter-end");r&&r.addEventListener("change",c=>this.handleFilterChange("endDate",c.target.value));const s=document.getElementById("nearmiss-reset-filters");s&&s.addEventListener("click",()=>this.resetFilters());const d=document.getElementById("nrm-active-tags");d&&d.addEventListener("click",c=>{const f=c.target.closest("[data-clear-filter]");if(f){const o=f.getAttribute("data-clear-filter");this.handleFilterChange(o,"")}})},handleFilterChange(e,t){this.state.filters[e]=t,this._refreshFilterUI(),this.renderTable()},resetFilters(){this.state.filters={search:"",type:"",severity:"",department:"",startDate:"",endDate:"",period:"365"},this.renderRegisterTab(document.getElementById("nearmiss-tab-content"))},_getActiveFilterCount(){const e=this.state.filters;let t=0;return e.search&&t++,e.type&&t++,e.severity&&t++,e.department&&t++,e.startDate&&t++,e.endDate&&t++,t},_renderActiveFilterTags(){const e=this.state.filters,t=[],i={search:{icon:"fa-search",prefix:"\u0628\u062D\u062B"},type:{icon:"fa-tag",prefix:"\u0627\u0644\u0646\u0648\u0639"},severity:{icon:"fa-exclamation-circle",prefix:"\u0627\u0644\u062E\u0637\u0648\u0631\u0629"},department:{icon:"fa-building",prefix:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},startDate:{icon:"fa-calendar",prefix:"\u0645\u0646"},endDate:{icon:"fa-calendar-check",prefix:"\u0625\u0644\u0649"}};for(const[a,l]of Object.entries(i))e[a]&&t.push(`<span class="nrm-tag"><i class="fas ${l.icon}" style="font-size:.6rem;opacity:.7;"></i> ${l.prefix}: ${Utils.escapeHTML(e[a])}<button data-clear-filter="${a}" title="\u0625\u0632\u0627\u0644\u0629"><i class="fas fa-times"></i></button></span>`);return t.join("")},_refreshFilterUI(){const e=document.getElementById("nrm-active-tags");e&&(e.innerHTML=this._renderActiveFilterTags());const t=this._getActiveFilterCount(),i=document.getElementById("nrm-filter-toggle-btn");if(i){const r=i.querySelector(".nrm-filter-badge");if(t)if(r)r.textContent=t;else{const s=document.createElement("span");s.className="nrm-filter-badge",s.textContent=t;const d=i.querySelector(".nrm-chevron");i.insertBefore(s,d)}else r&&r.remove()}const a=document.querySelector(".nrm-filter-actions");if(a){const r=a.querySelector(".nrm-filter-reset");if(t&&!r){const s=document.createElement("button");s.id="nearmiss-reset-filters",s.className="nrm-filter-reset",s.type="button",s.innerHTML='<i class="fas fa-undo" style="font-size:.65rem;"></i> \u0645\u0633\u062D \u0627\u0644\u0643\u0644',s.addEventListener("click",()=>this.resetFilters()),a.insertBefore(s,a.firstChild)}else!t&&r&&r.remove()}["nearmiss-filter-search","nearmiss-filter-type","nearmiss-filter-severity","nearmiss-filter-department","nearmiss-filter-start","nearmiss-filter-end"].forEach(r=>{const s=document.getElementById(r);s&&(s.value?s.classList.add("has-value"):s.classList.remove("has-value"))});const l=this.state.filters,p={"nearmiss-filter-search":"search","nearmiss-filter-type":"type","nearmiss-filter-severity":"severity","nearmiss-filter-department":"department","nearmiss-filter-start":"startDate","nearmiss-filter-end":"endDate"};for(const[r,s]of Object.entries(p)){const d=document.getElementById(r);d&&d.value!==l[s]&&(d.value=l[s])}},getFilteredItems(){const{search:e,type:t,severity:i,department:a,startDate:l,endDate:p}=this.state.filters;let r=(AppState.appData.nearmiss||[]).filter(s=>!!s);if(t&&(r=r.filter(s=>(s.type||"").toLowerCase()===t.toLowerCase())),a&&(r=r.filter(s=>(s.department||"").toLowerCase()===a.toLowerCase())),i&&(r=r.filter(s=>{const d=String(s.severity||"").toLowerCase(),c=i.toLowerCase();return c==="\u0643\u0627\u0631\u062B\u064A"?d.includes("\u0643\u0627\u0631\u062B\u064A")||d.includes("\u0648\u0634\u064A\u0643")||d.includes("critical"):d.includes(c)})),l){const s=new Date(l);s.setHours(0,0,0,0),r=r.filter(d=>new Date(d.date)>=s)}if(p){const s=new Date(p);s.setHours(23,59,59,999),r=r.filter(d=>new Date(d.date)<=s)}if(e){const s=e.toLowerCase();r=r.filter(d=>[d.type,d.location,d.department,d.observerName,d.phone,d.description,d.correctiveDescription,d.isoCode].some(c=>c&&String(c).toLowerCase().includes(s)))}return r.sort((s,d)=>new Date(d.date)-new Date(s.date))},renderTable(){const e=document.getElementById("nearmiss-table-container");if(!e)return;const t=this.getFilteredItems(),i=document.getElementById("nearmiss-result-count");if(i&&(i.textContent=t.length?`${t.length} \u0628\u0644\u0627\u063A`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C"),!t.length){e.innerHTML=`
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
        `,document.body.appendChild(i)},showForm(e=null){const t=e?this.normalizeRecord(e):null;this.state.editingId=t?.id||null,this.state.currentAttachments=t?.attachments||[];const i=this.buildFormModal(t);document.body.appendChild(i),this.bindFormEvents(i,t)},buildFormModal(e){const t=e?.correctiveProposed===!0,i=this.getDepartmentOptions(),a=e?.severity||"\u0645\u062A\u0648\u0633\u0637",l=document.createElement("div");return l.className="modal-overlay",l.style.cssText="position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:16px; backdrop-filter:blur(4px);",l.innerHTML=`
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
                                        ${i.map(p=>`<option value="${Utils.escapeHTML(p)}"></option>`).join("")}
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
        `,l},bindFormEvents(e,t){const i=e.querySelector("#nearmiss-form");i&&i.addEventListener("submit",async l=>{l.preventDefault(),await this.handleSubmit(i,t),e.remove()});const a=e.querySelector("#nearmiss-attachments");a&&a.addEventListener("change",async l=>{const p=l.target.files;if(!(!p||!p.length))for(let r=0;r<p.length;r++){const s=p[r],d=new FileReader;d.onload=c=>{this.state.currentAttachments.push({id:"att-"+Date.now()+"-"+r,name:s.name,type:s.type,data:c.target.result,url:c.target.result}),this.renderAttachmentsPreview(e)},d.readAsDataURL(s)}})},renderAttachmentsPreview(e){const t=e.querySelector("#nearmiss-attachments-preview");if(t){if(!this.state.currentAttachments.length){t.innerHTML="";return}t.innerHTML=this.state.currentAttachments.map((i,a)=>`
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0; font-size:0.8rem;">
                <span class="truncate">${Utils.escapeHTML(i.name)}</span>
                <button type="button" onclick="NearMiss.state.currentAttachments.splice(${a},1); NearMiss.renderAttachmentsPreview(this.closest('.modal-overlay'))" class="text-red-500 hover:text-red-700" style="background:none; border:none; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join("")}},async handleSubmit(e,t){const i=document.getElementById("nearmiss-type")?.value||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643",a=document.getElementById("nearmiss-severity")?.value||"\u0645\u062A\u0648\u0633\u0637",l=document.getElementById("nearmiss-location")?.value||"",p=document.getElementById("nearmiss-department")?.value||"",r=document.getElementById("nearmiss-date")?.value||new Date().toISOString(),s=document.getElementById("nearmiss-observer")?.value||"\u0641\u0627\u0639\u0644 \u062E\u064A\u0631",d=document.getElementById("nearmiss-description")?.value||"",c=document.getElementById("nearmiss-corrective-check")?.checked||!1,f=document.getElementById("nearmiss-corrective-description")?.value||"",o=t?.id||"NRM-"+Date.now(),g=t?.isoCode||"NM-"+new Date().getFullYear()+"-"+Math.floor(1e3+Math.random()*9e3),x={id:o,isoCode:g,type:i,severity:a,location:l,department:p,date:new Date(r).toISOString(),observerName:s,description:d,correctiveProposed:c,correctiveDescription:c?f:"",attachments:this.state.currentAttachments,status:c?"\u0645\u0641\u062A\u0648\u062D":"\u0645\u063A\u0644\u0642",updatedAt:new Date().toISOString()};if(t){const n=AppState.appData.nearmiss.findIndex(m=>m.id===t.id);n!==-1&&(AppState.appData.nearmiss[n]=x)}else x.createdAt=new Date().toISOString(),AppState.appData.nearmiss.unshift(x);try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.callApi){const n=t?"updateNearMiss":"addNearMiss";GoogleIntegration.callApi(n,x)}}catch{}this.renderKpiStrip(),this.renderTable(),alert("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u0644\u0627\u063A \u0628\u0646\u062C\u0627\u062D!")},editNearMiss(e){const t=(AppState.appData.nearmiss||[]).find(i=>i.id===e);t&&this.showForm(t)},deleteNearMiss(e){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0644\u0627\u063A\u061F")){AppState.appData.nearmiss=(AppState.appData.nearmiss||[]).filter(t=>t.id!==e);try{typeof GoogleIntegration<"u"&&GoogleIntegration.callApi&&GoogleIntegration.callApi("deleteNearMiss",{nearMissId:e})}catch{}this.renderKpiStrip(),this.renderTable()}},getPublicUrl(){try{const e=window.location;let t=e.origin+e.pathname;return t.endsWith(".html")?t=t.substring(0,t.lastIndexOf("/")+1):t.endsWith("/")||(t=t+"/"),t+"public-near-miss.html"}catch{return window.location.href.split("?")[0].split("#")[0].replace(/[^/]*$/,"")+"public-near-miss.html"}},generateQrDataUrl(e,t=250){try{if(typeof qrcode=="function"){const i=qrcode(0,"M");i.addData(String(e)),i.make();const a=typeof i.getModuleCount=="function"?i.getModuleCount():0,l=a?Math.max(1,Math.floor(t/a)):Math.max(2,Math.floor(t/25));return i.createDataURL(l,2)}}catch{}try{if(typeof window<"u"&&window.QRCode&&typeof window.QRCode.generate=="function"){const i=window.QRCode.generate(e,t);if(i)return i}}catch{}return`https://api.qrserver.com/v1/create-qr-code/?size=${t}x${t}&data=${encodeURIComponent(e)}`},openPublicQrModal(){const e=this.getPublicUrl(),t=document.getElementById("nrm-public-qr-modal");t&&t.remove();const i=document.createElement("div");i.id="nrm-public-qr-modal",i.style.cssText='position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(6px); direction:rtl; font-family:"Segoe UI", Tahoma, sans-serif;';const a=this.generateQrDataUrl(e,250),l=encodeURIComponent(e);i.innerHTML=`
            <div style="background:#fff; border-radius:24px; max-width:520px; width:100%; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border:1px solid #e0e7ff; animation:fadeIn 0.2s ease;">
                <!-- \u0627\u0644\u062A\u0631\u0648\u064A\u0633\u0629 -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color:#fff; padding:22px 26px; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:14px;">
                        <div style="width:48px; height:48px; border-radius:14px; background:rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-qrcode text-2xl text-amber-300"></i>
                        </div>
                        <div>
                            <h3 style="font-size:1.25rem; font-weight:800; margin:0; color:#fff;">\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h3>
                            <p style="font-size:0.75rem; color:#c7d2fe; margin:3px 0 0 0;">SafetyHub | ICAPP \u2014 Near Miss Public Reporting</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('nrm-public-qr-modal').remove()" style="background:none; border:none; color:rgba(255,255,255,0.8); font-size:1.8rem; cursor:pointer;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- \u0627\u0644\u0645\u062D\u062A\u0648\u0649 -->
                <div style="padding:24px; text-align:center;">
                    <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:14px; padding:14px 18px; margin-bottom:20px; text-align:right; font-size:0.82rem; color:#312e81; display:flex; align-items:center; gap:12px;">
                        <i class="fas fa-shield-alt text-indigo-600 text-2xl"></i>
                        <div><b>\u0631\u0627\u0628\u0637 \u0645\u062A\u0627\u062D \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:</b> \u064A\u0645\u0643\u0646 \u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0644\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 \u0641\u0648\u0631\u0627\u064B \u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.</div>
                    </div>

                    <div style="display:inline-block; padding:16px; background:#fff; border-radius:20px; box-shadow:0 6px 20px rgba(0,0,0,0.06); border:2px solid #e0e7ff; margin-bottom:18px;">
                        <img src="${a}" alt="QR Code" style="width:220px; height:220px; border-radius:12px; display:block; margin:0 auto;" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=250&text=${l}';}else if(this.dataset.errCount=='1'){this.dataset.errCount=2;this.src='https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${l}';}" />
                    </div>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:20px; font-family:monospace; font-size:0.75rem; color:#475569; direction:ltr; text-align:center; word-break:break-all; user-select:all;">
                        ${e}
                    </div>

                    <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <button onclick="window.open('${e}', '_blank')" style="background:#f1f5f9; color:#1e293b; border:1px solid #cbd5e1; padding:11px 16px; border-radius:12px; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fas fa-external-link-alt text-indigo-600"></i>
                            <span>\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0622\u0646</span>
                        </button>
                        <button onclick="NearMiss.printLocationQrBadges()" style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff; border:none; padding:11px 16px; border-radius:12px; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fas fa-print text-amber-300"></i>
                            <span>\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u{1F5A8}\uFE0F</span>
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(i)},printLocationQrBadges(){this.openBatchNearMissQrModal()},openBatchNearMissQrModal(){const e={},t=(n,m)=>{const b=String(n||"").trim(),u=String(m||"").trim();b&&(e[b]||(e[b]=new Set),u&&e[b].add(u))};try{typeof DailyObservations<"u"&&DailyObservations.getAllSites&&DailyObservations.getAllSites().forEach(m=>{const b=m.name||m.siteName;b&&(t(b,""),Array.isArray(m.places)&&m.places.forEach(u=>t(b,u.name||u)))})}catch{}(Array.isArray(AppState.appData?.observationSites)?AppState.appData.observationSites:[]).forEach(n=>{t(n.siteName||n.site||n.name,n.placeName||n.locationName||n.place)}),(Array.isArray(AppState.appData?.subLocations)?AppState.appData.subLocations:[]).forEach(n=>{t(n.factoryName||n.factory||n.siteName||n.site,n.name||n.subLocationName||n.place)}),Object.keys(e).length===0&&["ICAPP-1","ICAPP-2","ICAPP-3","ICAPP-4","\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"].forEach(n=>t(n,""));const i=[];for(const n of Object.keys(e)){const m=Array.from(e[n]);m.length===0?i.push({site:n,place:"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"}):m.forEach(b=>{i.push({site:n,place:b})})}const a=Object.keys(e).sort(),l=[...new Set(i.map(n=>n.place).filter(n=>n!=="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645"))].sort(),p=document.getElementById("nrm-batch-qr-modal");p&&p.remove();const r=document.createElement("div");r.id="nrm-batch-qr-modal",r.className="modal-overlay",r.style.cssText='position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(6px); direction:rtl; font-family:"Segoe UI", Tahoma, sans-serif;',r.innerHTML=`
            <div class="modal-content" style="max-width: 640px; width:100%; background:#fff; border-radius: 18px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); border: 1px solid #e0e7ff; animation:fadeIn 0.2s ease;">
                <!-- \u0627\u0644\u062A\u0631\u0648\u064A\u0633\u0629 -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color: #ffffff; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #fde68a; font-size: 1.3rem;">
                            <i class="fas fa-print"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.2rem; font-weight: 800; margin: 0 0 3px 0;">\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A \u0648\u0628\u0648\u0633\u062A\u0631\u0627\u062A QR \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</h2>
                            <p style="font-size: 0.8rem; color: #c7d2fe; margin: 0;">\u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A \u0648\u0628\u0648\u0633\u062A\u0631\u0627\u062A QR \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629</p>
                        </div>
                    </div>
                    <button class="modal-close" style="background:none; border:none; color: #c7d2fe; font-size: 1.5rem; cursor:pointer;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 14px 18px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-info-circle text-indigo-600" style="font-size: 22px;"></i>
                        <div style="font-size: 0.88rem; color: #312e81; font-weight: 700;">
                            \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: <span style="font-size: 1.1rem; color: #dc2626;" id="nrm-batch-total-count">${i.length}</span> \u0645\u0648\u0642\u0639 \u0648\u0645\u0643\u0627\u0646
                        </div>
                    </div>

                    <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u062E\u0635\u064A\u0635 -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-industry text-indigo-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639:
                            </label>
                            <select id="nrm-batch-site-filter" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #cbd5e1; font-size: 0.85rem; background:#fff;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u2014</option>
                                ${a.map(n=>`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(n)}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-tags text-indigo-600 ml-1"></i> \u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0645\u0643\u0627\u0646:
                            </label>
                            <select id="nrm-batch-place-filter" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #cbd5e1; font-size: 0.85rem; background:#fff;">
                                <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u2014</option>
                                ${l.map(n=>`<option value="${Utils.escapeHTML(n)}">${Utils.escapeHTML(n)}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-border-all text-indigo-600 ml-1"></i> \u0645\u0642\u0627\u0633 \u0648\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u0644\u0635\u0642\u0627\u062A:
                            </label>
                            <select id="nrm-batch-layout-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #6366f1; font-size: 0.85rem; background:#fff; font-weight:700; color:#1e1b4b;">
                                <option value="1x1" selected>\u2B50 \u0628\u0648\u0633\u062A\u0631 \u0625\u0639\u0644\u0627\u0646\u064A \u0643\u0627\u0645\u0644 (\u0648\u0631\u0642\u0629 A4 \u0643\u0627\u0645\u0644\u0629 - \u0631\u0645\u0632 \u0648\u0627\u062D\u062F \u0643\u0628\u064A\u0631 \u0644\u0644\u0648\u062D\u0627\u062A \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A)</option>
                                <option value="2x2">\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u0631\u064A\u0636\u0629 \u0648\u0627\u0636\u062D\u0629 (\u0635\u0641\u064A\u0646 \xD7 2 = 4 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="2x3">\u0643\u0631\u0648\u062A \u0643\u0628\u064A\u0631\u0629 (\u0635\u0641\u064A\u0646 \xD7 3 = 6 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="2x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0642\u064A\u0627\u0633\u064A\u0629 (\u0635\u0641\u064A\u0646 \xD7 4 = 8 \u0643\u0631\u0648\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                                <option value="3x4">\u0645\u0644\u0635\u0642\u0627\u062A \u0645\u062F\u0645\u062C\u0629 (3 \u0623\u0639\u0645\u062F\u0629 \xD7 4 = 12 \u0643\u0627\u0631\u062A \u0641\u064A \u0635\u0641\u062D\u0629 A4)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calculator text-emerald-600 ml-1"></i> \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629:
                            </label>
                            <div style="padding: 10px 14px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; font-weight: 800; font-size: 0.95rem; color: #047857;" id="nrm-batch-selected-preview">
                                ${i.length} \u0645\u0648\u0642\u0639 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <button type="button" id="nrm-batch-print-btn" style="padding: 11px 22px; border-radius: 10px; font-weight: 800; font-size:0.9rem; display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff; border:none; cursor:pointer; box-shadow:0 4px 12px rgba(49,46,129,0.35);">
                        <i class="fas fa-print text-amber-300"></i>
                        <span>\u0628\u062F\u0621 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0644\u0635\u0642\u0627\u062A / \u0627\u0644\u0628\u0648\u0633\u062A\u0631\u0627\u062A \u0627\u0644\u0622\u0646 (A4)</span>
                    </button>
                    <button type="button" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#475569; padding:10px 18px; border-radius:10px; font-weight:700; cursor:pointer;" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                </div>
            </div>
        `,document.body.appendChild(r);const s=r.querySelector("#nrm-batch-site-filter"),d=r.querySelector("#nrm-batch-place-filter"),c=r.querySelector("#nrm-batch-layout-select"),f=r.querySelector("#nrm-batch-selected-preview"),o=r.querySelector("#nrm-batch-print-btn"),g=()=>{const n=s.value,m=d.value;return i.filter(b=>!(n!=="all"&&b.site!==n||m!=="all"&&b.place!==m))},x=()=>{const n=g();f.textContent=`${n.length} \u0645\u0648\u0642\u0639 \u062C\u0627\u0647\u0632 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`,o.disabled=n.length===0,o.style.opacity=n.length===0?"0.5":"1"};s.addEventListener("change",x),d.addEventListener("change",x),o.addEventListener("click",()=>{const n=g();if(n.length===0){alert("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u062A\u0635\u0641\u064A\u0629.");return}r.remove(),this.renderNearMissQrPrintPage(n,c.value)})},renderNearMissQrPrintPage(e,t="1x1"){if(!e||e.length===0)return;const i=this.getPublicUrl(),a=window.location.origin||"";let l=window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/")+1);l.endsWith("/")||(l+="/");const p=`${a}${l}icons/icapp-logo.png`,r=window.open("","_blank");if(!r){alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0631\u0648\u062A \u0648\u0628\u0648\u0633\u062A\u0631\u0627\u062A QR");return}if(t==="1x1"){const x=e.map((n,m)=>{const b=n.site,u=n.place||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645",h=`${i}?factory=${encodeURIComponent(b)}&place=${encodeURIComponent(u)}`,v=this.generateQrDataUrl(h,280),y=encodeURIComponent(h);return`
                    <div class="a4-poster-page">
                        <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 -->
                        <div class="iso-header-table">
                            <div class="iso-h-cell iso-brand-cell">
                                <div class="iso-company-text">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A</div>
                                <div class="iso-dept-tag">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                            </div>
                            <div class="iso-h-cell iso-title-cell">
                                <div class="iso-doc-maintitle">\u0646\u0638\u0627\u0645 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629</div>
                                <div class="iso-doc-sub">Near Miss & Incident Prevention Reporting System</div>
                            </div>
                            <div class="iso-h-cell iso-logo-cell">
                                <img src="${p}" alt="ICAPP" class="iso-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="iso-logo-fallback" style="display:none; font-size:1.15rem; font-weight:900; color:#1e1b4b;">ICAPP</div>
                                <div class="iso-logo-subtag">SafetyHub</div>
                            </div>
                        </div>

                        <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062E\u0635\u0635 -->
                        <div class="location-banner">
                            <span class="loc-tag-label"><i class="fas fa-map-marker-alt ml-1"></i> \u0645\u0644\u0635\u0642 \u0645\u062E\u0635\u0635 \u0644\u0644\u0645\u0648\u0642\u0639:</span>
                            <span class="loc-name-highlight" dir="rtl"><bdi dir="ltr">${Utils.escapeHTML(b)}</bdi> \u2014 <bdi dir="auto">${Utils.escapeHTML(u)}</bdi></span>
                        </div>

                        <!-- \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062A\u0648\u0639\u0648\u064A\u0629 \u0627\u0644\u062C\u0627\u0630\u0628\u0629 -->
                        <div class="hero-callout">
                            <h2 class="hero-title">\u26A0\uFE0F \u0633\u0644\u0627\u0645\u062A\u0643 \u0648\u0633\u0644\u0627\u0645\u0629 \u0632\u0645\u0644\u0627\u0626\u0643 \u062A\u0628\u062F\u0623 \u0628\u0645\u0644\u062D\u0648\u0638\u062A\u0643!</h2>
                            <p class="hero-subtitle">\u0631\u0635\u062F\u0643 \u0644\u0644\u062D\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643 \u0623\u0648 \u0627\u0644\u062A\u0635\u0631\u0641 \u063A\u064A\u0631 \u0627\u0644\u0622\u0645\u0646 \u0627\u0644\u064A\u0648\u0645 \u064A\u0645\u0646\u0639 \u0648\u0642\u0648\u0639 \u0625\u0635\u0627\u0628\u0629 \u062E\u0637\u064A\u0631\u0629 \u063A\u062F\u0627\u064B</p>
                        </div>

                        <!-- \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0631\u0645\u0632 QR \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629 -->
                        <div class="qr-main-container">
                            <div class="qr-frame">
                                <img src="${v}" alt="QR Code" class="qr-img-large" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=280&text=${y}';}" />
                            </div>
                            <div class="qr-action-caption">
                                <i class="fas fa-camera ml-1 text-amber-500"></i>
                                <span>\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0647\u0627\u062A\u0641\u0643 \u0627\u0644\u0645\u062D\u0645\u0648\u0644 \u0644\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0641\u0648\u0631\u0627\u064B</span>
                            </div>
                        </div>

                        <!-- \u0634\u0628\u0643\u0629 \u0627\u0644\u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u062C\u0627\u0630\u0628\u0629 \u0644\u0644\u0627\u0646\u062A\u0628\u0627\u0647 -->
                        <div class="instructions-grid">
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-qrcode text-indigo-600"></i></div>
                                <div>
                                    <div class="inst-title">1. \u0645\u0633\u062D \u0641\u0648\u0631\u064A \u0648\u0633\u0647\u0644</div>
                                    <div class="inst-desc">\u0627\u0641\u062A\u062D \u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u0647\u0627\u062A\u0641 \u0648\u0627\u0642\u0631\u0623 \u0627\u0644\u0631\u0645\u0632\u060C \u0644\u0627 \u064A\u0644\u0632\u0645 \u062A\u062D\u0645\u064A\u0644 \u0623\u064A \u062A\u0637\u0628\u064A\u0642.</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-map-pin text-emerald-600"></i></div>
                                <div>
                                    <div class="inst-title">2. \u062A\u062D\u062F\u064A\u062F \u0645\u0648\u0642\u0639 \u062A\u0644\u0642\u0627\u0626\u064A</div>
                                    <div class="inst-desc">\u064A\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062D\u062F\u062F \u0628\u062F\u0642\u0629.</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-user-shield text-blue-600"></i></div>
                                <div>
                                    <div class="inst-title">3. \u0625\u0628\u0644\u0627\u063A \u0622\u0645\u0646 \u0648\u0645\u062A\u0627\u062D \u0644\u0644\u062C\u0645\u064A\u0639</div>
                                    <div class="inst-desc">\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644\u060C \u0645\u062A\u0627\u062D \u0644\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0632\u0648\u0627\u0631 (\u0628\u0627\u0633\u0645\u0643 \u0623\u0648 \u0645\u062E\u0641\u064A).</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-bolt text-amber-600"></i></div>
                                <div>
                                    <div class="inst-title">4. \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0625\u062C\u0631\u0627\u0621 \u0641\u0648\u0631\u064A</div>
                                    <div class="inst-desc">\u064A\u0635\u0644 \u0627\u0644\u0628\u0644\u0627\u063A \u0641\u0648\u0631\u0627\u064B \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0644\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u062E\u0637\u0631.</div>
                                </div>
                            </div>
                        </div>

                        <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0648\u0627\u0644\u062D\u0627\u0641\u0632 -->
                        <div class="incentive-banner">
                            <i class="fas fa-trophy text-amber-400 text-lg ml-2"></i>
                            <span><b>\u062B\u0642\u0627\u0641\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A\u0629:</b> \u062A\u0642\u062F\u064A\u0631\u0627\u064B \u0644\u0645\u0634\u0627\u0631\u0643\u062A\u0643 \u0627\u0644\u0641\u0639\u0627\u0644\u0629\u060C \u064A\u062A\u0645 \u062A\u0643\u0631\u064A\u0645 \u0623\u0641\u0636\u0644 \u0627\u0644\u0628\u0644\u0627\u063A\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u0628\u0627\u0642\u064A\u0629 \u062F\u0648\u0631\u064A\u0627\u064B! \u{1F31F}</span>
                        </div>

                        <!-- \u0627\u0644\u0641\u0648\u062A\u0631 \u0627\u0644\u0631\u0633\u0645\u064A \u0627\u0644\u0645\u062A\u0646\u0627\u0633\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F (\u0645\u0639 \u0634\u0639\u0627\u0631 ICAPP \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u062B\u064A\u0642\u0629) -->
                        <div class="iso-footer-table">
                            <div class="footer-meta-block">
                                <span class="f-meta-item"><b>\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C:</b> HSE-DOC-NRM-01</span>
                                <span class="f-meta-sep">|</span>
                                <span class="f-meta-item"><b>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</b> 01-08-2026</span>
                                <span class="f-meta-sep">|</span>
                                <span class="f-meta-item"><b>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</b> Rev. 02 (2026)</span>
                            </div>
                            <div class="footer-center-tag">
                                <span>Incident Prevention System</span> &bull; <span>\u0635\u0641\u062D\u0629 #${m+1} \u0645\u0646 ${e.length}</span>
                            </div>
                            <div class="footer-logo-block">
                                <img src="${p}" alt="ICAPP" class="footer-logo-img" onerror="this.style.display='none';">
                                <span class="footer-logo-text">SafetyHub | ICAPP</span>
                            </div>
                        </div>
                    </div>
                `}).join("");r.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>\u0628\u0648\u0633\u062A\u0631\u0627\u062A QR \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 (${e.length} \u0628\u0648\u0633\u062A\u0631 A4) - ICAPP SafetyHub</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>
                        @page { size: A4 portrait; margin: 0; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                        html, body { margin: 0; padding: 0; font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; color: #0f172a; background: #525659; }
                        
                        .no-print-bar { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; gap: 12px; background: #1e1b4b; padding: 8px 18px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
                        .print-btn { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; border: none; padding: 8px 22px; border-radius: 8px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; }
                        .close-btn { background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.4); padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-family: inherit; }
                        
                        .a4-poster-page {
                            width: 210mm;
                            height: 296mm;
                            max-height: 296mm;
                            padding: 8mm 12mm 6mm;
                            margin: 10px auto;
                            background: #ffffff;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;
                            page-break-inside: avoid;
                            break-inside: avoid;
                            page-break-after: always;
                            break-after: page;
                        }

                        @media print {
                            .no-print-bar { display: none !important; }
                            html, body {
                                width: 210mm;
                                height: 297mm;
                                margin: 0 !important;
                                padding: 0 !important;
                                background: #fff;
                            }
                            .a4-poster-page {
                                width: 210mm;
                                height: 297mm;
                                max-height: 297mm;
                                margin: 0 !important;
                                padding: 8mm 12mm 6mm !important;
                                box-shadow: none;
                                border-radius: 0;
                                page-break-after: always;
                                break-after: page;
                                page-break-inside: avoid;
                                break-inside: avoid;
                                overflow: hidden;
                            }
                        }

                        /* Header */
                        .iso-header-table {
                            display: grid;
                            grid-template-columns: 215px 1fr 135px;
                            border: 2px solid #1e1b4b;
                            border-radius: 8px;
                            overflow: hidden;
                            background: #f8fafc;
                        }
                        .iso-h-cell { padding: 6px 10px; display: flex; flex-direction: column; justify-content: center; }
                        .iso-brand-cell {
                            border-left: 1.5px solid #cbd5e1;
                            text-align: right;
                        }
                        .iso-company-text {
                            font-size: 0.78rem;
                            font-weight: 800;
                            color: #1e1b4b;
                            line-height: 1.2;
                            white-space: nowrap;
                        }
                        .iso-dept-tag {
                            font-size: 0.64rem;
                            font-weight: 800;
                            color: #065f46;
                            margin-top: 3px;
                            white-space: nowrap;
                            line-height: 1.2;
                        }
                        .iso-title-cell {
                            text-align: center;
                            justify-content: center;
                            border-left: 1.5px solid #cbd5e1;
                        }
                        .iso-doc-maintitle {
                            font-size: 1.12rem;
                            font-weight: 900;
                            color: #1e1b4b;
                            margin: 0;
                            line-height: 1.2;
                        }
                        .iso-doc-sub {
                            font-size: 0.65rem;
                            color: #64748b;
                            font-weight: 700;
                            margin-top: 2px;
                        }
                        .iso-logo-cell {
                            background: #ffffff;
                            color: #1e1b4b;
                            text-align: center;
                            align-items: center;
                            justify-content: center;
                            padding: 6px;
                        }
                        .iso-logo-img {
                            max-height: 38px;
                            max-width: 95px;
                            object-fit: contain;
                            display: block;
                            margin: 0 auto;
                        }
                        .iso-logo-subtag {
                            font-size: 0.58rem;
                            color: #4338ca;
                            font-weight: 800;
                            margin-top: 2px;
                        }

                        /* Footer */
                        .iso-footer-table {
                            border: 1.5px solid #cbd5e1;
                            background: #f8fafc;
                            border-radius: 8px;
                            padding: 6px 12px;
                            margin-top: 4px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 0.66rem;
                            color: #334155;
                            font-weight: 700;
                            gap: 8px;
                        }
                        .footer-meta-block {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                        }
                        .f-meta-item b {
                            color: #1e1b4b;
                        }
                        .f-meta-sep {
                            color: #cbd5e1;
                        }
                        .footer-center-tag {
                            color: #047857;
                            font-weight: 800;
                            white-space: nowrap;
                            text-align: center;
                        }
                        .footer-logo-block {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                        }
                        .footer-logo-img {
                            max-height: 20px;
                            max-width: 48px;
                            object-fit: contain;
                        }
                        .footer-logo-text {
                            font-weight: 900;
                            color: #1e1b4b;
                            font-size: 0.7rem;
                        }

                        /* Location Banner */
                        .location-banner {
                            margin: 6px 0;
                            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                            color: #fff;
                            padding: 8px 16px;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            gap: 12px;
                            white-space: nowrap;
                            box-shadow: 0 2px 8px rgba(49, 46, 129, 0.15);
                        }
                        .loc-tag-label { font-size: 0.82rem; color: #fbbf24; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
                        .loc-name-highlight { font-size: 1.05rem; font-weight: 900; color: #ffffff; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; direction: rtl; unicode-bidi: isolate; }

                        /* Hero Callout */
                        .hero-callout {
                            text-align: center;
                            background: #fffbeb;
                            border: 2px dashed #f59e0b;
                            border-radius: 10px;
                            padding: 8px 12px;
                            margin-bottom: 6px;
                        }
                        .hero-title { margin: 0; font-size: 1.15rem; font-weight: 900; color: #b45309; }
                        .hero-subtitle { margin: 3px 0 0 0; font-size: 0.8rem; font-weight: 700; color: #78350f; }

                        /* QR Main Container */
                        .qr-main-container {
                            text-align: center;
                            padding: 8px;
                            background: #f8fafc;
                            border: 2px solid #e0e7ff;
                            border-radius: 12px;
                            margin-bottom: 6px;
                        }
                        .qr-frame {
                            display: inline-block;
                            padding: 10px;
                            background: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 4px 14px rgba(0,0,0,0.06);
                            border: 2px solid #312e81;
                        }
                        .qr-img-large { width: 175px; height: 175px; display: block; border-radius: 6px; }
                        .qr-action-caption {
                            margin-top: 6px;
                            font-size: 0.88rem;
                            font-weight: 800;
                            color: #1e1b4b;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                        }

                        /* Instructions Grid */
                        .instructions-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 6px;
                            margin-bottom: 6px;
                        }
                        .instruction-card {
                            background: #ffffff;
                            border: 1.5px solid #e2e8f0;
                            border-radius: 8px;
                            padding: 6px 10px;
                            display: flex;
                            align-items: flex-start;
                            gap: 8px;
                        }
                        .inst-icon { font-size: 1.15rem; margin-top: 1px; flex-shrink: 0; }
                        .inst-title { font-size: 0.8rem; font-weight: 800; color: #1e1b4b; line-height: 1.2; }
                        .inst-desc { font-size: 0.68rem; color: #475569; font-weight: 600; margin-top: 2px; line-height: 1.25; }

                        /* Incentive Banner */
                        .incentive-banner {
                            background: linear-gradient(135deg, #065f46 0%, #047857 100%);
                            color: #ffffff;
                            padding: 6px 12px;
                            border-radius: 8px;
                            font-size: 0.74rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            margin-bottom: 4px;
                        }

                        /* Footer */
                        .iso-footer-table {
                            border-top: 1.5px solid #cbd5e1;
                            padding-top: 6px;
                            margin-top: 4px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 0.65rem;
                            color: #475569;
                            font-weight: 700;
                        }
                    </style>
                </head>
                <body>
                    <div class="no-print-bar">
                        <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u0648\u0633\u062A\u0631\u0627\u062A (${e.length} A4)</button>
                        <button class="close-btn" onclick="window.close()">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                    ${x}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                if (window.location.search.indexOf('noprint') === -1) {
                                    window.print();
                                }
                            }, 500);
                        };
                    <\/script>
                </body>
                </html>
            `),r.document.close();return}let s=2,d="120px",c=100,f="13px",o="11px";t==="3x4"?(s=3,d="110px",c=85,f="11.5px",o="9.5px"):t==="2x3"?(s=2,d="150px",c=125,f="14px",o="12px"):t==="2x2"?(s=2,d="180px",c=145,f="16px",o="13px"):(s=2,d="130px",c=105,f="13.5px",o="11.5px");const g=e.map((x,n)=>{const m=x.site,b=x.place||"\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0627\u0645",u=`${i}?factory=${encodeURIComponent(m)}&place=${encodeURIComponent(b)}`,h=this.generateQrDataUrl(u,c),v=encodeURIComponent(u);return`
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-shield-alt"></i> SafetyHub | ICAPP</span>
                        <span class="qr-card-badge">\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643 #${n+1}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-site" style="font-size:${f};">${Utils.escapeHTML(m)}</div>
                            <div class="qr-card-place" style="font-size:${o};">${Utils.escapeHTML(b)}</div>
                            <div class="qr-card-inst"><i class="fas fa-camera ml-1"></i> \u0627\u0645\u0633\u062D \u0644\u0644\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0641\u0648\u0631\u064A \u0639\u0646 \u062E\u0637\u0631 \u0648\u0634\u064A\u0643</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${h}" alt="QR" class="qr-code-img" style="width:${c}px; height:${c}px;" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=${c}&text=${v}';}">
                        </div>
                    </div>
                </div>
            `}).join("");r.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>\u0645\u0644\u0635\u0642\u0627\u062A \u0648\u0643\u0631\u0648\u062A QR \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 (${e.length} \u0645\u0648\u0642\u0639) - SafetyHub ICAPP</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 8mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                    body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; color: #0f172a; margin: 0; padding: 6px; background: #ffffff; }
                    .no-print-bar { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: #1e1b4b; color:#fff; padding: 10px 16px; border-radius: 10px; }
                    .print-btn { background: #f59e0b; color: #000; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 800; font-family: inherit; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
                    @media print { .no-print-bar { display: none !important; } }
                    
                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(${s}, 1fr);
                        gap: 6mm;
                    }
                    
                    .qr-card {
                        border: 2px solid #312e81;
                        border-radius: 12px;
                        padding: 10px 12px;
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: ${d};
                        page-break-inside: avoid;
                        break-inside: avoid;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.04);
                    }
                    
                    .qr-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #e0e7ff;
                        padding-bottom: 5px;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-tag { font-size: 0.72rem; font-weight: 800; color: #3730a3; }
                    .qr-card-badge { font-size: 0.65rem; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; }
                    
                    .qr-card-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }
                    
                    .qr-card-info { flex: 1; min-width: 0; }
                    .qr-card-site { font-weight: 900; color: #1e1b4b; line-height: 1.2; }
                    .qr-card-place { color: #4338ca; font-weight: 700; margin-top: 3px; line-height: 1.2; }
                    .qr-card-inst { font-size: 0.68rem; color: #64748b; margin-top: 6px; font-weight: 600; }
                    
                    .qr-card-img-wrap { flex-shrink: 0; }
                    .qr-code-img { border-radius: 6px; border: 1.5px solid #e2e8f0; display: block; }
                </style>
            </head>
            <body>
                <div class="no-print-bar">
                    <span style="font-weight:700;"><i class="fas fa-qrcode text-amber-300 ml-2"></i> \u0637\u0628\u0627\u0639\u0629 \u0645\u0644\u0635\u0642\u0627\u062A \u0627\u0644\u0640 QR \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629 (${e.length} \u0645\u0648\u0642\u0639)</span>
                    <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0622\u0646</button>
                </div>
                <div class="cards-grid">
                    ${g}
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                <\/script>
            </body>
            </html>
        `),r.document.close()}};typeof window<"u"&&(window.NearMiss=NearMiss),typeof module<"u"&&module.exports&&(module.exports=NearMiss);
