const Dashboard={contractorReportCache:new Map,contractorReportRequests:new Map,CONTRACTOR_REPORT_PDF_MAX_SECTION_ROWS:50,t(t,e){const r=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null;return r?r.t(t,null,e||t):e||t},dashboardCan(t){return t?typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()?!0:typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(t):!1:!1},_dashboardReportStatIdsForTotal(){return["incidents","nearmiss","periodic-inspections","training","violations","contractors","ptw","iso","electricity-consumption","water-consumption","gas-consumption"]},anyReportsStatisticVisibleForDashboard(){return this._dashboardReportStatIdsForTotal().some(t=>{const e=this.getModuleNameFromStatId(t);return e&&this.dashboardCan(e)})},reportsStatisticsMetricVisible(t){if(t==="total-reports")return this.anyReportsStatisticVisibleForDashboard();const e=this.getModuleNameFromStatId(t);return e?this.dashboardCan(e):!1},_setDashboardElVisibility(t,e){if(t){if(e)t.removeAttribute("hidden"),t.style.removeProperty("display");else{t.setAttribute("hidden","");try{t.style.setProperty("display","none","important")}catch{t.style.display="none"}}t.setAttribute("aria-hidden",e?"false":"true")}},applyDashboardLayoutPermissions(){const t=document.getElementById("dashboard-section");t&&(t.querySelectorAll("[data-dash-scope]").forEach(e=>{const a=(e.getAttribute("data-dash-scope")||"").split(",").map(i=>i.trim()).filter(Boolean),s=a.length>0&&a.some(i=>this.dashboardCan(i));this._setDashboardElVisibility(e,s)}),t.querySelectorAll(".reports-statistics-section .metric-card-frame[data-stat-id]").forEach(e=>{const r=e.getAttribute("data-stat-id"),a=r?this.reportsStatisticsMetricVisible(r):!1;this._setDashboardElVisibility(e,a)}))},normalizePTWStatus(t){if(window.PTW&&typeof window.PTW.normalizePermitStatus=="function")return window.PTW.normalizePermitStatus(t);const e=String(t||"").trim();return!e||e==="closed"||e==="Closed"||e==="CLOSED"||e==="\u0645\u063A\u0644\u0642\u0629"||e==="\u0627\u0643\u062A\u0645\u0644"?"\u0645\u063A\u0644\u0642":e},isPTWClosedStatus(t){if(window.PTW&&typeof window.PTW.isPermitClosedStatus=="function")return window.PTW.isPermitClosedStatus(t);const e=this.normalizePTWStatus(t);return e==="\u0645\u063A\u0644\u0642"||e==="\u0645\u0631\u0641\u0648\u0636"||e==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"||e==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"},getUnifiedPTWDataset(t){const e=n=>(n||[]).map(o=>({id:o?.permitId||o?.id,...o,status:this.normalizePTWStatus(o?.status),isFromRegistry:!0}));if(window.PTW&&typeof window.PTW.getRegistrySanitizedDataset=="function"){const n=window.PTW.getRegistrySanitizedDataset();if(n.length>0)return e(n)}if(window.PTW&&typeof window.PTW.initRegistry=="function")try{window.PTW.initRegistry(!0)}catch{}if(window.PTW&&typeof window.PTW.getPermitMetricsDataset=="function"){window.PTW._metricsDatasetCache=null;const n=window.PTW.getPermitMetricsDataset(),o=Array.isArray(n?.source)?n.source:[];if(o.length>0)return o.map(f=>({...f,status:this.normalizePTWStatus(f?.status)}))}const r=Array.isArray(AppState?.appData?.ptw)&&AppState.appData.ptw.length>0?AppState.appData.ptw:Array.isArray(t?.ptw)?t.ptw:[],a=Array.isArray(AppState?.appData?.ptwRegistry)&&AppState.appData.ptwRegistry.length>0?AppState.appData.ptwRegistry:Array.isArray(t?.ptwRegistry)?t.ptwRegistry:[],s=e(a),i=new Map;return r.forEach(n=>{if(!n||!n.id&&!n.permitId&&!n.paperPermitNumber)return;const o=String(n.id||n.permitId||n.paperPermitNumber);i.set(o,{...n,status:this.normalizePTWStatus(n.status)})}),s.forEach(n=>{if(!n||!n.id&&!n.permitId&&!n.paperPermitNumber)return;const o=String(n.id||n.permitId||n.paperPermitNumber);i.set(o,n)}),s.length>0?s:Array.from(i.values())},async load(){this.setupReportsStatisticsCardsClickHandlers();try{this.updateKPIs(),this.updateStats(),this.updateReportsStatistics()}catch{}try{await this.loadReportsWidget()}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0643\u0627\u0631\u062A \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",r);try{this.updateKPIs(),this.updateStats()}catch{}}this.loadRecentActivities(),this.loadUserTasksWidget(),this.loadEmployeeReportWidget();try{this.loadCharts()}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0631\u0633\u0648\u0645 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",r)}this.applyDashboardLayoutPermissions(),this.dashboardCan("safety-calendar")&&typeof SafetyCalendar<"u"&&typeof SafetyCalendar.ensureFullCalendarLoaded=="function"&&SafetyCalendar.ensureFullCalendarLoaded().catch(()=>{}),setTimeout(()=>{try{if(typeof SafetyCalendar<"u"&&typeof SafetyCalendar.loadDashboardWidget=="function"){const r=SafetyCalendar.loadDashboardWidget();r&&typeof r.catch=="function"&&r.catch(()=>{})}}catch{}},0),this.dashboardCan("sustainability")&&typeof Sustainability<"u"&&typeof Sustainability.loadResourceConsumptionFromSheets=="function"&&Sustainability.loadResourceConsumptionFromSheets().catch(()=>{});const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;e&&(e.applyI18n(document),e.applyLiteralTranslations(document))},getContractorReportDataSignature(){const t=AppState.appData||{};return["approvedContractors","violations","incidents","clinicVisits","clinicContractorVisits","contractorEvaluations","training","contractorTrainings","ptw","ptwRegistry","injuries"].map(r=>`${r}:${Array.isArray(t[r])?t[r].length:0}`).join("|")},getContractorReportCacheKey(t,e,r){const a=i=>typeof Utils<"u"&&typeof Utils.normalizeContractorIdentityValue=="function"?Utils.normalizeContractorIdentityValue(i):String(i||"").trim().toLowerCase();return[e,t?.code,t?.isoCode,t?.contractorId,t?.id,t?.companyName,t?.name,r].map(a).filter(Boolean).join("|")},renderContractorReportLoading(t,e){const r=document.getElementById("contractor-report-data"),a=document.getElementById("contractor-report-content"),s=document.getElementById("export-contractor-report-btn"),i=document.getElementById("employee-report-content");if(i&&i.classList.add("hidden"),!r||!a)return;const n=String(t?.companyName||t?.name||"").trim(),o=t?.approvalDate?Utils.formatDate(t.approvalDate):"",f=t?.expiryDate?Utils.formatDate(t.expiryDate):"",p=(l,m)=>`
            <div class="dashboard-stat-card" style="background: ${l}; border: 1px solid ${m}; border-radius: 12px; padding: 1rem; min-height: 128px; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);">
                <div style="height: 28px; width: 64px; margin: 0 auto 0.75rem; border-radius: 999px; background: rgba(255,255,255,0.8); animation: contractorReportPulse 1.1s ease-in-out infinite;"></div>
                <div style="height: 14px; width: 110px; margin: 0 auto; border-radius: 999px; background: rgba(255,255,255,0.75); animation: contractorReportPulse 1.1s ease-in-out infinite;"></div>
            </div>
        `;r.innerHTML=`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-hard-hat ml-2"></i>
                            ${Utils.escapeHTML(n||"\u0645\u0642\u0627\u0648\u0644")}
                        </h3>
                        <p class="text-gray-600">
                            <i class="fas fa-barcode ml-2"></i>
                            \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644: <strong>${Utils.escapeHTML(String(e||""))}</strong>
                        </p>
                        ${t?.entityType?`<p class="text-gray-600 mt-1"><i class="fas fa-tag ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646: ${Utils.escapeHTML(t.entityType)}</p>`:""}
                        ${t?.serviceType?`<p class="text-gray-600 mt-1"><i class="fas fa-tools ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629: ${Utils.escapeHTML(t.serviceType)}</p>`:""}
                        ${o?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-check ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: ${o}</p>`:""}
                        ${f?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-times ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621: ${f}</p>`:""}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${p("linear-gradient(145deg, #ccfbf1 0%, #99f6e4 100%)","#2dd4bf")}
                ${p("linear-gradient(145deg, #ffedd5 0%, #fed7aa 100%)","#fb923c")}
                ${p("linear-gradient(145deg, #fee2e2 0%, #fecaca 100%)","#f87171")}
                ${p("linear-gradient(145deg, #dbeafe 0%, #bfdbfe 100%)","#60a5fa")}
                ${p("linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%)","#34d399")}
                ${p("linear-gradient(145deg, #fce7f3 0%, #fbcfe8 100%)","#f472b6")}
                ${p("linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%)","#818cf8")}
            </div>
            <div class="rounded-lg border border-dashed border-gray-200 bg-white/80 p-6 text-center text-sm text-gray-500">
                \u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629...
            </div>
            <style>
                @keyframes contractorReportPulse {
                    0%, 100% { opacity: 0.45; }
                    50% { opacity: 1; }
                }
            </style>
        `,a.classList.remove("hidden"),s&&(s.disabled=!0)},renderContractorReportFromData(t){const e=document.getElementById("contractor-report-data"),r=document.getElementById("contractor-report-content"),a=document.getElementById("export-contractor-report-btn"),s=document.getElementById("employee-report-content");if(s&&s.classList.add("hidden"),!e||!r||!t)return;const i=t.contractor||{},n=String(t.contractorName||i.companyName||i.name||"").trim(),o=t.contractorCode||i.code||i.isoCode||i.contractorId||i.id||"",f=Array.isArray(t.violations)?t.violations:[],p=Array.isArray(t.incidents)?t.incidents:[],l=Array.isArray(t.training)?t.training:[],m=Array.isArray(t.clinicVisits)?t.clinicVisits:[],g=Array.isArray(t.contractorEvaluations)?t.contractorEvaluations:[],b=Array.isArray(t.ptwContractor)?t.ptwContractor:[],C=typeof t.ptwOpen=="number"?t.ptwOpen:0,y=typeof t.ptwClosed=="number"?t.ptwClosed:0,x=Array.isArray(t.injuriesContractor)?t.injuriesContractor:[],A=i.approvalDate?Utils.formatDate(i.approvalDate):"",T=i.expiryDate?Utils.formatDate(i.expiryDate):"";e.innerHTML=`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-hard-hat ml-2"></i>
                            ${Utils.escapeHTML(n||"\u0645\u0642\u0627\u0648\u0644")}
                        </h3>
                        <p class="text-gray-600">
                            <i class="fas fa-barcode ml-2"></i>
                            \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644: <strong>${Utils.escapeHTML(String(o))}</strong>
                        </p>
                        ${i.entityType?`<p class="text-gray-600 mt-1"><i class="fas fa-tag ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646: ${Utils.escapeHTML(i.entityType)}</p>`:""}
                        ${i.serviceType?`<p class="text-gray-600 mt-1"><i class="fas fa-tools ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629: ${Utils.escapeHTML(i.serviceType)}</p>`:""}
                        ${A?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-check ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: ${A}</p>`:""}
                        ${T?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-times ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621: ${T}</p>`:""}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ccfbf1 0%, #99f6e4 100%); border: 1px solid #2dd4bf; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(13, 148, 136, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0d9488; margin-bottom: 0.25rem;">${C}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u0641\u062A\u0648\u062D</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0f766e; margin-bottom: 0.25rem;">${y}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u063A\u0644\u0642</div>
                    <div style="font-size: 1.125rem; font-weight: 700; color: #134e4a; border-top: 1px solid #2dd4bf; padding-top: 0.5rem; margin-top: 0.5rem;">${b.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #134e4a;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A)</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fb923c; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(234, 88, 12, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ea580c; margin-bottom: 0.25rem;">${p.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u062D\u0648\u0627\u062F\u062B</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #c2410c; margin-bottom: 0.25rem;">${x.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u0625\u0635\u0627\u0628\u0627\u062A</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #9a3412;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #fee2e2 0%, #fecaca 100%); border: 1px solid #f87171; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #dc2626; margin-bottom: 0.25rem;">${f.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #991b1b;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%); border: 1px solid #34d399; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(5, 150, 105, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #059669; margin-bottom: 0.25rem;">${l.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #065f46;">\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #fce7f3 0%, #fbcfe8 100%); border: 1px solid #f472b6; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(219, 39, 119, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #db2777; margin-bottom: 0.25rem;">${m.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #9d174d;">\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%); border: 1px solid #818cf8; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(99, 102, 241, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #4f46e5; margin-bottom: 0.25rem;">${g.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #3730a3;">\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${f.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-circle ml-2"></i>\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${f.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${f.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(v.violationType||"")}</span>
                                            <span class="badge badge-${v.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":"warning"}">${v.severity||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML((v.actionTaken||"").substring(0,100))}</p>
                                        <p class="text-xs text-gray-500 mt-2">${v.violationDate?Utils.formatDate(v.violationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${f.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${f.length-5} \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${p.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${p.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${p.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(String(v.title||v.description||"").substring(0,60))}</span>
                                            <span class="badge badge-warning">${v.severity||""}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">${v.date?Utils.formatDate(v.date):""}</p>
                                    </div>
                                `).join("")}
                                ${p.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${p.length-5} \u062D\u0627\u062F\u062B \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${l.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-graduation-cap ml-2"></i>\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (${l.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${l.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(v.name||"")}</span>
                                            <span class="badge badge-success">${v.status||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0645\u062F\u0631\u0628: ${Utils.escapeHTML(v.trainer||"")}</p>
                                        <p class="text-xs text-gray-500 mt-2">${v.startDate?Utils.formatDate(v.startDate):""}</p>
                                    </div>
                                `).join("")}
                                ${l.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${l.length-5} \u0628\u0631\u0646\u0627\u0645\u062C \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${m.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-hospital ml-2"></i>\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (${m.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${m.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2 gap-2 flex-wrap">
                                            <span class="font-semibold">${Utils.escapeHTML(this._getContractorClinicVisitDisplayName_(v)||"\u2014")}</span>
                                            <span class="text-xs text-gray-500">${v.visitDate?Utils.formatDate(v.visitDate):""}</span>
                                        </div>
                                        <p class="text-sm text-gray-700">\u0627\u0644\u0633\u0628\u0628: ${Utils.escapeHTML(v.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</p>
                                        ${v.diagnosis?`<p class="text-sm text-gray-600">\u0627\u0644\u062A\u0634\u062E\u064A\u0635: ${Utils.escapeHTML(v.diagnosis)}</p>`:""}
                                        ${v.treatment?`<p class="text-sm text-gray-600">\u0627\u0644\u0639\u0644\u0627\u062C: ${Utils.escapeHTML(v.treatment)}</p>`:""}
                                    </div>
                                `).join("")}
                                ${m.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${m.length-5} \u0632\u064A\u0627\u0631\u0629 \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${g.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-clipboard-check ml-2"></i>\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A (${g.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${g.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(v.projectName||"\u062A\u0642\u064A\u064A\u0645")}</span>
                                            <span class="badge badge-info">${v.finalScore!=null?v.finalScore:""} ${v.finalRating||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0645\u0642\u064A\u0651\u0645: ${Utils.escapeHTML(v.evaluatorName||"")}</p>
                                        <p class="text-xs text-gray-500 mt-2">${v.evaluationDate?Utils.formatDate(v.evaluationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${g.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${g.length-5} \u062A\u0642\u064A\u064A\u0645 \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
            </div>
        `,r.classList.remove("hidden"),a&&(a.disabled=!1),window.currentContractorReport=t},async prefetchReportStatsSheetsForDashboard(t={}){const e=t&&t.forceRefresh===!0;try{if(!AppState||!AppState.appData||typeof GoogleIntegration>"u"||typeof GoogleIntegration.batchReadFromSheets!="function"||typeof GoogleIntegration._isBackendRpcConfigured!="function"||!GoogleIntegration._isBackendRpcConfigured())return;const r=300*1e3,a=Date.now(),s=this._reportStatsSheetsFetchedInSession===!0;if(!e&&s&&typeof this._reportStatsSheetsFetchedAt=="number"&&a-this._reportStatsSheetsFetchedAt<r)return;const i=[];this.dashboardCan("violations")&&(i.push(["Violations","violations"]),i.push(["ViolationApprovalRequests","violationApprovalRequests"])),this.dashboardCan("training")&&i.push(["Training","training"]),this.dashboardCan("ppe")&&i.push(["PPE","ppe"]),this.dashboardCan("behavior-monitoring")&&i.push(["BehaviorMonitoring","behaviorMonitoring"]),this.dashboardCan("clinic")&&(i.push(["SickLeave","sickLeave"]),i.push(["Medications","medications"]),i.push(["ClinicInventory","clinicInventory"])),this.dashboardCan("incidents")&&(i.push(["Incidents","incidents"]),i.push(["IncidentsRegistry","incidentsRegistry"])),this.dashboardCan("ptw")&&(i.push(["PTW","ptw"]),i.push(["PTWRegistry","ptwRegistry"])),this.dashboardCan("employees")&&(i.push(["Employees","employees"]),i.push(["ExternalWorkforceMonthly","externalWorkforceMonthly"]),i.push(["ApprovedContractors","approvedContractors"]));const n=[];if(i.forEach(([p])=>{n.includes(p)||n.push(p)}),n.length===0){this._reportStatsSheetsFetchedAt=a;return}const o=await GoogleIntegration.batchReadFromSheets(n,{timeout:45e3,batchSize:12}),f=o&&o.data&&typeof o.data=="object"?o.data:{};i.forEach(([p,l])=>{const m=f[p];Array.isArray(m)&&(AppState.appData[l]=m)}),this._reportStatsSheetsFetchedAt=a,this._reportStatsSheetsFetchedInSession=!0;try{this.updateStats(),this.updateReportsStatistics()}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u0623\u0648\u0631\u0627\u0642 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",r)}},async loadReportsWidget(t){const e=t===!0||t&&t.forceRefresh===!0,r=document.getElementById("dashboard-reports-widget");if(!r){try{await Promise.allSettled([this.prefetchClinicVisitsForDashboard({forceRefresh:e}),this.prefetchReportStatsSheetsForDashboard({forceRefresh:e})]),this.updateKPIs(),this.updateStats()}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u062F\u0648\u0646 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",i)}return}const a=this,s=async i=>{try{const n=await a.calculateStatsAsync(i||AppState.appData||{}),o=a.dashboardCan("clinic")?await a.getExpiringMedicationsAsync(i||{}):[];if(!document.contains(r))return;r.innerHTML=a.renderReportsWidget(n,o),a.animateStatCards(r),a.setupReportsWidgetEvents(r),a.applyDashboardLayoutPermissions();try{a.updateKPIs(),a.updateStats(),a.updateReportsStatistics()}catch{}}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard render error:",n)}};try{const i=this.prefetchClinicVisitsForDashboard({forceRefresh:e});typeof Clinic<"u"&&typeof Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded=="function"&&Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded().catch(()=>{}),await s(AppState.appData||{}),this.prefetchReportStatsSheetsForDashboard({forceRefresh:e}).then(()=>s(AppState.appData)).catch(n=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard prefetch failed:",n)}),i.then(()=>s(AppState.appData)).catch(n=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard clinic visits prefetch failed:",n)})}catch(i){Utils.safeError("dashboard load error:",i),r.innerHTML=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <button onclick="Dashboard.loadReportsWidget(true)" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `;try{this.updateKPIs(),this.updateStats()}catch{}}},renderReportsWidgetSkeleton(){return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="skeleton-icon" style="width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
                            <div class="skeleton-text" style="width: 200px; height: 24px; border-radius: 4px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
                        </div>
                        <button class="btn-icon" id="refresh-reports-btn" style="display: none;">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="stats-cards-grid mb-6">
                        ${Array.from({length:5}).map(()=>`
                            <div class="stat-card" style="opacity: 0.7;">
                                <div class="skeleton-icon" style="width: 48px; height: 48px; border-radius: 12px; margin: 0 auto 0.75rem; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
                                <div class="skeleton-text" style="width: 60px; height: 32px; border-radius: 4px; margin: 0 auto 0.5rem; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
                                <div class="skeleton-text" style="width: 100px; height: 16px; border-radius: 4px; margin: 0 auto; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
            <style>
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            </style>
        `},_isClinicContractorLikeVisit(t){if(!t||typeof t!="object")return!1;const e=String(t.personType||"").toLowerCase();return!!(e==="contractor"||e==="external"||String(t.contractorName||"").trim()||String(t.externalName||"").trim()||String(t.contractorWorkerName||"").trim())},getClinicVisitsTotalCount(t){if(!t||typeof t!="object")return 0;const e=Array.isArray(t.clinicVisits)?t.clinicVisits:[],r=Array.isArray(t.clinicContractorVisits)?t.clinicContractorVisits:[],a=Array.isArray(t.Clinic)?t.Clinic:[];if(typeof Clinic<"u"&&Clinic._visitsBackendFetchOk===!0&&e.length>0)return e.length;const i=e.some(o=>this._isClinicContractorLikeVisit(o));if(e.length>0&&i)return e.length;let n=e.length+r.length;return n===0&&a.length>0&&(n=a.length),n},prefetchClinicVisitsForDashboard(t={}){const e=t&&t.forceRefresh===!0;return!AppState||!AppState.appData||typeof this.dashboardCan=="function"&&!this.dashboardCan("clinic")||typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"||typeof GoogleIntegration._isBackendRpcConfigured=="function"&&!GoogleIntegration._isBackendRpcConfigured()||typeof Clinic>"u"||typeof Clinic.loadVisitsDataFromBackend!="function"||(e&&(this._clinicVisitsPrefetchedInSession=!1,this._clinicVisitsPrefetchPromise=null,Clinic._visitsBackendFetchOk=!1),!e&&this._clinicVisitsPrefetchedInSession===!0)?Promise.resolve():!e&&typeof Clinic.shouldFetchClinicVisitsFromBackend=="function"&&!Clinic.shouldFetchClinicVisitsFromBackend({forceRefresh:e})?(this._clinicVisitsPrefetchedInSession=!0,Promise.resolve()):this._clinicVisitsPrefetchPromise?this._clinicVisitsPrefetchPromise:(this._clinicVisitsPrefetchPromise=Clinic.loadVisitsDataFromBackend({forceRefresh:e}).then(()=>{this._clinicVisitsPrefetchedInSession=!0,typeof Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded=="function"&&Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded().catch(()=>{})}).catch(r=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",r)}).finally(()=>{this._clinicVisitsPrefetchPromise=null}),this._clinicVisitsPrefetchPromise)},async calculateStatsAsync(t){return new Promise(e=>{const r=()=>{const s=this._getDashboardIncidentsRecords(t).length;e({incidents:s,training:(t.training||[]).length,ptw:(t.ptw||[]).length,violations:(t.violations||[]).length,sickLeave:(t.sickLeave||[]).length,ppe:(t.ppe||[]).length,behaviorMonitoring:(t.behaviorMonitoring||[]).length,clinicVisits:this.getClinicVisitsTotalCount(t)})};window.requestIdleCallback?window.requestIdleCallback(r,{timeout:500}):setTimeout(r,50)})},async getExpiringMedicationsAsync(t){return new Promise(e=>{const r=()=>{const a=t.clinicMedications||t.clinicInventory||[],s=new Date,i=a.filter(n=>{if(!n||!n.expiryDate)return!1;const o=new Date(n.expiryDate);if(Number.isNaN(o.getTime()))return!1;const f=Math.ceil((o-s)/(1e3*60*60*24)),l=parseFloat(n.remainingQuantity??n.quantityAdded??n.quantity??0)>0;return f>=0&&f<=30&&l}).sort((n,o)=>{const f=new Date(n.expiryDate||0),p=new Date(o.expiryDate||0);return f-p});e(i)};window.requestIdleCallback?window.requestIdleCallback(r,{timeout:500}):setTimeout(r,50)})},renderReportsWidget(t,e){const r=new Date,a=[{id:"violations",key:"violations",labelKey:"dash.violations",labelFb:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",icon:"fa-ban",color:"yellow",module:"violations"},{id:"sickLeave",key:"sickLeave",labelKey:"dash.sickLeaves",labelFb:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",icon:"fa-calendar-times",color:"blue",module:"clinic"},{id:"training",key:"training",labelKey:"dash.trainingPrograms",labelFb:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",icon:"fa-graduation-cap",color:"green",module:"training"},{id:"ppe",key:"ppe",labelKey:"dash.ppeEquipment",labelFb:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",icon:"fa-hard-hat",color:"orange",module:"ppe"},{id:"behaviorMonitoring",key:"behaviorMonitoring",labelKey:"dash.behaviorMonitoring",labelFb:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A",icon:"fa-user-check",color:"purple",module:"behavior-monitoring"},{id:"clinicVisits",key:"clinicVisits",labelKey:"dash.clinicVisits",labelFb:"\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",icon:"fa-hospital",color:"pink",module:"clinic"},{id:"incidents",key:"incidents",labelKey:"dash.incidents",labelFb:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B",icon:"fa-exclamation-triangle",color:"red",module:"incidents"}];let s=0;const i=a.filter(g=>this.dashboardCan(g.module)).map(g=>{const b=typeof t[g.key]=="number"?t[g.key]:0,C=this.renderStatCard(g.id,b,this.t(g.labelKey,g.labelFb),g.icon,g.color,s);return s+=100,C}).join(""),n=this.dashboardCan("incidents"),o=this.dashboardCan("training"),f=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,p=[n?`
                            <button class="report-export-btn report-export-btn-incidents" data-report-type="incidents">
                                <div class="btn-content">
                                    <div class="btn-icon-wrapper">
                                        <i class="fas fa-file-pdf"></i>
                                    </div>
                                    <span class="btn-label">${this.t("dash.incidentsReport","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</span>
                                </div>
                                <span class="btn-description">${this.t("dash.incidentsReportDesc","\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0639\u0646 \u0627\u0644\u062D\u0648\u0627\u062F\u062B")}</span>
                            </button>`:"",o?`
                            <button class="report-export-btn report-export-btn-training" data-report-type="training">
                                <div class="btn-content">
                                    <div class="btn-icon-wrapper">
                                        <i class="fas fa-file-pdf"></i>
                                    </div>
                                    <span class="btn-label">${this.t("dash.trainingReport","\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628")}</span>
                                </div>
                                <span class="btn-description">${this.t("dash.trainingReportDesc","\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0639\u0646 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628")}</span>
                            </button>`:"",f?`
                            <button class="report-export-btn report-export-btn-full" data-report-type="full">
                                <div class="btn-content">
                                    <div class="btn-icon-wrapper">
                                        <i class="fas fa-file-pdf"></i>
                                    </div>
                                    <span class="btn-label">${this.t("dash.fullReport","\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644")}</span>
                                </div>
                                <span class="btn-description">${this.t("dash.fullReportDesc","\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</span>
                            </button>`:""].join(""),l=i.trim()?`<div class="stats-cards-grid" id="reports-stats-grid">${i}</div>`:`<p class="text-gray-500 text-sm px-2">${this.t("dash.noStatsForPermissions","\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629.")}</p>`,m=this.dashboardCan("clinic")?this.renderMedicationsAlerts(e,r):"";return`
            <div class="reports-widget-card">
                
                <!-- \u0627\u0644\u0647\u064A\u062F\u0631 -->
                <div class="card-header reports-widget-header">
                    <div class="header-content-wrapper">
                        <div class="header-title-section">
                            <div class="reports-icon-wrapper">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="title-text">
                                <h2>${this.t("dash.reportsStatistics","\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A")}</h2>
                                <p>${this.t("dash.reportsStatisticsSubtitle","\u0646\u0638\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645")}</p>
                            </div>
                        </div>
                        <div class="header-actions">
                            <button class="btn-icon reports-refresh-btn" id="refresh-reports-btn" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
                <div class="card-body">
                    <!-- \u0642\u0633\u0645 \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
                    <div class="stats-section">
                        <div class="section-header-row">
                            <h3>
                                <i class="fas fa-chart-pie"></i>
                                <span>${this.t("dash.quickStats","\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629")}</span>
                            </h3>
                        </div>
                        ${l}
                    </div>
                    
                    <!-- \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 -->
                    ${m}
                </div>
            </div>

        `},getModuleNameFromStatId(t){return{violations:"violations",contractors:"contractors",sickLeave:"clinic",training:"training",ppe:"ppe",behaviorMonitoring:"behavior-monitoring",clinicVisits:"clinic",incidents:"incidents",nearmiss:"nearmiss","periodic-inspections":"periodic-inspections",ptw:"ptw",iso:"iso","electricity-consumption":"sustainability","water-consumption":"sustainability","gas-consumption":"sustainability","clinic-injuries-employee":"clinic","clinic-injuries-contractor":"clinic"}[t]||null},renderStatCard(t,e,r,a,s,i){const n=typeof e=="number"?this.formatNumber(e):e;return`
            <div class="enhanced-stat-card stat-card-${s}" 
                 data-stat-id="${t}" 
                 data-stat-value="${e}"
                 data-clickable="true"
                 style="animation-delay: ${i}ms; cursor: pointer;">
                
                <div class="stat-card-icon">
                    <i class="fas ${a}"></i>
                </div>
                
                <div class="stat-card-value">
                    <span class="stat-value-number english-number" dir="ltr" style="direction: ltr; text-align: left; font-variant-numeric: tabular-nums;">${n}</span>
                </div>
                
                <div class="stat-card-label">
                    ${r}
                </div>
            </div>
        `},renderMedicationsAlerts(t,e){if(!(t&&t.length>0))return`
                <div class="medications-alerts-section" style="border-top: 1px dashed var(--border-color); padding-top: 1.75rem; margin-top: 2rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(99, 102, 241, 0.15)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: inset 0 0 0 1px rgba(124, 58, 237, 0.2);">
                                <i class="fas fa-pills" style="color: #7c3aed; font-size: 1.2rem;"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em;">
                                    ${this.t("dash.medicationsExpiryAlerts","\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}
                                </h3>
                                <p style="margin: 2px 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                                    \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0642\u0631\u064A\u0628\u0629 \u0645\u0646 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0641\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; backdrop-filter: blur(4px);">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                            <i class="fas fa-check" style="color: #ffffff; font-size: 1.3rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 0.95rem; font-weight: 700; color: #047857; margin-bottom: 0.2rem;">
                                \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u062F\u0648\u0627\u0626\u064A \u0622\u0645\u0646 \u0628\u0627\u0644\u0643\u0627\u0645\u0644
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
                                ${this.t("dash.noExpiringMedications30Days","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629 \u0623\u0648 \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u062E\u0644\u0627\u0644 30 \u064A\u0648\u0645\u0627\u064B.")}
                            </div>
                        </div>
                    </div>
                </div>
            `;const s=t.filter(i=>{const n=i.expiryDate?new Date(i.expiryDate):null;return n&&n<e}).length>0?"linear-gradient(135deg, #ef4444, #dc2626)":"linear-gradient(135deg, #f59e0b, #d97706)";return`
            <div class="medications-alerts-section" style="border-top: 1px dashed var(--border-color); padding-top: 1.75rem; margin-top: 2rem;">
                <!-- \u0627\u0644\u0647\u064A\u062F\u0631 -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.85rem;">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(99, 102, 241, 0.15)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.18); border: 1px solid rgba(124, 58, 237, 0.25);">
                            <i class="fas fa-pills" style="color: #7c3aed; font-size: 1.25rem;"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em;">
                                ${this.t("dash.medicationsExpiryAlerts","\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}
                            </h3>
                            <p style="margin: 2px 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                                \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0648\u0627\u062C\u0628 \u0645\u062A\u0627\u0628\u0639\u062A\u0647\u0627 \u0623\u0648 \u062A\u062C\u062F\u064A\u062F\u0647\u0627 \u0641\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="padding: 0.45rem 0.9rem; border-radius: 20px; font-weight: 700; font-size: 0.82rem; background: ${s}; color: #ffffff; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); display: flex; align-items: center; gap: 0.4rem;">
                            <i class="fas fa-exclamation-circle" style="font-size: 0.85rem;"></i>
                            <span>${t.length} \u062A\u0646\u0628\u064A\u0647</span>
                        </span>
                    </div>
                </div>

                <!-- \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 -->
                <div class="medications-list" style="display: flex; flex-direction: column; gap: 0.85rem;">
                    ${t.slice(0,5).map((i,n)=>{const o=i.expiryDate?new Date(i.expiryDate):null,f=o?Math.ceil((o-e)/(1e3*60*60*24)):null;let p={borderStrip:"linear-gradient(180deg, #6b7280, #4b5563)",bgTint:"var(--card-bg)",badgeBg:"linear-gradient(135deg, rgba(107, 114, 128, 0.12), rgba(75, 85, 99, 0.12))",badgeColor:"#4b5563",badgeBorder:"rgba(107, 114, 128, 0.25)",icon:"fa-calendar-times",statusText:"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"};f!==null&&(f<0?p={borderStrip:"linear-gradient(180deg, #ef4444, #b91c1c)",bgTint:"rgba(239, 68, 68, 0.03)",badgeBg:"linear-gradient(135deg, #ef4444, #dc2626)",badgeColor:"#ffffff",badgeBorder:"transparent",icon:"fa-exclamation-triangle",statusText:"\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629"}:f===0?p={borderStrip:"linear-gradient(180deg, #f97316, #c2410c)",bgTint:"rgba(249, 115, 22, 0.04)",badgeBg:"linear-gradient(135deg, #ea580c, #c2410c)",badgeColor:"#ffffff",badgeBorder:"transparent",icon:"fa-bell",statusText:"\u062A\u0646\u062A\u0647\u064A \u0627\u0644\u064A\u0648\u0645!"}:f<=7?p={borderStrip:"linear-gradient(180deg, #f59e0b, #d97706)",bgTint:"rgba(245, 158, 11, 0.03)",badgeBg:"linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))",badgeColor:"#b45309",badgeBorder:"rgba(245, 158, 11, 0.35)",icon:"fa-clock",statusText:`\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${f} \u0623\u064A\u0627\u0645`}:p={borderStrip:"linear-gradient(180deg, #eab308, #ca8a04)",bgTint:"rgba(234, 179, 8, 0.02)",badgeBg:"linear-gradient(135deg, rgba(234, 179, 8, 0.12), rgba(202, 138, 4, 0.12))",badgeColor:"#a16207",badgeBorder:"rgba(234, 179, 8, 0.3)",icon:"fa-hourglass-half",statusText:`\u064A\u062A\u0628\u0642\u0649 ${f} \u064A\u0648\u0645`});const l=i.remainingQuantity??i.quantityAdded??i.quantity,m=l!=null&&l!==""?`${l} ${i.unit||"\u0648\u062D\u062F\u0629"}`:null;return`
                            <div class="medication-alert-item" style="opacity: 0; transform: translateY(10px); animation: slideInUp 0.35s ease ${n*60}ms forwards; background: ${p.bgTint}; border: 1px solid var(--border-color); border-radius: 14px; padding: 1.1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                                
                                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0645\u0624\u0634\u0631 \u0627\u0644\u0644\u0648\u0646\u064A \u0627\u0644\u062C\u0627\u0646\u0628\u064A -->
                                <div style="position: absolute; top: 0; right: 0; bottom: 0; width: 5px; background: ${p.borderStrip}; border-radius: 0 14px 14px 0;"></div>
                                
                                <div style="flex: 1; min-width: 0; padding-right: 0.6rem;">
                                    <div style="font-size: 0.98rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; line-height: 1.35; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                        <span>${Utils.escapeHTML(i.name||"")}</span>
                                        ${i.batchNumber?`<span style="font-size: 0.72rem; font-weight: 600; padding: 0.15rem 0.45rem; border-radius: 6px; background: var(--bg-hover); color: var(--text-secondary); border: 1px solid var(--border-color);">\u062A\u0634\u063A\u064A\u0644\u0629 #${Utils.escapeHTML(i.batchNumber)}</span>`:""}
                                    </div>
                                    <div style="font-size: 0.82rem; color: var(--text-secondary); display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
                                        <span style="display: flex; align-items: center; gap: 0.4rem;">
                                            <i class="far fa-calendar-alt" style="color: #64748b; font-size: 0.85rem;"></i>
                                            <strong style="font-weight: 600;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</strong> ${i.expiryDate?Utils.formatDate(i.expiryDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}
                                        </span>
                                        ${m?`
                                        <span style="display: flex; align-items: center; gap: 0.4rem; color: #475569;">
                                            <i class="fas fa-boxes" style="color: #64748b; font-size: 0.82rem;"></i>
                                            <strong style="font-weight: 600;">\u0627\u0644\u0645\u062A\u0628\u0642\u064A:</strong> ${Utils.escapeHTML(m)}
                                        </span>`:""}
                                    </div>
                                </div>
                                <div style="margin-right: 0.75rem; flex-shrink: 0;">
                                    <span style="font-weight: 700; padding: 0.55rem 0.95rem; border-radius: 10px; font-size: 0.82rem; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.45rem; background: ${p.badgeBg}; color: ${p.badgeColor}; border: 1px solid ${p.badgeBorder}; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                                        <i class="fas ${p.icon}" style="font-size: 0.85rem;"></i>
                                        <span>${p.statusText}</span>
                                    </span>
                                </div>
                            </div>
                        `}).join("")}

                    ${t.length>5?`
                    <div style="text-align: center; margin-top: 0.5rem;">
                        <span style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600; background: var(--bg-hover); color: var(--text-secondary); border: 1px solid var(--border-color);">
                            <i class="fas fa-info-circle" style="color: #6366f1;"></i>
                            \u064A\u0648\u062C\u062F ${t.length-5} \u0623\u062F\u0648\u064A\u0629 \u0623\u062E\u0631\u0649 \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629
                        </span>
                    </div>`:""}
                </div>
            </div>
        `},animateStatCards(t){const e=t.querySelectorAll(".reports-stat-card"),r=t.querySelectorAll(".enhanced-stat-card"),a=[...e,...r],s=this;a.forEach((i,n)=>{if(i.dataset.animated==="true")return;i.dataset.animated="true";let o=null;i.classList.contains("enhanced-stat-card")||(i.addEventListener("mouseenter",function(){o&&cancelAnimationFrame(o),o=requestAnimationFrame(()=>{this.style.transform="translateY(-8px) scale(1.02)",this.style.boxShadow="0 12px 24px rgba(0,0,0,0.15)",this.style.transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease";const p=this.querySelector(".stat-card-top-bar");p&&(p.style.height="6px",p.style.transition="height 0.3s ease");const l=this.querySelector(".stat-card-icon");l&&(l.style.transform="scale(1.1) rotate(5deg)",l.style.transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)")})},{passive:!0}),i.addEventListener("mouseleave",function(){o&&cancelAnimationFrame(o),o=requestAnimationFrame(()=>{this.style.transform="",this.style.boxShadow="";const p=this.querySelector(".stat-card-top-bar");p&&(p.style.height="");const l=this.querySelector(".stat-card-icon");l&&(l.style.transform="")})},{passive:!0}));const f=i.querySelector(".stat-value-number");if(f){const p=parseInt(i.dataset.statValue)||0;s.animateValue(f,0,p,1e3+n*100)}}),this.setupStatCardsClickHandlers(t)},animateValue(t,e,r,a){let s=null;const i=n=>{s||(s=n);const o=Math.min((n-s)/a,1),f=Math.floor(o*(r-e)+e);t.textContent=f.toLocaleString("en-US"),o<1&&window.requestAnimationFrame(i)};window.requestAnimationFrame(i)},setupReportsWidgetEvents(t){const e=t.querySelector("#refresh-reports-btn");e&&e.addEventListener("click",async()=>{const a=e.querySelector("i");a&&(a.style.transform="rotate(360deg)",setTimeout(()=>{a.style.transform="rotate(0deg)"},500)),await this.loadReportsWidget({forceRefresh:!0})}),t.querySelectorAll(".report-export-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.reportType;typeof Reports<"u"&&Reports.generateAndExport?Reports.generateAndExport(s):Notification.warning("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B")}),a.addEventListener("mouseenter",function(){this.style.transform="translateY(-2px)",this.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)"}),a.addEventListener("mouseleave",function(){this.style.transform="translateY(0)",this.style.boxShadow=""})}),this.setupStatCardsClickHandlers(t)},setupReportsStatisticsCardsClickHandlers(){const t=document.querySelector(".reports-statistics-section");if(!t)return;t.querySelectorAll('.metric-card-frame[data-clickable="true"]').forEach(r=>{r.dataset.clickHandlerAdded!=="true"&&(r.dataset.clickHandlerAdded="true",r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=r.getAttribute("data-stat-id");if(!s)return;const i=this.getModuleNameFromStatId(s);if(!i)return;if(!(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(i):(AppState?.currentUser?.role||"").toLowerCase()==="admin")){typeof Notification<"u"&&typeof Notification.warning=="function"?Notification.warning("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645"):alert("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645");return}typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection(i):typeof window<"u"&&window.location&&(window.location.hash=i)}))})},setupStatCardsClickHandlers(t){t.querySelectorAll('.enhanced-stat-card[data-clickable="true"]').forEach(r=>{r.dataset.clickHandlerAdded!=="true"&&(r.dataset.clickHandlerAdded="true",r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=r.getAttribute("data-stat-id");if(!s)return;const i=this.getModuleNameFromStatId(s);if(!i)return;if(!(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(i):(AppState?.currentUser?.role||"").toLowerCase()==="admin")){typeof Notification<"u"&&typeof Notification.warning=="function"?Notification.warning("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645"):alert("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645");return}typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection(i):typeof window<"u"&&window.location&&(window.location.hash=i)}))})},loadEmployeeReportWidget(){const t=document.getElementById("employee-report-widget");if(!t)return;const e=this.dashboardCan("employees"),r=this.dashboardCan("contractors");if(!e&&!r){t.innerHTML="",t.hidden=!0;return}t.hidden=!1;const a=e&&r?this.t("dash.queryComprehensiveReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 (\u0645\u0648\u0638\u0641 / \u0645\u0642\u0627\u0648\u0644)"):e?this.t("dash.queryEmployeeReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0645\u0648\u0638\u0641"):this.t("dash.queryContractorReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0645\u0642\u0627\u0648\u0644"),s=e?`
                        <div class="dashboard-query-block dashboard-query-employee" style="flex: 0 0 auto; min-width: 260px; display: flex; align-items: flex-end; gap: 0.75rem; padding: 1.25rem 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; box-shadow: 0 1px 3px rgba(59, 130, 246, 0.12);">
                            <div style="flex: 1; min-width: 0;">
                                <label class="block text-sm font-semibold mb-2" style="color: #1e40af;">
                                    <i class="fas fa-id-card ml-2"></i>
                                    \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                </label>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="text" id="employee-code-search" class="form-input"
                                        placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"
                                        style="width: 130px; min-width: 100px; padding: 0.625rem 0.75rem; border-radius: 8px; font-size: 0.95rem; text-align: center; border: 1px solid #93c5fd;">
                                    <button id="search-employee-btn" class="btn-primary" style="width: 44px; height: 44px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; background: #2563eb;">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div style="flex-shrink: 0;">
                                <button id="export-employee-report-btn" class="btn-success" disabled style="height: 44px; padding: 0 1rem; display: flex; align-items: center; gap: 0.25rem; border-radius: 8px; background: #059669;">
                                    <i class="fas fa-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 PDF
                                </button>
                            </div>
                        </div>`:"",i=r?`
                        <div class="dashboard-query-block dashboard-query-contractor" style="flex: 0 0 auto; min-width: 260px; display: flex; align-items: flex-end; gap: 0.75rem; padding: 1.25rem 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #fcd34d; box-shadow: 0 1px 3px rgba(245, 158, 11, 0.12);">
                            <div style="flex: 1; min-width: 0;">
                                <label class="block text-sm font-semibold mb-2" style="color: #b45309;">
                                    <i class="fas fa-barcode ml-2"></i>
                                    \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629
                                </label>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="text" id="contractor-code-search" class="form-input"
                                        placeholder="\u0623\u062F\u062E\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629"
                                        style="width: 190px; min-width: 140px; padding: 0.625rem 0.75rem; border-radius: 8px; font-size: 0.95rem; border: 1px solid #fcd34d;">
                                    <button id="search-contractor-btn" class="btn-primary" style="width: 44px; height: 44px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; background: #d97706;">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div style="flex-shrink: 0;">
                                <button id="export-contractor-report-btn" class="btn-success" disabled style="height: 44px; padding: 0 1rem; display: flex; align-items: center; gap: 0.25rem; border-radius: 8px; background: #059669;">
                                    <i class="fas fa-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 PDF
                                </button>
                            </div>
                        </div>`:"";if(t.innerHTML=`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-user-search ml-2"></i>
                        ${a}
                    </h2>
                </div>
                <div class="card-body">
                    <div class="mb-4" style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1.25rem 3rem;">
                        ${s}
                        ${i}
                    </div>
                    <div id="employee-report-content" class="hidden">
                        <div id="employee-report-data"></div>
                    </div>
                    <div id="contractor-report-content" class="hidden">
                        <div id="contractor-report-data"></div>
                    </div>
                </div>
            </div>
        `,e){const n=document.getElementById("search-employee-btn"),o=document.getElementById("export-employee-report-btn"),f=document.getElementById("employee-code-search");n&&n.addEventListener("click",async()=>{const p=f?.value.trim();p?await this.generateEmployeeReport(p):Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}),f&&f.addEventListener("keypress",async p=>{if(p.key==="Enter"){const l=f.value.trim();l&&await this.generateEmployeeReport(l)}}),o&&o.addEventListener("click",()=>{const p=f?.value.trim();p&&this.exportEmployeeReportPDF(p)})}if(r){const n=document.getElementById("search-contractor-btn"),o=document.getElementById("export-contractor-report-btn"),f=document.getElementById("contractor-code-search");n&&n.addEventListener("click",async()=>{const p=f?.value.trim();p?await this.generateContractorReport(p):Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629")}),f&&f.addEventListener("keypress",async p=>{if(p.key==="Enter"){const l=f.value.trim();l&&await this.generateContractorReport(l)}}),o&&o.addEventListener("click",()=>{const p=f?.value.trim();p&&this.exportContractorReportPDF(p)})}},async ensureEmployeeReportData(){AppState.appData||(AppState.appData={});const t=AppState.appData,e={Violations:"violations",Training:"training",TrainingAttendance:"trainingAttendance",ClinicVisits:"clinicVisits",PPE:"ppe",BehaviorMonitoring:"behaviorMonitoring",Incidents:"incidents",SickLeave:"sickLeave"},r=[];for(const[a,s]of Object.entries(e)){const i=t[s];(!Array.isArray(i)||i.length===0)&&r.push({sheetName:a,key:s})}typeof Loading<"u"&&Loading.show&&Loading.show();try{for(const{sheetName:a,key:s}of r)try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)continue;const i=await GoogleIntegration.readFromSheets(a);Array.isArray(i)&&(AppState.appData[s]=i,Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a} (${i.length} \u0633\u062C\u0644)`))}catch(i){Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${a}:`,i?.message||i)}if((!t.training||t.training.length===0)&&typeof GoogleIntegration<"u"&&(GoogleIntegration.sendToAppsScript||GoogleIntegration.sendRequest))try{const a=GoogleIntegration.sendToAppsScript||(n=>GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:n.action||n.method,data:n.data||{}})),s=await(GoogleIntegration.sendToAppsScript?GoogleIntegration.sendToAppsScript("getAllTrainings",{}):Promise.resolve(GoogleIntegration.sendRequest({action:"getAllTrainings",data:{}}))),i=s&&(s.data||s.value)&&(Array.isArray(s.data)?s.data:Array.isArray(s.value)?s.value:Array.isArray((s.value||{}).data)?(s.value||{}).data:null);Array.isArray(i)&&i.length>0&&(AppState.appData.training=i,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0639\u0628\u0631 getAllTrainings"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllTrainings:",a?.message||a)}if((!t.trainingAttendance||t.trainingAttendance.length===0)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const a=await GoogleIntegration.sendRequest({action:"getAllTrainingAttendance",data:{}}),s=a&&a.value&&Array.isArray(a.value.data)&&a.value.data?a.value.data:a&&Array.isArray(a.data)?a.data:Array.isArray(a&&a.value)?a.value:null;Array.isArray(s)&&(AppState.appData.trainingAttendance=s,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0639\u0628\u0631 getAllTrainingAttendance"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllTrainingAttendance:",a?.message||a)}if(e.PPE&&(!t.ppe||t.ppe.length===0)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const a=await GoogleIntegration.sendToAppsScript("getAllPPE",{});a&&a.success&&Array.isArray(a.data)&&(AppState.appData.ppe=a.data,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 PPE \u0639\u0628\u0631 getAllPPE"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllPPE:",a?.message||a)}}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}},async ensureContractorReportData(){AppState.appData||(AppState.appData={});const t=AppState.appData,e={Violations:"violations",Incidents:"incidents",SickLeave:"sickLeave",ClinicVisits:"clinicVisits",ClinicContractorVisits:"clinicContractorVisits",ContractorEvaluations:"contractorEvaluations",Training:"training",ContractorTrainings:"contractorTrainings",PTW:"ptw",PTWRegistry:"ptwRegistry",Injuries:"injuries",ClinicContractorInjuries:"clinicContractorInjuries"},r=[];for(const[a,s]of Object.entries(e)){const i=t[s];(!Array.isArray(i)||i.length===0)&&r.push({sheetName:a,key:s})}if(r.length){typeof Loading<"u"&&Loading.show&&Loading.show();try{for(const{sheetName:a,key:s}of r)try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)continue;const i=await GoogleIntegration.readFromSheets(a);Array.isArray(i)&&(AppState.appData[s]=i,Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a} (${i.length} \u0633\u062C\u0644)`))}catch(i){Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${a}:`,i?.message||i)}}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},async generateEmployeeReport(t){AppState.appData||(AppState.appData={});const e=AppState.appData,r=Array.isArray(e.employees)?e.employees:Array.isArray(e.Employees)?e.Employees:[];let a=null;const s=String(t||"").trim(),i=(d,h)=>{if(!h)return!1;const $=String(h).trim();if(!$)return!1;const w=String(d.employeeNumber??"").trim(),k=String(d.sapId??"").trim(),M=String(d.employeeCode??"").trim(),R=String(d.id??"").trim(),W=String(d.code??"").trim();if(w===$||k===$||M===$||R===$||W===$||w.toLowerCase()===$.toLowerCase()||k.toLowerCase()===$.toLowerCase())return!0;const _=Number($);return!!(!isNaN(_)&&isFinite(_)&&(Number(w)===_||Number(k)===_||Number(M)===_||Number(R)===_||Number(W)===_||String(Number(w))===$||String(Number(k))===$||w===String(_)||k===String(_)))};if(a=r.find(d=>i(d,t)),!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F");const d=document.getElementById("employee-report-content");d&&d.classList.add("hidden");return}const n=d=>{if(!d)return null;const h=String(d).trim();return h?h.toLowerCase():null},o=new Set;if([a.id,a.employeeNumber,a.sapId,a.employeeCode,a.code,a.cardId,a.nationalId].forEach(d=>{if(d==null||d==="")return;const h=String(d).trim();if(!h)return;const $=n(d);$&&o.add($),o.add(h);const w=Number(d);!isNaN(w)&&isFinite(w)&&o.add(String(w))}),s){o.add(s),o.add(s.toLowerCase());const d=Number(s);!isNaN(d)&&isFinite(d)&&o.add(String(d))}const f=d=>d?[d.employeeCode,d.employeeNumber,d.employeeId,d.id,d.code,d.sapId,d.cardId,d.nationalId,d.participantCode].some($=>{if($==null||$==="")return!1;const w=String($).trim();if(!w)return!1;const k=n($);if(o.has(k)||o.has(w))return!0;const M=Number($);return!!(!isNaN(M)&&isFinite(M)&&o.has(String(M)))}):!1,p=d=>{if(d==null||d==="")return!1;const h=String(d).trim();if(!h)return!1;if(o.has(h)||o.has(n(h)))return!0;const $=Number(d);return!isNaN($)&&isFinite($)&&o.has(String($))};await this.ensureEmployeeReportData();const l=AppState.appData||{},m=(d,h)=>{const $=l[d]||l[h]||[];return Array.isArray($)?$:[]},g=m("violations").filter(d=>d.personType==="contractor"||d.contractorName?!1:f(d)),b=m("sickLeave").filter(d=>d.personType==="contractor"||d.contractorName?!1:f(d)),C=m("training").concat(m("trainingRecords")),x=m("trainingAttendance").filter(d=>f(d)),A=d=>{if(!d||typeof d!="object")return!1;const h={...d,code:d.code||d.participantCode,employeeCode:d.employeeCode||d.participantCode,employeeNumber:d.employeeNumber||d.participantCode};if((d.employeeCode!=null&&d.employeeCode!==""||d.employeeNumber!=null&&d.employeeNumber!==""||d.employeeId!=null&&d.employeeId!==""||d.participantCode!=null&&d.participantCode!=="")&&f(h))return!0;let $=d.participants;if(typeof $=="string")try{const w=JSON.parse($);$=Array.isArray(w)?w:w&&Array.isArray(w.participants)?w.participants:[]}catch{$=[]}return $&&Array.isArray($)?$.some(w=>!w||typeof w!="object"||w.personType==="contractor"||w.type==="contractor"||w.contractorName?!1:f(w)):!1},v=[...C.filter(A),...x.map(d=>({id:d.id,name:d.topic||d.trainingType||"\u062A\u062F\u0631\u064A\u0628",trainer:d.trainer||"",startDate:d.date||d.attendanceDate||d.createdAt,status:"\u0645\u0643\u062A\u0645\u0644"}))],I=m("ppe").filter(d=>f(d)),N=m("behaviorMonitoring").filter(d=>f(d)),L=m("clinicVisits","Clinic").filter(d=>d.personType==="contractor"||d.contractorName?!1:f(d)),u=m("incidents").filter(d=>d.personType==="contractor"||d.contractorName?!1:!!(f(d)||d.affectedCode&&p(d.affectedCode)||d.entries&&Array.isArray(d.entries)&&d.entries.some(h=>f(h)||p(h?.affectedCode||h?.employeeCode)))),S=document.getElementById("employee-report-data"),U=document.getElementById("employee-report-content"),P=document.getElementById("export-employee-report-btn"),E=document.getElementById("contractor-report-content");if(E&&E.classList.add("hidden"),U&&U.classList.add("hidden"),!S){Notification.error("\u0639\u0646\u0635\u0631 \u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}S.innerHTML=`
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-user ml-2"></i>
                            ${Utils.escapeHTML(a.name||"")}
                        </h3>
                        <p class="text-gray-600">
                            <i class="fas fa-id-card ml-2"></i>
                            \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A: <strong>${Utils.escapeHTML(a.employeeNumber||a.sapId||a.employeeCode||t)}</strong>
                        </p>
                        ${a.department?`<p class="text-gray-600 mt-1"><i class="fas fa-building ml-2"></i>\u0627\u0644\u0642\u0633\u0645: ${Utils.escapeHTML(a.department)}</p>`:""}
                        ${a.position?`<p class="text-gray-600 mt-1"><i class="fas fa-briefcase ml-2"></i>\u0627\u0644\u0645\u0646\u0635\u0628: ${Utils.escapeHTML(a.position)}</p>`:""}
                    </div>
                    ${a.photo?(()=>{const d=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a.photo):{canonical:String(a.photo),displaySrc:String(a.photo),needsProxy:!1,proxyFileId:""},h=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(d):"";return`<img src="${Utils.escapeHTML(d.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641"${h} class="dash-emp-photo w-24 h-24 rounded-full object-cover border-2 border-blue-500">`})():""}
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">${g.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                </div>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${b.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</div>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${v.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-yellow-600 mb-2">${I.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629</div>
                </div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${N.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A</div>
                </div>
                <div class="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-pink-600 mb-2">${L.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
                </div>
                <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">${u.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u062D\u0648\u0627\u062F\u062B</div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${g.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-circle ml-2"></i>\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${g.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${g.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(d.violationType||"")}</span>
                                            <span class="badge badge-${d.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":"warning"}">${d.severity||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML((d.actionTaken||"").substring(0,100))}</p>
                                        <p class="text-xs text-gray-500 mt-2">${d.violationDate?Utils.formatDate(d.violationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${g.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${g.length-5} \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
                
                ${b.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-calendar-times ml-2"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${b.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${b.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">\u0645\u0646 ${d.startDate?Utils.formatDate(d.startDate):""} \u0625\u0644\u0649 ${d.endDate?Utils.formatDate(d.endDate):""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML(d.reason||"")}</p>
                                        ${d.medicalNotes?`<p class="text-xs text-gray-500 mt-2">${Utils.escapeHTML(d.medicalNotes)}</p>`:""}
                                    </div>
                                `).join("")}
                                ${b.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${b.length-5} \u0625\u062C\u0627\u0632\u0629 \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
                
                ${v.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-graduation-cap ml-2"></i>\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (${v.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${v.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(d.name||"")}</span>
                                            <span class="badge badge-${d.status==="\u0645\u0643\u062A\u0645\u0644"?"success":"warning"}">${d.status||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0645\u062F\u0631\u0628: ${Utils.escapeHTML(d.trainer||"")}</p>
                                        <p class="text-xs text-gray-500 mt-2">${d.startDate?Utils.formatDate(d.startDate):""}</p>
                                    </div>
                                `).join("")}
                                ${v.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${v.length-5} \u0628\u0631\u0646\u0627\u0645\u062C \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
                
                ${I.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-hard-hat ml-2"></i>\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (${I.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${I.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(d.equipmentType||"")}</span>
                                            <span class="badge badge-success">${d.receiptNumber||d.id}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0643\u0645\u064A\u0629: ${d.quantity||0}</p>
                                        <p class="text-xs text-gray-500 mt-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645: ${d.receiptDate?Utils.formatDate(d.receiptDate):""}</p>
                                    </div>
                                `).join("")}
                                ${I.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${I.length-5} \u0627\u0633\u062A\u0644\u0627\u0645 \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
                
                ${N.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-user-check ml-2"></i>\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A (${N.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${N.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(d.behaviorType||"")}</span>
                                            <span class="badge badge-${d.rating>=4?"success":d.rating>=3?"warning":"danger"}">${d.rating||0}/5</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML((d.description||"").substring(0,100))}</p>
                                        <p class="text-xs text-gray-500 mt-2">${d.date?Utils.formatDate(d.date):""}</p>
                                    </div>
                                `).join("")}
                                ${N.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${N.length-5} \u062A\u0633\u062C\u064A\u0644 \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
                
                ${L.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-hospital ml-2"></i>\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (${L.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${L.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(d.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</span>
                                        </div>
                                        ${d.diagnosis?`<p class="text-sm text-gray-600">\u0627\u0644\u062A\u0634\u062E\u064A\u0635: ${Utils.escapeHTML(d.diagnosis)}</p>`:""}
                                        ${d.treatment?`<p class="text-sm text-gray-600">\u0627\u0644\u0639\u0644\u0627\u062C: ${Utils.escapeHTML(d.treatment)}</p>`:""}
                                        <p class="text-xs text-gray-500 mt-2">${d.visitDate?Utils.formatDate(d.visitDate):""}</p>
                                    </div>
                                `).join("")}
                                ${L.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${L.length-5} \u0632\u064A\u0627\u0631\u0629 \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
            </div>
        `,U.classList.remove("hidden"),P&&(P.disabled=!1),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(S,{onFetchFail:d=>{try{const h=document.createElement("div");h.className="w-24 h-24 rounded-full bg-gray-200 border-2 border-blue-500 flex items-center justify-center",h.innerHTML='<i class="fas fa-user text-gray-500 text-2xl"></i>',d.replaceWith(h)}catch{}}});const H=a.employeeNumber||a.sapId||a.id||a.employeeCode||t;window.currentEmployeeReport={employee:a,employeeCode:H,employeeIdentifiers:Array.from(o),violations:g,sickLeave:b,training:v,ppe:I,behaviorMonitoring:N,clinicVisits:L,incidents:u}},employeeReportMatchesSearchCode(t,e){if(!t||e==null||e==="")return!1;const r=String(e).trim();if(!r)return!1;if(String(t.employeeCode||"").trim()===r)return!0;if(Array.isArray(t.employeeIdentifiers)){const a=r.toLowerCase();if(t.employeeIdentifiers.includes(r)||t.employeeIdentifiers.includes(a))return!0;const s=Number(r);if(!isNaN(s)&&isFinite(s)&&t.employeeIdentifiers.includes(String(s)))return!0}return!1},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",async _loadReportPdfLib_(t,e){return e()?!0:new Promise(r=>{const a=document.querySelector(`script[src="${t}"]`);if(a){const i=()=>r(!!e());a.addEventListener("load",i,{once:!0}),setTimeout(i,4e3);return}const s=document.createElement("script");s.src=t,s.async=!0,s.onload=()=>r(!!e()),s.onerror=()=>r(!1),document.head.appendChild(s)})},async _ensureReportPdfLibs_(){const t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return t&&e},_stripScriptsFromHtml_(t){return String(t||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("dash-cairo-font-link")){const t=document.createElement("link");t.id="dash-cairo-font-link",t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(t)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(t){const e=`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="dashboard-arabic-pdf-fix">
    html, body {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    body *, .report-wrapper, .report-wrapper * {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
    }
    h1, h2, h3, th, td, .meta-label, .meta-value {
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-break: normal !important;
    }
    .report-header .company-brand .company-name,
    .export-header .company-name,
    .att-report-brand-name,
    .ptw-paper-header-company,
    .card-header .company-name {
        white-space: nowrap !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
    }
    .report-header {
        grid-template-columns: minmax(240px, 1.45fr) minmax(280px, 1.75fr) minmax(88px, 120px) !important;
        gap: 14px !important;
    }
    table, thead, tbody, tr, th, td { direction: rtl !important; }
</style>`,r=this._stripScriptsFromHtml_(t);return r?r.includes("</head>")?r.replace("</head>",`${e}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${e}</head><body>${r}</body></html>`:e},async _waitArabicPdfFontsReady_(t){if(!(!t||!t.fonts||typeof t.fonts.load!="function"))try{await Promise.all([t.fonts.load("400 12px Cairo"),t.fonts.load("600 14px Cairo"),t.fonts.load("700 18px Cairo"),t.fonts.load("800 24px Cairo")]),await t.fonts.ready}catch{}},async _captureHtmlToCanvas_(t,e={}){const a={scale:this._getAdaptivePdfCanvasScale_(t,e.scale||2.5),backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(t.scrollWidth,900),windowHeight:Math.max(t.scrollHeight,1),scrollX:0,scrollY:0},s=[{...a,useCORS:!0,allowTaint:!1},{...a,useCORS:!0,allowTaint:!0},{...a,useCORS:!1,allowTaint:!0}];let i=null;for(let n=0;n<s.length;n++)try{const o=await html2canvas(t,s[n]);if(o&&o.width>0&&o.height>0)return o}catch(o){i=o}if(i)throw i;return null},async _downloadHtmlReportAsPdf(t,e="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const a=this._prepareArabicPdfHtml_(t),s=String(e||"report.pdf").toLowerCase().endsWith(".pdf")?String(e):`${String(e)}.pdf`,i=document.createElement("iframe");i.setAttribute("aria-hidden","true"),i.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(i);try{i.srcdoc=a,await new Promise(m=>{i.onload=m,i.onerror=m,setTimeout(m,6e3)});const n=i.contentDocument||i.contentWindow?.document;if(!n)return!1;await this._waitArabicPdfFontsReady_(n);const o=Array.from(n.images||[]);await Promise.all(o.map(m=>new Promise(g=>{if(m.complete)return g();m.onload=g,m.onerror=g,setTimeout(g,3e3)})));const f=n.querySelector(".report-wrapper")||n.body;if(!f)return!1;const p=await this._captureHtmlToCanvas_(f);if(!p)return!1;const l=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return l?(Utils.PdfExport.appendCanvasAsPdfPages(l,p,{marginMm:8}),Utils.PdfExport.savePdf(l,s),!0):!1}catch(n){return Utils.safeWarn&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",n),!1}finally{i.remove()}},_getAdaptivePdfCanvasScale_(t,e=2.5){const r=Math.max(t?.scrollHeight||0,1),a=Math.max(t?.scrollWidth||900,900),s=14e3,i=9e7;let n=Number(e)||2.5;for(;n>.85&&(a*n>s||r*n>s||a*r*n*n>i);)n-=.25;return Math.max(.85,Math.round(n*100)/100)},_buildPdfSectionTable_(t,e,r,a,s,i,n){const o=Array.isArray(s)?s:[],f=Math.max(1,Number(n)||50),p=o.slice(0,f),l=Math.max(0,o.length-p.length),m=p.map(i).join(""),g=o.length?l>0?` (${o.length} \u2014 \u0639\u0631\u0636 ${p.length} \u0641\u064A PDF)`:` (${o.length})`:"";return t(`${e}${g}`,r,a,m)},_getContractorClinicVisitDisplayName_(t){return!t||typeof t!="object"?"":String(t.contractorWorkerName||t.personName||t.employeeName||t.externalName||t.name||"").replace(/\s+/g," ").trim()},buildEmployeeReportPdfContent(t,e){const r=t.employee||{},a=this._AR_PDF_TEXT_STYLE_,s=u=>Utils.escapeHTML(String(u??"")),i=u=>u&&typeof Utils.formatDate=="function"?Utils.formatDate(u):"",n=r.employeeNumber||r.sapId||r.employeeCode||e||"",o=r.name||"\u2014",f=o.trim().split(/\s+/).slice(0,2).map(u=>u.charAt(0)).join("")||"\u0645",p=i(new Date)||new Date().toLocaleDateString("ar-SA"),l=(u,S,U,P,E,H)=>`
            <div style="flex:1 1 140px;min-width:120px;padding:14px 12px;border-radius:12px;background:${U};border:1px solid ${P};text-align:center;">
                <div style="font-size:11px;color:${E};font-weight:600;margin-bottom:6px;${a}">${s(u)}</div>
                <div style="font-size:26px;font-weight:800;color:${H};line-height:1.1;${a}">${S}</div>
            </div>`,m=u=>`padding:11px 8px;border:1px solid ${u};text-align:center;font-weight:700;font-size:11px;${a}`,g=`padding:10px 8px;border:1px solid #E5E7EB;text-align:right;font-size:11px;vertical-align:top;${a}`,b=`padding:10px 8px;border:1px solid #E5E7EB;text-align:center;font-size:11px;vertical-align:top;${a}`,C=(u,S,U,P)=>P?`
                <div style="margin:28px 0 16px;direction:rtl;">
                    <h3 dir="rtl" style="font-size:16px;margin:0 0 12px;color:${S};font-weight:700;border-right:4px solid ${S};padding-right:12px;${a}">${s(u)}</h3>
                    <table dir="rtl" style="width:100%;border-collapse:collapse;${a}">
                        <thead><tr style="background:${S};color:#FFFFFF;">${U.map(E=>`<th dir="rtl" style="${m(S)}">${s(E)}</th>`).join("")}</tr></thead>
                        <tbody>${P}</tbody>
                </table>
                </div>`:"",y=(t.violations||[]).map(u=>`
            <tr>
                <td style="${g}">${s(u.violationType)}</td>
                <td style="${b}">${i(u.violationDate)}</td>
                <td style="${b}">${s(u.severity)}</td>
                <td style="${g}">${s(u.actionTaken)}</td>
                <td style="${b}">${s(u.status)}</td>
            </tr>`).join(""),x=(t.sickLeave||[]).map(u=>`
            <tr>
                <td style="${b}">${i(u.startDate)}</td>
                <td style="${b}">${i(u.endDate)}</td>
                <td style="${g}">${s(u.reason)}</td>
                <td style="${g}">${s(u.medicalNotes)}</td>
            </tr>`).join(""),A=(t.training||[]).map(u=>`
            <tr>
                <td style="${g}">${s(u.name)}</td>
                <td style="${g}">${s(u.trainer)}</td>
                <td style="${b}">${i(u.startDate)}</td>
                <td style="${b}">${s(u.status)}</td>
            </tr>`).join(""),T=(t.ppe||[]).map(u=>`
            <tr>
                <td style="${b}">${s(u.receiptNumber||u.id)}</td>
                <td style="${g}">${s(u.equipmentType)}</td>
                <td style="${b}">${u.quantity!=null?u.quantity:0}</td>
                <td style="${b}">${i(u.receiptDate)}</td>
                <td style="${b}">${s(u.status)}</td>
            </tr>`).join(""),v=(t.behaviorMonitoring||[]).map(u=>`
            <tr>
                <td style="${g}">${s(u.behaviorType)}</td>
                <td style="${b}">${u.rating!=null?`${u.rating}/5`:"\u2014"}</td>
                <td style="${b}">${i(u.date)}</td>
                <td style="${g}">${s(u.description)}</td>
            </tr>`).join(""),I=(t.clinicVisits||[]).map(u=>`
            <tr>
                <td style="${b}">${i(u.visitDate)}</td>
                <td style="${g}">${s(u.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</td>
                <td style="${g}">${s(u.diagnosis)}</td>
                <td style="${g}">${s(u.treatment)}</td>
            </tr>`).join(""),N=(t.incidents||[]).map(u=>`
            <tr>
                <td style="${b}">${i(u.incidentDate||u.date||u.createdAt)}</td>
                <td style="${g}">${s(String(u.title||u.description||"").substring(0,120))}</td>
                <td style="${b}">${s(u.severity)}</td>
                <td style="${b}">${s(u.status)}</td>
            </tr>`).join(""),L=(t.violations?.length||0)+(t.sickLeave?.length||0)+(t.training?.length||0)+(t.ppe?.length||0)+(t.behaviorMonitoring?.length||0)+(t.clinicVisits?.length||0)+(t.incidents?.length||0);return`
            <div style="direction:rtl;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:18px;padding:20px 22px;border-radius:16px;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border:1px solid #93c5fd;">
                    <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0;box-shadow:0 8px 20px rgba(37,99,235,0.25);${a}">${s(f)}</div>
                    <div style="flex:1;min-width:0;">
                        <h2 dir="rtl" style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1e3a8a;${a}">${s(o)}</h2>
                        <div style="display:flex;flex-wrap:wrap;gap:8px 20px;font-size:12px;color:#334155;${a}">
                            <span><strong style="color:#1e40af;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong> ${s(n)}</span>
                            ${r.department?`<span><strong style="color:#1e40af;">\u0627\u0644\u0642\u0633\u0645:</strong> ${s(r.department)}</span>`:""}
                            ${r.position?`<span><strong style="color:#1e40af;">\u0627\u0644\u0645\u0646\u0635\u0628:</strong> ${s(r.position)}</span>`:""}
                        </div>
                    </div>
                    <div style="text-align:left;font-size:11px;color:#64748b;line-height:1.7;flex-shrink:0;${a}">
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</strong> ${s(p)}</div>
                        <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${L}</div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:8px;direction:rtl;">
                <h3 dir="rtl" style="font-size:15px;margin:0 0 14px;color:#003865;font-weight:700;${a}">\u0645\u0644\u062E\u0635 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</h3>
                <div style="display:flex;flex-wrap:wrap;gap:12px;">
                    ${l("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",t.violations?.length||0,"#FEF2F2","#FECACA","#B91C1C","#991B1B")}
                    ${l("\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",t.sickLeave?.length||0,"#EFF6FF","#BFDBFE","#1D4ED8","#1E40AF")}
                    ${l("\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",t.training?.length||0,"#ECFDF5","#BBF7D0","#047857","#065F46")}
                    ${l("\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",t.ppe?.length||0,"#FFFBEB","#FDE68A","#B45309","#92400E")}
                    ${l("\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A",t.behaviorMonitoring?.length||0,"#F5F3FF","#DDD6FE","#6D28D9","#5B21B6")}
                    ${l("\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",t.clinicVisits?.length||0,"#FDF2F8","#FBCFE8","#BE185D","#9D174D")}
                    ${l("\u0627\u0644\u062D\u0648\u0627\u062F\u062B",t.incidents?.length||0,"#FFF7ED","#FED7AA","#C2410C","#9A3412")}
                </div>
            </div>

            ${C(`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${t.violations?.length||0})`,"#B91C1C",["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u062D\u0627\u0644\u0629"],y)}
            ${C(`\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${t.sickLeave?.length||0})`,"#1D4ED8",["\u0645\u0646 \u062A\u0627\u0631\u064A\u062E","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629"],x)}
            ${C(`\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (${t.training?.length||0})`,"#047857",["\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","\u0627\u0644\u0645\u062F\u0631\u0628","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621","\u0627\u0644\u062D\u0627\u0644\u0629"],A)}
            ${C(`\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (${t.ppe?.length||0})`,"#B45309",["\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629","\u0627\u0644\u0643\u0645\u064A\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645","\u0627\u0644\u062D\u0627\u0644\u0629"],T)}
            ${C(`\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A (${t.behaviorMonitoring?.length||0})`,"#6D28D9",["\u0646\u0648\u0639 \u0627\u0644\u0633\u0644\u0648\u0643","\u0627\u0644\u062A\u0642\u064A\u064A\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641"],v)}
            ${C(`\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (${t.clinicVisits?.length||0})`,"#BE185D",["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u062A\u0634\u062E\u064A\u0635","\u0627\u0644\u0639\u0644\u0627\u062C"],I)}
            ${C(`\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${t.incidents?.length||0})`,"#C2410C",["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629"],N)}

            ${L===0?`<div style="margin-top:24px;padding:18px;border-radius:12px;background:#F8FAFC;border:2px dashed #CBD5E1;text-align:center;color:#475569;font-size:13px;${a}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0641\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u064E\u0639\u0629.</div>`:""}
        `},buildContractorReportPdfContent(t){const e=t.contractor||{},r=this._AR_PDF_TEXT_STYLE_,a=u=>Utils.escapeHTML(String(u??"")),s=u=>u&&typeof Utils.formatDate=="function"?Utils.formatDate(u):"",i=t.contractorName||e.companyName||e.name||"\u2014",n=t.contractorCode||e.code||e.isoCode||"",o=i.trim().split(/\s+/).slice(0,2).map(u=>u.charAt(0)).join("")||"\u0645",f=s(new Date)||new Date().toLocaleDateString("ar-SA"),p=t.ptwOpen!=null?t.ptwOpen:0,l=t.ptwClosed!=null?t.ptwClosed:0,m=Array.isArray(t.ptwContractor)?t.ptwContractor:[],g=Array.isArray(t.injuriesContractor)?t.injuriesContractor:[],b=(u,S,U,P,E,H)=>`
            <div style="flex:1 1 140px;min-width:120px;padding:14px 12px;border-radius:12px;background:${U};border:1px solid ${P};text-align:center;">
                <div style="font-size:11px;color:${E};font-weight:600;margin-bottom:6px;${r}">${a(u)}</div>
                <div style="font-size:26px;font-weight:800;color:${H};line-height:1.1;${r}">${S}</div>
            </div>`,C=u=>`padding:11px 8px;border:1px solid ${u};text-align:center;font-weight:700;font-size:11px;${r}`,y=`padding:10px 8px;border:1px solid #E5E7EB;text-align:right;font-size:11px;vertical-align:top;${r}`,x=`padding:10px 8px;border:1px solid #E5E7EB;text-align:center;font-size:11px;vertical-align:top;${r}`,A=(u,S,U,P)=>P?`
                <div style="margin:28px 0 16px;direction:rtl;">
                    <h3 dir="rtl" style="font-size:16px;margin:0 0 12px;color:${S};font-weight:700;border-right:4px solid ${S};padding-right:12px;${r}">${a(u)}</h3>
                    <table dir="rtl" style="width:100%;border-collapse:collapse;${r}">
                        <thead><tr style="background:${S};color:#FFFFFF;">${U.map(E=>`<th dir="rtl" style="${C(S)}">${a(E)}</th>`).join("")}</tr></thead>
                        <tbody>${P}</tbody>
                    </table>
                </div>`:"",T=this.CONTRACTOR_REPORT_PDF_MAX_SECTION_ROWS||50,v=(u,S,U,P,E)=>this._buildPdfSectionTable_(A,u,S,U,P,E,T),I=m.length+(t.violations?.length||0)+(t.incidents?.length||0)+g.length+(t.training?.length||0)+(t.clinicVisits?.length||0)+(t.contractorEvaluations?.length||0),N=e.approvalDate?s(e.approvalDate):"",L=e.expiryDate?s(e.expiryDate):"";return`
            <div style="direction:rtl;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:18px;padding:20px 22px;border-radius:16px;background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%);border:1px solid #fcd34d;">
                    <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#d97706,#b45309);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0;box-shadow:0 8px 20px rgba(217,119,6,0.25);${r}">${a(o)}</div>
                    <div style="flex:1;min-width:0;">
                        <h2 dir="rtl" style="margin:0 0 8px;font-size:22px;font-weight:800;color:#92400e;${r}">${a(i)}</h2>
                        <div style="display:flex;flex-wrap:wrap;gap:8px 20px;font-size:12px;color:#334155;${r}">
                            <span><strong style="color:#b45309;">\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</strong> ${a(n)}</span>
                            ${e.entityType?`<span><strong style="color:#b45309;">\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646:</strong> ${a(e.entityType)}</span>`:""}
                            ${e.serviceType?`<span><strong style="color:#b45309;">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629:</strong> ${a(e.serviceType)}</span>`:""}
                            ${N?`<span><strong style="color:#b45309;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</strong> ${a(N)}</span>`:""}
                            ${L?`<span><strong style="color:#b45309;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</strong> ${a(L)}</span>`:""}
                        </div>
                    </div>
                    <div style="text-align:left;font-size:11px;color:#64748b;line-height:1.7;flex-shrink:0;${r}">
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</strong> ${a(f)}</div>
                        <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${I}</div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:8px;direction:rtl;">
                <h3 dir="rtl" style="font-size:15px;margin:0 0 14px;color:#003865;font-weight:700;${r}">\u0645\u0644\u062E\u0635 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</h3>
                <div style="display:flex;flex-wrap:wrap;gap:12px;">
                    ${b("\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0641\u062A\u0648\u062D\u0629",p,"#CCFBF1","#99F6E4","#0F766E","#115E59")}
                    ${b("\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u063A\u0644\u0642\u0629",l,"#ECFDF5","#A7F3D0","#047857","#065F46")}
                    ${b("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",m.length,"#F0FDFA","#5EEAD4","#0D9488","#134E4A")}
                    ${b("\u0627\u0644\u062D\u0648\u0627\u062F\u062B",t.incidents?.length||0,"#FFF7ED","#FED7AA","#C2410C","#9A3412")}
                    ${b("\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",g.length,"#FFEDD5","#FDBA74","#EA580C","#C2410C")}
                    ${b("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",t.violations?.length||0,"#FEF2F2","#FECACA","#B91C1C","#991B1B")}
                    ${b("\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",t.training?.length||0,"#ECFDF5","#BBF7D0","#047857","#065F46")}
                    ${b("\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",t.clinicVisits?.length||0,"#FDF2F8","#FBCFE8","#BE185D","#9D174D")}
                    ${b("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",t.contractorEvaluations?.length||0,"#EEF2FF","#C7D2FE","#4F46E5","#3730A3")}
                </div>
            </div>

            ${v("\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644","#0D9488",["\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","\u0646\u0648\u0639/\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644","\u0627\u0644\u062D\u0627\u0644\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629"],m,u=>`
            <tr>
                <td style="${x}">${a(u.permitId||u.id||u.serialNumber)}</td>
                <td style="${y}">${a(u.workDescription||u.workType||u.location||u.siteName)}</td>
                <td style="${x}">${a(this.normalizePTWStatus(u.status))}</td>
                <td style="${x}">${s(u.startDate||u.createdAt||u.issueDate)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","#B91C1C",["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u062D\u0627\u0644\u0629"],t.violations,u=>`
            <tr>
                <td style="${y}">${a(u.violationType)}</td>
                <td style="${x}">${s(u.violationDate)}</td>
                <td style="${x}">${a(u.severity)}</td>
                <td style="${y}">${a(u.actionTaken)}</td>
                <td style="${x}">${a(u.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062D\u0648\u0627\u062F\u062B","#C2410C",["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629"],t.incidents,u=>`
            <tr>
                <td style="${x}">${s(u.incidentDate||u.date||u.createdAt)}</td>
                <td style="${y}">${a(String(u.title||u.description||"").substring(0,120))}</td>
                <td style="${x}">${a(u.severity)}</td>
                <td style="${x}">${a(u.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A","#EA580C",["\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629","\u0627\u0644\u0634\u062F\u0629"],g,u=>`
            <tr>
                <td style="${y}">${a(u.personName||u.employeeName||u.contractorName)}</td>
                <td style="${x}">${s(u.injuryDate||u.date||u.createdAt)}</td>
                <td style="${y}">${a(u.injuryType||u.injuryDescription||u.description)}</td>
                <td style="${x}">${a(u.severity||u.injurySeverity)}</td>
            </tr>`)}
            ${v("\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628","#047857",["\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","\u0627\u0644\u0645\u062F\u0631\u0628","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621","\u0627\u0644\u062D\u0627\u0644\u0629"],t.training,u=>`
            <tr>
                <td style="${y}">${a(u.name)}</td>
                <td style="${y}">${a(u.trainer)}</td>
                <td style="${x}">${s(u.startDate)}</td>
                <td style="${x}">${a(u.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","#BE185D",["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629","\u0627\u0644\u0627\u0633\u0645","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u062A\u0634\u062E\u064A\u0635","\u0627\u0644\u0639\u0644\u0627\u062C"],t.clinicVisits,u=>`
            <tr>
                <td style="${x}">${s(u.visitDate)}</td>
                <td style="${y}">${a(this._getContractorClinicVisitDisplayName_(u)||"\u2014")}</td>
                <td style="${y}">${a(u.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</td>
                <td style="${y}">${a(u.diagnosis)}</td>
                <td style="${y}">${a(u.treatment)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A","#4F46E5",["\u0627\u0644\u0645\u0634\u0631\u0648\u0639","\u0627\u0644\u0645\u0642\u064A\u0651\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u062F\u0631\u062C\u0629/\u0627\u0644\u062A\u0642\u064A\u064A\u0645"],t.contractorEvaluations,u=>`
            <tr>
                <td style="${y}">${a(u.projectName||"\u062A\u0642\u064A\u064A\u0645")}</td>
                <td style="${y}">${a(u.evaluatorName)}</td>
                <td style="${x}">${s(u.evaluationDate)}</td>
                <td style="${x}">${u.finalScore!=null?u.finalScore:""} ${a(u.finalRating||"")}</td>
            </tr>`)}

            ${I===0?`<div style="margin-top:24px;padding:18px;border-radius:12px;background:#F8FAFC;border:2px dashed #CBD5E1;text-align:center;color:#475569;font-size:13px;${r}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u064E\u0639\u0629.</div>`:""}
        `},contractorReportMatchesSearchCode(t,e){if(!t||e==null||e==="")return!1;const r=String(e).trim();if(!r)return!1;if(String(t.contractorCode||"").trim()===r||t.contractorName&&String(t.contractorName).trim()===r)return!0;const a=t.contractor||{};return[a.code,a.isoCode,a.contractorId,a.id,a.companyName,a.name].some(i=>i!=null&&String(i).trim()===r)},async exportEmployeeReportPDF(t){const e=String(t||"").trim(),r=window.currentEmployeeReport;(!r||!this.employeeReportMatchesSearchCode(r,e))&&await this.generateEmployeeReport(e);const a=window.currentEmployeeReport;if(!a){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0642\u0631\u064A\u0631");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const s=a.employee.name||"",i=`EMP-REPORT-${e}-${new Date().toISOString().slice(0,10)}`,n=`\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u0648\u0638\u0641: ${s}`,o=this.buildEmployeeReportPdfContent(a,e),f=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,n,o,!1,!1,{titleAr:n,titleEn:"Comprehensive Employee Report",compactPdfFooter:!0,includeQRCode:!1},new Date,new Date):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(n)}</title></head><body>${o}</body></html>`,l=`\u062A\u0642\u0631\u064A\u0631-\u0645\u0648\u0638\u0641-${String(e).replace(/[\\/:*?"<>|]/g,"_")}-${new Date().toISOString().slice(0,10)}.pdf`,m=await this._downloadHtmlReportAsPdf(f,l);Loading.hide(),m?Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"):Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(s.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async generateContractorReport(t){AppState.appData||(AppState.appData={}),await this.ensureContractorReportData();let e=AppState.appData;const r=e.approvedContractors||[],a=String(t).trim(),s=typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"?Utils.findApprovedContractorByTerm(a,r):{contractor:null,ambiguous:!1,matches:[]},i=s.contractor;if(s.ambiguous){Notification.error("\u064A\u0648\u062C\u062F \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0627\u0628\u0642. \u0627\u0633\u062A\u062E\u062F\u0645 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0643\u0627\u0645\u0644 \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u062A\u062C\u0646\u0628 \u0623\u064A \u062E\u0644\u0637.");const c=document.getElementById("contractor-report-content");c&&c.classList.add("hidden");return}if(!i){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645");const c=document.getElementById("contractor-report-content");c&&c.classList.add("hidden");return}let n=i;if(typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"){const c=Contractors.resolveContractorForAnalytics(typeof Contractors.getPreferredContractorAnalyticsKey=="function"?Contractors.getPreferredContractorAnalyticsKey(i,a):a,i.companyName||i.name||a);c&&(n={...c,...i,aliasIds:Array.from(new Set([...c.aliasIds||[],...i.aliasIds||[]]))})}typeof Contractors<"u"&&typeof Contractors.prepareContractorForAnalytics=="function"&&(n=Contractors.prepareContractorForAnalytics(n));const o=String(n.companyName||n.name||"").trim(),f=typeof Contractors<"u"&&typeof Contractors.getPreferredContractorAnalyticsKey=="function"?Contractors.getPreferredContractorAnalyticsKey(n,a):n.code||n.isoCode||n.contractorId||n.id||t,p=n.code||n.isoCode||f||t,l=typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function"?Contractors.buildContractorAnalyticsMatchers(n,f):typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function"?Utils.buildContractorIdentityMatcher(n,f):null,m=l?l.matchesContractor:(()=>!1),g=l?c=>l.violationBelongsToContractor(c):(()=>!1),b=l?c=>l.evaluationBelongsToContractor(c):(()=>!1),C=c=>!c||!l?!1:typeof l.hasAnyRecordIds=="function"&&l.hasAnyRecordIds.length>0?l.hasAnyRecordIds(c):["contractorId","contractorCode","code","isoCode","licenseNumber","contractNumber","approvedEntityId","entityCode"].some(D=>String(c?.[D]||"").trim()!==""),y=c=>!c||!l?!1:typeof l.violationBelongsToContractor=="function"?l.violationBelongsToContractor(c):m(c),x=c=>!l||typeof l.matchesNameValue!="function"?!1:(Array.isArray(c)?c:[c]).filter(Boolean).some(D=>l.matchesNameValue(D)),A=(c,D)=>{const F=Array.isArray(c)?c:null,j=Array.isArray(D)?D:[];return F&&F.length>0?F:j},T=this.getContractorReportCacheKey(n,f,a),v=this.getContractorReportDataSignature(),I=`${T}::${v}`,N=this.contractorReportCache.get(T);if(N&&N.__signature===v&&Date.now()-Number(N.__cachedAt||0)<6e4){this.renderContractorReportFromData(N);return}if(this.contractorReportRequests.has(I)){this.renderContractorReportLoading(n,p);const c=await this.contractorReportRequests.get(I);c&&this.renderContractorReportFromData(c);return}let L=null;const u=new Promise(c=>{L=c});this.contractorReportRequests.set(I,u),this.renderContractorReportLoading(n,p);let S=null;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState.googleConfig?.appsScript?.enabled)try{const c=await GoogleIntegration.sendRequest({action:"getContractorDetailedAnalytics",data:{contractor:n,contractorId:f}});c&&c.success&&c.data&&(S=c.data)}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",c)}const U=(c,D=[],F=[])=>{const j=[],dt=new Set,lt=new Set;return(Array.isArray(c)?c:[]).forEach(q=>{if(!q||typeof q!="object")return;const J=(Array.isArray(D)?D:[]).map(tt=>String(q?.[tt]||"").trim().toLowerCase()).find(Boolean);if(J){if(dt.has(J))return;dt.add(J),j.push(q);return}const Z=(Array.isArray(F)?F:[]).map(tt=>String(q?.[tt]||"").trim().toLowerCase()).join("|");!Z||lt.has(Z)||(lt.add(Z),j.push(q))}),j},P=U((e.violations||[]).filter(c=>g(c)),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]),E=A(S?.violations,P),H=c=>c&&(c.personType==="contractor"||c.contractorName||c.affiliation==="contractor"||c.contractorId!=null&&c.contractorId!==""),d=(e.incidents||[]).filter(c=>H(c)&&y(c)),h=A(S?.incidents,d),$=(e.clinicVisits||[]).concat(Array.isArray(e.clinicContractorVisits)?e.clinicContractorVisits:[]),w=new Set,M=$.filter(c=>{if(!c)return!1;const D=String(c.id||"").trim();return D?w.has(D)?!1:(w.add(D),!0):!0}).filter(c=>(c.personType==="contractor"||c.personType==="external"||c.contractorName)&&y(c)),R=A(S?.clinicVisits,M),W=U((e.contractorEvaluations||[]).filter(c=>b(c)),["evaluationId","id","isoCode"],["contractorId","contractorName","evaluationDate","projectName","finalScore"]),_=A(S?.evaluations,W),V=new Set,B=_.filter(c=>{const D=String(c?.evaluationId||c?.id||"").trim();return D?V.has(D)?!1:(V.add(D),!0):!0}),pt=(Array.isArray(e.training)?e.training:[]).filter(c=>{if(!c)return!1;if((c.contractorName||c.contractorId||c.contractorCode)&&m(c))return!0;let D=c.participants;if(typeof D=="string"&&D.trim())try{D=JSON.parse(D)}catch{D=null}return D&&Array.isArray(D)?D.some(F=>F?(F.personType==="contractor"||F.type==="contractor"||F.contractorName||F.companyName||F.company||F.contractorCompany)&&m(F):!1):!1}),ft=(Array.isArray(e.contractorTrainings)?e.contractorTrainings:[]).filter(c=>{if(!c)return!1;if(m(c))return!0;const D=String(c.contractorName||c.companyName||"").replace(/\s+/g," ").trim();return l?!C(c)&&l.matchesNameValue(D):!1}),et=new Set;let z=[...pt];ft.forEach(c=>{const D=c.id||c.date+(c.topic||c.trainingName||"");D&&et.has(D)||(D&&et.add(D),z.push({id:c.id,name:c.topic||c.trainingName||c.name||"\u062A\u062F\u0631\u064A\u0628 \u0645\u0642\u0627\u0648\u0644",trainer:c.trainer||"",startDate:c.date||c.createdAt,status:c.status||"\u0645\u0646\u0641\u0630"}))});const ut=this.getUnifiedPTWDataset(e),mt=c=>{if(!c)return!1;if(m(c))return!0;if(C(c))return!1;const D=String(c.requestingParty||"").replace(/\s+/g," ").trim(),F=String(c.authorizedParty||"").replace(/\s+/g," ").trim(),j=String(c.responsible||"").replace(/\s+/g," ").trim();return x([D,F,j])};let G=ut.filter(mt),bt=G.filter(c=>!this.isPTWClosedStatus(c?.status)).length,vt=G.filter(c=>this.isPTWClosedStatus(c?.status)).length,gt=(e.injuries||[]).filter(c=>{if(!c||(c.personType||"").toString().toLowerCase()!=="contractor")return!1;if(m(c))return!0;const F=String(c.personName||c.employeeName||c.contractorName||"").trim();return l?!C(c)&&l.matchesNameValue(F):!1});const at=A(S?.trainings,z),O=A(S?.ptw,G);let K=O.filter(c=>!this.isPTWClosedStatus(c?.status)).length,Y=O.filter(c=>this.isPTWClosedStatus(c?.status)).length;Array.isArray(S?.ptw)&&S.ptw.length>0&&(typeof S.ptwOpenCount=="number"&&(K=S.ptwOpenCount),typeof S.ptwClosedCount=="number"&&(Y=S.ptwClosedCount));const it=A(S?.injuries,gt),st=document.getElementById("contractor-report-data"),Q=document.getElementById("contractor-report-content"),rt=document.getElementById("export-contractor-report-btn"),nt=document.getElementById("employee-report-content");if(nt&&nt.classList.add("hidden"),Q&&Q.classList.add("hidden"),!st){Notification.error("\u0639\u0646\u0635\u0631 \u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}const ot=n.approvalDate?Utils.formatDate(n.approvalDate):"",ct=n.expiryDate?Utils.formatDate(n.expiryDate):"";st.innerHTML=`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-hard-hat ml-2"></i>
                            ${Utils.escapeHTML(o||"\u0645\u0642\u0627\u0648\u0644")}
                        </h3>
                        <p class="text-gray-600">
                            <i class="fas fa-barcode ml-2"></i>
                            \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644: <strong>${Utils.escapeHTML(String(p))}</strong>
                        </p>
                        ${n.entityType?`<p class="text-gray-600 mt-1"><i class="fas fa-tag ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646: ${Utils.escapeHTML(n.entityType)}</p>`:""}
                        ${n.serviceType?`<p class="text-gray-600 mt-1"><i class="fas fa-tools ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629: ${Utils.escapeHTML(n.serviceType)}</p>`:""}
                        ${ot?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-check ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: ${ot}</p>`:""}
                        ${ct?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-times ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621: ${ct}</p>`:""}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ccfbf1 0%, #99f6e4 100%); border: 1px solid #2dd4bf; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(13, 148, 136, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0d9488; margin-bottom: 0.25rem;">${K}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u0641\u062A\u0648\u062D</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0f766e; margin-bottom: 0.25rem;">${Y}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u063A\u0644\u0642</div>
                    <div style="font-size: 1.125rem; font-weight: 700; color: #134e4a; border-top: 1px solid #2dd4bf; padding-top: 0.5rem; margin-top: 0.5rem;">${O.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #134e4a;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A)</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fb923c; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(234, 88, 12, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ea580c; margin-bottom: 0.25rem;">${h.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u062D\u0648\u0627\u062F\u062B</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #c2410c; margin-bottom: 0.25rem;">${it.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u0625\u0635\u0627\u0628\u0627\u062A</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #9a3412;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #fee2e2 0%, #fecaca 100%); border: 1px solid #f87171; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #dc2626; margin-bottom: 0.25rem;">${E.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #991b1b;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%); border: 1px solid #34d399; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(5, 150, 105, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #059669; margin-bottom: 0.25rem;">${at.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #065f46;">\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #fce7f3 0%, #fbcfe8 100%); border: 1px solid #f472b6; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(219, 39, 119, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #db2777; margin-bottom: 0.25rem;">${R.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #9d174d;">\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%); border: 1px solid #818cf8; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(99, 102, 241, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #4f46e5; margin-bottom: 0.25rem;">${B.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #3730a3;">\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${E.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-circle ml-2"></i>\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${E.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${E.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(c.violationType||"")}</span>
                                            <span class="badge badge-${c.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":"warning"}">${c.severity||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML((c.actionTaken||"").substring(0,100))}</p>
                                        <p class="text-xs text-gray-500 mt-2">${c.violationDate?Utils.formatDate(c.violationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${E.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${E.length-5} \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${h.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${h.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${h.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(String(c.title||c.description||"").substring(0,60))}</span>
                                            <span class="badge badge-warning">${c.severity||""}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">${c.date?Utils.formatDate(c.date):""}</p>
                                    </div>
                                `).join("")}
                                ${h.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${h.length-5} \u062D\u0627\u062F\u062B \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${z.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-graduation-cap ml-2"></i>\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (${z.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${z.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(c.name||"")}</span>
                                            <span class="badge badge-success">${c.status||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0645\u062F\u0631\u0628: ${Utils.escapeHTML(c.trainer||"")}</p>
                                        <p class="text-xs text-gray-500 mt-2">${c.startDate?Utils.formatDate(c.startDate):""}</p>
                                    </div>
                                `).join("")}
                                ${z.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${z.length-5} \u0628\u0631\u0646\u0627\u0645\u062C \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${R.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-hospital ml-2"></i>\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (${R.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${R.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2 gap-2 flex-wrap">
                                            <span class="font-semibold">${Utils.escapeHTML(this._getContractorClinicVisitDisplayName_(c)||"\u2014")}</span>
                                            <span class="text-xs text-gray-500">${c.visitDate?Utils.formatDate(c.visitDate):""}</span>
                                        </div>
                                        <p class="text-sm text-gray-700">\u0627\u0644\u0633\u0628\u0628: ${Utils.escapeHTML(c.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</p>
                                        ${c.diagnosis?`<p class="text-sm text-gray-600">\u0627\u0644\u062A\u0634\u062E\u064A\u0635: ${Utils.escapeHTML(c.diagnosis)}</p>`:""}
                                        ${c.treatment?`<p class="text-sm text-gray-600">\u0627\u0644\u0639\u0644\u0627\u062C: ${Utils.escapeHTML(c.treatment)}</p>`:""}
                                    </div>
                                `).join("")}
                                ${R.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${R.length-5} \u0632\u064A\u0627\u0631\u0629 \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${B.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-clipboard-check ml-2"></i>\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A (${B.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${B.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(c.projectName||"\u062A\u0642\u064A\u064A\u0645")}</span>
                                            <span class="badge badge-info">${c.finalScore!=null?c.finalScore:""} ${c.finalRating||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">\u0627\u0644\u0645\u0642\u064A\u0651\u0645: ${Utils.escapeHTML(c.evaluatorName||"")}</p>
                                        <p class="text-xs text-gray-500 mt-2">${c.evaluationDate?Utils.formatDate(c.evaluationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${B.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${B.length-5} \u062A\u0642\u064A\u064A\u0645 \u0622\u062E\u0631...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}
            </div>
        `,Q.classList.remove("hidden"),rt&&(rt.disabled=!1);const X={__cacheKey:T,__signature:v,__cachedAt:Date.now(),contractor:n,contractorCode:p,contractorName:o,violations:E,incidents:h,training:at,clinicVisits:R,contractorEvaluations:B,ptwContractor:O,ptwOpen:K,ptwClosed:Y,injuriesContractor:it};window.currentContractorReport=X,this.contractorReportCache.set(T,X),this.contractorReportRequests.delete(I),typeof L=="function"&&L(X)},async exportContractorReportPDF(t){const e=String(t||"").trim(),r=window.currentContractorReport;(!r||!this.contractorReportMatchesSearchCode(r,e))&&await this.generateContractorReport(e);const a=window.currentContractorReport;if(!a){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const s=a.contractorName||"",i=String(a.contractorCode||e).replace(/[\\/:*?"<>|]/g,"_"),n=`CON-REPORT-${i}-${new Date().toISOString().slice(0,10)}`,o=`\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: ${s}`,f=this.buildContractorReportPdfContent(a),p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,o,f,!1,!1,{titleAr:o,titleEn:"Comprehensive Contractor Report",compactPdfFooter:!0,includeQRCode:!1},new Date,new Date):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(o)}</title></head><body>${f}</body></html>`,l=`\u062A\u0642\u0631\u064A\u0631-\u0645\u0642\u0627\u0648\u0644-${i}-${new Date().toISOString().slice(0,10)}.pdf`,m=await this._downloadHtmlReportAsPdf(p,l);Loading.hide(),m?Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"):Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0623\u0648\u0644\u0627\u064B.")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(s&&s.message?s.message:String(s)))}},_getDashboardIncidentsRecords(t){const e=t&&typeof t=="object"?t:{},r=Array.isArray(e.incidents)?e.incidents.filter(Boolean):[];if(r.length>0){const i=new Set;return r.filter(n=>{const o=String(n.id||n.incidentId||"").trim();return!o||i.has(o)?!1:(i.add(o),!0)})}const a=Array.isArray(e.incidentsRegistry)?e.incidentsRegistry.filter(Boolean):[],s=new Set;return a.filter(i=>{const n=String(i.incidentId||i.id||i.registryId||"").trim();return!n||s.has(n)?!1:(s.add(n),!0)})},_classifyIncidentYearForDashboard(t,e){if(!t||typeof t!="object")return"unknown";const r=t.year!=null?t.year:t.incidentYear;if(r!=null&&String(r).trim()!==""){const o=String(r).trim();if(/^0+$/.test(o))return"unknown";const f=parseInt(o,10);return!Number.isFinite(f)||f<=0||f>e+5?"unknown":f===e?"current":"prior"}const s=t.incidentDate||t.date||t.createdAt;if(!s)return"unknown";const i=new Date(s);if(isNaN(i.getTime()))return"unknown";const n=i.getFullYear();return n<=0||n<1900||n>e+5||n>e?"unknown":n===e?"current":"prior"},workHoursIncludeContractors(){const t=typeof localStorage<"u"?localStorage.getItem("hse_work_hours_include_contractors"):null;return t===null||String(t).trim()===""?!0:t!=="0"&&String(t).toLowerCase()!=="false"&&String(t).toLowerCase()!=="no"},getDashboardTotalWorkHours(t){const e=typeof localStorage<"u"?localStorage.getItem("hse_total_work_hours"):null;if(e!=null&&String(e).trim()!==""){const i=parseFloat(String(e).replace(/,/g,""));if(Number.isFinite(i)&&i>0)return i}const r=t&&typeof t=="object"?t:{},a=Array.isArray(r.employees)?r.employees:[],s=Array.isArray(r.approvedContractors)?r.approvedContractors:[];return this._computeEstimatedAnnualWorkHoursTotal(a,s)},_getDashboardWorkforceCount(t){const e=t&&typeof t=="object"?t:{},r=Array.isArray(e.employees)?e.employees:[],a=Array.isArray(e.approvedContractors)?e.approvedContractors:[],s=r.filter(n=>n&&!this._isEmployeeInactive(n)).length,i=this.workHoursIncludeContractors()?this._sumContractorWorkforceHeadcount(a,e):0;return s+i},_getDaysSinceLastIncidentForDashboard(t){const e=t&&typeof t=="object"?t:{},r=this._getDashboardIncidentsRecords(e).filter(n=>n&&(n.incidentDate||n.date||n.createdAt));if(r.length===0)return null;const a=r.slice().sort((n,o)=>{const f=new Date(n.incidentDate||n.date||n.createdAt);return new Date(o.incidentDate||o.date||o.createdAt)-f}),s=new Date(a[0].incidentDate||a[0].date||a[0].createdAt),i=new Date;return i.setHours(0,0,0,0),s.setHours(0,0,0,0),Math.floor((i-s)/864e5)},getDashboardSafeWorkingHours(t){const e=typeof localStorage<"u"?localStorage.getItem("hse_safe_working_hours"):null;if(e!=null&&String(e).trim()!==""){const f=parseFloat(String(e).replace(/,/g,""));if(Number.isFinite(f)&&f>=0)return Math.round(f)}const r=t&&typeof t=="object"?t:{},a=this._getDaysSinceLastIncidentForDashboard(r);if(a===null)return this.getDashboardTotalWorkHours(r);const s=this._getDashboardWorkforceCount(r),i=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_hours_per_day"):null),n=!isNaN(i)&&i>0?i:8,o=Math.max(0,s)*n;return Math.round(Math.max(0,a)*o)},_parseNumWorkHours(t){if(t==null||t==="")return NaN;const e=parseFloat(String(t).replace(/,/g,""));return Number.isFinite(e)?e:NaN},_getDashboardDefaultAnnualHoursPerCapita(){const t=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_hours_per_day"):null),e=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_work_days_per_month"):null),r=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_work_months_per_year"):null),a=!isNaN(t)&&t>0?t:8,s=!isNaN(e)&&e>0?e:22,i=!isNaN(r)&&r>0?r:12;return a*s*i},_isEmployeeInactive(t){if(!t)return!1;const e=t.status!=null&&t.status!==""?String(t.status).trim():"";return!!((t.resignationDate!=null&&t.resignationDate!==""?String(t.resignationDate).trim():"")||e==="inactive"||e.toLowerCase()==="inactive"||e==="\u063A\u064A\u0631 \u0646\u0634\u0637")},_sumContractorWorkforceHeadcount(t,e){const r=e&&typeof e=="object"?e:typeof AppState<"u"&&AppState.appData?AppState.appData:{},a=Array.isArray(r.externalWorkforceMonthly)?r.externalWorkforceMonthly:[],s=new Date().getFullYear(),i=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],n=a.filter(p=>p&&Number(p.year)===s);if(n.length>0){let p=0;if(n.forEach(l=>{const m=parseFloat(l.total);Number.isFinite(m)&&m>0?p+=Math.round(m):i.forEach(g=>{const b=parseFloat(l[g]);Number.isFinite(b)&&b>0&&(p+=Math.round(b))})}),p>0)return p}if(!Array.isArray(t)||t.length===0)return 0;const o=["workerCount","workersCount","laborCount","manpower","employeesCount","totalWorkers","averageWorkers","contractorWorkers","numberOfWorkers","expectedWorkers","workforceCount"];let f=0;return t.forEach(p=>{if(!p||typeof p!="object"||p.active===!1||p.deactivated===!0||p.isActive==="inactive"||p.isActive===!1||p.isActive==="false"||p.isActive==="FALSE")return;let l=NaN;for(let m=0;m<o.length;m++){const g=this._parseNumWorkHours(p[o[m]]);if(!isNaN(g)&&g>0){l=g;break}}isNaN(l)||(f+=Math.round(l))}),f===0?t.filter(l=>l&&l.active!==!1&&l.deactivated!==!0&&l.isActive!=="inactive"&&l.isActive!==!1&&l.isActive!=="false"&&l.isActive!=="FALSE").length:f},_computeEstimatedAnnualWorkHoursTotal(t,e){const r=Array.isArray(t)?t.filter(l=>l&&!this._isEmployeeInactive(l)):[],a=r.length,s=this._getDashboardDefaultAnnualHoursPerCapita(),i=l=>{const m=["annualWorkHours","yearlyWorkHours","workHoursYear","annualHours","estimatedAnnualHours","totalAnnualHours"];for(let C=0;C<m.length;C++){const y=this._parseNumWorkHours(l[m[C]]);if(!isNaN(y)&&y>0)return y}const g=this._parseNumWorkHours(l.monthlyHours??l.monthlyWorkHours??l.workHoursMonth);if(!isNaN(g)&&g>0)return g*12;const b=this._parseNumWorkHours(l.weeklyHours??l.hoursPerWeek??l.workHoursWeek);return!isNaN(b)&&b>0?b*52:null};let n=0,o=0;r.forEach(l=>{const m=i(l);m!=null&&(n+=m,o+=1)});let f=0;a>0&&(o===0?f=a*s:f=n+(a-o)*s);let p=0;return this.workHoursIncludeContractors()&&(p=this._sumContractorWorkforceHeadcount(e,AppState.appData)*s),Math.round(f+p)},_updateKpiElement(t,e){if(!t||e==null)return;const r=String(e);t.textContent!==r&&(t.textContent=r,this.applyEnglishNumberFormat(t))},updateKPIs(){const t=AppState.appData;if(!t){Utils.safeWarn("\u26A0\uFE0F AppState.appData \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}const e=AppState.syncMeta?.userEmail?String(AppState.syncMeta.userEmail).trim().toLowerCase():"",r=AppState.currentUser?.email?String(AppState.currentUser.email).trim().toLowerCase():"";if(e&&r&&e!==r){Utils.safeWarn("\u26A0\uFE0F \u0628\u064A\u0627\u0646\u0627\u062A KPI \u0645\u0646 \u062C\u0644\u0633\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u0633\u0627\u0628\u0642 \u2014 \u062A\u062E\u0637\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B"),typeof Notification<"u"&&typeof Notification.warning=="function"&&Notification.warning("\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0644\u0627 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A \u2014 \u062C\u0627\u0631\u064A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629..."),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncData=="function"&&GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1}).catch(()=>{});return}try{const a=Array.isArray(t.incidents)?t.incidents:[],s=Array.isArray(t.users)?t.users:[],i=this.getUnifiedPTWDataset(t),n=Array.isArray(t.nearmiss)?t.nearmiss:[],o=Array.isArray(t.employees)?t.employees:[],f=this._getDashboardIncidentsRecords(t),p=f.length,l=new Date().getFullYear();let m=0,g=0;f.forEach($=>{const w=this._classifyIncidentYearForDashboard($,l);w==="current"?m+=1:w==="prior"&&(g+=1)});const b=s.filter($=>$&&$.active!==!1).length,C=i.filter($=>!this.isPTWClosedStatus($?.status)).length,y=i.filter($=>this.isPTWClosedStatus($?.status)).length,x=i.length,A=this.dashboardCan("incidents"),T=this.dashboardCan("nearmiss"),v=A?a:[],I=T?n:[],N=v.length+I.length,L=v.filter($=>$&&($.status==="\u0645\u063A\u0644\u0642"||$.status==="\u0645\u062D\u0644\u0648\u0644")).length,u=I.filter($=>$&&($.correctiveProposed===!1||$.status==="\u0645\u063A\u0644\u0642"||$.status==="\u0645\u062D\u0644\u0648\u0644")).length,S=N>0?Math.round((L+u)/N*100):A||T?100:0,U=S>=90?"kpi-value text-green-600":S>=70?"kpi-value text-yellow-600":"kpi-value text-red-600",P=this.getDashboardTotalWorkHours(t),E=this.getDashboardSafeWorkingHours(t);let H="N/A";if(A){const $=this._getDaysSinceLastIncidentForDashboard(t);$!==null&&(H=$>=0?this.formatNumber($):"0")}const d=this.getReportsStatisticsUpdates(),h=this;(function(){try{if(h.dashboardCan("incidents")){const w=document.getElementById("total-incidents");h._updateKpiElement(w,h.formatNumber(p));const k=document.getElementById("dash-incidents-label-current"),M=document.getElementById("dash-incidents-num-current"),R=document.getElementById("dash-incidents-num-prior"),W=`${h.t("dash.incidentsCurrentYear","\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A")} (${l}):`;k&&k.textContent!==W&&(k.textContent=W),h._updateKpiElement(M,h.formatNumber(m)),h._updateKpiElement(R,h.formatNumber(g))}if(h.dashboardCan("users")){const w=document.getElementById("active-users");w&&(w.textContent=h.formatNumber(b),h.applyEnglishNumberFormat(w))}if(h.dashboardCan("ptw")){const w=document.getElementById("open-ptw-count");w&&(w.textContent=h.formatNumber(C),h.applyEnglishNumberFormat(w));const k=document.getElementById("closed-ptw-count");k&&(k.textContent=h.formatNumber(y),h.applyEnglishNumberFormat(k));const M=document.getElementById("total-ptw-count");M&&(M.textContent=h.formatNumber(x),h.applyEnglishNumberFormat(M));const R=document.getElementById("active-ptw");R&&(R.textContent=h.formatNumber(C),h.applyEnglishNumberFormat(R))}if(A||T){const w=document.getElementById("compliance-rate");w&&(w.textContent=S+"%",w.className=U)}if(h.dashboardCan("employees")){const w=document.getElementById("total-work-hours");w&&(w.textContent=h.formatNumber(P),h.applyEnglishNumberFormat(w));const k=document.getElementById("safe-working-hours");k&&(k.textContent=h.formatNumber(E),h.applyEnglishNumberFormat(k));const M=document.getElementById("dash-kpi-employees-active-count");if(M){const W=o.filter(_=>_&&!h._isEmployeeInactive(_)).length;M.textContent=h.formatNumber(W),h.applyEnglishNumberFormat(M)}const R=document.getElementById("dash-kpi-contractors-active-count");if(R){const W=Array.isArray(t.approvedContractors)?t.approvedContractors:[],_=h._sumContractorWorkforceHeadcount(W,t);h._updateKpiElement(R,h.formatNumber(_)),(!Array.isArray(t.externalWorkforceMonthly)||t.externalWorkforceMonthly.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&GoogleIntegration.readFromSheets("ExternalWorkforceMonthly",15e3).then(V=>{Array.isArray(V)&&V.length>0?AppState.appData.externalWorkforceMonthly=V:Array.isArray(AppState.appData.externalWorkforceMonthly)||(AppState.appData.externalWorkforceMonthly=[]);const B=h._sumContractorWorkforceHeadcount(W,AppState.appData);h._updateKpiElement(document.getElementById("dash-kpi-contractors-active-count"),h.formatNumber(B))}).catch(()=>{})}}if(h.dashboardCan("training")){const w=document.getElementById("dash-kpi-training-programs"),k=Array.isArray(t.training)?t.training:[];h._updateKpiElement(w,h.formatNumber(k.length))}if(h.dashboardCan("clinic")){const w=document.getElementById("dash-kpi-clinic-visits-total");w&&(w.textContent=h.formatNumber(h.getClinicVisitsTotalCount(t)),h.applyEnglishNumberFormat(w))}if(A){const w=document.getElementById("days-without-injury");w&&(w.textContent=H,h.applyEnglishNumberFormat(w))}h.dashboardCan("incidents")&&h.calculateSafetyMetrics(t),d&&d.length&&h.applyReportsStatisticsUpdates(d),document.querySelector(".safety-metrics-section")?.classList.add("kpis-values-ready"),document.querySelector(".reports-statistics-section")?.classList.add("kpis-values-ready"),document.getElementById("dashboard-section")?.classList.add("kpi-grid-values-ready")}catch(w){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",w)}})()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",a)}},calculateSafetyMetrics(t=null){try{if(!this.dashboardCan("incidents"))return;if(typeof HseMetrics>"u"||!HseMetrics.getDashboardSnapshot){Utils.safeWarn("\u26A0\uFE0F HseMetrics \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644 \u2014 \u062A\u062E\u0637\u064A \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629");return}const e=t&&typeof t=="object"?t:typeof AppState<"u"&&AppState.appData?AppState.appData:{},r=HseMetrics.getDashboardSnapshot(e),a=r.rates||{},s=(n,o)=>{const f=document.getElementById(n);f&&f.textContent!==o&&(f.textContent=o,this.applyEnglishNumberFormat(f))};s("trir-value",this.formatMetricRate(a.trir,2)),s("afr-value",this.formatMetricRate(a.afr,2)),s("far-value",this.formatMetricRate(a.far,4)),s("fr-value",this.formatMetricRate(a.fr,2)),s("lti-value",this.formatNumber(a.ltiCount||0)),s("sr-value",this.formatMetricRate(a.sr,2)),s("ir-value",this.formatMetricRate(a.ir,2));const i=r.totals?.manDays??0;s("man-days-value",this.formatNumber(i)),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F4CA} \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (HseMetrics YTD):",{year:r.year,ytdLimit:r.ytdLimit,totals:r.totals,rates:r.rates})}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",e)}},refreshIncidents(){this.updateKPIs()},loadRecentActivities(){const t=document.getElementById("recent-activities");if(t)try{if(!AppState||!AppState.appData){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                        <p class="text-yellow-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                    </div>
                `;return}const e=[],r=AppState.appData;if(this.dashboardCan("incidents")&&(Array.isArray(r.incidents)?r.incidents:[]).forEach(s=>{if(s)try{const i=s.createdAt||s.date;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.incidentType||s.title||s.type||"\u062D\u0627\u062F\u062B";e.push({type:"incident",title:`\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u062F\u062B: ${o}`,date:n,time:this.getTimeAgo(i),icon:"fa-exclamation-triangle",color:"text-red-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062D\u0627\u062F\u062B:",i)}}),this.dashboardCan("nearmiss")&&(Array.isArray(r.nearmiss)?r.nearmiss:[]).forEach(s=>{if(s)try{const i=s.createdAt||s.date||s.reportDate;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.title||s.description||s.type||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643";e.push({type:"nearmiss",title:`\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643: ${o}`,date:n,time:this.getTimeAgo(i),icon:"fa-triangle-exclamation",color:"text-orange-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643:",i)}}),this.dashboardCan("ptw")&&this.getUnifiedPTWDataset(r).forEach(s=>{if(s)try{const i=s.createdAt||s.startDate||s.issueDate;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.permitNumber||s.workDescription||s.location||"\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644";e.push({type:"ptw",title:`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644: ${o}`,date:n,time:this.getTimeAgo(i),icon:"fa-id-card",color:"text-blue-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u0635\u0631\u064A\u062D:",i)}}),this.dashboardCan("training")&&(Array.isArray(r.training)?r.training:[]).forEach(s=>{if(s)try{const i=s.createdAt||s.startDate||s.date;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.programName||s.courseName||s.title||"\u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A";e.push({type:"training",title:`\u062A\u062F\u0631\u064A\u0628: ${o}`,date:n,time:this.getTimeAgo(i),icon:"fa-graduation-cap",color:"text-green-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u062F\u0631\u064A\u0628:",i)}}),this.dashboardCan("violations")&&(Array.isArray(r.violations)?r.violations:[]).forEach(s=>{if(s)try{const i=s.createdAt||s.date||s.violationDate;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.description||s.type||s.category||"\u0645\u062E\u0627\u0644\u0641\u0629";e.push({type:"violation",title:`\u0645\u062E\u0627\u0644\u0641\u0629: ${o}`,date:n,time:this.getTimeAgo(i),icon:"fa-ban",color:"text-pink-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u062E\u0627\u0644\u0641\u0629:",i)}}),this.dashboardCan("periodic-inspections")&&(Array.isArray(r.dailySafetyCheckList)?r.dailySafetyCheckList:[]).forEach(s=>{if(s)try{const i=s.createdAt||s.date;if(!i)return;const n=new Date(i);if(isNaN(n.getTime()))return;const o=s.siteName||s.siteId||"\u0645\u0648\u0642\u0639";e.push({type:"daily-safety-checklist",title:`\u0645\u0631\u0648\u0631 \u064A\u0648\u0645\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629: ${o} - ${s.shift||""}`,date:n,time:this.getTimeAgo(i),icon:"fa-clipboard-check",color:"text-cyan-500"})}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A:",i)}}),e.sort((a,s)=>!a.date||!s.date?0:s.date-a.date),e.length===0){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">${this.t("dash.noRecentActivities","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u062D\u062F\u064A\u062B\u0629")}</p>
                    </div>
                `;return}t.innerHTML=e.slice(0,5).map(a=>`
                <div class="activity-item">
                    <div class="activity-icon ${a.color} bg-gray-100">
                        <i class="fas ${a.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${a.title}</div>
                        <div class="activity-time">${a.time}</div>
                    </div>
                </div>
            `).join("")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u062E\u064A\u0631\u0629:",e),t&&(t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                        <p class="text-red-600">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629</p>
                    </div>
                `)}},async loadUserTasksWidget(){const t=document.getElementById("user-tasks-widget");if(!t)return;if(!this.dashboardCan("user-tasks")){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">${this.t("dash.noPermissionTasks","\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646.")}</p>
                </div>
            `;return}const e=AppState.currentUser;if(!e){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-user-slash text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</p>
                </div>
            `;return}t.innerHTML=`
            <div class="empty-state">
                <i class="fas fa-spinner fa-spin text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645...</p>
            </div>
        `;try{if(typeof AppState>"u"||!AppState.appData){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                        <p class="text-yellow-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                    </div>
                `;return}const r=e.id||e.email;let a=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const o=await GoogleIntegration.sendToAppsScript("getUserTasksByUserId",{userId:r});o&&o.success&&o.data&&(a=Array.isArray(o.data)?o.data:[])}catch(o){const f=String(o?.message||"").toLowerCase();!f.includes("circuit breaker")&&!f.includes("google apps script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644")&&!f.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0644")&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0647\u0627\u0645 \u0645\u0646 API:",o)}if(a.length===0){const o=AppState.appData.userTasks||[],f=e.id||e.email;a=o.filter(p=>{const l=p.userId||p.assignedTo||p.assignedUserId;return l===f||l===e.email})}a.sort((o,f)=>{if(o.status!=="\u0645\u0643\u062A\u0645\u0644"&&f.status==="\u0645\u0643\u062A\u0645\u0644")return-1;if(o.status==="\u0645\u0643\u062A\u0645\u0644"&&f.status!=="\u0645\u0643\u062A\u0645\u0644")return 1;const p={\u0639\u0627\u0644\u064A\u0629:3,\u0645\u062A\u0648\u0633\u0637\u0629:2,\u0645\u0646\u062E\u0641\u0636\u0629:1},l=p[o.priority]||0,m=p[f.priority]||0;return l!==m?m-l:o.dueDate&&f.dueDate?new Date(o.dueDate)-new Date(f.dueDate):o.dueDate?-1:f.dueDate?1:o.createdAt&&f.createdAt?new Date(f.createdAt)-new Date(o.createdAt):0});const s=a.slice(0,5);if(s.length===0){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-tasks text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">${this.t("dash.noTasks","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645")}</p>
                    </div>
                `;return}const i=o=>{switch(o){case"\u0645\u0643\u062A\u0645\u0644":case"\u0645\u0643\u062A\u0645\u0644\u0629":case"completed":return{icon:"fa-check-circle",color:"text-green-500",bgColor:"bg-green-100"};case"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":case"\u0641\u064A \u0627\u0644\u0639\u0645\u0644":case"in-progress":return{icon:"fa-spinner",color:"text-blue-500",bgColor:"bg-blue-100"};case"\u0645\u0639\u0644\u0642\u0629":case"pending":return{icon:"fa-pause-circle",color:"text-yellow-500",bgColor:"bg-yellow-100"};case"\u0645\u0644\u063A\u0627\u0629":case"cancelled":return{icon:"fa-times-circle",color:"text-red-500",bgColor:"bg-red-100"};default:return{icon:"fa-circle",color:"text-gray-500",bgColor:"bg-gray-100"}}},n=o=>{switch(o){case"\u0639\u0627\u0644\u064A\u0629":case"high":return"text-red-600";case"\u0645\u062A\u0648\u0633\u0637\u0629":case"medium":return"text-yellow-600";case"\u0645\u0646\u062E\u0641\u0636\u0629":case"low":return"text-green-600";default:return"text-gray-600"}};t.innerHTML=s.map(o=>{const f=i(o.status),p=n(o.priority),l=o.dueDate?new Date(o.dueDate):null,m=l&&l<new Date&&o.status!=="\u0645\u0643\u062A\u0645\u0644"&&o.status!=="\u0645\u0643\u062A\u0645\u0644\u0629";let g="";if(l){const C=l-new Date,y=Math.ceil(C/(1e3*60*60*24));m?g=`<span class="text-red-600 font-semibold">\u0645\u062A\u0623\u062E\u0631\u0629 ${Math.abs(y)} \u064A\u0648\u0645</span>`:y===0?g='<span class="text-orange-600 font-semibold">\u0627\u0644\u064A\u0648\u0645</span>':y===1?g='<span class="text-yellow-600 font-semibold">\u063A\u062F\u0627\u064B</span>':y<=7?g=`<span class="text-gray-600">\u062E\u0644\u0627\u0644 ${y} \u0623\u064A\u0627\u0645</span>`:g=`<span class="text-gray-500">${y} \u064A\u0648\u0645 \u0645\u062A\u0628\u0642\u064A</span>`}return`
                    <div class="activity-item ${m?"border-r-4 border-red-500":""}" style="cursor: pointer;" onclick="UI.showSection('user-tasks')">
                        <div class="activity-icon ${f.color} ${f.bgColor}">
                            <i class="fas ${f.icon}"></i>
                        </div>
                        <div class="activity-content" style="flex: 1;">
                            <div class="activity-title" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <span>${Utils.escapeHTML(o.title||o.taskTitle||"\u0645\u0647\u0645\u0629 \u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646")}</span>
                                ${o.priority?`<span class="text-xs px-2 py-1 rounded ${p} bg-gray-100">${Utils.escapeHTML(o.priority)}</span>`:""}
                            </div>
                            <div class="activity-time" style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
                                ${o.status?`<span class="text-xs ${f.color}">${Utils.escapeHTML(o.status)}</span>`:""}
                                ${g?`<span class="text-xs">${g}</span>`:""}
                                ${o.description?`<span class="text-xs text-gray-500 truncate" style="max-width: 300px;">${Utils.escapeHTML(o.description)}</span>`:""}
                            </div>
                        </div>
                    </div>
                `}).join(""),a.length>5&&(t.innerHTML+=`
                    <div class="mt-4 pt-4 border-t text-center">
                        <a href="#user-tasks" class="text-sm text-blue-600 hover:text-blue-800" style="text-decoration: none;">
                            \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0645 (${a.length}) <i class="fas fa-arrow-left mr-1"></i>
                        </a>
                    </div>
                `)}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",r),t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645</p>
                    <p class="text-xs text-gray-400 mt-2">\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649</p>
                </div>
            `}},updateStats(){const t=AppState.appData;if(t)try{const e=new Date,r=new Date(e.getTime()-10080*60*1e3),a=this.getUnifiedPTWDataset(t),s=Array.isArray(t.training)?t.training:[],i=this._getDashboardIncidentsRecords(t),n=this.dashboardCan("incidents")?i.filter(b=>{if(!b)return!1;const C=b.incidentDate||b.date||b.createdAt;if(!C)return!1;try{const y=new Date(C);return!isNaN(y.getTime())&&y>r}catch{return!1}}).length:0,o=this.dashboardCan("ptw")?a.filter(b=>!this.isPTWClosedStatus(b?.status)).length:0,f=this.dashboardCan("training")?s.filter(b=>{if(!b||!b.status)return!1;const C=String(b.status).toLowerCase();return C==="\u0645\u0643\u062A\u0645\u0644"||C==="\u0645\u0646\u062A\u0647\u064A"||C==="completed"||C==="finished"}).length:0,p=document.getElementById("week-incidents"),l=document.getElementById("open-ptw"),m=document.getElementById("completed-training"),g=document.getElementById("days-without-incident");if(this.dashboardCan("incidents")&&p&&(p.textContent=this.formatNumber(n),this.applyEnglishNumberFormat(p)),this.dashboardCan("ptw")&&l&&(l.textContent=this.formatNumber(o),this.applyEnglishNumberFormat(l)),this.dashboardCan("training")&&m&&(m.textContent=this.formatNumber(f),this.applyEnglishNumberFormat(m)),this.dashboardCan("incidents")&&g){const b=this._getDashboardIncidentsRecords(t);if(b.length>0){const C=b.filter(y=>y&&(y.incidentDate||y.date||y.createdAt)).map(y=>new Date(y.incidentDate||y.date||y.createdAt)).filter(y=>!isNaN(y.getTime())).sort((y,x)=>x-y);if(C.length>0){const y=C[0],x=new Date;x.setHours(0,0,0,0),y.setHours(0,0,0,0);const A=Math.floor((x-y)/(1e3*60*60*24));g.textContent=A>=0?this.formatNumber(A):"0"}else g.textContent="0"}else g.textContent="0";this.applyEnglishNumberFormat(g)}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629:",e)}},getReportsStatisticsUpdates(){const t=AppState.appData;if(!t)return null;try{const e=this._getDashboardIncidentsRecords(t),r=Array.isArray(t.nearmiss)?t.nearmiss:[],a=Array.isArray(t.inspections)?t.inspections:[],s=Array.isArray(t.training)?t.training:[],i=Array.isArray(t.violations)?t.violations:[],o=this.getUnifiedPTWDataset(t).length,f=Array.isArray(t.audits)?t.audits:[];let p=0;const l=[];if(this.dashboardCan("incidents")&&(p+=e.length,l.push(["incident-reports-value",e.length,"report"])),this.dashboardCan("nearmiss")&&(p+=r.length,l.push(["nearmiss-reports-value",r.length,"report"])),this.dashboardCan("periodic-inspections")&&(p+=a.length,l.push(["inspections-reports-value",a.length,"report"])),this.dashboardCan("training")&&(p+=s.length,l.push(["training-sessions-value",s.length,"report"])),this.dashboardCan("violations")&&(p+=i.length,l.push(["violations-value",i.length,"report"])),this.dashboardCan("contractors")){const y=Array.isArray(t.approvedContractors)?t.approvedContractors:[];l.push(["approved-contractors-value",this.getUniqueApprovedContractorsCount(y),"report"])}if(this.dashboardCan("ptw")&&(p+=o,l.push(["ptw-reports-value",o,"report"])),this.dashboardCan("iso")&&(p+=f.length,l.push(["audits-value",f.length,"report"])),this.dashboardCan("clinic")){const y=Array.isArray(t.injuries)?t.injuries:[];let x=0,A=0;for(const T of y)String(T&&T.personType||"employee").toLowerCase().trim()==="employee"?x++:A++;l.push(["clinic-injuries-employee-value",x,"report"]),l.push(["clinic-injuries-contractor-value",A,"report"])}this.anyReportsStatisticVisibleForDashboard()&&l.unshift(["total-reports-value",p,"report"]);const m=t.resourceConsumption||{},g=Array.isArray(m.electricity)?m.electricity:[],b=Array.isArray(m.water)?m.water:[],C=Array.isArray(m.gas)?m.gas:[];if(this.dashboardCan("sustainability")){const y=g.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0),x=b.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0),A=C.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0);l.push(["electricity-consumption-value",y,"consumption"],["water-consumption-value",x,"consumption"],["gas-consumption-value",A,"consumption"])}return l}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A:",e),null}},getUniqueApprovedContractorsCount(t=[]){if(!Array.isArray(t)||t.length===0)return 0;const e=new Set;return t.forEach(r=>{if(!r)return;const a=String(r.entityType||r.type||"").trim().toLowerCase(),s=String(r.companyName||r.name||"").replace(/\s+/g," ").trim().toLowerCase(),i=String(r.code||r.isoCode||"").replace(/\s+/g," ").trim().toLowerCase(),n=String(r.contractorId||r.id||"").replace(/\s+/g," ").trim().toLowerCase(),o=`${a}::${s||i||n}`;o&&o!==`${a}::`&&e.add(o)}),e.size},applyReportsStatisticsUpdates(t){if(!t||!t.length)return;const e=this;try{t.forEach(function(r){const a=r[0],s=r[1];r[2]==="consumption"?e.updateConsumptionValue(a,s):e.updateReportValue(a,s)})}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0642\u064A\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",r)}},updateReportsStatistics(){const t=this.getReportsStatisticsUpdates();!t||!t.length||requestAnimationFrame(()=>this.applyReportsStatisticsUpdates(t))},updateReportValue(t,e){if(!t)return;const r=document.getElementById(t);if(!r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0639\u0646\u0635\u0631 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM`);return}try{const a=this.formatNumber(e);r.textContent!==a&&(r.textContent=a),r.dataset.reportFormatted!=="true"&&(r.dataset.reportFormatted="true")}catch(a){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B ${t}:`,a)}},updateConsumptionValue(t,e){if(!t)return;const r=document.getElementById(t);if(!r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0639\u0646\u0635\u0631 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM`);return}try{const a=Number(e),s=isNaN(a)||!isFinite(a)?"0.00":a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:!0});r.textContent!==s&&(r.textContent=s);const i=t==="electricity-consumption-value"||t==="gas-consumption-value";r.dataset.consumptionFormatted!=="true"&&(i||(r.setAttribute("dir","ltr"),r.style.direction="ltr",r.style.textAlign="left",r.style.unicodeBidi="embed",r.style.fontVariantNumeric="tabular-nums",r.style.fontFeatureSettings='"tnum"',r.classList.add("english-number")),r.dataset.consumptionFormatted="true")}catch(a){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B ${t}:`,a)}},formatMetricRate(t,e=2){if(typeof HseMetrics<"u"&&HseMetrics.formatRateDisplay)return HseMetrics.formatRateDisplay(t,e);const r=Number(t);return Number.isFinite(r)?r.toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e,useGrouping:!0}):"0"},formatNumber(t){if(t==null)return"0";const e=Number(t);return isNaN(e)||!isFinite(e)?"0":e.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:!0})},applyEnglishNumberFormat(t){if(!t||t.dataset.numberFormatted==="true")return;const e=t.id||"",r=e==="trir-value"||e==="afr-value"||e==="far-value"||e==="fr-value"||e==="lti-value"||e==="sr-value"||e==="ir-value"||e==="man-days-value";try{if(r){t.dataset.numberFormatted="true";return}t.classList.add("english-number"),t.setAttribute("dir","ltr"),t.style.direction="ltr",t.style.textAlign="left",t.style.fontVariantNumeric="tabular-nums",t.dataset.numberFormatted="true"}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629:",a)}},getTimeAgo(t){if(!t)return"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const e=new Date,r=new Date(t);if(isNaN(r.getTime()))return"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D";const a=e-r;if(a<0)return"\u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644";const s=Math.floor(a/6e4),i=Math.floor(s/60),n=Math.floor(i/24);return s<1?"\u0627\u0644\u0622\u0646":s<60?`\u0645\u0646\u0630 ${s} \u062F\u0642\u064A\u0642\u0629`:i<24?`\u0645\u0646\u0630 ${i} \u0633\u0627\u0639\u0629`:`\u0645\u0646\u0630 ${n} \u064A\u0648\u0645`},loadCharts(){let t=document.getElementById("dashboard-charts");if(!t){const y=document.getElementById("dashboard-section");if(y){const x=document.createElement("div");x.id="dashboard-charts",x.className="mt-6",y.appendChild(x),t=x}else return}const e=this.dashboardCan("incidents"),r=this.dashboardCan("ptw"),a=this.dashboardCan("training");if(!e&&!r&&!a){t.innerHTML="",t.classList.remove("dashboard-charts-root");return}t.classList.add("dashboard-charts-root");const s=AppState.appData||{},i=new Date,n=new Date(i.getTime()-720*60*60*1e3),o={},f={},p={},l=y=>{const x=new Date(y);if(isNaN(x.getTime()))return null;const A=x.getFullYear(),T=String(x.getMonth()+1).padStart(2,"0"),v=String(x.getDate()).padStart(2,"0");return`${A}-${T}-${v}`},m=y=>{if(!y)return null;const x=[y.date,y.incidentDate,y.createdAt,y.updatedAt,y.reportDate];for(const A of x){if(!A)continue;const T=new Date(A);if(!isNaN(T.getTime()))return T}return null},g=(s.incidents||[]).filter(y=>{const x=m(y);return x&&x>=n});e&&g.forEach(y=>{const x=l(m(y));x&&(o[x]=(o[x]||0)+1)}),r&&(s.ptw||[]).filter(x=>{const A=new Date(x.createdAt||x.startDate);return!isNaN(A.getTime())&&A>=n}).forEach(x=>{const A=l(x.createdAt||x.startDate);A&&(f[A]=(f[A]||0)+1)}),a&&(s.training||[]).filter(x=>{const A=new Date(x.createdAt||x.startDate);return!isNaN(A.getTime())&&A>=n}).forEach(x=>{const A=l(x.createdAt||x.startDate);A&&(p[A]=(p[A]||0)+1)});const b=[];e&&b.push(`
            <div class="dashboard-charts-grid-row">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            ${this.t("dash.chartIncidents30d","\u0627\u0644\u062D\u0648\u0627\u062F\u062B - \u0622\u062E\u0631 30 \u064A\u0648\u0645")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="chart-container dash-chart-container--trend">
                            ${this.renderTrendBarList(o,"\u062D\u0627\u062F\u062B\u0627\u064B \u0645\u0633\u062C\u0644\u0627\u064B","incidents")}
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-pie ml-2"></i>
                            ${this.t("dash.chartIncidentsBySeverity","\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062D\u0633\u0628 \u0627\u0644\u062E\u0637\u0648\u0631\u0629")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="chart-container dash-chart-container--severity">
                            ${this.renderSeverityChart(g)}
                        </div>
                    </div>
                </div>
            </div>`);const C=[];r&&C.push(`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            ${this.t("dash.chartPtw30d","Work Permits - \u0622\u062E\u0631 30 \u064A\u0648\u0645")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="chart-container dash-chart-container--trend">
                            ${this.renderTrendBarList(f,"\u062A\u0635\u0631\u064A\u062D\u0627\u064B \u0645\u0633\u062C\u0644\u0627\u064B","ptw")}
                        </div>
                    </div>
                </div>`),a&&C.push(`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-area ml-2"></i>
                            ${this.t("dash.chartTraining30d","Training - \u0622\u062E\u0631 30 \u064A\u0648\u0645")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="chart-container dash-chart-container--trend">
                            ${this.renderTrendBarList(p,"\u0646\u0634\u0627\u0637\u0627\u064B \u062A\u062F\u0631\u064A\u0628\u064A\u0627\u064B","training")}
                        </div>
                    </div>
                </div>`),C.length>0&&b.push(`<div class="dashboard-charts-grid-row">${C.join("")}</div>`),t.innerHTML=b.join(""),setTimeout(()=>{this.renderSimpleCharts()},100)},_normalizeIncidentSeverity(t){const e=String(t||"").trim().toLowerCase();return e?e.includes("\u0639\u0627\u0644\u064A")||e.includes("\u0639\u0627\u0644\u064A\u0647")||e.includes("\u062D\u0631\u062C")||e.includes("high")||e.includes("critical")?"high":e.includes("\u0645\u062A\u0648\u0633\u0637")||e.includes("medium")||e.includes("moderate")?"medium":e.includes("\u0645\u0646\u062E\u0641\u0636")||e.includes("\u0628\u0633\u064A\u0637")||e.includes("low")||e.includes("minor")?"low":"unknown":"unknown"},renderSeverityChart(t){const e={high:0,medium:0,low:0,unknown:0};(t||[]).forEach(n=>{const o=this._normalizeIncidentSeverity(n&&n.severity);e[o]++});const r=e.high+e.medium+e.low+e.unknown;if(r===0)return`<div class="empty-state"><p class="text-gray-500">${this.t("dash.noData30d","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0622\u062E\u0631 30 \u064A\u0648\u0645\u0627\u064B")}</p></div>`;const a=n=>r>0?n/r*100:0,s=(n,o,f,p,l)=>`
                <div class="dash-severity-bar">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold">${n}</span>
                        <span class="text-sm font-bold ${l}" dir="ltr">${o} <span class="text-xs text-gray-400">(${f.toFixed(1)}%)</span></span>
                    </div>
                    <div class="dash-severity-bar__track" role="presentation">
                        <div class="dash-severity-bar__fill dash-severity-bar__fill--${p}" style="width: ${f}%"></div>
                    </div>
                </div>`,i=e.unknown>0?s("\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",e.unknown,a(e.unknown),"unknown","text-gray-600"):"";return`
            <div class="dash-severity-chart">
                <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0622\u062E\u0631 30 \u064A\u0648\u0645)</span>
                    <span class="text-gray-700" dir="ltr">${r}</span>
                </div>
                ${s("\u0639\u0627\u0644\u064A / \u062D\u0631\u062C",e.high,a(e.high),"high","text-red-600")}
                ${s("\u0645\u062A\u0648\u0633\u0637",e.medium,a(e.medium),"medium","text-yellow-600")}
                ${s("\u0645\u0646\u062E\u0641\u0636",e.low,a(e.low),"low","text-green-600")}
                ${i}
            </div>
        `},renderTrendBarList(t,e,r="ptw"){const a=Object.keys(t||{}).sort();if(a.length===0)return`<div class="dash-trend-empty"><p class="dash-trend-empty__text">${this.t("dash.noData30d","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0622\u062E\u0631 30 \u064A\u0648\u0645\u0627\u064B")}</p></div>`;const s=a.slice(-14),i=s.map(m=>t[m]||0),n=i.reduce((m,g)=>m+g,0),o=Math.max(...i,1),f=m=>{const g=m.split("-").map(Number);return g.length!==3||g.some(C=>!C)?m:new Date(g[0],g[1]-1,g[2]).toLocaleDateString("ar-SA",{weekday:"short",month:"numeric",day:"numeric"})},p=s.map(m=>{const g=t[m]||0,b=Math.round(g/o*100);return`
                <li class="dash-trend-row">
                    <span class="dash-trend-date">${f(m)}</span>
                    <div class="dash-trend-track" role="presentation">
                        <div class="dash-trend-fill" style="width: ${b}%"></div>
                    </div>
                    <span class="dash-trend-count" dir="ltr" title="${e}">${g}</span>
                </li>`}).join("");return`
            <div class="dash-trend-chart${r==="training"?" dash-trend-chart--training":" dash-trend-chart--ptw"}" dir="rtl">
                <div class="dash-trend-summary">
                    <span class="dash-trend-summary__label">\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629</span>
                    <strong class="dash-trend-summary__value" dir="ltr">${n}</strong>
                </div>
                <p class="dash-trend-hint">\u0643\u0644 \u0635\u0641 \u064A\u0645\u062B\u0644 \u064A\u0648\u0645\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B: \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0646\u0633\u0628\u064A \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0623\u0639\u0644\u0649 \u064A\u0648\u0645 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629\u060C \u0648\u0627\u0644\u0631\u0642\u0645 \u064A\u0645\u062B\u0644 ${e} \u0641\u064A \u0630\u0644\u0643 \u0627\u0644\u064A\u0648\u0645.</p>
                <ul class="dash-trend-rows">${p}</ul>
            </div>`},renderSimpleCharts(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062C\u0627\u0647\u0632\u0629")}};typeof window<"u"&&(window.Dashboard=window.Dashboard||Dashboard);
