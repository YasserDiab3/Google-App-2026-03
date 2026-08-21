const Clinic={state:{activeTab:"medications",activeVisitType:"employees",activeInjuryType:"employees",filters:{medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}},currentInjuryAttachments:[],medicationAlertsNotified:new Set,initialized:!1},_clinicVisitsLoadPromise:null,_visitsBackendFetchOk:!1,getUserDisplayName(e){if(!e)return"-";if(typeof e=="object"&&e!==null){if(e.name&&typeof e.name=="string"&&e.name.trim())return e.name.trim();if(e=e.email||e.id||"",!e)return"-"}const t=String(e).toLowerCase().trim();if(!t)return"-";if(t==="system"||t==="\u0627\u0644\u0646\u0638\u0627\u0645"||t==="admin")return"\u0627\u0644\u0646\u0638\u0627\u0645";if(AppState&&AppState.appData&&Array.isArray(AppState.appData.users)){const a=AppState.appData.users.find(s=>String(s.email||"").toLowerCase().trim()===t||String(s.id||"").toLowerCase().trim()===t||String(s.name||"").toLowerCase().trim()===t);if(a&&a.name)return a.name}return String(e)},processAttachmentUrl(e){if(!e||typeof e!="string")return null;let t=e.trim();const a=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,s=t.match(a);return s&&(t="https://lh3.googleusercontent.com/d/"+s[1]),t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")?t:null},getCurrentLanguage(){try{return localStorage.getItem("language")||typeof AppState<"u"&&AppState?.currentLanguage||"ar"}catch{return"ar"}},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const a=e||document.getElementById("clinic-section")||document;t.applyI18n(a),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(a)},getTranslations(){const e=this.getCurrentLanguage(),t=e==="ar",a={ar:{"table.employeeCode":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","table.contractorName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","table.name":"\u0627\u0644\u0627\u0633\u0645","table.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","table.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","table.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","table.entryTime":"\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644","table.exitTime":"\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C","table.totalTime":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","table.reason":"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","table.diagnosis":"\u0627\u0644\u062A\u0634\u062E\u064A\u0635","table.medications":"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.medicationType":"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621","table.quantity":"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.dispenseDate":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","table.patientName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","table.department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629","table.medicationStatus":"\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0648\u0627\u0621","table.notes":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","table.actions":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A","table.notRecorded":"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647","btn.registerVisit":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629","btn.refresh":"\u062A\u062D\u062F\u064A\u062B","btn.exportExcel":"\u062A\u0635\u062F\u064A\u0631 Excel","btn.exportPDF":"\u062A\u0635\u062F\u064A\u0631 PDF","btn.reset":"\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646","btn.view":"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","btn.edit":"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","tab.visits":"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","tab.employees":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646","tab.contractors":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","tab.dispensedLog":"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","filter.search":"\u0627\u0644\u0628\u062D\u062B","filter.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","filter.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","filter.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","filter.all":"\u0627\u0644\u0643\u0644","filter.searchPlaceholder":"\u0627\u0628\u062D\u062B \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...","empty.noResults":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0628\u062D\u062B\u0643.","empty.noEmployeeVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","empty.noContractorVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","time.lessThanMinute":"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629","time.minutes":"\u062F\u0642\u064A\u0642\u0629","time.hours":"\u0633\u0627\u0639\u0629","time.days":"\u064A\u0648\u0645"},en:{"table.employeeCode":"Employee Code","table.contractorName":"Contractor Name","table.name":"Name","table.jobTitle":"Job Title","table.factory":"Factory","table.workplace":"Workplace","table.entryTime":"Entry Time","table.exitTime":"Exit Time","table.totalTime":"Total Time","table.reason":"Reason for Visit","table.diagnosis":"Diagnosis","table.medications":"Dispensed Medications","table.medicationType":"Medication Type","table.quantity":"Dispensed Quantity","table.dispenseDate":"Dispense Date","table.patientName":"Patient Name","table.department":"Department","table.medicationStatus":"Medication Status","table.notes":"Notes","table.actions":"Actions","table.notRecorded":"Not Recorded","btn.registerVisit":"Register Visit","btn.refresh":"Refresh","btn.exportExcel":"Export Excel","btn.exportPDF":"Export PDF","btn.reset":"Reset","btn.view":"View Details","btn.edit":"Edit Visit","tab.visits":"Clinic Attendance Record","tab.employees":"Employees","tab.contractors":"Contractors","tab.dispensedLog":"Dispensed Medications Log","filter.search":"Search","filter.factory":"Factory","filter.jobTitle":"Job Title","filter.workplace":"Workplace","filter.all":"All","filter.searchPlaceholder":"Search all data...","empty.noResults":"No results match your search.","empty.noEmployeeVisits":"No employee visits recorded.","empty.noContractorVisits":"No contractor visits recorded.","time.lessThanMinute":"Less than a minute","time.minutes":"minute","time.hours":"hour","time.days":"day"}};return{t:s=>a[e]?.[s]||s,isRTL:t,lang:e}},clinicAnalysisCharts:null,getClinicAnalysisStorageKeys(){return{cards:"clinic_infoCards",items:"clinic_analysisItems"}},getClinicDefaultAnalysisCards(){return[{id:"card_total_visits",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",icon:"fas fa-hospital-user",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalVisits"},{id:"card_total_dispensed_qty",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",icon:"fas fa-prescription-bottle-alt",color:"green",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!0,mode:"metric",metric:"totalDispensedQty"},{id:"card_expired_meds",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",enabled:!0,mode:"metric",metric:"expiredMedications"},{id:"card_low_stock",title:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",icon:"fas fa-box-open",color:"orange",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0630\u0627\u062A \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0646\u062E\u0641\u0636 (\u2264 10)",enabled:!0,mode:"metric",metric:"lowStockMedications"},{id:"card_visits_with_meds",title:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",icon:"fas fa-capsules",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u0641\u064A\u0647\u0627 \u0635\u0631\u0641 \u062F\u0648\u0627\u0621 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",enabled:!1,mode:"metric",metric:"visitsWithMedications"},{id:"card_unique_dispensed",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",icon:"fas fa-pills",color:"purple",description:"\u0639\u062F\u062F \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!1,mode:"metric",metric:"uniqueDispensedMedications"}]},getClinicDefaultAnalysisItems(){return[{id:"visits_by_reason",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!0,dataset:"visits",field:"reason",chartType:"auto"},{id:"visits_by_personType",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)",enabled:!0,dataset:"visits",field:"personType",chartType:"auto"},{id:"visits_by_factory",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"visits",field:"factoryName",chartType:"bar"},{id:"meds_by_status",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"medications",field:"status",chartType:"doughnut"},{id:"meds_by_type",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"medications",field:"type",chartType:"bar"},{id:"disp_top_meds",label:"\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0635\u0631\u0641\u0627\u064B (\u0645\u0631\u0627\u062A)",enabled:!0,dataset:"dispensedMedications",field:"medicationName",chartType:"bar"},{id:"disp_by_dept",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"department",chartType:"bar"},{id:"disp_by_ptype",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635",enabled:!1,dataset:"dispensedMedications",field:"personType",chartType:"doughnut"},{id:"disp_by_reason",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"visitReason",chartType:"bar"},{id:"injuries_by_type",label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"injuries",field:"injuryType",chartType:"bar"},{id:"sickleave_by_status",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"sickLeave",field:"status",chartType:"doughnut"},{id:"supply_by_status",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"supplyRequests",field:"status",chartType:"doughnut"}]},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(t=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),t(!0))},100);setTimeout(()=>{clearInterval(a),t(typeof Chart<"u")},5e3)}):new Promise(t=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous";let s=!1;const n=i=>{s||(s=!0,t(!!i))};a.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),a.onerror=()=>{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",i.crossOrigin="anonymous",i.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),i.onerror=()=>n(!1),document.head.appendChild(i)},setTimeout(()=>n(typeof Chart<"u"),8e3);try{document.head.appendChild(a)}catch{n(!1)}})},injectTableScrollbarStyles(){const e="clinic-table-scrollbar-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
        `,document.head.appendChild(t)},setupTableScrollListeners(e){if(!e)return;const t=()=>{const a=e.scrollTop,s=e.scrollLeft,n=e.scrollHeight,i=e.scrollWidth,o=e.clientHeight,l=e.clientWidth;a===0?e.classList.add("scrolled-top"):e.classList.remove("scrolled-top"),a+o>=n-1?e.classList.add("scrolled-bottom"):e.classList.remove("scrolled-bottom"),s===0?e.classList.add("scrolled-left"):e.classList.remove("scrolled-left"),s+l>=i-1?e.classList.add("scrolled-right"):e.classList.remove("scrolled-right")};e.addEventListener("scroll",t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{t()}).observe(e),t()},_clinicAttendanceScrollTable(e,t){return`<div class="table-wrapper clinic-table-wrapper clinic-attendance-scroll-table" style="overflow-x:auto;overflow-y:auto;max-height:${t||"42vh"};">${e}</div>`},renderAttendanceQuickNav(e){return!Array.isArray(e)||!e.length?"":`<div class="clinic-attendance-quick-nav" id="clinic-attendance-quick-nav">
            <button type="button" class="clinic-attendance-quick-nav-toggle" id="clinic-attendance-quick-nav-toggle" aria-expanded="false" title="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u062A\u0645\u0631\u064A\u0631">
                <span><i class="fas fa-list-ul ml-2"></i>\u0627\u0644\u0623\u0642\u0633\u0627\u0645</span>
                <i class="fas fa-chevron-up clinic-attendance-quick-nav-chevron"></i>
            </button>
            <div class="clinic-attendance-quick-nav-panel" id="clinic-attendance-quick-nav-panel" hidden>${e.map(a=>`
            <button type="button" class="clinic-attendance-quick-nav-item" data-target="${Utils.escapeAttr(a.id)}">
                <i class="fas ${Utils.escapeAttr(a.icon||"fa-circle")} ml-2"></i>${Utils.escapeHTML(a.label||"")}
            </button>
        `).join("")}</div>
        </div>`},bindAttendanceQuickNav(e){const t=e?.querySelector("#clinic-attendance-quick-nav");if(!t)return;const a=t.querySelector("#clinic-attendance-quick-nav-toggle"),s=t.querySelector("#clinic-attendance-quick-nav-panel"),n=()=>{t.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),s&&(s.hidden=!0)},i=()=>{t.classList.add("open"),a&&a.setAttribute("aria-expanded","true"),s&&(s.hidden=!1)};a?.addEventListener("click",o=>{o.stopPropagation(),t.classList.contains("open")?n():i()}),t.querySelectorAll(".clinic-attendance-quick-nav-item").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.target;if(l==="clinic-attendance-section-timeoff"){n(),this.showTimeOffRequestModal();return}const r=l?document.getElementById(l):null;r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),r.style.transition="box-shadow 0.3s",r.style.boxShadow="0 0 0 3px rgba(13,148,136,0.35)",setTimeout(()=>{r.style.boxShadow=""},1200)),n()})}),this._attendanceQuickNavDocListener||(this._attendanceQuickNavDocListener=o=>{const l=document.querySelector("#clinic-attendance-quick-nav.open");if(l&&!l.contains(o.target)){l.classList.remove("open");const r=l.querySelector("#clinic-attendance-quick-nav-toggle"),c=l.querySelector("#clinic-attendance-quick-nav-panel");r&&r.setAttribute("aria-expanded","false"),c&&(c.hidden=!0)}},document.addEventListener("click",this._attendanceQuickNavDocListener)),this._syncAttendanceQuickNavVisibility()},_syncAttendanceQuickNavVisibility(){const e=this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab();document.querySelectorAll("#clinic-attendance-quick-nav").forEach(t=>{t.style.display=e?"":"none"})},initAttendanceTableScroll(e){this.injectTableScrollbarStyles(),e?.querySelectorAll(".clinic-table-wrapper").forEach(t=>this.setupTableScrollListeners(t))},loadClinicDataAnalysis(){if(!this.isCurrentUserAdmin())return;this.loadClinicInfoCards();const e=this.getClinicAnalysisStorageKeys(),t=localStorage.getItem(e.items)||"[]";let a=[];try{a=JSON.parse(t)||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(e.items,JSON.stringify(this.getClinicDefaultAnalysisItems())),a=this.getClinicDefaultAnalysisItems());const s=document.getElementById("clinic-analysis-items-list");s&&(s.innerHTML=a.map(u=>`
                <div class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                    <label class="flex items-center cursor-pointer flex-1">
                        <input type="checkbox" class="clinic-analysis-item-checkbox mr-2" data-item-id="${u.id}" ${u.enabled?"checked":""}>
                        <span>${Utils.escapeHTML(u.label||u.id)}</span>
                    </label>
                    <button class="btn-icon btn-icon-danger ml-2" onclick="Clinic.removeClinicAnalysisItem('${u.id}')" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""),s.querySelectorAll(".clinic-analysis-item-checkbox").forEach(u=>{u.addEventListener("change",d=>{const m=d.target.getAttribute("data-item-id");this.toggleClinicAnalysisItem(m,d.target.checked)})}));const n=document.getElementById("clinic-manage-cards-btn");n&&(n.onclick=()=>this.showManageClinicCardsModal());const i=document.getElementById("clinic-add-analysis-item-btn");i&&(i.onclick=()=>this.addClinicAnalysisItemFromUI());const o=document.getElementById("clinic-new-analysis-dataset"),l=document.getElementById("clinic-new-analysis-field"),r=document.getElementById("clinic-custom-field-wrap"),c=document.getElementById("clinic-new-analysis-custom-field"),p=()=>{if(!l||!o)return;const u=o.value,m=this.getClinicAnalysisFieldsMap()[u]||[];l.innerHTML=m.map(f=>`<option value="${f.value}">${Utils.escapeHTML(f.label)}</option>`).join("")+'<option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>',r&&(r.style.display="none"),c&&(c.value="")};o&&(o.onchange=()=>p()),l&&(l.onchange=()=>{const u=l.value==="__custom__";r&&(r.style.display=u?"block":"none"),!u&&c&&(c.value="")}),o&&l&&l.options.length===0&&p(),this.updateClinicAnalysisResults()},getClinicAnalysisFieldsMap(){return{visits:[{value:"reason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"diagnosis",label:"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"employeePosition",label:"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"workplace",label:"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],medications:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"location",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646"}],sickLeave:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],injuries:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"injuryType",label:"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"injuryLocation",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],supplyRequests:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628"},{value:"priority",label:"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],dispensedMedications:[{value:"medicationName",label:"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"personType",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{value:"visitReason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"unit",label:"\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},getClinicDatasetForAnalysis(e){switch(this.ensureData(),e){case"visits":return Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[];case"medications":return(Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:[]).map(t=>this.normalizeMedicationRecord(t));case"sickLeave":return Array.isArray(AppState.appData.sickLeave)?AppState.appData.sickLeave:[];case"injuries":return Array.isArray(AppState.appData.injuries)?AppState.appData.injuries:[];case"supplyRequests":return Array.isArray(AppState.appData.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[];case"dispensedMedications":return this.getDispensedMedicationsDataset_(this.getClinicVisitsForAnalysis_());default:return[]}},getClinicVisitsForAnalysis_(){const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[],t=Array.isArray(AppState.appData.employeeVisits)?AppState.appData.employeeVisits:[],a=Array.isArray(AppState.appData.contractorVisits)?AppState.appData.contractorVisits:[],s=new Set,n=[];return[...e,...t,...a].forEach(i=>{if(!i)return;const o=String(i.id||"").trim();o&&s.has(o)||(o&&s.add(o),n.push(i))}),n},getVisitMedicationsForAnalysis_(e){if(!e)return[];let t=[];if(e.medications&&(t=this.normalizeVisitMedications(e.medications)),(!t||t.length===0)&&e.medicationsDispensed){const a=this.normalizeVisitMedications(e.medicationsDispensed);a&&a.length>0&&(t=a)}if((!t||t.length===0)&&e.medicationsDispensedQty&&e.medicationsDispensedQty>0){const a=parseInt(e.medicationsDispensedQty,10)||0;a>0&&(t=[{medicationName:e.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:a,unit:"\u0648\u062D\u062F\u0629",notes:""}])}return Array.isArray(t)?t:[]},buildMedicationInventoryLookup_(){const e=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],t={};return e.forEach(a=>{const s=this.normalizeMedicationRecord(a),n=String(s.name||s.medicationName||"").trim().toLowerCase();n&&!t[n]&&(t[n]=s)}),t},getDispensedMedicationsDataset_(e){const t=[];return(e||[]).forEach(a=>{const s=this.getVisitMedicationsForAnalysis_(a);if(!s.length)return;const n=String(a.employeeDepartment||a.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",i=String(a.personType||"").toLowerCase(),o=i==="contractor"||i==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",l=String(a.reason||a.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=a.visitDate||a.createdAt||"";s.forEach(c=>{t.push({medicationName:c.medicationName,quantity:parseInt(c.quantity,10)||1,unit:c.unit||"\u0648\u062D\u062F\u0629",personType:o,department:n,visitReason:l,visitDate:r,visitId:a.id||""})})}),t},analyzeDispensedMedications_(e,t){const a=this.buildMedicationInventoryLookup_(),s={};let n=0,i=0;const o=new Set,l={},r={\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},c={};(e||[]).forEach(y=>{const g=this.getVisitMedicationsForAnalysis_(y);if(!g.length)return;const b=String(y.id||"").trim()||JSON.stringify([y.visitDate,y.employeeName,y.contractorWorkerName]);o.add(b);const S=String(y.employeeDepartment||y.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",T=String(y.personType||"").toLowerCase(),D=T==="contractor"||T==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",$=new Date(y.visitDate||y.createdAt||""),h=isNaN($.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}`;g.forEach(v=>{const L=String(v.medicationName||"").trim();if(!L)return;const k=parseInt(v.quantity,10)||1,C=L.toLowerCase(),I=a[C]||null;s[C]||(s[C]={name:L,totalQty:0,dispenseCount:0,visits:new Set,type:I?.type||I?.medicationType||"\u2014",stockRemaining:I?.remainingQuantity??null,stockStatus:I?.status||"\u2014"}),s[C].totalQty+=k,s[C].dispenseCount+=1,s[C].visits.add(b),n+=k,i+=1,l[h]=(l[h]||0)+k,r[D]=(r[D]||0)+k,c[S]=(c[S]||0)+k})});const p=Object.values(s).map(y=>({name:y.name,totalQty:y.totalQty,dispenseCount:y.dispenseCount,visitsCount:y.visits.size,avgQty:y.dispenseCount>0?(y.totalQty/y.dispenseCount).toFixed(1):"0",type:y.type,stockRemaining:y.stockRemaining,stockStatus:y.stockStatus})).sort((y,g)=>g.totalQty-y.totalQty),u=[...p].sort((y,g)=>g.dispenseCount-y.dispenseCount),d=Object.entries(l).filter(([y])=>y!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((y,g)=>y[0].localeCompare(g[0])).slice(-12),m=Object.entries(c).sort((y,g)=>g[1]-y[1]).slice(0,8),f=p.slice(0,10).filter(y=>y.stockRemaining!==null&&y.stockRemaining<=10).map(y=>({...y}));return{totalDispensedQty:n,dispenseLines:i,uniqueMedicines:p.length,visitsWithMedications:o.size,visitsWithoutMedications:Math.max(0,(e||[]).length-o.size),topByQuantity:p,topByFrequency:u,byMonth:{labels:d.map(y=>y[0]),data:d.map(y=>y[1])},byPersonType:r,byDepartment:{labels:m.map(y=>y[0]),data:m.map(y=>y[1])},lowStockHighDemand:f}},getClinicAnalysisValue(e,t,a){if(!a||typeof a!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t==="byMonth"){const i=e==="visits"||e==="dispensedMedications"?a.visitDate||a.createdAt:e==="sickLeave"?a.startDate||a.createdAt:e==="injuries"?a.injuryDate||a.createdAt:e==="supplyRequests"?a.createdAt||a.requestDate:a.createdAt||"";if(!i)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const o=new Date(i);return isNaN(o.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`}if(t==="personType"){const i=(a.personType||"").toString().toLowerCase();return i==="contractor"?"\u0645\u0642\u0627\u0648\u0644":i==="external"?"\u062E\u0627\u0631\u062C\u064A":i==="employee"||i===""?"\u0645\u0648\u0638\u0641":i.includes("\u0645\u0642\u0627\u0648\u0644")?"\u0645\u0642\u0627\u0648\u0644":i.includes("\u062E\u0627\u0631")?"\u062E\u0627\u0631\u062C\u064A":i.includes("\u0645\u0648\u0638")?"\u0645\u0648\u0638\u0641":a.personType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}if(e==="visits"&&t==="workplace")return a.employeeLocation||a.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const s=a[t],n=s==null||s===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(s).trim();return n&&n!=="null"&&n!=="undefined"?n:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeClinicByItem(e){const t=e.dataset,a=e.field,s=this.getClinicDatasetForAnalysis(t),n={};let i=0;return s.forEach(o=>{const l=this.getClinicAnalysisValue(t,a,o);n[l]=(n[l]||0)+1,i++}),Object.entries(n).map(([o,l])=>({label:o,count:l,percentage:i>0?(l/i*100).toFixed(1):"0.0"})).sort((o,l)=>l.count-o.count)},async updateClinicAnalysisResults(){const e=document.getElementById("clinic-analysis-results");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{a=[]}const s=(Array.isArray(a)?a:[]).filter(i=>i.enabled);if(s.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0641\u0639\u0644\u0629 \u0644\u0644\u062A\u062D\u0644\u064A\u0644.</p>
                </div>
            `;return}this.calculateClinicCardValues();let n='<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">';s.forEach((i,o)=>{const l=this.analyzeClinicByItem(i),r=`clinic-chart-${i.id}-${o}`,c=`clinic-chart-container-${i.id}-${o}`;n+=`
                <div class="content-card">
                    <div class="card-header">
                        <h4 class="font-semibold text-lg">
                            <i class="fas fa-chart-bar ml-2"></i>
                            ${Utils.escapeHTML(i.label||i.id)}
                        </h4>
                        <p class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(i.dataset)} \u2022 ${Utils.escapeHTML(i.field)}</p>
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
            `}),n+="</div>",e.innerHTML=n,setTimeout(async()=>{if(await this.ensureChartJSLoaded()&&typeof Chart<"u")this.renderClinicAnalysisCharts(s);else{const o=document.createElement("div");o.className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4",o.innerHTML=`
                    <div class="flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                        <p class="text-sm text-yellow-800">
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0623\u062F\u0646\u0627\u0647.
                        </p>
                    </div>
                `,e.prepend(o)}},250)},renderClinicAnalysisCharts(e){if(typeof Chart>"u")return;this.clinicAnalysisCharts&&Object.values(this.clinicAnalysisCharts).forEach(a=>{a&&typeof a.destroy=="function"&&a.destroy()}),this.clinicAnalysisCharts={};const t=["rgba(59, 130, 246, 0.8)","rgba(16, 185, 129, 0.8)","rgba(245, 158, 11, 0.8)","rgba(239, 68, 68, 0.8)","rgba(139, 92, 246, 0.8)","rgba(236, 72, 153, 0.8)","rgba(20, 184, 166, 0.8)","rgba(251, 146, 60, 0.8)"];e.forEach((a,s)=>{const n=`clinic-chart-${a.id}-${s}`,i=document.getElementById(n);if(!i)return;const o=this.analyzeClinicByItem(a),l=o.slice(0,12).map(u=>u.label),r=o.slice(0,12).map(u=>u.count),c=l.map((u,d)=>t[d%t.length]),p=a.chartType==="auto"?l.length>6?"bar":"doughnut":a.chartType||"bar";try{const u=new Chart(i,{type:p,data:{labels:l,datasets:[{label:a.label||a.id,data:r,backgroundColor:c,borderColor:c.map(d=>d.replace("0.8","1")),borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0}},tooltip:{callbacks:{label:function(d){const m=d.label||"",f=d.parsed||0,y=d.dataset.data.reduce((b,S)=>b+S,0),g=y>0?(f/y*100).toFixed(1):0;return`${m}: ${f} (${g}%)`}}}},...p==="bar"?{scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}:{}}});this.clinicAnalysisCharts[n]=u}catch{}})},loadClinicInfoCards(){const e=document.getElementById("clinic-info-cards-container");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.cards)||"[]")||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(t.cards,JSON.stringify(this.getClinicDefaultAnalysisCards())),a=this.getClinicDefaultAnalysisCards());const s=a.filter(i=>i.enabled);if(s.length===0){e.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}const n={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"};e.innerHTML=s.map(i=>{const o=n[i.color]||n.blue,l=i.color||"blue";return`
                <div class="content-card border-2 ${o}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <i class="${i.icon||"fas fa-info-circle"} text-${l}-600 text-xl"></i>
                            <h4 class="font-semibold">${Utils.escapeHTML(i.title||"")}</h4>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(i.description||"")}</p>
                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <div id="clinic-card-value-${i.id}" class="text-2xl font-bold text-${l}-700">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            `}).join(""),this.calculateClinicCardValues()},calculateClinicCardValues(){const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}const a=(Array.isArray(t)?t:[]).filter(m=>m.enabled),s=this.getClinicVisitsForAnalysis_(),n=s.length,i=s.reduce((m,f)=>{const y=this.getVisitMedicationsForAnalysis_(f);return m+y.reduce((g,b)=>g+(parseInt(b.quantity,10)||0),0)},0),o=s.filter(m=>this.getVisitMedicationsForAnalysis_(m).length>0).length,l=new Set(s.flatMap(m=>this.getVisitMedicationsForAnalysis_(m).map(f=>String(f.medicationName||"").trim().toLowerCase()).filter(Boolean))).size,r=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],c=r.filter(m=>(m.status||"")==="\u0645\u0646\u062A\u0647\u064A").length,p=r.filter(m=>(m.remainingQuantity??0)<=10&&(m.remainingQuantity??0)>0).length,u=r.length,d={totalVisits:n,totalDispensedQty:i,expiredMedications:c,lowStockMedications:p,totalMedications:u,visitsWithMedications:o,uniqueDispensedMedications:l};a.forEach(m=>{const f=document.getElementById(`clinic-card-value-${m.id}`);if(!f)return;let y=0;if(m.mode==="metric"&&m.metric)y=d[m.metric]??0;else if(m.mode==="countByField"){const g=m.dataset||"visits",b=m.field||"",S=(m.fieldValue||"").toString().trim();y=this.getClinicDatasetForAnalysis(g).filter(D=>{const $=this.getClinicAnalysisValue(g,b,D);if(!S)return $&&$!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const h=String($||"").toLowerCase().trim(),v=String(S||"").toLowerCase().trim();if(h===v)return!0;if(b==="personType"){if(v==="employee"||v==="\u0645\u0648\u0638\u0641")return h==="\u0645\u0648\u0638\u0641";if(v==="contractor"||v==="\u0645\u0642\u0627\u0648\u0644"||v==="external")return h==="\u0645\u0642\u0627\u0648\u0644"}return h===v}).length}f.textContent=Number(y||0).toLocaleString("en-US")})},showManageClinicCardsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}(!Array.isArray(t)||t.length===0)&&(t=this.getClinicDefaultAnalysisCards());const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a);const s=()=>a.remove();a.querySelector(".modal-close")?.addEventListener("click",s),a.querySelector('[data-action="close"]')?.addEventListener("click",s),a.addEventListener("click",o=>{o.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s()});const n=a.querySelector("#clinic-cards-list-container"),i=()=>{const o={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,mode:"metric",metric:"totalVisits"},l=document.createElement("div");l.innerHTML=this.renderClinicCardEditForm(o,n?.children?.length||0),n?.appendChild(l.firstElementChild),this.bindClinicCardEditEvents(a)};a.querySelector("#clinic-add-new-card-btn")?.addEventListener("click",i),a.querySelector("#clinic-save-cards-btn")?.addEventListener("click",()=>{const o=a.querySelectorAll(".clinic-card-edit-form"),l=[];o.forEach(r=>{const c=r.getAttribute("data-card-id"),p=r.querySelector('[name="enabled"]')?.checked,u=r.querySelector('[name="title"]')?.value||"",d=r.querySelector('[name="description"]')?.value||"",m=r.querySelector('[name="icon"]')?.value||"fas fa-info-circle",f=r.querySelector('[name="color"]')?.value||"blue",y=r.querySelector('[name="mode"]')?.value||"metric",g=r.querySelector('[name="metric"]')?.value||"totalVisits",b=r.querySelector('[name="dataset"]')?.value||"visits",S=r.querySelector('[name="field"]')?.value||"",T=r.querySelector('[name="fieldValue"]')?.value||"";l.push({id:c,enabled:p,title:u,description:d,icon:m,color:f,mode:y,metric:g,dataset:b,field:S,fieldValue:T})}),localStorage.setItem(e.cards,JSON.stringify(l)),s(),this.loadClinicInfoCards(),this.calculateClinicCardValues(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D")}),this.bindClinicCardEditEvents(a)},renderClinicCardEditForm(e,t){const a=i=>Utils.escapeHTML(i||""),s=[{value:"totalVisits",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"totalDispensedQty",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"},{value:"totalMedications",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062F\u0648\u064A\u0629"},{value:"expiredMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629"},{value:"lowStockMedications",label:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636 (\u226410)"},{value:"visitsWithMedications",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621"},{value:"uniqueDispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629"}],n=[{value:"visits",label:"\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"medications",label:"\u0623\u062F\u0648\u064A\u0629 (\u0645\u062E\u0632\u0648\u0646)"},{value:"dispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 (\u0645\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A)"},{value:"sickLeave",label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629"},{value:"injuries",label:"\u0625\u0635\u0627\u0628\u0627\u062A"},{value:"supplyRequests",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A"}];return`
            <div class="clinic-card-edit-form border rounded-lg p-4 bg-white" data-card-id="${a(e.id)}">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <label class="flex items-center gap-2 text-sm font-semibold">
                            <input type="checkbox" name="enabled" ${e.enabled?"checked":""}>
                            \u062A\u0641\u0639\u064A\u0644
                        </label>
                        <span class="text-xs text-gray-500">#${t+1}</span>
                    </div>
                    <button type="button" class="btn-icon btn-icon-danger clinic-remove-card-btn" data-card-id="${a(e.id)}" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="clinic-card-${a(e.id)}-title" class="block text-sm font-medium mb-2">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>
                        <input type="text" id="clinic-card-${a(e.id)}-title" name="title" class="form-input" value="${a(e.title)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(e.id)}-icon" class="block text-sm font-medium mb-2">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 (FontAwesome class)</label>
                        <input type="text" id="clinic-card-${a(e.id)}-icon" name="icon" class="form-input" value="${a(e.icon||"fas fa-info-circle")}">
                    </div>
                    <div class="md:col-span-2">
                        <label for="clinic-card-${a(e.id)}-description" class="block text-sm font-medium mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                        <input type="text" id="clinic-card-${a(e.id)}-description" name="description" class="form-input" value="${a(e.description)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(e.id)}-color" class="block text-sm font-medium mb-2">\u0627\u0644\u0644\u0648\u0646</label>
                        <select id="clinic-card-${a(e.id)}-color" name="color" class="form-input">
                            ${["blue","green","red","orange","purple","yellow"].map(i=>`<option value="${i}" ${e.color===i?"selected":""}>${i}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${a(e.id)}-mode" class="block text-sm font-medium mb-2">\u0646\u0648\u0639 \u0627\u0644\u0643\u0631\u062A</label>
                        <select id="clinic-card-${a(e.id)}-mode" name="mode" class="form-input clinic-card-mode">
                            <option value="metric" ${e.mode==="metric"?"selected":""}>\u0645\u0624\u0634\u0631 \u062C\u0627\u0647\u0632</option>
                            <option value="countByField" ${e.mode==="countByField"?"selected":""}>\u0639\u062F\u062F \u062D\u0633\u0628 \u062D\u0642\u0644</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 clinic-card-metric-wrap" style="display:${e.mode==="metric"?"grid":"none"}">
                    <div class="md:col-span-2">
                        <label for="clinic-card-${a(e.id)}-metric" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u0624\u0634\u0631</label>
                        <select id="clinic-card-${a(e.id)}-metric" name="metric" class="form-input">
                            ${s.map(i=>`<option value="${i.value}" ${e.metric===i.value?"selected":""}>${a(i.label)}</option>`).join("")}
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 clinic-card-field-wrap" style="display:${e.mode==="countByField"?"grid":"none"}">
                    <div>
                        <label for="clinic-card-${a(e.id)}-dataset" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</label>
                        <select id="clinic-card-${a(e.id)}-dataset" name="dataset" class="form-input">
                            ${n.map(i=>`<option value="${i.value}" ${e.dataset===i.value?"selected":""}>${a(i.label)}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${a(e.id)}-field" class="block text-sm font-medium mb-2">\u0627\u0644\u062D\u0642\u0644</label>
                        <input type="text" id="clinic-card-${a(e.id)}-field" name="field" class="form-input" placeholder="\u0645\u062B\u0627\u0644: status / reason" value="${a(e.field)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(e.id)}-fieldValue" class="block text-sm font-medium mb-2">\u0627\u0644\u0642\u064A\u0645\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <input type="text" id="clinic-card-${a(e.id)}-fieldValue" name="fieldValue" class="form-input" placeholder="\u0625\u0630\u0627 \u062A\u064F\u0631\u0643 \u0641\u0627\u0631\u063A\u064B\u0627 = \u0623\u064A \u0642\u064A\u0645\u0629" value="${a(e.fieldValue)}">
                    </div>
                </div>
            </div>
        `},bindClinicCardEditEvents(e){e.querySelectorAll(".clinic-remove-card-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&e.querySelector(`.clinic-card-edit-form[data-card-id="${a}"]`)?.remove()})}),e.querySelectorAll(".clinic-card-mode").forEach(t=>{t.addEventListener("change",()=>{const a=t.closest(".clinic-card-edit-form");if(!a)return;const s=a.querySelector(".clinic-card-metric-wrap"),n=a.querySelector(".clinic-card-field-wrap"),i=t.value;s&&(s.style.display=i==="metric"?"grid":"none"),n&&(n.style.display=i==="countByField"?"grid":"none")})})},addClinicAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("clinic-new-analysis-dataset"),t=document.getElementById("clinic-new-analysis-field"),a=document.getElementById("clinic-new-analysis-custom-field"),s=document.getElementById("clinic-new-analysis-label"),n=document.getElementById("clinic-new-analysis-charttype"),i=e?.value||"visits";let o=t?.value||"";o==="__custom__"&&(o=(a?.value||"").trim());const l=(s?.value||"").trim(),r=n?.value||"auto";if(!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!l){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const c=this.getClinicAnalysisStorageKeys();let p=[];try{p=JSON.parse(localStorage.getItem(c.items)||"[]")||[]}catch{p=[]}Array.isArray(p)||(p=[]);const u={id:`custom_${Date.now()}`,label:l,enabled:!0,dataset:i,field:o,chartType:r};p.push(u),localStorage.setItem(c.items,JSON.stringify(p)),s&&(s.value=""),a&&(a.value=""),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.loadClinicDataAnalysis()},toggleClinicAnalysisItem(e,t){if(!this.isCurrentUserAdmin())return;const a=this.getClinicAnalysisStorageKeys();let s=[];try{s=JSON.parse(localStorage.getItem(a.items)||"[]")||[]}catch{s=[]}const n=(Array.isArray(s)?s:[]).find(i=>i.id===e);n&&(n.enabled=t,localStorage.setItem(a.items,JSON.stringify(s)),this.updateClinicAnalysisResults())},removeClinicAnalysisItem(e){if(!this.isCurrentUserAdmin()||!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{a=[]}const s=(Array.isArray(a)?a:[]).filter(n=>n.id!==e);localStorage.setItem(t.items,JSON.stringify(s)),this.loadClinicDataAnalysis(),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},calculateMedicationStatus(e){const t=new Date;t.setHours(0,0,0,0);let a=null;e.expiryDate&&(a=new Date(e.expiryDate),Number.isNaN(a.getTime())&&(a=new Date(e.expiryDate)),a.setHours(0,0,0,0));const n=parseFloat(e.remainingQuantity??e.quantity??0)>0;let i="\u0633\u0627\u0631\u064A",o=null;if(a&&!Number.isNaN(a.getTime())){const l=a.getTime()-t.getTime();o=Math.ceil(l/864e5),o<0?i="\u0645\u0646\u062A\u0647\u064A":o<=30&&(i=n?"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0633\u0627\u0631\u064A")}return{status:i,daysRemaining:o}},getMedicationStatusClasses(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-100 text-red-700":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"},getMedicationStatusHint(e={}){return!e||e.daysRemaining===null||e.daysRemaining===void 0?"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621":e.daysRemaining<0?"\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621\u060C \u064A\u0631\u062C\u0649 \u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064B":e.daysRemaining===0?"\u064A\u0646\u062A\u0647\u064A \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u064A\u0648\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0623\u0648 \u0627\u0644\u062A\u062E\u0644\u0635 \u0645\u0646\u0647 \u062D\u0633\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":e.daysRemaining<=30?`\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645${e.daysRemaining===1?"":"\u0627\u064B"} \u0639\u0644\u0649 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629`:`\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0633\u0627\u0631\u064A\u0629\u060C \u064A\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645\u064B\u0627 \u062A\u0642\u0631\u064A\u0628\u064B\u0627`},getInjuryStatusBadgeClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"badge-success":e==="\u0645\u063A\u0644\u0642"?"badge-info":"badge-warning"},getInjuryRowClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"bg-green-50":e==="\u0645\u063A\u0644\u0642"?"bg-gray-50":"bg-red-50"},viewInjuryRecord(e){const t=this.getInjuries().find(g=>g.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const a=String(t.personType||"employee").toLowerCase(),s=a==="contractor"||a==="external",n=t.employeeName||t.personName||"",i=t.contractorName||"",o=t.employeeCode||t.employeeNumber||"",l=t.employeePosition||t.contractorPosition||"\u2014",r=t.department||t.employeeDepartment||"\u2014",c=t.factoryName||t.factory||"\u2014",p=t.subLocationName||t.subLocation||"\u2014",u=t.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",d=Array.isArray(t.attachments)?t.attachments:[],m=d.length?d.map((g,b)=>{const S=g.type&&(g.type.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(g.name||"")),T=this.processAttachmentUrl(g.data);return S&&T?`
                        <div class="bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-image text-blue-500"></i>
                                    <div>
                                        <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(g.name||`\u0635\u0648\u0631\u0629 ${b+1}`)}</div>
                                        <div class="text-xs text-gray-500">${g.size||0} KB</div>
                                    </div>
                                </div>
                                <a href="${T}" download="${Utils.escapeHTML(g.name||`attachment-${b+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                            <img src="${Utils.escapeHTML(T)}" alt="${Utils.escapeHTML(g.name||"")}" class="max-w-full h-auto rounded border" style="max-height: 250px;"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                    `:`
                        <div class="flex items-center justify-between bg-white border border-blue-100 rounded-xl px-3 py-2 shadow-sm">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-paperclip text-blue-500"></i>
                                <div>
                                    <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(g.name||`\u0645\u0644\u0641 ${b+1}`)}</div>
                                    <div class="text-xs text-gray-500">${g.size||0} KB</div>
                                </div>
                            </div>
                            <a href="${T||g.data}" download="${Utils.escapeHTML(g.name||`attachment-${b+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    `}).join(""):'<div class="text-sm text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl p-3">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0644\u0644\u062D\u0627\u0644\u0629.</div>',f=document.createElement("div");f.className="modal-overlay",f.innerHTML=`
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
                            <p class="text-gray-900 font-semibold mt-1">${s?"\u0645\u0642\u0627\u0648\u0644 / \u062E\u0627\u0631\u062C\u064A":"\u0645\u0648\u0638\u0641"}</p>
                        </div>
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">${s?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</span>
                            <p class="text-gray-900 font-semibold mt-1">${Utils.escapeHTML(s?i||"\u2014":o||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628</span>
                            <p class="text-gray-900 font-semibold mt-1">${Utils.escapeHTML(n)}</p>
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
                                <span class="badge ${this.getInjuryStatusBadgeClass(u)}">${Utils.escapeHTML(u)}</span>
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
        `,document.body.appendChild(f);const y=()=>f.remove();f.querySelectorAll(".modal-close, .modal-close-btn").forEach(g=>g.addEventListener("click",y)),f.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{y(),this.showInjuryForm(t)}),f.addEventListener("click",g=>{g.target===f&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&y()})},editInjury(e){const t=this.getInjuries().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}this.showInjuryForm(t)},exportInjuriesToExcel(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(i=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628":i.employeeName||i.personName||"",\u0627\u0644\u0642\u0633\u0645:i.department||i.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629":this.formatDate(i.injuryDate,!0),"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":i.injuryType||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":i.injuryLocation||"",\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(i.attachments)?i.attachments.length:0,"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629":i.actionsTaken||"",\u0627\u0644\u0639\u0644\u0627\u062C:i.treatment||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,s,"Injuries");const n=`Clinic_Injuries_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportInjuriesToPDF(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${e.map(i=>`
            <tr>
                <td>${Utils.escapeHTML(i.employeeName||i.personName||"")}</td>
                <td>${Utils.escapeHTML(i.department||i.employeeDepartment||"")}</td>
                <td>${this.formatDate(i.injuryDate,!0)}</td>
                <td>${Utils.escapeHTML(i.injuryType||"")}</td>
                <td>${Utils.escapeHTML(i.status||"")}</td>
                <td>${Array.isArray(i.attachments)?i.attachments.length:0}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,s=`INJURIES-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629")}},normalizeMedicationRecord(e={}){const t=(S,T=0)=>{if(S==null)return T;if(typeof S=="number")return Number.isFinite(S)?S:T;if(typeof S=="string"){const D=S.trim();if(!D)return T;const $=D.replace(/[, ]+/g,""),h=Number($);return Number.isFinite(h)?h:T}return T},a=e.id||Utils.generateId("MED"),s=e.name||e.medicationName||"",n=e.type||e.medicationType||e.category||"",i=e.purchaseDate||e.buyDate||e.createdAt||new Date().toISOString(),o=e.expiryDate||e.endDate||"",l=e.quantityAdded!==void 0&&e.quantityAdded!==null?t(e.quantityAdded,0):e.initialQuantity!==void 0&&e.initialQuantity!==null?t(e.initialQuantity,0):t(e.quantity,0),r=e.remainingQuantity!==void 0&&e.remainingQuantity!==null?t(e.remainingQuantity,0):e.quantityRemaining!==void 0&&e.quantityRemaining!==null?t(e.quantityRemaining,0):t(e.quantity,0),c=e.location||e.storageLocation||"",p=e.createdAt||new Date().toISOString(),u=e.updatedAt||p,d=typeof e.createdBy=="string"&&e.createdBy.trim()!==""?{id:e.createdById||"",name:e.createdBy.trim()}:e.createdBy||this.getCurrentUserSummary(e.createdBy),m=e.createdById||d?.id||AppState.currentUser?.id||"",f=typeof e.updatedBy=="string"&&e.updatedBy.trim()!==""?{id:"",name:e.updatedBy.trim()}:e.updatedBy||this.getCurrentUserSummary(e.updatedBy),y=e.notes||e.description||"",g=e.usage||"",b=this.calculateMedicationStatus({expiryDate:o});return{id:a,name:s,type:n,usage:g,purchaseDate:i,expiryDate:o,quantityAdded:t(l,0),remainingQuantity:t(r,0),location:c,notes:y,createdBy:d,createdById:m,createdAt:p,updatedAt:u,updatedBy:f,status:e.status||b.status,daysRemaining:e.daysRemaining!==void 0?e.daysRemaining:b.daysRemaining}},normalizeSickLeaveRecord(e={}){const t=e.id||Utils.generateId("SICK_LEAVE"),a=e.personType||"employee",s=e.startDate?new Date(e.startDate).toISOString():new Date().toISOString(),n=e.endDate?new Date(e.endDate).toISOString():s,i=e.createdAt||new Date().toISOString(),o=e.updatedAt||i,l=e.createdBy||this.getCurrentUserSummary(e.createdBy),r=e.createdById||l?.id||AppState.currentUser?.id||"",c=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),p=this.calculateSickLeaveDays(s,n);return{id:t,personType:a,employeeName:e.employeeName||e.personName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",reason:e.reason||"",medicalNotes:e.medicalNotes||e.notes||"",treatingDoctor:e.treatingDoctor||e.doctor||"",startDate:s,endDate:n,daysCount:p,createdBy:l,createdById:r,createdAt:i,updatedAt:o,updatedBy:c}},normalizeInjuryRecord(e={}){const t=e.id||Utils.generateId("INJURY"),a=e.personType||"employee",s=e.injuryDate?new Date(e.injuryDate).toISOString():new Date().toISOString(),n=e.createdAt||new Date().toISOString(),i=e.updatedAt||n,o=e.createdBy||this.getCurrentUserSummary(e.createdBy),l=e.createdById||o?.id||AppState.currentUser?.id||"",r=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),c=Array.isArray(e.attachments)?e.attachments.map(p=>this.normalizeAttachment(p)).filter(Boolean):[];return{id:t,personType:a,employeeName:e.employeeName||"",contractorName:e.contractorName||"",personName:e.personName||e.employeeName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.contractorPosition||e.position||"",contractorPosition:e.contractorPosition||e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",department:e.department||e.employeeDepartment||"",factory:e.factory||"",factoryName:e.factoryName||"",subLocation:e.subLocation||e.subLocationName||"",subLocationName:e.subLocationName||e.subLocation||"",injuryDate:s,injuryType:e.injuryType||e.type||"",injuryBodyPart:e.injuryBodyPart||"",injuryLocation:e.injuryLocation||e.location||"",injuryDescription:e.injuryDescription||e.description||"",actionsTaken:e.actionsTaken||e.actions||"",treatment:e.treatment||"",status:e.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",attachments:c,createdBy:o,createdById:l,createdAt:n,updatedAt:i,updatedBy:r}},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"";if(!t)return null;const a=e.size||Math.round(t.length*3/4/1024);return{id:e.id||Utils.generateId("ATT"),name:e.name||e.fileName||"attachment",type:e.type||e.mimeType||"application/octet-stream",data:t,size:a,uploadedAt:e.uploadedAt||new Date().toISOString()}},calculateSickLeaveDays(e,t){try{const a=new Date(e),s=new Date(t);if(Number.isNaN(a.getTime())||Number.isNaN(s.getTime()))return 1;const n=s.getTime()-a.getTime();return n>=0?Math.floor(n/864e5)+1:1}catch{return 1}},formatDate(e,t=!1){if(!e)return"-";try{return t?Utils.formatDateTime(e):Utils.formatDate(e)}catch{return"-"}},getMedications(){return Array.isArray(AppState.appData?.medications)&&AppState.appData.medications.length>0?AppState.appData.medications:Array.isArray(AppState.appData?.clinicMedications)&&AppState.appData.clinicMedications.length>0?AppState.appData.clinicMedications:Array.isArray(AppState.appData?.clinicInventory)&&AppState.appData.clinicInventory.length>0?AppState.appData.clinicInventory:[]},getSickLeaves(){return Array.isArray(AppState.appData?.sickLeave)?AppState.appData.sickLeave:[]},getInjuries(){return Array.isArray(AppState.appData?.injuries)?AppState.appData.injuries:[]},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(s=>s.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const s=Permissions.formSettingsState.sites.find(n=>n.id===e);if(s&&Array.isArray(s.places))return s.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const s=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===e);if(s)return(Array.isArray(s.places)?s.places:Array.isArray(s.locations)?s.locations:Array.isArray(s.children)?s.children:Array.isArray(s.areas)?s.areas:[]).map((i,o)=>({id:i.id||i.placeId||i.value||Utils.generateId("PLACE"),name:i.name||i.placeName||i.title||i.label||i.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const s=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===e);if(s)return(Array.isArray(s.places)?s.places:Array.isArray(s.locations)?s.locations:Array.isArray(s.children)?s.children:Array.isArray(s.areas)?s.areas:[]).map((i,o)=>({id:i.id||i.placeId||i.value||Utils.generateId("PLACE"),name:i.name||i.placeName||i.title||i.label||i.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 (\u0627\u0644\u0639\u064A\u0627\u062F\u0629):",t),[]}},setupClinicWorkplaceDatalist(e,t,a,s={}){const n=s.clearOnFactoryChange!==!1,i=document.getElementById(e),o=document.getElementById(t),l=document.getElementById(a);if(!i||!o||!l)return;const r=u=>{const d=(i.value||"").trim(),m=d?this.getPlaceOptions(d):[];l.innerHTML=m.map(f=>`<option value="${Utils.escapeHTML(f.name)}"></option>`).join(""),u&&(o.value="")},c="_clinicWorkplaceFactoryChange";i[c]&&i.removeEventListener("change",i[c]);const p=()=>r(n);i[c]=p,i.addEventListener("change",p),r(!1)},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:s=>String(s??""),a=s=>'<option value="">'+(s||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(e||[]).map(n=>'<option value="'+t(n.id)+'">'+t(n.name)+"</option>").join("");["visits-filter-factory","visit-factory","visit-contractor-factory","enhanced-visit-factory"].forEach(s=>{const n=document.getElementById(s);if(n&&n.tagName==="SELECT"){const i=n.value;n.innerHTML=a("\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),i&&(n.value=i)}}),typeof this.setupClinicWorkplaceDatalist=="function"&&(this.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),this.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"),this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"))}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic.refreshSiteDropdowns:",e)}},getExpiringMedications(){return this.getMedications().filter(e=>e.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"||e.status==="\u0645\u0646\u062A\u0647\u064A")},ensureDataStructure(){if(typeof AppState>"u"||!AppState.appData)return;const e=AppState.appData;e.clinicMedications||(e.clinicMedications=[]),e.injuries||(e.injuries=[]),e.sickLeave||(e.sickLeave=[]),e.clinicVisits||(e.clinicVisits=[]),e.clinicSupplyRequests||(e.clinicSupplyRequests=[])},notifyMedicationAlerts(){this.getExpiringMedications().forEach(t=>{this.state.medicationAlertsNotified.has(t.id)||(t.status==="\u0645\u0646\u062A\u0647\u064A"?Notification?.error?.(`\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")}`):Notification?.warning?.(`\u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")} \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${t.daysRemaining??0} \u064A\u0648\u0645`),this.state.medicationAlertsNotified.add(t.id))})},getFilteredMedications(){const e=this.state.filters.medications||{},t=(e.search||"").toLowerCase().trim(),a=e.dateFrom?new Date(e.dateFrom):null,s=e.dateTo?new Date(e.dateTo):null,n=e.status||"all";return this.getMedications().map(i=>this.normalizeMedicationRecord(i)).filter(i=>{const o=[i.name,i.type,i.location,i.usage,i.notes,this.getUserDisplayName(i.createdBy)].map(r=>String(r||"").toLowerCase()).join(" ");if(!(!t||o.includes(t))||n!=="all"&&i.status!==n)return!1;if(a){const r=i.purchaseDate?new Date(i.purchaseDate):null;if(!r||r<a)return!1}if(s){const r=i.purchaseDate?new Date(i.purchaseDate):null;if(!r||r>s)return!1}return!0})},getFilteredSickLeaves(){const e=this.state.filters.sickLeave||{},t=(e.search||"").toLowerCase(),a=e.department||"",s=e.dateFrom?new Date(e.dateFrom):null,n=e.dateTo?new Date(e.dateTo):null;return this.getSickLeaves().filter(i=>{if(!(!t||i.employeeName&&i.employeeName.toLowerCase().includes(t)||i.personName&&i.personName.toLowerCase().includes(t)||i.employeeDepartment&&i.employeeDepartment.toLowerCase().includes(t))||a&&i.employeeDepartment!==a)return!1;const l=i.startDate?new Date(i.startDate):null;return!(s&&(!l||l<s)||n&&(!l||l>n))})},getFilteredInjuries(){const e=this.state.filters.injuries||{},t=(e.search||"").toLowerCase(),a=e.status||"all",s=e.department||"",n=e.injuryType||"all",i=e.injuryBodyPart||"all",o=this.state.activeInjuryType||"employees",l=e.dateFrom?new Date(e.dateFrom):null,r=e.dateTo?new Date(e.dateTo):null;return this.getInjuries().filter(c=>{const p=[c.employeeCode,c.employeeNumber,c.employeeName,c.personName,c.contractorName,c.employeeDepartment,c.department,c.factoryName,c.factory,c.subLocationName,c.subLocation,c.injuryType,c.injuryBodyPart,c.injuryLocation,c.status,c.injuryDescription].map(f=>String(f||"").toLowerCase()).join(" ");if(!(!t||p.includes(t))||a!=="all"&&c.status!==a||n!=="all"&&(c.injuryType||"")!==n||i!=="all"&&(c.injuryBodyPart||"")!==i||s&&c.department!==s)return!1;const d=String(c.personType||"employee").toLowerCase();if(o==="employees"&&d!=="employee"||o==="contractors"&&d==="employee")return!1;const m=c.injuryDate?new Date(c.injuryDate):null;return!(l&&(!m||m<l)||r&&(!m||m>r))})},renderEmptyState(e){const{t,isRTL:a}=this.getTranslations(),s=a?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A":"No data available";return`
            <div class="empty-state" style="direction: ${a?"rtl":"ltr"}; text-align: ${a?"right":"left"};">
                <i class="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${Utils.escapeHTML(e||s)}</p>
            </div>
        `},getClinicDepartments(){const e=new Set;return(AppState.appData?.employees||[]).forEach(t=>{const a=(t?.department||"").trim();a&&e.add(a)}),(AppState.appData?.sickLeave||[]).forEach(t=>{const a=(t?.employeeDepartment||t?.department||"").trim();a&&e.add(a)}),(AppState.appData?.injuries||[]).forEach(t=>{const a=(t?.employeeDepartment||t?.department||"").trim();a&&e.add(a)}),Array.from(e).sort((t,a)=>t.localeCompare(a,"ar"))},getMedicationBadgeClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"badge-danger":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"badge-warning":"badge-success"},renderTabNavigation(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.getAttribute("data-tab")===this.state.activeTab?((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-secondary"),t.classList.add("btn-primary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.add("active")):((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-primary"),t.classList.add("btn-secondary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.remove("active"))})},bindTabEvents(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-tab");!a||a===this.state.activeTab||(this.state.activeTab=a,this.renderTabNavigation(),requestAnimationFrame(()=>{this._activateTabPanels(a),this.scheduleClinicTabRender(a,{delayMs:20})}))})})},_activateTabPanels(e){try{document.querySelectorAll(".clinic-tab-panel").forEach(a=>{a.getAttribute("data-tab-panel")===e?(a.classList.add("active"),a.style.display="block"):(a.classList.remove("active"),a.style.display="none")}),this._syncAttendanceQuickNavVisibility?.()}catch{}},_renderTabSkeleton(e,t){try{if(!e||(e.innerHTML||"").trim())return;const s=Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");if(e.innerHTML=`
                <div class="content-card" style="margin:14px;">
                    <div class="card-body" style="display:flex;align-items:center;justify-content:center;min-height:210px;gap:12px;">
                        <div style="width:34px;height:34px;border:3px solid rgba(37,99,235,0.18);border-top-color:#2563eb;border-radius:50%;animation:hseSpin 0.9s linear infinite;"></div>
                        <div style="font-weight:600;color:#334155;">${s}</div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),!document.getElementById("hse-mini-spinner-style")){const n=document.createElement("style");n.id="hse-mini-spinner-style",n.textContent="@keyframes hseSpin{to{transform:rotate(360deg);}}",document.head.appendChild(n)}}catch{}},scheduleClinicTabRender(e,{delayMs:t=0}={}){try{if(!e)return;this._tabRenderState||(this._tabRenderState={token:0,timers:{}});const a=this._tabRenderState;a.token+=1;const s=a.token,n=a.timers[e];n&&(clearTimeout(n),a.timers[e]=null);const i=document.querySelector(`.clinic-tab-panel[data-tab-panel="${e}"]`),o={visits:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F...",attendance:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u062D\u0636\u0648\u0631...",medications:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0623\u062F\u0648\u064A\u0629...",sickLeave:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629...","dispensed-medications":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629...",injuries:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A...","supply-request":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A...",approvals:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629..."};this._renderTabSkeleton(i,o[e]||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");const l=()=>{!this._tabRenderState||s!==this._tabRenderState.token||setTimeout(()=>{if(!(!this._tabRenderState||s!==this._tabRenderState.token))try{this._renderTabByKey(e)}catch(c){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0631\u0646\u062F\u0631 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e,c)}},0)},r=["visits","attendance"];requestAnimationFrame(()=>{if(r.includes(e)){l();return}typeof requestIdleCallback=="function"?requestIdleCallback(l,{timeout:900}):l()}),a.timers[e]=setTimeout(()=>{!this._tabRenderState||s!==this._tabRenderState.token||l()},Math.max(0,t))}catch{}},_renderTabByKey(e){if(e==="visits"){this.renderVisitsTab(!1);return}if(e==="medications")return this.renderMedicationsTab();if(e==="sickLeave")return this.renderSickLeaveTab();if(e==="injuries")return this.renderInjuriesTab();if(e==="approvals")return this.renderApprovalsTab();if(e==="dispensed-medications")return this.renderDispensedMedicationsTab();if(e==="analytics")return this.renderAnalyticsTab();if(e==="data-analysis")return this.renderDataAnalysisTab();if(e==="supply-request")return this.renderSupplyRequestTab();if(e==="attendance"){this.scheduleAttendanceTabRender(0);return}},renderActiveTabContent(){const e=this.state.activeTab||"medications";if(this._activateTabPanels(e),e==="visits"){this.renderVisitsTab(!1);return}this.scheduleClinicTabRender(e,{delayMs:0})},renderMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]');if(!e)return;const t=document.activeElement?document.activeElement.id:null;let a=0,s=0;t==="medications-search"&&(a=document.activeElement.selectionStart,s=document.activeElement.selectionEnd);const n=this.state.filters.medications||{},i=this.getFilteredMedications(),o=this.isCurrentUserAdmin(),l=i.map(c=>{const p=this.calculateMedicationStatus(c),u=p.status||"\u0633\u0627\u0631\u064A",d=p.daysRemaining!==void 0&&p.daysRemaining!==null?p.daysRemaining:"\u2014",m=this.formatDate(c.purchaseDate),f=c.expiryDate?this.formatDate(c.expiryDate):"\u2014",y=this.getMedicationRowClass(u),g=c.quantityAdded??c.quantity??0,b=c.remainingQuantity??c.quantity??0,S=Math.max(0,g-b),T=c.usage||c.notes||"\u2014",D=o?`
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
                <tr class="${y}">
                    <td>${Utils.escapeHTML(c.name||"")}</td>
                    <td>${Utils.escapeHTML(c.type||"")}</td>
                    <td>${Utils.escapeHTML(T)}</td>
                    <td>${m}</td>
                    <td>${f}</td>
                    <td>
                        <span class="badge ${this.getMedicationBadgeClass(u)}">${Utils.escapeHTML(u)}</span>
                    </td>
                    <td>${d}</td>
                    <td class="text-center font-semibold">${g}</td>
                    <td class="text-center font-semibold text-blue-600">${S}</td>
                    <td class="text-center font-semibold">${b}</td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(c.createdBy))}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            ${D}
                        </div>
                    </td>
                </tr>
            `}).join(""),r=i.length?`
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
                        <input type="text" id="medications-search" class="filter-input" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 \u0623\u0648 \u0646\u0648\u0639\u0647..." value="${Utils.escapeHTML(n.search||"")}" style="width: 100%; text-align: right; direction: rtl;">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-status" class="filter-label" style="text-align: right;">
                            <i class="fas fa-info-circle ml-1 text-gray-500"></i>\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629
                            ${n.status&&n.status!=="all"?`<span class="filter-count-badge" style="background-color: #10b981; color: white; border-radius: 9999px; padding: 2px 6px; font-size: 0.75rem; margin-right: 6px;">${i.length}</span>`:""}
                        </label>
                        <select id="medications-status" class="filter-input" style="width: 100%; direction: rtl;">
                            <option value="all" ${n.status==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="\u0633\u0627\u0631\u064A" ${n.status==="\u0633\u0627\u0631\u064A"?"selected":""}>\u0633\u0627\u0631\u064A</option>
                            <option value="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" ${n.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"selected":""}>\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</option>
                            <option value="\u0645\u0646\u062A\u0647\u064A" ${n.status==="\u0645\u0646\u062A\u0647\u064A"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-date-from" class="filter-label" style="text-align: right;">
                            <i class="fas fa-calendar-alt ml-1 text-gray-500"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621
                        </label>
                        <input type="date" id="medications-date-from" class="filter-input" value="${n.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621" style="width: 100%; direction: rtl;">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="medications-date-to" class="filter-label" style="text-align: right;">
                            <i class="fas fa-calendar-alt ml-1 text-gray-500"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621
                        </label>
                        <input type="date" id="medications-date-to" class="filter-input" value="${n.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621" style="width: 100%; direction: rtl;">
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
        `,this.applyModuleI18n(e),this.bindMedicationsTabEvents(e),t){const c=e.querySelector(`#${t}`);c&&(c.focus(),t==="medications-search"&&(c.selectionStart=a,c.selectionEnd=s))}setTimeout(()=>{const c=e.querySelector(".clinic-table-wrapper");c&&this.setupTableScrollListeners(c)},100)},bindMedicationsTabEvents(e){const t=e.querySelector("#medications-search"),a=e.querySelector("#medications-status"),s=e.querySelector("#medications-date-from"),n=e.querySelector("#medications-date-to"),i=e.querySelector("#medications-reset-filters"),o=e.querySelector("#medications-add-btn"),l=e.querySelector("#medications-export-pdf-btn"),r=e.querySelector("#medications-export-excel-btn");t&&t.addEventListener("input",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.search=c.target.value,this.scheduleMedicationsTabRender(150)}),a&&a.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.status=c.target.value,this.scheduleMedicationsTabRender(50)}),s&&s.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateFrom=c.target.value,this.scheduleMedicationsTabRender(50)}),n&&n.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateTo=c.target.value,this.scheduleMedicationsTabRender(50)}),i&&i.addEventListener("click",()=>{this.state.filters=this.state.filters||{},this.state.filters.medications={search:"",status:"all",dateFrom:"",dateTo:""},this.scheduleMedicationsTabRender(0)}),o&&o.addEventListener("click",()=>this.showMedicationForm()),l&&l.addEventListener("click",()=>this.exportMedicationsToPDF()),r&&r.addEventListener("click",()=>this.exportMedicationsToExcel()),e.querySelectorAll('[data-action="view-medication"]').forEach(c=>{c.addEventListener("click",()=>this.viewMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-medication"]').forEach(c=>{c.addEventListener("click",()=>this.editMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="delete-medication"]').forEach(c=>{c.addEventListener("click",()=>this.deleteMedication(c.getAttribute("data-id")))})},viewMedication(e){const t=this.getMedications().find(i=>i.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F");return}const a=t.status||"\u0633\u0627\u0631\u064A",s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                                <span class="badge ${this.getMedicationBadgeClass(a)}">${Utils.escapeHTML(a)}</span>
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
        `,document.body.appendChild(s);const n=()=>s.remove();s.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",n)}),s.addEventListener("click",i=>{i.target===s&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n()})},editMedication(e){const t=this.getMedications().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647");return}this.showMedicationForm(t)},async deleteMedication(e){const t=this.getMedications().find(s=>s.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062D\u0630\u0641\u0647");return}if(this.isCurrentUserAdmin()){if(!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))return;Loading.show();try{AppState.appData.medications=(AppState.appData.medications||[]).filter(n=>n.id!==e),AppState.appData.clinicMedications=(AppState.appData.clinicMedications||[]).filter(n=>n.id!==e),AppState.appData.clinicInventory=(AppState.appData.clinicInventory||[]).filter(n=>n.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:e}}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),this.renderMedicationsTab(),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062D\u0630\u0641",data:{id:e}}}))}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621:",n),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}else{if(!confirm(`\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}" \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`))return;Loading.show();try{const n={medicationId:e,medicationData:t,requestedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""},requestedById:AppState.currentUser?.id||"",reason:"\u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621"},i=await GoogleIntegration.sendRequest({action:"addMedicationDeletionRequest",data:n});if(i&&i.success)Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),this.notifyAdminAboutDeletionRequest(t),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),this.renderMedicationsTab();else throw new Error(i.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",n),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const e=(AppState.currentUser?.role||"").toLowerCase();return e==="admin"||e==="system_admin"||AppState.currentUser?.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e==="\u0645\u062F\u064A\u0631"},_isUsersSheetAdminRecord(e){if(!e)return!1;if(typeof Permissions<"u"){if(typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(e.role))return!0;const a=typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(e.permissions):e.permissions;if(a&&typeof a=="object"&&!Array.isArray(a)&&(Permissions.isAdminRole&&Permissions.isAdminRole(a.role)||a.admin===!0||a.isAdmin===!0||a["manage-modules"]===!0))return!0}const t=String(e.role||"").trim().toLowerCase();return t==="admin"||t==="system_admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="\u0645\u062F\u064A\u0631"},_invalidateApprovalsCache(){this._approvalsBackendFetchOk=!1;try{localStorage.removeItem("clinic_approvals_last_sync")}catch{}},_isApprovalTimeOffRequest(e){if(!e)return!1;if(e.approvalKind==="timeoff")return!0;const t=String(e.requestType||"").trim().toLowerCase();return t==="leave"||t==="permission"||t==="overtime"},_approvalRequestMatchesTypeFilter(e,t){return!e||!t||t==="all"?!0:t==="timeoff"?this._isApprovalTimeOffRequest(e):(e.approvalKind||e.requestType)===t},prefetchClinicAttendanceForAdminIfNeeded(e){return!this.isCurrentUserAdmin()||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest?Promise.resolve():this._adminAttendancePrefetchPromise&&!e?this._adminAttendancePrefetchPromise:(this._adminAttendancePrefetchPromise=(async()=>{try{await this._ensureClinicStaffLoadedForAttendance(),await this.loadClinicAttendanceData(!!e)&&(this._attendanceDataFetchedInSession=!0),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!!e),this._leaveBalancesFetchedInSession=!0,this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}catch{}})().finally(()=>{this._adminAttendancePrefetchPromise=null}),this._adminAttendancePrefetchPromise)},prefetchClinicTimeOffApprovalsForAdminIfNeeded(){return this.prefetchClinicAttendanceForAdminIfNeeded(!1)},_updatePendingApprovalsBadgeFromLocal_(){const e=document.getElementById("pending-approvals-badge");if(!e)return;const t=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],a=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],s=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],i=[...t,...a,...s,...n].filter(o=>o&&String(o.status)==="pending").length;i>0?(e.textContent=String(i),e.style.display="inline-block"):e.style.display="none"},getClinicStaffLeaveBalancesList(){return Array.isArray(AppState.appData?.clinicStaffLeaveBalances)?AppState.appData.clinicStaffLeaveBalances:[]},_getLeaveBalancePeriodDefaults(){const e=this._getTodayLocalKey();return this.state=this.state||{},this.state.leaveBalanceMonth||(this.state.leaveBalanceMonth=e.substring(0,7)),this.state.leaveBalanceYear||(this.state.leaveBalanceYear=e.substring(0,4)),{month:this.state.leaveBalanceMonth,year:this.state.leaveBalanceYear}},_scheduleLeaveBalancesLoadIfNeeded(e){this.canAccessAttendanceTab()&&(this._leaveBalancesLoadPromise&&!e||!e&&this._leaveBalancesFetchedInSession||(this._leaveBalancesLoadPromise=this.loadClinicStaffLeaveBalances(!!e).then(()=>{this._leaveBalancesFetchedInSession=!0,this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._leaveBalancesLoadPromise=null})))},_isLeaveBalancesLoading(){return!!this._leaveBalancesLoadPromise},async loadClinicStaffLeaveBalances(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const t=this._getLeaveBalancePeriodDefaults(),a=this.canViewAllAttendanceData();try{a&&await this._ensureClinicStaffLoadedForAttendance();const[s,n]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffLeaveBalances",data:{month:t.month,year:t.year,skipCache:!!e}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:e?{skipCache:!0}:{}})]);if(n?.success&&Array.isArray(n.data)&&(AppState.appData.clinicStaffTimeOffRequests=n.data),s?.success&&Array.isArray(s.data)?(AppState.appData.clinicStaffLeaveBalances=this._enrichLeaveBalancesFromLocal_(s.data,t),s.meta&&(this.state.leaveBalanceMonth=s.meta.month||t.month,this.state.leaveBalanceYear=s.meta.year||t.year)):a&&(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t)),AppState.appData.clinicStaffLeaveBalances&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}return!!(s?.success||a&&(AppState.appData.clinicStaffLeaveBalances||[]).length)}catch{return a?(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t),(AppState.appData.clinicStaffLeaveBalances||[]).length>0):!1}},_buildLeaveBalancePeriodFromItems_(e,t,a,s,n){const i=a.filter(c=>String(c.requestType).toLowerCase()==="leave").reduce((c,p)=>c+this._countLeaveDaysInPeriod_(p,e,t),0),o=a.filter(c=>String(c.requestType).toLowerCase()==="permission").length,l=s??0,r=n??0;return{periodType:e,periodKey:t,leaveEntitled:l,leaveConsumed:Math.round(i*100)/100,leaveRemaining:Math.max(0,Math.round((l-i)*100)/100),permissionEntitled:r,permissionConsumed:o,permissionRemaining:Math.max(0,r-o),approvedItems:a}},_buildLeaveBalancesFromStaffAndRequests_(e){const t=e?.month||"",a=e?.year||"",s=this.getClinicStaffLeaveBalancesList(),n=new Map(s.map(i=>[String(i.staffId),i]));return(this.getClinicStaffList()||[]).map(i=>{const o={id:i.id,staffId:i.id,userId:i.userId,userEmail:i.userEmail},l=n.get(String(i.id))||{},r=this._collectLocalApprovedTimeOffItems(o,"month",t),c=this._collectLocalApprovedTimeOffItems(o,"year",a);return{staffId:i.id,userId:i.userId||"",userName:i.userName||"",userEmail:i.userEmail||"",staffRole:i.staffRole||"",isActive:i.isActive,month:this._buildLeaveBalancePeriodFromItems_("month",t,r,l.month?.leaveEntitled,l.month?.permissionEntitled),year:this._buildLeaveBalancePeriodFromItems_("year",a,c,l.year?.leaveEntitled,l.year?.permissionEntitled)}})},_collectAllApprovedTimeOffForMonth_(e,t){const a=[],s=new Set,n=(i,o,l)=>{const r=String(i?.id||`${o}_${i?.dateFrom}_${i?.requestType}`).trim();r&&s.has(r)||(r&&s.add(r),a.push({...i,userName:o||i.userName||"\u2014",staffRole:l||i.staffRole}))};if((t||[]).forEach(i=>{(i.month?.approvedItems||[]).forEach(o=>{n(o,i.userName,i.staffRole)})}),this.canViewAllAttendanceData()){const i=new Map((this.getClinicStaffList()||[]).map(o=>[String(o.id),o]));this.getClinicStaffTimeOffRequestsList().forEach(o=>{if(!this._isTimeOffApprovedStatus(o.status)||!this._requestOverlapsPeriod(o,"month",e))return;const l=i.get(String(o.staffId))||{};n(o,o.userName||l.userName,l.staffRole)})}return a.sort((i,o)=>new Date(o.reviewedAt||o.requestedAt||o.createdAt)-new Date(i.reviewedAt||i.requestedAt||i.createdAt))},_isTimeOffApprovedStatus(e){const t=String(e||"").trim().toLowerCase();return t==="approved"||t==="\u0645\u0639\u062A\u0645\u062F"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627"},_timeOffRequestMatchesStaffRow(e,t){if(!e||!t)return!1;if(t.staffId&&e.staffId&&String(t.staffId)===String(e.staffId)||t.id&&e.staffId&&String(t.id)===String(e.staffId))return!0;const a=String(t.userId||"").trim(),s=String(t.userEmail||"").trim().toLowerCase();return!!(a&&String(e.userId||"").trim()===a||s&&String(e.userEmail||"").trim().toLowerCase()===s)},_dateKeyInPeriod(e,t,a){const s=this._attendanceDayKey(e);return!s||!a?!1:t==="year"?s.substring(0,4)===String(a):s.substring(0,7)===String(a)},_requestOverlapsPeriod(e,t,a){if(!e||!a)return!1;const s=this._attendanceDayKey(e.dateFrom),n=this._attendanceDayKey(e.dateTo||e.dateFrom),i=s||this._attendanceDayKey(e.requestedAt||e.createdAt);if(!i)return!1;if(this._dateKeyInPeriod(i,t,a)||n&&this._dateKeyInPeriod(n,t,a))return!0;try{let o=new Date(i);const l=new Date(n||i);if(Number.isNaN(o.getTime()))return!1;let r=0;for(;o<=l&&r<400;){if(this._dateKeyInPeriod(o,t,a))return!0;o.setDate(o.getDate()+1),r++}}catch{}return!1},_countLeaveDaysInPeriod_(e,t,a){const s=this._attendanceDayKey(e.dateFrom),n=this._attendanceDayKey(e.dateTo||e.dateFrom);if(!s){const i=parseFloat(e.durationDays);return!isNaN(i)&&i>0?i:0}try{let i=new Date(s);const o=new Date(n||s);if(Number.isNaN(i.getTime()))return parseFloat(e.durationDays)||0;let l=0,r=0;for(;i<=o&&r<400;)this._dateKeyInPeriod(i,t,a)&&(l+=1),i.setDate(i.getDate()+1),r++;return l||parseFloat(e.durationDays)||0}catch{return parseFloat(e.durationDays)||0}},_collectLocalApprovedTimeOffItems(e,t,a){return(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[]).filter(n=>!this._isTimeOffApprovedStatus(n.status)||!this._timeOffRequestMatchesStaffRow(n,e)?!1:this._requestOverlapsPeriod(n,t,a))},_enrichLeaveBalancesFromLocal_(e,t){const a=t?.month||"",s=t?.year||"";return(e||[]).map(n=>{const i={id:n.staffId,staffId:n.staffId,userId:n.userId,userEmail:n.userEmail},o=[...Array.isArray(n.month?.approvedItems)?n.month.approvedItems:[],...this._collectLocalApprovedTimeOffItems(i,"month",a)],l=[...Array.isArray(n.year?.approvedItems)?n.year.approvedItems:[],...this._collectLocalApprovedTimeOffItems(i,"year",s)],r=b=>{const S=new Map;return b.forEach(T=>{T?.id&&S.set(String(T.id),T)}),Array.from(S.values())},c=r(o),p=r(l),u=c.filter(b=>String(b.requestType).toLowerCase()==="leave").reduce((b,S)=>b+this._countLeaveDaysInPeriod_(S,"month",a),0),d=c.filter(b=>String(b.requestType).toLowerCase()==="permission").length,m=p.filter(b=>String(b.requestType).toLowerCase()==="leave").reduce((b,S)=>b+this._countLeaveDaysInPeriod_(S,"year",s),0),f=p.filter(b=>String(b.requestType).toLowerCase()==="permission").length,y={...n.month||{}},g={...n.year||{}};return c.length&&(y.leaveConsumed=Math.max(y.leaveConsumed||0,Math.round(u*100)/100),y.permissionConsumed=Math.max(y.permissionConsumed||0,d),y.leaveRemaining=Math.max(0,Math.round(((y.leaveEntitled||0)-y.leaveConsumed)*100)/100),y.permissionRemaining=Math.max(0,(y.permissionEntitled||0)-y.permissionConsumed),y.approvedItems=c),p.length&&(g.leaveConsumed=Math.max(g.leaveConsumed||0,Math.round(m*100)/100),g.permissionConsumed=Math.max(g.permissionConsumed||0,f),g.leaveRemaining=Math.max(0,Math.round(((g.leaveEntitled||0)-g.leaveConsumed)*100)/100),g.permissionRemaining=Math.max(0,(g.permissionEntitled||0)-g.permissionConsumed),g.approvedItems=p),{...n,month:y,year:g}})},renderApprovedTimeOffRequestsSection(e,t){const a=this._collectAllApprovedTimeOffForMonth_(t,e),s=a.length?a.map(n=>`
            <tr>
                <td>${Utils.escapeHTML(n.userName||"\u2014")}</td>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(n.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(n))}</td>
                <td class="text-sm">${Utils.escapeHTML(n.reason||"\u2014")}</td>
                <td>${this.formatDate(n.reviewedAt||n.requestedAt||n.createdAt,!0)}</td>
            </tr>
        `).join(""):`<tr><td colspan="5" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0623\u0648 \u0623\u0630\u0648\u0646\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A ${Utils.escapeHTML(t||"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</td></tr>`;return`<div class="content-card mt-4" id="clinic-approved-timeoff-section">
            <div class="card-header" style="padding:12px 18px;border-bottom:1px solid #f1f5f9;">
                <h4 style="margin:0;font-size:0.92rem;font-weight:700;color:#0b2a55;"><i class="fas fa-check-circle ml-2" style="color:#059669;"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${Utils.escapeHTML(t||"")})</h4>
            </div>
            <div class="card-body" style="padding:0;">
                ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                    <thead><tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th></tr></thead>
                    <tbody>${s}</tbody>
                </table>`)}
            </div>
        </div>`},_renderBalanceTriplet(e,t,a){const s=e??0,n=t??0,i=a??0,o=s>0&&i<=0?"#dc2626":"#059669";return`<span style="font-size:0.76rem;white-space:nowrap;line-height:1.5;">
            <span style="color:#64748b;">\u0645\u0633\u062A\u062D\u0642 <strong>${s}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:#d97706;">\u0645\u0633\u062A\u0646\u0641\u0630 <strong>${n}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:${o};">\u0645\u062A\u0628\u0642\u064A <strong>${i}</strong></span>
        </span>`},renderClinicStaffLeaveBalancesSection(e){e=e||{};const t=e.balances||[],a=!!e.loading,s=e.month||"",n=e.year||"",i=this.canViewAllAttendanceData();if(!i&&!t.length&&!a)return"";const o=i?7:6,l=a&&!t.length?`<tr><td colspan="${o}" class="text-center text-gray-500 py-8"><i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0631\u0635\u062F\u0629...</td></tr>`:t.length?t.map(r=>{const c=r.month||{},p=r.year||{};return`<tr>
                    <td>${Utils.escapeHTML(r.userName||"\u2014")}</td>
                    <td>${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                    <td>${this._renderBalanceTriplet(c.leaveEntitled,c.leaveConsumed,c.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(c.permissionEntitled,c.permissionConsumed,c.permissionRemaining)}</td>
                    <td>${this._renderBalanceTriplet(p.leaveEntitled,p.leaveConsumed,p.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(p.permissionEntitled,p.permissionConsumed,p.permissionRemaining)}</td>
                    ${i?`<td><button type="button" class="btn-secondary btn-sm clinic-leave-quota-edit-btn" data-staff-id="${Utils.escapeAttr(r.staffId)}" data-staff-name="${Utils.escapeAttr(r.userName||"")}"><i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644</button></td>`:""}
                </tr>`}).join(""):`<tr><td colspan="${o}" class="text-center text-gray-500 py-6">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646</td></tr>`;return`<div class="content-card mt-4" id="clinic-leave-balances-section">
            <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#0b2a55;"><i class="fas fa-wallet ml-2" style="color:#2563eb;"></i>\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    <label style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0634\u0647\u0631</label>
                    <input type="month" id="clinic-leave-balance-month" class="form-input" style="padding:6px 10px;font-size:0.8rem;width:auto;" value="${Utils.escapeAttr(s)}">
                    <label style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0633\u0646\u0629</label>
                    <input type="number" id="clinic-leave-balance-year" class="form-input" style="padding:6px 10px;font-size:0.8rem;width:90px;" min="2020" max="2100" value="${Utils.escapeAttr(n)}">
                    <button type="button" id="clinic-leave-balance-refresh-btn" class="btn-secondary btn-sm" title="\u062A\u062D\u062F\u064A\u062B"><i class="fas fa-sync-alt${a?" fa-spin":""}"></i></button>
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
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(s)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(s)})</th>
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(n)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(n)})</th>
                        ${i?"<th>\u0625\u062C\u0631\u0627\u0621</th>":""}
                    </tr></thead>
                    <tbody>${l}</tbody>
                </table>`)}
            </div>
        </div>`},_isClinicRpcActionMissing_(e){const t=String(e||"");return/غير معترف|ACTION_NOT_RECOGNIZED|Action not recognized|الإجراء غير معروف/i.test(t)},async upsertClinicStaffLeaveQuotaOnServer_(e){if(!e?.staffId)return{success:!1,message:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0637\u0644\u0648\u0628"};try{return await GoogleIntegration.sendRequest({action:"upsertClinicStaffLeaveQuota",data:e})}catch(t){if(!this._isClinicRpcActionMissing_(t?.message))throw t;return this._upsertClinicStaffLeaveQuotaViaSheet_(e)}},async _upsertClinicStaffLeaveQuotaViaSheet_(e){if(!this.isCurrentUserAdmin())return{success:!1,message:"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"};const t="ClinicStaffLeaveQuota",a=String(e.periodType||"month").trim().toLowerCase(),s=String(e.periodKey||"").trim();if(!s)return{success:!1,message:"\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629"};await this._ensureClinicStaffLoadedForAttendance();const n=(AppState.appData.clinicStaff||[]).find(f=>f&&String(f.id)===String(e.staffId));if(!n)return{success:!1,message:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"};let i=parseFloat(e.leaveDaysQuota);(isNaN(i)||i<0)&&(i=0);let o=parseInt(e.permissionCountQuota,10);(isNaN(o)||o<0)&&(o=0),typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t);const l=await GoogleIntegration.readFromSheets(t,3e4),r=Array.isArray(l)?[...l]:[],c=r.findIndex(f=>f&&String(f.staffId)===String(e.staffId)&&String(f.periodType)===a&&String(f.periodKey)===s),p=AppState.currentUser||{},u=new Date().toISOString(),d={staffId:n.id,userId:n.userId||"",userEmail:n.userEmail||"",userName:n.userName||"",periodType:a,periodKey:s,leaveDaysQuota:i,permissionCountQuota:o,notes:String(e.notes||"").trim(),updatedById:p.id||p.userId||"",updatedByName:p.name||"",updatedAt:u};let m;return c>=0?(d.id=r[c].id,d.createdAt=r[c].createdAt||u,Object.assign(r[c],d),m=await GoogleIntegration.saveToSheets(t,r)):(d.id=typeof Utils<"u"&&Utils.generateSequentialId?Utils.generateSequentialId("CLQ",r):`CLQ-${Date.now()}`,d.createdAt=u,m=await GoogleIntegration.saveToSheets(t,[...r,d]),m?.success||(m=await GoogleIntegration.appendToSheets(t,d))),m?.success&&typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t),m?.success?{success:!0,data:c>=0?r[c]:d,message:"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"}:m||{success:!1,message:"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F"}},showClinicStaffLeaveQuotaModal(e,t){if(!this.isCurrentUserAdmin()||!e)return;const s=this.getClinicStaffLeaveBalancesList().find(b=>String(b.staffId)===String(e))||{},n=this._getLeaveBalancePeriodDefaults(),i=s.month||{},o=s.year||{},l=document.getElementById("clinic-leave-quota-modal");l&&l.remove();const r=document.createElement("div");r.id="clinic-leave-quota-modal",r.className="modal-overlay",r.innerHTML=`
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
                        <input type="month" id="clinic-leave-quota-month" class="form-input" value="${Utils.escapeAttr(n.month)}">
                    </div>
                    <div id="clinic-leave-quota-year-wrap" class="hidden">
                        <label class="block text-sm font-semibold mb-1">\u0627\u0644\u0633\u0646\u0629 *</label>
                        <input type="number" id="clinic-leave-quota-year" class="form-input" min="2020" max="2100" value="${Utils.escapeAttr(n.year)}">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold mb-1">\u0631\u0635\u064A\u062F \u0627\u0644\u0625\u062C\u0627\u0632\u0629 (\u0623\u064A\u0627\u0645)</label>
                            <input type="number" id="clinic-leave-quota-days" class="form-input" min="0" step="0.5" value="${i.leaveEntitled??0}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">\u0639\u062F\u062F \u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</label>
                            <input type="number" id="clinic-leave-quota-perms" class="form-input" min="0" step="1" value="${i.permissionEntitled??0}">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <textarea id="clinic-leave-quota-notes" class="form-textarea" rows="2" placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A">${Utils.escapeHTML(i.quotaNotes||"")}</textarea>
                    </div>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0634\u0647\u0631\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${i.leaveConsumed??0}/${i.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${i.permissionConsumed??0}/${i.permissionEntitled??0}</p>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0633\u0646\u0648\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${o.leaveConsumed??0}/${o.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${o.permissionConsumed??0}/${o.permissionEntitled??0}</p>
                </div>
                <div class="modal-footer flex gap-2 justify-end">
                    <button type="button" class="btn-secondary" id="clinic-leave-quota-cancel">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="clinic-leave-quota-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F</button>
                </div>
            </div>`,document.body.appendChild(r);const c=r.querySelector("#clinic-leave-quota-period-type"),p=r.querySelector("#clinic-leave-quota-month-wrap"),u=r.querySelector("#clinic-leave-quota-year-wrap"),d=r.querySelector("#clinic-leave-quota-days"),m=r.querySelector("#clinic-leave-quota-perms"),f=r.querySelector("#clinic-leave-quota-notes"),y=()=>{const b=c.value==="year";p.classList.toggle("hidden",b),u.classList.toggle("hidden",!b);const S=b?o:i;d.value=S.leaveEntitled??0,m.value=S.permissionEntitled??0,f.value=S.quotaNotes||""};c.addEventListener("change",y),y();const g=()=>r.remove();r.querySelector("#clinic-leave-quota-close")?.addEventListener("click",g),r.querySelector("#clinic-leave-quota-cancel")?.addEventListener("click",g),r.addEventListener("click",b=>{b.target===r&&g()}),r.querySelector("#clinic-leave-quota-save")?.addEventListener("click",async()=>{const b=c.value,S=b==="year"?String(r.querySelector("#clinic-leave-quota-year")?.value||"").trim():String(r.querySelector("#clinic-leave-quota-month")?.value||"").trim();if(!S){Notification?.error?.("\u062D\u062F\u062F \u0627\u0644\u0634\u0647\u0631 \u0623\u0648 \u0627\u0644\u0633\u0646\u0629");return}Loading.show();try{const T=await this.upsertClinicStaffLeaveQuotaOnServer_({staffId:e,periodType:b,periodKey:S,leaveDaysQuota:d.value,permissionCountQuota:m.value,notes:f.value?.trim()||""});if(T?.success)this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0,Loading.hide(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"),g(),this.renderAttendanceTab({force:!0});else throw new Error(T?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(T){Loading.hide(),Notification?.error?.(T?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F")}})},bindClinicStaffLeaveBalanceEvents(e){if(!e)return;const t=()=>{const a=e.querySelector("#clinic-leave-balance-month")?.value||"",s=e.querySelector("#clinic-leave-balance-year")?.value||"";this.state.leaveBalanceMonth=a||this._getLeaveBalancePeriodDefaults().month,this.state.leaveBalanceYear=s||this._getLeaveBalancePeriodDefaults().year,this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})};e.querySelector("#clinic-leave-balance-month")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-year")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-refresh-btn")?.addEventListener("click",()=>{this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})}),e.querySelectorAll(".clinic-leave-quota-edit-btn").forEach(a=>{a.addEventListener("click",()=>{this.showClinicStaffLeaveQuotaModal(a.dataset.staffId,a.dataset.staffName)})})},_mergeAttendanceRowsByUserDay(e){if(!Array.isArray(e)||!e.length)return[];const t=new Map,a=[],s=i=>{let o="",l=1/0;return i.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c<l&&(l=c,o=r)}),o},n=i=>{let o="",l=-1/0;return i.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c>l&&(l=c,o=r)}),o};return e.forEach(i=>{if(!i)return;const o=this._attendanceDayKey(i.date),l=String(i.staffId||i.userId||i.userEmail||"").trim().toLowerCase(),r=`${o}|${l}`;if(!t.has(r)){t.set(r,{...i,date:o||i.date}),a.push(r);return}const c=t.get(r);if(c.checkIn=s([c.checkIn,i.checkIn])||c.checkIn||i.checkIn,c.checkOut=n([c.checkOut,i.checkOut])||c.checkOut||i.checkOut,c.checkIn&&c.checkOut){const p=new Date(c.checkIn).getTime(),u=new Date(c.checkOut).getTime();!Number.isNaN(p)&&!Number.isNaN(u)&&u>p&&(c.workDuration=Math.round((u-p)/36e5*100)/100)}}),a.map(i=>t.get(i))},async notifyAdminAboutDeletionRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const a=t.data.filter(s=>this._isUsersSheetAdminRecord(s));for(const s of a)s.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:s.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${e.name||""}"`,type:"approval_request",priority:"high",link:"#clinic-approvals",data:{module:"clinic",action:"medication_deletion",medicationId:e.id}}}).catch(n=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",n)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},async notifyAdminAboutSupplyRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const a=t.data.filter(n=>this._isUsersSheetAdminRecord(n)),s={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[e.type]||e.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const n of a)n.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:n.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u062D\u062A\u064A\u0627\u062C",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 ${s}: "${e.itemName||""}"`,type:"approval_request",priority:e.priority==="urgent"?"high":"normal",link:"#clinic-approvals",data:{module:"clinic",action:"supply_request",requestId:e.id}}}).catch(i=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},getMonthlyVisitsAlertThreshold(){try{const e=AppState.companySettings?.clinicMonthlyVisitsAlertThreshold;if(e==null||e==="")return 10;const t=parseInt(e,10);return isNaN(t)||t<1?10:Math.min(1e3,t)}catch{return 10}},DEFAULT_VISIT_TYPES:["\u0637\u0648\u0627\u0631\u0626","\u0627\u0635\u0627\u0628\u0629 \u0639\u0645\u0644","\u0645\u0631\u0636","\u0641\u062D\u0635 \u062F\u0648\u0631\u064A","\u0645\u062A\u0627\u0628\u0639\u0629","\u0641\u062D\u0635 \u0645\u0627\u0642\u0628\u0644 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u062F\u0627\u0631\u062A"],DEFAULT_REASONS:["\u0635\u062F\u0627\u0639 \u0648\u0625\u0631\u0647\u0627\u0642","\u0645\u063A\u0635 \u0648\u0622\u0644\u0627\u0645 \u0628\u0627\u0644\u0628\u0637\u0646","\u0627\u0631\u062A\u0641\u0627\u0639 \u0641\u064A \u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629","\u0627\u0631\u062A\u0641\u0627\u0639 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645","\u0647\u0628\u0648\u0637 / \u062F\u0648\u062E\u0629","\u0625\u062C\u0647\u0627\u062F \u062D\u0631\u0627\u0631\u064A","\u0622\u0644\u0627\u0645 \u0641\u064A \u0627\u0644\u0639\u0636\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644","\u062C\u0631\u062D \u0633\u0637\u062D\u064A","\u062D\u0631\u0642 \u0637\u0641\u064A\u0641","\u0643\u062F\u0645\u0629 \u0623\u0648 \u0627\u0644\u062A\u0648\u0627\u0621","\u062D\u0633\u0627\u0633\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 / \u062D\u0643\u0629","\u0623\u0644\u0645 \u0628\u0627\u0644\u0623\u0633\u0646\u0627\u0646","\u0627\u0644\u062A\u0647\u0627\u0628 \u0628\u0627\u0644\u062D\u0644\u0642 \u0648\u0633\u0639\u0627\u0644","\u0623\u0644\u0645 \u0628\u0627\u0644\u0639\u064A\u0646 / \u062F\u062E\u0648\u0644 \u062C\u0633\u0645 \u063A\u0631\u064A\u0628","\u0641\u062D\u0635 \u0637\u0628\u064A \u062F\u0648\u0631\u064A","\u062A\u063A\u064A\u064A\u0631 \u0639\u0644\u0649 \u062C\u0631\u062D"],DEFAULT_DIAGNOSES:["\u0635\u062F\u0627\u0639 \u062A\u0648\u062A\u0631\u064A (Tension Headache)","\u0646\u0632\u0644\u0629 \u0645\u0639\u0648\u064A\u0629 \u062D\u0627\u062F\u0629 (Gastroenteritis)","\u0627\u0644\u062A\u0647\u0627\u0628 \u062D\u0627\u062F \u0628\u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u062A\u0646\u0641\u0633\u064A \u0627\u0644\u0639\u0644\u0648\u064A (URTI)","\u0627\u0631\u062A\u0641\u0627\u0639 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645 (Hypertension)","\u0627\u0646\u062E\u0641\u0627\u0636 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645 (Hypotension)","\u0625\u062C\u0647\u0627\u062F \u0639\u0636\u0644\u064A \u062D\u0627\u062F (Muscle Strain)","\u0625\u062C\u0647\u0627\u062F \u062D\u0631\u0627\u0631\u064A (Heat Exhaustion)","\u062C\u0631\u062D \u0642\u0637\u0639\u064A \u0633\u0637\u062D\u064A (Superficial Wound)","\u062D\u0631\u0642 \u0645\u0646 \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (First Degree Burn)","\u0643\u062F\u0645\u0629 \u0631\u0636\u064A\u0629 (Contusion)","\u062D\u0633\u0627\u0633\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 \u062A\u0644\u0627\u0645\u0633\u064A\u0629 (Contact Dermatitis)","\u0627\u0644\u062A\u0647\u0627\u0628 \u0644\u062B\u0629 / \u0623\u0644\u0645 \u0623\u0633\u0646\u0627\u0646 (Gingivitis / Toothache)","\u0627\u0644\u062A\u0647\u0627\u0628 \u0645\u0644\u062A\u062D\u0645\u0629 \u0627\u0644\u0639\u064A\u0646 (Conjunctivitis)","\u062D\u0645\u0648\u0636\u0629 \u0648\u0627\u0631\u062A\u062C\u0627\u0639 \u0645\u0631\u064A\u0626\u064A (GERD / Gastritis)","\u0645\u063A\u0635 \u0643\u0644\u0648\u064A \u062E\u0641\u064A\u0641 (Renal Colic)"],DEFAULT_TREATMENTS:["\u0625\u0639\u0637\u0627\u0621 \u0645\u0633\u0643\u0646 \u0648\u0645\u0644\u0627\u062D\u0638\u0629 \u0646\u0635\u0641 \u0633\u0627\u0639\u0629 \u062B\u0645 \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0639\u0645\u0644","\u0631\u0627\u062D\u0629 \u0637\u0628\u064A\u0629 \u0628\u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0645\u0639 \u0633\u0648\u0627\u0626\u0644","\u0642\u064A\u0627\u0633 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u062D\u064A\u0648\u064A\u0629 \u0648\u0627\u0644\u0633\u0643\u0631 \u0648\u0627\u0644\u0636\u063A\u0637","\u062A\u0637\u0647\u064A\u0631 \u0627\u0644\u062C\u0631\u062D \u0648\u0639\u0645\u0644 \u063A\u064A\u0627\u0631 \u0645\u0639\u0642\u0645","\u0643\u0645\u0627\u062F\u0627\u062A \u0628\u0627\u0631\u062F\u0629 / \u0645\u0648\u0636\u0639\u064A\u0629","\u0635\u0631\u0641 \u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644","\u0625\u062D\u0627\u0644\u0629 \u0644\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A / \u0627\u0644\u062E\u0627\u0631\u062C\u064A","\u062A\u0648\u0635\u064A\u0629 \u0628\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629 \u0644\u064A\u0648\u0645 \u0648\u0627\u062D\u062F","\u062C\u0644\u0633\u0629 \u0627\u0633\u062A\u0646\u0634\u0627\u0642 / \u0628\u062E\u0627\u0631","\u063A\u0633\u064A\u0644 \u0627\u0644\u0639\u064A\u0646 \u0628\u0645\u062D\u0644\u0648\u0644 \u0645\u0644\u062D\u064A \u0645\u0639\u0642\u0645"],getReasonSuggestions(){const e=new Set(this.DEFAULT_REASONS||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const a=String(t.reason||"").trim();a&&a.length>1&&e.add(a)}),Array.from(e)},getDiagnosisSuggestions(){const e=new Set(this.DEFAULT_DIAGNOSES||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const a=String(t.diagnosis||"").trim();a&&a.length>1&&e.add(a)}),Array.from(e)},getTreatmentSuggestions(){const e=new Set(this.DEFAULT_TREATMENTS||[]);return(AppState.appData?.clinicVisits||[]).forEach(t=>{const a=String(t.treatment||"").trim();a&&a.length>1&&e.add(a)}),Array.from(e)},DEFAULT_CONTRACTOR_POSITIONS:["\u0639\u0627\u0645\u0644","\u0641\u0646\u064A \u0643\u0647\u0631\u0628\u0627\u0621","\u0641\u0646\u064A \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627","\u0644\u062D\u0627\u0645","\u0628\u0631\u0627\u062F / \u0641\u0646\u064A \u062A\u0631\u0643\u064A\u0628\u0627\u062A","\u0646\u062C\u0627\u0631 \u0645\u0633\u0644\u062D","\u062D\u062F\u0627\u062F \u0645\u0633\u0644\u062D","\u0641\u0646\u064A \u0633\u0642\u0627\u0644\u0627\u062A","\u0633\u0627\u0626\u0642 \u0645\u0639\u062F\u0627\u062A","\u0645\u0634\u0631\u0641 \u0645\u0648\u0642\u0639","\u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629 (HSE Officer)","\u0645\u0647\u0646\u062F\u0633 \u0645\u0648\u0642\u0639","\u0641\u0646\u064A \u0639\u0632\u0644","\u0639\u0627\u0645\u0644 \u0646\u0638\u0627\u0641\u0629 / \u0628\u0648\u0641\u064A\u0647","\u0645\u0633\u0627\u0639\u062F \u0641\u0646\u064A"],getContractorPositionSuggestions(){const e=new Set(this.DEFAULT_CONTRACTOR_POSITIONS||[]);return(AppState.appData?.employees||[]).forEach(t=>{const a=String(t.position||"").trim();a&&e.add(a)}),(AppState.appData?.clinicVisits||[]).forEach(t=>{const a=String(t.contractorPosition||t.employeePosition||"").trim();a&&a.length>1&&e.add(a)}),(AppState.appData?.violations||[]).forEach(t=>{const a=String(t.contractorPosition||"").trim();a&&e.add(a)}),Array.from(e).sort((t,a)=>t.localeCompare(a,"ar",{sensitivity:"base"}))},getContractorWorkerSuggestions(e=null){const t=new Set,a=n=>n?this.normalizeArabicText(String(n)):"",s=e?a(e):null;return(AppState.appData?.clinicVisits||[]).forEach(n=>{if(n.personType==="contractor"||n.contractorName||n.contractorWorkerName){const i=n.contractorName||"",o=(n.contractorWorkerName||"").trim();o&&(!s||a(i).includes(s)||s.includes(a(i)))&&t.add(o)}}),(AppState.appData?.violations||[]).forEach(n=>{const i=n.contractorName||"",o=(n.contractorWorker||"").trim();o&&(!s||a(i).includes(s)||s.includes(a(i)))&&t.add(o)}),(AppState.appData?.behaviors||[]).forEach(n=>{const i=n.contractorName||"",o=(n.contractorWorker||"").trim();o&&(!s||a(i).includes(s)||s.includes(a(i)))&&t.add(o)}),(AppState.appData?.ptw||[]).forEach(n=>{const i=n.contractorName||n.contractor||"",o=n.workers||n.workerNames||[];Array.isArray(o)&&o.forEach(l=>{const r=(typeof l=="string"?l:l?.name||"").trim();r&&(!s||a(i).includes(s)||s.includes(a(i)))&&t.add(r)})}),(AppState.appData?.contractors||[]).forEach(n=>{const i=n.name||n.contractorName||"",o=n.workers||n.workerNames||[];Array.isArray(o)&&o.forEach(l=>{const r=(typeof l=="string"?l:l?.name||"").trim();r&&(!s||a(i).includes(s)||s.includes(a(i)))&&t.add(r)})}),Array.from(t).sort((n,i)=>n.localeCompare(i,"ar",{sensitivity:"base"}))},getVisitTypeOptions(){let e=AppState.companySettings?.clinicVisitTypes;if(typeof e=="string"){const t=e.trim();if(t)try{e=JSON.parse(t)}catch{e=t.split(/\n|,/).map(s=>s.trim()).filter(Boolean)}else e=[]}return(!Array.isArray(e)||e.length===0)&&AppState.appData?.clinicVisitTypes&&(e=AppState.appData.clinicVisitTypes),Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_VISIT_TYPES||[]).slice()},normalizeArabicText(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},getMonthlyVisitCountForPerson(e){try{if(!e||!e.visitDate)return 0;const t=new Date(e.visitDate);if(isNaN(t.getTime()))return 0;const a=t.getFullYear(),s=t.getMonth(),n=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),i=new Set,o=n.filter(d=>{if(!d)return!1;const m=String(d.id||"").trim();return m?i.has(m)?!1:(i.add(m),!0):!0}),l=d=>{if(!d||!d.visitDate)return!1;const m=new Date(d.visitDate);return isNaN(m.getTime())?!1:m.getFullYear()===a&&m.getMonth()===s},r=(e.personType||"employee").toString().toLowerCase();if(!(r==="contractor"||r==="external"||r.includes("\u0645\u0642\u0627\u0648\u0644")||r.includes("\u062E\u0627\u0631"))){const d=String(e.employeeCode||e.employeeNumber||"").trim();return d?o.filter(m=>{if(!l(m))return!1;const f=(m.personType||"").toString().toLowerCase();return f==="employee"||f===""||f.includes("\u0645\u0648\u0638")?String(m.employeeCode||m.employeeNumber||"").trim()===d:!1}).length:0}const p=this.normalizeArabicText(e.contractorName||e.externalName),u=this.normalizeArabicText(e.contractorWorkerName);return!p&&!u?0:o.filter(d=>{if(!l(d))return!1;const m=(d.personType||"").toString().toLowerCase();if(!(m==="contractor"||m==="external"||m.includes("\u0645\u0642\u0627\u0648\u0644")||m.includes("\u062E\u0627\u0631")))return!1;const y=this.normalizeArabicText(d.contractorName||d.externalName),g=this.normalizeArabicText(d.contractorWorkerName);return y===p&&g===u}).length}catch(t){return Utils.safeWarn("getMonthlyVisitCountForPerson:",t),0}},showVisitTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getVisitTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"vt-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(e);const n=()=>{const i=document.getElementById("clinic-visit-types-list");i&&(i.innerHTML=s.map((o,l)=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-visit-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-visit-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-visit-types-add-row").addEventListener("click",()=>{s.push({id:"vt-"+Date.now()+"-"+s.length,text:""}),n()}),t.querySelector("#clinic-visit-types-reset").addEventListener("click",()=>{s=a(this.DEFAULT_VISIT_TYPES||[]),n()}),t.querySelector("#clinic-visit-types-save").addEventListener("click",async()=>{t.querySelectorAll("#clinic-visit-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicVisitTypes=i,(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.companySettings.clinicVisitTypes=i;try{const o=AppState.currentUser||{},l={...AppState.companySettings,clinicVisitTypes:i,userData:o},r=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:l});if(!r||r.success!==!0)throw new Error(r&&r.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(o){Notification?.error?.(o?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>t.remove())})},DEFAULT_INJURY_TYPES:["\u062C\u0631\u062D","\u0643\u0633\u0631","\u062D\u0631\u0648\u0642","\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u063A\u0629","\u0627\u0644\u062A\u0648\u0627\u0621","\u0623\u062E\u0631\u0649"],getInjuryTypeOptions(){const e=AppState.appData?.clinicInjuryTypes;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_TYPES||[]).slice()},showInjuryTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"it-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(e);const n=()=>{const i=document.getElementById("clinic-injury-types-list");i&&(i.innerHTML=s.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-injury-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-injury-types-add-row").addEventListener("click",()=>{s.push({id:"it-"+Date.now()+"-"+s.length,text:""}),n()}),t.querySelector("#clinic-injury-types-reset").addEventListener("click",()=>{s=a(this.DEFAULT_INJURY_TYPES||[]),n()}),t.querySelector("#clinic-injury-types-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryTypes=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>t.remove())})},DEFAULT_INJURY_BODY_PARTS:["\u0627\u0644\u0631\u0623\u0633","\u0627\u0644\u0639\u064A\u0646","\u0627\u0644\u0648\u062C\u0647","\u0627\u0644\u0631\u0642\u0628\u0629","\u0627\u0644\u0643\u062A\u0641","\u0627\u0644\u0630\u0631\u0627\u0639","\u0627\u0644\u064A\u062F","\u0627\u0644\u0635\u062F\u0631","\u0627\u0644\u0638\u0647\u0631","\u0627\u0644\u0628\u0637\u0646","\u0627\u0644\u0633\u0627\u0642","\u0627\u0644\u0642\u062F\u0645","\u0623\u062E\u0631\u0649"],getInjuryBodyPartOptions(){const e=AppState.appData?.clinicInjuryBodyParts;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_BODY_PARTS||[]).slice()},showInjuryBodyPartsSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryBodyPartOptions(),t=document.createElement("div");t.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"ib-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(e);const n=()=>{const i=document.getElementById("clinic-injury-body-parts-list");i&&(i.innerHTML=s.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-body-part" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-injury-body-part").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-injury-body-parts-add-row").addEventListener("click",()=>{s.push({id:"ib-"+Date.now()+"-"+s.length,text:""}),n()}),t.querySelector("#clinic-injury-body-parts-reset").addEventListener("click",()=>{s=a(this.DEFAULT_INJURY_BODY_PARTS||[]),n()}),t.querySelector("#clinic-injury-body-parts-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-body-parts-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryBodyParts=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>t.remove())})},async notifyAdminsAboutHighClinicVisits(e,t){try{const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(!a||!a.success||!Array.isArray(a.data))return;const s=a.data.filter(r=>{const c=(r.role||"").toLowerCase();return c==="admin"||c==="\u0645\u062F\u064A\u0631"}),n=this.getMonthlyVisitsAlertThreshold(),i=(e.personType||"").toString().toLowerCase()==="employee"?e.employeeName||e.employeeCode||"\u0645\u0648\u0638\u0641":e.contractorWorkerName||e.contractorName||e.externalName||"\u0645\u0642\u0627\u0648\u0644/\u0639\u0627\u0645\u0644",o="\u062A\u0646\u0628\u064A\u0647: \u062A\u0631\u062F\u062F \u0639\u0627\u0644\u064D \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",l=`\u0627\u0644\u0645\u0648\u0638\u0641/\u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${i}" \u0628\u0644\u063A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A\u0647 \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 ${t} \u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u062D\u062F ${n}).`;for(const r of s)if(r.id||r.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:r.id||r.email,title:o,message:l,type:"clinic_high_visits",priority:"high",link:"#clinic",data:{module:"clinic",action:"high_monthly_visits",personType:e.personType,monthlyCount:t,personLabel:i}}})}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631:",c)}}catch(a){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",a)}},exportMedicationsToExcel(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(i=>{const o=i.quantityAdded??i.quantity??0,l=i.remainingQuantity??i.quantity??0,r=Math.max(0,o-l);return{"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":i.name||"","\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621":i.type||"",\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:i.usage||i.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621":i.purchaseDate?this.formatDate(i.purchaseDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":i.expiryDate?this.formatDate(i.expiryDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"\u0633\u0627\u0631\u064A","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":i.daysRemaining??"",\u0627\u0644\u0643\u0645\u064A\u0629:o,\u0627\u0644\u0645\u0646\u0635\u0631\u0641:r,\u0627\u0644\u0631\u0635\u064A\u062F:l}}),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,s,"Medications");const n=`Clinic_Medications_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},async exportMedicationsToPDF(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const s=8,n=a.internal.pageSize.getWidth(),i=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",p=AppState?.companySettings?.phone||"",u=AppState?.companySettings?.email||"",d=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",f=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,y=new Date().toLocaleDateString("ar-SA");let g=8;if(m)try{a.addImage(m,"PNG",s,g-1,15,10)}catch{}const b=s+(m?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,b,g+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,b,g+9));const S=[c,p,u].filter(Boolean).join(" | ");S&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(S,b,r?g+15:g+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",n-s,g+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(f,n-s,g+9,{align:"right"});const T=S?r?g+21:g+15:r?g+15:g+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(s,T,n-s,T),g=T+4,a.setFillColor(0,56,101),a.rect(0,g,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,s,g+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,g+5.5,{align:"center"}),g+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,g,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${y}`,s,g+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,n-s,g+7,{align:"right"}),g+=11;const D=e.filter(w=>w.status==="\u0633\u0627\u0631\u064A").length,$=e.filter(w=>w.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,h=e.filter(w=>w.status==="\u0645\u0646\u062A\u0647\u064A").length,v=e.length,L=[{label:"\u0633\u0627\u0631\u064A",value:D,bg:[232,245,233],accent:[46,125,50],tc:[27,94,32]},{label:"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:$,bg:[255,243,224],accent:[245,124,0],tc:[230,81,0]},{label:"\u0645\u0646\u062A\u0647\u064A",value:h,bg:[251,233,231],accent:[211,47,47],tc:[183,28,28]},{label:"\u0625\u062C\u0645\u0627\u0644\u064A",value:v,bg:[227,242,253],accent:[21,101,192],tc:[13,71,161]}],k=(n-2*s-9)/4,C=13;L.forEach((w,_)=>{const M=s+_*(k+3);a.setFillColor(w.bg[0],w.bg[1],w.bg[2]),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(M,g,k,C,2,2,"FD"),a.setFillColor(w.accent[0],w.accent[1],w.accent[2]),a.rect(M,g,1.5,C,"F"),a.setFontSize(6),a.setTextColor(w.accent[0],w.accent[1],w.accent[2]),a.text(w.label,M+4,g+4.5),a.setFontSize(11),a.setTextColor(w.tc[0],w.tc[1],w.tc[2]),a.text(String(w.value),M+k-4,g+C-2.5,{align:"right"})}),g+=C+9;const I={\u0633\u0627\u0631\u064A:[46,125,50],"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":[255,152,0],\u0645\u0646\u062A\u0647\u064A:[198,40,40]};a.autoTable({startY:g,head:[["#","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0623\u064A\u0627\u0645","\u0627\u0644\u0643\u0645\u064A\u0629","\u0627\u0644\u0645\u0646\u0635\u0631\u0641","\u0627\u0644\u0631\u0635\u064A\u062F"]],body:e.map((w,_)=>{const M=w.quantityAdded??w.quantity??0,x=w.remainingQuantity??w.quantity??0,N=Math.max(0,M-x);return[_+1,w.name||"",w.type||"",w.usage||w.notes||"\u2014",this.formatDate(w.purchaseDate),w.expiryDate?this.formatDate(w.expiryDate):"\u2014",{content:w.status||"\u0633\u0627\u0631\u064A",styles:{textColor:I[w.status]||[0,0,0]}},w.daysRemaining??"\u2014",M,N,x]}),styles:{font:"Amiri",fontSize:6.5,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},6:{halign:"center"},7:{halign:"center"},8:{halign:"center",cellWidth:10},9:{halign:"center",cellWidth:10},10:{halign:"center",cellWidth:10}},margin:{left:s,right:s},didDrawPage:function(w){const _=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(s,i-9,n-s,i-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${d}`,s,i-5),a.text(f,o,i-5,{align:"center"}),a.text(`${y} | \u0635\u0641\u062D\u0629 ${_}`,n-s,i-5,{align:"right"})}});const q=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save(q),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintMedicationsPDF(e)}},_fallbackPrintMedicationsPDF(e){const a=`<table><thead><tr>
            <th>\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</th>
            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0627\u0644\u0645\u0646\u0635\u0631\u0641</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th>
        </tr></thead><tbody>${e.map(i=>{const o=i.quantityAdded??i.quantity??0,l=i.remainingQuantity??i.quantity??0,r=Math.max(0,o-l);return`<tr>
                <td>${Utils.escapeHTML(i.name||"")}</td>
                <td>${Utils.escapeHTML(i.type||"")}</td>
                <td>${Utils.escapeHTML(i.usage||i.notes||"\u2014")}</td>
                <td>${this.formatDate(i.purchaseDate)}</td>
                <td>${i.expiryDate?this.formatDate(i.expiryDate):"\u2014"}</td>
                <td>${Utils.escapeHTML(i.status||"\u0633\u0627\u0631\u064A")}</td>
                <td>${i.daysRemaining??"\u2014"}</td>
                <td class="text-center">${o}</td>
                <td class="text-center">${r}</td>
                <td class="text-center">${l}</td>
            </tr>`}).join("")}</tbody></table>`,s=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}},async _createClinicPdfWithFont({orientation:e="portrait",format:t="a4",fontUrl:a,fontFamily:s}={}){const n=typeof Utils<"u"&&Utils.PdfExport?Utils.PdfExport.getJsPdfConstructor():window.jspdf?.jsPDF||window.jsPDF?.jsPDF||window.jsPDF||null;if(!n)return{success:!1};const i=[a,"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf","https://fonts.googleapis.com/css2?family=Amiri&display=swap"].filter(Boolean);try{if(!this._arabicFontBase64){let l=!1;for(const r of i)try{const c=await fetch(r,{cache:"force-cache"});if(!c.ok)continue;if(c.headers.get("content-type")?.includes("text/css")){const u=(await c.text()).match(/url\(([^)]+\.ttf)\)/);if(!u)continue;const d=await fetch(u[1],{cache:"force-cache"});if(!d.ok)continue;this._arabicFontBase64=await d.blob().then(m=>new Promise(f=>{const y=new FileReader;y.onload=()=>f(y.result.split(",")[1]),y.readAsDataURL(m)}))}else{const p=await c.blob();this._arabicFontBase64=await new Promise(u=>{const d=new FileReader;d.onload=()=>u(d.result.split(",")[1]),d.readAsDataURL(p)})}l=!0;break}catch{continue}if(!l)return{success:!1}}const o=new n(e,"mm",t);return o.addFileToVFS(s+".ttf",this._arabicFontBase64),o.addFont(s+".ttf",s,"normal"),o.setFont(s),{success:!0,doc:o}}catch(o){return Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 PDF:",o),{success:!1,error:o}}},renderSickLeaveTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]');if(!e)return;const t=this.state.filters.sickLeave||{},a=this.getFilteredSickLeaves(),s=this.getClinicDepartments(),n=a.map(o=>{const l=o.employeeName||o.personName||"",r=o.employeeDepartment||"\u2014",c=this.formatDate(o.startDate),p=this.formatDate(o.endDate),u=o.daysCount??this.calculateSickLeaveDays(o.startDate,o.endDate),d=o.treatingDoctor||"\u2014";return`
                <tr>
                    <td>${Utils.escapeHTML(l)}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${c}</td>
                    <td>${p}</td>
                    <td>${u}</td>
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
            `}).join(""),i=a.length?`
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
                            ${n}
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
                        ${s.map(o=>`
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
            ${i}
        `,this.applyModuleI18n(e),this.bindSickLeaveTabEvents(e),setTimeout(()=>{const o=e.querySelector(".clinic-table-wrapper");o&&this.setupTableScrollListeners(o)},100)},bindSickLeaveTabEvents(e){const t=e.querySelector("#sick-leave-search"),a=e.querySelector("#sick-leave-department"),s=e.querySelector("#sick-leave-date-from"),n=e.querySelector("#sick-leave-date-to"),i=e.querySelector("#sick-leave-add-btn"),o=e.querySelector("#sick-leave-export-pdf-btn"),l=e.querySelector("#sick-leave-export-excel-btn");t&&t.addEventListener("input",r=>{this.state.filters.sickLeave.search=r.target.value.trim(),this.renderSickLeaveTab()}),a&&a.addEventListener("change",r=>{this.state.filters.sickLeave.department=r.target.value,this.renderSickLeaveTab()}),s&&s.addEventListener("change",r=>{this.state.filters.sickLeave.dateFrom=r.target.value,this.renderSickLeaveTab()}),n&&n.addEventListener("change",r=>{this.state.filters.sickLeave.dateTo=r.target.value,this.renderSickLeaveTab()}),i?.addEventListener("click",()=>this.showSickLeaveForm()),o?.addEventListener("click",()=>this.exportSickLeaveToPDF()),l?.addEventListener("click",()=>this.exportSickLeaveToExcel()),e.querySelectorAll('[data-action="view-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.viewSickLeaveRecord(r.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.editSickLeave(r.getAttribute("data-id")))})},viewSickLeaveRecord(e){const t=this.getSickLeaves().find(p=>p.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}const a=t.employeeName||t.personName||"",s=t.employeeDepartment||"\u2014",n=this.formatDate(t.startDate),i=this.formatDate(t.endDate),o=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),l=t.treatingDoctor||"\u2014",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                            <p class="text-gray-800">${Utils.escapeHTML(a)}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</span>
                            <p class="text-gray-800">${Utils.escapeHTML(s)}</p>
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
                            <p class="text-gray-800">${n}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</span>
                            <p class="text-gray-800">${i}</p>
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

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&c()})},editSickLeave(e){const t=this.getSickLeaves().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629");return}this.showSickLeaveForm(t)},printSickLeaveRecord(e){const t=this.getSickLeaves().find(c=>c.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=t.employeeName||t.personName||"",s=t.employeeDepartment||"\u2014",n=t.treatingDoctor||"\u2014",i=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),o=`
            <table>
                <tr><th>\u0627\u0644\u0627\u0633\u0645</th><td>${Utils.escapeHTML(a)}</td></tr>
                <tr><th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th><td>${Utils.escapeHTML(s)}</td></tr>
                ${t.employeeCode?`<tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(t.employeeCode)}</td></tr>`:""}
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th><td>${this.formatDate(t.startDate)}</td></tr>
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th><td>${this.formatDate(t.endDate)}</td></tr>
                <tr><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th><td>${i}</td></tr>
                <tr><th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th><td>${Utils.escapeHTML(n)}</td></tr>
            </table>
            <div class="section-title">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</div>
            <div class="description">${Utils.escapeHTML(t.reason||"")}</div>
            ${t.medicalNotes?`
                <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</div>
                <div class="description">${Utils.escapeHTML(t.medicalNotes||"")}</div>
            `:""}
        `,l=`SICK-LEAVE-${t.id}`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,"\u0646\u0645\u0648\u0630\u062C \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",o,!1,!0,{},t.createdAt,t.updatedAt):`<html><body>${o}</body></html>`;try{const c=new Blob([r],{type:"text/html;charset=utf-8"}),p=URL.createObjectURL(c),u=window.open(p,"_blank");u?u.onload=()=>{setTimeout(()=>{u.print(),setTimeout(()=>URL.revokeObjectURL(p),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(c){Utils.safeError("\u0641\u0634\u0644 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",c),Notification?.error?.("\u062A\u0639\u0630\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},exportSickLeaveToExcel(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(i=>({\u0627\u0644\u0627\u0633\u0645:i.employeeName||i.personName||"",\u0627\u0644\u0642\u0633\u0645:i.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629":this.formatDate(i.startDate),"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629":this.formatDate(i.endDate),"\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645":i.daysCount??this.calculateSickLeaveDays(i.startDate,i.endDate),"\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C":i.treatingDoctor||"",\u0627\u0644\u0633\u0628\u0628:i.reason||"","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629":i.medicalNotes||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,s,"SickLeave");const n=`Clinic_SickLeave_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportSickLeaveToPDF(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${e.map(i=>`
            <tr>
                <td>${Utils.escapeHTML(i.employeeName||i.personName||"")}</td>
                <td>${Utils.escapeHTML(i.employeeDepartment||"")}</td>
                <td>${this.formatDate(i.startDate)}</td>
                <td>${this.formatDate(i.endDate)}</td>
                <td>${i.daysCount??this.calculateSickLeaveDays(i.startDate,i.endDate)}</td>
                <td>${Utils.escapeHTML(i.treatingDoctor||"")}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,s=`SICK-LEAVE-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},renderInjuriesTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]');if(!e)return;const t=this.state.filters.injuries||{},a=this.getInjuries(),s=this.getFilteredInjuries(),n=this.getClinicDepartments(),i=this.getInjuryTypeOptions(),o=this.getInjuryBodyPartOptions(),l=this.state.activeInjuryType==="contractors",r=a.filter(d=>String(d.personType||"employee").toLowerCase()==="employee").length,c=a.length-r,p=s.map(d=>{const m=d.contractorName||"\u2014",f=d.employeeCode||d.employeeNumber||"\u2014",y=d.employeeName||d.personName||d.contractorWorkerName||"\u2014",g=d.factoryName||d.factory||"\u2014",b=d.subLocationName||d.subLocation||"\u2014",S=d.department||d.employeeDepartment||"\u2014",T=this.formatDate(d.injuryDate,!0),D=d.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",$=Array.isArray(d.attachments)?d.attachments.length:0;return`
                <tr class="${this.getInjuryRowClass(D)}">
                    ${l?`<td>${Utils.escapeHTML(m)}</td>`:`<td>${Utils.escapeHTML(f)}</td>`}
                    <td>${Utils.escapeHTML(y)}</td>
                    <td>${Utils.escapeHTML(g)}</td>
                    <td>${Utils.escapeHTML(b)}</td>
                    <td>${Utils.escapeHTML(S)}</td>
                    <td>${T}</td>
                    <td>${Utils.escapeHTML(d.injuryType||"")}</td>
                    <td>${Utils.escapeHTML(d.injuryBodyPart||"")}</td>
                    <td>
                        <span class="badge ${this.getInjuryStatusBadgeClass(D)}">${Utils.escapeHTML(D)}</span>
                    </td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(d.createdBy))}</td>
                    <td class="text-center">${$}</td>
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
            `}).join(""),u=s.length?`
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
                            ${i.map(d=>`
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
                            ${n.map(d=>`
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
            ${u}
        `,this.applyModuleI18n(e),this.bindInjuriesTabEvents(e),setTimeout(()=>{const d=e.querySelector(".clinic-table-wrapper");d&&this.setupTableScrollListeners(d)},100)},bindInjuriesTabEvents(e){const t=e.querySelector("#injuries-search"),a=e.querySelector("#injuries-type-filter"),s=e.querySelector("#injuries-body-part-filter"),n=e.querySelector("#injuries-status"),i=e.querySelector("#injuries-department"),o=e.querySelector("#injuries-date-from"),l=e.querySelector("#injuries-date-to"),r=e.querySelector("#injuries-reset-filters"),c=e.querySelector("#injuries-types-settings-btn"),p=e.querySelector("#injuries-body-parts-settings-btn"),u=e.querySelector("#injuries-add-btn"),d=e.querySelector("#injuries-export-pdf-btn"),m=e.querySelector("#injuries-export-excel-btn");if(e.querySelectorAll(".injury-person-tab-btn").forEach(f=>{f.addEventListener("click",()=>{const y=f.getAttribute("data-tab")||"employees";this.state.activeInjuryType=y,this.renderInjuriesTab()})}),t){let f=!1;const y=(g,b=null)=>{this.state.filters.injuries.search=String(g||""),this._injurySearchDebounceTimer&&clearTimeout(this._injurySearchDebounceTimer),this._injurySearchDebounceTimer=setTimeout(()=>{this.renderInjuriesTab(),requestAnimationFrame(()=>{const S=document.getElementById("injuries-search");if(!S)return;S.focus();const T=typeof b=="number"?b:S.value.length;try{S.setSelectionRange(T,T)}catch{}})},120)};t.addEventListener("compositionstart",()=>{f=!0}),t.addEventListener("compositionend",g=>{f=!1,y(g.target.value,g.target.selectionStart)}),t.addEventListener("input",g=>{f||y(g.target.value,g.target.selectionStart)})}n&&n.addEventListener("change",f=>{this.state.filters.injuries.status=f.target.value,this.renderInjuriesTab()}),a&&a.addEventListener("change",f=>{this.state.filters.injuries.injuryType=f.target.value,this.renderInjuriesTab()}),s&&s.addEventListener("change",f=>{this.state.filters.injuries.injuryBodyPart=f.target.value,this.renderInjuriesTab()}),i&&i.addEventListener("change",f=>{this.state.filters.injuries.department=f.target.value,this.renderInjuriesTab()}),o&&o.addEventListener("change",f=>{this.state.filters.injuries.dateFrom=f.target.value,this.renderInjuriesTab()}),l&&l.addEventListener("change",f=>{this.state.filters.injuries.dateTo=f.target.value,this.renderInjuriesTab()}),u?.addEventListener("click",()=>this.showInjuryForm()),c?.addEventListener("click",()=>this.showInjuryTypesSettingsModal()),p?.addEventListener("click",()=>this.showInjuryBodyPartsSettingsModal()),r?.addEventListener("click",()=>{this.state.filters.injuries={search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},this.renderInjuriesTab()}),d?.addEventListener("click",()=>this.exportInjuriesToPDF()),m?.addEventListener("click",()=>this.exportInjuriesToExcel()),e.querySelectorAll('[data-action="view-injury"]').forEach(f=>{f.addEventListener("click",()=>this.viewInjuryRecord(f.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-injury"]').forEach(f=>{f.addEventListener("click",()=>this.editInjury(f.getAttribute("data-id")))})},analyzeClinicVisitsData(){const e=AppState.appData.clinicVisits||[],t=AppState.appData.sickLeave||[],a=AppState.appData.injuries||[],s=[...e.map(r=>({type:"\u0632\u064A\u0627\u0631\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.contractorName||r.externalName||"",jobTitle:r.employeePosition||r.position||"-",location:r.employeeLocation||r.workArea||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.diagnosis||"-",date:r.visitDate||r.createdAt})),...t.map(r=>({type:"\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:r.employeePosition||"-",location:"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.reason||"-",date:r.startDate||r.createdAt})),...a.map(r=>({type:"\u0625\u0635\u0627\u0628\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:"-",location:r.injuryLocation||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.injuryType||"-",date:r.injuryDate||r.createdAt}))],n={};s.forEach(r=>{const c=r.jobTitle;n[c]||(n[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),n[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&n[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&n[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&n[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&n[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&n[c].injuries++});const i={};s.forEach(r=>{const c=r.location;i[c]||(i[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),i[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&i[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&i[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&i[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&i[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&i[c].injuries++});const o={};s.forEach(r=>{const c=r.department;o[c]||(o[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),o[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&o[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&o[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&o[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&o[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&o[c].injuries++});const l={};return s.forEach(r=>{const c=r.diagnosis;l[c]||(l[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),l[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&l[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&l[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&l[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&l[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&l[c].injuries++}),{totalRecords:s.length,totalEmployees:s.filter(r=>r.personType==="\u0645\u0648\u0638\u0641").length,totalContractors:s.filter(r=>r.personType==="\u0645\u0642\u0627\u0648\u0644").length,totalVisits:e.length,totalSickLeaves:t.length,totalInjuries:a.length,byJobTitle:Object.entries(n).sort((r,c)=>c[1].total-r[1].total),byLocation:Object.entries(i).sort((r,c)=>c[1].total-r[1].total),byDepartment:Object.entries(o).sort((r,c)=>c[1].total-r[1].total),byDiagnosis:Object.entries(l).sort((r,c)=>c[1].total-r[1].total)}},renderAnalyticsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="analytics"]');if(!e)return;const t=this.analyzeClinicVisitsData(),a=(s,n,i)=>{if(!n||n.length===0)return`
                    <div class="content-card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="${i} ml-2"></i>${s}</h3>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</p>
                        </div>
                    </div>
                `;const o=n.map(([l,r])=>`
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
                        <h3 class="card-title"><i class="${i} ml-2"></i>${s}</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>${s}</th>
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
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.byJobTitle,"fas fa-briefcase")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644",t.byLocation,"fas fa-map-marker-alt")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",t.byDepartment,"fas fa-building")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635",t.byDiagnosis,"fas fa-stethoscope")}
            </div>
        `,this.applyModuleI18n(e),this.bindAnalyticsTabEvents(e)},bindAnalyticsTabEvents(e){const t=e.querySelector("#analytics-export-pdf-btn"),a=e.querySelector("#analytics-export-excel-btn");t?.addEventListener("click",()=>this.exportAnalyticsToPDF()),a?.addEventListener("click",()=>this.exportAnalyticsToExcel())},exportAnalyticsToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeClinicVisitsData(),t=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.totalRecords],["\u0645\u0648\u0638\u0641\u064A\u0646",e.totalEmployees],["\u0645\u0642\u0627\u0648\u0644\u064A\u0646",e.totalContractors],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.totalInjuries]],s=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(t,s,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0648\u0638\u0641\u064A\u0646","\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0632\u064A\u0627\u0631\u0627\u062A","\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629","\u0625\u0635\u0627\u0628\u0627\u062A"]];return o.forEach(([c,p])=>{r.push([c,p.total,p.employees,p.contractors,p.visits,p.sickLeaves,p.injuries])}),XLSX.utils.aoa_to_sheet(r)};XLSX.utils.book_append_sheet(t,n(e.byJobTitle,"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"),XLSX.utils.book_append_sheet(t,n(e.byLocation,"\u0627\u0644\u0645\u0643\u0627\u0646"),"\u062D\u0633\u0628 \u0627\u0644\u0645\u0643\u0627\u0646"),XLSX.utils.book_append_sheet(t,n(e.byDepartment,"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),XLSX.utils.book_append_sheet(t,n(e.byDiagnosis,"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"),"\u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635");const i=`Clinic_Analytics_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,i),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportAnalyticsToPDF(){const e=this.analyzeClinicVisitsData(),t=(i,o)=>{if(!o||o.length===0)return"";const l=o.map(([r,c])=>`
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
                <div class="section-title">${i}</div>
                <table>
                    <thead>
                        <tr>
                            <th>${i}</th>
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
            `},a=`
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
        `,s=`CLINIC-ANALYTICS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0631\u062F\u062F\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}},analyzeAllClinicData(){try{this.ensureData()}catch(u){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A ensureData:",u)}const e=AppState.appData?.clinicVisits||[],t=AppState.appData?.clinicMedications||[],a=AppState.appData?.sickLeave||[],s=AppState.appData?.injuries||[],n=AppState.appData?.clinicSupplyRequests||[],i={total:t.length,byStatus:{},byType:{},expired:0,expiringSoon:0,totalQuantity:0,totalDispensed:0,byLocation:{}};t.forEach(u=>{const d=u.status||"\u0633\u0627\u0631\u064A",m=u.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",f=u.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i.byStatus[d]=(i.byStatus[d]||0)+1,i.byType[m]=(i.byType[m]||0)+1,i.byLocation[f]=(i.byLocation[f]||0)+1,d==="\u0645\u0646\u062A\u0647\u064A"&&i.expired++,d==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"&&i.expiringSoon++;const y=u.remainingQuantity??u.quantity??0,g=u.quantityAdded??u.quantity??0;i.totalQuantity+=y,i.totalDispensed+=Math.max(0,g-y)});const o={total:e.length,byMonth:{},byReason:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0,\u062E\u0627\u0631\u062C\u064A:0},byDepartment:{},byLocation:{},averagePerMonth:0};e.forEach(u=>{try{const b=u.visitDate||u.createdAt;if(!b)return;const S=new Date(b);if(isNaN(S.getTime()))return;const T=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`;o.byMonth[T]=(o.byMonth[T]||0)+1}catch{}const d=u.reason||u.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byReason[d]=(o.byReason[d]||0)+1;const m=String(u.personType||"").toLowerCase().trim(),f=m==="contractor"||m==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";o.byPersonType[f]=(o.byPersonType[f]||0)+1;const y=u.employeeDepartment||u.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byDepartment[y]=(o.byDepartment[y]||0)+1;const g=u.employeeLocation||u.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byLocation[g]=(o.byLocation[g]||0)+1});const l=Object.keys(o.byMonth).length;o.averagePerMonth=l>0?(o.total/l).toFixed(1):0;const r={total:a.length,byMonth:{},byStatus:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},totalDays:0,averageDays:0};a.forEach(u=>{try{const y=u.startDate||u.createdAt;if(!y)return;const g=new Date(y);if(isNaN(g.getTime()))return;const b=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;r.byMonth[b]=(r.byMonth[b]||0)+1}catch{}const d=u.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629";r.byStatus[d]=(r.byStatus[d]||0)+1;const m=u.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";r.byPersonType[m]=(r.byPersonType[m]||0)+1;const f=u.employeeDepartment||u.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(r.byDepartment[f]=(r.byDepartment[f]||0)+1,u.startDate&&u.endDate){const y=new Date(u.startDate),g=new Date(u.endDate),b=Math.ceil((g-y)/(1e3*60*60*24))+1;r.totalDays+=b}}),r.averageDays=r.total>0?(r.totalDays/r.total).toFixed(1):0;const c={total:s.length,byMonth:{},byType:{},byLocation:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},byStatus:{}};s.forEach(u=>{try{const b=u.injuryDate||u.createdAt;if(!b)return;const S=new Date(b);if(isNaN(S.getTime()))return;const T=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`;c.byMonth[T]=(c.byMonth[T]||0)+1}catch{}const d=u.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byType[d]=(c.byType[d]||0)+1;const m=u.injuryLocation||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byLocation[m]=(c.byLocation[m]||0)+1;const f=u.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";c.byPersonType[f]=(c.byPersonType[f]||0)+1;const y=u.employeeDepartment||u.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byDepartment[y]=(c.byDepartment[y]||0)+1;const g=u.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629";c.byStatus[g]=(c.byStatus[g]||0)+1});const p={total:n.length,byStatus:{},byType:{},byPriority:{},byMonth:{},pending:0,approved:0,rejected:0,fulfilled:0};return n.forEach(u=>{try{const d=u.status||"pending";p.byStatus[d]=(p.byStatus[d]||0)+1,d==="pending"&&p.pending++,d==="approved"&&p.approved++,d==="rejected"&&p.rejected++,d==="fulfilled"&&p.fulfilled++;const m=u.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";p.byType[m]=(p.byType[m]||0)+1;const f=u.priority||"normal";p.byPriority[f]=(p.byPriority[f]||0)+1;const y=u.createdAt||u.requestDate;if(y){const g=new Date(y);if(!isNaN(g.getTime())){const b=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}`;p.byMonth[b]=(p.byMonth[b]||0)+1}}}catch{}}),{medications:i,visits:o,sickLeaves:r,injuries:c,supplyRequests:p,summary:{totalRecords:e.length+a.length+s.length,totalMedications:t.length,totalSupplyRequests:n.length,totalVisits:e.length,totalSickLeaves:a.length,totalInjuries:s.length}}},renderDataAnalysisTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="data-analysis"]');e&&(this.ensureChartJSLoaded().catch(()=>{}),e.innerHTML=`
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
                        ${["30","90","180","365","0"].map((t,a)=>{const s=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],n=(this._clinicPeriod||"0")===t;return`<button class="clinic-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${n?"#fff":"rgba(255,255,255,0.15)"};color:${n?"#0b2a55":"#fff"};">${s[a]}</button>`}).join("")}
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
        </div>`,this.applyModuleI18n(e),setTimeout(()=>{this.updateClinicAnalyticsDashboard(),this._clinicBindAnalyticsEvents()},80))},bindDataAnalysisTabEvents(e){},async updateClinicAnalyticsDashboard(){const e=document.getElementById("clinic-analytics-root");if(!e)return;try{this.ensureData()}catch{}const t=parseInt(this._clinicPeriod||"0",10),a=AppState.appData?.clinicVisits||[],s=AppState.appData?.clinicMedications||[],n=AppState.appData?.sickLeave||[],i=AppState.appData?.injuries||[],o=AppState.appData?.clinicSupplyRequests||[],l=t>0?(()=>{const A=new Date;return A.setDate(A.getDate()-t),A})():null,r=(A,H)=>l?A.filter(W=>{const Q=new Date(W[H]||W.createdAt||"");return!isNaN(Q.getTime())&&Q>=l}):A,c=r(a,"visitDate"),p=r(n,"startDate"),u=r(i,"injuryDate");this._clinicPopulateFilters(c);const d=this._clinicApplyFilters(c),m=d.length,f=document.getElementById("clinic-filter-count");f&&(f.textContent=`${m} \u0632\u064A\u0627\u0631\u0629`);const y=d.filter(A=>String(A.personType||"").toLowerCase()!=="contractor"),g=d.filter(A=>String(A.personType||"").toLowerCase()==="contractor"),b=new Date,S=d.filter(A=>{const H=new Date(A.visitDate||A.createdAt||"");return H.getFullYear()===b.getFullYear()&&H.getMonth()===b.getMonth()}).length,T=s.filter(A=>A.status==="\u0645\u0646\u062A\u0647\u064A").length,D=s.filter(A=>A.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,$=p.filter(A=>!A.status||A.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629").length,h=new Set(d.map(A=>{const H=new Date(A.visitDate||A.createdAt||"");return isNaN(H.getTime())?null:`${H.getFullYear()}-${H.getMonth()}`}).filter(Boolean)).size,v=h>0?(m/h).toFixed(1):0,L=this.analyzeDispensedMedications_(d,s),k=document.getElementById("clinic-kpi-strip");if(k){const A=(W,Q)=>Q>0?Math.round(W/Q*100):0,H=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",value:m,icon:"fas fa-hospital-user",color:"#1d4ed8",grad:"linear-gradient(135deg,#3b82f6,#1d4ed8)",sub:"\u0643\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",pct:100},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:y.length,icon:"fas fa-user-tie",color:"#1e40af",grad:"linear-gradient(135deg,#2563eb,#1e40af)",sub:`${A(y.length,m)}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A`,pct:A(y.length,m)},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:g.length,icon:"fas fa-hard-hat",color:"#ea580c",grad:"linear-gradient(135deg,#f59e0b,#ea580c)",sub:`${A(g.length,m)}% \u0645\u0646 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A`,pct:A(g.length,m)},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:p.length,icon:"fas fa-notes-medical",color:"#d97706",grad:"linear-gradient(135deg,#fbbf24,#d97706)",sub:"\u0637\u0644\u0628\u0627\u062A \u0645\u0633\u062C\u0644\u0629",pct:0},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:u.length,icon:"fas fa-user-injured",color:"#dc2626",grad:"linear-gradient(135deg,#ef4444,#b91c1c)",sub:"\u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",pct:0},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",value:T,icon:"fas fa-pills",color:"#dc2626",grad:"linear-gradient(135deg,#f87171,#b91c1c)",sub:"\u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646",pct:0},{label:"\u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:D,icon:"fas fa-exclamation",color:"#b45309",grad:"linear-gradient(135deg,#f59e0b,#b45309)",sub:"\u062E\u0644\u0627\u0644 90 \u064A\u0648\u0645",pct:0},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",value:$,icon:"fas fa-clock",color:"#4f46e5",grad:"linear-gradient(135deg,#6366f1,#4338ca)",sub:"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",pct:0},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:v,icon:"fas fa-calendar-check",color:"#4338ca",grad:"linear-gradient(135deg,#818cf8,#4338ca)",sub:h>0?`${h} \u0634\u0647\u0631`:"\u2014",pct:0}];k.innerHTML=H.map(W=>`
                <div class="clinic-stat">
                    <div class="clinic-stat__icon" style="background:${W.grad}"><i class="${W.icon}"></i></div>
                    <div class="clinic-stat__body">
                        <p class="clinic-stat__label">${W.label}</p>
                        <p class="clinic-stat__value" style="color:${W.color};">${W.value}</p>
                        ${W.pct>0?`<div class="clinic-stat__bar"><span style="width:${Math.min(W.pct,100)}%; background:${W.grad};"></span></div>`:""}
                    </div>
                    <span class="clinic-stat__pct">${W.sub}</span>
                </div>`).join("")}const C=document.getElementById("clinic-med-analysis-summary");C&&(C.textContent=L.totalDispensedQty>0?`${L.uniqueMedicines} \u062F\u0648\u0627\u0621 \u0645\u062E\u062A\u0644\u0641 \u2022 ${L.dispenseLines} \u0639\u0645\u0644\u064A\u0629 \u0635\u0631\u0641 \u2022 ${L.visitsWithMedications} \u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0627\u0621`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");const I=document.getElementById("clinic-med-kpi-strip");if(I){const A=Number(L.totalDispensedQty)||0,H=Q=>A>0?Math.round(Q/A*100):0,W=[{label:"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",value:L.totalDispensedQty,icon:"fas fa-prescription-bottle-alt",color:"#15803d",grad:"linear-gradient(135deg,#22c55e,#15803d)",sub:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",pct:100},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629",value:L.uniqueMedicines,icon:"fas fa-pills",color:"#1e40af",grad:"linear-gradient(135deg,#3b82f6,#1e40af)",sub:`${H(L.uniqueMedicines)}% \u0645\u0646 \u0627\u0644\u0645\u0646\u0635\u0631\u0641`,pct:H(L.uniqueMedicines)},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",value:L.visitsWithMedications,icon:"fas fa-capsules",color:"#2563eb",grad:"linear-gradient(135deg,#2563eb,#1d4ed8)",sub:"\u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631",pct:0},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u062F\u0648\u0646 \u062F\u0648\u0627\u0621",value:L.visitsWithoutMedications,icon:"fas fa-hospital",color:"#64748b",grad:"linear-gradient(135deg,#94a3b8,#64748b)",sub:"\u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631",pct:0},{label:"\u0639\u0645\u0644\u064A\u0627\u062A \u0635\u0631\u0641",value:L.dispenseLines,icon:"fas fa-hand-holding-medical",color:"#0284c7",grad:"linear-gradient(135deg,#0ea5e9,#0369a1)",sub:`${H(L.dispenseLines)}% \u0645\u0646 \u0627\u0644\u0645\u0646\u0635\u0631\u0641`,pct:H(L.dispenseLines)}];I.innerHTML=W.map(Q=>`
                <div class="clinic-stat clinic-stat--med">
                    <div class="clinic-stat__icon" style="background:${Q.grad}"><i class="${Q.icon}"></i></div>
                    <div class="clinic-stat__body">
                        <p class="clinic-stat__label">${Q.label}</p>
                        <p class="clinic-stat__value" style="color:${Q.color};">${Number(Q.value||0).toLocaleString("en-US")}</p>
                        ${Q.pct>0?`<div class="clinic-stat__bar"><span style="width:${Math.min(Q.pct,100)}%; background:${Q.grad};"></span></div>`:""}
                    </div>
                    <span class="clinic-stat__pct">${Q.sub}</span>
                </div>`).join("")}if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const w={};d.forEach(A=>{const H=String(A.personType||"").toLowerCase()==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";w[H]=(w[H]||0)+1}),this._cDoughnut("clinic-chart-ptype",Object.keys(w),Object.values(w),["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cTrend("clinic-chart-trend",a,"visitDate");const _=this._cGroupBy(d,A=>A.reason||A.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._cHBar("clinic-chart-reason",_.labels,_.data,"rgba(13,148,136,0.75)");const M=this._cGroupBy(d,A=>A.employeeDepartment||A.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-dept",M.labels,M.data,"rgba(99,102,241,0.75)");const x=d.filter(A=>{const H=String(A.contractorName||"").trim(),W=String(A.externalName||"").trim(),Q=String(A.personType||"").trim().toLowerCase();return H||W||Q==="contractor"||Q==="external"}),N=this._cGroupBy(x,A=>String(A.contractorName||A.externalName||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),F=document.getElementById("clinic-chart-contractor-count");F&&(F.textContent=x.length>0?`${x.length} \u0632\u064A\u0627\u0631\u0629 \u2022 ${N.labels.length} \u0645\u0642\u0627\u0648\u0644`:""),this._cHBar("clinic-chart-contractor",N.labels,N.data,"rgba(8,145,178,0.75)");const P=this._cGroupBy(d,A=>A.employeeLocation||A.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-loc",P.labels,P.data,"rgba(245,158,11,0.75)");const j=this._cGroupBy(p,A=>A.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),z={\u0645\u0639\u062A\u0645\u062F\u0629:"rgba(16,185,129,0.85)",\u0645\u0631\u0641\u0648\u0636\u0629:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-sl-status",j.labels,j.data,j.labels.map(A=>z[A]||"rgba(148,163,184,0.8)"));const U=this._cGroupBy(u,A=>A.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-inj-type",U.labels,U.data,"rgba(239,68,68,0.75)");const E=this._cGroupBy(s,A=>A.status||"\u0633\u0627\u0631\u064A"),O={\u0633\u0627\u0631\u064A:"rgba(16,185,129,0.85)",\u0645\u0646\u062A\u0647\u064A:"rgba(239,68,68,0.85)","\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-med-status",E.labels,E.data,E.labels.map(A=>O[A]||"rgba(148,163,184,0.8)")),this._cCompare("clinic-chart-compare",a,n,i);const R=L.topByQuantity.slice(0,10);this._cHBar("clinic-chart-med-top-qty",R.map(A=>A.name),R.map(A=>A.totalQty),"rgba(16,185,129,0.78)");const B=L.byMonth.labels,V=L.byMonth.data;if(B.length&&V.reduce((A,H)=>A+H,0)>0){const A=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");if(A){H&&(H.style.display="none"),A.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts["clinic-chart-med-monthly"]&&this._clinicCharts["clinic-chart-med-monthly"].destroy()}catch{}this._clinicCharts["clinic-chart-med-monthly"]=new Chart(A,{type:"line",data:{labels:B,datasets:[{label:"\u0643\u0645\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",data:V,borderColor:"rgba(5,150,105,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:4,tension:.35,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}}}}})}}else{const A=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");A&&(A.style.display="none"),H&&(H.style.display="flex")}this._cDoughnut("clinic-chart-med-ptype",["\u0645\u0648\u0638\u0641","\u0645\u0642\u0627\u0648\u0644"],[L.byPersonType.\u0645\u0648\u0638\u0641||0,L.byPersonType.\u0645\u0642\u0627\u0648\u0644||0],["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cHBar("clinic-chart-med-dept",L.byDepartment.labels,L.byDepartment.data,"rgba(99,102,241,0.75)");const G=document.getElementById("clinic-med-table-count"),Y=document.getElementById("clinic-med-top-tbody"),te=L.topByQuantity.slice(0,15);G&&(G.textContent=te.length?`${te.length} \u062F\u0648\u0627\u0621`:""),Y&&(Y.innerHTML=te.length===0?'<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>':te.map((A,H)=>{const W=A.stockRemaining===null?"\u2014":Number(A.stockRemaining).toLocaleString("en-US"),Q=A.stockRemaining!==null&&A.stockRemaining<=10?"#dc2626":"#0f766e",X=A.stockStatus==="\u0645\u0646\u062A\u0647\u064A"?"#dc2626":A.stockStatus==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#d97706":"#64748b",Z=H%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${Z};" onmouseover="this.style.background='#ecfdf5'" onmouseout="this.style.background='${Z}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${H+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#047857;">${Utils.escapeHTML(A.name)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;">${Number(A.totalQty).toLocaleString("en-US")}</td>
                        <td style="padding:9px 12px;text-align:center;">${A.dispenseCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${A.visitsCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${A.avgQty}</td>
                        <td style="padding:9px 12px;">${Utils.escapeHTML(A.type)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${Q};">${W}</td>
                        <td style="padding:9px 12px;color:${X};">${Utils.escapeHTML(A.stockStatus)}</td>
                    </tr>`}).join(""));const ee=document.getElementById("clinic-med-low-stock-alert"),se=document.getElementById("clinic-med-low-stock-list");ee&&se&&(L.lowStockHighDemand.length>0?(ee.style.display="block",se.innerHTML=L.lowStockHighDemand.map(A=>`<li><strong>${Utils.escapeHTML(A.name)}</strong>: \u0645\u0646\u0635\u0631\u0641 ${A.totalQty} \u2014 \u0645\u062E\u0632\u0648\u0646 ${A.stockRemaining??"\u2014"}</li>`).join("")):(ee.style.display="none",se.innerHTML=""));const J={};d.forEach(A=>{const H=A.contractorWorkerName||A.employeeName||A.externalName||A.personName||A.name||"",W=String(H).trim(),Q=String(A.contractorName||"").trim(),X=W||(Q?Q+" (\u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0639\u0627\u0645\u0644)":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");J[X]||(J[X]={count:0,dept:"",loc:""}),J[X].count++,J[X].dept||(J[X].dept=A.employeeDepartment||A.department||A.contractorName||A.contractorPosition||"\u2014"),J[X].loc||(J[X].loc=A.employeeLocation||A.workArea||A.factoryName||A.factory||"\u2014")});const ae=Object.entries(J).sort((A,H)=>H[1].count-A[1].count).slice(0,15),oe=document.getElementById("clinic-top-visitors-count"),re=document.getElementById("clinic-top-visitors-tbody");oe&&(oe.textContent=`${ae.length} \u0634\u062E\u0635`),re&&(re.innerHTML=ae.length===0?'<tr><td colspan="5" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u064A\u0627\u0631\u0627\u062A</td></tr>':ae.map(([A,H],W)=>{const Q=W%2===0?"#fff":"#fafafa",X=H.count>=5?"#dc2626":H.count>=3?"#f59e0b":"#2563eb";return`<tr style="border-bottom:1px solid #f8fafc;background:${Q};" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${Q}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${W+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${Utils.escapeHTML(A)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.dept)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.loc)}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="background:#eff6ff;color:${X};padding:3px 10px;border-radius:20px;font-weight:700;font-size:0.82rem;">${H.count} \u0632\u064A\u0627\u0631\u0629</span></td>
                    </tr>`}).join(""))},_clinicApplyFilters(e){const t=r=>{const c=document.getElementById(r);return c?c.value.trim():""},a=t("clinic-af-ptype"),s=t("clinic-af-dept"),n=t("clinic-af-loc"),i=t("clinic-af-reason"),o=[a,s,n,i].some(r=>r!==""),l=document.getElementById("clinic-filter-badge");return l&&(l.style.display=o?"inline":"none"),e.filter(r=>!(a&&(String(r.personType||"").toLowerCase()==="contractor"?"contractor":"employee")!==a||s&&String(r.employeeDepartment||r.department||"").trim()!==s||n&&String(r.employeeLocation||r.workArea||"").trim()!==n||i&&String(r.reason||r.diagnosis||"").trim()!==i))},_clinicPopulateFilters(e){const t=n=>[...new Set(e.map(n).filter(Boolean))].sort(),a=(n,i)=>{const o=document.getElementById(n);if(!o)return;const l=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(r=>`<option value="${r}"${r===l?" selected":""}>${r}</option>`).join("")},s=document.getElementById("clinic-af-ptype");if(s){const n=s.value;s.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="employee"${n==="employee"?" selected":""}>\u0645\u0648\u0638\u0641</option><option value="contractor"${n==="contractor"?" selected":""}>\u0645\u0642\u0627\u0648\u0644</option>`}a("clinic-af-dept",t(n=>String(n.employeeDepartment||n.department||"").trim())),a("clinic-af-loc",t(n=>String(n.employeeLocation||n.workArea||"").trim())),a("clinic-af-reason",t(n=>String(n.reason||n.diagnosis||"").trim()))},_cGroupBy(e,t,a=0){const s={};e.forEach(i=>{const o=t(i)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s[o]=(s[o]||0)+1});let n=Object.entries(s).sort((i,o)=>o[1]-i[1]);return a>0&&(n=n.slice(0,a)),{labels:n.map(i=>i[0]),data:n.map(i=>i[1])}},_cDoughnut(e,t,a,s){const n=document.getElementById(e),i=document.getElementById(e+"-empty");if(!n)return;if(!a.length||a.reduce((l,r)=>l+r,0)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}const o=a.reduce((l,r)=>l+r,0);this._clinicCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:a,backgroundColor:s,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${o>0?(l.parsed/o*100).toFixed(1):0}%)`}}}}})},_cHBar(e,t,a,s){const n=document.getElementById(e),i=document.getElementById(e+"-empty");if(n){if(!a.length||a.reduce((o,l)=>o+l,0)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:a,backgroundColor:s||"rgba(13,148,136,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${o.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:o=>String(t[o]).length>18?String(t[o]).slice(0,17)+"\u2026":t[o]}}}}})}},_cTrend(e,t,a){const s=document.getElementById(e),n=document.getElementById(e+"-empty");if(!s)return;const i=new Date,o=[],l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let c=11;c>=0;c--){const p=new Date(i.getFullYear(),i.getMonth()-c,1);o.push({y:p.getFullYear(),m:p.getMonth(),label:`${l[p.getMonth()]} ${p.getFullYear()}`})}const r=o.map(c=>t.filter(p=>{const u=new Date(p[a]||p.createdAt||"");return!isNaN(u.getTime())&&u.getFullYear()===c.y&&u.getMonth()===c.m}).length);if(r.reduce((c,p)=>c+p,0)===0){s.style.display="none",n&&(n.style.display="flex");return}n&&(n.style.display="none"),s.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(s,{type:"bar",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:r,backgroundColor:r.map(c=>c===Math.max(...r)?"rgba(13,148,136,0.9)":"rgba(13,148,136,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(99,102,241,0.9)",backgroundColor:"rgba(99,102,241,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#6366f1",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_cCompare(e,t,a,s){const n=document.getElementById(e),i=document.getElementById(e+"-empty");if(!n)return;const o=new Date,l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let f=11;f>=0;f--){const y=new Date(o.getFullYear(),o.getMonth()-f,1);r.push({y:y.getFullYear(),m:y.getMonth(),label:`${l[y.getMonth()]}`})}const c=(f,y)=>r.map(g=>f.filter(b=>{const S=new Date(b[y]||b.createdAt||"");return!isNaN(S.getTime())&&S.getFullYear()===g.y&&S.getMonth()===g.m}).length),p=c(t,"visitDate"),u=c(a,"startDate"),d=c(s,"injuryDate");if(((f,y,g)=>f.reduce((b,S,T)=>b+S+y[T]+g[T],0))(p,u,d)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(n,{type:"bar",data:{labels:r.map(f=>f.label),datasets:[{label:"\u0632\u064A\u0627\u0631\u0627\u062A",data:p,backgroundColor:"rgba(13,148,136,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",data:u,backgroundColor:"rgba(245,158,11,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u0635\u0627\u0628\u0627\u062A",data:d,backgroundColor:"rgba(239,68,68,0.75)",borderRadius:4,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_clinicBindAnalyticsEvents(){const e=document.getElementById("clinic-analytics-root");if(!e)return;e.querySelectorAll(".clinic-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._clinicPeriod=o.getAttribute("data-period"),e.querySelectorAll(".clinic-period-btn").forEach(l=>{const r=l===o;l.style.background=r?"#fff":"rgba(255,255,255,0.15)",l.style.color=r?"#134e4a":"#fff"}),this.updateClinicAnalyticsDashboard()})});const t=document.getElementById("clinic-analytics-refresh");t&&t.addEventListener("click",()=>this.updateClinicAnalyticsDashboard());const a=document.getElementById("clinic-export-pdf-btn");a&&a.addEventListener("click",()=>this._clinicExportPDF());const s=document.getElementById("clinic-toggle-filters-btn"),n=document.getElementById("clinic-filter-panel");s&&n&&s.addEventListener("click",()=>{const o=n.style.display!=="none";n.style.display=o?"none":"block",s.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const i=document.getElementById("clinic-filter-reset-btn");i&&i.addEventListener("click",()=>{["clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&(l.value="")}),this.updateClinicAnalyticsDashboard()}),["clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&l.addEventListener("change",()=>this.updateClinicAnalyticsDashboard())})},_prepareClinicAnalysisPdfHtmlContent(e){const t=`
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
        `;return typeof e!="string"?"":e.includes("</head>")?e.replace("</head>",t+"</head>"):t+e},async _clinicEnsureHtml2CanvasForPdf_(){return typeof html2canvas<"u"?!0:(await new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("html2canvas")),document.head.appendChild(a)}),typeof html2canvas<"u")},async _clinicExportPDF(){const e=document.getElementById("clinic-analytics-root");if(!e)return;const t=document.getElementById("clinic-export-pdf-btn"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await this._clinicEnsureHtml2CanvasForPdf_();const s=document.getElementById("clinic-filter-panel"),n=s&&s.style.display!=="none";n&&(s.style.display="none");const i=Math.min(3,Math.max(2.5,(window.devicePixelRatio||1)*2)),o=await html2canvas(e,{scale:i,useCORS:!0,backgroundColor:"#ffffff",scrollX:0,scrollY:-window.scrollY,logging:!1,width:e.scrollWidth,height:e.scrollHeight,windowWidth:e.scrollWidth,windowHeight:e.scrollHeight});n&&(s.style.display="");let l;try{l=o.toDataURL("image/png")}catch{l=o.toDataURL("image/jpeg",.96)}const r=typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),c=this._clinicPeriod==="month"?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":this._clinicPeriod==="quarter"?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":this._clinicPeriod==="year"?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u0643\u0644 \u0627\u0644\u0641\u062A\u0631\u0627\u062A",p=`
                <p class="clinic-analysis-pdf-meta">
                    \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: ${Utils.escapeHTML(c)} &nbsp;|&nbsp; ${Utils.escapeHTML(r)}
                </p>
                <img class="clinic-analysis-pdf-image" src="${l}" alt="Clinic Medical Analysis Dashboard">
            `,u=`CLINIC-MED-ANALYSIS-${new Date().toISOString().slice(0,10)}`,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(u,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",p,!1,!1,{source:"ClinicMedicalAnalysis",titleEn:"Clinic Medical Analysis Report",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl"><body>${p}</body></html>`,f=this._prepareClinicAnalysisPdfHtmlContent(m);if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"){const y=await FormHeader.generatePDF(f,`Clinic-Medical-Analysis-Report-${new Date().toISOString().slice(0,10)}.pdf`);y&&typeof Notification<"u"&&Notification.success?Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF..."):!y&&typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}else{const y=new Blob([f],{type:"text/html;charset=utf-8"}),g=URL.createObjectURL(y),b=window.open(g,"_blank");b?(b.onload=()=>{setTimeout(()=>{b.print(),setTimeout(()=>URL.revokeObjectURL(g),1e3)},600)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{t&&(t.disabled=!1,t.innerHTML=a)}},renderDataAnalysisCharts(){const e=this.analyzeAllClinicData();typeof Chart<"u"?this.renderChartsWithChartJS(e):this.renderChartsWithCSS(e)},renderChartsWithChartJS(e){const t=document.getElementById("medications-status-chart");if(t&&Object.keys(e.medications.byStatus).length>0){const n=Object.entries(e.medications.byStatus);new Chart(t,{type:"pie",data:{labels:n.map(([i])=>i),datasets:[{data:n.map(([,i])=>i),backgroundColor:["#10b981","#f59e0b","#ef4444","#3b82f6","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})}const a=document.getElementById("visits-month-chart");if(a&&Object.keys(e.visits.byMonth).length>0){const n=Object.entries(e.visits.byMonth).sort();new Chart(a,{type:"line",data:{labels:n.map(([i])=>i),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:n.map(([,i])=>i),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const s=document.getElementById("injuries-type-chart");if(s&&Object.keys(e.injuries.byType).length>0){const n=Object.entries(e.injuries.byType).sort((i,o)=>o[1]-i[1]).slice(0,10);new Chart(s,{type:"bar",data:{labels:n.map(([i])=>i),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",data:n.map(([,i])=>i),backgroundColor:"#ef4444"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}},renderChartsWithCSS(e){const t=document.getElementById("medications-status-chart-container");if(t&&Object.keys(e.medications.byStatus).length>0){const n=Object.entries(e.medications.byStatus),i=Math.max(...n.map(([,o])=>o),1);t.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-blue-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/i*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const a=document.getElementById("visits-month-chart-container");if(a&&Object.keys(e.visits.byMonth).length>0){const n=Object.entries(e.visits.byMonth).sort(),i=Math.max(...n.map(([,o])=>o),1);a.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-24">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-green-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/i*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const s=document.getElementById("injuries-type-chart-container");if(s&&Object.keys(e.injuries.byType).length>0){const n=Object.entries(e.injuries.byType).sort((o,l)=>l[1]-o[1]).slice(0,10),i=Math.max(...n.map(([,o])=>o),1);s.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-red-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/i*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}this.renderAllCSSCharts(e)},renderAllCSSCharts(e){[{id:"medications-type-chart",data:e.medications.byType,color:"#8b5cf6"},{id:"medications-location-chart",data:e.medications.byLocation,color:"#3b82f6"},{id:"visits-reason-chart",data:e.visits.byReason,color:"#10b981"},{id:"visits-department-chart",data:e.visits.byDepartment,color:"#3b82f6"},{id:"visits-location-chart",data:e.visits.byLocation,color:"#06b6d4"},{id:"sickleave-month-chart",data:e.sickLeaves.byMonth,color:"#f59e0b"},{id:"sickleave-status-chart",data:e.sickLeaves.byStatus,color:"#f59e0b"},{id:"sickleave-department-chart",data:e.sickLeaves.byDepartment,color:"#f59e0b"},{id:"injuries-month-chart",data:e.injuries.byMonth,color:"#ef4444"},{id:"injuries-location-chart",data:e.injuries.byLocation,color:"#ef4444"},{id:"injuries-department-chart",data:e.injuries.byDepartment,color:"#ef4444"},{id:"injuries-status-chart",data:e.injuries.byStatus,color:"#ef4444"},{id:"supply-status-chart",data:e.supplyRequests.byStatus,color:"#06b6d4"},{id:"supply-type-chart",data:e.supplyRequests.byType,color:"#06b6d4"},{id:"supply-priority-chart",data:e.supplyRequests.byPriority,color:"#06b6d4"},{id:"supply-month-chart",data:e.supplyRequests.byMonth,color:"#06b6d4"}].forEach(({id:a,data:s,color:n})=>{const i=document.getElementById(`${a}-container`);if(i&&s&&Object.keys(s).length>0){const o=Object.entries(s).sort((r,c)=>c[1]-r[1]),l=Math.max(...o.map(([,r])=>r),1);i.innerHTML=`
                    <div class="space-y-2 mt-4">
                        ${o.slice(0,10).map(([r,c])=>`
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 w-32 truncate">${Utils.escapeHTML(r)}</span>
                                <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                    <div class="${n==="#8b5cf6"?"bg-purple":n==="#10b981"?"bg-green":n==="#f59e0b"?"bg-yellow":n==="#ef4444"?"bg-red":"bg-blue"}-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${c/l*100}%">
                                        <span class="text-xs font-semibold text-white">${c}</span>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `}})},refreshDataAnalysisTab(){this.state.activeTab==="data-analysis"&&this.renderDataAnalysisTab()},exportDataAnalysisToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeAllClinicData(),t=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.summary.totalRecords],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.summary.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.summary.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.summary.totalInjuries],["\u0627\u0644\u0623\u062F\u0648\u064A\u0629",e.summary.totalMedications],["\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A",e.summary.totalSupplyRequests]],s=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(t,s,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0639\u062F\u062F"]];return Object.entries(o).sort((c,p)=>p[1]-c[1]).forEach(([c,p])=>{r.push([c,p])}),XLSX.utils.aoa_to_sheet(r)};Object.keys(e.medications.byStatus).length>0&&XLSX.utils.book_append_sheet(t,n(e.medications.byStatus,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0623\u062F\u0648\u064A\u0629-\u062D\u0627\u0644\u0629"),Object.keys(e.medications.byType).length>0&&XLSX.utils.book_append_sheet(t,n(e.medications.byType,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0623\u062F\u0648\u064A\u0629-\u0646\u0648\u0639"),Object.keys(e.visits.byMonth).length>0&&XLSX.utils.book_append_sheet(t,n(e.visits.byMonth,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.visits.byDepartment).length>0&&XLSX.utils.book_append_sheet(t,n(e.visits.byDepartment,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0625\u062F\u0627\u0631\u0629"),Object.keys(e.sickLeaves.byMonth).length>0&&XLSX.utils.book_append_sheet(t,n(e.sickLeaves.byMonth,"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0625\u062C\u0627\u0632\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.injuries.byType).length>0&&XLSX.utils.book_append_sheet(t,n(e.injuries.byType,"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0625\u0635\u0627\u0628\u0627\u062A-\u0646\u0648\u0639"),Object.keys(e.supplyRequests.byStatus).length>0&&XLSX.utils.book_append_sheet(t,n(e.supplyRequests.byStatus,"\u0627\u0644\u0637\u0644\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0637\u0644\u0628\u0627\u062A-\u062D\u0627\u0644\u0629");const i=`Clinic_Data_Analysis_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,i),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportDataAnalysisToPDF(){const e=this.analyzeAllClinicData(),t=(i,o)=>{if(!o||Object.keys(o).length===0)return"";const l=Object.entries(o).sort((r,c)=>c[1]-r[1]).map(([r,c])=>`
                    <tr>
                        <td>${Utils.escapeHTML(r)}</td>
                        <td class="text-center">${c}</td>
                    </tr>
                `).join("");return`
                <div class="section-title">${i}</div>
                <table>
                    <thead>
                        <tr>
                            <th>${i}</th>
                            <th class="text-center">\u0627\u0644\u0639\u062F\u062F</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${l}
                    </tbody>
                </table>
            `},a=`
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
        `,s=`CLINIC-DATA-ANALYSIS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}},scheduleVisitsTabRender(e=!1,t=0){this._visitsRenderTimer&&(clearTimeout(this._visitsRenderTimer),this._visitsRenderTimer=null);const a=()=>{this._visitsRenderTimer=null,requestAnimationFrame(()=>{this.renderVisitsTab(e)})};this._visitsRenderTimer=setTimeout(a,Math.max(0,t))},scheduleAttendanceTabRender(e=0){this._attendanceRenderTimer&&(clearTimeout(this._attendanceRenderTimer),this._attendanceRenderTimer=null);const t=()=>{this._attendanceRenderTimer=null,requestAnimationFrame(()=>{this.renderAttendanceTab()})};this._attendanceRenderTimer=setTimeout(t,Math.max(0,e))},scheduleMedicationsTabRender(e=0){this._medicationsRenderTimer&&(clearTimeout(this._medicationsRenderTimer),this._medicationsRenderTimer=null);const t=()=>{this._medicationsRenderTimer=null,requestAnimationFrame(()=>{this.renderMedicationsTab()})};this._medicationsRenderTimer=setTimeout(t,Math.max(0,e))},async renderVisitsTab(e=!1){try{const t=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}this.ensureData(),this.ensureFilterDefaults();const a=this.shouldFetchClinicVisitsFromBackend({forceRefresh:e});this.renderVisitsTabContent(t),typeof StableLoader<"u"&&StableLoader.markPaint("clinic","visits",{count:(AppState.appData.clinicVisits||[]).length}),a&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&(typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("clinic"),this.loadVisitsDataFromBackend().then(()=>{const s=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');s&&this.state&&this.state.activeTab==="visits"&&(this.ensureData(),this.renderVisitsTabContent(s)),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 (\u0628\u062F\u0648\u0646 \u062D\u062C\u0628 \u0627\u0644\u0648\u0627\u062C\u0647\u0629)")}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",s&&s.message)}).finally(()=>{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("clinic")}))}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",t);const a=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');a&&(a.innerHTML=`
                    <div class="p-4 text-center">
                        <div class="text-red-600 mb-2">
                            <i class="fas fa-exclamation-triangle"></i>
                            \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F
                        </div>
                        <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab(true)">
                            <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                `)}},mergeClinicVisitsWithLocalOnly(e,t){const a=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[];if(a.length===0&&s.length>0)return s.slice();const n=new Set;a.forEach(l=>{l&&l.id!=null&&String(l.id).trim()!==""&&n.add(String(l.id))});const i=[];if(s.forEach(l=>{if(!l||l.id==null||String(l.id).trim()==="")return;const r=String(l.id);if(!n.has(r)&&!a.some(p=>{if(p.personType!==l.personType||p.visitDate!==l.visitDate)return!1;if(p.personType==="employee"){const u=String(p.employeeCode||p.employeeNumber||"").trim(),d=String(l.employeeCode||l.employeeNumber||"").trim();if(u&&d&&u===d)return!0;const m=Clinic.normalizeArabicText(p.employeeName),f=Clinic.normalizeArabicText(l.employeeName);return!!m&&m===f}else{const u=Clinic.normalizeArabicText(p.contractorName||p.externalName),d=Clinic.normalizeArabicText(l.contractorName||l.externalName),m=Clinic.normalizeArabicText(p.contractorWorkerName),f=Clinic.normalizeArabicText(l.contractorWorkerName);return u===d&&m===f}})){const p=new Date(l.createdAt||l.visitDate).getTime(),u=new Date().getTime();(!isNaN(p)&&u-p<72e5||isNaN(p))&&(n.add(r),i.push(l))}}),i.length===0)return a.slice();AppState.debugMode&&i.length>0&&Utils.safeLog(`\u{1F4DD} [CLINIC] \u062F\u0645\u062C ${i.length} \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 (\u0642\u062F \u064A\u0643\u0648\u0646 \u0643\u0627\u0634 \u0642\u062F\u064A\u0645)`);const o=a.concat(i);return o.sort((l,r)=>{const c=new Date(l.visitDate||l.createdAt||0).getTime();return new Date(r.visitDate||r.createdAt||0).getTime()-c}),o},assertClinicVisitRpcResult(e){if(!e||e.success!==!0){const t=e&&e.message?e.message:"\u0644\u0645 \u064A\u064F\u0624\u0643\u062F \u0627\u0644\u062E\u0627\u062F\u0645 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629";throw new Error(t)}},applyClinicVisitIdFromServer(e,t){if(!e||!t||!t.visitId)return;const a=String(t.visitId).trim();if(!a||String(e.id)===a)return;const s=e.id;e.id=a;const n=AppState.appData.clinicVisits;if(!Array.isArray(n))return;const i=n.findIndex(o=>o&&o.id===s);i!==-1&&(n[i]={...n[i],id:a})},shouldFetchClinicVisitsFromBackend(e={}){if(e&&e.forceRefresh===!0||typeof AppState>"u"||!AppState||!AppState.appData)return!0;if(this._visitsBackendFetchOk===!0)return!1;const t=AppState.appData.clinicVisits;if(Array.isArray(t)&&t.length>0){const a=localStorage.getItem("clinic_last_sync");if(a){const s=Date.now()-parseInt(a,10),n=600*1e3;if(!isNaN(s)&&s<n)return!1}}return!0},async loadVisitsDataFromBackend(){if(this._clinicVisitsLoadPromise)return this._clinicVisitsLoadPromise;const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits.slice():[];return this._clinicVisitsLoadPromise=(async()=>{try{AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 Backend...");const t=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllClinicVisits",data:{__timeoutMs:12e4}}),12e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F");if(t&&t.success&&Array.isArray(t.data)){const a=t.data.map(o=>{if(!o||typeof o!="object")return o;o.personType||(o.contractorName||o.contractorWorkerName||o.externalName?o.personType="contractor":o.personType="employee");let l=[];if(o.medications&&(l=this.normalizeVisitMedications(o.medications),AppState.debugMode&&l.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${l.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)),(!l||l.length===0)&&o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);r&&r.length>0&&(l=r,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,r.length,"\u062F\u0648\u0627\u0621"))}if(o.medications=l&&l.length>0?l:[],o.visitDate)try{if(o.visitDate instanceof Date)isNaN(o.visitDate.getTime())?o.visitDate=null:o.visitDate=o.visitDate.toISOString();else{const r=String(o.visitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 visitDate: ${r}`),o.visitDate=null):o.visitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 visitDate:",r),o.visitDate=null}if(o.exitDate)try{if(o.exitDate instanceof Date)isNaN(o.exitDate.getTime())?o.exitDate=null:o.exitDate=o.exitDate.toISOString();else{const r=String(o.exitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 exitDate: ${r}`),o.exitDate=null):o.exitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 exitDate:",r),o.exitDate=null}if(o.createdBy){if(typeof o.createdBy=="string"){const r=o.createdBy.trim();if(r&&r!==""&&r!=="\u0627\u0644\u0646\u0638\u0627\u0645")o.createdBy=r;else if(r==="\u0627\u0644\u0646\u0638\u0627\u0645"){const c=(o.email||"").toString().trim(),p=(o.userId||"").toString().trim();if(c||p){const d=(AppState.appData.users||[]).find(m=>{const f=(m.email||"").toString().toLowerCase().trim(),y=(m.id||"").toString().trim();return c&&f===c.toLowerCase().trim()||p&&y===p});if(d){const m=(d.name||d.displayName||"").toString().trim();m&&m!=="\u0627\u0644\u0646\u0638\u0627\u0645"&&m!==""?(o.createdBy=m,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 "\u0627\u0644\u0646\u0638\u0627\u0645" \u0628\u0640 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}: ${m}`)):o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy=null}else if(typeof o.createdBy=="object"){const c=(o.createdBy.name||""||"\u0645\u0633\u062A\u062E\u062F\u0645").trim();o.createdBy=c}}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645";if(o.updatedBy){if(typeof o.updatedBy=="string")o.updatedBy=o.updatedBy.trim()||null;else if(typeof o.updatedBy=="object"){const r=o.updatedBy.name||"";o.updatedBy=(r||"\u0645\u0633\u062A\u062E\u062F\u0645").trim()}}else o.updatedBy="\u0645\u0633\u062A\u062E\u062F\u0645";return o.medications.length===0&&o.medicationsDispensedQty&&o.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${o.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. medicationsDispensed:`,o.medicationsDispensed),o});AppState.appData.clinicVisits=this.mergeClinicVisitsWithLocalOnly(a,e),AppState.appData.clinicContractorVisits=AppState.appData.clinicVisits.filter(o=>o&&o.personType==="contractor"),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),localStorage.setItem("clinic_last_sync",Date.now().toString()),this._visitsBackendFetchOk=!0;const s=AppState.appData.clinicVisits.filter(o=>{const l=this.normalizeVisitMedications(o.medications);if(l&&l.length>0)return!0;if(o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);return r&&r.length>0}return!1}),n=AppState.appData.clinicVisits,i=n.reduce((o,l)=>{const r=this.normalizeVisitMedications(l.medications);if(r&&r.length>0)return o+r.length;if(l.medicationsDispensed){const c=this.normalizeVisitMedications(l.medicationsDispensed);if(c&&c.length>0)return o+c.length}return o},0);AppState.debugMode&&(Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.length} \u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0628\u0639\u062F \u0627\u0644\u062F\u0645\u062C \u0645\u0639 \u0627\u0644\u0645\u062D\u0644\u064A: ${n.length}`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="employee"||!o.personType).length} \u0645\u0648\u0638\u0641`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644`),Utils.safeLog(`   - ${s.length} \u0632\u064A\u0627\u0631\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629`),Utils.safeLog(`   - \u0625\u062C\u0645\u0627\u0644\u064A ${i} \u062F\u0648\u0627\u0621 \u0645\u0646\u0635\u0631\u0641`))}}catch(t){throw AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t}})().finally(()=>{this._clinicVisitsLoadPromise=null}),this._clinicVisitsLoadPromise},refreshClinicVisitsFromServerAfterSave(){AppState.debugMode&&Utils.safeLog("\u{1F504} [CLINIC] \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638..."),this._clinicVisitsLoadPromise=null,this._visitsBackendFetchOk=!1,this.loadVisitsDataFromBackend().then(()=>{try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues(),document.dispatchEvent(new CustomEvent("clinic-data-refreshed"))}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(this.state&&(this.state.activeTab==="visits"||this.state.activeTab==="dashboard")){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="'+this.state.activeTab+'"]');if(e)try{this.ensureData(),this.state.activeTab==="visits"?this.renderVisitsTabContent(e):this.renderDashboardTab()}catch{}}}).catch(e=>{Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",e)})},renderVisitsTabContent(e){try{if(!e){Utils.safeWarn("\u26A0\uFE0F panel \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A renderVisitsTabContent");return}if(typeof AppState>"u"||!AppState.appData){Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A renderVisitsTabContent"),e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';return}let t,a;try{const h=this.getTranslations();t=h.t,a=h.isRTL}catch(h){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u062A\u0631\u062C\u0645\u0627\u062A:",h),t=v=>v,a=!0}const s=this.state&&this.state.activeVisitType?this.state.activeVisitType:"employees",n=s==="contractors",i=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},o=(i.search||"").trim(),l=o.toLowerCase(),r=(i.factory||"").trim(),c=(i.position||"").trim(),p=(i.workplace||"").trim();this.ensureData();const u=(AppState.appData.clinicVisits||[]).slice();u.sort((h,v)=>{const L=new Date(h.visitDate||h.createdAt||0).getTime();return new Date(v.visitDate||v.createdAt||0).getTime()-L});const d=u.filter(h=>{if(!h||typeof h!="object")return!1;const v=String(h.personType||"").toLowerCase().trim();return v==="employee"||v===""||!v&&!h.contractorName&&!h.externalName}),m=u.filter(h=>{if(!h||typeof h!="object")return!1;const v=String(h.personType||"").toLowerCase().trim();return v==="contractor"||v==="external"||h.contractorName||h.externalName}),f=s==="employees"?d:m,y=f.filter(h=>{if(r)try{const v=this.getVisitFactoryDisplayName(h);if(String(v||"").trim()!==r)return!1}catch{return!1}if(c){const v=n?h.contractorPosition||h.employeePosition||"":h.employeePosition||"";if(String(v||"").trim()!==c)return!1}if(p){const v=n?h.workArea||h.employeeLocation||"":h.employeeLocation||h.workArea||"";if(String(v||"").trim()!==p)return!1}if(l){const v=String(n?h.contractorName||h.employeeName||h.externalName||"":h.employeeCode||h.employeeNumber||""),L=String(n?h.contractorWorkerName||"":h.employeeName||""),k=String(n?h.contractorPosition||h.employeePosition||"":h.employeePosition||"");let C="-";try{C=this.getVisitFactoryDisplayName(h)}catch{C=h.factoryName||h.factory||"-"}const I=String(n?h.workArea||h.employeeLocation||"":h.employeeLocation||h.workArea||"");let q="-",w="";try{if(h.visitDate){let j=h.visitDate;j instanceof Date?j=j.toISOString():typeof j=="string"&&!j.includes("T")&&j.match(/^\d{4}-\d{2}-\d{2}$/)&&(j=j+"T00:00:00Z"),q=Utils.formatDateTime?Utils.formatDateTime(j):String(j)}if(h.exitDate){let j=h.exitDate;j instanceof Date?j=j.toISOString():typeof j=="string"&&!j.includes("T")&&j.match(/^\d{4}-\d{2}-\d{2}$/)&&(j=j+"T00:00:00Z"),w=Utils.formatDateTime?Utils.formatDateTime(j):String(j)}}catch{q=h.visitDate?String(h.visitDate):"-",w=h.exitDate?String(h.exitDate):""}const _=String(h.reason||""),M=String(h.diagnosis||"");let x=[];if(h.medications)try{x=this.normalizeVisitMedications(h.medications)}catch{x=[]}const N=x&&x.length>0?x.map(j=>{try{let z="";return j&&j.medicationName?z=typeof j.medicationName=="string"?j.medicationName:j.medicationName.name||String(j.medicationName)||"":j&&j.name&&(z=typeof j.name=="string"?j.name:j.name.name||String(j.name)||""),z}catch{return""}}).filter(Boolean).join(" "):"";let F="";try{h.createdBy&&(typeof h.createdBy=="object"?F=String(h.createdBy.name||"\u0645\u0633\u062A\u062E\u062F\u0645"):F=String(h.createdBy||""))}catch{F=""}if(![v,L,k,C,I,q,w,_,M,N,F].join(" ").toLowerCase().includes(l))return!1}return!0}),g=h=>{const v=n?h.contractorName||h.employeeName||h.externalName||"-":h.employeeCode||h.employeeNumber||"-",L=n?h.contractorWorkerName||"-":h.employeeName||"-",k=n?h.contractorPosition||h.employeePosition||"-":h.employeePosition||"-";let C="-";try{C=this.getVisitFactoryDisplayName(h)}catch{C=h.factoryName||h.factory||"-"}const I=n?h.workArea||h.employeeLocation||"-":h.employeeLocation||h.workArea||"-";let q="-",w=`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`;try{if(h.visitDate){let U=h.visitDate;U instanceof Date?U=U.toISOString():typeof U=="string"&&!U.includes("T")&&U.match(/^\d{4}-\d{2}-\d{2}$/)&&(U=U+"T00:00:00Z"),q=Utils.formatDateTime?Utils.formatDateTime(U):String(U)}if(h.exitDate){let U=h.exitDate;U instanceof Date?U=U.toISOString():typeof U=="string"&&!U.includes("T")&&U.match(/^\d{4}-\d{2}-\d{2}$/)&&(U=U+"T00:00:00Z"),w=Utils.formatDateTime?Utils.formatDateTime(U):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}}catch(U){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:",U),q=h.visitDate?String(h.visitDate):"-",w=h.exitDate?String(h.exitDate):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}let _="-";try{_=this.calculateTotalTime(h.visitDate,h.exitDate)}catch{_="-"}const M=h.reason||"",x=h.diagnosis||"";let N=[];if(h.medications)try{N=this.normalizeVisitMedications(h.medications),AppState.debugMode&&N.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${N.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch(U){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications:",U),N=[]}if((!N||N.length===0)&&h.medicationsDispensed)try{const U=this.normalizeVisitMedications(h.medicationsDispensed);U&&U.length>0&&(N=U,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0639\u0631\u0636 \u0644\u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,N.length,"\u062F\u0648\u0627\u0621"))}catch(U){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications \u0645\u0646 medicationsDispensed:",U)}(!N||N.length===0)&&h.medicationsDispensedQty&&h.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${h.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629`);const F=N&&N.length>0?N.map(U=>{try{if(!U||typeof U!="object")return null;let E="";if(U.medicationName?E=typeof U.medicationName=="string"?U.medicationName.trim():(U.medicationName.name||String(U.medicationName)||"").trim():U.name&&(E=typeof U.name=="string"?U.name.trim():(U.name.name||String(U.name)||"").trim()),!E)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645:",U),null;const O=parseInt(U.quantity,10)||1;return`${Utils.escapeHTML(E)} (${O})`}catch(E){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062F\u0648\u0627\u0621:",E,U),null}}).filter(Boolean).join(a?"\u060C ":", "):"-",P=N&&N.length>0?N.reduce((U,E)=>{try{const O=parseInt(E.quantity,10)||0;return U+O}catch{return U}},0):0,j=Utils.escapeHTML(this.getUserDisplayName(h.createdBy)),z=a?"right":"left";return`
                <tr>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${z};">${Utils.escapeHTML(v)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${z};">
                        <div class="font-medium text-gray-900">${Utils.escapeHTML(L)}</div>
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${z};">${Utils.escapeHTML(k)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${z};">${Utils.escapeHTML(C)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${z};">${Utils.escapeHTML(I)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${z};">${Utils.escapeHTML(q)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${z};">${w}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${z};">${_}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${z};">${Utils.escapeHTML(M)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${z};">${Utils.escapeHTML(x)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px; text-align: ${z};"><div style="overflow-wrap: break-word;">${F}</div></td>
                    <td class="text-center font-semibold" style="word-wrap: break-word; white-space: normal;">${P}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${z};">${j}</td>
                    <td class="text-center" style="min-width: 150px;">
                        <div class="flex items-center justify-center gap-2 flex-wrap">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(h.id||"")}" title="${t("btn.view")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-visit" data-id="${Utils.escapeHTML(h.id||"")}" title="${t("btn.edit")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `},b=y.length?`
                <div class="table-wrapper clinic-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh;">
                    <table class="data-table table-header-green" style="width: 100%; min-width: 100%; table-layout: auto; direction: ${a?"rtl":"ltr"};">
                        <thead>
                            <tr>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${t(n?"table.contractorName":"table.employeeCode")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${t("table.name")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${t("table.jobTitle")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${t("table.factory")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${t("table.workplace")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${t("table.entryTime")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${t("table.exitTime")}</th>
                                <th style="min-width: 100px; text-align: ${a?"right":"left"};">${t("table.totalTime")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${a?"right":"left"};">${t("table.reason")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${a?"right":"left"};">${t("table.diagnosis")}</th>
                                <th style="min-width: 200px; word-wrap: break-word; text-align: ${a?"right":"left"};">${t("table.medications")}</th>
                                <th style="min-width: 100px; text-align: center;">${t("table.quantity")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629</th>
                                <th class="text-center" style="min-width: 150px;">${t("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody id="clinic-visits-tbody"></tbody>
                    </table>
                </div>
            `:this.renderEmptyState(t(l?"empty.noResults":s==="employees"?"empty.noEmployeeVisits":"empty.noContractorVisits")),S=a?"ml-2":"mr-2",T=a?"mr-2":"ml-2",D=a?"ml-1":"mr-1",$=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4" style="direction: ${a?"rtl":"ltr"};">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold" style="text-align: ${a?"right":"left"};">${t("tab.visits")}</h3>
                </div>
                <div class="flex gap-2">
                    <button type="button" id="visits-add-btn" class="btn-primary">
                        <i class="fas fa-plus ${S}"></i>
                        ${t("btn.registerVisit")}
                    </button>
                    <button type="button" id="visits-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ${S}"></i>
                        ${t("btn.refresh")}
                    </button>
                    ${typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()?`
                    <button type="button" onclick="const b=this;b.disabled=true;b.innerHTML='\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0631\u062D\u064A\u0644...';GoogleIntegration.sendRequest({action:'migrateContractorVisits'}).then(r=>{alert(r.message);location.reload()}).catch(e=>{alert('\u062E\u0637\u0623:'+e);b.disabled=false;b.innerHTML='\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646'})" class="btn-primary" style="background-color: #d97706; color: white;">
                        <i class="fas fa-broom ${S}"></i>
                        \u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </button>
                    `:""}
                    <button type="button" id="visits-export-excel-btn" class="btn-success">
                        <i class="fas fa-file-excel ${S}"></i>
                        ${t("btn.exportExcel")}
                    </button>
                    <button type="button" id="visits-export-pdf-btn" class="btn-secondary">
                        <i class="fas fa-file-pdf ${S}"></i>
                        ${t("btn.exportPDF")}
                    </button>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
            <div class="mb-4" style="direction: ${a?"rtl":"ltr"};">
                <div class="module-tabs-wrapper">
                    <div class="module-tabs-container">
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${s==="employees"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="employees">
                            <i class="fas fa-user-tie ${S}"></i>
                            ${t("tab.employees")}
                            <span class="badge ${s==="employees"?"badge-primary":"badge-secondary"} ${T}">${d.length}</span>
                        </button>
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${s==="contractors"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="contractors">
                            <i class="fas fa-hard-hat ${S}"></i>
                            ${t("tab.contractors")}
                            <span class="badge ${s==="contractors"?"badge-primary":"badge-secondary"} ${T}">${m.length}</span>
                        </button>
                        </div>
                </div>
            </div>
            
            <!-- \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0627\u062D\u062A\u0631\u0627\u0641\u064A (\u0645\u0634\u0627\u0628\u0647 \u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A) -->
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 0 -20px; width: calc(100% + 40px); direction: ${a?"rtl":"ltr"};">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <!-- \u062D\u0642\u0644 \u0627\u0644\u0628\u062D\u062B -->
                    <div class="filter-field" style="min-width: 180px;">
                        <label for="visits-search" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-search ${D}"></i>${t("filter.search")}
                        </label>
                        <input type="text" id="visits-search" class="filter-input" placeholder="${t("filter.searchPlaceholder")}" value="${Utils.escapeHTML(o)}" style="width: 100%; min-width: 160px; text-align: ${a?"right":"left"}; direction: ${a?"rtl":"ltr"};">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-factory" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-industry ${D}"></i>${t("filter.factory")}
                            ${r?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${y.length}</span>`:""}
                        </label>
                        <select id="visits-filter-factory" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-position" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-briefcase ${D}"></i>${t("filter.jobTitle")}
                            ${c?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${y.length}</span>`:""}
                        </label>
                        <select id="visits-filter-position" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-workplace" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-map-marker-alt ${D}"></i>${t("filter.workplace")}
                            ${p?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${y.length}</span>`:""}
                        </label>
                        <select id="visits-filter-workplace" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 -->
                    <div class="filter-field" style="min-width: 140px;">
                        <button id="visits-reset-filters" class="filter-reset-btn" style="width: 100%;">
                            <i class="fas fa-redo ${D}"></i>${t("btn.reset")}
                        </button>
                    </div>
                </div>
            </div>
            
            ${b}
        `;e.innerHTML=$,this.applyModuleI18n(e),typeof requestIdleCallback=="function"?requestIdleCallback(()=>this.updateVisitFilterOptions(f),{timeout:900}):setTimeout(()=>this.updateVisitFilterOptions(f),0);try{const h=e.querySelector("#clinic-visits-tbody");if(h&&Array.isArray(y)&&y.length>0){this._clinicVisitsRowsToken=(this._clinicVisitsRowsToken||0)+1;const v=this._clinicVisitsRowsToken;let L=0;const k=y.length,C=I=>{if(v!==this._clinicVisitsRowsToken||this.state&&this.state.activeTab!=="visits")return;const q=typeof performance<"u"&&performance.now?performance.now():Date.now();let w="",_=0;for(;L<k;){w+=g(y[L]),L+=1,_+=1;const M=typeof performance<"u"&&performance.now?performance.now():Date.now(),x=I&&typeof I.timeRemaining=="function"?I.timeRemaining()>6:M-q<12;if(_>=25&&!x||_>=75)break}w&&h.insertAdjacentHTML("beforeend",w),L<k&&(typeof requestIdleCallback=="function"?requestIdleCallback(C,{timeout:900}):setTimeout(()=>C(null),0))};typeof requestIdleCallback=="function"?requestIdleCallback(C,{timeout:900}):setTimeout(()=>C(null),0)}}catch{}this.bindVisitsTabEvents(e),this.state._shouldFocusSearch&&requestAnimationFrame(()=>{const h=e.querySelector("#visits-search");if(h){h.focus();const v=this.state._searchCursorPosition;if(v!=null)try{h.setSelectionRange(v,v)}catch{}this.state._shouldFocusSearch=!1}}),requestAnimationFrame(()=>{const h=e.querySelector(".clinic-table-wrapper");h&&this.setupTableScrollListeners(h)})}catch(t){const a=t instanceof Error?t.message:typeof t=="string"?t:JSON.stringify(t);if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",a),e)try{e.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400">${Utils.escapeHTML(a)}</p>
                            <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab()">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    `}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623:",s)}}},calculateTotalTime(e,t){if(!e||!t)return"-";try{const{t:a}=this.getTranslations(),s=e instanceof Date?e:new Date(e),n=t instanceof Date?t:new Date(t);if(isNaN(s.getTime())||isNaN(n.getTime()))return"-";const i=n.getTime()-s.getTime();if(i<0)return"-";const o=Math.floor(i/(1e3*60)),l=Math.floor(o/60),r=o%60;return l>0&&r>0?`${l} ${a("time.hours")} ${r} ${a("time.minutes")}`:l>0?`${l} ${a("time.hours")}`:r>0?`${r} ${a("time.minutes")}`:a("time.lessThanMinute")}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",a),"-"}},cleanMedicationName(e,t=null){if(!e||typeof e!="string")return{name:e||"",quantity:t??0};const a=e.trim(),s=a.match(/^(.+?)\s*\(\s*(\d+)\s*\)\s*$/);if(s){const i=s[1].trim();return t!=null?{name:i,quantity:t}:{name:i,quantity:0}}return{name:a,quantity:t??0}},normalizeVisitMedications(e){if(!e)return[];if(Array.isArray(e)){const t=e.map(a=>{if(!a||typeof a!="object")return null;let s=a.medicationName||a.name||"";if(typeof s=="object"&&s!==null&&(s=s.medicationName||s.name||""),s=(s||"").toString().trim(),!s)return null;const n=parseInt(a.quantity,10)||1,i=this.cleanMedicationName(s,n),o=typeof i.name=="string"?i.name.trim():i.name&&i.name.name?i.name.name.trim():String(i.name||"").trim();return o?{medicationName:o,quantity:i.quantity||n||1,unit:a.unit||"\u0648\u062D\u062F\u0629",notes:a.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641:",a,i),null)}).filter(a=>a!==null&&a.medicationName);return AppState.debugMode&&t.length===0&&e.length>0&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0637\u0628\u064A\u0639 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",e),t}if(typeof e=="string"){const t=e.trim();if(!t)return[];try{const a=JSON.parse(t);if(Array.isArray(a)){const s=a.map(n=>{if(!n||typeof n!="object")return null;let i=n.medicationName||n.name||"";if(typeof i=="object"&&i!==null&&(i=i.medicationName||i.name||""),i=(i||"").toString().trim(),!i)return null;const o=parseInt(n.quantity,10)||1,l=this.cleanMedicationName(i,o),r=typeof l.name=="string"?l.name.trim():l.name&&l.name.name?l.name.name.trim():String(l.name||"").trim();return r?{medicationName:r,quantity:l.quantity||o||1,unit:n.unit||"\u0648\u062D\u062F\u0629",notes:n.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (JSON):",n,l),null)}).filter(n=>n!==null&&n.medicationName);if(s.length>0)return s}}catch{}try{const a=t.split(/،|,/).map(n=>n.trim()).filter(Boolean),s=[];if(a.forEach(n=>{const i=n.match(/^(.+?)(?:\s*\(\s*(\d+)\s*\))?\s*$/);if(!i){const r=n.trim();r&&s.push({medicationName:r,quantity:1,unit:"\u0648\u062D\u062F\u0629",notes:""});return}let o=(i[1]||"").trim(),l=i[2]?parseInt(i[2],10):1;if(o){const r=this.cleanMedicationName(o,l);o=r.name,l=r.quantity||l||1;const c=typeof o=="string"?o.trim():String(o||"").trim();c&&s.push({medicationName:c,quantity:isNaN(l)?1:l,unit:"\u0648\u062D\u062F\u0629",notes:""})}}),s.length>0)return AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${s.length} \u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0646\u0635:`,t),s}catch(a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0646\u0635 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",t,a)}return[]}if(typeof e=="object"&&e!==null){let t=(e.medicationName||e.name||"").trim();if(t){const a=parseInt(e.quantity,10)||1,s=this.cleanMedicationName(t,a),n=typeof s.name=="string"?s.name.trim():s.name&&s.name.name?s.name.name.trim():String(s.name||"").trim();return n?[{medicationName:n,quantity:s.quantity||a||1,unit:e.unit||"\u0648\u062D\u062F\u0629",notes:e.notes||""}]:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (object):",e,s),[])}}return[]},getVisitFactoryDisplayName(e){try{if(!e||typeof e!="object")return"-";if(e.factoryName)return String(e.factoryName);if(e.factory){const t=this.getSiteOptions?this.getSiteOptions():[],a=Array.isArray(t)?t.find(s=>s.id===e.factory||s.name===e.factory):null;return a&&a.name?String(a.name):String(e.factory)}return"-"}catch{return"-"}},resetVisitFilters(){const e=document.getElementById("visits-search");e&&(e.value="");const t=document.getElementById("visits-filter-factory");t&&(t.value="");const a=document.getElementById("visits-filter-position");a&&(a.value="");const s=document.getElementById("visits-filter-workplace");s&&(s.value=""),this.state.filters=this.state.filters||{},this.state.filters.visits={search:"",factory:"",position:"",workplace:""},this.renderVisitsTab()},updateVisitFilterOptions(e){if(!e||!Array.isArray(e))return;const{t}=this.getTranslations(),a=(this.state.activeVisitType||"employees")==="contractors",s=[...new Set(e.map(m=>{const f=this.getVisitFactoryDisplayName(m);return f&&f!=="-"?f:null}).filter(Boolean))].sort(),n=[...new Set(e.map(m=>{const f=a?m.contractorPosition||m.employeePosition||"":m.employeePosition||"";return f&&f!=="-"?f:null}).filter(Boolean))].sort(),i=[...new Set(e.map(m=>{const f=a?m.workArea||m.employeeLocation||"":m.employeeLocation||m.workArea||"";return f&&f!=="-"?f:null}).filter(Boolean))].sort(),o=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},l=o.factory||document.getElementById("visits-filter-factory")?.value||"",r=o.position||document.getElementById("visits-filter-position")?.value||"",c=o.workplace||document.getElementById("visits-filter-workplace")?.value||"",p=document.getElementById("visits-filter-factory");p&&(p.innerHTML=`<option value="">${t("filter.all")}</option>`+s.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===l?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const u=document.getElementById("visits-filter-position");u&&(u.innerHTML=`<option value="">${t("filter.all")}</option>`+n.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===r?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const d=document.getElementById("visits-filter-workplace");d&&(d.innerHTML=`<option value="">${t("filter.all")}</option>`+i.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===c?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""))},bindVisitsTabEvents(e){const t=e.querySelector("#visits-add-btn"),a=e.querySelector("#visits-add-new-btn"),s=e.querySelector("#visits-refresh-btn"),n=e.querySelector("#visits-export-excel-btn"),i=e.querySelector("#visits-export-pdf-btn"),o=e.querySelector("#visits-search");t?.addEventListener("click",()=>this.showVisitForm()),a?.addEventListener("click",()=>this.showEnhancedVisitForm()),s?.addEventListener("click",()=>{this.renderVisitsTab(!0),Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}),n?.addEventListener("click",()=>this.exportVisitsToExcel()),i?.addEventListener("click",()=>this.exportVisitsToPDF()),o&&o.addEventListener("input",u=>{const d=(u.target.value||"").toString(),m=u.target.selectionStart!==null&&u.target.selectionStart!==void 0?u.target.selectionStart:d.length;this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.search=d,this.state._searchCursorPosition=m,this.state._shouldFocusSearch=!0,this.scheduleVisitsTabRender(!1,150)});const l=e.querySelector("#visits-filter-factory");l&&l.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.factory=l.value||"",this.scheduleVisitsTabRender(!1,50)});const r=e.querySelector("#visits-filter-position");r&&r.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.position=r.value||"",this.scheduleVisitsTabRender(!1,50)});const c=e.querySelector("#visits-filter-workplace");c&&c.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.workplace=c.value||"",this.scheduleVisitsTabRender(!1,50)});const p=e.querySelector("#visits-reset-filters");p&&p.addEventListener("click",()=>{this.resetVisitFilters()}),e.querySelectorAll(".visit-type-tab").forEach(u=>{u.addEventListener("click",()=>{try{const d=u.getAttribute("data-visit-type");if(!d){Utils.safeWarn("\u26A0\uFE0F \u0646\u0648\u0639 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.state.activeVisitType=d,this.scheduleVisitsTabRender(!1,30)}catch(d){if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",d),this.state&&this.state.activeVisitType)try{this.scheduleVisitsTabRender(!1,30)}catch(m){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",m)}}})}),e.hasAttribute("data-visits-actions-delegation")||(e.setAttribute("data-visits-actions-delegation","true"),e.addEventListener("click",u=>{try{const d=u.target?.closest?.('[data-action="view-visit"],[data-action="edit-visit"]');if(!d)return;const m=d.getAttribute("data-action"),f=d.getAttribute("data-id");if(!f)return;const y=(AppState.appData.clinicVisits||[]).find(g=>g.id===f);if(!y)return;m==="view-visit"?this.viewVisitDetails(y):m==="edit-visit"&&this.showVisitForm(y)}catch{}},{passive:!0}))},viewVisitDetails(e){if(!e)return;e.createdBy||(e.createdBy=null),e.updatedBy||(e.updatedBy=null);const t=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(s=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(s.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${s.quantity||1}</span>
                </div>
            `).join(""):'<p style="color: #999; font-style: italic;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629</p>',a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!e.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof e.createdBy=="object")return Utils.escapeHTML(e.createdBy.name||e.createdBy.email||e.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const s=String(e.createdBy).trim();if(s==="\u0627\u0644\u0646\u0638\u0627\u0645"||s===""){const n=(e.email||"").toString().trim();if(n&&n!=="")return Utils.escapeHTML(n);const i=(AppState.currentUser?.email||"").toString().trim();return i&&i!==""?Utils.escapeHTML(i):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(s)})()}</p>
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
        `,document.body.appendChild(a),a.addEventListener("click",s=>{s.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async deleteVisit(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}if(!this.isCurrentUserAdmin()){await this.requestVisitDeletion(e);return}const t=(AppState.appData.clinicVisits||[]).find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const a=t.employeeName||t.contractorName||t.externalName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s=t.visitDate?Utils.formatDateTime(t.visitDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 "${a}" \u0628\u062A\u0627\u0631\u064A\u062E ${s}\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");try{if(AppState.googleConfig?.appsScript?.enabled){const i=await GoogleIntegration.sendRequest({action:"deleteClinicVisit",data:{visitId:e}});if(!i||i.success!==!0)throw new Error(i?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}AppState.appData.clinicVisits=(AppState.appData.clinicVisits||[]).filter(i=>i.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"),this.renderVisitsTab()}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+i.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",i)}}},async requestVisitDeletion(e){try{if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}const t=(AppState.appData.clinicVisits||[]).find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 (\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D)");return}const s={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};Loading.show("\u062C\u0627\u0631\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");const n=await GoogleIntegration.sendRequest({action:"addClinicVisitDeletionRequest",data:{visitId:e,visitData:t,requestedBy:s}});if(Loading.hide(),!n||n.success!==!0)throw new Error(n?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641");try{AppState.appData.clinicVisitDeletionRequests=Array.isArray(AppState.appData.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n.data&&AppState.appData.clinicVisitDeletionRequests.unshift({...n.data,requestType:"visit"}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")}catch(t){try{Loading.hide()}catch{}Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(t.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}},getMedicationRowClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-50":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-50":"bg-green-50"},ensureData(){if(typeof AppState>"u")return;AppState.appData=AppState.appData||{};const e=AppState.appData;Array.isArray(e.clinicVisits)||(e.clinicVisits=[]),Array.isArray(e.medications)||(e.medications=[]),Array.isArray(e.clinicMedications)||(e.clinicMedications=[]),Array.isArray(e.clinicInventory)||(e.clinicInventory=[]);const t=e.medications.length>0?e.medications:e.clinicMedications.length>0?e.clinicMedications:e.clinicInventory.length>0?e.clinicInventory:[];e.medications.length===0&&t.length>0&&(e.medications=[...t]),e.clinicMedications.length===0&&t.length>0&&(e.clinicMedications=[...t]),e.clinicInventory.length===0&&t.length>0&&(e.clinicInventory=[...t]),Array.isArray(e.sickLeave)||(e.sickLeave=[]),Array.isArray(e.injuries)||(e.injuries=[]),Array.isArray(e.clinicSupplyRequests)||(e.clinicSupplyRequests=[]),Array.isArray(e.clinicStaff)||(e.clinicStaff=[]),Array.isArray(e.clinicStaffAttendance)||(e.clinicStaffAttendance=[]),Array.isArray(e.clinicStaffTimeOffRequests)||(e.clinicStaffTimeOffRequests=[]),Array.isArray(e.clinicStaffLeaveBalances)||(e.clinicStaffLeaveBalances=[]),Array.isArray(e.clinicStaffSystemActivities)||(e.clinicStaffSystemActivities=[]);let a=!1;if(Array.isArray(e.clinicContractorVisits)&&e.clinicContractorVisits.length>0){const n=new Set(e.clinicVisits.map(o=>o&&o.id).filter(Boolean));let i=0;e.clinicContractorVisits.forEach(o=>{o&&o.id&&!n.has(o.id)&&(o.personType="contractor",e.clinicVisits.push(o),n.add(o.id),a=!0,i++)}),i>0&&AppState.debugMode&&Utils.safeLog(`\u{1F517} [CLINIC] \u062A\u0645 \u062F\u0645\u062C ${i} \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A ensureData`)}e.clinicVisits=e.clinicVisits.map(n=>{if(!n||typeof n!="object")return n;let i=String(n.personType||"").toLowerCase().trim();i==="external"||i==="\u062E\u0627\u0631\u062C\u064A"||i==="\u0645\u0642\u0627\u0648\u0644"||i==="contractor"?i="contractor":(i==="\u0645\u0648\u0638\u0641"||i==="staff"||i==="employee"||!i)&&(n.contractorName||n.contractorWorkerName?i="contractor":i="employee"),n.personType!==i&&(n.personType=i,a=!0);let o=[];if(n.medications&&(o=this.normalizeVisitMedications(n.medications)),(!o||o.length===0)&&n.medicationsDispensed){const p=this.normalizeVisitMedications(n.medicationsDispensed);p&&p.length>0&&(o=p,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,p.length,"\u062F\u0648\u0627\u0621"))}if((!o||o.length===0)&&n.medicationsDispensedQty&&n.medicationsDispensedQty>0){const p=parseInt(n.medicationsDispensedQty,10)||0;p>0&&(o=[{medicationName:n.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:p,unit:"\u0648\u062D\u062F\u0629",notes:""}],AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062F\u0648\u0627\u0621 \u0645\u0646 medicationsDispensedQty \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,p))}o||(o=[]);const l=Array.isArray(n.medications)?n.medications:[],r=JSON.stringify(l.sort((p,u)=>(p.medicationName||"").localeCompare(u.medicationName||""))),c=JSON.stringify(o.sort((p,u)=>(p.medicationName||"").localeCompare(u.medicationName||"")));if(r!==c&&(n.medications=o,a=!0,AppState.debugMode&&o.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B medications \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,o.length,"\u062F\u0648\u0627\u0621")),n.visitDate){const p=String(n.visitDate).trim();if(p.length===10&&p.match(/^\d{4}-\d{2}-\d{2}$/)){const u=new Date(p+"T00:00:00");n.visitDate=u.toISOString(),a=!0}else if(!p.includes("T")&&!p.includes("Z"))try{const u=new Date(p);isNaN(u.getTime())||(n.visitDate=u.toISOString(),a=!0)}catch{}}if(n.exitDate){const p=String(n.exitDate).trim();if(p.length===10&&p.match(/^\d{4}-\d{2}-\d{2}$/)){const u=new Date(p+"T00:00:00");n.exitDate=u.toISOString(),a=!0}else if(!p.includes("T")&&!p.includes("Z"))try{const u=new Date(p);isNaN(u.getTime())||(n.exitDate=u.toISOString(),a=!0)}catch{}}return n});let s=!1;if(e.clinicMedications=e.clinicMedications.map(n=>{const i=this.normalizeMedicationRecord(n),o=this.calculateMedicationStatus(i),l=n&&(n.quantityAdded!==i.quantityAdded||n.remainingQuantity!==i.remainingQuantity)||typeof n?.quantityAdded!="number"||typeof n?.remainingQuantity!="number";return(i.status!==o.status||i.daysRemaining!==o.daysRemaining||l)&&(s=!0,i.status=o.status,i.daysRemaining=o.daysRemaining),i}),e.clinicInventory=e.clinicMedications,e.sickLeave=e.sickLeave.map(n=>this.normalizeSickLeaveRecord(n)),e.injuries=e.injuries.map(n=>this.normalizeInjuryRecord(n)),AppState.appData=e,typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&(s||a)&&Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData (medicationsChanged: ${s}, visitsChanged: ${a})`)}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData:",n.message)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},ensureFilterDefaults(){this.state||(this.state={activeTab:"medications",filters:{}}),this.state.activeTab||(this.state.activeTab="medications");const e={medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:"",factory:"",position:"",workplace:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}};this.state.filters=this.state.filters||{},Object.keys(e).forEach(t=>{const a=this.state.filters[t]||{};this.state.filters[t]=Object.assign({},e[t],a)}),Array.isArray(this.state.currentInjuryAttachments)||(this.state.currentInjuryAttachments=[])},getCurrentUserSummary(e=null){if(e&&typeof e=="object"&&(e.name||e.id))return e;if(!AppState.currentUser)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F - \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0646\u0638\u0627\u0645"),{id:"",name:"\u0627\u0644\u0646\u0638\u0627\u0645",email:"",role:""};const t=(AppState.currentUser.name||AppState.currentUser.displayName||"").toString().trim(),a=(AppState.currentUser.email||"").toString().trim(),s=(AppState.currentUser.id||"").toString().trim();AppState.debugMode&&Utils.safeLog("\u{1F50D} getCurrentUserSummary - name:",t,"email:",a,"id:",s);const n=t||a||s||"\u0627\u0644\u0646\u0638\u0627\u0645";return AppState.debugMode&&n==="\u0627\u0644\u0646\u0638\u0627\u0645"&&Utils.safeWarn('\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: getCurrentUserSummary \u064A\u0639\u064A\u062F "\u0627\u0644\u0646\u0638\u0627\u0645" - AppState.currentUser:',AppState.currentUser),{id:s,name:n,email:a,role:(AppState.currentUser.role||"").toString().trim()}},getMonthlyVisits(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1);return AppState.appData.clinicVisits.filter(a=>new Date(a.visitDate||a.createdAt)>=t).length},async renderVisitsList(){const e=AppState.appData.clinicVisits.slice(-10).reverse();return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>':`
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
                        ${e.map(t=>{const a=t.employeeCode||t.employeeNumber||"-",s=t.employeeName||t.contractorName||t.externalName||"",n=t.contractorWorkerName?` (${Utils.escapeHTML(t.contractorWorkerName)})`:"",i=t.employeePosition||"-",o=t.employeeLocation||t.workArea||"-",l=t.visitDate?Utils.escapeHTML(Utils.formatDateTime(t.visitDate)):"-",r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647</span>',c=Clinic.calculateTotalTime(t.visitDate,t.exitDate),p=Utils.escapeHTML(t.reason||""),u=Utils.escapeHTML(t.diagnosis||""),d=Utils.escapeHTML(t.treatment||"");return`
                                <tr>
                                    <td>${Utils.escapeHTML(a)}</td>
                                    <td>
                                        <div class="font-medium text-gray-900">${Utils.escapeHTML(s)}${n}</div>
                                    </td>
                                    <td>${Utils.escapeHTML(i)}</td>
                                    <td>${Utils.escapeHTML(o)}</td>
                                    <td>${l}</td>
                                    <td>${r}</td>
                                    <td>${c}</td>
                                    <td>${p}</td>
                                    <td>${u}</td>
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
        `},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-visit-btn");e&&e.addEventListener("click",()=>this.showVisitForm())},100)},loadContractorsIntoSelect(e){if(!e)return;const t=(e.tagName||"").toLowerCase(),a=(e.value||"").toString();if(t==="input"){const s=e.getAttribute("list"),n=s?document.getElementById(s):null;if(!n)return;let i=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?i=(Contractors.getAllContractorsForModules()||[]).map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean):Array.isArray(AppState.appData?.approvedContractors)?i=AppState.appData.approvedContractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.companyName||r.name)?String(r.companyName||r.name).trim():"").filter(Boolean):Array.isArray(AppState.appData?.contractors)&&(i=AppState.appData.contractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean))}catch{}const o=new Set,l=[];i.forEach(r=>{const c=r.toLowerCase();o.has(c)||(o.add(c),l.push(r))}),n.innerHTML=l.map(r=>`<option value="${Utils.escapeHTML(r)}"></option>`).join("");try{e.dataset.allowedValues=JSON.stringify(l.map(r=>String(r||"").toLowerCase().trim()).filter(Boolean))}catch{}a&&(e.value=a),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("input",()=>{const r=document.getElementById("visit-employee-name");r&&e.value&&(r.value=e.value)}),e.addEventListener("blur",()=>{try{const r=(e.value||"").toString().trim();if(!r)return;if(!(()=>{try{return JSON.parse(e.dataset.allowedValues||"[]")}catch{return[]}})().includes(r.toLowerCase().trim())){e.value="";const u=document.getElementById("visit-employee-name");u&&(u.value=""),Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637")}}catch{}}));return}typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"&&Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:a,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1}),a&&(e.value=a),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("change",()=>{const s=document.getElementById("visit-employee-name");s&&e.value&&(s.value=e.value)}))},handlePersonTypeChange(){const e=document.getElementById("visit-person-type");if(!e)return;const t=e.value,a=document.getElementById("visit-employee-code-container"),s=document.getElementById("visit-employee-code"),n=document.getElementById("visit-employee-name"),i=document.getElementById("visit-employee-name-label"),o=document.getElementById("visit-employee-position-container"),l=document.getElementById("visit-employee-department-container"),r=document.getElementById("visit-employee-location-container"),c=document.getElementById("visit-employee-location"),p=document.getElementById("visit-contractor-worker-container"),u=document.getElementById("visit-contractor-worker"),d=document.getElementById("visit-contractor-worker-label"),m=document.getElementById("visit-contractor-position-container"),f=document.getElementById("visit-contractor-position"),y=document.getElementById("visit-factory-container"),g=document.getElementById("visit-factory"),b=document.getElementById("visit-contractor-factory-container"),S=document.getElementById("visit-contractor-factory"),T=document.getElementById("visit-work-area-container"),D=document.getElementById("visit-work-area");a&&(a.style.display=t==="employee"?"block":"none"),s&&(t==="employee"?(s.disabled=!1,s.required=!0,s.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"):(s.disabled=!0,s.required=!1,s.value="",s.placeholder="")),o&&(o.style.display=t==="employee"?"block":"none"),l&&(l.style.display=t==="employee"?"block":"none"),r&&(r.style.display=t==="employee"?"block":"none"),p&&(p.style.display=t==="contractor"||t==="external"?"block":"none"),m&&(m.style.display=t==="contractor"||t==="external"?"block":"none"),y&&(y.style.display=t==="employee"?"block":"none"),b&&(b.style.display=t==="contractor"||t==="external"?"block":"none"),T&&(T.style.display=t==="contractor"||t==="external"?"block":"none"),i&&(i.textContent=`\u0627\u0633\u0645 ${t==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":t==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u062C\u0647\u0629"} *`);const $=document.getElementById("visit-contractor-name-select");t==="employee"?(n&&(n.readOnly=!0,n.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",n.value="",n.style.display="block",n.required=!0),$&&($.style.display="none",$.required=!1)):t==="contractor"?(n&&(n.style.display="none",n.required=!1,n.value=""),$&&($.style.display="block",$.required=!0,Clinic.loadContractorsIntoSelect($))):(n&&(n.readOnly=!1,n.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629 \u0623\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",n.value="",n.style.display="block",n.required=!0),$&&($.style.display="none",$.required=!1));const h=document.getElementById("visit-employee-position"),v=document.getElementById("visit-employee-department");if(c&&(c.required=t==="employee",t!=="employee"&&(c.value="")),u&&(t==="contractor"||t==="external"?(u.required=!0,u.placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"):(u.required=!1,u.value="",u.placeholder="")),d&&(d.textContent=t==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *":t==="external"?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A *":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639"),f&&(t==="contractor"||t==="external"?(f.required=!0,f.placeholder="\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0623\u0648 \u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B"):(f.required=!1,f.value="",f.placeholder="")),D&&(D.required=t==="contractor"||t==="external",t==="contractor"||t==="external"?D.placeholder="\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0623\u0648 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":(D.placeholder="",D.value="")),h&&(h.value=""),v&&(v.value=""),t==="employee"&&typeof EmployeeHelper<"u"&&s){const L=s.cloneNode(!0);s.parentNode.replaceChild(L,s),EmployeeHelper.setupEmployeeCodeSearch("visit-employee-code","visit-employee-name",k=>{if(k){const C=document.getElementById("visit-employee-name"),I=document.getElementById("visit-employee-position"),q=document.getElementById("visit-employee-department");C&&(C.value=k.name||""),I&&(I.value=k.position||""),q&&(q.value=k.department||"");const w=document.getElementById("visit-history-tbody");if(w){const _=document.getElementById("visit-employee-code")?.value.trim();if(_){const M=(AppState.appData.clinicVisits||[]).filter(x=>x.personType==="employee"&&(x.employeeCode===_||x.employeeNumber===_)).sort((x,N)=>new Date(N.visitDate||N.createdAt)-new Date(x.visitDate||x.createdAt)).slice(0,10);M.length===0?w.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':w.innerHTML=M.map(x=>`
                                    <tr>
                                        <td>${x.visitDate?Utils.escapeHTML(Utils.formatDateTime(x.visitDate)):"-"}</td>
                                        <td>${x.exitDate?Utils.escapeHTML(Utils.formatDateTime(x.exitDate)):"-"}</td>
                                        <td>${Utils.escapeHTML(x.reason||"-")}</td>
                                        <td>${Utils.escapeHTML(x.diagnosis||"-")}</td>
                                        <td>${Utils.escapeHTML(x.treatment||"-")}</td>
                                        <td>${Utils.escapeHTML(x.employeeLocation||x.workArea||"-")}</td>
                                    </tr>
                                `).join("")}}}},{inlineAlertId:"visit-form-alerts",employeeNotFoundWarn:"enter"})}},showVisitFormAlert(e,t="error"){const a=document.getElementById("visit-form-alerts");if(!a||e==null||String(e).trim()==="")return;a.style.display="block";const s=t==="error"?"border-red-300 bg-red-50 text-red-900":"border-amber-300 bg-amber-50 text-amber-950";a.innerHTML=`<div class="rounded-lg border ${s} px-3 py-2 text-sm text-right shadow-sm" role="alert">${Utils.escapeHTML(String(e))}</div>`;try{a.scrollIntoView({block:"nearest",behavior:"smooth"})}catch{}},clearVisitFormAlert(){const e=document.getElementById("visit-form-alerts");e&&(e.innerHTML="",e.style.display="none")},async showSickLeaveForm(e=null){this.ensureData();const t=!!e,a=document.createElement("div");a.className="modal-overlay";const s=e?.personType||"employee",n=e?.startDate?new Date(e.startDate).toISOString().slice(0,10):"",i=e?.endDate?new Date(e.endDate).toISOString().slice(0,10):"",o=e?.employeeName||e?.personName||"",l=e?.employeeDepartment||e?.department||"",r=e?.employeePosition||e?.position||"",c=e?.employeeCode||e?.employeeNumber||"";a.innerHTML=`
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
                                    <option value="employee" ${s==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${s==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${s==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
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
                                <input type="date" id="sick-leave-start-date" required class="form-input" value="${n}">
                            </div>
                            <div>
                                <label for="sick-leave-end-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                                <input type="date" id="sick-leave-end-date" required class="form-input" value="${i}">
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
        `,document.body.appendChild(a);const p=a.querySelector("#sick-leave-form"),u=p.querySelector("#sick-leave-person-type"),d=p.querySelector("#sick-leave-employee-code"),m=p.querySelector("#sick-leave-name"),f=p.querySelector("#sick-leave-position"),y=p.querySelector("#sick-leave-department"),g=p.querySelector("#sick-leave-position-container"),b=p.querySelector("#sick-leave-department-container"),S=p.querySelector("#sick-leave-code-container"),T=p.querySelector("#sick-leave-name-label"),D=p.querySelector("#sick-leave-dropdown"),$=p.querySelector("#sick-leave-start-date"),h=p.querySelector("#sick-leave-end-date"),v=p.querySelector("#sick-leave-days"),L=()=>{if(!$.value||!h.value){v.textContent="\u2014";return}const w=new Date($.value).toISOString(),_=new Date(h.value).toISOString(),M=this.calculateSickLeaveDays(w,_);v.textContent=`${M} \u064A\u0648\u0645`};$.addEventListener("change",L),h.addEventListener("change",L),$.value&&h.value&&L();const k=()=>{m&&(m.value=""),f&&(f.value=""),y&&(y.value=""),d&&(d.value="")},C=w=>{if(!w){k();return}const _=EmployeeHelper.getPrimaryCode(w);d&&_&&(d.value=_),m&&(m.value=w.name||""),f&&(f.value=w.position||w.jobTitle||""),y&&(y.value=w.department||w.unit||w.section||"")},I=()=>{!d||!m||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("sick-leave-employee-code","sick-leave-name",w=>{w?C(w):k()}),EmployeeHelper.setupAutocomplete("sick-leave-name",w=>{w&&C(w)}))},q=(w,_=!1)=>{const M=w==="employee";S&&(S.style.display=M?"block":"none"),g&&(g.style.display=M?"block":"none"),b&&(b.style.display=M?"block":"none"),T&&(T.textContent=`\u0627\u0633\u0645 ${M?"\u0627\u0644\u0645\u0648\u0638\u0641":w==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),d&&(d.disabled=!M,d.required=M,d.placeholder=M?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!M&&_&&(d.value="")),m&&(m.readOnly=M,m.placeholder=M?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${w==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,M&&_&&(m.value="")),!M&&_&&(f&&(f.value=""),y&&(y.value="")),D&&(D.classList.add("hidden"),D.innerHTML=""),M&&I()};if(q(s,!1),s==="employee"&&typeof EmployeeHelper<"u"&&c){const w=EmployeeHelper.findByTerm(c);w&&C(w)}u.addEventListener("change",()=>{q(u.value,!0),u.value==="employee"&&d&&d.focus()}),p.addEventListener("submit",async w=>{w.preventDefault();const _=u.value,M=_==="employee";if(!$.value||!h.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629");return}const x=new Date($.value).toISOString(),N=new Date(h.value).toISOString(),F=this.calculateSickLeaveDays(x,N),P=e?.createdAt||new Date().toISOString(),j=e?.createdBy||this.getCurrentUserSummary(),z=this.getCurrentUserSummary(),U=this.normalizeSickLeaveRecord({id:e?.id||Utils.generateId("SICK_LEAVE"),personType:_,employeeName:M?m.value.trim():null,employeeCode:M?d?.value.trim()||"":null,employeeNumber:M?d?.value.trim()||"":null,employeePosition:M?f?.value.trim()||"":null,employeeDepartment:M?y?.value.trim()||"":null,personName:M?null:m.value.trim(),startDate:x,endDate:N,daysCount:F,reason:p.querySelector("#sick-leave-reason").value.trim(),medicalNotes:p.querySelector("#sick-leave-notes").value.trim(),treatingDoctor:p.querySelector("#sick-leave-doctor").value.trim(),createdAt:P,createdBy:j,createdById:j?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:z});Loading.show();try{const E=AppState.appData.sickLeave||[];if(t){const O=E.findIndex(R=>R.id===U.id);O!==-1?E[O]=U:E.push(U)}else E.push(U);AppState.appData.sickLeave=E;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(O){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629):",O)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"),a.remove(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]')&&this.state.activeTab==="sickLeave"&&this.renderSickLeaveTab();const R=document.querySelector("#total-sick-leave");R&&(R.textContent=E.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateSickLeave",data:{leaveId:U.id,updateData:U}}):await GoogleIntegration.sendRequest({action:"addSickLeave",data:U})}catch(O){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",O)}})()}catch(E){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629: "+E.message)}}),a.addEventListener("click",w=>{w.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async showInjuryForm(e=null){Utils.safeLog("\u{1F537} \u062A\u0645 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 showInjuryForm - \u0628\u062F\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C..."),this.ensureData();const t=!!e,a=this;this.state.currentInjuryAttachments=Array.isArray(e?.attachments)?e.attachments.map(E=>this.normalizeAttachment(E)).filter(Boolean):[];const s=document.createElement("div");s.className="modal-overlay";const n=e?.personType||"employee",i=e?.injuryDate?Utils.toDateTimeLocalString(e.injuryDate):"",o=e?.employeeName||e?.personName||"",l=e?.contractorName||"",r=e?.employeeCode||e?.employeeNumber||"",c=e?.employeePosition||e?.contractorPosition||"",p=e?.employeeDepartment||e?.department||"",u=e?.factory||"",d=e?.subLocation||e?.subLocationName||"",m=e?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",f=this.getInjuryTypeOptions(),y=this.getSiteOptions();s.innerHTML=`
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
                                    <option value="employee" ${n==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${n==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${n==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
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
                                    ${y.map(E=>`<option value="${Utils.escapeHTML(E.id)}" ${u===E.id||u===E.name?"selected":""}>${Utils.escapeHTML(E.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-sub-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <input type="text" id="injury-sub-location" list="injury-sub-location-datalist" class="form-input" value="${Utils.escapeHTML(d)}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u064A\u062F\u0648\u064A\u0627\u064B">
                                <datalist id="injury-sub-location-datalist"></datalist>
                            </div>
                            <div>
                                <label for="injury-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <input type="datetime-local" id="injury-date" required class="form-input" value="${i}">
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
                                    ${f.map(E=>`<option value="${Utils.escapeHTML(E)}" ${e?.injuryType===E?"selected":""}>${Utils.escapeHTML(E)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645) *</label>
                                <select id="injury-body-part" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645</option>
                                    ${this.getInjuryBodyPartOptions().map(E=>`<option value="${Utils.escapeHTML(E)}" ${e?.injuryBodyPart===E?"selected":""}>${Utils.escapeHTML(E)}</option>`).join("")}
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
        `,document.body.appendChild(s);const g=s.querySelector("#injury-form"),b=g.querySelector("#injury-person-type"),S=g.querySelector("#injury-name"),T=g.querySelector("#injury-employee-code"),D=g.querySelector("#injury-code-container"),$=g.querySelector("#injury-contractor-container"),h=g.querySelector("#injury-contractor-name-select"),v=g.querySelector("#injury-employee-name-container"),L=g.querySelector("#injury-contractor-worker-container"),k=g.querySelector("#injury-contractor-worker-name"),C=g.querySelector("#injury-name-label"),I=g.querySelector("#injury-position"),q=g.querySelector("#injury-factory"),w=g.querySelector("#injury-sub-location"),_=g.querySelector("#injury-department"),M=g.querySelector("#injury-dropdown"),x=g.querySelector("#injury-attachments-input"),N=s.querySelector(".modal-close"),F=g.querySelector("#injury-cancel-btn"),P=E=>{if(E){if(S&&(S.value=E.name||""),T){const O=EmployeeHelper.getPrimaryCode(E);O&&(T.value=O)}_&&(_.value=E.department||E.unit||E.section||_.value),I&&(I.value=E.position||E.job||"")}},j=()=>{!T||!S||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("injury-employee-code","injury-name",E=>{E&&P(E)}),EmployeeHelper.setupAutocomplete("injury-name",E=>{E&&P(E)}))},z=(E,O=!1)=>{const R=E==="employee",B=E==="contractor",V=E==="external";D&&(D.style.display=R?"block":"none"),$&&($.style.display=B?"block":"none"),v&&(v.style.display=R?"block":"none"),L&&(L.style.display=B||V?"block":"none"),T&&(T.required=R,T.disabled=!R,T.placeholder=R?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!R&&O&&(T.value="")),C&&(C.textContent=`\u0627\u0633\u0645 ${R?"\u0627\u0644\u0645\u0648\u0638\u0641":E==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),S&&(S.readOnly=R,S.disabled=!R,S.required=R,S.placeholder=R?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${E==="contractor"?"\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,O&&!R&&(S.value="")),h&&(h.required=B,h.disabled=!B,B?this.loadContractorsIntoSelect(h):O&&(h.value="")),k&&(k.required=B||V,k.disabled=!(B||V),O&&R&&(k.value=""),V?k.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A":B?k.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":k.placeholder=""),!R&&O&&_&&(_.value=""),!R&&O&&I&&(I.value=""),M&&(M.classList.add("hidden"),M.innerHTML=""),R&&j()};if(z(n,!1),n==="employee"&&typeof EmployeeHelper<"u"&&r){const E=EmployeeHelper.findByTerm(r);E&&P(E)}b.addEventListener("change",()=>{z(b.value,!0)}),h?.addEventListener("input",()=>{b.value!=="contractor"||!(h.value||"").trim()||S.value.trim()||S.focus()}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("injury-factory","injury-sub-location","injury-sub-location-datalist",{includeFallbackNameMatch:!0}),x?.addEventListener("change",async E=>{await a.handleInjuryAttachmentsChange(E.target.files)}),typeof a.renderInjuryAttachmentsPreview=="function"?a.renderInjuryAttachmentsPreview():Utils.safeWarn("\u26A0\uFE0F renderInjuryAttachmentsPreview \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const U=()=>{a.state.currentInjuryAttachments=[],s.remove()};N?.addEventListener("click",U),F?.addEventListener("click",U),Utils.safeLog("\u{1F537} \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 event listener \u0644\u0644\u0646\u0645\u0648\u0630\u062C..."),g.addEventListener("submit",async E=>{Utils.safeLog("\u{1F534} \u062A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638! \u0628\u062F\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");try{E.preventDefault(),E.stopPropagation(),E.stopImmediatePropagation(),Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0635\u0627\u0628\u0629...");const O=b.value,R=O==="employee",B=g.querySelector("#injury-date");if(!B.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const V=Utils.dateTimeLocalToISO(B.value)||new Date().toISOString(),G=e?.createdAt||new Date().toISOString(),Y=e?.createdBy||a.getCurrentUserSummary(),te=a.getCurrentUserSummary(),ee=_?.value.trim()||"",se=I?.value.trim()||"",J=h?.value?.trim()||"",ae=R?S?.value?.trim()||"":k?.value?.trim()||S?.value?.trim()||"",oe=g.querySelector("#injury-type")?.value||"",re=g.querySelector("#injury-body-part")?.value||"",A=g.querySelector("#injury-location")?.value?.trim()||"",H=g.querySelector("#injury-description")?.value?.trim()||"",W=q?.value?.trim()||"",Q=w?.value?.trim()||"";if(R&&!ae){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644/\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(O==="contractor"&&h){const K=(()=>{try{return JSON.parse(h.dataset.allowedValues||"[]")}catch{return[]}})();if(!J||!K.includes(J.toLowerCase().trim())){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637");return}if(!ae){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}}if(O==="external"&&!ae){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A");return}if(!oe){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!re){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)");return}if(!A){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!H){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}let X="";W&&(X=y.find(ie=>ie.id===W||ie.name===W)?.name||"");const Z=a.normalizeInjuryRecord({id:e?.id||Utils.generateId("INJURY"),personType:O,employeeName:R?S.value.trim():null,employeeCode:R?T?.value.trim()||"":null,employeeNumber:R?T?.value.trim()||"":null,personName:R?null:ae,contractorName:O==="contractor"?J:null,employeePosition:se,contractorPosition:R?null:se,employeeDepartment:ee,department:ee,factory:W||null,factoryName:X||null,subLocation:Q||null,subLocationName:Q||null,injuryDate:V,injuryType:oe,injuryBodyPart:re,injuryLocation:A,injuryDescription:H,actionsTaken:g.querySelector("#injury-actions").value.trim(),treatment:g.querySelector("#injury-treatment").value.trim(),status:g.querySelector("#injury-status").value,attachments:a.state.currentInjuryAttachments.map(K=>({...K})),createdAt:G,createdBy:Y,createdById:Y?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:te});Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 payload \u0628\u0646\u062C\u0627\u062D:",Z),Loading.show();const ne=AppState.appData.injuries||[];if(t){const K=ne.findIndex(ie=>ie.id===Z.id);K!==-1?ne[K]=Z:ne.push(Z)}else ne.push(Z);AppState.appData.injuries=ne;try{a.calculateClinicCardValues(),a.updateClinicAnalysisResults()}catch(K){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u0635\u0627\u0628\u0629):",K)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D"),U(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A..."),document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]')&&a.state.activeTab==="injuries"&&(Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 panel\u060C \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),a.renderInjuriesTab());const ie=document.querySelector("#total-injuries");ie&&(ie.textContent=ne.length)}catch(K){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",K)}},100),(async()=>{try{t?(await GoogleIntegration.sendRequest({action:"updateInjury",data:{injuryId:Z.id,updateData:Z}}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u062A\u062D\u062F\u064A\u062B)")):(await GoogleIntegration.sendRequest({action:"addInjury",data:Z}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u0625\u0636\u0627\u0641\u0629)"))}catch(K){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",K)}})()}catch(O){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629:",O),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629: "+O.message)}}),s.addEventListener("click",E=>{if(E.target===s){if(!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`))return;a.state.currentInjuryAttachments=[],s.remove()}})},showVisitForm(e=null,t=null){const a=!!e;if(!document.getElementById("clinic-section")){t&&(t.disabled=!1);return}try{this.ensureData()}catch(o){t&&(t.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0636\u064A\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",o);return}typeof Permissions<"u"&&Permissions.ensureFormSettingsState&&Permissions.ensureFormSettingsState().catch(()=>{});const n=document.createElement("div");if(n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 800px; border-radius: 15px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; gap: 10px;"><i class="fas fa-hospital-user"></i> ${a?"\u062A\u0639\u062F\u064A\u0644 \u0632\u064A\u0627\u0631\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
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
                                    ${(a&&!e?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(o=>`<option value="${Utils.escapeHTML(o)}" selected>${Utils.escapeHTML(o)}</option>`).join("")}
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
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(n),t){const o=new MutationObserver(()=>{document.body.contains(n)||(t.disabled=!1,o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})}setTimeout(()=>{const o=document.getElementById("visit-person-type"),l=document.getElementById("visit-employee-code"),r=document.getElementById("visit-history-tbody"),c=()=>{if(!r)return;const D=o?.value||"employee",$=l?.value.trim();if(D!=="employee"||!$){r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';return}const h=(AppState.appData.clinicVisits||[]).filter(v=>v.personType==="employee"&&(v.employeeCode===$||v.employeeNumber===$)).sort((v,L)=>new Date(L.visitDate||L.createdAt)-new Date(v.visitDate||v.createdAt)).slice(0,10);h.length===0?r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':r.innerHTML=h.map(v=>`
                        <tr>
                            <td>${v.visitDate?Utils.escapeHTML(Utils.formatDateTime(v.visitDate)):"-"}</td>
                            <td>${v.exitDate?Utils.escapeHTML(Utils.formatDateTime(v.exitDate)):"-"}</td>
                            <td>${Utils.escapeHTML(v.reason||"-")}</td>
                            <td>${Utils.escapeHTML(v.diagnosis||"-")}</td>
                            <td>${Utils.escapeHTML(v.treatment||"-")}</td>
                            <td>${Utils.escapeHTML(v.employeeLocation||v.workArea||"-")}</td>
                        </tr>
                    `).join("")};if(l&&r&&(l.addEventListener("blur",c),l.addEventListener("input",()=>{l.value.trim().length>=3&&c()})),o&&o.addEventListener("change",()=>{const D=document.querySelector("#visit-history-table")?.closest(".mt-6");D&&(D.style.display=o.value==="employee"?"block":"none"),o.value==="employee"&&c()}),e&&e.employeeCode&&c(),e?.personType==="contractor"){const D=document.getElementById("visit-contractor-name-select");D&&(Clinic.loadContractorsIntoSelect(D),(e.employeeName||e.contractorName)&&(D.value=e.employeeName||e.contractorName||""))}typeof Clinic.handlePersonTypeChange=="function"&&Clinic.handlePersonTypeChange(),typeof Clinic.setupClinicWorkplaceDatalist=="function"&&(Clinic.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),Clinic.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"));const p=document.getElementById("visit-contractor-name-select"),u=document.getElementById("visit-contractor-workers-datalist");if(p&&u){const D=()=>{const $=(p.value||"").trim(),h=Clinic.getContractorWorkerSuggestions($);u.innerHTML=h.map(v=>`<option value="${Utils.escapeHTML(v)}"></option>`).join("")};p.addEventListener("input",D),p.addEventListener("change",D)}const d=document.getElementById("visit-medication-select"),m=document.getElementById("visit-medications-list"),f=document.getElementById("visit-add-medication-btn"),y=document.getElementById("visit-medication-quantity"),g=document.getElementById("visit-medications-datalist");let b=e?.medications&&Array.isArray(e.medications)?[...e.medications]:[];const S=()=>{if(!d||!g)return;const D=this.getMedications().filter(h=>(h.remainingQuantity??h.quantity??0)<=0?!1:!b.some(k=>k.medicationId===h.id)),$={};g.innerHTML=D.map(h=>{const v=h.remainingQuantity??h.quantity??0,L=`${h.name||""} (\u0645\u062A\u0648\u0641\u0631: ${v})`,k=String(h.name||"").toLowerCase().trim();return k&&($[k]=h.id),`<option value="${Utils.escapeHTML(L)}"></option>`}).join(""),d.dataset.nameToId=JSON.stringify($),d.dataset.selectedId=""},T=()=>{if(m){if(b.length===0){m.innerHTML="";return}m.innerHTML=b.map((D,$)=>{const h=this.getMedications().find(v=>v.id===D.medicationId);return`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-med-id="${D.medicationId||""}">
                            <div>
                                <span class="font-medium">${Utils.escapeHTML(D.medicationName||h?.name||"")}</span>
                                <span class="text-sm text-gray-600 mr-2">\xD7 ${D.quantity||1}</span>
                            </div>
                            <button type="button" class="btn-icon btn-icon-danger btn-xs" data-remove-med="${$}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `}).join(""),m.querySelectorAll("[data-remove-med]").forEach(D=>{D.addEventListener("click",()=>{const $=parseInt(D.getAttribute("data-remove-med"),10);b.splice($,1),T(),S()})})}};f&&d&&y&&f.addEventListener("click",()=>{const $=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),h=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})(),v=d.dataset.selectedId||h[String($).toLowerCase().trim()]||"",L=parseInt(y.value,10)||1;if(!v){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062F\u0648\u0627\u0621");return}const k=this.getMedications().find(q=>q.id===v);if(!k){Notification.error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const C=k.remainingQuantity??k.quantity??0,I=b.filter(q=>q.medicationId===v).reduce((q,w)=>q+(w.quantity||0),0);if(I+L>C){Notification.error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${C-I}`);return}b.push({medicationId:v,medicationName:k.name||"",quantity:L}),y.value="1",d.value="",T(),S()}),d&&!d.hasAttribute("data-datalist-attached")&&(d.setAttribute("data-datalist-attached","true"),d.addEventListener("input",()=>{const $=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),h=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();d.dataset.selectedId=h[String($).toLowerCase().trim()]||""}),d.addEventListener("blur",()=>{try{const D=(d.value||"").trim();if(!D)return;const $=D.replace(/\s*\(.*\)\s*$/,"").trim(),h=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();d.dataset.selectedId||h[String($).toLowerCase().trim()]||(d.value="",d.dataset.selectedId="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"))}catch{}})),S(),T()},300);const i=n.querySelector("#visit-form");i.addEventListener("submit",async o=>{o.preventDefault(),this.clearVisitFormAlert();const l=i?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const c=document.getElementById("visit-person-type"),p=document.getElementById("visit-date"),u=document.getElementById("visit-exit-date");if(!c||!p||!u){this.showVisitFormAlert("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),l&&(l.disabled=!1,l.innerHTML=r);return}const d=String(c.value||"").trim().toLowerCase(),m=d==="employee"?"employee":"contractor",f=p.value,y=u.value,g=document.getElementById("visit-contractor-worker")?.value.trim()||"",b=m==="employee"?document.getElementById("visit-employee-location")?.value.trim()||"":document.getElementById("visit-work-area")?.value.trim()||"",S=m==="contractor"?document.getElementById("visit-contractor-position")?.value.trim()||"":null;let T="";if(d==="contractor"){const x=document.getElementById("visit-contractor-name-select"),N=document.getElementById("visit-employee-name");if(T=x?(x.value||"").trim():N?(N.value||"").trim():"",x){const F=(()=>{try{return JSON.parse(x.dataset.allowedValues||"[]")}catch{return[]}})();if(T&&!F.includes(T.toLowerCase().trim())){this.showVisitFormAlert("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"),l&&(l.disabled=!1,l.innerHTML=r);return}}}else{const x=document.getElementById("visit-employee-name");T=x?(x.value||"").trim():""}const D=document.getElementById("visit-medications-list"),$=[];D&&D.querySelectorAll("[data-med-id]").forEach(x=>{const N=x.getAttribute("data-med-id");if(!N)return;const F=x.textContent.match(/×\s*(\d+)/),P=F?parseInt(F[1],10):1,j=x.querySelector(".font-medium"),z=j?j.textContent.trim():"";$.push({medicationId:N,medicationName:z,quantity:P})});const h=m==="employee"?document.getElementById("visit-factory")?.value.trim()||null:document.getElementById("visit-contractor-factory")?.value.trim()||null;let v=null;if(h){const N=this.getSiteOptions().find(F=>F.id===h);v=N?N.name:null}let L=null,k=null;if(f&&f.trim())try{const[x,N]=f.split("T");if(x&&N){const[F,P,j]=x.split("-").map(Number),[z,U]=N.split(":").map(Number),E=new Date(F,P-1,j,z,U,0,0);isNaN(E.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",f):L=E.toISOString()}else{const F=new Date(f);isNaN(F.getTime())||(L=F.toISOString())}}catch(x){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",x)}if(y&&y.trim())try{const[x,N]=y.split("T");if(x&&N){const[F,P,j]=x.split("-").map(Number),[z,U]=N.split(":").map(Number),E=new Date(F,P-1,j,z,U,0,0);isNaN(E.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",y):k=E.toISOString()}else{const F=new Date(y);isNaN(F.getTime())||(k=F.toISOString())}}catch(x){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",x)}const C=AppState.currentUser,I=(C?.email||"").toLowerCase().trim(),_=(AppState.appData.users||[]).find(x=>(x.email||"").toLowerCase().trim()===I)?.name||C?.name||I||"\u0645\u0633\u062A\u062E\u062F\u0645",M={id:e?.id||Utils.generateId("CLINIC_VISIT"),personType:m,employeeName:m==="employee"?T:null,employeeCode:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeeNumber:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeePosition:m==="employee"?document.getElementById("visit-employee-position")?.value.trim()||"":S||null,contractorPosition:S||null,employeeDepartment:m==="employee"?document.getElementById("visit-employee-department")?.value.trim()||"":null,factory:h,factoryName:v,employeeLocation:m==="employee"?b:null,contractorName:m==="contractor"?T:null,contractorWorkerName:m==="contractor"?g:null,externalName:null,workArea:b||null,visitDate:L,exitDate:k,visitType:document.getElementById("visit-type")?.value?.trim()||null,reason:document.getElementById("visit-reason").value.trim(),diagnosis:document.getElementById("visit-diagnosis").value.trim(),treatment:document.getElementById("visit-treatment").value.trim(),medications:$.length>0?$:null,createdAt:e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:e?.createdBy||_,updatedBy:_,email:I,userId:C?.id||""};Loading.show();try{const x=R=>{const B={};return(Array.isArray(R)?R:[]).forEach(V=>{const G=V&&(V.medicationId||V.id)?String(V.medicationId||V.id):"";if(!G)return;const Y=parseInt(V.quantity,10)||0;B[G]=(B[G]||0)+Y}),B},N=a?this.normalizeVisitMedications(e?.medications):[],F=x(N),P=x($),j=[];new Set([...Object.keys(F),...Object.keys(P)]).forEach(R=>{const B=(P[R]||0)-(F[R]||0);B!==0&&j.push({medicationId:R,delta:B})});const U=j.length>0,E=U?this.getMedications():[];if(U)for(const R of j){if(R.delta<=0)continue;const B=E.find(G=>String(G.id)===String(R.medicationId));if(!B)throw new Error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646");const V=parseInt(B.remainingQuantity??B.quantity??0,10)||0;if(V<R.delta){const G=B.name||B.medicationName||"\u062F\u0648\u0627\u0621";throw new Error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621: ${G}. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${V}`)}}if(a){const R=AppState.appData.clinicVisits.findIndex(B=>B.id===e.id);R!==-1&&(AppState.appData.clinicVisits[R]=M)}else AppState.appData.clinicVisits.push(M);if(U){for(const R of j){const B=E.find(ee=>String(ee.id)===String(R.medicationId));if(!B)continue;const V=parseInt(B.remainingQuantity??B.quantity??0,10)||0;if(!(typeof B.quantityAdded=="number"&&B.quantityAdded>0)&&R.delta>0){const ee=parseInt(B.quantity??0,10)||0;B.quantityAdded=Math.max(ee,V+R.delta)}let Y=V-R.delta;Y=Math.max(0,Y);const te=typeof B.quantityAdded=="number"&&B.quantityAdded>0?B.quantityAdded:typeof B.quantity=="number"&&B.quantity>0?B.quantity:null;te!==null&&(Y=Math.min(te,Y)),B.remainingQuantity=Y}AppState.appData.medications=E,AppState.appData.clinicMedications=E,AppState.appData.clinicInventory=E}try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues()}catch(R){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",R)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const R=this.getMonthlyVisitsAlertThreshold(),B=this.getMonthlyVisitCountForPerson(M);if(B>=R){const V=(M.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+V+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+R+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(M,B).catch(function(G){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",G)})}}catch(R){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",R)}Loading.hide(),Notification.success(`\u062A\u0645 ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),n.remove();const O=6e4;(async()=>{try{const R=U&&j.length>0?j.map(B=>({medicationId:String(B.medicationId),delta:Number(B.delta)||0})):null;if(a){const B={...M};R&&(B.medicationAdjustments=R);const V=await GoogleIntegration.sendRequest({action:"updateClinicVisit",data:{visitId:e.id,updateData:B,__timeoutMs:O}});this.assertClinicVisitRpcResult(V)}else{const B={...M,__timeoutMs:O};R&&(B.medicationAdjustments=R);const V=await GoogleIntegration.sendRequest({action:"addClinicVisit",data:B});this.assertClinicVisitRpcResult(V),this.applyClinicVisitIdFromServer(M,V)}U&&(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}).then(B=>{if(B&&B.success&&Array.isArray(B.data)){const V=B.data.map(G=>this.normalizeMedicationRecord(G));if(AppState.appData.medications=V,AppState.appData.clinicMedications=V,AppState.appData.clinicInventory=V,Utils.safeLog("\u2705 [CLINIC] \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0645\u064F\u062D\u062F\u064E\u0651\u062B\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+V.length+" \u062F\u0648\u0627\u0621"),this.state&&this.state.activeTab==="medications")try{this.renderMedicationsTab()}catch{}}}).catch(()=>{}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062A\u062D\u062F\u064A\u062B",data:{updated:j.length}}}))),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"clinicVisits",action:a?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:M}})),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(R){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",R);try{typeof window.DataManager<"u"&&window.DataManager.addToPendingSync&&window.DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}try{const B=R&&R.message?R.message:"\u0641\u0634\u0644 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u062A\u0623\u0643\u064A\u062F \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+B+". \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645.")}catch{}}})(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]')&&this.state.activeTab==="visits"&&this.renderVisitsTab(),U&&document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab(),document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]')&&this.state.activeTab==="dispensed-medications"&&this.renderDispensedMedicationsTab();const V=document.querySelector("#total-visits");V&&(V.textContent=AppState.appData.clinicVisits.length)},100)}catch(x){Loading.hide(),this.showVisitFormAlert("\u062D\u062F\u062B \u062E\u0637\u0623: "+(x.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),l&&(l.disabled=!1,l.innerHTML=r)}}),n.addEventListener("click",o=>{o.target===n&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n.remove()})},async showMedicationForm(e=null){this.ensureData();const t=!!e,a=document.createElement("div");a.className="modal-overlay";const s=(m="")=>Utils.escapeHTML(m||""),n=e?.purchaseDate?new Date(e.purchaseDate).toISOString().slice(0,10):"",i=e?.expiryDate?new Date(e.expiryDate).toISOString().slice(0,10):"",o=this.calculateMedicationStatus(e||{});a.innerHTML=`
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
                                <input type="text" id="med-name" required class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" value="${s(e?.name||e?.medicationName)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-type" required class="form-input" placeholder="\u062D\u0628\u0648\u0628\u060C \u0634\u0631\u0627\u0628\u060C \u062D\u0642\u0646..." value="${s(e?.type||e?.medicationType)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</label>
                                <input type="text" id="med-usage" class="form-input" placeholder="\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u062F\u0648\u0627\u0621" value="${s(e?.usage||e?.notes||"")}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 *</label>
                                <input type="date" id="med-purchase" required class="form-input" value="${n}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</label>
                                <input type="date" id="med-expiry" class="form-input" value="${i}">
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
                                <input type="text" id="med-location" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u063A\u0631\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629" value="${s(e?.location)}">
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
                            <textarea id="med-notes" class="form-input" rows="3" placeholder="\u0623\u062F\u062E\u0644 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0648 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629">${s(e?.notes)}</textarea>
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
        `,document.body.appendChild(a);const l=a.querySelector("#medication-form"),r=l.querySelector("#med-purchase"),c=l.querySelector("#med-expiry"),p=l.querySelector("#med-status-badge"),u=l.querySelector("#med-status-hint"),d=()=>{const m=this.calculateMedicationStatus({expiryDate:c.value?new Date(c.value).toISOString():null});p.className=`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(m.status)}`,p.innerHTML=`<i class="fas fa-info-circle"></i>${m.status}`,u.textContent=this.getMedicationStatusHint(m)};c?.addEventListener("change",d),l.addEventListener("submit",async m=>{m.preventDefault();const f=l.querySelector("#med-name").value.trim(),y=l.querySelector("#med-type").value.trim(),g=l.querySelector("#med-usage")?.value.trim()||"",b=l.querySelector("#med-purchase").value,S=l.querySelector("#med-expiry").value,T=parseInt(l.querySelector("#med-quantity").value,10)||0,D=parseInt(l.querySelector("#med-remaining").value,10)||0,$=l.querySelector("#med-location").value.trim(),h=l.querySelector("#med-notes").value.trim(),v=e?.createdAt||new Date().toISOString(),L=e?.createdBy||this.getCurrentUserSummary(),k=b?new Date(b).toISOString():new Date().toISOString(),C=S?new Date(S).toISOString():"",I=this.calculateMedicationStatus({expiryDate:C}),q=this.getCurrentUserSummary(),w=this.normalizeMedicationRecord({id:e?.id||Utils.generateId("MED"),name:f,type:y,usage:g,purchaseDate:k,expiryDate:C,quantityAdded:T,remainingQuantity:D,location:$,notes:h,createdAt:v,createdBy:L,createdById:L?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:q,status:I.status,daysRemaining:I.daysRemaining});Loading.show();try{const _=AppState.appData.medications||[];if(t){const M=_.findIndex(x=>x.id===w.id);M!==-1?_[M]=w:_.push(w)}else _.push(w);AppState.appData.medications=_,AppState.appData.clinicMedications=_,AppState.appData.clinicInventory=_;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(M){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u062F\u0648\u0627\u0621):",M)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.state.medicationAlertsNotified.delete(w.id),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab();const x=document.querySelector("#total-medications");x&&(x.textContent=_.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:w.id,updateData:w}}):await GoogleIntegration.sendRequest({action:"addMedication",data:w}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:w}}))}catch(M){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",M)}})()}catch(_){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+_.message)}}),a.addEventListener("click",m=>{m.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async viewVisit(e){this.ensureData();const t=AppState.appData.clinicVisits.find(u=>u.id===e);if(!t)return;t.createdBy||(t.createdBy=null),t.updatedBy||(t.updatedBy=null);const a=t.personType==="employee"?"\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",s=t.personType==="employee"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629",n=t.employeeName||t.contractorName||t.externalName||"",i=(t.personType==="contractor"||t.personType==="external")&&t.contractorWorkerName?`
                <div class="col-span-2">
                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639:</label>
                    <p class="text-gray-800">${Utils.escapeHTML(t.contractorWorkerName)}</p>
                </div>
            `:"",o=t.personType==="employee"?"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644":"\u0645\u0646\u0637\u0642\u0629 / \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",l=t.personType==="employee"?t.employeeLocation:t.workArea,r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</span>',c=t.medications&&Array.isArray(t.medications)&&t.medications.length>0?t.medications.map(u=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(u.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${u.quantity||1}</span>
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
                                        <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${a}</span>
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
                                        ${s}
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(n)}</p>
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
                                ${i?`
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!t.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof t.createdBy=="object")return Utils.escapeHTML(t.createdBy.name||t.createdBy.email||t.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const u=String(t.createdBy).trim();if(u==="\u0627\u0644\u0646\u0638\u0627\u0645"||u===""){const d=(t.email||"").toString().trim();if(d&&d!=="")return Utils.escapeHTML(d);const m=(AppState.currentUser?.email||"").toString().trim();return m&&m!==""?Utils.escapeHTML(m):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(u)})()}</p>
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
        `,document.body.appendChild(p),p.addEventListener("click",u=>{u.target===p&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&p.remove()})},printVisitsList(){const e=AppState.appData.clinicVisits.slice().reverse();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=`
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
                        ${e.map(n=>{const i=n.employeeCode||n.employeeNumber||"-",o=n.employeeName||n.contractorName||n.externalName||"",l=n.contractorWorkerName?` (${n.contractorWorkerName})`:"",r=n.employeePosition||"-",c=n.employeeLocation||n.workArea||"-",p=n.visitDate?Utils.formatDateTime(n.visitDate):"-",u=n.exitDate?Utils.formatDateTime(n.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",d=Clinic.calculateTotalTime(n.visitDate,n.exitDate),m=n.reason||"",f=n.diagnosis||"",y=n.treatment||"";return`
                <tr>
                    <td>${i}</td>
                    <td>${o}${l}</td>
                    <td>${r}</td>
                    <td>${c}</td>
                    <td>${p}</td>
                    <td>${u}</td>
                    <td>${d}</td>
                    <td>${m}</td>
                    <td>${f}</td>
                    <td>${y}</td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
                <p style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
                    \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0628\u0627\u0639\u0629: ${Utils.formatDateTime(new Date)}
                </p>
            </body>
            </html>
        `;Utils.printHtmlContent("\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",a)&&Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},exportVisitsToExcel(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),s=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),i=e==="employees"?s:n;if(i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}try{const o=i.map(p=>{const u=t?p.contractorName||p.employeeName||p.externalName||"-":p.employeeCode||p.employeeNumber||"-",d=t?p.contractorWorkerName||"-":p.employeeName||"-",m=p.employeePosition||p.contractorPosition||"-",f=this.getVisitFactoryDisplayName(p),y=t?p.workArea||p.employeeLocation||"-":p.employeeLocation||p.workArea||"-",g=p.visitDate?Utils.formatDateTime(p.visitDate):"-",b=p.exitDate?Utils.formatDateTime(p.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",S=this.calculateTotalTime(p.visitDate,p.exitDate),T=p.reason||"",D=p.diagnosis||"",$=this.normalizeVisitMedications(p.medications),h=$.length>0?$.map(k=>`${k.medicationName||""} (${k.quantity||1})`).join("\u060C "):"-",v=$.length>0?$.reduce((k,C)=>k+(parseInt(C.quantity,10)||0),0):0,L={};return L[t?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]=u,L.\u0627\u0644\u0627\u0633\u0645=d,L.\u0627\u0644\u0648\u0638\u064A\u0641\u0629=m,L.\u0627\u0644\u0645\u0635\u0646\u0639=f,L["\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"]=y,L["\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644"]=g,L["\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C"]=b,L["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A"]=S,L["\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"]=T,L.\u0627\u0644\u062A\u0634\u062E\u064A\u0635=D,L["\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=h,L["\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=v,L}),l=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(o);r["!cols"]=[{wch:18},{wch:25},{wch:20},{wch:16},{wch:20},{wch:20},{wch:20},{wch:15},{wch:25},{wch:25},{wch:30},{wch:14}],XLSX.utils.book_append_sheet(l,r,`\u0633\u062C\u0644\u0627\u062A_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}`);const c=`\u0633\u062C\u0644\u0627\u062A_\u0627\u0644\u0632\u064A\u0627\u0631\u0629_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}_\u0627\u0644\u0639\u064A\u0627\u062F\u0629_\u0627\u0644\u0637\u0628\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(l,c),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+o.message)}},async exportVisitsToPDF(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),s=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),i=e==="employees"?s:n;if(i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const o=i.map(f=>{const y=t?f.contractorName||f.employeeName||f.externalName||"-":f.employeeCode||f.employeeNumber||"-",g=t?f.contractorWorkerName||"-":f.employeeName||"-",b=t?f.contractorPosition||f.employeePosition||"-":f.employeePosition||"-",S=this.getVisitFactoryDisplayName(f),T=t?f.workArea||f.employeeLocation||"-":f.employeeLocation||f.workArea||"-",D=f.visitDate?Utils.formatDateTime(f.visitDate):"-",$=f.exitDate?Utils.formatDateTime(f.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",h=Clinic.calculateTotalTime(f.visitDate,f.exitDate),v=f.reason||"",L=f.diagnosis||"",k=this.normalizeVisitMedications(f.medications),C=k.length>0?k.map(q=>`${Utils.escapeHTML(q.medicationName||"")} (${q.quantity||1})`).join("\u060C "):"-",I=k.length>0?k.reduce((q,w)=>q+(parseInt(w.quantity,10)||0),0):0;return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(g)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(b)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(S)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(T)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(D)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML($)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(v)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(L)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${C}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${Utils.escapeHTML(String(I))}</td>
                    </tr>
                `}).join(""),l=`CLINIC-VISITS-${new Date().toISOString().slice(0,10)}`,r="\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",c=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 14px;">
                        \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A: ${i.length}
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
            `,p=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,r,c,!1,!0,{source:"ClinicVisits"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body>${c}</body></html>`,u=new Blob([p],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(u),m=window.open(d,"_blank");m?m.onload=()=>{setTimeout(()=>{m.print(),setTimeout(()=>{URL.revokeObjectURL(d)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(d),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async exportVisitToPDF(e){if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const t=e.personType==="employee"?"\u0645\u0648\u0638\u0641":e.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",a=e.employeeCode||e.employeeNumber||"-",s=e.employeeName||e.contractorName||e.externalName||"",n=e.contractorWorkerName?` (${e.contractorWorkerName})`:"",i=e.employeePosition||e.contractorPosition||"-",o=e.employeeLocation||e.workArea||"-",l=e.visitDate?Utils.formatDateTime(e.visitDate):"-",r=e.exitDate?Utils.formatDateTime(e.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",c=this.calculateTotalTime(e.visitDate,e.exitDate),p=e.reason||"",u=e.diagnosis||"",d=e.treatment||"",m=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map($=>`${Utils.escapeHTML($.medicationName||"")} (${$.quantity||1})`).join("\u060C "):"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",f=`CLINIC-VISIT-${e.id||new Date().toISOString().slice(0,10)}`,y="\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",g=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px;">
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6; width: 30%;">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; width: 70%;">${Utils.escapeHTML(t)}</td>
                    </tr>
                    ${a!=="-"?`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(a)}</td>
                    </tr>
                    `:""}
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0627\u0633\u0645</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(s)}${Utils.escapeHTML(n)}</td>
                    </tr>
                    ${i!=="-"?`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(i)}</td>
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
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(u)}</td>
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
            `,b=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(f,y,g,!1,!0,{source:"ClinicVisit"},e.visitDate||e.createdAt||new Date().toISOString(),e.updatedAt||e.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${y}</title></head><body>${g}</body></html>`,S=new Blob([b],{type:"text/html;charset=utf-8"}),T=URL.createObjectURL(S),D=window.open(T,"_blank");D?D.onload=()=>{setTimeout(()=>{D.print(),setTimeout(()=>{URL.revokeObjectURL(T)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(T),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(t){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message)}},async ensureApprovalsDataLoaded({force:e=!1}={}){return this._approvalsLoadPromise&&!e?this._approvalsLoadPromise:(this._approvalsLoadPromise=(async()=>{if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){this._approvalsBackendFetchOk=!0;return}const a=GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}),s=GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}),n=GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}),i=GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}}),[o,l,r,c]=await Promise.allSettled([Utils.promiseWithTimeout(a,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),Utils.promiseWithTimeout(s,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C"),Utils.promiseWithTimeout(n,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"),Utils.promiseWithTimeout(i,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A")]),p=o.status==="fulfilled"?o.value:null,u=l.status==="fulfilled"?l.value:null,d=r.status==="fulfilled"?r.value:null,m=c.status==="fulfilled"?c.value:null,f=Array.isArray(p?.data)?p.data:[],y=Array.isArray(u?.data)?u.data:[],g=Array.isArray(d?.data)?d.data:[],b=Array.isArray(m?.data)?m.data:[];(f.length>0||!(Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0))&&(AppState.appData.clinicMedicationDeletionRequests=f),(y.length>0||!(Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0))&&(AppState.appData.clinicSupplyRequests=y),(g.length>0||!(Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0))&&(AppState.appData.clinicVisitDeletionRequests=g),(b.length>0||!(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0)||c.status==="fulfilled"&&m&&m.success!==!1)&&(AppState.appData.clinicStaffTimeOffRequests=b);try{localStorage.setItem("clinic_approvals_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(S){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic approvals: \u0641\u0634\u0644 DataManager.save \u0628\u0639\u062F \u062C\u0644\u0628 \u0627\u0644\u0640 approvals:",S)}this._approvalsBackendFetchOk=!0})().finally(()=>{this._approvalsLoadPromise=null}),this._approvalsLoadPromise)},async renderApprovalsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="approvals"]');if(!e){Utils.safeError("\u274C \u0644\u0648\u062D\u0629 approvals \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}e.innerHTML='<div class="text-center py-8"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="mt-2">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0636\u064A\u0631...</p></div>';try{const t=(()=>{try{return localStorage.getItem("clinic_approvals_last_sync")}catch{return null}})(),a=t?Date.now()-parseInt(t,10):1/0,s=300*1e3,n=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0,i=Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0,o=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0,l=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0,r=n||i||o||l,c=a>=s;if(!c&&r&&(this._approvalsBackendFetchOk=!0),(c||!r||this._approvalsBackendFetchOk!==!0||!l)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const I=async()=>{await this.ensureApprovalsDataLoaded({force:c&&r})};r?I().then(()=>{try{this.state&&this.state.activeTab==="approvals"&&this.renderApprovalsTab()}catch{}}).catch(()=>{}):await Promise.race([I(),new Promise(q=>setTimeout(q,6e3))])}const u=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],d=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],m=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],f=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],y=u.map(I=>({...I,requestType:"deletion"})),g=d.map(I=>({...I,requestType:"supply"})),b=m.map(I=>({...I,requestType:"visit"})),S=f.map(I=>({...I,approvalKind:"timeoff"})),T=[...y,...g,...b,...S];Utils.safeLog(`\u{1F4CB} \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${y.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621 \u0648 ${g.length} \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C \u0648 ${b.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 \u0648 ${S.length} \u0637\u0644\u0628 \u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A`);const D=T.filter(I=>I.status==="pending"),$=T.filter(I=>I.status==="approved"),h=T.filter(I=>I.status==="rejected"),v=document.getElementById("pending-approvals-badge");if(v){const I=D.length;I>0?(v.textContent=I,v.style.display="inline-block"):v.style.display="none"}e.innerHTML=`
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
                                <p class="text-2xl font-bold">${D.length}</p>
                            </div>
                            <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <i class="fas fa-check text-3xl text-green-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</p>
                                <p class="text-2xl font-bold">${$.length}</p>
                            </div>
                            <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                                <i class="fas fa-times text-3xl text-red-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0645\u0631\u0641\u0648\u0636\u0629</p>
                                <p class="text-2xl font-bold">${h.length}</p>
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
                            ${this.renderApprovalsTable(D)}
                        </div>
                    </div>
                </div>
            `;const L=document.getElementById("approvals-status-filter"),k=document.getElementById("approvals-type-filter"),C=()=>{const I=L?.value||"all",q=k?.value||"all";let w=T;I!=="all"&&(w=w.filter(M=>M.status===I)),q!=="all"&&(w=w.filter(M=>this._approvalRequestMatchesTypeFilter(M,q)));const _=document.getElementById("approvals-table-container");_&&(_.innerHTML=this.renderApprovalsTable(w),this.bindApprovalsEvents())};L&&L.addEventListener("change",C),k&&k.addEventListener("change",C),this.bindApprovalsEvents(),setTimeout(()=>{const I=e.querySelector(".clinic-table-wrapper");I&&this.setupTableScrollListeners(I)},100)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",t),e.innerHTML='<div class="alert alert-error">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>'}},renderApprovalsTable(e){return!e||e.length===0?'<div class="text-center py-8 text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':`
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
                        ${e.map(a=>{const s=a.approvalKind||a.requestType||"deletion",n=s==="deletion",i=s==="supply",o=s==="visit",l=this._isApprovalTimeOffRequest(a);let r="-",c="-",p="";if(n){const y=a.medicationData||{};r=y.name||"-",c=y.type||"-",p=`\u0627\u0644\u062F\u0648\u0627\u0621: ${Utils.escapeHTML(r)}`}else if(i){r=a.itemName||"-";const y={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[a.type]||a.type||"-";c=y,p=`${y}: ${Utils.escapeHTML(r)} (${a.quantity||""} ${Utils.escapeHTML(a.unit||"")})`}else if(o){const y=a.visitData||{},g=y.employeeName||y.contractorWorkerName||y.contractorName||y.externalName||"-",b=y.personType==="employee"?"\u0645\u0648\u0638\u0641":y.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629";r=g,c=b,p=`\u0632\u064A\u0627\u0631\u0629: ${Utils.escapeHTML(g)} (${Utils.escapeHTML(b)})`}else l&&(r=a.userName||a.userEmail||"-",c=this.getTimeOffRequestTypeLabel(a.requestType),p=`${Utils.escapeHTML(c)}: ${Utils.escapeHTML(this.formatTimeOffRequestDetails(a))}`);const u=l?{name:a.userName||a.userEmail||"-"}:a.requestedBy||{},d=this.getApprovalStatusBadge(a.status),m=a.status==="pending";return`
                <tr>
                    <td>${n?'<span class="badge badge-info">\u062D\u0630\u0641 \u062F\u0648\u0627\u0621</span>':i?'<span class="badge badge-primary">\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C</span>':l?'<span class="badge badge-success">\u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A</span>':'<span class="badge badge-warning">\u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629</span>'}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${Utils.escapeHTML(c)}</td>
                    <td>${Utils.escapeHTML(u.name||"-")}</td>
                    <td>${this.formatDate(a.createdAt||a.requestDate,!0)}</td>
                    <td>${d}</td>
                    <td>
                        <div class="flex gap-2 justify-center">
                            ${m?`
                                <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${a.id}" data-type="${s}" title="\u0645\u0648\u0627\u0641\u0642\u0629">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${a.id}" data-type="${s}" title="\u0631\u0641\u0636">
                                    <i class="fas fa-times"></i>
                                </button>
                            `:""}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${a.id}" data-type="${s}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},getApprovalStatusBadge(e){switch(e){case"pending":return'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>';case"approved":return'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>';case"rejected":return'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>';default:return'<span class="badge badge-secondary">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}},bindApprovalsEvents(){document.querySelectorAll('[data-action="approve-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),a=e.getAttribute("data-type")||"deletion";this.approveRequest(t,a)})}),document.querySelectorAll('[data-action="reject-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),a=e.getAttribute("data-type")||"deletion";this.rejectRequest(t,a)})}),document.querySelectorAll('[data-action="view-request"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),a=e.getAttribute("data-type")||"deletion";this.viewRequestDetails(t,a)})})},async approveRequest(e,t="deletion"){const a=t==="deletion",s=t==="supply",n=t==="visit",i=t==="timeoff";if(confirm(a?`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062F\u0648\u0627\u0621\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`:s?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F":i?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A\u061F":`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F.`)){Loading.show();try{const r={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let c;if(a?c=await GoogleIntegration.sendRequest({action:"approveMedicationDeletion",data:{requestId:e,approverData:r}}):s?c=await GoogleIntegration.sendRequest({action:"approveSupplyRequest",data:{requestId:e,approverData:r,__timeoutMs:45e3}}):n?c=await GoogleIntegration.sendRequest({action:"approveClinicVisitDeletion",data:{requestId:e,approverData:r}}):i&&(c=await GoogleIntegration.sendRequest({action:"approveClinicStaffTimeOffRequest",data:{requestId:e,notes:""}})),c&&c.success){Loading.hide();const p=a?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0648\u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":s?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D":i?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A":"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D";if(Notification.success(p),i)try{const u=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});u?.success&&Array.isArray(u.data)&&(AppState.appData.clinicStaffTimeOffRequests=u.data),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0}catch{}setTimeout(()=>{this.renderApprovalsTab()},100),a&&(async()=>{try{const u=await GoogleIntegration.sendRequest({action:"getAllMedications",data:{}});u&&u.success&&(AppState.appData.medications=u.data,AppState.appData.clinicMedications=u.data,AppState.appData.clinicInventory=u.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(u){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",u)}})()}else throw new Error(c.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629: "+(r.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async rejectRequest(e,t="deletion"){const a=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(a!==null){Loading.show();try{const s={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let n;if(t==="deletion"?n=await GoogleIntegration.sendRequest({action:"rejectMedicationDeletion",data:{requestId:e,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="supply"?n=await GoogleIntegration.sendRequest({action:"rejectSupplyRequest",data:{requestId:e,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="visit"?n=await GoogleIntegration.sendRequest({action:"rejectClinicVisitDeletion",data:{requestId:e,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="timeoff"&&(n=await GoogleIntegration.sendRequest({action:"rejectClinicStaffTimeOffRequest",data:{requestId:e,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}})),n&&n.success){if(Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),t==="timeoff")try{const i=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});i?.success&&Array.isArray(i.data)&&(AppState.appData.clinicStaffTimeOffRequests=i.data)}catch{}setTimeout(()=>{this.renderApprovalsTab()},100)}else throw new Error(n.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636: "+(s.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async viewRequestDetails(e,t="deletion"){try{let a;if(t==="deletion"?a=await GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}):t==="supply"?a=await GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}):t==="visit"?a=await GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}):t==="timeoff"&&(a=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}})),!a||!a.success){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628");return}const s=a.data.find(d=>d.id===e);if(!s){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const n=t==="deletion",i=t==="visit",o=t==="timeoff",l=o?{name:s.userName||s.userEmail||"-"}:s.requestedBy||{},r=s.approvedBy||{},c=s.rejectedBy||{};let p="";if(n){const d=s.medicationData||{};p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(d.name||"-")}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(d.type||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${Utils.escapeHTML(d.quantity||"-")}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(d.location||"-")}</div>
                        </div>
                    </div>
                `}else if(i){const d=s.visitData||{},m=d.employeeName||d.contractorWorkerName||d.contractorName||d.externalName||"-",f=d.personType==="employee"?"\u0645\u0648\u0638\u0641":d.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",y=d.visitDate?Utils.formatDateTime(d.visitDate):"-",g=d.exitDate?Utils.formatDateTime(d.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647";p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(m)}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(f)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:</strong> ${Utils.escapeHTML(y)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:</strong> ${Utils.escapeHTML(g)}</div>
                            <div><strong>\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</strong> ${Utils.escapeHTML(d.reason||"-")}</div>
                            <div><strong>\u0627\u0644\u062A\u0634\u062E\u064A\u0635:</strong> ${Utils.escapeHTML(d.diagnosis||"-")}</div>
                        </div>
                        <div class="mt-3">
                            <button class="btn-secondary" onclick="Clinic.viewVisit('${Utils.escapeHTML(d.id||s.visitId||"")}')">
                                <i class="fas fa-eye ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </button>
                        </div>
                    </div>
                `}else if(o)p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 ${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(s.requestType))}:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0645\u0633\u0626\u0648\u0644:</strong> ${Utils.escapeHTML(s.userName||"-")}</div>
                            <div><strong>\u0627\u0644\u062F\u0648\u0631:</strong> ${Utils.escapeHTML(this.getStaffRoleLabel(s.staffRole))}</div>
                            <div><strong>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</strong> ${Utils.escapeHTML(this.formatTimeOffRequestDetails(s))}</div>
                            <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getTimeOffStatusBadge(s.status)}</div>
                            <div class="col-span-2"><strong>\u0627\u0644\u0633\u0628\u0628:</strong> ${Utils.escapeHTML(s.reason||"-")}</div>
                            ${s.reviewNotes?`<div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:</strong> ${Utils.escapeHTML(s.reviewNotes)}</div>`:""}
                        </div>
                    </div>
                `;else{const d={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[s.type]||s.type||"-",m={urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[s.priority]||"\u0639\u0627\u062F\u064A\u0629";p=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0637\u0644\u0628:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</strong> ${Utils.escapeHTML(d)}</div>
                            <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631:</strong> ${Utils.escapeHTML(s.itemName||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${s.quantity||"-"} ${Utils.escapeHTML(s.unit||"")}</div>
                            <div><strong>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</strong> ${Utils.escapeHTML(m)}</div>
                            ${s.notes?`
                                <div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(s.notes)}</div>
                            `:""}
                        </div>
                    </div>
                `}const u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
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
                                    <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628:</strong> ${this.formatDate(s.createdAt||s.requestDate,!0)}</div>
                                    <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getApprovalStatusBadge(s.status)}</div>
                                </div>
                            </div>
                            ${s.status==="approved"?`
                                <div>
                                    <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</h3>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div><strong>\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(r.name||"-")}</div>
                                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:</strong> ${this.formatDate(s.approvedAt,!0)}</div>
                                    </div>
                                </div>
                            `:""}
                            ${s.status==="rejected"?`
                                <div>
                                    <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0631\u0641\u0636:</h3>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div><strong>\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(c.name||"-")}</div>
                                        <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636:</strong> ${this.formatDate(s.rejectedAt,!0)}</div>
                                        ${s.rejectionReason?`
                                            <div class="col-span-2"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:</strong> ${Utils.escapeHTML(s.rejectionReason)}</div>
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
            `,document.body.appendChild(u),u.querySelectorAll(".modal-close, .modal-close-btn").forEach(d=>{d.addEventListener("click",()=>u.remove())}),u.addEventListener("click",d=>{d.target===u&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&u.remove()})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}},refreshOnLanguageChange(){if(this.state&&this.state.initialized)try{this.renderActiveTabContent()}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0644\u063A\u0629:",e)}},_injectClinicAttendanceIdentityStyles(){try{if(document.getElementById("clinic-attendance-identity-styles"))return;const e=document.createElement("style");e.id="clinic-attendance-identity-styles",e.textContent=`
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
            `,document.head.appendChild(e)}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0642\u0646 \u0647\u0648\u064A\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e)}},async load(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629...");const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u0639\u0631\u0651\u0641 - \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"),e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>';return}if(AppState.appData||(AppState.appData={}),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.injectTableScrollbarStyles(),this._injectClinicAttendanceIdentityStyles(),this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.refreshOnLanguageChange()}),window.addEventListener("storage",t=>{t.key==="language"&&t.newValue!==t.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0),this._syncCompletedListenerAdded||(window.addEventListener("syncDataCompleted",t=>{const{sheets:a}=t.detail||{};a&&(a.includes("ClinicVisits")||a.includes("ClinicContractorVisits")||a.includes("clinicVisits"))&&(this.ensureData(),this.state&&this.state.activeTab==="visits"&&(this.scheduleVisitsTabRender(!1,0),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")))}),this._syncCompletedListenerAdded=!0);try{this.ensureData();const t=localStorage.getItem("clinic_last_sync"),a=t?Date.now()-parseInt(t):1/0,s=600*1e3,n=this.hasValidLocalData(),i=!this.state.initialized;i&&this.state.activeTab==="medications"&&this.hasTabAccess("visits")&&(this.state.activeTab="visits"),this.renderUI(),setTimeout(()=>{this._userNeedsClinicStaffForAttendance()&&!this.isActiveClinicStaffMember()&&this._ensureClinicStaffLoadedForAttendance().then(r=>{r&&this._refreshAttendanceTabNavAfterStaffLoad()}).catch(()=>{}),this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1).catch(()=>{}),i||!n||a>=s?(Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629)..."),Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A").then(()=>{if(localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.state&&this.state.activeTab==="visits"?this.scheduleVisitsTabRender(!1,0):(this.renderUI(),this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab()&&this.scheduleAttendanceTabRender(0)),typeof Utils<"u"&&Utils.safeLog&&AppState.appData){const r=(AppState.appData.clinicVisits||[]).length,c=(AppState.appData.clinicMedications||AppState.appData.medications||[]).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D: ${r} \u0632\u064A\u0627\u0631\u0629\u060C ${c} \u062F\u0648\u0627\u0621`)}}).catch(r=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r&&r.message)}).finally(()=>{this.state.initialized=!0})):(Utils.safeLog("\u2705 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B - \u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"),this.syncDataInBackground(),this.state.initialized=!0)},80)}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",t),this.hasValidLocalData()&&(this.renderUI(),Utils.safeLog("\u2705 \u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u062E\u0637\u0623")),this.state.initialized||Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629")}finally{Loading.hide()}},hasValidLocalData(){const e=AppState.appData;if(!e)return!1;const t=e.medications||e.clinicMedications||[],a=e.sickLeave||[],s=e.injuries||[],n=e.clinicVisits||[];return t.length>0||a.length>0||s.length>0||n.length>0},async syncDataFromServer(){const e=[],s=(n,i,o)=>Utils.promiseWithTimeout(n,i,()=>new Error(`Request timeout for ${o}`));e.push(s(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}),45e3,"medications").then(n=>{if(n&&n.success&&Array.isArray(n.data)){const i=n.data.map(o=>this.normalizeMedicationRecord(o));AppState.appData.medications=i,AppState.appData.clinicMedications=i,AppState.appData.clinicInventory=i,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u062F\u0648\u0627\u0621`)}}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",n.message)})),e.push(s(GoogleIntegration.sendRequest({action:"getAllSickLeaves",data:{}}),45e3,"sickLeave").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.sickLeave=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",n.message)})),e.push(s(GoogleIntegration.sendRequest({action:"getAllInjuries",data:{}}),45e3,"injuries").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.injuries=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u0635\u0627\u0628\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",n.message)})),this.shouldFetchClinicVisitsFromBackend()?e.push(s(this.loadVisitsDataFromBackend(),12e4,"clinicVisits").then(()=>{const n=AppState.appData.clinicVisits||[];Utils.safeLog(`\u2705 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F: ${n.length} \u0632\u064A\u0627\u0631\u0629 (${n.filter(i=>i.personType==="employee"||!i.personType).length} \u0645\u0648\u0638\u0641\u060C ${n.filter(i=>i.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644)`)}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",n.message)})):AppState.debugMode&&Utils.safeLog("\u2139\uFE0F \u062A\u062E\u0637\u064A \u062C\u0644\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u0624\u0643\u062F\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645");try{await Promise.allSettled(e)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",n.message)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{this.ensureData(),window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F syncDataFromServer")}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n.message)}},async syncDataInBackground(){try{Utils.safeLog("\u{1F504} \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629..."),await Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,()=>new Error("Background sync timeout")),localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.hasValidLocalData()&&(this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state&&this.state.activeTab==="attendance"&&this.renderAttendanceTab(),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"))}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",e.message),Utils.safeLog("\u2139\uFE0F \u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629")}},async refresh(){Utils.safeLog("\u{1F504} \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629..."),Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),await this.load(),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},getClinicStaffList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaff)?AppState.appData.clinicStaff:[]},getClinicStaffAttendanceList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffAttendance)?AppState.appData.clinicStaffAttendance:[];return e=this._mergeAttendanceRowsByUserDay(e),this.canViewAllAttendanceData()||(e=e.filter(t=>this._attendanceRowBelongsToCurrentUser_(t))),e},getClinicStaffTimeOffRequestsList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];if(!this.canViewAllAttendanceData()){const t=AppState.currentUser,a=String(t?.id||"").trim(),s=String(t?.email||"").trim().toLowerCase();e=e.filter(n=>a&&String(n.userId||"")===a||s&&String(n.userEmail||"").trim().toLowerCase()===s)}return e},getClinicStaffSystemActivitiesList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaffSystemActivities)?AppState.appData.clinicStaffSystemActivities:[]},getFilteredClinicStaffActivities(){let e=this.getClinicStaffSystemActivitiesList().slice();const t=this.state.filters?.attendance||{},a=this._resolveAttendanceFilterDates(t);if(a.dateFrom&&(e=e.filter(s=>s.timestamp&&this._attendanceDayKey(s.timestamp)>=a.dateFrom)),a.dateTo&&(e=e.filter(s=>s.timestamp&&this._attendanceDayKey(s.timestamp)<=a.dateTo)),t.activityModule&&t.activityModule!=="all"&&(e=e.filter(s=>String(s.moduleKey)===String(t.activityModule))),this.canViewAllAttendanceData()&&t.staffId&&t.staffId!=="all"){const s=(this.getClinicStaffList()||[]).find(n=>String(n.id)===String(t.staffId));if(s){const n=String(s.userId||"").trim(),i=String(s.userEmail||"").trim().toLowerCase(),o=String(s.userName||"").trim().toLowerCase();e=e.filter(l=>n&&String(l.userId||"")===n||i&&String(l.userEmail||"").trim().toLowerCase()===i||o&&String(l.userName||"").trim().toLowerCase()===o)}}return e.sort((s,n)=>new Date(n.timestamp||0)-new Date(s.timestamp||0))},getClinicStaffActivityModuleIcon(e){return{ptw:"fa-id-card",clinic:"fa-clinic-medical",training:"fa-chalkboard-teacher",incidents:"fa-exclamation-triangle",nearmiss:"fa-exclamation-circle",observations:"fa-eye",violations:"fa-gavel",system:"fa-cogs"}[String(e||"").trim()]||"fa-circle"},renderClinicStaffActivitiesSection({showUserColumn:e=!1,activities:t=[],loading:a=!1,title:s="\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"}={}){const n=[{value:"all",label:"\u0643\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629"},{value:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{value:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{value:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{value:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{value:"observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"},{value:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{value:"system",label:"\u0627\u0644\u0646\u0638\u0627\u0645"}],i=this.state.filters?.attendance?.activityModule||"all",o=a?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637...":this._clinicStaffActivitiesFetched?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629":'\u0627\u0636\u063A\u0637 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <i class="fas fa-sync-alt"></i> \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 (\u0644\u0627 \u064A\u064F\u062D\u0645\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0641\u0627\u0638\u0627\u064B \u0639\u0644\u0649 \u0633\u0631\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F)',l=t.length?t.map(r=>`
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
                    <h4 class="card-title" style="margin:0;"><i class="fas fa-history ml-2"></i>${Utils.escapeHTML(s)} (${t.length})</h4>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <select id="clinic-activity-module-filter" class="form-input" style="min-width:160px;padding:6px 10px;font-size:0.82rem;">
                            ${n.map(r=>`<option value="${Utils.escapeAttr(r.value)}" ${i===r.value?"selected":""}>${Utils.escapeHTML(r.label)}</option>`).join("")}
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
            </div>`},bindClinicStaffActivitiesEvents(e){e&&(e.querySelector("#clinic-activity-module-filter")?.addEventListener("change",t=>{this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{activityModule:t.target.value||"all"}),this.renderAttendanceTab({force:!0})}),e.querySelector("#clinic-activity-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637..."),await this.loadClinicStaffActivities(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637")}))},_parseActivityCreatorFromRecord_(e){if(!e)return{userId:"",email:"",name:""};let t=String(e.createdById||e.userId||"").trim(),a=String(e.userEmail||"").trim().toLowerCase(),s=String(e.userName||"").trim();const n=e.createdBy;return n&&typeof n=="object"?(t=t||String(n.id||n.userId||"").trim(),s=s||String(n.name||n.displayName||"").trim(),a=a||String(n.email||"").trim().toLowerCase()):n&&(s=s||String(n).trim()),{userId:t,email:a,name:s}},_activityCreatorMatchesUser_(e,t){if(!e||!t)return!1;const a=String(t.id||"").trim(),s=String(t.email||"").trim().toLowerCase(),n=String(t.name||"").trim().toLowerCase();return!!(a&&e.userId&&a===e.userId||s&&e.email&&s===e.email||n&&e.name&&n===String(e.name).trim().toLowerCase())},_activityCreatorMatchesStaff_(e,t){if(!e||!t)return!1;const a=String(t.userId||"").trim(),s=String(t.userEmail||"").trim().toLowerCase(),n=String(t.userName||"").trim().toLowerCase();return!!(a&&e.userId&&a===e.userId||s&&e.email&&s===e.email||n&&e.name&&n===String(e.name).trim().toLowerCase())},_buildLocalClinicVisitActivities_(e){e=e||{};const t=Array.isArray(AppState.appData?.clinicVisits)?AppState.appData.clinicVisits:[],a=AppState.currentUser,s=this.canViewAllAttendanceData();let n=null;s&&e.staffId&&(n=(this.getClinicStaffList()||[]).find(r=>String(r.id)===String(e.staffId))||null);const i=e.dateFrom?this._attendanceDayKey(e.dateFrom):null,o=e.dateTo?this._attendanceDayKey(e.dateTo):null,l=e.moduleKey||"all";return l!=="all"&&l!=="clinic"?[]:t.filter(r=>{if(!r)return!1;const c=this._parseActivityCreatorFromRecord_(r);if(s){if(n&&!this._activityCreatorMatchesStaff_(c,n))return!1}else if(!this._activityCreatorMatchesUser_(c,a))return!1;const p=r.createdAt||r.visitDate||"";if(p){const u=this._attendanceDayKey(p);if(i&&u<i||o&&u>o)return!1}else if(i||o)return!1;return!0}).map(r=>{const c=r.personType==="contractor"||r.contractorName||r.contractorWorkerName||r.externalName,p=this._parseActivityCreatorFromRecord_(r),u=c?String(r.contractorWorkerName||r.externalName||r.contractorName||r.visitType||r.id||"").slice(0,120):String(r.employeeName||r.visitType||r.reason||r.id||"").slice(0,120);return{id:"local-visit-"+r.id,recordId:r.id||"",moduleKey:"clinic",moduleLabel:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",actionLabel:c?"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0648\u0638\u0641",summary:u,timestamp:r.createdAt||r.visitDate||"",userId:p.userId||"",userEmail:p.email||"",userName:p.name||this.getUserDisplayName(r.createdBy)||"",sheet:"ClinicVisits-local"}})},_mergeClinicStaffActivities_(e){const t=new Map;return(e||[]).flat().forEach(a=>{!a||!a.id||t.has(a.id)||t.set(a.id,a)}),Array.from(t.values()).sort((a,s)=>new Date(s.timestamp||0)-new Date(a.timestamp||0))},_userNeedsClinicStaffForAttendance(){return this.isCurrentUserAdmin()||typeof Permissions>"u"||typeof Permissions.hasDetailedPermission!="function"?!1:Permissions.hasDetailedPermission("clinic","attendance")},async _ensureClinicStaffLoadedForAttendance(){return this._clinicStaffPreloadPromise?this._clinicStaffPreloadPromise:(this._clinicStaffPreloadPromise=(async()=>{try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const e=await GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}});if(e?.success&&Array.isArray(e.data)&&(AppState.appData.clinicStaff=e.data,this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save))try{window.DataManager.save()}catch{}return this.canAccessAttendanceTab()}catch{return!1}finally{this._clinicStaffPreloadPromise=null}})(),this._clinicStaffPreloadPromise)},_refreshAttendanceTabNavAfterStaffLoad(){const e=document.getElementById("clinic-section");if(!e||!this.canAccessAttendanceTab())return;if(!e.querySelector('.clinic-tab-btn[data-tab="attendance"]')){this.renderUI();return}this.state?.activeTab==="attendance"&&this.scheduleAttendanceTabRender(0)},_getDefaultTimeOffFormDraft(){return{requestType:"",reason:"",dateFrom:"",dateTo:"",permDate:"",otDate:"",timeFrom:"",timeTo:"",durationHours:""}},_saveTimeOffFormDraftFromDom(){this.state||(this.state={}),document.getElementById("timeoff-request-form")&&(this.state.timeOffFormDraft={requestType:document.getElementById("timeoff-request-type")?.value||"",reason:document.getElementById("timeoff-reason")?.value||"",dateFrom:document.getElementById("timeoff-date-from")?.value||"",dateTo:document.getElementById("timeoff-date-to")?.value||"",permDate:document.getElementById("timeoff-perm-date")?.value||"",otDate:document.getElementById("timeoff-ot-date")?.value||"",timeFrom:document.getElementById("timeoff-time-from")?.value||"",timeTo:document.getElementById("timeoff-time-to")?.value||"",durationHours:document.getElementById("timeoff-duration-hours")?.value||""})},_applyTimeOffFormDraftToPanel(e){const t=this.state?.timeOffFormDraft;if(!t||!e)return;const a=(s,n)=>{const i=e.querySelector("#"+s);i&&n!=null&&n!==""&&(i.value=n)};a("timeoff-request-type",t.requestType),a("timeoff-reason",t.reason),a("timeoff-date-from",t.dateFrom),a("timeoff-date-to",t.dateTo),a("timeoff-perm-date",t.permDate),a("timeoff-ot-date",t.otDate),a("timeoff-time-from",t.timeFrom),a("timeoff-time-to",t.timeTo),a("timeoff-duration-hours",t.durationHours)},_isTimeOffFormDraftDirty(){const e=this.state?.timeOffFormDraft;return e?!!(e.requestType||String(e.reason||"").trim()||e.dateFrom||e.dateTo||e.permDate||e.otDate||e.timeFrom||e.timeTo||e.durationHours):!1},_shouldDeferAttendanceRender(){return this._timeOffFormSubmitting||this._timeOffFormFocused?!0:this._isTimeOffFormDraftDirty()},_flushDeferredAttendanceRender(){!this._attendanceRenderPending||this.state?.activeTab!=="attendance"||this._shouldDeferAttendanceRender()||(this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0}))},async showTimeOffRequestModal(){try{const e=document.getElementById("clinic-timeoff-request-modal");e&&e.remove(),this._saveTimeOffFormDraftFromDom();const t=this.state?.timeOffFormDraft,a=document.createElement("div");a.id="clinic-timeoff-request-modal",a.className="modal-overlay active",a.style.zIndex="10060",a.innerHTML=`
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
                </div>`,document.body.appendChild(a),this._bindTimeOffFormPanelEvents(a),a.querySelectorAll("[data-timeoff-close]").forEach(s=>s.addEventListener("click",()=>a.remove())),a.querySelector(".modal-close").addEventListener("click",()=>a.remove()),a.addEventListener("click",s=>{s.target===a&&a.remove()}),a.querySelector("#clinic-timeoff-submit-btn").addEventListener("click",()=>{const s=a.querySelector("#timeoff-request-form");s&&s.reportValidity&&s.reportValidity()&&s.submit()})}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0637\u0644\u0628 \u062C\u062F\u064A\u062F:",e)}},_bindTimeOffFormPanelEvents(e){const t=e.querySelector("#timeoff-request-form");if(!t)return;const a=e.querySelector("#timeoff-request-type"),s=e.querySelector("#timeoff-leave-dates"),n=e.querySelector("#timeoff-permission-fields"),i=e.querySelector("#timeoff-overtime-fields"),o=()=>{const r=a?.value||"";s?.classList.toggle("hidden",r!=="leave"),n?.classList.toggle("hidden",r!=="permission"),i?.classList.toggle("hidden",r!=="overtime")},l=()=>this._saveTimeOffFormDraftFromDom();a?.addEventListener("change",()=>{o(),l()}),t.querySelectorAll("input, textarea, select").forEach(r=>{r.addEventListener("input",l),r.addEventListener("change",l)}),t.addEventListener("focusin",()=>{this._timeOffFormFocused=!0}),t.addEventListener("focusout",()=>{setTimeout(()=>{t.contains(document.activeElement)||(this._timeOffFormFocused=!1,this._flushDeferredAttendanceRender())},120)}),o(),t.addEventListener("submit",r=>{r.preventDefault(),this.submitTimeOffRequest()})},_scheduleAttendanceDataLoadIfNeeded(e){if(this._attendanceDataLoadPromise)return;const t=Array.isArray(AppState.appData?.clinicStaff)&&AppState.appData.clinicStaff.length>0,a=Array.isArray(AppState.appData?.clinicStaffAttendance)&&AppState.appData.clinicStaffAttendance.length>0,s=this.canViewAllAttendanceData();if(!(!e&&this._attendanceDataFetchedInSession===!0&&(!s||t&&a))){if(!e&&!s&&t&&a){this._attendanceDataFetchedInSession=!0;return}this._attendanceDataLoadPromise=this.loadClinicAttendanceData(!!e).then(n=>{n&&(this._attendanceDataFetchedInSession=!0),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._attendanceDataLoadPromise=null})}},_isAttendanceDataLoading(){return!!this._attendanceDataLoadPromise},_renderAttendanceTableLoadingRow(e,t){const a=Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");return`<tr><td colspan="${e}" class="text-center text-gray-500 py-10">
            <i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>${a}
        </td></tr>`},async loadClinicStaffActivities(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest||this.state?.activeTab&&this.state.activeTab!=="attendance")return;const t=Array.isArray(AppState.appData?.clinicStaffSystemActivities)&&AppState.appData.clinicStaffSystemActivities.length>0;if(!e&&t)return;if(this._clinicStaffActivitiesLoading=!0,this._clinicVisitsLoadPromise)try{await this._clinicVisitsLoadPromise}catch{}await new Promise(o=>setTimeout(o,800));const a=this.state.filters?.attendance||{},s=this._resolveAttendanceFilterDates(a),n={limit:200,dateFrom:s.dateFrom||"",dateTo:s.dateTo||"",moduleKey:a.activityModule&&a.activityModule!=="all"?a.activityModule:""};a.staffId&&a.staffId!=="all"&&this.canViewAllAttendanceData()&&(n.staffId=a.staffId);const i=this._buildLocalClinicVisitActivities_(n);try{const o=await GoogleIntegration.sendRequest({action:"getClinicStaffSystemActivities",data:{filters:n}}),l=o?.success&&Array.isArray(o.data)?o.data:[];AppState.appData.clinicStaffSystemActivities=this._mergeClinicStaffActivities_([i,l]).slice(0,n.limit||200),this._clinicStaffActivitiesFetched=!0}catch{i.length&&(AppState.appData.clinicStaffSystemActivities=i,this._clinicStaffActivitiesFetched=!0)}finally{this._clinicStaffActivitiesLoading=!1}},getCurrentUserStaffRecord(){const e=AppState.currentUser;if(!e)return null;const t=String(e.id||"").trim(),a=String(e.email||"").trim().toLowerCase();return(this.getClinicStaffList()||[]).find(s=>{const n=String(s.userId||s.id||"").trim(),i=String(s.userEmail||"").trim().toLowerCase();return t&&n===t||a&&i===a})||null},isActiveClinicStaffMember(){const e=this.getCurrentUserStaffRecord();return e?String(e.isActive||"true").toLowerCase()!=="false":!1},canAccessAttendanceTab(){return this.isCurrentUserAdmin()?!0:typeof Permissions<"u"&&!Permissions.hasDetailedPermission("clinic","attendance")?!1:this.isActiveClinicStaffMember()},canViewAllAttendanceData(){return this.isCurrentUserAdmin()},_attendanceRowBelongsToCurrentUser_(e){const t=AppState.currentUser;if(!t||!e)return!1;const a=String(t.id||"").trim(),s=String(t.email||"").trim().toLowerCase(),n=this.getCurrentUserStaffRecord();return!!(n&&n.id&&String(e.staffId)===String(n.id)||a&&String(e.userId||"")===a||s&&String(e.userEmail||"").trim().toLowerCase()===s)},getTimeOffRequestTypeLabel(e){return{leave:"\u0625\u062C\u0627\u0632\u0629",permission:"\u0625\u0630\u0646",overtime:"\u0625\u0636\u0627\u0641\u064A"}[String(e||"").trim()]||e||"\u2014"},getTimeOffStatusBadge(e){return{pending:'<span class="badge badge-warning">\u0645\u0639\u0644\u0642</span>',approved:'<span class="badge badge-success">\u0645\u0639\u062A\u0645\u062F</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',cancelled:'<span class="badge badge-secondary">\u0645\u0644\u063A\u0649</span>'}[String(e||"").trim()]||'<span class="badge badge-secondary">\u2014</span>'},formatTimeOffRequestDetails(e){const t=String(e.requestType||"").trim();if(t==="leave")return`${e.dateFrom||"\u2014"} \u2192 ${e.dateTo||"\u2014"} (${e.durationDays||"\u2014"} \u064A\u0648\u0645)`;if(t==="permission")return`${e.dateFrom||"\u2014"} | ${e.timeFrom||"\u2014"} - ${e.timeTo||"\u2014"}`;if(t==="overtime"){const a=e.durationHours?`${e.durationHours} \u0633`:"",s=e.timeFrom&&e.timeTo?`${e.timeFrom} - ${e.timeTo}`:"";return`${e.dateFrom||"\u2014"} ${a||s}`.trim()}return"\u2014"},getStaffRoleLabel(e){return{doctor:"\u0637\u0628\u064A\u0628",nurse:"\u062A\u0645\u0631\u064A\u0636",clinic_officer:"\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629"}[String(e||"").trim()]||e||"\u2014"},getAttendanceStatusLabel(e){return{present:"\u062D\u0627\u0636\u0631",partial:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",absent:"\u063A\u0627\u0626\u0628"}[String(e||"").trim()]||e||"\u2014"},getAttendanceStatusBadgeClass(e){const t=String(e||"").trim();return t==="present"?"badge-success":t==="partial"?"badge-warning":"badge-secondary"},_toDatetimeLocalValue(e,t){try{if(e){const a=new Date(e);if(!Number.isNaN(a.getTime())){const s=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),i=String(a.getDate()).padStart(2,"0"),o=String(a.getHours()).padStart(2,"0"),l=String(a.getMinutes()).padStart(2,"0");return`${s}-${n}-${i}T${o}:${l}`}}if(t){const a=String(e||"").includes("checkout")||String(e||"")==="checkOut"?"17:00":"08:00";return`${t}T${a}`}return""}catch{return t?`${t}T08:00`:""}},_renderAttendancePunchActions(e){if(!e||!this.canAccessAttendanceTab())return'<span class="text-xs text-gray-400">\u2014</span>';const t=[],a=Utils.escapeAttr(String(e.id||""));return e.checkIn||t.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkIn')"><i class="fas fa-sign-in-alt ml-1"></i>\u062F\u062E\u0648\u0644</button>`),e.checkOut||t.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkOut')"><i class="fas fa-sign-out-alt ml-1"></i>\u062E\u0631\u0648\u062C</button>`),t.length?`<div class="flex items-center gap-1 flex-wrap">${t.join("")}</div>`:'<span class="text-xs text-gray-400">\u0645\u0643\u062A\u0645\u0644</span>'},_findAttendanceRecordById(e){const t=String(e||"").trim();return t&&(this.getClinicStaffAttendanceList()||[]).find(a=>String(a.id)===t)||null},showAttendancePunchModal(e,t){if(!this.canAccessAttendanceTab()){Notification?.error?.("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D");return}const a=this._findAttendanceRecordById(e);if(!a){Notification?.error?.("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=String(t||"").trim(),n=s==="checkIn",i=s==="checkOut";if(n&&a.checkIn){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(i&&a.checkOut){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(!n&&!i)return;const o=this._attendanceDayKey(a.date);let l=n?`${o}T07:30`:`${o}T15:30`;if(i&&a.checkIn)try{const u=new Date(a.checkIn),d=u.getHours(),m=u.getMinutes(),f=`${String(d).padStart(2,"0")}:${String(m).padStart(2,"0")}`,y=this.getClinicShiftRules(),g=y.find(T=>T.isOvernight||T.id==="shift_3")||{startTime:"22:30",endTime:"07:30"},b=y.find(T=>T.id==="shift_2")||{startTime:"15:30",endTime:"22:30"},S=y.find(T=>T.id==="shift_1")||{startTime:"07:30",endTime:"15:30"};if(f>=g.startTime||f<S.startTime){const T=new Date(u);T.setDate(T.getDate()+1),l=`${this._attendanceDayKey(T)}T${g.endTime}`}else f>=b.startTime?l=`${o}T${b.endTime}`:l=`${o}T${S.endTime}`}catch{l=`${o}T15:30`}const p=`
            <div class="modal-overlay active" id="clinic-attendance-punch-modal">
                <div class="modal-content" style="max-width:480px;">
                    <div class="modal-header">
                        <h3><i class="fas ${n?"fa-sign-in-alt":"fa-sign-out-alt"} ml-2"></i>${n?"\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0645\u0641\u0642\u0648\u062F\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629"}</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-attendance-punch-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="text-sm text-gray-600">
                            <div><strong>\u0627\u0644\u0645\u0633\u0626\u0648\u0644:</strong> ${Utils.escapeHTML(a.userName||a.userEmail||"\u2014")}</div>
                            <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.escapeHTML(o||"\u2014")}</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">${n?"\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644":"\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C"} *</label>
                            <input type="datetime-local" id="clinic-attendance-punch-time" class="form-input" value="${Utils.escapeAttr(l)}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <textarea id="clinic-attendance-punch-notes" class="form-textarea" rows="2" placeholder="\u0633\u0628\u0628 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0635\u0645\u0629 \u064A\u062F\u0648\u064A\u0627\u064B..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-attendance-punch-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="clinic-attendance-punch-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>`;document.getElementById("clinic-attendance-punch-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",p),document.getElementById("clinic-attendance-punch-save")?.addEventListener("click",async()=>{const u=document.getElementById("clinic-attendance-punch-time")?.value||"",d=document.getElementById("clinic-attendance-punch-notes")?.value?.trim()||"";if(!u){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0642\u062A");return}const m=this._formatLocalDatetimeToIso(u);try{Loading?.show?.();const f=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:{recordId:a.id,staffId:a.staffId||"",userId:a.userId||"",userEmail:a.userEmail||"",date:a.date||o||"",punchType:s,[n?"checkIn":"checkOut"]:m,notes:d}});if(f?.success){if(Notification?.success?.(f.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u0635\u0645\u0629 \u0628\u0646\u062C\u0627\u062D"),document.getElementById("clinic-attendance-punch-modal")?.remove(),a&&(n&&(a.checkIn=m),i&&(a.checkOut=m),a.checkIn&&a.checkOut)){try{const y=new Date(a.checkIn).getTime(),g=new Date(a.checkOut).getTime();!isNaN(y)&&!isNaN(g)&&g>y&&(a.workDuration=Math.round((g-y)/36e5*100)/100+" \u0633\u0627\u0639\u0629")}catch{}a.status="present"}await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})}else Notification?.error?.(f?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(f){Notification?.error?.(f?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},_formatLocalDatetimeToIso(e){if(!e)return"";const t=String(e).trim();if(!t)return"";if(/[Z+-]\d{2}:?\d{2}$/i.test(t)||/Z$/i.test(t))return t;const a=t.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{1,2}):(\d{2})/);if(a){const n=new Date(Number(a[1]),Number(a[2])-1,Number(a[3]),Number(a[4]),Number(a[5]),0,0);if(!isNaN(n.getTime()))return n.toISOString()}const s=new Date(t);return isNaN(s.getTime())?t:s.toISOString()},getClinicShiftRules(){return Array.isArray(AppState.appData?.clinicShiftRules)&&AppState.appData.clinicShiftRules.length>0?AppState.appData.clinicShiftRules:[{id:"shift_1",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649",startTime:"07:30",endTime:"15:30",isOvernight:!1},{id:"shift_2",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629",startTime:"15:30",endTime:"22:30",isOvernight:!1},{id:"shift_3",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629",startTime:"22:30",endTime:"07:30",isOvernight:!0}]},showClinicShiftSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getClinicShiftRules(),t=`
            <div class="modal-overlay active" id="clinic-shift-settings-modal">
                <div class="modal-content" style="max-width:560px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-clock ml-2"></i>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A (\u0627\u0644\u0639\u064A\u0627\u062F\u0629)</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-shift-settings-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <p class="text-xs text-gray-500 mb-2">\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0627\u0639\u064A\u062F \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629. \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 \u0644\u064A\u0644\u064A\u0629 (\u062A\u062A\u062C\u0627\u0648\u0632 \u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0644\u064A\u0644).</p>
                        ${e.map((a,s)=>`
                            <div class="border rounded-lg p-3 bg-gray-50 space-y-2" data-shift-idx="${s}">
                                <div class="font-bold text-sm text-blue-700 flex items-center justify-between">
                                    <span>${Utils.escapeHTML(a.name)}</span>
                                    ${a.isOvernight?'<span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">\u0648\u0631\u062F\u064A\u0629 \u0644\u064A\u0644\u064A\u0629</span>':""}
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="form-label text-xs">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0627\u064A\u0629</label>
                                        <input type="time" class="form-input shift-start-time" value="${Utils.escapeAttr(a.startTime)}" required>
                                    </div>
                                    <div>
                                        <label class="form-label text-xs">\u0648\u0642\u062A \u0627\u0644\u0646\u0647\u0627\u064A\u0629</label>
                                        <input type="time" class="form-input shift-end-time" value="${Utils.escapeAttr(a.endTime)}" required>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-shift-settings-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="clinic-shift-settings-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0642\u0648\u0627\u0639\u062F</button>
                    </div>
                </div>
            </div>`;document.getElementById("clinic-shift-settings-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",t),document.getElementById("clinic-shift-settings-save")?.addEventListener("click",()=>{const a=document.getElementById("clinic-shift-settings-modal"),s=a.querySelectorAll("[data-shift-idx]"),n=[];s.forEach((i,o)=>{const l=e[o],r=i.querySelector(".shift-start-time")?.value||l.startTime,c=i.querySelector(".shift-end-time")?.value||l.endTime;n.push({...l,startTime:r,endTime:c})}),AppState.appData.clinicShiftRules=n,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("ClinicShiftRules",n).catch(()=>{}),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.renderAttendanceTab({force:!0})})},_applyShiftPresetToMissingPunchForm(e){const t=document.getElementById("clinic-attendance-add-modal");if(!t)return;const a=t.querySelector("#clinic-attendance-add-date"),s=t.querySelector("#clinic-attendance-add-checkin"),n=t.querySelector("#clinic-attendance-add-checkout"),i=this._attendanceDayKey(a?.value||this._getTodayLocalKey());if(!e)return;const o=(this.getClinicShiftRules()||[]).find(r=>String(r.id)===String(e));if(!o)return;s&&(s.value=`${i}T${o.startTime||"07:30"}`);let l=i;if(o.isOvernight)try{const r=new Date(`${i}T12:00:00`);r.setDate(r.getDate()+1),l=this._attendanceDayKey(r)}catch{l=i}n&&(n.value=`${l}T${o.endTime||"15:30"}`)},showAddMissingAttendanceModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=(this.getClinicStaffList()||[]).filter(p=>String(p.isActive||"true").toLowerCase()!=="false").map(p=>`<option value="${Utils.escapeAttr(p.id)}">${Utils.escapeHTML(p.userName||p.userEmail||p.id)}</option>`).join(""),t=this.getClinicShiftRules(),a=t.map(p=>`<option value="${Utils.escapeAttr(p.id)}">${Utils.escapeHTML(p.name)} (${Utils.escapeHTML(p.startTime)}\u2013${Utils.escapeHTML(p.endTime)}${p.isOvernight?" \xB7 \u0644\u064A\u0644\u064A":""})</option>`).join(""),s=this._getTodayLocalKey(),n=t.find(p=>p.id==="shift_1")||t[0],i=`${s}T${n?.startTime||"07:30"}`,o=`${s}T${n?.endTime||"15:30"}`,l=`
            <div class="modal-overlay active" id="clinic-attendance-add-modal">
                <div class="modal-content" style="max-width:560px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                    <div class="modal-header" style="background: linear-gradient(125deg, #0b2a55, #1e40af 70%, #2563eb); color: white; padding: 1.5rem; border-bottom: none;">
                        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; display: flex; align-items: center;"><i class="fas fa-fingerprint ml-3" style="font-size: 1.5rem; opacity: 0.9;"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 / \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</h3>
                        <button type="button" class="modal-close" style="color: white; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-5" style="padding: 1.5rem; background-color: #f8fafc;">
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="fas fa-user-circle ml-2 text-teal-500"></i> \u0627\u0644\u0645\u0633\u0626\u0648\u0644 <span class="text-red-500 mr-1">*</span></label>
                            <select id="clinic-attendance-add-staff" class="form-input" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u2014</option>${e}</select>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                            <div class="form-group" style="margin:0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="far fa-calendar-alt ml-2 text-teal-500"></i> \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span class="text-red-500 mr-1">*</span></label>
                                <input type="date" id="clinic-attendance-add-date" class="form-input" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem;" value="${Utils.escapeAttr(s)}" required>
                            </div>
                            <div class="form-group" style="margin:0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="fas fa-clock ml-2 text-amber-500"></i> \u0627\u0644\u0648\u0631\u062F\u064A\u0629</label>
                                <select id="clinic-attendance-add-shift" class="form-input" style="border: 1px solid #f59e0b; border-radius: 0.5rem; padding: 0.75rem; background:#fffbeb;">
                                    <option value="">\u2014 \u064A\u062F\u0648\u064A \u0628\u062F\u0648\u0646 \u0648\u0631\u062F\u064A\u0629 \u2014</option>
                                    ${a}
                                </select>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #ffffff; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.85rem; font-weight: 600; color: #475569;"><i class="fas fa-sign-in-alt ml-1 text-green-500"></i> \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</label>
                                <input type="datetime-local" id="clinic-attendance-add-checkin" class="form-input" style="padding: 0.5rem; font-size: 0.9rem;" value="${Utils.escapeAttr(i)}">
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.85rem; font-weight: 600; color: #475569;"><i class="fas fa-sign-out-alt ml-1 text-orange-500"></i> \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                                <input type="datetime-local" id="clinic-attendance-add-checkout" class="form-input" style="padding: 0.5rem; font-size: 0.9rem;" value="${Utils.escapeAttr(o)}">
                            </div>
                            <div style="grid-column: span 2; font-size: 0.75rem; color: #64748b; text-align: center; margin-top: -0.25rem;"><i class="fas fa-info-circle ml-1"></i> \u0627\u062E\u062A\u0631 \u0648\u0631\u062F\u064A\u0629 \u0644\u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0623\u0648\u0642\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u060C \u0623\u0648 \u0627\u062A\u0631\u0643 \u062D\u0642\u0644\u0627\u064B \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644/\u062E\u0631\u0648\u062C \u0641\u0642\u0637. \u0639\u062F\u0651\u0644 \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0645\u0646 \u0632\u0631 \xAB\u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A\xBB.</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="far fa-comment-alt ml-2 text-gray-400"></i> \u0645\u0644\u0627\u062D\u0638\u0629</label>
                            <textarea id="clinic-attendance-add-notes" class="form-textarea" rows="2" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; resize: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 1.25rem 1.5rem; background-color: #ffffff; border-top: 1px solid #e2e8f0; display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" class="btn-secondary" style="padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 500;" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="clinic-attendance-add-save" style="padding: 0.6rem 1.5rem; border-radius: 0.5rem; font-weight: 600; background: #0f766e; border: none; box-shadow: 0 4px 6px -1px rgba(15, 118, 110, 0.3); transition: all 0.2s;"><i class="fas fa-check ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644</button>
                    </div>
                </div>
            </div>`;document.getElementById("clinic-attendance-add-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",l);const r=document.getElementById("clinic-attendance-add-shift"),c=document.getElementById("clinic-attendance-add-date");n?.id&&r&&(r.value=n.id,this._applyShiftPresetToMissingPunchForm(n.id)),r?.addEventListener("change",()=>this._applyShiftPresetToMissingPunchForm(r.value)),c?.addEventListener("change",()=>{r?.value&&this._applyShiftPresetToMissingPunchForm(r.value)}),document.getElementById("clinic-attendance-add-save")?.addEventListener("click",async()=>{const p=document.getElementById("clinic-attendance-add-staff")?.value||"",u=document.getElementById("clinic-attendance-add-date")?.value||"",d=document.getElementById("clinic-attendance-add-checkin")?.value||"",m=document.getElementById("clinic-attendance-add-checkout")?.value||"",f=document.getElementById("clinic-attendance-add-notes")?.value?.trim()||"";if(!p||!u){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E");return}if(!d&&!m){Notification?.warning?.("\u0623\u062F\u062E\u0644 \u0648\u0642\u062A \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}try{Loading?.show?.();const y={staffId:p,date:u,notes:f};d&&(y.checkIn=this._formatLocalDatetimeToIso(d)),m&&(y.checkOut=this._formatLocalDatetimeToIso(m));const g=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:y});g?.success?(Notification?.success?.(g.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644"),document.getElementById("clinic-attendance-add-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(g?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(y){Notification?.error?.(y?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},_attendanceDayKey(e){if(!e)return"";try{const t=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(t))return t;const a=new Date(e);if(Number.isNaN(a.getTime()))return t.slice(0,10);const s=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),i=String(a.getDate()).padStart(2,"0");return`${s}-${n}-${i}`}catch{return String(e).slice(0,10)}},_getTodayLocalKey(){return this._attendanceDayKey(new Date)},_countActiveAttendanceFilters(e){if(!e)return 0;let t=0;return String(e.search||"").trim()&&t++,e.staffRole&&e.staffRole!=="all"&&t++,e.status&&e.status!=="all"&&t++,e.staffId&&e.staffId!=="all"&&t++,e.month&&t++,e.dateFrom&&t++,e.dateTo&&t++,t},_normalizeAttendanceDateRange(e,t){let a=String(e||"").trim(),s=String(t||"").trim();if(a&&s&&a>s){const n=a;a=s,s=n}return{dateFrom:a,dateTo:s}},_getAttendanceMonthRange(e){const t=String(e||"").trim();if(!/^\d{4}-\d{2}$/.test(t))return{dateFrom:"",dateTo:""};const a=t.split("-"),s=parseInt(a[0],10),n=parseInt(a[1],10);if(!s||!n||n<1||n>12)return{dateFrom:"",dateTo:""};const i=String(n).padStart(2,"0"),o=new Date(s,n,0).getDate();return{dateFrom:`${s}-${i}-01`,dateTo:`${s}-${i}-${String(o).padStart(2,"0")}`}},_getAttendanceStaffOptions(){const e=new Map;return(this.getClinicStaffList()||[]).forEach(t=>{const a=String(t.userId||t.id||t.userEmail||"").trim();a&&e.set(a,{id:a,staffId:t.id||"",name:t.userName||t.userEmail||a,role:t.staffRole||""})}),(this.getClinicStaffAttendanceList()||[]).forEach(t=>{const a=String(t.userId||t.staffId||t.userEmail||"").trim();!a||e.has(a)||e.set(a,{id:a,staffId:t.staffId||"",name:t.userName||t.userEmail||a,role:t.staffRole||""})}),Array.from(e.values()).sort((t,a)=>String(t.name).localeCompare(String(a.name),"ar"))},_resolveAttendanceFilterDates(e){const t=e||{};if(t.month){const a=this._getAttendanceMonthRange(t.month);if(a.dateFrom&&a.dateTo)return a}return this._normalizeAttendanceDateRange(t.dateFrom,t.dateTo)},_filterAttendanceRows(e,t){const a=t||{};let s=(e||[]).slice();if(a.staffId&&a.staffId!=="all"){const i=String(a.staffId).trim(),o=new Set([i,i.toLowerCase()]),l=(this.getClinicStaffList()||[]).find(r=>String(r.userId||"").trim()===i||String(r.id||"").trim()===i||String(r.userEmail||"").trim().toLowerCase()===i.toLowerCase());l&&["id","userId","userEmail"].forEach(r=>{const c=String(l[r]||"").trim();c&&(o.add(c),o.add(c.toLowerCase()))}),s=s.filter(r=>[r.staffId,r.userId,r.userEmail].map(p=>String(p||"").trim()).filter(Boolean).some(p=>o.has(p)||o.has(p.toLowerCase())))}if(a.search){const i=String(a.search).trim().toLowerCase();s=s.filter(o=>String(o.userName||"").toLowerCase().includes(i)||String(o.userEmail||"").toLowerCase().includes(i))}a.staffRole&&a.staffRole!=="all"&&(s=s.filter(i=>String(i.staffRole)===String(a.staffRole))),a.status&&a.status!=="all"&&(s=s.filter(i=>String(i.status)===String(a.status)));const n=this._resolveAttendanceFilterDates(a);return n.dateFrom&&(s=s.filter(i=>this._attendanceDayKey(i.date)>=n.dateFrom)),n.dateTo&&(s=s.filter(i=>this._attendanceDayKey(i.date)<=n.dateTo)),s.sort((i,o)=>{const l=this._attendanceDayKey(o.date)+String(o.checkIn||""),r=this._attendanceDayKey(i.date)+String(i.checkIn||"");return l.localeCompare(r)}),s},_computeAttendanceReportStats(e){const t=e||[];let a=0,s=0,n=0;const i=new Set;return t.forEach(o=>{const l=parseFloat(o.workDuration);Number.isNaN(l)||(a+=l),String(o.status)==="present"?s++:String(o.status)==="partial"&&n++;const r=String(o.userId||o.staffId||o.userEmail||o.userName||"");r&&i.add(r)}),{total:t.length,present:s,partial:n,staffCount:i.size,totalHours:Math.round(a*100)/100}},_buildAttendanceReportMeta(e){const t=e||{},a=[];if(t.staffId&&t.staffId!=="all"){const n=this._getAttendanceStaffOptions().find(i=>String(i.id)===String(t.staffId)||String(i.staffId)===String(t.staffId));a.push("\u0627\u0644\u0645\u0633\u0626\u0648\u0644: "+(n?.name||t.staffId))}if(t.month){const[n,i]=String(t.month).split("-"),o=["","\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];a.push("\u0627\u0644\u0634\u0647\u0631: "+(o[parseInt(i,10)]||i)+" "+n)}const s=this._resolveAttendanceFilterDates(t);return(s.dateFrom||s.dateTo)&&a.push("\u0627\u0644\u0645\u062F\u0629: "+(s.dateFrom||"\u2026")+" \u2192 "+(s.dateTo||"\u2026")),t.staffRole&&t.staffRole!=="all"&&a.push("\u0627\u0644\u062F\u0648\u0631: "+this.getStaffRoleLabel(t.staffRole)),t.status&&t.status!=="all"&&a.push("\u0627\u0644\u062D\u0627\u0644\u0629: "+this.getAttendanceStatusLabel(t.status)),t.search&&a.push("\u0628\u062D\u062B: "+String(t.search).trim()),a.length?a.join(" | "):"\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A"},_attendanceReportFileSuffix(e){const t=e||{};if(t.month)return String(t.month);if(t.staffId&&t.staffId!=="all")return(this._getAttendanceStaffOptions().find(i=>String(i.id)===String(t.staffId))?.name||"staff").replace(/[^\w\u0600-\u06FF-]+/g,"_").slice(0,24);const a=this._resolveAttendanceFilterDates(t);return a.dateFrom&&a.dateTo?`${a.dateFrom}_${a.dateTo}`:a.dateFrom?`from_${a.dateFrom}`:new Date().toISOString().slice(0,10)},getFilteredClinicAttendance(){return this._filterAttendanceRows(this.getClinicStaffAttendanceList(),this.state.filters.attendance||{})},async loadClinicAttendanceData(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;try{this.canViewAllAttendanceData()&&await this._ensureClinicStaffLoadedForAttendance();const[t,a,s]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffAttendance",data:e?{skipCache:!0}:{}}),GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:e?{skipCache:!0}:{}})]);return t?.success&&Array.isArray(t.data)&&(AppState.appData.clinicStaffAttendance=t.data),a?.success&&Array.isArray(a.data)&&(AppState.appData.clinicStaff=a.data),s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),!!(t?.success||a?.success||s?.success)}catch{return!1}},exportAttendanceToExcel(e){const t=e||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),t);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const s=a.map(o=>({\u0627\u0644\u0627\u0633\u0645:o.userName||"",\u0627\u0644\u0628\u0631\u064A\u062F:o.userEmail||"",\u0627\u0644\u062F\u0648\u0631:this.getStaffRoleLabel(o.staffRole),\u0627\u0644\u062A\u0627\u0631\u064A\u062E:o.date||"","\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644":o.checkIn?Utils.formatDateTime?Utils.formatDateTime(o.checkIn):o.checkIn:"","\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C":o.checkOut?Utils.formatDateTime?Utils.formatDateTime(o.checkOut):o.checkOut:"","\u0645\u062F\u0629 \u0627\u0644\u0639\u0645\u0644 (\u0633\u0627\u0639\u0629)":o.workDuration||"",\u0627\u0644\u062D\u0627\u0644\u0629:this.getAttendanceStatusLabel(o.status),"\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0644\u0633\u0629":o.sessionId||""})),n=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(s);XLSX.utils.book_append_sheet(n,i,"Attendance"),XLSX.writeFile(n,`Clinic_Attendance_${this._attendanceReportFileSuffix(t)}.xlsx`)},_buildAttendanceReportContent(e,t){const a=this._computeAttendanceReportStats(t),s=this._buildAttendanceReportMeta(e),n=!this.canViewAllAttendanceData(),i=this.formatDate(new Date,!0),l=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",value:a.total,color:"#2563eb",bg:"#eff6ff"},{label:"\u062D\u0627\u0636\u0631",value:a.present,color:"#059669",bg:"#ecfdf5"},{label:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",value:a.partial,color:"#d97706",bg:"#fffbeb"},{label:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644\u0648\u0646",value:a.staffCount,color:"#4f46e5",bg:"#eef2ff"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A",value:a.totalHours,color:"#0d9488",bg:"#f0fdfa"}].map(p=>`
            <div style="background:${p.bg};border:1px solid rgba(0,0,0,0.06);border-radius:10px;padding:12px 14px;text-align:center;">
                <div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:4px;">${p.label}</div>
                <div style="font-size:20px;font-weight:800;color:${p.color};line-height:1.1;">${p.value}</div>
            </div>
        `).join(""),r=t.map((p,u)=>{const d=u%2===0?"#ffffff":"#f8fafc",m=this.getAttendanceStatusLabel(p.status);return n?`<tr style="background:${d};">
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(p.date||"\u2014")}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(p.checkIn)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(p.checkOut)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(p.workDuration||"\u2014"))}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(m)}</td>
                </tr>`:`<tr style="background:${d};">
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(p.userName||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;font-size:10px;">${Utils.escapeHTML(p.userEmail||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(this.getStaffRoleLabel(p.staffRole))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(p.date||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(p.checkIn)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(p.checkOut)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(p.workDuration||"\u2014"))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(m)}</td>
            </tr>`}).join(""),c=n?`<tr style="background:linear-gradient(90deg,#1e40af,#2563eb);color:#fff;">
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:center;">\u0627\u0644\u0645\u062F\u0629 (\u0633)</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
            </tr>`:`<tr style="background:linear-gradient(90deg,#1e40af,#2563eb);color:#fff;">
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u0627\u0633\u0645</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u0628\u0631\u064A\u062F</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u062F\u0648\u0631</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:center;">\u0627\u0644\u0645\u062F\u0629 (\u0633)</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
            </tr>`;return`
            <div style="margin-bottom:18px;">
                <div style="background:linear-gradient(125deg,#0b2a55 0%,#1e40af 70%,#2563eb 100%);color:#fff;padding:16px 20px;border-radius:12px;margin-bottom:14px;box-shadow:0 6px 18px rgba(11,42,85,0.28);">
                    <div style="font-size:17px;font-weight:800;margin-bottom:6px;">\u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
                    <div style="font-size:11px;opacity:0.92;line-height:1.6;">
                        <span><strong>\u0627\u0644\u0646\u0637\u0627\u0642:</strong> ${Utils.escapeHTML(s)}</span>
                        <span style="margin-right:12px;"> | </span>
                        <span><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</strong> ${Utils.escapeHTML(i)}</span>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:16px;">
                    ${l}
                </div>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:11px;direction:rtl;">
                <thead>${c}</thead>
                <tbody>${r}</tbody>
            </table>
        `},ATTENDANCE_A4_WIDTH_PX:794,_formatAttendanceReportCellDate_(e){if(!e)return"\u2014";try{const t=Utils.formatDateTime?Utils.formatDateTime(e):String(e);return Utils.escapeHTML(t)}catch{return Utils.escapeHTML(String(e))}},_prepareAttendancePdfHtml_(e){const t=`
<style id="clinic-attendance-arabic-pdf-fix">
    html, body {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    body *, .att-report-doc, .att-report-doc * {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
    }
    th, td, .att-report-brand-name, .att-report-footer {
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-break: normal !important;
    }
    .att-report-brand-name,
    .report-header .company-brand .company-name,
    .export-header .company-name,
    .ptw-paper-header-company,
    .card-header .company-name {
        white-space: nowrap !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
    }
    table, thead, tbody, tr { direction: rtl !important; }
</style>`,a=String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");return a?a.includes("</head>")?a.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${a}</body></html>`:t},async _waitAttendancePdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 16px Cairo")]),await e.fonts.ready}catch{}},async _ensureHtml2CanvasInAttendanceFrame_(e,t){if(!e||!t)return!1;if(typeof t.html2canvas=="function")return!0;if(typeof html2canvas=="function"){try{t.html2canvas=html2canvas}catch{}if(typeof t.html2canvas=="function")return!0}return new Promise(a=>{const s=e.createElement("script");s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",s.async=!0,s.onload=()=>a(typeof t.html2canvas=="function"),s.onerror=()=>a(!1),(e.head||e.documentElement).appendChild(s)})},_addAttendancePdfPageImage_(e,t,a){const s=e.internal.pageSize.getWidth(),n=e.internal.pageSize.getHeight(),i=s-a*2,o=n-a*2,l=Math.min(i/t.width,o/t.height),r=t.width*l,c=t.height*l,p=a+(i-r)/2,u=a;Utils.PdfExport.addCanvasToPdf(e,t,p,u,r,c)},_buildAttendanceReportFullHtml(e,t){const a=this._buildAttendanceReportContent(e,t),s=Utils.escapeHTML(AppState?.companySettings?.name||"\u0646\u0638\u0627\u0645 HSE"),n=typeof AppState?.companyLogo=="string"?AppState.companyLogo:"",i=Utils.escapeHTML(`CLINIC-ATT-${this._attendanceReportFileSuffix(e)}`);return`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
    html, body { margin: 0; padding: 0; background: #fff; direction: rtl; font-family: 'Cairo', Tahoma, 'Segoe UI', sans-serif; letter-spacing: 0; }
    .att-report-doc { width: 794px; box-sizing: border-box; padding: 22px 26px 28px; background: #fff; }
    .att-report-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 3px solid #134e4a; padding-bottom: 12px; margin-bottom: 14px; }
    .att-report-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .att-report-brand-name { font-size: 13px; font-weight: 700; color: #334155; line-height: 1.4; white-space: nowrap; word-break: keep-all; overflow-wrap: normal; }
    .att-report-code { font-size: 10px; color: #64748b; text-align: left; white-space: nowrap; }
    .att-report-footer { margin-top: 18px; padding-top: 10px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 9px; color: #94a3b8; line-height: 1.5; }
</style>
</head>
<body>
<div class="att-report-doc" id="attendance-report-root">
    <div class="att-report-top">
        <div class="att-report-brand">
            ${n?`<img src="${Utils.escapeAttr(n)}" alt="" style="max-height:52px;max-width:96px;object-fit:contain;display:block;">`:""}
            <div class="att-report-brand-name">${s}</div>
        </div>
        <div class="att-report-code">${i}</div>
    </div>
    ${a}
    <div class="att-report-footer">${s} \u2014 \u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
</div>
</body>
</html>`},_loadAttendancePdfLib_(e,t){if(t())return Promise.resolve(!0);const a=Array.isArray(e)?e:[e],s=n=>{if(n>=a.length)return Promise.resolve(!1);const i=a[n],o=Array.from(document.querySelectorAll("script[src]")).find(l=>String(l.src||"").includes(i.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return o?new Promise(l=>{const r=()=>l(!!t());o.addEventListener("load",r,{once:!0}),setTimeout(r,4e3)}):new Promise(l=>{const r=document.createElement("script");r.src=i,r.async=!0,r.onload=()=>l(!!t()),r.onerror=()=>l(s(n+1)),document.head.appendChild(r)})};return s(0)},async _ensureAttendancePdfLibs_(){const e=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),t=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return e&&t},_getJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadAttendancePdfFonts_(e){const t=e||document,a=t.head||t.documentElement;if(a&&!t.getElementById("clinic-att-cairo-font")){const s=t.createElement("link");s.id="clinic-att-cairo-font",s.rel="stylesheet",s.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",a.appendChild(s)}try{t.fonts&&typeof t.fonts.load=="function"&&(await t.fonts.load("400 14px Cairo"),await t.fonts.load("700 18px Cairo"),await t.fonts.ready)}catch{}},async _captureAttendanceHtmlToCanvas_(e,t){const a=this.ATTENDANCE_A4_WIDTH_PX||794,s=Math.max(e?.scrollWidth||a,a),n=Math.max(e?.scrollHeight||1,1);let i=Utils.PdfExport.getOptimalCaptureScale(s,n,Utils.PdfExport.DEFAULT_CAPTURE_SCALE);const o=t&&typeof t.html2canvas=="function"?t.html2canvas:html2canvas,l={scale:i,backgroundColor:"#ffffff",logging:!1,width:s,height:n,windowWidth:s,windowHeight:n,scrollX:0,scrollY:0,useCORS:!0,allowTaint:!0,imageTimeout:8e3},r=[l,{...l,useCORS:!1,allowTaint:!0},{...l,scale:Math.max(1.25,i-.5)}];let c=null;for(let p=0;p<r.length;p++)try{const u=await o(e,r[p]);if(u&&u.width>0&&u.height>0)return u}catch(u){c=u}if(c)throw c;return null},async _downloadAttendanceHtmlAsPdf(e,t){if(!this._getJsPdfConstructor_()||typeof html2canvas>"u")return!1;const s=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,n=this.ATTENDANCE_A4_WIDTH_PX||794,i=6,o=this._prepareAttendancePdfHtml_(e);await this._preloadAttendancePdfFonts_();const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.style.cssText=`position:fixed;left:-20000px;top:0;width:${n}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(l);try{l.srcdoc=o,await new Promise(y=>{l.onload=y,l.onerror=y,setTimeout(y,4e3)});const r=l.contentDocument||l.contentWindow?.document,c=l.contentWindow;if(!r||!c)return!1;await this._preloadAttendancePdfFonts_(r),await this._waitAttendancePdfFontsReady_(r);const p=Array.from(r.images||[]);await Promise.all(p.map(y=>new Promise(g=>{if(y.complete)return g();y.onload=g,y.onerror=g,setTimeout(g,2e3)}))),await this._ensureHtml2CanvasInAttendanceFrame_(r,c),await new Promise(y=>setTimeout(y,300));const u=r.getElementById("attendance-report-root")||r.querySelector(".att-report-doc")||r.body;if(!u)return!1;const d=Math.max(u.scrollHeight,u.offsetHeight,1);l.style.height=`${d+80}px`,await new Promise(y=>setTimeout(y,150));const m=await this._captureAttendanceHtmlToCanvas_(u,c);if(!m)return!1;const f=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return f?(Utils.PdfExport.appendCanvasAsPdfPages(f,m,{marginMm:i}),Utils.PdfExport.savePdf(f,s),!0):!1}catch(r){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 PDF:",r),!1}finally{l.remove()}},async exportAttendanceToPDF(e){const t=e||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),t);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const s=`Clinic_Attendance_${this._attendanceReportFileSuffix(t)}.pdf`;typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");try{if(!await this._ensureAttendancePdfLibs_()){Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");return}const i=this._buildAttendanceReportFullHtml(t,a);await this._downloadAttendanceHtmlAsPdf(i,s)?Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"):Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B")}catch(n){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631 PDF:",n),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631: "+(n?.message||""))}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}},showAttendanceReportModal(){document.getElementById("clinic-attendance-report-modal")?.remove();const e=this.canViewAllAttendanceData(),t=e?this._getAttendanceStaffOptions():[],a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`,n=t.map(f=>`<option value="${Utils.escapeAttr(f.id)}">${Utils.escapeHTML(f.name)}${f.role?" \u2014 "+Utils.escapeHTML(this.getStaffRoleLabel(f.role)):""}</option>`).join(""),i="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;",o=f=>`display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;margin:0 0 6px;background:${f?"#f0fdfa":"transparent"};border:1px solid ${f?"#99f6e4":"transparent"};`,l=`
            <div class="modal-overlay active" id="clinic-attendance-report-modal">
                <div class="modal-content" style="max-width:580px;border-radius:14px;overflow:hidden;">
                    <div class="modal-header" style="background:linear-gradient(125deg,#0b2a55,#1e40af 70%,#2563eb);color:#fff;">
                        <h3 style="margin:0;color:#fff;"><i class="fas fa-file-export ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631</h3>
                        <button type="button" class="modal-close" style="color:#fff;" onclick="document.getElementById('clinic-attendance-report-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body" style="padding:20px;">
                        <p style="font-size:0.82rem;color:#64748b;margin:0 0 14px;">\u062D\u062F\u0651\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0648\u0627\u0644\u0645\u0633\u0626\u0648\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A) \u0628\u0634\u0643\u0644 \u0645\u0633\u062A\u0642\u0644\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631.</p>

                        <label id="att-report-current-wrap" style="display:flex;align-items:center;gap:8px;padding:10px 12px;border:2px solid #f59e0b;border-radius:10px;background:#fffbeb;cursor:pointer;margin-bottom:12px;">
                            <input type="checkbox" id="att-report-use-current">
                            <span><i class="fas fa-filter" style="color:#f59e0b;margin-left:6px;"></i><strong>\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</strong></span>
                        </label>

                        <div id="att-report-custom-filters">
                            <div style="${i}margin-bottom:12px;">
                                <div style="font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:8px;"><i class="fas fa-calendar-alt ml-1" style="color:#0d9488;"></i> \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629</div>
                                <label style="${o(!0)}" data-date-opt="month">
                                    <input type="radio" name="att-report-date-scope" value="month" checked>
                                    <span>\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</span>
                                </label>
                                <div id="att-report-month-wrap" style="padding-right:28px;margin-bottom:8px;">
                                    <input type="month" id="att-report-month" class="form-input" value="${s}" style="width:100%;box-sizing:border-box;">
                                </div>
                                <label style="${o(!1)}" data-date-opt="period">
                                    <input type="radio" name="att-report-date-scope" value="period">
                                    <span>\u0645\u062F\u0629 \u0645\u062D\u062F\u062F\u0629 (\u0645\u0646 \u2014 \u0625\u0644\u0649)</span>
                                </label>
                                <div id="att-report-period-wrap" style="padding-right:28px;margin-bottom:8px;display:none;">
                                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                                        <div><label class="form-label" style="font-size:0.72rem;display:block;margin-bottom:4px;">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="att-report-from" class="form-input" style="width:100%;box-sizing:border-box;"></div>
                                        <div><label class="form-label" style="font-size:0.72rem;display:block;margin-bottom:4px;">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="att-report-to" class="form-input" style="width:100%;box-sizing:border-box;"></div>
                                    </div>
                                </div>
                                <label style="${o(!1)}" data-date-opt="all">
                                    <input type="radio" name="att-report-date-scope" value="all">
                                    <span>\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E (\u0628\u062F\u0648\u0646 \u062A\u0642\u064A\u064A\u062F \u0632\u0645\u0646\u064A)</span>
                                </label>
                            </div>

                            ${e?`
                            <div style="${i}margin-bottom:12px;">
                                <div style="font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:8px;"><i class="fas fa-user ml-1" style="color:#6366f1;"></i> \u0627\u0644\u0645\u0633\u0626\u0648\u0644</div>
                                <select id="att-report-staff" class="form-input" style="width:100%;box-sizing:border-box;">
                                    <option value="all">\u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u0626\u0648\u0644\u064A\u0646 \u2014</option>${n}
                                </select>
                                <p style="font-size:0.72rem;color:#64748b;margin:8px 0 0;">\u064A\u0645\u0643\u0646 \u0627\u0644\u062C\u0645\u0639 \u0645\u0639 \u0623\u064A \u062E\u064A\u0627\u0631 \u0632\u0645\u0646\u064A \u0623\u0639\u0644\u0627\u0647.</p>
                            </div>`:""}
                        </div>
                        <div style="margin-bottom:4px;font-size:0.78rem;font-weight:700;color:#64748b;">\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631</div>
                        <div style="display:flex;gap:8px;">
                            <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #0d9488;border-radius:10px;cursor:pointer;background:#f0fdfa;font-weight:600;color:#134e4a;">
                                <input type="radio" name="att-report-format" value="pdf" checked> PDF
                            </label>
                            <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #e2e8f0;border-radius:10px;cursor:pointer;font-weight:600;color:#64748b;">
                                <input type="radio" name="att-report-format" value="excel"> Excel
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer" style="gap:8px;">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-attendance-report-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="att-report-export-btn"><i class="fas fa-download ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",l);const r=document.getElementById("clinic-attendance-report-modal");if(!r)return;const c=r.querySelector("#att-report-custom-filters"),p=r.querySelector("#att-report-use-current"),u=f=>{c&&(c.style.opacity=f?"1":"0.45",c.style.pointerEvents=f?"auto":"none")},d=()=>{const f=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";r.querySelector("#att-report-month-wrap").style.display=f==="month"?"block":"none",r.querySelector("#att-report-period-wrap").style.display=f==="period"?"block":"none",r.querySelectorAll("[data-date-opt]").forEach(y=>{const g=y.dataset.dateOpt===f;y.style.background=g?"#f0fdfa":"transparent",y.style.borderColor=g?"#99f6e4":"transparent"})};p?.addEventListener("change",()=>u(!p.checked)),r.querySelectorAll('input[name="att-report-date-scope"]').forEach(f=>{f.addEventListener("change",d)}),d(),u(!0);const m=()=>{if(p?.checked)return Object.assign({},this.state.filters.attendance||{});const f={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},y=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";if(y==="month"){const b=r.querySelector("#att-report-month")?.value||"";if(!b)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631"),null;f.month=b}else if(y==="period"){const b=r.querySelector("#att-report-from")?.value||"",S=r.querySelector("#att-report-to")?.value||"";if(!b&&!S)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0623\u0648 \u0627\u0644\u0646\u0647\u0627\u064A\u0629"),null;const T=this._normalizeAttendanceDateRange(b,S);f.dateFrom=T.dateFrom,f.dateTo=T.dateTo}const g=r.querySelector("#att-report-staff")?.value||"all";return g&&g!=="all"&&(f.staffId=g),f};r.querySelector("#att-report-export-btn")?.addEventListener("click",()=>{const f=r.querySelector('input[name="att-report-format"]:checked')?.value||"pdf",y=m();if(!y)return;if(!this._filterAttendanceRows(this.getClinicStaffAttendanceList(),y).length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");return}r.remove(),f==="excel"?(this.exportAttendanceToExcel(y),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 Excel")):this.exportAttendanceToPDF(y)})},showAddClinicStaffModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getClinicStaffList(),t=new Set(e.map(i=>String(i.userId||i.userEmail||"").toLowerCase()).filter(Boolean)),n=`
            <div class="modal-overlay active" id="clinic-staff-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header"><h3><i class="fas fa-user-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-staff-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</label>
                            <select id="clinic-staff-user" class="form-input"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u2014</option>${(AppState.appData.users||[]).filter(i=>i&&i.active!==!1&&i.email).filter(i=>!t.has(String(i.id||"").toLowerCase())&&!t.has(String(i.email||"").toLowerCase())).map(i=>`<option value="${Utils.escapeAttr(i.id||"")}" data-email="${Utils.escapeAttr(i.email||"")}" data-name="${Utils.escapeAttr(i.name||"")}" data-dept="${Utils.escapeAttr(i.department||"")}" data-job="${Utils.escapeAttr(i.jobTitle||i.position||"")}">${Utils.escapeHTML(i.name||i.email)}</option>`).join("")}</select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u062F\u0648\u0631</label>
                            <select id="clinic-staff-role" class="form-input">
                                <option value="doctor">\u0637\u0628\u064A\u0628</option>
                                <option value="nurse">\u062A\u0645\u0631\u064A\u0636</option>
                                <option value="clinic_officer">\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-staff-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="clinic-staff-save-btn"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>`;document.getElementById("clinic-staff-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",n),document.getElementById("clinic-staff-save-btn")?.addEventListener("click",async()=>{const i=document.getElementById("clinic-staff-user"),o=i?.selectedOptions?.[0];if(!i?.value||!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0633\u062A\u062E\u062F\u0645");return}const l=document.getElementById("clinic-staff-role")?.value||"clinic_officer";try{const r=await GoogleIntegration.sendRequest({action:"addClinicStaff",data:{userId:i.value,userEmail:o.dataset.email||"",userName:o.dataset.name||"",department:o.dataset.dept||"",jobTitle:o.dataset.job||"",staffRole:l,isActive:"true"}});r?.success?(Notification?.success?.("\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629"),document.getElementById("clinic-staff-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}catch(r){Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}})},async toggleClinicStaffActive(e,t){if(!(!this.isCurrentUserAdmin()||!e))try{const a=await GoogleIntegration.sendRequest({action:"updateClinicStaff",data:{staffId:e,updateData:{isActive:t?"true":"false"}}});a?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u0626\u0648\u0644")):Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}catch(a){Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}},async deleteClinicStaffMember(e){if(!(!this.isCurrentUserAdmin()||!e)&&confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629\u061F (\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0633\u0627\u0628\u0642 \u064A\u0628\u0642\u0649 \u0645\u062D\u0641\u0648\u0638\u0627\u064B)"))try{const t=await GoogleIntegration.sendRequest({action:"deleteClinicStaff",data:{staffId:e}});t?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641")):Notification?.error?.(t?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}catch(t){Notification?.error?.(t?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}},async notifyAdminAboutTimeOffRequest(e){if(!(!e||!e.id))try{if(this.isCurrentUserAdmin()){const t=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];t.some(s=>String(s.id)===String(e.id))||(AppState.appData.clinicStaffTimeOffRequests=[e,...t]),this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge()}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0637\u0644\u0628 \u0627\u0644\u062D\u0636\u0648\u0631:",t)}},async submitTimeOffRequest(){this._saveTimeOffFormDraftFromDom(),this._timeOffFormSubmitting=!0;const e=document.getElementById("timeoff-request-type")?.value||"",t=document.getElementById("timeoff-reason")?.value?.trim()||"";let a="",s="";const n=document.getElementById("timeoff-time-from")?.value||"",i=document.getElementById("timeoff-time-to")?.value||"",o=document.getElementById("timeoff-duration-hours")?.value||"";if(e==="leave"?(a=document.getElementById("timeoff-date-from")?.value||"",s=document.getElementById("timeoff-date-to")?.value||""):e==="permission"?(a=document.getElementById("timeoff-perm-date")?.value||"",s=a):e==="overtime"&&(a=document.getElementById("timeoff-ot-date")?.value||"",s=a),!e){this._timeOffFormSubmitting=!1,Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628");return}if(!t){this._timeOffFormSubmitting=!1,Notification?.error?.("\u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 \u0645\u0637\u0644\u0648\u0628");return}Loading.show();try{const l={requestType:e,reason:t,dateFrom:a,dateTo:s,timeFrom:n,timeTo:i,durationHours:o},r=await GoogleIntegration.sendRequest({action:"addClinicStaffTimeOffRequest",data:l});if(r&&r.success){const c=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});c?.success&&Array.isArray(c.data)&&(AppState.appData.clinicStaffTimeOffRequests=c.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const p=(AppState.appData.clinicStaffTimeOffRequests||[]).find(u=>u.id===r.data?.id)||{id:r.data?.id,requestType:e,reason:t,dateFrom:a,dateTo:s,timeFrom:n,timeTo:i,durationHours:o,status:"pending"};this._invalidateApprovalsCache(),this.notifyAdminAboutTimeOffRequest(p),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u2014 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631"),this.state&&(this.state.timeOffFormDraft=this._getDefaultTimeOffFormDraft()),document.getElementById("clinic-timeoff-request-modal")?.remove(),this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0})}else throw new Error(r?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(l){Loading.hide(),Notification?.error?.(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}finally{this._timeOffFormSubmitting=!1}},async cancelTimeOffRequest(e){if(!(!e||!confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0644\u063A\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F"))){Loading.show();try{const a=await GoogleIntegration.sendRequest({action:"cancelClinicStaffTimeOffRequest",data:{requestId:e}});if(a&&a.success){const s=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628"),this.renderAttendanceTab({force:!0})}else throw new Error(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0644\u063A\u0627\u0621")}catch(a){Loading.hide(),Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628")}}},renderTimeOffRequestsTable(e){if(!e||!e.length)return'<p class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>';const t=e.map(a=>{const s=String(a.status)==="pending";return`<tr>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(a.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(a))}</td>
                <td class="text-sm">${Utils.escapeHTML(a.reason||"\u2014")}</td>
                <td>${this.getTimeOffStatusBadge(a.status)}</td>
                <td>${this.formatDate(a.requestedAt||a.createdAt,!0)}</td>
                <td>${s?`<button type="button" class="btn-icon btn-icon-danger" title="\u0625\u0644\u063A\u0627\u0621" onclick="Clinic.cancelTimeOffRequest('${Utils.escapeAttr(a.id)}')"><i class="fas fa-ban"></i></button>`:"\u2014"}</td>
            </tr>`}).join("");return this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
            <thead><tr><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0625\u062C\u0631\u0627\u0621</th></tr></thead>
            <tbody>${t}</tbody>
        </table>`)},renderAttendanceSelfTab(e){this._saveTimeOffFormDraftFromDom(),this._scheduleLeaveBalancesLoadIfNeeded(!1),this.ensureData();const t=this._isAttendanceDataLoading(),a=this._isLeaveBalancesLoading(),s=this._getLeaveBalancePeriodDefaults(),n=this.getClinicStaffLeaveBalancesList()[0]||{},i=n.month||{},o=n.year||{};this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffTimeOffRequestsList().sort((v,L)=>new Date(L.requestedAt||L.createdAt)-new Date(v.requestedAt||v.createdAt)),p=c.filter(v=>v.status==="pending").length,u=this._computeAttendanceReportStats(r),d=this.getCurrentUserStaffRecord(),m=this.getFilteredClinicStaffActivities(),f=!!this._clinicStaffActivitiesLoading,y=this.state.attendanceFilterPanelOpen!==!1,g=l.period||"all",b={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},S=t&&r.length===0?this._renderAttendanceTableLoadingRow(5):r.length?r.map(v=>`
            <tr>
                <td>${Utils.escapeHTML(v.date||"\u2014")}</td>
                <td>${v.checkIn?Utils.formatDateTime?Utils.formatDateTime(v.checkIn):Utils.escapeHTML(String(v.checkIn)):"\u2014"}</td>
                <td>${v.checkOut?Utils.formatDateTime?Utils.formatDateTime(v.checkOut):Utils.escapeHTML(String(v.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(v.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(v.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(v.status))}</span></td>
                <td>${this._renderAttendancePunchActions(v)}</td>
            </tr>
        `).join(""):'<tr><td colspan="6" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</td></tr>',T=[{id:"clinic-attendance-section-timeoff",label:"\u0637\u0644\u0628 \u062C\u062F\u064A\u062F",icon:"fa-paper-plane"},{id:"clinic-attendance-section-my-requests",label:"\u0637\u0644\u0628\u0627\u062A\u064A",icon:"fa-list"},{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u062D\u0636\u0648\u0631\u064A",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637\u064A",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];e.innerHTML=`
            <div id="clinic-attendance-self-root">
                ${this.renderAttendanceQuickNav(T)}
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u0623\u064A\u0627\u0645 \u062D\u0636\u0648\u0631\u064A",value:u.total,icon:"fa-calendar-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0633\u0627\u0639\u0627\u062A\u064A",value:u.totalHours,icon:"fa-clock",color:"#2563eb",bg:"#eff6ff"},{label:"\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629",value:p,icon:"fa-hourglass-half",color:"#d97706",bg:"#fffbeb"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":i.leaveRemaining??0,icon:"fa-umbrella-beach",color:"#0d9488",bg:"#f0fdfa"},{label:"\u0623\u0630\u0648\u0646\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":i.permissionRemaining??0,icon:"fa-door-open",color:"#7c3aed",bg:"#f5f3ff"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0633\u0646\u0629)",value:a?"\u2026":o.leaveRemaining??0,icon:"fa-calendar",color:"#0369a1",bg:"#f0f9ff"}].map(v=>`
                        <div style="background:${v.bg};border-radius:12px;padding:14px;display:flex;align-items:center;gap:10px;">
                            <i class="fas ${v.icon}" style="color:${v.color};font-size:1.2rem;"></i>
                            <div><p style="margin:0;font-size:0.72rem;color:#64748b;">${v.label}</p><p style="margin:0;font-size:1.35rem;font-weight:800;color:${v.color};">${v.value}</p></div>
                        </div>`).join("")}
                </div>

                <div style="padding:14px 18px;background:linear-gradient(125deg,#0b2a55 0%,#1e3a75 70%,#245a9b 100%);border-radius:14px;color:#fff;margin-bottom:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;box-shadow:0 10px 26px rgba(11,42,85,.25);">
                    <div>
                        <h3 style="margin:0;font-size:1rem;font-weight:700;">\u062D\u0636\u0648\u0631\u064A \u0648\u0637\u0644\u0628\u0627\u062A\u064A</h3>
                        <p style="margin:4px 0 0;font-size:0.72rem;opacity:0.9;">${Utils.escapeHTML(d?.userName||AppState.currentUser?.name||"")} \u2014 ${Utils.escapeHTML(this.getStaffRoleLabel(d?.staffRole))}</p>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${["today","week","month","all"].map(v=>{const L=g===v;return`<button type="button" class="clinic-attendance-period-btn" data-period="${v}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;background:${L?"#fff":"rgba(255,255,255,0.14)"};color:${L?"#0b2a55":"#fff"};">${b[v]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-new-request-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#7c2d12;font-size:0.74rem;font-weight:800;box-shadow:0 4px 12px rgba(0,0,0,.18);"><i class="fas fa-paper-plane"></i> \u0637\u0644\u0628 \u062C\u062F\u064A\u062F</button>
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);background:rgba(255,255,255,0.12);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-sliders-h"></i> \u0641\u0644\u0627\u062A\u0631</button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.14);color:#fff;cursor:pointer;"><i class="fas fa-sync-alt${t?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-pdf"></i> PDF</button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-excel"></i> Excel</button>
                    </div>
                </div>

                <div id="clinic-attendance-filter-panel" style="display:${y?"block":"none"};margin-bottom:14px;">
                    <div class="registry-filter-grid" role="search" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631\u064A">
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-month"><i class="fas fa-calendar-alt"></i>\u0627\u0644\u0634\u0647\u0631</label>
                            <input type="month" id="clinic-attendance-month" class="form-input" value="${Utils.escapeAttr(l.month||"")}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-status"><i class="fas fa-circle-check"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" class="form-input">
                                <option value="all">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-from"><i class="fas fa-calendar-day"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</label>
                            <input type="date" id="clinic-attendance-from" class="form-input" value="${Utils.escapeAttr(l.dateFrom||"")}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</label>
                            <input type="date" id="clinic-attendance-to" class="form-input" value="${Utils.escapeAttr(l.dateTo||"")}">
                        </div>
                        <div class="registry-filter-field tx-reg-filter-actions">
                            <button type="button" id="clinic-attendance-reset-filters" class="registry-filter-reset-btn"><i class="fas fa-rotate-left"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>
                        </div>
                    </div>
                </div>

                <div class="content-card mb-4" id="clinic-attendance-section-my-requests">
                    <div class="card-header"><h4 class="card-title"><i class="fas fa-list ml-2"></i>\u0637\u0644\u0628\u0627\u062A\u064A (${c.length})</h4></div>
                    <div class="card-body" style="padding:0;">${this.renderTimeOffRequestsTable(c)}</div>
                </div>

                <div class="content-card" id="clinic-attendance-section-records">
                    <div class="card-header"><h4 class="card-title"><i class="fas fa-clipboard-user ml-2"></i>\u0633\u062C\u0644 \u062D\u0636\u0648\u0631\u064A (${r.length})</h4></div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                            <thead><tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u062F\u062E\u0648\u0644</th><th>\u062E\u0631\u0648\u062C</th><th>\u0645\u062F\u0629 (\u0633)</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>
                            <tbody>${S}</tbody>
                        </table>`)}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!1,activities:m,loading:f,title:"\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:this.getClinicStaffLeaveBalancesList(),loading:a,month:s.month,year:s.year})}

                ${this.renderApprovedTimeOffRequestsSection(this.getClinicStaffLeaveBalancesList(),s.month)}
            </div>`;const D=()=>{const v=document.getElementById("clinic-attendance-month")?.value||"";let L=document.getElementById("clinic-attendance-from")?.value||"",k=document.getElementById("clinic-attendance-to")?.value||"";if(v&&!L&&!k){const C=this._getAttendanceMonthRange(v);L=C.dateFrom,k=C.dateTo}else{const C=this._normalizeAttendanceDateRange(L,k);L=C.dateFrom,k=C.dateTo}return{search:"",staffRole:"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:"all",month:v,dateFrom:L,dateTo:k,period:this.state.filters.attendance?.period||"all"}},$=()=>{this.state.filters.attendance=D.call(this),this.renderAttendanceTab({force:!0})},h=v=>{const L=this._getTodayLocalKey();let k="",C="";if(v==="today")k=L,C=L;else if(v==="week"){const I=new Date;I.setDate(I.getDate()-6),k=this._attendanceDayKey(I),C=L}else if(v==="month"){const I=new Date;I.setDate(I.getDate()-29),k=this._attendanceDayKey(I),C=L}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:v,month:"",dateFrom:k,dateTo:C}),this.renderAttendanceTab({force:!0})};e.querySelector("#clinic-attendance-status")?.addEventListener("change",$),e.querySelector("#clinic-attendance-month")?.addEventListener("change",$),e.querySelector("#clinic-attendance-from")?.addEventListener("change",$),e.querySelector("#clinic-attendance-to")?.addEventListener("change",$),e.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),e.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!y;const v=e.querySelector("#clinic-attendance-filter-panel");v&&(v.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),e.querySelectorAll(".clinic-attendance-period-btn").forEach(v=>{v.addEventListener("click",()=>h(v.dataset.period||"all"))}),e.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),e.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),e.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(e),this.bindClinicStaffLeaveBalanceEvents(e),this.bindAttendanceQuickNav(e),this.initAttendanceTableScroll(e),e.querySelector("#clinic-attendance-new-request-btn")?.addEventListener("click",()=>this.showTimeOffRequestModal())},renderAttendanceTab(e){if(!(e&&e.force===!0)&&this._shouldDeferAttendanceRender()){this._attendanceRenderPending=!0;return}this._attendanceRenderPending=!1;const a=document.querySelector('.clinic-tab-panel[data-tab-panel="attendance"]');if(!a)return;if(!this.canAccessAttendanceTab()){a.innerHTML=`<div class="text-center py-12 text-gray-500">
                <i class="fas fa-lock text-4xl mb-4 opacity-40"></i>
                <p class="font-semibold">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D</p>
                <p class="text-sm mt-2">\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062D\u0636\u0648\u0631 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u064A\u0646 \u0648\u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u0641\u0642\u0637.</p>
            </div>`;return}this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1),this._scheduleAttendanceDataLoadIfNeeded(!1),this._scheduleLeaveBalancesLoadIfNeeded(!1);const s=this._isAttendanceDataLoading(),n=this._isLeaveBalancesLoading(),i=this._getLeaveBalancePeriodDefaults(),o=this.getClinicStaffLeaveBalancesList();if(!this.canViewAllAttendanceData())return this.renderAttendanceSelfTab(a);this.ensureData(),this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffList(),p=this._getAttendanceStaffOptions(),u=c.filter(x=>String(x.isActive||"true").toLowerCase()!=="false"),d=this._getTodayLocalKey(),m=this.getClinicStaffAttendanceList(),f=m.filter(x=>this._attendanceDayKey(x.date)===d),y=f.filter(x=>x.checkIn).length,g=f.filter(x=>x.checkIn&&!x.checkOut).length,b=this.isCurrentUserAdmin(),S=this.getFilteredClinicStaffActivities(),T=!!this._clinicStaffActivitiesLoading,D=this._countActiveAttendanceFilters(l),$=this.state.attendanceFilterPanelOpen!==!1,h=l.period||"all",v={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},L=p.map(x=>`<option value="${Utils.escapeAttr(x.id)}" ${String(l.staffId)===String(x.id)?"selected":""}>${Utils.escapeHTML(x.name)}</option>`).join(""),k=s&&r.length===0?this._renderAttendanceTableLoadingRow(10):r.length?r.map(x=>`
            <tr>
                <td>${Utils.escapeHTML(x.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(x.userEmail||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(x.staffRole))}</td>
                <td>${Utils.escapeHTML(x.date||"\u2014")}</td>
                <td>${x.checkIn?Utils.formatDateTime?Utils.formatDateTime(x.checkIn):Utils.escapeHTML(String(x.checkIn)):"\u2014"}</td>
                <td>${x.checkOut?Utils.formatDateTime?Utils.formatDateTime(x.checkOut):Utils.escapeHTML(String(x.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(x.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(x.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(x.status))}</span></td>
                <td class="text-xs text-gray-500">${Utils.escapeHTML(String(x.sessionId||"\u2014").slice(0,18))}</td>
                <td>${this._renderAttendancePunchActions(x)}</td>
            </tr>
        `).join(""):'<tr><td colspan="10" class="text-center text-gray-500 py-8"><i class="fas fa-calendar-times ml-2 opacity-60"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631</td></tr>',C=b?c.length?c.map(x=>{const N=String(x.isActive||"true").toLowerCase()!=="false";return`<tr>
                <td>${Utils.escapeHTML(x.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(x.staffRole))}</td>
                <td>${N?'<span class="badge badge-success">\u0646\u0634\u0637</span>':'<span class="badge badge-secondary">\u0645\u0648\u0642\u0648\u0641</span>'}</td>
                <td>
                    <button type="button" class="btn-icon btn-icon-warning" title="${N?"\u0625\u064A\u0642\u0627\u0641":"\u062A\u0641\u0639\u064A\u0644"}" onclick="Clinic.toggleClinicStaffActive('${Utils.escapeAttr(x.id)}', ${!N})"><i class="fas fa-${N?"pause":"play"}"></i></button>
                    <button type="button" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" onclick="Clinic.deleteClinicStaffMember('${Utils.escapeAttr(x.id)}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`}).join(""):'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u2014 \u0623\u0636\u0641 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</td></tr>':"",I=[{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];b&&I.push({id:"clinic-attendance-section-staff",label:"\u0645\u0633\u0626\u0648\u0644\u0648 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",icon:"fa-users"}),a.innerHTML=`
            <div id="clinic-attendance-root" style="font-family:inherit;">
                ${this.renderAttendanceQuickNav(I)}
                <!-- KPI -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u062D\u0627\u0636\u0631\u0648\u0646 \u0627\u0644\u064A\u0648\u0645",value:y,icon:"fa-user-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C",value:g,icon:"fa-door-open",color:"#d97706",bg:"#fffbeb"},{label:"\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0641\u0644\u062A\u0631",value:r.length,icon:"fa-filter",color:"#2563eb",bg:"#eff6ff"},{label:"\u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u0646\u0634\u0637\u0648\u0646",value:u.length,icon:"fa-users",color:"#4f46e5",bg:"#eef2ff"}].map(x=>`
                        <div style="background:${x.bg};border:1px solid rgba(0,0,0,0.04);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;">
                            <div style="width:40px;height:40px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                                <i class="fas ${x.icon}" style="color:${x.color};font-size:1rem;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-size:0.72rem;color:#64748b;font-weight:600;">${x.label}</p>
                                <p style="margin:2px 0 0;font-size:1.45rem;font-weight:800;color:${x.color};line-height:1.1;">${x.value}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A -->
                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;padding:14px 18px;background:linear-gradient(125deg,#0b2a55 0%,#1e3a75 70%,#245a9b 100%);border-radius:14px;color:#fff;box-shadow:0 10px 28px rgba(11,42,85,.25);">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:42px;height:42px;background:rgba(255,255,255,0.16);border-radius:11px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-clipboard-user" style="font-size:18px;"></i>
                            </div>
                            <div>
                                <h3 style="margin:0;font-size:1rem;font-weight:700;">\u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</h3>
                                <p style="margin:0;font-size:0.72rem;opacity:0.88;">\u062A\u0633\u062C\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C \u2022 ${s&&r.length===0?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...":`${m.length} \u0633\u062C\u0644 \u0625\u062C\u0645\u0627\u0644\u064A`}</p>
                            </div>
                        </div>
                        ${b?`
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:6px 8px;background:rgba(0,0,0,0.18);border-radius:10px;border:1px solid rgba(255,255,255,0.2);">
                            <span style="font-size:0.68rem;font-weight:700;opacity:0.85;margin-inline:4px;">\u0625\u062F\u0627\u0631\u0629:</span>
                            <button type="button" id="clinic-attendance-shift-rules-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:#fbbf24;color:#78350f;font-size:0.76rem;font-weight:800;display:flex;align-items:center;gap:5px;" title="\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0639\u062F"><i class="fas fa-clock"></i><span>\u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A</span></button>
                            <button type="button" id="clinic-attendance-add-punch-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:#fff;color:#0b2a55;font-size:0.76rem;font-weight:800;display:flex;align-items:center;gap:5px;" title="\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0623\u0648 \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629"><i class="fas fa-fingerprint"></i><span>\u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</span></button>
                            <button type="button" id="clinic-attendance-add-staff-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#0b2a55;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;"><i class="fas fa-user-plus"></i><span>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644</span></button>
                        </div>`:""}
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <span style="font-size:0.72rem;opacity:0.9;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                        ${["today","week","month","all"].map(x=>{const N=h===x;return`<button type="button" class="clinic-attendance-period-btn" data-period="${x}" style="padding:5px 11px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;transition:all .2s;background:${N?"#fff":"rgba(255,255,255,0.14)"};color:${N?"#0b2a55":"#fff"};">${v[x]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                            <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span>
                            ${D?`<span style="background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 6px;border-radius:10px;">${D}</span>`:""}
                        </button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.14);color:#fff;font-size:0.76rem;" title="\u062A\u062D\u062F\u064A\u062B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"><i class="fas fa-sync-alt${s?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-report-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#0b2a55;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631"><i class="fas fa-file-export"></i><span>\u062A\u0642\u0631\u064A\u0631</span></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="PDF \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-pdf"></i><span>PDF</span></button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="Excel \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-excel"></i><span>Excel</span></button>
                    </div>
                </div>

                <!-- \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                <div id="clinic-attendance-filter-panel" style="display:${$?"block":"none"};margin-bottom:14px;">
                    <div id="clinic-attendance-filter-grid" class="registry-filter-grid" role="search" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0627\u0644\u0639\u064A\u0627\u062F\u0629">
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-search"><i class="fas fa-search"></i>\u0628\u062D\u062B</label>
                            <input type="search" id="clinic-attendance-search" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F..." value="${Utils.escapeAttr(l.search||"")}" autocomplete="off">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-month"><i class="fas fa-calendar-alt"></i>\u0627\u0644\u0634\u0647\u0631</label>
                            <input type="month" id="clinic-attendance-month" class="form-input" value="${Utils.escapeAttr(l.month||"")}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-staff"><i class="fas fa-user"></i>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</label>
                            <select id="clinic-attendance-staff" class="form-input">
                                <option value="all" ${!l.staffId||l.staffId==="all"?"selected":""}>\u0643\u0644 \u0627\u0644\u0645\u0633\u0626\u0648\u0644\u064A\u0646</option>
                                ${L}
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-role"><i class="fas fa-user-tag"></i>\u0627\u0644\u062F\u0648\u0631</label>
                            <select id="clinic-attendance-role" class="form-input">
                                <option value="all" ${l.staffRole==="all"||!l.staffRole?"selected":""}>\u0643\u0644 \u0627\u0644\u0623\u062F\u0648\u0627\u0631</option>
                                <option value="doctor" ${l.staffRole==="doctor"?"selected":""}>\u0637\u0628\u064A\u0628</option>
                                <option value="nurse" ${l.staffRole==="nurse"?"selected":""}>\u062A\u0645\u0631\u064A\u0636</option>
                                <option value="clinic_officer" ${l.staffRole==="clinic_officer"?"selected":""}>\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-status"><i class="fas fa-circle-check"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" class="form-input">
                                <option value="all" ${l.status==="all"||!l.status?"selected":""}>\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-from"><i class="fas fa-calendar-day"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</label>
                            <input type="date" id="clinic-attendance-from" class="form-input" value="${Utils.escapeAttr(l.dateFrom||"")}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</label>
                            <input type="date" id="clinic-attendance-to" class="form-input" value="${Utils.escapeAttr(l.dateTo||"")}">
                        </div>
                        <div class="registry-filter-field tx-reg-filter-actions">
                            <button type="button" id="clinic-attendance-reset-filters" class="registry-filter-reset-btn"><i class="fas fa-rotate-left"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>
                        </div>
                    </div>
                    ${D?`
                    <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #bfdbfe;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                        <span style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0645\u0637\u0628\u0651\u0642\u0629:</span>
                        ${l.search?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0628\u062D\u062B: ${Utils.escapeHTML(String(l.search).slice(0,24))}</span>`:""}
                        ${l.staffRole&&l.staffRole!=="all"?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getStaffRoleLabel(l.staffRole))}</span>`:""}
                        ${l.staffId&&l.staffId!=="all"?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML((p.find(x=>String(x.id)===String(l.staffId))||{}).name||l.staffId)}</span>`:""}
                        ${l.month?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0634\u0647\u0631 ${Utils.escapeHTML(l.month)}</span>`:""}
                        ${l.status&&l.status!=="all"?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getAttendanceStatusLabel(l.status))}</span>`:""}
                        ${l.dateFrom?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0645\u0646 ${Utils.escapeHTML(l.dateFrom)}</span>`:""}
                        ${l.dateTo?`<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0625\u0644\u0649 ${Utils.escapeHTML(l.dateTo)}</span>`:""}
                    </div>`:""}
                </div>

                <p style="font-size:0.78rem;color:#64748b;margin:0 0 10px;display:flex;align-items:center;gap:6px;">
                    <i class="fas fa-info-circle" style="color:#2563eb;"></i>
                    \u064A\u064F\u0633\u062C\u0651\u064E\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644/\u0627\u0644\u062E\u0631\u0648\u062C. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629 \u0645\u0646 \u0639\u0645\u0648\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A.
                </p>

                <div class="content-card" id="clinic-attendance-section-records" style="margin:0;">
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                            <thead><tr>
                                <th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0628\u0631\u064A\u062F</th><th>\u0627\u0644\u062F\u0648\u0631</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th><th>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th><th>\u0645\u062F\u0629 (\u0633)</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062C\u0644\u0633\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr></thead>
                            <tbody>${k}</tbody>
                        </table>`,"48vh")}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!0,activities:S,loading:T,title:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:o,loading:n,month:i.month,year:i.year})}

                ${this.renderApprovedTimeOffRequestsSection(o,i.month)}

                ${b?`
                <div class="content-card mt-4" id="clinic-attendance-section-staff">
                    <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;">
                        <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#0b2a55;"><i class="fas fa-users ml-2" style="color:#2563eb;"></i>\u0642\u0627\u0626\u0645\u0629 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</h4>
                    </div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table">
                            <thead><tr><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u062F\u0648\u0631</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>
                            <tbody>${C}</tbody>
                        </table>`)}
                    </div>
                </div>`:""}
            </div>`;const q=()=>{const x=document.getElementById("clinic-attendance-month")?.value||"";let N=document.getElementById("clinic-attendance-from")?.value||"",F=document.getElementById("clinic-attendance-to")?.value||"";if(x&&!N&&!F){const P=this._getAttendanceMonthRange(x);N=P.dateFrom,F=P.dateTo}else{const P=this._normalizeAttendanceDateRange(N,F);N=P.dateFrom,F=P.dateTo}return{search:document.getElementById("clinic-attendance-search")?.value||"",staffRole:document.getElementById("clinic-attendance-role")?.value||"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:document.getElementById("clinic-attendance-staff")?.value||"all",month:x,dateFrom:N,dateTo:F,period:this.state.filters.attendance?.period||"all"}},w=()=>{this.state.filters.attendance=q.call(this),this.renderAttendanceTab({force:!0})},_=x=>{const N=this._getTodayLocalKey();let F="",P="";if(x==="today")F=N,P=N;else if(x==="week"){const j=new Date;j.setDate(j.getDate()-6),F=this._attendanceDayKey(j),P=N}else if(x==="month"){const j=new Date;j.setDate(j.getDate()-29),F=this._attendanceDayKey(j),P=N}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:x,month:"",dateFrom:F,dateTo:P}),this.renderAttendanceTab({force:!0})},M=a.querySelector("#clinic-attendance-search");if(M?.addEventListener("input",x=>{this._attendanceSearchFocused=!0,this._attendanceSearchCursor=x.target.selectionStart,clearTimeout(this._attendanceSearchTimer),this._attendanceSearchTimer=setTimeout(w,280)}),M?.addEventListener("focus",()=>{this._attendanceSearchFocused=!0}),M?.addEventListener("blur",()=>{this._attendanceSearchFocused=!1}),a.querySelector("#clinic-attendance-role")?.addEventListener("change",w),a.querySelector("#clinic-attendance-status")?.addEventListener("change",w),a.querySelector("#clinic-attendance-staff")?.addEventListener("change",w),a.querySelector("#clinic-attendance-month")?.addEventListener("change",()=>{const x=document.getElementById("clinic-attendance-month")?.value||"",N=x?this._getAttendanceMonthRange(x):{dateFrom:"",dateTo:""};this.state.filters.attendance=Object.assign({},q.call(this),{month:x,dateFrom:N.dateFrom,dateTo:N.dateTo,period:"monthPick"}),w()}),a.querySelector("#clinic-attendance-from")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},q.call(this),{month:"",period:"custom"}),w()}),a.querySelector("#clinic-attendance-to")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},q.call(this),{month:"",period:"custom"}),w()}),a.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),a.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!$;const x=a.querySelector("#clinic-attendance-filter-panel");x&&(x.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),a.querySelectorAll(".clinic-attendance-period-btn").forEach(x=>{x.addEventListener("click",()=>_(x.dataset.period||"all"))}),a.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),a.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),a.querySelector("#clinic-attendance-report-btn")?.addEventListener("click",()=>this.showAttendanceReportModal()),a.querySelector("#clinic-attendance-add-staff-btn")?.addEventListener("click",()=>this.showAddClinicStaffModal()),a.querySelector("#clinic-attendance-add-punch-btn")?.addEventListener("click",()=>this.showAddMissingAttendanceModal()),a.querySelector("#clinic-attendance-shift-rules-btn")?.addEventListener("click",()=>this.showClinicShiftSettingsModal()),a.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(a),this.bindClinicStaffLeaveBalanceEvents(a),this.bindAttendanceQuickNav(a),this.initAttendanceTableScroll(a),this._attendanceSearchFocused&&M){M.focus();const x=this._attendanceSearchCursor;if(x!=null&&typeof M.setSelectionRange=="function")try{M.setSelectionRange(x,x)}catch{}}},hasTabAccess(e){return AppState.currentUser?this.isCurrentUserAdmin()?!0:typeof Permissions<"u"&&!Permissions.hasDetailedPermission("clinic",e)?!1:e==="attendance"?this.canAccessAttendanceTab():!0:!1},_injectClinicIdentityStyles(){if(document.getElementById("clinic-ui-identity-styles"))return;const e=document.createElement("style");e.id="clinic-ui-identity-styles",e.textContent=`
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
        `,document.head.appendChild(e)},renderUI(){const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}this._injectClinicIdentityStyles();const t=AppState.appData;if(!t){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-gray-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div></div>';return}const a=this.getMedications().length,s=this.getSickLeaves().length,n=this.getInjuries().length,i=(t.clinicVisits||[]).length,o=this.isCurrentUserAdmin(),l=Math.max(1,i,a,s,n),r=m=>m>0?Math.min(100,Math.round(m/l*100)):0,c=[{label:"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F",value:i,icon:"fas fa-hospital",iconCls:"blue",valueColor:"#1d4ed8",barColor:"#2563eb",pct:r(i)},{label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629",value:a,icon:"fas fa-pills",iconCls:"green",valueColor:"#15803d",barColor:"#22c55e",pct:r(a)},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:s,icon:"fas fa-calendar-times",iconCls:"amber",valueColor:"#c2410c",barColor:"#f59e0b",pct:r(s)},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:n,icon:"fas fa-user-injured",iconCls:"red",valueColor:"#b91c1c",barColor:"#ef4444",pct:r(n)}].map(m=>`
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
                        \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F (${i})
                    </button>
                    `:""}
                    ${this.hasTabAccess("medications")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="medications"?"active":""}" data-tab="medications">
                        <i class="fas fa-pills ml-2"></i>
                        \u0627\u0644\u0623\u062F\u0648\u064A\u0629 (${a})
                    </button>
                    `:""}
                    ${this.hasTabAccess("sickLeave")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="sickLeave"?"active":""}" data-tab="sickLeave">
                        <i class="fas fa-calendar-times ml-2"></i>
                        \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${s})
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
                        \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A (${n})
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
        `,this.state.activeTab==="attendance"&&!this.canAccessAttendanceTab()&&(this.state.activeTab=this.hasTabAccess("visits")?"visits":this.hasTabAccess("medications")?"medications":"visits"),this.renderTabNavigation(),this.renderActiveTabContent(),this.bindTabEvents();try{this.applyModuleI18n(e)}catch{}const p=document.getElementById("clinic-refresh-btn");p&&p.addEventListener("click",()=>this.refresh());const u=document.getElementById("clinic-register-visit-btn");u&&u.addEventListener("click",()=>{u.disabled||(u.disabled=!0,this.showVisitForm(null,u))});const d=document.getElementById("clinic-visit-types-settings-btn");d&&d.addEventListener("click",()=>this.showVisitTypesSettingsModal()),typeof UI<"u"&&UI.addNavigationIconsAfterRender?UI.addNavigationIconsAfterRender("clinic"):typeof UI<"u"&&UI.addNavigationIcons&&(setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},0),setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},100))},async renderDispensedMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]');if(!e){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}const{t}=this.getTranslations();this.ensureData();const a=AppState.appData.clinicVisits&&AppState.appData.clinicVisits.length>0;if((!a||a&&AppState.appData.clinicVisits.some(d=>{const m=this.normalizeVisitMedications(d.medications);return(!m||m.length===0)&&(d.medicationsDispensed||d.medicationsDispensedQty&&d.medicationsDispensedQty>0)}))&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){e.innerHTML='<div class="text-center py-8 text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';try{await this.loadVisitsDataFromBackend(),this.ensureData(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629")}catch(d){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629:",d.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),this.ensureData()}}const n=AppState.appData.clinicVisits||[],i=[];let o=!1;if(n.forEach(d=>{if(!d||typeof d!="object")return;let m=this.normalizeVisitMedications(d.medications);if((!m||m.length===0)&&d.medicationsDispensed&&(m=this.normalizeVisitMedications(d.medicationsDispensed),m&&m.length>0&&(d.medications=m,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0644\u0632\u064A\u0627\u0631\u0629 ${d.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,m.length,"\u062F\u0648\u0627\u0621"))),(!m||m.length===0)&&d.medicationsDispensedQty&&d.medicationsDispensedQty>0){const f=parseInt(d.medicationsDispensedQty,10)||0;f>0&&(m=[{medicationName:d.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:f,unit:"\u0648\u062D\u062F\u0629",notes:""}],d.medications=m,o=!0,AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${d.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${f} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A.`))}m&&m.length>0&&m.forEach(f=>{if(f&&(f.medicationName||f.name)){const y=d.factoryName||this.getVisitFactoryDisplayName(d)||"-",g=d.employeeLocation||d.workArea||d.location||"-";i.push({visitId:d.id,visitDate:d.visitDate||d.createdAt,employeeName:d.employeeName||d.contractorName||d.contractorWorkerName||d.externalName||"",employeeCode:d.employeeCode||d.employeeNumber||"",employeeDepartment:d.employeeDepartment||d.department||"",factory:y,location:g,personType:d.personType||(d.contractorName||d.externalName?"contractor":"employee"),medicationName:f.medicationName||f.name||"",quantity:f.quantity!==null&&f.quantity!==void 0?parseInt(f.quantity,10):0,unit:f.unit||"\u0648\u062D\u062F\u0629",notes:f.notes||""})}})}),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0639")}catch(d){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",d.message)}if(AppState.debugMode){const d=i.filter(f=>f.personType==="employee"||!f.personType).length,m=i.filter(f=>f.personType==="contractor").length;Utils.safeLog(`\u2705 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629: ${i.length} \u062F\u0648\u0627\u0621 \u0645\u0646 ${n.length} \u0632\u064A\u0627\u0631\u0629 (${d} \u0645\u0648\u0638\u0641\u060C ${m} \u0645\u0642\u0627\u0648\u0644)`)}i.sort((d,m)=>{const f=new Date(d.visitDate);return new Date(m.visitDate)-f});const l=i.map(d=>{let m=d.visitDate||d.createdAt||"";if(m)try{const $=new Date(m);isNaN($.getTime())&&(m=d.createdAt||"")}catch{m=d.createdAt||""}const f=this.formatDate(m,!0),y=this.getMedications().find($=>$.name===d.medicationName||$.name?.toLowerCase()===d.medicationName?.toLowerCase()),g=y?.type||"-",b=y?this.calculateMedicationStatus(y):null,S=b?`<span class="badge ${this.getMedicationStatusClasses(b.status)}">${b.status}</span>`:"-",T=b?.status||"\u0633\u0627\u0631\u064A";return`
                <tr class="${this.getMedicationRowClass(T)}">
                    <td>${f}</td>
                    <td>${Utils.escapeHTML(d.employeeCode)}</td>
                    <td>${Utils.escapeHTML(d.employeeName)}</td>
                    <td>${Utils.escapeHTML(d.employeeDepartment)}</td>
                    <td>${Utils.escapeHTML(d.factory||"-")}</td>
                    <td>${Utils.escapeHTML(d.location||"-")}</td>
                    <td>${Utils.escapeHTML(d.medicationName)}</td>
                    <td>${Utils.escapeHTML(g)}</td>
                    <td class="text-center">${d.quantity} ${Utils.escapeHTML(d.unit)}</td>
                    <td class="text-center">${S}</td>
                    <td>${Utils.escapeHTML(d.notes||"-")}</td>
                    <td class="text-center">
                        <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(d.visitId||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `}).join(""),r=i.length?`
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
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u0633\u062C\u0644\u0629.");e.innerHTML=r,this.applyModuleI18n(e),setTimeout(()=>{const d=e.querySelector(".clinic-table-wrapper");d&&this.setupTableScrollListeners(d)},100);const c=e.querySelector("#dispensed-med-search");c&&c.addEventListener("input",d=>{const m=d.target.value.toLowerCase();e.querySelectorAll("tbody tr").forEach(y=>{const g=y.textContent.toLowerCase();y.style.display=g.includes(m)?"":"none"})});const p=e.querySelector("#export-dispensed-med-btn");p&&p.addEventListener("click",()=>this.exportDispensedMedicationsToExcel(i));const u=e.querySelector("#export-dispensed-med-pdf-btn");u&&u.addEventListener("click",()=>this.exportDispensedMedicationsToPDF(i)),e.querySelectorAll('[data-action="view-visit"]').forEach(d=>{d.addEventListener("click",()=>{const m=d.getAttribute("data-id");m&&this.viewVisit(m)})})},exportDispensedMedicationsToExcel(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map((a,s)=>{let n=a.visitDate||a.createdAt||"";if(n)try{const i=new Date(n);isNaN(i.getTime())&&(n=a.createdAt||"")}catch{n=a.createdAt||""}return{\u0645:s+1,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641":this.formatDate(n,!0),"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":a.employeeCode,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636":a.employeeName,\u0627\u0644\u0625\u062F\u0627\u0631\u0629:a.employeeDepartment,\u0627\u0644\u0645\u0635\u0646\u0639:a.factory||"-",\u0627\u0644\u0645\u0648\u0642\u0639:a.location||"-","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":a.medicationName,\u0627\u0644\u0643\u0645\u064A\u0629:a.quantity,\u0627\u0644\u0648\u062D\u062F\u0629:a.unit,\u0645\u0644\u0627\u062D\u0638\u0627\u062A:a.notes||""}});try{const a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(t);s["!cols"]=[{wch:5},{wch:18},{wch:14},{wch:22},{wch:18},{wch:16},{wch:18},{wch:28},{wch:10},{wch:10},{wch:20}],XLSX.utils.book_append_sheet(a,s,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629");const n=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",a),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(a?.message||a))}},async exportDispensedMedicationsToPDF(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const s=8,n=a.internal.pageSize.getWidth(),i=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",p=AppState?.companySettings?.phone||"",u=AppState?.companySettings?.email||"",d=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",f=`CLINIC-DISP-${new Date().toISOString().slice(0,10)}`,y=new Date().toLocaleDateString("ar-SA");let g=8;if(m)try{a.addImage(m,"PNG",s,g-1,15,10)}catch{}const b=s+(m?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,b,g+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,b,g+9));const S=[c,p,u].filter(Boolean).join(" | ");S&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(S,b,r?g+15:g+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",n-s,g+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(f,n-s,g+9,{align:"right"});const T=S?r?g+21:g+15:r?g+15:g+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(s,T,n-s,T),g=T+4,a.setFillColor(0,56,101),a.rect(0,g,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,s,g+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,g+5.5,{align:"center"}),g+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,g,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${y}`,s,g+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,n-s,g+7,{align:"right"}),g+=11,a.setFillColor(227,242,253),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(s,g,80,13,2,2,"FD"),a.setFillColor(21,101,192),a.rect(s,g,1.5,13,"F"),a.setFontSize(6),a.setTextColor(21,101,192),a.text("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",s+4,g+4.5),a.setFontSize(11),a.setTextColor(13,71,161),a.text(String(e.length),s+76,g+11,{align:"right"}),g+=18;const D=h=>{let v=h.visitDate||h.createdAt||"";if(v)try{isNaN(new Date(v).getTime())&&(v=h.createdAt||"")}catch{v=h.createdAt||""}return this.formatDate(v,!0)};a.autoTable({startY:g,head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0643\u0645\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"]],body:e.map((h,v)=>[v+1,D(h),h.employeeCode||"",h.employeeName||"",h.employeeDepartment||"",h.factory||"-",h.location||"-",h.medicationName||"",(h.quantity||"")+" "+(h.unit||""),h.notes||"-"]),styles:{font:"Amiri",fontSize:7,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},8:{halign:"center",cellWidth:18}},margin:{left:s,right:s},didDrawPage:function(h){const v=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(s,i-9,n-s,i-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${d}`,s,i-5),a.text(f,o,i-5,{align:"center"}),a.text(`${y} | \u0635\u0641\u062D\u0629 ${v}`,n-s,i-5,{align:"right"})}});const $=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save($),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintDispensedMedicationsPDF(e)}},_fallbackPrintDispensedMedicationsPDF(e){const t=e.map((o,l)=>{let r=o.visitDate||o.createdAt||"";if(r)try{const p=new Date(r);isNaN(p.getTime())&&(r=o.createdAt||"")}catch{r=o.createdAt||""}const c=this.formatDate(r,!0);return`<tr>
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
            </tr>`}).join(""),a=`CLINIC-DISPENSED-MEDS-${new Date().toISOString().slice(0,10)}`,s="\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",n=`<table style="width:100%;border-collapse:collapse;font-size:10px;"><thead><tr style="background-color:#f3f4f6;">
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
        </tr></thead><tbody>${t}</tbody></table>`,i=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,s,n,!1,!0,{source:"ClinicDispensedMeds"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${s}</title></head><body>${n}</body></html>`;try{const o=new Blob([i],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),r=window.open(l,"_blank");r?r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{URL.revokeObjectURL(l)},1e3),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(l),Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(o?.message||o))}},renderSupplyRequestTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="supply-request"]');if(!e)return;this.ensureData(),AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]);const t=AppState.appData.clinicSupplyRequests.filter(i=>i.requestedBy?.id===AppState.currentUser?.id||i.requestedBy?.email===AppState.currentUser?.email).sort((i,o)=>new Date(o.createdAt||o.requestDate)-new Date(i.createdAt||i.requestDate)),a=this.isCurrentUserAdmin(),s=a?AppState.appData.clinicSupplyRequests.sort((i,o)=>new Date(o.createdAt||o.requestDate)-new Date(i.createdAt||i.requestDate)):t;e.innerHTML=`
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
                            ${a?"\u062C\u0645\u064A\u0639 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A":"\u0637\u0644\u0628\u0627\u062A\u064A"}
                        </h2>
                    </div>
                    <div class="card-body">
                        ${this.renderSupplyRequestsList(s,a)}
                    </div>
                </div>
            </div>
        `,this.applyModuleI18n(e);const n=e.querySelector("#supply-request-form");n&&n.addEventListener("submit",i=>{i.preventDefault(),this.submitSupplyRequest()}),e.querySelectorAll('[data-action="view-request"]').forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-id");this.viewSupplyRequest(o)})}),e.querySelectorAll('[data-action="update-status"]').forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-id"),l=i.getAttribute("data-status");this.updateSupplyRequestStatus(o,l)})}),setTimeout(()=>{const i=e.querySelector(".clinic-table-wrapper");i&&this.setupTableScrollListeners(i)},100)},renderSupplyRequestsList(e,t){return!e||e.length===0?'<p class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>':`
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
                        ${e.map(s=>{const n=this.formatDate(s.createdAt||s.requestDate,!0),i=s.requestedBy?.name||s.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",o=s.status||"pending",l=s.priority||"normal",r={pending:'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',approved:'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',fulfilled:'<span class="badge badge-info">\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>'}[o]||'<span class="badge">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',c={urgent:'<span class="badge badge-danger">\u0639\u0627\u062C\u0644\u0629</span>',high:'<span class="badge badge-warning">\u0639\u0627\u0644\u064A\u0629</span>',normal:'<span class="badge badge-info">\u0639\u0627\u062F\u064A\u0629</span>'}[l]||'<span class="badge">\u0639\u0627\u062F\u064A\u0629</span>',p={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[s.type]||s.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <tr>
                    <td>${this.formatDate(s.createdAt||s.requestDate,!0)}</td>
                    <td>${Utils.escapeHTML(i)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td>${Utils.escapeHTML(s.itemName||"")}</td>
                    <td class="text-center">${s.quantity||""} ${Utils.escapeHTML(s.unit||"")}</td>
                    <td class="text-center">${c}</td>
                    <td class="text-center">${r}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-request" data-id="${Utils.escapeHTML(s.id||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${t&&o==="pending"?`
                            <button type="button" class="btn-icon btn-icon-success" data-action="update-status" data-id="${Utils.escapeHTML(s.id||"")}" data-status="approved" title="\u0645\u0648\u0627\u0641\u0642\u0629">
                                <i class="fas fa-check"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-danger" data-action="update-status" data-id="${Utils.escapeHTML(s.id||"")}" data-status="rejected" title="\u0631\u0641\u0636">
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
        `},async submitSupplyRequest(){const e=document.getElementById("request-type")?.value,t=document.getElementById("item-name")?.value?.trim(),a=parseInt(document.getElementById("quantity")?.value),s=document.getElementById("unit")?.value?.trim()||"\u0648\u062D\u062F\u0629",n=document.getElementById("request-notes")?.value?.trim(),i=document.getElementById("priority")?.value||"normal";if(!e||!t||!a){Notification?.error?.("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show();try{const o={id:`REQ-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,type:e,itemName:t,quantity:a,unit:s,notes:n,priority:i,status:"pending",requestedBy:{id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},createdAt:new Date().toISOString(),requestDate:new Date().toISOString()},l=await GoogleIntegration.sendRequest({action:"addSupplyRequest",data:o});if(l&&l.success)AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]),AppState.appData.clinicSupplyRequests.push(o),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyAdminAboutSupplyRequest(o),this.renderSupplyRequestTab(),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),document.getElementById("supply-request-form")?.reset();else throw new Error(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(o){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C:",o),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628: "+(o.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},viewSupplyRequest(e){const t=AppState.appData.clinicSupplyRequests?.find(n=>n.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a);const s=()=>a.remove();a.querySelectorAll(".modal-close, .modal-close-btn").forEach(n=>n.addEventListener("click",s)),a.addEventListener("click",n=>{n.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s()})},updateSupplyRequestStatus(e,t){const a=AppState.appData.clinicSupplyRequests?.find(n=>n.id===e);if(!a){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}a.status=t,a.updatedAt=new Date().toISOString(),a.updatedBy={id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},typeof DataManager<"u"&&DataManager.save&&DataManager.save();const s={approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[t]||t;Notification?.success?.(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649: ${s}`),this.renderSupplyRequestTab()},showEnhancedVisitForm(e=null){if(typeof this.showVisitForm=="function")return this.showVisitForm(e);const t=!!e;this.ensureData();const a=document.createElement("div");a.className="modal-overlay";const s=e?.personType||"employee",n=e?.visitDate?Utils.toDateTimeLocalString(e.visitDate):Utils.toDateTimeLocalString(new Date),i=e?.exitDate?Utils.toDateTimeLocalString(e.exitDate):"",o=new Date;o.setHours(0,0,0,0);const l=(AppState.appData.clinicVisits||[]).filter(f=>{if(!f.visitDate)return!1;try{const y=new Date(f.visitDate);return y.setHours(0,0,0,0),y.getTime()===o.getTime()}catch{return!1}}).length,r=new Date;r.setDate(1),r.setHours(0,0,0,0);const c=(AppState.appData.clinicVisits||[]).filter(f=>{if(!f.visitDate)return!1;try{return new Date(f.visitDate)>=r}catch{return!1}}).length;a.innerHTML=`
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
                                        <option value="employee" ${s==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                        <option value="contractor" ${s==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                        <option value="external" ${s==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
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
                                        ${this.getSiteOptions().map(f=>`
                                            <option value="${f.id}" ${e?.factory===f.id||e?.factory===f.name?"selected":""}>${Utils.escapeHTML(f.name)}</option>
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
                                    <input type="datetime-local" id="enhanced-visit-date" required class="form-input" value="${n}" style="border: 2px solid #fc6c85; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-exit-date" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-sign-out-alt text-orange-600"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C
                                    </label>
                                    <input type="datetime-local" id="enhanced-visit-exit-date" class="form-input" value="${i}" style="border: 2px solid #fc6c85; border-radius: 10px; padding: 12px;">
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
                                        ${(t&&!e?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(f=>`<option value="${Utils.escapeHTML(f)}" selected>${Utils.escapeHTML(f)}</option>`).join("")}
                                        ${this.getVisitTypeOptions().map(f=>`<option value="${Utils.escapeHTML(f)}" ${(e?.visitType||"")===f?"selected":""}>${Utils.escapeHTML(f)}</option>`).join("")}
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
        `,document.body.appendChild(a),a.addEventListener("click",f=>{f.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()});const p=a.querySelector("#enhanced-visit-form"),u=a.querySelector("#enhanced-visit-person-type");u?.addEventListener("change",()=>{const f=u.value,y=a.querySelector("#enhanced-visit-employee-code-container"),g=a.querySelector("#enhanced-visit-employee-details-container"),b=a.querySelector("#enhanced-visit-employee-code"),S=a.querySelector("#enhanced-visit-employee-name"),T=a.querySelector("#enhanced-visit-employee-name-label"),D=a.querySelector("#enhanced-visit-employee-department"),$=a.querySelector("#enhanced-visit-factory");f==="employee"?(y.style.display="block",g.style.display="grid",b.required=!0,S.readOnly=!0,S.placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",T.innerHTML='<i class="fas fa-user text-purple-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *',D&&(D.readOnly=!0,D.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"),$&&($.style.display="block")):(y.style.display="none",g.style.display="none",b.required=!1,S.readOnly=!1,S.placeholder=f==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644",T.innerHTML=`<i class="fas fa-user text-purple-600"></i> ${f==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"} *`,D&&(D.readOnly=!1,D.placeholder=""),$&&($.style.display="none"))}),p?.addEventListener("submit",async f=>{f.preventDefault(),await this.saveEnhancedVisit(e,t,a)}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"),a.querySelectorAll(".sidebar-nav-btn").forEach(f=>{f.addEventListener("click",()=>{const g=parseInt(f.getAttribute("data-section"),10),b=a.querySelectorAll(".form-section");b[g]&&b[g].scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})});const y=f.style.borderColor;f.addEventListener("mouseenter",()=>{f.style.background=y,f.style.color="white",f.style.transform="translateX(-5px)"}),f.addEventListener("mouseleave",()=>{f.style.background="white",f.style.color=y,f.style.transform="translateX(0)"})});const m=a.querySelector('button[type="submit"]');m?.addEventListener("mouseenter",()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 6px 20px 0 rgba(102, 126, 234, 0.6)"}),m?.addEventListener("mouseleave",()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 4px 15px 0 rgba(102, 126, 234, 0.4)"})},async saveEnhancedVisit(e,t,a){Loading.show();try{const s=document.getElementById("enhanced-visit-person-type").value,n=document.getElementById("enhanced-visit-employee-code")?.value.trim()||"",i=document.getElementById("enhanced-visit-employee-name").value.trim(),o=document.getElementById("enhanced-visit-employee-position")?.value.trim()||"",l=document.getElementById("enhanced-visit-employee-department")?.value.trim()||"",r=document.getElementById("enhanced-visit-factory")?.value.trim()||null,c=document.getElementById("enhanced-visit-employee-location").value.trim(),p=document.getElementById("enhanced-visit-date").value,u=document.getElementById("enhanced-visit-exit-date").value||null,d=document.getElementById("enhanced-visit-type")?.value?.trim()||null,m=document.getElementById("enhanced-visit-reason").value.trim(),f=document.getElementById("enhanced-visit-diagnosis").value.trim(),y=document.getElementById("enhanced-visit-treatment").value.trim();let g=null;if(r){const w=this.getSiteOptions().find(_=>_.id===r);g=w?w.name:null}let b=null,S=null;if(p&&p.trim())try{const[q,w]=p.split("T");if(q&&w){const[_,M,x]=q.split("-").map(Number),[N,F]=w.split(":").map(Number),P=new Date(_,M-1,x,N,F,0,0);isNaN(P.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",p):b=P.toISOString()}else{const _=new Date(p);isNaN(_.getTime())||(b=_.toISOString())}}catch(q){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",q)}if(u&&u.trim())try{const[q,w]=u.split("T");if(q&&w){const[_,M,x]=q.split("-").map(Number),[N,F]=w.split(":").map(Number),P=new Date(_,M-1,x,N,F,0,0);isNaN(P.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",u):S=P.toISOString()}else{const _=new Date(u);isNaN(_.getTime())||(S=_.toISOString())}}catch(q){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",q)}if(!AppState.currentUser){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F! \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0646 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645."),Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}if(!AppState.currentUser.name&&!AppState.currentUser.email&&!AppState.currentUser.id){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 name \u0623\u0648 email \u0623\u0648 id!",AppState.currentUser),Notification.error("\u062E\u0637\u0623: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const T=AppState.currentUser,D=(T?.email||"").toString().toLowerCase().trim(),h=(AppState.appData.users||[]).find(q=>(q.email||"").toString().toLowerCase().trim()===D);let v="";h&&h.name&&h.name.trim()!==""?v=h.name.trim():T?.name&&T.name.trim()!==""?v=T.name.trim():D?v=D:v="\u0645\u0633\u062A\u062E\u062F\u0645";const L=v,k=s==="contractor",C={id:e?.id||Utils.generateId("VISIT"),personType:s,employeeCode:k?null:n,employeeName:k?null:i,employeePosition:k?null:o,employeeDepartment:k?null:l,employeeLocation:k?null:c,contractorName:k?i:null,contractorWorkerName:k?n:null,contractorPosition:k?o:null,factory:r,factoryName:g,workArea:c,visitDate:b,exitDate:S,visitType:d,reason:m,diagnosis:f,treatment:y,medications:[],createdAt:e?.createdAt||new Date().toISOString(),createdBy:v,updatedAt:new Date().toISOString(),updatedBy:L,email:AppState.currentUser?.email||"",userId:AppState.currentUser?.id||""};if(C.createdBy==="\u0627\u0644\u0646\u0638\u0627\u0645"||typeof C.createdBy=="object"&&C.createdBy.name,AppState.debugMode&&(Utils.safeLog("\u{1F50D} formData.createdBy \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0642\u0628\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 (\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 string):",C.createdBy),Utils.safeLog("\u{1F50D} formData.createdBy type:",typeof C.createdBy)),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t){const q=AppState.appData.clinicVisits.findIndex(w=>w.id===C.id);q!==-1&&(AppState.appData.clinicVisits[q]=C)}else AppState.appData.clinicVisits.push(C);typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{const q=this.getMonthlyVisitsAlertThreshold(),w=this.getMonthlyVisitCountForPerson(C);if(w>=q){const _=(C.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+_+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+q+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(C,w).catch(function(M){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",M)})}}catch(q){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",q)}const I=45e3;try{AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend:",{action:t?"updateClinicVisit":"addClinicVisit",createdBy:C.createdBy,createdByType:typeof C.createdBy,createdByName:typeof C.createdBy=="object"?C.createdBy.name:C.createdBy});const q=await GoogleIntegration.sendRequest({action:t?"updateClinicVisit":"addClinicVisit",data:t?{visitId:C.id,updateData:C,__timeoutMs:I}:{...C,__timeoutMs:I}});this.assertClinicVisitRpcResult(q),t||this.applyClinicVisitIdFromServer(C,q),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend \u0628\u0646\u062C\u0627\u062D",q),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(q){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u062F \u062A\u0643\u0648\u0646 \u062D\u064F\u0641\u0638\u062A):",q),Loading.hide();try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}return}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),a.remove(),this.state.activeTab==="visits"&&this.renderVisitsTab()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}},async handleInjuryAttachmentsChange(e){if(!e||e.length===0)return;const t=Array.from(e),a=["jpg","jpeg","png","pdf"],s=5*1024*1024;for(const i of t){const o=(i.name.split(".").pop()||"").toLowerCase();if(!a.includes(o)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(i.size>s){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const l=await this.readFileAsBase64(i);this.state.currentInjuryAttachments.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),data:l,size:Math.round(i.size/1024),uploadedAt:new Date().toISOString()})}catch(l){Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641:",l),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}this.renderInjuryAttachmentsPreview();const n=document.getElementById("injury-attachments-input");n&&(n.value="")},renderInjuryAttachmentsPreview(){const e=document.getElementById("injury-attachments-preview");if(e){if(!this.state.currentInjuryAttachments||this.state.currentInjuryAttachments.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F</p>';return}e.innerHTML=this.state.currentInjuryAttachments.map((t,a)=>{const s=t.type&&t.type.startsWith("image/"),n=s?"fa-image":"fa-file-pdf",i=t.size||0;return`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <i class="fas ${n} text-blue-600 text-xl"></i>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">${Utils.escapeHTML(t.name)}</p>
                            <p class="text-xs text-gray-500">${i} KB</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${s?`
                            <button type="button" class="btn-icon btn-icon-primary" onclick="Clinic.previewAttachment(${a})" title="\u0645\u0639\u0627\u064A\u0646\u0629">
                                <i class="fas fa-eye"></i>
                            </button>
                        `:""}
                        <button type="button" class="btn-icon btn-icon-danger" onclick="Clinic.removeInjuryAttachment(${a})" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `}).join("")}},removeInjuryAttachment(e){e<0||e>=this.state.currentInjuryAttachments.length||(this.state.currentInjuryAttachments.splice(e,1),this.renderInjuryAttachmentsPreview(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0631\u0641\u0642"))},previewAttachment(e){const t=this.state.currentInjuryAttachments[e];if(!t||!t.type||!t.type.startsWith("image/"))return;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a);const s=a.querySelector(".modal-close");s&&s.addEventListener("click",()=>a.remove()),a.addEventListener("click",n=>{n.target===a&&a.remove()})},readFileAsBase64(e){return new Promise((t,a)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=n=>a(n),s.readAsDataURL(e)})},detectMimeType(e){if(!e)return"application/octet-stream";const t=e.split(".").pop().toLowerCase();return{jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",pdf:"application/pdf"}[t]||"application/octet-stream"},cleanup(){try{Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module..."),this.state.currentInjuryAttachments=[],this.state.medicationAlertsNotified.clear(),this.state.initialized=!1,Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Clinic module:",e)}}};typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic),(function(){"use strict";try{typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic,window.addEventListener("formSettingsUpdated",function(){try{typeof Clinic<"u"&&Clinic.refreshSiteDropdowns&&Clinic.refreshSiteDropdowns()}catch{}}),Clinic.load,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&(Utils.safeLog("\u2705 Clinic module loaded and available on window.Clinic"),Utils.safeLog("\u2705 Clinic.load function exists: "+(typeof Clinic.load=="function"))))}catch{if(typeof window<"u"&&typeof Clinic<"u")try{window.Clinic=Clinic}catch{}}})();
