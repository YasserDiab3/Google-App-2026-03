const Dashboard={contractorReportCache:new Map,contractorReportRequests:new Map,CONTRACTOR_REPORT_PDF_MAX_SECTION_ROWS:50,t(t,e){const i=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null;return i?i.t(t,null,e||t):e||t},dashboardCan(t){return t?typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()?!0:typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(t):!1:!1},_dashboardReportStatIdsForTotal(){return["incidents","nearmiss","periodic-inspections","training","violations","contractors","ptw","iso","electricity-consumption","water-consumption","gas-consumption"]},anyReportsStatisticVisibleForDashboard(){return this._dashboardReportStatIdsForTotal().some(t=>{const e=this.getModuleNameFromStatId(t);return e&&this.dashboardCan(e)})},reportsStatisticsMetricVisible(t){if(t==="total-reports")return this.anyReportsStatisticVisibleForDashboard();const e=this.getModuleNameFromStatId(t);return e?this.dashboardCan(e):!1},_setDashboardElVisibility(t,e){if(t){if(e)t.removeAttribute("hidden"),t.style.removeProperty("display");else{t.setAttribute("hidden","");try{t.style.setProperty("display","none","important")}catch{t.style.display="none"}}t.setAttribute("aria-hidden",e?"false":"true")}},applyDashboardLayoutPermissions(){const t=document.getElementById("dashboard-section");t&&(t.querySelectorAll("[data-dash-scope]").forEach(e=>{const a=(e.getAttribute("data-dash-scope")||"").split(",").map(r=>r.trim()).filter(Boolean),s=a.length>0&&a.some(r=>this.dashboardCan(r));this._setDashboardElVisibility(e,s)}),t.querySelectorAll(".reports-statistics-section .metric-card-frame[data-stat-id]").forEach(e=>{const i=e.getAttribute("data-stat-id"),a=i?this.reportsStatisticsMetricVisible(i):!1;this._setDashboardElVisibility(e,a)}))},normalizePTWStatus(t){if(window.PTW&&typeof window.PTW.normalizePermitStatus=="function")return window.PTW.normalizePermitStatus(t);const e=String(t||"").trim();return!e||e==="closed"||e==="Closed"||e==="CLOSED"||e==="\u0645\u063A\u0644\u0642\u0629"||e==="\u0627\u0643\u062A\u0645\u0644"?"\u0645\u063A\u0644\u0642":e},isPTWClosedStatus(t){if(window.PTW&&typeof window.PTW.isPermitClosedStatus=="function")return window.PTW.isPermitClosedStatus(t);const e=this.normalizePTWStatus(t);return e==="\u0645\u063A\u0644\u0642"||e==="\u0645\u0631\u0641\u0648\u0636"||e==="\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646"||e==="\u0625\u063A\u0644\u0627\u0642 \u062C\u0628\u0631\u064A"||e==="\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0627\u0644\u0639\u0645\u0644"},getUnifiedPTWDataset(t){const e=n=>(n||[]).map(o=>({id:o?.permitId||o?.id,...o,status:this.normalizePTWStatus(o?.status),isFromRegistry:!0}));if(window.PTW&&typeof window.PTW.getRegistrySanitizedDataset=="function"){const n=window.PTW.getRegistrySanitizedDataset();if(n.length>0)return e(n)}if(window.PTW&&typeof window.PTW.getPermitMetricsDataset=="function"){const n=window.PTW.getPermitMetricsDataset(),o=Array.isArray(n?.source)?n.source:[];if(o.length>0)return o.map(p=>({...p,status:this.normalizePTWStatus(p?.status)}))}const i=Array.isArray(t?.ptw)?t.ptw:[],a=Array.isArray(t?.ptwRegistry)?t.ptwRegistry:[],s=e(a),r=new Map;return i.forEach(n=>{!n||!n.id||r.set(n.id,{...n,status:this.normalizePTWStatus(n.status)})}),s.forEach(n=>{!n||!n.id||r.set(n.id,n)}),s.length>0?s:Array.from(r.values())},async load(){this.setupReportsStatisticsCardsClickHandlers();try{this.updateKPIs(),this.updateStats(),this.updateReportsStatistics()}catch{}try{await this.loadReportsWidget()}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0643\u0627\u0631\u062A \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",i);try{this.updateKPIs(),this.updateStats()}catch{}}this.loadRecentActivities(),this.loadUserTasksWidget(),this.loadEmployeeReportWidget();try{this.loadCharts()}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0631\u0633\u0648\u0645 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",i)}this.applyDashboardLayoutPermissions(),this.dashboardCan("safety-calendar")&&typeof SafetyCalendar<"u"&&typeof SafetyCalendar.ensureFullCalendarLoaded=="function"&&SafetyCalendar.ensureFullCalendarLoaded().catch(()=>{}),setTimeout(()=>{try{if(typeof SafetyCalendar<"u"&&typeof SafetyCalendar.loadDashboardWidget=="function"){const i=SafetyCalendar.loadDashboardWidget();i&&typeof i.catch=="function"&&i.catch(()=>{})}}catch{}},0),this.dashboardCan("sustainability")&&typeof Sustainability<"u"&&typeof Sustainability.loadResourceConsumptionFromSheets=="function"&&Sustainability.loadResourceConsumptionFromSheets().catch(()=>{});const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;e&&(e.applyI18n(document),e.applyLiteralTranslations(document))},getContractorReportDataSignature(){const t=AppState.appData||{};return["approvedContractors","violations","incidents","clinicVisits","clinicContractorVisits","contractorEvaluations","training","contractorTrainings","ptw","ptwRegistry","injuries"].map(i=>`${i}:${Array.isArray(t[i])?t[i].length:0}`).join("|")},getContractorReportCacheKey(t,e,i){const a=r=>typeof Utils<"u"&&typeof Utils.normalizeContractorIdentityValue=="function"?Utils.normalizeContractorIdentityValue(r):String(r||"").trim().toLowerCase();return[e,t?.code,t?.isoCode,t?.contractorId,t?.id,t?.companyName,t?.name,i].map(a).filter(Boolean).join("|")},renderContractorReportLoading(t,e){const i=document.getElementById("contractor-report-data"),a=document.getElementById("contractor-report-content"),s=document.getElementById("export-contractor-report-btn"),r=document.getElementById("employee-report-content");if(r&&r.classList.add("hidden"),!i||!a)return;const n=String(t?.companyName||t?.name||"").trim(),o=t?.approvalDate?Utils.formatDate(t.approvalDate):"",p=t?.expiryDate?Utils.formatDate(t.expiryDate):"",u=(l,m)=>`
            <div class="dashboard-stat-card" style="background: ${l}; border: 1px solid ${m}; border-radius: 12px; padding: 1rem; min-height: 128px; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);">
                <div style="height: 28px; width: 64px; margin: 0 auto 0.75rem; border-radius: 999px; background: rgba(255,255,255,0.8); animation: contractorReportPulse 1.1s ease-in-out infinite;"></div>
                <div style="height: 14px; width: 110px; margin: 0 auto; border-radius: 999px; background: rgba(255,255,255,0.75); animation: contractorReportPulse 1.1s ease-in-out infinite;"></div>
            </div>
        `;i.innerHTML=`
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
                        ${p?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-times ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621: ${p}</p>`:""}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${u("linear-gradient(145deg, #ccfbf1 0%, #99f6e4 100%)","#2dd4bf")}
                ${u("linear-gradient(145deg, #ffedd5 0%, #fed7aa 100%)","#fb923c")}
                ${u("linear-gradient(145deg, #fee2e2 0%, #fecaca 100%)","#f87171")}
                ${u("linear-gradient(145deg, #dbeafe 0%, #bfdbfe 100%)","#60a5fa")}
                ${u("linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%)","#34d399")}
                ${u("linear-gradient(145deg, #fce7f3 0%, #fbcfe8 100%)","#f472b6")}
                ${u("linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%)","#818cf8")}
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
        `,a.classList.remove("hidden"),s&&(s.disabled=!0)},renderContractorReportFromData(t){const e=document.getElementById("contractor-report-data"),i=document.getElementById("contractor-report-content"),a=document.getElementById("export-contractor-report-btn"),s=document.getElementById("employee-report-content");if(s&&s.classList.add("hidden"),!e||!i||!t)return;const r=t.contractor||{},n=String(t.contractorName||r.companyName||r.name||"").trim(),o=t.contractorCode||r.code||r.isoCode||r.contractorId||r.id||"",p=Array.isArray(t.violations)?t.violations:[],u=Array.isArray(t.incidents)?t.incidents:[],l=Array.isArray(t.training)?t.training:[],m=Array.isArray(t.clinicVisits)?t.clinicVisits:[],g=Array.isArray(t.contractorEvaluations)?t.contractorEvaluations:[],h=Array.isArray(t.ptwContractor)?t.ptwContractor:[],C=typeof t.ptwOpen=="number"?t.ptwOpen:0,b=typeof t.ptwClosed=="number"?t.ptwClosed:0,x=Array.isArray(t.injuriesContractor)?t.injuriesContractor:[],A=r.approvalDate?Utils.formatDate(r.approvalDate):"",T=r.expiryDate?Utils.formatDate(r.expiryDate):"";e.innerHTML=`
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
                        ${r.entityType?`<p class="text-gray-600 mt-1"><i class="fas fa-tag ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646: ${Utils.escapeHTML(r.entityType)}</p>`:""}
                        ${r.serviceType?`<p class="text-gray-600 mt-1"><i class="fas fa-tools ml-2"></i>\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629: ${Utils.escapeHTML(r.serviceType)}</p>`:""}
                        ${A?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-check ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: ${A}</p>`:""}
                        ${T?`<p class="text-gray-600 mt-1"><i class="fas fa-calendar-times ml-2"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621: ${T}</p>`:""}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ccfbf1 0%, #99f6e4 100%); border: 1px solid #2dd4bf; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(13, 148, 136, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0d9488; margin-bottom: 0.25rem;">${C}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u0641\u062A\u0648\u062D</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #0f766e; margin-bottom: 0.25rem;">${b}</div>
                    <div style="font-size: 0.75rem; color: #115e59; margin-bottom: 0.5rem;">\u0645\u063A\u0644\u0642</div>
                    <div style="font-size: 1.125rem; font-weight: 700; color: #134e4a; border-top: 1px solid #2dd4bf; padding-top: 0.5rem; margin-top: 0.5rem;">${h.length}</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #134e4a;">\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D (\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A)</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fb923c; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(234, 88, 12, 0.15);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ea580c; margin-bottom: 0.25rem;">${u.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u062D\u0648\u0627\u062F\u062B</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #c2410c; margin-bottom: 0.25rem;">${x.length}</div>
                    <div style="font-size: 0.75rem; color: #9a3412; margin-bottom: 0.5rem;">\u0625\u0635\u0627\u0628\u0627\u062A</div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #9a3412;">\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</div>
                </div>
                <div class="dashboard-stat-card" style="background: linear-gradient(145deg, #fee2e2 0%, #fecaca 100%); border: 1px solid #f87171; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.15);">
                    <div style="font-size: 1.875rem; font-weight: 700; color: #dc2626; margin-bottom: 0.25rem;">${p.length}</div>
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
                ${p.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-circle ml-2"></i>\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${p.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${p.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(v.violationType||"")}</span>
                                            <span class="badge badge-${v.severity==="\u0639\u0627\u0644\u064A\u0629"?"danger":"warning"}">${v.severity||""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML((v.actionTaken||"").substring(0,100))}</p>
                                        <p class="text-xs text-gray-500 mt-2">${v.violationDate?Utils.formatDate(v.violationDate):""}</p>
                                    </div>
                                `).join("")}
                                ${p.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${p.length-5} \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649...</p>`:""}
                            </div>
                        </div>
                    </div>
                `:""}

                ${u.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${u.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${u.slice(0,5).map(v=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(String(v.title||v.description||"").substring(0,60))}</span>
                                            <span class="badge badge-warning">${v.severity||""}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">${v.date?Utils.formatDate(v.date):""}</p>
                                    </div>
                                `).join("")}
                                ${u.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${u.length-5} \u062D\u0627\u062F\u062B \u0622\u062E\u0631...</p>`:""}
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
        `,i.classList.remove("hidden"),a&&(a.disabled=!1),window.currentContractorReport=t},async prefetchReportStatsSheetsForDashboard(t={}){const e=t&&t.forceRefresh===!0;try{if(!AppState||!AppState.appData||typeof GoogleIntegration>"u"||typeof GoogleIntegration.batchReadFromSheets!="function"||typeof GoogleIntegration._isBackendRpcConfigured!="function"||!GoogleIntegration._isBackendRpcConfigured())return;const i=300*1e3,a=Date.now(),s=this._reportStatsSheetsFetchedInSession===!0;if(!e&&s&&typeof this._reportStatsSheetsFetchedAt=="number"&&a-this._reportStatsSheetsFetchedAt<i)return;const r=[];this.dashboardCan("violations")&&(r.push(["Violations","violations"]),r.push(["ViolationApprovalRequests","violationApprovalRequests"])),this.dashboardCan("training")&&r.push(["Training","training"]),this.dashboardCan("ppe")&&r.push(["PPE","ppe"]),this.dashboardCan("behavior-monitoring")&&r.push(["BehaviorMonitoring","behaviorMonitoring"]),this.dashboardCan("clinic")&&(r.push(["SickLeave","sickLeave"]),r.push(["Medications","medications"]),r.push(["ClinicInventory","clinicInventory"])),this.dashboardCan("incidents")&&(r.push(["Incidents","incidents"]),r.push(["IncidentsRegistry","incidentsRegistry"])),this.dashboardCan("ptw")&&(r.push(["PTW","ptw"]),r.push(["PTWRegistry","ptwRegistry"])),this.dashboardCan("employees")&&(r.push(["Employees","employees"]),r.push(["ExternalWorkforceMonthly","externalWorkforceMonthly"]),r.push(["ApprovedContractors","approvedContractors"]));const n=[];if(r.forEach(([u])=>{n.includes(u)||n.push(u)}),n.length===0){this._reportStatsSheetsFetchedAt=a;return}const o=await GoogleIntegration.batchReadFromSheets(n,{timeout:45e3,batchSize:12}),p=o&&o.data&&typeof o.data=="object"?o.data:{};r.forEach(([u,l])=>{const m=p[u];Array.isArray(m)&&(AppState.appData[l]=m)}),this._reportStatsSheetsFetchedAt=a,this._reportStatsSheetsFetchedInSession=!0;try{this.updateStats(),this.updateReportsStatistics()}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u0623\u0648\u0631\u0627\u0642 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",i)}},async loadReportsWidget(t){const e=t===!0||t&&t.forceRefresh===!0,i=document.getElementById("dashboard-reports-widget");if(!i){try{await Promise.allSettled([this.prefetchClinicVisitsForDashboard({forceRefresh:e}),this.prefetchReportStatsSheetsForDashboard({forceRefresh:e})]),this.updateKPIs(),this.updateStats()}catch(r){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u062F\u0648\u0646 \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",r)}return}const a=this,s=async r=>{try{const n=await a.calculateStatsAsync(r||AppState.appData||{}),o=a.dashboardCan("clinic")?await a.getExpiringMedicationsAsync(r||{}):[];if(!document.contains(i))return;i.innerHTML=a.renderReportsWidget(n,o),a.animateStatCards(i),a.setupReportsWidgetEvents(i),a.applyDashboardLayoutPermissions();try{a.updateKPIs(),a.updateStats(),a.updateReportsStatistics()}catch{}}catch(n){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard render error:",n)}};try{const r=this.prefetchClinicVisitsForDashboard({forceRefresh:e});typeof Clinic<"u"&&typeof Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded=="function"&&Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded().catch(()=>{}),await s(AppState.appData||{}),this.prefetchReportStatsSheetsForDashboard({forceRefresh:e}).then(()=>s(AppState.appData)).catch(n=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard prefetch failed:",n)}),r.then(()=>s(AppState.appData)).catch(n=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("dashboard clinic visits prefetch failed:",n)})}catch(r){Utils.safeError("dashboard load error:",r),i.innerHTML=`
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
        `},_isClinicContractorLikeVisit(t){if(!t||typeof t!="object")return!1;const e=String(t.personType||"").toLowerCase();return!!(e==="contractor"||e==="external"||String(t.contractorName||"").trim()||String(t.externalName||"").trim()||String(t.contractorWorkerName||"").trim())},getClinicVisitsTotalCount(t){if(!t||typeof t!="object")return 0;const e=Array.isArray(t.clinicVisits)?t.clinicVisits:[],i=Array.isArray(t.clinicContractorVisits)?t.clinicContractorVisits:[],a=Array.isArray(t.Clinic)?t.Clinic:[];if(typeof Clinic<"u"&&Clinic._visitsBackendFetchOk===!0&&e.length>0)return e.length;const r=e.some(o=>this._isClinicContractorLikeVisit(o));if(e.length>0&&r)return e.length;let n=e.length+i.length;return n===0&&a.length>0&&(n=a.length),n},prefetchClinicVisitsForDashboard(t={}){const e=t&&t.forceRefresh===!0;return!AppState||!AppState.appData||typeof this.dashboardCan=="function"&&!this.dashboardCan("clinic")||typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"||typeof GoogleIntegration._isBackendRpcConfigured=="function"&&!GoogleIntegration._isBackendRpcConfigured()||typeof Clinic>"u"||typeof Clinic.loadVisitsDataFromBackend!="function"||(e&&(this._clinicVisitsPrefetchedInSession=!1,this._clinicVisitsPrefetchPromise=null,Clinic._visitsBackendFetchOk=!1),!e&&this._clinicVisitsPrefetchedInSession===!0)?Promise.resolve():!e&&typeof Clinic.shouldFetchClinicVisitsFromBackend=="function"&&!Clinic.shouldFetchClinicVisitsFromBackend({forceRefresh:e})?(this._clinicVisitsPrefetchedInSession=!0,Promise.resolve()):this._clinicVisitsPrefetchPromise?this._clinicVisitsPrefetchPromise:(this._clinicVisitsPrefetchPromise=Clinic.loadVisitsDataFromBackend({forceRefresh:e}).then(()=>{this._clinicVisitsPrefetchedInSession=!0,typeof Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded=="function"&&Clinic.prefetchClinicTimeOffApprovalsForAdminIfNeeded().catch(()=>{})}).catch(i=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:",i)}).finally(()=>{this._clinicVisitsPrefetchPromise=null}),this._clinicVisitsPrefetchPromise)},async calculateStatsAsync(t){return new Promise(e=>{const i=()=>{const s=this._getDashboardIncidentsRecords(t).length;e({incidents:s,training:(t.training||[]).length,ptw:(t.ptw||[]).length,violations:(t.violations||[]).length,sickLeave:(t.sickLeave||[]).length,ppe:(t.ppe||[]).length,behaviorMonitoring:(t.behaviorMonitoring||[]).length,clinicVisits:this.getClinicVisitsTotalCount(t)})};window.requestIdleCallback?window.requestIdleCallback(i,{timeout:500}):setTimeout(i,50)})},async getExpiringMedicationsAsync(t){return new Promise(e=>{const i=()=>{const a=t.clinicMedications||t.clinicInventory||[],s=new Date,r=a.filter(n=>{if(!n||!n.expiryDate)return!1;const o=new Date(n.expiryDate);if(Number.isNaN(o.getTime()))return!1;const p=Math.ceil((o-s)/(1e3*60*60*24)),l=parseFloat(n.remainingQuantity??n.quantityAdded??n.quantity??0)>0;return p>=0&&p<=30&&l}).sort((n,o)=>{const p=new Date(n.expiryDate||0),u=new Date(o.expiryDate||0);return p-u});e(r)};window.requestIdleCallback?window.requestIdleCallback(i,{timeout:500}):setTimeout(i,50)})},renderReportsWidget(t,e){const i=new Date,a=[{id:"violations",key:"violations",labelKey:"dash.violations",labelFb:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",icon:"fa-ban",color:"yellow",module:"violations"},{id:"sickLeave",key:"sickLeave",labelKey:"dash.sickLeaves",labelFb:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",icon:"fa-calendar-times",color:"blue",module:"clinic"},{id:"training",key:"training",labelKey:"dash.trainingPrograms",labelFb:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",icon:"fa-graduation-cap",color:"green",module:"training"},{id:"ppe",key:"ppe",labelKey:"dash.ppeEquipment",labelFb:"\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",icon:"fa-hard-hat",color:"orange",module:"ppe"},{id:"behaviorMonitoring",key:"behaviorMonitoring",labelKey:"dash.behaviorMonitoring",labelFb:"\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A",icon:"fa-user-check",color:"purple",module:"behavior-monitoring"},{id:"clinicVisits",key:"clinicVisits",labelKey:"dash.clinicVisits",labelFb:"\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",icon:"fa-hospital",color:"pink",module:"clinic"},{id:"incidents",key:"incidents",labelKey:"dash.incidents",labelFb:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B",icon:"fa-exclamation-triangle",color:"red",module:"incidents"}];let s=0;const r=a.filter(h=>this.dashboardCan(h.module)).map(h=>{const C=typeof t[h.key]=="number"?t[h.key]:0,b=this.renderStatCard(h.id,C,this.t(h.labelKey,h.labelFb),h.icon,h.color,s);return s+=100,b}).join(""),n=this.dashboardCan("incidents"),o=this.dashboardCan("training"),p=typeof Permissions<"u"&&typeof Permissions.isCurrentUserEffectiveAdmin=="function"?Permissions.isCurrentUserEffectiveAdmin():!1,u=[n?`
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
                            </button>`:"",p?`
                            <button class="report-export-btn report-export-btn-full" data-report-type="full">
                                <div class="btn-content">
                                    <div class="btn-icon-wrapper">
                                        <i class="fas fa-file-pdf"></i>
                                    </div>
                                    <span class="btn-label">${this.t("dash.fullReport","\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644")}</span>
                                </div>
                                <span class="btn-description">${this.t("dash.fullReportDesc","\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</span>
                            </button>`:""].join(""),l=r.trim()?`<div class="stats-cards-grid" id="reports-stats-grid">${r}</div>`:`<p class="text-gray-500 text-sm px-2">${this.t("dash.noStatsForPermissions","\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629.")}</p>`,m=u.trim()?`
                    <div class="reports-actions-section">
                        <div class="section-header-row">
                            <h3>
                                <i class="fas fa-file-export"></i>
                                <span>${this.t("dash.exportReports","\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631")}</span>
                            </h3>
                            <span class="info-text">
                                <i class="fas fa-info-circle"></i>
                                ${this.t("dash.exportReportsPdfHint","\u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0628\u0635\u064A\u063A\u0629 PDF")}
                            </span>
                        </div>
                        <div class="reports-export-grid">
                            ${u}
                        </div>
                    </div>`:"",g=this.dashboardCan("clinic")?this.renderMedicationsAlerts(e,i):"";return`
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
                    
                    ${m}
                    
                    <!-- \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 -->
                    ${g}
                </div>
            </div>

        `},getModuleNameFromStatId(t){return{violations:"violations",contractors:"contractors",sickLeave:"clinic",training:"training",ppe:"ppe",behaviorMonitoring:"behavior-monitoring",clinicVisits:"clinic",incidents:"incidents",nearmiss:"nearmiss","periodic-inspections":"periodic-inspections",ptw:"ptw",iso:"iso","electricity-consumption":"sustainability","water-consumption":"sustainability","gas-consumption":"sustainability","clinic-injuries-employee":"clinic","clinic-injuries-contractor":"clinic"}[t]||null},renderStatCard(t,e,i,a,s,r){const n=typeof e=="number"?this.formatNumber(e):e;return`
            <div class="enhanced-stat-card stat-card-${s}" 
                 data-stat-id="${t}" 
                 data-stat-value="${e}"
                 data-clickable="true"
                 style="animation-delay: ${r}ms; cursor: pointer;">
                
                <div class="stat-card-icon">
                    <i class="fas ${a}"></i>
                </div>
                
                <div class="stat-card-value">
                    <span class="stat-value-number english-number" dir="ltr" style="direction: ltr; text-align: left; font-variant-numeric: tabular-nums;">${n}</span>
                </div>
                
                <div class="stat-card-label">
                    ${i}
                </div>
            </div>
        `},renderMedicationsAlerts(t,e){return t.length===0?`
                <div class="medications-alerts-section" style="border-top: 1px solid var(--border-color); padding-top: 2rem; margin-top: 2rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-pills" style="color: #7c3aed; font-size: 1.125rem;"></i>
                        </div>
                        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">
                            ${this.t("dash.medicationsExpiryAlerts","\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}
                        </h3>
                    </div>
                    <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(34, 197, 94, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-check-circle" style="color: #16a34a; font-size: 1.5rem;"></i>
                        </div>
                        <p style="margin: 0; font-size: 0.9375rem; font-weight: 500; color: var(--text-primary); line-height: 1.5;">
                            ${this.t("dash.noExpiringMedications30Days","\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629 \u0623\u0648 \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u062E\u0644\u0627\u0644 30 \u064A\u0648\u0645\u0627\u064B.")}
                        </p>
                    </div>
                </div>
            `:`
            <div class="medications-alerts-section" style="border-top: 1px solid var(--border-color); padding-top: 2rem; margin-top: 2rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-pills" style="color: #7c3aed; font-size: 1.125rem;"></i>
                        </div>
                        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">
                            ${this.t("dash.medicationsExpiryAlerts","\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}
                        </h3>
                    </div>
                    <span class="badge badge-warning" style="padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; background: rgba(234, 179, 8, 0.15); color: #ca8a04; border: 1px solid rgba(234, 179, 8, 0.3);">
                        ${t.length} \u062A\u0646\u0628\u064A\u0647
                    </span>
                </div>
                <div class="medications-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${t.slice(0,5).map((i,a)=>{const s=i.expiryDate?new Date(i.expiryDate):null,r=s?Math.ceil((s-e)/(1e3*60*60*24)):null,n=r!==null?r<0?"\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":`\u064A\u062A\u0628\u0642\u0649 ${r} \u064A\u0648\u0645`:"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o=r!==null?r<0||r<=7?"badge-danger":r<=30?"badge-warning":"badge-success":"badge-secondary",p={"badge-danger":"background: rgba(220, 38, 38, 0.1); color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.2);","badge-warning":"background: rgba(234, 179, 8, 0.1); color: #ca8a04; border: 1px solid rgba(234, 179, 8, 0.2);","badge-success":"background: rgba(34, 197, 94, 0.1); color: #16a34a; border: 1px solid rgba(34, 197, 94, 0.2);","badge-secondary":"background: rgba(107, 114, 128, 0.1); color: #6b7280; border: 1px solid rgba(107, 114, 128, 0.2);"};return`
                        <div class="medication-alert-item" style="opacity: 0; transform: translateX(-20px); animation: slideInRight 0.4s ease ${a*80}ms forwards; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s ease; cursor: pointer; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.4;">
                                    ${Utils.escapeHTML(i.name||"")}
                                </div>
                                <div style="font-size: 0.8125rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;">
                                    <i class="fas fa-calendar-alt" style="font-size: 0.75rem; opacity: 0.7;"></i>
                                    <span>${i.expiryDate?Utils.formatDate(i.expiryDate):"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}</span>
                                </div>
                            </div>
                            <span class="badge ${o}" style="margin-right: 1rem; font-weight: 600; padding: 0.5rem 0.875rem; border-radius: 8px; font-size: 0.8125rem; white-space: nowrap; flex-shrink: 0; ${p[o]||p["badge-secondary"]}">
                                ${n}
                            </span>
                        </div>
                    `}).join("")}
                    ${t.length>5?`<div class="text-center mt-3">
                        <p class="text-xs font-medium" style="color: var(--text-secondary);">
                            <i class="fas fa-info-circle ml-1"></i>
                            \u064A\u0648\u062C\u062F ${t.length-5} \u0623\u062F\u0648\u064A\u0629 \u0623\u062E\u0631\u0649 \u062A\u062A\u0637\u0644\u0628 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629
                        </p>
                    </div>`:""}
                </div>
            </div>
        `},animateStatCards(t){const e=t.querySelectorAll(".reports-stat-card"),i=t.querySelectorAll(".enhanced-stat-card"),a=[...e,...i],s=this;a.forEach((r,n)=>{if(r.dataset.animated==="true")return;r.dataset.animated="true";let o=null;r.classList.contains("enhanced-stat-card")||(r.addEventListener("mouseenter",function(){o&&cancelAnimationFrame(o),o=requestAnimationFrame(()=>{this.style.transform="translateY(-8px) scale(1.02)",this.style.boxShadow="0 12px 24px rgba(0,0,0,0.15)",this.style.transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease";const u=this.querySelector(".stat-card-top-bar");u&&(u.style.height="6px",u.style.transition="height 0.3s ease");const l=this.querySelector(".stat-card-icon");l&&(l.style.transform="scale(1.1) rotate(5deg)",l.style.transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)")})},{passive:!0}),r.addEventListener("mouseleave",function(){o&&cancelAnimationFrame(o),o=requestAnimationFrame(()=>{this.style.transform="",this.style.boxShadow="";const u=this.querySelector(".stat-card-top-bar");u&&(u.style.height="");const l=this.querySelector(".stat-card-icon");l&&(l.style.transform="")})},{passive:!0}));const p=r.querySelector(".stat-value-number");if(p){const u=parseInt(r.dataset.statValue)||0;s.animateValue(p,0,u,1e3+n*100)}}),this.setupStatCardsClickHandlers(t)},animateValue(t,e,i,a){let s=null;const r=n=>{s||(s=n);const o=Math.min((n-s)/a,1),p=Math.floor(o*(i-e)+e);t.textContent=p.toLocaleString("en-US"),o<1&&window.requestAnimationFrame(r)};window.requestAnimationFrame(r)},setupReportsWidgetEvents(t){const e=t.querySelector("#refresh-reports-btn");e&&e.addEventListener("click",async()=>{const a=e.querySelector("i");a&&(a.style.transform="rotate(360deg)",setTimeout(()=>{a.style.transform="rotate(0deg)"},500)),await this.loadReportsWidget({forceRefresh:!0})}),t.querySelectorAll(".report-export-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.reportType;typeof Reports<"u"&&Reports.generateAndExport?Reports.generateAndExport(s):Notification.warning("\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B")}),a.addEventListener("mouseenter",function(){this.style.transform="translateY(-2px)",this.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)"}),a.addEventListener("mouseleave",function(){this.style.transform="translateY(0)",this.style.boxShadow=""})}),this.setupStatCardsClickHandlers(t)},setupReportsStatisticsCardsClickHandlers(){const t=document.querySelector(".reports-statistics-section");if(!t)return;t.querySelectorAll('.metric-card-frame[data-clickable="true"]').forEach(i=>{i.dataset.clickHandlerAdded!=="true"&&(i.dataset.clickHandlerAdded="true",i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=i.getAttribute("data-stat-id");if(!s)return;const r=this.getModuleNameFromStatId(s);if(!r)return;if(!(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(r):(AppState?.currentUser?.role||"").toLowerCase()==="admin")){typeof Notification<"u"&&typeof Notification.warning=="function"?Notification.warning("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645"):alert("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645");return}typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection(r):typeof window<"u"&&window.location&&(window.location.hash=r)}))})},setupStatCardsClickHandlers(t){t.querySelectorAll('.enhanced-stat-card[data-clickable="true"]').forEach(i=>{i.dataset.clickHandlerAdded!=="true"&&(i.dataset.clickHandlerAdded="true",i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=i.getAttribute("data-stat-id");if(!s)return;const r=this.getModuleNameFromStatId(s);if(!r)return;if(!(typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess(r):(AppState?.currentUser?.role||"").toLowerCase()==="admin")){typeof Notification<"u"&&typeof Notification.warning=="function"?Notification.warning("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645"):alert("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645");return}typeof UI<"u"&&typeof UI.showSection=="function"?UI.showSection(r):typeof window<"u"&&window.location&&(window.location.hash=r)}))})},loadEmployeeReportWidget(){const t=document.getElementById("employee-report-widget");if(!t)return;const e=this.dashboardCan("employees"),i=this.dashboardCan("contractors");if(!e&&!i){t.innerHTML="",t.hidden=!0;return}t.hidden=!1;const a=e&&i?this.t("dash.queryComprehensiveReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 (\u0645\u0648\u0638\u0641 / \u0645\u0642\u0627\u0648\u0644)"):e?this.t("dash.queryEmployeeReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0645\u0648\u0638\u0641"):this.t("dash.queryContractorReport","\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 - \u062A\u0642\u0631\u064A\u0631 \u0645\u0642\u0627\u0648\u0644"),s=e?`
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
                        </div>`:"",r=i?`
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
                        ${r}
                    </div>
                    <div id="employee-report-content" class="hidden">
                        <div id="employee-report-data"></div>
                    </div>
                    <div id="contractor-report-content" class="hidden">
                        <div id="contractor-report-data"></div>
                    </div>
                </div>
            </div>
        `,e){const n=document.getElementById("search-employee-btn"),o=document.getElementById("export-employee-report-btn"),p=document.getElementById("employee-code-search");n&&n.addEventListener("click",async()=>{const u=p?.value.trim();u?await this.generateEmployeeReport(u):Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A")}),p&&p.addEventListener("keypress",async u=>{if(u.key==="Enter"){const l=p.value.trim();l&&await this.generateEmployeeReport(l)}}),o&&o.addEventListener("click",()=>{const u=p?.value.trim();u&&this.exportEmployeeReportPDF(u)})}if(i){const n=document.getElementById("search-contractor-btn"),o=document.getElementById("export-contractor-report-btn"),p=document.getElementById("contractor-code-search");n&&n.addEventListener("click",async()=>{const u=p?.value.trim();u?await this.generateContractorReport(u):Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629")}),p&&p.addEventListener("keypress",async u=>{if(u.key==="Enter"){const l=p.value.trim();l&&await this.generateContractorReport(l)}}),o&&o.addEventListener("click",()=>{const u=p?.value.trim();u&&this.exportContractorReportPDF(u)})}},async ensureEmployeeReportData(){AppState.appData||(AppState.appData={});const t=AppState.appData,e={Violations:"violations",Training:"training",TrainingAttendance:"trainingAttendance",ClinicVisits:"clinicVisits",PPE:"ppe",BehaviorMonitoring:"behaviorMonitoring",Incidents:"incidents",SickLeave:"sickLeave"},i=[];for(const[a,s]of Object.entries(e)){const r=t[s];(!Array.isArray(r)||r.length===0)&&i.push({sheetName:a,key:s})}typeof Loading<"u"&&Loading.show&&Loading.show();try{for(const{sheetName:a,key:s}of i)try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)continue;const r=await GoogleIntegration.readFromSheets(a);Array.isArray(r)&&(AppState.appData[s]=r,Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a} (${r.length} \u0633\u062C\u0644)`))}catch(r){Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${a}:`,r?.message||r)}if((!t.training||t.training.length===0)&&typeof GoogleIntegration<"u"&&(GoogleIntegration.sendToAppsScript||GoogleIntegration.sendRequest))try{const a=GoogleIntegration.sendToAppsScript||(n=>GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:n.action||n.method,data:n.data||{}})),s=await(GoogleIntegration.sendToAppsScript?GoogleIntegration.sendToAppsScript("getAllTrainings",{}):Promise.resolve(GoogleIntegration.sendRequest({action:"getAllTrainings",data:{}}))),r=s&&(s.data||s.value)&&(Array.isArray(s.data)?s.data:Array.isArray(s.value)?s.value:Array.isArray((s.value||{}).data)?(s.value||{}).data:null);Array.isArray(r)&&r.length>0&&(AppState.appData.training=r,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0639\u0628\u0631 getAllTrainings"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllTrainings:",a?.message||a)}if((!t.trainingAttendance||t.trainingAttendance.length===0)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const a=await GoogleIntegration.sendRequest({action:"getAllTrainingAttendance",data:{}}),s=a&&a.value&&Array.isArray(a.value.data)&&a.value.data?a.value.data:a&&Array.isArray(a.data)?a.data:Array.isArray(a&&a.value)?a.value:null;Array.isArray(s)&&(AppState.appData.trainingAttendance=s,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0639\u0628\u0631 getAllTrainingAttendance"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllTrainingAttendance:",a?.message||a)}if(e.PPE&&(!t.ppe||t.ppe.length===0)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const a=await GoogleIntegration.sendToAppsScript("getAllPPE",{});a&&a.success&&Array.isArray(a.data)&&(AppState.appData.ppe=a.data,Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 PPE \u0639\u0628\u0631 getAllPPE"))}catch(a){Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641: \u0641\u0634\u0644 getAllPPE:",a?.message||a)}}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}},async ensureContractorReportData(){AppState.appData||(AppState.appData={});const t=AppState.appData,e={Violations:"violations",Incidents:"incidents",SickLeave:"sickLeave",ClinicVisits:"clinicVisits",ClinicContractorVisits:"clinicContractorVisits",ContractorEvaluations:"contractorEvaluations",Training:"training",ContractorTrainings:"contractorTrainings",PTW:"ptw",PTWRegistry:"ptwRegistry",Injuries:"injuries",ClinicContractorInjuries:"clinicContractorInjuries"},i=[];for(const[a,s]of Object.entries(e)){const r=t[s];(!Array.isArray(r)||r.length===0)&&i.push({sheetName:a,key:s})}if(i.length){typeof Loading<"u"&&Loading.show&&Loading.show();try{for(const{sheetName:a,key:s}of i)try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets)continue;const r=await GoogleIntegration.readFromSheets(a);Array.isArray(r)&&(AppState.appData[s]=r,Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a} (${r.length} \u0633\u062C\u0644)`))}catch(r){Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${a}:`,r?.message||r)}}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}}},async generateEmployeeReport(t){AppState.appData||(AppState.appData={});const e=AppState.appData,i=Array.isArray(e.employees)?e.employees:Array.isArray(e.Employees)?e.Employees:[];let a=null;const s=String(t||"").trim(),r=(d,y)=>{if(!y)return!1;const $=String(y).trim();if(!$)return!1;const w=String(d.employeeNumber??"").trim(),k=String(d.sapId??"").trim(),M=String(d.employeeCode??"").trim(),R=String(d.id??"").trim(),W=String(d.code??"").trim();if(w===$||k===$||M===$||R===$||W===$||w.toLowerCase()===$.toLowerCase()||k.toLowerCase()===$.toLowerCase())return!0;const _=Number($);return!!(!isNaN(_)&&isFinite(_)&&(Number(w)===_||Number(k)===_||Number(M)===_||Number(R)===_||Number(W)===_||String(Number(w))===$||String(Number(k))===$||w===String(_)||k===String(_)))};if(a=i.find(d=>r(d,t)),!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F");const d=document.getElementById("employee-report-content");d&&d.classList.add("hidden");return}const n=d=>{if(!d)return null;const y=String(d).trim();return y?y.toLowerCase():null},o=new Set;if([a.id,a.employeeNumber,a.sapId,a.employeeCode,a.code,a.cardId,a.nationalId].forEach(d=>{if(d==null||d==="")return;const y=String(d).trim();if(!y)return;const $=n(d);$&&o.add($),o.add(y);const w=Number(d);!isNaN(w)&&isFinite(w)&&o.add(String(w))}),s){o.add(s),o.add(s.toLowerCase());const d=Number(s);!isNaN(d)&&isFinite(d)&&o.add(String(d))}const p=d=>d?[d.employeeCode,d.employeeNumber,d.employeeId,d.id,d.code,d.sapId,d.cardId,d.nationalId,d.participantCode].some($=>{if($==null||$==="")return!1;const w=String($).trim();if(!w)return!1;const k=n($);if(o.has(k)||o.has(w))return!0;const M=Number($);return!!(!isNaN(M)&&isFinite(M)&&o.has(String(M)))}):!1,u=d=>{if(d==null||d==="")return!1;const y=String(d).trim();if(!y)return!1;if(o.has(y)||o.has(n(y)))return!0;const $=Number(d);return!isNaN($)&&isFinite($)&&o.has(String($))};await this.ensureEmployeeReportData();const l=AppState.appData||{},m=(d,y)=>{const $=l[d]||l[y]||[];return Array.isArray($)?$:[]},g=m("violations").filter(d=>d.personType==="contractor"||d.contractorName?!1:p(d)),h=m("sickLeave").filter(d=>d.personType==="contractor"||d.contractorName?!1:p(d)),C=m("training").concat(m("trainingRecords")),x=m("trainingAttendance").filter(d=>p(d)),A=d=>{if(!d||typeof d!="object")return!1;const y={...d,code:d.code||d.participantCode,employeeCode:d.employeeCode||d.participantCode,employeeNumber:d.employeeNumber||d.participantCode};if((d.employeeCode!=null&&d.employeeCode!==""||d.employeeNumber!=null&&d.employeeNumber!==""||d.employeeId!=null&&d.employeeId!==""||d.participantCode!=null&&d.participantCode!=="")&&p(y))return!0;let $=d.participants;if(typeof $=="string")try{const w=JSON.parse($);$=Array.isArray(w)?w:w&&Array.isArray(w.participants)?w.participants:[]}catch{$=[]}return $&&Array.isArray($)?$.some(w=>!w||typeof w!="object"||w.personType==="contractor"||w.type==="contractor"||w.contractorName?!1:p(w)):!1},v=[...C.filter(A),...x.map(d=>({id:d.id,name:d.topic||d.trainingType||"\u062A\u062F\u0631\u064A\u0628",trainer:d.trainer||"",startDate:d.date||d.attendanceDate||d.createdAt,status:"\u0645\u0643\u062A\u0645\u0644"}))],I=m("ppe").filter(d=>p(d)),N=m("behaviorMonitoring").filter(d=>p(d)),L=m("clinicVisits","Clinic").filter(d=>d.personType==="contractor"||d.contractorName?!1:p(d)),f=m("incidents").filter(d=>d.personType==="contractor"||d.contractorName?!1:!!(p(d)||d.affectedCode&&u(d.affectedCode)||d.entries&&Array.isArray(d.entries)&&d.entries.some(y=>p(y)||u(y?.affectedCode||y?.employeeCode)))),S=document.getElementById("employee-report-data"),U=document.getElementById("employee-report-content"),P=document.getElementById("export-employee-report-btn"),E=document.getElementById("contractor-report-content");if(E&&E.classList.add("hidden"),U&&U.classList.add("hidden"),!S){Notification.error("\u0639\u0646\u0635\u0631 \u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}S.innerHTML=`
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
                    ${a.photo?(()=>{const d=typeof Utils.resolveDriveAwareImgDisplay=="function"?Utils.resolveDriveAwareImgDisplay(a.photo):{canonical:String(a.photo),displaySrc:String(a.photo),needsProxy:!1,proxyFileId:""},y=typeof Utils.driveProxyImgAttrs=="function"?Utils.driveProxyImgAttrs(d):"";return`<img src="${Utils.escapeHTML(d.displaySrc)}" alt="\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641"${y} class="dash-emp-photo w-24 h-24 rounded-full object-cover border-2 border-blue-500">`})():""}
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">${g.length}</div>
                    <div class="text-sm text-gray-700 font-semibold">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                </div>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${h.length}</div>
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
                    <div class="text-3xl font-bold text-orange-600 mb-2">${f.length}</div>
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
                
                ${h.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-calendar-times ml-2"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${h.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${h.slice(0,5).map(d=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">\u0645\u0646 ${d.startDate?Utils.formatDate(d.startDate):""} \u0625\u0644\u0649 ${d.endDate?Utils.formatDate(d.endDate):""}</span>
                                        </div>
                                        <p class="text-sm text-gray-600">${Utils.escapeHTML(d.reason||"")}</p>
                                        ${d.medicalNotes?`<p class="text-xs text-gray-500 mt-2">${Utils.escapeHTML(d.medicalNotes)}</p>`:""}
                                    </div>
                                `).join("")}
                                ${h.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${h.length-5} \u0625\u062C\u0627\u0632\u0629 \u0623\u062E\u0631\u0649...</p>`:""}
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
        `,U.classList.remove("hidden"),P&&(P.disabled=!1),typeof Utils.hydrateDriveProxyImages=="function"&&Utils.hydrateDriveProxyImages(S,{onFetchFail:d=>{try{const y=document.createElement("div");y.className="w-24 h-24 rounded-full bg-gray-200 border-2 border-blue-500 flex items-center justify-center",y.innerHTML='<i class="fas fa-user text-gray-500 text-2xl"></i>',d.replaceWith(y)}catch{}}});const H=a.employeeNumber||a.sapId||a.id||a.employeeCode||t;window.currentEmployeeReport={employee:a,employeeCode:H,employeeIdentifiers:Array.from(o),violations:g,sickLeave:h,training:v,ppe:I,behaviorMonitoring:N,clinicVisits:L,incidents:f}},employeeReportMatchesSearchCode(t,e){if(!t||e==null||e==="")return!1;const i=String(e).trim();if(!i)return!1;if(String(t.employeeCode||"").trim()===i)return!0;if(Array.isArray(t.employeeIdentifiers)){const a=i.toLowerCase();if(t.employeeIdentifiers.includes(i)||t.employeeIdentifiers.includes(a))return!0;const s=Number(i);if(!isNaN(s)&&isFinite(s)&&t.employeeIdentifiers.includes(String(s)))return!0}return!1},_AR_PDF_TEXT_STYLE_:"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",async _loadReportPdfLib_(t,e){return e()?!0:new Promise(i=>{const a=document.querySelector(`script[src="${t}"]`);if(a){const r=()=>i(!!e());a.addEventListener("load",r,{once:!0}),setTimeout(r,4e3);return}const s=document.createElement("script");s.src=t,s.async=!0,s.onload=()=>i(!!e()),s.onerror=()=>i(!1),document.head.appendChild(s)})},async _ensureReportPdfLibs_(){const t=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),e=await this._loadReportPdfLib_("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");return t&&e},_stripScriptsFromHtml_(t){return String(t||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")},async _preloadCairoFontForPdf_(){if(!document.getElementById("dash-cairo-font-link")){const t=document.createElement("link");t.id="dash-cairo-font-link",t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",document.head.appendChild(t)}try{document.fonts&&typeof document.fonts.load=="function"&&(await document.fonts.load("400 14px Cairo"),await document.fonts.load("700 20px Cairo"),await document.fonts.ready)}catch{}},_prepareArabicPdfHtml_(t){const e=`
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
</style>`,i=this._stripScriptsFromHtml_(t);return i?i.includes("</head>")?i.replace("</head>",`${e}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${e}</head><body>${i}</body></html>`:e},async _waitArabicPdfFontsReady_(t){if(!(!t||!t.fonts||typeof t.fonts.load!="function"))try{await Promise.all([t.fonts.load("400 12px Cairo"),t.fonts.load("600 14px Cairo"),t.fonts.load("700 18px Cairo"),t.fonts.load("800 24px Cairo")]),await t.fonts.ready}catch{}},async _captureHtmlToCanvas_(t,e={}){const a={scale:this._getAdaptivePdfCanvasScale_(t,e.scale||2.5),backgroundColor:"#ffffff",logging:!1,windowWidth:Math.max(t.scrollWidth,900),windowHeight:Math.max(t.scrollHeight,1),scrollX:0,scrollY:0},s=[{...a,useCORS:!0,allowTaint:!1},{...a,useCORS:!0,allowTaint:!0},{...a,useCORS:!1,allowTaint:!0}];let r=null;for(let n=0;n<s.length;n++)try{const o=await html2canvas(t,s[n]);if(o&&o.width>0&&o.height>0)return o}catch(o){r=o}if(r)throw r;return null},async _downloadHtmlReportAsPdf(t,e="report.pdf"){if(!await this._ensureReportPdfLibs_()||typeof html2canvas>"u"||!window.jspdf)return!1;await this._preloadCairoFontForPdf_();const a=this._prepareArabicPdfHtml_(t),s=String(e||"report.pdf").toLowerCase().endsWith(".pdf")?String(e):`${String(e)}.pdf`,r=document.createElement("iframe");r.setAttribute("aria-hidden","true"),r.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;",document.body.appendChild(r);try{r.srcdoc=a,await new Promise(m=>{r.onload=m,r.onerror=m,setTimeout(m,6e3)});const n=r.contentDocument||r.contentWindow?.document;if(!n)return!1;await this._waitArabicPdfFontsReady_(n);const o=Array.from(n.images||[]);await Promise.all(o.map(m=>new Promise(g=>{if(m.complete)return g();m.onload=g,m.onerror=g,setTimeout(g,3e3)})));const p=n.querySelector(".report-wrapper")||n.body;if(!p)return!1;const u=await this._captureHtmlToCanvas_(p);if(!u)return!1;const l=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return l?(Utils.PdfExport.appendCanvasAsPdfPages(l,u,{marginMm:8}),Utils.PdfExport.savePdf(l,s),!0):!1}catch(n){return Utils.safeWarn&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF:",n),!1}finally{r.remove()}},_getAdaptivePdfCanvasScale_(t,e=2.5){const i=Math.max(t?.scrollHeight||0,1),a=Math.max(t?.scrollWidth||900,900),s=14e3,r=9e7;let n=Number(e)||2.5;for(;n>.85&&(a*n>s||i*n>s||a*i*n*n>r);)n-=.25;return Math.max(.85,Math.round(n*100)/100)},_buildPdfSectionTable_(t,e,i,a,s,r,n){const o=Array.isArray(s)?s:[],p=Math.max(1,Number(n)||50),u=o.slice(0,p),l=Math.max(0,o.length-u.length),m=u.map(r).join(""),g=o.length?l>0?` (${o.length} \u2014 \u0639\u0631\u0636 ${u.length} \u0641\u064A PDF)`:` (${o.length})`:"";return t(`${e}${g}`,i,a,m)},_getContractorClinicVisitDisplayName_(t){return!t||typeof t!="object"?"":String(t.contractorWorkerName||t.personName||t.employeeName||t.externalName||t.name||"").replace(/\s+/g," ").trim()},buildEmployeeReportPdfContent(t,e){const i=t.employee||{},a=this._AR_PDF_TEXT_STYLE_,s=f=>Utils.escapeHTML(String(f??"")),r=f=>f&&typeof Utils.formatDate=="function"?Utils.formatDate(f):"",n=i.employeeNumber||i.sapId||i.employeeCode||e||"",o=i.name||"\u2014",p=o.trim().split(/\s+/).slice(0,2).map(f=>f.charAt(0)).join("")||"\u0645",u=r(new Date)||new Date().toLocaleDateString("ar-SA"),l=(f,S,U,P,E,H)=>`
            <div style="flex:1 1 140px;min-width:120px;padding:14px 12px;border-radius:12px;background:${U};border:1px solid ${P};text-align:center;">
                <div style="font-size:11px;color:${E};font-weight:600;margin-bottom:6px;${a}">${s(f)}</div>
                <div style="font-size:26px;font-weight:800;color:${H};line-height:1.1;${a}">${S}</div>
            </div>`,m=f=>`padding:11px 8px;border:1px solid ${f};text-align:center;font-weight:700;font-size:11px;${a}`,g=`padding:10px 8px;border:1px solid #E5E7EB;text-align:right;font-size:11px;vertical-align:top;${a}`,h=`padding:10px 8px;border:1px solid #E5E7EB;text-align:center;font-size:11px;vertical-align:top;${a}`,C=(f,S,U,P)=>P?`
                <div style="margin:28px 0 16px;direction:rtl;">
                    <h3 dir="rtl" style="font-size:16px;margin:0 0 12px;color:${S};font-weight:700;border-right:4px solid ${S};padding-right:12px;${a}">${s(f)}</h3>
                    <table dir="rtl" style="width:100%;border-collapse:collapse;${a}">
                        <thead><tr style="background:${S};color:#FFFFFF;">${U.map(E=>`<th dir="rtl" style="${m(S)}">${s(E)}</th>`).join("")}</tr></thead>
                        <tbody>${P}</tbody>
                </table>
                </div>`:"",b=(t.violations||[]).map(f=>`
            <tr>
                <td style="${g}">${s(f.violationType)}</td>
                <td style="${h}">${r(f.violationDate)}</td>
                <td style="${h}">${s(f.severity)}</td>
                <td style="${g}">${s(f.actionTaken)}</td>
                <td style="${h}">${s(f.status)}</td>
            </tr>`).join(""),x=(t.sickLeave||[]).map(f=>`
            <tr>
                <td style="${h}">${r(f.startDate)}</td>
                <td style="${h}">${r(f.endDate)}</td>
                <td style="${g}">${s(f.reason)}</td>
                <td style="${g}">${s(f.medicalNotes)}</td>
            </tr>`).join(""),A=(t.training||[]).map(f=>`
            <tr>
                <td style="${g}">${s(f.name)}</td>
                <td style="${g}">${s(f.trainer)}</td>
                <td style="${h}">${r(f.startDate)}</td>
                <td style="${h}">${s(f.status)}</td>
            </tr>`).join(""),T=(t.ppe||[]).map(f=>`
            <tr>
                <td style="${h}">${s(f.receiptNumber||f.id)}</td>
                <td style="${g}">${s(f.equipmentType)}</td>
                <td style="${h}">${f.quantity!=null?f.quantity:0}</td>
                <td style="${h}">${r(f.receiptDate)}</td>
                <td style="${h}">${s(f.status)}</td>
            </tr>`).join(""),v=(t.behaviorMonitoring||[]).map(f=>`
            <tr>
                <td style="${g}">${s(f.behaviorType)}</td>
                <td style="${h}">${f.rating!=null?`${f.rating}/5`:"\u2014"}</td>
                <td style="${h}">${r(f.date)}</td>
                <td style="${g}">${s(f.description)}</td>
            </tr>`).join(""),I=(t.clinicVisits||[]).map(f=>`
            <tr>
                <td style="${h}">${r(f.visitDate)}</td>
                <td style="${g}">${s(f.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</td>
                <td style="${g}">${s(f.diagnosis)}</td>
                <td style="${g}">${s(f.treatment)}</td>
            </tr>`).join(""),N=(t.incidents||[]).map(f=>`
            <tr>
                <td style="${h}">${r(f.incidentDate||f.date||f.createdAt)}</td>
                <td style="${g}">${s(String(f.title||f.description||"").substring(0,120))}</td>
                <td style="${h}">${s(f.severity)}</td>
                <td style="${h}">${s(f.status)}</td>
            </tr>`).join(""),L=(t.violations?.length||0)+(t.sickLeave?.length||0)+(t.training?.length||0)+(t.ppe?.length||0)+(t.behaviorMonitoring?.length||0)+(t.clinicVisits?.length||0)+(t.incidents?.length||0);return`
            <div style="direction:rtl;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:18px;padding:20px 22px;border-radius:16px;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border:1px solid #93c5fd;">
                    <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0;box-shadow:0 8px 20px rgba(37,99,235,0.25);${a}">${s(p)}</div>
                    <div style="flex:1;min-width:0;">
                        <h2 dir="rtl" style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1e3a8a;${a}">${s(o)}</h2>
                        <div style="display:flex;flex-wrap:wrap;gap:8px 20px;font-size:12px;color:#334155;${a}">
                            <span><strong style="color:#1e40af;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</strong> ${s(n)}</span>
                            ${i.department?`<span><strong style="color:#1e40af;">\u0627\u0644\u0642\u0633\u0645:</strong> ${s(i.department)}</span>`:""}
                            ${i.position?`<span><strong style="color:#1e40af;">\u0627\u0644\u0645\u0646\u0635\u0628:</strong> ${s(i.position)}</span>`:""}
                        </div>
                    </div>
                    <div style="text-align:left;font-size:11px;color:#64748b;line-height:1.7;flex-shrink:0;${a}">
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</strong> ${s(u)}</div>
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

            ${C(`\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (${t.violations?.length||0})`,"#B91C1C",["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u062D\u0627\u0644\u0629"],b)}
            ${C(`\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${t.sickLeave?.length||0})`,"#1D4ED8",["\u0645\u0646 \u062A\u0627\u0631\u064A\u062E","\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629"],x)}
            ${C(`\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (${t.training?.length||0})`,"#047857",["\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","\u0627\u0644\u0645\u062F\u0631\u0628","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621","\u0627\u0644\u062D\u0627\u0644\u0629"],A)}
            ${C(`\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 (${t.ppe?.length||0})`,"#B45309",["\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644","\u0646\u0648\u0639 \u0627\u0644\u0645\u0639\u062F\u0629","\u0627\u0644\u0643\u0645\u064A\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645","\u0627\u0644\u062D\u0627\u0644\u0629"],T)}
            ${C(`\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0627\u062A (${t.behaviorMonitoring?.length||0})`,"#6D28D9",["\u0646\u0648\u0639 \u0627\u0644\u0633\u0644\u0648\u0643","\u0627\u0644\u062A\u0642\u064A\u064A\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641"],v)}
            ${C(`\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (${t.clinicVisits?.length||0})`,"#BE185D",["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u062A\u0634\u062E\u064A\u0635","\u0627\u0644\u0639\u0644\u0627\u062C"],I)}
            ${C(`\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${t.incidents?.length||0})`,"#C2410C",["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629"],N)}

            ${L===0?`<div style="margin-top:24px;padding:18px;border-radius:12px;background:#F8FAFC;border:2px dashed #CBD5E1;text-align:center;color:#475569;font-size:13px;${a}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0641\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u064E\u0639\u0629.</div>`:""}
        `},buildContractorReportPdfContent(t){const e=t.contractor||{},i=this._AR_PDF_TEXT_STYLE_,a=f=>Utils.escapeHTML(String(f??"")),s=f=>f&&typeof Utils.formatDate=="function"?Utils.formatDate(f):"",r=t.contractorName||e.companyName||e.name||"\u2014",n=t.contractorCode||e.code||e.isoCode||"",o=r.trim().split(/\s+/).slice(0,2).map(f=>f.charAt(0)).join("")||"\u0645",p=s(new Date)||new Date().toLocaleDateString("ar-SA"),u=t.ptwOpen!=null?t.ptwOpen:0,l=t.ptwClosed!=null?t.ptwClosed:0,m=Array.isArray(t.ptwContractor)?t.ptwContractor:[],g=Array.isArray(t.injuriesContractor)?t.injuriesContractor:[],h=(f,S,U,P,E,H)=>`
            <div style="flex:1 1 140px;min-width:120px;padding:14px 12px;border-radius:12px;background:${U};border:1px solid ${P};text-align:center;">
                <div style="font-size:11px;color:${E};font-weight:600;margin-bottom:6px;${i}">${a(f)}</div>
                <div style="font-size:26px;font-weight:800;color:${H};line-height:1.1;${i}">${S}</div>
            </div>`,C=f=>`padding:11px 8px;border:1px solid ${f};text-align:center;font-weight:700;font-size:11px;${i}`,b=`padding:10px 8px;border:1px solid #E5E7EB;text-align:right;font-size:11px;vertical-align:top;${i}`,x=`padding:10px 8px;border:1px solid #E5E7EB;text-align:center;font-size:11px;vertical-align:top;${i}`,A=(f,S,U,P)=>P?`
                <div style="margin:28px 0 16px;direction:rtl;">
                    <h3 dir="rtl" style="font-size:16px;margin:0 0 12px;color:${S};font-weight:700;border-right:4px solid ${S};padding-right:12px;${i}">${a(f)}</h3>
                    <table dir="rtl" style="width:100%;border-collapse:collapse;${i}">
                        <thead><tr style="background:${S};color:#FFFFFF;">${U.map(E=>`<th dir="rtl" style="${C(S)}">${a(E)}</th>`).join("")}</tr></thead>
                        <tbody>${P}</tbody>
                    </table>
                </div>`:"",T=this.CONTRACTOR_REPORT_PDF_MAX_SECTION_ROWS||50,v=(f,S,U,P,E)=>this._buildPdfSectionTable_(A,f,S,U,P,E,T),I=m.length+(t.violations?.length||0)+(t.incidents?.length||0)+g.length+(t.training?.length||0)+(t.clinicVisits?.length||0)+(t.contractorEvaluations?.length||0),N=e.approvalDate?s(e.approvalDate):"",L=e.expiryDate?s(e.expiryDate):"";return`
            <div style="direction:rtl;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:18px;padding:20px 22px;border-radius:16px;background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%);border:1px solid #fcd34d;">
                    <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#d97706,#b45309);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0;box-shadow:0 8px 20px rgba(217,119,6,0.25);${i}">${a(o)}</div>
                    <div style="flex:1;min-width:0;">
                        <h2 dir="rtl" style="margin:0 0 8px;font-size:22px;font-weight:800;color:#92400e;${i}">${a(r)}</h2>
                        <div style="display:flex;flex-wrap:wrap;gap:8px 20px;font-size:12px;color:#334155;${i}">
                            <span><strong style="color:#b45309;">\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</strong> ${a(n)}</span>
                            ${e.entityType?`<span><strong style="color:#b45309;">\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646:</strong> ${a(e.entityType)}</span>`:""}
                            ${e.serviceType?`<span><strong style="color:#b45309;">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629:</strong> ${a(e.serviceType)}</span>`:""}
                            ${N?`<span><strong style="color:#b45309;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</strong> ${a(N)}</span>`:""}
                            ${L?`<span><strong style="color:#b45309;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</strong> ${a(L)}</span>`:""}
                        </div>
                    </div>
                    <div style="text-align:left;font-size:11px;color:#64748b;line-height:1.7;flex-shrink:0;${i}">
                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631:</strong> ${a(p)}</div>
                        <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ${I}</div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:8px;direction:rtl;">
                <h3 dir="rtl" style="font-size:15px;margin:0 0 14px;color:#003865;font-weight:700;${i}">\u0645\u0644\u062E\u0635 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</h3>
                <div style="display:flex;flex-wrap:wrap;gap:12px;">
                    ${h("\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0641\u062A\u0648\u062D\u0629",u,"#CCFBF1","#99F6E4","#0F766E","#115E59")}
                    ${h("\u062A\u0635\u0627\u0631\u064A\u062D \u0645\u063A\u0644\u0642\u0629",l,"#ECFDF5","#A7F3D0","#047857","#065F46")}
                    ${h("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D",m.length,"#F0FDFA","#5EEAD4","#0D9488","#134E4A")}
                    ${h("\u0627\u0644\u062D\u0648\u0627\u062F\u062B",t.incidents?.length||0,"#FFF7ED","#FED7AA","#C2410C","#9A3412")}
                    ${h("\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",g.length,"#FFEDD5","#FDBA74","#EA580C","#C2410C")}
                    ${h("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",t.violations?.length||0,"#FEF2F2","#FECACA","#B91C1C","#991B1B")}
                    ${h("\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",t.training?.length||0,"#ECFDF5","#BBF7D0","#047857","#065F46")}
                    ${h("\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",t.clinicVisits?.length||0,"#FDF2F8","#FBCFE8","#BE185D","#9D174D")}
                    ${h("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",t.contractorEvaluations?.length||0,"#EEF2FF","#C7D2FE","#4F46E5","#3730A3")}
                </div>
            </div>

            ${v("\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644","#0D9488",["\u0631\u0642\u0645 \u0627\u0644\u062A\u0635\u0631\u064A\u062D","\u0646\u0648\u0639/\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644","\u0627\u0644\u062D\u0627\u0644\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629"],m,f=>`
            <tr>
                <td style="${x}">${a(f.permitId||f.id||f.serialNumber)}</td>
                <td style="${b}">${a(f.workDescription||f.workType||f.location||f.siteName)}</td>
                <td style="${x}">${a(this.normalizePTWStatus(f.status))}</td>
                <td style="${x}">${s(f.startDate||f.createdAt||f.issueDate)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","#B91C1C",["\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630","\u0627\u0644\u062D\u0627\u0644\u0629"],t.violations,f=>`
            <tr>
                <td style="${b}">${a(f.violationType)}</td>
                <td style="${x}">${s(f.violationDate)}</td>
                <td style="${x}">${a(f.severity)}</td>
                <td style="${b}">${a(f.actionTaken)}</td>
                <td style="${x}">${a(f.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062D\u0648\u0627\u062F\u062B","#C2410C",["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0648\u0635\u0641","\u0627\u0644\u0634\u062F\u0629","\u0627\u0644\u062D\u0627\u0644\u0629"],t.incidents,f=>`
            <tr>
                <td style="${x}">${s(f.incidentDate||f.date||f.createdAt)}</td>
                <td style="${b}">${a(String(f.title||f.description||"").substring(0,120))}</td>
                <td style="${x}">${a(f.severity)}</td>
                <td style="${x}">${a(f.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A","#EA580C",["\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629","\u0627\u0644\u0634\u062F\u0629"],g,f=>`
            <tr>
                <td style="${b}">${a(f.personName||f.employeeName||f.contractorName)}</td>
                <td style="${x}">${s(f.injuryDate||f.date||f.createdAt)}</td>
                <td style="${b}">${a(f.injuryType||f.injuryDescription||f.description)}</td>
                <td style="${x}">${a(f.severity||f.injurySeverity)}</td>
            </tr>`)}
            ${v("\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628","#047857",["\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","\u0627\u0644\u0645\u062F\u0631\u0628","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621","\u0627\u0644\u062D\u0627\u0644\u0629"],t.training,f=>`
            <tr>
                <td style="${b}">${a(f.name)}</td>
                <td style="${b}">${a(f.trainer)}</td>
                <td style="${x}">${s(f.startDate)}</td>
                <td style="${x}">${a(f.status)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","#BE185D",["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629","\u0627\u0644\u0627\u0633\u0645","\u0627\u0644\u0633\u0628\u0628","\u0627\u0644\u062A\u0634\u062E\u064A\u0635","\u0627\u0644\u0639\u0644\u0627\u062C"],t.clinicVisits,f=>`
            <tr>
                <td style="${x}">${s(f.visitDate)}</td>
                <td style="${b}">${a(this._getContractorClinicVisitDisplayName_(f)||"\u2014")}</td>
                <td style="${b}">${a(f.reason||"\u0632\u064A\u0627\u0631\u0629 \u0639\u0627\u062F\u064A\u0629")}</td>
                <td style="${b}">${a(f.diagnosis)}</td>
                <td style="${b}">${a(f.treatment)}</td>
            </tr>`)}
            ${v("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A","#4F46E5",["\u0627\u0644\u0645\u0634\u0631\u0648\u0639","\u0627\u0644\u0645\u0642\u064A\u0651\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u062F\u0631\u062C\u0629/\u0627\u0644\u062A\u0642\u064A\u064A\u0645"],t.contractorEvaluations,f=>`
            <tr>
                <td style="${b}">${a(f.projectName||"\u062A\u0642\u064A\u064A\u0645")}</td>
                <td style="${b}">${a(f.evaluatorName)}</td>
                <td style="${x}">${s(f.evaluationDate)}</td>
                <td style="${x}">${f.finalScore!=null?f.finalScore:""} ${a(f.finalRating||"")}</td>
            </tr>`)}

            ${I===0?`<div style="margin-top:24px;padding:18px;border-radius:12px;background:#F8FAFC;border:2px dashed #CBD5E1;text-align:center;color:#475569;font-size:13px;${i}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u064E\u0639\u0629.</div>`:""}
        `},contractorReportMatchesSearchCode(t,e){if(!t||e==null||e==="")return!1;const i=String(e).trim();if(!i)return!1;if(String(t.contractorCode||"").trim()===i||t.contractorName&&String(t.contractorName).trim()===i)return!0;const a=t.contractor||{};return[a.code,a.isoCode,a.contractorId,a.id,a.companyName,a.name].some(r=>r!=null&&String(r).trim()===i)},async exportEmployeeReportPDF(t){const e=String(t||"").trim(),i=window.currentEmployeeReport;(!i||!this.employeeReportMatchesSearchCode(i,e))&&await this.generateEmployeeReport(e);const a=window.currentEmployeeReport;if(!a){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0642\u0631\u064A\u0631");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const s=a.employee.name||"",r=`EMP-REPORT-${e}-${new Date().toISOString().slice(0,10)}`,n=`\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u0648\u0638\u0641: ${s}`,o=this.buildEmployeeReportPdfContent(a,e),p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(r,n,o,!1,!1,{titleAr:n,titleEn:"Comprehensive Employee Report",compactPdfFooter:!0,includeQRCode:!1},new Date,new Date):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(n)}</title></head><body>${o}</body></html>`,l=`\u062A\u0642\u0631\u064A\u0631-\u0645\u0648\u0638\u0641-${String(e).replace(/[\\/:*?"<>|]/g,"_")}-${new Date().toISOString().slice(0,10)}.pdf`,m=await this._downloadHtmlReportAsPdf(p,l);Loading.hide(),m?Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"):Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(s.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async generateContractorReport(t){AppState.appData||(AppState.appData={}),await this.ensureContractorReportData();let e=AppState.appData;const i=e.approvedContractors||[],a=String(t).trim(),s=typeof Utils<"u"&&typeof Utils.findApprovedContractorByTerm=="function"?Utils.findApprovedContractorByTerm(a,i):{contractor:null,ambiguous:!1,matches:[]},r=s.contractor;if(s.ambiguous){Notification.error("\u064A\u0648\u062C\u062F \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0642\u0627\u0648\u0644 \u0645\u0637\u0627\u0628\u0642. \u0627\u0633\u062A\u062E\u062F\u0645 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0643\u0627\u0645\u0644 \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u062A\u062C\u0646\u0628 \u0623\u064A \u062E\u0644\u0637.");const c=document.getElementById("contractor-report-content");c&&c.classList.add("hidden");return}if(!r){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645");const c=document.getElementById("contractor-report-content");c&&c.classList.add("hidden");return}let n=r;if(typeof Contractors<"u"&&typeof Contractors.resolveContractorForAnalytics=="function"){const c=Contractors.resolveContractorForAnalytics(typeof Contractors.getPreferredContractorAnalyticsKey=="function"?Contractors.getPreferredContractorAnalyticsKey(r,a):a,r.companyName||r.name||a);c&&(n={...c,...r,aliasIds:Array.from(new Set([...c.aliasIds||[],...r.aliasIds||[]]))})}typeof Contractors<"u"&&typeof Contractors.prepareContractorForAnalytics=="function"&&(n=Contractors.prepareContractorForAnalytics(n));const o=String(n.companyName||n.name||"").trim(),p=typeof Contractors<"u"&&typeof Contractors.getPreferredContractorAnalyticsKey=="function"?Contractors.getPreferredContractorAnalyticsKey(n,a):n.code||n.isoCode||n.contractorId||n.id||t,u=n.code||n.isoCode||p||t,l=typeof Contractors<"u"&&typeof Contractors.buildContractorAnalyticsMatchers=="function"?Contractors.buildContractorAnalyticsMatchers(n,p):typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function"?Utils.buildContractorIdentityMatcher(n,p):null,m=l?l.matchesContractor:(()=>!1),g=l?c=>l.violationBelongsToContractor(c):(()=>!1),h=l?c=>l.evaluationBelongsToContractor(c):(()=>!1),C=c=>!c||!l?!1:typeof l.hasAnyRecordIds=="function"&&l.hasAnyRecordIds.length>0?l.hasAnyRecordIds(c):["contractorId","contractorCode","code","isoCode","licenseNumber","contractNumber","approvedEntityId","entityCode"].some(D=>String(c?.[D]||"").trim()!==""),b=c=>!c||!l?!1:typeof l.violationBelongsToContractor=="function"?l.violationBelongsToContractor(c):m(c),x=c=>!l||typeof l.matchesNameValue!="function"?!1:(Array.isArray(c)?c:[c]).filter(Boolean).some(D=>l.matchesNameValue(D)),A=(c,D)=>{const F=Array.isArray(c)?c:null,j=Array.isArray(D)?D:[];return F&&F.length>0?F:j},T=this.getContractorReportCacheKey(n,p,a),v=this.getContractorReportDataSignature(),I=`${T}::${v}`,N=this.contractorReportCache.get(T);if(N&&N.__signature===v&&Date.now()-Number(N.__cachedAt||0)<6e4){this.renderContractorReportFromData(N);return}if(this.contractorReportRequests.has(I)){this.renderContractorReportLoading(n,u);const c=await this.contractorReportRequests.get(I);c&&this.renderContractorReportFromData(c);return}let L=null;const f=new Promise(c=>{L=c});this.contractorReportRequests.set(I,f),this.renderContractorReportLoading(n,u);let S=null;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState.googleConfig?.appsScript?.enabled)try{const c=await GoogleIntegration.sendRequest({action:"getContractorDetailedAnalytics",data:{contractor:n,contractorId:p}});c&&c.success&&c.data&&(S=c.data)}catch(c){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629:",c)}const U=(c,D=[],F=[])=>{const j=[],dt=new Set,lt=new Set;return(Array.isArray(c)?c:[]).forEach(q=>{if(!q||typeof q!="object")return;const J=(Array.isArray(D)?D:[]).map(tt=>String(q?.[tt]||"").trim().toLowerCase()).find(Boolean);if(J){if(dt.has(J))return;dt.add(J),j.push(q);return}const Z=(Array.isArray(F)?F:[]).map(tt=>String(q?.[tt]||"").trim().toLowerCase()).join("|");!Z||lt.has(Z)||(lt.add(Z),j.push(q))}),j},P=U((e.violations||[]).filter(c=>g(c)),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]),E=A(S?.violations,P),H=c=>c&&(c.personType==="contractor"||c.contractorName||c.affiliation==="contractor"||c.contractorId!=null&&c.contractorId!==""),d=(e.incidents||[]).filter(c=>H(c)&&b(c)),y=A(S?.incidents,d),$=(e.clinicVisits||[]).concat(Array.isArray(e.clinicContractorVisits)?e.clinicContractorVisits:[]),w=new Set,M=$.filter(c=>{if(!c)return!1;const D=String(c.id||"").trim();return D?w.has(D)?!1:(w.add(D),!0):!0}).filter(c=>(c.personType==="contractor"||c.personType==="external"||c.contractorName)&&b(c)),R=A(S?.clinicVisits,M),W=U((e.contractorEvaluations||[]).filter(c=>h(c)),["evaluationId","id","isoCode"],["contractorId","contractorName","evaluationDate","projectName","finalScore"]),_=A(S?.evaluations,W),V=new Set,B=_.filter(c=>{const D=String(c?.evaluationId||c?.id||"").trim();return D?V.has(D)?!1:(V.add(D),!0):!0}),pt=(Array.isArray(e.training)?e.training:[]).filter(c=>{if(!c)return!1;if((c.contractorName||c.contractorId||c.contractorCode)&&m(c))return!0;let D=c.participants;if(typeof D=="string"&&D.trim())try{D=JSON.parse(D)}catch{D=null}return D&&Array.isArray(D)?D.some(F=>F?(F.personType==="contractor"||F.type==="contractor"||F.contractorName||F.companyName||F.company||F.contractorCompany)&&m(F):!1):!1}),ft=(Array.isArray(e.contractorTrainings)?e.contractorTrainings:[]).filter(c=>{if(!c)return!1;if(m(c))return!0;const D=String(c.contractorName||c.companyName||"").replace(/\s+/g," ").trim();return l?!C(c)&&l.matchesNameValue(D):!1}),et=new Set;let z=[...pt];ft.forEach(c=>{const D=c.id||c.date+(c.topic||c.trainingName||"");D&&et.has(D)||(D&&et.add(D),z.push({id:c.id,name:c.topic||c.trainingName||c.name||"\u062A\u062F\u0631\u064A\u0628 \u0645\u0642\u0627\u0648\u0644",trainer:c.trainer||"",startDate:c.date||c.createdAt,status:c.status||"\u0645\u0646\u0641\u0630"}))});const ut=this.getUnifiedPTWDataset(e),mt=c=>{if(!c)return!1;if(m(c))return!0;if(C(c))return!1;const D=String(c.requestingParty||"").replace(/\s+/g," ").trim(),F=String(c.authorizedParty||"").replace(/\s+/g," ").trim(),j=String(c.responsible||"").replace(/\s+/g," ").trim();return x([D,F,j])};let G=ut.filter(mt),bt=G.filter(c=>!this.isPTWClosedStatus(c?.status)).length,vt=G.filter(c=>this.isPTWClosedStatus(c?.status)).length,gt=(e.injuries||[]).filter(c=>{if(!c||(c.personType||"").toString().toLowerCase()!=="contractor")return!1;if(m(c))return!0;const F=String(c.personName||c.employeeName||c.contractorName||"").trim();return l?!C(c)&&l.matchesNameValue(F):!1});const at=A(S?.trainings,z),O=A(S?.ptw,G);let K=O.filter(c=>!this.isPTWClosedStatus(c?.status)).length,Y=O.filter(c=>this.isPTWClosedStatus(c?.status)).length;Array.isArray(S?.ptw)&&S.ptw.length>0&&(typeof S.ptwOpenCount=="number"&&(K=S.ptwOpenCount),typeof S.ptwClosedCount=="number"&&(Y=S.ptwClosedCount));const it=A(S?.injuries,gt),st=document.getElementById("contractor-report-data"),X=document.getElementById("contractor-report-content"),rt=document.getElementById("export-contractor-report-btn"),nt=document.getElementById("employee-report-content");if(nt&&nt.classList.add("hidden"),X&&X.classList.add("hidden"),!st){Notification.error("\u0639\u0646\u0635\u0631 \u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}const ot=n.approvalDate?Utils.formatDate(n.approvalDate):"",ct=n.expiryDate?Utils.formatDate(n.expiryDate):"";st.innerHTML=`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            <i class="fas fa-hard-hat ml-2"></i>
                            ${Utils.escapeHTML(o||"\u0645\u0642\u0627\u0648\u0644")}
                        </h3>
                        <p class="text-gray-600">
                            <i class="fas fa-barcode ml-2"></i>
                            \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644: <strong>${Utils.escapeHTML(String(u))}</strong>
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
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ea580c; margin-bottom: 0.25rem;">${y.length}</div>
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

                ${y.length>0?`
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u062D\u0648\u0627\u062F\u062B (${y.length})</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${y.slice(0,5).map(c=>`
                                    <div class="border rounded p-3">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-semibold">${Utils.escapeHTML(String(c.title||c.description||"").substring(0,60))}</span>
                                            <span class="badge badge-warning">${c.severity||""}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">${c.date?Utils.formatDate(c.date):""}</p>
                                    </div>
                                `).join("")}
                                ${y.length>5?`<p class="text-sm text-gray-500 text-center mt-2">\u0648 ${y.length-5} \u062D\u0627\u062F\u062B \u0622\u062E\u0631...</p>`:""}
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
        `,X.classList.remove("hidden"),rt&&(rt.disabled=!1);const Q={__cacheKey:T,__signature:v,__cachedAt:Date.now(),contractor:n,contractorCode:u,contractorName:o,violations:E,incidents:y,training:at,clinicVisits:R,contractorEvaluations:B,ptwContractor:O,ptwOpen:K,ptwClosed:Y,injuriesContractor:it};window.currentContractorReport=Q,this.contractorReportCache.set(T,Q),this.contractorReportRequests.delete(I),typeof L=="function"&&L(Q)},async exportContractorReportPDF(t){const e=String(t||"").trim(),i=window.currentContractorReport;(!i||!this.contractorReportMatchesSearchCode(i,e))&&await this.generateContractorReport(e);const a=window.currentContractorReport;if(!a){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const s=a.contractorName||"",r=String(a.contractorCode||e).replace(/[\\/:*?"<>|]/g,"_"),n=`CON-REPORT-${r}-${new Date().toISOString().slice(0,10)}`,o=`\u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u0642\u0627\u0648\u0644: ${s}`,p=this.buildContractorReportPdfContent(a),u=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,o,p,!1,!1,{titleAr:o,titleEn:"Comprehensive Contractor Report",compactPdfFooter:!0,includeQRCode:!1},new Date,new Date):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(o)}</title></head><body>${p}</body></html>`,l=`\u062A\u0642\u0631\u064A\u0631-\u0645\u0642\u0627\u0648\u0644-${r}-${new Date().toISOString().slice(0,10)}.pdf`,m=await this._downloadHtmlReportAsPdf(u,l);Loading.hide(),m?Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"):Notification.error("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0623\u0648\u0644\u0627\u064B.")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 PDF:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(s&&s.message?s.message:String(s)))}},_getDashboardIncidentsRecords(t){const e=t&&typeof t=="object"?t:{},i=Array.isArray(e.incidents)?e.incidents.filter(Boolean):[];if(i.length>0){const r=new Set;return i.filter(n=>{const o=String(n.id||n.incidentId||"").trim();return!o||r.has(o)?!1:(r.add(o),!0)})}const a=Array.isArray(e.incidentsRegistry)?e.incidentsRegistry.filter(Boolean):[],s=new Set;return a.filter(r=>{const n=String(r.incidentId||r.id||r.registryId||"").trim();return!n||s.has(n)?!1:(s.add(n),!0)})},_classifyIncidentYearForDashboard(t,e){if(!t||typeof t!="object")return"unknown";const i=t.year!=null?t.year:t.incidentYear;if(i!=null&&String(i).trim()!==""){const o=String(i).trim();if(/^0+$/.test(o))return"unknown";const p=parseInt(o,10);return!Number.isFinite(p)||p<=0||p>e+5?"unknown":p===e?"current":"prior"}const s=t.incidentDate||t.date||t.createdAt;if(!s)return"unknown";const r=new Date(s);if(isNaN(r.getTime()))return"unknown";const n=r.getFullYear();return n<=0||n<1900||n>e+5||n>e?"unknown":n===e?"current":"prior"},workHoursIncludeContractors(){const t=typeof localStorage<"u"?localStorage.getItem("hse_work_hours_include_contractors"):null;return t===null||String(t).trim()===""?!0:t!=="0"&&String(t).toLowerCase()!=="false"&&String(t).toLowerCase()!=="no"},getDashboardTotalWorkHours(t){const e=typeof localStorage<"u"?localStorage.getItem("hse_total_work_hours"):null;if(e!=null&&String(e).trim()!==""){const r=parseFloat(String(e).replace(/,/g,""));if(Number.isFinite(r)&&r>0)return r}const i=t&&typeof t=="object"?t:{},a=Array.isArray(i.employees)?i.employees:[],s=Array.isArray(i.approvedContractors)?i.approvedContractors:[];return this._computeEstimatedAnnualWorkHoursTotal(a,s)},_getDashboardWorkforceCount(t){const e=t&&typeof t=="object"?t:{},i=Array.isArray(e.employees)?e.employees:[],a=Array.isArray(e.approvedContractors)?e.approvedContractors:[],s=i.filter(n=>n&&!this._isEmployeeInactive(n)).length,r=this.workHoursIncludeContractors()?this._sumContractorWorkforceHeadcount(a,e):0;return s+r},_getDaysSinceLastIncidentForDashboard(t){const e=t&&typeof t=="object"?t:{},i=this._getDashboardIncidentsRecords(e).filter(n=>n&&(n.incidentDate||n.date||n.createdAt));if(i.length===0)return null;const a=i.slice().sort((n,o)=>{const p=new Date(n.incidentDate||n.date||n.createdAt);return new Date(o.incidentDate||o.date||o.createdAt)-p}),s=new Date(a[0].incidentDate||a[0].date||a[0].createdAt),r=new Date;return r.setHours(0,0,0,0),s.setHours(0,0,0,0),Math.floor((r-s)/864e5)},getDashboardSafeWorkingHours(t){const e=typeof localStorage<"u"?localStorage.getItem("hse_safe_working_hours"):null;if(e!=null&&String(e).trim()!==""){const p=parseFloat(String(e).replace(/,/g,""));if(Number.isFinite(p)&&p>=0)return Math.round(p)}const i=t&&typeof t=="object"?t:{},a=this._getDaysSinceLastIncidentForDashboard(i);if(a===null)return this.getDashboardTotalWorkHours(i);const s=this._getDashboardWorkforceCount(i),r=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_hours_per_day"):null),n=!isNaN(r)&&r>0?r:8,o=Math.max(0,s)*n;return Math.round(Math.max(0,a)*o)},_parseNumWorkHours(t){if(t==null||t==="")return NaN;const e=parseFloat(String(t).replace(/,/g,""));return Number.isFinite(e)?e:NaN},_getDashboardDefaultAnnualHoursPerCapita(){const t=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_hours_per_day"):null),e=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_work_days_per_month"):null),i=this._parseNumWorkHours(typeof localStorage<"u"?localStorage.getItem("hse_work_months_per_year"):null),a=!isNaN(t)&&t>0?t:8,s=!isNaN(e)&&e>0?e:22,r=!isNaN(i)&&i>0?i:12;return a*s*r},_isEmployeeInactive(t){if(!t)return!1;const e=t.status!=null&&t.status!==""?String(t.status).trim():"";return!!((t.resignationDate!=null&&t.resignationDate!==""?String(t.resignationDate).trim():"")||e==="inactive"||e.toLowerCase()==="inactive"||e==="\u063A\u064A\u0631 \u0646\u0634\u0637")},_sumContractorWorkforceHeadcount(t,e){const i=e&&typeof e=="object"?e:typeof AppState<"u"&&AppState.appData?AppState.appData:{},a=Array.isArray(i.externalWorkforceMonthly)?i.externalWorkforceMonthly:[],s=new Date().getFullYear(),r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],n=a.filter(u=>u&&Number(u.year)===s);if(n.length>0){let u=0;if(n.forEach(l=>{const m=parseFloat(l.total);Number.isFinite(m)&&m>0?u+=Math.round(m):r.forEach(g=>{const h=parseFloat(l[g]);Number.isFinite(h)&&h>0&&(u+=Math.round(h))})}),u>0)return u}if(!Array.isArray(t)||t.length===0)return 0;const o=["workerCount","workersCount","laborCount","manpower","employeesCount","totalWorkers","averageWorkers","contractorWorkers","numberOfWorkers","expectedWorkers","workforceCount"];let p=0;return t.forEach(u=>{if(!u||typeof u!="object"||u.active===!1||u.deactivated===!0||u.isActive==="inactive"||u.isActive===!1||u.isActive==="false"||u.isActive==="FALSE")return;let l=NaN;for(let m=0;m<o.length;m++){const g=this._parseNumWorkHours(u[o[m]]);if(!isNaN(g)&&g>0){l=g;break}}isNaN(l)||(p+=Math.round(l))}),p===0?t.filter(l=>l&&l.active!==!1&&l.deactivated!==!0&&l.isActive!=="inactive"&&l.isActive!==!1&&l.isActive!=="false"&&l.isActive!=="FALSE").length:p},_computeEstimatedAnnualWorkHoursTotal(t,e){const i=Array.isArray(t)?t.filter(l=>l&&!this._isEmployeeInactive(l)):[],a=i.length,s=this._getDashboardDefaultAnnualHoursPerCapita(),r=l=>{const m=["annualWorkHours","yearlyWorkHours","workHoursYear","annualHours","estimatedAnnualHours","totalAnnualHours"];for(let C=0;C<m.length;C++){const b=this._parseNumWorkHours(l[m[C]]);if(!isNaN(b)&&b>0)return b}const g=this._parseNumWorkHours(l.monthlyHours??l.monthlyWorkHours??l.workHoursMonth);if(!isNaN(g)&&g>0)return g*12;const h=this._parseNumWorkHours(l.weeklyHours??l.hoursPerWeek??l.workHoursWeek);return!isNaN(h)&&h>0?h*52:null};let n=0,o=0;i.forEach(l=>{const m=r(l);m!=null&&(n+=m,o+=1)});let p=0;a>0&&(o===0?p=a*s:p=n+(a-o)*s);let u=0;return this.workHoursIncludeContractors()&&(u=this._sumContractorWorkforceHeadcount(e,AppState.appData)*s),Math.round(p+u)},_updateKpiElement(t,e){if(!t||e==null)return;const i=String(e);t.textContent!==i&&(t.textContent=i,this.applyEnglishNumberFormat(t))},updateKPIs(){const t=AppState.appData;if(!t){Utils.safeWarn("\u26A0\uFE0F AppState.appData \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631");return}const e=AppState.syncMeta?.userEmail?String(AppState.syncMeta.userEmail).trim().toLowerCase():"",i=AppState.currentUser?.email?String(AppState.currentUser.email).trim().toLowerCase():"";if(e&&i&&e!==i){Utils.safeWarn("\u26A0\uFE0F \u0628\u064A\u0627\u0646\u0627\u062A KPI \u0645\u0646 \u062C\u0644\u0633\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u0633\u0627\u0628\u0642 \u2014 \u062A\u062E\u0637\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B"),typeof Notification<"u"&&typeof Notification.warning=="function"&&Notification.warning("\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0644\u0627 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A \u2014 \u062C\u0627\u0631\u064A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629..."),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncData=="function"&&GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1}).catch(()=>{});return}try{const a=Array.isArray(t.incidents)?t.incidents:[],s=Array.isArray(t.users)?t.users:[],r=this.getUnifiedPTWDataset(t),n=Array.isArray(t.nearmiss)?t.nearmiss:[],o=Array.isArray(t.employees)?t.employees:[],p=this._getDashboardIncidentsRecords(t),u=p.length,l=new Date().getFullYear();let m=0,g=0;p.forEach($=>{const w=this._classifyIncidentYearForDashboard($,l);w==="current"?m+=1:w==="prior"&&(g+=1)});const h=s.filter($=>$&&$.active!==!1).length,C=r.filter($=>!this.isPTWClosedStatus($?.status)).length,b=r.filter($=>this.isPTWClosedStatus($?.status)).length,x=r.length,A=this.dashboardCan("incidents"),T=this.dashboardCan("nearmiss"),v=A?a:[],I=T?n:[],N=v.length+I.length,L=v.filter($=>$&&($.status==="\u0645\u063A\u0644\u0642"||$.status==="\u0645\u062D\u0644\u0648\u0644")).length,f=I.filter($=>$&&($.correctiveProposed===!1||$.status==="\u0645\u063A\u0644\u0642"||$.status==="\u0645\u062D\u0644\u0648\u0644")).length,S=N>0?Math.round((L+f)/N*100):A||T?100:0,U=S>=90?"kpi-value text-green-600":S>=70?"kpi-value text-yellow-600":"kpi-value text-red-600",P=this.getDashboardTotalWorkHours(t),E=this.getDashboardSafeWorkingHours(t);let H="N/A";if(A){const $=this._getDaysSinceLastIncidentForDashboard(t);$!==null&&(H=$>=0?this.formatNumber($):"0")}const d=this.getReportsStatisticsUpdates(),y=this;(function(){try{if(y.dashboardCan("incidents")){const w=document.getElementById("total-incidents");y._updateKpiElement(w,y.formatNumber(u));const k=document.getElementById("dash-incidents-label-current"),M=document.getElementById("dash-incidents-num-current"),R=document.getElementById("dash-incidents-num-prior"),W=`${y.t("dash.incidentsCurrentYear","\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A")} (${l}):`;k&&k.textContent!==W&&(k.textContent=W),y._updateKpiElement(M,y.formatNumber(m)),y._updateKpiElement(R,y.formatNumber(g))}if(y.dashboardCan("users")){const w=document.getElementById("active-users");w&&(w.textContent=y.formatNumber(h),y.applyEnglishNumberFormat(w))}if(y.dashboardCan("ptw")){const w=document.getElementById("open-ptw-count");w&&(w.textContent=y.formatNumber(C),y.applyEnglishNumberFormat(w));const k=document.getElementById("closed-ptw-count");k&&(k.textContent=y.formatNumber(b),y.applyEnglishNumberFormat(k));const M=document.getElementById("total-ptw-count");M&&(M.textContent=y.formatNumber(x),y.applyEnglishNumberFormat(M));const R=document.getElementById("active-ptw");R&&(R.textContent=y.formatNumber(C),y.applyEnglishNumberFormat(R))}if(A||T){const w=document.getElementById("compliance-rate");w&&(w.textContent=S+"%",w.className=U)}if(y.dashboardCan("employees")){const w=document.getElementById("total-work-hours");w&&(w.textContent=y.formatNumber(P),y.applyEnglishNumberFormat(w));const k=document.getElementById("safe-working-hours");k&&(k.textContent=y.formatNumber(E),y.applyEnglishNumberFormat(k));const M=document.getElementById("dash-kpi-employees-active-count");if(M){const W=o.filter(_=>_&&!y._isEmployeeInactive(_)).length;M.textContent=y.formatNumber(W),y.applyEnglishNumberFormat(M)}const R=document.getElementById("dash-kpi-contractors-active-count");if(R){const W=Array.isArray(t.approvedContractors)?t.approvedContractors:[],_=y._sumContractorWorkforceHeadcount(W,t);y._updateKpiElement(R,y.formatNumber(_)),(!Array.isArray(t.externalWorkforceMonthly)||t.externalWorkforceMonthly.length===0)&&typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function"&&GoogleIntegration.readFromSheets("ExternalWorkforceMonthly",15e3).then(V=>{Array.isArray(V)&&V.length>0?AppState.appData.externalWorkforceMonthly=V:Array.isArray(AppState.appData.externalWorkforceMonthly)||(AppState.appData.externalWorkforceMonthly=[]);const B=y._sumContractorWorkforceHeadcount(W,AppState.appData);y._updateKpiElement(document.getElementById("dash-kpi-contractors-active-count"),y.formatNumber(B))}).catch(()=>{})}}if(y.dashboardCan("training")){const w=document.getElementById("dash-kpi-training-programs"),k=Array.isArray(t.training)?t.training:[];y._updateKpiElement(w,y.formatNumber(k.length))}if(y.dashboardCan("clinic")){const w=document.getElementById("dash-kpi-clinic-visits-total");w&&(w.textContent=y.formatNumber(y.getClinicVisitsTotalCount(t)),y.applyEnglishNumberFormat(w))}if(A){const w=document.getElementById("days-without-injury");w&&(w.textContent=H,y.applyEnglishNumberFormat(w))}y.dashboardCan("incidents")&&y.calculateSafetyMetrics(t),d&&d.length&&y.applyReportsStatisticsUpdates(d),document.querySelector(".safety-metrics-section")?.classList.add("kpis-values-ready"),document.querySelector(".reports-statistics-section")?.classList.add("kpis-values-ready"),document.getElementById("dashboard-section")?.classList.add("kpi-grid-values-ready")}catch(w){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",w)}})()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B KPIs:",a)}},calculateSafetyMetrics(t=null){try{if(!this.dashboardCan("incidents"))return;if(typeof HseMetrics>"u"||!HseMetrics.getDashboardSnapshot){Utils.safeWarn("\u26A0\uFE0F HseMetrics \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644 \u2014 \u062A\u062E\u0637\u064A \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629");return}const e=t&&typeof t=="object"?t:typeof AppState<"u"&&AppState.appData?AppState.appData:{},i=HseMetrics.getDashboardSnapshot(e),a=i.rates||{},s=(n,o)=>{const p=document.getElementById(n);p&&p.textContent!==o&&(p.textContent=o,this.applyEnglishNumberFormat(p))};s("trir-value",this.formatMetricRate(a.trir,2)),s("afr-value",this.formatMetricRate(a.afr,2)),s("far-value",this.formatMetricRate(a.far,4)),s("fr-value",this.formatMetricRate(a.fr,2)),s("lti-value",this.formatNumber(a.ltiCount||0)),s("sr-value",this.formatMetricRate(a.sr,2)),s("ir-value",this.formatMetricRate(a.ir,2));const r=i.totals?.manDays??0;s("man-days-value",this.formatNumber(r)),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F4CA} \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (HseMetrics YTD):",{year:i.year,ytdLimit:i.ytdLimit,totals:i.totals,rates:i.rates})}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",e)}},refreshIncidents(){this.updateKPIs()},loadRecentActivities(){const t=document.getElementById("recent-activities");if(t)try{if(!AppState||!AppState.appData){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                        <p class="text-yellow-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                    </div>
                `;return}const e=[],i=AppState.appData;if(this.dashboardCan("incidents")&&(Array.isArray(i.incidents)?i.incidents:[]).forEach(s=>{if(s)try{const r=s.createdAt||s.date;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.incidentType||s.title||s.type||"\u062D\u0627\u062F\u062B";e.push({type:"incident",title:`\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062D\u0627\u062F\u062B: ${o}`,date:n,time:this.getTimeAgo(r),icon:"fa-exclamation-triangle",color:"text-red-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062D\u0627\u062F\u062B:",r)}}),this.dashboardCan("nearmiss")&&(Array.isArray(i.nearmiss)?i.nearmiss:[]).forEach(s=>{if(s)try{const r=s.createdAt||s.date||s.reportDate;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.title||s.description||s.type||"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643";e.push({type:"nearmiss",title:`\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643: ${o}`,date:n,time:this.getTimeAgo(r),icon:"fa-triangle-exclamation",color:"text-orange-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643:",r)}}),this.dashboardCan("ptw")&&this.getUnifiedPTWDataset(i).forEach(s=>{if(s)try{const r=s.createdAt||s.startDate||s.issueDate;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.permitNumber||s.workDescription||s.location||"\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644";e.push({type:"ptw",title:`\u062A\u0635\u0631\u064A\u062D \u0639\u0645\u0644: ${o}`,date:n,time:this.getTimeAgo(r),icon:"fa-id-card",color:"text-blue-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u0635\u0631\u064A\u062D:",r)}}),this.dashboardCan("training")&&(Array.isArray(i.training)?i.training:[]).forEach(s=>{if(s)try{const r=s.createdAt||s.startDate||s.date;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.programName||s.courseName||s.title||"\u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A";e.push({type:"training",title:`\u062A\u062F\u0631\u064A\u0628: ${o}`,date:n,time:this.getTimeAgo(r),icon:"fa-graduation-cap",color:"text-green-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062A\u062F\u0631\u064A\u0628:",r)}}),this.dashboardCan("violations")&&(Array.isArray(i.violations)?i.violations:[]).forEach(s=>{if(s)try{const r=s.createdAt||s.date||s.violationDate;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.description||s.type||s.category||"\u0645\u062E\u0627\u0644\u0641\u0629";e.push({type:"violation",title:`\u0645\u062E\u0627\u0644\u0641\u0629: ${o}`,date:n,time:this.getTimeAgo(r),icon:"fa-ban",color:"text-pink-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u062E\u0627\u0644\u0641\u0629:",r)}}),this.dashboardCan("periodic-inspections")&&(Array.isArray(i.dailySafetyCheckList)?i.dailySafetyCheckList:[]).forEach(s=>{if(s)try{const r=s.createdAt||s.date;if(!r)return;const n=new Date(r);if(isNaN(n.getTime()))return;const o=s.siteName||s.siteId||"\u0645\u0648\u0642\u0639";e.push({type:"daily-safety-checklist",title:`\u0645\u0631\u0648\u0631 \u064A\u0648\u0645\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629: ${o} - ${s.shift||""}`,date:n,time:this.getTimeAgo(r),icon:"fa-clipboard-check",color:"text-cyan-500"})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A:",r)}}),e.sort((a,s)=>!a.date||!s.date?0:s.date-a.date),e.length===0){t.innerHTML=`
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
                `;return}const i=e.id||e.email;let a=[];if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript)try{const o=await GoogleIntegration.sendToAppsScript("getUserTasksByUserId",{userId:i});o&&o.success&&o.data&&(a=Array.isArray(o.data)?o.data:[])}catch(o){const p=String(o?.message||"").toLowerCase();!p.includes("circuit breaker")&&!p.includes("google apps script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644")&&!p.includes("\u063A\u064A\u0631 \u0645\u0641\u0639\u0644")&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u0645\u0647\u0627\u0645 \u0645\u0646 API:",o)}if(a.length===0){const o=AppState.appData.userTasks||[],p=e.id||e.email;a=o.filter(u=>{const l=u.userId||u.assignedTo||u.assignedUserId;return l===p||l===e.email})}a.sort((o,p)=>{if(o.status!=="\u0645\u0643\u062A\u0645\u0644"&&p.status==="\u0645\u0643\u062A\u0645\u0644")return-1;if(o.status==="\u0645\u0643\u062A\u0645\u0644"&&p.status!=="\u0645\u0643\u062A\u0645\u0644")return 1;const u={\u0639\u0627\u0644\u064A\u0629:3,\u0645\u062A\u0648\u0633\u0637\u0629:2,\u0645\u0646\u062E\u0641\u0636\u0629:1},l=u[o.priority]||0,m=u[p.priority]||0;return l!==m?m-l:o.dueDate&&p.dueDate?new Date(o.dueDate)-new Date(p.dueDate):o.dueDate?-1:p.dueDate?1:o.createdAt&&p.createdAt?new Date(p.createdAt)-new Date(o.createdAt):0});const s=a.slice(0,5);if(s.length===0){t.innerHTML=`
                    <div class="empty-state">
                        <i class="fas fa-tasks text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">${this.t("dash.noTasks","\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0647\u0627\u0645")}</p>
                    </div>
                `;return}const r=o=>{switch(o){case"\u0645\u0643\u062A\u0645\u0644":case"\u0645\u0643\u062A\u0645\u0644\u0629":case"completed":return{icon:"fa-check-circle",color:"text-green-500",bgColor:"bg-green-100"};case"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":case"\u0641\u064A \u0627\u0644\u0639\u0645\u0644":case"in-progress":return{icon:"fa-spinner",color:"text-blue-500",bgColor:"bg-blue-100"};case"\u0645\u0639\u0644\u0642\u0629":case"pending":return{icon:"fa-pause-circle",color:"text-yellow-500",bgColor:"bg-yellow-100"};case"\u0645\u0644\u063A\u0627\u0629":case"cancelled":return{icon:"fa-times-circle",color:"text-red-500",bgColor:"bg-red-100"};default:return{icon:"fa-circle",color:"text-gray-500",bgColor:"bg-gray-100"}}},n=o=>{switch(o){case"\u0639\u0627\u0644\u064A\u0629":case"high":return"text-red-600";case"\u0645\u062A\u0648\u0633\u0637\u0629":case"medium":return"text-yellow-600";case"\u0645\u0646\u062E\u0641\u0636\u0629":case"low":return"text-green-600";default:return"text-gray-600"}};t.innerHTML=s.map(o=>{const p=r(o.status),u=n(o.priority),l=o.dueDate?new Date(o.dueDate):null,m=l&&l<new Date&&o.status!=="\u0645\u0643\u062A\u0645\u0644"&&o.status!=="\u0645\u0643\u062A\u0645\u0644\u0629";let g="";if(l){const C=l-new Date,b=Math.ceil(C/(1e3*60*60*24));m?g=`<span class="text-red-600 font-semibold">\u0645\u062A\u0623\u062E\u0631\u0629 ${Math.abs(b)} \u064A\u0648\u0645</span>`:b===0?g='<span class="text-orange-600 font-semibold">\u0627\u0644\u064A\u0648\u0645</span>':b===1?g='<span class="text-yellow-600 font-semibold">\u063A\u062F\u0627\u064B</span>':b<=7?g=`<span class="text-gray-600">\u062E\u0644\u0627\u0644 ${b} \u0623\u064A\u0627\u0645</span>`:g=`<span class="text-gray-500">${b} \u064A\u0648\u0645 \u0645\u062A\u0628\u0642\u064A</span>`}return`
                    <div class="activity-item ${m?"border-r-4 border-red-500":""}" style="cursor: pointer;" onclick="UI.showSection('user-tasks')">
                        <div class="activity-icon ${p.color} ${p.bgColor}">
                            <i class="fas ${p.icon}"></i>
                        </div>
                        <div class="activity-content" style="flex: 1;">
                            <div class="activity-title" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <span>${Utils.escapeHTML(o.title||o.taskTitle||"\u0645\u0647\u0645\u0629 \u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646")}</span>
                                ${o.priority?`<span class="text-xs px-2 py-1 rounded ${u} bg-gray-100">${Utils.escapeHTML(o.priority)}</span>`:""}
                            </div>
                            <div class="activity-time" style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
                                ${o.status?`<span class="text-xs ${p.color}">${Utils.escapeHTML(o.status)}</span>`:""}
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
                `)}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:",i),t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0647\u0627\u0645</p>
                    <p class="text-xs text-gray-400 mt-2">\u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649</p>
                </div>
            `}},updateStats(){const t=AppState.appData;if(t)try{const e=new Date,i=new Date(e.getTime()-10080*60*1e3),a=this.getUnifiedPTWDataset(t),s=Array.isArray(t.training)?t.training:[],r=this._getDashboardIncidentsRecords(t),n=this.dashboardCan("incidents")?r.filter(h=>{if(!h)return!1;const C=h.incidentDate||h.date||h.createdAt;if(!C)return!1;try{const b=new Date(C);return!isNaN(b.getTime())&&b>i}catch{return!1}}).length:0,o=this.dashboardCan("ptw")?a.filter(h=>!this.isPTWClosedStatus(h?.status)).length:0,p=this.dashboardCan("training")?s.filter(h=>{if(!h||!h.status)return!1;const C=String(h.status).toLowerCase();return C==="\u0645\u0643\u062A\u0645\u0644"||C==="\u0645\u0646\u062A\u0647\u064A"||C==="completed"||C==="finished"}).length:0,u=document.getElementById("week-incidents"),l=document.getElementById("open-ptw"),m=document.getElementById("completed-training"),g=document.getElementById("days-without-incident");if(this.dashboardCan("incidents")&&u&&(u.textContent=this.formatNumber(n),this.applyEnglishNumberFormat(u)),this.dashboardCan("ptw")&&l&&(l.textContent=this.formatNumber(o),this.applyEnglishNumberFormat(l)),this.dashboardCan("training")&&m&&(m.textContent=this.formatNumber(p),this.applyEnglishNumberFormat(m)),this.dashboardCan("incidents")&&g){const h=this._getDashboardIncidentsRecords(t);if(h.length>0){const C=h.filter(b=>b&&(b.incidentDate||b.date||b.createdAt)).map(b=>new Date(b.incidentDate||b.date||b.createdAt)).filter(b=>!isNaN(b.getTime())).sort((b,x)=>x-b);if(C.length>0){const b=C[0],x=new Date;x.setHours(0,0,0,0),b.setHours(0,0,0,0);const A=Math.floor((x-b)/(1e3*60*60*24));g.textContent=A>=0?this.formatNumber(A):"0"}else g.textContent="0"}else g.textContent="0";this.applyEnglishNumberFormat(g)}}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629:",e)}},getReportsStatisticsUpdates(){const t=AppState.appData;if(!t)return null;try{const e=this._getDashboardIncidentsRecords(t),i=Array.isArray(t.nearmiss)?t.nearmiss:[],a=Array.isArray(t.inspections)?t.inspections:[],s=Array.isArray(t.training)?t.training:[],r=Array.isArray(t.violations)?t.violations:[],o=this.getUnifiedPTWDataset(t).length,p=Array.isArray(t.audits)?t.audits:[];let u=0;const l=[];if(this.dashboardCan("incidents")&&(u+=e.length,l.push(["incident-reports-value",e.length,"report"])),this.dashboardCan("nearmiss")&&(u+=i.length,l.push(["nearmiss-reports-value",i.length,"report"])),this.dashboardCan("periodic-inspections")&&(u+=a.length,l.push(["inspections-reports-value",a.length,"report"])),this.dashboardCan("training")&&(u+=s.length,l.push(["training-sessions-value",s.length,"report"])),this.dashboardCan("violations")&&(u+=r.length,l.push(["violations-value",r.length,"report"])),this.dashboardCan("contractors")){const b=Array.isArray(t.approvedContractors)?t.approvedContractors:[];l.push(["approved-contractors-value",this.getUniqueApprovedContractorsCount(b),"report"])}if(this.dashboardCan("ptw")&&(u+=o,l.push(["ptw-reports-value",o,"report"])),this.dashboardCan("iso")&&(u+=p.length,l.push(["audits-value",p.length,"report"])),this.dashboardCan("clinic")){const b=Array.isArray(t.injuries)?t.injuries:[];let x=0,A=0;for(const T of b)String(T&&T.personType||"employee").toLowerCase().trim()==="employee"?x++:A++;l.push(["clinic-injuries-employee-value",x,"report"]),l.push(["clinic-injuries-contractor-value",A,"report"])}this.anyReportsStatisticVisibleForDashboard()&&l.unshift(["total-reports-value",u,"report"]);const m=t.resourceConsumption||{},g=Array.isArray(m.electricity)?m.electricity:[],h=Array.isArray(m.water)?m.water:[],C=Array.isArray(m.gas)?m.gas:[];if(this.dashboardCan("sustainability")){const b=g.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0),x=h.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0),A=C.reduce((T,v)=>T+(parseFloat(v.totalConsumption)||0),0);l.push(["electricity-consumption-value",b,"consumption"],["water-consumption-value",x,"consumption"],["gas-consumption-value",A,"consumption"])}return l}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A:",e),null}},getUniqueApprovedContractorsCount(t=[]){if(!Array.isArray(t)||t.length===0)return 0;const e=new Set;return t.forEach(i=>{if(!i)return;const a=String(i.entityType||i.type||"").trim().toLowerCase(),s=String(i.companyName||i.name||"").replace(/\s+/g," ").trim().toLowerCase(),r=String(i.code||i.isoCode||"").replace(/\s+/g," ").trim().toLowerCase(),n=String(i.contractorId||i.id||"").replace(/\s+/g," ").trim().toLowerCase(),o=`${a}::${s||r||n}`;o&&o!==`${a}::`&&e.add(o)}),e.size},applyReportsStatisticsUpdates(t){if(!t||!t.length)return;const e=this;try{t.forEach(function(i){const a=i[0],s=i[1];i[2]==="consumption"?e.updateConsumptionValue(a,s):e.updateReportValue(a,s)})}catch(i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0642\u064A\u0645 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",i)}},updateReportsStatistics(){const t=this.getReportsStatisticsUpdates();!t||!t.length||requestAnimationFrame(()=>this.applyReportsStatisticsUpdates(t))},updateReportValue(t,e){if(!t)return;const i=document.getElementById(t);if(!i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0639\u0646\u0635\u0631 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM`);return}try{const a=this.formatNumber(e);i.textContent!==a&&(i.textContent=a),i.dataset.reportFormatted!=="true"&&(i.dataset.reportFormatted="true")}catch(a){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B ${t}:`,a)}},updateConsumptionValue(t,e){if(!t)return;const i=document.getElementById(t);if(!i){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0639\u0646\u0635\u0631 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A DOM`);return}try{const a=Number(e),s=isNaN(a)||!isFinite(a)?"0.00":a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:!0});i.textContent!==s&&(i.textContent=s);const r=t==="electricity-consumption-value"||t==="gas-consumption-value";i.dataset.consumptionFormatted!=="true"&&(r||(i.setAttribute("dir","ltr"),i.style.direction="ltr",i.style.textAlign="left",i.style.unicodeBidi="embed",i.style.fontVariantNumeric="tabular-nums",i.style.fontFeatureSettings='"tnum"',i.classList.add("english-number")),i.dataset.consumptionFormatted="true")}catch(a){Utils.safeWarn(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B ${t}:`,a)}},formatMetricRate(t,e=2){if(typeof HseMetrics<"u"&&HseMetrics.formatRateDisplay)return HseMetrics.formatRateDisplay(t,e);const i=Number(t);return Number.isFinite(i)?i.toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e,useGrouping:!0}):"0"},formatNumber(t){if(t==null)return"0";const e=Number(t);return isNaN(e)||!isFinite(e)?"0":e.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:!0})},applyEnglishNumberFormat(t){if(!t||t.dataset.numberFormatted==="true")return;const e=t.id||"",i=e==="trir-value"||e==="afr-value"||e==="far-value"||e==="fr-value"||e==="lti-value"||e==="sr-value"||e==="ir-value"||e==="man-days-value";try{if(i){t.dataset.numberFormatted="true";return}t.classList.add("english-number"),t.setAttribute("dir","ltr"),t.style.direction="ltr",t.style.textAlign="left",t.style.fontVariantNumeric="tabular-nums",t.dataset.numberFormatted="true"}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629:",a)}},getTimeAgo(t){if(!t)return"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const e=new Date,i=new Date(t);if(isNaN(i.getTime()))return"\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u062D\u064A\u062D";const a=e-i;if(a<0)return"\u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644";const s=Math.floor(a/6e4),r=Math.floor(s/60),n=Math.floor(r/24);return s<1?"\u0627\u0644\u0622\u0646":s<60?`\u0645\u0646\u0630 ${s} \u062F\u0642\u064A\u0642\u0629`:r<24?`\u0645\u0646\u0630 ${r} \u0633\u0627\u0639\u0629`:`\u0645\u0646\u0630 ${n} \u064A\u0648\u0645`},loadCharts(){let t=document.getElementById("dashboard-charts");if(!t){const b=document.getElementById("dashboard-section");if(b){const x=document.createElement("div");x.id="dashboard-charts",x.className="mt-6",b.appendChild(x),t=x}else return}const e=this.dashboardCan("incidents"),i=this.dashboardCan("ptw"),a=this.dashboardCan("training");if(!e&&!i&&!a){t.innerHTML="",t.classList.remove("dashboard-charts-root");return}t.classList.add("dashboard-charts-root");const s=AppState.appData||{},r=new Date,n=new Date(r.getTime()-720*60*60*1e3),o={},p={},u={},l=b=>{const x=new Date(b);if(isNaN(x.getTime()))return null;const A=x.getFullYear(),T=String(x.getMonth()+1).padStart(2,"0"),v=String(x.getDate()).padStart(2,"0");return`${A}-${T}-${v}`},m=b=>{if(!b)return null;const x=[b.date,b.incidentDate,b.createdAt,b.updatedAt,b.reportDate];for(const A of x){if(!A)continue;const T=new Date(A);if(!isNaN(T.getTime()))return T}return null},g=(s.incidents||[]).filter(b=>{const x=m(b);return x&&x>=n});e&&g.forEach(b=>{const x=l(m(b));x&&(o[x]=(o[x]||0)+1)}),i&&(s.ptw||[]).filter(x=>{const A=new Date(x.createdAt||x.startDate);return!isNaN(A.getTime())&&A>=n}).forEach(x=>{const A=l(x.createdAt||x.startDate);A&&(p[A]=(p[A]||0)+1)}),a&&(s.training||[]).filter(x=>{const A=new Date(x.createdAt||x.startDate);return!isNaN(A.getTime())&&A>=n}).forEach(x=>{const A=l(x.createdAt||x.startDate);A&&(u[A]=(u[A]||0)+1)});const h=[];e&&h.push(`
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
            </div>`);const C=[];i&&C.push(`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            ${this.t("dash.chartPtw30d","Work Permits - \u0622\u062E\u0631 30 \u064A\u0648\u0645")}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="chart-container dash-chart-container--trend">
                            ${this.renderTrendBarList(p,"\u062A\u0635\u0631\u064A\u062D\u0627\u064B \u0645\u0633\u062C\u0644\u0627\u064B","ptw")}
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
                            ${this.renderTrendBarList(u,"\u0646\u0634\u0627\u0637\u0627\u064B \u062A\u062F\u0631\u064A\u0628\u064A\u0627\u064B","training")}
                        </div>
                    </div>
                </div>`),C.length>0&&h.push(`<div class="dashboard-charts-grid-row">${C.join("")}</div>`),t.innerHTML=h.join(""),setTimeout(()=>{this.renderSimpleCharts()},100)},_normalizeIncidentSeverity(t){const e=String(t||"").trim().toLowerCase();return e?e.includes("\u0639\u0627\u0644\u064A")||e.includes("\u0639\u0627\u0644\u064A\u0647")||e.includes("\u062D\u0631\u062C")||e.includes("high")||e.includes("critical")?"high":e.includes("\u0645\u062A\u0648\u0633\u0637")||e.includes("medium")||e.includes("moderate")?"medium":e.includes("\u0645\u0646\u062E\u0641\u0636")||e.includes("\u0628\u0633\u064A\u0637")||e.includes("low")||e.includes("minor")?"low":"unknown":"unknown"},renderSeverityChart(t){const e={high:0,medium:0,low:0,unknown:0};(t||[]).forEach(n=>{const o=this._normalizeIncidentSeverity(n&&n.severity);e[o]++});const i=e.high+e.medium+e.low+e.unknown;if(i===0)return`<div class="empty-state"><p class="text-gray-500">${this.t("dash.noData30d","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0622\u062E\u0631 30 \u064A\u0648\u0645\u0627\u064B")}</p></div>`;const a=n=>i>0?n/i*100:0,s=(n,o,p,u,l)=>`
                <div class="dash-severity-bar">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold">${n}</span>
                        <span class="text-sm font-bold ${l}" dir="ltr">${o} <span class="text-xs text-gray-400">(${p.toFixed(1)}%)</span></span>
                    </div>
                    <div class="dash-severity-bar__track" role="presentation">
                        <div class="dash-severity-bar__fill dash-severity-bar__fill--${u}" style="width: ${p}%"></div>
                    </div>
                </div>`,r=e.unknown>0?s("\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",e.unknown,a(e.unknown),"unknown","text-gray-600"):"";return`
            <div class="dash-severity-chart">
                <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B (\u0622\u062E\u0631 30 \u064A\u0648\u0645)</span>
                    <span class="text-gray-700" dir="ltr">${i}</span>
                </div>
                ${s("\u0639\u0627\u0644\u064A / \u062D\u0631\u062C",e.high,a(e.high),"high","text-red-600")}
                ${s("\u0645\u062A\u0648\u0633\u0637",e.medium,a(e.medium),"medium","text-yellow-600")}
                ${s("\u0645\u0646\u062E\u0641\u0636",e.low,a(e.low),"low","text-green-600")}
                ${r}
            </div>
        `},renderTrendBarList(t,e,i="ptw"){const a=Object.keys(t||{}).sort();if(a.length===0)return`<div class="dash-trend-empty"><p class="dash-trend-empty__text">${this.t("dash.noData30d","\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0622\u062E\u0631 30 \u064A\u0648\u0645\u0627\u064B")}</p></div>`;const s=a.slice(-14),r=s.map(m=>t[m]||0),n=r.reduce((m,g)=>m+g,0),o=Math.max(...r,1),p=m=>{const g=m.split("-").map(Number);return g.length!==3||g.some(C=>!C)?m:new Date(g[0],g[1]-1,g[2]).toLocaleDateString("ar-SA",{weekday:"short",month:"numeric",day:"numeric"})},u=s.map(m=>{const g=t[m]||0,h=Math.round(g/o*100);return`
                <li class="dash-trend-row">
                    <span class="dash-trend-date">${p(m)}</span>
                    <div class="dash-trend-track" role="presentation">
                        <div class="dash-trend-fill" style="width: ${h}%"></div>
                    </div>
                    <span class="dash-trend-count" dir="ltr" title="${e}">${g}</span>
                </li>`}).join("");return`
            <div class="dash-trend-chart${i==="training"?" dash-trend-chart--training":" dash-trend-chart--ptw"}" dir="rtl">
                <div class="dash-trend-summary">
                    <span class="dash-trend-summary__label">\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629</span>
                    <strong class="dash-trend-summary__value" dir="ltr">${n}</strong>
                </div>
                <p class="dash-trend-hint">\u0643\u0644 \u0635\u0641 \u064A\u0645\u062B\u0644 \u064A\u0648\u0645\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B: \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0646\u0633\u0628\u064A \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0623\u0639\u0644\u0649 \u064A\u0648\u0645 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629\u060C \u0648\u0627\u0644\u0631\u0642\u0645 \u064A\u0645\u062B\u0644 ${e} \u0641\u064A \u0630\u0644\u0643 \u0627\u0644\u064A\u0648\u0645.</p>
                <ul class="dash-trend-rows">${u}</ul>
            </div>`},renderSimpleCharts(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062C\u0627\u0647\u0632\u0629")}};typeof window<"u"&&(window.Dashboard=window.Dashboard||Dashboard);
