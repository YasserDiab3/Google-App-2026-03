const Clinic={state:{activeTab:"medications",activeVisitType:"employees",activeInjuryType:"employees",filters:{medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}},currentInjuryAttachments:[],medicationAlertsNotified:new Set,initialized:!1},_clinicVisitsLoadPromise:null,_visitsBackendFetchOk:!1,getUserDisplayName(e){if(!e)return"-";if(typeof e=="object"&&e!==null){if(e.name&&typeof e.name=="string"&&e.name.trim())return e.name.trim();if(e=e.email||e.id||"",!e)return"-"}const t=String(e).toLowerCase().trim();if(!t)return"-";if(t==="system"||t==="\u0627\u0644\u0646\u0638\u0627\u0645"||t==="admin")return"\u0627\u0644\u0646\u0638\u0627\u0645";if(AppState&&AppState.appData&&Array.isArray(AppState.appData.users)){const i=AppState.appData.users.find(n=>String(n.email||"").toLowerCase().trim()===t||String(n.id||"").toLowerCase().trim()===t||String(n.name||"").toLowerCase().trim()===t);if(i&&i.name)return i.name}return String(e)},processAttachmentUrl(e){if(!e||typeof e!="string")return null;let t=e.trim();const i=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,n=t.match(i);return n&&(t="https://lh3.googleusercontent.com/d/"+n[1]),t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")?t:null},getCurrentLanguage(){try{return localStorage.getItem("language")||typeof AppState<"u"&&AppState?.currentLanguage||"ar"}catch{return"ar"}},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const i=e||document.getElementById("clinic-section")||document;t.applyI18n(i),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(i)},getTranslations(){const e=this.getCurrentLanguage(),t=e==="ar",i={ar:{"table.employeeCode":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","table.contractorName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","table.name":"\u0627\u0644\u0627\u0633\u0645","table.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","table.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","table.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","table.entryTime":"\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644","table.exitTime":"\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C","table.totalTime":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","table.reason":"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","table.diagnosis":"\u0627\u0644\u062A\u0634\u062E\u064A\u0635","table.medications":"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.medicationType":"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621","table.quantity":"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.dispenseDate":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","table.patientName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","table.department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629","table.medicationStatus":"\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0648\u0627\u0621","table.notes":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","table.actions":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A","table.notRecorded":"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647","btn.registerVisit":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629","btn.refresh":"\u062A\u062D\u062F\u064A\u062B","btn.exportExcel":"\u062A\u0635\u062F\u064A\u0631 Excel","btn.exportPDF":"\u062A\u0635\u062F\u064A\u0631 PDF","btn.reset":"\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646","btn.view":"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","btn.edit":"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","tab.visits":"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","tab.employees":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646","tab.contractors":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","tab.dispensedLog":"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","filter.search":"\u0627\u0644\u0628\u062D\u062B","filter.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","filter.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","filter.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","filter.all":"\u0627\u0644\u0643\u0644","filter.searchPlaceholder":"\u0627\u0628\u062D\u062B \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...","empty.noResults":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0628\u062D\u062B\u0643.","empty.noEmployeeVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","empty.noContractorVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","time.lessThanMinute":"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629","time.minutes":"\u062F\u0642\u064A\u0642\u0629","time.hours":"\u0633\u0627\u0639\u0629","time.days":"\u064A\u0648\u0645"},en:{"table.employeeCode":"Employee Code","table.contractorName":"Contractor Name","table.name":"Name","table.jobTitle":"Job Title","table.factory":"Factory","table.workplace":"Workplace","table.entryTime":"Entry Time","table.exitTime":"Exit Time","table.totalTime":"Total Time","table.reason":"Reason for Visit","table.diagnosis":"Diagnosis","table.medications":"Dispensed Medications","table.medicationType":"Medication Type","table.quantity":"Dispensed Quantity","table.dispenseDate":"Dispense Date","table.patientName":"Patient Name","table.department":"Department","table.medicationStatus":"Medication Status","table.notes":"Notes","table.actions":"Actions","table.notRecorded":"Not Recorded","btn.registerVisit":"Register Visit","btn.refresh":"Refresh","btn.exportExcel":"Export Excel","btn.exportPDF":"Export PDF","btn.reset":"Reset","btn.view":"View Details","btn.edit":"Edit Visit","tab.visits":"Clinic Attendance Record","tab.employees":"Employees","tab.contractors":"Contractors","tab.dispensedLog":"Dispensed Medications Log","filter.search":"Search","filter.factory":"Factory","filter.jobTitle":"Job Title","filter.workplace":"Workplace","filter.all":"All","filter.searchPlaceholder":"Search all data...","empty.noResults":"No results match your search.","empty.noEmployeeVisits":"No employee visits recorded.","empty.noContractorVisits":"No contractor visits recorded.","time.lessThanMinute":"Less than a minute","time.minutes":"minute","time.hours":"hour","time.days":"day"}};return{t:n=>i[e]?.[n]||n,isRTL:t,lang:e}},clinicAnalysisCharts:null,getClinicAnalysisStorageKeys(){return{cards:"clinic_infoCards",items:"clinic_analysisItems"}},getClinicDefaultAnalysisCards(){return[{id:"card_total_visits",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",icon:"fas fa-hospital-user",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalVisits"},{id:"card_total_dispensed_qty",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",icon:"fas fa-prescription-bottle-alt",color:"green",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!0,mode:"metric",metric:"totalDispensedQty"},{id:"card_expired_meds",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",enabled:!0,mode:"metric",metric:"expiredMedications"},{id:"card_low_stock",title:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",icon:"fas fa-box-open",color:"orange",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0630\u0627\u062A \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0646\u062E\u0641\u0636 (\u2264 10)",enabled:!0,mode:"metric",metric:"lowStockMedications"},{id:"card_visits_with_meds",title:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",icon:"fas fa-capsules",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u0641\u064A\u0647\u0627 \u0635\u0631\u0641 \u062F\u0648\u0627\u0621 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",enabled:!1,mode:"metric",metric:"visitsWithMedications"},{id:"card_unique_dispensed",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",icon:"fas fa-pills",color:"purple",description:"\u0639\u062F\u062F \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!1,mode:"metric",metric:"uniqueDispensedMedications"}]},getClinicDefaultAnalysisItems(){return[{id:"visits_by_reason",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!0,dataset:"visits",field:"reason",chartType:"auto"},{id:"visits_by_personType",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)",enabled:!0,dataset:"visits",field:"personType",chartType:"auto"},{id:"visits_by_factory",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"visits",field:"factoryName",chartType:"bar"},{id:"meds_by_status",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"medications",field:"status",chartType:"doughnut"},{id:"meds_by_type",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"medications",field:"type",chartType:"bar"},{id:"disp_top_meds",label:"\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0635\u0631\u0641\u0627\u064B (\u0645\u0631\u0627\u062A)",enabled:!0,dataset:"dispensedMedications",field:"medicationName",chartType:"bar"},{id:"disp_by_dept",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"department",chartType:"bar"},{id:"disp_by_ptype",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635",enabled:!1,dataset:"dispensedMedications",field:"personType",chartType:"doughnut"},{id:"disp_by_reason",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"visitReason",chartType:"bar"},{id:"injuries_by_type",label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"injuries",field:"injuryType",chartType:"bar"},{id:"sickleave_by_status",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"sickLeave",field:"status",chartType:"doughnut"},{id:"supply_by_status",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"supplyRequests",field:"status",chartType:"doughnut"}]},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(t=>{const i=setInterval(()=>{typeof Chart<"u"&&(clearInterval(i),t(!0))},100);setTimeout(()=>{clearInterval(i),t(typeof Chart<"u")},5e3)}):new Promise(t=>{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",i.crossOrigin="anonymous";let n=!1;const s=a=>{n||(n=!0,t(!!a))};i.onload=()=>setTimeout(()=>s(typeof Chart<"u"),400),i.onerror=()=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",a.crossOrigin="anonymous",a.onload=()=>setTimeout(()=>s(typeof Chart<"u"),400),a.onerror=()=>s(!1),document.head.appendChild(a)},setTimeout(()=>s(typeof Chart<"u"),8e3);try{document.head.appendChild(i)}catch{s(!1)}})},injectTableScrollbarStyles(){const e="clinic-table-scrollbar-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
            /* \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 */
            .clinic-table-wrapper {
                position: relative;
                overflow-x: auto;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
                max-height: 70vh;
                width: 100%;
            }

            /* \u062F\u0639\u0645 LTR \u0644\u0644\u062C\u062F\u0627\u0648\u0644 */
            [dir="ltr"] .clinic-table-wrapper table,
            [dir="ltr"] .clinic-table-wrapper {
                direction: ltr;
            }

            [dir="ltr"] .clinic-table-wrapper table th,
            [dir="ltr"] .clinic-table-wrapper table td {
                text-align: left;
            }

            [dir="ltr"] .clinic-table-wrapper table th.text-center,
            [dir="ltr"] .clinic-table-wrapper table td.text-center {
                text-align: center;
            }

            /* \u062F\u0639\u0645 RTL \u0644\u0644\u062C\u062F\u0627\u0648\u0644 */
            [dir="rtl"] .clinic-table-wrapper table,
            [dir="rtl"] .clinic-table-wrapper {
                direction: rtl;
            }

            [dir="rtl"] .clinic-table-wrapper table th,
            [dir="rtl"] .clinic-table-wrapper table td {
                text-align: right;
            }

            [dir="rtl"] .clinic-table-wrapper table th.text-center,
            [dir="rtl"] .clinic-table-wrapper table td.text-center {
                text-align: center;
            }

            /* \u062A\u062E\u0635\u064A\u0635 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0623\u0641\u0642\u064A (\u0627\u0644\u0623\u0633\u0641\u0644) */
            .clinic-table-wrapper::-webkit-scrollbar:horizontal {
                height: 12px;
            }

            .clinic-table-wrapper::-webkit-scrollbar-track:horizontal {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
                margin: 0 10px;
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb:horizontal {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb:horizontal:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u062A\u062E\u0635\u064A\u0635 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0639\u0645\u0648\u062F\u064A (\u0627\u0644\u062C\u0627\u0646\u0628\u064A) */
            .clinic-table-wrapper::-webkit-scrollbar:vertical {
                width: 12px;
            }

            .clinic-table-wrapper::-webkit-scrollbar-track:vertical {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
                margin: 10px 0;
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb:vertical {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb:vertical:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0639\u0627\u0645 (\u0644\u0644\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0627\u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A) */
            .clinic-table-wrapper::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            .clinic-table-wrapper::-webkit-scrollbar-track {
                background: var(--bg-secondary, #f3f4f6);
                border-radius: 6px;
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb {
                background: var(--primary-color, #3b82f6);
                border-radius: 6px;
                border: 2px solid var(--bg-secondary, #f3f4f6);
            }

            .clinic-table-wrapper::-webkit-scrollbar-thumb:hover {
                background: var(--primary-color-dark, #2563eb);
            }

            /* \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 */
            [data-theme="dark"] .clinic-table-wrapper::-webkit-scrollbar-track {
                background: var(--bg-secondary, #1f2937);
            }

            [data-theme="dark"] .clinic-table-wrapper::-webkit-scrollbar-thumb {
                background: var(--primary-color, #60a5fa);
                border-color: var(--bg-secondary, #1f2937);
            }

            [data-theme="dark"] .clinic-table-wrapper::-webkit-scrollbar-thumb:hover {
                background: var(--primary-color-dark, #3b82f6);
            }

            /* \u062A\u062D\u0633\u064A\u0646\u0627\u062A \u0644\u0644\u062C\u0648\u0627\u0644 */
            @media (max-width: 768px) {
                .clinic-table-wrapper {
                    max-height: 60vh;
                }

                .clinic-table-wrapper::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .clinic-table-wrapper::-webkit-scrollbar-thumb {
                    border-width: 1px;
                }
            }

            /* \u0625\u0636\u0627\u0641\u0629 \u0638\u0644\u0627\u0644 \u0639\u0646\u062F \u0627\u0644\u062A\u0645\u0631\u064A\u0631 */
            .clinic-table-wrapper {
                position: relative;
            }

            .clinic-table-wrapper::before,
            .clinic-table-wrapper::after {
                content: '';
                position: sticky;
                pointer-events: none;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .clinic-table-wrapper::before {
                top: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent);
            }

            .clinic-table-wrapper::after {
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
            }

            .clinic-table-wrapper.scrolled-top::before {
                opacity: 0;
            }

            .clinic-table-wrapper:not(.scrolled-top)::before {
                opacity: 1;
            }

            .clinic-table-wrapper.scrolled-bottom::after {
                opacity: 0;
            }

            .clinic-table-wrapper:not(.scrolled-bottom)::after {
                opacity: 1;
            }

            /* \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062D\u0636\u0648\u0631 \u2014 \u062C\u062F\u0627\u0648\u0644 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0645\u0631\u064A\u0631 */
            .clinic-attendance-scroll-table {
                max-height: 42vh;
            }
            @media (max-width: 768px) {
                .clinic-attendance-scroll-table {
                    max-height: 50vh;
                }
            }

            /* \u0642\u0627\u0626\u0645\u0629 \u0645\u0646\u0632\u0644\u0642\u0629 \u0644\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u064A\u0646 \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u062D\u0636\u0648\u0631 */
            .clinic-attendance-quick-nav {
                position: fixed;
                inset-inline-end: 18px;
                bottom: 88px;
                z-index: 120;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 0;
                max-width: min(240px, calc(100vw - 24px));
            }
            .clinic-attendance-quick-nav-toggle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                padding: 10px 14px;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                font-size: 0.8rem;
                font-weight: 700;
                color: #fff;
                background: linear-gradient(125deg, #0b2a55 0%, #1e40af 70%, #2563eb 100%);
                box-shadow: 0 6px 20px rgba(11, 42, 85, 0.35);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .clinic-attendance-quick-nav-toggle:hover {
                transform: translateY(-1px);
                box-shadow: 0 8px 24px rgba(11, 42, 85, 0.42);
            }
            .clinic-attendance-quick-nav-chevron {
                transition: transform 0.25s ease;
                font-size: 0.7rem;
                opacity: 0.9;
            }
            .clinic-attendance-quick-nav.open .clinic-attendance-quick-nav-chevron {
                transform: rotate(180deg);
            }
            .clinic-attendance-quick-nav-panel {
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                transition: max-height 0.32s ease, opacity 0.22s ease, margin 0.22s ease;
                margin-top: 0;
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 10px 32px rgba(15, 23, 42, 0.14);
                border: 1px solid #bfdbfe;
            }
            .clinic-attendance-quick-nav.open .clinic-attendance-quick-nav-panel {
                max-height: 280px;
                overflow-y: auto;
                opacity: 1;
                margin-top: 8px;
            }
            .clinic-attendance-quick-nav-panel::-webkit-scrollbar {
                width: 8px;
            }
            .clinic-attendance-quick-nav-panel::-webkit-scrollbar-thumb {
                background: #1e40af;
                border-radius: 6px;
            }
            .clinic-attendance-quick-nav-item {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 10px 14px;
                border: none;
                border-bottom: 1px solid #f1f5f9;
                background: transparent;
                cursor: pointer;
                font-size: 0.78rem;
                font-weight: 600;
                color: #334155;
                text-align: start;
                transition: background 0.15s, color 0.15s;
            }
            .clinic-attendance-quick-nav-item:last-child {
                border-bottom: none;
            }
            .clinic-attendance-quick-nav-item:hover,
            .clinic-attendance-quick-nav-item:focus {
                background: #eff6ff;
                color: #1e40af;
                outline: none;
            }
            .clinic-attendance-quick-nav-item i {
                color: #2563eb;
                width: 18px;
                text-align: center;
            }
            [id^="clinic-attendance-section"],
            #clinic-staff-activities-section,
            #clinic-leave-balances-section,
            #clinic-approved-timeoff-section {
                scroll-margin-top: 72px;
            }
            [data-theme="dark"] .clinic-attendance-quick-nav-panel {
                background: #1e293b;
                border-color: #334155;
            }
            [data-theme="dark"] .clinic-attendance-quick-nav-item {
                color: #e2e8f0;
                border-bottom-color: #334155;
            }
            [data-theme="dark"] .clinic-attendance-quick-nav-item:hover {
                background: #0f766e33;
                color: #5eead4;
            }
            @media (max-width: 640px) {
                .clinic-attendance-quick-nav {
                    inset-inline-end: 10px;
                    bottom: 72px;
                    max-width: calc(100vw - 20px);
                }
                .clinic-attendance-quick-nav-toggle span {
                    display: none;
                }
            }
            
            /* \u2705 \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F */
            .visits-filters-row {
                position: relative;
            }
            .visits-filters-row .filters-grid {
                width: 100%;
            }
            .visits-filters-row .filter-field {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            .visits-filters-row .filter-label {
                font-size: 12px;
                font-weight: 600;
                color: #4a5568;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .visits-filters-row .filter-label i {
                font-size: 11px;
                color: #667eea;
            }
            .visits-filters-row .filter-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                background: white;
                font-size: 14px;
                color: #2d3748;
                transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            }
            .visits-filters-row .filter-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .visits-filters-row .filter-input:hover {
                border-color: #cbd5e0;
            }
            .visits-filters-row .filter-reset-btn {
                width: 100%;
                padding: 10px 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .visits-filters-row .filter-reset-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
            }
            .visits-filters-row .filter-reset-btn:active {
                transform: translateY(0);
            }
            
            /* \u2705 \u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 */
            .filter-count-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 24px;
                height: 20px;
                padding: 2px 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 700;
                margin-right: 4px;
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
            }
            
            @media (max-width: 1200px) {
                .visits-filters-row .filters-grid {
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                }
            }
            @media (max-width: 768px) {
                .visits-filters-row .filters-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .visits-filters-row {
                    padding: 12px 16px;
                    margin: 0 -16px 0 -16px;
                    width: calc(100% + 32px);
                }
            }
        `,document.head.appendChild(t)},setupTableScrollListeners(e){if(!e)return;const t=()=>{const i=e.scrollTop,n=e.scrollLeft,s=e.scrollHeight,a=e.scrollWidth,o=e.clientHeight,l=e.clientWidth;i===0?e.classList.add("scrolled-top"):e.classList.remove("scrolled-top"),i+o>=s-1?e.classList.add("scrolled-bottom"):e.classList.remove("scrolled-bottom"),n===0?e.classList.add("scrolled-left"):e.classList.remove("scrolled-left"),n+l>=a-1?e.classList.add("scrolled-right"):e.classList.remove("scrolled-right")};e.addEventListener("scroll",t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{t()}).observe(e),t()},_clinicAttendanceScrollTable(e,t){return`<div class="table-wrapper clinic-table-wrapper clinic-attendance-scroll-table" style="overflow-x:auto;overflow-y:auto;max-height:${t||"42vh"};">${e}</div>`},renderAttendanceQuickNav(e){return!Array.isArray(e)||!e.length?"":`<div class="clinic-attendance-quick-nav" id="clinic-attendance-quick-nav">
            <button type="button" class="clinic-attendance-quick-nav-toggle" id="clinic-attendance-quick-nav-toggle" aria-expanded="false" title="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u062A\u0645\u0631\u064A\u0631">
                <span><i class="fas fa-list-ul ml-2"></i>\u0627\u0644\u0623\u0642\u0633\u0627\u0645</span>
                <i class="fas fa-chevron-up clinic-attendance-quick-nav-chevron"></i>
            </button>
            <div class="clinic-attendance-quick-nav-panel" id="clinic-attendance-quick-nav-panel" hidden>${e.map(i=>`
            <button type="button" class="clinic-attendance-quick-nav-item" data-target="${Utils.escapeAttr(i.id)}">
                <i class="fas ${Utils.escapeAttr(i.icon||"fa-circle")} ml-2"></i>${Utils.escapeHTML(i.label||"")}
            </button>
        `).join("")}</div>
        </div>`},bindAttendanceQuickNav(e){const t=e?.querySelector("#clinic-attendance-quick-nav");if(!t)return;const i=t.querySelector("#clinic-attendance-quick-nav-toggle"),n=t.querySelector("#clinic-attendance-quick-nav-panel"),s=()=>{t.classList.remove("open"),i&&i.setAttribute("aria-expanded","false"),n&&(n.hidden=!0)},a=()=>{t.classList.add("open"),i&&i.setAttribute("aria-expanded","true"),n&&(n.hidden=!1)};i?.addEventListener("click",o=>{o.stopPropagation(),t.classList.contains("open")?s():a()}),t.querySelectorAll(".clinic-attendance-quick-nav-item").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.target;if(l==="clinic-attendance-section-timeoff"){s(),this.showTimeOffRequestModal();return}const r=l?document.getElementById(l):null;r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),r.style.transition="box-shadow 0.3s",r.style.boxShadow="0 0 0 3px rgba(13,148,136,0.35)",setTimeout(()=>{r.style.boxShadow=""},1200)),s()})}),this._attendanceQuickNavDocListener||(this._attendanceQuickNavDocListener=o=>{const l=document.querySelector("#clinic-attendance-quick-nav.open");if(l&&!l.contains(o.target)){l.classList.remove("open");const r=l.querySelector("#clinic-attendance-quick-nav-toggle"),c=l.querySelector("#clinic-attendance-quick-nav-panel");r&&r.setAttribute("aria-expanded","false"),c&&(c.hidden=!0)}},document.addEventListener("click",this._attendanceQuickNavDocListener)),this._syncAttendanceQuickNavVisibility()},_syncAttendanceQuickNavVisibility(){const e=this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab();document.querySelectorAll("#clinic-attendance-quick-nav").forEach(t=>{t.style.display=e?"":"none"})},initAttendanceTableScroll(e){this.injectTableScrollbarStyles(),e?.querySelectorAll(".clinic-table-wrapper").forEach(t=>this.setupTableScrollListeners(t))},loadClinicDataAnalysis(){if(!this.isCurrentUserAdmin())return;this.loadClinicInfoCards();const e=this.getClinicAnalysisStorageKeys(),t=localStorage.getItem(e.items)||"[]";let i=[];try{i=JSON.parse(t)||[]}catch{i=[]}(!Array.isArray(i)||i.length===0)&&(localStorage.setItem(e.items,JSON.stringify(this.getClinicDefaultAnalysisItems())),i=this.getClinicDefaultAnalysisItems());const n=document.getElementById("clinic-analysis-items-list");n&&(n.innerHTML=i.map(f=>`
                <div class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                    <label class="flex items-center cursor-pointer flex-1">
                        <input type="checkbox" class="clinic-analysis-item-checkbox mr-2" data-item-id="${f.id}" ${f.enabled?"checked":""}>
                        <span>${Utils.escapeHTML(f.label||f.id)}</span>
                    </label>
                    <button class="btn-icon btn-icon-danger ml-2" onclick="Clinic.removeClinicAnalysisItem('${f.id}')" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""),n.querySelectorAll(".clinic-analysis-item-checkbox").forEach(f=>{f.addEventListener("change",d=>{const m=d.target.getAttribute("data-item-id");this.toggleClinicAnalysisItem(m,d.target.checked)})}));const s=document.getElementById("clinic-manage-cards-btn");s&&(s.onclick=()=>this.showManageClinicCardsModal());const a=document.getElementById("clinic-add-analysis-item-btn");a&&(a.onclick=()=>this.addClinicAnalysisItemFromUI());const o=document.getElementById("clinic-new-analysis-dataset"),l=document.getElementById("clinic-new-analysis-field"),r=document.getElementById("clinic-custom-field-wrap"),c=document.getElementById("clinic-new-analysis-custom-field"),p=()=>{if(!l||!o)return;const f=o.value,m=this.getClinicAnalysisFieldsMap()[f]||[];l.innerHTML=m.map(u=>`<option value="${u.value}">${Utils.escapeHTML(u.label)}</option>`).join("")+'<option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>',r&&(r.style.display="none"),c&&(c.value="")};o&&(o.onchange=()=>p()),l&&(l.onchange=()=>{const f=l.value==="__custom__";r&&(r.style.display=f?"block":"none"),!f&&c&&(c.value="")}),o&&l&&l.options.length===0&&p(),this.updateClinicAnalysisResults()},getClinicAnalysisFieldsMap(){return{visits:[{value:"reason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"diagnosis",label:"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"employeePosition",label:"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"workplace",label:"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],medications:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"location",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646"}],sickLeave:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],injuries:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"injuryType",label:"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"injuryLocation",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],supplyRequests:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628"},{value:"priority",label:"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],dispensedMedications:[{value:"medicationName",label:"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"personType",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{value:"visitReason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"unit",label:"\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},getClinicDatasetForAnalysis(e){switch(this.ensureData(),e){case"visits":return Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[];case"medications":return(Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:[]).map(t=>this.normalizeMedicationRecord(t));case"sickLeave":return Array.isArray(AppState.appData.sickLeave)?AppState.appData.sickLeave:[];case"injuries":return Array.isArray(AppState.appData.injuries)?AppState.appData.injuries:[];case"supplyRequests":return Array.isArray(AppState.appData.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[];case"dispensedMedications":return this.getDispensedMedicationsDataset_(this.getClinicVisitsForAnalysis_());default:return[]}},getClinicVisitsForAnalysis_(){const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[],t=Array.isArray(AppState.appData.employeeVisits)?AppState.appData.employeeVisits:[],i=Array.isArray(AppState.appData.contractorVisits)?AppState.appData.contractorVisits:[],n=new Set,s=[];return[...e,...t,...i].forEach(a=>{if(!a)return;const o=String(a.id||"").trim();o&&n.has(o)||(o&&n.add(o),s.push(a))}),s},getVisitMedicationsForAnalysis_(e){if(!e)return[];let t=[];if(e.medications&&(t=this.normalizeVisitMedications(e.medications)),(!t||t.length===0)&&e.medicationsDispensed){const i=this.normalizeVisitMedications(e.medicationsDispensed);i&&i.length>0&&(t=i)}if((!t||t.length===0)&&e.medicationsDispensedQty&&e.medicationsDispensedQty>0){const i=parseInt(e.medicationsDispensedQty,10)||0;i>0&&(t=[{medicationName:e.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:i,unit:"\u0648\u062D\u062F\u0629",notes:""}])}return Array.isArray(t)?t:[]},buildMedicationInventoryLookup_(){const e=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],t={};return e.forEach(i=>{const n=this.normalizeMedicationRecord(i),s=String(n.name||n.medicationName||"").trim().toLowerCase();s&&!t[s]&&(t[s]=n)}),t},getDispensedMedicationsDataset_(e){const t=[];return(e||[]).forEach(i=>{const n=this.getVisitMedicationsForAnalysis_(i);if(!n.length)return;const s=String(i.employeeDepartment||i.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",a=String(i.personType||"").toLowerCase(),o=a==="contractor"||a==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",l=String(i.reason||i.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=i.visitDate||i.createdAt||"";n.forEach(c=>{t.push({medicationName:c.medicationName,quantity:parseInt(c.quantity,10)||1,unit:c.unit||"\u0648\u062D\u062F\u0629",personType:o,department:s,visitReason:l,visitDate:r,visitId:i.id||""})})}),t},analyzeDispensedMedications_(e,t){const i=this.buildMedicationInventoryLookup_(),n={};let s=0,a=0;const o=new Set,l={},r={\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},c={};(e||[]).forEach(g=>{const y=this.getVisitMedicationsForAnalysis_(g);if(!y.length)return;const h=String(g.id||"").trim()||JSON.stringify([g.visitDate,g.employeeName,g.contractorWorkerName]);o.add(h);const x=String(g.employeeDepartment||g.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",T=String(g.personType||"").toLowerCase(),A=T==="contractor"||T==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",D=new Date(g.visitDate||g.createdAt||""),b=isNaN(D.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`;y.forEach(S=>{const L=String(S.medicationName||"").trim();if(!L)return;const C=parseInt(S.quantity,10)||1,I=L.toLowerCase(),E=i[I]||null;n[I]||(n[I]={name:L,totalQty:0,dispenseCount:0,visits:new Set,type:E?.type||E?.medicationType||"\u2014",stockRemaining:E?.remainingQuantity??null,stockStatus:E?.status||"\u2014"}),n[I].totalQty+=C,n[I].dispenseCount+=1,n[I].visits.add(h),s+=C,a+=1,l[b]=(l[b]||0)+C,r[A]=(r[A]||0)+C,c[x]=(c[x]||0)+C})});const p=Object.values(n).map(g=>({name:g.name,totalQty:g.totalQty,dispenseCount:g.dispenseCount,visitsCount:g.visits.size,avgQty:g.dispenseCount>0?(g.totalQty/g.dispenseCount).toFixed(1):"0",type:g.type,stockRemaining:g.stockRemaining,stockStatus:g.stockStatus})).sort((g,y)=>y.totalQty-g.totalQty),f=[...p].sort((g,y)=>y.dispenseCount-g.dispenseCount),d=Object.entries(l).filter(([g])=>g!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((g,y)=>g[0].localeCompare(y[0])).slice(-12),m=Object.entries(c).sort((g,y)=>y[1]-g[1]).slice(0,8),u=p.slice(0,10).filter(g=>g.stockRemaining!==null&&g.stockRemaining<=10).map(g=>({...g}));return{totalDispensedQty:s,dispenseLines:a,uniqueMedicines:p.length,visitsWithMedications:o.size,visitsWithoutMedications:Math.max(0,(e||[]).length-o.size),topByQuantity:p,topByFrequency:f,byMonth:{labels:d.map(g=>g[0]),data:d.map(g=>g[1])},byPersonType:r,byDepartment:{labels:m.map(g=>g[0]),data:m.map(g=>g[1])},lowStockHighDemand:u}},getClinicAnalysisValue(e,t,i){if(!i||typeof i!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t==="byMonth"){const a=e==="visits"||e==="dispensedMedications"?i.visitDate||i.createdAt:e==="sickLeave"?i.startDate||i.createdAt:e==="injuries"?i.injuryDate||i.createdAt:e==="supplyRequests"?i.createdAt||i.requestDate:i.createdAt||"";if(!a)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const o=new Date(a);return isNaN(o.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`}if(t==="personType"){const a=(i.personType||"").toString().toLowerCase();return a==="contractor"?"\u0645\u0642\u0627\u0648\u0644":a==="external"?"\u062E\u0627\u0631\u062C\u064A":a==="employee"||a===""?"\u0645\u0648\u0638\u0641":a.includes("\u0645\u0642\u0627\u0648\u0644")?"\u0645\u0642\u0627\u0648\u0644":a.includes("\u062E\u0627\u0631")?"\u062E\u0627\u0631\u062C\u064A":a.includes("\u0645\u0648\u0638")?"\u0645\u0648\u0638\u0641":i.personType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}if(e==="visits"&&t==="workplace")return i.employeeLocation||i.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const n=i[t],s=n==null||n===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(n).trim();return s&&s!=="null"&&s!=="undefined"?s:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeClinicByItem(e){const t=e.dataset,i=e.field,n=this.getClinicDatasetForAnalysis(t),s={};let a=0;return n.forEach(o=>{const l=this.getClinicAnalysisValue(t,i,o);s[l]=(s[l]||0)+1,a++}),Object.entries(s).map(([o,l])=>({label:o,count:l,percentage:a>0?(l/a*100).toFixed(1):"0.0"})).sort((o,l)=>l.count-o.count)},async updateClinicAnalysisResults(){const e=document.getElementById("clinic-analysis-results");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{i=[]}const n=(Array.isArray(i)?i:[]).filter(a=>a.enabled);if(n.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0641\u0639\u0644\u0629 \u0644\u0644\u062A\u062D\u0644\u064A\u0644.</p>
                </div>
            `;return}this.calculateClinicCardValues();let s='<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">';n.forEach((a,o)=>{const l=this.analyzeClinicByItem(a),r=`clinic-chart-${a.id}-${o}`,c=`clinic-chart-container-${a.id}-${o}`;s+=`
                <div class="content-card">
                    <div class="card-header">
                        <h4 class="font-semibold text-lg">
                            <i class="fas fa-chart-bar ml-2"></i>
                            ${Utils.escapeHTML(a.label||a.id)}
                        </h4>
                        <p class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(a.dataset)} \u2022 ${Utils.escapeHTML(a.field)}</p>
                    </div>
                    <div class="card-body">
                        <div id="${c}" style="position: relative; height: 300px; margin-bottom: 20px;">
                            <canvas id="${r}"></canvas>
                        </div>
                        <div class="border-t pt-4">
                            <h5 class="font-semibold mb-3 text-sm text-gray-700">\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</h5>
                            <div class="space-y-2">
                                ${l.slice(0,20).map(p=>`
                                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span class="text-sm">${Utils.escapeHTML(p.label)}</span>
                                        <div class="flex items-center gap-3">
                                            <span class="font-semibold">${p.count}</span>
                                            <span class="text-xs text-gray-500">(${p.percentage}%)</span>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `}),s+="</div>",e.innerHTML=s,setTimeout(async()=>{if(await this.ensureChartJSLoaded()&&typeof Chart<"u")this.renderClinicAnalysisCharts(n);else{const o=document.createElement("div");o.className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4",o.innerHTML=`
                    <div class="flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                        <p class="text-sm text-yellow-800">
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0623\u062F\u0646\u0627\u0647.
                        </p>
                    </div>
                `,e.prepend(o)}},250)},renderClinicAnalysisCharts(e){if(typeof Chart>"u")return;this.clinicAnalysisCharts&&Object.values(this.clinicAnalysisCharts).forEach(i=>{i&&typeof i.destroy=="function"&&i.destroy()}),this.clinicAnalysisCharts={};const t=["rgba(59, 130, 246, 0.8)","rgba(16, 185, 129, 0.8)","rgba(245, 158, 11, 0.8)","rgba(239, 68, 68, 0.8)","rgba(139, 92, 246, 0.8)","rgba(236, 72, 153, 0.8)","rgba(20, 184, 166, 0.8)","rgba(251, 146, 60, 0.8)"];e.forEach((i,n)=>{const s=`clinic-chart-${i.id}-${n}`,a=document.getElementById(s);if(!a)return;const o=this.analyzeClinicByItem(i),l=o.slice(0,12).map(f=>f.label),r=o.slice(0,12).map(f=>f.count),c=l.map((f,d)=>t[d%t.length]),p=i.chartType==="auto"?l.length>6?"bar":"doughnut":i.chartType||"bar";try{const f=new Chart(a,{type:p,data:{labels:l,datasets:[{label:i.label||i.id,data:r,backgroundColor:c,borderColor:c.map(d=>d.replace("0.8","1")),borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0}},tooltip:{callbacks:{label:function(d){const m=d.label||"",u=d.parsed||0,g=d.dataset.data.reduce((h,x)=>h+x,0),y=g>0?(u/g*100).toFixed(1):0;return`${m}: ${u} (${y}%)`}}}},...p==="bar"?{scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}:{}}});this.clinicAnalysisCharts[s]=f}catch{}})},loadClinicInfoCards(){const e=document.getElementById("clinic-info-cards-container");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(t.cards)||"[]")||[]}catch{i=[]}(!Array.isArray(i)||i.length===0)&&(localStorage.setItem(t.cards,JSON.stringify(this.getClinicDefaultAnalysisCards())),i=this.getClinicDefaultAnalysisCards());const n=i.filter(a=>a.enabled);if(n.length===0){e.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}const s={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"};e.innerHTML=n.map(a=>{const o=s[a.color]||s.blue,l=a.color||"blue";return`
                <div class="content-card border-2 ${o}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <i class="${a.icon||"fas fa-info-circle"} text-${l}-600 text-xl"></i>
                            <h4 class="font-semibold">${Utils.escapeHTML(a.title||"")}</h4>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(a.description||"")}</p>
                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <div id="clinic-card-value-${a.id}" class="text-2xl font-bold text-${l}-700">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            `}).join(""),this.calculateClinicCardValues()},calculateClinicCardValues(){const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}const i=(Array.isArray(t)?t:[]).filter(m=>m.enabled),n=this.getClinicVisitsForAnalysis_(),s=n.length,a=n.reduce((m,u)=>{const g=this.getVisitMedicationsForAnalysis_(u);return m+g.reduce((y,h)=>y+(parseInt(h.quantity,10)||0),0)},0),o=n.filter(m=>this.getVisitMedicationsForAnalysis_(m).length>0).length,l=new Set(n.flatMap(m=>this.getVisitMedicationsForAnalysis_(m).map(u=>String(u.medicationName||"").trim().toLowerCase()).filter(Boolean))).size,r=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],c=r.filter(m=>(m.status||"")==="\u0645\u0646\u062A\u0647\u064A").length,p=r.filter(m=>(m.remainingQuantity??0)<=10&&(m.remainingQuantity??0)>0).length,f=r.length,d={totalVisits:s,totalDispensedQty:a,expiredMedications:c,lowStockMedications:p,totalMedications:f,visitsWithMedications:o,uniqueDispensedMedications:l};i.forEach(m=>{const u=document.getElementById(`clinic-card-value-${m.id}`);if(!u)return;let g=0;if(m.mode==="metric"&&m.metric)g=d[m.metric]??0;else if(m.mode==="countByField"){const y=m.dataset||"visits",h=m.field||"",x=(m.fieldValue||"").toString().trim();g=this.getClinicDatasetForAnalysis(y).filter(A=>{const D=this.getClinicAnalysisValue(y,h,A);if(!x)return D&&D!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const b=String(D||"").toLowerCase().trim(),S=String(x||"").toLowerCase().trim();if(b===S)return!0;if(h==="personType"){if(S==="employee"||S==="\u0645\u0648\u0638\u0641")return b==="\u0645\u0648\u0638\u0641";if(S==="contractor"||S==="\u0645\u0642\u0627\u0648\u0644"||S==="external")return b==="\u0645\u0642\u0627\u0648\u0644"}return b===S}).length}u.textContent=Number(g||0).toLocaleString("en-US")})},showManageClinicCardsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}(!Array.isArray(t)||t.length===0)&&(t=this.getClinicDefaultAnalysisCards());const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 980px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-edit ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0643\u0631\u0648\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 flex justify-between items-center">
                        <button id="clinic-add-new-card-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u062A \u062C\u062F\u064A\u062F
                        </button>
                        <div class="text-sm text-gray-500">\u064A\u0645\u0643\u0646\u0643 \u0627\u062E\u062A\u064A\u0627\u0631 "\u0645\u0624\u0634\u0631 \u062C\u0627\u0647\u0632" \u0623\u0648 "\u0639\u062F\u062F \u062D\u0633\u0628 \u062D\u0642\u0644"</div>
                    </div>
                    <div id="clinic-cards-list-container" class="space-y-3">
                        ${t.map((o,l)=>this.renderClinicCardEditForm(o,l)).join("")}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" id="clinic-save-cards-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i);const n=()=>i.remove();i.querySelector(".modal-close")?.addEventListener("click",n),i.querySelector('[data-action="close"]')?.addEventListener("click",n),i.addEventListener("click",o=>{o.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n()});const s=i.querySelector("#clinic-cards-list-container"),a=()=>{const o={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,mode:"metric",metric:"totalVisits"},l=document.createElement("div");l.innerHTML=this.renderClinicCardEditForm(o,s?.children?.length||0),s?.appendChild(l.firstElementChild),this.bindClinicCardEditEvents(i)};i.querySelector("#clinic-add-new-card-btn")?.addEventListener("click",a),i.querySelector("#clinic-save-cards-btn")?.addEventListener("click",()=>{const o=i.querySelectorAll(".clinic-card-edit-form"),l=[];o.forEach(r=>{const c=r.getAttribute("data-card-id"),p=r.querySelector('[name="enabled"]')?.checked,f=r.querySelector('[name="title"]')?.value||"",d=r.querySelector('[name="description"]')?.value||"",m=r.querySelector('[name="icon"]')?.value||"fas fa-info-circle",u=r.querySelector('[name="color"]')?.value||"blue",g=r.querySelector('[name="mode"]')?.value||"metric",y=r.querySelector('[name="metric"]')?.value||"totalVisits",h=r.querySelector('[name="dataset"]')?.value||"visits",x=r.querySelector('[name="field"]')?.value||"",T=r.querySelector('[name="fieldValue"]')?.value||"";l.push({id:c,enabled:p,title:f,description:d,icon:m,color:u,mode:g,metric:y,dataset:h,field:x,fieldValue:T})}),localStorage.setItem(e.cards,JSON.stringify(l)),n(),this.loadClinicInfoCards(),this.calculateClinicCardValues(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D")}),this.bindClinicCardEditEvents(i)},renderClinicCardEditForm(e,t){const i=a=>Utils.escapeHTML(a||""),n=[{value:"totalVisits",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"totalDispensedQty",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"},{value:"totalMedications",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062F\u0648\u064A\u0629"},{value:"expiredMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629"},{value:"lowStockMedications",label:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636 (\u226410)"},{value:"visitsWithMedications",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621"},{value:"uniqueDispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629"}],s=[{value:"visits",label:"\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"medications",label:"\u0623\u062F\u0648\u064A\u0629 (\u0645\u062E\u0632\u0648\u0646)"},{value:"dispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 (\u0645\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A)"},{value:"sickLeave",label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629"},{value:"injuries",label:"\u0625\u0635\u0627\u0628\u0627\u062A"},{value:"supplyRequests",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A"}];return`
            <div class="clinic-card-edit-form border rounded-lg p-4 bg-white" data-card-id="${i(e.id)}">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <label class="flex items-center gap-2 text-sm font-semibold">
                            <input type="checkbox" name="enabled" ${e.enabled?"checked":""}>
                            \u062A\u0641\u0639\u064A\u0644
                        </label>
                        <span class="text-xs text-gray-500">#${t+1}</span>
                    </div>
                    <button type="button" class="btn-icon btn-icon-danger clinic-remove-card-btn" data-card-id="${i(e.id)}" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="clinic-card-${i(e.id)}-title" class="block text-sm font-medium mb-2">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>
                        <input type="text" id="clinic-card-${i(e.id)}-title" name="title" class="form-input" value="${i(e.title)}">
                    </div>
                    <div>
                        <label for="clinic-card-${i(e.id)}-icon" class="block text-sm font-medium mb-2">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 (FontAwesome class)</label>
                        <input type="text" id="clinic-card-${i(e.id)}-icon" name="icon" class="form-input" value="${i(e.icon||"fas fa-info-circle")}">
                    </div>
                    <div class="md:col-span-2">
                        <label for="clinic-card-${i(e.id)}-description" class="block text-sm font-medium mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                        <input type="text" id="clinic-card-${i(e.id)}-description" name="description" class="form-input" value="${i(e.description)}">
                    </div>
                    <div>
                        <label for="clinic-card-${i(e.id)}-color" class="block text-sm font-medium mb-2">\u0627\u0644\u0644\u0648\u0646</label>
                        <select id="clinic-card-${i(e.id)}-color" name="color" class="form-input">
                            ${["blue","green","red","orange","purple","yellow"].map(a=>`<option value="${a}" ${e.color===a?"selected":""}>${a}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${i(e.id)}-mode" class="block text-sm font-medium mb-2">\u0646\u0648\u0639 \u0627\u0644\u0643\u0631\u062A</label>
                        <select id="clinic-card-${i(e.id)}-mode" name="mode" class="form-input clinic-card-mode">
                            <option value="metric" ${e.mode==="metric"?"selected":""}>\u0645\u0624\u0634\u0631 \u062C\u0627\u0647\u0632</option>
                            <option value="countByField" ${e.mode==="countByField"?"selected":""}>\u0639\u062F\u062F \u062D\u0633\u0628 \u062D\u0642\u0644</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 clinic-card-metric-wrap" style="display:${e.mode==="metric"?"grid":"none"}">
                    <div class="md:col-span-2">
                        <label for="clinic-card-${i(e.id)}-metric" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u0624\u0634\u0631</label>
                        <select id="clinic-card-${i(e.id)}-metric" name="metric" class="form-input">
                            ${n.map(a=>`<option value="${a.value}" ${e.metric===a.value?"selected":""}>${i(a.label)}</option>`).join("")}
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 clinic-card-field-wrap" style="display:${e.mode==="countByField"?"grid":"none"}">
                    <div>
                        <label for="clinic-card-${i(e.id)}-dataset" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</label>
                        <select id="clinic-card-${i(e.id)}-dataset" name="dataset" class="form-input">
                            ${s.map(a=>`<option value="${a.value}" ${e.dataset===a.value?"selected":""}>${i(a.label)}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${i(e.id)}-field" class="block text-sm font-medium mb-2">\u0627\u0644\u062D\u0642\u0644</label>
                        <input type="text" id="clinic-card-${i(e.id)}-field" name="field" class="form-input" placeholder="\u0645\u062B\u0627\u0644: status / reason" value="${i(e.field)}">
                    </div>
                    <div>
                        <label for="clinic-card-${i(e.id)}-fieldValue" class="block text-sm font-medium mb-2">\u0627\u0644\u0642\u064A\u0645\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <input type="text" id="clinic-card-${i(e.id)}-fieldValue" name="fieldValue" class="form-input" placeholder="\u0625\u0630\u0627 \u062A\u064F\u0631\u0643 \u0641\u0627\u0631\u063A\u064B\u0627 = \u0623\u064A \u0642\u064A\u0645\u0629" value="${i(e.fieldValue)}">
                    </div>
                </div>
            </div>
        `},bindClinicCardEditEvents(e){e.querySelectorAll(".clinic-remove-card-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&e.querySelector(`.clinic-card-edit-form[data-card-id="${i}"]`)?.remove()})}),e.querySelectorAll(".clinic-card-mode").forEach(t=>{t.addEventListener("change",()=>{const i=t.closest(".clinic-card-edit-form");if(!i)return;const n=i.querySelector(".clinic-card-metric-wrap"),s=i.querySelector(".clinic-card-field-wrap"),a=t.value;n&&(n.style.display=a==="metric"?"grid":"none"),s&&(s.style.display=a==="countByField"?"grid":"none")})})},addClinicAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("clinic-new-analysis-dataset"),t=document.getElementById("clinic-new-analysis-field"),i=document.getElementById("clinic-new-analysis-custom-field"),n=document.getElementById("clinic-new-analysis-label"),s=document.getElementById("clinic-new-analysis-charttype"),a=e?.value||"visits";let o=t?.value||"";o==="__custom__"&&(o=(i?.value||"").trim());const l=(n?.value||"").trim(),r=s?.value||"auto";if(!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!l){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const c=this.getClinicAnalysisStorageKeys();let p=[];try{p=JSON.parse(localStorage.getItem(c.items)||"[]")||[]}catch{p=[]}Array.isArray(p)||(p=[]);const f={id:`custom_${Date.now()}`,label:l,enabled:!0,dataset:a,field:o,chartType:r};p.push(f),localStorage.setItem(c.items,JSON.stringify(p)),n&&(n.value=""),i&&(i.value=""),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.loadClinicDataAnalysis()},toggleClinicAnalysisItem(e,t){if(!this.isCurrentUserAdmin())return;const i=this.getClinicAnalysisStorageKeys();let n=[];try{n=JSON.parse(localStorage.getItem(i.items)||"[]")||[]}catch{n=[]}const s=(Array.isArray(n)?n:[]).find(a=>a.id===e);s&&(s.enabled=t,localStorage.setItem(i.items,JSON.stringify(n)),this.updateClinicAnalysisResults())},removeClinicAnalysisItem(e){if(!this.isCurrentUserAdmin()||!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const t=this.getClinicAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{i=[]}const n=(Array.isArray(i)?i:[]).filter(s=>s.id!==e);localStorage.setItem(t.items,JSON.stringify(n)),this.loadClinicDataAnalysis(),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},calculateMedicationStatus(e){const t=new Date;t.setHours(0,0,0,0);let i=null;e.expiryDate&&(i=new Date(e.expiryDate),Number.isNaN(i.getTime())&&(i=new Date(e.expiryDate)),i.setHours(0,0,0,0));const s=parseFloat(e.remainingQuantity??e.quantity??0)>0;let a="\u0633\u0627\u0631\u064A",o=null;if(i&&!Number.isNaN(i.getTime())){const l=i.getTime()-t.getTime();o=Math.ceil(l/864e5),o<0?a="\u0645\u0646\u062A\u0647\u064A":o<=30&&(a=s?"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0633\u0627\u0631\u064A")}return{status:a,daysRemaining:o}},getMedicationStatusClasses(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-100 text-red-700":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"},getMedicationStatusHint(e={}){return!e||e.daysRemaining===null||e.daysRemaining===void 0?"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621":e.daysRemaining<0?"\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621\u060C \u064A\u0631\u062C\u0649 \u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064B":e.daysRemaining===0?"\u064A\u0646\u062A\u0647\u064A \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u064A\u0648\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0623\u0648 \u0627\u0644\u062A\u062E\u0644\u0635 \u0645\u0646\u0647 \u062D\u0633\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":e.daysRemaining<=30?`\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645${e.daysRemaining===1?"":"\u0627\u064B"} \u0639\u0644\u0649 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629`:`\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0633\u0627\u0631\u064A\u0629\u060C \u064A\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645\u064B\u0627 \u062A\u0642\u0631\u064A\u0628\u064B\u0627`},getInjuryStatusBadgeClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"badge-success":e==="\u0645\u063A\u0644\u0642"?"badge-info":"badge-warning"},getInjuryRowClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"bg-green-50":e==="\u0645\u063A\u0644\u0642"?"bg-gray-50":"bg-red-50"},viewInjuryRecord(e){const t=this.getInjuries().find(y=>y.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const i=String(t.personType||"employee").toLowerCase(),n=i==="contractor"||i==="external",s=t.employeeName||t.personName||"",a=t.contractorName||"",o=t.employeeCode||t.employeeNumber||"",l=t.employeePosition||t.contractorPosition||"\u2014",r=t.department||t.employeeDepartment||"\u2014",c=t.factoryName||t.factory||"\u2014",p=t.subLocationName||t.subLocation||"\u2014",f=t.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",d=Array.isArray(t.attachments)?t.attachments:[],m=d.length?d.map((y,h)=>{const x=y.type&&(y.type.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(y.name||"")),T=this.processAttachmentUrl(y.data);return x&&T?`
                        <div class="bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-image text-blue-500"></i>
                                    <div>
                                        <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(y.name||`\u0635\u0648\u0631\u0629 ${h+1}`)}</div>
                                        <div class="text-xs text-gray-500">${y.size||0} KB</div>
                                    </div>
                                </div>
                                <a href="${T}" download="${Utils.escapeHTML(y.name||`attachment-${h+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                            <img src="${Utils.escapeHTML(T)}" alt="${Utils.escapeHTML(y.name||"")}" class="max-w-full h-auto rounded border" style="max-height: 250px;"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                    `:`
                        <div class="flex items-center justify-between bg-white border border-blue-100 rounded-xl px-3 py-2 shadow-sm">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-paperclip text-blue-500"></i>
                                <div>
                                    <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(y.name||`\u0645\u0644\u0641 ${h+1}`)}</div>
                                    <div class="text-xs text-gray-500">${y.size||0} KB</div>
                                </div>
                            </div>
                            <a href="${T||y.data}" download="${Utils.escapeHTML(y.name||`attachment-${h+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    `}).join(""):'<div class="text-sm text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl p-3">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0644\u0644\u062D\u0627\u0644\u0629.</div>',u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
            <div class="modal-content" style="max-width: 920px; border-radius: 16px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white; padding: 16px 20px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-notes-medical"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0627\u0644\u0637\u0628\u064A\u0629
                    </h2>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4" style="background: #f8fafc; padding: 18px;">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</span>
                            <p class="text-gray-900 font-semibold mt-1">${n?"\u0645\u0642\u0627\u0648\u0644 / \u062E\u0627\u0631\u062C\u064A":"\u0645\u0648\u0638\u0641"}</p>
                        </div>
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">${n?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</span>
                            <p class="text-gray-900 font-semibold mt-1">${Utils.escapeHTML(n?a||"\u2014":o||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628</span>
                            <p class="text-gray-900 font-semibold mt-1">${Utils.escapeHTML(s)}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(r)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(l)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                            <p class="text-gray-900 mt-1">${this.formatDate(t.injuryDate,!0)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(c)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(p)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="mt-1">
                                <span class="badge ${this.getInjuryStatusBadgeClass(f)}">${Utils.escapeHTML(f)}</span>
                            </p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(t.injuryType||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(t.injuryBodyPart||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:col-span-2">
                            <span class="text-xs font-semibold text-gray-600">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(t.injuryLocation||"\u2014")}</p>
                        </div>
                    </div>

                    <div class="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                        <span class="text-sm font-semibold text-red-700 block mb-1">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                        <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(t.injuryDescription||"\u2014")}</p>
                    </div>

                    ${t.actionsTaken?`
                        <div class="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                            <span class="text-sm font-semibold text-amber-700 block mb-1">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</span>
                            <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(t.actionsTaken||"")}</p>
                    </div>
                    `:""}
                    ${t.treatment?`
                        <div class="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                            <span class="text-sm font-semibold text-emerald-700 block mb-1">\u0627\u0644\u0639\u0644\u0627\u062C</span>
                            <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(t.treatment||"")}</p>
                        </div>
                    `:""}

                    <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                        <span class="text-sm font-semibold text-blue-700 mb-2 block">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</span>
                        <div class="space-y-2">
                            ${m}
                        </div>
                    </div>

                    <div class="text-sm text-gray-500 border-t border-gray-200 pt-3">
                        <span class="font-medium">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629:</span> ${Utils.escapeHTML(this.getUserDisplayName(t.createdBy))}
                        ${t.createdAt?`<span class="ml-2">\u0628\u062A\u0627\u0631\u064A\u062E ${this.formatDate(t.createdAt,!0)}</span>`:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered" style="background: #f8fafc;">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary modal-edit-btn">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(u);const g=()=>u.remove();u.querySelectorAll(".modal-close, .modal-close-btn").forEach(y=>y.addEventListener("click",g)),u.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{g(),this.showInjuryForm(t)}),u.addEventListener("click",y=>{y.target===u&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&g()})},editInjury(e){const t=this.getInjuries().find(i=>i.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}this.showInjuryForm(t)},exportInjuriesToExcel(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(a=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628":a.employeeName||a.personName||"",\u0627\u0644\u0642\u0633\u0645:a.department||a.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629":this.formatDate(a.injuryDate,!0),"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":a.injuryType||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":a.injuryLocation||"",\u0627\u0644\u062D\u0627\u0644\u0629:a.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(a.attachments)?a.attachments.length:0,"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629":a.actionsTaken||"",\u0627\u0644\u0639\u0644\u0627\u062C:a.treatment||""})),i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(i,n,"Injuries");const s=`Clinic_Injuries_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s)},exportInjuriesToPDF(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const i=`
            <table>
                <thead>
                    <tr>
                        <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628</th>
                        <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629</th>
                        <th>\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</th>
                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        <th>\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.map(a=>`
            <tr>
                <td>${Utils.escapeHTML(a.employeeName||a.personName||"")}</td>
                <td>${Utils.escapeHTML(a.department||a.employeeDepartment||"")}</td>
                <td>${this.formatDate(a.injuryDate,!0)}</td>
                <td>${Utils.escapeHTML(a.injuryType||"")}</td>
                <td>${Utils.escapeHTML(a.status||"")}</td>
                <td>${Array.isArray(a.attachments)?a.attachments.length:0}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,n=`INJURIES-REPORT-${new Date().toISOString().slice(0,10)}`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",i,!1,!0):`<html><body>${i}</body></html>`;try{const a=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(a),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(a){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629")}},normalizeMedicationRecord(e={}){const t=(x,T=0)=>{if(x==null)return T;if(typeof x=="number")return Number.isFinite(x)?x:T;if(typeof x=="string"){const A=x.trim();if(!A)return T;const D=A.replace(/[, ]+/g,""),b=Number(D);return Number.isFinite(b)?b:T}return T},i=e.id||Utils.generateId("MED"),n=e.name||e.medicationName||"",s=e.type||e.medicationType||e.category||"",a=e.purchaseDate||e.buyDate||e.createdAt||new Date().toISOString(),o=e.expiryDate||e.endDate||"",l=e.quantityAdded!==void 0&&e.quantityAdded!==null?t(e.quantityAdded,0):e.initialQuantity!==void 0&&e.initialQuantity!==null?t(e.initialQuantity,0):t(e.quantity,0),r=e.remainingQuantity!==void 0&&e.remainingQuantity!==null?t(e.remainingQuantity,0):e.quantityRemaining!==void 0&&e.quantityRemaining!==null?t(e.quantityRemaining,0):t(e.quantity,0),c=e.location||e.storageLocation||"",p=e.createdAt||new Date().toISOString(),f=e.updatedAt||p,d=typeof e.createdBy=="string"&&e.createdBy.trim()!==""?{id:e.createdById||"",name:e.createdBy.trim()}:e.createdBy||this.getCurrentUserSummary(e.createdBy),m=e.createdById||d?.id||AppState.currentUser?.id||"",u=typeof e.updatedBy=="string"&&e.updatedBy.trim()!==""?{id:"",name:e.updatedBy.trim()}:e.updatedBy||this.getCurrentUserSummary(e.updatedBy),g=e.notes||e.description||"",y=e.usage||"",h=this.calculateMedicationStatus({expiryDate:o});return{id:i,name:n,type:s,usage:y,purchaseDate:a,expiryDate:o,quantityAdded:t(l,0),remainingQuantity:t(r,0),location:c,notes:g,createdBy:d,createdById:m,createdAt:p,updatedAt:f,updatedBy:u,status:e.status||h.status,daysRemaining:e.daysRemaining!==void 0?e.daysRemaining:h.daysRemaining}},normalizeSickLeaveRecord(e={}){const t=e.id||Utils.generateId("SICK_LEAVE"),i=e.personType||"employee",n=e.startDate?new Date(e.startDate).toISOString():new Date().toISOString(),s=e.endDate?new Date(e.endDate).toISOString():n,a=e.createdAt||new Date().toISOString(),o=e.updatedAt||a,l=e.createdBy||this.getCurrentUserSummary(e.createdBy),r=e.createdById||l?.id||AppState.currentUser?.id||"",c=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),p=this.calculateSickLeaveDays(n,s);return{id:t,personType:i,employeeName:e.employeeName||e.personName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",reason:e.reason||"",medicalNotes:e.medicalNotes||e.notes||"",treatingDoctor:e.treatingDoctor||e.doctor||"",startDate:n,endDate:s,daysCount:p,createdBy:l,createdById:r,createdAt:a,updatedAt:o,updatedBy:c}},normalizeInjuryRecord(e={}){const t=e.id||Utils.generateId("INJURY"),i=e.personType||"employee",n=e.injuryDate?new Date(e.injuryDate).toISOString():new Date().toISOString(),s=e.createdAt||new Date().toISOString(),a=e.updatedAt||s,o=e.createdBy||this.getCurrentUserSummary(e.createdBy),l=e.createdById||o?.id||AppState.currentUser?.id||"",r=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),c=Array.isArray(e.attachments)?e.attachments.map(p=>this.normalizeAttachment(p)).filter(Boolean):[];return{id:t,personType:i,employeeName:e.employeeName||"",contractorName:e.contractorName||"",personName:e.personName||e.employeeName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.contractorPosition||e.position||"",contractorPosition:e.contractorPosition||e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",department:e.department||e.employeeDepartment||"",factory:e.factory||"",factoryName:e.factoryName||"",subLocation:e.subLocation||e.subLocationName||"",subLocationName:e.subLocationName||e.subLocation||"",injuryDate:n,injuryType:e.injuryType||e.type||"",injuryBodyPart:e.injuryBodyPart||"",injuryLocation:e.injuryLocation||e.location||"",injuryDescription:e.injuryDescription||e.description||"",actionsTaken:e.actionsTaken||e.actions||"",treatment:e.treatment||"",status:e.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",attachments:c,createdBy:o,createdById:l,createdAt:s,updatedAt:a,updatedBy:r}},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"";if(!t)return null;const i=e.size||Math.round(t.length*3/4/1024);return{id:e.id||Utils.generateId("ATT"),name:e.name||e.fileName||"attachment",type:e.type||e.mimeType||"application/octet-stream",data:t,size:i,uploadedAt:e.uploadedAt||new Date().toISOString()}},calculateSickLeaveDays(e,t){try{const i=new Date(e),n=new Date(t);if(Number.isNaN(i.getTime())||Number.isNaN(n.getTime()))return 1;const s=n.getTime()-i.getTime();return s>=0?Math.floor(s/864e5)+1:1}catch{return 1}},formatDate(e,t=!1){if(!e)return"-";try{return t?Utils.formatDateTime(e):Utils.formatDate(e)}catch{return"-"}},getMedications(){return Array.isArray(AppState.appData?.medications)&&AppState.appData.medications.length>0?AppState.appData.medications:Array.isArray(AppState.appData?.clinicMedications)&&AppState.appData.clinicMedications.length>0?AppState.appData.clinicMedications:Array.isArray(AppState.appData?.clinicInventory)&&AppState.appData.clinicInventory.length>0?AppState.appData.clinicInventory:[]},getSickLeaves(){return Array.isArray(AppState.appData?.sickLeave)?AppState.appData.sickLeave:[]},getInjuries(){return Array.isArray(AppState.appData?.injuries)?AppState.appData.injuries:[]},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(n=>n.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const n=Permissions.formSettingsState.sites.find(s=>s.id===e);if(n&&Array.isArray(n.places))return n.places.map(s=>({id:s.id,name:s.name}))}if(Array.isArray(AppState.appData?.observationSites)){const n=AppState.appData.observationSites.find(s=>(s.id||s.siteId)===e);if(n)return(Array.isArray(n.places)?n.places:Array.isArray(n.locations)?n.locations:Array.isArray(n.children)?n.children:Array.isArray(n.areas)?n.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const n=DailyObservations.DEFAULT_SITES.find(s=>(s.id||s.siteId)===e);if(n)return(Array.isArray(n.places)?n.places:Array.isArray(n.locations)?n.locations:Array.isArray(n.children)?n.children:Array.isArray(n.areas)?n.areas:[]).map((a,o)=>({id:a.id||a.placeId||a.value||Utils.generateId("PLACE"),name:a.name||a.placeName||a.title||a.label||a.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 (\u0627\u0644\u0639\u064A\u0627\u062F\u0629):",t),[]}},setupClinicWorkplaceDatalist(e,t,i,n={}){const s=n.clearOnFactoryChange!==!1,a=document.getElementById(e),o=document.getElementById(t),l=document.getElementById(i);if(!a||!o||!l)return;const r=f=>{const d=(a.value||"").trim(),m=d?this.getPlaceOptions(d):[];l.innerHTML=m.map(u=>`<option value="${Utils.escapeHTML(u.name)}"></option>`).join(""),f&&(o.value="")},c="_clinicWorkplaceFactoryChange";a[c]&&a.removeEventListener("change",a[c]);const p=()=>r(s);a[c]=p,a.addEventListener("change",p),r(!1)},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??""),i=n=>'<option value="">'+(n||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(e||[]).map(s=>'<option value="'+t(s.id)+'">'+t(s.name)+"</option>").join("");["visits-filter-factory","visit-factory","visit-contractor-factory","enhanced-visit-factory"].forEach(n=>{const s=document.getElementById(n);if(s&&s.tagName==="SELECT"){const a=s.value;s.innerHTML=i("\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),a&&(s.value=a)}}),typeof this.setupClinicWorkplaceDatalist=="function"&&(this.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),this.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"),this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"))}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic.refreshSiteDropdowns:",e)}},getExpiringMedications(){return this.getMedications().filter(e=>e.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"||e.status==="\u0645\u0646\u062A\u0647\u064A")},ensureDataStructure(){if(typeof AppState>"u"||!AppState.appData)return;const e=AppState.appData;e.clinicMedications||(e.clinicMedications=[]),e.injuries||(e.injuries=[]),e.sickLeave||(e.sickLeave=[]),e.clinicVisits||(e.clinicVisits=[]),e.clinicSupplyRequests||(e.clinicSupplyRequests=[])},notifyMedicationAlerts(){this.getExpiringMedications().forEach(t=>{this.state.medicationAlertsNotified.has(t.id)||(t.status==="\u0645\u0646\u062A\u0647\u064A"?Notification?.error?.(`\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")}`):Notification?.warning?.(`\u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")} \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${t.daysRemaining??0} \u064A\u0648\u0645`),this.state.medicationAlertsNotified.add(t.id))})},getFilteredMedications(){const e=this.state.filters.medications||{},t=(e.search||"").toLowerCase().trim(),i=e.dateFrom?new Date(e.dateFrom):null,n=e.dateTo?new Date(e.dateTo):null,s=e.status||"all";return this.getMedications().map(a=>this.normalizeMedicationRecord(a)).filter(a=>{const o=[a.name,a.type,a.location,a.usage,a.notes,this.getUserDisplayName(a.createdBy)].map(r=>String(r||"").toLowerCase()).join(" ");if(!(!t||o.includes(t))||s!=="all"&&a.status!==s)return!1;if(i){const r=a.purchaseDate?new Date(a.purchaseDate):null;if(!r||r<i)return!1}if(n){const r=a.purchaseDate?new Date(a.purchaseDate):null;if(!r||r>n)return!1}return!0})},getFilteredSickLeaves(){const e=this.state.filters.sickLeave||{},t=(e.search||"").toLowerCase(),i=e.department||"",n=e.dateFrom?new Date(e.dateFrom):null,s=e.dateTo?new Date(e.dateTo):null;return this.getSickLeaves().filter(a=>{if(!(!t||a.employeeName&&a.employeeName.toLowerCase().includes(t)||a.personName&&a.personName.toLowerCase().includes(t)||a.employeeDepartment&&a.employeeDepartment.toLowerCase().includes(t))||i&&a.employeeDepartment!==i)return!1;const l=a.startDate?new Date(a.startDate):null;return!(n&&(!l||l<n)||s&&(!l||l>s))})},getFilteredInjuries(){const e=this.state.filters.injuries||{},t=(e.search||"").toLowerCase(),i=e.status||"all",n=e.department||"",s=e.injuryType||"all",a=e.injuryBodyPart||"all",o=this.state.activeInjuryType||"employees",l=e.dateFrom?new Date(e.dateFrom):null,r=e.dateTo?new Date(e.dateTo):null;return this.getInjuries().filter(c=>{const p=[c.employeeCode,c.employeeNumber,c.employeeName,c.personName,c.contractorName,c.employeeDepartment,c.department,c.factoryName,c.factory,c.subLocationName,c.subLocation,c.injuryType,c.injuryBodyPart,c.injuryLocation,c.status,c.injuryDescription].map(u=>String(u||"").toLowerCase()).join(" ");if(!(!t||p.includes(t))||i!=="all"&&c.status!==i||s!=="all"&&(c.injuryType||"")!==s||a!=="all"&&(c.injuryBodyPart||"")!==a||n&&c.department!==n)return!1;const d=String(c.personType||"employee").toLowerCase();if(o==="employees"&&d!=="employee"||o==="contractors"&&d==="employee")return!1;const m=c.injuryDate?new Date(c.injuryDate):null;return!(l&&(!m||m<l)||r&&(!m||m>r))})},renderEmptyState(e){const{t,isRTL:i}=this.getTranslations(),n=i?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A":"No data available";return`
            <div class="empty-state" style="direction: ${i?"rtl":"ltr"}; text-align: ${i?"right":"left"};">
                <i class="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${Utils.escapeHTML(e||n)}</p>
            </div>
        `},getClinicDepartments(){const e=new Set;return(AppState.appData?.employees||[]).forEach(t=>{const i=(t?.department||"").trim();i&&e.add(i)}),(AppState.appData?.sickLeave||[]).forEach(t=>{const i=(t?.employeeDepartment||t?.department||"").trim();i&&e.add(i)}),(AppState.appData?.injuries||[]).forEach(t=>{const i=(t?.employeeDepartment||t?.department||"").trim();i&&e.add(i)}),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar"))},getMedicationBadgeClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"badge-danger":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"badge-warning":"badge-success"},renderTabNavigation(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.getAttribute("data-tab")===this.state.activeTab?((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-secondary"),t.classList.add("btn-primary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.add("active")):((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-primary"),t.classList.add("btn-secondary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.remove("active"))})},bindTabEvents(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-tab");!i||i===this.state.activeTab||(this.state.activeTab=i,this.renderTabNavigation(),requestAnimationFrame(()=>{this._activateTabPanels(i),this.scheduleClinicTabRender(i,{delayMs:20})}))})})},_activateTabPanels(e){try{document.querySelectorAll(".clinic-tab-panel").forEach(i=>{i.getAttribute("data-tab-panel")===e?(i.classList.add("active"),i.style.display="block"):(i.classList.remove("active"),i.style.display="none")}),this._syncAttendanceQuickNavVisibility?.()}catch{}},_renderTabSkeleton(e,t){try{if(!e||(e.innerHTML||"").trim())return;const n=Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");if(e.innerHTML=`
                <div class="content-card" style="margin:14px;">
                    <div class="card-body" style="display:flex;align-items:center;justify-content:center;min-height:210px;gap:12px;">
                        <div style="width:34px;height:34px;border:3px solid rgba(37,99,235,0.18);border-top-color:#2563eb;border-radius:50%;animation:hseSpin 0.9s linear infinite;"></div>
                        <div style="font-weight:600;color:#334155;">${n}</div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),!document.getElementById("hse-mini-spinner-style")){const s=document.createElement("style");s.id="hse-mini-spinner-style",s.textContent="@keyframes hseSpin{to{transform:rotate(360deg);}}",document.head.appendChild(s)}}catch{}},scheduleClinicTabRender(e,{delayMs:t=0}={}){try{if(!e)return;this._tabRenderState||(this._tabRenderState={token:0,timers:{}});const i=this._tabRenderState;i.token+=1;const n=i.token,s=i.timers[e];s&&(clearTimeout(s),i.timers[e]=null);const a=document.querySelector(`.clinic-tab-panel[data-tab-panel="${e}"]`),o={visits:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F...",attendance:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u062D\u0636\u0648\u0631...",medications:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0623\u062F\u0648\u064A\u0629...",sickLeave:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629...","dispensed-medications":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629...",injuries:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A...","supply-request":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A...",approvals:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629..."};this._renderTabSkeleton(a,o[e]||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");const l=()=>{!this._tabRenderState||n!==this._tabRenderState.token||setTimeout(()=>{if(!(!this._tabRenderState||n!==this._tabRenderState.token))try{this._renderTabByKey(e)}catch(c){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0631\u0646\u062F\u0631 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e,c)}},0)},r=["visits","attendance"];requestAnimationFrame(()=>{if(r.includes(e)){l();return}typeof requestIdleCallback=="function"?requestIdleCallback(l,{timeout:900}):l()}),i.timers[e]=setTimeout(()=>{!this._tabRenderState||n!==this._tabRenderState.token||l()},Math.max(0,t))}catch{}},_renderTabByKey(e){if(e==="visits"){this.renderVisitsTab(!1);return}if(e==="medications")return this.renderMedicationsTab();if(e==="sickLeave")return this.renderSickLeaveTab();if(e==="injuries")return this.renderInjuriesTab();if(e==="approvals")return this.renderApprovalsTab();if(e==="dispensed-medications")return this.renderDispensedMedicationsTab();if(e==="analytics")return this.renderAnalyticsTab();if(e==="data-analysis")return this.renderDataAnalysisTab();if(e==="supply-request")return this.renderSupplyRequestTab();if(e==="attendance"){this.scheduleAttendanceTabRender(0);return}},renderActiveTabContent(){const e=this.state.activeTab||"medications";if(this._activateTabPanels(e),e==="visits"){this.renderVisitsTab(!1);return}this.scheduleClinicTabRender(e,{delayMs:0})},renderMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]');if(!e)return;const t=document.activeElement?document.activeElement.id:null;let i=0,n=0;t==="medications-search"&&(i=document.activeElement.selectionStart,n=document.activeElement.selectionEnd);const s=this.state.filters.medications||{},a=this.getFilteredMedications(),o=this.isCurrentUserAdmin(),l=a.map(c=>{const p=this.calculateMedicationStatus(c),f=p.status||"\u0633\u0627\u0631\u064A",d=p.daysRemaining!==void 0&&p.daysRemaining!==null?p.daysRemaining:"\u2014",m=this.formatDate(c.purchaseDate),u=c.expiryDate?this.formatDate(c.expiryDate):"\u2014",g=this.getMedicationRowClass(f),y=c.quantityAdded??c.quantity??0,h=c.remainingQuantity??c.quantity??0,x=Math.max(0,y-h),T=c.usage||c.notes||"\u2014",A=o?`
                <button type="button" class="btn-icon btn-icon-primary" data-action="view-medication" data-id="${Utils.escapeHTML(c.id||"")}">
                    <i class="fas fa-eye"></i>
                </button>
                <button type="button" class="btn-icon btn-icon-warning" data-action="edit-medication" data-id="${Utils.escapeHTML(c.id||"")}">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn-icon btn-icon-danger" data-action="delete-medication" data-id="${Utils.escapeHTML(c.id||"")}">
                    <i class="fas fa-trash"></i>
                </button>
            `:`
                <button type="button" class="btn-icon btn-icon-primary" data-action="view-medication" data-id="${Utils.escapeHTML(c.id||"")}">
                    <i class="fas fa-eye"></i>
                </button>
            `;return`
                <tr class="${g}">
                    <td>${Utils.escapeHTML(c.name||"")}</td>
                    <td>${Utils.escapeHTML(c.type||"")}</td>
                    <td>${Utils.escapeHTML(T)}</td>
                    <td>${m}</td>
                    <td>${u}</td>
                    <td>
                        <span class="badge ${this.getMedicationBadgeClass(f)}">${Utils.escapeHTML(f)}</span>
                    </td>
                    <td>${d}</td>
                    <td class="text-center font-semibold">${y}</td>
                    <td class="text-center font-semibold text-blue-600">${x}</td>
                    <td class="text-center font-semibold">${h}</td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(c.createdBy))}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            ${A}
                        </div>
                    </td>
                </tr>
            `}).join(""),r=a.length?`
                <div class="table-wrapper clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table table-header-green">
                        <thead>
                            <tr>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</th>
                                <th>\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</th>
                                <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
                                <th class="text-center">\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                <th class="text-center">\u0627\u0644\u0645\u0646\u0635\u0631\u0641</th>
                                <th class="text-center">\u0627\u0644\u0631\u0635\u064A\u062F</th>
                                <th>\u0628\u0648\u0627\u0633\u0637\u0629</th>
                                <th class="text-center">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l}
                        </tbody>
                    </table>
                </div>
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644.");if(e.innerHTML=`
            <!-- \u062A\u0631\u0648\u064A\u0633\u0629 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0639\u0644\u0649 \u063A\u0631\u0627\u0631 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F -->
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4" style="direction: rtl;">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold" style="text-align: right; color: #1e293b;">
                        <i class="fas fa-pills ml-2 text-green-600"></i>\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629
                    </h3>
                </div>
                <div class="flex gap-2">
                    <button type="button" class="btn-secondary" id="medications-export-pdf-btn">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-success" id="medications-export-excel-btn">
                        <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    ${o?`
                    <button type="button" class="btn-primary" id="medications-add-btn">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F
                    </button>
                    `:""}
                </div>
            </div>

            <!-- \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0627\u062D\u062A\u0631\u0627\u0641\u064A (\u0645\u0634\u0627\u0628\u0647 \u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646) -->
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 15px -20px; width: calc(100% + 40px); direction: rtl;">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <!-- \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B -->
                    <div class="filter-field" style="min-width: 180px;">
                        <label for="medications-search" class="filter-label" style="text-align: right;">
                            <i class="fas fa-search ml-1 text-gray-500"></i>\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0646\u0648\u0639
                        </label>
                        <input type="text" id="medications-search" class="filter-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 \u0623\u0648 \u0646\u0648\u0639\u0647..." value="${Utils.escapeHTML(s.search||"")}" style="width: 100%; text-align: right; direction: rtl;">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-status" class="filter-label" style="text-align: right;">
                            <i class="fas fa-info-circle ml-1 text-gray-500"></i>\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629
                            ${s.status&&s.status!=="all"?`<span class="filter-count-badge" style="background-color: #10b981; color: white; border-radius: 9999px; padding: 2px 6px; font-size: 0.75rem; margin-right: 6px;">${a.length}</span>`:""}
                        </label>
                        <select id="medications-status" class="filter-input" style="width: 100%; direction: rtl;">
                            <option value="all" ${s.status==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="\u0633\u0627\u0631\u064A" ${s.status==="\u0633\u0627\u0631\u064A"?"selected":""}>\u0633\u0627\u0631\u064A</option>
                            <option value="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" ${s.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"selected":""}>\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</option>
                            <option value="\u0645\u0646\u062A\u0647\u064A" ${s.status==="\u0645\u0646\u062A\u0647\u064A"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-date-from" class="filter-label" style="text-align: right;">
                            <i class="fas fa-calendar-alt ml-1 text-gray-500"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621
                        </label>
                        <input type="date" id="medications-date-from" class="filter-input" value="${s.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621" style="width: 100%; direction: rtl;">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-date-to" class="filter-label" style="text-align: right;">
                            <i class="fas fa-calendar-alt ml-1 text-gray-500"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621
                        </label>
                        <input type="date" id="medications-date-to" class="filter-input" value="${s.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621" style="width: 100%; direction: rtl;">
                    </div>
                    
                    <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 -->
                    <div class="filter-field" style="min-width: 140px;">
                        <button id="medications-reset-filters" class="filter-reset-btn" style="width: 100%;">
                            <i class="fas fa-redo ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                        </button>
                    </div>
                </div>
            </div>
            ${r}
        `,this.applyModuleI18n(e),this.bindMedicationsTabEvents(e),t){const c=e.querySelector(`#${t}`);c&&(c.focus(),t==="medications-search"&&(c.selectionStart=i,c.selectionEnd=n))}setTimeout(()=>{const c=e.querySelector(".clinic-table-wrapper");c&&this.setupTableScrollListeners(c)},100)},bindMedicationsTabEvents(e){const t=e.querySelector("#medications-search"),i=e.querySelector("#medications-status"),n=e.querySelector("#medications-date-from"),s=e.querySelector("#medications-date-to"),a=e.querySelector("#medications-reset-filters"),o=e.querySelector("#medications-add-btn"),l=e.querySelector("#medications-export-pdf-btn"),r=e.querySelector("#medications-export-excel-btn");t&&t.addEventListener("input",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.search=c.target.value,this.scheduleMedicationsTabRender(150)}),i&&i.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.status=c.target.value,this.scheduleMedicationsTabRender(50)}),n&&n.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateFrom=c.target.value,this.scheduleMedicationsTabRender(50)}),s&&s.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateTo=c.target.value,this.scheduleMedicationsTabRender(50)}),a&&a.addEventListener("click",()=>{this.state.filters=this.state.filters||{},this.state.filters.medications={search:"",status:"all",dateFrom:"",dateTo:""},this.scheduleMedicationsTabRender(0)}),o&&o.addEventListener("click",()=>this.showMedicationForm()),l&&l.addEventListener("click",()=>this.exportMedicationsToPDF()),r&&r.addEventListener("click",()=>this.exportMedicationsToExcel()),e.querySelectorAll('[data-action="view-medication"]').forEach(c=>{c.addEventListener("click",()=>this.viewMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-medication"]').forEach(c=>{c.addEventListener("click",()=>this.editMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="delete-medication"]').forEach(c=>{c.addEventListener("click",()=>this.deleteMedication(c.getAttribute("data-id")))})},viewMedication(e){const t=this.getMedications().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F");return}const i=t.status||"\u0633\u0627\u0631\u064A",n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621</h2>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</span>
                            <p class="text-gray-800">${Utils.escapeHTML(t.name||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</span>
                            <p class="text-gray-800">${Utils.escapeHTML(t.type||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                            <p class="text-gray-800">${Utils.escapeHTML(t.usage||t.notes||"\u2014")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</span>
                            <p class="text-gray-800">${this.formatDate(t.purchaseDate)}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</span>
                            <p class="text-gray-800">${t.expiryDate?this.formatDate(t.expiryDate):"\u2014"}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0645\u064A\u0629</span>
                            <p class="text-gray-800">${t.quantityAdded??t.quantity??0}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0631\u0635\u064A\u062F</span>
                            <p class="text-gray-800 font-semibold">${t.remainingQuantity??t.quantity??0}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0646\u0635\u0631\u0641</span>
                            <p class="text-gray-800 font-semibold text-blue-600">${Math.max(0,(t.quantityAdded??t.quantity??0)-(t.remainingQuantity??t.quantity??0))}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646</span>
                            <p class="text-gray-800">${Utils.escapeHTML(t.location||"\u2014")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="text-gray-800">
                                <span class="badge ${this.getMedicationBadgeClass(i)}">${Utils.escapeHTML(i)}</span>
                                ${t.daysRemaining!==void 0&&t.daysRemaining!==null?`<span class="text-xs text-gray-500 ml-2">(\u062A\u0628\u0642\u0649 ${t.daysRemaining} \u064A\u0648\u0645)</span>`:""}
                            </p>
                        </div>
                    </div>
                    ${t.notes?`
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                            <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(t.notes||"")}</p>
                        </div>
                    `:""}
                    <div class="text-sm text-gray-500 border-t pt-3 flex flex-wrap justify-between items-center gap-2" style="direction: rtl;">
                        <div>
                            <span class="font-semibold">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span>${Utils.escapeHTML(t.createdBy?.name||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                            ${t.createdAt?`<span class="text-xs text-gray-400 mr-2">(${this.formatDate(t.createdAt,!0)})</span>`:""}
                        </div>
                        ${t.updatedBy&&t.updatedBy.name&&t.updatedBy.name!=="\u0627\u0644\u0646\u0638\u0627\u0645"?`
                        <div>
                            <span class="font-semibold">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span>${Utils.escapeHTML(t.updatedBy.name)}</span>
                            ${t.updatedAt?`<span class="text-xs text-gray-400 mr-2">(${this.formatDate(t.updatedAt,!0)})</span>`:""}
                        </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(n);const s=()=>n.remove();n.querySelectorAll(".modal-close, .modal-close-btn").forEach(a=>{a.addEventListener("click",s)}),n.addEventListener("click",a=>{a.target===n&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s()})},editMedication(e){const t=this.getMedications().find(i=>i.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647");return}this.showMedicationForm(t)},async deleteMedication(e){const t=this.getMedications().find(n=>n.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062D\u0630\u0641\u0647");return}if(this.isCurrentUserAdmin()){if(!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))return;Loading.show();try{AppState.appData.medications=(AppState.appData.medications||[]).filter(s=>s.id!==e),AppState.appData.clinicMedications=(AppState.appData.clinicMedications||[]).filter(s=>s.id!==e),AppState.appData.clinicInventory=(AppState.appData.clinicInventory||[]).filter(s=>s.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:e}}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),this.renderMedicationsTab(),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062D\u0630\u0641",data:{id:e}}}))}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621:",s),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621: "+(s.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}else{if(!confirm(`\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}" \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`))return;Loading.show();try{const s={medicationId:e,medicationData:t,requestedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""},requestedById:AppState.currentUser?.id||"",reason:"\u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621"},a=await GoogleIntegration.sendRequest({action:"addMedicationDeletionRequest",data:s});if(a&&a.success)Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),this.notifyAdminAboutDeletionRequest(t),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),this.renderMedicationsTab();else throw new Error(a.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",s),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(s.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const e=(AppState.currentUser?.role||"").toLowerCase();return e==="admin"||e==="system_admin"||AppState.currentUser?.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e==="\u0645\u062F\u064A\u0631"},_isUsersSheetAdminRecord(e){if(!e)return!1;if(typeof Permissions<"u"){if(typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(e.role))return!0;const i=typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(e.permissions):e.permissions;if(i&&typeof i=="object"&&!Array.isArray(i)&&(Permissions.isAdminRole&&Permissions.isAdminRole(i.role)||i.admin===!0||i.isAdmin===!0||i["manage-modules"]===!0))return!0}const t=String(e.role||"").trim().toLowerCase();return t==="admin"||t==="system_admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="\u0645\u062F\u064A\u0631"},_invalidateApprovalsCache(){this._approvalsBackendFetchOk=!1;try{localStorage.removeItem("clinic_approvals_last_sync")}catch{}},_isApprovalTimeOffRequest(e){if(!e)return!1;if(e.approvalKind==="timeoff")return!0;const t=String(e.requestType||"").trim().toLowerCase();return t==="leave"||t==="permission"||t==="overtime"},_approvalRequestMatchesTypeFilter(e,t){return!e||!t||t==="all"?!0:t==="timeoff"?this._isApprovalTimeOffRequest(e):(e.approvalKind||e.requestType)===t},prefetchClinicAttendanceForAdminIfNeeded(e){return!this.isCurrentUserAdmin()||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest?Promise.resolve():this._adminAttendancePrefetchPromise&&!e?this._adminAttendancePrefetchPromise:(this._adminAttendancePrefetchPromise=(async()=>{try{await this._ensureClinicStaffLoadedForAttendance(),await this.loadClinicAttendanceData(!!e)&&(this._attendanceDataFetchedInSession=!0),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!!e),this._leaveBalancesFetchedInSession=!0,this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}catch{}})().finally(()=>{this._adminAttendancePrefetchPromise=null}),this._adminAttendancePrefetchPromise)},prefetchClinicTimeOffApprovalsForAdminIfNeeded(){return this.prefetchClinicAttendanceForAdminIfNeeded(!1)},_updatePendingApprovalsBadgeFromLocal_(){const e=document.getElementById("pending-approvals-badge");if(!e)return;const t=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],i=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],n=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],s=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],a=[...t,...i,...n,...s].filter(o=>o&&String(o.status)==="pending").length;a>0?(e.textContent=String(a),e.style.display="inline-block"):e.style.display="none"},getClinicStaffLeaveBalancesList(){return Array.isArray(AppState.appData?.clinicStaffLeaveBalances)?AppState.appData.clinicStaffLeaveBalances:[]},_getLeaveBalancePeriodDefaults(){const e=this._getTodayLocalKey();return this.state=this.state||{},this.state.leaveBalanceMonth||(this.state.leaveBalanceMonth=e.substring(0,7)),this.state.leaveBalanceYear||(this.state.leaveBalanceYear=e.substring(0,4)),{month:this.state.leaveBalanceMonth,year:this.state.leaveBalanceYear}},_scheduleLeaveBalancesLoadIfNeeded(e){this.canAccessAttendanceTab()&&(this._leaveBalancesLoadPromise&&!e||!e&&this._leaveBalancesFetchedInSession||(this._leaveBalancesLoadPromise=this.loadClinicStaffLeaveBalances(!!e).then(()=>{this._leaveBalancesFetchedInSession=!0,this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._leaveBalancesLoadPromise=null})))},_isLeaveBalancesLoading(){return!!this._leaveBalancesLoadPromise},async loadClinicStaffLeaveBalances(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const t=this._getLeaveBalancePeriodDefaults(),i=this.canViewAllAttendanceData();try{i&&await this._ensureClinicStaffLoadedForAttendance();const[n,s]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffLeaveBalances",data:{month:t.month,year:t.year,skipCache:!!e}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:e?{skipCache:!0}:{}})]);if(s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data),n?.success&&Array.isArray(n.data)?(AppState.appData.clinicStaffLeaveBalances=this._enrichLeaveBalancesFromLocal_(n.data,t),n.meta&&(this.state.leaveBalanceMonth=n.meta.month||t.month,this.state.leaveBalanceYear=n.meta.year||t.year)):i&&(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t)),AppState.appData.clinicStaffLeaveBalances&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}return!!(n?.success||i&&(AppState.appData.clinicStaffLeaveBalances||[]).length)}catch{return i?(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t),(AppState.appData.clinicStaffLeaveBalances||[]).length>0):!1}},_buildLeaveBalancePeriodFromItems_(e,t,i,n,s){const a=i.filter(c=>String(c.requestType).toLowerCase()==="leave").reduce((c,p)=>c+this._countLeaveDaysInPeriod_(p,e,t),0),o=i.filter(c=>String(c.requestType).toLowerCase()==="permission").length,l=n??0,r=s??0;return{periodType:e,periodKey:t,leaveEntitled:l,leaveConsumed:Math.round(a*100)/100,leaveRemaining:Math.max(0,Math.round((l-a)*100)/100),permissionEntitled:r,permissionConsumed:o,permissionRemaining:Math.max(0,r-o),approvedItems:i}},_buildLeaveBalancesFromStaffAndRequests_(e){const t=e?.month||"",i=e?.year||"",n=this.getClinicStaffLeaveBalancesList(),s=new Map(n.map(a=>[String(a.staffId),a]));return(this.getClinicStaffList()||[]).map(a=>{const o={id:a.id,staffId:a.id,userId:a.userId,userEmail:a.userEmail},l=s.get(String(a.id))||{},r=this._collectLocalApprovedTimeOffItems(o,"month",t),c=this._collectLocalApprovedTimeOffItems(o,"year",i);return{staffId:a.id,userId:a.userId||"",userName:a.userName||"",userEmail:a.userEmail||"",staffRole:a.staffRole||"",isActive:a.isActive,month:this._buildLeaveBalancePeriodFromItems_("month",t,r,l.month?.leaveEntitled,l.month?.permissionEntitled),year:this._buildLeaveBalancePeriodFromItems_("year",i,c,l.year?.leaveEntitled,l.year?.permissionEntitled)}})},_collectAllApprovedTimeOffForMonth_(e,t){const i=[],n=new Set,s=(a,o,l)=>{const r=String(a?.id||`${o}_${a?.dateFrom}_${a?.requestType}`).trim();r&&n.has(r)||(r&&n.add(r),i.push({...a,userName:o||a.userName||"\u2014",staffRole:l||a.staffRole}))};if((t||[]).forEach(a=>{(a.month?.approvedItems||[]).forEach(o=>{s(o,a.userName,a.staffRole)})}),this.canViewAllAttendanceData()){const a=new Map((this.getClinicStaffList()||[]).map(o=>[String(o.id),o]));this.getClinicStaffTimeOffRequestsList().forEach(o=>{if(!this._isTimeOffApprovedStatus(o.status)||!this._requestOverlapsPeriod(o,"month",e))return;const l=a.get(String(o.staffId))||{};s(o,o.userName||l.userName,l.staffRole)})}return i.sort((a,o)=>new Date(o.reviewedAt||o.requestedAt||o.createdAt)-new Date(a.reviewedAt||a.requestedAt||a.createdAt))},_isTimeOffApprovedStatus(e){const t=String(e||"").trim().toLowerCase();return t==="approved"||t==="\u0645\u0639\u062A\u0645\u062F"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627"},_timeOffRequestMatchesStaffRow(e,t){if(!e||!t)return!1;if(t.staffId&&e.staffId&&String(t.staffId)===String(e.staffId)||t.id&&e.staffId&&String(t.id)===String(e.staffId))return!0;const i=String(t.userId||"").trim(),n=String(t.userEmail||"").trim().toLowerCase();return!!(i&&String(e.userId||"").trim()===i||n&&String(e.userEmail||"").trim().toLowerCase()===n)},_dateKeyInPeriod(e,t,i){const n=this._attendanceDayKey(e);return!n||!i?!1:t==="year"?n.substring(0,4)===String(i):n.substring(0,7)===String(i)},_requestOverlapsPeriod(e,t,i){if(!e||!i)return!1;const n=this._attendanceDayKey(e.dateFrom),s=this._attendanceDayKey(e.dateTo||e.dateFrom),a=n||this._attendanceDayKey(e.requestedAt||e.createdAt);if(!a)return!1;if(this._dateKeyInPeriod(a,t,i)||s&&this._dateKeyInPeriod(s,t,i))return!0;try{let o=new Date(a);const l=new Date(s||a);if(Number.isNaN(o.getTime()))return!1;let r=0;for(;o<=l&&r<400;){if(this._dateKeyInPeriod(o,t,i))return!0;o.setDate(o.getDate()+1),r++}}catch{}return!1},_countLeaveDaysInPeriod_(e,t,i){const n=this._attendanceDayKey(e.dateFrom),s=this._attendanceDayKey(e.dateTo||e.dateFrom);if(!n){const a=parseFloat(e.durationDays);return!isNaN(a)&&a>0?a:0}try{let a=new Date(n);const o=new Date(s||n);if(Number.isNaN(a.getTime()))return parseFloat(e.durationDays)||0;let l=0,r=0;for(;a<=o&&r<400;)this._dateKeyInPeriod(a,t,i)&&(l+=1),a.setDate(a.getDate()+1),r++;return l||parseFloat(e.durationDays)||0}catch{return parseFloat(e.durationDays)||0}},_collectLocalApprovedTimeOffItems(e,t,i){return(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[]).filter(s=>!this._isTimeOffApprovedStatus(s.status)||!this._timeOffRequestMatchesStaffRow(s,e)?!1:this._requestOverlapsPeriod(s,t,i))},_enrichLeaveBalancesFromLocal_(e,t){const i=t?.month||"",n=t?.year||"";return(e||[]).map(s=>{const a={id:s.staffId,staffId:s.staffId,userId:s.userId,userEmail:s.userEmail},o=[...Array.isArray(s.month?.approvedItems)?s.month.approvedItems:[],...this._collectLocalApprovedTimeOffItems(a,"month",i)],l=[...Array.isArray(s.year?.approvedItems)?s.year.approvedItems:[],...this._collectLocalApprovedTimeOffItems(a,"year",n)],r=h=>{const x=new Map;return h.forEach(T=>{T?.id&&x.set(String(T.id),T)}),Array.from(x.values())},c=r(o),p=r(l),f=c.filter(h=>String(h.requestType).toLowerCase()==="leave").reduce((h,x)=>h+this._countLeaveDaysInPeriod_(x,"month",i),0),d=c.filter(h=>String(h.requestType).toLowerCase()==="permission").length,m=p.filter(h=>String(h.requestType).toLowerCase()==="leave").reduce((h,x)=>h+this._countLeaveDaysInPeriod_(x,"year",n),0),u=p.filter(h=>String(h.requestType).toLowerCase()==="permission").length,g={...s.month||{}},y={...s.year||{}};return c.length&&(g.leaveConsumed=Math.max(g.leaveConsumed||0,Math.round(f*100)/100),g.permissionConsumed=Math.max(g.permissionConsumed||0,d),g.leaveRemaining=Math.max(0,Math.round(((g.leaveEntitled||0)-g.leaveConsumed)*100)/100),g.permissionRemaining=Math.max(0,(g.permissionEntitled||0)-g.permissionConsumed),g.approvedItems=c),p.length&&(y.leaveConsumed=Math.max(y.leaveConsumed||0,Math.round(m*100)/100),y.permissionConsumed=Math.max(y.permissionConsumed||0,u),y.leaveRemaining=Math.max(0,Math.round(((y.leaveEntitled||0)-y.leaveConsumed)*100)/100),y.permissionRemaining=Math.max(0,(y.permissionEntitled||0)-y.permissionConsumed),y.approvedItems=p),{...s,month:g,year:y}})},renderApprovedTimeOffRequestsSection(e,t){const i=this._collectAllApprovedTimeOffForMonth_(t,e),n=i.length?i.map(s=>`
            <tr>
                <td>${Utils.escapeHTML(s.userName||"\u2014")}</td>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(s.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(s))}</td>
                <td class="text-sm">${Utils.escapeHTML(s.reason||"\u2014")}</td>
                <td>${this.formatDate(s.reviewedAt||s.requestedAt||s.createdAt,!0)}</td>
            </tr>
        `).join(""):`<tr><td colspan="5" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0623\u0648 \u0623\u0630\u0648\u0646\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A ${Utils.escapeHTML(t||"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</td></tr>`;return`<div class="content-card mt-4" id="clinic-approved-timeoff-section">
            <div class="card-header" style="padding:12px 18px;border-bottom:1px solid #f1f5f9;">
                <h4 style="margin:0;font-size:0.92rem;font-weight:700;color:#0b2a55;"><i class="fas fa-check-circle ml-2" style="color:#059669;"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${Utils.escapeHTML(t||"")})</h4>
            </div>
            <div class="card-body" style="padding:0;">
                ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                    <thead><tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th></tr></thead>
                    <tbody>${n}</tbody>
                </table>`)}
            </div>
        </div>`},_renderBalanceTriplet(e,t,i){const n=e??0,s=t??0,a=i??0,o=n>0&&a<=0?"#dc2626":"#059669";return`<span style="font-size:0.76rem;white-space:nowrap;line-height:1.5;">
            <span style="color:#64748b;">\u0645\u0633\u062A\u062D\u0642 <strong>${n}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:#d97706;">\u0645\u0633\u062A\u0646\u0641\u0630 <strong>${s}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:${o};">\u0645\u062A\u0628\u0642\u064A <strong>${a}</strong></span>
        </span>`},renderClinicStaffLeaveBalancesSection(e){e=e||{};const t=e.balances||[],i=!!e.loading,n=e.month||"",s=e.year||"",a=this.canViewAllAttendanceData();if(!a&&!t.length&&!i)return"";const o=a?7:6,l=i&&!t.length?`<tr><td colspan="${o}" class="text-center text-gray-500 py-8"><i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0631\u0635\u062F\u0629...</td></tr>`:t.length?t.map(r=>{const c=r.month||{},p=r.year||{};return`<tr>
                    <td>${Utils.escapeHTML(r.userName||"\u2014")}</td>
                    <td>${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                    <td>${this._renderBalanceTriplet(c.leaveEntitled,c.leaveConsumed,c.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(c.permissionEntitled,c.permissionConsumed,c.permissionRemaining)}</td>
                    <td>${this._renderBalanceTriplet(p.leaveEntitled,p.leaveConsumed,p.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(p.permissionEntitled,p.permissionConsumed,p.permissionRemaining)}</td>
                    ${a?`<td><button type="button" class="btn-secondary btn-sm clinic-leave-quota-edit-btn" data-staff-id="${Utils.escapeAttr(r.staffId)}" data-staff-name="${Utils.escapeAttr(r.userName||"")}"><i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644</button></td>`:""}
                </tr>`}).join(""):`<tr><td colspan="${o}" class="text-center text-gray-500 py-6">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646</td></tr>`;return`<div class="content-card mt-4" id="clinic-leave-balances-section">
            <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#0b2a55;"><i class="fas fa-wallet ml-2" style="color:#2563eb;"></i>\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    <label style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0634\u0647\u0631</label>
                    <input type="month" id="clinic-leave-balance-month" class="form-input" style="padding:6px 10px;font-size:0.8rem;width:auto;" value="${Utils.escapeAttr(n)}">
                    <label style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0633\u0646\u0629</label>
                    <input type="number" id="clinic-leave-balance-year" class="form-input" style="padding:6px 10px;font-size:0.8rem;width:90px;" min="2020" max="2100" value="${Utils.escapeAttr(s)}">
                    <button type="button" id="clinic-leave-balance-refresh-btn" class="btn-secondary btn-sm" title="\u062A\u062D\u062F\u064A\u062B"><i class="fas fa-sync-alt${i?" fa-spin":""}"></i></button>
                </div>
            </div>
            <div class="card-body" style="padding:0;">
                <p style="padding:10px 16px;margin:0;font-size:0.76rem;color:#64748b;border-bottom:1px solid #f1f5f9;">
                    <i class="fas fa-info-circle ml-1" style="color:#0d9488;"></i>
                    \u0627\u0644\u0645\u0633\u062A\u0646\u0641\u0630 \u064A\u062D\u0633\u0628 \u0645\u0646 \u0627\u0644\u0637\u0644\u0628\u0627\u062A <strong>\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</strong> \u0641\u0642\u0637. \u062D\u062F\u0651\u062F \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0634\u0647\u0631\u064A \u0648\u0627\u0644\u0633\u0646\u0648\u064A \u0644\u0643\u0644 \u0645\u0633\u0626\u0648\u0644 \u0639\u0628\u0631 \xAB\u062A\u0639\u062F\u064A\u0644\xBB.
                </p>
                ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                    <thead><tr>
                        <th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th><th>\u0627\u0644\u062F\u0648\u0631</th>
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(n)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(n)})</th>
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(s)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(s)})</th>
                        ${a?"<th>\u0625\u062C\u0631\u0627\u0621</th>":""}
                    </tr></thead>
                    <tbody>${l}</tbody>
                </table>`)}
            </div>
        </div>`},_isClinicRpcActionMissing_(e){const t=String(e||"");return/غير معترف|ACTION_NOT_RECOGNIZED|Action not recognized|الإجراء غير معروف/i.test(t)},async upsertClinicStaffLeaveQuotaOnServer_(e){if(!e?.staffId)return{success:!1,message:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0637\u0644\u0648\u0628"};try{return await GoogleIntegration.sendRequest({action:"upsertClinicStaffLeaveQuota",data:e})}catch(t){if(!this._isClinicRpcActionMissing_(t?.message))throw t;return this._upsertClinicStaffLeaveQuotaViaSheet_(e)}},async _upsertClinicStaffLeaveQuotaViaSheet_(e){if(!this.isCurrentUserAdmin())return{success:!1,message:"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"};const t="ClinicStaffLeaveQuota",i=String(e.periodType||"month").trim().toLowerCase(),n=String(e.periodKey||"").trim();if(!n)return{success:!1,message:"\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629"};await this._ensureClinicStaffLoadedForAttendance();const s=(AppState.appData.clinicStaff||[]).find(u=>u&&String(u.id)===String(e.staffId));if(!s)return{success:!1,message:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"};let a=parseFloat(e.leaveDaysQuota);(isNaN(a)||a<0)&&(a=0);let o=parseInt(e.permissionCountQuota,10);(isNaN(o)||o<0)&&(o=0),typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t);const l=await GoogleIntegration.readFromSheets(t,3e4),r=Array.isArray(l)?[...l]:[],c=r.findIndex(u=>u&&String(u.staffId)===String(e.staffId)&&String(u.periodType)===i&&String(u.periodKey)===n),p=AppState.currentUser||{},f=new Date().toISOString(),d={staffId:s.id,userId:s.userId||"",userEmail:s.userEmail||"",userName:s.userName||"",periodType:i,periodKey:n,leaveDaysQuota:a,permissionCountQuota:o,notes:String(e.notes||"").trim(),updatedById:p.id||p.userId||"",updatedByName:p.name||"",updatedAt:f};let m;return c>=0?(d.id=r[c].id,d.createdAt=r[c].createdAt||f,Object.assign(r[c],d),m=await GoogleIntegration.saveToSheets(t,r)):(d.id=typeof Utils<"u"&&Utils.generateSequentialId?Utils.generateSequentialId("CLQ",r):`CLQ-${Date.now()}`,d.createdAt=f,m=await GoogleIntegration.saveToSheets(t,[...r,d]),m?.success||(m=await GoogleIntegration.appendToSheets(t,d))),m?.success&&typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t),m?.success?{success:!0,data:c>=0?r[c]:d,message:"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"}:m||{success:!1,message:"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F"}},showClinicStaffLeaveQuotaModal(e,t){if(!this.isCurrentUserAdmin()||!e)return;const n=this.getClinicStaffLeaveBalancesList().find(h=>String(h.staffId)===String(e))||{},s=this._getLeaveBalancePeriodDefaults(),a=n.month||{},o=n.year||{},l=document.getElementById("clinic-leave-quota-modal");l&&l.remove();const r=document.createElement("div");r.id="clinic-leave-quota-modal",r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width:520px;">
                <div class="modal-header">
                    <h3 class="modal-title"><i class="fas fa-wallet ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0631\u0635\u064A\u062F \u2014 ${Utils.escapeHTML(t||"")}</h3>
                    <button type="button" class="modal-close" id="clinic-leave-quota-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-3">
                    <div>
                        <label class="block text-sm font-semibold mb-1">\u0646\u0648\u0639 \u0627\u0644\u0641\u062A\u0631\u0629 *</label>
                        <select id="clinic-leave-quota-period-type" class="form-input">
                            <option value="month">\u0634\u0647\u0631\u064A</option>
                            <option value="year">\u0633\u0646\u0648\u064A</option>
                        </select>
                    </div>
                    <div id="clinic-leave-quota-month-wrap">
                        <label class="block text-sm font-semibold mb-1">\u0627\u0644\u0634\u0647\u0631 *</label>
                        <input type="month" id="clinic-leave-quota-month" class="form-input" value="${Utils.escapeAttr(s.month)}">
                    </div>
                    <div id="clinic-leave-quota-year-wrap" class="hidden">
                        <label class="block text-sm font-semibold mb-1">\u0627\u0644\u0633\u0646\u0629 *</label>
                        <input type="number" id="clinic-leave-quota-year" class="form-input" min="2020" max="2100" value="${Utils.escapeAttr(s.year)}">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold mb-1">\u0631\u0635\u064A\u062F \u0627\u0644\u0625\u062C\u0627\u0632\u0629 (\u0623\u064A\u0627\u0645)</label>
                            <input type="number" id="clinic-leave-quota-days" class="form-input" min="0" step="0.5" value="${a.leaveEntitled??0}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">\u0639\u062F\u062F \u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</label>
                            <input type="number" id="clinic-leave-quota-perms" class="form-input" min="0" step="1" value="${a.permissionEntitled??0}">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <textarea id="clinic-leave-quota-notes" class="form-textarea" rows="2" placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A">${Utils.escapeHTML(a.quotaNotes||"")}</textarea>
                    </div>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0634\u0647\u0631\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${a.leaveConsumed??0}/${a.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${a.permissionConsumed??0}/${a.permissionEntitled??0}</p>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0633\u0646\u0648\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${o.leaveConsumed??0}/${o.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${o.permissionConsumed??0}/${o.permissionEntitled??0}</p>
                </div>
                <div class="modal-footer flex gap-2 justify-end">
                    <button type="button" class="btn-secondary" id="clinic-leave-quota-cancel">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="clinic-leave-quota-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F</button>
                </div>
            </div>`,document.body.appendChild(r);const c=r.querySelector("#clinic-leave-quota-period-type"),p=r.querySelector("#clinic-leave-quota-month-wrap"),f=r.querySelector("#clinic-leave-quota-year-wrap"),d=r.querySelector("#clinic-leave-quota-days"),m=r.querySelector("#clinic-leave-quota-perms"),u=r.querySelector("#clinic-leave-quota-notes"),g=()=>{const h=c.value==="year";p.classList.toggle("hidden",h),f.classList.toggle("hidden",!h);const x=h?o:a;d.value=x.leaveEntitled??0,m.value=x.permissionEntitled??0,u.value=x.quotaNotes||""};c.addEventListener("change",g),g();const y=()=>r.remove();r.querySelector("#clinic-leave-quota-close")?.addEventListener("click",y),r.querySelector("#clinic-leave-quota-cancel")?.addEventListener("click",y),r.addEventListener("click",h=>{h.target===r&&y()}),r.querySelector("#clinic-leave-quota-save")?.addEventListener("click",async()=>{const h=c.value,x=h==="year"?String(r.querySelector("#clinic-leave-quota-year")?.value||"").trim():String(r.querySelector("#clinic-leave-quota-month")?.value||"").trim();if(!x){Notification?.error?.("\u062D\u062F\u062F \u0627\u0644\u0634\u0647\u0631 \u0623\u0648 \u0627\u0644\u0633\u0646\u0629");return}Loading.show();try{const T=await this.upsertClinicStaffLeaveQuotaOnServer_({staffId:e,periodType:h,periodKey:x,leaveDaysQuota:d.value,permissionCountQuota:m.value,notes:u.value?.trim()||""});if(T?.success)this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0,Loading.hide(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"),y(),this.renderAttendanceTab({force:!0});else throw new Error(T?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(T){Loading.hide(),Notification?.error?.(T?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F")}})},bindClinicStaffLeaveBalanceEvents(e){if(!e)return;const t=()=>{const i=e.querySelector("#clinic-leave-balance-month")?.value||"",n=e.querySelector("#clinic-leave-balance-year")?.value||"";this.state.leaveBalanceMonth=i||this._getLeaveBalancePeriodDefaults().month,this.state.leaveBalanceYear=n||this._getLeaveBalancePeriodDefaults().year,this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})};e.querySelector("#clinic-leave-balance-month")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-year")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-refresh-btn")?.addEventListener("click",()=>{this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})}),e.querySelectorAll(".clinic-leave-quota-edit-btn").forEach(i=>{i.addEventListener("click",()=>{this.showClinicStaffLeaveQuotaModal(i.dataset.staffId,i.dataset.staffName)})})},_mergeAttendanceRowsByUserDay(e){if(!Array.isArray(e)||!e.length)return[];const t=new Map,i=[],n=a=>{let o="",l=1/0;return a.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c<l&&(l=c,o=r)}),o},s=a=>{let o="",l=-1/0;return a.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c>l&&(l=c,o=r)}),o};return e.forEach(a=>{if(!a)return;const o=this._attendanceDayKey(a.date),l=String(a.staffId||a.userId||a.userEmail||"").trim().toLowerCase(),r=`${o}|${l}`;if(!t.has(r)){t.set(r,{...a,date:o||a.date}),i.push(r);return}const c=t.get(r);if(c.checkIn=n([c.checkIn,a.checkIn])||c.checkIn||a.checkIn,c.checkOut=s([c.checkOut,a.checkOut])||c.checkOut||a.checkOut,c.checkIn&&c.checkOut){const p=new Date(c.checkIn).getTime(),f=new Date(c.checkOut).getTime();!Number.isNaN(p)&&!Number.isNaN(f)&&f>p&&(c.workDuration=Math.round((f-p)/36e5*100)/100)}}),i.map(a=>t.get(a))},async notifyAdminAboutDeletionRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const i=t.data.filter(n=>this._isUsersSheetAdminRecord(n));for(const n of i)n.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:n.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${e.name||""}"`,type:"approval_request",priority:"high",link:"#clinic-approvals",data:{module:"clinic",action:"medication_deletion",medicationId:e.id}}}).catch(s=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",s)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},async notifyAdminAboutSupplyRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const i=t.data.filter(s=>this._isUsersSheetAdminRecord(s)),n={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[e.type]||e.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const s of i)s.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:s.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u062D\u062A\u064A\u0627\u062C",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 ${n}: "${e.itemName||""}"`,type:"approval_request",priority:e.priority==="urgent"?"high":"normal",link:"#clinic-approvals",data:{module:"clinic",action:"supply_request",requestId:e.id}}}).catch(a=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",a)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},getMonthlyVisitsAlertThreshold(){try{const e=AppState.companySettings?.clinicMonthlyVisitsAlertThreshold;if(e==null||e==="")return 10;const t=parseInt(e,10);return isNaN(t)||t<1?10:Math.min(1e3,t)}catch{return 10}},DEFAULT_VISIT_TYPES:["\u0637\u0648\u0627\u0631\u0626","\u0627\u0635\u0627\u0628\u0629 \u0639\u0645\u0644","\u0645\u0631\u0636","\u0641\u062D\u0635 \u062F\u0648\u0631\u064A","\u0645\u062A\u0627\u0628\u0639\u0629","\u0641\u062D\u0635 \u0645\u0627\u0642\u0628\u0644 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u062F\u0627\u0631\u062A"],DEFAULT_REASONS:["\u0635\u062F\u0627\u0639 \u0648\u0625\u0631\u0647\u0627\u0642","\u0645\u063A\u0635 \u0648\u0622\u0644\u0627\u0645 \u0628\u0627\u0644\u0628\u0637\u0646","\u0627\u0631\u062A\u0641\u0627\u0639 \u0641\u064A \u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629","\u0627\u0631\u062A\u0641\u0627\u0639 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645","\u0647\u0628\u0648\u0637 / \u062F\u0648\u062E\u0629","\u0625\u062C\u0647\u0627\u062F \u062D\u0631\u0627\u0631\u064A","\u0622\u0644\u0627\u0645 \u0641\u064A \u0627\u0644\u0639\u0636\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644","\u062C\u0631\u062D \u0633\u0637\u062D\u064A","\u062D\u0631\u0642 \u0637\u0641\u064A\u0641","\u0643\u062F\u0645\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0627\u0621","\u062D\u0633\u0627\u0633\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 / \u062D\u0643\u0629","\u0623\u0644\u0645 \u0628\u0627\u0644\u0623\u0633\u0646\u0627\u0646","\u0627\u0644\u062A\u0647\u0627\u0628 \u0628\u0627\u0644\u062D\u0644\u0642 \u0648\u0633\u0639\u0627\u0644","\u0623\u0644\u0645 \u0628\u0627\u0644\u0639\u064A\u0646 / \u062F\u062E\u0648\u0644 \u062C\u0633\u0645 \u063A\u0631\u064A\u0628","\u0641\u062D\u0635 \u0637\u0628\u064A \u062F\u0648\u0631\u064A","\u062A\u063A\u064A\u064A\u0631 \u0639\u0644\u0649 \u062C\u0631\u062D"],DEFAULT_DIAGNOSES:["\u0635\u062F\u0627\u0639 \u062A\u0648\u062A\u0631\u064A (Tension Headache)","\u0646\u0632\u0644\u0629 \u0645\u0639\u0648\u064A\u0629 \u062D\u0627\u062F\u0629 (Gastroenteritis)","\u0627\u0644\u062A\u0647\u0627\u0628 \u062D\u0627\u062F \u0628\u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u062A\u0646\u0641\u0633\u064A \u0627\u0644\u0639\u0644\u0648\u064A (URTI)","\u0627\u0631\u062A\u0641\u0627\u0639 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645 (Hypertension)","\u0627\u0646\u062E\u0641\u0627\u0636 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645 (Hypotension)","\u0625\u062C\u0647\u0627\u062F \u0639\u0636\u0644\u064A \u062D\u0627\u062F (Muscle Strain)","\u0625\u062C\u0647\u0627\u062F \u062D\u0631\u0627\u0631\u064A (Heat Exhaustion)","\u062C\u0631\u062D \u0642\u0637\u0639\u064A \u0633\u0637\u062D\u064A (Superficial Wound)","\u062D\u0631\u0642 \u0645\u0646 \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (First Degree Burn)","\u0643\u062F\u0645\u0629 \u0631\u0636\u064A\u0629 (Contusion)","\u062D\u0633\u0627\u0633\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 \u062A\u0644\u0627\u0645\u0633\u064A\u0629 (Contact Dermatitis)","\u0627\u0644\u062A\u0647\u0627\u0628 \u0644\u062B\u0629 / \u0623\u0644\u0645 \u0623\u0633\u0646\u0627\u0646 (Gingivitis / Toothache)","\u0627\u0644\u062A\u0647\u0627\u0628 \u0645\u0644\u062A\u062D\u0645\u0629 \u0627\u0644\u0639\u064A\u0646 (Conjunctivitis)","\u062D\u0645\u0648\u0636\u0629 \u0648\u0627\u0631\u062A\u062C\u0627\u0639 \u0645\u0631\u064A\u0626\u064A (GERD / Gastritis)","\u0645\u063A\u0635 \u0643\u0644\u0648\u064A \u062E\u0641\u064A\u0641 (Renal Colic)"],DEFAULT_TREATMENTS:["\u0625\u0639\u0637\u0627\u0621 \u0645\u0633\u0643\u0646 \u0648\u0645\u0644\u0627\u062D\u0638\u0629 \u0646\u0635\u0641 \u0633\u0627\u0639\u0629 \u062B\u0645 \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644","\u0631\u0627\u062D\u0629 \u0637\u0628\u064A\u0629 \u0628\u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0645\u0639 \u0633\u0648\u0627\u0626\u0644","\u0642\u064A\u0627\u0633 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u062D\u064A\u0648\u064A\u0629 \u0648\u0627\u0644\u0633\u0643\u0631 \u0648\u0627\u0644\u0636\u063A\u0637","\u062A\u0637\u0647\u064A\u0631 \u0627\u0644\u062C\u0631\u062D \u0648\u0639\u0645\u0644 \u063A\u064A\u0627\u0631 \u0645\u0639\u0642\u0645","\u0643\u0645\u0627\u062F\u0627\u062A \u0628\u0627\u0631\u062F\u0629 / \u0645\u0648\u0636\u0639\u064A\u0629","\u0635\u0631\u0641 \u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644","\u0625\u062D\u0627\u0644\u0629 \u0644\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A / \u0627\u0644\u062E\u0627\u0631\u062C\u064A","\u062A\u0648\u0635\u064A\u0629 \u0628\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629 \u0644\u064A\u0648\u0645 \u0648\u0627\u062D\u062F","\u062C\u0644\u0633\u0629 \u0627\u0633\u062A\u0646\u0634\u0627\u0642 / \u0628\u062E\u0627\u0631","\u063A\u0633\u064A\u0644 \u0627\u0644\u0639\u064A\u0646 \u0628\u0645\u062D\u0644\u0648\u0644 \u0645\u0644\u062D\u064A \u0645\u0639\u0642\u0645"],getReasonSuggestions(){const e=new Set(this.DEFAULT_REASONS||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const i=String(t.reason||"").trim();i&&i.length>1&&e.add(i)}),Array.from(e)},getDiagnosisSuggestions(){const e=new Set(this.DEFAULT_DIAGNOSES||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const i=String(t.diagnosis||"").trim();i&&i.length>1&&e.add(i)}),Array.from(e)},getTreatmentSuggestions(){const e=new Set(this.DEFAULT_TREATMENTS||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const i=String(t.treatment||"").trim();i&&i.length>1&&e.add(i)}),Array.from(e)},DEFAULT_CONTRACTOR_POSITIONS:["\u0639\u0627\u0645\u0644","\u0641\u0646\u064A \u0643\u0647\u0631\u0628\u0627\u0621","\u0641\u0646\u064A \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627","\u0644\u062D\u0627\u0645","\u0628\u0631\u0627\u062F / \u0641\u0646\u064A \u062A\u0631\u0643\u064A\u0628\u0627\u062A","\u0646\u062C\u0627\u0631 \u0645\u0633\u0644\u062D","\u062D\u062F\u0627\u062F \u0645\u0633\u0644\u062D","\u0641\u0646\u064A \u0633\u0642\u0627\u0644\u0627\u062A","\u0633\u0627\u0626\u0642 \u0645\u0639\u062F\u0627\u062A","\u0645\u0634\u0631\u0641 \u0645\u0648\u0642\u0639","\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629 (HSE Officer)","\u0645\u0647\u0646\u062F\u0633 \u0645\u0648\u0642\u0639","\u0641\u0646\u064A \u0639\u0632\u0644","\u0639\u0627\u0645\u0644 \u0646\u0638\u0627\u0641\u0629 / \u0628\u0648\u0641\u064A\u0647","\u0645\u0633\u0627\u0639\u062F \u0641\u0646\u064A"],getContractorPositionSuggestions(){const e=new Set(this.DEFAULT_CONTRACTOR_POSITIONS||[]);return(AppState.appData?.employees||[]).forEach(t=>{const i=String(t.position||"").trim();i&&e.add(i)}),(AppState.appData?.clinicVisits||[]).forEach(t=>{const i=String(t.contractorPosition||t.employeePosition||"").trim();i&&i.length>1&&e.add(i)}),(AppState.appData?.violations||[]).forEach(t=>{const i=String(t.contractorPosition||"").trim();i&&e.add(i)}),Array.from(e).sort((t,i)=>t.localeCompare(i,"ar",{sensitivity:"base"}))},getContractorWorkerSuggestions(e=null){const t=new Set,i=s=>s?this.normalizeArabicText(String(s)):"",n=e?i(e):null;return(AppState.appData?.clinicVisits||[]).forEach(s=>{if(s.personType==="contractor"||s.contractorName||s.contractorWorkerName){const a=s.contractorName||"",o=(s.contractorWorkerName||"").trim();o&&(!n||i(a).includes(n)||n.includes(i(a)))&&t.add(o)}}),(AppState.appData?.violations||[]).forEach(s=>{const a=s.contractorName||"",o=(s.contractorWorker||"").trim();o&&(!n||i(a).includes(n)||n.includes(i(a)))&&t.add(o)}),(AppState.appData?.behaviors||[]).forEach(s=>{const a=s.contractorName||"",o=(s.contractorWorker||"").trim();o&&(!n||i(a).includes(n)||n.includes(i(a)))&&t.add(o)}),(AppState.appData?.ptw||[]).forEach(s=>{const a=s.contractorName||s.contractor||"",o=s.workers||s.workerNames||[];Array.isArray(o)&&o.forEach(l=>{const r=(typeof l=="string"?l:l?.name||"").trim();r&&(!n||i(a).includes(n)||n.includes(i(a)))&&t.add(r)})}),(AppState.appData?.contractors||[]).forEach(s=>{const a=s.name||s.contractorName||"",o=s.workers||s.workerNames||[];Array.isArray(o)&&o.forEach(l=>{const r=(typeof l=="string"?l:l?.name||"").trim();r&&(!n||i(a).includes(n)||n.includes(i(a)))&&t.add(r)})}),Array.from(t).sort((s,a)=>s.localeCompare(a,"ar",{sensitivity:"base"}))},getVisitTypeOptions(){let e=AppState.companySettings?.clinicVisitTypes;if(typeof e=="string"){const t=e.trim();if(t)try{e=JSON.parse(t)}catch{e=t.split(/\n|,/).map(n=>n.trim()).filter(Boolean)}else e=[]}return(!Array.isArray(e)||e.length===0)&&AppState.appData?.clinicVisitTypes&&(e=AppState.appData.clinicVisitTypes),Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_VISIT_TYPES||[]).slice()},normalizeArabicText(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},getMonthlyVisitCountForPerson(e){try{if(!e||!e.visitDate)return 0;const t=new Date(e.visitDate);if(isNaN(t.getTime()))return 0;const i=t.getFullYear(),n=t.getMonth(),s=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),a=new Set,o=s.filter(d=>{if(!d)return!1;const m=String(d.id||"").trim();return m?a.has(m)?!1:(a.add(m),!0):!0}),l=d=>{if(!d||!d.visitDate)return!1;const m=new Date(d.visitDate);return isNaN(m.getTime())?!1:m.getFullYear()===i&&m.getMonth()===n},r=(e.personType||"employee").toString().toLowerCase();if(!(r==="contractor"||r==="external"||r.includes("\u0645\u0642\u0627\u0648\u0644")||r.includes("\u062E\u0627\u0631"))){const d=String(e.employeeCode||e.employeeNumber||"").trim();return d?o.filter(m=>{if(!l(m))return!1;const u=(m.personType||"").toString().toLowerCase();return u==="employee"||u===""||u.includes("\u0645\u0648\u0638")?String(m.employeeCode||m.employeeNumber||"").trim()===d:!1}).length:0}const p=this.normalizeArabicText(e.contractorName||e.externalName),f=this.normalizeArabicText(e.contractorWorkerName);return!p&&!f?0:o.filter(d=>{if(!l(d))return!1;const m=(d.personType||"").toString().toLowerCase();if(!(m==="contractor"||m==="external"||m.includes("\u0645\u0642\u0627\u0648\u0644")||m.includes("\u062E\u0627\u0631")))return!1;const g=this.normalizeArabicText(d.contractorName||d.externalName),y=this.normalizeArabicText(d.contractorWorkerName);return g===p&&y===f}).length}catch(t){return Utils.safeWarn("getMonthlyVisitCountForPerson:",t),0}},showVisitTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getVisitTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const i=a=>a.map((o,l)=>({id:"vt-"+Date.now()+"-"+l,text:String(o).trim()}));let n=i(e);const s=()=>{const a=document.getElementById("clinic-visit-types-list");a&&(a.innerHTML=n.map((o,l)=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-visit-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),a.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),a.querySelectorAll(".remove-visit-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");n=n.filter(r=>r.id!==l),s()})}))};t.innerHTML=`
            <div class="modal-content" style="max-width: 500px; border-radius: 15px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h2 class="modal-title"><i class="fas fa-list-ul ml-2"></i> \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</h2>
                    <button class="modal-close" style="color: white;" onclick="this.closest('.modal-overlay')?.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <p class="text-gray-600 text-sm mb-4">\u062A\u0638\u0647\u0631 \u0647\u0630\u0647 \u0627\u0644\u0628\u0646\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 "\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629" \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u0627\u0644\u062D\u0630\u0641 \u0623\u0648 \u0627\u0644\u062A\u0639\u062F\u064A\u0644.</p>
                    <div id="clinic-visit-types-list"></div>
                    <button type="button" id="clinic-visit-types-add-row" class="btn-secondary mt-2">
                        <i class="fas fa-plus ml-2"></i> \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F
                    </button>
                    <div class="flex gap-2 justify-end mt-4 pt-4 border-t">
                        <button type="button" class="btn-secondary modal-close-btn">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="clinic-visit-types-reset" class="btn-secondary">\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A</button>
                        <button type="button" id="clinic-visit-types-save" class="btn-primary">\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),s(),t.querySelector("#clinic-visit-types-add-row").addEventListener("click",()=>{n.push({id:"vt-"+Date.now()+"-"+n.length,text:""}),s()}),t.querySelector("#clinic-visit-types-reset").addEventListener("click",()=>{n=i(this.DEFAULT_VISIT_TYPES||[]),s()}),t.querySelector("#clinic-visit-types-save").addEventListener("click",async()=>{t.querySelectorAll("#clinic-visit-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())});const a=n.map(o=>o.text).filter(Boolean);if(a.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicVisitTypes=a,(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.companySettings.clinicVisitTypes=a;try{const o=AppState.currentUser||{},l={...AppState.companySettings,clinicVisitTypes:a,userData:o},r=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:l});if(!r||r.success!==!0)throw new Error(r&&r.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(o){Notification?.error?.(o?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(a=>{a.addEventListener("click",()=>t.remove())})},DEFAULT_INJURY_TYPES:["\u062C\u0631\u062D","\u0643\u0633\u0631","\u062D\u0631\u0648\u0642","\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u063A\u0629","\u0627\u0644\u062A\u0648\u0627\u0621","\u0623\u062E\u0631\u0649"],getInjuryTypeOptions(){const e=AppState.appData?.clinicInjuryTypes;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_TYPES||[]).slice()},showInjuryTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const i=a=>a.map((o,l)=>({id:"it-"+Date.now()+"-"+l,text:String(o).trim()}));let n=i(e);const s=()=>{const a=document.getElementById("clinic-injury-types-list");a&&(a.innerHTML=n.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),a.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),a.querySelectorAll(".remove-injury-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");n=n.filter(r=>r.id!==l),s()})}))};t.innerHTML=`
            <div class="modal-content" style="max-width: 500px; border-radius: 15px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white;">
                    <h2 class="modal-title"><i class="fas fa-briefcase-medical ml-2"></i> \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</h2>
                    <button class="modal-close" style="color: white;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <p class="text-gray-600 text-sm mb-4">\u062A\u0638\u0647\u0631 \u0647\u0630\u0647 \u0627\u0644\u0628\u0646\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 "\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629" \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0625\u0635\u0627\u0628\u0629 \u062C\u062F\u064A\u062F\u0629.</p>
                    <div id="clinic-injury-types-list"></div>
                    <button type="button" id="clinic-injury-types-add-row" class="btn-secondary mt-2">
                        <i class="fas fa-plus ml-2"></i> \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F
                    </button>
                    <div class="flex gap-2 justify-end mt-4 pt-4 border-t">
                        <button type="button" class="btn-secondary modal-close-btn">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="clinic-injury-types-reset" class="btn-secondary">\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A</button>
                        <button type="button" id="clinic-injury-types-save" class="btn-primary">\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),s(),t.querySelector("#clinic-injury-types-add-row").addEventListener("click",()=>{n.push({id:"it-"+Date.now()+"-"+n.length,text:""}),s()}),t.querySelector("#clinic-injury-types-reset").addEventListener("click",()=>{n=i(this.DEFAULT_INJURY_TYPES||[]),s()}),t.querySelector("#clinic-injury-types-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())});const a=n.map(o=>o.text).filter(Boolean);if(a.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryTypes=a,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(a=>{a.addEventListener("click",()=>t.remove())})},DEFAULT_INJURY_BODY_PARTS:["\u0627\u0644\u0631\u0623\u0633","\u0627\u0644\u0639\u064A\u0646","\u0627\u0644\u0648\u062C\u0647","\u0627\u0644\u0631\u0642\u0628\u0629","\u0627\u0644\u0643\u062A\u0641","\u0627\u0644\u0630\u0631\u0627\u0639","\u0627\u0644\u064A\u062F","\u0627\u0644\u0635\u062F\u0631","\u0627\u0644\u0638\u0647\u0631","\u0627\u0644\u0628\u0637\u0646","\u0627\u0644\u0633\u0627\u0642","\u0627\u0644\u0642\u062F\u0645","\u0623\u062E\u0631\u0649"],getInjuryBodyPartOptions(){const e=AppState.appData?.clinicInjuryBodyParts;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_BODY_PARTS||[]).slice()},showInjuryBodyPartsSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryBodyPartOptions(),t=document.createElement("div");t.className="modal-overlay";const i=a=>a.map((o,l)=>({id:"ib-"+Date.now()+"-"+l,text:String(o).trim()}));let n=i(e);const s=()=>{const a=document.getElementById("clinic-injury-body-parts-list");a&&(a.innerHTML=n.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-body-part" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),a.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),a.querySelectorAll(".remove-injury-body-part").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");n=n.filter(r=>r.id!==l),s()})}))};t.innerHTML=`
            <div class="modal-content" style="max-width: 520px; border-radius: 15px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); color: white;">
                    <h2 class="modal-title"><i class="fas fa-filter ml-2"></i> \u0625\u062F\u0627\u0631\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645</h2>
                    <button class="modal-close" style="color: white;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <p class="text-gray-600 text-sm mb-4">\u062A\u0638\u0647\u0631 \u0647\u0630\u0647 \u0627\u0644\u0628\u0646\u0648\u062F \u0641\u064A \u062D\u0642\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645) \u0648\u0641\u0644\u062A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A.</p>
                    <div id="clinic-injury-body-parts-list"></div>
                    <button type="button" id="clinic-injury-body-parts-add-row" class="btn-secondary mt-2">
                        <i class="fas fa-plus ml-2"></i> \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F
                    </button>
                    <div class="flex gap-2 justify-end mt-4 pt-4 border-t">
                        <button type="button" class="btn-secondary modal-close-btn">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="clinic-injury-body-parts-reset" class="btn-secondary">\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A</button>
                        <button type="button" id="clinic-injury-body-parts-save" class="btn-primary">\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),s(),t.querySelector("#clinic-injury-body-parts-add-row").addEventListener("click",()=>{n.push({id:"ib-"+Date.now()+"-"+n.length,text:""}),s()}),t.querySelector("#clinic-injury-body-parts-reset").addEventListener("click",()=>{n=i(this.DEFAULT_INJURY_BODY_PARTS||[]),s()}),t.querySelector("#clinic-injury-body-parts-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-body-parts-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=n.find(c=>c.id===l);r&&(r.text=o.value.trim())});const a=n.map(o=>o.text).filter(Boolean);if(a.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryBodyParts=a,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(a=>{a.addEventListener("click",()=>t.remove())})},async notifyAdminsAboutHighClinicVisits(e,t){try{const i=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(!i||!i.success||!Array.isArray(i.data))return;const n=i.data.filter(r=>{const c=(r.role||"").toLowerCase();return c==="admin"||c==="\u0645\u062F\u064A\u0631"}),s=this.getMonthlyVisitsAlertThreshold(),a=(e.personType||"").toString().toLowerCase()==="employee"?e.employeeName||e.employeeCode||"\u0645\u0648\u0638\u0641":e.contractorWorkerName||e.contractorName||e.externalName||"\u0645\u0642\u0627\u0648\u0644/\u0639\u0627\u0645\u0644",o="\u062A\u0646\u0628\u064A\u0647: \u062A\u0631\u062F\u062F \u0639\u0627\u0644\u064D \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",l=`\u0627\u0644\u0645\u0648\u0638\u0641/\u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${a}" \u0628\u0644\u063A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A\u0647 \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 ${t} \u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u062D\u062F ${s}).`;for(const r of n)if(r.id||r.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:r.id||r.email,title:o,message:l,type:"clinic_high_visits",priority:"high",link:"#clinic",data:{module:"clinic",action:"high_monthly_visits",personType:e.personType,monthlyCount:t,personLabel:a}}})}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631:",c)}}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",i)}},exportMedicationsToExcel(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(a=>{const o=a.quantityAdded??a.quantity??0,l=a.remainingQuantity??a.quantity??0,r=Math.max(0,o-l);return{"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":a.name||"","\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621":a.type||"",\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:a.usage||a.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621":a.purchaseDate?this.formatDate(a.purchaseDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":a.expiryDate?this.formatDate(a.expiryDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:a.status||"\u0633\u0627\u0631\u064A","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":a.daysRemaining??"",\u0627\u0644\u0643\u0645\u064A\u0629:o,\u0627\u0644\u0645\u0646\u0635\u0631\u0641:r,\u0627\u0644\u0631\u0635\u064A\u062F:l}}),i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(i,n,"Medications");const s=`Clinic_Medications_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s)},async exportMedicationsToPDF(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:i}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!i)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const n=8,s=i.internal.pageSize.getWidth(),a=i.internal.pageSize.getHeight(),o=s/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",p=AppState?.companySettings?.phone||"",f=AppState?.companySettings?.email||"",d=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",u=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(m)try{i.addImage(m,"PNG",n,y-1,15,10)}catch{}const h=n+(m?18:0);i.setFontSize(10),i.setTextColor(15,23,42),i.text(l,h,y+3),r&&(i.setFontSize(7),i.setTextColor(107,114,128),i.text(r,h,y+9));const x=[c,p,f].filter(Boolean).join(" | ");x&&(i.setFontSize(5),i.setTextColor(148,163,184),i.text(x,h,r?y+15:y+9)),i.setFontSize(12),i.setTextColor(0,56,101),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",s-n,y+3,{align:"right"}),i.setFontSize(5),i.setTextColor(148,163,184),i.text(u,s-n,y+9,{align:"right"});const T=x?r?y+21:y+15:r?y+15:y+9;i.setDrawColor(0,56,101),i.setLineWidth(.6),i.line(n,T,s-n,T),y=T+4,i.setFillColor(0,56,101),i.rect(0,y,s,8,"F"),i.setFontSize(7),i.setTextColor(255),i.text(l,n,y+5.5),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y+5.5,{align:"center"}),y+=12,i.setFontSize(14),i.setTextColor(0,56,101),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y,{align:"center"}),i.setFontSize(7),i.setTextColor(100),i.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,n,y+7),i.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,s-n,y+7,{align:"right"}),y+=11;const A=e.filter(v=>v.status==="\u0633\u0627\u0631\u064A").length,D=e.filter(v=>v.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,b=e.filter(v=>v.status==="\u0645\u0646\u062A\u0647\u064A").length,S=e.length,L=[{label:"\u0633\u0627\u0631\u064A",value:A,bg:[232,245,233],accent:[46,125,50],tc:[27,94,32]},{label:"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:D,bg:[255,243,224],accent:[245,124,0],tc:[230,81,0]},{label:"\u0645\u0646\u062A\u0647\u064A",value:b,bg:[251,233,231],accent:[211,47,47],tc:[183,28,28]},{label:"\u0625\u062C\u0645\u0627\u0644\u064A",value:S,bg:[227,242,253],accent:[21,101,192],tc:[13,71,161]}],C=(s-2*n-9)/4,I=13;L.forEach((v,U)=>{const N=n+U*(C+3);i.setFillColor(v.bg[0],v.bg[1],v.bg[2]),i.setDrawColor(220),i.setLineWidth(.3),i.roundedRect(N,y,C,I,2,2,"FD"),i.setFillColor(v.accent[0],v.accent[1],v.accent[2]),i.rect(N,y,1.5,I,"F"),i.setFontSize(6),i.setTextColor(v.accent[0],v.accent[1],v.accent[2]),i.text(v.label,N+4,y+4.5),i.setFontSize(11),i.setTextColor(v.tc[0],v.tc[1],v.tc[2]),i.text(String(v.value),N+C-4,y+I-2.5,{align:"right"})}),y+=I+9;const E={\u0633\u0627\u0631\u064A:[46,125,50],"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":[255,152,0],\u0645\u0646\u062A\u0647\u064A:[198,40,40]};i.autoTable({startY:y,head:[["#","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0623\u064A\u0627\u0645","\u0627\u0644\u0643\u0645\u064A\u0629","\u0627\u0644\u0645\u0646\u0635\u0631\u0641","\u0627\u0644\u0631\u0635\u064A\u062F"]],body:e.map((v,U)=>{const N=v.quantityAdded??v.quantity??0,$=v.remainingQuantity??v.quantity??0,R=Math.max(0,N-$);return[U+1,v.name||"",v.type||"",v.usage||v.notes||"\u2014",this.formatDate(v.purchaseDate),v.expiryDate?this.formatDate(v.expiryDate):"\u2014",{content:v.status||"\u0633\u0627\u0631\u064A",styles:{textColor:E[v.status]||[0,0,0]}},v.daysRemaining??"\u2014",N,R,$]}),styles:{font:"Amiri",fontSize:6.5,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},6:{halign:"center"},7:{halign:"center"},8:{halign:"center",cellWidth:10},9:{halign:"center",cellWidth:10},10:{halign:"center",cellWidth:10}},margin:{left:n,right:n},didDrawPage:function(v){const U=i.internal.getNumberOfPages();i.setFillColor(0,56,101),i.rect(0,0,s,6,"F"),i.setFontSize(6),i.setTextColor(255),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,4.5,{align:"center"}),i.setDrawColor(0,56,101),i.setLineWidth(.3),i.line(n,a-9,s-n,a-9),i.setFontSize(5.5),i.setTextColor(148,163,184),i.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${d}`,n,a-5),i.text(u,o,a-5,{align:"center"}),i.text(`${g} | \u0635\u0641\u062D\u0629 ${U}`,s-n,a-5,{align:"right"})}});const j=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_${new Date().toISOString().slice(0,10)}.pdf`;i.save(j),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintMedicationsPDF(e)}},_fallbackPrintMedicationsPDF(e){const i=`<table><thead><tr>
            <th>\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</th>
            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0627\u0644\u0645\u0646\u0635\u0631\u0641</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th>
        </tr></thead><tbody>${e.map(a=>{const o=a.quantityAdded??a.quantity??0,l=a.remainingQuantity??a.quantity??0,r=Math.max(0,o-l);return`<tr>
                <td>${Utils.escapeHTML(a.name||"")}</td>
                <td>${Utils.escapeHTML(a.type||"")}</td>
                <td>${Utils.escapeHTML(a.usage||a.notes||"\u2014")}</td>
                <td>${this.formatDate(a.purchaseDate)}</td>
                <td>${a.expiryDate?this.formatDate(a.expiryDate):"\u2014"}</td>
                <td>${Utils.escapeHTML(a.status||"\u0633\u0627\u0631\u064A")}</td>
                <td>${a.daysRemaining??"\u2014"}</td>
                <td class="text-center">${o}</td>
                <td class="text-center">${r}</td>
                <td class="text-center">${l}</td>
            </tr>`}).join("")}</tbody></table>`,n=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",i,!1,!0):`<html><body>${i}</body></html>`;try{const a=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(a),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(a){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}},async _createClinicPdfWithFont({orientation:e="portrait",format:t="a4",fontUrl:i,fontFamily:n}={}){const s=typeof Utils<"u"&&Utils.PdfExport?Utils.PdfExport.getJsPdfConstructor():window.jspdf?.jsPDF||window.jsPDF?.jsPDF||window.jsPDF||null;if(!s)return{success:!1};const a=[i,"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf","https://fonts.googleapis.com/css2?family=Amiri&display=swap"].filter(Boolean);try{if(!this._arabicFontBase64){let l=!1;for(const r of a)try{const c=await fetch(r,{cache:"force-cache"});if(!c.ok)continue;if(c.headers.get("content-type")?.includes("text/css")){const f=(await c.text()).match(/url\(([^)]+\.ttf)\)/);if(!f)continue;const d=await fetch(f[1],{cache:"force-cache"});if(!d.ok)continue;this._arabicFontBase64=await d.blob().then(m=>new Promise(u=>{const g=new FileReader;g.onload=()=>u(g.result.split(",")[1]),g.readAsDataURL(m)}))}else{const p=await c.blob();this._arabicFontBase64=await new Promise(f=>{const d=new FileReader;d.onload=()=>f(d.result.split(",")[1]),d.readAsDataURL(p)})}l=!0;break}catch{continue}if(!l)return{success:!1}}const o=new s(e,"mm",t);return o.addFileToVFS(n+".ttf",this._arabicFontBase64),o.addFont(n+".ttf",n,"normal"),o.setFont(n),{success:!0,doc:o}}catch(o){return Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 PDF:",o),{success:!1,error:o}}},renderSickLeaveTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]');if(!e)return;const t=this.state.filters.sickLeave||{},i=this.getFilteredSickLeaves(),n=this.getClinicDepartments(),s=i.map(o=>{const l=o.employeeName||o.personName||"",r=o.employeeDepartment||"\u2014",c=this.formatDate(o.startDate),p=this.formatDate(o.endDate),f=o.daysCount??this.calculateSickLeaveDays(o.startDate,o.endDate),d=o.treatingDoctor||"\u2014";return`
                <tr>
                    <td>${Utils.escapeHTML(l)}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${c}</td>
                    <td>${p}</td>
                    <td>${f}</td>
                    <td>${Utils.escapeHTML(d)}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-sick-leave" data-id="${Utils.escapeHTML(o.id||"")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-sick-leave" data-id="${Utils.escapeHTML(o.id||"")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join(""),a=i.length?`
                <div class="table-wrapper clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                <th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th>
                                <th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th>
                                <th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th>
                                <th class="text-center">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${s}
                        </tbody>
                    </table>
                </div>
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629 \u0645\u0633\u062C\u0644\u0629.");e.innerHTML=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="relative">
                        <input type="text" id="sick-leave-search" class="form-input pr-10" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0642\u0633\u0645" value="${Utils.escapeHTML(t.search||"")}">
                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                    </div>
                    <select id="sick-leave-department" class="form-input">
                        <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                        ${n.map(o=>`
                            <option value="${Utils.escapeHTML(o)}" ${t.department===o?"selected":""}>${Utils.escapeHTML(o)}</option>
                        `).join("")}
                    </select>
                    <input type="date" id="sick-leave-date-from" class="form-input" value="${t.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">
                    <input type="date" id="sick-leave-date-to" class="form-input" value="${t.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">
                </div>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-secondary" id="sick-leave-export-pdf-btn">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-success" id="sick-leave-export-excel-btn">
                        <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button type="button" class="btn-primary" id="sick-leave-add-btn">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            </div>
            ${a}
        `,this.applyModuleI18n(e),this.bindSickLeaveTabEvents(e),setTimeout(()=>{const o=e.querySelector(".clinic-table-wrapper");o&&this.setupTableScrollListeners(o)},100)},bindSickLeaveTabEvents(e){const t=e.querySelector("#sick-leave-search"),i=e.querySelector("#sick-leave-department"),n=e.querySelector("#sick-leave-date-from"),s=e.querySelector("#sick-leave-date-to"),a=e.querySelector("#sick-leave-add-btn"),o=e.querySelector("#sick-leave-export-pdf-btn"),l=e.querySelector("#sick-leave-export-excel-btn");t&&t.addEventListener("input",r=>{this.state.filters.sickLeave.search=r.target.value.trim(),this.renderSickLeaveTab()}),i&&i.addEventListener("change",r=>{this.state.filters.sickLeave.department=r.target.value,this.renderSickLeaveTab()}),n&&n.addEventListener("change",r=>{this.state.filters.sickLeave.dateFrom=r.target.value,this.renderSickLeaveTab()}),s&&s.addEventListener("change",r=>{this.state.filters.sickLeave.dateTo=r.target.value,this.renderSickLeaveTab()}),a?.addEventListener("click",()=>this.showSickLeaveForm()),o?.addEventListener("click",()=>this.exportSickLeaveToPDF()),l?.addEventListener("click",()=>this.exportSickLeaveToExcel()),e.querySelectorAll('[data-action="view-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.viewSickLeaveRecord(r.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.editSickLeave(r.getAttribute("data-id")))})},viewSickLeaveRecord(e){const t=this.getSickLeaves().find(p=>p.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}const i=t.employeeName||t.personName||"",n=t.employeeDepartment||"\u2014",s=this.formatDate(t.startDate),a=this.formatDate(t.endDate),o=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),l=t.treatingDoctor||"\u2014",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 740px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629</h2>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0627\u0633\u0645</span>
                            <p class="text-gray-800">${Utils.escapeHTML(i)}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</span>
                            <p class="text-gray-800">${Utils.escapeHTML(n)}</p>
                        </div>
                        ${t.employeeCode?`
                            <div>
                                <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                                <p class="text-gray-800">${Utils.escapeHTML(t.employeeCode)}</p>
                            </div>
                        `:""}
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</span>
                            <p class="text-gray-800">${Utils.escapeHTML(l)}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</span>
                            <p class="text-gray-800">${s}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</span>
                            <p class="text-gray-800">${a}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</span>
                            <p class="text-gray-800">${o}</p>
                        </div>
                    </div>
                    <div>
                        <span class="text-sm font-semibold text-gray-600">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</span>
                        <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(t.reason||"")}</p>
                    </div>
                    ${t.medicalNotes?`
                        <div>
<span class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</span>
                                <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(t.medicalNotes||"")}</p>
                        </div>
                    `:""}
                    <div class="text-sm text-gray-500 border-t pt-3">
                        ${t.createdBy?.name?`\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(t.createdBy.name)}`:""}
                        ${t.createdAt?`<span class="ml-2">\u0628\u062A\u0627\u0631\u064A\u062E ${this.formatDate(t.createdAt,!0)}</span>`:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-secondary modal-print-btn">
                        <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-primary modal-edit-btn">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(r);const c=()=>r.remove();r.querySelectorAll(".modal-close, .modal-close-btn").forEach(p=>p.addEventListener("click",c)),r.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{c(),this.showSickLeaveForm(t)}),r.querySelector(".modal-print-btn")?.addEventListener("click",()=>this.printSickLeaveRecord(t.id)),r.addEventListener("click",p=>{p.target===r&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&c()})},editSickLeave(e){const t=this.getSickLeaves().find(i=>i.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629");return}this.showSickLeaveForm(t)},printSickLeaveRecord(e){const t=this.getSickLeaves().find(c=>c.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const i=t.employeeName||t.personName||"",n=t.employeeDepartment||"\u2014",s=t.treatingDoctor||"\u2014",a=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),o=`
            <table>
                <tr><th>\u0627\u0644\u0627\u0633\u0645</th><td>${Utils.escapeHTML(i)}</td></tr>
                <tr><th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th><td>${Utils.escapeHTML(n)}</td></tr>
                ${t.employeeCode?`<tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(t.employeeCode)}</td></tr>`:""}
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th><td>${this.formatDate(t.startDate)}</td></tr>
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th><td>${this.formatDate(t.endDate)}</td></tr>
                <tr><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th><td>${a}</td></tr>
                <tr><th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th><td>${Utils.escapeHTML(s)}</td></tr>
            </table>
            <div class="section-title">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</div>
            <div class="description">${Utils.escapeHTML(t.reason||"")}</div>
            ${t.medicalNotes?`
                <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</div>
                <div class="description">${Utils.escapeHTML(t.medicalNotes||"")}</div>
            `:""}
        `,l=`SICK-LEAVE-${t.id}`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,"\u0646\u0645\u0648\u0630\u062C \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",o,!1,!0,{},t.createdAt,t.updatedAt):`<html><body>${o}</body></html>`;try{const c=new Blob([r],{type:"text/html;charset=utf-8"}),p=URL.createObjectURL(c),f=window.open(p,"_blank");f?f.onload=()=>{setTimeout(()=>{f.print(),setTimeout(()=>URL.revokeObjectURL(p),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(c){Utils.safeError("\u0641\u0634\u0644 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",c),Notification?.error?.("\u062A\u0639\u0630\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},exportSickLeaveToExcel(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(a=>({\u0627\u0644\u0627\u0633\u0645:a.employeeName||a.personName||"",\u0627\u0644\u0642\u0633\u0645:a.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629":this.formatDate(a.startDate),"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629":this.formatDate(a.endDate),"\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645":a.daysCount??this.calculateSickLeaveDays(a.startDate,a.endDate),"\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C":a.treatingDoctor||"",\u0627\u0644\u0633\u0628\u0628:a.reason||"","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629":a.medicalNotes||""})),i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(i,n,"SickLeave");const s=`Clinic_SickLeave_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s)},exportSickLeaveToPDF(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const i=`
            <table>
                <thead>
                    <tr>
                        <th>\u0627\u0644\u0627\u0633\u0645</th>
                        <th>\u0627\u0644\u0642\u0633\u0645</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th>
                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th>
                        <th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th>
                        <th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th>
                    </tr>
                </thead>
                <tbody>
                    ${e.map(a=>`
            <tr>
                <td>${Utils.escapeHTML(a.employeeName||a.personName||"")}</td>
                <td>${Utils.escapeHTML(a.employeeDepartment||"")}</td>
                <td>${this.formatDate(a.startDate)}</td>
                <td>${this.formatDate(a.endDate)}</td>
                <td>${a.daysCount??this.calculateSickLeaveDays(a.startDate,a.endDate)}</td>
                <td>${Utils.escapeHTML(a.treatingDoctor||"")}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,n=`SICK-LEAVE-REPORT-${new Date().toISOString().slice(0,10)}`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",i,!1,!0):`<html><body>${i}</body></html>`;try{const a=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(a),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(a){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},renderInjuriesTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]');if(!e)return;const t=this.state.filters.injuries||{},i=this.getInjuries(),n=this.getFilteredInjuries(),s=this.getClinicDepartments(),a=this.getInjuryTypeOptions(),o=this.getInjuryBodyPartOptions(),l=this.state.activeInjuryType==="contractors",r=i.filter(d=>String(d.personType||"employee").toLowerCase()==="employee").length,c=i.length-r,p=n.map(d=>{const m=d.contractorName||"\u2014",u=d.employeeCode||d.employeeNumber||"\u2014",g=d.employeeName||d.personName||d.contractorWorkerName||"\u2014",y=d.factoryName||d.factory||"\u2014",h=d.subLocationName||d.subLocation||"\u2014",x=d.department||d.employeeDepartment||"\u2014",T=this.formatDate(d.injuryDate,!0),A=d.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",D=Array.isArray(d.attachments)?d.attachments.length:0;return`
                <tr class="${this.getInjuryRowClass(A)}">
                    ${l?`<td>${Utils.escapeHTML(m)}</td>`:`<td>${Utils.escapeHTML(u)}</td>`}
                    <td>${Utils.escapeHTML(g)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td>${Utils.escapeHTML(h)}</td>
                    <td>${Utils.escapeHTML(x)}</td>
                    <td>${T}</td>
                    <td>${Utils.escapeHTML(d.injuryType||"")}</td>
                    <td>${Utils.escapeHTML(d.injuryBodyPart||"")}</td>
                    <td>
                        <span class="badge ${this.getInjuryStatusBadgeClass(A)}">${Utils.escapeHTML(A)}</span>
                    </td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(d.createdBy))}</td>
                    <td class="text-center">${D}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-injury" data-id="${Utils.escapeHTML(d.id||"")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-injury" data-id="${Utils.escapeHTML(d.id||"")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join(""),f=n.length?`
                <div class="table-wrapper clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table table-header-red">
                        <thead>
                            <tr>
                                <th>${l?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</th>
                                <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628</th>
                                <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                                <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629</th>
                                <th>\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</th>
                                <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</th>
                                <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u0628\u0648\u0627\u0633\u0637\u0629</th>
                                <th>\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</th>
                                <th class="text-center">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${p}
                        </tbody>
                    </table>
                </div>
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u0627\u0628\u0627\u062A \u0637\u0628\u064A\u0629 \u0645\u0633\u062C\u0644\u0629.");e.innerHTML=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button type="button" class="btn-${this.state.activeInjuryType==="employees"?"primary":"secondary"} injury-person-tab-btn" data-tab="employees">
                        \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (${r})
                    </button>
                    <button type="button" class="btn-${this.state.activeInjuryType==="contractors"?"primary":"secondary"} injury-person-tab-btn" data-tab="contractors">
                        \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (${c})
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    ${this.isCurrentUserAdmin()?`
                    <button type="button" class="btn-secondary" id="injuries-types-settings-btn" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)">
                        <i class="fas fa-list-ul ml-2"></i>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A
                    </button>
                    <button type="button" class="btn-secondary" id="injuries-body-parts-settings-btn" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)">
                        <i class="fas fa-user-injured ml-2"></i>\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645
                    </button>
                    `:""}
                    <button type="button" class="btn-secondary" id="injuries-export-pdf-btn">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-success" id="injuries-export-excel-btn">
                        <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button type="button" class="btn-primary" id="injuries-add-btn">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            </div>
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 14px -20px; width: calc(100% + 40px);">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <label class="filter-label" for="injuries-search">\u0628\u062D\u062B</label>
                        <div class="relative w-full">
                            <input type="text" id="injuries-search" class="form-input pr-10 filter-input" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629" value="${Utils.escapeHTML(t.search||"")}">
                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                        </div>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-status">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                        <select id="injuries-status" class="form-input filter-input">
                            <option value="all" ${t.status==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629" ${t.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</option>
                            <option value="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621" ${t.status==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"selected":""}>\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621</option>
                            <option value="\u0645\u063A\u0644\u0642" ${t.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-type-filter">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</label>
                        <select id="injuries-type-filter" class="form-input filter-input">
                            <option value="all" ${(t.injuryType||"all")==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                            ${a.map(d=>`
                                <option value="${Utils.escapeHTML(d)}" ${(t.injuryType||"all")===d?"selected":""}>${Utils.escapeHTML(d)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-body-part-filter">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</label>
                        <select id="injuries-body-part-filter" class="form-input filter-input">
                            <option value="all" ${(t.injuryBodyPart||"all")==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0645\u0627\u0643\u0646</option>
                            ${o.map(d=>`
                                <option value="${Utils.escapeHTML(d)}" ${(t.injuryBodyPart||"all")===d?"selected":""}>${Utils.escapeHTML(d)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-department">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</label>
                        <select id="injuries-department" class="form-input filter-input">
                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                            ${s.map(d=>`
                                <option value="${Utils.escapeHTML(d)}" ${t.department===d?"selected":""}>${Utils.escapeHTML(d)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="injuries-date-from" class="form-input filter-input" value="${t.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="injuries-date-to" class="form-input filter-input" value="${t.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">
                    </div>
                    <div class="filter-field">
                        <button type="button" id="injuries-reset-filters" class="filter-reset-btn" style="width: 100%;">
                            <i class="fas fa-undo-alt"></i>
                            \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                        </button>
                    </div>
                </div>
            </div>
            ${f}
        `,this.applyModuleI18n(e),this.bindInjuriesTabEvents(e),setTimeout(()=>{const d=e.querySelector(".clinic-table-wrapper");d&&this.setupTableScrollListeners(d)},100)},bindInjuriesTabEvents(e){const t=e.querySelector("#injuries-search"),i=e.querySelector("#injuries-type-filter"),n=e.querySelector("#injuries-body-part-filter"),s=e.querySelector("#injuries-status"),a=e.querySelector("#injuries-department"),o=e.querySelector("#injuries-date-from"),l=e.querySelector("#injuries-date-to"),r=e.querySelector("#injuries-reset-filters"),c=e.querySelector("#injuries-types-settings-btn"),p=e.querySelector("#injuries-body-parts-settings-btn"),f=e.querySelector("#injuries-add-btn"),d=e.querySelector("#injuries-export-pdf-btn"),m=e.querySelector("#injuries-export-excel-btn");if(e.querySelectorAll(".injury-person-tab-btn").forEach(u=>{u.addEventListener("click",()=>{const g=u.getAttribute("data-tab")||"employees";this.state.activeInjuryType=g,this.renderInjuriesTab()})}),t){let u=!1;const g=(y,h=null)=>{this.state.filters.injuries.search=String(y||""),this._injurySearchDebounceTimer&&clearTimeout(this._injurySearchDebounceTimer),this._injurySearchDebounceTimer=setTimeout(()=>{this.renderInjuriesTab(),requestAnimationFrame(()=>{const x=document.getElementById("injuries-search");if(!x)return;x.focus();const T=typeof h=="number"?h:x.value.length;try{x.setSelectionRange(T,T)}catch{}})},120)};t.addEventListener("compositionstart",()=>{u=!0}),t.addEventListener("compositionend",y=>{u=!1,g(y.target.value,y.target.selectionStart)}),t.addEventListener("input",y=>{u||g(y.target.value,y.target.selectionStart)})}s&&s.addEventListener("change",u=>{this.state.filters.injuries.status=u.target.value,this.renderInjuriesTab()}),i&&i.addEventListener("change",u=>{this.state.filters.injuries.injuryType=u.target.value,this.renderInjuriesTab()}),n&&n.addEventListener("change",u=>{this.state.filters.injuries.injuryBodyPart=u.target.value,this.renderInjuriesTab()}),a&&a.addEventListener("change",u=>{this.state.filters.injuries.department=u.target.value,this.renderInjuriesTab()}),o&&o.addEventListener("change",u=>{this.state.filters.injuries.dateFrom=u.target.value,this.renderInjuriesTab()}),l&&l.addEventListener("change",u=>{this.state.filters.injuries.dateTo=u.target.value,this.renderInjuriesTab()}),f?.addEventListener("click",()=>this.showInjuryForm()),c?.addEventListener("click",()=>this.showInjuryTypesSettingsModal()),p?.addEventListener("click",()=>this.showInjuryBodyPartsSettingsModal()),r?.addEventListener("click",()=>{this.state.filters.injuries={search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},this.renderInjuriesTab()}),d?.addEventListener("click",()=>this.exportInjuriesToPDF()),m?.addEventListener("click",()=>this.exportInjuriesToExcel()),e.querySelectorAll('[data-action="view-injury"]').forEach(u=>{u.addEventListener("click",()=>this.viewInjuryRecord(u.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-injury"]').forEach(u=>{u.addEventListener("click",()=>this.editInjury(u.getAttribute("data-id")))})},analyzeClinicVisitsData(){const e=AppState.appData.clinicVisits||[],t=AppState.appData.sickLeave||[],i=AppState.appData.injuries||[],n=[...e.map(r=>({type:"\u0632\u064A\u0627\u0631\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.contractorName||r.externalName||"",jobTitle:r.employeePosition||r.position||"-",location:r.employeeLocation||r.workArea||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.diagnosis||"-",date:r.visitDate||r.createdAt})),...t.map(r=>({type:"\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:r.employeePosition||"-",location:"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.reason||"-",date:r.startDate||r.createdAt})),...i.map(r=>({type:"\u0625\u0635\u0627\u0628\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:"-",location:r.injuryLocation||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.injuryType||"-",date:r.injuryDate||r.createdAt}))],s={};n.forEach(r=>{const c=r.jobTitle;s[c]||(s[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),s[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&s[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&s[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&s[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&s[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&s[c].injuries++});const a={};n.forEach(r=>{const c=r.location;a[c]||(a[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),a[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&a[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&a[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&a[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&a[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&a[c].injuries++});const o={};n.forEach(r=>{const c=r.department;o[c]||(o[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),o[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&o[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&o[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&o[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&o[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&o[c].injuries++});const l={};return n.forEach(r=>{const c=r.diagnosis;l[c]||(l[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),l[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&l[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&l[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&l[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&l[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&l[c].injuries++}),{totalRecords:n.length,totalEmployees:n.filter(r=>r.personType==="\u0645\u0648\u0638\u0641").length,totalContractors:n.filter(r=>r.personType==="\u0645\u0642\u0627\u0648\u0644").length,totalVisits:e.length,totalSickLeaves:t.length,totalInjuries:i.length,byJobTitle:Object.entries(s).sort((r,c)=>c[1].total-r[1].total),byLocation:Object.entries(a).sort((r,c)=>c[1].total-r[1].total),byDepartment:Object.entries(o).sort((r,c)=>c[1].total-r[1].total),byDiagnosis:Object.entries(l).sort((r,c)=>c[1].total-r[1].total)}},renderAnalyticsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="analytics"]');if(!e)return;const t=this.analyzeClinicVisitsData(),i=(n,s,a)=>{if(!s||s.length===0)return`
                    <div class="content-card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="${a} ml-2"></i>${n}</h3>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</p>
                        </div>
                    </div>
                `;const o=s.map(([l,r])=>`
                <tr>
                    <td class="font-semibold">${Utils.escapeHTML(l)}</td>
                    <td class="text-center font-bold text-blue-600">${r.total}</td>
                    <td class="text-center">${r.employees}</td>
                    <td class="text-center">${r.contractors}</td>
                    <td class="text-center text-green-600">${r.visits}</td>
                    <td class="text-center text-yellow-600">${r.sickLeaves}</td>
                    <td class="text-center text-red-600">${r.injuries}</td>
                </tr>
            `).join("");return`
                <div class="content-card mb-4">
                    <div class="card-header">
                        <h3 class="card-title"><i class="${a} ml-2"></i>${n}</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>${n}</th>
                                        <th class="text-center">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                                        <th class="text-center">\u0645\u0648\u0638\u0641\u064A\u0646</th>
                                        <th class="text-center">\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th>
                                        <th class="text-center">\u0632\u064A\u0627\u0631\u0627\u062A</th>
                                        <th class="text-center">\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th>
                                        <th class="text-center">\u0625\u0635\u0627\u0628\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${o}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `};e.innerHTML=`
            <div class="space-y-4">
                <!-- \u0645\u0644\u062E\u0635 \u0639\u0627\u0645 -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-users text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalRecords}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-user-tie text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0645\u0648\u0638\u0641\u064A\u0646</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalEmployees}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-hard-hat text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalContractors}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-hospital-user text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalVisits}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-notes-medical text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalSickLeaves}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                                <i class="fas fa-user-injured text-2xl"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">\u0625\u0635\u0627\u0628\u0627\u062A</p>
                                <p class="text-2xl font-bold text-gray-900">${t.totalInjuries}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 -->
                <div class="flex justify-end gap-2 mb-4">
                    <button type="button" class="btn-secondary" id="analytics-export-pdf-btn">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button type="button" class="btn-success" id="analytics-export-excel-btn">
                        <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                </div>

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                ${i("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.byJobTitle,"fas fa-briefcase")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                ${i("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644",t.byLocation,"fas fa-map-marker-alt")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                ${i("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",t.byDepartment,"fas fa-building")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 -->
                ${i("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635",t.byDiagnosis,"fas fa-stethoscope")}
            </div>
        `,this.applyModuleI18n(e),this.bindAnalyticsTabEvents(e)},bindAnalyticsTabEvents(e){const t=e.querySelector("#analytics-export-pdf-btn"),i=e.querySelector("#analytics-export-excel-btn");t?.addEventListener("click",()=>this.exportAnalyticsToPDF()),i?.addEventListener("click",()=>this.exportAnalyticsToExcel())},exportAnalyticsToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeClinicVisitsData(),t=XLSX.utils.book_new(),i=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.totalRecords],["\u0645\u0648\u0638\u0641\u064A\u0646",e.totalEmployees],["\u0645\u0642\u0627\u0648\u0644\u064A\u0646",e.totalContractors],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.totalInjuries]],n=XLSX.utils.aoa_to_sheet(i);XLSX.utils.book_append_sheet(t,n,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const s=(o,l)=>{const r=[[l,"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0648\u0638\u0641\u064A\u0646","\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0632\u064A\u0627\u0631\u0627\u062A","\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629","\u0625\u0635\u0627\u0628\u0627\u062A"]];return o.forEach(([c,p])=>{r.push([c,p.total,p.employees,p.contractors,p.visits,p.sickLeaves,p.injuries])}),XLSX.utils.aoa_to_sheet(r)};XLSX.utils.book_append_sheet(t,s(e.byJobTitle,"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"),XLSX.utils.book_append_sheet(t,s(e.byLocation,"\u0627\u0644\u0645\u0643\u0627\u0646"),"\u062D\u0633\u0628 \u0627\u0644\u0645\u0643\u0627\u0646"),XLSX.utils.book_append_sheet(t,s(e.byDepartment,"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),XLSX.utils.book_append_sheet(t,s(e.byDiagnosis,"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"),"\u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635");const a=`Clinic_Analytics_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,a),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportAnalyticsToPDF(){const e=this.analyzeClinicVisitsData(),t=(a,o)=>{if(!o||o.length===0)return"";const l=o.map(([r,c])=>`
                <tr>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td class="text-center">${c.total}</td>
                    <td class="text-center">${c.employees}</td>
                    <td class="text-center">${c.contractors}</td>
                    <td class="text-center">${c.visits}</td>
                    <td class="text-center">${c.sickLeaves}</td>
                    <td class="text-center">${c.injuries}</td>
                </tr>
            `).join("");return`
                <div class="section-title">${a}</div>
                <table>
                    <thead>
                        <tr>
                            <th>${a}</th>
                            <th class="text-center">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                            <th class="text-center">\u0645\u0648\u0638\u0641\u064A\u0646</th>
                            <th class="text-center">\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th>
                            <th class="text-center">\u0632\u064A\u0627\u0631\u0627\u062A</th>
                            <th class="text-center">\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th>
                            <th class="text-center">\u0625\u0635\u0627\u0628\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${l}
                    </tbody>
                </table>
            `},i=`
            <div class="section-title">\u0645\u0644\u062E\u0635 \u0639\u0627\u0645</div>
            <table>
                <tbody>
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</th><td>${e.totalRecords}</td></tr>
                    <tr><th>\u0645\u0648\u0638\u0641\u064A\u0646</th><td>${e.totalEmployees}</td></tr>
                    <tr><th>\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th><td>${e.totalContractors}</td></tr>
                    <tr><th>\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</th><td>${e.totalVisits}</td></tr>
                    <tr><th>\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th><td>${e.totalSickLeaves}</td></tr>
                    <tr><th>\u0625\u0635\u0627\u0628\u0627\u062A</th><td>${e.totalInjuries}</td></tr>
                </tbody>
            </table>
            
            ${t("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",e.byJobTitle)}
            ${t("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644",e.byLocation)}
            ${t("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",e.byDepartment)}
            ${t("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635",e.byDiagnosis)}
        `,n=`CLINIC-ANALYTICS-${new Date().toISOString().slice(0,10)}`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,"\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0631\u062F\u062F\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",i,!1,!0):`<html><body>${i}</body></html>`;try{const a=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(a),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(a){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}},analyzeAllClinicData(){try{this.ensureData()}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A ensureData:",f)}const e=AppState.appData?.clinicVisits||[],t=AppState.appData?.clinicMedications||[],i=AppState.appData?.sickLeave||[],n=AppState.appData?.injuries||[],s=AppState.appData?.clinicSupplyRequests||[],a={total:t.length,byStatus:{},byType:{},expired:0,expiringSoon:0,totalQuantity:0,totalDispensed:0,byLocation:{}};t.forEach(f=>{const d=f.status||"\u0633\u0627\u0631\u064A",m=f.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",u=f.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a.byStatus[d]=(a.byStatus[d]||0)+1,a.byType[m]=(a.byType[m]||0)+1,a.byLocation[u]=(a.byLocation[u]||0)+1,d==="\u0645\u0646\u062A\u0647\u064A"&&a.expired++,d==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"&&a.expiringSoon++;const g=f.remainingQuantity??f.quantity??0,y=f.quantityAdded??f.quantity??0;a.totalQuantity+=g,a.totalDispensed+=Math.max(0,y-g)});const o={total:e.length,byMonth:{},byReason:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0,\u062E\u0627\u0631\u062C\u064A:0},byDepartment:{},byLocation:{},averagePerMonth:0};e.forEach(f=>{try{const h=f.visitDate||f.createdAt;if(!h)return;const x=new Date(h);if(isNaN(x.getTime()))return;const T=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`;o.byMonth[T]=(o.byMonth[T]||0)+1}catch{}const d=f.reason||f.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byReason[d]=(o.byReason[d]||0)+1;const m=String(f.personType||"").toLowerCase().trim(),u=m==="contractor"||m==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";o.byPersonType[u]=(o.byPersonType[u]||0)+1;const g=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byDepartment[g]=(o.byDepartment[g]||0)+1;const y=f.employeeLocation||f.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byLocation[y]=(o.byLocation[y]||0)+1});const l=Object.keys(o.byMonth).length;o.averagePerMonth=l>0?(o.total/l).toFixed(1):0;const r={total:i.length,byMonth:{},byStatus:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},totalDays:0,averageDays:0};i.forEach(f=>{try{const g=f.startDate||f.createdAt;if(!g)return;const y=new Date(g);if(isNaN(y.getTime()))return;const h=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;r.byMonth[h]=(r.byMonth[h]||0)+1}catch{}const d=f.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629";r.byStatus[d]=(r.byStatus[d]||0)+1;const m=f.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";r.byPersonType[m]=(r.byPersonType[m]||0)+1;const u=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(r.byDepartment[u]=(r.byDepartment[u]||0)+1,f.startDate&&f.endDate){const g=new Date(f.startDate),y=new Date(f.endDate),h=Math.ceil((y-g)/(1e3*60*60*24))+1;r.totalDays+=h}}),r.averageDays=r.total>0?(r.totalDays/r.total).toFixed(1):0;const c={total:n.length,byMonth:{},byType:{},byLocation:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},byStatus:{}};n.forEach(f=>{try{const h=f.injuryDate||f.createdAt;if(!h)return;const x=new Date(h);if(isNaN(x.getTime()))return;const T=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`;c.byMonth[T]=(c.byMonth[T]||0)+1}catch{}const d=f.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byType[d]=(c.byType[d]||0)+1;const m=f.injuryLocation||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byLocation[m]=(c.byLocation[m]||0)+1;const u=f.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";c.byPersonType[u]=(c.byPersonType[u]||0)+1;const g=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byDepartment[g]=(c.byDepartment[g]||0)+1;const y=f.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629";c.byStatus[y]=(c.byStatus[y]||0)+1});const p={total:s.length,byStatus:{},byType:{},byPriority:{},byMonth:{},pending:0,approved:0,rejected:0,fulfilled:0};return s.forEach(f=>{try{const d=f.status||"pending";p.byStatus[d]=(p.byStatus[d]||0)+1,d==="pending"&&p.pending++,d==="approved"&&p.approved++,d==="rejected"&&p.rejected++,d==="fulfilled"&&p.fulfilled++;const m=f.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";p.byType[m]=(p.byType[m]||0)+1;const u=f.priority||"normal";p.byPriority[u]=(p.byPriority[u]||0)+1;const g=f.createdAt||f.requestDate;if(g){const y=new Date(g);if(!isNaN(y.getTime())){const h=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;p.byMonth[h]=(p.byMonth[h]||0)+1}}}catch{}}),{medications:a,visits:o,sickLeaves:r,injuries:c,supplyRequests:p,summary:{totalRecords:e.length+i.length+n.length,totalMedications:t.length,totalSupplyRequests:s.length,totalVisits:e.length,totalSickLeaves:i.length,totalInjuries:n.length}}},renderDataAnalysisTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="data-analysis"]');e&&(this.ensureChartJSLoaded().catch(()=>{}),e.innerHTML=`
        <div id="clinic-analytics-root" style="font-family:inherit;">
            <style>
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0643\u0631\u0648\u062A \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0628\u0646\u0645\u0637 \u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A) */
                #clinic-analytics-root .clinic-stat {
                    position: relative; overflow: hidden; border-radius: 14px;
                    border: 1px solid #dce7f5; background: #ffffff;
                    box-shadow: 0 6px 18px rgba(15,47,90,.06);
                    padding: 13px 14px; display: flex; align-items: center; gap: 11px;
                    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
                }
                #clinic-analytics-root .clinic-stat:hover {
                    transform: translateY(-2px); border-color: #bfdbfe;
                    box-shadow: 0 12px 26px rgba(15,47,90,.13);
                }
                #clinic-analytics-root .clinic-stat__icon {
                    flex: 0 0 auto; width: 42px; height: 42px; display: grid; place-items: center;
                    border-radius: 12px; color: #fff; font-size: 1rem;
                    box-shadow: 0 6px 14px rgba(15,47,90,.18);
                }
                #clinic-analytics-root .clinic-stat__body { flex: 1; min-width: 0; }
                #clinic-analytics-root .clinic-stat__label {
                    font-size: .7rem; font-weight: 700; color: #64748b; margin: 0 0 3px;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                #clinic-analytics-root .clinic-stat__value { font-size: 1.5rem; font-weight: 900; line-height: 1.1; margin: 0; }
                #clinic-analytics-root .clinic-stat__bar { height: 5px; margin-top: 7px; border-radius: 99px; background: #e5edf7; overflow: hidden; }
                #clinic-analytics-root .clinic-stat__bar span { display: block; height: 100%; border-radius: 99px; }
                #clinic-analytics-root .clinic-stat__pct {
                    font-size: .64rem; font-weight: 800; color: #94a3b8;
                    white-space: nowrap; align-self: flex-end; padding-bottom: 2px;
                }
                @media (max-width: 520px) {
                    #clinic-analytics-root .clinic-stat__pct { display: none; }
                }
            </style>

            <!-- \u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#0b2a55 0%,#1e40af 60%,#2563eb 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(11,42,85,0.35);position:relative;overflow:hidden;">
                <div style="display:flex;align-items:center;gap:12px;position:relative;z-index:1;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-clinic-medical" style="font-size:20px;color:#fde68a;"></i>
                    </div>
                    <div>
                        <span style="display:block;font-size:0.66rem;font-weight:800;letter-spacing:0.04em;color:#bfdbfe;">\u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u2014 HSE</span>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:900;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0632\u064A\u0627\u0631\u0627\u062A \u2022 \u0623\u062F\u0648\u064A\u0629 \u2022 \u0625\u062C\u0627\u0632\u0627\u062A \u2022 \u0625\u0635\u0627\u0628\u0627\u062A \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;position:relative;z-index:1;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((t,i)=>{const n=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],s=(this._clinicPeriod||"0")===t;return`<button class="clinic-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.15)"};color:${s?"#0b2a55":"#fff"};">${n[i]}</button>`}).join("")}
                    </div>
                    <button id="clinic-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#7c2d12;font-size:0.78rem;font-weight:800;transition:all .2s;display:flex;align-items:center;gap:5px;box-shadow:0 4px 12px rgba(0,0,0,0.18);" onmouseover="this.style.filter='brightness(1.08)'" onmouseout="this.style.filter=''">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="clinic-filter-badge" style="display:none;background:#fff;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button id="clinic-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="clinic-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u2550\u2550 -->
            <div id="clinic-filter-panel" style="display:none;background:#f8faff;border:1.5px solid #bfdbfe;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#2563eb;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#0b2a55;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="clinic-filter-count" style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="clinic-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #bfdbfe;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#eff6ff';this.style.color='#2563eb'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"clinic-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{id:"clinic-af-dept",icon:"fas fa-building",color:"#2563eb",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"clinic-af-loc",icon:"fas fa-map-marker-alt",color:"#f59e0b",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{id:"clinic-af-reason",icon:"fas fa-stethoscope",color:"#3b82f6",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}].map(t=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">
                                <i class="${t.icon}" style="color:${t.color};margin-left:4px;"></i>${t.label}
                            </label>
                            <select id="${t.id}" style="width:100%;padding:7px 10px;border:1.5px solid #bfdbfe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#bfdbfe'">>
                                <option value="">\u0627\u0644\u0643\u0644</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2550\u2550 KPI Cards \u2550\u2550 -->
            <div id="clinic-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2550\u2550 Row 1: \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 + \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0634\u0647\u0631\u064A \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-circle" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="clinic-chart-ptype"></canvas>
                        <div id="clinic-chart-ptype-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0632\u064A\u0627\u0631\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="clinic-chart-trend"></canvas>
                        <div id="clinic-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 2: \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 + \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-stethoscope" style="color:#2563eb;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-reason"></canvas>
                        <div id="clinic-chart-reason-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-dept"></canvas>
                        <div id="clinic-chart-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 3: \u0627\u0644\u0645\u0648\u0642\u0639 + \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-loc"></canvas>
                        <div id="clinic-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-notes-medical" style="color:#f97316;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-sl-status"></canvas>
                        <div id="clinic-chart-sl-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 4: \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 + \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-injured" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="clinic-chart-inj-type"></canvas>
                        <div id="clinic-chart-inj-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u0627\u0628\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-pills" style="color:#10b981;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:260px;">
                        <canvas id="clinic-chart-med-status"></canvas>
                        <div id="clinic-chart-med-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062F\u0648\u064A\u0629</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062A\u0631\u062F\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0623\u0639\u0644\u0649 8) \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-hard-hat" style="color:#0891b2;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062A\u0631\u062F\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <span id="clinic-chart-contractor-count" style="background:#ecfeff;color:#0e7490;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="padding:12px;position:relative;height:300px;">
                    <canvas id="clinic-chart-contractor"></canvas>
                    <div id="clinic-chart-contractor-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                </div>
            </div>

            <!-- \u2550\u2550 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (12 \u0634\u0647\u0631) \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-bar" style="color:#dc2626;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629: \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A vs \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A vs \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:280px;">
                    <canvas id="clinic-chart-compare"></canvas>
                    <div id="clinic-chart-compare-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550 \u062A\u062D\u0644\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u2550\u2550 -->
            <div style="margin-bottom:20px;">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-prescription-bottle-alt" style="color:#10b981;font-size:18px;"></i>
                        <span style="font-weight:800;font-size:1rem;color:#0b2a55;">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0648\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</span>
                    </div>
                    <span id="clinic-med-analysis-summary" style="font-size:0.75rem;color:#64748b;"></span>
                </div>
                <div id="clinic-med-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:14px;">
                    <div style="text-align:center;padding:12px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                    <div class="content-card" style="padding:0;overflow:hidden;">
                        <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-sort-amount-down" style="color:#10b981;"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0633\u062A\u0647\u0644\u0627\u0643\u0627\u064B (\u0643\u0645\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u2014 \u0623\u0639\u0644\u0649 10)</span>
                        </div>
                        <div style="padding:12px;position:relative;height:300px;">
                            <canvas id="clinic-chart-med-top-qty"></canvas>
                            <div id="clinic-chart-med-top-qty-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</div>
                        </div>
                    </div>
                    <div class="content-card" style="padding:0;overflow:hidden;">
                        <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-line" style="color:#059669;"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0627\u062A\u062C\u0627\u0647 \u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0634\u0647\u0631\u064A\u0627\u064B (\u0643\u0645\u064A\u0629)</span>
                        </div>
                        <div style="padding:12px;position:relative;height:300px;">
                            <canvas id="clinic-chart-med-monthly"></canvas>
                            <div id="clinic-chart-med-monthly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0634\u0647\u0631\u064A\u0629</div>
                        </div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                    <div class="content-card" style="padding:0;overflow:hidden;">
                        <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-user-tag" style="color:#3b82f6;"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0646\u0635\u0631\u0641 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</span>
                        </div>
                        <div style="padding:12px;position:relative;height:240px;">
                            <canvas id="clinic-chart-med-ptype"></canvas>
                            <div id="clinic-chart-med-ptype-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                        </div>
                    </div>
                    <div class="content-card" style="padding:0;overflow:hidden;">
                        <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-building" style="color:#6366f1;"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0646\u0635\u0631\u0641 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                        </div>
                        <div style="padding:12px;position:relative;height:240px;">
                            <canvas id="clinic-chart-med-dept"></canvas>
                            <div id="clinic-chart-med-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                        </div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                    <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-tablets" style="color:#2563eb;"></i>
                            <span style="font-weight:700;font-size:0.88rem;">\u062A\u0641\u0627\u0635\u064A\u0644 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0633\u062A\u0647\u0644\u0627\u0643\u0627\u064B (\u0623\u0639\u0644\u0649 15)</span>
                        </div>
                        <span id="clinic-med-table-count" style="background:#ecfdf5;color:#047857;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                    </div>
                    <div style="overflow-x:auto;">
                        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                            <thead>
                                <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                    <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">#</th>
                                    <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u0627\u0644\u062F\u0648\u0627\u0621</th>
                                    <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</th>
                                    <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0645\u0631\u0627\u062A \u0627\u0644\u0635\u0631\u0641</th>
                                    <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0632\u064A\u0627\u0631\u0627\u062A</th>
                                    <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0645\u062A\u0648\u0633\u0637/\u0635\u0631\u0641</th>
                                    <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u0627\u0644\u0646\u0648\u0639</th>
                                    <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0627\u0644\u0645\u062E\u0632\u0648\u0646</th>
                                    <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646</th>
                                </tr>
                            </thead>
                            <tbody id="clinic-med-top-tbody">
                                <tr><td colspan="9" style="padding:20px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="clinic-med-low-stock-alert" style="display:none;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:14px 18px;margin-bottom:16px;">
                    <div style="display:flex;align-items:flex-start;gap:10px;">
                        <i class="fas fa-exclamation-triangle" style="color:#ea580c;margin-top:2px;"></i>
                        <div>
                            <div style="font-weight:700;color:#9a3412;font-size:0.88rem;margin-bottom:6px;">\u062A\u0646\u0628\u064A\u0647: \u0623\u062F\u0648\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0648\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636</div>
                            <ul id="clinic-med-low-stock-list" style="margin:0;padding-right:18px;font-size:0.82rem;color:#7c2d12;"></ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 \u062C\u062F\u0648\u0644 \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u064A\u0646 \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-clock" style="color:#2563eb;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u064A\u0646 \u0644\u0639\u064A\u0627\u062F\u0629 (\u0623\u0639\u0644\u0649 15)</span>
                    </div>
                    <span id="clinic-top-visitors-count" style="background:#eff6ff;color:#1e40af;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">#</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u0627\u0644\u0627\u0633\u0645</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;">\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody id="clinic-top-visitors-tbody">
                            <tr><td colspan="5" style="padding:20px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`,this.applyModuleI18n(e),setTimeout(()=>{this.updateClinicAnalyticsDashboard(),this._clinicBindAnalyticsEvents()},80))},bindDataAnalysisTabEvents(e){},async updateClinicAnalyticsDashboard(){const e=document.getElementById("clinic-analytics-root");if(!e)return;try{this.ensureData()}catch{}const t=parseInt(this._clinicPeriod||"0",10),i=AppState.appData?.clinicVisits||[],n=AppState.appData?.clinicMedications||[],s=AppState.appData?.sickLeave||[],a=AppState.appData?.injuries||[],o=AppState.appData?.clinicSupplyRequests||[],l=t>0?(()=>{const w=new Date;return w.setDate(w.getDate()-t),w})():null,r=(w,H)=>l?w.filter(z=>{const W=new Date(z[H]||z.createdAt||"");return!isNaN(W.getTime())&&W>=l}):w,c=r(i,"visitDate"),p=r(s,"startDate"),f=r(a,"injuryDate");this._clinicPopulateFilters(c);const d=this._clinicApplyFilters(c),m=d.length,u=document.getElementById("clinic-filter-count");u&&(u.textContent=`${m} \u0632\u064A\u0627\u0631\u0629`);const g=d.filter(w=>String(w.personType||"").toLowerCase()!=="contractor"),y=d.filter(w=>String(w.personType||"").toLowerCase()==="contractor"),h=new Date,x=d.filter(w=>{const H=new Date(w.visitDate||w.createdAt||"");return H.getFullYear()===h.getFullYear()&&H.getMonth()===h.getMonth()}).length,T=n.filter(w=>w.status==="\u0645\u0646\u062A\u0647\u064A").length,A=n.filter(w=>w.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,D=p.filter(w=>!w.status||w.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629").length,b=new Set(d.map(w=>{const H=new Date(w.visitDate||w.createdAt||"");return isNaN(H.getTime())?null:`${H.getFullYear()}-${H.getMonth()}`}).filter(Boolean)).size,S=b>0?(m/b).toFixed(1):0,L=this.analyzeDispensedMedications_(d,n),C=document.getElementById("clinic-kpi-strip");if(C){const w=(z,W)=>W>0?Math.round(z/W*100):0,H=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",value:m,icon:"fas fa-hospital-user",color:"#1d4ed8",grad:"linear-gradient(135deg,#3b82f6,#1d4ed8)",sub:"\u0643\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",pct:100},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:g.length,icon:"fas fa-user-tie",color:"#1e40af",grad:"linear-gradient(135deg,#2563eb,#1e40af)",sub:`${w(g.length,m)}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A`,pct:w(g.length,m)},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:y.length,icon:"fas fa-hard-hat",color:"#ea580c",grad:"linear-gradient(135deg,#f59e0b,#ea580c)",sub:`${w(y.length,m)}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A`,pct:w(y.length,m)},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:p.length,icon:"fas fa-notes-medical",color:"#d97706",grad:"linear-gradient(135deg,#fbbf24,#d97706)",sub:"\u0637\u0644\u0628\u0627\u062A \u0645\u0633\u062C\u0644\u0629",pct:0},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:f.length,icon:"fas fa-user-injured",color:"#dc2626",grad:"linear-gradient(135deg,#ef4444,#b91c1c)",sub:"\u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",pct:0},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",value:T,icon:"fas fa-pills",color:"#dc2626",grad:"linear-gradient(135deg,#f87171,#b91c1c)",sub:"\u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646",pct:0},{label:"\u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:A,icon:"fas fa-exclamation",color:"#b45309",grad:"linear-gradient(135deg,#f59e0b,#b45309)",sub:"\u062E\u0644\u0627\u0644 90 \u064A\u0648\u0645",pct:0},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",value:D,icon:"fas fa-clock",color:"#4f46e5",grad:"linear-gradient(135deg,#6366f1,#4338ca)",sub:"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",pct:0},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:S,icon:"fas fa-calendar-check",color:"#4338ca",grad:"linear-gradient(135deg,#818cf8,#4338ca)",sub:b>0?`${b} \u0634\u0647\u0631`:"\u2014",pct:0}];C.innerHTML=H.map(z=>`
                <div class="clinic-stat">
                    <div class="clinic-stat__icon" style="background:${z.grad}"><i class="${z.icon}"></i></div>
                    <div class="clinic-stat__body">
                        <p class="clinic-stat__label">${z.label}</p>
                        <p class="clinic-stat__value" style="color:${z.color};">${z.value}</p>
                        ${z.pct>0?`<div class="clinic-stat__bar"><span style="width:${Math.min(z.pct,100)}%; background:${z.grad};"></span></div>`:""}
                    </div>
                    <span class="clinic-stat__pct">${z.sub}</span>
                </div>`).join("")}const I=document.getElementById("clinic-med-analysis-summary");I&&(I.textContent=L.totalDispensedQty>0?`${L.uniqueMedicines} \u062F\u0648\u0627\u0621 \u0645\u062E\u062A\u0644\u0641 \u2022 ${L.dispenseLines} \u0639\u0645\u0644\u064A\u0629 \u0635\u0631\u0641 \u2022 ${L.visitsWithMedications} \u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0627\u0621`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");const E=document.getElementById("clinic-med-kpi-strip");if(E){const w=Number(L.totalDispensedQty)||0,H=W=>w>0?Math.round(W/w*100):0,z=[{label:"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",value:L.totalDispensedQty,icon:"fas fa-prescription-bottle-alt",color:"#15803d",grad:"linear-gradient(135deg,#22c55e,#15803d)",sub:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",pct:100},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629",value:L.uniqueMedicines,icon:"fas fa-pills",color:"#1e40af",grad:"linear-gradient(135deg,#3b82f6,#1e40af)",sub:`${H(L.uniqueMedicines)}% \u0645\u0646 \u0627\u0644\u0645\u0646\u0635\u0631\u0641`,pct:H(L.uniqueMedicines)},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",value:L.visitsWithMedications,icon:"fas fa-capsules",color:"#2563eb",grad:"linear-gradient(135deg,#2563eb,#1d4ed8)",sub:"\u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631",pct:0},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u062F\u0648\u0646 \u062F\u0648\u0627\u0621",value:L.visitsWithoutMedications,icon:"fas fa-hospital",color:"#64748b",grad:"linear-gradient(135deg,#94a3b8,#64748b)",sub:"\u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631",pct:0},{label:"\u0639\u0645\u0644\u064A\u0627\u062A \u0635\u0631\u0641",value:L.dispenseLines,icon:"fas fa-hand-holding-medical",color:"#0284c7",grad:"linear-gradient(135deg,#0ea5e9,#0369a1)",sub:`${H(L.dispenseLines)}% \u0645\u0646 \u0627\u0644\u0645\u0646\u0635\u0631\u0641`,pct:H(L.dispenseLines)}];E.innerHTML=z.map(W=>`
                <div class="clinic-stat clinic-stat--med">
                    <div class="clinic-stat__icon" style="background:${W.grad}"><i class="${W.icon}"></i></div>
                    <div class="clinic-stat__body">
                        <p class="clinic-stat__label">${W.label}</p>
                        <p class="clinic-stat__value" style="color:${W.color};">${Number(W.value||0).toLocaleString("en-US")}</p>
                        ${W.pct>0?`<div class="clinic-stat__bar"><span style="width:${Math.min(W.pct,100)}%; background:${W.grad};"></span></div>`:""}
                    </div>
                    <span class="clinic-stat__pct">${W.sub}</span>
                </div>`).join("")}if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const v={};d.forEach(w=>{const H=String(w.personType||"").toLowerCase()==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";v[H]=(v[H]||0)+1}),this._cDoughnut("clinic-chart-ptype",Object.keys(v),Object.values(v),["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cTrend("clinic-chart-trend",i,"visitDate");const U=this._cGroupBy(d,w=>w.reason||w.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._cHBar("clinic-chart-reason",U.labels,U.data,"rgba(13,148,136,0.75)");const N=this._cGroupBy(d,w=>w.employeeDepartment||w.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-dept",N.labels,N.data,"rgba(99,102,241,0.75)");const $=d.filter(w=>{const H=String(w.contractorName||"").trim(),z=String(w.externalName||"").trim(),W=String(w.personType||"").trim().toLowerCase();return H||z||W==="contractor"||W==="external"}),R=this._cGroupBy($,w=>String(w.contractorName||w.externalName||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),F=document.getElementById("clinic-chart-contractor-count");F&&(F.textContent=$.length>0?`${$.length} \u0632\u064A\u0627\u0631\u0629 \u2022 ${R.labels.length} \u0645\u0642\u0627\u0648\u0644`:""),this._cHBar("clinic-chart-contractor",R.labels,R.data,"rgba(8,145,178,0.75)");const Q=this._cGroupBy(d,w=>w.employeeLocation||w.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-loc",Q.labels,Q.data,"rgba(245,158,11,0.75)");const B=this._cGroupBy(p,w=>w.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),O={\u0645\u0639\u062A\u0645\u062F\u0629:"rgba(16,185,129,0.85)",\u0645\u0631\u0641\u0648\u0636\u0629:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-sl-status",B.labels,B.data,B.labels.map(w=>O[w]||"rgba(148,163,184,0.8)"));const M=this._cGroupBy(f,w=>w.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-inj-type",M.labels,M.data,"rgba(239,68,68,0.75)");const k=this._cGroupBy(n,w=>w.status||"\u0633\u0627\u0631\u064A"),V={\u0633\u0627\u0631\u064A:"rgba(16,185,129,0.85)",\u0645\u0646\u062A\u0647\u064A:"rgba(239,68,68,0.85)","\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-med-status",k.labels,k.data,k.labels.map(w=>V[w]||"rgba(148,163,184,0.8)")),this._cCompare("clinic-chart-compare",i,s,a);const q=L.topByQuantity.slice(0,10);this._cHBar("clinic-chart-med-top-qty",q.map(w=>w.name),q.map(w=>w.totalQty),"rgba(16,185,129,0.78)");const _=L.byMonth.labels,P=L.byMonth.data;if(_.length&&P.reduce((w,H)=>w+H,0)>0){const w=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");if(w){H&&(H.style.display="none"),w.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts["clinic-chart-med-monthly"]&&this._clinicCharts["clinic-chart-med-monthly"].destroy()}catch{}this._clinicCharts["clinic-chart-med-monthly"]=new Chart(w,{type:"line",data:{labels:_,datasets:[{label:"\u0643\u0645\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",data:P,borderColor:"rgba(5,150,105,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:4,tension:.35,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}}}}})}}else{const w=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");w&&(w.style.display="none"),H&&(H.style.display="flex")}this._cDoughnut("clinic-chart-med-ptype",["\u0645\u0648\u0638\u0641","\u0645\u0642\u0627\u0648\u0644"],[L.byPersonType.\u0645\u0648\u0638\u0641||0,L.byPersonType.\u0645\u0642\u0627\u0648\u0644||0],["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cHBar("clinic-chart-med-dept",L.byDepartment.labels,L.byDepartment.data,"rgba(99,102,241,0.75)");const X=document.getElementById("clinic-med-table-count"),Y=document.getElementById("clinic-med-top-tbody"),te=L.topByQuantity.slice(0,15);X&&(X.textContent=te.length?`${te.length} \u062F\u0648\u0627\u0621`:""),Y&&(Y.innerHTML=te.length===0?'<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>':te.map((w,H)=>{const z=w.stockRemaining===null?"\u2014":Number(w.stockRemaining).toLocaleString("en-US"),W=w.stockRemaining!==null&&w.stockRemaining<=10?"#dc2626":"#0f766e",G=w.stockStatus==="\u0645\u0646\u062A\u0647\u064A"?"#dc2626":w.stockStatus==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#d97706":"#64748b",Z=H%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${Z};" onmouseover="this.style.background='#ecfdf5'" onmouseout="this.style.background='${Z}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${H+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#047857;">${Utils.escapeHTML(w.name)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;">${Number(w.totalQty).toLocaleString("en-US")}</td>
                        <td style="padding:9px 12px;text-align:center;">${w.dispenseCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${w.visitsCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${w.avgQty}</td>
                        <td style="padding:9px 12px;">${Utils.escapeHTML(w.type)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${W};">${z}</td>
                        <td style="padding:9px 12px;color:${G};">${Utils.escapeHTML(w.stockStatus)}</td>
                    </tr>`}).join(""));const ee=document.getElementById("clinic-med-low-stock-alert"),se=document.getElementById("clinic-med-low-stock-list");ee&&se&&(L.lowStockHighDemand.length>0?(ee.style.display="block",se.innerHTML=L.lowStockHighDemand.map(w=>`<li><strong>${Utils.escapeHTML(w.name)}</strong>: \u0645\u0646\u0635\u0631\u0641 ${w.totalQty} \u2014 \u0645\u062E\u0632\u0648\u0646 ${w.stockRemaining??"\u2014"}</li>`).join("")):(ee.style.display="none",se.innerHTML=""));const K={};d.forEach(w=>{const H=w.contractorWorkerName||w.employeeName||w.externalName||w.personName||w.name||"",z=String(H).trim(),W=String(w.contractorName||"").trim(),G=z||(W?W+" (\u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0639\u0627\u0645\u0644)":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");K[G]||(K[G]={count:0,dept:"",loc:""}),K[G].count++,K[G].dept||(K[G].dept=w.employeeDepartment||w.department||w.contractorName||w.contractorPosition||"\u2014"),K[G].loc||(K[G].loc=w.employeeLocation||w.workArea||w.factoryName||w.factory||"\u2014")});const ie=Object.entries(K).sort((w,H)=>H[1].count-w[1].count).slice(0,15),oe=document.getElementById("clinic-top-visitors-count"),re=document.getElementById("clinic-top-visitors-tbody");oe&&(oe.textContent=`${ie.length} \u0634\u062E\u0635`),re&&(re.innerHTML=ie.length===0?'<tr><td colspan="5" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u064A\u0627\u0631\u0627\u062A</td></tr>':ie.map(([w,H],z)=>{const W=z%2===0?"#fff":"#fafafa",G=H.count>=5?"#dc2626":H.count>=3?"#f59e0b":"#2563eb";return`<tr style="border-bottom:1px solid #f8fafc;background:${W};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${W}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${z+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${Utils.escapeHTML(w)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.dept)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.loc)}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="background:#eff6ff;color:${G};padding:3px 10px;border-radius:20px;font-weight:700;font-size:0.82rem;">${H.count} \u0632\u064A\u0627\u0631\u0629</span></td>
                    </tr>`}).join(""))},_clinicApplyFilters(e){const t=r=>{const c=document.getElementById(r);return c?c.value.trim():""},i=t("clinic-af-ptype"),n=t("clinic-af-dept"),s=t("clinic-af-loc"),a=t("clinic-af-reason"),o=[i,n,s,a].some(r=>r!==""),l=document.getElementById("clinic-filter-badge");return l&&(l.style.display=o?"inline":"none"),e.filter(r=>!(i&&(String(r.personType||"").toLowerCase()==="contractor"?"contractor":"employee")!==i||n&&String(r.employeeDepartment||r.department||"").trim()!==n||s&&String(r.employeeLocation||r.workArea||"").trim()!==s||a&&String(r.reason||r.diagnosis||"").trim()!==a))},_clinicPopulateFilters(e){const t=s=>[...new Set(e.map(s).filter(Boolean))].sort(),i=(s,a)=>{const o=document.getElementById(s);if(!o)return;const l=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+a.map(r=>`<option value="${r}"${r===l?" selected":""}>${r}</option>`).join("")},n=document.getElementById("clinic-af-ptype");if(n){const s=n.value;n.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="employee"${s==="employee"?" selected":""}>\u0645\u0648\u0638\u0641</option><option value="contractor"${s==="contractor"?" selected":""}>\u0645\u0642\u0627\u0648\u0644</option>`}i("clinic-af-dept",t(s=>String(s.employeeDepartment||s.department||"").trim())),i("clinic-af-loc",t(s=>String(s.employeeLocation||s.workArea||"").trim())),i("clinic-af-reason",t(s=>String(s.reason||s.diagnosis||"").trim()))},_cGroupBy(e,t,i=0){const n={};e.forEach(a=>{const o=t(a)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";n[o]=(n[o]||0)+1});let s=Object.entries(n).sort((a,o)=>o[1]-a[1]);return i>0&&(s=s.slice(0,i)),{labels:s.map(a=>a[0]),data:s.map(a=>a[1])}},_cDoughnut(e,t,i,n){const s=document.getElementById(e),a=document.getElementById(e+"-empty");if(!s)return;if(!i.length||i.reduce((l,r)=>l+r,0)===0){s.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),s.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}const o=i.reduce((l,r)=>l+r,0);this._clinicCharts[e]=new Chart(s,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:n,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${o>0?(l.parsed/o*100).toFixed(1):0}%)`}}}}})},_cHBar(e,t,i,n){const s=document.getElementById(e),a=document.getElementById(e+"-empty");if(s){if(!i.length||i.reduce((o,l)=>o+l,0)===0){s.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),s.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(s,{type:"bar",data:{labels:t,datasets:[{data:i,backgroundColor:n||"rgba(13,148,136,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${o.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:o=>String(t[o]).length>18?String(t[o]).slice(0,17)+"\u2026":t[o]}}}}})}},_cTrend(e,t,i){const n=document.getElementById(e),s=document.getElementById(e+"-empty");if(!n)return;const a=new Date,o=[],l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let c=11;c>=0;c--){const p=new Date(a.getFullYear(),a.getMonth()-c,1);o.push({y:p.getFullYear(),m:p.getMonth(),label:`${l[p.getMonth()]} ${p.getFullYear()}`})}const r=o.map(c=>t.filter(p=>{const f=new Date(p[i]||p.createdAt||"");return!isNaN(f.getTime())&&f.getFullYear()===c.y&&f.getMonth()===c.m}).length);if(r.reduce((c,p)=>c+p,0)===0){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(n,{type:"bar",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:r,backgroundColor:r.map(c=>c===Math.max(...r)?"rgba(13,148,136,0.9)":"rgba(13,148,136,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(99,102,241,0.9)",backgroundColor:"rgba(99,102,241,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#6366f1",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_cCompare(e,t,i,n){const s=document.getElementById(e),a=document.getElementById(e+"-empty");if(!s)return;const o=new Date,l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let u=11;u>=0;u--){const g=new Date(o.getFullYear(),o.getMonth()-u,1);r.push({y:g.getFullYear(),m:g.getMonth(),label:`${l[g.getMonth()]}`})}const c=(u,g)=>r.map(y=>u.filter(h=>{const x=new Date(h[g]||h.createdAt||"");return!isNaN(x.getTime())&&x.getFullYear()===y.y&&x.getMonth()===y.m}).length),p=c(t,"visitDate"),f=c(i,"startDate"),d=c(n,"injuryDate");if(((u,g,y)=>u.reduce((h,x,T)=>h+x+g[T]+y[T],0))(p,f,d)===0){s.style.display="none",a&&(a.style.display="flex");return}a&&(a.style.display="none"),s.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(s,{type:"bar",data:{labels:r.map(u=>u.label),datasets:[{label:"\u0632\u064A\u0627\u0631\u0627\u062A",data:p,backgroundColor:"rgba(13,148,136,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",data:f,backgroundColor:"rgba(245,158,11,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u0635\u0627\u0628\u0627\u062A",data:d,backgroundColor:"rgba(239,68,68,0.75)",borderRadius:4,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_clinicBindAnalyticsEvents(){const e=document.getElementById("clinic-analytics-root");if(!e)return;e.querySelectorAll(".clinic-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._clinicPeriod=o.getAttribute("data-period"),e.querySelectorAll(".clinic-period-btn").forEach(l=>{const r=l===o;l.style.background=r?"#fff":"rgba(255,255,255,0.15)",l.style.color=r?"#134e4a":"#fff"}),this.updateClinicAnalyticsDashboard()})});const t=document.getElementById("clinic-analytics-refresh");t&&t.addEventListener("click",()=>this.updateClinicAnalyticsDashboard());const i=document.getElementById("clinic-export-pdf-btn");i&&i.addEventListener("click",()=>this._clinicExportPDF());const n=document.getElementById("clinic-toggle-filters-btn"),s=document.getElementById("clinic-filter-panel");n&&s&&n.addEventListener("click",()=>{const o=s.style.display!=="none";s.style.display=o?"none":"block",n.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const a=document.getElementById("clinic-filter-reset-btn");a&&a.addEventListener("click",()=>{["clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&(l.value="")}),this.updateClinicAnalyticsDashboard()}),["clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&l.addEventListener("change",()=>this.updateClinicAnalyticsDashboard())})},_prepareClinicAnalysisPdfHtmlContent(e){const t=`
            <style id="clinic-analysis-pdf-export-overrides">
                .clinic-analysis-pdf-meta {
                    text-align: center;
                    color: #64748b;
                    font-size: 13px;
                    margin: 0 0 14px;
                }
                .clinic-analysis-pdf-image {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
                @media print {
                    .clinic-analysis-pdf-image {
                        width: 100% !important;
                        max-width: 100% !important;
                        height: auto !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                }
            </style>
        `;return typeof e!="string"?"":e.includes("</head>")?e.replace("</head>",t+"</head>"):t+e},async _clinicEnsureHtml2CanvasForPdf_(){return typeof html2canvas<"u"?!0:(await new Promise((e,t)=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",i.onload=()=>e(),i.onerror=()=>t(new Error("html2canvas")),document.head.appendChild(i)}),typeof html2canvas<"u")},async _clinicExportPDF(){const e=document.getElementById("clinic-analytics-root");if(!e)return;const t=document.getElementById("clinic-export-pdf-btn"),i=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await this._clinicEnsureHtml2CanvasForPdf_();const n=document.getElementById("clinic-filter-panel"),s=n&&n.style.display!=="none";s&&(n.style.display="none");const a=Math.min(3,Math.max(2.5,(window.devicePixelRatio||1)*2)),o=await html2canvas(e,{scale:a,useCORS:!0,backgroundColor:"#ffffff",scrollX:0,scrollY:-window.scrollY,logging:!1,width:e.scrollWidth,height:e.scrollHeight,windowWidth:e.scrollWidth,windowHeight:e.scrollHeight});s&&(n.style.display="");let l;try{l=o.toDataURL("image/png")}catch{l=o.toDataURL("image/jpeg",.96)}const r=typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),c=this._clinicPeriod==="month"?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":this._clinicPeriod==="quarter"?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":this._clinicPeriod==="year"?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u0643\u0644 \u0627\u0644\u0641\u062A\u0631\u0627\u062A",p=`
                <p class="clinic-analysis-pdf-meta">
                    \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: ${Utils.escapeHTML(c)} &nbsp;|&nbsp; ${Utils.escapeHTML(r)}
                </p>
                <img class="clinic-analysis-pdf-image" src="${l}" alt="Clinic Medical Analysis Dashboard">
            `,f=`CLINIC-MED-ANALYSIS-${new Date().toISOString().slice(0,10)}`,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(f,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",p,!1,!1,{source:"ClinicMedicalAnalysis",titleEn:"Clinic Medical Analysis Report",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl"><body>${p}</body></html>`,u=this._prepareClinicAnalysisPdfHtmlContent(m);if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"){const g=await FormHeader.generatePDF(u,`Clinic-Medical-Analysis-Report-${new Date().toISOString().slice(0,10)}.pdf`);g&&typeof Notification<"u"&&Notification.success?Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF..."):!g&&typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}else{const g=new Blob([u],{type:"text/html;charset=utf-8"}),y=URL.createObjectURL(g),h=window.open(y,"_blank");h?(h.onload=()=>{setTimeout(()=>{h.print(),setTimeout(()=>URL.revokeObjectURL(y),1e3)},600)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{t&&(t.disabled=!1,t.innerHTML=i)}},renderDataAnalysisCharts(){const e=this.analyzeAllClinicData();typeof Chart<"u"?this.renderChartsWithChartJS(e):this.renderChartsWithCSS(e)},renderChartsWithChartJS(e){const t=document.getElementById("medications-status-chart");if(t&&Object.keys(e.medications.byStatus).length>0){const s=Object.entries(e.medications.byStatus);new Chart(t,{type:"pie",data:{labels:s.map(([a])=>a),datasets:[{data:s.map(([,a])=>a),backgroundColor:["#10b981","#f59e0b","#ef4444","#3b82f6","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})}const i=document.getElementById("visits-month-chart");if(i&&Object.keys(e.visits.byMonth).length>0){const s=Object.entries(e.visits.byMonth).sort();new Chart(i,{type:"line",data:{labels:s.map(([a])=>a),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:s.map(([,a])=>a),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const n=document.getElementById("injuries-type-chart");if(n&&Object.keys(e.injuries.byType).length>0){const s=Object.entries(e.injuries.byType).sort((a,o)=>o[1]-a[1]).slice(0,10);new Chart(n,{type:"bar",data:{labels:s.map(([a])=>a),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",data:s.map(([,a])=>a),backgroundColor:"#ef4444"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}},renderChartsWithCSS(e){const t=document.getElementById("medications-status-chart-container");if(t&&Object.keys(e.medications.byStatus).length>0){const s=Object.entries(e.medications.byStatus),a=Math.max(...s.map(([,o])=>o),1);t.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${s.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-blue-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/a*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const i=document.getElementById("visits-month-chart-container");if(i&&Object.keys(e.visits.byMonth).length>0){const s=Object.entries(e.visits.byMonth).sort(),a=Math.max(...s.map(([,o])=>o),1);i.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${s.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-24">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-green-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/a*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const n=document.getElementById("injuries-type-chart-container");if(n&&Object.keys(e.injuries.byType).length>0){const s=Object.entries(e.injuries.byType).sort((o,l)=>l[1]-o[1]).slice(0,10),a=Math.max(...s.map(([,o])=>o),1);n.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${s.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-red-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/a*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}this.renderAllCSSCharts(e)},renderAllCSSCharts(e){[{id:"medications-type-chart",data:e.medications.byType,color:"#8b5cf6"},{id:"medications-location-chart",data:e.medications.byLocation,color:"#3b82f6"},{id:"visits-reason-chart",data:e.visits.byReason,color:"#10b981"},{id:"visits-department-chart",data:e.visits.byDepartment,color:"#3b82f6"},{id:"visits-location-chart",data:e.visits.byLocation,color:"#06b6d4"},{id:"sickleave-month-chart",data:e.sickLeaves.byMonth,color:"#f59e0b"},{id:"sickleave-status-chart",data:e.sickLeaves.byStatus,color:"#f59e0b"},{id:"sickleave-department-chart",data:e.sickLeaves.byDepartment,color:"#f59e0b"},{id:"injuries-month-chart",data:e.injuries.byMonth,color:"#ef4444"},{id:"injuries-location-chart",data:e.injuries.byLocation,color:"#ef4444"},{id:"injuries-department-chart",data:e.injuries.byDepartment,color:"#ef4444"},{id:"injuries-status-chart",data:e.injuries.byStatus,color:"#ef4444"},{id:"supply-status-chart",data:e.supplyRequests.byStatus,color:"#06b6d4"},{id:"supply-type-chart",data:e.supplyRequests.byType,color:"#06b6d4"},{id:"supply-priority-chart",data:e.supplyRequests.byPriority,color:"#06b6d4"},{id:"supply-month-chart",data:e.supplyRequests.byMonth,color:"#06b6d4"}].forEach(({id:i,data:n,color:s})=>{const a=document.getElementById(`${i}-container`);if(a&&n&&Object.keys(n).length>0){const o=Object.entries(n).sort((r,c)=>c[1]-r[1]),l=Math.max(...o.map(([,r])=>r),1);a.innerHTML=`
                    <div class="space-y-2 mt-4">
                        ${o.slice(0,10).map(([r,c])=>`
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 w-32 truncate">${Utils.escapeHTML(r)}</span>
                                <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                    <div class="${s==="#8b5cf6"?"bg-purple":s==="#10b981"?"bg-green":s==="#f59e0b"?"bg-yellow":s==="#ef4444"?"bg-red":"bg-blue"}-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${c/l*100}%">
                                        <span class="text-xs font-semibold text-white">${c}</span>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `}})},refreshDataAnalysisTab(){this.state.activeTab==="data-analysis"&&this.renderDataAnalysisTab()},exportDataAnalysisToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeAllClinicData(),t=XLSX.utils.book_new(),i=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.summary.totalRecords],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.summary.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.summary.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.summary.totalInjuries],["\u0627\u0644\u0623\u062F\u0648\u064A\u0629",e.summary.totalMedications],["\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A",e.summary.totalSupplyRequests]],n=XLSX.utils.aoa_to_sheet(i);XLSX.utils.book_append_sheet(t,n,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const s=(o,l)=>{const r=[[l,"\u0627\u0644\u0639\u062F\u062F"]];return Object.entries(o).sort((c,p)=>p[1]-c[1]).forEach(([c,p])=>{r.push([c,p])}),XLSX.utils.aoa_to_sheet(r)};Object.keys(e.medications.byStatus).length>0&&XLSX.utils.book_append_sheet(t,s(e.medications.byStatus,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0623\u062F\u0648\u064A\u0629-\u062D\u0627\u0644\u0629"),Object.keys(e.medications.byType).length>0&&XLSX.utils.book_append_sheet(t,s(e.medications.byType,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0623\u062F\u0648\u064A\u0629-\u0646\u0648\u0639"),Object.keys(e.visits.byMonth).length>0&&XLSX.utils.book_append_sheet(t,s(e.visits.byMonth,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.visits.byDepartment).length>0&&XLSX.utils.book_append_sheet(t,s(e.visits.byDepartment,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0625\u062F\u0627\u0631\u0629"),Object.keys(e.sickLeaves.byMonth).length>0&&XLSX.utils.book_append_sheet(t,s(e.sickLeaves.byMonth,"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0625\u062C\u0627\u0632\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.injuries.byType).length>0&&XLSX.utils.book_append_sheet(t,s(e.injuries.byType,"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0625\u0635\u0627\u0628\u0627\u062A-\u0646\u0648\u0639"),Object.keys(e.supplyRequests.byStatus).length>0&&XLSX.utils.book_append_sheet(t,s(e.supplyRequests.byStatus,"\u0627\u0644\u0637\u0644\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0637\u0644\u0628\u0627\u062A-\u062D\u0627\u0644\u0629");const a=`Clinic_Data_Analysis_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,a),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportDataAnalysisToPDF(){const e=this.analyzeAllClinicData(),t=(a,o)=>{if(!o||Object.keys(o).length===0)return"";const l=Object.entries(o).sort((r,c)=>c[1]-r[1]).map(([r,c])=>`
                    <tr>
                        <td>${Utils.escapeHTML(r)}</td>
                        <td class="text-center">${c}</td>
                    </tr>
                `).join("");return`
                <div class="section-title">${a}</div>
                <table>
                    <thead>
                        <tr>
                            <th>${a}</th>
                            <th class="text-center">\u0627\u0644\u0639\u062F\u062F</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${l}
                    </tbody>
                </table>
            `},i=`
            <div class="section-title">\u0645\u0644\u062E\u0635 \u0639\u0627\u0645</div>
            <table>
                <tbody>
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</th><td>${e.summary.totalRecords}</td></tr>
                    <tr><th>\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</th><td>${e.summary.totalVisits}</td></tr>
                    <tr><th>\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th><td>${e.summary.totalSickLeaves}</td></tr>
                    <tr><th>\u0625\u0635\u0627\u0628\u0627\u062A</th><td>${e.summary.totalInjuries}</td></tr>
                    <tr><th>\u0627\u0644\u0623\u062F\u0648\u064A\u0629</th><td>${e.summary.totalMedications}</td></tr>
                    <tr><th>\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</th><td>${e.summary.totalSupplyRequests}</td></tr>
                </tbody>
            </table>
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629</div>
            ${t("\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",e.medications.byStatus)}
            ${t("\u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",e.medications.byType)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A</div>
            ${t("\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",e.visits.byMonth)}
            ${t("\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",e.visits.byDepartment)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</div>
            ${t("\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",e.sickLeaves.byMonth)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</div>
            ${t("\u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",e.injuries.byType)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</div>
            ${t("\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",e.supplyRequests.byStatus)}
        `,n=`CLINIC-DATA-ANALYSIS-${new Date().toISOString().slice(0,10)}`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(n,"\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",i,!1,!0):`<html><body>${i}</body></html>`;try{const a=new Blob([s],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(a),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(a){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}},scheduleVisitsTabRender(e=!1,t=0){this._visitsRenderTimer&&(clearTimeout(this._visitsRenderTimer),this._visitsRenderTimer=null);const i=()=>{this._visitsRenderTimer=null,requestAnimationFrame(()=>{this.renderVisitsTab(e)})};this._visitsRenderTimer=setTimeout(i,Math.max(0,t))},scheduleAttendanceTabRender(e=0){this._attendanceRenderTimer&&(clearTimeout(this._attendanceRenderTimer),this._attendanceRenderTimer=null);const t=()=>{this._attendanceRenderTimer=null,requestAnimationFrame(()=>{this.renderAttendanceTab()})};this._attendanceRenderTimer=setTimeout(t,Math.max(0,e))},scheduleMedicationsTabRender(e=0){this._medicationsRenderTimer&&(clearTimeout(this._medicationsRenderTimer),this._medicationsRenderTimer=null);const t=()=>{this._medicationsRenderTimer=null,requestAnimationFrame(()=>{this.renderMedicationsTab()})};this._medicationsRenderTimer=setTimeout(t,Math.max(0,e))},async renderVisitsTab(e=!1){try{const t=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}this.ensureData(),this.ensureFilterDefaults();const i=this.shouldFetchClinicVisitsFromBackend({forceRefresh:e});this.renderVisitsTabContent(t),typeof StableLoader<"u"&&StableLoader.markPaint("clinic","visits",{count:(AppState.appData.clinicVisits||[]).length}),i&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&(typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("clinic"),this.loadVisitsDataFromBackend().then(()=>{const n=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');n&&this.state&&this.state.activeTab==="visits"&&(this.ensureData(),this.renderVisitsTabContent(n)),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 (\u0628\u062F\u0648\u0646 \u062D\u062C\u0628 \u0627\u0644\u0648\u0627\u062C\u0647\u0629)")}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",n&&n.message)}).finally(()=>{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("clinic")}))}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",t);const i=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');i&&(i.innerHTML=`
                    <div class="p-4 text-center">
                        <div class="text-red-600 mb-2">
                            <i class="fas fa-exclamation-triangle"></i>
                            \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F
                        </div>
                        <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab(true)">
                            <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                `)}},mergeClinicVisitsWithLocalOnly(e,t){const i=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(i.length===0&&n.length>0)return n.slice();const s=new Set;i.forEach(l=>{l&&l.id!=null&&String(l.id).trim()!==""&&s.add(String(l.id))});const a=[];if(n.forEach(l=>{if(!l||l.id==null||String(l.id).trim()==="")return;const r=String(l.id);if(!s.has(r)&&!i.some(p=>{if(p.personType!==l.personType||p.visitDate!==l.visitDate)return!1;if(p.personType==="employee"){const f=String(p.employeeCode||p.employeeNumber||"").trim(),d=String(l.employeeCode||l.employeeNumber||"").trim();if(f&&d&&f===d)return!0;const m=Clinic.normalizeArabicText(p.employeeName),u=Clinic.normalizeArabicText(l.employeeName);return!!m&&m===u}else{const f=Clinic.normalizeArabicText(p.contractorName||p.externalName),d=Clinic.normalizeArabicText(l.contractorName||l.externalName),m=Clinic.normalizeArabicText(p.contractorWorkerName),u=Clinic.normalizeArabicText(l.contractorWorkerName);return f===d&&m===u}})){const p=new Date(l.createdAt||l.visitDate).getTime(),f=new Date().getTime();(!isNaN(p)&&f-p<72e5||isNaN(p))&&(s.add(r),a.push(l))}}),a.length===0)return i.slice();AppState.debugMode&&a.length>0&&Utils.safeLog(`\u{1F4DD} [CLINIC] \u062F\u0645\u062C ${a.length} \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 (\u0642\u062F \u064A\u0643\u0648\u0646 \u0643\u0627\u0634 \u0642\u062F\u064A\u0645)`);const o=i.concat(a);return o.sort((l,r)=>{const c=new Date(l.visitDate||l.createdAt||0).getTime();return new Date(r.visitDate||r.createdAt||0).getTime()-c}),o},assertClinicVisitRpcResult(e){if(!e||e.success!==!0){const t=e&&e.message?e.message:"\u0644\u0645 \u064A\u064F\u0624\u0643\u062F \u0627\u0644\u062E\u0627\u062F\u0645 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629";throw new Error(t)}},applyClinicVisitIdFromServer(e,t){if(!e||!t||!t.visitId)return;const i=String(t.visitId).trim();if(!i||String(e.id)===i)return;const n=e.id;e.id=i;const s=AppState.appData.clinicVisits;if(!Array.isArray(s))return;const a=s.findIndex(o=>o&&o.id===n);a!==-1&&(s[a]={...s[a],id:i})},shouldFetchClinicVisitsFromBackend(e={}){if(e&&e.forceRefresh===!0||typeof AppState>"u"||!AppState||!AppState.appData)return!0;if(this._visitsBackendFetchOk===!0)return!1;const t=AppState.appData.clinicVisits;if(Array.isArray(t)&&t.length>0){const i=localStorage.getItem("clinic_last_sync");if(i){const n=Date.now()-parseInt(i,10),s=600*1e3;if(!isNaN(n)&&n<s)return!1}}return!0},async loadVisitsDataFromBackend(){if(this._clinicVisitsLoadPromise)return this._clinicVisitsLoadPromise;const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits.slice():[];return this._clinicVisitsLoadPromise=(async()=>{try{AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 Backend...");const t=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllClinicVisits",data:{__timeoutMs:12e4}}),12e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F");if(t&&t.success&&Array.isArray(t.data)){const i=t.data.map(o=>{if(!o||typeof o!="object")return o;o.personType||(o.contractorName||o.contractorWorkerName||o.externalName?o.personType="contractor":o.personType="employee");let l=[];if(o.medications&&(l=this.normalizeVisitMedications(o.medications),AppState.debugMode&&l.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${l.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)),(!l||l.length===0)&&o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);r&&r.length>0&&(l=r,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,r.length,"\u062F\u0648\u0627\u0621"))}if(o.medications=l&&l.length>0?l:[],o.visitDate)try{if(o.visitDate instanceof Date)isNaN(o.visitDate.getTime())?o.visitDate=null:o.visitDate=o.visitDate.toISOString();else{const r=String(o.visitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 visitDate: ${r}`),o.visitDate=null):o.visitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 visitDate:",r),o.visitDate=null}if(o.exitDate)try{if(o.exitDate instanceof Date)isNaN(o.exitDate.getTime())?o.exitDate=null:o.exitDate=o.exitDate.toISOString();else{const r=String(o.exitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 exitDate: ${r}`),o.exitDate=null):o.exitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 exitDate:",r),o.exitDate=null}if(o.createdBy){if(typeof o.createdBy=="string"){const r=o.createdBy.trim();if(r&&r!==""&&r!=="\u0627\u0644\u0646\u0638\u0627\u0645")o.createdBy=r;else if(r==="\u0627\u0644\u0646\u0638\u0627\u0645"){const c=(o.email||"").toString().trim(),p=(o.userId||"").toString().trim();if(c||p){const d=(AppState.appData.users||[]).find(m=>{const u=(m.email||"").toString().toLowerCase().trim(),g=(m.id||"").toString().trim();return c&&u===c.toLowerCase().trim()||p&&g===p});if(d){const m=(d.name||d.displayName||"").toString().trim();m&&m!=="\u0627\u0644\u0646\u0638\u0627\u0645"&&m!==""?(o.createdBy=m,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 "\u0627\u0644\u0646\u0638\u0627\u0645" \u0628\u0640 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}: ${m}`)):o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy=null}else if(typeof o.createdBy=="object"){const c=(o.createdBy.name||""||"\u0645\u0633\u062A\u062E\u062F\u0645").trim();o.createdBy=c}}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645";if(o.updatedBy){if(typeof o.updatedBy=="string")o.updatedBy=o.updatedBy.trim()||null;else if(typeof o.updatedBy=="object"){const r=o.updatedBy.name||"";o.updatedBy=(r||"\u0645\u0633\u062A\u062E\u062F\u0645").trim()}}else o.updatedBy="\u0645\u0633\u062A\u062E\u062F\u0645";return o.medications.length===0&&o.medicationsDispensedQty&&o.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${o.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. medicationsDispensed:`,o.medicationsDispensed),o});AppState.appData.clinicVisits=this.mergeClinicVisitsWithLocalOnly(i,e),AppState.appData.clinicContractorVisits=AppState.appData.clinicVisits.filter(o=>o&&o.personType==="contractor"),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),localStorage.setItem("clinic_last_sync",Date.now().toString()),this._visitsBackendFetchOk=!0;const n=AppState.appData.clinicVisits.filter(o=>{const l=this.normalizeVisitMedications(o.medications);if(l&&l.length>0)return!0;if(o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);return r&&r.length>0}return!1}),s=AppState.appData.clinicVisits,a=s.reduce((o,l)=>{const r=this.normalizeVisitMedications(l.medications);if(r&&r.length>0)return o+r.length;if(l.medicationsDispensed){const c=this.normalizeVisitMedications(l.medicationsDispensed);if(c&&c.length>0)return o+c.length}return o},0);AppState.debugMode&&(Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${i.length} \u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0628\u0639\u062F \u0627\u0644\u062F\u0645\u062C \u0645\u0639 \u0627\u0644\u0645\u062D\u0644\u064A: ${s.length}`),Utils.safeLog(`   - ${s.filter(o=>o.personType==="employee"||!o.personType).length} \u0645\u0648\u0638\u0641`),Utils.safeLog(`   - ${s.filter(o=>o.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644`),Utils.safeLog(`   - ${n.length} \u0632\u064A\u0627\u0631\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629`),Utils.safeLog(`   - \u0625\u062C\u0645\u0627\u0644\u064A ${a} \u062F\u0648\u0627\u0621 \u0645\u0646\u0635\u0631\u0641`))}}catch(t){throw AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t}})().finally(()=>{this._clinicVisitsLoadPromise=null}),this._clinicVisitsLoadPromise},refreshClinicVisitsFromServerAfterSave(){AppState.debugMode&&Utils.safeLog("\u{1F504} [CLINIC] \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638..."),this._clinicVisitsLoadPromise=null,this._visitsBackendFetchOk=!1,this.loadVisitsDataFromBackend().then(()=>{try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues(),document.dispatchEvent(new CustomEvent("clinic-data-refreshed"))}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(this.state&&(this.state.activeTab==="visits"||this.state.activeTab==="dashboard")){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="'+this.state.activeTab+'"]');if(e)try{this.ensureData(),this.state.activeTab==="visits"?this.renderVisitsTabContent(e):this.renderDashboardTab()}catch{}}}).catch(e=>{Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",e)})},renderVisitsTabContent(e){try{if(!e){Utils.safeWarn("\u26A0\uFE0F panel \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A renderVisitsTabContent");return}if(typeof AppState>"u"||!AppState.appData){Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A renderVisitsTabContent"),e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';return}let t,i;try{const b=this.getTranslations();t=b.t,i=b.isRTL}catch(b){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u062A\u0631\u062C\u0645\u0627\u062A:",b),t=S=>S,i=!0}const n=this.state&&this.state.activeVisitType?this.state.activeVisitType:"employees",s=n==="contractors",a=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},o=(a.search||"").trim(),l=o.toLowerCase(),r=(a.factory||"").trim(),c=(a.position||"").trim(),p=(a.workplace||"").trim();this.ensureData();const f=(AppState.appData.clinicVisits||[]).slice();f.sort((b,S)=>{const L=new Date(b.visitDate||b.createdAt||0).getTime();return new Date(S.visitDate||S.createdAt||0).getTime()-L});const d=f.filter(b=>{if(!b||typeof b!="object")return!1;const S=String(b.personType||"").toLowerCase().trim();return S==="employee"||S===""||!S&&!b.contractorName&&!b.externalName}),m=f.filter(b=>{if(!b||typeof b!="object")return!1;const S=String(b.personType||"").toLowerCase().trim();return S==="contractor"||S==="external"||b.contractorName||b.externalName}),u=n==="employees"?d:m,g=u.filter(b=>{if(r)try{const S=this.getVisitFactoryDisplayName(b);if(String(S||"").trim()!==r)return!1}catch{return!1}if(c){const S=s?b.contractorPosition||b.employeePosition||"":b.employeePosition||"";if(String(S||"").trim()!==c)return!1}if(p){const S=s?b.workArea||b.employeeLocation||"":b.employeeLocation||b.workArea||"";if(String(S||"").trim()!==p)return!1}if(l){const S=String(s?b.contractorName||b.employeeName||b.externalName||"":b.employeeCode||b.employeeNumber||""),L=String(s?b.contractorWorkerName||"":b.employeeName||""),C=String(s?b.contractorPosition||b.employeePosition||"":b.employeePosition||"");let I="-";try{I=this.getVisitFactoryDisplayName(b)}catch{I=b.factoryName||b.factory||"-"}const E=String(s?b.workArea||b.employeeLocation||"":b.employeeLocation||b.workArea||"");let j="-",v="";try{if(b.visitDate){let B=b.visitDate;B instanceof Date?B=B.toISOString():typeof B=="string"&&!B.includes("T")&&B.match(/^\d{4}-\d{2}-\d{2}$/)&&(B=B+"T00:00:00Z"),j=Utils.formatDateTime?Utils.formatDateTime(B):String(B)}if(b.exitDate){let B=b.exitDate;B instanceof Date?B=B.toISOString():typeof B=="string"&&!B.includes("T")&&B.match(/^\d{4}-\d{2}-\d{2}$/)&&(B=B+"T00:00:00Z"),v=Utils.formatDateTime?Utils.formatDateTime(B):String(B)}}catch{j=b.visitDate?String(b.visitDate):"-",v=b.exitDate?String(b.exitDate):""}const U=String(b.reason||""),N=String(b.diagnosis||"");let $=[];if(b.medications)try{$=this.normalizeVisitMedications(b.medications)}catch{$=[]}const R=$&&$.length>0?$.map(B=>{try{let O="";return B&&B.medicationName?O=typeof B.medicationName=="string"?B.medicationName:B.medicationName.name||String(B.medicationName)||"":B&&B.name&&(O=typeof B.name=="string"?B.name:B.name.name||String(B.name)||""),O}catch{return""}}).filter(Boolean).join(" "):"";let F="";try{b.createdBy&&(typeof b.createdBy=="object"?F=String(b.createdBy.name||"\u0645\u0633\u062A\u062E\u062F\u0645"):F=String(b.createdBy||""))}catch{F=""}if(![S,L,C,I,E,j,v,U,N,R,F].join(" ").toLowerCase().includes(l))return!1}return!0}),y=b=>{const S=s?b.contractorName||b.employeeName||b.externalName||"-":b.employeeCode||b.employeeNumber||"-",L=s?b.contractorWorkerName||"-":b.employeeName||"-",C=s?b.contractorPosition||b.employeePosition||"-":b.employeePosition||"-";let I="-";try{I=this.getVisitFactoryDisplayName(b)}catch{I=b.factoryName||b.factory||"-"}const E=s?b.workArea||b.employeeLocation||"-":b.employeeLocation||b.workArea||"-";let j="-",v=`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`;try{if(b.visitDate){let M=b.visitDate;M instanceof Date?M=M.toISOString():typeof M=="string"&&!M.includes("T")&&M.match(/^\d{4}-\d{2}-\d{2}$/)&&(M=M+"T00:00:00Z"),j=Utils.formatDateTime?Utils.formatDateTime(M):String(M)}if(b.exitDate){let M=b.exitDate;M instanceof Date?M=M.toISOString():typeof M=="string"&&!M.includes("T")&&M.match(/^\d{4}-\d{2}-\d{2}$/)&&(M=M+"T00:00:00Z"),v=Utils.formatDateTime?Utils.formatDateTime(M):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:",M),j=b.visitDate?String(b.visitDate):"-",v=b.exitDate?String(b.exitDate):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}let U="-";try{U=this.calculateTotalTime(b.visitDate,b.exitDate)}catch{U="-"}const N=b.reason||"",$=b.diagnosis||"";let R=[];if(b.medications)try{R=this.normalizeVisitMedications(b.medications),AppState.debugMode&&R.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${R.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications:",M),R=[]}if((!R||R.length===0)&&b.medicationsDispensed)try{const M=this.normalizeVisitMedications(b.medicationsDispensed);M&&M.length>0&&(R=M,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0639\u0631\u0636 \u0644\u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,R.length,"\u062F\u0648\u0627\u0621"))}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications \u0645\u0646 medicationsDispensed:",M)}(!R||R.length===0)&&b.medicationsDispensedQty&&b.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${b.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629`);const F=R&&R.length>0?R.map(M=>{try{if(!M||typeof M!="object")return null;let k="";if(M.medicationName?k=typeof M.medicationName=="string"?M.medicationName.trim():(M.medicationName.name||String(M.medicationName)||"").trim():M.name&&(k=typeof M.name=="string"?M.name.trim():(M.name.name||String(M.name)||"").trim()),!k)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645:",M),null;const V=parseInt(M.quantity,10)||1;return`${Utils.escapeHTML(k)} (${V})`}catch(k){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062F\u0648\u0627\u0621:",k,M),null}}).filter(Boolean).join(i?"\u060C ":", "):"-",Q=R&&R.length>0?R.reduce((M,k)=>{try{const V=parseInt(k.quantity,10)||0;return M+V}catch{return M}},0):0,B=Utils.escapeHTML(this.getUserDisplayName(b.createdBy)),O=i?"right":"left";return`
                <tr>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${O};">${Utils.escapeHTML(S)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${O};">
                        <div class="font-medium text-gray-900">${Utils.escapeHTML(L)}</div>
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${O};">${Utils.escapeHTML(C)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${O};">${Utils.escapeHTML(I)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${O};">${Utils.escapeHTML(E)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${O};">${Utils.escapeHTML(j)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${O};">${v}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${O};">${U}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${O};">${Utils.escapeHTML(N)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${O};">${Utils.escapeHTML($)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px; text-align: ${O};"><div style="overflow-wrap: break-word;">${F}</div></td>
                    <td class="text-center font-semibold" style="word-wrap: break-word; white-space: normal;">${Q}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${O};">${B}</td>
                    <td class="text-center" style="min-width: 150px;">
                        <div class="flex items-center justify-center gap-2 flex-wrap">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(b.id||"")}" title="${t("btn.view")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-visit" data-id="${Utils.escapeHTML(b.id||"")}" title="${t("btn.edit")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `},h=g.length?`
                <div class="table-wrapper clinic-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table table-header-green" style="width: 100%; min-width: 100%; table-layout: auto; direction: ${i?"rtl":"ltr"};">
                        <thead>
                            <tr>
                                <th style="min-width: 120px; text-align: ${i?"right":"left"};">${t(s?"table.contractorName":"table.employeeCode")}</th>
                                <th style="min-width: 150px; text-align: ${i?"right":"left"};">${t("table.name")}</th>
                                <th style="min-width: 120px; text-align: ${i?"right":"left"};">${t("table.jobTitle")}</th>
                                <th style="min-width: 120px; text-align: ${i?"right":"left"};">${t("table.factory")}</th>
                                <th style="min-width: 120px; text-align: ${i?"right":"left"};">${t("table.workplace")}</th>
                                <th style="min-width: 150px; text-align: ${i?"right":"left"};">${t("table.entryTime")}</th>
                                <th style="min-width: 150px; text-align: ${i?"right":"left"};">${t("table.exitTime")}</th>
                                <th style="min-width: 100px; text-align: ${i?"right":"left"};">${t("table.totalTime")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${i?"right":"left"};">${t("table.reason")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${i?"right":"left"};">${t("table.diagnosis")}</th>
                                <th style="min-width: 200px; word-wrap: break-word; text-align: ${i?"right":"left"};">${t("table.medications")}</th>
                                <th style="min-width: 100px; text-align: center;">${t("table.quantity")}</th>
                                <th style="min-width: 150px; text-align: ${i?"right":"left"};">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629</th>
                                <th class="text-center" style="min-width: 150px;">${t("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody id="clinic-visits-tbody"></tbody>
                    </table>
                </div>
            `:this.renderEmptyState(t(l?"empty.noResults":n==="employees"?"empty.noEmployeeVisits":"empty.noContractorVisits")),x=i?"ml-2":"mr-2",T=i?"mr-2":"ml-2",A=i?"ml-1":"mr-1",D=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4" style="direction: ${i?"rtl":"ltr"};">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold" style="text-align: ${i?"right":"left"};">${t("tab.visits")}</h3>
                </div>
                <div class="flex gap-2">
                    <button type="button" id="visits-add-btn" class="btn-primary">
                        <i class="fas fa-plus ${x}"></i>
                        ${t("btn.registerVisit")}
                    </button>
                    <button type="button" id="visits-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ${x}"></i>
                        ${t("btn.refresh")}
                    </button>
                    ${typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()?`
                    <button type="button" onclick="const b=this;b.disabled=true;b.innerHTML='\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0631\u062D\u064A\u0644...';GoogleIntegration.sendRequest({action:'migrateContractorVisits'}).then(r=>{alert(r.message);location.reload()}).catch(e=>{alert('\u062E\u0637\u0623:'+e);b.disabled=false;b.innerHTML='\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646'})" class="btn-primary" style="background-color: #d97706; color: white;">
                        <i class="fas fa-broom ${x}"></i>
                        \u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </button>
                    `:""}
                    <button type="button" id="visits-export-excel-btn" class="btn-success">
                        <i class="fas fa-file-excel ${x}"></i>
                        ${t("btn.exportExcel")}
                    </button>
                    <button type="button" id="visits-export-pdf-btn" class="btn-secondary">
                        <i class="fas fa-file-pdf ${x}"></i>
                        ${t("btn.exportPDF")}
                    </button>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
            <div class="mb-4" style="direction: ${i?"rtl":"ltr"};">
                <div class="module-tabs-wrapper">
                    <div class="module-tabs-container">
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${n==="employees"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="employees">
                            <i class="fas fa-user-tie ${x}"></i>
                            ${t("tab.employees")}
                            <span class="badge ${n==="employees"?"badge-primary":"badge-secondary"} ${T}">${d.length}</span>
                        </button>
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${n==="contractors"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="contractors">
                            <i class="fas fa-hard-hat ${x}"></i>
                            ${t("tab.contractors")}
                            <span class="badge ${n==="contractors"?"badge-primary":"badge-secondary"} ${T}">${m.length}</span>
                        </button>
                        </div>
                </div>
            </div>
            
            <!-- \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0627\u062D\u062A\u0631\u0627\u0641\u064A (\u0645\u0634\u0627\u0628\u0647 \u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A) -->
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 0 -20px; width: calc(100% + 40px); direction: ${i?"rtl":"ltr"};">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <!-- \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B -->
                    <div class="filter-field" style="min-width: 180px;">
                        <label for="visits-search" class="filter-label" style="text-align: ${i?"right":"left"};">
                            <i class="fas fa-search ${A}"></i>${t("filter.search")}
                        </label>
                        <input type="text" id="visits-search" class="filter-input" placeholder="${t("filter.searchPlaceholder")}" value="${Utils.escapeHTML(o)}" style="width: 100%; min-width: 160px; text-align: ${i?"right":"left"}; direction: ${i?"rtl":"ltr"};">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-factory" class="filter-label" style="text-align: ${i?"right":"left"};">
                            <i class="fas fa-industry ${A}"></i>${t("filter.factory")}
                            ${r?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-factory" class="filter-input" style="width: 100%; min-width: 140px; direction: ${i?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-position" class="filter-label" style="text-align: ${i?"right":"left"};">
                            <i class="fas fa-briefcase ${A}"></i>${t("filter.jobTitle")}
                            ${c?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-position" class="filter-input" style="width: 100%; min-width: 140px; direction: ${i?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-workplace" class="filter-label" style="text-align: ${i?"right":"left"};">
                            <i class="fas fa-map-marker-alt ${A}"></i>${t("filter.workplace")}
                            ${p?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-workplace" class="filter-input" style="width: 100%; min-width: 140px; direction: ${i?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 -->
                    <div class="filter-field" style="min-width: 140px;">
                        <button id="visits-reset-filters" class="filter-reset-btn" style="width: 100%;">
                            <i class="fas fa-redo ${A}"></i>${t("btn.reset")}
                        </button>
                    </div>
                </div>
            </div>
            
            ${h}
        `;e.innerHTML=D,this.applyModuleI18n(e),typeof requestIdleCallback=="function"?requestIdleCallback(()=>this.updateVisitFilterOptions(u),{timeout:900}):setTimeout(()=>this.updateVisitFilterOptions(u),0);try{const b=e.querySelector("#clinic-visits-tbody");if(b&&Array.isArray(g)&&g.length>0){this._clinicVisitsRowsToken=(this._clinicVisitsRowsToken||0)+1;const S=this._clinicVisitsRowsToken;let L=0;const C=g.length,I=E=>{if(S!==this._clinicVisitsRowsToken||this.state&&this.state.activeTab!=="visits")return;const j=typeof performance<"u"&&performance.now?performance.now():Date.now();let v="",U=0;for(;L<C;){v+=y(g[L]),L+=1,U+=1;const N=typeof performance<"u"&&performance.now?performance.now():Date.now(),$=E&&typeof E.timeRemaining=="function"?E.timeRemaining()>6:N-j<12;if(U>=25&&!$||U>=75)break}v&&b.insertAdjacentHTML("beforeend",v),L<C&&(typeof requestIdleCallback=="function"?requestIdleCallback(I,{timeout:900}):setTimeout(()=>I(null),0))};typeof requestIdleCallback=="function"?requestIdleCallback(I,{timeout:900}):setTimeout(()=>I(null),0)}}catch{}this.bindVisitsTabEvents(e),this.state._shouldFocusSearch&&requestAnimationFrame(()=>{const b=e.querySelector("#visits-search");if(b){b.focus();const S=this.state._searchCursorPosition;if(S!=null)try{b.setSelectionRange(S,S)}catch{}this.state._shouldFocusSearch=!1}}),requestAnimationFrame(()=>{const b=e.querySelector(".clinic-table-wrapper");b&&this.setupTableScrollListeners(b)})}catch(t){const i=t instanceof Error?t.message:typeof t=="string"?t:JSON.stringify(t);if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",i),e)try{e.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400">${Utils.escapeHTML(i)}</p>
                            <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab()">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    `}catch(n){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623:",n)}}},calculateTotalTime(e,t){if(!e||!t)return"-";try{const{t:i}=this.getTranslations(),n=e instanceof Date?e:new Date(e),s=t instanceof Date?t:new Date(t);if(isNaN(n.getTime())||isNaN(s.getTime()))return"-";const a=s.getTime()-n.getTime();if(a<0)return"-";const o=Math.floor(a/(1e3*60)),l=Math.floor(o/60),r=o%60;return l>0&&r>0?`${l} ${i("time.hours")} ${r} ${i("time.minutes")}`:l>0?`${l} ${i("time.hours")}`:r>0?`${r} ${i("time.minutes")}`:i("time.lessThanMinute")}catch(i){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",i),"-"}},cleanMedicationName(e,t=null){if(!e||typeof e!="string")return{name:e||"",quantity:t??0};const i=e.trim(),n=i.match(/^(.+?)\s*\(\s*(\d+)\s*\)\s*$/);if(n){const a=n[1].trim();return t!=null?{name:a,quantity:t}:{name:a,quantity:0}}return{name:i,quantity:t??0}},normalizeVisitMedications(e){if(!e)return[];if(Array.isArray(e)){const t=e.map(i=>{if(!i||typeof i!="object")return null;let n=i.medicationName||i.name||"";if(typeof n=="object"&&n!==null&&(n=n.medicationName||n.name||""),n=(n||"").toString().trim(),!n)return null;const s=parseInt(i.quantity,10)||1,a=this.cleanMedicationName(n,s),o=typeof a.name=="string"?a.name.trim():a.name&&a.name.name?a.name.name.trim():String(a.name||"").trim();return o?{medicationName:o,quantity:a.quantity||s||1,unit:i.unit||"\u0648\u062D\u062F\u0629",notes:i.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641:",i,a),null)}).filter(i=>i!==null&&i.medicationName);return AppState.debugMode&&t.length===0&&e.length>0&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0637\u0628\u064A\u0639 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",e),t}if(typeof e=="string"){const t=e.trim();if(!t)return[];try{const i=JSON.parse(t);if(Array.isArray(i)){const n=i.map(s=>{if(!s||typeof s!="object")return null;let a=s.medicationName||s.name||"";if(typeof a=="object"&&a!==null&&(a=a.medicationName||a.name||""),a=(a||"").toString().trim(),!a)return null;const o=parseInt(s.quantity,10)||1,l=this.cleanMedicationName(a,o),r=typeof l.name=="string"?l.name.trim():l.name&&l.name.name?l.name.name.trim():String(l.name||"").trim();return r?{medicationName:r,quantity:l.quantity||o||1,unit:s.unit||"\u0648\u062D\u062F\u0629",notes:s.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (JSON):",s,l),null)}).filter(s=>s!==null&&s.medicationName);if(n.length>0)return n}}catch{}try{const i=t.split(/،|,/).map(s=>s.trim()).filter(Boolean),n=[];if(i.forEach(s=>{const a=s.match(/^(.+?)(?:\s*\(\s*(\d+)\s*\))?\s*$/);if(!a){const r=s.trim();r&&n.push({medicationName:r,quantity:1,unit:"\u0648\u062D\u062F\u0629",notes:""});return}let o=(a[1]||"").trim(),l=a[2]?parseInt(a[2],10):1;if(o){const r=this.cleanMedicationName(o,l);o=r.name,l=r.quantity||l||1;const c=typeof o=="string"?o.trim():String(o||"").trim();c&&n.push({medicationName:c,quantity:isNaN(l)?1:l,unit:"\u0648\u062D\u062F\u0629",notes:""})}}),n.length>0)return AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${n.length} \u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0646\u0635:`,t),n}catch(i){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0646\u0635 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",t,i)}return[]}if(typeof e=="object"&&e!==null){let t=(e.medicationName||e.name||"").trim();if(t){const i=parseInt(e.quantity,10)||1,n=this.cleanMedicationName(t,i),s=typeof n.name=="string"?n.name.trim():n.name&&n.name.name?n.name.name.trim():String(n.name||"").trim();return s?[{medicationName:s,quantity:n.quantity||i||1,unit:e.unit||"\u0648\u062D\u062F\u0629",notes:e.notes||""}]:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (object):",e,n),[])}}return[]},getVisitFactoryDisplayName(e){try{if(!e||typeof e!="object")return"-";if(e.factoryName)return String(e.factoryName);if(e.factory){const t=this.getSiteOptions?this.getSiteOptions():[],i=Array.isArray(t)?t.find(n=>n.id===e.factory||n.name===e.factory):null;return i&&i.name?String(i.name):String(e.factory)}return"-"}catch{return"-"}},resetVisitFilters(){const e=document.getElementById("visits-search");e&&(e.value="");const t=document.getElementById("visits-filter-factory");t&&(t.value="");const i=document.getElementById("visits-filter-position");i&&(i.value="");const n=document.getElementById("visits-filter-workplace");n&&(n.value=""),this.state.filters=this.state.filters||{},this.state.filters.visits={search:"",factory:"",position:"",workplace:""},this.renderVisitsTab()},updateVisitFilterOptions(e){if(!e||!Array.isArray(e))return;const{t}=this.getTranslations(),i=(this.state.activeVisitType||"employees")==="contractors",n=[...new Set(e.map(m=>{const u=this.getVisitFactoryDisplayName(m);return u&&u!=="-"?u:null}).filter(Boolean))].sort(),s=[...new Set(e.map(m=>{const u=i?m.contractorPosition||m.employeePosition||"":m.employeePosition||"";return u&&u!=="-"?u:null}).filter(Boolean))].sort(),a=[...new Set(e.map(m=>{const u=i?m.workArea||m.employeeLocation||"":m.employeeLocation||m.workArea||"";return u&&u!=="-"?u:null}).filter(Boolean))].sort(),o=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},l=o.factory||document.getElementById("visits-filter-factory")?.value||"",r=o.position||document.getElementById("visits-filter-position")?.value||"",c=o.workplace||document.getElementById("visits-filter-workplace")?.value||"",p=document.getElementById("visits-filter-factory");p&&(p.innerHTML=`<option value="">${t("filter.all")}</option>`+n.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===l?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const f=document.getElementById("visits-filter-position");f&&(f.innerHTML=`<option value="">${t("filter.all")}</option>`+s.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===r?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const d=document.getElementById("visits-filter-workplace");d&&(d.innerHTML=`<option value="">${t("filter.all")}</option>`+a.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===c?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""))},bindVisitsTabEvents(e){const t=e.querySelector("#visits-add-btn"),i=e.querySelector("#visits-add-new-btn"),n=e.querySelector("#visits-refresh-btn"),s=e.querySelector("#visits-export-excel-btn"),a=e.querySelector("#visits-export-pdf-btn"),o=e.querySelector("#visits-search");t?.addEventListener("click",()=>this.showVisitForm()),i?.addEventListener("click",()=>this.showEnhancedVisitForm()),n?.addEventListener("click",()=>{this.renderVisitsTab(!0),Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}),s?.addEventListener("click",()=>this.exportVisitsToExcel()),a?.addEventListener("click",()=>this.exportVisitsToPDF()),o&&o.addEventListener("input",f=>{const d=(f.target.value||"").toString(),m=f.target.selectionStart!==null&&f.target.selectionStart!==void 0?f.target.selectionStart:d.length;this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.search=d,this.state._searchCursorPosition=m,this.state._shouldFocusSearch=!0,this.scheduleVisitsTabRender(!1,150)});const l=e.querySelector("#visits-filter-factory");l&&l.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.factory=l.value||"",this.scheduleVisitsTabRender(!1,50)});const r=e.querySelector("#visits-filter-position");r&&r.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.position=r.value||"",this.scheduleVisitsTabRender(!1,50)});const c=e.querySelector("#visits-filter-workplace");c&&c.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.workplace=c.value||"",this.scheduleVisitsTabRender(!1,50)});const p=e.querySelector("#visits-reset-filters");p&&p.addEventListener("click",()=>{this.resetVisitFilters()}),e.querySelectorAll(".visit-type-tab").forEach(f=>{f.addEventListener("click",()=>{try{const d=f.getAttribute("data-visit-type");if(!d){Utils.safeWarn("\u26A0\uFE0F \u0646\u0648\u0639 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.state.activeVisitType=d,this.scheduleVisitsTabRender(!1,30)}catch(d){if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",d),this.state&&this.state.activeVisitType)try{this.scheduleVisitsTabRender(!1,30)}catch(m){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",m)}}})}),e.hasAttribute("data-visits-actions-delegation")||(e.setAttribute("data-visits-actions-delegation","true"),e.addEventListener("click",f=>{try{const d=f.target?.closest?.('[data-action="view-visit"],[data-action="edit-visit"]');if(!d)return;const m=d.getAttribute("data-action"),u=d.getAttribute("data-id");if(!u)return;const g=(AppState.appData.clinicVisits||[]).find(y=>y.id===u);if(!g)return;m==="view-visit"?this.viewVisitDetails(g):m==="edit-visit"&&this.showVisitForm(g)}catch{}},{passive:!0}))},viewVisitDetails(e){if(!e)return;e.createdBy||(e.createdBy=null),e.updatedBy||(e.updatedBy=null);const t=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(n=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(n.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${n.quantity||1}</span>
                </div>
            `).join(""):'<p style="color: #999; font-style: italic;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629</p>',i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 1100px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; border-radius: 20px 20px 0 0;">
                    <h2 class="modal-title" style="color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-clipboard-list" style="font-size: 28px;"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                    </h2>
                    <button class="modal-close" style="color: white; font-size: 24px; background: rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 12px; transition: all 0.3s;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 30px; background: #f8f9fa;">
                    <div class="space-y-6">
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #667eea; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-user-circle" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-id-card"></i>
                                        \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeeCode||e.employeeNumber||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user"></i>
                                        \u0627\u0644\u0627\u0633\u0645
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeeName||e.contractorName||e.externalName||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-briefcase"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeePosition||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-map-marker-alt"></i>
                                        \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeeLocation||e.workArea||"-")}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #fc6c85; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-calendar-check" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-clock"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${e.visitDate?Utils.formatDateTime(e.visitDate):"-"}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-sign-out-alt"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${e.exitDate?Utils.formatDateTime(e.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647"}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user-check"></i>
                                        \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!e.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof e.createdBy=="object")return Utils.escapeHTML(e.createdBy.name||e.createdBy.email||e.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const n=String(e.createdBy).trim();if(n==="\u0627\u0644\u0646\u0638\u0627\u0645"||n===""){const s=(e.email||"").toString().trim();if(s&&s!=="")return Utils.escapeHTML(s);const a=(AppState.currentUser?.email||"").toString().trim();return a&&a!==""?Utils.escapeHTML(a):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(n)})()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C -->
                        <div class="form-section" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #4facfe; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-stethoscope" style="font-size: 24px;"></i>
                                \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C
                            </h3>
                            
                            <div class="space-y-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-question-circle"></i>
                                        \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6;">${Utils.escapeHTML(e.reason||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-diagnoses"></i>
                                        \u0627\u0644\u062A\u0634\u062E\u064A\u0635
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(e.diagnosis||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-pills"></i>
                                        \u0627\u0644\u0625\u062C\u0631\u0627\u0621 / \u0627\u0644\u0639\u0644\u0627\u062C
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(e.treatment||"-")}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 -->
                        ${e.medications&&Array.isArray(e.medications)&&e.medications.length>0?`
                        <div class="form-section" style="background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #009688; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-prescription-bottle-alt" style="font-size: 24px;"></i>
                                \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629
                            </h3>
                            <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #009688;">
                                ${t}
                            </div>
                        </div>
                        `:""}
                        ${e.notes?`
                        <div class="form-section" style="background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #F57F17; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-sticky-note" style="font-size: 24px;"></i>
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </h3>
                            <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #F57F17;">
                                <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(e.notes)}</p>
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
                
                <div class="modal-footer form-actions-centered" style="background: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e2e8f0; border-radius: 0 0 20px 20px;">
                    <button class="btn-secondary" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
                    </button>
                    <button class="btn-success" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(17, 153, 142, 0.4);" onclick="Clinic.exportVisitToPDF(${JSON.stringify(e).replace(/"/g,"&quot;")});">
                        <i class="fas fa-file-pdf ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    ${this.isCurrentUserAdmin()?`
                    <button class="btn-danger" style="background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(235, 51, 73, 0.4);" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F')) { Clinic.deleteVisit('${e.id}'); this.closest('.modal-overlay').remove(); }">
                        <i class="fas fa-trash-alt ml-2"></i>\u062D\u0630\u0641
                    </button>
                    `:`
                    <button class="btn-warning" style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(245, 158, 11, 0.4);" onclick="Clinic.requestVisitDeletion('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-paper-plane ml-2"></i>\u0637\u0644\u0628 \u062D\u0630\u0641
                    </button>
                    `}
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",n=>{n.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()})},async deleteVisit(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}if(!this.isCurrentUserAdmin()){await this.requestVisitDeletion(e);return}const t=(AppState.appData.clinicVisits||[]).find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const i=t.employeeName||t.contractorName||t.externalName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",n=t.visitDate?Utils.formatDateTime(t.visitDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 "${i}" \u0628\u062A\u0627\u0631\u064A\u062E ${n}\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");try{if(AppState.googleConfig?.appsScript?.enabled){const a=await GoogleIntegration.sendRequest({action:"deleteClinicVisit",data:{visitId:e}});if(!a||a.success!==!0)throw new Error(a?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}AppState.appData.clinicVisits=(AppState.appData.clinicVisits||[]).filter(a=>a.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"),this.renderVisitsTab()}catch(a){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+a.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",a)}}},async requestVisitDeletion(e){try{if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}const t=(AppState.appData.clinicVisits||[]).find(a=>a.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 (\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D)");return}const n={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};Loading.show("\u062C\u0627\u0631\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");const s=await GoogleIntegration.sendRequest({action:"addClinicVisitDeletionRequest",data:{visitId:e,visitData:t,requestedBy:n}});if(Loading.hide(),!s||s.success!==!0)throw new Error(s?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641");try{AppState.appData.clinicVisitDeletionRequests=Array.isArray(AppState.appData.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],s.data&&AppState.appData.clinicVisitDeletionRequests.unshift({...s.data,requestType:"visit"}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")}catch(t){try{Loading.hide()}catch{}Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(t.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}},getMedicationRowClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-50":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-50":"bg-green-50"},ensureData(){if(typeof AppState>"u")return;AppState.appData=AppState.appData||{};const e=AppState.appData;Array.isArray(e.clinicVisits)||(e.clinicVisits=[]),Array.isArray(e.medications)||(e.medications=[]),Array.isArray(e.clinicMedications)||(e.clinicMedications=[]),Array.isArray(e.clinicInventory)||(e.clinicInventory=[]);const t=e.medications.length>0?e.medications:e.clinicMedications.length>0?e.clinicMedications:e.clinicInventory.length>0?e.clinicInventory:[];e.medications.length===0&&t.length>0&&(e.medications=[...t]),e.clinicMedications.length===0&&t.length>0&&(e.clinicMedications=[...t]),e.clinicInventory.length===0&&t.length>0&&(e.clinicInventory=[...t]),Array.isArray(e.sickLeave)||(e.sickLeave=[]),Array.isArray(e.injuries)||(e.injuries=[]),Array.isArray(e.clinicSupplyRequests)||(e.clinicSupplyRequests=[]),Array.isArray(e.clinicStaff)||(e.clinicStaff=[]),Array.isArray(e.clinicStaffAttendance)||(e.clinicStaffAttendance=[]),Array.isArray(e.clinicStaffTimeOffRequests)||(e.clinicStaffTimeOffRequests=[]),Array.isArray(e.clinicStaffLeaveBalances)||(e.clinicStaffLeaveBalances=[]),Array.isArray(e.clinicStaffSystemActivities)||(e.clinicStaffSystemActivities=[]);let i=!1;if(Array.isArray(e.clinicContractorVisits)&&e.clinicContractorVisits.length>0){const s=new Set(e.clinicVisits.map(o=>o&&o.id).filter(Boolean));let a=0;e.clinicContractorVisits.forEach(o=>{o&&o.id&&!s.has(o.id)&&(o.personType="contractor",e.clinicVisits.push(o),s.add(o.id),i=!0,a++)}),a>0&&AppState.debugMode&&Utils.safeLog(`\u{1F517} [CLINIC] \u062A\u0645 \u062F\u0645\u062C ${a} \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A ensureData`)}e.clinicVisits=e.clinicVisits.map(s=>{if(!s||typeof s!="object")return s;let a=String(s.personType||"").toLowerCase().trim();a==="external"||a==="\u062E\u0627\u0631\u062C\u064A"||a==="\u0645\u0642\u0627\u0648\u0644"||a==="contractor"?a="contractor":(a==="\u0645\u0648\u0638\u0641"||a==="staff"||a==="employee"||!a)&&(s.contractorName||s.contractorWorkerName?a="contractor":a="employee"),s.personType!==a&&(s.personType=a,i=!0);let o=[];if(s.medications&&(o=this.normalizeVisitMedications(s.medications)),(!o||o.length===0)&&s.medicationsDispensed){const p=this.normalizeVisitMedications(s.medicationsDispensed);p&&p.length>0&&(o=p,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${s.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,p.length,"\u062F\u0648\u0627\u0621"))}if((!o||o.length===0)&&s.medicationsDispensedQty&&s.medicationsDispensedQty>0){const p=parseInt(s.medicationsDispensedQty,10)||0;p>0&&(o=[{medicationName:s.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:p,unit:"\u0648\u062D\u062F\u0629",notes:""}],AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062F\u0648\u0627\u0621 \u0645\u0646 medicationsDispensedQty \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${s.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,p))}o||(o=[]);const l=Array.isArray(s.medications)?s.medications:[],r=JSON.stringify(l.sort((p,f)=>(p.medicationName||"").localeCompare(f.medicationName||""))),c=JSON.stringify(o.sort((p,f)=>(p.medicationName||"").localeCompare(f.medicationName||"")));if(r!==c&&(s.medications=o,i=!0,AppState.debugMode&&o.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B medications \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${s.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,o.length,"\u062F\u0648\u0627\u0621")),s.visitDate){const p=String(s.visitDate).trim();if(p.length===10&&p.match(/^\d{4}-\d{2}-\d{2}$/)){const f=new Date(p+"T00:00:00");s.visitDate=f.toISOString(),i=!0}else if(!p.includes("T")&&!p.includes("Z"))try{const f=new Date(p);isNaN(f.getTime())||(s.visitDate=f.toISOString(),i=!0)}catch{}}if(s.exitDate){const p=String(s.exitDate).trim();if(p.length===10&&p.match(/^\d{4}-\d{2}-\d{2}$/)){const f=new Date(p+"T00:00:00");s.exitDate=f.toISOString(),i=!0}else if(!p.includes("T")&&!p.includes("Z"))try{const f=new Date(p);isNaN(f.getTime())||(s.exitDate=f.toISOString(),i=!0)}catch{}}return s});let n=!1;if(e.clinicMedications=e.clinicMedications.map(s=>{const a=this.normalizeMedicationRecord(s),o=this.calculateMedicationStatus(a),l=s&&(s.quantityAdded!==a.quantityAdded||s.remainingQuantity!==a.remainingQuantity)||typeof s?.quantityAdded!="number"||typeof s?.remainingQuantity!="number";return(a.status!==o.status||a.daysRemaining!==o.daysRemaining||l)&&(n=!0,a.status=o.status,a.daysRemaining=o.daysRemaining),a}),e.clinicInventory=e.clinicMedications,e.sickLeave=e.sickLeave.map(s=>this.normalizeSickLeaveRecord(s)),e.injuries=e.injuries.map(s=>this.normalizeInjuryRecord(s)),AppState.appData=e,typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&(n||i)&&Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData (medicationsChanged: ${n}, visitsChanged: ${i})`)}catch(s){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData:",s.message)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},ensureFilterDefaults(){this.state||(this.state={activeTab:"medications",filters:{}}),this.state.activeTab||(this.state.activeTab="medications");const e={medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:"",factory:"",position:"",workplace:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}};this.state.filters=this.state.filters||{},Object.keys(e).forEach(t=>{const i=this.state.filters[t]||{};this.state.filters[t]=Object.assign({},e[t],i)}),Array.isArray(this.state.currentInjuryAttachments)||(this.state.currentInjuryAttachments=[])},getCurrentUserSummary(e=null){if(e&&typeof e=="object"&&(e.name||e.id))return e;if(!AppState.currentUser)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F - \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0646\u0638\u0627\u0645"),{id:"",name:"\u0627\u0644\u0646\u0638\u0627\u0645",email:"",role:""};const t=(AppState.currentUser.name||AppState.currentUser.displayName||"").toString().trim(),i=(AppState.currentUser.email||"").toString().trim(),n=(AppState.currentUser.id||"").toString().trim();AppState.debugMode&&Utils.safeLog("\u{1F50D} getCurrentUserSummary - name:",t,"email:",i,"id:",n);const s=t||i||n||"\u0627\u0644\u0646\u0638\u0627\u0645";return AppState.debugMode&&s==="\u0627\u0644\u0646\u0638\u0627\u0645"&&Utils.safeWarn('\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: getCurrentUserSummary \u064A\u0639\u064A\u062F "\u0627\u0644\u0646\u0638\u0627\u0645" - AppState.currentUser:',AppState.currentUser),{id:n,name:s,email:i,role:(AppState.currentUser.role||"").toString().trim()}},getMonthlyVisits(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1);return AppState.appData.clinicVisits.filter(i=>new Date(i.visitDate||i.createdAt)>=t).length},async renderVisitsList(){const e=AppState.appData.clinicVisits.slice(-10).reverse();return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>':`
            <div class="mb-4 flex gap-2 justify-end">
                <button onclick="Clinic.printVisitsList()" class="btn-secondary">
                    <i class="fas fa-print ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                </button>
                <button onclick="Clinic.exportVisitsToPDF()" class="btn-secondary">
                    <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                            <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644</th>
                            <th>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                            <th>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                            <th>\u0627\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</th>
                            <th>\u0627\u0644\u0633\u0628\u0628</th>
                            <th>\u0627\u0644\u062A\u0634\u062E\u064A\u0635</th>
                            <th>\u0627\u0644\u0627\u062C\u0631\u0627\u0621</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(t=>{const i=t.employeeCode||t.employeeNumber||"-",n=t.employeeName||t.contractorName||t.externalName||"",s=t.contractorWorkerName?` (${Utils.escapeHTML(t.contractorWorkerName)})`:"",a=t.employeePosition||"-",o=t.employeeLocation||t.workArea||"-",l=t.visitDate?Utils.escapeHTML(Utils.formatDateTime(t.visitDate)):"-",r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647</span>',c=Clinic.calculateTotalTime(t.visitDate,t.exitDate),p=Utils.escapeHTML(t.reason||""),f=Utils.escapeHTML(t.diagnosis||""),d=Utils.escapeHTML(t.treatment||"");return`
                                <tr>
                                    <td>${Utils.escapeHTML(i)}</td>
                                    <td>
                                        <div class="font-medium text-gray-900">${Utils.escapeHTML(n)}${s}</div>
                                    </td>
                                    <td>${Utils.escapeHTML(a)}</td>
                                    <td>${Utils.escapeHTML(o)}</td>
                                    <td>${l}</td>
                                    <td>${r}</td>
                                    <td>${c}</td>
                                    <td>${p}</td>
                                    <td>${f}</td>
                                    <td>${d}</td>
                                    <td>
                                        <button onclick="Clinic.viewVisit('${t.id}')" class="btn-icon btn-icon-primary">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-visit-btn");e&&e.addEventListener("click",()=>this.showVisitForm())},100)},loadContractorsIntoSelect(e){if(!e)return;const t=(e.tagName||"").toLowerCase(),i=(e.value||"").toString();if(t==="input"){const n=e.getAttribute("list"),s=n?document.getElementById(n):null;if(!s)return;let a=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?a=(Contractors.getAllContractorsForModules()||[]).map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean):Array.isArray(AppState.appData?.approvedContractors)?a=AppState.appData.approvedContractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.companyName||r.name)?String(r.companyName||r.name).trim():"").filter(Boolean):Array.isArray(AppState.appData?.contractors)&&(a=AppState.appData.contractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean))}catch{}const o=new Set,l=[];a.forEach(r=>{const c=r.toLowerCase();o.has(c)||(o.add(c),l.push(r))}),s.innerHTML=l.map(r=>`<option value="${Utils.escapeHTML(r)}"></option>`).join("");try{e.dataset.allowedValues=JSON.stringify(l.map(r=>String(r||"").toLowerCase().trim()).filter(Boolean))}catch{}i&&(e.value=i),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("input",()=>{const r=document.getElementById("visit-employee-name");r&&e.value&&(r.value=e.value)}),e.addEventListener("blur",()=>{try{const r=(e.value||"").toString().trim();if(!r)return;if(!(()=>{try{return JSON.parse(e.dataset.allowedValues||"[]")}catch{return[]}})().includes(r.toLowerCase().trim())){e.value="";const f=document.getElementById("visit-employee-name");f&&(f.value=""),Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637")}}catch{}}));return}typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"&&Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:i,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1}),i&&(e.value=i),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("change",()=>{const n=document.getElementById("visit-employee-name");n&&e.value&&(n.value=e.value)}))},handlePersonTypeChange(){const e=document.getElementById("visit-person-type");if(!e)return;const t=e.value,i=document.getElementById("visit-employee-code-container"),n=document.getElementById("visit-employee-code"),s=document.getElementById("visit-employee-name"),a=document.getElementById("visit-employee-name-label"),o=document.getElementById("visit-employee-position-container"),l=document.getElementById("visit-employee-department-container"),r=document.getElementById("visit-employee-location-container"),c=document.getElementById("visit-employee-location"),p=document.getElementById("visit-contractor-worker-container"),f=document.getElementById("visit-contractor-worker"),d=document.getElementById("visit-contractor-worker-label"),m=document.getElementById("visit-contractor-position-container"),u=document.getElementById("visit-contractor-position"),g=document.getElementById("visit-factory-container"),y=document.getElementById("visit-factory"),h=document.getElementById("visit-contractor-factory-container"),x=document.getElementById("visit-contractor-factory"),T=document.getElementById("visit-work-area-container"),A=document.getElementById("visit-work-area");i&&(i.style.display=t==="employee"?"block":"none"),n&&(t==="employee"?(n.disabled=!1,n.required=!0,n.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"):(n.disabled=!0,n.required=!1,n.value="",n.placeholder="")),o&&(o.style.display=t==="employee"?"block":"none"),l&&(l.style.display=t==="employee"?"block":"none"),r&&(r.style.display=t==="employee"?"block":"none"),p&&(p.style.display=t==="contractor"||t==="external"?"block":"none"),m&&(m.style.display=t==="contractor"||t==="external"?"block":"none"),g&&(g.style.display=t==="employee"?"block":"none"),h&&(h.style.display=t==="contractor"||t==="external"?"block":"none"),T&&(T.style.display=t==="contractor"||t==="external"?"block":"none"),a&&(a.textContent=`\u0627\u0633\u0645 ${t==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":t==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u062C\u0647\u0629"} *`);const D=document.getElementById("visit-contractor-name-select");t==="employee"?(s&&(s.readOnly=!0,s.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",s.value="",s.style.display="block",s.required=!0),D&&(D.style.display="none",D.required=!1)):t==="contractor"?(s&&(s.style.display="none",s.required=!1,s.value=""),D&&(D.style.display="block",D.required=!0,Clinic.loadContractorsIntoSelect(D))):(s&&(s.readOnly=!1,s.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629 \u0623\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",s.value="",s.style.display="block",s.required=!0),D&&(D.style.display="none",D.required=!1));const b=document.getElementById("visit-employee-position"),S=document.getElementById("visit-employee-department");if(c&&(c.required=t==="employee",t!=="employee"&&(c.value="")),f&&(t==="contractor"||t==="external"?(f.required=!0,f.placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"):(f.required=!1,f.value="",f.placeholder="")),d&&(d.textContent=t==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *":t==="external"?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A *":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639"),u&&(t==="contractor"||t==="external"?(u.required=!0,u.placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B"):(u.required=!1,u.value="",u.placeholder="")),A&&(A.required=t==="contractor"||t==="external",t==="contractor"||t==="external"?A.placeholder="\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0623\u0648 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":(A.placeholder="",A.value="")),b&&(b.value=""),S&&(S.value=""),t==="employee"&&typeof EmployeeHelper<"u"&&n){const L=n.cloneNode(!0);n.parentNode.replaceChild(L,n),EmployeeHelper.setupEmployeeCodeSearch("visit-employee-code","visit-employee-name",C=>{if(C){const I=document.getElementById("visit-employee-name"),E=document.getElementById("visit-employee-position"),j=document.getElementById("visit-employee-department");I&&(I.value=C.name||""),E&&(E.value=C.position||""),j&&(j.value=C.department||"");const v=document.getElementById("visit-history-tbody");if(v){const U=document.getElementById("visit-employee-code")?.value.trim();if(U){const N=(AppState.appData.clinicVisits||[]).filter($=>$.personType==="employee"&&($.employeeCode===U||$.employeeNumber===U)).sort(($,R)=>new Date(R.visitDate||R.createdAt)-new Date($.visitDate||$.createdAt)).slice(0,10);N.length===0?v.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':v.innerHTML=N.map($=>`
                                    <tr>
                                        <td>${$.visitDate?Utils.escapeHTML(Utils.formatDateTime($.visitDate)):"-"}</td>
                                        <td>${$.exitDate?Utils.escapeHTML(Utils.formatDateTime($.exitDate)):"-"}</td>
                                        <td>${Utils.escapeHTML($.reason||"-")}</td>
                                        <td>${Utils.escapeHTML($.diagnosis||"-")}</td>
                                        <td>${Utils.escapeHTML($.treatment||"-")}</td>
                                        <td>${Utils.escapeHTML($.employeeLocation||$.workArea||"-")}</td>
                                    </tr>
                                `).join("")}}}},{inlineAlertId:"visit-form-alerts",employeeNotFoundWarn:"enter"})}},showVisitFormAlert(e,t="error"){const i=document.getElementById("visit-form-alerts");if(!i||e==null||String(e).trim()==="")return;i.style.display="block";const n=t==="error"?"border-red-300 bg-red-50 text-red-900":"border-amber-300 bg-amber-50 text-amber-950";i.innerHTML=`<div class="rounded-lg border ${n} px-3 py-2 text-sm text-right shadow-sm" role="alert">${Utils.escapeHTML(String(e))}</div>`;try{i.scrollIntoView({block:"nearest",behavior:"smooth"})}catch{}},clearVisitFormAlert(){const e=document.getElementById("visit-form-alerts");e&&(e.innerHTML="",e.style.display="none")},async showSickLeaveForm(e=null){this.ensureData();const t=!!e,i=document.createElement("div");i.className="modal-overlay";const n=e?.personType||"employee",s=e?.startDate?new Date(e.startDate).toISOString().slice(0,10):"",a=e?.endDate?new Date(e.endDate).toISOString().slice(0,10):"",o=e?.employeeName||e?.personName||"",l=e?.employeeDepartment||e?.department||"",r=e?.employeePosition||e?.position||"",c=e?.employeeCode||e?.employeeNumber||"";i.innerHTML=`
            <div class="modal-content" style="max-width: 860px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="sick-leave-form" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="sick-leave-person-type" class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 *</label>
                                <select id="sick-leave-person-type" required class="form-input">
                                    <option value="employee" ${n==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${n==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${n==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                </select>
                            </div>
                            <div id="sick-leave-code-container">
                                <label for="sick-leave-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</label>
                                <input type="text" id="sick-leave-employee-code" class="form-input" value="${Utils.escapeHTML(c)}"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A">
                            </div>
                            <div>
                                <label for="sick-leave-name" class="block text-sm font-semibold text-gray-700 mb-2" id="sick-leave-name-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                <div class="relative">
                                    <input type="text" id="sick-leave-name" required class="form-input" value="${Utils.escapeHTML(o)}" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                                    <div id="sick-leave-dropdown" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                </div>
                            </div>
                            <div id="sick-leave-position-container">
                                <label for="sick-leave-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="sick-leave-position" class="form-input" value="${Utils.escapeHTML(r)}" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                            </div>
                            <div id="sick-leave-department-container">
                                <label for="sick-leave-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                <input type="text" id="sick-leave-department" class="form-input" value="${Utils.escapeHTML(l)}" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0642\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                            </div>
                            <div>
                                <label for="sick-leave-start-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                                <input type="date" id="sick-leave-start-date" required class="form-input" value="${s}">
                            </div>
                            <div>
                                <label for="sick-leave-end-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                                <input type="date" id="sick-leave-end-date" required class="form-input" value="${a}">
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex flex-col justify-center">
                                <span class="text-sm font-semibold text-blue-700">\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</span>
                                <span id="sick-leave-days" class="text-xl font-bold text-blue-800 mt-2">${e?.daysCount?`${e.daysCount} \u064A\u0648\u0645`:"\u2014"}</span>
                            </div>
                            <div>
                                <label for="sick-leave-doctor" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</label>
                                <input type="text" id="sick-leave-doctor" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C" value="${Utils.escapeHTML(e?.treatingDoctor||"")}">
                            </div>
                        </div>
                        <div>
                                <label for="sick-leave-reason" class="block text-sm font-semibold text-gray-700 mb-2">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                            <textarea id="sick-leave-reason" required class="form-input" rows="3" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629">${Utils.escapeHTML(e?.reason||"")}</textarea>
                            </div>
                        <div>
                                <label for="sick-leave-notes" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</label>
                            <textarea id="sick-leave-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629 \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.medicalNotes||"")}</textarea>
                            </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(i);const p=i.querySelector("#sick-leave-form"),f=p.querySelector("#sick-leave-person-type"),d=p.querySelector("#sick-leave-employee-code"),m=p.querySelector("#sick-leave-name"),u=p.querySelector("#sick-leave-position"),g=p.querySelector("#sick-leave-department"),y=p.querySelector("#sick-leave-position-container"),h=p.querySelector("#sick-leave-department-container"),x=p.querySelector("#sick-leave-code-container"),T=p.querySelector("#sick-leave-name-label"),A=p.querySelector("#sick-leave-dropdown"),D=p.querySelector("#sick-leave-start-date"),b=p.querySelector("#sick-leave-end-date"),S=p.querySelector("#sick-leave-days"),L=()=>{if(!D.value||!b.value){S.textContent="\u2014";return}const v=new Date(D.value).toISOString(),U=new Date(b.value).toISOString(),N=this.calculateSickLeaveDays(v,U);S.textContent=`${N} \u064A\u0648\u0645`};D.addEventListener("change",L),b.addEventListener("change",L),D.value&&b.value&&L();const C=()=>{m&&(m.value=""),u&&(u.value=""),g&&(g.value=""),d&&(d.value="")},I=v=>{if(!v){C();return}const U=EmployeeHelper.getPrimaryCode(v);d&&U&&(d.value=U),m&&(m.value=v.name||""),u&&(u.value=v.position||v.jobTitle||""),g&&(g.value=v.department||v.unit||v.section||"")},E=()=>{!d||!m||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("sick-leave-employee-code","sick-leave-name",v=>{v?I(v):C()}),EmployeeHelper.setupAutocomplete("sick-leave-name",v=>{v&&I(v)}))},j=(v,U=!1)=>{const N=v==="employee";x&&(x.style.display=N?"block":"none"),y&&(y.style.display=N?"block":"none"),h&&(h.style.display=N?"block":"none"),T&&(T.textContent=`\u0627\u0633\u0645 ${N?"\u0627\u0644\u0645\u0648\u0638\u0641":v==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),d&&(d.disabled=!N,d.required=N,d.placeholder=N?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!N&&U&&(d.value="")),m&&(m.readOnly=N,m.placeholder=N?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${v==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,N&&U&&(m.value="")),!N&&U&&(u&&(u.value=""),g&&(g.value="")),A&&(A.classList.add("hidden"),A.innerHTML=""),N&&E()};if(j(n,!1),n==="employee"&&typeof EmployeeHelper<"u"&&c){const v=EmployeeHelper.findByTerm(c);v&&I(v)}f.addEventListener("change",()=>{j(f.value,!0),f.value==="employee"&&d&&d.focus()}),p.addEventListener("submit",async v=>{v.preventDefault();const U=f.value,N=U==="employee";if(!D.value||!b.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629");return}const $=new Date(D.value).toISOString(),R=new Date(b.value).toISOString(),F=this.calculateSickLeaveDays($,R),Q=e?.createdAt||new Date().toISOString(),B=e?.createdBy||this.getCurrentUserSummary(),O=this.getCurrentUserSummary(),M=this.normalizeSickLeaveRecord({id:e?.id||Utils.generateId("SICK_LEAVE"),personType:U,employeeName:N?m.value.trim():null,employeeCode:N?d?.value.trim()||"":null,employeeNumber:N?d?.value.trim()||"":null,employeePosition:N?u?.value.trim()||"":null,employeeDepartment:N?g?.value.trim()||"":null,personName:N?null:m.value.trim(),startDate:$,endDate:R,daysCount:F,reason:p.querySelector("#sick-leave-reason").value.trim(),medicalNotes:p.querySelector("#sick-leave-notes").value.trim(),treatingDoctor:p.querySelector("#sick-leave-doctor").value.trim(),createdAt:Q,createdBy:B,createdById:B?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:O});Loading.show();try{const k=AppState.appData.sickLeave||[];if(t){const V=k.findIndex(q=>q.id===M.id);V!==-1?k[V]=M:k.push(M)}else k.push(M);AppState.appData.sickLeave=k;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(V){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629):",V)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"),i.remove(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]')&&this.state.activeTab==="sickLeave"&&this.renderSickLeaveTab();const q=document.querySelector("#total-sick-leave");q&&(q.textContent=k.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateSickLeave",data:{leaveId:M.id,updateData:M}}):await GoogleIntegration.sendRequest({action:"addSickLeave",data:M})}catch(V){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL:",V)}})()}catch(k){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629: "+k.message)}}),i.addEventListener("click",v=>{v.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()})},async showInjuryForm(e=null){Utils.safeLog("\u{1F537} \u062A\u0645 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 showInjuryForm - \u0628\u062F\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C..."),this.ensureData();const t=!!e,i=this;this.state.currentInjuryAttachments=Array.isArray(e?.attachments)?e.attachments.map(k=>this.normalizeAttachment(k)).filter(Boolean):[];const n=document.createElement("div");n.className="modal-overlay";const s=e?.personType||"employee",a=e?.injuryDate?Utils.toDateTimeLocalString(e.injuryDate):"",o=e?.employeeName||e?.personName||"",l=e?.contractorName||"",r=e?.employeeCode||e?.employeeNumber||"",c=e?.employeePosition||e?.contractorPosition||"",p=e?.employeeDepartment||e?.department||"",f=e?.factory||"",d=e?.subLocation||e?.subLocationName||"",m=e?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",u=this.getInjuryTypeOptions(),g=this.getSiteOptions();n.innerHTML=`
            <div class="modal-content" style="max-width: 980px; border-radius: 16px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white;">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0625\u0635\u0627\u0628\u0629 \u0637\u0628\u064A\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0625\u0635\u0627\u0628\u0629 \u0637\u0628\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="injury-form" class="space-y-5" novalidate>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); padding: 16px; border-radius: 12px;">
                            <div>
                                <label for="injury-person-type" class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 *</label>
                                <select id="injury-person-type" required class="form-input">
                                    <option value="employee" ${s==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${s==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${s==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                </select>
                            </div>
                            <div id="injury-code-container">
                                <label for="injury-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</label>
                                <input type="text" id="injury-employee-code" class="form-input" value="${Utils.escapeHTML(r)}" placeholder="\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629">
                            </div>
                            <div id="injury-contractor-container" style="display:none;">
                                <label for="injury-contractor-name-select" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <input id="injury-contractor-name-select" class="form-input" list="injury-contractors-datalist" placeholder="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --" value="${Utils.escapeHTML(l)}" autocomplete="off">
                                <datalist id="injury-contractors-datalist"></datalist>
                            </div>
                            <div id="injury-employee-name-container">
                                <label for="injury-name" class="block text-sm font-semibold text-gray-700 mb-2" id="injury-name-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                <div class="relative">
                                    <input type="text" id="injury-name" required class="form-input" value="${Utils.escapeHTML(o)}" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B">
                                    <div id="injury-dropdown" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                </div>
                            </div>
                            <div id="injury-contractor-worker-container" style="display:none;">
                                <label for="injury-contractor-worker-name" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <input type="text" id="injury-contractor-worker-name" class="form-input" value="${Utils.escapeHTML(o)}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644">
                            </div>
                            <div id="injury-position-container">
                                <label for="injury-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="injury-position" class="form-input" value="${Utils.escapeHTML(c)}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                            </div>
                            <div>
                                <label for="injury-department" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</label>
                                <input type="text" id="injury-department" class="form-input" value="${Utils.escapeHTML(p)}" placeholder="\u0642\u0633\u0645/\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0635\u0627\u0628">
                            </div>
                            <div>
                                <label for="injury-factory" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <select id="injury-factory" class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${g.map(k=>`<option value="${Utils.escapeHTML(k.id)}" ${f===k.id||f===k.name?"selected":""}>${Utils.escapeHTML(k.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-sub-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <input type="text" id="injury-sub-location" list="injury-sub-location-datalist" class="form-input" value="${Utils.escapeHTML(d)}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u064A\u062F\u0648\u064A\u0627\u064B">
                                <datalist id="injury-sub-location-datalist"></datalist>
                            </div>
                            <div>
                                <label for="injury-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <input type="datetime-local" id="injury-date" required class="form-input" value="${a}">
                            </div>
                            <div>
                                <label for="injury-status" class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <select id="injury-status" required class="form-input">
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629" ${m==="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</option>
                                    <option value="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621" ${m==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"selected":""}>\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621</option>
                                    <option value="\u0645\u063A\u0644\u0642" ${m==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <select id="injury-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</option>
                                    ${u.map(k=>`<option value="${Utils.escapeHTML(k)}" ${e?.injuryType===k?"selected":""}>${Utils.escapeHTML(k)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645) *</label>
                                <select id="injury-body-part" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645</option>
                                    ${this.getInjuryBodyPartOptions().map(k=>`<option value="${Utils.escapeHTML(k)}" ${e?.injuryBodyPart===k?"selected":""}>${Utils.escapeHTML(k)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <input type="text" id="injury-location" required class="form-input" value="${Utils.escapeHTML(e?.injuryLocation||"")}" placeholder="\u062D\u062F\u062F \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                            </div>
                        </div>
                        <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                            <textarea id="injury-description" required class="form-input" rows="3" placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u0627\u062F\u062B">${Utils.escapeHTML(e?.injuryDescription||"")}</textarea>
                            </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</label>
                                <textarea id="injury-actions" class="form-input" rows="3" placeholder="\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0623\u0648 \u0627\u0644\u062E\u0637\u0637 \u0627\u0644\u0639\u0644\u0627\u062C\u064A\u0629">${Utils.escapeHTML(e?.actionsTaken||"")}</textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0639\u0644\u0627\u062C</label>
                                <textarea id="injury-treatment" class="form-input" rows="3" placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0648\u0635\u0648\u0641">${Utils.escapeHTML(e?.treatment||"")}</textarea>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <label for="injury-attachments-input" class="block text-sm font-semibold text-gray-700">\u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <div class="flex items-center gap-3">
                                <input type="file" id="injury-attachments-input" class="form-input" accept=".png,.jpg,.jpeg,.pdf" multiple>
                                <span class="text-xs text-gray-500">\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0645\u0644\u0641 \u0627\u0644\u0648\u0627\u062D\u062F 5MB</span>
                            </div>
                            <div id="injury-attachments-preview" class="space-y-2"></div>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" id="injury-cancel-btn">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(n);const y=n.querySelector("#injury-form"),h=y.querySelector("#injury-person-type"),x=y.querySelector("#injury-name"),T=y.querySelector("#injury-employee-code"),A=y.querySelector("#injury-code-container"),D=y.querySelector("#injury-contractor-container"),b=y.querySelector("#injury-contractor-name-select"),S=y.querySelector("#injury-employee-name-container"),L=y.querySelector("#injury-contractor-worker-container"),C=y.querySelector("#injury-contractor-worker-name"),I=y.querySelector("#injury-name-label"),E=y.querySelector("#injury-position"),j=y.querySelector("#injury-factory"),v=y.querySelector("#injury-sub-location"),U=y.querySelector("#injury-department"),N=y.querySelector("#injury-dropdown"),$=y.querySelector("#injury-attachments-input"),R=n.querySelector(".modal-close"),F=y.querySelector("#injury-cancel-btn"),Q=k=>{if(k){if(x&&(x.value=k.name||""),T){const V=EmployeeHelper.getPrimaryCode(k);V&&(T.value=V)}U&&(U.value=k.department||k.unit||k.section||U.value),E&&(E.value=k.position||k.job||"")}},B=()=>{!T||!x||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("injury-employee-code","injury-name",k=>{k&&Q(k)}),EmployeeHelper.setupAutocomplete("injury-name",k=>{k&&Q(k)}))},O=(k,V=!1)=>{const q=k==="employee",_=k==="contractor",P=k==="external";A&&(A.style.display=q?"block":"none"),D&&(D.style.display=_?"block":"none"),S&&(S.style.display=q?"block":"none"),L&&(L.style.display=_||P?"block":"none"),T&&(T.required=q,T.disabled=!q,T.placeholder=q?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!q&&V&&(T.value="")),I&&(I.textContent=`\u0627\u0633\u0645 ${q?"\u0627\u0644\u0645\u0648\u0638\u0641":k==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),x&&(x.readOnly=q,x.disabled=!q,x.required=q,x.placeholder=q?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${k==="contractor"?"\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,V&&!q&&(x.value="")),b&&(b.required=_,b.disabled=!_,_?this.loadContractorsIntoSelect(b):V&&(b.value="")),C&&(C.required=_||P,C.disabled=!(_||P),V&&q&&(C.value=""),P?C.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A":_?C.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":C.placeholder=""),!q&&V&&U&&(U.value=""),!q&&V&&E&&(E.value=""),N&&(N.classList.add("hidden"),N.innerHTML=""),q&&B()};if(O(s,!1),s==="employee"&&typeof EmployeeHelper<"u"&&r){const k=EmployeeHelper.findByTerm(r);k&&Q(k)}h.addEventListener("change",()=>{O(h.value,!0)}),b?.addEventListener("input",()=>{h.value!=="contractor"||!(b.value||"").trim()||x.value.trim()||x.focus()}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("injury-factory","injury-sub-location","injury-sub-location-datalist",{includeFallbackNameMatch:!0}),$?.addEventListener("change",async k=>{await i.handleInjuryAttachmentsChange(k.target.files)}),typeof i.renderInjuryAttachmentsPreview=="function"?i.renderInjuryAttachmentsPreview():Utils.safeWarn("\u26A0\uFE0F renderInjuryAttachmentsPreview \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const M=()=>{i.state.currentInjuryAttachments=[],n.remove()};R?.addEventListener("click",M),F?.addEventListener("click",M),Utils.safeLog("\u{1F537} \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 event listener \u0644\u0644\u0646\u0645\u0648\u0630\u062C..."),y.addEventListener("submit",async k=>{Utils.safeLog("\u{1F534} \u062A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638! \u0628\u062F\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");try{k.preventDefault(),k.stopPropagation(),k.stopImmediatePropagation(),Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0635\u0627\u0628\u0629...");const V=h.value,q=V==="employee",_=y.querySelector("#injury-date");if(!_.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const P=Utils.dateTimeLocalToISO(_.value)||new Date().toISOString(),X=e?.createdAt||new Date().toISOString(),Y=e?.createdBy||i.getCurrentUserSummary(),te=i.getCurrentUserSummary(),ee=U?.value.trim()||"",se=E?.value.trim()||"",K=b?.value?.trim()||"",ie=q?x?.value?.trim()||"":C?.value?.trim()||x?.value?.trim()||"",oe=y.querySelector("#injury-type")?.value||"",re=y.querySelector("#injury-body-part")?.value||"",w=y.querySelector("#injury-location")?.value?.trim()||"",H=y.querySelector("#injury-description")?.value?.trim()||"",z=j?.value?.trim()||"",W=v?.value?.trim()||"";if(q&&!ie){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644/\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(V==="contractor"&&b){const J=(()=>{try{return JSON.parse(b.dataset.allowedValues||"[]")}catch{return[]}})();if(!K||!J.includes(K.toLowerCase().trim())){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637");return}if(!ie){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}}if(V==="external"&&!ie){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A");return}if(!oe){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!re){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)");return}if(!w){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!H){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}let G="";z&&(G=g.find(ae=>ae.id===z||ae.name===z)?.name||"");const Z=i.normalizeInjuryRecord({id:e?.id||Utils.generateId("INJURY"),personType:V,employeeName:q?x.value.trim():null,employeeCode:q?T?.value.trim()||"":null,employeeNumber:q?T?.value.trim()||"":null,personName:q?null:ie,contractorName:V==="contractor"?K:null,employeePosition:se,contractorPosition:q?null:se,employeeDepartment:ee,department:ee,factory:z||null,factoryName:G||null,subLocation:W||null,subLocationName:W||null,injuryDate:P,injuryType:oe,injuryBodyPart:re,injuryLocation:w,injuryDescription:H,actionsTaken:y.querySelector("#injury-actions").value.trim(),treatment:y.querySelector("#injury-treatment").value.trim(),status:y.querySelector("#injury-status").value,attachments:i.state.currentInjuryAttachments.map(J=>({...J})),createdAt:X,createdBy:Y,createdById:Y?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:te});Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 payload \u0628\u0646\u062C\u0627\u062D:",Z),Loading.show();const ne=AppState.appData.injuries||[];if(t){const J=ne.findIndex(ae=>ae.id===Z.id);J!==-1?ne[J]=Z:ne.push(Z)}else ne.push(Z);AppState.appData.injuries=ne;try{i.calculateClinicCardValues(),i.updateClinicAnalysisResults()}catch(J){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u0635\u0627\u0628\u0629):",J)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D"),M(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A..."),document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]')&&i.state.activeTab==="injuries"&&(Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 panel\u060C \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),i.renderInjuriesTab());const ae=document.querySelector("#total-injuries");ae&&(ae.textContent=ne.length)}catch(J){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",J)}},100),(async()=>{try{t?(await GoogleIntegration.sendRequest({action:"updateInjury",data:{injuryId:Z.id,updateData:Z}}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL (\u062A\u062D\u062F\u064A\u062B)")):(await GoogleIntegration.sendRequest({action:"addInjury",data:Z}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL (\u0625\u0636\u0627\u0641\u0629)"))}catch(J){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL:",J)}})()}catch(V){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629:",V),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629: "+V.message)}}),n.addEventListener("click",k=>{if(k.target===n){if(!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`))return;i.state.currentInjuryAttachments=[],n.remove()}})},showVisitForm(e=null,t=null){const i=!!e;if(!document.getElementById("clinic-section")){t&&(t.disabled=!1);return}try{this.ensureData()}catch(o){t&&(t.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0636\u064A\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",o);return}typeof Permissions<"u"&&Permissions.ensureFormSettingsState&&Permissions.ensureFormSettingsState().catch(()=>{});const s=document.createElement("div");if(s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 800px; border-radius: 15px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; gap: 10px;"><i class="fas fa-hospital-user"></i> ${i?"\u062A\u0639\u062F\u064A\u0644 \u0632\u064A\u0627\u0631\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
                    <button class="modal-close" style="color: white;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="background: #f8f9fa; padding: 25px;">
                    <form id="visit-form" class="space-y-4">
                        <div id="visit-form-alerts" class="visit-form-alerts mb-2" style="display:none" aria-live="polite" role="region" aria-label="\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C"></div>
                        <div class="grid grid-cols-2 gap-4" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <div>
                                <label class="block text-sm font-semibold mb-2" style="color: #667eea; display: flex; align-items: center; gap: 5px;"><i class="fas fa-users"></i> \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 *</label>
                                <select id="visit-person-type" required class="form-input" onchange="Clinic.handlePersonTypeChange()" style="border: 2px solid #667eea; border-radius: 8px;">
                                    <option value="employee" ${e?.personType==="employee"||!e?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${e?.personType==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${e?.personType==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                </select>
                            </div>
                            <div id="visit-employee-code-container" style="display: ${e?.personType==="employee"||!e?"block":"none"};">
                                <label for="visit-employee-code" class="block text-sm font-semibold mb-2" style="color: #667eea; display: flex; align-items: center; gap: 5px;"><i class="fas fa-id-card"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A / \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A *</label>
                                <input type="text" id="visit-employee-code" class="form-input" style="border: 2px solid #667eea; border-radius: 8px;"
                                    value="${e?.employeeCode||e?.employeeNumber||""}" 
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text"
                                    ${e?.personType==="employee"||!e?"required":"disabled"}>
                            </div>
                            <div id="visit-employee-name-container">
                                <label for="visit-employee-name" class="block text-sm font-semibold mb-2" id="visit-employee-name-label" style="color: #667eea; display: flex; align-items: center; gap: 5px;"><i class="fas fa-user"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                <input type="text" id="visit-employee-name" required class="form-input" style="border: 2px solid #667eea; border-radius: 8px;"
                                    value="${e?.employeeName||""}" 
                                    placeholder="${e?.personType==="employee"||!e?"\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":e?.personType==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"}"
                                    ${e?.personType==="employee"||!e?"readonly":""}
                                    style="display: ${e?.personType==="contractor"?"none":"block"}; border: 2px solid #667eea; border-radius: 8px;">
                                <input id="visit-contractor-name-select" required class="form-input"
                                    list="visit-contractors-datalist"
                                    placeholder="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --"
                                    style="display: ${e?.personType==="contractor"?"block":"none"}; border: 2px solid #667eea; border-radius: 8px;"
                                    autocomplete="off">
                                <datalist id="visit-contractors-datalist"></datalist>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                        <div class="grid grid-cols-2 gap-4" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <div id="visit-employee-position-container" style="display: ${e?.personType==="employee"||!e?"block":"none"};">
                                <label for="visit-employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="visit-employee-position" class="form-input" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"
                                    value="${e?.employeePosition||""}">
                            </div>
                            <div id="visit-employee-department-container" style="display: ${e?.personType==="employee"||!e?"block":"none"};">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                <input type="text" id="visit-employee-department" class="form-input" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"
                                    value="${e?.employeeDepartment||""}">
                            </div>
                            <div id="visit-factory-container" style="display: ${e?.personType==="employee"||!e?"block":"none"};">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="visit-factory" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${this.getSiteOptions().map(o=>`
                                        <option value="${o.id}" ${e?.factory===o.id||e?.factory===o.name?"selected":""}>${Utils.escapeHTML(o.name)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div id="visit-employee-location-container" style="display: ${e?.personType==="employee"||!e?"block":"none"};">
                                <label for="visit-employee-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span></label>
                                <input type="text" id="visit-employee-location" class="form-input" list="visit-employee-location-datalist"
                                    value="${e?.employeeLocation||""}" 
                                    placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" required>
                                <datalist id="visit-employee-location-datalist"></datalist>
                            </div>
                            <div id="visit-contractor-position-container" style="display: ${e?.personType==="contractor"||e?.personType==="external"?"block":"none"};">
                                <label for="visit-contractor-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                <input type="text" id="visit-contractor-position" list="visit-contractor-positions-datalist" class="form-input"
                                    value="${e?.contractorPosition||e?.employeePosition||""}" 
                                    placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B"
                                    autocomplete="off"
                                    ${e?.personType==="contractor"||e?.personType==="external"?"required":""}>
                                <datalist id="visit-contractor-positions-datalist">
                                    ${this.getContractorPositionSuggestions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div id="visit-contractor-factory-container" style="display: ${e?.personType==="contractor"||e?.personType==="external"?"block":"none"};">
                                <label for="visit-contractor-factory" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="visit-contractor-factory" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${this.getSiteOptions().map(o=>`
                                        <option value="${o.id}" ${e?.factory===o.id||e?.factory===o.name?"selected":""}>${Utils.escapeHTML(o.name)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div id="visit-work-area-container" style="display: ${e?.personType==="contractor"||e?.personType==="external"?"block":"none"};">
                                <label for="visit-work-area" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span></label>
                                <input type="text" id="visit-work-area" class="form-input" list="visit-work-area-datalist"
                                    value="${e?.workArea||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text"
                                    ${e?.personType==="contractor"||e?.personType==="external"?"required":""}>
                                <datalist id="visit-work-area-datalist"></datalist>
                            </div>
                            <div id="visit-contractor-worker-container" style="display: ${e?.personType==="contractor"||e?.personType==="external"?"block":"none"};">
                                <label for="visit-contractor-worker" id="visit-contractor-worker-label" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <input type="text" id="visit-contractor-worker" list="visit-contractor-workers-datalist" class="form-input"
                                    value="${e?.contractorWorkerName||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"
                                    autocomplete="off"
                                    ${e?.personType==="contractor"||e?.personType==="external"?"required":""}>
                                <datalist id="visit-contractor-workers-datalist">
                                    ${this.getContractorWorkerSuggestions(e?.contractorName||e?.employeeName).map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div>
                                <label for="visit-date" class="block text-sm font-semibold mb-2" style="color: #fc6c85; display: flex; align-items: center; gap: 5px;"><i class="fas fa-clock"></i> \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 *</label>
                                <input type="datetime-local" id="visit-date" required class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;"
                                    value="${e?.visitDate?Utils.toDateTimeLocalString(e.visitDate):""}">
                            </div>
                            <div>
                                <label for="visit-exit-date" class="block text-sm font-semibold mb-2" style="color: #fc6c85; display: flex; align-items: center; gap: 5px;"><i class="fas fa-sign-out-alt"></i> \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                                <input type="datetime-local" id="visit-exit-date" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;"
                                    value="${e?.exitDate?Utils.toDateTimeLocalString(e.exitDate):""}">
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C -->
                        <div class="grid grid-cols-1 gap-4" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <div class="col-span-2">
                                <label for="visit-type" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-tag"></i> \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *</label>
                                <select id="visit-type" required class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 --</option>
                                    ${(i&&!e?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(o=>`<option value="${Utils.escapeHTML(o)}" selected>${Utils.escapeHTML(o)}</option>`).join("")}
                                    ${this.getVisitTypeOptions().map(o=>`<option value="${Utils.escapeHTML(o)}" ${(e?.visitType||"")===o?"selected":""}>${Utils.escapeHTML(o)}</option>`).join("")}
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label for="visit-reason" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-question-circle"></i> \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *</label>
                                <input type="text" id="visit-reason" list="visit-reasons-datalist" required class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    value="${e?.reason||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0627\u0643\u062A\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629" autocomplete="off">
                                <datalist id="visit-reasons-datalist">
                                    ${this.getReasonSuggestions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div class="col-span-2">
                                <label for="visit-diagnosis" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-diagnoses"></i> \u0627\u0644\u062A\u0634\u062E\u064A\u0635</label>
                                <input type="text" id="visit-diagnosis" list="visit-diagnoses-datalist" class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    value="${e?.diagnosis||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635" autocomplete="off">
                                <datalist id="visit-diagnoses-datalist">
                                    ${this.getDiagnosisSuggestions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div class="col-span-2">
                                <label for="visit-treatment" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-pills"></i> \u0627\u0644\u0639\u0644\u0627\u062C</label>
                                <input type="text" id="visit-treatment" list="visit-treatments-datalist" class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    value="${e?.treatment||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0648\u0635\u0648\u0641" autocomplete="off">
                                <datalist id="visit-treatments-datalist">
                                    ${this.getTreatmentSuggestions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 -->
                        <div class="grid grid-cols-1 gap-4" style="background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%); padding: 20px; border-radius: 10px;">
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629</label>
                                <div id="visit-medications-container" class="space-y-2">
                                    <div class="flex gap-2 items-end">
                                        <div class="flex-1">
                                            <input id="visit-medication-select" class="form-input"
                                                list="visit-medications-datalist"
                                                placeholder="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 --"
                                                autocomplete="off">
                                            <datalist id="visit-medications-datalist"></datalist>
                                        </div>
                                        <div style="width: 120px;">
                                            <input type="number" id="visit-medication-quantity" class="form-input" min="1" placeholder="\u0627\u0644\u0643\u0645\u064A\u0629" value="1">
                                        </div>
                                        <button type="button" class="btn-secondary" id="visit-add-medication-btn">
                                            <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629
                                        </button>
                                    </div>
                                    <div id="visit-medications-list" class="space-y-2 mt-2">
                                        ${e?.medications&&Array.isArray(e.medications)?e.medications.map((o,l)=>`
                                            <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-med-id="${o.medicationId||""}">
                                                <div>
                                                    <span class="font-medium">${Utils.escapeHTML(o.medicationName||"")}</span>
                                                    <span class="text-sm text-gray-600 mr-2">\xD7 ${o.quantity||1}</span>
                                                </div>
                                                <button type="button" class="btn-icon btn-icon-danger btn-xs" data-remove-med="${l}">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        `).join(""):""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u062C\u062F\u0648\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 (\u0628\u0646\u0641\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064A) -->
                        ${e?.personType==="employee"||!e?`
                        <div class="mt-6 pt-6 border-t">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">
                                <i class="fas fa-history ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629
                            </h3>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div class="overflow-x-auto">
                                    <table class="data-table w-full" id="visit-history-table">
                                        <thead>
                                            <tr>
                                                <th>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                                                <th>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                                                <th>\u0627\u0644\u0633\u0628\u0628</th>
                                                <th>\u0627\u0644\u062A\u0634\u062E\u064A\u0635</th>
                                                <th>\u0627\u0644\u0639\u0644\u0627\u062C</th>
                                                <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644</th>
                                            </tr>
                                        </thead>
                                        <tbody id="visit-history-tbody">
                                            <tr>
                                                <td colspan="6" class="text-center text-gray-500 py-4">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        `:""}
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s),t){const o=new MutationObserver(()=>{document.body.contains(s)||(t.disabled=!1,o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})}setTimeout(()=>{const o=document.getElementById("visit-person-type"),l=document.getElementById("visit-employee-code"),r=document.getElementById("visit-history-tbody"),c=()=>{if(!r)return;const A=o?.value||"employee",D=l?.value.trim();if(A!=="employee"||!D){r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';return}const b=(AppState.appData.clinicVisits||[]).filter(S=>S.personType==="employee"&&(S.employeeCode===D||S.employeeNumber===D)).sort((S,L)=>new Date(L.visitDate||L.createdAt)-new Date(S.visitDate||S.createdAt)).slice(0,10);b.length===0?r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':r.innerHTML=b.map(S=>`
                        <tr>
                            <td>${S.visitDate?Utils.escapeHTML(Utils.formatDateTime(S.visitDate)):"-"}</td>
                            <td>${S.exitDate?Utils.escapeHTML(Utils.formatDateTime(S.exitDate)):"-"}</td>
                            <td>${Utils.escapeHTML(S.reason||"-")}</td>
                            <td>${Utils.escapeHTML(S.diagnosis||"-")}</td>
                            <td>${Utils.escapeHTML(S.treatment||"-")}</td>
                            <td>${Utils.escapeHTML(S.employeeLocation||S.workArea||"-")}</td>
                        </tr>
                    `).join("")};if(l&&r&&(l.addEventListener("blur",c),l.addEventListener("input",()=>{l.value.trim().length>=3&&c()})),o&&o.addEventListener("change",()=>{const A=document.querySelector("#visit-history-table")?.closest(".mt-6");A&&(A.style.display=o.value==="employee"?"block":"none"),o.value==="employee"&&c()}),e&&e.employeeCode&&c(),e?.personType==="contractor"){const A=document.getElementById("visit-contractor-name-select");A&&(Clinic.loadContractorsIntoSelect(A),(e.employeeName||e.contractorName)&&(A.value=e.employeeName||e.contractorName||""))}typeof Clinic.handlePersonTypeChange=="function"&&Clinic.handlePersonTypeChange(),typeof Clinic.setupClinicWorkplaceDatalist=="function"&&(Clinic.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),Clinic.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"));const p=document.getElementById("visit-contractor-name-select"),f=document.getElementById("visit-contractor-workers-datalist");if(p&&f){const A=()=>{const D=(p.value||"").trim(),b=Clinic.getContractorWorkerSuggestions(D);f.innerHTML=b.map(S=>`<option value="${Utils.escapeHTML(S)}"></option>`).join("")};p.addEventListener("input",A),p.addEventListener("change",A)}const d=document.getElementById("visit-medication-select"),m=document.getElementById("visit-medications-list"),u=document.getElementById("visit-add-medication-btn"),g=document.getElementById("visit-medication-quantity"),y=document.getElementById("visit-medications-datalist");let h=e?.medications&&Array.isArray(e.medications)?[...e.medications]:[];const x=()=>{if(!d||!y)return;const A=this.getMedications().filter(b=>(b.remainingQuantity??b.quantity??0)<=0?!1:!h.some(C=>C.medicationId===b.id)),D={};y.innerHTML=A.map(b=>{const S=b.remainingQuantity??b.quantity??0,L=`${b.name||""} (\u0645\u062A\u0648\u0641\u0631: ${S})`,C=String(b.name||"").toLowerCase().trim();return C&&(D[C]=b.id),`<option value="${Utils.escapeHTML(L)}"></option>`}).join(""),d.dataset.nameToId=JSON.stringify(D),d.dataset.selectedId=""},T=()=>{if(m){if(h.length===0){m.innerHTML="";return}m.innerHTML=h.map((A,D)=>{const b=this.getMedications().find(S=>S.id===A.medicationId);return`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-med-id="${A.medicationId||""}">
                            <div>
                                <span class="font-medium">${Utils.escapeHTML(A.medicationName||b?.name||"")}</span>
                                <span class="text-sm text-gray-600 mr-2">\xD7 ${A.quantity||1}</span>
                            </div>
                            <button type="button" class="btn-icon btn-icon-danger btn-xs" data-remove-med="${D}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `}).join(""),m.querySelectorAll("[data-remove-med]").forEach(A=>{A.addEventListener("click",()=>{const D=parseInt(A.getAttribute("data-remove-med"),10);h.splice(D,1),T(),x()})})}};u&&d&&g&&u.addEventListener("click",()=>{const D=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),b=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})(),S=d.dataset.selectedId||b[String(D).toLowerCase().trim()]||"",L=parseInt(g.value,10)||1;if(!S){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062F\u0648\u0627\u0621");return}const C=this.getMedications().find(j=>j.id===S);if(!C){Notification.error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const I=C.remainingQuantity??C.quantity??0,E=h.filter(j=>j.medicationId===S).reduce((j,v)=>j+(v.quantity||0),0);if(E+L>I){Notification.error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${I-E}`);return}h.push({medicationId:S,medicationName:C.name||"",quantity:L}),g.value="1",d.value="",T(),x()}),d&&!d.hasAttribute("data-datalist-attached")&&(d.setAttribute("data-datalist-attached","true"),d.addEventListener("input",()=>{const D=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),b=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();d.dataset.selectedId=b[String(D).toLowerCase().trim()]||""}),d.addEventListener("blur",()=>{try{const A=(d.value||"").trim();if(!A)return;const D=A.replace(/\s*\(.*\)\s*$/,"").trim(),b=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();!!(d.dataset.selectedId||b[String(D).toLowerCase().trim()])||(d.value="",d.dataset.selectedId="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"))}catch{}})),x(),T()},300);const a=s.querySelector("#visit-form");a.addEventListener("submit",async o=>{o.preventDefault(),this.clearVisitFormAlert();const l=a?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const c=document.getElementById("visit-person-type"),p=document.getElementById("visit-date"),f=document.getElementById("visit-exit-date");if(!c||!p||!f){this.showVisitFormAlert("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),l&&(l.disabled=!1,l.innerHTML=r);return}const d=String(c.value||"").trim().toLowerCase(),m=d==="employee"?"employee":"contractor",u=p.value,g=f.value,y=document.getElementById("visit-contractor-worker")?.value.trim()||"",h=m==="employee"?document.getElementById("visit-employee-location")?.value.trim()||"":document.getElementById("visit-work-area")?.value.trim()||"",x=m==="contractor"?document.getElementById("visit-contractor-position")?.value.trim()||"":null;let T="";if(d==="contractor"){const $=document.getElementById("visit-contractor-name-select"),R=document.getElementById("visit-employee-name");if(T=$?($.value||"").trim():R?(R.value||"").trim():"",$){const F=(()=>{try{return JSON.parse($.dataset.allowedValues||"[]")}catch{return[]}})();if(T&&!F.includes(T.toLowerCase().trim())){this.showVisitFormAlert("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"),l&&(l.disabled=!1,l.innerHTML=r);return}}}else{const $=document.getElementById("visit-employee-name");T=$?($.value||"").trim():""}const A=document.getElementById("visit-medications-list"),D=[];A&&A.querySelectorAll("[data-med-id]").forEach($=>{const R=$.getAttribute("data-med-id");if(!R)return;const F=$.textContent.match(/×\s*(\d+)/),Q=F?parseInt(F[1],10):1,B=$.querySelector(".font-medium"),O=B?B.textContent.trim():"";D.push({medicationId:R,medicationName:O,quantity:Q})});const b=m==="employee"?document.getElementById("visit-factory")?.value.trim()||null:document.getElementById("visit-contractor-factory")?.value.trim()||null;let S=null;if(b){const R=this.getSiteOptions().find(F=>F.id===b);S=R?R.name:null}let L=null,C=null;if(u&&u.trim())try{const[$,R]=u.split("T");if($&&R){const[F,Q,B]=$.split("-").map(Number),[O,M]=R.split(":").map(Number),k=new Date(F,Q-1,B,O,M,0,0);isNaN(k.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",u):L=k.toISOString()}else{const F=new Date(u);isNaN(F.getTime())||(L=F.toISOString())}}catch($){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",$)}if(g&&g.trim())try{const[$,R]=g.split("T");if($&&R){const[F,Q,B]=$.split("-").map(Number),[O,M]=R.split(":").map(Number),k=new Date(F,Q-1,B,O,M,0,0);isNaN(k.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",g):C=k.toISOString()}else{const F=new Date(g);isNaN(F.getTime())||(C=F.toISOString())}}catch($){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",$)}const I=AppState.currentUser,E=(I?.email||"").toLowerCase().trim(),U=(AppState.appData.users||[]).find($=>($.email||"").toLowerCase().trim()===E)?.name||I?.name||E||"\u0645\u0633\u062A\u062E\u062F\u0645",N={id:e?.id||Utils.generateId("CLINIC_VISIT"),personType:m,employeeName:m==="employee"?T:null,employeeCode:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeeNumber:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeePosition:m==="employee"?document.getElementById("visit-employee-position")?.value.trim()||"":x||null,contractorPosition:x||null,employeeDepartment:m==="employee"?document.getElementById("visit-employee-department")?.value.trim()||"":null,factory:b,factoryName:S,employeeLocation:m==="employee"?h:null,contractorName:m==="contractor"?T:null,contractorWorkerName:m==="contractor"?y:null,externalName:null,workArea:h||null,visitDate:L,exitDate:C,visitType:document.getElementById("visit-type")?.value?.trim()||null,reason:document.getElementById("visit-reason").value.trim(),diagnosis:document.getElementById("visit-diagnosis").value.trim(),treatment:document.getElementById("visit-treatment").value.trim(),medications:D.length>0?D:null,createdAt:e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:e?.createdBy||U,updatedBy:U,email:E,userId:I?.id||""};Loading.show();try{const $=q=>{const _={};return(Array.isArray(q)?q:[]).forEach(P=>{const X=P&&(P.medicationId||P.id)?String(P.medicationId||P.id):"";if(!X)return;const Y=parseInt(P.quantity,10)||0;_[X]=(_[X]||0)+Y}),_},R=i?this.normalizeVisitMedications(e?.medications):[],F=$(R),Q=$(D),B=[];new Set([...Object.keys(F),...Object.keys(Q)]).forEach(q=>{const _=(Q[q]||0)-(F[q]||0);_!==0&&B.push({medicationId:q,delta:_})});const M=B.length>0,k=M?this.getMedications():[];if(M)for(const q of B){if(q.delta<=0)continue;const _=k.find(X=>String(X.id)===String(q.medicationId));if(!_)throw new Error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646");const P=parseInt(_.remainingQuantity??_.quantity??0,10)||0;if(P<q.delta){const X=_.name||_.medicationName||"\u062F\u0648\u0627\u0621";throw new Error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621: ${X}. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${P}`)}}if(i){const q=AppState.appData.clinicVisits.findIndex(_=>_.id===e.id);q!==-1&&(AppState.appData.clinicVisits[q]=N)}else AppState.appData.clinicVisits.push(N);if(M){for(const q of B){const _=k.find(ee=>String(ee.id)===String(q.medicationId));if(!_)continue;const P=parseInt(_.remainingQuantity??_.quantity??0,10)||0;if(!(typeof _.quantityAdded=="number"&&_.quantityAdded>0)&&q.delta>0){const ee=parseInt(_.quantity??0,10)||0;_.quantityAdded=Math.max(ee,P+q.delta)}let Y=P-q.delta;Y=Math.max(0,Y);const te=typeof _.quantityAdded=="number"&&_.quantityAdded>0?_.quantityAdded:typeof _.quantity=="number"&&_.quantity>0?_.quantity:null;te!==null&&(Y=Math.min(te,Y)),_.remainingQuantity=Y}AppState.appData.medications=k,AppState.appData.clinicMedications=k,AppState.appData.clinicInventory=k}try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues()}catch(q){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",q)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const q=this.getMonthlyVisitsAlertThreshold(),_=this.getMonthlyVisitCountForPerson(N);if(_>=q){const P=(N.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+P+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+q+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(N,_).catch(function(X){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",X)})}}catch(q){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",q)}Loading.hide(),Notification.success(`\u062A\u0645 ${i?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),s.remove();const V=6e4;(async()=>{try{const q=M&&B.length>0?B.map(_=>({medicationId:String(_.medicationId),delta:Number(_.delta)||0})):null;if(i){const _={...N};q&&(_.medicationAdjustments=q);const P=await GoogleIntegration.sendRequest({action:"updateClinicVisit",data:{visitId:e.id,updateData:_,__timeoutMs:V}});this.assertClinicVisitRpcResult(P)}else{const _={...N,__timeoutMs:V};q&&(_.medicationAdjustments=q);const P=await GoogleIntegration.sendRequest({action:"addClinicVisit",data:_});this.assertClinicVisitRpcResult(P),this.applyClinicVisitIdFromServer(N,P)}M&&(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}).then(_=>{if(_&&_.success&&Array.isArray(_.data)){const P=_.data.map(X=>this.normalizeMedicationRecord(X));if(AppState.appData.medications=P,AppState.appData.clinicMedications=P,AppState.appData.clinicInventory=P,Utils.safeLog("\u2705 [CLINIC] \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0645\u064F\u062D\u062F\u064E\u0651\u062B\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+P.length+" \u062F\u0648\u0627\u0621"),this.state&&this.state.activeTab==="medications")try{this.renderMedicationsTab()}catch{}}}).catch(()=>{}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062A\u062D\u062F\u064A\u062B",data:{updated:B.length}}}))),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"clinicVisits",action:i?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:N}})),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(q){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",q);try{typeof window.DataManager<"u"&&window.DataManager.addToPendingSync&&window.DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}try{const _=q&&q.message?q.message:"\u0641\u0634\u0644 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u062A\u0623\u0643\u064A\u062F \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+_+". \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645.")}catch{}}})(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]')&&this.state.activeTab==="visits"&&this.renderVisitsTab(),M&&document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab(),document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]')&&this.state.activeTab==="dispensed-medications"&&this.renderDispensedMedicationsTab();const P=document.querySelector("#total-visits");P&&(P.textContent=AppState.appData.clinicVisits.length)},100)}catch($){Loading.hide(),this.showVisitFormAlert("\u062D\u062F\u062B \u062E\u0637\u0623: "+($.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),l&&(l.disabled=!1,l.innerHTML=r)}}),s.addEventListener("click",o=>{o.target===s&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s.remove()})},async showMedicationForm(e=null){this.ensureData();const t=!!e,i=document.createElement("div");i.className="modal-overlay";const n=(m="")=>Utils.escapeHTML(m||""),s=e?.purchaseDate?new Date(e.purchaseDate).toISOString().slice(0,10):"",a=e?.expiryDate?new Date(e.expiryDate).toISOString().slice(0,10):"",o=this.calculateMedicationStatus(e||{});i.innerHTML=`
            <div class="modal-content" style="max-width: 780px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621":"\u062A\u0633\u062C\u064A\u0644 \u062F\u0648\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="medication-form" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-name" required class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" value="${n(e?.name||e?.medicationName)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-type" required class="form-input" placeholder="\u062D\u0628\u0648\u0628\u060C \u0634\u0631\u0627\u0628\u060C \u062D\u0642\u0646..." value="${n(e?.type||e?.medicationType)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</label>
                                <input type="text" id="med-usage" class="form-input" placeholder="\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u062F\u0648\u0627\u0621" value="${n(e?.usage||e?.notes||"")}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 *</label>
                                <input type="date" id="med-purchase" required class="form-input" value="${s}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</label>
                                <input type="date" id="med-expiry" class="form-input" value="${a}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 *</label>
                                <input type="number" id="med-quantity" required class="form-input" min="0" placeholder="\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629" value="${e?.quantityAdded??e?.quantity??0}">
                        </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629 *</label>
                                <input type="number" id="med-remaining" required class="form-input" min="0" placeholder="\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629" value="${e?.remainingQuantity??e?.quantity??0}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646</label>
                                <input type="text" id="med-location" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u063A\u0631\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629" value="${n(e?.location)}">
                            </div>
                            <div class="flex flex-col justify-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <span class="text-sm font-semibold text-gray-700 mb-1">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</span>
                                <span id="med-status-badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(o.status)}">
                                    <i class="fas fa-info-circle"></i>
                                    ${o.status||"\u0633\u0627\u0631\u064A"}
                                </span>
                                <span id="med-status-hint" class="text-xs text-gray-500 mt-2">${this.getMedicationStatusHint(o)}</span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629</label>
                            <textarea id="med-notes" class="form-input" rows="3" placeholder="\u0623\u062F\u062E\u0644 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0648 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629">${n(e?.notes)}</textarea>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(i);const l=i.querySelector("#medication-form"),r=l.querySelector("#med-purchase"),c=l.querySelector("#med-expiry"),p=l.querySelector("#med-status-badge"),f=l.querySelector("#med-status-hint"),d=()=>{const m=this.calculateMedicationStatus({expiryDate:c.value?new Date(c.value).toISOString():null});p.className=`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(m.status)}`,p.innerHTML=`<i class="fas fa-info-circle"></i>${m.status}`,f.textContent=this.getMedicationStatusHint(m)};c?.addEventListener("change",d),l.addEventListener("submit",async m=>{m.preventDefault();const u=l.querySelector("#med-name").value.trim(),g=l.querySelector("#med-type").value.trim(),y=l.querySelector("#med-usage")?.value.trim()||"",h=l.querySelector("#med-purchase").value,x=l.querySelector("#med-expiry").value,T=parseInt(l.querySelector("#med-quantity").value,10)||0,A=parseInt(l.querySelector("#med-remaining").value,10)||0,D=l.querySelector("#med-location").value.trim(),b=l.querySelector("#med-notes").value.trim(),S=e?.createdAt||new Date().toISOString(),L=e?.createdBy||this.getCurrentUserSummary(),C=h?new Date(h).toISOString():new Date().toISOString(),I=x?new Date(x).toISOString():"",E=this.calculateMedicationStatus({expiryDate:I}),j=this.getCurrentUserSummary(),v=this.normalizeMedicationRecord({id:e?.id||Utils.generateId("MED"),name:u,type:g,usage:y,purchaseDate:C,expiryDate:I,quantityAdded:T,remainingQuantity:A,location:D,notes:b,createdAt:S,createdBy:L,createdById:L?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:j,status:E.status,daysRemaining:E.daysRemaining});Loading.show();try{const U=AppState.appData.medications||[];if(t){const N=U.findIndex($=>$.id===v.id);N!==-1?U[N]=v:U.push(v)}else U.push(v);AppState.appData.medications=U,AppState.appData.clinicMedications=U,AppState.appData.clinicInventory=U;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(N){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u062F\u0648\u0627\u0621):",N)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),i.remove(),this.state.medicationAlertsNotified.delete(v.id),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab();const $=document.querySelector("#total-medications");$&&($.textContent=U.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:v.id,updateData:v}}):await GoogleIntegration.sendRequest({action:"addMedication",data:v}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:v}}))}catch(N){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL:",N)}})()}catch(U){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+U.message)}}),i.addEventListener("click",m=>{m.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()})},async viewVisit(e){this.ensureData();const t=AppState.appData.clinicVisits.find(f=>f.id===e);if(!t)return;t.createdBy||(t.createdBy=null),t.updatedBy||(t.updatedBy=null);const i=t.personType==="employee"?"\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",n=t.personType==="employee"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629",s=t.employeeName||t.contractorName||t.externalName||"",a=(t.personType==="contractor"||t.personType==="external")&&t.contractorWorkerName?`
                <div class="col-span-2">
                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639:</label>
                    <p class="text-gray-800">${Utils.escapeHTML(t.contractorWorkerName)}</p>
                </div>
            `:"",o=t.personType==="employee"?"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644":"\u0645\u0646\u0637\u0642\u0629 / \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",l=t.personType==="employee"?t.employeeLocation:t.workArea,r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</span>',c=t.medications&&Array.isArray(t.medications)&&t.medications.length>0?t.medications.map(f=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(f.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${f.quantity||1}</span>
                </div>
            `).join(""):'<p style="color: #999; font-style: italic;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629</p>',p=document.createElement("div");p.className="modal-overlay",p.innerHTML=`
            <div class="modal-content" style="max-width: 1100px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; border-radius: 20px 20px 0 0;">
                    <h2 class="modal-title" style="color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-clipboard-list" style="font-size: 28px;"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                    </h2>
                    <button class="modal-close" style="color: white; font-size: 24px; background: rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 12px; transition: all 0.3s;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 30px; background: #f8f9fa;">
                    <div class="space-y-6">
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #667eea; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-user-circle" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-users"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">
                                        <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${i}</span>
                                    </p>
                                </div>
                                ${t.personType==="employee"&&(t.employeeCode||t.employeeNumber)?`
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-id-card"></i>
                                        \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"")}</p>
                                </div>
                                `:""}
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user"></i>
                                        ${n}
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(s)}</p>
                                </div>
                                ${t.personType==="employee"&&t.employeePosition?`
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-briefcase"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeePosition)}</p>
                                </div>
                                `:""}
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-map-marker-alt"></i>
                                        ${o}
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(l||"-")}</p>
                                </div>
                                ${a?`
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user-tie"></i>
                                        \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.contractorWorkerName)}</p>
                                </div>
                                `:""}
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #fc6c85; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-calendar-check" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-clock"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${t.visitDate?Utils.escapeHTML(Utils.formatDateTime(t.visitDate)):"-"}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-sign-out-alt"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${r}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-hourglass-half"></i>
                                        \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Clinic.calculateTotalTime(t.visitDate,t.exitDate)}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user-check"></i>
                                        \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!t.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof t.createdBy=="object")return Utils.escapeHTML(t.createdBy.name||t.createdBy.email||t.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const f=String(t.createdBy).trim();if(f==="\u0627\u0644\u0646\u0638\u0627\u0645"||f===""){const d=(t.email||"").toString().trim();if(d&&d!=="")return Utils.escapeHTML(d);const m=(AppState.currentUser?.email||"").toString().trim();return m&&m!==""?Utils.escapeHTML(m):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(f)})()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C -->
                        <div class="form-section" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #4facfe; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-stethoscope" style="font-size: 24px;"></i>
                                \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C
                            </h3>
                            
                            <div class="space-y-4">
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-question-circle"></i>
                                        \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6;">${Utils.escapeHTML(t.reason||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-diagnoses"></i>
                                        \u0627\u0644\u062A\u0634\u062E\u064A\u0635
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(t.diagnosis||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #4facfe;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #4facfe; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-pills"></i>
                                        \u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(t.treatment||"-")}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 -->
                        ${t.medications&&Array.isArray(t.medications)&&t.medications.length>0?`
                        <div class="form-section" style="background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #009688; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-prescription-bottle-alt" style="font-size: 24px;"></i>
                                \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629
                            </h3>
                            <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #009688;">
                                ${c}
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
                
                <div class="modal-footer form-actions-centered" style="background: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e2e8f0; border-radius: 0 0 20px 20px;">
                    <button class="btn-secondary" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
                    </button>
                    <button class="btn-primary" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4);" onclick="Clinic.showVisitForm(${JSON.stringify(t).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    <button class="btn-success" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(17, 153, 142, 0.4);" onclick="Clinic.exportVisitToPDF(${JSON.stringify(t).replace(/"/g,"&quot;")});">
                        <i class="fas fa-file-pdf ml-2"></i>\u0637\u0628\u0627\u0639\u0629
                    </button>
                    ${this.isCurrentUserAdmin()?`
                    <button class="btn-danger" style="background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(235, 51, 73, 0.4);" onclick="if(confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F')) { Clinic.deleteVisit('${t.id}'); this.closest('.modal-overlay').remove(); }">
                        <i class="fas fa-trash-alt ml-2"></i>\u062D\u0630\u0641
                    </button>
                    `:`
                    <button class="btn-warning" style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(245, 158, 11, 0.4);" onclick="Clinic.requestVisitDeletion('${t.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-paper-plane ml-2"></i>\u0637\u0644\u0628 \u062D\u0630\u0641
                    </button>
                    `}
                </div>
            </div>
        `,document.body.appendChild(p),p.addEventListener("click",f=>{f.target===p&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&p.remove()})},printVisitsList(){const e=AppState.appData.clinicVisits.slice().reverse();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const i=`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</title>
                <style>
                    @media print {
                        @page { margin: 1cm; size: A4 landscape; }
                        body { margin: 0; padding: 0; }
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        direction: rtl;
                        padding: 20px;
                    }
                    h1 {
                        text-align: center;
                        color: #1f2937;
                        margin-bottom: 20px;
                        font-size: 24px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        font-size: 11px;
                    }
                    th, td {
                        border: 1px solid #d1d5db;
                        padding: 8px;
                        text-align: right;
                    }
                    th {
                        background-color: #f3f4f6;
                        font-weight: bold;
                        color: #1f2937;
                    }
                    tr:nth-child(even) {
                        background-color: #f9fafb;
                    }
                </style>
            </head>
            <body>
                <h1>\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h1>
                <table>
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                            <th>\u0627\u0644\u0627\u0633\u0645</th>
                            <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <th>\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644</th>
                            <th>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                            <th>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                            <th>\u0627\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</th>
                            <th>\u0627\u0644\u0633\u0628\u0628</th>
                            <th>\u0627\u0644\u062A\u0634\u062E\u064A\u0635</th>
                            <th>\u0627\u0644\u0627\u062C\u0631\u0627\u0621</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(s=>{const a=s.employeeCode||s.employeeNumber||"-",o=s.employeeName||s.contractorName||s.externalName||"",l=s.contractorWorkerName?` (${s.contractorWorkerName})`:"",r=s.employeePosition||"-",c=s.employeeLocation||s.workArea||"-",p=s.visitDate?Utils.formatDateTime(s.visitDate):"-",f=s.exitDate?Utils.formatDateTime(s.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",d=Clinic.calculateTotalTime(s.visitDate,s.exitDate),m=s.reason||"",u=s.diagnosis||"",g=s.treatment||"";return`
                <tr>
                    <td>${a}</td>
                    <td>${o}${l}</td>
                    <td>${r}</td>
                    <td>${c}</td>
                    <td>${p}</td>
                    <td>${f}</td>
                    <td>${d}</td>
                    <td>${m}</td>
                    <td>${u}</td>
                    <td>${g}</td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
                <p style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
                    \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ${Utils.formatDateTime(new Date)}
                </p>
            </body>
            </html>
        `;Utils.printHtmlContent("\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",i)&&Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},exportVisitsToExcel(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",i=(AppState.appData.clinicVisits||[]).slice().reverse(),n=i.filter(o=>o.personType==="employee"||!o.personType),s=i.filter(o=>o.personType==="contractor"),a=e==="employees"?n:s;if(a.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}try{const o=a.map(p=>{const f=t?p.contractorName||p.employeeName||p.externalName||"-":p.employeeCode||p.employeeNumber||"-",d=t?p.contractorWorkerName||"-":p.employeeName||"-",m=p.employeePosition||p.contractorPosition||"-",u=this.getVisitFactoryDisplayName(p),g=t?p.workArea||p.employeeLocation||"-":p.employeeLocation||p.workArea||"-",y=p.visitDate?Utils.formatDateTime(p.visitDate):"-",h=p.exitDate?Utils.formatDateTime(p.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",x=this.calculateTotalTime(p.visitDate,p.exitDate),T=p.reason||"",A=p.diagnosis||"",D=this.normalizeVisitMedications(p.medications),b=D.length>0?D.map(C=>`${C.medicationName||""} (${C.quantity||1})`).join("\u060C "):"-",S=D.length>0?D.reduce((C,I)=>C+(parseInt(I.quantity,10)||0),0):0,L={};return L[t?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]=f,L.\u0627\u0644\u0627\u0633\u0645=d,L.\u0627\u0644\u0648\u0638\u064A\u0641\u0629=m,L.\u0627\u0644\u0645\u0635\u0646\u0639=u,L["\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"]=g,L["\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644"]=y,L["\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C"]=h,L["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A"]=x,L["\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"]=T,L.\u0627\u0644\u062A\u0634\u062E\u064A\u0635=A,L["\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=b,L["\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=S,L}),l=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(o);r["!cols"]=[{wch:18},{wch:25},{wch:20},{wch:16},{wch:20},{wch:20},{wch:20},{wch:15},{wch:25},{wch:25},{wch:30},{wch:14}],XLSX.utils.book_append_sheet(l,r,`\u0633\u062C\u0644\u0627\u062A_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}`);const c=`\u0633\u062C\u0644\u0627\u062A_\u0627\u0644\u0632\u064A\u0627\u0631\u0629_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}_\u0627\u0644\u0639\u064A\u0627\u062F\u0629_\u0627\u0644\u0637\u0628\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(l,c),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+o.message)}},async exportVisitsToPDF(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",i=(AppState.appData.clinicVisits||[]).slice().reverse(),n=i.filter(o=>o.personType==="employee"||!o.personType),s=i.filter(o=>o.personType==="contractor"),a=e==="employees"?n:s;if(a.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const o=a.map(u=>{const g=t?u.contractorName||u.employeeName||u.externalName||"-":u.employeeCode||u.employeeNumber||"-",y=t?u.contractorWorkerName||"-":u.employeeName||"-",h=t?u.contractorPosition||u.employeePosition||"-":u.employeePosition||"-",x=this.getVisitFactoryDisplayName(u),T=t?u.workArea||u.employeeLocation||"-":u.employeeLocation||u.workArea||"-",A=u.visitDate?Utils.formatDateTime(u.visitDate):"-",D=u.exitDate?Utils.formatDateTime(u.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",b=Clinic.calculateTotalTime(u.visitDate,u.exitDate),S=u.reason||"",L=u.diagnosis||"",C=this.normalizeVisitMedications(u.medications),I=C.length>0?C.map(j=>`${Utils.escapeHTML(j.medicationName||"")} (${j.quantity||1})`).join("\u060C "):"-",E=C.length>0?C.reduce((j,v)=>j+(parseInt(v.quantity,10)||0),0):0;return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(g)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(x)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(T)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(A)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(D)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(b)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(S)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(L)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${I}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${Utils.escapeHTML(String(E))}</td>
                    </tr>
                `}).join(""),l=`CLINIC-VISITS-${new Date().toISOString().slice(0,10)}`,r="\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",c=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 14px;">
                        \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A: ${a.length}
                    </p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">${t?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0627\u0633\u0645</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u062A\u0634\u062E\u064A\u0635</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</th>
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o}
                    </tbody>
                </table>
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,r,c,!1,!0,{source:"ClinicVisits"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body>${c}</body></html>`,f=new Blob([p],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(f),m=window.open(d,"_blank");m?m.onload=()=>{setTimeout(()=>{m.print(),setTimeout(()=>{URL.revokeObjectURL(d)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(d),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async exportVisitToPDF(e){if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const t=e.personType==="employee"?"\u0645\u0648\u0638\u0641":e.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",i=e.employeeCode||e.employeeNumber||"-",n=e.employeeName||e.contractorName||e.externalName||"",s=e.contractorWorkerName?` (${e.contractorWorkerName})`:"",a=e.employeePosition||e.contractorPosition||"-",o=e.employeeLocation||e.workArea||"-",l=e.visitDate?Utils.formatDateTime(e.visitDate):"-",r=e.exitDate?Utils.formatDateTime(e.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",c=this.calculateTotalTime(e.visitDate,e.exitDate),p=e.reason||"",f=e.diagnosis||"",d=e.treatment||"",m=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(D=>`${Utils.escapeHTML(D.medicationName||"")} (${D.quantity||1})`).join("\u060C "):"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",u=`CLINIC-VISIT-${e.id||new Date().toISOString().slice(0,10)}`,g="\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",y=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px;">
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6; width: 30%;">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; width: 70%;">${Utils.escapeHTML(t)}</td>
                    </tr>
                    ${i!=="-"?`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(i)}</td>
                    </tr>
                    `:""}
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0627\u0633\u0645</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(n)}${Utils.escapeHTML(s)}</td>
                    </tr>
                    ${a!=="-"?`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(a)}</td>
                    </tr>
                    `:""}
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(o)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(l)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(r)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(c)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(p)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u062A\u0634\u062E\u064A\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(f)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(d)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${m}</td>
                    </tr>
                </table>
            `,h=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(u,g,y,!1,!0,{source:"ClinicVisit"},e.visitDate||e.createdAt||new Date().toISOString(),e.updatedAt||e.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${g}</title></head><body>${y}</body></html>`,x=new Blob([h],{type:"text/html;charset=utf-8"}),T=URL.createObjectURL(x),A=window.open(T,"_blank");A?A.onload=()=>{setTimeout(()=>{A.print(),setTimeout(()=>{URL.revokeObjectURL(T)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(T),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(t){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message)}},async ensureApprovalsDataLoaded({force:e=!1}={}){return this._approvalsLoadPromise&&!e?this._approvalsLoadPromise:(this._approvalsLoadPromise=(async()=>{if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){this._approvalsBackendFetchOk=!0;return}const i=GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}),n=GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}),s=GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}),a=GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}}),[o,l,r,c]=await Promise.allSettled([Utils.promiseWithTimeout(i,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),Utils.promiseWithTimeout(n,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C"),Utils.promiseWithTimeout(s,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"),Utils.promiseWithTimeout(a,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A")]),p=o.status==="fulfilled"?o.value:null,f=l.status==="fulfilled"?l.value:null,d=r.status==="fulfilled"?r.value:null,m=c.status==="fulfilled"?c.value:null,u=Array.isArray(p?.data)?p.data:[],g=Array.isArray(f?.data)?f.data:[],y=Array.isArray(d?.data)?d.data:[],h=Array.isArray(m?.data)?m.data:[];(u.length>0||!(Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0))&&(AppState.appData.clinicMedicationDeletionRequests=u),(g.length>0||!(Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0))&&(AppState.appData.clinicSupplyRequests=g),(y.length>0||!(Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0))&&(AppState.appData.clinicVisitDeletionRequests=y),(h.length>0||!(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0)||c.status==="fulfilled"&&m&&m.success!==!1)&&(AppState.appData.clinicStaffTimeOffRequests=h);try{localStorage.setItem("clinic_approvals_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(x){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic approvals: \u0641\u0634\u0644 DataManager.save \u0628\u0639\u062F \u062C\u0644\u0628 \u0627\u0644\u0640 approvals:",x)}this._approvalsBackendFetchOk=!0})().finally(()=>{this._approvalsLoadPromise=null}),this._approvalsLoadPromise)},async renderApprovalsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="approvals"]');if(!e){Utils.safeError("\u274C \u0644\u0648\u062D\u0629 approvals \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}e.innerHTML='<div class="text-center py-8"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="mt-2">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0636\u064A\u0631...</p></div>';try{const t=(()=>{try{return localStorage.getItem("clinic_approvals_last_sync")}catch{return null}})(),i=t?Date.now()-parseInt(t,10):1/0,n=300*1e3,s=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0,a=Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0,o=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0,l=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0,r=s||a||o||l,c=i>=n;if(!c&&r&&(this._approvalsBackendFetchOk=!0),(c||!r||this._approvalsBackendFetchOk!==!0||!l)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const E=async()=>{await this.ensureApprovalsDataLoaded({force:c&&r})};r?E().then(()=>{try{this.state&&this.state.activeTab==="approvals"&&this.renderApprovalsTab()}catch{}}).catch(()=>{}):await Promise.race([E(),new Promise(j=>setTimeout(j,6e3))])}const f=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],d=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],m=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],u=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],g=f.map(E=>({...E,requestType:"deletion"})),y=d.map(E=>({...E,requestType:"supply"})),h=m.map(E=>({...E,requestType:"visit"})),x=u.map(E=>({...E,approvalKind:"timeoff"})),T=[...g,...y,...h,...x];Utils.safeLog(`\u{1F4CB} \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${g.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621 \u0648 ${y.length} \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C \u0648 ${h.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 \u0648 ${x.length} \u0637\u0644\u0628 \u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A`);const A=T.filter(E=>E.status==="pending"),D=T.filter(E=>E.status==="approved"),b=T.filter(E=>E.status==="rejected"),S=document.getElementById("pending-approvals-badge");if(S){const E=A.length;E>0?(S.textContent=E,S.style.display="inline-block"):S.style.display="none"}e.innerHTML=`
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        </h2>
                    </div>
                    <div class="card-body">
                        <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <i class="fas fa-clock text-3xl text-yellow-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</p>
                                <p class="text-2xl font-bold">${A.length}</p>
                            </div>
                            <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <i class="fas fa-check text-3xl text-green-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</p>
                                <p class="text-2xl font-bold">${D.length}</p>
                            </div>
                            <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                                <i class="fas fa-times text-3xl text-red-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0645\u0631\u0641\u0648\u0636\u0629</p>
                                <p class="text-2xl font-bold">${b.length}</p>
                            </div>
                        </div>

                        <!-- \u0641\u0644\u0627\u062A\u0631 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <select id="approvals-status-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062A</option>
                                    <option value="pending" selected>\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</option>
                                    <option value="approved">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</option>
                                    <option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639:</label>
                                <select id="approvals-type-filter" class="form-input">
                                    <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                                    <option value="deletion">\u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629</option>
                                    <option value="supply">\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C</option>
                                    <option value="visit">\u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A</option>
                                    <option value="timeoff">\u0637\u0644\u0628\u0627\u062A \u0625\u062C\u0627\u0632\u0629 / \u0625\u0630\u0646 / \u0625\u0636\u0627\u0641\u064A</option>
                                </select>
                            </div>
                        </div>

                        <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A -->
                        <div id="approvals-table-container">
                            ${this.renderApprovalsTable(A)}
                        </div>
                    </div>
                </div>
            `;const L=document.getElementById("approvals-status-filter"),C=document.getElementById("approvals-type-filter"),I=()=>{const E=L?.value||"all",j=C?.value||"all";let v=T;E!=="all"&&(v=v.filter(N=>N.status===E)),j!=="all"&&(v=v.filter(N=>this._approvalRequestMatchesTypeFilter(N,j)));const U=document.getElementById("approvals-table-container");U&&(U.innerHTML=this.renderApprovalsTable(v),this.bindApprovalsEvents())};L&&L.addEventListener("change",I),C&&C.addEventListener("change",I),this.bindApprovalsEvents(),setTimeout(()=>{const E=e.querySelector(".clinic-table-wrapper");E&&this.setupTableScrollListeners(E)},100)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",t),e.innerHTML='<div class="alert alert-error">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>'}},renderApprovalsTable(e){return!e||e.length===0?'<div class="text-center py-8 text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':`
            <div class="table-responsive clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631</th>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(i=>{const n=i.approvalKind||i.requestType||"deletion",s=n==="deletion",a=n==="supply",o=n==="visit",l=this._isApprovalTimeOffRequest(i);let r="-",c="-",p="";if(s){const g=i.medicationData||{};r=g.name||"-",c=g.type||"-",p=`\u0627\u0644\u062F\u0648\u0627\u0621: ${Utils.escapeHTML(r)}`}else if(a){r=i.itemName||"-";const g={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[i.type]||i.type||"-";c=g,p=`${g}: ${Utils.escapeHTML(r)} (${i.quantity||""} ${Utils.escapeHTML(i.unit||"")})`}else if(o){const g=i.visitData||{},y=g.employeeName||g.contractorWorkerName||g.contractorName||g.externalName||"-",h=g.personType==="employee"?"\u0645\u0648\u0638\u0641":g.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629";r=y,c=h,p=`\u0632\u064A\u0627\u0631\u0629: ${Utils.escapeHTML(y)} (${Utils.escapeHTML(h)})`}else l&&(r=i.userName||i.userEmail||"-",c=this.getTimeOffRequestTypeLabel(i.requestType),p=`${Utils.escapeHTML(c)}: ${Utils.escapeHTML(this.formatTimeOffRequestDetails(i))}`);const f=l?{name:i.userName||i.userEmail||"-"}:i.requestedBy||{},d=this.getApprovalStatusBadge(i.status),m=i.status==="pending";return`
                <tr>
                    <td>${s?'<span class="badge badge-info">\u062D\u0630\u0641 \u062F\u0648\u0627\u0621</span>':a?'<span class="badge badge-primary">\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C</span>':l?'<span class="badge badge-success">\u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A</span>':'<span class="badge badge-warning">\u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629</span>'}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${Utils.escapeHTML(c)}</td>
                    <td>${Utils.escapeHTML(f.name||"-")}</td>
                    <td>${this.formatDate(i.createdAt||i.requestDate,!0)}</td>
                    <td>${d}</td>
                    <td>
                        <div class="flex gap-2 justify-center">
                            ${m?`
                                <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${i.id}" data-type="${n}" title="\u0645\u0648\u0627\u0641\u0642\u0629">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${i.id}" data-type="${n}" title="\u0631\u0641\u0636">
                                    <i class="fas fa-times"></i>
                                </button>
                            `:""}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${i.id}" data-type="${n}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},getApprovalStatusBadge(e){switch(e){case"pending":return'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>';case"approved":return'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>';case"rejected":return'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>';default:return'<span class="badge badge-secondary">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}},bindApprovalsEvents(){document.querySelectorAll('[data-action="approve-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),i=e.getAttribute("data-type")||"deletion";this.approveRequest(t,i)})}),document.querySelectorAll('[data-action="reject-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),i=e.getAttribute("data-type")||"deletion";this.rejectRequest(t,i)})}),document.querySelectorAll('[data-action="view-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),i=e.getAttribute("data-type")||"deletion";this.viewRequestDetails(t,i)})})},async approveRequest(e,t="deletion"){const i=t==="deletion",n=t==="supply",s=t==="visit",a=t==="timeoff";if(confirm(i?`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062F\u0648\u0627\u0621\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`:n?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F":a?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A\u061F":`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F.`)){Loading.show();try{const r={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let c;if(i?c=await GoogleIntegration.sendRequest({action:"approveMedicationDeletion",data:{requestId:e,approverData:r}}):n?c=await GoogleIntegration.sendRequest({action:"approveSupplyRequest",data:{requestId:e,approverData:r,__timeoutMs:45e3}}):s?c=await GoogleIntegration.sendRequest({action:"approveClinicVisitDeletion",data:{requestId:e,approverData:r}}):a&&(c=await GoogleIntegration.sendRequest({action:"approveClinicStaffTimeOffRequest",data:{requestId:e,notes:""}})),c&&c.success){Loading.hide();const p=i?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0648\u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":n?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D":a?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A":"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D";if(Notification.success(p),a)try{const f=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});f?.success&&Array.isArray(f.data)&&(AppState.appData.clinicStaffTimeOffRequests=f.data),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0}catch{}setTimeout(()=>{this.renderApprovalsTab()},100),i&&(async()=>{try{const f=await GoogleIntegration.sendRequest({action:"getAllMedications",data:{}});f&&f.success&&(AppState.appData.medications=f.data,AppState.appData.clinicMedications=f.data,AppState.appData.clinicInventory=f.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(f){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",f)}})()}else throw new Error(c.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629: "+(r.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async rejectRequest(e,t="deletion"){const i=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(i!==null){Loading.show();try{const n={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let s;if(t==="deletion"?s=await GoogleIntegration.sendRequest({action:"rejectMedicationDeletion",data:{requestId:e,rejectorData:n,reason:i||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="supply"?s=await GoogleIntegration.sendRequest({action:"rejectSupplyRequest",data:{requestId:e,rejectorData:n,reason:i||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="visit"?s=await GoogleIntegration.sendRequest({action:"rejectClinicVisitDeletion",data:{requestId:e,rejectorData:n,reason:i||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="timeoff"&&(s=await GoogleIntegration.sendRequest({action:"rejectClinicStaffTimeOffRequest",data:{requestId:e,reason:i||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}})),s&&s.success){if(Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),t==="timeoff")try{const a=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});a?.success&&Array.isArray(a.data)&&(AppState.appData.clinicStaffTimeOffRequests=a.data)}catch{}setTimeout(()=>{this.renderApprovalsTab()},100)}else throw new Error(s.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",n),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async viewRequestDetails(e,t="deletion"){try{let i;if(t==="deletion"?i=await GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}):t==="supply"?i=await GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}):t==="visit"?i=await GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}):t==="timeoff"&&(i=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}})),!i||!i.success){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628");return}const n=i.data.find(d=>d.id===e);if(!n){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=t==="deletion",a=t==="visit",o=t==="timeoff",l=o?{name:n.userName||n.userEmail||"-"}:n.requestedBy||{},r=n.approvedBy||{},c=n.rejectedBy||{};let p="";if(s){const d=n.medicationData||{};p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(d.name||"-")}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(d.type||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${Utils.escapeHTML(d.quantity||"-")}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(d.location||"-")}</div>
                        </div>
                    </div>
                `}else if(a){const d=n.visitData||{},m=d.employeeName||d.contractorWorkerName||d.contractorName||d.externalName||"-",u=d.personType==="employee"?"\u0645\u0648\u0638\u0641":d.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",g=d.visitDate?Utils.formatDateTime(d.visitDate):"-",y=d.exitDate?Utils.formatDateTime(d.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647";p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(m)}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(u)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:</strong> ${Utils.escapeHTML(g)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:</strong> ${Utils.escapeHTML(y)}</div>
                            <div><strong>\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</strong> ${Utils.escapeHTML(d.reason||"-")}</div>
                            <div><strong>\u0627\u0644\u062A\u0634\u062E\u064A\u0635:</strong> ${Utils.escapeHTML(d.diagnosis||"-")}</div>
                        </div>
                        <div class="mt-3">
                            <button class="btn-secondary" onclick="Clinic.viewVisit('${Utils.escapeHTML(d.id||n.visitId||"")}')">
                                <i class="fas fa-eye ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </button>
                        </div>
                    </div>
                `}else if(o)p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 ${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(n.requestType))}:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0645\u0633\u0626\u0648\u0644:</strong> ${Utils.escapeHTML(n.userName||"-")}</div>
                            <div><strong>\u0627\u0644\u062F\u0648\u0631:</strong> ${Utils.escapeHTML(this.getStaffRoleLabel(n.staffRole))}</div>
                            <div><strong>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</strong> ${Utils.escapeHTML(this.formatTimeOffRequestDetails(n))}</div>
                            <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getTimeOffStatusBadge(n.status)}</div>
                            <div class="col-span-2"><strong>\u0627\u0644\u0633\u0628\u0628:</strong> ${Utils.escapeHTML(n.reason||"-")}</div>
                            ${n.reviewNotes?`<div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:</strong> ${Utils.escapeHTML(n.reviewNotes)}</div>`:""}
                        </div>
                    </div>
                `;else{const d={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[n.type]||n.type||"-",m={urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[n.priority]||"\u0639\u0627\u062F\u064A\u0629";p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0637\u0644\u0628:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</strong> ${Utils.escapeHTML(d)}</div>
                            <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631:</strong> ${Utils.escapeHTML(n.itemName||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${n.quantity||"-"} ${Utils.escapeHTML(n.unit||"")}</div>
                            <div><strong>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</strong> ${Utils.escapeHTML(m)}</div>
                            ${n.notes?`
                                <div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(n.notes)}</div>
                            `:""}
                        </div>
                    </div>
                `}const f=document.createElement("div");f.className="modal-overlay",f.innerHTML=`
                <div class="modal-content" style="max-width: 700px;">
                    <div class="modal-header modal-header-centered">
                        <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h2>
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="space-y-4">
                            ${p}
                            <div>
                                <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</h3>
                                <div class="grid grid-cols-2 gap-3">
                                    <div><strong>\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628:</strong> ${Utils.escapeHTML(l.name||"-")}</div>
                                    <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628:</strong> ${this.formatDate(n.createdAt||n.requestDate,!0)}</div>
                                    <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getApprovalStatusBadge(n.status)}</div>
                                </div>
                            </div>
                            ${n.status==="approved"?`
                                <div>
                                    <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</h3>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div><strong>\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(r.name||"-")}</div>
                                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</strong> ${this.formatDate(n.approvedAt,!0)}</div>
                                    </div>
                                </div>
                            `:""}
                            ${n.status==="rejected"?`
                                <div>
                                    <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0631\u0641\u0636:</h3>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div><strong>\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(c.name||"-")}</div>
                                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636:</strong> ${this.formatDate(n.rejectedAt,!0)}</div>
                                        ${n.rejectionReason?`
                                            <div class="col-span-2"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</strong> ${Utils.escapeHTML(n.rejectionReason)}</div>
                                        `:""}
                                    </div>
                                </div>
                            `:""}
                        </div>
                    </div>
                    <div class="modal-footer form-actions-centered">
                        <button class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            `,document.body.appendChild(f),f.querySelectorAll(".modal-close, .modal-close-btn").forEach(d=>{d.addEventListener("click",()=>f.remove())}),f.addEventListener("click",d=>{d.target===f&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&f.remove()})}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}},refreshOnLanguageChange(){if(this.state&&this.state.initialized)try{this.renderActiveTabContent()}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0644\u063A\u0629:",e)}},_injectClinicAttendanceIdentityStyles(){try{if(document.getElementById("clinic-attendance-identity-styles"))return;const e=document.createElement("style");e.id="clinic-attendance-identity-styles",e.textContent=`
                #clinic-attendance-root {
                    --c-navy: #0b2a55;
                    --c-blue: #1e40af;
                    --c-blue2: #2563eb;
                }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0623\u0633\u0637\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 */
                #clinic-attendance-root .content-card {
                    border-radius: 16px; border-color: #dce7f5 !important;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                }
                #clinic-attendance-root .card-header {
                    background: linear-gradient(90deg, #0b2a55, #1e40af) !important;
                    border-bottom: none; border-radius: 16px 16px 0 0;
                    padding: 14px 18px !important;
                }
                #clinic-attendance-root .card-header .card-title,
                #clinic-attendance-root .card-header h4 { color: #ffffff !important; font-weight: 800; }
                #clinic-attendance-root .card-header .card-title i,
                #clinic-attendance-root .card-header h4 i { color: #fde68a; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 (\u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0631\u0624\u0648\u0633 \u0627\u0644\u062E\u0636\u0631\u0627\u0621 \u0627\u0644\u0642\u062F\u064A\u0645\u0629) */
                #clinic-attendance-root .data-table thead th,
                #clinic-attendance-root .table-header-green thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb) !important; color: #ffffff !important;
                    font-weight: 700; white-space: nowrap; border: none !important;
                }
                #clinic-attendance-root .data-table tbody tr:hover td { background: #f2f7ff !important; }
                #clinic-attendance-root .data-table td { vertical-align: middle; }
                /* \u2705 \u0627\u0644\u0647\u0648\u064A\u0629 \u2014 \u0646\u0645\u0648\u0630\u062C \u0637\u0644\u0628 \u062C\u062F\u064A\u062F (\u062F\u0627\u062E\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u062F\u0627\u0644) */
                #clinic-attendance-root #timeoff-request-form button[type="submit"],
                #clinic-timeoff-request-modal #timeoff-request-form button[type="submit"],
                #clinic-timeoff-request-modal #clinic-timeoff-submit-btn {
                    background: linear-gradient(135deg,#fbbf24,#f59e0b) !important; color: #7c2d12; border: none;
                    font-weight: 800; box-shadow: 0 6px 18px rgba(0,0,0,.18);
                }
                #clinic-attendance-root #timeoff-request-form .form-input,
                #clinic-attendance-root #timeoff-request-form .form-textarea,
                #clinic-timeoff-request-modal .form-input,
                #clinic-timeoff-request-modal .form-textarea {
                    border-radius: 10px; border-color: #cbd5e1;
                }
                #clinic-attendance-root #timeoff-request-form .form-input:focus,
                #clinic-attendance-root #timeoff-request-form .form-textarea:focus,
                #clinic-timeoff-request-modal .form-input:focus,
                #clinic-timeoff-request-modal .form-textarea:focus {
                    border-color: var(--c-blue2, #2563eb); box-shadow: 0 0 0 3px rgba(37,99,235,.12);
                }
                #clinic-timeoff-request-modal .modal-body label {
                    font-weight: 700 !important; color: #334155;
                }
            `,document.head.appendChild(e)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0642\u0646 \u0647\u0648\u064A\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e)}},async load(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629...");const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u0639\u0631\u0651\u0641 - \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"),e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>';return}if(AppState.appData||(AppState.appData={}),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.injectTableScrollbarStyles(),this._injectClinicAttendanceIdentityStyles(),this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.refreshOnLanguageChange()}),window.addEventListener("storage",t=>{t.key==="language"&&t.newValue!==t.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0),this._syncCompletedListenerAdded||(window.addEventListener("syncDataCompleted",t=>{const{sheets:i}=t.detail||{};i&&(i.includes("ClinicVisits")||i.includes("ClinicContractorVisits")||i.includes("clinicVisits"))&&(this.ensureData(),this.state&&this.state.activeTab==="visits"&&(this.scheduleVisitsTabRender(!1,0),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")))}),this._syncCompletedListenerAdded=!0);try{this.ensureData();const t=localStorage.getItem("clinic_last_sync"),i=t?Date.now()-parseInt(t):1/0,n=600*1e3,s=this.hasValidLocalData(),a=!this.state.initialized;a&&this.state.activeTab==="medications"&&this.hasTabAccess("visits")&&(this.state.activeTab="visits"),this.renderUI(),setTimeout(()=>{this._userNeedsClinicStaffForAttendance()&&!this.isActiveClinicStaffMember()&&this._ensureClinicStaffLoadedForAttendance().then(r=>{r&&this._refreshAttendanceTabNavAfterStaffLoad()}).catch(()=>{}),this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1).catch(()=>{}),a||!s||i>=n?(Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629)..."),Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A").then(()=>{if(localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.state&&this.state.activeTab==="visits"?this.scheduleVisitsTabRender(!1,0):(this.renderUI(),this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab()&&this.scheduleAttendanceTabRender(0)),typeof Utils<"u"&&Utils.safeLog&&AppState.appData){const r=(AppState.appData.clinicVisits||[]).length,c=(AppState.appData.clinicMedications||AppState.appData.medications||[]).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D: ${r} \u0632\u064A\u0627\u0631\u0629\u060C ${c} \u062F\u0648\u0627\u0621`)}}).catch(r=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r&&r.message)}).finally(()=>{this.state.initialized=!0})):(Utils.safeLog("\u2705 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B - \u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"),this.syncDataInBackground(),this.state.initialized=!0)},80)}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",t),this.hasValidLocalData()&&(this.renderUI(),Utils.safeLog("\u2705 \u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u062E\u0637\u0623")),this.state.initialized||Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629")}finally{Loading.hide()}},hasValidLocalData(){const e=AppState.appData;if(!e)return!1;const t=e.medications||e.clinicMedications||[],i=e.sickLeave||[],n=e.injuries||[],s=e.clinicVisits||[];return t.length>0||i.length>0||n.length>0||s.length>0},async syncDataFromServer(){const e=[],n=(s,a,o)=>Utils.promiseWithTimeout(s,a,()=>new Error(`Request timeout for ${o}`));e.push(n(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}),45e3,"medications").then(s=>{if(s&&s.success&&Array.isArray(s.data)){const a=s.data.map(o=>this.normalizeMedicationRecord(o));AppState.appData.medications=a,AppState.appData.clinicMedications=a,AppState.appData.clinicInventory=a,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${s.data.length} \u062F\u0648\u0627\u0621`)}}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",s.message)})),e.push(n(GoogleIntegration.sendRequest({action:"getAllSickLeaves",data:{}}),45e3,"sickLeave").then(s=>{s&&s.success&&Array.isArray(s.data)&&(AppState.appData.sickLeave=s.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${s.data.length} \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629`))}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",s.message)})),e.push(n(GoogleIntegration.sendRequest({action:"getAllInjuries",data:{}}),45e3,"injuries").then(s=>{s&&s.success&&Array.isArray(s.data)&&(AppState.appData.injuries=s.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${s.data.length} \u0625\u0635\u0627\u0628\u0629`))}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",s.message)})),this.shouldFetchClinicVisitsFromBackend()?e.push(n(this.loadVisitsDataFromBackend(),12e4,"clinicVisits").then(()=>{const s=AppState.appData.clinicVisits||[];Utils.safeLog(`\u2705 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F: ${s.length} \u0632\u064A\u0627\u0631\u0629 (${s.filter(a=>a.personType==="employee"||!a.personType).length} \u0645\u0648\u0638\u0641\u060C ${s.filter(a=>a.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644)`)}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",s.message)})):AppState.debugMode&&Utils.safeLog("\u2139\uFE0F \u062A\u062E\u0637\u064A \u062C\u0644\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u0624\u0643\u062F\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645");try{await Promise.allSettled(e)}catch(s){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",s.message)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{this.ensureData(),window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F syncDataFromServer")}catch(s){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",s.message)}},async syncDataInBackground(){try{Utils.safeLog("\u{1F504} \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629..."),await Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,()=>new Error("Background sync timeout")),localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.hasValidLocalData()&&(this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state&&this.state.activeTab==="attendance"&&this.renderAttendanceTab(),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"))}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",e.message),Utils.safeLog("\u2139\uFE0F \u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629")}},async refresh(){Utils.safeLog("\u{1F504} \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629..."),Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),await this.load(),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},getClinicStaffList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaff)?AppState.appData.clinicStaff:[]},getClinicStaffAttendanceList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffAttendance)?AppState.appData.clinicStaffAttendance:[];return e=this._mergeAttendanceRowsByUserDay(e),this.canViewAllAttendanceData()||(e=e.filter(t=>this._attendanceRowBelongsToCurrentUser_(t))),e},getClinicStaffTimeOffRequestsList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];if(!this.canViewAllAttendanceData()){const t=AppState.currentUser,i=String(t?.id||"").trim(),n=String(t?.email||"").trim().toLowerCase();e=e.filter(s=>i&&String(s.userId||"")===i||n&&String(s.userEmail||"").trim().toLowerCase()===n)}return e},getClinicStaffSystemActivitiesList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaffSystemActivities)?AppState.appData.clinicStaffSystemActivities:[]},getFilteredClinicStaffActivities(){let e=this.getClinicStaffSystemActivitiesList().slice();const t=this.state.filters?.attendance||{},i=this._resolveAttendanceFilterDates(t);if(i.dateFrom&&(e=e.filter(n=>n.timestamp&&this._attendanceDayKey(n.timestamp)>=i.dateFrom)),i.dateTo&&(e=e.filter(n=>n.timestamp&&this._attendanceDayKey(n.timestamp)<=i.dateTo)),t.activityModule&&t.activityModule!=="all"&&(e=e.filter(n=>String(n.moduleKey)===String(t.activityModule))),this.canViewAllAttendanceData()&&t.staffId&&t.staffId!=="all"){const n=(this.getClinicStaffList()||[]).find(s=>String(s.id)===String(t.staffId));if(n){const s=String(n.userId||"").trim(),a=String(n.userEmail||"").trim().toLowerCase(),o=String(n.userName||"").trim().toLowerCase();e=e.filter(l=>s&&String(l.userId||"")===s||a&&String(l.userEmail||"").trim().toLowerCase()===a||o&&String(l.userName||"").trim().toLowerCase()===o)}}return e.sort((n,s)=>new Date(s.timestamp||0)-new Date(n.timestamp||0))},getClinicStaffActivityModuleIcon(e){return{ptw:"fa-id-card",clinic:"fa-clinic-medical",training:"fa-chalkboard-teacher",incidents:"fa-exclamation-triangle",nearmiss:"fa-exclamation-circle",observations:"fa-eye",violations:"fa-gavel",system:"fa-cogs"}[String(e||"").trim()]||"fa-circle"},renderClinicStaffActivitiesSection({showUserColumn:e=!1,activities:t=[],loading:i=!1,title:n="\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"}={}){const s=[{value:"all",label:"\u0643\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629"},{value:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{value:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{value:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{value:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{value:"observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"},{value:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{value:"system",label:"\u0627\u0644\u0646\u0638\u0627\u0645"}],a=this.state.filters?.attendance?.activityModule||"all",o=i?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637...":this._clinicStaffActivitiesFetched?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629":'\u0627\u0636\u063A\u0637 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <i class="fas fa-sync-alt"></i> \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 (\u0644\u0627 \u064A\u064F\u062D\u0645\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0641\u0627\u0638\u0627\u064B \u0639\u0644\u0649 \u0633\u0631\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F)',l=t.length?t.map(r=>`
            <tr>
                ${e?`<td>${Utils.escapeHTML(r.userName||r.userEmail||"\u2014")}</td>`:""}
                <td><span class="badge badge-info" style="white-space:nowrap;"><i class="fas ${this.getClinicStaffActivityModuleIcon(r.moduleKey)} ml-1"></i>${Utils.escapeHTML(r.moduleLabel||"\u2014")}</span></td>
                <td>${Utils.escapeHTML(r.actionLabel||"\u2014")}</td>
                <td class="text-sm">${Utils.escapeHTML(r.summary||"\u2014")}</td>
                <td>${r.timestamp?Utils.formatDateTime?Utils.formatDateTime(r.timestamp):Utils.escapeHTML(String(r.timestamp)):"\u2014"}</td>
            </tr>
        `).join(""):`<tr><td colspan="${e?5:4}" class="text-center text-gray-500 py-8">${o}</td></tr>`;return`
            <div class="content-card mt-4" id="clinic-staff-activities-section">
                <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                    <h4 class="card-title" style="margin:0;"><i class="fas fa-history ml-2"></i>${Utils.escapeHTML(n)} (${t.length})</h4>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <select id="clinic-activity-module-filter" class="form-input" style="min-width:160px;padding:6px 10px;font-size:0.82rem;">
                            ${s.map(r=>`<option value="${Utils.escapeAttr(r.value)}" ${a===r.value?"selected":""}>${Utils.escapeHTML(r.label)}</option>`).join("")}
                        </select>
                        <button type="button" id="clinic-activity-refresh-btn" class="btn-secondary btn-sm" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </div>
                <div class="card-body" style="padding:0;">
                    <p style="padding:10px 16px;margin:0;font-size:0.78rem;color:#64748b;border-bottom:1px solid #f1f5f9;">
<i class="fas fa-info-circle ml-1" style="color:#2563eb;"></i>
                        \u064A\u0639\u0631\u0636 \u0645\u0627 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647 \u0639\u0628\u0631 \u0627\u0644\u0646\u0638\u0627\u0645: \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644\u060C \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0627\u0644\u0645\u062D\u0645\u0651\u0644)\u060C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u060C \u0627\u0644\u062D\u0648\u0627\u062F\u062B\u060C \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A. \u0627\u0636\u063A\u0637 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637.
                    </p>
                    ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                        <thead><tr>
                            ${e?"<th>\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>":""}
                            <th>\u0627\u0644\u0642\u0633\u0645</th><th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        </tr></thead>
                        <tbody>${l}</tbody>
                    </table>`)}
                </div>
            </div>`},bindClinicStaffActivitiesEvents(e){e&&(e.querySelector("#clinic-activity-module-filter")?.addEventListener("change",t=>{this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{activityModule:t.target.value||"all"}),this.renderAttendanceTab({force:!0})}),e.querySelector("#clinic-activity-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637..."),await this.loadClinicStaffActivities(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637")}))},_parseActivityCreatorFromRecord_(e){if(!e)return{userId:"",email:"",name:""};let t=String(e.createdById||e.userId||"").trim(),i=String(e.userEmail||"").trim().toLowerCase(),n=String(e.userName||"").trim();const s=e.createdBy;return s&&typeof s=="object"?(t=t||String(s.id||s.userId||"").trim(),n=n||String(s.name||s.displayName||"").trim(),i=i||String(s.email||"").trim().toLowerCase()):s&&(n=n||String(s).trim()),{userId:t,email:i,name:n}},_activityCreatorMatchesUser_(e,t){if(!e||!t)return!1;const i=String(t.id||"").trim(),n=String(t.email||"").trim().toLowerCase(),s=String(t.name||"").trim().toLowerCase();return!!(i&&e.userId&&i===e.userId||n&&e.email&&n===e.email||s&&e.name&&s===String(e.name).trim().toLowerCase())},_activityCreatorMatchesStaff_(e,t){if(!e||!t)return!1;const i=String(t.userId||"").trim(),n=String(t.userEmail||"").trim().toLowerCase(),s=String(t.userName||"").trim().toLowerCase();return!!(i&&e.userId&&i===e.userId||n&&e.email&&n===e.email||s&&e.name&&s===String(e.name).trim().toLowerCase())},_buildLocalClinicVisitActivities_(e){e=e||{};const t=Array.isArray(AppState.appData?.clinicVisits)?AppState.appData.clinicVisits:[],i=AppState.currentUser,n=this.canViewAllAttendanceData();let s=null;n&&e.staffId&&(s=(this.getClinicStaffList()||[]).find(r=>String(r.id)===String(e.staffId))||null);const a=e.dateFrom?this._attendanceDayKey(e.dateFrom):null,o=e.dateTo?this._attendanceDayKey(e.dateTo):null,l=e.moduleKey||"all";return l!=="all"&&l!=="clinic"?[]:t.filter(r=>{if(!r)return!1;const c=this._parseActivityCreatorFromRecord_(r);if(n){if(s&&!this._activityCreatorMatchesStaff_(c,s))return!1}else if(!this._activityCreatorMatchesUser_(c,i))return!1;const p=r.createdAt||r.visitDate||"";if(p){const f=this._attendanceDayKey(p);if(a&&f<a||o&&f>o)return!1}else if(a||o)return!1;return!0}).map(r=>{const c=r.personType==="contractor"||r.contractorName||r.contractorWorkerName||r.externalName,p=this._parseActivityCreatorFromRecord_(r),f=c?String(r.contractorWorkerName||r.externalName||r.contractorName||r.visitType||r.id||"").slice(0,120):String(r.employeeName||r.visitType||r.reason||r.id||"").slice(0,120);return{id:"local-visit-"+r.id,recordId:r.id||"",moduleKey:"clinic",moduleLabel:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",actionLabel:c?"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0648\u0638\u0641",summary:f,timestamp:r.createdAt||r.visitDate||"",userId:p.userId||"",userEmail:p.email||"",userName:p.name||this.getUserDisplayName(r.createdBy)||"",sheet:"ClinicVisits-local"}})},_mergeClinicStaffActivities_(e){const t=new Map;return(e||[]).flat().forEach(i=>{!i||!i.id||t.has(i.id)||t.set(i.id,i)}),Array.from(t.values()).sort((i,n)=>new Date(n.timestamp||0)-new Date(i.timestamp||0))},_userNeedsClinicStaffForAttendance(){return this.isCurrentUserAdmin()||typeof Permissions>"u"||typeof Permissions.hasDetailedPermission!="function"?!1:Permissions.hasDetailedPermission("clinic","attendance")},async _ensureClinicStaffLoadedForAttendance(){return this._clinicStaffPreloadPromise?this._clinicStaffPreloadPromise:(this._clinicStaffPreloadPromise=(async()=>{try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const e=await GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}});if(e?.success&&Array.isArray(e.data)&&(AppState.appData.clinicStaff=e.data,this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save))try{window.DataManager.save()}catch{}return this.canAccessAttendanceTab()}catch{return!1}finally{this._clinicStaffPreloadPromise=null}})(),this._clinicStaffPreloadPromise)},_refreshAttendanceTabNavAfterStaffLoad(){const e=document.getElementById("clinic-section");if(!e||!this.canAccessAttendanceTab())return;if(!e.querySelector('.clinic-tab-btn[data-tab="attendance"]')){this.renderUI();return}this.state?.activeTab==="attendance"&&this.scheduleAttendanceTabRender(0)},_getDefaultTimeOffFormDraft(){return{requestType:"",reason:"",dateFrom:"",dateTo:"",permDate:"",otDate:"",timeFrom:"",timeTo:"",durationHours:""}},_saveTimeOffFormDraftFromDom(){this.state||(this.state={}),document.getElementById("timeoff-request-form")&&(this.state.timeOffFormDraft={requestType:document.getElementById("timeoff-request-type")?.value||"",reason:document.getElementById("timeoff-reason")?.value||"",dateFrom:document.getElementById("timeoff-date-from")?.value||"",dateTo:document.getElementById("timeoff-date-to")?.value||"",permDate:document.getElementById("timeoff-perm-date")?.value||"",otDate:document.getElementById("timeoff-ot-date")?.value||"",timeFrom:document.getElementById("timeoff-time-from")?.value||"",timeTo:document.getElementById("timeoff-time-to")?.value||"",durationHours:document.getElementById("timeoff-duration-hours")?.value||""})},_applyTimeOffFormDraftToPanel(e){const t=this.state?.timeOffFormDraft;if(!t||!e)return;const i=(n,s)=>{const a=e.querySelector("#"+n);a&&s!=null&&s!==""&&(a.value=s)};i("timeoff-request-type",t.requestType),i("timeoff-reason",t.reason),i("timeoff-date-from",t.dateFrom),i("timeoff-date-to",t.dateTo),i("timeoff-perm-date",t.permDate),i("timeoff-ot-date",t.otDate),i("timeoff-time-from",t.timeFrom),i("timeoff-time-to",t.timeTo),i("timeoff-duration-hours",t.durationHours)},_isTimeOffFormDraftDirty(){const e=this.state?.timeOffFormDraft;return e?!!(e.requestType||String(e.reason||"").trim()||e.dateFrom||e.dateTo||e.permDate||e.otDate||e.timeFrom||e.timeTo||e.durationHours):!1},_shouldDeferAttendanceRender(){return this._timeOffFormSubmitting||this._timeOffFormFocused?!0:this._isTimeOffFormDraftDirty()},_flushDeferredAttendanceRender(){!this._attendanceRenderPending||this.state?.activeTab!=="attendance"||this._shouldDeferAttendanceRender()||(this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0}))},async showTimeOffRequestModal(){try{const e=document.getElementById("clinic-timeoff-request-modal");e&&e.remove(),this._saveTimeOffFormDraftFromDom();const t=this.state?.timeOffFormDraft,i=document.createElement("div");i.id="clinic-timeoff-request-modal",i.className="modal-overlay active",i.style.zIndex="10060",i.innerHTML=`
                <div class="modal-content" style="max-width:640px;border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(11,42,85,.35);border:1px solid #dce7f5;">
                    <div class="modal-header" style="background:linear-gradient(125deg,#0b2a55 0%,#1e40af 70%,#2563eb 100%);color:#fff;padding:18px 22px;border-bottom:none;display:flex;align-items:center;justify-content:space-between;">
                        <h3 style="margin:0;font-size:1.1rem;font-weight:800;display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-paper-plane" style="color:#fde68a;"></i> \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062C\u062F\u064A\u062F
                        </h3>
                        <button type="button" class="modal-close" style="color:#fff;opacity:.85;background:rgba(255,255,255,.12);border-radius:9px;width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.22);" title="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body" style="padding:22px 24px;background:#f8fafc;">
                        <p style="margin:0 0 16px;font-size:0.78rem;color:#64748b;display:flex;align-items:center;gap:6px;">
                            <i class="fas fa-info-circle" style="color:#2563eb;"></i> \u064A\u064F\u0631\u0633\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u0646\u064A.
                        </p>
                        <form id="timeoff-request-form" class="space-y-3">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-semibold mb-1">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *</label>
                                    <select id="timeoff-request-type" class="form-input" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                        <option value="leave" ${t&&t.requestType==="leave"?"selected":""}>\u0625\u062C\u0627\u0632\u0629</option>
                                        <option value="permission" ${t&&t.requestType==="permission"?"selected":""}>\u0625\u0630\u0646</option>
                                        <option value="overtime" ${t&&t.requestType==="overtime"?"selected":""}>\u0625\u0636\u0627\u0641\u064A</option>
                                    </select>
                                </div>
                                <div id="timeoff-leave-dates" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-from" class="form-input" value="${Utils.escapeAttr(t?.dateFrom||"")}"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-to" class="form-input" value="${Utils.escapeAttr(t?.dateTo||"")}"></div>
                                </div>
                                <div id="timeoff-permission-fields" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-perm-date" class="form-input" value="${Utils.escapeAttr(t?.permDate||"")}"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0645\u0646 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-from" class="form-input" value="${Utils.escapeAttr(t?.timeFrom||"")}"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0625\u0644\u0649 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-to" class="form-input" value="${Utils.escapeAttr(t?.timeTo||"")}"></div>
                                </div>
                                <div id="timeoff-overtime-fields" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-ot-date" class="form-input" value="${Utils.escapeAttr(t?.otDate||"")}"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A</label><input type="number" id="timeoff-duration-hours" class="form-input" min="0.5" step="0.5" placeholder="\u0645\u062B\u0627\u0644: 2" value="${Utils.escapeAttr(t?.durationHours||"")}"></div>
                                    <div class="text-sm text-gray-500 self-end pb-2">\u0623\u0648 \u062D\u062F\u062F \u0645\u0646/\u0625\u0644\u0649 \u0648\u0642\u062A \u0623\u062F\u0646\u0627\u0647</div>
                                </div>
                            </div>
                            <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u0633\u0628\u0628 *</label><textarea id="timeoff-reason" class="form-textarea" rows="3" required placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628...">${Utils.escapeHTML(t?.reason||"")}</textarea></div>
                        </form>
                    </div>
                    <div class="modal-footer" style="padding:14px 24px;background:#fff;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-start;gap:10px;">
                        <button type="button" class="btn-primary" id="clinic-timeoff-submit-btn" style="min-width:150px;"><i class="fas fa-paper-plane ml-2"></i>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628</button>
                        <button type="button" class="btn-secondary" data-timeoff-close="1"><i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621</button>
                    </div>
                </div>`,document.body.appendChild(i),this._bindTimeOffFormPanelEvents(i),i.querySelectorAll("[data-timeoff-close]").forEach(n=>n.addEventListener("click",()=>i.remove())),i.querySelector(".modal-close").addEventListener("click",()=>i.remove()),i.addEventListener("click",n=>{n.target===i&&i.remove()}),i.querySelector("#clinic-timeoff-submit-btn").addEventListener("click",()=>{const n=i.querySelector("#timeoff-request-form");n&&n.reportValidity&&n.reportValidity()&&n.submit()})}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0637\u0644\u0628 \u062C\u062F\u064A\u062F:",e)}},_bindTimeOffFormPanelEvents(e){const t=e.querySelector("#timeoff-request-form");if(!t)return;const i=e.querySelector("#timeoff-request-type"),n=e.querySelector("#timeoff-leave-dates"),s=e.querySelector("#timeoff-permission-fields"),a=e.querySelector("#timeoff-overtime-fields"),o=()=>{const r=i?.value||"";n?.classList.toggle("hidden",r!=="leave"),s?.classList.toggle("hidden",r!=="permission"),a?.classList.toggle("hidden",r!=="overtime")},l=()=>this._saveTimeOffFormDraftFromDom();i?.addEventListener("change",()=>{o(),l()}),t.querySelectorAll("input, textarea, select").forEach(r=>{r.addEventListener("input",l),r.addEventListener("change",l)}),t.addEventListener("focusin",()=>{this._timeOffFormFocused=!0}),t.addEventListener("focusout",()=>{setTimeout(()=>{t.contains(document.activeElement)||(this._timeOffFormFocused=!1,this._flushDeferredAttendanceRender())},120)}),o(),t.addEventListener("submit",r=>{r.preventDefault(),this.submitTimeOffRequest()})},hasTabAccess(e){return AppState.currentUser?this.isCurrentUserAdmin()?!0:typeof Permissions<"u"&&!Permissions.hasDetailedPermission("clinic",e)?!1:e==="attendance"?this.canAccessAttendanceTab():!0:!1},_injectClinicIdentityStyles(){if(document.getElementById("clinic-ui-identity-styles"))return;const e=document.createElement("style");e.id="clinic-ui-identity-styles",e.textContent=`
        /* \u2550\u2550 Hero \u2550\u2550 */
        #clinic-section .clinic-id-hero {
            position: relative; overflow: hidden;
            border-radius: 18px;
            padding: 22px 26px 26px;
            background: radial-gradient(circle at 85% -20%, rgba(251,191,36,0.14), transparent 45%),
                        linear-gradient(120deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
            color: #fff;
            box-shadow: 0 12px 30px rgba(11,42,85,0.28);
            display: flex; flex-wrap: wrap; align-items: center; gap: 18px;
        }
        #clinic-section .clinic-id-hero::after {
            content: ''; position: absolute; inset: auto 0 -34px 0; height: 34px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath fill='%23ffffff' fill-opacity='0.10' d='M0 40 L60 10 L120 35 L180 4 L240 24 L300 8 L360 24 L420 12 L480 30 L540 16 L600 26 L660 10 L720 30 L780 14 L840 28 L900 10 L960 24 L1020 6 L1080 20 L1140 12 L1200 24 L1200 40 L0 40 Z'/%3E%3C/svg%3E");
            background-size: cover; background-position: bottom; pointer-events: none;
        }
        #clinic-section .clinic-id-hero__icon {
            width: 58px; height: 58px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            border-radius: 16px;
            background: linear-gradient(145deg, #fbbf24, #f59e0b);
            color: #7c2d12; font-size: 1.55rem;
            box-shadow: 0 8px 18px rgba(0,0,0,.25);
        }
        #clinic-section .clinic-id-hero__outer {
            display: flex; align-items: center; gap: 10px; position: relative; z-index: 1;
        }
        #clinic-section .clinic-id-hero__text { flex: 1; min-width: 220px; position: relative; z-index: 1; }
        #clinic-section .clinic-id-hero__eyebrow {
            display: inline-flex; align-items: center; gap: 6px;
            font-size: .8rem; font-weight: 700; color: #fde68a;
            background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16);
            padding: 4px 12px; border-radius: 999px; margin-bottom: 8px; letter-spacing: .3px;
        }
        #clinic-section .clinic-id-hero__title { margin: 0; font-size: 1.5rem; font-weight: 800; color: #fff; }
        #clinic-section .clinic-id-hero__subtitle { margin: 4px 0 0; font-size: .92rem; color: rgba(255,255,255,.75); }
        #clinic-section .clinic-id-hero__actions {
            display: flex; flex-wrap: wrap; gap: 10px;
            margin-inline-start: auto; position: relative; z-index: 1;
        }
        #clinic-section .clinic-id-hero__actions .btn-primary {
            background: linear-gradient(145deg, #fbbf24, #f59e0b);
            color: #7c2d12; font-weight: 700; border: none; border-radius: 12px;
            box-shadow: 0 6px 16px rgba(245,158,11,.35);
        }
        #clinic-section .clinic-id-hero__actions .btn-primary:hover {
            background: linear-gradient(145deg, #fcd34d, #f59e0b); color: #7c2d12; transform: translateY(-1px);
        }
        #clinic-section .clinic-id-hero__actions .btn-secondary {
            background: rgba(255,255,255,.10); border: 1px solid rgba(255,255,255,.30);
            color: #fff; border-radius: 12px; backdrop-filter: blur(4px);
        }
        #clinic-section .clinic-id-hero__actions .btn-secondary:hover {
            background: rgba(255,255,255,.20); border-color: rgba(255,255,255,.45); color: #fff;
        }

        /* \u2550\u2550\u2550 \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 (\u0628\u0646\u0645\u0637 \u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A pinsp-stat) \u2550\u2550\u2550 */
        #clinic-section .pinsp-stat {
            position: relative; overflow: hidden; border-radius: 16px; border: 1px solid #dce7f5;
            background: linear-gradient(160deg, #ffffff, #f4f8ff); box-shadow: 0 8px 22px rgba(15,47,90,.07);
            display: flex; align-items: center; gap: 12px; padding: 16px; transition: transform .18s ease, box-shadow .18s ease;
        }
        #clinic-section .pinsp-stat:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(15,47,90,.12); }
        #clinic-section .pinsp-stat__icon { flex: 0 0 auto; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 13px; color: #fff; font-size: 1.15rem; }
        #clinic-section .pinsp-stat__icon--blue { background: linear-gradient(135deg,#1e40af,#3b82f6); }
        #clinic-section .pinsp-stat__icon--green { background: linear-gradient(135deg,#15803d,#22c55e); }
        #clinic-section .pinsp-stat__icon--red { background: linear-gradient(135deg,#b91c1c,#ef4444); }
        #clinic-section .pinsp-stat__icon--amber { background: linear-gradient(135deg,#b45309,#f59e0b); }
        #clinic-section .pinsp-stat__body { flex: 1; min-width: 0; }
        #clinic-section .pinsp-stat__label { font-size: .74rem; font-weight: 700; color: #64748b; margin: 0 0 2px; }
        #clinic-section .pinsp-stat__value { font-size: 1.7rem; font-weight: 900; line-height: 1.15; margin: 0; }
        #clinic-section .pinsp-stat__bar { height: 5px; margin-top: 7px; border-radius: 99px; background: #e5edf7; overflow: hidden; }
        #clinic-section .pinsp-stat__bar span { display: block; height: 100%; border-radius: 99px; }
        #clinic-section .pinsp-stat__pct { font-size: .7rem; font-weight: 700; color: #94a3b8; }
        @media (max-width: 520px) { #clinic-section .pinsp-stat__pct { display: none; } }

        /* \u2550\u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u2550\u2550\u2550 */
        #clinic-section .clinic-tabs {
            display: flex; flex-wrap: wrap; gap: 8px; padding: 10px;
            margin-bottom: 1.5rem;
            background: radial-gradient(circle at 90% -40%, rgba(251,191,36,.14), transparent 40%),
                        linear-gradient(120deg, #0b2a55, #1e3f8f 60%, #1e40af);
            border: 1px solid rgba(255,255,255,.12); border-radius: 16px;
            box-shadow: 0 8px 24px rgba(11,42,85,.18);
        }
        #clinic-section .clinic-tab-btn {
            background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16);
            color: #e2eaff; font-weight: 600; border-radius: 12px;
            box-shadow: none;
        }
        #clinic-section .clinic-tab-btn i { color: #a8c0f2; }
        #clinic-section .clinic-tab-btn:hover {
            background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.32);
            color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,.15); transform: translateY(-1px);
        }
        #clinic-section .clinic-tab-btn.active {
            background: linear-gradient(145deg, #fbbf24, #f59e0b);
            border-color: #fbbf24; color: #7c2d12; font-weight: 800;
            box-shadow: 0 6px 14px rgba(245,158,11,.35);
        }
        #clinic-section .clinic-tab-btn.active i { color: #7c2d12; }
        #clinic-section .clinic-tab-btn.active:hover {
            background: linear-gradient(145deg, #fcd34d, #f59e0b); color: #7c2d12;
        }
        #clinic-section .clinic-tab-btn .badge { margin-inline: 0 .25rem; }

        /* \u2550\u2550\u2550 \u0623\u0633\u0637\u062D \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u2550\u2550\u2550 */
        #clinic-section .clinic-tab-panel .content-card {
            border: 1px solid #dce7f5; border-radius: 16px;
            box-shadow: 0 6px 18px rgba(15,47,90,.06); overflow: hidden;
        }
        #clinic-section .clinic-tab-panel .card-header {
            background: linear-gradient(120deg, #f1f6ff, #ffffff);
            border-bottom: 1px solid #dce7f5;
        }
        #clinic-section .clinic-tab-panel .data-table thead th {
            background: linear-gradient(90deg, #1e40af, #2563eb);
            color: #fff; border-color: #1d4ed8;
        }
        #clinic-section .clinic-tab-panel .data-table tbody tr:hover td { background: #f2f7ff; }
        #clinic-section .clinic-tab-panel .form-input:focus,
        #clinic-section .clinic-tab-panel input[type="text"]:focus,
        #clinic-section .clinic-tab-panel select:focus,
        #clinic-section .clinic-tab-panel textarea:focus {
            border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.14);
        }
        #clinic-section .clinic-tab-panel .btn-primary {
            background: linear-gradient(145deg, #fbbf24, #f59e0b);
            color: #7c2d12; font-weight: 700; border: none;
        }
        #clinic-section .clinic-tab-panel .btn-primary:hover {
            background: linear-gradient(145deg, #fcd34d, #f59e0b); color: #7c2d12;
        }

        /* \u2550\u2550\u2550 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 \u2550\u2550\u2550 */
        [data-theme="dark"] #clinic-section .clinic-tab-btn {
            background: rgba(255,255,255,.07); border-color: rgba(255,255,255,.14); color: #cdd9f2;
        }
        [data-theme="dark"] #clinic-section .clinic-tab-btn:hover {
            background: rgba(255,255,255,.15); color: #fff;
        }
        [data-theme="dark"] #clinic-section .clinic-tab-panel .card-header {
            background: linear-gradient(120deg, #16233f, #1e293b);
            border-bottom-color: #2a3b5c;
        }
        [data-theme="dark"] #clinic-section .clinic-tab-panel .data-table tbody tr:hover td { background: #1e293b; }
        [data-theme="dark"] #clinic-section .pinsp-stat { background: linear-gradient(160deg,#15283f,#1a2f4a); border-color: #243b55; }
        [data-theme="dark"] #clinic-section .pinsp-stat__label { color: #93a7bd; }
        [data-theme="dark"] #clinic-section .pinsp-stat__bar { background: #334155; }
        [data-theme="dark"] #clinic-section .pinsp-stat__pct { color: #64748b; }
        `,document.head.appendChild(e)},renderUI(){const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}this._injectClinicIdentityStyles();const t=AppState.appData;if(!t){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-gray-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div></div>';return}const i=this.getMedications().length,n=this.getSickLeaves().length,s=this.getInjuries().length,a=(t.clinicVisits||[]).length,o=this.isCurrentUserAdmin(),l=Math.max(1,a,i,n,s),r=m=>m>0?Math.min(100,Math.round(m/l*100)):0,c=[{label:"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F",value:a,icon:"fas fa-hospital",iconCls:"blue",valueColor:"#1d4ed8",barColor:"#2563eb",pct:r(a)},{label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629",value:i,icon:"fas fa-pills",iconCls:"green",valueColor:"#15803d",barColor:"#22c55e",pct:r(i)},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:n,icon:"fas fa-calendar-times",iconCls:"amber",valueColor:"#c2410c",barColor:"#f59e0b",pct:r(n)},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:s,icon:"fas fa-user-injured",iconCls:"red",valueColor:"#b91c1c",barColor:"#ef4444",pct:r(s)}].map(m=>`
                <div class="pinsp-stat">
                    <div class="pinsp-stat__icon pinsp-stat__icon${m.iconCls}"><i class="${m.icon}"></i></div>
                    <div class="pinsp-stat__body">
                        <p class="pinsp-stat__label">${m.label}</p>
                        <p class="pinsp-stat__value" style="color:${m.valueColor};">${m.value}</p>
                        <div class="pinsp-stat__bar"><span style="width:${m.pct}%; background:${m.barColor};"></span></div>
                    </div>
                    <span class="pinsp-stat__pct">${m.pct}%</span>
                </div>
            `).join("");e.innerHTML=`
            <div class="clinic-id-hero">
                <div class="clinic-id-hero__outer">
                    <div class="clinic-id-hero__icon"><i class="fas fa-clinic-medical"></i></div>
                    <div class="clinic-id-hero__text">
                        <span class="clinic-id-hero__eyebrow"><i class="fas fa-shield-halved fa-xs"></i> HSE \xB7 \u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629</span>
                        <h1 class="clinic-id-hero__title">\u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h1>
                        <p class="clinic-id-hero__subtitle">\u0625\u062F\u0627\u0631\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F\u060C \u0627\u0644\u0623\u062F\u0648\u064A\u0629\u060C \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629\u060C \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</p>
                    </div>
                </div>
                <div class="clinic-id-hero__actions">
                    ${o?`
                    <button id="clinic-visit-types-settings-btn" class="btn-secondary" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)">
                        <i class="fas fa-list-ul ml-2"></i>
                        \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                    </button>
                    `:""}
                    <button id="clinic-refresh-btn" class="btn-secondary" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                        <i class="fas fa-sync-alt ml-2"></i>
                        \u062A\u062D\u062F\u064A\u062B
                    </button>
                    <button id="clinic-register-visit-btn" class="btn-primary" title="\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629">
                        <i class="fas fa-plus ml-2"></i>
                        \u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629
                    </button>
                </div>
            </div>

            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                ${c}
            </div>
        <!-- Tabs Navigation -->
            <div class="mt-6">
                <div class="clinic-tabs">
                    ${this.hasTabAccess("visits")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="visits"?"active":""}" data-tab="visits">
                        <i class="fas fa-hospital ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F (${a})
                    </button>
                    `:""}
                    ${this.hasTabAccess("medications")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="medications"?"active":""}" data-tab="medications">
                        <i class="fas fa-pills ml-2"></i>
                        \u0627\u0644\u0623\u062F\u0648\u064A\u0629 (${i})
                    </button>
                    `:""}
                    ${this.hasTabAccess("sickLeave")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="sickLeave"?"active":""}" data-tab="sickLeave">
                        <i class="fas fa-calendar-times ml-2"></i>
                        \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${n})
                    </button>
                    `:""}
                    ${this.hasTabAccess("dispensed-medications")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="dispensed-medications"?"active":""}" data-tab="dispensed-medications">
                        <i class="fas fa-prescription-bottle-alt ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629
                    </button>
                    `:""}
                    ${this.hasTabAccess("injuries")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="injuries"?"active":""}" data-tab="injuries">
                        <i class="fas fa-user-injured ml-2"></i>
                        \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (${s})
                    </button>
                    `:""}
                    ${this.hasTabAccess("supply-request")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="supply-request"?"active":""}" data-tab="supply-request">
                        <i class="fas fa-shopping-cart ml-2"></i>
                        \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A
                    </button>
                    `:""}
                    ${this.hasTabAccess("approvals")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="approvals"?"active":""}" data-tab="approvals">
                        <i class="fas fa-check-circle ml-2"></i>
                        \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629
                        <span id="pending-approvals-badge" class="badge badge-danger mr-2" style="display: none;"></span>
                    </button>
                    `:""}
                    ${this.hasTabAccess("data-analysis")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="data-analysis"?"active":""}" data-tab="data-analysis">
                        <i class="fas fa-chart-bar ml-2"></i>
                        \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                    `:""}
                    ${this.hasTabAccess("attendance")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="attendance"?"active":""}" data-tab="attendance">
                        <i class="fas fa-user-clock ml-2"></i>
                        \u0627\u0644\u062D\u0636\u0648\u0631
                    </button>
                    `:""}
                </div>

                <!-- Tab Panels -->
                <div class="clinic-tab-panel ${this.state.activeTab==="visits"?"active":""}" data-tab-panel="visits"></div>
                <div class="clinic-tab-panel ${this.state.activeTab==="medications"?"active":""}" data-tab-panel="medications"></div>
                <div class="clinic-tab-panel ${this.state.activeTab==="sickLeave"?"active":""}" data-tab-panel="sickLeave"></div>
                ${o?`
                <div class="clinic-tab-panel ${this.state.activeTab==="dispensed-medications"?"active":""}" data-tab-panel="dispensed-medications"></div>
                `:""}
                <div class="clinic-tab-panel ${this.state.activeTab==="injuries"?"active":""}" data-tab-panel="injuries"></div>
                <div class="clinic-tab-panel ${this.state.activeTab==="supply-request"?"active":""}" data-tab-panel="supply-request"></div>
                ${o?`
                <div class="clinic-tab-panel ${this.state.activeTab==="approvals"?"active":""}" data-tab-panel="approvals"></div>
                <div class="clinic-tab-panel ${this.state.activeTab==="data-analysis"?"active":""}" data-tab-panel="data-analysis"></div>
                `:""}
                ${this.hasTabAccess("attendance")?`
                <div class="clinic-tab-panel ${this.state.activeTab==="attendance"?"active":""}" data-tab-panel="attendance"></div>
                `:""}
            </div>
        `,this.state.activeTab==="attendance"&&!this.canAccessAttendanceTab()&&(this.state.activeTab=this.hasTabAccess("visits")?"visits":this.hasTabAccess("medications")?"medications":"visits"),this.renderTabNavigation(),this.renderActiveTabContent(),this.bindTabEvents();try{this.applyModuleI18n(e)}catch{}const p=document.getElementById("clinic-refresh-btn");p&&p.addEventListener("click",()=>this.refresh());const f=document.getElementById("clinic-register-visit-btn");f&&f.addEventListener("click",()=>{f.disabled||(f.disabled=!0,this.showVisitForm(null,f))});const d=document.getElementById("clinic-visit-types-settings-btn");d&&d.addEventListener("click",()=>this.showVisitTypesSettingsModal()),typeof UI<"u"&&UI.addNavigationIconsAfterRender?UI.addNavigationIconsAfterRender("clinic"):typeof UI<"u"&&UI.addNavigationIcons&&(setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},0),setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},100))},async renderDispensedMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]');if(!e){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}const{t}=this.getTranslations();this.ensureData();const i=AppState.appData.clinicVisits&&AppState.appData.clinicVisits.length>0;if((!i||i&&AppState.appData.clinicVisits.some(d=>{const m=this.normalizeVisitMedications(d.medications);return(!m||m.length===0)&&(d.medicationsDispensed||d.medicationsDispensedQty&&d.medicationsDispensedQty>0)}))&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){e.innerHTML='<div class="text-center py-8 text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';try{await this.loadVisitsDataFromBackend(),this.ensureData(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629")}catch(d){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629:",d.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),this.ensureData()}}const s=AppState.appData.clinicVisits||[],a=[];let o=!1;if(s.forEach(d=>{if(!d||typeof d!="object")return;let m=this.normalizeVisitMedications(d.medications);if((!m||m.length===0)&&d.medicationsDispensed&&(m=this.normalizeVisitMedications(d.medicationsDispensed),m&&m.length>0&&(d.medications=m,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0644\u0632\u064A\u0627\u0631\u0629 ${d.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,m.length,"\u062F\u0648\u0627\u0621"))),(!m||m.length===0)&&d.medicationsDispensedQty&&d.medicationsDispensedQty>0){const u=parseInt(d.medicationsDispensedQty,10)||0;u>0&&(m=[{medicationName:d.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:u,unit:"\u0648\u062D\u062F\u0629",notes:""}],d.medications=m,o=!0,AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${d.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${u} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A.`))}m&&m.length>0&&m.forEach(u=>{if(u&&(u.medicationName||u.name)){const g=d.factoryName||this.getVisitFactoryDisplayName(d)||"-",y=d.employeeLocation||d.workArea||d.location||"-";a.push({visitId:d.id,visitDate:d.visitDate||d.createdAt,employeeName:d.employeeName||d.contractorName||d.contractorWorkerName||d.externalName||"",employeeCode:d.employeeCode||d.employeeNumber||"",employeeDepartment:d.employeeDepartment||d.department||"",factory:g,location:y,personType:d.personType||(d.contractorName||d.externalName?"contractor":"employee"),medicationName:u.medicationName||u.name||"",quantity:u.quantity!==null&&u.quantity!==void 0?parseInt(u.quantity,10):0,unit:u.unit||"\u0648\u062D\u062F\u0629",notes:u.notes||""})}})}),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0639")}catch(d){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",d.message)}if(AppState.debugMode){const d=a.filter(u=>u.personType==="employee"||!u.personType).length,m=a.filter(u=>u.personType==="contractor").length;Utils.safeLog(`\u2705 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629: ${a.length} \u062F\u0648\u0627\u0621 \u0645\u0646 ${s.length} \u0632\u064A\u0627\u0631\u0629 (${d} \u0645\u0648\u0638\u0641\u060C ${m} \u0645\u0642\u0627\u0648\u0644)`)}a.sort((d,m)=>{const u=new Date(d.visitDate);return new Date(m.visitDate)-u});const l=a.map(d=>{let m=d.visitDate||d.createdAt||"";if(m)try{const D=new Date(m);isNaN(D.getTime())&&(m=d.createdAt||"")}catch{m=d.createdAt||""}const u=this.formatDate(m,!0),g=this.getMedications().find(D=>D.name===d.medicationName||D.name?.toLowerCase()===d.medicationName?.toLowerCase()),y=g?.type||"-",h=g?this.calculateMedicationStatus(g):null,x=h?`<span class="badge ${this.getMedicationStatusClasses(h.status)}">${h.status}</span>`:"-",T=h?.status||"\u0633\u0627\u0631\u064A";return`
                <tr class="${this.getMedicationRowClass(T)}">
                    <td>${u}</td>
                    <td>${Utils.escapeHTML(d.employeeCode)}</td>
                    <td>${Utils.escapeHTML(d.employeeName)}</td>
                    <td>${Utils.escapeHTML(d.employeeDepartment)}</td>
                    <td>${Utils.escapeHTML(d.factory||"-")}</td>
                    <td>${Utils.escapeHTML(d.location||"-")}</td>
                    <td>${Utils.escapeHTML(d.medicationName)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td class="text-center">${d.quantity} ${Utils.escapeHTML(d.unit)}</td>
                    <td class="text-center">${x}</td>
                    <td>${Utils.escapeHTML(d.notes||"-")}</td>
                    <td class="text-center">
                        <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(d.visitId||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `}).join(""),r=a.length?`
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-semibold">${t("tab.dispensedLog")||"Dispensed Medications Log"}</h3>
                    <div class="flex gap-2">
                        <input type="text" id="dispensed-med-search" class="form-input" placeholder="\u0628\u062D\u062B..." style="width: 250px;">
                        <button type="button" class="btn-secondary" id="export-dispensed-med-btn">
                            <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                        <button type="button" class="btn-secondary" id="export-dispensed-med-pdf-btn">
                            <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                        </button>
                    </div>
                </div>
                <div class="table-wrapper clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table table-header-green">
                        <thead>
                            <tr>
                                <th>${t("table.dispenseDate")}</th>
                                <th>${t("table.employeeCode")}</th>
                                <th>${t("table.patientName")}</th>
                                <th>${t("table.department")}</th>
                                <th>${t("table.factory")}</th>
                                <th>${t("table.workplace")}</th>
                                <th>${t("table.medications")}</th>
                                <th>${t("table.medicationType")}</th>
                                <th class="text-center">${t("table.quantity")}</th>
                                <th class="text-center">${t("table.medicationStatus")}</th>
                                <th>${t("table.notes")}</th>
                                <th class="text-center">${t("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l}
                        </tbody>
                    </table>
                </div>
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u0633\u062C\u0644\u0629.");e.innerHTML=r,this.applyModuleI18n(e),setTimeout(()=>{const d=e.querySelector(".clinic-table-wrapper");d&&this.setupTableScrollListeners(d)},100);const c=e.querySelector("#dispensed-med-search");c&&c.addEventListener("input",d=>{const m=d.target.value.toLowerCase();e.querySelectorAll("tbody tr").forEach(g=>{const y=g.textContent.toLowerCase();g.style.display=y.includes(m)?"":"none"})});const p=e.querySelector("#export-dispensed-med-btn");p&&p.addEventListener("click",()=>this.exportDispensedMedicationsToExcel(a));const f=e.querySelector("#export-dispensed-med-pdf-btn");f&&f.addEventListener("click",()=>this.exportDispensedMedicationsToPDF(a)),e.querySelectorAll('[data-action="view-visit"]').forEach(d=>{d.addEventListener("click",()=>{const m=d.getAttribute("data-id");m&&this.viewVisit(m)})})},exportDispensedMedicationsToExcel(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map((i,n)=>{let s=i.visitDate||i.createdAt||"";if(s)try{const a=new Date(s);isNaN(a.getTime())&&(s=i.createdAt||"")}catch{s=i.createdAt||""}return{\u0645:n+1,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641":this.formatDate(s,!0),"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":i.employeeCode,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636":i.employeeName,\u0627\u0644\u0625\u062F\u0627\u0631\u0629:i.employeeDepartment,\u0627\u0644\u0645\u0635\u0646\u0639:i.factory||"-",\u0627\u0644\u0645\u0648\u0642\u0639:i.location||"-","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":i.medicationName,\u0627\u0644\u0643\u0645\u064A\u0629:i.quantity,\u0627\u0644\u0648\u062D\u062F\u0629:i.unit,\u0645\u0644\u0627\u062D\u0638\u0627\u062A:i.notes||""}});try{const i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(t);n["!cols"]=[{wch:5},{wch:18},{wch:14},{wch:22},{wch:18},{wch:16},{wch:18},{wch:28},{wch:10},{wch:10},{wch:20}],XLSX.utils.book_append_sheet(i,n,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629");const s=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,s),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",i),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(i?.message||i))}},async exportDispensedMedicationsToPDF(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:i}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!i)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const n=8,s=i.internal.pageSize.getWidth(),a=i.internal.pageSize.getHeight(),o=s/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",p=AppState?.companySettings?.phone||"",f=AppState?.companySettings?.email||"",d=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",u=`CLINIC-DISP-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(m)try{i.addImage(m,"PNG",n,y-1,15,10)}catch{}const h=n+(m?18:0);i.setFontSize(10),i.setTextColor(15,23,42),i.text(l,h,y+3),r&&(i.setFontSize(7),i.setTextColor(107,114,128),i.text(r,h,y+9));const x=[c,p,f].filter(Boolean).join(" | ");x&&(i.setFontSize(5),i.setTextColor(148,163,184),i.text(x,h,r?y+15:y+9)),i.setFontSize(12),i.setTextColor(0,56,101),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",s-n,y+3,{align:"right"}),i.setFontSize(5),i.setTextColor(148,163,184),i.text(u,s-n,y+9,{align:"right"});const T=x?r?y+21:y+15:r?y+15:y+9;i.setDrawColor(0,56,101),i.setLineWidth(.6),i.line(n,T,s-n,T),y=T+4,i.setFillColor(0,56,101),i.rect(0,y,s,8,"F"),i.setFontSize(7),i.setTextColor(255),i.text(l,n,y+5.5),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y+5.5,{align:"center"}),y+=12,i.setFontSize(14),i.setTextColor(0,56,101),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y,{align:"center"}),i.setFontSize(7),i.setTextColor(100),i.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,n,y+7),i.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,s-n,y+7,{align:"right"}),y+=11,i.setFillColor(227,242,253),i.setDrawColor(220),i.setLineWidth(.3),i.roundedRect(n,y,80,13,2,2,"FD"),i.setFillColor(21,101,192),i.rect(n,y,1.5,13,"F"),i.setFontSize(6),i.setTextColor(21,101,192),i.text("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",n+4,y+4.5),i.setFontSize(11),i.setTextColor(13,71,161),i.text(String(e.length),n+76,y+11,{align:"right"}),y+=18;const A=b=>{let S=b.visitDate||b.createdAt||"";if(S)try{isNaN(new Date(S).getTime())&&(S=b.createdAt||"")}catch{S=b.createdAt||""}return this.formatDate(S,!0)};i.autoTable({startY:y,head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0643\u0645\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"]],body:e.map((b,S)=>[S+1,A(b),b.employeeCode||"",b.employeeName||"",b.employeeDepartment||"",b.factory||"-",b.location||"-",b.medicationName||"",(b.quantity||"")+" "+(b.unit||""),b.notes||"-"]),styles:{font:"Amiri",fontSize:7,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},8:{halign:"center",cellWidth:18}},margin:{left:n,right:n},didDrawPage:function(b){const S=i.internal.getNumberOfPages();i.setFillColor(0,56,101),i.rect(0,0,s,6,"F"),i.setFontSize(6),i.setTextColor(255),i.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,4.5,{align:"center"}),i.setDrawColor(0,56,101),i.setLineWidth(.3),i.line(n,a-9,s-n,a-9),i.setFontSize(5.5),i.setTextColor(148,163,184),i.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${d}`,n,a-5),i.text(u,o,a-5,{align:"center"}),i.text(`${g} | \u0635\u0641\u062D\u0629 ${S}`,s-n,a-5,{align:"right"})}});const D=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.pdf`;i.save(D),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintDispensedMedicationsPDF(e)}},_fallbackPrintDispensedMedicationsPDF(e){const t=e.map((o,l)=>{let r=o.visitDate||o.createdAt||"";if(r)try{const p=new Date(r);isNaN(p.getTime())&&(r=o.createdAt||"")}catch{r=o.createdAt||""}const c=this.formatDate(r,!0);return`<tr>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${l+1}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(c)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.employeeCode)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.employeeName)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.employeeDepartment)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.factory||"-")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.location||"-")}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.medicationName)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${o.quantity} ${Utils.escapeHTML(o.unit)}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${Utils.escapeHTML(o.notes||"-")}</td>
            </tr>`}).join(""),i=`CLINIC-DISPENSED-MEDS-${new Date().toISOString().slice(0,10)}`,n="\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",s=`<table style="width:100%;border-collapse:collapse;font-size:10px;"><thead><tr style="background-color:#f3f4f6;">
            <th style="border:1px solid #d1d5db;padding:8px;text-align:center;font-weight:bold;">\u0645</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:center;font-weight:bold;">\u0627\u0644\u0643\u0645\u064A\u0629</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;font-weight:bold;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
        </tr></thead><tbody>${t}</tbody></table>`,a=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,n,s,!1,!0,{source:"ClinicDispensedMeds"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${n}</title></head><body>${s}</body></html>`;try{const o=new Blob([a],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),r=window.open(l,"_blank");r?r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{URL.revokeObjectURL(l)},1e3),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(l),Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(o?.message||o))}},renderSupplyRequestTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="supply-request"]');if(!e)return;this.ensureData(),AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]);const t=AppState.appData.clinicSupplyRequests.filter(a=>a.requestedBy?.id===AppState.currentUser?.id||a.requestedBy?.email===AppState.currentUser?.email).sort((a,o)=>new Date(o.createdAt||o.requestDate)-new Date(a.createdAt||a.requestDate)),i=this.isCurrentUserAdmin(),n=i?AppState.appData.clinicSupplyRequests.sort((a,o)=>new Date(o.createdAt||o.requestDate)-new Date(a.createdAt||a.requestDate)):t;e.innerHTML=`
            <div class="space-y-6">
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-shopping-cart ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A
                        </h2>
                    </div>
                    <div class="card-body">
                        <form id="supply-request-form" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-tag ml-2"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *
                                    </label>
                                    <select id="request-type" class="form-input" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</option>
                                        <option value="medication">\u0623\u062F\u0648\u064A\u0629</option>
                                        <option value="equipment">\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629</option>
                                        <option value="supplies">\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629</option>
                                        <option value="other">\u0623\u062E\u0631\u0649</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-box ml-2"></i>
                                        \u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 *
                                    </label>
                                    <input type="text" id="item-name" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0628\u0627\u0631\u0627\u0633\u064A\u062A\u0627\u0645\u0648\u0644 500 \u0645\u062C\u0645" required>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-sort-numeric-up ml-2"></i>
                                        \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 *
                                    </label>
                                    <input type="number" id="quantity" class="form-input" placeholder="\u0645\u062B\u0627\u0644: 10" min="1" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-ruler ml-2"></i>
                                        \u0627\u0644\u0648\u062D\u062F\u0629
                                    </label>
                                    <input type="text" id="unit" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0639\u0644\u0628\u0629\u060C \u0639\u0628\u0648\u0629\u060C \u0642\u0637\u0639\u0629">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-comment-alt ml-2"></i>
                                    \u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628
                                </label>
                                <textarea id="request-notes" class="form-textarea" rows="3" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631..."></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-exclamation-triangle ml-2"></i>
                                    \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629
                                </label>
                                <select id="priority" class="form-input">
                                    <option value="normal">\u0639\u0627\u062F\u064A\u0629</option>
                                    <option value="high">\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="urgent">\u0639\u0627\u062C\u0644\u0629</option>
                                </select>
                            </div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-paper-plane ml-2"></i>
                                    \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628
                                </button>
                                <button type="reset" class="btn-secondary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            ${i?"\u062C\u0645\u064A\u0639 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A":"\u0637\u0644\u0628\u0627\u062A\u064A"}
                        </h2>
                    </div>
                    <div class="card-body">
                        ${this.renderSupplyRequestsList(n,i)}
                    </div>
                </div>
            </div>
        `,this.applyModuleI18n(e);const s=e.querySelector("#supply-request-form");s&&s.addEventListener("submit",a=>{a.preventDefault(),this.submitSupplyRequest()}),e.querySelectorAll('[data-action="view-request"]').forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-id");this.viewSupplyRequest(o)})}),e.querySelectorAll('[data-action="update-status"]').forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-id"),l=a.getAttribute("data-status");this.updateSupplyRequestStatus(o,l)})}),setTimeout(()=>{const a=e.querySelector(".clinic-table-wrapper");a&&this.setupTableScrollListeners(a)},100)},renderSupplyRequestsList(e,t){return!e||e.length===0?'<p class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>':`
            <div class="table-wrapper clinic-table-wrapper" style="overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u0627\u0644\u0645\u0642\u062F\u0645</th>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631</th>
                            <th class="text-center">\u0627\u0644\u0643\u0645\u064A\u0629</th>
                            <th class="text-center">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th class="text-center">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="text-center">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(n=>{const s=this.formatDate(n.createdAt||n.requestDate,!0),a=n.requestedBy?.name||n.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",o=n.status||"pending",l=n.priority||"normal",r={pending:'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',approved:'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',fulfilled:'<span class="badge badge-info">\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>'}[o]||'<span class="badge">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',c={urgent:'<span class="badge badge-danger">\u0639\u0627\u062C\u0644\u0629</span>',high:'<span class="badge badge-warning">\u0639\u0627\u0644\u064A\u0629</span>',normal:'<span class="badge badge-info">\u0639\u0627\u062F\u064A\u0629</span>'}[l]||'<span class="badge">\u0639\u0627\u062F\u064A\u0629</span>',p={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[n.type]||n.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <tr>
                    <td>${this.formatDate(n.createdAt||n.requestDate,!0)}</td>
                    <td>${Utils.escapeHTML(a)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td>${Utils.escapeHTML(n.itemName||"")}</td>
                    <td class="text-center">${n.quantity||""} ${Utils.escapeHTML(n.unit||"")}</td>
                    <td class="text-center">${c}</td>
                    <td class="text-center">${r}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-request" data-id="${Utils.escapeHTML(n.id||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${t&&o==="pending"?`
                            <button type="button" class="btn-icon btn-icon-success" data-action="update-status" data-id="${Utils.escapeHTML(n.id||"")}" data-status="approved" title="\u0645\u0648\u0627\u0641\u0642\u0629">
                                <i class="fas fa-check"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-danger" data-action="update-status" data-id="${Utils.escapeHTML(n.id||"")}" data-status="rejected" title="\u0631\u0641\u0636">
                                <i class="fas fa-times"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async submitSupplyRequest(){const e=document.getElementById("request-type")?.value,t=document.getElementById("item-name")?.value?.trim(),i=parseInt(document.getElementById("quantity")?.value),n=document.getElementById("unit")?.value?.trim()||"\u0648\u062D\u062F\u0629",s=document.getElementById("request-notes")?.value?.trim(),a=document.getElementById("priority")?.value||"normal";if(!e||!t||!i){Notification?.error?.("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show();try{const o={id:`REQ-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,type:e,itemName:t,quantity:i,unit:n,notes:s,priority:a,status:"pending",requestedBy:{id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},createdAt:new Date().toISOString(),requestDate:new Date().toISOString()},l=await GoogleIntegration.sendRequest({action:"addSupplyRequest",data:o});if(l&&l.success)AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]),AppState.appData.clinicSupplyRequests.push(o),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyAdminAboutSupplyRequest(o),this.renderSupplyRequestTab(),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),document.getElementById("supply-request-form")?.reset();else throw new Error(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(o){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C:",o),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628: "+(o.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},viewSupplyRequest(e){const t=AppState.appData.clinicSupplyRequests?.find(s=>s.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</h2>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</label>
                            <p class="text-gray-800">${this.formatDate(t.createdAt||t.requestDate,!0)}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0642\u062F\u0645</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.requestedBy?.name||t.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</label>
                            <p class="text-gray-800">${Utils.escapeHTML({medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[t.type]||t.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631</label>
                            <p class="text-gray-800">${Utils.escapeHTML(t.itemName||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0645\u064A\u0629</span>
                            <p class="text-gray-800">${t.quantity||""} ${Utils.escapeHTML(t.unit||"")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                            <p class="text-gray-800">${Utils.escapeHTML({urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[t.priority]||"\u0639\u0627\u062F\u064A\u0629")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="text-gray-800">${Utils.escapeHTML({pending:"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[t.status]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                        </div>
                    </div>
                    ${t.notes?`
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(t.notes)}</p>
                    </div>
                    `:""}
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(i);const n=()=>i.remove();i.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>s.addEventListener("click",n)),i.addEventListener("click",s=>{s.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n()})},updateSupplyRequestStatus(e,t){const i=AppState.appData.clinicSupplyRequests?.find(s=>s.id===e);if(!i){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}i.status=t,i.updatedAt=new Date().toISOString(),i.updatedBy={id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},typeof DataManager<"u"&&DataManager.save&&DataManager.save();const n={approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[t]||t;Notification?.success?.(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649: ${n}`),this.renderSupplyRequestTab()},showEnhancedVisitForm(e=null){if(typeof this.showVisitForm=="function")return this.showVisitForm(e);const t=!!e;this.ensureData();const i=document.createElement("div");i.className="modal-overlay";const n=e?.personType||"employee",s=e?.visitDate?Utils.toDateTimeLocalString(e.visitDate):Utils.toDateTimeLocalString(new Date),a=e?.exitDate?Utils.toDateTimeLocalString(e.exitDate):"",o=new Date;o.setHours(0,0,0,0);const l=(AppState.appData.clinicVisits||[]).filter(u=>{if(!u.visitDate)return!1;try{const g=new Date(u.visitDate);return g.setHours(0,0,0,0),g.getTime()===o.getTime()}catch{return!1}}).length,r=new Date;r.setDate(1),r.setHours(0,0,0,0);const c=(AppState.appData.clinicVisits||[]).filter(u=>{if(!u.visitDate)return!1;try{return new Date(u.visitDate)>=r}catch{return!1}}).length;i.innerHTML=`
            <div class="modal-content" style="max-width: 1400px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; height: 90vh;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; border-radius: 20px 20px 0 0; flex-shrink: 0;">
                    <h2 class="modal-title" style="color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-hospital-user" style="font-size: 28px;"></i>
                        ${t?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0644\u0639\u064A\u0627\u062F\u0629"}
                    </h2>
                    <button class="modal-close" style="color: white; font-size: 24px; background: rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 12px; transition: all 0.3s;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="display: flex; flex: 1; overflow: hidden; flex-direction: row-reverse;">
                    <!-- \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
                    <div class="modal-body" style="padding: 30px; background: #f8f9fa; flex: 1; overflow-y: auto;">
                        <form id="enhanced-visit-form" class="space-y-6">
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #667eea; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-user-circle" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-users text-purple-600"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u0645\u0631\u064A\u0636 *
                                    </label>
                                    <select id="enhanced-visit-person-type" required class="form-input" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px; transition: all 0.3s;">
                                        <option value="employee" ${n==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                        <option value="contractor" ${n==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                        <option value="external" ${n==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                    </select>
                                </div>
                                
                                <div id="enhanced-visit-employee-code-container">
                                    <label for="enhanced-visit-employee-code" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-id-card text-purple-600"></i>
                                        \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A *
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-code" class="form-input" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A" value="${Utils.escapeHTML(e?.employeeCode||e?.employeeNumber||"")}" autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px; transition: all 0.3s;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-name" class="block text-sm font-semibold text-gray-700 mb-2" id="enhanced-visit-employee-name-label" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-user text-purple-600"></i>
                                        \u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636 *
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-name" required class="form-input" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" value="${Utils.escapeHTML(e?.employeeName||e?.contractorName||e?.externalName||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px; transition: all 0.3s;">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" id="enhanced-visit-employee-details-container">
                                <div>
                                    <label for="enhanced-visit-employee-position" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-briefcase text-purple-600"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-position" class="form-input" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629" value="${Utils.escapeHTML(e?.employeePosition||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-department" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-building text-purple-600"></i>
                                        \u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-department" class="form-input" placeholder="\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629" value="${Utils.escapeHTML(e?.employeeDepartment||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-factory" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-industry text-purple-600"></i>
                                        \u0627\u0644\u0645\u0635\u0646\u0639
                                    </label>
                                    <select id="enhanced-visit-factory" class="form-input" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                        ${this.getSiteOptions().map(u=>`
                                            <option value="${u.id}" ${e?.factory===u.id||e?.factory===u.name?"selected":""}>${Utils.escapeHTML(u.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-location" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-map-marker-alt text-purple-600"></i>
                                        \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span>
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-location" required class="form-input" list="enhanced-visit-employee-location-datalist" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644" value="${Utils.escapeHTML(e?.employeeLocation||e?.workArea||"")}" autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                    <datalist id="enhanced-visit-employee-location-datalist"></datalist>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                        <div class="form-section" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #fc6c85; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-calendar-check" style="font-size: 24px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="enhanced-visit-date" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-clock text-orange-600"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 *
                                    </label>
                                    <input type="datetime-local" id="enhanced-visit-date" required class="form-input" value="${s}" style="border: 2px solid #fc6c85; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-exit-date" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-sign-out-alt text-orange-600"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C
                                    </label>
                                    <input type="datetime-local" id="enhanced-visit-exit-date" class="form-input" value="${a}" style="border: 2px solid #fc6c85; border-radius: 10px; padding: 12px;">
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C -->
                        <div class="form-section" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #4facfe; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-stethoscope" style="font-size: 24px;"></i>
                                \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C
                            </h3>
                            
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label for="enhanced-visit-type" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-tag text-blue-600"></i>
                                        \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *
                                    </label>
                                    <select id="enhanced-visit-type" required class="form-input" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 --</option>
                                        ${(t&&!e?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(u=>`<option value="${Utils.escapeHTML(u)}" selected>${Utils.escapeHTML(u)}</option>`).join("")}
                                        ${this.getVisitTypeOptions().map(u=>`<option value="${Utils.escapeHTML(u)}" ${(e?.visitType||"")===u?"selected":""}>${Utils.escapeHTML(u)}</option>`).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label for="enhanced-visit-reason" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-question-circle text-blue-600"></i>
                                        \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *
                                    </label>
                                    <input type="text" id="enhanced-visit-reason" required class="form-input" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629" value="${Utils.escapeHTML(e?.reason||"")}" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-diagnosis" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-diagnoses text-blue-600"></i>
                                        \u0627\u0644\u062A\u0634\u062E\u064A\u0635
                                    </label>
                                    <textarea id="enhanced-visit-diagnosis" rows="3" class="form-input" placeholder="\u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0637\u0628\u064A" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">${Utils.escapeHTML(e?.diagnosis||"")}</textarea>
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-treatment" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-pills text-blue-600"></i>
                                        \u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                                    </label>
                                    <textarea id="enhanced-visit-treatment" rows="3" class="form-input" placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0623\u0648 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">${Utils.escapeHTML(e?.treatment||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                    
                    <!-- \u0627\u0644\u0645\u0633\u0637\u0631\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 -->
                    <div style="width: 320px; background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%); border-right: 2px solid #e2e8f0; padding: 25px; overflow-y: auto; flex-shrink: 0;">
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-chart-line" style="font-size: 20px;"></i>
                                \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                                        <span style="font-size: 13px; opacity: 0.9;">\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u064A\u0648\u0645</span>
                                        <i class="fas fa-calendar-day" style="font-size: 16px;"></i>
                                    </div>
                                    <div style="font-size: 28px; font-weight: bold;">${l}</div>
                                </div>
                                <div style="background: linear-gradient(135deg, #fc6c85 0%, #ff8a95 100%); color: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                                        <span style="font-size: 13px; opacity: 0.9;">\u0632\u064A\u0627\u0631\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631</span>
                                        <i class="fas fa-calendar-alt" style="font-size: 16px;"></i>
                                    </div>
                                    <div style="font-size: 28px; font-weight: bold;">${c}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-compass" style="font-size: 20px;"></i>
                                \u0627\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u0633\u0631\u064A\u0639
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <button type="button" class="sidebar-nav-btn" data-section="0" style="background: white; border: 2px solid #667eea; color: #667eea; padding: 12px 15px; border-radius: 10px; text-align: right; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: space-between;">
                                    <span><i class="fas fa-user-circle ml-2"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636</span>
                                    <i class="fas fa-arrow-left" style="font-size: 12px;"></i>
                                </button>
                                <button type="button" class="sidebar-nav-btn" data-section="1" style="background: white; border: 2px solid #fc6c85; color: #fc6c85; padding: 12px 15px; border-radius: 10px; text-align: right; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: space-between;">
                                    <span><i class="fas fa-calendar-check ml-2"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629</span>
                                    <i class="fas fa-arrow-left" style="font-size: 12px;"></i>
                                </button>
                                <button type="button" class="sidebar-nav-btn" data-section="2" style="background: white; border: 2px solid #4facfe; color: #4facfe; padding: 12px 15px; border-radius: 10px; text-align: right; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: space-between;">
                                    <span><i class="fas fa-stethoscope ml-2"></i>\u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C</span>
                                    <i class="fas fa-arrow-left" style="font-size: 12px;"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-lightbulb" style="font-size: 20px;"></i>
                                \u0646\u0635\u0627\u0626\u062D \u0633\u0631\u064A\u0639\u0629
                            </h3>
                            <div style="background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); padding: 15px; border-radius: 12px; border-right: 4px solid #F57F17;">
                                <div style="color: #F57F17; font-size: 13px; line-height: 1.8;">
                                    <div style="margin-bottom: 10px;">
                                        <i class="fas fa-check-circle ml-2"></i>
                                        <strong>\u062A\u0623\u0643\u062F \u0645\u0646:</strong> \u0625\u062F\u062E\u0627\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (*)
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <i class="fas fa-clock ml-2"></i>
                                        <strong>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:</strong> \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <i class="fas fa-user-check ml-2"></i>
                                        <strong>\u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646:</strong> \u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0641\u0642\u0637
                                    </div>
                                    <div>
                                        <i class="fas fa-save ml-2"></i>
                                        <strong>\u0627\u0644\u062D\u0641\u0638:</strong> \u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-info-circle" style="font-size: 20px;"></i>
                                \u0645\u0639\u0644\u0648\u0645\u0627\u062A
                            </h3>
                            <div style="background: white; padding: 15px; border-radius: 12px; border: 2px solid #e2e8f0;">
                                <div style="color: #64748b; font-size: 13px; line-height: 1.8;">
                                    <div style="margin-bottom: 10px; display: flex; align-items: start; gap: 8px;">
                                        <i class="fas fa-user-md" style="color: #667eea; margin-top: 3px;"></i>
                                        <span>\u064A\u0645\u0643\u0646\u0643 \u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</span>
                                    </div>
                                    <div style="margin-bottom: 10px; display: flex; align-items: start; gap: 8px;">
                                        <i class="fas fa-history" style="color: #667eea; margin-top: 3px;"></i>
                                        <span>\u0633\u064A\u062A\u0645 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0643\u0627\u0645\u0644 \u0644\u0644\u0632\u064A\u0627\u0631\u0629 \u0645\u0639 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</span>
                                    </div>
                                    <div style="display: flex; align-items: start; gap: 8px;">
                                        <i class="fas fa-shield-alt" style="color: #667eea; margin-top: 3px;"></i>
                                        <span>\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0645\u064A\u0629 \u0648\u0645\u0634\u0641\u0631\u0629</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer form-actions-centered" style="background: #f8f9fa; border-radius: 0 0 20px 20px; padding: 20px 30px; display: flex; justify-content: flex-end; gap: 15px; flex-shrink: 0;">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 12px 30px; border-radius: 10px; font-size: 16px;">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" form="enhanced-visit-form" class="btn-primary" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4); padding: 12px 30px; border-radius: 10px; font-size: 16px; transition: all 0.3s;">
                        <i class="fas fa-save ml-2"></i>
                        ${t?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":"\u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i),i.addEventListener("click",u=>{u.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i.remove()});const p=i.querySelector("#enhanced-visit-form"),f=i.querySelector("#enhanced-visit-person-type");f?.addEventListener("change",()=>{const u=f.value,g=i.querySelector("#enhanced-visit-employee-code-container"),y=i.querySelector("#enhanced-visit-employee-details-container"),h=i.querySelector("#enhanced-visit-employee-code"),x=i.querySelector("#enhanced-visit-employee-name"),T=i.querySelector("#enhanced-visit-employee-name-label"),A=i.querySelector("#enhanced-visit-employee-department"),D=i.querySelector("#enhanced-visit-factory");u==="employee"?(g.style.display="block",y.style.display="grid",h.required=!0,x.readOnly=!0,x.placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",T.innerHTML='<i class="fas fa-user text-purple-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *',A&&(A.readOnly=!0,A.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"),D&&(D.style.display="block")):(g.style.display="none",y.style.display="none",h.required=!1,x.readOnly=!1,x.placeholder=u==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644",T.innerHTML=`<i class="fas fa-user text-purple-600"></i> ${u==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"} *`,A&&(A.readOnly=!1,A.placeholder=""),D&&(D.style.display="none"))}),p?.addEventListener("submit",async u=>{u.preventDefault(),await this.saveEnhancedVisit(e,t,i)}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"),i.querySelectorAll(".sidebar-nav-btn").forEach(u=>{u.addEventListener("click",()=>{const y=parseInt(u.getAttribute("data-section"),10),h=i.querySelectorAll(".form-section");h[y]&&h[y].scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})});const g=u.style.borderColor;u.addEventListener("mouseenter",()=>{u.style.background=g,u.style.color="white",u.style.transform="translateX(-5px)"}),u.addEventListener("mouseleave",()=>{u.style.background="white",u.style.color=g,u.style.transform="translateX(0)"})});const m=i.querySelector('button[type="submit"]');m?.addEventListener("mouseenter",()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 6px 20px 0 rgba(102, 126, 234, 0.6)"}),m?.addEventListener("mouseleave",()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 4px 15px 0 rgba(102, 126, 234, 0.4)"})},async saveEnhancedVisit(e,t,i){Loading.show();try{const n=document.getElementById("enhanced-visit-person-type").value,s=document.getElementById("enhanced-visit-employee-code")?.value.trim()||"",a=document.getElementById("enhanced-visit-employee-name").value.trim(),o=document.getElementById("enhanced-visit-employee-position")?.value.trim()||"",l=document.getElementById("enhanced-visit-employee-department")?.value.trim()||"",r=document.getElementById("enhanced-visit-factory")?.value.trim()||null,c=document.getElementById("enhanced-visit-employee-location").value.trim(),p=document.getElementById("enhanced-visit-date").value,f=document.getElementById("enhanced-visit-exit-date").value||null,d=document.getElementById("enhanced-visit-type")?.value?.trim()||null,m=document.getElementById("enhanced-visit-reason").value.trim(),u=document.getElementById("enhanced-visit-diagnosis").value.trim(),g=document.getElementById("enhanced-visit-treatment").value.trim();let y=null;if(r){const v=this.getSiteOptions().find(U=>U.id===r);y=v?v.name:null}let h=null,x=null;if(p&&p.trim())try{const[j,v]=p.split("T");if(j&&v){const[U,N,$]=j.split("-").map(Number),[R,F]=v.split(":").map(Number),Q=new Date(U,N-1,$,R,F,0,0);isNaN(Q.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",p):h=Q.toISOString()}else{const U=new Date(p);isNaN(U.getTime())||(h=U.toISOString())}}catch(j){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",j)}if(f&&f.trim())try{const[j,v]=f.split("T");if(j&&v){const[U,N,$]=j.split("-").map(Number),[R,F]=v.split(":").map(Number),Q=new Date(U,N-1,$,R,F,0,0);isNaN(Q.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",f):x=Q.toISOString()}else{const U=new Date(f);isNaN(U.getTime())||(x=U.toISOString())}}catch(j){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",j)}if(!AppState.currentUser){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F! \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0646 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645."),Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}if(!AppState.currentUser.name&&!AppState.currentUser.email&&!AppState.currentUser.id){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 name \u0623\u0648 email \u0623\u0648 id!",AppState.currentUser),Notification.error("\u062E\u0637\u0623: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const T=AppState.currentUser,A=(T?.email||"").toString().toLowerCase().trim(),b=(AppState.appData.users||[]).find(j=>(j.email||"").toString().toLowerCase().trim()===A);let S="";b&&b.name&&b.name.trim()!==""?S=b.name.trim():T?.name&&T.name.trim()!==""?S=T.name.trim():A?S=A:S="\u0645\u0633\u062A\u062E\u062F\u0645";const L=S,C=n==="contractor",I={id:e?.id||Utils.generateId("VISIT"),personType:n,employeeCode:C?null:s,employeeName:C?null:a,employeePosition:C?null:o,employeeDepartment:C?null:l,employeeLocation:C?null:c,contractorName:C?a:null,contractorWorkerName:C?s:null,contractorPosition:C?o:null,factory:r,factoryName:y,workArea:c,visitDate:h,exitDate:x,visitType:d,reason:m,diagnosis:u,treatment:g,medications:[],createdAt:e?.createdAt||new Date().toISOString(),createdBy:S,updatedAt:new Date().toISOString(),updatedBy:L,email:AppState.currentUser?.email||"",userId:AppState.currentUser?.id||""};if(I.createdBy==="\u0627\u0644\u0646\u0638\u0627\u0645"||typeof I.createdBy=="object"&&I.createdBy.name,AppState.debugMode&&(Utils.safeLog("\u{1F50D} formData.createdBy \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0642\u0628\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 (\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 string):",I.createdBy),Utils.safeLog("\u{1F50D} formData.createdBy type:",typeof I.createdBy)),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t){const j=AppState.appData.clinicVisits.findIndex(v=>v.id===I.id);j!==-1&&(AppState.appData.clinicVisits[j]=I)}else AppState.appData.clinicVisits.push(I);typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{const j=this.getMonthlyVisitsAlertThreshold(),v=this.getMonthlyVisitCountForPerson(I);if(v>=j){const U=(I.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+U+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+j+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(I,v).catch(function(N){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",N)})}}catch(j){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",j)}const E=45e3;try{AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend:",{action:t?"updateClinicVisit":"addClinicVisit",createdBy:I.createdBy,createdByType:typeof I.createdBy,createdByName:typeof I.createdBy=="object"?I.createdBy.name:I.createdBy});const j=await GoogleIntegration.sendRequest({action:t?"updateClinicVisit":"addClinicVisit",data:t?{visitId:I.id,updateData:I,__timeoutMs:E}:{...I,__timeoutMs:E}});this.assertClinicVisitRpcResult(j),t||this.applyClinicVisitIdFromServer(I,j),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend \u0628\u0646\u062C\u0627\u062D",j),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(j){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u062F \u062A\u0643\u0648\u0646 \u062D\u064F\u0641\u0638\u062A):",j),Loading.hide();try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}return}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),i.remove(),this.state.activeTab==="visits"&&this.renderVisitsTab()}catch(n){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+n.message)}},async handleInjuryAttachmentsChange(e){if(!e||e.length===0)return;const t=Array.from(e),i=["jpg","jpeg","png","pdf"],n=5*1024*1024;for(const a of t){const o=(a.name.split(".").pop()||"").toLowerCase();if(!i.includes(o)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${a.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(a.size>n){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${a.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const l=await this.readFileAsBase64(a);this.state.currentInjuryAttachments.push({id:Utils.generateId("ATT"),name:a.name,type:a.type||this.detectMimeType(a.name),data:l,size:Math.round(a.size/1024),uploadedAt:new Date().toISOString()})}catch(l){Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641:",l),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${a.name}`)}}this.renderInjuryAttachmentsPreview();const s=document.getElementById("injury-attachments-input");s&&(s.value="")},renderInjuryAttachmentsPreview(){const e=document.getElementById("injury-attachments-preview");if(e){if(!this.state.currentInjuryAttachments||this.state.currentInjuryAttachments.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F</p>';return}e.innerHTML=this.state.currentInjuryAttachments.map((t,i)=>{const n=t.type&&t.type.startsWith("image/"),s=n?"fa-image":"fa-file-pdf",a=t.size||0;return`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <i class="fas ${s} text-blue-600 text-xl"></i>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">${Utils.escapeHTML(t.name)}</p>
                            <p class="text-xs text-gray-500">${a} KB</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${n?`
                            <button type="button" class="btn-icon btn-icon-primary" onclick="Clinic.previewAttachment(${i})" title="\u0645\u0639\u0627\u064A\u0646\u0629">
                                <i class="fas fa-eye"></i>
                            </button>
                        `:""}
                        <button type="button" class="btn-icon btn-icon-danger" onclick="Clinic.removeInjuryAttachment(${i})" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `}).join("")}},removeInjuryAttachment(e){e<0||e>=this.state.currentInjuryAttachments.length||(this.state.currentInjuryAttachments.splice(e,1),this.renderInjuryAttachmentsPreview(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0631\u0641\u0642"))},previewAttachment(e){const t=this.state.currentInjuryAttachments[e];if(!t||!t.type||!t.type.startsWith("image/"))return;const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh;">
                <div class="modal-header">
                    <h3 class="modal-title">${Utils.escapeHTML(t.name)}</h3>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="display: flex; align-items: center; justify-content: center; max-height: 70vh; overflow: auto;">
                    <img src="${t.data}" alt="${Utils.escapeHTML(t.name)}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
            </div>
        `,document.body.appendChild(i);const n=i.querySelector(".modal-close");n&&n.addEventListener("click",()=>i.remove()),i.addEventListener("click",s=>{s.target===i&&i.remove()})},readFileAsBase64(e){return new Promise((t,i)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=s=>i(s),n.readAsDataURL(e)})},detectMimeType(e){if(!e)return"application/octet-stream";const t=e.split(".").pop().toLowerCase();return{jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",pdf:"application/pdf"}[t]||"application/octet-stream"},cleanup(){try{Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module..."),this.state.currentInjuryAttachments=[],this.state.medicationAlertsNotified.clear(),this.state.initialized=!1,Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Clinic module:",e)}}};typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic),(function(){"use strict";try{typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic,window.addEventListener("formSettingsUpdated",function(){try{typeof Clinic<"u"&&Clinic.refreshSiteDropdowns&&Clinic.refreshSiteDropdowns()}catch{}}),Clinic.load,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&(Utils.safeLog("\u2705 Clinic module loaded and available on window.Clinic"),Utils.safeLog("\u2705 Clinic.load function exists: "+(typeof Clinic.load=="function"))))}catch{if(typeof window<"u"&&typeof Clinic<"u")try{window.Clinic=Clinic}catch{}}})();
